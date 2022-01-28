(function() {
    var DataSource = kendo.data.DataSource;

    describe('pager MVVM', function() {
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("initializes a pager when data role is pager", function() {
            var dom = $('<div data-role="pager"/>').appendTo(Mocha.fixture);

            kendo.bind(dom);

            assert.isOk(dom.data("kendoPager") instanceof kendo.ui.Pager);
        });

        it("initalizes data source", function() {
            var dom = $('<div data-role="pager" data-bind="source:items" />').appendTo(Mocha.fixture);

            kendo.bind(dom, { items: DataSource.create(["foo", "bar"]) });
            dom.data("kendoPager").dataSource.view();

            assert.equal(dom.data("kendoPager").dataSource.view()[0], "foo");
        });

        it("binding pager initialized before binding", function() {
            var dom = $('<div data-bind="source:items" />').appendTo(Mocha.fixture);

            var observable = kendo.observable({ items: DataSource.create([{ text: "foo" }, { text: "bar" }]) });

            dom.kendoPager();

            kendo.bind(dom, observable);

            assert.equal(dom.data("kendoPager").dataSource.at(0).text, "foo");
        });

        it("binding pager initialized after binding", function() {
            var dom = $('<div data-bind="source:items" />').appendTo(Mocha.fixture);

            var observable = kendo.observable({ items: DataSource.create([{ text: "foo" }, { text: "bar" }]) });

            kendo.bind(dom, observable);

            dom.kendoPager();

            assert.equal(dom.data("kendoPager").dataSource.at(0).text, "foo");
        });
    });
}());
