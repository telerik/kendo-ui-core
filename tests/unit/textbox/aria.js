import '@progress/kendo-ui/src/kendo.textbox.js';

let TextBox = kendo.ui.TextBox,
    input;

describe("kendo.ui.TextBox ARIA", function() {
    beforeEach(function() {
        input = $("<input />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("initialization adds an aria-disabled false attribute", function() {
        let textbox = new TextBox(input);

        assert.equal(textbox.element.attr("aria-disabled"), "false");
    });

    it("initialization adds an aria-disabled true attribute when enable: false", function() {
        let textbox = new TextBox(input, {
            enable: false
        });

        assert.equal(textbox.element.attr("aria-disabled"), "true");
    });
});

describe("kendo.ui.TextBox AXE", function() {
    beforeEach(function() {
        $("<input />").appendTo(Mocha.fixture);
        input = $(Mocha.fixture).find("input");
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("TextBox is accessible", async function() {
        let textbox = new TextBox(input, {
            label: {
                content: "Name",
                floating: true
            }
        });

        await axeRunFixture();
    });
});
