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
            assert.isOk(iconEl.is(".k-icon, .k-svg-icon"));
            assert.isOk(iconEl.is(".k-i-align-center, .k-svg-i-align-center"));
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
        it("selected button is passed to the selectedIndices array", function() {
            buttonGroup = initializeButtonGroup({
                items: [
                    { text: "test1" },
                    { text: "test2", selected: true }
                ]
            });

            assert.equal(buttonGroup.selectedIndices.length, 1);
            assert.equal(buttonGroup.selectedIndices[0], 1);
        });
        it("k-selected on a button is passed to the selectedIndices array", function() {
            buttonGroupContainer.append($('<span>item0</span>'));
            buttonGroupContainer.append($('<span class="k-selected">item2</span>'));
            buttonGroup = initializeButtonGroup();

            assert.equal(buttonGroup.selectedIndices.length, 1);
            assert.equal(buttonGroup.selectedIndices[0], 1);
        });
        it("index passed to options is added to the selectedIndices array", function() {
            buttonGroup = initializeButtonGroup({
                index: 1,
                items: [
                    { text: "test1" },
                    { text: "test2" }
                ]
            });

            assert.equal(buttonGroup.selectedIndices.length, 1);
            assert.equal(buttonGroup.selectedIndices[0], 1);
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

        it("passes the proper sizing option to the buttons", function() {
            buttonGroup = initializeButtonGroup({
                size: "small",
                items: [
                    { text: "test1" },
                    { text: "test2" }
                ]
            });

            assert.isOk(buttonGroup.element.children().eq(0).hasClass("k-button-sm"));
            assert.isOk(buttonGroup.element.children().eq(1).hasClass("k-button-sm"));
        });

        it("passes the proper fillMode option to the buttons", function() {
            buttonGroup = initializeButtonGroup({
                fillMode: "flat",
                items: [
                    { text: "test1" },
                    { text: "test2" }
                ]
            });

            assert.isOk(buttonGroup.element.children().eq(0).hasClass("k-button-flat"));
            assert.isOk(buttonGroup.element.children().eq(1).hasClass("k-button-flat"));
        });

        it("passes the proper themeColor option to the buttons", function() {
            buttonGroup = initializeButtonGroup({
                themeColor: "primary",
                items: [
                    { text: "test1" },
                    { text: "test2" }
                ]
            });

            assert.isOk(buttonGroup.element.children().eq(0).hasClass("k-button-solid-primary"));
            assert.isOk(buttonGroup.element.children().eq(1).hasClass("k-button-solid-primary"));
        });

        it("passes the proper rounded option to the buttons", function() {
            buttonGroup = initializeButtonGroup({
                rounded: "full",
                items: [
                    { text: "test1" },
                    { text: "test2" }
                ]
            });

            assert.isOk(buttonGroup.element.children().eq(0).hasClass("k-rounded-full"));
            assert.isOk(buttonGroup.element.children().eq(1).hasClass("k-rounded-full"));
        });
    });
}());