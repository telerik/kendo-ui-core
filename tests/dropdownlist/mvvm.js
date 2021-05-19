(function() {
    var dropdownlist,
        dom;

    describe('dropdownlist MVVM', function() {
        beforeEach(function() {

            window.ddlDataBound = function() {
                assert.isOk(true);
            }

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

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }], value: null });
            observable.value = observable.items[1];

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoDropDownList").value(), "bar");
        });

        it("changing a value updates the view model", function() {
            dom = $('<select data-value-field="text" data-role="dropdownlist" data-bind="value:value,source:items" />');

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }], value: null });
            observable.value = observable.items[1];

            kendo.bind(dom, observable);
            dom.data("kendoDropDownList").select(0);
            dom.data("kendoDropDownList").trigger("change");

            assert.equal(observable.value, observable.items[0]);
        });

        it("changing a value updates the view model with object when source is grouped", function() {
            dom = $('<select data-value-field="text" data-role="dropdownlist" data-bind="value:value,source:items" />');

            var data = new kendo.data.ObservableArray([{ text: "foo", value: 1 }, { text: "bar", value: 2 }]);
            var observable = kendo.observable({
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

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }], value: null });
            observable.value = observable.items[1];

            kendo.bind(dom, observable);
            dom.data("kendoDropDownList").select(0);
            dom.data("kendoDropDownList").trigger("change");

            assert.equal(observable.value, observable.items[0].text);
        });

        it("display optionLabel when value and text are not defined", function() {
            dom = $('<select data-value-field="value" data-text-field="text" data-auto-bind="false" data-option-label="test" data-value-primitive="true" data-role="dropdownlist" data-bind="value:value,source:items" />');

            var observable = kendo.observable({ items: new kendo.data.DataSource([{ text: "foo", value: 1 }, { text: "bar", value: 2 }]), value: null });

            kendo.bind(dom, observable);
            var widget = dom.data("kendoDropDownList");

            assert.equal(widget.text(), "test");
        });

        it("widget datasource is use if source binding is not set", function() {
            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }], value: null });
            observable.value = observable.items[1];


            dom = $('<select data-value-field="text" data-bind="value:value" />').
                kendoDropDownList({
                    dataSource: observable.items
                });

            kendo.bind(dom, observable);

            dom.data("kendoDropDownList").select(0);
            dom.data("kendoDropDownList").trigger("change");

            assert.equal(observable.value, observable.items[0]);
        });

        it("changing a value updates the view model if bound to simple value", function() {
            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }], value: null });

            dom = $('<select data-role="dropdownlist" data-value-field="text" data-bind="value:value, source:items" />');
            observable.value = "foo";

            kendo.bind(dom, observable);

            dom.data("kendoDropDownList").select(1);
            dom.data("kendoDropDownList").trigger("change");

            assert.equal(observable.value, "bar");
        });

        it("binding dropdownlist initialized before binding", function() {
            dom = $('<select data-value-field="text" data-bind="value:value,source:items" />');

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }], value: null });
            observable.value = observable.items[1];

            dom.kendoDropDownList();

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoDropDownList").value(), "bar");
        });

        it("binding dropdownlist initialized after binding", function() {
            dom = $('<select data-value-field="text" data-bind="value:value,source:items" />');

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }], value: null });
            observable.value = observable.items[1];

            kendo.bind(dom, observable);

            dom.kendoDropDownList({ dataValueField: "text" });

            assert.equal(dom.data("kendoDropDownList").value(), "bar");
        });

        it("value binding with autobind:false and valueprimitive:true binds source when selected text is not defined", function() {
            dom = $('<input data-role="dropdownlist" data-value-field="value" data-text-field="text" data-auto-bind="false" data-value-primitive="true" data-bind="value:value, source:items" />');

            var observable = kendo.observable({
                items: new kendo.data.DataSource({
                    data: [{ text: "foo", value: "1" }, { text: "bar", value: "2" }]
                }),
                value: "2"
            });

            kendo.bind(dom, observable);

            var widget = dom.data("kendoDropDownList");

            assert.equal(widget.dataSource.view().length, 2);
            assert.equal(widget.value(), "2");
            assert.equal(widget.text(), "bar");
        });

        it("value binding with autobind:false and valueprimitive:true binds source when selected text is not defined and value is '0'", function() {
            dom = $('<input data-role="dropdownlist" data-value-field="value" data-text-field="text" data-auto-bind="false" data-value-primitive="true" data-bind="value:value, source:items" />');

            var observable = kendo.observable({
                items: new kendo.data.DataSource({
                    data: [{ text: "foo", value: "1" }, { text: "bar", value: 0 }]
                }),
                value: 0
            });

            kendo.bind(dom, observable);

            var widget = dom.data("kendoDropDownList");

            assert.equal(widget.dataSource.view().length, 2);
            assert.equal(widget.value(), "0");
            assert.equal(widget.text(), "bar");
        });

        it("value binding displays options.text when autoBind:false and valuePrimitive is true", function() {
            dom = $('<input data-role="dropdownlist" data-value-field="value" data-text-field="text" data-auto-bind="false" data-text="selected text" data-value-primitive="true" data-bind="value:value, source:items" />');

            var observable = kendo.observable({
                items: new kendo.data.DataSource({
                    data: [{ text: "foo" }, { text: "bar" }]
                }),
                value: "bar"
            });

            kendo.bind(dom, observable);

            var widget = dom.data("kendoDropDownList");

            assert.equal(widget.dataSource.view().length, 0);
            assert.equal(widget.value(), "bar");
            assert.equal(widget.text(), "selected text");
        });

        it("value binding honors autoBind:false option when valuePrimitive is false", function() {
            dom = $('<input data-role="dropdownlist" data-value-field="value" data-text-field="text" data-auto-bind="false" data-value-primitive="false" data-bind="value:value, source:items" />');

            var items = new kendo.data.ObservableArray([{ text: "foo", value: 1 }, { text: "bar", value: 2 }]);
            var observable = kendo.observable({
                items: new kendo.data.DataSource({ data: items })
            });
            observable.value = items[1];

            kendo.bind(dom, observable);

            var widget = dom.data("kendoDropDownList");

            assert.equal(widget.value(), "2");
            assert.equal(widget.text(), "bar");
        });

        it("source binding updates widgets value if value binding exists", function() {
            dom = $('<input data-role="dropdownlist" data-value-field="value" data-text-field="text" data-value-primitive="true" data-bind="value:value, source:items" />').appendTo(Mocha.fixture);

            var data = [{ text: "foo", value: "foo" }, { text: "bar", value: "bar" }];

            var observable = kendo.observable({
                items: [],
                value: ""
            });

            kendo.bind(dom, observable);

            observable.set("value", "bar");
            observable.set("items", data);

            var widget = dom.data("kendoDropDownList");

            assert.equal(widget.value(), "bar");
            assert.equal(widget.text(), "bar");
        });

        it("widget sets value if source is bound even when autoBind: false is set", function() {
            dom = $('<input data-role="dropdownlist" data-value-field="value" data-text-field="text" data-auto-bind="false" data-value-primitive="false" data-bind="value:value, source:items" />').appendTo(Mocha.fixture);

            var items = new kendo.data.ObservableArray([{ text: "foo", value: 1 }, { text: "bar", value: 2 }]);
            var observable = kendo.observable({
                items: items
            });
            observable.value = items[1];

            kendo.bind(dom, observable);

            var widget = dom.data("kendoDropDownList");

            assert.equal(widget.select(), 1);
        });

        it("widget does not raise change event when value binding is used with autoBind:false", function() {
            dom = $('<input data-role="dropdownlist" data-value-field="value" data-text-field="text" data-auto-bind="false" data-value-primitive="false" data-bind="value:value, source:items" />');

            var items = new kendo.data.ObservableArray([{ text: "foo", value: 1 }, { text: "bar", value: 2 }]);
            var observable = kendo.observable({
                items: new kendo.data.DataSource({ data: items })
            });
            observable.value = items[1];

            kendo.bind(dom, observable);

            var widget = dom.data("kendoDropDownList");

            widget.bind("change", function() {
                assert.isOk(false);
            });

            widget.wrapper.focus().blur();
        });

        it("initialized widget with autoBind:false does not raise change on initial binding after value binding is applied", function() {
            dom = $('<input data-value-primitive="false" data-bind="value:value"/>').appendTo(Mocha.fixture);

            var items = new kendo.data.ObservableArray([{ text: "foo", value: 1 }, { text: "bar", value: 2 }]);
            var observable = kendo.observable({
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

            var widget = dom.data("kendoDropDownList");

            widget.bind("change", function() {
                assert.isOk(false);
            });

            widget.wrapper.focus();
            widget.open();
            widget.wrapper.focusout();
        });

        it("widget does not loose selected value on first bound when autoBind: false is used", function(done) {
            dom = $('<input data-role="dropdownlist" data-value-field="value" data-text-field="text" data-auto-bind="false" data-value-primitive="false" data-bind="value:value, source:items" />');

            var items = new kendo.data.ObservableArray([{ text: "foo", value: 1 }, { text: "bar", value: 2 }]);
            var observable = kendo.observable({
                items: new kendo.data.DataSource({ data: items })
            });

            observable.value = items[1];

            kendo.bind(dom, observable);

            var widget = dom.data("kendoDropDownList");

            widget.bind("dataBound", function() {
                assert.equal(widget.value(), "2");
                assert.equal(widget.text(), "bar");
                assert.equal(widget.select(), 1);
                done();
            });

            widget.dataSource.fetch();
        });

        it("binding template", function() {
            dom = $('<select data-role="dropdownlist" data-template="template" data-bind="source:items" />');

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoDropDownList").ul.children().eq(0).html().toLowerCase().trim(), "<strong>foo</strong>");
        });

        it("binding template containing binding attributes", function() {
            dom = $('<select data-role="dropdownlist" data-template="template-with-attributes" data-bind="source:items" />');

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoDropDownList").ul.children().eq(0).html().toLowerCase().trim(), '<strong data-bind="text:text">foo</strong>');
        });

        it("updating an item from the data source updates the corresponding dropdownlist item", function() {
            dom = $('<select data-role="dropdownlist" data-template="template-with-attributes" data-bind="source:items" />');

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            observable.items[0].set("text", "baz");

            assert.equal(dom.data("kendoDropDownList").ul.children().eq(0).text().trim(), "baz");
        });

        it("destroying binding targets when the datasource changes", function() {
            dom = $('<select data-role="dropdownlist" data-template="template-with-attributes" data-bind="source:items" />');

            var observable = kendo.observable({ items: [{ text: "foo" }] });

            kendo.bind(dom, observable);
            dom.data("kendoDropDownList").refresh();

            assert.equal(observable.items[0]._events["change"].length, 2); //1 for the text binding and 1 for the ObservableArray
        });

        it("DropDownList is not replaced", function() {
            dom = $('<select data-role="dropdownlist" data-template="template-with-attributes" data-bind="source:items" />');

            dropDownList = dom.kendoDropDownList().data("kendoDropDownList");

            var observable = kendo.observable({ items: [{ text: "foo" }] });

            kendo.bind(dom, observable);
            assert.equal(dropDownList, dom.data("kendoDropDownList"));
        });

        it("removing items from the model updates the UI", function() {
            dom = $('<select data-bind="source:items" />');

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }, { text: "baz" }] });

            kendo.bind(dom, observable);

            new kendo.ui.DropDownList(dom);

            observable.items.splice(0, 1);

            assert.equal(dom.data("kendoDropDownList").ul.children().length, 2);
        });

        it("destroys detaches the events to widget", function() {
            dom = $('<div data-role="dropdownlist" data-bind="source:items" />');

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);
            kendo.unbind(dom);

            dropdownlist = dom.data("kendoDropDownList");

            assert.equal(dropdownlist._events["dataBound"].length, 0);
            assert.equal(dropdownlist._events["dataBinding"].length, 0);
        });


        it("dataBound event is raised if attached as option", function() {
            dom = $('<div data-role="dropdownlist" data-bound="ddlDataBound" data-bind="source:items" />');

            var observable = kendo.observable({
                items: [{ text: "foo" }, { text: "bar" }]
            });

            kendo.bind(dom, observable);
        });

        it("dataBound event is raised if attached as option to a already initialized dropdownlist", function() {
            dom = $('<div data-bound="ddlDataBound" data-bind="source:items" />').kendoDropDownList();

            var observable = kendo.observable({
                items: [{ text: "foo" }, { text: "bar" }]
            });

            kendo.bind(dom, observable);
        });

        it("binding enabled to false disables the widget", function() {
            dom = $('<select data-bind="enabled:enabled" data-role="dropdownlist"/>');

            var observable = kendo.observable({
                enabled: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.is(":disabled"));
        });

        it("binding enabled to true enables the widget", function() {
            dom = $('<select data-bind="enabled:enabled" disabled="disabled" data-role="dropdownlist" />');

            var observable = kendo.observable({
                enabled: true
            });

            kendo.bind(dom, observable);

            assert.isOk(!dom.is(":disabled"));
        });

        it("binding disable to true disables the widget", function() {
            dom = $('<select data-bind="disabled:disabled" disabled="disabled" data-role="dropdownlist" />');

            var observable = kendo.observable({
                disabled: false
            });

            kendo.bind(dom, observable);

            assert.isOk(!dom.is(":disabled"));
        });

        it("binding disabled to false enables the widget", function() {
            dom = $('<select data-bind="disabled:disabled" data-role="dropdownlist" />');

            var observable = kendo.observable({
                disabled: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.is(":disabled"));
        });

        it("assign to DataSource as ViewModel field", function() {
            dom = $('<select data-text-field="text" data-bind="source:dataSource" data-role="dropdownlist" />');
            var dataSource = new kendo.data.DataSource({
                data: [{ text: "foo" }, { text: "bar" }]
            });

            var observable = kendo.observable({
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
            var dataSource = new kendo.data.DataSource({
                data: [{ text: "foo" }, { text: "bar" }]
            });

            var observable = kendo.observable({
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

            var observable = kendo.observable({
                invisible: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoDropDownList").wrapper.css("display") == "none", "Display is 'none'");
        });

        it("binding invisible to false shows the widget", function() {
            dom = $('<select data-bind="invisible:invisible" data-role="dropdownlist" style="display:none"/>');

            var observable = kendo.observable({
                invisible: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoDropDownList").wrapper.css("display") != "none", "Display is not 'none'");
        });

        it("changing invisible to true hides the widget", function() {
            dom = $('<select data-bind="invisible:invisible" data-role="dropdownlist"/>');

            var observable = kendo.observable({
                invisible: false
            });

            kendo.bind(dom, observable);
            observable.set("invisible", true);

            assert.isOk(dom.data("kendoDropDownList").wrapper.css("display") == "none", "Display is 'none'");
        });

        it("changing invisible to false shows the widget", function() {
            dom = $('<select data-bind="invisible:invisible" data-role="dropdownlist"/>');

            var observable = kendo.observable({
                invisible: true
            });

            kendo.bind(dom, observable);
            observable.set("invisible", false);

            assert.isOk(dom.data("kendoDropDownList").wrapper.css("display") != "none", "Display is not 'none'");
        });

        it("binding visible to false hides the widget", function() {
            dom = $('<select data-bind="visible:visible" data-role="dropdownlist"/>');

            var observable = kendo.observable({
                visible: false
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoDropDownList").wrapper.css("display") == "none", "Display is 'none'");
        });

        it("binding visible to true shows the widget", function() {
            dom = $('<select data-bind="visible:visible" data-role="dropdownlist" style="display:none"/>');

            var observable = kendo.observable({
                visible: true
            });

            kendo.bind(dom, observable);

            assert.isOk(dom.data("kendoDropDownList").wrapper.css("display") != "none", "Display is not 'none'");
        });

        it("changing visible to false hides the widget", function() {
            dom = $('<select data-bind="visible:visible" data-role="dropdownlist"/>');

            var observable = kendo.observable({
                visible: true
            });

            kendo.bind(dom, observable);
            observable.set("visible", false);

            assert.isOk(dom.data("kendoDropDownList").wrapper.css("display") == "none", "Display is 'none'");
        });

        it("changing visible to true shows the widget", function() {
            dom = $('<select data-bind="visible:visible" data-role="dropdownlist"/>');

            var observable = kendo.observable({
                visible: false
            });

            kendo.bind(dom, observable);
            observable.set("visible", true);

            assert.isOk(dom.data("kendoDropDownList").wrapper.css("display") != "none", "Display is not 'none'");
        });

        it("selecting the default value sets the view model field to null", function() {
            dom = $('<select data-bind="value:bar, source:items" data-role="dropdownlist" data-value-field="text" data-text-field="text" data-option-label="placeholder"/>');

            var observable = kendo.observable({
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

            var observable = kendo.observable({
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
            var dataSource = new kendo.data.DataSource({
                data: [{ text: "foo" }, { text: "bar" }]
            });

            var observable = kendo.observable({
                dataSource: dataSource
            });

            kendo.bind(dom, observable);
            dropdownlist = dom.data("kendoDropDownList");

            assert.isOk(!dropdownlist.ul.children().length);
        });

        it("Widget sets optionLabel when source binding is used", function() {
            dom = $('<select data-text-field="text" data-option-label="test" data-bind="source:dataSource" data-role="dropdownlist" />');

            var observable = kendo.observable({
                dataSource: [{ text: "foo" }, { text: "bar" }]
            });

            kendo.bind(dom, observable);
            dropdownlist = dom.data("kendoDropDownList");

            assert.equal(dropdownlist.select(), 0);
            assert.equal(dropdownlist.text(), "test");
        });

        it("widget with autoBind:false does not select first item when model value is null", function() {
            dom = $('<input data-auto-bind="false" data-text-field="text" data-value-field="text" data-bind="value:bar,source:items" data-role="dropdownlist" />');

            var observable = kendo.observable({
                items: new kendo.data.DataSource({ data: [{ text: "foo" }, { text: "bar" }] }),
                bar: null
            });

            kendo.bind(dom, observable);
            dropdownlist = dom.data("kendoDropDownList");

            dropdownlist.dataSource.read();

            assert.equal(dropdownlist.select(), -1);
        });

        it("popup option can be successfully set through data attribute", function() {
            dom = $('<select data-popup="{ origin: \'top left\', position: \'bottom left\' }" data-role="dropdownlist" />');

            var observable = kendo.observable({});

            kendo.bind(dom, observable);
            dropdownlist = dom.data("kendoDropDownList");

            assert.equal(dropdownlist.options.popup.origin, "top left");
            assert.equal(dropdownlist.options.popup.position, "bottom left");
        });
    });

    //TODO Investigate random fails
    // describe('virtualized dropdownlist MVVM', function() {
    //     beforeEach(function() {

    //     });

    //     afterEach(function() {
    //         kendo.destroy(dom);
    //     });

    //     function generateData(parameters) {
    //         var items = [];

    //         for (var i = parameters.skip, len = parameters.skip + parameters.take; i < len; i++) {
    //             items.push({
    //                 id: i,
    //                 value: i,
    //                 text: "Item " + i
    //             });
    //         }

    //         return items;
    //     }

    //     function createAsyncDataSource() {
    //         return new kendo.data.DataSource({
    //             transport: {
    //                 read: function(options) {
    //                     setTimeout(function() {
    //                         options.success({ data: generateData(options.data), total: 300 });
    //                     }, 0);
    //                 }
    //             },
    //             serverFiltering: true,
    //             serverPaging: true,
    //             pageSize: 40,
    //             schema: {
    //                 data: "data",
    //                 total: "total"
    //             }
    //         });
    //     }

    //     function scroll(element, height) {
    //         element.scrollTop(height);
    //         element.trigger("scroll");
    //     }

    //     it("widget scrolled to second range sets model to the correct data item", function(done) {
    //         var container_height = 200;

    //         dom = $('<select data-bind="value:value" />').appendTo(Mocha.fixture);

    //         var dropdownlist = new kendo.ui.DropDownList(dom, {
    //             close: function(e) { e.preventDefault(); },
    //             height: container_height,
    //             animation: false,
    //             dataTextField: "text",
    //             dataValueField: "value",
    //             dataSource: createAsyncDataSource(),
    //             virtual: {
    //                 valueMapper: function(o) { o.success(o.value); },
    //                 itemHeight: 40
    //             }
    //         });

    //         var viewModel = kendo.observable({
    //             value: null
    //         });

    //         kendo.bind(dom, viewModel);

    //         dropdownlist.one("dataBound", function() {
    //             dropdownlist.one("dataBound", function() {
    //                 dropdownlist.one("dataBound", function() {
    //                     dropdownlist.trigger("change");

    //                     assert.deepEqual(viewModel.value, dropdownlist.dataItem());

    //                     done();
    //                 });

    //                 dropdownlist.value(10);
    //             });

    //             dropdownlist.open();

    //             scroll(dropdownlist.listView.content, 8 * container_height);
    //         });
    //     });
    // });
}());
