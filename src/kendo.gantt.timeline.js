(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = {
    id: "gantt.timeline",
    name: "Gantt Timeline",
    category: "web",
    description: "The Gantt Timeline",
    depends: [ "core" ],
    hidden: true
};

(function($) {

    var Widget = kendo.ui.Widget;
    var kendoDomElement = kendo.dom.element;
    var kendoTextElement = kendo.dom.text;
    var isPlainObject = $.isPlainObject;
    var extend = $.extend;
    var Query = kendo.data.Query;
    var NS = ".kendoGanttTimeline";
    var CLICK = "click";
    var RESIZE_HINT = '<div class="k-marquee k-gantt-marquee">' +
                           '<div class="k-marquee-color"></div>' +
                       '</div>';
    var RESIZE_TOOLTIP_TEMPLATE = kendo.template('<div class="k-animation-container" style="width: 220px; height: 40px; margin-left: -2px; padding-left: 2px; padding-right: 2px; padding-bottom: 4px; overflow: hidden; position: absolute; z-index: 10002; box-sizing: content-box;">' +
                              '<div role="tooltip" class="k-widget k-tooltip k-popup k-group k-reset" data-role="popup" aria-hidden="true">' +
                                   '<div class="k-tooltip-content">' +
                                        '<div class="k-tooltip-content-start">Start: #=kendo.toString(start, "ddd M/dd, HH:mm")#</div>' +
                                        '<div class="k-tooltip-content-end">End: #=kendo.toString(end, "ddd M/dd, HH:mm")#</div>' +
                                   '</div>' +
                              '</div>' +
                         '</div>');

    var defaultViews = {
        day: {
            type: "kendo.ui.GanttDayView"
        },
        week: {
            type: "kendo.ui.GanttWeekView"
        },
        month: {
            type: "kendo.ui.GanttMonthView"
        }
    };

    function trimOptions(options) {
        delete options.name;
        delete options.prefix;
        delete options.views;

        return options;
    }

    function getWorkDays(options) {
        var workDays = [];
        var dayIndex = options.workWeekStart;

        workDays.push(dayIndex);

        while (options.workWeekEnd != dayIndex) {
            if (dayIndex > 6) {
                dayIndex -= 7;
            } else {
                dayIndex++;
            }
            workDays.push(dayIndex);
        }
        return workDays;
    }

    var GanttView = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this.title = this.options.title || this.options.name;

            this.header = this.element.find(".k-grid-header");

            this.content = this.element.find(".k-grid-content");

            this.contentWidth = this.content.width();

            this._workDays = getWorkDays(this.options);

            this._headerTree = options.headerTree;

            this._taskTree = options.taskTree;

            this._dependencyTree = options.dependencyTree;

            this._templates();

            this._taskCoordinates = {};
        },

        destroy: function() {
            Widget.fn.destroy.call(this);

            this.headerRow = null;
            this.header = null;
            this.content = null;

            this._dragHint = null;
            this._resizeHint = null;

            this._headerTree = null;
            this._taskTree = null;
            this._dependencyTree = null;
        },

        options: {
            timeHeaderTemplate: "",
            dayHeaderTemplate: "",
            weekHeaderTemplate: "",
            monthHeaderTemplate: "",
            showWorkHours: false,
            showWorkDays: false,
            workDayStart: new Date(1980, 1, 1, 8, 0, 0),
            workDayEnd: new Date(1980, 1, 1, 17, 0, 0),
            workWeekStart: 1,
            workWeekEnd: 5,
            hourSpan: 1,
            slotSize: 100
        },

        _templates: function() {
            var options = this.options;

            this.timeHeaderTemplate = kendo.template(options.timeHeaderTemplate);
            this.dayHeaderTemplate = kendo.template(options.dayHeaderTemplate);
            this.weekHeaderTemplate = kendo.template(options.weekHeaderTemplate);
            this.monthHeaderTemplate = kendo.template(options.monthHeaderTemplate);
        },

        renderLayout: function() {
            this._slots = this._createSlots();

            this._tableWidth = this._calculateTableWidth();

            this.createLayout(this._layout());

            this._slotDimensions();

            this.content.height(this.element.height() - this.header.outerHeight());
        },

        createLayout: function(rows) {
            var headers = this._headers(rows);
            var colgroup = this._colgroup();
            var tree = this._headerTree;
            var header = kendoDomElement("thead", null, headers);
            var table = kendoDomElement("table", { style: { width: this._tableWidth + "px"} }, [colgroup, header]);

            tree.render([table]);

            this.headerRow = this.header.find("table:first tr").last();
        },

        _slotDimensions: function() {
            var headers = this.headerRow[0].children;
            var slots = this._timeSlots();
            var slot;
            var header;

            for (var i = 0, length = headers.length; i < length; i++) {
                header = headers[i];
                slot = slots[i];

                slot.offsetLeft = header.offsetLeft;
                slot.offsetWidth = header.offsetWidth;
            }
        },

        render: function(tasks) {
            var taskCount = tasks.length;

            var rowsTable = this._rowsTable(taskCount);
            var columnsTable = this._columnsTable(taskCount);
            var tasksTable = this._tasksTable(tasks);

            this._taskTree.render([rowsTable, columnsTable, tasksTable]);

            this._contentHeight = this.content.find(".k-gantt-rows").height();
            this._rowHeight = this.content.find(".k-gantt-rows tr").height();

            this.content.find(".k-gantt-columns").height(this._contentHeight);
        },

        _rowsTable: function(rowCount) {
            var rows = [];
            var row;
            var attributes = [null, { className: "k-alt" }];

            for (var i = 0; i < rowCount; i++) {
                row = kendoDomElement("tr", attributes[i % 2], [kendoDomElement("td")]);

                rows.push(row);
            }

            return this._createTable(1, rows, { className: "k-gantt-rows" });
        },

        _columnsTable: function(rowCount) {
            var cells = [];
            var row;
            var slots = this._timeSlots();
            var slotsCount = slots.length;
            var slotSpan;
            var totalSpan = 0;
            var attributes;

            for (var i = 0; i < slotsCount; i++) {
                slotSpan = slots[i].span;

                totalSpan += slotSpan;

                attributes = (slotSpan !== 1) ? { colspan: slotSpan } : null;

                cells.push(kendoDomElement("td", attributes));
            }

            row = kendoDomElement("tr", null, cells);

            return this._createTable(totalSpan, [row], { className: "k-gantt-columns" });
        },

        _tasksTable: function(tasks) {
            var rows = [];
            var row;
            var position;
            var task;
            var coordinates = this._taskCoordinates = {};

            for (var i = 0, l = tasks.length; i < l; i++) {
                task = tasks[i];

                position = this._taskPosition(task);

                row = kendoDomElement("tr", null, [
                    kendoDomElement("td", null, [
                        this._renderTask(tasks[i], position)
                    ])
                ]);

                rows.push(row);

                coordinates[task.id] = {
                    start: position.left,
                    end: position.left + position.width,
                    rowIndex: i
                };
            }

            return this._createTable(1, rows, { className: "k-gantt-tasks" });
        },

        _createTable: function(colspan, rows, styles) {
            var cols = [];
            var colgroup;
            var tbody;

            for (var i = 0; i < colspan; i++) {
                cols.push(kendoDomElement("col"));
            }

            colgroup = kendoDomElement("colgroup", null, cols);

            tbody = kendoDomElement("tbody", null, rows);

            if (!styles.style) {
                styles.style = {};
            }

            styles.style.width = this._tableWidth + "px";

            return kendoDomElement("table", styles, [colgroup, tbody]);
        },

        _calculateTableWidth: function() {
            var slots = this._timeSlots();
            var maxSpan = 0;
            var totalSpan = 0;
            var currentSpan;
            var tableWidth;

            for (var i = 0, length = slots.length; i < length; i++) {
                currentSpan = slots[i].span;

                totalSpan += currentSpan;

                if (currentSpan > maxSpan) {
                    maxSpan = currentSpan;
                }
            }

            tableWidth = Math.round((totalSpan * this.options.slotSize) / maxSpan);

            return tableWidth;
        },

        _renderTask: function(task, position) {
            var taskWrapper;
            var taskElement;
            var progressHandleLeft;
            var taskLeft = position.left;
            var wrapClassName = "k-task-wrap";

            if (task.summary) {
                taskElement = this._renderSummary(task, position);
            } else if (task.isMilestone()) {
                taskElement = this._renderMilestone(task, position);
                wrapClassName += " k-milestone-wrap";
            } else {
                taskElement = this._renderSingleTask(task, position);
            }

            taskWrapper = kendoDomElement("div", { className: wrapClassName, style: { left: taskLeft + "px" } }, [
                taskElement,
                kendoDomElement("div", { className: "k-task-dot k-task-start" }),
                kendoDomElement("div", { className: "k-task-dot k-task-end" })
            ]);

            if (!task.summary && !task.isMilestone()) {
                progressHandleLeft = Math.round(position.width * task.percentComplete / 100);

                taskWrapper.children.push(kendoDomElement("div", { className: "k-task-draghandle", style: { left: progressHandleLeft + "px" } }));
            }

            return taskWrapper;
        },

        _renderSingleTask: function(task, position) {
            var progressWidth = Math.round(position.width * task.percentComplete / 100);

            var element = kendoDomElement("div", { className: "k-task k-task-single", "data-uid": task.uid, style: { width: position.width + "px" } }, [
                kendoDomElement("div", { className: "k-task-complete", style: { width: progressWidth + "px" } }),
                kendoDomElement("div", { className: "k-task-content" }, [
                    kendoDomElement("div", { className: "k-task-template" }, [
                        kendoTextElement(task.title)
                    ]),
                    kendoDomElement("span", { className: "k-task-actions" }, [
                        kendoDomElement("a", { className: "k-link k-task-delete", href: "#" }, [
                            kendoDomElement("span", { className: "k-icon k-si-close" })
                        ])
                    ]),
                    kendoDomElement("span", { className: "k-resize-handle k-resize-w" }),
                    kendoDomElement("span", { className: "k-resize-handle k-resize-e" })
                ])
            ]);

            return element;
        },

        _renderMilestone: function(task, position) {
            var element = kendoDomElement("div", { className: "k-task k-task-milestone", "data-uid": task.uid });

            return element;
        },

        _renderSummary: function(task, position) {
            var element = kendoDomElement("div", { className: "k-task k-task-summary", "data-uid": task.uid, style: { width: position.width + "px" } }, [
                kendoDomElement("div", { className: "k-task-summary-progress", style: { width: task.percentComplete + "%" } }, [
                    kendoDomElement("div", { className: "k-task-summary-complete", style: { width: position.width + "px" } })
                ])
            ]);

            return element;
        },

        _taskPosition: function(task) {
            var round = Math.round;
            var startLeft = round(this._offset(task.start));
            var endLeft = round(this._offset(task.end));

            return { left: startLeft, width: endLeft - startLeft };
        },

        _offset: function(date) {
            var slots = this._timeSlots();
            var slot;
            var startOffset;
            var slotDuration;
            var slotOffset;
            var startIndex = this._slotIndex("start", date);

            slot = slots[startIndex];

            if (slot.end < date) {
                return slot.offsetLeft + slot.offsetWidth;
            }

            if (slot.start > date) {
                return slot.offsetLeft;
            }

            startOffset = date - slot.start;
            slotDuration = slot.end - slot.start;
            slotOffset = (startOffset / slotDuration) * slot.offsetWidth;

            return slot.offsetLeft + slotOffset;
        },

        _slotIndex: function(field, value) {
            var slots = this._timeSlots();
            var startIdx = 0;
            var endIdx = slots.length - 1;
            var middle;

            do {
                middle = Math.ceil((endIdx + startIdx) / 2);

                if (slots[middle][field] < value) {
                    startIdx = middle;
                } else {
                    if (middle === endIdx) {
                        middle--;
                    }

                    endIdx = middle;
                }
            } while (startIdx !== endIdx);

            return startIdx;
        },

        _timeByPosition: function(x, snap, snapToEnd) {
            var slot = this._slotByPosition(x);

            if (snap) {
                return snapToEnd ? slot.end : slot.start;
            }

            var offsetLeft = x - (this.content.offset().left - this.content.scrollLeft());
            var duration = slot.end - slot.start;
            var slotOffset = duration * ((offsetLeft - slot.offsetLeft) / slot.offsetWidth);

            return new Date(slot.start.getTime() + slotOffset);
        },

        _slotByPosition: function(x) {
            var offsetLeft = x - (this.content.offset().left - this.content.scrollLeft());
            var slotIndex = this._slotIndex("offsetLeft", offsetLeft);

            return this._timeSlots()[slotIndex];
        },

        _renderDependencies: function(dependencies) {
            var elements = [];
            var tree = this._dependencyTree;

            for (var i = 0, l = dependencies.length; i < l; i++) {
                elements.push.apply(elements, this._renderDependency(dependencies[i]));

            }

            tree.render(elements);
        },

        _renderDependency: function(dependency) {
            var predecessor = this._taskCoordinates[dependency.predecessorId];
            var successor = this._taskCoordinates[dependency.successorId];
            var elements;
            var method;

            if (!predecessor || !successor) {
                return [];
            }

            method = "_render" + ["FF", "FS", "SF", "SS"][dependency.type];
            elements = this[method](predecessor, successor);

            for (var i = 0, length = elements.length; i < length; i++) {
                elements[i].attr["data-uid"] = dependency.uid;
            }

            return elements;
        },

        _renderFF: function(from, to) {
            var lines = this._dependencyFF(from, to, false);

            lines[lines.length - 1].children[0] = this._arrow(true);

            return lines;
        },

        _renderSS: function(from, to) {
            var lines = this._dependencyFF(to, from, true);

            lines[0].children[0] = this._arrow(false);

            return lines;
        },

        _renderFS: function(from, to) {
            var lines = this._dependencyFS(from, to, false);

            lines[lines.length - 1].children[0] = this._arrow(false);

            return lines;
        },

        _renderSF: function(from, to) {
            var lines = this._dependencyFS(to, from, true);

            lines[0].children[0] = this._arrow(true);

            return lines;
        },

        _dependencyFF: function(from, to, reverse) {
            var that = this;
            var lines = [];
            var left = 0;
            var top = 0;
            var width = 0;
            var height = 0;
            var dir = reverse ? "start" : "end";
            var delta;
            var overlap = 2;
            var arrowOverlap = 1;
            var rowHeight = this._rowHeight;
            var minLineLength = Math.floor(rowHeight / 2);
            var fromTop = from.rowIndex * rowHeight + Math.floor(rowHeight / 2);
            var toTop = to.rowIndex * rowHeight + Math.floor(rowHeight / 2);

            var addHorizontal = function() {
                lines.push(that._line("k-line k-line-h", { left: left + "px", top: top + "px", width: width + "px" }));
            };
            var addVertical = function() {
                lines.push(that._line("k-line k-line-v", { left: left + "px", top: top + "px", height: height + "px" }));
            };

            left = from[dir];
            top = fromTop;
            width = minLineLength;

            delta = to[dir] - from[dir];

            if ((delta) > 0 !== reverse) {
                width = Math.abs(delta) + minLineLength;
            }

            if (reverse) {
                left = left - width;
                width -= arrowOverlap;
                addHorizontal();
            } else {
                addHorizontal();
                left = left + width;
            }

            if (toTop < top) {
                height = top - toTop;
                height += overlap;
                top = toTop;
                addVertical();
            } else {
                height = toTop - top;
                height += overlap;
                addVertical();
                top = top + height - overlap;
            }

            width = Math.abs(left - to[dir]);

            if (!reverse) {
                width -= arrowOverlap;
                left = left - width;
            }

            addHorizontal();

            return lines;
        },

        _dependencyFS: function(from, to, reverse) {
            var that = this;
            var lines = [];
            var left = 0;
            var top = 0;
            var width = 0;
            var height = 0;
            var rowHeight = this._rowHeight;
            var minLineLength = Math.floor(rowHeight / 2);
            var minDistance = 2 * minLineLength;
            var delta = to.start - from.end;
            var overlap = 2;
            var arrowOverlap = 1;
            var fromTop = from.rowIndex * rowHeight + Math.floor(rowHeight / 2) - 1;
            var toTop = to.rowIndex * rowHeight + Math.floor(rowHeight / 2) - 1;

            var addHorizontal = function() {
                lines.push(that._line("k-line k-line-h", { left: left + "px", top: top + "px", width: width + "px" }));
            };
            var addVertical = function() {
                lines.push(that._line("k-line k-line-v", { left: left + "px", top: top + "px", height: height + "px" }));
            };

            left = from.end;
            top = fromTop;
            width = minLineLength;

            if (reverse) {
                left += arrowOverlap;

                if (delta > minDistance) {
                    width = delta - minLineLength;
                }
            }

            addHorizontal();
            left = left + width;

            if ((delta) <= minDistance) {
                height = reverse ? Math.abs(toTop - fromTop) - minLineLength : minLineLength;

                if (toTop < fromTop) {
                    top = top - height;

                    height += overlap;

                    addVertical();
                } else {
                    addVertical();
                    top = top + height;
                }

                width = (from.end - to.start) + minDistance;

                if (width < minLineLength) {
                    width = minLineLength;
                }

                left -= width;

                width += overlap;

                addHorizontal();
            }

            if (toTop < fromTop) {
                height = top - toTop;
                top = toTop;

                height += overlap;

                addVertical();
            } else {
                height = toTop - top;
                addVertical();
                top = top + height;
            }

            width = to.start - left;

            if (!reverse) {
                width -= arrowOverlap;
            }

            addHorizontal();

            return lines;
        },

        _line: function(className, styles) {
            return kendoDomElement("div", { className: className, style: styles });
        },

        _arrow: function(direction) {
            return kendoDomElement("span", { className: direction ? "k-arrow-w" : "k-arrow-e" });
        },

        _colgroup: function() {
            var slots = this._timeSlots();
            var count = slots.length;
            var cols = [];

            for (var i = 0; i < count; i++) {
                for (var j = 0, length = slots[i].span; j < length; j++) {
                    cols.push(kendoDomElement("col"));
                }
            }

            return kendoDomElement("colgroup", null, cols);
        },

        _createDragHint: function(element) {
            this._dragHint = element
                .clone()
                .css("cursor", "move");

            element
                .parent()
                .append(this._dragHint);
        },

        _updateDragHint: function(start) {
            var left = this._offset(start);

            this._dragHint
                .css({
                    "left": left
                });
        },

        _removeDragHint: function() {
            this._dragHint.remove();
            this._dragHint = null;
        },

        _createResizeHint: function(task) {
            var rowHeight = this._rowHeight;
            var taskTop = this._taskCoordinates[task.id].rowIndex * rowHeight + Math.floor(rowHeight / 2);
            var top = taskTop - 70;

            if (top < 20) {
                top = taskTop + 50;
            }

            this._resizeTooltipTop = top;

            this._resizeHint = $(RESIZE_HINT).css({
                "top": 0,
                "height": this._contentHeight
            });

            this.content.append(this._resizeHint);
        },

        _updateResizeHint: function(start, end, resizeStart) {
            var left = this._offset(start);
            var right = this._offset(end);
            var width = right - left;
            var tooltipLeft = resizeStart ? left : right;
            var contentWidth = this.contentWidth - 17;
            var tooltipWidth;

            this._resizeHint
                .css({
                    "left": left,
                    "width": width
                });

            if (this._resizeTooltip) {
                this._resizeTooltip.remove();
            }

            tooltipWidth = 200;
            tooltipLeft -= (tooltipWidth / 2);

            if (tooltipLeft < 0) {
                tooltipLeft = 0;
            } else if (tooltipLeft + tooltipWidth > contentWidth) {
                tooltipLeft = contentWidth - tooltipWidth;
            }

            this._resizeTooltip = $(RESIZE_TOOLTIP_TEMPLATE({ start: start, end: end }))
                .css({
                    "top": this._resizeTooltipTop,
                    "left": tooltipLeft
                });

            this.content.append(this._resizeTooltip);
        },

        _removeResizeHint: function() {
            this._resizeHint.remove();
            this._resizeHint = null;

            this._resizeTooltip.remove();
            this._resizeTooltip = null;
        },

        _timeSlots: function() {
            return this._slots[this._slots.length - 1];
        },

        _headers: function(columnLevels) {
            var rows = [];
            var level;
            var headers;
            var column;
            var headerText;

            for (var levelIndex = 0, levelCount = columnLevels.length; levelIndex < levelCount; levelIndex++) {
                level = columnLevels[levelIndex];
                headers = [];

                for (var columnIndex = 0, columnCount = level.length; columnIndex < columnCount; columnIndex++) {
                    column = level[columnIndex];

                    headerText = kendoTextElement(column.text);
                    headers.push(kendoDomElement("th", { colspan: column.span, className: "k-header" + (column.isNonWorking ? " nonWorking" : "") }, [headerText]));
                }

                rows.push(kendoDomElement("tr", null, headers));
            }

            return rows;
        },

        _hours: function(start, end) {
            var slotEnd;
            var slots = [];
            var options = this.options;
            var workDayStart = options.workDayStart.getHours();
            var workDayEnd = options.workDayEnd.getHours();
            var isWorkHour;
            var hours;
            var hourSpan = options.hourSpan;

            start = new Date(start);
            end = new Date(end);

            while (start < end) {
                slotEnd = new Date(start);
                hours = slotEnd.getHours();

                isWorkHour = hours >= workDayStart && hours < workDayEnd;

                slotEnd.setHours(slotEnd.getHours() + hourSpan);

                if (hours == slotEnd.getHours()) {
                    // Chrome DTS Fix
                    slotEnd.setHours(slotEnd.getHours() + 2 * hourSpan);
                }

                if (!options.showWorkHours || isWorkHour) {
                    slots.push({
                        start: start,
                        end: slotEnd,
                        isNonWorking: !isWorkHour,
                        span: 1
                    });
                }

                start = slotEnd;
            }

            return slots;
        },

        _days: function(start, end) {
            var slotEnd;
            var slots = [];
            var isWorkDay;

            start = new Date(start);
            end = new Date(end);

            while (start < end) {
                slotEnd = kendo.date.nextDay(start);

                isWorkDay = this._isWorkDay(start);

                if (!this.options.showWorkDays || isWorkDay) {
                    slots.push({
                        start: start,
                        end: slotEnd,
                        isNonWorking: !isWorkDay,
                        span: 1
                    });
                }

                start = slotEnd;
            }

            return slots;
        },

        _weeks: function(start, end) {
            var slotEnd;
            var slots = [];
            var firstDay = this.calendarInfo().firstDay;
            var daySlots;
            var span;

            start = new Date(start);
            end = new Date(end);

            while (start < end) {
                slotEnd = kendo.date.dayOfWeek(kendo.date.addDays(start, 1), firstDay, 1);

                if (slotEnd > end) {
                    slotEnd = end;
                }

                daySlots = this._days(start, slotEnd);
                span = daySlots.length;

                if (span > 0) {
                    slots.push({
                        start: daySlots[0].start,
                        end: daySlots[span - 1].end,
                        span: span
                    });
                }

                start = slotEnd;
            }

            return slots;
        },

        _months: function(start, end) {
            var slotEnd;
            var slots = [];
            var daySlots;
            var span;

            start = new Date(start);
            end = new Date(end);

            while (start < end) {
                slotEnd = new Date(start);
                slotEnd.setMonth(slotEnd.getMonth() + 1);

                daySlots = this._days(start, slotEnd);
                span = daySlots.length;

                if (span > 0) {
                    slots.push({
                        start: daySlots[0].start,
                        end: daySlots[span - 1].end,
                        span: span
                    });
                }

                start = slotEnd;
            }

            return slots;
        },

        _slotHeaders: function(slots, template) {
            var columns = [];
            var slot;

            for (var i = 0, l = slots.length; i < l; i++) {
                slot = slots[i];

                columns.push({
                    text: template(slot),
                    isNonWorking: !!slot.isNonWorking,
                    span: slot.span
                });
            }

            return columns;
        },

        _isWorkDay: function(date) {
            var day = date.getDay();
            var workDays = this._workDays;

            for (var i = 0, l = workDays.length; i < l; i++) {
                if (workDays[i] === day) {
                    return true;
                }
            }

            return false;
        },

        calendarInfo: function() {
            return kendo.getCulture().calendars.standard;
        }
    });

    kendo.ui.GanttDayView = GanttView.extend({
        name: "day",

        range: function(range) {
            this.start = kendo.date.getDate(range.start);
            this.end = kendo.date.getDate(range.end);

            if (kendo.date.getMilliseconds(range.end) > 0 || this.end.getTime() === this.start.getTime()) {
                this.end = kendo.date.addDays(this.end, 1);
            }
        },

        _createSlots: function() {
            var span = 24;
            var options = this.options;
            var daySlots;
            var daySlot;
            var hourSlots;
            var hours;
            var slots = [];

            if (options.showWorkHours) {
                span = (options.workDayEnd.getHours() - options.workDayStart.getHours());
            }

            daySlots = this._days(this.start, this.end);
            hourSlots = [];

            for (var i = 0, l = daySlots.length; i < l; i++) {
                daySlot = daySlots[i];
                hours = this._hours(daySlot.start, daySlot.end);

                daySlot.span = hours.length;

                hourSlots.push.apply(hourSlots, hours);
            }

            slots.push(daySlots);
            slots.push(hourSlots);

            return slots;
        },

        _layout: function() {
            var rows = [];

            rows.push(this._slotHeaders(this._slots[0], this.dayHeaderTemplate));
            rows.push(this._slotHeaders(this._slots[1], this.timeHeaderTemplate));

            return rows;
        }
    });

    kendo.ui.GanttWeekView = GanttView.extend({
        name: "week",

        range: function(range) {
            var calendarInfo = this.calendarInfo();
            var firstDay = calendarInfo.firstDay;

            this.start = kendo.date.getDate(kendo.date.dayOfWeek(range.start, firstDay, -1));
            this.end = kendo.date.getDate(kendo.date.dayOfWeek(range.end, firstDay, 1));
        },

        _createSlots: function() {
            var slots = [];

            slots.push(this._weeks(this.start, this.end));
            slots.push(this._days(this.start, this.end));

            return slots;
        },

        _layout: function() {
            var rows = [];

            rows.push(this._slotHeaders(this._slots[0], this.weekHeaderTemplate));
            rows.push(this._slotHeaders(this._slots[1], this.dayHeaderTemplate));

            return rows;
        }
    });

    kendo.ui.GanttMonthView = GanttView.extend({
        name: "month",

        range: function(range) {
            this.start = kendo.date.firstDayOfMonth(range.start);
            this.end = kendo.date.addDays(kendo.date.getDate(kendo.date.lastDayOfMonth(range.end)), 1);
        },

        _createSlots: function() {
            var slots = [];

            slots.push(this._months(this.start, this.end));
            slots.push(this._weeks(this.start, this.end));

            return slots;
        },

        _layout: function() {
            var rows = [];

            rows.push(this._slotHeaders(this._slots[0], this.monthHeaderTemplate));
            rows.push(this._slotHeaders(this._slots[1], this.weekHeaderTemplate));

            return rows;
        }
    });

    kendo.ui.GanttTimeline = Widget.extend({
        init: function(element, options) {

            Widget.fn.init.call(this, element, options);

            if (!this.options.views || !this.options.views.length) {
                this.options.views = ["day", "week", "month"];
            }

            this._wrapper();

            this._domTrees();

            this._views();

            this._selectable();

            this._draggable();

            this._resizable();

            this._attachEvents();
        },
        
        options: {
            name: "GanttTimeline",
            messages: {
                views: {
                    day: "Day",
                    week: "Week",
                    month: "Month"
                }
            },
            snap: true,
            selectable: true
        },

        destroy: function() {
            Widget.fn.destroy.call(this);

            this._unbindView(this._selectedView);

            if (this._moveDraggable) {
                this._moveDraggable.destroy();
            }

            if (this._resizeDraggable) {
                this._resizeDraggable.destroy();
            }

            this._headerTree = null;
            this._taskTree = null;
            this._dependencyTree = null;

            this.wrapper.off(NS);

            kendo.destroy(this.wrapper);
        },

        _wrapper: function() {
            this.wrapper = this.element
                .append("<div class='k-grid-header'><div class='k-grid-header-wrap'></div></div>")
                .append("<div class='k-grid-content'><div class='k-gantt-tables'></div><div class='k-gantt-dependencies'></div></div>");

            this.element.append(this.wrapper);
        },

        _domTrees: function() {
            var tree = kendo.dom.Tree;
            var wrapper = this.wrapper;

            this._headerTree = new tree(wrapper.find(".k-grid-header-wrap")[0]);

            this._taskTree = new tree(wrapper.find(".k-gantt-tables")[0]);

            this._dependencyTree = new tree(wrapper.find(".k-gantt-dependencies")[0]);
        },

        _views: function() {
            var views = this.options.views;
            var view;
            var isSettings;
            var name;
            var defaultView;
            var selected;

            this.views = {};

            for (var i = 0, l = views.length; i < l; i++) {
                view = views[i];

                isSettings = isPlainObject(view);

                name = isSettings ? view.type : view;

                defaultView = defaultViews[name];

                if (defaultView) {
                    view = extend({ title: this.options.messages.views[name] }, isSettings ? view : {}, defaultView);

                    this.views[name] = view;

                    if (!selected || view.selected) {
                        selected = name;
                    }
                }
            }

            if (selected) {
                this._selectedViewName = selected;
            }
        },

        view: function(name) {
            if (name) {
                this._selectView(name);

                this.trigger("navigate", { view: name, action: "changeView" });
            }

            return this._selectedView;
        },

        _selectView: function(name) {
            if (name && this.views[name]) {
                if (this._selectedView) {
                    this._unbindView(this._selectedView);
                }

                this._selectedView = this._initializeView(name);
                this._selectedViewName = name;
            }
        },

        _initializeView: function(name) {
            var view = this.views[name];

            if (view) {
                var type = view.type;

                if (typeof type === "string") {
                    type = kendo.getter(view.type)(window);
                }

                if (type) {
                    view = new type(this.wrapper, trimOptions(extend(true, {
                        headerTree: this._headerTree,
                        taskTree: this._taskTree,
                        dependencyTree: this._dependencyTree
                    }, view, this.options)));
                } else {
                    throw new Error("There is no such view");
                }
            }

            return view;
        },

        _unbindView: function(view) {
            if (view) {
                view.destroy();
            }
        },

        _range: function(tasks) {
            var startOrder = {
                field: "start",
                dir: "asc"
            };
            var endOrder = {
                field: "end",
                dir: "desc"
            };

            if (!tasks || !tasks.length) {
                return { start: new Date(), end: new Date() };
            }

            var start = new Query(tasks).sort(startOrder).toArray()[0].start || new Date();
            var end = new Query(tasks).sort(endOrder).toArray()[0].end || new Date();

            return {
                start: start,
                end: end
            };
        },

        _render: function(tasks) {
            var view = this.view();
            var range = this._range(tasks);

            this._tasks = tasks;

            view.range(range);

            view.renderLayout();

            view.render(tasks);
        },

        _renderDependencies: function(dependencies) {
            this.view()._renderDependencies(dependencies);
        },

        _taskByUid: function(uid) {
            var tasks = this._tasks;
            var length = tasks.length;
            var task;

            for (var i = 0; i < length; i++) {
                task = tasks[i];

                if (task.uid === uid) {
                    return task;
                }
            }
        },

        _draggable: function() {
            var that = this;
            var element;
            var task;
            var currentStart;
            var startOffset;
            var snap = this.options.snap;

            var cleanUp = function() {
                that.view()._removeDragHint();

                if (element) {
                    element.css("opacity", 1);
                }

                element = null;
                task = null;
            };

            this._moveDraggable = new kendo.ui.Draggable(this.wrapper, {
                distance: 0,
                filter: ".k-task",
                holdToDrag: false
            });

            this._moveDraggable
                .bind("dragstart", function(e) {
                    var view = that.view();
                    element = e.currentTarget.parent();
                    task = that._taskByUid(e.currentTarget.attr("data-uid"));

                    if (that.trigger("moveStart", { task: task })) {
                        e.preventDefault();
                        return;
                    }

                    currentStart = task.start;
                    startOffset = view._timeByPosition(e.x.location, snap) - currentStart;

                    view._createDragHint(element);

                    element.css("opacity", 0.5);
                })
                .bind("drag", function(e) {
                    var view = that.view();
                    var date = new Date(view._timeByPosition(e.x.location, snap) - startOffset);
                    
                    if (!that.trigger("move", { task: task, start: date })) {
                        currentStart = date;

                        view._updateDragHint(currentStart);
                    }
                })
                .bind("dragend", function(e) {
                    that.trigger("moveEnd", { task: task, start: currentStart });

                    cleanUp();
                })
                .bind("dragcancel", function(e) {
                    cleanUp();
                });
        },

        _resizable: function() {
            var that = this;
            var element;
            var task;
            var currentStart;
            var currentEnd;
            var resizeStart;
            var snap = this.options.snap;

            var cleanUp = function() {
                that.view()._removeResizeHint();
                element = null;
                task = null;
            };

            this._resizeDraggable = new kendo.ui.Draggable(this.wrapper, {
                distance: 0,
                filter: ".k-resize-handle",
                holdToDrag: false
            });

            this._resizeDraggable
                .bind("dragstart", function(e) {
                    resizeStart = e.currentTarget.hasClass("k-resize-w");

                    element = e.currentTarget.closest(".k-task");

                    task = that._taskByUid(element.attr("data-uid"));

                    if (that.trigger("resizeStart", { task: task })) {
                        e.preventDefault();
                        return;
                    }

                    currentStart = task.start;
                    currentEnd = task.end;

                    that.view()._createResizeHint(task);
                })
                .bind("drag", function(e) {
                    var view = that.view();
                    var date = view._timeByPosition(e.x.location, snap, !resizeStart);

                    if (resizeStart) {
                        if (date <= currentEnd) {
                            currentStart = date;
                        }
                    } else {
                        if (date >= currentStart) {
                            currentEnd = date;
                        }
                    }

                    if (!that.trigger("resize", { task: task, date: resizeStart ? currentStart : currentEnd })) {
                        view._updateResizeHint(currentStart, currentEnd, resizeStart);
                    }
                })
                .bind("dragend", function(e) {
                    var date = resizeStart ? currentStart : currentEnd;

                    that.trigger("resizeEnd", { task: task, resizeStart: resizeStart, date: date });

                    cleanUp();
                })
                .bind("dragcancel", function(e) {
                    cleanUp();
                });
        },

        _selectable: function() {
            var that = this;

            if (this.options.selectable) {
                this.wrapper
                    .on(CLICK + NS, ".k-task", function(e) {
                        e.stopPropagation();
                        that.trigger("select", { uid: $(this).attr("data-uid") });
                    })
                    .on(CLICK + NS, ".k-gantt-tables", function(e) {
                        that.trigger("clear");
                    })
                    .on(CLICK + NS, ".k-line", function(e) {
                        e.stopPropagation();

                        that.selectDependency(this);
                    });
            }
        },

        select: function(value) {
            var element = this.wrapper.find(value);

            if (element.length) {
                this.clearSelection();

                element.addClass("k-state-selected");

                return;
            }

            return this.wrapper.find(".k-task.k-state-selected");
        },

        selectDependency: function(value) {
            var element = this.wrapper.find(value);
            var uid;

            if (element.length) {
                this.trigger("clear");

                uid = $(element).attr("data-uid");

                this.wrapper.find(".k-line[data-uid='" + uid + "']").addClass("k-state-selected");

                return;
            }

            return this.wrapper.find(".k-line.k-state-selected");
        },

        clearSelection: function() {
            this.wrapper
                .find(".k-state-selected")
                .removeClass("k-state-selected");
        },

        _attachEvents: function() {
            var that = this;

            this.wrapper
                .on(CLICK + NS, ".k-task-delete", function(e) {
                    that.trigger("remove", { uid: $(this).closest(".k-task").attr("data-uid") });
                });
        }
    });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f) { f(); });
