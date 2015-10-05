(function(){

var DataReader = kendo.data.DataReader;

test("data returns the passed value by default", function() {
    var reader = new DataReader(), result = {};

    ok(reader.data(result) === result);
});

test("groups returns the passed value by default", function() {
    var reader = new DataReader(), result = {};

    ok(reader.groups(result) === result);
});

test("members of the schema override the prototype members", function() {
    var reader = new DataReader({
        data: function(result) {
            return result + "bar"
        }
    });

    equal(reader.data("foo"), "foobar");
});

test("string members of the schema are treated as getters", function() {
    var reader = new DataReader({
        data: "foo"
    });

    equal(reader.data({ foo: "bar" }), "bar");
});

test("total returns the length by default", function() {
    var reader = new DataReader();

    equal(reader.total([1]), 1);
});

test("aggregates returns an empty object default", function() {
    var reader = new DataReader();

    ok($.isEmptyObject(reader.aggregates()));
});

test("model is initialized if passed", function() {
    var reader = new DataReader({
        model: {}
    });

    ok(new reader.model instanceof kendo.data.Model);
});

test("project fields to the one specified in the field definition", function() {
    var reader = new DataReader({
        model: {
            fields: {
                bar: { field: "foo" }
            }
        }
    });

    var result = reader.parse([{ foo: "1"}, { foo: ""}, { foo: "0"}]);

    result = reader.data(result);

    equal(result.length, 3);
    equal(result[0].bar, "1");
    equal(result[1].bar, "");
    equal(result[2].bar, "0");
});

test("project fields to the one specified in the field definition when definition is array", function() {
    var reader = new DataReader({
        model: {
            fields: [
                { field: "bar", from: "foo" }
            ]
        }
    });

    var result = reader.parse([{ foo: "1"}, { foo: ""}, { foo: "0"}]);

    result = reader.data(result);

    equal(result.length, 3);
    equal(result[0].bar, "1");
    equal(result[1].bar, "");
    equal(result[2].bar, "0");
});

test("project fields from the one specified in the from field definition", function() {
    var reader = new DataReader({
        model: {
            fields: {
                bar: { from: "foo" }
            }
        }
    });

    var result = reader.parse([{ foo: "1"}, { foo: ""}, { foo: "0"}]);

    result = reader.data(result);

    equal(result.length, 3);
    equal(result[0].bar, "1");
    equal(result[1].bar, "");
    equal(result[2].bar, "0");
});

test("project fields - from has greater priority", function() {
    var reader = new DataReader({
        model: {
            fields: {
                bar: { from: "foo", field: "baz" }
            }
        }
    });

    var result = reader.parse([{ foo: "1"}, { foo: ""}, { foo: "0"}]);

    result = reader.data(result);

    equal(result.length, 3);
    equal(result[0].bar, "1");
    equal(result[1].bar, "");
    equal(result[2].bar, "0");
});

test("project fields to the name specified as string", function() {
    var reader = new DataReader({
        model: {
            fields: {
                bar: "foo"
            }
        }
    });

    var result = reader.parse([{ foo: "1"}, { foo: ""}, { foo: "0"}]);

    result = reader.data(result);

    equal(result.length, 3);
    equal(result[0].bar, "1");
    equal(result[1].bar, "");
    equal(result[2].bar, "0");
});

test("groups project fields to the one specified in the field definition", function() {
    var reader = new DataReader({
        model: {
            fields: {
                bar: { field: "foo" }
            }
        }
    });

    var result = reader.parse([ { items: [{ foo: "1"}, { foo: ""}, { foo: "0"}], field: "foo", value: "0" }]);
    result = reader.groups(result)[0];

    equal(result.items.length, 3);
    equal(result.items[0].bar, "1");
    equal(result.items[1].bar, "");
    equal(result.items[2].bar, "0");
});

test("group field name is converted if projection is specified", function() {
    var reader = new DataReader({
        model: {
            fields: {
                bar: { field: "foo" }
            }
        }
    });

    var result = reader.parse([ { items: [{ foo: "1"}, { foo: ""}, { foo: "0"}], field: "foo", value: "0" }]);
    result = reader.groups(result)[0];

    equal(result.items.length, 3);
    equal(result.field, "bar");
});

test("original field is deleted after the projection when set via field declaration", function() {
    var reader = new DataReader({
        model: {
            fields: {
                bar: { field: "foo" }
            }
        }
    });

    var result = reader.parse([{ foo: "1"}, { foo: ""}, { foo: "0"}]);

    result = reader.data(result);

    equal(result.length, 3);
    ok(!("foo" in result[0]));
    ok(!("foo" in result[1]));
    ok(!("foo" in result[1]));
});

test("original field is deleted after the projection", function() {
    var reader = new DataReader({
        model: {
            fields: {
                bar: "foo"
            }
        }
    });

    var result = reader.parse([{ foo: "1"}, { foo: ""}, { foo: "0"}]);

    result = reader.data(result);

    equal(result.length, 3);
    ok(!("foo" in result[0]));
    ok(!("foo" in result[1]));
    ok(!("foo" in result[1]));
});

test("original field is not deleted if not projected", function() {
    var reader = new DataReader({
        model: {
            fields: {
                bar: "bar"
            }
        }
    });

    var result = reader.parse([{ bar: "1"}, { bar: ""}, { bar: "0"}]);

    result = reader.data(result);

    equal(result.length, 3);
    ok("bar" in result[0]);
    ok("bar" in result[1]);
    ok("bar" in result[1]);
});

test("custom serialize is called instead of the default implementation", 1, function() {
    var reader = new DataReader({
        model: {
            fields: {
                bar: "bar"
            }
        },
        serialize: function(data) {
            return [ { baz: "foo" }];
        }
    });

    var result = reader.parse([{ bar: "1"}, { bar: ""}, { bar: "0"}]);

    result = reader.serialize(result);

    equal(result[0].baz, "foo");
});

test("data is not processed by the defualt serialize if custom one is set", 1, function() {
    var reader = new DataReader({
        model: {
            fields: {
                bar: "foo"
            }
        },
        serialize: function(data) {
            equal(data[0].bar, "1");
        }
    });

    var result = reader.parse([{ foo: "1"}, { foo: ""}, { foo: "0"}]);

    result = reader.data(result);
    reader.serialize(result);
});

test("custom serialize is called event if field names matches", 1, function() {
    var reader = new DataReader({
        model: {
            fields: {
                bar: "bar"
            }
        },
        serialize: function(data) {
            ok(true);
        }
    });

    var result = reader.parse([{ foo: "1"}, { foo: ""}, { foo: "0"}]);

    result = reader.data(result);
    reader.serialize(result);
});

test("serialize converts data to the original structure", function() {
    var reader = new DataReader({
        model: {
            fields: {
                bar: "foo"
            }
        }
    });

    var result = reader.parse([{ foo: "1"}, { foo: ""}, { foo: "0"}]);

    result = reader.data(result);
    result = reader.serialize(result);

    equal(result.length, 3);
    equal(result[0].foo, "1");
    equal(result[1].foo, "");
    equal(result[2].foo, "0");
});

test("serialize converts data to the original structure with object as field declaration", function() {
    var reader = new DataReader({
        model: {
            fields: {
                bar: { field: "foo" }
            }
        }
    });

    var result = reader.parse([{ foo: "1"}, { foo: ""}, { foo: "0"}]);

    result = reader.data(result);
    result = reader.serialize(result);

    equal(result.length, 3);
    equal(result[0].foo, "1");
    equal(result[1].foo, "");
    equal(result[2].foo, "0");
    ok(!("bar" in result[2]));
});

test("serialize converts data to the original structure with object as from declaration", function() {
    var reader = new DataReader({
        model: {
            fields: {
                bar: { from: "foo" }
            }
        }
    });

    var result = reader.parse([{ foo: "1"}, { foo: ""}, { foo: "0"}]);

    result = reader.data(result);
    result = reader.serialize(result);

    equal(result.length, 3);
    equal(result[0].foo, "1");
    equal(result[1].foo, "");
    equal(result[2].foo, "0");
    ok(!("bar" in result[2]));
});

test("serialize converts data to the original structure with object as from declaration - nested field", function() {
    var reader = new DataReader({
        model: {
            fields: {
                bar: { from: "foo.baz" }
            }
        }
    });

    var result = reader.parse([{ foo: { baz: "1" } }, { foo: { baz: "" } }, { foo: { baz: "0" } }]);

    result = reader.data(result);
    result[0].bar = "new value";
    result = reader.serialize(result);

    equal(result.length, 3);
    equal(result[0].foo.baz, "new value");
    equal(result[1].foo.baz, "");
    equal(result[2].foo.baz, "0");
    ok(!("bar" in result[0]));
    ok(!("bar" in result[1]));
    ok(!("bar" in result[2]));
});


test("converts field values to the specifed type", function() {
    var reader = new DataReader({
        model: {
            fields: {
                bar: { type: "number" },
                baz: "baz"
            }
        }
    });

    var result = reader.parse([{ bar: "1", baz: "baz1"}, { bar: "", baz: "baz2"}, { bar: "0", baz: "baz3"}]);
    result = reader.data(result);

    equal(result.length, 3);
    strictEqual(result[0].bar, 1);
    strictEqual(result[0].baz, "baz1");
    strictEqual(result[1].bar, null);
    strictEqual(result[1].baz, "baz2");
    strictEqual(result[2].bar, 0);
    strictEqual(result[2].baz, "baz3");
});

test("converts field values to the specifed type with server groups", function() {
    var reader = new DataReader({
        model: {
            fields: {
                bar: { type: "number" },
                baz: "baz"
            }
        }
    });

    var result = reader.parse([ { items: [{ bar: "1", baz: "baz1"}, { bar: "", baz: "baz2"}, { bar: "0", baz: "baz3"}], field: "bar", value: "0" }]);
    result = reader.groups(result)[0];

    var items = result.items;

    equal(items.length, 3);
    strictEqual(items[0].bar, 1);
    strictEqual(items[0].baz, "baz1");
    strictEqual(items[1].bar, null);
    strictEqual(items[1].baz, "baz2");
    strictEqual(items[2].bar, 0);
    strictEqual(items[2].baz, "baz3");

    strictEqual(result.value, 0);
});

test("converts field values to the specifed type with external model definition", function() {
    var Model = kendo.data.Model.define({
        fields: {
            bar: { type: "number" },
            baz: "baz"
        }
    });

    var reader = new DataReader({
        model: Model
    });

    var result = reader.parse([{ bar: "1", baz: "baz1"}, { bar: "", baz: "baz2"}, { bar: "0", baz: "baz3"}]);
    result = reader.data(result);

    equal(result.length, 3);
    strictEqual(result[0].bar, 1);
    strictEqual(result[0].baz, "baz1");
    strictEqual(result[1].bar, null);
    strictEqual(result[1].baz, "baz2");
    strictEqual(result[2].bar, 0);
    strictEqual(result[2].baz, "baz3");
});

test("converts field values to the specifed type with multiple nested server groups", function() {
    var reader = new DataReader({
        model: {
            fields: {
                bar: { type: "number" },
                baz: "baz"
            }
        }
    });

    var result = reader.parse([ {
        hasSubgroups: true, items: [
                { items: [{ bar: "1", baz: "baz1"}, { bar: "", baz: "baz2"}, { bar: "0", baz: "baz3"}], field:"bar", value: "0" }
            ],
            field: "bar",
            value: "0"
        }]);

    result = reader.groups(result)[0];

    strictEqual(result.items[0].value, 0);

    var items = result.items[0].items;

    equal(items.length, 3);
    strictEqual(items[0].bar, 1);
    strictEqual(items[0].baz, "baz1");
    strictEqual(items[1].bar, null);
    strictEqual(items[1].baz, "baz2");
    strictEqual(items[2].bar, 0);
    strictEqual(items[2].baz, "baz3");

});

test("fields not in the model are persisted", function() {
    var reader = new DataReader({
        model: {
            fields: {
                bar: { type: "number" }
            }
        }
    });

    var result = reader.parse([{ bar: "1", baz: "baz1"}, { bar: "", baz: "baz2"}, { bar: "0", baz: "baz3"}]);
    result = reader.data(result);

    equal(result.length, 3);
    strictEqual(result[0].bar, 1);
    strictEqual(result[0].baz, "baz1");
    strictEqual(result[1].bar, null);
    strictEqual(result[1].baz, "baz2");
    strictEqual(result[2].bar, 0);
    strictEqual(result[2].baz, "baz3");
});

test("custom data function is called when model is defined", function() {
    var called = false,
        reader = new DataReader({
            model: {
                fields: {
                    bar: { type: "number" },
                    baz: "baz"
                }
            },
            data: function() {
                called = true;
                return [];
            }
        });

    var result = reader.parse([{ bar: "1", baz: "baz1"}, { bar: "", baz: "baz2"}, { bar: "0", baz: "baz3"}]);
    result = reader.data(result);
    ok(called);
});

test("data retuns empty observable array when such is passed and a model is declared", function() {
    var reader = new DataReader({
        model: {
            fields: {
                bar: { type: "number" },
                baz: "baz"
            }
        },
        data: function() {
            return new kendo.data.ObservableArray([]);
        }
    });
    ok(!reader.data().length);
});

}());
