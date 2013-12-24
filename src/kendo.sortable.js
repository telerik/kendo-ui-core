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
        Widget = kendo.ui.Widget;

    function containsOrEqualTo(parent, child) {
        try {
            return $.contains(parent, child) || parent == child;
        } catch (e) {
            return false;
        }
    }

    var Sortable = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that._draggable = that._createDraggable();

        },

        events: [

        ],

        options: {
            name: "Sortable",
            hint: function(element) {
                return element.clone();
            },
            placeholder: function(element) {
                return element.clone()
                        .removeAttr("id")
                        .css("visibility", "hidden");
            },
            filter: ">*",
            excluded: null,
            holdToDrag: false,
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
                excluded = this.options.excluded,
                handler = this.options.handler,
                _placeholder = this.options.placeholder,
                placeholder = this.placeholder = kendo.isFunction(_placeholder) ? $(_placeholder.call(this, draggedElement)) : _placeholder;

            if(excluded && draggedElement.is(excluded)) {
                e.preventDefault();
            } else if(handler && !$(target).is(handler)) {
                e.preventDefault();
            } else {
                draggedElement.css("display", "none");
                draggedElement.before(placeholder);
            }
        },

        _dragcancel: function(e) {
            this.draggedElement.show();
            this.placeholder.remove();
        },

        _drag: function(e) {
            var draggedElement = this.draggedElement,
                target = $(this._findTarget(e)),
                targetOffset,
                hintOffset,
                offsetDelta,
                placeholder = this.placeholder,
                excluded = this.options.excluded;

            if(target.length && !(excluded && target.is(excluded))) {
                targetOffset = kendo.getOffset(target);
                hintOffset = kendo.getOffset(e.sender.hint);
                offsetDelta = hintOffset.top - targetOffset.top;

                if(offsetDelta <= 0) { //for negative delta the tooltip should be appended before the target
                    target.before(placeholder);
                } else { //for positive delta the tooptip should be appended after the target
                    target.after(placeholder);
                }
            }
        },

        _dragend: function(e) {
            var placeholder = this.placeholder,
                next = placeholder.next(),
                draggedElement = this.draggedElement;

            placeholder.remove();

            if(next.length) {
                next.before(draggedElement);
            } else {
                this.element.append(draggedElement);
            }

            draggedElement.show();
            this._draggable.dropped = true;
        },

        _findTarget: function(e) {
            var elementUnderCursor = kendo.elementUnderCursor(e),
                target,
                draggable = e.sender,
                excluded = this.options.excluded,
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

                //$(elementUnderCursor).closest(filter, this.element)
                console.log(items.filter(element)[0] || items.has(element)[0]);
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

        items: function() {
            var filter = this.options.filter;

            if(filter) {
                return this.element.find(filter);
            } else {
                return this.element.children();
            }
        }

    });

    kendo.ui.plugin(Sortable);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
