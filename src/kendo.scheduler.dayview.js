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
        isInTimeRange = kendo.date.isInTimeRange,
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
        EVENT_WRAPPER_STRING = '<div class="k-event" data-#=ns#uid="#=uid#"' +
                '#if (resources[0]) { #' +
                'style="background-color:#=resources[0].color #"' +
                '#}#' +
                '>' +
                '<span class="k-event-actions">' +
                    '# if(data.tail || data.middle) {#' +
                        '<span class="k-icon k-i-arrow-w"></span>' +
                    '#}#' +
                    '# if(data.recurrence) {#' +
                        '<a href="\\#" class="k-link"><span class="k-icon k-i-refresh"></span></a>' +
                    '#}#' +
                '</span>' +
                '{0}' +
                '<span class="k-event-actions">' +
                    '#if (showDelete) {#' +
                        '<a href="\\#" class="k-link k-event-delete"><span class="k-icon k-i-close"></span></a>' +
                    '#}#' +
                    '# if(data.head || data.middle) {#' +
                        '<span class="k-icon k-i-arrow-e"></span>' +
                    '#}#' +
                '</span>' +
                //'<span class="k-icon k-resize-handle"></span>' +
                '</div>';

    function toInvariantTime(date) {
        var staticDate = new Date(1980, 1, 1, 0, 0, 0);
        kendo.date.setTime(staticDate, getMilliseconds(date));
        return staticDate;
    }

    function executeTemplate(template, options, dataItem) {
        var settings = extend({}, kendo.Template, options.templateSettings),
            type = typeof(template),
            text = "";

        if (type === "function") {
            text = kendo.template(template, settings)(dataItem || {});
        } else if (type === "string") {
            text = template;
        }
        return text;
    }

    function isInDateRange(value, min, max) {
        var msMin = min.getTime(),
            msMax = max.getTime(),
            msValue;

        msValue = value.getTime();

        return msValue >= msMin && msValue <= msMax;
    }

    var MultiDayView = SchedulerView.extend({
        init: function(element, options) {
            var that = this;

            SchedulerView.fn.init.call(that, element, options);

            that.title = that.options.title || that.options.name;

            that.eventTemplate = that._eventTmpl(that.options.eventTemplate);
            that.allDayEventTemplate = that._eventTmpl(that.options.allDayEventTemplate);

            that._editable();

            that.calculateDateRange();
       },

        options: {
            name: "MultiDayView",
            selectedDateFormat: "{0:D}",
            allDaySlot: true,
            title: "",
            startTime: kendo.date.today(),
            endTime: kendo.date.today(),
            numberOfTimeSlots: 2,
            majorTick: 60,
            majorTickTimeTemplate: kendo.template("#=kendo.toString(date, 't')#"),
            minorTickTimeTemplate: "&nbsp;",
            eventTemplate: DAY_VIEW_EVENT_TEMPLATE,
            allDayEventTemplate: DAY_VIEW_ALL_DAY_EVENT_TEMPLATE,
            dateHeaderTemplate: DATA_HEADER_TEMPLATE,
            editable: true
        },

        events: ["remove", "add", "edit"],

        _editable: function() {
            var that = this;
            if (that.options.editable) {

                that.element.on("click" + NS, ".k-event a:has(.k-i-close)", function(e) {
                    that.trigger("remove", { uid: $(this).closest(".k-event").attr(kendo.attr("uid")) });
                    e.preventDefault();
                });

                if (that.options.editable.create !== false) {
                    that.element.on("dblclick", ".k-scheduler-content td", function(e) {
                        var element = $(this);
                        that.trigger("add", { eventInfo: that._rangeToDates(element) });
                        e.preventDefault();
                    }).on("dblclick", ".k-scheduler-header-all-day td", function(e) {
                        var element = $(this);
                        that.trigger("add", { eventInfo: extend({ isAllDay: true }, that._rangeToDates(element)) });
                        e.preventDefault();
                    });
                }

                if (that.options.editable.update !== false) {
                    that.element.on("dblclick", ".k-event", function(e) {
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

            for (var idx = 0; idx < dates.length; idx++) {
                var column = {};

                column.text = executeTemplate(options.dateHeaderTemplate, options, { date: dates[idx] });

                if (kendo.date.isToday(dates[idx])) {
                    column.className = "k-today";
                }

                columns.push(column);
            }

            if (options.allDaySlot) {
                rows.push( { text: "all day", allDay: true });
            }

            this._forTimeRange(options.startTime, options.endTime, function(date, majorTick) {
                var template = majorTick ? options.majorTickTimeTemplate : options.minorTickTimeTemplate;

                var row = {
                    text: executeTemplate(template, options, { date: date }),
                    className: majorTick ? "k-middle-row" : ""
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
                msMajorInterval = that.options.majorTick * MS_PER_MINUTE,
                msInterval = msMajorInterval / that.options.numberOfTimeSlots || 1,
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
                html += action(start, idx % (msMajorInterval/msInterval) === 0);

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

            html += this._forTimeRange(start, end, function(date, majorTick) {
                var content = "",
                    idx,
                    length;

                content = '<tr' + (majorTick ? ' class="k-middle-row"' : "") + '>';

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
                slotDate = this._slotIndexDate(dateIndex),
                slotEndDate;

            if (slotDate) {
                slotEndDate = new Date(slotDate);

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
                timeSlotInterval = ((options.majorTick/options.numberOfTimeSlots) * MS_PER_MINUTE);

            return startTime + timeSlotInterval * index;
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
                timeSlotInterval = ((options.majorTick/options.numberOfTimeSlots) * MS_PER_MINUTE);

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

        _calculateAllDayEventWidth: function(startIndex, endIndex) {
            var allDaySlots = this.element.find(".k-scheduler-header-all-day td"),
                result = 0,
                widthFunction = startIndex !== endIndex ? "outerWidth" : "innerWidth",
                idx,
                length;

            for (idx = 0, length = allDaySlots.length; idx < length; idx++) {
                if (idx >= startIndex && idx <= endIndex) {
                    result += allDaySlots.eq(idx)[widthFunction]();
                }
            }
            return result;
        },

        _positionAllDayEvent: function(element, slots, startIndex, endIndex) {
            var dateSlot = slots.eq(startIndex),
                slotWidth = this._calculateAllDayEventWidth(startIndex, endIndex),
                allDayEvents = SchedulerView.collidingEvents(this.datesHeader.find(".k-event"), startIndex, endIndex).add(element),
                top = dateSlot.position().top,
                currentColumnCount = this._headerColumnCount || 0,
                leftOffset = 2,
                rightOffset = startIndex !== endIndex ? 5 : 4,
                eventHeight = this._allDayHeaderHeight;

            element
                .css({
                    left: dateSlot.position().left + leftOffset,
                    width: slotWidth - rightOffset
                });

            element.attr(kendo.attr("start-end-idx"), startIndex + "-" + endIndex);

            var columns = SchedulerView.createColumns(allDayEvents, true);

            for (var idx = 0, length = columns.length; idx < length; idx++) {
                var columnEvents = columns[idx].events;

                for (var j = 0, eventLength = columnEvents.length; j < eventLength; j++) {
                    $(columnEvents[j]).css({
                        top: top + idx * eventHeight
                    });
                }
            }

            if (columns.length && columns.length > currentColumnCount) {
                this._updateAllDayHeaderHeight(eventHeight * columns.length + eventHeight);
                this._headerColumnCount = columns.length;
            }
        },

        _arrangeColumns: function(element, dateSlotIndex, dateSlot) {
            var columns,
                eventRightOffset = 30,
                columnEvents,
                blockRange = SchedulerView.rangeIndex(element),
                eventElements = this.content.children(".k-event[" + kendo.attr("slot-idx") + "=" + dateSlotIndex + "]"),
                slotEvents = SchedulerView.collidingEvents(eventElements, blockRange.start, blockRange.end).add(element);

            columns = SchedulerView.createColumns(slotEvents);

            var columnWidth = (dateSlot.width() - eventRightOffset) / columns.length;

            for (var idx = 0, length = columns.length; idx < length; idx++) {
                columnEvents = columns[idx].events;

                for (var j = 0, eventLength = columnEvents.length; j < eventLength; j++) {
                    $(columnEvents[j]).css({
                        width: columnWidth - 4,
                        left: dateSlot[0].offsetLeft + idx * columnWidth + 2
                    });
                }
            }
        },

        _positionEvent: function(event, element, slots, dateSlotIndex, slotHeight) {
            var startIndex = Math.max(Math.floor(this._timeSlotIndex(event.start)), 0),
                endIndex = Math.min(Math.ceil(this._timeSlotIndex(event.end)), slots.length),
                bottomOffset = (slotHeight * 0.10),
                timeSlot = slots.eq(Math.floor(startIndex)),
                dateSlot = timeSlot.children().eq(dateSlotIndex);

            element.css({
                    height: slotHeight * (Math.ceil(endIndex - startIndex) || 1) - bottomOffset,
                    top: timeSlot.position().top + this.content[0].scrollTop
                });

            element.attr(kendo.attr("slot-idx"), dateSlotIndex);
            element.attr(kendo.attr("start-end-idx"), startIndex + "-" + endIndex);

            this._arrangeColumns(element, dateSlotIndex, dateSlot);
       },

       _eventTmpl: function(template) {
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

            var tmpl = kendo.template(kendo.format(EVENT_WRAPPER_STRING, html), settings);

            if (state.count > 0) {
                tmpl = proxy(tmpl, state.storage);
            }
            return tmpl;
       },

       _createEventElement: function(event, template) {
            var options = this.options,
                showDelete = options.editable && options.editable.destroy !== false,
                middle,
                head,
                tail;

            if (getDate(event.start) < getDate(this.startDate()) &&
                getDate(event.end) > getDate(this.endDate()).getTime() + MS_PER_DAY - 1) {
                middle = true;
            } else if (getDate(event.start) < getDate(this.startDate())) {
                tail = true;
            } else if (getDate(event.end) > getDate(this.endDate()).getTime() + MS_PER_DAY - 1) {
                head = true;
            }

            return $(template(extend({}, {
                ns: kendo.ns,
                showDelete: showDelete,
                middle: middle,
                head: head,
                tail: tail,
                resources: this.eventResources(event)
            }, event)));
        },

        _isInTimeSlot: function(event) {
            var slotStartTime = this.options.startTime,
                slotEndTime = this.options.endTime;

            return isInTimeRange(event.start, slotStartTime, slotEndTime) ||
                isInTimeRange(event.end, slotStartTime, slotEndTime) ||
                isInTimeRange(slotStartTime, event.start, event.end) ||
                isInTimeRange(slotEndTime, event.start, event.end);
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
            }
        },

        render: function(events) {
            var options = this.options,
                eventTemplate = this.eventTemplate,
                allDayEventTemplate = this.allDayEventTemplate,
                timeSlots = this.content.find("tr"),
                allDaySlots = this.element.find(".k-scheduler-header-all-day td"),
                allDayEventContainer = this.datesHeader.find(".k-scheduler-header-wrap"),
                slotHeight = Math.floor(this.content.find(">table:first").innerHeight() / timeSlots.length),
                eventTimeFormat = options.eventTimeFormat,
                event,
                idx,
                length;

            this._headerColumnCount = 0;
            this.element.find(".k-event").remove();

            this._updateAllDayHeaderHeight(this._allDayHeaderHeight);

            events = new kendo.data.Query(events).sort([{ field: "start", dir: "asc" },{ field: "end", dir: "desc" }]).toArray();

            for (idx = 0, length = events.length; idx < length; idx++) {
                event = events[idx];

                if (this._isInDateSlot(event)) {
                   var dateSlotIndex = this._dateSlotIndex(event.start),
                       endDateSlotIndex = this._dateSlotIndex(event.end),
                       isOneDayEvent = !event.isAllDay && event.end.getTime() - event.start.getTime() < MS_PER_DAY,
                       container = isOneDayEvent ? this.content : allDayEventContainer,
                       element = this._createEventElement(event, isOneDayEvent ? eventTemplate : allDayEventTemplate);

                   if (isOneDayEvent) {

                       if (this._isInTimeSlot(event)) {

                           if (dateSlotIndex === -1 && endDateSlotIndex > -1) {
                               dateSlotIndex = endDateSlotIndex;
                           }

                           this._positionEvent(event, element, timeSlots, dateSlotIndex, slotHeight, eventTimeFormat);

                           element.appendTo(container);
                       }

                   } else {
                       if (dateSlotIndex < 0) {
                           dateSlotIndex = 0;
                       }

                       if (endDateSlotIndex < 0) {
                           endDateSlotIndex = allDaySlots.length - 1;
                       }

                       this._positionAllDayEvent(element, allDaySlots, dateSlotIndex, endDateSlotIndex);

                       element.appendTo(container);
                   }
                }
            }

            if (events.length) {
                this.refreshLayout();
            }
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
                   start = new Date(selectedDate),
                   weekDay = selectedDate.getDay(),
                   dates = [],
                   idx, length;

               start.setDate(start.getDate() - weekDay);

               for (idx = 0, length = 7; idx < length; idx++) {
                   dates.push(new Date(+start));
                   kendo.date.setTime(start, MS_PER_DAY, true);
               }

               this._render(dates);
           }
       })
    });

})(window.kendo.jQuery);
