import '@progress/kendo-ui/src/kendo.multiselect.js';
import '@progress/kendo-ui/src/kendo.binder.js';
import { stub } from '../../helpers/unit/stub.js';

let Model = kendo.data.Model, dom;

describe('multiselect MVVM', function() {
    beforeEach(function() {
        window.multiSelectDataBound = function() {
            assert.isOk(true);
        };
    });

    afterEach(function() {
        kendo.destroy(dom);
    });

    it("initializes a multiselect when data role is multiselect", function() {
        dom = $('<select data-role="multiselect"/>');

        kendo.bind(dom);

        assert.isOk(dom.data("kendoMultiSelect") instanceof kendo.ui.MultiSelect);
    });

    it("initializes options from data attributes", function() {
        dom = $('<select data-role="multiselect" data-text-field="foo" data-value-field="bar"/>');

        kendo.bind(dom);

        let multiselect = dom.data("kendoMultiSelect");

        assert.equal(multiselect.options.dataTextField, "foo");
        assert.equal(multiselect.options.dataValueField, "bar");
    });

    it("initalizes data source", function() {
        dom = $('<select data-role="multiselect" data-bind="source:items" />');

        kendo.bind(dom, { items: ["foo", "bar"] });

        assert.equal(dom.data("kendoMultiSelect").dataSource.view()[0], "foo");
        assert.equal(dom.data("kendoMultiSelect").dataSource.view()[1], "bar");
    });

    it("initalizes value from view model", function() {
        dom = $('<select data-role="multiselect" data-bind="value:value, source:items" />');

        kendo.bind(dom, { items: ["foo", "bar"], value: "bar" });

        assert.equal(dom.data("kendoMultiSelect").value().length, 1);
        assert.equal(dom.data("kendoMultiSelect").value()[0], "bar");
    });

    it("initalizes complex value from view model", function() {
        dom = $('<select data-value-field="text" data-role="multiselect" data-bind="value:value, source:items" />');

        let observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }], value: null });
        observable.value = observable.items[1];

        kendo.bind(dom, observable);

        assert.equal(dom.data("kendoMultiSelect").value(), "bar");
    });

    it("binding multi select value to multiple objects", function() {
        dom = $('<select data-role="multiselect" multiple="multiple" data-value-field="name" data-bind="source:items, value:selectedItem"/>');

        let viewModel = kendo.observable({
            items: [{ name: "foo" }, { name: "bar" }, { name: "baz" }],
            selectedItem: []
        });

        viewModel.selectedItem.push(viewModel.items[1]);
        viewModel.selectedItem.push(viewModel.items[2]);

        kendo.bind(dom, viewModel);
        assert.isOk(dom.find("option").eq(1).is(":selected"));
        assert.isOk(dom.find("option").eq(2).is(":selected"));
    });

    it("binding multi select value to observable object", function() {
        dom = $('<select data-role="multiselect" multiple="multiple" data-value-field="name" data-bind="source:items, value:selectedItem"/>');

        let viewModel = kendo.observable({
            items: [{ name: "foo" }, { name: "bar" }, { name: "baz" }],
            selectedItem: null
        });

        viewModel.set("selectedItem", viewModel.items[1]);

        kendo.bind(dom, viewModel);
        assert.isOk(dom.find("option").eq(1).is(":selected"));
        assert.isOk(!dom.find("option").eq(2).is(":selected"));
    });

    it("changing a value updates ObservableArray property", function() {
        dom = $('<select data-role="multiselect" multiple="multiple" data-value-field="name" data-bind="source:items, value:selectedItem"/>');

        let observable = kendo.observable({
            items: [{ name: "foo" }, { name: "bar" }, { name: "baz" }],
            selectedItem: []
        });

        kendo.bind(dom, observable);
        dom.data("kendoMultiSelect").value(["foo", "bar"]);
        dom.data("kendoMultiSelect").trigger("change");

        assert.equal(observable.selectedItem[0], observable.items[0]);
        assert.equal(observable.selectedItem[1], observable.items[1]);
    });

    it("uses data value field if data-value-primitive is set to true", function() {
        dom = $('<select data-role="multiselect" data-value-primitive="true" multiple="multiple" data-value-field="name" data-bind="source:items, value:selectedItem"/>');

        let observable = kendo.observable({
            items: [{ name: "foo" }, { name: "bar" }, { name: "baz" }],
            selectedItem: []
        });

        kendo.bind(dom, observable);
        dom.data("kendoMultiSelect").value(["foo", "bar"]);
        dom.data("kendoMultiSelect").trigger("change");

        assert.equal(observable.selectedItem[0], observable.items[0].name);
        assert.equal(observable.selectedItem[1], observable.items[1].name);
    });

    it("changing persist ObservableArray instance", function() {
        dom = $('<select data-role="multiselect" multiple="multiple" data-value-field="name" data-bind="source:items, value:selectedItem"/>');

        let observable = kendo.observable({
            items: [{ name: "foo" }, { name: "bar" }, { name: "baz" }],
            selectedItem: []
        });

        let observableInstance = observable.selectedItem;

        kendo.bind(dom, observable);
        dom.data("kendoMultiSelect").value(["foo", "bar"]);
        dom.data("kendoMultiSelect").trigger("change");

        assert.equal(observable.selectedItem, observableInstance);
    });

    it("selecting initial value marks model as dirty", function() {
        dom = $('<select data-role="multiselect" multiple="multiple" data-value-field="name" data-bind="source:items, value:selectedItem"/>');

        let observable = new Model({
            items: [{ name: "foo" }, { name: "bar" }, { name: "baz" }],
            selectedItem: []
        });

        observable.bind("change", function() {
            assert.equal(this.dirty, true);
        });

        kendo.bind(dom, observable);
        dom.data("kendoMultiSelect").value(["foo"]);
        dom.data("kendoMultiSelect").trigger("change");
    });

    it("remove marks model as dirty", function() {
        dom = $('<select data-role="multiselect" multiple="multiple" data-value-field="name" data-bind="source:items, value:selectedItem"/>');

        let observable = new Model({
            items: [{ name: "foo" }, { name: "bar" }, { name: "baz" }],
            selectedItem: [{ name: "foo" }]
        });

        observable.bind("change", function() {
            assert.equal(this.dirty, true);
        });

        kendo.bind(dom, observable);
        dom.data("kendoMultiSelect").value([]);
        dom.data("kendoMultiSelect").trigger("change");
    });

    it("remove last item triggers change once", function() {
        dom = $('<select data-role="multiselect" multiple="multiple" data-value-field="name" data-bind="source:items, value:selectedItem"/>');

        let observable = new Model({
            items: [{ name: "foo" }, { name: "bar" }, { name: "baz" }],
            selectedItem: [{ name: "foo" }]
        });

        let timesCalled = 0;

        observable.bind("change", function() {
            timesCalled++;
        });

        kendo.bind(dom, observable);
        dom.data("kendoMultiSelect").value([]);
        dom.data("kendoMultiSelect").trigger("change");

        assert.equal(timesCalled, 1);
        assert.equal(observable.selectedItem.length, 0);
    });

    it("remove one item triggers change once", function() {
        dom = $('<select data-role="multiselect" multiple="multiple" data-value-field="name" data-bind="source:items, value:selectedItem"/>');

        let observable = new Model({
            items: [{ name: "foo" }, { name: "bar" }, { name: "baz" }],
            selectedItem: [{ name: "foo" }, { name: "bar" }]
        });

        let timesCalled = 0;

        observable.bind("change", function() {
            timesCalled++;
        });

        kendo.bind(dom, observable);
        dom.data("kendoMultiSelect").value(["bar"]);
        dom.data("kendoMultiSelect").trigger("change");

        assert.equal(timesCalled, 1);
        assert.equal(observable.selectedItem.length, 1);
    });

    it("changing a value updates ObservableArray property when multiselect is filtered", function() {
        dom = $('<select data-role="multiselect" multiple="multiple" data-text-field="name" data-value-field="name" data-bind="source:items, value:selectedItem"/>').appendTo(Mocha.fixture);

        let items = [{ name: "foo" }, { name: "bar" }, { name: "baz" }],
            multiselect;

        let observable = kendo.observable({
            selectedItem: []
        });

        kendo.bind(dom, observable);
        multiselect = dom.data("kendoMultiSelect");
        multiselect.dataSource.data(items);
        items = multiselect.dataSource.data();

        multiselect.value(["foo"]);
        multiselect.search("bar");
        multiselect.ul.children().first().click(); //select "bar"

        assert.equal(observable.selectedItem[0], items[0]);
        assert.equal(observable.selectedItem[1], items[1]);
    });

    it("changing a value does not re-set widget if value binding points to a nested property", function() {
        dom = $('<select data-role="multiselect" multiple="multiple" data-text-field="name" data-value-field="name" data-bind="source:items, value: nested.selectedItem"/>');

        let multiselect;

        let observable = kendo.observable({
            items: [{ name: "foo" }, { name: "bar" }, { name: "baz" }],
            nested: {
                selectedItem: [{ name: "foo" }]
            }
        });

        kendo.bind(dom, observable);

        multiselect = dom.data("kendoMultiSelect");
        multiselect.search("bar");
        multiselect.ul.children().first().click(); //select "bar"

        assert.equal(observable.nested.selectedItem.length, 2);
        assert.equal(multiselect.dataItems().length, 2);
    });

    it("clearing value of the widget sets model property to empty array", function() {
        dom = $('<select data-role="multiselect" multiple="multiple" data-value-field="name" data-bind="source:items, value:value"/>');

        let observable = kendo.observable({
            items: [{ name: "foo" }, { name: "bar" }, { name: "baz" }],
            value: { name: "foo" }
        });

        kendo.bind(dom, observable);
        dom.data("kendoMultiSelect").value(null);
        dom.data("kendoMultiSelect").trigger("change");

        assert.isOk(observable.value instanceof kendo.data.ObservableArray);
    });

    it("clearing value of the widget sets value property to empty array", function() {
        dom = $('<select data-role="multiselect" multiple="multiple" data-value-field="name" data-bind="source:items, value:value"/>');

        let observable = kendo.observable({
            items: [{ name: "foo" }, { name: "bar" }, { name: "baz" }],
            value: "foo"
        });

        kendo.bind(dom, observable);
        dom.data("kendoMultiSelect").value(null);
        dom.data("kendoMultiSelect").trigger("change");

        assert.isOk(observable.value instanceof kendo.data.ObservableArray);
        assert.equal(observable.value.length, 0);
    });

    it("binding multiselect initialized before binding", function() {
        dom = $('<select data-value-field="text" data-bind="value:value, source:items" />');

        let observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }], value: null });
        observable.value = observable.items[1];

        dom.kendoMultiSelect();

        kendo.bind(dom, observable);

        assert.equal(dom.data("kendoMultiSelect").value().length, 1);
        assert.equal(dom.data("kendoMultiSelect").value()[0], "bar");
    });

    it("binding multiselect initialized after binding", function() {
        dom = $('<select data-value-field="text" data-bind="value:value, source:items" />');

        let observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }], value: null });
        observable.value = observable.items[1];

        kendo.bind(dom, observable);

        dom.kendoMultiSelect();

        assert.equal(dom.data("kendoMultiSelect").value().length, 1);
        assert.equal(dom.data("kendoMultiSelect").value()[0], "bar");
    });

    it("value binding fetches the data when valuePrimitive:true and autoBind:false", function() {
        dom = $('<select data-role="multiselect" data-value-field="value" data-text-field="text" data-value-primitive="true" data-bind="value:value, source:items"></select>');

        let observable = kendo.observable({ items: [{ text: "foo", value: "foo" }, { text: "bar", value: "bar" }], value: ["bar"] });

        kendo.bind(dom, observable);

        let widget = dom.data("kendoMultiSelect");

        assert.equal(widget.dataSource.view().length, 2);
    });

    it("value binding honors autoBind:false option when valuePrimitive is false", function() {
        dom = $('<select data-role="multiselect" data-value-field="value" data-text-field="text" data-auto-bind="false" data-value-primitive="false" data-bind="value:value, source:items"></select>');

        let items = new kendo.data.ObservableArray([{ text: "foo", value: 1 }, { text: "bar", value: 2 }]);
        let observable = kendo.observable({
            items: new kendo.data.DataSource({ data: items })
        });
        observable.value = items[1];

        kendo.bind(dom, observable);

        let widget = dom.data("kendoMultiSelect");
        let tags = widget.tagList.children(".k-chip");

        assert.equal(widget.dataSource.view().length, 1);

        assert.equal(tags.length, 1);
        assert.equal(tags.first().children("span:first").text(), "bar");
    });

    it("value binding honors value as ObservableArray and autoBind:false option", function() {
        dom = $('<select data-role="multiselect" data-value-field="value" data-text-field="text" data-auto-bind="false" data-value-primitive="false" data-bind="value:value, source:items"></select>');

        let items = new kendo.data.ObservableArray([{ text: "foo", value: 1 }, { text: "bar", value: 2 }]);
        let observable = kendo.observable({
            items: new kendo.data.DataSource({ data: items })
        });

        observable.value = new kendo.data.ObservableArray(items);

        kendo.bind(dom, observable);

        let widget = dom.data("kendoMultiSelect");
        let tags = widget.tagList.children(".k-chip");

        assert.equal(widget.dataSource.view().length, 2);

        assert.equal(tags.length, 2);
        assert.equal(tags.first().children("span:first").text(), "foo");
        assert.equal(tags.last().children("span:first").text(), "bar");
    });

    it("value binding pre-selects value when options.value is defined and autoBind:false", function() {
        dom = $('<select data-bind="value:value"></select>');

        let items = new kendo.data.ObservableArray([{ text: "foo", value: 1 }, { text: "bar", value: 2 }]);
        let observable = kendo.observable({
            items: new kendo.data.DataSource({ data: items }),
            value: items[1]
        });

        dom.kendoMultiSelect({
            autoBind: false,
            dataValueField: "value",
            dataTextField: "text",
            dataSource: items,
            value: items[0]
        });

        kendo.bind(dom, observable);

        let widget = dom.data("kendoMultiSelect");

        assert.deepEqual(widget.value(), [2]);
    });

    it("source binding updates widgets value if value binding exists", function() {
        dom = $('<select data-role="multiselect" data-value-field="value" data-text-field="text" data-value-primitive="true" data-bind="value:value, source:items"></select>');

        let data = [{ text: "foo", value: "foo" }, { text: "bar", value: "bar" }];

        let observable = kendo.observable({
            items: [],
            value: ""
        });

        kendo.bind(dom, observable);

        observable.set("value", "bar");
        observable.set("items", data);

        let widget = dom.data("kendoMultiSelect");
        let values = widget.value();

        assert.equal(values.length, 1);
        assert.equal(values[0], "bar");
    });

    it("removing items from the model updates the UI", function() {
        dom = $('<select data-bind="source:items" />');

        let observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }, { text: "baz" }] });

        kendo.bind(dom, observable);

        dom.kendoMultiSelect();

        observable.items.splice(0, 1);

        assert.equal(dom.data("kendoMultiSelect").ul.children().length, 2);
    });

    it("binding are removed if element is rebind", function() {
        dom = $('<select data-role="multiselect" data-bind="source:items" />');

        let observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

        kendo.bind(dom, observable);

        let destroy = stub(dom[0].kendoBindingTarget, "destroy");

        kendo.bind(dom, observable);

        assert.equal(destroy.calls("destroy"), 1);
    });

    it("expressions are destroyed", function() {
        dom = $('<select data-role="multiselect" data-bind="source:items" />');

        let observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

        kendo.bind(dom, observable);

        let destroy = stub(dom[0].kendoBindingTarget, "destroy");

        kendo.bind(dom, observable);

        assert.equal(destroy.calls("destroy"), 1);
    });

    it("destroys detaches the events to widget", function() {
        dom = $('<select data-role="multiselect" data-bind="source:items" />');

        let observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

        kendo.bind(dom, observable);
        kendo.unbind(dom);

        let multiselect = dom.data("kendoMultiSelect");

        assert.equal(multiselect._events["dataBound"].length, 0);
        assert.equal(multiselect._events["dataBinding"].length, 0);
    });

    it("dataBound event is raised if attached as option", function() {
        dom = $('<select data-role="multiselect" data-bound="multiSelectDataBound" data-bind="source:items" />');

        let observable = kendo.observable({
            items: [{ text: "foo" }, { text: "bar" }]
        });

        kendo.bind(dom, observable);
    });

    it("dataBound event is raised if attached as option to a already initialized multiselect", function() {
        dom = $('<select data-bound="multiSelectDataBound" data-bind="source:items" />').kendoMultiSelect();

        let observable = kendo.observable({
            items: [{ text: "foo" }, { text: "bar" }]
        });

        kendo.bind(dom, observable);
    });

    it("binding enabled to false disables the widget", function() {
        dom = $('<select data-bind="enabled:enabled" data-role="multiselect"/>');

        let observable = kendo.observable({
            enabled: false
        });

        kendo.bind(dom, observable);

        assert.isOk(dom.is(":disabled"));
    });

    it("binding enabled to true enables the widget", function() {
        dom = $('<select data-bind="enabled:enabled" disabled="disabled" data-role="multiselect" />');

        let observable = kendo.observable({
            enabled: true
        });

        kendo.bind(dom, observable);

        assert.isOk(!dom.is(":disabled"));
    });

    it("binding disable to true disables the widget", function() {
        dom = $('<select data-bind="disabled:disabled" disabled="disabled" data-role="multiselect" />');

        let observable = kendo.observable({
            disabled: false
        });

        kendo.bind(dom, observable);

        assert.isOk(!dom.is(":disabled"));
    });

    it("binding disabled to false enables the widget", function() {
        dom = $('<select data-bind="disabled:disabled" data-role="multiselect" />');

        let observable = kendo.observable({
            disabled: true
        });

        kendo.bind(dom, observable);

        assert.isOk(dom.is(":disabled"));
    });

    it("binding invisible to true hides the widget", function() {
        dom = $('<select data-bind="invisible:invisible" data-role="multiselect"/>');

        let observable = kendo.observable({
            invisible: true
        });

        kendo.bind(dom, observable);

        assert.isOk(dom.data("kendoMultiSelect").wrapper.css("display") == "none", "Display is 'none'");
    });

    it("binding invisible to false shows the widget", function() {
        dom = $('<select data-bind="invisible:invisible" data-role="multiselect" style="display:none"/>');

        let observable = kendo.observable({
            invisible: false
        });

        kendo.bind(dom, observable);

        assert.isOk(dom.data("kendoMultiSelect").wrapper.css("display") != "none", "Display is not 'none'");
    });

    it("changing invisible to true hides the widget", function() {
        dom = $('<select data-bind="invisible:invisible" data-role="multiselect"/>');

        let observable = kendo.observable({
            invisible: false
        });

        kendo.bind(dom, observable);
        observable.set("invisible", true);

        assert.isOk(dom.data("kendoMultiSelect").wrapper.css("display") == "none", "Display is 'none'");
    });

    it("changing invisible to false shows the widget", function() {
        dom = $('<select data-bind="invisible:invisible" data-role="multiselect"/>');

        let observable = kendo.observable({
            invisible: true
        });

        kendo.bind(dom, observable);
        observable.set("invisible", false);

        assert.isOk(dom.data("kendoMultiSelect").wrapper.css("display") != "none", "Display is not 'none'");
    });


    it("binding enabled to false disables the widget", function() {
        dom = $('<select data-bind="enabled:enabled" data-role="multiselect"/>');

        let observable = kendo.observable({
            enabled: false
        });

        kendo.bind(dom, observable);

        assert.isOk(dom.is(":disabled"));
    });

    it("binding visible to false hides the widget", function() {
        dom = $('<select data-bind="visible:visible" data-role="multiselect"/>');

        let observable = kendo.observable({
            visible: false
        });

        kendo.bind(dom, observable);

        assert.isOk(dom.data("kendoMultiSelect").wrapper.css("display") == "none", "Display is 'none'");
    });

    it("binding visible to true shows the widget", function() {
        dom = $('<select data-bind="visible:visible" data-role="multiselect" style="display:none"/>');

        let observable = kendo.observable({
            visible: true
        });

        kendo.bind(dom, observable);

        assert.isOk(dom.data("kendoMultiSelect").wrapper.css("display") != "none", "Display is not 'none'");
    });

    it("changing visible to false hides the widget", function() {
        dom = $('<select data-bind="visible:visible" data-role="multiselect"/>');

        let observable = kendo.observable({
            visible: true
        });

        kendo.bind(dom, observable);
        observable.set("visible", false);

        assert.isOk(dom.data("kendoMultiSelect").wrapper.css("display") == "none", "Display is 'none'");
    });

    it("changing visible to true shows the widget", function() {
        dom = $('<select data-bind="visible:visible" data-role="multiselect"/>');

        let observable = kendo.observable({
            visible: false
        });

        kendo.bind(dom, observable);
        observable.set("visible", true);

        assert.isOk(dom.data("kendoMultiSelect").wrapper.css("display") != "none", "Display is not 'none'");
    });

    it("assign to DataSource as ViewModel field", function() {
        dom = $('<select data-text-field="text" data-bind="source:dataSource" data-role="multiselect" />');
        let dataSource = new kendo.data.DataSource({
            data: [{ text: "foo" }, { text: "bar" }]
        });

        let observable = kendo.observable({
            dataSource: dataSource
        });

        kendo.bind(dom, observable);
        let multiselect = dom.data("kendoMultiSelect");

        assert.strictEqual(multiselect.dataSource, dataSource);

        assert.equal(multiselect.ul.children().eq(0).text().trim(), "foo");
        assert.equal(multiselect.ul.children().eq(1).text().trim(), "bar");
    });

    it("Support for binding to ObservableArray of not ObservableObjects", function() {
        dom = $('<select data-role="multiselect" data-text-field="Text" data-value-field="ID" data-bind="value: data,source: multiselectData"></select>');
        let observable = kendo.observable({
            data: [1, 2],
            multiselectData: [{ ID: 1, Text: "Text1" }, { ID: 2, Text: "Text2" }, { ID: 3, Text: "Text3" }]
        });

        kendo.bind(dom, observable);
        assert.isOk(true);
    });

    it("Adding item to empty observable array raises change with add action", function() {
        dom = $('<select data-role="multiselect" data-text-field="Text" data-value-field="ID" data-bind="value: data,source: multiselectData"></select>');
        let observable = kendo.observable({
            data: [],
            multiselectData: [{ ID: 1, Text: "Text1" }, { ID: 2, Text: "Text2" }, { ID: 3, Text: "Text3" }]
        });

        kendo.bind(dom, observable);

        let multiselect = dom.data("kendoMultiSelect");

        observable.data.bind("change", function(e) {
            assert.equal(e.action, "add");
            assert.equal(e.items.length, 1);
            assert.equal(e.items[0], observable.multiselectData[0]);
            assert.equal(e.index, 0);
        });

        multiselect.value([1]);
        multiselect.trigger("change");
    });

    it("Adding item to non-empty observable array raises change event with add action (value primitive)", function() {
        dom = $('<select data-role="multiselect" data-text-field="Text" data-value-field="ID" data-value-primitive="true" data-bind="value: data,source: multiselectData"></select>');
        let observable = kendo.observable({
            data: [1],
            multiselectData: [{ ID: 1, Text: "Text1" }, { ID: 2, Text: "Text2" }, { ID: 3, Text: "Text3" }]
        });

        kendo.bind(dom, observable);

        let multiselect = dom.data("kendoMultiSelect");

        observable.data.bind("change", function(e) {
            assert.equal(e.action, "add");
            assert.equal(e.items.length, 1);
            assert.equal(e.items[0], 2);
            assert.equal(e.index, 1);
        });

        multiselect.value([1, 2]);
        multiselect.trigger("change");
    });

    it("Adding item to non-empty observable adds the item", function() {
        dom = $('<select data-role="multiselect" data-text-field="Text" data-value-field="ID" data-value-primitive="true" data-bind="value: data,source: multiselectData"></select>');
        let observable = kendo.observable({
            data: [1],
            multiselectData: [{ ID: 1, Text: "Text1" }, { ID: 2, Text: "Text2" }, { ID: 3, Text: "Text3" }]
        });

        kendo.bind(dom, observable);

        let multiselect = dom.data("kendoMultiSelect");

        multiselect.value([1, 2]);
        multiselect.trigger("change");

        assert.equal(observable.data[0], 1);
        assert.equal(observable.data[1], 2);
    });

    it("Remove item raises change with remove action (value primitive)", function() {
        dom = $('<select data-role="multiselect" data-text-field="Text" data-value-field="ID" data-value-primitive="true" data-bind="value: data,source: multiselectData"></select>');
        let observable = kendo.observable({
            data: [1, 2],
            multiselectData: [{ ID: 1, Text: "Text1" }, { ID: 2, Text: "Text2" }, { ID: 3, Text: "Text3" }]
        });

        kendo.bind(dom, observable);

        let multiselect = dom.data("kendoMultiSelect");

        observable.data.bind("change", function(e) {
            assert.equal(e.action, "remove");
            assert.equal(e.items.length, 1);
            assert.equal(e.items[0], 2);
            assert.equal(e.index, 1);
        });

        multiselect.value([1]);
        multiselect.trigger("change");
    });

    it("Remove first item raises change with correct index", function() {
        dom = $('<select data-role="multiselect" data-text-field="Text" data-value-field="ID" data-value-primitive="true" data-bind="value: data,source: multiselectData"></select>');
        let observable = kendo.observable({
            data: [1, 2],
            multiselectData: [{ ID: 1, Text: "Text1" }, { ID: 2, Text: "Text2" }, { ID: 3, Text: "Text3" }]
        });

        kendo.bind(dom, observable);

        let multiselect = dom.data("kendoMultiSelect");

        observable.data.bind("change", function(e) {
            assert.equal(e.index, 0);
        });

        multiselect.value([2]);
        multiselect.trigger("change");
    });

    it("Remove tag removes item from value field", function() {
        dom = $('<select data-role="multiselect" data-text-field="Text" data-value-field="ID" data-value-primitive="true" data-bind="value: data,source: multiselectData"></select>');
        let observable = kendo.observable({
            data: [1, 2, 3],
            multiselectData: [{ ID: 1, Text: "Text1" }, { ID: 2, Text: "Text2" }, { ID: 3, Text: "Text3" }]
        });

        kendo.bind(dom, observable);

        let multiselect = dom.data("kendoMultiSelect");

        multiselect.value([1, 3]);
        multiselect.trigger("change");

        assert.equal(observable.data.length, 2);
        assert.equal(observable.data[0], 1);
        assert.equal(observable.data[1], 3);
    });

    it("Binding to unexisting field clears widget selection", function() {
        dom = $('<select data-bind="value: test"><option>Test</option></select>');
        let observable = kendo.observable({
            data: [1, 2, 3]
        });

        let multiselect = dom.kendoMultiSelect({
            value: "Test"
        }).data("kendoMultiSelect");

        kendo.bind(dom, observable);

        assert.deepEqual(multiselect.value(), []);
    });

    it("binding to a digit splices model field value correctly", function() {
        dom = $('<select data-role="multiselect" data-value-primitive="true" multiple="multiple" data-text-field="name" data-value-field="id" data-bind="source:items, value:selectedItem"/>');

        let observable = kendo.observable({
            items: [{ id: 0, name: "foo" }, { id: 1, name: "bar" }, { id: 2, name: "baz" }],
            selectedItem: []
        });

        kendo.bind(dom, observable);
        dom.data("kendoMultiSelect").value([0]);
        dom.data("kendoMultiSelect").trigger("change");

        dom.data("kendoMultiSelect").value([0, 1]);
        dom.data("kendoMultiSelect").trigger("change");

        assert.equal(observable.selectedItem.length, 2);
        assert.equal(observable.selectedItem[0], observable.items[0].id);
        assert.equal(observable.selectedItem[1], observable.items[1].id);
    });
});
