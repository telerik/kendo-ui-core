(function(f, define) {
    define(["./kendo.core", "./kendo.touch", "./kendo.columnsorter", "./kendo.editable"], f);
})(function() {

var __meta__ = {
    id: "gantt.list",
    name: "Gantt List",
    category: "web",
    description: "The Gantt List",
    depends: [ "core", "touch" , "columnsorter", "editable" ],
    hidden: true
};

(function($) {
    var kendo = window.kendo;
    var kendoDom = kendo.dom;
    var kendoDomElement = kendoDom.element;
    var kendoTextElement = kendoDom.text;
    var activeElement = kendo._activeElement;
    var browser = kendo.support.browser;
    var isIE = browser.msie;
    var oldIE = isIE && browser.version < 9;
    var ui = kendo.ui;
    var Widget = ui.Widget;
    var extend = $.extend;
    var map = $.map;
    var keys = kendo.keys;
    var titleFromField = {
        "title": "Title",
        "start": "Start Time",
        "end": "End Time",
        "percentComplete": "% Done",
        "parentId": "Predecessor ID",
        "id": "ID",
        "orderId": "Order ID"
    };
    var NS = ".kendoGanttList";
    var CLICK = "click";
    var DROPPOSITIONS = "k-insert-top k-insert-bottom k-add";

    function createPlaceholders(level) {
        var spans = [];

        for (var i = 0; i < level; i++) {
            spans.push(kendoDomElement("span", { className: "k-icon k-i-none" }));
        }

        return spans;
    }

    ui.GanttList = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            if (this.options.columns.length === 0) {
                this.options.columns.push("title");
            }

            this.dataSource = this.options.dataSource;

            this._columns();
            this._layout();
            this._domTrees();
            this._header();
            this._sortable();
            this._editable();
            this._selectable();
            this._draggable();
            this._attachEvents();

            this.content.height(this.element.height() - this.header.parent().outerHeight());
        },

        destroy: function() {
            Widget.fn.destroy.call(this);

            if (this._reorderDraggable) {
                this._reorderDraggable.destroy();
            }

            if (this._dropTargetArea) {
                this._dropTargetArea.destroy();
            }

            this.touch.destroy();
            this.content.off(NS);
            this.header = null;
            this.content = null;
            this.levels = null;

            kendo.destroy(this.element);
        },

        options: {
            name: "GanttList",
            selectable: true
        },

        _attachEvents: function() {
            var that = this;

            that.content
                .on(CLICK + NS, "td > span.k-icon:not(.k-i-none)", function(e) {
                    var element = $(this);
                    var model = that._modelFromElement(element);

                    element.toggleClass("k-i-collapse k-i-expand");
                    model.set("expanded", !model.get("expanded"));

                    e.stopPropagation();
                });
        },

        _domTrees: function() {
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
                    field: column, title: titleFromField[column]
                } : column;

                return extend(new model(), column);
            });
        },

        _layout: function () {
            var element = this.element;

            element
                .addClass("k-treelist k-grid k-widget")
                .append("<div class='k-grid-header'><div class='k-grid-header-wrap'></div></div>")
                .append("<div class='k-grid-content'></div>");

            this.header = element.find(".k-grid-header-wrap");
            this.content = element.find(".k-grid-content");
        },

        _header: function() {
            var domTree = this.headerTree;
            var colgroup;
            var thead;
            var table;

            colgroup = kendoDomElement("colgroup", null, this._cols());
            thead = kendoDomElement("thead", null, [kendoDomElement("tr", null, this._ths())]);
            table = kendoDomElement("table", { "style": { "min-width": this.options.listWidth + "px" } }, [colgroup, thead]);

            domTree.render([table]);
        },

        _render: function(tasks) {
            var colgroup;
            var tbody;
            var table;

            this.levels = [{ field: null, value: 0 }];

            colgroup = kendoDomElement("colgroup", null, this._cols());
            tbody = kendoDomElement("tbody", null, this._trs(tasks));
            table = kendoDomElement("table", { "style": { "min-width": this.options.listWidth + "px" } }, [colgroup, tbody]);

            this.contentTree.render([table]);
        },

        _ths: function() {
            var columns = this.columns;
            var column;
            var style;
            var ths = [];

            for (var i = 0, length = columns.length; i < length; i++) {
                column = columns[i];
                style = { "data-field": column.field, "data-title": column.title, className: "k-header" };

                if (column.sortable) {
                    extend(style, { "data-role": "columnsorter" });
                }

                ths.push(kendoDomElement("th", style, [kendoTextElement(column.title)]));
            }

            return ths;
        },

        _cols: function() {
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

                cols.push(kendoDomElement("col", style, []));
            }

            return cols;
        },

        _trs: function(tasks) {
            var task;
            var rows = [];
            var style;
            var className = [];

            for (var i = 0, length = tasks.length; i < length; i++) {
                task = tasks[i];

                style = {
                    "data-uid": task.uid
                };

                if (i % 2 !== 0) {
                    className.push("k-alt");
                }

                if (task.summary) {
                    className.push("k-treelist-group");
                }

                if (className.length) {
                    style.className = className.join(" ");
                }

                rows.push(this._tds({
                    task: task,
                    style: style
                }));

                className = [];
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

            return kendoDomElement("tr", options.style, children);
        },

        _td: function(options) {
            var children = [];
            var task = options.task;
            var column = options.column;
            var value = task.get(column.field);
            var formatedValue = column.format ? kendo.format(column.format, value) : value;
            var isSummary;

            if (column.field === "title") {
                isSummary = task.summary;
                children = this._placeholders({ idx: task.parentId, id: task.id, summary: isSummary });
                children.push(kendoDomElement("span", {
                    className: "k-icon" + (isSummary ? (task.expanded ? " k-i-collapse" : " k-i-expand")
                        : " k-i-none")
                }));
            }

            children.push(kendoDomElement("span", null, [kendoTextElement(formatedValue)]));

            return kendoDomElement("td", null, children);
        },

        _placeholders: function(options) {
            var levels = this.levels;
            var level;
            var summary = options.summary;
            var idx = options.idx;
            var id = options.id;

            for (var i = 0, length = levels.length; i < length; i++) {
                level = levels[i];

                if (level.field == idx) {

                    if (summary) {
                        levels.push({ field: id, value: level.value + 1 });
                    }

                    return createPlaceholders(level.value);
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

                    sortableInstance = cell.data("kendoColumnSorter");

                    if (sortableInstance) {
                        sortableInstance.destroy();
                    }

                    cell.attr("data-" + kendo.ns + "field", column.field)
                        .kendoColumnSorter({ dataSource: this.dataSource });
                }
            }
            cells = null;
        },

        _selectable: function() {
            var that = this;
            var selectable = this.options.selectable;

            if (selectable) {
                this.content
                   .on(CLICK + NS, "tr", function(e) {
                       var element = $(this);

                       if (!e.ctrlKey) {
                           that.select(element);
                       } else {
                           that.clearSelection();
                       }
                   });
            }
        },

        select: function(value) {
            var element = this.content.find(value);

            if (element.length) {
                element
                    .addClass("k-state-selected")
                    .siblings(".k-state-selected")
                    .removeClass("k-state-selected");

                this.trigger("change");

                return;
            }

            return this.content.find(".k-state-selected");
        },

        clearSelection: function() {
            var selected = this.select();

            selected.removeClass("k-state-selected");

            this.trigger("change");
        },

        _editable: function() {
            var that = this;
            var finishEdit = function() {
                if (that.editable && that.editable.end()) {
                    that._closeCell();
                }
            };

            that.touch = that.content
                .on("focusin" + NS, function() {
                    clearTimeout(that.timer);
                    that.timer = null;
                })
                .on("focusout" + NS, function() {
                    that.timer = setTimeout(finishEdit, 1);
                })
                .on("keydown" + NS, function(e) {
                    var key = e.keyCode;
                    var active = $(activeElement());

                    switch (key) {
                        case keys.ENTER:
                            if (browser.opera || oldIE) {
                                active.change().triggerHandler("blur");
                            } else {
                                active.blur();
                                if (isIE) {
                                    //IE10 with jQuery 1.9.x does not trigger blur handler
                                    //numeric textbox does trigger change
                                    active.blur();
                                }
                            }
                            finishEdit();
                            break;
                        case keys.ESC:
                            that._closeCell(true);
                            break;
                    }
                })
                .kendoTouch({
                    filter: "td",
                    doubletap: function(e) {
                        var event = e.touch;

                        if ($(event.initialTouch).is("span.k-icon:not(.k-i-none)")) {
                            return;
                        }

                        var td = $(event.currentTarget);
                        var column = that._columnFromElement(td);

                        if (that.editable) {
                            return;
                        }

                        if (column.editable) {
                            that._editCell({ cell: td, column: column });
                        }
                    }
                }).data("kendoTouch");
        },

        _editCell: function(options) {
            var cell = options.cell;
            var column = options.column;
            var model = this._modelFromElement(cell);
            var modelCopy = this.dataSource._createNewModel(model.toJSON());
            var field = modelCopy.fields[column.field] || modelCopy[column.field];
            var DATATYPE = kendo.attr("type");
            var BINDING = kendo.attr("bind");
            var attr = {
                "name": column.field,
                "required": field.validation ?
                    field.validation.required === true : false
            };
            var editor;

            this._editableContent = cell.children().detach();
            this._editableContainer = cell;

            cell.data("modelCopy", modelCopy);
            
            if ((field.type === "date" || $.type(field) === "date") &&
                /H|m|s|F|g|u/.test(column.format)) {
                attr[BINDING] = "value:" + column.field;
                attr[DATATYPE] = "date";
                editor = function(container, options) {
                    $('<input type="text"/>').attr(attr)
                        .appendTo(container).kendoDateTimePicker({ format: options.format });
                };
            }

            this.editable = cell.addClass("k-edit-cell")
                                .kendoEditable({
                                    fields: {
                                        field: column.field,
                                        format: column.format,
                                        editor: column.editor || editor
                                    },
                                    model: modelCopy,
                                    clearContainer: false
                                }).data("kendoEditable");
        },

        _closeCell: function(cancelUpdate) {
            var cell = this._editableContainer;
            var model = this._modelFromElement(cell);
            var column = this._columnFromElement(cell);
            var copy = cell.data("modelCopy");
            var taskInfo = {};

            taskInfo[column.field] = copy.get(column.field);

            cell.empty()
                .removeData("modelCopy")
                .removeClass("k-edit-cell")
                .append(this._editableContent);

            this.editable.destroy();
            this.editable = null;

            this._editableContainer = null;
            this._editableContent = null;

            if (!cancelUpdate) {
                this.trigger("update", { task: model, updateInfo: taskInfo });
            }
        },

        _draggable: function() {
            var that = this;
            var draggedTask = null;
            var dropAllowed = true;
            var dropTarget;
            var action = {};
            var clear = function() {
                draggedTask = null;
                dropTarget = null;
                dropAllowed = true;
                action = {};
            };
            var allowDrop = function(task) {
                var parent = task;

                while (parent) {
                    if (draggedTask.get("id") === parent.get("id")) {
                        dropAllowed = false;
                        break;
                    }
                    parent = that.dataSource.taskParent(parent);
                }
            };
            var defineLimits = function() {
                var height = $(dropTarget).height();
                var offsetTop = kendo.getOffset(dropTarget).top;

                extend(dropTarget, { 
                    beforeLimit: offsetTop + height * 0.25,
                    afterLimit: offsetTop + height * 0.75
                });
            };
            var defineAction = function(coordinate) {
                var location = coordinate.location;
                var className = "k-add";
                var command = "add";

                if (location <= dropTarget.beforeLimit) {
                    className = "k-insert-top";
                    command = "insert-before";
                } else if (location >= dropTarget.afterLimit) {
                    className = "k-insert-bottom";
                    command = "insert-after";
                }

                action.className = className;
                action.command = command;
            };
            var status = function() {
                return that._reorderDraggable
                            .hint
                            .children(".k-drag-status")
                            .removeClass(DROPPOSITIONS);
            };

            this._reorderDraggable = this.content
                .kendoDraggable({
                    distance: 0,
                    group: "listGroup",
                    filter: "tr[data-uid]",
                    hint: function(target) {
                        return $('<div class="k-header k-drag-clue"/>')
                                .css({
                                    width: 300,
                                    paddingLeft: target.css("paddingLeft"),
                                    paddingRight: target.css("paddingRight"),
                                    lineHeight: target.height() + "px",
                                    paddingTop: target.css("paddingTop"),
                                    paddingBottom: target.css("paddingBottom")
                                })
                                .append('<span class="k-icon k-drag-status" /><span class="k-clue-text"/>');
                    },
                    cursorOffset: { top: 10, left: 0 },
                    container: this.content,
                    "dragstart": function(e) {
                        draggedTask = that._modelFromElement(e.currentTarget);
                        this.hint.children(".k-clue-text")
                            .text(draggedTask.get("title"));
                    },
                    "drag": function(e) {
                        if (dropAllowed) {
                            defineAction(e.y);
                            status().addClass(action.className);
                        }
                    },
                    "dragend": function(e) {
                        clear();
                    },
                    "dragcancel": function(e) {
                        clear();
                    }
                }).data("kendoDraggable");

            this._dropTargetArea = this.content
                .kendoDropTargetArea({
                    distance: 0,
                    group: "listGroup",
                    filter: "tr[data-uid]",
                    "dragenter": function(e) {
                        dropTarget = e.dropTarget;
                        allowDrop(that._modelFromElement(dropTarget));
                        defineLimits();
                        status().toggleClass("k-denied", !dropAllowed);
                    },
                    "dragleave": function(e) {
                        dropAllowed = true;
                        status();
                    },
                    "drop": function(e) {
                        var target = that._modelFromElement(dropTarget);
                        var taskInfo = {
                            parentId: target.parentId
                        };

                        if (dropAllowed) {
                            switch (action.command) {
                                case "add":
                                    taskInfo.parentId = target.id;
                                    break;
                                case "insert-before":
                                    taskInfo.orderId = target.orderId;
                                    break;
                                case "insert-after":
                                    taskInfo.orderId = target.orderId + 1;
                                    break;
                            }
                            that.trigger("update", {
                                task: draggedTask,
                                updateInfo: taskInfo
                            });
                        }
                    }
                }).data("kendoDropTargetArea");
        },

        _modelFromElement: function(element) {
            var row = element.closest("tr");
            var model = this.dataSource.getByUid(row.attr(kendo.attr("uid")));

            return model;
        },

        _columnFromElement: function(element) {
            var td = element.closest("td");
            var tr = td.parent();
            var idx = tr.children().index(td);

            return this.columns[idx];
        }
    });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f) { f(); });
