import '@progress/kendo-ui/src/kendo.pager.js';
import { stub } from '../../helpers/unit/stub.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let DataSource = kendo.data.DataSource,
    pager,
    dataSource;

describe('pager', function() {
    beforeEach(function() {
        kendo.ns = "kendo-";
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        kendo.ns = "";
    });

    function setup(dataOptions, options) {
        dataOptions = $.extend({
            data: [1, 2, 3, 4, 5],
            page: 1,
            pageSize: 1
        }, dataOptions);

        dataSource = new DataSource(dataOptions);
        options = $.extend({
            dataSource: dataSource,
            previousNext: false
        }, options);
        let element = $("<div />").appendTo(Mocha.fixture).kendoPager(options);
        pager = element.data("kendoPager");
        return element;
    }

    it("kendoPager attach pager to an element", function() {
        let div = setup();

        assert.isOk(div.data("kendoPager") instanceof kendo.ui.Pager);
        assert.isOk(pager instanceof kendo.ui.Pager);
    });

    it("setting size sets size for wrapper and buttons", function() {
        let div = setup({}, { size: "small" });

        dataSource.read();

        let links = div.find("button");

        assert.isOk(div.hasClass("k-pager-sm"));
        assert.isOk(links.hasClass("k-button-sm"));
        assert.isOk(links.hasClass("k-button-sm"));
        assert.isOk(links.hasClass("k-button-sm"));
        assert.isOk(links.hasClass("k-button-sm"));
        assert.isOk(links.hasClass("k-button-sm"));
    });

    it("renders buttons for all pages", function() {
        let div = setup();

        dataSource.read();

        let links = div.find("button").add(div.find(".k-selected"));
        assert.equal(links.length, 5);
        assert.equal(links[0].innerHTML, '<span class="k-button-text">1</span>');
        assert.equal(links[1].innerHTML, '<span class="k-button-text">2</span>');
        assert.equal(links[2].innerHTML, '<span class="k-button-text">3</span>');
        assert.equal(links[3].innerHTML, '<span class="k-button-text">4</span>');
        assert.equal(links[4].innerHTML, '<span class="k-button-text">5</span>');
    });

    it("setting responsive to false hides input by default", function() {
        let div = setup({}, { responsive: false });

        dataSource.read();

        assert.isNotOk(div.data("kendoPager")._numericTextBox.wrapper.is(":visible"));
    });

    it("one button is rendered on init", function() {
        let div = setup();
        let links = div.find("button").add(div.find(".k-selected"));

        assert.equal(links.length, 1);
        assert.equal(links[0].innerHTML, '<span class="k-button-text">0</span>');
    });

    it("pager should have class k-pager-responsive if responsive=true", function() {
        let div = setup();
        dataSource.read();

        assert.isOk(div.hasClass("k-pager-responsive"));
    });

    it("pager should not have class k-pager-responsive if responsive=false", function() {
        let div = setup(null, { responsive: false });
        dataSource.read();

        assert.isNotOk(div.hasClass("k-pager-responsive"));
    });

    it("buttons are rendered if read before init", function() {
        let dataSource = new DataSource({
            pageSize: 1,
            data: [1, 2, 3]
        });

        dataSource.read();

        let div = $("<div />").appendTo(Mocha.fixture).kendoPager({
            dataSource: dataSource,
            previousNext: false
        });
        let links = div.find("button").add(div.find(".k-selected"));

        assert.equal(links.length, 3);
        assert.equal(links[0].innerHTML, '<span class="k-button-text">1</span>');
        assert.equal(links[1].innerHTML, '<span class="k-button-text">2</span>');
        assert.equal(links[2].innerHTML, '<span class="k-button-text">3</span>');
    });

    it("page number buttons have data attribute assign except for the current page index", function() {
        let div = setup();

        dataSource.read();

        let links = div.find("button:not(.k-selected)");
        assert.equal(div.find(".k-selected").data("page"), undefined);
        assert.equal(links.eq(0).attr("data-kendo-page"), "2");
        assert.equal(links.eq(1).attr("data-kendo-page"), "3");
        assert.equal(links.eq(2).attr("data-kendo-page"), "4");
        assert.equal(links.eq(3).attr("data-kendo-page"), "5");
    });

    it("clear page number buttons on multiple datasource rebinds", function() {
        let div = setup();

        dataSource.read();
        dataSource.read();

        let links = div.find("button");
        assert.equal(links.length, 5);
        assert.equal(links[0].innerHTML, '<span class="k-button-text">1</span>');
        assert.equal(links[1].innerHTML, '<span class="k-button-text">2</span>');
        assert.equal(links[2].innerHTML, '<span class="k-button-text">3</span>');
        assert.equal(links[3].innerHTML, '<span class="k-button-text">4</span>');
        assert.equal(links[4].innerHTML, '<span class="k-button-text">5</span>');
    });

    it("does not render page numbers if total pages are zero", function() {
        let div = setup({ pageSize: -1 });

        dataSource.read();
        assert.equal(div.find("button:not(.k-selected)").length, 0);
    });

    it("currentPage css class is added to current page a", function() {
        let div = setup();

        dataSource.read();
        assert.isOk(div.find(".k-selected").length === 1);
    });

    it("changing page raises change event passing the new index", function() {
        let div = setup(),
            index;

        dataSource.read();
        pager.bind("change", function() {
            index = arguments[0].index;
        });

        div.find("button:not(.k-selected):eq(0)").click();
        assert.equal(index, 2);
    });

    it("change event is fired when clicking a page button", function() {
        let index,
            changeHandler = function(e) {
                index = e.index;
            },
            div = setup({}, { change: changeHandler });

        dataSource.read();

        div.find("button:not(.k-selected):eq(0)").click();
        assert.equal(index, 2);
        assert.equal(typeof index, "number");
    });

    it("clicking on the current page does not trigger change event", function() {
        let div = setup(),
            called = false;

        dataSource.read();
        pager.bind("change", function() {
            called = true;
        });

        div.find("button.currentPage").click();
        assert.isOk(!called);
    });

    it("changing page is paging datasource", function() {
        let div = setup();

        dataSource.read();
        div.find("button:not(.k-selected):eq(0)").click();
        assert.equal(dataSource.page(), 2);
    });

    it("show more button should be shown if page buttons are more than the threshold", function() {
        let div = setup({}, { buttonCount: 3 });

        dataSource.read();
        assert.equal(div.find("button").add(div.find(".k-selected")).length, 4);
        assert.equal(div.find("button:last").attr("data-kendo-page"), "4");
    });

    it("show less button should be shown if page buttons are more than the threshold", function() {
        let div = setup({ page: 4 }, { buttonCount: 3 });

        dataSource.read();
        assert.equal(div.find("button").add(div.find(".k-selected")).length, 3);
        assert.equal(div.find("button:first").attr("data-kendo-page"), "3");
    });

    it("clicking more button pages to next pages group", function() {
        let div = setup({}, { buttonCount: 3 });

        dataSource.read();
        div.find("button:last").click();
        assert.equal(dataSource.page(), 4);
    });

    it("totalPages", function() {
        let div = setup();

        dataSource.read();
        assert.equal(div.data("kendoPager").totalPages(), 5);
    });

    it("pageSize returns the dataSource pageSize value", function() {
        let div = setup();
        dataSource.read();

        assert.equal(div.data("kendoPager").pageSize(), dataSource.pageSize());
    });

    it("page returns the current page", function() {
        let div = setup();
        dataSource.read();
        div.find("button:not(.k-selected):eq(0)").click();

        assert.equal(div.data("kendoPager").page(), 2);
    });

    it("custom linkTemplate should be used instead of the default", function() {
        let div = setup({}, { linkTemplate: () => "<a>foo</a>" });
        dataSource.read();
        assert.equal(div.find("a:eq(0)").text(), "foo");
    });

    it("custom selectTemplate should be used", function() {
        let div = setup({}, { selectTemplate: () => "<a>foo</a>" });
        dataSource.read();
        assert.equal(div.find("a:first").text(), "foo");
    });

    it("single page is rendered if no pageSize is set", function() {
        let data = new DataSource({ data: [1, 2, 3, 4, 5], page: 1 }),
            div = $("<div/>").appendTo(Mocha.fixture).kendoPager({ dataSource: data });

        data.read();
        assert.equal(div.find(".k-selected").length, 1);
    });

    it("pager displays info", function() {
        let pager = setup();
        dataSource.read();

        assert.equal(pager.find(".k-pager-info").text(), "1 - 1 of 5 items");
    });

    it("info start page does not exeed total when deleting records", function() {
        let pager = setup({
            data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
            pageSize: 2
        });

        dataSource.read();
        dataSource.page(2);

        //delete the last two records
        dataSource.remove(dataSource.at(2));
        dataSource.remove(dataSource.at(2));

        assert.equal(pager.find(".k-pager-info").text(), "2 - 2 of 2 items");
    });


    it("pager does not displays info if info is set to false", function() {
        let pager = setup({}, { info: false });
        dataSource.read();

        assert.equal(pager.find(".k-pager-info").length, 0);
    });

    it("pager displays empty message when total is zero", function() {
        let pager = setup({ data: [] });
        dataSource.read();

        assert.equal(pager.find(".k-pager-info").text(), "No items to display");
    });

    it("pager displays input", function() {
        let pager = setup({ data: [] }, { input: true });
        dataSource.read();

        assert.equal(pager.find(".k-pager-input").length, 1);
    });

    it("pager input is placed inside numeric wrap", function() {
        let pager = setup({ data: [] }, { input: true });
        dataSource.read();

        assert.equal(pager.find(".k-pager-numbers-wrap .k-pager-input .k-numerictextbox").length, 1);
    });

    asyncTest("input pager changes the page", function(done) {
        let pager = setup({}, { input: true });
        dataSource.read();

        pager.find(".k-pager-input").find("input").val(2).trigger({ type: "keydown", keyCode: 13 });

        setTimeout(function() {
            done(() => {
                assert.equal(dataSource.page(), 2);
            });
        }, 150);
    });

    asyncTest("input pager stays on current page if the input value is less than one is specified", function(done) {
        let pager = setup({}, { input: true });
        dataSource.read();

        pager.find(".k-pager-input").find("input").val(0).trigger({ type: "keydown", keyCode: 13 });

        setTimeout(function() {
            done(() => {
                assert.equal(dataSource.page(), 1);
                assert.equal(pager.find(".k-pager-input").find("input").val(), "1");
            });
        }, 150);
    });

    asyncTest("input pager stays on current page if the input value is more than the total number of pages", function(done) {
        let pager = setup({}, { input: true });
        dataSource.read();

        pager.find(".k-pager-input").find("input").val(10).trigger({ type: "keydown", keyCode: 13 });

        setTimeout(function() {
            done(() => {
                assert.equal(dataSource.page(), 1);
                assert.equal(pager.find(".k-pager-input").find("input").val(), "1");
            });
        }, 150);
    });

    asyncTest("input pager stays on current page if the input value is not a number", function(done) {
        let pager = setup({}, { input: true });
        dataSource.read();

        pager.find(".k-pager-input").find("input").val("foo").trigger({ type: "keydown", keyCode: 13 });

        setTimeout(function() {
            done(() => {
                assert.equal(dataSource.page(), 1);
                assert.equal(pager.find(".k-pager-input").find("input").val(), "1");
            });
        }, 150);
    });

    it("input pager is updated when the page is changed", function() {
        let pager = setup({}, { input: true });
        dataSource.read();

        dataSource.page(2);
        assert.equal(pager.find(".k-pager-input").find("input").val(), "2");
    });

    it("input pager is disabled if the data source is empty", function() {
        let pager = setup({ data: [] }, { input: true });
        dataSource.read();

        assert.include(["disabled", "true"], pager.find(".k-pager-input").find("input").attr("disabled"));
    });

    it("input pager shows the available pages", function() {
        let pager = setup({}, { input: true });

        dataSource.read();

        assert.equal(pager.find(".k-pager-input").text(), "Pageof 5");
    });

    it("pager localization", function() {
        let pager = setup({}, {
            input: true,
            messages: {
                display: "Showing {0} - {1} of {2}",
                page: "Foo",
                of: "bar{0}"
            }
        });

        dataSource.read();

        assert.equal(pager.find(".k-pager-info").text(), "Showing 1 - 1 of 5");
        assert.equal(pager.find(".k-pager-input").text(), "Foobar5");
        assert.equal(pager.find(".k-pager-input > span").length, 3);

        pager = setup({ data: [] }, {
            messages: {
                empty: "zero"
            }
        });

        dataSource.read();
        assert.equal(pager.find(".k-pager-info").text(), "zero");
    });

    it("shows prev button", function() {
        let pager = setup({}, { previousNext: true });

        assert.equal(pager.find(".k-i-caret-alt-left,.k-svg-i-caret-alt-left").length, 1);
    });

    it("shows first button", function() {
        let pager = setup({}, { previousNext: true });

        assert.equal(pager.find(".k-pager-first .k-i-caret-alt-to-left,.k-pager-first .k-svg-i-caret-alt-to-left").length, 1);
    });

    it("shows next button", function() {
        let pager = setup({}, { previousNext: true });

        assert.equal(pager.find(".k-i-caret-alt-right,.k-svg-i-caret-alt-right").length, 1);
    });

    it("shows last button", function() {
        let pager = setup({}, { previousNext: true });

        assert.equal(pager.find(".k-pager-last .k-i-caret-alt-to-right,.k-pager-last .k-svg-i-caret-alt-to-right").length, 1);
    });

    it("first button is disabled on the first page", function() {
        let pager = setup({}, { previousNext: true });

        assert.isOk(pager.find(".k-pager-first").hasClass("k-disabled"));
    });

    it("first button is enabled on any page but first", function() {
        let pager = setup({}, { previousNext: true });
        dataSource.read();
        dataSource.page(2);

        assert.isOk(!pager.find(".k-pager-first").hasClass("k-disabled"));
    });

    it("prev button is disabled on the first page", function() {
        let pager = setup({}, { previousNext: true });

        assert.isOk(pager.find(".k-i-caret-alt-left,.k-svg-i-caret-alt-left").parent().hasClass("k-disabled"));
    });

    it("prev button is enabled on any page but first", function() {
        let pager = setup({}, { previousNext: true });

        dataSource.read();
        dataSource.page(2);

        assert.isOk(!pager.find(".k-i-caret-alt-left").parent().hasClass("k-disabled"));
    });

    it("prev button page data attribute is set to page minus one", function() {
        let pager = setup({}, { previousNext: true });

        dataSource.read();
        dataSource.page(3);

        assert.equal(pager.find(".k-i-caret-alt-left,.k-svg-i-caret-alt-left").parent().data(kendo.ns + "page"), 2);
    });

    it("next button is disabled on the last page", function() {
        let pager = setup({}, { previousNext: true });

        dataSource.read();
        dataSource.page(5);
        assert.isOk(pager.find(".k-i-caret-alt-right,.k-svg-i-caret-alt-right").parent().hasClass("k-disabled"));
    });

    it("next button is enabled on any page but last", function() {
        let pager = setup({}, { previousNext: true });

        dataSource.read();
        assert.isOk(!pager.find(".k-i-caret-alt-right,.k-svg-i-caret-alt-right").parent().hasClass("k-disabled"));
    });

    it("next button page data attribute is set to page plus one", function() {
        let pager = setup({}, { previousNext: true });

        dataSource.read();
        dataSource.page(3);

        assert.equal(pager.find(".k-i-caret-alt-right,.k-svg-i-caret-alt-right").parent().data(kendo.ns + "page"), 4);
    });

    it("last button is disabled on the last page", function() {
        let pager = setup({}, { navigatable: true, previousNext: true });

        dataSource.read();
        dataSource.page(5);
        assert.isOk(pager.find(".k-pager-last").hasClass("k-disabled"));
        assert.equal(pager.find(".k-pager-last").attr("aria-disabled"), "true");
    });

    it("last button is enabled on any page but last", function() {
        let pager = setup({}, { previousNext: true });

        dataSource.read();
        assert.isOk(!pager.find(".k-pager-last").hasClass("k-disabled"));
    });

    it("prev button page data attribute is set to total pages", function() {
        let pager = setup({}, { previousNext: true });

        dataSource.read();

        assert.equal(pager.find(".k-pager-last").data(kendo.ns + "page"), dataSource.totalPages());
    });

    it("first is enabled if the data source is read before pager init", function() {
        let dataSource = new DataSource({
            pageSize: 1,
            data: [1, 2, 3]
        });

        dataSource.read();
        dataSource.page(2);

        let pager = $("<div />").appendTo(Mocha.fixture).kendoPager({
            dataSource: dataSource,
            autoBind: false
        });

        assert.isOk(!pager.find(".k-pager-first").hasClass("k-disabled"));
    });

    it("previous is enabled if the data source is read before pager init", function() {
        let dataSource = new DataSource({
            pageSize: 1,
            data: [1, 2, 3]
        });

        dataSource.read();
        dataSource.page(2);

        let pager = $("<div />").appendTo(Mocha.fixture).kendoPager({
            dataSource: dataSource,
            autoBind: false
        });

        assert.isOk(!pager.find(".k-i-caret-alt-left").parent().hasClass("k-disabled"));
    });

    it("next is enabled if the data source is read before pager init", function() {
        let dataSource = new DataSource({
            pageSize: 1,
            data: [1, 2, 3]
        });

        dataSource.read();
        dataSource.page(2);

        let pager = $("<div />").appendTo(Mocha.fixture).kendoPager({
            dataSource: dataSource,
            autoBind: false
        });

        assert.isOk(!pager.find(".k-i-caret-alt-right").parent().hasClass("k-disabled"));
    });

    it("last is enabled if the data source is read before pager init", function() {
        let dataSource = new DataSource({
            pageSize: 1,
            data: [1, 2, 3]
        });

        dataSource.read();
        dataSource.page(2);

        let pager = $("<div />").appendTo(Mocha.fixture).kendoPager({
            dataSource: dataSource,
            autoBind: false
        });

        assert.isOk(!pager.find(".k-pager-last").hasClass("k-disabled"));
    });

    it("creates a dropdown for the page sizes", function() {
        let pager = setup({}, { pageSizes: true });

        assert.equal(pager.find(".k-pager-sizes select").length, 1);
    });

    it("default page sizes", function() {
        let pager = setup({}, { pageSizes: true });

        assert.equal(pager.find(".k-pager-sizes select option").text(), "All51020");
    });

    it("all-pages option can be removed", function() {
        let pager = setup({}, { pageSizes: [5, 10, 20] });

        assert.equal(pager.find(".k-pager-sizes select option").text(), "51020");
    });

    it("pageSizes can be array with numbers specifying custom page sizes", function() {
        let pager = setup({}, { pageSizes: [1, 2] });

        assert.equal(pager.find(".k-pager-sizes select option").text(), "12");
    });

    it("the page size of the data source is selected", function() {
        let pager = setup({ pageSize: 2 }, { pageSizes: [1, 2] });

        assert.equal(pager.find(".k-pager-sizes select").val(), "2");
    });

    it("changing the page size of the data source selects the corresponding option", function() {
        let pager = setup({}, { pageSizes: [1, 2] });

        dataSource.pageSize(2);

        assert.equal(pager.find(".k-pager-sizes select").val(), "2");
    });

    it("changing page size to include all items selects all pages", function() {
        let pager = setup({}, { pageSizes: ["all", 1, 2] });

        dataSource.pageSize(5);

        assert.equal(pager.find(".k-pager-sizes select").kendoDropDownList("text"), "All");
    });

    it("drop down inherits size of pager", function() {
        let pager = setup({}, { pageSizes: ["all", 1, 2], size: "small" });

        dataSource.pageSize(5);

        assert.isOk(pager.find(".k-pager-sizes select").getKendoDropDownList().wrapper.hasClass("k-picker-sm"));
    });

    it("drop down inherits adaptiveMode of pager", function() {
        let pager = setup({}, { pageSizes: ["all", 1, 2], adaptiveMode: "auto" });

        assert.isOk(pager.find(".k-pager-sizes select").getKendoDropDownList().options.adaptiveMode === "auto");
    });

    it("changing page size to All with upper case letter sets page size to all pages", function() {
        let pager = setup({}, { pageSizes: [1, 2, "All"] });
        let dropdownlist = pager.find(".k-pager-sizes select").data("kendoDropDownList");
        dataSource.read();
        dropdownlist.dataSource.at(2).set("value", "All");

        dropdownlist.value("All");

        dropdownlist.element.trigger("change");

        assert.isOk(!dataSource.pageSize());
    });

    it("totalPages returns 0 when showing all pages of an empty data source", function() {
        setup({ data: [], pageSize: 0 }, { pageSizes: true });
        assert.equal(pager.totalPages(), 0);
    });

    it("changing the page size of the data source selects the corresponding option", function() {
        let pager = setup({}, { pageSizes: [1, 2] });

        dataSource.pageSize(2);

        assert.equal(pager.find(".k-pager-sizes select").val(), "2");
        assert.equal(pager.find(".k-pager-sizes select").kendoDropDownList("text"), 2);
    });

    it("changing the page size of the data source to a custom value is displayed", function() {
        let pager = setup({}, { pageSizes: [1, 2] });

        dataSource.pageSize(5);

        assert.equal(pager.find(".k-pager-sizes select").kendoDropDownList("text"), 5);
    });


    it("changing the page size from the select changes the page size in the data source", function() {
        let pager = setup({}, { pageSizes: [1, 2] });

        pager.find(".k-pager-sizes select").val(2).trigger("change");

        assert.equal(dataSource.pageSize(), 2);
    });

    it("selecting all pages from the select changes the page size in the data source", function() {
        let pager = setup({}, { pageSizes: ["all", 1, 2] });
        dataSource.read();

        let select = pager.find(".k-pager-sizes select");
        select.val("all").trigger("change");

        assert.isOk(!dataSource.pageSize());
    });

    it("selecting all pages from the select changes the skip in the data source", function() {
        let pager = setup({}, { pageSizes: ["all", 1, 2] });
        dataSource.read();

        let select = pager.find(".k-pager-sizes select");
        pager.data("kendoPager").page(2);
        select.val("all").trigger("change");

        assert.equal(dataSource.page(), 1);
    });

    it("displays refresh button", function() {
        let pager = setup({}, { refresh: true });

        assert.equal(pager.find(".k-i-arrow-rotate-cw,.k-svg-i-arrow-rotate-cw").length, 1);
    });

    it("refresh button inherits size", function() {
        let pager = setup({}, { refresh: true, size: "small" });

        assert.equal(pager.find(".k-i-arrow-rotate-cw,.k-svg-i-arrow-rotate-cw").length, 1);
        assert.isOk(pager.find(".k-i-arrow-rotate-cw,.k-svg-i-arrow-rotate-cw").parent().hasClass("k-button-sm"));
    });

    it("clicking the refresh button reads from the data source", function() {
        let pager = setup({}, { refresh: true });

        dataSource.read();

        stub(dataSource, {
            read: function() {
            }
        });

        pager.find(".k-i-arrow-rotate-cw,.k-svg-i-arrow-rotate-cw").click();

        assert.equal(dataSource.calls("read"), 1);
    });

    it("does not render numeric pager if numeric is set to false", function() {
        let pager = setup({}, { numeric: false });

        dataSource.read();

        assert.equal(pager.find(".k-pager-numbers").length, 0);
    });

    it("dropdown is visible when pager is created multiple times", function() {
        setup();

        let container = $("<div/>").appendTo(Mocha.fixture).kendoPager({
            dataSource: dataSource,
            pageSizes: [10, 20]
        });

        container.data("kendoPager").destroy();

        container.kendoPager({
            dataSource: dataSource,
            pageSizes: [10, 20]
        });

        assert.isOk(container.find(".k-pager-sizes select").data("kendoDropDownList")
            .wrapper.css("display") !== "none");
    });

    it("page size is correctly calculated when all options is set and total is not set", function() {
        let dataSource = new DataSource({
            pageSize: 1,
            data: [1, 2, 3]
        });

        let pager = $("<div />").appendTo(Mocha.fixture).kendoPager({
            dataSource: dataSource,
            pageSizes: true
        });
        dataSource._total = 0;
        dataSource._online = true;
        let dropdownlist = pager.find(".k-pager-sizes select").data("kendoDropDownList");
        dropdownlist.dataSource.at(0).set("value", "All");
        dropdownlist.value("All");
        dropdownlist.element.trigger("change");

        assert.isOk(!dataSource._pageSize);
        assert.isOk(!dataSource._take);
    });

    it("selected li is present when AutoBind is false", function() {
        let dataSource = new DataSource({
            pageSize: 1,
            data: [1, 2, 3]
        });

        let pager = $("<div />").appendTo(Mocha.fixture).kendoPager({
            dataSource: dataSource,
            autoBind: false
        });

        assert.equal(pager.find(".k-pager-numbers .k-selected").length, 1);
    });

    it("info message is correct with dataSource with groupPaging enabled", function() {
        let dataSource = new DataSource({
            pageSize: 10,
            data: [
                { name: "Tea", category: "Beverages" },
                { name: "Coffee", category: "Beverages" },
                { name: "Ham", category: "Food" }
            ],
            // group by the "category" field
            group: { field: "category" },
            groupPaging: true
        });

        dataSource.fetch(function() {
            let pager = $("<div />").appendTo(Mocha.fixture).kendoPager({
                dataSource: dataSource
            }).data('kendoPager');
            dataSource._groupsState[dataSource.view()[0].uid] = true;
            pager.refresh();

            assert.equal(pager.element.find(".k-pager-info").text(), "1 - 3 of 4 items");

        });

    });

    it("pager renders correctly when dataSource is read before pager initialization", function() {
        let dataSource = new DataSource({
            pageSize: 1,
            data: [1, 2, 3]
        });

        dataSource.read();

        let pager = $("<div />").appendTo(Mocha.fixture).kendoPager({
            dataSource: dataSource,
        });

        assert.isOk(pager.find(".k-pager-numbers").css("display") !== "none");
    });
});
