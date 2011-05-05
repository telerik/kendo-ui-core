(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        keys = kendo.keys,
        FOCUSED = "t-state-focused",
        NAVIGATABLE = "t-navigatable",
        proxy = $.proxy,
        Component = ui.Component;

    function focus(element) {
        if (element && element[0]) {
            return element.addClass(FOCUSED);
        }
    }

    function blur(element) {
        if (element && element[0]) {
            return element.removeClass(FOCUSED);
        }
    }

    function Navigatable(element, options) {
        var that = this,
            actions = {};

        Component.apply(that, arguments);

        element.tabIndex = Math.max(element.tabIndex, 0);

        options = that.options;

        that.element
            .bind( {
                keydown: proxy(that._keydown, that),
                focus: proxy(that._focus, that),
                blur: proxy(that._blur, that)
            })
        that.context = $(options.context || that.element);

        that.context.addClass(NAVIGATABLE)
            .delegate("." + NAVIGATABLE + options.filter, "mousedown", proxy(that._mousedown, that));

        actions[keys.UP] = options.up;
        actions[keys.DOWN] = options.down;
        actions[keys.LEFT] = options.left;
        actions[keys.RIGHT] = options.right;

        that.actions = actions;
    }

    Navigatable.prototype = {
        options: {
            filter: ">*",
            up: function(context, current) {
                return current.prev();
            },
            down: function(context, current) {
                return current.next();
            },
            left: function() {
                return null;
            },
            right: function() {
                return null;
            },
            home: function(context, current) {
                return context.children().first();
            }
        },
        _keydown: function(e) {
            var that = this,
                next,
                action = that.actions[e.keyCode];

            if (action) {
                next = action(that.context, that.current);
                if (next && next[0]) {
                    blur(that.current);
                    that.current = focus(next);
                }
            }
        },
        _focus: function(e) {
            var that = this;

            if (!that.current) {
                that.current = that.options.home(that.context);
            }

            focus(that.current);
        },
        _blur: function() {
            var that = this;

            blur(that.current);
        },
        _mousedown: function(e) {
            var that = this;

            blur(that.current);

            that.current = focus($(e.currentTarget));
        }
    }

    ui.plugin("Navigatable", Navigatable, Component);
})(jQuery);
