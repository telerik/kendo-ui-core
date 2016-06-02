(function() {

var dom;

module("combobox mvvm", {
  setup: function() {
      QUnit.fixture.append(
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
          ok(true);
      }
  },
  teardown: function() {
      delete window.dataBound;

      kendo.destroy(dom);
      kendo.destroy(QUnit.fixture);
  }
});

test("initializes a combobox when data role is combobox", function() {
    dom = $('<select data-role="combobox"/>');

    kendo.bind(dom);

    ok(dom.data("kendoComboBox") instanceof kendo.ui.ComboBox);
});

test("initializes options from data attributes", function() {
    dom = $('<select data-role="combobox" data-text-field="foo" data-value-field="bar"/>');

    kendo.bind(dom);

    var combobox = dom.data("kendoComboBox");

    equal(combobox.options.dataTextField, "foo");
    equal(combobox.options.dataValueField, "bar");
});

test("initalizes data source", function() {
    dom = $('<select data-role="combobox" data-bind="source:items" />');

    kendo.bind(dom, { items: ["foo", "bar"] } );

    equal(dom.data("kendoComboBox").dataSource.view()[0], "foo");
    equal(dom.data("kendoComboBox").dataSource.view()[1], "bar");
});

test("initalizes value from view model", function() {
    dom = $('<select data-role="combobox" data-bind="value:value, source:items" />');

    kendo.bind(dom, { items: ["foo", "bar"], value: "bar" } );

    equal(dom.data("kendoComboBox").value(), "bar");
});

test("initalizes complex value from view model", function() {
    dom = $('<select data-value-field="text" data-role="combobox" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
    observable.value = observable.items[1];

    kendo.bind(dom, observable);

    equal(dom.data("kendoComboBox").value(), "bar");
});

test("changing a value updates the view model", function() {
    dom = $('<select data-value-field="text" data-role="combobox" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
    observable.value = observable.items[1];

    kendo.bind(dom, observable);
    dom.data("kendoComboBox").select(0);
    dom.data("kendoComboBox").trigger("change");

    equal(observable.value, observable.items[0]);
});

test("uses data value field if data-value-primitive is set to true", function() {
    dom = $('<select data-value-field="text" data-value-primitive="true" data-role="combobox" data-bind="value:value,source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
    observable.value = observable.items[1];

    kendo.bind(dom, observable);
    dom.data("kendoComboBox").select(0);
    dom.data("kendoComboBox").trigger("change");

    equal(observable.value, observable.items[0].text);
});

test("changing value to a custom one updates the view model", function() {
    dom = $('<select data-text-field="text" data-role="combobox" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });

    observable.value = observable.items[1];

    kendo.bind(dom, observable);
    dom.data("kendoComboBox").value("moo");
    dom.data("kendoComboBox").trigger("change");

    equal(observable.value, "moo");
});

test("custom view model value", function() {
    dom = $('<select data-text-field="text" data-role="combobox" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
    observable.value = "moo";

    kendo.bind(dom, observable);
    equal(dom.data("kendoComboBox").value(), "moo");
});
test("binding combobox initialized before binding", function() {
    dom = $('<select data-value-field="text" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
    observable.value = observable.items[1];

    dom.kendoComboBox();

    kendo.bind(dom, observable);

    equal(dom.data("kendoComboBox").value(), "bar");
});

test("binding combobox initialized after binding", function() {
    dom = $('<select data-value-field="text" data-bind="value:value, source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
    observable.value = observable.items[1];

    kendo.bind(dom, observable);

    dom.kendoComboBox();

    equal(dom.data("kendoComboBox").value(), "bar");
});

test("value binding honors autoBind:false option when valuePrimitive is true", function() {
    dom = $('<input data-role="combobox" data-value-field="text" data-text-field="text" data-auto-bind="false" data-value-primitive="true" data-bind="value:value, source:items" />');

    var observable = kendo.observable({
        items: new kendo.data.DataSource([{text:"foo"}, {text:"bar"}]),
        value: "bar"
    });

    kendo.bind(dom, observable);

    var widget = dom.data("kendoComboBox");

    equal(widget.value(), "bar");
    equal(widget.text(), "bar");
});

test("value binding displays options.text when autoBind:false and valuePrimitive is true", function() {
    dom = $('<input data-role="combobox" data-value-field="text" data-text-field="text" data-auto-bind="false" data-text="selected text" data-value-primitive="true" data-bind="value:value, source:items" />');

    var observable = kendo.observable({
        items: new kendo.data.DataSource([{text:"foo"}, {text:"bar"}]),
        value: "bar"
    });

    kendo.bind(dom, observable);

    var widget = dom.data("kendoComboBox");

    equal(widget.value(), "bar");
    equal(widget.text(), "selected text");
});

test("value binding honors autoBind:false option when valuePrimitive is false", function() {
    dom = $('<input data-role="combobox" data-value-field="value" data-text-field="text" data-auto-bind="false" data-value-primitive="false" data-bind="value:value, source:items" />');

    var items = new kendo.data.ObservableArray([{text:"foo", value: 1}, {text:"bar", value: 2}]);
    var observable = kendo.observable({
        items: new kendo.data.DataSource({ data: items })
    });
    observable.value = items[1];

    kendo.bind(dom, observable);

    var widget = dom.data("kendoComboBox");

    equal(widget.value(), "2");
    equal(widget.text(), "bar");
});

test("value binding with autoBind:false and valuePrimitive:false sets placeholder", function() {
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

    equal(widget.calls("_placeholder"), 1);
});

test("widget sets value if source is bound even when autoBind: false is set", 1, function() {
    dom = $('<input data-role="combobox" data-value-field="value" data-text-field="text" data-auto-bind="false" data-value-primitive="false" data-bind="value:value, source:items" />').appendTo(QUnit.fixture);

    var items = new kendo.data.ObservableArray([{text:"foo", value: 1}, {text:"bar", value: 2}]);
    var observable = kendo.observable({
        items: items
    });
    observable.value = items[1];

    kendo.bind(dom, observable);

    var widget = dom.data("kendoComboBox");

    equal(widget.select(), 1);
});

test("widget does not raise change event when value binding is used with autoBind:false", 0, function() {
    dom = $('<input data-role="combobox" data-value-field="value" data-text-field="text" data-auto-bind="false" data-value-primitive="false" data-bind="value:value" />').appendTo(QUnit.fixture);

    var items = new kendo.data.ObservableArray([{text:"foo", value: 1}, {text:"bar", value: 2}]);
    var observable = kendo.observable({
        items: new kendo.data.DataSource({ data: items })
    });
    observable.value = items[1];

    kendo.bind(dom, observable);

    var widget = dom.data("kendoComboBox");

    widget.bind("change", function() {
        ok(false);
    });

    widget.input.focus().blur();
});

test("initialized widget with autoBind:false does not raise change on initial binding after value binding is applied", 0, function() {
    dom = $('<input data-value-primitive="false" data-bind="value:value"/>').appendTo(QUnit.fixture);

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
        ok(false);
    });

    widget.input.focus();
    widget.open();
    widget.input.focusout();
});

asyncTest("widget does not loose selected value on first bound when autoBind: false is used", 3, function() {
    dom = $('<input data-role="combobox" data-value-field="value" data-text-field="text" data-auto-bind="false" data-value-primitive="false" data-bind="value:value, source:items" />');

    var items = new kendo.data.ObservableArray([{text:"foo", value: 1}, {text:"bar", value: 2}]);
    var observable = kendo.observable({
        items: new kendo.data.DataSource({ data: items })
    });

    observable.value = items[1];

    kendo.bind(dom, observable);

    var widget = dom.data("kendoComboBox");

    widget.bind("dataBound", function() {
        start();
        equal(widget.value(), "2");
        equal(widget.text(), "bar");
        equal(widget.select(), 1);
    });

    widget.dataSource.read();
});

test("binding template", function() {
    dom = $('<select data-template="template" data-role="combobox" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

    kendo.bind(dom, observable);

    equal($.trim(dom.data("kendoComboBox").ul.children().eq(0).html()), "<strong>foo</strong>");
});

test("binding template containing binding attributes", function() {
    dom = $('<select data-role="combobox" data-template="template-with-attributes" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

    kendo.bind(dom, observable);

    equal($.trim(dom.data("kendoComboBox").ul.children().eq(0).html()), '<strong data-bind="text:text">foo</strong>');
});

test("updating an item from the data source updates the corresponding combobox item", function() {
    dom = $('<select data-role="combobox" data-template="template-with-attributes" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

    kendo.bind(dom, observable);

    observable.items[0].set("text", "baz");

    equal($.trim(dom.data("kendoComboBox").ul.children().eq(0).text()), "baz");
});

test("destroying binding targets when the datasource changes", function() {
    dom = $('<select data-role="combobox" data-template="template-with-attributes" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{ text:"foo"} ] });

    kendo.bind(dom, observable);
    dom.data("kendoComboBox").refresh();

    equal(observable.items[0]._events["change"].length, 2); //1 for the text binding and 1 for the ObservableArray
});

test("binding header template", function() {
    dom = $('<select data-header-template="headerTemplate" data-role="combobox" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

    kendo.bind(dom, observable);

    equal($.trim(dom.data("kendoComboBox").list.children(":first")[0].outerHTML), "<strong>Title</strong>");
});

test("removing items from the model updates the UI", function() {
    dom = $('<select data-bind="source:items" />');

    var observable = kendo.observable({ items: [{ text:"foo"},{ text: "bar" },{ text: "baz" }] });

    kendo.bind(dom, observable);

    dom.kendoComboBox();

    observable.items.splice(0,1);

    equal(dom.data("kendoComboBox").ul.children().length, 2);
});

test("binding are removed if element is rebind", 1, function() {
    dom = $('<select data-role="combobox" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{ text:"foo"},{ text: "bar" } ] });

    kendo.bind(dom, observable);

    var destroy = stub(dom[0].kendoBindingTarget, "destroy");

    kendo.bind(dom, observable);

    equal(destroy.calls("destroy"), 1);
});

test("expressions are destroyed", 1, function() {
    dom = $('<select data-role="combobox" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{ text:"foo"},{ text: "bar" } ] });

    kendo.bind(dom, observable);

    var destroy = stub(dom[0].kendoBindingTarget, "destroy");

    kendo.bind(dom, observable);

    equal(destroy.calls("destroy"), 1);
});

test("destroys detaches the events to widget", function() {
    dom = $('<select data-role="combobox" data-bind="source:items" />');

    var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

    kendo.bind(dom, observable);
    kendo.unbind(dom);

    var combobox = dom.data("kendoComboBox");

    equal(combobox._events["dataBound"].length, 0);
    equal(combobox._events["dataBinding"].length, 0);
});


test("dataBound event is raised if attached as option", 2, function() {
    dom = $('<select data-role="combobox" data-bound="dataBound" data-bind="source:items" />');

    var observable = kendo.observable({
        items: [{text:"foo"}, {text:"bar"}]
    });

    kendo.bind(dom, observable);
});

test("dataBound event is raised if attached as option to a already initialized combobox", 1, function() {
    dom = $('<select data-bound="dataBound" data-bind="source:items" />').kendoComboBox();

    var observable = kendo.observable({
        items: [{text:"foo"}, {text:"bar"}]
    });

    kendo.bind(dom, observable);
});

test("binding enabled to false disables the widget", function() {
    dom = $('<select data-bind="enabled:enabled" data-role="combobox"/>');

    var observable = kendo.observable({
        enabled: false
    });

    kendo.bind(dom, observable);

    ok(dom.is(":disabled"));
});

test("binding enabled to true enables the widget", function() {
    dom = $('<select data-bind="enabled:enabled" disabled="disabled" data-role="combobox" />');

    var observable = kendo.observable({
        enabled: true
    });

    kendo.bind(dom, observable);

    ok(!dom.is(":disabled"));
});

test("binding disable to true disables the widget", function() {
    dom = $('<select data-bind="disabled:disabled" disabled="disabled" data-role="combobox" />');

    var observable = kendo.observable({
        disabled: false
    });

    kendo.bind(dom, observable);

    ok(!dom.is(":disabled"));
});

test("binding disabled to false enables the widget", function() {
    dom = $('<select data-bind="disabled:disabled" data-role="combobox" />');

    var observable = kendo.observable({
        disabled: true
    });

    kendo.bind(dom, observable);

    ok(dom.is(":disabled"));
});

test("binding invisible to true hides the widget", function() {
    dom = $('<select data-bind="invisible:invisible" data-role="combobox"/>');

    var observable = kendo.observable({
        invisible: true
    });

    kendo.bind(dom, observable);

    ok(dom.data("kendoComboBox").wrapper.css("display") == "none", "Display is 'none'");
});

test("binding invisible to false shows the widget", function() {
    dom = $('<select data-bind="invisible:invisible" data-role="combobox" style="display:none"/>');

    var observable = kendo.observable({
        invisible: false
    });

    kendo.bind(dom, observable);

    ok(dom.data("kendoComboBox").wrapper.css("display") != "none", "Display is not 'none'");
});

test("changing invisible to true hides the widget", function() {
    dom = $('<select data-bind="invisible:invisible" data-role="combobox"/>');

    var observable = kendo.observable({
        invisible: false
    });

    kendo.bind(dom, observable);
    observable.set("invisible", true);

    ok(dom.data("kendoComboBox").wrapper.css("display") == "none", "Display is 'none'");
});

test("changing invisible to false shows the widget", function() {
    dom = $('<select data-bind="invisible:invisible" data-role="combobox"/>');

    var observable = kendo.observable({
        invisible: true
    });

    kendo.bind(dom, observable);
    observable.set("invisible", false);

    ok(dom.data("kendoComboBox").wrapper.css("display") != "none", "Display is not 'none'");
});


test("binding enabled to false disables the widget", function() {
    dom = $('<select data-bind="enabled:enabled" data-role="combobox"/>');

    var observable = kendo.observable({
        enabled: false
    });

    kendo.bind(dom, observable);

    ok(dom.is(":disabled"));
});

test("binding visible to false hides the widget", function() {
    dom = $('<select data-bind="visible:visible" data-role="combobox"/>');

    var observable = kendo.observable({
        visible: false
    });

    kendo.bind(dom, observable);

    ok(dom.data("kendoComboBox").wrapper.css("display") == "none", "Display is 'none'");
});

test("binding visible to true shows the widget", function() {
    dom = $('<select data-bind="visible:visible" data-role="combobox" style="display:none"/>');

    var observable = kendo.observable({
        visible: true
    });

    kendo.bind(dom, observable);

    ok(dom.data("kendoComboBox").wrapper.css("display") != "none", "Display is not 'none'");
});

test("changing visible to false hides the widget", function() {
    dom = $('<select data-bind="visible:visible" data-role="combobox"/>');

    var observable = kendo.observable({
        visible: true
    });

    kendo.bind(dom, observable);
    observable.set("visible", false);

    ok(dom.data("kendoComboBox").wrapper.css("display") == "none", "Display is 'none'");
});

test("changing visible to true shows the widget", function() {
    dom = $('<select data-bind="visible:visible" data-role="combobox"/>');

    var observable = kendo.observable({
        visible: false
    });

    kendo.bind(dom, observable);
    observable.set("visible", true);

    ok(dom.data("kendoComboBox").wrapper.css("display") != "none", "Display is not 'none'");
});

test("assign to DataSource as ViewModel field", function() {
    dom = $('<select data-text-field="text" data-bind="source:dataSource" data-role="combobox" />');
    var dataSource = new kendo.data.DataSource({
        data: [{text:"foo"}, {text:"bar"}]
    });

    var observable = kendo.observable({
        dataSource: dataSource
    });

    kendo.bind(dom, observable);
    var combobox = dom.data("kendoComboBox");

    strictEqual(combobox.dataSource, dataSource);

    equal($.trim(combobox.ul.children().eq(0).text()), "foo");
    equal($.trim(combobox.ul.children().eq(1).text()), "bar");
});

test("Enter custom value after re bind", function() {
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

    equal(dataSource.data().length, 3);
    equal(combobox.value(), "custom2");
});

test("widget with autoBind:false does not select first item when model value is null", function() {
    dom = $('<input data-index="0" data-auto-bind="false" data-text-field="text" data-value-field="text" data-bind="value:bar,source:items" data-role="combobox" />');

    var observable = kendo.observable({
        items: new kendo.data.DataSource({ data: [{text:"foo"}, {text:"bar"}] }),
        bar: null
    });

    kendo.bind(dom, observable);
    var combobox = dom.data("kendoComboBox");

    combobox.dataSource.read();

    equal(combobox.select(), -1);
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

asyncTest("triggers change after same value is being set multiple times trough the ViewModel", 2, function() {
    dom = $('<input ' +
            'data-role="combobox" ' +
            'data-auto-bind="false" ' +
            'data-animation="false" ' +
            'data-text-field="text" ' +
            'data-value-field="value" ' +
            'data-virtual="{itemHeight: 20, valueMapper: function(o) { console.log(1); o.success(o.value); }}" ' +
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
            start();
            ok(true, "Widget change is fired");
            equal(this.value(), 3);
        });

        combo.open();
        $("[data-offset-index=3]").trigger("click");
    });
});
test("visible input inherits select's minlength attribute ", function() {
    dom = $('<select minlength="3" data-role="combobox"/>');

    kendo.bind(dom);

    equal(dom.data("kendoComboBox").input.prop("minlength"), dom.prop("minlength"));
});
})();
