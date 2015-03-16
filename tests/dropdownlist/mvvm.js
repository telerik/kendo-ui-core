(function() {
    var dropdownlist,
        dom;

    module('dropdownlist MVVM', {
        setup: function() {

            window.ddlDataBound = function() {
                ok(true);
            }

            QUnit.fixture.html('<script id="template" type="text/x-kendo-template">\
                <strong>#:text#</strong>\
            </script>\
            <script id="template-with-attributes" type="text/x-kendo-template">\
                <strong data-bind="text:text"></strong>\
            </script>');
        },
        teardown: function() {
            kendo.destroy(dom);
        }
    });

    test("initializes a dropdownlist when data role is dropdownlist", function() {
        dom = $('<select data-role="dropdownlist"/>');

        kendo.bind(dom);

        ok(dom.data("kendoDropDownList") instanceof kendo.ui.DropDownList);
    });

    test("initializes options from data attributes", function() {
        dom = $('<select data-role="dropdownlist" data-text-field="foo" data-value-field="bar"/>');

        kendo.bind(dom);

        dropdownlist = dom.data("kendoDropDownList");

        equal(dropdownlist.options.dataTextField, "foo");
        equal(dropdownlist.options.dataValueField, "bar");
    });

    test("initializes data source", function() {
        dom = $('<select data-role="dropdownlist" data-bind="source:items" />');

        kendo.bind(dom, { items: ["foo", "bar"] } );

        equal(dom.data("kendoDropDownList").dataSource.view()[0], "foo");
        equal(dom.data("kendoDropDownList").dataSource.view()[1], "bar");
    });

    test("initializes value from view model", function() {
        dom = $('<select data-role="dropdownlist" data-bind="value:value,source:items" />');

        kendo.bind(dom, { items: ["foo", "bar"], value: "bar" } );

        equal(dom.data("kendoDropDownList").value(), "bar");
    });

    test("selects first item on source binding", function() {
        dom = $('<select data-role="dropdownlist" data-bind="source:items" />');

        kendo.bind(dom, { items: ["foo", "bar"] } );

        equal(dom.data("kendoDropDownList").value(), "foo");
    });

    test("initializes complex value from view model", function() {
        dom = $('<select data-value-field="text" data-role="dropdownlist" data-bind="value:value,source:items" />');

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
        observable.value = observable.items[1];

        kendo.bind(dom, observable);

        equal(dom.data("kendoDropDownList").value(), "bar");
    });

    test("changing a value updates the view model", function() {
        dom = $('<select data-value-field="text" data-role="dropdownlist" data-bind="value:value,source:items" />');

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
        observable.value = observable.items[1];

        kendo.bind(dom, observable);
        dom.data("kendoDropDownList").select(0);
        dom.data("kendoDropDownList").trigger("change");

        equal(observable.value, observable.items[0]);
    });

    test("uses data value field if data-value-primitive is set to true", function() {
        dom = $('<select data-value-field="text" data-value-primitive="true" data-role="dropdownlist" data-bind="value:value,source:items" />');

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
        observable.value = observable.items[1];

        kendo.bind(dom, observable);
        dom.data("kendoDropDownList").select(0);
        dom.data("kendoDropDownList").trigger("change");

        equal(observable.value, observable.items[0].text);
    });

    test("widget datasource is use if source binding is not set", function() {
        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
            observable.value = observable.items[1];


        dom = $('<select data-value-field="text" data-bind="value:value" />').
            kendoDropDownList( {
                dataSource: observable.items
            });

        kendo.bind(dom, observable);

        dom.data("kendoDropDownList").select(0);
        dom.data("kendoDropDownList").trigger("change");

        equal(observable.value, observable.items[0]);
    });

    test("changing a value updates the view model if bound to simple value", function() {
        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });

        dom = $('<select data-role="dropdownlist" data-value-field="text" data-bind="value:value, source:items" />');
        observable.value = "foo";

        kendo.bind(dom, observable);

        dom.data("kendoDropDownList").select(1);
        dom.data("kendoDropDownList").trigger("change");

        equal(observable.value, "bar");
    });

    test("binding dropdownlist initialized before binding", function() {
        dom = $('<select data-value-field="text" data-bind="value:value,source:items" />');

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
        observable.value = observable.items[1];

        dom.kendoDropDownList();

        kendo.bind(dom, observable);

        equal(dom.data("kendoDropDownList").value(), "bar");
    });

    test("binding dropdownlist initialized after binding", function() {
        dom = $('<select data-value-field="text" data-bind="value:value,source:items" />');

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}], value: null });
        observable.value = observable.items[1];

        kendo.bind(dom, observable);

        dom.kendoDropDownList({ dataValueField: "text" });

        equal(dom.data("kendoDropDownList").value(), "bar");
    });

    test("binding template", function() {
        dom = $('<select data-role="dropdownlist" data-template="template" data-bind="source:items" />');

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

        kendo.bind(dom, observable);

        equal($.trim(dom.data("kendoDropDownList").ul.children().eq(0).html().toLowerCase()), "<strong>foo</strong>");
    });

    test("binding template containing binding attributes", function() {
        dom = $('<select data-role="dropdownlist" data-template="template-with-attributes" data-bind="source:items" />');

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

        kendo.bind(dom, observable);

        equal($.trim(dom.data("kendoDropDownList").ul.children().eq(0).html().toLowerCase()), '<strong data-bind="text:text">foo</strong>');
    });

    test("updating an item from the data source updates the corresponding dropdownlist item", function() {
        dom = $('<select data-role="dropdownlist" data-template="template-with-attributes" data-bind="source:items" />');

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

        kendo.bind(dom, observable);

        observable.items[0].set("text", "baz");

        equal($.trim(dom.data("kendoDropDownList").ul.children().eq(0).text()), "baz");
    });

    test("destroying binding targets when the datasource changes", function() {
        dom = $('<select data-role="dropdownlist" data-template="template-with-attributes" data-bind="source:items" />');

        var observable = kendo.observable({ items: [{ text:"foo"} ] });

        kendo.bind(dom, observable);
        dom.data("kendoDropDownList").refresh();

        equal(observable.items[0]._events["change"].length, 2); //1 for the text binding and 1 for the ObservableArray
    });

    test("DropDownList is not replaced", function() {
        dom = $('<select data-role="dropdownlist" data-template="template-with-attributes" data-bind="source:items" />');

        dropDownList = dom.kendoDropDownList().data("kendoDropDownList");

        var observable = kendo.observable({ items: [{ text:"foo"} ] });

        kendo.bind(dom, observable);
        equal(dropDownList, dom.data("kendoDropDownList"));
    });

    test("removing items from the model updates the UI", function() {
        dom = $('<select data-bind="source:items" />');

        var observable = kendo.observable({ items: [{ text:"foo"},{ text: "bar" },{ text: "baz" }] });

        kendo.bind(dom, observable);

        new kendo.ui.DropDownList(dom);

        observable.items.splice(0,1);

        equal(dom.data("kendoDropDownList").ul.children().length, 2);
    });

    test("destroys detaches the events to widget", function() {
        dom = $('<div data-role="dropdownlist" data-bind="source:items" />');

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

        kendo.bind(dom, observable);
        kendo.unbind(dom);

        dropdownlist = dom.data("kendoDropDownList");

        equal(dropdownlist._events["dataBound"].length, 0);
        equal(dropdownlist._events["dataBinding"].length, 0);
    });


    test("dataBound event is raised if attached as option", 2, function() {
        dom = $('<div data-role="dropdownlist" data-bound="ddlDataBound" data-bind="source:items" />');

        var observable = kendo.observable({
            items: [{text:"foo"}, {text:"bar"}]
        });

        kendo.bind(dom, observable);
    });

    test("dataBound event is raised if attached as option to a already initialized dropdownlist", 1, function() {
        dom = $('<div data-bound="ddlDataBound" data-bind="source:items" />').kendoDropDownList();

        var observable = kendo.observable({
            items: [{text:"foo"}, {text:"bar"}]
        });

        kendo.bind(dom, observable);
    });

    test("binding enabled to false disables the widget", function() {
        dom = $('<select data-bind="enabled:enabled" data-role="dropdownlist"/>');

        var observable = kendo.observable({
            enabled: false
        });

        kendo.bind(dom, observable);

        ok(dom.is(":disabled"));
    });

    test("binding enabled to true enables the widget", function() {
        dom = $('<select data-bind="enabled:enabled" disabled="disabled" data-role="dropdownlist" />');

        var observable = kendo.observable({
            enabled: true
        });

        kendo.bind(dom, observable);

        ok(!dom.is(":disabled"));
    });

    test("binding disable to true disables the widget", function() {
        dom = $('<select data-bind="disabled:disabled" disabled="disabled" data-role="dropdownlist" />');

        var observable = kendo.observable({
            disabled: false
        });

        kendo.bind(dom, observable);

        ok(!dom.is(":disabled"));
    });

    test("binding disabled to false enables the widget", function() {
        dom = $('<select data-bind="disabled:disabled" data-role="dropdownlist" />');

        var observable = kendo.observable({
            disabled: true
        });

        kendo.bind(dom, observable);

        ok(dom.is(":disabled"));
    });

    test("assign to DataSource as ViewModel field", function() {
        dom = $('<select data-text-field="text" data-bind="source:dataSource" data-role="dropdownlist" />');
        var dataSource = new kendo.data.DataSource({
            data: [{text:"foo"}, {text:"bar"}]
        });

        var observable = kendo.observable({
            dataSource: dataSource
        });

        kendo.bind(dom, observable);
        dropdownlist = dom.data("kendoDropDownList");

        strictEqual(dropdownlist.dataSource, dataSource);

        equal($.trim(dropdownlist.ul.children().eq(0).text()), "foo");
        equal($.trim(dropdownlist.ul.children().eq(1).text()), "bar");
    });

    test("ViewModel is updated when source is DataSource", function() {
        dom = $('<select data-value-field="text" data-bind="source:dataSource, value: selected" data-role="dropdownlist" />');
        var dataSource = new kendo.data.DataSource({
            data: [{text:"foo"}, {text:"bar"}]
        });

        var observable = kendo.observable({
            dataSource: dataSource,
            selected: {}
        });

        kendo.bind(dom, observable);
        dropdownlist = dom.data("kendoDropDownList");
        dropdownlist.select(1);
        dropdownlist.trigger("change");

        equal(observable.selected, observable.dataSource.data()[1]);
    });

    test("binding invisible to true hides the widget", function() {
        dom = $('<select data-bind="invisible:invisible" data-role="dropdownlist"/>');

        var observable = kendo.observable({
            invisible: true
        });

        kendo.bind(dom, observable);

        ok(dom.data("kendoDropDownList").wrapper.css("display") == "none", "Display is 'none'");
    });

    test("binding invisible to false shows the widget", function() {
        dom = $('<select data-bind="invisible:invisible" data-role="dropdownlist" style="display:none"/>');

        var observable = kendo.observable({
            invisible: false
        });

        kendo.bind(dom, observable);

        ok(dom.data("kendoDropDownList").wrapper.css("display") != "none", "Display is not 'none'");
    });

    test("changing invisible to true hides the widget", function() {
        dom = $('<select data-bind="invisible:invisible" data-role="dropdownlist"/>');

        var observable = kendo.observable({
            invisible: false
        });

        kendo.bind(dom, observable);
        observable.set("invisible", true);

        ok(dom.data("kendoDropDownList").wrapper.css("display") == "none", "Display is 'none'");
    });

    test("changing invisible to false shows the widget", function() {
        dom = $('<select data-bind="invisible:invisible" data-role="dropdownlist"/>');

        var observable = kendo.observable({
            invisible: true
        });

        kendo.bind(dom, observable);
        observable.set("invisible", false);

        ok(dom.data("kendoDropDownList").wrapper.css("display") != "none", "Display is not 'none'");
    });

    test("binding visible to false hides the widget", function() {
        dom = $('<select data-bind="visible:visible" data-role="dropdownlist"/>');

        var observable = kendo.observable({
            visible: false
        });

        kendo.bind(dom, observable);

        ok(dom.data("kendoDropDownList").wrapper.css("display") == "none", "Display is 'none'");
    });

    test("binding visible to true shows the widget", function() {
        dom = $('<select data-bind="visible:visible" data-role="dropdownlist" style="display:none"/>');

        var observable = kendo.observable({
            visible: true
        });

        kendo.bind(dom, observable);

        ok(dom.data("kendoDropDownList").wrapper.css("display") != "none", "Display is not 'none'");
    });

    test("changing visible to false hides the widget", function() {
        dom = $('<select data-bind="visible:visible" data-role="dropdownlist"/>');

        var observable = kendo.observable({
            visible: true
        });

        kendo.bind(dom, observable);
        observable.set("visible", false);

        ok(dom.data("kendoDropDownList").wrapper.css("display") == "none", "Display is 'none'");
    });

    test("changing visible to true shows the widget", function() {
        dom = $('<select data-bind="visible:visible" data-role="dropdownlist"/>');

        var observable = kendo.observable({
            visible: false
        });

        kendo.bind(dom, observable);
        observable.set("visible", true);

        ok(dom.data("kendoDropDownList").wrapper.css("display") != "none", "Display is not 'none'");
    });

    test("selecting the default value sets the view model field to null", function() {
        dom = $('<select data-bind="value:bar, source:items" data-role="dropdownlist" data-value-field="text" data-option-label="placeholder"/>');

        var observable = kendo.observable({
            items: [{text:"foo"}, {text:"bar"}],
            bar: null
        });

        kendo.bind(dom, observable);
        dom.data("kendoDropDownList").select(1);
        dom.data("kendoDropDownList").trigger("change");

        dom.data("kendoDropDownList").select(0);
        dom.data("kendoDropDownList").trigger("change");
        strictEqual(observable.bar, null);
    });

    test("selecting the default value sets the view model field to emtpy string", function() {
        dom = $('<select data-bind="value:bar, source:items" data-role="dropdownlist" data-value-field="text" data-option-label="placeholder"/>');

        var observable = kendo.observable({
            items: [{text:"foo"}, {text:"bar"}],
            bar: ""
        });

        kendo.bind(dom, observable);
        dom.data("kendoDropDownList").select(1);
        dom.data("kendoDropDownList").trigger("change");

        dom.data("kendoDropDownList").select(0);
        dom.data("kendoDropDownList").trigger("change");
        strictEqual(observable.bar, "");
    });

    test("assign to DataSource as ViewModel field", function() {
        dom = $('<select data-text-field="text" data-auto-bind="false" data-bind="source:dataSource" data-role="dropdownlist" />');
        var dataSource = new kendo.data.DataSource({
            data: [{text:"foo"}, {text:"bar"}]
        });

        var observable = kendo.observable({
            dataSource: dataSource
        });

        kendo.bind(dom, observable);
        dropdownlist = dom.data("kendoDropDownList");

        ok(!dropdownlist.ul.children().length);
    });

    test("Widget sets optionLabel when source binding is used", function() {
        dom = $('<select data-text-field="text" data-option-label="test" data-bind="source:dataSource" data-role="dropdownlist" />');

        var observable = kendo.observable({
            dataSource: [{text:"foo"}, {text:"bar"}]
        });

        kendo.bind(dom, observable);
        dropdownlist = dom.data("kendoDropDownList");

        equal(dropdownlist.select(), 0);
        equal(dropdownlist.text(), "test");
    });
})();
