(function($) {

// Imports ================================================================
var kendo = window.kendo,
    Class = kendo.Class,
    extend = $.extend,
    dom = kendo.ui.Editor.Dom;

var LinkFormatFinder = Class.extend({
    init: function() {
        
    },

    findSuitable: function (sourceNode) {
        return dom.parentOfType(sourceNode, ['a']);
    }

});

var LinkFormatter = Class.extend({
    init: function() {
        this.finder = new LinkFormatFinder();
    },

    apply: function (range, attributes) {
        var nodes = textNodes(range);
        if (attributes.innerHTML != undefined) {
            var markers = getMarkers(range);
            var document = documentFromRange(range);
            range.deleteContents();
            var a = dom.create(document, 'a', attributes);
            range.insertNode(a);

            if (markers.length > 1) {
                dom.insertAfter(markers[markers.length - 1], a);
                dom.insertAfter(markers[1], a);
                dom[nodes.length > 0 ? 'insertBefore' : 'insertAfter'](markers[0], a);
            }
        } else {
            var formatter = new InlineFormatter([{ tags: ['a']}], attributes);
            formatter.finder = this.finder;
            formatter.apply(nodes);
        }
    }

});

var UnlinkCommand = Class.extend({
    init: function(options) {
        options.formatter = {
            toggle : function(range) {
                new InlineFormatter([{ tags: ['a']}]).remove(textNodes(range));
            }
        };
        this.options = options;
        Command.fn.init.call(this, options);
    }
});

var LinkCommand = Command.extend({
    init: function(options) {
        var cmd = this;
        Command.fn.init.call(cmd, options);
        cmd.attributes = null;
        cmd.async = true;
        cmd.formatter = new LinkFormatter();
    },

    exec: function () {
        var range = this.getRange();

        var collapsed = range.collapsed;

        range = this.lockRange(true);

        var nodes = textNodes(range);

        var initialText = null;

        var self = this;

        function apply(e) {
            var href = $('#t-editor-link-url', dialog.element).val();

            if (href && href != 'http://') {
                self.attributes = { href: href };

                var title = $('#t-editor-link-title', dialog.element).val();
                if (title)
                    self.attributes.title = title;

                var text = $('#t-editor-link-text', dialog.element).val();
                if (text !== initialText)
                    self.attributes.innerHTML = text;

                var target = $('#t-editor-link-target', dialog.element).is(':checked');
                if (target)
                    self.attributes.target = '_blank';

                self.formatter.apply(range, self.attributes);
            }
            close(e);
            if (self.change)
                self.change();
        }

        function close(e) {
            e.preventDefault();
            dialog.destroy();

            windowFromDocument(documentFromRange(range)).focus();

            self.releaseRange(range);
        }

        var a = nodes.length ? self.formatter.finder.findSuitable(nodes[0]) : null;

        var shouldShowText = nodes.length <= 1 || (nodes.length == 2 && collapsed);

        var dialog = $t.window.create($.extend({}, this.editor.dialogOptions, {
            title: "Insert link",
            html: new $.telerik.stringBuilder()
                .cat('<div class="t-editor-dialog">')
                    .cat('<ol>')
                        .cat('<li class="t-form-text-row"><label for="t-editor-link-url">Web address</label><input type="text" class="t-input" id="t-editor-link-url"/></li>')
                        .catIf('<li class="t-form-text-row"><label for="t-editor-link-text">Text</label><input type="text" class="t-input" id="t-editor-link-text"/></li>', shouldShowText)
                        .cat('<li class="t-form-text-row"><label for="t-editor-link-title">Tooltip</label><input type="text" class="t-input" id="t-editor-link-title"/></li>')
                        .cat('<li class="t-form-checkbox-row"><input type="checkbox" id="t-editor-link-target"/><label for="t-editor-link-target">Open link in new window</label></li>')
                    .cat('</ol>')
                    .cat('<div class="t-button-wrapper">')
                        .cat('<button class="t-dialog-insert t-button">Insert</button>')
                        .cat('&nbsp;or&nbsp;')
                        .cat('<a href="#" class="t-dialog-close t-link">Close</a>')
                    .cat('</div>')
                .cat('</div>')
                .string(),
            onClose: close
        }))
            .hide()
            .find('.t-dialog-insert').click(apply).end()
            .find('.t-dialog-close').click(close).end()
            .find('.t-form-text-row input').keydown(function (e) {
                if (e.keyCode == 13)
                    apply(e);
                else if (e.keyCode == 27)
                    close(e);
            }).end()
            // IE < 8 returns absolute url if getAttribute is not used
            .find('#t-editor-link-url').val(a ? a.getAttribute('href', 2) : 'http://').end()
            .find('#t-editor-link-text').val(nodes.length > 0 ? (nodes.length == 1 ? nodes[0].nodeValue : nodes[0].nodeValue + nodes[1].nodeValue) : '').end()
            .find('#t-editor-link-title').val(a ? a.title : '').end()
            .find('#t-editor-link-target').attr('checked', a ? a.target == '_blank' : false).end()
            .show()
            .data('tWindow')
            .center();

        if (shouldShowText && nodes.length > 0)
            initialText = $('#t-editor-link-text', dialog.element).val();

        $('#t-editor-link-url', dialog.element).focus().select();
    },

    redo: function () {
        var range = this.lockRange(true);
        this.formatter.apply(range, this.attributes);
        this.releaseRange(range);
    }

});

var UnlinkTool = Tool.extend({
    init: function(options) {
        this.options = options;

        Tool.fn.init.call(this, $.extend(options, {command:UnlinkCommand}));
    },

    initialize: function($ui) {
        $ui.attr('unselectable', 'on')
           .addClass('t-state-disabled');
    },

    update: function ($ui, nodes) {
        $ui.toggleClass('t-state-disabled', !this.finder.isFormatted(nodes))
            .removeClass('t-state-hover');
    }
});

extend(kendo.ui.Editor, {
    LinkFormatFinder: LinkFormatFinder,
    LinkFormatter: LinkFormatter,
    UnlinkCommand: UnlinkCommand,
    LinkCommand: LinkCommand,
    UnlinkTool: UnlinkTool
});

})(jQuery);