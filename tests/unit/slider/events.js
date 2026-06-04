import '@progress/kendo-ui/src/kendo.slider.js';

let Slider = kendo.ui.Slider,
    input;

describe("kendo.ui.Slider events", function() {
    beforeEach(function() {
        input = $("<input>").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("keydown logic can be prevented through kendoKeydown event", function() {
        let fired = false;
        let slider = new Slider(input[0], {
            kendoKeydown: function(e) {
                fired = true;
                e.preventKendoKeydown = true;
            }
        });

        slider.wrapper.find(".k-draghandle").trigger({ type: "keydown", keyCode: kendo.keys.RIGHT });

        assert.isTrue(fired);
    });
});
