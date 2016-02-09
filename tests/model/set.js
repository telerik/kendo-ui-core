(function(){

var Model;

module("kendo.data.Model.set", {
    setup: function() {
        Model = kendo.data.Model.define();
    }
});

test("set updates the value of the specified field", function() {
    var m = new Model({
        foo: "bar"
    });

    m.set("foo", "baz");
    equal(m.get("foo"), "baz");
});

test("set updates the value of the specified expression", function() {
    var m = new Model({
        foo: {
            bar: "bar"
        }
    });

    m.set("foo.bar", "baz");
    equal(m.get("foo.bar"), "baz");
});

test("model is dirty after set", function() {
    var m = new Model();

    m.set("foo", "foo");

    ok(m.dirty);
});

test("model is dirty during change event", 1, function() {
    var m = new Model();
    m.bind("change", function() {
        ok(m.dirty);
    });
    m.set("foo", "foo");
});

test("model is dirty during set event", 1, function() {
    var m = new Model();

    m.bind("set", function() {
        ok(m.dirty);
    });
    m.set("foo", "foo");
});

test("model is dirty after set event", 1, function() {
    var m = new Model();

    m.set("foo", "foo");

    ok(m.dirty);
});

test("model is not dirty if set event is prevented", 1, function() {
    var m = new Model();

    m.bind("set", function(e) {
        e.preventDefault();
    });
    m.set("foo", "foo");

    ok(!m.dirty);
});

test("model is dirty if is already dirty and set event is prevented", 1, function() {
    var m = new Model();

    m.dirty = true;
    m.bind("set", function(e) {
        e.preventDefault();
    });
    m.set("foo", "foo");

    ok(m.dirty);
});

test("model is not dirty if the same string value is set", function() {
    var m = new Model({
        foo: "foo"
    });

    m.set("foo", "foo");
    ok(!m.dirty);
});

test("model is not dirty if the same numeric value is set", function() {
    var m = new Model({
        foo: 1
    });

    m.set("foo", 1);
    ok(!m.dirty);
});

test("model is not dirty if the same date value is set", function() {
    var m = new Model({
        foo: new Date(2011, 1, 1)
    });

    m.set("foo", new Date(2011, 1, 1));
    ok(!m.dirty);
});

test("model is not dirty if the same object value is set", function() {
    var m = new Model({
        foo: {
            bar: "bar"
        }
    });

    m.set("foo",  { bar: "bar" });

    ok(!m.dirty);
});

test("change is raised if the model is modifed after set", function() {
    var changeWasCalled = false, m = new Model().bind("change", function() {
        changeWasCalled = true;
    });

    m.set("foo", "bar");
    ok(changeWasCalled);
});

test("change is not raised if the model is not modifed after set", function() {
    var changeWasCalled = false, m = new Model({
        foo: "bar"
    }).bind("change", function() {
        changeWasCalled = true;
    });

    m.set("foo", "bar");
    ok(!changeWasCalled);
});

test("set parse value to defined type", function() {
    var MyModel = kendo.data.Model.define({
        fields: {
            bar: { field: "bar", type: "number" }
        }
    }), m = new MyModel();

    m.set("bar", "1");
    equal(m.get("bar"), 1);
    equal(typeof m.get("bar"), "number");
});

test("setting number when no type defined", function() {
    var MyModel = kendo.data.Model.define({
        fields: {
            bar: { field: "bar" }
        }
    }), m = new MyModel();

    m.set("bar", 1);
    equal(m.get("bar"), 1);
    equal(typeof m.get("bar"), "number");
});

test("setting boolean as string is converted", function() {
    var MyModel = kendo.data.Model.define({
        fields: {
            bar: { field: "bar", type: "boolean" }
        }
    }), m = new MyModel();

    m.set("bar", "TRUE");
    ok(m.get("bar") === true);
    equal(typeof m.get("bar"), "boolean");
});

test("setting boolean as false string is converted", function() {
    var MyModel = kendo.data.Model.define({
        fields: {
            bar: { field: "bar", type: "boolean" }
        }
    }), m = new MyModel();

    m.set("bar", "false");
    ok(m.get("bar") === false);
    equal(typeof m.get("bar"), "boolean");
});

test("setting  boolean as number is converted", function() {
    var MyModel = kendo.data.Model.define({
        fields: {
            bar: { field: "bar", type: "boolean" }
        }
    }), m = new MyModel();

    m.set("bar", 1);
    ok(m.get("bar") === true);
    equal(typeof m.get("bar"), "boolean");
});

test("setting  boolean as null returns null", function() {
    var MyModel = kendo.data.Model.define({
        fields: {
            bar: { field: "bar", type: "boolean" }
        }
    }), m = new MyModel();

    m.set("bar", null);
    equal(m.get("bar"), null);
});

test("setting boolean as invalid string value is converted to false", function() {
    var MyModel = kendo.data.Model.define({
        fields: {
            bar: { field: "bar", type: "boolean" }
        }
    }), m = new MyModel();

    m.set("bar", "foo");
    ok(m.get("bar") === false);
    equal(typeof m.get("bar"), "boolean");
});

test("setting number as string is converted to string", function() {
    var MyModel = kendo.data.Model.define({
        fields: {
            bar: { field: "bar", type: "string" }
        }
    }), m = new MyModel();

    m.set("bar", 42);
    equal(m.get("bar"), "42");
    equal(typeof m.get("bar"), "string");

});

test("set float number as string is parsed as float", function() {
    var MyModel = kendo.data.Model.define({
        fields: {
            bar: { field: "bar", type: "number" }
        }
    }), m = new MyModel();

    m.set("bar", "1.1");
    equal(m.get("bar"), 1.1);
    equal(typeof m.get("bar"), "number");
});

test("set ignores type case", function() {
    var MyModel = kendo.data.Model.define({
        fields: {
            bar: { field: "bar", type: "Number" }
        }
    }), m = new MyModel();

    m.set("bar", "1");
    equal(m.get("bar"), 1);
    equal(typeof m.get("bar"), "number");
});

test("set when no converter for the type", function() {
    var MyModel = kendo.data.Model.define({
        fields: {
            bar: { field: "bar", type: "foo" }
        }
    }), m = new MyModel();

    m.set("bar", "1");
    equal(m.get("bar"), "1");
});

test("set date as string is parsed", function() {
    var MyModel = kendo.data.Model.define({
        fields: {
            bar: { field: "bar", type: "date" }
        }
    }), m = new MyModel();

    m.set("bar", "1/1/2000");
    equal(m.get("bar").getTime(), new Date("1/1/2000").getTime());
    equal(typeof m.get("bar"), "object");
});


test("set with custom parse", function() {
    var wasCalled = false,
    MyModel = kendo.data.Model.define({
        fields: {
            bar: {
                field: "bar",
                type: "string",
                parse: function(value) { wasCalled = true; }
            }
        }
    }), m = new MyModel();

    m.set("bar", "some value");
    ok(wasCalled);
});

test("set with custom parse without type set", function() {
    var wasCalled = false,
    MyModel = kendo.data.Model.define({
        fields: {
            bar: {
                field: "bar",
                parse: function(value) { wasCalled = true; }
            }
        }
    }), m = new MyModel();

    m.set("bar", "some value");
    ok(wasCalled);
});

test("set date as .net date literal", function() {
    var MyModel = kendo.data.Model.define({
        fields: {
            bar: { field: "bar", type: "date" }
        }
    }), m = new MyModel();

    m.set("bar", "/Date(836524800000)/");
    equal(m.get("bar").getTime(), new Date(836524800000).getTime());
    equal(typeof m.get("bar"), "object");
});

test("setting value of field marked as editable=false is ignored", function() {
    var MyModel = kendo.data.Model.define({
        fields: {
            bar: { field: "bar", editable: false }
        }
    }), m = new MyModel({ bar: "foo" });

    m.set("bar", "baz");
    equal(m.get("bar"), "foo");
    ok(!m.dirty);
});

test("editable returns false for field marked as editable=false", function() {
    var MyModel = kendo.data.Model.define({
        fields: {
            bar: { field: "bar", editable: false }
        }
    }), m = new MyModel({ bar: "foo" });

    ok(!m.editable("bar"));
});

test("editable returns true when no fields definition", function() {
    var MyModel = kendo.data.Model.define(),
        m = new MyModel({ bar: "foo" });
    ok(m.editable("bar"));
});

test("changes returns false if value is same as default value", function() {
    var MyModel = kendo.data.Model.define({
        fields: {
            bar: { field: "bar", defaultValue: "bar"}
        }
    }), m = new MyModel({ });

    m.set("bar", "bar");

    ok(!m.dirty);
});

test("setting a field raises set event", 2, function() {
    var model = new Model({ foo: "bar" });

    model.bind("set", function(e) {
        equal(e.field, "foo");
        equal(e.value, "foo");
    });

    model.set("foo", "foo");
});

test("setting number to string field returns its string representation", function() {
    var MyModel = kendo.data.Model.define({ fields: { foo: { type: "string" }}});
    var model = new MyModel();

    model.set("foo", 1);

    equal(model.get("foo"), "1");
});

test("setting null to string field returns null", function() {
    var MyModel = kendo.data.Model.define({ fields: { foo: { type: "string" }}});
    var model = new MyModel();

    model.set("foo", null);

    equal(model.get("foo"), null);
});
}());
