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
            kendo.ns = "";
        }
    });

    function getData(count) {


    }

    test("setDataSource method overrides current data source", function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "<li>#:data#</li>"
        });

        list.setDataSource(["1", "2"]);

        list.dataSource.read();

        equal(list.dataSource.view().length, 2);
    });

    test("setOptions re-create templates", function() {
        var list = new StaticList(element, {
            template: "<li>#:data#</li>"
        });

        list.setOptions({
            dataSource: ["item"],
            template: "<li>new #:data#</li>"
        });

        list.dataSource.read();

        equal(element.html(), "<li>new item</li>");
    });
})();
