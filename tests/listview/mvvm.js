(function() {
    describe("listview mvvm", function() {
        beforeEach(function() {
            window.dataBound = function() {
                assert.isOk(true);
            };
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
    });
}());
