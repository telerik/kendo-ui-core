import '@progress/kendo-ui/src/kendo.dropdownlist.js';

let DropDownList = kendo.ui.DropDownList;
let dropdownlist;
let input;

describe("kendo.ui.DropDownList adaptive mode switching", function() {
    beforeEach(function() {
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
});
