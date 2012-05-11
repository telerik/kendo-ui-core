(function ($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        CHANGE =  "change",
        KREORDABLE = "k-reordable";

    function toggleHintClass(hint, denied) {
        hint = $(hint);

        if (denied) {
            hint.find(".k-drag-status").removeClass("k-add").addClass("k-denied");
        } else {
            hint.find(".k-drag-status").removeClass("k-denied").addClass("k-add");
        }
    }

    var Reordable = Widget.extend({
        init: function(element, options) {
            var that = this,
                draggable,
                group = kendo.guid() + "-reordable";

            Widget.fn.init.call(that, element, options);

            element = that.element.addClass(KREORDABLE);
            options = that.options;
            draggable = options.draggable || new kendo.ui.Draggable(element, {
                group: group,
                filter: options.filter,
                hint: options.hint
            });

            that.reorderDropCue = $('<div class="k-reorder-cue"><div class="k-icon k-arrow-down"></div><div class="k-icon k-arrow-up"></div></div>');

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
                             top: element.position().top,
                             left: dropTarget.position().left + (dropTarget.index() > that._draggable.index() ? dropTarget.outerWidth() : 0)
                        })
                        .appendTo(document.body);
                    }
                },
                dragleave: function(e) {
                    toggleHintClass(e.draggable.hint, true);
                    that.reorderDropCue.remove();
                },
                drop: function() {
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
            name: "Reordable",
            filter: "*"
        },

        events: [
            CHANGE
        ]

    });

    kendo.ui.plugin(Reordable);

})(jQuery);
