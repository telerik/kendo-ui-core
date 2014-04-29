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
    var minDependencyWidth = 14;
    var rowHeight = 27;
    var minDependencyHeight = Math.floor(rowHeight / 2);
    var NS = ".kendoGanttTimeline";
    var CLICK = "click";

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

    var View = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this.title = this.options.title || this.options.name;

            this.header = this.element.find(".k-gantt-timeline-header-wrap");

            this.content = this.element.find(".k-gantt-timeline-content");

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

            this.timeHeaderTemplate = kendo.template(options.timeHeaderTemplate, kendo.Template);
            this.dayHeaderTemplate = kendo.template(options.dayHeaderTemplate, kendo.Template);
            this.weekHeaderTemplate = kendo.template(options.weekHeaderTemplate, kendo.Template);
            this.monthHeaderTemplate = kendo.template(options.monthHeaderTemplate, kendo.Template);
        },

        renderLayout: function() {
            this._slots = this._createSlots();

            this._tableWidth = this._calculateTableWidth();

            this.createLayout(this._layout());

            this._slotDimensions();
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
            var height = rowCount * rowHeight;
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

            return this._createTable(totalSpan, [row], { className: "k-gantt-columns", style: { height: height + "px" } });
        },

        _tasksTable: function(tasks) {
            var rows = [];
            var wrap;
            var cell;
            var row;
            var position;
            var task;
            var coordinates = this._taskCoordinates = {};

            for (var i = 0, l = tasks.length; i < l; i++) {
                task = tasks[i];

                position = this._taskPosition(task);

                wrap = kendoDomElement("div", { className: "taskWrap" }, [this._renderTask(tasks[i], position)]);
                cell = kendoDomElement("td", null, [wrap]);
                row = kendoDomElement("tr", null, [cell]);

                rows.push(row);
                
                coordinates[task.id] = {
                    start: position.left,
                    end: position.left + position.width,
                    top: i * rowHeight + Math.floor(rowHeight/2)
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
            var title;
            var inner;
            var middle;
            var taskElement;

            if (task.summary) {
                inner = kendoDomElement("div", { className: "k-gantt-summary-complete", style: { width: position.width + "px" } });
                middle = kendoDomElement("div", { className: "k-gantt-summary-progress", style: { width: task.percentComplete + "%" } }, [inner]);
                taskElement = kendoDomElement("div", { "data-uid": task.uid, className: "k-gantt-summary", style: { left: position.left + "px", width: position.width + "px" } }, [middle]);
            } else {
                title = kendoTextElement(task.title);
                var template = kendoDomElement("div", null, [kendoDomElement("div", { className: "k-event-template" }, [title])]);
                var actions = kendoDomElement("span", { className: "k-event-actions" }, [
                    kendoDomElement("a", { href: "#", className: "k-link k-event-delete" }, [
                        kendoDomElement("span", { className: "k-icon k-si-close" }, [
                        ])
                    ])
                ]);
                var resizeW = kendoDomElement("span", { className: "k-resize-handle k-resize-w" });
                var resizeE = kendoDomElement("span", { className: "k-resize-handle k-resize-e" });
                taskElement = kendoDomElement("div", { "data-uid": task.uid, className: "k-event", style: { left: position.left + "px", width: position.width + "px" } }, [template, actions, resizeW, resizeE]);
            }

            return taskElement;
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

        _timeByPosition: function(x) {
            var slot = this._slotByPosition(x);
            var duration = slot.end - slot.start;
            var slotOffset = duration * ((x - slot.offsetLeft) / slot.offsetWidth);

            return new Date(slot.start.getTime() + slotOffset);
        },

        _slotByPosition: function(x) {
            var slotIndex = this._slotIndex("offsetLeft", x);

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

            if (!predecessor || !successor) {
                return [];
            }

            switch (dependency.type) {
                case 0:
                    elements = this._renderFF(predecessor, successor);
                    break;
                case 1:
                    elements = this._renderFS(predecessor, successor);
                    break;
                case 2:
                    elements = this._renderSF(predecessor, successor);
                    break;
                case 3:
                    elements = this._renderSS(predecessor, successor);
                    break;
            }

            for (var i = 0, length = elements.length; i < length; i++) {
                elements[i].attr["data-uid"] = dependency.uid;
            }

            return elements;
        },

        _renderFF: function(from, to) {
            var lines = this._dependencyFF(from, to, false);

            lines[lines.length - 1].attr.className += " k-arrow-w";

            return lines;
        },

        _renderSS: function(from, to) {
            var lines = this._dependencyFF(to, from, true);

            lines[0].attr.className += " k-arrow-e";

            return lines;
        },

        _renderFS: function(from, to) {
            var lines = this._dependencyFS(from, to, false);

            lines[lines.length - 1].attr.className += " k-arrow-e";

            return lines;
        },

        _renderSF: function(from, to) {
            var lines = this._dependencyFS(to, from, true);

            lines[0].attr.className += " k-arrow-w";

            return lines;
        },

        _dependencyFF: function(from, to, reverse) {
            var lines = [];
            var left = 0;
            var top = 0;
            var width = 0;
            var height = 0;
            var that = this;
            var dir = reverse ? "start" : "end";
            var delta;

            var addHorizontal = function() {
                lines.push(that._line({ left: left + "px", top: top + "px", width: width + "px" }));
            };
            var addVertical = function() {
                lines.push(that._line({ left: left + "px", top: top + "px", height: height + "px" }));
            };

            left = from[dir];
            top = from.top;
            width = minDependencyWidth;

            delta = to[dir] - from[dir];

            if ((delta) > 0 != reverse) {
                width = Math.abs(delta) + minDependencyWidth;
            }

            if (reverse) {
                left = left - width;
                addHorizontal();
            } else {
                addHorizontal();
                left = left + width;
            }

            if (to.top < top) {
                height = top - to.top;
                top = to.top;
                addVertical();
            } else {
                height = to.top - top;
                addVertical();
                top = top + height;
            }

            width = Math.abs(left - to[dir]);

            if (!reverse) {
                left = left - width;
            }

            addHorizontal();

            return lines;
        },

        _dependencyFS: function(from, to, reverse) {
            var lines = [];
            var left = 0;
            var top = 0;
            var width = 0;
            var height = 0;
            var that = this;
            var minDistance = 2 * minDependencyWidth;
            var delta = to.start - from.end;

            var addHorizontal = function() {
                lines.push(that._line({ left: left + "px", top: top + "px", width: width + "px" }));
            };
            var addVertical = function() {
                lines.push(that._line({ left: left + "px", top: top + "px", height: height + "px" }));
            };

            left = from.end;
            top = from.top;
            width = minDependencyWidth;

            if (reverse && delta > minDistance) {
                width = delta - minDependencyWidth;
            }

            addHorizontal();
            left = left + width;

            if ((delta) <= minDistance) {
                height = reverse ? Math.abs(to.top - from.top) - minDependencyHeight : minDependencyHeight;

                if (to.top < from.top) {
                    top = top - height;
                    addVertical();
                } else {
                    addVertical();
                    top = top + height;
                }

                width = from.end - to.start + minDistance;

                if (width < minDependencyWidth) {
                    width = minDependencyWidth;
                }

                left -= width;

                addHorizontal();
            }


            if (to.top < from.top) {
                height = top - to.top;
                top = to.top;
                addVertical();
            } else {
                height = to.top - top;
                addVertical();
                top = top + height;
            }

            width = to.start - left;

            addHorizontal();

            return lines;
        },

        _line: function(styles) {
            return kendoDomElement("div", { className: "k-gantt-line", style: styles });
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

        _days: function(start, end, span) {
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
                        span: span
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

    kendo.ui.GanttDayView = View.extend({
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
            var hourSlots;
            var hours;
            var slots = [];

            if (options.showWorkHours) {
                span = (options.workDayEnd.getHours() - options.workDayStart.getHours());
            }

            span = Math.ceil(span / this.options.hourSpan);

            daySlots = this._days(this.start, this.end, span);
            hourSlots = [];

            for (var i = 0, l = daySlots.length; i < l; i++) {
                hours = this._hours(daySlots[i].start, daySlots[i].end);

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

    kendo.ui.GanttWeekView = View.extend({
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
            slots.push(this._days(this.start, this.end, 1));

            return slots;
        },

        _layout: function() {
            var rows = [];

            rows.push(this._slotHeaders(this._slots[0], this.weekHeaderTemplate));
            rows.push(this._slotHeaders(this._slots[1], this.dayHeaderTemplate));

            return rows;
        }
    });

    kendo.ui.GanttMonthView = View.extend({
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
                .append("<div class='k-gantt-timeline-header k-grid-header'><div class='k-gantt-timeline-header-wrap k-grid-header-wrap'></div></div>")
                .append("<div class='k-gantt-timeline-content k-grid-content'><div class='k-gantt-timeline-tasks'></div><div class='k-gantt-timeline-dependencies'></div></div>");

            this.element.append(this.wrapper);
        },

        _domTrees: function() {
            var tree = kendo.dom.Tree;
            var wrapper = this.wrapper;

            this._headerTree = new tree(wrapper.find(".k-gantt-timeline-header-wrap")[0]);

            this._taskTree = new tree(wrapper.find(".k-gantt-timeline-tasks")[0]);

            this._dependencyTree = new tree(wrapper.find(".k-gantt-timeline-dependencies")[0]);
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

        _render: function(tasks, range) {
            var view = this.view();

            view.range(range);

            view.renderLayout();

            view.render(tasks);
        },

        _renderDependencies: function(dependencies) {
            this.view()._renderDependencies(dependencies);
        },

        _draggable: function() {
            var that = this;
            var element;
            var dragClue;
            var originalStart;
            var currentStart;

            var cleanUp = function() {
                if (dragClue) {
                    dragClue.remove();
                }

                dragClue = null;
            };

            this._moveDraggable = new kendo.ui.Draggable(this.wrapper, {
                distance: 0,
                filter: ".k-gantt-summary, .k-event",
                holdToDrag: false
            });

            this._moveDraggable
                .bind("dragstart", function(e) {
                    element = e.currentTarget;

                    dragClue = element
                        .clone()
                        .css("cursor", "move");

                    element
                        .css("opacity", 0.5)
                        .parent()
                        .append(dragClue);

                    originalStart = parseInt(element.css("left"), 10);
                })
                .bind("drag", function(e) {
                    currentStart = originalStart + e.x.initialDelta;

                    if (that.options.snap) {
                        currentStart = that.view()._slotByPosition(currentStart).offsetLeft;
                    }

                    dragClue.css("left", currentStart);
                })
                .bind("dragend", function(e) {
                    var start = that.view()._timeByPosition(currentStart);

                    that.trigger("move", { uid: element.attr("data-uid"), start: start });

                    cleanUp();
                })
                .bind("dragcancel", function(e) {
                    cleanUp();
                });
        },

        _resizable: function() {
            var that = this;
            var element;
            var resizeClue;
            var originalStart;
            var originalWidth;
            var currentStart;
            var currentWidth;
            var delta;
            var resizeStart;
            var snap = this.options.snap;

            var cleanUp = function() {
                if (resizeClue) {
                    resizeClue.remove();
                }

                resizeClue = null;
                element = null;
            };

            this._resizeDraggable = new kendo.ui.Draggable(this.wrapper, {
                distance: 0,
                filter: ".k-resize-handle",
                holdToDrag: false
            });

            this._resizeDraggable
                .bind("dragstart", function(e) {
                    resizeStart = e.currentTarget.hasClass("k-resize-w");

                    element = e.currentTarget.closest(".k-event");

                    originalStart = parseInt(element.css("left"), 10);
                    originalWidth = parseInt(element.css("width"), 10);

                    resizeClue = $("<div class='resizeClue'>");

                    element.closest(".k-gantt-timeline-content").append(resizeClue);
                })
                .bind("drag", function(e) {
                    var targetSlot;

                    delta = e.x.initialDelta;

                    if (resizeStart) {
                        currentStart = originalStart + delta;

                        if (snap) {
                            currentStart = that.view()._slotByPosition(currentStart).offsetLeft;
                        }

                        currentWidth = originalWidth + originalStart - currentStart;
                    } else {
                        currentStart = originalStart;
                        currentWidth = originalWidth + delta;

                        if (snap) {
                            targetSlot = that.view()._slotByPosition(currentStart + currentWidth);

                            currentWidth = targetSlot.offsetLeft + targetSlot.offsetWidth - currentStart;
                        }
                    }

                    resizeClue
                        .css({
                            "left": currentStart,
                            "width": currentWidth
                        });
                })
                .bind("dragend", function(e) {
                    var date = that.view()._timeByPosition(currentStart + (resizeStart ? 0 : currentWidth));

                    that.trigger("resize", { uid: element.attr("data-uid"), resizeStart: resizeStart, date: date });

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
                    .on(CLICK + NS, ".k-gantt-summary, .k-event ", function(e) {
                        e.stopPropagation();
                        that.trigger("select", { uid: $(this).attr("data-uid") });
                    })
                    .on(CLICK + NS, ".k-gantt-tasks tr", function(e) {
                        that.trigger("clear");
                    })
                    .on(CLICK + NS, ".k-gantt-line", function(e) {
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

            return this.wrapper.find(".k-state-selected");
        },

        selectDependency: function(value) {
            var element = this.wrapper.find(value);
            var uid;

            if (element.length) {
                this.trigger("clear");

                uid = $(element).attr("data-uid");

                this.wrapper.find(".k-gantt-line[data-uid='" + uid + "']").addClass("k-state-selected");

                return;
            }

            return this.wrapper.find(".k-gantt-line.k-state-selected");
        },

        clearSelection: function() {
            this.wrapper
                .find(".k-state-selected")
                .removeClass("k-state-selected");
        }

    });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f) { f(); });
