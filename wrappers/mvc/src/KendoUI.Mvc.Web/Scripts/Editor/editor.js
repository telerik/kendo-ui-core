function createContentElement($textarea, stylesheets) {
    $textarea.hide();
    var iframe = $('<iframe />', { src: 'javascript:"<html></html>"', frameBorder: '0' })
                    .css('display', '')
                    .addClass("t-content")
                    .insertBefore($textarea)[0];

    var window = iframe.contentWindow || iframe;
    var document = window.document || iframe.contentDocument;
    
    var html = $textarea.val()
                // <img>\s+\w+ creates invalid nodes after cut in IE
                .replace(/(<\/?img[^>]*>)[\r\n\v\f\t ]+/ig, '$1')
                // indented HTML introduces problematic ranges in IE
                .replace(/[\r\n\v\f\t ]+/ig, ' ');

    if (!html.length && $.browser.mozilla)
        html = '<br _moz_dirty="true" />';

    document.designMode = 'On';
    document.open();
    document.write(
        new $t.stringBuilder()
            .cat('<!DOCTYPE html><html><head>')
            .cat('<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />')
            .cat('<style type="text/css">')
                .cat('html,body{padding:0;margin:0;font-family:Verdana,Geneva,sans-serif;background:#fff;}')
                .cat('html{font-size:100%}body{font-size:.75em;line-height:1.5;padding-top:1px;margin-top:-1px;')
                    .catIf('direction:rtl;', $textarea.closest('.t-rtl').length)
                .cat('}')
                .cat('h1{font-size:2em;margin:.67em 0}h2{font-size:1.5em}h3{font-size:1.16em}h4{font-size:1em}h5{font-size:.83em}h6{font-size:.7em}')
                .cat('p{margin:0 0 1em;padding:0 .2em}.t-marker{display:none;}.t-paste-container{position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden}')
                .cat('ul,ol{padding-left:2.5em}')
                .cat('a{color:#00a}')
                .cat('code{font-size:1.23em}')
            .cat('</style>')
            .cat($.map(stylesheets, function(href){ return ['<link type="text/css" href="', href, '" rel="stylesheet"/>'].join(''); }).join(''))
            .cat('</head><body spellcheck="false">')
            .cat(html)
            .cat('</body></html>')
        .string());
        
    document.close();

    return window;
}

function selectionChanged(editor) {
    $t.trigger(editor.element, 'selectionChange');
}

var focusable = ".t-colorpicker,a.t-tool-icon:not(.t-state-disabled),.t-selectbox, .t-combobox .t-input";

function initializeContentElement(editor) {
    var isFirstKeyDown = true;

    editor.window = createContentElement($(editor.textarea), editor.stylesheets);
    editor.document = editor.window.contentDocument || editor.window.document;
    editor.body = editor.document.body;

    $(editor.document)
        .bind({
            keydown: function (e) {
                if (e.keyCode == 9 && e.shiftKey && !e.altKey && !e.ctrlKey) {
                                                var focusElement = $(editor.element).find(focusable);

                    if (focusElement.length) {
                        e.preventDefault();
                        focusElement.focus();
                    }
                } else if (e.keyCode === 121) {
                    //Using the timeout to avoid the default IE menu when F10 is pressed
                    setTimeout(function() {
                        var tabIndex = $(editor.element).attr("tabIndex");
    
                        //Chrome can't focus something which has already been focused
                        $(editor.element).attr("tabIndex", tabIndex || 0).focus().find(focusable).first().focus();
    
                        if (!tabIndex && tabIndex !== 0) {
                           $(editor.element).removeAttr("tabIndex"); 
                        } 

                    }, 100);
                    e.preventDefault();
                } else {
                    var toolName = editor.keyboard.toolFromShortcut(editor.tools, e);

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
                }
            },
            keyup: function (e) {
                var selectionCodes = [8, 9, 33, 34, 35, 36, 37, 38, 39, 40, 40, 45, 46];

                if ($.browser.mozilla && e.keyCode == 8) {
                    fixBackspace(editor, e);
                }
                
                if ($.inArray(e.keyCode, selectionCodes) > -1 || (e.keyCode == 65 && e.ctrlKey && !e.altKey && !e.shiftKey)) {
                    editor.pendingFormats.clear();
                    selectionChanged(editor);
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

                if (!$.browser.gecko && e.which == 2 && target.is('a[href]'))
                window.open(target.attr('href'), '_new');
            },
            mouseup: function () {
                selectionChanged(editor);
            }
        });

    $(editor.window)
        .bind('blur', function () {
            var old = editor.textarea.value,
            value = editor.encodedValue();

            editor.update(value);

            if (value != old) {
                $t.trigger(editor.element, 'change');
            }
        });
    
    $(editor.body)
        .bind('cut paste', function (e) {
              editor.clipboard['on' + e.type](e);
          });
}

var os = (function detectOS(ua) {
    var os = false, match = [],
        agentRxs = {
            fire: /(Silk)\/(\d+)\.(\d+(\.\d+)?)/,
            android: /(Android)\s+(\d+)\.(\d+(\.\d+)?)/,
            iphone: /(iPhone|iPod).*OS\s+(\d+)[\._]([\d\._]+)/,
            ipad: /(iPad).*OS\s+(\d+)[\._]([\d_]+)/,
            meego: /(MeeGo).+NokiaBrowser\/(\d+)\.([\d\._]+)/,
            webos: /(webOS)\/(\d+)\.(\d+(\.\d+)?)/,
            blackberry: /(BlackBerry|PlayBook).*?Version\/(\d+)\.(\d+(\.\d+)?)/
        },
        osRxs = {
            ios: /^i(phone|pad|pod)$/i,
            android: /^android|fire$/i
        },
        testOs = function (agent) {
            for (var os in osRxs) {
                if (osRxs.hasOwnProperty(os) && osRxs[os].test(agent))
                    return os;
            }
            return agent;
        };

    for (var agent in agentRxs) {
        if (agentRxs.hasOwnProperty(agent)) {
            match = ua.match(agentRxs[agent]);
            if (match) {
                os = {};
                os.device = agent;
                os.name = testOs(agent);
                os[os.name] = true;
                os.majorVersion = match[2];
                os.minorVersion = match[3].replace("_", ".");
                break;
            }
        }
    }
    return os;
})(navigator.userAgent);

var supportedBrowser = !os || (os.ios && os.majorVersion >= 5);

$t.editor = function (element, options) {
    /* suppress initialization in mobile webkit devices (w/o proper contenteditable support) */
    if (!supportedBrowser)
        return;

    var self = this;

    this.element = element;

    var $element = $(element);

    $element.closest('form').bind('submit', function () {
        self.update();
    });

    $.extend(this, options);

    $t.bind(this, {
        load: this.onLoad,
        selectionChange: this.onSelectionChange,
        change: this.onChange,
        execute: this.onExecute,
        error: this.onError,
        paste: this.onPaste
    });

    for (var id in this.tools)
        this.tools[id].name = id.toLowerCase();
        
    this.textarea = $element.find('textarea').attr('autocomplete', 'off')[0];
    initializeContentElement(this);
    this.keyboard = new Keyboard([new TypingHandler(this), new SystemHandler(this)]);
        
    this.clipboard = new Clipboard(this);

    this.pendingFormats = new PendingFormats(this);
        
    this.undoRedoStack = new UndoRedoStack();

    function toolFromClassName(element) {
        var tool = $.grep(element.className.split(' '), function (x) {
            return !/^t-(widget|tool-icon|state-hover|header|combobox|dropdown|selectbox|colorpicker)$/i.test(x);
        });
        return tool[0] ? tool[0].substring(2) : 'custom';
    }

    function appendShortcutSequence(localizedText, tool) {
        if (!tool.key)
            return localizedText;

        return new $t.stringBuilder()
            .cat(localizedText)
            .cat(' (')
                .catIf('Ctrl + ', tool.ctrl)
                .catIf('Shift + ', tool.shift)
                .catIf('Alt + ', tool.alt)
                .cat(tool.key)
            .cat(')')
            .string();
    }

    var toolbarItems = '.t-editor-toolbar > li > *',
        buttons = '.t-editor-button .t-tool-icon',
        enabledButtons = buttons + ':not(.t-state-disabled)',
        disabledButtons = buttons + '.t-state-disabled';

     $element.find(".t-combobox .t-input").keydown(function(e) {
        var combobox = $(this).closest(".t-combobox").data("tComboBox"),
            key = e.keyCode;

        if (key == 39 || key == 37) {
            combobox.close();
        } else if (key == 40) {
            if (!combobox.dropDown.isOpened()) {
                e.stopImmediatePropagation();
                combobox.open();
            }
        }
    });

    $element
        .delegate(enabledButtons, 'mouseenter', $t.hover)
        .delegate(enabledButtons, 'mouseleave', $t.leave)
        .delegate(buttons, 'mousedown', $t.preventDefault)
        .delegate(focusable, "keydown", function(e) {
            var closestLi = $(this).closest("li"),
                focusableTool = "li:has(" + focusable + ")",
                focusElement,
                keyCode = e.keyCode;

            if (keyCode == 39) {
                focusElement = closestLi.nextAll(focusableTool).first().find(focusable);
            } else if (keyCode == 37) {
                focusElement = closestLi.prevAll(focusableTool).last().find(focusable);
            } else if (keyCode == 27) {
                focusElement = self;
            } else if (keyCode == 9 && !(e.ctrlKey || e.altKey)) {
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
                        focusElement = self;
                    }
                }
            }

            if (focusElement) {
                focusElement.focus();
            }
        })
        .delegate(enabledButtons, 'click', $t.stopAll(function (e) {
            self.exec(toolFromClassName(this));
        }))
        .delegate(disabledButtons, 'click', function(e) { e.preventDefault(); })
        .find(toolbarItems)
            .each(function () {
                var toolName = toolFromClassName(this),
                    tool = self.tools[toolName],
                    description = self.localization[toolName],
                    $this = $(this);

                if (!tool)
                    return;
                    
                if (toolName == 'fontSize' || toolName == 'fontName') {
                    var inheritText = self.localization[toolName + 'Inherit'] || localization[toolName + 'Inherit']
                    self[toolName][0].Text = inheritText;
                    $this.find('input').val(inheritText).end()
                         .find('span.t-input').text(inheritText).end();
                }

                tool.init($this, {
                    title: appendShortcutSequence(description, tool),
                    editor: self
                });

            }).end()
        .bind('selectionChange', function() {
            var range = self.getRange();

            var nodes = textNodes(range);

            if (!nodes.length) {
                nodes = [range.startContainer];
            }

            $element.find(toolbarItems)
                .each(function () {
                    var tool = self.tools[toolFromClassName(this)];
                    if (tool) {
                        tool.update($(this), nodes, self.pendingFormats);
                    }
                });
        });

   
    $(document)
        .bind('DOMNodeInserted', function(e) {
            if ($.contains(e.target, self.element) || self.element == e.target) {
                // preserve updated value before re-initializing
                // don't use update() to prevent the editor from encoding the content too early
                self.textarea.value = self.value();
                $(self.element).find('iframe').remove();
                initializeContentElement(self);
            }
        })
        .bind('mousedown', function(e) {
            try {
                if (self.keyboard.typingInProgress())
                    self.keyboard.endTyping(true);
                
                if (!self.selectionRestorePoint) {
                    self.selectionRestorePoint = new RestorePoint(self.getRange());
                } 
            } catch (e) { }
        });
};

function fixBackspace(editor, e) {

    var range = editor.getRange(),
        startContainer = range.startContainer;

	if (startContainer == editor.body.firstChild || !dom.isBlock(startContainer)
    || (startContainer.childNodes.length > 0 && !(startContainer.childNodes.length == 1 && dom.is(startContainer.firstChild, 'br'))))
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

	range.setStart(previousBlock, isDataNode(previousBlock) ? previousBlock.nodeValue.length : 0);
	range.collapse(true);
	selectRange(range);

	dom.remove(startContainer);

    e.preventDefault();
}

$.extend($t.editor, {
    BlockFormatFinder: BlockFormatFinder,
    BlockFormatter: BlockFormatter,
    Dom: dom,
    FormatCommand: FormatCommand,
    GenericCommand: GenericCommand,
    GreedyBlockFormatter: GreedyBlockFormatter,
    GreedyInlineFormatFinder: GreedyInlineFormatFinder,
    GreedyInlineFormatter: GreedyInlineFormatter,
    ImageCommand: ImageCommand,
    IndentCommand: IndentCommand,
    IndentFormatter: IndentFormatter,
    InlineFormatFinder: InlineFormatFinder,
    InlineFormatter: InlineFormatter,
    InsertHtmlCommand: InsertHtmlCommand,
    Keyboard: Keyboard,
    LinkCommand: LinkCommand,
    LinkFormatFinder: LinkFormatFinder,
    LinkFormatter: LinkFormatter,
    ListCommand: ListCommand,
    ListFormatFinder: ListFormatFinder,
    ListFormatter: ListFormatter,
    MSWordFormatCleaner: MSWordFormatCleaner,
    Marker: Marker,
    NewLineCommand: NewLineCommand,
    OutdentCommand: OutdentCommand,
    ParagraphCommand: ParagraphCommand,
    PendingFormats: PendingFormats,
    RangeEnumerator: RangeEnumerator,
    RangeUtils: RangeUtils,
    RestorePoint: RestorePoint,
    SystemHandler: SystemHandler,
    TypingHandler: TypingHandler,
    UndoRedoStack: UndoRedoStack,
    UnlinkCommand: UnlinkCommand
});

// public api
$t.editor.prototype = {
    value: function (html) {
        var body = this.body;
        if (typeof html == "undefined") return domToXhtml(body);

        this.pendingFormats.clear();

        // Some browsers do not allow setting CDATA sections through innerHTML so we encode them as comments
        html = html.replace(/<!\[CDATA\[(.*)?\]\]>/g, '<!--[CDATA[$1]]-->');

        // Encode script tags to avoid execution and lost content (IE)
        html = html.replace(/<script([^>]*)>(.*)?<\/script>/ig, '<telerik:script $1>$2<\/telerik:script>');

        // Add <br/>s to empty paragraphs in mozilla
        if ($.browser.mozilla)
            html = html.replace(/<p([^>]*)>(\s*)?<\/p>/ig, '<p $1><br _moz_dirty="" /><\/p>');

        if ($.browser.msie && parseInt($.browser.version) < 9) {
            // Internet Explorer removes comments from the beginning of the html
            html = '<br/>' + html;

            var originalSrc = 'originalsrc',
                originalHref = 'originalhref';

            // IE < 8 makes href and src attributes absolute
            html = html.replace(/href\s*=\s*(?:'|")?([^'">\s]*)(?:'|")?/, originalHref + '="$1"');
            html = html.replace(/src\s*=\s*(?:'|")?([^'">\s]*)(?:'|")?/, originalSrc + '="$1"');

            body.innerHTML = html;
            dom.remove(body.firstChild);

            $(body).find('telerik\\:script,script,link,img,a').each(function () {
                var node = this;
                if (node[originalHref]) {
                    node.setAttribute('href', node[originalHref]);
                    node.removeAttribute(originalHref);
                }
                if (node[originalSrc]) {
                    node.setAttribute('src', node[originalSrc]);
                    node.removeAttribute(originalSrc);
                }
            });
        } else {
            body.innerHTML = html;
            if ($.browser.msie) {
                // having unicode characters creates denormalized DOM tree in IE9
                normalize(body);
            }
        }
        
        this.selectionRestorePoint = null;
        this.update();
    },

    focus: function () {
        this.window.focus();
    },

    update: function (value) {
        this.textarea.value = value || this.encoded ? this.encodedValue() : this.value();
    },

    encodedValue: function () {
        return dom.encode(this.value());
    },

    createRange: function (document) {
        return createRange(document || this.document);
    },

    getSelection: function () {
        return selectionFromDocument(this.document);
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
        return domToXhtml(this.getRange().cloneContents());
    },
    
    paste: function (html) {
        this.clipboard.paste(html);
    },

    exec: function (name, params) {
        var range, body, id, tool = '';

        name = name.toLowerCase();

        // restore selection
        if (!this.keyboard.typingInProgress()) {
            this.focus();

            range = this.getRange();
            body = this.document.body;
        }

        // exec tool
        for (id in this.tools)
            if (id.toLowerCase() == name) {
                tool = this.tools[id];
                break;
            }

        if (tool) {
            range = this.getRange();

            if (!/undo|redo/i.test(name) && tool.willDelayExecution(range)) {
                this.pendingFormats.toggle({ name: name, params: params, command: tool.command });
                selectionChanged(this);
                return;
            }

            var command = tool.command ? tool.command($.extend({ range: range }, params)) : null;

            $t.trigger(this.element, 'execute', { name: name, command: command });

            if (/undo|redo/i.test(name)) {
                this.undoRedoStack[name]();
            } else if (command) {
                if (!command.managesUndoRedo) {
                    this.undoRedoStack.push(command);
                }
                    
                command.editor = this;
                command.exec();

                if (command.async) {
                    command.change = $.proxy(function () { selectionChanged(this); }, this);
                    return;
                }
            }

            selectionChanged(this);
        }
    }
}

$.fn.tEditor = function (options) {
    return $t.create(this, {
        name: 'tEditor',
        init: function (element, options) {
            return new $t.editor(element, options);
        },
        options: options
    });
}

var formats = {
    bold: [
        { tags: ['strong'] },
        { tags: ['span'], attr: { style: { fontWeight: 'bold'}} }
    ],

    italic: [
        { tags: ['em'] },
        { tags: ['span'], attr: { style: { fontStyle: 'italic'}} }
    ],

    underline: [{ tags: ['span'], attr: { style: { textDecoration: 'underline'}}}],

    strikethrough: [
        { tags: ['del'] },
        { tags: ['span'], attr: { style: { textDecoration: 'line-through'}} }
    ],
    
    superscript: [
        { tags: ['sup'] }
    ],
    
    subscript: [
        { tags: ['sub'] }
    ],
    
    justifyLeft: [
        { tags: blockElements, attr: { style: { textAlign: 'left'}} },
        { tags: ['img'], attr: { style: { 'float': 'left'}} }
    ],

    justifyCenter: [
        { tags: blockElements, attr: { style: { textAlign: 'center'}} },
        { tags: ['img'], attr: { style: { display: 'block', marginLeft: 'auto', marginRight: 'auto'}} }
    ],

    justifyRight: [
        { tags: blockElements, attr: { style: { textAlign: 'right'}} },
        { tags: ['img'], attr: { style: { 'float': 'right'}} }
    ],

    justifyFull: [
        { tags: blockElements, attr: { style: { textAlign: 'justify'}} }
    ]
};

function formatByName(name, format) {
    for (var i = 0; i < format.length; i++)
        if ($.inArray(name, format[i].tags) >= 0)
            return format[i];
}

function Tool(options) {
    $.extend(this, options);

    this.init = function($ui, options) {
        $ui.attr({ unselectable: 'on', title: options.title });
    }

    this.command = function (commandArguments) {
        return new options.command(commandArguments);
    }

    this.update = function() {
    }

    this.willDelayExecution = function() {
        return false;
    }
}

Tool.exec = function (editor, name, value) {
    editor.exec(name, { value: value });
}

function FormatTool(options) {
    Tool.call(this, options);

    this.command = function (commandArguments) {
        return new FormatCommand($.extend(commandArguments, {
                formatter: options.formatter
            }));
    }

    this.update = function($ui, nodes, pendingFormats) {
        var isPending = pendingFormats.isPending(this.name),
            isFormatted = options.finder.isFormatted(nodes),
            isActive = isPending ? !isFormatted : isFormatted;

        $ui.toggleClass('t-state-active', isActive);
    }
}

var emptyFinder = function () { return { isFormatted: function () { return false } } };

var localization = {
    bold: 'Bold',
    italic: 'Italic',
    underline: 'Underline',
    strikethrough: 'Strikethrough',
    superscript: 'Superscript',
    subscript: 'Subscript',
    justifyCenter: 'Center text',
    justifyLeft: 'Align text left',
    justifyRight: 'Align text right',
    justifyFull: 'Justify',
    insertUnorderedList: 'Insert unordered list',
    insertOrderedList: 'Insert ordered list',
    indent: 'Indent',
    outdent: 'Outdent',
    createLink: 'Insert hyperlink',
    unlink: 'Remove hyperlink',
    insertImage: 'Insert image',
    insertHtml: 'Insert HTML',
    fontName: 'Select font family',
    fontNameInherit: '(inherited font)',
    fontSize: 'Select font size',
    fontSizeInherit: '(inherited size)',
    formatBlock: 'Format',
    style: 'Styles',
    emptyFolder: 'Empty Folder',
    uploadFile: 'Upload',
    orderBy: 'Arrange by:',
    orderBySize: 'Size',
    orderByName: 'Name',
    invalidFileType: "The selected file \"{0}\" is not valid. Supported file types are {1}.",
    deleteFile: 'Are you sure you want to delete "{0}"?',
    overwriteFile: 'A file with name "{0}" already exists in the current directory. Do you want to overwrite it?',
    directoryNotFound: 'A directory with this name was not found.'
};

$.fn.tEditor.defaults = {
    localization: localization,
    formats: formats,
    encoded: true,
    stylesheets: [],
    dialogOptions: {
        modal: true, resizable: false, draggable: true,
        effects: {list:[{name:'toggle'}]}
    },
    fontName: [
        { Text: localization.fontNameInherit,  Value: 'inherit' },
        { Text: 'Arial', Value: "Arial,Helvetica,sans-serif" },
        { Text: 'Courier New', Value: "'Courier New',Courier,monospace" },
        { Text: 'Georgia', Value: "Georgia,serif" },
        { Text: 'Impact', Value: "Impact,Charcoal,sans-serif" },
        { Text: 'Lucida Console', Value: "'Lucida Console',Monaco,monospace" },
        { Text: 'Tahoma', Value: "Tahoma,Geneva,sans-serif" },
        { Text: 'Times New Roman', Value: "'Times New Roman',Times,serif" },
        { Text: 'Trebuchet MS', Value: "'Trebuchet MS',Helvetica,sans-serif" },
        { Text: 'Verdana', Value: "Verdana,Geneva,sans-serif" }
    ],
    fontSize: [
        { Text: localization.fontSizeInherit,  Value: 'inherit' },
        { Text: '1 (8pt)',  Value: 'xx-small' },
        { Text: '2 (10pt)', Value: 'x-small' },
        { Text: '3 (12pt)', Value: 'small' },
        { Text: '4 (14pt)', Value: 'medium' },
        { Text: '5 (18pt)', Value: 'large' },
        { Text: '6 (24pt)', Value: 'x-large' },
        { Text: '7 (36pt)', Value: 'xx-large' }
    ],
    formatBlock: [
        { Text: 'Paragraph', Value: 'p' },
        { Text: 'Quotation', Value: 'blockquote' },
        { Text: 'Heading 1', Value: 'h1' },
        { Text: 'Heading 2', Value: 'h2' },
        { Text: 'Heading 3', Value: 'h3' },
        { Text: 'Heading 4', Value: 'h4' },
        { Text: 'Heading 5', Value: 'h5' },
        { Text: 'Heading 6', Value: 'h6' }
    ],
    tools: {
        bold: new InlineFormatTool({ key: 'B', ctrl: true, format: formats.bold}),
        italic: new InlineFormatTool({ key: 'I', ctrl: true, format: formats.italic}),
        underline: new InlineFormatTool({ key: 'U', ctrl: true, format: formats.underline}),
        strikethrough: new InlineFormatTool({format: formats.strikethrough}),
        superscript: new InlineFormatTool({format: formats.superscript }),
        subscript: new InlineFormatTool({format: formats.subscript }),
        undo: { key: 'Z', ctrl: true },
        redo: { key: 'Y', ctrl: true },
        insertLineBreak: new Tool({ key: 13, shift: true, command: NewLineCommand }),
        insertParagraph: new Tool({ key: 13, command: ParagraphCommand }),
        justifyCenter: new BlockFormatTool({format: formats.justifyCenter}),
        justifyLeft: new BlockFormatTool({format: formats.justifyLeft}),
        justifyRight: new BlockFormatTool({format: formats.justifyRight}),
        justifyFull: new BlockFormatTool({format: formats.justifyFull}),
        insertUnorderedList: new ListTool({tag:'ul'}),
        insertOrderedList: new ListTool({tag:'ol'}),
        createLink: new Tool({ key: 'K', ctrl: true, command: LinkCommand}),
        unlink: new UnlinkTool({ key: 'K', ctrl: true, shift: true}),
        insertImage: new Tool({ command: ImageCommand }),
        indent: new Tool({ command: IndentCommand }),
        outdent: new OutdentTool(),
        insertHtml: new InsertHtmlTool(),
        style: new StyleTool(),
        fontName: new FontTool({cssAttr:'font-family', domAttr: 'fontFamily', name:'fontName'}),
        fontSize: new FontTool({cssAttr:'font-size', domAttr:'fontSize', name:'fontSize'}),
        formatBlock: new FormatBlockTool(),
        foreColor: new ColorTool({cssAttr:'color', domAttr:'color', name:'foreColor'}),
        backColor: new ColorTool({cssAttr:'background-color', domAttr: 'backgroundColor', name:'backColor'})
    }
}
})(jQuery);
