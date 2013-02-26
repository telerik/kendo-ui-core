(function($, undefined) {

var kendo = window.kendo,
    Class = kendo.Class,
    extend = $.extend,
    Editor = kendo.ui.editor,
    dom = Editor.Dom,
    RangeUtils = Editor.RangeUtils,
    EditorUtils = Editor.EditorUtils,
    Command = Editor.Command,
    Tool = Editor.Tool,
    ToolTemplate = Editor.ToolTemplate,
    InlineFormatter = Editor.InlineFormatter,
    InlineFormatFinder = Editor.InlineFormatFinder,
    textNodes = RangeUtils.textNodes,
    registerTool = Editor.EditorUtils.registerTool;

var LinkFormatFinder = Class.extend({
    findSuitable: function (sourceNode) {
        return dom.parentOfType(sourceNode, ["a"]);
    }
});

var LinkFormatter = Class.extend({
    init: function() {
        this.finder = new LinkFormatFinder();
    },

    apply: function (range, attributes) {
        var nodes = textNodes(range),
            markers, doc,
            formatter, a;

        if (attributes.innerHTML) {
            markers = RangeUtils.getMarkers(range);

            doc = RangeUtils.documentFromRange(range);

            range.deleteContents();
            a = dom.create(doc, "a", attributes);
            range.insertNode(a);

            if (dom.name(a.parentNode) == "a") {
                dom.insertAfter(a, a.parentNode);
            }

            if (markers.length > 1) {
                dom.insertAfter(markers[markers.length - 1], a);
                dom.insertAfter(markers[1], a);
                dom[nodes.length > 0 ? "insertBefore" : "insertAfter"](markers[0], a);
            }
        } else {
            formatter = new InlineFormatter([{ tags: ["a"]}], attributes);
            formatter.finder = this.finder;
            formatter.apply(nodes);
        }
    }
});

var UnlinkCommand = Command.extend({
    init: function(options) {
        options.formatter = /** @ignore */ {
            toggle : function(range) {
                new InlineFormatter([{ tags: ["a"]}]).remove(textNodes(range));
            }
        };
        this.options = options;
        Command.fn.init.call(this, options);
    }
});

var LinkCommand = Command.extend({
    init: function(options) {
        var cmd = this;
        cmd.options = options;
        Command.fn.init.call(cmd, options);
        cmd.attributes = null;
        cmd.async = true;
        cmd.formatter = new LinkFormatter();
    },

    _dialogTemplate: function(showText) {
        return kendo.template(
            '<div class="k-editor-dialog">' +
                "<ol>" +
                    "<li class='k-form-text-row'>" +
                        "<label for='k-editor-link-url'>#: messages.linkWebAddress #</label>" +
                        "<input type='text' class='k-input' id='k-editor-link-url'>" +
                    "</li>" +
                    "# if (showText) { #" +
                        "<li class='k-form-text-row'>" +
                            "<label for='k-editor-link-text'>#: messages.linkText #</label>" +
                            "<input type='text' class='k-input' id='k-editor-link-text'>" +
                        "</li>" +
                    "# } #" +
                    "<li class='k-form-text-row'>" +
                        "<label for='k-editor-link-title'>#: messages.linkToolTip #</label>" +
                        "<input type='text' class='k-input' id='k-editor-link-title'>" +
                    "</li>" +
                    "<li class='k-form-checkbox-row'>" +
                        "<input type='checkbox' id='k-editor-link-target'>" +
                        "<label for='k-editor-link-target'>#: messages.linkOpenInNewWindow #</label>" +
                    "</li>" +
                "</ol>" +
                "<div class='k-button-wrapper'>" +
                    '<button class="k-dialog-insert k-button">#: messages.dialogInsert #</button>' +
                    '&nbsp;#: messages.dialogButtonSeparator #&nbsp;' +
                    '<a href="\\#" class="k-dialog-close k-link">#: messages.dialogCancel #</a>' +
                "</div>" +
            "</div>"
        )({
            messages: this.editor.options.messages,
            showText: showText
        });
    },

    exec: function () {
        var that = this,
            range = that.getRange(),
            collapsed = range.collapsed,
            nodes,
            initialText = null,
            messages = that.editor.options.messages;

        range = that.lockRange(true);
        nodes = textNodes(range);

        function apply(e) {
            var element = dialog.element,
                href = $("#k-editor-link-url", element).val(),
                title, text, target;

            if (href && href != "http://") {
                that.attributes = { href: href };

                title = $("#k-editor-link-title", element).val();
                if (title) {
                    that.attributes.title = title;
                }

                text = $("#k-editor-link-text", element).val();
                if (text !== initialText) {
                    that.attributes.innerHTML = text || href;
                }

                target = $("#k-editor-link-target", element).is(":checked");
                if (target) {
                    that.attributes.target = "_blank";
                }

                that.formatter.apply(range, that.attributes);
            }

            close(e);

            if (that.change) {
                that.change();
            }
        }

        function close(e) {
            e.preventDefault();
            dialog.destroy();

            dom.windowFromDocument(RangeUtils.documentFromRange(range)).focus();

            that.releaseRange(range);
        }

        var a = nodes.length ? that.formatter.finder.findSuitable(nodes[0]) : null;

        var showText = nodes.length <= 1 || (nodes.length == 2 && collapsed);

        var dialog = EditorUtils.createDialog(that._dialogTemplate(showText), that.editor, extend({}, that.editor.options.dialogOptions, {
            title: messages.createLink,
            close: close,
            visible: false
        }))
            .find(".k-dialog-insert").click(apply).end()
            .find(".k-dialog-close").click(close).end()
            .find(".k-form-text-row input").keydown(function (e) {
                var keys = kendo.keys;
                if (e.keyCode == keys.ENTER) {
                    apply(e);
                } else if (e.keyCode == keys.ESC) {
                    close(e);
                }
            }).end()
            // IE < 8 returns absolute url if getAttribute is not used
            .find("#k-editor-link-url").val(a ? a.getAttribute("href", 2) : "http://").end()
            .find("#k-editor-link-text").val(nodes.length > 0 ? (nodes.length == 1 ? nodes[0].nodeValue : nodes[0].nodeValue + nodes[1].nodeValue) : "").end()
            .find("#k-editor-link-title").val(a ? a.title : "").end()
            .find("#k-editor-link-target").attr("checked", a ? a.target == "_blank" : false).end()
            .data("kendoWindow")
            .center().open();

        if (showText && nodes.length > 0) {
            initialText = $("#k-editor-link-text", dialog.element).val();
        }

        $("#k-editor-link-url", dialog.element).focus().select();
    },

    redo: function () {
        var that = this,
            range = that.lockRange(true);

        that.formatter.apply(range, that.attributes);
        that.releaseRange(range);
    }

});

var UnlinkTool = Tool.extend({
    init: function(options) {
        this.options = options;
        this.finder = new InlineFormatFinder([{tags:["a"]}]);

        Tool.fn.init.call(this, $.extend(options, {command:UnlinkCommand}));
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
    LinkFormatFinder: LinkFormatFinder,
    LinkFormatter: LinkFormatter,
    UnlinkCommand: UnlinkCommand,
    LinkCommand: LinkCommand,
    UnlinkTool: UnlinkTool
});

registerTool("createLink", new Tool({ key: "K", ctrl: true, command: LinkCommand, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Create Link"})}));
registerTool("unlink", new UnlinkTool({ key: "K", ctrl: true, shift: true, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Remove Link"})}));

})(window.kendo.jQuery);
