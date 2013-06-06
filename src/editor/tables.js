(function($, undefined) {

var kendo = window.kendo,
    extend = $.extend,
    Editor = kendo.ui.editor,
    EditorUtils = Editor.EditorUtils,
    Command = Editor.Command,
    Tool = Editor.Tool,
    RangeUtils = Editor.RangeUtils,
    ToolTemplate = Editor.ToolTemplate,
    BlockFormatFinder = Editor.BlockFormatFinder,
    registerTool = Editor.EditorUtils.registerTool;

var TableCommand = Command.extend({
    _createTable: function(doc, rows, columns) {
        var td = "<td>" + Editor.emptyElementContent + "</td>";

        return $("<table>" +
                     new Array(rows + 1).join("<tr>" + new Array(columns + 1).join(td) + "</tr>") +
                 "</table>", doc)[0];
    },

    exec: function() {
        var range = this.getRange(),
            options = this.options,
            doc = RangeUtils.documentFromRange(range);

        range.insertNode(this._createTable(doc, options.rows || 1, options.columns || 1));
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
        ui.addClass("k-state-disabled");
    },

    update: function (ui, nodes) {
        ui.toggleClass("k-state-disabled", !this.finder.isFormatted(nodes))
          .removeClass("k-state-hover");
    }
});

extend(kendo.ui.editor, {
    TableCommand: TableCommand,
    InsertTableTool: InsertTableTool
});

registerTool("createTable", new InsertTableTool({ template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Create table"})}));

})(window.kendo.jQuery);
