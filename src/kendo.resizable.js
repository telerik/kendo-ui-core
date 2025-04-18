import "./kendo.core.js";
import "./kendo.draganddrop.js";

export const __meta__ = {
    id: "resizable",
    name: "Resizable",
    category: "framework",
    depends: ["core", "draganddrop"],
    advanced: true
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        isFunction = kendo.isFunction,
        extend = $.extend,
        HORIZONTAL = "horizontal",
        VERTICAL = "vertical",
        START = "start",
        RESIZE = "resize",
        RESIZEEND = "resizeend";

    var Resizable = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.orientation = that.options.orientation.toLowerCase() != VERTICAL ? HORIZONTAL : VERTICAL;
            that._positionMouse = that.orientation == HORIZONTAL ? "x" : "y";
            that._position = that.orientation == HORIZONTAL ? "left" : "top";
            that._sizingDom = that.orientation == HORIZONTAL ? "outerWidth" : "outerHeight";

            that.draggable = new ui.Draggable(options.draggableElement || element, {
                distance: 1,
                filter: options.handle,
                drag: that._resize.bind(that),
                dragcancel: that._cancel.bind(that),
                dragstart: that._start.bind(that),
                dragend: that._dragend.bind(that),
                clickMoveClick: options.clickMoveClick
            });

            that.userEvents = that.draggable.userEvents;
        },

        events: [
            RESIZE,
            RESIZEEND,
            START
        ],

        options: {
            name: "Resizable",
            orientation: HORIZONTAL,
            clickMoveClick: false
        },

        resize: function() {
            // Overrides base widget resize
        },

        _max: function(e) {
            var that = this,
                hintSize = that.hint ? that.hint[that._sizingDom]() : 0,
                size = that.options.max;

            return isFunction(size) ? size(e) : size !== undefined ? (that._initialElementPosition + size) - hintSize : size;
        },

        _min: function(e) {
            var that = this,
                size = that.options.min;

            return isFunction(size) ? size(e) : size !== undefined ? that._initialElementPosition + size : size;
        },

        _start: function(e) {
            var that = this,
                hint = that.options.hint,
                el = $(e.currentTarget);

            that._initialElementPosition = el.position()[that._position];
            that._initialMousePosition = e[that._positionMouse].startLocation;

            if (hint) {
                that.hint = isFunction(hint) ? $(hint(el)) : hint;

                that.hint.css({
                    position: "absolute"
                })
                    .css(that._position, that._initialElementPosition)
                    .appendTo(that.element);
            }

            that.trigger(START, e);

            that._maxPosition = that._max(e);
            that._minPosition = that._min(e);

            $(document.body).css("cursor", el.css("cursor"));
        },

        _resize: function(e) {
            var that = this,
                maxPosition = that._maxPosition,
                minPosition = that._minPosition,
                currentPosition = that._initialElementPosition + (e[that._positionMouse].location - that._initialMousePosition),
                position;

            position = minPosition !== undefined ? Math.max(minPosition, currentPosition) : currentPosition;
            that.position = position = maxPosition !== undefined ? Math.min(maxPosition, position) : position;

            if (that.hint) {
                that.hint.toggleClass(that.options.invalidClass || "", position == maxPosition || position == minPosition)
                    .css(that._position, position);
            }

            that.resizing = true;
            that.trigger(RESIZE, extend(e, { position: position }));
        },

        _dragend: function(e) {
            this._stop();
            this.trigger(RESIZEEND, extend(e, { position: this.position }));
        },

        _stop: function() {
            var that = this;

            if (that.hint) {
                that.hint.remove();
            }

            that.resizing = false;
            $(document.body).css("cursor", "");
        },

        _cancel: function(e) {
            var that = this;

            if (that.hint) {
                that.position = undefined;
                that.hint.css(that._position, that._initialElementPosition);
                that._stop();
            }
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            if (that.draggable) {
                that.draggable.destroy();
            }
        },

        press: function(target) {
            if (!target) {
                return;
            }

            var position = target.position(),
                that = this;

            that.userEvents.press(position.left, position.top, target[0]);
            that.targetPosition = position;
            that.target = target;
        },

        move: function(delta) {
            var that = this,
                orientation = that._position,
                position = that.targetPosition,
                current = that.position;

            if (current === undefined) {
                current = position[orientation];
            }

            position[orientation] = current + delta;

            that.userEvents.move(position.left, position.top);
        },

        end: function() {
            this.userEvents.end();
            this.target = this.position = undefined;
        }
    });

    kendo.ui.plugin(Resizable);

})(window.kendo.jQuery);
export default kendo;

