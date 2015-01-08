(function() {
    var createTreeView = TreeViewHelpers.fromOptions;
    var treeFromHtml = TreeViewHelpers.fromHtml;

    function get(id) {
        return treeviewObject.dataSource.get(id);
    }

    function getByText(text) {
        return treeviewObject.dataItem(treeviewObject.findByText(text));
    }

    module("API", TreeViewHelpers.basicModule);

    test("enable(node, false) disables node", function() {
        createTreeView([
            { text: "foo", items: [
                { text: "bar" }
            ] }
        ]);

        var node = treeview.find(".k-item:first");

        treeviewObject.enable(node, false);

        equal(node.find(".k-plus-disabled").length, 1);
        ok(node.find(".k-in").hasClass("k-state-disabled"));
    });

    test("enable(node) enables node", function() {
        createTreeView([
            { text: "foo", enabled: false, items: [
                { text: "bar" }
            ] }
        ]);

        var node = treeview.find(".k-item:first");

        treeviewObject.enable(node);

        equal(node.find(".k-plus").length, 1);
        ok(!node.find(".k-in").hasClass("k-state-disabled"));
    });

    test("enable(node, false) clears selected field", function() {
        createTreeView([
            { text: "foo", selected: true }
        ]);

        var node = treeview.find(".k-item:first");

        treeviewObject.enable(node, false);

        ok(!treeviewObject.dataItem(node).selected);
        ok(!node.find(".k-in").hasClass("k-state-selected"));
    });

    test("select(node) selects node", function() {
        createTreeView([
            { text: "foo" }
        ]);

        var node = treeview.find(".k-item:first");

        treeviewObject.select(node);

        ok(node.find(".k-in").hasClass("k-state-selected"));
    });

    test("select(node) works with inner elements", function() {
        createTreeView([
            { text: "foo" }
        ]);

        var node = treeview.find(".k-item:first").find(".k-in");

        treeviewObject.select(node);

        ok(node.hasClass("k-state-selected"));
    });

    test("select(node) deselects other node", function() {
        createTreeView([
            { text: "foo", selected: true },
            { text: "bar" }
        ]);

        var node = treeview.find(".k-item:last");

        treeviewObject.select(node);

        equal(treeview.find(".k-state-selected").length, 1);
    });

    test("select(selector) limits selector to treeview", function() {
        createTreeView([
            { text: "foo" }
        ]);

        $("<div class='k-item' />").appendTo(QUnit.fixture);

        treeviewObject.select(".k-item:last");

        equal(treeview.find(".k-state-selected").length, 1);
    });

    test("select([]) removes selection from nodes", function() {
        createTreeView([
            { text: "foo", selected: true }
        ]);

        treeviewObject.select([]);

        equal(treeview.find(".k-state-selected").length, 0);
    });

    test("text(node) returns node text", function() {
        createTreeView([
                { text: "foo", items: [
                    { text: "bar" }
                ] }
            ]);

        var node = treeview.find(".k-item:first");

        equal(treeviewObject.text(node), "foo");
        equal(treeviewObject.text(node.find(".k-in:first")), "foo");
    });

    test("text(node) returns node text if inner element is passed", function() {
        createTreeView([
                { text: "foo", items: [
                    { text: "bar" }
                ] }
            ]);

        var node = treeview.find(".k-item .k-in:first");

        equal(treeviewObject.text(node), "foo");
    });

    test("text(node, 'text') sets node text", function() {
        createTreeView([
                { text: "foo" }
            ]);

        var node = treeview.find(".k-item .k-in");

        treeviewObject.text(node, "bar");

        equal(treeviewObject.text(node), "bar");
    });

    test("findByText(text) returns single node", function() {
        createTreeView([
            { text: "foo", items: [
                { text: "bar" }
            ] }
        ]);

        var node = treeview.find(".k-item:first");

        equal(treeviewObject.findByText("foo")[0], node[0]);
    });

    test("findByText(text) returns multiple nodes", function() {
        createTreeView([
            { text: "foo" },
            { text: "bar" },
            { text: "foo" }
        ]);

        var nodes = treeview.find(".k-item"),
            result = treeviewObject.findByText("foo");

        equal(result[0], nodes[0]);
        equal(result[1], nodes[2]);
    });

    test("append(nodeData, root) appends new node to empty parent", function() {
        createTreeView([
            { text: "foo" }
        ]);

        var root = treeview.find(".k-item:first");

        var appendedNode = treeviewObject.append({ text: "bar" }, root);

        equal(root.find(".k-group").length, 1);
        equal(root.find(".k-group").css("display"), "block");
        equal(root.find(".k-item").length, 1);
        equal(appendedNode[0], root.find(".k-item")[0]);
        equal(treeviewObject.text(appendedNode), "bar");
        ok(appendedNode.find(">div").hasClass("k-bot"));
        ok(appendedNode.hasClass("k-last"));
        equal(root.find(">div>.k-minus.k-icon").length, 1);
    });

    test("append(nodeData, parentNode) appends new node to parent with existing group", function() {
        createTreeView([
            { text: "foo", expanded: true, items: [
                { text: "bar" }
            ] }
        ]);

        var parentNode = treeview.find(".k-item:first");

        var appendedNode = treeviewObject.append({ text: "baz" }, parentNode);

        equal(parentNode.find(".k-group").length, 1);
        equal(parentNode.find(".k-group").css("display"), "block");
        equal(parentNode.find(".k-item").length, 2);
        equal(appendedNode[0], parentNode.find(".k-item:last")[0]);
        ok(!appendedNode.prev(".k-item").hasClass("k-last"));
        equal(appendedNode.find(">div.k-bot").length, 1);
    });

    test("append(nodeData) appends new node to root", function() {
        createTreeView([
            { text: "foo" }
        ]);

        var rootGroup = treeview.find(".k-group");

        var appendedNode = treeviewObject.append({ text: "bar" });

        equal(rootGroup.length, 1);
        equal(treeview.find("div").length, 2);
        equal(rootGroup.find("> .k-item").length, 2);
        ok(rootGroup.find("> .k-item").hasClass("k-first"));
    });

    test("append(nodeElement, parentNode) appends node to parent", function() {
        createTreeView([
            { text: "foo", expanded: true, items: [
                { text: "buzz" },
                { text: "bar" }
            ] },
            { text: "baz" }
        ]);

        var rootGroup = treeview.find("> .k-group"),
            subNode = treeviewObject.findByText("buzz"),
            newParent = treeviewObject.findByText("baz");

        var appendedNode = treeviewObject.append(subNode[0], newParent);

        equal(appendedNode[0], newParent.find(".k-item")[0]);
        equal(rootGroup.children().length, 2);
        equal(treeviewObject.findByText("buzz").find(".k-bot").length, 1);
    });

    test("append(nodeElement) appends node to root", function() {
        createTreeView([
            { text: "foo", expanded: true, items: [
                { text: "bar" }
            ] }
        ]);

        var rootGroup = treeview.find("> .k-group"),
            subNode = treeviewObject.findByText("bar");

        var appendedNode = treeviewObject.append(subNode[0]);

        equal(treeviewObject.findByText("bar")[0], appendedNode[0]);
        equal(rootGroup.children().length, 2);
        equal(treeview.find(".k-icon").length, 0);
        equal(rootGroup.find(".k-group").length, 0);
    });

    test("append() of single child to same parent does not remove it", function() {
        createTreeView([
            { text: "foo", expanded: true, items: [
                { text: "bar" }
            ] }
        ]);

        var rootGroup = treeview.find("> .k-group"),
            subNode = treeviewObject.findByText("bar"),
            rootNode = treeviewObject.findByText("foo");

        var appendedNode = treeviewObject.append(subNode, rootNode);

        subNode = treeviewObject.findByText("bar");

        equal(subNode[0], appendedNode[0]);
        equal(rootGroup.children().length, 1);
        equal(rootNode.find(".k-group").length, 1);
        equal(rootNode.find(".k-group").children().length, 1);

        appendedNode = treeviewObject.append(subNode[0], rootNode);

        subNode = treeviewObject.findByText("bar");

        equal(subNode[0], appendedNode[0]);
        equal(rootGroup.children().length, 1);
        equal(rootNode.find(".k-group").length, 1);
        equal(rootNode.find(".k-group").children().length, 1);
    });

    test("append() of array of items", function() {
        createTreeView({});

        var appendedNodes = treeviewObject.append([
                { text: "foo" },
                { text: "bar" }
            ]);

        equal(treeview.find(".k-group").length, 1);
        equal(treeview.find(".k-group").children().length, 2);
    });

    test("append() uses item template when creating items", function() {
        createTreeView({
            template: kendo.template("item: #= item.text #")
        });

        treeviewObject.append({ text: "foo" });

        equal(treeview.find(".k-in").text(), "item: foo");

        treeviewObject.remove(".k-item");

        treeviewObject.append([{ text: "foo" }]);

        equal(treeview.find(".k-in").text(), "item: foo");
    });

    test("append() of observable object", function() {
        createTreeView({});

        var obj = kendo.observable({ text: "foo" });

        treeviewObject.append(obj);

        equal(treeview.find(".k-in").text(), "foo");
    });

    test("append() of observable object to subnode", function() {
        createTreeView([
            { text: "foo" }
        ]);

        var obj = kendo.observable({ text: "bar" });

        treeviewObject.append(obj, treeviewObject.findByText("foo"));

        equal(treeview.find(".k-item .k-item").text(), "bar");
    });

    test("append() of observable array", function() {
        createTreeView({});

        var array = new kendo.data.ObservableArray([{ text: "foo" }]);

        treeviewObject.append(array);

        equal(treeview.find(".k-in").text(), "foo");
    });

    test("append() adds element to dataSource", function() {
        createTreeView({});

        treeviewObject.append({ text: "foo" });

        var data = treeviewObject.dataSource.data();

        equal(data.length, 1);
        equal(data[0].text, "foo");
    });

    test("append() to unfetched parent", function() {
        createTreeView({
            dataSource: {
                data: [
                    { text: "foo", hasChildren: true }
                ],
                schema: {
                    model: {
                        hasChildren: "hasChildren",
                        children: {
                            transport: {
                                read: function(options) {
                                    options.success([ { text: "bar" } ]);
                                }
                            }
                        }
                    }
                }
            }
        });

        treeviewObject.append({ text: "baz" }, treeview.find(".k-item"));

        equal(treeview.find(".k-item .k-item").length, 2);
    });

    test("append() does not override explicit checked state", function() {
        createTreeView({
            checkboxes: {
                checkChildren: true
            },
            dataSource: {
                data: [
                    { text: "foo", items: [
                        { text: "bar", checked: true }
                    ] }
                ]
            }
        });

        treeviewObject.append({ text: "baz", checked: false }, treeviewObject.findByText("foo"));

        ok(!treeviewObject.findByText("baz").find(":checkbox").prop("checked"));
    });

    asyncTest("append() to unfetched async parent", function() {
        createTreeView({
            dataSource: {
                data: [
                    { text: "foo", hasChildren: true }
                ],
                schema: {
                    model: {
                        hasChildren: "hasChildren",
                        children: {
                            transport: {
                                read: function(options) {
                                    setTimeout(function() {
                                        options.success([ { text: "bar" } ]);
                                    }, 100);
                                }
                            }
                        }
                    }
                }
            }
        });

        treeviewObject.append({ text: "baz" }, treeview.find(".k-item"));

        setTimeout(function() {
            start();
            equal(treeview.find(".k-item .k-item").length, 2);
        }, 200);
    });

    asyncTest("append() to unfetched async parent calls callback", 2, function() {
        createTreeView({
            dataSource: {
                data: [
                    { text: "foo", hasChildren: true }
                ],
                schema: {
                    model: {
                        hasChildren: "hasChildren",
                        children: {
                            transport: {
                                read: function(options) {
                                    setTimeout(function() {
                                        options.success([ { text: "bar", hasChildren: false } ]);
                                    }, 100);
                                }
                            }
                        }
                    }
                }
            }
        });

        var timeout = setTimeout(start, 1000);

        treeviewObject.append(
            { text: "baz", hasChildren: false },
            treeview.find(".k-item"),
            function(node) {
                clearTimeout(timeout);
                start();
                equal(node[0], treeview.find(".k-item:last")[0]);
                equal(treeview.find(".k-item .k-item").length, 2);
            }
        );
    });

    test("append() after detaching node", function() {
        createTreeView({
            dataSource: [
                { text: "foo" }
            ]
        });

        treeviewObject.detach(".k-item");

        treeviewObject.append({ text: "bar" });

        equal(treeview.text(), "bar");
    });

    test("detach() removes node and persists data", function() {
        createTreeView([
            { text: "foo" },
            { text: "bar" }
        ]);

        var foo = treeviewObject.findByText("foo");

        foo.data("id", 1);

        foo = treeviewObject.detach(foo);

        equal(foo.data("id"), 1);
    });

    test("insertAfter(nodeData, element) inserts new node after element", function() {
        createTreeView([
            { text: "foo", expanded: true },
            { text: "baz", expanded: true }
        ]);

        var rootItem = treeview.find(".k-item:first"),
            rootGroup = treeview.find(".k-group");

        var insertedNode = treeviewObject.insertAfter({ text: "bar" }, rootItem);

        equal(rootGroup.find("> .k-item").length, 3);
        equal(rootGroup.find("> .k-item:contains('bar')").index(), 1);
        equal(insertedNode[0], rootGroup.find("> .k-item")[1]);
    });

    test("insertAfter() works with referenceNode as div", function() {
        createTreeView([
            { text: "foo" },
            { text: "baz" }
        ]);

        var rootItem = treeview.find(".k-item:first > div"),
            rootGroup = treeview.find(".k-group");

        var insertedNode = treeviewObject.insertAfter({ text: "bar" }, rootItem);

        equal(rootGroup.find("> .k-item").length, 3);
        equal(rootGroup.find("> .k-item:contains('bar')").index(), 1);
        equal(insertedNode[0], rootGroup.find("> .k-item")[1]);
    });


    test("insertBefore(nodeData, element) inserts new node before element", function() {
        createTreeView([
            { text: "foo" },
            { text: "baz" }
        ]);

        var rootItem = treeview.find(".k-item:last"),
            rootGroup = treeview.find(".k-group");

        var insertedNode = treeviewObject.insertBefore({ text: "bar" }, rootItem);

        equal(rootGroup.find("> .k-item").length, 3);
        equal(rootGroup.find("> .k-item:contains('bar')").index(), 1);
        equal(insertedNode[0], rootGroup.find("> .k-item")[1]);
    });

    test("insertBefore() works with referenceNode as div", function() {
        createTreeView([
            { text: "foo" },
            { text: "baz" }
        ]);

        var rootItem = treeview.find(".k-item:last > div"),
            rootGroup = treeview.find(".k-group");

        var insertedNode = treeviewObject.insertBefore({ text: "bar" }, rootItem);

        equal(rootGroup.find("> .k-item").length, 3);
        equal(rootGroup.find("> .k-item:contains('bar')").index(), 1);
        equal(insertedNode[0], rootGroup.find("> .k-item")[1]);
    });

    test("insertBefore() of array of items", function() {
        createTreeView([
            { text: "baz" }
        ]);

        var appendedNodes = treeviewObject.insertBefore([
            { text: "foo" },
            { text: "bar" }
        ], treeviewObject.findByText("baz"));

        equal(treeview.find(".k-group").length, 1);
        equal(treeview.find(".k-group").children().length, 3);
    });

    test("insertBefore(nodeData, element) updates item classes", function() {
        createTreeView([
            { text: "foo" }
        ]);

        var rootItem = treeview.find(".k-item");

        var insertedNode = treeviewObject.insertBefore({ text: "bar" }, rootItem);

        ok(insertedNode.hasClass("k-first"));
        ok(!rootItem.hasClass("k-first"));
        ok(rootItem.hasClass("k-last"));
        ok(!rootItem.find(">div").hasClass("k-top"));
        ok(rootItem.find(">div").hasClass("k-bot"));
        equal(treeview.find("li").length, 2);
        equal(treeview.find("div").length, 2);
    });

    test("remove(node) removes nodes", function() {
        createTreeView([
            { text: "foo" },
            { text: "bar" }
        ]);

        var rootItems = treeview.find(".k-item"),
            rootGroup = treeview.find(".k-group");

        treeviewObject.remove(rootItems[0]);

        rootItems = treeview.find(".k-item");

        equal(rootItems.length, 1);
        equal(rootGroup.find(".k-in:contains('bar')").length, 1);
        equal(treeview.find("li").length, 1);
        equal(treeview.find("div").length, 1);
    });

    test("remove(node) updates classes", function() {
        createTreeView([
            { text: "foo", items: [
                { text: "bar" }
            ] }
        ]);

        treeviewObject.remove(treeviewObject.findByText("bar"));

        var items = treeview.find(".k-item");

        equal(items.length, 1);
        equal(items.find(".k-group").length, 0);
    });

    test("remove('.k-item') removes all items, but not root list", function() {
        createTreeView([
            { text: "foo", items: [
                { text: "bar" }
            ] }
        ]);

        treeviewObject.remove(".k-item");

        equal(treeview.find(".k-item").length, 0);
        ok(treeview.find("> .k-group").length);
        ok(!treeview.hasClass("k-item"));
    });

    test("remove('.k-item') works only with own items", function() {
        createTreeView([
            { text: "foo", items: [
                { text: "bar" }
            ] }
        ]);

        var arbitraryItem = $("<div class='k-item' />").appendTo(QUnit.fixture);

        treeviewObject.remove(".k-item:last");

        ok($.contains(QUnit.fixture[0], arbitraryItem[0]));
    });

    test("expand() with selector string", function() {
        createTreeView([
            { text: "foo", items: [
                { text: "bar" }
            ] }
        ]);

        var calls = 0;

        treeviewObject.toggle = function() {
            calls++;
        };

        treeviewObject.expand(".k-item");

        equal(calls, 2);
    });

    test("expand() with DOM elements", function() {
        createTreeView([
            { text: "foo", items: [
                { text: "bar" }
            ] }
        ]);

        var calls = 0;

        treeviewObject.toggle = function() {
            calls++;
        };

        treeviewObject.expand($(".k-item:first")[0]);

        equal(calls, 1);
    });

    test("expand() on load-on-demand nodes", function() {
        createTreeView({
            dataSource: {
                transport: {
                    read: function(options) {
                        options.success([ { text: "foo", hasChildren: true } ]);
                    }
                },
                schema: {
                    model: {
                        hasChildren: "hasChildren"
                    }
                }
            }
        });

        equal(treeview.find(".k-item").length, 1);

        treeviewObject.expand(".k-item");

        equal(treeview.find(".k-item .k-item").length, 1);
    });

    test("toggle() toggles disabled nodes", function() {
        createTreeView([
            { text: "foo", enabled: false, items: [
                { text: "bar" }
            ] }
        ]);

        treeviewObject.toggle(treeviewObject.findByText("foo"));

        equal(treeview.find(".k-group:last").css("display"), "block");
    });

    test("dataItem returns the ObservableObject that corresponds to a node", function() {
        createTreeView([
            { id: 1, text: "foo" },
            { id: 2, text: "bar" }
        ]);

        var foo = treeviewObject.dataItem(treeview.find(".k-item:first"));

        equal(foo.id, 1);
        equal(foo.text, "foo");
    });

    test("dataItem searches through child dataSources", function() {
        createTreeView([
            { id: 1, text: "foo", baz: "qux", items: [
                { id: 2, text: "bar", baz: "lux" }
            ] }
        ]);

        treeviewObject.dataSource.data()[0].children.read();

        var bar = treeviewObject.dataItem(treeview.find(".k-item:last"));

        ok(bar);
        equal(bar.id, 2);
        equal(bar.text, "bar");
        equal(bar.baz, "lux");
    });

    test("remove() removes item from dataSource", function() {
        createTreeView([
            { text: "foo" }
        ]);

        treeviewObject.remove(".k-item");

        equal(treeviewObject.dataSource.data().length, 0);
    });

    test("insertBefore() moves item in the dataSource", function() {
        createTreeView([
            { text: "foo" },
            { text: "bar" }
        ]);

        treeviewObject.insertBefore(treeviewObject.findByText("bar"), treeviewObject.findByText("foo"));

        var data = treeviewObject.dataSource.data();

        equal(data.length, 2);
        equal(data[0].text, "bar");
        equal(data[1].text, "foo");
    });

    test("insertAfter() moves item in the dataSource", function() {
        createTreeView([
            { text: "foo" },
            { text: "bar" }
        ]);

        treeviewObject.insertAfter(treeviewObject.findByText("foo"), treeviewObject.findByText("bar"));

        var data = treeviewObject.dataSource.data();

        equal(data.length, 2);
        equal(data[0].text, "bar");
        equal(data[1].text, "foo");
    });

    test("API methods work after initialization from rendered treeview", function() {
        treeview = $('<div class="k-widget k-treeview" id="treeview">' +
            '<ul class="k-group">' +
                '<li class="k-item k-first">' +
                    '<div class="k-top k-top"><span class="k-in">foo</span></div>' +
                '</li>' +
                '<li class="k-item k-last">' +
                    '<div class="k-top k-bot"><span class="k-in">bar</span></div>' +
                '</li>' +
            '</ul>' +
        '</div>').appendTo(QUnit.fixture).kendoTreeView();

        treeviewObject = treeview.data("kendoTreeView");

        treeviewObject.insertAfter(treeviewObject.findByText("foo"), treeviewObject.findByText("bar"));

        var data = treeviewObject.dataSource.data();

        equal(data.length, 2);
        equal(data[0].text, "bar");
        equal(data[1].text, "foo");
    });

    test("API methods work after initialization from empty rendered treeview", function() {
        treeview = $('<div class="k-widget k-treeview" id="treeview" />').appendTo(QUnit.fixture).kendoTreeView();

        treeviewObject = treeview.data("kendoTreeView");

        treeviewObject.append({ text: "foo" });

        var data = treeviewObject.dataSource.data();

        equal(data.length, 1);
        equal(data[0].text, "foo");
    });

    test("removing all items from an item does not re-initialize it after move", function() {
        createTreeView([
            { text: "foo", items: [
                { text: "bar" }
            ] }
        ]);

        var bar = treeviewObject.findByText("bar");

        bar = treeviewObject.append(bar);

        var foo = treeviewObject.findByText("foo");

        foo = treeviewObject.append(foo, bar);

        equal(foo.find(".k-item").length, 0);
    });

    test("parent() gets parent node", function() {
        createTreeView([
            { text: "foo", items: [
                { text: "bar" }
            ] }
        ]);

        equal(treeviewObject.parent(".k-item .k-item")[0], treeview.find(".k-item")[0]);
    });

    test("parent() does not get nodes outside of the treeview", function() {
        createTreeView([
            { text: "foo" }
        ]);

        var wrap = $("<div class='k-item' />").appendTo(QUnit.fixture).append(treeview);

        equal(treeviewObject.parent(treeview.find(".k-item")).length, 0);
    });

    test("parent() works for non-node selectors", function() {
        createTreeView([
            { text: "foo", items: [
                { text: "bar", selected: true }
            ] }
        ]);

        equal(treeviewObject.parent(".k-state-selected")[0], treeview.find(".k-item")[0]);
    });

    test("text() changes item text, honoring templates", function() {
        createTreeView({
            dataSource: [ { text: "foo", value: "bar" } ],
            template: "#: item.text #<input type='hidden' value='#= item.value #'>"
        });

        treeviewObject.text(".k-item", "baz");

        equal(treeview.find(":hidden").length, 1);
        equal(treeview.text(), "baz");
    });

    test("collapse() of non-visible items hides their subgroup", function() {
        createTreeView({
            animation: false,
            dataSource: [
                { text: "foo", expanded: true, items: [
                    { text: "bar", expanded: true, items: [
                        { text: "baz" }
                    ] }
                ] }
            ]
        });

        treeviewObject.collapse(".k-item");

        equal(treeview.find(".k-group:last").css("display"), "none");
    });

    test("appending of items with children set", function() {
        createTreeView({
            dataSource: {
                data: [{
                    HasChildren: false,
                    Children: [],
                    text: "foo"
                }],
                schema: {
                    model: {
                        hasChildren: "HasChildren",
                        children: "Children"
                    }
                }
            }
        });

        treeviewObject.append({
            HasChildren: false,
            Children: [],
            text: "bar"
        });

        treeviewObject.append(treeviewObject.findByText("foo"), treeviewObject.findByText("bar"));

        equal(treeview.find(".k-item .k-item").length, 1);
    });

    test("appending array of items adds them to the datasource in one pass", function() {
        var calls = 0;

        createTreeView({
            dataSource: {
                data: [],
                change: function() {
                    calls++;
                }
            }
        });

        equal(calls, 1);

        treeviewObject.append([
            { text: "foo" },
            { text: "bar" }
        ]);

        equal(calls, 2);
    });

    test("collapse() on collapsed item does not trigger a datasource fetch", function() {
        var calls = 0;

        createTreeView({
            dataSource: {
                transport: {
                    read: function(options) {
                        options.success([ { text: "foo", hasChildren: true } ]);
                        calls++;
                    }
                }
            }
        });

        treeviewObject.collapse(".k-item");

        equal(calls, 1);
    });

    test("updateIndeterminate updates indeterminate state", function() {
        createTreeView({
            dataSource: [
                { text: "foo", expanded: true, items: [
                    { text: "bar" },
                    { text: "baz" }
                ] }
            ],
            checkboxes: {
                checkChildren: true
            }
        });

        treeview.find(":checkbox:last").prop("checked", true);

        treeviewObject.updateIndeterminate();

        ok(treeview.find(":checkbox:first").prop("indeterminate"));
    });

    test("destroy removes datasource handlers", function() {
        var dataSource = new kendo.data.HierarchicalDataSource();

        createTreeView({ dataSource: dataSource });

        treeviewObject.destroy();

        var changeEvents = dataSource._events.change;

        ok(!changeEvents || !changeEvents.length);
    });

    test("expandPath expands root node", function() {
        createTreeView([
            { id: 1, text: "foo", items: [
                { id: 2, text: "bar" }
            ] }
        ]);

        treeviewObject.expandPath([ 1 ]);

        ok(get(1).expanded);
    });

    test("expandPath expands multiple levels", 2, function() {
        createTreeView([
            { id: 1, text: "foo", items: [
                { id: 2, text: "bar", items: [
                    { id: 3, text: "baz" }
                ] }
            ] }
        ]);

        treeviewObject.expandPath([ 1, 2 ], function() {
            ok(get(1).expanded);
            ok(get(2).expanded);
        });
    });

    test("expandPath works with expanded nodes", function() {
        createTreeView([
            { id: 1, text: "foo", expanded: true, items: [
                { id: 2, text: "bar", items: [
                    { id: 3, text: "baz" }
                ] }
            ] }
        ]);

        treeviewObject.expandPath([ 1, 2 ], function() {
            ok(get(1).expanded);
            ok(get(2).expanded);
        });
    });

    test("expandPath does not modify array parameter", function() {
        createTreeView([
            { id: 1, text: "foo", items: [
                { id: 2, text: "bar" }
            ] }
        ]);

        var path = [ 1 ];

        treeviewObject.expandPath(path);

        equal(path.length, 1);
    });

    test("expandPath callback uses treeview as context", function() {
        createTreeView([
            { id: 1, text: "foo", items: [
                { id: 2, text: "bar" }
            ] }
        ]);

        treeviewObject.expandPath([ 1 ], function() {
            equal(this, treeviewObject);
        });
    });

    test("expandTo expands up to model", function() {
        createTreeView([
            { text: "foo", items: [
                { text: "bar", items: [
                    { text: "baz" }
                ] }
            ] }
        ]);

        treeviewObject.expandTo(getByText("baz"));

        ok(getByText("foo").expanded);
        ok(getByText("bar").expanded);
    });

    test("expandTo expands up to ID", function() {
        createTreeView([
            { id: 1, text: "foo", items: [
                { id: 2, text: "bar", items: [
                    { id: 3, text: "baz" }
                ] }
            ] }
        ]);

        treeviewObject.expandTo(3);

        ok(get(1).expanded);
        ok(get(2).expanded);
    });

    module("expandPath async", {
        setup: function() {
            var id = 1;

            createTreeView({
                dataSource: {
                    transport: {
                        read: function(options) {
                            options.success([
                                { id: id++, text: "foo", hasChildren: true }
                            ]);
                        }
                    },
                    schema: {
                        model: {
                            id: "id",
                            hasChildren: "hasChildren"
                        }
                    }
                }
            });
        },
        teardown: TreeViewHelpers.destroy
    });

    asyncTest("expandPath loads async nodes", function() {
        treeviewObject.expandPath([ 1 ], function() {
            start();

            ok(get(1).expanded);
        });
    });

    asyncTest("expandPath loads multiple async nodes", function() {
        treeviewObject.expandPath([ 1, 2, 3 ], function() {
            start();

            ok(get(3).expanded);
        });
    });

    asyncTest("expandPath loads async nodes", function() {
        treeviewObject.expandPath([ 1 ], function() {
            start();

            equal(this, treeviewObject);
        });
    });

    asyncTest("expandPath calls callback if expanded node has no children", function() {
        var calls = 0;

        createTreeView({
            dataSource: {
                transport: {
                    read: function(options) {
                        if (!calls) {
                            options.success([ { id: 1, text: "foo", hasChildren: true } ]);
                        } else {
                            options.success([]);
                        }

                        calls++;
                    }
                },
                schema: {
                    model: {
                        id: "id",
                        hasChildren: "hasChildren"
                    }
                }
            }
        });

        treeviewObject.expandPath([ 1, 2 ], function() {
            start();

            ok(true);
        });
    });
})();
