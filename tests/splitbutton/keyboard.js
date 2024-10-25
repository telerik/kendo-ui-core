(function() {

    var SplitButton = kendo.ui.SplitButton;
    var keys = kendo.keys;
    var button;

    var defaultItems = [
        { id: "item1", text: "item 1" },
        { id: "item2", text: "item 2" }
    ];

    describe("SplitButton keyboard navigation", function() {
        beforeEach(function() {
            button = $("<button>Button</button>").appendTo(Mocha.fixture);

            $.fn.press = function(key, shiftKey, altKey, target) {
                $(this).trigger({
                    type: "keydown",
                    keyCode: key,
                    shiftKey: shiftKey,
                    altKey: altKey,
                    target: target || this
                });
            };
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("Alt+Down opens button menu", function(done) {
            var splitButton = new SplitButton(button, {
                items: defaultItems,
                open: function() {
                    assert.isOk(true);
                    done();
                }
            });

            button.focus();
            button.press(keys.DOWN, false, true);
        });

        it("Alt+Up closes button menu", function(done) {
            var splitButton = new SplitButton(button, {
                items: defaultItems,
                close: function() {
                    assert.isOk(true);
                    done();
                }
            });

            button.focus();
            button.press(keys.DOWN, false, true);
            splitButton.menu.list.press(keys.UP, false, true, $("#item1")[0]);

        });

        it("Down navigates to second item", function() {
            var splitButton = new SplitButton(button, {
                items: defaultItems
            });

            splitButton.open();
            $("#item1").trigger("focus");
            splitButton.menu.list.press(keys.DOWN, false, false, $("#item1")[0]);

            assert.isOk($(document.activeElement).is("#item2"));
        });

        it("Up navigates to second item", function() {
            var splitButton = new SplitButton(button, {
                items: defaultItems
            });

            splitButton.open();
            $("#item2").trigger("focus");
            splitButton.menu.list.press(keys.UP, false, false, $("#item2")[0]);

            assert.isOk($(document.activeElement).is("#item1"));
        });

        it("Home navigates to first", function() {
            var splitButton = new SplitButton(button, {
                items: defaultItems
            });

            splitButton.open();
            $("#item2").trigger("focus");
            splitButton.menu.list.press(keys.HOME, false, false, $("#item2")[0]);

            assert.isOk($(document.activeElement).is("#item1"));
        });

        it("End navigates to first", function() {
            var splitButton = new SplitButton(button, {
                items: defaultItems
            });

            splitButton.open();
            $("#item1").trigger("focus");
            splitButton.menu.list.press(keys.END, false, false, $("#item1")[0]);

            assert.isOk($(document.activeElement).is("#item2"));
        });
    });
}());
