import '@progress/kendo-ui/src/kendo.autocomplete.js';

let AutoComplete = kendo.ui.AutoComplete,
    input;

    describe("autocomplete WAI-ARIA with AXE", function() {
        beforeEach(function() {
            kendo.effects.disable();
            input = $("<input id='ac'>").appendTo(Mocha.fixture);
            $("<label for='ac'>Label</label>").appendTo(Mocha.fixture);
            Mocha.fixture.attr("role", "main");
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("AutoComplete with placeholder is accessible", async function() {
            let autocomplete = new AutoComplete(input, {
                dataSource: [ "foo", "bar" ]
            });

            await axeRunFixture();
        });

        it("Autocomplete with DataSource is accessible", async function() {
            let autocomplete = new AutoComplete(input, {
                dataSource: ["Item"],
                suggest: false
            });

            await axeRunFixture();
        });

        // Fails because of the aria-expanded attribute on a role="textbox" element
        it("Autocomplete with search term is accessible", async function() {
            let autocomplete = new AutoComplete(input, {
                dataSource: ["Item"],
                suggest: false
            });

            autocomplete.search("I");

            await axeRunFixture();
        });

        it("Autocomplete with search term has accessible popup", async function() {
            let autocomplete = new AutoComplete(input, {
                dataSource: ["Item"],
                suggest: false
            });

            autocomplete.search("I");

            await axeRun(autocomplete.popup.element[0]);
        });

        it("Autocomplete with value is accessible", async function() {
            let autocomplete = new AutoComplete(input, {
                dataSource: ["Item"],
                value: "Item"
            });

            await axeRunFixture();
        });

        it("Autocomplete with templates has accessible popup", async function() {
            let autocomplete = new AutoComplete(input, {
                dataSource: ["Item"],
                suggest: false,
                footerTemplate: () => 'Total items found',
                headerTemplate: () => 'Total items found'
            });

            autocomplete.search("I");

            await axeRun(autocomplete.popup.element.closest(".k-animation-container").parent());
        });
    });

    describe("autocomplete WAI-ARIA roles and attributes", function() {
        beforeEach(function() {
            kendo.effects.disable();
            input = $("<input>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("AutoComplete adds ARIA role='textbox'", function() {
            let autocomplete = new AutoComplete(input, {
                placeholder: "Select..."
            });

            assert.equal(autocomplete.element.attr("role"), "combobox");
        });

        it("Autocomplete has aria-controls", function() {
            let autocomplete = new AutoComplete(input.attr("id", "test"), {
                placeholder: "Select..."
            });

            assert.equal(autocomplete.element.attr("aria-controls"), autocomplete.ul.attr("id"));
        });

        it("AutoComplete adds aria-autocomplete='both'", function() {
            let autocomplete = new AutoComplete(input.attr("id", "test"), {
                placeholder: "Select...",
                suggest: true
            });

            assert.equal(autocomplete.element.attr("aria-autocomplete"), "both");
        });

        it("AutoComplete adds aria-autocomplete='list' if no suggest", function() {
            let autocomplete = new AutoComplete(input.attr("id", "test"), {
                placeholder: "Select...",
                suggest: false
            });

            assert.equal(autocomplete.element.attr("aria-autocomplete"), "list");
        });

        it("Autocomplete sets tabindex", function() {
            let autocomplete = new AutoComplete(input.attr("id", "test"), {
                placeholder: "Select...",
                suggest: false
            });

            assert.equal(autocomplete.element.prop("tabIndex"), "0");
        });

        it("Autocomplete preserves tab order", function() {
            let autocomplete = new AutoComplete(input.attr("tabIndex", "2"), {
                placeholder: "Select...",
                suggest: false
            });

            assert.equal(autocomplete.element.attr("tabIndex"), "2");
        });

        it("Autocomplete adds aria-disabled=false", function() {
            let autocomplete = new AutoComplete(input.attr("tabIndex", "2"), {
                placeholder: "Select...",
                suggest: false
            });

            assert.equal(autocomplete.element.attr("aria-disabled"), "false");
        });

        it("Autocomplete adds aria-disabled=true", function() {
            let autocomplete = new AutoComplete(input.attr("tabIndex", "2"), {
                placeholder: "Select...",
                suggest: false,
                enable: false
            });

            assert.equal(autocomplete.element.attr("aria-disabled"), "true");
        });

        it("Autocomplete adds aria-expanded", function() {
            let autocomplete = new AutoComplete(input, {
                placeholder: "Select...",
                dataSource: ["Item"],
                suggest: false
            });

            autocomplete.search("I");

            assert.equal(autocomplete.element.attr("aria-expanded"), "true");
        });

        it("Autocomplete renders aria-activedescendant", function() {
            let autocomplete = new AutoComplete(input, {
                dataSource: ["Item", "Item2"],
                animation: false,
                highlightFirst: true,
                suggest: true
            });

            autocomplete.search("Item");

            assert.isOk(!!autocomplete.element.attr("aria-activedescendant"));
            assert.equal(autocomplete.element.attr("aria-activedescendant"), autocomplete.current()[0].id);
        });
    });