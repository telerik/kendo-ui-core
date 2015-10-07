(function() {
var dom;

module("tabstrip mvvm", {
    teardown: function() {
        kendo.destroy(dom);
    }
});

test("initializes a tabstrip when data role is tabstrip", function() {
    dom = $('<div data-role="tabstrip"></div>');

    kendo.bind(dom);

    ok(dom.data("kendoTabStrip") instanceof kendo.ui.TabStrip);
});

test("initializes a options from data attributes", function() {
    dom = $('<div data-role="tabstrip" data-animation="false"></div>');

    kendo.bind(dom);

    var tabstrip = dom.data("kendoTabStrip");

    ok($.isEmptyObject(tabstrip.options.animation.effects));
});

test("binding tabstrip initialized before binding", function() {
    dom = $('<div data-animation="false"></div>');

    var tabstrip = dom.kendoTabStrip().data("kendoTabStrip");

    kendo.bind(dom);

    ok($.isEmptyObject(tabstrip.options.animation.effects));
});

test("binding containing binding attributes", function() {
    dom = $('<div data-role="tabstrip"><span data-bind="text:text"></span></div>');

    var observable = kendo.observable({ text:"foo" });

    kendo.bind(dom, observable);

    equal($.trim(dom.find("span:first").html()), "foo");
});

test("animation is extended if widget is initialized before the binding", function() {
    dom = $('<div data-role="tabstrip" data-animation=\"{"open":{"effects":"fadeIn"}}\"/>');

    dom.kendoTabStrip();

    kendo.bind(dom);

    equal(dom.data("kendoTabStrip").options.animation.open.duration, 200);
});

test("updating viewModel updates the content", function() {
    dom = $('<div data-role="tabstrip"><span data-bind="text:text"></span></div>');

    var observable = kendo.observable({ text:"foo" });

    kendo.bind(dom, observable);

    observable.set("text", "bar");

    equal($.trim(dom.find("span:first").html()), "bar");
});

test("event is raised if attached as option", 1, function() {
    window.tabstripMVVMSelect = function() {
        ok(true);
    }
    dom = $('<div data-role="tabstrip" data-select="tabstripMVVMSelect"></div>');

    kendo.bind(dom);

    dom.data("kendoTabStrip").trigger("select");
});


test("tabstrip is bound to data source", function() {
    dom = $('<div data-role="tabstrip" data-bind="source: tabs"></div>');
    var viewModel = {
        tabs: ["foo", "bar"]
    };

    kendo.bind(dom, viewModel);

    equal(dom.find("li").length, 2);
});

test("data text field is used when data binding", function() {
    dom = $('<div data-role="tabstrip" data-text-field="foo" data-bind="source: tabs"></div>');

    var viewModel = {
        tabs: [{ foo: "foo"}]
    };

    kendo.bind(dom, viewModel);

    equal(dom.find("li").text(), "foo");
});

test("adding items to array adds tabs to tabstrip", function() {
    dom = $('<div data-role="tabstrip" data-bind="source: tabs"></div>');
    var viewModel = kendo.observable({
        tabs: ["foo", "bar"]
    });

    kendo.bind(dom, viewModel);

    viewModel.tabs.push("baz");
    equal(dom.find("li:last").text(), "baz");
});

test("inserting items to array adds tabs to tabstrip", function() {
    dom = $('<div data-role="tabstrip" data-bind="source: tabs"></div>');
    var viewModel = kendo.observable({
        tabs: ["foo", "bar"]
    });

    kendo.bind(dom, viewModel);

    viewModel.tabs.splice(1, 0, "baz");
    equal(dom.find("li:eq(1)").text(), "baz");
});

test("adding items to array does not recreate all tabs", function() {
    dom = $('<div data-role="tabstrip" data-bind="source: tabs"></div>');
    var viewModel = kendo.observable({
        tabs: ["foo", "bar"]
    });

    kendo.bind(dom, viewModel);
    var firstTab = dom.find("li:first")[0];

    viewModel.tabs.push("baz");
    strictEqual(dom.find("li:first")[0], firstTab);
});

test("removing items from array adds tabs to tabstrip", function() {
    dom = $('<div data-role="tabstrip" data-bind="source: tabs"></div>');
    var viewModel = kendo.observable({
        tabs: ["foo", "bar"]
    });

    kendo.bind(dom, viewModel);

    viewModel.tabs.pop();
    equal(dom.find("li:last").text(), "foo");
});

test("removing items from array does not recreate all tabs", function() {
    dom = $('<div data-role="tabstrip" data-bind="source: tabs"></div>');
    var viewModel = kendo.observable({
        tabs: ["foo", "bar"]
    });

    kendo.bind(dom, viewModel);

    var firstTab = dom.find("li:first")[0];
    viewModel.tabs.pop();
    strictEqual(dom.find("li:first")[0], firstTab);
});

test("setting the value of the tabstrip", function() {
    dom = $('<div data-role="tabstrip" data-bind="value: tab, source: tabs"></div>');

    var viewModel = kendo.observable({
        tab: "bar",
        tabs: ["foo", "bar"]
    });

    kendo.bind(dom, viewModel);

    ok(dom.find("li:last").is(".k-state-active"), "Tab is active");
});

test("setting the value of the tabstrip when bound to complex object", function() {
    dom = $('<div data-role="tabstrip" data-text-field="name" data-bind="value: tab, source: tabs"></div>');

    var viewModel = kendo.observable({
        tabs: [{ name:"foo" },{ name: "bar" }]
    });

    viewModel.tab = viewModel.tabs[1];
    kendo.bind(dom, viewModel);

    ok(dom.find("li:last").is(".k-state-active"), "Tab is active");
});

test("selecting a tab changes the bound value in the view model", function() {
    dom = $('<div data-role="tabstrip" data-bind="value: tab, source: tabs"></div>');

    var viewModel = kendo.observable({
        tab: "bar",
        tabs: ["foo", "bar"]
    });

    kendo.bind(dom, viewModel);

    dom.find("li:first").trigger('click');

    equal(viewModel.tab, "foo");
});

test("selecting a tab changes the bound value in the view model when bound to complex object", function() {
    dom = $('<div data-role="tabstrip" data-text-field="name" data-bind="value: tab, source: tabs"></div>');

    var viewModel = kendo.observable({
        tabs: [{ name:"foo" },{ name: "bar" }]
    });

    viewModel.tab = viewModel.tabs[1];
    kendo.bind(dom, viewModel);

    dom.find("li:first").trigger("click");

    equal(viewModel.tab, viewModel.tabs[0]);
});

test("updating an item from the array updates the corresponding tab", function() {
    dom = $('<div data-role="tabstrip" data-text-field="name" data-bind="source: tabs"></div>');

    var viewModel = kendo.observable({
        tabs: [{ name:"foo" }]
    });

    kendo.bind(dom, viewModel);
    viewModel.tabs[0].set("name", "bar");

    equal(dom.find("li").text(), "bar");
});

test("assign to DataSource as ViewModel field", function() {
    dom = $('<div data-role="tabstrip" data-bind="source:dataSource" />');

    var dataSource = new kendo.data.DataSource({
        data: [{text:"foo"}, {text:"bar"}]
    });

    var observable = kendo.observable({
        dataSource: dataSource
    });

    kendo.bind(dom, observable);
    var tabstrip = dom.data("kendoTabStrip");

    strictEqual(tabstrip.dataSource, dataSource);
});

test("binding visible to true shows the tabstrip", function() {
    dom = $('<div data-role="tabstrip" data-bind="visible: visible"></div>');

    kendo.bind(dom, { visible: true });

    var tabstrip = dom.data("kendoTabStrip");

    ok(tabstrip.wrapper.css("display") != "none", "TabStrip is visible");
});

test("binding visible to false hides the tabstrip", function() {
    dom = $('<div data-role="tabstrip" data-bind="visible: visible"></div>');

    kendo.bind(dom, { visible: false });

    var tabstrip = dom.data("kendoTabStrip");

    ok(tabstrip.wrapper.css("display") == "none", "TabStrip is not visible");
});

test("binding invisible to true hides the tabstrip", function() {
    dom = $('<div data-role="tabstrip" data-bind="invisible: invisible"></div>');

    kendo.bind(dom, { invisible: true });

    var tabstrip = dom.data("kendoTabStrip");

    ok(tabstrip.wrapper.css("display") == "none", "TabStrip is invisible");
});

test("binding invisible to false shows the tabstrip", function() {
    dom = $('<div data-role="tabstrip" data-bind="invisible: invisible"></div>');

    kendo.bind(dom, { invisible: false });

    var tabstrip = dom.data("kendoTabStrip");

    ok(tabstrip.wrapper.css("display") != "none", "TabStrip is not invisible");
});

test("tab is correctly selected based on value binding", function() {
    dom = $('<div data-role="tabstrip" data-text-field="Name" data-content-field="Content" data-bind="source: dataSource, value: selected"></div>');

    kendo.bind(dom, {selected: "Tab1",dataSource: [{ Name: "Tab1", Content: "Tab1: content" },{ Name: "Tab2", Content: "Tab2: content" }]});

    var tabstrip = dom.data("kendoTabStrip");

    ok(tabstrip.element.find("li").first().hasClass("k-state-active"));
});
})();
