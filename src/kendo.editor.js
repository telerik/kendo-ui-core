/*jshint scripturl: true */
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
            '<a href="" role="button" class="k-tool"' +
            '#= data.popup ? " data-popup" : "" #' +
            ' unselectable="on" title="#= data.title #"><span class="k-tool-icon #= data.cssClass #">#= data.title #</span></a>',

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
            var editor = this;
            var iframe, wnd, doc;
            var textarea = editor.textarea;
            var domain = document.domain;
            var src = 'javascript:""';

            if (domain != location.hostname) {
                // relax same-origin policy
                src = "javascript:document.write(" +
                          "'<script>document.domain=\"" + domain + "\"</script>'" +
                      ")";
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
                var styleTools = editor.toolbar.items().filter(".k-decorated");
                styleTools.kendoSelectBox("decorate", doc);
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
                    var value = editor.options.encoded ? editor.encodedValue() : editor.value();

                    editor.update();

                    if (value != old) {
                        editor.trigger("change");
                    }
                });

            try {
                doc.execCommand("enableInlineTableEditing", null, false);
            } catch(e) { }

            if (kendo.support.touch) {
                $(doc).on("selectionchange" + NS, function() { editor._selectionChange(); })
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

            that.toolbar.destroy();

            kendo.destroy(that.wrapper);
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

        _fillEmptyElements: function(body) {
            $(body).find("p").each(function() {
                if (/^\s*$/g.test($(this).text())) {
                    var node = this;
                    while (node.firstChild && node.firstChild.nodeType != 3) {
                        node = node.firstChild;
                    }

                    if (node.nodeType == 1 && node.tagName.toLowerCase() != "img") {
                        node.innerHTML = kendo.ui.editor.emptyElementContent;
                    }
                }
            });
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
                .replace(/(<\/?img[^>]*>)[\r\n\v\f\t ]+/ig, "$1");

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

            this._fillEmptyElements(this.body);

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
            var documentElement = this.document.documentElement;

            if (kendo._activeElement() != body) {
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

    extend(kendo.ui, {
        editor: {
            ToolTemplate: ToolTemplate,
            EditorUtils: EditorUtils,
            Tool: Tool,
            FormatTool: FormatTool,
            _bomFill: bomFill,
            emptyElementContent: bomFill || '<br _moz_dirty="" />'
        }
    });

})(window.jQuery);
(function($) {

var kendo = window.kendo,
    map = $.map,
    extend = $.extend,
    browser = kendo.support.browser,
    STYLE = "style",
    FLOAT = "float",
    CSSFLOAT = "cssFloat",
    STYLEFLOAT = "styleFloat",
    CLASS = "class",
    KMARKER = "k-marker";

function makeMap(items) {
    var obj = {},
        i, len;

    for (i = 0, len = items.length; i < len; i++) {
        obj[items[i]] = true;
    }
    return obj;
}

var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed".split(",")),
    nonListBlockElements = "div,p,h1,h2,h3,h4,h5,h6,address,applet,blockquote,button,center,dd,dir,dl,dt,fieldset,form,frameset,hr,iframe,isindex,map,menu,noframes,noscript,object,pre,script,table,tbody,td,tfoot,th,thead,tr,header,article,nav,footer,section,aside,main,figure,figcaption".split(","),
    blockElements = nonListBlockElements.concat(["ul","ol","li"]),
    block = makeMap(blockElements),
    inlineElements = "span,em,a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,strike,strong,sub,sup,textarea,tt,u,var,data,time,mark,ruby".split(","),
    inline = makeMap(inlineElements),
    fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected".split(","));

var normalize = function (node) {
    if (node.nodeType == 1) {
        node.normalize();
    }
};

if (browser.msie && browser.version >= 8) {
    normalize = function(parent) {
        if (parent.nodeType == 1 && parent.firstChild) {
            var prev = parent.firstChild,
                node = prev;

            while (true) {
                node = node.nextSibling;

                if (!node) {
                    break;
                }

                if (node.nodeType == 3 && prev.nodeType == 3) {
                    node.nodeValue = prev.nodeValue + node.nodeValue;
                    Dom.remove(prev);
                }

                prev = node;
            }
        }
    };
}

var whitespace = /^\s+$/,
    rgb = /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i,
    bom = /\ufeff/g,
    whitespaceOrBom = /^(\s+|\ufeff)$/,
    persistedScrollTop,
    cssAttributes =
           ("color,padding-left,padding-right,padding-top,padding-bottom," +
            "background-color,background-attachment,background-image,background-position,background-repeat," +
            "border-top-style,border-top-width,border-top-color," +
            "border-bottom-style,border-bottom-width,border-bottom-color," +
            "border-left-style,border-left-width,border-left-color," +
            "border-right-style,border-right-width,border-right-color," +
            "font-family,font-size,font-style,font-variant,font-weight,line-height"
           ).split(","),
    entityRe = /[\u00A0-\u2666<>\&]/g,
    entityTable = {
            34: 'quot', 38: 'amp', 39: 'apos', 60: 'lt', 62: 'gt',
            160: 'nbsp', 161: 'iexcl', 162: 'cent', 163: 'pound', 164: 'curren',
            165: 'yen', 166: 'brvbar', 167: 'sect', 168: 'uml', 169: 'copy',
            170: 'ordf', 171: 'laquo', 172: 'not', 173: 'shy', 174: 'reg',
            175: 'macr', 176: 'deg', 177: 'plusmn', 178: 'sup2', 179: 'sup3',
            180: 'acute', 181: 'micro', 182: 'para', 183: 'middot', 184: 'cedil',
            185: 'sup1', 186: 'ordm', 187: 'raquo', 188: 'frac14', 189: 'frac12',
            190: 'frac34', 191: 'iquest', 192: 'Agrave', 193: 'Aacute', 194: 'Acirc',
            195: 'Atilde', 196: 'Auml', 197: 'Aring', 198: 'AElig', 199: 'Ccedil',
            200: 'Egrave', 201: 'Eacute', 202: 'Ecirc', 203: 'Euml', 204: 'Igrave',
            205: 'Iacute', 206: 'Icirc', 207: 'Iuml', 208: 'ETH', 209: 'Ntilde',
            210: 'Ograve', 211: 'Oacute', 212: 'Ocirc', 213: 'Otilde', 214: 'Ouml',
            215: 'times', 216: 'Oslash', 217: 'Ugrave', 218: 'Uacute', 219: 'Ucirc',
            220: 'Uuml', 221: 'Yacute', 222: 'THORN', 223: 'szlig', 224: 'agrave',
            225: 'aacute', 226: 'acirc', 227: 'atilde', 228: 'auml', 229: 'aring',
            230: 'aelig', 231: 'ccedil', 232: 'egrave', 233: 'eacute', 234: 'ecirc',
            235: 'euml', 236: 'igrave', 237: 'iacute', 238: 'icirc', 239: 'iuml',
            240: 'eth', 241: 'ntilde', 242: 'ograve', 243: 'oacute', 244: 'ocirc',
            245: 'otilde', 246: 'ouml', 247: 'divide', 248: 'oslash', 249: 'ugrave',
            250: 'uacute', 251: 'ucirc', 252: 'uuml', 253: 'yacute', 254: 'thorn',
            255: 'yuml', 402: 'fnof', 913: 'Alpha', 914: 'Beta', 915: 'Gamma',
            916: 'Delta', 917: 'Epsilon', 918: 'Zeta', 919: 'Eta', 920: 'Theta',
            921: 'Iota', 922: 'Kappa', 923: 'Lambda', 924: 'Mu', 925: 'Nu',
            926: 'Xi', 927: 'Omicron', 928: 'Pi', 929: 'Rho', 931: 'Sigma',
            932: 'Tau', 933: 'Upsilon', 934: 'Phi', 935: 'Chi', 936: 'Psi',
            937: 'Omega', 945: 'alpha', 946: 'beta', 947: 'gamma', 948: 'delta',
            949: 'epsilon', 950: 'zeta', 951: 'eta', 952: 'theta', 953: 'iota',
            954: 'kappa', 955: 'lambda', 956: 'mu', 957: 'nu', 958: 'xi',
            959: 'omicron', 960: 'pi', 961: 'rho', 962: 'sigmaf', 963: 'sigma',
            964: 'tau', 965: 'upsilon', 966: 'phi', 967: 'chi', 968: 'psi',
            969: 'omega', 977: 'thetasym', 978: 'upsih', 982: 'piv', 8226: 'bull',
            8230: 'hellip', 8242: 'prime', 8243: 'Prime', 8254: 'oline', 8260: 'frasl',
            8472: 'weierp', 8465: 'image', 8476: 'real', 8482: 'trade', 8501: 'alefsym',
            8592: 'larr', 8593: 'uarr', 8594: 'rarr', 8595: 'darr', 8596: 'harr',
            8629: 'crarr', 8656: 'lArr', 8657: 'uArr', 8658: 'rArr', 8659: 'dArr',
            8660: 'hArr', 8704: 'forall', 8706: 'part', 8707: 'exist', 8709: 'empty',
            8711: 'nabla', 8712: 'isin', 8713: 'notin', 8715: 'ni', 8719: 'prod',
            8721: 'sum', 8722: 'minus', 8727: 'lowast', 8730: 'radic', 8733: 'prop',
            8734: 'infin', 8736: 'ang', 8743: 'and', 8744: 'or', 8745: 'cap',
            8746: 'cup', 8747: 'int', 8756: 'there4', 8764: 'sim', 8773: 'cong',
            8776: 'asymp', 8800: 'ne', 8801: 'equiv', 8804: 'le', 8805: 'ge',
            8834: 'sub', 8835: 'sup', 8836: 'nsub', 8838: 'sube', 8839: 'supe',
            8853: 'oplus', 8855: 'otimes', 8869: 'perp', 8901: 'sdot', 8968: 'lceil',
            8969: 'rceil', 8970: 'lfloor', 8971: 'rfloor', 9001: 'lang', 9002: 'rang',
            9674: 'loz', 9824: 'spades', 9827: 'clubs', 9829: 'hearts', 9830: 'diams',
            338: 'OElig', 339: 'oelig', 352: 'Scaron', 353: 'scaron', 376: 'Yuml',
            710: 'circ', 732: 'tilde', 8194: 'ensp', 8195: 'emsp', 8201: 'thinsp',
            8204: 'zwnj', 8205: 'zwj', 8206: 'lrm', 8207: 'rlm', 8211: 'ndash',
            8212: 'mdash', 8216: 'lsquo', 8217: 'rsquo', 8218: 'sbquo', 8220: 'ldquo',
            8221: 'rdquo', 8222: 'bdquo', 8224: 'dagger', 8225: 'Dagger', 8240: 'permil',
            8249: 'lsaquo', 8250: 'rsaquo', 8364: 'euro'
        };

var Dom = {
    block: block,
    inline: inline,

    findNodeIndex: function(node, skipText) {
        var i = 0;

        while (true) {
            node = node.previousSibling;

            if (!node) {
                break;
            }

            if (!(skipText && node.nodeType == 3)) {
                i++;
            }
        }

        return i;
    },

    isDataNode: function(node) {
        return node && node.nodeValue !== null && node.data !== null;
    },

    isAncestorOf: function(parent, node) {
        try {
            return !Dom.isDataNode(parent) && ($.contains(parent, Dom.isDataNode(node) ? node.parentNode : node) || node.parentNode == parent);
        } catch (e) {
            return false;
        }
    },

    isAncestorOrSelf: function(root, node) {
        return Dom.isAncestorOf(root, node) || root == node;
    },

    findClosestAncestor: function(root, node) {
        if (Dom.isAncestorOf(root, node)) {
            while (node && node.parentNode != root) {
                node = node.parentNode;
            }
        }

        return node;
    },

    getNodeLength: function(node) {
        return Dom.isDataNode(node) ? node.length : node.childNodes.length;
    },

    splitDataNode: function(node, offset) {
        var newNode = node.cloneNode(false),
            denormalizedText = "",
            iterator = node;

        while (iterator.nextSibling && iterator.nextSibling.nodeType == 3 && iterator.nextSibling.nodeValue) {
            denormalizedText += iterator.nextSibling.nodeValue;
            iterator = iterator.nextSibling;
        }

        node.deleteData(offset, node.length);
        newNode.deleteData(0, offset);
        newNode.nodeValue += denormalizedText;
        Dom.insertAfter(newNode, node);
    },

    attrEquals: function(node, attributes) {
        for (var key in attributes) {
            var value = node[key];

            if (key == FLOAT) {
                value = node[kendo.support.cssFloat ? CSSFLOAT : STYLEFLOAT];
            }

            if (typeof value == "object") {
                if (!Dom.attrEquals(value, attributes[key])) {
                    return false;
                }
            } else if (value != attributes[key]) {
                return false;
            }
        }

        return true;
    },

    blockParentOrBody: function(node) {
        return Dom.parentOfType(node, blockElements) || node.ownerDocument.body;
    },

    blockParents: function(nodes) {
        var blocks = [],
            i, len;

        for (i = 0, len = nodes.length; i < len; i++) {
            var block = Dom.parentOfType(nodes[i], Dom.blockElements);
            if (block && $.inArray(block, blocks) < 0) {
                blocks.push(block);
            }
        }

        return blocks;
    },

    windowFromDocument: function(document) {
        return document.defaultView || document.parentWindow;
    },

    normalize: normalize,
    blockElements: blockElements,
    nonListBlockElements: nonListBlockElements,
    inlineElements: inlineElements,
    empty: empty,
    fillAttrs: fillAttrs,

    toHex: function (color) {
        var matches = rgb.exec(color);

        if (!matches) {
            return color;
        }

        return "#" + map(matches.slice(1), function (x) {
            x = parseInt(x, 10).toString(16);
            return x.length > 1 ? x : "0" + x;
        }).join("");
    },

    encode: function (value) {
        return value.replace(entityRe, function(c) {
            var charCode = c.charCodeAt(0);
            var entity = entityTable[charCode];
            return entity ? '&'+entity+';' : c;
        });
    },

    stripBom: function(text) {
        return text.replace(bom, "");
    },

    insignificant: function(node) {
        var attr = node.attributes;

        return node.className == "k-marker" || (Dom.is(node, 'br') && (attr._moz_dirty || attr._moz_editor_bogus_node));
    },

    emptyNode: function(node) {
        var significantNodes = $.grep(node.childNodes, function(child) {
            if (Dom.is(child, 'br')) {
                return false;
            } else if (Dom.insignificant(child)) {
                return false;
            } else if (child.nodeType == 3 && whitespaceOrBom.test(child.nodeValue)) {
                return false;
            } else if (Dom.is(child, 'p') && Dom.emptyNode(child)) {
                return false;
            }

            return true;
        });

        return !significantNodes.length;
    },

    name: function (node) {
        return node.nodeName.toLowerCase();
    },

    significantChildNodes: function(node) {
        return $.grep(node.childNodes, function(child) {
            return child.nodeType != 3 || !Dom.isWhitespace(child);
        });
    },

    lastTextNode: function(node) {
        var result = null;

        if (node.nodeType == 3) {
            return node;
        }

        for (var child = node.lastChild; child; child = child.previousSibling) {
            result = Dom.lastTextNode(child);

            if (result) {
                return result;
            }
        }

        return result;
    },

    is: function (node, nodeName) {
        return Dom.name(node) == nodeName;
    },

    isMarker: function(node) {
        return node.className == KMARKER;
    },

    isWhitespace: function(node) {
        return whitespace.test(node.nodeValue);
    },

    isBlock: function(node) {
        return block[Dom.name(node)];
    },

    isEmpty: function(node) {
        return empty[Dom.name(node)];
    },

    isInline: function(node) {
        return inline[Dom.name(node)];
    },

    scrollContainer: function(doc) {
        var wnd = Dom.windowFromDocument(doc),
            scrollContainer = (wnd.contentWindow || wnd).document || wnd.ownerDocument || wnd;

        if (kendo.support.browser.webkit || scrollContainer.compatMode == 'BackCompat') {
            scrollContainer = scrollContainer.body;
        } else {
            scrollContainer = scrollContainer.documentElement;
        }

        return scrollContainer;
    },

    scrollTo: function (node) {
        var element = $(Dom.isDataNode(node) ? node.parentNode : node),
            wnd = Dom.windowFromDocument(node.ownerDocument),
            windowHeight = wnd.innerHeight,
            elementTop, elementHeight,
            scrollContainer = Dom.scrollContainer(node.ownerDocument);

        if (Dom.name(element[0]) == "br") {
            element = element.parent();
        }

        elementTop = element.offset().top;
        elementHeight = element[0].offsetHeight;

        if (elementHeight + elementTop > scrollContainer.scrollTop + windowHeight) {
            scrollContainer.scrollTop = elementHeight + elementTop - windowHeight;
        }
    },

    persistScrollTop: function(doc) {
        persistedScrollTop = Dom.scrollContainer(doc).scrollTop;
    },

    restoreScrollTop: function(doc) {
        Dom.scrollContainer(doc).scrollTop = persistedScrollTop;
    },

    insertAt: function (parent, newElement, position) {
        parent.insertBefore(newElement, parent.childNodes[position] || null);
    },

    insertBefore: function (newElement, referenceElement) {
        if (referenceElement.parentNode) {
            return referenceElement.parentNode.insertBefore(newElement, referenceElement);
        } else {
            return referenceElement;
        }
    },

    insertAfter: function (newElement, referenceElement) {
        return referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
    },

    remove: function (node) {
        node.parentNode.removeChild(node);
    },

    removeTextSiblings: function(node) {
        var parentNode = node.parentNode;

        while (node.nextSibling && node.nextSibling.nodeType == 3) {
            parentNode.removeChild(node.nextSibling);
        }

        while (node.previousSibling && node.previousSibling.nodeType == 3) {
            parentNode.removeChild(node.previousSibling);
        }
    },

    trim: function (parent) {
        for (var i = parent.childNodes.length - 1; i >= 0; i--) {
            var node = parent.childNodes[i];
            if (Dom.isDataNode(node)) {
                if (!Dom.stripBom(node.nodeValue).length) {
                    Dom.remove(node);
                }

                if (Dom.isWhitespace(node)) {
                    Dom.insertBefore(node, parent);
                }
            } else if (node.className != KMARKER) {
                Dom.trim(node);
                if (!node.childNodes.length && !Dom.isEmpty(node)) {
                    Dom.remove(node);
                }
            }
        }

        return parent;
    },

    closest: function(node, tag) {
        while (node && Dom.name(node) != tag) {
            node = node.parentNode;
        }

        return node;
    },

    sibling: function(node, direction) {
        do {
            node = node[direction];
        } while (node && node.nodeType != 1);

        return node;
    },

    next: function(node) {
        return Dom.sibling(node, "nextSibling");
    },

    prev: function(node) {
        return Dom.sibling(node, "previousSibling");
    },

    parentOfType: function (node, tags) {
        do {
            node = node.parentNode;
        } while (node && !(Dom.ofType(node, tags)));

        return node;
    },

    ofType: function (node, tags) {
        return $.inArray(Dom.name(node), tags) >= 0;
    },

    changeTag: function (referenceElement, tagName) {
        var newElement = Dom.create(referenceElement.ownerDocument, tagName),
            attributes = referenceElement.attributes,
            i, len, name, value, attribute;

        for (i = 0, len = attributes.length; i < len; i++) {
            attribute = attributes[i];
            if (attribute.specified) {
                // IE < 8 cannot set class or style via setAttribute
                name = attribute.nodeName;
                value = attribute.nodeValue;
                if (name == CLASS) {
                    newElement.className = value;
                } else if (name == STYLE) {
                    newElement.style.cssText = referenceElement.style.cssText;
                } else {
                    newElement.setAttribute(name, value);
                }
            }
        }

        while (referenceElement.firstChild) {
            newElement.appendChild(referenceElement.firstChild);
        }

        Dom.insertBefore(newElement, referenceElement);
        Dom.remove(referenceElement);
        return newElement;
    },

    editableParent: function(node) {
        while (node.nodeType == 3 || node.contentEditable !== 'true') {
            node = node.parentNode;
        }

        return node;
    },

    wrap: function (node, wrapper) {
        Dom.insertBefore(wrapper, node);
        wrapper.appendChild(node);
        return wrapper;
    },

    unwrap: function (node) {
        var parent = node.parentNode;
        while (node.firstChild) {
            parent.insertBefore(node.firstChild, node);
        }

        parent.removeChild(node);
    },

    create: function (document, tagName, attributes) {
        return Dom.attr(document.createElement(tagName), attributes);
    },

    attr: function (element, attributes) {
        attributes = extend({}, attributes);

        if (attributes && STYLE in attributes) {
            Dom.style(element, attributes.style);
            delete attributes.style;
        }

        for (var attr in attributes) {
            if (attributes[attr] === null) {
                element.removeAttribute(attr);
                delete attributes[attr];
            } else if (attr == "className") {
                element[attr] = attributes[attr];
            }
        }

        return extend(element, attributes);
    },

    style: function (node, value) {
        $(node).css(value || {});
    },

    unstyle: function (node, value) {
        for (var key in value) {
            if (key == FLOAT) {
                key = kendo.support.cssFloat ? CSSFLOAT : STYLEFLOAT;
            }

            node.style[key] = "";
        }

        if (node.style.cssText === "") {
            node.removeAttribute(STYLE);
        }
    },

    inlineStyle: function(document, name, attributes) {
        var span = $(Dom.create(document, name, attributes)),
            style;

        document.body.appendChild(span[0]);

        style = map(cssAttributes, function(value) {
            if (browser.msie && value == "line-height" && span.css(value) == "1px") {
                return "line-height:1.5";
            } else {
                return value + ":" + span.css(value);
            }
        }).join(";");

        span.remove();

        return style;
    },

    removeClass: function(node, classNames) {
        var className = " " + node.className + " ",
            classes = classNames.split(" "),
            i, len;

        for (i = 0, len = classes.length; i < len; i++) {
            className = className.replace(" " + classes[i] + " ", " ");
        }

        className = $.trim(className);

        if (className.length) {
            node.className = className;
        } else {
            node.removeAttribute(CLASS);
        }
    },

    commonAncestor: function () {
        var count = arguments.length,
            paths = [],
            minPathLength = Infinity,
            output = null,
            i, ancestors, node, first, j;

        if (!count) {
            return null;
        }

        if (count == 1) {
            return arguments[0];
        }

        for (i = 0; i < count; i++) {
            ancestors = [];
            node = arguments[i];
            while (node) {
                ancestors.push(node);
                node = node.parentNode;
            }
            paths.push(ancestors.reverse());
            minPathLength = Math.min(minPathLength, ancestors.length);
        }

        if (count == 1) {
            return paths[0][0];
        }

        for (i = 0; i < minPathLength; i++) {
            first = paths[0][i];

            for (j = 1; j < count; j++) {
                if (first != paths[j][i]) {
                    return output;
                }
            }

            output = first;
        }
        return output;
    },

    closestSplittableParent: function(nodes) {
        var result;

        if (nodes.length == 1) {
            result = Dom.parentOfType(nodes[0], ["ul","ol"]);
        } else {
            result = Dom.commonAncestor.apply(null, nodes);
        }

        if (!result) {
            result = Dom.parentOfType(nodes[0], ["p", "td"]) || nodes[0].ownerDocument.body;
        }

        if (Dom.isInline(result)) {
            result = Dom.blockParentOrBody(result);
        }

        var editableParents = map(nodes, Dom.editableParent);
        var editableAncestor = Dom.commonAncestor(editableParents)[0];

        if ($.contains(result, editableAncestor)) {
            result = editableAncestor;
        }

        return result;
    },

    closestEditable: function(node, types) {
        var closest = Dom.parentOfType(node, types);
        var editable = Dom.editableParent(node);

        if (closest && editable && $.contains(closest, editable)) {
            closest = editable;
        } else if (!closest && editable) {
            closest = editable;
        }

        return closest;
    },

    closestEditableOfType: function(node, types) {
        var editable = Dom.closestEditable(node, types);

        if (editable && Dom.ofType(editable, types)) {
            return editable;
        }
    },

    filter: function(tagName, nodes, invert) {
        var i = 0;
        var len = nodes.length;
        var result = [];
        var name;

        for (; i < len; i++) {
            name = Dom.name(nodes[i]);
            if ((!invert && name == tagName) || (invert && name != tagName)) {
                result.push(nodes[i]);
            }
        }

        return result;
    }
};

kendo.ui.editor.Dom = Dom;

})(window.kendo.jQuery);
(function($, undefined) {

// Imports ================================================================
var kendo = window.kendo;
var Editor = kendo.ui.editor;
var dom = Editor.Dom;
var extend = $.extend;

var fontSizeMappings = 'xx-small,x-small,small,medium,large,x-large,xx-large'.split(',');
var quoteRe = /"/g;
var brRe = /<br[^>]*>/i;
var pixelRe = /^\d+(\.\d*)?(px)?$/i;
var emptyPRe = /<p><\/p>/i;
var cssDeclaration = /([\w|\-]+)\s*:\s*([^;]+);?/i;
var sizzleAttr = /^sizzle-\d+/i;

var div = document.createElement("div");
div.innerHTML = " <hr>";
var supportsLeadingWhitespace = div.firstChild.nodeType === 3;
div = null;

var Serializer = {
    domToXhtml: function(root) {
        var result = [];
        var tagMap = {
            'telerik:script': {
                start: function (node) { result.push('<script'); attr(node); result.push('>'); },
                end: function () { result.push('</script>'); },
                skipEncoding: true
            },
            b: {
                start: function () { result.push('<strong>'); },
                end: function () { result.push('</strong>'); }
            },
            i: {
                start: function () { result.push('<em>'); },
                end: function () { result.push('</em>'); }
            },
            u: {
                start: function () { result.push('<span style="text-decoration:underline;">'); },
                end: function () { result.push('</span>'); }
            },
            iframe: {
                start: function (node) { result.push('<iframe'); attr(node); result.push('>'); },
                end: function () { result.push('</iframe>'); }
            },
            font: {
                start: function (node) {
                    result.push('<span style="');

                    var color = node.getAttribute('color');
                    var size = fontSizeMappings[node.getAttribute('size')];
                    var face = node.getAttribute('face');

                    if (color) {
                        result.push('color:');
                        result.push(dom.toHex(color));
                        result.push(';');
                    }

                    if (face) {
                        result.push('font-face:');
                        result.push(face);
                        result.push(';');
                    }

                    if (size) {
                        result.push('font-size:');
                        result.push(size);
                        result.push(';');
                    }

                    result.push('">');
                },
                end: function () {
                    result.push('</span>');
                }
            }
        };

        function styleAttr(cssText) {
            // In IE < 8 the style attribute does not return proper nodeValue
            var trim = $.trim;
            var css = trim(cssText).split(';');
            var i, length = css.length;
            var match;
            var property, value;

            for (i = 0, length = css.length; i < length; i++) {
                if (!css[i].length) {
                    continue;
                }

                match = cssDeclaration.exec(css[i]);

                // IE8 does not provide a value for 'inherit'
                if (!match) {
                    continue;
                }

                property = trim(match[1].toLowerCase());
                value = trim(match[2]);

                if (property == "font-size-adjust" || property == "font-stretch") {
                    continue;
                }

                if (property.indexOf('color') >= 0) {
                    value = dom.toHex(value);
                } else if (property.indexOf('font') >= 0) {
                    value = value.replace(quoteRe, "'");
                } else if (/\burl\(/g.test(value)) {
                    value = value.replace(quoteRe, "");
                }

                result.push(property);
                result.push(':');
                result.push(value);
                result.push(';');
            }
        }

        function attr(node) {
            var specifiedAttributes = [];
            var attributes = node.attributes;
            var attribute, i, l;
            var name, value, specified;

            if (dom.is(node, 'img')) {
                var width = node.style.width,
                    height = node.style.height,
                    $node = $(node);

                if (width && pixelRe.test(width)) {
                    $node.attr('width', parseInt(width, 10));
                    dom.unstyle(node, { width: undefined });
                }

                if (height && pixelRe.test(height)) {
                    $node.attr('height', parseInt(height, 10));
                    dom.unstyle(node, { height: undefined });
                }
            }

            for (i = 0, l = attributes.length; i < l; i++) {
                attribute = attributes[i];

                name = attribute.nodeName;
                value = attribute.nodeValue;
                specified = attribute.specified;

                // In IE < 8 the 'value' attribute is not returned as 'specified'. The same goes for type="text"
                if (name == 'value' && 'value' in node && node.value) {
                    specified = true;
                } else if (name == 'type' && value == 'text') {
                    specified = true;
                } else if (name == "class" && !value) {
                    specified = false;
                } else if (sizzleAttr.test(name)) {
                    specified = false;
                } else if (name == 'complete') {
                    specified = false;
                } else if (name == 'altHtml') {
                    specified = false;
                } else if (name.indexOf('_moz') >= 0) {
                    specified = false;
                }

                if (specified) {
                    specifiedAttributes.push(attribute);
                }
            }

            if (!specifiedAttributes.length) {
                return;
            }

            specifiedAttributes.sort(function (a, b) {
                return a.nodeName > b.nodeName ? 1 : a.nodeName < b.nodeName ? -1 : 0;
            });

            for (i = 0, l = specifiedAttributes.length; i < l; i++) {
                attribute = specifiedAttributes[i];
                name = attribute.nodeName;
                value = attribute.nodeValue;

                if (name.toLowerCase() == "contenteditable" && (dom.is(node, "table") || dom.is(node, "td"))) {
                    continue;
                }

                if (name == "class" && value == "k-table") {
                    continue;
                }

                result.push(' ');
                result.push(name);
                result.push('="');

                if (name == 'style') {
                    styleAttr(value || node.style.cssText);
                } else if (name == 'src' || name == 'href') {
                    result.push(node.getAttribute(name, 2));
                } else {
                    result.push(dom.fillAttrs[name] ? name : value);
                }

                result.push('"');
            }
        }

        function children(node, skip, skipEncoding) {
            for (var childNode = node.firstChild; childNode; childNode = childNode.nextSibling) {
                child(childNode, skip, skipEncoding);
            }
        }

        function text(node) {
            return node.nodeValue.replace(/\ufeff/g, "");
        }

        function child(node, skip, skipEncoding) {
            var nodeType = node.nodeType,
                tagName, mapper,
                parent, value, previous;

            if (nodeType == 1) {
                tagName = dom.name(node);

                if (!tagName || dom.insignificant(node)) {
                    return;
                }

                if (dom.isInline(node) && node.childNodes.length == 1 && node.firstChild.nodeType == 3&&  !text(node.firstChild)) {
                    return;
                }

                mapper = tagMap[tagName];

                if (mapper) {
                    mapper.start(node);
                    children(node, false, mapper.skipEncoding);
                    mapper.end(node);
                    return;
                }

                result.push('<');
                result.push(tagName);

                attr(node);

                if (dom.empty[tagName]) {
                    result.push(' />');
                } else {
                    result.push('>');
                    children(node, skip || dom.is(node, 'pre'));
                    result.push('</');
                    result.push(tagName);
                    result.push('>');
                }
            } else if (nodeType == 3) {
                value = text(node);

                if (!skip && supportsLeadingWhitespace) {
                    parent = node.parentNode;
                    previous = node.previousSibling;

                    if (!previous) {
                         previous = (dom.isInline(parent) ? parent : node).previousSibling;
                    }

                    if (!previous || previous.innerHTML === "" || dom.isBlock(previous)) {
                        value = value.replace(/^[\r\n\v\f\t ]+/, '');
                    }

                    value = value.replace(/ +/, ' ');
                }

                result.push(skipEncoding ? value : dom.encode(value));

            } else if (nodeType == 4) {
                result.push('<![CDATA[');
                result.push(node.data);
                result.push(']]>');
            } else if (nodeType == 8) {
                if (node.data.indexOf('[CDATA[') < 0) {
                    result.push('<!--');
                    result.push(node.data);
                    result.push('-->');
                } else {
                    result.push('<!');
                    result.push(node.data);
                    result.push('>');
                }
            }
        }

        if (root.childNodes.length == 1 && root.firstChild.nodeType == 3) {
            return dom.encode(text(root.firstChild).replace(/[\r\n\v\f\t ]+/, ' '));
        }

        children(root);

        result = result.join('');

        // if serialized dom contains only whitespace elements, consider it empty (required field validation)
        if (result.replace(brRe, "").replace(emptyPRe, "") === "") {
            return "";
        }

        return result;
    }

};

extend(Editor, {
    Serializer: Serializer
});

})(window.kendo.jQuery);
/*jshint boss: true */
(function($) {

    // Imports ================================================================
    var kendo = window.kendo,
        Class = kendo.Class,
        extend = $.extend,
        Editor = kendo.ui.editor,
        browser = kendo.support.browser,
        dom = Editor.Dom,
        findNodeIndex = dom.findNodeIndex,
        isDataNode = dom.isDataNode,
        findClosestAncestor = dom.findClosestAncestor,
        getNodeLength = dom.getNodeLength,
        normalize = dom.normalize;

var SelectionUtils = {
    selectionFromWindow: function(window) {
        if (!("getSelection" in window)) {
            return new W3CSelection(window.document);
        }

        return window.getSelection();
    },

    selectionFromRange: function(range) {
        var rangeDocument = RangeUtils.documentFromRange(range);
        return SelectionUtils.selectionFromDocument(rangeDocument);
    },

    selectionFromDocument: function(document) {
        return SelectionUtils.selectionFromWindow(dom.windowFromDocument(document));
    }
};

var W3CRange = Class.extend({
    init: function(doc) {
        $.extend(this, {
            ownerDocument: doc, /* not part of the spec; used when cloning ranges, traversing the dom and creating fragments */
            startContainer: doc,
            endContainer: doc,
            commonAncestorContainer: doc,
            startOffset: 0,
            endOffset: 0,
            collapsed: true
        });
    },

    // Positioning Methods
    setStart: function (node, offset) {
        this.startContainer = node;
        this.startOffset = offset;
        updateRangeProperties(this);
        fixIvalidRange(this, true);
    },

    setEnd: function (node, offset) {
        this.endContainer = node;
        this.endOffset = offset;
        updateRangeProperties(this);
        fixIvalidRange(this, false);
    },

    setStartBefore: function (node) {
        this.setStart(node.parentNode, findNodeIndex(node));
    },

    setStartAfter: function (node) {
        this.setStart(node.parentNode, findNodeIndex(node) + 1);
    },

    setEndBefore: function (node) {
        this.setEnd(node.parentNode, findNodeIndex(node));
    },

    setEndAfter: function (node) {
        this.setEnd(node.parentNode, findNodeIndex(node) + 1);
    },

    selectNode: function (node) {
        this.setStartBefore(node);
        this.setEndAfter(node);
    },

    selectNodeContents: function (node) {
        this.setStart(node, 0);
        this.setEnd(node, node[node.nodeType === 1 ? 'childNodes' : 'nodeValue'].length);
    },

    collapse: function (toStart) {
        var that = this;

        if (toStart) {
            that.setEnd(that.startContainer, that.startOffset);
        } else {
            that.setStart(that.endContainer, that.endOffset);
        }
    },

    // Editing Methods

    deleteContents: function () {
        var that = this,
            range = that.cloneRange();

        if (that.startContainer != that.commonAncestorContainer) {
            that.setStartAfter(findClosestAncestor(that.commonAncestorContainer, that.startContainer));
        }

        that.collapse(true);

        (function deleteSubtree(iterator) {
            while (iterator.next()) {
                if (iterator.hasPartialSubtree()) {
                    deleteSubtree(iterator.getSubtreeIterator());
                } else {
                    iterator.remove();
                }
            }
        })(new RangeIterator(range));
    },

    cloneContents: function () {
        // clone subtree
        var document = RangeUtils.documentFromRange(this);
        return (function cloneSubtree(iterator) {
                var node, frag = document.createDocumentFragment();

                while (node = iterator.next()) {
                    node = node.cloneNode(!iterator.hasPartialSubtree());

                    if (iterator.hasPartialSubtree()) {
                        node.appendChild(cloneSubtree(iterator.getSubtreeIterator()));
                    }

                    frag.appendChild(node);
                }

                return frag;
        })(new RangeIterator(this));
    },

    extractContents: function () {
        var that = this,
            range = that.cloneRange();

        if (that.startContainer != that.commonAncestorContainer) {
            that.setStartAfter(findClosestAncestor(that.commonAncestorContainer, that.startContainer));
        }

        that.collapse(true);

        var document = RangeUtils.documentFromRange(that);

        return (function extractSubtree(iterator) {
            var node, frag = document.createDocumentFragment();

            while (node = iterator.next()) {
                if (iterator.hasPartialSubtree()) {
                    node = node.cloneNode(false);
                    node.appendChild(extractSubtree(iterator.getSubtreeIterator()));
                } else {
                    iterator.remove(that.originalRange);
                }

                frag.appendChild(node);
            }

            return frag;
        })(new RangeIterator(range));
    },

    insertNode: function (node) {
        var that = this;

        if (isDataNode(that.startContainer)) {
            if (that.startOffset != that.startContainer.nodeValue.length) {
                dom.splitDataNode(that.startContainer, that.startOffset);
            }

            dom.insertAfter(node, that.startContainer);
        } else {
            dom.insertAt(that.startContainer, node, that.startOffset);
        }

        that.setStart(that.startContainer, that.startOffset);
    },

    cloneRange: function () {
        // fast copy
        return $.extend(new W3CRange(this.ownerDocument), {
            startContainer: this.startContainer,
            endContainer: this.endContainer,
            commonAncestorContainer: this.commonAncestorContainer,
            startOffset: this.startOffset,
            endOffset: this.endOffset,
            collapsed: this.collapsed,

            originalRange: this /* not part of the spec; used to update the original range when calling extractContents() on clones */
        });
    },

    // used for debug purposes
    toString: function () {
        var startNodeName = this.startContainer.nodeName,
            endNodeName = this.endContainer.nodeName;

        return [startNodeName == "#text" ? this.startContainer.nodeValue : startNodeName, '(', this.startOffset, ') : ',
                endNodeName == "#text" ? this.endContainer.nodeValue : endNodeName, '(', this.endOffset, ')'].join('');
    }
});

/* can be used in Range.compareBoundaryPoints if we need it one day */
function compareBoundaries(start, end, startOffset, endOffset) {
    if (start == end) {
        return endOffset - startOffset;
    }

    // end is child of start
    var container = end;
    while (container && container.parentNode != start) {
        container = container.parentNode;
    }

    if (container) {
        return findNodeIndex(container) - startOffset;
    }

    // start is child of end
    container = start;
    while (container && container.parentNode != end) {
        container = container.parentNode;
    }

    if (container) {
        return endOffset - findNodeIndex(container) - 1;
    }

    // deep traversal
    var root = dom.commonAncestor(start, end);
    var startAncestor = start;

    while (startAncestor && startAncestor.parentNode != root) {
        startAncestor = startAncestor.parentNode;
    }

    if (!startAncestor) {
        startAncestor = root;
    }

    var endAncestor = end;
    while (endAncestor && endAncestor.parentNode != root) {
        endAncestor = endAncestor.parentNode;
    }

    if (!endAncestor) {
        endAncestor = root;
    }

    if (startAncestor == endAncestor) {
        return 0;
    }

    return findNodeIndex(endAncestor) - findNodeIndex(startAncestor);
}

function fixIvalidRange(range, toStart) {
    function isInvalidRange(range) {
        try {
            return compareBoundaries(range.startContainer, range.endContainer, range.startOffset, range.endOffset) < 0;
        } catch (ex) {
            // range was initially invalid (e.g. when cloned from invalid range) - it must be fixed
            return true;
        }
    }

    if (isInvalidRange(range)) {
        if (toStart) {
            range.commonAncestorContainer = range.endContainer = range.startContainer;
            range.endOffset = range.startOffset;
        } else {
            range.commonAncestorContainer = range.startContainer = range.endContainer;
            range.startOffset = range.endOffset;
        }

        range.collapsed = true;
    }
}

function updateRangeProperties(range) {
    range.collapsed = range.startContainer == range.endContainer && range.startOffset == range.endOffset;

    var node = range.startContainer;
    while (node && node != range.endContainer && !dom.isAncestorOf(node, range.endContainer)) {
        node = node.parentNode;
    }

    range.commonAncestorContainer = node;
}

var RangeIterator = Class.extend({
    init: function(range) {
        $.extend(this, {
            range: range,
            _current: null,
            _next: null,
            _end: null
        });

        if (range.collapsed) {
            return;
        }

        var root = range.commonAncestorContainer;

        this._next = range.startContainer == root && !isDataNode(range.startContainer) ?
        range.startContainer.childNodes[range.startOffset] :
        findClosestAncestor(root, range.startContainer);

        this._end = range.endContainer == root && !isDataNode(range.endContainer) ?
        range.endContainer.childNodes[range.endOffset] :
        findClosestAncestor(root, range.endContainer).nextSibling;
    },

    hasNext: function () {
        return !!this._next;
    },

    next: function () {
        var that = this,
            current = that._current = that._next;
        that._next = that._current && that._current.nextSibling != that._end ?
        that._current.nextSibling : null;

        if (isDataNode(that._current)) {
            if (that.range.endContainer == that._current) {
                current = current.cloneNode(true);
                current.deleteData(that.range.endOffset, current.length - that.range.endOffset);
            }

            if (that.range.startContainer == that._current) {
                current = current.cloneNode(true);
                current.deleteData(0, that.range.startOffset);
            }
        }

        return current;
    },

    traverse: function (callback) {
        var that = this,
            current;

        function next() {
            that._current = that._next;
            that._next = that._current && that._current.nextSibling != that._end ? that._current.nextSibling : null;
            return that._current;
        }

        while (current = next()) {
            if (that.hasPartialSubtree()) {
                that.getSubtreeIterator().traverse(callback);
            } else {
                callback(current);
            }
        }

        return current;
    },

    remove: function (originalRange) {
        var that = this,
            inStartContainer = that.range.startContainer == that._current,
            inEndContainer = that.range.endContainer == that._current,
            start, end, delta;

        if (isDataNode(that._current) && (inStartContainer || inEndContainer)) {
            start = inStartContainer ? that.range.startOffset : 0;
            end = inEndContainer ? that.range.endOffset : that._current.length;
            delta = end - start;

            if (originalRange && (inStartContainer || inEndContainer)) {
                if (that._current == originalRange.startContainer && start <= originalRange.startOffset) {
                    originalRange.startOffset -= delta;
                }

                if (that._current == originalRange.endContainer && end <= originalRange.endOffset) {
                    originalRange.endOffset -= delta;
                }
            }

            that._current.deleteData(start, delta);
        } else {
            var parent = that._current.parentNode;

            if (originalRange && (that.range.startContainer == parent || that.range.endContainer == parent)) {
                var nodeIndex = findNodeIndex(that._current);

                if (parent == originalRange.startContainer && nodeIndex <= originalRange.startOffset) {
                    originalRange.startOffset -= 1;
                }

                if (parent == originalRange.endContainer && nodeIndex < originalRange.endOffset) {
                    originalRange.endOffset -= 1;
                }
            }

            dom.remove(that._current);
        }
    },

    hasPartialSubtree: function () {
        return !isDataNode(this._current) &&
        (dom.isAncestorOrSelf(this._current, this.range.startContainer) ||
            dom.isAncestorOrSelf(this._current, this.range.endContainer));
    },

    getSubtreeIterator: function () {
        var that = this,
            subRange = that.range.cloneRange();

        subRange.selectNodeContents(that._current);

        if (dom.isAncestorOrSelf(that._current, that.range.startContainer)) {
            subRange.setStart(that.range.startContainer, that.range.startOffset);
        }

        if (dom.isAncestorOrSelf(that._current, that.range.endContainer)) {
            subRange.setEnd(that.range.endContainer, that.range.endOffset);
        }

        return new RangeIterator(subRange);
    }
});

var W3CSelection = Class.extend({
    init: function(doc) {
        this.ownerDocument = doc;
        this.rangeCount = 1;
    },

    addRange: function (range) {
        var textRange = this.ownerDocument.body.createTextRange();

        // end container should be adopted first in order to prevent selection with negative length
        adoptContainer(textRange, range, false);
        adoptContainer(textRange, range, true);

        textRange.select();
    },

    removeAllRanges: function () {
        var selection = this.ownerDocument.selection;

        if (selection.type != "None") {
            selection.empty();
        }
    },

    getRangeAt: function () {
        var textRange,
            range = new W3CRange(this.ownerDocument),
            selection = this.ownerDocument.selection,
            element, commonAncestor;

        try {
            textRange = selection.createRange();
            element = textRange.item ? textRange.item(0) : textRange.parentElement();
            if (element.ownerDocument != this.ownerDocument) {
                return range;
            }
        } catch (ex) {
            return range;
        }

        if (selection.type == "Control") {
            range.selectNode(textRange.item(0));
        } else {
            commonAncestor = textRangeContainer(textRange);
            adoptEndPoint(textRange, range, commonAncestor, true);
            adoptEndPoint(textRange, range, commonAncestor, false);

            if (range.startContainer.nodeType == 9) {
                range.setStart(range.endContainer, range.startOffset);
            }

            if (range.endContainer.nodeType == 9) {
                range.setEnd(range.startContainer, range.endOffset);
            }

            if (textRange.compareEndPoints("StartToEnd", textRange) === 0) {
                range.collapse(false);
            }

            var startContainer = range.startContainer,
                endContainer = range.endContainer,
                body = this.ownerDocument.body;

            if (!range.collapsed && range.startOffset === 0 && range.endOffset == getNodeLength(range.endContainer) &&  // check for full body selection
                !(startContainer == endContainer && isDataNode(startContainer) && startContainer.parentNode == body)) { // but not when single textnode is selected
                var movedStart = false,
                    movedEnd = false;

                while (findNodeIndex(startContainer) === 0 && startContainer == startContainer.parentNode.firstChild && startContainer != body) {
                    startContainer = startContainer.parentNode;
                    movedStart = true;
                }

                while (findNodeIndex(endContainer) == getNodeLength(endContainer.parentNode) - 1 && endContainer == endContainer.parentNode.lastChild && endContainer != body) {
                    endContainer = endContainer.parentNode;
                    movedEnd = true;
                }

                if (startContainer == body && endContainer == body && movedStart && movedEnd) {
                    range.setStart(startContainer, 0);
                    range.setEnd(endContainer, getNodeLength(body));
                }
            }
        }

        return range;
    }
});

function textRangeContainer(textRange) {
    var left = textRange.duplicate(),
        right = textRange.duplicate();

    left.collapse(true);
    right.collapse(false);

    return dom.commonAncestor(textRange.parentElement(), left.parentElement(), right.parentElement());
}

function adoptContainer(textRange, range, start) {
    // find anchor node and offset
    var container = range[start ? "startContainer" : "endContainer"],
        offset = range[start ? "startOffset" : "endOffset"],
        textOffset = 0,
        isData = isDataNode(container),
        anchorNode = isData ? container : container.childNodes[offset] || null,
        anchorParent = isData ? container.parentNode : container,
        doc = range.ownerDocument,
        cursor = doc.body.createTextRange(),
        cursorNode;

    // visible data nodes need a text offset
    if (container.nodeType == 3 || container.nodeType == 4) {
        textOffset = offset;
    }

    if (!anchorParent) {
        anchorParent = doc.body;
    }

    if (anchorParent.nodeName.toLowerCase() == "img") {
        cursor.moveToElementText(anchorParent);
        cursor.collapse(false);
        textRange.setEndPoint(start ? "StartToStart" : "EndToStart", cursor);
    } else {
        // create a cursor element node to position range (since we can't select text nodes)
        cursorNode = anchorParent.insertBefore(dom.create(doc, "a"), anchorNode);

        cursor.moveToElementText(cursorNode);
        dom.remove(cursorNode);
        cursor[start ? "moveStart" : "moveEnd"]("character", textOffset);
        cursor.collapse(false);
        textRange.setEndPoint(start ? "StartToStart" : "EndToStart", cursor);
    }
}

function adoptEndPoint(textRange, range, commonAncestor, start) {
    var cursorNode = dom.create(range.ownerDocument, "a"),
        cursor = textRange.duplicate(),
        comparison = start ? "StartToStart" : "StartToEnd",
        result, parent, target,
        previous, next,
        args, index;

    cursorNode.innerHTML = "\ufeff";
    cursor.collapse(start);

    parent = cursor.parentElement();

    if (!dom.isAncestorOrSelf(commonAncestor, parent)) {
        parent = commonAncestor;
    }

    // detect range end points
    // insert cursorNode within the textRange parent and move the cursor until it gets outside of the textRange
    do {
        parent.insertBefore(cursorNode, cursorNode.previousSibling);
        cursor.moveToElementText(cursorNode);
    } while ((result = cursor.compareEndPoints(comparison, textRange)) > 0 && cursorNode.previousSibling);

    target = cursorNode.nextSibling;

    if (result == -1 && isDataNode(target)) {
        cursor.setEndPoint(start ? "EndToStart" : "EndToEnd", textRange);

        dom.remove(cursorNode);

        args = [target, cursor.text.length];
    } else {
        previous = !start && cursorNode.previousSibling;
        next = start && cursorNode.nextSibling;

        if (isDataNode(next)) {
            args = [next, 0];
        } else if (isDataNode(previous)) {
            args = [previous, previous.length];
        } else {
            index = findNodeIndex(cursorNode);

            if (parent.nextSibling && index == parent.childNodes.length - 1) {
                args = [parent.nextSibling, 0];
            } else {
                args = [parent, index];
            }
        }

        dom.remove(cursorNode);
    }

    range[start ? "setStart" : "setEnd"].apply(range, args);
}

var RangeEnumerator = Class.extend({
    init: function(range) {
        this.enumerate = function () {
            var nodes = [];

            function visit(node) {
                if (dom.is(node, "img") || (node.nodeType == 3 && (!dom.isWhitespace(node) || node.nodeValue == "\ufeff"))) {
                    nodes.push(node);
                } else {
                    node = node.firstChild;
                    while (node) {
                        visit(node);
                        node = node.nextSibling;
                    }
                }
            }

            new RangeIterator(range).traverse(visit);

            return nodes;
        };
    }
});

var RestorePoint = Class.extend({
    init: function(range, body) {
        var that = this;
        that.range = range;
        that.rootNode = RangeUtils.documentFromRange(range);
        that.body = body || that.getEditable(range);
        if (dom.name(that.body) != "body") {
            that.rootNode = that.body;
        }
        that.html = that.body.innerHTML;

        that.startContainer = that.nodeToPath(range.startContainer);
        that.endContainer = that.nodeToPath(range.endContainer);
        that.startOffset = that.offset(range.startContainer, range.startOffset);
        that.endOffset = that.offset(range.endContainer, range.endOffset);
    },

    index: function(node) {
        var result = 0,
            lastType = node.nodeType;

        while (node = node.previousSibling) {
            var nodeType = node.nodeType;

            if (nodeType != 3 || lastType != nodeType) {
                result ++;
            }

            lastType = nodeType;
        }

        return result;
    },

    getEditable: function(range) {
        var root = range.commonAncestorContainer;

        while (root && (root.nodeType == 3 || root.attributes && !root.attributes.contentEditable)) {
            root = root.parentNode;
        }

        return root;
    },

    restoreHtml: function() {
        this.body.innerHTML = this.html;
    },

    offset: function(node, value) {
        if (node.nodeType == 3) {
            while ((node = node.previousSibling) && node.nodeType == 3) {
                value += node.nodeValue.length;
            }
        }

        return value;
    },

    nodeToPath: function(node) {
        var path = [];

        while (node != this.rootNode) {
            path.push(this.index(node));
            node = node.parentNode;
        }

        return path;
    },

    toRangePoint: function(range, start, path, denormalizedOffset) {
        var node = this.rootNode,
            length = path.length,
            offset = denormalizedOffset;

        while (length--) {
            node = node.childNodes[path[length]];
        }

        while (node.nodeType == 3 && node.nodeValue.length < offset) {
            offset -= node.nodeValue.length;
            node = node.nextSibling;
        }

        range[start ? 'setStart' : 'setEnd'](node, offset);
    },

    toRange: function () {
        var that = this,
            result = that.range.cloneRange();

        that.toRangePoint(result, true, that.startContainer, that.startOffset);
        that.toRangePoint(result, false, that.endContainer, that.endOffset);

        return result;
    }

});

var Marker = Class.extend({
    init: function() {
        this.caret = null;
    },

    addCaret: function (range) {
        var that = this;

        that.caret = dom.create(RangeUtils.documentFromRange(range), 'span', { className: 'k-marker' });
        range.insertNode(that.caret);
        range.selectNode(that.caret);
        return that.caret;
    },

    removeCaret: function (range) {
        var that = this,
            previous = that.caret.previousSibling,
            startOffset = 0;

        if (previous) {
            startOffset = isDataNode(previous) ? previous.nodeValue.length : findNodeIndex(previous);
        }

        var container = that.caret.parentNode;
        var containerIndex = previous ? findNodeIndex(previous) : 0;

        dom.remove(that.caret);
        normalize(container);

        var node = container.childNodes[containerIndex];

        if (isDataNode(node)) {
            range.setStart(node, startOffset);
        } else if (node) {
            var textNode = dom.lastTextNode(node);
            if (textNode) {
                range.setStart(textNode, textNode.nodeValue.length);
            } else {
                range[previous ? 'setStartAfter' : 'setStartBefore'](node);
            }
        } else {
            if (!browser.msie && !container.innerHTML) {
                container.innerHTML = '<br _moz_dirty="" />';
            }

            range.selectNodeContents(container);
        }
        range.collapse(true);
    },

    add: function (range, expand) {
        var that = this;

        var collapsed = range.collapsed && !RangeUtils.isExpandable(range);
        var doc = RangeUtils.documentFromRange(range);

        if (expand && range.collapsed) {
            that.addCaret(range);
            range = RangeUtils.expand(range);
        }

        var rangeBoundary = range.cloneRange();

        rangeBoundary.collapse(false);
        that.end = dom.create(doc, 'span', { className: 'k-marker' });
        rangeBoundary.insertNode(that.end);

        rangeBoundary = range.cloneRange();
        rangeBoundary.collapse(true);
        that.start = that.end.cloneNode(true);
        rangeBoundary.insertNode(that.start);

        that._removeDeadMarkers(that.start, that.end);

        if (collapsed) {
            var bom = doc.createTextNode("\ufeff");
            dom.insertAfter(bom.cloneNode(), that.start);
            dom.insertBefore(bom, that.end);
        }

        range.setStartBefore(that.start);
        range.setEndAfter(that.end);

        normalize(range.commonAncestorContainer);

        return range;
    },

    _removeDeadMarkers: function(start, end) {
        if (start.previousSibling && start.previousSibling.nodeValue == "\ufeff") {
            dom.remove(start.previousSibling);
        }

        if (end.nextSibling && end.nextSibling.nodeValue == "\ufeff") {
            dom.remove(end.nextSibling);
        }
    },

    remove: function (range) {
        var that = this,
            start = that.start,
            end = that.end,
            shouldNormalizeStart,
            shouldNormalizeEnd,
            shouldNormalize;

        normalize(range.commonAncestorContainer);

        while (!start.nextSibling && start.parentNode) {
            start = start.parentNode;
        }

        while (!end.previousSibling && end.parentNode) {
            end = end.parentNode;
        }

        // merely accessing the siblings will solve range issues in IE
        shouldNormalizeStart = (start.previousSibling && start.previousSibling.nodeType == 3) &&
                               (start.nextSibling && start.nextSibling.nodeType == 3);

        shouldNormalizeEnd = (end.previousSibling && end.previousSibling.nodeType == 3) &&
                             (end.nextSibling && end.nextSibling.nodeType == 3);

        shouldNormalize = shouldNormalizeStart && shouldNormalizeEnd;

        start = start.nextSibling;
        end = end.previousSibling;

        var collapsed = false;
        var collapsedToStart = false;
        // collapsed range
        if (start == that.end) {
            collapsedToStart = !!that.start.previousSibling;
            start = end = that.start.previousSibling || that.end.nextSibling;
            collapsed = true;
        }

        dom.remove(that.start);
        dom.remove(that.end);

        if (!start || !end) {
            range.selectNodeContents(range.commonAncestorContainer);
            range.collapse(true);
            return;
        }

        var startOffset = collapsed ? isDataNode(start) ? start.nodeValue.length : start.childNodes.length : 0;
        var endOffset = isDataNode(end) ? end.nodeValue.length : end.childNodes.length;

        if (start.nodeType == 3) {
            while (start.previousSibling && start.previousSibling.nodeType == 3) {
                start = start.previousSibling;
                startOffset += start.nodeValue.length;
            }
        }

        if (end.nodeType == 3) {
            while (end.previousSibling && end.previousSibling.nodeType == 3) {
                end = end.previousSibling;
                endOffset += end.nodeValue.length;
            }
        }

        var startIndex = findNodeIndex(start), startParent = start.parentNode;
        var endIndex = findNodeIndex(end), endParent = end.parentNode;

        for (var startPointer = start; startPointer.previousSibling; startPointer = startPointer.previousSibling) {
            if (startPointer.nodeType == 3 && startPointer.previousSibling.nodeType == 3) {
                startIndex--;
            }
        }

        for (var endPointer = end; endPointer.previousSibling; endPointer = endPointer.previousSibling) {
            if (endPointer.nodeType == 3 && endPointer.previousSibling.nodeType == 3) {
                endIndex--;
            }
        }

        normalize(startParent);

        if (start.nodeType == 3) {
            start = startParent.childNodes[startIndex];
        }

        normalize(endParent);
        if (end.nodeType == 3) {
            end = endParent.childNodes[endIndex];
        }

        if (collapsed) {
            if (start.nodeType == 3) {
                range.setStart(start, startOffset);
            } else {
                range[collapsedToStart ? 'setStartAfter' : 'setStartBefore'](start);
            }

            range.collapse(true);

        } else {
            if (start.nodeType == 3) {
                range.setStart(start, startOffset);
            } else {
                range.setStartBefore(start);
            }

            if (end.nodeType == 3) {
                range.setEnd(end, endOffset);
            } else {
                range.setEndAfter(end);
            }
        }
        if (that.caret) {
            that.removeCaret(range);
        }
    }

});

var boundary = /[\u0009-\u000d]|\u0020|\u00a0|\ufeff|\.|,|;|:|!|\(|\)|\?/;

var RangeUtils = {
    nodes: function(range) {
        var nodes = RangeUtils.textNodes(range);
        if (!nodes.length) {
            range.selectNodeContents(range.commonAncestorContainer);
            nodes = RangeUtils.textNodes(range);
            if (!nodes.length) {
                nodes = dom.significantChildNodes(range.commonAncestorContainer);
            }
        }
        return nodes;
    },

    textNodes: function(range) {
        return new RangeEnumerator(range).enumerate();
    },

    documentFromRange: function(range) {
        var startContainer = range.startContainer;
        return startContainer.nodeType == 9 ? startContainer : startContainer.ownerDocument;
    },

    createRange: function(document) {
        if (browser.msie && browser.version < 9) {
            return new W3CRange(document);
        }

        return document.createRange();
    },

    selectRange: function(range) {
        var image = RangeUtils.image(range);
        if (image) {
            range.setStartAfter(image);
            range.setEndAfter(image);
        }
        var selection = SelectionUtils.selectionFromRange(range);
        selection.removeAllRanges();
        selection.addRange(range);
    },

    stringify: function(range) {
        return kendo.format(
            "{0}:{1} - {2}:{3}",
            dom.name(range.startContainer), range.startOffset,
            dom.name(range.endContainer), range.endOffset
        );
    },

    split: function(range, node, trim) {
        function partition(start) {
            var partitionRange = range.cloneRange();
            partitionRange.collapse(start);
            partitionRange[start ? 'setStartBefore' : 'setEndAfter'](node);
            var contents = partitionRange.extractContents();
            if (trim) {
                contents = dom.trim(contents);
            }
            dom[start ? 'insertBefore' : 'insertAfter'](contents, node);
        }
        partition(true);
        partition(false);
    },

    getMarkers: function(range) {
        var markers = [];

        new RangeIterator(range).traverse(function (node) {
            if (node.className == 'k-marker') {
                markers.push(node);
            }
        });

        return markers;
    },

    image: function (range) {
        var nodes = [];

        new RangeIterator(range).traverse(function (node) {
            if (dom.is(node, 'img')) {
                nodes.push(node);
            }
        });

        if (nodes.length == 1) {
            return nodes[0];
        }
    },

    expand: function (range) {
        var result = range.cloneRange();

        var startContainer = result.startContainer.childNodes[result.startOffset === 0 ? 0 : result.startOffset - 1];
        var endContainer = result.endContainer.childNodes[result.endOffset];

        if (!isDataNode(startContainer) || !isDataNode(endContainer)) {
            return result;
        }

        var beforeCaret = startContainer.nodeValue;
        var afterCaret = endContainer.nodeValue;

        if (!beforeCaret || !afterCaret) {
            return result;
        }

        var startOffset = beforeCaret.split('').reverse().join('').search(boundary);
        var endOffset = afterCaret.search(boundary);

        if (!startOffset || !endOffset) {
            return result;
        }

        endOffset = endOffset == -1 ? afterCaret.length : endOffset;
        startOffset = startOffset == -1 ? 0 : beforeCaret.length - startOffset;

        result.setStart(startContainer, startOffset);
        result.setEnd(endContainer, endOffset);

        return result;
    },

    isExpandable: function (range) {
        var node = range.startContainer;
        var rangeDocument = RangeUtils.documentFromRange(range);

        if (node == rangeDocument || node == rangeDocument.body) {
            return false;
        }

        var result = range.cloneRange();

        var value = node.nodeValue;
        if (!value) {
            return false;
        }

        var beforeCaret = value.substring(0, result.startOffset);
        var afterCaret = value.substring(result.startOffset);

        var startOffset = 0, endOffset = 0;

        if (beforeCaret) {
            startOffset = beforeCaret.split('').reverse().join('').search(boundary);
        }

        if (afterCaret) {
            endOffset = afterCaret.search(boundary);
        }

        return startOffset && endOffset;
    }
};

extend(Editor, {
    SelectionUtils: SelectionUtils,
    W3CRange: W3CRange,
    RangeIterator: RangeIterator,
    W3CSelection: W3CSelection,
    RangeEnumerator: RangeEnumerator,
    RestorePoint: RestorePoint,
    Marker: Marker,
    RangeUtils: RangeUtils
});

})(window.kendo.jQuery);
(function($) {

    // Imports ================================================================
    var kendo = window.kendo,
        Class = kendo.Class,
        editorNS = kendo.ui.editor,
        EditorUtils = editorNS.EditorUtils,
        registerTool = EditorUtils.registerTool,
        dom = editorNS.Dom,
        Tool = editorNS.Tool,
        ToolTemplate = editorNS.ToolTemplate,
        RestorePoint = editorNS.RestorePoint,
        Marker = editorNS.Marker,
        extend = $.extend;

var Command = Class.extend({
    init: function(options) {
        this.options = options;
        this.restorePoint = new RestorePoint(options.range);
        this.marker = new Marker();
        this.formatter = options.formatter;
    },

    getRange: function () {
        return this.restorePoint.toRange();
    },

    lockRange: function (expand) {
        return this.marker.add(this.getRange(), expand);
    },

    releaseRange: function (range) {
        this.marker.remove(range);
        this.editor.selectRange(range);
    },

    undo: function () {
        var point = this.restorePoint;
        point.restoreHtml();
        this.editor.selectRange(point.toRange());
    },

    redo: function () {
        this.exec();
    },

    createDialog: function (content, options) {
        var editor = this.editor;

        return $(content).appendTo(document.body)
            .kendoWindow(extend({}, editor.options.dialogOptions, options))
            .closest(".k-window").toggleClass("k-rtl", kendo.support.isRtl(editor.wrapper)).end();
    },

    exec: function () {
        var range = this.lockRange(true);
        this.formatter.editor = this.editor;
        this.formatter.toggle(range);
        this.releaseRange(range);
    }
});

var GenericCommand = Class.extend({
    init: function(startRestorePoint, endRestorePoint) {
        this.body = startRestorePoint.body;
        this.startRestorePoint = startRestorePoint;
        this.endRestorePoint = endRestorePoint;
    },

    redo: function () {
        this.body.innerHTML = this.endRestorePoint.html;
        this.editor.selectRange(this.endRestorePoint.toRange());
    },

    undo: function () {
        this.body.innerHTML = this.startRestorePoint.html;
        this.editor.selectRange(this.startRestorePoint.toRange());
    }
});

var InsertHtmlCommand = Command.extend({
    init: function(options) {
        Command.fn.init.call(this, options);

        this.managesUndoRedo = true;
    },

    exec: function() {
        var editor = this.editor;
        var options = this.options;
        var range = options.range;
        var body = editor.body;
        var startRestorePoint = new RestorePoint(range, body);
        var html = options.html || options.value || '';

        editor.selectRange(range);

        editor.clipboard.paste(html, options);

        if (options.postProcess) {
            options.postProcess(editor, editor.getRange());
        }

        var genericCommand = new GenericCommand(startRestorePoint, new RestorePoint(editor.getRange(), body));
        genericCommand.editor = editor;
        editor.undoRedoStack.push(genericCommand);

        editor.focus();
    }
});

var InsertHtmlTool = Tool.extend({
    initialize: function(ui, initOptions) {
        var editor = initOptions.editor,
            options = this.options,
            dataSource = options.items ? options.items : editor.options.insertHtml;

        new editorNS.SelectBox(ui, {
            dataSource: dataSource,
            dataTextField: "text",
            dataValueField: "value",
            change: function () {
                Tool.exec(editor, 'insertHtml', this.value());
            },
            title: editor.options.messages.insertHtml,
            highlightFirst: false
        });
    },

    command: function (commandArguments) {
        return new InsertHtmlCommand(commandArguments);
    },

    update: function(ui) {
        var selectbox = ui.data("kendoSelectBox") || ui.find("select").data("kendoSelectBox");
        selectbox.close();
        selectbox.value(selectbox.options.title);
    }
});

var UndoRedoStack = Class.extend({
    init: function() {
        this.stack = [];
        this.currentCommandIndex = -1;
    },

    push: function (command) {
        this.stack = this.stack.slice(0, this.currentCommandIndex + 1);
        this.currentCommandIndex = this.stack.push(command) - 1;
    },

    undo: function () {
        if (this.canUndo()) {
            this.stack[this.currentCommandIndex--].undo();
        }
    },

    redo: function () {
        if (this.canRedo()) {
            this.stack[++this.currentCommandIndex].redo();
        }
    },

    canUndo: function () {
        return this.currentCommandIndex >= 0;
    },

    canRedo: function () {
        return this.currentCommandIndex != this.stack.length - 1;
    }
});

var TypingHandler = Class.extend({
    init: function(editor) {
        this.editor = editor;
    },

    keydown: function (e) {
        var that = this,
            editor = that.editor,
            keyboard = editor.keyboard,
            isTypingKey = keyboard.isTypingKey(e),
            evt = extend($.Event(), e);

        that.editor.trigger("keydown", evt);

        if (evt.isDefaultPrevented()) {
            e.preventDefault();
        }

        if (!evt.isDefaultPrevented() && isTypingKey && !keyboard.isTypingInProgress()) {
            var range = editor.getRange();
            that.startRestorePoint = new RestorePoint(range);

            keyboard.startTyping(function () {
                editor.selectionRestorePoint = that.endRestorePoint = new RestorePoint(editor.getRange());
                var genericCommand = new GenericCommand(that.startRestorePoint, that.endRestorePoint);
                genericCommand.editor = editor;

                editor.undoRedoStack.push(genericCommand);
            });

            return true;
        }

        return false;
    },

    keyup: function (e) {
        var keyboard = this.editor.keyboard;

        this.editor.trigger("keyup", e);

        if (keyboard.isTypingInProgress()) {
            keyboard.endTyping();
            return true;
        }

        return false;
    }
});

var SystemHandler = Class.extend({
    init: function(editor) {
        this.editor = editor;
        this.systemCommandIsInProgress = false;
    },

    createUndoCommand: function () {
        var that = this;

        that.endRestorePoint = new RestorePoint(that.editor.getRange());
        var command = new GenericCommand(that.startRestorePoint, that.endRestorePoint);
        command.editor = that.editor;
        that.editor.undoRedoStack.push(command);
        that.startRestorePoint = that.endRestorePoint;
    },

    changed: function () {
        if (this.startRestorePoint) {
            return this.startRestorePoint.html != this.editor.body.innerHTML;
        }

        return false;
    },

    keydown: function (e) {
        var that = this,
            editor = that.editor,
            keyboard = editor.keyboard;

        if (keyboard.isModifierKey(e)) {

            if (keyboard.isTypingInProgress()) {
                keyboard.endTyping(true);
            }

            that.startRestorePoint = new RestorePoint(editor.getRange());
            return true;
        }

        if (keyboard.isSystem(e)) {
            that.systemCommandIsInProgress = true;

            if (that.changed()) {
                that.systemCommandIsInProgress = false;
                that.createUndoCommand();
            }

            return true;
        }

        return false;
    },

    keyup: function (e) {
        var that = this;

        if (that.systemCommandIsInProgress && that.changed()) {
            that.systemCommandIsInProgress = false;
            that.createUndoCommand(e);
            return true;
        }

        return false;
    }
});

var Keyboard = Class.extend({
    init: function(handlers) {
        this.handlers = handlers;
        this.typingInProgress = false;
    },

    isCharacter: function(keyCode) {
        return (keyCode >= 48 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 111) ||
               (keyCode >= 186 && keyCode <= 192) || (keyCode >= 219 && keyCode <= 222);
    },

    toolFromShortcut: function (tools, e) {
        var key = String.fromCharCode(e.keyCode),
            toolName,
            toolOptions;

        for (toolName in tools) {
            toolOptions = $.extend({ ctrl: false, alt: false, shift: false }, tools[toolName].options);

            if ((toolOptions.key == key || toolOptions.key == e.keyCode) &&
                toolOptions.ctrl == e.ctrlKey &&
                toolOptions.alt == e.altKey &&
                toolOptions.shift == e.shiftKey) {
                return toolName;
            }
        }
    },

    isTypingKey: function (e) {
        var keyCode = e.keyCode;
        return (this.isCharacter(keyCode) && !e.ctrlKey && !e.altKey) ||
               keyCode == 32 || keyCode == 13 || keyCode == 8 ||
               (keyCode == 46 && !e.shiftKey && !e.ctrlKey && !e.altKey);
    },

    isModifierKey: function (e) {
        var keyCode = e.keyCode;
        return (keyCode == 17 && !e.shiftKey && !e.altKey) ||
               (keyCode == 16 && !e.ctrlKey && !e.altKey) ||
               (keyCode == 18 && !e.ctrlKey && !e.shiftKey);
    },

    isSystem: function (e) {
        return e.keyCode == 46 && e.ctrlKey && !e.altKey && !e.shiftKey;
    },

    startTyping: function (callback) {
        this.onEndTyping = callback;
        this.typingInProgress = true;
    },

    stopTyping: function() {
        this.typingInProgress = false;
        if (this.onEndTyping) {
            this.onEndTyping();
        }
    },

    endTyping: function (force) {
        var that = this;
        that.clearTimeout();
        if (force) {
            that.stopTyping();
        } else {
            that.timeout = window.setTimeout($.proxy(that.stopTyping, that), 1000);
        }
    },

    isTypingInProgress: function () {
        return this.typingInProgress;
    },

    clearTimeout: function () {
        window.clearTimeout(this.timeout);
    },

    notify: function(e, what) {
        var i, handlers = this.handlers;

        for (i = 0; i < handlers.length; i++) {
            if (handlers[i][what](e)) {
                break;
            }
        }
    },

    keydown: function (e) {
        this.notify(e, 'keydown');
    },

    keyup: function (e) {
        this.notify(e, 'keyup');
    }
});

var Clipboard = Class.extend({
    init: function(editor) {
        this.editor = editor;
        this.cleaners = [
            new ScriptCleaner(),
            new MSWordFormatCleaner(),
            new WebkitFormatCleaner()
        ];
    },

    htmlToFragment: function(html) {
        var editor = this.editor,
            doc = editor.document,
            container = dom.create(doc, 'div'),
            fragment = doc.createDocumentFragment();

        container.innerHTML = html;

        while (container.firstChild) {
            fragment.appendChild(container.firstChild);
        }

        return fragment;
    },

    isBlock: function(html) {
        return (/<(div|p|ul|ol|table|h[1-6])/i).test(html);
    },

    _contentModification: function(before, after) {
        var that = this;
        var editor = that.editor;
        var range = editor.getRange();
        var startRestorePoint = new RestorePoint(range);

        dom.persistScrollTop(editor.document);

        before.call(that, editor, range);

        setTimeout(function() {
            after.call(that, editor, range);

            var endRestorePoint = new RestorePoint(editor.getRange());
            var genericCommand = new GenericCommand(startRestorePoint, endRestorePoint);
            genericCommand.editor = editor;
            editor.undoRedoStack.push(genericCommand);
            editor._selectionChange();
        });
    },

    _fixTagNesting: function(html) {
        var tags = /<(\/?)([a-z][a-z0-9]*)([^>]*)>/gi;
        var stack = [];
        var dom = editorNS.Dom;

        html = html.replace(tags, function(match, closing, tagName) {
            closing = !!closing;
            tagName = tagName.toLowerCase();

            var result = "";
            var inline = dom.inline[tagName];

            function closeLastTag() {
                result = "</" + stack.pop() + ">" + result;
            }

            if (closing) {
                if (!stack.length) {
                    return "";
                }

                if (stack[stack.length] != tagName) {
                    if (inline) {
                        return "";
                    }
                }

                return "</" + stack.pop() + ">";
            } else {
                if (!inline) {
                    while (dom.inline[stack[stack.length-1]]) {
                        closeLastTag();
                    }
                }

                stack.push(tagName);

                result += match;
            }

            return result;
        });

        while (stack.length) {
            html += "</" + stack.pop() + ">";
        }

        return html;
    },

    oncut: function() {
        this._contentModification($.noop, $.noop);
    },

    onpaste: function(e) {
        this._contentModification(
            function beforePaste(editor, range) {
                var clipboardNode = dom.create(editor.document, 'div', {
                        className:'k-paste-container',
                        innerHTML: "\ufeff"
                    });

                editor.body.appendChild(clipboardNode);

                if (editor.body.createTextRange) {
                    e.preventDefault();
                    var r = editor.createRange();
                    r.selectNodeContents(clipboardNode);
                    editor.selectRange(r);
                    var textRange = editor.body.createTextRange();
                    textRange.moveToElementText(clipboardNode);
                    $(editor.body).unbind('paste');
                    textRange.execCommand('Paste');
                    $(editor.body).bind('paste', $.proxy(this.onpaste, this));
                } else {
                    var clipboardRange = editor.createRange();
                    clipboardRange.selectNodeContents(clipboardNode);
                    editor.selectRange(clipboardRange);
                }

                range.deleteContents();
            },
            function afterPaste(editor, range) {
                var html = "", args = { html: "" }, containers;
                var browser = kendo.support.browser;

                editor.selectRange(range);

                containers = $(editor.body).children(".k-paste-container");

                containers.each(function() {
                    var lastChild = this.lastChild;

                    if (lastChild && dom.is(lastChild, 'br')) {
                        dom.remove(lastChild);
                    }

                    html += this.innerHTML;
                });

                containers.remove();

                html = html.replace(/\ufeff/g, "");

                if (browser.msie && browser.version < 9) {
                    html = this._fixTagNesting(html);
                }

                args.html = html;

                editor.trigger("paste", args);
                editor.clipboard.paste(args.html, { clean: true });
            }
        );
    },

    splittableParent: function(block, node) {
        var parentNode, body;

        if (block) {
            return dom.closestEditableOfType(node, ['p', 'ul', 'ol']) || node.parentNode;
        }

        parentNode = node.parentNode;
        body = node.ownerDocument.body;

        if (dom.isInline(parentNode)) {
            while (parentNode.parentNode != body && !dom.isBlock(parentNode.parentNode)) {
                parentNode = parentNode.parentNode;
            }
        }

        return parentNode;
    },

    paste: function (html, options) {
        var editor = this.editor,
            i, l;

        options = extend({ clean: false, split: true }, options);

        for (i = 0, l = this.cleaners.length; i < l; i++) {
            if (this.cleaners[i].applicable(html)) {
                html = this.cleaners[i].clean(html);
            }
        }

        if (options.clean) {
            // remove br elements which immediately precede block elements
            html = html.replace(/(<br>(\s|&nbsp;)*)+(<\/?(div|p|li|col|t))/ig, "$3");
            // remove empty inline elements
            html = html.replace(/<(a|span)[^>]*><\/\1>/ig, "");
        }

        // It is possible in IE to copy just <li> tags
        html = html.replace(/^<li/i, '<ul><li').replace(/li>$/g, 'li></ul>');

        var block = this.isBlock(html);

        editor.focus();
        var range = editor.getRange();
        range.deleteContents();

        if (range.startContainer == editor.document) {
            range.selectNodeContents(editor.body);
        }

        var marker = new Marker();
        var caret = marker.addCaret(range);

        var parent = this.splittableParent(block, caret);
        var unwrap = false;
        var splittable = parent != editor.body && !dom.is(parent, "td");

        if (options.split && splittable && (block || dom.isInline(parent))) {
            range.selectNode(caret);
            editorNS.RangeUtils.split(range, parent, true);
            unwrap = true;
        }

        var fragment = this.htmlToFragment(html);

        if (fragment.firstChild && fragment.firstChild.className === "k-paste-container") {
            var fragmentsHtml = [];
            for (i = 0, l = fragment.childNodes.length; i < l; i++) {
                fragmentsHtml.push(fragment.childNodes[i].innerHTML);
            }

            fragment = this.htmlToFragment(fragmentsHtml.join('<br />'));
        }

        $(fragment.childNodes)
            .filter("table").addClass("k-table").end()
            .find("table").addClass("k-table");

        range.insertNode(fragment);

        parent = this.splittableParent(block, caret);
        if (unwrap) {
            while (caret.parentNode != parent) {
                dom.unwrap(caret.parentNode);
            }

            dom.unwrap(caret.parentNode);
        }

        dom.normalize(range.commonAncestorContainer);
        caret.style.display = 'inline';
        dom.restoreScrollTop(editor.document);
        dom.scrollTo(caret);
        marker.removeCaret(range);
        editor.selectRange(range);
    }
});

var Cleaner = Class.extend({
    clean: function(html) {
        var that = this,
            replacements = that.replacements,
            i, l;

        for (i = 0, l = replacements.length; i < l; i += 2) {
            html = html.replace(replacements[i], replacements[i+1]);
        }

        return html;
    }
});

var ScriptCleaner = Cleaner.extend({
    init: function() {
        this.replacements = [
            /<(\/?)script([^>]*)>/i, "<$1telerik:script$2>"
        ];
    },

    applicable: function(html) {
        return (/<script[^>]*>/i).test(html);
    }
});

var MSWordFormatCleaner = Cleaner.extend({
    init: function() {
        this.replacements = [
            /<\?xml[^>]*>/gi, '',
            /<!--(.|\n)*?-->/g, '', /* comments */
            /&quot;/g, "'", /* encoded quotes (in attributes) */
            /(?:<br>&nbsp;[\s\r\n]+|<br>)*(<\/?(h[1-6]|hr|p|div|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|caption|address|pre|form|blockquote|dl|dt|dd|dir|fieldset)[^>]*>)(?:<br>&nbsp;[\s\r\n]+|<br>)*/g, '$1',
            /<br><br>/g, '<BR><BR>',
            /<br>(?!\n)/g, ' ',
            /<table([^>]*)>(\s|&nbsp;)+<t/gi, '<table$1><t',
            /<tr[^>]*>(\s|&nbsp;)*<\/tr>/gi, '',
            /<tbody[^>]*>(\s|&nbsp;)*<\/tbody>/gi, '',
            /<table[^>]*>(\s|&nbsp;)*<\/table>/gi, '',
            /<BR><BR>/g, '<br>',
            /^\s*(&nbsp;)+/gi, '',
            /(&nbsp;|<br[^>]*>)+\s*$/gi, '',
            /mso-[^;"]*;?/ig, '', /* office-related CSS attributes */
            /<(\/?)b(\s[^>]*)?>/ig, '<$1strong$2>',
            /<(\/?)i(\s[^>]*)?>/ig, '<$1em$2>',
            /<\/?(meta|link|style|o:|v:|x:)[^>]*>((?:.|\n)*?<\/(meta|link|style|o:|v:|x:)[^>]*>)?/ig, '', /* external references and namespaced tags */
            /style=(["|'])\s*\1/g, '', /* empty style attributes */
            /(<br[^>]*>)?\n/g, function ($0, $1) { return $1 ? $0 : ' '; } /* phantom extra line feeds */
        ];
    },

    applicable: function(html) {
        return (/class="?Mso|style="[^"]*mso-/i).test(html);
    },

    stripEmptyAnchors: function(html) {
        return html.replace(/<a([^>]*)>\s*<\/a>/ig, function(a, attributes) {
            if (!attributes || attributes.indexOf("href") < 0) {
                return "";
            }

            return a;
        });
    },

    listType: function(html) {
        var startingSymbol;

        if (/^(<span [^>]*texhtml[^>]*>)?<span [^>]*(Symbol|Wingdings)[^>]*>/i.test(html)) {
            startingSymbol = true;
        }

        html = html.replace(/<\/?\w+[^>]*>/g, '').replace(/&nbsp;/g, '\u00a0');

        if ((!startingSymbol && /^[\u2022\u00b7\u00a7\u00d8o]\u00a0+/.test(html)) ||
            (startingSymbol && /^.\u00a0+/.test(html))) {
            return 'ul';
        }

        if (/^\s*\w+[\.\)]\u00a0{2,}/.test(html)) {
            return 'ol';
        }
    },

    lists: function(placeholder) {
        var blockChildren = $(dom.blockElements.join(','), placeholder),
            lastMargin = -1,
            lastType,
            levels = {'ul':{}, 'ol':{}},
            li = placeholder,
            i, p, type, margin, list, key, child;

        for (i = 0; i < blockChildren.length; i++) {
            p = blockChildren[i];
            type = this.listType(p.innerHTML);

            if (!type || dom.name(p) != 'p') {
                if (!p.innerHTML) {
                    dom.remove(p);
                } else {
                    levels = {'ul':{}, 'ol':{}};
                    li = placeholder;
                    lastMargin = -1;
                }
                continue;
            }

            margin = parseFloat(p.style.marginLeft || 0);
            list = levels[type][margin];

            if (margin > lastMargin || !list) {
                list = dom.create(document, type);

                if (li == placeholder) {
                    dom.insertBefore(list, p);
                } else {
                    li.appendChild(list);
                }

                levels[type][margin] = list;
            }

            if (lastType != type) {
                for (key in levels) {
                    for (child in levels[key]) {
                        if ($.contains(list, levels[key][child])) {
                            delete levels[key][child];
                        }
                    }
                }
            }

            dom.remove(p.firstChild);
            li = dom.create(document, 'li', {innerHTML:p.innerHTML});
            list.appendChild(li);
            dom.remove(p);
            lastMargin = margin;
            lastType = type;
        }
    },

    removeAttributes: function(element) {
        var attributes = element.attributes,
            i = attributes.length;

        while (i--) {
            if (attributes[i].name != "colspan") {
                element.removeAttributeNode(attributes[i]);
            }
        }
    },

    createColGroup: function(row) {
        var cells = row.cells, colgroup;

        if (cells.length < 2) {
            return;
        }

        colgroup = $($.map(cells, function(cell) {
                var width = cell.width;
                if (width && parseInt(width, 10) !== 0) {
                    return kendo.format('<col style="width:{0}px;"/>', width);
                }

                return "<col />";
            }).join(""));

        // jquery 1.9/2.0 discrepancy
        if (!colgroup.is("colgroup")) {
            colgroup = $("<colgroup/>").append(colgroup);
        }

        colgroup.prependTo($(row).closest("table"));
    },

    convertHeaders: function(row) {
        var cells = row.cells,
            i,
            boldedCells = $.map(cells, function(cell) {
                var child = $(cell).children("p").children("strong")[0];

                if (child && dom.name(child) == "strong") {
                    return child;
                }
            });

        if (boldedCells.length == cells.length) {
            for (i = 0; i < boldedCells.length; i++) {
                dom.unwrap(boldedCells[i]);
            }

            $(row).closest("table")
                .find("colgroup").after("<thead></thead>").end()
                .find("thead").append(row);

            for (i = 0; i < cells.length; i++) {
                dom.changeTag(cells[i], "th");
            }
        }
    },

    removeParagraphs: function(cells) {
        var i, j, len, cell, paragraphs;

        for (i = 0; i < cells.length; i++) {
            this.removeAttributes(cells[i]);

            // remove paragraphs and insert line breaks between them
            cell = $(cells[i]);
            paragraphs = cell.children("p");

            for (j = 0, len = paragraphs.length; j < len; j++) {
                if (j < len - 1) {
                    dom.insertAfter(dom.create(document, "br"), paragraphs[j]);
                }

                dom.unwrap(paragraphs[j]);
            }
        }
    },

    removeDefaultColors: function(spans) {
        for (var i = 0; i < spans.length; i++) {
            if (/^\s*color:\s*[^;]*;?$/i.test(spans[i].style.cssText)) {
                dom.unwrap(spans[i]);
            }
        }
    },

    tables: function(placeholder) {
        var tables = $(placeholder).find("table"),
            that = this,
            rows,
            firstRow, longestRow, i, j;

        for (i = 0; i < tables.length; i++) {
            rows = tables[i].rows;
            longestRow = firstRow = rows[0];

            for (j = 1; j < rows.length; j++) {
                if (rows[j].cells.length > longestRow.cells.length) {
                    longestRow = rows[j];
                }
            }

            that.createColGroup(longestRow);
            that.convertHeaders(firstRow);

            that.removeAttributes(tables[i]);

            that.removeParagraphs(tables.eq(i).find("td,th"));
            that.removeDefaultColors(tables.eq(i).find("span"));
        }
    },

    clean: function(html) {
        var that = this, placeholder;

        html = Cleaner.fn.clean.call(that, html);
        html = that.stripEmptyAnchors(html);

        placeholder = dom.create(document, 'div', {innerHTML: html});
        that.lists(placeholder);
        that.tables(placeholder);

        html = placeholder.innerHTML.replace(/(<[^>]*)\s+class="?[^"\s>]*"?/ig, '$1');

        return html;
    }
});

var WebkitFormatCleaner = Cleaner.extend({
    init: function() {
        this.replacements = [
            /\s+class="Apple-style-span[^"]*"/gi, '',
            /<(div|p|h[1-6])\s+style="[^"]*"/gi, '<$1',
            /^<div>(.*)<\/div>$/, '$1'
        ];
    },

    applicable: function(html) {
        return (/class="?Apple-style-span|style="[^"]*-webkit-nbsp-mode/i).test(html);
    }
});

extend(editorNS, {
    Command: Command,
    GenericCommand: GenericCommand,
    InsertHtmlCommand: InsertHtmlCommand,
    InsertHtmlTool: InsertHtmlTool,
    UndoRedoStack: UndoRedoStack,
    TypingHandler: TypingHandler,
    SystemHandler: SystemHandler,
    Keyboard: Keyboard,
    Clipboard: Clipboard,
    Cleaner: Cleaner,
    MSWordFormatCleaner: MSWordFormatCleaner,
    WebkitFormatCleaner: WebkitFormatCleaner
});

registerTool("insertHtml", new InsertHtmlTool({template: new ToolTemplate({template: EditorUtils.dropDownListTemplate, title: "Insert HTML", initialValue: "Insert HTML"})}));

})(window.kendo.jQuery);
(function($) {

var kendo = window.kendo,
    Class = kendo.Class,
    Editor = kendo.ui.editor,
    formats = kendo.ui.Editor.fn.options.formats,
    EditorUtils = Editor.EditorUtils,
    Tool = Editor.Tool,
    ToolTemplate = Editor.ToolTemplate,
    FormatTool = Editor.FormatTool,
    dom = Editor.Dom,
    RangeUtils = Editor.RangeUtils,
    extend = $.extend,
    registerTool = Editor.EditorUtils.registerTool,
    registerFormat = Editor.EditorUtils.registerFormat,
    KMARKER = "k-marker";

var InlineFormatFinder = Class.extend({
    init: function(format) {
        this.format = format;
    },

    numberOfSiblings: function(referenceNode) {
        var textNodesCount = 0,
            elementNodesCount = 0,
            markerCount = 0,
            parentNode = referenceNode.parentNode,
            node;

        for (node = parentNode.firstChild; node; node = node.nextSibling) {
            if (node != referenceNode) {
                if (node.className == KMARKER) {
                    markerCount++;
                } else if (node.nodeType == 3) {
                    textNodesCount++;
                } else {
                    elementNodesCount++;
                }
            }
        }

        if (markerCount > 1 && parentNode.firstChild.className == KMARKER && parentNode.lastChild.className == KMARKER) {
            // full node selection
            return 0;
        } else {
            return elementNodesCount + textNodesCount;
        }
    },

    findSuitable: function (sourceNode, skip) {
        if (!skip && this.numberOfSiblings(sourceNode) > 0) {
            return null;
        }

        return dom.parentOfType(sourceNode, this.format[0].tags);
    },

    findFormat: function (sourceNode) {
        var format = this.format,
            attrEquals = dom.attrEquals,
            i, len, node, tags, attributes;

        for (i = 0, len = format.length; i < len; i++) {
            node = sourceNode;
            tags = format[i].tags;
            attributes = format[i].attr;

            if (node && dom.ofType(node, tags) && attrEquals(node, attributes)) {
                return node;
            }

            while (node) {
                node = dom.parentOfType(node, tags);
                if (node && attrEquals(node, attributes)) {
                    return node;
                }
            }
        }

        return null;
    },

    isFormatted: function (nodes) {
        var i, len;

        for (i = 0, len = nodes.length; i < len; i++) {
            if (this.findFormat(nodes[i])) {
                return true;
            }
        }
        return false;
    }
});

var InlineFormatter = Class.extend({
    init: function(format, values) {
        var that = this;
        that.finder = new InlineFormatFinder(format);
        that.attributes = extend({}, format[0].attr, values);
        that.tag = format[0].tags[0];
    },

    wrap: function(node) {
        return dom.wrap(node, dom.create(node.ownerDocument, this.tag, this.attributes));
    },

    activate: function(range, nodes) {
        var that = this;
        if (that.finder.isFormatted(nodes)) {
            that.split(range);
            that.remove(nodes);
        } else {
            that.apply(nodes);
        }
    },

    toggle: function (range) {
        var nodes = RangeUtils.textNodes(range);

        if (nodes.length > 0) {
            this.activate(range, nodes);
        }
    },

    apply: function (nodes) {
        var that = this,
        formatNodes = [],
        i, l, node, formatNode;

        for (i = 0, l = nodes.length; i < l; i++) {
            node = nodes[i];
            formatNode = that.finder.findSuitable(node);
            if (formatNode) {
                dom.attr(formatNode, that.attributes);
            } else {
                formatNode = that.wrap(node);
            }

            formatNodes.push(formatNode);
        }

        that.consolidate(formatNodes);
    },

    remove: function (nodes) {
        var that = this,
        i, l, formatNode;

        for (i = 0, l = nodes.length; i < l; i++) {
            formatNode = that.finder.findFormat(nodes[i]);
            if (formatNode) {
                if (that.attributes && that.attributes.style) {
                    dom.unstyle(formatNode, that.attributes.style);
                    if (!formatNode.style.cssText && !formatNode.attributes["class"]) {
                        dom.unwrap(formatNode);
                    }
                } else {
                    dom.unwrap(formatNode);
                }
            }
        }
    },

    split: function (range) {
        var nodes = RangeUtils.textNodes(range),
        l = nodes.length,
        i, formatNode;

        if (l > 0) {
            for (i = 0; i < l; i++) {
                formatNode = this.finder.findFormat(nodes[i]);
                if (formatNode) {
                    RangeUtils.split(range, formatNode, true);
                }
            }
        }
    },

    consolidate: function (nodes) {
        var node, last;

        while (nodes.length > 1) {
            node = nodes.pop();
            last = nodes[nodes.length - 1];

            if (node.previousSibling && node.previousSibling.className == KMARKER) {
                last.appendChild(node.previousSibling);
            }

            if (node.tagName == last.tagName && node.previousSibling == last && node.style.cssText == last.style.cssText) {
                while (node.firstChild) {
                    last.appendChild(node.firstChild);
                }
                dom.remove(node);
            }
        }
    }
});

var GreedyInlineFormatFinder = InlineFormatFinder.extend({
    init: function(format, greedyProperty) {
        var that = this;
        that.format = format;
        that.greedyProperty = greedyProperty;
        InlineFormatFinder.fn.init.call(that, format);
    },

    getInlineCssValue: function(node) {
        var attributes = node.attributes,
            trim = $.trim,
            i, l, attribute, name, attributeValue, css, pair, cssIndex, len, propertyAndValue, property, value;

        if (!attributes) {
            return;
        }

        for (i = 0, l = attributes.length; i < l; i++) {
            attribute = attributes[i];
            name = attribute.nodeName;
            attributeValue = attribute.nodeValue;

            if (attribute.specified && name == "style") {

                css = trim(attributeValue || node.style.cssText).split(";");

                for (cssIndex = 0, len = css.length; cssIndex < len; cssIndex++) {
                    pair = css[cssIndex];
                    if (pair.length) {
                        propertyAndValue = pair.split(":");
                        property = trim(propertyAndValue[0].toLowerCase());
                        value = trim(propertyAndValue[1]);

                        if (property != this.greedyProperty) {
                            continue;
                        }

                        return property.indexOf("color") >= 0 ? dom.toHex(value) : value;
                    }
                }
            }
        }
    },

    getFormatInner: function (node) {
        var $node = $(dom.isDataNode(node) ? node.parentNode : node),
            parents = $node.parentsUntil("[contentEditable]").addBack(),
            i, len, value;

        for (i = 0, len = parents.length; i < len; i++) {
            value = this.greedyProperty == "className" ? parents[i].className : this.getInlineCssValue(parents[i]);
            if (value) {
                return value;
            }
        }

        return "inherit";
    },

    getFormat: function (nodes) {
        var result = this.getFormatInner(nodes[0]),
        i, len;

        for (i = 1, len = nodes.length; i < len; i++) {
            if (result != this.getFormatInner(nodes[i])) {
                return "";
            }
        }

        return result;
    },

    isFormatted: function (nodes) {
        return this.getFormat(nodes) !== "";
    }
});

var GreedyInlineFormatter = InlineFormatter.extend({
    init: function(format, values, greedyProperty) {
        InlineFormatter.fn.init.call(this, format, values);

        this.values = values;
        this.finder = new GreedyInlineFormatFinder(format, greedyProperty);

        if (greedyProperty) {
            this.greedyProperty = kendo.toCamelCase(greedyProperty);
        }

    },

    activate: function(range, nodes) {
        var greedyProperty = this.greedyProperty;
        var action = "apply";

        this.split(range);

        if (greedyProperty && this.values.style[greedyProperty] == "inherit") {
            action = "remove";
        }

        this[action](nodes);
    }
});

var InlineFormatTool = FormatTool.extend({
    init: function(options) {
        FormatTool.fn.init.call(this, extend(options, {
            finder: new InlineFormatFinder(options.format),
            formatter: function () { return new InlineFormatter(options.format); }
        }));
    }
});

var DelayedExecutionTool = Tool.extend({
    update: function(ui, nodes) {
        var list = ui.data(this.type);

        list.close();
        list.value(this.finder.getFormat(nodes));
    }
});

var FontTool = DelayedExecutionTool.extend({
    init: function(options) {
        var that = this;
        Tool.fn.init.call(that, options);

        // IE has single selection hence we are using select box instead of combobox
        that.type = (kendo.support.browser.msie || kendo.support.touch) ? "kendoDropDownList" : "kendoComboBox";
        that.format = [{ tags: ["span"] }];
        that.finder = new GreedyInlineFormatFinder(that.format, options.cssAttr);
    },

    command: function (commandArguments) {
        var options = this.options,
            format = this.format,
            style = {};

        return new Editor.FormatCommand(extend(commandArguments, {
            formatter: function () {
                style[options.domAttr] = commandArguments.value;

                return new GreedyInlineFormatter(format, { style: style }, options.cssAttr);
            }
        }));
    },

    initialize: function (ui, initOptions) {
        var editor = initOptions.editor,
            options = this.options,
            toolName = options.name,
            dataSource,
            defaultValue = [];

        if (options.defaultValue) {
           defaultValue = [{
                text: editor.options.messages[options.defaultValue[0].text],
                value: options.defaultValue[0].value
           }];
        }

        dataSource = defaultValue.concat(options.items ? options.items : editor.options[toolName]);

        ui[this.type]({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: dataSource,
            change: function () {
                Tool.exec(editor, toolName, this.value());
            },
            highlightFirst: false
        });

        ui.closest(".k-widget").removeClass("k-" + toolName).find("*").addBack().attr("unselectable", "on");

        ui.data(this.type).value("inherit");
    }

});

var ColorTool = Tool.extend({
    init: function(options) {
        Tool.fn.init.call(this, options);

        this.format = [{ tags: ["span"] }];
        this.finder = new GreedyInlineFormatFinder(this.format, options.cssAttr);
    },

    options: {
        palette: "websafe"
    },

    update: function() {
        this._widget.close();
    },

    command: function (commandArguments) {
        var options = this.options,
            format = this.format,
            style = {};

        return new Editor.FormatCommand(extend(commandArguments, {
            formatter: function () {
                style[options.domAttr] = commandArguments.value;

                return new GreedyInlineFormatter(format, { style: style }, options.cssAttr);
            }
        }));
    },

    initialize: function(ui, initOptions) {
        var editor = initOptions.editor,
            toolName = this.name,
            options =  extend({}, ColorTool.fn.options, this.options),
            palette = options.palette;

        ui = this._widget = new kendo.ui.ColorPicker(ui, {
            value: $.isArray(palette) ? palette[0] : "#000",
            toolIcon: "k-" + options.name,
            palette: palette,
            change: function() {
                var color = ui.value();
                if (color) {
                    Tool.exec(editor, toolName, color);
                }
                editor.focus();
            },
            activate: function(e) {
                e.preventDefault();
                ui.trigger("change");
            }
        });
        ui.wrapper
            .attr({ title: initOptions.title, unselectable: "on" })
            .find("*").attr("unselectable", "on");
    }
});

extend(Editor, {
    InlineFormatFinder: InlineFormatFinder,
    InlineFormatter: InlineFormatter,
    DelayedExecutionTool: DelayedExecutionTool,
    GreedyInlineFormatFinder: GreedyInlineFormatFinder,
    GreedyInlineFormatter: GreedyInlineFormatter,
    InlineFormatTool: InlineFormatTool,
    FontTool: FontTool,
    ColorTool: ColorTool
});

registerFormat("bold", [ { tags: ["strong", "b"] }, { tags: ["span"], attr: { style: { fontWeight: "bold"}} } ]);
registerTool("bold", new InlineFormatTool({ key: "B", ctrl: true, format: formats.bold, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Bold"}) }));

registerFormat("italic", [ { tags: ["em", "i"] }, { tags: ["span"], attr: { style: { fontStyle: "italic"}} } ]);
registerTool("italic", new InlineFormatTool({ key: "I", ctrl: true, format: formats.italic, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Italic"})}));

registerFormat("underline", [ { tags: ["span"], attr: { style: { textDecoration: "underline"}} }, { tags: ["u"] } ]);
registerTool("underline", new InlineFormatTool({ key: "U", ctrl: true, format: formats.underline, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Underline"})}));

registerFormat("strikethrough", [ { tags: ["del", "strike"] }, { tags: ["span"], attr: { style: { textDecoration: "line-through"}} } ]);
registerTool("strikethrough", new InlineFormatTool({format: formats.strikethrough, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Strikethrough"})}));

registerFormat("superscript", [ { tags: ["sup"] } ]);
registerTool("superscript", new InlineFormatTool({format: formats.superscript, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Superscript"})}));

registerFormat("subscript", [ { tags: ["sub"] } ]);
registerTool("subscript", new InlineFormatTool({format: formats.subscript, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Subscript"})}));

registerTool("foreColor", new ColorTool({cssAttr:"color", domAttr:"color", name:"foreColor", template: new ToolTemplate({template: EditorUtils.colorPickerTemplate, title: "Color"})}));

registerTool("backColor", new ColorTool({cssAttr:"background-color", domAttr: "backgroundColor", name:"backColor", template: new ToolTemplate({template: EditorUtils.colorPickerTemplate, title: "Background Color"})}));

registerTool("fontName", new FontTool({cssAttr:"font-family", domAttr: "fontFamily", name:"fontName", defaultValue: [{ text: "fontNameInherit",  value: "inherit" }], template: new ToolTemplate({template: EditorUtils.comboBoxTemplate, title: "Font Name"})}));

registerTool("fontSize", new FontTool({cssAttr:"font-size", domAttr:"fontSize", name:"fontSize", defaultValue: [{ text: "fontSizeInherit",  value: "inherit" }], template: new ToolTemplate({template: EditorUtils.comboBoxTemplate, title: "Font Size"})}));

})(window.kendo.jQuery);
(function($) {

var kendo = window.kendo,
    Class = kendo.Class,
    extend = $.extend,
    Editor = kendo.ui.editor,
    formats = kendo.ui.Editor.fn.options.formats,
    dom = Editor.Dom,
    Command = Editor.Command,
    ToolTemplate = Editor.ToolTemplate,
    FormatTool = Editor.FormatTool,
    EditorUtils = Editor.EditorUtils,
    registerTool = EditorUtils.registerTool,
    registerFormat = EditorUtils.registerFormat,
    RangeUtils = Editor.RangeUtils;

var BlockFormatFinder = Class.extend({
    init: function(format) {
        this.format = format;
    },

    contains: function(node, children) {
        var i, len, child;

        for (i = 0, len = children.length; i < len; i++) {
            child = children[i];
            if (!child || !dom.isAncestorOrSelf(node, child)) {
                return false;
            }
        }

        return true;
    },

    findSuitable: function (nodes) {
        var format = this.format,
            suitable = [],
            i, len, candidate;

        for (i = 0, len = nodes.length; i < len; i++) {
            for (var f = format.length - 1; f >= 0; f--) {
                candidate = dom.ofType(nodes[i], format[f].tags) ? nodes[i] : dom.parentOfType(nodes[i], format[f].tags);
                if (candidate) {
                    break;
                }
            }

            if (!candidate || candidate.contentEditable === 'true') {
                return [];
            }

            if ($.inArray(candidate, suitable) < 0) {
                suitable.push(candidate);
            }
        }

        for (i = 0, len = suitable.length; i < len; i++) {
            if (this.contains(suitable[i], suitable)) {
                return [suitable[i]];
            }
        }

        return suitable;
    },

    findFormat: function (sourceNode) {
        var format = this.format,
            i, len, node, tags, attributes;

        for (i = 0, len = format.length; i < len; i++) {
            node = sourceNode;
            tags = format[i].tags;
            attributes = format[i].attr;

            while (node) {
                if (dom.ofType(node, tags) && dom.attrEquals(node, attributes)) {
                    return node;
                }

                node = node.parentNode;
            }
        }
        return null;
    },

    getFormat: function (nodes) {
        var that = this,
            findFormat = function(node) {
                    return that.findFormat(dom.isDataNode(node) ? node.parentNode : node);
                },
            result = findFormat(nodes[0]),
            i, len;

        if (!result) {
            return "";
        }

        for (i = 1, len = nodes.length; i < len; i++) {
            if (result != findFormat(nodes[i])) {
                return "";
            }
        }

        return result.nodeName.toLowerCase();
    },

    isFormatted: function (nodes) {
        for (var i = 0, len = nodes.length; i < len; i++) {
            if (!this.findFormat(nodes[i])) {
                return false;
            }
        }

        return true;
    }
});

var BlockFormatter = Class.extend({
    init: function (format, values) {
        this.format = format;
        this.values = values;
        this.finder = new BlockFormatFinder(format);
    },

    wrap: function(tag, attributes, nodes) {
        var commonAncestor = nodes.length == 1 ? dom.blockParentOrBody(nodes[0]) : dom.commonAncestor.apply(null, nodes);

        if (dom.isInline(commonAncestor)) {
            commonAncestor = dom.blockParentOrBody(commonAncestor);
        }

        var ancestors = dom.significantChildNodes(commonAncestor),
            position = dom.findNodeIndex(ancestors[0]),
            wrapper = dom.create(commonAncestor.ownerDocument, tag, attributes),
            i, ancestor;

        for (i = 0; i < ancestors.length; i++) {
            ancestor = ancestors[i];
            if (dom.isBlock(ancestor)) {
                dom.attr(ancestor, attributes);

                if (wrapper.childNodes.length) {
                    dom.insertBefore(wrapper, ancestor);
                    wrapper = wrapper.cloneNode(false);
                }

                position = dom.findNodeIndex(ancestor) + 1;

                continue;
            }

            wrapper.appendChild(ancestor);
        }

        if (wrapper.firstChild) {
            dom.insertAt(commonAncestor, wrapper, position);
        }
    },

    apply: function (nodes) {
        var format, values = this.values;

        function attributes(format) {
            return extend({}, format && format.attr, values);
        }

        var images = dom.filter("img", nodes);
        var imageFormat = EditorUtils.formatByName("img", this.format);
        var imageAttributes = attributes(imageFormat);
        $.each(images, function() {
            dom.attr(this, imageAttributes);
        });

        // only images were selected, no need to wrap
        if (images.length == nodes.length) {
            return;
        }

        var nonImages = dom.filter("img", nodes, true);
        var formatNodes = this.finder.findSuitable(nonImages);

        if (formatNodes.length) {
            for (var i = 0, len = formatNodes.length; i < len; i++) {
                format = EditorUtils.formatByName(dom.name(formatNodes[i]), this.format);
                dom.attr(formatNodes[i], attributes(format));
            }
        } else {
            format = this.format[0];
            this.wrap(format.tags[0], attributes(format), nonImages);
        }
    },

    remove: function (nodes) {
        var i, l, formatNode, namedFormat, name;

        for (i = 0, l = nodes.length; i < l; i++) {
            formatNode = this.finder.findFormat(nodes[i]);
            if (formatNode) {
                name = dom.name(formatNode);
                if (name == "div" && !formatNode.getAttribute("class")) {
                    dom.unwrap(formatNode);
                } else {
                    namedFormat = EditorUtils.formatByName(name, this.format);
                    if (namedFormat.attr.style) {
                        dom.unstyle(formatNode, namedFormat.attr.style);
                    }
                    if (namedFormat.attr.className) {
                        dom.removeClass(formatNode, namedFormat.attr.className);
                    }
                }
            }
        }
    },

    toggle: function (range) {
        var that = this,
            nodes = RangeUtils.nodes(range);

        if (that.finder.isFormatted(nodes)) {
            that.remove(nodes);
        } else {
            that.apply(nodes);
        }
    }
});

var GreedyBlockFormatter = Class.extend({
    init: function (format, values) {
        var that = this;
        that.format = format;
        that.values = values;
        that.finder = new BlockFormatFinder(format);
    },

    apply: function (nodes) {
        var format = this.format,
            blocks = dom.blockParents(nodes),
            formatTag = format[0].tags[0],
            i, len, list, formatter, range,
            element;

        if (blocks.length && blocks[0].attributes.contentEditable) {
            // do not break out of contentEditable elements
            blocks = [];
        }

        if (blocks.length) {
            for (i = 0, len = blocks.length; i < len; i++) {
                if (dom.is(blocks[i], "li")) {
                    list = blocks[i].parentNode;
                    formatter = new Editor.ListFormatter(list.nodeName.toLowerCase(), formatTag);
                    range = this.editor.createRange();
                    range.selectNode(blocks[i]);
                    formatter.toggle(range);
                } else {
                    element = dom.changeTag(blocks[i], formatTag);
                    dom.attr(element, format[0].attr);
                }
            }
        } else {
            new BlockFormatter(format, this.values).apply(nodes);
        }
    },

    toggle: function (range) {
        var nodes = RangeUtils.textNodes(range);
        if (!nodes.length) {
            range.selectNodeContents(range.commonAncestorContainer);
            nodes = RangeUtils.textNodes(range);
            if (!nodes.length) {
                nodes = dom.significantChildNodes(range.commonAncestorContainer);
            }
        }

        this.apply(nodes);
    }
});

var FormatCommand = Command.extend({
    init: function (options) {
        options.formatter = options.formatter();
        Command.fn.init.call(this, options);
    }
});

var BlockFormatTool = FormatTool.extend({ init: function (options) {
        FormatTool.fn.init.call(this, extend(options, {
            finder: new BlockFormatFinder(options.format),
            formatter: function () {
                return new BlockFormatter(options.format);
            }
        }));
    }
});

extend(Editor, {
    BlockFormatFinder: BlockFormatFinder,
    BlockFormatter: BlockFormatter,
    GreedyBlockFormatter: GreedyBlockFormatter,
    FormatCommand: FormatCommand,
    BlockFormatTool: BlockFormatTool
});

registerFormat("justifyLeft", [
    { tags: dom.blockElements, attr: { style: { textAlign: "left", listStylePosition: "" }} },
    { tags: ["img"], attr: { style: { "float": "left"}} }
]);
registerTool("justifyLeft", new BlockFormatTool({format: formats.justifyLeft, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Justify Left"})}));

registerFormat("justifyCenter", [
    { tags: dom.nonListBlockElements, attr: { style: { textAlign: "center" }} },
    { tags: ["ul","ol","li"], attr: { style: { textAlign: "center", listStylePosition: "inside" }} },
    { tags: ["img"], attr: { style: { display: "block", marginLeft: "auto", marginRight: "auto"}} }
]);
registerTool("justifyCenter", new BlockFormatTool({format: formats.justifyCenter, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Justify Center"})}));

registerFormat("justifyRight", [
    { tags: dom.nonListBlockElements, attr: { style: { textAlign: "right" }} },
    { tags: ["ul","ol","li"], attr: { style: { textAlign: "right", listStylePosition: "inside" }} },
    { tags: ["img"], attr: { style: { "float": "right"}} }
]);
registerTool("justifyRight", new BlockFormatTool({format: formats.justifyRight, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Justify Right"})}));

registerFormat("justifyFull", [
    { tags: dom.blockElements, attr: { style: { textAlign: "justify", listStylePosition: "" }} },
]);
registerTool("justifyFull", new BlockFormatTool({format: formats.justifyFull, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Justify Full"})}));

})(window.kendo.jQuery);
(function($) {

// Imports ================================================================
var kendo = window.kendo,
    extend = $.extend,
    editorNS = kendo.ui.editor,
    dom = editorNS.Dom,
    Command = editorNS.Command,
    Tool = editorNS.Tool,
    BlockFormatter = editorNS.BlockFormatter,
    normalize = dom.normalize,
    RangeUtils = editorNS.RangeUtils,
    registerTool = editorNS.EditorUtils.registerTool;

var ParagraphCommand = Command.extend({
    init: function(options) {
        this.options = options;
        Command.fn.init.call(this, options);
    },

    _insertMarker: function(doc, range) {
        var marker = dom.create(doc, 'a'), container;
        marker.className = "k-marker";

        range.insertNode(marker);

        if (!marker.parentNode) {
            // inserting paragraph in Firefox full body range
            container = range.commonAncestorContainer;
            container.innerHTML = "";
            container.appendChild(marker);
        }

        normalize(marker.parentNode);

        return marker;
    },

    _moveFocus: function(range, next) {
        if (dom.is(next, 'img')) {
            range.setStartBefore(next);
        } else {
            range.selectNodeContents(next);

            var textNode = RangeUtils.textNodes(range)[0];

            if (textNode) {
                range.selectNodeContents(textNode);
            } else {
                while (next.childNodes.length && !dom.is(next.firstChild, "br")) {
                    next = next.firstChild;
                }

                range.selectNodeContents(next);
            }
        }
    },

    shouldTrim: function(range) {
        var blocks = 'p,h1,h2,h3,h4,h5,h6'.split(','),
            startInBlock = dom.parentOfType(range.startContainer, blocks),
            endInBlock = dom.parentOfType(range.endContainer, blocks);
        return (startInBlock && !endInBlock) || (!startInBlock && endInBlock);
    },

    _blankAfter: function (node) {
        while (node && (dom.isMarker(node) || dom.stripBom(node.nodeValue) === "")) {
            node = node.nextSibling;
        }

        return !node;
    },

    exec: function () {
        var range = this.getRange(),
            doc = RangeUtils.documentFromRange(range),
            parent, previous, next,
            emptyParagraphContent = editorNS.emptyElementContent,
            paragraph, marker, li, heading, rng,
            shouldTrim = this.shouldTrim(range);

        range.deleteContents();

        marker = this._insertMarker(doc, range);

        li = dom.closestEditableOfType(marker, ['li']);
        heading = dom.closestEditableOfType(marker, 'h1,h2,h3,h4,h5,h6'.split(','));

        if (li) {
            // hitting 'enter' in empty li
            if (dom.emptyNode(li)) {
                paragraph = dom.create(doc, 'p');

                if (li.nextSibling) {
                    rng = range.cloneRange();
                    rng.selectNode(li);

                    RangeUtils.split(rng, li.parentNode);
                }

                dom.insertAfter(paragraph, li.parentNode);
                dom.remove(li.parentNode.childNodes.length == 1 ? li.parentNode : li);
                paragraph.innerHTML = emptyParagraphContent;
                next = paragraph;
            }
        } else if (heading && this._blankAfter(marker)) {
            paragraph = dom.create(doc, 'p');

            dom.insertAfter(paragraph, heading);
            paragraph.innerHTML = emptyParagraphContent;
            dom.remove(marker);
            next = paragraph;
        }

        if (!next) {
            if (!(li || heading)) {
                new BlockFormatter([{ tags: ['p']}]).apply([marker]);
            }

            range.selectNode(marker);

            parent = dom.parentOfType(marker, [li ? 'li' : heading ? dom.name(heading) : 'p']);

            RangeUtils.split(range, parent, shouldTrim);

            previous = parent.previousSibling;

            if (dom.is(previous, 'li') && previous.firstChild && !dom.is(previous.firstChild, 'br')) {
                previous = previous.firstChild;
            }

            next = parent.nextSibling;

            if (dom.is(next, 'li') && next.firstChild && !dom.is(next.firstChild, 'br')) {
                next = next.firstChild;
            }

            dom.remove(parent);

            this.clean(previous);
            this.clean(next, { links: true });

            // normalize updates the caret display in Gecko
            normalize(previous);
        }

        normalize(next);

        this._moveFocus(range, next);

        range.collapse(true);

        dom.scrollTo(next);

        RangeUtils.selectRange(range);
    },

    clean: function(node, options) {
        var root = node;

        if (node.firstChild && dom.is(node.firstChild, 'br')) {
            dom.remove(node.firstChild);
        }

        if (dom.isDataNode(node) && !node.nodeValue) {
            node = node.parentNode;
        }

        if (node) {
            while (node.firstChild && node.firstChild.nodeType == 1) {
                node = node.firstChild;
            }

            if (!dom.isEmpty(node) && /^\s*$/.test(node.innerHTML)) {
                node.innerHTML = editorNS.emptyElementContent;
            }

            if (options && options.links) {
                while (node != root) {
                    if (dom.is(node, "a")) {
                        dom.unwrap(node);
                        break;
                    }
                    node = node.parentNode;
                }
            }
        }
    }
});

var NewLineCommand = Command.extend({
    init: function(options) {
        this.options = options;
        Command.fn.init.call(this, options);
    },

    exec: function () {
        var range = this.getRange(),
            br = dom.create(RangeUtils.documentFromRange(range), 'br'),
            filler;

        range.deleteContents();
        range.insertNode(br);

        normalize(br.parentNode);

        if (!kendo.support.browser.msie && (!br.nextSibling || dom.isWhitespace(br.nextSibling))) {
            // Gecko and WebKit cannot put the caret after only one br.
            filler = br.cloneNode(true);
            filler.setAttribute('_moz_dirty', '');
            dom.insertAfter(filler, br);
        }

        range.setStartAfter(br);
        range.collapse(true);

        dom.scrollTo(br.nextSibling || br);

        RangeUtils.selectRange(range);
    }
});

extend(editorNS, {
    ParagraphCommand: ParagraphCommand,
    NewLineCommand: NewLineCommand
});

registerTool("insertLineBreak", new Tool({ key: 13, shift: true, command: NewLineCommand }));
registerTool("insertParagraph", new Tool({ key: 13, command: ParagraphCommand }));

})(window.kendo.jQuery);
(function($) {

// Imports ================================================================
var kendo = window.kendo,
    Class = kendo.Class,
    extend = $.extend,
    Editor = kendo.ui.editor,
    dom = Editor.Dom,
    RangeUtils = Editor.RangeUtils,
    EditorUtils = Editor.EditorUtils,
    Command = Editor.Command,
    ToolTemplate = Editor.ToolTemplate,
    FormatTool = Editor.FormatTool,
    BlockFormatFinder = Editor.BlockFormatFinder,
    textNodes = RangeUtils.textNodes,
    registerTool = Editor.EditorUtils.registerTool;

var ListFormatFinder = BlockFormatFinder.extend({
    init: function(tag) {
        this.tag = tag;
        var tags = this.tags = [tag == 'ul' ? 'ol' : 'ul', tag];

        BlockFormatFinder.fn.init.call(this, [{ tags: tags}]);
    },

    isFormatted: function (nodes) {
        var formatNodes = [], formatNode;

        for (var i = 0; i < nodes.length; i++) {
            if ((formatNode = this.findFormat(nodes[i])) && dom.name(formatNode) == this.tag) {
                formatNodes.push(formatNode);
            }
        }

        if (formatNodes.length < 1) {
            return false;
        }

        if (formatNodes.length != nodes.length) {
            return false;
        }

        // check if sequential lists are selected
        for (i = 0; i < formatNodes.length; i++) {
            if (formatNodes[i].parentNode != formatNode.parentNode) {
                break;
            }

            if (formatNodes[i] != formatNode) {
                return false;
            }
        }

        return true;
    },

    findSuitable: function (nodes) {
        var candidate = dom.parentOfType(nodes[0], this.tags);

        if (candidate && dom.name(candidate) == this.tag) {
            return candidate;
        }

        return null;
    }

});

var ListFormatter = Class.extend({
    init: function(tag, unwrapTag) {
        var that = this;
        that.finder = new ListFormatFinder(tag);
        that.tag = tag;
        that.unwrapTag = unwrapTag;
    },

    isList: function(node) {
        var name = dom.name(node);

        return name == "ul" || name == "ol" || name == "dl";
    },

    wrap: function(list, nodes) {
        var li = dom.create(list.ownerDocument, "li"),
            i, node;

        for (i = 0; i < nodes.length; i++) {
            node = nodes[i];

            if (dom.is(node, 'li')) {
                list.appendChild(node);
                continue;
            }

            if (this.isList(node)) {
                while (node.firstChild) {
                    list.appendChild(node.firstChild);
                }
                continue;
            }

            if (dom.is(node, "td")) {
                while (node.firstChild) {
                    li.appendChild(node.firstChild);
                }
                list.appendChild(li);
                node.appendChild(list);
                list = list.cloneNode(false);
                li = li.cloneNode(false);
                continue;
            }

            li.appendChild(node);

            if (dom.isBlock(node)) {
                list.appendChild(li);
                dom.unwrap(node);
                li = li.cloneNode(false);
            }
        }

        if (li.firstChild) {
            list.appendChild(li);
        }
    },

    containsAny: function(parent, nodes) {
        for (var i = 0; i < nodes.length; i++) {
            if (dom.isAncestorOrSelf(parent, nodes[i])) {
                return true;
            }
        }

        return false;
    },

    suitable: function (candidate, nodes) {
        if (candidate.className == "k-marker") {
            var sibling = candidate.nextSibling;

            if (sibling && dom.isBlock(sibling)) {
                return false;
            }

            sibling = candidate.previousSibling;

            if (sibling && dom.isBlock(sibling)) {
                return false;
            }
        }

        return this.containsAny(candidate, nodes) || dom.isInline(candidate) || candidate.nodeType == 3;
    },

    split: function (range) {
        var nodes = textNodes(range),
            start, end;

        if (nodes.length) {
            start = dom.parentOfType(nodes[0], ['li']);
            end = dom.parentOfType(nodes[nodes.length - 1], ['li']);
            range.setStartBefore(start);
            range.setEndAfter(end);

            for (var i = 0, l = nodes.length; i < l; i++) {
                var formatNode = this.finder.findFormat(nodes[i]);
                if (formatNode) {
                    var parents = $(formatNode).parents("ul,ol");
                    if (parents[0]) {
                        RangeUtils.split(range, parents.last()[0], true);
                    } else {
                        RangeUtils.split(range, formatNode, true);
                    }
                }
            }
        }
    },

    merge: function(tag, formatNode) {
        var prev = formatNode.previousSibling, next;

        while (prev && (prev.className == "k-marker" || (prev.nodeType == 3 && dom.isWhitespace(prev)))) {
            prev = prev.previousSibling;
        }

        // merge with previous list
        if (prev && dom.name(prev) == tag) {
            while(formatNode.firstChild) {
                prev.appendChild(formatNode.firstChild);
            }
            dom.remove(formatNode);
            formatNode = prev;
        }

        next = formatNode.nextSibling;
        while (next && (next.className == "k-marker" || (next.nodeType == 3 && dom.isWhitespace(next)))) {
            next = next.nextSibling;
        }

        // merge with next list
        if (next && dom.name(next) == tag) {
            while(formatNode.lastChild) {
                next.insertBefore(formatNode.lastChild, next.firstChild);
            }
            dom.remove(formatNode);
        }
    },

    breakable: function(node) {
        return (
            node != node.ownerDocument.body &&
            !/table|tbody|tr|td/.test(dom.name(node)) &&
            !node.attributes.contentEditable
        );
    },

    applyOnSection: function (section, nodes) {
        var tag = this.tag;
        var commonAncestor = dom.closestSplittableParent(nodes);

        var ancestors = [];

        var formatNode = this.finder.findSuitable(nodes);

        if (!formatNode) {
            formatNode = new ListFormatFinder(tag == "ul" ? "ol" : "ul").findSuitable(nodes);
        }

        var childNodes;

        if (/table|tbody/.test(dom.name(commonAncestor))) {
            childNodes = $.map(nodes, function(node) {
                return dom.parentOfType(node, ["td"]);
            });
        } else {
            childNodes = dom.significantChildNodes(commonAncestor);

            if ($.grep(childNodes, dom.isBlock).length) {
                childNodes = $.grep(childNodes, $.proxy(function(node) {
                    return this.containsAny(node, nodes);
                }, this));
            }

            if (!childNodes.length) {
                childNodes = nodes;
            }
        }

        function pushAncestor() {
            ancestors.push(this);
        }

        for (var i = 0; i < childNodes.length; i++) {
            var child = childNodes[i];
            var suitable = (!formatNode || !dom.isAncestorOrSelf(formatNode, child)) && this.suitable(child, nodes);

            if (!suitable) {
                continue;
            }

            if (formatNode && this.isList(child)) {
                // merging lists
                $.each(child.childNodes, pushAncestor);
                dom.remove(child);
            } else {
                ancestors.push(child);
            }
        }

        if (ancestors.length == childNodes.length && this.breakable(commonAncestor)) {
            ancestors = [commonAncestor];
        }

        if (!formatNode) {
            formatNode = dom.create(commonAncestor.ownerDocument, tag);
            dom.insertBefore(formatNode, ancestors[0]);
        }

        this.wrap(formatNode, ancestors);

        if (!dom.is(formatNode, tag)) {
            dom.changeTag(formatNode, tag);
        }

        this.merge(tag, formatNode);
    },

    apply: function (nodes) {
        var i = 0,
            sections = [],
            lastSection,
            lastNodes,
            section;

        // split nodes into sections that need to be different lists
        do {
            section = dom.closestEditable(nodes[i], ["td","body"]);

            if (!lastSection || section != lastSection) {
                if (lastSection) {
                    sections.push({
                        section: lastSection,
                        nodes: lastNodes
                    });
                }

                lastNodes = [nodes[i]];
                lastSection = section;
            } else {
                lastNodes.push(nodes[i]);
            }

            i++;
        } while (i < nodes.length);

        sections.push({
            section: lastSection,
            nodes: lastNodes
        });

        for (i = 0; i < sections.length; i++) {
            this.applyOnSection(sections[i].section, sections[i].nodes);
        }
    },

    unwrap: function(ul) {
        var fragment = ul.ownerDocument.createDocumentFragment(),
            unwrapTag = this.unwrapTag,
            parents,
            li,
            p,
            child;

        for (li = ul.firstChild; li; li = li.nextSibling) {
            p = dom.create(ul.ownerDocument, unwrapTag || 'p');

            while(li.firstChild) {
                child = li.firstChild;

                if (dom.isBlock(child)) {

                    if (p.firstChild) {
                        fragment.appendChild(p);
                        p = dom.create(ul.ownerDocument, unwrapTag || 'p');
                    }

                    fragment.appendChild(child);
                } else {
                    p.appendChild(child);
                }
            }

            if (p.firstChild) {
                fragment.appendChild(p);
            }
        }

        parents = $(ul).parents('ul,ol');

        if (parents[0]) {
            dom.insertAfter(fragment, parents.last()[0]);
            parents.last().remove();
        } else {
            dom.insertAfter(fragment, ul);
        }

        dom.remove(ul);
    },

    remove: function (nodes) {
        var formatNode;
        for (var i = 0, l = nodes.length; i < l; i++) {
            formatNode = this.finder.findFormat(nodes[i]);

            if (formatNode) {
                this.unwrap(formatNode);
            }
        }
    },

    toggle: function (range) {
        var that = this,
            nodes = textNodes(range),
            ancestor = range.commonAncestorContainer;

        if (!nodes.length) {
            range.selectNodeContents(ancestor);
            nodes = textNodes(range);
            if (!nodes.length) {
                var text = ancestor.ownerDocument.createTextNode("");
                range.startContainer.appendChild(text);
                nodes = [text];
                range.selectNode(text.parentNode);
            }
        }

        if (that.finder.isFormatted(nodes)) {
            that.split(range);
            that.remove(nodes);
        } else {
            that.apply(nodes);
        }
    }

});

var ListCommand = Command.extend({
    init: function(options) {
        options.formatter = new ListFormatter(options.tag);
        Command.fn.init.call(this, options);
    }
});

var ListTool = FormatTool.extend({
    init: function(options) {
        this.options = options;
        FormatTool.fn.init.call(this, extend(options, {
            finder: new ListFormatFinder(options.tag)
        }));
    },

    command: function (commandArguments) {
        return new ListCommand(extend(commandArguments, { tag: this.options.tag }));
    }
});

extend(Editor, {
    ListFormatFinder: ListFormatFinder,
    ListFormatter: ListFormatter,
    ListCommand: ListCommand,
    ListTool: ListTool
});

registerTool("insertUnorderedList", new ListTool({tag:'ul', template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Remove Link"})}));
registerTool("insertOrderedList", new ListTool({tag:'ol', template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Remove Link"})}));

})(window.kendo.jQuery);
(function($, undefined) {

var kendo = window.kendo,
    Class = kendo.Class,
    extend = $.extend,
    proxy = $.proxy,
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
        cmd.formatter = new LinkFormatter();
        if (!options.url) {
            cmd.attributes = null;
            cmd.async = true;
        } else {
            this.exec = function() {
                this.formatter.apply(options.range, {
                    href: options.url,
                    innerHTML: options.text || options.url,
                    target: options.target
                });
            };
        }
    },

    _dialogTemplate: function() {
        return kendo.template(
            '<div class="k-editor-dialog k-popup-edit-form k-edit-form-container">' +
                "<div class='k-edit-label'>" +
                    "<label for='k-editor-link-url'>#: messages.linkWebAddress #</label>" +
                "</div>" +
                "<div class='k-edit-field'>" +
                    "<input type='text' class='k-input k-textbox' id='k-editor-link-url'>" +
                "</div>" +
                "<div class='k-edit-label k-editor-link-text-row'>" +
                    "<label for='k-editor-link-text'>#: messages.linkText #</label>" +
                "</div>" +
                "<div class='k-edit-field k-editor-link-text-row'>" +
                    "<input type='text' class='k-input k-textbox' id='k-editor-link-text'>" +
                "</div>" +
                "<div class='k-edit-label'>" +
                    "<label for='k-editor-link-title'>#: messages.linkToolTip #</label>" +
                "</div>" +
                "<div class='k-edit-field'>" +
                    "<input type='text' class='k-input k-textbox' id='k-editor-link-title'>" +
                "</div>" +
                "<div class='k-edit-label'></div>" +
                "<div class='k-edit-field'>" +
                    "<input type='checkbox' class='k-checkbox' id='k-editor-link-target'>" +
                    "<label for='k-editor-link-target'>#: messages.linkOpenInNewWindow #</label>" +
                "</div>" +
                "<div class='k-edit-buttons k-state-default'>" +
                    '<button class="k-dialog-insert k-button">#: messages.dialogInsert #</button>' +
                    '<button class="k-dialog-close k-button k-secondary">#: messages.dialogCancel #</button>' +
                "</div>" +
            "</div>"
        )({
            messages: this.editor.options.messages
        });
    },

    exec: function () {
        var collapsed = this.getRange().collapsed;
        var messages = this.editor.options.messages;

        this._initialText = "";
        this._range = this.lockRange(true);
        var nodes = textNodes(this._range);

        var a = nodes.length ? this.formatter.finder.findSuitable(nodes[0]) : null;
        var img = nodes.length && dom.name(nodes[0]) == "img";

        var dialog = this.createDialog(this._dialogTemplate(), {
            title: messages.createLink,
            close: proxy(this._close, this),
            visible: false
        });

        dialog
            .find(".k-dialog-insert").click(proxy(this._apply, this)).end()
            .find(".k-dialog-close").click(proxy(this._close, this)).end()
            .find(".k-edit-field input").keydown(proxy(this._keydown, this)).end()
            .find("#k-editor-link-url").val(this.linkUrl(a)).end()
            .find("#k-editor-link-text").val(this.linkText(nodes)).end()
            .find("#k-editor-link-title").val(a ? a.title : "").end()
            .find("#k-editor-link-target").attr("checked", a ? a.target == "_blank" : false).end()
            .find(".k-editor-link-text-row").toggle(!img);


        if (nodes.length > 0 && !collapsed) {
            this._initialText = $("#k-editor-link-text", dialog).val();
        }

        this._dialog = dialog.data("kendoWindow").center().open();

        $("#k-editor-link-url", dialog).focus().select();
    },

    _keydown: function (e) {
        var keys = kendo.keys;

        if (e.keyCode == keys.ENTER) {
            this._apply(e);
        } else if (e.keyCode == keys.ESC) {
            this._close(e);
        }
    },

    _apply: function (e) {
        var element = this._dialog.element;
        var href = $("#k-editor-link-url", element).val();
        var title, text, target;
        var textInput = $("#k-editor-link-text", element);

        if (href && href != "http://") {

            if (href.indexOf("@") > 0 && !/^(\w+:)|(\/\/)/i.test(href)) {
                href = "mailto:" + href;
            }

            this.attributes = { href: href };

            title = $("#k-editor-link-title", element).val();
            if (title) {
                this.attributes.title = title;
            }

            if (textInput.is(":visible")) {
                text = textInput.val();
                if (!text && !this._initialText) {
                    this.attributes.innerHTML = href;
                } else if (text && (text !== this._initialText)) {
                    this.attributes.innerHTML = dom.stripBom(text);
                }
            }

            target = $("#k-editor-link-target", element).is(":checked");
            this.attributes.target = target ? "_blank" : null;

            this.formatter.apply(this._range, this.attributes);
        }

        this._close(e);

        if (this.change) {
            this.change();
        }
    },

    _close: function (e) {
        e.preventDefault();
        this._dialog.destroy();

        dom.windowFromDocument(RangeUtils.documentFromRange(this._range)).focus();

        this.releaseRange(this._range);
    },

    linkUrl: function(anchor) {
        if (anchor) {
            // IE < 8 returns absolute url if getAttribute is not used
            return anchor.getAttribute("href", 2);
        }

        return "http://";
    },

    linkText: function (nodes) {
        var text = "";

        if (nodes.length == 1) {
            text = nodes[0].nodeValue;
        } else if (nodes.length) {
            text = nodes[0].nodeValue + nodes[1].nodeValue;
        }

        return dom.stripBom(text || "");
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
(function($, undefined) {

var kendo = window.kendo,
    extend = $.extend,
    Editor = kendo.ui.editor,
    EditorUtils = Editor.EditorUtils,
    dom = Editor.Dom,
    registerTool = EditorUtils.registerTool,
    ToolTemplate = Editor.ToolTemplate,
    RangeUtils = Editor.RangeUtils,
    Command = Editor.Command,
    keys = kendo.keys,
    KEDITORIMAGEURL = "#k-editor-image-url",
    KEDITORIMAGETITLE = "#k-editor-image-title";

var ImageCommand = Command.extend({
    init: function(options) {
        var that = this;
        Command.fn.init.call(that, options);

        that.async = true;
        that.attributes = {};
    },

    insertImage: function(img, range) {
        var attributes = this.attributes;
        var doc = RangeUtils.documentFromRange(range);

        if (attributes.src && attributes.src != "http://") {
            if (!img) {
                img = dom.create(doc, "img", attributes);
                img.onload = img.onerror = function () {
                        img.removeAttribute("complete");
                        img.removeAttribute("width");
                        img.removeAttribute("height");
                    };

                range.deleteContents();
                range.insertNode(img);

                if (!img.nextSibling) {
                    dom.insertAfter(doc.createTextNode("\ufeff"), img);
                }

                range.setStartAfter(img);
                range.setEndAfter(img);
                RangeUtils.selectRange(range);
                return true;
            } else {
                dom.attr(img, attributes);
            }
        }

        return false;
    },

    _dialogTemplate: function(showBrowser) {
        return kendo.template(
            '<div class="k-editor-dialog k-popup-edit-form k-edit-form-container">' +
                '# if (showBrowser) { #' +
                    '<div class="k-imagebrowser"></div>' +
                '# } #' +
                "<div class='k-edit-label'>" +
                    '<label for="k-editor-image-url">#: messages.imageWebAddress #</label>' +
                "</div>" +
                "<div class='k-edit-field'>" +
                    '<input type="text" class="k-input k-textbox" id="k-editor-image-url">' +
                "</div>" +
                "<div class='k-edit-label'>" +
                    '<label for="k-editor-image-title">#: messages.imageAltText #</label>' +
                "</div>" +
                "<div class='k-edit-field'>" +
                    '<input type="text" class="k-input k-textbox" id="k-editor-image-title">' +
                "</div>" +
                '<div class="k-edit-buttons k-state-default">' +
                    '<button class="k-dialog-insert k-button">#: messages.dialogInsert #</button>' +
                    '<button class="k-dialog-close k-button k-secondary">#: messages.dialogCancel #</button>' +
                '</div>' +
            '</div>'
        )({
            messages: this.editor.options.messages,
            showBrowser: showBrowser
        });
    },

    redo: function () {
        var that = this,
            range = that.lockRange();

        if (!that.insertImage(RangeUtils.image(range), range)) {
            that.releaseRange(range);
        }
    },

    exec: function () {
        var that = this,
            range = that.lockRange(),
            applied = false,
            img = RangeUtils.image(range),
            dialog,
            options = that.editor.options,
            messages = options.messages,
            imageBrowser = options.imageBrowser,
            showBrowser = !!(kendo.ui.ImageBrowser && imageBrowser && imageBrowser.transport && imageBrowser.transport.read !== undefined);

        function apply(e) {
            var element = dialog.element;

            that.attributes = {
                src: element.find(KEDITORIMAGEURL).val().replace(/ /g, "%20"),
                alt: element.find(KEDITORIMAGETITLE).val()
            };

            applied = that.insertImage(img, range);

            close(e);

            if (that.change) {
                that.change();
            }
        }

        function close(e) {
            e.preventDefault();
            dialog.destroy();

            dom.windowFromDocument(RangeUtils.documentFromRange(range)).focus();
            if (!applied) {
                that.releaseRange(range);
            }
        }

        function keyDown(e) {
            if (e.keyCode == keys.ENTER) {
                apply(e);
            } else if (e.keyCode == keys.ESC) {
                close(e);
            }
        }

        dialog = this.createDialog(that._dialogTemplate(showBrowser), {
            title: messages.insertImage,
            close: close,
            visible: false,
            resizable: showBrowser
        })
            .toggleClass("k-imagebrowser-dialog", showBrowser)
            .find(".k-dialog-insert").click(apply).end()
            .find(".k-dialog-close").click(close).end()
            .find(".k-edit-field input").keydown(keyDown).end()
            // IE < 8 returns absolute url if getAttribute is not used
            .find(KEDITORIMAGEURL).val(img ? img.getAttribute("src", 2) : "http://").end()
            .find(KEDITORIMAGETITLE).val(img ? img.alt : "").end()
            .data("kendoWindow");

        if (showBrowser) {
            new kendo.ui.ImageBrowser(
                dialog.element.find(".k-imagebrowser"),
                extend({}, imageBrowser, {
                    change: function() {
                        dialog.element.find(KEDITORIMAGEURL).val(this.value());
                    },
                    apply: apply
                })
            );
        }

        dialog.center().open();
        dialog.element.find(KEDITORIMAGEURL).focus().select();
    }

});

kendo.ui.editor.ImageCommand = ImageCommand;

registerTool("insertImage", new Editor.Tool({ command: ImageCommand, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Insert Image" }) }));

})(window.kendo.jQuery);(function($, undefined) {

var kendo = window.kendo,
    DropDownList = kendo.ui.DropDownList,
    dom = kendo.ui.editor.Dom;

var SelectBox = DropDownList.extend({
    init: function(element, options) {
        var that = this;

        DropDownList.fn.init.call(that, element, options);

        that.value(that.options.title);

        // overlay drop-down with popout for snappier interaction
        if (kendo.support.mobileOS.ios) {
            that._initSelectOverlay();
        }

        that.bind("open", function() {
            if (that.options.autoSize) {
                var list = that.list,
                    listWidth;

                list.css({
                        whiteSpace: "nowrap",
                        width: "auto"
                    });

                listWidth = list.width();

                if (listWidth) {
                    listWidth += 20;
                } else {
                    listWidth = that._listWidth;
                }

                list.css("width", listWidth + kendo.support.scrollbar());

                that._listWidth = listWidth;
            }
        });
    },
    options: {
        name: "SelectBox"
    },

    _initSelectOverlay: function() {
        var element = $(this.element);
        var select = $("<select class='k-select-overlay' />");
        var wrapper = element.closest(".k-widget");
        var selectBox = this;

        select.on("change", function() {
            selectBox.value(this.value);
            selectBox.trigger("change");
        });

        this.bind("dataBound", function() {
            var value = selectBox.value();
            var view = this.dataSource.view();
            var item;
            var html = "";

            for (var i = 0; i < view.length; i++) {
                item = view[i];

                html += "<option value='" + item.value + "'";

                if (item.value == value) {
                    html += " selected";
                }

                html += ">" + item.text + "</option>";
            }

            select.html(html);
        });

        select.insertAfter(wrapper);
    },

    value: function(value) {
        var that = this,
            result = DropDownList.fn.value.call(that, value);

        if (value === undefined) {
            return result;
        }

        if (value !== DropDownList.fn.value.call(that)) {
           that.text(that.options.title);

           if (that._current) {
               that._current.removeClass("k-state-selected");
           }

           that.current(null);
           that._oldIndex = that.selectedIndex = -1;
        }
    },

    decorate: function(doc) {
        var items = this.dataSource.data(),
            i, tag, className;
        var style;

        for (i = 0; i < items.length; i++) {
            tag = items[i].tag || "span";
            className = items[i].className;

            style = dom.inlineStyle(doc, tag, { className : className });

            style = style.replace(/"/g, "'");

            items[i].style = style + ";display:inline-block";
        }

        this.dataSource.trigger("change");
    }
});


kendo.ui.plugin(SelectBox);
kendo.ui.editor.SelectBox = SelectBox;

})(window.kendo.jQuery);
(function($, undefined) {

// Imports ================================================================
var kendo = window.kendo,
    Class = kendo.Class,
    extend = $.extend,
    Editor = kendo.ui.editor,
    dom = Editor.Dom,
    EditorUtils = Editor.EditorUtils,
    registerTool = EditorUtils.registerTool,
    Command = Editor.Command,
    Tool = Editor.Tool,
    ToolTemplate = Editor.ToolTemplate,
    RangeUtils = Editor.RangeUtils,
    blockElements = dom.blockElements,
    BlockFormatFinder = Editor.BlockFormatFinder,
    BlockFormatter = Editor.BlockFormatter;

function indent(node, value) {
    var isRtl = $(node).css("direction") == "rtl",
        indentDirection = isRtl ? "Right" : "Left",
        property = dom.name(node) != "td" ? "margin" + indentDirection : "padding" + indentDirection;
    if (value === undefined) {
        return node.style[property] || 0;
    } else {
        if (value > 0) {
            node.style[property] = value + "px";
        } else {
            node.style[property] = "";

            if (!node.style.cssText) {
                node.removeAttribute("style");
            }
        }
    }
}

var IndentFormatter = Class.extend({
    init: function() {
        this.finder = new BlockFormatFinder([{tags:dom.blockElements}]);
    },

    apply: function (nodes) {
        var formatNodes = this.finder.findSuitable(nodes),
            targets = [],
            i, len, formatNode, parentList, sibling;

        if (formatNodes.length) {
            for (i = 0, len = formatNodes.length; i < len; i++) {
                if (dom.is(formatNodes[i], "li")) {
                    if (!$(formatNodes[i]).index()) {
                        targets.push(formatNodes[i].parentNode);
                    } else if ($.inArray(formatNodes[i].parentNode, targets) < 0) {
                        targets.push(formatNodes[i]);
                    }
                } else {
                    targets.push(formatNodes[i]);
                }
            }

            while (targets.length) {
                formatNode = targets.shift();
                if (dom.is(formatNode, "li")) {
                    parentList = formatNode.parentNode;
                    sibling = $(formatNode).prev("li");
                    var siblingList = sibling.find("ul,ol").last();

                    var nestedList = $(formatNode).children("ul,ol")[0];

                    if (nestedList && sibling[0]) {
                        if (siblingList[0]) {
                           siblingList.append(formatNode);
                           siblingList.append($(nestedList).children());
                           dom.remove(nestedList);
                        } else {
                            sibling.append(nestedList);
                            nestedList.insertBefore(formatNode, nestedList.firstChild);
                        }
                    } else {
                        nestedList = sibling.children("ul,ol")[0];
                        if (!nestedList) {
                            nestedList = dom.create(formatNode.ownerDocument, dom.name(parentList));
                            sibling.append(nestedList);
                        }

                        while (formatNode && formatNode.parentNode == parentList) {
                            nestedList.appendChild(formatNode);
                            formatNode = targets.shift();
                        }
                    }
                } else {
                    var marginLeft = parseInt(indent(formatNode), 10) + 30;
                    indent(formatNode, marginLeft);

                    for (var targetIndex = 0; targetIndex < targets.length; targetIndex++) {
                        if ($.contains(formatNode, targets[targetIndex])) {
                            targets.splice(targetIndex, 1);
                        }
                    }
                }
            }
        } else {
            var formatter = new BlockFormatter([{tags:["p"]}], {style:{marginLeft:30}});

            formatter.apply(nodes);
        }
    },

    remove: function(nodes) {
        var formatNodes = this.finder.findSuitable(nodes),
            targetNode, i, len, list, listParent, siblings,
            formatNode, marginLeft;

        for (i = 0, len = formatNodes.length; i < len; i++) {
            formatNode = $(formatNodes[i]);

            if (formatNode.is("li")) {
                list = formatNode.parent();
                listParent = list.parent();
                // listParent will be ul or ol in case of invalid dom - <ul><li></li><ul><li></li></ul></ul>
                if (listParent.is("li,ul,ol") && !indent(list[0])) {
                    // skip already processed nodes
                    if (targetNode && $.contains(targetNode, listParent[0])) {
                        continue;
                    }

                    siblings = formatNode.nextAll("li");
                    if (siblings.length) {
                        $(list[0].cloneNode(false)).appendTo(formatNode).append(siblings);
                    }

                    if (listParent.is("li")) {
                        formatNode.insertAfter(listParent);
                    } else {
                        formatNode.appendTo(listParent);
                    }

                    if (!list.children("li").length) {
                        list.remove();
                    }

                    continue;
                } else {
                    if (targetNode == list[0]) {
                        // removing format on sibling LI elements
                        continue;
                    }
                    targetNode = list[0];
                }
            } else {
                targetNode = formatNodes[i];
            }

            marginLeft = parseInt(indent(targetNode), 10) - 30;
            indent(targetNode, marginLeft);
        }
    }

});

var IndentCommand = Command.extend({
    init: function(options) {
        options.formatter = /** @ignore */ {
            toggle : function(range) {
                new IndentFormatter().apply(RangeUtils.nodes(range));
            }
        };
        Command.fn.init.call(this, options);
    }
});

var OutdentCommand = Command.extend({
    init: function(options) {
        options.formatter = {
            toggle : function(range) {
                new IndentFormatter().remove(RangeUtils.nodes(range));
            }
        };
        Command.fn.init.call(this, options);
    }
});

var OutdentTool = Tool.extend({
    init: function(options) {
        Tool.fn.init.call(this, options);

        this.finder = new BlockFormatFinder([{tags:blockElements}]);
    },

    initialize: function(ui, options) {
        Tool.fn.initialize.call(this, ui, options);
        ui.addClass("k-state-disabled");
    },

    update: function (ui, nodes) {
        var suitable = this.finder.findSuitable(nodes),
            isOutdentable, listParentsCount, i, len;

        for (i = 0, len = suitable.length; i < len; i++) {
            isOutdentable = indent(suitable[i]);

            if (!isOutdentable) {
                listParentsCount = $(suitable[i]).parents("ul,ol").length;
                isOutdentable = (dom.is(suitable[i], "li") && (listParentsCount > 1 || indent(suitable[i].parentNode))) ||
                                (dom.ofType(suitable[i], ["ul","ol"]) && listParentsCount > 0);
            }

            if (isOutdentable) {
                ui.removeClass("k-state-disabled");
                return;
            }
        }

        ui.addClass("k-state-disabled").removeClass("k-state-hover");
    }
});

extend(Editor, {
    IndentFormatter: IndentFormatter,
    IndentCommand: IndentCommand,
    OutdentCommand: OutdentCommand,
    OutdentTool: OutdentTool
});

registerTool("indent", new Tool({ command: IndentCommand, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Indent"}) }));
registerTool("outdent", new OutdentTool({ command: OutdentCommand, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Outdent"})}));

})(window.kendo.jQuery);
(function($, undefined) {

var kendo = window.kendo,
    extend = $.extend,
    Editor = kendo.ui.editor,
    EditorUtils = Editor.EditorUtils,
    Command = Editor.Command,
    Tool = Editor.Tool,
    ToolTemplate = Editor.ToolTemplate;

var ViewHtmlCommand = Command.extend({
    init: function(options) {
        var cmd = this;
        cmd.options = options;
        Command.fn.init.call(cmd, options);
        cmd.attributes = null;
        cmd.async = true;
    },

    exec: function() {
        var that = this,
            editor = that.editor,
            messages = editor.options.messages,
            dialog = $(kendo.template(ViewHtmlCommand.template)(messages)).appendTo(document.body),
            content = ViewHtmlCommand.indent(editor.value()),
            textarea = ".k-editor-textarea";

        function apply(e) {
            editor.value(dialog.find(textarea).val());

            close(e);

            if (that.change) {
                that.change();
            }

            editor.trigger("change");
        }

        function close(e) {
            e.preventDefault();

            dialog.data("kendoWindow").destroy();

            editor.focus();
        }

        this.createDialog(dialog, {
            title: messages.viewHtml,
            close: close,
            visible: false
        })
            .find(textarea).val(content).end()
            .find(".k-dialog-update").click(apply).end()
            .find(".k-dialog-close").click(close).end()
            .data("kendoWindow").center().open();

        dialog.find(textarea).focus();
    }
});

extend(ViewHtmlCommand, {
    template: "<div class='k-editor-dialog k-popup-edit-form k-edit-form-container k-viewhtml-dialog'>" +
                "<textarea class='k-editor-textarea k-input'></textarea>" +
                "<div class='k-edit-buttons k-state-default'>" +
                    "<button class='k-dialog-update k-button'>#: dialogUpdate #</button>" +
                    "<button class='k-dialog-close k-button k-secondary'>#: dialogCancel #</button>" +
                "</div>" +
            "</div>",
    indent: function(content) {
        return content.replace(/<\/(p|li|ul|ol|h[1-6]|table|tr|td|th)>/ig, "</$1>\n")
                      .replace(/<(ul|ol)([^>]*)><li/ig, "<$1$2>\n<li")
                      .replace(/<br \/>/ig, "<br />\n")
                      .replace(/\n$/, "");
    }
});

kendo.ui.editor.ViewHtmlCommand = ViewHtmlCommand;

Editor.EditorUtils.registerTool("viewHtml", new Tool({ command: ViewHtmlCommand, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "View HTML"})}));

})(window.kendo.jQuery);
(function($) {

var kendo = window.kendo,
    Editor = kendo.ui.editor,
    Tool = Editor.Tool,
    ToolTemplate = Editor.ToolTemplate,
    DelayedExecutionTool = Editor.DelayedExecutionTool,
    dom = Editor.Dom,
    dropDownListTemplate = Editor.EditorUtils.dropDownListTemplate,
    registerTool = Editor.EditorUtils.registerTool;


var FormattingTool = DelayedExecutionTool.extend({
    init: function(options) {
        var that = this;
        Tool.fn.init.call(that, kendo.deepExtend({}, that.options, options));

        that.type = "kendoSelectBox";

        that.finder = {
            getFormat: function() { return ""; }
        };
    },

    options: {
        items: [
            { text: "Paragraph", value: "p" },
            { text: "Quotation", value: "blockquote" },
            { text: "Heading 1", value: "h1" },
            { text: "Heading 2", value: "h2" },
            { text: "Heading 3", value: "h3" },
            { text: "Heading 4", value: "h4" },
            { text: "Heading 5", value: "h5" },
            { text: "Heading 6", value: "h6" }
        ],
        width: 90
    },

    toFormattingItem: function(item) {
        var value = item.value;

        if (!value) {
            return item;
        }

        if (item.tag || item.className) {
            return item;
        }

        var dot = value.indexOf(".");

        if (dot === 0) {
            item.className = value.substring(1);
        } else if (dot == -1) {
            item.tag = value;
        } else {
            item.tag = value.substring(0, dot);
            item.className = value.substring(dot + 1);
        }

        return item;
    },

    command: function (args) {
        var item = args.value;

        item = this.toFormattingItem(item);

        return new Editor.FormatCommand({
            range: args.range,
            formatter: function () {
                var formatter,
                    tags = (item.tag || item.context || "span").split(","),
                    format = [{
                        tags: tags,
                        attr: { className: item.className || "" }
                    }];

                if ($.inArray(tags[0], dom.inlineElements) >= 0) {
                    formatter = new Editor.GreedyInlineFormatter(format);
                } else {
                    formatter = new Editor.GreedyBlockFormatter(format);
                }

                return formatter;
            }
        });
    },

    initialize: function(ui, initOptions) {
        var editor = initOptions.editor;
        var options = this.options;
        var toolName = options.name;
        var that = this;

        ui.width(options.width);

        ui.kendoSelectBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: options.items || editor.options[toolName],
            title: editor.options.messages[toolName],
            autoSize: true,
            change: function () {
                Tool.exec(editor, toolName, this.dataItem().toJSON());
            },
            dataBound: function() {
                var i, items = this.dataSource.data();

                for (i = 0; i < items.length; i++) {
                    items[i] = that.toFormattingItem(items[i]);
                }
            },
            highlightFirst: false,
            template: kendo.template(
                '<span unselectable="on" style="display:block;#=(data.style||"")#">#:data.text#</span>'
            )
        });

        ui.addClass("k-decorated")
            .closest(".k-widget")
                .removeClass("k-" + toolName)
                .find("*").addBack()
                    .attr("unselectable", "on");
    },

    getFormattingValue: function(items, nodes) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var tag = item.tag || item.context || "";
            var className = item.className ? "."+item.className : "";
            var selector = tag + className;

            var element = $(nodes[0]).closest(selector)[0];

            if (!element) {
                continue;
            }

            if (nodes.length == 1) {
                return item.value;
            }

            for (var n = 1; n < nodes.length; n++) {
                if ($(nodes[n]).closest(selector)[0] != element) {
                    break;
                } else if (n == nodes.length - 1) {
                    return item.value;
                }
            }
        }

        return "";
    },

    update: function(ui, nodes) {
        var selectBox = $(ui).data(this.type);

        // necessary until formatBlock is deleted
        if (!selectBox) {
            return;
        }

        var dataSource = selectBox.dataSource,
            items = dataSource.data(),
            i, context,
            ancestor = dom.commonAncestor.apply(null, nodes);

        for (i = 0; i < items.length; i++) {
            context = items[i].context;

            items[i].visible = !context || !!$(ancestor).closest(context).length;
        }

        dataSource.filter([{ field: "visible", operator: "eq", value: true }]);

        DelayedExecutionTool.fn.update.call(this, ui, nodes);

        selectBox.value(this.getFormattingValue(dataSource.view(), nodes));

        selectBox.wrapper.toggleClass("k-state-disabled", !dataSource.view().length);
    }
});

function deprecatedFormattingTool(name, property, finder) {
    return FormattingTool.extend({
        init: function(options) {
            FormattingTool.fn.init.call(this, options);

            this.finder = finder;
        },

        command: function(args) {
            var item = args.value;

            // pre-process value for backwards compatibility
            if ($.isPlainObject(item)) {
                item[property] = item.value;
            } else {
                args.value = {};
                args.value[property] = item;
            }

            return FormattingTool.fn.command.call(this, args);
        },

        initialize: function(ui, initOptions) {
            var console = window.console,
                i, items = this.options.items;

            for (i = 0; i < items.length; i++) {
                items[i][property] = items[i].value;
            }

            if (console) {
                console.warn("The `" + this.options.name + "` tool has been deprecated in favor of the `formatting` tool. See http://docs.kendoui.com/getting-started/changes-and-backward-compatibility for more information");
            }

            FormattingTool.fn.initialize.call(this, ui, initOptions);
        }
    });
}

var StyleTool = deprecatedFormattingTool("style", "className", new Editor.GreedyInlineFormatFinder([{ tags: ["span"] }], "className"));
var FormatBlockTool = deprecatedFormattingTool("formatBlock", "tag", new Editor.BlockFormatFinder([{ tags: dom.blockElements }]));

$.extend(Editor, {
    FormattingTool: FormattingTool,
    StyleTool: StyleTool,
    FormatBlockTool: FormatBlockTool
});

registerTool("formatting", new FormattingTool({template: new ToolTemplate({template: dropDownListTemplate, title: "Format"})}));

registerTool("style", new StyleTool({template: new ToolTemplate({template: dropDownListTemplate, title: "Styles"})}));
registerTool("formatBlock", new FormatBlockTool({template: new ToolTemplate({template: dropDownListTemplate})}));

})(window.kendo.jQuery);
(function($,undefined) {
    var kendo = window.kendo;
    var ui = kendo.ui;
    var editorNS = ui.editor;
    var Widget = ui.Widget;
    var extend = $.extend;
    var proxy = $.proxy;
    var keys = kendo.keys;
    var NS = ".kendoEditor";

    var focusable = "a.k-tool:not(.k-state-disabled)," +
                    ".k-widget.k-colorpicker,.k-selectbox,.k-dropdown,.k-combobox .k-input";

    var Toolbar = Widget.extend({
        init: function(element, options) {
            var that = this;

            options = extend({}, options, { name: "EditorToolbar" });

            Widget.fn.init.call(that, element, options);

            if (options.popup) {
                that._initPopup();
            }
        },

        events: [
            "execute"
        ],

        groups: {
            basic: ["bold", "italic", "underline", "strikethrough"],
            scripts: ["subscript", "superscript" ],
            alignment: ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull" ],
            links: ["insertImage", "createLink", "unlink"],
            lists: ["insertUnorderedList", "insertOrderedList", "indent", "outdent"],
            tables: [ "createTable", "addColumnLeft", "addColumnRight", "addRowAbove", "addRowBelow", "deleteRow", "deleteColumn" ],
            advanced: [ "viewHtml" ]
        },

        _initPopup: function() {
            this.window = $(this.element)
                .wrap("<div class='editorToolbarWindow k-header' />")
                .parent()
                .prepend("<button class='k-button k-button-bare k-editortoolbar-dragHandle'><span class='k-icon k-i-move' /></button>")
                .kendoWindow({
                    title: false,
                    resizable: false,
                    draggable: {
                        dragHandle: ".k-editortoolbar-dragHandle"
                    },
                    animation: {
                        open: { effects: "fade:in" },
                        close: { effects: "fade:out" }
                    },
                    minHeight: 42,
                    visible: false,
                    autoFocus: false,
                    actions: [],
                    dragend: function() {
                        this._moved = true;
                    }
                })
                .on("mousedown", function(e){
                    if (!$(e.target).is(".k-icon")) {
                        e.preventDefault();
                    }
                })
                .data("kendoWindow");
        },

        items: function() {
            return this.element.children().find("> *, select");
        },

        focused: function() {
            return this.element.find(".k-state-focused").length > 0;
        },

        toolById: function(name) {
            var id, tools = this.tools;

            for (id in tools) {
                if (id.toLowerCase() == name) {
                    return tools[id];
                }
            }
        },

        toolGroupFor: function(toolName) {
            var i, groups = this.groups;

            if (this.isCustomTool(toolName)) {
                return "custom";
            }

            for (i in groups) {
                if ($.inArray(toolName, groups[i]) >= 0) {
                    return i;
                }
            }
        },

        bindTo: function(editor) {
            var that = this,
                window = that.window;

            // detach from editor that was previously listened to
            if (that._editor) {
                that._editor.unbind("select", proxy(that._update, that));
            }

            that._editor = editor;

            // re-initialize the tools
            that.tools = that.expandTools(editor.options.tools);
            that.render();

            that.element.find(".k-combobox .k-input").keydown(function(e) {
                var combobox = $(this).closest(".k-combobox").data("kendoComboBox"),
                    key = e.keyCode;

                if (key == keys.RIGHT || key == keys.LEFT) {
                    combobox.close();
                } else if (key == keys.DOWN) {
                    if (!combobox.dropDown.isOpened()) {
                        e.stopImmediatePropagation();
                        combobox.open();
                    }
                }
            });

            that._attachEvents();

            that.items().each(function initializeTool() {
                var toolName = that._toolName(this),
                    tool = that.tools[toolName],
                    options = tool && tool.options,
                    messages = editor.options.messages,
                    description = options && options.tooltip || messages[toolName],
                    ui = $(this);

                if (!tool || !tool.initialize) {
                    return;
                }

                if (toolName == "fontSize" || toolName == "fontName") {
                    var inheritText = messages[toolName + "Inherit"];

                    ui.find("input").val(inheritText).end()
                      .find("span.k-input").text(inheritText).end();
                }

                tool.initialize(ui, {
                    title: that._appendShortcutSequence(description, tool),
                    editor: that._editor
                });

                ui.closest(".k-widget", that.element).addClass("k-editor-widget");

                ui.closest(".k-colorpicker", that.element).next(".k-colorpicker").addClass("k-editor-widget");
            });

            editor.bind("select", proxy(that._update, that));

            that._updateContext();

            if (window) {
                window.wrapper.css({top: "", left: "", width: ""});
            }
        },

        show: function() {
            var that = this,
                window = that.window,
                editorOptions = that.options.editor,
                wrapper, editorElement;

            if (window) {
                wrapper = window.wrapper;
                editorElement = editorOptions.element;

                if (!wrapper.is(":visible") || !that.window.options.visible) {

                    if (!wrapper[0].style.width) {
                        wrapper.width(editorElement.outerWidth() - parseInt(wrapper.css("border-left-width"), 10) - parseInt(wrapper.css("border-right-width"), 10));
                    }

                    // track content position when other parts of page change
                    if (!window._moved) {
                        wrapper.css("top", parseInt(editorElement.offset().top, 10) - wrapper.outerHeight() - parseInt(that.window.element.css("padding-bottom"), 10));
                        wrapper.css("left", parseInt(editorElement.offset().left, 10));
                    }

                    window.open();
                }
            }
        },

        hide: function() {
            if (this.window) {
                this.window.close();
            }
        },

        focus: function() {
            var TABINDEX = "tabIndex";
            var element = this.element;
            var tabIndex = this._editor.element.attr(TABINDEX);

            // Chrome can't focus something which has already been focused
            element.attr(TABINDEX, tabIndex || 0).focus()
                .find(focusable).first().focus();

            if (!tabIndex && tabIndex !== 0) {
                element.removeAttr(TABINDEX);
            }
        },

        _appendShortcutSequence: function(localizedText, tool) {
            if (!tool.key) {
                return localizedText;
            }

            var res = localizedText + " (";

            if (tool.ctrl) {
                res += "Ctrl + ";
            }

            if (tool.shift) {
                res += "Shift + ";
            }

            if (tool.alt) {
                res += "Alt + ";
            }

            res += tool.key + ")";

            return res;
        },

        _nativeTools: [
            "insertLineBreak",
            "insertParagraph",
            "redo",
            "undo"
        ],

        tools: {}, // tools collection is copied from defaultTools during initialization

        isCustomTool: function(toolName) {
            return !(toolName in kendo.ui.Editor.defaultTools);
        },

        // expand the tools parameter to contain tool options objects
        expandTools: function(tools) {
            var currentTool,
                i,
                nativeTools = this._nativeTools,
                options,
                defaultTools = kendo.deepExtend({}, kendo.ui.Editor.defaultTools),
                result = {},
                name;

            for (i = 0; i < tools.length; i++) {
                currentTool = tools[i];
                name = currentTool.name;

                if ($.isPlainObject(currentTool)) {
                    if (name && defaultTools[name]) {
                        // configured tool
                        result[name] = extend({}, defaultTools[name]);
                        extend(result[name].options, currentTool);
                    } else {
                        // custom tool
                        options = extend({ cssClass: "k-i-custom", type: "button", title: "" }, currentTool);
                        if (!options.name) {
                            options.name = "custom";
                        }

                        options.cssClass = "k-" + (options.name == "custom" ? "i-custom" : options.name);

                        if (!options.template && options.type == "button") {
                            options.template = editorNS.EditorUtils.buttonTemplate;
                            options.title = options.title || options.tooltip;
                        }

                        result[name] = {
                            options: options
                        };
                    }
                } else if (defaultTools[currentTool]) {
                    // tool by name
                    result[currentTool] = defaultTools[currentTool];
                }
            }

            for (i = 0; i < nativeTools.length; i++) {
                if (!result[nativeTools[i]]) {
                    result[nativeTools[i]] = defaultTools[nativeTools[i]];
                }
            }

            return result;
        },

        render: function() {
            var that = this,
                tools = that.tools,
                options, template, toolElement,
                toolName,
                editorElement = that._editor.element,
                element = that.element.empty(),
                groupName, newGroupName,
                toolConfig = that._editor.options.tools,
                browser = kendo.support.browser,
                group, i;

            function stringify(template) {
                var result;

                if (template.getHtml) {
                    result = template.getHtml();
                } else {
                    if (!$.isFunction(template)) {
                        template = kendo.template(template);
                    }

                    result = template(options);
                }

                return $.trim(result);
            }

            function endGroup() {
                if (group.children().length) {
                    group.appendTo(element);
                }
            }

            function startGroup() {
                group = $("<li class='k-tool-group' role='presentation' />");
            }

            element.empty();

            startGroup();

            for (i = 0; i < toolConfig.length; i++) {
                toolName = toolConfig[i].name || toolConfig[i];
                options = tools[toolName] && tools[toolName].options;

                if (!options && $.isPlainObject(toolName)) {
                    options = toolName;
                }

                template = options && options.template;

                if (toolName == "break") {
                    endGroup();
                    $("<li class='k-row-break' />").appendTo(that.element);
                    startGroup();
                }

                if (!template) {
                    continue;
                }

                newGroupName = that.toolGroupFor(toolName);

                if (groupName != newGroupName) {
                    endGroup();
                    startGroup();
                    groupName = newGroupName;
                }

                template = stringify(template);

                toolElement = $(template).appendTo(group);

                if (newGroupName == "custom") {
                    endGroup();
                    startGroup();
                }

                if (options.exec && toolElement.hasClass("k-tool")) {
                    toolElement.click(proxy(options.exec, editorElement[0]));
                }
            }

            endGroup();

            $(that.element).children(":has(> .k-tool)").addClass("k-button-group");

            if (that.options.popup && browser.msie && browser.version < 9) {
                that.window.wrapper.find("*").attr("unselectable", "on");
            }

            this.updateGroups();
        },

        updateGroups: function() {
            $(this.element).children().each(function() {
                $(this).children().filter(function(){
                    return this.style.display !== "none";
                })
                    .first().addClass("k-group-start").end()
                    .last().addClass("k-group-end").end();
            });
        },

        destroy: function() {
            Widget.fn.destroy.call(this);

            var id, tools = this.tools;

            for (id in tools) {
                if (tools[id].destroy) {
                    tools[id].destroy();
                }
            }

            if (this.window) {
                this.window.destroy();
            }
        },

        _attachEvents: function() {
            var that = this,
                buttons = "[role=button].k-tool",
                enabledButtons = buttons + ":not(.k-state-disabled)",
                disabledButtons = buttons + ".k-state-disabled";

            that.element
                .off(NS)
                .on("mouseenter" + NS, enabledButtons, function() { $(this).addClass("k-state-hover"); })
                .on("mouseleave" + NS, enabledButtons, function() { $(this).removeClass("k-state-hover"); })
                .on("mousedown" + NS, buttons, function(e) {
                    e.preventDefault();
                })
                .on("keydown" + NS, focusable, function(e) {
                    var current = this;
                    var focusElement,
                        keyCode = e.keyCode;

                    function move(direction, constrain) {
                        var tools = that.element.find(focusable);
                        var index = tools.index(current) + direction;

                        if (constrain) {
                            index = Math.max(0, Math.min(tools.length - 1, index));
                        }

                        return tools[index];
                    }

                    if (keyCode == keys.RIGHT || keyCode == keys.LEFT) {
                        if (!$(current).hasClass(".k-dropdown")) {
                            focusElement = move(keyCode == keys.RIGHT ? 1 : -1, true);
                        }
                    } else if (keyCode == keys.ESC) {
                        focusElement = that._editor;
                    } else if (keyCode == keys.TAB && !(e.ctrlKey || e.altKey)) {
                        // skip tabbing to disabled tools, and focus the editing area when running out of tools
                        if (e.shiftKey) {
                            focusElement = move(-1);
                        } else {
                            focusElement = move(1);

                            if (!focusElement) {
                                focusElement = that._editor;
                            }
                        }
                    }

                    if (focusElement) {
                        e.preventDefault();
                        focusElement.focus();
                    }
                })
                .on("click" + NS, enabledButtons, function(e) {
                    var button = $(this);
                    e.preventDefault();
                    e.stopPropagation();
                    button.removeClass("k-state-hover");
                    if (!button.is("[data-popup]")) {
                        that._editor.exec(that._toolName(this));
                    }
                })
                .on("click" + NS, disabledButtons, function(e) { e.preventDefault(); });

        },


        _toolName: function (element) {
            if (!element) {
                return;
            }

            var className = element.className;

            if (/k-tool\b/i.test(className)) {
                className = element.firstChild.className;
            }

            var tool = $.grep(className.split(" "), function (x) {
                return !/^k-(widget|tool|tool-icon|state-hover|header|combobox|dropdown|selectbox|colorpicker)$/i.test(x);
            });

            return tool[0] ? tool[0].substring(tool[0].lastIndexOf("-") + 1) : "custom";
        },

        // update tool state
        _update: function() {
            var that = this,
                editor = that._editor,
                range = editor.getRange(),
                nodes = kendo.ui.editor.RangeUtils.textNodes(range);

            if (!nodes.length) {
                nodes = [range.startContainer];
            }

            that.items().each(function () {
                var tool = that.tools[that._toolName(this)];
                if (tool && tool.update) {
                    tool.update($(this), nodes);
                }
            });

            this._updateContext();
        },

        _updateContext: function() {
            this.element.children().children().each(function() {
                var tool = $(this);
                tool.css("display", tool.hasClass("k-state-disabled") ? "none" : "");
            });
            this.updateGroups();
        }
    });

$.extend(editorNS, {
    Toolbar: Toolbar
});

})(window.jQuery);
(function($, undefined) {

var kendo = window.kendo,
    extend = $.extend,
    proxy = $.proxy,
    Editor = kendo.ui.editor,
    dom = Editor.Dom,
    EditorUtils = Editor.EditorUtils,
    Command = Editor.Command,
    NS = ".kendoEditor",
    ACTIVESTATE = "k-state-active",
    SELECTEDSTATE = "k-state-selected",
    Tool = Editor.Tool,
    ToolTemplate = Editor.ToolTemplate,
    InsertHtmlCommand = Editor.InsertHtmlCommand,
    BlockFormatFinder = Editor.BlockFormatFinder,
    registerTool = Editor.EditorUtils.registerTool;

var editableCell = "<td contentEditable='true'>" + Editor.emptyElementContent + "</td>";

var tableFormatFinder = new BlockFormatFinder([{tags:["table"]}]);

var TableCommand = InsertHtmlCommand.extend({
    _tableHtml: function(rows, columns) {
        rows = rows || 1;
        columns = columns || 1;

        return "<table class='k-table' contentEditable='false' data-last>" +
                   new Array(rows + 1).join("<tr>" + new Array(columns + 1).join(editableCell) + "</tr>") +
               "</table>";
    },

    postProcess: function(editor, range) {
        var insertedTable = $("table[data-last]", editor.document).removeAttr("data-last");

        range.selectNodeContents(insertedTable.find("td")[0]);

        editor.selectRange(range);
    },

    exec: function() {
        var options = this.options;
        options.html = this._tableHtml(options.rows, options.columns);
        options.postProcess = this.postProcess;

        InsertHtmlCommand.fn.exec.call(this);
    }
});

var PopupTool = Tool.extend({
    initialize: function(ui, options) {
        Tool.fn.initialize.call(this, ui, options);

        var popup = $(this.options.popupTemplate).appendTo("body").kendoPopup({
            anchor: ui,
            copyAnchorStyles: false,
            open: proxy(this._open, this),
            activate: proxy(this._activate, this),
            close: proxy(this._close, this)
        }).data("kendoPopup");

        ui.click(proxy(this._toggle, this));

        this._editor = options.editor;
        this._popup = popup;
    },

    popup: function() {
        return this._popup;
    },

    _activate: $.noop,

    _open: function() {
        this._popup.options.anchor.addClass(ACTIVESTATE);
    },

    _close: function() {
        this._popup.options.anchor.removeClass(ACTIVESTATE);
    },

    _toggle: function(e) {
        var button = $(e.target).closest(".k-tool");

        if (!button.hasClass("k-state-disabled")) {
            this.popup().toggle();
        }
    },

    update: function(ui) {
        this.popup().close();

        ui.removeClass("k-state-hover");
    },

    destroy: function() {
        this._popup.destroy();
    }
});

var InsertTableTool = PopupTool.extend({
    init: function(options) {
        this.cols = 8;
        this.rows = 6;

        PopupTool.fn.init.call(this, $.extend(options, {
            command: TableCommand,
            popupTemplate:
                "<div class='k-ct-popup'>" +
                    new Array(this.cols * this.rows + 1).join("<span class='k-ct-cell k-state-disabled' />") +
                    "<div class='k-status'>Cancel</div>" +
                "</div>"
        }));
    },

    _activate: function() {
        var that = this,
            element = that._popup.element,
            status = element.find(".k-status"),
            cells = element.find(".k-ct-cell"),
            firstCell = cells.eq(0),
            lastCell = cells.eq(cells.length - 1),
            start = kendo.getOffset(firstCell),
            end = kendo.getOffset(lastCell),
            cols = that.cols,
            rows = that.rows,
            cellWidth, cellHeight;

        end.left += lastCell[0].offsetWidth;
        end.top += lastCell[0].offsetHeight;

        cellWidth = (end.left - start.left) / cols;
        cellHeight = (end.top - start.top) / rows;

        function tableFromLocation(e) {
            var w = $(window);
            return {
                row: Math.floor((e.clientY + w.scrollTop() - start.top) / cellHeight) + 1,
                col: Math.floor((e.clientX + w.scrollLeft() - start.left) / cellWidth) + 1
            };
        }

        function valid(p) {
            return p.row > 0 && p.col > 0 && p.row <= rows && p.col <= cols;
        }

        element
            .on("mousemove" + NS, function(e) {
                var t = tableFromLocation(e);

                if (valid(t)) {
                    status.text(kendo.format("Create a {0} x {1} table", t.row, t.col));

                    cells.each(function(i) {
                        $(this).toggleClass(
                            SELECTEDSTATE,
                            i % cols < t.col && i / cols < t.row
                        );
                    });
                } else {
                    status.text("Cancel");
                    cells.removeClass(SELECTEDSTATE);
                }
            })
            .on("mouseleave" + NS, function() {
                cells.removeClass(SELECTEDSTATE);
                status.text("Cancel");
            })
            .on("mouseup" + NS, function(e) {
                var t = tableFromLocation(e);

                if (valid(t)) {
                    that._editor.exec("createTable", {
                        rows: t.row,
                        columns: t.col
                    });
                    that._popup.close();
                }
            });
    },

    _open: function() {
        PopupTool.fn._open.call(this);
        this.popup().element.find(".k-ct-cell").removeClass(SELECTEDSTATE);
    },

    _close: function() {
        PopupTool.fn._close.call(this);
        this.popup().element.off(NS);
    },

    update: function (ui, nodes) {
        var isFormatted;

        PopupTool.fn.update.call(this, ui);

        isFormatted = tableFormatFinder.isFormatted(nodes);
        ui.toggleClass("k-state-disabled", isFormatted);
    }
});

var InsertRowCommand = Command.extend({
    exec: function () {
        var range = this.lockRange(true),
            td = range.endContainer,
            cellCount, row,
            newRow;

        while (dom.name(td) != "td") {
            td = td.parentNode;
        }

        row = td.parentNode;
        cellCount = row.children.length;
        newRow = row.cloneNode(true);

        for (var i = 0; i < row.cells.length; i++) {
            newRow.cells[i].innerHTML = Editor.emptyElementContent;
        }

        if (this.options.position == "before") {
            dom.insertBefore(newRow, row);
        } else {
            dom.insertAfter(newRow, row);
        }

        this.releaseRange(range);
    }
});

var InsertColumnCommand = Command.extend({
    exec: function () {
        var range = this.lockRange(true),
            td = dom.closest(range.endContainer, "td"),
            table = dom.closest(td, "table"),
            columnIndex,
            i,
            rows = table.rows,
            cell,
            newCell,
            position = this.options.position;

        columnIndex = dom.findNodeIndex(td);

        for (i = 0; i < rows.length; i++) {
            cell = rows[i].cells[columnIndex];

            newCell = cell.cloneNode();
            newCell.innerHTML = Editor.emptyElementContent;

            if (position == "before") {
                dom.insertBefore(newCell, cell);
            } else {
                dom.insertAfter(newCell, cell);
            }
        }

        this.releaseRange(range);
    }
});

var DeleteRowCommand = Command.extend({
    exec: function () {
        var range = this.lockRange(),
            row = dom.closest(range.endContainer, "tr"),
            table = dom.closest(row, "table"),
            rowCount = table.rows.length,
            focusElement;

        if (rowCount == 1) {
            focusElement = dom.next(table) || dom.prev(table);

            dom.remove(table);
        } else {
            dom.removeTextSiblings(row);

            focusElement = dom.next(row) || dom.prev(row);
            focusElement = focusElement.cells[0];

            dom.remove(row);
        }

        if (focusElement) {
            range.setStart(focusElement, 0);
            range.collapse(true);
            this.editor.selectRange(range);
        }
    }
});

var DeleteColumnCommand = Command.extend({
    exec: function () {
        var range = this.lockRange(),
            td = dom.closest(range.endContainer, "td"),
            table = dom.closest(td, "table"),
            rows = table.rows,
            columnIndex = dom.findNodeIndex(td, true),
            columnCount = rows[0].cells.length,
            focusElement, i;

        if (columnCount == 1) {
            focusElement = dom.next(table) || dom.prev(table);

            dom.remove(table);
        } else {
            dom.removeTextSiblings(td);

            focusElement = dom.next(td) || dom.prev(td);

            for (i = 0; i < rows.length; i++) {
                dom.remove(rows[i].cells[columnIndex]);
            }
        }

        if (focusElement) {
            range.setStart(focusElement, 0);
            range.collapse(true);
            this.editor.selectRange(range);
        }
    }
});

var TableModificationTool = Tool.extend({
    command: function (options) {
        options = extend(options, this.options);

        if (options.action == "delete") {
            if (options.type == "row") {
                return new DeleteRowCommand(options);
            } else {
                return new DeleteColumnCommand(options);
            }
        } else {
            if (options.type == "row") {
                return new InsertRowCommand(options);
            } else {
                return new InsertColumnCommand(options);
            }
        }
    },

    initialize: function(ui, options) {
        Tool.fn.initialize.call(this, ui, options);
        ui.addClass("k-state-disabled");
    },

    update: function(ui, nodes) {
        var isFormatted = !tableFormatFinder.isFormatted(nodes);
        ui.toggleClass("k-state-disabled", isFormatted);
    }
});

extend(kendo.ui.editor, {
    PopupTool: PopupTool,
    TableCommand: TableCommand,
    InsertTableTool: InsertTableTool,
    TableModificationTool: TableModificationTool,
    InsertRowCommand: InsertRowCommand,
    InsertColumnCommand: InsertColumnCommand,
    DeleteRowCommand: DeleteRowCommand,
    DeleteColumnCommand: DeleteColumnCommand
});

registerTool("createTable", new InsertTableTool({ template: new ToolTemplate({template: EditorUtils.buttonTemplate, popup: true, title: "Create table"})}));

registerTool("addColumnLeft", new TableModificationTool({ type: "column", position: "before", template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Add column on the left"})}));
registerTool("addColumnRight", new TableModificationTool({ type: "column", template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Add column on the right"})}));
registerTool("addRowAbove", new TableModificationTool({ type: "row", position: "before", template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Add row above"})}));
registerTool("addRowBelow", new TableModificationTool({ type: "row", template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Add row below"})}));
registerTool("deleteRow", new TableModificationTool({ type: "row", action: "delete", template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Delete row"})}));
registerTool("deleteColumn", new TableModificationTool({ type: "column", action: "delete", template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Delete column"})}));
//registerTool("mergeCells", new Tool({ template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Merge cells"})}));

})(window.kendo.jQuery);
