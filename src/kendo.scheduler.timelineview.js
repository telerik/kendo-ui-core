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

    var EVENT_TEMPLATE = kendo.template('<div>event template</div>' +
                '</div>'),
        DATA_HEADER_TEMPLATE = kendo.template("<span class='k-link k-nav-day'>#=kendo.toString(date, 'ddd M/dd')#</span>"),
        EVENT_WRAPPER_STRING = '<div role="gridcell" class="k-event" aria-selected="false">' +
                '{0}' +
                '</div>';

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

    function toInvariantTime(date) {
        var staticDate = new Date(1980, 1, 1, 0, 0, 0);
        setTime(staticDate, getMilliseconds(date));
        return staticDate;
    }

    var TimelineView = SchedulerView.extend({
        init: function(element, options) {
            var that = this;

            SchedulerView.fn.init.call(that, element, options);

            that.title = that.options.title || that.options.name;

            that._templates();

            that._getColumnCount();

            that.calculateDateRange();

            that._groups();
        },

       _slotByPosition: function(x, y) {
            //To be implemented
            throw "_slotByPosition is not implemented";
       },

       _getColumnCount: function() {
            var options = this.options;
            var msMajorInterval = this._timeSlotInterval();
            var msMin = getMilliseconds(toInvariantTime(options.startTime));
            var msMax = getMilliseconds(toInvariantTime(options.endTime));

            if (msMin != msMax) {
                if (msMin > msMax) {
                    msMax += MS_PER_DAY;
                }

                this._columnCount = ((msMax - msMin) / msMajorInterval);
            }
       },

        options: {
            name: "TimelineView",
            selectedDateFormat: "{0:D}",
            title: "",
            startTime: kendo.date.today(),
            endTime: kendo.date.today(),
            minorTickCount: 2,
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

        _groups: function() {
            var groupCount = 1;
            var columnCount = this._columnCount;

            this.groups = [];
            
            for (var idx = 0; idx < groupCount; idx++) {
                var view = this._addResourceView(idx);

                //for (var columnIndex = 0; columnIndex < columnCount; columnIndex++) {
                    view.addTimeSlotCollection(this._dates[0], kendo.date.addDays(this._dates[0], 1));
                //}
            }

            this._timeSlotGroups(groupCount, columnCount);
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

            //rows currently are always 1
            return {
                columns: columns,
                rows: [{
                    text: ""
                }]
            };
        },

        _content: function(dates) {
            var that = this;
            var options = that.options;
            var start = options.startTime;
            var end = options.endTime;
           

            //add support for more
            var groupsCount = 1;
            var rowCount = 1;
            //======

            var columnCount = that._columnCount;
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

        _render: function(dates) {
            var that = this;

            dates = dates || [];

            that._dates = dates;

            that._startDate = dates[0];

            that._endDate = dates[(dates.length - 1) || 0];

            that.createLayout(that._layout(dates));

            that._content(dates);

            that.refreshLayout();

            
            
            
            
            
            
            
             //To be implemented
            //throw "_render is not implemented";
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

        _timeSlotGroups: function(groupCount, columnCount) {
            //To be implemented
            //throw "_render is not implemented";
            var interval = this._timeSlotInterval();

            var tableRows = this.content.find("tr:not(.k-scheduler-header-all-day)");

            tableRows.attr("role", "row");

            var rowCount = tableRows.length;

            if (this._isVerticallyGrouped()) {
                rowCount = Math.floor(rowCount / groupCount);
            }

            for (var groupIndex = 0; groupIndex < groupCount; groupIndex++) {
                var rowMultiplier = 0;

                if (this._isVerticallyGrouped()) {
                    rowMultiplier = groupIndex;
                }

                var rowIndex = rowMultiplier * rowCount;
                var time;
                var cellMultiplier = 0;

                if (!this._isVerticallyGrouped()) {
                    cellMultiplier = groupIndex;
                }

                while (rowIndex < (rowMultiplier + 1) * rowCount) {
                    var cells = tableRows[rowIndex].children;
                    var group = this.groups[groupIndex];

                    if (rowIndex % rowCount === 0) {
                        time = getMilliseconds(new Date(+this.options.startTime));
                    }

                    for (var cellIndex = cellMultiplier * columnCount; cellIndex < (cellMultiplier + 1) * columnCount; cellIndex++) {
                        var cell = cells[cellIndex];

                        var collectionIndex = 0;

                        var collection = group.getTimeSlotCollection(collectionIndex);

                        var currentDate = this._dates[collectionIndex];

                        var currentTime = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

                        var start = currentTime + time;

                        var end = start + interval;

                        cell.setAttribute("role", "gridcell");
                        cell.setAttribute("aria-selected", false);

                        collection.addTimeSlot(cell, start, end);
                    }

                    time += interval;
                    rowIndex ++;
                }
            }
        },

        nextDate: function() {
            return kendo.date.nextDay(this.endDate());
        },

        previousDate: function() {
            return kendo.date.previousDay(this.startDate());
        },

        calculateDateRange: function() {
            //add support for different intervals - day, week, month
            this._render([this.options.date]);
        },

        destroy: function() {
            var that = this;

            if (that.element) {
                that.element.off(NS);
            }

            SchedulerView.fn.destroy.call(this);
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
            var event;

            var idx;
            var length;
       
            for (idx = 0, length = events.length; idx < length; idx++) {
                event = events[idx];
                var isMultiDayEvent = event.isAllDay || event.end.getTime() - event.start.getTime() >= MS_PER_DAY;
                var container =  this.content;
                if (this._isInTimeSlot(event)) {
                            group = this.groups[groupIndex];
debugger;
                            if (!group._continuousEvents) {
                                group._continuousEvents = [];
                            }

                            ranges = group.slotRanges(event);

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

                                var occurrence = event.clone({ start: start, end: end, startTime: event.startTime, endTime: event.endTime });

                                if (this._isInTimeSlot(occurrence)) {
                                    var head = range.head;

                                    element = this._createEventElement(event, !isMultiDayEvent, head, range.tail);

                                    element.appendTo(container);

                                    this._positionEvent(occurrence, element, range);

                                    addContinuousEvent(group, range, element, false);
                                }
                            }
                        }
            }
        },
        _isInTimeSlot: function(event) {
            var slotStartTime = this.startTime(),
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

            if(slotStartTime === startTime && startTime === endTime) {
                return true;
            }

            var overlaps = startTime !== slotEndTime;

            return isInTimeRange(startTime, slotStartTime, slotEndTime, overlaps) ||
                isInTimeRange(endTime, slotStartTime, slotEndTime, overlaps) ||
                isInTimeRange(slotStartTime, startTime, endTime) ||
                isInTimeRange(slotEndTime, startTime, endTime);
        }, 
        _createEventElement: function(event, isOneDayEvent, head, tail) {
            var template = isOneDayEvent ? this.eventTemplate : this.allDayEventTemplate;
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
            
            if (!isOneDayEvent && !event.isAllDay) {
                endDate = new Date(endDate.getTime() + MS_PER_DAY);
            }
            
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
            var start = event.startTime || event.start;
            var end = event.endTime || event.end;

            var rect = slotRange.innerRect(start, end, false);

            var height = rect.bottom - rect.top - 2; /* two times border width */
            var width = rect.right - rect.left -2;
            debugger;
            if (width < 0) {
                width = 0;
            }
            
            if (height < 0) {
                height = 0;
            }

            element.css( {
                top: 0,
                height: height,
                width: width,
                left: rect.left
            } );

            this._arrangeColumns(element, rect.top, element[0].clientHeight, slotRange);
       },
 
     
    });
    
    extend(true, ui, {
        TimelineView: TimelineView
    });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
