kendo_module({
    id: "scheduler.dayview",
    name: "Scheduler Day View",
    category: "web",
    description: "The Scheduler Day View",
    depends: [ "scheduler.view" ]
});

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        SchedulerView = ui.SchedulerView,
        extend = $.extend,
        proxy = $.proxy,
        getDate = kendo.date.getDate,
        MS_PER_MINUTE = kendo.date.MS_PER_MINUTE,
        MS_PER_DAY = kendo.date.MS_PER_DAY,
        getMilliseconds = kendo.date.getMilliseconds,
        NS = ".kendoMultiDayView";

    var DAY_VIEW_EVENT_TEMPLATE = kendo.template('<div title="(#=kendo.format("{0:t} - {1:t}", start, end)#): #=title#">' +
                    '<dl>' +
                        '<dt>#=kendo.format("{0:t} - {1:t}", start, end)#</dt>' +
                        '<dd>${title}</dd>' +
                    '</dl>' +
                '</div>'),
        DAY_VIEW_ALL_DAY_EVENT_TEMPLATE = kendo.template('<div title="(#=kendo.format("{0:t}", start)#): #=title#">' +
                    '<dl><dd>${title}</dd></dl>' +
                '</div>'),
        DATA_HEADER_TEMPLATE = kendo.template("<span class='k-link k-nav-day'>#=kendo.toString(date, 'ddd M/dd')#</span>"),
        ALLDAY_EVENT_WRAPPER_STRING = '<div class="k-event" data-#=ns#uid="#=uid#"' +
                '#if (resources[0]) { #' +
                    'style="background-color:#=resources[0].color #"' +
                '#}#' +
                '>' +
                '<span class="k-event-actions">' +
                    '# if(data.tail || data.middle) {#' +
                        '<span class="k-icon k-i-arrow-w"></span>' +
                    '#}#' +
                    '# if(data.id && data.recurrenceId) {#' +
                        '<span class="k-icon k-i-exception"></span>' +
                    '# } else if(data.recurrenceRule || data.recurrenceId) {#' +
                        '<span class="k-icon k-i-refresh"></span>' +
                    '# } #' +
                '</span>' +
                '{0}' +
                '<span class="k-event-actions">' +
                    '#if (showDelete) {#' +
                        '<a href="\\#" class="k-link k-event-delete"><span class="k-icon k-si-close"></span></a>' +
                    '#}#' +
                    '# if(data.head || data.middle) {#' +
                        '<span class="k-icon k-i-arrow-e"></span>' +
                    '#}#' +
                '</span>' +
                '#if(!singleDay && !data.tail && !data.middle){#' +
                '<span class="k-resize-handle k-resize-w"></span>' +
                '#}#' +
                '#if(!singleDay && !data.head && !data.middle){#' +
                '<span class="k-resize-handle k-resize-e"></span>' +
                '#}#' +
                '</div>',
        EVENT_WRAPPER_STRING = '<div class="k-event" data-#=ns#uid="#=uid#"' +
                '#if (resources[0]) { #' +
                'style="background-color:#=resources[0].color #"' +
                '#}#' +
                '>' +
                 '<span class="k-event-actions">' +
                    '# if(data.id && data.recurrenceId) {#' +
                        '<span class="k-icon k-i-exception"></span>' +
                    '# } else if(data.recurrenceRule || data.recurrenceId) {#' +
                        '<span class="k-icon k-i-refresh"></span>' +
                    '# } #' +
                '</span>' +
                '{0}' +
                '<span class="k-event-actions">' +
                    '#if (showDelete) {#' +
                        '<a href="\\#" class="k-link k-event-delete"><span class="k-icon k-si-close"></span></a>' +
                    '#}#' +
                '</span>' +
                '<span class="k-event-top-actions">' +
                    '# if(data.tail || data.middle) {#' +
                    '<span class="k-icon k-i-arrow-n"></span>' +
                    '# } #' +
                '</span>' +
                '<span class="k-event-bottom-actions">' +
                    '# if(data.head || data.middle) {#' +
                        '<span class="k-icon k-i-arrow-s"></span>' +
                    '# } #' +
                '</span>' +
                '# if(!(data.tail && data.middle)) {#' +
                '<span class="k-resize-handle k-resize-n"></span>' +
                '# } #' +
                '# if(!(data.head && data.middle)) {#' +
                    '<span class="k-resize-handle k-resize-s"></span>' +
                '# } #' +
                '</div>';

    function toInvariantTime(date) {
        var staticDate = new Date(1980, 1, 1, 0, 0, 0);
        kendo.date.setTime(staticDate, getMilliseconds(date));
        return staticDate;
    }

    function isInDateRange(value, min, max) {
        var msMin = min.getTime(),
            msMax = max.getTime(),
            msValue;

        msValue = value.getTime();

        return msValue >= msMin && msValue <= msMax;
    }

    function isInTimeRange(value, min, max) {
        return value > min && value < max;
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

    function allDaySlotByPosition(rows, x, y) {
       for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
           for (var slotIndex = 0; slotIndex < rows[rowIndex].slots.length; slotIndex++) {
               var slot = rows[rowIndex].slots[slotIndex];

               if (x >= slot.offsetLeft && x < slot.offsetLeft + slot.clientWidth &&
                   y >= slot.offsetTop && y < slot.offsetTop + slot.clientHeight) {
                   return slot;
               }
           }
       }
    }

    var MultiDayView = SchedulerView.extend({
        init: function(element, options) {
            var that = this;

            SchedulerView.fn.init.call(that, element, options);

            that.title = that.options.title || that.options.name;

            that._templates();

            that._editable();

            that._resourcesForGroups();

            that.calculateDateRange();

            that._slots();
       },

       _updateResizeHint: function(direction, startSlot, endSlot) {
            var left = startSlot.offsetLeft + parseInt($(startSlot.element).css("borderLeftWidth"), 10);
            var top = startSlot.offsetTop;
            var width = startSlot.clientWidth;
            var height = startSlot.clientHeight;
            var container = this.content;
            var format;
            var vertical = direction == "south" || direction == "north";

            if (vertical) {
                var dateSlotIndex = this._dateSlotIndex(startSlot.start);

                height = this._calculateEventHeight(this._columns[dateSlotIndex].slots, startSlot.index, endSlot.index + 1) - 3;

                format = "t";
            } else {
                width = this._calculateAllDayEventWidth(this._rows[0].slots, startSlot.index, endSlot.index);

                container = this.element.find(".k-scheduler-header-wrap");

                format = "M/dd";
            }

            if (!this._resizeHint.length) {
                this._resizeHint = SchedulerView.fn._createResizeHint.call(this, left, top, width, height);

                this._resizeHint.appendTo(container);
            } else if (vertical) {
                this._resizeHint.css({ top: top, height: height });
            } else {
                this._resizeHint.css({ left: left, width: width });
            }

            this._resizeHint.find(".k-label-top").text(kendo.toString(startSlot.start, format))
                            .end()
                            .find(".k-label-bottom").text(kendo.toString(endSlot.end, format));
        },

       _slotByPosition: function(x, y) {
           var slot;
           var offset = this.element.find(".k-scheduler-header-wrap").offset();

           x -= offset.left;
           y -= offset.top;

           x = Math.ceil(x);
           y = Math.ceil(y);

           slot = allDaySlotByPosition(this._rows, x, y);

           if (slot) {
                return slot;
           }

           x += offset.left;
           y += offset.top;

           offset = this.content.offset();

           x -= offset.left;
           y -= offset.top;
           y += this.content[0].scrollTop;
           x += this.content[0].scrollLeft;

           x = Math.ceil(x);
           y = Math.ceil(y);

           if (this._rows.length > 1) {
               slot = allDaySlotByPosition(this._rows, x, y);

               if (slot) {
                    return slot;
               }
           }

           var column;

           for (var columnIndex = 0; columnIndex < this._columns.length; columnIndex++) {
               column = this._columns[columnIndex];

               if (x >= column.offsetLeft && x < column.offsetLeft + column.clientWidth) {
                    break;
               } else {
                    column = null;
               }
           }

           if (column) {
               for (var slotIndex = 0; slotIndex < column.slots.length; slotIndex++) {
                   slot = column.slots[slotIndex];

                   if (y >= slot.offsetTop && y <= slot.offsetTop + slot.clientHeight) {
                       return slot;
                   }
               }
           }
       },

       _slots: function() {
            var tableRows = this.content[0].getElementsByTagName("tr");

            var columnCount = tableRows[0].children.length;
            var columns = [];

            for (var columnIndex = 0; columnIndex < columnCount; columnIndex++) {
                columns.push({
                    slots: [],
                    events: []
                });
            }

            var tableCells;
            var cellIndex;
            var td;
            var range;
            var cell;
            var allDayRowCount = 0;
            var isVertical = this.options.groupOrientation === "vertical";

            for (var rowIndex = 0; rowIndex < tableRows.length; rowIndex++) {
                var tr = tableRows[rowIndex];

                if (tr.className && tr.className.indexOf("k-scheduler-header-all-day") > -1) {
                    allDayRowCount++;
                    continue;
                }

                tableCells = tr.children;

                for (cellIndex = 0; cellIndex < tableCells.length; cellIndex++) {
                    td = tableCells[cellIndex];

                    range = this._rangeByIndex(rowIndex - allDayRowCount, cellIndex, tableRows.length - allDayRowCount - 1);

                    cell = {
                        offsetTop: td.offsetTop,
                        offsetLeft: td.offsetLeft,
                        clientHeight: td.clientHeight,
                        offsetHeight: td.offsetHeight,
                        clientWidth: td.clientWidth,
                        element: td,
                        start: range.start,
                        end: range.end
                    };

                    cell.index = columns[cellIndex].slots.length;

                    if (isVertical) {
                        cell.groupIndex = this._groupVerticalIndex(rowIndex);
                    } else {
                        cell.groupIndex = this._groupHorizontalIndex(cellIndex);
                    }

                    columns[cellIndex].slots.push(cell);
                    columns[cellIndex].offsetLeft = cell.offsetLeft;
                    columns[cellIndex].clientWidth = cell.clientWidth;
                }
            }

            this._columns = columns;

            var allDaySelector = ".k-scheduler-header-all-day tr";

            if (this._isVerticallyGrouped()) {
               allDaySelector = ".k-scheduler-header-all-day";
            }

            tableRows = this.element.find(allDaySelector);

            var rows = [];

            var row = { slots: [], events: [] };
            if (!tableRows.length) {
                rows.push(row);
            } else {
                for (rowIndex = 0; rowIndex < tableRows.length; rowIndex++) {
                    row = { slots: [], events: [] };

                    tableCells = tableRows[rowIndex].children;

                    for (cellIndex = 0; cellIndex < tableCells.length; cellIndex++) {
                        td = tableCells[cellIndex];

                        range = this._rangeByIndex(rowIndex, cellIndex, tableRows.length);

                        cell = {
                            offsetTop: tableRows.length > 1 ? td.offsetTop : td.parentNode.parentNode.parentNode.offsetTop,
                            offsetLeft: td.offsetLeft,
                            clientHeight: td.clientHeight,
                            offsetHeight: td.offsetHeight,
                            offsetWidth: td.offsetWidth,
                            clientWidth: td.clientWidth,
                            element: td,
                            isAllDay: true,
                            start: range.start,
                            end: range.end,
                            index: cellIndex
                        };

                        row.slots.push(cell);
                    }
                    rows.push(row);
                }
            }

            this._rows = rows;
       },

       options: {
            name: "MultiDayView",
            selectedDateFormat: "{0:D}",
            allDaySlot: true,
            title: "",
            startTime: kendo.date.today(),
            endTime: kendo.date.today(),
            minorTickCount: 2,
            majorTick: 60,
            majorTimeHeaderTemplate: "#=kendo.toString(date, 't')#",
            minorTimeHeaderTemplate: "&nbsp;",
            eventTemplate: DAY_VIEW_EVENT_TEMPLATE,
            allDayEventTemplate: DAY_VIEW_ALL_DAY_EVENT_TEMPLATE,
            dateHeaderTemplate: DATA_HEADER_TEMPLATE,
            editable: true
        },

        events: ["remove", "add", "edit"],

        _templates: function() {
            var options = this.options,
                settings = extend({}, kendo.Template, options.templateSettings);

            this.eventTemplate = this._eventTmpl(options.eventTemplate, EVENT_WRAPPER_STRING);
            this.allDayEventTemplate = this._eventTmpl(options.allDayEventTemplate, ALLDAY_EVENT_WRAPPER_STRING);

            this.majorTimeHeaderTemplate = kendo.template(options.majorTimeHeaderTemplate, settings);
            this.minorTimeHeaderTemplate = kendo.template(options.minorTimeHeaderTemplate, settings);
            this.dateHeaderTemplate = kendo.template(options.dateHeaderTemplate, settings);
        },

        _editable: function() {
            var that = this;
            if (that.options.editable) {

                that.element.on("click" + NS, ".k-event a:has(.k-si-close)", function(e) {
                    that.trigger("remove", { uid: $(this).closest(".k-event").attr(kendo.attr("uid")) });
                    e.preventDefault();
                });

                if (that.options.editable.create !== false) {
                    that.element.on("dblclick" + NS, ".k-scheduler-content td", function(e) {
                        if (!$(this).parent().hasClass("k-scheduler-header-all-day")) {
                            var slot = that._slotByPosition(e.pageX, e.pageY);
                            that.trigger("add", { eventInfo: { start: slot.start, end: slot.end } });
                            e.preventDefault();
                        }
                    }).on("dblclick" + NS, ".k-scheduler-header-all-day td", function(e) {
                        var slot = that._slotByPosition(e.pageX, e.pageY);
                        that.trigger("add", { eventInfo: { isAllDay: true, start: kendo.date.getDate(slot.start), end: kendo.date.getDate(slot.end) } });
                        e.preventDefault();
                    });
                }

                if (that.options.editable.update !== false) {
                    that.element.on("dblclick" + NS, ".k-event", function(e) {
                        that.trigger("edit", { uid: $(this).closest(".k-event").attr(kendo.attr("uid")) });
                        e.preventDefault();
                    });
                }
            }
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

        _layout: function(dates) {
            var columns = [];
            var rows = [];
            var options = this.options;
            var that = this;

            for (var idx = 0; idx < dates.length; idx++) {
                var column = {};

                column.text = that.dateHeaderTemplate({ date: dates[idx] });

                if (kendo.date.isToday(dates[idx])) {
                    column.className = "k-today";
                }

                columns.push(column);
            }

            if (options.allDaySlot) {
                rows.push( { text: "all day", allDay: true });
            }

            this._forTimeRange(options.startTime, options.endTime, function(date, majorTick, middleRow, lastSlotRow) {
                var template = majorTick ? that.majorTimeHeaderTemplate : that.minorTimeHeaderTemplate;

                var row = {
                    text: template({ date: date }),
                    className: lastSlotRow ? "k-slot-cell" : ""
                };

                rows.push(row);
            });

            var resources = this.groupedResources;

            if (resources.length) {
                if (options.groupOrientation === "vertical") {
                    rows = this._createRowsLayout(resources, rows);
                } else {
                    columns = this._createColumnsLayout(resources, columns);
                }
            }

            return {
                columns: columns,
                rows: rows
            };
        },

        _footer: function() {
            var html = '<div class="k-header k-scheduler-footer">&nbsp;';
            // '<ul class="k-reset k-header k-toolbar"> <li>aaa</li></ul>';

            //TODO: Toolbar command

            html += "</div>";

            this.footer = $(html).appendTo(this.element);
        },

        _forTimeRange: function(min, max, action, after) {
            min = toInvariantTime(min); //convert the date to 1/2/1980 and sets the time
            max = toInvariantTime(max);

            var that = this,
                msMin = getMilliseconds(min),
                msMax = getMilliseconds(max),
                minorTickCount = that.options.minorTickCount,
                msMajorInterval = that.options.majorTick * MS_PER_MINUTE,
                msInterval = msMajorInterval / minorTickCount || 1,
                start = new Date(+min),
                startDay = start.getDate(),
                msStart,
                idx = 0, length,
                html = "";

            length = MS_PER_DAY / msInterval;

            if (msMin != msMax) {
                if (msMin > msMax) {
                    msMax += MS_PER_DAY;
                }

                length = ((msMax - msMin) / msInterval);
            }

            length = Math.round(length);

            for (; idx < length; idx++) {
                var majorTickDivider = idx % (msMajorInterval/msInterval),
                    isMajorTickRow = majorTickDivider === 0,
                    isMiddleRow = majorTickDivider < minorTickCount - 1,
                    isLastSlotRow = majorTickDivider === minorTickCount - 1;

                html += action(start, isMajorTickRow, isMiddleRow, isLastSlotRow);

                kendo.date.setTime(start, msInterval, false);
            }

            if (msMax) {
                msStart = getMilliseconds(start);
                if (startDay < start.getDate()) {
                    msStart += MS_PER_DAY;
                }

                if (msStart > msMax) {
                    start = new Date(+max);
                }
            }

            if (after) {
                html += after(start);
            }

            return html;
        },

        _content: function(dates) {
            var that = this;
            var options = that.options;
            var start = options.startTime;
            var end = options.endTime;
            var groupsCount = 1;
            var rowCount = 1;
            var columnCount = dates.length;
            var html = '';
            var resources = this.groupedResources;
            var allDayVerticalGroupRow = "";

            if (resources.length) {
                if (that.options.groupOrientation === "vertical") {
                    rowCount = this.rowLevels[this.rowLevels.length - 2].length;
                    if (options.allDaySlot) {
                        allDayVerticalGroupRow = '<tr class="k-scheduler-header-all-day">' + new Array(dates.length + 1).join("<td>&nbsp;</td>") + '</tr>';
                    }
                } else {
                    groupsCount = this._columnCountForLevel(this.columnLevels.length - 2);

                    if (this._isGroupedByDate()) {
                        groupsCount = this._columnCountForLevel(resources.length);
                        columnCount = 1;
                    }
                }

            }

            html += '<tbody>';

            var appendRow = function(date, majorTick) {
                var content = "",
                    idx,
                    length;

                content = '<tr' + (majorTick ? ' class="k-middle-row"' : "") + '>';

                for (var groupIdx = 0; groupIdx < groupsCount; groupIdx++) {
                    for (idx = 0, length = columnCount; idx < length; idx++) {
                        content += "<td" + (kendo.date.isToday(dates[idx]) ? ' class="k-today"' : "") + ">";
                        content += "&nbsp;</td>";
                    }
                }

                content += "</tr>";

                return content;
            };

            for (var rowIdx = 0; rowIdx < rowCount; rowIdx++) {
                html += allDayVerticalGroupRow;

                html += this._forTimeRange(start, end, appendRow);
            }

            html += '</tbody>';

            this.content.find("table").append(html);
        },

        _render: function(dates) {
            var that = this;

            dates = dates || [];

            this._dates = dates;

            this._startDate = dates[0];

            this._endDate = dates[(dates.length - 1) || 0];

            this.createLayout(this._layout(dates));

            this._content(dates);

            this._footer();

            this.refreshLayout();

            var allDayHeader = this.element.find(".k-scheduler-header-all-day td");
            if (allDayHeader.length) {
                this._allDayHeaderHeight = allDayHeader.first()[0].clientHeight;
            }

            that.datesHeader.on("click" + NS, ".k-nav-day", function(e) {
                var cell = $(e.currentTarget).closest("th");

                that.trigger("navigate", { view: "day", date: that._slotIndexDate(cell.index()) });
            });

        },

        startDate: function() {
            return this._startDate;
        },

        endDate: function() {
            return this._endDate;
        },

        nextDate: function() {
            return kendo.date.nextDay(this.endDate());
        },

        previousDate: function() {
            return kendo.date.previousDay(this.startDate());
        },

        calculateDateRange: function() {
            this._render([this.options.date]);
        },

        destroy: function() {
            var that = this;

            if (that.datesHeader) {
                that.datesHeader.off(NS);
            }

            if (that.element) {
                that.element.off(NS);
            }

            SchedulerView.fn.destroy.call(this);

            if (that.footer) {
                that.footer.remove();
            }
        },

        _rangeToDates: function(cell) {
            var parentRow = cell.closest("tr"),
                tableRows = parentRow.closest("table").find("tr"),
                maxTimeSlotIndex = tableRows.length - 1,
                dateIndex = parentRow.find("td").index(cell),
                timeIndex = tableRows.index(parentRow),
                slotDate = kendo.date.getDate(this._slotIndexDate(dateIndex)),
                slotEndDate;

            if (slotDate) {
                slotEndDate = kendo.date.getDate(slotDate);

                kendo.date.setTime(slotDate, this._slotIndexTime(timeIndex));
                kendo.date.setTime(slotEndDate, this._slotIndexTime(Math.min(timeIndex + 1, maxTimeSlotIndex)));

                return {
                    start: slotDate,
                    end: slotEndDate
                };
            }
            return null;
        },

        _slotIndexTime: function(index) {
            index = this._adjustSlotIndex(index);
            return getMilliseconds(this.options.startTime) + this._timeSlotInterval() * index;
        },

        _timeSlotInterval: function() {
            var options = this.options;
            return (options.majorTick/options.minorTickCount) * MS_PER_MINUTE;
        },

        _rangeByIndex: function(rowIndex, cellIndex, maxTimeSlotIndex) {
            var slotDate = kendo.date.getDate(this._slotIndexDate(cellIndex));

            var slotEndDate = kendo.date.getDate(slotDate);

            kendo.date.setTime(slotDate, this._slotIndexTime(rowIndex));

            maxTimeSlotIndex = this._adjustSlotIndex(maxTimeSlotIndex);

            if (rowIndex + 1 > maxTimeSlotIndex) {
                slotEndDate = kendo.date.nextDay(slotEndDate);
            } else {
                kendo.date.setTime(slotEndDate, this._slotIndexTime(rowIndex + 1));
            }

            return {
                start: slotDate,
                end: slotEndDate
            };
        },

        _slotIndexDate: function(index) {
            var idx;
            var length;
            var slots = this._dates || [];
            var startTime = getMilliseconds(new Date(+this.options.startTime));
            var endTime = getMilliseconds(new Date(+this.options.endTime));
            var slotStart;

            if (startTime >= endTime) {
                endTime += MS_PER_DAY;
            }

            var resources = this.groupedResources;
            var isVertical = this.options.groupOrientation === "vertical";

            if (resources.length && !isVertical) {
                index = this._adjustColumnIndex(index);
            }

            for (idx = 0, length = slots.length; idx < length; idx++) {
                slotStart = new Date(+slots[idx]);
                kendo.date.setTime(slotStart, startTime);

                if (index === idx) {
                    return slotStart;
                }
            }
            return null;
        },

        _adjustSlotIndex: function(index) {
            if (this._isVerticallyGrouped()) {
                var rowCount = this._rowsCountInGroup();
                return index - (rowCount*Math.floor(index/rowCount));
            }
            return index;
        },

        _groupHorizontalIndex: function(cellIndex) {
            if (this.groupedResources) {
                return Math.floor(cellIndex/this._columnCountInGroup());
            }
            return 0;
        },

        _groupVerticalIndex: function(rowIndex) {
            if (this.groupedResources) {
                return Math.floor(rowIndex/this._rowsCountInGroup());
            }
            return 0;
        },

        _adjustColumnIndex: function(index) {
            var columnCount = this._columnCountInGroup();

            if (this._isGroupedByDate()) {
                return Math.floor(index/columnCount);
            }

            return index - columnCount*Math.floor(index/columnCount);
        },

        _columnCountInGroup: function() {
            var resources = this.groupedResources;

            if (this._isGroupedByDate()) {
                return this._columnCountForLevel(resources.length)/this._columnCountForLevel(0);
            }

            return this._columnOffsetForResource(resources.length);
        },

        _rowsCountInGroup: function() {
            var resources = this.groupedResources;
            var allDaySlotOffset = this.options.allDaySlot ? this.rowLevels[resources.length - 1].length : 0;

            return (this.rowLevels[resources.length].length - allDaySlotOffset) / this.rowLevels[resources.length - 1].length;
        },

        _timeSlotIndex: function(date) {
            var options = this.options;
            var eventStartTime = getMilliseconds(date);
            var startTime = getMilliseconds(options.startTime);
            var timeSlotInterval = ((options.majorTick/options.minorTickCount) * MS_PER_MINUTE);

            return (eventStartTime - startTime) / (timeSlotInterval);
        },

        _dateSlotIndex: function(date, overlaps) {
            var idx;
            var length;
            var slots = this._dates || [];
            var slotStart;
            var slotEnd;
            var offset = 1;

            if (this._isGroupedByDate()) {
                offset = this._columnCountInGroup();
            }

            for (idx = 0, length = slots.length; idx < length; idx++) {
                slotStart = kendo.date.getDate(slots[idx]);
                slotEnd = new Date(kendo.date.getDate(slots[idx]).getTime() + MS_PER_DAY - (overlaps ? 0 : 1));

                if (isInDateRange(date, slotStart, slotEnd)) {
                    return idx * offset;
                }
            }
            return -1;
        },

        _calculateAllDayEventWidth: function(slots, startIndex, endIndex) {
            var result = 0;
            var width = startIndex !== endIndex ? "offsetWidth" : "clientWidth";

            for (var idx = 0, length = slots.length; idx < length; idx++) {
                if (idx >= startIndex && idx <= endIndex) {
                    result += slots[idx][width];
                }
            }

            return result;
        },

        _calculateEventHeight: function(slots, startIndex, endIndex) {
            var result = 0,
                idx,
                length;

            if (startIndex === endIndex) {
                endIndex += 1;
            }

            for (idx = 0, length = slots.length; idx < length; idx++) {
                if (idx >= startIndex && idx < endIndex) {
                    result += slots[idx].offsetHeight;
                }
            }

            return result;
        },

        _positionAllDayEvent: function(row, element, startIndex, endIndex) {
            var dateSlot = row.slots[startIndex],
                slotWidth = this._calculateAllDayEventWidth(row.slots, startIndex, endIndex),
                allDayEvents = SchedulerView.collidingHorizontallyEvents(row.events, startIndex, endIndex),
                top = dateSlot.offsetTop,
                currentColumnCount = this._headerColumnCount || 0,
                leftOffset = 2,
                rightOffset = startIndex !== endIndex ? 5 : 4,
                eventHeight = this._allDayHeaderHeight;

            element
                .css({
                    left: dateSlot.offsetLeft + leftOffset,
                    width: slotWidth - rightOffset
                });

            row.events.push({ start: startIndex, end: endIndex, element: element });

            allDayEvents.push({ start: startIndex, end: endIndex, element: element });

            var rows = SchedulerView.createRows(allDayEvents);

            for (var idx = 0, length = rows.length; idx < length; idx++) {
                var rowEvents = rows[idx].events;

                for (var j = 0, eventLength = rowEvents.length; j < eventLength; j++) {
                    $(rowEvents[j].element).css({
                        top: top + idx * eventHeight
                    });
                }
            }

            if (rows.length && rows.length > currentColumnCount) {
                this._updateAllDayHeaderHeight(eventHeight * rows.length + eventHeight);
                this._headerColumnCount = rows.length;
            }
        },

        _arrangeColumns: function(element, dateSlotIndex, dateSlot) {
            var columns,
                slotWidth = dateSlot.clientWidth,
                eventRightOffset = slotWidth * 0.10,
                columnEvents,
                eventElements =  dateSlot.events,
                slotEvents = SchedulerView.collidingEvents(eventElements, element.start, element.end);

            dateSlot.events.push(element);

            slotEvents.push(element);

            columns = SchedulerView.createColumns(slotEvents);

            var columnWidth = (slotWidth - eventRightOffset) / columns.length;

            for (var idx = 0, length = columns.length; idx < length; idx++) {
                columnEvents = columns[idx].events;

                for (var j = 0, eventLength = columnEvents.length; j < eventLength; j++) {
                    $(columnEvents[j].element).css({
                        width: columnWidth - 4,
                        left: dateSlot.offsetLeft + idx * columnWidth + 2
                    });
                }
            }
        },

        _isVerticallyGrouped: function() {
            return this.groupedResources.length && this.options.groupOrientation === "vertical";
        },

        _positionEvent: function(event, element, dateSlotIndex, timeResouceOffset) {
            var dateSlot = this._columns[dateSlotIndex];
            var maxSlotCount = this._isVerticallyGrouped() ? this._rowsCountInGroup() + timeResouceOffset : dateSlot.slots.length;
            var startIndex = Math.floor(this._timeSlotIndex(event.startTime || event.start)) + timeResouceOffset;
            var endIndex = Math.min(Math.ceil(this._timeSlotIndex(event.endTime || event.end)) + timeResouceOffset, maxSlotCount);
            var bottomOffset = 4;


            if ((startIndex > 0 || startIndex < 0) && endIndex <= 0) {
                endIndex = maxSlotCount;
            }

            if (startIndex < 0 ) {
                startIndex = 0;
            }

            var timeSlot = dateSlot.slots[Math.floor(startIndex)];

            element.css({
                height: this._calculateEventHeight(dateSlot.slots, startIndex, endIndex) - bottomOffset,
                top: timeSlot.offsetTop
            });

            this._arrangeColumns( { element: element, start: startIndex, end: endIndex }, dateSlotIndex, dateSlot);
       },

       _eventTmpl: function(template, wrapper) {
           var options = this.options,
               settings = extend({}, kendo.Template, options.templateSettings),
               paramName = settings.paramName,
               html = "",
               type = typeof template,
               state = { storage: {}, count: 0 };

            if (type === "function") {
                state.storage["tmpl" + state.count] = template;
                html += "#=this.tmpl" + state.count + "(" + paramName + ")#";
                state.count ++;
            } else if (type === "string") {
                html += template;
            }

            var tmpl = kendo.template(kendo.format(wrapper, html), settings);

            if (state.count > 0) {
                tmpl = proxy(tmpl, state.storage);
            }
            return tmpl;
       },

       _createEventElement: function(event, template, isOneDayEvent) {
            var options = this.options;
            var showDelete = options.editable && options.editable.destroy !== false;
            var startDate = getDate(this.startDate());
            var endDate = getDate(this.endDate());
            var startTime = getMilliseconds(options.startTime);
            var endTime = getMilliseconds(options.endTime);
            var eventStartTime = getMilliseconds(event.startTime || event.start);
            var eventEndTime = getMilliseconds(event.endTime || event.end);
            var middle;
            var head;
            var tail;

            if (startTime >= endTime) {
                endTime = getMilliseconds(new Date(options.endTime.getTime() + MS_PER_DAY - 1));
            }

            if (!isInDateRange(getDate(event.start), startDate, endDate) ||
                (isOneDayEvent && eventStartTime < startTime && eventEndTime > endTime)) {
                middle = true;
            } else if (getDate(event.start) < startDate || (isOneDayEvent && eventStartTime < startTime)) {
                tail = true;
            } else if ((getDate(event.end) > endDate && !isOneDayEvent) || (isOneDayEvent && eventEndTime > endTime)) {
                head = true;
            }

            return $(template(extend({}, {
                ns: kendo.ns,
                showDelete: showDelete,
                middle: middle,
                head: head,
                tail: tail,
                singleDay: this._dates.length == 1,
                resources: this.eventResources(event)
            }, event, {
                start: event.startTime || event.start,
                end: event.endTime || event.end
            })));
        },

        _isInTimeSlot: function(event) {
            var slotStartTime = this.options.startTime,
                slotEndTime = this.options.endTime,
                startTime = event.startTime || event.start,
                endTime = event.endTime || event.end;

            if (getMilliseconds(slotEndTime) === getMilliseconds(kendo.date.getDate(slotEndTime))) {
                slotEndTime = kendo.date.getDate(slotEndTime);
                kendo.date.setTime(slotEndTime, MS_PER_DAY - 1);
            }

            if (getMilliseconds(endTime) === getMilliseconds(kendo.date.getDate(endTime)) && endTime.getTime() > startTime.getTime()) {
                endTime = kendo.date.getDate(endTime);
                kendo.date.setTime(endTime, MS_PER_DAY - 1);
            }

            endTime = getMilliseconds(endTime);
            startTime = getMilliseconds(startTime);
            slotEndTime = getMilliseconds(slotEndTime);
            slotStartTime = getMilliseconds(slotStartTime);

            if(slotStartTime === startTime && startTime === endTime) {
                return true;
            }

            return isInTimeRange(startTime, slotStartTime, slotEndTime) ||
                isInTimeRange(endTime, slotStartTime, slotEndTime) ||
                isInTimeRange(slotStartTime, startTime, endTime) ||
                isInTimeRange(slotEndTime, startTime, endTime);
        },

        _isInDateSlot: function(event) {
            var slotStart = this.startDate(),
                slotEnd = new Date(this.endDate().getTime() + MS_PER_DAY - 1);

            return isInDateRange(event.start, slotStart, slotEnd) ||
                isInDateRange(event.end, slotStart, slotEnd) ||
                isInDateRange(slotStart, event.start, event.end) ||
                isInDateRange(slotEnd, event.start, event.end);
        },

        _updateAllDayHeaderHeight: function(height) {
            var allDaySlots = this.element.find(".k-scheduler-header-all-day td");

            if (allDaySlots.length) {
                var offset = height - allDaySlots[0].clientHeight;

                allDaySlots.parent()
                    .add(this.element.find(".k-scheduler-times-all-day").parent())
                    .height(height);

                var daySlotIndex = 0;
                var slots;
                var cellIndex;

                for (var rowIndex = 0; rowIndex < this._rows.length; rowIndex++) {
                    slots = this._rows[rowIndex].slots;

                    for (cellIndex = 0; cellIndex < slots.length; cellIndex++) {
                        slots[cellIndex].clientHeight = allDaySlots[daySlotIndex++].clientHeight;
                    }
                }

                this._updateSlotsPosition(offset);
            }
        },

        _updateSlotsPosition: function(offset) {
            if (offset && this._isVerticallyGrouped()) {
                var slots;
                var events;
                var cellIndex;
                var eventIndex;
                var event;

                var groupRowCount = this._rowsCountInGroup();

                for (var columnIndex = 0; columnIndex < this._columns.length; columnIndex++) {
                    slots = this._columns[columnIndex].slots;
                    events = this._columns[columnIndex].events;

                    for (cellIndex = 0; cellIndex < slots.length; cellIndex++) {
                        slots[cellIndex].offsetTop = slots[cellIndex].offsetTop + offset*Math.ceil(cellIndex/groupRowCount || 1);
                    }

                    for (eventIndex = 0; eventIndex < events.length; eventIndex++) {
                        event = events[eventIndex];
                        event.element.css("top", event.element[0].offsetTop + offset*Math.ceil(event.start/groupRowCount || 1));
                    }
                }

                for (var rowIndex = 0; rowIndex < this._rows.length; rowIndex++) {
                    events = this._rows[rowIndex].events;
                    slots = this._rows[rowIndex].slots;

                    for (cellIndex = 0; cellIndex < slots.length; cellIndex++) {
                        slots[cellIndex].offsetTop = slots[cellIndex].offsetTop + offset*rowIndex;
                    }

                    for (eventIndex = 0; eventIndex < events.length; eventIndex++) {
                        event = events[eventIndex];
                        var top = event.element[0].offsetTop;
                        if (top) {
                            event.element.css("top", top + offset*rowIndex);
                        }
                    }
                }
            }
        },

        _renderEvents: function(events, resourceOffset, groupIdx) {
            var eventTemplate = this.eventTemplate;
            var allDayEventTemplate = this.allDayEventTemplate;
            var allDayEventContainer = this.datesHeader.find(".k-scheduler-header-wrap");
            var timeOffset = 0;
            var dateOffset = 0;
            var event;

            var idx;
            var length;
            var isVertical = this.options.groupOrientation === "vertical";

            if (this.groupedResources.length) {
                if (isVertical) {
                    timeOffset = resourceOffset;
                    allDayEventContainer = this.content;
                } else {
                    dateOffset = resourceOffset;
                }
            }

            for (idx = 0, length = events.length; idx < length; idx++) {
                event = events[idx];

                if (this._isInDateSlot(event)) {

                    var dateSlotIndex = this._dateSlotIndex(event.start),
                        endDateSlotIndex = this._dateSlotIndex(event.end, !event.isAllDay),
                        isOneDayEvent = !event.isAllDay && event.end.getTime() - event.start.getTime() < MS_PER_DAY && dateSlotIndex === endDateSlotIndex,
                        container = isOneDayEvent ? this.content : allDayEventContainer,
                        element = this._createEventElement(event,isOneDayEvent ? eventTemplate : allDayEventTemplate, isOneDayEvent);

                    if (isOneDayEvent) {

                        if (this._isInTimeSlot(event)) {

                            if (dateSlotIndex === -1 && endDateSlotIndex > -1) {
                                dateSlotIndex = endDateSlotIndex;
                            }

                            this._positionEvent(event, element, dateSlotIndex + dateOffset, timeOffset);

                            element.appendTo(container);
                        }

                   } else if (this.options.allDaySlot) {
                       if (dateSlotIndex < 0) {
                           dateSlotIndex = 0;
                       }

                       if (endDateSlotIndex < 0) {
                           endDateSlotIndex = (this.groupedResources.length && !isVertical ? this._columnCountInGroup() : this._rows[0].slots.length) - 1;
                       }

                       this._positionAllDayEvent(this._rows[groupIdx], element, dateSlotIndex + dateOffset, endDateSlotIndex + dateOffset);

                       element.appendTo(container);
                    }
                }
            }
        },

        render: function(events) {
            this._headerColumnCount = 0;

            this._slots();

            this.element.find(".k-event").remove();

            this._updateAllDayHeaderHeight(this._allDayHeaderHeight);

            events = new kendo.data.Query(events)
                .sort([{ field: "start", dir: "asc" },{ field: "end", dir: "desc" }])
                .toArray();

            var resources = this.groupedResources;

            if (resources.length) {
                var initialLevel = 1;

                if (this._isGroupedByDate()) {
                    if (this._isVerticallyGrouped()) {
                        this.rowLevels.push(new Array(this.rowLevels[this.rowLevels.length - 1].length));
                    } else {
                        this.columnLevels.push(new Array(this._columnCountForLevel(this.columnLevels.length - 1)));
                        initialLevel = 2;
                    }
                }

                this._renderGroups(events, resources, 0, initialLevel);
            } else {
                this._renderEvents(events, 0, 0);
            }

            this.refreshLayout();
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

        _renderGroups: function(events, resources, offset, columnLevel) {
            var resource = resources[0];
            var offsetCount;
            var isVertical = this.options.groupOrientation === "vertical";

            if (isVertical) {
                var allDaySlotOffset = resources.length === 1 && this.options.allDaySlot ? this.rowLevels[columnLevel - 1].length : 0;
                offsetCount = (this.rowLevels[columnLevel].length - allDaySlotOffset) / this.rowLevels[columnLevel - 1].length;
            } else {
                offsetCount = this._columnOffsetForResource(columnLevel);
            }

            if (resource) {
                var view = resource.dataSource.view();

                for (var itemIdx = 0; itemIdx < view.length; itemIdx++) {
                    var value = view[itemIdx];

                    if (resource.valuePrimitive) {
                        value = kendo.getter(resource.dataValueField)(value);
                    }

                    var tmp = new kendo.data.Query(events).filter({ field: resource.field, operator: arrayEqFilter, value: value }).toArray();

                    if (resources.length > 1) {
                        this._renderGroups(tmp, resources.slice(1), offsetCount * itemIdx, columnLevel + 1);
                    } else {
                        this._renderEvents(this._splitAllDayEvents(tmp), offsetCount * (itemIdx + offset), isVertical ? itemIdx + offset : 0);
                    }
                }
            }
        },

        _splitAllDayEvents: function(events) {
            if (this._isGroupedByDate()) {
                var result = [];

                for (var idx = 0; idx < events.length; idx++) {
                    var event = events[idx];
                    var start = kendo.date.getDate(event.start);
                    var end = event.end;

                    var eventDurationInDays = Math.ceil((end - start) / kendo.date.MS_PER_DAY);

                    if (!event.isAllDay && eventDurationInDays === 1 && kendo.date.getDate(end).getTime() !== kendo.date.getDate(start).getTime()) {
                        eventDurationInDays += 1;
                    }

                    var task = extend({}, event);
                    result.push(task);

                    if (eventDurationInDays > 1) {
                        task.end = kendo.date.getDate(start);
                        task.isAllDay = true;

                        for (var day = 1; day < eventDurationInDays; day++) {
                            start = kendo.date.getDate(kendo.date.nextDay(task.end));
                            task = extend({}, event);
                            task.start = start;

                            task.isAllDay = true;
                            task.end = kendo.date.getDate(start);

                            result.push(task);
                        }
                    }
                }
                return result;
            }
            return events;
        },

        _columnOffsetForResource: function(index) {
            return this._columnCountForLevel(index) / this._columnCountForLevel(index - 1);
        },

        _columnCountForLevel: function(level) {
            var columnLevel = this.columnLevels[level];
            return columnLevel ? columnLevel.length : 0;
        }

    });

    function arrayEqFilter(item, value) {
        if ($.isArray(item)) {
            for (var idx = 0; idx < item.length; idx++) {
                if (item[idx] == value) {
                    return true;
                }
            }
            return false;
        }
        return item == value;
    }

    extend(true, ui, {
       MultiDayView: MultiDayView,
       DayView: MultiDayView.extend({
           options: {
               title: "Day"
           },
           name: "day"
       }),
       WeekView: MultiDayView.extend({
           options: {
               title: "Week",
               selectedDateFormat: "{0:D} - {1:D}"
           },
           name: "week",
           calculateDateRange: function() {
               var selectedDate = this.options.date,
                   start = kendo.date.dayOfWeek(selectedDate, 0, -1),
                   idx, length,
                   dates = [];

               for (idx = 0, length = 7; idx < length; idx++) {
                   dates.push(start);
                   start = kendo.date.nextDay(start);
               }
               this._render(dates);
           }
       })
    });

})(window.kendo.jQuery);
