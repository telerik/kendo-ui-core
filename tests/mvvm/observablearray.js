(function() {

    describe("mvvm observable array", function() {

        it("pushing items to array raises the change event", function() {
            expect(1);

            var viewModel = kendo.observable({ foo: [{}] });

            viewModel.foo.bind("change", function() {
                assert.isOk(true, "change is raised");
            });

            viewModel.foo.push({});
        });

        it("pushing items to array raises the change event", function() {
            expect(1);

            var viewModel = kendo.observable({ foo: [{}] });

            viewModel.foo.bind("change", function() {
                assert.isOk(true, "change is raised");
            });

            viewModel.foo.push({});
        });

        it("items pushed to observable array are converted to observable objects", function() {
            var viewModel = kendo.observable({ foo: [] });
            viewModel.foo.push({});

            assert.isOk(viewModel.foo[0] instanceof kendo.data.ObservableObject);
        });

        it("Object should be wrapped", function() {
            var MyClass = kendo.Class.extend({});

            var viewModel = kendo.observable({ foo: [new MyClass()] });

            assert.isOk(viewModel.foo[0] instanceof kendo.data.ObservableObject);
        });

        it("ObservableObjects should be converted if type is set", function() {
            var ModelType = kendo.data.Model.define({});

            var array = new kendo.data.ObservableArray([new kendo.data.ObservableObject({})], ModelType);

            assert.isOk(array[0] instanceof kendo.data.ObservableObject);
            assert.isOk(array[0] instanceof ModelType);
        });

        it("pushing items to array raises the change event and sets the action to add", function() {
            expect(1);

            var viewModel = kendo.observable({ foo: [{}] });

            viewModel.foo.bind("change", function(e) {
                assert.equal(e.action, "add");
            });

            viewModel.foo.push({});
        });

        it("pushing items to array raises the change event and sets the index", function() {
            expect(1);

            var viewModel = kendo.observable({ foo: [{}] });

            viewModel.foo.bind("change", function(e) {
                assert.equal(e.index, 1)
            });

            viewModel.foo.push({});
        });

        it("pushing items to array raises the change event and provides the added items", function() {
            expect(1);

            var viewModel = kendo.observable({ foo: [{}] });

            viewModel.foo.bind("change", function(e) {
                assert.equal(e.items.length, 1)
            });

            viewModel.foo.push({});
        });

        it("unshifting items to array raises the change event", function() {
            expect(3);

            var viewModel = kendo.observable({ foo: [] });

            viewModel.foo.bind("change", function(e) {
                assert.equal(e.action, "add");
                assert.equal(e.index, 0);
                assert.equal(e.items.length, 1);
            });

            viewModel.foo.unshift({});
        });

        it("items unshifted to array are converted to observable objects", function() {
            var viewModel = kendo.observable({ foo: [] });

            viewModel.foo.bind("change", function(e) {
                assert.isOk(e.items[0] instanceof kendo.data.ObservableObject, "Should be ObservableObject");
            });

            viewModel.foo.unshift({});
        });

        it("items spliced to array items are converted to observable objects", function() {
            var viewModel = kendo.observable({ foo: [] });

            viewModel.foo.bind("change", function(e) {
                assert.isOk(e.items[0] instanceof kendo.data.ObservableObject, "Should be ObservableObject");
            });

            viewModel.foo.splice(0, 0, {});

            assert.isOk(viewModel.foo[0] instanceof kendo.data.ObservableObject, "Should be ObservableObject");
        });

        it("splicing array items raises the change event with remove action", function() {
            expect(1);

            var viewModel = kendo.observable({ foo: [{}] });

            viewModel.foo.bind("change", function(e) {
                assert.equal(e.action, "remove");
            });

            viewModel.foo.splice(0, 1);
        });

        it("splicing array items raises the change event and provides index", function() {
            expect(1);

            var viewModel = kendo.observable({ foo: [{}] });

            viewModel.foo.bind("change", function(e) {
                assert.equal(e.index, 0);
            });

            viewModel.foo.splice(0, 1);
        });

        it("splicing array items raises the change event and provides the removed items", function() {
            expect(1);

            var viewModel = kendo.observable({ foo: [{}] });

            viewModel.foo.bind("change", function(e) {
                assert.equal(e.items.length, 1);
            });

            viewModel.foo.splice(0, 1);
        });

        it("splicing array items returns the removed items", function() {
            var viewModel = kendo.observable({ foo: [{}] });

            assert.equal(viewModel.foo.splice(0, 1).length, 1);
        });

        it("splicing array items raises the change event with add action", function() {
            expect(1);

            var viewModel = kendo.observable({ foo: [] });

            viewModel.foo.bind("change", function(e) {
                assert.equal(e.action, "add");
            });

            viewModel.foo.splice(0, 1, {});
        });

        it("splicing array items raises the change event and sends the index and inserted items", function() {
            expect(2);

            var viewModel = kendo.observable({ foo: [] });

            viewModel.foo.bind("change", function(e) {
                assert.equal(e.index, 0);
                assert.equal(e.items.length, 1);
            });

            viewModel.foo.splice(0, 1, {});
        });

        it("observable array items are observable", function() {
            var viewModel = kendo.observable({ foo: [{}] });
            assert.isOk(viewModel.foo[0].bind);
        });

        it("change event is raised when child an item changes", function() {
            var viewModel = kendo.observable({ foo: [{}] });

            viewModel.foo.bind("change", function(e) {
                assert.equal(e.items[0], viewModel.foo[0]);
                assert.equal(e.action, "itemchange");
                assert.equal(e.field, "bar");
            });

            viewModel.foo[0].set("bar", "baz");
        });

        it("indexOf return index of the item", function() {
            var viewModel = kendo.observable({ foo: [{ bar: 1 }] });

            assert.equal(viewModel.foo.indexOf(viewModel.foo[0]), 0);
        });

        it("indexOf return -1 if item does not exists", function() {
            var viewModel = kendo.observable({ foo: [{ bar: 1 }] });

            assert.equal(viewModel.foo.indexOf({ bar: 42 }), -1);
        });

        it("pop raises the change event and removes the last item", function() {
            var viewModel = kendo.observable({ foo: [{ bar: 1 }] });
            var last = viewModel.foo[0];


            viewModel.foo.bind("change", function(e) {
                assert.equal(e.items[0], last);
                assert.equal(e.index, 0);
            });

            viewModel.foo.pop();
        });

        it("pop raises the change event and action is remove", function() {
            var viewModel = kendo.observable({ foo: [{ bar: 1 }] });

            viewModel.foo.bind("change", function(e) {
                assert.equal(e.action, "remove");
            });

            viewModel.foo.pop();
        });

        it("shift raises the change event and removes the first item", function() {
            var viewModel = kendo.observable({ foo: [{ bar: 1 }, { bar: 2 }] });
            var first = viewModel.foo[0];


            viewModel.foo.bind("change", function(e) {
                assert.equal(e.items[0], first);
                assert.equal(e.index, 0);
            });

            viewModel.foo.shift();
        });

        it("shift raises the change event and action is remove", function() {
            var viewModel = kendo.observable({ foo: [{ bar: 1 }] });

            viewModel.foo.bind("change", function(e) {
                assert.equal(e.action, "remove");
            });

            viewModel.foo.shift();
        });

        it("shift does not raise the change event when the array is empty", function() {
            var viewModel = kendo.observable({ foo: [] });

            viewModel.foo.bind("change", function(e) {
                assert.isOk(false, "Should not raise the change event when empty");
            });

            viewModel.foo.shift();
        });

        it("pop does not raise the change event when the array is empty", function() {
            var viewModel = kendo.observable({ foo: [] });

            viewModel.foo.bind("change", function(e) {
                assert.isOk(false, "Should not raise the change event when empty");
            });

            viewModel.foo.pop();
        });

        it("private fields are not included in JSON serialization", function() {
            var viewModel = kendo.observable({ foo: [1] });

            assert.equal(kendo.stringify(viewModel.foo), "[1]");
        });

        it("parent returns undefined for new observable array", function() {
            assert.strictEqual((new kendo.data.ObservableArray([])).parent(), undefined);
        });

        it("adding item to nested array triggers change event of the parent", function() {
            var viewModel = kendo.observable({
                foo: [{
                    bar: { items: [] }
                }]
            });

            viewModel.get("foo").bind("change", function(e) {
                assert.equal(e.action, "itemchange");
            });

            viewModel.get("foo")[0].bar.items.push({ baz: "moo" });
        });

        it("forEach calls callback for each item", function() {
            var viewModel = kendo.observable({ foo: ["foo"] });

            viewModel.foo.forEach(function(value, index, item) {
                assert.equal(value, "foo");
                assert.strictEqual(index, 0);
                assert.equal(item, viewModel.foo);
            });
        });

        it("map collects returned results from iteration", function() {
            var viewModel = kendo.observable({ foo: [2, 4] });

            var result = viewModel.get("foo").map(function(value) {
                return value * 2;
            });

            assert.equal(result[0], 4);
            assert.equal(result[1], 8);
        });

        it("filter collects returned results from iteration", function() {
            var viewModel = kendo.observable({ foo: [2, 3, 4] });

            var result = viewModel.get("foo").filter(function(value) {
                return value % 2 === 0;
            });

            assert.equal(result[0], 2);
            assert.equal(result[1], 4);
        });

        it("find returns the first item that matches the requirements", function() {
            var viewModel = kendo.observable({ foo: [2, 3, 4] });

            var result = viewModel.get("foo").find(function(value) {
                return value % 2 === 1;
            });

            assert.equal(result, 3);
        });

        it("every returns true if all items satisfy the provided requirement", function() {
            var viewModel = kendo.observable({ foo: [2, 4] });

            var result = viewModel.get("foo").every(function(value) {
                return value % 2 === 0;
            });

            assert.isOk(result);
        });

        it("every returns false if one item does not satisfy the provided requirement", function() {
            var viewModel = kendo.observable({ foo: [2, 3, 4] });

            var result = viewModel.get("foo").every(function(value) {
                return value % 2 === 0;
            });

            assert.isOk(!result);
        });

        it("some returns true if some items satisfy the provided requirement", function() {
            var viewModel = kendo.observable({ foo: [2, 4] });

            var result = viewModel.get("foo").some(function(value) {
                return value % 2 === 0;
            });

            assert.isOk(result);
        });

        it("some returns false if no items satisfy the provided requirement", function() {
            var viewModel = kendo.observable({ foo: [3, 5] });

            var result = viewModel.get("foo").some(function(value) {
                return value % 2 === 0;
            });

            assert.isOk(!result);
        });

        it("remove removes the given item", function() {
            var viewModel = kendo.observable({ foo: [3, 5] });

            viewModel.foo.remove(3);

            assert.equal(viewModel.foo.length, 1);
            assert.equal(viewModel.foo[0], 5);
        });

        it("remove only removes if the item exists", function() {
            var viewModel = kendo.observable({ foo: [3, 5] });

            viewModel.foo.remove(4);

            assert.equal(viewModel.foo.length, 2);
            assert.equal(viewModel.foo[0], 3);
            assert.equal(viewModel.foo[1], 5);
        });

        it("empty removes all items", function() {
            var viewModel = kendo.observable({ foo: [3, 5] });

            viewModel.foo.empty();

            assert.equal(viewModel.foo.length, 0);
        });

    });
}());
