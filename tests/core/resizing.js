(function(){

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

module("resizable widget", {
    setup: function() {
        kendo.ui.plugin(ResizableWidget);

        QUnit.fixture.css({
            position: "static",
            top: 0,
            left: 0,
            width: "500px",
            height: "400px"
        });

        div = $("<div />").appendTo(QUnit.fixture);

        widget = new ResizableWidget(div);
    },

    teardown: function() {
        QUnit.fixture.css({
            position: "",
            top: "",
            left: "",
            width: "",
            height: ""
        });
        widget.destroy();
    }
});

test("kendo.dimensions reads the size of the passed element", 2, function() {
    div = $("<div style='width: 100%; height: 100%' />").appendTo(QUnit.fixture);
    var size = kendo.dimensions(div);

    equal(size.width, 500);
    equal(size.height, 400);
});

test("kendo.dimensions sets the size of the passed element", 2, function() {
    div = $("<div style='width: 100%; height: 100%' />").appendTo(QUnit.fixture);

    var size = kendo.dimensions(div, { width: 300, height: 200 });

    equal(size.width, 300);
    equal(size.height, 200);
});


test("by default, size will return null", 1, function() {
    widget.getSize = $.noop;
    var size = widget.size();
    equal(size, null);
});

test("size reads the resizable container dimensions", 2, function() {
    var size = widget.size();
    equal(size.width, 500);
    equal(size.height, 400);
});

test("calling resize will execute setSize with getSize result", 2, function() {
    widget._resize = function(size) {
        equal(size.width, 500);
        equal(size.height, 400);
    }

    widget.resize();
});

test("resize caches the size value and ignores subsequent calls", 1, function() {
    widget._resize = function(size) {
        ok(true);
    }

    widget.resize();
    widget.resize();
});

test("resize triggers resize event if needed", 1, function() {
    widget.bind("resize", function() {
        ok(true);
    });

    widget.resize();
    widget.resize();
});

test("changing dimensions invalidates the caching", 2, function() {
    widget._resize = function(size) {
        ok(true);
    }

    widget.resize();
    div.css({ width: "90%", height: "90%" });
    widget.resize();
});

test("kendo.resize resizes the given widget", 1, function() {
    widget.bind("resize", function() {
        ok(true);
    });

    kendo.resize(QUnit.fixture);
});

test("kendo.resize resizes the given widget with force", 1, function() {
    widget.resize = function(force) {
        ok(force);
    };

    kendo.resize(QUnit.fixture, true);
});

test("kendo.resize skips hidden widgets", 0, function() {
    widget.bind("resize", function() {
        ok(false);
    });

    div.wrap("<div style='display: none' />");

    kendo.resize(QUnit.fixture);
});

test("hidden widgets do not execute the routine in their resize method", 0, function () {
    widget.bind("resize", function () {
        ok(false);
    });

    div.wrap("<div style='display: none' />");

    widget.resize();
});

test("kendo.resize resizes nested widgets", 1, function() {
    widget.bind("resize", function() {
        ok(true);
    });

    div.wrap("<div />");

    kendo.resize(QUnit.fixture);
});

test("resize passes force value to widget's internal _resize method", 1, function () {
    widget._resize = function (size, force) {
        ok(force);
    }

    widget.resize(true);
});

}());
