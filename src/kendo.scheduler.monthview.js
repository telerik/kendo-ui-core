kendo_module({
    id: "scheduler.monthview",
    name: "Scheduler Month View",
    category: "web",
    description: "The Scheduler Month View",
    depends: [ "scheduler.view" ],
    hidden: true
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
                    '# if(data.isException()) {#' +
                        '<span class="k-icon k-i-exception"></span>' +
                    '# } else if(data.isRecurring()) {#' +
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
        EVENT_TEMPLATE = kendo.template('<div title="#=title.replace(/"/g,"&\\#34;")#">' +
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

            that._groups();
        },

        select: function(selection) {
            var that = this;

            that.clearSelection();

            if (!that._selectEvents(selection.events)) {
                that._selectSlots(
                    that._applyOffset(that._slotIndex(selection.start), selection.groupIndex),
                    that._applyOffset(that._slotIndex(selection.end), selection.groupIndex),
                    that._row.slots,
                    selection.groupIndex || 0
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
            if (elements.length > 0) {
                found = true;
                elements.addClass("k-state-selected");

                this._scrollTo(elements.last()[0], this.content[0]);
            }

            return found;
        },

        _selectSlots: function(startIndex, endIndex, slots, groupIndex) {
            var idx = startIndex;
            if (startIndex > endIndex) {
                startIndex =  endIndex;
                endIndex = idx;
            }

            for (idx = startIndex; idx <= endIndex; idx ++) {
                if (groupIndex === slots[idx].groupIndex) {
                    $(slots[idx].element).addClass("k-state-selected");
                }
            }

            if (slots[endIndex]) {
                this._scrollTo(slots[endIndex].element, this.content[0]);
            }
        },

        clearSelection: function() {
            this.table.find(".k-state-selected").removeClass("k-state-selected");
        },

        move: function(selection, key, keep) {
            var handled = false,
                date = selection.end,
                isInRange = true,
                result = {
                    date: date,
                    groupIndex: selection.groupIndex || 0
                },
                isGrouped = !keep && this.groupedResources.length,
                isVertical = this._isVerticallyGrouped(),
                groupCount = this._groupCount(),
                slotIndex = this._slotIndex(date);

            if (key == keys.LEFT) {
                if (!isGrouped) {
                    result.date = kendo.date.addDays(date, -1);
                } else if (!isVertical) {
                    result = moveLeftInHorizontalGroup(slotIndex, selection.groupIndex, groupCount, date);
                } else {
                    result = moveLeftInVerticalGroup(slotIndex, selection.groupIndex, groupCount, date);
                }

                handled = true;
            } else if (key == keys.RIGHT) {
                if (!isGrouped) {
                    result.date = kendo.date.addDays(date, 1);
                } else if (!isVertical) {
                    result = moveRightInHorizontalGroup(slotIndex, selection.groupIndex, groupCount, date);
                } else {
                    result = moveRightInVerticalGroup(slotIndex, selection.groupIndex, groupCount, date);
                }

                handled = true;
            } else if (key == keys.DOWN) {
                if (isGrouped && isVertical) {
                    result = moveDownInVerticalGroup(slotIndex, selection.groupIndex, groupCount, date);
                } else {
                    result.date = kendo.date.addDays(date, 7);
                }

                handled = true;
            } else if (key == keys.UP) {
                if (isGrouped && isVertical) {
                    result = moveUpInVerticalGroup(slotIndex, selection.groupIndex, groupCount, date);
                } else {
                    result.date = kendo.date.addDays(date, -7);
                }

                handled = true;
            }

            date = result.date;
            if (keep) {
                isInRange = this._isInDateSlot({start: date, end: date });
            }

            if (handled && isInRange) {
                if (!keep) {
                    selection.start = date;
                }
                selection.groupIndex = result.groupIndex;
                selection.end = date;
                selection.events = [];
            }

            return handled;
        },

        moveToEvent: function(selection, prev) {
            var that = this,
                event,
                pad = prev ? -1 : 1,
                groupIndex = selection.groupIndex || 0,
                startSlotIndex = that._applyOffset(that._slotIndex(selection.start), groupIndex),
                events = that._row.events,
                idx = eventIndex(events, selection.events, groupIndex),
                isGrouped = this.groupedResources.length,
                slots = that._row.slots,
                length = events.length;


            if (prev) {
                if (idx < 0 || (isGrouped && this._removeOffset(idx, groupIndex) === 0)) {
                    idx = isGrouped ? idx + 1 : 0;
                    for (; idx < length; idx ++) {
                        if (events[idx].start < startSlotIndex && events[idx].groupIndex == groupIndex) {
                            event = events[idx];
                        } else {
                            break;
                        }
                    }
                } else {
                    for (idx += pad; idx > -1; idx --) {
                        if (events[idx].groupIndex < groupIndex) {
                            event = events[idx];
                            break;
                        }

                        if (events[idx].start <= startSlotIndex) {
                            event = events[idx];
                            break;
                        }
                    }
                }
            } else {
                for (idx += pad; idx < length; idx ++) {
                    if (events[idx].groupIndex > groupIndex) {
                        event = events[idx];
                        break;
                    }

                    if (events[idx].start >= startSlotIndex &&
                        events[idx].element.attr(kendo.attr("uid")) != selection.events[0]) {

                        event = events[idx];
                        break;
                    }
                }
            }

            if (event) {
                selection.events = [ event.element.attr(kendo.attr("uid")) ];
                selection.start = slots[event.start].start;
                selection.end = slots[event.end].end;
                selection.groupIndex = this._groupIndex(event.start);
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

        selectionByElement: function(cell) {
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
                    var inner = []; //add hidden cells in order to sync the content rows
                    for (var idx = 0; idx < 6; idx++) {
                        inner.push({ text: "<div>&nbsp;</div>", className: "k-hidden k-slot-cell" });
                    }

                    rows = this._createRowsLayout(resources, inner);
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

        _positionEvent: function(slotRange, element) {
            var eventHeight = this.options.eventHeight;
            var startSlot = slotRange.start;
            var startIndex = slotRange.start.index;
            var endIndex = slotRange.end.index;
            var eventCount = startSlot.eventCount;
            var events = SchedulerView.collidingHorizontallyEvents(slotRange.events(), startIndex, endIndex);
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
                for (var slotIndex = startIndex; slotIndex <= endIndex; slotIndex++) {
                    var collection = slotRange.collection;

                    var slot = collection.at(slotIndex);

                    if (slot.more) {
                       return;
                    }

                    slot.more = $(MORE_BUTTON_TEMPLATE({
                        ns: kendo.ns,
                        start: slotIndex,
                        end: slotIndex,
                        width: slot.clientWidth - 2,
                        left: slot.offsetLeft + 2,
                        top: slot.offsetTop + slot.firstChildHeight + eventCount * eventHeight + 3 * eventCount
                    }));

                    this.content[0].appendChild(slot.more[0]);
                }
            } else {
                slotRange.addEvent({element: element, start: startIndex, end: endIndex, groupIndex: startSlot.groupIndex });

                element[0].style.width = slotRange.innerWidth() - rightOffset + "px";
                element[0].style.left = startSlot.offsetLeft + 2 + "px";
                element[0].style.height = eventHeight + "px";

                this.content[0].appendChild(element[0]);
            }
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
                                } else if (eventDurationInDays > 7){
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

                if (event.end > this.endDate()) {
                    event.head = true;
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

            var slots = this._row.slots;

            var hintWidth = function(startIndex, endIndex) {
                var result = 0;

                for (var slotIndex = startIndex; slotIndex < endIndex; slotIndex++) {
                    result += slots[slotIndex].offsetWidth;
                }

                result += slots[endIndex].clientWidth;

                return result;
            };

            var width = hintWidth(startSlot.index, endSlot.index);

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

            this._resizeHint.first().addClass("k-first").find(".k-label-top").text(kendo.toString(startSlot.start, "M/dd"));

            this._resizeHint.last().addClass("k-last").find(".k-label-bottom").text(kendo.toString(endSlot.start, "M/dd"));
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

            if (!event.isAllDay) {
                endSlot = slots[Math.max(startSlotIndex, endSlotIndex - 1)];
            }

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

       _groups: function() {
            var groupCount = this._groupCount();
            var columnCount =  NUMBER_OF_COLUMNS;
            var rowCount =  NUMBER_OF_ROWS;
            var that = this;

            var groups = [];

            for (var idx = 0; idx < groupCount; idx++) {
                var view = new ui.scheduler.ResourceView({
                    multiday: function(event) {
                        return true;
                    },
                    collectionIndex: function(date) {
                       return Math.floor(that._slotIndex(date) / columnCount);
                    },
                    slotIndex: function(date) {
                       return that._slotIndex(date) % columnCount;
                    }
                });

                groups.push(view);
            }

            this.groups = groups;

            var tableRows = this.content[0].getElementsByTagName("tr");

            for (var groupIndex = 0; groupIndex < groupCount; groupIndex++) {
                var cellCount = 0;
                var rowMultiplier = 0;

                if (this._isVerticallyGrouped()) {
                    rowMultiplier = groupIndex;
                }

                for (var rowIndex = rowMultiplier*rowCount; rowIndex < (rowMultiplier+1) *rowCount; rowIndex++) {
                    var collection = new kendo.ui.scheduler.SlotCollection();

                    var group = groups[groupIndex];
                    group.addDaySlotCollection(collection);

                    var cells = tableRows[rowIndex].children;
                    var cellMultiplier = 0;

                    if (!this._isVerticallyGrouped()) {
                        cellMultiplier = groupIndex;
                    }

                    for (var cellIndex = cellMultiplier * columnCount; cellIndex < (cellMultiplier + 1) * columnCount; cellIndex++) {
                        var cell = cells[cellIndex];

                        var clientHeight = cell.clientHeight;
                        var firstChildHeight = cell.firstChild.offsetHeight + 3;

                        var start = kendo.date.addDays(this.startDate(), cellCount);

                        cellCount ++;

                        collection.addSlot(new kendo.ui.scheduler.DaySlot({
                           clientWidth: cell.clientWidth,
                           clientHeight: clientHeight,
                           offsetWidth: cell.offsetWidth,
                           offsetTop: cell.offsetTop,
                           firstChildHeight: firstChildHeight,
                           offsetLeft: cell.offsetLeft,
                           eventCount: Math.floor((clientHeight - firstChildHeight) / (this.options.eventHeight + 3)),
                           start: start,
                           end: start,
                           element: cell,
                           isAllDay: true,
                           index: collection.count(),
                           groupIndex: groupIndex,
                           columnIndex: group.daySlotCollectionCount() - 1
                        }));
                    }
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

            this._groups();

            events = new kendo.data.Query(events).sort([{ field: "start", dir: "asc" },{ field: "end", dir: "desc" }]).toArray();

            var resources = this.groupedResources;
            if (resources.length) {
                this._renderGroups(events, resources, 0, 1);
            } else {
                this._renderEvents(events, 0);
            }

            this.refreshLayout();
            this.trigger("activate");
       },

       _renderEvents: function(events, groupIndex) {
            var event;
            var idx;
            var length;

            for (idx = 0, length = events.length; idx < length; idx++) {
                event = events[idx];

                if (this._isInDateSlot(event)) {
                    var group = this.groups[groupIndex];

                    var ranges = group.slotRanges(event);

                    var rangeCount = ranges.length;

                    for (var rangeIndex = 0; rangeIndex < rangeCount; rangeIndex++) {
                        var range = ranges[rangeIndex];
                        var start = event.start;
                        var end = event.end;
                        var head = false;
                        var tail = false;

                        if (rangeCount > 1) {
                            if (rangeIndex === 0) {
                                end = range.end.end;
                                head = true;
                            } else if (rangeIndex == rangeCount - 1) {
                                start = range.start.start;
                                tail = true;
                            } else {
                                head = true;
                                tail = true;
                                start = range.start.start;
                                end = range.end.end;
                            }
                        }

                        var occurrence = extend({}, event, { start: start, end: end });

                        this._positionEvent(range, this._createEventElement(occurrence));
                    }
                }
            }
        },

        _renderGroups: function(events, resources, offset, columnLevel) {
            var resource = resources[0];

            if (resource) {
                var view = resource.dataSource.view();

                for (var itemIdx = 0; itemIdx < view.length; itemIdx++) {
                    var value = resourceValue(resource, view[itemIdx]);

                    var tmp = new kendo.data.Query(events).filter({ field: resource.field, operator: SchedulerView.groupEqFilter(value) }).toArray();

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

    function eventIndex(events, selected, groupIndex) {
        if (!selected || !selected.length) {
            return firstEventIndex(events, groupIndex);
        }

        selected = selected[selected.length - 1];

        events = $.map(events, function(item) {
            return item.groupIndex == groupIndex && item.element.attr(kendo.attr("uid"));
        });

        return $.inArray(selected, events);
    }

    function firstEventIndex(events, groupIndex) {
        var idx = 0, length = events.length;

        for (; idx < length; idx ++) {
            if (events[idx].groupIndex == groupIndex) {
                return idx - 1;
            }
        }

        return -1;
    }

    function moveLeftInHorizontalGroup(slotIndex, groupIndex, groupCount, date) {
        if (slotIndex % NUMBER_OF_COLUMNS === 0) {
            if (groupIndex === 0) {
                date = kendo.date.addDays(date, -1);
                groupIndex = groupCount - 1;
            } else {
                date = kendo.date.addDays(date, 6);
                groupIndex --;
            }
        } else {
            date = kendo.date.addDays(date, -1);
        }

        return {
            date: date,
            groupIndex: groupIndex
        };
    }

    function moveLeftInVerticalGroup(slotIndex, groupIndex, groupCount, date) {
        if (slotIndex === 0) {
            if (groupIndex === 0) {
                date = kendo.date.addDays(date, -1);
                groupIndex = groupCount - 1;
            } else {
                date = kendo.date.addDays(date, NUMBER_OF_ROWS * NUMBER_OF_COLUMNS - 1);
                groupIndex --;
            }
        } else {
            date = kendo.date.addDays(date, -1);
        }

        return {
            date: date,
            groupIndex: groupIndex
        };
    }

    function moveRightInHorizontalGroup(slotIndex, groupIndex, groupCount, date) {
        if ((slotIndex + 1) % NUMBER_OF_COLUMNS === 0) {
            if (groupIndex == groupCount - 1) {
                date = kendo.date.addDays(date, 1);
                groupIndex = 0;
            } else {
                date = kendo.date.addDays(date, -6);
                groupIndex ++;
            }
        } else {
            date = kendo.date.addDays(date, 1);
        }

        return {
            date: date,
            groupIndex: groupIndex
        };
    }

    function moveRightInVerticalGroup(slotIndex, groupIndex, groupCount, date) {
        if (slotIndex == NUMBER_OF_ROWS * NUMBER_OF_COLUMNS - 1) {
            if (groupIndex == groupCount - 1) {
                groupIndex = 0;
                date = kendo.date.addDays(date, 1);
            } else {
                date = kendo.date.addDays(date, - (NUMBER_OF_ROWS * NUMBER_OF_COLUMNS - 1));
                groupIndex ++;
            }
        } else {
            date = kendo.date.addDays(date, 1);
        }

        return {
            date: date,
            groupIndex: groupIndex
        };
    }

    function moveUpInVerticalGroup(slotIndex, groupIndex, groupCount, date) {
        if (slotIndex <= NUMBER_OF_ROWS) {
            if (groupIndex === 0) {
                date = kendo.date.addDays(date, -7);
                groupIndex = groupCount - 1;
            } else {
                date = kendo.date.addDays(date, NUMBER_OF_ROWS * NUMBER_OF_COLUMNS - NUMBER_OF_ROWS -1);
                groupIndex --;
            }
        } else {
            date = kendo.date.addDays(date, -7);
        }

        return {
            date: date,
            groupIndex: groupIndex
        };
    }


    function moveDownInVerticalGroup(slotIndex, groupIndex, groupCount, date) {
        if (slotIndex >= NUMBER_OF_ROWS * NUMBER_OF_COLUMNS - NUMBER_OF_COLUMNS) {
            if (groupIndex == groupCount -1) {
                date = kendo.date.addDays(date, 7);
                groupIndex = 0;
            } else {
                date = kendo.date.addDays(date, - (NUMBER_OF_ROWS * NUMBER_OF_COLUMNS - NUMBER_OF_COLUMNS));
                groupIndex ++;
            }
        } else {
            date = kendo.date.addDays(date, 7);
        }

        return {
            date: date,
            groupIndex: groupIndex
        };
    }

})(window.kendo.jQuery);
