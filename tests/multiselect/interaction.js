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

    multiselect.tagList.find(".k-delete").click();

    ok(!multiselect.popup.visible());
});

test("MultiSelect do not focus on delete", function() {
    populateSelect();
    select.val("0");

    var multiselect = new MultiSelect(select);

    multiselect.tagList.find(".k-delete").mousedown();

    notEqual(multiselect.input[0], document.activeElement);
});

test("MultiSelect selects item on click", function() {
    populateSelect();
    var multiselect = new MultiSelect(select);
    multiselect.input.mousedown();

    multiselect.ul.children().eq(1).click();

    ok(multiselect.tagList.children(":first")[0]);
});

test("MultiSelect hides selected item", function() {
    populateSelect();
    var multiselect = new MultiSelect(select);
    multiselect.input.mousedown();

    var item = multiselect.ul.children().eq(1);

    item.click();

    equal(item[0].style.display, "none");
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
    tag.find(".k-delete").click();

    ok(!tag.parent()[0]);
});

test("MultiSelect shows clicked item on delete", function() {
    populateSelect();

    var multiselect = new MultiSelect(select);
    multiselect.input.mousedown();

    var item = multiselect.ul.children().eq(1).click();
    multiselect.ul.children().eq(0).click();

    multiselect.tagList.children().first().find(".k-delete").click();
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

    multiselect.tagList.children().first().find(".k-delete").click();

    ok(!select[0].children[1].selected);
});

test("MultiSelect persists selected data items", function() {
    populateSelect();

    var multiselect = new MultiSelect(select);

    multiselect.input.mousedown();
    multiselect.ul.children().eq(1).click();

    //TODO: use method instead of _dataItems
    equal(multiselect._dataItems.length, 1);
});

test("MultiSelect removes corresponding data item", function() {
    populateSelect();

    var multiselect = new MultiSelect(select);

    multiselect.input.mousedown();
    multiselect.ul.children().eq(1).click();
    multiselect.ul.children().eq(0).click();

    //unselect item
    multiselect.tagList.children().first().find(".k-delete").click();

    //TODO: use method instead of _dataItems
    equal(multiselect._dataItems.length, 1);
    equal(multiselect._dataItems[0].value, 0);
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

    multiselect.input.focus().val("test").blur();

    equal(multiselect.input.val(), "");
});

test("MultiSelect shows all available items if input is clear", function() {
    populateSelect();
    var multiselect = new MultiSelect(select);

    multiselect.input.focus().val("nothing");
    multiselect.search("nothing");

    multiselect.input.blur();

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

    multiselect.tagList.children().first().find(".k-delete").click();

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
    var multiselect = new MultiSelect(select, {
        dataSource: ["item1", "item2"],
        value: ["item1", "item2"]
    });

    multiselect.dataSource.data(["item3", "item4"]);
    multiselect.ul.children().eq(0).click();

    multiselect.tagList.children().first().find(".k-delete").click();

    ok(!select[0].children[2].selected);
});

test("MultiSelect closes popup on blur", function() {
    populateSelect();
    var multiselect = new MultiSelect(select);

    multiselect.input.focus();
    multiselect.open();
    multiselect.input.blur();

    ok(!multiselect.popup.visible());
});

test("MultiSelect sets height on select", function() {
    populateSelect();
    var multiselect = new MultiSelect(select);

    stub(multiselect, {
        _height: multiselect._height
    });

    multiselect._select(0);

    equal(multiselect.calls("_height"), 1);
});

test("MultiSelect sets height on unselect", function() {
    populateSelect();
    var multiselect = new MultiSelect(select, {
        value: "0"
    });

    stub(multiselect, {
        _height: multiselect._height
    });

    multiselect._unselect(multiselect.tagList.children(":first"));

    equal(multiselect.calls("_height"), 1);
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

    multiselect.input.focus().blur();
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

test("MultiSelect removes focused clas on blur", function() {
    var multiselect = new MultiSelect(select);

    multiselect.input.focus();
    multiselect.input.blur();

    ok(!multiselect.wrapper.hasClass("k-state-focused"));
});

})();
