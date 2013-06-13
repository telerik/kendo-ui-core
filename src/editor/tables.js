(function($, undefined) {

var kendo = window.kendo,
    extend = $.extend,
    proxy = $.proxy,
    Editor = kendo.ui.editor,
    dom = Editor.Dom,
    EditorUtils = Editor.EditorUtils,
    Command = Editor.Command,
    NS = ".kendoEditor",
    ACTIVESTATE = "k-state-active",
    SELECTEDSTATE = "k-state-selected",
    Tool = Editor.Tool,
    ToolTemplate = Editor.ToolTemplate,
    BlockFormatFinder = Editor.BlockFormatFinder,
    registerTool = Editor.EditorUtils.registerTool;

var editableCell = "<td contentEditable='true'>" + Editor.emptyElementContent + "</td>";

var tableFormatFinder = new BlockFormatFinder([{tags:["table"]}]);

var TableCommand = Command.extend({
    _tableHtml: function(rows, columns) {
        rows = rows || 1;
        columns = columns || 1;

        return "<table class='k-table' contentEditable='false' data-last>" +
                   new Array(rows + 1).join("<tr>" + new Array(columns + 1).join(editableCell) + "</tr>") +
               "</table><br _moz_dirty />";
    },

    exec: function() {
        var options = this.options,
            editor = this.editor,
            range,
            tableHtml = this._tableHtml(options.rows, options.columns),
            insertedTable;

        editor.selectRange(options.range);
        editor.clipboard.paste(tableHtml);

        range = editor.getRange();

        insertedTable = $("table[data-last]", editor.document).removeAttr("data-last");

        range.selectNodeContents(insertedTable.find("td")[0]);

        editor.selectRange(range);
    }
});

var TableEditor = kendo.Class.extend({
    init: function(table) {
        this.table = table;

        this._render();

        this._attachEvents();
    },

    _render: function() {
        var table = this.table,
            doc = table.ownerDocument,
            selectionRow = dom.create(doc, "tr"),
            selectionCell = dom.create(doc, "td"),
            rows = table.rows,
            i;

        selectionCell.className = "k-selection-cell";
        selectionCell.contentEditable = "false";
        selectionRow.className = "k-selection-row";

        for (i = 0; i < rows[rows.length-1].cells.length; i++) {
            selectionRow.appendChild(selectionCell.cloneNode());
        }

        dom.insertBefore(selectionRow, table.rows[0]);

        for (i = 0; i < rows.length; i++) {
            dom.insertBefore(selectionCell.cloneNode(), rows[i].cells[0]);
        }

        rows[0].cells[0].className = "k-select-all";
    },

    _attachEvents: function() {
        $(this.table)
            .on("click" + NS, ".k-selection-cell", proxy(this._selectionCellClick, this))
            .on("mousedown" + NS, "td:not(.k-selection-cell)", proxy(this.clearSelection, this));
    },

    _detachEvents: function() {
        $(this.table).off(NS);
    },

    _selectionCellClick: function(e) {
        var target = $(e.target),
            rowIndex = target.parent().index(),
            cellIndex = target.index();

        e.preventDefault();

        if (!e.shiftKey) {
            this.clearSelection();
        }

        if (!cellIndex) {
            this.selectRow(rowIndex);
        } else if (!rowIndex) {
            this.selectColumn(cellIndex);
        }
    },

    selectRow: function(index) {
        var cells = this.table.rows[index].cells;

        for (var i = 1; i < cells.length; i++) {
            cells[i].className += " k-selected";
        }
    },

    selectColumn: function(index) {
        var rows = this.table.rows;

        for (var i = 1; i < rows.length; i++) {
            rows[i].cells[index].className += " k-selected";
        }
    },

    clearSelection: function() {
        var rows = this.table.rows, cells,
            r, c;

        for (r = 1; r < rows.length; r++) {
            cells = rows[r].cells;

            for (c = 1; c < cells.length; c++) {
                cells[c].className = cells[c].className.replace(/\s?k-selected\b/, "");
            }
        }
    },

    destroy: function() {
        var rows = this.table.rows, i, len = rows.length;

        this.clearSelection();

        this._detachEvents();

        for (i = 0; i < len; i++) {
            dom.remove(rows[i].cells[0]);
        }

        dom.remove(rows[0]);
    }
});

extend(TableEditor, {
    importEditorStyles: function() {
    },

    attach: function(table) {
        if (!table._editor) {
            table._editor = new TableEditor(table);
        }
    },

    detach: function(table) {
        if (table._editor) {
            table._editor.destroy();
            table._editor = null;
        }
    }
});

var PopupTool = Tool.extend({
    initialize: function(ui, options) {
        Tool.fn.initialize.call(this, ui, options);

        var popup = $(this.options.popupTemplate).appendTo("body").kendoPopup({
            anchor: ui,
            copyAnchorStyles: false,
            open: proxy(this._open, this),
            activate: proxy(this._activate, this),
            close: proxy(this._close, this)
        }).data("kendoPopup");

        ui.click(proxy(this._toggle, this));

        this._editor = options.editor;
        this._popup = popup;
    },

    popup: function() {
        return this._popup;
    },

    _activate: $.noop,

    _open: function() {
        this._popup.options.anchor.addClass(ACTIVESTATE);
    },

    _close: function() {
        this._popup.options.anchor.removeClass(ACTIVESTATE);
    },

    _toggle: function(e) {
        var button = $(e.target).closest(".k-tool-icon");

        if (!button.hasClass("k-state-disabled")) {
            this.popup().toggle();
        }
    },

    update: function(ui) {
        this.popup().close();

        ui.removeClass("k-state-hover");
    }
});

var InsertTableTool = PopupTool.extend({
    init: function(options) {
        this.cols = 8;
        this.rows = 6;

        PopupTool.fn.init.call(this, $.extend(options, {
            command: TableCommand,
            popupTemplate:
                "<div class='k-ct-popup'>" +
                    new Array(this.cols * this.rows + 1).join("<div class='k-ct-cell k-state-disabled' />") +
                    "<div class='k-status'>Cancel</div>" +
                "</div>"
        }));
    },

    _activate: function() {
        var that = this,
            element = that._popup.element,
            status = element.find(".k-status"),
            cells = element.find(".k-ct-cell"),
            firstCell = cells.eq(0),
            lastCell = cells.eq(cells.length - 1),
            start = kendo.getOffset(firstCell),
            end = kendo.getOffset(lastCell),
            cols = that.cols,
            rows = that.rows,
            cellWidth, cellHeight;

        end.left += lastCell[0].offsetWidth;
        end.top += lastCell[0].offsetHeight;

        cellWidth = (end.left - start.left) / cols;
        cellHeight = (end.top - start.top) / rows;

        function tableFromLocation(e) {
            var w = $(window);
            return {
                row: Math.floor((e.clientY + w.scrollTop() - start.top) / cellHeight) + 1,
                col: Math.floor((e.clientX + w.scrollLeft() - start.left) / cellWidth) + 1
            };
        }

        function valid(p) {
            return p.row > 0 && p.col > 0 && p.row <= rows && p.col <= cols;
        }

        element
            .on("mousemove" + NS, function(e) {
                var t = tableFromLocation(e);

                if (valid(t)) {
                    status.text(kendo.format("Create a {0} x {1} table", t.row, t.col));

                    cells.each(function(i) {
                        $(this).toggleClass(
                            SELECTEDSTATE,
                            i % cols < t.col && i / cols < t.row
                        );
                    });
                } else {
                    status.text("Cancel");
                    cells.removeClass(SELECTEDSTATE);
                }
            })
            .on("mouseleave" + NS, function() {
                cells.removeClass(SELECTEDSTATE);
                status.text("Cancel");
            })
            .on("mouseup" + NS, function(e) {
                var t = tableFromLocation(e);

                if (valid(t)) {
                    that._editor.exec("createTable", {
                        rows: t.row,
                        columns: t.col
                    });
                    that._popup.close();
                }
            });
    },

    _open: function() {
        PopupTool.fn._open.call(this);
        this.popup().element.find(".k-ct-cell").removeClass(SELECTEDSTATE);
    },

    _close: function() {
        PopupTool.fn._close.call(this);
        this.popup().element.off(NS);
    },

    update: function (ui, nodes) {
        var editor = this._editor, table, isFormatted;

        PopupTool.fn.update.call(this, ui);

        isFormatted = tableFormatFinder.isFormatted(nodes);
        ui.toggleClass("k-state-disabled", isFormatted);

        if (isFormatted) {
            table = $(nodes[0]).closest("table")[0];

            TableEditor.attach(table);

            editor.selectRange(editor.getRange());
        } else {
            $("table", nodes[0].ownerDocument).each(function() {
                TableEditor.detach(this);
            });
        }
    }
});

var InsertRowCommand = Command.extend({
    exec: function () {
        var that = this,
            range = that.lockRange(true),
            td = range.endContainer,
            cellCount, row,
            newRow;

        while (dom.name(td) != "td") {
            td = td.parentNode;
        }

        row = td.parentNode;
        cellCount = row.children.length;
        newRow = row.cloneNode(true);

        for (var i = 0; i < row.cells.length; i++) {
            newRow.cells[i].innerHTML = Editor.emptyElementContent;
        }

        if (this.options.position == "above") {
            dom.insertBefore(newRow, row);
        } else {
            dom.insertAfter(newRow, row);
        }

        that.releaseRange(range);
    }
});

var InsertRowTool = Tool.extend({
    command: function (options) {
        return new InsertRowCommand(extend(options, this.options));
    },

    update: function(ui, nodes) {
        var isFormatted = !tableFormatFinder.isFormatted(nodes);
        ui.toggleClass("k-state-disabled", isFormatted);
    }
});

extend(kendo.ui.editor, {
    PopupTool: PopupTool,
    TableCommand: TableCommand,
    TableEditor: TableEditor,
    InsertTableTool: InsertTableTool,
    InsertRowTool: InsertRowTool,
    InsertRowCommand: InsertRowCommand
});

registerTool("createTable", new InsertTableTool({ template: new ToolTemplate({template: EditorUtils.buttonTemplate, popup: true, title: "Create table"})}));

registerTool("addColumnLeft", new Tool({ template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Add column on the left"})}));
registerTool("addColumnRight", new Tool({ template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Add column on the right"})}));
registerTool("addRowAbove", new InsertRowTool({ position: "above", template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Add row above"})}));
registerTool("addRowBelow", new InsertRowTool({ template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Add row below"})}));
registerTool("deleteRow", new Tool({ template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Delete row"})}));
registerTool("deleteColumn", new Tool({ template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Delete column"})}));
//registerTool("mergeCells", new Tool({ template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Merge cells"})}));

})(window.kendo.jQuery);
