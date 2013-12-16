/* jshint eqnull: true */
(function(f, define){
    define([ "./kendo.draganddrop" ], f);
})(function(){

var __meta__ = {
    id: "sortable",
    name: "Sortable",
    category: "framework",
    depends: [ "data" ]
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

            that.placeholder = $("<div>placeholder</div>");

            that._draggable = new kendo.ui.Draggable(element, {
                filter: ">li",
                hint: function(element) {
                    return that.options.hint(element);
                },
                dragstart: $.proxy(that._dragstart, that),
                dragcancel: $.proxy(that._dragcancel, that),
                drag: $.proxy(that._drag, that),
                dragend: $.proxy(that._dragend, that)
            });

        },

        events: [

        ],

        options: {
            name: "Sortable",
            hint: function(element) {
                return element.clone();
            }
        },

        destroy: function() {

        },

        _dragstart: function(e) {
            var draggedElement = this.draggedElement = e.currentTarget,
            placeholder = this.placeholder;

            draggedElement.css("display", "none");
            draggedElement.before(placeholder);
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
            placeholder = this.placeholder;

            target = $(target).closest("li");

            if(target.length) {
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
