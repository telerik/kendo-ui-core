(function($,undefined) {

    // Imports ================================================================
    var kendo = window.kendo,
        Class = kendo.Class,
        Widget = kendo.ui.Widget,
        os = kendo.support.mobileOS,
        browser = kendo.support.browser,
        extend = $.extend,
        deepExtend = kendo.deepExtend,
        NS = ".kendoEditor",
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
                    '<span class="k-tool-icon"><span class="k-selected-color"></span></span><span class="k-icon k-i-arrow-s"></span>' +
            '</div></li>',

        comboBoxTemplate:
            '<li class="k-editor-combobox">' +
                '<select title="#= tooltip #" class="#= cssClass #"></select>' +
            '</li>',

        dropDownListTemplate:
            '<li class="k-editor-selectbox">' +
                '<select title="#= tooltip #" class="#= cssClass #"></select>' +
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

                        if (currentTool.name && editor.tools[currentTool.name]) {
                            $.extend(editor.tools[currentTool.name].options, currentTool);

                            editorTools[currentTool.name] = editor.tools[currentTool.name];
                            options = editorTools[currentTool.name].options;
                        } else {
                            options = extend({ cssClass: "k-i-custom", type: "button", tooltip: "" }, currentTool);

                            if (options.name) {
                                options.cssClass = "k-" + (options.name == "custom" ? "i-custom" : options.name);
                            }

                            if (!options.template) {
                                if (options.type == "button") {
                                    options.template = EditorUtils.buttonTemplate;
                                }
                            }

                            //if (options.exec && typeof(options.exec) == "string") {
                            //    options.exec = $.parseJSON('{"exec":' + '"' + options.exec + '"}').exec;
                            //}
                        }
                    } else if (editor.tools[currentTool]) {
                        editorTools[currentTool] = editor.tools[currentTool];
                        options = editorTools[currentTool].options;
                    }

                    if (!options) {
                        continue;
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

                        if (template.indexOf('<li') !== 0) {
                            template = "<li class='k-editor-template'>" + template + "</li>";
                        }

                        tool = $(template).appendTo(toolsArea);

                        if (options.type == "button" && options.exec) {
                            tool.find(".k-tool-icon").click($.proxy(options.exec, editor.element[0]));
                        }
                    }
                }
            }

            for (i = 0; i < nativeTools.length; i++) {
                if (!editorTools[nativeTools[i]]) {
                    editorTools[nativeTools[i]] = editor.tools[nativeTools[i]];
                }
            }

            editor.options.tools = editorTools;
        },

        decorateStyleToolItems: function(textarea) {
            var selectBox = textarea.data.closest(".k-editor").find(".k-style").data("kendoSelectBox");

            if (!selectBox) {
                return;
            }

            var classes = selectBox.dataSource.view();

            selectBox.list.find(".k-item").each(function(idx, element){
                var item = $(element),
                    text = item.text(),

                    style = kendo.ui.editor.Dom.inlineStyle(textarea.data.data("kendoEditor").document, "span", {className : classes[idx].value});
                item.html('<span unselectable="on" style="display:block;' + style +'">' + text + '</span>');
            });
        },

        createContentElement: function(textarea, stylesheets) {
            var iframe, wnd, doc,
                rtlStyle = kendo.support.isRtl(textarea) ? "direction:rtl;" : "";

            textarea.hide();
            iframe = $("<iframe />", { src: 'javascript:""', frameBorder: "0" })
                            .css("display", "")
                            .addClass("k-content")
                            .insertBefore(textarea)[0];

            wnd = iframe.contentWindow || iframe;
            if (stylesheets.length > 0) {
                $(iframe).one("load", textarea, EditorUtils.decorateStyleToolItems);
            }
            doc = wnd.document || iframe.contentDocument;

            doc.open();
            doc.write(
                    "<!DOCTYPE html><html><head>" +
                    "<meta charset='utf-8' />" +
                    "<style>" +
                        "html,body{padding:0;margin:0;font-family:Verdana,Geneva,sans-serif;background:#fff;height:100%;min-height:100%;}" +
                        "html{font-size:100%}body{font-size:.75em;line-height:1.5;padding-top:1px;margin-top:-1px;" +
                        "word-wrap: break-word;-webkit-nbsp-mode: space;-webkit-line-break: after-white-space;" +
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
                    "</head><body contenteditable='true'></body></html>"
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
                .on("keydown" + NS, function (e) {
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
                })
                .on("keyup" + NS, function (e) {
                    var selectionCodes = [8, 9, 33, 34, 35, 36, 37, 38, 39, 40, 40, 45, 46];

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
                })
                .on("mousedown" + NS, function(e) {
                        editor.pendingFormats.clear();

                        var target = $(e.target);

                        if (!browser.gecko && e.which == 2 && target.is("a[href]")) {
                            window.open(target.attr("href"), "_new");
                        }
                })
                .on("mouseup" + NS, function(){
                    select(editor);
                });

            $(editor.window)
                .on("blur" + NS, function () {
                    var old = editor.textarea.value,
                        value = editor.encodedValue();

                    editor.update();

                    if (value != old) {
                        editor.trigger("change");
                    }
                });

            $(editor.body).on("cut" + NS + " paste" + NS, function (e) {
                  editor.clipboard["on" + e.type](e);
            });
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
        },

        createDialog: function (windowContent, editor, initOptions) {
            var isRtl = kendo.support.isRtl(editor.wrapper),
                win = $(windowContent).appendTo(document.body).kendoWindow(initOptions);

            if (isRtl) {
                win.closest(".k-window").addClass("k-rtl");
            }

            return win;
        }
    };

    var select = EditorUtils.select,
        focusable = EditorUtils.focusable,
        wrapTextarea = EditorUtils.wrapTextarea,
        renderTools = EditorUtils.renderTools,
        initializeContentElement = EditorUtils.initializeContentElement;

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

    var supportedBrowser = !os || (os.ios && os.flatVersion >= 500) || (!os.ios && typeof(document.documentElement.contentEditable) != 'undefined');

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

            that.tools = deepExtend({}, kendo.ui.Editor.fn._tools);

            that.options = deepExtend({}, that.options, options);

            element = $(element);

            element.closest("form").on("submit" + NS, function () {
                that.update();
            });

            for (var id in that.tools) {
                that.tools[id].name = id.toLowerCase();
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
                return tool[0] ? tool[0].substring(tool[0].lastIndexOf("-") + 1) : "custom";
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
                .on("mouseenter" + NS, enabledButtons, function() { $(this).addClass("k-state-hover"); })
                .on("mouseleave" + NS, enabledButtons, function() { $(this).removeClass("k-state-hover"); })
                .on("mousedown" + NS, buttons, false)
                .on("keydown" + NS, focusable, function(e) {
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
                .on("click" + NS, enabledButtons, function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    that.exec(toolFromClassName(this));
                })
                .on("click" + NS, disabledButtons, function(e) { e.preventDefault(); })
                .find(toolbarItems)
                    .each(function () {
                        var toolName = toolFromClassName(this),
                            options = that.options,
                            tool = options.tools[toolName],
                            description = options.messages[toolName],
                            $this = $(this);

                        if (!tool) {
                            return;
                        }

                        if (toolName == "fontSize" || toolName == "fontName") {
                            var inheritText = options.messages[toolName + "Inherit"] || messages[toolName + "Inherit"];
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

            that._DOMNodeInsertedHandler = function(e) {
                that._DOMNodeInserted(e);
            };

            that._endTypingHandler = function() {
                that._endTyping();
            };

            $(document).on("DOMNodeInserted", that._DOMNodeInsertedHandler)
                       .on("mousedown", that._endTypingHandler);

            kendo.notify(that);
        },

        _endTyping: function() {
            var that = this;

            try {
                if (that.keyboard.isTypingInProgress()) {
                    that.keyboard.endTyping(true);
                }

                if (!that.selectionRestorePoint) {
                    that.selectionRestorePoint = new kendo.ui.editor.RestorePoint(that.getRange());
                }
            } catch (e) { }
        },

        _DOMNodeInserted: function(e) {
            var that = this,
                wrapper = that.wrapper;

            if ($.contains(e.target, wrapper[0]) || wrapper[0] == e.target) {
                // preserve updated value before re-initializing
                // don't use update() to prevent the editor from encoding the content too early
                that.textarea.value = that.value();
                wrapper.find("iframe").remove();
                initializeContentElement(that);
                that.value(that.textarea.value);
            }
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
                "insertImage"/*,
                "style", // declare explicitly
                "subscript", // declare explicitly
                "superscript" // declare explicitly */
            ]
        },

        destroy: function() {
            var that = this;
            Widget.fn.destroy.call(that);

            $(that.window)
                .add(that.document)
                .add(that.wrapper)
                .add(that.element.closest("form"))
                .off(NS);

            $(document).off("DOMNodeInserted", that._DOMNodeInsertedHandler)
                       .off("mousedown", that._endTypingHandler);

            kendo.destroy(that.wrapper);
        },

        _nativeTools: [
            "insertLineBreak",
            "insertParagraph",
            "redo",
            "undo",
            "insertHtml"
        ],

        _tools: {
            undo: { options: { key: "Z", ctrl: true } },
            redo: { options: { key: "Y", ctrl: true } }
        },

        tools: {}, // tools collection is copied from _tools during initialization

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

            if (!browser.msie) {
                // Add <br/>s to empty paragraphs in mozilla/chrome, to make them focusable
                html = html.replace(/<p([^>]*)>(\s*)?<\/p>/ig, '<p $1><br _moz_dirty="" /><\/p>');
            }

            if (browser.msie && parseInt(browser.version, 10) < 9) {
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
    blockElements = "div,p,h1,h2,h3,h4,h5,h6,address,applet,blockquote,button,center,dd,dir,dl,dt,fieldset,form,frameset,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,pre,script,table,tbody,td,tfoot,th,thead,tr,ul".split(","),
    block = makeMap(blockElements),
    inlineElements = "span,em,a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,strike,strong,sub,sup,textarea,tt,u,var".split(","),
    inline = makeMap(inlineElements),
    fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected".split(","));

var normalize = function (node) {
    if (node.nodeType == 1) {
        node.normalize();
    }
};

if (browser.msie && parseInt(browser.version, 10) >= 8) {
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
    amp = /&/g,
    openTag = /</g,
    closeTag = />/g,
    nbsp = /\u00a0/g,
    bom = /\ufeff/g;
    var cssAttributes =
           ("color,padding-left,padding-right,padding-top,padding-bottom," +
            "background-color,background-attachment,background-image,background-position,background-repeat," +
            "border-top-style,border-top-width,border-top-color," +
            "border-bottom-style,border-bottom-width,border-bottom-color," +
            "border-left-style,border-left-width,border-left-color," +
            "border-right-style,border-right-width,border-right-color," +
            "font-family,font-size,font-style,font-variant,font-weight,line-height"
           ).split(",");

var Dom = {
    findNodeIndex: function(node) {
        var i = 0;

        while (true) {
            node = node.previousSibling;

            if (!node) {
                break;
            }

            i++;
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
                value = node[$.support.cssFloat ? CSSFLOAT : STYLEFLOAT];
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

    scrollTo: function (node) {
        var body = node.ownerDocument.body,
            element = $(Dom.isDataNode(node) ? node.parentNode : node),
            windowHeight = Dom.windowFromDocument(node.ownerDocument).innerHeight,
            elementTop, elementHeight;

        if (Dom.name(element[0]) == "br") {
            element = element.parent();
        }

        elementTop = element.offset().top;
        elementHeight = element[0].offsetHeight;

        if (elementHeight + elementTop > body.scrollTop + windowHeight) {
            body.scrollTop = elementHeight + elementTop - windowHeight;
        }
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

    trim: function (parent) {
        for (var i = parent.childNodes.length - 1; i >= 0; i--) {
            var node = parent.childNodes[i];
            if (Dom.isDataNode(node)) {
                if (!node.nodeValue.replace(bom, "").length) {
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
        return extend(element, attributes);
    },

    style: function (node, value) {
        $(node).css(value || {});
    },

    unstyle: function (node, value) {
        for (var key in value) {
            if (key == FLOAT) {
                key = $.support.cssFloat ? CSSFLOAT : STYLEFLOAT;
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
    }
};

kendo.ui.editor.Dom = Dom;

})(jQuery);
(function($, undefined) {

// Imports ================================================================
var kendo = window.kendo,
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
            'telerik:script': { start: function (node) { result.push('<script'); attr(node); result.push('>'); }, end: function () { result.push('</script>'); } },
            b: { start: function () { result.push('<strong>'); }, end: function () { result.push('</strong>'); } },
            i: { start: function () { result.push('<em>'); }, end: function () { result.push('</em>'); } },
            u: { start: function () { result.push('<span style="text-decoration:underline;">'); }, end: function () { result.push('</span>'); } },
            iframe: { start: function (node) { result.push('<iframe'); attr(node); result.push('>'); }, end: function () { result.push('</iframe>'); } },
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
                end: function (node) {
                    result.push('</span>');
                }
            }
        };

        function attr(node) {
            var specifiedAttributes = [],
                attributes = node.attributes,
                attribute, i, l,
                trim = $.trim;

            if (dom.is(node, 'img')) {
                var width = node.style.width,
                    height = node.style.height,
                    $node = $(node);

                if (width) {
                    $node.attr('width', parseInt(width, 10));
                    dom.unstyle(node, { width: undefined });
                }

                if (height) {
                    $node.attr('height', parseInt(height, 10));
                    dom.unstyle(node, { height: undefined });
                }
            }

            for (i = 0, l = attributes.length; i < l; i++) {
                attribute = attributes[i];
                var name = attribute.nodeName;
                // In IE < 8 the 'value' attribute is not returned as 'specified'. The same goes for type="text"
                if (attribute.specified || (name == 'value' && !node.value) || (name == 'type' && attribute.nodeValue == 'text')) {
                    // altHtml is injected by IE8 when an <object> tag is used in the Editor
                    if (name.indexOf('_moz') < 0 && name != 'complete' && name != 'altHtml') {
                        specifiedAttributes.push(attribute);
                    }
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

                            if (property.indexOf('color') >= 0) {
                                value = dom.toHex(value);
                            }

                            if (property.indexOf('font') >= 0) {
                                value = value.replace(quoteRe, "'");
                            }

                            result.push(property);
                            result.push(':');
                            result.push(value);
                            result.push(';');
                        }
                    }
                } else if (attributeName == 'src' || attributeName == 'href') {
                    result.push(node.getAttribute(attributeName, 2));
                } else {
                    result.push(dom.fillAttrs[attributeName] ? attributeName : attributeValue);
                }

                result.push('"');
            }
        }

        function children(node, skip) {
            for (var childNode = node.firstChild; childNode; childNode = childNode.nextSibling) {
                child(childNode, skip);
            }
        }

        function child(node, skip) {
            var nodeType = node.nodeType,
                tagName, mapper,
                parent, value, previous;

            if (nodeType == 1) {
                tagName = dom.name(node);

                if (!tagName || (node.attributes._moz_dirty && dom.is(node, 'br')) || node.className == "k-marker") {
                    return;
                }

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

                    if (!previous || previous.innerHTML === "" || dom.isBlock(previous)) {
                        value = value.replace(/^[\r\n\v\f\t ]+/, '');
                    }

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
        if (result.replace(brRe, "").replace(emptyPRe, "") === "") {
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
        if (browser.msie && browser.version < 9) {
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

            if (range.startContainer.nodeType == 9) {
                range.setStart(range.endContainer, range.startOffset);
            }

            if (range.endContainer.nodeType == 9) {
                range.setEnd(range.startContainer, range.endOffset);
            }

            if (textRange.compareEndPoints('StartToEnd', textRange) === 0) {
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

function adoptContainer(textRange, range, start) {
    // find anchor node and offset
    var container = range[start ? 'startContainer' : 'endContainer'];
    var offset = range[start ? 'startOffset' : 'endOffset'], textOffset = 0;
    var anchorNode = isDataNode(container) ? container : container.childNodes[offset] || null;
    var anchorParent = isDataNode(container) ? container.parentNode : container;
    // visible data nodes need a text offset
    if (container.nodeType == 3 || container.nodeType == 4) {
        textOffset = offset;
    }

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

    if (isDataNode(target)) {
        range[start ? 'setStart' : 'setEnd'](target, cursor.text.length);
    } else {
        range[start ? 'setStartBefore' : 'setEndBefore'](target);
    }
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
        };
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

            if (nodeType != 3 || lastType != nodeType) {
                result ++;
            }

            lastType = nodeType;
        }

        return result;
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
        }
        else if (node) {
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

        if (expand && range.collapsed) {
            that.addCaret(range);
            range = RangeUtils.expand(range);
        }

        var rangeBoundary = range.cloneRange();

        rangeBoundary.collapse(false);
        that.end = dom.create(RangeUtils.documentFromRange(range), 'span', { className: 'k-marker' });
        rangeBoundary.insertNode(that.end);

        rangeBoundary = range.cloneRange();
        rangeBoundary.collapse(true);
        that.start = that.end.cloneNode(true);
        rangeBoundary.insertNode(that.start);

        range.setStartBefore(that.start);
        range.setEndAfter(that.end);

        normalize(range.commonAncestorContainer);

        return range;
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

})(jQuery);
(function($) {

    // Imports ================================================================
    var kendo = window.kendo,
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
    initialize: function(ui, initOptions) {
        var editor = initOptions.editor;

        new Editor.SelectBox(ui, {
            dataSource: editor.options.insertHtml || [],
            dataTextField: "text",
            dataValueField: "value",
            change: function (e) {
                Tool.exec(editor, 'insertHtml', this.value());
            },
            title: editor.options.messages.insertHtml,
            highlightFirst: false
        });
    },

    command: function (commandArguments) {
        return new InsertHtmlCommand(commandArguments);
    },

    update: function(ui, nodes) {
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
        var that = this;

        that.stack = that.stack.slice(0, that.currentCommandIndex + 1);
        that.currentCommandIndex = that.stack.push(command) - 1;
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
            isTypingKey = keyboard.isTypingKey(e);

        if (isTypingKey && !keyboard.isTypingInProgress()) {
            var range = editor.getRange();
            that.startRestorePoint = new RestorePoint(range);

            keyboard.startTyping(function () {
                editor.selectionRestorePoint = that.endRestorePoint = new RestorePoint(editor.getRange());
                editor.undoRedoStack.push(new GenericCommand(that.startRestorePoint, that.endRestorePoint));
            });

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
        var that = this;

        that.endRestorePoint = new RestorePoint(that.editor.getRange());
        that.editor.undoRedoStack.push(new GenericCommand(that.startRestorePoint, that.endRestorePoint));
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
        this.cleaners = [new MSWordFormatCleaner()];
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
            bom = "\ufeff",
            startRestorePoint = new RestorePoint(range),
            clipboardNode = dom.create(editor.document, 'div', {className:'k-paste-container', innerHTML: bom });

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
            $(editor.body).bind('paste', $.proxy(arguments.callee, this));
        } else {
            var clipboardRange = editor.createRange();
            clipboardRange.selectNodeContents(clipboardNode);
            selectRange(clipboardRange);
        }

        setTimeout(function() {
            var html, args = { html: "" };

            selectRange(range);
            dom.remove(clipboardNode);

            if (clipboardNode.lastChild && dom.is(clipboardNode.lastChild, 'br')) {
                dom.remove(clipboardNode.lastChild);
            }

            html = clipboardNode.innerHTML;

            if (html != bom) {
                args.html = html;
            }

            editor.trigger("paste", args);
            editor.clipboard.paste(args.html, true);
            editor.undoRedoStack.push(new GenericCommand(startRestorePoint, new RestorePoint(editor.getRange())));
            Editor.EditorUtils.select(editor);
        });
    },

    splittableParent: function(block, node) {
        var parentNode, body;

        if (block) {
            return dom.parentOfType(node, ['p', 'ul', 'ol']) || node.parentNode;
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

    paste: function (html, clean) {
        var editor = this.editor,
            i, l;

        for (i = 0, l = this.cleaners.length; i < l; i++) {
            if (this.cleaners[i].applicable(html)) {
                html = this.cleaners[i].clean(html);
            }
        }

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

        if (range.startContainer == editor.document) {
            range.selectNodeContents(editor.body);
        }

        var marker = new Marker();
        var caret = marker.addCaret(range);

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
            while (caret.parentNode != parent) {
                dom.unwrap(caret.parentNode);
            }

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
        return (/class="?Mso|style="[^"]*mso-/i).test(html);
    },

    listType: function(html) {
        if (/^[\u2022\u00b7\u00a7\u00d8o]\u00a0+/.test(html)) {
            return 'ul';
        }

        if (/^\s*\w+[\.\)]\u00a0{2,}/.test(html)) {
            return 'ol';
        }
    },

    lists: function(html) {
        var placeholder = dom.create(document, 'div', {innerHTML: html});
        var blockChildren = $(dom.blockElements.join(','), placeholder);

        var lastMargin = -1, lastType, levels = {'ul':{}, 'ol':{}}, li = placeholder;

        for (var i = 0; i < blockChildren.length; i++) {
            var p = blockChildren[i];
            html = p.innerHTML.replace(/<\/?\w+[^>]*>/g, '').replace(/&nbsp;/g, '\u00a0');
            var type = this.listType(html);

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

            var margin = parseFloat(p.style.marginLeft || 0);
            var list = levels[type][margin];

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
                for (var key in levels) {
                    for (var child in levels[key]) {
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
        var that = this,
            replacements = that.replacements,
            i, l;

        for (i = 0, l = replacements.length; i < l; i += 2) {
            html = html.replace(replacements[i], replacements[i+1]);
        }

        html = that.stripEmptyAnchors(html);
        html = that.lists(html);
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
        that.finder = new GreedyInlineFormatFinder(format, greedyProperty);
    },

    activate: function(range, nodes) {
        var that = this,
            camelCase,
            greedyProperty = that.greedyProperty,
            action = "apply";

        that.split(range);

        if (greedyProperty) {
            camelCase = greedyProperty.replace(/-([a-z])/, function(all, letter) { return letter.toUpperCase(); });

            if (that.values.style[camelCase] == "inherit") {
                action = "remove";
            }
        }

        that[action](nodes);
    }
});

function inlineFormatWillDelayExecution (range) {
    return range.collapsed && !RangeUtils.isExpandable(range);
}

var InlineFormatTool = FormatTool.extend({
    init: function(options) {
        FormatTool.fn.init.call(this, extend(options, {
            finder: new InlineFormatFinder(options.format),
            formatter: function () { return new InlineFormatter(options.format); }
        }));

        this.willDelayExecution = inlineFormatWillDelayExecution;
    }
});

var FontTool = Tool.extend({
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

        ui.closest(".k-widget").removeClass("k-" + toolName).find("*").andSelf().attr("unselectable", "on");

        ui.data(this.type).value("inherit");
    }

});

var ColorTool = Tool.extend({
    init: function(options) {
        Tool.fn.init.call(this, options);

        this.options = options;
        this.format = [{ tags: ["span"] }];
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

        new Editor.ColorPicker(ui, {
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
        var format = this.format;
        return new Editor.FormatCommand(extend(commandArguments, {
            formatter: function () {
                return new GreedyInlineFormatter(format, { className: commandArguments.value });
            }
        }));
    },

    update: function(ui, nodes) {
        var list = ui.data("kendoSelectBox");
        list.close();
        list.value(this.finder.getFormat(nodes));
    },

    initialize: function(ui, initOptions) {
        var editor = initOptions.editor;

        new Editor.SelectBox(ui, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: editor.options.style,
            title: editor.options.messages.style,
            change: function () {
                Tool.exec(editor, "style", this.value());
            },
            highlightFirst: false
        });

        ui.closest(".k-widget").removeClass("k-" + this.name).find("*").andSelf().attr("unselectable", "on");
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

registerTool("style", new Editor.StyleTool({template: new ToolTemplate({template: EditorUtils.dropDownListTemplate, title: "Styles"})}));

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

registerTool("fontName", new FontTool({cssAttr:"font-family", domAttr: "fontFamily", name:"fontName", defaultValue: [{ text: "fontNameInherit",  value: "inherit" }], template: new ToolTemplate({template: EditorUtils.comboBoxTemplate, title: "Font Name"})}));

registerTool("fontSize", new FontTool({cssAttr:"font-size", domAttr:"fontSize", name:"fontSize", defaultValue: [{ text: "fontSizeInherit",  value: "inherit" }], template: new ToolTemplate({template: EditorUtils.comboBoxTemplate, title: "Font Size"})}));

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
            candidate = dom.ofType(nodes[i], format[0].tags) ? nodes[i] : dom.parentOfType(nodes[i], format[0].tags);
            if (!candidate) {
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
            formatter: function () {
                return new BlockFormatter(options.format);
            }
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
            list = ui.data("kendoSelectBox");
        } else {
            list = ui.find("select").data("kendoSelectBox");
        }
        list.close();
        list.value(this.finder.getFormat(nodes));
    },

    initialize: function(ui, initOptions) {
        var editor = initOptions.editor,
            toolName = "formatBlock";

        new Editor.SelectBox(ui, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: this.options.items ? this.options.items : editor.options.formatBlock,
            title: editor.options.messages.formatBlock,
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

registerTool("formatBlock", new FormatBlockTool({template: new ToolTemplate({template: EditorUtils.dropDownListTemplate})}));

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
            doc = RangeUtils.documentFromRange(range),
            parent, previous, next,
            container,
            emptyParagraphContent = kendo.support.browser.msie ? '' : '<br _moz_dirty="" />',
            paragraph, marker, li, heading, rng,
            // necessary while the emptyParagraphContent is empty under IE
            blocks = 'p,h1,h2,h3,h4,h5,h6'.split(','),
            startInBlock = dom.parentOfType(range.startContainer, blocks),
            endInBlock = dom.parentOfType(range.endContainer, blocks),
            shouldTrim = (startInBlock && !endInBlock) || (!startInBlock && endInBlock);

        function clean(node) {
            if (node.firstChild && dom.is(node.firstChild, 'br')) {
                dom.remove(node.firstChild);
            }

            if (dom.isDataNode(node) && !node.nodeValue) {
                node = node.parentNode;
            }

            if (node && !dom.is(node, 'img')) {
                while (node.firstChild && node.firstChild.nodeType == 1) {
                    node = node.firstChild;
                }

                if (node.innerHTML === "") {
                    node.innerHTML = emptyParagraphContent;
                }
            }
        }

        range.deleteContents();

        marker = dom.create(doc, 'a');
        range.insertNode(marker);

        if (!marker.parentNode) {
            // inserting paragraph in Firefox full body range
            container = range.commonAncestorContainer;
            container.innerHTML = "";
            container.appendChild(marker);
        }

        normalize(marker.parentNode);

        li = dom.parentOfType(marker, ['li']);
        heading = dom.parentOfType(marker, 'h1,h2,h3,h4,h5,h6'.split(','));

        if (li) {
            rng = range.cloneRange();
            rng.selectNode(li);

            // hitting 'enter' in empty li
            if (!RangeUtils.textNodes(rng).length) {
                paragraph = dom.create(doc, 'p');

                if (li.nextSibling) {
                    RangeUtils.split(rng, li.parentNode);
                }

                dom.insertAfter(paragraph, li.parentNode);
                dom.remove(li.parentNode.childNodes.length == 1 ? li.parentNode : li);
                paragraph.innerHTML = emptyParagraphContent;
                next = paragraph;
            }
        } else if (heading && !marker.nextSibling) {
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

            var textNode = RangeUtils.textNodes(range)[0];

            if (textNode) {
                range.selectNodeContents(textNode);
            }
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

        if (!kendo.support.browser.msie && (!br.nextSibling || dom.isWhitespace(br.nextSibling))) {
            //Gecko and WebKit cannot put the caret after only one br.
            var filler = br.cloneNode(true);
            filler.setAttribute('_moz_dirty', '');
            dom.insertAfter(filler, br);
        }
        range.setStartAfter(br);
        range.collapse(true);

        dom.scrollTo(br.nextSibling);

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

    wrap: function(list, nodes) {
        var li = dom.create(list.ownerDocument, "li"),
            i, node;

        for (i = 0; i < nodes.length; i++) {
            node = nodes[i];

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

    applyOnSection: function (section, nodes) {
        var tag = this.tag,
            commonAncestor;

        if (nodes.length == 1) {
            commonAncestor = dom.parentOfType(nodes[0], ["ul","ol"]);
        } else {
            commonAncestor = dom.commonAncestor.apply(null, nodes);
        }

        if (!commonAncestor) {
            commonAncestor = dom.parentOfType(nodes[0], ["td"]) || nodes[0].ownerDocument.body;
        }

        if (dom.isInline(commonAncestor)) {
            commonAncestor = dom.blockParentOrBody(commonAncestor);
        }

        var ancestors = [];

        var formatNode = this.finder.findSuitable(nodes);

        if (!formatNode) {
            formatNode = new ListFormatFinder(tag == "ul" ? "ol" : "ul").findSuitable(nodes);
        }

        var childNodes = dom.significantChildNodes(commonAncestor);

        if (!childNodes.length) {
            childNodes = nodes;
        }

        if (/table|tbody/.test(dom.name(commonAncestor))) {
            childNodes = $.map(nodes, function(node) {
                return dom.parentOfType(node, ["td"]);
            });
        }

        function pushAncestor() {
            ancestors.push(this);
        }

        for (var i = 0; i < childNodes.length; i++) {
            var child = childNodes[i];
            var nodeName = dom.name(child);
            if (this.suitable(child, nodes) && (!formatNode || !dom.isAncestorOrSelf(formatNode, child))) {

                if (formatNode && (nodeName == "ul" || nodeName == "ol")) {
                    // merging lists
                    //Array.prototype.push.apply(ancestors, $.toArray(child.childNodes));
                    $.each(child.childNodes, pushAncestor);
                    dom.remove(child);
                } else {
                    ancestors.push(child);
                }
            }
        }

        if (ancestors.length == childNodes.length && commonAncestor != nodes[0].ownerDocument.body && !/table|tbody|tr|td/.test(dom.name(commonAncestor))) {
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
            section = dom.parentOfType(nodes[i], ["td","body"]);

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

    exec: function () {
        var that = this,
            range = that.getRange(),
            collapsed = range.collapsed,
            nodes,
            initialText = null;

        range = that.lockRange(true);
        nodes = textNodes(range);

        function apply(e) {
            var href = $("#k-editor-link-url", dialog.element).val(),
                title, text, target;

            if (href && href != "http://") {
                that.attributes = { href: href };

                title = $("#k-editor-link-title", dialog.element).val();
                if (title) {
                    that.attributes.title = title;
                }

                text = $("#k-editor-link-text", dialog.element).val();
                if (text !== initialText) {
                    that.attributes.innerHTML = text || href;
                }

                target = $("#k-editor-link-target", dialog.element).is(":checked");
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

        var shouldShowText = nodes.length <= 1 || (nodes.length == 2 && collapsed);

        var windowContent =
            "<div class='k-editor-dialog'>" +
                "<ol>" +
                    "<li class='k-form-text-row'><label for='k-editor-link-url'>Web address</label><input type='text' class='k-input' id='k-editor-link-url'></li>" +
                    (shouldShowText ? "<li class='k-form-text-row'><label for='k-editor-link-text'>Text</label><input type='text' class='k-input' id='k-editor-link-text'></li>" : "") +
                    "<li class='k-form-text-row'><label for='k-editor-link-title'>Tooltip</label><input type='text' class='k-input' id='k-editor-link-title'></li>" +
                    "<li class='k-form-checkbox-row'><input type='checkbox' id='k-editor-link-target'><label for='k-editor-link-target'>Open link in new window</label></li>" +
                "</ol>" +
                "<div class='k-button-wrapper'>" +
                    "<button class='k-dialog-insert k-button'>Insert</button>" +
                    "&nbsp;or&nbsp;" +
                    "<a href='#' class='k-dialog-close k-link'>Close</a>" +
                "</div>" +
            "</div>";

        var dialog = EditorUtils.createDialog(windowContent, that.editor, $.extend({}, that.editor.options.dialogOptions, {
            title: "Insert link",
            close: close
        }))
            .hide()
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
            .show()
            .data("kendoWindow")
            .center();

        if (shouldShowText && nodes.length > 0) {
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

    initialize: function(ui) {
        ui.attr("unselectable", "on")
          .addClass("k-state-disabled");
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
                    };

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

        var imageBrowser = that.editor.options.imageBrowser;
        var showBrowser = kendo.ui.ImageBrowser && imageBrowser && imageBrowser.transport && imageBrowser.transport.read !== undefined;

        windowContent =
            '<div class="k-editor-dialog">' +
                (showBrowser ? '<div class="k-image-browser"></div>' : "") +
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

        dialog = EditorUtils.createDialog(windowContent, that.editor, extend({}, that.editor.options.dialogOptions, {
            title: INSERTIMAGE,
            close: close,
            activate: function() {
                if (showBrowser) {
                    var that = this;

                    new kendo.ui.ImageBrowser(
                        that.element.find(".k-image-browser"),
                        extend({}, imageBrowser, {
                            change: function() {
                                that.element.find(KEDITORIMAGEURL).val(this.value());
                            },
                            apply: apply
                        })
                    );
                }
            }
        }))
                .hide()
                .find(".k-dialog-insert").click(apply).end()
                .find(".k-dialog-close").click(close).end()
                .find(".k-form-text-row input").keydown(keyDown).end()
                .toggleClass("k-imagebrowser", showBrowser)
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
    DropDownList = kendo.ui.DropDownList,
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
            that.trigger(CHANGE, { value: that._value });
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

var SelectBox = DropDownList.extend({
    init: function(element, options) {
        var that = this;

        DropDownList.fn.init.call(that, element, options);

        that.value(that.options.title);
    },
    options: {
        name: "SelectBox"
    },
    value: function(value) {
        var that = this,
            result = DropDownList.fn.value.call(that, value);

        if (value === undefined) {
            return result;
        }

        if (value !== DropDownList.fn.value.call(that)) {
           that.text(that.options.title);
           that._current.removeClass("k-state-selected");
           that.current(null);
           that._oldIndex = that.selectedIndex = -1;
        }
    }
});

kendo.ui.editor.ColorPicker = ColorPicker;
kendo.ui.editor.SelectBox = SelectBox;

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
            var formatter = new BlockFormatter([{tags:"p"}], {style:{marginLeft:30}});

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
registerTool("outdent", new OutdentTool({template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Outdent"})}));

})(jQuery);
(function($, undefined) {

var kendo = window.kendo,
    extend = $.extend,
    Editor = kendo.ui.editor,
    dom = Editor.Dom,
    RangeUtils = Editor.RangeUtils,
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

    exec: function () {
        var that = this,
            editor = that.editor,
            range = editor.getRange(),
            dialog = $(ViewHtmlCommand.template).appendTo(document.body),
            content = ViewHtmlCommand.indent(editor.value()),
            textarea = ".k-editor-textarea";

        function apply(e) {
            editor.value(dialog.find(textarea).val());

            close(e);

            if (that.change) {
                that.change();
            }
        }

        function close(e) {
            e.preventDefault();

            dialog.data("kendoWindow").destroy();

            dom.windowFromDocument(RangeUtils.documentFromRange(range)).focus();
        }

        dialog.kendoWindow(extend({}, editor.options.dialogOptions, {
            title: "View HTML",
            close: close
        }))
            .hide()
            .find(textarea).val(content).end()
            .find(".k-dialog-update").click(apply).end()
            .find(".k-dialog-close").click(close).end()
            .show()
            .data("kendoWindow")
            .center();

        dialog.find(textarea).focus();
    }
});

extend(ViewHtmlCommand, {
    template: "<div class='k-editor-dialog'>" +
                "<textarea class='k-editor-textarea k-input'></textarea>" +
                "<div class='k-button-wrapper'>" +
                    "<button class='k-dialog-update k-button'>Update</button>" +
                    "&nbsp;or&nbsp;" +
                    "<a href='#' class='k-dialog-close k-link'>Close</a>" +
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

})(jQuery);
(function($) {

// Imports ================================================================
var kendo = window.kendo,
    Class = kendo.Class,
    extend = $.extend,
    Editor = kendo.ui.editor,
    RangeUtils = Editor.RangeUtils,
    Marker = Editor.Marker;

var PendingFormats = Class.extend({
    init: function(editor) {
        this.editor = editor;
        this.formats = [];
    },

    apply: function(range) {
        if (!this.hasPending()) {
            return;
        }

        var marker = new Marker();

        marker.addCaret(range);

        var caret = range.startContainer.childNodes[range.startOffset];

        var target = caret.previousSibling;

        /* under IE, target is a zero-length text node. go figure. */
        if (!target.nodeValue) {
            target = target.previousSibling;
        }

        range.setStart(target, target.nodeValue.length - 1);

        marker.add(range);

        if (!RangeUtils.textNodes(range).length) {
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
        for (var i = 0; i < formats.length; i++) {
            if (formats[i].name == format) {
                return formats[i];
            }
        }

        return;
    },

    toggle: function(format) {
        var formats = this.formats;

        for (var i = 0; i < formats.length; i++) {
            if (formats[i].name == format.name) {
                if (formats[i].params && formats[i].params.value != format.params.value) {
                    formats[i].params.value = format.params.value;
                } else {
                    formats.splice(i, 1);
                }

                return;
            }
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
