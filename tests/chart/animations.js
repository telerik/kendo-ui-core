(function() {
    var dataviz = kendo.dataviz,
        draw = kendo.drawing,
        geom = kendo.geometry,
        Box2D = dataviz.Box2D,
        Point2D = dataviz.Point2D,
        START_SCALE = 0.001;

    (function() {
        var SIZE = 100,
            anim,
            visual;

        function createAnim(options) {
            visual = draw.Path.fromRect(new geom.Rect([0, 0], [10, 10]));
            options = $.extend({
                    vertical: true,
                    origin: [0, 0],
                    duration: 50,
                    type: "bar"
                }, options);
            anim = draw.Animation.create(visual, options);
        }

        // ------------------------------------------------------------
        module("BarChartAnimation", {
            setup: function() {
                createAnim();
            }
        });

        test("setup aborts animation if visual has no bbox", function() {
            var anim = draw.Animation.create({
                bbox: $.noop
            }, {
                type: "bar"
            });
            anim.abort = function() {
                ok(true);
            };
            anim.setup();
        });

        test("setup collapses element (vertical bars)", function() {
            anim.setup();

            deepEqual(visual.transform().matrix(), new geom.Matrix(1, 0, 0, START_SCALE, 0, 0));
        });

        test("setup collapses element (horizontal bars)", function() {
            createAnim({vertical: false });
            anim.setup();

            deepEqual(visual.transform().matrix(), new geom.Matrix(START_SCALE, 0, 0, 1, 0, 0));
        });

        test("step transforms visual based on origin", function() {
            createAnim({ origin: [10, 20] })
            anim.setup();
            anim.step(0.5);
            deepEqual(visual.transform().matrix().toArray(),
                 [1, 0, 0, 0.5, 0, 10]);
        });

        asyncTest("cleans up transformation", function() {
            anim.setup();
            anim.play();
            setTimeout(function() {
                equal(visual.transform(), null);
                start();
            }, 100);
        });

    })();

    (function() {
        var anim,
            visual,
            center = new geom.Point(10, 10);

        function createAnim(opacity) {
            visual = new draw.Path({});
            anim = draw.Animation.create(visual, {
                type: "pie",
                center: center,
                duration: 50
            });
        }

        // ------------------------------------------------------------
        module("PieAnimation", {
            setup: function() {
                createAnim();
            }
        });

        test("setup scales to start scale around center", function() {
            anim.setup();
            ok(visual.transform().equals(geom.transform().scale(START_SCALE, START_SCALE, center)));
        });

        test("step scales based on progress", function() {
            anim.setup();
            anim.step(0.5);
            ok(visual.transform().equals(geom.transform().scale(0.5, 0.5, center)));
        });

        asyncTest("animates to scale 1", function() {
            anim.setup();
            anim.play();

            setTimeout(function() {
                ok(visual.transform().equals(geom.transform().scale(1, 1, center)));

                start();
            }, 100);
        });

    })();

    (function() {
        var anim,
            visual,
            center = new geom.Point(25, 30);

        function createAnim(opacity) {
            visual = draw.Path.fromRect(new geom.Rect([10, 10], [30, 40]));

            anim = draw.Animation.create(visual, {
                type: "bubble",
                duration: 50
            });
        }

        // ------------------------------------------------------------
        module("BubbleAnimation", {
            setup: function() {
                createAnim();
            }
        });

        test("setup scales to start scale around bbox center", function() {
            anim.setup();
            ok(visual.transform().equals(geom.transform().scale(START_SCALE, START_SCALE, center)));
        });

        test("step scales based on progress", function() {
            anim.setup();
            anim.step(0.5);
            ok(visual.transform().equals(geom.transform().scale(0.5, 0.5, center)));
        });

        asyncTest("animates to scale 1", function() {
            anim.setup();
            anim.play();

            setTimeout(function() {
                ok(visual.transform().equals(geom.transform().scale(1, 1, center)));

                start();
            }, 100);
        });

    })();

    (function() {
        var SIZE = 100,
            OPACITY = 0.5,
            anim,
            visual;

        function createAnim(opacity) {
            visual = new draw.Path({
                opacity: opacity
            });
            anim = draw.Animation.create(visual, {
                type: "fadeIn",
                duration: 50
            });
        }

        // ------------------------------------------------------------
        module("FadeInAnimation", {
            setup: function() {
                createAnim(OPACITY);
            }
        });

        test("setup sets opacity to 0", function() {
            anim.setup();
            equal(visual.opacity(), 0);
        });

        test("step sets opacity based on progress", function() {
            anim.setup();
            anim.step(0.5)
            equal(visual.opacity(), 0.5 * OPACITY);
        });

        asyncTest("animates opacity to initial opacity", function() {
            anim.setup();
            anim.play();

            setTimeout(function() {
                equal(visual.opacity(), OPACITY);

                start();
            }, 100);
        });
    })();
})();
