(function() {
    var create = SplitterHelpers.create;

    describe("Splitter WAI-ARIA with AXE", function() {
        beforeEach(SplitterHelpers.basicModule.setup);
        afterEach(SplitterHelpers.basicModule.teardown);

        it("Splitter is accessible", function(done) {
            create();
            axeRunFixture(done);
        });
    });

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
        });

        it("adds aria-orientation to horizontal splitbar", function() {
            var splitter = create({
                orientation: "horizontal"
            });
            var splitbar = splitter.dom.find(".k-splitbar");
            assert.equal(splitbar.attr("aria-orientation"), "vertical");
        });

        it("adds aria-value- attributes to splitbars", function() {
            var splitter = create();
            var splitbars = splitter.dom.find(".k-splitbar");

            assert.equal(splitbars.eq(0).attr("aria-valuemin"), "0");
            assert.equal(splitbars.eq(0).attr("aria-valuemax"), "100");
            assert.equal(splitbars.eq(0).attr("aria-valuenow"), "50");
        });

        it("adds aria-controls attribute to splitbar pointing to the primary pane", function() {
            var splitter = create();
            var splitbar = splitter.dom.find(".k-splitbar");
            var panes = splitter.dom.find(".k-pane");

            assert.equal(splitbar.attr("aria-controls"), panes.eq(0).attr("id"));
        });

        it("adds aria-label taken from the primary pane", function() {
            var splitter = create({
                panes: [{
                    label: "test label"
                }, {
                    label: "second"
                }]
            });
            var splitbar = splitter.dom.find(".k-splitbar");

            assert.equal(splitbar.attr("aria-label"), "test label");
        });

        it("adds aria-labelledby taken from the primary pane", function() {
            var splitterEl = $('<div>' +
                '<div>' +
                    '<div>' +
                        '<h3 id="label">Inner splitter / left pane</h3>' +
                        '<p>Resizable and collapsible.</p>' +
                    '</div>' +
                '</div>' +
                '<div>' +
                    '<div>' +
                        '<h3 id="second">Inner splitter / center pane</h3>' +
                        '<p>Resizable only.</p>' +
                    '</div>' +
                '</div>' +
            '</div>');

            splitterEl.appendTo(Mocha.fixture);

            var splitter = new kendo.ui.Splitter(splitterEl, {
                panes: [{
                    labelId: "label"
                }, {
                    label: "second"
                }]
            });

            var splitbar = splitterEl.find(".k-splitbar");
            var pane = splitterEl.find(".k-pane").eq(0);

            assert.equal(splitbar.attr("aria-labelledby"), pane.find("h3").attr("id"));
        });
    });
}());
