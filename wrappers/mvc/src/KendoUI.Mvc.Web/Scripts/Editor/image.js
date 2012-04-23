function ImageCommand(options) {
    Command.call(this, options);
    this.async = true;
    var attributes;

    function insertImage(img, range) {
        if (attributes.src && attributes.src != 'http://') {
            if (!img) {
                img = dom.create(documentFromRange(range), 'img', attributes);
                img.onload = img.onerror = function () {
                    img.removeAttribute('complete');
                    img.removeAttribute('width');
                    img.removeAttribute('height');
                }
                range.deleteContents();
                range.insertNode(img);
                range.setStartAfter(img);
                range.setEndAfter(img);
                selectRange(range);
                return true;
            } else
                dom.attr(img, attributes);
        }

        return false;
    }

    this.redo = function () {
        var range = this.lockRange();
        if (!insertImage(RangeUtils.image(range), range))
            this.releaseRange(range);
    }

    this.exec = function () {
        var range = this.lockRange();

        var applied = false;

        var img = RangeUtils.image(range);

        var self = this;

        function apply(e) {
            attributes = {
                src: $('#t-editor-image-url', dialog.element).val(),
                alt: $('#t-editor-image-title', dialog.element).val()
            };

            applied = insertImage(img, range);

            close(e);

            if (self.change)
                self.change();
        }

        function close(e) {
            e.preventDefault();
            dialog.destroy();

            windowFromDocument(documentFromRange(range)).focus();
            if (!applied)
                self.releaseRange(range);
        }

        var fileBrowser = this.editor.fileBrowser;
        var showBrowser = fileBrowser && fileBrowser.selectUrl !== undefined;
        
        function activate() {  
            if (showBrowser) {
                new $t.imageBrowser($(this).find(".t-image-browser"), $.extend(fileBrowser, { apply: apply, element: self.editor.element, localization: self.editor.localization }));
            }
        }        
        
        var dialog = $t.window.create($.extend({ width: 750 }, this.editor.dialogOptions, {
            title: "Insert image",
            html: new $.telerik.stringBuilder()
                        .cat('<div class="t-editor-dialog">')                        
                            .catIf('<div class="t-image-browser"></div>', showBrowser)
                            .cat('<ol>')
                                .cat('<li class="t-form-text-row"><label for="t-editor-image-url">Web address</label><input type="text" class="t-input" id="t-editor-image-url"/></li>')
                                .cat('<li class="t-form-text-row"><label for="t-editor-image-title">Tooltip</label><input type="text" class="t-input" id="t-editor-image-title"/></li>')
                            .cat('</ol>')
                            .cat('<div class="t-button-wrapper">')
                                .cat('<button class="t-dialog-insert t-button">Insert</button>')
                                .cat('&nbsp;or&nbsp;')
                                .cat('<a href="#" class="t-dialog-close t-link">Close</a>')
                            .cat('</div>')
                        .cat('</div>')
                    .string(),
            onClose: close,
            onActivate: activate
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
        .toggleClass("t-imagebrowser", showBrowser)
        // IE < 8 returns absolute url if getAttribute is not used
        .find('#t-editor-image-url').val(img ? img.getAttribute('src', 2) : 'http://').end()
        .find('#t-editor-image-title').val(img ? img.alt : '').end()
        .show()
        .data('tWindow').center();

        $('#t-editor-image-url', dialog.element).focus().select();
    }
};