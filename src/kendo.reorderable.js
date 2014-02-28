(function(f, define){
    define([ "./kendo.core", "./kendo.draganddrop" ], f);
})(function(){

var __meta__ = {
    id: "reorderable",
    name: "Reorderable",
    category: "framework",
    depends: [ "core", "draganddrop" ],
    advanced: true
};

(function ($, undefined) {
    var kendo = window.kendo,
        getOffset = kendo.getOffset,
        Widget = kendo.ui.Widget,
        CHANGE =  "change",
        KREORDERABLE = "k-reorderable";

    function toggleHintClass(hint, denied) {
        hint = $(hint);

        if (denied) {
            hint.find(".k-drag-status").removeClass("k-add").addClass("k-denied");
        } else {
            hint.find(".k-drag-status").removeClass("k-denied").addClass("k-add");
        }
    }

    var Reorderable = Widget.extend({
        init: function(element, options) {
            var that = this,
                draggable,
                group = kendo.guid() + "-reorderable";

            Widget.fn.init.call(that, element, options);

            element = that.element.addClass(KREORDERABLE);
            options = that.options;

            that.draggable = draggable = options.draggable || new kendo.ui.Draggable(element, {
                group: group,
                filter: options.filter,
                hint: options.hint
            });

            that.reorderDropCue = $('<div class="k-reorder-cue"><div class="k-icon k-i-arrow-s"></div><div class="k-icon k-i-arrow-n"></div></div>');

            element.find(draggable.options.filter).kendoDropTarget({
                group: draggable.options.group,
                dragenter: function(e) {
                    if (!that._draggable) {
                        return;
                    }

                    var dropTarget = this.element, offset;
                    var denied = !that._dropTargetAllowed(dropTarget) || that._isLastDraggable();

                    toggleHintClass(e.draggable.hint, denied);
                    if (!denied) {
                        offset = getOffset(dropTarget);
                        var left = offset.left;

                        if (options.inSameContainer && !options.inSameContainer(dropTarget, that._draggable)) {
                            that._dropTarget = dropTarget;
                        } else {
                            if (that._elements.index(dropTarget) > that._elements.index(that._draggable)) {
                                left += dropTarget.outerWidth();
                            }
                        }

                        that.reorderDropCue.css({
                             height: dropTarget.outerHeight(),
                             top: offset.top,
                             left: left
                        })
                        .appendTo(document.body);
                    }
                },
                dragleave: function(e) {
                    toggleHintClass(e.draggable.hint, true);
                    that.reorderDropCue.remove();
                    that._dropTarget = null;
                },
                drop: function() {
                    that._dropTarget = null;
                    if (!that._draggable) {
                        return;
                    }
                    var dropTarget = this.element;
                    var draggable = that._draggable;
                    var containerChange = false;

                    if (that._dropTargetAllowed(dropTarget) && !that._isLastDraggable()) {
                        that.trigger(CHANGE, {
                            element: that._draggable,
                            oldIndex: that._elements.index(draggable),
                            newIndex: that._elements.index(dropTarget),
                            position: getOffset(that.reorderDropCue).left > getOffset(dropTarget).left ? "after" : "before"
                        });
                    }
                }
            });

            draggable.bind([ "dragcancel", "dragend", "dragstart", "drag" ],
                {
                    dragcancel: function() {
                        that.reorderDropCue.remove();
                        that._draggable = null;
                        that._elements = null;
                    },
                    dragend: function() {
                        that.reorderDropCue.remove();
                        that._draggable = null;
                        that._elements = null;
                    },
                    dragstart: function(e) {
                        that._draggable = e.currentTarget;
                        that._elements = that.element.find(that.draggable.options.filter);
                    },
                    drag: function(e) {
                        if (!that._dropTarget || this.hint.find(".k-drag-status").hasClass("k-denied")) {
                            return;
                        }

                        var dropStartOffset = getOffset(that._dropTarget).left;
                        var width = that._dropTarget.outerWidth();

                        if (e.pageX > dropStartOffset + width / 2) {
                            that.reorderDropCue.css({ left: dropStartOffset + width });
                        } else {
                            that.reorderDropCue.css({ left: dropStartOffset });
                        }
                    }
                }
            );
        },

        options: {
            name: "Reorderable",
            filter: "*"
        },

        events: [
            CHANGE
        ],

        _isLastDraggable: function() {
            var inSameContainer = this.options.inSameContainer,
                draggable = this._draggable[0],
                elements = this._elements.get(),
                found = false,
                item;

            if (!inSameContainer) {
                return false;
            }

            while (!found && elements.length > 0) {
                item = elements.pop();
                found = draggable !== item && inSameContainer(draggable, item);
            }

            return !found;
        },

        _dropTargetAllowed: function(dropTarget) {
            var inSameContainer = this.options.inSameContainer,
                dragOverContainers = this.options.dragOverContainers,
                draggable = this._draggable;

            if (draggable[0] === dropTarget[0]) {
                return false;
            }

            if (!inSameContainer || !dragOverContainers) {
                return true;
            }

            if (inSameContainer(draggable, dropTarget)) {
                return true;
            }

            return dragOverContainers(this._elements.index(draggable));
        },

        destroy: function() {
           var that = this;

           Widget.fn.destroy.call(that);

           that.element.find(that.draggable.options.filter).each(function() {
               var item = $(this);
               if (item.data("kendoDropTarget")) {
                   item.data("kendoDropTarget").destroy();
               }
           });

           if (that.draggable) {
               that.draggable.destroy();

               that.draggable.element = that.draggable = null;
           }
           that.elements = that.reorderDropCue = that._elements = that._draggable = null;
       }
    });

    kendo.ui.plugin(Reorderable);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });

