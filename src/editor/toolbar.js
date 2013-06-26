(function($,undefined) {
    var kendo = window.kendo;
    var ui = kendo.ui;
    var editorNS = ui.editor;
    var Widget = ui.Widget;
    var extend = $.extend;
    var proxy = $.proxy;
    var keys = kendo.keys;
    var NS = ".kendoEditor";

    var focusable = ".k-colorpicker,a.k-tool-icon:not(.k-state-disabled),.k-selectbox, .k-combobox .k-input";

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
                    actions: []
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

            this.items().each(function initializeTool() {
                var toolName = that._toolFromClassName(this),
                    tool = that.tools[toolName],
                    messages = editor.options.messages,
                    description = messages[toolName],
                    $this = $(this);

                if (!tool || !tool.initialize) {
                    return;
                }

                if (toolName == "fontSize" || toolName == "fontName") {
                    var inheritText = messages[toolName + "Inherit"];

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

            that.updateGroups();

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

        focus: function() {
            var TABINDEX = "tabIndex";
            var element = this._editor.element;
            var tabIndex = element.attr(TABINDEX);

            // Chrome can't focus something which has already been focused
            element.attr(TABINDEX, tabIndex || 0).focus().find("li:has(" + focusable + ")").first().focus();

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
            var tools = this.tools,
                options, template, toolElement,
                toolName,
                editorElement = this._editor.element,
                element = this.element.empty();

            element.empty();

            for (toolName in tools) {
                options = tools[toolName] && tools[toolName].options;

                template = options && options.template;

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

                    toolElement = $(template)
                        .appendTo(element);

                    if (options.type == "button" && options.exec) {
                        toolElement.find(".k-tool-icon").click(proxy(options.exec, editorElement[0]));
                    }
                }
            }
        },

        updateGroups: function() {
            var previous,
                currentToolGroup,
                isStart,
                that = this,
                listItems = that.element.children(),
                enabledTools = listItems.filter(function() {
                    return !$(this).children(".k-state-disabled").length;
                }),
                started = false;

            listItems.filter(".k-group-break").remove();

            enabledTools.each(function(index, li) {
                li = $(li);

                var toolName = that._toolFromClassName(li.children()[0]);
                var newToolGroup = that.toolGroupFor(toolName);
                var last = index == enabledTools.length-1;

                isStart = currentToolGroup != newToolGroup;

                currentToolGroup = newToolGroup;

                if (previous && isStart) {
                    previous.addClass("k-group-end");
                }

                started = started || isStart;

                li.toggleClass("k-group-start", isStart || (!started && last))
                  .toggleClass("k-group-end", last);

                previous = li;
            });

            that.element.children(".k-group-end").each(function() {
                if (this.offsetLeft + this.offsetWidth > this.parentNode.offsetWidth) {
                    var node = this;

                    while (node && node.className.indexOf("k-group-start") < 0) {
                        node = node.previousSibling;
                    }

                    $(node).before("<li class='k-group-break' />");
                }
            });
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
                        that._editor.exec(that._toolFromClassName(this));
                    }
                })
                .on("click" + NS, disabledButtons, function(e) { e.preventDefault(); });

        },


        _toolFromClassName: function (element) {
            if (!element) {
                return;
            }

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
                var tool = that.tools[that._toolFromClassName(this)];
                if (tool && tool.update) {
                    tool.update($(this), nodes);
                }
            });

            this._updateContext();

            that.updateGroups();
        },

        _updateContext: function() {
            this.element.children().show().filter(":has(.k-state-disabled)").hide();
        }
    });

$.extend(editorNS, {
    Toolbar: Toolbar
});

})(window.jQuery);
