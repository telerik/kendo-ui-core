(function() {

    var DropDownButton = kendo.ui.DropDownButton;
    var dropDownButton, button;

    var defaultItems = [
        { id: "item1", text: "item 1" },
        { id: "item2", text: "item 2" }
    ];

    describe("DropDownButton api methods", function() {
        beforeEach(function() {
            button = $("<button>Button</button>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("DropDownButton enable toggles the state of the button", function() {
            var dropDownButton = new DropDownButton(button, { enabled: false, items: defaultItems });

            assert.isOk(button.prop("disabled"));

            dropDownButton.enable();

            assert.isNotOk(button.prop("disabled"));
        });

        it("DropDownButton enable toggles the state of the button and its items", function() {
            var dropDownButton = new DropDownButton(button, {
                enabled: false,
                items: defaultItems.map(function(item) {
                    return $.extend(item, { enabled: false });
                })
            });

            assert.isOk(button.prop("disabled"));

            assert.isOk(dropDownButton.menu.list.children("li").hasClass("k-disabled"));

            dropDownButton.enable();

            assert.isNotOk(button.prop("disabled"));

            assert.isNotOk(dropDownButton.menu.list.children("li").hasClass("k-disabled"));
        });

        it("DropDownButton enable toggles the state of a single item", function() {
            var dropDownButton = new DropDownButton(button, {
                items: defaultItems
            });

            dropDownButton.enable(false, "#item1");

            assert.isOk(dropDownButton.menu.list.find("#item1").hasClass("k-disabled"));

            dropDownButton.enable(true, "#item1");

            assert.isNotOk(dropDownButton.menu.list.find("#item1").hasClass("k-disabled"));
        });

        it("DropDownButton enable toggles the state of a all items when disabled previously", function() {
            var dropDownButton = new DropDownButton(button, {
                items: defaultItems
            });

            dropDownButton.enable(false, "#item1");

            assert.isOk(dropDownButton.menu.list.find("#item1").hasClass("k-disabled"));

            dropDownButton.enable();

            assert.isNotOk(button.prop("disabled"));
            assert.isNotOk(dropDownButton.menu.list.find("#item1").hasClass("k-disabled"));
        });

        it("DropDownButton hidden hides/shows items", function() {
            var dropDownButton = new DropDownButton(button, {
                items: defaultItems
            });

            dropDownButton.hide("#item1");

            assert.isOk(dropDownButton.menu.list.find("#item1").hasClass("k-hidden"));

            dropDownButton.show("#item1");

            assert.isNotOk(dropDownButton.menu.list.find("#item1").hasClass("k-hidden"));
        });
    });

    describe("DropDownButton api events", function() {
        beforeEach(function() {
            button = $("<button>Button</button>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("DropDownButton click event triggered from menu item with correct id", function(done) {
            var dropDownButton = new DropDownButton(button, {
                 items: defaultItems,
                 click: function(ev) {
                     assert.equal(ev.id, "item1");
                     done();
                 }
            });

            $("#item1").click();
        });

        it("DropDownButton click event triggered from menu item with id set via attributes", function(done) {
            var dropDownButton = new DropDownButton(button, {
                 items: [ { attributes: { id: "idSet" }, click: function(ev) {
                    assert.equal(ev.target.id, "idSet");
                    done();
                } } ],
            });

            $("#idSet").click();
        });

        it("DropDownButton open event is triggered on button click", function(done) {
            var dropDownButton = new DropDownButton(button, {
                 items: defaultItems,
                 open: function() {
                     assert.isOk(true);
                     done();
                 }
            });

            button.click();
        });

        it("DropDownButton close event is triggered when popup is closed", function(done) {
            var dropDownButton = new DropDownButton(button, {
                 items: defaultItems,
                 close: function() {
                     assert.isOk(true);
                     done();
                 }
            });

            button.click();
            $("#item1").click();
        });
    });
}());
