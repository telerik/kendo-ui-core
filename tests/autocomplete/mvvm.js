(function(){

var dom;

describe("autocomplete mvvm", function () {
  beforeEach(function() {
      Mocha.fixture.append(
        '<script id="template" type="text/x-kendo-template">' +
        '    <strong>#:text#</strong>' +
        '</script>' +
        '<script id="template-with-attributes" type="text/x-kendo-template">' +
        '    <strong data-bind="text:text"></strong>' +
        '</script>'
      );

      window.dataBound = function() {
          assert.isOk(true);
      }
  });
  afterEach(function() {
      delete window.dataBound;
      kendo.destroy(dom);
  });

it("initializes a autocomplete when data role is autocomplete", function() {
    dom = $('<input data-role="autocomplete"/>');

    kendo.bind(dom);

    assert.isOk(dom.data("kendoAutoComplete") instanceof kendo.ui.AutoComplete);
});

it("initializes a options from data attributes", function() {
    dom = $('<input data-role="autocomplete" data-text-field="foo" />');

    kendo.bind(dom);

    var autocomplete = dom.data("kendoAutoComplete");

    assert.equal(autocomplete.options.dataTextField, "foo");
});

it("initializes data source", function() {
    dom = $('<input data-role="autocomplete" data-bind="source:items" />');

    kendo.bind(dom, { items: ["foo", "bar"] } );

    assert.equal(dom.data("kendoAutoComplete").dataSource.view()[0], "foo");
    assert.equal(dom.data("kendoAutoComplete").dataSource.view()[1], "bar");
});

it("initializes value from view model", function() {
    dom = $('<input data-role="autocomplete" data-bind="value:value, source:items" />');

    kendo.bind(dom, { items: ["foo", "bar"], value: "bar" } );

    assert.equal(dom.data("kendoAutoComplete").value(), "bar");
});

it("initializes complex value from view model", function() {
    dom = $('<input data-text-field="text" data-role="autocomplete" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
    observable.value = observable.items[1];

    kendo.bind(dom, observable);

    assert.equal(dom.data("kendoAutoComplete").value(), "bar");
});

it("changing a value updates the view model", function() {
    dom = $('<input data-text-field="text" data-role="autocomplete" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
    observable.value = observable.items[1];

    kendo.bind(dom, observable);
    dom.data("kendoAutoComplete").value("foo");
    dom.data("kendoAutoComplete").trigger("change");

    assert.equal(observable.value, observable.items[0]);
});

it("changing value to a custom one updates the view model", function() {
    dom = $('<input data-text-field="text" data-role="autocomplete" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });

    observable.value = observable.items[1];

    kendo.bind(dom, observable);
    dom.data("kendoAutoComplete").value("moo");
    dom.data("kendoAutoComplete").trigger("change");

    assert.equal(observable.value, "moo");
});

it("changing a value updates the view model if bound to simple value", function() {
    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: "foo" });

    dom = $('<input data-role="autocomplete" data-text-field="text" data-bind="value:value, source:items" />');

    kendo.bind(dom, observable);

    dom.data("kendoAutoComplete").value("bar");
    dom.data("kendoAutoComplete").trigger("change");

    assert.equal(observable.value, "bar");
});

it("custom view model value", function() {
    dom = $('<input data-text-field="text" data-role="autocomplete" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
    observable.value = "moo";

    kendo.bind(dom, observable);
    assert.equal(dom.data("kendoAutoComplete").value(), "moo");
});

it("setting existing view model value after custom value", function() {
    dom = $('<input data-text-field="text" data-role="autocomplete" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });

    kendo.bind(dom, observable);

    dom.data("kendoAutoComplete").value("moo");
    dom.data("kendoAutoComplete").trigger("change");

    dom.data("kendoAutoComplete").value("foo");
    dom.data("kendoAutoComplete").trigger("change");

    assert.equal(observable.value, observable.items[0]);
});

it("setting custom value after existing view model value", function() {
    dom = $('<input data-text-field="text" data-role="autocomplete" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });

    kendo.bind(dom, observable);

    dom.data("kendoAutoComplete").value("foo");
    dom.data("kendoAutoComplete").trigger("change");

    dom.data("kendoAutoComplete").value("moo");
    dom.data("kendoAutoComplete").trigger("change");

    assert.equal(observable.value, "moo");
});

it("binding autocomplete initialized before binding", function() {
    dom = $('<input data-text-field="text" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
    observable.value = observable.items[1];

    dom.kendoAutoComplete();

    kendo.bind(dom, observable);

    assert.equal(dom.data("kendoAutoComplete").value(), "bar");
});

it("binding autocomplete initialized after binding", function() {
    dom = $('<input data-text-field="text" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
    observable.value = observable.items[1];

    kendo.bind(dom, observable);

    dom.kendoAutoComplete({ dataTextField: "text" });

    assert.equal(dom.data("kendoAutoComplete").value(), "bar");
});

it("binding template", function() {
    dom = $('<input data-role="autocomplete" data-template="template" data-bind=" source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

    kendo.bind(dom, observable);

    assert.equal(dom.data("kendoAutoComplete").ul.children().eq(0).html().trim(), "<strong>foo</strong>");
});

it("binding template containing binding attributes", function() {
    dom = $('<input data-role="autocomplete" data-template="template-with-attributes" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

    kendo.bind(dom, observable);

    assert.equal(dom.data("kendoAutoComplete").ul.children().eq(0).html().trim(), '<strong data-bind="text:text">foo</strong>');
});

it("updating an item from the data source updates the corresponding autocomplete item", function() {
    dom = $('<input data-role="autocomplete" data-template="template-with-attributes" data-bind=" source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

    kendo.bind(dom, observable);

    observable.items[0].set("text", "baz");

    assert.equal(dom.data("kendoAutoComplete").ul.children().eq(0).text().trim(), "baz");
});

it("destroying binding targets when the datasource changes", function() {
    dom = $('<input data-role="autocomplete" data-template="template-with-attributes" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{ text:"foo"} ] });

    kendo.bind(dom, observable);
    dom.data("kendoAutoComplete").refresh();

    assert.equal(observable.items[0]._events["change"].length, 2); //1 for the text binding and 1 for the ObservableArray
});

it("removing items from the model updates the UI", function() {
    dom = $('<input data-bind="source:items" />');

    var observable = kendo.observable({ items: [{ text:"foo"},{ text: "bar" },{ text: "baz" }] });

    kendo.bind(dom, observable);

    dom.kendoAutoComplete();

    observable.items.splice(0,1);

    assert.equal(dom.data("kendoAutoComplete").ul.children().length, 2);
});

it("binding are removed if element is rebind", function() {
    dom = $('<input data-role="autocomplete" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{ text:"foo"},{ text: "bar" } ] });

    kendo.bind(dom, observable);

    var destroy = stub(dom[0].kendoBindingTarget, "destroy");

    kendo.bind(dom, observable);

    assert.equal(destroy.calls("destroy"), 1);
});

it("binding target is destroyed", function() {
    dom = $('<input data-role="autocomplete" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{ text:"foo"},{ text: "bar" } ] });

    kendo.bind(dom, observable);

    var destroy = stub(dom[0].kendoBindingTarget, "destroy");

    kendo.bind(dom, observable);

    assert.equal(destroy.calls("destroy"), 1);
});

it("destroys detaches the events to widget", function() {
    dom = $('<div data-role="autocomplete" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

    kendo.bind(dom, observable);
    kendo.unbind(dom);

    var autocomplete = dom.data("kendoAutoComplete");

    assert.equal(autocomplete._events["dataBound"].length, 0);
    assert.equal(autocomplete._events["dataBinding"].length, 0);
});


it("dataBound event is raised if attached as option", function() {
    dom = $('<div data-role="autocomplete" data-bound="dataBound" data-bind="source:items" />');

    var observable = kendo.observable({
        items: [{text:"foo"}, {text:"bar"}]
    });

    kendo.bind(dom, observable);
});

it("dataBound event is raised if attached as option to a already initialized autocomplete", function() {
    dom = $('<div data-bound="dataBound" data-bind="source:items" />').kendoAutoComplete();

    var observable = kendo.observable({
        items: [{text:"foo"}, {text:"bar"}]
    });

    kendo.bind(dom, observable);
});

it("binding invisible to true hides the widget", function() {
    dom = $('<input data-bind="invisible:invisible" data-role="autocomplete"/>');

    var observable = kendo.observable({
        invisible: true
    });

    kendo.bind(dom, observable);

    assert.isOk(dom.data("kendoAutoComplete").wrapper.css("display") == "none", "Display is 'none'");
});

it("binding invisible to false shows the widget", function() {
    dom = $('<input data-bind="invisible:invisible" data-role="autocomplete" style="display:none"/>');

    var observable = kendo.observable({
        invisible: false
    });

    kendo.bind(dom, observable);

    assert.isOk(dom.data("kendoAutoComplete").wrapper.css("display") != "none", "Display is not 'none'");
});

it("changing invisible to true hides the widget", function() {
    dom = $('<input data-bind="invisible:invisible" data-role="autocomplete"/>');

    var observable = kendo.observable({
        invisible: false
    });

    kendo.bind(dom, observable);
    observable.set("invisible", true);

    assert.isOk(dom.data("kendoAutoComplete").wrapper.css("display") == "none", "Display is 'none'");
});

it("changing invisible to false shows the widget", function() {
    dom = $('<input data-bind="invisible:invisible" data-role="autocomplete"/>');

    var observable = kendo.observable({
        invisible: true
    });

    kendo.bind(dom, observable);
    observable.set("invisible", false);

    assert.isOk(dom.data("kendoAutoComplete").wrapper.css("display") != "none", "Display is not 'none'");
});


it("binding enabled to false disables the widget", function() {
    dom = $('<input data-bind="enabled:enabled" data-role="autocomplete"/>');

    var observable = kendo.observable({
        enabled: false
    });

    kendo.bind(dom, observable);

    assert.isOk(dom.is(":disabled"));
});
it("binding visible to false hides the widget", function() {
    dom = $('<input data-bind="visible:visible" data-role="autocomplete"/>');

    var observable = kendo.observable({
        visible: false
    });

    kendo.bind(dom, observable);

    assert.isOk(dom.data("kendoAutoComplete").wrapper.css("display") == "none", "Display is 'none'");
});

it("binding visible to true shows the widget", function() {
    dom = $('<input data-bind="visible:visible" data-role="autocomplete" style="display:none"/>');

    var observable = kendo.observable({
        visible: true
    });

    kendo.bind(dom, observable);

    assert.isOk(dom.data("kendoAutoComplete").wrapper.css("display") != "none", "Display is not 'none'");
});

it("changing visible to false hides the widget", function() {
    dom = $('<input data-bind="visible:visible" data-role="autocomplete"/>');

    var observable = kendo.observable({
        visible: true
    });

    kendo.bind(dom, observable);
    observable.set("visible", false);

    assert.isOk(dom.data("kendoAutoComplete").wrapper.css("display") == "none", "Display is 'none'");
});

it("changing visible to true shows the widget", function() {
    dom = $('<input data-bind="visible:visible" data-role="autocomplete"/>');

    var observable = kendo.observable({
        visible: false
    });

    kendo.bind(dom, observable);
    observable.set("visible", true);

    assert.isOk(dom.data("kendoAutoComplete").wrapper.css("display") != "none", "Display is not 'none'");
});


it("binding enabled to false disables the widget", function() {
    dom = $('<input data-bind="enabled:enabled" data-role="autocomplete"/>');

    var observable = kendo.observable({
        enabled: false
    });

    kendo.bind(dom, observable);

    assert.isOk(dom.is(":disabled"));
});

it("binding enabled to true enables the widget", function() {
    dom = $('<input data-bind="enabled:enabled" disabled="disabled" data-role="autocomplete" />');

    var observable = kendo.observable({
        enabled: true
    });

    kendo.bind(dom, observable);

    assert.isOk(!dom.is(":disabled"));
});

it("binding disable to true disables the widget", function() {
    dom = $('<input data-bind="disabled:disabled" disabled="disabled" data-role="autocomplete" />');

    var observable = kendo.observable({
        disabled: false
    });

    kendo.bind(dom, observable);

    assert.isOk(!dom.is(":disabled"));
});

it("binding disabled to false enables the widget", function() {
    dom = $('<input data-bind="disabled:disabled" data-role="autocomplete" />');

    var observable = kendo.observable({
        disabled: true
    });

    kendo.bind(dom, observable);

    assert.isOk(dom.is(":disabled"));
});

it("setting non existing binding throws an error", function() {
    dom = $('<input data-bind="nonexisting:foo" data-role="autocomplete" />');

    assert.throws(function() { kendo.bind(dom, {}); }, "The nonexisting binding is not supported by the AutoComplete widget");
});

it("assign to DataSource as ViewModel field", function() {
    dom = $('<input data-text-field="text" data-bind="source:dataSource" data-role="autocomplete" />');

    var dataSource = new kendo.data.DataSource({
        data: [{text:"foo"}, {text:"bar"}]
    });

    var observable = kendo.observable({
        dataSource: dataSource
    });

    kendo.bind(dom, observable);
    var autocomplete = dom.data("kendoAutoComplete");

    assert.strictEqual(autocomplete.dataSource, dataSource);
});

it("popup option can be successfully set through data attribute", function() {
    dom = $('<input data-popup="{ origin: \'top left\', position: \'bottom left\' }" data-role="autocomplete" />');

    var observable = kendo.observable({});

    kendo.bind(dom, observable);
    var autocomplete = dom.data("kendoAutoComplete");

    assert.equal(autocomplete.options.popup.origin, "top left");
    assert.equal(autocomplete.options.popup.position, "bottom left");
});

    });
}());
