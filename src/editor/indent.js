(function($, undefined) {

// Imports ================================================================
var kendo = window.kendo,
    Class = kendo.Class,
    extend = $.extend,
    Editor = kendo.ui.Editor,
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
    var property = dom.name(node) != 'td' ? 'marginLeft' : 'paddingLeft';
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
        var formatNodes = this.finder.findSuitable(nodes);
        if (formatNodes.length) {
            var targets = [];
            for (var i = 0; i < formatNodes.length;i++)
                if (dom.is(formatNodes[i], 'li')) {
                    if ($(formatNodes[i]).index() == 0)
                        targets.push(formatNodes[i].parentNode);
                    else if ($.inArray(formatNodes[i].parentNode, targets) < 0)
                        targets.push(formatNodes[i]);
                }
                else
                    targets.push(formatNodes[i]);
            
            while (targets.length) {
                var formatNode = targets.shift();
                if (dom.is(formatNode, 'li')) {
                    var parentList = formatNode.parentNode;
                    var $sibling = $(formatNode).prev('li');
                    var $siblingList = $sibling.find('ul,ol').last();

                    var nestedList = $(formatNode).children('ul,ol')[0];
                    
                    if (nestedList && $sibling[0]) {
                        if ($siblingList[0]) {
                           $siblingList.append(formatNode);
                           $siblingList.append($(nestedList).children()); 
                           dom.remove(nestedList);
                        } else {
                            $sibling.append(nestedList);
                            nestedList.insertBefore(formatNode, nestedList.firstChild);                        
                        }
                    } else {
                        nestedList = $sibling.children('ul,ol')[0];
                        if (!nestedList) {
                            nestedList = dom.create(formatNode.ownerDocument, dom.name(parentList));
                            $sibling.append(nestedList);
                        }
                        
                        while (formatNode && formatNode.parentNode == parentList) {
                            nestedList.appendChild(formatNode);
                            formatNode = targets.shift();
                        }
                    }
                } else {
                    var marginLeft = parseInt(indent(formatNode)) + 30;
                    indent(formatNode, marginLeft);
                }
            }
        } else {
            var formatter = new BlockFormatter([{tags:blockElements}], {style:{marginLeft:30}});

            formatter.apply(nodes);
        }
    },

    remove: function(nodes) {
        var formatNodes = this.finder.findSuitable(nodes),
            targetNode;

        for (var i = 0; i < formatNodes.length; i++) {
            var $formatNode = $(formatNodes[i]);
            
            if ($formatNode.is('li')) {
                var $list = $formatNode.parent();
                var $listParent = $list.parent();
                // $listParent will be ul or ol in case of invalid dom - <ul><li></li><ul><li></li></ul></ul>   
                if ($listParent.is('li,ul,ol') && !indent($list[0])) {
                    var $siblings = $formatNode.nextAll('li');
                    if ($siblings.length)
                        $($list[0].cloneNode(false)).appendTo($formatNode).append($siblings);
                                        
                    if ($listParent.is("li")) {
                        $formatNode.insertAfter($listParent);
                    } else {
                        $formatNode.appendTo($listParent);
                    } 

                    if (!$list.children('li').length)
                        $list.remove();
                        
                    continue;
                } else {
                    if (targetNode == $list[0]) {
                        // removing format on sibling LI elements
                        continue;
                    }
                    targetNode = $list[0];
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

    initialize: function($ui) {
        $ui.attr('unselectable', 'on')
           .addClass('k-state-disabled');
    },

    update: function ($ui, nodes) {
        var suitable = this.finder.findSuitable(nodes),
            isOutdentable, listParentsCount;

        for (var i = 0; i < suitable.length; i++) {
            isOutdentable = indent(suitable[i]);

            if (!isOutdentable) {
                listParentsCount = $(suitable[i]).parents('ul,ol').length;
                isOutdentable = (dom.is(suitable[i], 'li') && (listParentsCount > 1 || indent(suitable[i].parentNode)))
                             || (dom.ofType(suitable[i], ['ul','ol']) && listParentsCount > 0);
            }

            if (isOutdentable) {
                $ui.removeClass('k-state-disabled');
                return;
            }
        }
    
        $ui.addClass('k-state-disabled').removeClass('k-state-hover');
    }

});

extend(kendo.ui.Editor, {
    IndentFormatter: IndentFormatter,
    IndentCommand: IndentCommand,
    OutdentCommand: OutdentCommand,
    OutdentTool: OutdentTool
});

registerTool("indent", new Tool({ command: IndentCommand, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Indent"}) }));
registerTool("outdent", new OutdentTool({template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Outdent"})}));

})(jQuery);