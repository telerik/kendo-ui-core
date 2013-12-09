(function(){

function moduleTeardown() {
    kendo.destroy(QUnit.fixture);
    QUnit.fixture.empty();
}

// -----------------------------------------------------------------------------------
module("upload mvvm binding", {
    teardown: moduleTeardown
});

test("initializes an upload when data role is upload", function() {
    var dom = $('<input type="file" data-role="upload"></input>')
                .appendTo(QUnit.fixture);

    kendo.bind(dom);

    ok(dom.data("kendoUpload") instanceof kendo.ui.Upload);
});

test("initializes options from data attributes", function() {
    var dom = $('<input type="file" data-role="upload" data-enabled="false"></input>')
                .appendTo(QUnit.fixture);

    kendo.bind(dom);

    var upload = dom.data("kendoUpload");

    equal(upload.options.enabled, false);
    ok(upload.wrapper.hasClass("k-state-disabled"));
});

test("binding upload initialized before binding", function() {
    var dom = $('<input type="file" data-enabled="false"></input>')
                .appendTo(QUnit.fixture);

    var upload = dom.kendoUpload().data("kendoUpload");

    kendo.bind(dom);

    equal(upload.options.enabled, false);
    ok(upload.wrapper.hasClass("k-state-disabled"));
});

test("event is raised if attached as option", 1, function() {
    var dom = $('<input type="file" data-role="upload" data-bind="events: { select: onSelect }"></input>')
                .appendTo(QUnit.fixture);

    var observable = kendo.observable({
        onSelect: function(e){
            ok(true);
        }
    });

    kendo.bind(dom, observable);

    dom.data("kendoUpload").trigger("select");
});

test("binding enabled to false disables the widget", function() {
    var dom = $('<input data-bind="enabled:enabled" data-role="upload"/>')
                .appendTo(QUnit.fixture);

    var observable = kendo.observable({
        enabled: false
    });

    kendo.bind(dom, observable);

    ok(dom.data("kendoUpload").wrapper.hasClass("k-state-disabled"));
});

test("binding enabled to true enables the widget", function() {
    var dom = $('<input data-bind="enabled:enabled" disabled="disabled" data-role="upload" />')
                .appendTo(QUnit.fixture);

    var observable = kendo.observable({
        enabled: true
    });

    kendo.bind(dom, observable);

    ok(!dom.data("kendoUpload").wrapper.hasClass("k-state-disabled"));
});

test("binding disable to true disables the widget", function() {
    var dom = $('<input data-bind="disabled:disabled" disabled="disabled" data-role="upload" />')
                .appendTo(QUnit.fixture);

    var observable = kendo.observable({
        disabled: false
    });

    kendo.bind(dom, observable);

    ok(!dom.data("kendoUpload").wrapper.hasClass("k-state-disabled"));
});

test("binding disabled to false enables the widget", function() {
    var dom = $('<input data-bind="disabled:disabled" data-role="upload" />')
                .appendTo(QUnit.fixture);

    var observable = kendo.observable({
        disabled: true
    });

    kendo.bind(dom, observable);

    ok(dom.data("kendoUpload").wrapper.hasClass("k-state-disabled"));
});

test("binding visible to false hides the widget", function() {
    var dom = $('<input type="file" data-bind="visible:visible" data-role="upload"/>')
                .appendTo(QUnit.fixture);

    var observable = kendo.observable({
        visible: false
    });

    kendo.bind(dom, observable);

    ok(dom.data("kendoUpload").wrapper.css("display") == "none", "Display is 'none'");
});

test("binding visible to true shows the widget", function() {
    var dom = $('<input type="file" data-bind="visible:visible" data-role="upload" style="display:none"/>')
                .appendTo(QUnit.fixture);

    var observable = kendo.observable({
        visible: true
    });

    kendo.bind(dom, observable);

    ok(dom.data("kendoUpload").wrapper.css("display") != "none", "Display is not 'none'");
});

test("changing visible to false hides the widget", function() {
    var dom = $('<input type="file" data-bind="visible:visible" data-role="upload"/>')
                .appendTo(QUnit.fixture);

    var observable = kendo.observable({
        visible: true
    });

    kendo.bind(dom, observable);
    observable.set("visible", false);

    ok(dom.data("kendoUpload").wrapper.css("display") == "none", "Display is 'none'");
});

test("changing visible to true shows the widget", function() {
    var dom = $('<input type="file" data-bind="visible:visible" data-role="upload"/>')
                .appendTo(QUnit.fixture);

    var observable = kendo.observable({
        visible: false
    });

    kendo.bind(dom, observable);
    observable.set("visible", true);

    ok(dom.data("kendoUpload").wrapper.css("display") != "none", "Display is not 'none'");
});

test("binding invisible to true hides the widget", function() {
    var dom = $('<input type="file" data-bind="invisible:invisible" data-role="upload"/>')
                .appendTo(QUnit.fixture);

    var observable = kendo.observable({
        invisible: true
    });

    kendo.bind(dom, observable);

    ok(dom.data("kendoUpload").wrapper.css("display") == "none", "display is 'none'");
});

test("binding invisible to false shows the widget", function() {
    var dom = $('<input type="file" data-bind="invisible:invisible" data-role="upload" style="display:none"/>')
                .appendTo(QUnit.fixture);

    var observable = kendo.observable({
        invisible: false
    });

    kendo.bind(dom, observable);

    ok(dom.data("kendoUpload").wrapper.css("display") != "none", "display is not 'none'");
});

test("changing invisible to true hides the widget", function() {
    var dom = $('<input type="file" data-bind="invisible:invisible" data-role="upload"/>')
                .appendTo(QUnit.fixture);

    var observable = kendo.observable({
        invisible: false
    });

    kendo.bind(dom, observable);
    observable.set("invisible", true);

    ok(dom.data("kendoUpload").wrapper.css("display") == "none", "display is 'none'");
});

test("changing invisible to false shows the widget", function() {
    var dom = $('<input type="file" data-bind="invisible:invisible" data-role="upload"/>')
                .appendTo(QUnit.fixture);

    var observable = kendo.observable({
        invisible: true
    });

    kendo.bind(dom, observable);
    observable.set("invisible", false);

    ok(dom.data("kendoUpload").wrapper.css("display") != "none", "display is not 'none'");
});

})();
