kendo_module({
    id: "spa",
    name: "Single Page Application",
    category: "framework",
    depends: [ "core", "history" ],
    hidden: false
});

(function(){
    var kendo = window.kendo,
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

    kendo.Route = Route;
})();

(function($, undefined) {
    var kendo = window.kendo,
        history = kendo.history,
        Observable = kendo.Observable,
        Route = kendo.Route,
        INIT = "init",
        EVENTS = [ INIT ];

    var Router = Observable.extend({
        init: function(options) {
            Observable.fn.init.call(this);
            this.routes = [];
            this.bind(EVENTS, options);
        },

        destroy: function() {
            history.unbind("ready", this.urlChangedProxy);
            history.unbind("change", this.urlChangedProxy);
            this.unbind();
        },

        start: function() {
            var that = this,
                urlChangedProxy = function(e) {
                    that._urlChanged(e.url);
                };

            kendo.history.start({
                ready: urlChangedProxy,
                change: urlChangedProxy
            });

            this._urlChangedProxy = urlChangedProxy;
            this.trigger(INIT);
        },

        route: function(route, callback) {
            this.routes.push(new Route(route, callback));
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
        }
    });

    var View = Observable.extend({
        init: function(options) {
            Observable.fn.init.call(this);
            this.template = options.template;
            this.tagName = options.tagName || "div";
            this.model = options.model;
        },

        render: function() {
            var that = this;
            if (!that.element) {
                var element = $("<" + that.tagName + " />");
                element.append($(that.template).html());
                that.element = element;
                kendo.bind(that.element, that.model);
            }

            return that.element;
        }
    })

    kendo.Router = Router;
    kendo.View = View;
})(window.kendo.jQuery);
