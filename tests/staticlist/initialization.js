(function() {
    var StaticList = kendo.ui.StaticList,
    element;

    module("kendo.ui.StaticList initialization", {
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

    test("kendoStaticList attaches a StaticList object to the target", function() {
        element.kendoStaticList({});

        ok(element.data("kendoStaticList") instanceof StaticList);
    });

    test("StaticList extends passed options", function() {
        var list = new StaticList(element, { template: "test" });

        var options = list.options;

        equal(options.template, "test");
    });

    test("StaticList adds listbox role to the element", function() {
        var list = new StaticList(element);

        equal(element.attr("role"), "listbox");
    });

    test("StaticList builds a template", function() {
        var list = new StaticList(element, {
            template: "test"
        });

        ok(list.templates.template);
    });

    test("StaticList builds a groupTemplate", function() {
        var list = new StaticList(element, {
            groupTemplate: "test"
        });

        ok(list.templates.groupTemplate);
    });

    test("StaticList builds a fixedGroupTemplate", function() {
        var list = new StaticList(element, {
            fixedGroupTemplate: "test"
        });

        ok(list.templates.fixedGroupTemplate);
    });

    test("StaticList appends fixed header element before content element", function() {
        var list = new StaticList(element, {
            fixedGroupTemplate: "test"
        });

        var header = list.content.prev();

        ok(header.hasClass("k-group-header"));
    });

    test("StaticList creates a dataSource", function() {
        var list = new StaticList(element, {
            dataSource: ["item"]
        });

        ok(list.dataSource);
    });

    test("pointer over li should add hover state", function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "#:data#"
        });

        list.dataSource.read();

        var li = list.element.children().eq(0);
        li.mouseenter();

        ok(li.hasClass("k-state-hover"));
    });

    test("leave li should remove hover state", function() {
        var list = new StaticList(element, {
            dataSource: ["item"],
            template: "#:data#"
        });

        list.dataSource.read();

        var li = list.element.children().eq(0);
        li.mouseenter();
        li.mouseleave();

        ok(!li.hasClass("k-state-hover"));
    });

    test("re-set value when add new item to the source", function() {
        var list = new StaticList(element, {
            dataSource: {
                data: [
                    { name: "item", value: 1, group: "a" },
                    { name: "item2", value: 2, group: "b" }
                ],
                group: { field: "group" }
            },
            dataValueField: "value",
            groupTemplate: "#:data#",
            template: "#:data.name#",
            value: 1
        });

        list.dataSource.read();

        list.dataSource.add({ name: "item3", value: 3, group: "" });

        equal(list.select()[0], 1);
    });

    test("update selected data item on datasource read", function() {
        var data = [
            { name: "item", value: 1, group: "a" },
            { name: "item2", value: 2, group: "b" }
        ];

        var list = new StaticList(element, {
            dataSource: {
                transport: {
                    read: function(options) {
                        options.success(data);
                    }
                }
            },
            dataValueField: "value",
            template: "#:data.name#",
            value: 1
        });

        list.dataSource.read();

        data[0].name = "Item new";

        list.dataSource.read();

        var selectedItem = list.selectedDataItems()[0];

        equal(selectedItem.name, "Item new");
    });

    test("keep value when source is filtered from outside", function() {
        var list = new StaticList(element, {
            dataSource: {
                data: [
                    { name: "item", value: 1, group: "a" },
                    { name: "item2", value: 2, group: "b" }
                ],
                group: { field: "group" }
            },
            dataValueField: "value",
            groupTemplate: "#:data#",
            template: "#:data.name#",
            value: 1
        });

        list.dataSource.read();

        list.dataSource.filter({
            field: "name",
            operator: "eq",
            value: "none"
        });

        equal(list.dataSource.view().length, 0);
        equal(list.select()[0], 0);
        equal(list.value()[0], 1);
    });
})();
