(function() {
    var buttonGroup;

    describe("ButtonGroup accessibility with AXE", function() {
        beforeEach(function() {
            setupEmptyButtonGroup();
        });
        afterEach(function() {
            buttonGroup.destroy();
        });

        it("ButtonGroup is accessible", function(done) {
            buttonGroup = initializeButtonGroup({
                items: [
                    { text: "Align Left" },
                    { text: "Align Center" },
                    { text: "Align Right" }
                ]
            });

            axeRunFixture(done);
        });

        it("selected ButtonGroup is accessible", function(done) {
            buttonGroup = initializeButtonGroup({
                items: [
                    { text: "Align Left" },
                    { text: "Align Center", selected: true },
                    { text: "Align Right" }
                ]
            });

            axeRunFixture(done);
        });

        it("disabled ButtonGroup is accessible", function(done) {
            buttonGroup = initializeButtonGroup({
                items: [
                    { text: "Align Left" },
                    { text: "Align Center" },
                    { text: "Align Right" }
                ],
                enable: false
            });

            axeRunFixture(done);
        });

        it("multiple selection ButtonGroup is accessible", function(done) {
            buttonGroup = initializeButtonGroup({
                items: [
                    { text: "Align Left", selected: true },
                    { text: "Align Center", selected: true },
                    { text: "Align Right" }
                ],
                selection: "multiple"
            });

            axeRunFixture(done);
        });

        it("ButtonGroup with badge is accessible", function(done) {
            buttonGroup = initializeButtonGroup({
                items: [
                    {
                        text: "Align Left", badge: {
                            icon: "add",
                            themeColor: "success",
                            cutoutBorder: true
                        }
                    },
                    { text: "Align Center" },
                    { text: "Align Right" }
                ]
            });

            axeRunFixture(done);
        });

        it("not selectable ButtonGroup with badge is accessible", function(done) {
            buttonGroup = initializeButtonGroup({
                selection: "none",
                items: [
                    {
                        text: "Align Left", badge: {
                            icon: "add",
                            themeColor: "success",
                            cutoutBorder: true
                        }
                    },
                    { text: "Align Center" },
                    { text: "Align Right" }
                ]
            });

            axeRunFixture(done);
        });
    });

    describe("kendo.ui.ButtonGroup aria", function() {
        beforeEach(function() {
            setupDom();
        });
        afterEach(function() {
            buttonGroup.destroy();
        });

        it("aria-disabled attribute for disabled buttongroup", function() {
            buttonGroup = initializeButtonGroup({
                enable: false
            });

            assert.isOk(buttonGroup.element.attr("aria-disabled"));
        });

        it("aria-disabled attribute for disabled buttongroup (enabled: false)", function() {
            buttonGroup = initializeButtonGroup({
                enabled: false
            });

            assert.isOk(buttonGroup.element.attr("aria-disabled"));
        });

        it("aria-pressed attribute for active button", function() {
            buttonGroup = initializeButtonGroup({
                index: 0
            });

            assert.equal(buttonGroup.element.children(":first-child").attr("aria-pressed"), "true");
            assert.equal(buttonGroup.element.children(":first-child").attr("role"), "button");
        });

        it("toggle aria-pressed attribute on selection", function() {
            buttonGroup = initializeButtonGroup({
                index: 0
            });
            buttonGroup._select(buttonGroup.element.children().eq(1));
            assert.equal(buttonGroup.element.children().eq(0).attr("aria-pressed"), "false");
            assert.equal(buttonGroup.element.children().eq(1).attr("aria-pressed"), "true");
        });

        it("aria-pressed attribute is not present when selection is disable", function() {
            buttonGroup = initializeButtonGroup({
                selection: "none"
            });
            buttonGroup._select(buttonGroup.element.children().eq(1));
            assert.equal(buttonGroup.element.children().eq(0).attr("aria-pressed"), undefined);
            assert.equal(buttonGroup.element.children().eq(1).attr("aria-pressed"), undefined);
        });
    });
}());