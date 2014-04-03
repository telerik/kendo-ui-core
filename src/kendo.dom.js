(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = {
    id: "dom",
    name: "Virtual DOM",
    category: "framework",
    depends: [ "core" ],
    hidden: true
};

(function(kendo) {
    var Node = function() {
        this.node = null;
    };

    Node.prototype = {
        remove: function() {
            this.node.parentNode.removeChild(this.node);
        }
    };

    var Element = function(nodeName, attr, children) {
        this.nodeName = nodeName;

        this.attr = attr || {};

        this.children = children || [];
    };

    Element.prototype = new Node();

    Element.prototype.render = function(parent, cached) {
        var node;

        var index;

        var children = this.children;

        var length = children.length;

        if (!cached || cached.nodeName !== this.nodeName) {
            if (cached) {
                cached.remove();
            }

            node = document.createElement(this.nodeName);

            for (index = 0; index < length; index++) {
                children[index].render(node, null);
            }

            parent.appendChild(node);
        } else {
            node = cached.node;

            if (cached.children.length > length) {
                length = cached.children.length;
            }

            for (index = 0; index < length; index++) {
                var child = children[index];

                if (child) {
                    child.render(node, cached.children[index]);
                } else {
                    cached.children[index].remove();
                }
            }
        }

        var attr = this.attr;

        for (var attrName in attr) {
            if (!cached || attr[attrName] !== cached.attr[attrName]) {
                if (node[attrName] !== undefined) {
                    node[attrName] = attr[attrName];
                } else {
                    node.setAttribute(attrName, attr[attrName]);
                }
            }
        }

        this.node = node;
    };

    var TextNode = function(nodeValue) {
        this.nodeValue = nodeValue;
    };

    TextNode.prototype = new Node();
    TextNode.prototype.nodeName = "#text";
    TextNode.prototype.render = function(parent, cached) {
        var node;

        if (!cached || cached.nodeName !== this.nodeName) {
            if (cached) {
                cached.node.parentNode.removeChild(cached.node);
            }
            node = document.createTextNode(this.nodeValue);

            parent.appendChild(node);
        } else {
            node = cached.node;

            if (this.nodeValue !== cached.nodeValue) {
                node.nodeValue = this.nodeValue;
            }
        }

        this.node = node;
    };

    var cache = {};
    var roots = [];

    function element(nodeName, attrs, children) {
        return new Element(nodeName, attrs, children);
    }

    function text(value) {
        return new TextNode(value);
    }

    function render(root, node) {
        var id = roots.indexOf(root);

        if (id < 0) {
            id = roots.push(root) - 1;
        }

        node.render(root, cache[id]);

        cache[id] = node;
    }

    function remove(root) {
        var id = roots.indexOf(root);

        roots.splice(id, 1);

        delete(cache[id]);
    }

    kendo.dom = {
        element: element,
        text: text,
        render: render
    };
})(window.kendo);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
