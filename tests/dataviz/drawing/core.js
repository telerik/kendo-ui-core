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

    test("remove clears child nodes", 2, function() {
        var clear = function() {
            ok(true);
        };
        var clearFalse = function() {
            ok(false);
        };
        var child2 = new BaseNode();
        var child3 = new BaseNode();
        var child4 = new BaseNode();
        node.append(child2);node.append(child3);node.append(child4);
        child.clear = child4.clear = clearFalse;
        child2.clear = child3.clear = clear;

        node.remove(1, 2);
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
                bar: true,
                obj: new kendo.Class()
            });
        }
    });

    test("wraps value fields", function() {
        ok(options.foo instanceof OptionsStore);
    });

    test("wraps nested fields", function() {
        ok(options.foo.bar instanceof OptionsStore);
    });

    test("doesn't wrap kendo classes", function() {
        ok(!(options.obj instanceof OptionsStore));
    });

    test("sets observer on functions", function() {
        equal(options.obj.observer, options);
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

    // ------------------------------------------------------------
    (function() {
        var factory;

        module("SurfaceFactory", {
            setup: function() {
                factory = new d.SurfaceFactory();
            }
        });

        test("registers surfaces in ascending order", function() {
            factory.register("bar", $.noop, 1);
            factory.register("foo", $.noop, 0);

            equal(factory._items[0].name, "foo");
        });

        test("instantiates surface with options", function() {
            factory.register("foo", function(e, o) { ok(o.bar); }, 0);

            factory.create(null, { bar: true });
        });

        test("instantiates default surface", function() {
            factory.register("foo", function() { ok(true); }, 0);
            factory.register("bar", function() { ok(false); }, 1);

            factory.create();
        });

        test("instantiates preferred surface", function() {
            factory.register("foo", function() { ok(false); }, 0);
            factory.register("bar", function() { ok(true); }, 1);

            factory.create(null, { type: "bar" });
        });

        test("ignores case of preferred surface", function() {
            factory.register("foo", function() { ok(false); }, 0);
            factory.register("bar", function() { ok(true); }, 1);

            factory.create(null, { type: "Bar" });
        });

        test("instantiates default surface if the preferred is unavailable", function() {
            factory.register("foo", function() { ok(true); }, 0);
            factory.register("bar", function() { ok(false); }, 1);

            factory.create(null, { type: "baz" });
        });

        asyncTest("logs warning if no surfaces are registered", 1, function() {
            stubMethod(kendo, "logToConsole", function(message) {
                ok(message.indexOf("Warning: Unable to create Kendo UI Drawing Surface.") > -1);
                start();
            }, function() {
                factory.create();
            });
        });

    })();
})();
