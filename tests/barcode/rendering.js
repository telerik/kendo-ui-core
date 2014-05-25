(function() {
    var barcode;
    var view;
    var encodingStub;
    var dataviz = kendo.dataviz;
    var Barcode = dataviz.ui.Barcode;

    var EncodingStub = function(pattern) {
        this.encode = function(value, width, height) {
            this.value = value;
            this.width = width;
            this.height = height;
            return {
                pattern: pattern,
                baseUnit: 3
            };
        };
    };

    function createBarcode(options, encoding) {
        QUnit.fixture.html("<div id='container'></div>")

        $("#container").kendoBarcode(options);

        barcode = $("#container").data("kendoBarcode");

        view = new ViewStub();
        view.options = {};
        view.renderTo = function() {};

        barcode.view =  view;
        if (encoding) {
            barcode.encoding = encodingStub = encoding;
        }

        barcode.redraw();
    }

    function teardown() {
        kendo.destroy(QUnit.fixture);
    }

    (function() {
        var background;

        module("rendering / background", {
            setup: function() {
                createBarcode({
                    width: 200,
                    height: 100,
                    background: "red",
                    border: {
                        width: 2,
                        color: "blue",
                        dashType: "dots"
                    }
                });
                background = view.log.rect[0];
            },
            teardown: teardown
        });

        test("renders background", function() {
            ok(background);
        });

        test("renders background with specified width and height without half border", function() {
            equal(background.x1, 1);
            equal(background.x2, 199);
            equal(background.y1, 1);
            equal(background.y2, 99);
        });

        test("sets color", function() {
            equal(background.style.fill, "red");
        });

        test("sets border color", function() {
            equal(background.style.stroke, "blue");
        });

        test("sets border width", function() {
            equal(background.style.strokeWidth, 2);
        });

        test("sets border dashType", function() {
            equal(background.style.dashType, "dots");
        });

    })();

    (function() {
        var textHeight = dataviz.measureText("foo", {font: SANS12}).height;
        var barHeight = 100 - 14 - (textHeight + 10);
        var bars;

        module("rendering / bars", {
            setup: function() {
                encodingStub = new EncodingStub([3, 4, {
                    width: 3
                }, {
                    width: 2,
                    y1: 5,
                    y2: 20
                }]);

                createBarcode({
                    type: "code128",
                    value: "foo",
                    width: 200,
                    height: 100,
                    color: "red",
                    padding: {
                        top: 5,
                        bottom: 5,
                        left: 10,
                        right: 10
                    },
                    border: {
                        width: 2
                    },
                    text: {
                        visible: true,
                        font: SANS12,
                        margin: 5
                    }
                }, encodingStub);
                bars = view.log.rect.slice(1);
            },
            teardown: teardown
        });

        test("passes width without padding and border to encoding", function() {
            equal(encodingStub.width, 176);
        });

        test("passes height without padding, border and text box height to encoding", function() {
            equal(encodingStub.height, barHeight);
        });

        test("does not render white bars", 2, function() {
            for (var i = 0; i < bars.length; i++) {
                equal(bars[i].style.fill, "red");
            }
        });

        test("bars are rendered in content box with white bars width added to position", function() {
            equal(bars[0].x1, 21);
            equal(bars[0].x2, 33);
        });

        test("pattern width is taken from width field if pattern is an object", function() {
            equal(bars[1].x1, 42);
            equal(bars[1].x2, 48);
        });

        test("bars start vertically after padding and border", function() {
            equal(bars[0].y1, 7);
            equal(bars[0].y2, 7 + barHeight);
        });

        test("y1 and y2 positions are taken from pattern if pattern is an object", function() {
            equal(bars[1].y1, 12);
            equal(bars[1].y2, 27);
        });

    })();

    (function() {
        var textSize = dataviz.measureText("foo", {font: SANS12});
        var text;

        function createBarcodeWithText(options) {
            createBarcode($.extend({
                type: "code128",
                width: 200,
                height: 100,
                value: "foo",
                text: {
                    visible: true,
                    font: SANS12,
                    margin: 5,
                    color: "red"
                }
            }, options));
            text = view.log.text[0];
        }

        module("rendering / text", {
            setup: function() {},
            teardown: teardown
        });

        test("renders text", function() {
            createBarcodeWithText();
            ok(text);
        });

        test("does not render text if visible is set to false", function() {
            createBarcodeWithText({
                text: {
                    visible: false
                }
            });
            equal(view.log.text.length, 0);
        });

        test("sets text to value", function() {
            createBarcodeWithText();
            equal(text.content, "foo");
        });

        test("adds checksum to text if checksum is set to true and encoding has checksum", function() {
            createBarcodeWithText({
                checksum: true
            });

            equal(text.content, "foo 54");
        });

        test("does not change text value if checksum is set to true and encoding has no checksum", function() {
            createBarcodeWithText({
                value: "FOO",
                type: "code39",
                checksum: true
            });

            equal(text.content, "FOO");
        });

        test("sets text color", function() {
            createBarcodeWithText();
            equal(text.style.color, "red");
        });

        test("sets text font", function() {
            createBarcodeWithText();
            equal(text.style.font, SANS12);
        });
    })();
})();