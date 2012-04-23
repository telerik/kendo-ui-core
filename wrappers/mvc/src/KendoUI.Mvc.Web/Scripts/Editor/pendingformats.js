function PendingFormats(editor) {
    this.editor = editor;
    this.formats = [];
}

PendingFormats.prototype = {
    apply: function(range) {
        if (!this.hasPending())
            return;
            
        var marker = new Marker();
        
        marker.addCaret(range);

        var caret = range.startContainer.childNodes[range.startOffset];

        var target = caret.previousSibling;

        /* under IE, target is a zero-length text node. go figure. */
        if (!target.nodeValue)
            target = target.previousSibling;

        range.setStart(target, target.nodeValue.length - 1);

        marker.add(range);

        if (textNodes(range).length == 0) {
            marker.remove(range);
            range.collapse(true);
            this.editor.selectRange(range);
            return;
        }

        var textNode = marker.end.previousSibling.previousSibling;

        var pendingFormat, formats = this.formats;

        for (var i = 0; i < formats.length; i++) {
            pendingFormat = formats[i];
            
            var command = pendingFormat.command($.extend({ range: range }, pendingFormat.params));
            command.editor = this.editor;
            command.exec();

            range.selectNode(textNode);
        }

        marker.remove(range);

        if (textNode.parentNode) {
            range.setStart(textNode, 1);
            range.collapse(true);
        }
        
        this.clear();

        this.editor.selectRange(range);
    },
    hasPending: function() {
        return this.formats.length > 0;
    },
    isPending: function(format) {
        return !!this.getPending(format);
    },
    getPending: function(format) {
        var formats = this.formats;
        for (var i = 0; i < formats.length; i++)
            if (formats[i].name == format)
                return formats[i];

        return;
    },
    toggle: function(format) {
        var formats = this.formats;

        for (var i = 0; i < formats.length; i++)
            if (formats[i].name == format.name) {
                if (formats[i].params && formats[i].params.value != format.params.value)
                    formats[i].params.value = format.params.value;
                else
                    formats.splice(i, 1);

                return;
            }

        formats.push(format);
    },
    clear: function() {
        this.formats = [];
    }
};
