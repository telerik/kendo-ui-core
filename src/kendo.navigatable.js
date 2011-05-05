(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        keys = kendo.keys,
        FOCUSED = "t-state-focused",
        FOCUS = "focus",
        NAVIGATABLE = "t-navigatable",
        proxy = $.proxy,
        Component = ui.Component;

    function Navigatable(element, options) {
        var that = this,
            actions = {};

        Component.apply(that, arguments);

        element.tabIndex = Math.max(element.tabIndex, 0);

        options = that.options;

        that.element
            .bind({
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
        that.bind([FOCUS], options);
    }

    $.extend(Navigatable, {
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
    });

    Navigatable.prototype = {
        options: {
            filter: ">*",
            up: Navigatable.up,
            down: Navigatable.down,
            left: Navigatable.left,
            right: Navigatable.right,
            home: Navigatable.home
        },
        _keydown: function(e) {
            var that = this,
                action = that.actions[e.keyCode];

            if (action) {
                that._change(action(that.context, that.current));

                e.preventDefault();
            }
        },
        _focus: function(e) {
            var that = this;

            if (!that.current) {
                that._change(that.options.home(that.context));
            } else {
                that.current.addClass(FOCUSED);
                that.trigger(FOCUS);
            }
        },
        _blur: function() {
            this.current.removeClass(FOCUSED);
        },
        _mousedown: function(e) {
            this._change($(e.currentTarget));
        },
        _change: function(candidate) {
            var that = this;
            if (candidate && candidate[0]) {
                candidate.addClass(FOCUSED);
                if (!that.current || that.current[0] !== candidate[0]) {
                    if (that.current) {
                        that.current.removeClass(FOCUSED);
                    }
                    that.current = candidate;
                    that.trigger(FOCUS);
                }
            }
        }
    }

    ui.plugin("Navigatable", Navigatable, Component);
})(jQuery);
