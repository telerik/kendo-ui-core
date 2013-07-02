kendo_module({
    id: "scheduler.monthview",
    name: "Scheduler Month View",
    category: "web",
    description: "The Scheduler Month View",
    depends: [ "scheduler.view" ]
});

(function($){
    var kendo = window.kendo,
        ui = kendo.ui,
        SchedulerView = ui.SchedulerView,
        NS = ".kendoMonthView",
        extend = $.extend,
        proxy = $.proxy,
        getDate = kendo.date.getDate,
        MS_PER_DAY = kendo.date.MS_PER_DAY,
        DAY_TEMPLATE = kendo.template('<span class="k-link k-nav-day">#=kendo.toString(date, "dd")#</span>'),
        EVENT_WRAPPER_STRING = '<div class="k-event" data-#=ns#uid="#=uid#"' +
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
                    '#}#' +
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
                '</div>',
        EVENT_TEMPLATE = kendo.template('<div title="#=title#">' +
                    '<dl><dd>#:title#</dd></dl>' +
                '</div>');

    var MORE_BUTTON_TEMPLATE = kendo.template(
        '<div style="width:#=width#px;left:#=left#px;top:#=top#px" class="k-more-events k-button"><span>...</span></div>'
    );

    ui.MonthView = SchedulerView.extend({
        init: function(element, options) {
            var that = this;

            SchedulerView.fn.init.call(that, element, options);

            that.title = that.name = that.options.title;

            that._templates();

            that._editable();

            that._renderLayout(that.options.date);

            that._slots();
        },

        _templates: function() {
            var options = this.options,
                settings = extend({}, kendo.Template, options.templateSettings);

            this.eventTemplate = this._eventTmpl(options.eventTemplate);
            this.dayTemplate = kendo.template(options.dayTemplate, settings);
        },

        dateForTitle: function() {
            return kendo.format(this.options.selectedDateFormat, this._firstDayOfMonth, this._lastDayOfMonth);
        },

        nextDate: function() {
            return kendo.date.nextDay(this._lastDayOfMonth);
        },

        previousDate: function() {
            return kendo.date.previousDay(this._firstDayOfMonth);
        },

        startDate: function() {
            return this._startDate;
        },

        endDate: function() {
            return this._endDate;
        },

        _renderLayout: function(date) {
            var that = this;

            this._firstDayOfMonth = kendo.date.firstDayOfMonth(date);

            this._lastDayOfMonth = kendo.date.lastDayOfMonth(date);

            this._startDate = firstVisibleMonthDay(date);

            this.createLayout(this._layout());

            this.table.addClass("k-scheduler-monthview");

            this._content();

            this.refreshLayout();

            this.content.on("click" + NS, ".k-nav-day,.k-more-events", function(e) {
               var offset = $(e.currentTarget).offset();
               var slot = that._slotByPosition(offset.left, offset.top);

               that.trigger("navigate", { view: "day", date: slot.start });
            });
        },

        _editable: function() {
            var that = this;
            if (that.options.editable) {

                that.element.on("click" + NS, ".k-scheduler-monthview .k-event a:has(.k-si-close)", function(e) {
                    that.trigger("remove", { uid: $(this).closest(".k-event").attr(kendo.attr("uid")) });
                    e.preventDefault();
                });

                if (that.options.editable.create !== false) {
                    that.element.on("dblclick" + NS, ".k-scheduler-monthview .k-scheduler-content td", function(e) {
                        var element = $(this);
                        that.trigger("add", { eventInfo: extend({ isAllDay: true }, that._rangeToDates(element)) });
                        e.preventDefault();
                    });
                }

                if (that.options.editable.update !== false) {
                    that.element.on("dblclick" + NS, ".k-scheduler-monthview .k-event", function(e) {
                        that.trigger("edit", { uid: $(this).closest(".k-event").attr(kendo.attr("uid")) });
                        e.preventDefault();
                    });
                }
            }
        },

        _rangeToDates: function(cell) {
            var index = this.content.find("table td").index(cell),
                slotDate = kendo.date.addDays(this.startDate(), index);

            if (slotDate) {
                 return {
                    start: slotDate,
                    end: new Date(slotDate)
                };
            }
            return null;
        },

        _content: function() {
            var start = this.startDate(),
                min = this._firstDayOfMonth,
                max = this._lastDayOfMonth,
                idx = 0,
                length = 42,
                cellsPerRow = 7,
                content = this.dayTemplate,
                classes = "",
                slotIndices = {},
                weekStartDates = [start],
                html = '<tbody><tr>';


            for(; idx < length; idx++) {
                if (idx > 0 && idx % cellsPerRow === 0) {
                    weekStartDates.push(start);

                    html += '</tr><tr>';
                }

                classes = "";

                if (kendo.date.isToday(start)) {
                    classes += "k-today";
                }

                if (!kendo.date.isInDateRange(start, min, max)) {
                    classes += " k-other-month";
                }

                html += "<td ";

                if (classes !== "") {
                    html += 'class="' + classes + '"';
                }

                html += ">";
                html += content({ date: start });
                html += "</td>";

                slotIndices[getDate(start).getTime()] = idx;

                start = kendo.date.nextDay(start);
            }

            html += "</tr></tbody>";

            this._slotIndices = slotIndices;
            this._weekStartDates = weekStartDates;
            this._endDate = kendo.date.previousDay(start);
            this.content.find("table").html(html);
        },

        _layout: function() {
            var names = getCalendarInfo().days.names;

            return {
                columns: $.map(names, function(value) { return { text: value }; })
            };
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

       _createEventElement: function(event) {
            var options = this.options;

            event.showDelete = options.editable && options.editable.destroy !== false;
            event.ns = kendo.ns;
            event.resources = this.eventResources(event);

            return $(this.eventTemplate(event));
        },

        _isInDateSlot: function(event) {
            var slotStart = this.startDate(),
                slotEnd = new Date(this.endDate().getTime() + MS_PER_DAY - 1);

            return isInDateRange(event.start, slotStart, slotEnd) ||
                isInDateRange(event.end, slotStart, slotEnd) ||
                isInDateRange(slotStart, event.start, event.end) ||
                isInDateRange(slotEnd, event.start, event.end);
        },

        _slotIndex: function(date) {
            return this._slotIndices[getDate(date).getTime()];
        },

        _calculateAllDayEventWidth: function(slots, startIndex, endIndex) {
            var result = 0;
            var width = startIndex == endIndex ? "clientWidth" : "offsetWidth";

            for (var idx = startIndex; idx <= endIndex; idx++) {
                result += slots[idx][width];
            }

            return result;
        },

        _positionEvent: function(slots, element, startIndex, endIndex) {
            var eventHeight = this.options.eventHeight;
            var startSlot = slots[startIndex];
            var eventCount = startSlot.eventCount;
            var events = SchedulerView.collidingHorizontallyEvents(this._row.events, startIndex, endIndex);
            var rightOffset = startIndex !== endIndex ? 5 : 4;

            events.push({element: element, start: startIndex, end: endIndex });

            var rows = SchedulerView.createRows(events);

            for (var idx = 0, length = Math.min(rows.length, eventCount); idx < length; idx++) {
                var rowEvents = rows[idx].events;
                var eventTop = startSlot.offsetTop + startSlot.firstChildHeight + idx * eventHeight + 3 * idx + "px";

                for (var j = 0, eventLength = rowEvents.length; j < eventLength; j++) {
                    rowEvents[j].element[0].style.top = eventTop;
                }
            }

            if (rows.length > eventCount) {
                if (startSlot.more) {
                   return;
                }

                startSlot.more = element = $(MORE_BUTTON_TEMPLATE({
                    ns: kendo.ns,
                    start: startIndex,
                    end: endIndex,
                    width: startSlot.clientWidth - 2,
                    left: startSlot.offsetLeft,
                    top: startSlot.offsetTop + startSlot.firstChildHeight + eventCount * eventHeight + 3 * eventCount
                }));
            } else {
                this._row.events.push({element: element, start: startIndex, end: endIndex });

                element[0].style.width = this._calculateAllDayEventWidth(slots, startIndex, endIndex) - rightOffset + "px";
                element[0].style.left = startSlot.offsetLeft + "px";
                element[0].style.height = eventHeight + "px";
            }

            this.content[0].appendChild(element[0]);
        },

        _splitEvents: function(events) {
            var result = [],
                idx,
                event,
                weekStartDates = this._weekStartDates,
                eventDurationInDays,
                weekStart,
                length;

            for (idx = 0, length = events.length; idx < length; idx++) {
                event = extend({}, events[idx]);

                for (var dateIdx = 0, dateLength = weekStartDates.length; dateIdx < dateLength; dateIdx++) {
                    weekStart = weekStartDates[dateIdx];
                    eventDurationInDays = Math.ceil((event.end - event.start) / MS_PER_DAY);

                    if (isInDateRange(weekStart, event.start, event.end) && eventDurationInDays >= 1) {
                        if (getDate(event.start).getTime() === getDate(weekStart).getTime()) {
                            if (eventDurationInDays > 1) {
                                if (event.tail) {
                                    event.tail = false;
                                    event.middle = true;
                                } else {
                                    event.head = true;
                                }
                            }
                        } else {
                            var tmp = extend({}, event);

                            if (event.tail) {
                                event.tail = false;
                                tmp.middle = true;
                            } else {
                                tmp.head = true;
                            }

                            tmp.start = event.start;
                            tmp.end = kendo.date.previousDay(weekStart);
                            result.push(tmp);

                            event.start = weekStart;
                            event.head = false;

                            if (getDate(event.end).getTime() > getDate(this.endDate()).getTime() + MS_PER_DAY - 1) {
                                event.middle = true;
                            } else {
                                event.tail = true;
                            }
                            event.end = event.end;
                        }
                    }
                }

                result.push(event);
            }

            return result;
        },

       _slotByPosition: function(x, y) {
           var offset = this.content.offset();

           x -= offset.left;
           y -= offset.top;
           y += this.content[0].scrollTop;
           x += this.content[0].scrollLeft;

           var slots = this._row.slots;

           for (var slotIndex = 0; slotIndex < slots.length; slotIndex++) {
               var slot = slots[slotIndex];

               if (y >= slot.offsetTop && y <= slot.offsetTop + slot.clientHeight &&
                   x >= slot.offsetLeft && x < slot.offsetLeft + slot.clientWidth) {
                   return slot;
               }
           }
       },

       _slots: function() {
            var row = {
                slots: [],
                events: []
            };

            var cells = this.content[0].getElementsByTagName("td");
            var eventHeight = this.options.eventHeight;
            var scrollTop = this.content[0].scrollTop;

            for (var idx = 0, length = cells.length; idx < length; idx++) {
                var cell = cells[idx];
                var clientHeight = cell.clientHeight;
                var firstChildHeight = cell.firstChild.offsetHeight + 3;

                row.slots.push({
                   clientWidth: cell.clientWidth,
                   clientHeight: clientHeight,
                   offsetWidth: cell.offsetWidth,
                   offsetTop: cell.offsetTop,
                   firstChildHeight: firstChildHeight + scrollTop,
                   offsetLeft: cell.offsetLeft + 2,
                   eventCount: Math.floor((clientHeight - firstChildHeight) / (eventHeight + 3)),
                   start: kendo.date.addDays(this.startDate(), idx),
                   element: cell
                });
            }

            this._row = row;
        },

        render: function(events) {
            var event;
            var idx;
            var length;

            this.content.children(".k-event,.k-more-events").remove();

            this._slots();

            events = new kendo.data.Query(this._splitEvents(events)).sort([{ field: "start", dir: "asc" },{ field: "end", dir: "desc" }]).toArray();

            for (idx = 0, length = events.length; idx < length; idx++) {
                event = events[idx];

                if (this._isInDateSlot(event)) {
                    var startSlotIndex = this._slotIndex(event.start);
                    var endSlotIndex = this._slotIndex(event.end);

                    if (startSlotIndex < 0 && endSlotIndex > -1) {
                        startSlotIndex = endSlotIndex;
                    }

                    if (startSlotIndex < 0) {
                        startSlotIndex = 0;
                    }

                    if (endSlotIndex < 0 || !endSlotIndex) {
                        endSlotIndex = this._row.slots.length - 1;
                    }

                    event.startIndex = startSlotIndex;
                    event.endIndex = endSlotIndex;

                    this._positionEvent(this._row.slots, this._createEventElement(event), startSlotIndex, endSlotIndex);

                }
            }
        },

        destroy: function(){
            if (this.table) {
                this.table.removeClass("k-scheduler-monthview");
            }

            if (this.content) {
                this.content.off(NS);
            }

            if (this.element) {
                this.element.off(NS);
            }

            SchedulerView.fn.destroy.call(this);
        },

        events: ["remove", "add", "edit", "navigate"],

        options: {
            title: "Month",
            name: "month",
            eventHeight: 25,
            editable: true,
            selectedDateFormat: "{0:y}",
            dayTemplate: DAY_TEMPLATE,
            eventTemplate: EVENT_TEMPLATE
        }
    });

    function getCalendarInfo() {
        return kendo.culture().calendars.standard;
    }

    function firstVisibleMonthDay(date) {
        var calendarInfo = getCalendarInfo();

        var firstDay = calendarInfo.firstDay,
            firstVisibleDay = new Date(date.getFullYear(), date.getMonth(), 0, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());

        while (firstVisibleDay.getDay() != firstDay) {
            kendo.date.setTime(firstVisibleDay, -1 * MS_PER_DAY);
        }

        return firstVisibleDay;
    }

    function isInDateRange(value, min, max) {
        var msMin = min.getTime(),
            msMax = max.getTime(),
            msValue;

        msValue = value.getTime();

        return msValue >= msMin && msValue <= msMax;
    }

})(window.kendo.jQuery);
