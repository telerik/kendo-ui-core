import '@progress/kendo-ui/src/kendo.tabstrip.js';

let dom;
let tabstrip;

describe("tabstrip xs button size", function() {
    afterEach(function() {
        if (tabstrip) {
            tabstrip.destroy();
        }
        if (dom) {
            dom.remove();
        }
    });

    it("close button has k-button-xs class when closable is true", function() {
        dom = $('<div></div>').appendTo(Mocha.fixture);
        tabstrip = new kendo.ui.TabStrip(dom, {
            closable: true,
            dataTextField: "text",
            dataSource: [
                { text: "Tab 1" },
                { text: "Tab 2" }
            ]
        });

        let closeButtons = dom.find("[ref-close-button]");

        assert.isTrue(closeButtons.length > 0);
        closeButtons.each(function() {
            assert.isTrue($(this).hasClass("k-button-xs"));
        });
    });

    it("tab action buttons have flat fillMode and xs size", function() {
        dom = $('<div></div>').appendTo(Mocha.fixture);
        tabstrip = new kendo.ui.TabStrip(dom, {
            dataTextField: "text",
            dataSource: [
                {
                    text: "Tab 1",
                    actions: [{ icon: "x" }]
                }
            ]
        });

        let actionButton = dom.find(".k-item-actions .k-button").first();

        assert.isTrue(actionButton.hasClass("k-button-flat"));
        assert.isTrue(actionButton.hasClass("k-button-xs"));
        assert.isTrue(actionButton.hasClass("k-icon-button"));
    });
});
