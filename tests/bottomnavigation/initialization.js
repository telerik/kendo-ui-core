(function() {
    var BottomNavigation = kendo.ui.BottomNavigation,
        element, div;

    describe("kendo.ui.bottomnavigation initialization", function() {
        beforeEach(function() {
            element = $("<nav></nav>").appendTo(Mocha.fixture);
            div = $("<div />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            var component = $(element).data("kendoBottomNavigation");
            if (component) {
                component.destroy();
            }

            kendo.destroy(Mocha.fixture);
        });

        function setup(options) {
            return new BottomNavigation(element, options);
        }

        it("adds wrapper classes to element", function() {
            setup();
            assert.isOk(element.hasClass("k-bottom-nav"));
        });

        it("itemFlow vertical adds k-bottom-nav-item-flow-vertical class", function() {
            var bottomNav = setup({
                itemFlow: "vertical"
            });

            assert.isOk(bottomNav.element.hasClass("k-bottom-nav-item-flow-vertical"));
        });

        it("itemFlow vertical is the default orientation", function() {
            var bottomNav = setup();

            assert.isOk(bottomNav.element.hasClass("k-bottom-nav-item-flow-vertical"));
        });

        it("itemFlow horizontal removes k-bottom-nav-item-flow-vertical", function() {
            var bottomNav = setup({
                itemFlow: "horizontal"
            });

            assert.isFalse(bottomNav.element.hasClass("k-bottom-nav-item-flow-vertical"));
            assert.isOk(bottomNav.element.hasClass("k-bottom-nav-item-flow-horizontal"));
        });

        it("element is fixed by default", function() {
            var bottomNav = setup();

            assert.isOk(bottomNav.element.hasClass("k-pos-fixed"));
        });

        it("themeColor is primary by default", function() {
            var bottomNav = setup();

            assert.isOk(bottomNav.element.hasClass("k-bottom-nav-flat-primary"));
        });

        it("themeColor is set to secondary", function() {
            var bottomNav = setup({
                themeColor: "secondary"
            });

            assert.isOk(bottomNav.element.hasClass("k-bottom-nav-flat-secondary"));
        });

        it("themeColor cannot be set to custom value", function() {
            var bottomNav = setup({
                themeColor: "custom"
            });

            assert.isFalse(bottomNav.element.hasClass("k-bottom-nav-flat-custom"));
        });

        it("fillMode is flat by default", function() {
            var bottomNav = setup();

            assert.isOk(bottomNav.element.hasClass("k-bottom-nav-flat"));
        });

        it("fillMode is set to a valid value", function() {
            var bottomNav = setup({
                fillMode: "solid"
            });

            assert.isOk(bottomNav.element.hasClass("k-bottom-nav-solid"));
        });

        it("border is enabled by default", function() {
            var bottomNav = setup();

            assert.isOk(bottomNav.element.hasClass("k-bottom-nav-border"));
        });

        it("border can be disabled", function() {
            var bottomNav = setup({
                border: false
            });

            assert.isFalse(bottomNav.element.hasClass("k-bottom-nav-border"));
        });

        it("shadow is disabled by default", function() {
            var bottomNav = setup();

            assert.isFalse(bottomNav.element.hasClass("k-bottom-nav-shadow"));
        });

        it("shadow can be enabled", function() {
            var bottomNav = setup({
                shadow: true
            });

            assert.isOk(bottomNav.element.hasClass("k-bottom-nav-shadow"));
        });
    });
}());

