(function ($, window, undefined) {
    var kendo = window.kendo,
        document = window.document,
        Component = kendo.ui.Component,
        proxy = $.proxy,
        extend = $.extend,
        touch = kendo.support.touch,
        draggables = {},
        NAMESPACE = ".kendo-dnd",
        MOUSEENTER = "mouseenter",
        MOUSEUP = touch? "touchend" : "mouseup",
        MOUSEDOWN = touch? "touchstart" : "mousedown",
        MOUSEMOVE = touch? "touchmove" : "mousemove",
        KEYDOWN = "keydown",
        MOUSELEAVE = "mouseleave",
        SELECTSTART = "selectstart",

        DRAGSTART = "dragstart",
        DRAGEND = "dragend",
        DRAG = "drag",
        DRAGENTER = "dragenter",
        DRAGLEAVE = "dragleave",
        DROP = "drop";

    function bind(element, filter, eventName, handler) {
        if (filter) {
            element.delegate(filter, eventName, handler);
        } else {
            element.bind(eventName, handler);
        }
    }

    var DropTarget = Component.extend( {
        init: function(element, options) {
            var that = this;

            Component.fn.init.call(that, element, options);

            that.element.bind(MOUSEENTER, proxy(that._over, that))
                .bind(MOUSEUP, proxy(that._drop, that))
                .bind(MOUSELEAVE, proxy(that._out, that));

            that.bind([DRAGENTER, DRAGLEAVE, DROP], that.options);
        },

        options: {
            group: "default"
        },

        _trigger: function(eventName, e) {
            var that = this,
                draggable = draggables[that.options.group];

            if (draggable) {
                return that.trigger(eventName, extend({}, e, {
                           draggable: draggable
                       }));
            }
        },

        _over: function(e) {
            this._trigger(DRAGENTER, e);
        },

        _out: function(e) {
            this._trigger(DRAGLEAVE, e);
        },

        _drop: function(e) {
            var that = this,
                draggable = draggables[that.options.group];

            if (draggable) {
                draggable.dropped = !that._trigger(DROP, e);
            }
        }
    });

    kendo.ui.plugin("DropTarget", DropTarget);

    var Draggable = Component.extend( {
        init: function (element, options) {
            var that = this;

            Component.fn.init.call(that, element, options);

            bind(that.element, that.options.filter, MOUSEDOWN + NAMESPACE, proxy(that._wait, that));

            that.bind([DRAGSTART, DRAG, DRAGEND], that.options);
        },

        options: {
            distance: 5,
            group: "default",
            cursorOffset: {
                left: 10,
                top: 10
            },
            dropped: false
        },

        _startDrag: function(e) {
            var that = this,
                filter = that.options.filter;

            that._offset = kendo.touchLocation(e);

            if (filter) {
                that.currentTarget = $(e.target).is(filter) ? $(e.target) : $(e.target).closest(filter);
            } else {
                that.currentTarget = $(e.currentTarget);
            }

            $(document).bind(MOUSEMOVE + NAMESPACE, proxy(that._start, that))
                       .bind(MOUSEUP + NAMESPACE, proxy(that._destroy, that));
        },

        _wait: function (e) {
            var that = this;

            that._startDrag(e);

            // Prevent text selection for Gecko and WebKit
            if (!touch) {
                e.preventDefault();
            }
        },

        _start: function(e) {
            var that = this,
                location = kendo.touchLocation(e),
                pageX = location.x,
                pageY = location.y,
                x = that._offset.x - pageX,
                y = that._offset.y - pageY,
                distance = Math.sqrt((x * x) + (y * y)),
                options = that.options,
                cursorOffset = options.cursorOffset,
                hint = options.hint;

            if (distance >= options.distance) {
                if (hint) {
                    that.hint = $.isFunction(hint) ? $(hint(that.currentTarget)) : hint;

                    that.hint.css( {
                        position: "absolute",
                        left: pageX + cursorOffset.left,
                        top: pageY + cursorOffset.top
                    })
                    .appendTo(document.body);
                }

                draggables[options.group] = that;

                $(document).unbind(NAMESPACE)
                           .bind(MOUSEUP + NAMESPACE + " " + KEYDOWN + NAMESPACE, proxy(that._stop, that))
                           .bind(MOUSEMOVE + NAMESPACE, proxy(that._drag, that))
                           .bind(SELECTSTART + NAMESPACE, false);

                that.dropped = false;

                if (that._trigger(DRAGSTART, e)) {
                    that._destroy(e);
                }
            }
        },

        _drag: function(e) {
            var that = this,
                cursorOffset = that.options.cursorOffset,
                location = kendo.touchLocation(e);

            that._trigger(DRAG, e);

            if (that.hint) {
                that.hint.css( {
                    left: location.x + cursorOffset.left,
                    top: location.y + cursorOffset.top
                });
            }
        },

        _stop: function(e) {
            var that = this,
                destroy = proxy(that._destroy, that);

            if (e.type == MOUSEUP || e.keyCode == 27) {
                that._trigger(DRAGEND, e);

                if (that.hint && !that.dropped) {
                    that.hint.animate(that.currentTarget.offset(), "fast", destroy);
                } else {
                    destroy();
                }
            }
        },

        _trigger: function(eventName, e) {
            var that = this,
                location = kendo.touchLocation(e);

            return that.trigger(eventName, extend({}, e, {
                currentTarget: that.currentTarget,
                pageX: location.x,
                pageY: location.y
            }));
        },

        _destroy: function(e) {
            var that = this;

            if (that.hint) {
                that.hint.remove();
            }

            delete draggables[that.options.group];

            $(document).unbind(NAMESPACE);
        }
    });

    kendo.ui.plugin("Draggable", Draggable);

 })(jQuery, window);
