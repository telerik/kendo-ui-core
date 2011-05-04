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
        var that = this;

        Component.apply(that, arguments);

        that.element
            .addClass(NAVIGATABLE)
            .attr("tabIndex", 0)
            .bind( {
                keydown: proxy(that._keydown, that),
                focus: proxy(that._focus, that),
                blur: proxy(that._blur, that)
            })
            .delegate("." + NAVIGATABLE + that.options.filter, "mousedown", proxy(that._mousedown, that));

        that.actions = {};
        that.actions[keys.UP] = that.options.up;
        that.actions[keys.DOWN] = that.options.down;
        that.actions[keys.LEFT] = that.options.left;
        that.actions[keys.RIGHT] = that.options.right;
    }

    Navigatable.prototype = {
        options: {
            filter: ">*",
            up: function(element, current) {
                return current.prev();
            },
            down: function(element, current) {
                return current.next();
            },
            left: function() {
                return null;
            },
            right: function() {
                return null;
            },
            home: function(element, current) {
                return element.children().first();
            }
        },
        _keydown: function(e) {
            var that = this,
                next,
                action = that.actions[e.keyCode];

            if (action) {
                next = action(that.element, that.current);
                if (next && next[0]) {
                    blur(that.current);
                    that.current = focus(next);
                }
            }
        },
        _focus: function(e) {
            var that = this;

            if (!that.current) {
                that.current = that.options.home(that.element);
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
