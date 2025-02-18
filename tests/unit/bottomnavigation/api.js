import '@progress/kendo-ui/src/kendo.bottomnavigation.js';

let BottomNavigation = kendo.ui.BottomNavigation,
    element, div;

describe("kendo.ui.bottomnavigation API", function() {
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

    it("setOptions method toggles itemFlow classes", function() {
        let bottomNav = setup({
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
        let bottomNav = setup();

        assert.isOk(bottomNav.element.hasClass("k-bottom-nav-flat-primary"));

        bottomNav.setOptions({
            themeColor: "secondary"
        });

        assert.isFalse(bottomNav.element.hasClass("k-bottom-nav-flat-primary"));
        assert.isOk(bottomNav.element.hasClass("k-bottom-nav-flat-secondary"));
    });

    it("setOptions method handles fillMode classes", function() {
        let bottomNav = setup();

        assert.isOk(bottomNav.element.hasClass("k-bottom-nav-flat"));

        bottomNav.setOptions({
            fillMode: "solid"
        });

        assert.isFalse(bottomNav.element.hasClass("k-bottom-nav-flat"));
        assert.isOk(bottomNav.element.hasClass("k-bottom-nav-solid"));
    });

    it("setOptions method handles border classes", function() {
        let bottomNav = setup();

        assert.isOk(bottomNav.element.hasClass("k-bottom-nav-border"));

        bottomNav.setOptions({
            border: false
        });

        assert.isFalse(bottomNav.element.hasClass("k-bottom-nav-border"));
    });

    it("setOptions method handles shadow classes", function() {
        let bottomNav = setup();

        assert.isFalse(bottomNav.element.hasClass("k-bottom-nav-shadow"));

        bottomNav.setOptions({
            shadow: true
        });

        assert.isOk(bottomNav.element.hasClass("k-bottom-nav-shadow"));
    });

    it("setOptions method rerenders items when template is changed", function() {
        let bottomNav = setup({
            items: [
                { text: "home", icon: "home" }
            ]
        });

        bottomNav.setOptions({
            template: () => "NEW ITEM"
        });

        assert.equal(bottomNav.items().eq(0).text(), "NEW ITEM");
    });

    it("setOptions method rerenders items", function() {
        let bottomNav = setup({
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

    it("select method returns selected item", function() {
        let bottomNav = setup({
            items: [
                { text: "home", icon: "home", selected: true },
                { text: "text", icon: "text" }
            ]
        });

        assert.equal(bottomNav.select().index(), 0);
    });

    it("select method deselects items and select new one", function() {
        let bottomNav = setup({
            items: [
                { text: "home", icon: "home", selected: true },
                { text: "text", icon: "text" }
            ]
        });

        bottomNav.select(bottomNav.items().eq(1));

        assert.isFalse(bottomNav.items().eq(0).is(".k-selected"));
        assert.isOk(bottomNav.items().eq(1).is(".k-selected"));
    });

    it("select method can toggle selection", function() {
        let bottomNav = setup({
            items: [
                { text: "home", icon: "home", selected: true },
                { text: "text", icon: "text" }
            ]
        });

        bottomNav.select(bottomNav.items().eq(0), false);

        assert.isFalse(bottomNav.items().eq(0).is(".k-selected"));
        assert.isFalse(bottomNav.items().eq(1).is(".k-selected"));
    });

    it("select method works with DOM element", function() {
        let bottomNav = setup({
            items: [
                { text: "home", icon: "home", selected: true },
                { text: "text", icon: "text" }
            ]
        });

        bottomNav.select(bottomNav.items().eq(0)[0], false);

        assert.isFalse(bottomNav.items().eq(0).is(".k-selected"));
        assert.isFalse(bottomNav.items().eq(1).is(".k-selected"));
    });

    it("enable method can enable item", function() {
        let bottomNav = setup({
            items: [
                { text: "home", icon: "home", enabled: false },
                { text: "text", icon: "text" }
            ]
        });

        assert.isOk(bottomNav.items().eq(0).is(".k-disabled"));

        bottomNav.enable(bottomNav.items().eq(0));

        assert.isFalse(bottomNav.items().eq(0).is(".k-disabled"));
    });

    it("enable method can enable item", function() {
        let bottomNav = setup({
            items: [
                { text: "home", icon: "home" },
                { text: "text", icon: "text" }
            ]
        });

        bottomNav.enable(bottomNav.items().eq(0), false);

        assert.isOk(bottomNav.items().eq(0).is(".k-disabled"));
    });

    it("enable method works with DOM element", function() {
        let bottomNav = setup({
            items: [
                { text: "home", icon: "home" },
                { text: "text", icon: "text" }
            ]
        });

        bottomNav.enable(bottomNav.items().eq(0)[0], false);

        assert.isOk(bottomNav.items().eq(0).is(".k-disabled"));
    });

    it("item method returns item by index", function() {
        let bottomNav = setup({
            items: [
                { text: "home", icon: "home" },
                { text: "text", icon: "text" }
            ]
        });

        assert.equal(bottomNav.item(1)[0], bottomNav.element.find(".k-bottom-nav-item")[1]);
    });

    it("item method returns item by index as string", function() {
        let bottomNav = setup({
            items: [
                { text: "home", icon: "home" },
                { text: "text", icon: "text" }
            ]
        });

        assert.equal(bottomNav.item("1")[0], bottomNav.element.find(".k-bottom-nav-item")[1]);
    });

    it("item method returns null with NaN index", function() {
        let bottomNav = setup({
            items: [
                { text: "home", icon: "home" },
                { text: "text", icon: "text" }
            ]
        });

        assert.equal(bottomNav.item("s"), null);
    });

    it("itemById method returns item", function() {
        let bottomNav = setup({
            items: [
                { text: "home", icon: "home", attributes: { id: "itemId" } },
                { text: "text", icon: "text" }
            ]
        });

        assert.equal(bottomNav.itemById("itemId")[0], bottomNav.items()[0]);
    });


    it("add method appends new item", function() {
        let bottomNav = setup({
            items: [
                { text: "home", icon: "home" }
            ]
        });

        bottomNav.add({ text: "text", icon: "text" });

        assert.equal(bottomNav.items().length, 2);
        assert.equal(bottomNav.items().eq(1).text(), "text");
    });

    it("add method adds new item before given element", function() {
        let bottomNav = setup({
            items: [
                { text: "home", icon: "home" }
            ]
        });

        bottomNav.add({ text: "text", icon: "text" }, bottomNav.items().eq(0));

        assert.equal(bottomNav.items().length, 2);
        assert.equal(bottomNav.items().eq(0).text(), "text");
    });

    it("remove method removes item", function() {
        let bottomNav = setup({
            items: [
                { text: "home", icon: "home" },
                { text: "text", icon: "text" }
            ]
        });

        bottomNav.remove(bottomNav.items().eq(0));

        assert.equal(bottomNav.items().length, 1);
        assert.equal(bottomNav.items().eq(0).text(), "text");
    });

    it("remove method works with DOM element", function() {
        let bottomNav = setup({
            items: [
                { text: "home", icon: "home" },
                { text: "text", icon: "text" }
            ]
        });

        bottomNav.remove(bottomNav.items().eq(0)[0]);

        assert.equal(bottomNav.items().length, 1);
        assert.equal(bottomNav.items().eq(0).text(), "text");
    });

    it("showText method hides all text elements", function() {
        let bottomNav = setup({
            items: [
                { text: "home", icon: "home" },
                { text: "text", icon: "text" }
            ]
        });

        bottomNav.showText(false);

        assert.isFalse(bottomNav.items().eq(0).find(".k-bottom-nav-item-text").is(":visible"));
        assert.isFalse(bottomNav.items().eq(1).find(".k-bottom-nav-item-text").is(":visible"));
    });

    it("showText method shows back hidden text elements", function() {
        let bottomNav = setup({
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

    it("select event is fired", async function() {
        let calls = 0;
        let bottomNav = setup({
            items: [
                { text: "home", icon: "home", url: "http://url/" }
            ],
            select: function() {
                calls++;
            }
        });

        bottomNav.items().eq(0).trigger("click");
        assert.equal(calls, 1);
    });


});
