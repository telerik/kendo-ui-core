(function() {
var dom;

describe("tabstrip mvvm", function () {
    afterEach(function() {
        kendo.destroy(dom);
    });

it("initializes a tabstrip when data role is tabstrip", function() {
    dom = $('<div data-role="tabstrip"></div>');

    kendo.bind(dom);

    assert.isOk(dom.data("kendoTabStrip") instanceof kendo.ui.TabStrip);
});

it("initializes a options from data attributes", function() {
    dom = $('<div data-role="tabstrip" data-animation="false"></div>');

    kendo.bind(dom);

    var tabstrip = dom.data("kendoTabStrip");

    assert.isOk($.isEmptyObject(tabstrip.options.animation.effects));
});

it("binding tabstrip initialized before binding", function() {
    dom = $('<div data-animation="false"></div>');

    var tabstrip = dom.kendoTabStrip().data("kendoTabStrip");

    kendo.bind(dom);

    assert.isOk($.isEmptyObject(tabstrip.options.animation.effects));
});

it("binding containing binding attributes", function() {
    dom = $('<div data-role="tabstrip"><span data-bind="text:text"></span></div>');

    var observable = kendo.observable({ text:"foo" });

    kendo.bind(dom, observable);

    assert.equal(dom.find("span:first").html().trim(), "foo");
});

it("animation is extended if widget is initialized before the binding", function() {
    dom = $('<div data-role="tabstrip" data-animation=\"{"open":{"effects":"fadeIn"}}\"/>');

    dom.kendoTabStrip();

    kendo.bind(dom);

    assert.equal(dom.data("kendoTabStrip").options.animation.open.duration, 200);
});

it("updating viewModel updates the content", function() {
    dom = $('<div data-role="tabstrip"><span data-bind="text:text"></span></div>');

    var observable = kendo.observable({ text:"foo" });

    kendo.bind(dom, observable);

    observable.set("text", "bar");

    assert.equal(dom.find("span:first").html().trim(), "bar");
});

it("event is raised if attached as option", function() {
    window.tabstripMVVMSelect = function() {
        assert.isOk(true);
    }
    dom = $('<div data-role="tabstrip" data-select="tabstripMVVMSelect"></div>');

    kendo.bind(dom);

    dom.data("kendoTabStrip").trigger("select");
});


it("tabstrip is bound to data source", function() {
    dom = $('<div data-role="tabstrip" data-bind="source: tabs"></div>');
    var viewModel = {
        tabs: ["foo", "bar"]
    };

    kendo.bind(dom, viewModel);

    assert.equal(dom.find("li").length, 2);
});

it("data text field is used when data binding", function() {
    dom = $('<div data-role="tabstrip" data-text-field="foo" data-bind="source: tabs"></div>');

    var viewModel = {
        tabs: [{ foo: "foo"}]
    };

    kendo.bind(dom, viewModel);

    assert.equal(dom.find("li").text(), "foo");
});

it("adding items to array adds tabs to tabstrip", function() {
    dom = $('<div data-role="tabstrip" data-bind="source: tabs"></div>');
    var viewModel = kendo.observable({
        tabs: ["foo", "bar"]
    });

    kendo.bind(dom, viewModel);

    viewModel.tabs.push("baz");
    assert.equal(dom.find("li:last").text(), "baz");
});

it("inserting items to array adds tabs to tabstrip", function() {
    dom = $('<div data-role="tabstrip" data-bind="source: tabs"></div>');
    var viewModel = kendo.observable({
        tabs: ["foo", "bar"]
    });

    kendo.bind(dom, viewModel);

    viewModel.tabs.splice(1, 0, "baz");
    assert.equal(dom.find("li:eq(1)").text(), "baz");
});

it("adding items to array does not recreate all tabs", function() {
    dom = $('<div data-role="tabstrip" data-bind="source: tabs"></div>');
    var viewModel = kendo.observable({
        tabs: ["foo", "bar"]
    });

    kendo.bind(dom, viewModel);
    var firstTab = dom.find("li:first")[0];

    viewModel.tabs.push("baz");
    assert.strictEqual(dom.find("li:first")[0], firstTab);
});

it("removing items from array adds tabs to tabstrip", function() {
    dom = $('<div data-role="tabstrip" data-bind="source: tabs"></div>');
    var viewModel = kendo.observable({
        tabs: ["foo", "bar"]
    });

    kendo.bind(dom, viewModel);

    viewModel.tabs.pop();
    assert.equal(dom.find("li:last").text(), "foo");
});

it("removing items from array does not recreate all tabs", function() {
    dom = $('<div data-role="tabstrip" data-bind="source: tabs"></div>');
    var viewModel = kendo.observable({
        tabs: ["foo", "bar"]
    });

    kendo.bind(dom, viewModel);

    var firstTab = dom.find("li:first")[0];
    viewModel.tabs.pop();
    assert.strictEqual(dom.find("li:first")[0], firstTab);
});

it("setting the value of the tabstrip", function() {
    dom = $('<div data-role="tabstrip" data-bind="value: tab, source: tabs"></div>');

    var viewModel = kendo.observable({
        tab: "bar",
        tabs: ["foo", "bar"]
    });

    kendo.bind(dom, viewModel);

    assert.isOk(dom.find("li:last").is(".k-state-active"), "Tab is active");
});

it("setting the value of the tabstrip when bound to complex object", function() {
    dom = $('<div data-role="tabstrip" data-text-field="name" data-bind="value: tab, source: tabs"></div>');

    var viewModel = kendo.observable({
        tabs: [{ name:"foo" },{ name: "bar" }]
    });

    viewModel.tab = viewModel.tabs[1];
    kendo.bind(dom, viewModel);

    assert.isOk(dom.find("li:last").is(".k-state-active"), "Tab is active");
});

it("selecting a tab changes the bound value in the view model", function() {
    dom = $('<div data-role="tabstrip" data-bind="value: tab, source: tabs"></div>');

    var viewModel = kendo.observable({
        tab: "bar",
        tabs: ["foo", "bar"]
    });

    kendo.bind(dom, viewModel);

    dom.find("li:first").trigger('click');

    assert.equal(viewModel.tab, "foo");
});

it("selecting a tab changes the bound value in the view model when bound to complex object", function() {
    dom = $('<div data-role="tabstrip" data-text-field="name" data-bind="value: tab, source: tabs"></div>');

    var viewModel = kendo.observable({
        tabs: [{ name:"foo" },{ name: "bar" }]
    });

    viewModel.tab = viewModel.tabs[1];
    kendo.bind(dom, viewModel);

    dom.find("li:first").trigger("click");

    assert.equal(viewModel.tab, viewModel.tabs[0]);
});

it("updating an item from the array updates the corresponding tab", function() {
    dom = $('<div data-role="tabstrip" data-text-field="name" data-bind="source: tabs"></div>');

    var viewModel = kendo.observable({
        tabs: [{ name:"foo" }]
    });

    kendo.bind(dom, viewModel);
    viewModel.tabs[0].set("name", "bar");

    assert.equal(dom.find("li").text(), "bar");
});

it("assign to DataSource as ViewModel field", function() {
    dom = $('<div data-role="tabstrip" data-bind="source:dataSource" />');

    var dataSource = new kendo.data.DataSource({
        data: [{text:"foo"}, {text:"bar"}]
    });

    var observable = kendo.observable({
        dataSource: dataSource
    });

    kendo.bind(dom, observable);
    var tabstrip = dom.data("kendoTabStrip");

    assert.strictEqual(tabstrip.dataSource, dataSource);
});

it("binding visible to true shows the tabstrip", function() {
    dom = $('<div data-role="tabstrip" data-bind="visible: visible"></div>');

    kendo.bind(dom, { visible: true });

    var tabstrip = dom.data("kendoTabStrip");

    assert.isOk(tabstrip.wrapper.css("display") != "none", "TabStrip is visible");
});

it("binding visible to false hides the tabstrip", function() {
    dom = $('<div data-role="tabstrip" data-bind="visible: visible"></div>');

    kendo.bind(dom, { visible: false });

    var tabstrip = dom.data("kendoTabStrip");

    assert.isOk(tabstrip.wrapper.css("display") == "none", "TabStrip is not visible");
});

it("binding invisible to true hides the tabstrip", function() {
    dom = $('<div data-role="tabstrip" data-bind="invisible: invisible"></div>');

    kendo.bind(dom, { invisible: true });

    var tabstrip = dom.data("kendoTabStrip");

    assert.isOk(tabstrip.wrapper.css("display") == "none", "TabStrip is invisible");
});

it("binding invisible to false shows the tabstrip", function() {
    dom = $('<div data-role="tabstrip" data-bind="invisible: invisible"></div>');

    kendo.bind(dom, { invisible: false });

    var tabstrip = dom.data("kendoTabStrip");

    assert.isOk(tabstrip.wrapper.css("display") != "none", "TabStrip is not invisible");
});

it("tab is correctly selected based on value binding", function() {
    dom = $('<div data-role="tabstrip" data-text-field="Name" data-content-field="Content" data-bind="source: dataSource, value: selected"></div>');

    kendo.bind(dom, {selected: "Tab1",dataSource: [{ Name: "Tab1", Content: "Tab1: content" },{ Name: "Tab2", Content: "Tab2: content" }]});

    var tabstrip = dom.data("kendoTabStrip");

    assert.isOk(tabstrip.element.find("li").first().hasClass("k-state-active"));
});
    });
}());
