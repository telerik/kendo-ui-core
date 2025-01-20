import '@progress/kendo-ui/src/kendo.data.js';

let Model = kendo.data.Model;

describe("model initialization", function() {

    it("define returns a new model which is subclass of Model", function() {
        let MyModel = Model.define();
        assert.isOk(new MyModel instanceof Model);
    });

    it("model is not dirty by default", function() {
        let model = new Model();

        assert.isOk(!model.dirty);
    });

    it("model has no dirtyFeilds by default", function() {
        let model = new Model();

        assert.deepEqual(model.dirtyFields, {});
    });

    it("define assigns data", function() {
        let MyModel = Model.define(),
            model = new MyModel({ foo: "bar" });

        assert.equal(model.foo, "bar");
    });

    it("define assigns the fields", function() {
        let MyModel = Model.define({
            fields: {
                foo: {}
            }
        });

        let model = new MyModel();

        assert.isOk(model.fields.foo);
    });

    it("define assigns the fields as array of object", function() {
        let MyModel = Model.define({
            fields: [{ field: "foo" }]
        });

        let model = new MyModel();

        assert.isOk(model.fields.foo);
    });

    it("define assigns the fields as array of strings", function() {
        let MyModel = Model.define({
            fields: ["foo"]
        });

        let model = new MyModel();

        assert.isOk(model.fields.foo);
    });

    it("define assigns field type", function() {
        let MyModel = Model.define({
            fields: {
                foo: { type: "string" }
            }
        });

        let model = new MyModel();

        assert.equal(model.fields.foo.type, "string");
    });

    it("define if key is assign model is not new", function() {
        let MyModel = Model.define({
            id: "id"
        });

        let model = new MyModel({ id: 1 });

        assert.isOk(!model.isNew());
    });

    it("define if no key is assign model is new", function() {
        let MyModel = Model.define({
            id: "id"
        });
        let model = new MyModel();
        assert.isOk(model.isNew());
    });

    it("define with custom field.name mapping", function() {
        let MyModel = Model.define({
            id: "id",
            fields: {
                name: { field: "Name" }
            }
        });

        let model = new MyModel();
        assert.isOk("name" in model);
        assert.isOk(!("Name" in model));
    });

    it("define with custom field mapping", function() {
        let MyModel = Model.define({
            id: "id",
            fields: {
                name: "Name"
            }
        });

        let model = new MyModel();
        assert.isOk("name" in model);
        assert.isOk(!("Name" in model));
    });

    it("isNew returns true if no key is defined", function() {
        let MyModel = Model.define({
            id: "id"
        });
        let model = new MyModel();
        assert.isOk(model.isNew());
    });

    it("id returns the value of the key", function() {
        let MyModel = Model.define({
            id: "foo"
        });
        let model = new MyModel({ foo: 1 });
        assert.equal(model.id, 1);
    });

    it("id is implicitly set if not set in metadata", function() {
        let MyModel = Model.define();
        let model = new MyModel({ id: 1 });

        assert.equal(model.id, 1);
    });

    it("id is implicitly set if not set in metadata and no data", function() {
        let MyModel = Model.define();
        let model = new MyModel({});

        assert.isOk(!("undefined" in model));
    });

    it("define assigns field validation rules", function() {
        let MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    validation: {
                        required: true
                    }
                }
            }
        });

        let model = new MyModel();

        assert.isOk($.isPlainObject(model.fields.foo.validation));
        assert.isOk(model.fields.foo.validation.required);
    });

    it("define accepts custom validation rules", function() {
        let MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    validation: {
                        bar: $.noop
                    }
                }
            }
        });

        let model = new MyModel();

        assert.isOk(model.fields.foo.validation.bar);
        assert.isOk(kendo.isFunction(model.fields.foo.validation.bar));
    });

    it("field can be set as editable false", function() {
        let MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    editable: false
                }
            }
        });

        let model = new MyModel();

        assert.isOk(!model.fields.foo.editable);
    });

    it("empty string default value is set for field of type string", function() {
        let MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo", type: "string"
                }
            }
        });

        let model = new MyModel();

        assert.equal(model.defaults["foo"], "");
        assert.equal(model.get("foo"), "");
    });

    it("model data is synchronized with original data", function() {
        let data = { id: 1, foo: "bar" };
        let model = new (Model.define())(data);

        model.set("foo", "foo");

        assert.equal(model.get("foo"), "foo");
    });

    it("model data is synchronized with original data as empty object", function() {
        let data = {};
        let model = new (Model.define({ fields: { foo: "foo", bar: "bar" } }))(data);

        model.set("foo", "foo");

        assert.equal(model.get("foo"), "foo");
        assert.equal(model.foo, "foo");
        assert.equal(model.bar, "");
    });

    it("zero is set as default value for numeric field", function() {
        let MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo", type: "number"
                }
            }
        });

        let model = new MyModel();

        assert.isOk(model.defaults["foo"] === 0);
        assert.isOk(model.get("foo") === 0);
    });

    it("date is set as default value for date field", function() {
        let MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo", type: "date"
                }
            }
        });

        let model = new MyModel();

        assert.isOk(model.defaults["foo"].getDate() === new Date().getDate());
        assert.isOk(model.get("foo").getDate() === new Date().getDate());
    });

    it("setting default value by type should be case insensitive", function() {
        let MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo", type: "DATE"
                }
            }
        });

        let model = new MyModel();

        assert.isOk(model.defaults["foo"].getDate() === new Date().getDate());
        assert.isOk(model.get("foo").getDate() === new Date().getDate());
    });

    it("false is set as default value for boolean field", function() {
        let MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo", type: "Boolean"
                }
            }
        });

        let model = new MyModel();

        assert.isOk(model.defaults["foo"] === false);
        assert.isOk(model.get("foo") === false);
    });

    it("defaultValue sets field default value", function() {
        let MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    defaultValue: "foo"
                }
            }
        });

        let model = new MyModel();

        assert.equal(model.defaults["foo"], "foo");
        assert.equal(model.get("foo"), "foo");
    });

    it("defaultValue set to 0 is set", function() {
        let MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    defaultValue: 0
                }
            }
        });

        let model = new MyModel();

        assert.isOk(model.defaults["foo"] === 0);
        assert.isOk(model.get("foo") === 0);
    });

    it("isNew and default id value", function() {
        let MyModel = Model.define({
            id: "foo",
            fields: {
                foo: {
                    field: "foo",
                    defaultValue: 0
                }
            }
        });

        let model = new MyModel();

        assert.isOk(model.isNew());
    });

    it("type convert is assign to the field definition", function() {
        let MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo", type: "number"
                }
            }
        });

        assert.isOk(kendo.isFunction(MyModel.fields.foo.parse));
    });

    it("custom type converter is assign to the field definition", function() {
        let MyModel = Model.define({
            fields: {
                foo: {
                    field: "foo",
                    type: "number",
                    parse: function() {
                        return true;
                    }
                }
            }
        });

        assert.isOk(MyModel.fields.foo.parse());
    });

    it("toJSON skips the id if id field is not declared", function() {
        let model = new Model({ foo: 1 });
        assert.isOk(!("id" in model.toJSON()));
    });

    it("toJSON skips the id if id field is not default", function() {
        let MyModel = Model.define({ id: "foo" }),
            model = new MyModel({ foo: 1 });

        assert.equal(typeof model.toJSON().id, "undefined");
    });

    it("toJSON skips dirty field", function() {
        let MyModel = Model.define({ id: "foo" });
        let model = new MyModel({ foo: 1 });

        assert.equal(typeof model.toJSON().dirty, "undefined");
    });

    it("toJSON skips dirtyFields field", function() {
        let MyModel = Model.define({ id: "foo" });
        let model = new MyModel({ foo: 1 });

        assert.equal(typeof model.toJSON().dirtyFields, "undefined");
    });

    it("defaultValue support functions", function() {
        let MyModel = Model.define({
            fields: [{ field: "foo", defaultValue: function() { return "bar"; } }]
        });

        let model = new MyModel();

        assert.isOk(model.foo === "bar");
    });

});
