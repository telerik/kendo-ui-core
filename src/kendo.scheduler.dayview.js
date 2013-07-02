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
                '#if(!singleDay){#' +
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
        var msMin = getMilliseconds(min),
        msMax = getMilliseconds(max),
        msValue;

        if (!value || msMin == msMax) {
            return true;
        }

        if (min >= max) {
            max += MS_PER_DAY;
        }

        msValue = getMilliseconds(value);

        if (msMin > msValue) {
            msValue += MS_PER_DAY;
        }

        if (msMax < msMin) {
            msMax += MS_PER_DAY;
        }

        return msValue > msMin && msValue < msMax;
    }

    var HINT = '<div style="position:absolute;border:1px solid black; background:black; opacity: 0.5">' +
                    '<div style="position:absolute;top:2px;left:2px;color:white"></div>' +
                    '<div style="position:absolute;bottom:2px;right:2px;color:white"></div>' +
               '</div>';

    var MultiDayView = SchedulerView.extend({
        init: function(element, options) {
            var that = this;

            SchedulerView.fn.init.call(that, element, options);

            that.title = that.options.title || that.options.name;

            that._templates();

            that._editable();

            that.calculateDateRange();

            that._slots();
       },

       _positionSouthResizeHint: function(hint, startSlot, endSlot, width, height) {
           return hint.css("height", height + endSlot.offsetTop - startSlot.offsetTop);
       },

       _positionNorthResizeHint: function(hint, startSlot, endSlot, width, height) {
           return hint.css({
               top: endSlot.offsetTop,
               height: height + startSlot.offsetTop - endSlot.offsetTop
           });
       },

       _positionEastResizeHint: function(hint, startSlot, endSlot, width, height) {
           return hint.css("width", width + endSlot.offsetLeft - startSlot.offsetLeft);
       },

       _positionWestResizeHint: function(hint, startSlot, endSlot, width, height) {
           return hint.css({
               left: endSlot.offsetLeft,
               width: width + startSlot.offsetLeft - endSlot.offsetLeft
           });
       },

       _createEastWestResizeHint: function(left, top, width, height) {
            return $(HINT).css({
                left: left,
                top: top,
                width: width,
                height: height
            }).appendTo(this.element.find(".k-scheduler-header-wrap"));
       },

       _createSouthNorthResizeHint: function(left, top, width, height) {
            return $(HINT).css({
                left: left,
                top: top,
                width: width,
                height: height
            }).appendTo(this.content);
       },

       _slotByPosition: function(x, y) {
           var slot;

           var offset = this.element.find(".k-scheduler-header-wrap").offset();

           x -= offset.left;
           y -= offset.top;

           for (var slotIndex = 0; slotIndex < this._row.slots.length; slotIndex++) {
               slot = this._row.slots[slotIndex];

               if (x >= slot.offsetLeft && x < slot.offsetLeft + slot.clientWidth &&
                   y >= slot.offsetTop && y < slot.offsetTop + slot.clientHeight) {
                   return slot;
               }
           }

           x += offset.left;
           y += offset.top;

           offset = this.content.offset();

           x -= offset.left;
           y -= offset.top;
           y += this.content[0].scrollTop;
           x += this.content[0].scrollLeft;

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
               for (slotIndex = 0; slotIndex < column.slots.length; slotIndex++) {
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

            for (var rowIndex = 0; rowIndex < tableRows.length; rowIndex++) {
                var tr = tableRows[rowIndex];

                tableCells = tr.children;

                for (cellIndex = 0; cellIndex < tableCells.length; cellIndex++) {
                    td = tableCells[cellIndex];

                    range = this._rangeByIndex(rowIndex, cellIndex, tableRows.length - 1);

                    cell = {
                        offsetTop: td.offsetTop,
                        offsetLeft: td.offsetLeft,
                        clientHeight: td.clientHeight,
                        offsetHeight: td.offsetHeight,
                        clientWidth: td.clientWidth,
                        start: range.start,
                        end: range.end
                    };

                    columns[cellIndex].slots.push(cell);
                    columns[cellIndex].offsetLeft = cell.offsetLeft;
                    columns[cellIndex].clientWidth = cell.clientWidth;
                }
            }

            this._columns = columns;

            var row = {
                slots: [],
                events: []
            };

            tableCells = this.element.find(".k-scheduler-header-all-day td");

            for (cellIndex = 0; cellIndex < tableCells.length; cellIndex++) {
                td = tableCells[cellIndex];

                range = this._rangeByIndex(0, cellIndex, tableRows.length - 1);

                cell = {
                    offsetTop: td.parentNode.parentNode.parentNode.offsetTop,
                    offsetLeft: td.offsetLeft,
                    clientHeight: td.clientHeight,
                    offsetHeight: td.offsetHeight,
                    offsetWidth: td.offsetWidth,
                    clientWidth: td.clientWidth,
                    isAllDay: true,
                    start: range.start,
                    end: range.end
                };

                row.slots.push(cell);
            }

            this._row = row;
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
                        var element = $(this);
                        that.trigger("add", { eventInfo: that._rangeToDates(element) });
                        e.preventDefault();
                    }).on("dblclick" + NS, ".k-scheduler-header-all-day td", function(e) {
                        var element = $(this);
                        that.trigger("add", { eventInfo: extend({ isAllDay: true }, that._rangeToDates(element)) });
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
            var that = this,
                options = that.options,
                start = options.startTime,
                end = options.endTime,
                html = '';

            html += '<tbody>';

            html += this._forTimeRange(start, end, function(date, majorTick, middleRow) {
                var content = "",
                    idx,
                    length;

                content = '<tr' + (middleRow ? ' class="k-middle-row"' : "") + '>';

                for (idx = 0, length = dates.length; idx < length; idx++) {
                    content += "<td" + (kendo.date.isToday(dates[idx]) ? ' class="k-today"' : "") + ">";
                    content += "&nbsp;</td>";
                }

                content += "</tr>";
                return content;
            });

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
            var options = this.options,
                startTime = getMilliseconds(options.startTime),
                timeSlotInterval = ((options.majorTick/options.minorTickCount) * MS_PER_MINUTE);

            return startTime + timeSlotInterval * index;
        },

        _rangeByIndex: function(rowIndex, cellIndex, maxTimeSlotIndex) {
            var slotDate = kendo.date.getDate(this._slotIndexDate(cellIndex));

            var slotEndDate = kendo.date.getDate(slotDate);

            kendo.date.setTime(slotDate, this._slotIndexTime(rowIndex));
            kendo.date.setTime(slotEndDate, this._slotIndexTime(Math.min(rowIndex + 1, maxTimeSlotIndex)));

            return {
                start: slotDate,
                end: slotEndDate
            };
        },

        _slotIndexDate: function(index) {
            var idx,
                length,
                slots = this._dates || [],
                startTime = getMilliseconds(new Date(+this.options.startTime)),
                endTime = getMilliseconds(new Date(+this.options.endTime)),
                slotStart;

            if (startTime >= endTime) {
                endTime += MS_PER_DAY;
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

        _timeSlotIndex: function(date) {
            var options = this.options,
                eventStartTime = getMilliseconds(date),
                startTime = getMilliseconds(options.startTime),
                timeSlotInterval = ((options.majorTick/options.minorTickCount) * MS_PER_MINUTE);

            return (eventStartTime - startTime) / (timeSlotInterval);
        },

        _dateSlotIndex: function(date) {
            var idx,
                length,
                slots = this._dates || [],
                slotStart,
                slotEnd;


            for (idx = 0, length = slots.length; idx < length; idx++) {
                slotStart = kendo.date.getDate(slots[idx]);
                slotEnd = new Date(kendo.date.getDate(slots[idx]).getTime() + MS_PER_DAY - 1);

                if (isInDateRange(date, slotStart, slotEnd)) {
                    return idx;
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

        _positionAllDayEvent: function(element, startIndex, endIndex) {
            var dateSlot = this._row.slots[startIndex],
                slotWidth = this._calculateAllDayEventWidth(this._row.slots, startIndex, endIndex),
                allDayEvents = SchedulerView.collidingHorizontallyEvents(this._row.events, startIndex, endIndex),
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

            this._row.events.push({ start: startIndex, end: endIndex, element: element });

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

        _positionEvent: function(event, element, dateSlotIndex) {
            var dateSlot = this._columns[dateSlotIndex];
            var startIndex = Math.max(Math.floor(this._timeSlotIndex(event.startTime || event.start)), 0);
            var endIndex = Math.min(Math.ceil(this._timeSlotIndex(event.endTime || event.end)), dateSlot.slots.length);
            var bottomOffset = 4;

            var timeSlot = dateSlot.slots[Math.floor(startIndex)];

            if (startIndex >= 0 && endIndex === 0) {
                endIndex = dateSlot.slots.length;
            }

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
            var options = this.options,
                showDelete = options.editable && options.editable.destroy !== false,
                startDate = getDate(this.startDate()),
                endDate = getDate(this.endDate()),
                startTime = getMilliseconds(options.startTime),
                endTime = getMilliseconds(options.endTime),
                eventStartTime = getMilliseconds(event.startTime || event.start),
                eventEndTime = getMilliseconds(event.endTime || event.end),
                middle,
                head,
                tail;

            if (startTime >= endTime) {
                endTime = new Date(options.endTime.getTime() + MS_PER_DAY - 1);
            }

            if (!isInDateRange(getDate(event.start), startDate, endDate) ||
                (isOneDayEvent && eventStartTime < startTime && eventEndTime > endTime)) {
                middle = true;
            } else if (getDate(event.start) < startDate || (isOneDayEvent && eventStartTime < startTime)) {
                tail = true;
            } else if (getDate(event.end) > endDate || (isOneDayEvent && eventEndTime > endTime)) {
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
                allDaySlots.parent()
                    .add(this.timesHeader.find(".k-scheduler-times-all-day").parent())
                    .height(height);

                for (var cellIndex = 0; cellIndex < allDaySlots.length; cellIndex++) {
                    this._row.slots[cellIndex].clientHeight = allDaySlots[cellIndex].clientHeight;
                }
            }

        },

        render: function(events) {
            var eventTemplate = this.eventTemplate,
                allDayEventTemplate = this.allDayEventTemplate,
                allDayEventContainer = this.datesHeader.find(".k-scheduler-header-wrap"),
                event,
                idx,
                length;

            this._headerColumnCount = 0;
            this.element.find(".k-event").remove();

            this._updateAllDayHeaderHeight(this._allDayHeaderHeight);

            this._slots();

            events = new kendo.data.Query(events).sort([{ field: "start", dir: "asc" },{ field: "end", dir: "desc" }]).toArray();

            for (idx = 0, length = events.length; idx < length; idx++) {
                event = events[idx];

                if (this._isInDateSlot(event)) {
                   var dateSlotIndex = this._dateSlotIndex(event.start),
                       endDateSlotIndex = this._dateSlotIndex(event.end),
                       isOneDayEvent = !event.isAllDay && event.end.getTime() - event.start.getTime() < MS_PER_DAY && dateSlotIndex === endDateSlotIndex,
                       container = isOneDayEvent ? this.content : allDayEventContainer,
                       element = this._createEventElement(event,isOneDayEvent ? eventTemplate : allDayEventTemplate, isOneDayEvent);

                   if (isOneDayEvent) {

                       if (this._isInTimeSlot(event)) {

                           if (dateSlotIndex === -1 && endDateSlotIndex > -1) {
                               dateSlotIndex = endDateSlotIndex;
                           }

                           this._positionEvent(event, element, dateSlotIndex);

                           element.appendTo(container);
                       }

                   } else if (this.options.allDaySlot) {
                       if (dateSlotIndex < 0) {
                           dateSlotIndex = 0;
                       }

                       if (endDateSlotIndex < 0) {
                           endDateSlotIndex = this._row.slots.length - 1;
                       }

                       this._positionAllDayEvent(element, dateSlotIndex, endDateSlotIndex);

                       element.appendTo(container);
                   }
                }
            }

            this.refreshLayout();
        }
    });

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
