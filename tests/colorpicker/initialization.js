(function() {
    module("FlatColorPicker", {
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        },
    });

    test("input: false does not show input", function() {
        var dom = $("<div />").appendTo(QUnit.fixture).kendoFlatColorPicker({ input: false });

        var input = dom.find(".k-color-value");

        equal(input.css("visibility"), "hidden");
    });

    test("initialization from input nests it into wrapper", function() {
        var dom = $("<input name='foo' />").appendTo(QUnit.fixture).kendoColorPicker();

        equal($(".k-colorpicker [name=foo]").length, 1);
    });

    test("maintains tabIndex after disable/enable", function(){
        var dom = $("<div tabindex='5' />").appendTo(QUnit.fixture).kendoFlatColorPicker();
        var cp = dom.data("kendoFlatColorPicker");
        cp.enable(false);
        cp.enable(true);
        equal(cp.wrapper.attr("tabIndex"), 5);
    });

})();


(function(){
    module("ColorPicker", {
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        },
    });

    test("maintains tabIndex after disable/enable", function(){
        var dom = $("<input tabindex='5' />").appendTo(QUnit.fixture).kendoColorPicker();
        var cp = dom.data("kendoColorPicker");
        cp.enable(false);
        cp.enable(true);
        equal(cp.wrapper.attr("tabIndex"), 5);
    });
})();


(function(){
    module("ColorPalette", {
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        },
    });

    test("maintains tabIndex after disable/enable", function(){
        var dom = $("<div tabindex='5' />").appendTo(QUnit.fixture).kendoColorPalette();
        var cp = dom.data("kendoColorPalette");
        cp.enable(false);
        cp.enable(true);
        equal(cp.wrapper.attr("tabIndex"), 5);
    });
})();
