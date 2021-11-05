(function() {
    describe("events", function () {
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        function createPicker(options) {
            return $("<input name='foo' />").appendTo(Mocha.fixture).kendoColorPicker(options);
        }

        function selectColor(colorpicker) {
            colorpicker.open();

            colorpicker._selector._select(kendo.parseColor("#f11f11"));
        }

        it("triggers change on input element when selecting color", function() {
            var dom = createPicker();

            var callback = spy();

            dom.bind("change", callback);

            selectColor(dom.data("kendoColorPicker"));

            assert.equal(callback.calls, 1);
        });

        it("does not trigger change when color is not changed", function() {
            var dom = createPicker({ value: "#f11f11" });

            var callback = spy();

            dom.bind("change", callback);

            selectColor(dom.data("kendoColorPicker"));

            assert.isOk(!callback.calls);
        });
    });

    describe("FlatColorPicker - events", function () {
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        function createPicker(options) {
            return $("<div name='foo' ></div>").appendTo(Mocha.fixture).kendoFlatColorPicker(options).data("kendoFlatColorPicker");
        }

        function selectColor(colorpicker) {
            colorpicker._select(kendo.parseColor("#f11f11"));
        }

        it("triggers change on input element when selecting color", function() {
            var picker = createPicker();

            var callback = spy();

            picker.bind("change", callback);

            selectColor(picker);

            assert.equal(callback.calls, 1);
        });

        it("does not trigger change when color is not changed", function() {
            var picker = createPicker({ value: "#f11f11" });

            var callback = spy();

            picker.bind("change", callback);

            selectColor(picker);

            assert.isOk(!callback.calls);
        });

        it("Trigger select and change when no autoupdate", function() {
            var picker = createPicker({ autoupdate: false, buttons: true });

            var callback = spy();
            var changeCallback = spy();

            picker.bind("select", callback);
            picker.bind("change", changeCallback);

            picker.element.find("[data-role=textbox]").val("#f00");
            picker.element.find("[data-role=textbox]").trigger("blur");
            picker.element.find("button.k-coloreditor-apply").trigger("click");

            assert.equal(callback.calls, 1);
            assert.equal(changeCallback.calls, 1);
        });

        it("Trigger cancel event", function() {
            var picker = createPicker({ autoupdate: false, buttons: true });

            var callback = spy();
            var changeCallback = spy();
            var cancelCallback = spy();

            picker.bind("select", callback);
            picker.bind("change", changeCallback);
            picker.bind("cancel", cancelCallback);

            picker.element.find("[data-role=textbox]").val("#f00");
            picker.element.find("[data-role=textbox]").trigger("blur");
            picker.element.find("button.k-coloreditor-cancel").trigger("click");

            assert.equal(callback.calls, 1);
            assert.equal(changeCallback.calls, 0);
            assert.equal(cancelCallback.calls, 1);
        });
    });
}());
