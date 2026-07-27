import '@progress/kendo-ui/src/kendo.multiselect.js';

let MultiSelect = kendo.ui.MultiSelect,
    keys = kendo.keys,
    select;

function populateSelect(length) {
    let options = [];
    length = length || 5;
    for (let i = 0; i < length; i++) {
        options.push("<option value='" + i + "'>Option" + i + "</option>");
    }
    select.html(options);
}

describe("kendo.ui.MultiSelect Select All — rendering", function() {
    beforeEach(function() {
        kendo.ns = "kendo-";
        select = $("<select multiple=multiple/>").appendTo(Mocha.fixture);
        populateSelect();
    });
    afterEach(function() {
        kendo.ns = "";
        if (select.data("kendoMultiSelect")) {
            select.data("kendoMultiSelect").destroy();
        }
        select.parents(".k-widget").remove();
    });

    it("list does not contain .k-list-sticky-header when selectAll is false", function() {
        let ms = new MultiSelect(select, { animation: false });
        assert.equal(ms.list.children('.k-list-sticky-header').length, 0);
    });

    it("list contains exactly one .k-list-sticky-header when selectAll is true", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false });
        assert.equal(ms.list.children('.k-list-sticky-header').length, 1);
    });

    it(".k-list-sticky-header precedes .k-list-content in DOM order", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false });
        let header = ms.list.children('.k-list-sticky-header');
        let content = ms.list.children('.k-list-content');
        assert.isOk(header.index() < content.index());
    });

    it(".k-list-sticky-header-item text matches messages.selectAll", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false });
        let text = ms.list.find('.k-list-sticky-header .k-list-item-text').text();
        assert.equal(text, ms.options.messages.selectAll);
    });

    it("no .k-checkbox-wrap in sticky header when checkboxes is false", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false });
        assert.equal(ms.list.find('.k-list-sticky-header .k-checkbox-wrap').length, 0);
    });

    it("sticky header contains span.k-checkbox-wrap > input.k-checkbox when checkboxes is true", function() {
        let ms = new MultiSelect(select, { selectAll: true, checkboxes: true, animation: false });
        let wrap = ms.list.find('.k-list-sticky-header .k-checkbox-wrap');
        assert.equal(wrap.length, 1);
        assert.equal(wrap.find('input.k-checkbox').length, 1);
    });

    it("sticky header checkbox has aria-label equal to messages.selectAll", function() {
        let ms = new MultiSelect(select, { selectAll: true, checkboxes: true, animation: false });
        let cb = ms.list.find('.k-list-sticky-header input.k-checkbox');
        assert.equal(cb.attr('aria-label'), ms.options.messages.selectAll);
    });

    it(".k-list-sticky-header is removed after setOptions({ selectAll: false })", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false });
        ms.setOptions({ selectAll: false });
        assert.equal(ms.list.children('.k-list-sticky-header').length, 0);
    });

    it("header renders after setOptions({ selectAll: true }) on an instance with selectAll: false", function() {
        let ms = new MultiSelect(select, { animation: false });
        ms.setOptions({ selectAll: true });
        assert.equal(ms.list.children('.k-list-sticky-header').length, 1);
    });

    it(".k-list-sticky-header IS rendered when virtual is true", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false });
        ms.options.virtual = true;
        ms._removeSelectAllHeader();
        ms._renderSelectAllHeader();
        assert.equal(ms.list.children('.k-list-sticky-header').length, 1);
    });
});

describe("kendo.ui.MultiSelect Select All — state machine", function() {
    beforeEach(function() {
        kendo.ns = "kendo-";
        select = $("<select multiple=multiple/>").appendTo(Mocha.fixture);
        populateSelect();
    });
    afterEach(function() {
        kendo.ns = "";
        if (select.data("kendoMultiSelect")) {
            select.data("kendoMultiSelect").destroy();
        }
        select.parents(".k-widget").remove();
    });

    it("_selectAllState returns 'unchecked' when no items are selected", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false });
        assert.equal(ms._selectAllState(), "unchecked");
    });

    it("_selectAllState returns 'checked' when all items in the datasource are selected", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false, value: ["0","1","2","3","4"] });
        assert.equal(ms._selectAllState(), "checked");
    });

    it("_selectAllState returns 'indeterminate' when some but not all datasource items are selected", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false, value: ["0","1"] });
        assert.equal(ms._selectAllState(), "indeterminate");
    });

    it("sticky header item has k-selected when no checkboxes and all items are selected", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false, value: ["0","1","2","3","4"] });
        ms.open();
        assert.isOk(ms.list.find('.k-list-sticky-header-item').hasClass('k-selected'));
    });

    it("sticky header item does not have k-selected when no checkboxes and some items are selected", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false, value: ["0","1"] });
        ms.open();
        assert.isOk(!ms.list.find('.k-list-sticky-header-item').hasClass('k-selected'));
    });

    it("sticky header item does not have k-selected when no checkboxes and no items are selected", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false });
        ms.open();
        assert.isOk(!ms.list.find('.k-list-sticky-header-item').hasClass('k-selected'));
    });

    it("clicking unchecked sticky header selects all flatView items", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false });
        ms.open();
        ms.list.find('.k-list-sticky-header-item').trigger('click');
        assert.equal(ms.value().length, 5);
    });

    it("clicking checked sticky header deselects all items", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false, value: ["0","1","2","3","4"] });
        ms.open();
        ms.list.find('.k-list-sticky-header-item').trigger('click');
        assert.equal(ms.value().length, 0);
    });

    it("clicking indeterminate sticky header selects all flatView items", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false, value: ["0","1"] });
        ms.open();
        ms.list.find('.k-list-sticky-header-item').trigger('click');
        assert.equal(ms.value().length, 5);
    });

    it("after manually deselecting one from all-selected, header state is indeterminate in checkbox mode", function() {
        let ms = new MultiSelect(select, { selectAll: true, checkboxes: true, animation: false, value: ["0","1","2","3","4"] });
        ms.open();
        ms.listView.select(ms.listView.items().first()).done(function() {
            ms._change();
        });
        assert.equal(ms._selectAllState(), "indeterminate");
    });

    it("after deselecting all items, header state is unchecked", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false, value: ["0","1","2","3","4"] });
        ms.open();
        ms.list.find('.k-list-sticky-header-item').trigger('click');
        assert.equal(ms._selectAllState(), "unchecked");
    });

    it("change event fires once after select-all click", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false });
        let changeCount = 0;
        ms.bind('change', function() { changeCount++; });
        ms.open();
        ms.list.find('.k-list-sticky-header-item').trigger('click');
        assert.equal(changeCount, 1);
    });

    it("select event fires once per item added via select-all click", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false });
        let selectCount = 0;
        ms.bind('select', function() { selectCount++; });
        ms.open();
        ms.list.find('.k-list-sticky-header-item').trigger('click');
        assert.equal(selectCount, 5);
    });

    it("popup closes after select-all click when autoClose is true (default)", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false });
        ms.open();
        ms.list.find('.k-list-sticky-header-item').trigger('click');
        assert.isOk(!ms.popup.visible());
    });

    it("popup remains open after select-all click when autoClose is false", function() {
        let ms = new MultiSelect(select, { selectAll: true, autoClose: false, animation: false });
        ms.open();
        ms.list.find('.k-list-sticky-header-item').trigger('click');
        assert.isOk(ms.popup.visible());
    });
});

describe("kendo.ui.MultiSelect Select All — checkboxes", function() {
    beforeEach(function() {
        kendo.ns = "kendo-";
        select = $("<select multiple=multiple/>").appendTo(Mocha.fixture);
        populateSelect();
    });
    afterEach(function() {
        kendo.ns = "";
        if (select.data("kendoMultiSelect")) {
            select.data("kendoMultiSelect").destroy();
        }
        select.parents(".k-widget").remove();
    });

    it("each li.k-list-item contains span.k-checkbox-wrap > input.k-checkbox when checkboxes is true", function() {
        let ms = new MultiSelect(select, { selectAll: true, checkboxes: true, animation: false });
        ms.open();
        let items = ms.listView.items();
        assert.isOk(items.length > 0);
        items.each(function() {
            assert.equal($(this).find('.k-checkbox-wrap input.k-checkbox').length, 1);
        });
    });

    it("li.k-list-item elements do not contain .k-checkbox when checkboxes is false", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false });
        ms.open();
        assert.equal(ms.listView.items().find('.k-checkbox').length, 0);
    });

    it("header checkbox has k-checked when all items are selected", function() {
        let ms = new MultiSelect(select, { selectAll: true, checkboxes: true, animation: false, value: ["0","1","2","3","4"] });
        let cb = ms.list.find('.k-list-sticky-header input.k-checkbox');
        assert.isOk(cb.hasClass('k-checked'));
        assert.isOk(!cb.hasClass('k-indeterminate'));
    });

    it("header checkbox has neither k-checked nor k-indeterminate when no items are selected", function() {
        let ms = new MultiSelect(select, { selectAll: true, checkboxes: true, animation: false });
        let cb = ms.list.find('.k-list-sticky-header input.k-checkbox');
        assert.isOk(!cb.hasClass('k-checked'));
        assert.isOk(!cb.hasClass('k-indeterminate'));
    });

    it("header checkbox has k-indeterminate when some items are selected", function() {
        let ms = new MultiSelect(select, { selectAll: true, checkboxes: true, animation: false, value: ["0","1"] });
        let cb = ms.list.find('.k-list-sticky-header input.k-checkbox');
        assert.isOk(cb.hasClass('k-indeterminate'));
        assert.isOk(!cb.hasClass('k-checked'));
    });
});

describe("kendo.ui.MultiSelect Select All — filtering edge cases", function() {
    beforeEach(function() {
        kendo.ns = "kendo-";
        select = $("<select multiple=multiple/>").appendTo(Mocha.fixture);
        populateSelect(5);
    });
    afterEach(function() {
        kendo.ns = "";
        if (select.data("kendoMultiSelect")) {
            select.data("kendoMultiSelect").destroy();
        }
        select.parents(".k-widget").remove();
    });

    it("clicking Select All after filtering adds only filtered values", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false, filter: "contains" });
        ms.open();
        ms.search("Option0");
        ms.list.find('.k-list-sticky-header-item').trigger('click');
        assert.equal(ms.value().length, 1);
        assert.equal(ms.value()[0], "0");
    });

    it("after clearing filter with 2 of 5 selected, header state is indeterminate", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false, filter: "contains" });
        ms.open();
        ms.search("Option0");
        ms.list.find('.k-list-sticky-header-item').trigger('click');
        ms.search("Option1");
        ms.list.find('.k-list-sticky-header-item').trigger('click');
        ms.search("");
        assert.equal(ms._selectAllState(), "indeterminate");
    });

    it("clicking Select All then again with filter preserves out-of-filter selections", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false, filter: "contains", value: ["0", "1"], autoClose: false });
        ms.open();
        ms.search("Option2");
        ms.list.find('.k-list-sticky-header-item').trigger('click');
        assert.isOk(ms.value().indexOf("0") !== -1);
        assert.isOk(ms.value().indexOf("1") !== -1);
        assert.isOk(ms.value().indexOf("2") !== -1);
        ms.list.find('.k-list-sticky-header-item').trigger('click');
        assert.isOk(ms.value().indexOf("0") !== -1);
        assert.isOk(ms.value().indexOf("1") !== -1);
        assert.equal(ms.value().indexOf("2"), -1);
    });

    it("with maxSelectedItems: 3 and 5-item list, clicking Select All caps selection at 3", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false, maxSelectedItems: 3 });
        ms.open();
        ms.list.find('.k-list-sticky-header-item').trigger('click');
        assert.equal(ms.value().length, 3);
    });

    it("tags render correctly after Select All deselects filtered-in items with remaining out-of-filter items", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false, filter: "contains" });
        ms.open();
        ms.list.find('.k-list-sticky-header-item').trigger('click');
        assert.equal(ms.value().length, 5);

        ms.search("Option0");
        ms.list.find('.k-list-sticky-header-item').trigger('click');

        let tagTexts = ms.tagList.find('.k-chip-label').map(function() { return $(this).text(); }).get();
        assert.equal(tagTexts.indexOf("[object Object]"), -1);
        assert.isOk(ms.value().indexOf("0") === -1);
        assert.equal(ms.value().length, 4);
    });

    it("dataItems are preserved after Select All deselects filtered-in items", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false, filter: "contains" });
        ms.open();
        ms.list.find('.k-list-sticky-header-item').trigger('click');

        ms.search("Option0");
        ms.list.find('.k-list-sticky-header-item').trigger('click');

        let dataItems = ms.dataItems();
        assert.equal(dataItems.length, ms.value().length);
    });

    it("dataSource filter is cleared after Select All with autoClose:true so popup shows all items on reopen", function(done) {
        let ms = new MultiSelect(select, { selectAll: true, animation: false, filter: "contains", autoClose: true });
        ms.open();
        ms.search("Option0");
        ms.list.find('.k-list-sticky-header-item').trigger('click');

        ms.one("dataBound", function() {
            assert.isOk(!ms.listView.isFiltered());
            assert.equal(ms.dataSource.flatView().length, 5);
            done();
        });
    });

    it("dataSource filter is preserved after Select All with autoClose:false so popup keeps filtered items", function() {
        let ms = new MultiSelect(select, { selectAll: true, animation: false, filter: "contains", autoClose: false });
        ms.open();
        ms.search("Option0");
        ms.list.find('.k-list-sticky-header-item').trigger('click');

        assert.isOk(ms.listView.isFiltered());
        assert.equal(ms.dataSource.flatView().length, 1);
    });
});
