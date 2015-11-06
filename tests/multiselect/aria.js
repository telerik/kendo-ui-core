(function() {
    var MultiSelect = kendo.ui.MultiSelect,
        input;

    module("kendo.ui.MultiSelect ARIA", {
        setup: function() {
            kendo.effects.disable();
            kendo.ns = "kendo-";
            input = $("<select multiple />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.effects.enable();
            kendo.ns = "";
            if (input.data("kendoMultiSelect")) {
                input.data("kendoMultiSelect").destroy();
            }
        }
    });

    test("MultiSelect adds role to the input", function() {
        var multiselect = new MultiSelect(input);

        equal(multiselect.input[0].getAttribute("role"), "listbox");
    });

    test("MultiSelect adds aria-owns", function() {
        var multiselect = new MultiSelect(input.attr("id", "test"));
        var id = multiselect.tagList.attr("id") + " " + multiselect.ul.attr("id");

        equal(multiselect.input.attr("aria-owns"), id);
    });

    test("MultiSelect adds aria-disabled='true'", function() {
        var multiselect = new MultiSelect(input.attr("disabled", "disabled"));

        equal(multiselect.input.attr("aria-disabled"), "true");
    });

    test("MultiSelect adds aria-disabled='false'", function() {
        var multiselect = new MultiSelect(input);

        equal(multiselect.input.attr("aria-disabled"), "false");
    });

    test("MultiSelect adds aria-expanded='false'", function() {
        var multiselect = new MultiSelect(input);

        equal(multiselect.input.attr("aria-expanded"), "false");
    });

    test("MultiSelect adds aria-expanded='true'", function() {
        var multiselect = new MultiSelect(input, {
            dataSource: ["item1", "item2"]
        });

        multiselect.open();

        equal(multiselect.input.attr("aria-expanded"), "true");
    });

    test("MultiSelect sets aria-expanded to false on close", function() {
        var multiselect = new MultiSelect(input, {
            dataSource: ["item1", "item2"]
        });

        multiselect.open();
        multiselect.close();

        ok(!multiselect.popup.visible());
        equal(multiselect.input.attr("aria-expanded"), "false");
    });

    test("MultiSelect adds aria-hidden to the popup element", 3, function() {
        var multiselect = new MultiSelect(input, {
            dataSource: ["item1", "item2"]
        });

        equal(multiselect.ul.attr("aria-hidden"), "true");

        multiselect.open();

        equal(multiselect.ul.attr("aria-hidden"), "false");

        multiselect.close();

        equal(multiselect.ul.attr("aria-hidden"), "true");
    });

    test("MultiSelect adds aria-live=polite if filter is set", function() {
        var multiselect = new MultiSelect(input, {
            dataSource: ["item1", "item2"],
            filter: "startswith"
        });

        equal(multiselect.ul.attr("aria-live"), "polite");
    });

    test("MultiSelect calls progress handler when loader is shown",  function() {
        var multiselect = new MultiSelect(input, {
            filter: "startswith"
        });

        multiselect._showBusy  = function() { ok(true); };
        multiselect.setDataSource(["item1", "item2"]);
        multiselect.dataSource.trigger("progress");
    });

    test("MultiSelect adds aria-busy=true when loader is shown",  function() {
        var multiselect = new MultiSelect(input, {
            dataSource: ["item1", "item2"],
            filter: "startswith"
        });

        multiselect._showBusyHandler();
        equal(multiselect.input.attr("aria-busy"), "true");
    });

    test("MultiSelect adds aria-busy=false when loader is hidden", 1, function() {
        var multiselect = new MultiSelect(input, {
            dataSource: ["item1", "item2"],
            filter: "startswith"
        });

        multiselect._hideBusy();
        equal(multiselect.input.attr("aria-busy"), "false");
    });

    test("MultiSelect sets activedescendant on refresh", function() {
        var multiselect = new MultiSelect(input.attr("id", "test"), {
            highlightFirst: false,
            dataSource: ["item1", "item2"],
            filter: "startswith"
        });

        ok(!multiselect.input.attr("aria-activedescendant"));
    });

    test("MultiSelect makes first item active on open", function() {
        var multiselect = new MultiSelect(input.attr("id", "test"), {
            dataSource: ["item1", "item2"],
            value: "item1"
        });

        multiselect.open();
        equal(multiselect.input.attr("aria-activedescendant"), multiselect.current().attr("id"));
    });

    test("MultiSelect persists aria-activedescendant on close", function() {
        var multiselect = new MultiSelect(input.attr("id", "test"), {
            dataSource: ["item1", "item2"],
            value: "item1"
        });

        multiselect.open();
        multiselect.close();
        ok(multiselect.input.attr("aria-activedescendant"));
    });

    test("MultiSelect sets aria-activedescendant attr to the last li of tagList", function() {
        var multiselect = new MultiSelect(input.attr("id", "test"), {
            dataSource: ["item1", "item2"],
            value: "item1"
        });

        multiselect.input.focus().trigger({
            type: "keydown",
            keyCode: kendo.keys.LEFT
        });

        ok(multiselect.currentTag().attr("id"));
        equal(multiselect.input.attr("aria-activedescendant"), multiselect.currentTag().attr("id"));
    });
})();
