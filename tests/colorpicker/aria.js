(function() {
    var colorPicker;
    var element;

    describe("colorpalette", function() {
        beforeEach(function() {
            element = $("<div>").kendoColorPalette();
            colorPicker = element.data("kendoColorPalette");
        });
        afterEach(function() {
            colorPicker.destroy();
        });

        it("renders aria-label for each color", function() {
            element.find(".k-item").each(function() {
                var label = $(this).attr("aria-label");
                assert.isOk(label, "aria-label defined on cells"); // label defined
                var bg = $(this);
                var color = kendo.parseColor(label);
                bg = kendo.parseColor(bg.css("background-color"));
                assert.isOk(color && bg && color.equals(bg), "aria-label is same as background color");
            });
        });

        it("maintains aria-selected attribute consistent with selection", function() {
            var items = element.find(".k-item");

            assert.equal(element.find("[aria-selected=true]").length, 0);

            items.last().click();

            var selected = element.find("[aria-selected=true]");
            assert.isOk(selected[0] === items.last()[0]);
            assert.equal(selected.length, 1);
        });

        it("sets aria-activedescendant based on selection", function() {
            var lastColor = element.find(".k-item").last();

            lastColor.click();

            assert.isOk(element.is("[aria-activedescendant]"));
            assert.equal(element.attr("aria-activedescendant"), lastColor.attr("id"));
        });

        it("renders role='row' for each tr", function() {
            var rows = element.find("tr");

            assert.equal(rows.filter("[role=row]").length, rows.length);
        });

        it("renders role='gridcell' for each td", function() {
            var cells = element.find("td");

            assert.equal(cells.filter("[role=gridcell]").length, cells.length);
        });
    });

    describe("color picker", function() {
        beforeEach(function() {
            element = $("<input/>").kendoColorPicker();
            colorPicker = element.data("kendoColorPicker");
        });
        afterEach(function() {
            colorPicker.destroy();
        });

        it("renders role='textbox' to the wrapper", function() {
            var wrapper = colorPicker.wrapper;

            assert.equal(wrapper.attr("role"), "textbox");
        });

        it("renders aria-haspopup='true' to the wrapper", function() {
            var wrapper = colorPicker.wrapper;

            assert.equal(wrapper.attr("aria-haspopup"), "true");
        });

        it("render popup with id", function() {
            colorPicker.open();

            var popup = colorPicker._popup.element;

            assert.isOk(popup.attr("id"));
        });

        it("render aria-owns to the wrapper", function() {
            colorPicker.open();

            assert.equal(colorPicker.wrapper.attr("aria-owns"), colorPicker._popup.element.attr("id"));
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
    });

    describe("flatcolorpicker", function() {
        beforeEach(function() {
            element = $("<div>").kendoFlatColorPicker({
                preview: true
            });
            colorPicker = element.data("kendoFlatColorPicker");
        });
        afterEach(function() {
            colorPicker.destroy();
        });

        it("renders aria-label to the slider", function() {
            var ariaLabel = colorPicker.wrapper.find(".k-hue-slider input").attr("aria-label");
            assert.isOk(ariaLabel === "hue saturation");
        });

        it("renders title to the preview input", function() {
            var ariaLabel = colorPicker.wrapper.find(".k-color-value").attr("title");
            assert.isOk(ariaLabel === "Color Hexadecimal Code");
        });

    });
}());
