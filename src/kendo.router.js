kendo_module({
    id: "router",
    name: "Router",
    category: "framework",
    description: "The Router class is responsible for tracking the application state and navigating between the application states.",
    depends: [ "core" ],
    hidden: false
});

(function($, undefined) {
    var kendo = window.kendo,
        support = kendo.support,
        location = window.location,
        history = window.history,
        _checkUrlInterval = 50,
        hashStrip = /^#*/,
        document = window.document;

    var History = kendo.Observable.extend({
        start: function(options) {
            var that = this;
            options = options || {};

            that.bind(["change"], options);

            if (that._started) {
                return;
            }
            that._started = true;
            that._pushStateRequested = !!options.pushState;
            that._pushState = support.pushState && that._pushStateRequested;
            that.root = options.root || "/";
            that._interval = 0;

            if (that._normalizeUrl()) {
                return true;
            }

            that.current = that._currentLocation();
            that.locations = [that.current];
            that._listenToLocationChange();
        },

        stop: function() {
            $(window).unbind(".kendo");
            this.unbind("change");
            clearInterval(this._interval);
            this._started = false;
        },

        change: function(callback) {
            this.bind('change', callback);
        },

        navigate: function(to, silent) {
            var that = this;

            if (to === '#:back') {
                history.back();
                return;
            }

            to = to.replace(hashStrip, '');

            if (that.current === to || that.current === decodeURIComponent(to)) {
                return;
            }

            if (!silent) {
                if (that.trigger("change", { url: to })) {
                    return;
                }
            }

            if (that._pushState) {
                history.pushState({}, document.title, that._makePushStateUrl(to));
                that.current = to;
            } else {
                location.hash = that.current = to;
            }

            that.locations.push(that.current);
        },

        _normalizeUrl: function() {
            var that = this,
                pushStateUrl,
                atRoot = that.root == location.pathname,
                pushStateUrlNeedsTransform = that._pushStateRequested && !support.pushState && !atRoot,
                hashUrlNeedsTransform = that._pushState && atRoot && location.hash;

            if (pushStateUrlNeedsTransform) {
                location.replace(that.root + '#' + that._stripRoot(location.pathname));
                return true;
            } else if (hashUrlNeedsTransform) {
                pushStateUrl = that._makePushStateUrl(location.hash.replace(hashStrip, ''));
                history.replaceState({}, document.title, pushStateUrl);
                return false;
            }
            return false;
        },

        _listenToLocationChange: function() {
            var that = this, _checkUrlProxy = $.proxy(that._checkUrl, that);

            if (this._pushState) {
                $(window).bind("popstate.kendo", _checkUrlProxy);
            } else if (support.hashChange) {
                $(window).bind("hashchange.kendo", _checkUrlProxy);
            } else {
                that._interval = setInterval(_checkUrlProxy, _checkUrlInterval);
            }
        },

        _checkUrl: function() {
            var that = this,
                current = that._currentLocation().replace(hashStrip, ''),
                back = current === that.locations[that.locations.length - 2];

            if (that.current === current || that.current === decodeURIComponent(current)) {
                return;
            }

            if (that.trigger("change", { url: current })) {
                if (back) {
                    history.forward();
                } else {
                    history.back();
                }
                return;
            }

            that.current = current;

            if (back) {
                that.locations.pop();
            } else {
                that.locations.push(current);
            }
        },

        _stripRoot: function(url) {
            var that = this;

            if (url.indexOf(that.root) === 0) {
                return (url.substr(that.root.length)).replace(/\/\//g, '/');
            } else {
                return url;
            }
        },

        _makePushStateUrl: function(address) {
            var that = this;
            var regEx = new RegExp("^" + that.root, "i");

            if (!regEx.test(address)) {
                address = (that.root + address).replace(/\/\//g, '/');
            }

            return location.protocol + '//' + location.host + address;
        },

        _currentLocation: function() {
            var that = this, current;

            if (that._pushState) {
                current = location.pathname;

                if (location.search) {
                    current += location.search;
                }

                return that._stripRoot(current);
            } else {
                return location.hash.replace(hashStrip, '');
            }
        }
    });

    kendo.history = new History();
})(window.kendo.jQuery);

(function() {
    var kendo = window.kendo,
        history = kendo.history,
        Observable = kendo.Observable,
        INIT = "init",
        ROUTE_MISSING = "routeMissing",
        CHANGE = "change",
        optionalParam = /\((.*?)\)/g,
        namedParam = /(\(\?)?:\w+/g,
        splatParam = /\*\w+/g,
        escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

    function namedParamReplace(match, optional) {
        return optional ? match : '([^\/]+)';
    }

    function routeToRegExp(route) {
        return new RegExp('^' + route
            .replace(escapeRegExp, '\\$&')
            .replace(optionalParam, '(?:$1)?')
            .replace(namedParam, namedParamReplace)
            .replace(splatParam, '(.*?)') + '$');
    }

    var Route = kendo.Class.extend({
        init: function(route, callback) {
            if (!(route instanceof RegExp)) {
                route = routeToRegExp(route);
            }

            this.route = route;
            this._callback = callback;
        },

        callback: function(url) {
            var params = this.route.exec(url).slice(1),
                idx = 0,
                length = params.length;

            for (; idx < length; idx ++) {
                if (typeof params[idx] !== 'undefined') {
                    params[idx] = decodeURIComponent(params[idx]);
                }
            }

            this._callback.apply(null, params);
        },

        worksWith: function(url) {
            if (this.route.test(url)) {
                this.callback(url);
                return true;
            } else {
                return false;
            }
        }
    });

    var Router = Observable.extend({
        init: function(options) {
            Observable.fn.init.call(this);
            this.routes = [];
            this.pushState = options ? options.pushState : false;
            if (options && options.root) {
                this.root = options.root;
            }
            this.bind([INIT, ROUTE_MISSING, CHANGE], options);
        },

        destroy: function() {
            history.unbind("change", this._urlChangedProxy);
            this.unbind();
        },

        start: function() {
            var that = this,
                urlChangedProxy = function(e) {
                    that._urlChanged(e);
                };

            history.start({
                change: urlChangedProxy,
                pushState: that.pushState,
                root: that.root
            });

            var initEventObject = { url: history.current || "/" };

            if (!that.trigger(INIT, initEventObject)) {
                that._urlChanged(initEventObject);
            }

            this._urlChangedProxy = urlChangedProxy;
        },

        route: function(route, callback) {
            this.routes.push(new Route(route, callback));
        },

        navigate: function(url, silent) {
            kendo.history.navigate(url, silent);
        },

        _urlChanged: function(e) {
            var url = e.url;
            if (!url) {
                url = "/";
            }

            if (this.trigger(CHANGE, {url: e.url})) {
                e.preventDefault();
                return;
            }

            var idx = 0,
                routes = this.routes,
                route,
                length = routes.length;

            for (; idx < length; idx ++) {
                 route = routes[idx];

                 if (route.worksWith(url)) {
                    return;
                 }
            }

            if (this.trigger(ROUTE_MISSING, { url: url })) {
                e.preventDefault();
            }
        }
    });

    kendo.Router = Router;
})();
