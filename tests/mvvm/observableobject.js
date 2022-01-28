(function() {
    describe("mvvm observable object", function() {

        it("set changes the value of the field", function() {
            var viewModel = kendo.observable({ foo: "bar" });

            viewModel.set("foo", "foo");

            assert.equal(viewModel.foo, "foo");
        });

        it("copies all fields of the source object", function() {
            var viewModel = kendo.observable({ foo: "bar" });

            assert.equal(viewModel.foo, "bar");
        });

        it("context of methods is the view model", function() {
            var viewModel = kendo.observable({
                foo: function() {
                    assert.strictEqual(this, viewModel);
                }
            });

            viewModel.foo();
        });

        it("nested objects are observable as well", function() {
            var viewModel = kendo.observable({ foo: { bar: "baz" } });

            assert.isOk(viewModel.foo.get);
        });

        it("nested objects which are private are not observable", function() {
            var viewModel = kendo.observable({ _foo: { bar: "baz" } });

            assert.isOk(!(viewModel._foo instanceof kendo.data.ObservableObject));
        });

        it("set triggers the change event", function() {
            expect(1);

            var viewModel = kendo.observable({ foo: "bar" });

            viewModel.bind("change", function() {
                assert.isOk(true, "change is raised");
            });

            viewModel.set("foo", "baz");
        });

        it("set triggers only once the change event if value is the same", function() {
            var viewModel = kendo.observable({ foo: { foo: "bar" } });

            viewModel.bind("change", function() {
                assert.isOk(true, "change is raised");
            });

            viewModel.set("foo.foo", "baz");
            viewModel.set("foo.foo", "baz");
        });

        it("set bind to change once with composite paths", function() {
            var viewModel = kendo.observable({ foo: { foo: [] } });

            // This works: viewModel.foo.set("foo", []);
            viewModel.set("foo.foo", []);

            viewModel.bind("change", function() {
                assert.isOk(true, "change is raised");
            });

            viewModel.get("foo.foo").push(1);
        });

        it("change event arguments provide the name of the field", function() {
            expect(1);

            var viewModel = kendo.observable({ foo: "bar" });

            viewModel.bind("change", function(e) {
                assert.equal(e.field, "foo");
            });

            viewModel.set("foo", "baz");
        });

        it("setting nested fields", function() {
            var viewModel = kendo.observable({ foo: { bar: "bar" } });

            viewModel.set("foo.bar", "baz");

            assert.equal(viewModel.foo.bar, "baz");
        });

        it("nested arrays are extended", function() {
            var viewModel = kendo.observable({ foo: [{}] });

            assert.equal(typeof viewModel.foo.bind, "function");
        });

        it("getting field raises get event", function(done) {
            expect(1);

            var viewModel = kendo.observable({ foo: "bar" });

            viewModel.bind("get", function(e) {

                assert.equal(e.field, "foo");
                done();
            });

            viewModel.get("foo");
        });

        it("setting a field raises set event", function(done) {
            expect(2);

            var viewModel = kendo.observable({ foo: "bar" });

            viewModel.bind("set", function(e) {

                assert.equal(e.field, "foo");
                assert.equal(e.value, "foo");
                done();
            });

            viewModel.set("foo", "foo");
        });

        it("cancelling the set event prevents setting the field value", function(done) {
            expect(1);

            var viewModel = kendo.observable({ foo: "bar" });

            viewModel.bind("set", function(e) {
                e.preventDefault();
                done();
            });

            viewModel.set("foo", "foo");
            assert.equal(viewModel.foo, "bar");
        });

        it("getting nested field raises get event of parent", function(done) {
            expect(1);

            var viewModel = kendo.observable({ foo: { bar: "bar" } });

            viewModel.bind("get", function(e) {
                assert.equal(e.field, "foo.bar");
                done();
            });

            viewModel.foo.get("bar");
        });

        it("toJSON serializes only public fields", function() {
            var observable = kendo.observable({ foo: "bar", baz: function() { } });
            var json = observable.toJSON();
            var fields = [];

            for (var field in json) {
                fields.push(field);
            }

            assert.equal(fields.length, 1);
            assert.equal(fields[0], "foo");
            assert.equal(json.foo, "bar");
        });

        it("toJSON is recursive", function() {
            var observable = kendo.observable({ foo: { bar: "bar", baz: function() { } } });
            var json = observable.toJSON();
            var fields = [];

            for (var field in json.foo) {
                fields.push(field);
            }

            assert.equal(fields.length, 1);
            assert.equal(fields[0], "bar");
        });

        it("toJSON is recursive with arrays", function() {
            var observable = kendo.observable({ foo: [{ bar: "bar" }] });
            var json = observable.toJSON();
            var fields = [];

            for (var field in json.foo[0]) {
                fields.push(field);
            }

            assert.equal(fields.length, 1);
            assert.equal(fields[0], "bar");
        });

        it("toJSON copies dates", function() {
            var date = new Date();
            var observable = kendo.observable({ foo: date });
            var json = observable.toJSON();
            var fields = [];

            for (var field in json) {
                fields.push(field);
            }

            assert.equal(fields.length, 1);
            assert.equal(json.foo, date);
        });

        it("set uses the nested observable object set method", function() {
            var observable = kendo.observable({ foo: "bar", baz: { moo: "moo" } }),
                set = stub(observable.baz, "set");

            observable.set("baz.moo", "42");
            assert.equal(set.calls("set"), 1);
        });

        it("set uses the nested array with observable objects", function() {
            var observable = kendo.observable({ foo: "bar", baz: [{ moo: "moo" }] }),
                set = stub(observable.baz[0], "set");

            observable.set("baz[0].moo", "42");
            assert.equal(set.calls("set"), 1);
        });

        it("set object is wrapped", function() {
            var observable = kendo.observable({ foo: {} });

            observable.set("foo", { bar: "baz" });

            assert.isOk(observable.foo instanceof kendo.data.ObservableObject);
        });

        it("change event is raised if wrapped object is modified", function() {
            var observable = kendo.observable({ foo: {} });

            observable.set("foo", { bar: "baz" });

            observable.bind("change", function() {
                assert.isOk(true);
            });

            observable.foo.set("bar", "moo");
        });

        it("ObservableObject are not wrapped if attached through set", function() {
            var observable = kendo.observable({ foo: {} });
            var nested = new kendo.data.ObservableObject({ bar: "baz" });
            observable.set("foo", nested);

            assert.strictEqual(observable.foo, nested);
        });

        it("change event is raised for wrapped ObservableObject", function() {
            var observable = kendo.observable({ foo: {} });
            var nested = new kendo.data.ObservableObject({ bar: "baz" });
            observable.set("foo", nested);

            observable.bind("change", function() {
                assert.isOk(true);
            });

            observable.foo.set("bar", "moo");
        });


        it("set Array is wrapped", function() {
            var observable = kendo.observable({ foo: [] });

            observable.set("foo", [1, 2, 3]);

            assert.isOk(observable.foo instanceof kendo.data.ObservableArray);
        });

        it("change event is raised if wrapped array is modified", function() {
            var observable = kendo.observable({ foo: [] });

            observable.set("foo", []);

            observable.bind("change", function() {
                assert.isOk(true);
            });

            observable.foo.push(1);
        });

        it("DataSource is not wrapped if set as ViewModel property", function() {
            var observable = kendo.observable({ dataSource: new kendo.data.DataSource() });

            assert.isOk(!(observable.dataSource instanceof kendo.data.ObservableObject))
        });

        it("ObservableArray is not wrapped if set as ViewModel property", function() {
            var observable = kendo.observable({ items: new kendo.data.ObservableArray([1, 2, 3, 4, 5]) });

            assert.isOk(observable.items instanceof kendo.data.ObservableArray)
        });

        it("listen for changes of ObservableArray set as ViewModel property", function() {
            var observable = kendo.observable({ items: new kendo.data.ObservableArray([1, 2, 3, 4, 5]) });

            observable.bind("change", function() { assert.isOk(true); });

            observable.get("items").push(6);
        });

        it("parent returns the parent observable object", function() {
            var observable = kendo.observable({
                foo: {
                }
            });

            assert.strictEqual(observable.foo.parent(), observable);
        });

        it("parent returns the parent observable array", function() {
            var observable = kendo.observable({
                foo: [{}]
            });

            assert.strictEqual(observable.foo[0].parent(), observable.foo);
        });

        it("parent returns the parent of the observable array", function() {
            var observable = kendo.observable({
                foo: [{}]
            });

            assert.strictEqual(observable.foo.parent(), observable);
        });

        it("parent returns undefined for root observable object", function() {
            assert.strictEqual(kendo.observable({}).parent(), undefined);
        });

        it("setting object sets its parent", function() {
            var observable = kendo.observable({});
            observable.set("foo", { bar: "baz" });

            assert.strictEqual(observable.foo.parent(), observable);
        });

        it("datasource change event propagates to parent", function() {
            var observable = new kendo.observable({
                dataSource: new kendo.data.DataSource()
            });

            observable.bind("change", function(e) {
                assert.equal(e.action, "add");
            });

            observable.dataSource.add({});
        });

        it("change events fire from top to bottom", function() {
            var observable = kendo.observable({
                foo: {
                    bar: {
                        baz: ""
                    }
                }
            });

            observable.bind("change", function(e) {
                assert.equal(e.field, "foo.bar.baz");
            });

            observable.foo.bind("change", function(e) {
                assert.equal(e.field, "bar.baz");
            });

            observable.foo.bar.bind("change", function(e) {
                assert.equal(e.field, "baz");
            });

            observable.set("foo.bar.baz", "baz");
        });


        it("change event bubbles to top", function() {
            var observable = kendo.observable({
                foo: [
                    { bar: "bar" }
                ]
            });

            var expected = ["foo", "foo[0].bar"];

            observable.bind("change", function(e) {
                assert.equal(e.field, expected.shift());
            });

            observable.set("foo[0].bar", "foo");
        });

        it("undefined is not wrapped", function() {
            var observable = new kendo.observable({
                empty: undefined
            });

            assert.isOk(!(observable.get("empty") instanceof kendo.data.ObservableObject));
        });

    });
}());
