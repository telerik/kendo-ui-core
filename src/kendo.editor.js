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
                editArea = editorWrap.find(".k-editable-area"),
                toolsArea = editorWrap.find(".k-editor-toolbar");

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
                for (j = 0; j < tools.length; j++) {
                    currentTool = tools[j];

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

            for (j = 0; j < nativeTools.length; j++) {
                editorTools[nativeTools[j]] = editor._tools[nativeTools[j]];
            }

            editor.options.tools = editorTools;
        },

        createContentElement: function($textarea, stylesheets) {
            $textarea.hide();
            var iframe = $("<iframe />", { src: 'javascript:"<html></html>"', frameBorder: "0" })
                            .css("display", "")
                            .addClass("k-content")
                            .insertBefore($textarea)[0];

            var window = iframe.contentWindow || iframe;
            var document = window.document || iframe.contentDocument;

            var html = $textarea.val()
                        // <img>\s+\w+ creates invalid nodes after cut in IE
                        .replace(/(<\/?img[^>]*>)[\r\n\v\f\t ]+/ig, "$1")
                        // indented HTML introduces problematic ranges in IE
                        .replace(/[\r\n\v\f\t ]+/ig, " ");

            if (!html.length && $.browser.mozilla)
                html = '<br _moz_dirty="true" />';

            var rtlStyle = $textarea.closest(".k-rtl").length ? "direction:rtl;" : "";

            document.designMode = "On";
            document.open();
            document.write(
                    '<!DOCTYPE html><html><head>' +
                    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
                    '<style type="text/css">' +
                        'html,body{padding:0;margin:0;font-family:Verdana,Geneva,sans-serif;background:#fff;}' +
                        'html{font-size:100%}body{font-size:.75em;line-height:1.5;padding-top:1px;margin-top:-1px;' +
                        rtlStyle +
                        '}' +
                        'h1{font-size:2em;margin:.67em 0}h2{font-size:1.5em}h3{font-size:1.16em}h4{font-size:1em}h5{font-size:.83em}h6{font-size:.7em}' +
                        'p{margin:0 0 1em;padding:0 .2em}.k-marker{display:none;}.k-paste-container{position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden}' +
                        'ul,ol{padding-left:2.5em}' +
                        'a{color:#00a}' +
                        'code{font-size:1.23em}' +
                    '</style>' +
                    $.map(stylesheets, function(href){ return ['<link type="text/css" href="', href, '" rel="stylesheet"/>'].join(''); }).join('') +
                    '</head><body spellcheck="false">' +
                    html +
                    '</body></html>'
                );

            document.close();

            return window;
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

                        if (!$.browser.gecko && e.which == 2 && target.is("a[href]"))
                        window.open(target.attr("href"), "_new");
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
                dom = kendo.ui.editor.Dom;

            if (startContainer == editor.body.firstChild || !dom.isBlock(startContainer)
            || (startContainer.childNodes.length > 0 && !(startContainer.childNodes.length == 1 && dom.is(startContainer.firstChild, "br"))))
                return;

            var previousBlock = startContainer.previousSibling;

            while (previousBlock && !dom.isBlock(previousBlock))
                previousBlock = previousBlock.previousSibling;

            if (!previousBlock)
                return;

            var walker = editor.document.createTreeWalker(previousBlock, NodeFilter.SHOW_TEXT, null, false);

            var textNode;

            while (textNode = walker.nextNode())
                previousBlock = textNode;

            range.setStart(previousBlock, dom.isDataNode(previousBlock) ? previousBlock.nodeValue.length : 0);
            range.collapse(true);
            kendo.ui.editor.RangeUtils.selectRange(range);

            dom.remove(startContainer);

            e.preventDefault();
        },

        formatByName: function(name, format) {
            for (var i = 0; i < format.length; i++)
                if ($.inArray(name, format[i].tags) >= 0)
                    return format[i];
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
        createContentElement = EditorUtils.createContentElement,
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

    var emptyFinder = function () { return { isFormatted: function () { return false } } };
    var supportedBrowser = !kendo.support.mobileOS || (kendo.support.mobileOS.ios && kendo.support.mobileOS.majorVersion >= 5);

    var Editor = Widget.extend({
        init: function (element, options) {
            /* suppress initialization in mobile webkit devices (w/o proper contenteditable support) */
            if (!supportedBrowser) {
                return;
            }

            var that = this,
                wrapper;

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

            that.keyboard = new kendo.ui.editor.Keyboard([new kendo.ui.editor.TypingHandler(that), new kendo.ui.editor.SystemHandler(that)]);

            that.clipboard = new kendo.ui.editor.Clipboard(this);

            that.pendingFormats = new kendo.ui.editor.PendingFormats(this);

            that.undoRedoStack = new kendo.ui.editor.UndoRedoStack();

            if (options && options.value) {
                that.value(options.value);
            }

            function toolFromClassName(element) {
                var tool = $.grep(element.className.split(" "), function (x) {
                    return !/^k-(widget|tool-icon|state-hover|header|combobox|dropdown|selectbox|colorpicker)$/i.test(x);
                });
                return tool[0] ? tool[0].substring(2) : "custom";
            }

            function appendShortcutSequence(localizedText, tool) {
                if (!tool.key)
                    return localizedText;

                var res = localizedText + " (";

                if (tool.ctrl) res += "Ctrl + ";
                if (tool.shift) res += "Shift + ";
                if (tool.alt) res += "Alt + ";

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
                .delegate(enabledButtons, "mouseenter", function() { $(this).addClass("k-state-hover")})
                .delegate(enabledButtons, "mouseleave", function() { $(this).removeClass("k-state-hover")})
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

                            if (focusElement.length == 0) {
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
                            var inheritText = options.localization[toolName + "Inherit"] || localization[toolName + "Inherit"]
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

                    var nodes = kendo.ui.editor.RangeUtils.textNodes(range);

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
                    if ($.contains(e.target, that.wrapper[0]) || that.wrapper[0] == e.target) {
                        // preserve updated value before re-initializing
                        // don't use update() to prevent the editor from encoding the content too early
                        that.textarea.value = that.value();
                        that.wrapper.find("iframe").remove();
                        initializeContentElement(that);
                    }
                })
                .bind("mousedown", function(e) {
                    try {
                        if (that.keyboard.isTypingInProgress())
                            that.keyboard.endTyping(true);

                        if (!that.selectionRestorePoint) {
                            that.selectionRestorePoint = new kendo.ui.editor.RestorePoint(that.getRange());
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
                "insertImage",
                //"insertHtml",
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
            if (html === undefined) return kendo.ui.editor.Serializer.domToXhtml(body);

            this.pendingFormats.clear();

            // handle null value passed as a parameter
            html = html || "";

            // Some browsers do not allow setting CDATA sections through innerHTML so we encode them as comments
            html = html.replace(/<!\[CDATA\[(.*)?\]\]>/g, "<!--[CDATA[$1]]-->");

            // Encode script tags to avoid execution and lost content (IE)
            html = html.replace(/<script([^>]*)>(.*)?<\/script>/ig, "<telerik:script $1>$2<\/telerik:script>");

            // Add <br/>s to empty paragraphs in mozilla
            if ($.browser.mozilla)
                html = html.replace(/<p([^>]*)>(\s*)?<\/p>/ig, '<p $1><br _moz_dirty="" /><\/p>');

            if ($.browser.msie && parseInt($.browser.version) < 9) {
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
            var selection = this.getSelection();
            var range = selection.rangeCount > 0 ? selection.getRangeAt(0) : this.createRange();

            if (range.startContainer == this.document && range.endContainer == this.document && range.startOffset == 0 && range.endOffset == 0) {
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
(function($) {

var kendo = window.kendo,
    Class = kendo.Class,
    map = $.map,
    extend = $.extend,
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
    blockElements = "div,p,h1,h2,h3,h4,h5,h6,address,applet,blockquote,button,center,dd,dir,dl,dt,fieldset,form,frameset,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,pre,script,table,tbody,td,tfoot,th,thead,tr,ul".split(","),
    block = makeMap(blockElements),
    inlineElements = "span,em,a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,strike,strong,sub,sup,textarea,tt,u,var".split(","),
    inline = makeMap(inlineElements),
    fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected".split(","));

var normalize = function (node) {
    if (node.nodeType == 1)
        node.normalize();
};

if ($.browser.msie && parseInt($.browser.version) >= 8) {
    normalize = function(parent) {
        if (parent.nodeType == 1 && parent.firstChild) {
            var prev = parent.firstChild,
                node = prev;

            while (node = node.nextSibling) {
                if (node.nodeType == 3 && prev.nodeType == 3) {
                    node.nodeValue = prev.nodeValue + node.nodeValue;
                    Dom.remove(prev);
                }
                prev = node;
            }
        }
    }
}

var whitespace = /^\s+$/,
    rgb = /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i,
    amp = /&/g,
    openTag = /</g,
    closeTag = />/g,
    nbsp = /\u00a0/g,
    bom = /\ufeff/g;
var cssAttributes = ("color,padding-left,padding-right,padding-top,padding-bottom,\
background-color,background-attachment,background-image,background-position,background-repeat,\
border-top-style,border-top-width,border-top-color,\
border-bottom-style,border-bottom-width,border-bottom-color,\
border-left-style,border-left-width,border-left-color,\
border-right-style,border-right-width,border-right-color,\
font-family,font-size,font-style,font-variant,font-weight,line-height"
).split(",");

var Dom = {
    findNodeIndex: function(node) {
        var i = 0;
        while (node = node.previousSibling) i++;
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
        if (Dom.isAncestorOf(root, node))
            while (node && node.parentNode != root)
                node = node.parentNode;

        return node;
    },

    getNodeLength: function(node) {
        return Dom.isDataNode(node) ? node.length : node.childNodes.length;
    },

    splitDataNode: function(node, offset) {
        var newNode = node.cloneNode(false);
        node.deleteData(offset, node.length);
        newNode.deleteData(0, offset);
        Dom.insertAfter(newNode, node);
    },

    attrEquals: function(node, attributes) {
        for (var key in attributes) {
            var value = node[key];

            if (key == FLOAT)
                value = node[$.support.cssFloat ? CSSFLOAT : STYLEFLOAT];

            if (typeof value == "object") {
                if (!Dom.attrEquals(value, attributes[key]))
                    return false;
            } else if (value != attributes[key])
                return false;
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
            if (block && $.inArray(block, blocks) < 0)
                blocks.push(block);
        }

        return blocks;
    },

    windowFromDocument: function(document) {
        return document.defaultView || document.parentWindow;
    },

    normalize: normalize,
    blockElements: blockElements,
    inlineElements: inlineElements,
    empty: empty,
    fillAttrs: fillAttrs,

    toHex: function (color) {
        var matches = rgb.exec(color);

        if (!matches) return color;

        return "#" + map(matches.slice(1), function (x) {
            return x = parseInt(x).toString(16), x.length > 1 ? x : "0" + x;
        }).join("");
    },

    encode: function (value) {
        return value.replace(amp, "&amp;")
                .replace(openTag, "&lt;")
                .replace(closeTag, "&gt;")
                .replace(nbsp, "&nbsp;");
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
        if (node.nodeType == 3)
            return node;

        var result = null;

        for (var child = node.lastChild; child; child = child.previousSibling)
            if (result = Dom.lastTextNode(child))
                return result;

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

    scrollTo: function (node) {
        node.ownerDocument.body.scrollTop = $(Dom.isDataNode(node) ? node.parentNode : node).offset().top;
    },

    insertAt: function (parent, newElement, position) {
        parent.insertBefore(newElement, parent.childNodes[position] || null);
    },

    insertBefore: function (newElement, referenceElement) {
        if (referenceElement.parentNode)
            return referenceElement.parentNode.insertBefore(newElement, referenceElement);
        else
            return referenceElement;
    },

    insertAfter: function (newElement, referenceElement) {
        return referenceElement.parentNode.insertBefore(newElement, referenceElement.nextSibling);
    },

    remove: function (node) {
        node.parentNode.removeChild(node);
    },

    trim: function (parent) {
        for (var i = parent.childNodes.length - 1; i >= 0; i--) {
            var node = parent.childNodes[i];
            if (Dom.isDataNode(node)) {
                if (node.nodeValue.replace(bom, "").length == 0)
                    Dom.remove(node);
                if (Dom.isWhitespace(node))
                    Dom.insertBefore(node, parent);
            } else if (node.className != KMARKER) {
                Dom.trim(node);
                if (node.childNodes.length == 0 && !Dom.isEmpty(node))
                    Dom.remove(node);
            }
        }

        return parent;
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

    wrap: function (node, wrapper) {
        Dom.insertBefore(wrapper, node);
        wrapper.appendChild(node);
        return wrapper;
    },

    unwrap: function (node) {
        var parent = node.parentNode;
        while (node.firstChild)
            parent.insertBefore(node.firstChild, node);

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
        return extend(element, attributes);
    },

    style: function (node, value) {
        $(node).css(value || {});
    },

    unstyle: function (node, value) {
        for (var key in value) {
            if (key == FLOAT)
                key = $.support.cssFloat ? CSSFLOAT : STYLEFLOAT;

            node.style[key] = "";
        }

        if (node.style.cssText == "")
            node.removeAttribute(STYLE);
    },

    inlineStyle: function(document, name, attributes) {
        var span = $(Dom.create(document, name, attributes)),
            style;

        document.body.appendChild(span[0]);

        style = map(cssAttributes, function(value) {
            if ($.browser.msie && value == "line-height" && span.css(value) == "1px") {
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

            for (j = 1; j < count; j++)
                if (first != paths[j][i])
                    return output;

            output = first;
        }
        return output;
    }
}

kendo.ui.editor.Dom = Dom;

})(jQuery);
(function($, undefined) {

// Imports ================================================================
var doc = document,
    kendo = window.kendo,
    Editor = kendo.ui.editor,
    dom = Editor.Dom,
    extend = $.extend;

var fontSizeMappings = 'xx-small,x-small,small,medium,large,x-large,xx-large'.split(','),
    quoteRe = /"/g,
    brRe = /<br[^>]*>/i,
    emptyPRe = /<p><\/p>/i;

var Serializer = {
    domToXhtml: function(root) {
        var result = [];
        var tagMap = {
            'telerik:script': { start: function (node) { result.push('<script'); attr(node); result.push('>'); }, end: function () { result.push('</script>') } },
            b: { start: function () { result.push('<strong>') }, end: function () { result.push('</strong>') } },
            i: { start: function () { result.push('<em>') }, end: function () { result.push('</em>') } },
            u: { start: function () { result.push('<span style="text-decoration:underline;">') }, end: function () { result.push('</span>') } },
            font: {
                start: function (node) {
                    result.push('<span style="');

                    var color = node.getAttribute('color');
                    var size = fontSizeMappings[node.getAttribute('size')];
                    var face = node.getAttribute('face');

                    if (color) {
                        result.push('color:')
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
                end: function (node) {
                    result.push('</span>');
                }
            }
        };

        function attr(node) {
            var specifiedAttributes = [],
                attributes = node.attributes,
                trim = $.trim;

            if (dom.is(node, 'img')) {
                var width = node.style.width,
                    height = node.style.height,
                    $node = $(node);

                if (width) {
                    $node.attr('width', parseInt(width));
                    dom.unstyle(node, { width: undefined });
                }

                if (height) {
                    $node.attr('height', parseInt(height));
                    dom.unstyle(node, { height: undefined });
                }
            }

            for (var i = 0, l = attributes.length; i < l; i++) {
                var attribute = attributes[i];
                var name = attribute.nodeName;
                // In IE < 8 the 'value' attribute is not returned as 'specified'. The same goes for type="text"
                if (attribute.specified || (name == 'value' && node.value != '') || (name == 'type' && attribute.nodeValue == 'text'))
                    if (name.indexOf('_moz') < 0 && name != 'complete')
                        specifiedAttributes.push(attribute);
            }

            if (!specifiedAttributes.length)
                return;

            specifiedAttributes.sort(function (a, b) {
                return a.nodeName > b.nodeName ? 1 : a.nodeName < b.nodeName ? -1 : 0;
            });

            for (var i = 0, l = specifiedAttributes.length; i < l; i++) {
                var attribute = specifiedAttributes[i];
                var attributeName = attribute.nodeName;
                var attributeValue = attribute.nodeValue;

                result.push(' ');
                result.push(attributeName);
                result.push('="');
                if (attributeName == 'style') {
                    // In IE < 8 the style attribute does not return proper nodeValue
                    var css = trim(attributeValue || node.style.cssText).split(';');

                    for (var cssIndex = 0, len = css.length; cssIndex < len; cssIndex++) {
                        var pair = css[cssIndex];
                        if (pair.length) {
                            var propertyAndValue = pair.split(':');
                            var property = trim(propertyAndValue[0].toLowerCase()),
                                value = trim(propertyAndValue[1]);

                            if (property == "font-size-adjust" || property == "font-stretch") {
                                continue;
                            }

                            if (property.indexOf('color') >= 0)
                                value = dom.toHex(value);

                            if (property.indexOf('font') >= 0) {
                                value = value.replace(quoteRe, "'");
                            }

                            result.push(property);
                            result.push(':');
                            result.push(value);
                            result.push(';');
                        }
                    };
                } else if (attributeName == 'src' || attributeName == 'href') {
                    result.push(node.getAttribute(attributeName, 2));
                } else {
                    result.push(dom.fillAttrs[attributeName] ? attributeName : attributeValue);
                }

                result.push('"');
            }
        }

        function children(node, skip) {
            for (var childNode = node.firstChild; childNode; childNode = childNode.nextSibling)
                child(childNode, skip);
        }

        function child(node, skip) {
            var nodeType = node.nodeType,
                tagName, mapper,
                parent, value, previous;

            if (nodeType == 1) {
                tagName = dom.name(node);

                if (tagName == "" || (node.attributes['_moz_dirty'] && dom.is(node, 'br')))
                    return;

                mapper = tagMap[tagName];

                if (mapper) {
                    mapper.start(node);
                    children(node);
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
                value = node.nodeValue;

                if (!skip && $.support.leadingWhitespace) {
                    parent = node.parentNode;
                    previous = node.previousSibling;

                    if (!previous) {
                         previous = (dom.isInline(parent) ? parent : node).previousSibling;
                    }

                    if (!previous || previous.innerHTML == '' || dom.isBlock(previous))
                        value = value.replace(/^[\r\n\v\f\t ]+/, '');

                    value = value.replace(/ +/, ' ');
                }

                result.push(dom.encode(value));

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

        children(root);

        result = result.join('');

        // if serialized dom contains only whitespace elements, consider it empty (required field validation)
        if (result.replace(brRe, "").replace(emptyPRe, "") == "") {
            return "";
        }

        return result;
    }

};

extend(Editor, {
    Serializer: Serializer
});

})(jQuery);
(function($) {

    // Imports ================================================================
    var doc = document,
        kendo = window.kendo,
        Class = kendo.Class,
        extend = $.extend,
        Editor = kendo.ui.editor,
        dom = Editor.Dom,
        findNodeIndex = dom.findNodeIndex,
        isDataNode = dom.isDataNode,
        findClosestAncestor = dom.findClosestAncestor,
        getNodeLength = dom.getNodeLength,
        normalize = dom.normalize;

var START_TO_START = 0,
    START_TO_END = 1,
    END_TO_END = 2,
    END_TO_START = 3;

var SelectionUtils = {
    selectionFromWindow: function(window) {
        if ($.browser.msie && $.browser.version < 9) {
            return new W3CSelection(window.document);
        }

        return window.getSelection();
    },

    selectionFromRange: function(range) {
        var document = RangeUtils.documentFromRange(range);
        return SelectionUtils.selectionFromDocument(document);
    },

    selectionFromDocument: function(document) {
        return SelectionUtils.selectionFromWindow(dom.windowFromDocument(document));
    }
}

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
        if (toStart)
            this.setEnd(this.startContainer, this.startOffset);
        else
            this.setStart(this.endContainer, this.endOffset);
    },

    // Editing Methods

    deleteContents: function () {
        var range = this.cloneRange();

        if (this.startContainer != this.commonAncestorContainer)
            this.setStartAfter(findClosestAncestor(this.commonAncestorContainer, this.startContainer));

        this.collapse(true);

        (function deleteSubtree(iterator) {
            while (iterator.next())
                iterator.hasPartialSubtree() ? deleteSubtree(iterator.getSubtreeIterator())
                                            : iterator.remove();
        })(new RangeIterator(range));
    },

    cloneContents: function () {
        // clone subtree
        var document = RangeUtils.documentFromRange(this);
        return (function cloneSubtree(iterator) {
                for (var node, frag = document.createDocumentFragment(); node = iterator.next(); ) {
                        node = node.cloneNode(!iterator.hasPartialSubtree());
                        if (iterator.hasPartialSubtree())
                                node.appendChild(cloneSubtree(iterator.getSubtreeIterator()));
                        frag.appendChild(node);
                }
                return frag;
        })(new RangeIterator(this));
    },

    extractContents: function () {
        var range = this.cloneRange();

        if (this.startContainer != this.commonAncestorContainer)
            this.setStartAfter(findClosestAncestor(this.commonAncestorContainer, this.startContainer));

        this.collapse(true);

        var self = this;

        var document = RangeUtils.documentFromRange(this);

        return (function extractSubtree(iterator) {
            for (var node, frag = document.createDocumentFragment(); node = iterator.next(); ) {
                iterator.hasPartialSubtree() ? node = node.cloneNode(false) : iterator.remove(self.originalRange);

                if (iterator.hasPartialSubtree())
                    node.appendChild(extractSubtree(iterator.getSubtreeIterator()));

                frag.appendChild(node);
            }

            return frag;
        })(new RangeIterator(range));
    },

    insertNode: function (node) {
        if (isDataNode(this.startContainer)) {
            if (this.startOffset != this.startContainer.nodeValue.length)
                dom.splitDataNode(this.startContainer, this.startOffset);

            dom.insertAfter(node, this.startContainer);
        } else {
            dom.insertAt(this.startContainer, node, this.startOffset);
        }

        this.setStart(this.startContainer, this.startOffset);
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
    if (start == end)
        return endOffset - startOffset;

    // end is child of start
    var container = end;
    while (container && container.parentNode != start)
        container = container.parentNode;

    if (container)
        return findNodeIndex(container) - startOffset;

    // start is child of end
    container = start;
    while (container && container.parentNode != end)
        container = container.parentNode;

    if (container)
        return endOffset - findNodeIndex(container) - 1;

    // deep traversal
    var root = dom.commonAncestor(start, end);
    var startAncestor = start;

    while (startAncestor && startAncestor.parentNode != root)
        startAncestor = startAncestor.parentNode;

    if (!startAncestor)
        startAncestor = root;

    var endAncestor = end;
    while (endAncestor && endAncestor.parentNode != root)
        endAncestor = endAncestor.parentNode;

    if (!endAncestor)
        endAncestor = root;

    if (startAncestor == endAncestor)
        return 0;

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
    while (node && node != range.endContainer && !dom.isAncestorOf(node, range.endContainer))
        node = node.parentNode;

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

        if (range.collapsed)
            return;

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
        var current = this._current = this._next;
        this._next = this._current && this._current.nextSibling != this._end ?
        this._current.nextSibling : null;

        if (isDataNode(this._current)) {
            if (this.range.endContainer == this._current)
                (current = current.cloneNode(true)).deleteData(this.range.endOffset, current.length - this.range.endOffset);

            if (this.range.startContainer == this._current)
                (current = current.cloneNode(true)).deleteData(0, this.range.startOffset);
        }

        return current;
    },

    traverse: function (callback) {
        function next() {
            this._current = this._next;
            this._next = this._current && this._current.nextSibling != this._end ? this._current.nextSibling : null;
            return this._current;
        }

        var current;

        while (current = next.call(this)) {
            if (this.hasPartialSubtree())
                this.getSubtreeIterator().traverse(callback);
            else
                callback(current)
        }

        return current;
    },

    remove: function (originalRange) {
        var inStartContainer = this.range.startContainer == this._current;
        var inEndContainer = this.range.endContainer == this._current;

        if (isDataNode(this._current) && (inStartContainer || inEndContainer)) {
            var start = inStartContainer ? this.range.startOffset : 0;
            var end = inEndContainer ? this.range.endOffset : this._current.length;
            var delta = end - start;

            if (originalRange && (inStartContainer || inEndContainer)) {
                if (this._current == originalRange.startContainer && start <= originalRange.startOffset)
                    originalRange.startOffset -= delta;

                if (this._current == originalRange.endContainer && end <= originalRange.endOffset)
                    originalRange.endOffset -= delta;
            }

            this._current.deleteData(start, delta);
        } else {
            var parent = this._current.parentNode;

            if (originalRange && (this.range.startContainer == parent || this.range.endContainer == parent)) {
                var nodeIndex = findNodeIndex(this._current);

                if (parent == originalRange.startContainer && nodeIndex <= originalRange.startOffset)
                    originalRange.startOffset -= 1;

                if (parent == originalRange.endContainer && nodeIndex < originalRange.endOffset)
                    originalRange.endOffset -= 1;
            }

            dom.remove(this._current);
        }
    },

    hasPartialSubtree: function () {
        return !isDataNode(this._current) &&
        (dom.isAncestorOrSelf(this._current, this.range.startContainer) ||
            dom.isAncestorOrSelf(this._current, this.range.endContainer));
    },

    getSubtreeIterator: function () {
        var subRange = this.range.cloneRange();
        subRange.selectNodeContents(this._current);

        if (dom.isAncestorOrSelf(this._current, this.range.startContainer))
            subRange.setStart(this.range.startContainer, this.range.startOffset);
        if (dom.isAncestorOrSelf(this._current, this.range.endContainer))
            subRange.setEnd(this.range.endContainer, this.range.endOffset);

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
        this.ownerDocument.selection.empty();
    },

    getRangeAt: function () {
        var textRange, range = new W3CRange(this.ownerDocument), selection = this.ownerDocument.selection, element;

        try {
            textRange = selection.createRange();
            element = textRange.item ? textRange.item(0) : textRange.parentElement();
			if (element.ownerDocument != this.ownerDocument) {
				return range;
            }
        } catch (ex) {
            return range;
        }

        if (selection.type == 'Control') {
            range.selectNode(textRange.item(0));
        } else {
            adoptEndPoint(textRange, range, true);
            adoptEndPoint(textRange, range, false);

            if (range.startContainer.nodeType == 9)
                range.setStart(range.endContainer, range.startOffset);

            if (range.endContainer.nodeType == 9)
                range.setEnd(range.startContainer, range.endOffset);

            if (textRange.compareEndPoints('StartToEnd', textRange) == 0)
                range.collapse(false);

            var startContainer = range.startContainer,
                endContainer = range.endContainer,
                body = this.ownerDocument.body;

            if (!range.collapsed && range.startOffset == 0 && range.endOffset == getNodeLength(range.endContainer) // check for full body selection
            && !(startContainer == endContainer && isDataNode(startContainer) && startContainer.parentNode == body)) { // but not when single textnode is selected
                var movedStart = false,
                    movedEnd = false;

                while (findNodeIndex(startContainer) == 0 && startContainer == startContainer.parentNode.firstChild && startContainer != body) {
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

function adoptContainer(textRange, range, start) {
    // find anchor node and offset
    var container = range[start ? 'startContainer' : 'endContainer'];
    var offset = range[start ? 'startOffset' : 'endOffset'], textOffset = 0;
    var anchorNode = isDataNode(container) ? container : container.childNodes[offset] || null;
    var anchorParent = isDataNode(container) ? container.parentNode : container;
    // visible data nodes need a text offset
    if (container.nodeType == 3 || container.nodeType == 4)
        textOffset = offset;

    // create a cursor element node to position range (since we can't select text nodes)
    var cursorNode = anchorParent.insertBefore(dom.create(range.ownerDocument, 'a'), anchorNode);

    var cursor = range.ownerDocument.body.createTextRange();
    cursor.moveToElementText(cursorNode);
    dom.remove(cursorNode);
    cursor[start ? 'moveStart' : 'moveEnd']('character', textOffset);
    cursor.collapse(false);
    textRange.setEndPoint(start ? 'StartToStart' : 'EndToStart', cursor);
}

function adoptEndPoint(textRange, range, start) {
    var cursorNode = dom.create(range.ownerDocument, 'a'), cursor = textRange.duplicate();
    cursor.collapse(start);
    var parent = cursor.parentElement();
    do {
        parent.insertBefore(cursorNode, cursorNode.previousSibling);
        cursor.moveToElementText(cursorNode);
    } while (cursor.compareEndPoints(start ? 'StartToStart' : 'StartToEnd', textRange) > 0 && cursorNode.previousSibling);

    cursor.setEndPoint(start ? 'EndToStart' : 'EndToEnd', textRange);

    var target = cursorNode.nextSibling;

    if (!target) {
        // at end of text node
        target = cursorNode.previousSibling;

        if (target && isDataNode(target)) { // in case of collapsed range in empty tag
            range.setEnd(target, target.nodeValue.length);
            dom.remove(cursorNode);
        } else {
            range.selectNodeContents(parent);
            dom.remove(cursorNode);
            range.endOffset -= 1; // cursorNode was in parent
        }

        return;
    }

    dom.remove(cursorNode);

    if (isDataNode(target))
        range[start ? 'setStart' : 'setEnd'](target, cursor.text.length);
    else
        range[start ? 'setStartBefore' : 'setEndBefore'](target);
}

var RangeEnumerator = Class.extend({
    init: function(range) {
        this.enumerate = function () {
            var nodes = [];

            function visit(node) {
                if (dom.is(node, 'img') || (node.nodeType == 3 && !dom.isWhitespace(node))) {
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
        }
    }
});

var RestorePoint = Class.extend({
    init: function(range) {
        var that = this;
        that.range = range;
        that.rootNode = RangeUtils.documentFromRange(range);
        that.body = that.rootNode.body;
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

            if (nodeType != 3 || lastType != nodeType)
                result ++;

            lastType = nodeType;
        }

        return result;
    },

    offset: function(node, value) {
        if (node.nodeType == 3) {
            while ((node = node.previousSibling) && node.nodeType == 3)
                value += node.nodeValue.length;
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

        while (length--)
            node = node.childNodes[path[length]];

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
            previous = that.caret.previousSibling;
            startOffset = 0;

        if (previous)
            startOffset = isDataNode(previous) ? previous.nodeValue.length : findNodeIndex(previous);

        var container = that.caret.parentNode;
        var containerIndex = previous ? findNodeIndex(previous) : 0;

        dom.remove(that.caret);
        normalize(container);

        var node = container.childNodes[containerIndex];

        if (isDataNode(node))
            range.setStart(node, startOffset);
        else if (node) {
            var textNode = dom.lastTextNode(node);
            if (textNode)
                range.setStart(textNode, textNode.nodeValue.length);
            else
                range[previous ? 'setStartAfter' : 'setStartBefore'](node);
        } else {
            if (!$.browser.msie && container.innerHTML == '')
                container.innerHTML = '<br _moz_dirty="" />';

            range.selectNodeContents(container);
        }
        range.collapse(true);
    },

    add: function (range, expand) {
        if (expand && range.collapsed) {
            this.addCaret(range);
            range = RangeUtils.expand(range);
        }

        var rangeBoundary = range.cloneRange();

        rangeBoundary.collapse(false);
        this.end = dom.create(RangeUtils.documentFromRange(range), 'span', { className: 'k-marker' });
        rangeBoundary.insertNode(this.end);

        rangeBoundary = range.cloneRange();
        rangeBoundary.collapse(true);
        this.start = this.end.cloneNode(true);
        rangeBoundary.insertNode(this.start);

        range.setStartBefore(this.start);
        range.setEndAfter(this.end);

        normalize(range.commonAncestorContainer);

        return range;
    },

    remove: function (range) {
        var start = this.start,
            end = this.end;

        normalize(range.commonAncestorContainer);

        while (!start.nextSibling && start.parentNode) start = start.parentNode;
        while (!end.previousSibling && end.parentNode) end = end.parentNode;

        var shouldNormalizeStart = (start.previousSibling && start.previousSibling.nodeType == 3)
                                && (start.nextSibling && start.nextSibling.nodeType == 3);

        var shouldNormalizeEnd = (end.previousSibling && end.previousSibling.nodeType == 3)
                                && (end.nextSibling && end.nextSibling.nodeType == 3);

        start = start.nextSibling;
        end = end.previousSibling;

        var collapsed = false;
        var collapsedToStart = false;
        // collapsed range
        if (start == this.end) {
            collapsedToStart = !!this.start.previousSibling;
            start = end = this.start.previousSibling || this.end.nextSibling;
            collapsed = true;
        }

        dom.remove(this.start);
        dom.remove(this.end);

        if (start == null || end == null) {
            range.selectNodeContents(range.commonAncestorContainer);
            range.collapse(true);
            return;
        }

        var startOffset = collapsed ? isDataNode(start) ? start.nodeValue.length : start.childNodes.length : 0;
        var endOffset = isDataNode(end) ? end.nodeValue.length : end.childNodes.length;

        if (start.nodeType == 3)
            while (start.previousSibling && start.previousSibling.nodeType == 3) {
                start = start.previousSibling;
                startOffset += start.nodeValue.length;
            }

        if (end.nodeType == 3)
            while (end.previousSibling && end.previousSibling.nodeType == 3) {
                end = end.previousSibling;
                endOffset += end.nodeValue.length;
            }
        var startIndex = findNodeIndex(start), startParent = start.parentNode;
        var endIndex = findNodeIndex(end), endParent = end.parentNode;

        for (var startPointer = start; startPointer.previousSibling; startPointer = startPointer.previousSibling)
            if (startPointer.nodeType == 3 && startPointer.previousSibling.nodeType == 3) startIndex--;

        for (var endPointer = end; endPointer.previousSibling; endPointer = endPointer.previousSibling)
            if (endPointer.nodeType == 3 && endPointer.previousSibling.nodeType == 3) endIndex--;

        normalize(startParent);

        if (start.nodeType == 3)
            start = startParent.childNodes[startIndex];

        normalize(endParent);
        if (end.nodeType == 3)
            end = endParent.childNodes[endIndex];

        if (collapsed) {
            if (start.nodeType == 3)
                range.setStart(start, startOffset);
            else
                range[collapsedToStart ? 'setStartAfter' : 'setStartBefore'](start);

            range.collapse(true);

        } else {
            if (start.nodeType == 3)
                range.setStart(start, startOffset);
            else
                range.setStartBefore(start);

            if (end.nodeType == 3)
                range.setEnd(end, endOffset);
            else
                range.setEndAfter(end);
        }
        if (this.caret)
            this.removeCaret(range);
    }

});

var boundary = /[\u0009-\u000d]|\u0020|\u00a0|\ufeff|\.|,|;|:|!|\(|\)|\?/;

var RangeUtils = {
    nodes: function(range) {
        var nodes = RangeUtils.textNodes(range);
        if (!nodes.length) {
            range.selectNodeContents(range.commonAncestorContainer);
            nodes = RangeUtils.textNodes(range);
            if (!nodes.length)
                nodes = dom.significantChildNodes(range.commonAncestorContainer);
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
        if ($.browser.msie && $.browser.version < 9) {
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

    split: function(range, node, trim) {
        function partition(start) {
            var partitionRange = range.cloneRange();
            partitionRange.collapse(start);
            partitionRange[start ? 'setStartBefore' : 'setEndAfter'](node);
            var contents = partitionRange.extractContents();
            if (trim)
                contents = dom.trim(contents);
            dom[start ? 'insertBefore' : 'insertAfter'](contents, node);
        }
        partition(true);
        partition(false);
    },

    getMarkers: function(range) {
        var markers = [];

        new RangeIterator(range).traverse(function (node) {
            if (node.className == 'k-marker')
                markers.push(node);
        });

        return markers;
    },

    image: function (range) {
        var nodes = [];

        new RangeIterator(range).traverse(function (node) {
            if (dom.is(node, 'img'))
                nodes.push(node);
        });

        if (nodes.length == 1)
            return nodes[0];
    },

    expand: function (range) {
        var result = range.cloneRange();

        var startContainer = result.startContainer.childNodes[result.startOffset == 0 ? 0 : result.startOffset - 1];
        var endContainer = result.endContainer.childNodes[result.endOffset];

        if (!isDataNode(startContainer) || !isDataNode(endContainer))
            return result;

        var beforeCaret = startContainer.nodeValue;
        var afterCaret = endContainer.nodeValue;

        if (beforeCaret == '' || afterCaret == '')
            return result;

        var startOffset = beforeCaret.split('').reverse().join('').search(boundary);
        var endOffset = afterCaret.search(boundary);

        if (startOffset == 0 || endOffset == 0)
            return result;

        endOffset = endOffset == -1 ? afterCaret.length : endOffset;
        startOffset = startOffset == -1 ? 0 : beforeCaret.length - startOffset;

        result.setStart(startContainer, startOffset);
        result.setEnd(endContainer, endOffset);

        return result;
    },

    isExpandable: function (range) {
        var node = range.startContainer;
        var document = RangeUtils.documentFromRange(range);

        if (node == document || node == document.body)
            return false;

        var result = range.cloneRange();

        var value = node.nodeValue;
        if (!value)
            return false;

        var beforeCaret = value.substring(0, result.startOffset);
        var afterCaret = value.substring(result.startOffset);

        var startOffset = 0, endOffset = 0;

        if (beforeCaret != '')
            startOffset = beforeCaret.split('').reverse().join('').search(boundary);

        if (afterCaret != '')
            endOffset = afterCaret.search(boundary);

        return startOffset != 0 && endOffset != 0;
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

})(jQuery);
(function($) {

    // Imports ================================================================
    var doc = document,
        kendo = window.kendo,
        Class = kendo.Class,
        Editor = kendo.ui.editor,
        EditorUtils = Editor.EditorUtils,
        registerTool = EditorUtils.registerTool,
        dom = Editor.Dom,
        RangeUtils = Editor.RangeUtils,
        selectRange = RangeUtils.selectRange,
        Tool = Editor.Tool,
        ToolTemplate = Editor.ToolTemplate,
        RestorePoint = Editor.RestorePoint,
        Marker = Editor.Marker,
        extend = $.extend;

var Command = Class.extend({
    init: function(options) {
        var that = this;
        that.options = options;
        that.restorePoint = new RestorePoint(options.range);
        that.marker = new Marker();
        that.formatter = options.formatter;
    },

    getRange: function () {
        return this.restorePoint.toRange();
    },

    lockRange: function (expand) {
        return this.marker.add(this.getRange(), expand);
    },

    releaseRange: function (range) {
        this.marker.remove(range);
        selectRange(range);
    },

    undo: function () {
        var point = this.restorePoint;
        point.body.innerHTML = point.html;
        selectRange(point.toRange());
    },

    redo: function () {
        this.exec();
    },

    exec: function () {
        var that = this,
        range = that.lockRange(true);
        that.formatter.editor = that.editor;
        that.formatter.toggle(range);
        that.releaseRange(range);
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
        selectRange(this.endRestorePoint.toRange());
    },

    undo: function () {
        this.body.innerHTML = this.startRestorePoint.html;
        selectRange(this.startRestorePoint.toRange());
    }
});

var InsertHtmlCommand = Command.extend({
    init: function(options) {
        Command.fn.init.call(this, options);

        this.managesUndoRedo = true;
    },

    exec: function() {
        var editor = this.editor;
        var range = editor.getRange();
        var startRestorePoint = new RestorePoint(range);

        editor.clipboard.paste(this.options.value || '');
        editor.undoRedoStack.push(new GenericCommand(startRestorePoint, new RestorePoint(editor.getRange())));

        editor.focus();
    }
});

var InsertHtmlTool = Tool.extend({
    initialize: function($ui, initOptions) {
        var editor = initOptions.editor;
        var title = editor.options.localization.insertHtml;

        $ui.kendoDropDownList({
            data: editor['insertHtml'],
            itemCreate: function (e) {
                e.html = '<span unselectable="on">' + e.dataItem.Text + '</span>';
            },
            change: function (e) {
                Tool.exec(editor, 'insertHtml', e.value);
            },
            highlightFirst: false
        }).find('.k-input').html(editor.options.localization.insertHtml);
    },

    command: function (commandArguments) {
        return new InsertHtmlCommand(commandArguments);
    },

    update: function($ui, nodes) {
        var list = $ui.data('kendoDropDownList');
        list.close();
        list.value(title);
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
        if (this.canUndo())
            this.stack[this.currentCommandIndex--].undo();
    },

    redo: function () {
        if (this.canRedo())
            this.stack[++this.currentCommandIndex].redo();
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
        var editor = this.editor,
            keyboard = editor.keyboard;
            isTypingKey = keyboard.isTypingKey(e);

        if (isTypingKey && !keyboard.isTypingInProgress()) {
            var range = editor.getRange();
            this.startRestorePoint = new RestorePoint(range);

            keyboard.startTyping($.proxy(function () {
                editor.selectionRestorePoint = this.endRestorePoint = new RestorePoint(editor.getRange());
                editor.undoRedoStack.push(new GenericCommand(this.startRestorePoint, this.endRestorePoint));
            }, this));

            return true;
        }

        return false;
    },

    keyup: function (e) {
        var keyboard = this.editor.keyboard;

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
        this.endRestorePoint = new RestorePoint(this.editor.getRange());
        this.editor.undoRedoStack.push(new GenericCommand(this.startRestorePoint, this.endRestorePoint));
        this.startRestorePoint = this.endRestorePoint;
    },

    changed: function () {
        if (this.startRestorePoint)
            return this.startRestorePoint.html != this.editor.body.innerHTML;

        return false;
    },

    keydown: function (e) {
        var editor = this.editor,
            keyboard = editor.keyboard;

        if (keyboard.isModifierKey(e)) {

            if (keyboard.isTypingInProgress())
                keyboard.endTyping(true);

            this.startRestorePoint = new RestorePoint(editor.getRange());
            return true;
        }

        if (keyboard.isSystem(e)) {
            this.systemCommandIsInProgress = true;

            if (this.changed()) {
                this.systemCommandIsInProgress = false;
                this.createUndoCommand();
            }

            return true;
        }

        return false;
    },

    keyup: function (e) {
        if (this.systemCommandIsInProgress && this.changed()) {
            this.systemCommandIsInProgress = false;
            this.createUndoCommand(e);
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
        var key = String.fromCharCode(e.keyCode);

        for (var toolName in tools) {
            var toolOptions = tools[toolName].options || {};

            if ((toolOptions.key == key || toolOptions.key == e.keyCode)
                && !!toolOptions.ctrl == e.ctrlKey
                && !!toolOptions.alt == e.altKey
                && !!toolOptions.shift == e.shiftKey) {
                return toolName;
            }
        }
    },

    isTypingKey: function (e) {
        var keyCode = e.keyCode;
        return (this.isCharacter(keyCode) && !e.ctrlKey && !e.altKey) || keyCode == 32 || keyCode == 13
        || keyCode == 8 || (keyCode == 46 && !e.shiftKey && !e.ctrlKey && !e.altKey);
    },

    isModifierKey: function (e) {
        var keyCode = e.keyCode;
        return (keyCode == 17 && !e.shiftKey && !e.altKey)
                || (keyCode == 16 && !e.ctrlKey && !e.altKey)
                || (keyCode == 18 && !e.ctrlKey && !e.shiftKey);
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
        if (this.onEndTyping)
            this.onEndTyping();
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
        for (var i = 0; i < this.handlers.length; i++)
            if (this.handlers[i][what](e))
                break;
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
        this.cleaners = [new MSWordFormatCleaner()];
    },

    htmlToFragment: function(html) {
        var editor = this.editor,
            container = dom.create(editor.document, 'div');

        container.innerHTML = html;

        var fragment = editor.document.createDocumentFragment();

        while (container.firstChild)
            fragment.appendChild(container.firstChild);

        return fragment;
    },

    isBlock: function(html) {
        return /<(div|p|ul|ol|table|h[1-6])/i.test(html);
    },

    oncut: function(e) {
        var editor = this.editor,
            startRestorePoint = new RestorePoint(editor.getRange());
        setTimeout(function() {
            editor.undoRedoStack.push(new GenericCommand(startRestorePoint, new RestorePoint(editor.getRange())));
        });
    },

    onpaste: function(e) {
        var editor = this.editor,
            range = editor.getRange(),
            startRestorePoint = new RestorePoint(range),
            clipboardNode = dom.create(editor.document, 'div', {className:'k-paste-container', innerHTML: '\ufeff'});

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
            $(editor.body).bind('paste', arguments.callee);
        } else {
            var clipboardRange = editor.createRange();
            clipboardRange.selectNodeContents(clipboardNode);
            selectRange(clipboardRange);
        }

        setTimeout(function() {
            selectRange(range);
            dom.remove(clipboardNode);

            if (clipboardNode.lastChild && dom.is(clipboardNode.lastChild, 'br'))
                dom.remove(clipboardNode.lastChild);

            var args = { html: clipboardNode.innerHTML };
            editor.trigger("paste", args);
            editor.clipboard.paste(args.html, true);
            editor.undoRedoStack.push(new GenericCommand(startRestorePoint, new RestorePoint(editor.getRange())));
            Editor.EditorUtils.select(editor);
        });
    },

    splittableParent: function(block, node) {
        if (block)
            return dom.parentOfType(node, ['p', 'ul', 'ol']) || node.parentNode;

        var parent = node.parentNode;
        var body = node.ownerDocument.body;

        if (dom.isInline(parent)) {
            while (parent.parentNode != body && !dom.isBlock(parent.parentNode))
                parent = parent.parentNode;
        }

        return parent;
    },

    paste: function (html, clean) {
        var editor = this.editor,
            i, l;

        for (i = 0, l = this.cleaners.length; i < l; i++)
            if (this.cleaners[i].applicable(html))
                html = this.cleaners[i].clean(html);

        if (clean) {
            // remove br elements which immediately precede block elements
            html = html.replace(/(<br>(\s|&nbsp;)*)+(<\/?(div|p|li|col|t))/ig, "$3");
            // remove empty inline elements
            html = html.replace(/<(a|span)[^>]*><\/\1>/ig, "");
        }

        // It is possible in IE to copy just <li> tags
        html = html.replace(/^<li/i, '<ul><li').replace(/li>$/g, 'li></ul>');

        var block = this.isBlock(html);

        var range = editor.getRange();
        range.deleteContents();

        if (range.startContainer == editor.document)
            range.selectNodeContents(editor.body);

        var marker = new Marker();
        var caret = marker.addCaret(range)

        var parent = this.splittableParent(block, caret);
        var unwrap = false;

        if (!/body|td/.test(dom.name(parent)) && (block || dom.isInline(parent))) {
            range.selectNode(caret);
            RangeUtils.split(range, parent, true);
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

        range.insertNode(fragment);

        parent = this.splittableParent(block, caret);
        if (unwrap) {
            while (caret.parentNode != parent)
                dom.unwrap(caret.parentNode);

            dom.unwrap(caret.parentNode);
        }

        dom.normalize(range.commonAncestorContainer);
        caret.style.display = 'inline';
        dom.scrollTo(caret);
        marker.removeCaret(range);
        selectRange(range);
    }
});

var MSWordFormatCleaner = Class.extend({
    init: function() {
        this.replacements = [
            /<\?xml[^>]*>/gi, '',
            /<!--(.|\n)*?-->/g, '', /* comments */
            /&quot;/g, "'", /* encoded quotes (in attributes) */
            /(?:<br>&nbsp;[\s\r\n]+|<br>)*(<\/?(h[1-6]|hr|p|div|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|caption|address|pre|form|blockquote|dl|dt|dd|dir|fieldset)[^>]*>)(?:<br>&nbsp;[\s\r\n]+|<br>)*/g, '$1',
            /<br><br>/g, '<BR><BR>',
            /<br>/g, ' ',
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
            /style=(["|'])\s*\1/g, '' /* empty style attributes */
        ];
    },

    applicable: function(html) {
        return /class="?Mso|style="[^"]*mso-/i.test(html);
    },

    listType: function(html) {
        if (/^[\u2022\u00b7\u00a7\u00d8o]\u00a0+/.test(html))
            return 'ul';

        if (/^\s*\w+[\.\)]\u00a0{2,}/.test(html))
            return 'ol';
    },

    lists: function(html) {
        var placeholder = dom.create(document, 'div', {innerHTML: html});
        var blockChildren = $(dom.blockElements.join(','), placeholder);

        var lastMargin = -1, lastType, levels = {'ul':{}, 'ol':{}}, li = placeholder;

        for (var i = 0; i < blockChildren.length; i++) {
            var p = blockChildren[i];
            var html = p.innerHTML.replace(/<\/?\w+[^>]*>/g, '').replace(/&nbsp;/g, '\u00a0');
            var type = this.listType(html);

            if (!type || dom.name(p) != 'p') {
                if (p.innerHTML == '') {
                    dom.remove(p);
                } else {
                    levels = {'ul':{}, 'ol':{}};
                    li = placeholder;
                    lastMargin = -1;
                }
                continue;
            }

            var margin = parseFloat(p.style.marginLeft || 0);
            var list = levels[type][margin];

            if (margin > lastMargin || !list) {
                list = dom.create(document, type);

                if (li == placeholder)
                    dom.insertBefore(list, p);
                else
                    li.appendChild(list);

                levels[type][margin] = list;
            }

            if (lastType != type) {
                for (var key in levels)
                    for (var child in levels[key])
                        if ($.contains(list, levels[key][child]))
                            delete levels[key][child];
            }

            dom.remove(p.firstChild);
            li = dom.create(document, 'li', {innerHTML:p.innerHTML});
            list.appendChild(li);
            dom.remove(p);
            lastMargin = margin;
            lastType = type;
        }
        return placeholder.innerHTML;
    },

    stripEmptyAnchors: function(html) {
        return html.replace(/<a([^>]*)>\s*<\/a>/ig, function(a, attributes) {
            if (!attributes || attributes.indexOf("href") < 0) {
                return "";
            }

            return a;
        });
    },

    clean: function(html) {
        for (var i = 0, l = this.replacements.length; i < l; i+= 2)
            html = html.replace(this.replacements[i], this.replacements[i+1]);

        html = this.stripEmptyAnchors(html);
        html = this.lists(html);
        html = html.replace(/\s+class="?[^"\s>]*"?/ig, '');

        return html;
    }
});

extend(Editor, {
    Command: Command,
    GenericCommand: GenericCommand,
    InsertHtmlCommand: InsertHtmlCommand,
    InsertHtmlTool: InsertHtmlTool,
    UndoRedoStack: UndoRedoStack,
    TypingHandler: TypingHandler,
    SystemHandler: SystemHandler,
    Keyboard: Keyboard,
    Clipboard: Clipboard,
    MSWordFormatCleaner: MSWordFormatCleaner
});

registerTool("insertHtml", new InsertHtmlTool({template: new ToolTemplate({template: EditorUtils.dropDownListTemplate, title: "Insert HTML", initialValue: "Insert HTML"})}));

})(jQuery);
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
                    if (!formatNode.style.cssText) {
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

        if (!attributes) return;

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

        return;
    },

    getFormatInner: function (node) {
        var $node = $(dom.isDataNode(node) ? node.parentNode : node),
            parents = $node.parents().andSelf(),
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
        var that = this;

        InlineFormatter.fn.init.call(that, format, values);

        that.greedyProperty = greedyProperty;
        that.values = values;
        that.finder = new GreedyInlineFormatFinder(format, greedyProperty)
    },

    activate: function(range, nodes) {
        var that = this;
        that.split(range);

        if (that.greedyProperty) {
            var camelCase = that.greedyProperty.replace(/-([a-z])/, function(all, letter){return letter.toUpperCase()});
            that[that.values.style[camelCase] == "inherit" ? "remove" : "apply"](nodes);
        } else {
            that.apply(nodes);
        }
    }
});

function inlineFormatWillDelayExecution (range) {
    return range.collapsed && !RangeUtils.isExpandable(range);
}

var InlineFormatTool = FormatTool.extend({
    init: function(options) {
        FormatTool.fn.init.call(this, extend(options, {
            finder: new InlineFormatFinder(options.format),
            formatter: function () { return new InlineFormatter(options.format) }
        }));

        this.willDelayExecution = inlineFormatWillDelayExecution;
    }
});

var FontTool = Tool.extend({
    init: function(options) {
        var that = this;
        Tool.fn.init.call(that, options);

        // IE has single selection hence we are using select box instead of combobox
        that.options = options;
        that.type = ($.browser.msie || kendo.support.touch) ? "kendoDropDownList" : "kendoComboBox";
        that.format = [{ tags: ["span"] }],
        that.finder = new GreedyInlineFormatFinder(that.format, options.cssAttr);
    },

    command: function (commandArguments) {
        var options = this.options;
            format = this.format,
            style = {};
        return new Editor.FormatCommand(extend(commandArguments, {
            formatter: function () {
                style[options.domAttr] = commandArguments.value;

                return new GreedyInlineFormatter(format, { style: style }, options.cssAttr);
            }
        }))
    },

    willDelayExecution: inlineFormatWillDelayExecution,

    update: function(ui, nodes, pendingFormats) {
        var that = this,
            list = ui.data(that.type),
            pendingFormat = pendingFormats.getPending(that.name),
            format = (pendingFormat && pendingFormat.params) ? pendingFormat.params.value : that.finder.getFormat(nodes);

        list.close();
        list.value(format);
    },

    initialize: function (ui, initOptions) {
        var editor = initOptions.editor,
            toolName = this.options.name;

        ui[this.type]({
            dataTextField: "Text",
            dataValueField: "Value",
            dataSource: editor.options[toolName],
            change: function (e) {
                Tool.exec(editor, toolName, this.value());
            },
            highlightFirst: false
        });

        ui.closest(".k-widget").removeClass("k-" + toolName).find("*").andSelf().attr("unselectable", "on");

        ui.data(this.type).value("inherit");
    }

});

var ColorTool = Tool.extend({
    init: function(options) {
        Tool.fn.init.call(this, options);

        this.options = options;
        this.format = [{ tags: dom.inlineElements }];
    },

    update: function(ui) {
        ui.data("kendoColorPicker").close();
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

    willDelayExecution: inlineFormatWillDelayExecution,

    initialize: function(ui, initOptions) {
        var editor = initOptions.editor,
            toolName = this.name;

        ui.kendoColorPicker({
            value: "#000000",
            change: function (e) {
                Tool.exec(editor, toolName, e.value);
            }
        });
    }

});

var StyleTool = Tool.extend({
    init: function(options) {
        var that = this;
        Tool.fn.init.call(that, options);

        that.format = [{ tags: ["span"] }];
        that.finder = new GreedyInlineFormatFinder(that.format, "className");
    },

    command: function (commandArguments) {
        return new Editor.FormatCommand(extend(commandArguments, {
            formatter: function () {
                return new GreedyInlineFormatter(this.format, { className: commandArguments.value });
            }
        }));
    },

    update: function(ui, nodes) {
        var list = ui.data("kendoDropDownList");
        list.close();
        list.value(this.finder.getFormat(nodes));
    },

    initiliaze: function(ui, initOptions) {
        var editor = initOptions.editor;

        ui.kendoDropDownList({
            data: editor["style"],
            title: editor.options.localization.style,
            itemCreate: function (e) {
                var style = dom.inlineStyle(editor.document, "span", {className : e.dataItem.Value});

                e.html = '<span unselectable="on" style="display:block;' + style +'">' + e.html + '</span>';
            },
            change: function (e) {
                Tool.exec(editor, "style", e.value);
            }
        });
    }

});

extend(Editor, {
    InlineFormatFinder: InlineFormatFinder,
    InlineFormatter: InlineFormatter,
    GreedyInlineFormatFinder: GreedyInlineFormatFinder,
    GreedyInlineFormatter: GreedyInlineFormatter,
    InlineFormatTool: InlineFormatTool,
    FontTool: FontTool,
    ColorTool: ColorTool,
    StyleTool: StyleTool
});

registerTool("style", new Editor.StyleTool({template: new ToolTemplate({template: EditorUtils.dropDownListTemplate, title: "Indent", initialValue: "Styles"})}));

registerFormat("bold", [ { tags: ["strong"] }, { tags: ["span"], attr: { style: { fontWeight: "bold"}} } ]);
registerTool("bold", new InlineFormatTool({ key: "B", ctrl: true, format: formats.bold, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Bold"}) }));

registerFormat("italic", [ { tags: ["em"] }, { tags: ["span"], attr: { style: { fontStyle: "italic"}} } ]);
registerTool("italic", new InlineFormatTool({ key: "I", ctrl: true, format: formats.italic, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Italic"})}));

registerFormat("underline", [ { tags: ["span"], attr: { style: { textDecoration: "underline"}} } ]);
registerTool("underline", new InlineFormatTool({ key: "U", ctrl: true, format: formats.underline, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Underline"})}));

registerFormat("strikethrough", [ { tags: ["del"] }, { tags: ["span"], attr: { style: { textDecoration: "line-through"}} } ]);
registerTool("strikethrough", new InlineFormatTool({format: formats.strikethrough, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Strikethrough"})}));

registerFormat("superscript", [ { tags: ["sup"] } ]);
registerTool("superscript", new InlineFormatTool({format: formats.superscript, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Superscript"})}));

registerFormat("subscript", [ { tags: ["sub"] } ]);
registerTool("subscript", new InlineFormatTool({format: formats.subscript, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Subscript"})}));

registerTool("foreColor", new ColorTool({cssAttr:"color", domAttr:"color", name:"foreColor", template: new ToolTemplate({template: EditorUtils.colorPickerTemplate, title: "Color"})}));

registerTool("backColor", new ColorTool({cssAttr:"background-color", domAttr: "backgroundColor", name:"backColor", template: new ToolTemplate({template: EditorUtils.colorPickerTemplate, title: "Background Color"})}));

registerTool("fontName", new FontTool({cssAttr:"font-family", domAttr: "fontFamily", name:"fontName", template: new ToolTemplate({template: EditorUtils.comboBoxTemplate, title: "Font Name", initialValue: "(inherited font)"})}));

registerTool("fontSize", new FontTool({cssAttr:"font-size", domAttr:"fontSize", name:"fontSize", template: new ToolTemplate({template: EditorUtils.comboBoxTemplate, title: "Font Size", initialValue: "(inherited size)"})}));

})(jQuery);
(function($) {

var kendo = window.kendo,
    Class = kendo.Class,
    extend = $.extend,
    Editor = kendo.ui.editor,
    formats = kendo.ui.Editor.fn.options.formats,
    dom = Editor.Dom,
    Command = Editor.Command,
    Tool = Editor.Tool,
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
            if (child == null || !dom.isAncestorOrSelf(node, child))
                return false;
        }

        return true;
    },

    findSuitable: function (nodes) {
        var format = this.format,
            suitable = [],
            i, len, candidate;

        for (i = 0, len = nodes.length; i < len; i++) {
            candidate = dom.ofType(nodes[i], format[0].tags) ? nodes[i] : dom.parentOfType(nodes[i], format[0].tags);
            if (!candidate)
                return [];
            if ($.inArray(candidate, suitable) < 0)
                suitable.push(candidate);
        }

        for (i = 0, len = suitable.length; i < len; i++)
            if (this.contains(suitable[i], suitable))
                return [suitable[i]];

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
                if (dom.ofType(node, tags) && dom.attrEquals(node, attributes))
                    return node;
                node = node.parentNode;
            }
        }
        return null;
    },

    getFormat: function (nodes) {
        var findFormat = $.proxy(function(node) { return this.findFormat(dom.isDataNode(node) ? node.parentNode : node); }, this),
            result = findFormat(nodes[0]),
            i;

        if (!result)
            return "";

        for (i = 1, len = nodes.length; i < len; i++)
            if (result != findFormat(nodes[i]))
                return "";

        return result.nodeName.toLowerCase();
    },

    isFormatted: function (nodes) {
        for (var i = 0, len = nodes.length; i < len; i++)
            if (!this.findFormat(nodes[i]))
                return false;

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

        if (dom.isInline(commonAncestor))
            commonAncestor = dom.blockParentOrBody(commonAncestor);

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

        if (wrapper.firstChild)
            dom.insertAt(commonAncestor, wrapper, position);
    },

    apply: function (nodes) {
        var that = this,
            formatNodes = dom.is(nodes[0], "img") ? [nodes[0]] : that.finder.findSuitable(nodes),
            formatToApply = formatNodes.length ? EditorUtils.formatByName(dom.name(formatNodes[0]), that.format) : that.format[0],
            tag = formatToApply.tags[0],
            attributes = extend({}, formatToApply.attr, that.values),
            i, len;

        if (formatNodes.length) {
            for (i = 0, len = formatNodes.length; i < len; i++) {
                dom.attr(formatNodes[i], attributes);
            }
        } else {
            that.wrap(tag, attributes, nodes);
        }
    },

    remove: function (nodes) {
        var i, l, formatNode, namedFormat;

        for (i = 0, l = nodes.length; i < l; i++) {
            formatNode = this.finder.findFormat(nodes[i]);
            if (formatNode) {
                if (dom.ofType(formatNode, ["p", "img", "li"])) {
                    namedFormat = EditorUtils.formatByName(dom.name(formatNode), this.format);
                    if (namedFormat.attr.style) {
                        dom.unstyle(formatNode, namedFormat.attr.style);
                    }
                    if (namedFormat.attr.className) {
                        dom.removeClass(formatNode, namedFormat.attr.className);
                    }
                } else {
                    dom.unwrap(formatNode);
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
            i, len, list, formatter, range;

        if (blocks.length) {
            for (i = 0, len = blocks.length; i < len; i++) {
                if (dom.is(blocks[i], "li")) {
                    list = blocks[i].parentNode;
                    formatter = new Editor.ListFormatter(list.nodeName.toLowerCase(), formatTag);
                    range = this.editor.createRange();
                    range.selectNode(blocks[i]);
                    formatter.toggle(range);
                } else {
                    dom.changeTag(blocks[i], formatTag);
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

var BlockFormatTool = FormatTool.extend({
    init: function (options) {
        FormatTool.fn.init.call(this, extend(options, {
            finder: new BlockFormatFinder(options.format),
            formatter: function () { return new BlockFormatter(options.format) }
        }));
    }
});

var FormatBlockTool = Tool.extend({
    init: function (options) {
        Tool.fn.init.call(this, options);
        this.finder = new BlockFormatFinder([{ tags: dom.blockElements }]);
    },

    command: function (commandArguments) {
        return new FormatCommand(extend(commandArguments, {
            formatter: function () { return new GreedyBlockFormatter([{ tags: [commandArguments.value] }], {}); }
        }));
    },

    update: function(ui, nodes) {
        var list;
        if (ui.is("select")) {
            list = ui.data("kendoDropDownList");
        } else {
            list = ui.find("select").data("kendoDropDownList");
        }
        list.close();
        list.value(this.finder.getFormat(nodes));
    },

    initialize: function(ui, initOptions) {
        var editor = initOptions.editor,
            toolName = "formatBlock";

        ui.kendoDropDownList({
            dataTextField: "Text",
            dataValueField: "Value",
            dataSource: editor.options.formatBlock,
            title: editor.options.localization.formatBlock,
            change: function (e) {
                Tool.exec(editor, toolName, this.value());
            },
            highlightFirst: false
        });

        ui.closest(".k-widget").removeClass("k-" + toolName).find("*").andSelf().attr("unselectable", "on");
    }

});

extend(Editor, {
    BlockFormatFinder: BlockFormatFinder,
    BlockFormatter: BlockFormatter,
    GreedyBlockFormatter: GreedyBlockFormatter,
    FormatCommand: FormatCommand,
    BlockFormatTool: BlockFormatTool,
    FormatBlockTool: FormatBlockTool
});

registerTool("formatBlock", new FormatBlockTool({template: new ToolTemplate({template: EditorUtils.dropDownListTemplate, title: "Format Block", initialValue: "Select Block Type"})}));

registerFormat("justifyLeft", [ { tags: dom.blockElements, attr: { style: { textAlign: "left"}} }, { tags: ["img"], attr: { style: { "float": "left"}} } ]);
registerTool("justifyLeft", new BlockFormatTool({format: formats.justifyLeft, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Justify Left"})}));

registerFormat("justifyCenter", [ { tags: dom.blockElements, attr: { style: { textAlign: "center"}} }, { tags: ["img"], attr: { style: { display: "block", marginLeft: "auto", marginRight: "auto"}} } ]);
registerTool("justifyCenter", new BlockFormatTool({format: formats.justifyCenter, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Justify Center"})}));

registerFormat("justifyRight", [ { tags: dom.blockElements, attr: { style: { textAlign: "right"}} }, { tags: ["img"], attr: { style: { "float": "right"}} } ]);
registerTool("justifyRight", new BlockFormatTool({format: formats.justifyRight, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Justify Right"})}));

registerFormat("justifyFull", [ { tags: dom.blockElements, attr: { style: { textAlign: "justify"}} } ]);
registerTool("justifyFull", new BlockFormatTool({format: formats.justifyFull, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Justify Full"})}));

})(jQuery);
(function($) {

// Imports ================================================================
var kendo = window.kendo,
    Class = kendo.Class,
    extend = $.extend,
    Editor = kendo.ui.editor,
    dom = Editor.Dom,
    Command = Editor.Command,
    Tool = Editor.Tool,
    BlockFormatter = Editor.BlockFormatter,
    normalize = dom.normalize,
    RangeUtils = Editor.RangeUtils,
    registerTool = Editor.EditorUtils.registerTool;

var ParagraphCommand = Command.extend({
    init: function(options) {
        this.options = options;
        Command.fn.init.call(this, options);
    },

    exec: function () {
        var range = this.getRange(),
            document = RangeUtils.documentFromRange(range),
            parent, previous, next,
            emptyParagraphContent = $.browser.msie ? '' : '<br _moz_dirty="" />',
            paragraph, marker, li, heading, rng,
            // necessary while the emptyParagraphContent is empty under IE
            blocks = 'p,h1,h2,h3,h4,h5,h6'.split(','),
            startInBlock = dom.parentOfType(range.startContainer, blocks),
            endInBlock = dom.parentOfType(range.endContainer, blocks),
            shouldTrim = (startInBlock && !endInBlock) || (!startInBlock && endInBlock);

        range.deleteContents();

        marker = dom.create(document, 'a');
        range.insertNode(marker);

        normalize(marker.parentNode);

        li = dom.parentOfType(marker, ['li']);
        heading = dom.parentOfType(marker, 'h1,h2,h3,h4,h5,h6'.split(','));

        if (li) {
            rng = range.cloneRange();
            rng.selectNode(li);

            // hitting 'enter' in empty li
            if (RangeUtils.textNodes(rng).length == 0) {
                paragraph = dom.create(document, 'p');

                if (li.nextSibling) {
                    RangeUtils.split(rng, li.parentNode);
                }

                dom.insertAfter(paragraph, li.parentNode);
                dom.remove(li.parentNode.childNodes.length == 1 ? li.parentNode : li);
                paragraph.innerHTML = emptyParagraphContent;
                next = paragraph;
            }
        } else if (heading && !marker.nextSibling) {
            paragraph = dom.create(document, 'p');

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

            function clean(node) {
                if (node.firstChild && dom.is(node.firstChild, 'br')) {
                    dom.remove(node.firstChild);
                }

                if (dom.isDataNode(node) && node.nodeValue == '') {
                    node = node.parentNode;
                }

                if (node && !dom.is(node, 'img')) {
                    while (node.firstChild && node.firstChild.nodeType == 1) {
                        node = node.firstChild;
                    }

                    if (node.innerHTML == '') {
                        node.innerHTML = emptyParagraphContent;
                    }
                }
            }

            clean(previous);
            clean(next);

            // normalize updates the caret display in Gecko
            normalize(previous);
        }

        normalize(next);

        if (dom.is(next, 'img')) {
            range.setStartBefore(next);
        } else {
            range.selectNodeContents(next);
        }

        range.collapse(true);

        dom.scrollTo(next);

        RangeUtils.selectRange(range);
    }

});

var NewLineCommand = Command.extend({
    init: function(options) {
        this.options = options;
        Command.fn.init.call(this, options);
    },

    exec: function () {
        var range = this.getRange();
        range.deleteContents();
        var br = dom.create(RangeUtils.documentFromRange(range), 'br');
        range.insertNode(br);
        normalize(br.parentNode);

        if (!$.browser.msie && (!br.nextSibling || dom.isWhitespace(br.nextSibling))) {
            //Gecko and WebKit cannot put the caret after only one br.
            var filler = br.cloneNode(true);
            filler.setAttribute('_moz_dirty', '');
            dom.insertAfter(filler, br);
        }
        range.setStartAfter(br);
        range.collapse(true);
        RangeUtils.selectRange(range);
    }
});

extend(Editor, {
    ParagraphCommand: ParagraphCommand,
    NewLineCommand: NewLineCommand
});

registerTool("insertLineBreak", new Tool({ key: 13, shift: true, command: NewLineCommand }));
registerTool("insertParagraph", new Tool({ key: 13, command: ParagraphCommand }));

})(jQuery);
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

        for (var i = 0; i < nodes.length; i++)
            if ((formatNode = this.findFormat(nodes[i])) && dom.name(formatNode) == this.tag)
                formatNodes.push(formatNode);

        if (formatNodes.length < 1) {
            return false;
        }

        if (formatNodes.length != nodes.length) {
            return false;
        }

        for (i = 0; i < formatNodes.length; i++) {
            if (formatNodes[i] != formatNode) {
                return false;
            }
        }

        return true;
    },

    findSuitable: function (nodes) {
        var candidate = dom.parentOfType(nodes[0], this.tags)
        if (candidate && dom.name(candidate) == this.tag)
            return candidate;
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

    wrap: function(list, nodes) {
        var li = dom.create(list.ownerDocument, 'li');

        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];

            if (dom.is(node, 'li')) {
                list.appendChild(node);
                continue;
            }

            if (dom.is(node, 'ul') || dom.is(node, 'ol')) {
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

        if (li.firstChild)
            list.appendChild(li);
    },

    containsAny: function(parent, nodes) {
        for (var i = 0; i < nodes.length; i++)
            if (dom.isAncestorOrSelf(parent, nodes[i]))
                return true;

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
        var nodes = textNodes(range);
        if (nodes.length) {
            var start = dom.parentOfType(nodes[0], ['li']);
            var end = dom.parentOfType(nodes[nodes.length - 1], ['li'])
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

    apply: function (nodes) {
        var tag = this.tag,
            commonAncestor = nodes.length == 1 ? dom.parentOfType(nodes[0], ['ul','ol']) : dom.commonAncestor.apply(null, nodes);

        if (!commonAncestor)
            commonAncestor = dom.parentOfType(nodes[0], ["td"]) || nodes[0].ownerDocument.body;

        if (dom.isInline(commonAncestor))
            commonAncestor = dom.blockParentOrBody(commonAncestor);

        var ancestors = [];

        var formatNode = this.finder.findSuitable(nodes);

        if (!formatNode)
            formatNode = new ListFormatFinder(tag == 'ul' ? 'ol' : 'ul').findSuitable(nodes);

        var childNodes = dom.significantChildNodes(commonAncestor);

        if (!childNodes.length) {
            childNodes = nodes;
        }

        if (/table|tbody/.test(dom.name(commonAncestor))) {
            childNodes = $.map(nodes, function(node) { return dom.parentOfType(node, ["td"]) });
        }

        for (var i = 0; i < childNodes.length; i++) {
            var child = childNodes[i];
            var nodeName = dom.name(child);
            if (this.suitable(child, nodes) && (!formatNode || !dom.isAncestorOrSelf(formatNode, child))) {

                if (formatNode && (nodeName == 'ul' || nodeName == 'ol')) {
                    // merging lists
                    $.each(child.childNodes, function () { ancestors.push(this) });
                    dom.remove(child);
                } else {
                    ancestors.push(child);
                }
            }
        }

        if (ancestors.length == childNodes.length && commonAncestor != nodes[0].ownerDocument.body && !/table|tbody|tr|td/.test(dom.name(commonAncestor)))
            ancestors = [commonAncestor];

        if (!formatNode) {
            formatNode = dom.create(commonAncestor.ownerDocument, tag);
            dom.insertBefore(formatNode, ancestors[0]);
        }

        this.wrap(formatNode, ancestors);

        if (!dom.is(formatNode, tag))
            dom.changeTag(formatNode, tag);

        var prev = formatNode.previousSibling;
        while (prev && (prev.className == "k-marker" || (prev.nodeType == 3 && dom.isWhitespace(prev)))) prev = prev.previousSibling;

        // merge with previous list
        if (prev && dom.name(prev) == tag) {
            while(formatNode.firstChild) {
                prev.appendChild(formatNode.firstChild);
            }
            dom.remove(formatNode);
            formatNode = prev;
        }

        var next = formatNode.nextSibling;
        while (next && (next.className == "k-marker" || (next.nodeType == 3 && dom.isWhitespace(next)))) next = next.nextSibling;

        // merge with next list
        if (next && dom.name(next) == tag) {
            while(formatNode.lastChild) {
                next.insertBefore(formatNode.lastChild, next.firstChild);
            }
            dom.remove(formatNode);
        }
    },

    unwrap: function(ul) {
        var fragment = document.createDocumentFragment(),
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
        for (var i = 0, l = nodes.length; i < l; i++)
            if (formatNode = this.finder.findFormat(nodes[i]))
                this.unwrap(formatNode);
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

})(jQuery);
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
            var markers = RangeUtils.getMarkers(range);
            var document = RangeUtils.documentFromRange(range);
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

var UnlinkCommand = Command.extend({
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
        cmd.options = options;
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
            var href = $('#k-editor-link-url', dialog.element).val();

            if (href && href != 'http://') {
                self.attributes = { href: href };

                var title = $('#k-editor-link-title', dialog.element).val();
                if (title)
                    self.attributes.title = title;

                var text = $('#k-editor-link-text', dialog.element).val();
                if (text !== initialText)
                    self.attributes.innerHTML = text || href;

                var target = $('#k-editor-link-target', dialog.element).is(':checked');
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

            dom.windowFromDocument(RangeUtils.documentFromRange(range)).focus();

            self.releaseRange(range);
        }

        var a = nodes.length ? self.formatter.finder.findSuitable(nodes[0]) : null;

        var shouldShowText = nodes.length <= 1 || (nodes.length == 2 && collapsed);

        var windowContent =
            '<div class="k-editor-dialog">' +
                '<ol>' +
                    '<li class="k-form-text-row"><label for="k-editor-link-url">Web address</label><input type="text" class="k-input" id="k-editor-link-url"/></li>' +
                    (shouldShowText ? '<li class="k-form-text-row"><label for="k-editor-link-text">Text</label><input type="text" class="k-input" id="k-editor-link-text"/></li>' : '') +
                    '<li class="k-form-text-row"><label for="k-editor-link-title">Tooltip</label><input type="text" class="k-input" id="k-editor-link-title"/></li>' +
                    '<li class="k-form-checkbox-row"><input type="checkbox" id="k-editor-link-target"/><label for="k-editor-link-target">Open link in new window</label></li>' +
                '</ol>' +
                '<div class="k-button-wrapper">' +
                    '<button class="k-dialog-insert k-button">Insert</button>' +
                    '&nbsp;or&nbsp;' +
                    '<a href="#" class="k-dialog-close k-link">Close</a>' +
                '</div>' +
            '</div>';

        var dialog = $(windowContent).appendTo(document.body).kendoWindow($.extend({}, this.editor.options.dialogOptions, {
            title: "Insert link",
            close: close
        }))
            .hide()
            .find('.k-dialog-insert').click(apply).end()
            .find('.k-dialog-close').click(close).end()
            .find('.k-form-text-row input').keydown(function (e) {
                if (e.keyCode == 13)
                    apply(e);
                else if (e.keyCode == 27)
                    close(e);
            }).end()
            // IE < 8 returns absolute url if getAttribute is not used
            .find('#k-editor-link-url').val(a ? a.getAttribute('href', 2) : 'http://').end()
            .find('#k-editor-link-text').val(nodes.length > 0 ? (nodes.length == 1 ? nodes[0].nodeValue : nodes[0].nodeValue + nodes[1].nodeValue) : '').end()
            .find('#k-editor-link-title').val(a ? a.title : '').end()
            .find('#k-editor-link-target').attr('checked', a ? a.target == '_blank' : false).end()
            .show()
            .data('kendoWindow')
            .center();

        if (shouldShowText && nodes.length > 0)
            initialText = $('#k-editor-link-text', dialog.element).val();

        $('#k-editor-link-url', dialog.element).focus().select();
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
        this.finder = new InlineFormatFinder([{tags:['a']}]);

        Tool.fn.init.call(this, $.extend(options, {command:UnlinkCommand}));
    },

    initialize: function($ui) {
        $ui.attr('unselectable', 'on')
           .addClass('k-state-disabled');
    },

    update: function ($ui, nodes) {
        $ui.toggleClass('k-state-disabled', !this.finder.isFormatted(nodes))
            .removeClass('k-state-hover');
    }
});

extend(kendo.ui.editor, {
    LinkFormatFinder: LinkFormatFinder,
    LinkFormatter: LinkFormatter,
    UnlinkCommand: UnlinkCommand,
    LinkCommand: LinkCommand,
    UnlinkTool: UnlinkTool
});

registerTool("createLink", new Tool({ key: 'K', ctrl: true, command: LinkCommand, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Create Link"})}));
registerTool("unlink", new UnlinkTool({ key: 'K', ctrl: true, shift: true, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Remove Link"})}));

})(jQuery);
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
    INSERTIMAGE = "Insert Image",
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
        if (attributes.src && attributes.src != "http://") {
            if (!img) {
                img = dom.create(RangeUtils.documentFromRange(range), "img", attributes);
                img.onload = img.onerror = function () {
                    img.removeAttribute("complete");
                    img.removeAttribute("width");
                    img.removeAttribute("height");
                }
                range.deleteContents();
                range.insertNode(img);
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

    redo: function () {
        var that = this,
            range = that.lockRange();

        if (!that.insertImage(RangeUtils.image(range), range)) {
            that.releaseRange(range);
        }
    },

    exec: function () {
        var that = this,
            insertImage = that.insertImage,
            range = that.lockRange(),
            applied = false,
            img = RangeUtils.image(range),
            windowContent, dialog;

        function apply(e) {
            that.attributes = {
                src: $(KEDITORIMAGEURL, dialog.element).val(),
                alt: $(KEDITORIMAGETITLE, dialog.element).val()
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

//        var fileBrowser = that.editor.fileBrowser;
//        var showBrowser = fileBrowser && fileBrowser.selectUrl !== undefined;
//
        function activate() {
//            if (showBrowser) {
//                new $t.imageBrowser($(this).find(".k-image-browser"), extend(fileBrowser, { apply: apply, element: that.editor.element, localization: that.editor.options.localization }));
//            }
        }

        windowContent =
            '<div class="k-editor-dialog">' +
                '<ol>' +
                    '<li class="k-form-text-row"><label for="k-editor-image-url">Web address</label><input type="text" class="k-input" id="k-editor-image-url"/></li>' +
                    '<li class="k-form-text-row"><label for="k-editor-image-title">Tooltip</label><input type="text" class="k-input" id="k-editor-image-title"/></li>' +
                '</ol>' +
                '<div class="k-button-wrapper">' +
                    '<button class="k-dialog-insert k-button">Insert</button>' +
                    '&nbsp;or&nbsp;' +
                    '<a href="#" class="k-dialog-close k-link">Close</a>' +
                '</div>' +
            '</div>';

        dialog = $(windowContent)
                .appendTo(document.body)
                .kendoWindow(extend({}, that.editor.options.dialogOptions, {
                    title: INSERTIMAGE,
                    close: close
                }))
                .hide()
                .find(".k-dialog-insert").click(apply).end()
                .find(".k-dialog-close").click(close).end()
                .find(".k-form-text-row input").keydown(keyDown).end()
                //.toggleClass("k-imagebrowser", showBrowser)
                // IE < 8 returns absolute url if getAttribute is not used
                .find(KEDITORIMAGEURL).val(img ? img.getAttribute("src", 2) : "http://").end()
                .find(KEDITORIMAGETITLE).val(img ? img.alt : "").end()
                .show()
                .data("kendoWindow")
                .center();

        $(KEDITORIMAGEURL, dialog.element).focus().select();
    }

});

kendo.ui.editor.ImageCommand = ImageCommand;

registerTool("insertImage", new Editor.Tool({ command: ImageCommand, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: INSERTIMAGE}) }));

})(jQuery);
(function($, undefined) {

var kendo = window.kendo,
    Widget = kendo.ui.Widget,
    Editor = kendo.ui.editor,
    dom = Editor.Dom,
    CHANGE = "change",
    KSTATESELECTED = "k-state-selected",
    SELECTEDCLASS = "." + KSTATESELECTED,
    SELECTEDCOLORCLASS = ".k-selected-color",
    UNSELECTABLE = "unselectable",
    BACKGROUNDCOLOR = "background-color",
    keys = kendo.keys,
    template = kendo.template(
'<div class="k-colorpicker-popup">' +
   '<ul class="k-reset">'+
        '# for(var i = 0; i < colors.length; i++) { #' +
            '<li class="k-item #= colors[i] == value ? "k-state-selected" : "" #">' +
                '<div style="background-color:\\##= colors[i] #"></div>'+
            '</li>' +
        '# } #' +
   '</ul>' +
'</div>');

var ColorPicker = Widget.extend({
    init: function(element, options) {
        var that = this;

        Widget.fn.init.call(that, element, options);

        element = that.element;
        options = that.options;

        that._value = options.value;

        that.popup = $(template({
                        colors: options.colors,
                        value: options.value.substring(1)
                     }))
                     .kendoPopup({
                        anchor: element,
                        toggleTarget: element.find(".k-icon")
                     })
                     .delegate(".k-item", "click", function(e) {
                         that.select($(e.currentTarget).find("div").css(BACKGROUNDCOLOR));
                     })
                     .find("*")
                     .attr(UNSELECTABLE, "on")
                     .end()
                     .data("kendoPopup");

        element.attr("tabIndex", 0) // add the color picker to the tab order
               .keydown(function(e) {
                   that.keydown(e);
               })
               .focus(function () {
                   element.css("outline", "1px dotted #000");
               })
               .blur(function() {
                   element.css("outline", "");
               })
               .delegate(".k-tool-icon", "click", function() {
                   that.select();
               })
               .find("*")
               .attr(UNSELECTABLE, "on");

        if (that._value) {
            element.find(SELECTEDCOLORCLASS).css(BACKGROUNDCOLOR, that._value);
        }
    },

    options: {
        name: "ColorPicker",
        colors: "000000,7f7f7f,880015,ed1c24,ff7f27,fff200,22b14c,00a2e8,3f48cc,a349a4,ffffff,c3c3c3,b97a57,ffaec9,ffc90e,efe4b0,b5e61d,99d9ea,7092be,c8bfe7".split(","),
        value: null
    },

    events: [
        CHANGE
    ],

    select: function(color) {
        var that = this;

        if (color) {
            color = dom.toHex(color);
            if (!that.trigger(CHANGE, { value: color })) {
                that.value(color);
                that.close();
            }
        } else {
            that.trigger(CHANGE, { value: that._value })
        }
    },

    open: function() {
        this.popup.open();
    },

    close: function() {
        this.popup.close();
    },

    toggle: function() {
        this.popup.toggle();
    },

    keydown: function(e) {
        var that = this,
            popup = that.popup.element,
            visible = that.popup.visible(),
            selected,
            next,
            prev,
            preventDefault = false,
            keyCode = e.keyCode;

        if (keyCode == keys.DOWN) {
            if (!visible) {
                that.open();
            } else {
                selected = popup.find(SELECTEDCLASS);

                if (selected[0]) {
                    next = selected.next();
                } else {
                    next = popup.find("li:first");
                }

                if (next[0]) {
                    selected.removeClass(KSTATESELECTED);
                    next.addClass(KSTATESELECTED);
                }
            }

            preventDefault = true;
        } else if (keyCode == keys.UP) {
            if (visible) {
                selected = popup.find(SELECTEDCLASS);
                prev = selected.prev();

                if (prev[0]) {
                    selected.removeClass(KSTATESELECTED);
                    prev.addClass(KSTATESELECTED);
                }
            }
            preventDefault = true;
        } else if (keyCode == keys.TAB || keyCode == keys.RIGHT || keyCode == keys.LEFT) {
            that.close();
        } else if (keyCode == keys.ENTER) {
            popup.find(SELECTEDCLASS).click();
            preventDefault = true;
        }

        if (preventDefault) {
            e.preventDefault();
        }
    },

    value: function(value) {
        var that = this;

        if (value === undefined) {
            return that._value;
        } else {
            value = dom.toHex(value);

            that._value = value;

            that.element.find(SELECTEDCOLORCLASS)
                        .css(BACKGROUNDCOLOR, value);
        }
    }
});

kendo.ui.plugin(ColorPicker);

})(jQuery);
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
    var property = dom.name(node) != "td" ? "marginLeft" : "paddingLeft";
    if (value === undefined) {
        return node.style[property] || 0;
    } else {
        if (value > 0) {
            node.style[property] = value + "px";
        } else {
            node.style[property] = "";
            if (node.style.cssText == "") {
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
                    if ($(formatNodes[i]).index() == 0) {
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
                    var marginLeft = parseInt(indent(formatNode)) + 30;
                    indent(formatNode, marginLeft);

                    for (var targetIndex = 0; targetIndex < targets.length; targetIndex++) {
                        if ($.contains(formatNode, targets[targetIndex])) {
                            targets.splice(targetIndex, 1);
                        }
                    }
                }
            }
        } else {
            var formatter = new BlockFormatter([{tags:blockElements}], {style:{marginLeft:30}});

            formatter.apply(nodes);
        }
    },

    remove: function(nodes) {
        var formatNodes = this.finder.findSuitable(nodes),
            targetNode, i, len, list, listParent, siblings;

        for (i = 0, len = formatNodes.length; i < len; i++) {
            var formatNode = $(formatNodes[i]);

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
                    if (siblings.length)
                        $(list[0].cloneNode(false)).appendTo(formatNode).append(siblings);

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

            var marginLeft = parseInt(indent(targetNode)) - 30;
            indent(targetNode, marginLeft);
        }
    }

});

var IndentCommand = Command.extend({
    init: function(options) {
        options.formatter = {
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
        Tool.fn.init.call(this, extend(options, {command:OutdentCommand}));

        this.finder = new BlockFormatFinder([{tags:blockElements}]);
    },

    initialize: function(ui) {
        ui.attr("unselectable", "on")
           .addClass("k-state-disabled");
    },

    update: function (ui, nodes) {
        var suitable = this.finder.findSuitable(nodes),
            isOutdentable, listParentsCount, i, len;

        for (i = 0, len = suitable.length; i < len; i++) {
            isOutdentable = indent(suitable[i]);

            if (!isOutdentable) {
                listParentsCount = $(suitable[i]).parents("ul,ol").length;
                isOutdentable = (dom.is(suitable[i], "li") && (listParentsCount > 1 || indent(suitable[i].parentNode)))
                             || (dom.ofType(suitable[i], ["ul","ol"]) && listParentsCount > 0);
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
registerTool("outdent", new OutdentTool({template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Outdent"})}));

})(jQuery);
(function($) {

// Imports ================================================================
var kendo = window.kendo,
    Class = kendo.Class,
    extend = $.extend,
    Editor = kendo.ui.editor,
    dom = Editor.Dom,
    RangeUtils = Editor.RangeUtils,
    Marker = Editor.Marker;

var PendingFormats = Class.extend({
    init: function(editor) {
        this.editor = editor;
        this.formats = [];
    },

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

        if (RangeUtils.textNodes(range).length == 0) {
            marker.remove(range);
            range.collapse(true);
            this.editor.selectRange(range);
            return;
        }

        var textNode = marker.end.previousSibling.previousSibling;

        var pendingFormat,
            formats = this.formats;

        for (var i = 0; i < formats.length; i++) {
            pendingFormat = formats[i];

            var command = pendingFormat.command(extend({ range: range }, pendingFormat.options.params));
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

});

extend(Editor, {
    PendingFormats: PendingFormats
});

})(jQuery);
