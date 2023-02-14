(function() {
    describe("listview mvvm no CSP", function() {
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
            };
        });
        afterEach(function() {
            window.dataBound = null;
            kendo.destroy(Mocha.fixture);
        });

        it("binding template", function() {
            var dom = $('<div data-role="listview" data-template="template" data-bind="source:items" />').appendTo(Mocha.fixture);

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoListView").content.children().first().html().trim(), "<strong>foo</strong>");
        });

        it("binding template containing binding attributes", function() {
            var dom = $('<div data-role="listview" data-template="template-with-attributes" data-bind="source:items" />').appendTo(Mocha.fixture);

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoListView").content.children().first().html().trim(), '<strong data-bind="text:text">foo</strong>');
        });

        it("binding altTemplate", function() {
            var dom = $('<div data-role="listview" data-template="template" data-alt-template="altTemplate" data-bind="source:items" />').appendTo(Mocha.fixture);

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoListView").content.children().eq(1).html().trim(), "<span>bar</span>");
        });

        it("binding editTemplate", function() {
            var dom = $('<div data-role="listview" data-template="template" data-edit-template="editTemplate" data-bind="source:items" />').appendTo(Mocha.fixture);

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            dom.data("kendoListView").edit(dom.find(".k-listview-content").children().eq(0));

            assert.equal(dom.data("kendoListView").content.find(":input:first").val().trim(), "foo");
        });

        it("updating an item from the data source updates the corresponding listview item", function() {
            var dom = $('<div data-role="listview" data-template="template-with-attributes" data-bind=" source:items" />').appendTo(Mocha.fixture);

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            observable.items[0].set("text", "baz");

            assert.equal(dom.data("kendoListView").content.children().first().text().trim(), "baz");
        });

        it("destroys binding targets when datasource changes", function() {
            var dom = $('<div data-role="listview" data-template="template-with-attributes" data-bind=" source:items" />').appendTo(Mocha.fixture);

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);
            dom.data("kendoListView").refresh();

            assert.equal(observable.items[0]._events["change"].length, 2); //1 for the text and 1 because the observable array tracks its items
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

            assert.isOk(!listView.content.children().length);
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
            assert.equal(dom.find("div span").html().trim(), "foo");
            assert.equal(dom.find("div strong").html().trim(), "bar");
        });

        it("setOptions changes template", function() {
            var dom = $('<div data-role="listview" data-template="template" data-bind="source:items" />').appendTo(Mocha.fixture);

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            var listView = dom.data("kendoListView");
            listView.setOptions({ template: () => "<div>template</div>" });
            listView.refresh();

            var firstItemHtml = listView.content.children().first().html().trim();
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
            };

            kendo.bind(dom, viewmodel);

            dom.data("kendoListView").edit(dom.find(".k-listview-content").children().eq(0));
            dom.data("kendoListView").save();

            assert.equal(dom.find(".k-listview-content").children().eq(0).text(), "foo");
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
            };

            kendo.bind(dom, viewmodel);

            dom.data("kendoListView").edit(dom.find(".k-listview-content").children().eq(0));
            dom.data("kendoListView").cancel();

            assert.equal(dom.find(".k-listview-content").children().eq(0).text(), "foo");
        });

        it("it is possible to configure scrollable setting with mvvm", function() {
            var dom = $('<div data-role="listview" data-template="template" data-bind="source:items" data-scrollable="endless"/>').appendTo(Mocha.fixture);

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);

            var listView = dom.data("kendoListView");

            assert.equal(listView.options.scrollable, "endless");
        });

        it("_endlessPageSize is set when endless scrolling is enabled", function() {
            var dom = $('<div data-role="listview" data-template="template" data-bind="source:dataSource" data-scrollable="endless"/>').appendTo(Mocha.fixture);

            var viewmodel = {
                dataSource: new kendo.data.DataSource({
                    pageSize: 9,
                    data: [{ id: 1, text: "foo" }, { id: 2, text: "bar" }],
                    schema: {
                        model: {
                            id: "id"
                        }
                    }
                })
            };

            kendo.bind(dom, viewmodel);

            var listView = dom.data("kendoListView");

            assert.equal(listView._endlessPageSize, 9);
        });
    });
}());
