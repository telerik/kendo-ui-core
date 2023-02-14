(function() {
    var dom;

    describe("kendo.ui.MaskedTextBox MVVM - No CSP", function() {
        beforeEach(function() {


            window.maskedtextboxChange = function() {
                assert.isOk(true);
            };
        });
        afterEach(function() {

            kendo.destroy(dom);

            delete window.maskedtextboxChange;
        });

        it("floating label wraps the widget", function() {
            dom = $('<input data-role="maskedtextbox" data-label="{ floating: true }"/>');

            kendo.bind(dom);

            assert.isOk(dom.data("kendoMaskedTextBox").wrapper.parent().hasClass("k-floating-label-container"));
            assert.isOk(dom.data("kendoMaskedTextBox").wrapper.parent().hasClass("k-empty"));
        });
    });
}());
