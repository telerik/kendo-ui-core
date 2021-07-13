(function() {
    var TextArea = kendo.ui.TextArea,
        textarea;

    describe("kendo.ui.TextArea initialization", function() {
        beforeEach(function() {
            textarea = $("<textarea />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("Should render wrapper", function() {
            var widget = new TextArea(textarea),
                wrapper = widget.wrapper;

            assert.equal(wrapper[0].className, "k-widget k-textarea");
        });

        it("Should set placeholder", function() {
            var widget = new TextArea(textarea, {
                placeholder: "placeholder..."
            });

            assert.equal(widget.element.attr("placeholder"), "placeholder...");
        });

        it("Should set value", function() {
            var widget = new TextArea(textarea, {
                value: "test value"
            });

            assert.equal(widget.element.val(), "test value");
        });

        it("Should set disabled state", function() {
            var widget = new TextArea(textarea, {
                enable: false
            });

            assert.isOk(widget.wrapper.hasClass("k-state-disabled"));
        });

        it("Should set readonly state", function() {
            var widget = new TextArea(textarea, {
                readonly: true
            });

            assert.isOk(widget.wrapper.hasClass("k-state-readonly"));
        });

        it("Should get value from textarea", function() {
            var widget = new TextArea(textarea.val("12"));

            assert.equal(widget.value(), 12);
            assert.equal(widget.element.val(), "12");
        });

        it("Bind change events", function() {
            var widget = new TextArea(textarea.val("12"), {
                change: function() { }
            });

            assert.equal(widget._events["change"][0], widget.options.change);
        });

        it("TextArea gets the placeholder value from the element", function() {
            textarea.attr("placeholder", "Select...");
            var widget = new TextArea(textarea);

            assert.equal(widget.options.placeholder, "Select...");
        });

        it("TextArea gets the disabled state from the element", function() {
            textarea.attr("disabled", "");
            var widget = new TextArea(textarea);

            assert.equal(widget.options.enable, false);
        });

        it("TextArea gets the readonly state from the element", function() {
            textarea.attr("readonly", "");
            var widget = new TextArea(textarea);

            assert.equal(widget.options.readonly, true);
        });

        it("copy textarea className to the wrapper", function() {
            var widget = new TextArea(textarea.addClass("test"));

            assert.isOk(widget.wrapper.hasClass("test"));
        });

        it("sets the width of the textarea to 100%", function() {
            var widget = new TextArea(textarea.css("width", "200px"));

            assert.equal(widget.wrapper[0].style.width, "200px");
            assert.equal(widget.element[0].style.width, "100%");
        });

        it("sets the k-state-focused class on focusin", function() {
            var widget = new TextArea(textarea);

            widget.element[0].focus();

            assert.isOk(widget.wrapper.hasClass("k-state-focused"));
        });

        it("removes the k-state-focused class on focusout", function() {
            var widget = new TextArea(textarea);

            widget.element[0].focus();
            widget.element.blur();

            assert.isNotOk(widget.wrapper.hasClass("k-state-focused"));
        });

        it("form reset support", function(done) {
            textarea.text("test");

            var form = $("<form/>").appendTo(Mocha.fixture).append(textarea),
                widget = new TextArea(textarea);

            widget.value("other value");

            form[0].reset();

            setTimeout(function() {
                assert.equal(widget.element.val(), "test");
                done();
            }, 200);
        });

        it("Should set maxlength", function() {
            var widget = new TextArea(textarea, {
                maxLength: 42
            });

            assert.equal(widget.element.attr("maxlength"), 42);
        });

        it("Should set rows", function() {
            var widget = new TextArea(textarea, {
                rows: 42
            });

            assert.equal(widget.element.attr("rows"), 42);
        });

        it("Should set resize inline style when resizable is specified", function() {
            var widget = new TextArea(textarea, {
                resizable: "both"
            });

            assert.isOk(widget.element.attr("style").indexOf("both") !== -1);
        });
    });
}());
