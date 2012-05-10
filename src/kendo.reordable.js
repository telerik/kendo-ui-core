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
                group = kendo.guid() + "-reordable";

            Widget.fn.init.call(that, element, options);

            element = that.element.addClass(KREORDABLE);
            options = that.options;

            that.reorderDropCue = $('<div class="k-reorder-cue"><div class="k-icon k-arrow-down"></div><div class="k-icon k-arrow-up"></div></div>');

            element.find(options.filter).kendoDropTarget({
                group: group,
                dragenter: function(e) {
                    var dropTarget = this.element,
                        same = dropTarget[0] === that._draggable[0];

                    toggleHintClass(e.draggable.hint, same);
                    if (!same) {
                        that.reorderDropCue.css({
                             height: dropTarget.outerHeight(),
                             top: element.offset().top,
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
                    var draggable = that._draggable;

                    if (draggable[0] !== this.element[0]) {
                        that.trigger(CHANGE, {
                            element: draggable,
                            oldIndex: draggable.index(),
                            newIndex: this.element.index()
                        });
                    }
                }
            });

            element.kendoDraggable({
                group: group,
                filter: "." + KREORDABLE + " " + options.filter,
                hint: options.hint,
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
            });
        },

        options: {
            name: "Reordable",
            filter: ">*"
        },

        events: [
            CHANGE
        ]

    });

    kendo.ui.plugin(Reordable);

})(jQuery);
