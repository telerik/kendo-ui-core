(function(f, define) {
    define(["./kendo.core", "./kendo.sorter", "./kendo.editable"], f);
})(function() {

var __meta__ = {
    id: "gantt.list",
    name: "Gantt List",
    category: "web",
    description: "The Gantt List",
    depends: [ "core", "sorter", "editable" ],
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
    var NS = ".kendoGanttList";
    var CLICK = "click";

    ui.GanttList = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            if (this.options.columns.length === 0) {
                this.options.columns.push("title");
            }

            this.dataSource = this.options.dataSource;

            this._columns();
            this._layout();
            this._dom();
            this._header();
            this._sortable();
            this._editable();
            this._attachEvents();
        },

        destroy: function() {
            Widget.fn.destroy.call(this);

            this.content.off(NS);
            this.header = null;
            this.content = null;
            this.levels = null;

            kendo.destroy(this.element);
        },

        options: {
            name: "GanttList"
        },

        _attachEvents: function() {
            var that = this;

            that.content
                .on(CLICK + NS, "td > span.k-icon:not(.k-i-none)", function(e) {
                    var element = $(this);
                    var model = that._modelFromElement(element);

                    element.toggleClass("k-i-collapse k-i-expand");
                    model.set("expanded", !model.get("expanded"));
                })
                .on("dblclick" + NS, "td > span.k-icon:not(.k-i-none)", function(e) {
                    e.stopPropagation();
                });
        },

        _dom: function() {
            this.headerTree = new kendoDom.Tree(this.header[0]);
            this.contentTree = new kendoDom.Tree(this.content[0]);
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
        },

        _header: function() {
            var domTree = this.headerTree;
            var colgroup;
            var thead;
            var table;

            colgroup = domTree.element("colgroup", null, this._cols(domTree));
            thead = domTree.element("thead", { role: "rowgroup" }, [domTree.element("tr", null, this._ths())]);
            table = domTree.element("table", { role: "grid" }, [colgroup, thead]);

            domTree.render([table]);
        },

        _render: function(tasks) {
            var domTree = this.contentTree;
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
            var domTree = this.headerTree;
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
                children = [
                    domTree.element("span", { className: isSummary ? "k-icon k-i-collapse" : "k-icon k-i-none" }),
                    domTree.element("span", null, [domTree.text(formatedValue)])
                ];
            } else {
                children = [domTree.element("span", null, [domTree.text(formatedValue)])];
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
        },

        _sortable: function() {
            var columns = this.columns;
            var column;
            var sortableInstance;
            var cells = this.header.find("th");
            var cell;

            for (var idx = 0, length = cells.length; idx < length; idx++) {
                column = columns[idx];

                if (column.sortable) {
                    cell = cells.eq(idx);

                    sortableInstance = cell.data("kendoSorter");

                    if (sortableInstance) {
                        sortableInstance.destroy();
                    }

                    cell.attr("data-" + kendo.ns + "field", column.field)
                        .kendoSorter({ dataSource: this.dataSource });
                }
            }
            cells = null;
        },

        _editable: function() {
            var that = this;
            var handler = function() {
                if (that.editable.end()) {
                    that._closeCell();
                }
            };

            that.content
                .on("dblclick" + NS, "td", function(e) {
                    var td = $(this);
                    var tr = td.parent();
                    var idx = tr.children().index(td);
                    var column = that.columns[idx];

                    if (that.editable) {
                        return;
                    }

                    if (column.editable) {
                        that._editCell({ cell: td, column: column });
                    }
                })
                .on("focusin" + NS, function() {
                    clearTimeout(that.timer);
                    that.timer = null;
                })
                .on("focusout" + NS, function() {
                    that.timer = setTimeout(handler, 1);
                });
        },

        _editCell: function(options) {
            var that = this;
            var cell = options.cell;
            var column = options.column;
            var model = this._modelFromElement(cell);

            if (!this._modelChangeHandler) {
                this._modelChangeHandler = function() {
                    that.updated = true;
                };
            }

            this._editableContent = cell.children().detach();
            this._editableContainer = cell;

            model.bind("change", this._modelChangeHandler);

            this.editable = cell.kendoEditable({
                                fields: {
                                    field: column.field,
                                    format: column.format,
                                    editor: column.editor,
                                    values: column.values
                                },
                                model: model,
                                clearContainer: false
                            }).data("kendoEditable");
        },

        _closeCell: function() {
            var cell = this._editableContainer;
            var model = this._modelFromElement(cell);

            model.unbind("change", this._modelChangeHandler);
            cell.empty()
                .append(this._editableContent);

            this.editable.destroy();
            this.editable = null;

            this._editableContainer = null;
            this._editableContent = null;

            if (this.updated) {
                this.updated = false;
                this.trigger("update");
            }
        },

        _modelFromElement: function(element) {
            var row = element.closest("tr");
            var model = this.dataSource.getByUid(row.attr(kendo.attr("uid")));

            return model;
        }
    });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f) { f(); });
