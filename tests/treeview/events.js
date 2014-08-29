(function() {
    var createTreeView = TreeViewHelpers.fromOptions;
    var treeFromHtml = TreeViewHelpers.fromHtml;
    var handler;

    module("events", {
        setup: function() {
            handler = spy();
        },
        teardown: TreeViewHelpers.destroy
    });

    function eventArgs(spy) {
        return spy.lastArgs[0];
    }

    test("selecting nodes triggers selected event and passes node as argument", function() {
        createTreeView({
            select: handler,
            dataSource: [ { text: "foo" } ]
        });

        var node = $(".k-item:first", treeview);

        node.find(".k-in").trigger("click");

        equal(handler.calls, 1);
        equal(eventArgs(handler).node, node[0]);
    });

    test("clicking expand button triggers expand event", function() {
        createTreeView({
            expand: handler,
            dataSource: [
                { text: "foo", items: [
                    { text: "food" }
                ] }
            ]
        });

        $(".k-plus", treeview).trigger("click");

        equal(handler.calls, 1);
        equal(eventArgs(handler).node, $(".k-item")[0]);
    });

    test("clicking collapse button triggers collapse event", function() {
        createTreeView({
            collapse: handler,
            dataSource: [
                { text: "foo", expanded: true, items: [
                    { text: "food" }
                ] }
            ]
        });

        $(".k-minus", treeview).trigger("click");

        equal(handler.calls, 1);
        equal(eventArgs(handler).node, $(".k-item")[0]);
    });

    function moveNode(treeview, sourceText, destinationText) {
        var sourceNode = treeview.findByText(sourceText).find(".k-in:first"),
            destinationNode = treeview.findByText(destinationText).find(".k-in:first"),
            startOffset = sourceNode.offset(),
            endOffset = destinationNode.offset(),
            extend = $.extend,
            sourcePosition = {
                pageX: startOffset.left + 5,
                pageY: startOffset.top + 5,
                relatedTarget: sourceNode[0]
            },
            destinationPosition = {
                pageX: endOffset.left + 5,
                pageY: endOffset.top + 7,
                target: destinationNode[0]
            };

        sourceNode
            .trigger(extend({ type: "mousedown" }, sourcePosition));

        destinationNode
            .trigger(extend({ type: "mousemove" }, destinationPosition))
            .trigger(extend({ type: "mousemove" }, destinationPosition))
            .trigger(extend({ type: "mouseup" }, destinationPosition));
    }

    test("moving node triggers dragstart", function () {
        createTreeView({
            dragAndDrop: true,
            dataSource: [
                { text: "foo", expanded: true, items: [
                    { text: "bar" }
                ] },
                { text: "baz" }
            ],
            dragstart: handler
        });

        moveNode(treeviewObject, "bar", "baz");

        equal(handler.calls, 1);
        equal(treeviewObject.text(eventArgs(handler).sourceNode), "bar");
    });

    test("dragstart can be prevented", function () {
        createTreeView({
            dragAndDrop: true,
            dataSource: [
                { text: "foo", expanded: true, items: [
                    { text: "bar" }
                ] },
                { text: "baz" }
            ],
            dragstart: function(e) { e.preventDefault(); }
        });

        moveNode(treeviewObject, "bar", "baz");

        equal(treeviewObject.text(treeviewObject.findByText("bar").parent().closest(".k-item")), "foo");
    });

    test("moving node triggers drag", function () {
        createTreeView({
            dragAndDrop: true,
            dataSource: [
                { text: "foo", expanded: true, items: [
                    { text: "bar" }
                ] },
                { text: "baz" }
            ],
            drag: handler
        });

        moveNode(treeviewObject, "bar", "baz");

        ok(handler.calls);

        var e = eventArgs(handler);
        equal(treeviewObject.text(e.sourceNode), "bar");
        ok(e.setStatusClass);
        equal(e.statusClass, "add");
        ok(e.pageX);
        ok(e.pageY);
    });

    test("moving node triggers drop", function () {
        createTreeView({
            dragAndDrop: true,
            dataSource: [
                { text: "foo", expanded: true, items: [
                    { text: "bar" }
                ] },
                { text: "baz" }
            ],
            drop: handler
        });

        moveNode(treeviewObject, "bar", "baz");

        ok(handler.calls);

        var e = eventArgs(handler);
        equal(treeviewObject.text(e.sourceNode), "bar");
        equal(e.destinationNode, treeviewObject.findByText("baz")[0]);
        ok(e.valid);
        equal(e.dropPosition, "over");
    });

    test("drop event setValid sets event valid state", 1, function () {
        createTreeView({
            dragAndDrop: true,
            dataSource: [
                { text: "foo" },
                { text: "bar" }
            ],
            drop: function(e) {
                e.setValid(false);

                ok(!e.valid);
            }
        });

        moveNode(treeviewObject, "foo", "bar");
    });

    test("moving node triggers dragstart/drag/drop/dragend", function () {
        createTreeView({
            dragAndDrop: true,
            dataSource: [
                { text: "foo", expanded: true, items: [
                    { text: "bar" }
                ] },
                { text: "baz" }
            ],
            dragend: handler
        });

        moveNode(treeviewObject, "bar", "baz");

        ok(handler.calls);
        var e = eventArgs(handler);
        equal(treeviewObject.text(e.sourceNode), "bar");
        equal(e.destinationNode, treeviewObject.findByText("baz")[0]);
        equal(e.dropPosition, "over");
        equal(e.sourceNode, treeviewObject.findByText("bar")[0]);
    });

    test("drop event can be cancelled", function() {
        createTreeView({
            dragAndDrop: true,
            dataSource: [
                { text: "foo", expanded: true, items: [
                    { text: "bar" }
                ] },
                { text: "baz" }
            ],
            drop: function(e) {
                ok(e.preventDefault);
                e.preventDefault();
            }
        });

        moveNode(treeviewObject, "bar", "baz");

        equal(treeviewObject.findByText("foo").find(".k-group").length, 1);
        equal(treeviewObject.findByText("baz").find(".k-group").length, 0);
   });

   test("initialization of expanded nodes does not trigger expand events", function() {
       createTreeView({
            dataSource: [
                { text: "foo", expanded: true, items: [
                    { text: "bar" }
                ] }
            ],
            expand: handler
        });

        ok(!handler.calls);
   });

   test("setting Node.loaded to false allows nodes to be refreshed", function() {
       var calls = 0;

       createTreeView({
           animation: false,
           dataSource: {
               data: [
                   { text: "foo" }
               ],
               schema: {
                   model: {
                       hasChildren: true,
                       children: {
                           transport: {
                               read: function(options) {
                                   calls++;
                                   options.success([ { text: "bar" } ]);
                               }
                           }
                       }
                   }
               }
            },
            expand: function(e) {
                this.dataItem(e.node).loaded(false);
            }
        });

        treeviewObject.expand(".k-item:first");
        treeviewObject.collapse(".k-item:first");
        treeviewObject.expand(".k-item:first");

        equal(calls, 2);
   });

   test("dataBound event is triggered after dataSource changes", function() {
       createTreeView({
           dataSource: {
               transport: {
                   read: function(options) {
                       options.success([ { text: "foo" } ]);
                   }
               }
           },
           dataBound: handler
       });

       equal(handler.calls, 1);
       ok(typeof eventArgs(handler).node == "undefined");
   });

   test("dataBound event is triggered from sublevel", function() {
       createTreeView({
           dataSource: {
               transport: {
                   read: function(options) {
                       options.success([ { text: "foo", hasChildren: true } ]);
                   }
               }
           },
           dataBound: handler
       });

       treeviewObject.expand(".k-item");

       equal(handler.calls, 2);
       ok(handler.lastArgs[0].node.is(treeview.find(".k-item:first")));
   });

   test("selecting an item triggers change event", 1, function() {
       createTreeView({
           dataSource: [
               { text: "foo" }
           ],
           change: handler
       });

       treeview.find(".k-in").trigger("click");

       equal(handler.calls, 1);
   });

   asyncTest("moving node to unfetched parent triggers dragend when the source node is available", 2, function () {
       var timeout = setTimeout(start, 3000);
       var calls = 0;

       createTreeView({
           dragAndDrop: true,
           dataSource: {
               transport: {
                   read: function(options) {
                       calls++;
                       if (calls == 1) {
                           options.success([ { text: "foo", hasChildren: true }, { text: "bar" } ]);
                       } else {
                           setTimeout(function() {
                               options.success([ { text: "baz" } ]);
                           }, 10);
                       }
                   }
               }
           },
           dragend: function(e) {
               clearTimeout(timeout);
               start();

               ok(e.sourceNode);
               equal(treeviewObject.text(e.sourceNode), "bar");
           }
       });

       moveNode(treeviewObject, "bar", "foo");
   });

   test("checking checkbox triggers check event", function() {
       createTreeView({
           checkboxes: true,
           dataSource: [
               { text: "foo" }
           ],
           check: handler
       });

       treeview.find(":checkbox").attr("checked", true).trigger("change");

       equal(handler.calls, 1);

       equal(eventArgs(handler).node, treeview.find(".k-item")[0]);
   });
})();
