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

        ACTION_SORT = "sort",
        ACTION_REMOVE = "remove",
        ACTION_RECEIVE = "receive",

        DEFAULT_FILTER = ">*",
        MISSING_INDEX = -1;

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

                if(this.trigger(START, { item: draggedElement, draggableEvent: e })) {
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
                target = this._findTarget(e),
                targetOffset,
                hintOffset,
                offsetTopDelta,
                offsetLeftDelta,
                prevVisible,
                nextVisible,
                placeholder = this.placeholder,
                disabled = this.options.disabled;

            if(target) {
                targetOffset = kendo.getOffset(target.element);
                hintOffset = kendo.getOffset(e.sender.hint);
                offsetTopDelta = hintOffset.top - targetOffset.top;
                offsetLeftDelta = hintOffset.left - targetOffset.left;
                prevVisible = target.element.prev();
                nextVisible = target.element.next();

                if(offsetTopDelta < 0 || offsetLeftDelta < 0) { //for negative delta the tooltip should be appended before the target

                    while(prevVisible.length && !prevVisible.is(":visible")) {
                        prevVisible = prevVisible.prev();
                    }

                    if(prevVisible[0] != placeholder[0]) {
                        target.element.before(placeholder);
                        target.sortable.trigger(MOVE, { item: draggedElement, target: target.element, list: this, draggableEvent: e });
                    }

                } else if(offsetTopDelta > 0 || offsetLeftDelta > 0) { //for positive delta the tooptip should be appended after the target

                    while(nextVisible.length && !nextVisible.is(":visible")) {
                        nextVisible = nextVisible.next();
                    }

                    if(nextVisible[0] != placeholder[0]) {
                        target.element.after(placeholder);
                        target.sortable.trigger(MOVE, { item: draggedElement, target: target.element, list: this, draggableEvent: e });
                    }
                }
            }
        },

        _dragend: function(e) {
            var placeholder = this.placeholder,
                draggedElement = this.draggedElement,
                draggedIndex = this.indexOf(draggedElement),
                placeholderIndex = this.indexOf(placeholder),
                connectWith = this.options.connectWith,
                connectedList,
                isDefaultPrevented,
                eventData;

            eventData = {
                action: ACTION_SORT,
                item: draggedElement,
                oldIndex: draggedIndex,
                newIndex: placeholderIndex,
                draggableEvent: e
            };

            if(placeholderIndex >= 0) {
                isDefaultPrevented = this.trigger(END, eventData);
            } else {
                connectedList = placeholder.parents(connectWith).getKendoSortable();

                isDefaultPrevented = !(
                    !this.trigger(END, $.extend(eventData, { action: ACTION_REMOVE }))
                    && !connectedList.trigger(END, $.extend(eventData, { action: ACTION_RECEIVE, oldIndex: MISSING_INDEX, newIndex: connectedList.indexOf(placeholder) }))
                );
            }

            if(isDefaultPrevented) {
                this._cancel();
                return;
            }

            placeholder.replaceWith(draggedElement);

            draggedElement.show();
            this._draggable.dropped = true;

            eventData = {
                action: this.indexOf(draggedElement) != MISSING_INDEX ? ACTION_SORT : ACTION_REMOVE,
                item: draggedElement,
                oldIndex: draggedIndex,
                newIndex: this.indexOf(draggedElement),
                draggableEvent: e
            };

            if(eventData.oldIndex != eventData.newIndex) {
                this.trigger(CHANGE, eventData);

                if(connectedList) {
                    connectedList.trigger(CHANGE, $.extend(eventData, {
                        action: ACTION_RECEIVE,
                        oldIndex: MISSING_INDEX,
                        newIndex: connectedList.indexOf(draggedElement)
                    }));
                }
            }

        },

        _findTarget: function(e) {
            var elementUnderCursor = kendo.elementUnderCursor(e),
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
                connected,
                node;

            if($.contains(this.element[0], element)) { //the element is part of the sortable container
                items = this.items();
                node = items.filter(element).eq(0) || items.has(element).eq(0);

                return node.length ? { element: node, sortable: this } : null;
            } else if (connectWith) {
                connected = $(connectWith);

                for (var i = 0; i < connected.length; i++) {
                    if($.contains(connected[i], element)) {
                        var sortable = connected.eq(i).getKendoSortable();
                        if(sortable) {
                            items = sortable.items();
                            node = items.filter(element).eq(0) || items.has(element).eq(0);

                            if(node.length) {
                                sortable.placeholder = this.placeholder;
                                return { element: node, sortable: sortable };
                            } else {
                                return null;
                            }
                        }
                    }
                }
            }
        },

        _cancel: function() {
            this.draggedElement.show();
            this.placeholder.remove();
        },

        _items: function() {
            var filter = this.options.filter,
                items;

            if(filter) {
                items = this.element.find(filter);
            } else {
                items = this.element.children();
            }

            return items;
        },

        indexOf: function(element) {
            var items = this._items(),
                placeholder = this.placeholder,
                draggedElement = this.draggedElement;

            if(placeholder && element[0] == placeholder[0]) {
                return items.not(draggedElement).index(element);
            } else {
                return items.not(placeholder).index(element);
            }
        },

        items: function() {
            var placeholder = this.placeholder,
                items = this._items();

            if(placeholder) {
                items = items.not(placeholder);
            }

            return items;
        }

    });

    kendo.ui.plugin(Sortable);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
