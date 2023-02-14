(function() {
    var buttonGroup;
    describe("kendo.ui.ButtonGroup initialization", function() {
        beforeEach(function() {
            setupEmptyButtonGroup();
        });
        afterEach(function() {
            buttonGroup.destroy();
        });

        it("enable:false adds a k-disabled class", function() {
            buttonGroup = initializeButtonGroup({
                enable: false,
                items: [
                    { text: "test1" },
                    { text: "test2" }
                ]
            });

            assert.isOk(buttonGroup.element.hasClass("k-disabled"));
        });

        it("enabled:false adds a k-disabled class to buttons", function() {
            buttonGroup = initializeButtonGroup({
                enabled: false,
                items: [
                    { text: "test1" },
                    { text: "test2" }
                ]
            });

            buttonGroup.element.children().each(function(i, el) {
                assert.isOk($(el).hasClass("k-disabled"));
            });
        });

        it("k-icon-button is added when only icon rendered", function() {
            buttonGroup = initializeButtonGroup({
                items: [
                    { iconClass: "fa fa-male" },
                    { text: "test2" }
                ]
            });

            var firstButton = buttonGroup.element.children().eq(0);
            assert.isOk(firstButton.hasClass("k-icon-button"));
        });
        it("icon is added via iconClass option", function() {
            buttonGroup = initializeButtonGroup({
                items: [
                    { text: "test1", iconClass: "fa fa-male" },
                    { text: "test2" }
                ]
            });

            var iconEl = buttonGroup.element.children().eq(0).children();
            assert.isOk(iconEl.hasClass("fa"));
            assert.isOk(iconEl.hasClass("fa-male"));
            assert.isOk(iconEl.hasClass("k-button-icon"));
        });
        it("default icon classes are added to the button", function() {
            buttonGroup = initializeButtonGroup({
                items: [
                    { icon: "align-center" },
                    { text: "test2" }
                ]
            });

            var iconEl = buttonGroup.element.children().eq(0).children();

            assert.isOk(iconEl.hasClass("k-button-icon"));
            assert.isOk(iconEl.hasClass("k-icon"));
            assert.isOk(iconEl.hasClass("k-i-align-center"));
        });
        it("image is added to the button", function() {
            var img = "https://demos.telerik.com/kendo-ui/content/shared/icons/sports/snowboarding.png";
            buttonGroup = initializeButtonGroup({
                items: [
                    { text: "test1", selected: true, imageUrl: img },
                    { text: "test2" }
                ]
            });

            var firstButton = buttonGroup.element.children().eq(0);
            assert.equal(firstButton.children("img").attr("src"), img);
        });
        it("k-selected is added via index", function() {
            buttonGroup = initializeButtonGroup({
                index: 0,
                items: [
                    { text: "test1" },
                    { text: "test2" }
                ]
            });

            var firstButton = buttonGroup.element.children().eq(0);
            assert.isOk(firstButton.hasClass("k-selected"));
        });
        it("k-selected is added with custom attributes and single selection", function() {
            buttonGroup = initializeButtonGroup({
                items: [
                    { text: "test1", selected: true, attributes: { "class": "red" } },
                    { text: "test2" }
                ]
            });

            var firstButton = buttonGroup.element.children().eq(0);
            assert.isOk(firstButton.hasClass("k-selected"));
            assert.isOk(firstButton.hasClass("red"));
        });
        it("k-selected is added with custom attributes and multiple selection", function() {
            buttonGroup = initializeButtonGroup({
                selection: "multiple",
                items: [
                    { text: "test1", selected: true, attributes: { class: "red" } },
                    { text: "test2", selected: true }
                ]
            });

            var firstButton = buttonGroup.element.children().eq(0);
            assert.isOk(firstButton.hasClass("k-selected"));
            assert.isOk(firstButton.hasClass("red"));

            var secondButton = buttonGroup.element.children().eq(1);
            assert.isOk(secondButton.hasClass("k-selected"));
        });
        it("k-selected is not added when selection is disabled", function() {
            buttonGroup = initializeButtonGroup({
                selection: "none",
                items: [
                    { text: "test1", selected: true, attributes: { class: "red" } },
                    { text: "test2", selected: true }
                ]
            });

            var firstButton = buttonGroup.element.children().eq(0);
            assert.isOk(!firstButton.hasClass("k-selected"));

            var secondButton = buttonGroup.element.children().eq(1);
            assert.isOk(!secondButton.hasClass("k-selected"));
        });
        it("custom attributes are added to item", function() {
            buttonGroup = initializeButtonGroup({
                items: [
                    { text: "test1", attributes: { "attribute1": "test1" } },
                    { text: "test2" }
                ]
            });

            var firstButton = buttonGroup.element.children().eq(0);
            assert.equal(firstButton.attr("attribute1"), "test1");
        });

        it("when badge is enabled a kendo.ui.Badge is initialized", function() {
            buttonGroup = initializeButtonGroup({
                items: [
                    { text: "test1", badge: "123" },
                    { text: "test2" }
                ]
            });

            var badge = buttonGroup.element.children().eq(0).find('.k-badge').data('kendoBadge');
            assert.isOk(badge instanceof kendo.ui.Badge);
        });
    });
}());