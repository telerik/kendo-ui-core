(function() {
    var BottomNavigation = kendo.ui.BottomNavigation,
        element, div;

    describe("kendo.ui.bottomnavigation API", function () {
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

        it("setOptions method toggles itemFlow classes", function() {
            var bottomNav = setup({
                itemFlow: "vertical"
            });

            assert.isOk(bottomNav.element.hasClass("k-bottom-nav-item-flow-vertical"));

            bottomNav.setOptions({
                itemFlow: "horizontal"
            });

            assert.isFalse(bottomNav.element.hasClass("k-bottom-nav-item-flow-vertical"));
            assert.isOk(bottomNav.element.hasClass("k-bottom-nav-item-flow-horizontal"));

            bottomNav.setOptions({
                itemFlow: "vertical"
            });

            assert.isOk(bottomNav.element.hasClass("k-bottom-nav-item-flow-vertical"));
        });

        it("setOptions method toggles themeColor classes", function() {
            var bottomNav = setup();

            assert.isOk(bottomNav.element.hasClass("k-bottom-nav-primary"));

            bottomNav.setOptions({
                themeColor: "secondary"
            });

            assert.isFalse(bottomNav.element.hasClass("k-bottom-nav-primary"));
            assert.isOk(bottomNav.element.hasClass("k-bottom-nav-secondary"));
        });

        it("setOptions method handles fill classes", function() {
            var bottomNav = setup();

            assert.isOk(bottomNav.element.hasClass("k-bottom-nav-flat"));

            bottomNav.setOptions({
                fill: "solid"
            });

            assert.isFalse(bottomNav.element.hasClass("k-bottom-nav-flat"));
            assert.isOk(bottomNav.element.hasClass("k-bottom-nav-solid"));
        });

        it("setOptions method handles border classes", function() {
            var bottomNav = setup();

            assert.isOk(bottomNav.element.hasClass("k-bottom-nav-border"));

            bottomNav.setOptions({
                border: false
            });

            assert.isFalse(bottomNav.element.hasClass("k-bottom-nav-border"));
        });

        it("setOptions method handles shadow classes", function() {
            var bottomNav = setup();

            assert.isFalse(bottomNav.element.hasClass("k-bottom-nav-shadow"));

            bottomNav.setOptions({
                shadow: true
            });

            assert.isOk(bottomNav.element.hasClass("k-bottom-nav-shadow"));
        });

        it("setOptions method rerenders items when template is changed", function() {
            var bottomNav = setup({
                items: [
                    { text: "home", icon: "home" }
                ]
            });

            bottomNav.setOptions({
                template: "NEW ITEM"
            });

            assert.equal(bottomNav.items().eq(0).text(), "NEW ITEM");
        });

        it("setOptions method rerenders items", function() {
            var bottomNav = setup({
                items: [
                    { text: "home", icon: "home", url: "http://url/" }
                ]
            });

            bottomNav.setOptions({
                items: [
                    { text: "new", icon: "new", cssClass: "newItem" }
                ]
            });

            assert.isOk(bottomNav.items().eq(0).is(".newItem"));
        });

        it("select method returns selected item", function(){
            var bottomNav = setup({
                items: [
                    { text: "home", icon: "home", selected: true },
                    { text: "text", icon: "text" }
                ]
            });

            assert.equal(bottomNav.select().index(), 0);
        });

        it("select method deselects items and select new one", function(){
            var bottomNav = setup({
                items: [
                    { text: "home", icon: "home", selected: true },
                    { text: "text", icon: "text" }
                ]
            });

            bottomNav.select(bottomNav.items().eq(1));

            assert.isFalse(bottomNav.items().eq(0).is(".k-state-selected"));
            assert.isOk(bottomNav.items().eq(1).is(".k-state-selected"));
        });

        it("select method can toggle selection", function(){
            var bottomNav = setup({
                items: [
                    { text: "home", icon: "home", selected: true },
                    { text: "text", icon: "text" }
                ]
            });

            bottomNav.select(bottomNav.items().eq(0), false);

            assert.isFalse(bottomNav.items().eq(0).is(".k-state-selected"));
            assert.isFalse(bottomNav.items().eq(1).is(".k-state-selected"));
        });

        it("select method works with DOM element", function(){
            var bottomNav = setup({
                items: [
                    { text: "home", icon: "home", selected: true },
                    { text: "text", icon: "text" }
                ]
            });

            bottomNav.select(bottomNav.items().eq(0)[0], false);

            assert.isFalse(bottomNav.items().eq(0).is(".k-state-selected"));
            assert.isFalse(bottomNav.items().eq(1).is(".k-state-selected"));
        });

        it("enable method can enable item", function(){
            var bottomNav = setup({
                items: [
                    { text: "home", icon: "home", enabled: false },
                    { text: "text", icon: "text" }
                ]
            });

            assert.isOk(bottomNav.items().eq(0).is(".k-state-disabled"));

            bottomNav.enable(bottomNav.items().eq(0));

            assert.isFalse(bottomNav.items().eq(0).is(".k-state-disabled"));
        });

        it("enable method can enable item", function(){
            var bottomNav = setup({
                items: [
                    { text: "home", icon: "home" },
                    { text: "text", icon: "text" }
                ]
            });

            bottomNav.enable(bottomNav.items().eq(0), false);

            assert.isOk(bottomNav.items().eq(0).is(".k-state-disabled"));
        });

        it("enable method works with DOM element", function(){
            var bottomNav = setup({
                items: [
                    { text: "home", icon: "home" },
                    { text: "text", icon: "text" }
                ]
            });

            bottomNav.enable(bottomNav.items().eq(0)[0], false);

            assert.isOk(bottomNav.items().eq(0).is(".k-state-disabled"));
        });

        it("item method returns item by index", function(){
            var bottomNav = setup({
                items: [
                    { text: "home", icon: "home" },
                    { text: "text", icon: "text" }
                ]
            });

            assert.equal(bottomNav.item(1)[0], bottomNav.element.find(".k-bottom-nav-item")[1]);
        });

        it("item method returns item by index as string", function(){
            var bottomNav = setup({
                items: [
                    { text: "home", icon: "home" },
                    { text: "text", icon: "text" }
                ]
            });

            assert.equal(bottomNav.item("1")[0], bottomNav.element.find(".k-bottom-nav-item")[1]);
        });

        it("item method returns null with NaN index", function(){
            var bottomNav = setup({
                items: [
                    { text: "home", icon: "home" },
                    { text: "text", icon: "text" }
                ]
            });

            assert.equal(bottomNav.item("s"), null);
        });

        it("itemById method returns item", function(){
            var bottomNav = setup({
                items: [
                    { text: "home", icon: "home", attributes: { id: "itemId" } },
                    { text: "text", icon: "text" }
                ]
            });

            assert.equal(bottomNav.itemById("itemId")[0], bottomNav.items()[0]);
        });


        it("add method appends new item", function(){
            var bottomNav = setup({
                items: [
                    { text: "home", icon: "home" }
                ]
            });

            bottomNav.add({ text: "text", icon: "text" });

            assert.equal(bottomNav.items().length, 2);
            assert.equal(bottomNav.items().eq(1).text(), "text");
        });

        it("add method adds new item before given element", function(){
            var bottomNav = setup({
                items: [
                    { text: "home", icon: "home" }
                ]
            });

            bottomNav.add({ text: "text", icon: "text" }, bottomNav.items().eq(0));

            assert.equal(bottomNav.items().length, 2);
            assert.equal(bottomNav.items().eq(0).text(), "text");
        });

        it("remove method removes item", function(){
            var bottomNav = setup({
                items: [
                    { text: "home", icon: "home" },
                    { text: "text", icon: "text" }
                ]
            });

            bottomNav.remove(bottomNav.items().eq(0));

            assert.equal(bottomNav.items().length, 1);
            assert.equal(bottomNav.items().eq(0).text(), "text");
        });

        it("remove method works with DOM element", function(){
            var bottomNav = setup({
                items: [
                    { text: "home", icon: "home" },
                    { text: "text", icon: "text" }
                ]
            });

            bottomNav.remove(bottomNav.items().eq(0)[0]);

            assert.equal(bottomNav.items().length, 1);
            assert.equal(bottomNav.items().eq(0).text(), "text");
        });

        it("showText method hides all text elements", function(){
            var bottomNav = setup({
                items: [
                    { text: "home", icon: "home" },
                    { text: "text", icon: "text" }
                ]
            });

            bottomNav.showText(false);

            assert.isFalse(bottomNav.items().eq(0).find(".k-bottom-nav-item-text").is(":visible"));
            assert.isFalse(bottomNav.items().eq(1).find(".k-bottom-nav-item-text").is(":visible"));
        });

        it("showText method shows back hidden text elements", function(){
            var bottomNav = setup({
                items: [
                    { text: "home", icon: "home" },
                    { text: "text", icon: "text" }
                ]
            });

            bottomNav.showText(false);
            bottomNav.showText();

            assert.isOk(bottomNav.items().eq(0).find(".k-bottom-nav-item-text").is(":visible"));
            assert.isOk(bottomNav.items().eq(1).find(".k-bottom-nav-item-text").is(":visible"));
        });

        it("select event is fired", function(done){
            var bottomNav = setup({
                items: [
                    { text: "home", icon: "home", url: "http://url/" }
                ],
                select: function () {
                    assert.isOk(true);
                    done();
                }
            });

            bottomNav.items().eq(0).trigger("click");
        });


    });
}());

