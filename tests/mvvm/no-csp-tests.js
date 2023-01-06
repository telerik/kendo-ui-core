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

    describe("mvvm binding - no CSP", function() {
        beforeEach(function() {
            kendo.ui.plugin(TestWidget);
            kendo.ui.plugin(ParentWidget);

            Mocha.fixture.append(
                '<script id="select-element-template" type="text/x-kendo-template">' +
                '<select data-value-field="Value" data-text-field="Text" data-bind="source: values, value: currentValue"></select>' +
                '</script>' +
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
        });
        afterEach(function() {
            kendo.destroy(dom);
        });

        it("select binding with template", function() {
            dom = $('<select data-template="select-template" data-bind="source:foo"/>');

            kendo.bind(dom, {
                foo: [{
                    id: 1,
                    name: "foo"
                }]
            });

            assert.equal(dom.find("option").text(), "foo");
            assert.equal(dom.find("option").val(), "1");
        });

        it("select binding to data source", function() {
            dom = $('<select data-template="select-template" data-bind="source:foo"/>');

            kendo.bind(dom, {
                foo: new kendo.data.DataSource({
                    data: [{
                        id: 1,
                        name: "foo"
                    }]
                })
            });

            assert.equal(dom.find("option").text(), "foo");
            assert.equal(dom.find("option").val(), "1");
        });

        it("adding items to the data source creates new option elements without destroying the existing ones", function() {
            dom = $('<select data-template="select-template" data-bind="source:foo"/>');

            var viewModel = kendo.observable({
                foo: new kendo.data.DataSource({
                    data: [
                        { id: 1, name: "foo" }
                    ]
                })
            });

            kendo.bind(dom, viewModel);

            var option = dom.find("option")[0];

            viewModel.foo.add({ id: 2, name: "bar" });

            assert.equal(dom.find("option").length, viewModel.foo.data().length);
            assert.equal(dom.find("option").eq(1).text(), "bar");
            assert.equal(dom.find("option")[0], option);
        });

        it("binding child elements of template to data item", function() {
            dom = $('<div><ol data-template="ol-template" data-bind="source:foo"></ol></div>');

            var viewModel = kendo.observable({
                foo: [{ name: "foo" }]
            });

            kendo.bind(dom, viewModel);
            assert.equal(dom.find("li").text(), viewModel.foo[0].name);
        });

        it("template binding without source", function() {
            dom = $('<div data-template="div-template" data-bind="source:this"/>');

            kendo.bind(dom, { foo: "foo" });

            assert.equal(dom.text().trim(), "Hello, foofoo");
        });

        it("binding to getter", function() {
            dom = $('<div data-template="get-template" data-bind="source:this"/>');

            var viewModel = {
                foo: "foo"
            };

            kendo.bind(dom, viewModel);
            assert.equal(dom.text().trim(), "foo");
        });

        it("binding events in template to the root view model", function() {
            var viewModel = {
                items: [{}]
            };

            stub(viewModel, "clickHandler");

            dom = $('<ul data-bind="source: items" data-template="event-template" />');

            kendo.bind(dom, viewModel);

            dom.find("li").click();

            assert.equal(viewModel.calls("clickHandler"), 1);
        });

        it("binding events in template to the child view model", function() {
            var viewModel = {
                foo: {
                    items: [{}]
                }
            };

            stub(viewModel.foo, "clickHandler");

            dom = $('<ul data-bind="source: foo.items" data-template="event-template" />');

            kendo.bind(dom, viewModel);

            dom.find("li").click();

            assert.equal(viewModel.foo.calls("clickHandler"), 1);
        });

        it("binding events in template to the grand child view model", function() {
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

            assert.equal(viewModel.foo.bar.calls("clickHandler"), 1);
        });

        it("bound events in template receive the current item in the event argument", function() {
            var viewModel = kendo.observable({
                items: [
                    { foo: "foo" }
                ]
            });

            stub(viewModel, "clickHandler");

            dom = $('<ul data-bind="source: items" data-template="event-template" />');

            kendo.bind(dom, viewModel);

            dom.find("li").click();

            assert.equal(viewModel.args("clickHandler", 0)[0].data, viewModel.items[0]);
        });

        it("binding template to field of the parent object", function() {
            var viewModel = kendo.observable({
                foo: "foo",
                items: [{}]
            });

            dom = $('<ul data-bind="source: items" data-template="parent-field-template" />');

            kendo.bind(dom, viewModel);

            assert.equal(dom.find("li").text(), viewModel.foo);
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

        it("binding template to function of the parent object", function() {
            var viewModel = kendo.observable({
                foo: function() {
                    return "foo";
                },
                items: [{}]
            });

            dom = $('<ul data-bind="source: items" data-template="parent-field-template" />');

            kendo.bind(dom, viewModel);

            assert.equal(dom.find("li").text(), viewModel.foo());
        });

        it("binding template to a grand parent field", function() {
            var viewModel = kendo.observable({
                foo: "foo",
                bar: {
                    items: [{}]
                }
            });

            dom = $('<ul data-bind="source: bar.items" data-template="parent-field-template" />');

            kendo.bind(dom, viewModel);

            assert.equal(dom.find("li").text(), viewModel.foo);
        });

        it("binding template to a grand parent function", function() {
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

            assert.equal(dom.find("li").text(), viewModel.foo.foo());
        });

        it("binding dispose removes change handler when bound to field of the parent object", function() {
            var initialBindingCount;
            var viewModel = kendo.observable({
                foo: "foo",
                items: [{}]
            });

            dom = $('<ul data-bind="source: items" data-template="parent-field-template" />');

            kendo.bind(dom, viewModel);

            initialBindingCount = viewModel._events.change.length;
            kendo.unbind(dom);
            assert.equal(viewModel._events.change.length, initialBindingCount - 2); // -2 = 1 for source binder, 1 for text binder
        });

        it("select with source and value binding in template with source binding", function() {
            dom = $('<div data-template="select-element-template" data-bind="source:items"/>');
            var vm = kendo.observable({
                items: [
                    {
                        values: [{ Text: "ItemA", Value: "AAA" }, { Text: "ItemB", Value: "BBB" }],
                        currentValue: "AAA"
                    },
                    {
                        values: [{ Text: "ItemA", Value: "AAA" }, { Text: "ItemB", Value: "BBB" }],
                        currentValue: "BBB"
                    }
                ]
            });

            kendo.bind(dom, vm);

            assert.equal(dom.find("select:first").val(), "AAA");
            assert.equal(dom.find("select:last").val(), "BBB");
        });

        it("mobile and desktop widgets are initialized in the correct priority", function() {
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
            kendo.bind(dom, kendo.observable({ foo: ["bar"] }), kendo.mobile.ui, kendo.ui);
            assert.isOk(dom.find("span").data("kendoMobileTestWidget"));
        });

        it("nested template without source with event binding", function() {
            dom = $('<div data-template="nested-master-template" data-bind="source:items"/>');

            kendo.bind(dom, {
                clickHandler: function() {
                    assert.isOk(true);
                },
                items: [{ items: [{ foo: 1 }] }]
            });

            dom.find("li").click();
        });


        it("grand parent function has the right context", function() {
            var viewModel = kendo.observable({
                foo: {
                    foo: function() {
                        assert.strictEqual(this, viewModel.foo);
                    }
                },
                items: [{}]
            });

            dom = $('<ul data-bind="source: items" data-template="parent-nested-function-template" />');

            kendo.bind(dom, viewModel);
        });

        it("the function of the parent object has the right context", function() {
            var viewModel = kendo.observable({
                foo: function(item) {
                    assert.strictEqual(this, viewModel);
                },
                items: [{}]
            });

            dom = $('<ul data-bind="source: items" data-template="parent-field-template" />');

            kendo.bind(dom, viewModel);
        });

        it("the function of the parent object receives the current item as an argument", function() {
            var viewModel = kendo.observable({
                foo: function(item) {
                    assert.strictEqual(item, this.items[0]);
                },
                items: [{}]
            });

            dom = $('<ul data-bind="source: items" data-template="parent-field-template" />');

            kendo.bind(dom, viewModel);
        });

        it("binding template to a primitive field", function() {
            var viewModel = {
                foo: {
                    bar: "bar"
                }
            };

            dom = $('<div data-bind="source: foo.bar" data-template="primitive-template">');

            kendo.bind(dom, viewModel);

            assert.equal(dom.text().trim(), "bar");
        });

                it("binding child elements of template to data item of primitive type", function() {
            dom = $('<ul data-template="ul-template" data-bind="source:foo"/>');

            var viewModel = kendo.observable({
                foo: [1]
            });

            kendo.bind(dom, viewModel);
            assert.equal(dom.find("li").text(), viewModel.foo[0]);
        });

        it("template binding without source does not break observable hierarchy", function() {
            dom = $('<div data-template="div-template" data-bind="source:this"/>');

            var model = kendo.observable({ foo: "foo" });
            kendo.bind(dom, model);

            assert.equal(model.parent(), null);
        });

                it("removing items from data source removes option elements without destroying the existing ones", function() {
            dom = $('<select data-template="select-template" data-bind="source:foo"/>');

            var viewModel = kendo.observable({
                foo: new kendo.data.DataSource({
                    data: [
                        { id: 1, name: "1" },
                        { id: 2, name: "2" },
                        { id: 3, name: "3" },
                        { id: 4, name: "4" }
                    ]
                })
            });

            kendo.bind(dom, viewModel);

            var firstOption = dom.find("option")[0];
            var lastOption = dom.find("option")[3];

            viewModel.foo.remove(viewModel.foo.at(1));

            assert.equal(dom.find("option").length, viewModel.foo.data().length);
            assert.equal(dom.find("option")[0], firstOption);
            assert.equal(dom.find("option")[2], lastOption);
        });

        it("removing items from data source removes option elements without destroying the existing ones", function() {
            dom = $('<select data-template="select-template" data-bind="source:foo"/>');

            var viewModel = kendo.observable({
                foo: new kendo.data.DataSource({
                    data: [
                        { id: 1, name: "1" },
                        { id: 2, name: "2" },
                        { id: 3, name: "3" },
                        { id: 4, name: "4" }
                    ]
                })
            });

            kendo.bind(dom, viewModel);

            var firstOption = dom.find("option")[0];
            var lastOption = dom.find("option")[3];

            viewModel.foo.remove(viewModel.foo.at(1));

            assert.equal(dom.find("option").length, viewModel.foo.data().length);
            assert.equal(dom.find("option")[0], firstOption);
            assert.equal(dom.find("option")[2], lastOption);
        });

        it("pushing items to array initializes child bindings", function() {
            dom = $('<ul data-bind="source:foo" data-template="ul-template"/>');

            var viewModel = kendo.observable({
                foo: [1, 2]
            });

            kendo.bind(dom, viewModel);

            viewModel.foo.push(3, 4);

            assert.equal(dom.find("li:last").text(), "4");
        });

        it("data source data isn't fetched if the auto-bind attribute is set to false", function() {
            dom = $('<select data-template="select-template" data-auto-bind="false" data-bind="source:foo"/>');

            kendo.bind(dom, {
                foo: new kendo.data.DataSource({
                    data: [{
                        id: 1,
                        name: "foo"
                    }]
                })
            });

            assert.equal(dom.find("option").length, 0);
        });
    });


    describe("mvvm observing - no CSP", function() {
        beforeEach(function() {
            this.sourceBinder = kendo.data.binders.source;

            Mocha.fixture.append(
                '<script id="src-bind-template" type="text/x-kendo-template">' +
                '  <div>' +
                '    <input data-bind="value: value" />' +
                '    <span class="val" data-bind="text: value"></span>' +
                '  </div>' +
                '</script>' +
                '<script id="src-bind-template-w-select" type="text/x-kendo-template">' +
                '  <div>' +
                '    <input data-bind="value: value" />' +
                '    <span class="val" data-bind="text: value"></span>' +
                '    <select data-bind="source: options" data-text-field="name" data-value-field="uid"></select>' +
                '  </div>' +
                '</script>' +
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
        });
        afterEach(function() {
            kendo.data.binders.source = this.sourceBinder;
        });

        it("changing a view model observable array updates the select options within a template", function() {
            var viewModel = kendo.observable({
                data: [
                    { "value": 1, options: [{ name: 1 }, { name: 2 }] },
                    { "value": 2, options: [{ name: 1 }, { name: 2 }] }
                ]
            });

            var dom = $('<div data-bind="source: data" data-template="src-bind-template-w-select"></div>');
            kendo.bind(dom, viewModel);
            viewModel.data[1].value = 1000;
            viewModel.set("data[0].options[0].name", "TEST1");
            viewModel.set("data[0].options[1].name", "TEST2");

            assert.equal(dom.find("option:eq(0)").text(), "TEST1");
            assert.equal(dom.find("option:eq(1)").text(), "TEST2");
            assert.equal(dom.find(".val:eq(1)").text(), "2");
        });

        it("changing a view model observable array updates only the value bound elements instead of the whole template", function() {
            var viewModel = kendo.observable({
                data: [
                    { "value": 1 },
                    { "value": 2 }
                ]
            });

            var dom = $('<div data-bind="source: data" data-template="src-bind-template"></div>');
            kendo.bind(dom, viewModel);
            viewModel.data[1].value = 1000;
            viewModel.set("data[0].value", 5);

            assert.equal(dom.find(".val:eq(1)").text(), "2");
        });

        it("changing the input value updates dependent observable from the parent object", function() {
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

            assert.equal(viewModel.items[0].bar, "foo");
        });

        it("tracking changes of observable items in array", function() {
            var viewModel = kendo.observable({
                foo: [{ name: "foo" }]
            });

            var dom = $('<ul data-template="array-template" data-bind="source:foo"/>');

            kendo.bind(dom, viewModel);

            viewModel.foo[0].set("name", "bar");

            assert.equal(dom.find("li").text(), "bar");
        });

        it("replacing the source array rebinds the element", function() {
            var viewModel = kendo.observable({
                foo: [{ name: "foo" }]
            });

            var dom = $('<ul data-template="array-template" data-bind="source:foo"/>');

            kendo.bind(dom, viewModel);

            viewModel.set("foo", [{ name: "bar" }]);

            assert.equal(dom.find("li").text(), "bar");
        });

        it("tracking changes in templates", function() {
            var dom = $('<div data-template="simple-field-template" data-bind="source: this" />');

            var viewModel = kendo.observable({ foo: "foo" });

            kendo.bind(dom, viewModel);

            viewModel.set("foo", "bar");

            assert.equal(dom.text().trim(), "bar");
        });

        it("change event is fired once", function() {
            var dom = $('<div data-template="simple-field-template" data-bind="source: this" />');

            var viewModel = kendo.observable({ foo: "foo" });

            kendo.bind(dom, viewModel);

            viewModel.bind("change", function() {
                assert.isOk(true);
            });

            viewModel.set("foo", "bar");
        });

        it("dependencies are reavaluated", function() {
            var dom = $('<div data-template="if-else-template" data-bind="source: this" />');

            var viewModel = kendo.observable({ foo: "foo", bar: "bar" });

            kendo.bind(dom, viewModel);

            viewModel.set("foo", "baz");

            viewModel.set("bar", "boo");

            assert.equal(dom.text().trim(), "boo");
        });

        it("does not attach more than one change handler when monitoring for dependency changes", function() {
            var dom = $('<div data-template="counting-template" data-bind="source:this" />');

            var viewModel = kendo.observable({ foo: "foo" });

            kendo.bind(dom, viewModel);

            viewModel.set("foo", "baz");

            templateEvaluationCounter = 0;

            viewModel.set("foo", "boo");

            assert.equal(templateEvaluationCounter, 1);
        });

        it("refreshing the source destroys the binder objects", function() {
            var dom = $('<div data-template="custom-binder-template" data-bind="source:this" />');

            var viewModel = kendo.observable({ foo: "foo" });

            kendo.data.binders.custom = kendo.data.Binder.extend({
                refresh: function() {
                },
                destroy: function() {
                    assert.isOk(true);
                }
            });

            kendo.bind(dom, viewModel);

            viewModel.set("foo", "baz");
        });

        it("removing an item from the source destroys the binder objects", function() {
            var dom = $('<div data-template="custom-binder-template" data-bind="source:foo" />');

            var viewModel = kendo.observable({ foo: [{}] });

            kendo.data.binders.custom = kendo.data.Binder.extend({
                refresh: function() {
                },
                destroy: function() {
                    assert.isOk(true);
                }
            });

            kendo.bind(dom, viewModel);

            viewModel.foo.splice(0, 1);
        });

        it("tracking changes when direct access and set are used", function() {
            var dom = $('<div data-template="nested-field-template" data-bind="source:this"/>');

            var viewModel = kendo.observable({
                foo: {
                    bar: "bar"
                }
            });

            kendo.bind(dom, viewModel);

            viewModel.foo.set("bar", "baz");

            assert.equal(dom.text().trim(), "baz");
        });

        it("tracking changes when single set is used", function() {
            var dom = $('<div data-template="nested-field-template" data-bind="source:this" />');

            var viewModel = kendo.observable({
                foo: {
                    bar: "bar"
                }
            });

            kendo.bind(dom, viewModel);

            viewModel.set("foo.bar", "boo");

            assert.equal(dom.text().trim(), "boo");
        });

        it("tracking changes when direct access and set are used (multiple get template)", function() {
            var dom = $('<div data-template="nested-field-template-multiple-gets" data-bind="source:this" />');

            var viewModel = kendo.observable({
                foo: {
                    bar: "bar"
                }
            });

            kendo.bind(dom, viewModel);

            viewModel.foo.set("bar", "baz");

            assert.equal(dom.text().trim(), "baz");
        });

        it("tracking changes when single set is used (multiple get template)", function() {
            var dom = $('<div data-bind="source:this" data-template="nested-field-template-multiple-gets" />');

            var viewModel = kendo.observable({
                foo: {
                    bar: "bar"
                }
            });

            kendo.bind(dom, viewModel);

            viewModel.set("foo.bar", "boo");

            assert.equal(dom.text().trim(), "boo");
        });

        it("tracks changes of template bound to parent field", function() {
            var dom = $('<ul data-bind="source: items" data-template="ul-template"></ul>');

            var viewModel = kendo.observable({
                root: "foo",
                items: [{}]
            });

            kendo.bind(dom, viewModel);
            viewModel.set("root", "bar");
            assert.equal(dom.find("li").text(), viewModel.root);
        });

        it("parent properties are invoked with the current item", function() {
            var dom = $('<ul data-bind="source: items" data-template="ul-template-alias"></ul>');

            var viewModel = kendo.observable({
                root: function(item) {
                },
                rootAlias: function(item) {
                    assert.equal(item, viewModel.items[0]);
                    return this.get("root");
                },
                items: [{}]
            });

            kendo.bind(dom, viewModel);
            viewModel.set("root", "bar");
        });

        it("tracks changes of parent field bound to dependent parent field", function() {
            var dom = $('<ul data-bind="source: items" data-template="ul-template-alias"></ul>');

            var viewModel = kendo.observable({
                root: "foo",
                rootAlias: function() {
                    return this.get("root");
                },
                items: [{}]
            });

            kendo.bind(dom, viewModel);

            viewModel.set("root", "bar");

            assert.equal(dom.find("li").text(), "bar");
        });

        it("tracks changes of parent field bound to dependent parent field", function() {
            var dom = $('<ul data-bind="source: items" data-template="ul-template-alias"></ul>');

            var viewModel = kendo.observable({
                root: "foo",
                rootAlias: function(item) {
                    return item.get("foo");
                },
                items: [{ foo: "foo" }]
            });

            kendo.bind(dom, viewModel);

            viewModel.items[0].set("foo", "bar");

            assert.equal(dom.find("li").text(), "bar");
        });

        it("tracks changes of element bound to parent field within a child template", function() {
            var dom = $('<div><span data-bind="text:root"></span><ul data-bind="source: items" data-template="ul-input-template"></ul></div>');

            var viewModel = kendo.observable({
                root: "foo",
                items: [{ bar: "baz" }]
            });

            kendo.bind(dom, viewModel);

            dom.find("input").val("moo").change();

            assert.equal(dom.find("span").text(), "moo");
        });

        it("tracks changes of element bound to parent nested field within a child template", function() {
            var dom = $('<div><span data-bind="text:root.child"></span><ul data-bind="source: items" data-template="ul-input-child-template"></ul></div>');

            var viewModel = kendo.observable({
                root: { child: "foo" },
                items: [{ bar: "baz" }]
            });

            kendo.bind(dom, viewModel);

            dom.find("input").val("moo").change();

            assert.equal(dom.find("span").text(), "moo");
        });
    });
}());
