(function($, undefined) {

var kendo = window.kendo,
    extend = $.extend,
    Editor = kendo.ui.editor,
    EditorUtils = Editor.EditorUtils,
    dom = Editor.Dom,
    RangeUtils = Editor.RangeUtils,
    Command = Editor.Command,
    Class = kendo.Class,
    Tool = Editor.Tool,
    ToolTemplate = Editor.ToolTemplate,
    registerTool = Editor.EditorUtils.registerTool;

var TableFormatter = Class.extend({
    init: function(options) {
        options = options || {};

        options.columns = options.columns || 1;
        options.rows = options.rows || 1;

        this.options = options;
    },

    _createTable: function(rows, columns) {
        return $(
            "<table>" +
                new Array(rows + 1).join("<tr>" + new Array(columns + 1).join("<td></td>") + "</tr>") +
            "</table>")[0];
    },

    apply: function (nodes) {
        var commonAncestor = dom.closestSplittableParent(nodes);
        var options = this.options,
            table = this._createTable(options.rows, options.columns);

        var td = table;

        while (dom.name(td) != "td") {
            td = td.firstChild;
        }

        var i = nodes.length;
        while (i-- > 0) {
            dom.insertAt(td, nodes[i], 0);
        }

        commonAncestor.appendChild(table);
    },

    remove: function () {
    },

    toggle: function (range) {
        this.apply(RangeUtils.textNodes(range));
    }
});

var TableCommand = Command.extend({
    init: function(options) {
        options.formatter = new TableFormatter(options);
        Command.fn.init.call(this, options);
    }
});

extend(kendo.ui.editor, {
    TableCommand: TableCommand,
    TableFormatter: TableFormatter
});

registerTool("createTable", new Tool({ command: TableCommand, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Create table"})}));

})(window.kendo.jQuery);
