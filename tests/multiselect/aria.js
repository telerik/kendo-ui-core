(function() {
    var MultiSelect = kendo.ui.MultiSelect,
        keys = kendo.keys,
        input;

    describe("kendo.ui.MultiSelect ARIA", function () {
        beforeEach(function() {

            kendo.ns = "kendo-";
            input = $("<select multiple />").appendTo(Mocha.fixture);
        });
        afterEach(function() {

            kendo.ns = "";
            if (input.data("kendoMultiSelect")) {
                input.data("kendoMultiSelect").destroy();
            }
        });

    it("MultiSelect adds role to the input", function() {
        var multiselect = new MultiSelect(input);

        assert.equal(multiselect.input[0].getAttribute("role"), "listbox");
    });

    it("MultiSelect adds aria-disabled='true'", function() {
        var multiselect = new MultiSelect(input.attr("disabled", "disabled"));

        assert.equal(multiselect.input.attr("aria-disabled"), "true");
    });

    it("MultiSelect adds aria-disabled='false'", function() {
        var multiselect = new MultiSelect(input);

        assert.equal(multiselect.input.attr("aria-disabled"), "false");
    });

    it("MultiSelect adds aria-expanded='false'", function() {
        var multiselect = new MultiSelect(input);

        assert.equal(multiselect.input.attr("aria-expanded"), "false");
    });

    it("MultiSelect adds aria-expanded='true'", function() {
        var multiselect = new MultiSelect(input, {
            dataSource: ["item1", "item2"]
        });

        multiselect.open();

        assert.equal(multiselect.input.attr("aria-expanded"), "true");
    });

    it("MultiSelect sets aria-expanded to false on close", function() {
        var multiselect = new MultiSelect(input, {
            dataSource: ["item1", "item2"]
        });

        multiselect.open();
        multiselect.close();

        assert.isOk(!multiselect.popup.visible());
        assert.equal(multiselect.input.attr("aria-expanded"), "false");
    });

    it("MultiSelect adds aria-hidden to the popup element", function() {
        var multiselect = new MultiSelect(input, {
            dataSource: ["item1", "item2"]
        });

        assert.equal(multiselect.ul.attr("aria-hidden"), "true");

        multiselect.open();

        assert.equal(multiselect.ul.attr("aria-hidden"), "false");

        multiselect.close();

        assert.equal(multiselect.ul.attr("aria-hidden"), "true");
    });

    it("MultiSelect adds aria-live=polite if filter is set", function() {
        var multiselect = new MultiSelect(input, {
            dataSource: ["item1", "item2"],
            filter: "startswith"
        });

        assert.equal(multiselect.ul.attr("aria-live"), "polite");
    });

    it("MultiSelect calls progress handler when loader is shown",  function() {
        var multiselect = new MultiSelect(input, {
            filter: "startswith"
        });

        multiselect._showBusy  = function() { assert.isOk(true); };
        multiselect.setDataSource(["item1", "item2"]);
        multiselect.dataSource.trigger("progress");
    });

    it("MultiSelect adds aria-busy=true when loader is shown",  function() {
        var multiselect = new MultiSelect(input, {
            dataSource: ["item1", "item2"],
            filter: "startswith"
        });

        multiselect._showBusyHandler();
        assert.equal(multiselect.input.attr("aria-busy"), "true");
    });

    it("MultiSelect adds aria-busy=false when loader is hidden", function() {
        var multiselect = new MultiSelect(input, {
            dataSource: ["item1", "item2"],
            filter: "startswith"
        });

        multiselect._hideBusy();
        assert.equal(multiselect.input.attr("aria-busy"), "false");
    });

    it("MultiSelect sets activedescendant on refresh", function() {
        var multiselect = new MultiSelect(input.attr("id", "test"), {
            highlightFirst: false,
            dataSource: ["item1", "item2"],
            filter: "startswith"
        });

        assert.isOk(!multiselect.input.attr("aria-activedescendant"));
    });

    it("MultiSelect makes first item active on open", function() {
        var multiselect = new MultiSelect(input.attr("id", "test"), {
            dataSource: ["item1", "item2"],
            value: "item1"
        });

        multiselect.open();
        assert.equal(multiselect.input.attr("aria-activedescendant"), multiselect.current().attr("id"));
    });

    //aria-activedescendent interfere reading of all selected items
    it("MultiSelect remove aria-activedescendant on close", function() {
        var multiselect = new MultiSelect(input.attr("id", "test"), {
            dataSource: ["item1", "item2"],
            value: "item1"
        });

        multiselect.open();
        multiselect.close();
        assert.isOk(!multiselect.input.attr("aria-activedescendant"));
    });

    it("MultiSelect sets aria-activedescendant attr to the last li of tagList", function() {
        var multiselect = new MultiSelect(input.attr("id", "test"), {
            dataSource: ["item1", "item2"],
            value: "item1"
        });

        multiselect.input.focus().trigger({
            type: "keydown",
            keyCode: kendo.keys.LEFT
        });

        assert.isOk(multiselect.currentTag().attr("id"));
        assert.equal(multiselect.input.attr("aria-activedescendant"), multiselect.currentTag().attr("id"));
    });

    it("widget takes aria-label attribute", function() {
        var multiselect = new MultiSelect(input.attr("aria-label", "labeltext"));

        assert.equal(multiselect.input.attr("aria-label"), "labeltext");
    });

    it("widget takes aria-labelledby attribute", function() {
        var multiselect = new MultiSelect(input.attr("aria-labelledby", "labelID"));

        assert.equal(multiselect.input.attr("aria-labelledby"), "labelID");
    });

    it("widget sets aria-labelledby attribute to label's id", function() {
        var label = input.before("<label id='labelID' for='msInput'>labeltext</label>").prev("label");
        var multiselect = new MultiSelect(input.attr("id", "msInput"));

        assert.isOk(multiselect.input.attr("aria-labelledby"));
        assert.equal(multiselect.input.attr("aria-labelledby"), label.attr("id"));

        label.remove();
    });

    it("widget sets aria-labelledby attribute to label's generated id", function() {
        var label = input.before("<label for='msInput'>labeltext</label>").prev("label");
        var multiselect = new MultiSelect(input.attr("id", "msInput"));

        assert.isOk(multiselect.input.attr("aria-labelledby"));
        assert.equal(multiselect.input.attr("aria-labelledby"), label.attr("id"));

        label.remove();
    });

    it("MultiSelect adds aria-haspopup that takes value equal to the role", function() {
        var multiselect = new MultiSelect(input.attr("id", "test"));
        var role = multiselect.input.attr("role");

        assert.equal(multiselect.input.attr("role"), "listbox");
        assert.equal(multiselect.input.attr("aria-haspopup"), role);
    });

    it("MultiSelect adds aria-autocomplete", function() {
        var multiselect = new MultiSelect(input.attr("id", "test"));

        assert.equal(multiselect.input.attr("aria-autocomplete"), "list");
    });

    it("MultiSelect adds role to the popup items", function() {
        var multiselect = new MultiSelect(input, {
            dataSource: ["item1", "item2"]
        });

        assert.equal(multiselect.ul.children().first().attr("role"), "option");

        multiselect.open();

        assert.equal(multiselect.ul.children().last().attr("role"), "option");

        multiselect.close();

        assert.equal(multiselect.ul.children().first().attr("role"), "option");
    });

    it("MultiSelect adds aria-setsize to the tag list items", function() {
        var multiselect = new MultiSelect(input, {
            dataSource: ["item1", "item2"],
            value: "item1"
        });

        assert.equal(multiselect.tagList.children().first().attr("aria-setsize"), 1);
    });

    it("MultiSelect toggles aria-hidden of the tag list items", function() {
        var multiselect = new MultiSelect(input, {
            dataSource: ["item1", "item2"],
            value: "item1"
        });
        var tag = multiselect.tagList.children().first().find(".k-select");

        assert.equal(tag.attr("aria-hidden"), "true");

        multiselect.input.focus();

        multiselect.input.trigger({
            type: "keydown",
            keyCode: keys.LEFT
        });

        assert.isOk(!tag.attr("aria-hidden"));
    });
    });
}());
