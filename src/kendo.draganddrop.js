(function ($, undefined) {
    var kendo = window.kendo,
        document = window.document,
        Widget = kendo.ui.Widget,
        proxy = $.proxy,
        extend = $.extend,
        touch = kendo.support.touch,
        getOffset = kendo.getOffset,
        draggables = {},
        dropTargets = {},
        lastDropTarget,
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

    function contains(parent, child) {
        try {
            return $.contains(parent, child) || parent == child;
        } catch (e) {
            return false;
        }
    }

    function bind(element, filter, eventName, handler) {
        if (filter) {
            element.delegate(filter, eventName, handler);
        } else {
            element.bind(eventName, handler);
        }
    }

    var DropTarget = Widget.extend(/** @lends kendo.ui.DropTarget.prototype */ {
        /**
         * @constructs
         * @extends kendo.ui.Widget
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {String} [group] <"default"> Used to group sets of draggable and drop targets. A draggable with the same group value as a drop target will be accepted by the drop target.
         */
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.element.bind(MOUSEENTER, proxy(that._over, that))
                .bind(MOUSEUP, proxy(that._drop, that))
                .bind(MOUSELEAVE, proxy(that._out, that));

            var group = that.options.group;

            if (!(group in dropTargets)) {
                dropTargets[group] = [ that ];
            } else {
                dropTargets[group].push( that );
            }
        },

        events: [
            /**
             * Fires when draggable moves over the drop target.
             * @name kendo.ui.DropTarget#dragenter
             * @event
             * @param {Event} e
             * @param {jQueryObject} e.draggable Reference to the draggable that enters the drop target.
             */
            DRAGENTER,
            /**
             * Fires when draggable moves out of the drop target.
             * @name kendo.ui.DropTarget#dragleave
             * @event
             * @param {Event} e
             * @param {jQueryObject} e.draggable Reference to the draggable that leaves the drop target.
             */
            DRAGLEAVE,
            /**
             * Fires when draggable is dropped over the drop target.
             * @name kendo.ui.DropTarget#drop
             * @event
             * @param {Event} e
             * @param {jQueryObject} e.draggable Reference to the draggable that is dropped over the drop target.
             * @param {jQueryObject} e.draggable.currentTarget The element that the drag and drop operation started from.
             */
            DROP
        ],

        options: {
            name: "DropTarget",
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

    kendo.ui.plugin(DropTarget);

    /**
     * @name kendo.ui.Draggable.Description
     *
     * @section Enable draggable functionality on any DOM element.
     *
     * @exampleTitle <b>Draggable</b> initialization
     * @example
     * var draggable = $("#draggable").kendoDraggable();
     *
     * @name kendo.ui.DropTarget.Description
     *
     * @section Enable any DOM element to be a target for draggable elements.
     *
     * @exampleTitle <b>DropTarget</b> initialization
     * @example
     * var dropTarget = $("#dropTarget").kendoDropTarget();
     */
    var Draggable = Widget.extend(/** @lends kendo.ui.Draggable.prototype */{
        /**
         * @constructs
         * @extends kendo.ui.Widget
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {Integer} [distance] <5> The required distance that the mouse should travel in order to initiate a drag.
         * @option {Selector} [filter] Selects child elements that are draggable if a widget is attached to a container.
         * @option {String} [group] <"default"> Used to group sets of draggable and drop targets. A draggable with the same group value as a drop target will be accepted by the drop target.
         * @option {Function|jQueryObject} [hint] Provides a way for customization of the drag indicator. If a function is supplied, it receives one argument - the draggable element's jQuery object.
         * _example
         *  //hint as a function
         *  $("#draggable").kendoDraggable({
         *      hint: function(element) {
         *          return $("#draggable").clone();
         *          // same as
         *          //  return element.clone();
         *      }
         *  });
         *
         * //hint as jQuery object
         *  $("#draggable").kendoDraggable({
         *      hint: $("#draggableHint");
         *  });
         */
        init: function (element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            bind(that.element, that.options.filter, MOUSEDOWN + NAMESPACE, proxy(that._wait, that));

            bind(that.element, that.options.filter, DRAGSTART + NAMESPACE, false);
        },

        events: [
            /**
             * Fires when item drag starts.
             * @name kendo.ui.Draggable#dragstart
             * @event
             * @param {Event} e
             */
            DRAGSTART,
             /**
             * Fires while dragging.
             * @name kendo.ui.Draggable#drag
             * @event
             * @param {Event} e
             */
            DRAG,
             /**
             * Fires when item drag ends.
             * @name kendo.ui.Draggable#dragend
             * @event
             * @param {Event} e
             */
            DRAGEND
        ],

        options: {
            name: "Draggable",
            distance: 5,
            group: "default",
            cursorOffset: {
                left: 10,
                top: touch ? -40 / kendo.support.zoomLevel() : 10
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

            e.stopImmediatePropagation();

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
                if (touch)
                    e.preventDefault();

                if (hint) {
                    that.hint = $.isFunction(hint) ? $(hint(that.currentTarget)) : hint;

                    that.hint.css( {
                        position: "absolute",
                        zIndex: 10010, //the Window's z-index is 10000
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

        _withDropTarget: function(e, callback) {
            var that = this,
                target = kendo.eventTarget(e),
                result,
                options = that.options;

            if (touch && kendo.size(dropTargets)) {

                $.each(dropTargets[options.group], function() {
                    var that = this,
                        element = that.element[0];

                    if (contains(element, target)) {
                        result = that;
                        return false;
                    }
                });

                callback(result);
            }
        },

        _drag: function(e) {
            var that = this,
                cursorOffset = that.options.cursorOffset,
                location = kendo.touchLocation(e);

            that._withDropTarget(e, function(target) {
                if (!target) {
                    if (lastDropTarget) {
                        lastDropTarget._trigger(DRAGLEAVE, e);
                        lastDropTarget = null;
                    }
                    return;
                }

                if (lastDropTarget) {
                    if (target.element[0] === lastDropTarget.element[0]) {
                        return;
                    }

                    lastDropTarget._trigger(DRAGLEAVE, e);
                }

                target._trigger(DRAGENTER, e);
                lastDropTarget = target;
            });

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
                destroy = proxy(that._destroy, that),
                offset = getOffset(that.currentTarget);

            if (!(e.type == MOUSEUP || e.keyCode == 27)) {
                return;
            }

            that._withDropTarget(e, function(target) {
                if (target) {
                    target._drop(e);
                    lastDropTarget = null;
                }
            });

            that._trigger(DRAGEND, e);

            if (that.hint && !that.dropped) {
                that.hint.animate(offset, "fast", destroy);
            } else {
                destroy();
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

    kendo.ui.plugin(Draggable);

 })(jQuery);
