(function() {
    var Editable = kendo.ui.Editable,
        Model = kendo.data.Model,
        div;

    module("kendo.ui.Editable", {
        setup: function() {
            div = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("setting required validation rule renderes required attr", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    validation: {
                        required: true
                    }
                }
            }
        }),
        model = new MyModel(),
        editable = new Editable(div, { fields: "foo", model: model });

        ok(div.find(":input[required]").length);
    });

    test("setting custom validation rule does not renders attr", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    validation: {
                        bar: function() {}
                    }
                }
            }
        }),
        model = new MyModel(),
        editable = new Editable(div, { fields: "foo", model: model });

        ok(!div.find(":input").data("type"));
    });

    test("setting multiple validation rules renders attr", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    validation: {
                        required: true,
                        pattern: "foo"
                    }
                }
            }
        }),
        model = new MyModel(),
        editable = new Editable(div, { fields: "foo", model: model }),
        input = div.find(":input");

        ok(input.attr("required"));
        ok(input.attr("pattern"));
    });

    test("setting url rule renderes data-type=url attr", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    validation: {
                        url: true
                    }
                }
            }
        }),
        model = new MyModel(),
        editable = new Editable(div, { fields: "foo", model: model }),
        input = div.find(":input");

        ok(!input.attr("url"));
        equal(input.data("type"), "url");
    });

    test("setting email rule renderes data-type=email attr", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    validation: {
                        email: true
                    }
                }
            }
        }),
        model = new MyModel(),
        editable = new Editable(div, { fields: "foo", model: model }),
        input = div.find(":input");

        ok(!input.attr("email"));
        equal(input.data("type"), "email");
    });

    test("for field of type number data-type=number attr is rendered", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    type: "number"
                }
            }
        }),
        model = new MyModel(),
        editable = new Editable(div, { fields: "foo", model: model }),
        input = div.find("input[name=foo]");

        equal(input.data("type"), "number");
    });

    test("for field of type date data-type=date attr is rendered", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    type: "date"
                }
            }
        }),
        model = new MyModel(),
        editable = new Editable(div, { fields: "foo", model: model }),
        input = div.find(":input");

        equal(input.data("type"), "date");
    });

    test("for field of type date format attrr is rendered", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    type: "date"
                }
            }
        }),
        model = new MyModel(),
        editable = new Editable(div, { fields: [{ field: "foo", format: "format" }], model: model }),
        input = div.find(":input");

        equal(input.attr(kendo.attr("format")), "format");
    });

    test("for field of type boolean data-type=boolean attr is rendered", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    type: "boolean"
                }
            }
        }),
        model = new MyModel(),
        editable = new Editable(div, { fields: "foo", model: model }),
        input = div.find(":input");

        equal(input.data("type"), "boolean");
    });

    test("setting custom validation rule does not render attr", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    validation: {
                        bar: function() { return true; }
                    }
                }
            }
        }),
        model = new MyModel(),
        editable = new Editable(div, { fields: "foo", model: model }),
        input = div.find(":input");

        ok(!input.data("type"));
        ok(!input.attr("bar"));
    });

    test("custom validation message is rendered as input attr", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    validation: {
                        required: { message: "my message" }
                    }
                }
            }
        }),
        model = new MyModel(),
        editable = new Editable(div, { fields: "foo", model: model }),
        input = div.find(":input");

        equal(input.data("required-msg"), "my message");
    });

    test("validation message is not rendered as input attr", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    validation: {
                        required: true
                    }
                }
            }
        }),
        model = new MyModel(),
        editable = new Editable(div, { fields: "foo", model: model }),
        input = div.find(":input");

        ok(!input.filter("[data-required-msg]").length);
    });

    test("multiple custom validation messages are rendered as input attr", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    validation: {
                        required: { message: "required message" },
                        email: { message: "email message" }
                    }
                }
            }
        }),
        model = new MyModel(),
        editable = new Editable(div, { fields: "foo", model: model }),
        input = div.find(":input");

        equal(input.attr("required"), "required");
        equal(input.data("required-msg"), "required message");
        equal(input.data("email-msg"), "email message");
    });

    test("for field of type number min constraint attr is rendered", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    type: "number",
                    validation: {
                        min: 10
                    }
                }
            }
        }),
        model = new MyModel(),
        editable = new Editable(div, { fields: "foo", model: model }),
        input = div.find("input[name=foo]");

        equal(input.attr("min"), 10);
    });

    test("for field of type number min constraint and validation message attrs are rendered", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    type: "number",
                    validation: {
                        min: { value: 10, message: "min message" }
                    }
                }
            }
        }),
        model = new MyModel(),
        editable = new Editable(div, { fields: "foo", model: model }),
        input = div.find("input[name=foo]");

        equal(input.attr("min"), 10);
        equal(input.data("min-msg"), "min message");
    });

    test("for field of type email and validation message attrs are rendered", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    validation: {
                        email: { message: "email message" }
                    }
                }
            }
        }),
        model = new MyModel(),
        editable = new Editable(div, { fields: "foo", model: model }),
        input = div.find(":input");

        equal(input.data("type"), "email");
        equal(input.data("email-msg"), "email message");
    });

    test("custom validation rules are assign to validation instance", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    validation: {
                        foo: function() {

                        }
                    }
                }
            }
        }),
        model = new MyModel(),
        editable = new Editable(div, { fields: "foo", model: model }),
        validatable = editable.validatable,
        input = div.find(":input");

        ok($.isFunction(validatable.options.rules.foo));
    });

    test("custom validation rules are assign to validation instance if no fields are assigned", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    validation: {
                        foo: function() {

                        }
                    }
                }
            }
        }),
        model = new MyModel(),
        editable = new Editable(div, { model: model }),
        validatable = editable.validatable,
        input = div.find(":input");

        ok($.isFunction(validatable.options.rules.foo));
    });

    test("model is not updated if validation fails", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    validation: {
                        foo: function() {
                            return false;
                        }
                    }
                }
            }
        }),
        model = new MyModel({ foo: "bar" }),
        editable = new Editable(div, { fields: "foo", model: model }),
        input = div.find(":input");

        input.val("foo").trigger("change");

        equal(model.get("foo"), "bar");
    });

    test("change event is triggered if validation success", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    validation: {
                        foo: function() {
                            return true;
                        }
                    }
                }
            }
        }),
        model = new MyModel({ foo: "bar" }),
        wasCalled = false,
        editable = new Editable(div, { fields: "foo", model: model, change: function() { wasCalled = true; } }),
        input = div.find(":input");

        input.val("foo").trigger("change");

        equal(model.get("foo"), "foo");
        ok(wasCalled);
    });

    test("change event is triggered once after refresh is called", 1, function() {
        var MyModel = Model.define({
                fields: {
                    foo: {
                        field: "foo",
                        validation: {
                            foo: function() {
                                return true;
                            }
                        }
                    }
                }
            });

        var model = new MyModel({ foo: "bar" });

        var editable = new Editable(div, {
            fields: "foo",
            model: model,
            change: function() {
                ok(true);
            } });

        editable.refresh();

        div.find(":input").val("foo").trigger("change");
    });

    test("change event is not triggered if validation fails", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    validation: {
                        foo: function() {
                            return false;
                        }
                    }
                }
            }
        }),
        model = new MyModel({ foo: "bar" }),
        wasCalled = false,
        editable = new Editable(div, { fields: "foo", model: model, change: function() { wasCalled = true; } }),
        input = div.find(":input");

        input.val("foo").trigger("change");

        equal(model.get("foo"), "bar");
        ok(!wasCalled);
    });

    test("end method detaches the change event", 1, function() {
        var model = new Model({ foo: "bar" }),
        editable = new Editable(div, {
            fields: "foo",
            model: model,
            change: function() {
                ok(true);
            }
        });
        model.set("foo", "foo");
        editable.destroy();
        model.set("foo", "baz");
    });

    test("end method triggers validation", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    validation: {
                        foo: function() {
                        }
                    }
                }
            }
        }),
        model = new MyModel({ foo: "bar" }),
        editable = new Editable(div, { fields: "foo", model: model });

        var validatable = stub(editable.validatable, "validate");
        editable.end();

        equal(validatable.calls("validate"), 1);
    });

    test("end method returns false when validation fails", function() {
        var MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    validation: {
                        foo: function() {
                            return false;
                        }
                    }
                }
            }
        }),
        model = new MyModel({ foo: "bar" }),
        editable = new Editable(div, { fields: "foo", model: model });

        ok(!editable.end());
    });

    test("end method returns true when validation pass", function() {
        var MyModel = Model.define({
            fields: {
                foo: "foo"
            }
        }),
        model = new MyModel({ foo: "bar" }),
        editable = new Editable(div, { fields: "foo", model: model });

        ok(editable.end());
    });

    (function() {

        function assertValidatesInput(assert, fooEditor, barEditor) {
            var MyModel = Model.define({
                fields: {
                    foo: {
                        field: "foo",
                        validation: {
                            required: true
                        }
                    },
                    bar: {
                        field: "bar",
                        validation: {
                            required: true
                        }
                    }
                }
            }),
            model = new MyModel({ foo: "bar" }),
            editable = new Editable(div, { fields: [{
                field: "foo",
                editor: function(container) {
                    container.append($(fooEditor || '<input data-bind="value:foo" />'));
                }
            }, {
                field: "bar",
                editor: function(container) {
                    container.append($(barEditor || '<input data-bind="value:bar" />'));
                }
            }], model: model }),
            validateInput = stub(editable.validatable, "validateInput");

            model.set("foo", "baz");

            assert(validateInput);
        }

        module("kendo.ui.Editable/ change", {
            setup: function() {
                div = $("<div />").appendTo(QUnit.fixture);
            },
            teardown: function() {
                kendo.destroy(QUnit.fixture);
            }
        });

        test("changing model field validates the input", function() {
            assertValidatesInput(function(validateInput) {
                equal(validateInput.calls("validateInput"), 1);
                equal(validateInput.args("validateInput", 0)[0].data("bind"), "value:foo");
            });
        });

        test("changing model field does not validate the input if it has data-validate attribute set to false", function() {
            assertValidatesInput(function(validateInput) {
                equal(validateInput.args("validateInput", 0)[0].length, 0);
            }, '<input data-bind="value:foo" data-validate="false" />');
        });

        test("changing model field validates the input when it has other bindings besides value", function() {
            assertValidatesInput(function(validateInput) {
               equal(validateInput.args("validateInput", 0)[0].length, 1);
            }, '<input data-bind="value:foo,disabled:bar" />');
        });

        test("changing model field validates the input when it has other bindings besides value and is at last position", function() {
            assertValidatesInput(function(validateInput) {
               equal(validateInput.args("validateInput", 0)[0].length, 1);
            }, '<input data-bind="disabled:bar,value:foo" />');
        });

        test("changing model field validates the input when there are spaces in the binding definition", function() {
            assertValidatesInput(function(validateInput) {
               equal(validateInput.args("validateInput", 0)[0].length, 1);
            }, '<input data-bind="value: foo" />');
        });

        test("changing model field does not validate inputs with bindings different than value for the same field", function() {
            assertValidatesInput(function(validateInput) {
               equal(validateInput.args("validateInput", 0)[0].length, 0);
            }, '<input data-bind="visible:foo" />');
        });

        test("changing model field validates only inputs with the same field name when there are other fields with the same start of the name", function() {
            var MyModel = Model.define({
                fields: {
                    foo: {
                        field: "foo",
                        validation: {
                            required: true
                        }
                    }
                }
            }),
            model = new MyModel({ foo: "bar", fooOther: "bar" }),
            editable = new Editable(div, { fields: [{
                field: "foo",
                editor: function(container) {
                    container.append($('<input data-bind="value:foo" />'));
                }
            }, {
                field: "fooOther",
                editor: function(container) {
                    container.append($('<input data-bind="value:fooOther" />'));
                }
            }], model: model }),
            validateInput = stub(editable.validatable, "validateInput");

            model.set("foo", "baz");
            equal(validateInput.args("validateInput", 0)[0].length, 1);
        });

        test("changing boolean model field validates the input", function() {
            var MyModel = Model.define({
                fields: {
                    foo: {
                        field: "foo",
                        type: "boolean"
                    },
                    bar: {
                        field: "bar",
                        validation: {
                            required: true
                        }
                    }
                }
            }),
            model = new MyModel({ foo: false }),
            editable = new Editable(div, { fields: ["foo", "bar"], model: model }),
            validateInput = stub(editable.validatable, "validateInput");

            model.set("foo", true);

            equal(validateInput.calls("validateInput"), 1);
            equal(validateInput.args("validateInput", 0)[0].data("bind"), "checked:foo");
        });

        test("changing non boolean model field validates radio inputs with checked binding", function() {
            var MyModel = Model.define({
                fields: {
                    foo: {
                        type: "number"
                    }
                }
            }),
            model = new MyModel({ foo: 1 }),
            editable = new Editable(div, { fields: [{
                field: "foo",
                editor: function(container) {
                    container.append($('<input type="radio" data-bind="checked:foo" value="1" />'));
                    container.append($('<input type="radio" data-bind="checked:foo" value="2" />'));
                    container.append($('<input type="radio" data-bind="checked:foo" value="3" />'));
                }
            }], model: model }),
            validateInput = stub(editable.validatable, "validateInput");

            model.set("foo", 2);
            equal(validateInput.calls("validateInput"), 1);
        });

        test("changing non boolean model field passes the radio input with same value to the validator", function() {
            var MyModel = Model.define({
                fields: {
                    foo: {
                        type: "number"
                    }
                }
            }),
            model = new MyModel({ foo: 1 }),
            editable = new Editable(div, { fields: [{
                field: "foo",
                editor: function(container) {
                    container.append($('<input type="radio" data-bind="checked:foo" value="1" />'));
                    container.append($('<input type="radio" data-bind="checked:foo" value="2" />'));
                    container.append($('<input type="radio" data-bind="checked:foo" value="3" />'));
                }
            }], model: model }),
            validateInput = stub(editable.validatable, "validateInput");

            model.set("foo", 2);
            var input = validateInput.args("validateInput", 0)[0];
            equal(input.length, 1);
            equal(input.val(), "2");
        });

    })();
})();
