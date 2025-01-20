import '@progress/kendo-ui/src/kendo.data.js';
import '@progress/kendo-ui/src/kendo.data.xml.js';

let XmlDataReader = kendo.data.XmlDataReader;

describe("XmlDataReader", function() {


    it("parse of empty element", function() {
        let reader = new XmlDataReader({});

        let result = reader.parse("<foo />");

        assert.isOk(result.foo);
    });

    it("parse with xml document", function() {
        let reader = new XmlDataReader({});
        let result = reader.parse($.parseXML("<foo />"));

        assert.isOk(result.foo);
    });

    it("parse as function", function() {
        let reader = new XmlDataReader({
            parse: function(result) {
                return "<bar />";
            }
        });

        let result = reader.parse("<foo />");

        assert.isOk(result.bar);
    });

    it("parse sets the text field to be the contents of the result", function() {
        let reader = new XmlDataReader({});

        let result = reader.parse("<foo>bar</foo>");

        assert.equal(result.foo["#text"], "bar");
    });

    it("parse child element as a field", function() {
        let reader = new XmlDataReader({});

        let result = reader.parse("<foo><bar>baz</bar></foo>");

        assert.equal(result.foo.bar["#text"], "baz");
    });

    it("parse grand child element as a field", function() {
        let reader = new XmlDataReader({});

        let result = reader.parse("<foo><bar><baz/></bar></foo>");

        assert.isOk(result.foo.bar.baz);
    });

    it("parse multiple children with same nodeName as array", function() {
        let reader = new XmlDataReader({});

        let result = reader.parse("<foo><bar/><bar/></foo>");

        assert.isOk(Array.isArray(result.foo.bar));
    });

    it("parse CDATA as #text", function() {
        let reader = new XmlDataReader({});
        let result = reader.parse("<foo><![CDATA[bar]]></foo>");
        assert.equal(result.foo["#text"], "bar");
    });

    it("parse attributes as @ fields", function() {
        let reader = new XmlDataReader({});

        let result = reader.parse("<foo bar='baz' />");

        assert.equal(result.foo["@bar"], "baz");
    });

    it("xpathToMember with attribute", function() {
        let reader = new XmlDataReader({});

        assert.equal(reader.xpathToMember("/foo/@bar"), 'foo["@bar"]');
    });

    it("xpathToMember with attribute only", function() {
        let reader = new XmlDataReader({});

        assert.equal(reader.xpathToMember("@bar"), '["@bar"]');
    });

    it("xpathToMember with text() only", function() {
        let reader = new XmlDataReader({});

        assert.equal(reader.xpathToMember("text()"), '["#text"]');
    });

    it("xpathToMember with attribute of nested element", function() {
        let reader = new XmlDataReader({});

        assert.equal(reader.xpathToMember("/foo/bar/@baz"), 'foo.bar["@baz"]');
    });

    it("xpathToMember and text()", function() {
        let reader = new XmlDataReader({});

        assert.equal(reader.xpathToMember("/foo/text()"), 'foo["#text"]');
    });

    it("xpathToMember and element only", function() {
        let reader = new XmlDataReader({});

        assert.equal(reader.xpathToMember("/foo"), 'foo');
    });

    it("xpathToMember and nested elements ", function() {
        let reader = new XmlDataReader({});

        assert.equal(reader.xpathToMember("/foo/bar"), 'foo.bar');
    });

    it("xpathToMember text() of nested elements ", function() {
        let reader = new XmlDataReader({});

        assert.equal(reader.xpathToMember("/foo/bar/text()"), 'foo.bar["#text"]');
    });

    it("xpathToMember returns empty string when argument is null, undefined or empty string ", function() {
        let reader = new XmlDataReader({});

        assert.equal(reader.xpathToMember(null), "");
        assert.equal(reader.xpathToMember(undefined), "");
        assert.equal(reader.xpathToMember(""), "");
    });

    it("errors as a functon", function() {
        let reader = new XmlDataReader({ errors: function() { return "foo"; } });

        let result = reader.parse("<errors>someerror</errors>");

        assert.equal(reader.errors(result), "foo");
    });

    it("errors returns the errors tag content", function() {
        let reader = new XmlDataReader({ errors: "/errors['#text']" });

        let result = reader.parse("<errors>someerror</errors>");

        assert.equal(reader.errors(result), "someerror");
    });

    it("total returns a number", function() {
        let reader = new XmlDataReader({ total: "/foo/text()" });

        let result = reader.parse("<foo>1</foo>");

        assert.isOk(reader.total(result) === 1);
    });

    it("total as function", function() {
        let reader = new XmlDataReader({ total: function() { return 1; } });

        let result = reader.parse("<foo>1</foo>");

        assert.isOk(reader.total(result) === 1);
    });

    it("serialize as function", function() {
        let reader = new XmlDataReader({
            serialize: function() {
                assert.isOk(true);
            }
        });

        let result = reader.parse("<foo>1</foo>");

        reader.serialize(result);
    });

    it("data returns the records", function() {
        let reader = new XmlDataReader({ data: "/foo/bar" });

        let result = reader.data({ foo: { bar: [1, 2] } });

        assert.isOk(Array.isArray(result));
        assert.equal(result[0], 1);
        assert.equal(result[1], 2);
        assert.equal(result.length, 2);
    });

    it("data as function", function() {
        let reader = new XmlDataReader({
            data: function(result) {
                return result.foo.bar;
            }
        });

        let result = reader.data({ foo: { bar: [1, 2] } });

        assert.isOk(Array.isArray(result));
        assert.equal(result[0], 1);
        assert.equal(result[1], 2);
        assert.equal(result.length, 2);
    });

    it("data returns the records with nested elements on two levels", function() {
        let reader = new XmlDataReader({ data: "/foo/bar/baz" });

        let result = reader.data({
            foo: {
                bar: [{
                    baz: [{}, {}]
                }, {
                    baz: [{}, {}]
                }]
            }
        });

        assert.isOk(Array.isArray(result));
        assert.equal(result.length, 4);
    });

    it("data returns the records with nested elements on three levels", function() {
        let reader = new XmlDataReader({ data: "/root/foo/bar/baz" });

        let result = reader.data({
            root: {
                foo: [
                    {
                        bar: [{
                            baz: [{}, {}]
                        }, {
                            baz: [{}, {}]
                        }]
                    },
                    {
                        bar: [{
                            baz: [{}, {}]
                        }, {
                            baz: [{}, {}]
                        }]
                    }
                ]
            }
        });
        assert.isOk(Array.isArray(result));

        assert.equal(result.length, 8);
    });
    it("data returns the records with nested elements on four levels", function() {
        let reader = new XmlDataReader({ data: "/root/foo/bar/baz" });

        let result = reader.data({
            root: {
                foo: [
                    {
                        bar: {
                            baz: [{}, {}]
                        }
                    },
                    {
                        bar: {
                            baz: [{}, {}]
                        }
                    }
                ]
            }
        });

        assert.isOk(Array.isArray(result));
        assert.equal(result.length, 4);
    });

    it("data returns the records in right order", function() {
        let reader = new XmlDataReader({ data: "/root/foo/bar/baz" });

        let result = reader.data({
            root: {
                foo: [
                    {
                        bar: {
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

        assert.isOk(Array.isArray(result));
        assert.equal(result[0], 1);
        assert.equal(result[1], 2);
        assert.equal(result[2], 3);
        assert.equal(result[3], 4);
    });

    it("data returns the records with mixed items", function() {
        let reader = new XmlDataReader({ data: "/root/foo/bar/baz" });

        let result = reader.data({
            root: {
                foo: [
                    {
                        bar: {
                            baz: [{}, {}]
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

        assert.isOk(Array.isArray(result));
        assert.equal(result.length, 3);
    });

    it("model is initialized from options", function() {
        let reader = new XmlDataReader({
            model: {
            }
        });

        assert.isOk(new reader.model instanceof kendo.data.Model);
    });

    it("model is initialized from options modelBase", function() {
        let ModelBase = kendo.data.Model.define({});

        let reader = new XmlDataReader({
            modelBase: ModelBase,
            model: {
            }
        });

        assert.isOk(new reader.model instanceof ModelBase);
    });

    it("parse model id", function() {
        let reader = new XmlDataReader({
            model: {
                id: "@id"
            },
            data: "/root/foo"
        });

        let result = reader.parse('<root><foo id="bar" /><foo id="baz" /></root>');
        let data = reader.data(result);

        let model = new reader.model(data[0]);

        assert.equal(model.id, "bar");
    });

    it("model id is field from the processed data", function() {
        let reader = new XmlDataReader({
            model: {
                id: "baz",
                fields: {
                    baz: "@id"
                }
            },
            data: "/root/foo"
        });

        let result = reader.parse('<root><foo id="bar" /><foo id="baz" /></root>');
        let data = reader.data(result);

        let model = new reader.model(data[0]);

        assert.equal(model.id, "bar");
    });

    it("model fields as object is parsed", function() {
        let reader = new XmlDataReader({
            model: {
                id: "@id",
                fields: {
                    foo: { field: "@foo" }
                }
            },
            data: "/root/foo"
        });

        let result = reader.parse('<root><foo foo="bar" /><foo foo="baz" /></root>');
        let data = reader.data(result);

        assert.equal(data[0].foo, "bar");
    });


    it("model fields are parsed", function() {
        let reader = new XmlDataReader({
            model: {
                id: "@id",
                fields: {
                    foo: "@foo"
                }
            },
            data: "/root/foo"
        });

        let result = reader.parse('<root><foo foo="bar" /><foo foo="baz" /></root>');
        let data = reader.data(result);

        assert.equal(data[0].foo, "bar");
    });

    it("parse xml with nullable property", function() {
        let reader = new XmlDataReader({
            model: {
                fields: {
                    bar: "bar/text()"
                }
            },
            data: "/root/foo"
        });

        let result = reader.parse('<root><foo><bar>bar1</bar></foo><foo></foo></root>');
        let data = reader.data(result);

        assert.equal(data.length, 2);
        assert.equal(data[0].bar, "bar1");
        assert.equal(data[1].bar, undefined);
    });

    it("data returns array if there is only one item", function() {
        let reader = new XmlDataReader({ data: "/foo" });

        let result = reader.parse("<foo><bar/></foo>");
        let data = reader.data(result);

        assert.isOk(Array.isArray(data));
        assert.equal(data.length, 1);
    });

    it("model fields attrbiutes are preserved", function() {
        let reader = new XmlDataReader({
            model: {
                fields: {
                    bar: { field: "bar/text()", type: "string" }
                }
            },
            data: "/root/foo"
        });

        let result = reader.parse('<root><foo><bar>bar1</bar></foo><foo></foo></root>');
        let data = reader.data(result);

        assert.equal(reader.model.fields["bar"].type, "string");
        assert.equal(typeof reader.model.fields["bar"].field, "function");
    });

    it("parse converts field values to the specifed type", function() {
        let reader = new XmlDataReader({
            model: {
                fields: {
                    bar: { field: "bar/text()", type: "number" },
                    baz: { field: "baz/text()" }
                }
            },
            data: "/root/foo"
        });

        let result = reader.parse('<root><foo><bar>1</bar><baz>1</baz></foo><foo><bar></bar><baz></baz></foo></root>');
        result = reader.data(result);

        assert.equal(result.length, 2);
        assert.strictEqual(result[0].bar, 1);
        assert.strictEqual(result[0].baz, "1");
        assert.strictEqual(result[1].bar, null);
        assert.strictEqual(result[1].baz, undefined);
    });

    it("returns empty data if source is empty", function() {
        let reader = new XmlDataReader({
            model: {
                fields: {
                    bar: { field: "bar/text()" },
                    baz: { field: "baz/text()" }
                }
            },
            data: "/root/foo"
        });

        let result = reader.parse('<root></root>');
        result = reader.data(result);

        assert.equal(result.length, 0);
    });

    it("additional field is not added to the model if id is not defined", function() {
        let reader = new XmlDataReader({
            model: {
                fields: {
                    bar: { field: "bar/text()" }
                }
            },
            data: "/root/foo"
        });

        let result = reader.parse('<root><foo><bar>moo</bar></foo></root>');
        result = reader.data(result);

        assert.isOk(!result[""]);
    });

});

