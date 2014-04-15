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
    var kendoDomElement = kendo.dom.element;
    var kendoDomText = kendo.dom.text;
    var kendoDomRender = kendo.dom.render;

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

            this.content = this.element.find(".k-gantt-timeline-content")

            this.header = this.element.find(".k-gantt-timeline-header-wrap");

            this._workDays = getWorkDays(this.options);

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
            var header = kendoDomElement("thead", null, headers);
            var table = kendoDomElement("table", null, [colgroup, header]);

            kendoDomRender(this.header[0], [table]);

            this.headerRow = this.header.find("table:first tr").last();
        },

        render: function(tasks) {
            var rows = this._tasks(tasks);
            var table;

            table = kendoDomElement("table", null, rows);
            kendoDomRender(this.content[0], [table]);
        },
        
        _tasks: function(tasks) {
            var rows = [];
            var wrap;
            var cell;
            var row;

            for (var i = 0, l = tasks.length; i < l; i++) {
                wrap = kendoDomElement("div", { className: "taskWrap" }, [this._renderTask(tasks[i])]);
                cell = kendoDomElement("td", null, [wrap]);
                row = kendoDomElement("tr", null, [cell]);

                rows.push(row);
            }

            return rows;
        },

        _renderTask: function(task) {
            var position = this._taskPosition(task);
            var task;
            var title;

            title = kendoDomText(task.title);
            task = kendoDomElement("div", { className: "k-gantt-task", style: { left: position.left + "px", width: position.width + "px" } }, [title]);

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

        _colgroup: function() {
            var count = this._slots[this._slots.length - 1].length;
            var cols = [];

            for (var i = 0; i < count; i++) {
                cols.push(kendoDomElement("col"));
            }

            return kendoDomElement("colgroup", null, cols);
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

                    headerText = kendoDomText(column.text);
                    headers.push(kendoDomElement("th", { colspan: column.span, className: "k-header" + (column.isNonWorking ? " nonWorking" : "") }, [headerText]));
                }

                rows.push(kendoDomElement("tr", null, headers));
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
                .append("<div class='k-gantt-timeline-content'>");

            this.element.append(this.wrapper);
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
                    view = new type(this.wrapper, trimOptions(extend(true, {}, view, this.options)));
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
        }
    });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f) { f(); });
