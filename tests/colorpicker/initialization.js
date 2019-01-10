(function() {
    describe("FlatColorPicker", function() {
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("input: false does not show input", function() {
            var dom = $("<div />").appendTo(Mocha.fixture).kendoFlatColorPicker({ input: false });

            var input = dom.find(".k-color-value");

            assert.equal(input.css("visibility"), "hidden");
        });

        it("initialization from input nests it into wrapper", function() {
            var dom = $("<input name='foo' />").appendTo(Mocha.fixture).kendoColorPicker();

            assert.equal($(".k-colorpicker [name=foo]").length, 1);
        });

        it("maintains tabIndex after disable/enable", function() {
            var dom = $("<div tabindex='5' />").appendTo(Mocha.fixture).kendoFlatColorPicker();
            var cp = dom.data("kendoFlatColorPicker");
            cp.enable(false);
            cp.enable(true);
            assert.equal(cp.wrapper.attr("tabIndex"), 5);
        });

    });
}());


(function() {
    describe("ColorPicker", function() {
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("maintains tabIndex after disable/enable", function() {
            var dom = $("<input tabindex='5' />").appendTo(Mocha.fixture).kendoColorPicker();
            var cp = dom.data("kendoColorPicker");
            cp.enable(false);
            cp.enable(true);
            assert.equal(cp.wrapper.attr("tabIndex"), 5);
        });

        it("opens on click on an associated <label>", function() {
            expect(2);

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
                        assert.isOk(true)
                    }
                }).end()
                .find("label").click();
        });

        it("clicking on an associated label does not open a disabled ColorPicker", function() {
            expect(0);

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
                        assert.isOk(true)
                    }
                }).end()
                .find("label").click();
        });

        it("open() method does not open a disabled ColorPicker", function() {
            expect(0);

            var dom = $("<input disabled='disabled' />").appendTo(Mocha.fixture).kendoColorPicker({
                open: function() {
                    assert.isOk(true);
                }
            });
            var cp = dom.data("kendoColorPicker");

            cp.open();
        });

        it("toggle() method does not open a disabled ColorPicker", function() {
            expect(0);

            var dom = $("<input disabled='disabled' />").appendTo(Mocha.fixture).kendoColorPicker({
                open: function() {
                    assert.isOk(true);
                }
            });
            var cp = dom.data("kendoColorPicker");

            cp.toggle();
        });
    });
}());

(function() {
    describe("ColorPalette", function() {
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("maintains tabIndex after disable/enable", function() {
            var dom = $("<div tabindex='5' />").appendTo(Mocha.fixture).kendoColorPalette();
            var cp = dom.data("kendoColorPalette");
            cp.enable(false);
            cp.enable(true);
            assert.equal(cp.wrapper.attr("tabIndex"), 5);
        });
    });
}());
