(function(f, define){
    define([ "./kendo.scheduler.view" ], f);
})(function(){

var __meta__ = {
    id: "scheduler.timelineview",
    name: "Scheduler Timeline View",
    category: "web",
    description: "The Scheduler Timeline View",
    depends: [ "scheduler.view" ],
    hidden: true
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        setTime = kendo.date.setTime,
        SchedulerView = ui.SchedulerView,
        extend = $.extend,
        proxy = $.proxy,
        getDate = kendo.date.getDate,
        getMilliseconds = kendo.date.getMilliseconds,
        MS_PER_DAY = kendo.date.MS_PER_DAY,
        NS = ".kendoTimelineView";

    var EVENT_TEMPLATE = kendo.template('<div>' +
        '<div class="k-event-template k-event-time">#:kendo.format("{0:t} - {1:t}", start, end)#</div>' +
        '<div class="k-event-template">${title}</div></div>'),
        DATA_HEADER_TEMPLATE = kendo.template("<span class='k-link k-nav-day'>#=kendo.toString(date, 'ddd M/dd')#</span>"),
        EVENT_WRAPPER_STRING = '<div role="gridcell" aria-selected="false" ' +
                'data-#=ns#uid="#=uid#"' +
                '#if (resources[0]) { #' +
                    'style="background-color:#=resources[0].color#; border-color: #=resources[0].color#"' +
                    'class="k-event#=inverseColor ? " k-event-inverse" : ""#" ' +
                '#} else {#' +
                    'class="k-event"' +
                '#}#' +
                '>' +
                '<span class="k-event-actions">' +
                    '# if(data.tail) {#' +
                        '<span class="k-icon k-i-arrow-w"></span>' +
                    '#}#' +
                    '# if(data.isException()) {#' +
                        '<span class="k-icon k-i-exception"></span>' +
                    '# } else if(data.isRecurring()) {#' +
                        '<span class="k-icon k-i-refresh"></span>' +
                    '# } #' +
                '</span>' +
                '{0}' +
                '<span class="k-event-actions">' +
                    '#if (showDelete) {#' +
                        '<a href="\\#" class="k-link k-event-delete"><span class="k-icon k-si-close"></span></a>' +
                    '#}#' +
                    '# if(data.head) {#' +
                        '<span class="k-icon k-i-arrow-e"></span>' +
                    '#}#' +
                '</span>' +
                '#if(resizable && !data.tail){#' +
                '<span class="k-resize-handle k-resize-w"></span>' +
                '#}#' +
                '#if(resizable && !data.head){#' +
                '<span class="k-resize-handle k-resize-e"></span>' +
                '#}#' +
                '</div>';

    function toInvariantTime(date) {
        var staticDate = new Date(1980, 1, 1, 0, 0, 0);
        setTime(staticDate, getMilliseconds(date));
        return staticDate;
    }

    function isInDateRange(value, min, max) {
        return value >= min && value <= max;
    }

    var TimelineView = SchedulerView.extend({
        init: function(element, options) {
            var that = this;
            //only vertical grouping is supported = ignore orientation?
            SchedulerView.fn.init.call(that, element, options);

            that.title = that.options.title || that.options.name;

            that._templates();

            that._editable();

            that.calculateDateRange();

            that._groups();

            that._currentTime();
        },
        name: "timeline",

        _currentTimeMarkerUpdater: function() {
            var currentTime = new Date();
            var options = this.options;

            this.datesHeader.find(".k-current-time").remove();

            if (!this._isInDateSlot({start: currentTime, end:currentTime })) {
                return;
            }

            if(options.currentTimeMarker.useLocalTimezone === false) {
                var timezone = options.dataSource.options.schema.timezone;

                if(options.dataSource && timezone) {
                    var timezoneOffset = kendo.timezone.offset(currentTime, timezone);
                    currentTime = kendo.timezone.convert(currentTime, currentTime.getTimezoneOffset(), timezoneOffset);
                }
            }

            var groupsCount = !options.group || options.group.orientation == "vertical" ? 1 : this.groups.length;

            for(var groupIndex = 0; groupIndex < groupsCount; groupIndex++) {
                var currentGroup = this.groups[groupIndex];
                var utcCurrentTime = kendo.date.toUtcTime(currentTime);
                var ranges = currentGroup.timeSlotRanges(utcCurrentTime, utcCurrentTime + 1);
                if(ranges.length === 0) {
                    return;
                }
                var collection = ranges[0].collection;
                var slotElement = collection.slotByStartDate(currentTime);

                if(slotElement) {
                    var element = $("<div class='k-current-time'></div>");
                    var datesHeader = this.datesHeader;

                    element.appendTo(datesHeader.find(".k-scheduler-header-wrap")).css({
                        left: Math.round(ranges[0].innerRect(currentTime, new Date(currentTime.getTime() + 1), false).left),
                        width: "1px",
                        bottom: "1px",
                        top: 0
                    });
                }
            }
        },

        _currentTime: function() {
            var that = this;
            var markerOptions = that.options.currentTimeMarker;

            if (markerOptions !== false && markerOptions.updateInterval !== undefined) {
                var updateInterval = markerOptions.updateInterval;

                that._currentTimeMarkerUpdater();
                that._currentTimeUpdateTimer = setInterval(proxy(this._currentTimeMarkerUpdater, that), updateInterval);
            }
        },

        _editable: function() {
            if (this.options.editable) {
                if (this._isMobile()) {
                    this._touchEditable();
                } else {
                    this._mouseEditable();
                }
            }
        },

        _mouseEditable: function() {
            var that = this;
            that.element.on("click" + NS, ".k-event a:has(.k-si-close)", function(e) {
                that.trigger("remove", { uid: $(this).closest(".k-event").attr(kendo.attr("uid")) });
                e.preventDefault();
            });

            if (that.options.editable.create !== false) {
                that.element.on("dblclick" + NS, ".k-scheduler-content td", function(e) {
                    var slot = that._slotByPosition(e.pageX, e.pageY);

                    if (slot) {
                        var resourceInfo = that._resourceBySlot(slot);
                        that.trigger("add", { eventInfo: extend({ start: slot.startDate(), end: slot.endDate() }, resourceInfo) });
                    }

                    e.preventDefault();
                });
            }

            if (that.options.editable.update !== false) {
                that.element.on("dblclick" + NS, ".k-event", function(e) {
                    that.trigger("edit", { uid: $(this).closest(".k-event").attr(kendo.attr("uid")) });
                    e.preventDefault();
                });
            }
        },

        _touchEditable: function() {
            var that = this;

            if (that.options.editable.create !== false) {
                that._addUserEvents = new kendo.UserEvents(that.element, {
                    filter:  ".k-scheduler-content td",
                    tap: function(e) {
                        var slot = that._slotByPosition(e.x.location, e.y.location);

                        if (slot) {
                            var resourceInfo = that._resourceBySlot(slot);
                            that.trigger("add", { eventInfo: extend({ start: slot.startDate(), end: slot.endDate() }, resourceInfo) });
                        }

                        e.preventDefault();
                    }
                });
            }

            if (that.options.editable.update !== false) {
                that._editUserEvents = new kendo.UserEvents(that.element, {
                    filter: ".k-event",
                    tap: function(e) {
                        var eventElement = $(e.target).closest(".k-event");

                        if (!eventElement.hasClass("k-event-active")) {
                            that.trigger("edit", { uid: eventElement.attr(kendo.attr("uid")) });
                        }

                        e.preventDefault();
                    }
                });
            }
        },

       _slotByPosition: function(x, y) {
           var slot;

           var offset;

           if (this._isVerticallyGrouped()) {
               offset = this.content.offset();
               y += this.content[0].scrollTop;
               x += this.content[0].scrollLeft;
           } else {
               offset = this.element.find(".k-scheduler-header-wrap:has(.k-scheduler-header-all-day)").find(">div").offset();
           }

           if (offset) {
               x -= offset.left;
               y -= offset.top;
           }

           x = Math.ceil(x);
           y = Math.ceil(y);

           var group;
           var groupIndex;

           for (groupIndex = 0; groupIndex < this.groups.length; groupIndex++) {
                group = this.groups[groupIndex];

                slot = group.daySlotByPosition(x, y);

                if (slot) {
                    return slot;
                }
           }

           if (offset) {
               x += offset.left;
               y += offset.top;
           }

           offset = this.content.offset();

           x -= offset.left;
           y -= offset.top;

           if (!this._isVerticallyGrouped()) {
               y += this.content[0].scrollTop;
               x += this.content[0].scrollLeft;
           }

           x = Math.ceil(x);
           y = Math.ceil(y);

           for (groupIndex = 0; groupIndex < this.groups.length; groupIndex++) {
                group = this.groups[groupIndex];

                slot = group.timeSlotByPosition(x, y);

                if (slot) {
                    return slot;
                }
           }

           return null;
       },

       _getColumnCount: function() {
            var options = this.options;
            var msMajorInterval = this._timeSlotInterval();
            var msMin = getMilliseconds(toInvariantTime(options.startTime));
            var msMax = getMilliseconds(toInvariantTime(options.endTime));
            var columnCount;

            columnCount = MS_PER_DAY / msMajorInterval;
            if (msMin != msMax) {
                if (msMin > msMax) {
                    msMax += MS_PER_DAY;
                }

                columnCount = (msMax - msMin) / msMajorInterval;
            }

            this._columnCount = Math.round(columnCount);
       },

        options: {
            name: "TimelineView",
            title: "Timeline",
            selectedDateFormat: "{0:D}",
            date: kendo.date.today(),
            startTime: kendo.date.today(),
            endTime: kendo.date.today(),
            minorTickCount: 2,
            editable: true,
            workDayStart: new Date(1980, 1, 1, 8, 0, 0),
            workDayEnd: new Date(1980, 1, 1, 17, 0, 0),
            workWeekStart: 1,
            workWeekEnd: 5,
            majorTick: 60,
            majorTimeHeaderTemplate: "#=kendo.toString(date, 't')#",
            minorTimeHeaderTemplate: "&nbsp;",
            slotTemplate: "&nbsp;",
            eventTemplate: EVENT_TEMPLATE,
            dateHeaderTemplate: DATA_HEADER_TEMPLATE,
            currentTimeMarker: {
                updateInterval: 10000,
                useLocalTimezone: true
            }
        },

        events: ["remove", "add", "edit"],

        _templates: function() {
            var options = this.options,
                settings = extend({}, kendo.Template, options.templateSettings);

            this.eventTemplate = this._eventTmpl(options.eventTemplate, EVENT_WRAPPER_STRING);
            this.majorTimeHeaderTemplate = kendo.template(options.majorTimeHeaderTemplate, settings);
            this.minorTimeHeaderTemplate = kendo.template(options.minorTimeHeaderTemplate, settings);
            this.dateHeaderTemplate = kendo.template(options.dateHeaderTemplate, settings);
            this.slotTemplate = kendo.template(options.slotTemplate, settings);
        },

        _render: function(dates) {
            var that = this;
            dates = dates || [];
            //dates are considered as resource for creating columns
            //in current case they are not
            that._dates = dates;

            that._getColumnCount();

            that._startDate = dates[0];

            that._endDate = dates[(dates.length - 1) || 0];

            that._calculateSlotRanges();

            that.createLayout(that._layout(dates));

            that._content(that._columnCount * that._dates.length);

            that.refreshLayout();
        },

        _calculateSlotRanges: function () {
            var dates = this._dates;
            var slotStartTime = this.startTime();
            var slotEndTime = this.endTime();

            if (getMilliseconds(slotEndTime) === getMilliseconds(kendo.date.getDate(slotEndTime))) {
                slotEndTime = kendo.date.getDate(slotEndTime);
                setTime(slotEndTime, MS_PER_DAY - 1);
            }

            slotEndTime = getMilliseconds(slotEndTime);
            slotStartTime = getMilliseconds(slotStartTime);

            var slotRanges = [];
            for (var i = 0; i < dates.length; i++) {
                var rangeStart = getDate(dates[i]);
                setTime(rangeStart, slotStartTime);

                var rangeEnd = getDate(dates[i]);
                setTime(rangeEnd, slotEndTime);

                slotRanges.push({
                    start: kendo.date.toUtcTime(rangeStart),
                    end: kendo.date.toUtcTime(rangeEnd)
                });
            }

            this._slotRanges = slotRanges;
        },

        _layout: function(dates) {
            var columns = [];
            var rows = [];
            var that = this;
            var options = that.options;
            var columnCount = that._columnCount;
            var columnTimeFormat;
            var msMajorInterval = that._timeSlotInterval();

            //need update, as major iterval may not be required
            if (msMajorInterval >= MS_PER_DAY) {
                columnTimeFormat = "{0:M}";
            } else {
                columnTimeFormat = "{0:HH:mm}";
            }
            
            for (var idx = 0; idx < dates.length; idx++) {
                for (var columnIndex = 0; columnIndex < columnCount; columnIndex++) { 
                    var column = {};
                    var columnOffset = 0;
                    var startDate = kendo.date.getDate(options.date);
                    kendo.date.setTime(startDate, kendo.date.getMilliseconds(options.startTime));

                    if (msMajorInterval >= MS_PER_DAY) {
                        columnOffset = (+startDate) + (msMajorInterval * idx);
                    } else {
                        columnOffset = (+options.startTime) + (msMajorInterval * columnIndex);
                    }

                     column.text = kendo.format(columnTimeFormat, new Date(columnOffset));
                     columns.push(column);
                }
            }

            var resources = this.groupedResources;

            if (resources.length && this._isGrouped()) {
                //horizontal grouping is not supported
                //is correct to always render vertical grouping?
                rows = this._createRowsLayout(resources, null);
            } else {
                rows = [{
                    //add template here
                    text: "All events"
                }];
            }

            return {
                columns: columns,
                rows: rows
            };
        },

        _content: function(columnCount) {
            var that = this;
            var options = that.options;
            var isVerticalGroupped = false;

            var groupsCount = 1;
            var rowCount;

            rowCount = this._groupCount();

            var html = '';

            html += '<tbody>';

            var appendRow = function() {
                var content = "";
                var idx;
                var length;
                var groupIdx = 0;

                content = '<tr>';

                for (; groupIdx < groupsCount; groupIdx++) {
                    for (idx = 0, length = columnCount; idx < length; idx++) {

                        content += '<td>';
                        content += "</td>";
                    }
                }

                content += "</tr>";

                return content;
            };

            for (var rowIdx = 0; rowIdx < rowCount; rowIdx++) {
                html += appendRow();
            }

            html += '</tbody>';

            this.content.find("table").append(html);
        },

        _groups: function() {
            var groupCount = this._groupCount();
            var columnCount = this._columnCount * this._dates.length;

            this.groups = [];

            for (var idx = 0; idx < groupCount; idx++) {
                var view = this._addResourceView(idx);
                var dates = this._dates;
                var start = dates[0];
                var end = dates[(dates.length - 1) || 0];
                view.addTimeSlotCollection(start, kendo.date.addDays(end, 1));
            }

            this._timeSlotGroups(groupCount, columnCount);
        },

        _isGrouped: function () {
            return !!this.groupedResources.length;
        },

        _timeSlotGroups: function (groupCount, columnCount) {
            //example logic
            var interval = this._timeSlotInterval();
            var isGrouped = this._isGrouped();
            var tableRows = this.content.find("tr");
            var rowCount = tableRows.length;

            tableRows.attr("role", "row");

            if (isGrouped) {
                rowCount = Math.floor(rowCount / groupCount);
            }

            for (var groupIndex = 0; groupIndex < groupCount; groupIndex++) {
                var rowMultiplier = 0;
                var cells = tableRows[groupIndex].children;
                var group = this.groups[groupIndex];
                var datesCount = this._dates.length;
                var time;

                if (isGrouped) {
                    rowMultiplier = groupIndex;
                }

                var rowIndex = rowMultiplier * rowCount;

                var cellMultiplier = 0;

                if (!isGrouped) {
                    cellMultiplier = groupIndex;
                }

                //two possible slot creation approaches:
                //1) current - loop through the dates - this way the current date is available directly by index
                //2) another - loop through all cells for given row and get date from dividing index by column index
                for (var dateIndex = 0; dateIndex < datesCount; dateIndex++) {
                    var dayColumnCount = Math.floor(columnCount / datesCount);
                    time = getMilliseconds(new Date(+this.options.startTime));
                    for (var cellIndex = cellMultiplier * columnCount; cellIndex < columnCount / datesCount ; cellIndex++) {
                        var cell = cells[cellIndex + (dateIndex * dayColumnCount)];
                        var collection = group.getTimeSlotCollection(0);
                        var currentDate = this._dates[dateIndex];
                        var currentTime = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
                        var start = currentTime + time;
                        var end = start + interval;

                        cell.setAttribute("role", "gridcell");
                        cell.setAttribute("aria-selected", false);

                        collection.addTimeSlot(cell, start, end, true);

                        time += interval;
                    }
                }
            }
        },

        startDate: function() {
            return this._startDate;
        },

        endDate: function() {
            return this._endDate;
        },

        startTime: function() {
            var options = this.options;
            return options.startTime;
        },

        endTime: function() {
            var options = this.options;
            return options.endTime;
        },

        _timeSlotInterval: function() {
            var options = this.options;
            return options.majorTick * kendo.date.MS_PER_MINUTE;
        },

        nextDate: function () {
            return kendo.date.nextDay(this.endDate());
        },
        previousDate: function () {
            return kendo.date.previousDay(this.startDate());
        },

        calculateDateRange: function() {
            this._render([this.options.date]);
        },

        render: function(events) {
            this._headerColumnCount = 0;

            this._groups();

            this.element.find(".k-event").remove();

            events = new kendo.data.Query(events)
                .sort([{ field: "start", dir: "asc" },{ field: "end", dir: "desc" }])
                .toArray();

            var eventsByResource = [];

            this._eventsByResource(events, this.groupedResources, eventsByResource);

            var that = this;
     
            var eventsPerDate = $.map(this._dates, function(date) {
                return Math.max.apply(null,
                    $.map(eventsByResource, function(events) {
                        return $.grep(events, function(event) {
                            return isInDateRange(date, getDate(event.start), getDate(event.end));
                        }).length;
                    })
                );
            });

            var height = Math.max.apply(null, eventsPerDate);

            //this._updateAllDayHeaderHeight((height + 1) * this._allDayHeaderHeight);

            for (var groupIndex = 0; groupIndex < eventsByResource.length; groupIndex++) {
                this._renderEvents(eventsByResource[groupIndex], groupIndex);
            }
            
            this.trigger("activate");
        
              //To be implemented
            //throw "render is not implemented";
        },

        _eventsByResource: function(events, resources, result) {
            //todo
            var resource = resources[0];

            if (resource) {
                var view = resource.dataSource.view();

                for (var itemIdx = 0; itemIdx < view.length; itemIdx++) {
                    var value = this._resourceValue(resource, view[itemIdx]);

                    var eventsFilteredByResource = new kendo.data.Query(events).filter({ field: resource.field, operator: SchedulerView.groupEqFilter(value) }).toArray();

                    if (resources.length > 1) {
                        this._eventsByResource(eventsFilteredByResource, resources.slice(1), result);
                    } else {
                        result.push(eventsFilteredByResource);
                    }
                }
            } else {
                result.push(events);
            }
        },

        _isInDateSlot: function(event) {
            var startTime = event.start;
            var endTime = event.end;
            var rangeStart = getDate(this._startDate);
            var rangeEnd = kendo.date.addDays(getDate(this._endDate),1);

            if (startTime <= rangeEnd && rangeStart <= endTime) {
                return true;
            }
            return false;
        },

        _isInTimeSlot: function(event) {
            var startTime = event.startTime || kendo.date.toUtcTime(event.start);
            var endTime = event.endTime || kendo.date.toUtcTime(event.end);

            var slotRanges = this._slotRanges;

            if (startTime === endTime) {
                endTime = endTime+1;
            }

            for (var slotIndex = 0; slotIndex < slotRanges.length; slotIndex++) {
                if (startTime <= slotRanges[slotIndex].end && slotRanges[slotIndex].start < endTime) {
                    return true;
                }
            }
            return false;
        },

        _adjustEvent: function(event) {
            var start = event.start;
            var end = event.end;
            var eventStartTime = event._time("start");
            var eventEndTime = event._time("end");
            var startTime = getMilliseconds(this.startTime());
            var endTime = getMilliseconds(this.endTime());
            var adjustedStartDate = null;
            var adjustedEndDate = null;
            var occurrence;
            var head = false;
            var tail = false;

            if (event.isAllDay) {
                adjustedStartDate = getDate(start);
                if (startTime > eventStartTime) {
                    setTime(adjustedStartDate, startTime);
                    tail = true;
                }

                adjustedEndDate = getDate(end);
                if (endTime === getMilliseconds(getDate(this.endTime()))) {
                    adjustedEndDate = kendo.date.addDays(adjustedEndDate, 1);
                } else {
                    setTime(adjustedEndDate, endTime);
                    head = true;
                }
            } else {
                endTime = endTime === 0 ? MS_PER_DAY : endTime;

                if (startTime > eventStartTime) {
                    adjustedStartDate = getDate(start);
                    setTime(adjustedStartDate, startTime);
                    tail = true;
                } else if (endTime < eventStartTime) {
                    adjustedStartDate = getDate(start);
                    adjustedStartDate = kendo.date.addDays(adjustedStartDate, 1);
                    setTime(adjustedStartDate, startTime);
                    tail = true;
                }

                if (endTime < eventEndTime) {
                    adjustedEndDate = getDate(end);
                    setTime(adjustedEndDate, endTime);
                    head = true;
                } else if (startTime > eventEndTime) {
                    adjustedEndDate = getDate(end);
                    adjustedEndDate = kendo.date.addDays(adjustedEndDate,-1);
                    setTime(adjustedEndDate, endTime);
                    head = eventEndTime === 0 ? false : true;
                }
            }

            occurrence = event.clone({
                start: adjustedStartDate ? adjustedStartDate : start,
                end: adjustedEndDate ? adjustedEndDate : end,
                startTime: adjustedStartDate ? kendo.date.toUtcTime(adjustedStartDate) : event.startTime,
                endTime:  adjustedEndDate ? kendo.date.toUtcTime(adjustedEndDate) : event.endTime,
                isAllDay: false
            });

            return {
                occurrence: occurrence,
                head: head,
                tail: tail
            };
        },

        _renderEvents: function(events, groupIndex) {
            var event;
            var idx;
            var length;

            for (idx = 0, length = events.length; idx < length; idx++) {
                event = events[idx];

                if (this._isInDateSlot(event)) {
                    var isMultiDayEvent = event.isAllDay || event.end.getTime() - event.start.getTime() >= MS_PER_DAY;
                    var container = this.content;

                    if (isMultiDayEvent || this._isInTimeSlot(event)) {
                        var adjustedEvent = this._adjustEvent(event);

                        if (this._isInTimeSlot(adjustedEvent.occurrence)) {
                            var group = this.groups[groupIndex];
                            if (!group._continuousEvents) {
                                group._continuousEvents = [];
                            }

                            var ranges = group.slotRanges(adjustedEvent.occurrence, false);
                            var rangeCount = ranges.length;

                            if (rangeCount > 0) {
                                var element;
                                //support horizontal grouping?
                                var range = ranges[0];

                                element = this._createEventElement(adjustedEvent.occurrence, event, range.head || adjustedEvent.head, range.tail || adjustedEvent.tail);
                                this.addContinuousEvent(group, range, element, event.isAllDay);
                                element.appendTo(container);
                                this._positionEvent(adjustedEvent.occurrence, element, range);
                            }
                        }
                    }
                }
            }
        },

        addContinuousEvent: function(group, range, element, isAllDay) {
            var events = group._continuousEvents;

            events.push({
                element: element,
                isAllDay: isAllDay,
                uid: element.attr(kendo.attr("uid")),
                start: range.start,
                end: range.end
            });
        },

        _createEventElement: function(occurrence, event, head, tail) {
            var template = this.eventTemplate;
            var editable = this.options.editable;
            var isMobile = this._isMobile();
            var showDelete = editable && editable.destroy !== false && !isMobile;
            var resizable = editable && editable.resize !== false;
            var eventStartTime = event._time("start");
            var eventEndTime = event._time("end");
            var eventStartDate = event.start;
            var eventEndDate = event.end;

            var resources = this.eventResources(event);
            
            if (event.startTime) {
                eventStartDate = new Date(eventStartTime);
                eventStartDate = kendo.timezone.apply(eventStartDate, "Etc/UTC");
            }

            if (event.endTime) {
                eventEndDate = new Date(eventEndTime);
                eventEndDate = kendo.timezone.apply(eventEndDate, "Etc/UTC");
            }

            var data = extend({}, {
                ns: kendo.ns,
                resizable: resizable,
                showDelete: showDelete,
                head: head,
                tail: tail,
                singleDay: this._dates.length == 1,
                resources: resources,
                inverseColor: resources && resources[0] ? this._shouldInverseResourceColor(resources[0]) : false
            }, event, {
                start: eventStartDate,
                end: eventEndDate
            });

            var element = $(template(data));

            this.angular("compile", function(){
                return {
                    elements: element,
                    data: [ { dataItem: data } ]
                };
            });

            return element;
        },

        _positionEvent: function(event, element, slotRange) {
            var start = event.startTime || event.start;
            var end = event.endTime || event.end;

            var rect = slotRange.innerRect(start, end, false);
            rect.top = slotRange.start.offsetTop;
            var width = rect.right - rect.left - 2;

            if (width < 0) {
                width = 0;
            }

            element
                .css({
                    left: rect.left,
                    width: width
                });

            this._arrangeRows(element, slotRange);
        },

        _arrangeRows: function (element, slotRange) {
            var startIndex = slotRange.start.index;
            var endIndex = slotRange.end.index;
            var events = SchedulerView.collidingEvents(slotRange.events(), startIndex, endIndex);
            var currentColumnCount = this._headerColumnCount || 0;

            slotRange.addEvent({ slotIndex: startIndex, start: startIndex, end: endIndex, element: element });
            events.push({ slotIndex: startIndex, start: startIndex, end: endIndex, element: element });

            var rows = SchedulerView.createRows(events);

            if (rows.length && rows.length > currentColumnCount) {
                this._headerColumnCount = rows.length;
            }

            var slotHeight = slotRange.start.element.clientHeight;

            var eventBottomOffset = slotHeight * 0.10;
            var rowHeight = (slotHeight - eventBottomOffset) / rows.length;

            for (var idx = 0, length = rows.length; idx < length; idx++) {
                var rowEvents = rows[idx].events;

                for (var j = 0, eventLength = rowEvents.length; j < eventLength; j++) {
                    $(rowEvents[j].element).css({
                        top:  slotRange.start.offsetTop + idx * rowHeight + 2,
                        height: rowHeight - 4
                    });
                }
            }
        },

        _groupCount: function() {
            var resources = this.groupedResources;

            if (resources.length) {
                if (this._groupOrientation() === "vertical") {
                    return this._rowCountForLevel(this.rowLevels.length - 1);
                }
            }
            return 1;
        },

        _rowCountForLevel: function(level) {
            var rowLevel = this.rowLevels[level];
            return rowLevel ? rowLevel.length : 0;
        },

        _updateEventForMove: function(event) {
           if (event.isAllDay) {
               event.set("isAllDay", false);
           }
        },

        _updateEventForResize: function(event) {
            if (event.isAllDay) {
                event.set("isAllDay", false);
            }
        },

        _updateMoveHint: function(event, groupIndex, distance) {
            var group = this.groups[groupIndex];

            var clonedEvent = event.clone({ start: event.start, end: event.end});

            var eventDuraton =  clonedEvent.duration();
            clonedEvent.start = new Date(clonedEvent.start.getTime() + distance);
            clonedEvent.end = new Date(+clonedEvent.start + eventDuraton);

            var adjustedEvent = this._adjustEvent(clonedEvent);

            var ranges = group.slotRanges(adjustedEvent.occurrence, false);

            this._removeMoveHint();

            //if (!multiday && (getMilliseconds(end) === 0 || getMilliseconds(end) < getMilliseconds(this.startTime()))) {
            //    if (ranges.length > 1) {
            //        ranges.pop();
            //    }
            //}

            for (var rangeIndex = 0; rangeIndex < ranges.length; rangeIndex++) {
                var range = ranges[rangeIndex];
                var startSlot = range.start;

                var hint = this._createEventElement(adjustedEvent.occurrence ,adjustedEvent.occurrence, false, false);

                hint.addClass("k-event-drag-hint");

                var rect = range.innerRect(adjustedEvent.occurrence.start, adjustedEvent.occurrence.end, this.options.snap);
                var width = rect.right - rect.left - 2;

                if (width < 0) {
                   width = 0;
                }

                var css = {
                    left: rect.left,
                    top: startSlot.offsetTop,
                    height: startSlot.offsetHeight - 2,
                    width: width
                };

                hint.css(css);

                this._moveHint = this._moveHint.add(hint);
            }

            var content = this.content;

            this._moveHint.appendTo(content);
        },

        _updateResizeHint: function(event, groupIndex, startTime, endTime) {
            var multiday = false;

            var group = this.groups[groupIndex];

            var ranges = group.ranges(startTime, endTime, false, false);

            this._removeResizeHint();

            for (var rangeIndex = 0; rangeIndex < ranges.length; rangeIndex++) {
                var range = ranges[rangeIndex];
                var start = range.startSlot();

                var startRect = range.innerRect(startTime, endTime, false);
                startRect.top = start.offsetTop;

                var width = startRect.right - startRect.left;
                var height = start.offsetHeight;

                var hint = SchedulerView.fn._createResizeHint.call(this,
                    startRect.left,
                    startRect.top,
                    width,
                    height
                );

                this._resizeHint = this._resizeHint.add(hint);
            }

            var format = "t";
            var container = this.content;

            this._resizeHint.appendTo(container);

            this._resizeHint.find(".k-label-top,.k-label-bottom").text("");

            this._resizeHint.first().addClass("k-first").find(".k-label-top").text(kendo.toString(kendo.timezone.toLocalDate(startTime), format));

            this._resizeHint.last().addClass("k-last").find(".k-label-bottom").text(kendo.toString(kendo.timezone.toLocalDate(endTime), format));
        },

        selectionByElement: function(cell) {
            var offset = cell.offset();
            return this._slotByPosition(offset.left, offset.top);
        },

        _updateDirection: function(selection, ranges, multiple, reverse, vertical) {

            var startSlot = ranges[0].start;
            var endSlot = ranges[ranges.length - 1].end;
            if (multiple && !vertical) {
                if (startSlot.index === endSlot.index &&
                    startSlot.collectionIndex === endSlot.collectionIndex) {
                    selection.backward = reverse;
                }
            }
        },

        _changeGroup: function(selection, previous) {
            var method = previous ? "prevGroupSlot" : "nextGroupSlot";

            var slot = this[method](selection.start, selection.groupIndex, false);

            if (slot) {
                selection.groupIndex += previous ? -1 : 1;
            }

            return slot;
        },

        prevGroupSlot: function(date, groupIndex, isDay) {
            var group = this.groups[groupIndex];
            var slot = group.ranges(date, date, isDay, false)[0].start;

            if (groupIndex <= 0) {
                return;
            }

            if (this._isVerticallyGrouped()) {
                return slot;
            } else {
                //horizontal grouping
            }
        },

        nextGroupSlot: function(date, groupIndex, isDay) {
            var group = this.groups[groupIndex];
            var slot = group.ranges(date, date, isDay, false)[0].start;

            if (groupIndex >= this.groups.length - 1) {
                return;
            }

            if (this._isVerticallyGrouped()) {
                return slot;
            } else {
                //horizontal grouping
            }
        },

        _verticalSlots: function (selection, ranges, multiple, reverse) {
            var method = reverse ? "leftSlot" : "rightSlot";
            var startSlot = ranges[0].start;
            var endSlot = ranges[ranges.length - 1].end;
            var group = this.groups[selection.groupIndex];

            startSlot = group[method](startSlot);
            endSlot = group[method](endSlot);

            if (!multiple && this._isVerticallyGrouped() && (!startSlot || !endSlot)) {
                startSlot = endSlot = this._changeGroup(selection, reverse);
            }

            return {
                startSlot: startSlot,
                endSlot: endSlot
            };
        },

        _horizontalSlots: function (selection, ranges, multiple, reverse) {
            var method = reverse ? "upSlot" : "downSlot";
            var startSlot = ranges[0].start;
            var endSlot = ranges[ranges.length - 1].end;
            var group = this.groups[selection.groupIndex];

            startSlot = group[method](startSlot);
            endSlot = group[method](endSlot);

            return {
                startSlot: startSlot,
                endSlot: endSlot
            };
        },

        _changeViewPeriod: function(selection, reverse, vertical) {
            var date = reverse ? this.previousDate() : this.nextDate();
            var start = selection.start;
            var end = selection.end;

            selection.start = new Date(date);
            selection.end = new Date(date);

            if (!this._isVerticallyGrouped()) {
                selection.groupIndex = reverse ? this.groups.length - 1 : 0;
            }

            var duration = end - start;

            if (reverse) {
                end = getMilliseconds(this.endTime());
                end = end === 0 ? MS_PER_DAY : 0 ;

                //calculate previous range based on calculate dateRange:
                setTime(selection.start, end-duration);
                setTime(selection.end,  end);
            } else {
                start = getMilliseconds(this.startTime());

                setTime(selection.start, start);
                setTime(selection.end, start + duration);
            }

            selection.events = [];

            return true;
        },

        move: function(selection, key, shift) {
            var handled = false;
            var group = this.groups[selection.groupIndex];
            var keys = kendo.keys;

            var ranges = group.ranges(selection.start, selection.end, false, false);
            var startSlot, endSlot, reverse, slots;

            if (key === keys.DOWN || key === keys.UP) {
                handled = true;
                reverse = key === keys.UP;

                this._updateDirection(selection, ranges, shift, reverse, true);

                slots = this._verticalSlots(selection, ranges, shift, reverse);
            } else if (key === keys.LEFT || key === keys.RIGHT) {
                handled = true;
                reverse = key === keys.LEFT;

                this._updateDirection(selection, ranges, shift, reverse, false);

                slots = this._horizontalSlots(selection, ranges, shift, reverse);

                if ((!slots.startSlot ||!slots.endSlot ) && !shift && this._changeViewPeriod(selection, reverse, false)) {
                    return handled;
                }
            }

           if (handled) {
               startSlot = slots.startSlot;
               endSlot = slots.endSlot;

               if (shift) {
                   var backward = selection.backward;

                   if (backward && startSlot) {
                       selection.start = startSlot.startDate();
                   } else if (!backward && endSlot) {
                       selection.end = endSlot.endDate();
                   }
               } else if (startSlot && endSlot) {
                   selection.start = startSlot.startDate();
                   selection.end = endSlot.endDate();
               }

               selection.events = [];
           }

            return handled;
        },


        destroy: function() {
            var that = this;

            if (that.element) {
                that.element.off(NS);
            }

            if (that._currentTimeUpdateTimer) {
                clearInterval(that._currentTimeUpdateTimer);
            }

            SchedulerView.fn.destroy.call(this);
        }
    });
    
    extend(true, ui, {
        TimelineView: TimelineView,
        TimelineWeekView: TimelineView.extend({
            options: {
                name: "TimelineWeekView",
                title: "Timeline Week",
                selectedDateFormat: "{0:D} - {1:D}",
                majorTick: 240
            },
            name: "timelineWeek",
            calculateDateRange: function() {
                var selectedDate = this.options.date,
                    start = kendo.date.dayOfWeek(selectedDate, this.calendarInfo().firstDay, -1),
                    idx, length,
                    dates = [];

                for (idx = 0, length = 7; idx < length; idx++) {
                    dates.push(start);
                    start = kendo.date.nextDay(start);
                }
                this._render(dates);
            }
        }),
        TimelineWorkWeekView: TimelineView.extend({
            options: {
                name: "TimelineWorkWeekView",
                title: "Timeline Work Week",
                selectedDateFormat: "{0:D} - {1:D}",
                majorTick: 240
            },
            name: "timelineWorkWeek",
            nextDate: function() {
                return kendo.date.dayOfWeek(kendo.date.nextDay(this.endDate()), this.options.workWeekStart, 1);
            },
            previousDate: function() {
                return kendo.date.previousDay(this.startDate());
            },
            calculateDateRange: function() {
                var selectedDate = this.options.date,
                    start = kendo.date.dayOfWeek(selectedDate, this.options.workWeekStart, -1),
                    end = kendo.date.dayOfWeek(start, this.options.workWeekEnd, 1),
                    dates = [];

                while (start <= end) {
                    dates.push(start);
                    start = kendo.date.nextDay(start);
                }
                debugger;
                this._render(dates);
            }
        })
    });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
