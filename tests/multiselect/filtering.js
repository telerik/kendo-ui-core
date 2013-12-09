(function() {
    var MultiSelect = kendo.ui.MultiSelect,
        select;

    function popuplateSelect() {
        var options = [];
        for (var i=0; i < 5; i++) {
            options.push("<option value='" + i + "'>Option" + i + "</option>");
        }

        select.html(options);
    }

    module("kendo.ui.MultiSelect filtering", {
        setup: function() {
            $.fn.press = function(character) {
                var keyCode = character.charCodeAt(0);
                $(this).trigger({
                    type: "keydown",
                    keyCode: keyCode
                });
            }

            kendo.ns = "kendo-";
            select = $("<select multiple=multiple/>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.ns = "";
            if (select.data("kendoMultiSelect")) {
                select.data("kendoMultiSelect").destroy();
            }

            select.parents(".k-widget").remove();
        }
    });

    asyncTest("MultiSelect filters items on keydown", 1, function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select, {
            delay: 0
        });

        multiselect.input.val("Option1").press("1");

        setTimeout(function() {
            start();
            equal(multiselect.ul.children().length, 1);
        });
    });

    test("MultiSelect filters data on rebind depending on the selected items", function() {
        popuplateSelect();

        var multiselect = new MultiSelect(select, {
            delay: 0
        });

        multiselect.search("Option1");
        multiselect.ul.children().first().click();

        multiselect.open();

        ok(!multiselect.ul.children().eq(1).is(":visible"));
    });

    test("MultiSelect filters data using selected items too", function() {
        popuplateSelect();

        var multiselect = new MultiSelect(select, {
            delay: 0
        });

        multiselect.ul.children().first().click();
        multiselect.search("Option1");
        multiselect.ul.children().first().click();

        multiselect.input.click();

        ok(!multiselect.ul.children().eq(0).is(":visible"));
        ok(!multiselect.ul.children().eq(1).is(":visible"));

        ok(select[0].children[0].selected);
        ok(select[0].children[1].selected);
    });

    test("MultiSelect filters data and hides already clicked items", function() {
        popuplateSelect();

        var multiselect = new MultiSelect(select, {
            delay: 0
        });

        multiselect.value(["0", "1"]);
        multiselect.search("Opt");

        var children = multiselect.ul.children();

        equal(children.length, multiselect.dataSource.view().length);
        ok(!children.eq(0).is(":visible"));
        ok(!children.eq(1).is(":visible"));
    });

    test("MultiSelect hides popup if no data", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select);

        multiselect.wrapper.click();
        multiselect.search("no such item");

        ok(!multiselect.popup.visible());
    });

    test("MultiSelect do not show initial values on rebind", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select, { delay: 0, value: ["1", "2"] });

        multiselect.search("Option0");
        multiselect.ul.children().first().click();
        multiselect.value(null);

        multiselect.open();

        equal(multiselect.value().length, 0);
        equal(multiselect.element.val(), null);
    });
})();
