(function() {
    var TreeListDataSource = kendo.data.TreeListDataSource;
    var TreeListModel = kendo.data.TreeListModel;

    module("TreeListModel");

    test("loaded method returns false", function() {
        var m = new TreeListModel();

        ok(!m.loaded());
    });

    test("loaded flag can be set", function() {
        var m = new TreeListModel();

        m.loaded(true);

        ok(m.loaded());
    });

    test("toJSON serializes id and parentId", function() {
        var m = new TreeListModel({ id: 12, parentId: 20 });

        var json = m.toJSON();
        equal(json.id, 12);
        equal(json.parentId, 20);
    });

    test("toJSON does not serialize _loaded flag", function() {
        var m = new TreeListModel();

        m.loaded(true);

        ok(typeof m.toJSON()._loaded === "undefined");
    });

    test("toJSON does not serialize _edit flag", function() {
        var m = new TreeListModel();

        m._edit = true;

        ok(typeof m.toJSON()._edit === "undefined");
    });

    module("TreeListDataSource");

    function controlledRead() {
        var queue = [];

        var read = function(options) {
            var deferred = $.Deferred();

            deferred.then(options.success, options.error);

            queue.push(deferred);
        };

        read.resolve = function(value) {
            if (!queue.length) {
                throw new Error("Tried to resolve a request that hasn't been executed.");
            }
            queue.shift().resolve(value);
            return read;
        };

        read.reject = function(value) {
            queue.shift().reject(value);
            return read;
        };

        read.queueLength = function() {
            return queue.length;
        };

        return read;
    }

    test("extends DataSource", function() {
        ok(new TreeListDataSource() instanceof kendo.data.DataSource);
    });

    test("uses model of type TreeListModel", function(assert) {
        var ds = new TreeListDataSource({
            data: [ { id: 1 } ]
        });

        ds.read();

        ok(ds.at(0) instanceof TreeListModel);
    });

    test("load calls transport.read", function() {
        var calls = 0;

        var ds = new TreeListDataSource({
            transport: {
                read: function(options) {
                    calls++;

                    options.success([ { id: calls, hasChildren: true } ]);
                }
            }
        });

        ds.read();

        equal(calls, 1);

        ds.load(ds.at(0));

        equal(calls, 2);
    });

    test("load inserts new data into datasource", function() {
        var calls = 0;

        var ds = new TreeListDataSource({
            transport: {
                read: function(options) {
                    options.success([
                        { id: ++calls, hasChildren: true }
                    ]);
                }
            }
        });

        ds.read();

        ds.load(ds.at(0));

        equal(ds.data().length, 2);
    });

    test("load doesn't change existing models", function() {
        var calls = 0;

        var ds = new TreeListDataSource({
            transport: {
                read: function(options) {
                    options.success([
                        { id: ++calls }
                    ]);
                }
            }
        });

        ds.read();

        var uid = ds.at(0).uid;
        ds.load(ds.at(0));

        equal(ds.data()[0].uid, uid);
    });

    test("load does not call transport.read when model is loaded", function() {
        var calls = 0;

        var ds = new TreeListDataSource({
            transport: {
                read: function(options) {
                    options.success([
                        { id: ++calls, hasChildren: true }
                    ]);
                }
            }
        });

        ds.read();

        ds.load(ds.at(0));
        ds.load(ds.at(0));

        equal(calls, 2);
    });

    test("load sets model loaded flag", function() {
        var calls = 0;

        var ds = new TreeListDataSource({
            transport: {
                read: function(options) {
                    options.success([
                        { id: ++calls }
                    ]);
                }
            }
        });

        ds.read();

        ds.load(ds.at(0));

        ok(ds.at(0).loaded());
    });

    test("load sends id field to server", 1, function() {
        var ds = new TreeListDataSource({
            transport: {
                read: function(options) {
                    var id = options.data.id;

                    if (!id) {
                        options.success([ { id: 42, hasChildren: true } ]);
                    } else {
                        equal(id, 42);
                    }
                }
            }
        });

        ds.read();

        ds.load(ds.at(0));
    });

    test("load model with local data", function() {
        var ds = new TreeListDataSource({
            data: [ { id: 1, parentId: null } ]
        });

        ds.read();

        ds.load(ds.at(0));

        equal(ds.view().length, 1);
        ok(ds.at(0).loaded());
    });

    test("childNodes returns child items", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: null },
                { id: 2, parentId: 1 },
                { id: 3, parentId: 2 }
            ]
        });

        ds.read();

        var childNodes = ds.childNodes(ds.get(1));
        equal(childNodes.length, 1);

        childNodes = ds.childNodes(ds.get(2));
        equal(childNodes.length, 1);
    });

    test("childNodes returns multiple child items", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: null },
                { id: 2, parentId: 1 },
                { id: 3, parentId: 1 },
                { id: 4, parentId: 1 },
                { id: 5, parentId: 2 },
                { id: 6, parentId: 2 }
            ]
        });

        ds.read();

        var childNodes = ds.childNodes(ds.get(1));
        equal(childNodes.length, 3);

        childNodes = ds.childNodes(ds.get(2));
        equal(childNodes.length, 2);
    });

    test("parentNode returns parent node", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: null },
                { id: 2, parentId: 1 },
                { id: 3, parentId: 2 }
            ]
        });

        ds.read();

        var parent = ds.parentNode(ds.get(2));
        equal(parent.id, 1);
    });

    test("rootNodes returns root nodes", function() {
         var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: null },
                { id: 3, parentId: 1 },
                { id: 4, parentId: 2 },
                { id: 2, parentId: null },
                { id: 5, parentId: 2 }
            ]
        });

        ds.read();

        var roots = ds.rootNodes();
        equal(roots.length, 2);
        equal(roots[0].id, 1);
        equal(roots[1].id, 2);
    });

    test("rootNodes uses parentId defaultValue", function() {
         var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: -1 },
                { id: 3, parentId: 1 },
                { id: 4, parentId: 2 },
                { id: 2, parentId: -1 },
                { id: 5, parentId: 2 }
            ],
            schema: {
                model: {
                    fields: {
                        parentId: { defaultValue: -1 }
                    }
                }
            }
        });

        ds.read();

        var roots = ds.rootNodes();
        equal(roots.length, 2);
        equal(roots[0].id, 1);
        equal(roots[1].id, 2);
    });

    test("rootNodes returns added item", function() {
         var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: null }
            ],
            schema: {
                model: {
                    fields: {
                        parentId: { type: "number", nullable: true }
                    }
                }
            }
        });

        ds.read();
        ds.add({});

        var roots = ds.rootNodes();
        equal(roots.length, 2);
        equal(roots[0].id, 1);
        equal(roots[1].id, 0);
    });

    test("rootNodes check parentId strictly", function() {
         var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: 0 }
            ],
            schema: {
                model: {
                    fields: {
                        parentId: { type: "number" }
                    }
                }
            }
        });

        ds.read();

        equal(ds.rootNodes().length, 1);
    });

    test("node is considered loaded if it has children", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: null },
                { id: 3, parentId: 1 },
                { id: 4, parentId: 3 },
                { id: 2, parentId: null },
                { id: 5, parentId: 2 }
            ]
        });

        ds.read();

        ok(ds.get(1).loaded());
        ok(ds.get(2).loaded());
        ok(ds.get(3).loaded());
    });

    test("level returns item level", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: null },
                { id: 2, parentId: null },
                { id: 3, parentId: 1 },
                { id: 4, parentId: 2 },
                { id: 5, parentId: 3 }
            ]
        });

        ds.read();

        equal(ds.level(1), 0);
        equal(ds.level(2), 0);
        equal(ds.level(3), 1);
        equal(ds.level(4), 1);
        equal(ds.level(5), 2);
    });

    test("level returns level when given model", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: null },
                { id: 2, parentId: null },
                { id: 3, parentId: 1 },
                { id: 4, parentId: 2 },
                { id: 5, parentId: 3 }
            ]
        });

        ds.read();

        equal(ds.level(ds.get(1)), 0);
        equal(ds.level(ds.get(4)), 1);
        equal(ds.level(ds.get(5)), 2);
    });

    test("filter by root items", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: null },
                { id: 2, parentId: null },
                { id: 3, parentId: 1 },
                { id: 4, parentId: 2 },
                { id: 5, parentId: 3 }
            ]
        });

        ds.read();

        ds.filter({ field: "id", operator: "eq", value: 1 });

        equal(ds.view()[0].id, 1);
    });

    test("filter by root items when none are found", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: null },
                { id: 2, parentId: null },
                { id: 3, parentId: 1 },
                { id: 4, parentId: 2 },
                { id: 5, parentId: 3 }
            ]
        });

        ds.read();

        ds.filter({ field: "id", operator: "eq", value: -1 });

        equal(ds.view().length, 0);
    });

    test("filter by child node should return parent items until root", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: null },
                { id: 2, parentId: null },
                { id: 3, parentId: 1 },
                { id: 4, parentId: 2 },
                { id: 5, parentId: 3 }
            ]
        });

        ds.read();

        ds.filter({ field: "id", operator: "eq", value: 5 });

        equal(ds.view().length, 3, "length differs");
        ok(ds.get(1));
        ok(ds.get(3));
        ok(ds.get(5));
    });

    test("filter preserves sort order", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, text: "c", parentId: null },
                { id: 2, text: "b", parentId: 1 },
                { id: 3, text: "a", parentId: 1 }
            ]
        });

        ds.read();

        ds.query({
            filter: { field: "parentId", operator: "eq", value: 1 },
            sort: { field: "text", dir: "asc" }
        });


        var view = ds.view();

        equal(view.length, 3, "length differs");
        equal(view[0].text, "c");
        equal(view[1].text, "a");
        equal(view[2].text, "b");
    });

    test("filter returns parent once when matched by multiple children", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, text: "c", parentId: null },
                { id: 2, text: "aa", parentId: 1 },
                { id: 3, text: "ab", parentId: 1 }
            ]
        });

        ds.read();

        ds.filter({ field: "text", operator: "contains", value: "a" });

        equal(ds.view().length, 3, "length differs");
        ok(ds.get(1));
        ok(ds.get(2));
        ok(ds.get(3));
    });

    test("filter does not duplicate parent items", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, text: "aa", parentId: null },
                { id: 2, text: "ab", parentId: 1 },
                { id: 3, text: "c", parentId: 1 }
            ]
        });

        ds.read();

        ds.filter({ field: "text", operator: "contains", value: "a" });

        equal(ds.view().length, 2, "length differs");
    });

    test("filter keeps all root items", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, text: "a", parentId: null },
                { id: 2, text: "b", parentId: null },
                { id: 3, text: "ca", parentId: 1 },
                { id: 4, text: "cb", parentId: 2 }
            ]
        });

        ds.read();

        ds.filter({ field: "text", operator: "contains", value: "c" });

        equal(ds.view().length, 4);
        ok(ds.get(1));
        ok(ds.get(2));
        ok(ds.get(3));
        ok(ds.get(4));
    });

    test("exisiting aggregates are extended", function() {
        var aggregates = [
            { aggregates: { null: { id: { count: 1 } } } },
            { aggregates: { 1: { id: { count: 1 } } } }
        ];
        var ds = new TreeListDataSource({
            serverAggregates: true,
            aggregate: { field: "id", aggregates:[ "count" ] },
            schema: {
                aggregates: "aggregates"
            },
            transport: {
                read: function(options) {
                    options.success(aggregates.shift());
                }
            }
        });

        ds.read();
        ds.read();

        equal(ds.aggregates()[null].id.count, 1);
        equal(ds.aggregates()[1].id.count, 1);
    });

    test("aggregate with key as empty string is replaced with default parend id value", function() {
        var ds = new TreeListDataSource({
            serverAggregates: true,
            aggregate: { field: "id", aggregates:[ "count" ] },
            schema: {
                aggregates: "aggregates"
            },
            transport: {
                read: function(options) {
                    options.success({
                        aggregates: { "": { id: { count: 1 } } }
                    });
                }
            }
        });

        ds.read();

        var aggregates = ds.aggregates();
        ok(!("" in aggregates));
        equal(ds.aggregates()[null].id.count, 1);
    });

    test("aggregate calculates aggregates for each parent item", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, foo: 1, parentId: null },
                { id: 2, foo: 2, parentId: 1 },
                { id: 3, foo: 3, parentId: 1 },
                { id: 4, foo: 4, parentId: 2 },
                { id: 5, foo: 5, parentId: null }
            ],
            aggregate: [
                { field: "foo", aggregate: "sum" }
            ]
        });

        ds.read();

        var aggregates = ds.aggregates();
        equal(aggregates[null].foo.sum, 15);
        equal(aggregates[1].foo.sum, 9);
        equal(aggregates[2].foo.sum, 4);
    });

    test("filter initially", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, foo: 1, parentId: null },
                { id: 2, foo: 2, parentId: 1 },
                { id: 3, foo: 3, parentId: 1 }, // filtered out
                { id: 4, foo: 4, parentId: 2 },
                { id: 5, foo: 5, parentId: null }
            ],
            filter: { field: "foo", operator: "neq", value: 3 }
        });

        ds.read();

        equal(ds.view().length, 4);
    });

    test("aggregate works on filtered data", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, foo: 1, parentId: null },
                { id: 2, foo: 2, parentId: 1 },
                { id: 3, foo: 3, parentId: 1 }, // filtered out
                { id: 4, foo: 4, parentId: 2 },
                { id: 5, foo: 5, parentId: null }
            ],
            filter: { field: "foo", operator: "neq", value: 3 },
            aggregate: [
                { field: "foo", aggregate: "sum" }
            ]
        });

        ds.read();

        var aggregates = ds.aggregates();
        equal(aggregates[null].foo.sum, 12);
        equal(aggregates[1].foo.sum, 6);
        equal(aggregates[2].foo.sum, 4);
    });

    test("aggregate works on filtered parents", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, foo: 1, parentId: null }, // filtered out
                { id: 2, foo: 2, parentId: 1 },
                { id: 3, foo: 3, parentId: 1 },
                { id: 4, foo: 4, parentId: 2 },
                { id: 5, foo: 5, parentId: null }
            ],
            filter: { field: "foo", operator: "neq", value: 1 },
            aggregate: [
                { field: "foo", aggregate: "sum" }
            ]
        });

        ds.read();

        var aggregates = ds.aggregates();
        equal(aggregates[null].foo.sum, 15);
        equal(aggregates[1].foo.sum, 9);
        equal(aggregates[2].foo.sum, 4);
    });

    test("load sets hasChildren flag when no children are loaded", function() {
        var called;

        var ds = new TreeListDataSource({
            transport: {
                read: function(options) {
                    if (!called) {
                        called = true;
                        options.success([ { id: 1, hasChildren: true } ]);
                    } else {
                        options.success([]);
                    }
                }
            }
        });

        ds.read();

        ds.load(ds.at(0));

        ok(!ds.at(0).hasChildren);
    });

    test("initially loaded items set hasChildren flag", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: null },
                { id: 2, parentId: 1 }
            ]
        });

        ds.read();

        equal(ds.get(1).hasChildren, true);
        equal(ds.get(2).hasChildren, false);
    });

    test("hasChildren flag is not overridden", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: null },
                { id: 2, parentId: 1, hasChildren: true }
            ]
        });

        ds.read();

        equal(ds.get(1).hasChildren, true);
        equal(ds.get(2).hasChildren, true);
    });

    test("hasChildren flag is updated upon discrepancies", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: null, hasChildren: false },
                { id: 2, parentId: 1 }
            ]
        });

        ds.read();

        equal(ds.get(1).hasChildren, true);
    });

    test("hasChildren flag is updated when children are removed", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: null, hasChildren: false },
                { id: 2, parentId: 1 }
            ]
        });

        ds.read();
        ds.remove(ds.get(2));

        equal(ds.get(1).hasChildren, false, "hasChildren is not updated");
        equal(ds.get(1).loaded(), true, "item should be loaded");
    });

    test("removing item removes all its children", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: null },
                { id: 2, parentId: 1 }
            ]
        });

        ds.read();
        ds.remove(ds.get(1));

        equal(ds.data().length, 0);
        equal(ds.view().length, 0);
    });

    test("create with options object instantiates TreeListDataSource", function() {
        var ds = TreeListDataSource.create({});

        ok(ds instanceof TreeListDataSource);
    });

    test("create with array argument instantiates TreeListDataSource with data", function() {
        var ds = TreeListDataSource.create([ { id: 1 } ]);

        ok(ds instanceof TreeListDataSource);

        ds.read();

        ok(ds.get(1));
    });

    test("create with ObservableArray argument instantiates TreeListDataSource with data", function() {
        var array = new kendo.data.ObservableArray([ { id: 1 } ]);
        var ds = TreeListDataSource.create(array);

        ok(ds instanceof TreeListDataSource, "instance");

        ds.read();

        ok(ds.get(1), "get");
    });

    test("create with existing instance", function() {
        var ds = TreeListDataSource.create({});

        var recreated = TreeListDataSource.create(ds);

        equal(recreated, ds);
    });

    test("node.loaded is false upon error", function() {
        var read = controlledRead();
        var ds = new TreeListDataSource({ transport: { read: read } });

        ds.read();
        read.resolve([ { id: 1, hasChildren: true } ]);

        ds.load(ds.at(0));
        read.reject({});

        ok(!ds.at(0).loaded());
    });

    test("node.loaded is not updated on successful load after error", function() {
        var read = controlledRead();
        var ds = new TreeListDataSource({ transport: { read: read } });

        ds.read();
        read.resolve([
            { id: 1, hasChildren: true },
            { id: 2, hasChildren: true }
        ]);

        ds.load(ds.get(1));
        read.reject({});

        ds.load(ds.get(2));
        read.resolve([ { id: 3, parentId: 2 } ]);

        ok(!ds.get(1).loaded(), "Change handler updates wrong model");
        ok(ds.get(2).loaded(), "Change handler did not update correct model");
    });

    test("load returns promise", function() {
        var ds = new TreeListDataSource({
            data: [ { id: 1 } ]
        });

        ds.read();

        var result = ds.load(ds.at(0));
        ok($.isFunction(result.then));
    });

    test("load resolves promise", 1, function() {
        var read = controlledRead();
        var ds = new TreeListDataSource({ transport: { read: read } });

        ds.read();
        read.resolve([ { id: 1, hasChildren: true } ]);

        ds.load(ds.get(1)).then(function() {
            ok(true);
        });

        read.resolve([]);
    });

    test("load rejects promise upon error", 1, function() {
        var read = controlledRead();
        var ds = new TreeListDataSource({ transport: { read: read } });

        ds.read();
        read.resolve([ { id: 1, hasChildren: true } ]);

        ds.load(ds.get(1)).fail(function() {
            ok(true);
        });

        read.reject({});
    });

    test("load queues requests", 3, function() {
        var read = controlledRead();
        var ds = new TreeListDataSource({ transport: { read: read } });

        ds.read();
        read.resolve([
            { id: 1, hasChildren: true },
            { id: 2, hasChildren: true },
            { id: 3, hasChildren: true }
        ]);

        ds.load(ds.get(1)).then($.proxy(ok, this, true));
        ds.load(ds.get(2)).then($.proxy(ok, this, true));
        ds.load(ds.get(3)).then($.proxy(ok, this, true));

        read.resolve([]).resolve([]).resolve([]);
    });

    test("read clears dataSource data", function() {
        var calls = 0;

        var ds = new TreeListDataSource({
            transport: {
                read: function(options) {
                    calls++;

                    options.success([ { id: calls } ]);
                }
            }
        });

        ds.read();

        ds.read();

        equal(ds.data().length, 1);
        ok(ds.data() instanceof kendo.data.ObservableArray);
    });

    test("add new item with equal id and parentId", function() {
        var ds = new TreeListDataSource({
            schema: {
                model: {
                    fields: {
                        parentId: { defaultValue: 0, type: "number" }
                    }
                }
            },
            data: [
                { id: 1, parentId: 0 }
            ]
        });

        ds.read();

        var model = ds.insert(0, {});

        equal(model.parentId, 0);
        equal(model.id, 0);
    });

    test("adding new root item", function() {
        var ds = new TreeListDataSource({
            schema: {
                model: {
                    fields: {
                        parentId: { defaultValue: 0, type: "number" }
                    }
                }
            },
            data: [
                { id: 1, parentId: 0 }
            ]
        });

        ds.read();
        ds.insert(0, {});

        equal(ds.rootNodes().length, 2);
        equal(ds.childNodes(ds.get(1)).length, 0, "child nodes for id=1");
        equal(ds.childNodes(ds.get(0)).length, 0, "child nodes for id=0");
    });

    test("adding new child item", function() {
        var ds = new TreeListDataSource({
            schema: {
                model: {
                    fields: {
                        parentId: { defaultValue: 0, type: "number" }
                    }
                }
            },
            data: [
                { id: 1, parentId: 0 }
            ]
        });

        ds.read();
        ds.add({ parentId: 1 });

        equal(ds.rootNodes().length, 1);
        equal(ds.childNodes(ds.get(1)).length, 1);
        equal(ds.childNodes(ds.get(0)).length, 0);
    });

    var pluck = function(array, property) {
        return $.map(array, function(x) {
            return x[property];
        });
    };

    test("view returns items in proper order", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 3, parentId: 2 },
                { id: 2, parentId: 1 },
                { id: 1, parentId: null }
            ]
        });

        ds.read();

        deepEqual(pluck(ds.view(), "id"), [1, 2, 3]);
    });

    test("loaded flag is persisted", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: null }
            ]
        });

        ds.read();

        var root = ds.view()[0];
        root.loaded(true);

        var child = ds.add({ parentId: root.id });
        ds.cancelChanges(child);

        ok(root.loaded(), "root item must stay loaded");
    });
})();
