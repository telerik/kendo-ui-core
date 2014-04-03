(function(window) {
    var root;
    var element = kendo.dom.element;
    var text = kendo.dom.text;
    var render = kendo.dom.render;

    module("virtual dom", {
       setup: function() {
          root = $("<div>")[0];
       }
    });

    test("render appends element to root", function() {
        var div = element("div", null, [element("div")]);

        render(root, div);

        equal(root.children.length, 1);
        equal(root.children[0].children.length, 0);
    });

    test("render creates text node", function() {
        render(root, element("div", null, [text("foo")]));

        equal(root.firstChild.nodeName, "#text");
    });

    test("render creates text node with specified text", function() {
        render(root, element("div", null, [text("foo")]));

        equal(root.firstChild.nodeValue, "foo");
    });

    test("renders children", function() {
        var div = element("div", null, [ element("div"), element("div") ]);

        render(root, div);
        equal(root.children.length, 2);
    });

    test("render attributes", function() {
        var div = element("div", {id:"foo"});

        render(root, div);

        equal(root.id, "foo");
    });

    test("render doesn't replace existing element if no changes present", function() {
        render(root, element("div", null, [ element("div") ]));
        var firstChild = root.children[0];
        render(root, element("div", null, [ element("div") ]));

        equal(root.children.length, 1);

        strictEqual(firstChild, root.children[0]);
    });

    test("render changes tag name", function() {
        render(root, element("div", null, [ element("div") ]));
        render(root, element("div", null, [ element("span") ]));

        equal(root.children.length, 1);

        equal(root.children[0].tagName, "SPAN");
    });

    test("render changes attribute of existing element", function() {
        render(root, element("div", null,  [ element("div", {id: "foo"}) ]));

        var firstChild = root.children[0];

        render(root, element("div", null,  [ element("div", {id: "bar"}) ]));

        equal(root.children.length, 1);

        strictEqual(firstChild, root.children[0]);

        equal(firstChild.id, "bar");
    });

    test("render doesn't change attribute with same value", 0, function() {
        var div = element("div", { "foo": "foo" });
        render(root, div);

        div.node.setAttribute = function() {
            ok(false);
        };

        render(root, element("div", { "foo": "foo" }));
    });

    test("render inserts new children", function() {
        render(root, element("div"));

        render(root, element("div", null, [ element("div") ]));

        equal(root.children.length, 1);
    });

    test("render updates existing text node", function() {
        render(root, element("div", null, [text("foo")]));

        var textNode = root.firstChild;

        render(root, element("div", null, [text("bar")]));

        equal(root.childNodes.length, 1);

        strictEqual(textNode, root.firstChild);

        equal(textNode.nodeValue, "bar");
    });

    test("render replaces text node with element", function() {
        render(root, element("div", null, [text("foo")]));

        render(root, element("div", null, [element("div")]));

        equal(root.childNodes.length, 1);

        equal(root.firstChild.tagName, "DIV");
    });

    test("render replaces element with text node", function() {
        render(root, element("div", null, [element("div")]));

        render(root, element("div", null, [text("foo")]));

        equal(root.childNodes.length, 1);

        equal(root.firstChild.nodeValue, "foo");
    });

    test("render doesn't change text node with same value", 0, function() {
        var div = element("div", null, [text("foo")]);

        render(root, div);

        Object.defineProperty(div.children[0].node, "nodeValue", {
            set: function() {
                ok(false);
            }
        });

        render(root, element("div", null, [text("foo")]));
    });

    test("render removes existing nodes", function() {
        render(root, element("div", null, [element("div"), element("div")]));

        render(root, element("div", null, [element("div")]));

        equal(root.childNodes.length, 1);
    });

    test("render removes attributes set via dirrect assignment", function() {
        render(root, element("div", { id: "foo" }));

        render(root, element("div", null));

        equal(root.id, "");
    });

    test("render removes attributes set via setAttribute", function() {
        render(root, element("div", { foo: "foo" }));

        render(root, element("div", null));

        equal(root.getAttribute("foo"), null);
    });

    test("render adds style attributes", function() {
        render(root, element("div", { style: { width: "100px" } }));

        equal(root.style.width,"100px");
    });

    test("render does not set style if same", 0, function() {
        var div = element("div", { style: { width: "100px" } });

        render(root, div);

        var cssText = div.node.style.cssText;

        Object.defineProperty(div.node.style, "cssText", {
            set: function() {
                ok(false);
            },
            get: function() {
               return cssText;
            }
        });

        render(root, element("div", { style: { width: "100px" } }));
    });

    test("render removes style attribute", function() {
        render(root, element("div", { style: { width: "100px" } }));
        render(root, element("div", null));

        equal(root.style.cssText, "");
    });
}());
