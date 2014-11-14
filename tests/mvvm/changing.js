(function(){

module("mvvm observing", {
    setup: function() {
        this.sourceBinder = kendo.data.binders.source;
        QUnit.fixture.append(
            '<script id="array-template" type="text/x-kendo-template">' +
            '<li data-bind="text:name"></li>' +
            '</script>' +
            '<script id="ul-template" type="text/x-kendo-template">' +
            '<li data-bind="text:root"></li>' +
            '</script>' +
            '<script id="ul-template-alias" type="text/x-kendo-template">' +
            '<li data-bind="text:rootAlias"></li>' +
            '</script>' +
            '<script id="ul-input-template" type="text/x-kendo-template">' +
            '<li><input data-bind="value:root" /></li>' +
            '</script>' +
            '<script id="ul-input-child-template" type="text/x-kendo-template">' +
            '<li><input data-bind="value:root.child"/></li>' +
            '</script>' +
            '<script id="simple-field-template" type="text/x-kendo-template">' +
            '#= get("foo") #' +
            '</script>' +
            '<script id="nested-field-template" type="text/x-kendo-template">' +
            '#= get("foo.bar") #' +
            '</script>' +
            '<script id="nested-field-template-multiple-gets" type="text/x-kendo-template">' +
            '#= get("foo").get("bar") #' +
            '</script>' +
            '<script>' +
            'var templateEvaluationCounter = 0;' +
            '</script>' +
            '<script id="counting-template" type="text/x-kendo-template">' +
            '# templateEvaluationCounter ++; #' +
            '#= get("foo") #' +
            '</script>' +
            '<script id="custom-binder-template" type="text/x-kendo-template">' +
            '<span data-bind="custom: this"></span>' +
            '</script>' +
            '<script id="if-else-template" type="text/x-kendo-template">' +
            '# if (get("foo") == "foo") { #' +
            '    #: get("foo") #' +
            '# } else { #' +
            '    #: get("bar") #' +
            '# } #' +
            '</script>'
        );
    },
    teardown: function() {
        kendo.data.binders.source = this.sourceBinder;
    }
});

test("changing a view model field reflects UI", function() {
    var viewModel = kendo.observable( {
        foo: "foo"
    });

    var dom = $('<span data-bind="text:foo"/>');
    kendo.bind(dom, viewModel);
    viewModel.set("foo", "bar");
    equal(dom.text(), "bar");
});

test("changing a view model field reflects UI via array access", function() {
    var viewModel = kendo.observable( {
        "1": "foo"
    });

    var dom = $('<span data-bind="text: [\'1\']"/>');
    kendo.bind(dom, viewModel);
    viewModel.set("['1']", "bar");
    equal(dom.text(), "bar");
});

test("field name of nested view model remains the same", 1, function() {
    var viewModel = kendo.observable({
        foo: {
            bar: "bar"
        }
    });

    viewModel.foo.bind("change", function(e) {
        equal(e.field, "bar");
    });

    viewModel.foo.set("bar", "baz");
});

test("changing a view model field from a view model function bound to UI reflects UI", function() {
    var viewModel = kendo.observable( {
        foo: "foo",
        bar: function() {
            this.set("foo", "baz");
        }
    });

    var dom = $('<div><span data-bind="text:foo"/><button data-bind="click:bar"></button></div>');

    kendo.bind(dom, viewModel);

    equal(dom.find("span").text(), "foo");

    dom.find("button").trigger("click");

    equal(dom.find("span").text(), "baz");
});

test("removing item from view model array reflects UI", function() {
    var viewModel = kendo.observable( {
        foo: ["foo", "bar", "baz"],
        bar: "boo" // needed to test closure value assignment
    });

    var dom = $('<select data-bind="source:foo"/>');

    kendo.bind(dom, viewModel);

    viewModel.foo.splice(1, 1);

    equal(dom.find("option").length, 2);
    equal(dom.find("option").first().text(), "foo");
    equal(dom.find("option").last().text(), "baz");
});

test("removing item from array removes table rows", function() {
    var viewModel = kendo.observable( {
        foo: ["foo", "bar", "baz"],
        bar: "boo" // needed to test closure value assignment
    });

    var dom = $('<table data-bind="source:foo"/>');

    kendo.bind(dom, viewModel);

    viewModel.foo.splice(1, 1);

    equal(dom.find("tr").length, 2);
    equal(dom.find("tr").first().text(), "foo");
    equal(dom.find("tr").last().text(), "baz");
});

test("change event notifies value listeners", function() {
    var viewModel = kendo.observable( {
        foo: ["foo", "bar", "baz"],
        bar: "bar"
    });

    var dom = $('<div><select data-bind="source:foo,value:bar"/><span data-bind="text:bar"/></div>');

    kendo.bind(dom, viewModel);

    dom.find("option:first").prop("selected", true);
    dom.find("select").trigger("change");
    equal(dom.find("span").text(), "foo");
});

test("the view model is updated when the change event is raised", 1, function() {
    var viewModel = kendo.observable( {
        foo: "",
        change: function() {
            equal(this.foo, "bar");
        }
    });

    var dom = $('<input data-bind="events: { change: change }, value: foo" />');

    kendo.bind(dom, viewModel);

    dom.val("bar").trigger("change");
});

test("keyup event notifies value listeners", function() {
    var viewModel = kendo.observable( {
        foo: ["foo", "bar", "baz"],
        bar: "bar"
    });

    var dom = $('<div><input data-value-update="keyup" data-bind="value:bar"/><span data-bind="text:bar"/></div>');

    kendo.bind(dom, viewModel);

    dom.find("input").val("foo").trigger("keyup");

    equal(dom.find("span").text(), "foo");
});

test("changing value when value update mode is keyup does not reset the input value", 1, function() {
    var viewModel = kendo.observable( {
        bar: "bar"
    });

    var dom = $('<div><input data-value-update="keyup" data-bind="value:bar"/><span data-bind="text:bar"/></div>');

    kendo.bind(dom, viewModel);

    viewModel.bind("get", function(e) {
        ok(true, "Should be called only for the span");
    });

    dom.find("input").val("foo")
        .trigger("keyup");
});

test("changing ui updates view model with array accessor", function() {
    var viewModel = kendo.observable( {
        "1": "bar"
    });

    var dom = $('<input data-bind="value:[\'1\']"/>');

    kendo.bind(dom, viewModel);

    dom.val("foo").trigger("change");

    equal(viewModel["1"], "foo");
});

test("select of multi select updates the viewModel", function() {
    var viewModel = kendo.observable( {
        foo: ["foo", "bar", "baz"],
        selectedItems: []
    });

    var dom = $('<select data-bind="source:foo,value:selectedItems" multiple="multiple"/>');

    kendo.bind(dom, viewModel);

    dom.find("option:first").attr("selected", "selected");
    dom.find("option:last").attr("selected", "selected");
    dom.trigger("change");

    equal(viewModel.selectedItems[0], "foo");
    equal(viewModel.selectedItems[1], "baz");
});

test("tracking changes of the parent object", function() {
    var dom = $('<div data-bind="text: current.name"/>');

    var viewModel = kendo.observable({
        current: null,
        items: [ { name: "foo" }, { name: "bar" }]
    });

    viewModel.current = viewModel.items[0];

    kendo.bind(dom, viewModel);

    viewModel.set("current", viewModel.items[1]);

    equal(dom.text(), "bar");
});

test("tracking changes of array item members", function() {
    var dom = $('<div data-bind="text: items[0].name"/>');

    var viewModel = kendo.observable({
        items: [ { name: "foo" } ]
    });


    kendo.bind(dom, viewModel);

    viewModel.items[0].set("name", "bar");

    equal(dom.text(), "bar");
});

test("tracking changes the array item", function() {
    var dom = $('<div data-bind="text: items[0].name"/>');

    var viewModel = kendo.observable({
        items: [ { name: "foo" } ]
    });

    kendo.bind(dom, viewModel);

    viewModel.items.splice(0, 0, { name: "bar" });

    equal(dom.text(), "bar");
});

test("select of multi select bound to complex objects", function() {
    var viewModel = kendo.observable( {
        foo: [{name:"foo"}, {name:"bar"}],
        selectedItems: []
    });

    var dom = $('<select data-value-field="name" data-bind="source:foo,value:selectedItems" multiple="multiple"/>');

    kendo.bind(dom, viewModel);

    dom.find("option:first").attr("selected", "selected");
    dom.find("option:last").attr("selected", "selected");
    dom.trigger("change");

    equal(viewModel.selectedItems[0], viewModel.foo[0]);
    equal(viewModel.selectedItems[1], viewModel.foo[1]);
});

test("select tracks complex value", function() {
    var viewModel = kendo.observable( {
        foo: [ { text: "foo" }, { text: "bar" } ],
        selectedItem: null
    });

    viewModel.selectedItem = viewModel.foo[0];

    var dom = $('<select data-value-field="text" data-bind="source:foo,value:selectedItem"/>');

    kendo.bind(dom, viewModel);

    dom.find("option:first")[0].selected = false;
    dom.find("option:last")[0].selected = true;

    dom.trigger("change");
    dom.triggerHandler("change");

    strictEqual(viewModel.selectedItem, viewModel.foo[1]);
});

test("select uses data value field if data-value-primitive is set to true", function() {
    var viewModel = kendo.observable( {
        foo: [ { text: "foo" }, { text: "bar" } ],
        selectedItem: null
    });

    viewModel.selectedItem = viewModel.foo[0];

    var dom = $('<select data-value-field="text" data-value-primitive="true" data-bind="source:foo,value:selectedItem"/>');

    kendo.bind(dom, viewModel);

    dom.find("option:first")[0].selected = false;
    dom.find("option:last")[0].selected = true;

    dom.trigger("change");
    dom.triggerHandler("change");

    strictEqual(viewModel.selectedItem, viewModel.foo[1].text);
});

test("select uses data value field if data-value-primitive is set to true with data source", function() {
    var viewModel = kendo.observable( {
        foo: new kendo.data.DataSource({ data: [ { text: "foo" }, { text: "bar" } ]}),
        selectedItem: ""
    });

    viewModel.selectedItem = viewModel.foo[0];

    var dom = $('<select data-value-field="text" data-text-field="text" data-value-primitive="true" data-bind="source:foo,value:selectedItem"/>');

    kendo.bind(dom, viewModel);

    dom.find("option:first")[0].selected = false;
    dom.find("option:last")[0].selected = true;

    dom.trigger("change");
    dom.triggerHandler("change");

    strictEqual(viewModel.selectedItem, viewModel.foo.view().at(1).text);
});

test("select works with data source and existing selectedItem", function() {
    var ds = new kendo.data.DataSource({ data: [ { text: "foo" }, { text: "bar" } ]});
    ds.read();

    var viewModel = kendo.observable({
        foo: ds,
        selectedItem: ds.at(0)
    });

    var dom = $('<select data-text-field="text" data-value-field="text" data-bind="source:foo,value:selectedItem"/>');

    kendo.bind(dom, viewModel);

    dom.find("option:first")[0].selected = false;
    dom.find("option:last")[0].selected = true;

    dom.trigger("change");
    dom.triggerHandler("change");

    strictEqual(viewModel.selectedItem, viewModel.foo.view().at(1));
});


test("select works with data source and an initial null value", function() {
    var ds = new kendo.data.DataSource({ data: [ { text: "foo" }, { text: "bar" } ]});

    var viewModel = kendo.observable({
        foo: ds,
        selectedItem: null
    });

    var dom = $('<select data-text-field="text" data-value-field="text" data-bind="source:foo,value:selectedItem"/>');

    kendo.bind(dom, viewModel);

    dom.find("option:first")[0].selected = false;
    dom.find("option:last")[0].selected = true;

    dom.trigger("change");
    dom.triggerHandler("change");

    strictEqual(viewModel.selectedItem, viewModel.foo.view().at(1));
});

test("select tracks complex value if text-field is set", function() {
    var viewModel = kendo.observable( {
        foo: [ { text: "foo" }, { text: "bar" } ],
        selectedItem: null
    });

    viewModel.selectedItem = viewModel.foo[0];

    var dom = $('<select data-text-field="text" data-bind="source:foo,value:selectedItem"/>');

    kendo.bind(dom, viewModel);

    dom.find("option:first")[0].selected = false;
    dom.find("option:last")[0].selected = true;

    dom.trigger("change");

    strictEqual(viewModel.selectedItem, viewModel.foo[1]);
});

test("multi select tracks complex value if text-field is set", function() {
    var viewModel = kendo.observable( {
        foo: [ { text: "foo" }, { text: "bar" } ],
        selectedItems: []
    });

    viewModel.selectedItem = viewModel.foo[0];

    var dom = $('<select multiple="multiple" data-text-field="text" data-bind="source:foo,value:selectedItems"/>');

    kendo.bind(dom, viewModel);

    dom.find("option:last").attr("selected", "selected");

    dom.trigger("change");

    strictEqual(viewModel.selectedItems[0], viewModel.foo[1]);
});

test("select bound to complex object updates simple value", function() {
    var viewModel = kendo.observable( {
        foo: [ { text: "foo" }, { text: "bar" } ],
        selectedItem: "foo"
    });

    var dom = $('<select data-value-field="text" data-bind="source:foo,value:selectedItem"/>');

    kendo.bind(dom, viewModel);

    dom.find("option:first")[0].selected = false;
    dom.find("option:last")[0].selected = true;

    dom.trigger("change");

    strictEqual(viewModel.selectedItem, "bar");
});

test("multi select has same item count after change", function() {
    var viewModel = kendo.observable( {
        items: ["foo", "bar", "baz"],
        selectedItems: []
    });

    var dom = $('<select data-bind="source:items,value:selectedItems" multiple="multiple" />');

    kendo.bind(dom, viewModel);

    dom.find("option:first").attr("selected", "selected");
    dom.trigger("change");
    dom.find("option:last").attr("selected", "selected");
    dom.trigger("change");

    equal(dom.find("option").length, 3);
});

test("changing the value updates the view model", function() {
    var dom = $('<input data-bind="value:foo" />');

    var viewModel = kendo.observable( { foo: "foo" });

    kendo.bind(dom, viewModel);

    dom.val("bar");
    dom.trigger("change");

    equal(viewModel.foo, "bar");
});

test("changing the input value updates dependent observable", 1, function() {
    var dom = $('<input data-bind="value:foo" />');

    var viewModel = kendo.observable({
        bar: "bar",
        foo: function(value) {
            if (value !== undefined) {
               this.set("bar", value);
            } else {
                return this.get("bar");
            }
        }
    });

    kendo.bind(dom, viewModel);

    dom.val("foo");
    dom.trigger("change");

    equal(viewModel.bar, "foo");
});

test("changing the input value updates dependent observable from the parent object", 1, function() {
    var dom = $('<ul data-bind="source: items" data-template="ul-input-template">');

    var viewModel = kendo.observable({
        items: [
            { bar: "bar" }
        ],
        root: function(item, value) {
            if (value !== undefined) {
               item.set("bar", value);
            } else {
                return item.get("bar");
            }
        }
    });

    kendo.bind(dom, viewModel);

    dom.find("input").val("foo").trigger("change");

    equal(viewModel.items[0].bar, "foo");
});


test("changing the value of pre populated select updates the view model", function() {
    var dom = $('<select data-bind="value:foo"><option value="foo">foo</option><option value="bar">bar</option>');

    var viewModel = kendo.observable( { foo: "foo" });

    kendo.bind(dom, viewModel);

    dom.find("option:first")[0].selected = false;
    dom.find("option:last")[0].selected = true;
    dom.trigger("change");

    equal(viewModel.foo, "bar");
});

test("changing the value of pre populated multi select updates the view model", function() {
    var dom = $('<select data-bind="value:foo"><option value="foo">foo</option><option value="bar">bar</option>');

    var viewModel = kendo.observable( { foo: [] });

    kendo.bind(dom, viewModel);

    dom.find("option:last").attr("selected", "selected");
    dom.trigger("change");

    equal(viewModel.foo[0], "bar");
});

test("changing radiobutton value updates the view model", function() {
    var dom = $('<input type="radio" value="bar"  data-bind="checked:foo"/>');

    var viewModel = kendo.observable( { foo: "" });

    kendo.bind(dom, viewModel);

    dom.attr("checked", true);
    dom.trigger("change");

    equal(viewModel.foo, "bar");
});

test("changing checkbox value updates the view model", function() {
    var dom = $('<input type="checkbox" data-bind="checked:foo"/>');

    var viewModel = kendo.observable( { foo: false });

    kendo.bind(dom, viewModel);

    dom.prop("checked", true);
    dom.trigger("change");

    equal(viewModel.foo, true);
});

test("changing checkbox does not add the value updates the view model", function() {
    var dom = $('<input type="checkbox" value="true" data-bind="checked:foo"/>');

    var viewModel = kendo.observable( { foo: true });

    kendo.bind(dom, viewModel);

    dom.prop("checked", false);
    dom.trigger("change");

    equal(viewModel.foo, false);
});

test("changing checkbox value updates the view model with the checked state", function() {
    var dom = $('<input type="checkbox" value="foo" data-bind="checked:foo"/>');

    var viewModel = kendo.observable( { foo: false });

    kendo.bind(dom, viewModel);

    dom.prop("checked", true);
    dom.trigger("change");

    equal(viewModel.foo, true);
});

test("checking checkbox adds the value to the view model", function() {
    var dom = $('<input type="checkbox" value="bar" data-bind="checked:foo"/>');

    var viewModel = kendo.observable( { foo: [] });

    kendo.bind(dom, viewModel);

    dom.attr("checked", true);
    dom.trigger("change");

    equal(viewModel.foo[0], "bar");
});

test("unchecking checkbox removes the value from the view model", function() {
    var dom = $('<input type="checkbox" value="bar" data-bind="checked:foo"/>');

    var viewModel = kendo.observable( { foo: ["bar"] });

    kendo.bind(dom, viewModel);

    dom.attr("checked", false);
    dom.trigger("change");

    ok(!viewModel.foo.length);
});

test("value binding calls set once during select change", function() {
    var viewModel = kendo.observable( {
        foo: ["foo", "bar", "baz"],
        bar: "bar"
    });

    var calls = 0;

    var dom = $('<select data-bind="source:foo,value:bar"/>');

    kendo.bind(dom, viewModel);

    viewModel.set("bar", "foo");

    viewModel.set = function() {
        calls++;
        kendo.data.ObservableObject.fn.set.apply(this, arguments);
    };

    dom.find("select").val("bar");
    dom.trigger("change");

    equal(calls, 1);
});

test("select value which doesn't exist sets selectedIndex to -1", function() {
    var viewModel = kendo.observable( {
        foo: ["foo", "bar"],
        bar: "bar"
    });

    var calls = 0;

    var dom = $('<select data-bind="source:foo,value:bar"/>');

    kendo.bind(dom, viewModel);

    viewModel.set("bar", "baz");

    equal(dom[0].selectedIndex, -1);
});

test("tracking changes of observable items in array", function() {
    var viewModel = kendo.observable( {
        foo: [{ name: "foo" }]
    });

    var dom = $('<ul data-template="array-template" data-bind="source:foo"/>');

    kendo.bind(dom, viewModel);

    viewModel.foo[0].set("name", "bar");

    equal(dom.find("li").text(), "bar");
});

test("replacing the source array rebinds the element", function() {
    var viewModel = kendo.observable( {
        foo: [{ name: "foo" }]
    });

    var dom = $('<ul data-template="array-template" data-bind="source:foo"/>');

    kendo.bind(dom, viewModel);

    viewModel.set("foo", [{ name: "bar" }]);

    equal(dom.find("li").text(), "bar");
});

test("tracking changes of fields bound to style", function() {
    var viewModel = kendo.observable( {
        foo: "1px",
        bar: "10px"
    });

    var dom = $('<span data-bind="style: { left: foo, top: bar }"/>');

    kendo.bind(dom, viewModel);

    viewModel.set("foo", "2px");
    viewModel.set("bar", "20px");

    equal(dom.css("left"), "2px");
    equal(dom.css("top"), "20px")
});

test("tracking changes of complex fields", function() {
    var dom = $('<div data-bind="attr: { title:bar }, text:foo.bar"/>');

    var viewModel = kendo.observable({
        foo: {
            bar: "bar"
        },
        bar: "boo"
    });

    kendo.bind(dom, viewModel);

    viewModel.foo.set("bar", "baz");

    equal(dom.text(), "baz");
    //check that parent field is not changed
    equal(dom.attr("title"), "boo");
});

test("tracking changes in templates", function() {
    var dom = $('<div data-template="simple-field-template" data-bind="source: this" />');

    var viewModel = kendo.observable({ foo: "foo" });

    kendo.bind(dom, viewModel);

    viewModel.set("foo", "bar");

    equal($.trim(dom.text()), "bar");
});

test("change event is fired once", 1, function() {
    var dom = $('<div data-template="simple-field-template" data-bind="source: this" />');

    var viewModel = kendo.observable({ foo: "foo" });

    kendo.bind(dom, viewModel);

    viewModel.bind("change", function() {
        ok(true);
    });

    viewModel.set("foo", "bar");
});

test("dependencies are reavaluated", function() {
    var dom = $('<div data-template="if-else-template" data-bind="source: this" />');

    var viewModel = kendo.observable({ foo: "foo", bar: "bar" });

    kendo.bind(dom, viewModel);

    viewModel.set("foo", "baz");

    viewModel.set("bar", "boo");

    equal($.trim(dom.text()), "boo");
});

test("does not attach more than one change handler when monitoring for dependency changes", function() {
    var dom = $('<div data-template="counting-template" data-bind="source:this" />');

    var viewModel = kendo.observable({ foo: "foo" });

    kendo.bind(dom, viewModel);

    viewModel.set("foo", "baz");

    templateEvaluationCounter = 0;

    viewModel.set("foo", "boo");

    equal(templateEvaluationCounter, 1);
});

test("refreshing the source destroys the binder objects", 1, function() {
    var dom = $('<div data-template="custom-binder-template" data-bind="source:this" />');

    var viewModel = kendo.observable({ foo: "foo" });

    kendo.data.binders.custom = kendo.data.Binder.extend({
        refresh: function() {
        },
        destroy: function() {
            ok(true);
        }
    });

    kendo.bind(dom, viewModel);

    viewModel.set("foo", "baz");
});

test("removing an item from the source destroys the binder objects", 1, function() {
    var dom = $('<div data-template="custom-binder-template" data-bind="source:foo" />');

    var viewModel = kendo.observable({ foo: [ {} ] });

    kendo.data.binders.custom = kendo.data.Binder.extend({
        refresh: function() {
        },
        destroy: function() {
            ok(true);
        }
    });

    kendo.bind(dom, viewModel);

    viewModel.foo.splice(0, 1);
});

test("the click binding is destroyed", function() {
    var dom = $('<div data-bind="click: handler">');

    var viewModel = kendo.observable({
        handler: function() {}
    });

    kendo.bind(dom, viewModel);
    equal(viewModel._events.change.length, 1);
    kendo.bind(dom, viewModel);
    equal(viewModel._events.change.length, 1);
});

test("does not attach multiple event handlers to nested object", function() {
    var parent = kendo.observable({});
    var child = kendo.observable({});

    parent.set("child", child);
    parent.set("child", kendo.observable({}));
    parent.set("child", child);

    equal(child._events["change"].length, 1);
    equal(child._events["get"].length, 1);
});

test("does not attach multiple event handlers to nested array", function() {
    var parent = kendo.observable({});
    var child = new kendo.data.ObservableArray([]);

    parent.set("child", child);
    parent.set("child", kendo.observable({}));
    parent.set("child", child);

    equal(child._events["change"].length, 1);
});

test("tracking changes when direct access and set are used", function() {
    var dom = $('<div data-template="nested-field-template" data-bind="source:this"/>');

    var viewModel = kendo.observable({
        foo: {
            bar: "bar"
        }
    });

    kendo.bind(dom, viewModel);

    viewModel.foo.set("bar", "baz");

    equal($.trim(dom.text()), "baz");
});

test("tracking changes when single set is used", function() {
    var dom = $('<div data-template="nested-field-template" data-bind="source:this" />');

    var viewModel = kendo.observable({
        foo: {
            bar: "bar"
        }
    });

    kendo.bind(dom, viewModel);

    viewModel.set("foo.bar", "boo");

    equal($.trim(dom.text()), "boo");
});

test("tracking changes when direct access and set are used (multiple get template)", function() {
    var dom = $('<div data-template="nested-field-template-multiple-gets" data-bind="source:this" />');

    var viewModel = kendo.observable({
        foo: {
            bar: "bar"
        }
    });

    kendo.bind(dom, viewModel);

    viewModel.foo.set("bar", "baz");

    equal($.trim(dom.text()), "baz");
});

test("tracking changes when single set is used (multiple get template)", function() {
    var dom = $('<div data-bind="source:this" data-template="nested-field-template-multiple-gets" />');

    var viewModel = kendo.observable({
        foo: {
            bar: "bar"
        }
    });

    kendo.bind(dom, viewModel);

    viewModel.set("foo.bar", "boo");

    equal($.trim(dom.text()), "boo");
});

test("tracking changes in dependent fields", function() {
    var dom = $('<div data-bind="text:computed" />');

    var viewModel = kendo.observable({
        foo: "foo",
        bar: "bar",
        computed: function() {
            return this.get("foo") + this.get("bar");
        }
    });

    kendo.bind(dom, viewModel);

    viewModel.set("foo", "boo");

    equal($.trim(dom.text()), "boobar");
});

test("checked binding removing the item unchecks the checkbox", function() {
    var dom = $('<input type="checkbox" value="foo" data-bind="checked:selectedItems"/>');

    var viewModel = kendo.observable({
        selectedItems: ["foo"]
    });

    kendo.bind(dom, viewModel);

    viewModel.selectedItems.splice(0,1);

    ok(!dom.is(":checked"));
});

test("model is not updated after target is destoryed", function() {
    var dom = $('<input data-bind="value:foo" />');

    var viewModel = kendo.observable( { foo: "foo" });

    kendo.bind(dom, viewModel);

    kendo.unbind(dom);

    dom.val("bar");
    dom.trigger("change");

    equal(viewModel.foo, "foo");
});

test("UI element is not updated after unbind", function() {
    var dom = $('<input data-bind="value:foo" />');

    var viewModel = kendo.observable( { foo: "foo" });

    kendo.bind(dom, viewModel);

    kendo.unbind(dom);

    viewModel.set("foo", "bar");

    equal(dom.val(), "foo");
});

test("changing a field does not triger changing of another field starting with the same name", function() {
    var viewModel = kendo.observable({
        foo1: [{ name: "foo" }, { name: "bar" }]
    });

    var calls = 0;

    kendo.data.binders.source = kendo.data.Binder.extend({
        refresh: function() {
            calls ++;
        }
    });

    var dom = $('<select data-value-field="name" data-bind="source: foo1"/>');

    kendo.bind(dom, viewModel);

    viewModel.trigger("change", { field: "foo" } );

    equal(calls, 1);
});

test("value binding sets a field which is initially undefined", function() {
    var viewModel = kendo.observable({ });

    var dom = $('<input data-bind="value: foo">');

    kendo.bind(dom, viewModel);

    dom.val("foo").trigger("change");
    equal(viewModel.foo, "foo");
});

test("tracks changes of template bound to parent field", function() {
    var dom = $('<ul data-bind="source: items" data-template="ul-template"></ul>');

    var viewModel = kendo.observable({
        root: "foo",
        items: [ {} ]
    });

    kendo.bind(dom, viewModel);
    viewModel.set("root", "bar");
    equal(dom.find("li").text(), viewModel.root);
});

test("parent properties are invoked with the current item", 2, function() {
    var dom = $('<ul data-bind="source: items" data-template="ul-template-alias"></ul>');

    var viewModel = kendo.observable({
        root: function(item) {
        },
        rootAlias: function(item) {
            equal(item, viewModel.items[0]);
            return this.get("root");
        },
        items: [ {} ]
    });

    kendo.bind(dom, viewModel);
    viewModel.set("root", "bar");
});

test("tracks changes of parent field bound to dependent parent field", function() {
    var dom = $('<ul data-bind="source: items" data-template="ul-template-alias"></ul>');

    var viewModel = kendo.observable({
        root: "foo",
        rootAlias: function() {
            return this.get("root");
        },
        items: [ {} ]
    });

    kendo.bind(dom, viewModel);

    viewModel.set("root", "bar");

    equal(dom.find("li").text(), "bar");
});

test("tracks changes of parent field bound to dependent parent field", function() {
    var dom = $('<ul data-bind="source: items" data-template="ul-template-alias"></ul>');

    var viewModel = kendo.observable({
        root: "foo",
        rootAlias: function(item) {
            return item.get("foo");
        },
        items: [ {foo: "foo" } ]
    });

    kendo.bind(dom, viewModel);

    viewModel.items[0].set("foo", "bar");

    equal(dom.find("li").text(), "bar");
});

test("tracks changes of element bound to parent field within a child template", function() {
    var dom = $('<div><span data-bind="text:root"/><ul data-bind="source: items" data-template="ul-input-template"></ul></div>');

    var viewModel = kendo.observable({
        root: "foo",
        items: [ { bar: "baz" } ]
    });

    kendo.bind(dom, viewModel);

    dom.find("input").val("moo").change();

    equal(dom.find("span").text(), "moo");
});

test("tracks changes of element bound to parent nested field within a child template", function() {
    var dom = $('<div><span data-bind="text:root.child"/><ul data-bind="source: items" data-template="ul-input-child-template"></ul></div>');

    var viewModel = kendo.observable({
        root: { child: "foo" },
        items: [ { bar: "baz" } ]
    });

    kendo.bind(dom, viewModel);

    dom.find("input").val("moo").change();

    equal(dom.find("span").text(), "moo");
});


test("event handlers are detached when the binding is changed", function() {
    var observable = kendo.observable({
        handler: {
        }
    });

    stub(observable.handler, "method");

    var dom = $('<span data-bind="click: handler.method"></span>');

    kendo.bind(dom, observable);

    var handler = observable.handler;

    var other = kendo.observable({
        method: function() { }
    });

    observable.set("handler", other);

    dom.trigger("click");

    equal(handler.calls("method"), 0);
});

test("tracking changes of bindings containing function calls", function() {
    var observable = kendo.observable({
        foo: {
            bar: "foo"
        },
        baz: function() {
            return this.get("foo");
        }
    });

    var dom = $('<span data-bind="text: baz().bar">');

    kendo.bind(dom, observable);

    observable.set("baz().bar", "bar");

    equal(dom.text(), "bar");
});

var date = $('<input type="date">');

if (date[0].type == "date") {
    test("changing the value of input type date updates the view model with a valid JavaScript Date", function() {
        var observable = kendo.observable({
            date: new Date("2013/5/4")
        });

        var dom = $('<input type="date" data-bind="value: date">');

        kendo.bind(dom, observable);

        dom.val("2013-06-05").trigger("change");

        equal(observable.date.getMonth(), 5);
        equal(observable.date.getDate(), 5);
    });
}

var datetime = $('<input type="datetime-local">');

if (datetime[0].type == "datetime-local") {
    test("changing the value of input type datetime-local updates the view model with a valid JavaScript Date", function() {
        var observable = kendo.observable({
            date: new Date("2013/5/4")
        });

        var dom = $('<input type="datetime-local" data-bind="value: date">');

        kendo.bind(dom, observable);

        dom.val("2013-06-05T23:13:40").trigger("change");

        equal(observable.date.getMonth(), 5);
        equal(observable.date.getDate(), 5);
        equal(observable.date.getHours(), 23);
        equal(observable.date.getMinutes(), 13);
        equal(observable.date.getSeconds(), 40);
    });

    test("changing the value of input type datetime-local updates the view model with a valid JavaScript Date - date time without seconds", function() {
        var observable = kendo.observable({
            date: new Date("2013/5/4")
        });

        var dom = $('<input type="datetime-local" data-bind="value: date">');

        kendo.bind(dom, observable);

        dom.val("2013-06-05T23:13").trigger("change");

        equal(observable.date.getMonth(), 5);
        equal(observable.date.getDate(), 5);
        equal(observable.date.getHours(), 23);
        equal(observable.date.getMinutes(), 13);
        equal(observable.date.getSeconds(), 00);
    });
}

var number = $('<input type="number">');

if (number[0].type == "number") {
    test("changing the value of input type number updates the view model with a valid Number", function() {
        var dom = $('<input type="number" data-bind="value: number">');

        var observable = kendo.observable({
            number: 0
        });

        kendo.bind(dom, observable);

        dom.val("3.14").trigger("change");

        strictEqual(observable.number, 3.14);
    });
}

}());
