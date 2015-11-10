(function() {
    var animate = kendo.animate,
        transforms = kendo.support.transforms,
        matrix3dRegExp = /matrix3?d?\s*\(.*,\s*([\d\.\-]+)\w*?,\s*([\d\.\-]+)\w*?,\s*([\d\.\-]+)\w*?,\s*([\d\.\-]+)\w*?/i,
        translateXRegExp = /translatex?$/i,
        TRANSFORM = kendo.support.transforms.css + "transform",
        span;

    function animationProperty(element, property) {
        if (transforms) {
            var transform = element.css(TRANSFORM);
            if (transform == "none") {
                return property == "scale" ? 1 : 0;
            }

            var match = transform.match(new RegExp(property + "\\s*\\(([\\d\\w\\.]+)")),
                computed = 0;

            if (match) {
                computed = parseInt(match[1], 10);
            } else {
                match = transform.match(matrix3dRegExp) || [0, 0, 0, 0, 0];
                property = property.toLowerCase();

                if (translateXRegExp.test(property)) {
                    computed = parseFloat(match[3] / match[2]);
                } else if (property == "translatey") {
                    computed = parseFloat(match[4] / match[2]);
                } else if (property == "scale") {
                    computed = parseFloat(match[2]);
                } else if (property == "rotate") {
                    computed = parseFloat(Math.atan2(match[2], match[1]));
                }
            }

            return computed;
        } else {
            return element.css(property);
        }
    }

    module("animate", {
        setup: function() {
            span = $("<span style='position: absolute; top: 0; left: 0; visibility: hidden;'>foo</span>").appendTo(document.body);
        },
        teardown: function() {
            span.remove();
        }
    });

    test("kendoStop calls callback", 1, function() {
        var span = kendo.jQuery("<span />");

        span.kendoAnimate({
            effects: "fadeOut",
            duration: 600,
            complete: function() {
                ok(true);
            }
        });

        span.kendoStop(true, true);
    });

    asyncTest("animate waits all effects to finish", function() {
        var fooFinished = false, barFinished = false;

        kendo.effects.createEffect("foo", {
            prepare: function() {
                fooFinished = true;
                return { start: {}, end: {} };
            }
        });

        kendo.effects.createEffect("bar", {
           prepare: function() {
                barFinished = true;
                return { start: {}, end: {} };
            }
        });

        animate(span, "foo bar", function() {
            ok(fooFinished);
            ok(barFinished);
            start();
        });
    });

    test("reverse method of the effect is called if reverse = true", 1, function() {
        kendo.effects.createEffect("foo", {
           prepare: function() {
               equal(this._reverse, true);
               return { start: {}, end: {} };
           }
        });

        animate(span, "foo", true);
    });

    asyncTest("passing options to animate works", 2, function() {
        kendo.effects.createEffect("foo", {
           prepare: function() {
               equal(this._reverse, true);
                return { start: {}, end: {} };
            }
        });

        animate(span, {
            effects: { foo: {} },
            reverse: true,
            complete: function() {
                ok(true);
                start();
            }
        });
    });

    asyncTest("passing options to animate effects as string", 2, function() {
        kendo.effects.createEffect("foo", {
           prepare: function() {
                equal(this._reverse, true);
                return { start: {}, end: {} };
            }
        });

        animate(span, {
            reverse: true,
            complete: function() {
                ok(true);
                start();
            },
            effects: "foo"
        });
    });

    // legacy test, not sure why
    asyncTest("make sure css, setup, teardown and restore are called in sequence", 2, function() {
        span.css("overflow", "visible");

        kendo.effects.createEffect("foo", {
            restore: [ "overflow" ],

           prepare: function() {
                ok(this.element.data("overflow") == "visible");
                return { start: { overflow: "hidden" } };
            },

            teardown: function() {
                ok(this.element.css("overflow") == "visible");
                start();
            }
        });

        animate(span, "foo");
    });

    asyncTest("callback is fired asynchronously after animate", 1, function() {
        var called = false;

        kendo.effects.createEffect("moo", {
           prepare: function() {
                return { end: { translateX: "10px" } };
            }
        });

        span.kendoAnimate({
            effects: "moo",
            duration: 100,
            complete: function() {
                called = true;
                start();
            }
        });

        ok(!called);
    });

    if (!kendo.support.browser.mozilla) {
        asyncTest("Passing properties to the effect overrides the end state", 2, function() {
            var height = -1;

            kendo.effects.createEffect("foo", {
               prepare: function(start, end) {
                    start.height = 0;
                    start.display = "block";
                    end.height = 100;
                }
            });

            span.kendoAnimate({
                effects: { foo: { properties: { height: 20 } } },

                duration: 20,

                init: function () {
                    height = span.height();
                },

                complete: function() {
                    equal(height, 0);
                    equal(span.height(), 20);
                    start();
                }
            });
        });

        asyncTest("animating height from 0 to 100 results in 100px high element", 2, function() {
            var height = -1;

            kendo.effects.createEffect("foo", {
               prepare: function(start, end) {
                    start.height = 0;
                    start.display = "block";
                    end.height = 100;
                }
            });

            span.kendoAnimate({
                effects: "foo",
                duration: 20,
                init: function () {
                    height = span.height();
                },
                complete: function() {
                    equal(height, 0);
                    equal(span.height(), 100);
                    start();
                }
            });
        });

        asyncTest("fadeIn animates the opacity from 0 to 1", function() {
            span.css({ position: "absolute", display: "block" });

            var opacity = 5;

            span.kendoAnimate({
                effects: "fadeIn",
                duration: 10,
                init: function () {
                    opacity = span.css("opacity");
                },
                complete: function () {
                    ok(opacity === '0');
                    ok(span.css("opacity") == 1);
                    start();
                }
            });
        });

        asyncTest("fadeOut animates the opacity from 1 to 0", function() {
            span.css({ position: "absolute", display: "block" });

            kendo.effects.Fade.prototype.restore = [];

            span.kendoAnimate({
                effects: "fadeOut",
                duration: 10,
                complete: function () {
                    equal(span.css("opacity"), 0);
                    start();
                }
            });
        });

        if (!kendo.support.browser.msie) { // TODO: Write the IE part of this test.
            asyncTest("zoomIn animates the scale from 0.01 to 1", function() {
                span.css({ position: "absolute", display: "block" });

                var scale = 5;

                span.kendoAnimate({
                    effects: "zoomIn",
                    duration: 10,
                    init: function () {
                        scale = animationProperty(span, "scale");
                    },
                    complete: function () {
                        ok(scale == 0.01);
                        ok(animationProperty(span, "scale") == 1);
                        start();
                    }
                });
            });
        }

        asyncTest("slideIn:right moves the element right from - its width to 0", function() {
            span.css({ position: "absolute", display: "block", left: 10 });

            var position = 1;
            if (transforms) {
                span.css(TRANSFORM, "translateX(10px)");
            }

            span.kendoAnimate({
                effects: "slideIn:right",
                duration: 20,
                init: function () {
                    position = (transforms ? animationProperty(span, "translateX") : span.offset().left);
                },
                complete: function () {
                    ok(position == -span.width());
                    ok((transforms ? animationProperty(span, "translateX") : span.offset().left) === 0);
                    start();
                }
            });
        });

        asyncTest("slideIn:down moves the element down from - its height to 0", function() {
            span.css({ position: "absolute", display: "block", top: 10 });

            var position = 1;
            if (transforms) {
                span.css(TRANSFORM, "translateY(10px)");
            }

            span.kendoAnimate({
                effects: "slideIn:down",
                duration: 20,
                init: function () {
                    position = (transforms ? animationProperty(span, "translateY") : span.offset().top);
                },
                complete: function () {
                    ok(position == -span.height());
                    ok((transforms ? animationProperty(span, "translateY") : span.offset().top) === 0);
                    start();
                }
            });
        });

        asyncTest("expand:vertical expands the element from 0 to its height", function() {
            span.css({ position: "absolute", display: "block", height: 100 });
            var initialHeight = 100;

            span.kendoAnimate({
                effects: "expand:vertical",
                duration: 20,
                init: function () {
                    initialHeight = span.height();
                },
                complete: function () {
                    ok(initialHeight === 0);
                    ok(span.height() == 100);
                    start();
                }
            });
        });

        asyncTest("expand:horizontal expands the element from 0 to its width", function() {
            span.css({ position: "absolute", display: "block", width: 100, height: 100 });
            var initialWidth = 100;

            span.kendoAnimate({
                effects: "expand:horizontal",
                duration: 20,
                init: function () {
                    initialWidth = span.width();
                },
                complete: function () {
                    ok(initialWidth === 0);
                    ok(span.width() == 100);
                    start();
                }
            });
        });
    }

    module("animationFrame Animation", {});

    asyncTest("executes callbacks", 1, function() {
        var animation = kendo.effects.Animation.extend({
            counter: 0,
            tick: function() {
                this.counter ++;
            },

            onEnd: function() {
                start();
                equal(this.counter, 3);
            },

            done: function() {
                return this.counter === 3;
            }
        });

        new animation().start();
    });

    asyncTest("is cancellable", 1, function() {
        var animation = kendo.effects.Animation.extend({
            counter: 0,
            tick: function() {
                this.counter ++;
                if (this.counter === 2) {
                    this.cancel();
                }
            },

            onCancel: function() {
                start();
                equal(this.counter, 2);
            },

            onEnd: function() {
                ok(false);
            },

            done: function() {
                return this.counter === 3;
            }
        });

        new animation().start();
    });
})();
