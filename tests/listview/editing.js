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

    describe("listView editing", function() {
        beforeEach(function() {
            ul = $("<ul/>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
            ul.remove();
        });

        it("default edit template is empty string", function() {
            var listView = setup();

            assert.equal(listView.editTemplate({}), "");
        });

        it("editTemplate options defined", function() {
            var editTemplate = "<li>edit template</li>",
                listView = setup({ editTemplate: editTemplate });

            assert.equal(listView.editTemplate({}), editTemplate);
        });

        it("edit renders editTemplate for the current item", function() {
            var editTemplate = "<li>template</li>",
                listView = setup({ editTemplate: editTemplate });

            listView.edit(listView.element.children().first());
            assert.equal(listView.element.children().first().html(), "template");
            assert.isOk(listView.element.children().first().hasClass("k-edit-item"));
        });

        it("edit binds the edit template", function() {
            var listView = setup({ editTemplate: "<li>edit ${foo}</li>" });

            listView.edit(listView.element.children().first());
            assert.equal(listView.element.children().first().html(), "edit foo 0");
        });

        it("edit instantiates editable for edited item", function() {
            var listView = setup({ editTemplate: "<li>${foo}</li>" });

            listView.edit(listView.element.children().first());
            assert.isOk(listView.element.children().first().data("kendoEditable"));
            assert.isOk(listView.editable);
        });

        it("editable is destroyed on refresh", function() {
            var listView = setup({ editTemplate: "<li>${foo}</li>" });

            listView.edit(listView.element.children().first());
            dataSource.read();

            assert.isOk(!listView.editable);
        });

        it("item is refreshed on itemchange", function() {
            var listView = setup();
            dataSource.get(0).set("foo", "bar");

            assert.equal(listView.element.children().first().text(), "bar");
        });

        it("edited item is not refreshed on itemchange", function() {
            var listView = setup({ editTemplate: "<li>${foo}</li>" });
            listView.edit(listView.element.find("li:first"));
            dataSource.get(0).set("foo", "bar");

            assert.isOk(listView.element.find("li:first").hasClass("k-edit-item"));
            assert.equal(listView.element.find("li:first").text(), "foo 0");
        });

        it("correct model is passed to editable", function() {
            var listView = setup({ editTemplate: "<li></li>" });

            listView.edit(listView.element.children().first());
            assert.equal(listView.editable.options.model, dataSource.get(0));
        });

        it("edit item triggers edit event", function() {
            var called = false,
                listView = setup({
                    editTemplate: "<li></li>",
                    edit: function() {
                        called = true;
                    }
                });

            listView.edit(listView.element.children().first());
            assert.isOk(called);
        });

        it("clicking the cancel button raises the cancel event", function() {
            var called = false,
                listView = setup({
                    editTemplate: '<li><button class="k-cancel-button"></li>',
                    cancel: function(e) {
                        assert.isOk(e.model);
                        assert.equal(e.container.length, 1);
                    }
                });

            listView.edit(listView.element.children().first());

            listView.element.find(".k-cancel-button").click();
        });

        it("preventing the cancel event leaves the item in edit mode", function() {
            var called = false,
                listView = setup({
                    editTemplate: '<li><button class="k-cancel-button"></li>',
                    cancel: function(e) {
                        e.preventDefault();
                    }
                });

            listView.edit(listView.element.children().first());

            listView.element.find(".k-cancel-button").click();

            assert.equal(listView.element.find(".k-cancel-button").length, 1);
        });

        it("item and model is send to edit event arguments", function() {
            var args = {},
                listView = setup({
                    editTemplate: "<li></li>",
                    edit: function() {
                        args = arguments[0];
                    }
                });

            listView.edit(listView.element.children().first());

            assert.equal(args.model, dataSource.get(0));
            assert.equal(args.item[0], listView.element.children()[0]);
        });

        it("save destroys the editable", function() {
            var listView = setup({ editTemplate: "<li>${foo}</li>" });

            listView.edit(listView.element.children().first());
            listView.save();

            assert.isOk(!listView.element.children().first().data("kendoEditable"));
            assert.isOk(!listView.editable);
        });

        it("save renders item template", function() {
            var listView = setup({ editTemplate: "<li>edit ${foo}</li>" });

            listView.edit(listView.element.children().first());
            listView.save();

            assert.equal(listView.element.children().first().html(), "foo 0");
        });

        it("save renders item alternating template", function() {
            var listView = setup({
                editTemplate: "<li>edit ${foo}</li>",
                altTemplate: "<li>bar</li>"
            });

            listView.edit(listView.element.children().eq(1));
            listView.save();

            assert.equal(listView.element.children().eq(1).html(), "bar");
        });

        it("edit closes previous edited item", function() {
            var listView = setup({ editTemplate: "<li>${foo}</li>" });

            listView.edit(listView.element.children().eq(0));
            listView.edit(listView.element.children().eq(1));

            assert.isOk(!listView.element.children().eq(0).data("kendoEditable"));
            assert.isOk(listView.element.children().eq(1).data("kendoEditable"));
        });

        it("edit cancels previous edited item changes", function() {
            var listView = setup({ editTemplate: "<li>${foo}</li>" });

            listView.edit(listView.element.children().eq(0));
            dataSource.get(0).set("foo", "bar");
            listView.edit(listView.element.children().eq(1));

            assert.equal(dataSource.get(0).foo, "foo 0");
        });

        it("save does not close edited item if validation fails", function() {
            var listView = setup({ editTemplate: '<li><input data-value="foo" required/></li>' });

            listView.edit(listView.element.children().eq(0));
            listView.element.find(":input").val("");
            listView.save();

            assert.isOk(listView.element.children().eq(0).data("kendoEditable"));
        });

        it("save event is not triggerd if validation fails", function() {
            var listView = setup({ editTemplate: '<li><input data-value="foo" required/></li>' });

            listView.edit(listView.element.children().eq(0));
            listView.element.find(":input").val("");

            listView.bind("save", function() {
                assert.isOk(false);
            });

            listView.save();
        });

        it("save calls DataSource sync", function() {
            var listView = setup({ editTemplate: '<li><input data-value="foo"/></li>' }),
                sync = stub(dataSource, "sync");

            listView.edit(listView.element.children().eq(0));
            listView.element.find(":input").val("");
            listView.save();

            assert.isOk(sync.calls("sync"));
        });

        it("remove hides the item", function() {
            var listView = setup(),
                item = listView.element.children().first();

            listView.remove(item);

            assert.isOk(!item.is(":visible"));
        });

        it("remove calls dataSource remove", function() {
            var listView = setup(),
                removeMethod = stub(dataSource, "remove");

            listView.remove(listView.element.children().first());

            assert.isOk(removeMethod.calls("remove"));
            assert.isOk(removeMethod.args("remove", 0)[0] instanceof kendo.data.Model);
            assert.equal(removeMethod.args("remove", 0)[0].get("id"), 0);
        });

        it("remove triggers remove event", function() {
            var called = false,
                listView = setup({
                    remove: function() {
                        called = true;
                    }
                });

            listView.remove(listView.element.children().first());

            assert.isOk(called);
        });

        it("remove event pass model and item as arguments", function() {
            var args,
                listView = setup({
                    remove: function() {
                        args = arguments[0];
                    }
                }),
                item = listView.element.children().first();

            listView.remove(item);

            assert.equal(args.item[0], item[0]);
            assert.equal(args.model.id, 0);
        });

        it("remove event prevention", function() {
            var listView = setup({
                remove: function(e) {
                    e.preventDefault();
                }
            }),
                item = listView.element.children().first();

            listView.remove(item);

            assert.isOk(item.is(":visible"));
            assert.isOk(dataSource.get(0));
        });

        it("remove calls dataSource sync", function() {
            var listView = setup(),
                syncMethod = stub(dataSource, "sync");

            listView.remove(listView.element.children().first());

            assert.isOk(syncMethod.calls("sync"));
        });

        it("remove reverts currently edited item", function() {
            var listView = setup({
                editTemplate: "<li>${foo}</li>"
            });

            listView.edit(listView.element.children().eq(0));

            dataSource.get(0).set("foo", "bar");

            listView.remove(listView.element.children().last());

            assert.equal(dataSource.get(0).foo, "foo 0");
        });

        it("add adds new model in DataSource", function() {
            var listView = setup();
            listView.add();

            assert.isOk(dataSource.at(0).isNew());
        });

        it("add  adds new model before first item in the view", function() {
            var listView = setup();
            dataSource.query({ page: 2, pageSize: 1 });
            listView.add();

            assert.isOk(dataSource.at(1).isNew());
        });

        it("add adds new model if DataSource has no data", function() {
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

            assert.isOk(listView.dataSource.at(0).isNew());
        });

        it("add edit first item", function() {
            var listView = setup({
                editTemplate: '<li><input data-value="foo" /></li>'
            });

            listView.add();

            var item = listView.element.children().first();
            assert.isOk(item.hasClass("k-edit-item"));
            assert.equal(item.find(":input").val(), "");
            assert.equal(listView.editable.element[0], item[0]);
        });

        it("add triggers edit event", function() {
            var args,
                listView = setup({
                    editTemplate: '<li><input data-value="foo" /></li>',
                    edit: function() {
                        args = arguments[0];
                    }
                });

            listView.add();

            var item = listView.element.children().first();
            assert.equal(args.item[0], item[0]);
            assert.isOk(args.model.isNew());
        });

        it("add cancels previous edited item changes", function() {
            var listView = setup({ editTemplate: "<li>${foo}</li>" });

            listView.edit(listView.element.children().eq(0));
            dataSource.get(0).set("foo", "bar");
            listView.add();

            assert.equal(dataSource.get(0).foo, "foo 0");
        });

        it("cancel calls cancelChanges of DataSource for the edited item", function() {
            var listView = setup({
                editTemplate: '<li><input data-bind="value:foo" /></li>'
            });

            var cancelChanges = stub(dataSource, "cancelChanges");
            listView.edit(ul.children().eq(0));
            listView.cancel();

            assert.equal(cancelChanges.calls("cancelChanges"), 1);
            assert.equal(cancelChanges.args("cancelChanges", 0)[0].id, 0);
        });

        it("cancel does not call cancelChanges of DataSource if no edited item", function() {
            var listView = setup({
                editTemplate: '<li><input data-bind="value:foo" /></li>'
            });

            var cancelChanges = stub(dataSource, "cancelChanges");
            listView.cancel();

            assert.equal(cancelChanges.calls("cancelChanges"), 0);
        });

        it("cancel revert the item to item template", function() {
            var listView = setup({
                editTemplate: '<li><input data-bind="value:foo" /></li>'
            });

            listView.edit(ul.children().eq(0));
            listView.cancel();

            assert.equal(ul.children().eq(0).html(), "foo 0");
        });

        it("cancel revert the item to item alternative template", function() {
            var listView = setup({
                editTemplate: '<li><input data-bind="value:foo" /></li>',
                altTemplate: "<li>bar</li>"
            });

            listView.edit(ul.children().eq(1));
            listView.cancel();

            assert.equal(ul.children().eq(1).html(), "bar");
        });

        it("save event is triggered", function() {
            var called = false,
                listView = setup({
                    editTemplate: "<li></li>",
                    save: function() {
                        called = true;
                    }
                });

            listView.edit(listView.element.children().first());
            listView.save();
            assert.isOk(called);
        });

        it("save event can be prevented", function() {
            var listView = setup({
                editTemplate: "<li></li>",
                save: function(e) {
                    e.preventDefault();
                }
            });

            listView.edit(listView.element.children().first());
            listView.save();
            assert.isOk(listView.element.children().first().hasClass("k-edit-item"));
        });

        it("edit after add cancels previous edit item", function() {
            var listView = setup({ editTemplate: "<li>${foo}</li>" });

            listView.add();
            listView.edit(listView.element.children().eq(1));

            assert.isOk(listView.element.children().eq(0).hasClass("k-edit-item"));
            assert.equal(dataSource.get(0).foo, "foo 0");
        });
    });
}());
