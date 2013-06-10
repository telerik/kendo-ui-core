(function($, undefined) {

var kendo = window.kendo,
    extend = $.extend,
    proxy = $.proxy,
    Editor = kendo.ui.editor,
    EditorUtils = Editor.EditorUtils,
    Command = Editor.Command,
    NS = ".kendoEditor",
    Tool = Editor.Tool,
    ToolTemplate = Editor.ToolTemplate,
    BlockFormatFinder = Editor.BlockFormatFinder,
    registerTool = Editor.EditorUtils.registerTool;

var TableCommand = Command.extend({
    _tableHtml: function(rows, columns) {
        var td = "<td contentEditable='true'>" + Editor.emptyElementContent + "</td>";

        rows = rows || 1;
        columns = columns || 1;

        return "<table class='k-table' contentEditable='false' data-last>" +
                   new Array(rows + 1).join("<tr>" + new Array(columns + 1).join(td) + "</tr>") +
               "</table><br _moz_dirty />";
    },

    exec: function() {
        var options = this.options,
            editor = this.editor,
            range,
            tableHtml = this._tableHtml(options.rows, options.columns);

        editor.selectRange(options.range);
        editor.clipboard.paste(tableHtml);

        range = editor.getRange();

        range.selectNodeContents($("table[data-last]", editor.document).removeAttr("data-last").find("td")[0]);

        editor.selectRange(range);
    }
});

var InsertTableTool = Tool.extend({
    init: function(options) {
        this.options = options;
        this.finder = new BlockFormatFinder([{tags:["table"]}]);

        this.cols = 8;
        this.rows = 6;
        Tool.fn.init.call(this, $.extend(options, { command: TableCommand }));
    },

    _template: function() {
        return "<div class='k-ct-popup'>" +
                new Array(this.cols * this.rows + 1).join("<div class='k-ct-cell' />") +
                "<div class='k-status'>Cancel</div>" +
            "</div>";
    },

    initialize: function(ui, options) {
        Tool.fn.initialize.call(this, ui, options);

        var popup = $(this._template()).appendTo("body").kendoPopup({
            anchor: ui,
            copyAnchorStyles: false,
            activate: proxy(this._attachEvents, this),
            close: proxy(this._detachEvents, this)
        }).data("kendoPopup");

        ui.click(proxy(this._toggle, this));

        this._editor = options.editor;
        this._popup = popup;
    },

    _toggle: function(e) {
        var button = $(e.target).closest(".k-tool-icon");
        if (!button.hasClass("k-state-disabled")) {
            this._popup.toggle();
        }
    },

    _attachEvents: function() {
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

        that._popup.options.anchor.addClass("k-state-active");

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
                            "k-state-active",
                            i % cols < t.col && i / cols < t.row
                        );
                    });
                } else {
                    status.text("Cancel");
                    cells.removeClass("k-state-active");
                }
            })
            .on("mouseleave" + NS, function() {
                cells.removeClass("k-state-active");
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

    _detachEvents: function() {
        this._popup.options.anchor.removeClass("k-state-active");
        this._popup.element.off(NS);
    },

    update: function (ui, nodes) {
        ui.toggleClass("k-state-disabled", this.finder.isFormatted(nodes))
          .removeClass("k-state-hover");
    }
});

extend(kendo.ui.editor, {
    TableCommand: TableCommand,
    InsertTableTool: InsertTableTool
});

registerTool("createTable", new InsertTableTool({ template: new ToolTemplate({template: EditorUtils.buttonTemplate, popup: true, title: "Create table"})}));

})(window.kendo.jQuery);
