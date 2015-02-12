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
            template: "#:data#"
        });

        list.setDataSource(["1", "2"]);

        list.dataSource.read();

        equal(list.dataSource.view().length, 2);
    });

    test("setOptions re-create templates", function() {
        var list = new StaticList(element, {
            template: "#:data#"
        });

        list.setOptions({
            dataSource: ["item"],
            template: "new #:data#"
        });

        list.dataSource.read();

        equal(element.children(":first").html(), "new item");
    });

    //cases:
    //select by index
    //select by [indexes]
    //select by item or list of items
    //select should support different selectable options
    //
    //deselect (same as select)

    test("select an item by element", function() {
        var list = new StaticList(element, {
            template: "#:data#"
        });

        list.setOptions({
            dataSource: ["item1", "item2", "item3"],
            template: "new #:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.select(children.eq(1));


        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item k-state-focused k-state-selected");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("select an item by index", function() {
        var list = new StaticList(element, {
            template: "#:data#"
        });

        list.setOptions({
            dataSource: ["item1", "item2", "item3"],
            template: "new #:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.select(1);


        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item k-state-focused k-state-selected");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("select method deselects previous item", function() {
        var list = new StaticList(element, {
            template: "#:data#"
        });

        list.setOptions({
            dataSource: ["item1", "item2", "item3"],
            template: "new #:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.select(1);
        list.select(0);

        equal(children.eq(0).attr("class"), "k-item k-state-focused k-state-selected");
        equal(children.eq(1).attr("class"), "k-item");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("select method deselects selected items is index is -1", function() {
        var list = new StaticList(element, {
            template: "#:data#"
        });

        list.setOptions({
            dataSource: ["item1", "item2", "item3"],
            template: "new #:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.select(1);
        list.select(-1);

        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item k-state-focused");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("select method selects multiple items", function() {
        var list = new StaticList(element, {
            template: "#:data#"
        });

        list.setOptions({
            dataSource: ["item1", "item2", "item3"],
            selectable: "multiple",
            template: "new #:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.select(1);
        list.select(0);

        equal(children.eq(0).attr("class"), "k-item k-state-focused k-state-selected");
        equal(children.eq(1).attr("class"), "k-item k-state-selected");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("select method deselects item in 'multiple' mode", function() {
        var list = new StaticList(element, {
            template: "#:data#"
        });

        list.setOptions({
            dataSource: ["item1", "item2", "item3"],
            selectable: "multiple",
            template: "new #:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.select(1);
        list.select(1);

        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item k-state-focused");
        equal(children.eq(2).attr("class"), "k-item");
    });

    test("select method does nothing in 'multiple' mode if index is -1", function() {
        var list = new StaticList(element, {
            template: "#:data#"
        });

        list.setOptions({
            dataSource: ["item1", "item2", "item3"],
            selectable: "multiple",
            template: "new #:data#"
        });

        list.dataSource.read();

        var children = element.children();

        list.select(1);
        list.select(-1);

        equal(children.eq(0).attr("class"), "k-item");
        equal(children.eq(1).attr("class"), "k-item k-state-focused k-state-selected");
        equal(children.eq(2).attr("class"), "k-item");
    });
})();
