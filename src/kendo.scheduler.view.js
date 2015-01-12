(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = {
    id: "scheduler.view",
    name: "Scheduler View",
    category: "web",
    description: "The Scheduler Common View",
    depends: [ "core" ],
    hidden: true
};

(function($) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        keys = kendo.keys,
        NS = ".kendoSchedulerView",
        math = Math;

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
                tableRows.push("<th>&nbsp;</th>");
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
                var column = level[columnIndex];

                th.push('<th colspan="' + (column.colspan || colspan) + '" class="' + (column.className || "")  + '">' + column.text + "</th>");
            }

            dateTableRows.push(th.join(""));
        }

        var allDayTableRows = [];

        if (allDaySlot) {
            var lastLevel = columnLevels[columnLevels.length - 1];
            var td = [];
            var cellContent = allDaySlot.cellContent;

            for (columnIndex = 0; columnIndex < lastLevel.length; columnIndex++) {
                td.push('<td class="' + (lastLevel[columnIndex].className || "")  + '">' + (cellContent ? cellContent(columnIndex) : '&nbsp;') + '</th>');
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
                       y >= slot.offsetTop && y <= slot.offsetTop + slot.clientHeight) {
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

            if (!start.inRange && startTime >= start.slot.end) {
                start = null;
            }

            var end = start;

            if (startTime < endTime) {
                end = this._endSlot(endTime, collections);
            }

            if (end && !end.inRange && endTime <= end.slot.start) {
                end = null;
            }

            if (start === null && end === null) {
                return [];
            }

            if (start === null) {
                start = {
                    inRange: true,
                    slot: collections[end.slot.collectionIndex].first()
                };
            }

            if (end === null) {
                end = {
                    inRange: true,
                    slot: collections[start.slot.collectionIndex].last()
                };
            }

            return this._continuousRange(TimeSlotRange, collections, start, end);
        },

        daySlotRanges: function(startTime, endTime, isAllDay) {
            var collections = this._daySlotCollections;

            var start = this._startSlot(startTime, collections, isAllDay);

            if (!start.inRange && startTime >= start.slot.end) {
                start = null;
            }

            var end = start;

            if (startTime < endTime) {
                end = this._endSlot(endTime, collections, isAllDay);
            }

            if (end && !end.inRange && endTime <= end.slot.start) {
                end = null;
            }

            if (start === null && end === null) {
                return [];
            }

            if (start === null) {
                do {
                    startTime += kendo.date.MS_PER_DAY;
                    start = this._startSlot(startTime, collections, isAllDay);
                } while (!start.inRange && startTime >= start.slot.end);
            }

            if (end === null) {
                do {
                    endTime -= kendo.date.MS_PER_DAY;
                    end = this._endSlot(endTime, collections, isAllDay);
                } while (!end.inRange && endTime <= end.slot.start);
            }

            return this._continuousRange(DaySlotRange, collections, start, end);
        },

        _continuousRange: function(range, collections, start, end) {
            var startSlot = start.slot;
            var endSlot = end.slot;

            var startIndex = startSlot.collectionIndex;
            var endIndex = endSlot.collectionIndex;

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
            var startTime = event.startTime || kendo.date.toUtcTime(event.start);
            var endTime = event.endTime || kendo.date.toUtcTime(event.end);

            if (isDay === undefined) {
                isDay = event.isMultiDay();
            }

            if (isDay) {
                return this.daySlotRanges(startTime, endTime, event.isAllDay);
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

        _endCollection: function(date, collections, isAllDay) {
            for (var collectionIndex = 0; collectionIndex < collections.length; collectionIndex++) {
                var collection = collections[collectionIndex];

                if (collection.endInRange(date, isAllDay)) {
                    return collection;
                }
            }

            return null;
        },

        _getCollections: function(isDay) {
            return isDay ? this._daySlotCollections : this._timeSlotCollections;
        },

        continuousSlot: function(slot, reverse) {
            var pad = reverse ? -1 : 1;
            var collections = this._getCollections(slot.isDaySlot);
            var collection = collections[slot.collectionIndex + pad];

            return collection ? collection[reverse ? "last" : "first"]() : undefined;
        },

        firstSlot: function() {
            var collections = this._getCollections(this.daySlotCollectionCount());

            return collections[0].first();
        },

        lastSlot: function() {
            var collections = this._getCollections(this.daySlotCollectionCount());

            return collections[collections.length - 1].last();
        },

        upSlot: function(slot, keepCollection) {
            var that = this;
            var moveToDaySlot = function(isDaySlot, collectionIndex, index) {
                var isFirstCell = index === 0;

                if (!keepCollection && !isDaySlot && isFirstCell && that.daySlotCollectionCount()) {
                    return that._daySlotCollections[0].at(collectionIndex);
                }
            };

            if (!this.timeSlotCollectionCount()) {
                keepCollection = true;
            }

            return this._verticalSlot(slot, -1, moveToDaySlot);
        },

        downSlot: function(slot, keepCollection) {
            var that = this;
            var moveToTimeSlot = function(isDaySlot, collectionIndex, index) {
                if (!keepCollection && isDaySlot && that.timeSlotCollectionCount()) {
                    return that._timeSlotCollections[index].at(0);
                }
            };

            if (!this.timeSlotCollectionCount()) {
                keepCollection = true;
            }

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
            var isDaySlot = slot.isDaySlot;
            var collectionIndex = slot.collectionIndex;
            var collections = this._getCollections(isDaySlot);

            if (isDaySlot) {
                index += step;
            } else {
                collectionIndex += step;
            }

            var collection = collections[collectionIndex];

            return collection ? collection.at(index) : undefined;
        },

        _verticalSlot: function(slot, step, swapCollection) {
            var index = slot.index;
            var isDaySlot = slot.isDaySlot;
            var collectionIndex = slot.collectionIndex;
            var collections = this._getCollections(isDaySlot);

            slot = swapCollection(isDaySlot, collectionIndex, index);
            if (slot) {
                return slot;
            }

            if (isDaySlot) {
                collectionIndex += step;
            } else {
                index += step;
            }

            var collection = collections[collectionIndex];

            return collection ? collection.at(index) : undefined;
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
            var collection = this._endCollection(time, collections, isAllDay);

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

        getSlotCollection: function(index, isDay) {
            return this[isDay ? "getDaySlotCollection" : "getTimeSlotCollection"](index);
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
        },

        outerRect: function(start, end, snap) {
            return this._rect("offset", start, end, snap);
        },

        _rect: function(property, start, end, snap) {
            var top;
            var bottom;
            var left;
            var right;
            var startSlot = this.start;
            var endSlot = this.end;
            var isRtl = kendo.support.isRtl(startSlot.element);

            if (typeof start != "number") {
                start = kendo.date.toUtcTime(start);
            }

            if (typeof end != "number") {
                end = kendo.date.toUtcTime(end);
            }

            if (snap) {
                top = startSlot.offsetTop;
                bottom = endSlot.offsetTop + endSlot[property + "Height"];
                if(isRtl) {
                    left = endSlot.offsetLeft;
                    right = startSlot.offsetLeft + startSlot[property + "Width"];
                } else {
                    left = startSlot.offsetLeft;
                    right = endSlot.offsetLeft + endSlot[property + "Width"];
                }
            } else {
                var startOffset = start - startSlot.start;

                if (startOffset < 0) {
                    startOffset = 0;
                }

                var startSlotDuration = startSlot.end - startSlot.start;

                top = startSlot.offsetTop + startSlot[property + "Height"] * startOffset / startSlotDuration;

                var endOffset = endSlot.end - end;

                if (endOffset < 0) {
                    endOffset = 0;
                }

                var endSlotDuration = endSlot.end - endSlot.start;

                bottom = endSlot.offsetTop + endSlot[property + "Height"] - endSlot[property + "Height"] * endOffset / endSlotDuration;

                if(isRtl) {
                    left = Math.round(endSlot.offsetLeft + endSlot[property + "Width"]* endOffset / endSlotDuration);
                    right = Math.round(startSlot.offsetLeft + startSlot[property + "Width"] - startSlot[property + "Width"] * startOffset / startSlotDuration);
                } else {
                    left = Math.round(startSlot.offsetLeft + startSlot[property + "Width"] * startOffset / startSlotDuration);
                    right = Math.round(endSlot.offsetLeft + endSlot[property + "Width"] - endSlot[property + "Width"] * endOffset / endSlotDuration);
                }
            }

            return {
                top: top,
                bottom: bottom,
                //first column has no left border
                left: left === 0 ? left : left + 1,
                right: right
            };
        },

        innerRect: function(start, end, snap) {
            return this._rect("client", start, end, snap);
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
        },

        startInRange: function(date) {
            return this._start <= date && date < this._end;
        },

        endInRange: function(date, isAllDay) {
            var end = isAllDay ? date < this._end : date <= this._end;
            return this._start <= date && end;
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
        addTimeSlot: function(element, start, end, isHorizontal) {
            var slot = new TimeSlot(element, start, end, this._groupIndex, this._collectionIndex, this._slots.length, isHorizontal);

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
            return kendo.timezone.toLocalDate(this.start);
        },

        endDate: function() {
            return kendo.timezone.toLocalDate(this.end);
        },

        startInRange: function(date) {
            return this.start <= date && date < this.end;
        },

        endInRange: function(date) {
            return this.start < date && date <= this.end;
        },

        startOffset: function() {
           return this.start;
        },

        endOffset: function() {
            return this.end;
        }
    });

    var TimeSlot = Slot.extend({
        init: function(element, start, end, groupIndex, collectionIndex, index, isHorizontal) {
            Slot.fn.init.apply(this, arguments);

            this.isHorizontal = isHorizontal ? true : false;
        },

        refresh: function() {
            var element = this.element;

            this.clientWidth = element.clientWidth;
            this.clientHeight = element.clientHeight;
            this.offsetWidth = element.offsetWidth;
            this.offsetHeight = element.offsetHeight;
            this.offsetTop = element.offsetTop;
            this.offsetLeft = element.offsetLeft;
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
        },

        startOffset: function(x, y, snap) {
            if (snap) {
                return this.start;
            }

            var offset = $(this.element).offset();

            var duration = this.end - this.start;
            var difference;
            var time;

            if (this.isHorizontal) {
                //need update
                var isRtl = kendo.support.isRtl(this.element);
                difference =  x - offset.left;
                time = Math.floor(duration * ( difference / this.offsetWidth));

                if (isRtl) {
                    return this.start + duration - time;
                }
            } else {
                difference = y - offset.top;
                time = Math.floor(duration * ( difference / this.offsetHeight));
            }

            return this.start + time;
        },

        endOffset: function(x, y, snap) {
            if (snap) {
                return this.end;
            }

            var offset = $(this.element).offset();

            var duration = this.end - this.start;
            var difference;
            var time;

            if (this.isHorizontal) {
                //need update
                var isRtl = kendo.support.isRtl(this.element);
                difference = x - offset.left;
                time = Math.floor(duration * ( difference / this.offsetWidth));

                if (isRtl) {
                    return this.start + duration - time;
                }
            } else {
                difference = y - offset.top;
                time = Math.floor(duration * ( difference / this.offsetHeight));
            }

            return this.start + time;
        }
    });

    var DaySlot = Slot.extend({
        init: function(element, start, end, groupIndex, collectionIndex, index, eventCount) {
            Slot.fn.init.apply(this, arguments);

            this.eventCount = eventCount;
            this.isDaySlot = true;

            if (this.element.children.length) {
                this.firstChildHeight = this.element.children[0].offsetHeight + 3;
                this.firstChildTop = this.element.children[0].offsetTop;
            } else {
                this.firstChildHeight = 3;
                this.firstChildTop = 0;
            }
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

    kendo.ui.SchedulerView = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this._scrollbar = scrollbar();
            this._isRtl = kendo.support.isRtl(element);
            this._resizeHint = $();
            this._moveHint = $();
            this._cellId = kendo.guid();
            this._resourcesForGroups();
            this._selectedSlots = [];
        },

        _isMobile: function() {
            var options = this.options;
            return (options.mobile === true && kendo.support.mobileOS) || options.mobile === "phone" || options.mobile === "tablet";
        },

        _isMobilePhoneView: function() {
            var options = this.options;
            return (options.mobile === true && kendo.support.mobileOS && !kendo.support.mobileOS.tablet) || options.mobile === "phone";
        },

        _addResourceView: function() {
            var resourceView = new ResourceView(this.groups.length);

            this.groups.push(resourceView);

            return resourceView;
        },

        dateForTitle: function() {
            return kendo.format(this.options.selectedDateFormat, this.startDate(), this.endDate());
        },

        _changeGroup: function(selection, previous) {
            var method = previous ? "prevGroupSlot" : "nextGroupSlot";
            var slot = this[method](selection.start, selection.groupIndex, selection.isAllDay);

            if (slot) {
                selection.groupIndex += previous ? -1 : 1;
            }

            return slot;
        },

        _changeGroupContinuously: function() {
            return null;
        },

        _changeViewPeriod: function() {
            return false;
        },

        _horizontalSlots: function(selection, ranges, multiple, reverse) {
            var method = reverse ? "leftSlot" : "rightSlot";
            var startSlot = ranges[0].start;
            var endSlot = ranges[ranges.length - 1].end;
            var group = this.groups[selection.groupIndex];

            if (!multiple) {
                var slot = this._normalizeHorizontalSelection(selection, ranges, reverse);
                if (slot) {
                    startSlot = endSlot = slot;
                }
            }

            startSlot = group[method](startSlot);
            endSlot = group[method](endSlot);

            if (!multiple && !this._isVerticallyGrouped() && (!startSlot || !endSlot)) {
                startSlot = endSlot = this._changeGroup(selection, reverse);
            }

            var continuousSlot;

            if (!startSlot || !endSlot) {
                continuousSlot = this._continuousSlot(selection, ranges, reverse);
                continuousSlot = this._changeGroupContinuously(selection, continuousSlot, multiple, reverse);

                if (continuousSlot) {
                    startSlot = endSlot = continuousSlot;
                }
            }

            return {
                startSlot: startSlot,
                endSlot: endSlot
            };
        },

        _verticalSlots: function(selection, ranges, multiple, reverse) {
            var startSlot = ranges[0].start;
            var endSlot = ranges[ranges.length - 1].end;
            var group = this.groups[selection.groupIndex];

            if (!multiple) {
                var slot = this._normalizeVerticalSelection(selection, ranges, reverse);
                if (slot) {
                    startSlot = endSlot = slot;
                }
            }

            var method = reverse ? "upSlot" : "downSlot";

            startSlot = group[method](startSlot, multiple);
            endSlot = group[method](endSlot, multiple);

            if (!multiple && this._isVerticallyGrouped() && (!startSlot || !endSlot)) {
                startSlot = endSlot = this._changeGroup(selection, reverse);
            }

            return {
                startSlot: startSlot,
                endSlot: endSlot
            };
        },

        _normalizeHorizontalSelection: function() {
            return null;
        },

        _normalizeVerticalSelection: function(selection, ranges, reverse) {
            var slot;

            if (reverse) {
                slot = ranges[0].start;
            } else {
                slot = ranges[ranges.length - 1].end;
            }

            return slot;
        },

        _continuousSlot: function() {
            return null;
        },

        constrainSelection: function(selection) {
            var group = this.groups[0];
            var slot;

            if (!this.inRange(selection)) {
                slot = group.firstSlot();

                selection.isAllDay = slot.isDaySlot;
                selection.start = slot.startDate();
                selection.end = slot.endDate();
            } else {
                if (!group.daySlotCollectionCount()) {
                    selection.isAllDay = false;
                }
            }

            if (!this.groups[selection.groupIndex]) {
                selection.groupIndex = 0;
            }
        },

        move: function(selection, key, shift) {
            var handled = false;
            var group = this.groups[selection.groupIndex];

            if (!group.timeSlotCollectionCount()) {
                selection.isAllDay = true;
            }

            var ranges = group.ranges(selection.start, selection.end, selection.isAllDay, false);
            var startSlot, endSlot, reverse, slots;

            if (key === keys.DOWN || key === keys.UP) {
                handled = true;
                reverse = key === keys.UP;

                this._updateDirection(selection, ranges, shift, reverse, true);

                slots = this._verticalSlots(selection, ranges, shift, reverse);

                if (!slots.startSlot && !shift && this._changeViewPeriod(selection, reverse, true)) {
                    return handled;
                }

            } else if (key === keys.LEFT || key === keys.RIGHT) {
                handled = true;
                reverse = key === keys.LEFT;

                this._updateDirection(selection, ranges, shift, reverse, false);

                slots = this._horizontalSlots(selection, ranges, shift, reverse);

                if (!slots.startSlot && !shift && this._changeViewPeriod(selection, reverse, false)) {
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
                    selection.isAllDay = startSlot.isDaySlot;
                    selection.start = startSlot.startDate();
                    selection.end = endSlot.endDate();
                }

                selection.events = [];
            }

            return handled;
        },

        moveToEventInGroup: function(group, slot, selectedEvents, prev) {
            var events = group._continuousEvents || [];

            var found, event;

            var pad = prev ? -1 : 1;

            var length = events.length;
            var idx = prev ? length - 1 : 0;

            while (idx < length && idx > -1) {
                event = events[idx];

                if ( (!prev && event.start.startDate() >= slot.startDate()) ||
                    (prev && event.start.startDate() <= slot.startDate()) ) {

                    if (selectedEvents.length) {
                        event = events[idx + pad];
                    }

                    if (event && $.inArray(event.uid, selectedEvents) === -1) {
                        found = !!event;
                        break;
                    }
                }

                idx += pad;
            }

            return event;
        },

        moveToEvent: function(selection, prev) {
            var groupIndex = selection.groupIndex;

            var group = this.groups[groupIndex];
            var slot = group.ranges(selection.start, selection.end, selection.isAllDay, false)[0].start;

            var length = this.groups.length;
            var pad = prev ? -1 : 1;
            var events = selection.events;
            var event;

            while (groupIndex < length && groupIndex > -1) {
                event = this.moveToEventInGroup(group, slot, events, prev);

                groupIndex += pad;
                group = this.groups[groupIndex];

                if (!group || event) {
                    break;
                }

                events = [];
                if (prev) {
                    slot = group.lastSlot();
                } else {
                    slot = group.firstSlot(true);
                }
            }

            if (event) {
                selection.events = [ event.uid ];
                selection.start = event.start.startDate();
                selection.end = event.end.endDate();
                selection.isAllDay = event.start.isDaySlot;
                selection.groupIndex = event.start.groupIndex;
            }

            return !!event;
        },

        current: function(candidate) {
            if (candidate !== undefined) {
                this._current = candidate;
                this._scrollTo(candidate, this.content[0]);
            } else {
                return this._current;
            }
        },

        select: function(selection) {
            this.clearSelection();

            if (!this._selectEvents(selection)) {
                this._selectSlots(selection);
            }
        },

        _selectSlots: function(selection) {
            var isAllDay = selection.isAllDay;
            var group = this.groups[selection.groupIndex];

            if (!group.timeSlotCollectionCount()) {
                isAllDay = true;
            }

            this._selectedSlots = [];

            var ranges = group.ranges(selection.start, selection.end, isAllDay, false);
            var element;
            var slot;

            for (var rangeIndex = 0; rangeIndex < ranges.length; rangeIndex++) {
                var range = ranges[rangeIndex];
                var collection = range.collection;

                for (var slotIndex = range.start.index; slotIndex <= range.end.index; slotIndex++) {
                    slot = collection.at(slotIndex);

                    element = slot.element;
                    element.setAttribute("aria-selected", true);
                    addSelectedState(element);

                    this._selectedSlots.push({
                        start: slot.startDate(),
                        end: slot.endDate(),
                        element: element
                    });
                }
            }

            if (selection.backward) {
                element = ranges[0].start.element;
            }

            this.current(element);
        },

        _selectEvents: function(selection) {
            var found = false;
            var events = selection.events;
            var groupEvents = this.groups[selection.groupIndex]._continuousEvents || [];
            var idx, length = groupEvents.length;

            if (!events[0] || !groupEvents[0]) {
                return found;
            }

            var result = $();
            selection.events = [];
            for (idx = 0; idx < length; idx ++) {
                if ($.inArray(groupEvents[idx].uid, events) > -1) {
                    result = result.add(groupEvents[idx].element);
                    selection.events.push(groupEvents[idx].uid);
                }
            }

            if (result[0]) {
                result.addClass("k-state-selected").attr("aria-selected", true);
                this.current(result.last()[0]);
                this._selectedSlots = [];
                found = true;
            }

            return found;
        },

        inRange: function(options) {
            var startDate = this.startDate();
            var endDate = kendo.date.addDays(this.endDate(), 1);
            var start = options.start;
            var end = options.end;

            return startDate <= start && start < endDate && startDate < end && end <= endDate;
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

                    var value = this._resourceValue(resource, resource.dataSource.view()[resourceIndex % resource.dataSource.total()]);

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

        _shouldInverseResourceColor: function(resource) {
            var resourceColorIsDark = new Color(resource.color).isDark();
            var currentColor = this.element.css("color");
            var currentColorIsDark = new Color(currentColor).isDark();

            return (resourceColorIsDark == currentColorIsDark);
        },

       _eventTmpl: function(template, wrapper) {
           var options = this.options,
               settings = $.extend({}, kendo.Template, options.templateSettings),
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

            var tmpl = kendo.template(kendo.format(wrapper, html), settings);

            if (state.count > 0) {
                tmpl = $.proxy(tmpl, state.storage);
            }

            return tmpl;
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

                    if (eventResource !== null) {
                        var resourceColor = kendo.getter(resource.dataColorField)(eventResource);
                        resources.push({
                            field: resource.field,
                            title: resource.title,
                            name: resource.name,
                            text: kendo.getter(resource.dataTextField)(eventResource),
                            value: value,
                            color: resourceColor
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

            this.table = $('<table ' + cellspacing() + ' class="k-scheduler-layout k-scheduler-' + this.name + 'view"/>');

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

            for (var idx = 0; idx < toolbar.length; idx++) {
                height -= toolbar.eq(idx).outerHeight();
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
            } else {
                that.datesHeader.css("padding-" + paddingDirection, "");
            }
            if (contentDiv.offsetHeight - contentDiv.clientHeight > 0 || contentDiv.clientHeight > that.content.children(".k-scheduler-table").height()) {
                that.table.addClass("k-scrollbar-h");
            } else {
                that.table.removeClass("k-scrollbar-h");
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
                    return $(e.event.target).closest(".k-event.k-event-active").length > 0;
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

        _createColumnsLayout: function(resources, inner, template) {
            return createLayoutConfiguration("columns", resources, inner, template);
        },

        _groupOrientation: function() {
            var groups = this.options.group;
            return groups && groups.resources ? groups.orientation : "horizontal";
        },

        _isVerticallyGrouped: function() {
            return this.groupedResources.length && this._groupOrientation() === "vertical";
        },

        _createRowsLayout: function(resources, inner, template) {
            return createLayoutConfiguration("rows", resources, inner, template);
        },

        selectionByElement: function() {
            return null;
        },

        clearSelection: function() {
            this.content
                .find(".k-state-selected")
                .removeAttr("id")
                .attr("aria-selected", false)
                .removeClass("k-state-selected");
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(this);

            if (that.table) {
                kendo.destroy(that.table);
                that.table.remove();
            }

            that.groups = null;
            that.table = null;
            that.content = null;
            that.times = null;
            that.datesHeader = null;
            that.timesHeader = null;
            that.footer = null;
            that._resizeHint = null;
            that._moveHint = null;
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
                    collection = group._collection(isDay ? slot.index : slot.collectionIndex, false);
                    return collection.last();
                }
            } else {
                if (!group.timeSlotCollectionCount()) {
                    collection = group._collection(slot.collectionIndex, true);
                    return collection.last();
                } else {
                    collection = group._collection(isDay ? 0 : group.timeSlotCollectionCount() - 1, isDay);
                    return isDay ? collection.last() : collection.at(slot.index);
                }
            }
        },

        nextGroupSlot: function(date, groupIndex, isDay) {
            var collection;
            var group = this.groups[groupIndex];
            var slot = group.ranges(date, date, isDay, false)[0].start;
            var daySlotCollectionCount;

            if (groupIndex >= this.groups.length - 1) {
                return;
            }

            if (this._isVerticallyGrouped()) {
                if (!group.timeSlotCollectionCount()) {
                    collection = group._collection(0, true);
                    return collection.at(slot.index);
                } else {
                    daySlotCollectionCount = group.daySlotCollectionCount();
                    collection = group._collection(daySlotCollectionCount ? 0 : slot.collectionIndex, daySlotCollectionCount);

                    return isDay ? collection.first() : collection.at(slot.collectionIndex);
                }
            } else {
                if (!group.timeSlotCollectionCount()) {
                    collection = group._collection(slot.collectionIndex, true);
                    return collection.first();
                } else {
                    collection = group._collection(0, isDay);
                    return isDay ? collection.first() : collection.at(slot.index);
                }
            }
        },

        _updateEventForMove: function (event) {
            return;
        },

        _updateEventForResize: function (event) {
            return;
        },

        _updateEventForSelection: function (event) {
            return event;
        }
    });

    function collidingEvents(elements, start, end) {
        var idx,
            index,
            startIndex,
            overlaps,
            endIndex;

        for (idx = elements.length-1; idx >= 0; idx--) {
            index = rangeIndex(elements[idx]);
            startIndex = index.start;
            endIndex = index.end;

            overlaps = startIndex <= start && endIndex >= start;

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

    var Color = function(value) {
        var color = this,
            formats = Color.formats,
            re,
            processor,
            parts,
            i,
            channels;

        if (arguments.length === 1) {
            value = color.resolveColor(value);

            for (i = 0; i < formats.length; i++) {
                re = formats[i].re;
                processor = formats[i].process;
                parts = re.exec(value);

                if (parts) {
                    channels = processor(parts);
                    color.r = channels[0];
                    color.g = channels[1];
                    color.b = channels[2];
                }
            }
        } else {
            color.r = arguments[0];
            color.g = arguments[1];
            color.b = arguments[2];
        }

        color.r = color.normalizeByte(color.r);
        color.g = color.normalizeByte(color.g);
        color.b = color.normalizeByte(color.b);
    };

    Color.prototype = {
        resolveColor: function(value) {
            value = value || "#000";

            if (value.charAt(0) == "#") {
                value = value.substr(1, 6);
            }

            value = value.replace(/ /g, "");
            value = value.toLowerCase();
            value = Color.namedColors[value] || value;

            return value;
        },

        normalizeByte: function(value) {
            return (value < 0 || isNaN(value)) ? 0 : ((value > 255) ? 255 : value);
        },

        percBrightness: function() {
            var color = this;
            return math.sqrt(0.241 * color.r * color.r + 0.691 * color.g * color.g + 0.068 * color.b * color.b);
        },

        isDark: function() {
            var color = this;
            var brightnessValue = color.percBrightness();
            return brightnessValue < 180;
        }
    };

    Color.formats = [{
            re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
            process: function(parts) {
                return [
                    parseInt(parts[1], 10), parseInt(parts[2], 10), parseInt(parts[3], 10)
                ];
            }
        }, {
            re: /^(\w{2})(\w{2})(\w{2})$/,
            process: function(parts) {
                return [
                    parseInt(parts[1], 16), parseInt(parts[2], 16), parseInt(parts[3], 16)
                ];
            }
        }, {
            re: /^(\w{1})(\w{1})(\w{1})$/,
            process: function(parts) {
                return [
                    parseInt(parts[1] + parts[1], 16),
                    parseInt(parts[2] + parts[2], 16),
                    parseInt(parts[3] + parts[3], 16)
                ];
            }
        }
    ];

    Color.namedColors = {
        aqua: "00ffff", azure: "f0ffff", beige: "f5f5dc",
        black: "000000", blue: "0000ff", brown: "a52a2a",
        coral: "ff7f50", cyan: "00ffff", darkblue: "00008b",
        darkcyan: "008b8b", darkgray: "a9a9a9", darkgreen: "006400",
        darkorange: "ff8c00", darkred: "8b0000", dimgray: "696969",
        fuchsia: "ff00ff", gold: "ffd700", goldenrod: "daa520",
        gray: "808080", green: "008000", greenyellow: "adff2f",
        indigo: "4b0082", ivory: "fffff0", khaki: "f0e68c",
        lightblue: "add8e6", lightgrey: "d3d3d3", lightgreen: "90ee90",
        lightpink: "ffb6c1", lightyellow: "ffffe0", lime: "00ff00",
        limegreen: "32cd32", linen: "faf0e6", magenta: "ff00ff",
        maroon: "800000", mediumblue: "0000cd", navy: "000080",
        olive: "808000", orange: "ffa500", orangered: "ff4500",
        orchid: "da70d6", pink: "ffc0cb", plum: "dda0dd",
        purple: "800080", red: "ff0000", royalblue: "4169e1",
        salmon: "fa8072", silver: "c0c0c0", skyblue: "87ceeb",
        slateblue: "6a5acd", slategray: "708090", snow: "fffafa",
        steelblue: "4682b4", tan: "d2b48c", teal: "008080",
        tomato: "ff6347", turquoise: "40e0d0", violet: "ee82ee",
        wheat: "f5deb3", white: "ffffff", whitesmoke: "f5f5f5",
        yellow: "ffff00", yellowgreen: "9acd32"
    };

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

    function createLayoutConfiguration(name, resources, inner, template) {
        var resource = resources[0];
        if (resource) {
            var configuration = [];

            var data = resource.dataSource.view();

            for (var dataIndex = 0; dataIndex < data.length; dataIndex++) {
                var obj = {
                    text: template({
                        text: kendo.htmlEncode(kendo.getter(resource.dataTextField)(data[dataIndex])),
                        color: kendo.getter(resource.dataColorField)(data[dataIndex]),
                        field: resource.field,
                        title: resource.title,
                        name: resource.name,
                        value:kendo.getter(resource.dataValueField)(data[dataIndex])
                    }),
                    className: "k-slot-cell"
                };
                obj[name] = createLayoutConfiguration(name, resources.slice(1), inner, template);

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
        groupEqFilter: groupEqFilter
    });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
