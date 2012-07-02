(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        support = kendo.support,
        proxy = $.proxy,
        SLIDE = "slide",
        CHANGE = "change",
        ACTIVE_STATE = "km-state-active",
        MARGINLEFT = "margin-left",
        TRANSFORMSTYLE = support.transitions.css + "transform";

    function limitValue(value, minLimit, maxLimit) {
        return Math.max( minLimit, Math.min( maxLimit, value));
    }

    var ColorSlider = Widget.extend({
        init: function(element, options) {
            var that = this, width;

            Widget.fn.init.call(that, element, options);

            that._wrapper();
            that._drag();
            that._background();
            that._handle();

            width = that.wrapper.width();
            that.point = that.options.value;

            that.constrain = width;
            that.handleWidth = that.handle.outerWidth(true);
            that.snapPoint = that.constrain / (that.options.max - 1);

            that.value(that.point);
            that.bind([ CHANGE, SLIDE ], that.options);
        },

        events: [
            CHANGE,
            SLIDE
        ],

        options: {
            name: "ColorSlider",
            value: 0,
            max: 101,
            animateBackground: true
        },

        value: function (value) {
            var that = this;

            if (isNaN(value)) {
                return that.point;
            }

            that.point = value;
            that._position(value * that.snapPoint);
        },

        _move: function(e) {
            var that = this, value;
            e.preventDefault();

            value = that._position(limitValue((e.event.clientX - that.targetOffsetX) - (that.handleWidth / 2), 0, that.constrain));
            if (value != that.point)
                that.trigger(SLIDE, { value: value });
            that.point = value;
        },

        _position: function(position) {
            var that = this;

            that.position = position;
            that.handle.css(TRANSFORMSTYLE, "translatex(" + position + "px)");

            if (that.options.animateBackground) {
                that.background.css(MARGINLEFT, that.origin + position);
            }

            return Math.round(that.position / that.snapPoint);
        },

        _start: function(e) {
            var that = this;

            that.targetOffsetX = e.target.offset().left;
            that.drag.capture();
            that.handle.addClass(ACTIVE_STATE);
        },

        _stop: function(e) {
            var that = this;

            that.point = that._position(limitValue((e.event.clientX - e.target.offset().left) - (that.handleWidth / 2), 0, that.constrain));
            that.handle.removeClass(ACTIVE_STATE);
            that.trigger(CHANGE, { value: that.point });
        },

        _background: function() {
            var that = this,
                background = that.wrapper.children(".km-slider-wrapper").children(".km-slider-background");

            if (!background[0]) {
                background = $("<span class='km-slider-wrapper'><span class='km-slider-background'></span></span>")
                                .appendTo(that.wrapper)
                                .children(".km-slider-background");
            }

            that.origin = parseInt(background.css(MARGINLEFT), 10);
            background.data("origin", that.origin);
            that.background = background;
        },

        _handle: function() {
            var that = this,
                handle = that.wrapper.children(".km-slider-container").children(".km-slider-handle");

            if (!handle[0]) {
                handle = $("<span class='km-slider-container'><span class='km-slider-handle' /></span>")
                                .appendTo(that.wrapper)
                                .children(".km-slider-handle");
            }

            that.handle = handle;
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper = element.parent("span.km-slider");

            if (!wrapper[0]) {
                wrapper = element.wrap('<span class="km-slider"/>').parent();
                element.hide();
            }

            that.wrapper = wrapper;
        },

        _drag: function() {
            var that = this;

            if (!that.drag) {
                that.drag = new kendo.Drag(that.wrapper, {
                    global: true,
                    tap: function(e) {
                        that.point = that._position(limitValue((e.event.clientX - e.target.offset().left) - (that.handleWidth / 2), 0, that.constrain));
                        that.trigger(CHANGE, { value: that.point });
                    },
                    start: proxy(that._start, that),
                    move: proxy(that._move, that),
                    end: proxy(that._stop, that)
                });
            }
        }
    });

    ui.plugin(ColorSlider);
})(jQuery);
