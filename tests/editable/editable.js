(function() {
    var Editable = kendo.ui.Editable,
        Model = kendo.data.Model,
        div,
        defaultModel = new (Model.define({ fields: { foo: "foo" } }))();

    describe("kendo.ui.Editable", function() {
        beforeEach(function() {
            div = $("<div />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        function setup(options, createModel) {
            return new Editable(div, options);
        }

        it("kendoEditable is attached to the target element", function() {
            var element = div.kendoEditable({ model: defaultModel });

            assert.isOk(element.data("kendoEditable") instanceof Editable);
        });

        it("destroys existing validator on refresh", function() {
            var editable = div.kendoEditable({ model: defaultModel }).data("kendoEditable");
            var validatable = editable.validatable;
            var destroy = validatable.destroy;
            validatable.destroy = function() {
                destroy.call(this);
                assert.isOk(true);
            };
            editable.refresh();
        });

        it("renders input element for field", function() {
            var editable = setup({ fields: "foo", model: defaultModel });

            assert.equal(editable.element.find(":input").length, 1);
        });

        it("does not clear container is set", function() {
            var editable = div.append($('<div />')).kendoEditable({
                fields: "foo",
                model: defaultModel,
                clearContainer: false
            });

            assert.equal(editable.find("div").length, 1);
        });

        it("renders input element within the child element container if specified", function() {
            var editable = div.append($('<div data-container-for="foo"/>')).kendoEditable({
                fields: "foo",
                model: defaultModel,
                clearContainer: false
            });
            assert.equal(editable.find("div > :input").length, 1);
        });

        it("renders input element within the child element container if specified for complex fields", function() {
            var editable = div.append($('<div data-container-for="foo.bar"/>')).kendoEditable({
                fields: "foo.bar",
                model: defaultModel,
                clearContainer: false
            });
            assert.equal(editable.find("div > :input").length, 1);
        });

        it("input name is same as field", function() {
            var editable = setup({ fields: "foo", model: defaultModel });

            assert.equal(editable.element.find(":input[name=foo]").length, 1);
        });

        it("no inputs are rendered when no fields are specifed", function() {
            var editable = setup({ model: defaultModel });

            assert.isOk(!editable.element.find(":input").length);
        });

        it("input is rendered for every field", function() {
            var editable = setup({ fields: ["foo", "bar"], model: new (Model.define({ fields: { foo: "foo", bar: "bar" } }))() }),
                elements = editable.element.find(":input");

            assert.equal(elements.length, 2);
            assert.equal(elements.eq(0).attr("name"), "foo");
            assert.equal(elements.eq(1).attr("name"), "bar");
        });

        it("input value is bound to the value from model", function() {
            var MyModel = Model.define({ fields: { foo: "foo" } }),
                model = new MyModel({ foo: "bar" }),
                editable = setup({ fields: "foo", model: model });

            assert.equal(editable.element.find("input[name=foo]").val(), "bar");
        });

        it("container is cleared", function() {
            div.append($("<span/>"));

            var editable = setup({ fields: "foo", model: defaultModel });

            assert.equal(div.children().length, 1);
            assert.equal(div.find(":input").length, 1);
        });

        it("input[type=text] is created for field with type set to number", function() {
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

            assert.equal(div.find(":input[type=text][name=foo]").length, 1);
        });

        it("input[type=text] is created for field without type set", function() {
            var MyModel = Model.define({
                fields: {
                    foo: {
                        field: "foo"
                    }
                }
            }),
                model = new MyModel(),
                editable = setup({ fields: "foo", model: model });

            assert.equal(div.find(":input[type=text]").length, 1);
        });

        it("input[type=text] is created for field with type set to string", function() {
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

            assert.equal(div.find(":input[type=text]").length, 1);
        });

        it("input[type=text] is created for field which type does not have editor defined", function() {
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

            assert.equal(div.find(":input[type=text]").length, 1);
        });

        it("input[type=checkbox] is created for field of type boolean", function() {
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

            assert.equal(div.find(":input[type=checkbox]").length, 1);
        });

        it("custom editor is used if set", function() {
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

            assert.isOk(wasCalled);
        });

        it("custom editor is bind by name", function() {
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

            assert.equal(div.find("input").val(), "bar");
        });

        it("custom editor checkbox is bind by name", function() {
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

            assert.isOk(div.find("input:checked").length);
        });

        it("custom editor radio button is bind by name", function() {
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

            assert.isOk(div.find("input:first:checked").length);
        });
        it("custom editor as string", function() {
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

            assert.isOk(div.find("input[name=foo]").length);
        });

        it("custom editor name binding is added to already existing one", function() {
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

            assert.equal(div.find("select").val(), "bar");
        });

        it("custom editor widget is bind by name", function() {
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

            assert.equal(div.find("select").data("kendoDropDownList").value(), "bar");
        });

        it("input[type=text] is created for field with type set to date", function() {
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

            assert.equal(div.find(":input[type=text]").length, 1);
        });

        it("container and options are passed to the custom editor", function() {
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

            assert.equal(args.length, 2);
            assert.equal(args[1].field, "foo");
            assert.equal(args[1].model, model);
            assert.isOk(args[0]);
        });

        it("format is passed to editor", function() {
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

            assert.equal(format, "bar");
        });

        it("format is passed to date type editor", function() {
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

            assert.equal(div.find("input").data("kendoDatePicker").options.format, "bar");
        });

        it("extacted format is passed to date type editor", function() {
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

            assert.equal(div.find("input").attr(kendo.attr("format")), "dd.MM.yyyy");
        });

        it("default picker format is preserved if no field format is set", function() {
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

            assert.equal(div.find("input").data("kendoDatePicker").options.format, "M/d/yyyy");
        });

        it("format is passed to number type editor", function() {
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

            assert.equal(div.find("input").eq(1).data("kendoNumericTextBox").options.format, "bar");
        });

        it("default numeric format is preserved if no field format is set", function() {
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

            assert.equal(div.find("input").eq(1).data("kendoNumericTextBox").options.format, "n");
        });

        it("binds input without bindings to the model", function() {
            var editable = div.append($('<div><input name="foo"/></div>')).kendoEditable({
                fields: "foo",
                model: defaultModel,
                clearContainer: false
            });

            defaultModel.set("foo", "baz");

            assert.equal(div.find("input").val(), "baz");
        });

        it("skip binding input type file without binding", function() {
            var editable = div.append($('<div><input type="file" name="foo"/></div>')).kendoEditable({
                fields: "foo",
                model: defaultModel,
                clearContainer: false
            });

            assert.isOk(!div.find("input[type=file]").filter("[data-bind]").length);
        });

        it("does not bind input element of upload widget", function() {
            var editable = div.append($('<div><input name="baz" data-role="upload"/></div>')).kendoEditable({
                model: defaultModel,
                clearContainer: false
            });

            assert.isOk(!div.find("input").data("bind"));
        });

        it("skip binding for first input in combobox", function() {
            var editable = div.append($('<div><span class="k-combobox"><input name="baz" class="k-input" role="combobox"/></span></div>')).kendoEditable({
                model: defaultModel,
                clearContainer: false
            });
            var inputs = div.find("input").filter("[data-bind]");
            assert.equal(inputs.length, 0);
        });

        it("do not skip binding for datepicker", function() {
            var editable = div.append($('<div><input name="baz" role="combobox" data-role="datepicker"/></div>')).kendoEditable({
                model: defaultModel,
                clearContainer: false
            });
            var inputs = div.find("input").filter("[data-bind]");
            assert.equal(inputs.length, 1);
            assert.equal(inputs.attr("data-role"), "datepicker");
        });

        it("does not bind select element of listbox widget", function() {
            var editable = div.append($('<div><select name="baz" data-role="listbox"></select></div>')).kendoEditable({
                model: defaultModel,
                clearContainer: false
            });

            assert.isOk(!div.find("select").data("bind"));
        });

        it("does not bind input element with skip attribute", function() {
            var editable = div.append($('<div><input name="baz" data-skip="skip"/></div>')).kendoEditable({
                model: defaultModel,
                clearContainer: false
            });

            assert.isOk(!div.find("input").data("bind"));
        });

        it("dropdown is displayed if field values are empty array", function() {
            defaultModel.foo = "foo";

            var editable = div.append($('<div></div>')).kendoEditable({
                fields: { field: "foo", values: [] },
                model: defaultModel
            });

            assert.isOk(div.find("select").data("kendoDropDownList"));
        });

        it("dropdown is displayed if field values are set", function() {
            defaultModel.foo = "foo";

            var editable = div.append($('<div></div>')).kendoEditable({
                fields: { field: "foo", values: [{ text: "bar", value: "foo" }] },
                model: defaultModel
            });

            assert.isOk(div.find("select").data("kendoDropDownList"));
            assert.equal(div.find("select").data("kendoDropDownList").value(), "foo");
            assert.equal(div.find("select").data("kendoDropDownList").text(), "bar");
        });
    });

    describe("kendo.ui.Editable", function() {
        beforeEach(function() {
            div = $("<div />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("editor field is not focused when skipFocus is true", function() {
            var editable = div.kendoEditable({
                fields: "foo",
                model: defaultModel,
                skipFocus: true
            });

            assert.equal(kendo._activeElement(), document.body);
        });

        it("editor field is focused when skipFocus is false", function() {
            var editable = div.kendoEditable({
                fields: "foo",
                model: defaultModel,
                skipFocus: false
            });

            assert.equal(kendo._activeElement(), div.find("input")[0]);
        });
    });

    describe("kendo.ui.Editable kendo editors", function() {
        beforeEach(function() {
            div = $("<form />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("id attribute can be added from configuration", function() {
            var editable = div.kendoEditable({
                fields: { field: "foo",  id: "foo" },
                model: defaultModel
            }).getKendoEditable();

            assert.equal(editable.element.find("input").first().attr("id"), "foo");
            assert.isOk(editable.element.find("#foo").length);
        });

        it("options are passed to editors through editorOptions", function() {
            var editable = div.kendoEditable({
                fields: {
                    field: "foo",
                    id: "foo",
                    editor: "ComboBox",
                    editorOptions: {
                        autoBind: false,
                        placeholder: "test"
                    }
                },
                model: defaultModel
            }).getKendoEditable();

            var combo = editable.element.find("#foo").data("kendoComboBox");

            assert.isOk(combo);
            assert.equal(combo.options.autoBind, false);
            assert.equal(combo.options.placeholder, "test");
        });

        it("ComboBox editor is displayed when type option is set as ComboBox", function() {
            var editable = div.kendoEditable({
                fields: { field: "foo", id: "foo",  editor: "ComboBox" },
                model: defaultModel
            }).getKendoEditable();

            assert.isOk(editable.element.find("#foo").data("kendoComboBox"));
        });

        it("AutoComplete editor is displayed when type option is set as AutoComplete", function() {
            var editable = div.kendoEditable({
                fields: { field: "foo", id: "foo",  editor: "AutoComplete" },
                model: defaultModel
            }).getKendoEditable();

            assert.isOk(editable.element.find("#foo").data("kendoAutoComplete"));
        });

        it("DateInput editor is displayed when type option is set as DateInput", function() {
            defaultModel.set("foo", new Date());

            var editable = div.kendoEditable({
                fields: { field: "foo", id: "foo",  editor: "DateInput" },
                model: defaultModel
            }).getKendoEditable();

            assert.isOk(editable.element.find("#foo").data("kendoDateInput"));
        });

        it("ColorPicker editor is displayed when type option is set as ColorPicker", function() {
            defaultModel.set("foo", "#fff");

            var editable = div.kendoEditable({
                fields: { field: "foo", id: "foo",  editor: "ColorPicker" },
                model: defaultModel
            }).getKendoEditable();

            assert.isOk(typeof editable.element.find("#foo").data("kendoColorPicker"));
        });

        it("DatePicker editor is displayed when type option is set as DatePicker", function() {
            defaultModel.set("foo", new Date());

            var editable = div.kendoEditable({
                fields: { field: "foo", id: "foo",  editor: "DatePicker" },
                model: defaultModel
            }).getKendoEditable();

            assert.isOk(editable.element.find("#foo").data("kendoDatePicker"));
        });

        it("DateTimePicker editor is displayed when type option is set as DateTimePicker", function() {
            defaultModel.set("foo", new Date());

            var editable = div.kendoEditable({
                fields: { field: "foo", id: "foo",  editor: "DateTimePicker" },
                model: defaultModel
            }).getKendoEditable();

            defaultModel.foo = 1;

            assert.isOk(editable.element.find("#foo").data("kendoDateTimePicker"));
        });

        it("TimePicker editor is displayed when type option is set as TimePicker", function() {
            defaultModel.set("foo", new Date());

            var editable = div.kendoEditable({
                fields: { field: "foo", id: "foo",  editor: "TimePicker" },
                model: defaultModel
            }).getKendoEditable();

            defaultModel.foo = 1;

            assert.isOk(editable.element.find("#foo").data("kendoTimePicker"));
        });

        it("MaskedTextBox editor is displayed when type option is set as MaskedTextBox", function() {
            var editable = div.kendoEditable({
                fields: { field: "foo", id: "foo",  editor: "MaskedTextBox" },
                model: defaultModel
            }).getKendoEditable();

            assert.isOk(editable.element.find("#foo").data("kendoMaskedTextBox"));
        });

        it("MultiSelect editor is displayed when type option is set as MultiSelect", function() {
            defaultModel.set("foo", []);

            var editable = div.kendoEditable({
                fields: { field: "foo", id: "foo",  editor: "MultiSelect", editorOptions: {
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: [
                        { text: "Item1", value: "1" },
                        { text: "Item2", value: "2" }
                    ]
                }},
                model: defaultModel
            }).getKendoEditable();

            assert.isOk(editable.element.find("#foo").data("kendoMultiSelect"));
        });

        it("NumericTextBox editor is displayed when type option is set as NumericTextBox", function() {
            defaultModel.set("foo", 1);

            var editable = div.kendoEditable({
                fields: { field: "foo", id: "foo",  editor: "NumericTextBox" },
                model: defaultModel
            }).getKendoEditable();

            assert.isOk(editable.element.find("#foo").data("kendoNumericTextBox"));
        });

        it("Slider editor is displayed when type option is set as Slider", function() {
            defaultModel.set("foo", 1);

            var editable = div.kendoEditable({
                fields: { field: "foo", id: "foo",  editor: "Slider" },
                model: defaultModel
            }).getKendoEditable();

            assert.isOk(editable.element.find("#foo").data("kendoSlider"));
        });

        it("custom attributes can be added to editors", function() {
            var editable = div.kendoEditable({
                fields: { field: "foo",  attributes: { labelId: "test" }},
                model:  new (kendo.data.Model.define({
                    fields: {
                        foo: {
                            field: "foo",
                            attributes: { labelId: "test" }
                        }}
                    }
                ))()
            }).getKendoEditable();

            assert.equal(editable.element.find("input").first().attr("labelId"), "test");
        });
    });
    describe("kendo.ui.Editable validator", function() {
        beforeEach(function() {
            div = $("<form />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("validateOnblur can be passed as an option", function() {
            var editable = div.kendoEditable({
                fields: { field: "foo",  id: "foo" },
                model: defaultModel,
                validateOnBlur: false
            }).getKendoEditable();

            assert.equal(editable.validatable.options.validateOnBlur, false);
        });

        it("validationSummary can be passed as an option", function() {
            var editable = div.kendoEditable({
                fields: { field: "foo",  id: "foo" },
                model: defaultModel,
                validationSummary: true
            }).getKendoEditable();

            assert.equal(editable.validatable.options.validationSummary, true);
        });
    });
}());
