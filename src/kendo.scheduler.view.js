kendo_module({
    id: "scheduler.view",
    name: "Scheduler View",
    category: "web",
    description: "The Scheduler Common View",
    depends: [ "core" ]
});

(function($) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        NS = ".kendoSchedulerView",
        isRtl;

    function levels(values, key) {
        var result = [];

        function collect(depth, values) {
            values = values[key];

            if (values) {
                var level = result[depth] = result[depth] || [];

                for (var idx = 0; idx < values.length; idx++) {
                    level.push(values[idx]);
                    collect(depth + 1, values[idx]);
                }
            }
        }

        collect(0, values);

        return result;
    }

    function table(tableRows, className) {
        if (!tableRows.length) {
            return "";
        }

        return '<table class="' + $.trim('k-scheduler-table ' + (className || "")) + '">' +
               '<tr>' +
                    tableRows.join("</tr><tr>") +
               '</tr>' +
               '</table>';
    }

    function timesHeader(columnLevelCount, allDaySlot, rowCount) {
        var tableRows = [];

        if (rowCount > 0) {
            for (var idx = 0; idx < columnLevelCount; idx++) {
                tableRows.push("<th></th>");
            }
        }

        if (allDaySlot) {
            tableRows.push('<th class="k-scheduler-times-all-day">' + allDaySlot.text + '</th>');
        }

        if (rowCount < 1) {
           return $();
        }

        return $('<div class="k-scheduler-times">' + table(tableRows) + '</div>');
    }

    function datesHeader(columnLevels, columnCount, allDaySlot) {
        var dateTableRows = [];
        var columnIndex;

        for (var columnLevelIndex = 0; columnLevelIndex < columnLevels.length; columnLevelIndex++) {
            var level = columnLevels[columnLevelIndex];
            var th = [];
            var colspan = columnCount / level.length;

            for (columnIndex = 0; columnIndex < level.length; columnIndex ++) {
                th.push('<th colspan="' + colspan + '" class="' + (level[columnIndex].className || "")  + '">' + level[columnIndex].text + "</th>");
            }

            dateTableRows.push(th.join(""));
        }

        var allDayTableRows = [];

        if (allDaySlot) {
            var lastLevel = columnLevels[columnLevels.length - 1];
            var td = [];

            for (columnIndex = 0; columnIndex < lastLevel.length; columnIndex++) {
                td.push('<td class="' + (lastLevel[columnIndex].className || "")  + '">&nbsp;</th>');
            }

            allDayTableRows.push(td.join(""));
        }

        return $(
            '<div class="k-scheduler-header k-state-default">' +
                '<div class="k-scheduler-header-wrap">' +
                    table(dateTableRows) +
                    table(allDayTableRows, "k-scheduler-header-all-day") +
                '</div>' +
            '</div>'
        );
    }

    function times(rowLevels, rowCount) {
        var rows = new Array(rowCount).join().split(",");
        var rowHeaderRows = [];
        var rowIndex;

        for (var rowLevelIndex = 0; rowLevelIndex < rowLevels.length; rowLevelIndex++) {
            var level = rowLevels[rowLevelIndex];
            var rowspan = rowCount / level.length;
            var className;

            for (rowIndex = 0; rowIndex < level.length; rowIndex++) {
                className = level[rowIndex].className || "";

                if (level[rowIndex].allDay) {
                    className = "k-scheduler-times-all-day";
                }

                rows[rowspan * rowIndex] += '<th class="' + className + '" rowspan="' + rowspan + '">' + level[rowIndex].text + "</th>";
            }
        }

        for (rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            rowHeaderRows.push(rows[rowIndex]);
        }

        if (rowCount < 1) {
            return $();
        }

        return $('<div class="k-scheduler-times">' + table(rowHeaderRows) + '</div>');
    }

    function content() {
        return $(
            '<div class="k-scheduler-content">' +
                '<table class="k-scheduler-table"/>' +
            '</div>'
        );
    }
    var HINT = '<div class="k-marquee k-scheduler-marquee">' +
                    '<div class="k-marquee-color"></div>' +
                    '<div class="k-marquee-text">' +
                        '<div class="k-label-top"></div>' +
                        '<div class="k-label-bottom"></div>' +
                    '</div>' +
                '</div>';

    kendo.ui.SchedulerView = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);
            this._scrollbar = kendo.support.scrollbar();
            isRtl = kendo.support.isRtl(element);
            this._resizeHint = $();
            this._moveHint = $();
            this._cellId = kendo.guid();
        },

        dateForTitle: function() {
            return kendo.format(this.options.selectedDateFormat, this.startDate(), this.endDate());
        },

        move: function() {
            return false;
        },

        moveToEvent: function() {
            return false;
        },

        isInRange: function(date) {
            return this.startDate() <= date && date <= this.endDate();
        },

        _createResizeHint: function(left, top, width, height) {
            return $(HINT).css({
                left: left,
                top: top,
                width: width,
                height: height
            });
        },

        _removeResizeHint: function() {
            this._resizeHint.remove();
            this._resizeHint = $();
        },

        _removeMoveHint: function() {
            this._moveHint.remove();
            this._moveHint = $();
        },

        eventResources: function(event) {
            var resources = [],
                options = this.options;

            if (!options.resources) {
                return resources;
            }

            for (var idx = 0; idx < options.resources.length; idx++) {
                var resource = options.resources[idx];
                var field = resource.field;
                var eventResources = kendo.getter(field)(event);

                if (!eventResources) {
                    continue;
                }

                if (!resource.multiple) {
                    eventResources = [eventResources];
                }

                var data = resource.dataSource.view();

                for (var resourceIndex = 0; resourceIndex < eventResources.length; resourceIndex++) {
                    var eventResource = null;

                    var value = eventResources[resourceIndex];

                    if (!resource.valuePrimitive) {
                        value = kendo.getter(resource.dataValueField)(value);
                    }

                    for (var dataIndex = 0; dataIndex < data.length; dataIndex++) {
                        if (data[dataIndex].get(resource.dataValueField) == value) {
                            eventResource = data[dataIndex];
                            break;
                        }
                    }

                    if (eventResource != null) {
                       resources.push({
                          text: kendo.getter(resource.dataTextField)(eventResource),
                          value: value,
                          color: kendo.getter(resource.dataColorField)(eventResource)
                       });
                    }
                }

            }

            return resources;
        },
        createLayout: function(layout) {
            var allDayIndex = -1;

            if (!layout.rows) {
                layout.rows = [];
            }

            for (var idx = 0; idx < layout.rows.length; idx++) {
                if (layout.rows[idx].allDay) {
                    allDayIndex = idx;
                    break;
                }
            }

            var allDaySlot = layout.rows[allDayIndex];

            if (allDayIndex >= 0) {
                layout.rows.splice(allDayIndex, 1);
            }

            var columnLevels = this.columnLevels = levels(layout, "columns");

            var rowLevels = this.rowLevels = levels(layout, "rows");

            this.table = $('<table class="k-scheduler-layout">');

            var rowCount = rowLevels[rowLevels.length - 1].length;

            this.table.append(this._topSection(columnLevels, allDaySlot, rowCount));

            this.table.append(this._bottomSection(columnLevels, rowLevels, rowCount));

            this.element.append(this.table);

            this._scroller();
        },

        refreshLayout: function() {
            var that = this,
                toolbar = that.element.find(">.k-scheduler-toolbar"),
                height = that.element.innerHeight(),
                scrollbar = this._scrollbar,
                headerHeight = 0,
                paddingDirection = isRtl ? "left" : "right";

            if (toolbar.length) {
                height -= toolbar.outerHeight();
            }

            if (that.datesHeader) {
                headerHeight = that.datesHeader.outerHeight();
            }

            if (that.timesHeader && that.timesHeader.outerHeight() > headerHeight) {
                headerHeight = that.timesHeader.outerHeight();
            }

            if (headerHeight) {
                height -= headerHeight;
            }

            if (that.footer) {
                height -= that.footer.outerHeight();
            }

            var isSchedulerHeightSet = function(el) {
                var initialHeight, newHeight;
                if (el[0].style.height) {
                    return true;
                } else {
                    initialHeight = el.height();
                }

                el.height("auto");
                newHeight = el.height();

                if (initialHeight != newHeight) {
                    el.height("");
                    return true;
                }
                el.height("");
                return false;
            };

            var contentDiv = that.content[0],
                scrollbarWidth = !kendo.support.kineticScrollNeeded ? scrollbar : 0;

            if (isSchedulerHeightSet(that.element)) { // set content height only if needed
                if (height > scrollbar * 2) { // do not set height if proper scrollbar cannot be displayed
                    that.content.height(height);
                } else {
                    that.content.height(scrollbar * 2 + 1);
                }
                that.times.height(contentDiv.clientHeight);
            }

            if (contentDiv.offsetWidth - contentDiv.clientWidth > 0) {
                that.table.addClass("k-scrollbar-v");
                that.datesHeader.css("padding-" + paddingDirection, scrollbarWidth - parseInt(that.datesHeader.children().css("border-" + paddingDirection + "-width"), 10));
            }
            if (contentDiv.offsetHeight - contentDiv.clientHeight > 0 || contentDiv.clientHeight > that.content.children(".k-scheduler-table").height()) {
                that.table.addClass("k-scrollbar-h");
            }
        },

        _topSection: function(columnLevels, allDaySlot, rowCount) {
            this.timesHeader = timesHeader(columnLevels.length, allDaySlot, rowCount);

            var columnCount = columnLevels[columnLevels.length - 1].length;

            this.datesHeader = datesHeader(columnLevels, columnCount, allDaySlot);

            return $("<tr>").append(this.timesHeader.add(this.datesHeader).wrap("<td>").parent());
        },

        _bottomSection: function(columnLevels, rowLevels, rowCount) {
            this.times = times(rowLevels, rowCount);

            this.content = content(columnLevels[columnLevels.length - 1], rowLevels[rowLevels.length - 1]);

            return $("<tr>").append(this.times.add(this.content).wrap("<td>").parent());
        },

        _scroller: function() {
            var that = this;

            this.content.bind("scroll" + NS, function () {
                that.datesHeader.find(">.k-scheduler-header-wrap").scrollLeft(this.scrollLeft);
                that.times.scrollTop(this.scrollTop);
            });

            var touchScroller = kendo.touchScroller(this.content, {
                avoidScrolling: function(e) {
                    return $(e.event.target).closest(".k-event.k-state-selected").length > 0;
                }
            });

            if (touchScroller && touchScroller.movable) {

                this._touchScroller = touchScroller;

                this.content = touchScroller.scrollElement;

                touchScroller.movable.bind("change", function(e) {
                    that.datesHeader.find(">.k-scheduler-header-wrap").scrollLeft(-e.sender.x);
                    that.times.scrollTop(-e.sender.y);
                });
            }
        },

        _resourcesForGroups: function() {
            var result = [];
            var groups = this.options.resourcesGroups;
            var resources = this.options.resources;

            if (groups && resources && groups.length) {
                for (var idx = 0, length = resources.length; idx < length; idx++) {
                    for (var groupIdx = 0, groupLength = groups.length; groupIdx < groupLength; groupIdx++) {
                        if (resources[idx].name === groups[groupIdx]) {
                            result.push(resources[idx]);
                        }
                    }
                }
            }

            this.groupedResources = result;
        },

        _isGroupedByDate: function() {
            return $.inArray("date", this.options.resourcesGroups) > -1;
        },

        _createColumnsLayout: function(resources, inner) {
            if (this._isGroupedByDate()) {
                for (var idx = 0, length = inner.length; idx < length; idx++) {
                    inner[idx].columns = createLayoutConfiguration("columns", resources);
                }
                return inner;
            }

            return createLayoutConfiguration("columns", resources, inner);
        },

        _createRowsLayout: function(resources, inner) {
            return createLayoutConfiguration("rows", resources, inner);
        },

        slotByCell: function() {
            return null;
        },

        clearSelection: function() {
            this.content.find(".k-state-selected").removeClass("k-state-selected");
        },

        select: function() {
            //must be implemented by every SchedulerView
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(this);

            if (that.table) {
                kendo.destroy(that.table);

                that.table.remove();
            }
        }
    });

    function collidingHorizontallyEvents(elements, start, end) {
        return collidingEvents(elements, start, end, true);
    }

    function collidingEvents(elements, start, end, isHorizontal) {
        var idx,
            index,
            startIndex,
            overlaps,
            endIndex;

        for (idx = elements.length-1; idx >= 0; idx--) {
            index = rangeIndex(elements[idx]);
            startIndex = index.start;
            endIndex = index.end;

            overlaps = isHorizontal ? (startIndex <= start && endIndex >= start) : (startIndex < start && endIndex > start);

            if (overlaps || (startIndex >= start && endIndex <= end) || (start <= startIndex && end >= startIndex)) {
                if (startIndex < start) {
                    start = startIndex;
                }

                if (endIndex > end) {
                    end = endIndex;
                }
            }
        }

        return eventsForSlot(elements, start, end);
    }

    function rangeIndex(eventElement) {
        return {
            start: eventElement.start,
            end: eventElement.end
        };
    }

    function eventsForSlot(elements, slotStart, slotEnd) {
        var events = [];

        for (var idx = 0; idx < elements.length; idx++) {
            var event = rangeIndex(elements[idx]);

            if ((event.start < slotStart && event.end > slotStart) || (event.start >= slotStart && event.end <= slotEnd)) {
                events.push(elements[idx]);
            }
        }

        return events;
    }

    function createColumns(eventElements) {
        return _createColumns(eventElements);
    }

    function createRows(eventElements) {
        return _createColumns(eventElements, true);
    }

    function _createColumns(eventElements, isHorizontal) {
        var columns = [];

        for (var idx = 0; idx < eventElements.length; idx++) {
            var event = eventElements[idx];
            var eventRange = rangeIndex(event);
            var column = null;

            for (var j = 0, columnLength = columns.length; j < columnLength; j++) {
                var endOverlaps = isHorizontal ? eventRange.start > columns[j].end : eventRange.start >= columns[j].end;

                if (eventRange.start < columns[j].start || endOverlaps) {

                    column = columns[j];

                    if (column.end < eventRange.end) {
                        column.end = eventRange.end;
                    }

                    break;
                }
            }

            if (!column) {
                column = { start: eventRange.start, end: eventRange.end, events: [] };
                columns.push(column);
            }

            column.events.push(event);
        }

        return columns;
    }

    function createLayoutConfiguration(name, resources, inner) {
        var resource = resources[0];
        if (resource) {
            var configuration = [];

            var data = resource.dataSource.view();

            for (var dataIndex = 0; dataIndex < data.length; dataIndex++) {
                var obj = {
                    text: kendo.getter(resource.dataTextField)(data[dataIndex]),
                    className: "k-slot-cell"
                };
                obj[name] = createLayoutConfiguration(name, resources.slice(1), inner);

                configuration.push(obj);
            }
            return configuration;
        }
        return inner;
    }

    $.extend(ui.SchedulerView, {
        createColumns: createColumns,
        createRows: createRows,
        rangeIndex: rangeIndex,
        collidingEvents: collidingEvents,
        collidingHorizontallyEvents: collidingHorizontallyEvents
    });

})(window.kendo.jQuery);
