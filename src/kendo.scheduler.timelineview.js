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
                    '# if(data.tail || data.middle) {#' +
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
                    '# if(data.head || data.middle) {#' +
                        '<span class="k-icon k-i-arrow-e"></span>' +
                    '#}#' +
                '</span>' +
                '#if(resizable && !data.tail && !data.middle){#' +
                '<span class="k-resize-handle k-resize-w"></span>' +
                '#}#' +
                '#if(resizable && !data.head && !data.middle){#' +
                '<span class="k-resize-handle k-resize-e"></span>' +
                '#}#' +
                '</div>';

    function times(rowLevels, rowCount) {
        var rows = new Array(rowCount).join().split(",");
        var rowHeaderRows = [];
        var rowIndex;

        for (var rowLevelIndex = 0; rowLevelIndex < rowLevels.length; rowLevelIndex++) {
            var level = rowLevels[rowLevelIndex];
            var rowspan = rowCount / level.length;
            var className;

            for (rowIndex = 0; rowIndex < level.length; rowIndex++) {
                className = level[rowIndex].className || "";

                if (level[rowIndex].allDay) {
                    className = "k-scheduler-times-all-day";
                }

                rows[rowspan * rowIndex] += '<th class="' + className + '" rowspan="' + rowspan + '">' + level[rowIndex].text + "</th>";
            }
        }

        for (rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            rowHeaderRows.push(rows[rowIndex]);
        }

        if (rowCount < 1) {
            return $();
        }

        return $('<div class="k-scheduler-times">' + table(rowHeaderRows) + '</div>');
    }

    function toInvariantTime(date) {
        var staticDate = new Date(1980, 1, 1, 0, 0, 0);
        setTime(staticDate, getMilliseconds(date));
        return staticDate;
    }

    function isInDateRange(value, min, max) {
        return value >= min && value <= max;
    }

    function isInTimeRange(value, min, max, overlaps) {
        overlaps = overlaps ? value <= max : value < max;
        return value > min && overlaps;
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
        },
        name: "timeline",

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

            this._columnCount = Math.round(columnCount)
       },

        options: {
            name: "TimelineView",
            selectedDateFormat: "{0:D}",
            title: "",
            date: kendo.date.today(),
            startTime: kendo.date.today(),
            endTime: kendo.date.today(),
            minorTickCount: 2,
            editable: true,
            //new option
            numberOfDays: 1,
            majorTick: 60,
            majorTimeHeaderTemplate: "#=kendo.toString(date, 't')#",
            minorTimeHeaderTemplate: "&nbsp;",
            slotTemplate: "&nbsp;",
            eventTemplate: EVENT_TEMPLATE,
            dateHeaderTemplate: DATA_HEADER_TEMPLATE
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

            that.createLayout(that._layout(dates));

            that._content(that._columnCount * that._dates.length);

            that.refreshLayout();
        },

        _layout: function(dates) {
            var columns = [];
            var rows = [];
            var that = this;
            var options = that.options;
            var columnCount = that._columnCount;
            var columnTimeFormat;
            var msMajorInterval = that._timeSlotInterval();

            if (msMajorInterval >= MS_PER_DAY) {
                columnTimeFormat = "{0:M}";
            } else {
                //use :
                //columnTimeFormat = "{0:t}";
                columnTimeFormat = "{0:HH:mm}";
            }
            
            for (var idx = 0; idx < dates.length; idx++) {
                for (var columnIndex = 0; columnIndex < columnCount; columnIndex++) { 
                    var column = {};
                    var columnOffset = (+options.startTime) + (msMajorInterval * columnIndex);
                    
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
                //1) current - loop throught the dates - this way the current date is available directly by index
                //2) another - loop throught all cells for given row and get date from deviding index by column index
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

                        collection.addTimeSlot(cell, start, end);

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
            return msMajorInterval = options.majorTick * kendo.date.MS_PER_MINUTE;
        },

        nextDate: function () {
            return kendo.date.nextDay(this.endDate());
        },
        previousDate: function () {
            var daysToSubstract = -Math.abs(this.options.numberOfDays); //get the negative value of numberOfDays
            var startDate = kendo.date.addDays(this.startDate(), daysToSubstract); //substract the dates
            return startDate;
        },

        calculateDateRange: function() {
            //add support for different intervals - day, week, month
            var selectedDate = this.options.date,
                      numberOfDays = Math.abs(this.options.numberOfDays),
                      start = selectedDate,
                      idx, length,
                      dates = [];

            for (idx = 0, length = numberOfDays; idx < length; idx++) {
                dates.push(start);
                start = kendo.date.nextDay(start);
            }
            this._render(dates);
            //this._render([this.options.date, kendo.date.addDays(this.options.date, 1)]);
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

        _renderEvents: function(events, groupIndex) {
            //todo
            var event;

            var idx;
            var length;
       
            for (idx = 0, length = events.length; idx < length; idx++) {
                event = events[idx];

                if (this._isInDateSlot(event)) {
                    var isMultiDayEvent = event.isAllDay || event.end.getTime() - event.start.getTime() >= MS_PER_DAY;
                    var container = this.content;

                    //timeslot means viewStartTime & view.endTime
                    if (isMultiDayEvent || this._isInTimeSlot(event)) {
                        console.log("event for rendering");
                        console.log(event);

                        group = this.groups[groupIndex];

                        if (!group._continuousEvents) {
                            group._continuousEvents = [];
                        }

                        var start = event.start;
                        var end = event.end;
                        var occurrence;

                        //detect and fix events that end at slot hole
                        //experiment:
                        var startTime = getMilliseconds(this.startTime());
                        var endTime = getMilliseconds(this.endTime());
                        //endTime = endTime != 0 ? endTime : MS_PER_DAY;
                        var eventStartTime = event._time("start");
                        var eventEndTime = event._time("end");
                        var tail = false;
                        var head = false;


                        //case1: starts before viewStart, ends after viewEnd
                        //case: starts before viewStart and ends before view start
                        if (event.isAllDay) {
                            var startDate = getDate(start);
                            if (startTime > eventStartTime) {
                                setTime(startDate, startTime);
                                tail = true;
                            }

                            var endDate = getDate(end);

                            if (endTime === getMilliseconds(getDate(this.endTime()))) {
                                endDate = kendo.date.addDays(endDate, 1);
                            } else {
                                setTime(endDate, endTime);
                                head = true;
                            }

                            occurrence = event.clone({
                                start: startDate,
                                end: endDate,
                                startTime: event.startTime,
                                endTime: event.endTime,
                                isAllDay: false
                            });

                        } else {
                            var startDate;
                            var endDate;

                            //startTime = 0 is marking only start of event range

                            if (startTime > eventStartTime) {
                                startDate = getDate(start);
                                setTime(startDate, startTime);
                                tail = true;
                                console.log("adjust startTime " + event.uid);
                            } else if ((endTime === 0 ? MS_PER_DAY : endTime ) < eventStartTime) {
                                startDate = getDate(start);
                                //in case the date should be moved to next date
                                kendo.date.addDays(startDate,1);

                                setTime(startDate, startTime);
                                tail = true;
                                console.log("adjust startTime " + event.uid);
                            }

                            if ((endTime === 0 ? MS_PER_DAY : endTime ) < eventEndTime) {
                                endDate = getDate(end);
                                //endDate = getDate(endDate);
                                setTime(endDate, endTime);
                                head = true;
                                console.log("adjust endTime");
                            } else if ((endTime === 0 ? MS_PER_DAY : endTime ) < startTime) {
                                endDate = getDate(end);
                                kendo.date.addDays(endDate,-1);
                                //endDate = getDate(endDate);
                                setTime(endDate, endTime);
                                head = true;
                                console.log("adjust endTime");
                            }

                            occurrence = event.clone({
                                start: startDate ? startDate : start,
                                end: endDate ? endDate : end,
                                startTime: event.startTime,
                                endTime: event.endTime
                            });
                        }

                        //if (endTime != 0 && endTime < eventEndTime || startTime > eventEndTime  ) {
                        //    var endDate = getDate(occurrence.end);
                        //    if (event.isAllDay) {

                        //    } else {
                        //        setTime(endDate, endTime);
                        //    }


                        //    occurrence.end = endDate;
                        //    head = true;
                        //    console.log("end time adjust");
                        //}

                        //if (isMultiDayEvent) {
                        //    ranges = group.customSlotRanges(occurrence);
                        //} else {
                        ranges = group.slotRanges(occurrence, false);
                        //}

                        var rangeCount = ranges.length;

                        for (var rangeIndex = 0; rangeIndex < rangeCount; rangeIndex++) {
                            var range = ranges[rangeIndex];

                            //if (rangeCount > 1) {
                            //    if (rangeIndex === 0) {
                            //        end = range.end.endDate();
                            //    } else if (rangeIndex == rangeCount - 1) {
                            //        start = range.start.startDate();
                            //    } else {
                            //        start = range.start.startDate();
                            //        end = range.end.endDate();
                            //    }
                            //}
                            if (this._isInTimeSlot(occurrence)) {//} || event.isAllDay) {
                                console.log("second check passed");

                                element = this._createEventElement(occurrence, event, true, range.head || head, range.tail || tail);
                                element.appendTo(container);
                                this._positionEvent(occurrence, element, range);

                                //?add support
                                //addContinuousEvent(group, range, element, false);
                            }
                        }
                    }

                }

            }
        },

        _isInDateSlot: function(event) {
            var groups = this.groups[0];
            var slotStart = groups.firstSlot().start;
            var slotEnd = groups.lastSlot().end - 1;

            var startTime = kendo.date.toUtcTime(event.start);
            //var endTime = kendo.date.toUtcTime(kendo.date.addDays(event.end,1));
            var endTime = kendo.date.toUtcTime(event.end);

            return (isInDateRange(startTime, slotStart, slotEnd) ||
                isInDateRange(endTime, slotStart, slotEnd) ||
                isInDateRange(slotStart, startTime, endTime) ||
                isInDateRange(slotEnd, startTime, endTime)) &&
                (!isInDateRange(endTime, slotStart, slotStart) || isInDateRange(endTime, startTime, startTime)|| event.isAllDay);
        },

        _isInTimeSlot: function(event) {
            //experiment start
            var dates = this._dates;
            var slotStartTime = this.startTime(),
                slotEndTime = this.endTime(),
                startTime = event.startTime || event.start,
                endTime = event.endTime || event.end;

            //za kakvo se otnasq endTime ? A) krai ili B) na4alo
            if (getMilliseconds(slotEndTime) === getMilliseconds(kendo.date.getDate(slotEndTime))) {
                slotEndTime = kendo.date.getDate(slotEndTime);
                setTime(slotEndTime, MS_PER_DAY - 1);
            }

            slotEndTime = getMilliseconds(slotEndTime);
            slotStartTime = getMilliseconds(slotStartTime);

            var slotRanges = [];
            for (i = 0; i < dates.length; i++) {
                var rangeStart = getDate(dates[i]);
                setTime(rangeStart, slotStartTime);

                var rangeEnd = getDate(dates[i]);
                setTime(rangeEnd, slotEndTime);

                slotRanges.push({
                    //make sure the date
                    start: rangeStart,
                    end: rangeEnd
                });
            }

            var hiddenZoneLength = slotStartTime + (MS_PER_DAY - slotEndTime);
            var eventLength = (endTime - event._date("end")) - (startTime - event._date("start"));

            var overlaps = startTime !== slotEndTime;
            for (var slotIndex = 0; slotIndex < slotRanges.length; slotIndex++) {
                //x1 <= y2 && y1 <= x2
                //needs additional check only for exceptions
                if (+startTime <= +slotRanges[slotIndex].end && +slotRanges[slotIndex].start <= +endTime) {
                    return true;
                }
            }
            return false;
            //experiment end

            /*var slotStartTime = this.startTime(),
                slotEndTime = this.endTime(),
                startTime = event.startTime || event.start,
                endTime = event.endTime || event.end;

            if (getMilliseconds(slotEndTime) === getMilliseconds(kendo.date.getDate(slotEndTime))) {
                slotEndTime = kendo.date.getDate(slotEndTime);
                setTime(slotEndTime, MS_PER_DAY - 1);
            }

            if (event._date("end") > event._date("start")) {
                endTime = +event._date("end") + (MS_PER_DAY - 1);
            }

            endTime = endTime - event._date("end");

            startTime = startTime - event._date("start");
            slotEndTime = getMilliseconds(slotEndTime);
            slotStartTime = getMilliseconds(slotStartTime);

            if (slotStartTime === startTime && startTime === endTime) {
                return true;
            }

            var overlaps = startTime !== slotEndTime;

            var hiddenZoneLength = slotStartTime + (MS_PER_DAY - slotEndTime);
            var eventLength = endTime >= startTime ? endTime - startTime : (MS_PER_DAY - startTime) + endTime;

            return isInTimeRange(startTime, slotStartTime, slotEndTime, overlaps) ||
            isInTimeRange(endTime, slotStartTime, slotEndTime, overlaps) ||
            isInTimeRange(slotStartTime, startTime, endTime) ||
            isInTimeRange(slotEndTime, startTime, endTime) ||
            (eventLength > hiddenZoneLength &&
                (!isInTimeRange(startTime, slotStartTime, slotEndTime) ||
                !isInTimeRange(endTime, slotStartTime, slotEndTime))) ; */ //||
            //((isInTimeRange(endTime, slotStartTime, MS_PER_DAY) ||
            //    isInTimeRange(startTime, 0, slotEndTime)) && event._date("end") > event._date("start"));
        },

        _createEventElement: function(occurrence, event, isOneDayEvent, head, tail) {
            //todo
            //var template = isOneDayEvent ? this.eventTemplate : this.allDayEventTemplate;
            var template = this.eventTemplate;
            var options = this.options;
            var editable = options.editable;
            var isMobile = this._isMobile();
            var showDelete = editable && editable.destroy !== false && !isMobile;
            var resizable = editable && editable.resize !== false;
            var startDate = getDate(this.startDate());
            var endDate = getDate(this.endDate());
            var startTime = getMilliseconds(this.startTime());
            var endTime = getMilliseconds(this.endTime());
            var eventStartTime = event._time("start");
            var eventEndTime = event._time("end");
            var middle;

            if (startTime >= endTime) {
                endTime = getMilliseconds(new Date(this.endTime().getTime() + MS_PER_DAY - 1));
            }

            ////fake end time
            //if (!isOneDayEvent && !event.isAllDay) {
            //    endDate = new Date(endDate.getTime() + MS_PER_DAY - 1);
            //}

            var eventStartDate = event.start;
            var eventEndDate = event.end;

            if ((!isInDateRange(getDate(eventStartDate), startDate, endDate) &&
                !isInDateRange(eventEndDate, startDate, endDate)) ||
                (isOneDayEvent && eventStartTime < startTime && eventEndTime > endTime)) {
                middle = true;
            } else if (getDate(eventStartDate) < startDate || (isOneDayEvent && eventStartTime < startTime)) {
                tail = true;
            } else if ((eventEndDate > endDate && !isOneDayEvent) || (isOneDayEvent && eventEndTime > endTime)) {
                head = true;
            }

            //include in the above if statement ?
            //console.log(startTime);
            //console.log(eventStartTime);
            //if (startTime > eventStartTime) {
            //    tail = true;
            //}
//
            //if (endTime < eventEndTime) {
            //    head = true;
            //}

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
                middle: middle,
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
            //todo
            //var slotWidth = slotRange.innerWidth();
            var slotWidth = slotRange.start.clientWidth;
            var startIndex = slotRange.start.index;
            var endIndex = slotRange.end.index;

            var allDayEvents = SchedulerView.collidingEvents(slotRange.events(), startIndex, endIndex);

            var currentColumnCount = this._headerColumnCount || 0;

            var leftOffset = 2;

            var rightOffset = startIndex !== endIndex ? 5 : 4;

            var start = event.startTime || event.start;
            var end = event.endTime || event.end;

            var rect = slotRange.outerRect(start, end, false);
            rect.top = slotRange.start.offsetTop;

            var height = rect.bottom - rect.top - 2; /* two times border width */
            var width = rect.right - rect.left -2;
            console.log(width);
            if (width < 0) {
                width = 0;
            }

            if (height < 0) {
                height = 0;
            }

            var eventHeight = height;

            element
                .css({
                    left: rect.left,
                    width: width,
                    height: "20px"
                });

            slotRange.addEvent({ slotIndex: startIndex, start: startIndex, end: endIndex, element: element });

            //allday events only ?
            allDayEvents.push({ slotIndex: startIndex, start: startIndex, end: endIndex, element: element });

            var rows = SchedulerView.createRows(allDayEvents);

            if (rows.length && rows.length > currentColumnCount) {
                this._headerColumnCount = rows.length;
            }

            var top = slotRange.start.offsetTop;

            for (var idx = 0, length = rows.length; idx < length; idx++) {
                var rowEvents = rows[idx].events;
                var date = new Date();

                for (var j = 0, eventLength = rowEvents.length; j < eventLength; j++) {
                    $(rowEvents[j].element).css({
                        //need update
                        top: top + idx * eventHeight
                    });
                }
            }

            //var start = event.startTime || event.start;
            //var end = event.endTime || event.end;
            //
            //var rect = slotRange.innerRect(start, end, false);
            //rect.top = slotRange.start.offsetTop;
            //
            //var height = rect.bottom - rect.top - 2; /* two times border width */
            //var width = rect.right - rect.left -2;
            //
            //if (width < 0) {
            //    width = 0;
            //}
            //
            //if (height < 0) {
            //    height = 0;
            //}
            //
            ////need update
            //element.css( {
            //    top:rect.top,
            //    height: height,
            //    width: width,
            //    left: rect.left,
            //    "min-height": 10 //update?
            //} );
            //
            ////JUST ADDED - > need update as it should align the events by rows not by columns
            //this._arrangeColumns(element, rect.top, element[0].clientHeight, slotRange);
        },

        _groupCount: function() {
            var resources = this.groupedResources;

            if (resources.length) {
                isVerticalGroupped = this._groupOrientation() === "vertical";
                if (isVerticalGroupped) {
                    return this._rowCountForLevel(this.rowLevels.length - 1);
                }
            }
            return 1;
        },

        _rowCountForLevel: function(level) {
            var rowLevel = this.rowLevels[level];
            return rowLevel ? rowLevel.length : 0;
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

        destroy: function() {
            var that = this;

            if (that.element) {
                that.element.off(NS);
            }

            SchedulerView.fn.destroy.call(this);
        }
    });
    
    extend(true, ui, {
        TimelineView: TimelineView
    });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
