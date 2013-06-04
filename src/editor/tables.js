(function($, undefined) {

var kendo = window.kendo,
    extend = $.extend,
    Editor = kendo.ui.editor,
    EditorUtils = Editor.EditorUtils,
    Command = Editor.Command,
    Tool = Editor.Tool,
    ToolTemplate = Editor.ToolTemplate,
    registerTool = Editor.EditorUtils.registerTool;

var TableCommand = Command.extend({
    init: function(options) {
        var cmd = this;
        cmd.options = options;
        Command.fn.init.call(cmd, options);
    },

    exec: function () {
    },

    redo: function () {
        var that = this,
            range = that.lockRange(true);

        that.releaseRange(range);
    }

});

extend(kendo.ui.editor, {
    TableCommand: TableCommand
});

registerTool("createTable", new Tool({ command: TableCommand, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Create table"})}));

})(window.kendo.jQuery);
