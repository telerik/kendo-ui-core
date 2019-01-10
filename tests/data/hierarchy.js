(function() {
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
            data: [{
                categoryName: "Category 1",
                products: [
                    { productName: "Product 1" }
                ]
            }]
        });
    }

    describe("HierarchicalDataSource", function() {
        beforeEach(function() {
            $.mockjaxSettings.responseTime = 0;
            $.mockjaxSettings.contentType = "text/html";
        });
        afterEach(function() {
            $.mockjax.clear();
        });

        it("Node inherits from Model", function() {
            var node = new Node({});

            assert.isOk(node instanceof kendo.data.Model);
        });

        it("Node serializes id by default", function() {
            var node = new Node({ id: 1 });

            assert.equal(node.toJSON().id, 1);
        });

        it("Node does not serialize id when not provided", function() {
            var node = new Node({ foo: 1 });
            var json = node.toJSON();

            assert.isOk(typeof json.id === "undefined");
        });

        it("Node does not serialize id when idField is changed", function() {
            var NewNode = Node.define({ id: "foo" });

            var node = new NewNode({ foo: 1 });

            var json = node.toJSON();

            assert.isOk(typeof json.id === "undefined");
            assert.equal(json.foo, 1);
        });

        it("HierarchicalDataSource contains objects of Node type", function() {
            var dataSource = new HierarchicalDataSource({
                data: [{}]
            });

            dataSource.read();

            assert.isOk(dataSource.data()[0] instanceof Node);
        });

        it("the children field of a node is a HierarchicalDataSource", function() {
            var dataSource = new HierarchicalDataSource({
                data: [{ hasChildren: true }]
            });

            dataSource.read();

            var root = dataSource.data()[0];

            assert.isOk(root.children instanceof HierarchicalDataSource);
        });

        it("heterogeneous data source from local data", function() {
            var dataSource = categories();

            dataSource.read();
            dataSource.data()[0].children.read();

            assert.equal(dataSource.data()[0].children.data()[0].productName, "Product 1");
        });

        it("changes of the children are propagated to the parent data source", function() {
            var dataSource = categories();

            dataSource.read();

            var parent = dataSource.data()[0];
            parent.children.read();
            dataSource.bind("change", function() {
                assert.isOk(true, "Change was raised");
            });

            parent.children.add({ productName: "Product 2" });
        });

        it("the event argument contains the node whose data source changed", function() {
            var dataSource = categories();

            dataSource.read();

            var parent = dataSource.data()[0];
            parent.children.read();
            dataSource.bind("change", function(e) {
                assert.strictEqual(e.node, parent);
            });

            parent.children.add({ productName: "Product 2" });
        });

        it("the event argument contains the closest node", function() {
            var dataSource = categories();

            dataSource.read();

            var parent = dataSource.data()[0];
            parent.children.read();

            var child = parent.children.data()[0];

            dataSource.bind("change", function(e) {
                assert.strictEqual(e.node, child);
            });

            child.append({ productName: "Product 2" });
        });

        it("the event argument contains the index", function() {
            var dataSource = categories();

            dataSource.read();

            var parent = dataSource.data()[0];
            parent.children.read();

            var child = parent.children.data()[0];

            dataSource.bind("change", function(e) {
                assert.strictEqual(e.index, 0);
            });

            child.append({ productName: "Product 2" });
        });

        it("adding a child node triggers the change event of the data source", function() {
            var dataSource = categories();

            dataSource.read();

            var parent = dataSource.data()[0];

            parent.children.read();

            dataSource.bind("change", function(e) {
                assert.equal(e.items[0].productName, "added");
                assert.equal(e.action, "add");
            });

            parent.children.add({ productName: "added" });
        });

        it("removing a child node triggers the change event of the data source", function() {
            var dataSource = categories();

            dataSource.read();

            var parent = dataSource.data()[0];

            parent.children.read();

            var child = parent.children.data()[0];

            dataSource.bind("change", function(e) {
                assert.strictEqual(e.items[0], child);
                assert.equal(e.action, "remove");
            });

            parent.children.remove(child);
        });

        it("reading a the children raises the change event", function() {
            var dataSource = categories();

            dataSource.read();

            var parent = dataSource.data()[0];

            dataSource.bind("change", function(e) {
                assert.strictEqual(e.items[0], parent.children.data()[0]);
            });

            parent.children.read();
        });

        it("error event bubbles from child datasources", function(done) {
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
                    assert.isOk(e);
                    assert.isOk(e.xhr);
                    assert.isOk(e.status);
                    assert.isOk(e.node);
                    assert.isOk("errorThrown" in e);
                    done();
                }
            });

            dataSource.read();
        });

        it("error event bubbles after setting the data through data()", function() {
            var dataSource = HierarchicalDataSource.create({});

            dataSource.bind("error", function() {
                assert.isOk(true);
            });

            dataSource.data([{ id: 1, text: "foo", hasChildren: true }]);

            dataSource.data().trigger("error");
        });

        it("subnodes can be loaded after erroring out", function() {
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
            assert.equal(foo.children.data().length, 1);
        });

        it("load fetches data from the children data source", function() {
            var dataSource = categories();

            dataSource.read();

            var parent = dataSource.data()[0];

            parent.load();

            assert.equal(parent.children.data().length, 1);
        });

        it("load data from remote data source", function() {
            var dataSource = new HierarchicalDataSource({
                transport: {
                    read: function(options) {
                        assert.isOk(true, "The read method of the transport is called");
                    }
                }
            });

            dataSource.fetch();
        });

        it("the parent id is passed when reading children from remote service", function() {
            var dataSource = new HierarchicalDataSource({
                transport: {
                    read: function(options) {
                        options.success([{ hasChildren: true, categoryId: 1 }])
                    }
                },
                schema: {
                    model: {
                        id: "categoryId",
                        children: {
                            transport: {
                                read: function(options) {
                                    assert.equal(options.data.categoryId, 1);
                                }
                            }
                        }
                    }
                }
            });

            dataSource.fetch();

            dataSource.data()[0].load();
        });

        it("getByUid is recursive", function() {
            var dataSource = categories();

            dataSource.fetch();
            dataSource.data()[0].load();

            var product = dataSource.data()[0].children.data()[0];

            assert.strictEqual(dataSource.getByUid(product.uid), product);
        });

        it("hasChildren returns the value of the specified field", function() {
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

            assert.equal(dataSource.view()[0].hasChildren, true)
            assert.equal(dataSource.view()[1].hasChildren, false)
        });

        it("hasChildren returns the false if the specified field is undefined", function() {
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

            assert.equal(dataSource.view()[0].hasChildren, false)
        });

        it("hasChildren returns false by default", function() {
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
            assert.equal(dataSource.data()[0].hasChildren, false);
        });

        it("hasChildren as function", function() {
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
                            assert.isOk(true);
                        }
                    }
                }
            });

            dataSource.fetch();
        });

        it("hasChildren set as true", function() {
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
            assert.equal(dataSource.data()[0].hasChildren, true);
        });

        it("hasChildren set as false", function() {
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
            assert.equal(dataSource.data()[0].hasChildren, false);
        });

        it("the this context in hasChildren is the node itself", function() {
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

            assert.strictEqual(dataSource.data()[0], that);
        });

        it("children as string and inline data source", function() {
            var dataSource = new kendo.data.HierarchicalDataSource({
                data: [{
                    text: "Root 1",
                    products: [{ text: "Child 1.1" }]
                }],
                schema: {
                    model: {
                        children: "products"
                    }
                }
            });

            dataSource.fetch();

            dataSource.data()[0].load();
            assert.equal(dataSource.data()[0].children.data()[0].text, "Child 1.1");
        });

        it("hasChildren and inline defined data source", function() {
            var dataSource = categories();

            dataSource.fetch();

            dataSource.data()[0].load();

            assert.equal(dataSource.data()[0].hasChildren, true);
            assert.equal(dataSource.data()[0].children.data()[0].hasChildren, false);
        });

        it("the default children field name is 'items'", function() {
            var dataSource = new HierarchicalDataSource({
                data: [{
                    text: "foo",
                    items: [
                        { text: "bar" }
                    ]
                }]
            });

            dataSource.fetch();

            dataSource.data()[0].load();

            assert.equal(dataSource.data()[0].hasChildren, true);
            assert.equal(dataSource.data()[0].children.data()[0].text, "bar");
        });

        it("hasChildren propagates to child data sources", function() {
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

            assert.isOk(dataSource.data()[0].children.data()[0].hasChildren === true);
        });

        it("loaded returns false for nodes whose children are not loaded", function() {
            var dataSource = categories();

            dataSource.fetch();
            assert.isOk(!dataSource.data()[0].loaded());
        });

        it("loaded returns true for nodes whose children are loaded", function() {
            var dataSource = categories();

            dataSource.fetch();
            dataSource.data()[0].load()

            assert.isOk(dataSource.data()[0].loaded());
        });

        it("setting loaded to false after a node is loaded returns false", function() {
            var dataSource = categories();

            dataSource.fetch();
            dataSource.data()[0].load()
            dataSource.data()[0].loaded(false)

            assert.isOk(!dataSource.data()[0].loaded());
        });

        it("load calls the read method of the transport after setting loaded to false", function() {
            var dataSource = new HierarchicalDataSource({
                transport: {
                    read: function(options) {
                        options.success([{ hasChildren: true, categoryId: 1 }])
                    }
                },
                schema: {
                    model: {
                        children: {
                            transport: {
                                read: function(options) {
                                    options.success([]);
                                    assert.isOk(true, "Read is called");
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

        it("load calls the read method of the transport after setting loaded to false and items have been destroyed", function() {
            var dataSource = new HierarchicalDataSource({
                data: [
                    { hasChildren: true, id: 1 }
                ],
                schema: {
                    model: {
                        children: {
                            transport: {
                                read: function(options) {
                                    options.success([{ id: 2 }, { id: 3 }]);
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
            assert.equal(root.children.data().length, 2);
        });

        it("parentNode returns the parent of a child node", function() {
            var dataSource = categories();

            dataSource.read();
            var parent = dataSource.data()[0];
            parent.load();
            var child = parent.children.data()[0];

            assert.strictEqual(child.parentNode(), parent);
        });

        it("remove is recursive", function() {
            var dataSource = categories();

            dataSource.read();
            var parent = dataSource.data()[0];
            parent.load();
            var child = parent.children.data()[0];

            dataSource.remove(child);

            assert.isOk(!dataSource.getByUid(child.uid));
        });

        it("level returns the node level", function() {
            var dataSource = categories();

            dataSource.read();
            var parent = dataSource.data()[0];
            parent.load();

            var child = parent.children.data()[0];

            assert.equal(parent.level(), 0);
            assert.equal(child.level(), 1);
        });

        it("removing and adding the same model does not add multiple change events", function() {
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

            assert.equal(counter, 3);
        });

        it("removing and adding the same model persists child dataSource", function() {
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

            assert.equal(item.children.data().length, 1);
        });

        it("adding items to child dataSource modifies hasChildren state", function() {
            var dataSource = new HierarchicalDataSource({
                data: [
                    { id: 1 }
                ]
            });

            dataSource.read();

            var item = dataSource.get(1);

            item.append({ id: 2 });

            assert.isOk(item.hasChildren);
        });

        it("removing items from child dataSource modifies hasChildren state", function() {
            var dataSource = new HierarchicalDataSource({
                data: [
                    {
                        id: 1, items: [
                            { id: 2 }
                        ]
                    }
                ]
            });

            dataSource.read();

            var root = dataSource.get(1);

            root.children.read();

            dataSource.remove(root.children.get(2));

            assert.isOk(!root.hasChildren);
        });

        it("infer from list", function() {
            var list = $("<ul><li>foo</li><li>bar</li></ul>"),
                dataSource = HierarchicalDataSource.create({
                    list: list,
                    fields: [{ field: "text" }]
                });

            assert.isOk(dataSource instanceof HierarchicalDataSource);

            dataSource.read();

            var data = dataSource.data();

            assert.equal(data.length, 2);
            assert.equal(data[0].text, "foo");
            assert.equal(data[1].text, "bar");
        });

        it("infer from nested list", function() {
            var list = $("<ul><li>foo<ul><li>bar</li></ul></li></ul>"),
                dataSource = HierarchicalDataSource.create({
                    list: list,
                    fields: [{ field: "text" }]
                });

            dataSource.read();

            var data = dataSource.data();

            assert.equal(data.length, 1);
            assert.equal(data[0].text, "foo");
            assert.isOk(data[0].loaded(), "inferred nodes are considered as loaded");

            data[0].children.read();
            var children = data[0].children.data();

            assert.equal(children.length, 1);
            assert.equal(children[0].text, "bar");
            assert.isOk(children[0].loaded(), "inferred child nodes are considered as loaded");
        });

        it("infer from nested list with text wrapper elements", function() {
            var list = $("<ul><li><div>foo</div><ul><li><div>bar</div></li></ul></li></ul>"),
                dataSource = HierarchicalDataSource.create({
                    list: list,
                    fields: [{ field: "text" }]
                });

            dataSource.read();

            var data = dataSource.data();

            assert.equal(data.length, 1);
            assert.equal(data[0].text, "foo");

            data[0].children.read();
            var children = data[0].children.data();

            assert.equal(children.length, 1);
            assert.equal(children[0].text, "bar");
        });

        it("infer of id field", function() {
            var list = $("<ul><li data-id='42'>" +
                "<div><span>foo</span></div>" +
                "</li></ul>"),
                dataSource = HierarchicalDataSource.create({
                    list: list,
                    fields: [{ field: "text" }]
                });

            dataSource.read();

            var data = dataSource.data();

            assert.equal(data.length, 1);
            assert.equal(data[0].id, "42");
        });

        it("infer of nested url / spriteCssClass / imageUrl fields", function() {
            var list = $("<ul><li data-id='7'>" +
                "<div><img class='k-image' src='image.png' />" +
                "<a href='http://kendoui.com/'>" +
                "<span class='k-sprite spriteClass'></span>" +
                "foo</a></div>" +
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

            assert.equal(data.length, 1);

            assert.equal(data[0].id, "7");
            assert.equal(data[0].text, "foo");
            assert.equal(data[0].url, "http://kendoui.com/");
            assert.equal(data[0].spriteCssClass, "spriteClass");
            assert.equal(data[0].imageUrl, "image.png");
        });

        it("infer of plain url fields", function() {
            var list = $("<ul><li>" +
                "<a href='http://kendoui.com/'>" +
                "<span class='k-sprite spriteClass'></span>" +
                "foo</a>" +
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

            assert.equal(data.length, 1);

            assert.equal(data[0].text, "foo");
            assert.equal(data[0].url, "http://kendoui.com/");
            assert.equal(data[0].spriteCssClass, "spriteClass");
        });

        it("infer with custom fields", function() {
            var list = $("<ul><li>foo</li></ul>"),
                dataSource = HierarchicalDataSource.create({
                    list: list,
                    fields: [{ field: "productName" }]
                });

            dataSource.read();

            var data = dataSource.data();

            assert.equal(data.length, 1);
            assert.equal(data[0].productName, "foo");
        });

        it("infer of hasChildren property", function() {
            var list = $("<ul><li data-hasChildren='true'>foo</li></ul>"),
                dataSource = HierarchicalDataSource.create({
                    list: list,
                    fields: [{ field: "text" }]
                });

            dataSource.read();

            var data = dataSource.data();

            assert.equal(data.length, 1);
            assert.equal(data[0].hasChildren, true);
        });

        it("loading items without children does not repopulate their datasource", function() {
            var dataSource = new HierarchicalDataSource({
                data: [
                    {
                        text: "foo", items: [
                            { text: "bar" }
                        ]
                    }
                ]
            });

            dataSource.read();

            var children = dataSource.view()[0].children;
            children.read();
            dataSource.remove(children.view()[0]);

            dataSource.view()[0].load();

            assert.equal(dataSource.view()[0].children.view().length, 0);
        });

        it("added observable objects can be loaded", function() {
            var dataSource = new HierarchicalDataSource({});

            var model = kendo.observable({ text: "bar", hasChildren: true });

            assert.isOk(model = dataSource.add(model));

            model.load();

            assert.isOk(true);
        });

        it("get method works with subitems", function() {
            var dataSource = new HierarchicalDataSource({
                data: [
                    {
                        id: 1, text: "foo", items: [
                            { id: 2, text: "bar" }
                        ]
                    }
                ]
            });

            dataSource.read();

            var children = dataSource.data()[0].children;
            children.read();

            assert.isOk(dataSource.get(2))
            assert.equal(dataSource.get(2).text, children.data()[0].text);
        });

        it("get method works for subitems and custom id field", function() {
            var dataSource = new HierarchicalDataSource({
                data: [
                    {
                        foo: 1, text: "foo", items: [
                            { foo: 2, text: "bar" },
                            { foo: 3, text: "baz" }
                        ]
                    }
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

            assert.isOk(dataSource.get(2))
            assert.equal(dataSource.get(2).text, "bar");
        });

        it("sorting is used when loading child datasources", function() {
            var dataSource = new HierarchicalDataSource({
                data: [
                    {
                        foo: 1, text: "foo", items: [
                            { foo: 3, text: "alpha" },
                            { foo: 2, text: "ghamma" },
                            { foo: 2, text: "alpha" },
                            { foo: 2, text: "beta" }
                        ]
                    }
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

            assert.equal(data[0].text, "alpha");
            assert.equal(data[1].text, "beta");
            assert.equal(data[2].text, "ghamma");
            assert.equal(data[3].text, "alpha");
        });

        it("loading of child datasources updates items field of parent", function() {
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

            assert.isOk("items" in root);
            assert.equal(root.items, root.children.data());
        });
    });

    describe("HierarchicalDataSource : parameterMap", function() {
        beforeEach(function() {
            $.mockjaxSettings.responseTime = 0;
        });
        afterEach(function() {
            $.mockjax.clear();
        });

        function addFoo(data) {
            data.foo = "bar";
            return data;
        }

        it("parameterMap gets called when fetching root nodes", function(done) {
            $.mockjax({
                url: "bar", dataType: "json",
                response: function(e) {
                    assert.equal(e.data.foo, "bar");
                    done();
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

        it("parameterMap gets called when fetching child nodes", function(done) {
            $.mockjax({
                url: "bar", dataType: "json", data: { id: 1 },
                response: function(e) {
                    assert.equal(e.data.foo, "bar");
                    done();
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

        it("child parameterMap gets called when fetching child nodes", function(done) {
            $.mockjax({
                url: "bar", dataType: "json", data: { id: 1 },
                response: function(e) {
                    assert.equal(e.data.foo, "bar");
                    done();
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
                                    assert.equal(type, "read");
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

        it("child datasources inherit fields", function() {
            var dataSource = new HierarchicalDataSource({
                data: [
                    {
                        id: 1, Text: "foo", items: [
                            { id: 2, Text: "bar" }
                        ]
                    }
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

            assert.equal(dataSource.get(2).text, "bar");
        });

        it("Node load returns promise", function() {
            var dataSource = new HierarchicalDataSource({
                transport: {
                    read: function(options) {
                        options.success([{ id: 1, hasChildren: true }]);
                    }
                }
            });

            dataSource.read();

            assert.isOk($.isFunction(dataSource.get(1).load().then));
        });

        it("Node without children resolves load promise immediately", function() {
            var node = new Node({ id: 1 });

            var promise = node.load();

            assert.equal(promise.state(), "resolved");
        });

        it("load resolves promise upon success", function() {
            jasmine.clock().install();

            var deferred;
            var dataSource = new HierarchicalDataSource({
                transport: {
                    read: function(options) {
                        deferred = $.Deferred();
                        deferred.then(function() {
                            options.success([{ id: 1, hasChildren: true }]);
                        });
                    }
                }
            });

            dataSource.read();

            deferred.resolve();

            jasmine.clock().tick();

            var loadPromise = dataSource.get(1).load();

            assert.equal(loadPromise.state(), "pending");

            deferred.resolve();

            jasmine.clock().tick();

            assert.equal(loadPromise.state(), "resolved");

            jasmine.clock().uninstall();
        });

        it("filter method returns correct items", function() {
            var dataSource = new kendo.data.HierarchicalDataSource({
                data: [
                    {
                        text: "Furniture", expanded: true, items: [
                            {
                                text: "Tables & Chairs", expanded: true, items: [
                                    { text: "F1" },
                                    {
                                        text: "S", expanded: false, items: [
                                            { text: "Ff1" },
                                            { text: "Ss1" },
                                            { text: "fF2" }
                                        ]
                                    },
                                    { text: "F2" }
                                ]
                            },
                            { text: "Sofas" },
                            { text: "Occasional Furniture" }
                        ]
                    },
                    {
                        text: "Decor", expanded: true, items: [
                            { text: "Bed Linen" },
                            { text: "Curtains & Blinds" },
                            { text: "Carpets" }
                        ]
                    }
                ]
            });
            dataSource.read();
            dataSource.filter({ field: 'text', operator: 'contains', value: "f" });

            assert.equal(dataSource.view().length, 1);
        });

        it("filter propery returns correct items", function() {
            var dataSource = new kendo.data.HierarchicalDataSource({
                change: function(e) {
                    for (var i = 0; i < e.items.length; i++) {
                        e.items[i].load();
                    }
                },
                filter: { field: 'text', operator: 'contains', value: "ss" },
                data: [
                    {
                        text: "Furniture", expanded: true, items: [
                            {
                                text: "Tables & Chairs", expanded: true, items: [
                                    { text: "F1" },
                                    {
                                        text: "S", expanded: false, items: [
                                            { text: "Ff1" },
                                            { text: "Ss1" },
                                            { text: "fF2" }
                                        ]
                                    },
                                    { text: "F2" }
                                ]
                            },
                            { text: "Sofas" },
                            { text: "Occasional Furniture" }
                        ]
                    },
                    {
                        text: "Decor", expanded: true, items: [
                            { text: "Bed Linen" },
                            { text: "Curtains & Blinds" },
                            { text: "Carpets" }
                        ]
                    }
                ]
            });
            dataSource.fetch();

            assert.equal(dataSource.view().length, 1);
            assert.equal(dataSource.view()[0].children.view().length, 1);
            assert.equal(dataSource.view()[0].children.view()[0].children.view().length, 1);
        });

        it("server filtering true _hierarchicalFilter propery undefined", function() {
            var dataSource = new kendo.data.HierarchicalDataSource({
                serverFiltering: true,
                filter: { field: 'text', operator: 'contains', value: "ss" },
                data: [
                    {
                        text: "Furniture", expanded: true, items: [
                            {
                                text: "Tables & Chairs", expanded: true, items: [
                                    { text: "F1" },
                                    {
                                        text: "S", expanded: false, items: [
                                            { text: "Ff1" },
                                            { text: "Ss1" },
                                            { text: "fF2" }
                                        ]
                                    },
                                    { text: "F2" }
                                ]
                            },
                            { text: "Sofas" },
                            { text: "Occasional Furniture" }
                        ]
                    },
                    {
                        text: "Decor", expanded: true, items: [
                            { text: "Bed Linen" },
                            { text: "Curtains & Blinds" },
                            { text: "Carpets" }
                        ]
                    }
                ]
            });

            assert.equal(dataSource._hierarchicalFilter, undefined);
        });

        it("filter propery returns correct items conjunction", function() {
            var dataSource = new kendo.data.HierarchicalDataSource({
                filter: [{ field: "name", operator: "startswith", value: "John" },
                { field: "name", operator: "contains", value: "Snow" }],
                change: function(e) {
                    e.items[0].load();
                },
                data: [
                    {
                        name: "Jane Doe", items: [
                            { name: "Jane Doe" },
                            { name: "John Snow" },
                            { name: "John Doe" }
                        ]
                    },
                    { name: "John Snow" }
                ]
            });

            dataSource.fetch();
            var view = dataSource.view();

            assert.equal(view.length, 2);
            assert.equal(view[0].name, "Jane Doe");
            assert.equal(view[0].children.view().length, 1);
            assert.equal(view[0].children.view()[0].name, "John Snow");
        });

        it("filter propery returns correct items disjunction", function() {
            var dataSource = new kendo.data.HierarchicalDataSource({
                filter: {
                    logic: "or",
                    filters: [
                        { field: "username", operator: "contains", value: "Snow" },
                        { field: "name", operator: "contains", value: "John" }
                    ]
                },
                change: function(e) {
                    e.items[0].load();
                },
                data: [
                    {
                        name: "Jane Doe", items: [
                            { username: "Jane Doe" },
                            { username: "John Snow" },
                            { username: "John Doe" }
                        ]
                    },
                    { name: "John Snow" }
                ]
            });

            dataSource.fetch();
            var view = dataSource.view();

            assert.equal(view.length, 2);
            assert.equal(view[0].name, "Jane Doe");
            assert.equal(view[0].children.view().length, 1);
            assert.equal(view[0].children.view()[0].username, "John Snow");
        });

        it("filter method returns correct filter", function() {
            var dataSource = new kendo.data.HierarchicalDataSource({
                filter: { field: "name", operator: "startswith", value: "John" },
                change: function(e) {
                    e.items[0].load();
                },
                data: [
                    {
                        name: "Jane Doe", items: [
                            { name: "Jane Doe" },
                            { name: "John Doe" }
                        ]
                    },
                    { name: "John Doe" }
                ]
            });

            dataSource.fetch();
            var filter = dataSource.filter();

            assert.equal(filter.filters[0].operator, "startswith");
            assert.equal(filter.filters[0].field, "name");
            assert.equal(filter.filters[0].value, "John");
        });

        it("filter method returns correct items with different textfields", function() {
            var dataSource = new kendo.data.HierarchicalDataSource({
                data: [
                    {
                        CategoryName: "Tea", items: [
                            { ProductName: "Green Tea" },
                            { ProductName: "Black Tea" }
                        ]
                    },
                    { CategoryName: "Coffee" }
                ]
            });
            dataSource.read();
            dataSource.view()[0].load();
            dataSource.filter({
                logic: "or",
                filters: [
                    { field: "CategoryName", operator: "contains", value: "ff" },
                    {
                        logic: "and",
                        filters: [
                            { field: "ProductName", operator: "contains", value: "gr" }
                        ]
                    }
                ]
            });
            dataSource.view()[0].load();
            assert.equal(dataSource.view().length, 2);
            assert.equal(dataSource.view()[0].children.view().length, 1);
        });

        it("filter method returns correct child items", function() {
            var dataSource = new kendo.data.HierarchicalDataSource({
                data: [
                    {
                        text: "Furniture", expanded: true, items: [
                            {
                                text: "Tables & Chairs", expanded: true, items: [
                                    { text: "F1" },
                                    {
                                        text: "S", expanded: false, items: [
                                            { text: "Ff1" },
                                            { text: "Ss1" },
                                            { text: "fF2" }
                                        ]
                                    },
                                    { text: "F2" }
                                ]
                            },
                            { text: "Sofas" },
                            { text: "Occasional Furniture" }
                        ]
                    },
                    {
                        text: "Decor", expanded: true, items: [
                            { text: "Bed Linen" },
                            { text: "Curtains & Blinds" },
                            { text: "Carpets" }
                        ]
                    }
                ]
            });
            dataSource.read();

            dataSource.view()[0].load();
            dataSource.filter({ field: 'text', operator: 'contains', value: "fa" });
            dataSource.view()[0].load();
            assert.equal(dataSource.view()[0].children.view().length, 1);
        });

        it("clear filter method returns correct child items", function() {
            var dataSource = new kendo.data.HierarchicalDataSource({
                data: [
                    {
                        text: "Furniture", expanded: true, items: [
                            {
                                text: "Tables & Chairs", expanded: true, items: [
                                    { text: "F1" },
                                    {
                                        text: "S", expanded: false, items: [
                                            { text: "Ff1" },
                                            { text: "Ss1" },
                                            { text: "fF2" }
                                        ]
                                    },
                                    { text: "F2" }
                                ]
                            },
                            { text: "Sofas" },
                            { text: "Occasional Furniture" }
                        ]
                    },
                    {
                        text: "Decor", expanded: true, items: [
                            { text: "Bed Linen" },
                            { text: "Curtains & Blinds" },
                            { text: "Carpets" }
                        ]
                    }
                ]
            });
            dataSource.read();

            dataSource.view()[0].load();
            dataSource.filter({ field: 'text', operator: 'contains', value: "fa" });
            dataSource.view()[0].load();
            assert.equal(dataSource.view()[0].children.view().length, 1);

            dataSource.filter({});

            dataSource.view()[0].load();
            assert.equal(dataSource.view()[0].children.view().length, 3);
        });

        it("filter method returns correct grand child items", function() {
            var dataSource = new kendo.data.HierarchicalDataSource({
                data: [
                    {
                        text: "Furniture", expanded: true, items: [
                            {
                                text: "Tables & Chairs", expanded: true, items: [
                                    { text: "F1" },
                                    {
                                        text: "S", expanded: false, items: [
                                            { text: "Ff1" },
                                            { text: "Ss1" },
                                            { text: "fF2" }
                                        ]
                                    },
                                    { text: "F2" }
                                ]
                            },
                            { text: "Sofas" },
                            { text: "Occasional Furniture" }
                        ]
                    },
                    {
                        text: "Decor", expanded: true, items: [
                            { text: "Bed Linen" },
                            { text: "Curtains & Blinds" },
                            { text: "Carpets" }
                        ]
                    }
                ]
            });
            dataSource.read();

            dataSource.view()[0].load();
            dataSource.view()[0].children.view()[0].load();
            dataSource.view()[0].children.view()[0].children.view()[1].load();
            dataSource.filter({ field: 'text', operator: 'contains', value: "ff" });
            dataSource.view()[0].load();
            dataSource.view()[0].children.view()[0].load();
            dataSource.view()[0].children.view()[0].children.view()[0].load();
            assert.equal(dataSource.view()[0].children.view().length, 1);
            assert.equal(dataSource.view()[0].children.view()[0].children.view().length, 1);
            assert.equal(dataSource.view()[0].children.view()[0].children.view()[0].children.view().length, 2);
        });

    });
}());
