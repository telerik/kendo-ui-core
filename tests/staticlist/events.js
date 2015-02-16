(function() {
    var StaticList = kendo.ui.StaticList,
    element;

    module("kendo.ui.StaticList events", {
        setup: function() {
            kendo.ns = "kendo-";
            element = $("<ul></ul>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            element.data("kendoStaticList").destroy();

            kendo.support.touch = false;
            kendo.support.mobileOS = false;
            kendo.ns = "";
        }
    });

    test("widget triggers listBound event", 1, function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "#:data#",
            listBound: function() {
                ok(true);
            }
        });

        list.dataSource.read();
    });

    test("widget triggers change event on select", 1, function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "#:data#",
            change: function() {
                ok(true);
            }
        });

        list.dataSource.read();

        list.select(0);
    });
})();
