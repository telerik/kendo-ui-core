/* jshint eqnull: true */
(function(f, define){
    define([ "./kendo.draganddrop" ], f);
})(function(){

var __meta__ = {
    id: "sortable",
    name: "Sortable",
    category: "framework",
    depends: [ "draganddrop" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,

        START = "start",
        MOVE = "move",
        END = "end",
        CHANGE = "change",
        CANCEL = "cancel",

        DEFAULT_FILTER = ">*";

    function containsOrEqualTo(parent, child) {
        try {
            return $.contains(parent, child) || parent == child;
        } catch (e) {
            return false;
        }
    }

    function defaultHint(element) {
        return element.clone();
    }

    function defaultPlaceholder(element) {
        return element.clone().removeAttr("id").css("visibility", "hidden");
    }

    var Sortable = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that._draggable = that._createDraggable();
        },

        events: [
            START,
            MOVE,
            END,
            CHANGE,
            CANCEL
        ],

        options: {
            name: "Sortable",
            hint: defaultHint,
            placeholder: defaultPlaceholder,
            filter: DEFAULT_FILTER,
            holdToDrag: false,
            disabled: null,
            container: null,
            connectWith: null,
            handler: null,
            cursorOffset: null,
            axis: null
        },

        destroy: function() {
            this._draggable.destroy();
            Widget.fn.destroy.call(this);
        },

        _createDraggable: function() {
            var that = this,
                element = that.element,
                options = that.options;

            return new kendo.ui.Draggable(element, {
                filter: options.filter,
                hint: options.hint,
                holdToDrag: options.holdToDrag,
                container: options.container,
                cursorOffset: options.cursorOffset,
                axis: options.axis,
                dragstart: $.proxy(that._dragstart, that),
                dragcancel: $.proxy(that._dragcancel, that),
                drag: $.proxy(that._drag, that),
                dragend: $.proxy(that._dragend, that)
            });
        },

        _dragstart: function(e) {
            var draggedElement = this.draggedElement = e.currentTarget,
                target = e.target || kendo.elementUnderCursor(e),
                disabled = this.options.disabled,
                handler = this.options.handler,
                _placeholder = this.options.placeholder,
                placeholder = this.placeholder = kendo.isFunction(_placeholder) ? $(_placeholder.call(this, draggedElement)) : _placeholder;

            if(disabled && draggedElement.is(disabled)) {
                e.preventDefault();
            } else if(handler && !$(target).is(handler)) {
                e.preventDefault();
            } else {

                if(this.trigger(START, { item: draggedElement, placeholder: placeholder, draggableEvent: e })) {
                    e.preventDefault();
                } else {
                    draggedElement.css("display", "none");
                    draggedElement.before(placeholder);
                }

            }
        },

        _dragcancel: function(e) {
            this.trigger(CANCEL, { item: this.draggedElement });
            this._cancel();
        },

        _drag: function(e) {
            var draggedElement = this.draggedElement,
                target = $(this._findTarget(e)),
                targetOffset,
                hintOffset,
                offsetTopDelta,
                offsetLeftDelta,
                prev,
                next,
                placeholder = this.placeholder,
                disabled = this.options.disabled;

            if(target.length) {
                targetOffset = kendo.getOffset(target);
                hintOffset = kendo.getOffset(e.sender.hint);
                offsetTopDelta = hintOffset.top - targetOffset.top;
                offsetLeftDelta = hintOffset.left - targetOffset.left;
                prev = target.prev();
                next = target.next();

                if(offsetTopDelta < 0 || offsetLeftDelta < 0) { //for negative delta the tooltip should be appended before the target
                    if(prev[0] != placeholder[0]) {
                        target.before(placeholder);
                        this.trigger(MOVE, { item: draggedElement, target: target });
                    }
                } else if(offsetTopDelta > 0 || offsetLeftDelta > 0) { //for positive delta the tooptip should be appended after the target
                    if(next[0] != placeholder[0]) {
                        target.after(placeholder);
                        this.trigger(MOVE, { item: draggedElement, target: target });
                    }
                }
            }
        },

        _dragend: function(e) {
            var placeholder = this.placeholder,
                draggedElement = this.draggedElement,
                index = this._indexOf(draggedElement),
                eventData;

            eventData = { item: draggedElement, index: index, newIndex: this._indexOf(placeholder), draggableEvent: e };
            if(this.trigger(END, eventData)) {
                this._cancel();
                return;
            }

            placeholder.replaceWith(draggedElement);

            draggedElement.show();
            this._draggable.dropped = true;

            eventData = { item: draggedElement, index: this._indexOf(draggedElement), oldIndex: index, draggableEvent: e };
            this.trigger(CHANGE, eventData);
        },

        _findTarget: function(e) {
            var elementUnderCursor = kendo.elementUnderCursor(e),
                target,
                draggable = e.sender,
                disabled = this.options.disabled,
                filter = this.options.filter,
                items = this.items();

            if(containsOrEqualTo(draggable.hint[0], elementUnderCursor)) {
                draggable.hint.hide();
                elementUnderCursor = kendo.elementUnderCursor(e);
                // IE8 does not return the element in iframe from first attempt
                if (!elementUnderCursor) {
                    elementUnderCursor = kendo.elementUnderCursor(e);
                }
                draggable.hint.show();
            }

            return this._findDraggableNode(elementUnderCursor);
        },

        _findDraggableNode: function(element) {
            var items,
                connectWith = this.options.connectWith,
                connected;

            if($.contains(this.element[0], element)) { //the element is part of the sortable container
                items = this.items();

                return items.filter(element)[0] || items.has(element)[0];
            } else if (connectWith) {
                connected = $(connectWith);

                for (var i = 0; i < connected.length; i++) {
                    if($.contains(connected[i], element)) {
                        var sortable = connected.eq(i).data("kendoSortable");
                        if(sortable) {
                            items = sortable.items();
                            return items.filter(element)[0] || items.has(element)[0];
                        }
                    }
                }
            }
        },

        _cancel: function() {
            this.draggedElement.show();
            this.placeholder.remove();
        },

        _indexOf: function(element) {
            if(element[0] == this.placeholder[0]) {
                return this.items(true).index(element);
            } else {
                return this.items(false).index(element);
            }
        },

        items: function(/*internal*/ active) {
            var filter = this.options.filter,
                placeholder = this.placeholder,
                items;

            if(filter) {
                items = this.element.find(filter);
            } else {
                items = this.element.children();
            }

            if(!active && placeholder) {
                items = items.not(placeholder);
            }

            if(active) {
                items = items.not(this.draggedElement);
            }

            return items;
        }

    });

    kendo.ui.plugin(Sortable);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
