(function($,undefined) {

    // Imports ================================================================
    var kendo = window.kendo,
        Class = kendo.Class,
        Widget = kendo.ui.Widget,
        extend = $.extend,
        deepExtend = kendo.deepExtend,
        keys = kendo.keys;

    // options can be: template (as string), cssClass, title, defaultValue
    var ToolTemplate = Class.extend({
        init: function(options) {
            var that = this;
            that.options = options;
        },

        getHtml: function() {
            var options = this.options;
            return kendo.template(options.template)({
                cssClass: options.cssClass,
                tooltip: options.title,
                initialValue: options.initialValue
            });
        }
    });

    var EditorUtils = {
        select: function(editor) {
            editor.trigger("select", {});
        },

        editorWrapperTemplate:
            '<table cellspacing="4" cellpadding="0" class="k-widget k-editor k-header"><tbody>' +
                '<tr><td class="k-editor-toolbar-wrap"><ul class="k-editor-toolbar"></ul></td></tr>' +
                '<tr><td class="k-editable-area"></td></tr>' +
            '</tbody></table>',

        buttonTemplate:
            '<li class="k-editor-button">' +
                '<a href="" class="k-tool-icon #= cssClass #" unselectable="on" title="#= tooltip #">#= tooltip #</a>' +
            '</li>',

        colorPickerTemplate:
            '<li class="k-editor-colorpicker">' +
                '<div class="k-widget k-colorpicker k-header #= cssClass #">' +
                    '<span class="k-tool-icon"><span class="k-selected-color"></span></span><span class="k-icon k-arrow-down"></span>' +
            '</div></li>',

        comboBoxTemplate:
            '<li class="k-editor-combobox">' +
                '<select title="#= tooltip #" class="#= cssClass #"></select>' +
//                '<div class="k-widget k-combobox k-header #= cssClass #">' +
//                    '<div class="k-dropdown-wrap k-state-default">' +
//                        '<input class="k-input" id="-input" title="#= tooltip #" type="text" value="#=initialValue#" />' +
//                        '<span class="k-select k-header"><span class="k-icon k-arrow-down">select</span></span>' +
//                    '</div><input style="display:none" type="text" value="inherit" /></div>' +
            '</li>',

        dropDownListTemplate:
            '<li class="k-editor-selectbox">' +
                '<select title="#= tooltip #" class="#= cssClass #"></select>' +
//                '<div class="k-selectbox k-header #= cssClass #"><div class="k-dropdown-wrap k-state-default">' +
//                    '<span class="k-input">#=initialValue#</span><span class="k-select"><span class="k-icon k-arrow-down">select</span></span>' +
//                '</div></div>' +
            '</li>',

        focusable: ".k-colorpicker,a.k-tool-icon:not(.k-state-disabled),.k-selectbox, .k-combobox .k-input",

        wrapTextarea: function(textarea) {

            var w = textarea.width(),
                h = textarea.height(),
                template = EditorUtils.editorWrapperTemplate,
                editorWrap = $(template).insertBefore(textarea).width(w).height(h),
                editArea = editorWrap.find(".k-editable-area");

            textarea.appendTo(editArea).addClass("k-content k-raw-content").hide();

            return textarea.closest(".k-editor");
        },

        renderTools: function(editor, tools) {
            var editorTools = {},
                currentTool, tool, i,
                nativeTools = editor._nativeTools,
                template,
                options,
                toolsArea = $(editor.element).closest(".k-editor").find(".k-editor-toolbar");

            if (tools) {
                for (i = 0; i < tools.length; i++) {
                    currentTool = tools[i];

                    if ($.isPlainObject(currentTool)) {
                        options = extend({ cssClass: "k-custom", type: "button", tooltip: "" }, currentTool);

                        if (options.name) {
                            options.cssClass = "k-" + options.name;
                        }

                        if (!options.template) {
                            if (options.type == "button") {
                                options.template = EditorUtils.buttonTemplate;
                            }
                        }
                    } else if (editor._tools[currentTool]) {
                        editorTools[currentTool] = editor._tools[currentTool];
                        options = editorTools[currentTool].options;
                    }

                    template = options.template;

                    if (template) {

                        if (template.getHtml) {
                            template = template.getHtml();
                        } else {
                            if (!$.isFunction(template)) {
                                template = kendo.template(template);
                            }

                            template = template(options);
                        }

                        tool = $(template).appendTo(toolsArea);

                        if (options.type == "button" && options.exec) {
                            tool.find(".k-tool-icon").click($.proxy(options.exec, editor.element[0]));
                        }
                    }
                }
            }

            for (i = 0; i < nativeTools.length; i++) {
                editorTools[nativeTools[i]] = editor._tools[nativeTools[i]];
            }

            editor.options.tools = editorTools;
        },

        createContentElement: function(textarea, stylesheets) {
            var iframe, wnd, doc,
                rtlStyle = textarea.closest(".k-rtl").length ? "direction:rtl;" : "";

            textarea.hide();
            iframe = $("<iframe />", { src: 'javascript:"<html></html>"', frameBorder: "0" })
                            .css("display", "")
                            .addClass("k-content")
                            .insertBefore(textarea)[0];

            wnd = iframe.contentWindow || iframe;
            doc = wnd.document || iframe.contentDocument;

            doc.designMode = "On";
            doc.open();
            doc.write(
                    "<!DOCTYPE html><html><head>" +
                    "<meta charset='utf-8' />" +
                    "<style>" +
                        "html,body{padding:0;margin:0;font-family:Verdana,Geneva,sans-serif;background:#fff;}" +
                        "html{font-size:100%}body{font-size:.75em;line-height:1.5;padding-top:1px;margin-top:-1px;" +
                        rtlStyle +
                        "}" +
                        "h1{font-size:2em;margin:.67em 0}h2{font-size:1.5em}h3{font-size:1.16em}h4{font-size:1em}h5{font-size:.83em}h6{font-size:.7em}" +
                        "p{margin:0 0 1em;padding:0 .2em}.k-marker{display:none;}.k-paste-container{position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden}" +
                        "ul,ol{padding-left:2.5em}" +
                        "a{color:#00a}" +
                        "code{font-size:1.23em}" +
                    "</style>" +
                    $.map(stylesheets, function(href){
                        return "<link rel='stylesheet' href='" + href + "'>";
                    }).join("") +
                    "</head><body spellcheck='false'></body></html>"
                );

            doc.close();

            return wnd;
        },

        initializeContentElement: function(editor) {
            var isFirstKeyDown = true;

            editor.window = EditorUtils.createContentElement($(editor.textarea), editor.options.stylesheets);
            editor.document = editor.window.contentDocument || editor.window.document;
            editor.body = editor.document.body;

            $(editor.document)
                .bind({
                    keydown: function (e) {
                        if (e.keyCode === keys.F10) {
                            // Handling with timeout to avoid the default IE menu
                            setTimeout(function() {
                                var TABINDEX = "tabIndex",
                                    element = editor.wrapper,
                                    tabIndex = element.attr(TABINDEX);

                                // Chrome can't focus something which has already been focused
                                element.attr(TABINDEX, tabIndex || 0).focus().find("li:has(" + focusable + ")").first().focus();

                                if (!tabIndex && tabIndex !== 0) {
                                   element.removeAttr(TABINDEX);
                                }

                            }, 100);

                            e.preventDefault();
                            return;
                        }

                        var toolName = editor.keyboard.toolFromShortcut(editor.options.tools, e);

                        if (toolName) {
                            e.preventDefault();
                            if (!/undo|redo/.test(toolName)) {
                                editor.keyboard.endTyping(true);
                            }
                            editor.exec(toolName);
                            return false;
                        }

                        if (editor.keyboard.isTypingKey(e) && editor.pendingFormats.hasPending()) {
                            if (isFirstKeyDown) {
                                isFirstKeyDown = false;
                            } else {
                                var range = editor.getRange();
                                editor.pendingFormats.apply(range);
                                editor.selectRange(range);
                            }
                        }

                        editor.keyboard.clearTimeout();

                        editor.keyboard.keydown(e);
                    },
                    keyup: function (e) {
                        var selectionCodes = [8, 9, 33, 34, 35, 36, 37, 38, 39, 40, 40, 45, 46];

                        if ($.browser.mozilla && e.keyCode == keys.BACKSPACE) {
                            fixBackspace(editor, e);
                        }

                        if ($.inArray(e.keyCode, selectionCodes) > -1 || (e.keyCode == 65 && e.ctrlKey && !e.altKey && !e.shiftKey)) {
                            editor.pendingFormats.clear();
                            select(editor);
                        }

                        if (editor.keyboard.isTypingKey(e)) {
                            if (editor.pendingFormats.hasPending()) {
                                var range = editor.getRange();
                                editor.pendingFormats.apply(range);
                                editor.selectRange(range);
                            }
                        } else {
                            isFirstKeyDown = true;
                        }

                        editor.keyboard.keyup(e);
                    },
                    mousedown: function(e) {
                        editor.pendingFormats.clear();

                        var target = $(e.target);

                        if (!$.browser.gecko && e.which == 2 && target.is("a[href]")) {
                            window.open(target.attr("href"), "_new");
                        }
                    },
                    mouseup: function () {
                        select(editor);
                    }
                });

            $(editor.window)
                .bind("blur", function () {
                    var old = editor.textarea.value,
                    value = editor.encodedValue();

                    editor.update(value);

                    if (value != old) {
                        editor.trigger("change");
                    }
                });

            $(editor.body)
                .bind("cut paste", function (e) {
                      editor.clipboard["on" + e.type](e);
                  });
        },

        fixBackspace: function(editor, e) {

            var range = editor.getRange(),
                startContainer = range.startContainer,
                dom = kendo.ui.editor.Dom,
                startContainerChildCount = startContainer.childNodes.length;

            if (startContainer == editor.body.firstChild ||
                !dom.isBlock(startContainer) ||
                (startContainerChildCount > 0 && !(startContainerChildCount == 1 && dom.is(startContainer.firstChild, "br")))) {
                return;
            }

            var previousBlock = startContainer.previousSibling;

            while (previousBlock && !dom.isBlock(previousBlock)) {
                previousBlock = previousBlock.previousSibling;
            }

            if (!previousBlock) {
                return;
            }

            var walker = editor.document.createTreeWalker(previousBlock, window.NodeFilter.SHOW_TEXT, null, false);

            var textNode;

            while (true) {
                textNode = walker.nextNode();

                if (textNode) {
                    previousBlock = textNode;
                } else {
                    break;
                }
            }

            range.setStart(previousBlock, dom.isDataNode(previousBlock) ? previousBlock.nodeValue.length : 0);
            range.collapse(true);
            kendo.ui.editor.RangeUtils.selectRange(range);

            dom.remove(startContainer);

            e.preventDefault();
        },

        formatByName: function(name, format) {
            for (var i = 0; i < format.length; i++) {
                if ($.inArray(name, format[i].tags) >= 0) {
                    return format[i];
                }
            }
        },

        registerTool: function(toolName, tool) {
            var tools = Editor.fn._tools;
            tools[toolName] = tool;
            if (tools[toolName].options && tools[toolName].options.template) {
                tools[toolName].options.template.options.cssClass = "k-" + toolName;
            }
        },

        registerFormat: function(formatName, format) {
            kendo.ui.Editor.fn.options.formats[formatName] = format;
        }
    };

    var select = EditorUtils.select,
        focusable = EditorUtils.focusable,
        wrapTextarea = EditorUtils.wrapTextarea,
        renderTools = EditorUtils.renderTools,
        initializeContentElement = EditorUtils.initializeContentElement,
        fixBackspace = EditorUtils.fixBackspace;

    var localization = {
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
        fontName: "Select font family",
        fontNameInherit: "(inherited font)",
        fontSize: "Select font size",
        fontSizeInherit: "(inherited size)",
        formatBlock: "Format",
        style: "Styles",
        emptyFolder: "Empty Folder",
        uploadFile: "Upload",
        orderBy: "Arrange by:",
        orderBySize: "Size",
        orderByName: "Name",
        invalidFileType: "The selected file \"{0}\" is not valid. Supported file types are {1}.",
        deleteFile: 'Are you sure you want to delete "{0}"?',
        overwriteFile: 'A file with name "{0}" already exists in the current directory. Do you want to overwrite it?',
        directoryNotFound: "A directory with this name was not found."
    };

    var supportedBrowser = !kendo.support.mobileOS || (kendo.support.mobileOS.ios && kendo.support.mobileOS.majorVersion >= 5);

    var Editor = Widget.extend({
        init: function (element, options) {
            /* suppress initialization in mobile webkit devices (w/o proper contenteditable support) */
            if (!supportedBrowser) {
                return;
            }

            var that = this,
                wrapper,
                value,
                editorNS = kendo.ui.editor;

            Widget.fn.init.call(that, element, options);

            that.options = deepExtend({}, that.options, options);

            element = $(element);

            element.closest("form").bind("submit", function () {
                that.update();
            });

            for (var id in that._tools) {
                that._tools[id].name = id.toLowerCase();
            }

            that.textarea = element.attr("autocomplete", "off")[0];

            wrapper = that.wrapper = wrapTextarea(element);

            renderTools(that, that.options.tools);

            initializeContentElement(that);

            that.keyboard = new editorNS.Keyboard([
                new editorNS.TypingHandler(that),
                new editorNS.SystemHandler(that)
            ]);

            that.clipboard = new editorNS.Clipboard(this);

            that.pendingFormats = new editorNS.PendingFormats(this);

            that.undoRedoStack = new editorNS.UndoRedoStack();

            if (options && options.value) {
                value = options.value;
            } else {
                // indented HTML introduces problematic ranges in IE
                value = element.val().replace(/[\r\n\v\f\t ]+/ig, " ");
            }

            that.value(value);

            function toolFromClassName(element) {
                var tool = $.grep(element.className.split(" "), function (x) {
                    return !/^k-(widget|tool-icon|state-hover|header|combobox|dropdown|selectbox|colorpicker)$/i.test(x);
                });
                return tool[0] ? tool[0].substring(2) : "custom";
            }

            function appendShortcutSequence(localizedText, tool) {
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
            }

            var toolbarItems = ".k-editor-toolbar > li > *, .k-editor-toolbar > li select",
                buttons = ".k-editor-button .k-tool-icon",
                enabledButtons = buttons + ":not(.k-state-disabled)",
                disabledButtons = buttons + ".k-state-disabled";

             wrapper.find(".k-combobox .k-input").keydown(function(e) {
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

            wrapper
                .delegate(enabledButtons, "mouseenter", function() { $(this).addClass("k-state-hover"); })
                .delegate(enabledButtons, "mouseleave", function() { $(this).removeClass("k-state-hover"); })
                .delegate(buttons, "mousedown", false)
                .delegate(focusable, "keydown", function(e) {
                    var closestLi = $(this).closest("li"),
                    focusableTool = "li:has(" + focusable + ")",
                    focusElement,
                    keyCode = e.keyCode;

                    if (keyCode == keys.RIGHT) {
                        focusElement = closestLi.nextAll(focusableTool).first().find(focusable);
                    } else if (keyCode == keys.LEFT) {
                        focusElement = closestLi.prevAll(focusableTool).last().find(focusable);
                    } else if (keyCode == keys.ESC) {
                        focusElement = that;
                    } else if (keyCode == keys.TAB && !(e.ctrlKey || e.altKey)) {
                        // skip tabbing to disabled tools, and focus the editing area when running out of tools
                        if (e.shiftKey) {
                            focusElement = closestLi.prevAll(focusableTool).last().find(focusable);

                            if (focusElement.length) {
                                e.preventDefault();
                            } else {
                                return;
                            }
                        } else {
                            e.preventDefault();

                            focusElement = closestLi.nextAll(focusableTool).first().find(focusable);

                            if (!focusElement.length) {
                                focusElement = that;
                            }
                        }
                    }

                    if (focusElement) {
                        focusElement.focus();
                    }
                })
                .delegate(enabledButtons, "click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    that.exec(toolFromClassName(this));
                })
                .delegate(disabledButtons, "click", function(e) { e.preventDefault(); })
                .find(toolbarItems)
                    .each(function () {
                        var toolName = toolFromClassName(this),
                            options = that.options,
                            tool = options.tools[toolName],
                            description = options.localization[toolName],
                            $this = $(this);

                        if (!tool) {
                            return;
                        }

                        if (toolName == "fontSize" || toolName == "fontName") {
                            var inheritText = options.localization[toolName + "Inherit"] || localization[toolName + "Inherit"];
                            options[toolName][0].Text = inheritText;
                            $this.find("input").val(inheritText).end()
                                 .find("span.k-input").text(inheritText).end();
                        }

                        tool.initialize($this, {
                            title: appendShortcutSequence(description, tool),
                            editor: that
                        });

                    });

                that.bind("select", function() {
                    var range = that.getRange();

                    var nodes = editorNS.RangeUtils.textNodes(range);

                    if (!nodes.length) {
                        nodes = [range.startContainer];
                    }

                    wrapper.find(toolbarItems)
                        .each(function () {
                            var tool = that.options.tools[toolFromClassName(this)];
                            if (tool) {
                                tool.update($(this), nodes, that.pendingFormats);
                            }
                        });
                });

            $(document)
                .bind("DOMNodeInserted", function(e) {
                    var wrapper = that.wrapper;

                    if ($.contains(e.target, wrapper[0]) || wrapper[0] == e.target) {
                        // preserve updated value before re-initializing
                        // don't use update() to prevent the editor from encoding the content too early
                        that.textarea.value = that.value();
                        wrapper.find("iframe").remove();
                        initializeContentElement(that);
                    }
                })
                .bind("mousedown", function(e) {
                    try {
                        if (that.keyboard.isTypingInProgress()) {
                            that.keyboard.endTyping(true);
                        }

                        if (!that.selectionRestorePoint) {
                            that.selectionRestorePoint = new editorNS.RestorePoint(that.getRange());
                        }
                    } catch (e) { }
                });

            kendo.notify(that);
        },

        events: [
            "select",
            "change",
            "execute",
            "error",
            "paste"
        ],

        options: {
            name: "Editor",
            localization: localization,
            formats: {},
            encoded: true,
            stylesheets: [],
            dialogOptions: {
                modal: true, resizable: false, draggable: true,
                animation: false
            },
            fontName: [
                { Text: localization.fontNameInherit,  Value: "inherit" },
                { Text: "Arial", Value: "Arial,Helvetica,sans-serif" },
                { Text: "Courier New", Value: "'Courier New',Courier,monospace" },
                { Text: "Georgia", Value: "Georgia,serif" },
                { Text: "Impact", Value: "Impact,Charcoal,sans-serif" },
                { Text: "Lucida Console", Value: "'Lucida Console',Monaco,monospace" },
                { Text: "Tahoma", Value: "Tahoma,Geneva,sans-serif" },
                { Text: "Times New Roman", Value: "'Times New Roman',Times,serif" },
                { Text: "Trebuchet MS", Value: "'Trebuchet MS',Helvetica,sans-serif" },
                { Text: "Verdana", Value: "Verdana,Geneva,sans-serif" }
            ],
            fontSize: [
                { Text: localization.fontSizeInherit,  Value: "inherit" },
                { Text: "1 (8pt)",  Value: "xx-small" },
                { Text: "2 (10pt)", Value: "x-small" },
                { Text: "3 (12pt)", Value: "small" },
                { Text: "4 (14pt)", Value: "medium" },
                { Text: "5 (18pt)", Value: "large" },
                { Text: "6 (24pt)", Value: "x-large" },
                { Text: "7 (36pt)", Value: "xx-large" }
            ],
            formatBlock: [
                { Text: "Paragraph", Value: "p" },
                { Text: "Quotation", Value: "blockquote" },
                { Text: "Heading 1", Value: "h1" },
                { Text: "Heading 2", Value: "h2" },
                { Text: "Heading 3", Value: "h3" },
                { Text: "Heading 4", Value: "h4" },
                { Text: "Heading 5", Value: "h5" },
                { Text: "Heading 6", Value: "h6" }
            ],
            tools: [
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "fontName",
                "fontSize",
                "foreColor",
                "backColor",
                "justifyLeft",
                "justifyCenter",
                "justifyRight",
                "justifyFull",
                "insertUnorderedList",
                "insertOrderedList",
                "indent",
                "outdent",
                "formatBlock",
                "createLink",
                "unlink",
                "insertImage"
                //"style",
                //"subscript",
                //"superscript",
            ]
        },

        _nativeTools: [
            "insertLineBreak",
            "insertParagraph",
            "redo",
            "undo"
        ],

        _tools: {
            undo: { options: { key: "Z", ctrl: true } },
            redo: { options: { key: "Y", ctrl: true } }
        },

        value: function (html) {
            var body = this.body,
                dom = kendo.ui.editor.Dom;

            if (html === undefined) {
                return kendo.ui.editor.Serializer.domToXhtml(body);
            }

            this.pendingFormats.clear();

            // handle null value passed as a parameter
            html = (html || "")
                // Some browsers do not allow setting CDATA sections through innerHTML so we encode them
                .replace(/<!\[CDATA\[(.*)?\]\]>/g, "<!--[CDATA[$1]]-->")
                // Encode script tags to avoid execution and lost content (IE)
                .replace(/<script([^>]*)>(.*)?<\/script>/ig, "<telerik:script $1>$2<\/telerik:script>")
                // <img>\s+\w+ creates invalid nodes after cut in IE
                .replace(/(<\/?img[^>]*>)[\r\n\v\f\t ]+/ig, "$1");

            if (!$.browser.msie) {
                // Add <br/>s to empty paragraphs in mozilla/chrome, to make them focusable
                html = html.replace(/<p([^>]*)>(\s*)?<\/p>/ig, '<p $1><br _moz_dirty="" /><\/p>');
            }

            if ($.browser.msie && parseInt($.browser.version, 10) < 9) {
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
                if ($.browser.msie) {
                    // having unicode characters creates denormalized DOM tree in IE9
                    dom.normalize(body);
                }
            }

            this.selectionRestorePoint = null;
            this.update();
        },

        focus: function () {
            this.window.focus();
        },

        update: function (value) {
            this.textarea.value = value || this.options.encoded ? this.encodedValue() : this.value();
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
            this.focus();
            var selection = this.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
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
                range, body, id,
                tool = "", pendingTool;

            name = name.toLowerCase();

            // restore selection
            if (!that.keyboard.isTypingInProgress()) {
                that.focus();

                range = that.getRange();
                body = that.document.body;
            }

            // exec tool
            for (id in that.options.tools) {
                if (id.toLowerCase() == name) {
                    tool = that.options.tools[id];
                    break;
                }
            }

            if (tool) {
                range = that.getRange();

                if (!/undo|redo/i.test(name) && tool.willDelayExecution(range)) {
                    // clone our tool to apply params only once
                    pendingTool = $.extend({}, tool);
                    $.extend(pendingTool.options, { params: params });
                    that.pendingFormats.toggle(pendingTool);
                    select(that);
                    return;
                }

                var command = tool.command ? tool.command(extend({ range: range }, params)) : null;

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
                        command.change = $.proxy(function () { select(that); }, that);
                        return;
                    }
                }

                select(that);
            }
        }
    });

    kendo.ui.plugin(Editor);

    var Tool = Class.extend({
        init: function(options) {
            this.options = options;
        },

        initialize: function($ui, options) {
            $ui.attr({ unselectable: "on", title: options.title });
        },

        command: function (commandArguments) {
            return new this.options.command(commandArguments);
        },

        update: function() {
        },

        willDelayExecution: function() {
            return false;
        }

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

        update: function($ui, nodes, pendingFormats) {
            var isPending = pendingFormats.isPending(this.name),
                isFormatted = this.options.finder.isFormatted(nodes),
                isActive = isPending ? !isFormatted : isFormatted;

            $ui.toggleClass("k-state-active", isActive);
        }
    });

    // Exports ================================================================

    extend(kendo.ui, {
        editor:{
            ToolTemplate: ToolTemplate,
            EditorUtils: EditorUtils,
            Tool: Tool,
            FormatTool: FormatTool
        }
    });

})(jQuery);
