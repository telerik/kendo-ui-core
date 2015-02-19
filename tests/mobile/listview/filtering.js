(function() {
    var ListView = kendo.mobile.ui.ListView,
    application,
    listView,
    ul;

    module("mobile listview filtering", {
        setup: function() {
            var root = $("<div />").append('<div data-role="view"><ul/></div>');
            $("#qunit-fixture").html(root);
            ul = root.find('ul');
            application = new kendo.mobile.Application(root);
        },
        teardown: function() {
            application.destroy();
            $("#qunit-fixture").empty();
            kendo.history.stop();
        }
    });

    function filterableListview(options) {
        options = $.extend(true, {}, { filterable: true }, options);

        return new ListView(ul, options);
    }

    test("clears input when filters are removed", function() {
            var listview = filterableListview({
                dataSource: {
                    data: ["foo", "bar"]
                }
            }),
            input = listview.wrapper.find("input");
            input.val("foo");
            listview.dataSource.filter({});
            equal(input.val().length, 0);
     });


    test("filterable creates search input", function() {
        var listview = filterableListview();

        ok(listview.wrapper.children().first().is("form"));
        equal(listview.wrapper.find(">form [type=search]").length, 1);
    });

    test("disabled filtering does not create search form", function() {
        var listview = filterableListview({ filterable: false });

        equal(listview.wrapper.children()[0], listview.element[0]);
        equal(listview.wrapper.find(">form").length, 0);
    });

    test("filterable input default placeholder text", function() {
        var listview = filterableListview();

        var input = listview.wrapper.find("input");

        ok(input.attr("placeholder"));
    });

    test("filterable input placeholder", function() {
        var listview = filterableListview({
            filterable: {
                placeholder: "foo"
            }
        });

        var input = listview.wrapper.find("input");

        equal(input.attr("placeholder"), "foo");
    });

    test("dataSource is filtered on keyup", function() {
        var listview = filterableListview(),
        input = listview.wrapper.find("input");

        var filter = stub(listview.dataSource, "filter");

        input.val("foo").trigger({ type: "keyup" });

        equal(filter.calls("filter"), 1);
        ok(filter.args("filter", 0)[0]);
    });

    test("dataSource is filtered on change", function() {
        var listview = filterableListview(),
        input = listview.wrapper.find("input");

        var filter = stub(listview.dataSource, "filter");

        input.val("foo").trigger({ type: "change" });

        equal(filter.calls("filter"), 1);
        ok(filter.args("filter", 0)[0]);
    });

    test("does not filter if value is the same", function() {
        var listview = filterableListview(),
        input = listview.wrapper.find("input");

        var filter = stub(listview.dataSource, "filter");

        input.val("foo").trigger({ type: "keyup" }).trigger({ type: "keyup" });

        equal(filter.calls("filter"), 1);
        ok(filter.args("filter", 0)[0]);
    });

    test("clear the text resets the filter", function() {
        var listview = filterableListview(),
        input = listview.wrapper.find("input");

        var filter = stub(listview.dataSource, "filter");

        input.val("foo").trigger({ type: "keyup" });
        input.val("").trigger({ type: "keyup" });

        equal(filter.calls("filter"), 2);
        equal(filter.args("filter", 1)[0], null);
    });

    test("default filter expression is build", function() {
        var listview = filterableListview(),
        input = listview.wrapper.find("input");

        var filter = stub(listview.dataSource, "filter");

        input.val("foo").trigger({ type: "change" });

        var expr = filter.args("filter", 0)[0];
        equal(expr.field, undefined);
        equal(expr.operator, "startswith");
        equal(expr.value, "foo");
    });

    test("field option is used for the filter rexpression", function() {
        var listview = filterableListview({
            filterable: {
                field: "field"
            }
        }),
        input = listview.wrapper.find("input");

        var filter = stub(listview.dataSource, "filter");

        input.val("foo").trigger({ type: "change" });

        var descriptor = filter.args("filter", 0)[0];
        equal(descriptor.field, "field");
    });

    test("operator option is used for the filter expression", function() {
        var listview = filterableListview({
            filterable: {
                operator: "eq"
            }
        }),
        input = listview.wrapper.find("input");

        var filter = stub(listview.dataSource, "filter");

        input.val("foo").trigger({ type: "change" });

        var descriptor = filter.args("filter", 0)[0];
        equal(descriptor.operator, "eq");
    });

    test("ignoreCase option is used for the filter expression", function() {
        var listview = filterableListview({
            filterable: {
                ignoreCase: false
            }
        }),
        input = listview.wrapper.find("input");

        var filter = stub(listview.dataSource, "filter");

        input.val("foo").trigger({ type: "change" });

        var descriptor = filter.args("filter", 0)[0];
        equal(descriptor.ignoreCase, false);
    });

    test("disabling auto filter", function() {
        var listview = filterableListview({
            filterable: {
                autoFilter: false
            }
        }),
        input = listview.wrapper.find("input");

        var filter = stub(listview.dataSource, "filter");

        input.trigger({ type: "keyup" });

        equal(filter.calls("filter"), 0);
    });

    test("clear button resets the filter", function() {
        var listview = filterableListview({
            dataSource: {
                data: ["foo", "bar"]
            }
        });

        listview.dataSource.filter({ operator: "eq", value: "foo" });
        listview.wrapper.find(".km-filter-reset").click();

        equal(listview.dataSource.filter(), undefined);
        equal(listview.element.find("li").length, 2);
    });

    test("clear button clears search input text", function() {
        var listview = filterableListview({
            dataSource: {
                data: ["foo", "bar"]
            }
        }),
        button = listview.wrapper.find(".km-filter-reset"),
        input = listview.wrapper.find("input");

        input.val("foo").trigger({ type: "keyup" });
        button.click();

        equal(input.val(), "");
        equal(button.is(":visible"), false);
    });

    test("clear button initially hidden", function() {
        var listview = filterableListview();

        var button = listview.wrapper.find(".km-filter-reset");

        equal(button.is(":visible"), false);
    });

    test("clear button shows when typing", function() {
        var listview = filterableListview(),
        button = listview.wrapper.find(".km-filter-reset"),
        input = listview.wrapper.find("input");

        input.val("foo").trigger({ type: "keyup" });

        equal(button.css("display"), "inline-block");
    });

    test("clear button hides when text is empty", function() {
        var listview = filterableListview(),
        button = listview.wrapper.find(".km-filter-reset"),
        input = listview.wrapper.find("input");

        input.val("foo").trigger({ type: "keyup" });
        input.val("").trigger({ type: "keyup" });

        equal(button.is(":visible"), false);
    });

    test("filtering ignores append on refresh", function() {
        var listview = filterableListview({
            pullToRefresh: true,
            appendOnRefresh: true,
            filterable: true,
            dataSource: {
                data: ["foo", "bar"]
            }
        });

        listview.wrapper.find("input").val("foo").trigger({ type: "change" });

        equal(listview.items().length, 1);
    });

    test("clear filter ignores append on refresh", function() {
        var listview = filterableListview({
            pullToRefresh: true,
            appendOnRefresh: true,
            filterable: true,
            dataSource: {
                data: ["foo", "bar"],
                filter: {
                    value: "foo"
                }
            }
        });

        listview.wrapper.find(".km-filter-reset").click();

        equal(listview.items().length, 2);
    });

})();
