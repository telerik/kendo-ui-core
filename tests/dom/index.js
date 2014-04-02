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

        if (this.attr) {
            for (var attrName in this.attr) {
                if (attrName in element) {
                    element[attrName] = this.attr[attrName];
                } else {
                    element.setAttribute(attrName, this.attr[attrName]);
                }
            }
        }

        if (this.children) {
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].render(element);
            }
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

    var DOM = function(tag, attrs, children) {
        if (typeof children === "string") {
            children = [new TextNode(children)];
        }

        return new Element(tag, attrs, children);
    }

    DOM.render = function(root, node) {
        node.render(root);
    }

    test("render appends element to parent", function() {
        var div = DOM("div");
        var parent = $("<div>");

        DOM.render(parent[0], div);

        equal(parent[0].children.length, 1);
    });

    test("render appends element with specified tag name", function() {
        var parent = $("<div>");

        DOM.render(parent[0], DOM("div"));

        equal(parent[0].children[0].tagName, "DIV");
    });

    test("render creates text node", function() {
        var parent = $("<div>");

        DOM.render(parent[0], DOM("div", null, "foo"));

        equal(parent[0].children[0].firstChild.nodeName, "#text");
    });

    test("render creates text node with specified text", function() {
        var parent = $("<div>");

        DOM.render(parent[0], DOM("div", null, "foo"));

        equal(parent[0].children[0].firstChild.nodeValue, "foo");
    });

    test("render children", function() {
        var parent = $("<div>");
        var div = DOM("div", null, [ DOM("div"), DOM("div") ]);

        DOM.render(parent[0], div);
        equal(parent[0].children[0].children.length, 2);
    });

    test("render attributes", function() {
        var parent = $("<div>");
        var div = DOM("div", {id:"foo"});

        DOM.render(parent[0], div);

        equal(parent[0].children[0].id, "foo");
    });
}());
