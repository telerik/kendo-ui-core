(function() {
    var draw = kendo.drawing;

    // ------------------------------------------------------------
    (function() {
        var FooAnimation = kendo.Class.extend({
            init: function(element, options) {
                this.element = element;
                this.options = options;
            }
        });

        var factory;
        module("AnimationFactory", {
            setup: function() {
                factory = new draw.AnimationFactory();
                factory.register("foo", FooAnimation);
            }
        });

        test("retrieves type by type", function() {
            ok(factory.create(null, {
                type: "foo"
            }) instanceof FooAnimation);
        });

        test("retrieves type by type (case insensitive)", function() {
            ok(factory.create(null, {
                type: "FOO"
            }) instanceof FooAnimation);
        });

        test("returns undefined for unknown type", function() {
            equal(factory.create(null, {
                type: "bar"
            }), undefined);
        });

        test("sets element", function() {
            var element = {};
            var anim = factory.create(element, {
                type: "foo"
            });

            equal(anim.element, element);
        });

        test("sets options", function() {
            var anim = factory.create(null, {
                type: "foo",
                foo: true
            });

            equal(anim.options.foo, true)
        });
    })();
})();
