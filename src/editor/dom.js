(function(f, define){
    define([ "./main" ], f);
})(function(){

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
    nonListBlockElements = "div,p,h1,h2,h3,h4,h5,h6,address,applet,blockquote,button,center,dd,dir,dl,dt,fieldset,form,frameset,hr,iframe,isindex,map,menu,noframes,noscript,object,pre,script,table,tbody,td,tfoot,th,thead,tr,header,article,nav,footer,section,aside,main,figure,figcaption".split(","),
    blockElements = nonListBlockElements.concat(["ul","ol","li"]),
    block = makeMap(blockElements),
    inlineElements = "span,em,a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,strike,strong,sub,sup,textarea,tt,u,var,data,time,mark,ruby".split(","),
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
    bom = /\ufeff/g,
    whitespaceOrBom = /^(\s+|\ufeff)$/,
    persistedScrollTop,
    cssAttributes =
           ("color,padding-left,padding-right,padding-top,padding-bottom," +
            "background-color,background-attachment,background-image,background-position,background-repeat," +
            "border-top-style,border-top-width,border-top-color," +
            "border-bottom-style,border-bottom-width,border-bottom-color," +
            "border-left-style,border-left-width,border-left-color," +
            "border-right-style,border-right-width,border-right-color," +
            "font-family,font-size,font-style,font-variant,font-weight,line-height"
           ).split(","),
    htmlRe = /[<>\&]/g,
    entityRe = /[\u00A0-\u2666<>\&]/g,
    entityTable = {
            34: 'quot', 38: 'amp', 39: 'apos', 60: 'lt', 62: 'gt',
            160: 'nbsp', 161: 'iexcl', 162: 'cent', 163: 'pound', 164: 'curren',
            165: 'yen', 166: 'brvbar', 167: 'sect', 168: 'uml', 169: 'copy',
            170: 'ordf', 171: 'laquo', 172: 'not', 173: 'shy', 174: 'reg',
            175: 'macr', 176: 'deg', 177: 'plusmn', 178: 'sup2', 179: 'sup3',
            180: 'acute', 181: 'micro', 182: 'para', 183: 'middot', 184: 'cedil',
            185: 'sup1', 186: 'ordm', 187: 'raquo', 188: 'frac14', 189: 'frac12',
            190: 'frac34', 191: 'iquest', 192: 'Agrave', 193: 'Aacute', 194: 'Acirc',
            195: 'Atilde', 196: 'Auml', 197: 'Aring', 198: 'AElig', 199: 'Ccedil',
            200: 'Egrave', 201: 'Eacute', 202: 'Ecirc', 203: 'Euml', 204: 'Igrave',
            205: 'Iacute', 206: 'Icirc', 207: 'Iuml', 208: 'ETH', 209: 'Ntilde',
            210: 'Ograve', 211: 'Oacute', 212: 'Ocirc', 213: 'Otilde', 214: 'Ouml',
            215: 'times', 216: 'Oslash', 217: 'Ugrave', 218: 'Uacute', 219: 'Ucirc',
            220: 'Uuml', 221: 'Yacute', 222: 'THORN', 223: 'szlig', 224: 'agrave',
            225: 'aacute', 226: 'acirc', 227: 'atilde', 228: 'auml', 229: 'aring',
            230: 'aelig', 231: 'ccedil', 232: 'egrave', 233: 'eacute', 234: 'ecirc',
            235: 'euml', 236: 'igrave', 237: 'iacute', 238: 'icirc', 239: 'iuml',
            240: 'eth', 241: 'ntilde', 242: 'ograve', 243: 'oacute', 244: 'ocirc',
            245: 'otilde', 246: 'ouml', 247: 'divide', 248: 'oslash', 249: 'ugrave',
            250: 'uacute', 251: 'ucirc', 252: 'uuml', 253: 'yacute', 254: 'thorn',
            255: 'yuml', 402: 'fnof', 913: 'Alpha', 914: 'Beta', 915: 'Gamma',
            916: 'Delta', 917: 'Epsilon', 918: 'Zeta', 919: 'Eta', 920: 'Theta',
            921: 'Iota', 922: 'Kappa', 923: 'Lambda', 924: 'Mu', 925: 'Nu',
            926: 'Xi', 927: 'Omicron', 928: 'Pi', 929: 'Rho', 931: 'Sigma',
            932: 'Tau', 933: 'Upsilon', 934: 'Phi', 935: 'Chi', 936: 'Psi',
            937: 'Omega', 945: 'alpha', 946: 'beta', 947: 'gamma', 948: 'delta',
            949: 'epsilon', 950: 'zeta', 951: 'eta', 952: 'theta', 953: 'iota',
            954: 'kappa', 955: 'lambda', 956: 'mu', 957: 'nu', 958: 'xi',
            959: 'omicron', 960: 'pi', 961: 'rho', 962: 'sigmaf', 963: 'sigma',
            964: 'tau', 965: 'upsilon', 966: 'phi', 967: 'chi', 968: 'psi',
            969: 'omega', 977: 'thetasym', 978: 'upsih', 982: 'piv', 8226: 'bull',
            8230: 'hellip', 8242: 'prime', 8243: 'Prime', 8254: 'oline', 8260: 'frasl',
            8472: 'weierp', 8465: 'image', 8476: 'real', 8482: 'trade', 8501: 'alefsym',
            8592: 'larr', 8593: 'uarr', 8594: 'rarr', 8595: 'darr', 8596: 'harr',
            8629: 'crarr', 8656: 'lArr', 8657: 'uArr', 8658: 'rArr', 8659: 'dArr',
            8660: 'hArr', 8704: 'forall', 8706: 'part', 8707: 'exist', 8709: 'empty',
            8711: 'nabla', 8712: 'isin', 8713: 'notin', 8715: 'ni', 8719: 'prod',
            8721: 'sum', 8722: 'minus', 8727: 'lowast', 8730: 'radic', 8733: 'prop',
            8734: 'infin', 8736: 'ang', 8743: 'and', 8744: 'or', 8745: 'cap',
            8746: 'cup', 8747: 'int', 8756: 'there4', 8764: 'sim', 8773: 'cong',
            8776: 'asymp', 8800: 'ne', 8801: 'equiv', 8804: 'le', 8805: 'ge',
            8834: 'sub', 8835: 'sup', 8836: 'nsub', 8838: 'sube', 8839: 'supe',
            8853: 'oplus', 8855: 'otimes', 8869: 'perp', 8901: 'sdot', 8968: 'lceil',
            8969: 'rceil', 8970: 'lfloor', 8971: 'rfloor', 9001: 'lang', 9002: 'rang',
            9674: 'loz', 9824: 'spades', 9827: 'clubs', 9829: 'hearts', 9830: 'diams',
            338: 'OElig', 339: 'oelig', 352: 'Scaron', 353: 'scaron', 376: 'Yuml',
            710: 'circ', 732: 'tilde', 8194: 'ensp', 8195: 'emsp', 8201: 'thinsp',
            8204: 'zwnj', 8205: 'zwj', 8206: 'lrm', 8207: 'rlm', 8211: 'ndash',
            8212: 'mdash', 8216: 'lsquo', 8217: 'rsquo', 8218: 'sbquo', 8220: 'ldquo',
            8221: 'rdquo', 8222: 'bdquo', 8224: 'dagger', 8225: 'Dagger', 8240: 'permil',
            8249: 'lsaquo', 8250: 'rsaquo', 8364: 'euro'
        };

var Dom = {
    block: block,
    inline: inline,

    findNodeIndex: function(node, skipText) {
        var i = 0;

        if (!node) {
            return -1;
        }

        while (true) {
            node = node.previousSibling;

            if (!node) {
                break;
            }

            if (!(skipText && node.nodeType == 3)) {
                i++;
            }
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
                value = node[kendo.support.cssFloat ? CSSFLOAT : STYLEFLOAT];
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
    nonListBlockElements: nonListBlockElements,
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

    encode: function (value, options) {
        var encodableChars = (!options || options.entities) ? entityRe : htmlRe;
        return value.replace(encodableChars, function(c) {
            var charCode = c.charCodeAt(0);
            var entity = entityTable[charCode];
            return entity ? '&'+entity+';' : c;
        });
    },

    stripBom: function(text) {
        return (text || "").replace(bom, "");
    },

    insignificant: function(node) {
        var attr = node.attributes;

        return node.className == "k-marker" || (Dom.is(node, 'br') && (node.className == "k-br" || attr._moz_dirty || attr._moz_editor_bogus_node));
    },

    emptyNode: function(node) {
        var significantNodes = $.grep(node.childNodes, function(child) {
            if (Dom.is(child, 'br')) {
                return false;
            } else if (Dom.insignificant(child)) {
                return false;
            } else if (child.nodeType == 3 && whitespaceOrBom.test(child.nodeValue)) {
                return false;
            } else if (Dom.is(child, 'p') && Dom.emptyNode(child)) {
                return false;
            }

            return true;
        });

        return !significantNodes.length;
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

    scrollContainer: function(doc) {
        var wnd = Dom.windowFromDocument(doc),
            scrollContainer = (wnd.contentWindow || wnd).document || wnd.ownerDocument || wnd;

        if (kendo.support.browser.webkit || scrollContainer.compatMode == 'BackCompat') {
            scrollContainer = scrollContainer.body;
        } else {
            scrollContainer = scrollContainer.documentElement;
        }

        return scrollContainer;
    },

    scrollTo: function (node) {
        var element = $(Dom.isDataNode(node) ? node.parentNode : node),
            wnd = Dom.windowFromDocument(node.ownerDocument),
            windowHeight = wnd.innerHeight,
            elementTop, elementHeight,
            scrollContainer = Dom.scrollContainer(node.ownerDocument);

        if (Dom.name(element[0]) == "br") {
            element = element.parent();
        }

        elementTop = element.offset().top;
        elementHeight = element[0].offsetHeight;

        if (elementHeight + elementTop > scrollContainer.scrollTop + windowHeight) {
            scrollContainer.scrollTop = elementHeight + elementTop - windowHeight;
        }
    },

    persistScrollTop: function(doc) {
        persistedScrollTop = Dom.scrollContainer(doc).scrollTop;
    },

    restoreScrollTop: function(doc) {
        Dom.scrollContainer(doc).scrollTop = persistedScrollTop;
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

    removeTextSiblings: function(node) {
        var parentNode = node.parentNode;

        while (node.nextSibling && node.nextSibling.nodeType == 3) {
            parentNode.removeChild(node.nextSibling);
        }

        while (node.previousSibling && node.previousSibling.nodeType == 3) {
            parentNode.removeChild(node.previousSibling);
        }
    },

    trim: function (parent) {
        for (var i = parent.childNodes.length - 1; i >= 0; i--) {
            var node = parent.childNodes[i];
            if (Dom.isDataNode(node)) {
                if (!Dom.stripBom(node.nodeValue).length) {
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

    closest: function(node, tag) {
        while (node && Dom.name(node) != tag) {
            node = node.parentNode;
        }

        return node;
    },

    sibling: function(node, direction) {
        do {
            node = node[direction];
        } while (node && node.nodeType != 1);

        return node;
    },

    next: function(node) {
        return Dom.sibling(node, "nextSibling");
    },

    prev: function(node) {
        return Dom.sibling(node, "previousSibling");
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

    changeTag: function (referenceElement, tagName, skipAttributes) {
        var newElement = Dom.create(referenceElement.ownerDocument, tagName),
            attributes = referenceElement.attributes,
            i, len, name, value, attribute;

        if (!skipAttributes) {
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
        }

        while (referenceElement.firstChild) {
            newElement.appendChild(referenceElement.firstChild);
        }

        Dom.insertBefore(newElement, referenceElement);
        Dom.remove(referenceElement);
        return newElement;
    },

    editableParent: function(node) {
        while (node && (node.nodeType == 3 || node.contentEditable !== 'true')) {
            node = node.parentNode;
        }

        return node;
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
            } else if (attr == "className") {
                element[attr] = attributes[attr];
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
                key = kendo.support.cssFloat ? CSSFLOAT : STYLEFLOAT;
            }

            node.style[key] = "";
        }

        if (node.style.cssText === "") {
            node.removeAttribute(STYLE);
        }
    },

    inlineStyle: function(body, name, attributes) {
        var span = $(Dom.create(body.ownerDocument, name, attributes)),
            style;

        body.appendChild(span[0]);

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

    getEffectiveBackground: function(element) {
        var backgroundStyle = element.css("background-color");

        if (backgroundStyle.indexOf("rgba(0, 0, 0, 0") < 0 && backgroundStyle !== "transparent") {
            return backgroundStyle;
        } else if (element[0].tagName.toLowerCase() === "html") {
            return "Window";
        } else {
            return Dom.getEffectiveBackground(element.parent());
        }
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
    },

    closestSplittableParent: function(nodes) {
        var result;

        if (nodes.length == 1) {
            result = Dom.parentOfType(nodes[0], ["ul","ol"]);
        } else {
            result = Dom.commonAncestor.apply(null, nodes);
        }

        if (!result) {
            result = Dom.parentOfType(nodes[0], ["p", "td"]) || nodes[0].ownerDocument.body;
        }

        if (Dom.isInline(result)) {
            result = Dom.blockParentOrBody(result);
        }

        var editableParents = map(nodes, Dom.editableParent);
        var editableAncestor = Dom.commonAncestor(editableParents)[0];

        if ($.contains(result, editableAncestor)) {
            result = editableAncestor;
        }

        return result;
    },

    closestEditable: function(node, types) {
        var closest = Dom.parentOfType(node, types);
        var editable = Dom.editableParent(node);

        if (closest && editable && $.contains(closest, editable)) {
            closest = editable;
        } else if (!closest && editable) {
            closest = editable;
        }

        return closest;
    },

    closestEditableOfType: function(node, types) {
        var editable = Dom.closestEditable(node, types);

        if (editable && Dom.ofType(editable, types)) {
            return editable;
        }
    },

    filter: function(tagName, nodes, invert) {
        var i = 0;
        var len = nodes.length;
        var result = [];
        var name;

        for (; i < len; i++) {
            name = Dom.name(nodes[i]);
            if ((!invert && name == tagName) || (invert && name != tagName)) {
                result.push(nodes[i]);
            }
        }

        return result;
    },

    ensureTrailingBreaks: function(node) {
        var elements = $(node).find("p,td,th");
        var length = elements.length;
        var i = 0;

        if (length) {
            for (; i < length; i++) {
                Dom.ensureTrailingBreak(elements[i]);
            }
        } else {
            Dom.ensureTrailingBreak(node);
        }
    },

    ensureTrailingBreak: function(node) {
        var lastChild = node.lastChild;
        var name = lastChild && Dom.name(lastChild);
        var br;

        if (!name ||
            (name != "br" && name != "img") ||
            (name == "br" && lastChild.className != "k-br")) {
            br = node.ownerDocument.createElement("br");
            br.className = "k-br";
            node.appendChild(br);
        }
    }
};

kendo.ui.editor.Dom = Dom;

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });


