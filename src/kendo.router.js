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
        CHANGE = "change",
        BACK = "back",
        support = kendo.support,
        location = window.location,
        history = window.history,
        _checkUrlInterval = 50,
        hashStrip = /^#*/,
        document = window.document;

    function absoluteURL(path, pathPrefix) {
        if (!pathPrefix) {
            return path;
        }

        if (path + "/" === pathPrefix) {
            path = pathPrefix;
        }

        var regEx = new RegExp("^" + pathPrefix, "i");

        if (!regEx.test(path)) {
            path = pathPrefix + "/" + path;
        }

        return location.protocol + '//' + (location.host + "/" + path).replace(/\/\/+/g, '/');
    }

    var History = kendo.Observable.extend({
        start: function(options) {
            options = options || {};

            console.log(options);

            this.bind([CHANGE, BACK], options);

            if (this._started) {
                return;
            }
            this._started = true;
            this._pushStateRequested = !!options.pushState;
            this._pushState = support.pushState && this._pushStateRequested;
            this.root = options.root || "/";
            this._interval = 0;

            if (this._normalizeUrl()) {
                return true;
            }

            this.current = this._currentLocation();
            this.locations = [this.current];
            this._listenToLocationChange();
        },

        stop: function() {
            $(window).unbind(".kendo");
            this.unbind(CHANGE);
            clearInterval(this._interval);
            this._started = false;
        },

        change: function(callback) {
            this.bind(CHANGE, callback);
        },

        navigate: function(to, silent) {
            if (to === "#:back") {
                history.back();
                return;
            }

            to = to.replace(hashStrip, '');

            if (this.current === to || this.current === decodeURIComponent(to)) {
                return;
            }

            if (!silent) {
                if (this.trigger(CHANGE, { url: to })) {
                    return;
                }
            }

            if (this._pushState) {
                history.pushState({}, document.title, this._makePushStateUrl(to));
                this.current = this._currentLocation();
            } else {
                location.hash = this.current = to;
            }

            this.locations.push(this.current);
        },

        _normalizeUrl: function() {
            var pushStateUrl,
                atRoot = this.root == location.pathname,
                atRootWithoutSlash = this.root == location.pathname + "/",
                pushStateUrlNeedsTransform = this._pushStateRequested && !support.pushState && !atRoot,
                hashUrlNeedsTransform = this._pushState && atRoot && location.hash;

            if (atRootWithoutSlash && this._pushState) {
                history.replaceState({}, document.title, this.root);
            }

            if (pushStateUrlNeedsTransform) {
                location.replace(this.root + '#' + this._stripRoot(location.pathname));
                return true;
            } else if (hashUrlNeedsTransform) {
                pushStateUrl = this._makePushStateUrl(location.hash.replace(hashStrip, ''));
                history.replaceState({}, document.title, pushStateUrl);
                return false;
            }
            return false;
        },

        _listenToLocationChange: function() {
            var _checkUrlProxy = $.proxy(this, "_checkUrl");

            if (this._pushState) {
                $(window).bind("popstate.kendo", _checkUrlProxy);
            } else if (support.hashChange) {
                $(window).bind("hashchange.kendo", _checkUrlProxy);
            } else {
                this._interval = setInterval(_checkUrlProxy, _checkUrlInterval);
            }
        },

        _checkUrl: function() {
            var current = this._currentLocation().replace(hashStrip, ''),
                back = current === this.locations[this.locations.length - 2],
                prev = this.current;

            if (this.current === current || this.current === decodeURIComponent(current)) {
                return;
            }

            this.current = current;

            if (back && this.trigger("back", { url: prev, to: current })) {
                history.forward();
                this.current = prev;
                return;
            }

            if (this.trigger(CHANGE, { url: current })) {
                if (back) {
                    history.forward();
                } else {
                    history.back();
                }
                this.current = prev;
                return;
            }

            if (back) {
                this.locations.pop();
            } else {
                this.locations.push(current);
            }
        },

        _stripRoot: function(url) {
            if (url.indexOf(this.root) === 0) {
                return (url.substr(this.root.length)).replace(/\/\//g, '/');
            } else {
                return url;
            }
        },

        _makePushStateUrl: function(address) {
            return absoluteURL(address, this.root);
        },

        _currentLocation: function() {
            var current;

            if (this._pushState) {
                current = location.pathname;

                if (location.search) {
                    current += location.search;
                }

                return this._stripRoot(current);
            } else {
                return location.hash.replace(hashStrip, '');
            }
        }
    });

    kendo.absoluteURL = absoluteURL;
    kendo.history = new History();
})(window.kendo.jQuery);

(function() {
    var kendo = window.kendo,
        history = kendo.history,
        Observable = kendo.Observable,
        INIT = "init",
        ROUTE_MISSING = "routeMissing",
        CHANGE = "change",
        BACK = "back",
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
            history.unbind(CHANGE, this._urlChangedProxy);
            history.unbind(BACK, this._backProxy);
            this.unbind();
        },

        start: function() {
            var that = this,
                backProxy = function(e) { that._back(e); },
                urlChangedProxy = function(e) { that._urlChanged(e); };

            history.start({
                change: urlChangedProxy,
                back: backProxy,
                pushState: that.pushState,
                root: that.root
            });

            var initEventObject = { url: history.current || "/" };

            if (!that.trigger(INIT, initEventObject)) {
                that._urlChanged(initEventObject);
            }

            this._urlChangedProxy = urlChangedProxy;
            this._backProxy = backProxy;
        },

        route: function(route, callback) {
            this.routes.push(new Route(route, callback));
        },

        navigate: function(url, silent) {
            kendo.history.navigate(url, silent);
        },

        _back: function(e) {
            if (this.trigger(BACK, { url: e.url, to: e.to })) {
                e.preventDefault();
            }
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
