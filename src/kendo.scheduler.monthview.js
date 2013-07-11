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
                '# if(resizable && !data.tail && !data.middle) {#' +
                '<span class="k-resize-handle k-resize-w"></span>' +
                '#}#' +
                '# if(resizable && !data.head && !data.middle) {#' +
                '<span class="k-resize-handle k-resize-e"></span>' +
                '#}#' +
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

            that._resourcesForGroups();

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

        _columnCountForLevel: function(level) {
            var columnLevel = this.columnLevels[level];
            return columnLevel ? columnLevel.length : 0;
        },

        _content: function() {
            var start = this.startDate();
            var cellCount = 42;
            var cellsPerRow = 7;
            var weekStartDates = [start];
            var html = '<tbody>';
            var groupCount = 1;

            var resources = this.groupedResources;

            if (resources.length) {
                groupCount = this._columnCountForLevel(resources.length - 1);
            }

            this._slotIndices = {};

            for (var rowIdx = 0; rowIdx < cellCount / cellsPerRow; rowIdx++) {
                html += "<tr>";

                weekStartDates.push(start);

                var startIdx = rowIdx*cellsPerRow;

                for (var groupIdx = 0; groupIdx < groupCount; groupIdx++) {
                    html += this._createRow(start, startIdx, cellsPerRow);
                }

                start = kendo.date.addDays(start, cellsPerRow);

                html += "</tr>";
            }

            html += "</tbody>";

            this._weekStartDates = weekStartDates;
            this._endDate = kendo.date.previousDay(start);
            this.content.find("table").html(html);
        },

        _createRow: function(startDate, startIdx, cellsPerRow) {
            var min = this._firstDayOfMonth;
            var max = this._lastDayOfMonth;
            var content = this.dayTemplate;
            var classes = "";
            var html = "";

            for (var cellIdx = 0; cellIdx < cellsPerRow; cellIdx++) {
                classes = "";

                if (kendo.date.isToday(startDate)) {
                    classes += "k-today";
                }

                if (!kendo.date.isInDateRange(startDate, min, max)) {
                    classes += " k-other-month";
                }

                html += "<td ";

                if (classes !== "") {
                    html += 'class="' + classes + '"';
                }

                html += ">";
                html += content({ date: startDate });
                html += "</td>";

                this._slotIndices[getDate(startDate).getTime()] = startIdx + cellIdx;

                startDate = kendo.date.nextDay(startDate);
            }

            return html;
        },

        _layout: function() {
            var names = getCalendarInfo().days.names;
            var columns = $.map(names, function(value) { return { text: value }; });
            var resources = this.groupedResources;

            if (resources.length) {
                columns = this._createColumnsLayout(resources, columns);
            }


            return {
                columns: columns
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
            var editable = options.editable;

            event.showDelete = editable && editable.destroy !== false;
            event.resizable = editable && editable.resize !== false;
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
                    left: startSlot.offsetLeft + 2,
                    top: startSlot.offsetTop + startSlot.firstChildHeight + eventCount * eventHeight + 3 * eventCount
                }));
            } else {
                this._row.events.push({element: element, start: startIndex, end: endIndex });

                element[0].style.width = this._calculateAllDayEventWidth(slots, startIndex, endIndex) - rightOffset + "px";
                element[0].style.left = startSlot.offsetLeft + 2 + "px";
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

           x = Math.ceil(x);
           y = Math.ceil(y);

           var slots = this._row.slots;

           for (var slotIndex = 0; slotIndex < slots.length; slotIndex++) {
               var slot = slots[slotIndex];

               if (y >= slot.offsetTop && y <= slot.offsetTop + slot.clientHeight &&
                   x >= slot.offsetLeft && x < slot.offsetLeft + slot.clientWidth) {
                   return slot;
               }
           }
       },

       _createResizeHint: function(direction, startSlot, endSlot) {
            var left = startSlot.offsetLeft;

            var top = startSlot.offsetTop;

            var width = this._calculateAllDayEventWidth(this._row.slots, startSlot.index, endSlot.index);

            var height = startSlot.clientHeight - 2;

            var hint = SchedulerView.fn._createResizeHint.call(this, left, top, width, height);

            hint.appendTo(this.content);

            this._resizeHint = this._resizeHint.add(hint);
       },

        _updateResizeHint: function(direction, startSlot, endSlot) {
            var slots = this._row.slots;

            var slotGroup = {
               startSlot: startSlot,
               endSlot: endSlot
            };

            var slotGroups = [slotGroup];

            for (var slotIndex = startSlot.index; slotIndex <= endSlot.index; slotIndex++) {
                var currentSlot = slots[slotIndex];

                if (currentSlot.offsetTop > slotGroup.endSlot.offsetTop) {
                    slotGroup = {
                        startSlot: currentSlot,
                        endSlot: currentSlot
                    };
                    slotGroups.push(slotGroup);
                } else {
                    slotGroup.endSlot = currentSlot;
                }
            }

            this._removeResizeHint();

            for (var groupIndex = 0; groupIndex < slotGroups.length; groupIndex++) {
                slotGroup = slotGroups[groupIndex];
                this._createResizeHint(direction, slotGroup.startSlot, slotGroup.endSlot);
            }

            this._resizeHint.find(".k-label-top,.k-label-bottom").text("");

            this._resizeHint.first().find(".k-label-top").text(kendo.toString(startSlot.start, "M/dd"));

            this._resizeHint.last().find(".k-label-bottom").text(kendo.toString(endSlot.start, "M/dd"));
        },

       _updateMoveHint: function(event, initialSlot, currentSlot) {
            var slots = this._row.slots;

            var distance = currentSlot.start.getTime() - initialSlot.start.getTime();

            var duration = event.end.getTime() - event.start.getTime();

            var start = new Date(event.start.getTime());

            kendo.date.setTime(start, distance);

            var end = new Date(start.getTime());

            kendo.date.setTime(end, duration);

            var startSlotIndex = this._slotIndex(start);

            var head = false;

            var tail = false;

            if (startSlotIndex == null) {
                startSlotIndex = 0;
                head = true;
            }

            var endSlotIndex = this._slotIndex(end);

            if (endSlotIndex == null) {
                endSlotIndex = slots.length - 1;
                tail = true;
            }

            var startSlot = slots[startSlotIndex];
            var endSlot = slots[endSlotIndex];

            var slotGroup = {
               startSlot: startSlot,
               endSlot: endSlot
            };

            var slotGroups = [slotGroup];

            for (var slotIndex = startSlot.index; slotIndex <= endSlot.index; slotIndex++) {
                var slot = slots[slotIndex];

                if (slot.offsetTop > slotGroup.endSlot.offsetTop) {
                    slotGroup = {
                        startSlot: slot,
                        endSlot: slot
                    };
                    slotGroups.push(slotGroup);
                } else {
                    slotGroup.endSlot = slot;
                }
            }

            this._removeMoveHint();

            for (var groupIndex = 0; groupIndex < slotGroups.length; groupIndex++) {
                slotGroup = slotGroups[groupIndex];

                startSlot = slotGroup.startSlot;

                endSlot = slotGroup.endSlot;

                var hint = this._createEventElement($.extend({}, event, { head: head, tail: tail }));

                hint.css({
                    left: startSlot.offsetLeft + 2,
                    top: startSlot.offsetTop + startSlot.firstChildHeight,
                    height: this.options.eventHeight,
                    width: this._calculateAllDayEventWidth(this._row.slots, startSlot.index, endSlot.index) - (startSlot.index !== endSlot.index ? 5 : 4)
                });

                hint.addClass("k-event-drag-hint");

                hint.appendTo(this.content);
                this._moveHint = this._moveHint.add(hint);
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
                var start = kendo.date.addDays(this.startDate(), idx);

                row.slots.push({
                   clientWidth: cell.clientWidth,
                   clientHeight: clientHeight,
                   offsetWidth: cell.offsetWidth,
                   offsetTop: cell.offsetTop,
                   firstChildHeight: firstChildHeight + scrollTop,
                   offsetLeft: cell.offsetLeft,
                   eventCount: Math.floor((clientHeight - firstChildHeight) / (eventHeight + 3)),
                   start: start,
                   end: start,
                   element: cell,
                   isAllDay: true,
                   index: idx
                });
            }

            this._row = row;
        },

        render: function(events) {
            this.content.children(".k-event,.k-more-events").remove();

            this._slots();

            events = new kendo.data.Query(this._splitEvents(events)).sort([{ field: "start", dir: "asc" },{ field: "end", dir: "desc" }]).toArray();

            this._renderEvents(events);
       },

        _renderEvents: function(events) {
            var event;
            var idx;
            var length;

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

                    if ((endSlotIndex < 0 || !endSlotIndex) && startSlotIndex !== endSlotIndex) {
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
