(function() {
    var MultiSelect = kendo.ui.MultiSelect,
        select;

    module("kendo.ui.MultiSelect Single Tag mode", {
        setup: function() {
            kendo.effects.disable();
            kendo.ns = "kendo-";
            select = $("<select multiple />").appendTo(QUnit.fixture);

            for (var idx = 0; idx < 15; idx++) {
                select.append("<option value=" + idx + ">" + idx + "</option>");
            }
        },
        teardown: function() {
            kendo.ns = "";
            kendo.effects.enable();
            if (select.data("kendoMultiSelect")) {
                select.data("kendoMultiSelect").destroy();
            }
        }
    });

    test("Widget renders nothing if no value", function() {
        var multiselect = new MultiSelect(select, {
            tagMode: "single",
            value: []
        });
        var tagList = multiselect.tagList;

        equal(tagList.children().length, 0);
    });

    test("Widget renders a single tag using the default 'single' tag template", function() {
        var multiselect = new MultiSelect(select, {
            tagMode: "single",
            value: [1]
        });
        var tagList = multiselect.tagList;
        var tag = tagList.children(":first");

        equal(tagList.children().length, 1);

        equal(tag.children().length, 2);
        equal(tag.children().eq(0).html(), "1 item(s) selected");
        equal(tag.find(".k-select").children(".k-i-arrow-s").length, 1);
        equal(tag.find(".k-select").children(".k-i-arrow-s").html(), "open");
    });

    test("Widget renders a single tag using a custom template with 'values' and 'maxTotal'", function() {
        var multiselect = new MultiSelect(select, {
            tagTemplate: "#:values.length# selected of #:maxTotal#",
            tagMode: "single",
            value: [1]
        });
        var tagList = multiselect.tagList;
        var tag = tagList.children(":first");

        equal(tagList.children().length, 1);

        equal(tag.children().length, 2);
        equal(tag.children().eq(0).html(), "1 selected of 15");
        equal(tag.find(".k-select").children(".k-i-arrow-s").length, 1);
    });

    test("Widget passes 'dataitems' and 'total' value to the single tag template", function() {
        var multiselect = new MultiSelect(select, {
            tagTemplate: "#:dataItems.length# (#:dataItems[0].text#) selected of #:currentTotal#",
            tagMode: "single",
            value: [1]
        });
        var tagList = multiselect.tagList;
        var tag = tagList.children(":first");

        equal(tagList.children().length, 1);

        equal(tag.children().length, 2);
        equal(tag.children().eq(0).html(), "1 (1) selected of 15");
        equal(tag.find(".k-select").children(".k-i-arrow-s").length, 1);
    });

    test("Widget passes 'dataitems' and 'total' value to the single tag template", function() {
        var multiselect = new MultiSelect(select, {
            tagTemplate: "#:dataItems.length# (#:dataItems[0].text#) selected of #:currentTotal#",
            tagMode: "single",
            value: [1]
        });
        var tagList = multiselect.tagList;
        var tag = tagList.children(":first");

        equal(tagList.children().length, 1);

        equal(tag.children().length, 2);
        equal(tag.children().eq(0).html(), "1 (1) selected of 15");
        equal(tag.find(".k-select").children(".k-i-arrow-s").length, 1);
    });

    test("Updates the text of the selected tag when value is changed", function() {
        var multiselect = new MultiSelect(select, {
            tagTemplate: "#:dataItems.length#,#:currentTotal#,#:maxTotal#",
            tagMode: "single",
            value: [1]
        });

        multiselect.value([1,2,3]);

        var tagList = multiselect.tagList;
        var tag = tagList.children(":first");

        equal(tag.children().eq(0).html(), "3,15,15");
    });

    test("Removes tag when no value", function() {
        var multiselect = new MultiSelect(select, {
            tagTemplate: "#:dataItems.length#,#:currentTotal#,#:maxTotal#",
            tagMode: "single",
            value: [1]
        });

        multiselect.value([]);

        var tagList = multiselect.tagList;
        equal(tagList.children().length, 0);
    });

    test("Passes maxTotal value to the template different than currentTotal", function() {
        var multiselect = new MultiSelect(select, {
            tagTemplate: "#:dataItems.length#,#:currentTotal#,#:maxTotal#",
            tagMode: "single",
            value: [1]
        });

        multiselect.dataSource.filter({ field: "value", operator: "eq", value: "3" });
        multiselect.value([3]);

        var tagList = multiselect.tagList;
        var tag = tagList.children(":first");

        equal(tag.children().eq(0).html(), "1,1,15");
    });

    test("Do not remove tag when click 'arrow' icon", function() {
        var multiselect = new MultiSelect(select, {
            tagMode: "single",
            value: [1]
        });

        var tagList = multiselect.tagList;

        tagList.children(":first").children(":last").click();

        equal(tagList.children().length, 1);
    });

    test("Open popup when click 'arrow' icon", function() {
        var multiselect = new MultiSelect(select, {
            tagMode: "single",
            value: [1]
        });

        var tagList = multiselect.tagList;

        tagList.children(":first").children(":last").mousedown();

        ok(multiselect.popup.visible());
    });

    test("Update underlying select element on item select", 3, function() {
        var multiselect = new MultiSelect(select, {
            tagMode: "single",
            value: [1]
        });

        multiselect.value([1,2]);

        var value = select.val();

        equal(value.length, 2);
        equal(value[0], 1);
        equal(value[1], 2);
    });

    test("Update underlying select element on item remove", 2, function() {
        var multiselect = new MultiSelect(select, {
            tagMode: "single",
            value: [1,2,3]
        });

        multiselect.value([2]);

        var value = select.val();

        equal(value.length, 1);
        equal(value[0], 2);
    });

    test("Clear selected values when delete the tag", 1, function() {
        var multiselect = new MultiSelect(select, {
            tagMode: "single",
            value: [1,2,3]
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: kendo.keys.BACKSPACE
        });

        var value = select.val();

        equal(value, null);
    });
})();
