import '@progress/kendo-ui/src/kendo.bottomnavigation.js';

let BottomNavigation = kendo.ui.BottomNavigation,
    element;

describe("kendo.ui.BottomNavigation events", function() {
    beforeEach(function() {
        element = $("<nav></nav>").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        let component = element.data("kendoBottomNavigation");
        if (component) {
            component.destroy();
        }
        kendo.destroy(Mocha.fixture);
    });

    it("keydown logic can be prevented through kendoKeydown event", function() {
        let fired = false;
        let bottomNav = new BottomNavigation(element, {
            items: [
                { text: "Home", icon: "home", selected: true },
                { text: "Info", icon: "info-circle" }
            ],
            kendoKeydown: function(e) {
                fired = true;
                e.preventKendoKeydown = true;
            }
        });

        bottomNav.element.find(".k-bottom-nav-item").first().trigger({ type: "keydown", keyCode: kendo.keys.ENTER });

        assert.isTrue(fired);
    });
});
