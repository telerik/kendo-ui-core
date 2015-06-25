(function() {
    var DataSource = kendo.data.DataSource,
        dataSource,
        ul;

    function setup(options) {
        var data = [];
        for (var idx = 0; idx < 5; idx++) {
            data.push({ id: idx, foo: "foo " + idx });
        }

        options = $.extend({
            template: "<li>${foo}</li>",
            dataSource: dataSource = new DataSource({
                transport: {
                    read: function(options) {
                        options.success(data);
                    },
                    destroy: $.noop,
                    update: $.noop
                },
                schema: {
                    model: {
                        id: "id",
                        fields: {
                            id: { type: "number", defaultValue: -1 },
                            foo: { type: "string" }
                        }
                    }
                }
            })
            }, options);
        return ul.kendoListView(options).data("kendoListView");
    }

    module("listView editing", {
        setup: function() {
            ul = $("<ul/>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            ul.remove();
        }
    });

    test("default edit template is empty string", function() {
        var listView = setup();

        equal(listView.editTemplate({}), "");
    });

    test("editTemplate options defined", function() {
        var editTemplate = "<li>edit template</li>",
        listView = setup({ editTemplate: editTemplate });

        equal(listView.editTemplate({}), editTemplate);
    });

    test("edit renders editTemplate for the current item", function() {
        var editTemplate = "<li>template</li>",
        listView = setup({ editTemplate: editTemplate });

        listView.edit(listView.element.children().first());
        equal(listView.element.children().first().html(), "template");
        ok(listView.element.children().first().hasClass("k-edit-item"));
    });

    test("edit binds the edit template", function() {
        var listView = setup({ editTemplate: "<li>edit ${foo}</li>" });

        listView.edit(listView.element.children().first());
        equal(listView.element.children().first().html(), "edit foo 0");
    });

    test("edit instantiates editable for edited item", function() {
        var listView = setup({ editTemplate: "<li>${foo}</li>" });

        listView.edit(listView.element.children().first());
        ok(listView.element.children().first().data("kendoEditable"));
        ok(listView.editable);
    });

    test("editable is destroyed on refresh", function() {
        var listView = setup({ editTemplate: "<li>${foo}</li>" });

        listView.edit(listView.element.children().first());
        dataSource.read();

        ok(!listView.editable);
    });

    test("item is refreshed on itemchange", function() {
        var listView = setup();
        dataSource.get(0).set("foo", "bar");

        equal(listView.element.children().first().text(), "bar");
    });

    test("edited item is not refreshed on itemchange", function() {
        var listView = setup({ editTemplate: "<li>${foo}</li>" });
        listView.edit(listView.element.find("li:first"));
        dataSource.get(0).set("foo", "bar");

        ok(listView.element.find("li:first").hasClass("k-edit-item"));
        equal(listView.element.find("li:first").text(), "foo 0");
    });

    test("correct model is passed to editable", function() {
        var listView = setup({ editTemplate: "<li></li>" });

        listView.edit(listView.element.children().first());
        equal(listView.editable.options.model, dataSource.get(0));
    });

    test("edit item triggers edit event", function() {
        var called = false,
        listView = setup({
            editTemplate: "<li></li>",
            edit: function() {
                called = true;
            }
        });

        listView.edit(listView.element.children().first());
        ok(called);
    });

    test("clicking the cancel button raises the cancel event", 2, function() {
        var called = false,
        listView = setup({
            editTemplate: '<li><button class="k-cancel-button"></li>',
            cancel: function(e) {
                ok(e.model);
                equal(e.container.length, 1);
            }
        });

        listView.edit(listView.element.children().first());

        listView.element.find(".k-cancel-button").click();
    });

    test("preventing the cancel event leaves the item in edit mode", function() {
        var called = false,
        listView = setup({
            editTemplate: '<li><button class="k-cancel-button"></li>',
            cancel: function(e) {
                e.preventDefault();
            }
        });

        listView.edit(listView.element.children().first());

        listView.element.find(".k-cancel-button").click();

        equal(listView.element.find(".k-cancel-button").length, 1);
    });

    test("item and model is send to edit event arguments", function() {
        var args = {},
        listView = setup({
            editTemplate: "<li></li>",
            edit: function() {
                args = arguments[0];
            }
        });

        listView.edit(listView.element.children().first());

        equal(args.model, dataSource.get(0));
        equal(args.item[0], listView.element.children()[0]);
    });

    test("save destroys the editable", function() {
        var listView = setup({ editTemplate: "<li>${foo}</li>" });

        listView.edit(listView.element.children().first());
        listView.save();

        ok(!listView.element.children().first().data("kendoEditable"));
        ok(!listView.editable);
    });

    test("save renders item template", function() {
        var listView = setup({ editTemplate: "<li>edit ${foo}</li>" });

        listView.edit(listView.element.children().first());
        listView.save();

        equal(listView.element.children().first().html(), "foo 0");
    });

    test("save renders item alternating template", function() {
        var listView = setup({
            editTemplate: "<li>edit ${foo}</li>",
            altTemplate: "<li>bar</li>"
        });

        listView.edit(listView.element.children().eq(1));
        listView.save();

        equal(listView.element.children().eq(1).html(), "bar");
    });

    test("edit closes previous edited item", function() {
        var listView = setup({ editTemplate: "<li>${foo}</li>" });

        listView.edit(listView.element.children().eq(0));
        listView.edit(listView.element.children().eq(1));

        ok(!listView.element.children().eq(0).data("kendoEditable"));
        ok(listView.element.children().eq(1).data("kendoEditable"));
    });

    test("edit cancels previous edited item changes", function() {
        var listView = setup({ editTemplate: "<li>${foo}</li>" });

        listView.edit(listView.element.children().eq(0));
        dataSource.get(0).set("foo", "bar");
        listView.edit(listView.element.children().eq(1));

        equal(dataSource.get(0).foo, "foo 0");
    });

    test("save does not close edited item if validation fails", function() {
        var listView = setup({ editTemplate: '<li><input data-value="foo" required/></li>' });

        listView.edit(listView.element.children().eq(0));
        listView.element.find(":input").val("");
        listView.save();

        ok(listView.element.children().eq(0).data("kendoEditable"));
    });

    test("save event is not triggerd if validation fails", 0, function() {
        var listView = setup({ editTemplate: '<li><input data-value="foo" required/></li>' });

        listView.edit(listView.element.children().eq(0));
        listView.element.find(":input").val("");

        listView.bind("save", function() {
            ok(false);
        });

        listView.save();
    });

    test("save calls DataSource sync", function() {
        var listView = setup({ editTemplate: '<li><input data-value="foo"/></li>' }),
        sync = stub(dataSource, "sync");

        listView.edit(listView.element.children().eq(0));
        listView.element.find(":input").val("");
        listView.save();

        ok(sync.calls("sync"));
    });

    test("remove hides the item", function() {
        var listView = setup(),
        item = listView.element.children().first();

        listView.remove(item);

        ok(!item.is(":visible"));
    });

    test("remove calls dataSource remove", function() {
        var listView = setup(),
        removeMethod = stub(dataSource, "remove");

        listView.remove(listView.element.children().first());

        ok(removeMethod.calls("remove"));
        ok(removeMethod.args("remove", 0)[0] instanceof kendo.data.Model);
        equal(removeMethod.args("remove", 0)[0].get("id"), 0);
    });

    test("remove triggers remove event", function() {
        var called = false,
        listView = setup({
            remove: function() {
                called = true;
            }
        });

        listView.remove(listView.element.children().first());

        ok(called);
    });

    test("remove event pass model and item as arguments", function() {
        var args,
        listView = setup({
            remove: function() {
                args = arguments[0];
            }
        }),
        item = listView.element.children().first();

        listView.remove(item);

        equal(args.item[0], item[0]);
        equal(args.model.id, 0);
    });

    test("remove event prevention", function() {
        var listView = setup({
            remove: function(e) {
                e.preventDefault();
            }
        }),
        item = listView.element.children().first();

        listView.remove(item);

        ok(item.is(":visible"));
        ok(dataSource.get(0));
    });

    test("remove calls dataSource sync", function() {
        var listView = setup(),
        syncMethod= stub(dataSource, "sync");

        listView.remove(listView.element.children().first());

        ok(syncMethod.calls("sync"));
    });

    test("remove reverts currently edited item", function() {
        var listView = setup({
            editTemplate: "<li>${foo}</li>"
        });

        listView.edit(listView.element.children().eq(0));

        dataSource.get(0).set("foo", "bar");

        listView.remove(listView.element.children().last());

        equal(dataSource.get(0).foo, "foo 0");
    });

    test("add adds new model in DataSource", function() {
        var listView = setup();
        listView.add();

        ok(dataSource.at(0).isNew());
    });

    test("add  adds new model before first item in the view", function() {
        var listView = setup();
        dataSource.query({ page: 2, pageSize: 1 });
        listView.add();

        ok(dataSource.at(1).isNew());
    });

    test("add adds new model if DataSource has no data", function() {
        var listView = setup({
            template: "<li></li>",
            dataSource: {
                schema: {
                    model: {
                        id: "id"
                    }
                }
            }
        });
        listView.add();

        ok(listView.dataSource.at(0).isNew());
    });

    test("add edit first item", function() {
        var listView = setup({
            editTemplate: '<li><input data-value="foo" /></li>'
        });

        listView.add ();

        var item = listView.element.children().first();
        ok(item.hasClass("k-edit-item"));
        equal(item.find(":input").val(), "");
        equal(listView.editable.element[0], item[0]);
    });

    test("add triggers edit event", function() {
        var args,
        listView = setup({
            editTemplate: '<li><input data-value="foo" /></li>',
            edit: function() {
                args = arguments[0];
            }
        });

        listView.add();

        var item = listView.element.children().first();
        equal(args.item[0], item[0]);
        ok(args.model.isNew());
    });

    test("add cancels previous edited item changes", function() {
        var listView = setup({ editTemplate: "<li>${foo}</li>" });

        listView.edit(listView.element.children().eq(0));
        dataSource.get(0).set("foo", "bar");
        listView.add();

        equal(dataSource.get(0).foo, "foo 0");
    });

    test("cancel calls cancelChanges of DataSource for the edited item", function() {
        var listView = setup({
            editTemplate: '<li><input data-bind="value:foo" /></li>'
        });

        var cancelChanges = stub(dataSource, "cancelChanges");
        listView.edit(ul.children().eq(0));
        listView.cancel();

        equal(cancelChanges.calls("cancelChanges"), 1);
        equal(cancelChanges.args("cancelChanges", 0)[0].id, 0);
    });

    test("cancel does not call cancelChanges of DataSource if no edited item", function() {
        var listView = setup({
            editTemplate: '<li><input data-bind="value:foo" /></li>'
        });

        var cancelChanges = stub(dataSource, "cancelChanges");
        listView.cancel();

        equal(cancelChanges.calls("cancelChanges"), 0);
    });

    test("cancel revert the item to item template", function() {
        var listView = setup({
            editTemplate: '<li><input data-bind="value:foo" /></li>'
        });

        listView.edit(ul.children().eq(0));
        listView.cancel();

        equal(ul.children().eq(0).html(), "foo 0");
    });

    test("cancel revert the item to item alternative template", function() {
        var listView = setup({
            editTemplate: '<li><input data-bind="value:foo" /></li>',
            altTemplate: "<li>bar</li>"
        });

        listView.edit(ul.children().eq(1));
        listView.cancel();

        equal(ul.children().eq(1).html(), "bar");
    });

    test("save event is triggered", function() {
        var called = false,
        listView = setup({
            editTemplate: "<li></li>",
            save: function() {
                called = true;
            }
        });

        listView.edit(listView.element.children().first());
        listView.save();
        ok(called);
    });

    test("save event can be prevented", function() {
        var listView = setup({
            editTemplate: "<li></li>",
            save: function(e) {
                e.preventDefault();
            }
        });

        listView.edit(listView.element.children().first());
        listView.save();
        ok(listView.element.children().first().hasClass("k-edit-item"));
    });

    test("edit after add cancels previous edit item", function() {
        var listView = setup({ editTemplate: "<li>${foo}</li>" });

        listView.add();
        listView.edit(listView.element.children().eq(1));

        ok(listView.element.children().eq(0).hasClass("k-edit-item"));
        equal(dataSource.get(0).foo, "foo 0");
    });
})();
