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

module("kendo.ui.MultiSelect interaction", {
    setup: function() {
        kendo.effects.disable();
        select = $("<select multiple=multiple/>").appendTo(QUnit.fixture);
    },
    teardown: function() {
        kendo.effects.enable();
        select.data("kendoMultiSelect").destroy();
    }
});

test("MultiSelect opens popup on input click", function() {
    populateSelect();
    var multiselect = new MultiSelect(select);

    multiselect.input.mousedown();

    ok(multiselect.popup.visible());
});

test("MultiSelect focuses input on click", function() {
    populateSelect();
    var multiselect = new MultiSelect(select);

    multiselect.wrapper.mousedown();

    equal(multiselect.input[0], document.activeElement);
});

test("MultiSelect focuses input on touchend", function() {
    populateSelect();
    var multiselect = new MultiSelect(select);

    multiselect.wrapper.trigger({
        type: "touchend"
    });

    equal(multiselect.input[0], document.activeElement);
});

test("MultiSelect opens popup on tag click", function() {
    populateSelect();
    select.val("0");

    var multiselect = new MultiSelect(select);

    multiselect.tagList.children().first().mousedown();

    ok(multiselect.popup.visible());
});

test("MultiSelect do not open on tag delete", function() {
    populateSelect();
    select.val("0");

    var multiselect = new MultiSelect(select);

    multiselect.tagList.find(".k-i-close").click();

    ok(!multiselect.popup.visible());
});

test("MultiSelect do not focus on delete", function() {
    populateSelect();
    select.val("0");

    var multiselect = new MultiSelect(select);

    multiselect.tagList.find(".k-i-close").mousedown();

    notEqual(multiselect.input[0], document.activeElement);
});

test("MultiSelect selects item on click", function() {
    populateSelect();
    var multiselect = new MultiSelect(select);
    multiselect.input.mousedown();

    multiselect.ul.children().eq(1).click();

    ok(multiselect.tagList.children(":first")[0]);
});

test("MultiSelect hides popup on click", function() {
    populateSelect();
    var multiselect = new MultiSelect(select);
    multiselect.input.mousedown();

    var item = multiselect.ul.children().eq(1);

    item.click();

    ok(!multiselect.popup.visible());
});

test("MultiSelect deletes tag on delete button click", function() {
    populateSelect();

    var multiselect = new MultiSelect(select);
    multiselect.input.mousedown();

    var item = multiselect.ul.children().eq(1).click();
    multiselect.ul.children().eq(0).click();

    var tag = multiselect.tagList.children().first();
    tag.find(".k-i-close").click();

    ok(!tag.parent()[0]);
});

test("MultiSelect shows clicked item on delete", function() {
    populateSelect();

    var multiselect = new MultiSelect(select);
    multiselect.input.mousedown();

    var item = multiselect.ul.children().eq(1).click();
    multiselect.ul.children().eq(0).click();

    multiselect.tagList.children().first().find(".k-i-close").click();
    multiselect.popup.open();

    notEqual(item[0].style.display, "none");
});

module("kendo.ui.MultiSelect selection", {
    setup: function() {
        kendo.effects.disable();
        select = $("<select multiple=multiple />").appendTo(QUnit.fixture);
    },
    teardown: function() {
        kendo.effects.enable();
        select.data("kendoMultiSelect").destroy();
    }
});

test("MultiSelect selects corresponding option", function() {
    populateSelect();

    var multiselect = new MultiSelect(select);

    multiselect.input.mousedown();
    multiselect.ul.children().eq(1).click();

    ok(select[0].children[1].selected);
});

test("MultiSelect unselects option", function() {
    populateSelect();

    var multiselect = new MultiSelect(select);
    multiselect.input.mousedown();
    multiselect.ul.children().eq(1).click();

    multiselect.tagList.children().first().find(".k-i-close").click();

    ok(!select[0].children[1].selected);
});

test("MultiSelect persists selected data items", function() {
    populateSelect();

    var multiselect = new MultiSelect(select);

    multiselect.input.mousedown();
    multiselect.ul.children().eq(1).click();

    //TODO: use method instead of _dataItems
    equal(multiselect.dataItems().length, 1);
});

test("MultiSelect removes corresponding data item", function() {
    populateSelect();

    var multiselect = new MultiSelect(select);

    multiselect.input.mousedown();
    multiselect.ul.children().eq(1).click();
    multiselect.ul.children().eq(0).click();

    //unselect item
    multiselect.tagList.children().first().find(".k-i-close").click();

    //TODO: use method instead of _dataItems
    equal(multiselect.dataItems().length, 1);
    equal(multiselect.dataItems()[0].value, 0);
});

test("MultiSelect clears input on selection", function() {
    populateSelect();

    var multiselect = new MultiSelect(select);

    multiselect.input.mousedown().val("option");
    multiselect.search("option");

    multiselect.ul.children().eq(0).click();

    equal(multiselect.input.val(), "");
});

test("MultiSelect clears input on blur", function() {
    var multiselect = new MultiSelect(select);

    multiselect.input.focus().val("test").focusout();

    equal(multiselect.input.val(), "");
});

test("MultiSelect shows all available items if input is cleared", function() {
    populateSelect();
    var multiselect = new MultiSelect(select);

    multiselect.input.focus().val("nothing");
    multiselect.search("nothing");

    multiselect.input.focusout();

    multiselect.open();

    equal(multiselect.ul.children().length, 5);
});

test("MultiSelect focuses input on click", function() {
    populateSelect();
    var multiselect = new MultiSelect(select);

    multiselect.wrapper.mousedown();

    equal(multiselect.input[0], document.activeElement);
});

test("MultiSelect focuses input on click", function() {
    populateSelect();
    var multiselect = new MultiSelect(select);

    multiselect.input.mousedown();
    multiselect.ul.children().eq(1).click();
    multiselect.ul.children().eq(0).click();
    multiselect.open();

    multiselect.tagList.children().first().find(".k-i-close").click();

    ok(!multiselect.popup.visible());
});

test("MultiSelect selects all selected options after filtering", function() {
    populateSelect();
    var multiselect = new MultiSelect(select);

    multiselect.input.mousedown();
    multiselect.ul.children().eq(0).click();
    multiselect.ul.children().eq(1).click();

    multiselect.input.mousedown();
    multiselect.search("Option4");

    multiselect.ul.children().eq(0).click();

    var options = select[0].children;

    equal(options.length, 3);
    ok(options[0].selected);
    ok(options[1].selected);
    ok(options[2].selected);
});

test("MultiSelect highlights first item on refresh", function() {
    populateSelect();
    var multiselect = new MultiSelect(select);

    multiselect.open();
    multiselect.refresh();

    ok(multiselect.current().parent()[0]);
});

test("MultiSelect unselects custom option", function() {
    var data = [
        ["item1", "item2"],
        ["item3", "item4"]
    ];

    var multiselect = new MultiSelect(select, {
        dataSource: {
            transport: {
                read: function(options) {
                    options.success(data.shift());
                }
            },
            serverFiltering: true
        },
        value: ["item1", "item2"]
    });

    multiselect.dataSource.filter({ value: "3", operator: "contains", field: "text" });

    multiselect.ul.children().eq(0).click();
    multiselect.tagList.children().first().find(".k-i-close").click();

    ok(select[0].children[0].selected); //item3
    ok(!select[0].children[1].selected); //item4
    ok(!select[0].children[2].selected); //item1
    ok(select[0].children[3].selected); //item2
});

test("MultiSelect removed custom option is not selected on list rebind", function() {
    var multiselect = new MultiSelect(select, {
        dataValueField: "value",
        dataTextField: "text",
        dataSource: [
            { text: "item1", value: "1" },
            { text: "item2", value: "2" }
        ],
        value: ["1", "2"]
    });

    multiselect.open();
    multiselect.dataSource.filter({
        field: "text",
        operator: "eq",
        value: "item1"
    });

    multiselect.ul.children().eq(0).click();
    multiselect.dataSource.filter({});

    var li = multiselect.ul.find(".k-state-selected");

    equal(li.length, 1);
    equal(li.text(), "item2");
});

test("MultiSelect removes value matching custom option", function() {
    var data = [
        ["item1", "item2"],
        ["item3", "item4"]
    ];

    var multiselect = new MultiSelect(select, {
        dataSource: {
            transport: {
                read: function(options) {
                    options.success(data.shift());
                }
            },
            serverFiltering: true
        },
        value: ["item1", "item2"]
    });

    multiselect.dataSource.filter({ value: "3", operator: "contains", field: "text" });

    multiselect.ul.children().eq(0).click();
    multiselect.tagList.children().first().find(".k-i-close").click();

    var value = multiselect.value();

    equal(value.length, 2);
    equal(value[0], "item2");
    equal(value[1], "item3");
});

test("MultiSelect closes popup on blur", function() {
    populateSelect();
    var multiselect = new MultiSelect(select);

    multiselect.input.focus();
    multiselect.open();
    multiselect.input.focusout();

    ok(!multiselect.popup.visible());
});

test("MultiSelect honours minLength on click", function() {
    populateSelect();
    var multiselect = new MultiSelect(select, {
        minLength: 1,
        autoBind: false
    });

    multiselect.wrapper.mousedown();

    equal(multiselect.input[0], document.activeElement);
    equal(multiselect.ul.children().length, 0);
    ok(!multiselect.popup.visible());
});

test("MultiSelect triggers blur event of the hidden element", 1, function() {
    populateSelect();
    var multiselect = new MultiSelect(select, {
        minLength: 1,
        autoBind: false
    });

    select.blur(function() {
        ok(true);
    });

    multiselect.input.focus().focusout();
});

test("MultiSelect calls dataSource fetch if autoBind:false", 1, function() {
    var multiselect = new MultiSelect(select, {
        autoBind: false,
        value: ["Item1", "Item2"]
    });

    stub(multiselect.dataSource, {
        filter: multiselect.dataSource.filter
    });

    multiselect.open();

    ok(multiselect.dataSource.calls("filter") > 0);
});

test("MultiSelect does not prevent default when click input", 0, function() {
    var multiselect = new MultiSelect(select);

    multiselect.input.trigger({
        type: "mousedown",
        preventDefault: function() {
            ok(false);
        }
    });
});

test("MultiSelect add focused class on focus", function() {
    var multiselect = new MultiSelect(select);

    multiselect.wrapper.mousedown();

    ok(multiselect.wrapper.hasClass("k-state-focused"));
});

return;

test("MultiSelect removes focused class on blur", function() {
    var multiselect = new MultiSelect(select);

    multiselect.input.focus();
    multiselect.input.focusout();

    ok(!multiselect.wrapper.hasClass("k-state-focused"));
});

test("MultiSelect removes selected item from tag list (filtered)", function() {
    populateSelect();
    var multiselect = new MultiSelect(select, {
        value: ["1", "2"]
    });

    multiselect.search("Option2");
    multiselect.ul.find(".k-state-selected").click();

    var tags = multiselect.tagList.children();

    equal(tags.length, 1);
    equal(tags.children(":first").text(), "Option1");
});

test("MultiSelect persists selected tags on rebind", function() {
    populateSelect();
    var multiselect = new MultiSelect(select, {
        value: ["1", "2"]
    });

    multiselect.search("Option2");
    multiselect.ul.find(".k-state-selected").click();
    multiselect.open();

    var tags = multiselect.tagList.children();

    equal(tags.length, 1);
    equal(tags.children(":first").text(), "Option1");
});

test("MultiSelect unselects item on tag remove", function() {
    populateSelect();
    var multiselect = new MultiSelect(select, {
        dataSource: ["foo", "bar", "baz"],
        value: ["foo"]
    });

    multiselect.tagList.children(":first").find(".k-i-close").click();

    var selectedItems = multiselect.ul.children(".k-state-selected");

    equal(selectedItems.length, 0);
});

test("MultiSelect removes selected item that exist in datasource from tagList (filtered)", function() {
    populateSelect();
    var multiselect = new MultiSelect(select, {
        dataSource: ["foo", "bar", "baz", "item1", "item2"],
        value: ["item1", "bar"]
    });

    multiselect.search("item");
    multiselect.ul.children(":last").click();
    multiselect.tagList.children(":first").find(".k-i-close").click();

    var tags = multiselect.tagList.children();

    equal(tags.length, 2);
    equal(tags.children(":first").text(), "bar");
});

})();
