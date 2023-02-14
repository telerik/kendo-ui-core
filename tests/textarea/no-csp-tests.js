(function() {
    var dom;

    describe("kendo.ui.TextArea MVVM", function() {
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
            dom = $('<textarea data-role="textarea" data-label="{ floating: true }"/>');

            kendo.bind(dom);

            assert.isOk(dom.data("kendoTextArea").wrapper.parent().hasClass("k-floating-label-container"));
            assert.isOk(dom.data("kendoTextArea").wrapper.parent().hasClass("k-empty"));
        });
    });
}());
