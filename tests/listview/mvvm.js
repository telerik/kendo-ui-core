(function() {
    describe("listview mvvm", function() {
        beforeEach(function() {
            Mocha.fixture.append('<script id="template" type="text/x-kendo-template">\
                    <div><strong>#:text#</strong></div>\
                </script>\
                <script id="altTemplate" type="text/x-kendo-template">\
                    <div><span>#:text#</span></div>\
                </script>\
                <script id="editTemplate" type="text/x-kendo-template">\
                    <div><input type="text" data-bind="value:text"/></div>\
                </script>\
                <script id="template-with-attributes" type="text/x-kendo-template">\
                    <div><strong data-bind="text:text"></strong></div>\
                </script>\
                <script id="template-with-events" type="text/x-kendo-template">\
                    <div><span>#=text#</span><strong data-bind="text:text, events:{ click: rootHandler }"></strong></div>\
                </script>\
            ');

            window.dataBound = function() {
                assert.isOk(true);
            }
        });
        afterEach(function() {
            window.dataBound = null;
            kendo.destroy(Mocha.fixture);
        });

        it("initializes a listview when data role is listview", function() {
            var dom = $('<div data-role="listview"/>').appendTo(Mocha.fixture);

            kendo.bind(dom);

            assert.isOk(dom.data("kendoListView") instanceof kendo.ui.ListView);
        });

        it("initalizes data source", function() {
            var dom = $('<div data-role="listview" data-bind="source:items" />').appendTo(Mocha.fixture);

            kendo.bind(dom, { items: ["foo", "bar"] });

            assert.equal(dom.data("kendoListView").dataSource.view()[0], "foo");
            assert.equal(dom.data("kendoListView").dataSource.view()[1], "bar");
        });

        it("binding listview initialized before binding", function() {
            var dom = $('<div data-bind="source:items" />').appendTo(Mocha.fixture);

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            dom.kendoListView();

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoListView").dataSource.at(0).text, "foo");
        });

        it("binding listview initialized after binding", function() {
            var dom = $('<div data-bind="source:items" />').appendTo(Mocha.fixture);

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            dom.kendoListView();

            assert.equal(dom.data("kendoListView").dataSource.at(0).text, "foo");
        });

        it("binding template", function() {
            var dom = $('<div data-role="listview" data-template="template" data-bind="source:items" />').appendTo(Mocha.fixture);

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            assert.equal($.trim(dom.data("kendoListView").element.children().first().html()), "<strong>foo</strong>");
        });

        it("binding template containing binding attributes", function() {
            var dom = $('<div data-role="listview" data-template="template-with-attributes" data-bind="source:items" />').appendTo(Mocha.fixture);

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            assert.equal($.trim(dom.data("kendoListView").element.children().first().html()), '<strong data-bind="text:text">foo</strong>');
        });

        it("binding altTemplate", function() {
            var dom = $('<div data-role="listview" data-template="template" data-alt-template="altTemplate" data-bind="source:items" />').appendTo(Mocha.fixture);

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            assert.equal($.trim(dom.data("kendoListView").element.children().eq(1).html()), "<span>bar</span>");
        });

        it("binding editTemplate", function() {
            var dom = $('<div data-role="listview" data-template="template" data-edit-template="editTemplate" data-bind="source:items" />').appendTo(Mocha.fixture);

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            dom.data("kendoListView").edit(dom.children().eq(0));

            assert.equal($.trim(dom.data("kendoListView").element.find(":input:first").val()), "foo");
        });

        it("updating an item from the data source updates the corresponding listview item", function() {
            var dom = $('<div data-role="listview" data-template="template-with-attributes" data-bind=" source:items" />').appendTo(Mocha.fixture);

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            observable.items[0].set("text", "baz");

            assert.equal($.trim(dom.data("kendoListView").element.children().first().text()), "baz");
        });

        it("destroys binding targets when datasource changes", function() {
            var dom = $('<div data-role="listview" data-template="template-with-attributes" data-bind=" source:items" />').appendTo(Mocha.fixture);

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);
            dom.data("kendoListView").refresh();

            assert.equal(observable.items[0]._events["change"].length, 2); //1 for the text and 1 because the observable array tracks its items
        });

        it("destroys detaches the events to widget", function() {
            var dom = $('<div data-role="listview" data-bind="source:items" />').appendTo(Mocha.fixture);

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);
            kendo.unbind(dom);

            var listView = dom.data("kendoListView");
            assert.equal(listView._events["dataBound"].length, 0);
            assert.equal(listView._events["dataBinding"].length, 0);
        });

        it("dataBound event is raised if attached as option", function() {
            var dom = $('<div data-role="listview" data-bound="dataBound" data-bind="source:items" />').appendTo(Mocha.fixture);

            var observable = kendo.observable({
                items: [{ text: "foo" }, { text: "bar" }]
            });

            kendo.bind(dom, observable);
        });

        it("dataBound event is raised if attached as option to a already initialized listview", function() {
            var dom = $('<div data-bound="dataBound" data-bind="source:items" />').appendTo(Mocha.fixture).kendoListView();

            var observable = kendo.observable({
                items: [{ text: "foo" }, { text: "bar" }]
            });

            kendo.bind(dom, observable);
        });


        it("binding visible to true shows the listview", function() {
            var dom = $('<div data-role="listview" data-bind="visible: visible"></div>').appendTo(Mocha.fixture);

            kendo.bind(dom, { visible: true });

            var listview = dom.data("kendoListView");

            assert.isOk(listview.wrapper.css("display") != "none", "listview is visible");
        });

        it("binding visible to false hides the listview", function() {
            var dom = $('<div data-role="listview" data-bind="visible: visible"></div>').appendTo(Mocha.fixture);

            kendo.bind(dom, { visible: false });

            var listview = dom.data("kendoListView");

            assert.isOk(listview.wrapper.css("display") == "none", "listview is not visible");
        });

        it("binding invisible to true hides the listview", function() {
            var dom = $('<div data-role="listview" data-bind="invisible: invisible"></div>').appendTo(Mocha.fixture);

            kendo.bind(dom, { invisible: true });

            var listview = dom.data("kendoListView");

            assert.isOk(listview.wrapper.css("display") == "none", "listview is invisible");
        });

        it("binding invisible to false shows the listview", function() {
            var dom = $('<div data-role="listview" data-bind="invisible: invisible"></div>').appendTo(Mocha.fixture);

            kendo.bind(dom, { invisible: false });

            var listview = dom.data("kendoListView");

            assert.isOk(listview.wrapper.css("display") != "none", "listview is not invisible");
        });

        it("setting autobind when bound to DataSource", function() {
            var dom = $('<div data-role="listview" data-bind="source:dataSource" data-auto-bind="false" data-template="template" />').appendTo(Mocha.fixture);

            var dataSource = new kendo.data.DataSource({
                data: [{ text: "foo" }, { text: "bar" }]
            });

            var observable = kendo.observable({
                dataSource: dataSource
            });

            kendo.bind(dom, observable);
            var listView = dom.data("kendoListView");

            assert.isOk(!listView.wrapper.children().length);
        });

        it("binding selectable to true", function() {
            var dom = $('<div data-role="listview" data-selectable="true"></div>').appendTo(Mocha.fixture);

            kendo.bind(dom);

            var listview = dom.data("kendoListView");

            assert.isOk(listview.selectable, "listview is not selectable");
        });

        it("binding navigatable to true", function() {
            var dom = $('<div data-role="listview" data-navigatable="true"></div>').appendTo(Mocha.fixture);

            kendo.bind(dom);

            var listview = dom.data("kendoListView");

            assert.isOk(listview.options.navigatable, "listview is not navigatable");
        });

        it("binds event handlers in template to root view model when item changes", function() {
            var dom = $('<div data-role="listview" data-bind="source:dataSource"  data-template="template-with-events" />').appendTo(Mocha.fixture);

            var observable = kendo.observable({
                dataSource: [{ text: "foo" }]
            });

            stub(observable, "rootHandler");

            kendo.bind(dom, observable);

            observable.dataSource[0].set("text", "bar");

            dom.find("div strong").click();

            assert.equal(observable.calls("rootHandler"), 1);
            assert.equal($.trim(dom.find("div span").html()), "foo");
            assert.equal($.trim(dom.find("div strong").html()), "bar");
        });

        it("setOptions changes template", function() {
            var dom = $('<div data-role="listview" data-template="template" data-bind="source:items" />').appendTo(Mocha.fixture);

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            var listView = dom.data("kendoListView");
            listView.setOptions({ template: "<div>template</div>" });
            listView.refresh();

            var firstItemHtml = $.trim(listView.element.children().first().html());
            assert.equal(firstItemHtml, "template");
        });

        it("item is bind ot the model after 'save' button is pressed in edit mode", function() {
            var dom = $('<div data-role="listview" data-template="template-with-attributes" data-edit-template="editTemplate" data-bind="source:dataSource" />').appendTo(Mocha.fixture);

            var viewmodel = {
                dataSource: new kendo.data.DataSource({
                    data: [{ id: 1, text: "foo" }, { id: 2, text: "bar" }],
                    schema: {
                        model: {
                            id: "id"
                        }
                    }
                })
            }

            kendo.bind(dom, viewmodel);

            dom.data("kendoListView").edit(dom.children().eq(0));
            dom.data("kendoListView").save();

            assert.equal(dom.children().eq(0).text(), "foo");
        });

        it("item is bind ot the model after 'cancel' button is pressed in edit mode", function() {
            var dom = $('<div data-role="listview" data-template="template-with-attributes" data-edit-template="editTemplate" data-bind="source:dataSource" />').appendTo(Mocha.fixture);

            var viewmodel = {
                dataSource: new kendo.data.DataSource({
                    data: [{ id: 1, text: "foo" }, { id: 2, text: "bar" }],
                    schema: {
                        model: {
                            id: "id"
                        }
                    }
                })
            }

            kendo.bind(dom, viewmodel);

            dom.data("kendoListView").edit(dom.children().eq(0));
            dom.data("kendoListView").cancel();

            assert.equal(dom.children().eq(0).text(), "foo");
        });
    });
}());
