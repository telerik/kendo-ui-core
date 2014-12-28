(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = {
    id: "router",
    name: "Router",
    category: "framework",
    description: "The Router class is responsible for tracking the application state and navigating between the application states.",
    depends: [ "core" ],
    hidden: false
};

(function($, undefined) {
    var kendo = window.kendo,
        CHANGE = "change",
        BACK = "back",
        SAME = "same",
        support = kendo.support,
        location = window.location,
        history = window.history,
        CHECK_URL_INTERVAL = 50,
        BROKEN_BACK_NAV = kendo.support.browser.msie,
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

    function hashDelimiter(bang) {
        return bang ? "#!" : "#";
    }

    function locationHash(hashDelimiter) {
        var href = location.href;

        // ignore normal anchors if in hashbang mode - however, still return "" if no hash present
        if (hashDelimiter === "#!" && href.indexOf("#") > -1 && href.indexOf("#!") < 0) {
            return null;
        }

        return href.split(hashDelimiter)[1] || "";
    }

    function stripRoot(root, url) {
        if (url.indexOf(root) === 0) {
            return (url.substr(root.length)).replace(/\/\//g, '/');
        } else {
            return url;
        }
    }

    var HistoryAdapter = kendo.Class.extend({
        back: function() {
            if (BROKEN_BACK_NAV) {
                setTimeout(function() { history.back(); });
            } else {
                history.back();
            }
        },

        forward: function() {
            if (BROKEN_BACK_NAV) {
                setTimeout(function() { history.forward(); });
            } else {
                history.forward();
            }
        },

        length: function() {
            return history.length;
        },

        replaceLocation: function(url) {
            location.replace(url);
        }
    });

    var PushStateAdapter = HistoryAdapter.extend({
        init: function(root) {
            this.root = root;
        },

        navigate: function(to) {
            history.pushState({}, document.title, absoluteURL(to, this.root));
        },

        replace: function(to) {
            history.replaceState({}, document.title, absoluteURL(to, this.root));
        },

        normalize: function(url) {
            return stripRoot(this.root, url);
        },

        current: function() {
            var current = location.pathname;

            if (location.search) {
                current += location.search;
            }

            return stripRoot(this.root, current);
        },

        change: function(callback) {
            $(window).bind("popstate.kendo", callback);
        },

        stop: function() {
            $(window).unbind("popstate.kendo");
        },

        normalizeCurrent: function(options) {
            var fixedUrl,
                root = options.root,
                pathname = location.pathname,
                hash = locationHash(hashDelimiter(options.hashBang));

            if (root === pathname + "/") {
                fixedUrl = root;
            }

            if (root === pathname && hash) {
                fixedUrl = absoluteURL(hash.replace(hashStrip, ''), root);
            }

            if (fixedUrl) {
                history.pushState({}, document.title, fixedUrl);
            }
        }
    });

    function fixHash(url) {
        return url.replace(/^(#)?/, "#");
    }

    function fixBang(url) {
        return url.replace(/^(#(!)?)?/, "#!");
    }

    var HashAdapter = HistoryAdapter.extend({
        init: function(bang) {
            this._id = kendo.guid();
            this.prefix = hashDelimiter(bang);
            this.fix = bang ? fixBang : fixHash;
        },

        navigate: function(to) {
            location.hash = this.fix(to);
        },

        replace: function(to) {
            this.replaceLocation(this.fix(to));
        },

        normalize: function(url) {
            if (url.indexOf(this.prefix) < 0) {
               return url;
            } else {
                return url.split(this.prefix)[1];
            }
        },

        change: function(callback) {
            if (support.hashChange) {
                $(window).on("hashchange." + this._id, callback);
            } else {
                this._interval = setInterval(callback, CHECK_URL_INTERVAL);
            }
        },

        stop: function() {
            $(window).off("hashchange." + this._id);
            clearInterval(this._interval);
        },

        current: function() {
            return locationHash(this.prefix);
        },

        normalizeCurrent: function(options) {
            var pathname = location.pathname,
                root = options.root;

            if (options.pushState && root !== pathname) {
                this.replaceLocation(root + this.prefix + stripRoot(root, pathname));
                return true; // browser will reload at this point.
            }

            return false;
        }
    });

    var History = kendo.Observable.extend({
        start: function(options) {
            options = options || {};

            this.bind([CHANGE, BACK, SAME], options);

            if (this._started) {
                return;
            }

            this._started = true;

            options.root = options.root || "/";

            var adapter = this.createAdapter(options),
                current;

            // adapter may reload the document
            if (adapter.normalizeCurrent(options)) {
                return;
            }

            current = adapter.current();

            $.extend(this, {
                adapter: adapter,
                root: options.root,
                historyLength: adapter.length(),
                current: current,
                locations: [current]
            });

            adapter.change($.proxy(this, "_checkUrl"));
        },

        createAdapter:function(options) {
           return support.pushState && options.pushState ? new PushStateAdapter(options.root) : new HashAdapter(options.hashBang);
        },

        stop: function() {
            if (!this._started) {
                return;
            }
            this.adapter.stop();
            this.unbind(CHANGE);
            this._started = false;
        },

        change: function(callback) {
            this.bind(CHANGE, callback);
        },

        replace: function(to, silent) {

            this._navigate(to, silent, function(adapter) {
                adapter.replace(to);
                this.locations[this.locations.length - 1] = this.current;
            });
        },

        navigate: function(to, silent) {
            if (to === "#:back") {
                this.backCalled = true;
                this.adapter.back();
                return;
            }

            this._navigate(to, silent, function(adapter) {
                adapter.navigate(to);
                this.locations.push(this.current);
            });
        },

        _navigate: function(to, silent, callback) {
            var adapter = this.adapter;

            to = adapter.normalize(to);

            if (this.current === to || this.current === decodeURIComponent(to)) {
                this.trigger(SAME);
                return;
            }

            if (!silent) {
                if (this.trigger(CHANGE, { url: to })) {
                    return;
                }
            }

            this.current = to;

            callback.call(this, adapter);

            this.historyLength = adapter.length();
        },

        _checkUrl: function() {
            var adapter = this.adapter,
                current = adapter.current(),
                newLength = adapter.length(),
                navigatingInExisting = this.historyLength === newLength,
                back = current === this.locations[this.locations.length - 2] && navigatingInExisting,
                backCalled = this.backCalled,
                prev = this.current;

            if (current === null || this.current === current || this.current === decodeURIComponent(current)) {
                return true;
            }

            this.historyLength = newLength;
            this.backCalled = false;

            this.current = current;

            if (back && this.trigger("back", { url: prev, to: current })) {
                adapter.forward();
                this.current = prev;
                return;
            }

            if (this.trigger(CHANGE, { url: current, backButtonPressed: !backCalled })) {
                if (back) {
                    adapter.forward();
                } else {
                    adapter.back();
                    this.historyLength --;
                }
                this.current = prev;
                return;
            }

            if (back) {
                this.locations.pop();
            } else {
                this.locations.push(current);
            }
        }
    });

    kendo.History = History;
    kendo.History.HistoryAdapter = HistoryAdapter;
    kendo.History.HashAdapter = HashAdapter;
    kendo.History.PushStateAdapter = PushStateAdapter;
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
        SAME = "same",
        optionalParam = /\((.*?)\)/g,
        namedParam = /(\(\?)?:\w+/g,
        splatParam = /\*\w+/g,
        escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

    function namedParamReplace(match, optional) {
        return optional ? match : '([^\/]+)';
    }

    function routeToRegExp(route, ignoreCase) {
        return new RegExp('^' + route
            .replace(escapeRegExp, '\\$&')
            .replace(optionalParam, '(?:$1)?')
            .replace(namedParam, namedParamReplace)
            .replace(splatParam, '(.*?)') + '$', ignoreCase ? "i" : "");
    }

    function stripUrl(url) {
        return url.replace(/(\?.*)|(#.*)/g, "");
    }

    var Route = kendo.Class.extend({
        init: function(route, callback, ignoreCase) {
            if (!(route instanceof RegExp)) {
                route = routeToRegExp(route, ignoreCase);
            }

            this.route = route;
            this._callback = callback;
        },

        callback: function(url) {
            var params,
                idx = 0,
                length,
                queryStringParams = kendo.parseQueryStringParams(url);

            url = stripUrl(url);
            params = this.route.exec(url).slice(1);
            length = params.length;

            for (; idx < length; idx ++) {
                if (typeof params[idx] !== 'undefined') {
                    params[idx] = decodeURIComponent(params[idx]);
                }
            }

            params.push(queryStringParams);

            this._callback.apply(null, params);
        },

        worksWith: function(url) {
            if (this.route.test(stripUrl(url))) {
                this.callback(url);
                return true;
            } else {
                return false;
            }
        }
    });

    var Router = Observable.extend({
        init: function(options) {
            if (!options) {
                options = {};
            }

            Observable.fn.init.call(this);

            this.routes = [];
            this.pushState = options.pushState;
            this.hashBang = options.hashBang;
            this.root = options.root;
            this.ignoreCase = options.ignoreCase !== false;

            this.bind([INIT, ROUTE_MISSING, CHANGE, SAME], options);
        },

        destroy: function() {
            history.unbind(CHANGE, this._urlChangedProxy);
            history.unbind(SAME, this._sameProxy);
            history.unbind(BACK, this._backProxy);
            this.unbind();
        },

        start: function() {
            var that = this,
                sameProxy = function() { that._same(); },
                backProxy = function(e) { that._back(e); },
                urlChangedProxy = function(e) { that._urlChanged(e); };

            history.start({
                same: sameProxy,
                change: urlChangedProxy,
                back: backProxy,
                pushState: that.pushState,
                hashBang: that.hashBang,
                root: that.root
            });

            var initEventObject = { url: history.current || "/", preventDefault: $.noop };

            if (!that.trigger(INIT, initEventObject)) {
                that._urlChanged(initEventObject);
            }

            this._urlChangedProxy = urlChangedProxy;
            this._backProxy = backProxy;
        },

        route: function(route, callback) {
            this.routes.push(new Route(route, callback, this.ignoreCase));
        },

        navigate: function(url, silent) {
            kendo.history.navigate(url, silent);
        },

        replace: function(url, silent) {
            kendo.history.replace(url, silent);
        },

        _back: function(e) {
            if (this.trigger(BACK, { url: e.url, to: e.to })) {
                e.preventDefault();
            }
        },

        _same: function(e) {
            this.trigger(SAME);
        },

        _urlChanged: function(e) {
            var url = e.url;

            if (!url) {
                url = "/";
            }

            if (this.trigger(CHANGE, { url: e.url, params: kendo.parseQueryStringParams(e.url), backButtonPressed: e.backButtonPressed })) {
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

            if (this.trigger(ROUTE_MISSING, { url: url, params: kendo.parseQueryStringParams(url), backButtonPressed: e.backButtonPressed })) {
                e.preventDefault();
            }
        }
    });

    kendo.Router = Router;
})();

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
