(function() {
    var MultiSelect = kendo.ui.MultiSelect,
        select;

    function populateSelect() {
        var options = [];
        for (var i=0; i < 5; i++) {
            options.push("<option value='" + i + "'>Option" + i + "</option>");
        }

        select.html(options);
    }

    module("kendo.ui.MultiSelect Placeholder", {
        setup: function() {
            kendo.ns = "kendo-";
            select = $("<select multiple />").appendTo(QUnit.fixture);
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

    test("MultiSelect gets placeholder from data-placeholder attr", function() {
        var multiselect = new MultiSelect(select.data("placeholder", "Select..."));

        equal(multiselect.options.placeholder, "Select...");
    });

    test("MultiSelect shows placeholder on init", function() {
        var multiselect = new MultiSelect(select.data("placeholder", "Select..."));
        equal(multiselect.input.val(), "Select...");
        ok(multiselect.input.hasClass("k-readonly"));
    });

    test("MultiSelect scales input on placeholder shows", function() {
        var multiselect = new MultiSelect(select.data("placeholder", "Select..."));

        ok(multiselect.input.width() > 35);
    });

    test("MultiSelect hides placeholder if any value", function() {
        var multiselect = new MultiSelect(select.val("0").data("placeholder", "Select..."));

        equal(multiselect.input.val(), "");
        ok(!multiselect.input.hasClass("k-readonly"));
    });

    test("MultiSelect hides placeholder if any item is selected", function() {
        var multiselect = new MultiSelect(select.data("placeholder", "Select..."));

        multiselect.ul.children().first().click();

        equal(multiselect.input.val(), "");
        ok(!multiselect.input.hasClass("k-readonly"));
    });

    test("MultiSelect does not show placeholder if items are deleted", function() {
        var multiselect = new MultiSelect(select.val("0").data("placeholder", "Select..."));

        multiselect.input.focus().trigger({
            type: "keydown",
            keyCode: kendo.keys.BACKSPACE
        });

        equal(multiselect.input.val(), "");
        ok(!multiselect.input.hasClass("k-readonly"));
    });

    test("MultiSelect hides placeholder on focus", function() {
        var multiselect = new MultiSelect(select.data("placeholder", "Select..."));

        multiselect.input.focus();

        equal(multiselect.input.val(), "");
        ok(!multiselect.input.hasClass("k-readonly"));
    });

    test("MultiSelect shows placeholder on focus", function() {
        var multiselect = new MultiSelect(select.data("placeholder", "Select..."));

        multiselect.input.blur();

        equal(multiselect.input.val(), "Select...");
        ok(multiselect.input.hasClass("k-readonly"));
    });

})();
