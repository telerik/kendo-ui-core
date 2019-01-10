(function() {
    var Editable = kendo.ui.Editable,
        Model = kendo.data.Model,
        div;

    describe("kendo.ui.Editable", function() {
        beforeEach(function() {
            div = $("<div />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("setting required validation rule renderes required attr", function() {
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

            assert.isOk(div.find(":input[required]").length);
        });

        it("setting custom validation rule does not renders attr", function() {
            var MyModel = Model.define({
                fields: {
                    foo: {
                        field: "foo",
                        validation: {
                            bar: function() { }
                        }
                    }
                }
            }),
                model = new MyModel(),
                editable = new Editable(div, { fields: "foo", model: model });

            assert.isOk(!div.find(":input").data("type"));
        });

        it("setting multiple validation rules renders attr", function() {
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

            assert.isOk(input.attr("required"));
            assert.isOk(input.attr("pattern"));
        });

        it("setting url rule renderes data-type=url attr", function() {
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

            assert.isOk(!input.attr("url"));
            assert.equal(input.data("type"), "url");
        });

        it("setting email rule renderes data-type=email attr", function() {
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

            assert.isOk(!input.attr("email"));
            assert.equal(input.data("type"), "email");
        });

        it("for field of type number data-type=number attr is rendered", function() {
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

            assert.equal(input.data("type"), "number");
        });

        it("for field of type date data-type=date attr is rendered", function() {
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

            assert.equal(input.data("type"), "date");
        });

        it("for field of type date format attrr is rendered", function() {
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

            assert.equal(input.attr(kendo.attr("format")), "format");
        });

        it("for field of type boolean data-type=boolean attr is rendered", function() {
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

            assert.equal(input.data("type"), "boolean");
        });

        it("setting custom validation rule does not render attr", function() {
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

            assert.isOk(!input.data("type"));
            assert.isOk(!input.attr("bar"));
        });

        it("custom validation message is rendered as input attr", function() {
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

            assert.equal(input.data("required-msg"), "my message");
        });

        it("validation message is not rendered as input attr", function() {
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

            assert.isOk(!input.filter("[data-required-msg]").length);
        });

        it("multiple custom validation messages are rendered as input attr", function() {
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

            assert.equal(input.attr("required"), "required");
            assert.equal(input.data("required-msg"), "required message");
            assert.equal(input.data("email-msg"), "email message");
        });

        it("for field of type number min constraint attr is rendered", function() {
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

            assert.equal(input.attr("min"), 10);
        });

        it("for field of type number min constraint attr is rendered according to culture", function() {
            kendo.culture("de-DE");

            var MyModel = Model.define({
                fields: {
                    foo: {
                        field: "foo",
                        type: "number",
                        validation: {
                            min: 10.12
                        }
                    }
                }
            }),
                model = new MyModel(),
                editable = new Editable(div, { fields: "foo", model: model }),
                input = div.find("input[name=foo]");

            assert.equal(input.attr("min"), 10.12);

            kendo.culture("en-US");
        });

        it("for field of type number min constraint and validation message attrs are rendered", function() {
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

            assert.equal(input.attr("min"), 10);
            assert.equal(input.data("min-msg"), "min message");
        });

        it("for field of type email and validation message attrs are rendered", function() {
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

            assert.equal(input.data("type"), "email");
            assert.equal(input.data("email-msg"), "email message");
        });

        it("custom validation rules are assign to validation instance", function() {
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

            assert.isOk($.isFunction(validatable.options.rules.foo));
        });

        it("custom validation rules are assign to validation instance if no fields are assigned", function() {
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

            assert.isOk($.isFunction(validatable.options.rules.foo));
        });

        it("model is not updated if validation fails", function() {
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

            assert.equal(model.get("foo"), "bar");
        });

        it("change event is triggered if validation success", function() {
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

            assert.equal(model.get("foo"), "foo");
            assert.isOk(wasCalled);
        });

        it("change event is triggered once after refresh is called", function() {
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
                    assert.isOk(true);
                }
            });

            editable.refresh();

            div.find(":input").val("foo").trigger("change");
        });

        it("change event is not triggered if validation fails", function() {
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

            assert.equal(model.get("foo"), "bar");
            assert.isOk(!wasCalled);
        });

        it("end method detaches the change event", function() {
            var model = new Model({ foo: "bar" }),
                editable = new Editable(div, {
                    fields: "foo",
                    model: model,
                    change: function() {
                        assert.isOk(true);
                    }
                });
            model.set("foo", "foo");
            editable.destroy();
            model.set("foo", "baz");
        });

        it("end method triggers validation", function() {
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

            assert.equal(validatable.calls("validate"), 1);
        });

        it("end method returns false when validation fails", function() {
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

            assert.isOk(!editable.end());
        });

        it("end method returns true when validation pass", function() {
            var MyModel = Model.define({
                fields: {
                    foo: "foo"
                }
            }),
                model = new MyModel({ foo: "bar" }),
                editable = new Editable(div, { fields: "foo", model: model });

            assert.isOk(editable.end());
        });
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
                editable = new Editable(div, {
                    fields: [{
                        field: "foo",
                        editor: function(container) {
                            container.append($(fooEditor || '<input data-bind="value:foo" />'));
                        }
                    }, {
                        field: "bar",
                        editor: function(container) {
                            container.append($(barEditor || '<input data-bind="value:bar" />'));
                        }
                    }], model: model
                }),
                validateInput = stub(editable.validatable, "validateInput");

            model.set("foo", "baz");

            assert(validateInput);
        }

        describe("kendo.ui.Editable/ change", function() {
            beforeEach(function() {
                div = $("<div />").appendTo(Mocha.fixture);
            });
            afterEach(function() {
                kendo.destroy(Mocha.fixture);
            });

            it("changing model field validates the input", function() {
                assertValidatesInput(function(validateInput) {
                    assert.equal(validateInput.calls("validateInput"), 1);
                    assert.equal(validateInput.args("validateInput", 0)[0].data("bind"), "value:foo");
                });
            });

            it("changing model field does not validate the input if it has data-validate attribute set to false", function() {
                assertValidatesInput(function(validateInput) {
                    assert.equal(validateInput.args("validateInput", 0)[0].length, 0);
                }, '<input data-bind="value:foo" data-validate="false" />');
            });

            it("changing model field validates the input when it has other bindings besides value", function() {
                assertValidatesInput(function(validateInput) {
                    assert.equal(validateInput.args("validateInput", 0)[0].length, 1);
                }, '<input data-bind="value:foo,disabled:bar" />');
            });

            it("changing model field validates the input when it has other bindings besides value and is at last position", function() {
                assertValidatesInput(function(validateInput) {
                    assert.equal(validateInput.args("validateInput", 0)[0].length, 1);
                }, '<input data-bind="disabled:bar,value:foo" />');
            });

            it("changing model field validates the input when there are spaces in the binding definition", function() {
                assertValidatesInput(function(validateInput) {
                    assert.equal(validateInput.args("validateInput", 0)[0].length, 1);
                }, '<input data-bind="value: foo" />');
            });

            it("changing model field does not validate inputs with bindings different than value for the same field", function() {
                assertValidatesInput(function(validateInput) {
                    assert.equal(validateInput.args("validateInput", 0)[0].length, 0);
                }, '<input data-bind="visible:foo" />');
            });

            it("changing model field validates only inputs with the same field name when there are other fields with the same start of the name", function() {
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
                    editable = new Editable(div, {
                        fields: [{
                            field: "foo",
                            editor: function(container) {
                                container.append($('<input data-bind="value:foo" />'));
                            }
                        }, {
                            field: "fooOther",
                            editor: function(container) {
                                container.append($('<input data-bind="value:fooOther" />'));
                            }
                        }], model: model
                    }),
                    validateInput = stub(editable.validatable, "validateInput");

                model.set("foo", "baz");
                assert.equal(validateInput.args("validateInput", 0)[0].length, 1);
            });

            it("changing boolean model field validates the input", function() {
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

                assert.equal(validateInput.calls("validateInput"), 1);
                assert.equal(validateInput.args("validateInput", 0)[0].data("bind"), "checked:foo");
            });

            it("changing non boolean model field validates radio inputs with checked binding", function() {
                var MyModel = Model.define({
                    fields: {
                        foo: {
                            type: "number"
                        }
                    }
                }),
                    model = new MyModel({ foo: 1 }),
                    editable = new Editable(div, {
                        fields: [{
                            field: "foo",
                            editor: function(container) {
                                container.append($('<input type="radio" data-bind="checked:foo" value="1" />'));
                                container.append($('<input type="radio" data-bind="checked:foo" value="2" />'));
                                container.append($('<input type="radio" data-bind="checked:foo" value="3" />'));
                            }
                        }], model: model
                    }),
                    validateInput = stub(editable.validatable, "validateInput");

                model.set("foo", 2);
                assert.equal(validateInput.calls("validateInput"), 1);
            });

            it("changing non boolean model field passes the radio input with same value to the validator", function() {
                var MyModel = Model.define({
                    fields: {
                        foo: {
                            type: "number"
                        }
                    }
                }),
                    model = new MyModel({ foo: 1 }),
                    editable = new Editable(div, {
                        fields: [{
                            field: "foo",
                            editor: function(container) {
                                container.append($('<input type="radio" data-bind="checked:foo" value="1" />'));
                                container.append($('<input type="radio" data-bind="checked:foo" value="2" />'));
                                container.append($('<input type="radio" data-bind="checked:foo" value="3" />'));
                            }
                        }], model: model
                    }),
                    validateInput = stub(editable.validatable, "validateInput");

                model.set("foo", 2);
                var input = validateInput.args("validateInput", 0)[0];
                assert.equal(input.length, 1);
                assert.equal(input.val(), "2");
            });

            it("setting the same model field value triggers validation", function() {
                var MyModel = Model.define({
                    fields: {
                        foo: {
                            type: "number"
                        }
                    }
                }),
                    model = new MyModel({ foo: 1 }),
                    editable = new Editable(div, {
                        fields: [{
                            field: "foo",
                            editor: function(container) {
                                container.append($('<input data-bind="value:foo" />'));
                            }
                        }], model: model
                    }),
                    validateInput = stub(editable.validatable, "validateInput");

                model.set("foo", 1);
                var input = validateInput.args("validateInput", 0)[0];
                assert.equal(input.length, 1);
                assert.equal(input.val(), "1");
            })

        });
    }());
}());
