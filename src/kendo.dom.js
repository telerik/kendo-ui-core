(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = {
    id: "dom",
    name: "Virtual DOM",
    category: "framework",
    depends: [ "core" ],
    advanced: true
};

(function(kendo) {
    function Node() {
        this.node = null;
    }

    Node.prototype = {
        remove: function() {
            this.node.parentNode.removeChild(this.node);
        }
    };

    function Element(nodeName, attr, children) {
        this.nodeName = nodeName;

        this.attr = attr || {};

        this.cssText = null;

        this.children = children || [];
    }

    Element.prototype = new Node();

    Element.prototype.render = function(parent, cached) {
        var node;

        var index;

        var children = this.children;

        var length = children.length;

        if (!cached || cached.nodeName !== this.nodeName) {
            if (cached) {
                cached.remove();
                cached = null;
            }

            node = document.createElement(this.nodeName);

            for (index = 0; index < length; index++) {
                children[index].render(node, null);
            }

            parent.appendChild(node);
        } else {
            node = cached.node;

            var cachedChildren = cached.children;

            if (Math.abs(cachedChildren.length - length) > 2) {
                this.render({
                    appendChild: function(node) {
                        parent.replaceChild(node, cached.node);
                    }
                }, null);

                return;
            }

            for (index = 0; index < length; index++) {
                children[index].render(node, cachedChildren[index]);
            }

            for (index = length, length = cachedChildren.length; index < length; index++) {
                cachedChildren[index].remove();
            }
        }

        var attr = this.attr;
        var attrName;

        for (attrName in attr) {
            if (!cached || attr[attrName] !== cached.attr[attrName]) {
                if (node[attrName] !== undefined) {
                    if (attrName !== "style") {
                        node[attrName] = attr[attrName];
                    } else {
                        var cssText = "";

                        var style = attr[attrName];

                        for (var key in style) {
                            cssText += key;
                            cssText += ":";
                            cssText += style[key];
                            cssText += ";";
                        }

                        if (!cached || cached.cssText !== cssText) {
                            node.style.cssText = cssText;
                        }

                        this.cssText = cssText;
                    }
                } else {
                    node.setAttribute(attrName, attr[attrName]);
                }
            }
        }

        if (cached) {
            for (attrName in cached.attr) {
                if (attr[attrName] === undefined) {
                    if (node[attrName] !== undefined) {
                        if (attrName === "style") {
                            node.style.cssText = "";
                        } else if (attrName === "className") {
                            node[attrName] = "";
                        } else {
                            node.removeAttribute(attrName);
                        }
                    } else {
                        node.removeAttribute(attrName);
                    }
                }
            }
        }

        this.node = node;
    };

    function TextNode(nodeValue) {
        this.nodeValue = nodeValue;
    }

    TextNode.prototype = new Node();

    TextNode.prototype.nodeName = "#text";

    TextNode.prototype.render = function(parent, cached) {
        var node;

        if (!cached || cached.nodeName !== this.nodeName) {
            if (cached) {
                cached.remove();
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

    function HtmlNode(html) {
        this.html = html;
    }

    HtmlNode.prototype = {
       nodeName: "#html",
       remove: function() {
           for (var index = 0; index < this.nodes.length; index++) {
               this.nodes[index].parentNode.removeChild(this.nodes[index]);
           }
       },
       render: function(parent, cached) {
           if (!cached || cached.nodeName !== this.nodeName || cached.html !== this.html) {
               if (cached) {
                   cached.remove();
               }

               var lastChild = parent.lastChild;

               parent.insertAdjacentHTML("beforeend", this.html);

               this.nodes = [];

               for (var child = lastChild ? lastChild.nextSibling : parent.firstChild; child; child = child.nextSibling) {
                   this.nodes.push(child);
               }
           } else {
               this.nodes = cached.nodes.slice(0);
           }
       }
    };

    function html(value) {
        return new HtmlNode(value);
    }

    function element(nodeName, attrs, children) {
        return new Element(nodeName, attrs, children);
    }

    function text(value) {
        return new TextNode(value);
    }

    function Tree(root) {
       this.root = root;
       this.children = [];
    }

    Tree.prototype = {
        html: html,
        element: element,
        text: text,
        render: function(children) {
            var cachedChildren = this.children;

            var index;

            var length;

            for (index = 0, length = children.length; index < length; index++) {
               children[index].render(this.root, cachedChildren[index]);
            }

            for (index = length; index < cachedChildren.length; index++) {
                cachedChildren[index].remove();
            }

            this.children = children;
        }
    };

    kendo.dom = {
        html: html,
        text: text,
        element: element,
        Tree: Tree
    };
})(window.kendo);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
