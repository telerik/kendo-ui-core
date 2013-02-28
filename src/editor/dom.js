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

        for (var attr in attributes) {
            if (attributes[attr] === null) {
                element.removeAttribute(attr);
                delete attributes[attr];
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

})(window.kendo.jQuery);
