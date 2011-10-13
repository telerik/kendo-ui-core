;(function($, undefined) {

    // Cached regular expressions for matching named param parts and splatted
    // parts of route strings.
    var namedParam    = /:([\w\d]+)/g;
    var splatParam    = /\*([\w\d]+)/g;
    var escapeRegExp  = /[-[\]{}()+?.,\\^$|#\s]/g;


    function _routeToRegExp(route) {
        route = route.replace(escapeRegExp, "\\$&")
        .replace(namedParam, "([^\/]*)")
        .replace(splatParam, "(.*?)");
        return new RegExp('^' + route + '$');
    }

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted parameters.
    function _extractParameters (route, fragment) {
        return route.exec(fragment).slice(1);
    }

    kendo.View = kendo.Class.extend({
        init: function(params) {
            var that = this;
            this.events = this.events || {};
            this.boundEvents = {};
            $.each(params, function(key, value) {
                that[key] = value;
            });
        },

        render: function() {
            if (this.url) {
                $.ajax({
                    url: this.url,
                    dataType: "html",
                    success: function(content) {
                        kendo.Application.contentElement().html(content);
                    }
                });
            }
        },

        _render: function() {

            this.render();
            var that = this;

            $.each(this.events, function(eventDef, callback) {
                var eventParts = eventDef.split(" "),
                    event = eventParts[0],
                    selector = eventParts[1];

                callback = $.proxy(callback, that);

                that.boundEvents[eventDef] = callback;

                $(document).delegate(selector, event, callback);
            });
        },

        _destroy: function() {
            $.each(this.boundEvents, function(eventDef, callback) {
                var eventParts = eventDef.split(" "),
                    event = eventParts[0],
                    selector = eventParts[1];

                $(document).undelegate(selector, event, callback);
            });
        }
    });

    kendo.Controller = kendo.Class.extend({
        rendered: false,

        init: function() {
            this._viewParams = {};
        },

        render: function() {
            var view;

            if (this.rendered) {
                return;
            }

            view = new this.view(this._viewParams);

            if (kendo.Application._currentView) {
                kendo.Application._currentView._destroy();
            }

            kendo.Application._currentView = view;
            view._render();

            this.rendered = true;
        },

        set: function(key, value) {
            this._viewParams[key] = value;
        },

        _run: function(actionName, params) {
            this.view = kendo.Application._views[this._name + '.' + actionName];
            this[actionName].apply(this, params);
            this.render();
        }
    });

    kendo.Application = {
        _views: {},
        _controllers: {},

        init: function(options) {
            kendo.History.start(options);
        },

        navigate: function(fragment) {
            kendo.History.navigate(fragment);
        },

        route: function(routes) {
            var that = this;
            $.each(routes, function(routeString, routeDef) {
                if (routeString === '/') {
                    routeString = '';
                }

                var route = _routeToRegExp(routeString);

                kendo.History.route(route, function(fragment) {
                    var routeParts = routeDef.split('.'),
                    actionName = routeParts[1],
                    Controller = that._controllers[routeParts[0]];

                    new Controller()._run(actionName, _extractParameters(route, fragment));
                });
            });
        },

        view: function(viewName, options) {
            this._views[viewName] = kendo.View.extend(options);
        },

        controller: function(controllerName, actions) {
            actions._name = controllerName;
            var Controller = kendo.Controller.extend(actions);
            this._controllers[controllerName] = Controller;

            $.each(actions, function(actionName, callback) {
                var route, routeString;
                routeString = '/' + controllerName + '/' + actionName;
                var argsExpected = callback.length;

                while (argsExpected -- > 0) {
                    routeString += "/:a";
                }

                route = _routeToRegExp(routeString);

                console.log(route);
                kendo.History.route(route, function(fragment) {
                    new Controller()._run(actionName, _extractParameters(route, fragment));
                });
            });
        }
    }
})(jQuery);
