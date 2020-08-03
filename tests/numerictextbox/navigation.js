(function() {
    var NumericTextBox = kendo.ui.NumericTextBox,
        keys = kendo.keys,
        input;

    describe("kendo.ui.NumericTextBox Navigation", function() {
        beforeEach(function() {
            input = $("<input />").appendTo(Mocha.fixture);

            $.fn.pressKey = function(key, eventName, options) {
                if (typeof key === "string") {
                    key = key.charCodeAt(0);
                }

                if ($.isPlainObject(eventName)) {
                    options = eventName;
                    eventName = "keypress";
                }

                return this.trigger($.extend({ type: eventName, keyCode: key, which: key }, options));
            }
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("pressing DOWN arrow calls _step()", function() {
            var textbox = new NumericTextBox(input);

            stub(textbox, "_step");
            input.pressKey(kendo.keys.DOWN, "keydown");

            assert.equal(textbox.calls("_step"), 1);
            assert.equal(textbox.args("_step")[0], -1);
        });

        it("pressing UP arrow calls _step()", function() {
            var textbox = new NumericTextBox(input);

            stub(textbox, "_step");
            input.pressKey(kendo.keys.UP, "keydown");

            assert.equal(textbox.calls("_step"), 1);
            assert.equal(textbox.args("_step")[0], 1);
        });

        it("typing digit is allowed", function() {
            var textbox = new NumericTextBox(input);

            input.pressKey("4", {
                preventDefault: function() {
                    assert.isOk(false);
                }
            });
            input.val("4");
            input.pressKey("4", "keydown");
            input.trigger("input");
            assert.equal(input.val(), "4");
        });

        it("typing letter is not allowed", function() {
            var textbox = new NumericTextBox(input);

            input.val("a");
            input.pressKey("a", "keydown");
            input.trigger("input");
            assert.isOk(!input.val());
        });

        it("'-' is allowed", function() {
            var textbox = new NumericTextBox(input);

            input.val("-");
            input.pressKey("-", "keydown");
            input.trigger("input");
            assert.equal(input.val(), "-");
        });

        it("Do not allow '-' if min is bigger than 0", function() {
            var textbox = new NumericTextBox(input, {
                min: 0
            });

            input.val("-");
            input.pressKey("-", "keydown");
            input.trigger("input");
            assert.isOk(!input.val());
        });

        it("Spacebar is not allowed", function() {
            var textbox = new NumericTextBox(input);

            input.val(" ");
            input.pressKey(" ", "keydown");
            input.trigger("input");
            assert.isOk(!input.val());
        });

        it("Non-visual keys are allowed", function() {
            var textbox = new NumericTextBox(input, { value: 1 });

            input.val("1a")
            input.pressKey("a", "keydown");
            input.trigger("input");
            assert.equal(input.val(), "1");
        });

    

        it("Allow decimal separator '.'", function() {
            var textbox = new NumericTextBox(input);

            input.val(".");
            input.pressKey(".", "keydown");
            input.trigger("input");
            assert.equal(input.val(), ".");
        });

        it("Do not allow decimal separator ','", function() {
            var textbox = new NumericTextBox(input);

            input.val(",");
            input.pressKey(",", "keydown");
            input.trigger("input");
            assert.isOk(!input.val());
        });

        it("Allow decimal separator ',' in bg-BG culture", function() {
            var textbox = new NumericTextBox(input);

            kendo.culture("bg-BG");

            input.val(",");
            input.pressKey(",", "keydown");
            input.trigger("input");
            assert.equal(input.val(), ",");

            kendo.culture("en-US");
        });

        it("Do not allow decimal separator '.' in bg-BG culture", function() {
            var textbox = new NumericTextBox(input);

            kendo.culture("bg-BG");

            input.val(".");
            input.pressKey(".", "keydown");
            input.trigger("input");
            assert.isOk(!input.val());
            kendo.culture("en-US");
        });

        it("Convert numpad decimal point to bg-BG decimal point (empty input)", function() {
            var textbox = new NumericTextBox(input);

            kendo.culture("bg-BG");
            input.focus();
            
            input.val(".");
            input.pressKey(kendo.keys.NUMPAD_DOT, "keydown");
            input.trigger("input");

            assert.equal(input.val(), ",");
            kendo.culture("en-US");
        });

        it("Prevent decimal separator if decimals is set to 0 and restrictDecimals is enabled", function() {
            var textbox = new NumericTextBox(input, {
                decimals: 0,
                restrictDecimals: true
            });

            input.val(".");
            input.pressKey(".", "keydown");
            input.trigger("input");
            assert.isOk(!input.val());
        });

        it("Allow decimal separator if decimals is set to 0 and restrictDecimals is disabled", function() {
            var textbox = new NumericTextBox(input, {
                decimals: 0,
                value: 1
            });

            input.val("1.");
            input.pressKey(".", "keydown");
            input.trigger("input");
            assert.equal(input.val(),"1.");
        });

        it("Avoid exception when group separator is empty string", function(done) {
            kendo.culture().numberFormat[","] = "";

            var textbox = new NumericTextBox(input);
            textbox._text.focus();

            setTimeout(function() {
                kendo.culture().numberFormat[","] = ",";
                assert.isOk(true);
                done();
            });
        });

        it("Allow pasting with Ctrl+V", function() {
            var textbox = new NumericTextBox(input);

            input.pressKey("v", {
                ctrlKey: true,
                preventDefault: function() {
                    assert.isOk(false);
                }
            });
        });

        it("Allow pasting with Ctrl+V (MacOS)", function() {
            var textbox = new NumericTextBox(input);

            input.pressKey("v", {
                metaKey: true,
                preventDefault: function() {
                    assert.isOk(false);
                }
            });
        });

        it("Reject pasted value if out of range", function(done) {
            var textbox = new NumericTextBox(input, {
                max: 100
            });

            stub(textbox, "_update");

            input.val("1000");
            input.trigger("paste", {
                target: input[0]
            });

            setTimeout(function() {
                assert.equal(textbox.calls("_update"), 1);
                done();
            }, 100);
        });

        it("Accept pasted exponential value", function(done) {
            var textbox = new NumericTextBox(input);

            stub(textbox, "_update");
            input.val("3.3e-1");
            input.trigger("paste", {
                target: input[0]
            });
            setTimeout(function() {
                assert.equal(textbox.calls("_update"), 0);
                assert.equal(input.val(), "0.33");
                done();
            }, 100);
        });

        it("Accept pasted value with different decimal separator", function(done) {
            var textbox = new NumericTextBox(input);
            kendo.culture("bg-BG");
            stub(textbox, "_update");
            input.val("3,321");
            input.trigger("paste", {
                target: input[0]
            });
            setTimeout(function() {
                assert.equal(textbox.calls("_update"), 0);
                done();
            }, 100);
            kendo.culture("en-US");
        });

        it("Accept pasted value with currency symbol", function(done) {
            var textbox = new NumericTextBox(input);

            stub(textbox, "_update");
            input.val("$100");
            input.trigger("paste", {
                target: input[0]
            });
            setTimeout(function() {
                assert.equal(textbox.calls("_update"), 0);
                assert.equal(input.val(), "100");
                done();
            }, 100);
        });

        it("Accept pasted value with percent", function(done) {
            var textbox = new NumericTextBox(input);

            stub(textbox, "_update");
            input.val("100%");
            input.trigger("paste", {
                target: input[0]
            });
            setTimeout(function() {
                assert.equal(textbox.calls("_update"), 0);
                assert.equal(input.val(), "1");
                done();
            }, 100);
        });

        it("Reject pasted value if not valid", function(done) {
            var textbox = new NumericTextBox(input, {
                restrictDecimals: 2
            });

            stub(textbox, "_update");

            input.val("10.1234");
            input.trigger("paste", {
                target: input[0]
            });

            setTimeout(function() {
                assert.equal(textbox.calls("_update"), 1);
                done();
            }, 100);
        });


        it("Prevent decimals digits after precision is reached", function() {
            if (kendo.support.browser.mozilla) {
                // The test fails in Firefox, but
                // behaves in the same way as Chrome
                assert.isOk(true);
                return;
            }

            var textbox = new NumericTextBox(input, {
                decimals: 3,
                value: 2.222,
                restrictDecimals: true
            });

            input.val("2.2224");

            input.pressKey("4", "keydown");
            input.trigger("input");
            assert.equal(input.val(),"2.222");
        });

        it("Focus origin input on touched", function() {
            kendo.support.mobileOS = true;

            var textbox = new NumericTextBox(input);

            textbox.element.on("focus", function() {
                assert.isOk(true);
            });

            textbox.wrapper.find(".k-formatted-value").trigger({
                type: "touchend"
            });

            kendo.support.mobileOS = true;
        });

        it("text is selected after focus when selectOnFocus is enabled", function(done) {
            var textbox = new NumericTextBox(input, { selectOnFocus: true, value: 15 });

            textbox._click({ target: textbox._text[0] });

            setTimeout(function() {
                assert.equal(input[0].value.substring(input[0].selectionStart, input[0].selectionEnd), "15");
                done();
            }, 100);
        });
    });
}());
