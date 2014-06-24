(function(){

var Model = kendo.data.Model;

module("model initialization");

test("define returns a new model which is subclass of Model", function() {
    var MyModel = Model.define();
    ok(new MyModel instanceof Model);
});

test("define assigns data", function() {
    var MyModel = Model.define(),
        model = new MyModel({ foo: "bar"});

    equal(model.foo, "bar");
});

test("define assigns the fields", function() {
    var MyModel = Model.define({
        fields: {
            foo: {}
        }
    });

    var model = new MyModel();

    ok(model.fields.foo);
});

test("define assigns the fields as array of object", function() {
    var MyModel = Model.define({
        fields: [ { field: "foo" } ]
    });

    var model = new MyModel();

    ok(model.fields.foo);
});

test("define assigns the fields as array of strings", function() {
    var MyModel = Model.define({
        fields: [ "foo" ]
    });

    var model = new MyModel();

    ok(model.fields.foo);
});

test("define assigns field type", function() {
    var MyModel = Model.define({
        fields: {
            foo: { type: "string" }
        }
    });

    var model = new MyModel();

    equal(model.fields.foo.type, "string");
});

test("define if key is assign model is not new", function() {
    var MyModel = Model.define({
        id: "id"
    });

    var model = new MyModel( { id: 1 } );

    ok(!model.isNew());
});

test("define if no key is assign model is new", function() {
    var MyModel = Model.define({
        id: "id"
    });
    var model = new MyModel();
    ok(model.isNew());
});

test("define with custom field.name mapping", function() {
    var MyModel = Model.define({
        id: "id",
        fields: {
            name: { field: "Name" }
        }
    });

    var model = new MyModel();
    ok("name" in model);
    ok(!("Name" in model));
});

test("define with custom field mapping", function() {
    var MyModel = Model.define({
        id: "id",
        fields: {
            name: "Name"
        }
    });

    var model = new MyModel();
    ok("name" in model);
    ok(!("Name" in model));
});

test("isNew returns true if no key is defined", function() {
    var MyModel = Model.define({
        id: "id"
    });
    var model = new MyModel();
    ok(model.isNew());
});

test("id returns the value of the key", function() {
    var MyModel = Model.define({
        id: "foo"
    });
    var model = new MyModel({ foo: 1 });
    equal(model.id, 1);
});

test("id is implicitly set if not set in metadata", function() {
    var MyModel = Model.define();
    var model = new MyModel({ id: 1 });

    equal(model.id, 1);
});

test("id is implicitly set if not set in metadata and no data", function() {
    var MyModel = Model.define();
    var model = new MyModel({});

    ok(!("undefined" in model));
});

test("define assigns field validation rules", function() {
    var MyModel = Model.define({
        fields: {
            foo: {
                field: "foo",
                validation: {
                    required: true
               }
            }
        }
    });

    var model = new MyModel();

    ok($.isPlainObject(model.fields.foo.validation));
    ok(model.fields.foo.validation.required);
});

test("define accepts custom validation rules", function() {
    var MyModel = Model.define({
        fields: {
            foo: {
                field: "foo",
                validation: {
                    bar: $.noop
               }
            }
        }
    });

    var model = new MyModel();

    ok(model.fields.foo.validation.bar);
    ok($.isFunction(model.fields.foo.validation.bar));
});

test("field can be set as editable false", function() {
    var MyModel = Model.define({
        fields: {
            foo: {
                field: "foo",
                editable: false
            }
        }
    });

    var model = new MyModel();

    ok(!model.fields.foo.editable);
});

test("empty string default value is set for field of type string", function() {
    var MyModel = Model.define({
        fields: {
            foo: {
                field: "foo", type: "string"
            }
        }
    });

    var model = new MyModel();

    equal(model.defaults["foo"], "");
    equal(model.get("foo"), "");
});

test("model data is synchronized with original data", function() {
    var data = { id: 1, foo: "bar"};
    var model = new (Model.define())(data);

    model.set("foo", "foo");

    equal(model.get("foo"), "foo");
});

test("model data is synchronized with original data as empty object", function() {
    var data = {};
    var model = new (Model.define({ fields: { foo: "foo", bar: "bar" } }))(data);

    model.set("foo", "foo");

    equal(model.get("foo"), "foo");
    equal(model.foo, "foo");
    equal(model.bar, "");
});

test("zero is set as default value for numeric field", function() {
    var MyModel = Model.define({
        fields: {
            foo: {
                field: "foo", type: "number"
            }
        }
    });

    var model = new MyModel();

    ok(model.defaults["foo"] === 0);
    ok(model.get("foo") === 0);
});

test("date is set as default value for date field", function() {
    var MyModel = Model.define({
        fields: {
            foo: {
                field: "foo", type: "date"
            }
        }
    });

    var model = new MyModel();

    ok(model.defaults["foo"].getDate() === new Date().getDate());
    ok(model.get("foo").getDate() === new Date().getDate());
});

test("setting default value by type should be case insensitive", function() {
    var MyModel = Model.define({
        fields: {
            foo: {
                field: "foo", type: "DATE"
            }
        }
    });

    var model = new MyModel();

    ok(model.defaults["foo"].getDate() === new Date().getDate());
    ok(model.get("foo").getDate() === new Date().getDate());
});

test("false is set as default value for boolean field", function() {
    var MyModel = Model.define({
        fields: {
            foo: {
                field: "foo", type: "Boolean"
            }
        }
    });

    var model = new MyModel();

    ok(model.defaults["foo"] === false);
    ok(model.get("foo") === false);
});

test("defaultValue sets field default value", function() {
    var MyModel = Model.define({
        fields: {
            foo: {
                field: "foo",
                defaultValue: "foo"
            }
        }
    });

    var model = new MyModel();

    equal(model.defaults["foo"], "foo");
    equal(model.get("foo"), "foo");
});

test("defaultValue set to 0 is set", function() {
    var MyModel = Model.define({
        fields: {
            foo: {
                field: "foo",
                defaultValue: 0
            }
        }
    });

    var model = new MyModel();

    ok(model.defaults["foo"] === 0);
    ok(model.get("foo") === 0);
});

test("isNew and default id value", function() {
    var MyModel = Model.define({
        id: "foo",
        fields: {
            foo: {
                field: "foo",
                defaultValue: 0
            }
        }
    });

    var model = new MyModel();

    ok(model.isNew());
});

test("type convert is assign to the field definition", function() {
    var MyModel = Model.define({
        fields: {
            foo: {
                field: "foo", type: "number"
            }
        }
    });

    ok($.isFunction(MyModel.fields.foo.parse));
});

test("custom type converter is assign to the field definition", function() {
    var MyModel = Model.define({
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

    ok(MyModel.fields.foo.parse());
});

test("toJSON skips the id if id field is not declared", function() {
    var model = new Model({ foo: 1 });
    ok(!("id" in model.toJSON()));
});

test("toJSON skips the id if id field is not default", function() {
    var MyModel = Model.define({ id: "foo" }),
        model = new MyModel({ foo: 1 });

   equal(typeof model.toJSON().id, "undefined");
});

test("defaultValue support functions", function() {
    var MyModel = Model.define({
        fields: [ { field: "foo", defaultValue: function() {return "bar"} } ]
    });

    var model = new MyModel();

    ok(model.foo === "bar");
});

}());
