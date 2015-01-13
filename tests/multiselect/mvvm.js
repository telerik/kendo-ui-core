(function() {
    var Model = kendo.data.Model, dom;

    module('multiselect MVVM', {
        setup: function() {
            window.multiSelectDataBound = function() {
                ok(true);
            }

            QUnit.fixture.html('<script id="template" type="text/x-kendo-template"> \
               <strong>#:text#</strong> \
            </script> \
            <script id="template-with-attributes" type="text/x-kendo-template"> \
                <strong data-bind="text:text"></strong> \
            </script>');
        },

        teardown: function() {
            kendo.destroy(dom);
        }
    });

    test("initializes a multiselect when data role is multiselect", function() {
        dom = $('<select data-role="multiselect"/>');

        kendo.bind(dom);

        ok(dom.data("kendoMultiSelect") instanceof kendo.ui.MultiSelect);
    });

    test("initializes options from data attributes", function() {
        dom = $('<select data-role="multiselect" data-text-field="foo" data-value-field="bar"/>');

        kendo.bind(dom);

        var multiselect = dom.data("kendoMultiSelect");

        equal(multiselect.options.dataTextField, "foo");
        equal(multiselect.options.dataValueField, "bar");
    });

    test("initalizes data source", function() {
        dom = $('<select data-role="multiselect" data-bind="source:items" />');

        kendo.bind(dom, { items: ["foo", "bar"] } );

        equal(dom.data("kendoMultiSelect").dataSource.view()[0], "foo");
        equal(dom.data("kendoMultiSelect").dataSource.view()[1], "bar");
    });

    test("initalizes value from view model", function() {
        dom = $('<select data-role="multiselect" data-bind="value:value, source:items" />');

        kendo.bind(dom, { items: ["foo", "bar"], value: "bar" } );

        equal(dom.data("kendoMultiSelect").value().length, 1);
        equal(dom.data("kendoMultiSelect").value()[0], "bar");
    });

    test("initalizes complex value from view model", function() {
        dom = $('<select data-value-field="text" data-role="multiselect" data-bind="value:value, source:items" />');

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
        observable.value = observable.items[1];

        kendo.bind(dom, observable);

        equal(dom.data("kendoMultiSelect").value(), "bar");
    });

    test("binding multi select value to multiple objects", function() {
        dom = $('<select data-role="multiselect" multiple="multiple" data-value-field="name" data-bind="source:items, value:selectedItem"/>');

        var viewModel = kendo.observable({
            items: [  { name: "foo" }, { name: "bar" }, { name: "baz" } ],
            selectedItem: []
        });

        viewModel.selectedItem.push(viewModel.items[1]);
        viewModel.selectedItem.push(viewModel.items[2]);

        kendo.bind(dom, viewModel);
        ok(dom.find("option").eq(1).is(":selected"));
        ok(dom.find("option").eq(2).is(":selected"));
    });

    test("binding multi select value to observable object", function() {
        dom = $('<select data-role="multiselect" multiple="multiple" data-value-field="name" data-bind="source:items, value:selectedItem"/>');

        var viewModel = kendo.observable({
            items: [  { name: "foo" }, { name: "bar" }, { name: "baz" } ],
            selectedItem: null
        });

        viewModel.set("selectedItem", viewModel.items[1]);

        kendo.bind(dom, viewModel);
        ok(dom.find("option").eq(1).is(":selected"));
        ok(!dom.find("option").eq(2).is(":selected"));
    });

    test("changing a value updates ObservableArray property", function() {
        dom = $('<select data-role="multiselect" multiple="multiple" data-value-field="name" data-bind="source:items, value:selectedItem"/>');

        var observable = kendo.observable({
            items: [  { name: "foo" }, { name: "bar" }, { name: "baz" } ],
            selectedItem: []
        });

        kendo.bind(dom, observable);
        dom.data("kendoMultiSelect").value(["foo", "bar"]);
        dom.data("kendoMultiSelect").trigger("change");

        equal(observable.selectedItem[0], observable.items[0]);
        equal(observable.selectedItem[1], observable.items[1]);
    });

    test("uses data value field if data-value-primitive is set to true", function() {
        dom = $('<select data-role="multiselect" data-value-primitive="true" multiple="multiple" data-value-field="name" data-bind="source:items, value:selectedItem"/>');

        var observable = kendo.observable({
            items: [  { name: "foo" }, { name: "bar" }, { name: "baz" } ],
            selectedItem: []
        });

        kendo.bind(dom, observable);
        dom.data("kendoMultiSelect").value(["foo", "bar"]);
        dom.data("kendoMultiSelect").trigger("change");

        equal(observable.selectedItem[0], observable.items[0].name);
        equal(observable.selectedItem[1], observable.items[1].name);
    });

    test("changing persist ObservableArray instance", function() {
        dom = $('<select data-role="multiselect" multiple="multiple" data-value-field="name" data-bind="source:items, value:selectedItem"/>');

        var observable = kendo.observable({
            items: [  { name: "foo" }, { name: "bar" }, { name: "baz" } ],
            selectedItem: []
        });

        var observableInstance = observable.selectedItem;

        kendo.bind(dom, observable);
        dom.data("kendoMultiSelect").value(["foo", "bar"]);
        dom.data("kendoMultiSelect").trigger("change");

        equal(observable.selectedItem, observableInstance);
    });

    test("selecting initial value marks model as dirty", 1, function() {
        dom = $('<select data-role="multiselect" multiple="multiple" data-value-field="name" data-bind="source:items, value:selectedItem"/>');

        var observable = new Model({
            items: [  { name: "foo" }, { name: "bar" }, { name: "baz" } ],
            selectedItem: []
        });

        observable.bind("change", function() {
            equal(this.dirty, true);
        });

        kendo.bind(dom, observable);
        dom.data("kendoMultiSelect").value(["foo"]);
        dom.data("kendoMultiSelect").trigger("change");
    });

    test("remove marks model as dirty", 1, function() {
        dom = $('<select data-role="multiselect" multiple="multiple" data-value-field="name" data-bind="source:items, value:selectedItem"/>');

        var observable = new Model({
            items: [  { name: "foo" }, { name: "bar" }, { name: "baz" } ],
            selectedItem: [ { name: "foo" } ]
        });

        observable.bind("change", function() {
            equal(this.dirty, true);
        });

        kendo.bind(dom, observable);
        dom.data("kendoMultiSelect").value([]);
        dom.data("kendoMultiSelect").trigger("change");
    });

    test("remove last item triggers change once", 2, function() {
        dom = $('<select data-role="multiselect" multiple="multiple" data-value-field="name" data-bind="source:items, value:selectedItem"/>');

        var observable = new Model({
            items: [  { name: "foo" }, { name: "bar" }, { name: "baz" } ],
            selectedItem: [ { name: "foo" } ]
        });

        var timesCalled = 0;

        observable.bind("change", function() {
            timesCalled ++;
        });

        kendo.bind(dom, observable);
        dom.data("kendoMultiSelect").value([]);
        dom.data("kendoMultiSelect").trigger("change");

        equal(timesCalled, 1);
        equal(observable.selectedItem.length, 0);
    });

    test("remove one item triggers change once", 2, function() {
        dom = $('<select data-role="multiselect" multiple="multiple" data-value-field="name" data-bind="source:items, value:selectedItem"/>');

        var observable = new Model({
            items: [  { name: "foo" }, { name: "bar" }, { name: "baz" } ],
            selectedItem: [ { name: "foo" }, { name: "bar" } ]
        });

        var timesCalled = 0;

        observable.bind("change", function() {
            timesCalled ++;
        });

        kendo.bind(dom, observable);
        dom.data("kendoMultiSelect").value([ "bar" ]);
        dom.data("kendoMultiSelect").trigger("change");

        equal(timesCalled, 1);
        equal(observable.selectedItem.length, 1);
    });

    test("changing a value updates ObservableArray property when multiselect is filtered", function() {
        dom = $('<select data-role="multiselect" multiple="multiple" data-text-field="name" data-value-field="name" data-bind="source:items, value:selectedItem"/>');

        var items = [  { name: "foo" }, { name: "bar" }, { name: "baz" } ],
            multiselect;

        var observable = kendo.observable({
            selectedItem: []
        });

        kendo.bind(dom, observable);
        multiselect = dom.data("kendoMultiSelect");
        multiselect.dataSource.data(items);
        items = multiselect.dataSource.data();

        multiselect.value(["foo"]);
        multiselect.search("bar");
        multiselect.ul.children().first().click(); //select "bar"

        equal(observable.selectedItem[0], items[0]);
        equal(observable.selectedItem[1], items[1]);
    });

    test("changing a value does not re-set widget if value binding points to a nested property", function() {
        dom = $('<select data-role="multiselect" multiple="multiple" data-text-field="name" data-value-field="name" data-bind="source:items, value: nested.selectedItem"/>');

        var multiselect;

        var observable = kendo.observable({
            items: [  { name: "foo" }, { name: "bar" }, { name: "baz" } ],
            nested: {
                selectedItem: [{ name: "foo" }]
            }
        });

        kendo.bind(dom, observable);

        multiselect = dom.data("kendoMultiSelect");
        multiselect.search("bar");
        multiselect.ul.children().first().click(); //select "bar"

        equal(observable.nested.selectedItem.length, 2);
        equal(multiselect.dataItems().length, 2);
    });

    test("clearing value of the widget sets model property to empty array", function() {
        dom = $('<select data-role="multiselect" multiple="multiple" data-value-field="name" data-bind="source:items, value:value"/>');

        var observable = kendo.observable({
            items: [  { name: "foo" }, { name: "bar" }, { name: "baz" } ],
            value: { name: "foo" }
        });

        kendo.bind(dom, observable);
        dom.data("kendoMultiSelect").value(null);
        dom.data("kendoMultiSelect").trigger("change");

        ok(observable.value instanceof kendo.data.ObservableArray);
    });

    test("clearing value of the widget sets value property to empty array", function() {
        dom = $('<select data-role="multiselect" multiple="multiple" data-value-field="name" data-bind="source:items, value:value"/>');

        var observable = kendo.observable({
            items: [  { name: "foo" }, { name: "bar" }, { name: "baz" } ],
            value: "foo"
        });

        kendo.bind(dom, observable);
        dom.data("kendoMultiSelect").value(null);
        dom.data("kendoMultiSelect").trigger("change");

        ok(observable.value instanceof kendo.data.ObservableArray);
        equal(observable.value.length, 0);
    });

    test("binding multiselect initialized before binding", function() {
        dom = $('<select data-value-field="text" data-bind="value:value, source:items" />');

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
        observable.value = observable.items[1];

        dom.kendoMultiSelect();

        kendo.bind(dom, observable);

        equal(dom.data("kendoMultiSelect").value().length, 1);
        equal(dom.data("kendoMultiSelect").value()[0], "bar");
    });

    test("binding multiselect initialized after binding", function() {
        dom = $('<select data-value-field="text" data-bind="value:value, source:items" />');

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
        observable.value = observable.items[1];

        kendo.bind(dom, observable);

        dom.kendoMultiSelect();

        equal(dom.data("kendoMultiSelect").value().length, 1);
        equal(dom.data("kendoMultiSelect").value()[0], "bar");
    });

    test("binding template", function() {
        dom = $('<select data-item-template="template" data-role="multiselect" data-bind="source:items" />');

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

        kendo.bind(dom, observable);

        equal($.trim(dom.data("kendoMultiSelect").ul.children().eq(0).html()), "<strong>foo</strong>");
    });

    test("binding template containing binding attributes", function() {
        dom = $('<select data-role="multiselect" data-item-template="template-with-attributes" data-bind="source:items" />');

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

        kendo.bind(dom, observable);

        equal($.trim(dom.data("kendoMultiSelect").ul.children().eq(0).html()), '<strong data-bind="text:text">foo</strong>');
    });

    test("updating an item from the data source updates the corresponding multiselect item", function() {
        dom = $('<select data-role="multiselect" data-item-template="template-with-attributes" data-bind="source:items" />');

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

        kendo.bind(dom, observable);

        observable.items[0].set("text", "baz");

        equal($.trim(dom.data("kendoMultiSelect").ul.children().eq(0).text()), "baz");
    });

    test("destroying binding targets when the datasource changes", function() {
        dom = $('<select data-role="multiselect" data-item-template="template-with-attributes" data-bind="source:items" />');

        var observable = kendo.observable({ items: [{ text:"foo"} ] });

        kendo.bind(dom, observable);
        dom.data("kendoMultiSelect").refresh();

        equal(observable.items[0]._events["change"].length, 2); //1 for the text binding and 1 for the ObservableArray
    });

    test("removing items from the model updates the UI", function() {
        dom = $('<select data-bind="source:items" />');

        var observable = kendo.observable({ items: [{ text:"foo"},{ text: "bar" },{ text: "baz" }] });

        kendo.bind(dom, observable);

        dom.kendoMultiSelect();

        observable.items.splice(0,1);

        equal(dom.data("kendoMultiSelect").ul.children().length, 2);
    });

    test("binding are removed if element is rebind", 1, function() {
        dom = $('<select data-role="multiselect" data-bind="source:items" />');

        var observable = kendo.observable({ items: [{ text:"foo"},{ text: "bar" } ] });

        kendo.bind(dom, observable);

        var destroy = stub(dom[0].kendoBindingTarget, "destroy");

        kendo.bind(dom, observable);

        equal(destroy.calls("destroy"), 1);
    });

    test("expressions are destroyed", 1, function() {
        dom = $('<select data-role="multiselect" data-bind="source:items" />');

        var observable = kendo.observable({ items: [{ text:"foo"},{ text: "bar" } ] });

        kendo.bind(dom, observable);

        var destroy = stub(dom[0].kendoBindingTarget, "destroy");

        kendo.bind(dom, observable);

        equal(destroy.calls("destroy"), 1);
    });

    test("destroys detaches the events to widget", function() {
        dom = $('<select data-role="multiselect" data-bind="source:items" />');

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

        kendo.bind(dom, observable);
        kendo.unbind(dom);

        var multiselect = dom.data("kendoMultiSelect");

        equal(multiselect._events["dataBound"].length, 0);
        equal(multiselect._events["dataBinding"].length, 0);
    });

    test("dataBound event is raised if attached as option", 2, function() {
        dom = $('<select data-role="multiselect" data-bound="multiSelectDataBound" data-bind="source:items" />');

        var observable = kendo.observable({
            items: [{text:"foo"}, {text:"bar"}]
        });

        kendo.bind(dom, observable);
    });

    test("dataBound event is raised if attached as option to a already initialized multiselect", 1, function() {
        dom = $('<select data-bound="multiSelectDataBound" data-bind="source:items" />').kendoMultiSelect();

        var observable = kendo.observable({
            items: [{text:"foo"}, {text:"bar"}]
        });

        kendo.bind(dom, observable);
    });

    test("binding enabled to false disables the widget", function() {
        dom = $('<select data-bind="enabled:enabled" data-role="multiselect"/>');

        var observable = kendo.observable({
            enabled: false
        });

        kendo.bind(dom, observable);

        ok(dom.is(":disabled"));
    });

    test("binding enabled to true enables the widget", function() {
        dom = $('<select data-bind="enabled:enabled" disabled="disabled" data-role="multiselect" />');

        var observable = kendo.observable({
            enabled: true
        });

        kendo.bind(dom, observable);

        ok(!dom.is(":disabled"));
    });

    test("binding disable to true disables the widget", function() {
        dom = $('<select data-bind="disabled:disabled" disabled="disabled" data-role="multiselect" />');

        var observable = kendo.observable({
            disabled: false
        });

        kendo.bind(dom, observable);

        ok(!dom.is(":disabled"));
    });

    test("binding disabled to false enables the widget", function() {
        dom = $('<select data-bind="disabled:disabled" data-role="multiselect" />');

        var observable = kendo.observable({
            disabled: true
        });

        kendo.bind(dom, observable);

        ok(dom.is(":disabled"));
    });

    test("binding invisible to true hides the widget", function() {
        dom = $('<select data-bind="invisible:invisible" data-role="multiselect"/>');

        var observable = kendo.observable({
            invisible: true
        });

        kendo.bind(dom, observable);

        ok(dom.data("kendoMultiSelect").wrapper.css("display") == "none", "Display is 'none'");
    });

    test("binding invisible to false shows the widget", function() {
        dom = $('<select data-bind="invisible:invisible" data-role="multiselect" style="display:none"/>');

        var observable = kendo.observable({
            invisible: false
        });

        kendo.bind(dom, observable);

        ok(dom.data("kendoMultiSelect").wrapper.css("display") != "none", "Display is not 'none'");
    });

    test("changing invisible to true hides the widget", function() {
        dom = $('<select data-bind="invisible:invisible" data-role="multiselect"/>');

        var observable = kendo.observable({
            invisible: false
        });

        kendo.bind(dom, observable);
        observable.set("invisible", true);

        ok(dom.data("kendoMultiSelect").wrapper.css("display") == "none", "Display is 'none'");
    });

    test("changing invisible to false shows the widget", function() {
        dom = $('<select data-bind="invisible:invisible" data-role="multiselect"/>');

        var observable = kendo.observable({
            invisible: true
        });

        kendo.bind(dom, observable);
        observable.set("invisible", false);

        ok(dom.data("kendoMultiSelect").wrapper.css("display") != "none", "Display is not 'none'");
    });


    test("binding enabled to false disables the widget", function() {
        dom = $('<select data-bind="enabled:enabled" data-role="multiselect"/>');

        var observable = kendo.observable({
            enabled: false
        });

        kendo.bind(dom, observable);

        ok(dom.is(":disabled"));
    });

    test("binding visible to false hides the widget", function() {
        dom = $('<select data-bind="visible:visible" data-role="multiselect"/>');

        var observable = kendo.observable({
            visible: false
        });

        kendo.bind(dom, observable);

        ok(dom.data("kendoMultiSelect").wrapper.css("display") == "none", "Display is 'none'");
    });

    test("binding visible to true shows the widget", function() {
        dom = $('<select data-bind="visible:visible" data-role="multiselect" style="display:none"/>');

        var observable = kendo.observable({
            visible: true
        });

        kendo.bind(dom, observable);

        ok(dom.data("kendoMultiSelect").wrapper.css("display") != "none", "Display is not 'none'");
    });

    test("changing visible to false hides the widget", function() {
        dom = $('<select data-bind="visible:visible" data-role="multiselect"/>');

        var observable = kendo.observable({
            visible: true
        });

        kendo.bind(dom, observable);
        observable.set("visible", false);

        ok(dom.data("kendoMultiSelect").wrapper.css("display") == "none", "Display is 'none'");
    });

    test("changing visible to true shows the widget", function() {
        dom = $('<select data-bind="visible:visible" data-role="multiselect"/>');

        var observable = kendo.observable({
            visible: false
        });

        kendo.bind(dom, observable);
        observable.set("visible", true);

        ok(dom.data("kendoMultiSelect").wrapper.css("display") != "none", "Display is not 'none'");
    });

    test("assign to DataSource as ViewModel field", function() {
        dom = $('<select data-text-field="text" data-bind="source:dataSource" data-role="multiselect" />');
        var dataSource = new kendo.data.DataSource({
            data: [{text:"foo"}, {text:"bar"}]
        });

        var observable = kendo.observable({
            dataSource: dataSource
        });

        kendo.bind(dom, observable);
        var multiselect = dom.data("kendoMultiSelect");

        strictEqual(multiselect.dataSource, dataSource);

        equal($.trim(multiselect.ul.children().eq(0).text()), "foo");
        equal($.trim(multiselect.ul.children().eq(1).text()), "bar");
    });

    test("Support for binding to ObservableArray of not ObservableObjects", 1, function() {
        dom = $('<select data-role="multiselect" data-text-field="Text" data-value-field="ID" data-bind="value: data,source: multiselectData"></select>');
        var observable = kendo.observable({
            data: [1,2],
            multiselectData: [{ID: 1, Text: "Text1"}, {ID: 2, Text: "Text2"}, {ID: 3,    Text: "Text3"}]
        });

        kendo.bind(dom, observable);
        ok(true);
    });

    test("Adding item to empty observable array raises change with add action", 4, function() {
        dom = $('<select data-role="multiselect" data-text-field="Text" data-value-field="ID" data-bind="value: data,source: multiselectData"></select>');
        var observable = kendo.observable({
            data: [],
            multiselectData: [{ID: 1, Text: "Text1"}, {ID: 2, Text: "Text2"}, {ID: 3,    Text: "Text3"}]
        });

        kendo.bind(dom, observable);

        var multiselect = dom.data("kendoMultiSelect");

        observable.data.bind("change", function(e) {
            equal(e.action, "add");
            equal(e.items.length, 1);
            equal(e.items[0], observable.multiselectData[0]);
            equal(e.index, 0);
        });

        multiselect.value([1]);
        multiselect.trigger("change");
    });

    test("Adding item to non-empty observable array raises change event with add action (value primitive)", 4, function() {
        dom = $('<select data-role="multiselect" data-text-field="Text" data-value-field="ID" data-value-primitive="true" data-bind="value: data,source: multiselectData"></select>');
        var observable = kendo.observable({
            data: [1],
            multiselectData: [{ID: 1, Text: "Text1"}, {ID: 2, Text: "Text2"}, {ID: 3,    Text: "Text3"}]
        });

        kendo.bind(dom, observable);

        var multiselect = dom.data("kendoMultiSelect");

        observable.data.bind("change", function(e) {
            equal(e.action, "add");
            equal(e.items.length, 1);
            equal(e.items[0], 2);
            equal(e.index, 1);
        });

        multiselect.value([1, 2]);
        multiselect.trigger("change");
    });

    test("Adding item to non-empty observable adds the item", 2, function() {
        dom = $('<select data-role="multiselect" data-text-field="Text" data-value-field="ID" data-value-primitive="true" data-bind="value: data,source: multiselectData"></select>');
        var observable = kendo.observable({
            data: [1],
            multiselectData: [{ID: 1, Text: "Text1"}, {ID: 2, Text: "Text2"}, {ID: 3,    Text: "Text3"}]
        });

        kendo.bind(dom, observable);

        var multiselect = dom.data("kendoMultiSelect");

        multiselect.value([1, 2]);
        multiselect.trigger("change");

        equal(observable.data[0], 1);
        equal(observable.data[1], 2);
    });

    test("Remove item raises change with remove action (value primitive)", 4, function() {
        dom = $('<select data-role="multiselect" data-text-field="Text" data-value-field="ID" data-value-primitive="true" data-bind="value: data,source: multiselectData"></select>');
        var observable = kendo.observable({
            data: [1,2],
            multiselectData: [{ID: 1, Text: "Text1"}, {ID: 2, Text: "Text2"}, {ID: 3,    Text: "Text3"}]
        });

        kendo.bind(dom, observable);

        var multiselect = dom.data("kendoMultiSelect");

        observable.data.bind("change", function(e) {
            equal(e.action, "remove");
            equal(e.items.length, 1);
            equal(e.items[0], 2);
            equal(e.index, 1);
        });

        multiselect.value([1]);
        multiselect.trigger("change");
    });

    test("Remove first item raises change with correct index", 1, function() {
        dom = $('<select data-role="multiselect" data-text-field="Text" data-value-field="ID" data-value-primitive="true" data-bind="value: data,source: multiselectData"></select>');
        var observable = kendo.observable({
            data: [1,2],
            multiselectData: [{ID: 1, Text: "Text1"}, {ID: 2, Text: "Text2"}, {ID: 3,    Text: "Text3"}]
        });

        kendo.bind(dom, observable);

        var multiselect = dom.data("kendoMultiSelect");

        observable.data.bind("change", function(e) {
            equal(e.index, 0);
        });

        multiselect.value([2]);
        multiselect.trigger("change");
    });

    test("Remove tag removes item from value field", 3, function() {
        dom = $('<select data-role="multiselect" data-text-field="Text" data-value-field="ID" data-value-primitive="true" data-bind="value: data,source: multiselectData"></select>');
        var observable = kendo.observable({
            data: [1,2,3],
            multiselectData: [{ID: 1, Text: "Text1"}, {ID: 2, Text: "Text2"}, {ID: 3,    Text: "Text3"}]
        });

        kendo.bind(dom, observable);

        var multiselect = dom.data("kendoMultiSelect");

        multiselect.value([1,3]);
        multiselect.trigger("change");

        equal(observable.data.length, 2);
        equal(observable.data[0], 1);
        equal(observable.data[1], 3);
    });

    test("Binding to unexisting field clears widget selection", 1, function() {
        dom = $('<select data-bind="value: test"><option>Test</option></select>');
        var observable = kendo.observable({
            data: [1,2,3]
        });

        var multiselect = dom.kendoMultiSelect({
            value: "Test"
        }).data("kendoMultiSelect");

        kendo.bind(dom, observable);

        deepEqual(multiselect.value(), []);
    });

    test("binding to a digit splices model field value correctly", function() {
        dom = $('<select data-role="multiselect" data-value-primitive="true" multiple="multiple" data-text-field="name" data-value-field="id" data-bind="source:items, value:selectedItem"/>');

        var observable = kendo.observable({
            items: [  { id: 0, name: "foo" }, { id: 1, name: "bar" }, { id: 2, name: "baz" } ],
            selectedItem: []
        });

        kendo.bind(dom, observable);
        dom.data("kendoMultiSelect").value([0]);
        dom.data("kendoMultiSelect").trigger("change");

        debugger;
        dom.data("kendoMultiSelect").value([0, 1]);
        dom.data("kendoMultiSelect").trigger("change");

        equal(observable.selectedItem.length, 2);
        equal(observable.selectedItem[0], observable.items[0].id);
        equal(observable.selectedItem[1], observable.items[1].id);
    });
})();
