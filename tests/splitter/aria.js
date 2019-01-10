(function() {
    var keys = kendo.keys;
    var create = SplitterHelpers.create;

    describe("splitter aria", function() {
        beforeEach(SplitterHelpers.basicModule.setup);
        afterEach(SplitterHelpers.basicModule.teardown);

        it("adds role group to the panes", function() {
            var splitter = create();

            var panes = splitter.dom.find(".k-pane");

            assert.equal(panes.length, 2);
            assert.equal(panes.eq(0).attr("role"), "group");
            assert.equal(panes.eq(1).attr("role"), "group");
        });

        it("adds role separator to the splitbars", function() {
            var splitter = create();

            var splitbars = splitter.dom.find(".k-splitbar");

            assert.equal(splitbars.length, 1);
            assert.equal(splitbars.eq(0).attr("role"), "separator");
            assert.equal(splitbars.eq(0).attr("aria-expanded"), "true");
        });

        it("sets aria-expanded=false when collapse pane", function() {
            var splitter = create({
                panes: [{ collapsible: true }, {}]
            });
            var splitbar = splitter.dom.find(".k-splitbar");

            splitbar.focus().press({
                ctrlKey: true,
                keyCode: keys.LEFT
            });

            assert.equal(splitbar.attr("aria-expanded"), "false");
        });
    });
}());
