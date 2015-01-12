(function(f, define){
    define([ "./kendo.scheduler.view" ], f);
})(function(){

var __meta__ = {
    id: "scheduler.monthview",
    name: "Scheduler Month View",
    category: "web",
    description: "The Scheduler Month View",
    depends: [ "scheduler.view" ],
    hidden: true
};

(function($){
    var kendo = window.kendo,
        ui = kendo.ui,
        SchedulerView = ui.SchedulerView,
        NS = ".kendoMonthView",
        extend = $.extend,
        proxy = $.proxy,
        getDate = kendo.date.getDate,
        MS_PER_DAY = kendo.date.MS_PER_DAY,
        NUMBER_OF_ROWS = 6,
        NUMBER_OF_COLUMNS = 7,
        DAY_TEMPLATE = kendo.template('<span class="k-link k-nav-day">#:kendo.toString(date, "dd")#</span>'),
        EVENT_WRAPPER_STRING = '<div role="gridcell" aria-selected="false" data-#=ns#uid="#=uid#"' +
                '#if (resources[0]) { #' +
                    'style="background-color:#=resources[0].color #; border-color: #=resources[0].color#"' +
                    'class="k-event#=inverseColor ? " k-event-inverse" : ""#"' +
                '#} else {#' +
                    'class="k-event"' +
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
                    '<div class="k-event-template">#:title#</div>' +
                '</div>');

    var MORE_BUTTON_TEMPLATE = kendo.template(
        '<div style="width:#=width#px;left:#=left#px;top:#=top#px" class="k-more-events k-button"><span>...</span></div>'
    );

    ui.MonthView = SchedulerView.extend({
        init: function(element, options) {
            var that = this;

            SchedulerView.fn.init.call(that, element, options);

            that.title = that.options.title;

            that.name = "month";

            that._templates();

            that._editable();

            that._renderLayout(that.options.date);

            that._groups();
        },

        _updateDirection: function(selection, ranges, multiple, reverse, vertical) {
            if (multiple) {
                var startSlot = ranges[0].start;
                var endSlot = ranges[ranges.length - 1].end;
                var isSameSlot = startSlot.index === endSlot.index;
                var isSameCollection = startSlot.collectionIndex === endSlot.collectionIndex;
                var updateDirection;

                if (vertical) {
                    updateDirection = (isSameSlot && isSameCollection) || isSameCollection;
                } else {
                    updateDirection = isSameSlot && isSameCollection;
                }

                if (updateDirection) {
                    selection.backward = reverse;
                }
            }
        },

        _changeViewPeriod: function(selection, reverse, vertical) {
            var pad = vertical ? 7 : 1;

            if (reverse) {
                pad *= -1;
            }

            selection.start = kendo.date.addDays(selection.start, pad);
            selection.end = kendo.date.addDays(selection.end, pad);

            if (!vertical || (vertical && this._isVerticallyGrouped())) {
                selection.groupIndex = reverse ? this.groups.length - 1 : 0;
            }

            selection.events = [];

            return true;
        },

        _continuousSlot: function(selection, ranges, reverse) {
            var index = selection.backward ? 0 : ranges.length - 1;
            var group = this.groups[selection.groupIndex];

            return group.continuousSlot(ranges[index].start, reverse);
        },

        _changeGroupContinuously: function(selection, continuousSlot, multiple, reverse) {
            if (!multiple) {
                var groupIndex = selection.groupIndex;
                var lastGroupIndex = this.groups.length - 1;
                var vertical = this._isVerticallyGrouped();
                var group = this.groups[groupIndex];

                if (!continuousSlot && vertical) {

                    continuousSlot = group[reverse ? "lastSlot" : "firstSlot"]();

                    groupIndex += (reverse ? -1 : 1);

                } else if (continuousSlot && !vertical) {
                    groupIndex = reverse ? lastGroupIndex : 0;
                }

                if (groupIndex < 0 || groupIndex > lastGroupIndex) {
                    groupIndex = reverse ? lastGroupIndex : 0;
                    continuousSlot = null;
                }

                selection.groupIndex = groupIndex;
            }

            return continuousSlot;
        },

        _normalizeHorizontalSelection: function(selection, ranges, reverse) {
            var slot;

            if (reverse) {
                slot = ranges[0].start;
            } else {
                slot = ranges[ranges.length - 1].end;
            }

            return slot;
        },

        _normalizeVerticalSelection: function(selection, ranges) {
            var slot;

            if (selection.backward) {
                slot = ranges[0].start;
            } else {
                slot = ranges[ranges.length - 1].end;
            }

            return slot;
        },

        _templates: function() {
            var options = this.options,
                settings = extend({}, kendo.Template, options.templateSettings);

            this.eventTemplate = this._eventTmpl(options.eventTemplate, EVENT_WRAPPER_STRING);
            this.dayTemplate = kendo.template(options.dayTemplate, settings);
            this.groupHeaderTemplate = kendo.template(options.groupHeaderTemplate, settings);
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
            if (this.options.editable && !this._isMobilePhoneView()) {
                if (this._isMobile()) {
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

                    if (slot) {
                        var resourceInfo = that._resourceBySlot(slot);
                        that.trigger("add", { eventInfo: extend({ isAllDay: true, start: slot.startDate(), end: slot.startDate() }, resourceInfo ) });
                    }

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

            if (that.options.editable.create !== false) {
                that._addUserEvents = new kendo.UserEvents(that.element, {
                    filter: ".k-scheduler-monthview .k-scheduler-content td",
                    tap: function(e) {
                        var offset = $(e.target).offset();
                        var slot = that._slotByPosition(offset.left, offset.top);

                        if (slot) {
                            var resourceInfo = that._resourceBySlot(slot);
                            that.trigger("add", { eventInfo: extend({ isAllDay: true, start: slot.startDate(), end: slot.startDate() }, resourceInfo ) });
                        }

                        e.preventDefault();
                    }
                });
            }

            if (that.options.editable.update !== false) {
                that._editUserEvents = new kendo.UserEvents(that.element, {
                    filter:  ".k-scheduler-monthview .k-event",
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
                html += this._createCalendar(verticalGroupIdx);
            }

            html += "</tbody>";

            this.content.find("table").html(html);
        },

        _createCalendar: function(verticalGroupIndex) {
            var start = this.startDate();
            var cellCount = NUMBER_OF_COLUMNS*NUMBER_OF_ROWS;
            var cellsPerRow = NUMBER_OF_COLUMNS;
            var weekStartDates = [start];
            var html = '';
            var horizontalGroupCount = 1;
            var isVerticallyGrouped = this._isVerticallyGrouped();

            var resources = this.groupedResources;

            if (resources.length) {
                if (!isVerticallyGrouped) {
                    horizontalGroupCount = this._columnCountForLevel(resources.length - 1);
                }
            }

            this._slotIndices = {};

            for (var rowIdx = 0, length = cellCount / cellsPerRow; rowIdx < length; rowIdx++) {
                html += "<tr>";

                weekStartDates.push(start);

                var startIdx = rowIdx*cellsPerRow;

                for (var groupIdx = 0; groupIdx < horizontalGroupCount; groupIdx++) {
                    html += this._createRow(start, startIdx, cellsPerRow, isVerticallyGrouped ? verticalGroupIndex : groupIdx);
                }

                start = kendo.date.addDays(start, cellsPerRow);

                html += "</tr>";
            }

            this._weekStartDates = weekStartDates;
            this._endDate = kendo.date.previousDay(start);

            return html;
        },

        _createRow: function(startDate, startIdx, cellsPerRow, groupIndex) {
            var that = this;
            var min = that._firstDayOfMonth;
            var max = that._lastDayOfMonth;
            var content = that.dayTemplate;
            var classes = "";
            var html = "";

            var resources = function() {
                return that._resourceBySlot({ groupIndex: groupIndex });
            };

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
                html += content({ date: startDate, resources: resources });
                html += "</td>";

                that._slotIndices[getDate(startDate).getTime()] = startIdx + cellIdx;

                startDate = kendo.date.nextDay(startDate);
            }

            return html;
        },

        _layout: function() {
            var calendarInfo = this.calendarInfo();
            var weekDayNames = this._isMobile() ? calendarInfo.days.namesShort : calendarInfo.days.names;
            var names = shiftArray(weekDayNames, calendarInfo.firstDay);
            var columns = $.map(names, function(value) { return { text: value }; });
            var resources = this.groupedResources;
            var rows;

            if (resources.length) {
                if (this._isVerticallyGrouped()) {
                    var inner = []; //add hidden cells in order to sync the content rows
                    for (var idx = 0; idx < 6; idx++) {
                        inner.push({ text: "<div>&nbsp;</div>", className: "k-hidden k-slot-cell" });
                    }

                    rows = this._createRowsLayout(resources, inner, this.groupHeaderTemplate);
                } else {
                    columns = this._createColumnsLayout(resources, columns, this.groupHeaderTemplate);
                }
            }

            return {
                columns: columns,
                rows: rows
            };
        },

       _createEventElement: function(event) {
            var options = this.options;
            var editable = options.editable;

            var isMobile = this._isMobile();

            event.showDelete = editable && editable.destroy !== false && !isMobile;
            event.resizable = editable && editable.resize !== false && !isMobile;
            event.ns = kendo.ns;
            event.resources = this.eventResources(event);
            event.inverseColor = event.resources && event.resources[0] ? this._shouldInverseResourceColor(event.resources[0]) : false;

            var element = $(this.eventTemplate(event));

            this.angular("compile", function(){
                return {
                    elements: element,
                    data: [ { dataItem: event } ]
                };
            });

            return element;
        },
       _isInDateSlot: function(event) {
            var groups = this.groups[0];
            var slotStart = groups.firstSlot().start;
            var slotEnd = groups.lastSlot().end - 1;

            var startTime = kendo.date.toUtcTime(event.start);
            var endTime = kendo.date.toUtcTime(event.end);

            return (isInDateRange(startTime, slotStart, slotEnd) ||
                isInDateRange(endTime, slotStart, slotEnd) ||
                isInDateRange(slotStart, startTime, endTime) ||
                isInDateRange(slotEnd, startTime, endTime)) &&
                (!isInDateRange(endTime, slotStart, slotStart) || isInDateRange(endTime, startTime, startTime) || event.isAllDay );
        },

        _slotIndex: function(date) {
            return this._slotIndices[getDate(date).getTime()];
        },

        _positionMobileEvent: function(slotRange, element, group) {
            var startSlot = slotRange.start;

            if (slotRange.start.offsetLeft > slotRange.end.offsetLeft) {
               startSlot = slotRange.end;
            }

            var startIndex = slotRange.start.index;
            var endIndex = startIndex;

            var eventCount = 3;
            var events = SchedulerView.collidingEvents(slotRange.events(), startIndex, endIndex);

            events.push({element: element, start: startIndex, end: endIndex });

            var rows = SchedulerView.createRows(events);

            var slot = slotRange.collection.at(startIndex);

            var container = slot.container;

            if (!container) {

                 container = $(kendo.format('<div class="k-events-container" style="top:{0};left:{1};width:{2}"/>',
                    startSlot.offsetTop + startSlot.firstChildTop + startSlot.firstChildHeight - 3 + "px",
                    startSlot.offsetLeft + "px",
                    startSlot.offsetWidth + "px"
                ));

                slot.container = container;

                this.content[0].appendChild(container[0]);
            }

            if (rows.length <= eventCount) {
                slotRange.addEvent({element: element, start: startIndex, end: endIndex, groupIndex: startSlot.groupIndex });

                group._continuousEvents.push({
                    element: element,
                    uid: element.attr(kendo.attr("uid")),
                    start: slotRange.start,
                    end: slotRange.end
                });

                container[0].appendChild(element[0]);
            }
        },

        _positionEvent: function(slotRange, element, group) {
            var eventHeight = this.options.eventHeight;
            var startSlot = slotRange.start;

            if (slotRange.start.offsetLeft > slotRange.end.offsetLeft) {
               startSlot = slotRange.end;
            }

            var startIndex = slotRange.start.index;
            var endIndex = slotRange.end.index;
            var eventCount = startSlot.eventCount;
            var events = SchedulerView.collidingEvents(slotRange.events(), startIndex, endIndex);
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

                group._continuousEvents.push({
                    element: element,
                    uid: element.attr(kendo.attr("uid")),
                    start: slotRange.start,
                    end: slotRange.end
                });

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

            var top = range.start.offsetTop;

            var width = range.innerWidth();

            var height = range.start.clientHeight - 2;

            var hint = SchedulerView.fn._createResizeHint.call(this, left, top, width, height);

            hint.appendTo(this.content);

            this._resizeHint = this._resizeHint.add(hint);
       },

        _updateResizeHint: function(event, groupIndex, startTime, endTime) {
            this._removeResizeHint();

            var group = this.groups[groupIndex];

            var ranges = group.ranges(startTime, endTime, true, event.isAllDay);

            for (var rangeIndex = 0; rangeIndex < ranges.length; rangeIndex++) {
                this._createResizeHint(ranges[rangeIndex]);
            }

            this._resizeHint.find(".k-label-top,.k-label-bottom").text("");

            this._resizeHint.first().addClass("k-first").find(".k-label-top").text(kendo.toString(kendo.timezone.toLocalDate(startTime), "M/dd"));

            this._resizeHint.last().addClass("k-last").find(".k-label-bottom").text(kendo.toString(kendo.timezone.toLocalDate(endTime), "M/dd"));
        },

       _updateMoveHint: function(event, groupIndex, distance) {
            var start = kendo.date.toUtcTime(event.start) + distance;

            var end = start + event.duration();

            var group = this.groups[groupIndex];

            var ranges = group.ranges(start, end, true, event.isAllDay);

            this._removeMoveHint();

            for (var rangeIndex = 0; rangeIndex < ranges.length; rangeIndex++) {
                var range = ranges[rangeIndex];

                var startSlot = range.startSlot();

                var endSlot = range.endSlot();

                var hint = this._createEventElement(event.clone({ head: range.head, tail: range.tail }));

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

                    var tableRow = tableRows[rowIndex];
                    var cells = tableRow.children;
                    var cellMultiplier = 0;

                    tableRow.setAttribute("role", "row");

                    if (!this._isVerticallyGrouped()) {
                        cellMultiplier = groupIndex;
                    }

                    for (var cellIndex = cellMultiplier * columnCount; cellIndex < (cellMultiplier + 1) * columnCount; cellIndex++) {
                        var cell = cells[cellIndex];

                        var clientHeight = cell.clientHeight;

                        var firstChildHeight = cell.children.length ? cell.children[0].offsetHeight + 3 : 0;

                        var start = kendo.date.toUtcTime(kendo.date.addDays(this.startDate(), cellCount));

                        cellCount ++;

                        var eventCount = Math.floor((clientHeight - firstChildHeight - this.options.moreButtonHeight) / (this.options.eventHeight + 3)) ;// add space for the more button

                        cell.setAttribute("role", "gridcell");
                        cell.setAttribute("aria-selected", false);

                        collection.addDaySlot(cell, start, start + kendo.date.MS_PER_DAY, eventCount);
                    }
                }
            }
        },

        render: function(events) {
            this.content.children(".k-event,.k-more-events,.k-events-container").remove();

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
            var isMobilePhoneView = this._isMobilePhoneView();

            for (idx = 0, length = events.length; idx < length; idx++) {
                event = events[idx];

                if (this._isInDateSlot(event)) {
                    var group = this.groups[groupIndex];

                    if (!group._continuousEvents) {
                        group._continuousEvents = [];
                    }

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

                        var occurrence = event.clone({ start: start, end: end, head: range.head, tail: range.tail });

                        if (isMobilePhoneView) {
                            this._positionMobileEvent(range, this._createEventElement(occurrence), group);
                        } else {
                            this._positionEvent(range, this._createEventElement(occurrence), group);
                        }
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

            if (this._isMobile() && !this._isMobilePhoneView() && this.options.editable) {
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
            moreButtonHeight: 13,
            editable: true,
            selectedDateFormat: "{0:y}",
            groupHeaderTemplate: "#=text#",
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
        var msMin = min,
            msMax = max,
            msValue;

        msValue = value;

        return msValue >= msMin && msValue <= msMax;
    }
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
