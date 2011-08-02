(function($, window, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Component = ui.Component,
        HORIZONTAL = "horizontal",
        VERTICAL = "vertical",
        START = "start",
        RESIZE = "resize",
        RESIZEEND = "resizeend";

    var Resizable = Component.extend({
        init: function(element, options) {
            var that = this;

            Component.fn.init.call(that, element, options);

            that.orientation = that.options.orientation.toLowerCase() != VERTICAL ? HORIZONTAL : VERTICAL;
            that._positionMouseProperty = that.orientation == HORIZONTAL ? "pageX" : "pageY";
            that._positionProperty = that.orientation == HORIZONTAL ? "left" : "top";
            that._sizingDomProperty = that.orientation == HORIZONTAL ? "outerWidth" : "outerHeight";
            that.bind([RESIZE,RESIZEEND,START], that.options);

            new ui.Draggable(element, {
                distance: 0,
                filter: options.handle,
                drag: $.proxy(that._resize, that),
                dragstart: $.proxy(that._start, that),
                dragend: $.proxy(that._stop, that)
            });
        },

        options: {
            orientation: HORIZONTAL
        },
        _max: function(e) {
            var that = this,
                hintSize = that.hint ? that.hint[that._sizingDomProperty]() : 0,
                size = that.options.max;

            return $.isFunction(size) ? size(e) : size !== undefined ? (that._initialElementPosition + size) - hintSize : size;
        },
        _min: function(e) {
            var that = this,
                size = that.options.min;

            return $.isFunction(size) ? size(e) : size !== undefined ? that._initialElementPosition + size : size;
        },
        _start: function(e) {
            var that = this,
                hint = that.options.hint,
                el = $(e.currentTarget);

            that._initialMousePosition = e[that._positionMouseProperty];
            that._initialElementPosition = el.position()[that._positionProperty];

            if (hint) {
                that.hint = $.isFunction(hint) ? $(hint(el)) : hint;

                that.hint.css({
                    position: "absolute"
                })
                .css(that._positionProperty, that._initialElementPosition)
                .appendTo(that.element);
            }

            that.trigger(START, e);

            that._maxPosition = that._max(e);
            that._minPosition = that._min(e);

            $(document.body).css("cursor", el.css("cursor"));
        },
        _resize: function(e) {
            var that = this,
                handle = $(e.currentTarget),
                maxPosition = that._maxPosition,
                minPosition = that._minPosition,
                currentPosition = that._initialElementPosition + (e[that._positionMouseProperty] - that._initialMousePosition),
                position;

            position = minPosition !== undefined ? Math.max(minPosition, currentPosition) : currentPosition;
            that.position = position =  maxPosition !== undefined ? Math.min(maxPosition, position) : position;

            if(that.hint) {
                that.hint.toggleClass(that.options.invalidClass || "", position == maxPosition || position == minPosition)
                         .css(that._positionProperty, position);
            }

            that.trigger(RESIZE, $.extend(e, { position: position }));
        },
        _stop: function(e) {
            var that = this;

            if(that.hint) {
                that.hint.remove();
            }

            that.trigger(RESIZEEND, $.extend(e, { position: that.position }));
            $(document.body).css("cursor", "");
        }
    });

    kendo.ui.plugin("Resizable", Resizable);

})(jQuery, window);
