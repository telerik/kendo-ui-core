import { SplitterHelpers } from "../../helpers/unit/splitter-utils.js";

    let create = SplitterHelpers.create;

    describe("Splitter WAI-ARIA with AXE", function() {
        beforeEach(SplitterHelpers.basicModule.setup);
        afterEach(SplitterHelpers.basicModule.teardown);

        it("Splitter is accessible", async function() {
            create();
            await axeRunFixture();
        });
    });

    describe("splitter aria", function() {
        beforeEach(SplitterHelpers.basicModule.setup);
        afterEach(SplitterHelpers.basicModule.teardown);

        it("adds role group to the panes", function() {
            let splitter = create();
            let panes = splitter.dom.find(".k-pane");

            assert.equal(panes.length, 2);
            assert.equal(panes.eq(0).attr("role"), "group");
            assert.equal(panes.eq(1).attr("role"), "group");
        });

        it("adds role separator to the splitbars", function() {
            let splitter = create();

            let splitbars = splitter.dom.find(".k-splitbar");

            assert.equal(splitbars.length, 1);
            assert.equal(splitbars.eq(0).attr("role"), "separator");
        });

        it("adds aria-orientation to horizontal splitbar", function() {
            let splitter = create({
                orientation: "horizontal"
            });
            let splitbar = splitter.dom.find(".k-splitbar");
            assert.equal(splitbar.attr("aria-orientation"), "vertical");
        });

        it("adds aria-keyshortcuts to splitbars", function() {
            let splitter = create();
            let splitbars = splitter.dom.find(".k-splitbar");

            assert.equal(splitbars.eq(0).attr("aria-keyshortcuts"), "ArrowLeft ArrowRight ArrowUp ArrowDown");
        });

        it("adds aria-keyshortcuts to splitbars", function() {
            let splitter = create();
            let splitbars = splitter.dom.find(".k-splitbar");

            assert.equal(splitbars.eq(0).attr("aria-keyshortcuts"), "ArrowLeft ArrowRight ArrowUp ArrowDown");
        });

        it("adds aria-label taken from the primary pane", function() {
            let splitter = create({
                panes: [{
                    label: "test label"
                }, {
                    label: "second"
                }]
            });
            let splitbar = splitter.dom.find(".k-splitbar");

            assert.equal(splitbar.attr("aria-label"), "test label");
        });

        it("adds aria-labelledby taken from the primary pane", function() {
            let splitterEl = $('<div>' +
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

            let splitter = new kendo.ui.Splitter(splitterEl, {
                panes: [{
                    labelId: "label"
                }, {
                    label: "second"
                }]
            });

            let splitbar = splitterEl.find(".k-splitbar");
            let pane = splitterEl.find(".k-pane").eq(0);

            assert.equal(splitbar.attr("aria-labelledby"), pane.find("h3").attr("id"));
        });

        it("adds aria-valuemin and aria-valuemax to draggable splitbar", function() {
            let splitter = create();
            let splitbar = splitter.dom.find(".k-splitbar");

            assert.equal(splitbar.attr("aria-valuemin"), "0");
            assert.equal(splitbar.attr("aria-valuemax"), "100");
        });

        it("adds aria-controls pointing to the previous pane on draggable splitbar", function() {
            let splitter = create();
            let splitbar = splitter.dom.find(".k-splitbar");
            let previousPane = splitter.dom.find(".k-pane").first();

            assert.isOk(previousPane.attr("id"), "previous pane should have an id");
            assert.equal(splitbar.attr("aria-controls"), previousPane.attr("id"));
        });

        it("does not add aria-valuemin, aria-valuemax, aria-controls to static splitbar", function() {
            let splitter = create({
                panes: [{ resizable: false }, { resizable: false }]
            });
            let splitbar = splitter.dom.find(".k-splitbar");

            assert.isNotOk(splitbar.attr("aria-valuemin"), "static splitbar should not have aria-valuemin");
            assert.isNotOk(splitbar.attr("aria-valuemax"), "static splitbar should not have aria-valuemax");
            assert.isNotOk(splitbar.attr("aria-controls"), "static splitbar should not have aria-controls");
        });

        it("sets aria-valuenow after resize", function() {
            let splitter = create({
                panes: [{ size: "30%" }, {}]
            });
            let splitbar = splitter.dom.find(".k-splitbar");

            assert.isOk(splitbar.attr("aria-valuenow") !== undefined, "aria-valuenow should be set after resize");
        });
    });
