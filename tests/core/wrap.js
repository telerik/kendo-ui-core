(function(){
var span;

module("wrap", {
    setup: function() {
        span = $("<span style='display: block;'>foo</span>").appendTo(QUnit.fixture);
    }
});

test("container with pixel width produces wrapper with pixel width", function() {
    span.width("50px");

    var wrap = kendo.wrap(span);

    ok(wrap[0].style.width == "50px");
    ok(wrap.children()[0].style.width == "50px");
});

test("container with pixel height produces wrapper with pixel height", function() {
    span.height("50px");

    var wrap = kendo.wrap(span);

    ok(wrap[0].style.height == "50px");
    ok(wrap.children()[0].style.height == "50px");
});

test("updated container with pixel width updates wrapper pixel width", function() {
    span.width("50px");

    kendo.wrap(span);

    span.width("60px");

    var wrap = kendo.wrap(span);

    ok(wrap[0].style.width == "60px");
    ok(wrap.children()[0].style.width == "60px");
});

test("container with percent height produces wrapper with percent height", function() {
    span.height("50%");

    var wrap = kendo.wrap(span);

    ok(wrap[0].style.height == "50%");
    ok(wrap.children()[0].style.height == "100%");
});

test("container with percent width produces wrapper with percent width", function() {
    span.width("50%");

    var wrap = kendo.wrap(span);

    ok(wrap[0].style.width == "50%");
    ok(wrap.children()[0].style.width == "100%");
});

}());

