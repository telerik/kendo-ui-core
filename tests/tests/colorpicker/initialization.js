import '@progress/kendo-ui/src/kendo.colorpicker.js';

describe("ColorPicker", function() {
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("maintains tabIndex after disable/enable", function() {
        let dom = $("<input tabindex='5' />").appendTo(Mocha.fixture).kendoColorPicker();
        let cp = dom.data("kendoColorPicker");
        cp.enable(false);
        cp.enable(true);
        assert.equal(cp.wrapper.attr("tabIndex"), 5);
    });

    it("opens on click on an associated <label>", function() {
        // embedded in <label>
        $("<label>ColorPicker: <input /></label>")
            .appendTo(Mocha.fixture)
            .find("input").kendoColorPicker({
                open: function() {
                    assert.isOk(true);
                }
            }).end()
            .click();

        // <label for="...">
        $("<div><label for='colorpicker'>ColorPicker:</label><input id='colorpicker' /></div>")
            .appendTo(Mocha.fixture)
            .find("input").kendoColorPicker({
                open: function() {
                    assert.isOk(true);
                }
            }).end()
            .find("label").click();
    });

    it("clicking on an associated label does not open a disabled ColorPicker", function() {
        // embedded in <label>
        $("<label>ColorPicker: <input /></label>")
            .appendTo(Mocha.fixture)
            .find("input").prop("disabled", true).kendoColorPicker({
                open: function() {
                    assert.isOk(true);
                }
            }).end()
            .click();

        // <label for="...">
        $("<div><label for='colorpicker'>ColorPicker:</label><input id='colorpicker' /></div>")
            .appendTo(Mocha.fixture)
            .find("input").prop("disabled", true).kendoColorPicker({
                open: function() {
                    assert.isOk(true);
                }
            }).end()
            .find("label").click();
    });

    it("open() method does not open a disabled ColorPicker", function() {
        let dom = $("<input disabled='disabled' />").appendTo(Mocha.fixture).kendoColorPicker({
            open: function() {
                assert.isOk(true);
            }
        });
        let cp = dom.data("kendoColorPicker");

        cp.open();
    });

    it("toggle() method does not open a disabled ColorPicker", function() {
        let dom = $("<input disabled='disabled' />").appendTo(Mocha.fixture).kendoColorPicker({
            open: function() {
                assert.isOk(true);
            }
        });
        let cp = dom.data("kendoColorPicker");

        cp.toggle();
    });

    it("receives k-disabled class when disabled", function() {
        let dom = $("<input disabled='disabled' />").appendTo(Mocha.fixture).kendoColorPicker();
        let cp = dom.data("kendoColorPicker");

        cp.enable(false);

        assert.isOk(cp.wrapper.hasClass("k-disabled"));
    });

    it("removes k-disabled class when enabled", function() {
        let dom = $("<input disabled='disabled' />").appendTo(Mocha.fixture).kendoColorPicker();
        let cp = dom.data("kendoColorPicker");

        cp.enable(false);
        cp.enable();

        assert.isOk(!cp.wrapper.hasClass("k-disabled"));
    });

    it("sets value when option is set", function() {
        const COLOR = "#008000";

        let dom = $("<input tabindex='5' />").appendTo(Mocha.fixture).kendoColorPicker({
            value: COLOR
        });
        assert.equal(dom.val(), COLOR);
    });

    it("sets value option with higher specificity when value attribute is declared", function() {
        const COLOR = "#008000";

        let dom = $("<input tabindex='5' color='red' />").appendTo(Mocha.fixture).kendoColorPicker({
            value: COLOR
        });

        assert.equal(dom.val(), COLOR);
    });
});
