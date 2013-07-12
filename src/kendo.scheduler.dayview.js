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
        keys = kendo.keys,
        addDays = kendo.date.addDays,
        setTime = kendo.date.setTime,
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
                '#if(resizable && !singleDay && !data.tail && !data.middle){#' +
                '<span class="k-resize-handle k-resize-w"></span>' +
                '#}#' +
                '#if(resizable && !singleDay && !data.head && !data.middle){#' +
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
                '# if(resizable && !data.tail && !data.middle) {#' +
                '<span class="k-resize-handle k-resize-n"></span>' +
                '# } #' +
                '# if(resizable && !data.head && !data.middle) {#' +
                    '<span class="k-resize-handle k-resize-s"></span>' +
                '# } #' +
                '</div>';

    function toInvariantTime(date) {
        var staticDate = new Date(1980, 1, 1, 0, 0, 0);
        setTime(staticDate, getMilliseconds(date));
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

       _toDaySlot: function(slot) {
            if (!slot.isAllDay) {
                return slot;
            }

            var dateSlotIndex = this._dateSlotIndex(slot.start);
            return this._columns[dateSlotIndex].slots[0];
       },

       _toAllDaySlot: function(slot) {
            if (slot.isAllDay) {
                return slot;
            }

            return this._rows[0].slots[this._dateSlotIndex(slot.start)];
       },

       _updateResizeHint: function(direction, startSlot, endSlot) {
            var vertical = direction == "south" || direction == "north";
            var container = this.content;
            var format;

            this._removeResizeHint();

            if (vertical) {
                startSlot = this._toDaySlot(startSlot);
                endSlot = this._toDaySlot(endSlot);

                var slotGroups = [];

                for (var columnIndex = startSlot.columnIndex; columnIndex <= endSlot.columnIndex; columnIndex++) {
                    var slots = this._columns[columnIndex].slots;
                    var first = slots[0];
                    var last = slots[slots.length - 1];

                    if (first.start < startSlot.start) {
                        first = startSlot;
                    }

                    if (last.start > endSlot.start) {
                        last = endSlot;
                    }

                    slotGroups.push( {
                        startSlot: first,
                        endSlot: last
                    });
                }

                for (var groupIndex = 0; groupIndex < slotGroups.length; groupIndex++) {
                    var slotGroup = slotGroups[groupIndex];
                    startSlot = slotGroup.startSlot;
                    endSlot = slotGroup.endSlot;

                    var hint = SchedulerView.fn._createResizeHint.call(this,
                        startSlot.offsetLeft + parseInt($(startSlot.element).css("borderLeftWidth"), 10),
                        startSlot.offsetTop,
                        startSlot.clientWidth,
                        this._calculateEventHeight(this._columns[startSlot.columnIndex].slots, startSlot.index, endSlot.index + 1) - 3
                    );

                    hint.appendTo(container);

                    this._resizeHint = this._resizeHint.add(hint);
                }

                format = "t";
            } else {
                startSlot = this._toAllDaySlot(startSlot);
                endSlot = this._toAllDaySlot(endSlot);
                container = this.element.find(".k-scheduler-header-wrap");

                this._resizeHint = SchedulerView.fn._createResizeHint.call(this,
                    startSlot.offsetLeft + parseInt($(startSlot.element).css("borderLeftWidth"), 10),
                    startSlot.offsetTop,
                    this._calculateAllDayEventWidth(this._rows[0].slots, startSlot.columnIndex, endSlot.columnIndex),
                    startSlot.clientHeight
                );

                this._resizeHint.appendTo(container);

                format = "M/dd";
            }

            this._resizeHint.find(".k-label-top,.k-label-bottom").text("");

            this._resizeHint.first().addClass(".k-first").find(".k-label-top").text(kendo.toString(startSlot.start, format));

            this._resizeHint.last().addClass(".k-last").find(".k-label-bottom").text(kendo.toString(endSlot.end, format));
        },

        _updateMoveHint: function(event, initialSlot, currentSlot) {
            var isAllDay = event.isAllDay || event.end.getTime() - event.start.getTime() > MS_PER_DAY;
            var slots;

            if (isAllDay) {
                currentSlot = this._toAllDaySlot(currentSlot);
                slots = this._rows[0].slots;
            } else {
                currentSlot = this._toDaySlot(currentSlot);
                slots = this._columns[this._dateSlotIndex(currentSlot.start)].slots;
            }

            var distance = currentSlot.start.getTime() - initialSlot.start.getTime();

            var duration = event.end.getTime() - event.start.getTime();

            var start = new Date(event.start.getTime());

            kendo.date.setTime(start, distance);

            var end = new Date(start.getTime());

            setTime(end, duration);

            var startSlotIndex;
            var endSlotIndex;

            if (isAllDay) {
                startSlotIndex = this._dateSlotIndex(start);
                endSlotIndex = this._dateSlotIndex(end);
            } else {
                startSlotIndex = this._timeSlotIndex(start);
                endSlotIndex = this._timeSlotIndex(end);
            }

            if (startSlotIndex < 0) {
               startSlotIndex = 0;
            }

            var height = 0;

            if (endSlotIndex < 0) {
                endSlotIndex = slots.length - 1;
                height = slots[endSlotIndex].offsetHeight;
            }

            var startSlot = slots[startSlotIndex];

            var css = {
                left: startSlot.offsetLeft + 2,
                top: startSlot.offsetTop
            };

            if (isAllDay) {
                css.width = this._calculateAllDayEventWidth(slots, startSlotIndex, endSlotIndex) - 4;
            } else {
                css.height = height + this._calculateEventHeight(slots, startSlotIndex, endSlotIndex) - 4;

                css.width = startSlot.clientWidth * 0.9 - 4;
            }

            this._removeMoveHint();

            this._moveHint = this._createEventElement($.extend({}, event, { start: start, end: end }), !isAllDay);
            this._moveHint.addClass("k-event-drag-hint");
            this._moveHint.css(css);
            this._moveHint.appendTo(isAllDay ? this.element.find(".k-scheduler-header-wrap") : this.content);

            return startSlot;
        },

       _slotByPosition: function(x, y) {
           var slot;
           var offset = this.element.find(".k-scheduler-header-wrap:has(.k-scheduler-header-all-day)").offset();

           if (offset) {
               x -= offset.left;
               y -= offset.top;
           }

           x = Math.ceil(x);
           y = Math.ceil(y);

           slot = allDaySlotByPosition(this._rows, x, y);

           if (slot) {
                return slot;
           }

           if (offset) {
               x += offset.left;
               y += offset.top;
           }

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
            var visibleAllDayRowCount = 0;
            var isVertical = this.options.groupOrientation === "vertical";

            var allDaySelector = ".k-scheduler-header-all-day tr";

            if (this._isVerticallyGrouped()) {
               allDaySelector = ".k-scheduler-header-all-day";
            }

            var allDayRows = this.element.find(allDaySelector);

            var allDayRowCount = this._isVerticallyGrouped() ? allDayRows.length : 0;

            for (var rowIndex = 0; rowIndex < tableRows.length; rowIndex++) {
                var tr = tableRows[rowIndex];

                if (tr.className && tr.className.indexOf("k-scheduler-header-all-day") > -1) {
                    visibleAllDayRowCount++;
                    continue;
                }

                tableCells = tr.children;

                for (cellIndex = 0; cellIndex < tableCells.length; cellIndex++) {
                    td = tableCells[cellIndex];

                    range = this._rangeByIndex(rowIndex - visibleAllDayRowCount, cellIndex, tableRows.length - 1 - allDayRowCount);

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
                    cell.columnIndex = cellIndex;

                    if (isVertical) {
                        cell.groupIndex = this._groupVerticalIndex(rowIndex - visibleAllDayRowCount);
                    } else {
                        cell.groupIndex = this._groupHorizontalIndex(cellIndex);
                    }

                    columns[cellIndex].slots.push(cell);
                    columns[cellIndex].offsetLeft = cell.offsetLeft;
                    columns[cellIndex].clientWidth = cell.clientWidth;
                }
            }

            this._columns = columns;

            //tableRows = allDayRows;

            var rows = [];

            var row = { slots: [], events: [] };
            if (!allDayRows.length) {
                rows.push(row);
            } else {
                var rowsInGroup = 0;
                if (this._isVerticallyGrouped()) {
                    rowsInGroup = this._rowCountInGroup();
                }

                for (rowIndex = 0; rowIndex < allDayRows.length; rowIndex++) {
                    row = { slots: [], events: [] };

                    tableCells = allDayRows[rowIndex].children;

                    for (cellIndex = 0; cellIndex < tableCells.length; cellIndex++) {
                        td = tableCells[cellIndex];

                        range = this._rangeByIndex(rowIndex, cellIndex, allDayRows.length);

                        cell = {
                            offsetTop: allDayRows.length > 1 ? td.offsetTop : td.parentNode.parentNode.parentNode.offsetTop,
                            offsetLeft: td.offsetLeft,
                            clientHeight: td.clientHeight,
                            offsetHeight: td.offsetHeight,
                            offsetWidth: td.offsetWidth,
                            clientWidth: td.clientWidth,
                            element: td,
                            isAllDay: true,
                            start: range.start,
                            end: range.end,
                            index: rowIndex * rowsInGroup,
                            columnIndex: cellIndex
                        };

                        if (isVertical) {
                            cell.groupIndex = rowIndex;
                        } else {
                            cell.groupIndex = this._groupHorizontalIndex(cellIndex);
                        }

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
            editable: true,
            messages: {
                allDay: "all day"
            }
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

                            var resourceInfo = that._resourceBySlot(slot);

                            that.trigger("add", { eventInfo: extend({ start: slot.start, end: slot.end }, resourceInfo) });

                            e.preventDefault();
                        }
                    }).on("dblclick" + NS, ".k-scheduler-header-all-day td", function(e) {
                        var slot = that._slotByPosition(e.pageX, e.pageY);
                        var resourceInfo = that._resourceBySlot(slot);

                        that.trigger("add", { eventInfo: extend({ isAllDay: true, start: kendo.date.getDate(slot.start), end: kendo.date.getDate(slot.end) }, resourceInfo) });

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
                rows.push( { text: options.messages.allDay, allDay: true });
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

                setTime(start, msInterval, false);
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
                    rowCount = this._rowCountForLevel(this.rowLevels.length - 2);
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
            var offset = cell.offset();
            return this._slotByPosition(offset.left, offset.top);
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

            setTime(slotDate, this._slotIndexTime(rowIndex));

            maxTimeSlotIndex = this._adjustSlotIndex(maxTimeSlotIndex);
            if (this._adjustSlotIndex(rowIndex) >= maxTimeSlotIndex) {
                setTime(slotEndDate, getMilliseconds(this.options.endTime));
                if (kendo.date.getDate(slotEndDate).getTime() === slotEndDate.getTime()) {
                    slotEndDate = kendo.date.nextDay(slotEndDate);
                }
            } else {
                setTime(slotEndDate, this._slotIndexTime(rowIndex + 1));
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
                setTime(slotStart, startTime);

                if (index === idx) {
                    return slotStart;
                }
            }
            return null;
        },

        _adjustSlotIndex: function(index) {
            if (this._isVerticallyGrouped()) {
                var rowCount = this._rowCountInGroup();
                return index - (rowCount*Math.floor(index/rowCount));
            }
            return index;
        },

        _groupHorizontalIndex: function(cellIndex) {
            if (this.groupedResources.length) {
                return Math.floor(cellIndex/this._columnCountInGroup());
            }
            return 0;
        },

        _groupVerticalIndex: function(rowIndex) {
            if (this.groupedResources.length) {
                return Math.floor(rowIndex/this._rowCountInGroup());
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

        _rowCountInGroup: function() {
            var resources = this.groupedResources;
            var allDaySlotOffset = this.options.allDaySlot ? this._rowCountForLevel(resources.length - 1) : 0;

            return (this._rowCountForLevel(resources.length) - allDaySlotOffset) / this._rowCountForLevel(resources.length - 1);
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
            var maxSlotCount = this._isVerticallyGrouped() ? this._rowCountInGroup() : dateSlot.slots.length;
            var startIndex = Math.floor(this._timeSlotIndex(event.startTime || event.start)) + timeResouceOffset;
            var endIndex = Math.ceil(this._timeSlotIndex(event.endTime || event.end));
            var bottomOffset = 4;

            if ((startIndex > 0 || startIndex < 0) && endIndex <= 0) {
                endIndex = maxSlotCount;
            }

            if (startIndex < 0 ) {
                startIndex = 0;
            }

            if (endIndex > maxSlotCount) {
                endIndex = maxSlotCount;
            }

            endIndex += timeResouceOffset;

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

       _createEventElement: function(event, isOneDayEvent) {
            var template = isOneDayEvent ? this.eventTemplate : this.allDayEventTemplate;
            var options = this.options;
            var editable = options.editable;
            var showDelete = editable && editable.destroy !== false;
            var resizable = editable && editable.resize !== false;
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
                resizable: resizable,
                showDelete: showDelete,
                middle: middle,
                head: head,
                tail: tail,
                singleDay: this._dates.length == 1 || this._isGroupedByDate(),
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
                setTime(slotEndTime, MS_PER_DAY - 1);
            }

            if (getMilliseconds(endTime) === getMilliseconds(kendo.date.getDate(endTime)) && endTime.getTime() > startTime.getTime()) {
                endTime = kendo.date.getDate(endTime);
                setTime(endTime, MS_PER_DAY - 1);
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

                var groupRowCount = this._rowCountInGroup();

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
                        element = this._createEventElement(event, isOneDayEvent);

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
                    if (!this._isVerticallyGrouped()) {
                        this.columnLevels.push(new Array(this._columnCountForLevel(this.columnLevels.length - 1)));
                        initialLevel = 2;
                    }
                }

                this._renderGroups(events, resources, 0, initialLevel);
            } else {
                this._renderEvents(events, 0, 0);
            }

            this.refreshLayout();
            this.trigger("render");
        },

        _resourceBySlot: function(slot) {
            var resources = this.groupedResources;
            var result = {};
            var isVertical = this._isVerticallyGrouped();

            if (resources.length) {
                var index = isVertical ? slot.index : slot.columnIndex;
                var offset = 0;

                if (this._isGroupedByDate()) {
                    offset = 1; // skip the date header in the levels calculation
                    //offset the index as we are not the first header
                    index -= Math.floor(index/this._columnCountInGroup())*this._columnCountInGroup();
                }

                for (var idx = 0, length = resources.length; idx < length; idx++) {
                    var resource = resources[idx];

                    var columnCount;
                    if (isVertical) {
                        var allDaySlotOffset = this.options.allDaySlot ? this._rowCountForLevel(resources.length - 1) : 0;
                        columnCount = (this._rowCountForLevel(resources.length) - allDaySlotOffset) / this._rowCountForLevel(idx);
                    } else {
                        columnCount = this._columnCountForLevel(resources.length) / this._columnCountForLevel(idx + offset);
                    }

                    var groupIndex = Math.floor(index/columnCount);

                    index -= groupIndex*columnCount;

                    var value = resourceValue(resource, resource.dataSource.at(groupIndex));

                    if (resource.multiple) {
                        value = [value];
                    }

                    var setter = kendo.setter(resource.field);
                    setter(result, value);
                }
            }

            return result;
        },

        _renderGroups: function(events, resources, offset, columnLevel) {
            var resource = resources[0];
            var offsetCount;
            var isVertical = this.options.groupOrientation === "vertical";

            if (isVertical) {
                var allDaySlotOffset = resources.length === 1 && this.options.allDaySlot ? this._rowCountForLevel(columnLevel - 1) : 0;
                offsetCount = (this._rowCountForLevel(columnLevel) - allDaySlotOffset) / this._rowCountForLevel(columnLevel - 1);
            } else {
                offsetCount = this._columnOffsetForResource(columnLevel);
            }

            if (resource) {
                var view = resource.dataSource.view();

                for (var itemIdx = 0; itemIdx < view.length; itemIdx++) {
                    var value = resourceValue(resource, view[itemIdx]);

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

                    if (eventDurationInDays === 1 && kendo.date.getDate(end).getTime() !== kendo.date.getDate(start).getTime()) {
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
        },

        _rowCountForLevel: function(level) {
            var rowLevel = this.rowLevels[level];
            return rowLevel ? rowLevel.length : 0;
        },

        _selectionOffset: function() {
            return this._dates.length;
        },

        //TODO: refactor... very buggy!!!
        moveSelectionByOffset: function(selection) {
            var offset = this._selectionOffset(),
                startDate = this._startDate,
                endDate = this._endDate,
                start = selection.start,
                end = selection.end;

            if (getMilliseconds(endDate) === 0) {
                endDate = kendo.date.addDays(endDate, 1);
            }

            if (start < startDate || end >= endDate) {
                if (start >= endDate) {
                    offset = -offset;
                }

                start.setDate(start.getDate() + offset);
                end.setDate(end.getDate() + offset);

                if (start < startDate) {
                    setDate(start, startDate);
                }

                if (end > endDate) {
                    setDate(end, endDate);
                }

                selection.events = [];
            }
        },

        clearSelection: function() {
            this.content.add(this.datesHeader).find(".k-state-selected").removeClass("k-state-selected");
        },

        select: function(selection) {
            if (selection) {
                this.clearSelection();

                if (selection.events[0]) {
                    if (this._selectEvents(selection)) {
                        return;
                    }
                }

                this._selectCells(selection);
            }
        },

        _selectEvents: function(selection) {
            var container = this.content.add(this.datesHeader.children()),
                events = selection.events,
                length = events.length,
                idx = 0,
                event;

            for (; idx < length; idx++) {
                event = container.children("[data-uid=" + events[idx] + "]").addClass("k-state-selected");
                event = event[event.length - 1];

                if (!event) {
                    this.clearSelection();
                    return;
                }
            }

            if (event) {
                this._scrollTo(event, this.content[0]);
                return true;
            }
        },

        _selectCells: function(selection) {
            var startDate = selection.start,
                endDate = selection.end,
                backwardSelection = startDate > endDate;

            if (backwardSelection) {
                startDate = new Date(endDate);
                endDate = selection.start;
            }

            var that = this,
                columns = that._columns,
                startRow = Math.floor(that._timeSlotIndex(startDate)),
                endRow = Math.ceil(that._timeSlotIndex(endDate)),
                startCol = that._dateSlotIndex(startDate),
                endCol = that._dateSlotIndex(endDate),
                endTime = getMilliseconds(this.options.endTime),
                endDateTime = getMilliseconds(endDate),
                dayDiff = endDate.getDate() - startDate.getDate(),
                slots, firstCell, cell,
                end;

            if (startRow < 0) {
                startRow = 0;
            }

            if (endRow < 0) {
                endRow = 0;
            }

            if (!selection.isAllDay) {
                if (endDateTime === 0 && endDateTime === endTime && dayDiff > 0) {
                    endCol -= 1;
                    endRow = columns[endCol].slots.length;
                }

                end = endRow;
                if (endCol > startCol) {
                    end = columns[endCol].slots.length;
                }

                for (; startCol <= endCol; startCol++) {
                    if (startCol === endCol) {
                        end = endRow;
                    }

                    slots = columns[startCol].slots;

                    for (; startRow < end; startRow++) {
                        cell = slots[startRow].element;
                        addSelectedState(cell);
                        if (!firstCell) {
                            firstCell = cell;
                        }
                    }

                    startRow = 0;
                }
            } else {
                slots = that._rows[0].slots;

                for (; startCol <= endCol; startCol++) {
                    cell = slots[startCol].element;
                    addSelectedState(cell);
                }
            }

            that._scrollTo(backwardSelection ? firstCell : cell, that.content[0]);
        },

        /*_selectCells: function(selection) {
            var startDate = selection.start,
                endDate = selection.end,
                backwardSelection = startDate > endDate;

            if (backwardSelection) {
                startDate = new Date(endDate);
                endDate = selection.start;
            }

            var that = this,
                headerTable = that.datesHeader.find("table.k-scheduler-header-all-day")[0], //TODO: Add support for grouped widget
                startRow = Math.floor(that._timeSlotIndex(startDate)),
                endRow = Math.ceil(that._timeSlotIndex(endDate)),
                startCol = that._dateSlotIndex(startDate),
                endCol = that._dateSlotIndex(endDate),
                isAllDay = selection.isAllDay && headerTable,
                selectAllDay = false,
                event, cell, table,
                firstCell, end;

            if (startRow < 0) {
                startRow = 0;
            }

            if (endRow < 0) {
                endRow = 0;
            }

            if (!isAllDay) {
                table = that.content.children("table")[0];
                if (startCol !== endCol) {
                    end = that._columns[startCol].slots.length - 1;
                    if (headerTable) {
                        selectAllDay = true;
                    }
                } else if (endRow === 0 && endRow <= startRow) {
                    endRow = that._columns[startCol].slots.length;
                }

                if (startRow !== endRow && endRow > 0) {
                    endRow -= 1;
                }
            } else {
                end = startRow = endRow = 0;
                table = headerTable;
                headerTable = null;
            }

            for (; startCol <= endCol; startCol++) {
                if (startCol === endCol) {
                    end = endRow;
                }

                for (; startRow <= end; startRow++) {
                    cell = table.rows[startRow].cells[startCol];
                    addSelectedState(cell);
                    if (!firstCell) {
                        firstCell = cell;
                    }
                }

                startRow = 0;

                if (selectAllDay) {
                    cell = headerTable.rows[startRow].cells[startCol];
                    addSelectedState(cell);
                }
            }

            that._scrollTo(backwardSelection ? firstCell : cell, that.content[0]);
        },*/

        _scrollTo: function(element, container) {
            var elementOffset = element.offsetTop,
                elementOffsetDir = element.offsetHeight,
                containerScroll = container.scrollTop,
                containerOffsetDir = container.clientHeight,
                bottomDistance = elementOffset + elementOffsetDir,
                result = 0;

                if (containerScroll > elementOffset) {
                    result = elementOffset;
                } else if (bottomDistance > (containerScroll + containerOffsetDir)) {
                    if (elementOffsetDir <= containerOffsetDir) {
                        result = (bottomDistance - containerOffsetDir);
                    } else {
                        result = elementOffset;
                    }
                } else {
                    result = containerScroll;
                }
                container.scrollTop = result;
        },

        move: function(selection, key, shiftKey) {
            var options = this.options,
                endTime = new Date(options.endTime),
                interval = (options.majorTick * MS_PER_MINUTE) / (options.minorTickCount || 1),
                start = new Date(selection.start),
                end = new Date(selection.end),
                multipleSelection = Math.abs(start - end) > interval,
                isAllDay = selection.isAllDay,
                //events = selection.events,
                startSlotIndex, endSlotIndex,
                startSlot, endSlot,
                offsetColumn = true,
                handled = false;

            if (key === keys.DOWN) {
                handled = true;
                if (isAllDay) {
                    isAllDay = false;
                    startSlotIndex = 0;
                    endSlotIndex = -1;
                } else {
                    startSlotIndex = 1;
                    endSlotIndex = 0;
                }

                if (multipleSelection) {
                    endSlotIndex = startSlotIndex = 0;
                    offsetColumn = false;
                    start = end;
                }

                startSlot = this._slotByDate(start, startSlotIndex, offsetColumn);
                endSlot = this._slotByDate(end, endSlotIndex, offsetColumn);
                endSlot = endSlot || startSlot;
            } else if (key === keys.UP) {
                handled = true;

                startSlotIndex = -1;
                endSlotIndex = -2;

                if (multipleSelection) {
                    endSlotIndex = startSlotIndex;
                    end = start;
                }

                startSlot = this._slotByDate(start, startSlotIndex);
                endSlot = this._slotByDate(end, endSlotIndex);

                if (options.allDaySlot && !startSlot) {
                    isAllDay = true;
                    startSlot = this._slotByDate(start);
                    endSlot = this._slotByDate(end, -1);
                }

                endSlot = endSlot || startSlot;
            } else if (key === keys.RIGHT) {
                handled = true;
                startSlot = endSlot = {
                    start: addDays(start, 1),
                    end: addDays(end, 1)
                };
            } else if (key === keys.LEFT) {
                handled = true;
                startSlot = endSlot = {
                    start: addDays(start, -1),
                    end: addDays(end, -1)
                };
            }

            if (handled) {
                selection.events = [];
                if (startSlot && endSlot) {
                    selection.isAllDay = isAllDay;
                    if (!shiftKey) {
                        selection.start = startSlot.start;
                    }

                    selection.end = endSlot.end;
                }
            }

            return handled;
        },

        _slotByDate: function(date, offsetIndex, offsetColumn) {
            var column = this._dateSlotIndex(date);

            offsetIndex = offsetIndex || 0;

            //TODO: Probably check whether the start is different than end
            if (offsetColumn !== false && getMilliseconds(date) === getMilliseconds(this.options.endTime) && column > 0) {
                column -= 1;
            }

            column = this._columns[column];
            if (column) {
                return column.slots[this._timeSlotIndex(date) + offsetIndex];
            }

            return null;
        },

        /*move: function(selection, key, shiftKey) {
            var options = this.options,
                startTime = options.startTime,
                interval = (options.majorTick * MS_PER_MINUTE) / (options.minorTickCount || 1),
                isAllDay = selection.isAllDay,
                events = selection.events,
                start = selection.start,
                end = selection.end,
                handled = false,
                event;

            if (key === keys.RIGHT) {
                handled = true;

                start = addDays(start, 1);
                end = addDays(end, 1);
            } else if (key === keys.LEFT) {
                handled = true;

                start = addDays(start, -1);
                end = addDays(end, -1);
            } else if (key === keys.DOWN) {
                handled = true;
                if (isAllDay || getMilliseconds(end) !== getMilliseconds(options.endTime)) { //TODO: what about start === end ???
                    if (events[0]) {
                        start = new Date(end);
                        setTime(start, -interval);
                    }

                    if (isAllDay) {
                        end.setHours(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds(), startTime.getMilliseconds());
                        start = new Date(end);
                        isAllDay = false;
                    } else if (!shiftKey) {
                        setTime(start, interval);
                        if (end - start > 0) {
                            end = new Date(start);
                        }
                    }

                    setTime(end, interval);
                }
            } else if (key === keys.UP) {
                handled = true;
                if (!isAllDay) {
                    if (!shiftKey && (getMilliseconds(start) - interval) < getMilliseconds(startTime)) {
                        isAllDay = true;
                    } else {
                        if (!shiftKey) {
                            if (end - start > interval) {
                                end = new Date(start);
                            } else {
                                setTime(end, -interval);
                            }
                        }

                        setTime(start, -interval);
                    }
                }
            }

            if (handled) {
                selection.events = [];
                selection.isAllDay = isAllDay;
                selection.start = start;
                selection.end = end;
            }

            return handled;
        },*/

        moveToEvent: function(selection, previous) {
            return true;
        },

        right: function(selection) {
            if (selection.events[0]) {
                selection.events = [];
            }
            selection.start = kendo.date.addDays(selection.start, 1);
            selection.end = kendo.date.addDays(selection.end, 1);
        },

        left: function(selection) {
            if (selection.events[0]) {
                selection.events = [];
            }
            selection.start = kendo.date.addDays(selection.start, -1);
            selection.end = kendo.date.addDays(selection.end, -1);
        },

        down: function(selection) {
            var interval = (this.options.majorTick * MS_PER_MINUTE) / (this.options.minorTickCount || 1),
                startTime = this.options.startTime,
                endTime = this.options.endTime,
                start = new Date(selection.start),
                end = new Date(selection.end);

            if (selection.events[0]) {
                start = new Date(end);
                end = new Date(start);

                kendo.date.setTime(start, -interval);

                selection.events = [];
            }

            if (selection.isAllDay) {
                start = new Date(start.getFullYear(), start.getMonth(), start.getDate(), startTime.getHours(), startTime.getMinutes(), startTime.getSeconds(), startTime.getMilliseconds());
                end = new Date(start);

                kendo.date.setTime(end, interval);
                selection.isAllDay = false;
            } else {
                endTime = new Date(end.getFullYear(), end.getMonth(), end.getDate(), endTime.getHours(), endTime.getMinutes(), endTime.getSeconds(), endTime.getMilliseconds());
                if ((end.getDate() === start.getDate()) && !kendo.date.getMilliseconds(endTime)) {
                    kendo.date.setTime(endTime, MS_PER_DAY);
                }

                kendo.date.setTime(start, interval);
                kendo.date.setTime(end, interval);
            }

            if (end <= endTime) {
                selection.start = start;
                selection.end = end;
            }
        },

        up: function(selection) {
            var interval = (this.options.majorTick * MS_PER_MINUTE) / (this.options.minorTickCount || 1),
                startTime = this.options.startTime,
                start = new Date(selection.start),
                end = new Date(selection.end);

            if (selection.events[0]) {
                selection.events = [];
            }

            kendo.date.setTime(start, -interval);
            kendo.date.setTime(end, -interval);

            if (kendo.date.getMilliseconds(start) >= kendo.date.getMilliseconds(startTime)) {
                selection.start = start;
                selection.end = end;
            } else if (!selection.isAllDay) {
                selection.isAllDay = true;
            }
        },

        _getAllDayEvents: function(col, selected) {
            var allDayRow = this._rows[0],
                events = allDayRow.events,
                result,
                event;

            for (var i = eventIndex(events, selected), length = events.length; i < length; i++) {
                event = events[i];

                if (event.start === col) {
                    result = event;
                    break;
                }
            }

            return result;
        },

        nextEvent: function(selection) {
            var that = this,
                col = that._dateSlotIndex(selection.start),
                row = that._timeSlotIndex(selection.start),
                columns = that._columns,
                columnsLength = columns.length,
                eventsLength, events, event,
                isSlot = !selection.events || !selection.events[0],
                i = col, j = 0, found = false, isAllDay = false,
                modified = false;

            while (i < columnsLength) {
                events = columns[i].events;
                eventsLength = events.length;

                for (j = eventIndex(events, selection.events); j < eventsLength; j++) {
                    event = events[j];

                    if (event.start >= row) {

                        found = true;
                        break;
                    }
                }

                if (found) {
                    break;
                } else {
                    event = that._getAllDayEvents(i + 1, selection.events);
                    if (event) {
                        isAllDay = found = true;
                        break;
                    }
                }

                row = 0;
                i++;

                if (i === columnsLength && isSlot && !modified) {
                    columnsLength = col;
                    i = 0;
                    modified = true;
                }
            }

            if (found) {
                var slots = isAllDay ? that._rows[0].slots : columns[i].slots,
                    startSlot = slots[event.start],
                    endSlot = slots[event.end - (isAllDay ? 0 : 1)];

                selection.start = new Date(startSlot.start);
                selection.end = new Date(endSlot.end);
                selection.isAllDay = isAllDay;
                selection.events = [event.element.data("uid")];
            }

            return found;
        }
    });

    var selectedStateRegExp = /\s*k-state-selected/;
    function addSelectedState(cell) {
        cell.className = cell.className.replace(selectedStateRegExp, "") + " k-state-selected";
    }

    function setDate(date1, date2) {
        date1.setFullYear(date2.getFullYear(), date2.getMonth(), date2.getDate());
    }

    function resourceValue(resource, item) {
        if (resource.valuePrimitive) {
            item = kendo.getter(resource.dataValueField)(item);
        }
        return item;
    }

    function eventIndex(events, selected) {
        if (!selected || !selected.length) {
            return 0;
        }

        selected = selected[selected.length - 1];

        events = $.map(events, function(item) { return item.element.data("uid"); });

        return $.inArray(selected, events) + 1;
    }

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
