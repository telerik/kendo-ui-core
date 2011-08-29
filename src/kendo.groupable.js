(function ($, undefined) {
    var kendo = window.kendo,
        Component = kendo.ui.Component,
        proxy = $.proxy,
        CONTAINER_EMPTY_TEXT = "Drag a column header and drop it here to group by that column",
        indicatorTmpl = kendo.template('<div class="k-group-indicator" data-field="${data.field}" data-dir="${data.dir || "asc"}">' +
                '<a href="#" class="k-link">' +
                    '<span class="k-icon k-arrow-${(data.dir || "asc") == "asc" ? "up" : "down"}-small">(sorted ${(data.dir || "asc") == "asc" ? "ascending": "descending"})</span>' +
                    '${data.field}' +
                '</a>' +
                '<a class="k-button k-button-icon k-button-bare">' +
                    '<span class="k-icon k-group-delete"></span>' +
                '</a>' +
             '</div>',  { useWithBlock:false }),        
        hint = function(target) {
            return $('<div class="k-header k-drag-clue" />')
                .html(target.data("field"))
                .prepend('<span class="k-icon k-drag-status k-denied" />');
        },
        dropCue = $('<div class="k-grouping-dropclue"/>');    

    var Groupable = Component.extend({
        init: function(element, options) {
            var that = this,
                groupContainer,
                group = kendo.guid(),
                intializePositions = proxy(that._intializePositions, that),
                dropCuePositions = that._dropCuePositions = [];

            Component.fn.init.call(that, element, options);
            
            groupContainer = that.groupContainer = $(that.options.groupContainer, that.element)
                .kendoDropTarget({
                    group: group,
                    dragenter: function(e) {
                        e.draggable.hint.find(".k-drag-status").removeClass("k-denied").addClass("k-add");
                        dropCue.css({top:3, left: 0}).appendTo(groupContainer);
                    },

                    dragleave: function(e) {
                        e.draggable.hint.find(".k-drag-status").removeClass("k-add").addClass("k-denied");
                        dropCue.remove();
                    }
                })
                .kendoDraggable({
                    filter: "div.k-group-indicator",
                    hint: hint,
                    group: group,
                    dragend: function(e) {
                        that._dragEnd(this, e);
                    },
                    dragstart: function(e) {
                        var element = e.currentTarget,
                            marginLeft = parseInt(element.css("marginLeft")),
                            left = element.position().left - marginLeft;

                        intializePositions();
                        dropCue.css({top:3, left: left}).appendTo(groupContainer);
                        this.hint.find(".k-drag-status").removeClass("k-denied").addClass("k-add");
                    },
                    drag: proxy(that._drag, that)
                })
                .delegate(".k-button", "click", function(e) {
                    e.preventDefault();
                    that._removeIndicator($(this).parent());
                })
                .delegate(".k-link", "click", function(e) {
                    var current = $(this).parent(),
                        newIndicator = that.buildIndicator(current.data("field"), current.data("dir") == "asc" ? "desc" : "asc");

                    current.before(newIndicator).remove();
                    that._change();
                    e.preventDefault();
                });

            that.element.kendoDraggable({
                filter: that.options.filter,
                hint: hint,
                group: group,
                dragend: function(e) {
                    that._dragEnd(this, e);
                },
                dragstart: function(e) {
                    var element, marginRight, left,
                        field = e.currentTarget.data("field");

                    if(that.indicator(field)) {
                        e.preventDefault();
                        return;
                    }

                    intializePositions();
                    if(dropCuePositions.length) {
                        element = dropCuePositions[dropCuePositions.length - 1].element;
                        marginRight = parseInt(element.css("marginRight"));
                        left = element.position().left + element.outerWidth() + marginRight;
                    } else {
                        left = 0;
                    }

                    dropCue.css({top:3, left: left}).appendTo(groupContainer);
                    this.hint.find(".k-drag-status").removeClass("k-denied").addClass("k-add");
                },
                drag: proxy(that._drag, that)
            });

            that.dataSource = that.options.dataSource;

            if(that.dataSource) {
                that.dataSource.bind("change", function() {
                    groupContainer.empty().append(
                        $.map(this.group() || [], function(item) {
                            return that.buildIndicator(item.field, item.dir);
                        }).join("")
                    );
                    that._invalidateGroupContainer();
                });
            }
        },
        options: {
            filter: "th"
        },
        indicator: function(field) {
            var indicators = $(".k-group-indicator", this.groupContainer);
            return $.grep(indicators, function (item)
                {
                    return $(item).data("field") === field;
                })[0];
        },
        buildIndicator: function(field, dir) {
            return indicatorTmpl({ field: field, dir: dir });
        },
        descriptors: function() {
            var indicators = $(".k-group-indicator", this.groupContainer);
            return $.map(indicators, function(item) {
                item = $(item);

                return {
                    field: item.data("field"),
                    dir: item.data("dir")
                };
            });
        },
        _removeIndicator: function(indicator) {
            var that = this;
            indicator.remove();
            that._invalidateGroupContainer();
            that._change();
        },
        _change: function() {
            var that = this;
            if(that.dataSource) {
                that.dataSource.group(that.descriptors());
            }
        },
        _dropCuePosition: function(position) {
            var dropCuePositions = this._dropCuePositions;
            if(!dropCue.is(":visible") || dropCuePositions.length == 0) {
                return;
            }

            var lastCuePosition = dropCuePositions[dropCuePositions.length - 1],
                right = lastCuePosition.right,
                marginLeft = parseInt(lastCuePosition.element.css("marginLeft")),
                marginRight = parseInt(lastCuePosition.element.css("marginRight"));

            if(position >= right) {
                position = {
                    left: lastCuePosition.element.position().left + lastCuePosition.element.outerWidth() + marginRight,
                    element: lastCuePosition.element,
                    before: false
                };
            } else {
                position = $.grep(dropCuePositions, function(item) {
                    return item.left <= position && position <= item.right;
                })[0];

                if(position) {
                    position = {
                        left: position.element.position().left - marginLeft,
                        element: position.element,
                        before: true
                    };
                }
            }

            return position;
        },
        _drag: function(event) {
            var position = this._dropCuePosition(event.pageX);
            if(position) {
                dropCue.css({ left: position.left });
            }
        },
        _canDrop: function(source, target, position) {
            var next = source.next();
            return source[0] !== target[0] && (!next[0] || target[0] !== next[0] || position > next.position().left);
        },
        _dragEnd: function(draggable, event) {
            var that = this,
                field = event.currentTarget.data("field"),
                sourceIndicator = that.indicator(field),
                dropCuePositions = that._dropCuePositions,
                lastCuePosition = dropCuePositions[dropCuePositions.length - 1],
                position;

            if(draggable.dropped) {
                if(lastCuePosition) {
                    position = that._dropCuePosition(dropCue.offset().left + parseInt(lastCuePosition.element.css("marginLeft")) + parseInt(lastCuePosition.element.css("marginRight")));
                    if(that._canDrop($(sourceIndicator), position.element, position.left)) {
                        if(position.before) {
                            position.element.before(sourceIndicator || that.buildIndicator(field));
                        } else {
                            position.element.after(sourceIndicator || that.buildIndicator(field));
                        }

                        that._change();
                    }
                } else {
                    that.groupContainer.append(that.buildIndicator(field));
                    that._change();
                }
            } else {
                if(sourceIndicator) {
                    that._removeIndicator($(sourceIndicator));
                }
            }

            dropCue.remove();
            dropCuePositions = [];
        },
        _intializePositions: function() {
            var that = this,
                indicators = $(".k-group-indicator", that.groupContainer), 
                left;
            that._dropCuePositions = $.map(indicators, function(item) {
                item = $(item);
                left = item.offset().left;
                return {
                    left: left,
                    right: left + item.outerWidth(),
                    element: item
                };
            });
        },
        _invalidateGroupContainer: function() {
            var groupContainer = this.groupContainer;
            if(groupContainer.is(":empty")) {
                groupContainer.html(CONTAINER_EMPTY_TEXT);
            }
        }
    });

    kendo.ui.plugin("Groupable", Groupable);

})(jQuery);
