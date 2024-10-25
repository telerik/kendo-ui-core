(function() {
    var buttonGroup;
    describe("kendo.ui.ButtonGroup selection", function() {
        beforeEach(function() {
            setupDom();
        });
        afterEach(function() {
            buttonGroup.destroy();
        });

        it("multiple selection of items", function() {
            buttonGroup = initializeButtonGroup({
                selection: "multiple"
            });
            buttonGroup.select(buttonGroup.element.children().eq(1));
            buttonGroup.select(buttonGroup.element.children().eq(2));

            assert.isOk(buttonGroup.element.children().eq(1).hasClass('k-selected'));
            assert.isOk(buttonGroup.element.children().eq(2).hasClass('k-selected'));
        });

        it("multiple selection of items by index", function() {
            buttonGroup = initializeButtonGroup({
                selection: "multiple"
            });
            buttonGroup.select(1);
            buttonGroup.select(2);

            assert.isOk(buttonGroup.element.children().eq(1).hasClass('k-selected'));
            assert.isOk(buttonGroup.element.children().eq(2).hasClass('k-selected'));
        });

        it("simultaneous multiple selection of items", function() {
            buttonGroup = initializeButtonGroup({
                selection: "multiple"
            });
            buttonGroup.select(buttonGroup.element.children().eq(1).add(buttonGroup.element.children().eq(2)));

            assert.isOk(buttonGroup.element.children().eq(1).hasClass('k-selected'));
            assert.isOk(buttonGroup.element.children().eq(2).hasClass('k-selected'));
        });

        it("selectedIndices updated on multiple selection", function() {
            buttonGroup = initializeButtonGroup({
                selection: "multiple",
                index: 0
            });

            buttonGroup.select(buttonGroup.element.children().eq(0));
            buttonGroup.select(buttonGroup.element.children().eq(1));
            buttonGroup.select(buttonGroup.element.children().eq(2));

            assert.equal(buttonGroup.selectedIndices.length, 2);
            assert.equal(buttonGroup.selectedIndices[0], 1);
            assert.equal(buttonGroup.selectedIndices[1], 2);
        });

        it("selectedIndices updated on simultaneous multiple selection", function() {
            buttonGroup = initializeButtonGroup({
                selection: "multiple",
                index: 0
            });

            buttonGroup.select(buttonGroup.element.children().eq(0).add(buttonGroup.element.children().eq(1)).add(buttonGroup.element.children().eq(2)));

            assert.equal(buttonGroup.selectedIndices.length, 2);
            assert.equal(buttonGroup.selectedIndices[0], 1);
            assert.equal(buttonGroup.selectedIndices[1], 2);
        });

        it("single selection of items", function() {
            buttonGroup = initializeButtonGroup({
                selection: "single"
            });
            buttonGroup.select(buttonGroup.element.children().eq(0));
            buttonGroup.select(buttonGroup.element.children().eq(1));

            assert.isOk(!buttonGroup.element.children().eq(0).hasClass('k-selected'));
            assert.isOk(buttonGroup.element.children().eq(1).hasClass('k-selected'));
        });

        it("selectedIndices updated on single selection", function() {
            buttonGroup = initializeButtonGroup({
                selection: "single",
                index: 0
            });
            buttonGroup.select(buttonGroup.element.children().eq(0));

            assert.equal(buttonGroup.selectedIndices.length, 1);
            assert.equal(buttonGroup.selectedIndices[0], 0);

            buttonGroup.select(buttonGroup.element.children().eq(1));

            assert.equal(buttonGroup.selectedIndices.length, 1);
            assert.equal(buttonGroup.selectedIndices[0], 1);

            buttonGroup.select(buttonGroup.element.children().eq(2));

            assert.equal(buttonGroup.selectedIndices.length, 1);
            assert.equal(buttonGroup.selectedIndices[0], 2);
        });

        it("single selection of items by index", function() {
            buttonGroup = initializeButtonGroup({
                selection: "single"
            });
            buttonGroup.select(1);

            assert.equal(buttonGroup.element.find(".k-button.k-selected").length, 1);
            assert.isOk(buttonGroup.element.children().eq(1).hasClass('k-selected'));

            buttonGroup.select(2);

            assert.equal(buttonGroup.element.find(".k-button.k-selected").length, 1);
            assert.isOk(buttonGroup.element.children().eq(2).hasClass('k-selected'));
        });

        it("select() method is not executed if selection is disabled", function() {
            buttonGroup = initializeButtonGroup({
                selection: "none",
                index: 0
            });
            buttonGroup.select(buttonGroup.element.children().eq(0));
            buttonGroup.select(buttonGroup.element.children().eq(1));
            buttonGroup.select(buttonGroup.element.children().eq(2));

            assert.equal(buttonGroup.selectedIndices.length, 0);
            assert.equal(buttonGroup.element.find(".k-selected").length, 0);
        });
    });
}());