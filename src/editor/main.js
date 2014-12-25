/*jshint scripturl: true */
(function(f, define){
    define([ "../kendo.combobox", "../kendo.dropdownlist", "../kendo.window", "../kendo.colorpicker" ], f);
})(function(){

(function($,undefined) {

    // Imports ================================================================
    var kendo = window.kendo,
        Class = kendo.Class,
        Widget = kendo.ui.Widget,
        os = kendo.support.mobileOS,
        browser = kendo.support.browser,
        extend = $.extend,
        proxy = $.proxy,
        deepExtend = kendo.deepExtend,
        NS = ".kendoEditor",
        keys = kendo.keys;

    // options can be: template (as string), cssClass, title, defaultValue
    var ToolTemplate = Class.extend({
        init: function(options) {
            this.options = options;
        },

        getHtml: function() {
            var options = this.options;
            return kendo.template(options.template, {useWithBlock:false})(options);
        }
    });

    var EditorUtils = {
        editorWrapperTemplate:
            '<table cellspacing="4" cellpadding="0" class="k-widget k-editor k-header" role="presentation"><tbody>' +
                '<tr role="presentation"><td class="k-editor-toolbar-wrap" role="presentation"><ul class="k-editor-toolbar" role="toolbar" /></td></tr>' +
                '<tr><td class="k-editable-area" /></tr>' +
            '</tbody></table>',

        buttonTemplate:
            '<a href="" role="button" class="k-tool"' +
            '#= data.popup ? " data-popup" : "" #' +
            ' unselectable="on" title="#= data.title #"><span unselectable="on" class="k-tool-icon #= data.cssClass #">#= data.title #</span></a>',

        colorPickerTemplate:
            '<div class="k-colorpicker #= data.cssClass #" />',

        comboBoxTemplate:
            '<select title="#= data.title #" class="#= data.cssClass #" />',

        dropDownListTemplate:
            '<span class="k-editor-dropdown"><select title="#= data.title #" class="#= data.cssClass #" /></span>',

        separatorTemplate:
            '<span class="k-separator" />',

        formatByName: function(name, format) {
            for (var i = 0; i < format.length; i++) {
                if ($.inArray(name, format[i].tags) >= 0) {
                    return format[i];
                }
            }
        },

        registerTool: function(toolName, tool) {
            var toolOptions = tool.options;

            if (toolOptions && toolOptions.template) {
                toolOptions.template.options.cssClass = "k-" + toolName;
            }

            if (!tool.name) {
                tool.options.name = toolName;
                tool.name = toolName.toLowerCase();
            }

            Editor.defaultTools[toolName] = tool;
        },

        registerFormat: function(formatName, format) {
            Editor.fn.options.formats[formatName] = format;
        }
    };

    var messages = {
        bold: "Bold",
        italic: "Italic",
        underline: "Underline",
        strikethrough: "Strikethrough",
        superscript: "Superscript",
        subscript: "Subscript",
        justifyCenter: "Center text",
        justifyLeft: "Align text left",
        justifyRight: "Align text right",
        justifyFull: "Justify",
        insertUnorderedList: "Insert unordered list",
        insertOrderedList: "Insert ordered list",
        indent: "Indent",
        outdent: "Outdent",
        createLink: "Insert hyperlink",
        unlink: "Remove hyperlink",
        insertImage: "Insert image",
        insertFile: "Insert file",
        insertHtml: "Insert HTML",
        viewHtml: "View HTML",
        fontName: "Select font family",
        fontNameInherit: "(inherited font)",
        fontSize: "Select font size",
        fontSizeInherit: "(inherited size)",
        formatBlock: "Format",
        formatting: "Format",
        foreColor: "Color",
        backColor: "Background color",
        style: "Styles",
        emptyFolder: "Empty Folder",
        uploadFile: "Upload",
        orderBy: "Arrange by:",
        orderBySize: "Size",
        orderByName: "Name",
        invalidFileType: "The selected file \"{0}\" is not valid. Supported file types are {1}.",
        deleteFile: 'Are you sure you want to delete "{0}"?',
        overwriteFile: 'A file with name "{0}" already exists in the current directory. Do you want to overwrite it?',
        directoryNotFound: "A directory with this name was not found.",
        imageWebAddress: "Web address",
        imageAltText: "Alternate text",
        imageWidth: "Width (px)",
        imageHeight: "Height (px)",
        fileWebAddress: "Web address",
        fileTitle: "Title",
        linkWebAddress: "Web address",
        linkText: "Text",
        linkToolTip: "ToolTip",
        linkOpenInNewWindow: "Open link in new window",
        dialogUpdate: "Update",
        dialogInsert: "Insert",
        dialogCancel: "Cancel",
        createTable: "Create table",
        createTableHint: "Create a {0} x {1} table",
        addColumnLeft: "Add column on the left",
        addColumnRight: "Add column on the right",
        addRowAbove: "Add row above",
        addRowBelow: "Add row below",
        deleteRow: "Delete row",
        deleteColumn: "Delete column"
    };

    var supportedBrowser = !os || (os.ios && os.flatVersion >= 500) || (!os.ios && typeof(document.documentElement.contentEditable) != 'undefined');

    var toolGroups = {
        basic: [ "bold", "italic", "underline" ],
        alignment: [ "justifyLeft", "justifyCenter", "justifyRight" ],
        lists: [ "insertUnorderedList", "insertOrderedList" ],
        indenting: [ "indent", "outdent" ],
        links: [ "createLink", "unlink" ],
        tables: [ "createTable", "addColumnLeft", "addColumnRight", "addRowAbove", "addRowBelow", "deleteRow", "deleteColumn" ]
    };

    var Editor = Widget.extend({
        init: function (element, options) {
            var that = this,
                value,
                editorNS = kendo.ui.editor,
                toolbarContainer,
                toolbarOptions,
                type;

            /* suppress initialization in mobile webkit devices (w/o proper contenteditable support) */
            if (!supportedBrowser) {
                return;
            }

            Widget.fn.init.call(that, element, options);

            that.options = deepExtend({}, that.options, options);

            element = that.element;

            type = editorNS.Dom.name(element[0]);

            element.closest("form").on("submit" + NS, function () {
                that.update();
            });

            toolbarOptions = extend({}, that.options);
            toolbarOptions.editor = that;

            if (type == "textarea") {
                that._wrapTextarea();

                toolbarContainer = that.wrapper.find(".k-editor-toolbar");

                if (element[0].id) {
                    toolbarContainer.attr("aria-controls", element[0].id);
                }
            } else {
                that.element.attr("contenteditable", true).addClass("k-widget k-editor k-editor-inline");

                toolbarOptions.popup = true;

                toolbarContainer = $('<ul class="k-editor-toolbar" role="toolbar" />').insertBefore(element);
            }

            that.toolbar = new editorNS.Toolbar(toolbarContainer[0], toolbarOptions);

            that.toolbar.bindTo(that);

            if (type == "textarea") {
                setTimeout(function () {
                    var heightStyle = that.wrapper[0].style.height;
                    var expectedHeight = parseInt(heightStyle, 10);
                    var actualHeight = that.wrapper.height();
                    if (heightStyle.indexOf("px") > 0 && !isNaN(expectedHeight) && actualHeight > expectedHeight) {
                        that.wrapper.height(expectedHeight - (actualHeight - expectedHeight));
                    }
                });
            }

            that._initializeContentElement(that);

            that.keyboard = new editorNS.Keyboard([
                new editorNS.TypingHandler(that),
                new editorNS.BackspaceHandler(that),
                new editorNS.SystemHandler(that)
            ]);

            that.clipboard = new editorNS.Clipboard(this);

            that.undoRedoStack = new editorNS.UndoRedoStack();

            if (options && options.value) {
                value = options.value;
            } else if (that.textarea) {
                // indented HTML introduces problematic ranges in IE
                value = element.val().replace(/[\r\n\v\f\t ]+/ig, " ");
            } else {
                value = element[0].innerHTML;
            }

            that.value(value);

            $(document)
                .on("mousedown", proxy(that._endTyping, that))
                .on("mouseup", proxy(that._mouseup, that));

            kendo.notify(that);
        },

        _endTyping: function() {
            var keyboard = this.keyboard;

            try {
                if (keyboard.isTypingInProgress()) {
                    keyboard.endTyping(true);

                    this.saveSelection();
                }
            } catch (e) { }
        },

        _selectionChange: function() {
            if (!browser.msie) {
                kendo.ui.editor.Dom.ensureTrailingBreaks(this.body);
            }

            this._selectionStarted = false;
            this.saveSelection();
            this.trigger("select", {});
        },

        _wrapTextarea: function() {
            var that = this,
                textarea = that.element,
                w = textarea[0].style.width,
                h = textarea[0].style.height,
                template = EditorUtils.editorWrapperTemplate,
                editorWrap = $(template).insertBefore(textarea).width(w).height(h),
                editArea = editorWrap.find(".k-editable-area");

            textarea.attr("autocomplete", "off")
                .appendTo(editArea).addClass("k-content k-raw-content").css("display", "none");

            that.textarea = textarea;
            that.wrapper = editorWrap;
        },

        _createContentElement: function(stylesheets) {
            var editor = this;
            var iframe, wnd, doc;
            var textarea = editor.textarea;
            var specifiedDomain = editor.options.domain;
            var domain = specifiedDomain || document.domain;
            var domainScript = "";
            var src = 'javascript:""';

            // automatically relax same-origin policy if document.domain != location.hostname,
            // or forcefully relax if options.domain is specified (for document.domain = document.domain scenario)
            if (specifiedDomain || domain != location.hostname) {
                // relax same-origin policy
                domainScript = "<script>document.domain=\"" + domain + "\"</script>";
                src = "javascript:document.write('" + domainScript + "')";
            }

            textarea.hide();

            iframe = $("<iframe />", { frameBorder: "0" })[0];

            $(iframe)
                .css("display", "")
                .addClass("k-content")
                .insertBefore(textarea);


            iframe.src = src;

            wnd = iframe.contentWindow || iframe;
            doc = wnd.document || iframe.contentDocument;

            $(iframe).one("load", function() {
                editor.toolbar.decorateFrom(doc.body);
            });

            doc.open();
            doc.write(
                "<!DOCTYPE html><html><head>" +
                "<meta charset='utf-8' />" +
                "<style>" +
                    "html,body{padding:0;margin:0;height:100%;min-height:100%;}" +
                    "body{font-size:12px;font-family:Verdana,Geneva,sans-serif;padding-top:1px;margin-top:-1px;" +
                    "word-wrap: break-word;-webkit-nbsp-mode: space;-webkit-line-break: after-white-space;" +
                    (kendo.support.isRtl(textarea) ? "direction:rtl;" : "") +
                    "}" +
                    "h1{font-size:2em;margin:.67em 0}h2{font-size:1.5em}h3{font-size:1.16em}h4{font-size:1em}h5{font-size:.83em}h6{font-size:.7em}" +
                    "p{margin:0 0 1em;padding:0 .2em}.k-marker{display:none;}.k-paste-container,.Apple-style-span{position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden}" +
                    "ul,ol{padding-left:2.5em}" +
                    "span{-ms-high-contrast-adjust:none;}" +
                    "a{color:#00a}" +
                    "code{font-size:1.23em}" +
                    "telerik\\3Ascript{display: none;}" +
                    ".k-table{table-layout:fixed;width:100%;border-spacing:0;margin: 0 0 1em;}" +
                    ".k-table td{min-width:1px;padding:.2em .3em;}" +
                    ".k-table,.k-table td{outline:0;border: 1px dotted #ccc;}" +
                    ".k-table p{margin:0;padding:0;}" +
                "</style>" +
                domainScript +
                "<script>(function(d,c){d[c]('header'),d[c]('article'),d[c]('nav'),d[c]('section'),d[c]('footer');})(document, 'createElement');</script>" +
                $.map(stylesheets, function(href){
                    return "<link rel='stylesheet' href='" + href + "'>";
                }).join("") +
                "</head><body autocorrect='off' contenteditable='true'></body></html>"
            );

            doc.close();

            return wnd;
        },

        _blur: function() {
            var textarea = this.textarea;
            var old = textarea ? textarea.val() : this._oldValue;
            var value = this.options.encoded ? this.encodedValue() : this.value();

            this.update();

            if (textarea) {
                textarea.trigger("blur");
            }

            if (value != old) {
                this.trigger("change");
            }
        },

        _initializeContentElement: function() {
            var editor = this;
            var doc;
            var blurTrigger;

            if (editor.textarea) {
                editor.window = editor._createContentElement(editor.options.stylesheets);
                doc = editor.document = editor.window.contentDocument || editor.window.document;
                editor.body = doc.body;

                blurTrigger = editor.window;

                $(doc).on("mouseup" + NS, proxy(editor._mouseup, editor));
            } else {
                editor.window = window;
                doc = editor.document = document;
                editor.body = editor.element[0];

                blurTrigger = editor.body;

                editor.toolbar.decorateFrom(editor.body);
            }

            $(blurTrigger).on("blur" + NS, proxy(this._blur, this));

            try {
                doc.execCommand("enableInlineTableEditing", null, false);
            } catch(e) { }

            if (kendo.support.touch) {
                $(doc).on("selectionchange" + NS, proxy(this._selectionChange, this))
                      .on("keydown" + NS, function() {
                          // necessary in iOS when touch events are bound to the page
                          if (kendo._activeElement() != doc.body) {
                              editor.window.focus();
                          }
                      });
            }

            $(editor.body)
                .on("keydown" + NS, function (e) {
                    var range;

                    if (e.keyCode === keys.F10) {
                        // Handling with timeout to avoid the default IE menu
                        setTimeout(proxy(editor.toolbar.focus, editor.toolbar), 100);

                        e.preventDefault();
                        return;
                    } else if (e.keyCode == keys.LEFT || e.keyCode == keys.RIGHT) {
                        // skip bom nodes when navigating with arrows
                        range = editor.getRange();
                        var left = e.keyCode == keys.LEFT;
                        var container = range[left ? "startContainer" : "endContainer"];
                        var offset = range[left ? "startOffset" : "endOffset"];
                        var direction = left ? -1 : 1;

                        if (left) {
                            offset -= 1;
                        }

                        if (offset + direction > 0 && container.nodeType == 3 && container.nodeValue[offset] == "\ufeff") {
                            range.setStart(container, offset + direction);
                            range.collapse(true);
                            editor.selectRange(range);
                        }
                    }

                    var toolName = editor.keyboard.toolFromShortcut(editor.toolbar.tools, e);

                    if (toolName) {
                        e.preventDefault();
                        if (!/^(undo|redo)$/.test(toolName)) {
                            editor.keyboard.endTyping(true);
                        }
                        editor.trigger("keydown", e);
                        editor.exec(toolName);
                        return false;
                    }

                    editor.keyboard.clearTimeout();

                    editor.keyboard.keydown(e);
                })
                .on("keyup" + NS, function (e) {
                    var selectionCodes = [8, 9, 33, 34, 35, 36, 37, 38, 39, 40, 40, 45, 46];

                    if ($.inArray(e.keyCode, selectionCodes) > -1 || (e.keyCode == 65 && e.ctrlKey && !e.altKey && !e.shiftKey)) {
                        editor._selectionChange();
                    }

                    editor.keyboard.keyup(e);
                })
                .on("mousedown" + NS, function(e) {
                    editor._selectionStarted = true;

                    // handle middle-click and ctrl-click on links
                    if (browser.gecko) {
                        return;
                    }

                    var target = $(e.target);

                    if ((e.which == 2 || (e.which == 1 && e.ctrlKey)) &&
                        target.is("a[href]")) {
                        window.open(target.attr("href"), "_new");
                    }
                })
                .on("click" + NS, function(e) {
                    var dom = kendo.ui.editor.Dom, range;

                    if (dom.name(e.target) === "img") {
                        range = editor.createRange();
                        range.selectNode(e.target);
                        editor.selectRange(range);
                    }
                })
                .on("cut" + NS + " paste" + NS, function (e) {
                    editor.clipboard["on" + e.type](e);
                })
                .on("focusin" + NS, function() {
                    $(this).addClass("k-state-active");
                    editor.toolbar.show();
                })
                .on("focusout" + NS, function() {
                    setTimeout(function() {
                        var active = kendo._activeElement();
                        var body = editor.body;
                        var toolbar = editor.toolbar;

                        if (active != body && !$.contains(body, active) && !$(active).is(".k-editortoolbar-dragHandle") && !toolbar.focused()) {
                            $(body).removeClass("k-state-active");
                            toolbar.hide();
                        }
                    }, 10);
                });
        },

        _mouseup: function() {
            var that = this;

            if (that._selectionStarted) {
                setTimeout(function() {
                    that._selectionChange();
                }, 1);
            }
        },


        refresh: function() {
            var that = this;

            if (that.textarea) {
                // preserve updated value before re-initializing
                // don't use update() to prevent the editor from encoding the content too early
                that.textarea.val(that.value());
                that.wrapper.find("iframe").remove();
                that._initializeContentElement(that);
                that.value(that.textarea.val());
            }
        },

        events: [
            "select",
            "change",
            "execute",
            "error",
            "paste",
            "keydown",
            "keyup"
        ],

        options: {
            name: "Editor",
            messages: messages,
            formats: {},
            encoded: true,
            domain: null,
            serialization: {
                entities: true,
                scripts: false
            },
            stylesheets: [],
            dialogOptions: {
                modal: true, resizable: false, draggable: true,
                animation: false
            },
            fontName: [
                { text: "Arial", value: "Arial,Helvetica,sans-serif" },
                { text: "Courier New", value: "'Courier New',Courier,monospace" },
                { text: "Georgia", value: "Georgia,serif" },
                { text: "Impact", value: "Impact,Charcoal,sans-serif" },
                { text: "Lucida Console", value: "'Lucida Console',Monaco,monospace" },
                { text: "Tahoma", value: "Tahoma,Geneva,sans-serif" },
                { text: "Times New Roman", value: "'Times New Roman',Times,serif" },
                { text: "Trebuchet MS", value: "'Trebuchet MS',Helvetica,sans-serif" },
                { text: "Verdana", value: "Verdana,Geneva,sans-serif" }
            ],
            fontSize: [
                { text: "1 (8pt)",  value: "xx-small" },
                { text: "2 (10pt)", value: "x-small" },
                { text: "3 (12pt)", value: "small" },
                { text: "4 (14pt)", value: "medium" },
                { text: "5 (18pt)", value: "large" },
                { text: "6 (24pt)", value: "x-large" },
                { text: "7 (36pt)", value: "xx-large" }
            ],
            formatBlock: [
                { text: "Paragraph", value: "p" },
                { text: "Quotation", value: "blockquote" },
                { text: "Heading 1", value: "h1" },
                { text: "Heading 2", value: "h2" },
                { text: "Heading 3", value: "h3" },
                { text: "Heading 4", value: "h4" },
                { text: "Heading 5", value: "h5" },
                { text: "Heading 6", value: "h6" }
            ],
            tools: [].concat.call(
                ["formatting"],
                toolGroups.basic,
                toolGroups.alignment,
                toolGroups.lists,
                toolGroups.indenting,
                toolGroups.links,
                ["insertImage"],
                toolGroups.tables
            )
        },

        destroy: function() {
            var that = this;
            Widget.fn.destroy.call(that);

            $(that.window)
                .add(that.document)
                .add(that.body)
                .add(that.wrapper)
                .add(that.element.closest("form"))
                .off(NS);

            $(document).off("mousedown", proxy(that._endTyping, that))
                       .off("mouseup", proxy(that._mouseup, that));

            that._focusOutside();

            that.toolbar.destroy();

            kendo.destroy(that.wrapper);
        },

        _focusOutside: function () {
            // move focus outside the Editor, see https://github.com/telerik/kendo/issues/3673
            if (kendo.support.browser.msie && this.textarea) {
                var tempInput = $("<input style='position:absolute;left:-10px;top:-10px;width:1px;height:1px;font-size:0;border:0;' />").appendTo(document.body).focus();
                tempInput.blur().remove();
            }
        },

        state: function(toolName) {
            var tool = Editor.defaultTools[toolName];
            var finder = tool && (tool.options.finder || tool.finder);
            var RangeUtils = kendo.ui.editor.RangeUtils;
            var range, textNodes;

            if (finder) {
                range = this.getRange();

                textNodes = RangeUtils.textNodes(range);

                if (!textNodes.length && range.collapsed) {
                    textNodes = [range.startContainer];
                }

                return finder.getFormat ? finder.getFormat(textNodes) : finder.isFormatted(textNodes);
            }

            return false;
        },

        value: function (html) {
            var body = this.body,
                editorNS = kendo.ui.editor,
                dom = editorNS.Dom,
                currentHtml = editorNS.Serializer.domToXhtml(body, this.options.serialization);

            if (html === undefined) {
                return currentHtml;
            }

            if (html == currentHtml) {
                return;
            }

            editorNS.Serializer.htmlToDom(html, body);

            if (!browser.msie) {
                kendo.ui.editor.Dom.ensureTrailingBreaks(this.body);
            }

            this.selectionRestorePoint = null;
            this.update();

            this.toolbar.refreshTools();
        },

        saveSelection: function(range) {
            range = range || this.getRange();
            var container = range.commonAncestorContainer,
                body = this.body;

            if (container == body || $.contains(body, container)) {
                this.selectionRestorePoint = new kendo.ui.editor.RestorePoint(range);
            }
        },

        _focusBody: function() {
            var body = this.body;
            var iframe = this.wrapper && this.wrapper.find("iframe")[0];
            var documentElement = this.document.documentElement;
            var activeElement = kendo._activeElement();

            if (activeElement != body && activeElement != iframe) {
                var scrollTop = documentElement.scrollTop;
                body.focus();
                documentElement.scrollTop = scrollTop;
            }
        },

        restoreSelection: function() {
            this._focusBody();

            if (this.selectionRestorePoint) {
                this.selectRange(this.selectionRestorePoint.toRange());
            }
        },

        focus: function () {
            this.restoreSelection();
        },

        update: function (value) {
            value = value || this.options.encoded ? this.encodedValue() : this.value();

            if (this.textarea) {
                this.textarea.val(value);
            } else {
                this._oldValue = value;
            }
        },

        encodedValue: function () {
            return kendo.ui.editor.Dom.encode(this.value());
        },

        createRange: function (document) {
            return kendo.ui.editor.RangeUtils.createRange(document || this.document);
        },

        getSelection: function () {
            return kendo.ui.editor.SelectionUtils.selectionFromDocument(this.document);
        },

        selectRange: function(range) {
            this._focusBody();
            var selection = this.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            this.saveSelection(range);
        },

        getRange: function () {
            var selection = this.getSelection(),
                range = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : this.createRange(),
                doc = this.document;

            if (range.startContainer == doc && range.endContainer == doc && !range.startOffset && !range.endOffset) {
                range.setStart(this.body, 0);
                range.collapse(true);
            }

            return range;
        },

        selectedHtml: function() {
            return kendo.ui.editor.Serializer.domToXhtml(this.getRange().cloneContents());
        },

        paste: function (html, options) {
            this.clipboard.paste(html, options);
        },

        exec: function (name, params) {
            var that = this,
                range,
                tool, command = null;

            if (!name) {
                throw new Error("kendoEditor.exec(): `name` parameter cannot be empty");
            }

            name = name.toLowerCase();

            // restore selection
            if (!that.keyboard.isTypingInProgress()) {
                that.restoreSelection();
            }

            tool = that.toolbar.toolById(name);

            if (!tool) {
                // execute non-toolbar tool
                for (var id in Editor.defaultTools) {
                    if (id.toLowerCase() == name) {
                        tool = Editor.defaultTools[id];
                        break;
                    }
                }
            }

            if (tool) {
                range = that.getRange();

                if (tool.command) {
                    command = tool.command(extend({ range: range }, params));
                }

                that.trigger("execute", { name: name, command: command });

                if (/^(undo|redo)$/i.test(name)) {
                    that.undoRedoStack[name]();
                } else if (command) {
                    if (!command.managesUndoRedo) {
                        that.undoRedoStack.push(command);
                    }

                    command.editor = that;
                    command.exec();

                    if (command.async) {
                        command.change = proxy(that._selectionChange, that);
                        return;
                    }
                }

                that._selectionChange();
            }
        }
    });

    Editor.defaultTools = {
        undo: { options: { key: "Z", ctrl: true } },
        redo: { options: { key: "Y", ctrl: true } }
    };

    kendo.ui.plugin(Editor);

    var Tool = Class.extend({
        init: function(options) {
            this.options = options;
        },

        initialize: function(ui, options) {
            ui.attr({ unselectable: "on", title: options.title });
        },

        command: function (commandArguments) {
            return new this.options.command(commandArguments);
        },

        update: $.noop
    });

    Tool.exec = function (editor, name, value) {
        editor.exec(name, { value: value });
    };

    var FormatTool = Tool.extend({
        init: function (options) {
            Tool.fn.init.call(this, options);
        },

        command: function (commandArguments) {
            var that = this;
            return new kendo.ui.editor.FormatCommand(extend(commandArguments, {
                    formatter: that.options.formatter
                }));
        },

        update: function(ui, nodes) {
            var isFormatted = this.options.finder.isFormatted(nodes);

            ui.toggleClass("k-state-selected", isFormatted);
            ui.attr("aria-pressed", isFormatted);
        }
    });

    EditorUtils.registerTool("separator", new Tool({ template: new ToolTemplate({template: EditorUtils.separatorTemplate})}));

    // Exports ================================================================

    var bomFill = browser.msie && browser.version < 9 ? '\ufeff' : '';
    var emptyElementContent = '<br class="k-br" />';

    if (browser.msie) {
        if (browser.version < 10) {
            emptyElementContent = '\ufeff';
        } else if (browser.version < 11) {
            emptyElementContent = ' '; // allow up/down arrows to focus empty rows
        }
    }

    extend(kendo.ui, {
        editor: {
            ToolTemplate: ToolTemplate,
            EditorUtils: EditorUtils,
            Tool: Tool,
            FormatTool: FormatTool,
            _bomFill: bomFill,
            emptyElementContent: emptyElementContent
        }
    });

})(window.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
