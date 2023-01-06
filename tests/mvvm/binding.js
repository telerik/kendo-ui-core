(function() {

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
            assert.isOk(false, "Widget is initialized only once");
        },
        options: {
            name: "TestWidget"
        }
    });

    var dom;

    describe("mvvm binding", function() {
        beforeEach(function() {
            kendo.ui.plugin(TestWidget);
            kendo.ui.plugin(ParentWidget);
        });
        afterEach(function() {
            kendo.destroy(dom);
        });

        it("text binding", function() {
            dom = $('<span data-bind="text:text"/>');
            var vm = kendo.observable({
                text: "Comment\nwith\nbreakline <bold>TEST HTML</bold>"
            });
            kendo.bind(dom, vm);
            assert.equal(dom.text(), vm.get("text"));
        });

        it("html binding", function() {
            dom = $('<span data-bind="html:foo"/>');

            kendo.bind(dom, { foo: "foo" });
            assert.equal(dom.html(), "foo");
        });

        it("value binding", function() {
            dom = $('<input data-bind="value:foo"/>');

            kendo.bind(dom, { foo: "foo" });
            assert.equal(dom.val(), "foo");
        });

        it("title binding", function() {
            dom = $('<span data-bind="attr: {title:foo}"/>');

            kendo.bind(dom, { foo: "foo" });
            assert.equal(dom.attr("title"), "foo");
        });

        it("alt binding", function() {
            dom = $('<img data-bind="attr:{alt:foo}"/>');

            kendo.bind(dom, { foo: "foo" });
            assert.equal(dom.attr("alt"), "foo");
        });

        it("src binding", function() {
            dom = $('<img data-bind="attr: { src:foo }"/>');

            kendo.bind(dom, { foo: "http://www.example.com" });
            assert.equal(dom.attr("src"), "http://www.example.com");
        });

        it("href binding", function() {
            dom = $('<a data-bind="attr: { href:foo}"/>');

            kendo.bind(dom, { foo: "foo" });
            assert.equal(dom.attr("href"), "foo");
        });

        it("data attribute binding", function() {
            dom = $('<a data-bind="attr: { data-foo:foo}"/>');

            kendo.bind(dom, { foo: "foo" });
            assert.equal(dom.attr("data-foo"), "foo");
        });

        it("binding to array access expression", function() {
            dom = $('<span data-bind="text: [\'1\']"></span>');

            kendo.bind(dom, { "1": "foo" });

            assert.equal(dom.text(), "foo");
        });

        it("binding immediate children", function() {
            dom = $('<span><img data-bind="attr: {alt:foo}"/></span>');

            kendo.bind(dom, { foo: "foo" });
            assert.equal(dom.find("img").attr("alt"), "foo");
        });

        it("binding arbitrary children", function() {
            dom = $('<span><span><img data-bind=" attr : { alt : foo } "/></span></span>');

            kendo.bind(dom, { foo: "foo" });
            assert.equal(dom.find("img").attr("alt"), "foo");
        });

        it("binding multiple attributes", function() {
            dom = $('<a data-bind="attr: { href:foo, title: foo }"/>');

            kendo.bind(dom, { foo: "foo" });
            assert.equal(dom.attr("href"), "foo");
            assert.equal(dom.attr("title"), "foo");
        });

        it("binding custom attributes", function() {
            dom = $('<a data-bind="attr: { custom: foo }"/>');

            kendo.bind(dom, { foo: "foo" });
            assert.equal(dom.attr("custom"), "foo");
        });

        it("click binding", function() {
            dom = $('<span data-bind="click:foo"/>');

            kendo.bind(dom, {
                foo: function() {
                    assert.isOk(true, "click is raised");
                }
            });

            dom.trigger("click");
        });

        it("click event binding is detached", function() {
            dom = $('<span data-bind="click:foo"/>');

            kendo.bind(dom, {
                foo: function() {
                    assert.isOk(true, "click is raised");
                }
            });

            dom.trigger("click");

            kendo.unbind(dom);

            dom.trigger("click");
        });

        it("events binding is detached", function() {
            dom = $('<span data-bind="events: { click:foo }"/>');

            kendo.bind(dom, {
                foo: function() {
                    assert.isOk(true, "click is raised");
                }
            });

            dom.trigger("click");

            kendo.unbind(dom);

            dom.trigger("click");
        });

        it("change binding", function() {
            dom = $('<input data-bind="events: { change:foo }"/>');

            kendo.bind(dom, {
                foo: function() {
                    assert.isOk(true, "change is raised");
                }
            });

            dom.trigger("change");
        });

        it("the context of the event handler is the viewmodel", function() {
            dom = $('<span data-bind="click:foo"/>');
            var viewModel = kendo.observable({
                foo: function() {
                    assert.strictEqual(this, viewModel);
                }
            });

            kendo.bind(dom, viewModel);

            dom.trigger("click");
        });

        it("the context of the nested function call is the nested observable object", function() {
            expect(1);

            dom = $('<span data-bind="text:nested.foo"/>');
            var viewModel = kendo.observable({
                nested: {
                    foo: function() {
                        assert.strictEqual(this, viewModel.nested);
                    }
                }
            });

            kendo.bind(dom, viewModel);
        });

        it("select binding", function() {
            dom = $('<select data-bind="source:foo"/>');

            kendo.bind(dom, {
                foo: [1, 2]
            });

            assert.equal(dom.find("option").length, 2);
            assert.equal(dom.find("option").first().text(), "1");
            assert.equal(dom.find("option").last().text(), "2");
        });

        it("select source binding - no option should be selected if the model's field value is empty", function() {
            dom = $('<select data-bind="value:product.name, source:dataSource"/>');

            var vm = kendo.observable({
                product: { name: null },
                dataSource: []
            });
            kendo.bind(dom, vm);
            vm.set("dataSource", [1, 2, 3, 4]);
            assert.equal(dom.val(), vm.product.name);
        });

        it("source binding to undefined", function() {
            dom = $('<div data-bind="source:foo">');

            var vm = kendo.observable({});

            kendo.bind(dom, vm);

            assert.equal(dom.text(), "");

            vm.set("foo", "foo");

            assert.equal(dom.text(), "foo");
        });

        it("source binding to null", function() {
            dom = $('<div data-bind="source:foo">');

            var vm = kendo.observable({
                foo: null
            });

            kendo.bind(dom, vm);

            assert.equal(dom.text(), "");

            vm.set("foo", "foo");

            assert.equal(dom.text(), "foo");
        });

        it("source binding to deep nested undefined", function() {
            dom = $('<div data-bind="source:foo.bar">');

            var vm = kendo.observable({
            });

            kendo.bind(dom, vm);

            assert.equal(dom.text(), "");

            vm.set("foo", { bar: "foo" });

            assert.equal(dom.text(), "foo");
        });

        it("source binding to nested undefined", function() {
            dom = $('<div data-bind="source:foo.bar">');

            var vm = kendo.observable({
                foo: null
            });

            kendo.bind(dom, vm);

            assert.equal(dom.text(), "");

            vm.set("foo", { bar: "foo" });

            assert.equal(dom.text(), "foo");
        });

        it("select binding sets option when value is set before source", function() {
            dom = $('<select data-text-field="name" data-value-field="id" data-bind="source:source, value:value"/>');

            var data = [{
                id: 1,
                name: "foo"
            }];

            var model = kendo.observable({
                source: [],
                value: ""
            });

            kendo.bind(dom, model);

            model.set("value", 1);
            model.set("source", data);

            assert.equal(dom.val(), "1");
        });

        it("pushing items to array creates new option elements without destroying the existing ones", function() {
            dom = $('<select data-bind="source:foo"/>');

            var viewModel = kendo.observable({
                foo: [1, 2]
            });

            kendo.bind(dom, viewModel);

            var option = dom.find("option")[0];

            viewModel.foo.push(3, 4);

            assert.equal(dom.find("option").length, viewModel.foo.length);
            assert.equal(dom.find("option").eq(2).text(), "3");
            assert.equal(dom.find("option").eq(3).text(), "4");
            assert.equal(dom.find("option")[0], option);
        });
        it("changing items to the data source updated option elements without destroying the existing ones", function() {
            dom = $('<select data-text-field="name" data-value-field="id" data-bind="source:optionsArray"/>');

            var viewModel = kendo.observable({
                optionsArray: [
                    { id: 1, name: "option 1" },
                    { id: 2, name: "option 2" }
                ]
            });

            kendo.bind(dom, viewModel);

            var option = dom.find("option")[0];

            viewModel.optionsArray[0].set("name", "new value");

            assert.equal(dom.find("option").length, viewModel.optionsArray.length);
            assert.equal(dom.find("option:first").text(), "new value");
        });

        it("value of private field is shown", function() {
            dom = $('<span data-bind="text:_foo"/>');

            var viewModel = kendo.observable({
                _foo: "bar"
            });

            kendo.bind(dom, viewModel);

            assert.equal(dom.text(), "bar");
        });

        it("splicing items from array removes option elements without destroying the existing ones", function() {
            dom = $('<select data-bind="source:foo"/>');

            var viewModel = kendo.observable({
                foo: [1, 2, 3, 4]
            });

            kendo.bind(dom, viewModel);

            var firstOption = dom.find("option")[0];
            var lastOption = dom.find("option")[3];

            viewModel.foo.splice(1, 2);

            assert.equal(dom.find("option").length, viewModel.foo.length);
            assert.equal(dom.find("option")[0], firstOption);
            assert.equal(dom.find("option")[1], lastOption);
        });

        it("bind array to table appends table rows to the table body", function() {
            dom = $('<table data-bind="source:foo"><thead><tr><th></th></tr></thead></table>');

            var viewModel = kendo.observable({
                foo: [1, 2]
            });

            kendo.bind(dom, viewModel);
            assert.equal(dom.find("tbody > tr").length, viewModel.foo.length);
        });

        it("bind array to table keeps thead", function() {
            dom = $('<table data-bind="source:foo"><thead><tr><th></th></tr></thead></table>');

            var viewModel = kendo.observable({
                foo: [1, 2]
            });

            kendo.bind(dom, viewModel);
            assert.equal(dom.find("thead > tr").length, 1);
        });

        it("bind array to unordered list creates list item elements", function() {
            dom = $('<ul data-bind="source:foo"/>');

            var viewModel = kendo.observable({
                foo: [1, 2]
            });

            kendo.bind(dom, viewModel);
            assert.equal(dom.find("li").length, viewModel.foo.length);
        });

        it("bind array to ordered list creates list item elements", function() {
            dom = $('<ol data-bind="source:foo"/>');

            var viewModel = kendo.observable({
                foo: [1, 2]
            });

            kendo.bind(dom, viewModel);
            assert.equal(dom.find("li").length, viewModel.foo.length);
        });

        it("binding to nested field", function() {
            dom = $('<div data-bind="text:foo.bar"/>');

            kendo.bind(dom, { foo: { bar: "baz" } });

            assert.equal(dom.text(), "baz");
        });

        it("binding to array item", function() {
            dom = $('<div data-bind="text:foo[0]"/>');

            kendo.bind(dom, { foo: ["baz"] });

            assert.equal(dom.text(), "baz");
        });

        it("binding the style attribute", function() {
            dom = $('<div data-bind="style: { display:foo, textDecoration: bar }" />');

            kendo.bind(dom, { foo: "none", bar: "underline" });

            assert.equal(dom.css("display"), "none");
            assert.equal(dom.css("text-decoration"), "underline");
        });

        it("binding select value to object", function() {
            dom = $('<select data-value-field="name" data-bind="source:items, value:selectedItem"/>');

            var viewModel = kendo.observable({
                items: [{ name: "foo" }, { name: "bar" }],
                selectedItem: {}
            });

            viewModel.set("selectedItem", viewModel.items[1]);

            kendo.bind(dom, viewModel);
            assert.isOk(dom.find("option").last().is(":selected"));
        });

        it("order of source and value does not matter", function() {
            dom = $('<select data-value-field="name" data-bind="value:selectedItem, source:items"/>');

            var viewModel = kendo.observable({
                items: [{ name: "foo" }, { name: "bar" }],
                selectedItem: {}
            });

            viewModel.set("selectedItem", viewModel.items[1]);

            kendo.bind(dom, viewModel);
            assert.isOk(dom.find("option").last().is(":selected"));
        });

        it("binding select to array of objects", function() {
            dom = $('<select data-value-field="name" data-bind="source:items, value:selectedItem"/>');

            var viewModel = kendo.observable({
                items: function() { return [{ name: "foo" }, { name: "bar" }]; },
                selectedItem: {}
            });

            viewModel.set("selectedItem", viewModel.items()[1]);

            kendo.bind(dom, viewModel);
            assert.equal(dom.find("option").length, 2);
            assert.equal(dom.find("option").first().text(), "foo");
            assert.equal(dom.find("option").first().val(), "foo");
            assert.equal(dom.find("option").last().text(), "bar");
            assert.equal(dom.find("option").last().val(), "bar");

            assert.isOk(dom.find("option").last().is(":selected"));
        });

        it("binding select to array of strings", function() {
            dom = $('<select data-bind="source:items, value:selectedItem"/>');

            var viewModel = kendo.observable({
                items: function() { return ["foo", "bar"]; },
                selectedItem: {}
            });

            viewModel.set("selectedItem", viewModel.items()[1]);

            kendo.bind(dom, viewModel);
            assert.equal(dom.find("option").length, 2);
            assert.equal(dom.find("option").first().text(), "foo");
            assert.equal(dom.find("option").first().val(), "foo");
            assert.equal(dom.find("option").last().text(), "bar");
            assert.equal(dom.find("option").last().val(), "bar");

            assert.isOk(dom.find("option").last().is(":selected"));
        });

        it("binding select value to object specifing only text-field", function() {
            dom = $('<select data-text-field="name" data-bind="source:items, value:selectedItem"/>');

            var viewModel = kendo.observable({
                items: [{ name: "foo" }, { name: "bar" }],
                selectedItem: {}
            });

            viewModel.set("selectedItem", viewModel.items[1]);

            kendo.bind(dom, viewModel);
            assert.isOk(dom.find("option").last().is(":selected"));
        });

        it("binding select value to primitive value", function() {
            dom = $('<select data-bind="source:items, value:selectedItem"/>');

            var viewModel = kendo.observable({
                items: ["foo", "bar"],
                selectedItem: "bar"
            });

            kendo.bind(dom, viewModel);
            assert.isOk(dom.find("option").last().is(":selected"));
        });

        it("binding pre populated select value", function() {
            dom = $('<select data-bind="value:selectedItem"><option value="foo">foo</option><option value="bar">bar</option>');

            var viewModel = kendo.observable({
                items: ["foo", "bar"],
                selectedItem: "bar"
            });

            kendo.bind(dom, viewModel);
            assert.isOk(dom.find("option").last().is(":selected"));
        });

        it("binding multi select value to multiple objects", function() {
            dom = $('<select multiple="multiple" data-value-field="name" data-bind="source:items, value:selectedItem"/>');

            var viewModel = kendo.observable({
                items: [{ name: "foo" }, { name: "bar" }, { name: "baz" }],
                selectedItem: []
            });

            viewModel.selectedItem.push(viewModel.items[1]);
            viewModel.selectedItem.push(viewModel.items[2]);

            kendo.bind(dom, viewModel);
            assert.isOk(dom.find("option").eq(1).is(":selected"));
            assert.isOk(dom.find("option").eq(2).is(":selected"));
        });

        it("binding multiple select value to date array (with source binding)", function() {
            dom = $('<select multiple="multiple" data-value-field="text" data-type="date" data-bind="source:items, value:selectedItems"/>');

            var viewModel = kendo.observable({
                items: [{ text: "2015-01-01" }, { text: "2014-01-01" }, { text: "2014-12-31" }],
                selectedItems: []
            });

            kendo.bind(dom, viewModel);
            viewModel.set("selectedItems", [kendo.parseDate(viewModel.items[0].text, "yyyy-MM-dd"), kendo.parseDate(viewModel.items[2].text, "yyyy-MM-dd")]);

            assert.isOk(dom.find("option").eq(0).is(":selected"));
            assert.isOk(dom.find("option").eq(2).is(":selected"));
        });

        it("binding multiple select value to date array", function() {
            dom = $('<select multiple="multiple" data-type="date" data-bind="value:selectedItems"><option value="2015-01-01"></option><option value="2014-1-1"></option><option value="2014-12-31"></option></select>');

            var viewModel = kendo.observable({
                selectedItems: []
            });

            kendo.bind(dom, viewModel);
            viewModel.set("selectedItems", [kendo.parseDate("2015-01-01"), kendo.parseDate("2014-12-31")]);

            assert.isOk(dom.find("option").eq(0).is(":selected"));
            assert.isOk(dom.find("option").eq(2).is(":selected"));
        });

        it("binding multiple select value to number array (with source binding) ", function() {
            dom = $('<select multiple="multiple" data-value-field="text" data-type="number" data-bind="source:items, value:selectedItems"/>');

            var viewModel = kendo.observable({
                items: [{ text: "123" }, { text: "14.5" }, { text: "-3.14" }],
                selectedItems: []
            });

            kendo.bind(dom, viewModel);
            viewModel.set("selectedItems", [123, -3.14]);

            assert.isOk(dom.find("option").eq(0).is(":selected"));
            assert.isOk(dom.find("option").eq(2).is(":selected"));
        });

        it("binding multiple select value to number array", function() {
            dom = $('<select multiple="multiple" data-type="number" data-bind="value:selectedItems"><option value="123"></option><option value="14.5"></option><option value="-3.14"></option></select></select>');

            var viewModel = kendo.observable({
                selectedItems: []
            });

            kendo.bind(dom, viewModel);
            viewModel.set("selectedItems", [123, -3.14]);

            assert.isOk(dom.find("option").eq(0).is(":selected"));
            assert.isOk(dom.find("option").eq(2).is(":selected"));
        });

        it("binding multi select is update if value is removed", function() {
            dom = $('<select multiple="multiple" data-value-field="name" data-bind="source:items, value:selectedItem"/>');

            var viewModel = kendo.observable({
                items: [{ name: "foo" }, { name: "bar" }, { name: "baz" }],
                selectedItem: []
            });

            viewModel.selectedItem.push(viewModel.items[1]);
            viewModel.selectedItem.push(viewModel.items[2]);

            kendo.bind(dom, viewModel);

            viewModel.selectedItem.pop();

            assert.isOk(dom.find("option").eq(1).is(":selected"));
            assert.equal(dom.find("option:selected").length, 1);
        });

        it("checked binding binds radiobutton by value", function() {
            dom = $('<input type="radio" value="foo" data-bind="checked:selectedItem"/>');

            var viewModel = kendo.observable({
                selectedItem: ""
            });

            viewModel.set("selectedItem", "foo");

            kendo.bind(dom, viewModel);
            assert.isOk(dom.is(":checked"));
        });

        it("checked binding - clearing value clears selected radio button as well", function() {
            dom = $('<input type="radio" name="test" value="foo" data-bind="checked:selectedItem"/>');

            var viewModel = kendo.observable({
                selectedItem: "foo"
            });

            kendo.bind(dom, viewModel);
            viewModel.set("selectedItem", "");

            assert.equal(dom.prop("checked"), false);
        });

        it("checked binding binds radiobutton to boolean value", function() {
            dom = $('<input type="radio" value="true" data-bind="checked:selectedItem"/>');

            var viewModel = kendo.observable({
                selectedItem: true
            });

            kendo.bind(dom, viewModel);
            assert.isOk(dom.is(":checked"));
        });

        it("checked binding binds radiobutton to number value", function() {
            dom = $('<input type="radio" value="1" data-bind="checked:selectedItem"/>');

            var viewModel = kendo.observable({
                selectedItem: 1
            });

            kendo.bind(dom, viewModel);
            assert.isOk(dom.is(":checked"));
        });

        it("checked binding to null unchecks the radiobutton", function() {
            var dom = $('<input type="radio" value="foo" data-bind="checked:selectedItem"/>');

            var viewModel = kendo.observable({
                selectedItem: "foo"
            });

            kendo.bind(dom, viewModel);

            viewModel.set("selectedItem", null);

            assert.isOk(!dom.is(":checked"));
        });

        it("checked binding to undefined unchecks the radiobutton", function() {
            var dom = $('<input type="radio" value="foo" data-bind="checked:selectedItem"/>');

            var viewModel = kendo.observable({
                selectedItem: "foo"
            });

            kendo.bind(dom, viewModel);

            viewModel.set("selectedItem", undefined);

            assert.isOk(!dom.is(":checked"));
        });

        it("checked binding binds checkbox to boolean", function() {
            dom = $('<input type="checkbox" data-bind="checked:selectedItem"/>');

            var viewModel = kendo.observable({
                selectedItem: false
            });

            viewModel.set("selectedItem", true);

            kendo.bind(dom, viewModel);
            assert.isOk(dom.is(":checked"));
        });

        it("checked binding binds checkbox by value to array", function() {
            dom = $('<input type="checkbox" value="foo" data-bind="checked:selectedItems"/>');

            var viewModel = kendo.observable({
                selectedItems: []
            });

            viewModel.selectedItems.push("foo");

            kendo.bind(dom, viewModel);
            assert.isOk(dom.is(":checked"));
        });

        it("checked binding binds checkbox by value to array", function() {
            dom = $('<input type="checkbox" data-bind="value:val, checked:selectedItems"/>');

            var viewModel = kendo.observable({
                val: "foo",
                selectedItems: ["foo"]
            });

            kendo.bind(dom, viewModel);
            assert.isOk(dom.is(":checked"));
        });

        it("checked binding checkbox is not checked if value does not exists", function() {
            dom = $('<input type="checkbox" value="foo" data-bind="checked:selectedItems"/>');

            var viewModel = kendo.observable({
                selectedItems: []
            });

            kendo.bind(dom, viewModel);
            assert.isOk(!dom.is(":checked"));
        });

        it("checked binding binding to null unchecks the checkbox", function() {
            var dom = $('<input type="checkbox" value="foo" data-bind="checked:selectedItem"/>');

            var viewModel = kendo.observable({
                selectedItem: "foo"
            });

            kendo.bind(dom, viewModel);

            viewModel.set("selectedItem", null);

            assert.isOk(!dom.is(":checked"));
        });

        it("checked binding to undefined unchecks the checkbox", function() {
            var dom = $('<input type="checkbox" value="foo" data-bind="checked:selectedItem"/>');

            var viewModel = kendo.observable({
                selectedItem: "foo"
            });

            kendo.bind(dom, viewModel);

            viewModel.set("selectedItem", undefined);

            assert.isOk(!dom.is(":checked"));
        });

        it("visible binding shows the element", function() {
            dom = $('<span data-bind="visible:show" style="display:none"/>');

            var viewModel = kendo.observable({
                show: true
            });

            kendo.bind(dom, viewModel);
            assert.isOk(dom.css("display") != "none", "Display is not 'none'");
        });

        it("visible binding hides the element", function() {
            dom = $('<span data-bind="visible:show"/>');

            var viewModel = kendo.observable({
                show: true
            });

            kendo.bind(dom, viewModel);

            viewModel.set("show", false);

            assert.equal(dom.css("display"), "none");
        });

        it("invisible binding hides the element", function() {
            dom = $('<span data-bind="invisible:hide"/>');

            var viewModel = kendo.observable({
                hide: true
            });

            kendo.bind(dom, viewModel);
            assert.equal(dom.css("display"), "none");
        });

        it("invisible binding shows the element", function() {
            dom = $('<span data-bind="invisible:hide" style="display:none" />');

            var viewModel = kendo.observable({
                hide: true
            });

            kendo.bind(dom, viewModel);

            viewModel.set("hide", false);

            assert.isOk(dom.css("display") != "none", "Display is not 'none'");
        });

        it("enable binding enables the element", function() {
            dom = $('<input data-bind="enabled:enable" disabled="disabled"/>');

            var viewModel = kendo.observable({
                enable: true
            });

            kendo.bind(dom, viewModel);
            assert.isOk(!dom.is(":disabled"));
        });

        it("enable binding disables the element if value is false", function() {
            dom = $('<input data-bind="enabled:enable"/>');

            var viewModel = kendo.observable({
                enable: false
            });

            kendo.bind(dom, viewModel);
            assert.isOk(dom.is(":disabled"));
        });

        it("enable binding disables the element if value is changed to false", function() {
            dom = $('<input data-bind="enabled:enable"/>');

            var viewModel = kendo.observable({
                enable: true
            });

            kendo.bind(dom, viewModel);
            viewModel.set("enable", false);
            assert.isOk(dom.is(":disabled"));
        });

        it("enable binding enables the select element", function() {
            dom = $('<select data-bind="enabled:enable" disabled="disabled"/>');

            var viewModel = kendo.observable({
                enable: true
            });

            kendo.bind(dom, viewModel);
            assert.isOk(!dom.is(":disabled"));
        });

        it("disable binding disables the element", function() {
            dom = $('<input data-bind="disabled:disabled"/>');

            var viewModel = kendo.observable({
                disabled: true
            });

            kendo.bind(dom, viewModel);
            assert.isOk(dom.is(":disabled"));
        });

        it("disable binding enables the element if value is false", function() {
            dom = $('<input data-bind="disabled:disabled" disabled="disabled"/>');

            var viewModel = kendo.observable({
                disabled: false
            });

            kendo.bind(dom, viewModel);
            assert.isOk(!dom.is(":disabled"));
        });

        it("disable binding disables the element if value is changed to true", function() {
            dom = $('<input data-bind="disabled:disabled"/>');

            var viewModel = kendo.observable({
                disabled: false
            });

            kendo.bind(dom, viewModel);
            viewModel.set("disabled", true);
            assert.isOk(dom.is(":disabled"));
        });

        it("disable binding disables the select element", function() {
            dom = $('<select data-bind="disabled:disabled"/>');

            var viewModel = kendo.observable({
                disabled: true
            });

            kendo.bind(dom, viewModel);
            assert.isOk(dom.is(":disabled"));
        });

        it("binding to function", function() {
            dom = $('<div data-bind="text:foo"/>');

            var viewModel = {
                bar: "bar",
                foo: function() {
                    return this.get("bar");
                }
            };

            kendo.bind(dom, viewModel);
            assert.equal(dom.text().trim(), "bar");
        });

        it("binding target is assign to the element", function() {
            dom = $('<div data-bind="text:foo"/>');

            var viewModel = {
                bar: "bar"
            };

            kendo.bind(dom, viewModel);
            assert.isOk(dom[0].kendoBindingTarget);
        });

        it("binding text to badge works correctly", function() {
            dom = $('<span data-role="badge" data-bind="text:foo"></span>');

            var viewModel = {
                foo: "foo"
            };

            kendo.bind(dom, viewModel);
            assert.equal(dom.text().trim(), "foo");
        });

        it("binding target expando is removed after kendo.unbind", function() {
            dom = $('<div data-bind="text:foo"/>');

            var viewModel = {
                bar: "bar"
            };

            kendo.bind(dom, viewModel);
            kendo.unbind(dom);
            assert.equal(dom[0].kendoBindingTarget, undefined);
        });

        it("binding are removed if element is rebind", function() {
            dom = $('<div data-bind="text:foo"/>');

            var viewModel = kendo.observable({
                foo: "bar"
            });

            kendo.bind(dom, viewModel);

            var destroy = stub(dom[0].kendoBindingTarget, "destroy");

            kendo.bind(dom, viewModel);

            assert.equal(destroy.calls("destroy"), 1);
        });

        it("error is thrown if binding is not find", function() {
            dom = $('<div data-bind="nonexisting:foo"/>');

            assert.throws(function() { kendo.bind(dom, {}); }, "The nonexisting binding is not supported by the div element");
        });

        it("widget initialization", function() {

            dom = $('<div data-role="testwidget"></div>');

            kendo.bind(dom);

            assert.isOk(dom.data("kendoTestWidget") instanceof TestWidget, "TestWidget is initialized");
        });

        it("child widget is initialized only once", function() {

            dom = $('<div data-role="parentwidget"><div data-role="testwidget"></div></div>');

            kendo.bind(dom, {});
        });

        /*

        Unsuported!!!

        it("binding template to field of the parent object when the source is array of primitive types", function(){
            var viewModel = kendo.observable({
                foo: "foo",
                items: [1]
            });

            dom = $('<ul data-bind="source: items" data-template="parent-field-template" />');

            kendo.bind(dom, viewModel);

            assert.equal(dom.find("li").text(), viewModel.foo);
        });
        */

        it("binding dispose removes change handler when bound to observable object", function() {
            var initialBindingCount;
            var viewModel = kendo.observable({
                foo: "foo"
            });

            dom = $('<span data-bind="text:foo"/>');

            kendo.bind(dom, viewModel);

            initialBindingCount = viewModel._events.change.length;
            kendo.unbind(dom);
            assert.equal(viewModel._events.change.length, initialBindingCount - 1);
        });

        it("widget event binding", function() {
            dom = $('<div data-role="testwidget" data-bind="events:{ foo: bar }"></div>');
            var viewModel = {
                bar: function() {
                    assert.isOk(true, "Event handler is bound");
                }
            };

            kendo.bind(dom, viewModel);

            dom.data("kendoTestWidget").trigger("foo");
        });

        it("this is the view model during widget event binding", function() {
            dom = $('<div data-role="testwidget" data-bind="events:{ foo: bar }"></div>');
            var viewModel = kendo.observable({
                bar: function() {
                    assert.strictEqual(this, viewModel);
                }
            });

            kendo.bind(dom, viewModel);

            dom.data("kendoTestWidget").trigger("foo");
        });

        it("the widget is the sender during widget event binding", function() {
            dom = $('<div data-role="testwidget" data-bind="events:{ foo: bar }"></div>');
            var viewModel = kendo.observable({
                bar: function(e) {
                    assert.strictEqual(e.sender, dom.data("kendoTestWidget"));
                }
            });

            kendo.bind(dom, viewModel);

            dom.data("kendoTestWidget").trigger("foo");
        });

        it("the view model is passed as data when binding widget events", function() {
            dom = $('<div data-role="testwidget" data-bind="events:{ foo: bar }"></div>');
            var viewModel = kendo.observable({
                bar: function(e) {
                    assert.strictEqual(e.data, viewModel);
                }
            });

            kendo.bind(dom, viewModel);

            dom.data("kendoTestWidget").trigger("foo");
        });

        it("the view model is cleared after calling event handler", function() {
            dom = $('<div data-role="testwidget" data-bind="events:{ foo: bar }"></div>');
            var eventParams;
            var viewModel = kendo.observable({
                bar: function(e) {
                    eventParams = e;
                }
            });

            kendo.bind(dom, viewModel);

            dom.data("kendoTestWidget").trigger("foo");
            assert.equal(eventParams.data, undefined);
        });

        it("user data is not cleared after calling event handler", function() {
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
            assert.equal(eventParams.data.foo, "bar");
        });

        it("text binding displays undefined fields as empty string", function() {
            dom = $('<span data-bind="text:foo"></span>');
            kendo.bind(dom, {});

            assert.equal(dom.text(), "");
        });

        it("text binding displays null fields as empty string", function() {
            dom = $('<span data-bind="text:foo"></span>');
            kendo.bind(dom, { foo: null });

            assert.equal(dom.text(), "");
        });

        it("value binding displays undefined fields as empty string", function() {
            dom = $('<input data-bind="value:foo"/>');
            kendo.bind(dom, {});

            assert.equal(dom.val(), "");
        });

        it("value binding displays null fields as empty string", function() {
            dom = $('<input data-bind="value:foo"/>');
            kendo.bind(dom, { foo: null });

            assert.equal(dom.val(), "");
        });

        it("visible binding to undefined hides the element", function() {
            dom = $('<span data-bind="visible:show"/>');
            kendo.bind(dom, {});

            assert.equal(dom.css("display"), "none");
        });

        it("visible binding to null hides the element", function() {
            dom = $('<span data-bind="visible:show"/>');
            kendo.bind(dom, { show: null });

            assert.equal(dom.css("display"), "none");
        });

        it("visible binding to zero hides the element", function() {
            dom = $('<span data-bind="visible:show"/>');
            kendo.bind(dom, { show: 0 });

            assert.equal(dom.css("display"), "none");
        });

        it("visible binding to empty string hides the element", function() {
            dom = $('<span data-bind="visible:show"/>');
            kendo.bind(dom, { show: "" });

            assert.equal(dom.css("display"), "none");
        });

        it("invisible binding to undefined shows the element", function() {
            dom = $('<span data-bind="invisible:show" style="display:none"/>');
            kendo.bind(dom, {});

            assert.isOk(dom.css("display") != "none");
        });

        it("invisible binding to null shows the element", function() {
            dom = $('<span data-bind="invisible:show" style="display:none"/>');
            kendo.bind(dom, { show: null });

            assert.isOk(dom.css("display") != "none");
        });

        it("invisible binding to zero shows the element", function() {
            dom = $('<span data-bind="invisible:show" style="display:none"/>');
            kendo.bind(dom, { show: 0 });

            assert.isOk(dom.css("display") != "none");
        });

        it("invisible binding to empty string shows the element", function() {
            dom = $('<span data-bind="invisible:show" style="display:none"/>');
            kendo.bind(dom, { show: "" });

            assert.isOk(dom.css("display") != "none");
        });

        it("readonly binding to true-ish value sets the readonly attribute", function() {
            dom = $('<input data-bind="readonly: readonly" />');
            kendo.bind(dom, { readonly: true });

            assert.equal(dom.attr("readonly"), "readonly");
        });

        it("readonly binding to false-ish value removes the readonly attribute", function() {
            dom = $('<input readonly data-bind="readonly: readonly" />');
            kendo.bind(dom, { readonly: false });

            assert.equal(dom[0].hasAttribute("readonly"), false);
        });

        it("bind to parent property with nested kendo.bind", function() {
            var viewModel = kendo.observable({
                foo: {
                    bar: "baz"
                },
                items: [1, 2, 3, 4]
            });

            dom = $("<div></div>");

            kendo.bind(dom, viewModel);

            dom.append($('<div class="nested"><select data-bind="source:items"></select></div>'));

            kendo.bind(dom.find("div.nested"), viewModel.foo);

            assert.equal(dom.find("select")[0].options.length, 4);
        });

        it("binding ignores text nodes", function() {
            dom = $('<span>Foo</span> <span>Bar</span>');

            kendo.bind(dom);
            assert.isOk(true);
        });

        it("source binding destroy unbinds other change handlers", function() {
            dom = $('<select data-bind="source:foo"/>');

            var viewModel = kendo.observable({
                foo: [1, 2]
            });

            kendo.bind(dom, viewModel);

            viewModel.get("foo").bind("change", function() {
                assert.isOk(true);
            });

            kendo.unbind(dom);

            viewModel.get("foo").push(3);
        });


        it("checked binding removing the item unchecks the checkbox", function() {
            var dom = $('<input type="checkbox" value="foo" data-bind="checked:selectedItems"/>');

            var viewModel = kendo.observable({
                selectedItems: ["foo"]
            });

            kendo.bind(dom, viewModel);

            viewModel.selectedItems.splice(0, 1);

            assert.isOk(!dom.is(":checked"));
        });

        it("checked binding adding a date item should check the checkbox", function() {
            var dom = $('<input type="checkbox" value="2015-1-1" data-type="date" data-bind="checked:selectedItems"/>');

            var viewModel = kendo.observable({
                selectedItems: [kendo.parseDate(dom.val(), "yyyy-MM-dd")]
            });

            kendo.bind(dom, viewModel);

            assert.isOk(dom.is(":checked"));
        });

        it("checked binding adding a date item should check the radiobutton", function() {
            var dom = $('<input type="radio" value="2015-01-15" data-type="date" data-bind="checked:selectedItems"/>');

            var viewModel = kendo.observable({
                selectedItems: kendo.parseDate(dom.val(), "yyyy-MM-dd")
            });

            kendo.bind(dom, viewModel);

            assert.isOk(dom.is(":checked"));
        });

        it("checked binding removing a date item should uncheck the checkbox", function() {
            var dom = $('<input type="checkbox" value="2015-1-1" data-type="date" data-bind="checked:selectedItems"/>');

            var viewModel = kendo.observable({
                selectedItems: [kendo.parseDate(dom.val(), "yyyy-MM-dd")]
            });

            kendo.bind(dom, viewModel);

            viewModel.selectedItems.splice(0, 1);

            assert.isOk(!dom.is(":checked"));
        });

        it("checked binding removing a date item should uncheck the radiobutton", function() {
            var dom = $('<input type="radio" value="2015-1-1" data-type="date" data-bind="checked:selectedItems"/>');

            var viewModel = kendo.observable({
                selectedItems: [kendo.parseDate(dom.val(), "yyyy-MM-dd")]
            });

            kendo.bind(dom, viewModel);

            viewModel.selectedItems.splice(0, 1);

            assert.isOk(!dom.is(":checked"));
        });

        it("checked binding adding a boolean item should check the checkbox", function() {
            var dom = $('<input type="checkbox" value="false" data-type="boolean" data-bind="checked:selectedItems"/>');

            var viewModel = kendo.observable({
                selectedItems: [false]
            });

            kendo.bind(dom, viewModel);

            assert.isOk(dom.is(":checked"));
        });

        it("checked binding adding a boolean item should check the radiobutton", function() {
            var dom = $('<input type="radio" value="true" data-type="boolean" data-bind="checked:selectedItems"/>');

            var viewModel = kendo.observable({
                selectedItems: true
            });

            kendo.bind(dom, viewModel);

            assert.isOk(dom.is(":checked"));
        });

        it("checked binding removing a boolean item should uncheck the checkbox", function() {
            var dom = $('<input type="checkbox" value="true" data-type="boolean" data-bind="checked:selectedItems"/>');

            var viewModel = kendo.observable({
                selectedItems: [true]
            });

            kendo.bind(dom, viewModel);

            viewModel.selectedItems.splice(0, 1);

            assert.isOk(!dom.is(":checked"));
        });

        it("checked binding removing a boolean item should uncheck the radiobutton", function() {
            var dom = $('<input type="radio" value="true" data-type="boolean" data-bind="checked:selectedItems"/>');

            var viewModel = kendo.observable({
                selectedItems: [false]
            });

            kendo.bind(dom, viewModel);

            viewModel.selectedItems.splice(0, 1);

            assert.isOk(!dom.is(":checked"));
        });

        it("checked binding adding a number item should check the checkbox", function() {
            var dom = $('<input type="checkbox" value="1.23" data-type="number" data-bind="checked:selectedItems"/>');

            var viewModel = kendo.observable({
                selectedItems: [kendo.parseFloat(dom.val())]
            });

            kendo.bind(dom, viewModel);

            assert.isOk(dom.is(":checked"));
        });

        it("checked binding adding a number item should check the radiobutton", function() {
            var dom = $('<input type="radio" value="1.23" data-type="number" data-bind="checked:selectedItems"/>');

            var viewModel = kendo.observable({
                selectedItems: kendo.parseFloat(dom.val())
            });

            kendo.bind(dom, viewModel);

            assert.isOk(dom.is(":checked"));
        });

        it("checked binding removing a number item should uncheck the checkbox", function() {
            var dom = $('<input type="checkbox" value="1.23" data-type="number" data-bind="checked:selectedItems"/>');

            var viewModel = kendo.observable({
                selectedItems: [kendo.parseFloat(dom.val())]
            });

            kendo.bind(dom, viewModel);

            viewModel.selectedItems.splice(0, 1);

            assert.isOk(!dom.is(":checked"));
        });

        it("checked binding removing a number item should uncheck the radiobutton", function() {
            var dom = $('<input type="radio" value="1.23" data-type="number" data-bind="checked:selectedItems"/>');

            var viewModel = kendo.observable({
                selectedItems: [kendo.parseFloat(dom.val())]
            });

            kendo.bind(dom, viewModel);

            viewModel.selectedItems.splice(0, 1);

            assert.isOk(!dom.is(":checked"));
        });

        if (kendo.support.input.date) {
            it("input type date value binding", function() {
                dom = $('<input type="date" data-bind="value: date">');

                kendo.bind(dom, {
                    date: new Date("2013/6/3")
                });

                assert.equal(dom.val(), "2013-06-03");
            });

            it("input type date value binding explicit 'date' data-type", function() {
                dom = $('<input type="date" data-type="date" data-bind="value: date">');

                kendo.bind(dom, {
                    date: new Date("2013/6/3")
                });

                assert.equal(dom.val(), "2013-06-03");
            });

            it("input type date value binding explicit 'text' data-type", function() {
                dom = $('<input type="date" data-type="text" data-bind="value: date">');

                kendo.bind(dom, {
                    date: kendo.toString(new Date("2013/6/3"), "yyyy-MM-dd")
                });

                assert.equal(dom.val(), "2013-06-03");
            });
        }

        if (kendo.support.input.datetimelocal) {
            it("input type datetime value binding", function() {
                dom = $('<input type="datetime-local" data-bind="value: date">');

                kendo.bind(dom, {
                    date: new Date("2013/6/3 20:30:52")
                });

                assert.equal(dom.val(), "2013-06-03T20:30:52");
            });

            it("checked binding adding a datetime-local item should check the checkbox", function() {
                var dom = $('<input type="checkbox" value="2013-06-05T23:13:40" data-type="datetime-local" data-bind="checked:selectedItems"/>');

                var viewModel = kendo.observable({
                    selectedItems: [kendo.parseDate(dom.val(), ["yyyy-MM-ddTHH:mm:ss", "yyyy-MM-ddTHH:mm"])]
                });

                kendo.bind(dom, viewModel);

                assert.isOk(dom.is(":checked"));
            });

            it("checked binding adding a datetime-local item should check the radiobutton", function() {
                var dom = $('<input type="radio" value="2013-06-05T23:13:40" data-type="datetime-local" data-bind="checked:selectedItems"/>');

                var viewModel = kendo.observable({
                    selectedItems: kendo.parseDate(dom.val(), ["yyyy-MM-ddTHH:mm:ss", "yyyy-MM-ddTHH:mm"])
                });

                kendo.bind(dom, viewModel);

                assert.isOk(dom.is(":checked"));
            });

            it("checked binding removing a datetime-local item should uncheck the checkbox", function() {
                var dom = $('<input type="checkbox" value="2013-06-05T23:13:40" data-type="datetime-local" data-bind="checked:selectedItems"/>');

                var viewModel = kendo.observable({
                    selectedItems: [kendo.parseDate(dom.val(), ["yyyy-MM-ddTHH:mm:ss", "yyyy-MM-ddTHH:mm"])]
                });

                kendo.bind(dom, viewModel);

                viewModel.selectedItems.splice(0, 1);

                assert.isOk(!dom.is(":checked"));
            });

            it("checked binding removing a datetime-local item should uncheck the radiobutton", function() {
                var dom = $('<input type="radio" value="2013-06-05T23:13:40" data-type="datetime-local" data-bind="checked:selectedItems"/>');

                var viewModel = kendo.observable({
                    selectedItems: [kendo.parseDate(dom.val(), ["yyyy-MM-ddTHH:mm:ss", "yyyy-MM-ddTHH:mm"])]
                });

                kendo.bind(dom, viewModel);

                viewModel.selectedItems.splice(0, 1);

                assert.isOk(!dom.is(":checked"));
            });
        }

        if (kendo.support.input.number) {
            it("input type number value binding", function() {
                dom = $('<input type="number" data-bind="value: number">');

                kendo.bind(dom, {
                    number: 3.14
                });

                assert.equal(dom.val(), "3.14");
            });

            it("input type number value binding explicit 'text' data-type", function() {
                dom = $('<input type="number" data-type="text" data-bind="value: number">');

                kendo.bind(dom, {
                    number: 3.14
                });

                assert.equal(dom.val(), "3.14");
            });
        }

    });
}());
