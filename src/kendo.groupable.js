(function ($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        proxy = $.proxy,
        NS = ".kendoGroupable",
        indicatorTmpl = kendo.template('<div class="k-group-indicator" data-#=data.ns#field="${data.field}" data-#=data.ns#title="${data.title || ""}" data-#=data.ns#dir="${data.dir || "asc"}">' +
                '<a href="\\#" class="k-link">' +
                    '<span class="k-icon k-si-arrow-${(data.dir || "asc") == "asc" ? "n" : "s"}">(sorted ${(data.dir || "asc") == "asc" ? "ascending": "descending"})</span>' +
                    '${data.title ? data.title: data.field}' +
                '</a>' +
                '<a class="k-button k-button-icon k-button-bare">' +
                    '<span class="k-icon k-group-delete"></span>' +
                '</a>' +
             '</div>',  { useWithBlock:false }),
        hint = function(target) {
            return $('<div class="k-header k-drag-clue" />')
                .css({
                    width: target.width(),
                    paddingLeft: target.css("paddingLeft"),
                    paddingRight: target.css("paddingRight"),
                    lineHeight: target.height() + "px",
                    paddingTop: target.css("paddingTop"),
                    paddingBottom: target.css("paddingBottom")
                })
                .html(target.attr(kendo.attr("title")) || target.attr(kendo.attr("field")))
                .prepend('<span class="k-icon k-drag-status k-denied" />');
        },
        dropCue = $('<div class="k-grouping-dropclue"/>'),
        nameSpecialCharRegExp = /(\[|\]|\$|\.|\:|\+)/g;

    function dropCueOffsetTop(element) {
        return element.position().top + 3;
    }

    var Groupable = Widget.extend({
        init: function(element, options) {
            var that = this,
                groupContainer,
                group = kendo.guid(),
                intializePositions = proxy(that._intializePositions, that),
                draggable,
                dropCuePositions = that._dropCuePositions = [];

            Widget.fn.init.call(that, element, options);

            that.draggable = draggable = that.options.draggable || new kendo.ui.Draggable(that.element, {
                filter: that.options.filter,
                hint: hint,
                group: group
            });

            groupContainer = that.groupContainer = $(that.options.groupContainer, that.element)
                .kendoDropTarget({
                    group: draggable.options.group,
                    dragenter: function(e) {
                        if (that._canDrag(e.draggable.currentTarget)) {
                            e.draggable.hint.find(".k-drag-status").removeClass("k-denied").addClass("k-add");
                            dropCue.css({top: dropCueOffsetTop(groupContainer), left: 0}).appendTo(groupContainer);
                        }
                    },
                    dragleave: function(e) {
                        e.draggable.hint.find(".k-drag-status").removeClass("k-add").addClass("k-denied");
                        dropCue.remove();
                    },
                    drop: function(e) {
                        var targetElement = e.draggable.currentTarget,
                            field = targetElement.attr(kendo.attr("field")),
                            title = targetElement.attr(kendo.attr("title")),
                            sourceIndicator = that.indicator(field),
                            dropCuePositions = that._dropCuePositions,
                            lastCuePosition = dropCuePositions[dropCuePositions.length - 1],
                            position;

                        if (!targetElement.hasClass("k-group-indicator") && !that._canDrag(targetElement)) {
                            return;
                        }
                        if(lastCuePosition) {
                            position = that._dropCuePosition(dropCue.offset().left + parseInt(lastCuePosition.element.css("marginLeft"), 10) + parseInt(lastCuePosition.element.css("marginRight"), 10));
                            if(position && that._canDrop($(sourceIndicator), position.element, position.left)) {
                                if(position.before) {
                                    position.element.before(sourceIndicator || that.buildIndicator(field, title));
                                } else {
                                    position.element.after(sourceIndicator || that.buildIndicator(field, title));
                                }

                                that._change();
                            }
                        } else {
                            that.groupContainer.append(that.buildIndicator(field, title));
                            that._change();
                        }
                    }
                })
                .kendoDraggable({
                    filter: "div.k-group-indicator",
                    hint: hint,
                    group: draggable.options.group,
                    dragcancel: proxy(that._dragCancel, that),
                    dragstart: function(e) {
                        var element = e.currentTarget,
                            marginLeft = parseInt(element.css("marginLeft"), 10),
                            left = element.position().left - marginLeft;

                        intializePositions();
                        dropCue.css({top: dropCueOffsetTop(groupContainer), left: left}).appendTo(groupContainer);
                        this.hint.find(".k-drag-status").removeClass("k-denied").addClass("k-add");
                    },
                    dragend: function() {
                        that._dragEnd(this);
                    },
                    drag: proxy(that._drag, that)
                })
                .on("click" + NS, ".k-button", function(e) {
                    e.preventDefault();
                    that._removeIndicator($(this).parent());
                })
                .on("click" + NS,".k-link", function(e) {
                    var current = $(this).parent(),
                        newIndicator = that.buildIndicator(current.attr(kendo.attr("field")), current.attr(kendo.attr("title")), current.attr(kendo.attr("dir")) == "asc" ? "desc" : "asc");

                    current.before(newIndicator).remove();
                    that._change();
                    e.preventDefault();
                });

            draggable.bind([ "dragend", "dragcancel", "dragstart", "drag" ],
            {
                dragend: function() {
                    that._dragEnd(this);
                },
                dragcancel: proxy(that._dragCancel, that),
                dragstart: function(e) {
                    var element, marginRight, left;

                    if (!that.options.allowDrag && !that._canDrag(e.currentTarget)) {
                        e.preventDefault();
                        return;
                    }

                    intializePositions();
                    if(dropCuePositions.length) {
                        element = dropCuePositions[dropCuePositions.length - 1].element;
                        marginRight = parseInt(element.css("marginRight"), 10);
                        left = element.position().left + element.outerWidth() + marginRight;
                    } else {
                        left = 0;
                    }
                },
                drag: proxy(that._drag, that)
            });

            that.dataSource = that.options.dataSource;

            if(that.dataSource) {
                that._refreshHandler = proxy(that.refresh, that);
                that.dataSource.bind("change", that._refreshHandler);
            }
        },

        refresh: function() {
            var that = this,
                dataSource = that.dataSource;

            that.groupContainer.empty().append(
                $.map(dataSource.group() || [], function(item) {
                    var fieldName = item.field.replace(nameSpecialCharRegExp, "\\$1");
                    var element = that.element.find(that.options.filter).filter("[" + kendo.attr("field") + "=" + fieldName + "]");
                    return that.buildIndicator(item.field, element.attr(kendo.attr("title")), item.dir);
                }).join("")
            );
            that._invalidateGroupContainer();
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that.groupContainer
                .off(NS)
                .kendoDropTarget("destroy")
                .kendoDraggable("destroy");

            if (!that.options.draggable) {
                that.draggable.destroy();
            }

            if (that.dataSource && that._refreshHandler) {
                that.dataSource.unbind("change", that._refreshHandler);
            }
        },

        options: {
            name: "Groupable",
            filter: "th",
            messages: {
                empty: "Drag a column header and drop it here to group by that column"
            }
        },

        indicator: function(field) {
            var indicators = $(".k-group-indicator", this.groupContainer);
            return $.grep(indicators, function (item)
                {
                    return $(item).attr(kendo.attr("field")) === field;
                })[0];
        },
        buildIndicator: function(field, title, dir) {
            return indicatorTmpl({ field: field, dir: dir, title: title, ns: kendo.ns });
        },
        descriptors: function() {
            var that = this,
                indicators = $(".k-group-indicator", that.groupContainer),
                aggregates,
                names,
                field,
                idx,
                length;

            aggregates = that.element.find(that.options.filter).map(function() {
                var cell = $(this),
                    aggregate = cell.attr(kendo.attr("aggregates")),
                    member = cell.attr(kendo.attr("field"));

                if (aggregate && aggregate !== "") {
                    names = aggregate.split(",");
                    aggregate = [];
                    for (idx = 0, length = names.length; idx < length; idx++) {
                        aggregate.push({ field: member, aggregate: names[idx] });
                    }
                }
                return aggregate;
            }).toArray();

            return $.map(indicators, function(item) {
                item = $(item);
                field = item.attr(kendo.attr("field"));

                return {
                    field: field,
                    dir: item.attr(kendo.attr("dir")),
                    aggregates: aggregates || []
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
            if(!dropCue.is(":visible") || dropCuePositions.length === 0) {
                return;
            }

            position = Math.ceil(position);

            var lastCuePosition = dropCuePositions[dropCuePositions.length - 1],
                right = lastCuePosition.right,
                marginLeft = parseInt(lastCuePosition.element.css("marginLeft"), 10),
                marginRight = parseInt(lastCuePosition.element.css("marginRight"), 10);

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
            var location = kendo.touchLocation(event),
                position = this._dropCuePosition(location.x);
            if(position) {
                dropCue.css({ left: position.left });
            }
        },
        _canDrag: function(element) {
            var field = element.attr(kendo.attr("field"));

            return element.attr(kendo.attr("groupable")) != "false" &&
                field &&
                (element.hasClass("k-group-indicator") ||
                    !this.indicator(field));
        },
        _canDrop: function(source, target, position) {
            var next = source.next();
            return source[0] !== target[0] && (!next[0] || target[0] !== next[0] || position > next.position().left);
        },
        _dragEnd: function(draggable) {
            var that = this,
                field = draggable.currentTarget.attr(kendo.attr("field")),
                sourceIndicator = that.indicator(field);

            if (draggable !== that.options.draggable && !draggable.dropped && sourceIndicator) {
                that._removeIndicator($(sourceIndicator));
            }

            that._dragCancel();
        },
        _dragCancel: function() {
            dropCue.remove();
            this._dropCuePositions = [];
        },
        _intializePositions: function() {
            var that = this,
                indicators = $(".k-group-indicator", that.groupContainer),
                left;
            that._dropCuePositions = $.map(indicators, function(item) {
                item = $(item);
                left = item.offset().left;
                return {
                    left: parseInt(left, 10),
                    right: parseInt(left + item.outerWidth(), 10),
                    element: item
                };
            });
        },
        _invalidateGroupContainer: function() {
            var groupContainer = this.groupContainer;
            if(groupContainer.is(":empty")) {
                groupContainer.html(this.options.messages.empty);
            }
        }
    });

    kendo.ui.plugin(Groupable);

})(window.kendo.jQuery);
