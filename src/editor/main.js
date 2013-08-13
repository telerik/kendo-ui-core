kendo_module({
    id: "editor",
    name: "Editor",
    category: "web",
    description: "Rich text editor component",
    depends: [ "combobox", "dropdownlist", "window", "colorpicker" ],
    features: [ {
        id: "editor-imagebrowser",
        name: "Image Browser",
        description: "Support for uploading and inserting images",
        depends: [ "imagebrowser" ]
    } ]
});

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
                '<tr role="presentation"><td class="k-editor-toolbar-wrap k-secondary" role="presentation"><ul class="k-editor-toolbar" role="toolbar" /></td></tr>' +
                '<tr><td class="k-editable-area" /></tr>' +
            '</tbody></table>',

        buttonTemplate:
            '<a href="" role="button" class="k-tool-icon #= data.cssClass #"' +
            '#= data.popup ? " data-popup" : "" #' +
            ' unselectable="on" title="#= data.title #">#= data.title #</a>',

        colorPickerTemplate:
            '<div class="k-colorpicker #= data.cssClass #" />',

        comboBoxTemplate:
            '<select title="#= data.title #" class="#= data.cssClass #" />',

        dropDownListTemplate:
            '<select title="#= data.title #" class="#= data.cssClass #" />',

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
        linkWebAddress: "Web address",
        linkText: "Text",
        linkToolTip: "ToolTip",
        linkOpenInNewWindow: "Open link in new window",
        dialogUpdate: "Update",
        dialogInsert: "Insert",
        dialogButtonSeparator: "or",
        dialogCancel: "Cancel",
        createTable: "Create table",
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

    var supportedElements = "textarea,main,article,section,aside,nav,header,footer,div".split(",");

    var Editor = Widget.extend({
        init: function (element, options) {
            var that = this,
                value,
                editorNS = kendo.ui.editor,
                toolbarContainer,
                toolbarOptions,
                type = editorNS.Dom.name(element);

            /* suppress initialization in mobile webkit devices (w/o proper contenteditable support) */
            if (!supportedBrowser) {
                return;
            }

            if ($.inArray(type, supportedElements) == -1) {
                return;
            }

            Widget.fn.init.call(that, element, options);

            that.options = deepExtend({}, that.options, options);

            element = that.element;

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
                that.element.addClass("k-widget k-editor k-editor-inline");

                toolbarOptions.popup = true;

                toolbarContainer = $('<ul class="k-editor-toolbar k-secondary" role="toolbar" />').insertBefore(element);
            }

            that.toolbar = new editorNS.Toolbar(toolbarContainer[0], toolbarOptions);

            that.toolbar.bindTo(that);

            that._initializeContentElement(that);

            that.keyboard = new editorNS.Keyboard([
                new editorNS.TypingHandler(that),
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
            var editor = this,
                iframe, wnd, doc,
                textarea = editor.textarea,
                rtlStyle = kendo.support.isRtl(textarea) ? "direction:rtl;" : "";

            textarea.hide();
            iframe = $("<iframe />", { src: 'javascript:""', frameBorder: "0" })
                            .css("display", "")
                            .addClass("k-content")
                            .insertBefore(textarea)[0];

            wnd = iframe.contentWindow || iframe;
            doc = wnd.document || iframe.contentDocument;

            $(iframe).one("load", function() {
                var styleTools = editor.toolbar.items().filter(".k-decorated");
                styleTools.kendoSelectBox("decorate", doc);
            });

            doc.open();
            doc.write(
                    "<!DOCTYPE html><html><head>" +
                    "<meta charset='utf-8' />" +
                    "<style>" +
                        "html,body{padding:0;margin:0;background:#fff;height:100%;min-height:100%;}" +
                        "body{font-size:12px;font-family:Verdana,Geneva,sans-serif;padding-top:1px;margin-top:-1px;" +
                        "word-wrap: break-word;-webkit-nbsp-mode: space;-webkit-line-break: after-white-space;" +
                        rtlStyle +
                        "}" +
                        "h1{font-size:2em;margin:.67em 0}h2{font-size:1.5em}h3{font-size:1.16em}h4{font-size:1em}h5{font-size:.83em}h6{font-size:.7em}" +
                        "p{margin:0 0 1em;padding:0 .2em}.k-marker{display:none;}.k-paste-container,.Apple-style-span{position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden}" +
                        "ul,ol{padding-left:2.5em}" +
                        "a{color:#00a}" +
                        "code{font-size:1.23em}" +
                        ".k-table{width:100%;border-spacing:0;margin: 0 0 1em;}" +
                        ".k-table td{min-width:1px;padding:.2em .3em;}" +
                        ".k-table,.k-table td{outline:0;border: 1px dotted #ccc;}" +
                        ".k-table p{margin:0;padding:0;}" +
                    "</style>" +
                    "<script>(function(d,c){d[c]('header'),d[c]('article'),d[c]('nav'),d[c]('section'),d[c]('footer');})(document, 'createElement');</script>" +
                    $.map(stylesheets, function(href){
                        return "<link rel='stylesheet' href='" + href + "'>";
                    }).join("") +
                    "</head><body autocorrect='off' contenteditable='true'></body></html>"
                );

            doc.close();

            return wnd;
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

                var styleTools = editor.toolbar.items().filter(".k-decorated");
                styleTools.kendoSelectBox("decorate", doc);
            }

            $(blurTrigger)
                .on("blur" + NS, function () {
                    var old = editor.textarea ? editor.textarea.val() : editor._oldValue;
                    var value = editor.encodedValue();

                    editor.update();

                    if (value != old) {
                        editor.trigger("change");
                    }
                });

            try {
                doc.execCommand("enableInlineTableEditing", null, false);
            } catch(e) { }

            if (kendo.support.touch) {
                $(doc).on("selectionchange" + NS, function() {
                    editor._selectionChange();
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
                    } else if (e.keyCode === keys.BACKSPACE) {
                        range = editor.getRange();

                        var ancestor,
                            emptyParagraphContent = browser.msie ? '' : '<br _moz_dirty="" />',
                            dom = kendo.ui.editor.Dom;

                        range.deleteContents();

                        ancestor = range.commonAncestorContainer;

                        if (dom.name(ancestor) === "p" && ancestor.innerHTML === "") {
                            ancestor.innerHTML = emptyParagraphContent;
                            range.setStart(ancestor, 0);
                            range.collapse(true);
                            editor.selectRange(range);
                        }
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
                        if (!/undo|redo/.test(toolName)) {
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

                    var target = $(e.target);

                    if (!browser.gecko && e.which == 2 && target.is("a[href]")) {
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

                        if (active != body && !$.contains(body, active) && !toolbar.focused()) {
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

            // preserve updated value before re-initializing
            // don't use update() to prevent the editor from encoding the content too early
            that.textarea.val(that.value());
            that.wrapper.find("iframe").remove();
            that._initializeContentElement(that);
            that.value(that.textarea.val());
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

            kendo.destroy(that.wrapper);
        },

        value: function (html) {
            var body = this.body,
                editorNS = kendo.ui.editor,
                dom = editorNS.Dom,
                currentHtml = editorNS.Serializer.domToXhtml(body);

            if (html === undefined) {
                return currentHtml;
            }

            if (html == currentHtml) {
                return;
            }

            var onerrorRe = /onerror\s*=\s*(?:'|")?([^'">\s]*)(?:'|")?/i;

            // handle null value passed as a parameter
            html = (html || "")
                // Some browsers do not allow setting CDATA sections through innerHTML so we encode them
                .replace(/<!\[CDATA\[(.*)?\]\]>/g, "<!--[CDATA[$1]]-->")
                // Encode script tags to avoid execution and lost content (IE)
                .replace(/<script([^>]*)>(.*)?<\/script>/ig, "<telerik:script $1>$2<\/telerik:script>")
                .replace(/<img([^>]*)>/ig, function(match) {
                    return match.replace(onerrorRe, "");
                })
                // <img>\s+\w+ creates invalid nodes after cut in IE
                .replace(/(<\/?img[^>]*>)[\r\n\v\f\t ]+/ig, "$1")
                // Add <br/>s to empty paragraphs in mozilla/chrome, to make them focusable
                .replace(/<p([^>]*)>(\s*)?<\/p>/ig, '<p$1>' + editorNS.emptyElementContent + '<\/p>');

            if (browser.msie && browser.version < 9) {
                // Internet Explorer removes comments from the beginning of the html
                html = "<br/>" + html;

                var originalSrc = "originalsrc",
                    originalHref = "originalhref";

                // IE < 8 makes href and src attributes absolute
                html = html.replace(/href\s*=\s*(?:'|")?([^'">\s]*)(?:'|")?/, originalHref + '="$1"');
                html = html.replace(/src\s*=\s*(?:'|")?([^'">\s]*)(?:'|")?/, originalSrc + '="$1"');

                body.innerHTML = html;
                dom.remove(body.firstChild);

                $(body).find("telerik\\:script,script,link,img,a").each(function () {
                    var node = this;
                    if (node[originalHref]) {
                        node.setAttribute("href", node[originalHref]);
                        node.removeAttribute(originalHref);
                    }
                    if (node[originalSrc]) {
                        node.setAttribute("src", node[originalSrc]);
                        node.removeAttribute(originalSrc);
                    }
                });
            } else {
                body.innerHTML = html;

                if (browser.msie) {
                    // having unicode characters creates denormalized DOM tree in IE9
                    dom.normalize(body);

                    setTimeout(function() {
                        // fix for IE9 OL bug -- https://connect.microsoft.com/IE/feedback/details/657695/ordered-list-numbering-changes-from-correct-to-0-0
                        var ols = body.getElementsByTagName("ol"), i, ol, originalStart;

                        for (i = 0; i < ols.length; i++) {
                            ol = ols[i];
                            originalStart = ol.getAttribute("start");

                            ol.setAttribute("start", 1);

                            if (originalStart) {
                                ol.setAttribute("start", originalStart);
                            } else {
                                ol.removeAttribute(originalStart);
                            }
                        }
                    }, 1);
                }
            }

            // add k-table class to all tables
            $("table", this.body).addClass("k-table");

            this.selectionRestorePoint = null;
            this.update();
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

            if (kendo._activeElement() != body) {
                body.focus();
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
                range = selection.rangeCount > 0 ? selection.getRangeAt(0) : this.createRange(),
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

        paste: function (html) {
            this.clipboard.paste(html);
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

                if (/undo|redo/i.test(name)) {
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

    extend(kendo.ui, {
        editor: {
            ToolTemplate: ToolTemplate,
            EditorUtils: EditorUtils,
            Tool: Tool,
            FormatTool: FormatTool,
            _bomFill: browser.msie && browser.version < 9 ? '\ufeff' : '',
            emptyElementContent: !browser.msie ? '<br _moz_dirty="" />' : browser.version < 9 ? '\ufeff' : ''
        }
    });

})(window.jQuery);
