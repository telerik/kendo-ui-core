(function() {
    "use strict";

    describe("Observable wrapped keys", function() {

        it("wraps all keys", function() {
            var observable = kendo.observable({ key: "1", _key: "2" });

            var wrappedKeys = Object.keys(observable);

            assert.isOk(wrappedKeys.indexOf("key") > 0);
            assert.isOk(wrappedKeys.indexOf("_key") > 0);
        });

        it("wraps all non-enumerable keys", function() {
            var object = { _key: "2" };

            Object.defineProperty(object, 'key', {
                value: 1,
                enumerable: false
            });

            var observable = kendo.observable(object);
            var wrappedKeys = Object.keys(observable);

            assert.isOk(wrappedKeys.indexOf("key") > 0);
            assert.isOk(wrappedKeys.indexOf("_key") > 0);
        });

        it("wraps all non-enumerable keys in a class", function() {
            var object = function() {
                this._key = "2";
            };

            Object.defineProperty(object.prototype, 'key', {
                value: 1,
                enumerable: false
            });

            var observable = kendo.observable(new object());
            var wrappedKeys = Object.keys(observable);

            assert.isOk(wrappedKeys.indexOf("key") > 0);
            assert.isOk(wrappedKeys.indexOf("_key") > 0);
        });

        it("excludes Object keys from the wrapped ones", function() {
            var object = {};
            var observable = kendo.observable(object);
            var wrappedKeys = Object.keys(observable);

            // There are 3 injected properties from the ObservableObject
            assert.isOk(wrappedKeys.length === 3);
        });

        it("observable works with undefined or null", function() {
            var object = null;
            var observable = kendo.observable(object);
            var wrappedKeys = Object.keys(observable);

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

            var observable = kendo.observable(new Hero("Hero"));
            var wrappedKeys = Object.keys(observable);

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

            var observable = kendo.observable(new Hero("Hero"));
            var wrappedKeys = Object.keys(observable);

            assert.equal(wrappedKeys.length, 6); // includes the contructor prop as part of the prototype
            assert.isOk(observable.hasOwnProperty("toString"));
        });
    });
}());