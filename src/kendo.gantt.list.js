(function(f, define) {
    define(["./kendo.core"], f);
})(function() {

var __meta__ = {
    id: "gantt.list",
    name: "Gantt List",
    category: "web",
    description: "The Gantt List",
    depends: [ "core" ],
    hidden: true
};

(function($) {
    var paddingStep = 26;
    var kendo = window.kendo;
    var kendoDom = kendo.dom;
    var ui = kendo.ui;
    var Widget = ui.Widget;
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
                title = "Order ID";
                break;
        }

        return title;
    };

    ui.GanttList = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            if (this.options.columns.length === 0) {
                this.options.columns.push("title");
            }

            this._columns();
            this._layout();
        },

        destroy: function() {
            Widget.fn.destroy.call(this);

            this.header = null;
            this.content = null;
            this.levels = null;
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

        _layout: function () {
            var element = this.element;

            element
                .append("<div class='k-grid-header'><div class='k-grid-header-wrap' style='padding-right: 15px;'></div></div>")
                .append("<div class='k-grid-content'></div>");

            this.header = element.find(".k-grid-header-wrap");
            this.content = element.find(".k-grid-content");

            this._header();
        },

        _header: function() {
            var wrapper = this.header;
            var domTree = this.headerTree = new kendoDom.Tree(wrapper[0]);
            var colgroup;
            var thead;
            var table;

            colgroup = domTree.element("colgroup", null, this._cols(domTree));
            thead = domTree.element("thead", { role: "rowgroup" }, [domTree.element("tr", null, this._ths())]);
            table = domTree.element("table", { role: "grid" }, [colgroup, thead]);

            domTree.render([table]);
        },

        _render: function(tasks) {
            var wrapper = this.content;
            var domTree = this.contentTree = new kendoDom.Tree(wrapper[0]);
            var colgroup;
            var tbody;
            var table;

            this.levels = [{ field: null, value: 0 }];

            colgroup = domTree.element("colgroup", null, this._cols(domTree));
            tbody = domTree.element("tbody", { role: "rowgroup" }, this._trs(tasks));
            table = domTree.element("table", { role: "grid" }, [colgroup, tbody]);

            domTree.render([table]);
        },

        _ths: function() {
            var domTree = this.headerTree
            var columns = this.columns;
            var column;
            var style;
            var ths = [];

            for (var i = 0, length = columns.length; i < length; i++) {
                column = columns[i];
                style = { "data-field": column.field, "data-title": column.title, className: "k-header k-with-icon" };

                if (column.sortable) {
                    extend(style, { "data-role": "sorter" });
                }

                ths.push(domTree.element("th", style, [domTree.text(column.title)]));
            }

            return ths;
        },

        _cols: function(domTree) {
            var columns = this.columns;
            var column;
            var style;
            var cols = [];

            for (var i = 0, length = columns.length; i < length; i++) {
                column = columns[i];

                if (column.width) {
                    style = { style: { width: column.width + "px" } };
                } else {
                    style = null;
                }

                cols.push(domTree.element("col", style, []));
            }

            return cols;
        },

        _trs: function(tasks) {
            var task;
            var rows = [];

            for (var i = 0, length = tasks.length; i < length; i++) {
                task = tasks[i];

                rows.push(this._tds({
                    task: task,
                    style: i % 2 !== 0 ? { className: "k-alt", role: "row", "data-uid": task.uid } : { role: "row", "data-uid": task.uid }
                }));
            }

            return rows;
        },

        _tds: function(options) {
            var children = [];
            var columns = this.columns;
            var column;

            for (var i = 0, l = columns.length; i < l; i++) {
                column = columns[i];

                children.push(this._td({ task: options.task, column: column }));
            }

            return this.contentTree.element("tr", options.style, children);
        },

        _td: function(options) {
            var children;
            var domTree = this.contentTree;
            var task = options.task;
            var column = options.column;
            var value = task.get(column.field);
            var formatedValue = column.format ? kendo.format(column.format, value) : value;
            var isSummary = task.get("summary");
            var style = null;

            if (column.field == "title") {
                style = this._level({ idx: task.get("parentId"), id: task.get("id"), summary: isSummary });
                children = [domTree.element("span", { className: isSummary ? "k-icon k-i-collapse" : "k-icon k-i-none" }), domTree.text(formatedValue)];
            } else {
                children = [domTree.text(formatedValue)];
            }

            return domTree.element("td", style, children);
        },

        _level: function(options) {
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
