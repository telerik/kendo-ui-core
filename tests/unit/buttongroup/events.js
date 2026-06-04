import { setupEmptyButtonGroup, initializeButtonGroup, destroyButtonGroup } from "../../helpers/unit/buttongroup.js";

describe("kendo.ui.ButtonGroup events", function() {
    beforeEach(function() {
        setupEmptyButtonGroup();
    });
    afterEach(function() {
        destroyButtonGroup();
    });

    it("keydown logic can be prevented through kendoKeydown event", function() {
        let fired = false;
        let buttonGroup = initializeButtonGroup({
            items: [
                { text: "Option 1" },
                { text: "Option 2" }
            ],
            kendoKeydown: function(e) {
                fired = true;
                e.preventKendoKeydown = true;
            }
        });

        buttonGroup.element.trigger({ type: "keydown", keyCode: kendo.keys.ENTER });

        assert.isTrue(fired);
    });
});
