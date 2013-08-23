(function($, undefined) {

// Imports ================================================================
var kendo = window.kendo;
var Editor = kendo.ui.editor;
var dom = Editor.Dom;
var extend = $.extend;

var fontSizeMappings = 'xx-small,x-small,small,medium,large,x-large,xx-large'.split(',');
var quoteRe = /"/g;
var brRe = /<br[^>]*>/i;
var emptyPRe = /<p><\/p>/i;
var cssDeclaration = /([\w|\-]+)\s*:\s*([^;]+);?/i;
var sizzleAttr = /^sizzle-\d+/i;

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
                end: function () {
                    result.push('</span>');
                }
            }
        };

        function styleAttr(cssText) {
            // In IE < 8 the style attribute does not return proper nodeValue
            var trim = $.trim;
            var css = trim(cssText).split(';');
            var i, length = css.length;
            var match;
            var property, value;

            for (i = 0, length = css.length; i < length; i++) {
                if (!css[i].length) {
                    continue;
                }

                match = cssDeclaration.exec(css[i]);

                // IE8 does not provide a value for 'inherit'
                if (!match) {
                    continue;
                }

                property = trim(match[1].toLowerCase());
                value = trim(match[2]);

                if (property == "font-size-adjust" || property == "font-stretch") {
                    continue;
                }

                if (property.indexOf('color') >= 0) {
                    value = dom.toHex(value);
                } else if (property.indexOf('font') >= 0) {
                    value = value.replace(quoteRe, "'");
                } else if (/\burl\(/g.test(value)) {
                    value = value.replace(quoteRe, "");
                }

                result.push(property);
                result.push(':');
                result.push(value);
                result.push(';');
            }
        }

        function attr(node) {
            var specifiedAttributes = [];
            var attributes = node.attributes;
            var attribute, i, l;
            var name, value, specified;

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

                name = attribute.nodeName;
                value = attribute.nodeValue;
                specified = attribute.specified;

                // In IE < 8 the 'value' attribute is not returned as 'specified'. The same goes for type="text"
                if (name == 'value' && 'value' in node && node.value) {
                    specified = true;
                } else if (name == 'type' && value == 'text') {
                    specified = true;
                } else if (name == "class" && !value) {
                    specified = false;
                } else if (sizzleAttr.test(name)) {
                    specified = false;
                } else if (name == 'complete') {
                    specified = false;
                } else if (name == 'altHtml') {
                    specified = false;
                } else if (name.indexOf('_moz') >= 0) {
                    specified = false;
                }

                if (specified) {
                    specifiedAttributes.push(attribute);
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
                name = attribute.nodeName;
                value = attribute.nodeValue;

                if (name.toLowerCase() == "contenteditable" && (dom.is(node, "table") || dom.is(node, "td"))) {
                    continue;
                }

                if (name == "class" && value == "k-table") {
                    continue;
                }

                result.push(' ');
                result.push(name);
                result.push('="');

                if (name == 'style') {
                    styleAttr(value || node.style.cssText);
                } else if (name == 'src' || name == 'href') {
                    result.push(node.getAttribute(name, 2));
                } else {
                    result.push(dom.fillAttrs[name] ? name : value);
                }

                result.push('"');
            }
        }

        function children(node, skip) {
            for (var childNode = node.firstChild; childNode; childNode = childNode.nextSibling) {
                child(childNode, skip);
            }
        }

        function text(node) {
            return node.nodeValue.replace(/\ufeff/g, "");
        }

        function child(node, skip) {
            var nodeType = node.nodeType,
                tagName, mapper,
                parent, value, previous;

            if (nodeType == 1) {
                tagName = dom.name(node);

                if (!tagName || ((node.attributes._moz_dirty || node.attributes._moz_editor_bogus_node) && dom.is(node, 'br')) || node.className == "k-marker") {
                    return;
                }

                if (dom.isInline(node) && node.childNodes.length == 1 && node.firstChild.nodeType == 3&&  !text(node.firstChild)) {
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
                value = text(node);

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

        if (root.childNodes.length == 1 && root.firstChild.nodeType == 3) {
            return dom.encode(text(root.firstChild).replace(/[\r\n\v\f\t ]+/, ' '));
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

})(window.kendo.jQuery);
