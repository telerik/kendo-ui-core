(function() {
    var StaticList = kendo.ui.StaticList,
    element;

    module("kendo.ui.StaticList rendering", {
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

    test("kendoStaticList renders data source items using template", function() {
        var list = new StaticList(element, {
            dataSource: ["foo"],
            template: "#:data#"
        });

        list.dataSource.read();

        equal(element.html(), '<li tabindex="-1" role="option" unselectable="on" class="k-item">foo</li>');
    });
    return;

    test("kendoStaticList renders a CSS class if item is selected", function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            value: ["item"],
            template: '#:data#'
        });

        list.dataSource.read();

        equal(element.html(), '<li class="k-state-selected">item</li>');
    });

})();
