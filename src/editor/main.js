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
                '<tr role="presentation"><td class="k-editor-toolbar-wrap k-secondary" role="presentation"><ul class="k-editor-toolbar" role="toolbar"></ul></td></tr>' +
                '<tr><td class="k-editable-area"></td></tr>' +
            '</tbody></table>',

        buttonTemplate:
            '<li class="k-editor-button" role="presentation">' +
                '<a href="" role="button" class="k-tool-icon #= data.cssClass #"' +
                '#= data.popup ? " data-popup" : "" #' +
                ' unselectable="on" title="#= data.title #">#= data.title #</a>' +
            '</li>',

        colorPickerTemplate:
            '<li class="k-editor-colorpicker" role="presentation"><div class="k-colorpicker #= data.cssClass #"></div></li>',

        comboBoxTemplate:
            '<li class="k-editor-combobox">' +
                '<select title="#= data.title #" class="#= data.cssClass #"></select>' +
            '</li>',

        dropDownListTemplate:
            '<li class="k-editor-selectbox">' +
                '<select title="#= data.title #" class="#= data.cssClass #"></select>' +
            '</li>',

        separatorTemplate:
            '<li class="k-separator"></li>',

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
                tool.name = toolName.toLowerCase();
            }

            Editor.defaultTools[toolName] = tool;
        },

        registerFormat: function(formatName, format) {
            Editor.fn.options.formats[formatName] = format;
        }
    };

    var focusable = ".k-colorpicker,a.k-tool-icon:not(.k-state-disabled),.k-selectbox, .k-combobox .k-input";

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
        dialogCancel: "Cancel"
    };

    var supportedBrowser = !os || (os.ios && os.flatVersion >= 500) || (!os.ios && typeof(document.documentElement.contentEditable) != 'undefined');

    var Toolbar = Widget.extend({
        init: function(element, options) {
            var that = this;

            options = extend({}, options, { name: "EditorToolbar" });

            Widget.fn.init.call(that, element, options);

            that.tools = deepExtend({}, kendo.ui.Editor.defaultTools);

            if (kendo.ui.editor.Dom.name(options.editor.element[0]) !== "textarea") {
                that.window = $(element)
                    .wrap("<div class='editorToolbarWindow' />")
                    .parent()
                    .prepend("<button class='k-button k-button-bare k-editortoolbar-dragHandle'><span class='k-icon k-i-move'></span></button>")
                    .kendoWindow({
                        title: false,
                        resizable: false,
                        draggable: {
                            dragHandle: ".k-editortoolbar-dragHandle"
                        },
                        animation: {
                            open: {
                                effects: "fade:in"
                            },
                            close: {
                                effects: "fade:out"
                            }
                        },
                        minHeight: 42,
                        visible: false,
                        autoFocus: false,
                        actions: []
                    })
                    .on("mousedown", function(e){
                        if (!$(e.target).is(".k-icon")) {
                            e.preventDefault();
                        }
                    })
                    .data("kendoWindow");
            }

            that.bindTo(options.editor);
        },

        events: [
            "execute"
        ],

        items: function() {
            return this.element.children().find("> *, select");
        },

        focused: function() {
            return this.element.find(".k-state-focused").length > 0;
        },

        toolById: function(name) {
            var id, tools = this.options.tools;

            for (id in tools) {
                if (id.toLowerCase() == name) {
                    return tools[id];
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
            that.element.empty();

            that._renderTools();

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

            this.items().each(function () {
                var toolName = that._toolFromClassName(this),
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
                    title: that._appendShortcutSequence(description, tool),
                    editor: that._editor
                });
            });

            editor.bind("select", proxy(that._update, that));

            this._updateContext();

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
            "undo",
            "insertHtml"
        ],

        tools: {}, // tools collection is copied from defaultTools during initialization

        _renderTools: function() {
            var tools = this.options.tools,
                editorTools = {},
                currentTool, tool, i,
                nativeTools = this._nativeTools,
                template,
                options;

            if (tools) {
                for (i = 0; i < tools.length; i++) {
                    currentTool = tools[i];
                    options = null;

                    if ($.isPlainObject(currentTool)) {

                        if (currentTool.name && this.tools[currentTool.name]) {
                            extend(this.tools[currentTool.name].options, currentTool);

                            editorTools[currentTool.name] = this.tools[currentTool.name];
                            options = editorTools[currentTool.name].options;
                        } else {
                            options = extend({ cssClass: "k-i-custom", type: "button", title: "" }, currentTool);

                            if (options.name) {
                                options.cssClass = "k-" + (options.name == "custom" ? "i-custom" : options.name);
                            }

                            if (!options.template) {
                                if (options.type == "button") {
                                    options.template = EditorUtils.buttonTemplate;
                                }
                            }
                        }
                    } else if (this.tools[currentTool]) {
                        editorTools[currentTool] = this.tools[currentTool];
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

                        tool = $(template).appendTo(this.element);

                        if (options.type == "button" && options.exec) {
                            tool.find(".k-tool-icon").click($.proxy(options.exec, this.element[0]));
                        }
                    }
                }
            }

            for (i = 0; i < nativeTools.length; i++) {
                if (!editorTools[nativeTools[i]]) {
                    editorTools[nativeTools[i]] = this.tools[nativeTools[i]];
                }
            }

            this.options.tools = editorTools;
        },

        _attachEvents: function() {
            var that = this,
                buttons = ".k-editor-button .k-tool-icon",
                enabledButtons = buttons + ":not(.k-state-disabled)",
                disabledButtons = buttons + ".k-state-disabled";

            that.element
                .off(NS)
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
                        focusElement = closestLi.prevAll(focusableTool).first().find(focusable);
                    } else if (keyCode == keys.ESC) {
                        focusElement = that;
                    } else if (keyCode == keys.TAB && !(e.ctrlKey || e.altKey)) {
                        // skip tabbing to disabled tools, and focus the editing area when running out of tools
                        if (e.shiftKey) {
                            focusElement = closestLi.prevAll(focusableTool).first().find(focusable);

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
                    var button = $(this);
                    e.preventDefault();
                    e.stopPropagation();
                    button.removeClass("k-state-hover");
                    if (!button.is("[data-popup]")) {
                        that.options.editor.exec(that._toolFromClassName(this));
                    }
                })
                .on("click" + NS, disabledButtons, function(e) { e.preventDefault(); });

        },


        _toolFromClassName: function (element) {
            var tool = $.grep(element.className.split(" "), function (x) {
                return !/^k-(widget|tool-icon|state-hover|header|combobox|dropdown|selectbox|colorpicker)$/i.test(x);
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
                var tool = that.options.tools[that._toolFromClassName(this)];
                if (tool) {
                    tool.update($(this), nodes);
                }
            });

            this._updateContext();
        },

        _updateContext: function() {
            this.element.children().show().filter(":has(.k-state-disabled)").hide();
        }
    });

    var supportedElements = "textarea,div".split(",");

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

            if (type == "textarea") {
                that._wrapTextarea();

                toolbarContainer = that.wrapper.find(".k-editor-toolbar");

                toolbarOptions = extend({}, that.options);
                toolbarOptions.editor = that;
                that.toolbar = new Toolbar(toolbarContainer[0], toolbarOptions);

                if (element[0].id) {
                    toolbarContainer.attr("aria-controls", element[0].id);
                }
            } else {
                that.element.addClass("k-widget k-editor k-editor-inline");

                // TODO: this should create global toolbar, if it does not exist, and call its bindTo(this);
                toolbarContainer = $('<ul class="k-editor-toolbar" role="toolbar" />').insertBefore(element);
                toolbarOptions = extend({}, that.options);
                toolbarOptions.editor = that;
                that.toolbar = new Toolbar(toolbarContainer[0], toolbarOptions);
            }

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
                }

                this.saveSelection();
            } catch (e) { }
        },

        _DOMNodeInserted: function(e) {
            var wrapper = this.wrapper;

            if ($.contains(e.target, wrapper[0]) || wrapper[0] == e.target) {
                this.refresh();
            }
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
                .appendTo(editArea).addClass("k-content k-raw-content").hide();

            $(document).on("DOMNodeInserted", proxy(that._DOMNodeInserted, that));

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
            if (stylesheets.length > 0) {
                $(iframe).one("load", function() {
                    var styleTools = editor.toolbar.items().filter(".k-style");
                    styleTools.kendoSelectBox("decorateItems", editor.document);
                });
            }
            doc = wnd.document || iframe.contentDocument;

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

            if (editor.textarea) {
                editor.window = editor._createContentElement(editor.options.stylesheets);
                editor.document = editor.window.contentDocument || editor.window.document;
                editor.body = editor.document.body;

                $(editor.window)
                    .on("blur" + NS, function () {
                        var old = editor.textarea.val(),
                        value = editor.encodedValue();

                        editor.update();

                        if (value != old) {
                            editor.trigger("change");
                        }
                    });

                $(editor.document).on("mouseup" + NS, proxy(editor._mouseup, editor));
            } else {
                editor.window = window;
                editor.document = document;
                editor.body = editor.element[0];

                var styleTools = editor.toolbar.items().filter(".k-style");
                styleTools.kendoSelectBox("decorateItems", editor.document);
            }

            try {
                editor.document.execCommand("enableObjectResizing", false, "false");
                editor.document.execCommand("enableInlineTableEditing", null, false);
            } catch(e) { }

            if (kendo.support.touch) {
                $(editor.document).on("selectionchange" + NS, function() {
                    editor._selectionChange();
                });
            }

            $(editor.body)
                .on("keydown" + NS, function (e) {
                    var range;

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
                        // skip bom nodes when navigating with arrows (IE 7/8)
                        range = editor.getRange();
                        var left = e.keyCode == keys.LEFT;
                        var container = range[left ? "startContainer" : "endContainer"];
                        var offset = range[left ? "startOffset" : "endOffset"];
                        var direction = left ? -1 : 1;

                        if (left) {
                            offset -= 1;
                        }

                        if (container.nodeType == 3 && container.nodeValue[offset] == "\ufeff") {
                            range.setStart(container, offset + direction);
                            range.collapse(true);
                            editor.selectRange(range);
                        }
                    }

                    var toolName = editor.keyboard.toolFromShortcut(editor.toolbar.options.tools, e);

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
                .on("focus" + NS, function() {
                    $(this).addClass("k-state-active");
                    editor.toolbar.show();
                })
                .on("blur" + NS, function() {
                    setTimeout(function() {
                        if (!$(kendo._activeElement()).is(editor.body) && !editor.toolbar.focused()) {
                            $(editor.body).removeClass("k-state-active");
                            editor.toolbar.hide();
                        }
                    }, 1);
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
                "createTable",
                "addColumnLeft",
                "addColumnRight",
                "addRowAbove",
                "addRowBelow",
                "deleteRow",
                "deleteColumn"/*,
                "separator", // declare these explicitly
                "style",
                "subscript",
                "superscript"  */
            ]
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

            $(document).off("DOMNodeInserted", proxy(that._DOMNodeInserted, that))
                       .off("mousedown", proxy(that._endTyping, that))
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

        restoreSelection: function() {
            this.body.focus();

            if (this.selectionRestorePoint) {
                this.selectRange(this.selectionRestorePoint.toRange());
            }
        },

        focus: function () {
            this.restoreSelection();
        },

        update: function (value) {
            if (this.textarea) {
                this.textarea.val(value || this.options.encoded ? this.encodedValue() : this.value());
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
            this.body.focus();
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

            name = name.toLowerCase();

            // restore selection
            if (!that.keyboard.isTypingInProgress()) {
                that.restoreSelection();
            }

            tool = that.toolbar.toolById(name);

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

        update: function($ui, nodes) {
            var isFormatted = this.options.finder.isFormatted(nodes);

            $ui.toggleClass("k-state-active", isFormatted);
            $ui.attr("aria-pressed", isFormatted);
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
