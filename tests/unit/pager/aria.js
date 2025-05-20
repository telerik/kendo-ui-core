import '@progress/kendo-ui/src/kendo.pager.js';

let DataSource = kendo.data.DataSource,
    pager,
    dataSource;

function setup(dataOptions, options) {
    dataOptions = $.extend({
        data: [1, 2, 3, 4, 5],
        page: 1,
        pageSize: 1
    }, dataOptions);

    dataSource = new DataSource(dataOptions);
    options = $.extend({
        dataSource: dataSource,
        navigatable: true
    }, options);
    let element = $("<div />").appendTo(Mocha.fixture).kendoPager(options);
    pager = element.data("kendoPager");
    return element;
}

describe('pager aria', function() {
    beforeEach(function() {
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("pager should have role=application", function() {
        let element = setup(null, { pageSizes: [1, 2] });
        assert.equal(element.attr("role"), "application");
    });

    it("pager should have aria-roledescription", function() {
        let element = setup(null, { pageSizes: [1, 2] });
        assert.equal(element.attr("aria-roledescription"), "pager");
    });

    it("pager should have aria-keyshortcuts", function() {
        let element = setup(null, { pageSizes: [1, 2] });
        assert.equal(element.attr("aria-keyshortcuts"), "Enter ArrowRight ArrowLeft");
    });

    it("pager should have aria-label", function() {
        let element = setup(null, { pageSizes: [1, 2] });
        pager.page(1);
        assert.equal(element.attr("aria-label"), "Page navigation, page 1 of 5");
    });

    it("refresh button should have role=button", function() {
        let element = setup(null, { refresh: true });
        assert.equal(element.find(".k-pager-refresh").attr("role"), "button");
    });

    it("refresh button should have aria label", function() {
        let element = setup(null, { refresh: true });
        assert.equal(element.find(".k-pager-refresh").attr("aria-label"), "Refresh");
    });

    it("input should have aria label", function() {
        let element = setup(null, { input: true });
        pager.page(1);

        const input = element.find(".k-pager-numbers-wrap .k-input-inner").first();
        assert.equal(input.attr("aria-label"), pager.options.messages.page);
        assert.equal(input.attr("aria-valuenow"), "1");
    });

    it("page buttons should have role=button", function() {
        let element = setup(null, { navigatable: true, numeric: true });
        pager.page(1);
        assert.equal(element.find(".k-pager-numbers .k-button:eq(0)").attr("role"), "button");
    });

    it("page buttons should have aria-label", function() {
        let element = setup(null, { navigatable: true, numeric: true });
        pager.page(1);
        assert.equal(element.find(".k-pager-numbers .k-button:eq(0)").attr("aria-label"), "Page 1");
    });

    it("selected page button should have role button", function() {
        let element = setup(null, { navigatable: true, numeric: true });
        pager.page(1);
        assert.equal(element.find(".k-pager-numbers .k-button:eq(0)").attr("role"), "button");
    });

    it("page size dropdown should have aria-label", function() {
        let element = setup(null, { navigatable: true, pageSizes: [1, 2] });
        pager.page(1);
        assert.equal(element.find(".k-dropdownlist").attr("aria-label"), "Page sizes drop down");
    });

    it("k-pager-nav buttons should have role=button", function() {
        let pager = setup({}, { navigatable: true, previousNext: true });
        let buttons = pager.find('.k-pager-nav');

        buttons.each(function(i, button) {
            assert.equal(button.getAttribute("role"), "button");
        });
    });

    it("prev button is disabled on the first page", function() {
        let pager = setup({}, { navigatable: true, previousNext: true });

        assert.isOk(pager.find(".k-i-caret-alt-left,.k-svg-i-caret-alt-left").parent().hasClass("k-disabled"));
        assert.equal(pager.find(".k-i-caret-alt-left,.k-svg-i-caret-alt-left").parent().attr("aria-disabled"), "true");
    });
});

describe("kendo.ui.Pager Axe", function() {
    beforeEach(function() {
    });

    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("pager is accessible", async function() {
        let element = setup(null, {
            navigatable: true,
            input: true,
            numeric: true,
            refresh: true,
            pageSizes: [1, 2]
        });

        element.getKendoPager().dataSource.fetch();

        await axeRunFixture();
    });
});
