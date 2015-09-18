(function() {
    var Editable = kendo.ui.Editable,
        Model = kendo.data.Model,
        div,
        defaultModel = new (Model.define({ fields: { foo: "foo" } }))();

    module("kendo.ui.Editable", {
        setup: function() {
            div = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    function setup(options, createModel) {
        return new Editable(div, options);
    }

    test("kendoEditable is attached to the target element", function() {
        var element = div.kendoEditable( { model: defaultModel });

        ok(element.data("kendoEditable") instanceof Editable);
    });

    test("destroys existing validator on refresh", function() {
        var editable = div.kendoEditable( { model: defaultModel }).data("kendoEditable");
        var validatable = editable.validatable;
        var destroy = validatable.destroy;
        validatable.destroy = function() {
            destroy.call(this);
            ok(true);
        };
        editable.refresh();
    });

    test("renders input element for field", function() {
        var editable = setup({ fields: "foo", model: defaultModel });

        equal(editable.element.find(":input").length, 1);
    });

    test("does not clear container is set", function() {
        var editable = div.append($('<div />')).kendoEditable({
            fields: "foo",
            model: defaultModel,
            clearContainer: false
        });

        equal(editable.find("div").length, 1);
    });

    test("renders input element within the child element container if specified", function() {
        var editable = div.append($('<div data-container-for="foo"/>')).kendoEditable({
            fields: "foo",
            model: defaultModel,
            clearContainer: false
        });
        equal(editable.find("div > :input").length, 1);
    });

    test("renders input element within the child element container if specified for complex fields", function() {
        var editable = div.append($('<div data-container-for="foo.bar"/>')).kendoEditable({
            fields: "foo.bar",
            model: defaultModel,
            clearContainer: false
        });
        equal(editable.find("div > :input").length, 1);
    });

    test("input name is same as field", function() {
        var editable = setup({ fields: "foo", model: defaultModel });

        equal(editable.element.find(":input[name=foo]").length, 1);
    });

    test("no inputs are rendered when no fields are specifed", function() {
        var editable = setup({ model: defaultModel });

        ok(!editable.element.find(":input").length);
    });

    test("input is rendered for every field", function() {
        var editable = setup({ fields: ["foo", "bar"], model: new (Model.define({ fields: { foo: "foo", bar: "bar" } }))() }),
        elements = editable.element.find(":input");

        equal(elements.length, 2);
        equal(elements.eq(0).attr("name"), "foo");
        equal(elements.eq(1).attr("name"), "bar");
    });

    test("input value is bound to the value from model", function() {
        var MyModel = Model.define({ fields: { foo: "foo" } }),
        model = new MyModel({ foo: "bar" }),
        editable = setup({ fields: "foo", model: model });

        equal(editable.element.find("input[name=foo]").val(), "bar");
    });

    test("container is cleared", function() {
        div.append($("<span/>"));

        var  editable = setup({ fields: "foo", model: defaultModel });

        equal(div.children().length, 1);
        equal(div.find(":input").length, 1);
    });

    test("input[type=text] is created for field with type set to number", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    type: "number"
                }
            }
        }),
        model = new MyModel(),
        editable = setup({ fields: "foo", model: model });

        equal(div.find(":input[type=text][name=foo]").length, 1);
    });

    test("input[type=text] is created for field without type set", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo"
                }
            }
        }),
        model = new MyModel(),
        editable = setup({ fields: "foo", model: model });

        equal(div.find(":input[type=text]").length, 1);
    });

    test("input[type=text] is created for field with type set to string", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    type: "string"
                }
            }
        }),
        model = new MyModel(),
        editable = setup({ fields: "foo", model: model });

        equal(div.find(":input[type=text]").length, 1);
    });

    test("input[type=text] is created for field which type does not have editor defined", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    type: "bar"
                }
            }
        }),
        model = new MyModel(),
        editable = setup({ fields: "foo", model: model });

        equal(div.find(":input[type=text]").length, 1);
    });

    test("input[type=checkbox] is created for field of type boolean", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    type: "boolean"
                }
            }
        }),
        model = new MyModel(),
        editable = setup({ fields: "foo", model: model });

        equal(div.find(":input[type=checkbox]").length, 1);
    });

    test("custom editor is used if set", function() {
        var wasCalled = false,
        MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    type: "string"
                }
            }
        }),
        model = new MyModel(),
        editable = setup({
            fields: {
                field: "foo",
                editor: function() {
                    wasCalled = true;
                    return $();
                }
            },
            model: model
        });

        ok(wasCalled);
    });

    test("custom editor is bind by name", function() {
        var model = kendo.observable({ foo: "bar" }),
        editable = setup({
            fields: {
                field: "foo",
                editor: function(container) {
                    container.append($('<input name="foo" />'));
                }
            },
            model: model
        });

        equal(div.find("input").val(), "bar");
    });

    test("custom editor checkbox is bind by name", function() {
        var model = kendo.observable({ foo: true }),
        editable = setup({
            fields: {
                field: "foo",
                type: "boonlean",
                editor: function(container) {
                    container.append($('<input type="checkbox" name="foo" />'));
                }
            },
            model: model
        });

        ok(div.find("input:checked").length);
    });

    test("custom editor radio button is bind by name", function() {
        var model = kendo.observable({ foo: true }),
        editable = setup({
            fields: {
                field: "foo",
                editor: function(container) {
                    container.append($('<input type="radio" name="foo" value="true" /><input type="radio" name="foo" value="false" />'));
                }
            },
            model: model
        });

        ok(div.find("input:first:checked").length);
    });
    test("custom editor as string", function() {
        var wasCalled = false,
        MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    type: "string"
                }
            }
        }),
        model = new MyModel(),
        editable = setup({
            fields: {
                field: "foo",
                editor: '<input name="foo"/>'
            },
            model: model
        });

        ok(div.find("input[name=foo]").length);
    });

    test("custom editor name binding is added to already existing one", function() {
        var model = kendo.observable({ foo: "bar", items: ["foo", "bar"] }),
        editable = setup({
            fields: {
                field: "foo",
                editor: function(container) {
                    container.append($('<select name="foo" data-bind="source:items"/>'));
                }
            },
            model: model
        });

        equal(div.find("select").val(), "bar");
    });

    test("custom editor widget is bind by name", function() {
        var model = kendo.observable({ foo: "bar", items: ["foo", "bar"] }),
        editable = setup({
            fields: {
                field: "foo",
                editor: function(container) {
                    container.append($('<select data-role="dropdownlist" name="foo" data-bind="source:items"/>'));
                }
            },
            model: model
        });

        equal(div.find("select").data("kendoDropDownList").value(), "bar");
    });

    test("input[type=text] is created for field with type set to date", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    type: "date"
                }
            }
        }),
        model = new MyModel(),
        editable = setup({ fields: "foo", model: model });

        equal(div.find(":input[type=text]").length, 1);
    });

    test("container and options are passed to the custom editor", function() {
        var args,
        MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    type: "string"
                }
            }
        }),
        model = new MyModel(),
        editable = setup({
            fields: {
                field: "foo",
                editor: function() {
                    args = arguments;
                }
            },
            model: model
        });

        equal(args.length, 2);
        equal(args[1].field, "foo");
        equal(args[1].model, model);
        ok(args[0]);
    });

    test("format is passed to editor", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo"
                }
            }
        }),
        format,
        model = new MyModel(),
        editable = setup({
            fields: {
                field: "foo",
                format: "bar",
                editor: function(container, options) {
                    format = options.format;
                }
            },
            model: model
        });

        equal(format, "bar");
    });

    test("format is passed to date type editor", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    type: "date"
                }
            }
        }),
        model = new MyModel(),
        editable = setup({
            fields: {
                field: "foo",
                format: "bar"
            },
            model: model
        });

        equal(div.find("input").data("kendoDatePicker").options.format, "bar");
    });

    test("extacted format is passed to date type editor", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    type: "date"
                }
            }
        }),
        model = new MyModel(),
        editable = setup({
            fields: {
                field: "foo",
                format: "{0:dd.MM.yyyy}"
            },
            model: model
        });

        equal(div.find("input").attr(kendo.attr("format")), "dd.MM.yyyy");
    });

    test("default picker format is preserved if no field format is set", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    type: "date"
                }
            }
        }),
        model = new MyModel(),
        editable = setup({
            fields: {
                field: "foo"
            },
            model: model
        });

        equal(div.find("input").data("kendoDatePicker").options.format, "M/d/yyyy");
    });

    test("format is passed to number type editor", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    type: "number"
                }
            }
        }),
        model = new MyModel(),
        editable = setup({
            fields: {
                field: "foo",
                format: "bar"
            },
            model: model
        });

        equal(div.find("input").eq(1).data("kendoNumericTextBox").options.format, "bar");
    });

    test("default numeric format is preserved if no field format is set", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    type: "number"
                }
            }
        }),
        model = new MyModel(),
        editable = setup({
            fields: {
                field: "foo"
            },
            model: model
        });

        equal(div.find("input").eq(1).data("kendoNumericTextBox").options.format, "n");
    });

    test("binds input without bindings to the model", function() {
        var editable = div.append($('<div><input name="foo"/></div>')).kendoEditable({
            fields: "foo",
            model: defaultModel,
            clearContainer: false
        });

        defaultModel.set("foo", "baz");

        equal(div.find("input").val(), "baz");
    });

    test("skip binding input type file without binding", function() {
        var editable = div.append($('<div><input type="file" name="foo"/></div>')).kendoEditable({
            fields: "foo",
            model: defaultModel,
            clearContainer: false
        });

        ok(!div.find("input[type=file]").filter("[data-bind]").length);
    });

    test("does not bind input element of upload widget", function() {
        var editable = div.append($('<div><input name="baz" data-role="upload"/></div>')).kendoEditable({
            model: defaultModel,
            clearContainer: false
        });

        ok(!div.find("input").data("bind"));
    });

    test("does not bind input element with skip attribute", function() {
        var editable = div.append($('<div><input name="baz" data-skip="skip"/></div>')).kendoEditable({
            model: defaultModel,
            clearContainer: false
        });

        ok(!div.find("input").data("bind"));
    });

    test("dropdown is displayed if field values are empty array", function() {
        defaultModel.foo = "foo";

        var editable = div.append($('<div></div>')).kendoEditable({
            fields: { field: "foo", values: [] },
            model: defaultModel
        });

        ok(div.find("select").data("kendoDropDownList"));
    });

    test("dropdown is displayed if field values are set", function() {
        defaultModel.foo = "foo";

        var editable = div.append($('<div></div>')).kendoEditable({
            fields: { field: "foo", values: [ { text: "bar", value: "foo" }] },
            model: defaultModel
        });

        ok(div.find("select").data("kendoDropDownList"));
        equal(div.find("select").data("kendoDropDownList").value(), "foo");
        equal(div.find("select").data("kendoDropDownList").text(), "bar");
    });
})();
