import '@progress/kendo-ui/src/kendo.panelbar.js';

let PanelBar = kendo.ui.PanelBar,
    ul;

describe("kendo.ui.PanelBar events", function() {
    beforeEach(function() {
        ul = $('<ul id="panelbar"><li>Item 1<ul><li>Sub Item 1</li></ul></li><li>Item 2</li></ul>').appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("keydown logic can be prevented through kendoKeydown event", function() {
        let fired = false;
        let panelbar = new PanelBar(ul, {
            kendoKeydown: function(e) {
                fired = true;
                e.preventKendoKeydown = true;
            }
        });

        panelbar.element.trigger({ type: "keydown", keyCode: kendo.keys.ENTER });

        assert.isTrue(fired);
    });
});
