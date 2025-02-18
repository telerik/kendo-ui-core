import { asyncTest } from '../../helpers/unit/async-utils.js';
import { PanelBarHelpers } from '../../helpers/unit/panelbar-utils.js';

let HierarchicalDataSource = kendo.data.HierarchicalDataSource;
let createPanelBar = PanelBarHelpers.fromOptions,
    getPanelBarObject = PanelBarHelpers.getPanelBarObject;

describe("DataSource binding", function() {
    beforeEach(function() {
    });

    afterEach(function() {
        PanelBarHelpers.destroy();
    });

    function controlledRead() {
        let queue = [];

        let read = function(options) {
            let deferred = $.Deferred();

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
        let panelbar = createPanelBar([]);

        assert.isOk(getPanelBarObject(panelbar).dataSource instanceof HierarchicalDataSource);
    });

    it("Initializing from JSON populates dataSource", function() {
        let panelbar = createPanelBar([
            { text: "foo" },
            { text: "bar" }
        ]);

        assert.equal(getPanelBarObject(panelbar).dataSource.view().length, 2);
    });

    it("Adding items to the datasource adds them to the panelbar", function() {

        let panelbar = createPanelBar([
            { text: "foo" }
        ]);

        getPanelBarObject(panelbar).dataSource.add({ text: "bar" });

        assert.equal(panelbar.find(".k-panelbar-item").length, 2);
    });


    it("Adding items to the datasource adds them to the proper level", function() {
        let panelbar = createPanelBar([
            { id: 1, text: "foo" },
            { id: 2, text: "bar" }
        ]);

        let foo = getPanelBarObject(panelbar).dataSource.get(1);

        foo.append({ id: 3, text: "baz" });

        assert.equal(panelbar.find(".k-panelbar-item").length, 3);
        assert.equal(panelbar.find(".k-panelbar-item:first .k-panelbar-item").length, 1);
    });

    it("Removing items from the datasource removes them from the panelbar", function() {
        let panelbar = createPanelBar([
            { text: "foo" }
        ]);

        let dataItem = getPanelBarObject(panelbar).dataItem(panelbar.find(".k-panelbar-item"));

        getPanelBarObject(panelbar).dataSource.remove(dataItem);

        assert.equal(panelbar.find(".k-panelbar-item").length, 0);
    });

    it("Removing subgroup items from the datasource removes them from the panelbar", function() {
        let panelbar = createPanelBar({
            loadOnDemand: false,
            dataSource: [
                {
                    text: "foo", items: [
                        { text: "bar" }
                    ]
                }
            ]
        });

        let dataItem = getPanelBarObject(panelbar).dataItem(panelbar.find(".k-panelbar-group").find(".k-panelbar-item:last"));

        getPanelBarObject(panelbar).dataSource.remove(dataItem);

        assert.equal(panelbar.find(".k-panelbar-item").length, 1);
    });

    it("DataSource as an object", function() {
        let panelbar = createPanelBar({
            dataSource: {
                data: [
                    { text: "foo" }
                ]
            }
        });

        let item = panelbar.find(".k-panelbar-item");

        assert.equal(item.length, 1);

        assert.equal(getPanelBarObject(panelbar).element.children("li").first().text(), "foo");
    });

    it("Passing existing dataSource", function() {
        let dataSource = new HierarchicalDataSource({
            data: [
                { text: "foo" }
            ]
        });

        let panelbar = createPanelBar({
            dataSource: dataSource
        });

        let item = panelbar.find(".k-panelbar-item");

        assert.equal(item.length, 1);
        assert.equal(getPanelBarObject(panelbar).element.children("li").first().text(), "foo");
    });

    it("Removing items from the datasource removes them from the panelbar at the proper level", function() {
        let panelbar = createPanelBar({
            loadOnDemand: false,
            dataSource: [
                {
                    text: "foo", items: [
                        { text: "bar" }
                    ]
                }
            ]
        });

        let dataItem = getPanelBarObject(panelbar).dataItem(panelbar.find(".k-panelbar-item:last"));

        getPanelBarObject(panelbar).dataSource.remove(dataItem);

        assert.equal(panelbar.find(".k-panelbar-item").length, 1);

    });

    it("Loading root nodes from remote datasource inserts them in the PanelBar", function() {
        let panelbar = createPanelBar({
            dataSource: {
                transport: {
                    read: function(options) {
                        options.success([{ id: 1, text: "foo" }]);
                    }
                }
            }
        });

        let item = panelbar.find(".k-panelbar-item");

        assert.equal(item.length, 1);
        assert.equal(getPanelBarObject(panelbar).element.children("li").first().text(), "foo");
    });

    it("Non-leaf nodes are rendered as expandable", function() {
        let i = 1;

        let panelbar = createPanelBar({
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

        let icon = panelbar.find(".k-panelbar-expand");

        assert.equal(icon.length, 1);
    });

    it("Expanding non-leaf nodes loads subgroups", function() {
        let i = 0;

        function readAction(options) {
            i++;

            options.success([
                { id: i, hasChildren: i === 1, text: "foo " + i }
            ]);
        }

        let panelbar = createPanelBar({
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

        getPanelBarObject(panelbar).expand(panelbar.find(".k-panelbar-item"));

        assert.equal(panelbar.find(".k-panelbar-item").length, 2);
        assert.equal(panelbar.find(".k-panelbar-collapse").length, 1);
    });

    it("Sorting the datasource sorts the panelbar", function() {
        let panelbar = createPanelBar([
            { text: "bravo" },
            { text: "alpha" }
        ]);

        getPanelBarObject(panelbar).dataSource.sort({ field: "text", dir: "asc" });

        let items = panelbar.find(".k-panelbar-item");

        assert.equal(items.length, 2);
        assert.equal(items.eq(0).text(), "alpha");
        assert.equal(items.eq(1).text(), "bravo");
    });

    it("Sorting expanded nodes persists their expanded state", function() {
        let panelbar = createPanelBar({
            dataSource: [
                {
                    text: "alpha", expanded: true, items: [
                        { text: "charlie" },
                        { text: "bravo" }
                    ]
                }
            ]
        });

        getPanelBarObject(panelbar).dataSource.sort({ field: "text", dir: "asc" });

        let items = panelbar.find(".k-panelbar-item");

        assert.equal(items.length, 3);
        assert.equal(items.eq(0).children(".k-link").text(), "alpha");

        let subitems = items.eq(0).find(".k-panelbar-item");
        assert.equal(subitems.length, 2);
        assert.equal(subitems.eq(0).text(), "charlie");
        assert.equal(subitems.eq(1).text(), "bravo");
    });

    it("Sorting dynamically expanded nodes persists their expanded state", function() {
        let panelbar = createPanelBar([
            {
                text: "alpha", items: [
                    { text: "charlie" },
                    { text: "bravo" }
                ]
            }
        ]);

        getPanelBarObject(panelbar).expand(".k-panelbar-item:first");

        getPanelBarObject(panelbar).dataSource.sort({ field: "text", dir: "asc" });

        let items = panelbar.find(".k-panelbar-item");

        assert.equal(items.length, 3);
        assert.equal(items.eq(0).children(".k-link").text(), "alpha");

        let subitems = items.eq(0).find(".k-panelbar-item");
        assert.equal(subitems.length, 2);
        assert.equal(subitems.parent().css("display"), "block");
        assert.equal(subitems.eq(0).text(), "charlie");
        assert.equal(subitems.eq(1).text(), "bravo");
    });

    it("the current datasource view is used when refreshing the datasource", function() {
        let panelbar = createPanelBar([
            { text: "alpha" },
            { text: "bravo" }
        ]);

        getPanelBarObject(panelbar).dataSource.filter({ field: "text", operator: "eq", value: "alpha" });

        getPanelBarObject(panelbar).dataSource.read();

        assert.equal(panelbar.find(".k-panelbar-item").length, 1);
    });

    it("setting autoBind to false does not fetch the dataSource", function() {
        let changeTriggered = false,
            dataSource = new HierarchicalDataSource({
                items: [
                    { text: "alpha" },
                    { text: "bravo" }
                ],
                change: function() {
                    changeTriggered = true;
                }
            });

        let panelbar = createPanelBar({
            autoBind: false,
            dataSource: dataSource
        });

        assert.isOk(!changeTriggered);
    });

    it("sorting subnodes behaves correctly", function() {
        let panelbar = createPanelBar({
            dataSource: [
                {
                    text: "alpha", items: [
                        { text: "charlie" },
                        { text: "bravo" }
                    ]
                }
            ]
        });

        getPanelBarObject(panelbar).dataItem(".k-panelbar-item:first").children.sort({ field: "text", dir: "asc" });

        assert.equal(panelbar.find(".k-panelbar-item:first .k-panelbar-item").length, 2);
    });

    it("updating dataItem text updates the panelbar", function() {
        let panelbar = createPanelBar([
            { id: 1, text: "foo" }
        ]);

        let foo = getPanelBarObject(panelbar).element.children("li").first();
        getPanelBarObject(panelbar).dataItem(foo).set("text", "bar");

        assert.equal(getPanelBarObject(panelbar).element.children("li").first().text(), "bar");
    });

    it("updating dataItem text updates the panelbar and regards dataTextField", function() {
        let panelbar = createPanelBar({
            dataTextField: "foo",
            dataSource: [
                { id: 1, text: "unused", foo: "bar" }
            ]
        });

        let bar = getPanelBarObject(panelbar).element.children("li").first();
        getPanelBarObject(panelbar).dataItem(bar).set("foo", "baz");

        assert.equal(getPanelBarObject(panelbar).element.children("li").first().text(), "baz");
    });

    it("dataTextField as array accessor", function() {
        let panelbar = createPanelBar({
            dataTextField: "['foo']",
            dataSource: [
                { id: 1, text: "unused", foo: "bar" }
            ]
        });

        assert.equal(panelbar.text(), "bar");
    });

    it("complex dataTextField is evaluated with getter", function() {
        let panelbar = createPanelBar({
            dataTextField: "Product.Name",
            dataSource: [
                { id: 1, Product: { Name: "bar" } }
            ]
        });

        assert.equal(panelbar.text(), "bar");
    });

    it("initially expanded items query the child datasources", function() {
        let panelbar = createPanelBar({
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

        assert.equal(panelbar.find(".k-panelbar-item").length, 2);
    });

    it("setDataSource sets new datasource", function() {
        let panelbar = createPanelBar([
            { text: "foo" }
        ]);

        getPanelBarObject(panelbar).setDataSource(new HierarchicalDataSource({
            data: [
                { text: "bar" }
            ]
        }));

        assert.equal(panelbar.find(".k-panelbar-item").text(), "bar");
    });

    it("setDataSource does not fetch data when autoBind is false", function() {
        let panelbar = createPanelBar({
            autoBind: false
        });

        getPanelBarObject(panelbar).setDataSource(new HierarchicalDataSource({
            data: [
                { text: "bar" }
            ]
        }));

        assert.equal(getPanelBarObject(panelbar).dataSource.view().length, 0);
    });

    let Node = kendo.data.Node;

    it("binding to derived nodes", function() {
        let ExtendedNode = Node.define({
            extension: true
        });

        let panelbar = createPanelBar({
            dataSource: {
                data: [
                    new ExtendedNode({ text: "foo" })
                ]
            }
        });

        assert.equal(panelbar.find(".k-panelbar-item").text(), "foo");
    });

    it("binding to hierarchy of derived nodes", function() {
        let ExtendedNode = Node.define({
            extension: true
        });

        let panelbar = createPanelBar({
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

        assert.equal(panelbar.find(".k-panelbar-item:last").text(), "bar");
    });

    it("appending through node api does not expand item and group", function() {
        let ExtendedNode = Node.define({
            extension: true,
            expanded: false
        });

        let foo = new ExtendedNode({ text: "foo" });

        let panelbar = createPanelBar({
            dataSource: {
                data: [foo]
            },

            loadOnDemand: false
        });

        foo.append(new ExtendedNode({ text: "bar" }));

        assert.isOk(!panelbar.find(".k-panelbar-item .k-panelbar-group").is(":visible"));
    });

    it("populating hierarchical datasource before initialization", function() {
        let root = new Node({ text: "foo", expanded: true });

        let child = new Node({ text: "bar" });

        root.append(child);

        let panelbar = createPanelBar({
            dataSource: {
                data: [root]
            },

            loadOnDemand: false
        });

        assert.equal(panelbar.find(".k-panelbar-item").length, 2);
    });

    it("items without children do not initialize empty datasource", function() {
        let root = new Node({ text: "foo" });

        let panelbar = createPanelBar({
            dataSource: {
                data: [root]
            },

            loadOnDemand: false
        });

        assert.isOk(!root.children);
    });

    it("re-fetching a node removes subgroup", function() {
        let i = 1;

        let panelbar = createPanelBar({
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
                let dataItem = this.dataItem(e.item);
                dataItem.loaded(false);
            }
        });

        getPanelBarObject(panelbar).expand(".k-panelbar-item");

        getPanelBarObject(panelbar).collapse(".k-panelbar-item:first");

        panelbar.find(".k-panelbar-item .k-panelbar-group").attr("marked", "marked");

        getPanelBarObject(panelbar).expand(".k-panelbar-item:first");

        assert.isOk(!panelbar.find(".k-panelbar-item:first .k-panelbar-group").attr("marked"));
    });

    it("collapse method does not fetch data from server", function() {
        let calls = 0;

        let dataFor = {
            "root": [{ id: 1, text: "foo", hasChildren: true }],
            1: [{ id: 2, text: "bar", hasChildren: false }]
        };

        let panelbar = createPanelBar({
            dataSource: {
                transport: {
                    read: function(options) {
                        calls++;
                        options.success(dataFor[options.data.id || "root"]);
                    }
                }
            }
        });

        getPanelBarObject(panelbar).expand(".k-panelbar-item");
        getPanelBarObject(panelbar).collapse(".k-panelbar-item");

        assert.equal(calls, 2);
    });

    it("returning an empty response from the server removes the expand icon", function() {
        let dataFor = {
            "root": [{ id: 1, text: "foo", hasChildren: true }],
            1: []
        };

        let panelbar = createPanelBar({
            dataSource: {
                transport: {
                    read: function(options) {
                        options.success(dataFor[options.data.id || "root"]);
                    }
                }
            }
        });

        getPanelBarObject(panelbar).expand(".k-panelbar-item");

        assert.equal(panelbar.find(".k-icon").length, 0);
    });

    it("append sets hasChildren flag", function() {
        let panelbar = createPanelBar([
            { text: "foo", hasChildren: false }
        ]);

        let foo = $(".k-panelbar-item");

        getPanelBarObject(panelbar).append({ text: "bar" }, foo);

        assert.isOk(getPanelBarObject(panelbar).dataItem(foo).hasChildren);
    });

    it("appending to collapsed item", function() {
        let panelbar = createPanelBar({
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

        let foo = $(".k-panelbar-item:first");

        getPanelBarObject(panelbar).append({ text: "baz" }, foo);

        let items = foo.find(".k-panelbar-item");

        assert.equal(items.length, 2);
        assert.equal(foo.find("li").first().text(), "bar");
        assert.equal(foo.find("li").eq(1).text(), "baz");
    });

    it("pushUpdate updates root node", function() {
        let panelbar = createPanelBar({
            dataSource: {
                data: [
                    { id: 1, text: "foo" },
                    { id: 2, text: "bar" }
                ]
            }
        });

        getPanelBarObject(panelbar).dataSource.pushUpdate({ id: 2, text: "baz" });

        assert.equal(panelbar.find(".k-panelbar-item").length, 2);
        assert.equal(panelbar.find(".k-panelbar-item:last").text(), "baz");
    });

    it("pushUpdate updates custom field in template", function() {
        let panelbar = createPanelBar({
            dataTextField: "foo",
            template: ({ item }) => kendo.htmlEncode(item.bar),
            dataSource: {
                data: [
                    { id: 1, bar: "foo" },
                    { id: 2, bar: "bar" }
                ]
            }
        });

        getPanelBarObject(panelbar).dataSource.pushUpdate({ id: 2, bar: "baz" });

        assert.equal(getPanelBarObject(panelbar).element.children("li").last().text(), "baz");
    });

    it("pushUpdate updates child node", function() {
        let panelbar = createPanelBar({
            dataSource: [
                {
                    id: 1, text: "foo", items: [
                        { id: 2, text: "bar" }
                    ]
                }
            ]
        });

        getPanelBarObject(panelbar).dataSource.pushUpdate({ id: 2, text: "baz" });

        assert.equal(panelbar.find(".k-panelbar-item").length, 2);
        assert.equal(getPanelBarObject(panelbar).element.children("li").last().text(), "baz");
    });

    asyncTest("dataSource can be searched within dataBound handler", function(done) {
        let read = controlledRead();

        let panelbar = createPanelBar({
            dataSource: { transport: { read: read } },
            dataBound: function() {
                done(() => {
                    assert.isOk(this.dataSource.get(1));
                    assert.isOk(!this.dataSource.get(2));
                });
            }
        });

        read.resolve([{ id: 1, expanded: true, hasChildren: true }]);
    });

    it("Adds k-level-n class based on item's level in hierarchy", function() {
        let panelbar = createPanelBar({
            loadOnDemand: false,
            dataSource: [
                {
                    id: 1, text: "foo", items: [
                        { id: 2, text: "bar" }
                    ]
                }
            ]
        });

        assert.isOk(getPanelBarObject(panelbar).element.find(".k-panelbar-item").eq(0).is(".k-level-0"));
        assert.isOk(getPanelBarObject(panelbar).element.find(".k-panelbar-item").eq(1).is(".k-level-1"));
    });

});
