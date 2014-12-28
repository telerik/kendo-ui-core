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
        BEFORE_MOVE = "beforeMove",
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

            if(!that.options.placeholder) {
                that.options.placeholder = defaultPlaceholder;
            }

            if(!that.options.hint) {
                that.options.hint = defaultHint;
            }

            that._draggable = that._createDraggable();
        },

        events: [
            START,
            BEFORE_MOVE,
            MOVE,
            END,
            CHANGE,
            CANCEL
        ],

        options: {
            name: "Sortable",
            hint: null,
            placeholder: null,
            filter: DEFAULT_FILTER,
            holdToDrag: false,
            disabled: null,
            container: null,
            connectWith: null,
            handler: null,
            cursorOffset: null,
            axis: null,
            ignore: null,
            cursor: "auto"
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
                hint: kendo.isFunction(options.hint) ? options.hint : $(options.hint),
                holdToDrag: options.holdToDrag,
                container: options.container ? $(options.container) : null,
                cursorOffset: options.cursorOffset,
                axis: options.axis,
                ignore: options.ignore,
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
                placeholder = this.placeholder = kendo.isFunction(_placeholder) ? $(_placeholder.call(this, draggedElement)) : $(_placeholder);

            if(disabled && draggedElement.is(disabled)) {
                e.preventDefault();
            } else if(handler && !$(e.initialTarget).is(handler)) {
                e.preventDefault();
            } else {

                if(this.trigger(START, { item: draggedElement, draggableEvent: e })) {
                    e.preventDefault();
                } else {
                    draggedElement.css("display", "none");
                    draggedElement.before(placeholder);

                    this._setCursor();
                }

            }
        },

        _dragcancel: function(e) {
            this._cancel();
            this.trigger(CANCEL, { item: this.draggedElement });

            this._resetCursor();
        },

        _drag: function(e) {
            var draggedElement = this.draggedElement,
                target = this._findTarget(e),
                targetCenter,
                cursorOffset = { left: e.x.location, top: e.y.location },
                offsetDelta,
                axisDelta = { x: e.x.delta, y: e.y.delta },
                direction,
                sibling,
                getSibling,
                axis = this.options.axis,
                eventData = { item: draggedElement, list: this, draggableEvent: e };

            if(axis === "x" || axis === "y") {
                this._movementByAxis(axis, cursorOffset, axisDelta[axis], eventData);
                return;
            }

            if(target) {
                targetCenter = this._getElementCenter(target.element);

                offsetDelta = {
                    left: Math.round(cursorOffset.left - targetCenter.left),
                    top: Math.round(cursorOffset.top - targetCenter.top)
                };

                $.extend(eventData, { target: target.element });

                if(target.appendToBottom) {
                    this._movePlaceholder(target, null, eventData);
                    return;
                }

                if(target.appendAfterHidden) {
                    this._movePlaceholder(target, "next", eventData);
                }

                if(this._isFloating(target.element)) { //horizontal
                    if(axisDelta.x < 0 && offsetDelta.left < 0) {
                        direction = "prev";
                    } else if(axisDelta.x > 0 && offsetDelta.left > 0) {
                        direction = "next";
                    }
                } else { //vertical
                    if(axisDelta.y < 0 && offsetDelta.top < 0) {
                        direction = "prev";
                    } else if(axisDelta.y > 0 && offsetDelta.top > 0) {
                        direction = "next";
                    }
                }

                if(direction) {
                    getSibling = (direction === "prev") ? jQuery.fn.prev : jQuery.fn.next;

                    sibling = getSibling.call(target.element);

                    //find the prev/next visible sibling
                    while(sibling.length && !sibling.is(":visible")) {
                        sibling = getSibling.call(sibling);
                    }

                    if(sibling[0] != this.placeholder[0]) {
                        this._movePlaceholder(target, direction, eventData);
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
                eventData,
                connectedListEventData;

            this._resetCursor();

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

                eventData.action = ACTION_REMOVE;
                connectedListEventData = $.extend({}, eventData, {
                    action: ACTION_RECEIVE,
                    oldIndex: MISSING_INDEX,
                    newIndex: connectedList.indexOf(placeholder)
                });

                isDefaultPrevented = !(!this.trigger(END, eventData) && !connectedList.trigger(END, connectedListEventData));
            }

            if(isDefaultPrevented || placeholderIndex === draggedIndex) {
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

            this.trigger(CHANGE, eventData);

            if(connectedList) {
                connectedListEventData = $.extend({}, eventData, {
                    action: ACTION_RECEIVE,
                    oldIndex: MISSING_INDEX,
                    newIndex: connectedList.indexOf(draggedElement)
                });

                connectedList.trigger(CHANGE, connectedListEventData);
            }

        },

        _findTarget: function(e) {
            var element = this._findElementUnderCursor(e),
                items,
                connectWith = this.options.connectWith,
                node;

            if($.contains(this.element[0], element)) { //the element is part of the sortable container
                items = this.items();
                node = items.filter(element)[0] || items.has(element)[0];

                return node ? { element: $(node), sortable: this } : null;
            } else if (this.element[0] == element && this._isEmpty()) {
                return { element: this.element, sortable: this, appendToBottom: true };
            } else if (this.element[0] == element && this._isLastHidden()) {
                node = this.items().eq(0);
                return { element: node , sortable: this, appendAfterHidden: true };
            } else if (connectWith) { //connected lists are present
                return this._searchConnectedTargets(element, e);
            }
        },

        _findElementUnderCursor: function(e) {
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

            return elementUnderCursor;
        },

        _searchConnectedTargets: function(element, e) {
            var connected = $(this.options.connectWith),
                sortableInstance,
                items,
                node;

            for (var i = 0; i < connected.length; i++) {
                sortableInstance = connected.eq(i).getKendoSortable();

                if($.contains(connected[i], element)) {
                    if(sortableInstance) {
                        items = sortableInstance.items();
                        node = items.filter(element)[0] || items.has(element)[0];

                        if(node) {
                            sortableInstance.placeholder = this.placeholder;
                            return { element: $(node), sortable: sortableInstance };
                        } else {
                            return null;
                        }
                    }
                } else if(connected[i] == element) {
                    if(sortableInstance && sortableInstance._isEmpty()) {
                        return { element: connected.eq(i), sortable: sortableInstance, appendToBottom: true };
                    } else if (this._isCursorAfterLast(sortableInstance, e)) {
                        node = sortableInstance.items().last();
                        return { element: node, sortable: sortableInstance };
                    }
                }
            }

        },

        _isCursorAfterLast: function(sortable, e) {
            var lastItem = sortable.items().last(),
                cursorOffset = { left: e.x.location, top: e.y.location },
                lastItemOffset,
                delta;

            lastItemOffset = kendo.getOffset(lastItem);
            lastItemOffset.top += lastItem.outerHeight();
            lastItemOffset.left += lastItem.outerWidth();

            if(this._isFloating(lastItem)) { //horizontal
                delta = lastItemOffset.left - cursorOffset.left;
            } else { //vertical
                delta = lastItemOffset.top - cursorOffset.top;
            }

            return delta < 0 ? true : false;
        },

        _movementByAxis: function(axis, cursorOffset, delta, eventData) {
            var cursorPosition = (axis === "x") ? cursorOffset.left : cursorOffset.top,
                target = (delta < 0) ? this.placeholder.prev() : this.placeholder.next(),
                targetCenter;

            if (target.length && !target.is(":visible")) {
                target = (delta <0) ? target.prev() : target.next();
            }

            $.extend(eventData, { target: target });
            targetCenter = this._getElementCenter(target);

            if (targetCenter) {
                targetCenter = (axis === "x") ? targetCenter.left : targetCenter.top;
            }

            if (target.length && delta < 0 && cursorPosition - targetCenter < 0) { //prev
                this._movePlaceholder({ element: target, sortable: this }, "prev", eventData);
            } else if (target.length && delta > 0 && cursorPosition - targetCenter > 0) { //next
                this._movePlaceholder({ element: target, sortable: this }, "next", eventData);
            }
        },

        _movePlaceholder: function(target, direction, eventData) {
            var placeholder = this.placeholder;

            if (!target.sortable.trigger(BEFORE_MOVE, eventData)) {

                if (!direction) {
                    target.element.append(placeholder);
                } else if (direction === "prev") {
                    target.element.before(placeholder);
                } else if (direction === "next") {
                    target.element.after(placeholder);
                }

                target.sortable.trigger(MOVE, eventData);
            }
        },

        _setCursor: function() {
            var cursor = this.options.cursor,
                body;

            if(cursor && cursor !== "auto") {
                body = $(document.body);

                this._originalCursorType = body.css("cursor");
                body.css({ "cursor": cursor });

                if(!this._cursorStylesheet) {
                    this._cursorStylesheet = $("<style>* { cursor: " + cursor + " !important; }</style>");
                }

                this._cursorStylesheet.appendTo(body);
            }
        },

        _resetCursor: function() {
            if(this._originalCursorType) {
                $(document.body).css("cursor", this._originalCursorType);
                this._originalCursorType = null;

                this._cursorStylesheet.remove();
            }
        },

        _getElementCenter: function(element) {
            var center = element.length ? kendo.getOffset(element) : null;
            if(center) {
                center.top += element.outerHeight() / 2;
                center.left += element.outerWidth() / 2;
            }

            return center;
        },

        _isFloating: function(item) {
            return (/left|right/).test(item.css("float")) || (/inline|table-cell/).test(item.css("display"));
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
        },

        _isEmpty: function() {
            return !this.items().length;
        },

        _isLastHidden: function() {
            return this.items().length === 1 && this.items().is(":hidden");
        }

    });

    kendo.ui.plugin(Sortable);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
