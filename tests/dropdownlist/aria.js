(function() {
    var DropDownList = kendo.ui.DropDownList,
        input;

    describe("kendo.ui.DropDownList Aria", function() {
        beforeEach(function() {
            kendo.ns = "kendo-";
            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.ns = "";
            var ddl = input.data("kendoDropDownList");

            if (ddl) {
                ddl.destroy();
                ddl.wrapper.remove();
            } else {
                input.remove();
            }
        });

        it("DropDownList renders role='listbox'", function() {
            var dropdownlist = new DropDownList(input);

            assert.equal(dropdownlist.wrapper.attr("role"), "listbox");
        });

        it("DropDownList renders aria-haspopup", function() {
            var dropdownlist = new DropDownList(input);

            assert.equal(dropdownlist.wrapper.attr("aria-haspopup"), "true");
        });

        it("DropDownList renders aria-expanded", function() {
            var dropdownlist = new DropDownList(input);

            assert.equal(dropdownlist.wrapper.attr("aria-expanded"), "false");
        });

        it("DropDownList renders aria-owns", function() {
            var dropdownlist = new DropDownList(input.attr("id", "test"));

            assert.equal(dropdownlist.wrapper.attr("aria-owns"), dropdownlist.ul.attr("id"));
        });

        it("DropDownList renders aria-activedescendant", function() {
            var dropdownlist = new DropDownList(input.attr("id", "test"), {
                dataSource: ["Item", "Item2"]
            });

            assert.equal(dropdownlist.wrapper.attr("aria-activedescendant"), dropdownlist.current()[0].id);
        });

        it("DropDownList renders aria-selected", function() {
            var dropdownlist = new DropDownList(input.attr("id", "test"), {
                dataSource: ["Item", "Item2"]
            });

            assert.equal(dropdownlist.current().attr("aria-selected"), "true");
        });

        //filter input
        it("DropDownList renders role='listbox' to filter input", function() {
            var dropdownlist = new DropDownList(input, {
                filter: "startswith"
            });

            assert.equal(dropdownlist.filterInput.attr("role"), "listbox");
        });

        it("DropDownList renders aria-haspopup to filter input", function() {
            var dropdownlist = new DropDownList(input, {
                filter: "startswith"
            });

            assert.equal(dropdownlist.filterInput.attr("aria-haspopup"), "true");
        });

        it("DropDownList renders aria-expanded to filter input", function() {
            var dropdownlist = new DropDownList(input, {
                filter: "startswith"
            });

            assert.equal(dropdownlist.filterInput.attr("aria-expanded"), "false");
        });

        it("DropDownList renders aria-owns to filter input", function() {
            var dropdownlist = new DropDownList(input.attr("id", "test"), {
                filter: "startswith"
            });

            assert.equal(dropdownlist.filterInput.attr("aria-owns"), dropdownlist.ul.attr("id"));
        });

        it("DropDownList renders aria-activedescendant", function() {
            var dropdownlist = new DropDownList(input.attr("id", "test"), {
                filter: "startswith",
                dataSource: ["Item", "Item2"]
            });

            assert.equal(dropdownlist.filterInput.attr("aria-activedescendant"), dropdownlist.current()[0].id);
        });

        it("widget adds activedescendant to the wrapper when optionLabel is focused", function() {
            var dropdownlist = new DropDownList(input, {
                filter: "contains",
                dataSource: [
                    { item: "item1" },
                    { item: "item2" }
                ],
                dataTextField: "item",
                dataValueField: "item",
                optionLabel: "Select..."
            });

            var current = dropdownlist.current();

            assert.isOk(current.attr("id"));
            assert.isOk(current.hasClass("k-list-optionlabel"));
            assert.equal(dropdownlist.wrapper.attr("aria-activedescendant"), dropdownlist.current()[0].id);
        });

        it("widget removes aria id from the optionLabel", function() {
            var dropdownlist = new DropDownList(input, {
                filter: "contains",
                dataSource: [
                    { item: "item1" },
                    { item: "item2" }
                ],
                dataTextField: "item",
                dataValueField: "item",
                optionLabel: "Select..."
            });

            dropdownlist.select(1);

            var optionLabel = dropdownlist.list.find(".k-list-optionlabel");

            assert.isOk(!optionLabel.attr("id"));
        });

        it("widget takes aria-label attribute", function() {
            var dropdownlist = new DropDownList(input.attr("aria-label", "labeltext"));

            assert.equal(dropdownlist.wrapper.attr("aria-label"), "labeltext");
        });

        it("widget takes aria-labelledby attribute", function() {
            var dropdownlist = new DropDownList(input.attr("aria-labelledby", "labelID"));

            assert.equal(dropdownlist.wrapper.attr("aria-labelledby"), "labelID");
        });

        it("widget sets aria-labelledby attribute to label's id", function() {
            var label = input.before("<label id='labelID' for='ddInput'>labeltext</label>").prev("label");
            var dropdownlist = new DropDownList(input.attr("id", "ddInput"));

            assert.isOk(dropdownlist.wrapper.attr("aria-labelledby"));
            assert.equal(dropdownlist.wrapper.attr("aria-labelledby"), label.attr("id"));

            label.remove();
        });

        it("widget sets aria-labelledby attribute to label's generated id", function() {
            var label = input.before("<label for='ddInput'>labeltext</label>").prev("label");
            var dropdownlist = new DropDownList(input.attr("id", "ddInput"));

            assert.isOk(dropdownlist.wrapper.attr("aria-labelledby"));
            assert.equal(dropdownlist.wrapper.attr("aria-labelledby"), label.attr("id"));

            label.remove();
        });
    });
}());
