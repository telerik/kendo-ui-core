(function() {

    var SplitButton = kendo.ui.SplitButton;
    var splitButton, button;

    var defaultItems = [
        { id: "item1", text: "item 1" },
        { id: "item2", text: "item 2" }
    ];

    describe("SplitButton api methods", function() {
        beforeEach(function() {
            button = $("<button>Button</button>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("SplitButton enable toggles the state of the button", function() {
            var splitButton = new SplitButton(button, { enabled: false, items: defaultItems });

            assert.isOk(button.prop("disabled"));
            assert.isOk(button.next().prop("disabled"));

            splitButton.enable();

            assert.isNotOk(button.prop("disabled"));
            assert.isNotOk(button.next().prop("disabled"));
        });

        it("SplitButton enable toggles the state of the button and its items", function() {
            var splitButton = new SplitButton(button, {
                enabled: false,
                items: defaultItems.map(function(item) {
                    return $.extend(item, { enabled: false });
                })
            });

            assert.isOk(button.prop("disabled"));
            assert.isOk(button.next().prop("disabled"));

            assert.isOk(splitButton.menu.list.children("li").hasClass("k-disabled"));

            splitButton.enable();

            assert.isNotOk(button.prop("disabled"));
            assert.isNotOk(button.next().prop("disabled"));

            assert.isNotOk(splitButton.menu.list.children("li").hasClass("k-disabled"));
        });

        it("SplitButton enable toggles the state of a single item", function() {
            var splitButton = new SplitButton(button, {
                items: defaultItems
            });

            splitButton.enable(false, "#item1");

            assert.isOk(splitButton.menu.list.find("#item1").hasClass("k-disabled"));

            splitButton.enable(true, "#item1");

            assert.isNotOk(splitButton.menu.list.find("#item1").hasClass("k-disabled"));
        });

        it("SplitButton enable toggles the state of a all items when disabled previously", function() {
            var splitButton = new SplitButton(button, {
                items: defaultItems
            });

            splitButton.enable(false, "#item1");

            assert.isOk(splitButton.menu.list.find("#item1").hasClass("k-disabled"));

            splitButton.enable();

            assert.isNotOk(button.prop("disabled"));
            assert.isNotOk(button.next().prop("disabled"));
            assert.isNotOk(splitButton.menu.list.find("#item1").hasClass("k-disabled"));
        });

        it("SplitButton hidden hides/shows items", function() {
            var splitButton = new SplitButton(button, {
                items: defaultItems
            });

            splitButton.hide("#item1");

            assert.isOk(splitButton.menu.list.find("#item1").hasClass("k-hidden"));

            splitButton.show("#item1");

            assert.isNotOk(splitButton.menu.list.find("#item1").hasClass("k-hidden"));
        });
    });

    describe("SplitButton api events", function() {
        beforeEach(function() {
            button = $("<button>Button</button>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("SplitButton click event triggered when button is clicked", function(done) {
            var splitButton = new SplitButton(button, {
                 items: defaultItems,
                 click: function() {
                     assert.isOk(true);
                     done();
                 }
            });

            button.click();
        });

        it("SplitButton click event triggered with button id", function(done) {
            button.attr("id", "buttonElm");
            var splitButton = new SplitButton(button, {
                 items: defaultItems,
                 click: function(ev) {
                     assert.equal(ev.id, "buttonElm");
                     done();
                 }
            });

            button.click();
        });

        it("SplitButton click event triggered from menu item with correct id", function(done) {
            var splitButton = new SplitButton(button, {
                 items: defaultItems,
                 click: function(ev) {
                     assert.equal(ev.id, "item1");
                     done();
                 }
            });

            $("#item1").click();
        });

        it("SplitButton click event triggered from menu item with id set via attributes", function(done) {
            var dropDownButton = new SplitButton(button, {
                 items: [ { attributes: { id: "idSet" }, click: function(ev) {
                    assert.equal(ev.target.id, "idSet");
                    done();
                } } ],
            });

            $("#idSet").click();
        });

        it("SplitButton open event is triggered on arrow button click", function(done) {
            var splitButton = new SplitButton(button, {
                 items: defaultItems,
                 open: function() {
                     assert.isOk(true);
                     done();
                 }
            });

            button.next().click();
        });

        it("SplitButton close event is triggered when popup is closed", function(done) {
            var splitButton = new SplitButton(button, {
                 items: defaultItems,
                 close: function() {
                     assert.isOk(true);
                     done();
                 }
            });

            button.next().click();
            $("#item1").click();
        });
    });
}());
