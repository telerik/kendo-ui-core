(function() {
    var TextBox = kendo.ui.TextBox,
        input;

    describe("kendo.ui.TextBox initialization", function() {
        beforeEach(function() {
            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("Should render wrapper", function() {
            var textbox = new TextBox(input),
                wrapper = textbox.wrapper;

            assert.equal(wrapper[0].className, "k-widget k-textbox");
        });

        it("Should set placeholder", function() {
            var textbox = new TextBox(input, {
                placeholder: "placeholder..."
            });

            assert.equal(textbox.element.attr("placeholder"), "placeholder...");
        });

        it("Should set value", function() {
            var textbox = new TextBox(input, {
                value: "test value"
            });

            assert.equal(textbox.element.val(), "test value");
        });

        it("Should set disabled state", function() {
            var textbox = new TextBox(input, {
                enable: false
            });

            assert.isOk(textbox.wrapper.hasClass("k-state-disabled"));
        });

        it("Should set readonly state", function() {
            var textbox = new TextBox(input, {
                readonly: true
            });

            assert.isOk(textbox.wrapper.hasClass("k-no-click"));
        });

        it("Should get value from input", function() {
            var textbox = new TextBox(input.val("12"));

            assert.equal(textbox.value(), 12);
            assert.equal(textbox.element.val(), "12");
        });

        it("Bind change events", function() {
            var textbox = new TextBox(input.val("12"), {
                change: function() { }
            });

            assert.equal(textbox._events["change"][0], textbox.options.change);
        });

        it("TextBox gets the placeholder value from the element", function() {
            input.attr("placeholder", "Select...");
            var textbox = new TextBox(input);

            assert.equal(textbox.options.placeholder, "Select...");
        });

        it("TextBox gets the disabled state from the element", function() {
            input.attr("disabled", "");
            var textbox = new TextBox(input);

            assert.equal(textbox.options.enable, false);
        });

        it("TextBox gets the readonly state from the element", function() {
            input.attr("readonly", "");
            var textbox = new TextBox(input);

            assert.equal(textbox.options.readonly, true);
        });

        it("copy input className to the wrapper", function() {
            var textbox = new TextBox(input.addClass("test"));

            assert.isOk(textbox.wrapper.hasClass("test"));
        });

        it("sets the width of the input to 100%", function() {
            var textbox = new TextBox(input.css("width", "200px"));

            assert.equal(textbox.wrapper[0].style.width, "200px");
            assert.equal(textbox.element[0].style.width, "100%");
        });

        it("sets the k-state-focused class on focusin", function() {
            var textbox = new TextBox(input);

            textbox.element[0].focus();

            assert.isOk(textbox.wrapper.hasClass("k-state-focused"));
        });

        it("removes the k-state-focused class on focusout", function() {
            var textbox = new TextBox(input);

            textbox.element[0].focus();
            textbox.element.blur();

            assert.isNotOk(textbox.wrapper.hasClass("k-state-focused"));
        });

        it("form reset support", function(done) {
            input.attr("value", "test");

            var form = $("<form/>").appendTo(Mocha.fixture).append(input),
                textbox = new TextBox(input);

            textbox.value("other value");

            form[0].reset();

            setTimeout(function() {
                assert.equal(textbox.element.val(), "test");
                done();
            }, 200);
        });
    });
}());
