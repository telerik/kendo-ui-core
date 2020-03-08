(function() {
    var MultiSelect = kendo.ui.MultiSelect,
        select;

    describe("kendo.ui.MultiSelect Single Tag mode", function () {
        beforeEach(function() {

            kendo.ns = "kendo-";
            select = $("<select multiple />").appendTo(Mocha.fixture);

            for (var idx = 0; idx < 15; idx++) {
                select.append("<option value=" + idx + ">" + idx + "</option>");
            }
        });
        afterEach(function() {
            kendo.ns = "";

            if (select.data("kendoMultiSelect")) {
                select.data("kendoMultiSelect").destroy();
            }
        });

    it("Widget renders nothing if no value", function() {
        var multiselect = new MultiSelect(select, {
            tagMode: "single",
            value: []
        });
        var tagList = multiselect.tagList;

        assert.equal(tagList.children().length, 0);
    });

    it("Widget renders a single tag using the default 'single' tag template", function() {
        var multiselect = new MultiSelect(select, {
            tagMode: "single",
            value: [1]
        });
        var tagList = multiselect.tagList;
        var tag = tagList.children(":first");

        assert.equal(tagList.children().length, 1);

        assert.equal(tag.children().length, 2);
        assert.equal(tag.children().eq(0).html(), "1 item(s) selected");
        assert.equal(tag.find(".k-select").children(".k-i-arrow-60-down").length, 1);
        assert.equal(tag.find(".k-select").attr("aria-label"), "open");
        assert.equal(tag.find(".k-select").children(".k-i-arrow-60-down").html(), "");
    });

    it("Widget renders a single tag using a custom template with 'values' and 'maxTotal'", function() {
        var multiselect = new MultiSelect(select, {
            tagTemplate: "#:values.length# selected of #:maxTotal#",
            tagMode: "single",
            value: [1]
        });
        var tagList = multiselect.tagList;
        var tag = tagList.children(":first");

        assert.equal(tagList.children().length, 1);

        assert.equal(tag.children().length, 2);
        assert.equal(tag.children().eq(0).html(), "1 selected of 15");
        assert.equal(tag.find(".k-select").children(".k-i-arrow-60-down").length, 1);
    });

    it("Widget passes 'dataitems' and 'total' value to the single tag template", function() {
        var multiselect = new MultiSelect(select, {
            tagTemplate: "#:dataItems.length# (#:dataItems[0].text#) selected of #:currentTotal#",
            tagMode: "single",
            value: [1]
        });
        var tagList = multiselect.tagList;
        var tag = tagList.children(":first");

        assert.equal(tagList.children().length, 1);

        assert.equal(tag.children().length, 2);
        assert.equal(tag.children().eq(0).html(), "1 (1) selected of 15");
        assert.equal(tag.find(".k-select").children(".k-i-arrow-60-down").length, 1);
    });

    it("Widget passes 'dataitems' and 'total' value to the single tag template", function() {
        var multiselect = new MultiSelect(select, {
            tagTemplate: "#:dataItems.length# (#:dataItems[0].text#) selected of #:currentTotal#",
            tagMode: "single",
            value: [1]
        });
        var tagList = multiselect.tagList;
        var tag = tagList.children(":first");

        assert.equal(tagList.children().length, 1);

        assert.equal(tag.children().length, 2);
        assert.equal(tag.children().eq(0).html(), "1 (1) selected of 15");
        assert.equal(tag.find(".k-select").children(".k-i-arrow-60-down").length, 1);
    });

    it("Updates the text of the selected tag when value is changed", function() {
        var multiselect = new MultiSelect(select, {
            tagTemplate: "#:dataItems.length#,#:currentTotal#,#:maxTotal#",
            tagMode: "single",
            value: [1]
        });

        multiselect.value([1,2,3]);

        var tagList = multiselect.tagList;
        var tag = tagList.children(":first");

        assert.equal(tag.children().eq(0).html(), "3,15,15");
    });

    it("Removes tag when no value", function() {
        var multiselect = new MultiSelect(select, {
            tagTemplate: "#:dataItems.length#,#:currentTotal#,#:maxTotal#",
            tagMode: "single",
            value: [1]
        });

        multiselect.value([]);

        var tagList = multiselect.tagList;
        assert.equal(tagList.children().length, 0);
    });

    it("Passes maxTotal value to the template different than currentTotal", function() {
        var multiselect = new MultiSelect(select, {
            tagTemplate: "#:dataItems.length#,#:currentTotal#,#:maxTotal#",
            tagMode: "single",
            value: [1]
        });

        multiselect.dataSource.filter({ field: "value", operator: "eq", value: "3" });
        multiselect.value([3]);

        var tagList = multiselect.tagList;
        var tag = tagList.children(":first");

        assert.equal(tag.children().eq(0).html(), "1,1,15");
    });

    it("Do not remove tag when click 'arrow' icon", function() {
        var multiselect = new MultiSelect(select, {
            tagMode: "single",
            value: [1]
        });

        var tagList = multiselect.tagList;

        tagList.children(":first").children(":last").click();

        assert.equal(tagList.children().length, 1);
    });

    it("Open popup when click 'arrow' icon", function() {
        var multiselect = new MultiSelect(select, {
            tagMode: "single",
            value: [1]
        });

        var tagList = multiselect.tagList;

        tagList.children(":first").children(":last").mousedown();

        assert.isOk(multiselect.popup.visible());
    });

    it("Update underlying select element on item select", function() {
        var multiselect = new MultiSelect(select, {
            tagMode: "single",
            value: [1]
        });

        multiselect.value([1,2]);

        var value = select.val();

        assert.equal(value.length, 2);
        assert.equal(value[0], 1);
        assert.equal(value[1], 2);
    });

    it("Update underlying select element on item remove", function() {
        var multiselect = new MultiSelect(select, {
            tagMode: "single",
            value: [1,2,3]
        });

        multiselect.value([2]);

        var value = select.val();

        assert.equal(value.length, 1);
        assert.equal(value[0], 2);
    });

    it("Clear selected values when delete the tag", function() {
        var multiselect = new MultiSelect(select, {
            tagMode: "single",
            value: [1,2,3]
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: kendo.keys.BACKSPACE
        });

        var selectValue = multiselect.element.val() || [];

        assert.equal(selectValue.length, 0);
    });

    it("Clear selected values when delete the tag after filtering", function() {
        var multiselect = new MultiSelect(select, {
            tagMode: "single",
            value: [1,2,3]
        });

        multiselect.search("a");

        multiselect.input.trigger({
            type: "keydown",
            keyCode: kendo.keys.BACKSPACE
        });

        var selectValue = multiselect.element.val() || [];

        assert.equal(selectValue.length, 0);
    });

    it("Clear selected values with esc when delete the tag after filtering", function() {
        var multiselect = new MultiSelect(select, {
            tagMode: "single",
            value: [1,2,3]
        });

        multiselect.search("a");

        multiselect.input.trigger({
            type: "keydown",
            keyCode: kendo.keys.ESC
        });

        multiselect.input.trigger({
            type: "keydown",
            keyCode: kendo.keys.ESC
        });

        var selectValue = multiselect.value();

        assert.equal(selectValue.length, 2);
        var tagList = multiselect.tagList;
        var tag = tagList.children(":first");
        assert.equal(tag.children().eq(0).html(), "2 item(s) selected");
    });

    it("Clear selected values clear button when delete the tag after filtering", function() {
        var multiselect = new MultiSelect(select, {
            tagMode: "single",
            value: [1,2,3]
        });

        multiselect.search("a");

        multiselect._clear.click();

        var selectValue = multiselect.value();

        assert.equal(selectValue.length, 0);
        var tagList = multiselect.tagList;
        var tag = tagList.children(":first");
        assert.equal(tag.children().length, 0);
    });

    });
}());
