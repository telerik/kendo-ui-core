(function() {
    module("FX utils", {
        teardown: function() {
        }
    });

    var box = kendo.effects.box;
    var transformOrigin = kendo.effects.transformOrigin;
    var fillScale = kendo.effects.fillScale;


    function createElement(top, left, width, height) {
        return $("<div style='width:" + width + "px; height: " + height + "px; position: absolute; top: " + top + "px; left: " + left + "px;'>Div</div>").appendTo(QUnit.fixture);
    }

    test("box returns element offset and dimensions", 4, function() {
        var div = createElement(200, 300, 200, 200);
        var result = box(div);
        equal(result.width, 200);
        equal(result.height, 200);
        equal(result.top, 200);
        equal(result.left, 300);
    });

    test("transformOrigin calculates the center of the element as origin, relative to the outer element", function() {
        var outer = createElement(100, 100, 200, 200);
        var inner = createElement(150, 150, 100, 100);
        var origin = transformOrigin(box(inner), box(outer));
        equal(origin.x, 100);
        equal(origin.y, 100);
    });

    test("transformOrigin offsets the origin correctly, relative to the outer element", function() {
        var outer = createElement(100, 100, 300, 300);
        var inner = createElement(150, 150, 100, 100);
        var origin = transformOrigin(box(inner), box(outer));
        equal(origin.x, 75);
        equal(origin.y, 75);
    });

    test("transformOrigin works if the inner element lies on the outer element side", function() {
        var outer = createElement(100, 100, 300, 300);
        var inner = createElement(100, 150, 100, 100);
        var origin = transformOrigin(box(inner), box(outer));
        equal(origin.x, 75);
        equal(origin.y, 0);
    });

    test("transformOrigin works with same sized elements", function() {
        var outer = createElement(100, 100, 300, 300);
        var origin = kendo.effects.transformOrigin(box(outer), box(outer));
        equal(origin.x, 0);
        equal(origin.y, 0);
    });

    test("fillScale picks the larger scale from the two dimensions", function() {
        var outer = createElement(0, 0, 300, 300);
        var inner = createElement(0, 0, 150, 300);
        equal(fillScale(box(inner), box(outer)), .5);

        outer = createElement(0, 0, 300, 300);
        inner = createElement(0, 0, 300, 150);
        equal(fillScale(box(inner), box(outer)), .5);
    });
})();
