import '@progress/kendo-ui/src/kendo.sortable.js';

let Sortable = kendo.ui.Sortable,
    element;

describe("kendo.ui.Sortable events", function() {
    beforeEach(function() {
        element = $('<ul id="sortable"><li data-kendo-sortable-item>foo</li><li data-kendo-sortable-item>bar</li></ul>').appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("keydown logic can be prevented through kendoKeydown event", function() {
        let fired = false;
        let sortable = new Sortable(element, {
            navigatable: true,
            kendoKeydown: function(e) {
                fired = true;
                e.preventKendoKeydown = true;
            }
        });

        element.find("[data-kendo-sortable-item]").first().trigger({ type: "keydown", keyCode: kendo.keys.ENTER });

        assert.isTrue(fired);
    });
});
