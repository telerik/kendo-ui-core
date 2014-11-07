(function() {
    var draw = kendo.drawing;
    var util = kendo.util;

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

        test("retrieves type by type (case insensitive registration)", function() {
            factory = new draw.AnimationFactory();
            factory.register("FOO", FooAnimation);

            ok(factory.create(null, {
                type: "foo"
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

    // ------------------------------------------------------------
    (function() {
        var animation;

        module("Animation", {
            setup: function() {
                animation = new draw.Animation(null, { duration: 0 });
            },
            teardown: function() {
                animation.destroy();
            }
        });

        test("sets element", function() {
            var element = {};
            animation = new draw.Animation(element);

            equal(animation.element, element);
        });

        test("sets options", function() {
            animation = new draw.Animation(null, {
                foo: true
            });

            ok(animation.options.foo);
        });

        test("play calls step", function() {
            animation.step = function() {
                ok(true);
            };

            animation.play();
        });

        test("step is called with pos = 1 if duration is 0", function() {
            animation.step = function(pos) {
                equal(pos, 1);
            };

            animation.play();
        });

        asyncTest("aborting stops animation", 0, function() {
            animation = new draw.Animation(null, { duration: 10 });
            animation.step = function() {
                ok(false);
            };

            animation.play();
            animation.abort();

            setTimeout(function() {
                start();
            }, 0);
        });

        asyncTest("applies delay", function() {
            var delay = 30;
            animation = new draw.Animation(null, { duration: 10, delay: delay });

            var now = util.now();
            animation.step = function() {
                ok(util.now() - now >= delay);
                start();
                animation.abort();
            };

            animation.play();
        });

        test("destroy aborts animation", function() {
            animation.abort = function() { ok(true); };
            animation.destroy();
        });
    })();
})();
