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
})();
