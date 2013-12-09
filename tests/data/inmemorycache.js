(function(){

var Cache =  kendo.data.Cache,
    cache;

Cache.prototype.length = function() {
    var count = 0;
    for(key in this._store) {
        count++;
    }
    return count;
}

module("InMemoryCache", {
    setup: function() {
        cache = new Cache()
    }
});

test("find item with given key", function() {
    var item = { bar: "baz" };
    cache.add("foo", item);
    equal(cache.find("foo").bar, "baz");
});

test("add item with given key", function() {
    var item = { bar: "baz" };

    cache.add("foo", item);
    equal(cache.find("foo").bar, "baz");
});

test("clear removes all items", function() {
    var item = { bar: "baz" };
    cache.add("foo", item);
    cache.add("bar", item);
    cache.clear();
    equal(cache.length(), 0);
});

test("add overrides previous item with same key", function() {
    cache.add("foo", { foo: "bar" });
    cache.add("foo", { moo: "baz" });

    equal(cache.length(), 1);
    equal(cache.find("foo").moo, "baz");
});

test("find return undefined if item does not exists", function() {
    equal(cache.find("nonExisiting"), undefined);
});

test("add does not add item if key is undefined", function() {
    cache.add();
    equal(cache.length(), 0);
});

test("remove item with given key", function() {
    cache.add("foo", { foo: 1});
    cache.remove("foo");
    equal(cache.find("foo"), undefined);
});

test("length returns number of the items in the cache", function() {
    cache.add("foo", { foo: 1});
    cache.add("bar", { foo: 1});
    cache.add("baz", { foo: 1});
    cache.add("moo", { foo: 1});
    equal(cache.length(), 4);
});

test("add key can be object", function() {
    cache.add({ foo: 1}, 1);
    cache.add({ foo: 2}, 2);
    equal(cache.find({ foo: 1 }), 1);
    equal(cache.find({ foo: 2 }), 2);
});

}());
