(function(window) {
    var Node = function() {
        this.node = null;
    };

    Node.prototype = {
        remove: function() {
            this.node.parentNode.removeChild(this.node);
        }
    }

    var Element = function(tag, attr, children) {
        this.tag = tag;

        this.attr = attr || {};

        this.children = children || [];
    };

    Element.prototype = new Node;

    Element.prototype.render = function(parent, cached) {
        var node;

        if (!cached || cached.tag !== this.tag) {
            if (cached) {
                cached.remove();
            }

            node = document.createElement(this.tag);

            for (var i = 0; i < this.children.length; i++) {
                this.children[i].render(node);
            }

            parent.appendChild(node);
        } else {
            node = cached.node;

            var length = Math.max(this.children.length, cached.children.length);

            for (var i = 0; i < length; i++) {
                var child = this.children[i];
                if (child) {
                    child.render(node, cached.children[i]);
                } else {
                    cached.children[i].remove();
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
    }

    var TextNode = function(nodeValue) {
        this.nodeValue = nodeValue;
        this.tag = "#text";
    };

    TextNode.prototype = new Node;
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
    }

    var cache = {};
    var roots = [];

    var DOM = function(tag, attrs, children) {
        if (typeof children === "string") {
            children = [new TextNode(children)];
        }

        return new Element(tag, attrs, children);
    }

    DOM.render = function(root, node) {
        var id = roots.indexOf(root);

        if (id < 0) {
            id = roots.push(root) - 1;
        }

        node.render(root, cache[id]);

        cache[id] = node;
    }

    var root;

    module("virtual dom", {
       setup: function() {
          root = $("<div>")[0];
       }
    });

    test("render appends element to root", function() {
        var div = DOM("div");

        DOM.render(root, div);

        equal(root.children.length, 1);
    });

    test("render appends element with specified tag name", function() {
        DOM.render(root, DOM("div"));

        equal(root.children[0].tagName, "DIV");
    });

    test("render creates text node", function() {
        DOM.render(root, DOM("div", null, "foo"));

        equal(root.children[0].firstChild.nodeName, "#text");
    });

    test("render creates text node with specified text", function() {
        DOM.render(root, DOM("div", null, "foo"));

        equal(root.children[0].firstChild.nodeValue, "foo");
    });

    test("render children", function() {
        var div = DOM("div", null, [ DOM("div"), DOM("div") ]);

        DOM.render(root, div);
        equal(root.children[0].children.length, 2);
    });

    test("render attributes", function() {
        var div = DOM("div", {id:"foo"});

        DOM.render(root, div);

        equal(root.children[0].id, "foo");
    });

    test("render doesn't replace existing element if no changes present", function() {
        DOM.render(root, DOM("div"));
        var firstChild = root.children[0];
        DOM.render(root, DOM("div"));

        equal(root.children.length, 1);

        strictEqual(firstChild, root.children[0]);
    });

    test("render changes tag name", function() {
        DOM.render(root, DOM("div"));
        DOM.render(root, DOM("span"));

        equal(root.children.length, 1);

        equal(root.children[0].tagName, "SPAN");
    });

    test("render changes attribute of existing element", function() {
        DOM.render(root, DOM("div", {id: "foo"}));

        var firstChild = root.children[0];

        DOM.render(root, DOM("div", {id: "bar"}));

        equal(root.children.length, 1);

        strictEqual(firstChild, root.children[0]);

        equal(firstChild.id, "bar");
    });

    test("render doesn't change attribute with same value", 0, function() {
        var div = DOM("div", { "foo": "foo" });
        DOM.render(root, div);

        div.node.setAttribute = function() {
            ok(false);
        };

        DOM.render(root, DOM("div", { "foo": "foo" }));
    });

    test("render inserts new children", function() {
        var div = DOM("div");

        DOM.render(root, div);

        var firstChild = root.children[0];

        DOM.render(root, DOM("div", null, [ DOM("div") ]));

        equal(root.children.length, 1);

        strictEqual(firstChild, root.children[0]);

        equal(firstChild.children.length, 1);
    });

    test("render updates existing text node", function() {
        DOM.render(root, DOM("div", null, "foo"));

        var textNode = root.children[0].firstChild;

        DOM.render(root, DOM("div", null, "bar"));

        equal(root.children[0].childNodes.length, 1);

        strictEqual(textNode, root.children[0].firstChild);

        equal(textNode.nodeValue, "bar");
    });

    test("render replaces text node with element", function() {
        DOM.render(root, DOM("div", null, "foo"));

        DOM.render(root, DOM("div", null, [DOM("div")]));

        equal(root.children[0].childNodes.length, 1);

        equal(root.children[0].firstChild.tagName, "DIV");
    });

    test("render replaces element with text node", function() {
        DOM.render(root, DOM("div", null, [DOM("div")]));

        DOM.render(root, DOM("div", null, "foo"));

        equal(root.children[0].childNodes.length, 1);

        equal(root.children[0].firstChild.nodeValue, "foo");
    });

    test("render doesn't change text node with same value", 0, function() {
        var div = DOM("div", null, "foo");

        DOM.render(root, div);

        Object.defineProperty(div.children[0].node, "nodeValue", {
            set: function() {
                ok(false);
            }
        });

        DOM.render(root, DOM("div", null, "foo"));
    });

    test("render removes existing nodes", function() {
        DOM.render(root, DOM("div", null, [DOM("div"), DOM("div")]));

        DOM.render(root, DOM("div", null, [DOM("div")]));

        equal(root.children[0].childNodes.length, 1);
    });
}());
