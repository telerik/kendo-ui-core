import '@progress/kendo-ui/src/kendo.colorpicker.js';

let colorPicker;
let element;

describe("color picker", function() {
    beforeEach(function() {
        element = $("<input/>").appendTo(Mocha.fixture).kendoColorPicker();
        colorPicker = element.data("kendoColorPicker");
        Mocha.fixture.attr("role", "main");
    });
    afterEach(function() {
        colorPicker.destroy();
    });

    it("renders role='textbox' to the wrapper", function() {
        let wrapper = colorPicker.wrapper;

        assert.equal(wrapper.attr("role"), "combobox");
    });

    it("renders aria-haspopup='true' to the wrapper", function() {
        let wrapper = colorPicker.wrapper;

        assert.equal(wrapper.attr("aria-haspopup"), "dialog");
    });

    it("render popup with id", function() {
        colorPicker.open();

        let popup = colorPicker._popup.element;

        assert.isOk(popup.attr("id"));
    });

    it("render aria-owns to the wrapper", function() {
        colorPicker.open();

        assert.equal(colorPicker.wrapper.attr("aria-controls"), colorPicker._popup.element.attr("id"));
    });

    it("renders aria-disabled=false", function() {
        assert.equal(colorPicker.wrapper.attr("aria-disabled"), "false");
    });

    it("renders aria-disabled=true", function() {
        colorPicker.enable(false);

        assert.equal(colorPicker.wrapper.attr("aria-disabled"), "true");
        assert.isOk(!colorPicker.wrapper.attr("disabled"));
    });

    it("renders aria-label to the wrapper", function() {
        colorPicker.value("#f9d9ab");

        assert.isOk(colorPicker.wrapper.attr("aria-label").indexOf("#f9d9ab") !== -1);
    });

    it("colorpicker is accessible with AXE", async function() {
        await axeRunFixture();
    });

    it("colorpicker popup is accessible with AXE", async function() {
        colorPicker.open();

        await axeRun(colorPicker._popup.element.closest(".k-animation-container").parent());
    });
});
