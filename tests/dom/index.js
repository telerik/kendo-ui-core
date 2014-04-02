(function(window) {
    var root;
    var DOM = kendo.dom;

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
