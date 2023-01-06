(function() {
    var dom;

    describe("kendo.ui.NumericTextBox MVVM - No CSP", function() {
        beforeEach(function() {


            window.textBoxChange = function() {
                assert.isOk(true);
            };
        });
        afterEach(function() {

            kendo.destroy(dom);

            delete window.textBoxChange;
        });

        it("floating label wraps the widget", function() {
            dom = $('<input data-role="numerictextbox" data-label="{ floating: true }"/>');

            kendo.bind(dom);

            assert.isOk(dom.data("kendoNumericTextBox").wrapper.parent().hasClass("k-floating-label-container"));
            assert.isOk(dom.data("kendoNumericTextBox").wrapper.parent().hasClass("k-empty"));
        });
    });
}());
