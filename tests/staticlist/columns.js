(function() {
    var StaticList = kendo.ui.StaticList,
    element;

    module("kendo.ui.StaticList API", {
        setup: function() {
            kendo.ns = "kendo-";
            element = $("<ul></ul>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            element.data("kendoStaticList").destroy();

            kendo.support.touch = false;
            kendo.support.mobileOS = false;
            kendo.support.kineticScrollNeeded = false;
            kendo.ns = "";
        }
    });

    test("each column template shows text field if there is not field defined", function() {
        var list = new StaticList(element, {
            columns: [
                {},
            ],
            dataTextField: "text",
            dataSource: [ { id: 1, text: "item1" },
            { id: 2, text: "item2" },
            { id: 3, text: "item3" }]
        });

        equal(list.templates.column0({ id: 1, text: "item1" }), "item1");
    });

    test("each column sets a new template", function() {
        var list = new StaticList(element, {
            columns: [
                {field: "name"},
                {field: "id"}
            ],
            dataTextField: "name",
            dataSource: [ { id: 1, name: "item1" },
            { id: 2, name: "item2" },
            { id: 3, name: "item3" }]
        });

        equal(list.templates.column0({ id: 1, name: "item1" }), "item1");
        equal(list.templates.column1({ id: 2, name: "item2" }), "2");
    });

    test("each custom template is applied", function() {
        var list = new StaticList(element, {
            columns: [
                {field: "name", template: "new #: name #"},
                {field: "id"}
            ],
            dataTextField: "name",
            dataSource: [ { id: 1, name: "item1" },
            { id: 2, name: "item2" },
            { id: 3, name: "item3" }]
        });

        equal(list.templates.column0({ id: 1, name: "item1" }), "new item1");
    });

    test("setOptions re-create columns", 2, function() {
        var list = new StaticList(element, {
            columns: [
                {field: "name"}
            ],
            dataTextField: "name",
            dataSource: [ { id: 1, name: "item1" },
            { id: 2, name: "item2" },
            { id: 3, name: "item3" }]
        });

        list.dataSource.read();
        equal(element.children(":first").find("span").length, 1);
        list.setOptions({
            columns: [
                {field: "name"}, 
                {field: "id"}
            ],
        });

        equal(element.children(":first").find("span").length, 2);
    });

})();
