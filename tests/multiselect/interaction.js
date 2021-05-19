(function() {

    var MultiSelect = kendo.ui.MultiSelect,
        select;

    function populateSelect() {
        var options = [];
        for (var i = 0; i < 5; i++) {
            options.push("<option value='" + i + "'>Option" + i + "</option>");
        }

        select.html(options);
    }

    describe("kendo.ui.MultiSelect interaction", function() {
        beforeEach(function() {

            select = $("<select multiple=multiple/>").appendTo(Mocha.fixture);
        });
        afterEach(function() {

            select.data("kendoMultiSelect").destroy();
        });

        it("MultiSelect opens popup on input click", function() {
            populateSelect();
            var multiselect = new MultiSelect(select);

            multiselect.input.mousedown();

            assert.isOk(multiselect.popup.visible());
        });

        it("MultiSelect focuses input on click", function() {
            populateSelect();
            var multiselect = new MultiSelect(select);

            multiselect.wrapper.mousedown();

            assert.equal(multiselect.input[0], document.activeElement);
        });

        it("MultiSelect focuses input on touchend", function() {
            populateSelect();
            var multiselect = new MultiSelect(select);

            multiselect.wrapper.trigger({
                type: "touchend"
            });

            assert.equal(multiselect.input[0], document.activeElement);
        });

        it("MultiSelect opens popup on tag click", function() {
            populateSelect();
            select.val("0");

            var multiselect = new MultiSelect(select);

            multiselect.tagList.children().first().mousedown();

            assert.isOk(multiselect.popup.visible());
        });

        it("MultiSelect do not open on tag delete", function() {
            populateSelect();
            select.val("0");

            var multiselect = new MultiSelect(select);

            multiselect.tagList.find(".k-i-close").click();

            assert.isOk(!multiselect.popup.visible());
        });

        it("MultiSelect do not focus on delete", function() {
            populateSelect();
            select.val("0");

            var multiselect = new MultiSelect(select);

            multiselect.tagList.find(".k-i-close").mousedown();

            assert.notEqual(multiselect.input[0], document.activeElement);
        });

        it("MultiSelect selects item on click", function() {
            populateSelect();
            var multiselect = new MultiSelect(select);
            multiselect.input.mousedown();

            multiselect.ul.children().eq(1).click();

            assert.isOk(multiselect.tagList.children(":first")[0]);
        });

        it("MultiSelect hides popup on click", function() {
            populateSelect();
            var multiselect = new MultiSelect(select);
            multiselect.input.mousedown();

            var item = multiselect.ul.children().eq(1);

            item.click();

            assert.isOk(!multiselect.popup.visible());
        });

        it("MultiSelect deletes tag on delete button click", function() {
            populateSelect();

            var multiselect = new MultiSelect(select);
            multiselect.input.mousedown();

            var item = multiselect.ul.children().eq(1).click();
            multiselect.ul.children().eq(0).click();

            var tag = multiselect.tagList.children().first();
            tag.find(".k-i-close").click();

            assert.isOk(!tag.parent()[0]);
        });

        it("MultiSelect shows clicked item on delete", function() {
            populateSelect();

            var multiselect = new MultiSelect(select);
            multiselect.input.mousedown();

            var item = multiselect.ul.children().eq(1).click();
            multiselect.ul.children().eq(0).click();

            multiselect.tagList.children().first().find(".k-i-close").click();
            multiselect.popup.open();

            assert.notEqual(item[0].style.display, "none");
        });
    });

    describe("kendo.ui.MultiSelect selection", function() {
        beforeEach(function() {

            select = $("<select multiple=multiple />").appendTo(Mocha.fixture);
        });
        afterEach(function() {

            select.data("kendoMultiSelect").destroy();
        });

        it("MultiSelect selects corresponding option", function() {
            populateSelect();

            var multiselect = new MultiSelect(select);

            multiselect.input.mousedown();
            multiselect.ul.children().eq(1).click();

            assert.isOk(select[0].children[1].selected);
        });

        it("MultiSelect unselects option", function() {
            populateSelect();

            var multiselect = new MultiSelect(select);
            multiselect.input.mousedown();
            multiselect.ul.children().eq(1).click();

            multiselect.tagList.children().first().find(".k-i-close").click();

            assert.isOk(!select[0].children[1].selected);
        });

        it("MultiSelect persists selected data items", function() {
            populateSelect();

            var multiselect = new MultiSelect(select);

            multiselect.input.mousedown();
            multiselect.ul.children().eq(1).click();

            //TODO: use method instead of _dataItems
            assert.equal(multiselect.dataItems().length, 1);
        });

        it("MultiSelect removes corresponding data item", function() {
            populateSelect();

            var multiselect = new MultiSelect(select);

            multiselect.input.mousedown();
            multiselect.ul.children().eq(1).click();
            multiselect.ul.children().eq(0).click();

            //unselect item
            multiselect.tagList.children().first().find(".k-i-close").click();

            //TODO: use method instead of _dataItems
            assert.equal(multiselect.dataItems().length, 1);
            assert.equal(multiselect.dataItems()[0].value, 0);
        });

        it("MultiSelect clears input on selection", function() {
            populateSelect();

            var multiselect = new MultiSelect(select);

            multiselect.input.mousedown().val("option");
            multiselect.search("option");

            multiselect.ul.children().eq(0).click();

            assert.equal(multiselect.input.val(), "");
        });

        it("MultiSelect clears input on blur", function() {
            var multiselect = new MultiSelect(select);

            multiselect.input.focus().val("test").focusout();

            assert.equal(multiselect.input.val(), "");
        });

        it("MultiSelect shows all available items if input is cleared", function() {
            populateSelect();
            var multiselect = new MultiSelect(select);

            multiselect.input.focus().val("nothing");
            multiselect.search("nothing");

            multiselect.input.focusout();

            multiselect.open();

            assert.equal(multiselect.ul.children().length, 5);
        });

        it("MultiSelect focuses input on click", function() {
            populateSelect();
            var multiselect = new MultiSelect(select);

            multiselect.wrapper.mousedown();

            assert.equal(multiselect.input[0], document.activeElement);
        });

        it("MultiSelect focuses input on click", function() {
            populateSelect();
            var multiselect = new MultiSelect(select);

            multiselect.input.mousedown();
            multiselect.ul.children().eq(1).click();
            multiselect.ul.children().eq(0).click();
            multiselect.open();

            multiselect.tagList.children().first().find(".k-i-close").click();

            assert.isOk(!multiselect.popup.visible());
        });

        it("MultiSelect selects all selected options after filtering", function() {
            populateSelect();
            var multiselect = new MultiSelect(select);

            multiselect.input.mousedown();
            multiselect.ul.children().eq(0).click();
            multiselect.ul.children().eq(1).click();

            multiselect.input.mousedown();
            multiselect.search("Option4");

            multiselect.ul.children().eq(0).click();

            var options = select[0].children;

            assert.equal(options.length, 3);
            assert.isOk(options[0].selected);
            assert.isOk(options[1].selected);
            assert.isOk(options[2].selected);
        });

        it("MultiSelect highlights first item on refresh", function() {
            populateSelect();
            var multiselect = new MultiSelect(select);

            multiselect.open();
            multiselect.refresh();

            assert.isOk(multiselect.current().parent()[0]);
        });

        it("MultiSelect unselects custom option", function() {
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

            assert.isOk(select[0].children[0].selected); //item3
            assert.isOk(!select[0].children[1].selected); //item4
            assert.isOk(!select[0].children[2].selected); //item1
            assert.isOk(select[0].children[3].selected); //item2
        });

        it("MultiSelect removed custom option is not selected on list rebind", function() {
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

            assert.equal(li.length, 1);
            assert.equal(li.text(), "item2");
        });

        it("MultiSelect removes value matching custom option", function() {
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

            assert.equal(value.length, 2);
            assert.equal(value[0], "item2");
            assert.equal(value[1], "item3");
        });

        it("MultiSelect closes popup on blur", function() {
            populateSelect();
            var multiselect = new MultiSelect(select);

            multiselect.input.focus();
            multiselect.open();
            multiselect.input.focusout();

            assert.isOk(!multiselect.popup.visible());
        });

        it("MultiSelect honours minLength on click", function() {
            populateSelect();
            var multiselect = new MultiSelect(select, {
                minLength: 2,
                autoBind: false
            });

            multiselect.wrapper.mousedown();

            assert.equal(multiselect.input[0], document.activeElement);
            assert.equal(multiselect.ul.children().length, 0);
            assert.isOk(!multiselect.popup.visible());
        });

        it("MultiSelect triggers blur event of the hidden element", function() {
            populateSelect();
            var multiselect = new MultiSelect(select, {
                minLength: 1,
                autoBind: false
            });

            select.blur(function() {
                assert.isOk(true);
            });

            multiselect.input.focus().focusout();
        });

        it("MultiSelect calls dataSource fetch if autoBind:false", function() {
            var multiselect = new MultiSelect(select, {
                autoBind: false,
                value: ["Item1", "Item2"]
            });

            stub(multiselect.dataSource, {
                filter: multiselect.dataSource.filter
            });

            multiselect.open();

            assert.isOk(multiselect.dataSource.calls("filter") > 0);
        });

        it("MultiSelect does not prevent default when click input", function() {
            var multiselect = new MultiSelect(select);

            multiselect.input.trigger({
                type: "mousedown",
                preventDefault: function() {
                    assert.isOk(false);
                }
            });
        });

        it("MultiSelect add focused class on focus", function() {
            var multiselect = new MultiSelect(select);

            multiselect.wrapper.mousedown();

            assert.isOk(multiselect.wrapper.hasClass("k-state-focused"));
        });

        it("focus input when _clear is clicked", function() {
            var multiselect = new MultiSelect(select, {
                dataSource: ["foo", "bar", "baz", "item1", "item2"],
                value: ["item1", "bar"]
            });

            multiselect._clear.click();

            assert.equal(assert.equal(document.activeElement, multiselect.input[0]));
        });

        it("reset value when _clear is clicked", function() {
            var multiselect = new MultiSelect(select, {
                dataSource: ["foo", "bar", "baz", "item1", "item2"],
                value: ["item1", "bar"]
            });

            multiselect._clear.click();
            assert.equal(multiselect.value(), "");
        });

        it("show clear button", function() {
            var multiselect = new MultiSelect(select, {
                dataSource: ["foo", "bar", "baz", "item1", "item2"],
                value: ["item1", "bar"]
            });

            assert.isOk(multiselect.wrapper.find(multiselect._clear).length > 0);
        });

        it("hide clear button", function() {
            var multiselect = new MultiSelect(select, {
                clearButton: false,
                dataSource: ["foo", "bar", "baz", "item1", "item2"],
                value: ["item1", "bar"]
            });

            assert.equal(multiselect.wrapper.find(multiselect._clear).length, 0);
        });

        it("MultiSelect removes focused class on blur", function() {
            var multiselect = new MultiSelect(select);

            multiselect.input.focus();
            multiselect.input.focusout();

            assert.isOk(!multiselect.wrapper.hasClass("k-state-focused"));
        });

        it("MultiSelect removes selected item from tag list (filtered)", function() {
            populateSelect();
            var multiselect = new MultiSelect(select, {
                value: ["1", "2"]
            });

            multiselect.search("Option2");
            multiselect.ul.find(".k-state-selected").click();

            var tags = multiselect.tagList.children();

            assert.equal(tags.length, 1);
            assert.equal(tags.children(":first").text(), "Option1");
        });

        it("MultiSelect persists selected tags on rebind", function() {
            populateSelect();
            var multiselect = new MultiSelect(select, {
                value: ["1", "2"]
            });

            multiselect.search("Option2");
            multiselect.ul.find(".k-state-selected").click();
            multiselect.open();

            var tags = multiselect.tagList.children();

            assert.equal(tags.length, 1);
            assert.equal(tags.children(":first").text(), "Option1");
        });

        it("MultiSelect unselects item on tag remove", function() {
            populateSelect();
            var multiselect = new MultiSelect(select, {
                dataSource: ["foo", "bar", "baz"],
                value: ["foo"]
            });

            multiselect.tagList.children(":first").find(".k-i-close").click();

            var selectedItems = multiselect.ul.children(".k-state-selected");

            assert.equal(selectedItems.length, 0);
        });

        it("MultiSelect unselects item on backspace", function() {
            populateSelect();
            var multiselect = new MultiSelect(select, {
                dataSource: ["foo", "bar", "baz"],
                value: ["bar"]
            });

            multiselect.setOptions({
                autoClose: false
            });

            var evt = new KeyboardEvent('keydown', {'keyCode':8, 'which':8});

            multiselect.open();
            multiselect.input[0].dispatchEvent(evt);

            var selectedItems = multiselect.ul.children(".k-state-selected");

            assert.equal(selectedItems.length, 0);
        });

        it("MultiSelect removes selected item that exist in datasource from tagList (filtered)", function() {
            populateSelect();
            var multiselect = new MultiSelect(select, {
                dataSource: ["foo", "bar", "baz", "item1", "item2"],
                value: ["item1", "bar"]
            });

            multiselect.search("item");
            multiselect.ul.children(":last").click();
            multiselect.tagList.children(":first").find(".k-i-close").click();

            var tags = multiselect.tagList.children();

            assert.equal(tags.length, 2);
            assert.equal(tags.children(":first").text(), "bar");
        });

    });
}());
