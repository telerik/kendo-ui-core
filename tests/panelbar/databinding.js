(function() {
    var HierarchicalDataSource = kendo.data.HierarchicalDataSource;
    var createPanelBar = PanelBarHelpers.fromOptions;
    var panelbarFromHtml = PanelBarHelpers.fromHtml;

    describe("DataSource binding", function() {

        afterEach(function() {
            PanelBarHelpers.destroy();
        });

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

        it("Initializing from JSON creates HierarchicalDataSource", function() {
            createPanelBar([]);

            assert.isOk(panelbarObject.dataSource instanceof HierarchicalDataSource);
        });

        it("Initializing from JSON populates dataSource", function() {
            createPanelBar([
                { text: "foo" },
                { text: "bar" }
            ]);

            assert.equal(panelbarObject.dataSource.view().length, 2);
        });

        it("Adding items to the datasource adds them to the panelbar", function() {

            createPanelBar([
                { text: "foo" }
            ]);

            panelbarObject.dataSource.add({ text: "bar" });

            assert.equal(panelbar.find(".k-item").length, 2);
        });

        it("Adding items to the datasource adds them to the proper level", function() {
            createPanelBar([
                { id: 1, text: "foo" },
                { id: 2, text: "bar" }
            ]);

            var foo = panelbarObject.dataSource.get(1);

            foo.append({ id: 3, text: "baz" });

            assert.equal(panelbar.find(".k-item").length, 3);
            assert.equal(panelbar.find(".k-item:first .k-item").length, 1);
        });

        it("Removing items from the datasource removes them from the panelbar", function() {
            createPanelBar([
                { text: "foo" }
            ]);

            var dataItem = panelbarObject.dataItem(panelbar.find(".k-item"));

            panelbarObject.dataSource.remove(dataItem);

            assert.equal(panelbar.find(".k-item").length, 0);
        });

        it("Removing subgroup items from the datasource removes them from the panelbar", function() {
            createPanelBar({
                loadOnDemand: false,
                dataSource: [
                    {
                        text: "foo", items: [
                            { text: "bar" }
                        ]
                    }
                ]
            });

            var dataItem = panelbarObject.dataItem(panelbar.find(".k-group").find(".k-item:last"));

            panelbarObject.dataSource.remove(dataItem);

            assert.equal(panelbar.find(".k-item").length, 1);
        });

        it("DataSource as an object", function() {
            createPanelBar({
                dataSource: {
                    data: [
                        { text: "foo" }
                    ]
                }
            });

            var item = panelbar.find(".k-item");

            assert.equal(item.length, 1);

            assert.equal(panelbarObject.element.children("li").first().text(), "foo");
        });

        it("Passing existing dataSource", function() {
            var dataSource = new HierarchicalDataSource({
                data: [
                    { text: "foo" }
                ]
            });

            createPanelBar({
                dataSource: dataSource
            });

            var item = panelbar.find(".k-item");

            assert.equal(item.length, 1);
            assert.equal(panelbarObject.element.children("li").first().text(), "foo");
        });

        it("Removing items from the datasource removes them from the panelbar at the proper level", function() {
            createPanelBar({
                loadOnDemand: false,
                dataSource: [
                    {
                        text: "foo", items: [
                            { text: "bar" }
                        ]
                    }
                ]
            });

            var dataItem = panelbarObject.dataItem(panelbar.find(".k-item:last"));

            panelbarObject.dataSource.remove(dataItem);

            assert.equal(panelbar.find(".k-item").length, 1);

        });

        it("Loading root nodes from remote datasource inserts them in the PanelBar", function() {
            createPanelBar({
                dataSource: {
                    transport: {
                        read: function(options) {
                            options.success([{ id: 1, text: "foo" }]);
                        }
                    }
                }
            });

            var item = panelbar.find(".k-item");

            assert.equal(item.length, 1);
            assert.equal(panelbarObject.element.children("li").first().text(), "foo");
        });

        it("Non-leaf nodes are rendered as expandable", function() {
            var i = 1;

            createPanelBar({
                dataSource: {
                    transport: {
                        read: function(options) {
                            options.success([{ id: i++, hasChildren: true, text: "foo" }]);
                        }
                    },
                    schema: {
                        model: {
                            hasChildren: "hasChildren"
                        }
                    }
                }
            });

            var icon = panelbar.find(".k-panelbar-expand");

            assert.equal(icon.length, 1);
        });

        it("Expanding non-leaf nodes loads subgroups", function() {
            var i = 0;

            function readAction(options) {
                i++;

                options.success([
                    { id: i, hasChildren: i === 1, text: "foo " + i }
                ]);
            }

            createPanelBar({
                dataSource: {
                    transport: {
                        read: readAction
                    },
                    schema: {
                        model: {
                            hasChildren: "hasChildren"
                        }
                    }
                },
                animation: false
            });

            panelbarObject.expand(panelbar.find(".k-item"));

            assert.equal(panelbar.find(".k-item").length, 2);
            assert.equal(panelbar.find(".k-panelbar-collapse").length, 1);
        });

        it("Sorting the datasource sorts the panelbar", function() {
            createPanelBar([
                { text: "bravo" },
                { text: "alpha" }
            ]);

            panelbarObject.dataSource.sort({ field: "text", dir: "asc" });

            var items = panelbar.find(".k-item");

            assert.equal(items.length, 2);
            assert.equal(items.eq(0).text(), "alpha");
            assert.equal(items.eq(1).text(), "bravo");
        });

        it("Sorting expanded nodes persists their expanded state", function() {
            createPanelBar({
                dataSource: [
                    {
                        text: "alpha", expanded: true, items: [
                            { text: "charlie" },
                            { text: "bravo" }
                        ]
                    }
                ]
            });

            panelbarObject.dataSource.sort({ field: "text", dir: "asc" });

            var items = panelbar.find(".k-item");

            assert.equal(items.length, 3);
            assert.equal(items.eq(0).children(".k-link").text(), "alpha");

            var subitems = items.eq(0).find(".k-item");
            assert.equal(subitems.length, 2);
            assert.equal(subitems.eq(0).text(), "charlie");
            assert.equal(subitems.eq(1).text(), "bravo");
        });

        it("Sorting dynamically expanded nodes persists their expanded state", function() {
            createPanelBar([
                {
                    text: "alpha", items: [
                        { text: "charlie" },
                        { text: "bravo" }
                    ]
                }
            ]);

            panelbarObject.expand(".k-item:first");

            panelbarObject.dataSource.sort({ field: "text", dir: "asc" });

            var items = panelbar.find(".k-item");

            assert.equal(items.length, 3);
            assert.equal(items.eq(0).children(".k-link").text(), "alpha");

            var subitems = items.eq(0).find(".k-item");
            assert.equal(subitems.length, 2);
            assert.equal(subitems.parent().css("display"), "block");
            assert.equal(subitems.eq(0).text(), "charlie");
            assert.equal(subitems.eq(1).text(), "bravo");
        });

        it("the current datasource view is used when refreshing the datasource", function() {
            createPanelBar([
                { text: "alpha" },
                { text: "bravo" }
            ]);

            panelbarObject.dataSource.filter({ field: "text", operator: "eq", value: "alpha" });

            panelbarObject.dataSource.read();

            assert.equal(panelbar.find(".k-item").length, 1);
        });

        it("setting autoBind to false does not fetch the dataSource", function() {
            var changeTriggered = false,
                dataSource = new HierarchicalDataSource({
                    items: [
                        { text: "alpha" },
                        { text: "bravo" }
                    ],
                    change: function() {
                        changeTriggered = true;
                    }
                });

            createPanelBar({
                autoBind: false,
                dataSource: dataSource
            });

            assert.isOk(!changeTriggered);
        });

        it("sorting subnodes behaves correctly", function() {
            createPanelBar({
                dataSource: [
                    {
                        text: "alpha", items: [
                            { text: "charlie" },
                            { text: "bravo" }
                        ]
                    }
                ]
            });

            panelbarObject.dataItem(".k-item:first").children.sort({ field: "text", dir: "asc" });

            assert.equal(panelbar.find(".k-item:first .k-item").length, 2);
        });

        it("updating dataItem text updates the panelbar", function() {
            createPanelBar([
                { id: 1, text: "foo" }
            ]);

            var foo = panelbarObject.element.children("li").first();
            panelbarObject.dataItem(foo).set("text", "bar");

            assert.equal(panelbarObject.element.children("li").first().text(), "bar");
        });

        it("updating dataItem text updates the panelbar and regards dataTextField", function() {
            createPanelBar({
                dataTextField: "foo",
                dataSource: [
                    { id: 1, text: "unused", foo: "bar" }
                ]
            });

            var bar = panelbarObject.element.children("li").first();
            panelbarObject.dataItem(bar).set("foo", "baz");

            assert.equal(panelbarObject.element.children("li").first().text(), "baz");
        });

        it("dataTextField as array accessor", function() {
            createPanelBar({
                dataTextField: "['foo']",
                dataSource: [
                    { id: 1, text: "unused", foo: "bar" }
                ]
            });

            assert.equal(panelbar.text(), "bar");
        });

        it("complex dataTextField is evaluated with getter", function() {
            createPanelBar({
                dataTextField: "Product.Name",
                dataSource: [
                    { id: 1, Product: { Name: "bar" } }
                ]
            });

            assert.equal(panelbar.text(), "bar");
        });

        it("initially expanded items query the child datasources", function() {
            createPanelBar({
                dataSource: new HierarchicalDataSource({
                    data: [
                        {
                            text: "foo", expanded: true, items: [
                                { text: "bar" }
                            ]
                        }
                    ]
                })
            });

            assert.equal(panelbar.find(".k-item").length, 2);
        });

        it("setDataSource sets new datasource", function() {
            createPanelBar([
                { text: "foo" }
            ]);

            panelbarObject.setDataSource(new HierarchicalDataSource({
                data: [
                    { text: "bar" }
                ]
            }));

            assert.equal(panelbar.find(".k-item").text(), "bar");
        });

        it("setDataSource does not fetch data when autoBind is false", function() {
            createPanelBar({
                autoBind: false
            });

            panelbarObject.setDataSource(new HierarchicalDataSource({
                data: [
                    { text: "bar" }
                ]
            }));

            assert.equal(panelbarObject.dataSource.view().length, 0);
        });

        var Node = kendo.data.Node;

        it("binding to derived nodes", function() {
            var ExtendedNode = Node.define({
                extension: true
            });

            createPanelBar({
                dataSource: {
                    data: [
                        new ExtendedNode({ text: "foo" })
                    ]
                }
            });

            assert.equal(panelbar.find(".k-item").text(), "foo");
        });

        it("binding to hierarchy of derived nodes", function() {
            var ExtendedNode = Node.define({
                extension: true
            });

            createPanelBar({
                dataSource: {
                    data: [
                        new ExtendedNode({
                            text: "foo", items: [
                                new ExtendedNode({ text: "bar" })
                            ]
                        })
                    ]
                },

                loadOnDemand: false
            });

            assert.equal(panelbar.find(".k-item:last").text(), "bar");
        });

        it("appending through node api does not expand item and group", function() {
            var ExtendedNode = Node.define({
                extension: true,
                expanded: false
            });

            var foo = new ExtendedNode({ text: "foo" });

            createPanelBar({
                dataSource: {
                    data: [foo]
                },

                loadOnDemand: false
            });

            foo.append(new ExtendedNode({ text: "bar" }));

            assert.isOk(!panelbar.find(".k-item .k-group").is(":visible"));
        });

        it("populating hierarchical datasource before initialization", function() {
            var root = new Node({ text: "foo", expanded: true });

            var child = new Node({ text: "bar" });

            root.append(child);

            createPanelBar({
                dataSource: {
                    data: [root]
                },

                loadOnDemand: false
            });

            assert.equal(panelbar.find(".k-item").length, 2);
        });

        it("items without children do not initialize empty datasource", function() {
            var root = new Node({ text: "foo" });

            createPanelBar({
                dataSource: {
                    data: [root]
                },

                loadOnDemand: false
            });

            assert.isOk(!root.children);
        });

        it("binding to HDS in observable object", function() {
            var viewModel = new kendo.observable({
                panelbarData: new kendo.data.HierarchicalDataSource({
                    data: [
                        {
                            text: "Storage", items: [
                                { text: "Wall Shelving" },
                                { text: "Floor Shelving" },
                                { text: "Kids Storage" }
                            ]
                        },
                        {
                            text: "Lights", items: [
                                { text: "Ceiling" },
                                { text: "Table" },
                                { text: "Floor" }
                            ]
                        }
                    ]
                })
            });

            createPanelBar({
                dataSource: viewModel.panelbarData
            });

            assert.equal(panelbar.find(".k-item").length, 2);
        });

        it("re-fetching a node removes subgroup", function() {
            var i = 1;

            createPanelBar({
                animation: false,
                dataSource: {
                    transport: {
                        read: function(options) {
                            options.success([{ id: i++, hasChildren: true, text: "foo" }]);
                        }
                    },
                    schema: {
                        model: {
                            hasChildren: "hasChildren"
                        }
                    }
                },
                expand: function(e) {
                    var dataItem = this.dataItem(e.item);
                    dataItem.loaded(false);
                }
            });

            panelbarObject.expand(".k-item");

            panelbarObject.collapse(".k-item:first");

            panelbar.find(".k-item .k-group").attr("marked", "marked");

            panelbarObject.expand(".k-item:first");

            assert.isOk(!panelbar.find(".k-item:first .k-group").attr("marked"));
        });

        it("collapse method does not fetch data from server", function() {
            var calls = 0;

            var dataFor = {
                "root": [{ id: 1, text: "foo", hasChildren: true }],
                1: [{ id: 2, text: "bar", hasChildren: false }]
            };

            createPanelBar({
                dataSource: {
                    transport: {
                        read: function(options) {
                            calls++;
                            options.success(dataFor[options.data.id || "root"]);
                        }
                    }
                }
            });

            panelbarObject.expand(".k-item");
            panelbarObject.collapse(".k-item");

            assert.equal(calls, 2);
        });

        it("returning an empty response from the server removes the expand icon", function() {
            var dataFor = {
                "root": [{ id: 1, text: "foo", hasChildren: true }],
                1: []
            };

            createPanelBar({
                dataSource: {
                    transport: {
                        read: function(options) {
                            options.success(dataFor[options.data.id || "root"]);
                        }
                    }
                }
            });

            panelbarObject.expand(".k-item");

            assert.equal(panelbar.find(".k-icon").length, 0);
        });

        it("append sets hasChildren flag", function() {
            createPanelBar([
                { text: "foo", hasChildren: false }
            ]);

            var foo = $(".k-item");

            panelbarObject.append({ text: "bar" }, foo);

            assert.isOk(panelbarObject.dataItem(foo).hasChildren);
        });

        it("appending to collapsed item", function() {
            createPanelBar({
                loadOnDemand: false,
                dataSource: new HierarchicalDataSource({
                    data: [
                        {
                            text: "foo", items: [
                                { text: "bar" }
                            ]
                        }
                    ]
                })
            });

            var foo = $(".k-item:first");

            panelbarObject.append({ text: "baz" }, foo);

            var items = foo.find(".k-item");

            assert.equal(items.length, 2);
            assert.equal(foo.find("li").first().text(), "bar");
            assert.equal(foo.find("li").eq(1).text(), "baz");
        });

        it("pushUpdate updates root node", function() {
            createPanelBar({
                dataSource: {
                    data: [
                        { id: 1, text: "foo" },
                        { id: 2, text: "bar" }
                    ]
                }
            });

            panelbarObject.dataSource.pushUpdate({ id: 2, text: "baz" });

            assert.equal(panelbar.find(".k-item").length, 2);
            assert.equal(panelbar.find(".k-item:last").text(), "baz");
        });

        it("pushUpdate updates custom field in template", function() {
            createPanelBar({
                dataTextField: "foo",
                template: "#: item.bar #",
                dataSource: {
                    data: [
                        { id: 1, bar: "foo" },
                        { id: 2, bar: "bar" }
                    ]
                }
            });

            panelbarObject.dataSource.pushUpdate({ id: 2, bar: "baz" });

            assert.equal(panelbarObject.element.children("li").last().text(), "baz");
        });

        it("pushUpdate updates child node", function() {
            createPanelBar({
                dataSource: [
                    {
                        id: 1, text: "foo", items: [
                            { id: 2, text: "bar" }
                        ]
                    }
                ]
            });

            panelbarObject.dataSource.pushUpdate({ id: 2, text: "baz" });

            assert.equal(panelbar.find(".k-item").length, 2);
            assert.equal(panelbarObject.element.children("li").last().text(), "baz");
        });

        it("dataSource can be searched within dataBound handler", function() {
            jasmine.clock().install();
            var read = controlledRead();

            createPanelBar({
                dataSource: { transport: { read: read } },
                dataBound: function() {
                    assert.isOk(this.dataSource.get(1));
                    assert.isOk(!this.dataSource.get(2));
                }
            });

            read.resolve([{ id: 1, expanded: true, hasChildren: true }]);
            jasmine.clock().tick();
            jasmine.clock().uninstall();
        });

    });
}());
