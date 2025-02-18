import { SplitterHelpers } from "../../helpers/unit/splitter-utils.js";
import { stub } from "../../helpers/unit/stub.js";

let splitter;
let create = SplitterHelpers.create;
let keys = kendo.keys;

describe("splitter keyboard navigation", function() {
    beforeEach(SplitterHelpers.basicModule.setup);
    afterEach(SplitterHelpers.basicModule.teardown);

    it("Splitter explicitly call resizing.end() on blur of the splitbar", function() {
        splitter = create();

        let splitbar = splitter.dom.find(".k-splitbar");

        stub(splitter.object.resizing, "end");

        splitbar.focus().blur();

        assert.equal(splitter.object.resizing.calls("end"), 1);
    });

    it("Splitter explicitly presses the clicked bar", function() {
        splitter = create();

        let splitbar = splitter.dom.find(".k-splitbar");

        splitbar.mousedown();

        assert.equal(splitbar[0], document.activeElement);
    });

    it("Splitter moves splitbar to left on key LEFT", function() {
        splitter = create();

        let splitbar = splitter.dom.find(".k-splitbar");
		let splitbarOldPosition = Math.floor(splitbar.position().left);
        splitbar.focus();
      	splitbar.press({ keyCode: keys.LEFT });

        assert.equal(splitbarOldPosition - 10, Math.floor(splitbar.position().left));
    });

    it("Splitter moves splitbar to right on key RIGHT", function() {
        splitter = create();

        let splitbar = splitter.dom.find(".k-splitbar");
		let splitbarOldPosition = Math.floor(splitbar.position().left);

        splitbar.focus();
      	splitbar.press({ keyCode: keys.RIGHT });

        assert.equal(splitbarOldPosition + 10, Math.floor(splitbar.position().left));
    });

    it("Splitter uses only specific keys depending on the orientation", function() {
        splitter = create();

        let splitbar = splitter.dom.find(".k-splitbar");
		let splitbarOriginalPosition = Math.floor(splitbar.position().left);

        splitbar.focus().press({ keyCode: keys.RIGHT });

        assert.equal(splitbarOriginalPosition + 10, Math.floor(splitbar.position().left));

        splitbar.focus().press({ keyCode: keys.DOWN });

        assert.equal(splitbarOriginalPosition + 10, Math.floor(splitbar.position().left));
    });

    it("Splitter accepts resized splitbar on ENTER", function() {
        splitter = create();

        let splitbar = splitter.dom.find(".k-splitbar"),
            initialLeft = splitbar.position().left;

        splitbar.focus().press({ keyCode: keys.LEFT });
        splitbar.focus().press({ keyCode: keys.ENTER });

        assert.equal(splitbar.position().left, initialLeft - 10);
    });

    it("Splitter can resize splitbar after previous resize", function() {
        splitter = create();

        let splitbar = splitter.dom.find(".k-splitbar"),
            initialLeft = splitbar.position().left;

        splitbar.focus().press({ keyCode: keys.ENTER });
        splitbar.focus().press({ keyCode: keys.LEFT });

        assert.equal(splitbar.position().left, initialLeft - 10);
    });

    it("Splitter defines navigationKeys depending on the orientation", function() {
        splitter = create({ orientation: "vertical" });

        let navKeys = splitter.object._keys;

        assert.equal(navKeys.decrease, keys.UP);
        assert.equal(navKeys.increase, keys.DOWN);
    });

    it.skip("Resizable handles ESC", function() {
        splitter = create();

        let splitbar = splitter.dom.find(".k-splitbar"),
            initialLeft = splitbar.position().left;

        splitbar.focus().press({ keyCode: keys.LEFT });
        splitbar.focus().press({ type: "keyup", keyCode: keys.ESC });

        let hint = splitter.object.resizing._resizable.hint;

        assert.isOk(!hint.is(":visible"));
        assert.equal(splitbar.position().left, initialLeft);
    });

    it("Splitter collapses left pane on CTRL + LEFT", function() {
        splitter = create({
            panes: [{ collapsible: true }, {}]
        });
        let splitbar = splitter.dom.find(".k-splitbar"),
            pane = splitter.dom.find(".k-pane:first");

        splitbar.focus().press({ ctrlKey: true, keyCode: keys.LEFT });

        assert.equal(pane.width(), 0);
    });

    it("Splitter collapses left pane on CTRL + RIGHT", function() {
        splitter = create({
            panes: [
                { collapsible: true },
                { collapsible: true }
            ]
        });

        let splitbar = splitter.dom.find(".k-splitbar"),
            pane = splitter.dom.find(".k-pane:last");

        splitbar.focus().press({ ctrlKey: true, keyCode: keys.RIGHT });

        assert.equal(pane.width(), 0);
    });

    it("Splitter expands left pane on CTRL + RIGHT", function() {
        splitter = create({
            panes: [
                { collapsible: true },
                { collapsible: true }
            ]
        });

        let splitbar = splitter.dom.find(".k-splitbar"),
            pane = splitter.dom.find(".k-pane:first");

        splitbar.focus().press({ ctrlKey: true, keyCode: keys.LEFT });
        splitbar.focus().press({ ctrlKey: true, keyCode: keys.RIGHT });

        assert.notEqual(pane.width(), 0);
    });

    it("Splitter expands right pane on CTRL + LEFT", function() {
        splitter = create({
            panes: [
                { collapsible: true },
                { collapsible: true }
            ]
        });

        let splitbar = splitter.dom.find(".k-splitbar"),
            pane = splitter.dom.find(".k-pane:last");

        splitbar.focus().press({ ctrlKey: true, keyCode: keys.RIGHT });
        splitbar.focus().press({ ctrlKey: true, keyCode: keys.LEFT });

        assert.notEqual(pane.width(), 0);
    });

    it("Splitter calls resizing.end if pane is process of resizing when press CTRL + LEFT", function() {
        splitter = create({
            panes: [
                { collapsible: true },
                { collapsible: true }
            ]
        });

        let resizing = splitter.object.resizing,
            splitbar = splitter.dom.find(".k-splitbar");

        stub(resizing, "end");

        splitbar.focus().press({ keyCode: keys.RIGHT });
        splitbar.focus().press({ ctrlKey: true, keyCode: keys.LEFT });

        assert.equal(resizing.calls("end"), 1);
    });

    it("Splitter calls resizing.end if pane is process of resizing when press CTRL + RIGHT", function() {
        splitter = create({
            panes: [
                { collapsible: true },
                { collapsible: true }
            ]
        });

        let resizing = splitter.object.resizing,
            splitbar = splitter.dom.find(".k-splitbar");

        stub(resizing, "end");

        splitbar.focus().press({ keyCode: keys.RIGHT });
        splitbar.focus().press({ ctrlKey: true, keyCode: keys.RIGHT });

        assert.equal(resizing.calls("end"), 1);
    });

    it("Splitter adds focused class on focus", function() {
        splitter = create();

        let splitbar = splitter.dom.find(".k-splitbar");

        splitbar.focus();

        assert.isOk(splitbar.hasClass("k-focus"));
    });

    it("Splitter removes focused class on focus", function() {
        splitter = create();

        let splitbar = splitter.dom.find(".k-splitbar");

        splitbar.focus().blur();

        assert.isOk(!splitbar.hasClass("k-focus"));
    });
});
