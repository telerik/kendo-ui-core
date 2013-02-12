kendo_module({
    id: "router",
    name: "history",
    category: "framework",
    description: "Kendo Router",
    depends: [ "core" ],
    hidden: false
});

(function($, undefined) {
    var kendo = window.kendo,
        location = window.location,
        history = window.history,
        _checkUrlInterval = 50,
        hashStrip = /^#*/,
        documentMode = window.document.documentMode,
        oldIE = kendo.support.browser.msie && (!documentMode || documentMode <= 8),
        hashChangeSupported = ("onhashchange" in window) && !oldIE,
        document = window.document;

    var History = kendo.Observable.extend({
        start: function(options) {
            options = options || {};

            var that = this;

            that._pushStateRequested = !!options.pushState;
            that._pushState = that._pushStateRequested && that._pushStateSupported();
            that.root = options.root || "/";
            that._interval = 0;

            this.bind(["change", "ready"], options);
            if (that._normalizeUrl()) {
                return true;
            }

            that.current = that._currentLocation();
            that._listenToLocationChange();
            that.trigger("ready", {url: that.current});
        },

        stop: function() {
            $(window).unbind(".kendo");
            this.unbind("change");
            this.unbind("ready");
            clearInterval(this._interval);
        },

        _normalizeUrl: function() {
            var that = this,
                pushStateUrl,
                atRoot = that.root == location.pathname,
                pushStateUrlNeedsTransform = that._pushStateRequested && !that._pushStateSupported() && !atRoot,
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
            } else if (hashChangeSupported) {
                $(window).bind("hashchange.kendo", _checkUrlProxy);
            } else {
                that._interval = setInterval(_checkUrlProxy, _checkUrlInterval);
            }
        },

        _pushStateSupported: function() {
            return window.history && window.history.pushState;
        },

        _checkUrl: function() {
            var that = this, current = that._currentLocation();

            if (current != that.current) {
                that.navigate(current);
            }
        },

        _stripRoot: function(url) {
            var that = this;

            if (url.indexOf(that.root) === 0) {
                return ('/' + url.substr(that.root.length)).replace(/\/\//g, '/');
            } else {
                return url;
            }
        },

        _makePushStateUrl: function(address) {
            var that = this;

            if (address.indexOf(that.root) !== 0) {
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

            if (that._pushState) {
                history.pushState({}, document.title, that._makePushStateUrl(to));
                that.current = to;
            } else {
                location.hash = that.current = to;
            }

            if (!silent) {
                that.trigger("change", {url: that.current});
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
            this.bind([INIT, ROUTE_MISSING], options);
        },

        destroy: function() {
            history.unbind("ready", this._readyProxy);
            history.unbind("change", this._urlChangedProxy);
            this.unbind();
        },

        start: function() {
            var that = this,
                readyProxy = function(e) {
                    if (!e.url) {
                        e.url = "/";
                    }

                    if (!that.trigger(INIT, e)) {
                        that._urlChanged(e.url);
                    }
                },

                urlChangedProxy = function(e) {
                    that._urlChanged(e.url);
                };

            kendo.history.start({
                ready: readyProxy,
                change: urlChangedProxy
            });

            this._urlChangedProxy = urlChangedProxy;
            this._readyProxy = readyProxy;
        },

        route: function(route, callback) {
            this.routes.push(new Route(route, callback));
        },

        navigate: function(url, silent) {
            kendo.history.navigate(url, silent);
        },

        _urlChanged: function(url) {
            if (!url) {
                url = "/";
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

            this.trigger(ROUTE_MISSING, { url: url });
        }
    });

    kendo.Router = Router;
})();
