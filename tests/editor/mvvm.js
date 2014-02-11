(function(){

var dom;

module("editor mvvm", {
    setup: function() {
        dom = $('<textarea data-role=editor></textarea>').appendTo(QUnit.fixture);
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
    }
});

test("initializes an editor when data role is editor", function() {
    kendo.bind(dom);

    ok(dom.data("kendoEditor") instanceof kendo.ui.Editor);
});

test("initializes options from data attributes", function() {
    dom.attr("data-encoded", "false");

    kendo.bind(dom);

    var editor = dom.data("kendoEditor");

    equal(editor.options.encoded, false);
});

test("initalizes value from view model", function() {
    dom.attr("data-bind", "value: value");

    kendo.bind(dom, { value: "bar" } );

    equal(dom.data("kendoEditor").value(), "bar");
});

test("changing a value updates the view model", function() {
    dom.attr("data-bind", "value: value");

    var viewModel = kendo.observable({
        value: "foo"
    });

    kendo.bind(dom, viewModel);

    dom.data("kendoEditor").value("bar");
    dom.data("kendoEditor").trigger("change");

    equal(viewModel.value, "bar");
});

test("binding editor initialized before binding", function() {
    dom.removeAttr("data-role").attr("data-bind", "value: value");

    dom.kendoEditor();

    kendo.bind(dom, { value: "bar" });

    equal(dom.data("kendoEditor").value(), "bar");
});

test("binding editor initialized after binding", function() {
    dom.removeAttr("data-role").attr("data-bind", "value: value");

    var viewModel = kendo.observable({
        value: "bar"
    });

    kendo.bind(dom, viewModel);

    dom.kendoEditor();

    viewModel.set("value", "foo");

    equal(dom.data("kendoEditor").value(), "foo");
});

test("binding visible to true shows the editor", function() {
    dom.attr("data-bind", "visible: visible");

    kendo.bind(dom, { visible: true });

    var editor = dom.data("kendoEditor");

    ok(editor.wrapper.css("display") != "none", "editor is visible");
});

test("binding visible to false hides the editor", function() {
    dom.attr("data-bind", "visible: visible");

    kendo.bind(dom, { visible: false });

    var editor = dom.data("kendoEditor");

    ok(editor.wrapper.css("display") == "none", "editor is not visible");
});

test("binding invisible to true hides the editor", function() {
    dom.attr("data-bind", "invisible: invisible");

    kendo.bind(dom, { invisible: true });

    var editor = dom.data("kendoEditor");

    ok(editor.wrapper.css("display") == "none", "editor is invisible");
});

test("binding invisible to false shows the editor", function() {
    dom.attr("data-bind", "invisible: invisible");

    kendo.bind(dom, { invisible: false });

    var editor = dom.data("kendoEditor");

    ok(editor.wrapper.css("display") != "none", "editor is not invisible");
});

test("serialization options can be set through data attribute", function() {
    dom.attr("data-serialization", "{ entities: false }");

    kendo.bind(dom);

    equal(dom.data("kendoEditor").options.serialization.entities, false);
});

}());
