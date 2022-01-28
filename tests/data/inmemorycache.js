(function() {

    var Cache = kendo.data.Cache,
        cache;

    Cache.prototype.length = function() {
        var count = 0;
        for (key in this._store) {
            count++;
        }
        return count;
    }

    describe("InMemoryCache", function() {
        beforeEach(function() {
            cache = new Cache()
        });

        it("find item with given key", function() {
            var item = { bar: "baz" };
            cache.add("foo", item);
            assert.equal(cache.find("foo").bar, "baz");
        });

        it("add item with given key", function() {
            var item = { bar: "baz" };

            cache.add("foo", item);
            assert.equal(cache.find("foo").bar, "baz");
        });

        it("clear removes all items", function() {
            var item = { bar: "baz" };
            cache.add("foo", item);
            cache.add("bar", item);
            cache.clear();
            assert.equal(cache.length(), 0);
        });

        it("add overrides previous item with same key", function() {
            cache.add("foo", { foo: "bar" });
            cache.add("foo", { moo: "baz" });

            assert.equal(cache.length(), 1);
            assert.equal(cache.find("foo").moo, "baz");
        });

        it("find return undefined if item does not exists", function() {
            assert.equal(cache.find("nonExisiting"), undefined);
        });

        it("add does not add item if key is undefined", function() {
            cache.add();
            assert.equal(cache.length(), 0);
        });

        it("remove item with given key", function() {
            cache.add("foo", { foo: 1 });
            cache.remove("foo");
            assert.equal(cache.find("foo"), undefined);
        });

        it("length returns number of the items in the cache", function() {
            cache.add("foo", { foo: 1 });
            cache.add("bar", { foo: 1 });
            cache.add("baz", { foo: 1 });
            cache.add("moo", { foo: 1 });
            assert.equal(cache.length(), 4);
        });

        it("add key can be object", function() {
            cache.add({ foo: 1 }, 1);
            cache.add({ foo: 2 }, 2);
            assert.equal(cache.find({ foo: 1 }), 1);
            assert.equal(cache.find({ foo: 2 }), 2);
        });

    });
}());
