(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Widget = ui.Widget,
        support = kendo.support,
        CHANGE = "change",
        SWITCHON = "km-switch-on",
        SWITCHOFF = "km-switch-off",
        MARGINLEFT = "margin-left",
        ACTIVE_STATE = "km-state-active",
        TRANSFORMSTYLE = support.transitions.css + "transform",
        proxy = $.proxy;

    function limitValue(value, minLimit, maxLimit) {
        return Math.max(minLimit, Math.min(maxLimit, value));
    }

    var Switch = Widget.extend({
        init: function(element, options) {
            var that = this, checked;

            Widget.fn.init.call(that, element, options);

            that._wrapper();
            that._drag();
            that._background();
            that._handle();

            that.constrain = 100;
            that.snapPoint = 40;
            that.container().bind("show", $.proxy(this, "viewShow"));

            element = that.element[0];
            element.type = "checkbox";
            that._animateBackground = true;

            checked = that.options.checked;

            if (checked === null) {
                checked = element.checked;
            }

            that.check(checked);
            kendo.notify(that, kendo.mobile.ui);
        },

        viewShow: function() {
            var that = this, width, handleWidth;

            width = that.wrapper.width();
            handleWidth = that.handle.outerWidth(true);

            that.constrain = width - handleWidth;
            that.snapPoint = width / 2 - handleWidth / 2;

            that.origin = parseInt(that.background.css(MARGINLEFT), 10);
            that.background.data("origin", that.origin);

            that.check(that.element[0].checked);
        },

        events: [
            CHANGE
        ],

        options: {
            name: "Switch",
            onLabel: "ON",
            offLabel: "OFF",
            checked: null
        },

        check: function(check) {
            var that = this,
                element = that.element[0];

            if (check === undefined) {
                return element.checked;
            }

            that._position(check ? that.constrain : 0);
            element.checked = check;
            that.wrapper
                .toggleClass(SWITCHON, check)
                .toggleClass(SWITCHOFF, !check);
        },

        destroy: function() {
            Widget.fn.destroy.call(this);
            this.userEvents.destroy();
        },

        toggle: function() {
            var that = this;

            that.check(!that.element[0].checked);
        },

        _move: function(e) {
            var that = this;
            e.preventDefault();
            that._position(limitValue(that.position + e.x.delta, 0, that.constrain));
        },

        _position: function(position) {
            var that = this;

            that.position = position;
            that.handle.css(TRANSFORMSTYLE, "translatex(" + position + "px)");

            if (that._animateBackground) {
                that.background.css(MARGINLEFT, that.origin + position);
            }
        },

        _start: function(e) {
            this.userEvents.capture();
            this.handle.addClass(ACTIVE_STATE);
        },

        _stop: function(e) {
            var that = this;

            that.handle.removeClass(ACTIVE_STATE);
            that._toggle(that.position > that.snapPoint);
        },

        _toggle: function (checked) {
            var that = this,
                handle = that.handle,
                element = that.element[0],
                value = element.checked,
                duration = 200,
                distance;

            that.wrapper
                .toggleClass(SWITCHON, checked)
                .toggleClass(SWITCHOFF, !checked);

            that.position = distance = checked * that.constrain;

            if (that._animateBackground) {
                that.background
                    .kendoStop(true, true)
                    .kendoAnimate({ effects: "slideMargin", offset: distance, reset: true, reverse: !checked, axis: "left", duration: duration });
            }

            handle
                .kendoStop(true, true)
                .kendoAnimate({
                    effects: "slideTo",
                    duration: duration,
                    offset: distance + "px,0",
                    reset: true,
                    complete: function () {
                        if (value !== checked) {
                            element.checked = checked;
                            that.trigger(CHANGE, { checked: checked });
                        }
                    }
                });
        },

        _background: function() {
            var that = this,
                background;

            background = $("<span class='km-switch-wrapper'><span class='km-switch-background'></span></span>")
                            .appendTo(that.wrapper)
                            .children(".km-switch-background");

            that.background = background;
        },

        _handle: function() {
            var that = this,
                options = that.options;

            that.handle = $("<span class='km-switch-container'><span class='km-switch-handle' /></span>")
                            .appendTo(that.wrapper)
                            .children(".km-switch-handle");

            that.handle.append('<span class="km-switch-label-on">' + options.onLabel + '</span><span class="km-switch-label-off">' + options.offLabel + '</span>');
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper = element.parent("span.km-switch");

            if (!wrapper[0]) {
                wrapper = element.wrap('<span class="km-switch"/>').parent();
            }

            that.wrapper = wrapper;
        },

        _drag: function() {
            var that = this;

            that.userEvents = new kendo.UserEvents(that.wrapper, {
                tap: function() {
                    that._toggle(!that.element[0].checked);
                },
                start: proxy(that._start, that),
                move: proxy(that._move, that),
                end: proxy(that._stop, that)
            });
        }
    });

    ui.plugin(Switch);
})(window.kendo.jQuery);
