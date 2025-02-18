import '@progress/kendo-ui/src/kendo.textarea.js';

let TextArea = kendo.ui.TextArea,
    textarea;

describe("kendo.ui.TextArea ARIA", function() {
    beforeEach(function() {
        textarea = $("<textarea />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("initialization adds an aria-disabled false attribute", function() {
        let widget = new TextArea(textarea);

        assert.equal(widget.element.attr("aria-disabled"), "false");
    });

    it("initialization adds an aria-disabled true attribute when enable: false", function() {
        let widget = new TextArea(textarea, {
            enable: false
        });

        assert.equal(widget.element.attr("aria-disabled"), "true");
    });
});

describe("kendo.ui.TextArea AXE", function() {
    beforeEach(function() {
        $("<textarea />").appendTo(Mocha.fixture);
        textarea = $(Mocha.fixture).find("textarea");
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("TextArea is accessible", async function() {
        let widget = new TextArea(textarea, {
            label: {
                content: "Text"
            }
        });

        await axeRunFixture();
    });
});
