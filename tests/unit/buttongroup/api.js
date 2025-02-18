import { setupEmptyButtonGroup, initializeButtonGroup, destroyButtonGroup } from "../../helpers/unit/buttongroup.js";

let buttonGroup;
describe("kendo.ui.ButtonGroup api", function() {
    beforeEach(function() {
        setupEmptyButtonGroup();
    });
    afterEach(function() {
        destroyButtonGroup();
    });

    it("enable(false) adds a k-disabled class to wrapper", function() {
        buttonGroup = initializeButtonGroup({
            items: [
                { text: "test1" },
                { text: "test2" }
            ]
        });

        buttonGroup.enable(false);

        assert.isOk(buttonGroup.element.hasClass("k-disabled"));
    });

    it("enable(false) adds a k-disabled class to buttons", function() {
        buttonGroup = initializeButtonGroup({
            items: [
                { text: "test1" },
                { text: "test2" }
            ]
        });

        buttonGroup.enable(false);

        buttonGroup.element.children().each(function(i, el) {
            assert.isOk($(el).hasClass("k-disabled"));
        });
    });

    it("enable(false) adds a k-disabled class to simple buttons", function() {
        buttonGroup = initializeButtonGroup({
            selection: "none",
            items: [
                { text: "test1" },
                { text: "test2" }
            ]
        });

        buttonGroup.enable(false);

        buttonGroup.element.children().each(function(i, el) {
            assert.isOk($(el).hasClass("k-disabled"));
        });
    });
});
