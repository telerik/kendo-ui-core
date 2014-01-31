(function(){

var XmlDataReader = kendo.data.XmlDataReader;

module("XmlDataReader", {
});


test("parse of empty element", function() {
    var reader = new XmlDataReader({});

    var result = reader.parse("<foo />");

    ok(result.foo);
});

test("parse with xml document", function() {
    var reader = new XmlDataReader({});
    var result = reader.parse($.parseXML("<foo />"));

    ok(result.foo);
});

test("parse as function", function() {
    var reader = new XmlDataReader({
        parse: function(result) {
            return "<bar />";
        }
    });

    var result = reader.parse("<foo />");

    ok(result.bar);
});

test("parse sets the text field to be the contents of the result", function() {
    var reader = new XmlDataReader({});

    var result = reader.parse("<foo>bar</foo>");

    equal(result.foo["#text"], "bar");
});

test("parse child element as a field", function() {
    var reader = new XmlDataReader({});

    var result = reader.parse("<foo><bar>baz</bar></foo>");

    equal(result.foo.bar["#text"], "baz");
});

test("parse grand child element as a field", function() {
    var reader = new XmlDataReader({});

    var result = reader.parse("<foo><bar><baz/></bar></foo>");

    ok(result.foo.bar.baz);
});

test("parse multiple children with same nodeName as array", function() {
    var reader = new XmlDataReader({});

    var result = reader.parse("<foo><bar/><bar/></foo>");

    ok($.isArray(result.foo.bar));
});

test("parse CDATA as #text", function() {
    var reader = new XmlDataReader({});
    var result = reader.parse("<foo><![CDATA[bar]]></foo>");
    equal(result.foo["#text"], "bar");
});

test("parse attributes as @ fields", function() {
    var reader = new XmlDataReader({});

    var result = reader.parse("<foo bar='baz' />");

    equal(result.foo["@bar"], "baz");
});

test("xpathToMember with attribute", function() {
    var reader = new XmlDataReader({});

    equal(reader.xpathToMember("/foo/@bar"), 'foo["@bar"]');
});

test("xpathToMember with attribute only", function() {
    var reader = new XmlDataReader({});

    equal(reader.xpathToMember("@bar"), '["@bar"]');
});

test("xpathToMember with text() only", function() {
    var reader = new XmlDataReader({});

    equal(reader.xpathToMember("text()"), '["#text"]');
});

test("xpathToMember with attribute of nested element", function() {
    var reader = new XmlDataReader({});

    equal(reader.xpathToMember("/foo/bar/@baz"), 'foo.bar["@baz"]');
});

test("xpathToMember and text()", function() {
    var reader = new XmlDataReader({});

    equal(reader.xpathToMember("/foo/text()"), 'foo["#text"]');
});

test("xpathToMember and element only", function() {
    var reader = new XmlDataReader({});

    equal(reader.xpathToMember("/foo"), 'foo');
});

test("xpathToMember and nested elements ", function() {
    var reader = new XmlDataReader({});

    equal(reader.xpathToMember("/foo/bar"), 'foo.bar');
});

test("xpathToMember text() of nested elements ", function() {
    var reader = new XmlDataReader({});

    equal(reader.xpathToMember("/foo/bar/text()"), 'foo.bar["#text"]');
});

test("xpathToMember returns empty string when argument is null, undefined or empty string ", function() {
    var reader = new XmlDataReader({});

    equal(reader.xpathToMember(null), "");
    equal(reader.xpathToMember(undefined), "");
    equal(reader.xpathToMember(""), "");
});

test("errors as a functon", function() {
    var reader = new XmlDataReader({ errors: function() { return "foo"; } });

    var result = reader.parse("<errors>someerror</errors>");

    equal(reader.errors(result), "foo");
});

test("errors returns the errors tag content", function() {
    var reader = new XmlDataReader({ errors: "/errors['#text']" });

    var result = reader.parse("<errors>someerror</errors>");

    equal(reader.errors(result), "someerror");
});

test("total returns a number", function() {
    var reader = new XmlDataReader({ total: "/foo/text()"});

    var result = reader.parse("<foo>1</foo>");

    ok(reader.total(result) === 1);
});

test("total as function", function() {
    var reader = new XmlDataReader({ total:function() { return 1; } });

    var result = reader.parse("<foo>1</foo>");

    ok(reader.total(result) === 1);
});

test("serialize as function", 1, function() {
    var reader = new XmlDataReader({
        serialize: function() {
            ok(true);
        }
    });

    var result = reader.parse("<foo>1</foo>");

    reader.serialize(result);
});

test("data returns the records", function() {
    var reader = new XmlDataReader({ data: "/foo/bar"});

    var result = reader.data({foo: { bar: [1,2] } });

    ok($.isArray(result));
    equal(result[0], 1);
    equal(result[1], 2);
    equal(result.length, 2);
});

test("data as function", function() {
    var reader = new XmlDataReader({
        data: function(result) {
            return result.foo.bar;
        }
    });

    var result = reader.data({foo: { bar: [1,2] } });

    ok($.isArray(result));
    equal(result[0], 1);
    equal(result[1], 2);
    equal(result.length, 2);
});

test("data returns the records with nested elements on two levels", function() {
    var reader = new XmlDataReader({ data: "/foo/bar/baz"});

    var result = reader.data({
        foo: {
            bar: [ {
                baz: [{},{}]
                }, {
                baz: [{},{}]
            }]
        }
    });

    ok($.isArray(result));
    equal(result.length, 4);
});

test("data returns the records with nested elements on three levels", function() {
    var reader = new XmlDataReader({ data: "/root/foo/bar/baz"});

    var result = reader.data({
        root: {
            foo: [
            {
                bar: [ {
                    baz: [{},{}]
                    }, {
                    baz: [{},{}]
                }]
            },
            {
                bar: [ {
                    baz: [{},{}]
                    }, {
                    baz: [{},{}]
                }]
            }
            ]
        }
    });
    ok($.isArray(result));

    equal(result.length, 8);
});
test("data returns the records with nested elements on four levels", function() {
    var reader = new XmlDataReader({ data: "/root/foo/bar/baz"});

    var result = reader.data({
        root: {
            foo: [
            {
                bar:  {
                    baz: [{},{}]
                }
            },
            {
                bar: {
                    baz: [{},{}]
                }
            }
            ]
        }
    });

    ok($.isArray(result));
    equal(result.length, 4);
});

test("data returns the records in right order", function() {
    var reader = new XmlDataReader({ data: "/root/foo/bar/baz"});

    var result = reader.data({
        root: {
            foo: [
            {
                bar:  {
                    baz: [1, 2]
                }
            },
            {
                bar: {
                    baz: [3, 4]
                }
            }
            ]
        }
    });

    ok($.isArray(result));
    equal(result[0], 1);
    equal(result[1], 2);
    equal(result[2], 3);
    equal(result[3], 4);
});

test("data returns the records with mixed items", function() {
    var reader = new XmlDataReader({ data: "/root/foo/bar/baz"});

    var result = reader.data({
        root: {
            foo: [
            {
                bar:  {
                    baz: [{},{}]
                }
            },
            {
                bar: {
                    baz: {}
                }
            }
            ]
        }
    });

    ok($.isArray(result));
    equal(result.length, 3);
});

test("model is initialized from options", function() {
    var reader = new XmlDataReader({
        model: {
        }
    });

    ok(new reader.model instanceof kendo.data.Model);
});

test("model is initialized from options modelBase", function() {
    var ModelBase = kendo.data.Model.define({});

    var reader = new XmlDataReader({
        modelBase: ModelBase,
        model: {
        }
    });

    ok(new reader.model instanceof ModelBase);
});

test("parse model id", function() {
    var reader = new XmlDataReader({
        model: {
            id: "@id"
        },
        data: "/root/foo"
    });

    var result = reader.parse('<root><foo id="bar" /><foo id="baz" /></root>');
    var data = reader.data(result);

    var model = new reader.model(data[0]);

    equal(model.id, "bar");
});

test("model id is field from the processed data", function() {
    var reader = new XmlDataReader({
        model: {
            id: "baz",
            fields: {
                baz: "@id"
            }
        },
        data: "/root/foo"
    });

    var result = reader.parse('<root><foo id="bar" /><foo id="baz" /></root>');
    var data = reader.data(result);

    var model = new reader.model(data[0]);

    equal(model.id, "bar");
});

test("model fields as object is parsed", function() {
    var reader = new XmlDataReader({
        model: {
            id: "@id",
            fields: {
                foo: { field: "@foo" }
            }
        },
        data: "/root/foo"
    });

    var result = reader.parse('<root><foo foo="bar" /><foo foo="baz" /></root>');
    var data = reader.data(result);

    equal(data[0].foo, "bar");
});


test("model fields are parsed", function() {
    var reader = new XmlDataReader({
        model: {
            id: "@id",
            fields: {
                foo: "@foo"
            }
        },
        data: "/root/foo"
    });

    var result = reader.parse('<root><foo foo="bar" /><foo foo="baz" /></root>');
    var data = reader.data(result);

    equal(data[0].foo, "bar");
});

test("parse xml with nullable property", function() {
    var reader = new XmlDataReader({
        model: {
            fields: {
                bar: "bar/text()"
            }
        },
        data: "/root/foo"
    });

    var result = reader.parse('<root><foo><bar>bar1</bar></foo><foo></foo></root>');
    var data = reader.data(result);

    equal(data.length, 2);
    equal(data[0].bar, "bar1");
    equal(data[1].bar, undefined);
});

test("data returns array if there is only one item", function() {
    var reader = new XmlDataReader( { data: "/foo"} );

    var result = reader.parse("<foo><bar/></foo>");
    var data = reader.data(result);

    ok($.isArray(data));
    equal(data.length, 1);
});

test("model fields attrbiutes are preserved", function() {
    var reader = new XmlDataReader({
        model: {
            fields: {
                bar: { field: "bar/text()", type: "string" }
            }
        },
        data: "/root/foo"
    });

    var result = reader.parse('<root><foo><bar>bar1</bar></foo><foo></foo></root>');
    var data = reader.data(result);

    equal(reader.model.fields["bar"].type, "string");
    equal(typeof reader.model.fields["bar"].field, "function");
});

test("parse converts field values to the specifed type", function() {
    var reader = new XmlDataReader({
        model: {
            fields: {
                bar: { field: "bar/text()", type: "number" },
                baz: { field: "baz/text()" }
            }
        },
        data: "/root/foo"
    });

    var result = reader.parse('<root><foo><bar>1</bar><baz>1</baz></foo><foo><bar></bar><baz></baz></foo></root>');
    result = reader.data(result);

    equal(result.length, 2);
    strictEqual(result[0].bar, 1);
    strictEqual(result[0].baz, "1");
    strictEqual(result[1].bar, null);
    strictEqual(result[1].baz, undefined);
});

test("returns empty data if source is empty", function() {
    var reader = new XmlDataReader({
        model: {
            fields: {
                bar: { field: "bar/text()" },
                baz: { field: "baz/text()" }
            }
        },
        data: "/root/foo"
    });

    var result = reader.parse('<root></root>');
    result = reader.data(result);

    equal(result.length, 0);
});

test("additional field is not added to the model if id is not defined", function() {
     var reader = new XmlDataReader({
        model: {
            fields: {
                bar: { field: "bar/text()" }
            }
        },
        data: "/root/foo"
    });

    var result = reader.parse('<root><foo><bar>moo</bar></foo></root>');
    result = reader.data(result);

    ok(!result[""]);
});

}());
