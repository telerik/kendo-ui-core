(function() {
    var DataSource = kendo.data.DataSource;

    module('pager MVVM', {
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("initializes a pager when data role is pager", function() {
        var dom = $('<div data-role="pager"/>').appendTo(QUnit.fixture);

        kendo.bind(dom);

        ok(dom.data("kendoPager") instanceof kendo.ui.Pager);
    });

    test("initalizes data source", function() {
        var dom = $('<div data-role="pager" data-bind="source:items" />').appendTo(QUnit.fixture);

        kendo.bind(dom, { items: DataSource.create(["foo", "bar"]) } );
        dom.data("kendoPager").dataSource.view();

        equal(dom.data("kendoPager").dataSource.view()[0], "foo");
    });

    test("binding pager initialized before binding", function() {
        var dom = $('<div data-bind="source:items" />').appendTo(QUnit.fixture);

        var observable = kendo.observable({ items: DataSource.create([{text:"foo"}, {text:"bar"}])});

        dom.kendoPager();

        kendo.bind(dom, observable);

        equal(dom.data("kendoPager").dataSource.at(0).text, "foo");
    });

    test("binding pager initialized after binding", function() {
        var dom = $('<div data-bind="source:items" />').appendTo(QUnit.fixture);

        var observable = kendo.observable({ items: DataSource.create([{text:"foo"}, {text:"bar"}])});

        kendo.bind(dom, observable);

        dom.kendoPager();

        equal(dom.data("kendoPager").dataSource.at(0).text, "foo");
    });
})();
