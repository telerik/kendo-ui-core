(function($) {

function Command(options) {
    var restorePoint = new RestorePoint(options.range);
    var marker = new Marker();

    this.formatter = options.formatter;

    this.getRange = function () {
        return restorePoint.toRange();
    }

    this.lockRange = function (expand) {
        return marker.add(this.getRange(), expand);
    }

    this.releaseRange = function (range) {
        marker.remove(range);
        selectRange(range);
    }

    this.undo = function () {
        restorePoint.body.innerHTML = restorePoint.html;
        selectRange(restorePoint.toRange());
    }

    this.redo = function () {
        this.exec();
    }

    this.exec = function () {
        var range = this.lockRange(true);
        this.formatter.editor = this.editor;
        this.formatter.toggle(range);
        this.releaseRange(range);
    }
}

function GenericCommand(startRestorePoint, endRestorePoint) {
    var body = startRestorePoint.body;

    this.redo = function () {
        body.innerHTML = endRestorePoint.html;
        selectRange(endRestorePoint.toRange());
    }

    this.undo = function () {
        body.innerHTML = startRestorePoint.html;
        selectRange(startRestorePoint.toRange());
    }
}

function InsertHtmlCommand(options) {
    Command.call(this, options);

    this.managesUndoRedo = true;

    this.exec = function () {
        var editor = this.editor;
        var range = editor.getRange();
        var startRestorePoint = new RestorePoint(range);

        editor.clipboard.paste(options.value || '');
        editor.undoRedoStack.push(new GenericCommand(startRestorePoint, new RestorePoint(editor.getRange())));

        editor.focus();
    }
}

function InsertHtmlTool() {
    Tool.call(this);

    this.command = function (commandArguments) {
        return new InsertHtmlCommand(commandArguments);
    }
    
    this.update = function($ui, nodes) {
        $ui.data('tSelectBox').close();
    }

    this.init = function($ui, initOptions) {
        var editor = initOptions.editor;
        
        $ui.tSelectBox({
            data: editor['insertHtml'],
            onItemCreate: function (e) {
                e.html = '<span unselectable="on">' + e.dataItem.Text + '</span>';
            },
            onChange: function (e) {
                Tool.exec(editor, 'insertHtml', e.value);
            },
            highlightFirst: false
        }).find('.t-input').html(editor.localization.insertHtml);
    }
}

function UndoRedoStack() {
    var stack = [], currentCommandIndex = -1;

    this.push = function (command) {
        stack = stack.slice(0, currentCommandIndex + 1);
        currentCommandIndex = stack.push(command) - 1;
    }

    this.undo = function () {
        if (this.canUndo())
            stack[currentCommandIndex--].undo();
    }

    this.redo = function () {
        if (this.canRedo())
            stack[++currentCommandIndex].redo();
    }

    this.canUndo = function () {
        return currentCommandIndex >= 0;
    }

    this.canRedo = function () {
        return currentCommandIndex != stack.length - 1;
    }
}

function TypingHandler(editor) {
    this.keydown = function (e) {
        var keyboard = editor.keyboard;
        var isTypingKey = keyboard.isTypingKey(e);

        if (isTypingKey && !keyboard.typingInProgress()) {
            var range = editor.getRange();
            this.startRestorePoint = new RestorePoint(range);

            keyboard.startTyping($.proxy(function () {
                editor.selectionRestorePoint = this.endRestorePoint = new RestorePoint(editor.getRange());
                editor.undoRedoStack.push(new GenericCommand(this.startRestorePoint, this.endRestorePoint));
            }, this));

            return true;
        }

        return false;
    }

    this.keyup = function (e) {
        var keyboard = editor.keyboard;

        if (keyboard.typingInProgress()) {
            keyboard.endTyping();
            return true;
        }

        return false;
    }
}

function SystemHandler(editor) {
    var systemCommandIsInProgress = false;

    this.createUndoCommand = function () {
        this.endRestorePoint = new RestorePoint(editor.getRange());
        editor.undoRedoStack.push(new GenericCommand(this.startRestorePoint, this.endRestorePoint));
        this.startRestorePoint = this.endRestorePoint;
    }

    this.changed = function () {
        if (this.startRestorePoint)
            return this.startRestorePoint.html != editor.body.innerHTML;

        return false;
    }

    this.keydown = function (e) {
        var keyboard = editor.keyboard;

        if (keyboard.isModifierKey(e)) {

            if (keyboard.typingInProgress())
                keyboard.endTyping(true);

            this.startRestorePoint = new RestorePoint(editor.getRange());
            return true;
        }

        if (keyboard.isSystem(e)) {
            systemCommandIsInProgress = true;

            if (this.changed()) {
                systemCommandIsInProgress = false;
                this.createUndoCommand();
            }

            return true;
        }

        return false;
    }

    this.keyup = function (e) {
        if (systemCommandIsInProgress && this.changed()) {
            systemCommandIsInProgress = false;
            this.createUndoCommand(e);
            return true;
        }

        return false;
    }
}

function Keyboard(handlers) {
    var typingInProgress = false;
    var timeout;
    var onEndTyping;

    function isCharacter(keyCode) {
        return (keyCode >= 48 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 111) ||
            (keyCode >= 186 && keyCode <= 192) || (keyCode >= 219 && keyCode <= 222);
    }

    this.toolFromShortcut = function (tools, e) {
        var key = String.fromCharCode(e.keyCode);

        for (var toolName in tools) {
            var tool = tools[toolName];

            if ((tool.key == key || tool.key == e.keyCode) && !!tool.ctrl == e.ctrlKey && !!tool.alt == e.altKey && !!tool.shift == e.shiftKey)
                return toolName;
        }
    }

    this.isTypingKey = function (e) {
        var keyCode = e.keyCode;
        return (isCharacter(keyCode) && !e.ctrlKey && !e.altKey) || keyCode == 32 || keyCode == 13
        || keyCode == 8 || (keyCode == 46 && !e.shiftKey && !e.ctrlKey && !e.altKey);
    }

    this.isModifierKey = function (e) {
        var keyCode = e.keyCode;
        return (keyCode == 17 && !e.shiftKey && !e.altKey)
                || (keyCode == 16 && !e.ctrlKey && !e.altKey)
                || (keyCode == 18 && !e.ctrlKey && !e.shiftKey);
    }

    this.isSystem = function (e) {
        return e.keyCode == 46 && e.ctrlKey && !e.altKey && !e.shiftKey;
    }

    this.startTyping = function (callback) {
        onEndTyping = callback;
        typingInProgress = true;
    }

    function stopTyping() {
        typingInProgress = false;
        if (onEndTyping)
            onEndTyping();
    }

    this.endTyping = function (force) {
        this.clearTimeout();
        if (force)
            stopTyping();
        else
            timeout = window.setTimeout(stopTyping, 1000);
    }

    this.typingInProgress = function () {
        return typingInProgress;
    }

    this.clearTimeout = function () {
        window.clearTimeout(timeout);
    }

    function notify(e, what) {
        for (var i = 0; i < handlers.length; i++)
            if (handlers[i][what](e))
                break;
    }

    this.keydown = function (e) {
        notify(e, 'keydown');
    }

    this.keyup = function (e) {
        notify(e, 'keyup');
    }
}

function Clipboard (editor) {
    var cleaners = [new MSWordFormatCleaner()];

    function htmlToFragment (html) {
        var container = dom.create(editor.document, 'div');
        container.innerHTML = html;
            
        var fragment = editor.document.createDocumentFragment();
            
        while (container.firstChild)
            fragment.appendChild(container.firstChild);
            
        return fragment;
    }

    function isBlock(html) {
        return /<(div|p|ul|ol|table|h[1-6])/i.test(html);
    }
        
    this.oncut = function(e) {
        var startRestorePoint = new RestorePoint(editor.getRange());
        setTimeout(function() {
            editor.undoRedoStack.push(new GenericCommand(startRestorePoint, new RestorePoint(editor.getRange())));
        });
    }

    this.onpaste = function(e) {
        var range = editor.getRange();
        var startRestorePoint = new RestorePoint(range);
            
        var clipboardNode = dom.create(editor.document, 'div', {className:'t-paste-container', innerHTML: '\ufeff'});

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
            $t.trigger(editor.element, "paste", args);
            editor.clipboard.paste(args.html, true);
            editor.undoRedoStack.push(new GenericCommand(startRestorePoint, new RestorePoint(editor.getRange())));
            selectionChanged(editor);
        });
    }

    function splittableParent(block, node) {
        if (block)
            return dom.parentOfType(node, ['p', 'ul', 'ol']) || node.parentNode;
            
        var parent = node.parentNode;
        var body = node.ownerDocument.body;
            
        if (dom.isInline(parent)) {
            while (parent.parentNode != body && !dom.isBlock(parent.parentNode))
                parent = parent.parentNode;
        }
            
        return parent;
    }

    this.paste = function (html, clean) {
        var i, l;

        for (i = 0, l = cleaners.length; i < l; i++)
            if (cleaners[i].applicable(html))
                html = cleaners[i].clean(html);
            
        if (clean) {
            // remove br elements which immediately precede block elements
            html = html.replace(/(<br>(\s|&nbsp;)*)+(<\/?(div|p|li|col|t))/ig, "$3");
            // remove empty inline elements
            html = html.replace(/<(a|span)[^>]*><\/\1>/ig, "");
        }

        // It is possible in IE to copy just <li> tags
        html = html.replace(/^<li/i, '<ul><li').replace(/li>$/g, 'li></ul>');

        var block = isBlock(html);

        var range = editor.getRange();
        range.deleteContents();

        if (range.startContainer == editor.document)
            range.selectNodeContents(editor.body);
            
        var marker = new Marker();
        var caret = marker.addCaret(range)
            
        var parent = splittableParent(block, caret);
        var unwrap = false;
            
        if (!/body|td/.test(dom.name(parent)) && (block || dom.isInline(parent))) {
            range.selectNode(caret);
            split(range, parent, true);
            unwrap = true;
        }
            
        var fragment = htmlToFragment(html);
        
        if (fragment.firstChild && fragment.firstChild.className === "t-paste-container") {
            var fragmentsHtml = [];
            for (i = 0, l = fragment.childNodes.length; i < l; i++) {
                fragmentsHtml.push(fragment.childNodes[i].innerHTML);
            }

            fragment = htmlToFragment(fragmentsHtml.join('<br />'));
        }

        range.insertNode(fragment);
                
        parent = splittableParent(block, caret);
        if (unwrap) {
            while (caret.parentNode != parent)
                dom.unwrap(caret.parentNode);
                
            dom.unwrap(caret.parentNode);
        }
            
        normalize(range.commonAncestorContainer);
        caret.style.display = 'inline';
        dom.scrollTo(caret);
        marker.removeCaret(range);
        selectRange(range);
    }
}

function MSWordFormatCleaner() {
    var replacements = [
        /<!--(.|\n)*?-->/g, '', /* comments */
        /&quot;/g, "'", /* encoded quotes (in attributes) */
        /(?:<br>&nbsp;[\s\r\n]+|<br>)*(<\/?(h[1-6]|hr|p|div|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|caption|address|pre|form|blockquote|dl|dt|dd|dir|fieldset)[^>]*>)(?:<br>&nbsp;[\s\r\n]+|<br>)*/g, '$1',
        /<br><br>/g, '<BR><BR>', 
        /<br>/g, ' ',
        /<BR><BR>/g, '<br>',
        /^\s*(&nbsp;)+/gi, '',
        /(&nbsp;|<br[^>]*>)+\s*$/gi, '',
        /mso-[^;"]*;?/ig, '', /* office-related CSS attributes */
        /<(\/?)b(\s[^>]*)?>/ig, '<$1strong$2>',
        /<(\/?)i(\s[^>]*)?>/ig, '<$1em$2>',
        /<\/?(meta|link|style|o:|v:)[^>]*>((?:.|\n)*?<\/(meta|link|style|o:|v:)[^>]*>)?/ig, '', /* external references and namespaced tags */
        /style=(["|'])\s*\1/g, '' /* empty style attributes */
    ];
        
    this.applicable = function(html) {
        return /class="?Mso|style="[^"]*mso-/i.test(html);
    }
        
    function listType(html) {
        if (/^[\u2022\u00b7\u00a7\u00d8o]\u00a0+/.test(html))
            return 'ul';
            
        if (/^\s*\w+[\.\)]\u00a0{2,}/.test(html))
            return 'ol';
    }

    function lists(html) {
        var placeholder = dom.create(document, 'div', {innerHTML: html});
        var blockChildren = $(blockElements.join(','), placeholder);
            
        var lastMargin = -1, lastType, levels = {'ul':{}, 'ol':{}}, li = placeholder;
            
        for (var i = 0; i < blockChildren.length; i++) {
            var p = blockChildren[i];
            var html = p.innerHTML.replace(/<\/?\w+[^>]*>/g, '').replace(/&nbsp;/g, '\u00a0');      
            var type = listType(html);
                
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
    }

    function stripEmptyAnchors(html) {
        return html.replace(/<a([^>]*)>\s*<\/a>/ig, function(a, attributes) {
            if (!attributes || attributes.indexOf("href") < 0) {
                return "";
            }

            return a;
        });
    }

    this.clean = function(html) {
        for (var i = 0, l = replacements.length; i < l; i+= 2)
            html = html.replace(replacements[i], replacements[i+1]);

        html = stripEmptyAnchors(html);
        html = lists(html);
        html = html.replace(/\s+class="?[^"\s>]*"?/ig, '');
           
        return html;
    }
};

})(jQuery);