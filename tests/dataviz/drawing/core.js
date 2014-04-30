(function() {
    var dataviz = kendo.dataviz,

        d = dataviz.drawing,
        BaseNode = d.BaseNode,
        OptionsStore = d.OptionsStore;

    // ------------------------------------------------------------
    var node,
        child;

    module("BaseNode", {
        setup: function() {
            node = new BaseNode();
            child = new BaseNode();
            node.append(child);
        }
    });

    test("constructor sets srcElement observer", function() {
        var src = { };
        node = new BaseNode(src);

        deepEqual(src.observer, node);
    });

    test("append adds child node", function() {
        deepEqual(node.childNodes[0], child);
    });

    test("append sets parent", function() {
        deepEqual(child.parent, node);
    });

    test("clear removes all child nodes", function() {
        node.append(new BaseNode());
        node.remove = function(i, c) {
            equal(i, 0);
            equal(c, 2);
        };

        node.clear();
    });

    test("remove updates childNodes", function() {
        node.remove(0, 1);

        equal(node.childNodes.length, 0);
    });

    test("remove unsets parent", function() {
        node.remove(0, 1);

        equal(child.parent, null);
    });

    test("remove clears nested nodes", function() {
        var grandChild = new BaseNode();
        grandChild.clear = function() { ok(true); };
        child.append(grandChild);

        node.remove(0, 1);
    });

    test("invalidate propagates to parent", function() {
        var child = new BaseNode();
        node.append(child);
        node.invalidate = function() { ok(true); };

        child.invalidate();
    });

    test("geometryChange triggers invalidate", function() {
        node.invalidate = function() { ok(true); };

        node.geometryChange();
    });

    test("optionsChange triggers invalidate", function() {
        node.invalidate = function() { ok(true); };

        node.optionsChange();
    });

    test("childrenChange loads added source elements", function() {
        node.load = function(items) { equal(items.length, 1); };

        node.childrenChange({ action: "add", items: [{}] });
    });

    test("childrenChange removes deleted source elements", function() {
        node.remove = function(index, count) {
            equal(index, 10);
            equal(count, 1);
        };

        node.childrenChange({ action: "remove", index: 10, items: [{}] });
    });

    // ------------------------------------------------------------
    var options;

    module("Options Store", {
        setup: function() {
            options = new OptionsStore({
                foo: {
                    bar: { },
                    baz: true
                },
                bar: true
            });
        }
    });

    test("wraps value fields", function() {
        ok(options.foo instanceof OptionsStore);
    });

    test("wraps nested fields", function() {
        ok(options.foo.bar instanceof OptionsStore);
    });

    test("set", function() {
        options.set("baz", true);
        equal(options.baz, true);
    });

    test("set triggers optionsChange", function() {
        options.observer = {
            optionsChange: function(e) {
                equal(e.field, "baz");
                equal(e.value, true);
            }
        };

        options.set("baz", true);
    });

    test("nested set", function() {
        options.set("baz.baz", true);
        equal(options.baz.baz, true);
    });

    test("nested set on existing field triggers optionsChange", function() {
        options.observer = {
            optionsChange: function(e) {
                equal(e.field, "foo.bar.baz");
            }
        };

        options.set("foo.bar.baz", true);
    });

    test("nested set on new field triggers optionsChange", function() {
        options.observer = {
            optionsChange: function(e) {
                equal(e.field, "baz.baz");
            }
        };

        options.set("baz.baz", true);
    });

    test("get returns field", function() {
        equal(options.get("foo.baz"), true);
    });

    test("get returns nested field", function() {
        equal(options.get("foo.baz"), true);
    });
})();
