import '@progress/kendo-ui/src/kendo.dropdownlist.js';
import '@progress/kendo-ui/src/kendo.binder.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let dropdownlist,
    dom;

describe('dropdownlist MVVM', function() {
    beforeEach(function() {

        window.ddlDataBound = function() {
            assert.isOk(true);
        };

        Mocha.fixture.html('<script id="template" type="text/x-kendo-template">\
                <strong>#:text#</strong>\
            </script>\
            <script id="template-with-attributes" type="text/x-kendo-template">\
                <strong data-bind="text:text"></strong>\
            </script>');
    });
    afterEach(function() {
        kendo.destroy(dom);
    });

    it("initializes a dropdownlist when data role is dropdownlist", function() {
        dom = $('<select data-role="dropdownlist"/>');

        kendo.bind(dom);

        assert.isOk(dom.data("kendoDropDownList") instanceof kendo.ui.DropDownList);
    });

    it("initializes options from data attributes", function() {
        dom = $('<select data-role="dropdownlist" data-text-field="foo" data-value-field="bar"/>');

        kendo.bind(dom);

        dropdownlist = dom.data("kendoDropDownList");

        assert.equal(dropdownlist.options.dataTextField, "foo");
        assert.equal(dropdownlist.options.dataValueField, "bar");
    });

    it("initializes data source", function() {
        dom = $('<select data-role="dropdownlist" data-bind="source:items" />');

        kendo.bind(dom, { items: ["foo", "bar"] });

        assert.equal(dom.data("kendoDropDownList").dataSource.view()[0], "foo");
        assert.equal(dom.data("kendoDropDownList").dataSource.view()[1], "bar");
    });

    it("initializes value from view model", function() {
        dom = $('<select data-role="dropdownlist" data-bind="value:value,source:items" />');

        kendo.bind(dom, { items: ["foo", "bar"], value: "bar" });

        assert.equal(dom.data("kendoDropDownList").value(), "bar");
    });

    it("selects first item on source binding", function() {
        dom = $('<select data-role="dropdownlist" data-bind="source:items" />');

        kendo.bind(dom, { items: ["foo", "bar"] });

        assert.equal(dom.data("kendoDropDownList").value(), "foo");
    });

    it("initializes complex value from view model", function() {
        dom = $('<select data-value-field="text" data-role="dropdownlist" data-bind="value:value,source:items" />');

        let observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }], value: null });
        observable.value = observable.items[1];

        kendo.bind(dom, observable);

        assert.equal(dom.data("kendoDropDownList").value(), "bar");
    });

    it("changing a value updates the view model", function() {
        dom = $('<select data-value-field="text" data-role="dropdownlist" data-bind="value:value,source:items" />');

        let observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }], value: null });
        observable.value = observable.items[1];

        kendo.bind(dom, observable);
        dom.data("kendoDropDownList").select(0);
        dom.data("kendoDropDownList").trigger("change");

        assert.equal(observable.value, observable.items[0]);
    });

    it("changing a value updates the view model with object when source is grouped", function() {
        dom = $('<select data-value-field="text" data-role="dropdownlist" data-bind="value:value,source:items" />');

        let data = new kendo.data.ObservableArray([{ text: "foo", value: 1 }, { text: "bar", value: 2 }]);
        let observable = kendo.observable({
            items: new kendo.data.DataSource({
                data: data,
                group: { field: "value" }
            }),
            value: null
        });

        kendo.bind(dom, observable);
        dom.data("kendoDropDownList").select(0);
        dom.data("kendoDropDownList").trigger("change");

        assert.equal(observable.value, data[0]);
    });

    it("uses data value field if data-value-primitive is set to true", function() {
        dom = $('<select data-value-field="text" data-value-primitive="true" data-role="dropdownlist" data-bind="value:value,source:items" />');

        let observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }], value: null });
        observable.value = observable.items[1];

        kendo.bind(dom, observable);
        dom.data("kendoDropDownList").select(0);
        dom.data("kendoDropDownList").trigger("change");

        assert.equal(observable.value, observable.items[0].text);
    });

    it("display optionLabel when value and text are not defined", function() {
        dom = $('<select data-value-field="value" data-text-field="text" data-auto-bind="false" data-option-label="test" data-value-primitive="true" data-role="dropdownlist" data-bind="value:value,source:items" />');

        let observable = kendo.observable({ items: new kendo.data.DataSource([{ text: "foo", value: 1 }, { text: "bar", value: 2 }]), value: null });

        kendo.bind(dom, observable);
        let widget = dom.data("kendoDropDownList");

        assert.equal(widget.text(), "test");
    });

    it("widget datasource is use if source binding is not set", function() {
        let observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }], value: null });
        observable.value = observable.items[1];


        dom = $('<select data-value-field="text" data-bind="value:value" />')
            .kendoDropDownList({
                dataSource: observable.items
            });

        kendo.bind(dom, observable);

        dom.data("kendoDropDownList").select(0);
        dom.data("kendoDropDownList").trigger("change");

        assert.equal(observable.value, observable.items[0]);
    });

    it("changing a value updates the view model if bound to simple value", function() {
        let observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }], value: null });

        dom = $('<select data-role="dropdownlist" data-value-field="text" data-bind="value:value, source:items" />');
        observable.value = "foo";

        kendo.bind(dom, observable);

        dom.data("kendoDropDownList").select(1);
        dom.data("kendoDropDownList").trigger("change");

        assert.equal(observable.value, "bar");
    });

    it("binding dropdownlist initialized before binding", function() {
        dom = $('<select data-value-field="text" data-bind="value:value,source:items" />');

        let observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }], value: null });
        observable.value = observable.items[1];

        dom.kendoDropDownList();

        kendo.bind(dom, observable);

        assert.equal(dom.data("kendoDropDownList").value(), "bar");
    });

    it("binding dropdownlist initialized after binding", function() {
        dom = $('<select data-value-field="text" data-bind="value:value,source:items" />');

        let observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }], value: null });
        observable.value = observable.items[1];

        kendo.bind(dom, observable);

        dom.kendoDropDownList({ dataValueField: "text" });

        assert.equal(dom.data("kendoDropDownList").value(), "bar");
    });

    it("value binding with autobind:false and valueprimitive:true binds source when selected text is not defined", function() {
        dom = $('<input data-role="dropdownlist" data-value-field="value" data-text-field="text" data-auto-bind="false" data-value-primitive="true" data-bind="value:value, source:items" />');

        let observable = kendo.observable({
            items: new kendo.data.DataSource({
                data: [{ text: "foo", value: "1" }, { text: "bar", value: "2" }]
            }),
            value: "2"
        });

        kendo.bind(dom, observable);

        let widget = dom.data("kendoDropDownList");

        assert.equal(widget.dataSource.view().length, 2);
        assert.equal(widget.value(), "2");
        assert.equal(widget.text(), "bar");
    });

    it("value binding with autobind:false and valueprimitive:true binds source when selected text is not defined and value is '0'", function() {
        dom = $('<input data-role="dropdownlist" data-value-field="value" data-text-field="text" data-auto-bind="false" data-value-primitive="true" data-bind="value:value, source:items" />');

        let observable = kendo.observable({
            items: new kendo.data.DataSource({
                data: [{ text: "foo", value: "1" }, { text: "bar", value: 0 }]
            }),
            value: 0
        });

        kendo.bind(dom, observable);

        let widget = dom.data("kendoDropDownList");

        assert.equal(widget.dataSource.view().length, 2);
        assert.equal(widget.value(), "0");
        assert.equal(widget.text(), "bar");
    });

    it("value binding displays options.text when autoBind:false and valuePrimitive is true", function() {
        dom = $('<input data-role="dropdownlist" data-value-field="value" data-text-field="text" data-auto-bind="false" data-text="selected text" data-value-primitive="true" data-bind="value:value, source:items" />');

        let observable = kendo.observable({
            items: new kendo.data.DataSource({
                data: [{ text: "foo" }, { text: "bar" }]
            }),
            value: "bar"
        });

        kendo.bind(dom, observable);

        let widget = dom.data("kendoDropDownList");

        assert.equal(widget.dataSource.view().length, 0);
        assert.equal(widget.value(), "bar");
        assert.equal(widget.text(), "selected text");
    });

    it("value binding honors autoBind:false option when valuePrimitive is false", function() {
        dom = $('<input data-role="dropdownlist" data-value-field="value" data-text-field="text" data-auto-bind="false" data-value-primitive="false" data-bind="value:value, source:items" />');

        let items = new kendo.data.ObservableArray([{ text: "foo", value: 1 }, { text: "bar", value: 2 }]);
        let observable = kendo.observable({
            items: new kendo.data.DataSource({ data: items })
        });
        observable.value = items[1];

        kendo.bind(dom, observable);

        let widget = dom.data("kendoDropDownList");

        assert.equal(widget.value(), "2");
        assert.equal(widget.text(), "bar");
    });

    it("source binding updates widgets value if value binding exists", function() {
        dom = $('<input data-role="dropdownlist" data-value-field="value" data-text-field="text" data-value-primitive="true" data-bind="value:value, source:items" />').appendTo(Mocha.fixture);

        let data = [{ text: "foo", value: "foo" }, { text: "bar", value: "bar" }];

        let observable = kendo.observable({
            items: [],
            value: ""
        });

        kendo.bind(dom, observable);

        observable.set("value", "bar");
        observable.set("items", data);

        let widget = dom.data("kendoDropDownList");

        assert.equal(widget.value(), "bar");
        assert.equal(widget.text(), "bar");
    });

    it("widget sets value if source is bound even when autoBind: false is set", function() {
        dom = $('<input data-role="dropdownlist" data-value-field="value" data-text-field="text" data-auto-bind="false" data-value-primitive="false" data-bind="value:value, source:items" />').appendTo(Mocha.fixture);

        let items = new kendo.data.ObservableArray([{ text: "foo", value: 1 }, { text: "bar", value: 2 }]);
        let observable = kendo.observable({
            items: items
        });
        observable.value = items[1];

        kendo.bind(dom, observable);

        let widget = dom.data("kendoDropDownList");

        assert.equal(widget.select(), 1);
    });

    it("widget does not raise change event when value binding is used with autoBind:false", function() {
        dom = $('<input data-role="dropdownlist" data-value-field="value" data-text-field="text" data-auto-bind="false" data-value-primitive="false" data-bind="value:value, source:items" />');

        let items = new kendo.data.ObservableArray([{ text: "foo", value: 1 }, { text: "bar", value: 2 }]);
        let observable = kendo.observable({
            items: new kendo.data.DataSource({ data: items })
        });
        observable.value = items[1];

        kendo.bind(dom, observable);

        let widget = dom.data("kendoDropDownList");

        widget.bind("change", function() {
            assert.isOk(false);
        });

        widget.wrapper.focus().blur();
    });

    it("initialized widget with autoBind:false does not raise change on initial binding after value binding is applied", function() {
        dom = $('<input data-value-primitive="false" data-bind="value:value"/>').appendTo(Mocha.fixture);

        let items = new kendo.data.ObservableArray([{ text: "foo", value: 1 }, { text: "bar", value: 2 }]);
        let observable = kendo.observable({
            value: items[1]
        });

        dom.kendoDropDownList({
            autoBind: false,
            animation: false,
            optionLabel: { text: "Select a category...", value: -1 },
            dataTextField: "text",
            dataValueField: "value",
            dataSource: new kendo.data.DataSource({ data: items })
        });

        kendo.bind(dom, observable);

        let widget = dom.data("kendoDropDownList");

        widget.bind("change", function() {
            assert.isOk(false);
        });

        widget.wrapper.focus();
        widget.open();
        widget.wrapper.focusout();
    });

    asyncTest("widget does not loose selected value on first bound when autoBind: false is used", function(done) {
        dom = $('<input data-role="dropdownlist" data-value-field="value" data-text-field="text" data-auto-bind="false" data-value-primitive="false" data-bind="value:value, source:items" />');

        let items = new kendo.data.ObservableArray([{ text: "foo", value: 1 }, { text: "bar", value: 2 }]);
        let observable = kendo.observable({
            items: new kendo.data.DataSource({ data: items })
        });

        observable.value = items[1];

        kendo.bind(dom, observable);

        let widget = dom.data("kendoDropDownList");

        widget.bind("dataBound", function() {
            done(() => {
                assert.equal(widget.value(), "2");
                assert.equal(widget.text(), "bar");
                assert.equal(widget.select(), 1);
            });
        });

        widget.dataSource.fetch();
    });

    it("removing items from the model updates the UI", function() {
        dom = $('<select data-bind="source:items" />');

        let observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }, { text: "baz" }] });

        kendo.bind(dom, observable);

        let ddl = new kendo.ui.DropDownList(dom);

        observable.items.splice(0, 1);

        assert.equal(dom.data("kendoDropDownList").ul.children().length, 2);
    });

    it("destroys detaches the events to widget", function() {
        dom = $('<div data-role="dropdownlist" data-bind="source:items" />');

        let observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

        kendo.bind(dom, observable);
        kendo.unbind(dom);

        dropdownlist = dom.data("kendoDropDownList");

        assert.equal(dropdownlist._events["dataBound"].length, 0);
        assert.equal(dropdownlist._events["dataBinding"].length, 0);
    });


    it("dataBound event is raised if attached as option", function() {
        dom = $('<div data-role="dropdownlist" data-bound="ddlDataBound" data-bind="source:items" />');

        let observable = kendo.observable({
            items: [{ text: "foo" }, { text: "bar" }]
        });

        kendo.bind(dom, observable);
    });

    it("dataBound event is raised if attached as option to a already initialized dropdownlist", function() {
        dom = $('<div data-bound="ddlDataBound" data-bind="source:items" />').kendoDropDownList();

        let observable = kendo.observable({
            items: [{ text: "foo" }, { text: "bar" }]
        });

        kendo.bind(dom, observable);
    });

    it("binding enabled to false disables the widget", function() {
        dom = $('<select data-bind="enabled:enabled" data-role="dropdownlist"/>');

        let observable = kendo.observable({
            enabled: false
        });

        kendo.bind(dom, observable);

        assert.isOk(dom.is(":disabled"));
    });

    it("binding enabled to true enables the widget", function() {
        dom = $('<select data-bind="enabled:enabled" disabled="disabled" data-role="dropdownlist" />');

        let observable = kendo.observable({
            enabled: true
        });

        kendo.bind(dom, observable);

        assert.isOk(!dom.is(":disabled"));
    });

    it("binding disable to true disables the widget", function() {
        dom = $('<select data-bind="disabled:disabled" disabled="disabled" data-role="dropdownlist" />');

        let observable = kendo.observable({
            disabled: false
        });

        kendo.bind(dom, observable);

        assert.isOk(!dom.is(":disabled"));
    });

    it("binding disabled to false enables the widget", function() {
        dom = $('<select data-bind="disabled:disabled" data-role="dropdownlist" />');

        let observable = kendo.observable({
            disabled: true
        });

        kendo.bind(dom, observable);

        assert.isOk(dom.is(":disabled"));
    });

    it("assign to DataSource as ViewModel field", function() {
        dom = $('<select data-text-field="text" data-bind="source:dataSource" data-role="dropdownlist" />');
        let dataSource = new kendo.data.DataSource({
            data: [{ text: "foo" }, { text: "bar" }]
        });

        let observable = kendo.observable({
            dataSource: dataSource
        });

        kendo.bind(dom, observable);
        dropdownlist = dom.data("kendoDropDownList");

        assert.strictEqual(dropdownlist.dataSource, dataSource);

        assert.equal(dropdownlist.ul.children().eq(0).text().trim(), "foo");
        assert.equal(dropdownlist.ul.children().eq(1).text().trim(), "bar");
    });

    it("ViewModel is updated when source is DataSource", function() {
        dom = $('<select data-value-field="text" data-bind="source:dataSource, value: selected" data-role="dropdownlist" />');
        let dataSource = new kendo.data.DataSource({
            data: [{ text: "foo" }, { text: "bar" }]
        });

        let observable = kendo.observable({
            dataSource: dataSource,
            selected: {}
        });

        kendo.bind(dom, observable);
        dropdownlist = dom.data("kendoDropDownList");
        dropdownlist.select(1);
        dropdownlist.trigger("change");

        assert.equal(observable.selected, observable.dataSource.data()[1]);
    });

    it("binding invisible to true hides the widget", function() {
        dom = $('<select data-bind="invisible:invisible" data-role="dropdownlist"/>');

        let observable = kendo.observable({
            invisible: true
        });

        kendo.bind(dom, observable);

        assert.isOk(dom.data("kendoDropDownList").wrapper.css("display") == "none", "Display is 'none'");
    });

    it("binding invisible to false shows the widget", function() {
        dom = $('<select data-bind="invisible:invisible" data-role="dropdownlist" style="display:none"/>');

        let observable = kendo.observable({
            invisible: false
        });

        kendo.bind(dom, observable);

        assert.isOk(dom.data("kendoDropDownList").wrapper.css("display") != "none", "Display is not 'none'");
    });

    it("changing invisible to true hides the widget", function() {
        dom = $('<select data-bind="invisible:invisible" data-role="dropdownlist"/>');

        let observable = kendo.observable({
            invisible: false
        });

        kendo.bind(dom, observable);
        observable.set("invisible", true);

        assert.isOk(dom.data("kendoDropDownList").wrapper.css("display") == "none", "Display is 'none'");
    });

    it("changing invisible to false shows the widget", function() {
        dom = $('<select data-bind="invisible:invisible" data-role="dropdownlist"/>');

        let observable = kendo.observable({
            invisible: true
        });

        kendo.bind(dom, observable);
        observable.set("invisible", false);

        assert.isOk(dom.data("kendoDropDownList").wrapper.css("display") != "none", "Display is not 'none'");
    });

    it("binding visible to false hides the widget", function() {
        dom = $('<select data-bind="visible:visible" data-role="dropdownlist"/>');

        let observable = kendo.observable({
            visible: false
        });

        kendo.bind(dom, observable);

        assert.isOk(dom.data("kendoDropDownList").wrapper.css("display") == "none", "Display is 'none'");
    });

    it("binding visible to true shows the widget", function() {
        dom = $('<select data-bind="visible:visible" data-role="dropdownlist" style="display:none"/>');

        let observable = kendo.observable({
            visible: true
        });

        kendo.bind(dom, observable);

        assert.isOk(dom.data("kendoDropDownList").wrapper.css("display") != "none", "Display is not 'none'");
    });

    it("changing visible to false hides the widget", function() {
        dom = $('<select data-bind="visible:visible" data-role="dropdownlist"/>');

        let observable = kendo.observable({
            visible: true
        });

        kendo.bind(dom, observable);
        observable.set("visible", false);

        assert.isOk(dom.data("kendoDropDownList").wrapper.css("display") == "none", "Display is 'none'");
    });

    it("changing visible to true shows the widget", function() {
        dom = $('<select data-bind="visible:visible" data-role="dropdownlist"/>');

        let observable = kendo.observable({
            visible: false
        });

        kendo.bind(dom, observable);
        observable.set("visible", true);

        assert.isOk(dom.data("kendoDropDownList").wrapper.css("display") != "none", "Display is not 'none'");
    });

    it("selecting the default value sets the view model field to null", function() {
        dom = $('<select data-bind="value:bar, source:items" data-role="dropdownlist" data-value-field="text" data-text-field="text" data-option-label="placeholder"/>');

        let observable = kendo.observable({
            items: [{ text: "foo" }, { text: "bar" }],
            bar: null
        });

        kendo.bind(dom, observable);
        dom.data("kendoDropDownList").select(1);
        dom.data("kendoDropDownList").trigger("change");

        dom.data("kendoDropDownList").select(0);
        dom.data("kendoDropDownList").trigger("change");
        assert.strictEqual(observable.bar, null);
    });

    it("selecting the default value sets the view model field to emtpy string", function() {
        dom = $('<select data-bind="value:bar, source:items" data-role="dropdownlist" data-value-field="text" data-text-field="text" data-option-label="placeholder"/>');

        let observable = kendo.observable({
            items: [{ text: "foo" }, { text: "bar" }],
            bar: ""
        });

        kendo.bind(dom, observable);
        dom.data("kendoDropDownList").select(1);
        dom.data("kendoDropDownList").trigger("change");

        dom.data("kendoDropDownList").select(0);
        dom.data("kendoDropDownList").trigger("change");
        assert.strictEqual(observable.bar, "");
    });

    it("assign to DataSource as ViewModel field", function() {
        dom = $('<select data-text-field="text" data-auto-bind="false" data-bind="source:dataSource" data-role="dropdownlist" />');
        let dataSource = new kendo.data.DataSource({
            data: [{ text: "foo" }, { text: "bar" }]
        });

        let observable = kendo.observable({
            dataSource: dataSource
        });

        kendo.bind(dom, observable);
        dropdownlist = dom.data("kendoDropDownList");

        assert.isOk(!dropdownlist.ul.children().length);
    });

    it("Widget sets optionLabel when source binding is used", function() {
        dom = $('<select data-text-field="text" data-option-label="test" data-bind="source:dataSource" data-role="dropdownlist" />');

        let observable = kendo.observable({
            dataSource: [{ text: "foo" }, { text: "bar" }]
        });

        kendo.bind(dom, observable);
        dropdownlist = dom.data("kendoDropDownList");

        assert.equal(dropdownlist.select(), 0);
        assert.equal(dropdownlist.text(), "test");
    });

    it("widget with autoBind:false does not select first item when model value is null", function() {
        dom = $('<input data-auto-bind="false" data-text-field="text" data-value-field="text" data-bind="value:bar,source:items" data-role="dropdownlist" />');

        let observable = kendo.observable({
            items: new kendo.data.DataSource({ data: [{ text: "foo" }, { text: "bar" }] }),
            bar: null
        });

        kendo.bind(dom, observable);
        dropdownlist = dom.data("kendoDropDownList");

        dropdownlist.dataSource.read();

        assert.equal(dropdownlist.select(), -1);
    });

    it("widget with null source does not throw error", function() {
        dom = $('<input data-bind="source:items" data-role="dropdownlist" />');

        let observable = kendo.observable({
            items: null
        });

        assert.doesNotThrow(() => {
            kendo.bind(dom, observable);
        });
    });
});
