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

    function contains(parent, child) {
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
            excluded: null
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
                dragstart: $.proxy(that._dragstart, that),
                dragcancel: $.proxy(that._dragcancel, that),
                drag: $.proxy(that._drag, that),
                dragend: $.proxy(that._dragend, that)
            });
        },

        _dragstart: function(e) {
            var draggedElement = this.draggedElement = e.currentTarget,
                excluded = this.options.excluded,
                _placeholder = this.options.placeholder,
                placeholder = this.placeholder = kendo.isFunction(_placeholder) ? $(_placeholder.call(this, draggedElement)) : _placeholder;

            if(excluded && draggedElement.is(excluded)) {
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
                target = this._findTarget(e),
                targetOffset,
                hintOffset,
                offsetDelta,
                placeholder = this.placeholder,
                excluded = this.options.excluded;

            target = $(target).closest("li");

            if(target.length && excluded && !target.is(excluded)) {
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
            var target = kendo.elementUnderCursor(e),
                draggable = e.sender;

            if(contains(draggable.hint[0], target)) {
                draggable.hint.hide();
                target = kendo.elementUnderCursor(e);
                // IE8 does not return the element in iframe from first attempt
                if (!target) {
                    target = elementUnderCursor(e);
                }
                draggable.hint.show();
            }

            return target;
        }
    });

    kendo.ui.plugin(Sortable);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
