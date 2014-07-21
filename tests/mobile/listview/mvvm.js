(function() {
    var dom;

    module('mobile listview mvvm', {
        setup: function() {
            $('#qunit-fixture').append('<script id="template" type="text/x-kendo-template"><strong>#:text#</strong></script> \
                <script id="template-with-attributes" type="text/x-kendo-template"><strong data-bind="text:text"></strong></script> \
                <script id="template-with-events" type="text/x-kendo-template"><strong data-bind="text: foo, events:{ click: rootHandler}"></strong></script> \
            <script id="template-with-links" type="text/x-kendo-template"><a data-bind="text: foo"></a></script>');
        },

        teardown: function() {
            kendo.destroy(dom);
        }
    });

    test("initializes a listview when data role is listview", function() {
        dom = $('<ul data-role="listview"/>');

        kendo.bind(dom, {}, kendo.mobile.ui);

        ok(dom.data("kendoMobileListView") instanceof kendo.mobile.ui.ListView);
    });

    test("initalizes data source", function() {
        dom = $('<ul data-role="listview" data-bind="source:items" />');

        kendo.bind(dom, { items: ["foo", "bar"] }, kendo.mobile.ui );

        equal(dom.data("kendoMobileListView").dataSource.view()[0], "foo");
        equal(dom.data("kendoMobileListView").dataSource.view()[1], "bar");
    });

    test("binding listview initialized before binding", function() {
        dom = $('<ul data-bind="source:items" />');

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}]});

        dom.kendoMobileListView();

        kendo.bind(dom, observable, kendo.mobile.ui );

        equal(dom.data("kendoMobileListView").dataSource.at(0).text, "foo");
    });

    test("binding listview initialized after binding", function() {
        dom = $('<ul data-bind="source:items" />');

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}]});

        kendo.bind(dom, observable, kendo.mobile.ui);

        dom.kendoMobileListView();

        equal(dom.data("kendoMobileListView").dataSource.at(0).text, "foo");
    });

    test("binding template", function() {
        dom = $('<ul data-role="listview" data-template="template" data-bind="source:items" />');

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

        kendo.bind(dom, observable, kendo.mobile.ui);

        equal($.trim(dom.find("li:first").html()), "<strong>foo</strong>");
    });

    test("binding template containing binding attributes", function() {
        dom = $('<ul data-role="listview" data-template="template-with-attributes" data-bind="source:items" />');

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

        kendo.bind(dom, observable, kendo.mobile.ui);

        equal($.trim(dom.find("li:first").html()), '<strong data-bind="text:text">foo</strong>');
    });

    test("assign to DataSource as ViewModel field", function() {
        dom = $('<ul data-role="listview" data-template="template-with-attributes" data-bind="source:dataSource" />');

        var dataSource = new kendo.data.DataSource({
            data: [{text:"foo"}, {text:"bar"}]
        });

        var observable = kendo.observable({
            dataSource: dataSource
        });

        kendo.bind(dom, observable, kendo.mobile.ui);

        var listView = dom.data("kendoMobileListView");

        strictEqual(listView.dataSource, dataSource);
    });

    test("binding visible to false hides the widget", function() {
        dom = $('<ul data-role="listview" data-template="template-with-attributes" data-bind="source:dataSource, visible:visible" />');

        var observable = kendo.observable({
            visible: false
        });

        kendo.bind(dom, observable, kendo.mobile.ui);

        ok(dom.data("kendoMobileListView").wrapper.css("display") == "none", "Display is 'none'");
    });

    test("binding visible to true shows the widget", function() {
        dom = $('<ul data-role="listview" data-template="template-with-attributes" style="display:none" data-bind="source:dataSource, visible:visible" />');

        var observable = kendo.observable({
            visible: true
        });

        kendo.bind(dom, observable, kendo.mobile.ui);

        ok(dom.data("kendoMobileListView").wrapper.css("display") != "none", "Display is not 'none'");
    });

    test("changing visible to false hides the widget", function() {
        dom = $('<ul data-role="listview" data-template="template-with-attributes" data-bind="source:dataSource, visible:visible" />');

        var observable = kendo.observable({
            visible: true
        });

        kendo.bind(dom, observable, kendo.mobile.ui);
        observable.set("visible", false);

        ok(dom.data("kendoMobileListView").wrapper.css("display") == "none", "Display is 'none'");
    });

    test("changing visible to true shows the widget", function() {
        dom = $('<ul data-role="listview" data-template="template-with-attributes" data-bind="source:dataSource, visible:visible" />');

        var observable = kendo.observable({
            visible: false
        });

        kendo.bind(dom, observable, kendo.mobile.ui);
        observable.set("visible", true);

        ok(dom.data("kendoMobileListView").wrapper.css("display") != "none", "Display is not 'none'");
    });

    test("binding invisible to true hides the widget", function() {
        dom = $('<ul data-role="listview" data-template="template-with-attributes" data-bind="source:dataSource, invisible:invisible" />');

        var observable = kendo.observable({
            invisible: true
        });

        kendo.bind(dom, observable, kendo.mobile.ui);

        ok(dom.data("kendoMobileListView").wrapper.css("display") == "none", "display is 'none'");
    });

    test("binding invisible to false shows the widget", function() {
        dom = $('<ul data-role="listview" data-template="template-with-attributes" style="display:none" data-bind="source:dataSource, invisible:invisible" />');

        var observable = kendo.observable({
            invisible: false
        });

        kendo.bind(dom, observable, kendo.mobile.ui);

        ok(dom.data("kendoMobileListView").wrapper.css("display") != "none", "display is not 'none'");
    });

    test("changing invisible to true hides the widget", function() {
        dom = $('<ul data-role="listview" data-template="template-with-attributes" data-bind="source:dataSource, invisible:invisible" />');

        var observable = kendo.observable({
            invisible: false
        });

        kendo.bind(dom, observable, kendo.mobile.ui);
        observable.set("invisible", true);

        ok(dom.data("kendoMobileListView").wrapper.css("display") == "none", "display is 'none'");
    });

    test("changing invisible to false shows the widget", function() {
        dom = $('<ul data-role="listview" data-template="template-with-attributes" data-bind="source:dataSource, invisible:invisible" />');

        var observable = kendo.observable({
            invisible: true
        });

        kendo.bind(dom, observable, kendo.mobile.ui);
        observable.set("invisible", false);

        ok(dom.data("kendoMobileListView").wrapper.css("display") != "none", "display is not 'none'");
    });

    test("binds event handlers in template to root view model when item changes", function() {
        dom = $('<ul data-role="listview" data-template="template-with-events" data-bind="source:dataSource" />');

        var observable = kendo.observable({
            dataSource: [ { foo: "foo" } ]
        });

        stub(observable, "rootHandler");

        kendo.bind(dom, observable, kendo.mobile.ui);

        observable.dataSource[0].set("foo", "bar");

        dom.find("li strong").click();

        equal(observable.calls("rootHandler"), 1);
    });

    test("binds event handlers in template to root view model when item changes", function() {
        dom = $('<div data-role="scroller"><ul data-role="listview" data-template="template-with-events" data-endless-scroll="true" data-virtual-view-size="2" data-bind="source:dataSource" /></div>');

        var observable = kendo.observable({
            dataSource: [ { foo: "foo" } ]
        });

        stub(observable, "rootHandler");

        kendo.bind(dom, observable, kendo.mobile.ui);

        dom.find("li strong").click();

        equal(observable.calls("rootHandler"), 1);
    });


    test("template with links styles the links when item changes", 2, function() {
        dom = $('<ul data-role="listview" data-template="template-with-links" data-bind="source:dataSource" />');

        var observable = kendo.observable({
            dataSource: [ { foo: "foo" } ]
        });

        kendo.bind(dom, observable, kendo.mobile.ui);

        ok(dom.find("li a").is(".km-listview-link"));

        observable.dataSource[0].set("foo", "bar");

        ok(dom.find("li a").is(".km-listview-link"));
    });

    test("template with links styles the links when item is added", 2, function() {
        dom = $('<ul data-role="listview" data-template="template-with-links" data-bind="source:dataSource" />');

        var observable = kendo.observable({
            dataSource: [ { foo: "foo" } ]
        });

        kendo.bind(dom, observable, kendo.mobile.ui);

        observable.dataSource.push({ foo: "bar" });

        var anchors = dom.find("li a");

        equal(anchors.length, 2);
        ok(anchors.last().is(".km-listview-link"));
    });

    test("adding item to the datasource maintains the existing items bindings", function() {
        dom = $('<ul data-role="listview" data-template="template-with-events" data-bind="source:dataSource" />');

        var observable = kendo.observable({
            dataSource: [ { foo: "foo" } ]
        });

        stub(observable, "rootHandler");

        kendo.bind(dom, observable, kendo.mobile.ui);

        observable.dataSource.push({ foo: "bar" });

        dom.find("li strong").eq(0).click();

        equal(observable.calls("rootHandler"), 1);
    });

    test("ListView removes LI from UL if item is removed from list", function() {
        dom = $('<ul data-role="listview" data-template="template-with-links" data-bind="source:dataSource" />');

        var observable = kendo.observable({
            dataSource: [ { foo: "foo" }, { foo: "baz" }]
        });

        kendo.bind(dom, observable, kendo.mobile.ui);
        observable.dataSource.splice(1, 1);

        equal(dom.find("li a").length, 1);
    });

    test("enable filtering", function() {
        dom = $('<ul data-role="listview" data-template="template-with-links" data-bind="source:dataSource" data-filterable="true" />');

        var observable = kendo.observable({
            dataSource: [ { foo: "foo" } ]
        });

        kendo.bind(dom, observable, kendo.mobile.ui);

        ok(dom.data("kendoMobileListView").options.filterable);
    });

})();
