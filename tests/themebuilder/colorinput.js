(function() {
    var ThemeBuilder = kendo.ThemeBuilder,
        LessTheme = kendo.LessTheme;

    var colorInput;

    module("themebuilder color input", {
        setup: function() {
            colorInput = $("<input />").appendTo(QUnit.fixture).kendoColorInput();
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("changing input value changes preview bgcolor", function() {
        var colorIndicator = colorInput.closest(".k-widget").find(".k-i-arrow-s"),
            colorInputControl = colorInput.data("kendoColorInput");

        colorInputControl.value("#000000");
        colorInputControl.trigger("change");

        equal(kendo.parseColor(colorIndicator.css("backgroundColor")).toHex(), "000000");
    });

    test("changing input value to friendly name converts it to hex", function() {
        var color = "red",
            colorInputControl = colorInput.data("kendoColorInput");

        colorInputControl.value(color);
        colorInputControl.trigger("change");

        equal(colorInputControl.value(), "#ff0000");
    });

    test("clearing the input restores previous value", function() {
        var colorInputControl = colorInput.data("kendoColorInput");

        colorInputControl.value("#ff1ff1");
        colorInputControl.trigger("change");
        colorInputControl.value("");
        colorInputControl.trigger("change");

        var litmus = $("<div />").appendTo(QUnit.fixture);

        equal(colorInputControl.value(), litmus.css("backgroundColor"));

        litmus.remove();
    });

    test("preview bgcolor is changed upon init", function() {
        colorInput = $("<input value='#ff0000' />").appendTo(QUnit.fixture).kendoColorInput();

        equal(kendo.parseColor(colorInput.closest(".k-widget").find(".k-i-arrow-s").css("backgroundColor")).toHex(), "ff0000");
    });

    test("change handler is called only once on change", function() {
        var called = 0;

        colorInput = $("<input value='#ff0000' />").appendTo(QUnit.fixture).kendoColorInput({
                change: function() {
                    called++;
                }
            });


        colorInput.data("kendoColorInput").trigger("change");

        equal(called, 1);
    });

    test("accepts rgba values", function() {
        colorInput = $("<input value='rgba(0,0,0,.25)' />").appendTo(QUnit.fixture).kendoColorInput();

        equal(kendo.parseColor(colorInput.closest(".k-widget").find(".k-input").val()).toCssRgba(), "rgba(0, 0, 0, 0.25)");
    });

    test("value() updates color preview", function() {
        colorInput = $("<input value='#f00' />").appendTo(QUnit.fixture).kendoColorInput();

        colorInput.data("kendoColorInput").value("#000");

        equal(kendo.parseColor(colorInput.closest(".k-widget").find(".k-icon").css("backgroundColor")).toHex(), "000000");
    });
})();
