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

    var Element = function(tag, attr, children) {
        this.tag = tag;

        this.attr = attr || {};

        this.children = children || [];
    };

    Element.prototype = new Node();

    Element.prototype.render = function(parent, cached) {
        var node;

        var index;

        if (!cached || cached.tag !== this.tag) {
            if (cached) {
                cached.remove();
            }

            node = document.createElement(this.tag);

            for (index = 0; index < this.children.length; index++) {
                this.children[index].render(node);
            }

            parent.appendChild(node);
        } else {
            node = cached.node;

            var length = Math.max(this.children.length, cached.children.length);

            for (index = 0; index < length; index++) {
                var child = this.children[index];
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
        this.tag = "#text";
    };

    TextNode.prototype = new Node();
    TextNode.prototype.render = function(parent, cached) {
        var node;

        if (!cached || cached.tag !== this.tag) {
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

    function element(tag, attrs, children) {
        return new Element(tag, attrs, children);
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
