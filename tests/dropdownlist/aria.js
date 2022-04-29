(function() {
    var DropDownList = kendo.ui.DropDownList,
        input;

        describe("kendo.ui.DropDownList WAI-ARIA with AXE", function () {
            beforeEach(function() {
                kendo.ns = "kendo-";
                input = $("<input id='ddl' />").appendTo(Mocha.fixture);
                $("<label for='ddl'>Label</label>").appendTo(Mocha.fixture);
                Mocha.fixture.attr("role", "main");
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

            it("DropDownList is accessible", function(done) {
                var ddl = new DropDownList(input, {
                    dataSource: ["test"]
                });

                axeRunFixture(done);
            });

            it("DropDownList with optionLabel is accessible", function(done) {
                var ddl = new DropDownList(input, {
                    optionLabel: "Select",
                    dataSource: ["test"]
                });

                axeRunFixture(done);
            });

            it("DropDownList with DataSource is accessible", function(done) {
                var ddl = new DropDownList(input, {
                    dataSource: ["Item"]
                });

                axeRunFixture(done);
            });

            it("DropDownList with search term is accessible", function(done) {
                var ddl = new DropDownList(input, {
                    dataSource: ["Item"],
                    filter: "contains",
                    animation: false
                });

                ddl.search("I");

                axeRunFixture(done);
            });

            it("DropDownList with filter input has accessible popup", function(done) {
                var ddl = new DropDownList(input, {
                    dataSource: ["Item"],
                    filter: "contains",
                    animation: false,
                    filterTitle: "search"
                });

                ddl.open();

                axeRun(ddl.popup.element.closest(".k-animation-container").parent(), done);
            });

            it("DropDownList with value is accessible", function(done) {
                var ddl = new DropDownList(input, {
                    dataSource: ["Item"],
                    value: "Item"
                });

                axeRunFixture(done);
            });

            it("DropDownList with templates has accessible popup", function(done) {
                var ddl = new DropDownList(input, {
                    dataSource: ["Item"],
                    footerTemplate: 'Total items found',
                    headerTemplate: 'Total items found',
                    animation: false
                });

                ddl.open();

                axeRun(ddl.popup.element.closest(".k-animation-container").parent(), done);
            });
        });

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

        it("DropDownList renders role='combobox'", function() {
            var dropdownlist = new DropDownList(input);

            assert.equal(dropdownlist.wrapper.attr("role"), "combobox");
        });

        it("DropDownList renders aria-haspopup", function() {
            var dropdownlist = new DropDownList(input);

            assert.equal(dropdownlist.wrapper.attr("aria-haspopup"), "listbox");
        });

        it("DropDownList renders aria-expanded", function() {
            var dropdownlist = new DropDownList(input);

            assert.equal(dropdownlist.wrapper.attr("aria-expanded"), "false");
        });

        it("DropDownList renders aria-owns", function() {
            var dropdownlist = new DropDownList(input.attr("id", "test"));

            assert.equal(dropdownlist.wrapper.attr("aria-owns"), dropdownlist.ul.attr("id"));
        });

        it("DropDownList renders aria-describedby", function() {
            var dropdownlist = new DropDownList(input.attr("id", "test"), {
                dataSource: ["Item", "Item2"]
            });

            assert.equal(dropdownlist.wrapper.attr("aria-describedby"), dropdownlist.wrapper.find(".k-input-inner")[0].id);
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

            assert.equal(dropdownlist.filterInput.attr("role"), "searchbox");
        });

        it("DropDownList renders aria-haspopup to filter input", function() {
            var dropdownlist = new DropDownList(input, {
                filter: "startswith"
            });

            assert.equal(dropdownlist.filterInput.attr("aria-haspopup"), "listbox");
        });

        it("DropDownList renders aria-owns to wrapper element", function() {
            var dropdownlist = new DropDownList(input.attr("id", "test"), {
                filter: "startswith"
            });

            assert.equal(dropdownlist.wrapper.attr("aria-owns"), dropdownlist.ul.attr("id"));
        });

        it("DropDownList adds custom title to filter input", function() {
            var dropdownlist = new DropDownList(input, {
                filter: "startswith",
                filterTitle: "custom"
            });

            assert.equal(dropdownlist.filterInput.attr("title"), "custom");
        });

        it("DropDownList adds aria-autocomplete to filter input", function() {
            var dropdownlist = new DropDownList(input, {
                filter: "startswith",
                filterTitle: "custom"
            });

            assert.equal(dropdownlist.filterInput.attr("aria-autocomplete"), "list");
        });

        it("DropDownList adds custom title to filter input", function() {
            var dropdownlist = new DropDownList(input, {
                filter: "startswith",
                filterTitle: "custom"
            });

            assert.equal(dropdownlist.filterInput.attr("title"), "custom");
        });

        it("DropDownList adds custom title to filter input", function() {
            var dropdownlist = new DropDownList(input, {
                filter: "startswith",
                filterTitle: "custom"
            });

            assert.equal(dropdownlist.filterInput.attr("title"), "custom");
        });

        it("DropDownList renders aria-activedescendant", function() {
            var dropdownlist = new DropDownList(input.attr("id", "test"), {
                filter: "startswith",
                dataSource: ["Item", "Item2"],
                animation: false
            });

            dropdownlist.open();

            assert.equal(dropdownlist.filterInput.attr("aria-activedescendant"), dropdownlist.current()[0].id);
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

        it("optionLabel has role option", function() {
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

            var optionLabel = dropdownlist.list.find(".k-list-optionlabel");

            assert.equal(optionLabel.attr("role"), "option");
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
