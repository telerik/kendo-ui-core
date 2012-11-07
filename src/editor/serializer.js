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

                if (!tagName || ((node.attributes._moz_dirty || node.attributes._moz_editor_bogus_node) && dom.is(node, 'br')) || node.className == "k-marker") {
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
