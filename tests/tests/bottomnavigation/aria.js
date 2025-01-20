import '@progress/kendo-ui/src/kendo.bottomnavigation.js';

let BottomNavigation = kendo.ui.BottomNavigation,
    element, div;

describe("kendo.ui.bottomnavigation with AXE", function() {
    beforeEach(function() {
        element = $("<nav></nav>").appendTo(Mocha.fixture);
        div = $("<div />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        let component = $(element).data("kendoBottomNavigation");
        if (component) {
            component.destroy();
        }

        kendo.destroy(Mocha.fixture);
    });

    function setup(options) {
        return new BottomNavigation(element, options);
    }

    it("BottomNavigation is accessible", async function() {
        setup({
            items: [
                { icon: "home", text: "home", selected: true },
                { icon: "home", text: "home", enabled: false },
                { icon: "home", text: "home" }
            ]
        });

        await axeRunFixture();
    });
});
