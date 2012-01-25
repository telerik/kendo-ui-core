(function($) {

    // Imports ================================================================
    var kendo = window.kendo,
        Class = kendo.Class,
        map = $.map,
        extend = $.extend;

function makeMap(items) {
    var obj = {};
        
    for (var i = 0; i < items.length; i++)
        obj[items[i]] = true;
        
    return obj;
}

var empty = makeMap('area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed'.split(',')),
    blockElements = 'div,p,h1,h2,h3,h4,h5,h6,address,applet,blockquote,button,center,dd,dir,dl,dt,fieldset,form,frameset,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,pre,script,table,tbody,td,tfoot,th,thead,tr,ul'.split(','),
    block = makeMap(blockElements),
    inlineElements = 'span,em,a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,strike,strong,sub,sup,textarea,tt,u,var'.split(','),
    inline = makeMap(inlineElements),
    fillAttrs = makeMap('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected'.split(','));

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
                    dom.remove(prev);
                }
                prev = node;
            }
        }
    }
}

function findNodeIndex(node) {
    var i = 0;
    while (node = node.previousSibling) i++;
    return i;
}

function isDataNode(node) {
    return node && node.nodeValue !== null && node.data !== null;
}

function isAncestorOf(parent, node) {
    try {
        return !isDataNode(parent) && ($.contains(parent, isDataNode(node) ? node.parentNode : node) || node.parentNode == parent);
    } catch (e) {
        return false;
    }
}

function isAncestorOrSelf(root, node) {
    return isAncestorOf(root, node) || root == node;
}

function findClosestAncestor(root, node) {
    if (isAncestorOf(root, node))
        while (node && node.parentNode != root)
            node = node.parentNode;

    return node;
}

function getNodeLength(node) {
    return isDataNode(node) ? node.length : node.childNodes.length;
}

function splitDataNode(node, offset) {
    var newNode = node.cloneNode(false);
    node.deleteData(offset, node.length);
    newNode.deleteData(0, offset);
    dom.insertAfter(newNode, node);
}

function attrEquals(node, attributes) {
    for (var key in attributes) {
        var value = node[key];

        if (key == 'float')
            value = node[$.support.cssFloat ? "cssFloat" : "styleFloat"];

        if (typeof value == 'object') {
            if (!attrEquals(value, attributes[key]))
                return false;
        } else if (value != attributes[key])
            return false;
    }

    return true;
}

var whitespace = /^\s+$/;
var rgb = /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i;
var cssAttributes = ('color,padding-left,padding-right,padding-top,padding-bottom,\
background-color,background-attachment,background-image,background-position,background-repeat,\
border-top-style,border-top-width,border-top-color,\
border-bottom-style,border-bottom-width,border-bottom-color,\
border-left-style,border-left-width,border-left-color,\
border-right-style,border-right-width,border-right-color,\
font-family,font-size,font-style,font-variant,font-weight,line-height'
).split(',');

var Dom = Class.extend({
    blockParentOrBody: function(node) {
        return dom.parentOfType(node, blockElements) || node.ownerDocument.body;
    },
    normalize: normalize,
    toHex: function (color) {
        var matches = rgb.exec(color);

        if (!matches) return color;

        return '#' + map(matches.slice(1), function (x) {
            return x = parseInt(x).toString(16), x.length > 1 ? x : '0' + x;
        }).join('');
    },

    encode: function (value) {
        return value.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/\u00a0/g, '&nbsp;');
    },

    name: function (node) {
        return node.nodeName.toLowerCase();
    },
        
    significantChildNodes: function(node) {
        return $.grep(node.childNodes, function(child) {
            return child.nodeType != 3 || !dom.isWhitespace(child);
        });
    },
        
    lastTextNode: function(node) {
        if (node.nodeType == 3)
            return node;
            
        var result = null;
            
        for (var child = node.lastChild; child; child = child.previousSibling)
            if (result = dom.lastTextNode(child))
                return result;
                
        return result;
    },

    is: function (node, nodeName) {
        return dom.name(node) == nodeName;
    },
        
    isMarker: function(node) {
        return node.className == 't-marker';
    },
        
    isWhitespace: function(node) {
        return whitespace.test(node.nodeValue);
    },
        
    isBlock: function(node) {
        return block[dom.name(node)];
    },

    isEmpty: function(node) {
        return empty[dom.name(node)];
    },
        
    isInline: function(node) {
        return inline[dom.name(node)];
    },
        
    scrollTo: function (node) {
        node.ownerDocument.body.scrollTop = $(isDataNode(node) ? node.parentNode : node).offset().top;
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
            if (isDataNode(node)) {
                if (node.nodeValue.replace(/\ufeff/g, '').length == 0)
                    dom.remove(node);
                if (dom.isWhitespace(node))
                    dom.insertBefore(node, parent);
            } else if (node.className != 't-marker') {
                dom.trim(node);
                if (node.childNodes.length == 0 && !dom.isEmpty(node))
                    dom.remove(node);
            }
        }

        return parent;
    },

    parentOfType: function (node, tags) {
        do {
            node = node.parentNode;
        } while (node && !(dom.ofType(node, tags)));

        return node;
    },

    ofType: function (node, tags) {
        return $.inArray(dom.name(node), tags) >= 0;
    },

    changeTag: function (referenceElement, tagName) {
        var newElement = dom.create(referenceElement.ownerDocument, tagName);
        var attributes = referenceElement.attributes;

        for (var i = 0; i < attributes.length; i++) {
            var attribute = attributes[i];
            if (attribute.specified) {
                // IE < 8 cannot set class or style via setAttribute
                var name = attribute.nodeName;
                var value = attribute.nodeValue;
                if (name == 'class')
                    newElement.className = value;
                else if (name == 'style')
                    newElement.style.cssText = referenceElement.style.cssText;
                else
                    newElement.setAttribute(name, value);
            }
        }

        while (referenceElement.firstChild)
            newElement.appendChild(referenceElement.firstChild);

        dom.insertBefore(newElement, referenceElement);
        dom.remove(referenceElement);
        return newElement;
    },

    wrap: function (node, wrapper) {
        dom.insertBefore(wrapper, node);
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
        return dom.attr(document.createElement(tagName), attributes);
    },

    attr: function (element, attributes) {
        attributes = extend({}, attributes);

        if (attributes && 'style' in attributes) {
            dom.style(element, attributes.style);
            delete attributes.style;
        }
        return extend(element, attributes);
    },

    style: function (node, value) {
        $(node).css(value || {});
    },

    unstyle: function (node, value) {
        for (var key in value) {
            if (key == 'float')
                key = $.support.cssFloat ? "cssFloat" : "styleFloat";

            node.style[key] = '';
        }

        if (node.style.cssText == '')
            node.removeAttribute('style');
    },

    inlineStyle: function(document, name, attributes) {
        var span = dom.create(document, name, attributes);
        
        document.body.appendChild(span);
                
        var $span = $(span);
                
        var style = map(cssAttributes, function(value) {
            if ($.browser.msie && value == 'line-height' && $span.css(value) == "1px")
                return 'line-height:1.5';
            else
                return value + ':' + $span.css(value);
        }).join(';');
                
        $span.remove();
        
        return style;
    },

    commonAncestor: function () {
        var count = arguments.length;

        if (!count)
            return null;

        if (count == 1)
            return arguments[0];

        var paths = [];
        var minPathLength = Infinity;

        for (var i = 0; i < count; i++) {
            var ancestors = [];
            var node = arguments[i];
            while (node) {
                ancestors.push(node);
                node = node.parentNode;
            }
            paths.push(ancestors.reverse());
            minPathLength = Math.min(minPathLength, ancestors.length);
        }

        if (count == 1)
            return paths[0][0];

        var output = null;
        for (i = 0; i < minPathLength; i++) {
            var first = paths[0][i];

            for (var j = 1; j < count; j++)
                if (first != paths[j][i])
                    return output;

            output = first;
        }
        return output;
    }
});

// exports

extend(kendo.ui.Editor, {
    Dom: Dom
});

})(jQuery);