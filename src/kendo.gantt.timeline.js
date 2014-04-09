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

    DATA_TIME_HEADER_TEMPLATE = kendo.template("#=kendo.toString(date, 't')#");
    DATA_DAY_HEADER_TEMPLATE = kendo.template("#=kendo.toString(date, 'ddd')#");
    DATA_WEEK_HEADER_TEMPLATE = kendo.template("#=kendo.toString(start, 'ddd M/dd')# - #=kendo.toString(end, 'ddd M/dd')#");
    DATA_MONTH_HEADER_TEMPLATE = kendo.template("#=kendo.toString(start, 'MM')#");

    var defaultViews = {
        day: {
            type: "DayView"
        },
        week: {
            type: "WeekView"
        },
        month: {
            type: "MonthView"
        }
    };

    function getViewType(typeName) {
        switch (typeName) {
            case "DayView":
                return DayView;
            case "WeekView":
                return WeekView;
            case "MonthView":
                return MonthView;

        }
    };

    function levels(columns) {
        var result = [];

        function collect(depth, columns) {
            if (columns) {
                var level = result[depth] = result[depth] || [];

                for (var i = 0; i < columns.length; i++) {
                    level.push(columns[i]);
                    collect(depth + 1, columns[i].columns);
                }
            }
        }

        collect(0, columns);

        return result;
    }

    var View = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this._templates();
        },

        destroy: function() {
            Widget.fn.destroy.call(this);

            if (this.headerTable) {
                kendo.destroy(this.headerTable);
                this.headerTable.remove();
            }

            if (this.contentTable) {
                kendo.destroy(this.contentTable);
                this.contentTable.remove();
            }

            this.headerTable = null;
            this.contentTable = null;
        },

        options: {
            timeHeaderTemplate: DATA_TIME_HEADER_TEMPLATE,
            dayHeaderTemplate: DATA_DAY_HEADER_TEMPLATE,
            weekHeaderTemplate: DATA_WEEK_HEADER_TEMPLATE,
            monthHeaderTemplate: DATA_MONTH_HEADER_TEMPLATE,
        },

        _templates: function() {
            this.timeHeaderTemplate = kendo.template(this.options.timeHeaderTemplate, kendo.Template);
            this.dayHeaderTemplate = kendo.template(this.options.dayHeaderTemplate, kendo.Template);
            this.weekHeaderTemplate = kendo.template(this.options.weekHeaderTemplate, kendo.Template);
            this.monthHeaderTemplate = kendo.template(this.options.monthHeaderTemplate, kendo.Template);
        },

        renderLayout: function(range) {
            this.header = this.element.find(".k-gantt-timeline-header-wrap");

            this._range(range);

            this.createLayout(this._columns());
        },

        render: function(tasks) {
            this.content = this.element.find(".k-gantt-timeline-content");

            this.contentTable = $("<table>");
            this.content.append(this.contentTable);
        },

        createLayout: function(columns) {
            var headers = this._headers(columns);

            this.headerTable = $("<table>");

            this.headerTable.append(headers);

            this.header.append(this.headerTable);
        },

        _headers: function(columnLevels) {
            var rows = [];
            var level;
            var headers;
            var column;

            for (var levelIndex = 0, levelCount = columnLevels.length; levelIndex < levelCount; levelIndex++) {
                level = columnLevels[levelIndex];
                headers = [];

                for (var columnIndex = 0, columnCount = level.length; columnIndex < columnCount; columnIndex++) {
                    column = level[columnIndex];

                    headers.push("<th colspan='" + column.span + "'>" + column.text + "</th>");
                }

                rows.push(headers.join(""));
            }

            return "<tr>" + rows.join("</tr><tr>") + "</tr>";
        },

        _hours: function(start, end) {
            var columns = [];
            var column;
            var endTime = end.getTime();

            while (start.getTime() < endTime) {
                column = {
                    text: this.timeHeaderTemplate({ date: start }),
                    span: 1
                };

                columns.push(column);

                start.setHours(start.getHours() + 1);
            }

            return columns;
        },

        _days: function(start, end, span) {
            var columns = [];
            var column;
            var endTime = end.getTime();

            while (start.getTime() < endTime) {
                column = {
                    text: this.timeHeaderTemplate({ date: start }),
                    span: span
                };

                columns.push(column);

                start = kendo.date.addDays(start, 1);
            }

            return columns;
        },

        _weeks: function(start, end, span) {
            var columns = [];
            var column;
            var endTime = end.getTime();

            while (start.getTime() < endTime) {
                column = {
                    text: this.timeHeaderTemplate({ date: start }),
                    span: span
                };

                columns.push(column);

                start = kendo.date.addDays(start, 1);
            }

            return columns;
        },

        calendarInfo: function() {
            return kendo.getCulture().calendars.standard;
        }
    });

    var DayView = View.extend({
        _range: function(range) {
            this.start = kendo.date.getDate(range.start);
            this.end = kendo.date.addDays(kendo.date.getDate(range.end), 1);
        },

        _columns: function() {
            var start = this.start;
            var end = this.end;
            var columns = [];

            columns.push(this._days(start, end, 24));
            columns.push(this._hours(start, end));

            return columns;
        }
    });

    var WeekView = View.extend({
        _range: function(range) {
            var calendarInfo = this.calendarInfo();
            var firstDay = calendarInfo.firstDay;

            this.start = kendo.date.getDate(kendo.date.dayOfWeek(range.start, firstDay, -1));
            this.end = kendo.date.getDate(kendo.date.dayOfWeek(range.end, firstDay, 1));
        },

        _columns: function() {
            var start = this.start;
            var end = this.end;
            var columns = [];
            var column;
            var innerColumn;

            while (start.getTime() < end.getTime()) {
                column = {
                    text: this.weekHeaderTemplate({ start: start, end: kendo.date.addDays(start, 6) }),
                    span: 7,
                    columns: []
                };

                for (var i = 0; i < 7; i++) {
                    innerColumn = {
                        text: this.dayHeaderTemplate({ date: kendo.date.addDays(start, i) }),
                        span: 1
                    }

                    column.columns.push(innerColumn);
                }

                columns.push(column);

                start = kendo.date.addDays(start, 7);
            }

            return columns;
        }
    });

    var MonthView = View.extend({
        _range: function(range) {
            this.start = kendo.date.firstDayOfMonth(range.start);
            this.end = kendo.date.lastDayOfMonth(range.end);
        }
    });

    // For Testing
    window.kendo.WeekView = WeekView;


    kendo.ui.GanttTimeline = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            if (!this.options.views || !this.options.views.length) {
                this.options.views = ["day", "week", "month"];
            }

            this._wrapper();

            this._views();
        },

        destroy: function() {
            Widget.fn.destroy.call(this);

            kendo.destroy(that.wrapper);
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
                    type = getViewType(view.type);
                }

                if (type) {
                    view = new type(this.wrapper);
                } else {
                    throw new Error("There is no such view");
                }
            }

            return view;
        },

        _unbindView: function(view) {
            view.destroy();
        },

        render: function(tasks, range) {
            var view = this.view(this._selectedViewName);

            view.renderLayout(range);

            view.render(tasks);
        }
    });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f) { f(); });
