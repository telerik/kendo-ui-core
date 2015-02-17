(function(){

var ParentWidget = kendo.ui.Widget.extend({
    options: {
        name: "ParentWidget"
    }
});


var TestWidget = kendo.ui.Widget.extend({
    init: function() {
        kendo.ui.Widget.fn.init.call(this, arguments);

    },
    setOptions: function() {
        ok(false, "Widget is initialized only once");
    },
    options: {
        name: "TestWidget"
    }
});

var dom;

module("mvvm binding", {
    setup: function() {
        kendo.ui.plugin(TestWidget);
        kendo.ui.plugin(ParentWidget);

        QUnit.fixture.append(
            '<script id="mobile-widget-template" type="text/x-kendo-template">' +
            '<span data-role="testwidget" />' +
            '</script>' +
            '<script id="select-template" type="text/x-kendo-template">' +
            '<option value="${id}">${name}</option>' +
            '</script>' +
            '<script id="event-template" type="text/x-kendo-template">' +
            '<li data-bind="click: clickHandler"></li>' +
            '</script>' +
            '<script id="nested-master-template" type="text/x-kendo-template">' +
            '<div data-template="nested-child-template" data-bind="source:items"/>' +
            '</script>' +
            '<script id="nested-child-template" type="text/x-kendo-template">' +
            '<div data-template="event-template" data-bind="source:this"/>' +
            '</script>' +
            '<script id="get-template" type="text/x-kendo-template">' +
            '#= get("foo") #' +
            '</script>' +
            '<script id="ol-template" type="text/x-kendo-template">' +
            '<li data-bind="text:name"></li>' +
            '</script>' +
            '<script id="ul-template" type="text/x-kendo-template">' +
            '<li data-bind="text:this"></li>' +
            '</script>' +
            '<script id="div-template" type="text/x-kendo-template">' +
            'Hello, ${foo}<span data-bind="text:foo"></span>' +
            '</script>' +
            '<script id="parent-field-template" type="text/x-kendo-template">' +
            '<li data-bind="text: foo"></li>' +
            '</script>' +
            '<script id="parent-nested-function-template" type="text/x-kendo-template">' +
            '<li data-bind="text: foo.foo"></li>' +
            '</script>' +
            '<script id="primitive-template" type="text/x-kendo-template">' +
            '<span>#= data #</span>' +
            '</script>'
        );
    },
    teardown: function() {
        kendo.destroy(dom);
    }
});

test("text binding", function() {
    dom = $('<span data-bind="text:foo"/>');

    kendo.bind(dom, { foo: "foo" });
    equal(dom.text(), "foo");
});

test("html binding", function() {
    dom = $('<span data-bind="html:foo"/>');

    kendo.bind(dom, { foo: "foo" });
    equal(dom.html(), "foo");
});

test("value binding", function() {
    dom = $('<input data-bind="value:foo"/>');

    kendo.bind(dom, { foo: "foo" });
    equal(dom.val(), "foo");
});

test("title binding", function() {
    dom = $('<span data-bind="attr: {title:foo}"/>');

    kendo.bind(dom, { foo: "foo" });
    equal(dom.attr("title"), "foo");
});

test("alt binding", function() {
    dom = $('<img data-bind="attr:{alt:foo}"/>');

    kendo.bind(dom, { foo: "foo" });
    equal(dom.attr("alt"), "foo");
});

test("src binding", function() {
    dom = $('<img data-bind="attr: { src:foo }"/>');

    kendo.bind(dom, { foo: "http://www.example.com" });
    equal(dom.attr("src"), "http://www.example.com");
});

test("href binding", function() {
    dom = $('<a data-bind="attr: { href:foo}"/>');

    kendo.bind(dom, { foo: "foo" });
    equal(dom.attr("href"), "foo");
});

test("data attribute binding", function() {
    dom = $('<a data-bind="attr: { data-foo:foo}"/>');

    kendo.bind(dom, { foo: "foo" });
    equal(dom.attr("data-foo"), "foo");
});

test("binding to array access expression", function() {
    dom = $('<span data-bind="text: [\'1\']"></span>');

    kendo.bind(dom, { "1": "foo" });

    equal(dom.text(), "foo");
});

test("binding immediate children", function() {
    dom = $('<span><img data-bind="attr: {alt:foo}"/></span>');

    kendo.bind(dom, { foo: "foo" });
    equal(dom.find("img").attr("alt"), "foo");
});

test("binding arbitrary children", function() {
    dom = $('<span><span><img data-bind=" attr : { alt : foo } "/></span></span>');

    kendo.bind(dom, { foo: "foo" });
    equal(dom.find("img").attr("alt"), "foo");
});

test("binding multiple attributes", function() {
    dom = $('<a data-bind="attr: { href:foo, title: foo }"/>');

    kendo.bind(dom, { foo: "foo" });
    equal(dom.attr("href"), "foo");
    equal(dom.attr("title"), "foo");
});

test("binding custom attributes", function() {
    dom = $('<a data-bind="attr: { custom: foo }"/>');

    kendo.bind(dom, { foo: "foo" });
    equal(dom.attr("custom"), "foo");
});

test("click binding", 1, function() {
    dom = $('<span data-bind="click:foo"/>');

    kendo.bind(dom, {
        foo: function() {
            ok(true, "click is raised");
        }
    });

    dom.trigger("click");
});

test("click event binding is detached", 1, function() {
    dom = $('<span data-bind="click:foo"/>');

    kendo.bind(dom, {
        foo: function() {
            ok(true, "click is raised");
        }
    });

    dom.trigger("click");

    kendo.unbind(dom);

    dom.trigger("click");
});

test("events binding is detached", 1, function() {
    dom = $('<span data-bind="events: { click:foo }"/>');

    kendo.bind(dom, {
        foo: function() {
            ok(true, "click is raised");
        }
    });

    dom.trigger("click");

    kendo.unbind(dom);

    dom.trigger("click");
});

test("change binding", 1, function() {
    dom = $('<input data-bind="events: { change:foo }"/>');

    kendo.bind(dom, {
        foo: function() {
            ok(true, "change is raised");
        }
    });

    dom.trigger("change");
});

test("the context of the event handler is the viewmodel",1, function() {
    dom = $('<span data-bind="click:foo"/>');
    var viewModel = kendo.observable( {
        foo: function() {
            strictEqual(this, viewModel);
        }
    });

    kendo.bind(dom, viewModel);

    dom.trigger("click");
});

test("the context of the nested function call is the nested observable object", 1, function() {
    expect(1);

    dom = $('<span data-bind="text:nested.foo"/>');
    var viewModel = kendo.observable( {
        nested: {
            foo: function() {
                strictEqual(this, viewModel.nested);
            }
        }
    });

    kendo.bind(dom, viewModel);
});

test("select binding", function() {
    dom = $('<select data-bind="source:foo"/>');

    kendo.bind(dom, {
        foo: [1, 2]
    });

    equal(dom.find("option").length, 2);
    equal(dom.find("option").first().text(), "1");
    equal(dom.find("option").last().text(), "2");
});

test("select binding with template", function() {
    dom = $('<select data-template="select-template" data-bind="source:foo"/>');

    kendo.bind(dom, {
        foo: [ {
            id: 1,
            name: "foo"
        }]
    });

    equal(dom.find("option").text(), "foo");
    equal(dom.find("option").val(), "1");
});

test("select binding to data source", function() {
    dom = $('<select data-template="select-template" data-bind="source:foo"/>');

    kendo.bind(dom, {
        foo: new kendo.data.DataSource( {
            data: [ {
                id: 1,
                name: "foo"
            }]
        } )
    });

    equal(dom.find("option").text(), "foo");
    equal(dom.find("option").val(), "1");
});

test("data source data isn't fetched if the auto-bind attribute is set to false", function() {
    dom = $('<select data-template="select-template" data-auto-bind="false" data-bind="source:foo"/>');

    kendo.bind(dom, {
        foo: new kendo.data.DataSource( {
            data: [ {
                id: 1,
                name: "foo"
            }]
        } )
    });

    equal(dom.find("option").length, 0);
});

test("pushing items to array creates new option elements without destroying the existing ones", function() {
    dom = $('<select data-bind="source:foo"/>');

    var viewModel = kendo.observable( {
        foo: [1, 2]
    });

    kendo.bind(dom, viewModel);

    var option = dom.find("option")[0];

    viewModel.foo.push(3, 4);

    equal(dom.find("option").length, viewModel.foo.length);
    equal(dom.find("option").eq(2).text(), "3");
    equal(dom.find("option").eq(3).text(), "4");
    equal(dom.find("option")[0], option);
});

test("adding items to the data source creates new option elements without destroying the existing ones", function() {
    dom = $('<select data-template="select-template" data-bind="source:foo"/>');

    var viewModel = kendo.observable( {
        foo: new kendo.data.DataSource( {
            data: [
                { id: 1, name: "foo" }
            ]
        } )
    });

    kendo.bind(dom, viewModel);

    var option = dom.find("option")[0];

    viewModel.foo.add({ id: 2, name: "bar" });

    equal(dom.find("option").length, viewModel.foo.data().length);
    equal(dom.find("option").eq(1).text(), "bar");
    equal(dom.find("option")[0], option);
});

test("value of private field is shown", function() {
    dom = $('<span data-bind="text:_foo"/>');

    var viewModel = kendo.observable( {
        _foo:"bar"
    });

    kendo.bind(dom, viewModel);

    equal(dom.text(), "bar");
});

test("pushing items to array initializes child bindings", function() {
    dom = $('<ul data-bind="source:foo" data-template="ul-template"/>');

    var viewModel = kendo.observable( {
        foo: [1, 2]
    });

    kendo.bind(dom, viewModel);

    viewModel.foo.push(3, 4);

    equal(dom.find("li:last").text(), "4");
});

test("splicing items from array removes option elements without destroying the existing ones", function() {
    dom = $('<select data-bind="source:foo"/>');

    var viewModel = kendo.observable( {
        foo: [1, 2, 3, 4]
    });

    kendo.bind(dom, viewModel);

    var firstOption = dom.find("option")[0];
    var lastOption = dom.find("option")[3];

    viewModel.foo.splice(1, 2);

    equal(dom.find("option").length, viewModel.foo.length);
    equal(dom.find("option")[0], firstOption);
    equal(dom.find("option")[1], lastOption);
});

test("removing items from data source removes option elements without destroing the existing ones", function() {
    dom = $('<select data-template="select-template" data-bind="source:foo"/>');

    var viewModel = kendo.observable( {
        foo: new kendo.data.DataSource( {
            data: [
                { id: 1, name: "1" },
                { id: 2, name: "2" },
                { id: 3, name: "3" },
                { id: 4, name: "4" }
            ]
        } )
    });

    kendo.bind(dom, viewModel);

    var firstOption = dom.find("option")[0];
    var lastOption = dom.find("option")[3];

    viewModel.foo.remove(viewModel.foo.at(1));

    equal(dom.find("option").length, viewModel.foo.data().length);
    equal(dom.find("option")[0], firstOption);
    equal(dom.find("option")[2], lastOption);
});

test("bind array to table appends table rows to the table body", function() {
    dom = $('<table data-bind="source:foo"><thead><tr><th></th></tr></thead></table>');

    var viewModel = kendo.observable( {
        foo: [1, 2]
    });

    kendo.bind(dom, viewModel);
    equal(dom.find("tbody > tr").length, viewModel.foo.length);
});

test("bind array to table keeps thead", function() {
    dom = $('<table data-bind="source:foo"><thead><tr><th></th></tr></thead></table>');

    var viewModel = kendo.observable( {
        foo: [1, 2]
    });

    kendo.bind(dom, viewModel);
    equal(dom.find("thead > tr").length, 1);
});

test("bind array to unordered list creates list item elements", function() {
    dom = $('<ul data-bind="source:foo"/>');

    var viewModel = kendo.observable( {
        foo: [1, 2]
    });

    kendo.bind(dom, viewModel);
    equal(dom.find("li").length, viewModel.foo.length);
});

test("bind array to ordered list creates list item elements", function() {
    dom = $('<ol data-bind="source:foo"/>');

    var viewModel = kendo.observable( {
        foo: [1, 2]
    });

    kendo.bind(dom, viewModel);
    equal(dom.find("li").length, viewModel.foo.length);
});

test("binding child elements of template to data item", function() {
    dom = $('<div><ol data-template="ol-template" data-bind="source:foo"/></div>');

    var viewModel = kendo.observable( {
        foo: [{ name: "foo"}]
    });

    kendo.bind(dom, viewModel);
    equal(dom.find("li").text(), viewModel.foo[0].name);
});

test("binding child elements of template to data item of primitive type", function() {
    dom = $('<ul data-template="ul-template" data-bind="source:foo"/>');

    var viewModel = kendo.observable( {
        foo: [1]
    });

    kendo.bind(dom, viewModel);
    equal(dom.find("li").text(), viewModel.foo[0]);
});

test("template binding without source", function() {
    dom = $('<div data-template="div-template" data-bind="source:this"/>');

    kendo.bind(dom, { foo: "foo" });

    equal($.trim(dom.text()), "Hello, foofoo");
});

test("template binding without source does not break observable hierarchy", 1, function() {
    dom = $('<div data-template="div-template" data-bind="source:this"/>');

    var model = kendo.observable({ foo: "foo" });
    kendo.bind(dom, model);

    equal(model.parent(), null);
});

test("binding to nested field", function() {
    dom = $('<div data-bind="text:foo.bar"/>');

    kendo.bind(dom, { foo: { bar: "baz" } });

    equal(dom.text(), "baz");
});

test("binding to array item", function() {
    dom = $('<div data-bind="text:foo[0]"/>');

    kendo.bind(dom, { foo: ["baz"] });

    equal(dom.text(), "baz");
});

test("binding the style attribute", function() {
    dom = $('<div data-bind="style: { display:foo, textDecoration: bar }" />');

    kendo.bind(dom, { foo: "none", bar: "underline" });

    equal(dom.css("display"), "none");
    equal(dom.css("text-decoration"), "underline");
});

test("binding select value to object", function() {
    dom = $('<select data-value-field="name" data-bind="source:items, value:selectedItem"/>');

    var viewModel = kendo.observable({
        items: [  { name: "foo" }, { name: "bar" } ],
        selectedItem: {}
    });

    viewModel.set("selectedItem", viewModel.items[1]);

    kendo.bind(dom, viewModel);
    ok(dom.find("option").last().is(":selected"));
});

test("order of source and value does not matter", function() {
    dom = $('<select data-value-field="name" data-bind="value:selectedItem, source:items"/>');

    var viewModel = kendo.observable({
        items: [  { name: "foo" }, { name: "bar" } ],
        selectedItem: {}
    });

    viewModel.set("selectedItem", viewModel.items[1]);

    kendo.bind(dom, viewModel);
    ok(dom.find("option").last().is(":selected"));
});

test("binding select to array of objects", function() {
    dom = $('<select data-value-field="name" data-bind="source:items, value:selectedItem"/>');

    var viewModel = kendo.observable({
        items: function() { return [  { name: "foo" }, { name: "bar" } ] },
        selectedItem: {}
    });

    viewModel.set("selectedItem", viewModel.items()[1]);

    kendo.bind(dom, viewModel);
    equal(dom.find("option").length, 2);
    equal(dom.find("option").first().text(), "foo");
    equal(dom.find("option").first().val(), "foo");
    equal(dom.find("option").last().text(), "bar");
    equal(dom.find("option").last().val(), "bar");

    ok(dom.find("option").last().is(":selected"));
});

test("binding select to array of strings", function() {
    dom = $('<select data-bind="source:items, value:selectedItem"/>');

    var viewModel = kendo.observable({
        items: function() { return [  "foo","bar" ] },
        selectedItem: {}
    });

    viewModel.set("selectedItem", viewModel.items()[1]);

    kendo.bind(dom, viewModel);
    equal(dom.find("option").length, 2);
    equal(dom.find("option").first().text(), "foo");
    equal(dom.find("option").first().val(), "foo");
    equal(dom.find("option").last().text(), "bar");
    equal(dom.find("option").last().val(), "bar");

    ok(dom.find("option").last().is(":selected"));
});

test("binding select value to object specifing only text-field", function() {
    dom = $('<select data-text-field="name" data-bind="source:items, value:selectedItem"/>');

    var viewModel = kendo.observable({
        items: [  { name: "foo" }, { name: "bar" } ],
        selectedItem: {}
    });

    viewModel.set("selectedItem", viewModel.items[1]);

    kendo.bind(dom, viewModel);
    ok(dom.find("option").last().is(":selected"));
});

test("binding select value to primitive value", function() {
    dom = $('<select data-bind="source:items, value:selectedItem"/>');

    var viewModel = kendo.observable({
        items: ["foo", "bar"],
        selectedItem: "bar"
    });

    kendo.bind(dom, viewModel);
    ok(dom.find("option").last().is(":selected"));
});

test("binding pre populated select value", function() {
    dom = $('<select data-bind="value:selectedItem"><option value="foo">foo</option><option value="bar">bar</option>');

    var viewModel = kendo.observable({
        items: ["foo", "bar"],
        selectedItem: "bar"
    });

    kendo.bind(dom, viewModel);
    ok(dom.find("option").last().is(":selected"));
});

test("binding multi select value to multiple objects", function() {
    dom = $('<select multiple="multiple" data-value-field="name" data-bind="source:items, value:selectedItem"/>');

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

test("binding multi select is update if value is removed", function() {
    dom = $('<select multiple="multiple" data-value-field="name" data-bind="source:items, value:selectedItem"/>');

    var viewModel = kendo.observable({
        items: [  { name: "foo" }, { name: "bar" }, { name: "baz" } ],
        selectedItem: []
    });

    viewModel.selectedItem.push(viewModel.items[1]);
    viewModel.selectedItem.push(viewModel.items[2]);

    kendo.bind(dom, viewModel);

    viewModel.selectedItem.pop();

    ok(dom.find("option").eq(1).is(":selected"));
    equal(dom.find("option:selected").length, 1);
});

test("checked binding binds radiobutton by value", function() {
    dom = $('<input type="radio" value="foo" data-bind="checked:selectedItem"/>');

    var viewModel = kendo.observable({
        selectedItem: ""
    });

    viewModel.set("selectedItem", "foo");

    kendo.bind(dom, viewModel);
    ok(dom.is(":checked"));
});

test("checked binding binds radiobutton to boolean value", function() {
    dom = $('<input type="radio" value="true" data-bind="checked:selectedItem"/>');

    var viewModel = kendo.observable({
        selectedItem: true
    });

    kendo.bind(dom, viewModel);
    ok(dom.is(":checked"));
});

test("checked binding binds radiobutton to number value", function() {
    dom = $('<input type="radio" value="1" data-bind="checked:selectedItem"/>');

    var viewModel = kendo.observable({
        selectedItem: 1
    });

    kendo.bind(dom, viewModel);
    ok(dom.is(":checked"));
});

test("checked binding binds checkbox to boolean", function() {
    dom = $('<input type="checkbox" data-bind="checked:selectedItem"/>');

    var viewModel = kendo.observable({
        selectedItem: false
    });

    viewModel.set("selectedItem", true);

    kendo.bind(dom, viewModel);
    ok(dom.is(":checked"));
});

test("checked binding binds checkbox by value to array", function() {
    dom = $('<input type="checkbox" value="foo" data-bind="checked:selectedItems"/>');

    var viewModel = kendo.observable({
        selectedItems: []
    });

    viewModel.selectedItems.push("foo");

    kendo.bind(dom, viewModel);
    ok(dom.is(":checked"));
});

test("checked binding binds checkbox by value to array", function() {
    dom = $('<input type="checkbox" data-bind="value:val, checked:selectedItems"/>');

    var viewModel = kendo.observable({
        val: "foo",
        selectedItems: ["foo"]
    });

    kendo.bind(dom, viewModel);
    ok(dom.is(":checked"));
});

test("checked binding checkbox is not checked if value does not exists", function() {
    dom = $('<input type="checkbox" value="foo" data-bind="checked:selectedItems"/>');

    var viewModel = kendo.observable({
        selectedItems: []
    });

    kendo.bind(dom, viewModel);
    ok(!dom.is(":checked"));
});

test("visible binding shows the element", function() {
    dom = $('<span data-bind="visible:show" style="display:none"/>');

    var viewModel = kendo.observable({
        show: true
    });

    kendo.bind(dom, viewModel);
    ok(dom.css("display") != "none", "Display is not 'none'");
});

test("visible binding hides the element", function() {
    dom = $('<span data-bind="visible:show"/>');

    var viewModel = kendo.observable({
        show: true
    });

    kendo.bind(dom, viewModel);

    viewModel.set("show", false);

    equal(dom.css("display"), "none");
});

test("invisible binding hides the element", function() {
    dom = $('<span data-bind="invisible:hide"/>');

    var viewModel = kendo.observable({
        hide: true
    });

    kendo.bind(dom, viewModel);
    equal(dom.css("display"), "none");
});

test("invisible binding shows the element", function() {
    dom = $('<span data-bind="invisible:hide" style="display:none" />');

    var viewModel = kendo.observable({
        hide: true
    });

    kendo.bind(dom, viewModel);

    viewModel.set("hide", false);

    ok(dom.css("display") != "none", "Display is not 'none'");
});

test("enable binding enables the element", function() {
    dom = $('<input data-bind="enabled:enable" disabled="disabled"/>');

    var viewModel = kendo.observable({
        enable: true
    });

    kendo.bind(dom, viewModel);
    ok(!dom.is(":disabled"));
});

test("enable binding disables the element if value is false", function() {
    dom = $('<input data-bind="enabled:enable"/>');

    var viewModel = kendo.observable({
        enable: false
    });

    kendo.bind(dom, viewModel);
    ok(dom.is(":disabled"));
});

test("enable binding disables the element if value is changed to false", function() {
    dom = $('<input data-bind="enabled:enable"/>');

    var viewModel = kendo.observable({
        enable: true
    });

    kendo.bind(dom, viewModel);
    viewModel.set("enable", false);
    ok(dom.is(":disabled"));
});

test("enable binding enables the select element", function() {
    dom = $('<select data-bind="enabled:enable" disabled="disabled"/>');

    var viewModel = kendo.observable({
        enable: true
    });

    kendo.bind(dom, viewModel);
    ok(!dom.is(":disabled"));
});

test("disable binding disables the element", function() {
    dom = $('<input data-bind="disabled:disabled"/>');

    var viewModel = kendo.observable({
        disabled: true
    });

    kendo.bind(dom, viewModel);
    ok(dom.is(":disabled"));
});

test("disable binding enables the element if value is false", function() {
    dom = $('<input data-bind="disabled:disabled" disabled="disabled"/>');

    var viewModel = kendo.observable({
        disabled: false
    });

    kendo.bind(dom, viewModel);
    ok(!dom.is(":disabled"));
});

test("disable binding disables the element if value is changed to true", function() {
    dom = $('<input data-bind="disabled:disabled"/>');

    var viewModel = kendo.observable({
        disabled: false
    });

    kendo.bind(dom, viewModel);
    viewModel.set("disabled", true);
    ok(dom.is(":disabled"));
});

test("disable binding disables the select element", function() {
    dom = $('<select data-bind="disabled:disabled"/>');

    var viewModel = kendo.observable({
        disabled: true
    });

    kendo.bind(dom, viewModel);
    ok(dom.is(":disabled"));
});


test("binding to getter", function() {
    dom = $('<div data-template="get-template" data-bind="source:this"/>');

    var viewModel = {
        foo: "foo"
    };

    kendo.bind(dom, viewModel);
    equal($.trim(dom.text()), "foo")
});

test("binding to function", function() {
    dom = $('<div data-bind="text:foo"/>');

    var viewModel = {
        bar: "bar",
        foo: function() {
            return this.get("bar");
        }
    };

    kendo.bind(dom, viewModel);
    equal($.trim(dom.text()), "bar")
});

test("binding target is assign to the element", function() {
    dom = $('<div data-bind="text:foo"/>');

    var viewModel = {
        bar: "bar"
    };

    kendo.bind(dom, viewModel);
    ok(dom[0].kendoBindingTarget);
});

test("binding target expando is removed after kendo.unbind", function() {
    dom = $('<div data-bind="text:foo"/>');

    var viewModel = {
        bar: "bar"
    };

    kendo.bind(dom, viewModel);
    kendo.unbind(dom);
    equal(dom[0].kendoBindingTarget, undefined);
});

test("binding are removed if element is rebind", 1, function() {
    dom = $('<div data-bind="text:foo"/>');

    var viewModel = kendo.observable({
        foo: "bar"
    });

    kendo.bind(dom, viewModel);

    var destroy = stub(dom[0].kendoBindingTarget, "destroy");

    kendo.bind(dom, viewModel);

    equal(destroy.calls("destroy"), 1);
});

test("error is thrown if binding is not find", function() {
    dom = $('<div data-bind="nonexisting:foo"/>');

    raises(function() { kendo.bind(dom, {}); }, "Error should be thrown");
});

test("widget initialization", function() {

    dom = $('<div data-role="testwidget"></div>');

    kendo.bind(dom);

    ok(dom.data("kendoTestWidget") instanceof TestWidget, "TestWidget is initialized");
});

test("child widget is initialized only once", 0, function() {

    dom = $('<div data-role="parentwidget"><div data-role="testwidget"></div></div>');

    kendo.bind(dom, {});
});

test("binding events in template to the root view model", function() {
    var viewModel = {
        items: [ {} ]
    };

    stub(viewModel, "clickHandler");

    dom = $('<ul data-bind="source: items" data-template="event-template" />');

    kendo.bind(dom, viewModel);

    dom.find("li").click();

    equal(viewModel.calls("clickHandler"), 1);
});

test("binding events in template to the child view model", function() {
    var viewModel = {
        foo: {
            items: [{}]
        }
    };

    stub(viewModel.foo, "clickHandler");

    dom = $('<ul data-bind="source: foo.items" data-template="event-template" />');

    kendo.bind(dom, viewModel);

    dom.find("li").click();

    equal(viewModel.foo.calls("clickHandler"), 1);
});

test("binding events in template to the grand child view model", function() {
    var viewModel = {
        foo: {
            bar: {
                items: [{}]
            }
        }
    };

    stub(viewModel.foo.bar, "clickHandler");

    dom = $('<ul data-bind="source: foo.bar.items" data-template="event-template" />');

    kendo.bind(dom, viewModel);

    dom.find("li").click();

    equal(viewModel.foo.bar.calls("clickHandler"), 1);
});

test("bound events in template receive the current item in the event argument", function() {
    var viewModel = kendo.observable({
        items: [
            { foo: "foo" }
        ]
    });

    stub(viewModel, "clickHandler");

    dom = $('<ul data-bind="source: items" data-template="event-template" />');

    kendo.bind(dom, viewModel);

    dom.find("li").click();

    equal(viewModel.args("clickHandler", 0)[0].data, viewModel.items[0]);
});

test("binding template to field of the parent object", function(){
    var viewModel = kendo.observable({
        foo: "foo",
        items: [{}]
    });

    dom = $('<ul data-bind="source: items" data-template="parent-field-template" />');

    kendo.bind(dom, viewModel);

    equal(dom.find("li").text(), viewModel.foo);
});

test("binding template to a primitive field", function() {
    var viewModel = {
        foo: {
            bar: "bar"
        }
    };

    dom = $('<div data-bind="source: foo.bar" data-template="primitive-template">');

    kendo.bind(dom, viewModel);

    equal($.trim(dom.text()), "bar");
});

/*

Unsuported!!!

test("binding template to field of the parent object when the source is array of primitive types", function(){
    var viewModel = kendo.observable({
        foo: "foo",
        items: [1]
    });

    dom = $('<ul data-bind="source: items" data-template="parent-field-template" />');

    kendo.bind(dom, viewModel);

    equal(dom.find("li").text(), viewModel.foo);
});
*/

test("binding template to function of the parent object", function(){
    var viewModel = kendo.observable({
        foo: function() {
            return "foo";
        },
        items: [{}]
    });

    dom = $('<ul data-bind="source: items" data-template="parent-field-template" />');

    kendo.bind(dom, viewModel);

    equal(dom.find("li").text(), viewModel.foo());
});

test("the function of the parent object receives the current item as an argument", 1, function(){
    var viewModel = kendo.observable({
        foo: function(item) {
            strictEqual(item, this.items[0]);
        },
        items: [{}]
    });

    dom = $('<ul data-bind="source: items" data-template="parent-field-template" />');

    kendo.bind(dom, viewModel);
});

test("the function of the parent object has the right context", 1, function(){
    var viewModel = kendo.observable({
        foo: function(item) {
            strictEqual(this, viewModel);
        },
        items: [{}]
    });

    dom = $('<ul data-bind="source: items" data-template="parent-field-template" />');

    kendo.bind(dom, viewModel);
});

test("binding template to a grand parent field", 1, function(){
    var viewModel = kendo.observable({
        foo: "foo",
        bar: {
            items: [{}]
        }
    });

    dom = $('<ul data-bind="source: bar.items" data-template="parent-field-template" />');

    kendo.bind(dom, viewModel);

    equal(dom.find("li").text(), viewModel.foo);
});

test("binding template to a grand parent function", function(){
    var viewModel = kendo.observable({
        foo: {
            foo: function() {
                return "foo";
            }
        },
        items: [{}]
    });

    dom = $('<ul data-bind="source: items" data-template="parent-nested-function-template" />');

    kendo.bind(dom, viewModel);

    equal(dom.find("li").text(), viewModel.foo.foo());
});

test("grand parent function has the right context", 1, function(){
    var viewModel = kendo.observable({
        foo: {
            foo: function() {
                strictEqual(this, viewModel.foo);
            }
        },
        items: [{}]
    });

    dom = $('<ul data-bind="source: items" data-template="parent-nested-function-template" />');

    kendo.bind(dom, viewModel);
});

test("binding dispose removes change handler when bound to observable object", function(){
    var initialBindingCount;
    var viewModel = kendo.observable({
        foo: "foo"
    });

    dom = $('<span data-bind="text:foo"/>');

    kendo.bind(dom, viewModel);

    initialBindingCount = viewModel._events.change.length;
    kendo.unbind(dom);
    equal(viewModel._events.change.length, initialBindingCount - 1);
});

test("binding dispose removes change handler when bound to field of the parent object", function(){
    var initialBindingCount;
    var viewModel = kendo.observable({
        foo: "foo",
        items: [{}]
    });

    dom = $('<ul data-bind="source: items" data-template="parent-field-template" />');

    kendo.bind(dom, viewModel);

    initialBindingCount = viewModel._events.change.length;
    kendo.unbind(dom);
    equal(viewModel._events.change.length, initialBindingCount - 2); // -2 = 1 for source binder, 1 for text binder
});

test("widget event binding", 1, function() {
    dom = $('<div data-role="testwidget" data-bind="events:{ foo: bar }"></div>');
    var viewModel = {
        bar: function() {
            ok(true, "Event handler is bound");
        }
    };

    kendo.bind(dom, viewModel);

    dom.data("kendoTestWidget").trigger("foo");
});

test("this is the view model during widget event binding", 1, function() {
    dom = $('<div data-role="testwidget" data-bind="events:{ foo: bar }"></div>');
    var viewModel = kendo.observable({
        bar: function() {
            strictEqual(this, viewModel);
        }
    });

    kendo.bind(dom, viewModel);

    dom.data("kendoTestWidget").trigger("foo");
});

test("the widget is the sender during widget event binding", 1, function() {
    dom = $('<div data-role="testwidget" data-bind="events:{ foo: bar }"></div>');
    var viewModel = kendo.observable({
        bar: function(e) {
            strictEqual(e.sender, dom.data("kendoTestWidget"));
        }
    });

    kendo.bind(dom, viewModel);

    dom.data("kendoTestWidget").trigger("foo");
});

test("the view model is passed as data when binding widget events", function() {
    dom = $('<div data-role="testwidget" data-bind="events:{ foo: bar }"></div>');
    var viewModel = kendo.observable({
        bar: function(e) {
            strictEqual(e.data, viewModel);
        }
    });

    kendo.bind(dom, viewModel);

    dom.data("kendoTestWidget").trigger("foo");
});

test("the view model is cleared after calling event handler", function() {
    dom = $('<div data-role="testwidget" data-bind="events:{ foo: bar }"></div>');
    var eventParams;
    var viewModel = kendo.observable({
        bar: function(e) {
            eventParams = e;
        }
    });

    kendo.bind(dom, viewModel);

    dom.data("kendoTestWidget").trigger("foo");
    equal(eventParams.data, undefined);
});

test("user data is not cleared after calling event handler", function() {
    dom = $('<div data-role="testwidget" data-bind="events:{ foo: bar }"></div>');
    var eventParams;
    var viewModel = kendo.observable({
        bar: function(e) {
            eventParams = e;
            e.data = { foo: "bar" };
        }
    });

    kendo.bind(dom, viewModel);

    dom.data("kendoTestWidget").trigger("foo");
    equal(eventParams.data.foo, "bar");
});

test("nested template without source with event binding",1, function() {
    dom = $('<div data-template="nested-master-template" data-bind="source:items"/>');

    kendo.bind(dom, {
        clickHandler: function() {
            ok(true);
        },
        items: [ { items: [{foo: 1}] } ] });

    dom.find("li").click();
});

test("text binding displays undefined fields as empty string", function() {
    dom = $('<span data-bind="text:foo"></span>');
    kendo.bind(dom, {});

    equal(dom.text(), "");
});

test("text binding displays null fields as empty string", function() {
    dom = $('<span data-bind="text:foo"></span>');
    kendo.bind(dom, { foo: null});

    equal(dom.text(), "");
});

test("value binding displays undefined fields as empty string", function() {
    dom = $('<input data-bind="value:foo"/>');
    kendo.bind(dom, {});

    equal(dom.val(), "");
});

test("value binding displays null fields as empty string", function() {
    dom = $('<input data-bind="value:foo"/>');
    kendo.bind(dom, { foo:null });

    equal(dom.val(), "");
});

test("visible binding to undefined hides the element", function() {
    dom = $('<span data-bind="visible:show"/>');
    kendo.bind(dom, {});

    equal(dom.css("display"), "none");
});

test("visible binding to null hides the element", function() {
    dom = $('<span data-bind="visible:show"/>');
    kendo.bind(dom, {show:null});

    equal(dom.css("display"), "none");
});

test("visible binding to zero hides the element", function() {
    dom = $('<span data-bind="visible:show"/>');
    kendo.bind(dom, {show:0});

    equal(dom.css("display"), "none");
});

test("visible binding to empty string hides the element", function() {
    dom = $('<span data-bind="visible:show"/>');
    kendo.bind(dom, {show:""});

    equal(dom.css("display"), "none");
});

test("invisible binding to undefined shows the element", function() {
    dom = $('<span data-bind="invisible:show" style="display:none"/>');
    kendo.bind(dom, {});

    ok(dom.css("display") != "none");
});

test("invisible binding to null shows the element", function() {
    dom = $('<span data-bind="invisible:show" style="display:none"/>');
    kendo.bind(dom, {show:null});

    ok(dom.css("display") != "none");
});

test("invisible binding to zero shows the element", function() {
    dom = $('<span data-bind="invisible:show" style="display:none"/>');
    kendo.bind(dom, {show:0});

    ok(dom.css("display") != "none");
});

test("invisible binding to empty string shows the element", function() {
    dom = $('<span data-bind="invisible:show" style="display:none"/>');
    kendo.bind(dom, {show:""});

    ok(dom.css("display") != "none");
});

test("readonly binding to true-ish value sets the readonly attribute", function() {
    dom = $('<input data-bind="readonly: readonly" />');
    kendo.bind(dom, {readonly: true});

    equal(dom.attr("readonly"), "readonly");
});

test("readonly binding to false-ish value removes the readonly attribute", function() {
    dom = $('<input readonly data-bind="readonly: readonly" />');
    kendo.bind(dom, {readonly: false});

    equal(dom[0].hasAttribute("readonly"), false);
});

test("mobile and desktop widgets are initialized in the correct priority", function() {
    var TestWidget = kendo.ui.Widget.extend({
        options: {
            name: "TestWidget"
        }
    });
    kendo.ui.plugin(TestWidget);

    var MobileTestWidget = kendo.mobile.ui.Widget.extend({
        options: {
            name: "TestWidget"
        }
    });
    kendo.mobile.ui.plugin(MobileTestWidget);

    dom = $("<div data-bind='source: foo' data-template='mobile-widget-template' />");
    kendo.bind(dom, kendo.observable({foo: ["bar"]}), kendo.mobile.ui, kendo.ui);
    ok(dom.find("span").data("kendoMobileTestWidget"));
});

test("bind to parent property with nested kendo.bind", function() {
    var viewModel = kendo.observable({
        foo: {
            bar: "baz"
        },
        items: [1,2,3,4]
    });

    dom = $("<div></div>");

    kendo.bind(dom, viewModel);

    dom.append($('<div class="nested"><select data-bind="source:items"></select></div>'));

    kendo.bind(dom.find("div.nested"), viewModel.foo);

    equal(dom.find("select")[0].options.length, 4);
});

test("binding ignores text nodes", 1, function() {
    dom = $('<span>Foo</span> <span>Bar</span>');

    kendo.bind(dom);
    ok(true);
});

test("source binding destroy unbinds other change handlers", 1, function() {
    dom = $('<select data-bind="source:foo"/>');

    var viewModel = kendo.observable( {
        foo: [1, 2]
    });

    kendo.bind(dom, viewModel);

    viewModel.get("foo").bind("change", function() {
        ok(true);
    });

    kendo.unbind(dom);

    viewModel.get("foo").push(3);
});

if (kendo.support.input.date) {
    test("input type date value binding", function() {
        dom = $('<input type="date" data-bind="value: date">');

        kendo.bind(dom, {
            date: new Date("2013/6/3")
        });

        equal(dom.val(), "2013-06-03");
    });
}

if (kendo.support.input.datetimelocal) {
    test("input type datetime value binding", function() {
        dom = $('<input type="datetime-local" data-bind="value: date">');

        kendo.bind(dom, {
            date: new Date("2013/6/3 20:30:52")
        });

        equal(dom.val(), "2013-06-03T20:30:52");
    });
}

if (kendo.support.input.number) {
    test("input type number value binding", function() {
        dom = $('<input type="number" data-bind="value: number">');

        kendo.bind(dom, {
            number: 3.14
        });

        equal(dom.val(), "3.14");
    });
}

}());
