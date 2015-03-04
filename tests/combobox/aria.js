(function() {

var ComboBox = kendo.ui.ComboBox,
    input;

module("kendo.ui.ComboBox ARIA", {
    setup: function() {
        kendo.effects.disable();
        input = $("<input />").appendTo(QUnit.fixture);
    },
    teardown: function() {
        kendo.effects.enable();
        input.data("kendoComboBox").destroy();
        kendo.destroy(QUnit.fixture);
    }
});

test("ComboBox adds role to the input", function() {
    var combobox = new ComboBox(input);

    equal(combobox.input[0].getAttribute("role"), "combobox");
});

test("ComboBox adds aria-autocomplete='list'", function() {
    var combobox = new ComboBox(input);

    equal(combobox.input.attr("aria-autocomplete"), "list");
});

test("ComboBox adds aria-autocomplete='both' if suggestion is enabled", function() {
    var combobox = new ComboBox(input, {
        suggest: true
    });

    equal(combobox.input.attr("aria-autocomplete"), "both");
});

test("ComboBox adds aria-owns", function() {
    var combobox = new ComboBox(input.attr("id", "test"));

    equal(combobox.input.attr("aria-owns"), combobox.ul.attr("id"));
});

test("ComboBox adds aria-activedescentant", function() {
    var combobox = new ComboBox(input.attr("id", "test"), {
        dataSource: ["Item1", "Item2"],
        value: "Item2"
    });

    equal(combobox.selectedIndex, 1);
    equal(combobox.ul.children().eq(0).attr("id"), undefined);
    equal(combobox.input.attr("aria-activedescendant"), combobox.ul.children().eq(1).attr("id"));
});

test("ComboBox adds aria-disabled='true'", function() {
    var combobox = new ComboBox(input.attr("disabled", "disabled"));

    equal(combobox.input.attr("aria-disabled"), "true");
});

test("ComboBox adds aria-disabled='false'", function() {
    var combobox = new ComboBox(input);

    equal(combobox.input.attr("aria-disabled"), "false");
});

test("ComboBox adds aria-expanded='false'", function() {
    var combobox = new ComboBox(input);

    equal(combobox.input.attr("aria-expanded"), "false");
});

test("ComboBox adds aria-expanded='true'", function() {
    var combobox = new ComboBox(input, {
        dataSource: ["item1", "item2"]
    });

    combobox.open();

    equal(combobox.input.attr("aria-expanded"), "true");
});

test("ComboBox sets aria-expanded to false on close", function() {
    var combobox = new ComboBox(input, {
        dataSource: ["item1", "item2"]
    });

    combobox.open();
    combobox.close();

    ok(!combobox.popup.visible());
    equal(combobox.input.attr("aria-expanded"), "false");
});

test("ComboBox makes down arrow ARIA accessible", function() {
    var combobox = new ComboBox(input);

    equal(combobox._arrow.attr("role"), "button");
    equal(combobox._arrow.attr("tabindex"), "-1");
    equal(combobox._arrow.attr("aria-controls"), undefined);
});

test("ComboBox adds role='listbox' to list element", function() {
    var combobox = new ComboBox(input);

    equal(combobox.ul.attr("role"), "listbox");
});

test("ComboBox adds role to the popup element", function() {
    var combobox = new ComboBox(input);

    equal(combobox.ul.attr("role"), "listbox");
});

test("ComboBox adds aria-hidden to the popup element", 3, function() {
    var combobox = new ComboBox(input, {
        dataSource: ["item1", "item2"]
    });

    equal(combobox.ul.attr("aria-hidden"), "true");

    combobox.open();

    equal(combobox.ul.attr("aria-hidden"), "false");

    combobox.close();

    equal(combobox.ul.attr("aria-hidden"), "true");
});

test("ComboBox adds aria-live=off if no filter", function() {
     var combobox = new ComboBox(input, {
        dataSource: ["item1", "item2"]
    });

    equal(combobox.ul.attr("aria-live"), "off");
});

test("ComboBox adds aria-live=polite if filter is set", function() {
    var combobox = new ComboBox(input, {
        dataSource: ["item1", "item2"],
        filter: "startswith"
    });

    equal(combobox.ul.attr("aria-live"), "polite");
});

asyncTest("ComboBox adds aria-busy=true when loader is shown", 1, function() {
    var combobox = new ComboBox(input, {
        dataSource: ["item1", "item2"],
        filter: "startswith"
    });

    combobox._showBusy();

    setTimeout(function() {
        start();
        equal(combobox.input.attr("aria-busy"), "true");
    }, 150);
});

test("ComboBox adds aria-busy=false when loader is hidden", 1, function() {
    var combobox = new ComboBox(input, {
        dataSource: ["item1", "item2"],
        filter: "startswith"
    });

    combobox._hideBusy();
    equal(combobox.input.attr("aria-busy"), "false");
});

test("ComboBox does not have aria-activedescendant if no item is selected on load", function() {
    var combobox = new ComboBox(input.attr("id", "test"), {
        highlightFirst: false,
        dataSource: ["item1", "item2"],
        filter: "startswith"
    });

    equal(combobox.selectedIndex, -1);
    equal(combobox.input.attr("aria-activedescendant"), undefined);
});

test("ComboBox remove aria-activedescendant if no item is selected", function() {
    var combobox = new ComboBox(input.attr("id", "test"), {
        highlightFirst: true,
        dataSource: ["item1", "item2"],
        filter: "startswith",
        value: "item1"
    });

    combobox.value("");
    equal(combobox.selectedIndex, -1);
    equal(combobox.input.attr("aria-activedescendant"), undefined);
});

test("ComboBox adds aria-selected to the selected item", function() {
    var combobox = new ComboBox(input.attr("id", "test"), {
        highlightFirst: true,
        dataSource: ["item1", "item2"],
        filter: "startswith",
        value: "item1"
    });

    equal(combobox.current().attr("aria-selected"), "true");
});

test("ComboBox removes aria-selected from unselected item", function() {
    var combobox = new ComboBox(input.attr("id", "test"), {
        highlightFirst: true,
        dataSource: ["item1", "item2"],
        filter: "startswith",
        value: "item1"
    });

    combobox.value("");

    ok(!combobox.ul.children("[aria-selected=true]")[0]);
});

})();
