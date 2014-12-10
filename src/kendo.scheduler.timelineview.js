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
        MS_PER_MINUTE = kendo.date.MS_PER_MINUTE,
        NS = ".kendoTimelineView";

    var EVENT_TEMPLATE = kendo.template('<div>' +
        '<div class="k-event-template k-event-time">#:kendo.format("{0:t} - {1:t}", start, end)#</div>' +
        '<div class="k-event-template">${title}</div></div>'),
        DATA_HEADER_TEMPLATE = kendo.template("<span class='k-link k-nav-day'>#=kendo.format('{0:m}', date)#</span>"),
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

    function getWorkDays(options) {
        var workDays = [];
        var dayIndex = options.workWeekStart;

        workDays.push(dayIndex);

        while(options.workWeekEnd != dayIndex) {
            if(dayIndex > 6 ) {
                dayIndex -= 7;
            } else {
                dayIndex++;
            }
            workDays.push(dayIndex);
        }
        return workDays;
    }

    function setColspan(columnLevel) {
        var count = 0;
        if (columnLevel.columns) {
            for (var i = 0; i < columnLevel.columns.length; i++) {
                count += setColspan(columnLevel.columns[i]);
            }
            columnLevel.colspan = count;
            return count;
        } else {
            columnLevel.colspan = 1;
            return 1;
        }
    }

    var TimelineView = SchedulerView.extend({
        init: function(element, options) {
            var that = this;

            SchedulerView.fn.init.call(that, element, options);

            that.title = that.options.title || that.options.name;

            that._workDays = getWorkDays(that.options);

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
           var content = this.content;
           var offset = content.offset();
           var group;
           var groupIndex;

           x -= offset.left;
           y -= offset.top;

           if (this._isRtl) {
               var browser = kendo.support.browser;

               if (browser.mozilla) {
                    x += (content[0].scrollWidth - content[0].offsetWidth);
                    x += content[0].scrollLeft;
               } else if (browser.msie) {
                    x -= content.scrollLeft();
                    x += content[0].scrollWidth - this.content[0].offsetWidth;
               } else if (browser.webkit) {
                    x += content[0].scrollLeft;
               }
           } else {
               x += content[0].scrollLeft;
           }

           y += content[0].scrollTop;

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

        options: {
            name: "TimelineView",
            title: "Timeline",
            selectedDateFormat: "{0:D}",
            date: kendo.date.today(),
            startTime: kendo.date.today(),
            endTime: kendo.date.today(),
            showWorkHours: false,
            minorTickCount: 2,
            editable: true,
            workDayStart: new Date(1980, 1, 1, 8, 0, 0),
            workDayEnd: new Date(1980, 1, 1, 17, 0, 0),
            workWeekStart: 1,
            workWeekEnd: 5,
            majorTick: 60,
            eventHeight: 25,
            columnWidth: 100,
            groupHeaderTemplate: "#=text#",
            majorTimeHeaderTemplate: "#=kendo.toString(date, 't')#",
            slotTemplate: "&nbsp;",
            eventTemplate: EVENT_TEMPLATE,
            dateHeaderTemplate: DATA_HEADER_TEMPLATE,
            footer: {
                command: "workDay"
            },
            currentTimeMarker: {
                updateInterval: 10000,
                useLocalTimezone: true
            },
            messages: {
                defaultRowText: "All events",
                showFullDay: "Show full day",
                showWorkDay: "Show business hours"
            }
        },

        events: ["remove", "add", "edit"],

        _templates: function() {
            var options = this.options,
                settings = extend({}, kendo.Template, options.templateSettings);

            this.eventTemplate = this._eventTmpl(options.eventTemplate, EVENT_WRAPPER_STRING);
            this.majorTimeHeaderTemplate = kendo.template(options.majorTimeHeaderTemplate, settings);
            this.dateHeaderTemplate = kendo.template(options.dateHeaderTemplate, settings);
            this.slotTemplate = kendo.template(options.slotTemplate, settings);
            this.groupHeaderTemplate = kendo.template(options.groupHeaderTemplate, settings);
        },

        _render: function(dates) {
            var that = this;
            dates = dates || [];

            that._dates = dates;

            that._startDate = dates[0];

            that._endDate = dates[(dates.length - 1) || 0];

            that._calculateSlotRanges();

            that.createLayout(that._layout(dates));

            that._content(dates);

            that._footer();

            that._setContentWidth();

            that.refreshLayout();

            that.datesHeader.on("click" + NS, ".k-nav-day", function(e) {
                var th = $(e.currentTarget).closest("th");

                var slot = that._slotByPosition(th.offset().left, that.content.offset().top);

                that.trigger("navigate", { view: "timeline", date: slot.startDate() });
            });

            that.timesHeader.find("table tr:last").hide(); /*Chrome fix, use CSS selector*/
            that.datesHeader.find("table tr:last").hide();
        },

        _setContentWidth: function() {
            var content = this.content;
            var contentWidth = content.width();
            var contentTable = this.content.find("table");
            var columnCount = contentTable.find("tr:first").children().length;

            var minWidth = 100;
            var calculatedWidth = columnCount * this.options.columnWidth;

            if (contentWidth < calculatedWidth) {
                minWidth = Math.ceil((calculatedWidth / contentWidth) * 100);
            }

            contentTable.add(this.datesHeader.find("table"))
                .css("width", minWidth + "%");
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

        _forTimeRange: function(min, max, action, after) {
            min = toInvariantTime(min); //convert the date to 1/2/1980 and sets the time
            max = toInvariantTime(max);

            var that = this,
                msMin = getMilliseconds(min),
                msMax = getMilliseconds(max),
                minorTickCount = that.options.minorTickCount,
                msMajorInterval = that.options.majorTick * MS_PER_MINUTE,
                msInterval = msMajorInterval / minorTickCount || 1,
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
                var majorTickDivider = idx % (msMajorInterval/msInterval);
                var isMajorTickColumn = majorTickDivider === 0;
                var isMiddleColumn = majorTickDivider < minorTickCount - 1;
                var isLastSlotColumn = majorTickDivider === minorTickCount - 1;
                var minorTickColumns = minorTickCount;

                if (length % minorTickCount !== 0) {
                    var isLastMajorSlot = (length - (idx + 1)) < minorTickCount;
                    if (isMajorTickColumn && isLastMajorSlot) {
                        minorTickColumns = length % minorTickCount;
                    }
                }

                html += action(start, isMajorTickColumn, isMiddleColumn, isLastSlotColumn, minorTickColumns);

                setTime(start, msInterval, false);
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

        _layout: function(dates) {
            var timeColumns = [];
            var columns = [];
            var that = this;
            var rows = [{ text: that.options.messages.defaultRowText }];

            var minorTickSlots = [];
            for (var minorTickIndex = 0; minorTickIndex < that.options.minorTickCount; minorTickIndex++) {
                minorTickSlots.push({
                    text: "",
                    className: ""
                });
            }

            this._forTimeRange(that.startTime(), that.endTime(), function(date, majorTick, middleColumn, lastSlotColumn, minorSlotsCount) {
                var template = that.majorTimeHeaderTemplate;

                if (majorTick) {
                    var timeColumn = {
                        text: template({ date: date }),
                        className: lastSlotColumn ? "k-slot-cell" : "",
                        columns: minorTickSlots.slice(0, minorSlotsCount)
                    };
                    setColspan(timeColumn);
                    timeColumns.push(timeColumn);
                }
            });

            for (var idx = 0; idx < dates.length; idx++) {
                columns.push({
                    text: that.dateHeaderTemplate({ date: dates[idx] }),
                    className:  "k-slot-cell",
                    columns: timeColumns.slice(0)
                });
            }

            var resources = this.groupedResources;
            if (resources.length) {
                if (this._groupOrientation() === "vertical") {
                    rows = that._createRowsLayout(resources, null, this.groupHeaderTemplate);
                } else {
                    columns = that._createColumnsLayout(resources, columns, this.groupHeaderTemplate);
                }
            }

            return {
                columns: columns,
                rows: rows
            };
        },

        _footer: function() {
            var options = this.options;

            if (options.footer !== false) {
                var html = '<div class="k-header k-scheduler-footer">';

                var command = options.footer.command;

                if (command && command === "workDay") {
                    html += '<ul class="k-reset k-header">';

                    html += '<li class="k-state-default k-scheduler-fullday"><a href="#" class="k-link"><span class="k-icon k-i-clock"></span>';
                    html += (options.showWorkHours ? options.messages.showFullDay : options.messages.showWorkDay) + '</a></li>';

                    html += '</ul>';

                } else {
                    html += "&nbsp;";
                }

                html += "</div>";

                this.footer = $(html).appendTo(this.element);

                var that = this;

                this.footer.on("click" + NS, ".k-scheduler-fullday", function(e) {
                    e.preventDefault();
                    that.trigger("navigate", { view: that.name || options.name, date: that.startDate(), isWorkDay: !options.showWorkHours });
                });
            }
        },

        _columnCountForLevel: function(level) {
            var columnLevel = this.columnLevels[level];
            return columnLevel ? columnLevel.length : 0;
        },

        _rowCountForLevel: function(level) {
            var rowLevel = this.rowLevels[level];
            return rowLevel ? rowLevel.length : 0;
        },

        _isWorkDay: function(date) {
            var day = date.getDay();
            var workDays =  this._workDays;

            for (var i = 0; i < workDays.length; i++) {
                if (workDays[i] === day) {
                    return true;
                }
            }
            return false;
        },

        _content: function(dates) {
            var that = this;
            var options = that.options;
            var start = that.startTime();
            var end = this.endTime();
            var groupsCount = 1;
            var rowCount = 1;
            var columnCount = dates.length;
            var html = '';
            var resources = this.groupedResources;
            var slotTemplate = this.slotTemplate;
            var isVerticalGrouped = false;

            if (resources.length) {
                isVerticalGrouped = that._groupOrientation() === "vertical";

                if (isVerticalGrouped) {
                    rowCount = that._groupCount();
                } else {
                    groupsCount = that._groupCount();
                }
            }

            html += '<tbody>';

            var appendRow = function(date, majorTick) {
                var content = "";
                var classes = "";
                var tmplDate;

                var resources = function(groupIndex) {
                    return function() {
                        return that._resourceBySlot({ groupIndex: groupIndex });
                    };
                };

                if (kendo.date.isToday(dates[idx])) {
                    classes += "k-today";
                }

                if (kendo.date.getMilliseconds(date) < kendo.date.getMilliseconds(options.workDayStart) ||
                    kendo.date.getMilliseconds(date) >= kendo.date.getMilliseconds(options.workDayEnd) ||
                    !that._isWorkDay(dates[idx])) {
                    classes += " k-nonwork-hour";
                }

                content += '<td' + (classes !== "" ? ' class="' + classes + '"' : "") + ">";
                tmplDate = kendo.date.getDate(dates[idx]);
                kendo.date.setTime(tmplDate, kendo.date.getMilliseconds(date));

                content += slotTemplate({ date: tmplDate, resources: resources(isVerticalGrouped ? rowIdx : groupIdx) });
                content += "</td>";

                return content;
            };


            for (var rowIdx = 0; rowIdx < rowCount; rowIdx++) {
                html += '<tr>';

                for (var groupIdx = 0 ; groupIdx < groupsCount; groupIdx++) {
                    for (var idx = 0, length = columnCount; idx < length; idx++) {
                        html += this._forTimeRange(start, end, appendRow);
                    }
                }

                html += "</tr>";
            }

            html += '</tbody>';

            this.content.find("table").append(html);
        },

        _groups: function() {
            var groupCount = this._groupCount();
            var dates = this._dates;
            var columnCount = dates.length;

            this.groups = [];

            for (var idx = 0; idx < groupCount; idx++) {
                var view = this._addResourceView(idx);

                var start = dates[0];
                var end = dates[(dates.length - 1) || 0];
                view.addTimeSlotCollection(start, kendo.date.addDays(end, 1));
            }

            this._timeSlotGroups(groupCount, columnCount);
        },

        _isVerticallyGrouped: function() {
            return this.groupedResources.length && this._groupOrientation() === "vertical";
        },

        _isHorizontallyGrouped: function() {
            return this.groupedResources.length && this._groupOrientation() === "horizontal";
        },

        _timeSlotGroups: function (groupCount, datesCount) {
            var interval = this._timeSlotInterval();
            var isVerticallyGrouped = this._isVerticallyGrouped();
            var tableRows = this.content.find("tr");
            var rowCount = tableRows.length;

            tableRows.attr("role", "row");

            if (isVerticallyGrouped) {
                rowCount = Math.floor(rowCount / groupCount);
            }

            for (var groupIndex = 0; groupIndex < groupCount; groupIndex++) {
                var rowMultiplier = 0;
                var group = this.groups[groupIndex];
                var time;

                if (isVerticallyGrouped) {
                    rowMultiplier = groupIndex;
                }

                var rowIndex = rowMultiplier * rowCount;
                var cellMultiplier = 0;

                if (!isVerticallyGrouped) {
                    cellMultiplier = groupIndex;
                }

                var cells = tableRows[rowIndex].children;
                var cellsPerGroup = cells.length / (!isVerticallyGrouped ? groupCount : 1);
                var cellsPerDay = cellsPerGroup / datesCount;

                for (var dateIndex = 0; dateIndex < datesCount; dateIndex++) {
                    var cellOffset = dateIndex * cellsPerDay + (cellsPerGroup * cellMultiplier);
                    time = getMilliseconds(new Date(+this.startTime()));

                    for (var cellIndex = 0; cellIndex < cellsPerDay ; cellIndex++) {
                        var cell = cells[cellIndex+cellOffset];
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
            return options.showWorkHours ? options.workDayStart : options.startTime;
        },

        endTime: function() {
            var options = this.options;
            return options.showWorkHours ? options.workDayEnd : options.endTime;
        },

        _timeSlotInterval: function() {
            var options = this.options;
            return (options.majorTick/options.minorTickCount) * MS_PER_MINUTE;
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

            var eventsPerDate = $.map(this._dates, function(date) {
                return Math.max.apply(null,
                    $.map(eventsByResource, function(events) {
                        return $.grep(events, function(event) {
                            return isInDateRange(date, getDate(event.start), getDate(event.end));
                        }).length;
                    })
                );
            });

            var eventGroups = [];
            var maxRowCount = 0;

            for (var groupIndex = 0; groupIndex < eventsByResource.length; groupIndex++) {
                var eventGroup = {
                    groupIndex: groupIndex,
                    maxRowCount: 0,
                    events: {}
                };

                eventGroups.push(eventGroup);

                this._renderEvents(eventsByResource[groupIndex], groupIndex, eventGroup);

                if (maxRowCount < eventGroup.maxRowCount) {
                    maxRowCount = eventGroup.maxRowCount;
                }
            }

            this._setRowsHeight(eventGroups, eventsByResource.length, maxRowCount);

            this._positionEvents(eventGroups, eventsByResource.length);

            this.trigger("activate");
        },

        _positionEvents: function(eventGroups, groupsCount) {
            for (var groupIndex = 0; groupIndex < groupsCount; groupIndex++) {
                var eventsForGroup = eventGroups[groupIndex].events;
                for (var eventUid in eventsForGroup) {
                    var eventObject = eventsForGroup[eventUid];
                    this._positionEvent(eventObject);
                }
            }
        },

        _setRowsHeight: function(eventGroups, groupsCount, maxRowCount) {
            var eventHeight = this.options.eventHeight + 2;/* two times border width */
            var eventBottomOffset = this._getBottomRowOffset();

            groupsCount = this._isVerticallyGrouped() ? groupsCount : 1;
            for (var groupIndex = 0; groupIndex < groupsCount; groupIndex++) {
                var rowsCount = this._isVerticallyGrouped() ? eventGroups[groupIndex].maxRowCount : maxRowCount;

                rowsCount = rowsCount ? rowsCount : 1;

                var rowHeight = ((eventHeight + 2) * rowsCount) + eventBottomOffset;
                var timesRow = this.times.find(kendo.format("tr:nth-child({0})",  groupIndex + 1));
                var row = this.content.find(kendo.format("tr:nth-child({0})",  groupIndex + 1));

                timesRow.height(rowHeight);
                row.height(rowHeight);
            }


            this._setContentWidth();
            this.refreshLayout();
            this._refreshSlots();
        },

        _getBottomRowOffset: function() {
            var eventBottomOffset = this.options.eventHeight * 0.50;
            var isMobile = this._isMobile();
            var minOffset;
            var maxOffset;

            if (isMobile) {
                minOffset = 30;
                maxOffset = 60;
            } else {
                minOffset = 15;
                maxOffset = 30;
            }

            if (eventBottomOffset > maxOffset) {
                eventBottomOffset = maxOffset;
            } else if (eventBottomOffset < minOffset) {
                eventBottomOffset = minOffset;
            }

            return eventBottomOffset;
        },

        _positionEvent: function(eventObject) {
            var eventHeight = this.options.eventHeight + 2;

            var rect = eventObject.slotRange.innerRect(eventObject.start, eventObject.end, false);

            rect.top = eventObject.slotRange.start.offsetTop;
            var width = rect.right - rect.left - 2;

            if (width < 0) {
                width = 0;
            }

            var left = rect.left;
            if (this._isRtl) {
                left -= (this.content[0].scrollWidth - this.content[0].offsetWidth);
            }

            eventObject.element.css({
                top:  eventObject.slotRange.start.offsetTop + eventObject.rowIndex * (eventHeight + 2) + "px",
                left: left,
                width: width
            });
        },

        _refreshSlots: function() {
            for (var groupIndex = 0; groupIndex < this.groups.length; groupIndex++) {
                this.groups[groupIndex].refresh();
            }
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

        _isInDateSlot: function(event) {
            var startTime = event.start;
            var endTime = event.end;
            var rangeStart = getDate(this._startDate);
            var rangeEnd = kendo.date.addDays(getDate(this._endDate),1);

            if (startTime < rangeEnd && rangeStart <= endTime) {
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
                if (startTime < slotRanges[slotIndex].end && slotRanges[slotIndex].start < endTime) {
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
                    head = true;
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

        _renderEvents: function(events, groupIndex, eventGroup) {
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
                        var group = this.groups[groupIndex];

                        if (!group._continuousEvents) {
                            group._continuousEvents = [];
                        }

                        var ranges = group.slotRanges(adjustedEvent.occurrence, false);
                        var range = ranges[0];
                        var element;

                        if (this._isInTimeSlot(adjustedEvent.occurrence)) {

                            element = this._createEventElement(adjustedEvent.occurrence, event, range.head || adjustedEvent.head, range.tail || adjustedEvent.tail);
                            element.appendTo(container).css({top: 0, height: this.options.eventHeight});

                            var eventObject = {
                                start: adjustedEvent.occurrence.startTime || adjustedEvent.occurrence.start,
                                end: adjustedEvent.occurrence.endTime || adjustedEvent.occurrence.end,
                                element: element,
                                uid: event.uid,
                                slotRange: range,
                                rowIndex: 0,
                                offsetTop: 0
                            };

                            eventGroup.events[event.uid] = eventObject;

                            this.addContinuousEvent(group, range, element, event.isAllDay);
                            this._arrangeRows(eventObject, range, eventGroup);
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

        _arrangeRows: function (eventObject, slotRange, eventGroup) {
            var startIndex = slotRange.start.index;
            var endIndex = slotRange.end.index;
            var events = SchedulerView.collidingEvents(slotRange.events(), startIndex, endIndex);

            slotRange.addEvent({ slotIndex: startIndex, start: startIndex, end: endIndex, element: eventObject.element, uid: eventObject.uid });
            events.push({ slotIndex: startIndex, start: startIndex, end: endIndex, element: eventObject.element, uid: eventObject.uid });

            var rows = SchedulerView.createRows(events);

            if (eventGroup.maxRowCount < rows.length) {
                eventGroup.maxRowCount = rows.length;
            }

            for (var idx = 0, length = rows.length; idx < length; idx++) {
                var rowEvents = rows[idx].events;
                for (var j = 0, eventLength = rowEvents.length; j < eventLength; j++) {
                    eventGroup.events[rowEvents[j].uid].rowIndex = idx;
                }
            }
        },

        _groupCount: function() {
            var resources = this.groupedResources;

            if (resources.length) {
                if (this._groupOrientation() === "vertical") {
                    return this._rowCountForLevel(resources.length - 1);
                } else {
                    return this._columnCountForLevel(resources.length - 1);
                }
            }
            return 1;
        },

        _updateEventForSelection: function(event) {
            var adjustedEvent = this._adjustEvent(event.clone());
            return adjustedEvent.occurrence;
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

                var left = rect.left;

                if (this._isRtl) {
                   left -= (this.content[0].scrollWidth - this.content[0].offsetWidth);
                }

                var css = {
                    left: left,
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

                var left = startRect.left;

                var content = this.content;
                if (this._isRtl) {
                    left -= (content[0].scrollWidth - content[0].offsetWidth);
                }

                var hint = SchedulerView.fn._createResizeHint.call(this,
                    left,
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
                var collection = group._collection(0, isDay);
                return collection.last();
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
                var collection = group._collection(0, isDay);
                return collection.first();
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

            if (!multiple && this._isHorizontallyGrouped() && (!startSlot || !endSlot)) {
                startSlot = endSlot = this._changeGroup(selection, reverse);
            }

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

            if (this._isHorizontallyGrouped()) {
               selection.groupIndex = reverse ? this.groups.length - 1 : 0;
            }

            var duration = end - start;

            if (reverse) {
                end = getMilliseconds(this.endTime());
                end = end === 0 ? MS_PER_DAY : end;

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

            if (that.footer) {
                that.footer.remove();
            }

            if (that._currentTimeUpdateTimer) {
                clearInterval(that._currentTimeUpdateTimer);
            }

            SchedulerView.fn.destroy.call(this);

            if (this._isMobile() && that.options.editable) {
                if (that.options.editable.create !== false) {
                    that._addUserEvents.destroy();
                }

                if (that.options.editable.update !== false) {
                    that._editUserEvents.destroy();
                }
            }
        }
    });

    extend(true, ui, {
        TimelineView: TimelineView,
        TimelineWeekView: TimelineView.extend({
            options: {
                name: "TimelineWeekView",
                title: "Timeline Week",
                selectedDateFormat: "{0:D} - {1:D}",
                majorTick: 120
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
                majorTick: 120
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
                this._render(dates);
            }
        }),
        TimelineMonthView: TimelineView.extend({
            options: {
                name: "TimelineMonthView",
                title: "Timeline Month",
                selectedDateFormat: "{0:D} - {1:D}",
                workDayStart: new Date(1980, 1, 1, 0, 0, 0),
                workDayEnd: new Date(1980, 1, 1, 0, 0, 0),
                footer: false,
                majorTick: 1440,
                minorTickCount: 1
            },
            name: "timelineMonth",
            calculateDateRange: function() {
                var selectedDate = this.options.date,
                    start = kendo.date.firstDayOfMonth(selectedDate),
                    end = kendo.date.lastDayOfMonth(selectedDate),
                    idx, length,
                    dates = [];

                for (idx = 0, length = end.getDate(); idx < length; idx++) {
                    dates.push(start);
                    start = kendo.date.nextDay(start);
                }
                this._render(dates);
            }
        })
    });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
