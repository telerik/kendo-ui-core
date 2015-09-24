(function(){

var dom;

module("autocomplete mvvm", {
  setup: function() {
      QUnit.fixture.append(
        '<script id="template" type="text/x-kendo-template">' +
        '    <strong>#:text#</strong>' +
        '</script>' +
        '<script id="template-with-attributes" type="text/x-kendo-template">' +
        '    <strong data-bind="text:text"></strong>' +
        '</script>'
      );

      window.dataBound = function() {
          ok(true);
      }
  },
  teardown: function() {
      delete window.dataBound;
      kendo.destroy(dom);
  }
});

test("initializes a autocomplete when data role is autocomplete", function() {
    dom = $('<input data-role="autocomplete"/>');

    kendo.bind(dom);

    ok(dom.data("kendoAutoComplete") instanceof kendo.ui.AutoComplete);
});

test("initializes a options from data attributes", function() {
    dom = $('<input data-role="autocomplete" data-text-field="foo" />');

    kendo.bind(dom);

    var autocomplete = dom.data("kendoAutoComplete");

    equal(autocomplete.options.dataTextField, "foo");
});

test("initializes data source", function() {
    dom = $('<input data-role="autocomplete" data-bind="source:items" />');

    kendo.bind(dom, { items: ["foo", "bar"] } );

    equal(dom.data("kendoAutoComplete").dataSource.view()[0], "foo");
    equal(dom.data("kendoAutoComplete").dataSource.view()[1], "bar");
});

test("initializes value from view model", function() {
    dom = $('<input data-role="autocomplete" data-bind="value:value, source:items" />');

    kendo.bind(dom, { items: ["foo", "bar"], value: "bar" } );

    equal(dom.data("kendoAutoComplete").value(), "bar");
});

test("initializes complex value from view model", function() {
    dom = $('<input data-text-field="text" data-role="autocomplete" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
    observable.value = observable.items[1];

    kendo.bind(dom, observable);

    equal(dom.data("kendoAutoComplete").value(), "bar");
});

test("changing a value updates the view model", function() {
    dom = $('<input data-text-field="text" data-role="autocomplete" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
    observable.value = observable.items[1];

    kendo.bind(dom, observable);
    dom.data("kendoAutoComplete").value("foo");
    dom.data("kendoAutoComplete").trigger("change");

    equal(observable.value, observable.items[0]);
});

test("changing value to a custom one updates the view model", function() {
    dom = $('<input data-text-field="text" data-role="autocomplete" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });

    observable.value = observable.items[1];

    kendo.bind(dom, observable);
    dom.data("kendoAutoComplete").value("moo");
    dom.data("kendoAutoComplete").trigger("change");

    equal(observable.value, "moo");
});

test("changing a value updates the view model if bound to simple value", function() {
    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: "foo" });

    dom = $('<input data-role="autocomplete" data-text-field="text" data-bind="value:value, source:items" />');

    kendo.bind(dom, observable);

    dom.data("kendoAutoComplete").value("bar");
    dom.data("kendoAutoComplete").trigger("change");

    equal(observable.value, "bar");
});

test("custom view model value", function() {
    dom = $('<input data-text-field="text" data-role="autocomplete" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
    observable.value = "moo";

    kendo.bind(dom, observable);
    equal(dom.data("kendoAutoComplete").value(), "moo");
});

test("setting existing view model value after custom value", function() {
    dom = $('<input data-text-field="text" data-role="autocomplete" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });

    kendo.bind(dom, observable);

    dom.data("kendoAutoComplete").value("moo");
    dom.data("kendoAutoComplete").trigger("change");

    dom.data("kendoAutoComplete").value("foo");
    dom.data("kendoAutoComplete").trigger("change");

    equal(observable.value, observable.items[0]);
});

test("setting custom value after existing view model value", function() {
    dom = $('<input data-text-field="text" data-role="autocomplete" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });

    kendo.bind(dom, observable);

    dom.data("kendoAutoComplete").value("foo");
    dom.data("kendoAutoComplete").trigger("change");

    dom.data("kendoAutoComplete").value("moo");
    dom.data("kendoAutoComplete").trigger("change");

    equal(observable.value, "moo");
});

test("binding autocomplete initialized before binding", function() {
    dom = $('<input data-text-field="text" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
    observable.value = observable.items[1];

    dom.kendoAutoComplete();

    kendo.bind(dom, observable);

    equal(dom.data("kendoAutoComplete").value(), "bar");
});

test("binding autocomplete initialized after binding", function() {
    dom = $('<input data-text-field="text" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
    observable.value = observable.items[1];

    kendo.bind(dom, observable);

    dom.kendoAutoComplete({ dataTextField: "text" });

    equal(dom.data("kendoAutoComplete").value(), "bar");
});

test("binding template", function() {
    dom = $('<input data-role="autocomplete" data-template="template" data-bind=" source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

    kendo.bind(dom, observable);

    equal($.trim(dom.data("kendoAutoComplete").ul.children().eq(0).html()), "<strong>foo</strong>");
});

test("binding template containing binding attributes", function() {
    dom = $('<input data-role="autocomplete" data-template="template-with-attributes" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

    kendo.bind(dom, observable);

    equal($.trim(dom.data("kendoAutoComplete").ul.children().eq(0).html()), '<strong data-bind="text:text">foo</strong>');
});

test("updating an item from the data source updates the corresponding autocomplete item", function() {
    dom = $('<input data-role="autocomplete" data-template="template-with-attributes" data-bind=" source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

    kendo.bind(dom, observable);

    observable.items[0].set("text", "baz");

    equal($.trim(dom.data("kendoAutoComplete").ul.children().eq(0).text()), "baz");
});

test("destroying binding targets when the datasource changes", function() {
    dom = $('<input data-role="autocomplete" data-template="template-with-attributes" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{ text:"foo"} ] });

    kendo.bind(dom, observable);
    dom.data("kendoAutoComplete").refresh();

    equal(observable.items[0]._events["change"].length, 2); //1 for the text binding and 1 for the ObservableArray
});

test("removing items from the model updates the UI", function() {
    dom = $('<input data-bind="source:items" />');

    var observable = kendo.observable({ items: [{ text:"foo"},{ text: "bar" },{ text: "baz" }] });

    kendo.bind(dom, observable);

    dom.kendoAutoComplete();

    observable.items.splice(0,1);

    equal(dom.data("kendoAutoComplete").ul.children().length, 2);
});

test("binding are removed if element is rebind", 1, function() {
    dom = $('<input data-role="autocomplete" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{ text:"foo"},{ text: "bar" } ] });

    kendo.bind(dom, observable);

    var destroy = stub(dom[0].kendoBindingTarget, "destroy");

    kendo.bind(dom, observable);

    equal(destroy.calls("destroy"), 1);
});

test("binding target is destroyed", 1, function() {
    dom = $('<input data-role="autocomplete" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{ text:"foo"},{ text: "bar" } ] });

    kendo.bind(dom, observable);

    var destroy = stub(dom[0].kendoBindingTarget, "destroy");

    kendo.bind(dom, observable);

    equal(destroy.calls("destroy"), 1);
});

test("destroys detaches the events to widget", function() {
    dom = $('<div data-role="autocomplete" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

    kendo.bind(dom, observable);
    kendo.unbind(dom);

    var autocomplete = dom.data("kendoAutoComplete");

    equal(autocomplete._events["dataBound"].length, 0);
    equal(autocomplete._events["dataBinding"].length, 0);
});


test("dataBound event is raised if attached as option", 1, function() {
    dom = $('<div data-role="autocomplete" data-bound="dataBound" data-bind="source:items" />');

    var observable = kendo.observable({
        items: [{text:"foo"}, {text:"bar"}]
    });

    kendo.bind(dom, observable);
});

test("dataBound event is raised if attached as option to a already initialized autocomplete", 1, function() {
    dom = $('<div data-bound="dataBound" data-bind="source:items" />').kendoAutoComplete();

    var observable = kendo.observable({
        items: [{text:"foo"}, {text:"bar"}]
    });

    kendo.bind(dom, observable);
});

test("binding invisible to true hides the widget", function() {
    dom = $('<input data-bind="invisible:invisible" data-role="autocomplete"/>');

    var observable = kendo.observable({
        invisible: true
    });

    kendo.bind(dom, observable);

    ok(dom.data("kendoAutoComplete").wrapper.css("display") == "none", "Display is 'none'");
});

test("binding invisible to false shows the widget", function() {
    dom = $('<input data-bind="invisible:invisible" data-role="autocomplete" style="display:none"/>');

    var observable = kendo.observable({
        invisible: false
    });

    kendo.bind(dom, observable);

    ok(dom.data("kendoAutoComplete").wrapper.css("display") != "none", "Display is not 'none'");
});

test("changing invisible to true hides the widget", function() {
    dom = $('<input data-bind="invisible:invisible" data-role="autocomplete"/>');

    var observable = kendo.observable({
        invisible: false
    });

    kendo.bind(dom, observable);
    observable.set("invisible", true);

    ok(dom.data("kendoAutoComplete").wrapper.css("display") == "none", "Display is 'none'");
});

test("changing invisible to false shows the widget", function() {
    dom = $('<input data-bind="invisible:invisible" data-role="autocomplete"/>');

    var observable = kendo.observable({
        invisible: true
    });

    kendo.bind(dom, observable);
    observable.set("invisible", false);

    ok(dom.data("kendoAutoComplete").wrapper.css("display") != "none", "Display is not 'none'");
});


test("binding enabled to false disables the widget", function() {
    dom = $('<input data-bind="enabled:enabled" data-role="autocomplete"/>');

    var observable = kendo.observable({
        enabled: false
    });

    kendo.bind(dom, observable);

    ok(dom.is(":disabled"));
});
test("binding visible to false hides the widget", function() {
    dom = $('<input data-bind="visible:visible" data-role="autocomplete"/>');

    var observable = kendo.observable({
        visible: false
    });

    kendo.bind(dom, observable);

    ok(dom.data("kendoAutoComplete").wrapper.css("display") == "none", "Display is 'none'");
});

test("binding visible to true shows the widget", function() {
    dom = $('<input data-bind="visible:visible" data-role="autocomplete" style="display:none"/>');

    var observable = kendo.observable({
        visible: true
    });

    kendo.bind(dom, observable);

    ok(dom.data("kendoAutoComplete").wrapper.css("display") != "none", "Display is not 'none'");
});

test("changing visible to false hides the widget", function() {
    dom = $('<input data-bind="visible:visible" data-role="autocomplete"/>');

    var observable = kendo.observable({
        visible: true
    });

    kendo.bind(dom, observable);
    observable.set("visible", false);

    ok(dom.data("kendoAutoComplete").wrapper.css("display") == "none", "Display is 'none'");
});

test("changing visible to true shows the widget", function() {
    dom = $('<input data-bind="visible:visible" data-role="autocomplete"/>');

    var observable = kendo.observable({
        visible: false
    });

    kendo.bind(dom, observable);
    observable.set("visible", true);

    ok(dom.data("kendoAutoComplete").wrapper.css("display") != "none", "Display is not 'none'");
});


test("binding enabled to false disables the widget", function() {
    dom = $('<input data-bind="enabled:enabled" data-role="autocomplete"/>');

    var observable = kendo.observable({
        enabled: false
    });

    kendo.bind(dom, observable);

    ok(dom.is(":disabled"));
});

test("binding enabled to true enables the widget", function() {
    dom = $('<input data-bind="enabled:enabled" disabled="disabled" data-role="autocomplete" />');

    var observable = kendo.observable({
        enabled: true
    });

    kendo.bind(dom, observable);

    ok(!dom.is(":disabled"));
});

test("binding disable to true disables the widget", function() {
    dom = $('<input data-bind="disabled:disabled" disabled="disabled" data-role="autocomplete" />');

    var observable = kendo.observable({
        disabled: false
    });

    kendo.bind(dom, observable);

    ok(!dom.is(":disabled"));
});

test("binding disabled to false enables the widget", function() {
    dom = $('<input data-bind="disabled:disabled" data-role="autocomplete" />');

    var observable = kendo.observable({
        disabled: true
    });

    kendo.bind(dom, observable);

    ok(dom.is(":disabled"));
});

test("setting non existing binding throws an error", function() {
    dom = $('<input data-bind="nonexisting:foo" data-role="autocomplete" />');

    throws(function() { kendo.bind(dom, {}); }, "Error is not thrown");
});

test("assign to DataSource as ViewModel field", function() {
    dom = $('<input data-text-field="text" data-bind="source:dataSource" data-role="autocomplete" />');

    var dataSource = new kendo.data.DataSource({
        data: [{text:"foo"}, {text:"bar"}]
    });

    var observable = kendo.observable({
        dataSource: dataSource
    });

    kendo.bind(dom, observable);
    var autocomplete = dom.data("kendoAutoComplete");

    strictEqual(autocomplete.dataSource, dataSource);
});

}());
