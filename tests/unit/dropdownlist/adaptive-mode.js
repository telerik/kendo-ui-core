import '@progress/kendo-ui/src/kendo.dropdownlist.js';
import { page } from 'vitest/browser';

let DropDownList = kendo.ui.DropDownList;
let dropdownlist;
let input;

describe("kendo.ui.DropDownList adaptive mode switching", function() {
    beforeEach(async function() {
        await page.viewport(375, 812);
        input = $("<input />").appendTo(Mocha.fixture);
    });

    afterEach(function() {
        if (dropdownlist) {
            dropdownlist.destroy();
            dropdownlist = null;
        }
        kendo.destroy(Mocha.fixture);
    });

    function createAdaptiveDropDownList(options) {
        return new DropDownList(input, $.extend({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Item 1", value: "1" },
                { text: "Item 2", value: "2" },
                { text: "Item 3", value: "3" }
            ],
            adaptiveMode: "auto"
        }, options));
    }

    it("list.list remains in DOM after multiple mode switches (mobile->desktop->mobile->desktop)", function() {
        dropdownlist = createAdaptiveDropDownList();

        dropdownlist._createActionSheet();
        dropdownlist._createPopup();
        dropdownlist._createActionSheet();
        dropdownlist._createPopup();

        assert.isOk(dropdownlist.list[0].parentNode, "list.list should have a parent node in the DOM");
        assert.isTrue(dropdownlist.list.parent().length > 0, "list.list.parent() should not be empty");
    });

    it("list.list.parent() returns a non-empty set after mode switches so _adjustListWidth can access style", function() {
        dropdownlist = createAdaptiveDropDownList();

        dropdownlist._createActionSheet();
        dropdownlist._createPopup();
        dropdownlist._createActionSheet();
        dropdownlist._createPopup();

        let listParent = dropdownlist.list.parent();
        assert.isTrue(listParent.length > 0, "list.list.parent() should return at least one element");
        assert.isDefined(listParent[0], "list.list.parent()[0] should be defined");
        assert.isDefined(listParent[0].style, "list.list.parent()[0].style should be accessible");
    });

    it("no orphan UL elements should be direct children of list.list after switching from mobile to desktop", function() {
        dropdownlist = createAdaptiveDropDownList();

        dropdownlist._createActionSheet();
        dropdownlist._createPopup();

        let directULs = dropdownlist.list.children(".k-list-ul");
        assert.equal(directULs.length, 0, "No UL should be a direct child of list.list after mode switch (should be inside k-list-content)");

        let wrappedULs = dropdownlist.list.find(".k-list-content .k-list-ul");
        assert.equal(wrappedULs.length, 1);
    });

    it("list.list stays attached after a single mobile-to-desktop switch", function() {
        dropdownlist = createAdaptiveDropDownList();

        dropdownlist._createActionSheet();
        dropdownlist._createPopup();

        assert.isOk(dropdownlist.list[0].parentNode, "list.list should remain in DOM after mobile->desktop switch");
    });

    it("open() does not throw after mode switches", function() {
        dropdownlist = createAdaptiveDropDownList();

        dropdownlist._createActionSheet();
        dropdownlist._createPopup();

        assert.doesNotThrow(function() {
            dropdownlist.open();
        });
    });

    it("automatically uses adaptive ActionSheet at a small viewport", function() {
        dropdownlist = createAdaptiveDropDownList();

        assert.isTrue(dropdownlist._hasActionSheet());
        assert.isFalse(dropdownlist.popup.element.hasClass("k-popup"));
    });

    it("encodes adaptiveTitle and adaptiveSubtitle in the adaptive header", function() {
        let payload = '<img src=x onerror=void(0)>';
        dropdownlist = createAdaptiveDropDownList({
            adaptiveTitle: payload,
            adaptiveSubtitle: payload
        });

        dropdownlist.popup.open();

        let header = dropdownlist.popup.element.find(".k-actionsheet-titlebar");
        assert.equal(header.find(".k-actionsheet-title > div:first-child").text(), payload);
        assert.equal(header.find(".k-actionsheet-subtitle").text(), payload);
        assert.equal(header.find("img, [onerror]").length, 0);
    });

    it("encodes label fallback in the adaptive header", function() {
        let label = "<b>Label</b>";
        dropdownlist = createAdaptiveDropDownList({
            label: label
        });

        dropdownlist.popup.open();

        let header = dropdownlist.popup.element.find(".k-actionsheet-titlebar");
        let title = header.find(".k-actionsheet-title > div:first-child");
        assert.equal(title.text(), label);
        assert.equal(header.find("img, [onerror]").length, 0);
    });

    it("labels the adaptive action sheet by its title", function() {
        dropdownlist = createAdaptiveDropDownList({
            adaptiveTitle: "Title"
        });

        let titleId = dropdownlist.popup.element.find(".k-actionsheet-title").attr("id");

        assert.isOk(titleId);
        assert.equal(dropdownlist.popup.element.attr("aria-labelledby"), titleId);
    });

    it("does not render aria-labelledby on the adaptive action sheet without a title", function() {
        dropdownlist = createAdaptiveDropDownList();

        assert.isUndefined(dropdownlist.popup.element.attr("aria-labelledby"));
    });

    it("renders aria-label on the adaptive apply button", function() {
        dropdownlist = createAdaptiveDropDownList();

        let button = dropdownlist.popup.element.find("[data-ref-actionsheet-close-button]");

        assert.isOk(button.attr("aria-label"));
    });

    it("wraps the adaptive list in k-list-container and uses the large size", function() {
        dropdownlist = createAdaptiveDropDownList();

        let wrapper = dropdownlist.list.parent();

        assert.isTrue(wrapper.hasClass("k-list-container"));
        assert.isTrue(wrapper.parent().hasClass("k-actionsheet-content"));
        assert.isTrue(dropdownlist.list.hasClass("k-list-lg"));
    });

    it("removes the adaptive list wrapper and the large size when switching to popup", function() {
        dropdownlist = createAdaptiveDropDownList({ size: "small" });

        dropdownlist._createPopup();

        assert.isFalse(dropdownlist.list.hasClass("k-list-lg"));
        assert.isTrue(dropdownlist.list.hasClass("k-list-sm"));
        assert.isTrue(dropdownlist.list.parent().hasClass("k-popup"));
        assert.equal(dropdownlist.list.parent().find(".k-list-container").length, 0);
    });

    it("does not nest the adaptive list wrapper after repeated mode switches", function() {
        dropdownlist = createAdaptiveDropDownList();

        dropdownlist._createPopup();
        dropdownlist._createActionSheet();
        dropdownlist._createActionSheet();

        assert.equal(dropdownlist.popup.element.find(".k-list-container").length, 1);
        assert.isTrue(dropdownlist.list.parent().hasClass("k-list-container"));
    });
});
