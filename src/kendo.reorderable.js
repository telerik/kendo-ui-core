(function ($, undefined) {
    var kendo = window.kendo,
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

                    var dropTarget = this.element,
                        same = dropTarget[0] === that._draggable[0];

                    toggleHintClass(e.draggable.hint, same);
                    if (!same) {
                        that.reorderDropCue.css({
                             height: dropTarget.outerHeight(),
                             top: dropTarget.offset().top,
                             left: dropTarget.offset().left + (dropTarget.index() > that._draggable.index() ? dropTarget.outerWidth() : 0)
                        })
                        .appendTo(document.body);
                    }
                },
                dragleave: function(e) {
                    toggleHintClass(e.draggable.hint, true);
                    that.reorderDropCue.remove();
                },
                drop: function() {
                    if (!that._draggable) {
                        return;
                    }

                    var draggableElement = that._draggable[0],
                        dropTarget = this.element[0],
                        container;

                    if (draggableElement !== dropTarget) {
                        container = element.find(draggable.options.filter);
                        that.trigger(CHANGE, {
                            element: that._draggable,
                            oldIndex: container.index(draggableElement),
                            newIndex: container.index(dropTarget)
                        });
                    }
                }
            });

            draggable.bind([ "dragcancel", "dragend", "dragstart" ],
                {
                    dragcancel: function() {
                        that.reorderDropCue.remove();
                        that._draggable = null;
                    },
                    dragend: function() {
                        that.reorderDropCue.remove();
                        that._draggable = null;
                    },
                    dragstart: function(e) {
                        that._draggable = e.currentTarget;
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

       destroy: function() {
           var that = this;

           Widget.fn.destroy.call(that);

           if (that.draggable) {
               that.draggable.destroy();
           }

           kendo.destroy(that.element);
       }
    });

    kendo.ui.plugin(Reorderable);

})(window.kendo.jQuery);
