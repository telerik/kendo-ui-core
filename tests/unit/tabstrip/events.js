import '@progress/kendo-ui/src/kendo.tabstrip.js';

let TabStrip = kendo.ui.TabStrip,
    div;

describe("kendo.ui.TabStrip events", function() {
    beforeEach(function() {
        div = $('<div id="tabstrip"><ul><li class="k-active">Tab 1</li><li>Tab 2</li></ul><div>Content 1</div><div>Content 2</div></div>').appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("keydown logic can be prevented through kendoKeydown event", function() {
        let fired = false;
        let tabstrip = new TabStrip(div, {
            kendoKeydown: function(e) {
                fired = true;
                e.preventKendoKeydown = true;
            }
        });

        tabstrip.tabGroup.trigger({ type: "keydown", keyCode: kendo.keys.RIGHT });

        assert.isTrue(fired);
    });
});
