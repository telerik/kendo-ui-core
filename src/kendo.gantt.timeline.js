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
    var isPlainObject = $.isPlainObject;
    var extend = $.extend;
    var minDependencyWidth = 14;
    var minDependencyHeight = 12;

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
        },

        destroy: function() {
            Widget.fn.destroy.call(this);

            this.headerRow = null;
            this.header = null;
            this.content = null;
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
            hourSpan: 1
        },

        _templates: function() {
            var options = this.options;

            this.timeHeaderTemplate = kendo.template(options.timeHeaderTemplate, kendo.Template);
            this.dayHeaderTemplate = kendo.template(options.dayHeaderTemplate, kendo.Template);
            this.weekHeaderTemplate = kendo.template(options.weekHeaderTemplate, kendo.Template);
            this.monthHeaderTemplate = kendo.template(options.monthHeaderTemplate, kendo.Template);
        },

        renderLayout: function(range) {
            this._range(range);

            this._slots = this._createSlots();

            this.createLayout(this._layout());
        },

        createLayout: function(rows) {
            var headers = this._headers(rows);
            var colgroup = this._colgroup();
            var tree = this._headerTree;
            var header = tree.element("thead", null, headers);
            var table = tree.element("table", null, [colgroup, header]);

            tree.render([table]);

            this.headerRow = this.header.find("table:first tr").last();
        },

        render: function(tasks) {
            var rows = this._tasks(tasks);
            var table;
            var tree = this._taskTree;

            table = tree.element("table", null, rows);
            tree.render([table]);
        },
        
        _tasks: function(tasks) {
            var rows = [];
            var wrap;
            var cell;
            var row;
            var position;
            var task;
            var coordinates = this._taskCoordinates = {};
            var tree = this._taskTree;

            for (var i = 0, l = tasks.length; i < l; i++) {
                task = tasks[i];

                position = this._taskPosition(task);

                wrap = tree.element("div", { className: "taskWrap" }, [this._renderTask(tasks[i], position)]);
                cell = tree.element("td", null, [wrap]);
                row = tree.element("tr", null, [cell]);

                rows.push(row);
                
                coordinates[task.id] = {
                    start: position.left,
                    end: position.left + position.width,
                    top: i * 24 + 12
                };
            }

            return rows;
        },

        _renderTask: function(task, position) {
            var title;
            var inner;
            var middle;
            var task;
            var tree = this._taskTree;

            title = tree.text(task.title);
            inner = tree.element("div", { className: "k-gantt-summary-complete", style: { width: position.width + "px" } }, [title]);
            middle = tree.element("div", { className: "k-gantt-summary-progress" }, [inner]);
            task = tree.element("div", { "data-uid": task.uid, className: "k-gantt-summary", style: { left: position.left + "px", width: position.width + "px" } }, [middle]);

            return task;
        },

        _taskPosition: function(task) {
            var startLeft = this._offset(task.start);
            var endLeft = this._offset(task.end);

            return { left: startLeft, width: endLeft - startLeft };
        },

        _offset: function(date) {
            var headers = this.headerRow[0].children;
            var header;
            var slots = this._slots[this._slots.length - 1];
            var slot;
            var startOffset;
            var slotDuration;
            var slotOffset;
            var startIndex = this._slotIndex(date);

            slot = slots[startIndex];
            header = headers[startIndex];

            if (slot.end < date) {
                return header.offsetLeft + header.offsetWidth;
            }

            startOffset = date - slot.start;
            slotDuration = slot.end - slot.start;
            slotOffset = (startOffset / slotDuration) * header.offsetWidth;

            return header.offsetLeft + slotOffset;
        },

        _slotIndex: function(date) {
            var slots = this._slots[this._slots.length - 1];
            var startIdx = 0;
            var endIdx = slots.length - 1;
            var middle;

            do {
                middle = Math.ceil((endIdx + startIdx) / 2);

                if (slots[middle].start < date) {
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
                    elements = this._renderFS(predecessor, successor);
                    break;
                case 1:
                    elements = this._renderSS(predecessor, successor);
                    break;
                case 2:
                    elements = this._renderSF(predecessor, successor);
                    break;
                case 3:
                    elements = this._renderFF(predecessor, successor);
                    break;
            }

            return elements;
        },

        _renderFF: function(from, to) {
            return this._dependencyFF(from, to, false);
        },

        _renderSS: function(from, to) {
            return this._dependencyFF(to, from, true);
        },

        _renderFS: function(from, to) {
            return this._dependencyFS(from, to, false);
        },

        _renderSF: function(from, to) {
            return this._dependencyFS(to, from, true);
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
            var round = Math.round;

            var addHorizontal = function() {
                lines.push(that._line({ left: round(left) + "px", top: round(top) + "px", width: round(width) + "px" }));
            }
            var addVertical = function() {
                lines.push(that._line({ left: round(left) + "px", top: round(top) + "px", height: round(height) + "px" }));
            }

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
            var round = Math.round;

            var addHorizontal = function() {
                lines.push(that._line({ left: round(left) + "px", top: round(top) + "px", width: round(width) + "px" }));
            }
            var addVertical = function() {
                lines.push(that._line({ left: round(left) + "px", top: round(top) + "px", height: round(height) + "px" }));
            }

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
            return this._dependencyTree.element("div", { className: "k-gantt-line", style: styles });
        },

        _colgroup: function() {
            var count = this._slots[this._slots.length - 1].length;
            var cols = [];
            var tree = this._headerTree;

            for (var i = 0; i < count; i++) {
                cols.push(tree.element("col"));
            }

            return tree.element("colgroup", null, cols);
        },

        _headers: function(columnLevels) {
            var rows = [];
            var level;
            var headers;
            var column;
            var headerText;
            var tree = this._headerTree;

            for (var levelIndex = 0, levelCount = columnLevels.length; levelIndex < levelCount; levelIndex++) {
                level = columnLevels[levelIndex];
                headers = [];

                for (var columnIndex = 0, columnCount = level.length; columnIndex < columnCount; columnIndex++) {
                    column = level[columnIndex];

                    headerText = tree.text(column.text);
                    headers.push(tree.element("th", { colspan: column.span, className: "k-header" + (column.isNonWorking ? " nonWorking" : "") }, [headerText]));
                }

                rows.push(tree.element("tr", null, headers));
            }

            return rows;
        },

        _hours: function(start, end) {
            var start = new Date(start);
            var end = new Date(end);
            var slotEnd;
            var slots = [];
            var options = this.options;
            var workDayStart = options.workDayStart.getHours();
            var workDayEnd = options.workDayEnd.getHours();
            var isWorkHour;
            var hours;
            var hourSpan = options.hourSpan;

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
            var start = new Date(start);
            var end = new Date(end);
            var slotEnd;
            var slots = [];
            var isWorkDay;

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
            var start = new Date(start);
            var end = new Date(end);
            var slotEnd;
            var slots = [];
            var firstDay = this.calendarInfo().firstDay;
            var daySlots;
            var span;

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
            var start = new Date(start);
            var end = new Date(end);
            var slotEnd;
            var slots = [];
            var daySlots;
            var span;

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
        _range: function(range) {
            this.start = kendo.date.getDate(range.start);
            this.end = kendo.date.getDate(range.end);

            if (kendo.date.getMilliseconds(range.end) > 0) {
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
        _range: function(range) {
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
        _range: function(range) {
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
        },
        
        options: {
            name: "GanttTimeline"
        },

        destroy: function() {
            this._unbindView(this._selectedView);

            Widget.fn.destroy.call(this);

            kendo.destroy(this.wrapper);
        },

        _wrapper: function() {
            this.wrapper = this.element
                .append("<div class='k-gantt-timeline-header'><div class='k-gantt-timeline-header-wrap'></div></div>")
                .append("<div class='k-gantt-timeline-content'><div class='k-gantt-timeline-tasks'></div><div class='k-gantt-timeline-dependencies'></div></div>");

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
                    view = extend({ title: name }, isSettings ? view : {}, defaultView);

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
            var view = this.view(this._selectedViewName);

            view.renderLayout(range);

            view.render(tasks);
        },

        _renderDependencies: function(dependencies) {
            this.view()._renderDependencies(dependencies);
        }

    });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f) { f(); });
