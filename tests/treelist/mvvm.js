(function() {
    var dom, instance;
    var rootItems = [ { id: 1, parentId: null }, { id: 2, parentId: null } ];

    module("TreeList MVVM", {
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            dom = instance = null;
        }
    });

    function bindHtml(html, viewModel) {
        dom = $(html).appendTo(QUnit.fixture);

        kendo.bind(dom, viewModel || {});

        instance = dom.data("kendoTreeList");
    }

    test("declarative initialization", function() {
        bindHtml("<div data-role='treelist' />");

        ok(dom.data("kendoTreeList") instanceof kendo.ui.TreeList);
    });

    test("bind data source", function() {
        bindHtml("<div data-role='treelist' data-bind='source: items' />", {
            items: rootItems.slice()
        });

        ok(instance.dataSource instanceof kendo.data.TreeListDataSource);
        equal(instance.dataSource.data().length, 2);
    });

    test("bind column template", function() {
        var observable = kendo.observable({ items: rootItems.slice() });

        bindHtml("<div data-role='treelist' " +
                 "data-columns='[{ field: \"id\", template: \"foo #= id #\" }]' " +
                 "data-bind='source:items' />", observable);

        var rows = instance.content.find("tr");
        equal(rows.eq(0).text(), "foo 1");
        equal(rows.eq(1).text(), "foo 2");
    });

    var mvvmTemplate = kendo.htmlEncode("<span class='content' data-bind='text: text'></span>");

    test("bind and update template", function() {
        var observable = kendo.observable({ items: rootItems.slice() });

        bindHtml("<div data-role='treelist' " +
                 "data-columns='[{ field: \"id\", template: \"" + mvvmTemplate + "\" }]' " +
                 "data-bind='source:items' />", observable);

        observable.items[0].set("text", "bar");

        var rows = instance.content.find("tr");
        equal(rows.eq(0).find(".content").text(), "bar");
    });

    test("template is updated on correct row", function() {
        var observable = kendo.observable({ items: [
            { id: 1, text: "foo", parentId: null },
            { id: 2, text: "bar", parentId: null },
            { id: 3, text: "baz", parentId: 1 }
        ] });

        bindHtml("<div data-role='treelist' " +
                 "data-columns='[{ field: \"id\", template: \"" + mvvmTemplate + "\" }]' " +
                 "data-bind='source:items' />", observable);

        observable.items[2].set("text", "qux");

        var rows = instance.content.find("tr");
        equal(rows.eq(1).find(".content").text(), "qux");
    });
})();
