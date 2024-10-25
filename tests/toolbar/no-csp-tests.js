(function() {
    var container;

    describe("Toolbar: no-csp: ", function() {
        beforeEach(function() {

            container = $("<div id='toolbar' />").appendTo(Mocha.fixture);
        });

        afterEach(function() {
            if (container.data("kendoToolBar")) {
                container.getKendoToolBar().destroy();
            }
        });

        it("Evaluates non-csp template when evaluateTemplates is true", function() {
            var toolbar = container.kendoToolBar({
                evaluateTemplates: true,
                items: [
                    { type: "button", id: "foo", myCustomProp: "test", template: "#=myCustomProp#" }
                ]
            }).data("kendoToolBar");

            assert.equal(toolbar.element.find("#foo").text(), "test");
        });

    });
}());
