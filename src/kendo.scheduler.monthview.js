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
        DAY_TEMPLATE = kendo.template('<span class="k-link k-nav-day">#:kendo.toString(date, "dd")#</span>'),
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

            that._groups();
        },

        move: function(selection, key, shift) {
            var start = selection.start;
            var end = selection.end;
            var daySlot = true;

            var handled = false;
            var group = this.groups[selection.groupIndex];
            var ranges = group.ranges(selection.start, selection.end, daySlot, false);
            var startSlot = ranges[0].start;
            var endSlot = ranges[ranges.length - 1].end;
            var vertical = this._isVerticallyGrouped();
            var direction, slot, siblingGroup;

            if (key === keys.DOWN || key === keys.UP) {
                var isUp = key === keys.UP;

                if (shift) {
                   if (startSlot.index === endSlot.index && startSlot.collectionIndex() === endSlot.collectionIndex()) {
                       selection.backward = isUp;
                   }
                } else if (selection.backward) {
                    endSlot = startSlot;
                } else {
                    startSlot = endSlot;
                }


                direction = isUp ? -1 : 1;

                startSlot = group.siblingCollectionSlot(startSlot, daySlot, false, direction);
                endSlot = group.siblingCollectionSlot(endSlot, daySlot, false, direction);

                handled = true;
            } else if (key === keys.LEFT || key === keys.RIGHT) {
                var isLeft = key === keys.LEFT;

                if (shift) {
                    if (startSlot.index === endSlot.index && startSlot.collectionIndex() === endSlot.collectionIndex()) {
                        selection.backward = isLeft;
                    }
                } else if (isLeft) {
                    endSlot = startSlot;
                } else {
                    startSlot = endSlot;
                }

                var startCollectionIndex = startSlot.collectionIndex();
                var endCollectionIndex = endSlot.collectionIndex();

                startSlot = group[isLeft ? "prevSlot" : "nextSlot"](startSlot, daySlot, false, shift);
                endSlot = group[isLeft ? "prevSlot" : "nextSlot"](endSlot, daySlot, false, shift);

                siblingGroup = isLeft ? selection.groupIndex >= 1 : selection.groupIndex < this.groups.length - 1;

                var startCollection, endCollection;

                if (!startSlot || !endSlot) {
                    if (siblingGroup && !shift) {
                        selection.groupIndex += isLeft ? -1 : 1;
                    } else {
                        startCollectionIndex = startCollectionIndex + (isLeft ? -1 : 1);
                        endCollectionIndex = endCollectionIndex + (isLeft ? -1 : 1);

                        if (!shift) {
                            selection.groupIndex = isLeft ? this.groups.length - 1 : 0;
                        }
                    }

                    startCollection = group._collection(startCollectionIndex, true);
                    endCollection = group._collection(endCollectionIndex, true);

                    startSlot = startCollection ? startCollection[isLeft ? "last" : "first"]() : null;
                    endSlot = endCollection ? endCollection[isLeft ? "last" : "first"]() : null;
                }

                handled = true;
            }

            if (handled) {
                if (shift) {
                    if (selection.backward && startSlot) {
                        selection.start = startSlot.startDate();
                    } else if (!selection.backward && endSlot) {
                        selection.end = endSlot.endDate();
                    }
                } else if (startSlot && endSlot) {
                    selection.isAllDay = startSlot.isAllDay;
                    selection.start = startSlot.startDate();
                    selection.end = endSlot.endDate();
                }

                selection.events = [];
            }

            return handled;
        },

        /*move: function(selection, key, keep) {
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
        },*/

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

            this._startDate = firstVisibleMonthDay(date, this.calendarInfo());

            this.createLayout(this._layout());

            this.table.addClass("k-scheduler-monthview");

            this._content();

            this.refreshLayout();

            this.content.on("click" + NS, ".k-nav-day,.k-more-events", function(e) {
               var offset = $(e.currentTarget).offset();
               var slot = that._slotByPosition(offset.left, offset.top);

               e.preventDefault();
               that.trigger("navigate", { view: "day", date: slot.startDate() });
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

                    that.trigger("add", { eventInfo: extend({ isAllDay: true, start: slot.startDate(), end: slot.startDate() }, resourceInfo ) });

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
            var calendarInfo = this.calendarInfo();
            var names = shiftArray(calendarInfo.days.names, calendarInfo.firstDay);
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

        _positionEvent: function(slotRange, element) {
            var eventHeight = this.options.eventHeight;
            var startSlot = slotRange.start;

            if (slotRange.start.offsetLeft > slotRange.end.offsetLeft) {
               startSlot = slotRange.end;
            }

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
                        left: this._scrollbarOffset(slot.offsetLeft + 2),
                        top: slot.offsetTop + slot.firstChildHeight + eventCount * eventHeight + 3 * eventCount
                    }));

                    this.content[0].appendChild(slot.more[0]);
                }
            } else {
                slotRange.addEvent({element: element, start: startIndex, end: endIndex, groupIndex: startSlot.groupIndex });

                element[0].style.width = slotRange.innerWidth() - rightOffset + "px";
                element[0].style.left = this._scrollbarOffset(startSlot.offsetLeft + 2) + "px";
                element[0].style.height = eventHeight + "px";

                this.content[0].appendChild(element[0]);
            }
        },

       _slotByPosition: function(x, y) {
           var offset = this.content.offset();

           x -= offset.left;
           y -= offset.top;
           y += this.content[0].scrollTop;
           x += this.content[0].scrollLeft;

           x = Math.ceil(x);
           y = Math.ceil(y);

           for (var groupIndex = 0; groupIndex < this.groups.length; groupIndex++) {
               var slot = this.groups[groupIndex].daySlotByPosition(x, y);

               if (slot) {
                   return slot;
               }
           }

           return null;
       },

       _createResizeHint: function(range) {
            var left = range.startSlot().offsetLeft;

            left = this._scrollbarOffset(left);

            var top = range.start.offsetTop;

            var width = range.innerWidth();

            var height = range.start.clientHeight - 2;

            var hint = SchedulerView.fn._createResizeHint.call(this, left, top, width, height);

            hint.appendTo(this.content);

            this._resizeHint = this._resizeHint.add(hint);
       },

        _updateResizeHint: function(event, startSlot, endSlot) {
            this._removeResizeHint();

            var group = this.groups[endSlot.groupIndex];

            var ranges = group.ranges(startSlot.startDate(), endSlot.endDate(), true, event.isAllDay);

            for (var rangeIndex = 0; rangeIndex < ranges.length; rangeIndex++) {
                this._createResizeHint(ranges[rangeIndex]);
            }

            this._resizeHint.find(".k-label-top,.k-label-bottom").text("");

            this._resizeHint.first().addClass("k-first").find(".k-label-top").text(kendo.toString(startSlot.startDate(), "M/dd"));

            this._resizeHint.last().addClass("k-last").find(".k-label-bottom").text(kendo.toString(endSlot.startDate(), "M/dd"));
        },

       _updateMoveHint: function(event, initialSlot, currentSlot) {
            var distance = currentSlot.start - initialSlot.start;

            var start = kendo.date.toUtcTime(event.start) + distance;

            var end = start + event.duration();

            var group = this.groups[currentSlot.groupIndex];

            var ranges = group.ranges(start, end, true, event.isAllDay);

            this._removeMoveHint();

            for (var rangeIndex = 0; rangeIndex < ranges.length; rangeIndex++) {
                var range = ranges[rangeIndex];

                var startSlot = range.startSlot();

                var endSlot = range.endSlot();

                var hint = this._createEventElement($.extend({}, event, { head: range.head, tail: range.tail }));

                hint.css({
                    left: startSlot.offsetLeft + 2,
                    top: startSlot.offsetTop + startSlot.firstChildHeight,
                    height: this.options.eventHeight,
                    width: range.innerWidth() - (startSlot.index !== endSlot.index ? 5 : 4)
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

            this.groups = [];

            for (var idx = 0; idx < groupCount; idx++) {
                this._addResourceView(idx);
            }

            var tableRows = this.content[0].getElementsByTagName("tr");

            for (var groupIndex = 0; groupIndex < groupCount; groupIndex++) {
                var cellCount = 0;
                var rowMultiplier = 0;

                if (this._isVerticallyGrouped()) {
                    rowMultiplier = groupIndex;
                }

                for (var rowIndex = rowMultiplier*rowCount; rowIndex < (rowMultiplier+1) *rowCount; rowIndex++) {
                    var group = this.groups[groupIndex];
                    var collection = group.addDaySlotCollection(kendo.date.addDays(this.startDate(), cellCount), kendo.date.addDays(this.startDate(), cellCount + columnCount));

                    var cells = tableRows[rowIndex].children;
                    var cellMultiplier = 0;

                    if (!this._isVerticallyGrouped()) {
                        cellMultiplier = groupIndex;
                    }

                    for (var cellIndex = cellMultiplier * columnCount; cellIndex < (cellMultiplier + 1) * columnCount; cellIndex++) {
                        var cell = cells[cellIndex];

                        var clientHeight = cell.clientHeight;

                        var firstChildHeight = cell.firstChild.offsetHeight + 3;

                        var start = kendo.date.toUtcTime(kendo.date.addDays(this.startDate(), cellCount));

                        cellCount ++;

                        var eventCount = Math.floor((clientHeight - firstChildHeight) / (this.options.eventHeight + 3));

                        collection.addDaySlot(cell, start, start + kendo.date.MS_PER_DAY, eventCount);
                    }
                }
            }
       },

        render: function(events) {
            this.content.children(".k-event,.k-more-events").remove();

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

                    var ranges = group.slotRanges(event, true);

                    var rangeCount = ranges.length;

                    for (var rangeIndex = 0; rangeIndex < rangeCount; rangeIndex++) {
                        var range = ranges[rangeIndex];
                        var start = event.start;
                        var end = event.end;

                        if (rangeCount > 1) {
                            if (rangeIndex === 0) {
                                end = range.end.endDate();
                            } else if (rangeIndex == rangeCount - 1) {
                                start = range.start.startDate();
                            } else {
                                start = range.start.startDate();
                                end = range.end.endDate();
                            }
                        }

                        var occurrence = extend({}, event, { start: start, end: end, head: range.head, tail: range.tail });

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
                    var value = this._resourceValue(resource, view[itemIdx]);

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


    function shiftArray(array, idx) {
        return array.slice(idx).concat(array.slice(0, idx));
    }

    function firstVisibleMonthDay(date, calendarInfo) {
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
