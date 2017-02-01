(function() {
    var HierarchicalDataSource = kendo.data.HierarchicalDataSource;
    var createPanelBar = PanelBarHelpers.fromOptions;
    var panelbarFromHtml = PanelBarHelpers.fromHtml;

    module("DataSource binding", PanelBarHelpers.noAnimationModule);

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

    test("Initializing from JSON creates HierarchicalDataSource", function() {
        createPanelBar([]);

        ok(panelbarObject.dataSource instanceof HierarchicalDataSource);
    });

    test("Initializing from JSON populates dataSource", function() {
        createPanelBar([
            { text: "foo" },
            { text: "bar" }
        ]);

        equal(panelbarObject.dataSource.view().length, 2);
    });

    test("Adding items to the datasource adds them to the panelbar", function() {
        
        createPanelBar([
            { text: "foo" }
        ]);

        panelbarObject.dataSource.add({ text: "bar" });

        equal(panelbar.find(".k-item").length, 2);
    });

    test("Adding items to the datasource adds them to the proper level", function() {
        createPanelBar([
            { id: 1, text: "foo" },
            { id: 2, text: "bar" }
        ]);

        var foo = panelbarObject.dataSource.get(1);

        foo.append({ id: 3, text: "baz" });

        equal(panelbar.find(".k-item").length, 3);
        equal(panelbar.find(".k-item:first .k-item").length, 1);
    });

    test("Removing items from the datasource removes them from the panelbar", function() {
        createPanelBar([
            { text: "foo" }
        ]);

        var dataItem = panelbarObject.dataItem(panelbar.find(".k-item"));

        panelbarObject.dataSource.remove(dataItem);

        equal(panelbar.find(".k-item").length, 0);
    });

    test("Removing subgroup items from the datasource removes them from the panelbar", function() {
        createPanelBar({
                loadOnDemand: false,
                dataSource:[
            { text: "foo", items: [
                { text: "bar" }
            ] }
                ]
        });

        var dataItem = panelbarObject.dataItem(panelbar.find(".k-group").find(".k-item:last"));

        panelbarObject.dataSource.remove(dataItem);

        equal(panelbar.find(".k-item").length, 1);
    });

    test("DataSource as an object", 2, function() {
        createPanelBar({
            dataSource: {
                data: [
                    { text: "foo" }
                ]
            }
        });

        var item = panelbar.find(".k-item");

        equal(item.length, 1);

         equal(panelbarObject.element.children("li").first().text(), "foo");
    });

    test("Passing existing dataSource", function() {
        var dataSource = new HierarchicalDataSource({
            data: [
                { text: "foo" }
            ]
        });

        createPanelBar({
            dataSource: dataSource
        });

        var item = panelbar.find(".k-item");

        equal(item.length, 1);
       equal(panelbarObject.element.children("li").first().text(), "foo");
    });

    test("Removing items from the datasource removes them from the panelbar at the proper level", function() {
         createPanelBar({
                loadOnDemand: false,
                dataSource:[
            { text: "foo", items: [
                { text: "bar" }
            ] }
                ]
        });

        var dataItem = panelbarObject.dataItem(panelbar.find(".k-item:last"));

        panelbarObject.dataSource.remove(dataItem);

        equal(panelbar.find(".k-item").length, 1);

    });

    test("Loading root nodes from remote datasource inserts them in the PanelBar", function() {
        createPanelBar({
            dataSource: {
                transport: {
                    read: function(options) {
                        options.success([ { id: 1, text: "foo" } ]);
                    }
                }
            }
        });

        var item = panelbar.find(".k-item");

        equal(item.length, 1);
        equal(panelbarObject.element.children("li").first().text(), "foo");
    });

    test("Non-leaf nodes are rendered as expandable", function() {
        var i = 1;

        createPanelBar({
            dataSource: {
                transport: {
                    read: function(options) {
                        options.success([ { id: i++, hasChildren: true, text: "foo" } ]);
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

        equal(icon.length, 1);
    });

    test("Expanding non-leaf nodes loads subgroups", function() {
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

        equal(panelbar.find(".k-item").length, 2);
        equal(panelbar.find(".k-panelbar-collapse").length, 1);
    });

    test("Sorting the datasource sorts the panelbar", function() {
        createPanelBar([
            { text: "bravo" },
            { text: "alpha" }
        ]);

        panelbarObject.dataSource.sort({ field: "text", dir: "asc" });

        var items = panelbar.find(".k-item");

        equal(items.length, 2);
        equal(items.eq(0).text(), "alpha");
        equal(items.eq(1).text(), "bravo");
    });

    test("Sorting expanded nodes persists their expanded state", function() {
        createPanelBar({
            dataSource: [
                { text: "alpha", expanded: true, items: [
                    { text: "charlie" },
                    { text: "bravo" }
                ] }
            ]
        });

        panelbarObject.dataSource.sort({ field: "text", dir: "asc" });

        var items = panelbar.find(".k-item");

        equal(items.length, 3);
       equal(items.eq(0).children(".k-link").text(), "alpha");

        var subitems = items.eq(0).find(".k-item");
        equal(subitems.length, 2);
        equal(subitems.eq(0).text(), "charlie");
        equal(subitems.eq(1).text(), "bravo");
    });

    test("Sorting dynamically expanded nodes persists their expanded state", function() {
        createPanelBar([
            { text: "alpha", items: [
                { text: "charlie" },
                { text: "bravo" }
            ] }
        ]);

        panelbarObject.expand(".k-item:first");

        panelbarObject.dataSource.sort({ field: "text", dir: "asc" });

        var items = panelbar.find(".k-item");

        equal(items.length, 3);
        equal(items.eq(0).children(".k-link").text(), "alpha");

        var subitems = items.eq(0).find(".k-item");
        equal(subitems.length, 2);
        equal(subitems.parent().css("display"), "block");
        equal(subitems.eq(0).text(), "charlie");
        equal(subitems.eq(1).text(), "bravo");
    });

    test("the current datasource view is used when refreshing the datasource", function() {
        createPanelBar([
            { text: "alpha" },
            { text: "bravo" }
        ]);

        panelbarObject.dataSource.filter({ field: "text", operator: "eq", value: "alpha" });

        panelbarObject.dataSource.read();

        equal(panelbar.find(".k-item").length, 1);
    });

    test("setting autoBind to false does not fetch the dataSource", function() {
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

        ok(!changeTriggered);
    });

    test("sorting subnodes behaves correctly", function() {
        createPanelBar({
            dataSource: [
                { text: "alpha", items: [
                    { text: "charlie" },
                    { text: "bravo" }
                ] }
            ]
        });

        panelbarObject.dataItem(".k-item:first").children.sort({ field: "text", dir: "asc" });

        equal(panelbar.find(".k-item:first .k-item").length, 2);
    });

    test("updating dataItem text updates the panelbar", function() {
        createPanelBar([
            { id: 1, text: "foo" }
        ]);

        var foo = panelbarObject.element.children("li").first();
        panelbarObject.dataItem(foo).set("text", "bar");

        equal(panelbarObject.element.children("li").first().text(), "bar");
    });

    test("updating dataItem text updates the panelbar and regards dataTextField", function() {
        createPanelBar({
            dataTextField: "foo",
            dataSource: [
                { id: 1, text: "unused", foo: "bar" }
            ]
        });

        var bar = panelbarObject.element.children("li").first();
        panelbarObject.dataItem(bar).set("foo", "baz");

        equal(panelbarObject.element.children("li").first().text(), "baz");
    });

    test("dataTextField as array accessor", function() {
        createPanelBar({
            dataTextField: "['foo']",
            dataSource: [
                { id: 1, text: "unused", foo: "bar" }
            ]
        });

        equal(panelbar.text(), "bar");
    });

    test("complex dataTextField is evaluated with getter", function() {
        createPanelBar({
            dataTextField: "Product.Name",
            dataSource: [
                { id: 1, Product: { Name: "bar" } }
            ]
        });

        equal(panelbar.text(), "bar");
    });

    test("initially expanded items query the child datasources", function() {
        createPanelBar({
            dataSource: new HierarchicalDataSource({
                data: [
                    { text: "foo", expanded: true, items: [
                        { text: "bar" }
                    ] }
                ]
            })
        });

        equal(panelbar.find(".k-item").length, 2);
    });

    test("setDataSource sets new datasource", function() {
        createPanelBar([
            { text: "foo" }
        ]);

        panelbarObject.setDataSource(new HierarchicalDataSource({
            data: [
                { text: "bar" }
            ]
        }));

        equal(panelbar.find(".k-item").text(), "bar");
    });

    test("setDataSource does not fetch data when autoBind is false", function() {
        createPanelBar({
            autoBind: false
        });

        panelbarObject.setDataSource(new HierarchicalDataSource({
            data: [
                { text: "bar" }
            ]
        }));

        equal(panelbarObject.dataSource.view().length, 0);
    });

    var Node = kendo.data.Node;

    test("binding to derived nodes", function() {
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

        equal(panelbar.find(".k-item").text(), "foo");
    });

    test("binding to hierarchy of derived nodes", function() {
        var ExtendedNode = Node.define({
            extension: true
        });

        createPanelBar({
            dataSource: {
                data: [
                    new ExtendedNode({ text: "foo", items: [
                        new ExtendedNode({ text: "bar" })
                    ] })
                ]
            },

            loadOnDemand: false
        });

        equal(panelbar.find(".k-item:last").text(), "bar");
    });

    test("appending through node api does not expand item and group", function() {
        var ExtendedNode = Node.define({
            extension: true,
            expanded: false
        });

        var foo = new ExtendedNode({ text: "foo" });

        createPanelBar({
            dataSource: {
                data: [ foo ]
            },

            loadOnDemand: false
        });

        foo.append(new ExtendedNode({ text: "bar" }));

        ok(!panelbar.find(".k-item .k-group").is(":visible"));
    });

    test("populating hierarchical datasource before initialization", function() {
        var root = new Node({ text: "foo", expanded: true });

        var child = new Node({ text: "bar" });

        root.append(child);

        createPanelBar({
            dataSource: {
                data: [root]
            },

            loadOnDemand: false
        });

        equal(panelbar.find(".k-item").length, 2);
    });

    test("items without children do not initialize empty datasource", function() {
        var root = new Node({ text: "foo" });

        createPanelBar({
            dataSource: {
                data: [root]
            },

            loadOnDemand: false
        });

        ok(!root.children);
    });

    test("binding to HDS in observable object", function() {
        var viewModel = new kendo.observable({
            panelbarData: new kendo.data.HierarchicalDataSource({
                data: [
                    { text: "Storage", items: [
                        { text: "Wall Shelving" },
                        { text: "Floor Shelving" },
                        { text: "Kids Storage" }
                    ] },
                    { text: "Lights", items: [
                        { text: "Ceiling" },
                        { text: "Table" },
                        { text: "Floor" }
                    ] }
                ]
            })
        });

        createPanelBar({
            dataSource: viewModel.panelbarData
        });

        equal(panelbar.find(".k-item").length, 2);
    });

    test("re-fetching a node removes subgroup", function() {
        var i = 1;

        createPanelBar({
            animation: false,
            dataSource: {
                transport: {
                    read: function(options) {
                        options.success([ { id: i++, hasChildren: true, text: "foo" } ]);
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

        ok(!panelbar.find(".k-item:first .k-group").attr("marked"));
    });

    test("collapse method does not fetch data from server", function() {
        var calls = 0;

        var dataFor = {
            "root": [ { id: 1, text: "foo", hasChildren: true } ],
            1: [ { id: 2, text: "bar", hasChildren: false } ]
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

        equal(calls, 2);
    });

    test("returning an empty response from the server removes the expand icon", function() {
        var dataFor = {
            "root": [ { id: 1, text: "foo", hasChildren: true } ],
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

        equal(panelbar.find(".k-icon").length, 0);
    });

    test("append sets hasChildren flag", function() {
        createPanelBar([
            { text: "foo", hasChildren: false }
        ]);

        var foo = $(".k-item");

        panelbarObject.append({ text: "bar" }, foo);

        ok(panelbarObject.dataItem(foo).hasChildren);
    });

    test("appending to collapsed item", function() {
        createPanelBar({
             loadOnDemand: false,
            dataSource: new HierarchicalDataSource({
                data: [
                    { text: "foo", items: [
                        { text: "bar" }
                    ] }
                ]
            })
        });

        var foo = $(".k-item:first");

        panelbarObject.append({ text: "baz" }, foo);

        var items = foo.find(".k-item");

        equal(items.length, 2);
        equal(foo.find("li").first().text(), "bar");
        equal(foo.find("li").eq(1).text(), "baz");
    });

    test("pushUpdate updates root node", function() {
        createPanelBar({
            dataSource: {
                data: [
                    { id: 1, text: "foo" },
                    { id: 2, text: "bar" }
                ]
            }
        });

        panelbarObject.dataSource.pushUpdate({ id: 2, text: "baz" });

        equal(panelbar.find(".k-item").length, 2);
        equal(panelbar.find(".k-item:last").text(), "baz");
    });

    test("pushUpdate updates custom field in template", function() {
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

        equal(panelbarObject.element.children("li").last().text(), "baz");
    });

    test("pushUpdate updates child node", function() {
        createPanelBar({
            dataSource: [
                { id: 1, text: "foo", items: [
                    { id: 2, text: "bar" }
                ] }
            ]
        });

        panelbarObject.dataSource.pushUpdate({ id: 2, text: "baz" });

        equal(panelbar.find(".k-item").length, 2);
        equal(panelbarObject.element.children("li").last().text(), "baz");
    });

    test("dataSource can be searched within dataBound handler", 2, function() {
        jasmine.clock().install();
        var read = controlledRead();

        createPanelBar({
            dataSource: { transport: { read: read } },
            dataBound: function() {
                ok(this.dataSource.get(1));
                ok(!this.dataSource.get(2));
            }
        });

        read.resolve([ { id: 1, expanded: true, hasChildren: true } ]);
        jasmine.clock().tick();
        jasmine.clock().uninstall();
    });
   
})();
