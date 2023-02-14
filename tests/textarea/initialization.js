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

            assert.equal(wrapper[0].className, "k-input k-textarea k-input-solid k-input-md k-rounded-md k-resize-none");
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

            assert.isOk(widget.wrapper.hasClass("k-disabled"));
        });

        it("Should set readonly state", function() {
            var widget = new TextArea(textarea, {
                readonly: true
            });

            assert.isOk(widget.wrapper.hasClass("k-readonly"));
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

        it("sets the k-focus class on focusin", function() {
            var widget = new TextArea(textarea);

            widget.element[0].focus();

            assert.isOk(widget.wrapper.hasClass("k-focus"));
        });

        it("removes the k-focus class on focusout", function() {
            var widget = new TextArea(textarea);

            widget.element[0].focus();
            widget.element.blur();

            assert.isNotOk(widget.wrapper.hasClass("k-focus"));
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

        it("styling options - fillMode", function() {
            var widget = new TextArea(textarea, {
                fillMode: "outline"
            });

            assert.isOk(widget.wrapper.hasClass("k-input-outline"));
        });

        it("styling options - size", function() {
            var widget = new TextArea(textarea, {
                size: "small"
            });

            assert.isOk(widget.wrapper.hasClass("k-input-sm"));
        });

        it("styling options - rounded", function() {
            var widget = new TextArea(textarea, {
                rounded: "large"
            });

            assert.isOk(widget.wrapper.hasClass("k-rounded-lg"));
        });

        it("styling options - resize", function() {
            var widget = new TextArea(textarea, {
                resize: "both"
            });

            assert.isOk(widget.wrapper.hasClass("k-resize-both"));
        });

        it("styling options - resize none", function() {
            var widget = new TextArea(textarea, {
                resize: "none"
            });

            assert.isOk(widget.wrapper.hasClass("k-resize-none"));
        });

        it("styling options - overflow", function() {
            var widget = new TextArea(textarea, {
                overflow: "hidden"
            });

            assert.isOk(widget.element.hasClass("!k-overflow-hidden"));
        });

        it("default overflow class check", function() {
            var widget = new TextArea(textarea, {});

            assert.isOk(widget.element.hasClass("!k-overflow-auto"));
        });

        for (const overflowOption of ["auto", "hidden", "visible", "scroll", "clip"]) {
            it("apply important overflow class check - " + overflowOption, function() {
                let widget = new TextArea(textarea, { overflow: overflowOption });

                assert.isOk(widget.element.hasClass(`!k-overflow-${overflowOption}`));
            });
        }

        it("overflow none class check", function() {
            var widget = new TextArea(textarea, { overflow: "none" });

            assert.isNotOk(widget.element.hasClass(`!k-overflow-none`));
            assert.isNotOk(widget.element.hasClass(`!k-overflow-auto`));
            assert.isNotOk(widget.element.hasClass(`!`));
        });

        it("styling options - checks for valid options", function() {
            var widget = new TextArea(textarea, {
                size: "full"
            });

            assert.isNotOk(widget.wrapper.hasClass("k-rounded-full")); // Does not add valid class for other option
            assert.isNotOk(widget.wrapper.hasClass("k-input-full")); // Does not add invalid class with prefix
            assert.isNotOk(widget.wrapper.hasClass("k-input-md")); // Does not add default class for the option
            assert.isOk(widget.wrapper.hasClass("k-rounded-md")); // Adds default class for other options
        });
    });
}());
