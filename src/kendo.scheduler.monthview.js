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
        keys = kendo.keys,
        SchedulerView = ui.SchedulerView,
        NS = ".kendoMonthView",
        extend = $.extend,
        proxy = $.proxy,
        getDate = kendo.date.getDate,
        MS_PER_DAY = kendo.date.MS_PER_DAY,
        NUMBER_OF_ROWS = 6,
        NUMBER_OF_COLUMNS = 7,
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

            that._renderLayout(that.options.date);

            that._slots();
        },

        select: function(selection) {
            var that = this;

            that.clearSelection();

            if (!that._selectEvents(selection.events)) {
                that._selectSlots(
                    that._slotIndex(selection.start),
                    that._slotIndex(selection.end),
                    that._row.slots
                );
            }
        },

        _selectEvents: function(events) {
            var found = false;
            var uidAttr = kendo.attr("uid");

            if (!events[0]) {
                return found;
            }

            var elements = this.table.find("[" + uidAttr + "=" + events.join("],[" + uidAttr + "=") + "]");
            if (elements.length == events.length) {
                found = true;
                elements.addClass("k-state-selected");
            }

            return found;
        },

        _selectSlots: function(startIndex, endIndex, slots) {
            var idx = startIndex;
            if (startIndex > endIndex) {
                startIndex =  endIndex;
                endIndex = idx;
            }

            for (idx = startIndex; idx <= endIndex; idx ++) {
                $(slots[idx].element).addClass("k-state-selected");
            }
        },

        clearSelection: function() {
            this.table.find(".k-state-selected").removeClass("k-state-selected");
        },

        move: function(selection, key, keep) {
            var handled = false,
                isInRange = true,
                date = selection.end;

            if (key == keys.LEFT) {
                date = kendo.date.addDays(date, -1);
                handled = true;
            } else if (key == keys.RIGHT) {
                date = kendo.date.addDays(date, 1);
                handled = true;
            } else if (key == keys.DOWN) {
                date = kendo.date.addDays(date, 7);
                handled = true;
            } else if (key == keys.UP) {
                date = kendo.date.addDays(date, -7);
                handled = true;
            }

            if (keep) {
                isInRange = this._isInDateSlot({start: date, end: date });
            }

            if (handled && isInRange) {
                if (!keep) {
                    selection.start = date;
                }
                selection.end = date;
                selection.events = [];
            }

            return handled;
        },

        moveToEvent: function(selection, prev) {
            var that = this,
                event,
                pad = prev ? -1 : 1,
                startSlotIndex = that._slotIndex(selection.start),
                events = that._row.events,
                idx = eventIndex(events, selection.events),
                slots = that._row.slots,
                length = events.length;


            if (prev) {
                if (idx < 0) {
                    for (idx = 0; idx < length; idx ++) {
                        if (events[idx].start < startSlotIndex) {
                            event = events[idx];
                        } else {
                            break;
                        }
                    }
                } else {
                    for (idx += pad; idx > -1; idx --) {
                        if (events[idx].start <= startSlotIndex) {
                            event = events[idx];
                            break;
                        }
                    }
                }
            } else {
                for (idx += pad; idx < length; idx ++) {
                    if (events[idx].start >= startSlotIndex) {
                        event = events[idx];
                        break;
                    }
                }
            }

            if (event) {
                selection.events = [ event.element.attr(kendo.attr("uid")) ];
                selection.start = slots[event.start].start;
                selection.end = slots[event.end].end;
            }

            return event;
        },

        moveSelectionToPeriod: function(selection) {
            var date = new Date(selection.start);
            var lastDayOfMonth = this._lastDayOfMonth;
            var month = lastDayOfMonth.getMonth();

            date.setFullYear(lastDayOfMonth.getFullYear(), month);
            if (date.getMonth() != month) {
                date = new Date(lastDayOfMonth);
            }

            selection.start = selection.end = date;
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

               e.preventDefault();
               that.trigger("navigate", { view: "day", date: slot.start });
            });
        },

        _editable: function() {
            if (this.options.editable) {
                if (kendo.support.mobileOS) {
                    this._touchEditable();
                } else {
                    this._mouseEditable();
                }

            }
        },

        _mouseEditable: function() {
            var that = this;
            that.element.on("click" + NS, ".k-scheduler-monthview .k-event a:has(.k-si-close)", function(e) {
                that.trigger("remove", { uid: $(this).closest(".k-event").attr(kendo.attr("uid")) });
                e.preventDefault();
            });

            if (that.options.editable.create !== false) {
                that.element.on("dblclick" + NS, ".k-scheduler-monthview .k-scheduler-content td", function(e) {
                    var offset = $(e.currentTarget).offset();
                    var slot = that._slotByPosition(offset.left, offset.top);
                    var resourceInfo = that._resourceBySlot(slot);

                    that.trigger("add", { eventInfo: extend({ isAllDay: true, start: slot.start, end: slot.end }, resourceInfo ) });
                    e.preventDefault();
                });
            }

            if (that.options.editable.update !== false) {
                that.element.on("dblclick" + NS, ".k-scheduler-monthview .k-event", function(e) {
                    that.trigger("edit", { uid: $(this).closest(".k-event").attr(kendo.attr("uid")) });
                    e.preventDefault();
                });
            }
        },

        _touchEditable: function() {
            var that = this;

            that._closeUserEvents = new kendo.UserEvents(that.element, {
               filter: ".k-scheduler-monthview .k-event a:has(.k-si-close)",
               tap: function(e) {
                    that.trigger("remove", { uid: $(e.target).closest(".k-event").attr(kendo.attr("uid")) });
                    e.preventDefault();
               }
            });

            if (that.options.editable.create !== false) {
                that._addUserEvents = new kendo.UserEvents(that.element, {
                    filter: ".k-scheduler-monthview .k-scheduler-content td",
                    tap: function(e) {
                        var offset = $(e.target).offset();
                        var slot = that._slotByPosition(offset.left, offset.top);
                        var resourceInfo = that._resourceBySlot(slot);

                        that.trigger("add", { eventInfo: extend({ isAllDay: true, start: slot.start, end: slot.end }, resourceInfo ) });
                        e.preventDefault();
                    }
                });
            }

            if (that.options.editable.update !== false) {
                that._editUserEvents = new kendo.UserEvents(that.element, {
                    filter:  ".k-scheduler-monthview .k-event.k-state-selected",
                    tap: function(e) {
                        if ($(e.event.target).closest("a:has(.k-si-close)").length === 0) {
                            that.trigger("edit", { uid: $(e.target).closest(".k-event").attr(kendo.attr("uid")) });
                            e.preventDefault();
                        }
                    }
                });
            }
        },

        slotByCell: function(cell) {
            var offset = $(cell).offset();
            return this._slotByPosition(offset.left, offset.top);
        },

        _columnCountForLevel: function(level) {
            var columnLevel = this.columnLevels[level];
            return columnLevel ? columnLevel.length : 0;
        },

        _rowCountForLevel: function(level) {
            var rowLevel = this.rowLevels[level];
            return rowLevel ? rowLevel.length : 0;
        },

        _content: function() {
            var html = '<tbody>';
            var verticalGroupCount = 1;

            var resources = this.groupedResources;

            if (resources.length) {
                if (this._isVerticallyGrouped()) {
                    verticalGroupCount = this._rowCountForLevel(resources.length - 1);
                }
            }

            for (var verticalGroupIdx = 0; verticalGroupIdx < verticalGroupCount; verticalGroupIdx++) {
                html += this._createCalendar();
            }

            html += "</tbody>";

            this.content.find("table").html(html);
        },

        _createCalendar: function() {
            var start = this.startDate();
            var cellCount = NUMBER_OF_COLUMNS*NUMBER_OF_ROWS;
            var cellsPerRow = NUMBER_OF_COLUMNS;
            var weekStartDates = [start];
            var html = '';
            var horizontalGroupCount = 1;

            var resources = this.groupedResources;

            if (resources.length) {
                if (!this._isVerticallyGrouped()) {
                    horizontalGroupCount = this._columnCountForLevel(resources.length - 1);
                }
            }

            this._slotIndices = {};

            for (var rowIdx = 0; rowIdx < cellCount / cellsPerRow; rowIdx++) {
                html += "<tr>";

                weekStartDates.push(start);

                var startIdx = rowIdx*cellsPerRow;

                for (var groupIdx = 0; groupIdx < horizontalGroupCount; groupIdx++) {
                    html += this._createRow(start, startIdx, cellsPerRow);
                }

                start = kendo.date.addDays(start, cellsPerRow);

                html += "</tr>";
            }

            this._weekStartDates = weekStartDates;
            this._endDate = kendo.date.previousDay(start);

            return html;
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
            var rows;

            if (resources.length) {
                if (this._isVerticallyGrouped()) {
                    rows = this._createRowsLayout(resources);
                } else {
                    columns = this._createColumnsLayout(resources, columns);
                }
            }

            return {
                columns: columns,
                rows: rows
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

                if (currentSlot.groupIndex != startSlot.groupIndex) {
                    continue;
                }

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
                endSlotIndex = NUMBER_OF_COLUMNS * NUMBER_OF_ROWS - 1;
                tail = true;
            }

            startSlotIndex = this._applyOffset(startSlotIndex, currentSlot.groupIndex);
            endSlotIndex = this._applyOffset(endSlotIndex, currentSlot.groupIndex);

            var startSlot = slots[startSlotIndex];
            var endSlot = slots[endSlotIndex];

            var slotGroup = {
               startSlot: startSlot,
               endSlot: endSlot
            };

            var slotGroups = [slotGroup];

            for (var slotIndex = startSlot.index; slotIndex <= endSlot.index; slotIndex++) {
                var slot = slots[slotIndex];

                if (slot.groupIndex != currentSlot.groupIndex) {
                    continue;
                }

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

            for (var idx = 0, length = cells.length; idx < length; idx++) {
                var cell = cells[idx];
                var clientHeight = cell.clientHeight;
                var firstChildHeight = cell.firstChild.offsetHeight + 3;

                var groupIndex = this._groupIndex(idx);
                var originalIndex = this._removeOffset(idx, groupIndex);

                var start = kendo.date.addDays(this.startDate(), originalIndex);

                row.slots.push({
                   clientWidth: cell.clientWidth,
                   clientHeight: clientHeight,
                   offsetWidth: cell.offsetWidth,
                   offsetTop: cell.offsetTop,
                   firstChildHeight: firstChildHeight,
                   offsetLeft: cell.offsetLeft,
                   eventCount: Math.floor((clientHeight - firstChildHeight) / (eventHeight + 3)),
                   start: start,
                   end: start,
                   element: cell,
                   isAllDay: true,
                   index: idx,
                   groupIndex: groupIndex
                });
            }

            this._row = row;
        },

        render: function(events) {
            this.content.children(".k-event,.k-more-events").remove();

            this._slots();

            events = new kendo.data.Query(this._splitEvents(events)).sort([{ field: "start", dir: "asc" },{ field: "end", dir: "desc" }]).toArray();

            var resources = this.groupedResources;
            if (resources.length) {
                this._renderGroups(events, resources, 0, 1);
            } else {
                this._renderEvents(events, 0);
            }

            this.trigger("render");
            this.refreshLayout();
       },

       _renderEvents: function(events, groupIndex) {
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
                        endSlotIndex = (this._row.slots.length/this._groupCount()) - 1;
                    }

                    event.startIndex = this._applyOffset(startSlotIndex, groupIndex);
                    event.endIndex = this._applyOffset(endSlotIndex, groupIndex);

                    this._positionEvent(this._row.slots, this._createEventElement(event), event.startIndex, event.endIndex);
                }
            }
        },

        _renderGroups: function(events, resources, offset, columnLevel) {
            var resource = resources[0];

            if (resource) {
                var view = resource.dataSource.view();

                for (var itemIdx = 0; itemIdx < view.length; itemIdx++) {
                    var value = resourceValue(resource, view[itemIdx]);

                    var tmp = new kendo.data.Query(events).filter({ field: resource.field, operator: arrayEqFilter, value: value }).toArray();

                    if (resources.length > 1) {
                        offset = this._renderGroups(tmp, resources.slice(1), offset++, columnLevel + 1);
                    } else {
                        this._renderEvents(tmp, offset++);
                    }
                }
            }
            return offset;
        },

        _groupCount: function() {
            var resources = this.groupedResources;

            if (resources.length) {
                if (this._isVerticallyGrouped()) {
                    return this._rowCountForLevel(resources.length - 1);
                } else {
                    return this._columnCountForLevel(resources.length) / this._columnOffsetForResource(resources.length);
                }
            }
            return 1;
        },

        _removeOffset: function(slotIndex, groupIndex) {
            var resources = this.groupedResources;
            var offset = 0;

            if (resources.length) {
                if (this._isVerticallyGrouped()) {
                    offset = NUMBER_OF_COLUMNS * NUMBER_OF_ROWS * groupIndex;
                } else {
                    var columnCount = this._columnOffsetForResource(resources.length);
                    var groupCount = this._groupCount();
                    var cellsPerRow = columnCount * groupCount;
                    var rowIndex = Math.floor(slotIndex / cellsPerRow);
                    offset = (columnCount * (groupCount - 1) * rowIndex);
                    offset += columnCount * groupIndex;
                }
            }

            return slotIndex - offset;
        },

        _applyOffset: function(slotIndex, groupIndex) {
            var resources = this.groupedResources;
            var offset = 0;
            var cellsPerRow = NUMBER_OF_COLUMNS;
            var rowCount = NUMBER_OF_ROWS;

            if (resources.length) {
                if (this._isVerticallyGrouped()) {
                    offset = cellsPerRow * rowCount * groupIndex;
                } else {
                    var rowIndex = Math.floor(slotIndex / cellsPerRow);
                    var columnCount = this._columnOffsetForResource(resources.length);
                    offset = (columnCount * (this._groupCount() - 1) * rowIndex);
                    offset += columnCount * groupIndex;
                }
            }

            return slotIndex + offset;
        },

        _groupIndex: function(slotIndex) {
            var resources = this.groupedResources;
            if (resources.length) {
                if (this._isVerticallyGrouped()) {
                    return Math.floor(slotIndex / (NUMBER_OF_COLUMNS * NUMBER_OF_ROWS));
                } else {
                    var columnCount = this._columnOffsetForResource(resources.length);
                    var groupCount = this._groupCount();
                    var cellsPerRow = columnCount * groupCount;
                    var rowIndex = Math.floor(slotIndex / cellsPerRow);
                    var offset = (columnCount * groupCount * rowIndex);

                    return Math.floor((slotIndex - offset) / columnCount);
                }
            }
            return 0;
        },

        _columnOffsetForResource: function(index) {
            return this._columnCountForLevel(index) / this._columnCountForLevel(index - 1);
        },

        _resourceBySlot: function(slot) {
            var resources = this.groupedResources;
            var result = {};

            if (resources.length) {
                var index = slot.index;
                var cellsInGroup = this._columnOffsetForResource(resources.length);

                if (this._isVerticallyGrouped()) {
                    cellsInGroup = NUMBER_OF_ROWS * NUMBER_OF_COLUMNS;
                }

                var cellsPerRow = cellsInGroup * this._groupCount();

                for (var idx = 0, length = resources.length; idx < length; idx++) {
                    var resource = resources[idx];

                    var groupCount = resource.dataSource.view().length;
                    var columnCount = cellsPerRow / groupCount;

                    var rowIndex = Math.floor(index / cellsPerRow);
                    var offset = (columnCount * groupCount * rowIndex);
                    var groupIndex = Math.floor((index - offset) / columnCount);

                    cellsPerRow /= groupCount;

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

            if (kendo.support.mobileOS) {
                this._closeUserEvents.destroy();

                if (this.options.editable.create !== false) {
                    this._addUserEvents.destroy();
                }

                if (this.options.editable.update !== false) {
                    this._editUserEvents.destroy();
                }
            }
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

    function resourceValue(resource, item) {
        if (resource.valuePrimitive) {
            item = kendo.getter(resource.dataValueField)(item);
        }
        return item;
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

    function eventIndex(events, selected) {
        if (!selected || !selected.length) {
            return -1;
        }

        selected = selected[selected.length - 1];

        events = $.map(events, function(item) { return item.element.attr(kendo.attr("uid")); });

        return $.inArray(selected, events);
    }


})(window.kendo.jQuery);
