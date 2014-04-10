(function(f, define) {
    define(["./kendo.core"], f);
})(function() {

var __meta__ = {
    id: "gantt.list",
    name: "Gantt List",
    category: "web",
    description: "The Gantt List",
    depends: [ "core", 'dom' ],
    hidden: true
};

(function($) {
    var paddingStep = 13;
    var kendo = window.kendo;
    var kendoDom = kendo.dom;
    var ui = kendo.ui;
    var Widget = ui.Widget
    var extend = $.extend;
    var map = $.map;
    var titleFromField = function(field) {
        var title;

        switch(field) {
            case "title":
                title = "Title";
                break;
            case "start":
                title = "Start Time";
                break;
            case "end":
                title = "End Time";
                break;
            case "percentComplete":
                title = "% Done";
                break;
            case "parentId":
                title = "Predecessor ID";
                break;
            case "id":
                title = "ID";
                break;
            case "orderId":
                title = "Order ID"
                break;
        }

        return title;
    };
    var COLGROUP = kendo.template(
        '<colgroup>' +
            '#for (var i = 0, l = columns.length; i < l; i++) {#' +
                '#if (columns[i].width) {#' +
                     '<col style="width:${columns[i].width}px;">' +
                '#} else {#' +
                    '<col>' +
                '#}#' +
            '#}#' +
        '</colgroup>');
    var THEAD = kendo.template(
        '<thead role="rowgroup">' +
            '<tr role="row">' +
             '#for (var i = 0, l = columns.length; i < l; i++) {#' +
                '<th role="columnheader" data-field="${columns[i].field}" data-title="${columns[i].title}" class="k-header k-with-icon' +
                    '#if (columns[i].sortable) {#' +
                        ' k-filterable" data-role="sorter" data-dir="desc">' +
                        '<a class="k-link" href="\\#">${columns[i].title}<span class="k-icon k-i-arrow-s"></span></a>' +
                    '#} else {#' +
                        '">' +
                        '<a class="k-link" href="\\#">${columns[i].title}</a>' +
                    '#}#' +
                '</th>' +
            '#}#' +
            '</tr>' +
        '</thead></table>');

    ui.GanttList = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            if (this.options.columns.length === 0) {
                this.options.columns.push("title");
            }

            this.levels = [{ field: null, value: 0 }];

            this._columns();
            this._layout();
        },

        _columns: function() {
            var columns = this.options.columns;
            var column;
            var model = function() {
                this.field = "";
                this.title = "";
                this.editable = false;
                this.sortable = false;
            };

            this.columns = map(columns, function(column) {
                column = typeof column === "string" ? {
                    field: column, title: titleFromField(column)
                } : column;

                return extend(new model(), column);
            });
        },

        _layout: function() {
            this.element
                .append("<div class='k-grid-header'><div class='k-grid-header-wrap' style='padding-right: 15px;'></div></div>")
                .append("<div class='k-grid-content'>");

            this._header();
        },

        _header: function () {
            var virtualDom = this.options.virtualDom;
            var that = this;
            var colgroup = COLGROUP({ columns: that.columns });
            var thead = THEAD({ columns: that.columns });
            var header = $('<table role="grid">');

            header
                .append(colgroup)
                .append(thead);

            this.element.find(".k-grid-header-wrap").append(header);
        },

        _refresh: function (tasks) {
            var start = now();
            var content = this.element.find(".k-grid-content");
            var colgroup = kendoDom.element("colgroup", null, this._cols());
            var tbody = kendoDom.element("tbody", null, this._rows(tasks));
            var table = kendoDom.element("table", { role: "grid" }, [colgroup, tbody]);

            kendoDom.render(content[0], [table]);

            var end = now();

            total += end - start;
        },

        _cols: function () {
            var columns = this.columns;
            var column;
            var style;
            var cols = [];

            for (var i = 0, length = columns.length; i < length; i++) {
                column = columns[i];

                if (column.width) {
                    style = { style: { width: column.width + "px" } };
                } else {
                    style = null
                }

                cols.push(kendoDom.element("col", style, []));
            }

            return cols;
        },

        _rows: function(tasks) {
            var task;
            var rows = [];

            for (var i = 0, length = tasks.length; i < length; i++) {
                task = tasks[i];
                rows.push(this._trs({
                    task: task,
                    style: i % 2 !== 0 ? { className: "k-alt" } : null
                }));
            }

            return rows;
        },

        _trs: function(options) {
            var children = [];
            var columns = this.columns;
            var column;

            for (var i = 0, l = columns.length; i < l; i++) {
                column = columns[i];
                children.push(this._tds({ task: options.task, column: column }));
            }

            return kendoDom.element("tr", options.style, children);
        },

        _tds: function (options) {
            var children;
            var task = options.task;
            var column = options.column;
            var value = task.get(column.field);
            var isSummary = task.get("summary");
            var style = null;

            if (column.field == "title") {
                style = this._level({ idx: task.get("parentId"), id: task.get("id"), summary: isSummary });
                children = [kendoDom.element("span", { className: isSummary ? "k-icon k-i-collapse" : "k-icon k-i-hidden" }), kendoDom.text(value)];
            } else {
                children = [kendoDom.text(value)];
            }

            return kendoDom.element("td", style, children);
        },

        _level: function (options) {
            var levels = this.levels;
            var level;
            var summary = options.summary;
            var idx = options.idx;
            var id = options.id;

            for (var i = 0, length = levels.length; i < length; i++) {
                level = levels[i];

                if (level.field == idx) {

                    if (summary) {
                        levels.push({ field: id, value: level.value + paddingStep });
                    }

                    return idx !== null ? { style: { "padding-left": level.value + "px" } } : null;
                }
            }
        }
    });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f) { f(); });
