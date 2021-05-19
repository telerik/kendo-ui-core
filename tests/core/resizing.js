(function() {

    var Widget = kendo.ui.Widget;

    var ResizableWidget = Widget.extend({
        init: function(element, options) {
            element.css({ width: "100%", height: "100%" });
            Widget.fn.init.call(this, element, options);
        },

        options: {
            name: "ResizableWidget"
        },

        getSize: function() {
            return kendo.dimensions(this.element);
        }
    });

    var widget, div;

    describe("resizable widget", function() {
        beforeEach(function() {
            kendo.ui.plugin(ResizableWidget);

            Mocha.fixture.css({
                position: "static",
                top: 0,
                left: 0,
                width: "500px",
                height: "400px"
            });

            div = $("<div />").appendTo(Mocha.fixture);

            widget = new ResizableWidget(div);
        });

        afterEach(function() {
            Mocha.fixture.css({
                position: "",
                top: "",
                left: "",
                width: "",
                height: ""
            });
            widget.destroy();
        });

        it("kendo.dimensions reads the size of the passed element", function() {
            div = $("<div style='width: 100%; height: 100%' />").appendTo(Mocha.fixture);
            var size = kendo.dimensions(div);

            assert.equal(size.width, 500);
            assert.equal(size.height, 400);
        });

        it("kendo.dimensions sets the size of the passed element", function() {
            div = $("<div style='width: 100%; height: 100%' />").appendTo(Mocha.fixture);

            var size = kendo.dimensions(div, { width: 300, height: 200 });

            assert.equal(size.width, 300);
            assert.equal(size.height, 200);
        });


        it("by default, size will return null", function() {
            widget.getSize = $.noop;
            var size = widget.size();
            assert.equal(size, null);
        });

        it("size reads the resizable container dimensions", function() {
            var size = widget.size();
            assert.equal(size.width, 500);
            assert.equal(size.height, 400);
        });

        it("calling resize will execute setSize with getSize result", function() {
            widget._resize = function(size) {
                assert.equal(size.width, 500);
                assert.equal(size.height, 400);
            }

            widget.resize();
        });

        it("resize caches the size value and ignores subsequent calls", function() {
            widget._resize = function(size) {
                assert.isOk(true);
            }

            widget.resize();
            widget.resize();
        });

        it("resize triggers resize event if needed", function() {
            widget.bind("resize", function() {
                assert.isOk(true);
            });

            widget.resize();
            widget.resize();
        });

        it("changing dimensions invalidates the caching", function() {
            widget._resize = function(size) {
                assert.isOk(true);
            }

            widget.resize();
            div.css({ width: "90%", height: "90%" });
            widget.resize();
        });

        it("kendo.resize resizes the given widget", function() {
            widget.bind("resize", function() {
                assert.isOk(true);
            });

            kendo.resize(Mocha.fixture);
        });

        it("kendo.resize resizes the given widget with force", function() {
            widget.resize = function(force) {
                assert.isOk(force);
            };

            kendo.resize(Mocha.fixture, true);
        });

        it("kendo.resize skips hidden widgets", function() {
            widget.bind("resize", function() {
                assert.isOk(false);
            });

            div.wrap("<div style='display: none' />");

            kendo.resize(Mocha.fixture);
        });

        it("hidden widgets do not execute the routine in their resize method", function() {
            widget.bind("resize", function() {
                assert.isOk(false);
            });

            div.wrap("<div style='display: none' />");

            widget.resize();
        });

        it("kendo.resize resizes nested widgets", function() {
            widget.bind("resize", function() {
                assert.isOk(true);
            });

            div.wrap("<div />");

            kendo.resize(Mocha.fixture);
        });

        it("resize passes force value to widget's internal _resize method", function() {
            widget._resize = function(size, force) {
                assert.isOk(force);
            }

            widget.resize(true);
        });

    });
}());
