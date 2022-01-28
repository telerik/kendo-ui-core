(function(){
var span;

describe("wrap", function () {
    beforeEach(function() {
        span = $("<span style='display: block;'>foo</span>").appendTo(Mocha.fixture);
    });

it("container with pixel width produces wrapper with pixel width", function() {
    span.width("50px");

    var wrap = kendo.wrap(span);

    assert.isOk(wrap[0].style.width == "50px");
    assert.isOk(wrap.children()[0].style.width == "50px");
});

it("container with pixel height produces wrapper with pixel height", function() {
    span.height("50px");

    var wrap = kendo.wrap(span);

    assert.isOk(wrap[0].style.height == "50px");
    assert.isOk(wrap.children()[0].style.height == "50px");
});

it("updated container with pixel width updates wrapper pixel width", function() {
    span.width("50px");

    kendo.wrap(span);

    span.width("60px");

    var wrap = kendo.wrap(span);

    assert.isOk(wrap[0].style.width == "60px");
    assert.isOk(wrap.children()[0].style.width == "60px");
});

it("container with percent height produces wrapper with percent height", function() {
    span.height("50%");

    var wrap = kendo.wrap(span);

    assert.isOk(wrap[0].style.height == "50%");
    assert.isOk(wrap.children()[0].style.height == "100%");
});

it("container with percent width produces wrapper with percent width", function() {
    span.width("50%");

    var wrap = kendo.wrap(span);

    assert.isOk(wrap[0].style.width == "50%");
    assert.isOk(wrap.children()[0].style.width == "100%");
});

    });
}());

