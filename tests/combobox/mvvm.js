(function() {

var dom;

describe("combobox mvvm", function () {
  beforeEach(function() {
      Mocha.fixture.append(
        '<script id="template" type="text/x-kendo-template">' +
        '    <strong>#:text#</strong>' +
        '</script>' +
        '<script id="template-with-attributes" type="text/x-kendo-template">' +
        '    <strong data-bind="text:text"></strong>' +
        '</script>' +
        '<script id="headerTemplate" type="text/x-kendo-template">' +
        '    <strong>Title</strong>' +
        '</script>'
      );

      window.dataBound = function() {
          assert.isOk(true);
      }
  });
  afterEach(function() {
      delete window.dataBound;

      kendo.destroy(dom);
      kendo.destroy(Mocha.fixture);
  });

it("initializes a combobox when data role is combobox", function() {
    dom = $('<select data-role="combobox"/>');

    kendo.bind(dom);

    assert.isOk(dom.data("kendoComboBox") instanceof kendo.ui.ComboBox);
});

it("initializes options from data attributes", function() {
    dom = $('<select data-role="combobox" data-text-field="foo" data-value-field="bar"/>');

    kendo.bind(dom);

    var combobox = dom.data("kendoComboBox");

    assert.equal(combobox.options.dataTextField, "foo");
    assert.equal(combobox.options.dataValueField, "bar");
});

it("initalizes data source", function() {
    dom = $('<select data-role="combobox" data-bind="source:items" />');

    kendo.bind(dom, { items: ["foo", "bar"] } );

    assert.equal(dom.data("kendoComboBox").dataSource.view()[0], "foo");
    assert.equal(dom.data("kendoComboBox").dataSource.view()[1], "bar");
});

it("initalizes value from view model", function() {
    dom = $('<select data-role="combobox" data-bind="value:value, source:items" />');

    kendo.bind(dom, { items: ["foo", "bar"], value: "bar" } );

    assert.equal(dom.data("kendoComboBox").value(), "bar");
});

it("initalizes complex value from view model", function() {
    dom = $('<select data-value-field="text" data-role="combobox" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
    observable.value = observable.items[1];

    kendo.bind(dom, observable);

    assert.equal(dom.data("kendoComboBox").value(), "bar");
});

it("changing a value updates the view model", function() {
    dom = $('<select data-value-field="text" data-role="combobox" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
    observable.value = observable.items[1];

    kendo.bind(dom, observable);
    dom.data("kendoComboBox").select(0);
    dom.data("kendoComboBox").trigger("change");

    assert.equal(observable.value, observable.items[0]);
});

it("uses data value field if data-value-primitive is set to true", function() {
    dom = $('<select data-value-field="text" data-value-primitive="true" data-role="combobox" data-bind="value:value,source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
    observable.value = observable.items[1];

    kendo.bind(dom, observable);
    dom.data("kendoComboBox").select(0);
    dom.data("kendoComboBox").trigger("change");

    assert.equal(observable.value, observable.items[0].text);
});

it("changing value to a custom one updates the view model", function() {
    dom = $('<select data-text-field="text" data-role="combobox" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });

    observable.value = observable.items[1];

    kendo.bind(dom, observable);
    dom.data("kendoComboBox").value("moo");
    dom.data("kendoComboBox").trigger("change");

    assert.equal(observable.value, "moo");
});

it("custom view model value", function() {
    dom = $('<select data-text-field="text" data-role="combobox" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
    observable.value = "moo";

    kendo.bind(dom, observable);
    assert.equal(dom.data("kendoComboBox").value(), "moo");
});
it("binding combobox initialized before binding", function() {
    dom = $('<select data-value-field="text" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
    observable.value = observable.items[1];

    dom.kendoComboBox();

    kendo.bind(dom, observable);

    assert.equal(dom.data("kendoComboBox").value(), "bar");
});

it("binding combobox initialized after binding", function() {
    dom = $('<select data-value-field="text" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
    observable.value = observable.items[1];

    kendo.bind(dom, observable);

    dom.kendoComboBox();

    assert.equal(dom.data("kendoComboBox").value(), "bar");
});

it("value binding honors autoBind:false option when valuePrimitive is true", function() {
    dom = $('<input data-role="combobox" data-value-field="text" data-text-field="text" data-auto-bind="false" data-value-primitive="true" data-bind="value:value, source:items" />');

    var observable = kendo.observable({
        items: new kendo.data.DataSource([{text:"foo"}, {text:"bar"}]),
        value: "bar"
    });

    kendo.bind(dom, observable);

    var widget = dom.data("kendoComboBox");

    assert.equal(widget.value(), "bar");
    assert.equal(widget.text(), "bar");
});

it("value binding displays options.text when autoBind:false and valuePrimitive is true", function() {
    dom = $('<input data-role="combobox" data-value-field="text" data-text-field="text" data-auto-bind="false" data-text="selected text" data-value-primitive="true" data-bind="value:value, source:items" />');

    var observable = kendo.observable({
        items: new kendo.data.DataSource([{text:"foo"}, {text:"bar"}]),
        value: "bar"
    });

    kendo.bind(dom, observable);

    var widget = dom.data("kendoComboBox");

    assert.equal(widget.value(), "bar");
    assert.equal(widget.text(), "selected text");
});

it("value binding honors autoBind:false option when valuePrimitive is false", function() {
    dom = $('<input data-role="combobox" data-value-field="value" data-text-field="text" data-auto-bind="false" data-value-primitive="false" data-bind="value:value, source:items" />');

    var items = new kendo.data.ObservableArray([{text:"foo", value: 1}, {text:"bar", value: 2}]);
    var observable = kendo.observable({
        items: new kendo.data.DataSource({ data: items })
    });
    observable.value = items[1];

    kendo.bind(dom, observable);

    var widget = dom.data("kendoComboBox");

    assert.equal(widget.value(), "2");
    assert.equal(widget.text(), "bar");
});

it("value binding with autoBind:false and valuePrimitive:false sets placeholder", function() {
    dom = $('<input data-role="combobox" data-value-field="value" data-text-field="text" data-auto-bind="false" data-value-primitive="false" data-bind="value:value, source:items" />');

    var items = new kendo.data.ObservableArray([{text:"foo", value: 1}, {text:"bar", value: 2}]);
    var observable = kendo.observable({
        items: new kendo.data.DataSource({ data: items })
    });
    observable.value = items[1];

    kendo.bind(dom, observable);

    var widget = dom.data("kendoComboBox");

    stub(widget, {
        _placeholder: widget._placeholder
    });

    observable.set("value", null);

    assert.equal(widget.calls("_placeholder"), 1);
});

it("widget sets value if source is bound even when autoBind: false is set", function() {
    dom = $('<input data-role="combobox" data-value-field="value" data-text-field="text" data-auto-bind="false" data-value-primitive="false" data-bind="value:value, source:items" />').appendTo(Mocha.fixture);

    var items = new kendo.data.ObservableArray([{text:"foo", value: 1}, {text:"bar", value: 2}]);
    var observable = kendo.observable({
        items: items
    });
    observable.value = items[1];

    kendo.bind(dom, observable);

    var widget = dom.data("kendoComboBox");

    assert.equal(widget.select(), 1);
});

it("widget does not raise change event when value binding is used with autoBind:false", function() {
    dom = $('<input data-role="combobox" data-value-field="value" data-text-field="text" data-auto-bind="false" data-value-primitive="false" data-bind="value:value" />').appendTo(Mocha.fixture);

    var items = new kendo.data.ObservableArray([{text:"foo", value: 1}, {text:"bar", value: 2}]);
    var observable = kendo.observable({
        items: new kendo.data.DataSource({ data: items })
    });
    observable.value = items[1];

    kendo.bind(dom, observable);

    var widget = dom.data("kendoComboBox");

    widget.bind("change", function() {
        assert.isOk(false);
    });

    widget.input.focus().blur();
});

it("initialized widget with autoBind:false does not raise change on initial binding after value binding is applied", function() {
    dom = $('<input data-value-primitive="false" data-bind="value:value"/>').appendTo(Mocha.fixture);

    var items = new kendo.data.ObservableArray([{text:"foo", value: 1}, {text:"bar", value: 2}]);
    var observable = kendo.observable({
        value: items[1]
    });

    dom.kendoComboBox({
        autoBind: false,
        animation: false,
        optionLabel: { text:"Select a category...", value: -1 },
        dataTextField: "text",
        dataValueField: "value",
        dataSource: new kendo.data.DataSource({ data: items })
    });

    kendo.bind(dom, observable);

    var widget = dom.data("kendoComboBox");

    widget.bind("change", function() {
        assert.isOk(false);
    });

    widget.input.focus();
    widget.open();
    widget.input.focusout();
});

it("widget does not loose selected value on first bound when autoBind: false is used", function(done) {
    dom = $('<input data-role="combobox" data-value-field="value" data-text-field="text" data-auto-bind="false" data-value-primitive="false" data-bind="value:value, source:items" />');

    var items = new kendo.data.ObservableArray([{text:"foo", value: 1}, {text:"bar", value: 2}]);
    var observable = kendo.observable({
        items: new kendo.data.DataSource({ data: items })
    });

    observable.value = items[1];

    kendo.bind(dom, observable);

    var widget = dom.data("kendoComboBox");

    widget.bind("dataBound", function() {
        assert.equal(widget.value(), "2");
        assert.equal(widget.text(), "bar");
        assert.equal(widget.select(), 1);
        done();
    });

    widget.dataSource.read();
});

it("binding template", function() {
    dom = $('<select data-template="template" data-role="combobox" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

    kendo.bind(dom, observable);

    assert.equal(dom.data("kendoComboBox").ul.children().eq(0).html().trim(), "<strong>foo</strong>");
});

it("binding template containing binding attributes", function() {
    dom = $('<select data-role="combobox" data-template="template-with-attributes" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

    kendo.bind(dom, observable);

    assert.equal(dom.data("kendoComboBox").ul.children().eq(0).html().trim(), '<strong data-bind="text:text">foo</strong>');
});

it("updating an item from the data source updates the corresponding combobox item", function() {
    dom = $('<select data-role="combobox" data-template="template-with-attributes" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

    kendo.bind(dom, observable);

    observable.items[0].set("text", "baz");

    assert.equal(dom.data("kendoComboBox").ul.children().eq(0).text().trim(), "baz");
});

it("destroying binding targets when the datasource changes", function() {
    dom = $('<select data-role="combobox" data-template="template-with-attributes" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{ text:"foo"} ] });

    kendo.bind(dom, observable);
    dom.data("kendoComboBox").refresh();

    assert.equal(observable.items[0]._events["change"].length, 2); //1 for the text binding and 1 for the ObservableArray
});

it("binding header template", function() {
    dom = $('<select data-header-template="headerTemplate" data-role="combobox" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

    kendo.bind(dom, observable);

    assert.equal(dom.data("kendoComboBox").list.children(":first")[0].outerHTML.trim(), "<strong>Title</strong>");
});

it("removing items from the model updates the UI", function() {
    dom = $('<select data-bind="source:items" />');

    var observable = kendo.observable({ items: [{ text:"foo"},{ text: "bar" },{ text: "baz" }] });

    kendo.bind(dom, observable);

    dom.kendoComboBox();

    observable.items.splice(0,1);

    assert.equal(dom.data("kendoComboBox").ul.children().length, 2);
});

it("binding are removed if element is rebind", function() {
    dom = $('<select data-role="combobox" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{ text:"foo"},{ text: "bar" } ] });

    kendo.bind(dom, observable);

    var destroy = stub(dom[0].kendoBindingTarget, "destroy");

    kendo.bind(dom, observable);

    assert.equal(destroy.calls("destroy"), 1);
});

it("expressions are destroyed", function() {
    dom = $('<select data-role="combobox" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{ text:"foo"},{ text: "bar" } ] });

    kendo.bind(dom, observable);

    var destroy = stub(dom[0].kendoBindingTarget, "destroy");

    kendo.bind(dom, observable);

    assert.equal(destroy.calls("destroy"), 1);
});

it("destroys detaches the events to widget", function() {
    dom = $('<select data-role="combobox" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

    kendo.bind(dom, observable);
    kendo.unbind(dom);

    var combobox = dom.data("kendoComboBox");

    assert.equal(combobox._events["dataBound"].length, 0);
    assert.equal(combobox._events["dataBinding"].length, 0);
});


it("dataBound event is raised if attached as option", function() {
    dom = $('<select data-role="combobox" data-bound="dataBound" data-bind="source:items" />');

    var observable = kendo.observable({
        items: [{text:"foo"}, {text:"bar"}]
    });

    kendo.bind(dom, observable);
});

it("dataBound event is raised if attached as option to a already initialized combobox", function() {
    dom = $('<select data-bound="dataBound" data-bind="source:items" />').kendoComboBox();

    var observable = kendo.observable({
        items: [{text:"foo"}, {text:"bar"}]
    });

    kendo.bind(dom, observable);
});

it("binding enabled to false disables the widget", function() {
    dom = $('<select data-bind="enabled:enabled" data-role="combobox"/>');

    var observable = kendo.observable({
        enabled: false
    });

    kendo.bind(dom, observable);

    assert.isOk(dom.is(":disabled"));
});

it("binding enabled to true enables the widget", function() {
    dom = $('<select data-bind="enabled:enabled" disabled="disabled" data-role="combobox" />');

    var observable = kendo.observable({
        enabled: true
    });

    kendo.bind(dom, observable);

    assert.isOk(!dom.is(":disabled"));
});

it("binding disable to true disables the widget", function() {
    dom = $('<select data-bind="disabled:disabled" disabled="disabled" data-role="combobox" />');

    var observable = kendo.observable({
        disabled: false
    });

    kendo.bind(dom, observable);

    assert.isOk(!dom.is(":disabled"));
});

it("binding disabled to false enables the widget", function() {
    dom = $('<select data-bind="disabled:disabled" data-role="combobox" />');

    var observable = kendo.observable({
        disabled: true
    });

    kendo.bind(dom, observable);

    assert.isOk(dom.is(":disabled"));
});

it("binding invisible to true hides the widget", function() {
    dom = $('<select data-bind="invisible:invisible" data-role="combobox"/>');

    var observable = kendo.observable({
        invisible: true
    });

    kendo.bind(dom, observable);

    assert.isOk(dom.data("kendoComboBox").wrapper.css("display") == "none", "Display is 'none'");
});

it("binding invisible to false shows the widget", function() {
    dom = $('<select data-bind="invisible:invisible" data-role="combobox" style="display:none"/>');

    var observable = kendo.observable({
        invisible: false
    });

    kendo.bind(dom, observable);

    assert.isOk(dom.data("kendoComboBox").wrapper.css("display") != "none", "Display is not 'none'");
});

it("changing invisible to true hides the widget", function() {
    dom = $('<select data-bind="invisible:invisible" data-role="combobox"/>');

    var observable = kendo.observable({
        invisible: false
    });

    kendo.bind(dom, observable);
    observable.set("invisible", true);

    assert.isOk(dom.data("kendoComboBox").wrapper.css("display") == "none", "Display is 'none'");
});

it("changing invisible to false shows the widget", function() {
    dom = $('<select data-bind="invisible:invisible" data-role="combobox"/>');

    var observable = kendo.observable({
        invisible: true
    });

    kendo.bind(dom, observable);
    observable.set("invisible", false);

    assert.isOk(dom.data("kendoComboBox").wrapper.css("display") != "none", "Display is not 'none'");
});


it("binding enabled to false disables the widget", function() {
    dom = $('<select data-bind="enabled:enabled" data-role="combobox"/>');

    var observable = kendo.observable({
        enabled: false
    });

    kendo.bind(dom, observable);

    assert.isOk(dom.is(":disabled"));
});

it("binding visible to false hides the widget", function() {
    dom = $('<select data-bind="visible:visible" data-role="combobox"/>');

    var observable = kendo.observable({
        visible: false
    });

    kendo.bind(dom, observable);

    assert.isOk(dom.data("kendoComboBox").wrapper.css("display") == "none", "Display is 'none'");
});

it("binding visible to true shows the widget", function() {
    dom = $('<select data-bind="visible:visible" data-role="combobox" style="display:none"/>');

    var observable = kendo.observable({
        visible: true
    });

    kendo.bind(dom, observable);

    assert.isOk(dom.data("kendoComboBox").wrapper.css("display") != "none", "Display is not 'none'");
});

it("changing visible to false hides the widget", function() {
    dom = $('<select data-bind="visible:visible" data-role="combobox"/>');

    var observable = kendo.observable({
        visible: true
    });

    kendo.bind(dom, observable);
    observable.set("visible", false);

    assert.isOk(dom.data("kendoComboBox").wrapper.css("display") == "none", "Display is 'none'");
});

it("changing visible to true shows the widget", function() {
    dom = $('<select data-bind="visible:visible" data-role="combobox"/>');

    var observable = kendo.observable({
        visible: false
    });

    kendo.bind(dom, observable);
    observable.set("visible", true);

    assert.isOk(dom.data("kendoComboBox").wrapper.css("display") != "none", "Display is not 'none'");
});

it("assign to DataSource as ViewModel field", function() {
    dom = $('<select data-text-field="text" data-bind="source:dataSource" data-role="combobox" />');
    var dataSource = new kendo.data.DataSource({
        data: [{text:"foo"}, {text:"bar"}]
    });

    var observable = kendo.observable({
        dataSource: dataSource
    });

    kendo.bind(dom, observable);
    var combobox = dom.data("kendoComboBox");

    assert.strictEqual(combobox.dataSource, dataSource);

    assert.equal(combobox.ul.children().eq(0).text().trim(), "foo");
    assert.equal(combobox.ul.children().eq(1).text().trim(), "bar");
});

it("Enter custom value after re bind", function() {
    dom = $('<select data-text-field="text" data-value-field="text" data-bind="source:dataSource" data-role="combobox" />');
    var dataSource = new kendo.data.DataSource({
        data: [{text:"foo"}, {text:"bar"}]
    });

    var observable = kendo.observable({
        dataSource: dataSource
    });

    kendo.bind(dom, observable);
    var combobox = dom.data("kendoComboBox");

    combobox.value("custom");

    dataSource.add({ text: "custom"});

    combobox.value("custom2");

    assert.equal(dataSource.data().length, 3);
    assert.equal(combobox.value(), "custom2");
});

it("widget with autoBind:false does not select first item when model value is null", function() {
    dom = $('<input data-index="0" data-auto-bind="false" data-text-field="text" data-value-field="text" data-bind="value:bar,source:items" data-role="combobox" />');

    var observable = kendo.observable({
        items: new kendo.data.DataSource({ data: [{text:"foo"}, {text:"bar"}] }),
        bar: null
    });

    kendo.bind(dom, observable);
    var combobox = dom.data("kendoComboBox");

    combobox.dataSource.read();

    assert.equal(combobox.select(), -1);
});

//virtuazation helpers

function generateData(parameters) {
    var items = [];
    for (var i = parameters.skip, len = parameters.skip + parameters.take; i < len; i++) {
        items.push({
            id: i,
            value: i,
            text: "Item " + i
        });
    }

    return items;
}

function createAsyncDataSource() {
    return new kendo.data.DataSource({
        transport: {
            read: function(options) {
                setTimeout(function() {
                    options.success({ data: generateData(options.data), total: 300 });
                }, 0);
            }
        },
        serverPaging: true,
        serverFiltering: true,
        pageSize: 40,
        schema: {
            data: "data",
            total: "total"
        }
    });
}

it("triggers change after same value is being set multiple times trough the ViewModel", function(done) {
    dom = $('<input ' +
            'data-role="combobox" ' +
            'data-auto-bind="false" ' +
            'data-animation="false" ' +
            'data-text-field="text" ' +
            'data-value-field="value" ' +
            'data-virtual="{itemHeight: 20, valueMapper: function(o) { o.success(o.value); }}" ' +
            'data-value-primitive="true" ' +
            'data-bind="value:Invoice.orderId, source: ds"/>');

    var vm = kendo.observable({
        ds: createAsyncDataSource(),
        Invoice: { value: null },
        setFoo: function(){
            this.set('Invoice', { value: 2 });
        },
        setBar: function(){
            this.set('Invoice', { value : 2 });
        }
    });

    kendo.bind(dom, vm);

    var combo = dom.data("kendoComboBox");

    combo.dataSource.read().done(function() {
        vm.setFoo();
        vm.setBar();
        combo.bind("change", function() {
            assert.isOk(true, "Widget change is fired");
            assert.equal(this.value(), 3);
            done();
        });

        combo.open();
        $("[data-offset-index=3]").trigger("click");
    });
});
it("visible input inherits select's minlength attribute ", function() {
    dom = $('<select minlength="3" data-role="combobox"/>');

    kendo.bind(dom);

    assert.equal(dom.data("kendoComboBox").input.prop("minlength"), dom.prop("minlength"));
});
it("popup option can be successfully set through data attribute", function() {
    dom = $('<select data-popup="{ origin: \'top left\', position: \'bottom left\' }" data-role="combobox" />');

    var observable = kendo.observable({});

    kendo.bind(dom, observable);
    var combobox = dom.data("kendoComboBox");

    assert.equal(combobox.options.popup.origin, "top left");
    assert.equal(combobox.options.popup.position, "bottom left");
});
    });
}());
