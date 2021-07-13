(function() {
    var BottomNavigation = kendo.ui.BottomNavigation,
        element, div;

    describe("kendo.ui.bottomnavigation items rendering", function () {
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

        it("renders items", function() {
            var bottomNav = setup({
                items: [
                    { icon: "home", text: "home" },
                    { icon: "home", text: "home" }
                ]
            });

            assert.equal(bottomNav.items().length, 2);
        });

        it("can render items with only icon and icon+text", function() {
            var bottomNav = setup({
                items: [
                    { icon: "home" },
                    { icon: "home", text: "home" }
                ]
            });

            assert.equal(bottomNav.items().eq(0).find(".k-bottom-nav-item-text").length, 0);

            assert.equal(bottomNav.items().eq(1).find(".k-bottom-nav-item-text").length, 1);
        });

        it("renders anchor element when url is added", function() {
            var bottomNav = setup({
                items: [
                    { icon: "home", text: "home", url: "http://url/" }
                ]
            });

            assert.isOk(bottomNav.items().eq(0).is("a.k-bottom-nav-item"));
        });

        it("item can render custom css class", function() {
            var bottomNav = setup({
                items: [
                    { icon: "home", text: "home", cssClass: "customClass" }
                ]
            });

            assert.isOk(bottomNav.items().eq(0).is(".customClass"));
        });

        it("item can render custom attributes", function() {
            var bottomNav = setup({
                items: [
                    { icon: "home", text: "home", attributes: { "data-custom": "test" } }
                ]
            });

            assert.equal(bottomNav.items().eq(0).data("custom"), "test");
        });

        it("item encodes HTML in text", function() {
            var bottomNav = setup({
                items: [
                    { icon: "home", text: "<strong>home</strong>" }
                ]
            });

            assert.equal(bottomNav.items().eq(0).find(".k-bottom-nav-item-text").html(), "&lt;strong&gt;home&lt;/strong&gt;");
        });

        it("item renders HTML in text when encoded: false", function() {
            var bottomNav = setup({
                items: [
                    { icon: "home", text: "<strong>home</strong>", encoded: false }
                ]
            });

            assert.equal(bottomNav.items().eq(0).find(".k-bottom-nav-item-text").html(), "<strong>home</strong>");
        });

        it("item renders custom iconClass to the icon element", function() {
            var bottomNav = setup({
                items: [
                    { icon: "home", text: "home", iconClass: "iconClass" }
                ]
            });

            assert.isOk(bottomNav.items().eq(0).find(".k-bottom-nav-item-icon").is(".iconClass"));
        });

        it("item renders kendo icons", function() {
            var bottomNav = setup({
                items: [
                    { icon: "home", text: "home" }
                ]
            });

            assert.isOk(bottomNav.items().eq(0).find(".k-bottom-nav-item-icon").is(".k-icon.k-i-home"));
        });

        it("item with no icon omits k-icon class", function() {
            var bottomNav = setup({
                items: [
                    { text: "home" }
                ]
            });

            assert.isFalse(bottomNav.items().eq(0).find(".k-bottom-nav-item-icon").is(".k-icon"));
        });

        it("item can be disabled", function() {
            var bottomNav = setup({
                items: [
                    { text: "home", icon: "home", enabled: false }
                ]
            });

            assert.isOk(bottomNav.items().eq(0).is(".k-state-disabled"));
        });

        it("item can be selected", function() {
            var bottomNav = setup({
                items: [
                    { text: "home", icon: "home", selected: true }
                ]
            });

            assert.isOk(bottomNav.items().eq(0).is(".k-state-selected"));
        });

        it("item can be rendered from template", function() {
            var bottomNav = setup({
                template: '<span class="template">custom template</span>',
                items: [
                    { text: "home", icon: "home" }
                ]
            });

            assert.equal(bottomNav.items().eq(0).html(), '<span class="template">custom template</span>');
        });

        it("item can be rendered from template in item's options", function() {
            var bottomNav = setup({
                items: [
                    { text: "home", icon: "home",template: '<span class="template">custom template</span>' }
                ]
            });

            assert.equal(bottomNav.items().eq(0).html(), '<span class="template">custom template</span>');
        });

        it("item's template overrides the widget's option", function() {
            var bottomNav = setup({
                template: '<span class="template">custom template</span>',
                items: [
                    { text: "home", icon: "home" },
                    { text: "home", icon: "home", template: '<span class="item-template">custom template</span>' }
                ]
            });

            assert.equal(bottomNav.items().eq(0).html(), '<span class="template">custom template</span>');
            assert.equal(bottomNav.items().eq(1).html(), '<span class="item-template">custom template</span>');
        });




    });
}());

