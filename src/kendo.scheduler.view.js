kendo_module({
    id: "scheduler.view",
    name: "Scheduler View",
    category: "web",
    description: "The Scheduler Common View",
    depends: [ "core" ],
    hidden: true
});

(function($) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        NS = ".kendoSchedulerView";

    function levels(values, key) {
        var result = [];

        function collect(depth, values) {
            values = values[key];

            if (values) {
                var level = result[depth] = result[depth] || [];

                for (var idx = 0; idx < values.length; idx++) {
                    level.push(values[idx]);
                    collect(depth + 1, values[idx]);
                }
            }
        }

        collect(0, values);

        return result;
    }

    function cellspacing() {
        if (kendo.support.cssBorderSpacing) {
            return "";
        }

        return 'cellspacing="0"';
    }

    function table(tableRows, className) {
        if (!tableRows.length) {
            return "";
        }

        return '<table ' + cellspacing() + ' class="' + $.trim('k-scheduler-table ' + (className || "")) + '">' +
               '<tr>' +
                    tableRows.join("</tr><tr>") +
               '</tr>' +
               '</table>';
    }

    function allDayTable(tableRows, className) {
        if (!tableRows.length) {
            return "";
        }

        return "<div style='position:relative'>" + table(tableRows, className) + "</div>";
    }

    function timesHeader(columnLevelCount, allDaySlot, rowCount) {
        var tableRows = [];

        if (rowCount > 0) {
            for (var idx = 0; idx < columnLevelCount; idx++) {
                tableRows.push("<th></th>");
            }
        }

        if (allDaySlot) {
            tableRows.push('<th class="k-scheduler-times-all-day">' + allDaySlot.text + '</th>');
        }

        if (rowCount < 1) {
           return $();
        }

        return $('<div class="k-scheduler-times">' + table(tableRows) + '</div>');
    }

    function datesHeader(columnLevels, columnCount, allDaySlot) {
        var dateTableRows = [];
        var columnIndex;

        for (var columnLevelIndex = 0; columnLevelIndex < columnLevels.length; columnLevelIndex++) {
            var level = columnLevels[columnLevelIndex];
            var th = [];
            var colspan = columnCount / level.length;

            for (columnIndex = 0; columnIndex < level.length; columnIndex ++) {
                th.push('<th colspan="' + colspan + '" class="' + (level[columnIndex].className || "")  + '">' + level[columnIndex].text + "</th>");
            }

            dateTableRows.push(th.join(""));
        }

        var allDayTableRows = [];

        if (allDaySlot) {
            var lastLevel = columnLevels[columnLevels.length - 1];
            var td = [];

            for (columnIndex = 0; columnIndex < lastLevel.length; columnIndex++) {
                td.push('<td class="' + (lastLevel[columnIndex].className || "")  + '">&nbsp;</th>');
            }

            allDayTableRows.push(td.join(""));
        }

        return $(
            '<div class="k-scheduler-header k-state-default">' +
                '<div class="k-scheduler-header-wrap">' +
                    table(dateTableRows) +
                    allDayTable(allDayTableRows, "k-scheduler-header-all-day") +
                '</div>' +
            '</div>'
        );
    }

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

    function content() {
        return $(
            '<div class="k-scheduler-content">' +
                '<table ' + cellspacing() + ' class="k-scheduler-table"/>' +
            '</div>'
        );
    }
    var HINT = '<div class="k-marquee k-scheduler-marquee">' +
                    '<div class="k-marquee-color"></div>' +
                    '<div class="k-marquee-text">' +
                        '<div class="k-label-top"></div>' +
                        '<div class="k-label-bottom"></div>' +
                    '</div>' +
                '</div>';

    kendo.ui.scheduler = {};

    var ResourceView = kendo.Class.extend({
        init: function(index) {
            this._index = index;
            this._timeSlotCollections = [];
            this._daySlotCollections = [];
        },

        addTimeSlotCollection: function(startDate, endDate) {
            return this._addCollection(startDate, endDate, this._timeSlotCollections);
        },

        addDaySlotCollection: function(startDate, endDate) {
            return this._addCollection(startDate, endDate, this._daySlotCollections);
        },

        _addCollection: function(startDate, endDate, collections) {
            var collection = new SlotCollection(startDate, endDate, this._index, collections.length);

            collections.push(collection);

            return collection;
        },

        timeSlotCollectionCount: function() {
            return this._timeSlotCollections.length;
        },

        daySlotCollectionCount: function() {
            return this._daySlotCollections.length;
        },

        daySlotByPosition: function(x, y) {
            return this._slotByPosition(x, y, this._daySlotCollections);
        },

        timeSlotByPosition: function(x, y) {
            return this._slotByPosition(x, y, this._timeSlotCollections);
        },

        _slotByPosition: function(x, y, collections) {
           for (var collectionIndex = 0; collectionIndex < collections.length; collectionIndex++) {
               var collection = collections[collectionIndex];

               for (var slotIndex = 0; slotIndex < collection.count(); slotIndex++) {
                   var slot = collection.at(slotIndex);

                   if (x >= slot.offsetLeft && x < slot.offsetLeft + slot.clientWidth &&
                       y >= slot.offsetTop && y < slot.offsetTop + slot.clientHeight) {
                       return slot;
                   }
               }
           }
        },

        refresh: function() {
            var collectionIndex;

            for (collectionIndex = 0; collectionIndex < this._daySlotCollections.length; collectionIndex++) {
                this._daySlotCollections[collectionIndex].refresh();
            }

            for (collectionIndex = 0; collectionIndex < this._timeSlotCollections.length; collectionIndex++) {
                this._timeSlotCollections[collectionIndex].refresh();
            }
        },

        timeSlotRanges: function(startTime, endTime) {
            var collections = this._timeSlotCollections;

            var start = this._startSlot(startTime, collections);

            var end = start;

            if (startTime < endTime) {
                end = this._endSlot(endTime, collections);
            }

            return this._continuousRange(TimeSlotRange, collections, start, end);
        },

        daySlotRanges: function(startTime, endTime, isAllDay) {
            var collections = this._daySlotCollections;

            var start = this._startSlot(startTime, collections, isAllDay);

            var end = start;

            if (startTime < endTime) {
                end = this._endSlot(endTime, collections, isAllDay);
            }

            return this._continuousRange(DaySlotRange, collections, start, end);
        },

        _continuousRange: function(range, collections, start, end) {
            var startSlot = start.slot;
            var endSlot = end.slot;

            var startIndex = startSlot.collectionIndex;
            var endIndex = endSlot.collectionIndex;

            var ranges = [];

            var ranges = [];

            for (var collectionIndex = startIndex; collectionIndex <= endIndex; collectionIndex++) {
                var collection = collections[collectionIndex];

                var first = collection.first();
                var last = collection.last();
                var head = false;
                var tail = false;

                if (collectionIndex == startIndex) {
                    tail = !start.inRange;
                }

                if (collectionIndex == endIndex) {
                    head = !end.inRange;
                }

                if (first.start < startSlot.start) {
                    first = startSlot;
                }

                if (last.start > endSlot.start) {
                    last = endSlot;
                }

                if (startIndex < endIndex) {
                    if (collectionIndex == startIndex) {
                        head = true;
                    } else if (collectionIndex == endIndex) {
                        tail = true;
                    } else {
                        head = tail = true;
                    }
                }

                ranges.push(new range({
                    start: first,
                    end: last,
                    collection: collection,
                    head: head,
                    tail: tail
                }));
            }

            return ranges;
        },

        slotRanges: function(event, isDay) {
            var startTime = kendo.date.toUtcTime(event.start);
            var endTime = kendo.date.toUtcTime(event.end);

            if (isDay === undefined) {
                isDay = event.isMultiDay();
            }

            if (isDay) {
                return this.daySlotRanges(startTime, endTime, event.isAllDay);
            }

            if (event.startTime) {
                startTime =  kendo.date.getMilliseconds(event.startTime) + kendo.date.toUtcTime(kendo.date.getDate(event.start));
            }

            if (event.endTime) {
                endTime =  kendo.date.getMilliseconds(event.endTime) + kendo.date.toUtcTime(kendo.date.getDate(event.end));
            }

            return this.timeSlotRanges(startTime, endTime);
        },

        ranges: function(startTime, endTime, isDay, isAllDay) {
            if (typeof startTime != "number") {
                startTime = kendo.date.toUtcTime(startTime);
            }

            if (typeof endTime != "number") {
                endTime = kendo.date.toUtcTime(endTime);
            }

            if (isDay) {
                return this.daySlotRanges(startTime, endTime, isAllDay);
            }

            return this.timeSlotRanges(startTime, endTime);
        },

        _startCollection: function(date, collections) {
            for (var collectionIndex = 0; collectionIndex < collections.length; collectionIndex++) {
                var collection = collections[collectionIndex];

                if (collection.startInRange(date)) {
                    return collection;
                }
            }

            return null;
        },

        _endCollection: function(date, collections) {
            for (var collectionIndex = 0; collectionIndex < collections.length; collectionIndex++) {
                var collection = collections[collectionIndex];

                if (collection.endInRange(date)) {
                    return collection;
                }
            }

            return null;
        },

        upSlot: function(slot, keep) {
            var that = this;
            var moveToDaySlot = function(isAllDay, collectionIndex, index) {
                var isFirstCell = index === 0;

                if (!keep && !isAllDay && isFirstCell && that.daySlotCollectionCount()) {
                    return that._daySlotCollections[0].at(collectionIndex);
                }
            };

            return this._verticalSlot(slot, -1, moveToDaySlot);
        },

        downSlot: function(slot, keep) {
            var that = this;
            var moveToTimeSlot = function(isAllDay, collectionIndex, index) {
                if (!keep && isAllDay && that.timeSlotCollectionCount()) {
                    return that._timeSlotCollections[index].at(0);
                }
            };

            return this._verticalSlot(slot, 1, moveToTimeSlot);
        },

        leftSlot: function(slot) {
            return this._horizontalSlot(slot, -1);
        },

        rightSlot: function(slot) {
            return this._horizontalSlot(slot, 1);
        },

        _horizontalSlot: function(slot, step) {
            var index = slot.index;
            var isAllDay = slot.isAllDay;
            var collectionIndex = slot.collectionIndex();
            var collections = this._getCollections(isAllDay);

            if (isAllDay) {
                index += step;
            } else {
                collectionIndex += step;
            }

            var collection = collections[collectionIndex];

            return collection ? collection.at(index) : undefined;
        },

        _verticalSlot: function(slot, step, swapCollection) {
            var index = slot.index;
            var isAllDay = slot.isAllDay;
            var collectionIndex = slot.collectionIndex();
            var collections = this._getCollections(isAllDay);

            slot = swapCollection(isAllDay, collectionIndex, index);
            if (slot) {
                return slot;
            }

            if (isAllDay) {
                collectionIndex += step;
            } else {
                index += step;
            }

            var collection = collections[collectionIndex];

            return collection ? collection.at(index) : undefined;
        },

        _getCollections: function(isDay) {
            return isDay ? this._daySlotCollections : this._timeSlotCollections;
        },

        previousDaySlot: function(slot) {
            var collections = this._getCollections(true);
            var collection = collections[slot.collectionIndex() - 1];

            return collection ? collection.last() : undefined;
        },

        nextDaySlot: function(slot) {
            var collections = this._getCollections(true);
            var collection = collections[slot.collectionIndex() + 1];

            return collection ? collection.first() : undefined;
        },

        firstSlot: function() {
            var collections = this._getCollections(this.daySlotCollectionCount());

            return collections[0].first();
        },

        lastSlot: function() {
            var collections = this._getCollections(this.daySlotCollectionCount());

            return collections[collections.length - 1].last();
        },

        _collection: function(index, multiday) {
            var collections = multiday? this._daySlotCollections : this._timeSlotCollections;

            return collections[index];
        },

        _startSlot: function(time, collections, isAllDay) {
            var collection = this._startCollection(time, collections);

            var inRange = true;

            if (!collection) {
                collection = collections[0];
                inRange = false;
            }

            var slot = collection.slotByStartDate(time, isAllDay);

            if (!slot) {
                slot = collection.first();
                inRange = false;
            }

            return {
                slot: slot,
                inRange: inRange
            };
        },

        _endSlot: function(time, collections, isAllDay) {
            var collection = this._endCollection(time, collections);

            var inRange = true;

            if (!collection) {
                collection = collections[collections.length - 1];
                inRange = false;
            }

            var slot = collection.slotByEndDate(time, isAllDay);

            if (!slot) {
                slot = collection.last();
                inRange = false;
            }

            return {
                slot: slot,
                inRange: inRange
            };
        },

        getTimeSlotCollection: function(index) {
            return this._timeSlotCollections[index];
        },

        getDaySlotCollection: function(index) {
            return this._daySlotCollections[index];
        }
    });

    var SlotRange = kendo.Class.extend({
        init: function(options) {
            $.extend(this, options);
        },

        innerHeight: function() {
            var collection = this.collection;

            var startIndex = this.start.index;

            var endIndex = this.end.index;

            var result = 0;

            for (var slotIndex = startIndex; slotIndex <= endIndex; slotIndex++) {
               result += collection.at(slotIndex).offsetHeight;
            }

            return result;
        },

        events: function () {
            return this.collection.events();
        },

        addEvent: function(event) {
            this.events().push(event);
        },

        startSlot: function() {
            if (this.start.offsetLeft > this.end.offsetLeft) {
                return this.end;
            }
            return this.start;
        },

        endSlot: function() {
            if (this.start.offsetLeft > this.end.offsetLeft) {
                return this.start;
            }
            return this.end;
        }
    });

    var TimeSlotRange = SlotRange.extend({
        innerHeight: function() {
            var collection = this.collection;

            var startIndex = this.start.index;

            var endIndex = this.end.index;

            var result = 0;

            for (var slotIndex = startIndex; slotIndex <= endIndex; slotIndex++) {
               result += collection.at(slotIndex).offsetHeight;
            }

            return result;
        }
    });

    var DaySlotRange = SlotRange.extend({
        innerWidth: function() {
            var collection = this.collection;

            var startIndex = this.start.index;

            var endIndex = this.end.index;

            var result = 0;

            var width = startIndex !== endIndex ? "offsetWidth" : "clientWidth";

            for (var slotIndex = startIndex; slotIndex <= endIndex; slotIndex++) {
               result += collection.at(slotIndex)[width];
            }

            return result;
        }
    });

    var SlotCollection = kendo.Class.extend({
        init: function(startDate, endDate, groupIndex, collectionIndex) {
            this._slots = [];

            this._events = [];

            this._start = kendo.date.toUtcTime(startDate);

            this._end = kendo.date.toUtcTime(endDate);

            this._groupIndex = groupIndex;

            this._collectionIndex = collectionIndex;
        },
        refresh: function() {
            for (var slotIndex = 0; slotIndex < this._slots.length; slotIndex++) {
                this._slots[slotIndex].refresh();
            }

            for (var eventIndex = 0; eventIndex < this._events.length; eventIndex++) {
                var event = this._events[eventIndex];

                event.element.css({
                    top: this._slots[event.start].offsetTop
                });
            }
        },

        startInRange: function(date) {
            return this._start <= date && date < this._end;
        },

        endInRange: function(date) {
            return this._start < date && date <= this._end;
        },

        slotByStartDate: function(date) {
            var time = date;

            if (typeof time != "number") {
                time = kendo.date.toUtcTime(date);
            }

            for (var slotIndex = 0; slotIndex < this._slots.length; slotIndex++) {
                var slot = this._slots[slotIndex];

                if (slot.startInRange(time)) {
                    return slot;
                }
            }

            return null;
        },

        slotByEndDate: function(date, allday) {
            var time = date;

            if (typeof time != "number") {
                time = kendo.date.toUtcTime(date);
            }

            if (allday) {
                return this.slotByStartDate(date, false);
            }

            for (var slotIndex = 0; slotIndex < this._slots.length; slotIndex++) {
                var slot = this._slots[slotIndex];

                if (slot.endInRange(time)) {
                    return slot;
                }
            }

            return null;
        },

        count: function() {
            return this._slots.length;
        },
        events: function() {
            return this._events;
        },
        addTimeSlot: function(element, start, end) {
            var slot = new TimeSlot(element, start, end, this._groupIndex, this._collectionIndex, this._slots.length);

            this._slots.push(slot);
        },
        addDaySlot: function(element, start, end, eventCount) {
            var slot = new DaySlot(element, start, end, this._groupIndex, this._collectionIndex, this._slots.length, eventCount);

            this._slots.push(slot);
        },
        first: function() {
            return this._slots[0];
        },
        last: function() {
            return this._slots[this._slots.length - 1];
        },
        at: function(index) {
            return this._slots[index];
        }
    });

    var Slot = kendo.Class.extend({
        init: function(element, start, end, groupIndex, collectionIndex, index) {
            this.element = element;
            this.clientWidth = element.clientWidth;
            this.clientHeight = element.clientHeight;
            this.offsetWidth = element.offsetWidth;
            this.offsetHeight = element.offsetHeight;
            this.offsetTop = element.offsetTop;
            this.offsetLeft = element.offsetLeft;
            this.start = start;
            this.end = end;
            this.element = element;
            this.groupIndex = groupIndex;
            this.collectionIndex = collectionIndex;
            this.index = index;
            this.isDaySlot = false;
        },

        startDate: function() {
            var date = new Date(this.start);

            return kendo.timezone.apply(date, "Etc/UTC");
        },

        endDate: function() {
            var date = new Date(this.end);

            return kendo.timezone.apply(date, "Etc/UTC");
        },

        startInRange: function(date) {
            return this.start <= date && date < this.end;
        },

        endInRange: function(date) {
            return this.start < date && date <= this.end;
        }
    });

    var TimeSlot = Slot.extend({
        refresh: function() {
            this.offsetTop = this.element.offsetTop;
        },

        offsetX: function(rtl, offset) {
            if (rtl) {
                return this.offsetLeft + offset;
            } else {
                return this.offsetLeft + offset;
            }
        },

        startInRange: function(date) {
            return this.start <= date && date < this.end;
        },

        endInRange: function(date) {
            return this.start < date && date <= this.end;
        }
    });

    var DaySlot = Slot.extend({
        init: function(element, start, end, groupIndex, collectionIndex, index, eventCount) {
            Slot.fn.init.apply(this, arguments);

            this.eventCount = eventCount;
            this.isDaySlot = true;
            this.firstChildHeight = this.element.firstChild.offsetHeight + 3;
        },

        refresh: function() {
            this.clientHeight = this.element.clientHeight;
            this.offsetTop = this.element.offsetTop;
        },

        startDate: function() {
            var date = new Date(this.start);

            return kendo.timezone.apply(date, "Etc/UTC");
        },

        endDate: function() {
            var date = new Date(this.end);

            return kendo.timezone.apply(date, "Etc/UTC");
        },

        startInRange: function(date) {
            return this.start <= date && date < this.end;
        },

        endInRange: function(date) {
            return this.start < date && date <= this.end;
        }
    });

    var scrollbarWidth;
    function scrollbar() {
        scrollbarWidth = scrollbarWidth ? scrollbarWidth : kendo.support.scrollbar();
        return scrollbarWidth;
    }

    //This should become method of the group
    function eventElement(group, uid, isAllDay) {
        var collection = isAllDay ? group._daySlotCollections : group._timeSlotCollections;

        collection = $.map(collection, function(item) {
            return item.events();
        });

        return $.grep(collection, function(item) {
            return item.element.attr(kendo.attr("uid")) == uid;
        })[0].element;
    }

    kendo.ui.SchedulerView = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this._scrollbar = scrollbar();
            this._isRtl = kendo.support.isRtl(element);
            this._resizeHint = $();
            this._moveHint = $();
            this._cellId = kendo.guid();
            this._resourcesForGroups();
        },

        _addResourceView: function() {
            var resourceView = new ResourceView(this.groups.length);

            this.groups.push(resourceView);

            return resourceView;
        },

        dateForTitle: function() {
            return kendo.format(this.options.selectedDateFormat, this.startDate(), this.endDate());
        },

        move: function() {
            return false;
        },

        _nextAllDayEvent: function(collection, index, selectionEvents, pad) {
            var events = collection.events();
            var slots = collection._slots;

            events = $.grep(events, function(item) {
                return item.start == index;
            });

            var idx = eventIndex(events, selectionEvents);
            var event;

            if (idx > -1) {
                event = events[idx + pad];
            } else {
                event = pad > 0 ? events[0] : events[events.length - 1];
            }

            if (event) {
                return {
                    event: event,
                    start: slots[event.start].startDate(),
                    end: slots[event.end].endDate(),
                    isAllDay: true
                };
            }

            return false;
        },

        _nextEvent: function(collection, slotIndex, selectionEvents, pad) {
            var events = collection.events();
            var idx = eventIndex(events, selectionEvents);
            var event;

            if (idx > -1) {
                event = events[idx + pad];
            } else {
                events = $.grep(events, function(item) {
                    if (pad > 0) {
                        return item.start >= slotIndex;
                    } else {
                        return item.start <= slotIndex;
                    }
                });

                event = pad > 0 ? events[0] : events[events.length - 1];
            }

            if (event) {
                var slots = collection._slots;

                return {
                    event: event,
                    start: slots[event.start].startDate(),
                    end: slots[event.end].endDate(),
                    isAllDay: false
                };
            }

            return false;
        },

        _nextEventInGroup: function(isAllDay, group, slot, events, prev) {
            var slotIndex = slot.index;
            var eventInfo;

            var idx = isAllDay ? slot.index : slot.columnIndex;
            var length = group._timeSlotCollections.length;
            var pad = prev ? -1 : 1;
            var origIdx = idx;

            while (idx < length && idx > -1) {
                if (isAllDay) {
                    eventInfo = this._nextAllDayEvent(group._daySlotCollections[0], idx, events, pad);
                    if (!eventInfo) {
                        if (!prev) {
                            eventInfo = this._nextEvent(group._timeSlotCollections[idx], 0, events, pad);
                        }
                        isAllDay = false;
                    }
                } else {
                    if (origIdx !== idx) {
                        slotIndex = group._timeSlotCollections[idx][prev ? "last" : "first"]().index;
                    }
                    eventInfo = this._nextEvent(group._timeSlotCollections[idx], slotIndex, events, pad);
                    if (!eventInfo) {
                        if (prev) {
                            eventInfo = this._nextAllDayEvent(group._daySlotCollections[0], idx, events, pad);
                        }

                        if (prev && !eventInfo) {
                            isAllDay = false;
                        } else {
                            isAllDay = true;
                        }
                    }
                }

                if (eventInfo) {
                    break;
                }

                idx += pad;
            }

            return eventInfo;
        },

        moveToEvent: function(selection, prev) {
            var eventInfo;
            var isAllDay = !!selection.isAllDay;
            var group = this.groups[selection.groupIndex];
            var slot = group.ranges(selection.start, selection.end, isAllDay, false)[0].start;
            var events = selection.events;

            var groupIndex = selection.groupIndex;
            var length = this.groups.length;
            var pad = prev ? -1 : 1;

            while (groupIndex < length && groupIndex > -1) {
                eventInfo = this._nextEventInGroup(isAllDay, group, slot, events, prev);

                if (eventInfo) {
                    break;
                }

                groupIndex += pad;
                isAllDay = !prev;
                events = [];
                group = this.groups[groupIndex];
                if (group) {
                    slot = prev ?
                        group._timeSlotCollections[group._timeSlotCollections.length - 1].last() :
                        group._daySlotCollections[0].first();
                }
            }

            if (eventInfo) {
                selection.events = [ eventInfo.event.element.attr(kendo.attr("uid")) ];
                selection.start = eventInfo.start;
                selection.end = eventInfo.end;
                selection.isAllDay = eventInfo.isAllDay;
                selection.groupIndex = groupIndex;
            }

            return !!eventInfo;
        },

        select: function(selection) {
            this.clearSelection();

            if (!this._selectEvents(selection)) {
                this._selectSlots(selection);
            }
        },

        _selectSlots: function(selection) {
            var group = this.groups[selection.groupIndex];
            var ranges = group.ranges(selection.start, selection.end, selection.isAllDay, false);
            var element;

            for (var rangeIndex = 0; rangeIndex < ranges.length; rangeIndex++) {
                var range = ranges[rangeIndex];

                var collection = range.collection;

                for (var slotIndex = range.start.index; slotIndex <= range.end.index; slotIndex++) {
                    element = collection.at(slotIndex).element;
                    addSelectedState(element);
                }
            }

            if (selection.backward) {
                element = ranges[0].start.element;
            }

            this._scrollTo(element, this.content[0]);
        },

        _selectEvents: function(selection) {
            var found = false;
            var uidAttr = kendo.attr("uid");
            var events = selection.events;

            if (!events[0]) {
                return found;
            }

            events = this.element.find("[" + uidAttr + "=" + events.join("],[" + uidAttr + "=") + "]");

            if (events.length > 0) {
                found = true;
                events.addClass("k-state-selected");

                events = eventElement(
                    this.groups[selection.groupIndex],
                    events.last().attr(kendo.attr("uid")),
                    selection.isAllDay
                );

                this._scrollTo(events[0], this.content[0]);
            }

            return found;
        },

        inRange: function(options) {
            var startDate = this.startDate();
            var nextDate = this.nextDate();
            var start = options.start;
            var end = options.end;

            return startDate <= start && start < nextDate && startDate < end && end <= nextDate;
        },

        _scrollbarOffset: function(value, multiday) {
            if (!this._isRtl || (multiday && !this._isVerticallyGrouped())) {
                return value;
            }

            return this._scrollbarWidth + value;
        },

        _resourceValue: function(resource, item) {
            if (resource.valuePrimitive) {
                item = kendo.getter(resource.dataValueField)(item);
            }
            return item;
        },

        _resourceBySlot: function(slot) {
            var resources = this.groupedResources;
            var result = {};

            if (resources.length) {
                var resourceIndex = slot.groupIndex;

                for (var idx = resources.length - 1; idx >=0; idx--) {
                    var resource = resources[idx];

                    var value = this._resourceValue(resource, resource.dataSource.at(resourceIndex % resource.dataSource.total()));

                    if (resource.multiple) {
                        value = [value];
                    }

                    var setter = kendo.setter(resource.field);
                    setter(result, value);

                    resourceIndex = Math.floor(resourceIndex / resource.dataSource.total());
                }
            }

            return result;
        },

        _createResizeHint: function(left, top, width, height) {
            return $(HINT).css({
                left: left,
                top: top,
                width: width,
                height: height
            });
        },

        _removeResizeHint: function() {
            this._resizeHint.remove();
            this._resizeHint = $();
        },

        _removeMoveHint: function() {
            this._moveHint.remove();
            this._moveHint = $();
        },

        _scrollTo: function(element, container) {
            var elementOffset = element.offsetTop,
                elementOffsetDir = element.offsetHeight,
                containerScroll = container.scrollTop,
                containerOffsetDir = container.clientHeight,
                bottomDistance = elementOffset + elementOffsetDir,
                result = 0;

                if (containerScroll > elementOffset) {
                    result = elementOffset;
                } else if (bottomDistance > (containerScroll + containerOffsetDir)) {
                    if (elementOffsetDir <= containerOffsetDir) {
                        result = (bottomDistance - containerOffsetDir);
                    } else {
                        result = elementOffset;
                    }
                } else {
                    result = containerScroll;
                }
                container.scrollTop = result;
        },

        eventResources: function(event) {
            var resources = [],
                options = this.options;

            if (!options.resources) {
                return resources;
            }

            for (var idx = 0; idx < options.resources.length; idx++) {
                var resource = options.resources[idx];
                var field = resource.field;
                var eventResources = kendo.getter(field)(event);

                if (!eventResources) {
                    continue;
                }

                if (!resource.multiple) {
                    eventResources = [eventResources];
                }

                var data = resource.dataSource.view();

                for (var resourceIndex = 0; resourceIndex < eventResources.length; resourceIndex++) {
                    var eventResource = null;

                    var value = eventResources[resourceIndex];

                    if (!resource.valuePrimitive) {
                        value = kendo.getter(resource.dataValueField)(value);
                    }

                    for (var dataIndex = 0; dataIndex < data.length; dataIndex++) {
                        if (data[dataIndex].get(resource.dataValueField) == value) {
                            eventResource = data[dataIndex];
                            break;
                        }
                    }

                    if (eventResource != null) {
                       resources.push({
                          text: kendo.getter(resource.dataTextField)(eventResource),
                          value: value,
                          color: kendo.getter(resource.dataColorField)(eventResource)
                       });
                    }
                }

            }

            return resources;
        },
        createLayout: function(layout) {
            var allDayIndex = -1;

            if (!layout.rows) {
                layout.rows = [];
            }

            for (var idx = 0; idx < layout.rows.length; idx++) {
                if (layout.rows[idx].allDay) {
                    allDayIndex = idx;
                    break;
                }
            }

            var allDaySlot = layout.rows[allDayIndex];

            if (allDayIndex >= 0) {
                layout.rows.splice(allDayIndex, 1);
            }

            var columnLevels = this.columnLevels = levels(layout, "columns");

            var rowLevels = this.rowLevels = levels(layout, "rows");

            this.table = $('<table ' + cellspacing() + ' class="k-scheduler-layout">');

            var rowCount = rowLevels[rowLevels.length - 1].length;

            this.table.append(this._topSection(columnLevels, allDaySlot, rowCount));

            this.table.append(this._bottomSection(columnLevels, rowLevels, rowCount));

            this.element.append(this.table);

            this._scroller();
        },

        refreshLayout: function() {
            var that = this,
                toolbar = that.element.find(">.k-scheduler-toolbar"),
                height = that.element.innerHeight(),
                scrollbar = this._scrollbar,
                headerHeight = 0,
                paddingDirection = this._isRtl ? "left" : "right";

            if (toolbar.length) {
                height -= toolbar.outerHeight();
            }

            if (that.datesHeader) {
                headerHeight = that.datesHeader.outerHeight();
            }

            if (that.timesHeader && that.timesHeader.outerHeight() > headerHeight) {
                headerHeight = that.timesHeader.outerHeight();
            }

            if (that.datesHeader && that.timesHeader) {
                var datesHeaderRows = that.datesHeader.find("table:first tr");

                that.timesHeader.find("tr").height(function(index) {
                    $(this).height(datesHeaderRows.eq(index).height());
                });
            }

            if (headerHeight) {
                height -= headerHeight;
            }

            if (that.footer) {
                height -= that.footer.outerHeight();
            }

            var isSchedulerHeightSet = function(el) {
                var initialHeight, newHeight;
                if (el[0].style.height) {
                    return true;
                } else {
                    initialHeight = el.height();
                }

                el.height("auto");
                newHeight = el.height();

                if (initialHeight != newHeight) {
                    el.height("");
                    return true;
                }
                el.height("");
                return false;
            };

            var contentDiv = that.content[0],
                scrollbarWidth = !kendo.support.kineticScrollNeeded ? scrollbar : 0;

            this._scrollbarWidth = 0;

            if (isSchedulerHeightSet(that.element)) { // set content height only if needed
                if (height > scrollbar * 2) { // do not set height if proper scrollbar cannot be displayed
                    that.content.height(height);
                } else {
                    that.content.height(scrollbar * 2 + 1);
                }
                that.times.height(contentDiv.clientHeight);

                var timesTable = that.times.find("table");
                if (timesTable.length) {
                    timesTable.height(that.content.find("table")[0].clientHeight);
                }
            }


            if (contentDiv.offsetWidth - contentDiv.clientWidth > 0) {
                that.table.addClass("k-scrollbar-v");
                that.datesHeader.css("padding-" + paddingDirection, scrollbarWidth - parseInt(that.datesHeader.children().css("border-" + paddingDirection + "-width"), 10));
                this._scrollbarWidth = scrollbarWidth;
            }
            if (contentDiv.offsetHeight - contentDiv.clientHeight > 0 || contentDiv.clientHeight > that.content.children(".k-scheduler-table").height()) {
                that.table.addClass("k-scrollbar-h");
            }
        },

        _topSection: function(columnLevels, allDaySlot, rowCount) {
            this.timesHeader = timesHeader(columnLevels.length, allDaySlot, rowCount);

            var columnCount = columnLevels[columnLevels.length - 1].length;

            this.datesHeader = datesHeader(columnLevels, columnCount, allDaySlot);

            return $("<tr>").append(this.timesHeader.add(this.datesHeader).wrap("<td>").parent());
        },

        _bottomSection: function(columnLevels, rowLevels, rowCount) {
            this.times = times(rowLevels, rowCount);

            this.content = content(columnLevels[columnLevels.length - 1], rowLevels[rowLevels.length - 1]);

            return $("<tr>").append(this.times.add(this.content).wrap("<td>").parent());
        },

        _scroller: function() {
            var that = this;

            this.content.bind("scroll" + NS, function () {
                that.datesHeader.find(">.k-scheduler-header-wrap").scrollLeft(this.scrollLeft);
                that.times.scrollTop(this.scrollTop);
            });

            var touchScroller = kendo.touchScroller(this.content, {
                avoidScrolling: function(e) {
                    return $(e.event.target).closest(".k-event.k-state-selected").length > 0;
                }
            });

            if (touchScroller && touchScroller.movable) {

                this._touchScroller = touchScroller;

                this.content = touchScroller.scrollElement;

                touchScroller.movable.bind("change", function(e) {
                    that.datesHeader.find(">.k-scheduler-header-wrap").scrollLeft(-e.sender.x);
                    that.times.scrollTop(-e.sender.y);
                });
            }
        },

        _resourcesForGroups: function() {
            var result = [];
            var groups = this.options.group;
            var resources = this.options.resources;

            groups = groups && groups.resources ? groups.resources : [];

            if (resources && groups.length) {
                for (var idx = 0, length = resources.length; idx < length; idx++) {
                    for (var groupIdx = 0, groupLength = groups.length; groupIdx < groupLength; groupIdx++) {
                        if (resources[idx].name === groups[groupIdx]) {
                            result.push(resources[idx]);
                        }
                    }
                }
            }

            this.groupedResources = result;
        },

        _createColumnsLayout: function(resources, inner) {
            return createLayoutConfiguration("columns", resources, inner);
        },

        _groupOrientation: function() {
            var groups = this.options.group;
            return groups && groups.resources ? groups.orientation : "horizontal";
        },

        _isVerticallyGrouped: function() {
            return this.groupedResources.length && this._groupOrientation() === "vertical";
        },

        _createRowsLayout: function(resources, inner) {
            return createLayoutConfiguration("rows", resources, inner);
        },

        selectionByElement: function() {
            return null;
        },

        clearSelection: function() {
            this.content.find(".k-state-selected").removeClass("k-state-selected");
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(this);

            if (that.table) {
                kendo.destroy(that.table);

                that.table.remove();
            }
        },

        calendarInfo: function() {
            return kendo.getCulture().calendars.standard;
        },

        prevGroupSlot: function(date, groupIndex, isDay) {
            var collection;
            var group = this.groups[groupIndex];
            var slot = group.ranges(date, date, isDay, false)[0].start;

            if (groupIndex <= 0) {
                return;
            }

            if (this._isVerticallyGrouped()) {
                if (!group.timeSlotCollectionCount()) {
                    collection = group._collection(group.daySlotCollectionCount() - 1, true);
                    return collection.at(slot.index);
                } else {
                    collection = group._collection(isDay ? slot.index : slot.collectionIndex(), false);
                    return collection.last();
                }
            } else {
                if (!group.timeSlotCollectionCount()) {
                    collection = group._collection(slot.collectionIndex(), true);
                    return collection.last();
                } else {
                    collection = group._collection(isDay ? 0 : group.timeSlotCollectionCount() - 1, isDay);
                    return isDay ? collection.last() : collection.at(slot.index);
                }
            }
        },

        nextGroupSlot: function(date, groupIndex, isDay, verticalNavigation) {
            var collection;
            var group = this.groups[groupIndex];
            var slot = group.ranges(date, date, isDay, false)[0].start;

            if (groupIndex >= this.groups.length - 1) {
                return;
            }

            if (this._isVerticallyGrouped()) {
                if (!group.timeSlotCollectionCount()) {
                    collection = group._collection(0, true);
                    return collection.at(slot.index);
                } else {
                    collection = group._collection(0, group.daySlotCollectionCount());
                    return isDay ? collection.last() : collection.at(slot.collectionIndex());
                }
            } else {
                if (!group.timeSlotCollectionCount()) {
                    collection = group._collection(slot.collectionIndex(), true);
                    return collection.first();
                } else {
                    collection = group._collection(0, isDay);
                    return isDay ? collection.first() : collection.at(slot.index);
                }
            }
        }
    });

    function collidingHorizontallyEvents(elements, start, end) {
        return collidingEvents(elements, start, end, true);
    }

    function collidingEvents(elements, start, end, isHorizontal) {
        var idx,
            index,
            startIndex,
            overlaps,
            endIndex;

        for (idx = elements.length-1; idx >= 0; idx--) {
            index = rangeIndex(elements[idx]);
            startIndex = index.start;
            endIndex = index.end;

            overlaps = isHorizontal ? (startIndex <= start && endIndex >= start) : (startIndex < start && endIndex > start);

            if (overlaps || (startIndex >= start && endIndex <= end) || (start <= startIndex && end >= startIndex)) {
                if (startIndex < start) {
                    start = startIndex;
                }

                if (endIndex > end) {
                    end = endIndex;
                }
            }
        }

        return eventsForSlot(elements, start, end);
    }

    function rangeIndex(eventElement) {
        return {
            start: eventElement.start,
            end: eventElement.end
        };
    }

    function eventsForSlot(elements, slotStart, slotEnd) {
        var events = [];

        for (var idx = 0; idx < elements.length; idx++) {
            var event = rangeIndex(elements[idx]);

            if ((event.start < slotStart && event.end > slotStart) || (event.start >= slotStart && event.end <= slotEnd)) {
                events.push(elements[idx]);
            }
        }

        return events;
    }

    function createColumns(eventElements) {
        return _createColumns(eventElements);
    }

    function createRows(eventElements) {
        return _createColumns(eventElements);
    }

    function _createColumns(eventElements) {
        var columns = [];

        for (var idx = 0; idx < eventElements.length; idx++) {
            var event = eventElements[idx];
            var eventRange = rangeIndex(event);
            var column = null;

            for (var j = 0, columnLength = columns.length; j < columnLength; j++) {
                var endOverlaps = eventRange.start > columns[j].end;

                if (eventRange.start < columns[j].start || endOverlaps) {

                    column = columns[j];

                    if (column.end < eventRange.end) {
                        column.end = eventRange.end;
                    }

                    break;
                }
            }

            if (!column) {
                column = { start: eventRange.start, end: eventRange.end, events: [] };
                columns.push(column);
            }

            column.events.push(event);
        }

        return columns;
    }

    function createLayoutConfiguration(name, resources, inner) {
        var resource = resources[0];
        if (resource) {
            var configuration = [];

            var data = resource.dataSource.view();

            for (var dataIndex = 0; dataIndex < data.length; dataIndex++) {
                var obj = {
                    text: kendo.getter(resource.dataTextField)(data[dataIndex]),
                    className: "k-slot-cell"
                };
                obj[name] = createLayoutConfiguration(name, resources.slice(1), inner);

                configuration.push(obj);
            }
            return configuration;
        }
        return inner;
    }

    function groupEqFilter(value) {
        return function(item) {
            if ($.isArray(item) || item instanceof kendo.data.ObservableArray) {
                for (var idx = 0; idx < item.length; idx++) {
                    if (item[idx] == value) {
                        return true;
                    }
                }
                return false;
            }
            return item == value;
        };
    }

    var selectedStateRegExp = /\s*k-state-selected/;
    function addSelectedState(cell) {
        cell.className = cell.className.replace(selectedStateRegExp, "") + " k-state-selected";
    }

    $.extend(ui.SchedulerView, {
        createColumns: createColumns,
        createRows: createRows,
        rangeIndex: rangeIndex,
        collidingEvents: collidingEvents,
        collidingHorizontallyEvents: collidingHorizontallyEvents,
        groupEqFilter: groupEqFilter
    });

})(window.kendo.jQuery);
