(function() {
    module("grid mvvm binding", {
        setup: function() {
            QUnit.fixture.append(
               '<script id="detail-template" type="text/x-kendo-template">' +
               '<strong>#:text#</strong>' +
               '</script>' +
               '<script id="template" type="text/x-kendo-template">' +
               '<tr><td><strong>#:text#</strong></td></tr>' +
               '</script>' +
               '<script id="template-with-attributes" type="text/x-kendo-template">' +
               '<tr data-uid="#=uid#"><td><strong data-bind="text:text"></strong></td></tr>' +
               '</script>' +
               '<script id="template-with-event" type="text/x-kendo-template">' +
               '<tr data-uid="#=uid#"><td><strong data-bind="text:text, events:{ click: rootHandler}"></strong></td></tr>' +
               '</script>'
            );

            window.dataBound = function() {
                ok(true);
            }

            kendo.effects.disable();
        },
        teardown: function() {
            delete window.dataBound;
            kendo.destroy(QUnit.fixture);
            $(".k-window, .k-overlay").remove();
            kendo.effects.enable();
        }
    });

    test("initializes a grid when data role is grid", function() {
        var dom = $('<div data-role="grid"/>')
            .appendTo(QUnit.fixture);

        kendo.bind(dom);

        ok(dom.data("kendoGrid") instanceof kendo.ui.Grid);
    });

    test("initalizes data source", function() {
        var dom = $('<div data-role="grid" data-bind="source:items" />')
            .appendTo(QUnit.fixture);

        kendo.bind(dom, { items: ["foo", "bar"] } );

        equal(dom.data("kendoGrid").dataSource.view()[0], "foo");
        equal(dom.data("kendoGrid").dataSource.view()[1], "bar");
    });

    test("binding grid initialized before binding", function() {
        var dom = $('<table data-bind="source:items" />')
            .appendTo(QUnit.fixture);

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}]});

        dom.kendoGrid();

        kendo.bind(dom, observable);

        equal(dom.data("kendoGrid").dataSource.at(0).text, "foo");
    });

    test("binding grid initialized after binding", function() {
        var dom = $('<table data-bind="source:items" />')
            .appendTo(QUnit.fixture);

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}]});

        kendo.bind(dom, observable);

        dom.kendoGrid();

        equal(dom.data("kendoGrid").dataSource.at(0).text, "foo");
    });

    test("binding template", function() {
        var dom = $('<div data-role="grid" data-row-template="template" data-bind="source:items" />')
            .appendTo(QUnit.fixture);

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

        kendo.bind(dom, observable);

        equal($.trim(dom.data("kendoGrid").tbody.find("tr:first > td:first").html()), "<strong>foo</strong>");
    });

    test("binding template containing binding attributes", function() {
        var dom = $('<div data-role="grid" data-row-template="template-with-attributes" data-bind="source:items" />')
            .appendTo(QUnit.fixture);

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

        kendo.bind(dom, observable);

        equal($.trim(dom.data("kendoGrid").tbody.find("tr:first > td:first").html()), '<strong data-bind="text:text">foo</strong>');
    });

    test("updating an item from the data source updates the corresponding grid item", function() {
        var dom = $('<div data-role="grid" data-row-template="template-with-attributes" data-bind=" source:items" />')
            .appendTo(QUnit.fixture);

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

        kendo.bind(dom, observable);

        observable.items[0].set("text", "baz");

        equal($.trim(dom.data("kendoGrid").tbody.find("tr:first > td:first").text()), "baz");
    });

    test("templates are updated when grid is grouped", function() {
        var dom = $('<div data-role="grid" data-row-template="template-with-attributes" data-bind="source:items" />')
            .appendTo(QUnit.fixture);

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

        kendo.bind(dom, observable);
        dom.data("kendoGrid").dataSource.group({ field: "text" });

        equal($.trim(dom.data("kendoGrid").tbody.find("tr:not(.k-grouping-row):first > td:not(.k-group-cell):first").html()), '<strong data-bind="text:text">bar</strong>');
    });

    test("destroys binding targets when datasource changes", function() {
        var dom = $('<div data-role="grid" data-row-template="template-with-attributes" data-bind=" source:items" />')
            .appendTo(QUnit.fixture);

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

        kendo.bind(dom, observable);
        dom.data("kendoGrid").refresh();

        equal(observable.items[0]._events["change"].length, 2); //1 for the text and 1 because the observable array tracks its items
    });

    test("destroys detaches the events to widget", function() {
        var dom = $('<div data-role="grid" data-bind="source:items" />')
            .appendTo(QUnit.fixture);

        var observable = kendo.observable({ items: [{text:"foo"}, {text:"bar"}] });

        kendo.bind(dom, observable);
        kendo.unbind(dom);

        var grid = dom.data("kendoGrid");
        equal(grid._events["dataBound"].length, 0);
        equal(grid._events["dataBinding"].length, 0);
    });

    test("dataBound event is raised if bound", 1, function() {
        var dom = $('<div data-role="grid" data-bind="events: {dataBound: dataBound}, source:items" />')
            .appendTo(QUnit.fixture);

        var observable = kendo.observable({
            items: [{text:"foo"}, {text:"bar"}],
            dataBound: function() {
                ok(true);
            }
        });

        kendo.bind(dom, observable);
    });

    test("dataBound event is raised if attached as option", 2, function() {
        var dom = $('<div data-role="grid" data-bound="dataBound" data-bind="source:items" />')
            .appendTo(QUnit.fixture);

        var observable = kendo.observable({
            items: [{text:"foo"}, {text:"bar"}]
        });

        kendo.bind(dom, observable);
    });

    test("dataBound event is raised if attached as option to a already initialized grid", 1, function() {
        var dom = $('<div data-bound="dataBound" data-bind="source:items" />').appendTo(QUnit.fixture).kendoGrid();

        var observable = kendo.observable({
            items: [{text:"foo"}, {text:"bar"}]
        });

        kendo.bind(dom, observable);
    });

    test("assign to DataSource as ViewModel field", function() {
        var dom = $('<div data-role="grid" data-bind="source:dataSource" />')
            .appendTo(QUnit.fixture);

        var dataSource = new kendo.data.DataSource({
            data: [{text:"foo"}, {text:"bar"}]
        });

        var observable = kendo.observable({
            dataSource: dataSource
        });

        kendo.bind(dom, observable);
        var grid = dom.data("kendoGrid");

        strictEqual(grid.dataSource, dataSource);
    });

    test("binding visible to true shows the grid", function() {
        var dom = $('<div data-role="grid" data-bind="visible: visible"></div>')
            .appendTo(QUnit.fixture);

        kendo.bind(dom, { visible: true });

        var grid = dom.data("kendoGrid");

        ok(grid.wrapper.css("display") != "none", "grid is visible");
    });

    test("binding visible to false hides the grid", function() {
        var dom = $('<div data-role="grid" data-bind="visible: visible"></div>')
            .appendTo(QUnit.fixture);

        kendo.bind(dom, { visible: false });

        var grid = dom.data("kendoGrid");

        ok(grid.wrapper.css("display") == "none", "grid is not visible");
    });

    test("binding invisible to true hides the grid", function() {
        var dom = $('<div data-role="grid" data-bind="invisible: invisible"></div>')
            .appendTo(QUnit.fixture);

        kendo.bind(dom, { invisible: true });

        var grid = dom.data("kendoGrid");

        ok(grid.wrapper.css("display") == "none", "grid is invisible");
    });

    test("binding invisible to false shows the grid", function() {
        var dom = $('<div data-role="grid" data-bind="invisible: invisible"></div>')
            .appendTo(QUnit.fixture);

        kendo.bind(dom, { invisible: false });

        var grid = dom.data("kendoGrid");

        ok(grid.wrapper.css("display") != "none", "grid is not invisible");
    });

    test("setting autobind when bound to DataSource", function() {
        var dom = $('<div data-role="grid" data-bind="source:dataSource" data-auto-bind="false" />')
            .appendTo(QUnit.fixture);

        var dataSource = new kendo.data.DataSource({
            data: [{text:"foo"}, {text:"bar"}]
        });

        var observable = kendo.observable({
            dataSource: dataSource
        });

        kendo.bind(dom, observable);
        var grid = dom.data("kendoGrid");

        ok(!grid.tbody.find("tr").length);
    });

    test("binds event handlers in template to root view model when item changes", function() {
        var dom = $('<div data-role="grid" data-editable="popup"  data-row-template="template-with-event" data-bind="source:dataSource" />')
            .appendTo(QUnit.fixture);

        var observable = kendo.observable({
            dataSource: [ { foo: "foo", bar: "bar" } ]
        });

        stub(observable, "rootHandler");

        kendo.bind(dom, observable);

        dom.data("kendoGrid").editRow(dom.find("tbody > tr:first"));

        observable.dataSource[0].set("bar", "baz");

        dom.find("tbody > tr:first strong").click();

        equal(observable.calls("rootHandler"), 1);
    });

    test("binds event handlers in template to root view model if bound to DataSource instance", function() {
        var dom = $('<div data-role="grid" data-editable="popup"  data-row-template="template-with-event" data-bind="source:dataSource" />')
            .appendTo(QUnit.fixture);

        var observable = kendo.observable({
            dataSource: new kendo.data.DataSource({ data: [ { foo: "foo", bar: "bar" } ] })
        });

        stub(observable, "rootHandler");

        kendo.bind(dom, observable);

        dom.find("tbody > tr:first strong").click();

        equal(observable.calls("rootHandler"), 1);
    });

    test("binds detail template from the options", function() {
        var dom = $('<div data-role="grid" data-detail-template="detail-template" />')
            .appendTo(QUnit.fixture);

        kendo.bind(dom, {});
        ok(dom.data("kendoGrid").options.detailTemplate);
    });
})();


