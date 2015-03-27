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

    test("StaticList sets overflow style to the element", function() {
        var list = new StaticList(element);

        equal(element.css("overflow"), "auto");
    });

    test("StaticList sets overflow style to the element", function() {
        var list = new StaticList(element);

        equal(element.css("overflow"), "auto");
    });

    test("StaticList sets overflow style to the element", function() {
        var list = new StaticList(element);

        equal(element.css("overflow"), "auto");
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

    test("StaticList appends fixed header element before element", function() {
        var list = new StaticList(element, {
            fixedGroupTemplate: "test"
        });

        var header = element.prev();

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
})();
