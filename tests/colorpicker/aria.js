(function() {
    var colorPicker;
    var element;

    module("colorpalette", {
        setup: function() {
            element = $("<div>").kendoColorPalette();
            colorPicker = element.data("kendoColorPalette");
        },
        teardown: function() {
            colorPicker.destroy();
        }
    });

    test("renders aria-label for each color", function(){
        element.find(".k-item").each(function(){
            var label = $(this).attr("aria-label");
            ok(label, "aria-label defined on cells"); // label defined
            var bg = $(this);
            var color = kendo.parseColor(label);
            bg = kendo.parseColor(bg.css("background-color"));
            ok(color && bg && color.equals(bg), "aria-label is same as background color");
        });
    });

    test("maintains aria-selected attribute consistent with selection", function(){
        var items = element.find(".k-item");

        equal(element.find("[aria-selected=true]").length, 0);

        items.last().click();

        var selected = element.find("[aria-selected=true]");
        ok(selected[0] === items.last()[0]);
        equal(selected.length, 1);
    });

    test("sets aria-activedescendant based on selection", function() {
        var lastColor = element.find(".k-item").last();

        lastColor.click();

        ok(element.is("[aria-activedescendant]"));
        equal(element.attr("aria-activedescendant"), lastColor.attr("id"));
    });

    test("renders role='row' for each tr", function() {
        var rows = element.find("tr");

        equal(rows.filter("[role=row]").length, rows.length);
    });

    test("renders role='gridcell' for each td", function() {
        var cells = element.find("td");

        equal(cells.filter("[role=gridcell]").length, cells.length);
    });

    module("color picker", {
        setup: function() {
            element = $("<input/>").kendoColorPicker();
            colorPicker = element.data("kendoColorPicker");
        },
        teardown: function() {
            colorPicker.destroy();
        }
    });

    test("renders role='textbox' to the wrapper", function() {
        var wrapper = colorPicker.wrapper;

        equal(wrapper.attr("role"), "textbox");
    });

    test("renders aria-haspopup='true' to the wrapper", function() {
        var wrapper = colorPicker.wrapper;

        equal(wrapper.attr("aria-haspopup"), "true");
    });

    test("render popup with id", function() {
        colorPicker.open();

        var popup = colorPicker._popup.element;

        ok(popup.attr("id"));
    });

    test("render aria-owns to the wrapper", function() {
        colorPicker.open();

        equal(colorPicker.wrapper.attr("aria-owns"), colorPicker._popup.element.attr("id"));
    });

    test("renders aria-disabled=false", function() {
        equal(colorPicker.wrapper.attr("aria-disabled"), "false");
    });

    test("renders aria-disabled=true", function() {
        colorPicker.enable(false);

        equal(colorPicker.wrapper.attr("aria-disabled"), "true");
        ok(!colorPicker.wrapper.attr("disabled"));
    });

    test("renders aria-label to the wrapper", function() {
        colorPicker.value("#f9d9ab");

        ok(colorPicker.wrapper.attr("aria-label").indexOf("#f9d9ab") !== -1);
    });
})();
