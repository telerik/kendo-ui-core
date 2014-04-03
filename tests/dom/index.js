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
        var div = element("div");

        render(root, div);

        equal(root.children.length, 1);
    });

    test("render appends element with specified tag name", function() {
        render(root, element("div"));

        equal(root.children[0].tagName, "DIV");
    });

    test("render creates text node", function() {
        render(root, element("div", null, [text("foo")]));

        equal(root.children[0].firstChild.nodeName, "#text");
    });

    test("render creates text node with specified text", function() {
        render(root, element("div", null, [text("foo")]));

        equal(root.children[0].firstChild.nodeValue, "foo");
    });

    test("render children", function() {
        var div = element("div", null, [ element("div"), element("div") ]);

        render(root, div);
        equal(root.children[0].children.length, 2);
    });

    test("render attributes", function() {
        var div = element("div", {id:"foo"});

        render(root, div);

        equal(root.children[0].id, "foo");
    });

    test("render doesn't replace existing element if no changes present", function() {
        render(root, element("div"));
        var firstChild = root.children[0];
        render(root, element("div"));

        equal(root.children.length, 1);

        strictEqual(firstChild, root.children[0]);
    });

    test("render changes tag name", function() {
        render(root, element("div"));
        render(root, element("span"));

        equal(root.children.length, 1);

        equal(root.children[0].tagName, "SPAN");
    });

    test("render changes attribute of existing element", function() {
        render(root, element("div", {id: "foo"}));

        var firstChild = root.children[0];

        render(root, element("div", {id: "bar"}));

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
        var div = element("div");

        render(root, div);

        var firstChild = root.children[0];

        render(root, element("div", null, [ element("div") ]));

        equal(root.children.length, 1);

        strictEqual(firstChild, root.children[0]);

        equal(firstChild.children.length, 1);
    });

    test("render updates existing text node", function() {
        render(root, element("div", null, [text("foo")]));

        var textNode = root.children[0].firstChild;

        render(root, element("div", null, [text("bar")]));

        equal(root.children[0].childNodes.length, 1);

        strictEqual(textNode, root.children[0].firstChild);

        equal(textNode.nodeValue, "bar");
    });

    test("render replaces text node with element", function() {
        render(root, element("div", null, [text("foo")]));

        render(root, element("div", null, [element("div")]));

        equal(root.children[0].childNodes.length, 1);

        equal(root.children[0].firstChild.tagName, "DIV");
    });

    test("render replaces element with text node", function() {
        render(root, element("div", null, [element("div")]));

        render(root, element("div", null, [text("foo")]));

        equal(root.children[0].childNodes.length, 1);

        equal(root.children[0].firstChild.nodeValue, "foo");
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

        equal(root.children[0].childNodes.length, 1);
    });
}());
