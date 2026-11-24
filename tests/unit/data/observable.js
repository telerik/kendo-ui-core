import '@progress/kendo-ui/src/kendo.data.js';
import '@progress/kendo-ui/src/kendo.binder.js';

"use strict";

describe("Observable wrapped keys", function() {

    it("wraps all keys", function() {
        let observable = kendo.observable({ key: "1", _key: "2" });

        let wrappedKeys = Object.keys(observable);

        assert.isOk(wrappedKeys.indexOf("key") > 0);
        assert.isOk(wrappedKeys.indexOf("_key") > 0);
    });

    it("wraps all non-enumerable keys", function() {
        let object = { _key: "2" };

        Object.defineProperty(object, 'key', {
            value: 1,
            enumerable: false
        });

        let observable = kendo.observable(object);
        let wrappedKeys = Object.keys(observable);

        assert.isOk(wrappedKeys.indexOf("key") > 0);
        assert.isOk(wrappedKeys.indexOf("_key") > 0);
    });

    it("wraps all non-enumerable keys in a class", function() {
        let object = function() {
            this._key = "2";
        };

        Object.defineProperty(object.prototype, 'key', {
            value: 1,
            enumerable: false
        });

        let observable = kendo.observable(new object());
        let wrappedKeys = Object.keys(observable);

        assert.isOk(wrappedKeys.indexOf("key") > 0);
        assert.isOk(wrappedKeys.indexOf("_key") > 0);
    });

    it("excludes Object keys from the wrapped ones", function() {
        let object = {};
        let observable = kendo.observable(object);
        let wrappedKeys = Object.keys(observable);

        // There are 3 injected properties from the ObservableObject
        assert.isOk(wrappedKeys.length === 3);
    });

    it("observable works with undefined or null", function() {
        let object = null;
        let observable = kendo.observable(object);
        let wrappedKeys = Object.keys(observable);

        // There are 3 injected properties from the ObservableObject
        assert.isOk(wrappedKeys.length === 3);
    });

    it("observable preserves toString methods when declared", function() {
        function Hero(name) {
            this.name = name;
        }

        Hero.prototype = {
            toString: function() {
                return this.name;
            }
        };

        let observable = kendo.observable(new Hero("Hero"));
        let wrappedKeys = Object.keys(observable);

        assert.equal(wrappedKeys.length, 5);
        assert.isOk(observable.hasOwnProperty("toString"));
    });

    it("observable preserves toString methods when declared in a Class", function() {
        class Hero {
            constructor(name) {
                this.name = name;
            }

            toString() {
                return "city" + this.name;
            }
        }

        let observable = kendo.observable(new Hero("Hero"));
        let wrappedKeys = Object.keys(observable);

        assert.equal(wrappedKeys.length, 6); // includes the contructor prop as part of the prototype
        assert.isOk(observable.hasOwnProperty("toString"));
    });

    it("shouldSerialize honors per-field function serialization options", function() {
        let observable = kendo.observable({
            name: "Jane",
            formatter: function() { return "x"; }
        });

        assert.isTrue(observable.shouldSerialize("formatter", { formatter: true }));
        assert.isFalse(observable.shouldSerialize("formatter", { formatter: false }));
    });

    it("forEach iterates serializable fields", function() {
        let observable = kendo.observable({
            name: "Jane",
            age: 30
        });
        let fields = [];

        observable.forEach(function(value, field) {
            fields.push(field);
        });

        assert.deepEqual(fields.sort(), ["age", "name"]);
    });

    it("get returns the observable itself for this", function() {
        let observable = kendo.observable({ name: "Jane" });

        assert.strictEqual(observable.get("this"), observable);
    });

    it("set wraps plain objects as observable objects", function() {
        let observable = kendo.observable({ item: null });

        observable.set("item", { name: "Jane" });

        assert.isOk(observable.get("item") instanceof kendo.data.ObservableObject);
    });
});
