(function($, undefined) {

var kendo = window.kendo,
    extend = $.extend,
    Editor = kendo.ui.editor,
    EditorUtils = Editor.EditorUtils,
    Command = Editor.Command,
    Tool = Editor.Tool,
    ToolTemplate = Editor.ToolTemplate,
    BlockFormatFinder = Editor.BlockFormatFinder,
    registerTool = Editor.EditorUtils.registerTool;

function table(options) {
    var td = "<td" + options.cellAttr + ">" + options.cellContent + "</td>";

    return "<table" + options.attr + ">" +
               new Array(options.rows + 1).join("<tr>" + new Array(options.columns + 1).join(td) + "</tr>") +
           "</table>";
}

var TableCommand = Command.extend({
    exec: function() {
        var options = this.options,
            editor = this.editor,
            range,
            tableHtml = table({
                rows: options.rows || 1,
                columns: options.columns || 1,
                attr: " class='k-table' contentEditable='false' data-last",
                cellContent: Editor.emptyElementContent,
                cellAttr: " contentEditable='true'"
            });

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

        Tool.fn.init.call(this, $.extend(options, { command: TableCommand }));
    },

    initialize: function(ui, options) {
        Tool.fn.initialize.call(this, ui, options);
        ui.click(this._togglePopup);
    },

    _togglePopup: function(e) {
        if (!this._popup) {
            var tableHtml = table({ rows: 10, columns: 10 });
            this._popup = $(tableHtml).kendoPopup();
        }
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

registerTool("createTable", new InsertTableTool({ template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Create table"})}));

})(window.kendo.jQuery);
