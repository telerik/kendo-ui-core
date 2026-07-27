import '@progress/kendo-ui/src/kendo.multiselect.js';

let MultiSelect = kendo.ui.MultiSelect,
    select;

function populateSelect(length) {
    let options = [];
    length = length || 5;
    for (let i = 0; i < length; i++) {
        options.push("<option value='" + i + "'>Option" + i + "</option>");
    }
    select.html(options);
}

describe("kendo.ui.MultiSelect summarizeAfter", function() {
    beforeEach(function() {
        kendo.ns = "kendo-";
        select = $("<select multiple=multiple/>").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.ns = "";
        if (select.data("kendoMultiSelect")) {
            select.data("kendoMultiSelect").destroy();
        }
        select.parents(".k-widget").remove();
    });

    it("summarizeAfter: null renders individual chips unchanged", function() {
        populateSelect(5);
        let ms = new MultiSelect(select, { tagMode: "multiple", animation: false });
        ms.value(["0","1","2"]);
        assert.equal(ms.tagList.children('.k-chip').length, 3);
    });

    it("summarizeAfter: 3 with 3 items selected renders individual chips (at threshold, not exceeded)", function() {
        populateSelect(5);
        let ms = new MultiSelect(select, { summarizeAfter: 3, tagMode: "multiple", animation: false });
        ms.value(["0","1","2"]);
        assert.equal(ms.tagList.children('.k-chip').length, 3);
    });

    it("summarizeAfter: 3 with 4 items selected renders 3 individual chips plus 1 overflow chip", function() {
        populateSelect(5);
        let ms = new MultiSelect(select, { summarizeAfter: 3, tagMode: "multiple", animation: false });
        ms.value(["0","1","2","3"]);
        assert.equal(ms.tagList.children('.k-chip').length, 4);
    });

    it("overflow chip text shows +N and singleTag label", function() {
        populateSelect(5);
        let ms = new MultiSelect(select, { summarizeAfter: 3, tagMode: "multiple", animation: false });
        ms.value(["0","1","2","3"]);
        let overflowChip = ms.tagList.children('.k-chip').last();
        assert.include(overflowChip.text(), '+1');
        assert.include(overflowChip.text(), ms.options.messages.singleTag);
    });

    it("deselecting below threshold transitions back to individual chips", function() {
        populateSelect(5);
        let ms = new MultiSelect(select, { summarizeAfter: 3, tagMode: "multiple", animation: false });
        ms.value(["0","1","2","3"]);
        assert.equal(ms.tagList.children('.k-chip').length, 4);
        ms.value(["0","1"]);
        assert.equal(ms.tagList.children('.k-chip').length, 2);
    });

    it("with selectAll: true and summarizeAfter: 10, selecting all 15 list items renders 10 individual chips plus 1 overflow chip", function() {
        let options = [];
        for (let i = 0; i < 15; i++) {
            options.push("<option value='" + i + "'>Item" + i + "</option>");
        }
        select.html(options);
        let ms = new MultiSelect(select, {
            selectAll: true,
            summarizeAfter: 10,
            tagMode: "multiple",
            animation: false
        });
        ms.open();
        ms.list.find('.k-list-sticky-header-item').trigger('click');
        assert.equal(ms.tagList.children('.k-chip').length, 11);
    });

    it("summarizeAfter shows first N chips plus 1 overflow chip even when filter is active", function() {
        populateSelect(5);
        let ms = new MultiSelect(select, {
            summarizeAfter: 2,
            tagMode: "multiple",
            animation: false,
            filter: "contains"
        });
        ms.value(["0","1","2"]);
        ms.open();
        ms.search("Option0");
        let chips = ms.tagList.children('.k-chip');
        assert.equal(chips.length, 3);
    });
});
