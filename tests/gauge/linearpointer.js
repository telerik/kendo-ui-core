(function(){
    var dataviz = kendo.dataviz;
    var Gauge = dataviz.ui.Gauge;
    var Box2D = dataviz.Box2D;
    var Point2D = dataviz.Point2D;
    var LinearPointer = dataviz.LinearPointer;
    var ArrowLinearPointer = dataviz.ArrowLinearPointer;
    var BarLinearPointer = dataviz.BarLinearPointer;
    var LinearScale;
    var pointer;
    var gaugeBox = new Box2D(0, 0, 300, 300);
    var DEFAULT_MARGIN = 5
    var TOLERANCE = 1.5 + DEFAULT_MARGIN;
    var view;

    LinearScale = dataviz.LinearScale.extend({
        options: {
            labels: {
                // Tests expect particular font size
                font: "16px Verdana, sans-serif"
            }
        }
    });

    function stubScale(min, max) {
        var scale = new LinearScale({
            min: min,
            max: max
        });

        scale.reflow(gaugeBox);
        return scale;
    }

    (function() {
        function createPointer(scale, options) {
            pointer = new LinearPointer(scale || stubScale(), options || {});
            pointer.reflow(gaugeBox);
        }

        module("Linear Pointer", {
            setup: function() {
                createPointer();
                this.font = dataviz.Text.fn.options.font;
                dataviz.Text.fn.options.font = "16px Verdana, sans-serif";
            },
            teardown: function() {
                dataviz.Text.fn.options.font = this.font;
            }
        });

        test("value() updates value", function() {
            pointer.value(10);

            equal(pointer.options.value, 10);
        });

        test("value() returns value", function() {
            pointer.options.value = 15;

            equal(pointer.value(), 15);
        });

        test("value() calls repaint()", function() {
            var called = false;

            pointer.elements = {};
            pointer.repaint = function() {
                called = true;
            };

            pointer.value(15);

            ok(called);
        });

        test("value() takes scale.min into account", function() {
            pointer.scale.options.min = -20;

            pointer.value(-21);

            equal(pointer.value(), -20);
        });

        test("value() takes scale.max into account", function() {
            pointer.scale.options.max = 20;

            pointer.value(21);

            equal(pointer.value(), 20);
        });

        test("initial pointer value is constrained within scale range", function() {
            createPointer(stubScale(-1, 11), {
                value: -2
            });

            equal(pointer.value(), -1);

            createPointer(stubScale(0, 11), {
                value: 12
            });

            equal(pointer.value(), 11);
        });

        test("value() takes scale.min into account", function() {
            createPointer(stubScale(-10, 50), { });

            equal(pointer.value(), -10);
        });
    })();


    (function() {
        var view;
        var track;

        function createArrowLinearPointer(scaleOptions, options) {
            var scale = new LinearScale(scaleOptions || {});
            scale.reflow(gaugeBox);

            pointer = new ArrowLinearPointer(scale, options || {});
            pointer.reflow();
        }

        function createBarLinearPointer(scaleOptions, options) {
            var scale = new LinearScale(scaleOptions || {});
            scale.reflow(gaugeBox);

            pointer = new BarLinearPointer(scale, options || {});
            pointer.reflow();
        }

        module("Linear Pointer / Shapes / Vertical", {
            setup: function() {
                this.font = dataviz.Text.fn.options.font;
                dataviz.Text.fn.options.font = "16px Verdana, sans-serif";
            },
            teardown: function() {
                dataviz.Text.fn.options.font = this.font;
            }
        });

        test("renders arrow shape at initial position", function() {
            createArrowLinearPointer({ vertical: true }, { shape: "arrow" });

            var points = pointer.pointerShape();
            var result = [];

            for (var i = 0, length = points.length; i < length; i++) {
                var point = points[i];
                result.push([point.x, point.y]);
            }
            arrayClose(result, [ [0, -4.5], [-9, 0], [0, 4.5] ], TOLERANCE);
        });

        test("renders arrow shape", function() {
            createArrowLinearPointer({ vertical: true }, { shape: "arrow" });
            var pointerElements = pointer.render();
            pointer.repaint();

            var origin = pointerElements.bbox().origin;
            arrayClose([origin.x, origin.y], [30.5, 289], TOLERANCE);
        });

        test("renders bar indicator shape", function() {
            createBarLinearPointer({ vertical: true });
            var pointerElements = pointer.render();
            pointer.repaint();

            var bbox = pointerElements.bbox();
            arrayClose([bbox.origin.x, bbox.origin.y, bbox.width(), bbox.height()], [47, 289, 5.5, 1], TOLERANCE);
        });

        module("Linear Pointer / Shapes / Horizontal", {
            setup: function() {
                this.font = dataviz.Text.fn.options.font;
                dataviz.Text.fn.options.font = "16px Verdana, sans-serif";
            },
            teardown: function() {
                dataviz.Text.fn.options.font = this.font;
            }
        });

        test("renders arrow shape", function() {
            createArrowLinearPointer({ vertical: false }, { shape: "arrow" });
            var pointerElements = pointer.render();
            pointer.repaint();

            var origin = pointerElements.bbox().origin;
            arrayClose([origin.x, origin.y], [2.5, -2.5], TOLERANCE);
        });

        test("renders bar indicator shape", function() {
            createBarLinearPointer({ vertical: false });
            var pointerElements = pointer.render();
            pointer.repaint();

            var bbox = pointerElements.bbox();
            arrayClose(
                [bbox.origin.x, bbox.origin.y, bbox.width(), bbox.height()],
                [7, -7.5, 5.5, 1], TOLERANCE
            );
        });

        module("Linear Pointer / track", {
            setup: function() {
                this.font = dataviz.Text.fn.options.font;
                dataviz.Text.fn.options.font = "16px Verdana, sans-serif";
                createPointer({}, {
                    track: {
                        color: "red",
                        border: {
                            width: 1,
                            color: "blue",
                            dashType: "dot",
                        },
                        opacity: 0.33,
                        visible: true
                    }
                });

                track = view.log.rect[1];
            },
            teardown: function() {
                dataviz.Text.fn.options.font = this.font;
            }
        });

        // test("renders background color", function() {
        //     ok(track.style.fill == "red");
        // });

        // test("renders opacity", function() {
        //     ok(track.style.fillOpacity == 0.33);
        // });

        // test("renders border", function() {
        //     ok(track.style.stroke == "blue");
        //     ok(track.style.strokeWidth == 1);
        //     ok(track.style.dashType == "dot");
        // });
    })();
}());
