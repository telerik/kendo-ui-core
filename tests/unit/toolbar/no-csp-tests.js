import '@progress/kendo-ui/src/kendo.toolbar.js';

let container;

describe("Toolbar: no-csp: ", function() {
    beforeEach(function() {

        container = $("<div id='toolbar' />").appendTo(Mocha.fixture);

        Mocha.fixture.append(
            `<script id="myTemplate" type="text/x-kendo-template">
                        <button id="btn1">fooo</button>
                        <script>$("\\#btn1").kendoButton({themeColor:"warning"})<\\/script>
                    </script>`
        );
    });

    afterEach(function() {
        if (container.data("kendoToolBar")) {
            container.getKendoToolBar().destroy();
        }
    });

    it("Evaluates non-csp template when evaluateTemplates is true", function() {
        let toolbar = container.kendoToolBar({
            evaluateTemplates: true,
            items: [
                { type: "button", id: "foo", myCustomProp: "test", template: "#=myCustomProp#" }
            ]
        }).data("kendoToolBar");

        assert.equal(toolbar.element.find("#foo").text(), "test");
    });

    it("external template is evaluated when wrapper components are used in template", function() {
        let toolbar = container.kendoToolBar({
            items: [
                { template: kendo.template($("#myTemplate").html()) }
            ]
        }).data("kendoToolBar");

        let btn = kendo.widgetInstance($("#btn1"));
        assert.isOk(btn instanceof kendo.ui.Button);
    });

});
