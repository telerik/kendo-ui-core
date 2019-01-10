(function() {

    var Model;

    describe("kendo.data.Model.set", function() {
        beforeEach(function() {
            Model = kendo.data.Model.define();
        });

        it("set updates the value of the specified field", function() {
            var m = new Model({
                foo: "bar"
            });

            m.set("foo", "baz");
            assert.equal(m.get("foo"), "baz");
        });

        it("set updates the value of the specified expression", function() {
            var m = new Model({
                foo: {
                    bar: "bar"
                }
            });

            m.set("foo.bar", "baz");
            assert.equal(m.get("foo.bar"), "baz");
        });

        it("model is dirty after set", function() {
            var m = new Model();

            m.set("foo", "foo");

            assert.isOk(m.dirty);
        });

        it("dirtyFields are updated after set", function() {
            var model = new Model();

            model.set("foo", "foo");

            assert.isOk(model.dirtyFields["foo"]);
        });

        it("model is dirty during change event", function() {
            var m = new Model();
            m.bind("change", function() {
                assert.isOk(m.dirty);
            });
            m.set("foo", "foo");
        });

        it("dirtyFields are updated during change event", function() {
            var model = new Model();
            model.bind("change", function() {
                assert.isOk(model.dirtyFields["foo"]);;
            });
            model.set("foo", "foo");
        });

        it("model is dirty during set event", function() {
            var m = new Model();

            m.bind("set", function() {
                assert.isOk(m.dirty);
            });
            m.set("foo", "foo");
        });

        it("dirtyFields are updated during set event", function() {
            var model = new Model();

            model.bind("set", function() {
                assert.isOk(model.dirtyFields["foo"]);
            });

            model.set("foo", "foo");;
        });

        it("model is dirty after set event", function() {
            var m = new Model();

            m.set("foo", "foo");

            assert.isOk(m.dirty);
        });

        it("model is not dirty if set event is prevented", function() {
            var m = new Model();

            m.bind("set", function(e) {
                e.preventDefault();
            });
            m.set("foo", "foo");

            assert.isOk(!m.dirty);
        });

        it("dirtyFields are not updated if set event is prevented", function() {
            var model = new Model();

            model.bind("set", function(e) {
                e.preventDefault();
            });
            model.set("foo", "foo");

            assert.isOk(!model.dirtyFields["foo"]);
        });

        it("model is dirty if is already dirty and set event is prevented", function() {
            var m = new Model();

            m.dirty = true;
            m.bind("set", function(e) {
                e.preventDefault();
            });
            m.set("foo", "foo");

            assert.isOk(m.dirty);
        });

        it("dirtyField is dirty if is already dirty and set event is prevented", function() {
            var model = new Model();
            model.dirty = true;
            model.dirtyFields["foo"] = true;
            model.bind("set", function(e) {
                e.preventDefault();
            });

            model.set("foo", "foo");

            assert.isOk(model.dirtyFields["foo"]);
        });

        it("equalSet event is triggered if the same value is set", function() {
            var args = {};
            var model = new Model({
                foo: "bar"
            });
            model.bind("equalSet", function(e) {
                args = e;
            });

            model.set("foo", "bar");

            assert.equal(args.field, "foo");
            assert.equal(args.value, "bar");
        });

        it("model is not dirty if the same string value is set", function() {
            var m = new Model({
                foo: "foo"
            });

            m.set("foo", "foo");
            assert.isOk(!m.dirty);
        });

        it("dirtyField is not dirty if the same string value is set", function() {
            var model = new Model({
                foo: "foo"
            });

            model.set("foo", "foo");

            assert.isOk(!model.dirtyFields["foo"]);
        });

        it("model is not dirty if the same numeric value is set", function() {
            var m = new Model({
                foo: 1
            });

            m.set("foo", 1);
            assert.isOk(!m.dirty);
        });

        it("dirtyField is not dirty if the same numeric value is set", function() {
            var model = new Model({
                foo: 1
            });

            model.set("foo", 1);

            assert.isOk(!model.dirtyFields["foo"]);
        });

        it("model is not dirty if the same date value is set", function() {
            var m = new Model({
                foo: new Date(2011, 1, 1)
            });

            m.set("foo", new Date(2011, 1, 1));
            assert.isOk(!m.dirty);
        });

        it("dirtyField is not dirty if the same date value is set", function() {
            var model = new Model({
                foo: new Date(2011, 1, 1)
            });

            model.set("foo", new Date(2011, 1, 1));

            assert.isOk(!model.dirtyFields["foo"]);
        });

        it("model is not dirty if the same object value is set", function() {
            var m = new Model({
                foo: {
                    bar: "bar"
                }
            });

            m.set("foo", { bar: "bar" });

            assert.isOk(!m.dirty);
        });

        it("dirtyField is not dirty if the same object value is set", function() {
            var model = new Model({
                foo: {
                    bar: "bar"
                }
            });

            model.set("foo", { bar: "bar" });

            assert.isOk(!model.dirtyFields["foo"]);
        });

        it("change is raised if the model is modified after set", function() {
            var changeWasCalled = false, m = new Model().bind("change", function() {
                changeWasCalled = true;
            });

            m.set("foo", "bar");
            assert.isOk(changeWasCalled);
        });

        it("change is not raised if the model is not modifed after set", function() {
            var changeWasCalled = false, m = new Model({
                foo: "bar"
            }).bind("change", function() {
                changeWasCalled = true;
            });

            m.set("foo", "bar");
            assert.isOk(!changeWasCalled);
        });

        it("set parse value to defined type", function() {
            var MyModel = kendo.data.Model.define({
                fields: {
                    bar: { field: "bar", type: "number" }
                }
            }), m = new MyModel();

            m.set("bar", "1");
            assert.equal(m.get("bar"), 1);
            assert.equal(typeof m.get("bar"), "number");
        });

        it("setting number when no type defined", function() {
            var MyModel = kendo.data.Model.define({
                fields: {
                    bar: { field: "bar" }
                }
            }), m = new MyModel();

            m.set("bar", 1);
            assert.equal(m.get("bar"), 1);
            assert.equal(typeof m.get("bar"), "number");
        });

        it("setting boolean as string is converted", function() {
            var MyModel = kendo.data.Model.define({
                fields: {
                    bar: { field: "bar", type: "boolean" }
                }
            }), m = new MyModel();

            m.set("bar", "TRUE");
            assert.isOk(m.get("bar") === true);
            assert.equal(typeof m.get("bar"), "boolean");
        });

        it("setting boolean as false string is converted", function() {
            var MyModel = kendo.data.Model.define({
                fields: {
                    bar: { field: "bar", type: "boolean" }
                }
            }), m = new MyModel();

            m.set("bar", "false");
            assert.isOk(m.get("bar") === false);
            assert.equal(typeof m.get("bar"), "boolean");
        });

        it("setting  boolean as number is converted", function() {
            var MyModel = kendo.data.Model.define({
                fields: {
                    bar: { field: "bar", type: "boolean" }
                }
            }), m = new MyModel();

            m.set("bar", 1);
            assert.isOk(m.get("bar") === true);
            assert.equal(typeof m.get("bar"), "boolean");
        });

        it("setting  boolean as null returns null", function() {
            var MyModel = kendo.data.Model.define({
                fields: {
                    bar: { field: "bar", type: "boolean" }
                }
            }), m = new MyModel();

            m.set("bar", null);
            assert.equal(m.get("bar"), null);
        });

        it("setting boolean as invalid string value is converted to false", function() {
            var MyModel = kendo.data.Model.define({
                fields: {
                    bar: { field: "bar", type: "boolean" }
                }
            }), m = new MyModel();

            m.set("bar", "foo");
            assert.isOk(m.get("bar") === false);
            assert.equal(typeof m.get("bar"), "boolean");
        });

        it("setting number as string is converted to string", function() {
            var MyModel = kendo.data.Model.define({
                fields: {
                    bar: { field: "bar", type: "string" }
                }
            }), m = new MyModel();

            m.set("bar", 42);
            assert.equal(m.get("bar"), "42");
            assert.equal(typeof m.get("bar"), "string");

        });

        it("set float number as string is parsed as float", function() {
            var MyModel = kendo.data.Model.define({
                fields: {
                    bar: { field: "bar", type: "number" }
                }
            }), m = new MyModel();

            m.set("bar", "1.1");
            assert.equal(m.get("bar"), 1.1);
            assert.equal(typeof m.get("bar"), "number");
        });

        it("set ignores type case", function() {
            var MyModel = kendo.data.Model.define({
                fields: {
                    bar: { field: "bar", type: "Number" }
                }
            }), m = new MyModel();

            m.set("bar", "1");
            assert.equal(m.get("bar"), 1);
            assert.equal(typeof m.get("bar"), "number");
        });

        it("set when no converter for the type", function() {
            var MyModel = kendo.data.Model.define({
                fields: {
                    bar: { field: "bar", type: "foo" }
                }
            }), m = new MyModel();

            m.set("bar", "1");
            assert.equal(m.get("bar"), "1");
        });

        it("set date as string is parsed", function() {
            var MyModel = kendo.data.Model.define({
                fields: {
                    bar: { field: "bar", type: "date" }
                }
            }), m = new MyModel();

            m.set("bar", "1/1/2000");
            assert.equal(m.get("bar").getTime(), new Date("1/1/2000").getTime());
            assert.equal(typeof m.get("bar"), "object");
        });


        it("set with custom parse", function() {
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
            assert.isOk(wasCalled);
        });

        it("set with custom parse without type set", function() {
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
            assert.isOk(wasCalled);
        });

        it("set date as .net date literal", function() {
            var MyModel = kendo.data.Model.define({
                fields: {
                    bar: { field: "bar", type: "date" }
                }
            }), m = new MyModel();

            m.set("bar", "/Date(836524800000)/");
            assert.equal(m.get("bar").getTime(), new Date(836524800000).getTime());
            assert.equal(typeof m.get("bar"), "object");
        });

        it("setting value of field marked as editable=false is ignored", function() {
            var MyModel = kendo.data.Model.define({
                fields: {
                    bar: { field: "bar", editable: false }
                }
            }), m = new MyModel({ bar: "foo" });

            m.set("bar", "baz");
            assert.equal(m.get("bar"), "foo");
            assert.isOk(!m.dirty);
        });

        it("setting value of field marked as editable=false does not update dirtyFields", function() {
            var MyModel = kendo.data.Model.define({
                fields: {
                    bar: { field: "bar", editable: false }
                }
            });
            var model = new MyModel({ bar: "foo" });

            model.set("bar", "baz");

            assert.equal(model.get("bar"), "foo");
            assert.isOk(!model.dirtyFields["bar"]);
        });

        it("editable returns false for field marked as editable=false", function() {
            var MyModel = kendo.data.Model.define({
                fields: {
                    bar: { field: "bar", editable: false }
                }
            }), m = new MyModel({ bar: "foo" });

            assert.isOk(!m.editable("bar"));
        });

        it("editable returns true when no fields definition", function() {
            var MyModel = kendo.data.Model.define(),
                m = new MyModel({ bar: "foo" });
            assert.isOk(m.editable("bar"));
        });

        it("changes returns false if value is same as default value", function() {
            var MyModel = kendo.data.Model.define({
                fields: {
                    bar: { field: "bar", defaultValue: "bar" }
                }
            }), m = new MyModel({});

            m.set("bar", "bar");

            assert.isOk(!m.dirty);
        });

        it("dirtyField is not dirty if the default values is set", function() {
            var MyModel = kendo.data.Model.define({
                fields: {
                    bar: { field: "bar", defaultValue: "bar" }
                }
            });
            var model = new MyModel({});

            model.set("bar", "bar");

            assert.isOk(!model.dirtyFields["bar"]);
        });

        it("setting a field raises set event", function() {
            var model = new Model({ foo: "bar" });

            model.bind("set", function(e) {
                assert.equal(e.field, "foo");
                assert.equal(e.value, "foo");
            });

            model.set("foo", "foo");
        });

        it("setting number to string field returns its string representation", function() {
            var MyModel = kendo.data.Model.define({ fields: { foo: { type: "string" } } });
            var model = new MyModel();

            model.set("foo", 1);

            assert.equal(model.get("foo"), "1");
        });

        it("setting null to string field returns null", function() {
            var MyModel = kendo.data.Model.define({ fields: { foo: { type: "string" } } });
            var model = new MyModel();

            model.set("foo", null);

            assert.equal(model.get("foo"), null);
        });
    });
}());
