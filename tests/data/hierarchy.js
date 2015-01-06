(function(){
var Node = kendo.data.Node;
var HierarchicalDataSource = kendo.data.HierarchicalDataSource;

function categories() {
    return new HierarchicalDataSource({
        schema: {
            model: {
                children: {
                    schema: {
                        data: "products"
                    }
                }
            }
        },
        data: [ {
                categoryName: "Category 1",
                products: [
                    { productName: "Product 1" }
                ]
            }]
    });
}

module("HierarchicalDataSource", {
    setup: function() {
        $.mockjaxSettings.responseTime = 0;
        $.mockjaxSettings.contentType = "text/html";
    },
    teardown: function() {
        $.mockjaxClear();
    }
});

test("Node inherits from Model", function() {
    var node = new Node({});

    ok(node instanceof kendo.data.Model);
});

test("Node serializes id by default", function() {
    var node = new Node({ id: 1 });

    equal(node.toJSON().id, 1);
});

test("Node does not serialize id when not provided", function() {
    var node = new Node({ foo: 1 });
    var json = node.toJSON();

    ok(typeof json.id === "undefined");
});

test("Node does not serialize id when idField is changed", function() {
    var NewNode = Node.define({ id: "foo" });

    var node = new NewNode({ foo: 1 });

    var json = node.toJSON();

    ok(typeof json.id === "undefined");
    equal(json.foo, 1);
});

test("HierarchicalDataSource contains objects of Node type", function() {
    var dataSource = new HierarchicalDataSource( {
        data: [{}]
    });

    dataSource.read();

    ok(dataSource.data()[0] instanceof Node);
});

test("the children field of a node is a HierarchicalDataSource", function() {
    var dataSource = new HierarchicalDataSource( {
        data: [{ hasChildren: true }]
    });

    dataSource.read();

    var root = dataSource.data()[0];

    ok(root.children instanceof HierarchicalDataSource);
});

test("heterogeneous data source from local data", function() {
    var dataSource = categories();

    dataSource.read();
    dataSource.data()[0].children.read();

    equal(dataSource.data()[0].children.data()[0].productName, "Product 1");
});

test("changes of the children are propagated to the parent data source", 1, function() {
    var dataSource = categories();

    dataSource.read();

    var parent = dataSource.data()[0];
    parent.children.read();
    dataSource.bind("change", function() {
        ok(true, "Change was raised");
    });

    parent.children.add({ productName: "Product 2" });
});

test("the event argument contains the node whose data source changed",1, function() {
    var dataSource = categories();

    dataSource.read();

    var parent = dataSource.data()[0];
    parent.children.read();
    dataSource.bind("change", function(e) {
        strictEqual(e.node, parent);
    });

    parent.children.add({ productName: "Product 2" });
});

test("the event argument contains the closest node",1, function() {
    var dataSource = categories();

    dataSource.read();

    var parent = dataSource.data()[0];
    parent.children.read();

    var child = parent.children.data()[0];

    dataSource.bind("change", function(e) {
        strictEqual(e.node, child);
    });

    child.append({ productName: "Product 2" });
});

test("the event argument contains the index",1, function() {
    var dataSource = categories();

    dataSource.read();

    var parent = dataSource.data()[0];
    parent.children.read();

    var child = parent.children.data()[0];

    dataSource.bind("change", function(e) {
        strictEqual(e.index, 0);
    });

    child.append({ productName: "Product 2" });
});

test("adding a child node triggers the change event of the data source", 2, function() {
    var dataSource = categories();

    dataSource.read();

    var parent = dataSource.data()[0];

    parent.children.read();

    dataSource.bind("change", function(e) {
        equal(e.items[0].productName, "added");
        equal(e.action, "add");
    });

    parent.children.add({ productName: "added" });
});

test("removing a child node triggers the change event of the data source", 2, function() {
    var dataSource = categories();

    dataSource.read();

    var parent = dataSource.data()[0];

    parent.children.read();

    var child = parent.children.data()[0];

    dataSource.bind("change", function(e) {
        strictEqual(e.items[0], child);
        equal(e.action, "remove");
    });

    parent.children.remove(child);
});

test("reading a the children raises the change event", 1, function() {
    var dataSource = categories();

    dataSource.read();

    var parent = dataSource.data()[0];

    dataSource.bind("change", function(e) {
        strictEqual(e.items[0], parent.children.data()[0]);
    });

    parent.children.read();
});

asyncTest("error event bubbles from child datasources", function() {
    $.mockjax({ url: "bar", dataType: "json", data: { id: 1 }, status: 500, responseText: 'Server response' });
    $.mockjax({ url: "bar", dataType: "json", responseText: [{ id: 1, hasChildren: true, text: "foo" }] });

    var dataSource = HierarchicalDataSource.create({
            transport: {
                read: {
                    url: "bar",
                    dataType: "json"
                }
            }
        });

    dataSource.bind({
        change: function() {
            dataSource.data()[0].load();
        },

        error: function(e) {
            start();
            ok(e);
            ok(e.xhr);
            ok(e.status);
            ok(e.node);
            ok("errorThrown" in e);
        }
    });

    dataSource.read();
});

test("error event bubbles after setting the data through data()", 1, function() {
    var dataSource = HierarchicalDataSource.create({});

    dataSource.bind("error", function() {
        ok(true);
    });

    dataSource.data([{ id: 1, text: "foo", hasChildren: true }]);

    dataSource.data().trigger("error");
});

test("subnodes can be loaded after erroring out", function() {
    var calls = 0;
    var dataSource = HierarchicalDataSource.create({
            transport: {
                read: function(options) {
                    if (!options.data.id) {
                        options.success([
                            { id: 1, hasChildren: true, text: "foo" }
                        ]);
                    } else {
                        calls++;

                        if (calls == 1) {
                            options.error({});
                        } else {
                            options.success([{ id: 2, text: "bar" }]);
                        }
                    }
                }
            },
            schema: {
                model: {
                    id: "id",
                    hasChildren: "hasChildren"
                }
            }
        });

    dataSource.read();

    var foo = dataSource.data()[0];

    foo.load(); // errors out

    foo.loaded(false);
    foo.load();
    equal(foo.children.data().length, 1);
});

test("load fetches data from the children data source", function() {
    var dataSource = categories();

    dataSource.read();

    var parent = dataSource.data()[0];

    parent.load();

    equal(parent.children.data().length, 1);
});

test("load data from remote data source", 1, function() {
    var dataSource = new HierarchicalDataSource({
        transport: {
            read: function(options) {
                ok(true, "The read method of the transport is called");
            }
        }
    });

    dataSource.fetch();
});

test("the parent id is passed when reading children from remote service", 1, function() {
    var dataSource = new HierarchicalDataSource({
        transport: {
            read: function(options) {
                options.success([ { hasChildren: true, categoryId: 1 }])
            }
        },
        schema: {
            model: {
                id: "categoryId",
                children: {
                    transport: {
                        read: function(options) {
                            equal(options.data.categoryId, 1);
                        }
                    }
                }
            }
        }
    });

    dataSource.fetch();

    dataSource.data()[0].load();
});

test("getByUid is recursive", function() {
    var dataSource = categories();

    dataSource.fetch();
    dataSource.data()[0].load();

    var product = dataSource.data()[0].children.data()[0];

    strictEqual(dataSource.getByUid(product.uid), product);
});

test("hasChildren returns the value of the specified field", function() {
    var dataSource = new HierarchicalDataSource({
        transport: {
            read: function(options) {
                options.success([
                    { id: 1, isParent: true },
                    { id: 2, isParent: false }
                ])
            }
        },
        schema: {
            model: {
                hasChildren: "isParent"
            }
        }
    });

    dataSource.fetch();

    equal(dataSource.view()[0].hasChildren, true)
    equal(dataSource.view()[1].hasChildren, false)
});

test("hasChildren returns the false if the specified field is undefined", function() {
    var dataSource = new HierarchicalDataSource({
        transport: {
            read: function(options) {
                options.success([
                    { id: 1 }
                ])
            }
        },
        schema: {
            model: {
                hasChildren: "isParent"
            }
        }
    });

    dataSource.fetch();

    equal(dataSource.view()[0].hasChildren, false)
});

test("hasChildren returns false by default", function() {
    var dataSource = new HierarchicalDataSource({
        transport: {
            read: function(options) {
                options.success([
                    { id: 1 },
                    { id: 2 }
                ])
            }
        }
    });

    dataSource.fetch();
    equal(dataSource.data()[0].hasChildren, false);
});

test("hasChildren as function", 1, function() {
    var dataSource = new HierarchicalDataSource({
        transport: {
            read: function(options) {
                options.success([
                    { id: 1 }
                ])
            }
        },
        schema: {
            model: {
                hasChildren: function() {
                    ok(true);
                }
            }
        }
    });

    dataSource.fetch();
});

test("hasChildren set as true", 1, function() {
    var dataSource = new HierarchicalDataSource({
        transport: {
            read: function(options) {
                options.success([
                    { id: 1 }
                ])
            }
        },
        schema: {
            model: {
                hasChildren: true
            }
        }
    });

    dataSource.fetch();
    equal(dataSource.data()[0].hasChildren, true);
});

test("hasChildren set as false", 1, function() {
    var dataSource = new HierarchicalDataSource({
        transport: {
            read: function(options) {
                options.success([
                    { id: 1 }
                ])
            }
        },
        schema: {
            model: {
                hasChildren: false
            }
        }
    });

    dataSource.fetch();
    equal(dataSource.data()[0].hasChildren, false);
});

test("the this context in hasChildren is the node itself", 1, function() {
    var that;

    var dataSource = new HierarchicalDataSource({
        transport: {
            read: function(options) {
                options.success([
                    { id: 1 }
                ])
            }
        },
        schema: {
            model: {
                hasChildren: function() {
                    that = this;
                }
            }
        }
    });

    dataSource.fetch();

    strictEqual(dataSource.data()[0], that);
});

test("children as string and inline data source", function() {
    var dataSource = new kendo.data.HierarchicalDataSource({
        data: [{
            text: "Root 1",
            products: [ { text: "Child 1.1" } ]
        }],
        schema: {
            model: {
                children: "products"
            }
        }
    });

    dataSource.fetch();

    dataSource.data()[0].load();
    equal(dataSource.data()[0].children.data()[0].text, "Child 1.1");
});

test("hasChildren and inline defined data source", function() {
    var dataSource = categories();

    dataSource.fetch();

    dataSource.data()[0].load();

    equal(dataSource.data()[0].hasChildren, true);
    equal(dataSource.data()[0].children.data()[0].hasChildren, false);
});

test("the default children field name is 'items'", function() {
    var dataSource = new HierarchicalDataSource({
        data: [ {
            text: "foo",
            items: [
               { text : "bar" }
            ]
        } ]
    });

    dataSource.fetch();

    dataSource.data()[0].load();

    equal(dataSource.data()[0].hasChildren, true);
    equal(dataSource.data()[0].children.data()[0].text, "bar");
});

test("hasChildren propagates to child data sources", function() {
    var readData = function(options) {
            options.success([
                { isParent: true }
            ])
        },
        dataSource = new HierarchicalDataSource({
            transport: {
                read: readData
            },
            schema: {
                model: {
                    hasChildren: "isParent",
                    children: {
                        transport: {
                            read: readData
                        }
                    }
                }
            }
        });

    dataSource.fetch();
    dataSource.data()[0].load();

    ok(dataSource.data()[0].children.data()[0].hasChildren === true);
});

test("loaded returns false for nodes whose children are not loaded", function() {
    var dataSource = categories();

    dataSource.fetch();
    ok(!dataSource.data()[0].loaded());
});

test("loaded returns true for nodes whose children are loaded", function() {
    var dataSource = categories();

    dataSource.fetch();
    dataSource.data()[0].load()

    ok(dataSource.data()[0].loaded());
});

test("setting loaded to false after a node is loaded returns false", function() {
    var dataSource = categories();

    dataSource.fetch();
    dataSource.data()[0].load()
    dataSource.data()[0].loaded(false)

    ok(!dataSource.data()[0].loaded());
});

test("load calls the read method of the transport after setting loaded to false", 2, function() {
    var dataSource = new HierarchicalDataSource({
        transport: {
            read: function(options) {
                options.success([ { hasChildren: true, categoryId: 1 }])
            }
        },
        schema: {
            model: {
                children: {
                    transport: {
                        read: function(options) {
                            options.success([]);
                            ok(true, "Read is called");
                        }
                    }
                }
            }
        }
    });

    dataSource.fetch();

    dataSource.data()[0].load();
    dataSource.data()[0].loaded(false);
    dataSource.data()[0].load();
});

test("load calls the read method of the transport after setting loaded to false and items have been destroyed", function() {
    var dataSource = new HierarchicalDataSource({
        data: [
            { hasChildren: true, id: 1 }
        ],
        schema: {
            model: {
                children: {
                    transport: {
                        read: function(options) {
                            options.success([ { id: 2 }, { id: 3 } ]);
                        }
                    }
                }
            }
        }
    });

    dataSource.fetch();

    var root = dataSource.data()[0];
    root.load();
    dataSource.remove(dataSource.get(2));
    root.loaded(false);
    root.load();
    equal(root.children.data().length, 2);
});

test("parentNode returns the parent of a child node", function() {
    var dataSource = categories();

    dataSource.read();
    var parent = dataSource.data()[0];
    parent.load();
    var child = parent.children.data()[0];

    strictEqual(child.parentNode(), parent);
});

test("remove is recursive", function() {
    var dataSource = categories();

    dataSource.read();
    var parent = dataSource.data()[0];
    parent.load();
    var child = parent.children.data()[0];

    dataSource.remove(child);

    ok(!dataSource.getByUid(child.uid));
});

test("level returns the node level", function() {
    var dataSource = categories();

    dataSource.read();
    var parent = dataSource.data()[0];
    parent.load();

    var child = parent.children.data()[0];

    equal(parent.level(), 0);
    equal(child.level(), 1);
});

test("removing and adding the same model does not add multiple change events", function() {
    var counter = 0;

    var dataSource = categories();

    dataSource.read();

    var category = dataSource.data()[0];
    dataSource.bind("change", function() {
        counter++;
    });

    dataSource.remove(category);
    dataSource.add(category);

    category.set("categoryName", "foo");

    equal(counter, 3);
});

test("removing and adding the same model persists child dataSource", function() {
    var dataSource = new HierarchicalDataSource({
        data: [
            { id: 1 }
        ]
    });

    dataSource.read();

    var item = dataSource.get(1);

    item.append({ id: 2 });

    dataSource.remove(item);

    dataSource.add(item);

    equal(item.children.data().length, 1);
});

test("adding items to child dataSource modifies hasChildren state", function() {
    var dataSource = new HierarchicalDataSource({
        data: [
            { id: 1 }
        ]
    });

    dataSource.read();

    var item = dataSource.get(1);

    item.append({ id: 2 });

    ok(item.hasChildren);
});

test("removing items from child dataSource modifies hasChildren state", function() {
    var dataSource = new HierarchicalDataSource({
        data: [
            { id: 1, items: [
                { id: 2 }
            ] }
        ]
    });

    dataSource.read();

    var root = dataSource.get(1);

    root.children.read();

    dataSource.remove(root.children.get(2));

    ok(!root.hasChildren);
});

test("infer from list", function() {
    var list = $("<ul><li>foo</li><li>bar</li></ul>"),
        dataSource = HierarchicalDataSource.create({
            list: list,
            fields: [ { field: "text" } ]
        });

    ok(dataSource instanceof HierarchicalDataSource);

    dataSource.read();

    var data = dataSource.data();

    equal(data.length, 2);
    equal(data[0].text, "foo");
    equal(data[1].text, "bar");
});

test("infer from nested list", function() {
    var list = $("<ul><li>foo<ul><li>bar</li></ul></li></ul>"),
        dataSource = HierarchicalDataSource.create({
            list: list,
            fields: [ { field: "text" } ]
        });

    dataSource.read();

    var data = dataSource.data();

    equal(data.length, 1);
    equal(data[0].text, "foo");
    ok(data[0].loaded(), "inferred nodes are considered as loaded");

    data[0].children.read();
    var children = data[0].children.data();

    equal(children.length, 1);
    equal(children[0].text, "bar");
    ok(children[0].loaded(), "inferred child nodes are considered as loaded");
});

test("infer from nested list with text wrapper elements", function() {
    var list = $("<ul><li><div>foo</div><ul><li><div>bar</div></li></ul></li></ul>"),
        dataSource = HierarchicalDataSource.create({
            list: list,
            fields: [ { field: "text" } ]
        });

    dataSource.read();

    var data = dataSource.data();

    equal(data.length, 1);
    equal(data[0].text, "foo");

    data[0].children.read();
    var children = data[0].children.data();

    equal(children.length, 1);
    equal(children[0].text, "bar");
});

test("infer of id field", function() {
    var list = $("<ul><li data-id='42'>" +
            "<div><span>foo</span></div>"+
        "</li></ul>"),
        dataSource = HierarchicalDataSource.create({
            list: list,
            fields: [ { field: "text" } ]
        });

    dataSource.read();

    var data = dataSource.data();

    equal(data.length, 1);
    equal(data[0].id, "42");
});

test("infer of nested url / spriteCssClass / imageUrl fields", function() {
    var list = $("<ul><li data-id='7'>" +
            "<div><img class='k-image' src='image.png' />" +
            "<a href='http://kendoui.com/'>" +
            "<span class='k-sprite spriteClass'></span>" +
            "foo</a></div>"+
        "</li></ul>"),
        dataSource = HierarchicalDataSource.create({
            list: list,
            fields: [
                { field: "text" },
                { field: "url" },
                { field: "spriteCssClass" },
                { field: "imageUrl" }
            ]
        });

    dataSource.read();

    var data = dataSource.data();

    equal(data.length, 1);

    equal(data[0].id, "7");
    equal(data[0].text, "foo");
    equal(data[0].url, "http://kendoui.com/");
    equal(data[0].spriteCssClass, "spriteClass");
    equal(data[0].imageUrl, "image.png");
});

test("infer of plain url fields", function() {
    var list = $("<ul><li>" +
            "<a href='http://kendoui.com/'>" +
            "<span class='k-sprite spriteClass'></span>" +
            "foo</a>"+
        "</li></ul>"),
        dataSource = HierarchicalDataSource.create({
            list: list,
            fields: [
                { field: "text" },
                { field: "url" },
                { field: "spriteCssClass" },
                { field: "imageUrl" }
            ]
        });

    dataSource.read();

    var data = dataSource.data();

    equal(data.length, 1);

    equal(data[0].text, "foo");
    equal(data[0].url, "http://kendoui.com/");
    equal(data[0].spriteCssClass, "spriteClass");
});

test("infer with custom fields", function() {
    var list = $("<ul><li>foo</li></ul>"),
        dataSource = HierarchicalDataSource.create({
            list: list,
            fields: [ { field: "productName" } ]
        });

    dataSource.read();

    var data = dataSource.data();

    equal(data.length, 1);
    equal(data[0].productName, "foo");
});

test("infer of hasChildren property", function() {
    var list = $("<ul><li data-hasChildren='true'>foo</li></ul>"),
        dataSource = HierarchicalDataSource.create({
            list: list,
            fields: [ { field: "text" } ]
        });

    dataSource.read();

    var data = dataSource.data();

    equal(data.length, 1);
    equal(data[0].hasChildren, true);
});

test("loading items without children does not repopulate their datasource", function() {
    var dataSource = new HierarchicalDataSource({
        data: [
            { text: "foo", items: [
                { text: "bar" }
            ] }
        ]
    });

    dataSource.read();

    var children = dataSource.view()[0].children;
    children.read();
    dataSource.remove(children.view()[0]);

    dataSource.view()[0].load();

    equal(dataSource.view()[0].children.view().length, 0);
});

test("added observable objects can be loaded", function() {
    var dataSource = new HierarchicalDataSource({});

    var model = kendo.observable({ text: "bar", hasChildren: true });

    ok(model = dataSource.add(model));

    model.load();

    ok(true);
});

test("get method works with subitems", function() {
    var dataSource = new HierarchicalDataSource({
        data: [
            { id: 1, text: "foo", items: [
                { id: 2, text: "bar" }
            ] }
        ]
    });

    dataSource.read();

    var children = dataSource.data()[0].children;
    children.read();

    ok(dataSource.get(2))
    equal(dataSource.get(2).text, children.data()[0].text);
});

test("get method works for subitems and custom id field", function() {
    var dataSource = new HierarchicalDataSource({
        data: [
            { foo: 1, text: "foo", items: [
                { foo: 2, text: "bar" },
                { foo: 3, text: "baz" }
            ] }
        ],
        schema: {
            model: {
                id: "foo",
                children: "items"
            }
        }
    });

    dataSource.read();

    dataSource.data()[0].load();

    ok(dataSource.get(2))
    equal(dataSource.get(2).text, "bar");
});

test("sorting is used when loading child datasources", function() {
    var dataSource = new HierarchicalDataSource({
        data: [
            { foo: 1, text: "foo", items: [
                { foo: 3, text: "alpha" },
                { foo: 2, text: "ghamma" },
                { foo: 2, text: "alpha" },
                { foo: 2, text: "beta" }
            ] }
        ],
        sort: [
            { field: "foo", dir: "asc" },
            { field: "text", dir: "asc" }
        ]
    });

    dataSource.read();

    var root = dataSource.data()[0];

    root.load();

    var data = root.children.view();

    equal(data[0].text, "alpha");
    equal(data[1].text, "beta");
    equal(data[2].text, "ghamma");
    equal(data[3].text, "alpha");
});

test("loading of child datasources updates items field of parent", function() {
    var i = 0,
        dataSource = new HierarchicalDataSource({
            transport: {
                read: function(options) {
                    options.success([
                        { hasChildren: true, foo: i++ }
                    ]);
                }
            }
        });

    dataSource.read();

    var root = dataSource.data()[0];
    root.load();

    ok("items" in root);
    equal(root.items, root.children.data());
});

module("HierarchicalDataSource : parameterMap", {
    setup: function() {
        $.mockjaxSettings.responseTime = 0;
    },
    teardown: function() {
        $.mockjaxClear();
    }
});

function addFoo(data) {
    data.foo = "bar";
    return data;
}

asyncTest("parameterMap gets called when fetching root nodes", function() {
    $.mockjax({
        url: "bar", dataType: "json",
        response: function(e) {
            start();
            equal(e.data.foo, "bar");
        }
    });

    var dataSource = new HierarchicalDataSource({
        transport: {
            read: { url: "bar", dataType: "json" },
            parameterMap: addFoo
        }
    });

    dataSource.read();
});

asyncTest("parameterMap gets called when fetching child nodes", function() {
    $.mockjax({
        url: "bar", dataType: "json", data: { id: 1 },
        response: function(e) {
            start();
            equal(e.data.foo, "bar");
        }
    });

    $.mockjax({
        url: "bar", dataType: "json",
        responseText: [{ id: 1, hasChildren: true, text: "foo" }]
    });

    var dataSource = new HierarchicalDataSource({
        transport: {
            read: { url: "bar", dataType: "json" },
            parameterMap: addFoo
        }
    });

    dataSource.one("change", function() {
        this.data()[0].load();
    });

    dataSource.read();
});

asyncTest("child parameterMap gets called when fetching child nodes", function() {
    $.mockjax({
        url: "bar", dataType: "json", data: { id: 1 },
        response: function(e) {
            start();
            equal(e.data.foo, "bar");
        }
    });

    $.mockjax({
        url: "bar", dataType: "json",
        responseText: [{ id: 1, hasChildren: true, text: "foo" }]
    });

    var bar = { url: "bar", dataType: "json" };

    var dataSource = new HierarchicalDataSource({
        transport: { read: bar },
        schema: {
            model: {
                id: "id",
                hasChildren: "hasChildren",
                children: {
                    transport: {
                        read: bar,
                        parameterMap: function(data, type) {
                            equal(type, "read");
                            return addFoo(data);
                        }
                    }
                }
            }
        }
    });

    dataSource.one("change", function() {
        this.data()[0].load();
    });

    dataSource.read();
});

test("child datasources inherit fields", function() {
    var dataSource = new HierarchicalDataSource({
        data: [
            { id: 1, Text: "foo", items: [
                { id: 2, Text: "bar" }
            ] }
        ],
        schema: {
            model: {
                children: "items",
                fields: {
                    text: { from: "Text" }
                }
            }
        }
    });

    dataSource.read();

    dataSource.get(1).load();

    equal(dataSource.get(2).text, "bar");
});

test("Node load returns promise", function() {
    var dataSource = new HierarchicalDataSource({
        transport: {
            read: function(options) {
                options.success([ { id: 1, hasChildren: true } ]);
            }
        }
    });

    dataSource.read();

    ok($.isFunction(dataSource.get(1).load().then));
});

test("Node without children resolves load promise immediately", function() {
    var node = new Node({ id: 1 });

    var promise = node.load();

    equal(promise.state(), "resolved");
});

test("load resolves promise upon success", function() {
    var deferred;
    var dataSource = new HierarchicalDataSource({
        transport: {
            read: function(options) {
                deferred = $.Deferred();
                deferred.then(function() {
                    options.success([ { id: 1, hasChildren: true } ]);
                });
            }
        }
    });

    dataSource.read();

    deferred.resolve();

    var loadPromise = dataSource.get(1).load();

    equal(loadPromise.state(), "pending");

    deferred.resolve();

    equal(loadPromise.state(), "resolved");
});

}());
