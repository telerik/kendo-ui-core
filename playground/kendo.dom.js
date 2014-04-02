(function(window) {
    var type = {}.toString

    var Node = function() {
    };

    var Element = function(tag, attr, children) {
        this.tag = tag;
        this.attr = attr;
        this.children = children;
    };

    Element.prototype = new Node;

    Element.prototype.render = function(parent) {
        var element = document.createElement(this.tag);

        for (var i = 0; i < this.children.length; i++) {
            this.children[i].render(element);
        }

        parent.appendChild(element);
    }

    var TextNode = function(nodeValue) {
        this.nodeValue = nodeValue;
    };

    TextNode.prototype = new Node;
    TextNode.prototype.render = function(parent) {
        parent.appendChild(document.createTextNode(this.nodeValue));
    }

    kendo.DOM = function(tag, attrs, children) {
        if (typeof children === "string") {
            children = [new TextNode(children)];
        }

        return new Element(tag, attrs, children);
    }

    kendo.DOM.render = function(root, node) {
        node.render(root);
    }

    kendo.dom = function(tag, attrs, children) {
        var hasAttrs = attrs !== undefined && attrs.constructor === Object;

        return {
            tag: tag,
            attrs: hasAttrs ? attrs : {},
            children: hasAttrs ? children : attrs
        };
    }

    kendo.dom.render = function(root, cell) {
        var index = nodeCache.indexOf(root)
        var id = index < 0 ? nodeCache.push(root) - 1 : index
        var node = root;
        cellCache[id] = build(node, cell, cellCache[id])
    }

    function build(parent, data, cached) {
        if (data === null || data === undefined) {
            return;
        }

        var cachedType = type.call(cached);

        var dataType = type.call(data);

        if (cachedType != dataType) {
            if (cached !== null && cached !== undefined) {
                clear(cached.nodes);
            }

            cached = new data.constructor;

            cached.nodes = [];
        }

        if (dataType == "[object Array]") {
            var nodes = [];

            var intact = cached.length === data.length;

            for (var i = 0; i < data.length; i++) {
                var item = build(parent, data[i], cached[i]);

                if (!item.nodes.intact) {
                    intact = false;
                }

                cached[i] = item;
            }

            if (!intact) {
                for (var i = 0; i < data.length; i++)  {
                    nodes = nodes.concat(cached[i].nodes);
                }

                for (var i = nodes.length, node; node = cached.nodes[i]; i++)  {
                    if (node.parentNode !== null) {
                        node.parentNode.removeChild(node);
                    }
                }

                for (var i = cached.nodes.length, node; node = nodes[i]; i++) {
                    if (node.parentNode === null) {
                        parent.appendChild(node);
                    }
                }

                cached.length = data.length;
                cached.nodes = nodes;
            }
        } else if (dataType == "[object Object]") {

            if (data.tag != cached.tag) {
                clear(cached.nodes);
            }

            var node;

            var isNew = cached.nodes.length === 0;

            if (isNew) {
                node = document.createElement(data.tag);
                cached = {
                    tag: data.tag,
                    attrs: setAttributes(node, data.attrs, {}),
                    children: build(node, data.children, cached.children),
                    nodes: [node]
                };
                parent.appendChild(node)
            } else {
                node = cached.nodes[0];
                setAttributes(node, data.attrs, cached.attrs);
                cached.children = build(node, data.children, cached.children);
                cached.nodes.intact = true;
            }

        } else {
            var node;

            if (cached.nodes.length === 0) {
                node = document.createTextNode(data)
                parent.appendChild(node)
                cached = "string number boolean".indexOf(typeof data) > -1 ? new data.constructor(data) : data
                cached.nodes = [node];
            } else if (cached !== data) {
                node = cached.nodes[0];
                node.nodeValue = data;
                cached = new data.constructor(data);
                cached.nodes = [node];
            } else  {
                cached.nodes.intact = true;
            }
        }

        return cached;
    }

    function setAttributes(node, dataAttrs, cachedAttrs) {
        for (var attrName in dataAttrs) {
            var dataAttr = dataAttrs[attrName];
            if (!(attrName in cachedAttrs) || cachedAttrs[attrName] !== dataAttr) {
                cachedAttrs[attrName] = dataAttr;

                if (attrName == "style") {
                    for (var rule in dataAttr) {
                        node.style[rule] = dataAttr[rule];
                    }
                } else if (attrName in node) {
                    node[attrName] = dataAttr;
                } else {
                    node.setAttribute(attrName, dataAttr);
                }
            }
        }

        return cachedAttrs;
    }

    function clear(nodes) {
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].parentNode.removeChild(nodes[i]);
        }

        nodes.length = 0;
    }

    var nodeCache = [], cellCache = {};

    window.nodeCache = nodeCache;

    window.cellCache = cellCache;

}(this));
