(function() {
    var buttonGroup;

    describe("kendo.ui.ButtonGroup badges", function() {
        beforeEach(function() {
            setupEmptyButtonGroup();
        });
        afterEach(function() {
            buttonGroup.destroy();
        });

        it("change badge value", function() {
            buttonGroup = initializeButtonGroup({
                items: [
                    { text: "test1", badge: "1" },
                    { text: "test2" },
                    { text: "test3", badge: "2" }
                ]
            });

            buttonGroup.badge(0, 2);
            assert.equal(buttonGroup.badge(0), "2");
        });

        it("change badge value on not selectable buttons", function() {
            buttonGroup = initializeButtonGroup({
                Selection: "none",
                items: [
                    { text: "test1", badge: "1" },
                    { text: "test2" },
                    { text: "test3", badge: "2" }
                ]
            });

            buttonGroup.badge(0, 2);
            assert.equal(buttonGroup.badge(0), "2");
        });

        it("remove badge", function() {
            buttonGroup = initializeButtonGroup({
                items: [
                    { text: "test1", badge: "1" },
                    { text: "test2" },
                    { text: "test3", badge: "2" }
                ]
            });

            buttonGroup.badge(0, false);
            assert.equal(buttonGroup.badge(0), null);
        });

        it("append badge", function() {
            buttonGroup = initializeButtonGroup({
                items: [
                    { text: "test1", badge: "1" },
                    { text: "test2" },
                    { text: "test3", badge: "2" }
                ]
            });

            buttonGroup.badge(1, "1");
            assert.equal(buttonGroup.badge(1), "1");
        });

    });
}());