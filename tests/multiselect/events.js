(function() {
    var MultiSelect = kendo.ui.MultiSelect,
        select;

    function populateSelect(length) {
        var options = [];
        length = length || 5;
        for (var i=0; i < length; i++) {
            options.push("<option value='" + i + "'>Option" + i + "</option>");
        }

        select.html(options);
    }

    module("kendo.ui.MultiSelect Events", {
        setup: function() {
            kendo.ns = "kendo-";
            select = $("<select multiple/>").appendTo(QUnit.fixture);
            populateSelect();
        },
        teardown: function() {
            kendo.ns = "";
            if (select.data("kendoMultiSelect")) {
                select.data("kendoMultiSelect").destroy();
            }

            select.parents(".k-widget").remove();
        }
    });

    test("MultiSelect triggers open event", 1, function() {
        var multiselect = new MultiSelect(select, {
            open: function() {
                ok(true);
            }
        });

        multiselect.open();
    });

    test("MultiSelect triggers close event", 1, function() {
        var multiselect = new MultiSelect(select, {
            close: function() {
                ok(true);
            }
        });

        multiselect.open();
        multiselect.close();
    });

    test("MultiSelect triggers dataBound event on refresh", 1, function() {
        var multiselect = new MultiSelect(select, {
            dataBound: function() {
                ok(true);
            }
        });
    });

    test("MultiSelect raises change event on click", 1, function() {
        var multiselect = new MultiSelect(select, {
            change: function() {
                ok(true);
            }
        });

        multiselect.open();
        multiselect.ul.children().first().click();
    });

    test("MultiSelect raises change event on enter", 1, function() {
        var multiselect = new MultiSelect(select, {
            change: function() {
                ok(true);
            }
        });

        multiselect.open();
        multiselect.input.trigger({
            type: "keydown",
            keyCode: kendo.keys.ENTER
        });
    });

    test("MultiSelect raises change event delete", 2, function() {
        var multiselect = new MultiSelect(select, {
            change: function() {
                ok(true);
            },
            value: ["1", "2"]
        });

        multiselect.input.focus().trigger({
            type: "keydown",
            keyCode: kendo.keys.BACKSPACE
        });

        multiselect.input.focus().trigger({
            type: "keydown",
            keyCode: kendo.keys.BACKSPACE
        });
    });

    test("MultiSelect raises change event on delete button", 1, function() {
        var multiselect = new MultiSelect(select, {
            change: function() {
                ok(true);
            },
            value: ["1", "2"]
        });

        multiselect.tagList.find(".k-delete").first().click();
    });

    test("MultiSelect raises select event", 1, function() {
        var multiselect = new MultiSelect(select, {
            select: function() {
                ok(true);
            }
        });

        multiselect.open();
        multiselect.ul.children().first().click();
    });

    test("MultiSelect raises select event on ENTER", 1, function() {
        var multiselect = new MultiSelect(select, {
            select: function() {
                ok(true);
            }
        });

        multiselect.open();
        multiselect.input.trigger({
            type: "keydown",
            keyCode: kendo.keys.DOWN
        });
        multiselect.input.trigger({
            type: "keydown",
            keyCode: kendo.keys.ENTER
        });
    });

    test("MultiSelect does not raise change event when set value using value method", 0, function() {
        var multiselect = new MultiSelect(select, {
            change: function() {
                ok(false);
            }
        });

        multiselect.value(["1","2"]);

        //simulate change
        multiselect._change();
    });

    asyncTest("MultiSelect triggers filtering event on data source filter", 3, function() {
        var multiselect = new MultiSelect(select, {
            delay: 0,
            dataSource: ["foo", "bar"],
            filter: "contains",
            filtering: function(e) {
                start();

                var filter = e.filter;

                equal(filter.field, "");
                equal(filter.operator, "contains");
                equal(filter.value, "baz");
            }
        });

        multiselect.input.focus().val("baz").keydown();
    });

    asyncTest("modifying filter expression in filtering event changes datasource result", 2, function() {
        var multiselect = new MultiSelect(select, {
            delay: 0,
            dataSource: ["foo", "bar"],
            filter: "contains",
            filtering: function(e) {
                e.filter.value = "foo";
            }
        });

        multiselect.input.focus().val("baz").keydown();

        setTimeout(function() {
            start();
            var data = multiselect.dataSource.view();

            equal(data.length, 1);
            equal(data[0], "foo");
        });
    });

    asyncTest("MultiSelect filtering event can be prevented", 1, function() {
        var multiselect = new MultiSelect(select, {
            delay: 0,
            dataSource: ["foo", "bar"],
            filter: "contains",
            filtering: function(e) {
                e.preventDefault();
            }
        });

        multiselect.dataSource.bind("change", function() {
            ok(false);
        });

        multiselect.input.focus().val("baz").keydown();

        setTimeout(function() {
            start();
            ok(true);
        });
    });

    asyncTest("MultiSelect triggers filtering when filter is cleared", 1, function() {
        var multiselect = new MultiSelect(select, {
            delay: 0,
            dataSource: ["foo", "bar"],
            filter: "contains"
        });

        multiselect.dataSource.one("change", function() {
            multiselect.bind("filtering", function(e) {
                start();
                equal(e.filter, undefined);
            });

            multiselect.ul.children("li").first().click();
            multiselect.open();
        });

        multiselect.input.focus().val("bar").keydown();
    });
})();
