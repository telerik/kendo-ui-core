(function ($, window, undefined) {
    var kendo = window.kendo,
        document = window.document,
        Component = kendo.ui.Component,
        proxy = $.proxy,
        extend = $.extend,
        draggables = {},
        NAMESPACE = ".kendo-dnd",
        MOUSEENTER = "mouseenter",
        MOUSEUP = "mouseup",
        MOUSEDOWN = "mousedown",
        MOUSEMOVE = "mousemove",
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

    function DropTarget(element, options) {
        var that = this;

        Component.apply(that, arguments);

        that.element.bind(MOUSEENTER, proxy(that._over, that))
                    .bind(MOUSEUP, proxy(that._drop, that))
                    .bind(MOUSELEAVE, proxy(that._out, that));

        that.bind([DRAGENTER, DRAGLEAVE, DROP], that.options);
    }

    DropTarget.prototype = {
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
    }

    kendo.ui.plugin("DropTarget", DropTarget, Component);

    function Draggable(element, options) {
        var that = this;

        Component.apply(that, arguments);

        bind(that.element, that.options.filter, MOUSEDOWN + NAMESPACE, proxy(that._wait, that));

        that.bind([DRAGSTART, DRAG, DRAGEND], that.options);
    }

    Draggable.prototype = {
        options: {
            distance: 5,
            group: "default",
            cursorOffset: {
                left: 10,
                top: 10
            },
            dropped: false
        },

        _wait: function (e) {
            var that = this;

            that._offset = { x: e.pageX, y: e.pageY };
            that.currentTarget = e.currentTarget;
            $(document).bind(MOUSEMOVE + NAMESPACE, proxy(that._start, that))
                       .bind(MOUSEUP + NAMESPACE, proxy(that._destroy, that));

            // Prevent text selection for Gecko and WebKit
            e.preventDefault();
        },

        _start: function(e) {
            var that = this,
                pageX = e.pageX,
                pageY = e.pageY,
                x = that._offset.x - pageX,
                y = that._offset.y - pageY,
                distance = Math.sqrt((x * x) + (y * y)),
                options = that.options,
                cursorOffset = options.cursorOffset,
                hint = options.hint;

            if (distance >= options.distance) {
                if (hint) {
                    that.hint = $.isFunction(hint) ? $(hint()) : hint;

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
                that._trigger(DRAGSTART, e);
            }
        },

        _drag: function(e) {
            var that = this,
                cursorOffset = that.options.cursorOffset;

            that._trigger(DRAG, e);

            if (that.hint) {
                that.hint.css( {
                    left: e.pageX + cursorOffset.left,
                    top: e.pageY + cursorOffset.top
                });
            }
        },

        _stop: function(e) {
            var that = this,
                destroy = proxy(that._destroy, that);

            if (e.type == MOUSEUP || e.keyCode == 27) {
                that._trigger(DRAGEND, e);

                if (that.hint && !that.dropped) {
                    that.hint.animate(that.element.offset(), "fast", destroy);
                } else {
                    destroy();
                }
            }
        },

        _trigger: function(eventName, e) {
            var that = this;

            that.trigger(eventName, extend({}, e, {
                currentTarget: that.currentTarget
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
    }

    kendo.ui.plugin("Draggable", Draggable, Component);

   })(jQuery, window);
