(function() {
    var DataSource = kendo.data.DataSource,
        pager,
        dataSource;

    module('pager', {
        setup: function() {
            kendo.ns = "kendo-";
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            kendo.ns = "";
        }
    });

    function setup(dataOptions, options){
        dataOptions = $.extend({
            data: [1,2,3,4,5],
            page: 1,
            pageSize: 1
        }, dataOptions);

        dataSource = new DataSource(dataOptions);
        options = $.extend({
            dataSource: dataSource,
            previousNext: false
        }, options);
        var element = $("<div />").appendTo(QUnit.fixture).kendoPager(options);
        pager = element.data("kendoPager");
        return element;
    }

    test("kendoPager attach pager to an element", function() {
        var ul = setup();

        ok(ul.data("kendoPager") instanceof kendo.ui.Pager);
        ok(pager instanceof kendo.ui.Pager);
    });

    test("renders buttons for all pages", function() {
        var ul = setup();

        dataSource.read();

        var links = ul.find("a").add(ul.find(".k-state-selected"));
        equal(links.length, 5);
        equal(links[0].innerHTML, "1");
        equal(links[1].innerHTML, "2");
        equal(links[2].innerHTML, "3");
        equal(links[3].innerHTML, "4");
        equal(links[4].innerHTML, "5");
    });

    test("one button is rendered on init", function() {
        var ul = setup();
        var links = ul.find("a").add(ul.find(".k-state-selected"));

        equal(links.length, 1);
        equal(links[0].innerHTML, "0");
    });

    test("buttons are rendered if read before init", function() {
        var dataSource = new DataSource({
            pageSize: 1,
            data: [1,2,3]
        });

        dataSource.read();

        var ul = $("<ul />").appendTo(QUnit.fixture).kendoPager({
            dataSource: dataSource,
            previousNext: false
        });
        var links = ul.find("a").add(ul.find(".k-state-selected"));

        equal(links.length, 3);
        equal(links[0].innerHTML, "1");
        equal(links[1].innerHTML, "2");
        equal(links[2].innerHTML, "3");
    });

    test("page number buttons have data attribute assign exept for the current page index", function(){
        var ul = setup();

        dataSource.read();

        var links = ul.find("a");
        equal(ul.find(".k-state-selected").data("page"), undefined);
        equal(links.eq(0).attr("data-kendo-page"), "2");
        equal(links.eq(1).attr("data-kendo-page"), "3");
        equal(links.eq(2).attr("data-kendo-page"), "4");
        equal(links.eq(3).attr("data-kendo-page"), "5");
    });

    test("clear page number buttons on multiple datasource rebinds", function(){
        var ul = setup();

        dataSource.read();
        dataSource.read();

        var links = ul.find("a").add(ul.find(".k-state-selected"));
        equal(links.length, 5);
        equal(links[0].innerHTML, "1");
        equal(links[1].innerHTML, "2");
        equal(links[2].innerHTML, "3");
        equal(links[3].innerHTML, "4");
        equal(links[4].innerHTML, "5");
    });

    test("does not render page numbers if total pages are zero", function(){
        var ul = setup({pageSize: -1});

        dataSource.read();

        equal(ul.find("a").length, 0);
    });

    test("currentPage css class is added to current page a", function(){
        var ul = setup();

        dataSource.read();
        ok(ul.find("span").hasClass("k-state-selected"));
    });

    test("changing page raises change event passing the new index", function() {
        var ul = setup(),
            index;

        dataSource.read();
        pager.bind("change", function(){
            index = arguments[0].index;
        });

        ul.find("a:eq(0)").click();
        equal(index, 2);
    });

    test("change event is fired when clicking a page button", function() {
        var index = 0,
            changeHandler = function (e) {
                index = parseInt(e.index, 10);
            },
            ul = setup( { }, { change: changeHandler } );

        dataSource.read();

        ul.find("a:eq(0)").click();
        equal(index, 2);
    });

    test("clicking on the current page does not trigger change event", function(){
        var ul = setup(),
            called = false;

        dataSource.read();
        pager.bind("change", function(){
            called = true;
        });

        ul.find("a.currentPage").click();
        ok(!called);
    });

    test("changing page is paging datasource", function() {
        var ul = setup();

        dataSource.read();
        ul.find("a:eq(0)").click();
        equal(dataSource.page(), 2);
    });

    test("show more button should be shown if page buttons are more than the threshold", function(){
        var ul = setup({},{ buttonCount: 3});

        dataSource.read();
        equal(ul.find("a").add(ul.find(".k-state-selected")).length, 4);
        equal(ul.find("a:last").attr("data-kendo-page"), "4");
    });

    test("show less button should be shown if page buttons are more than the threshold", function(){
        var ul = setup({ page: 4 },{ buttonCount: 3});

        dataSource.read();
        equal(ul.find("a").add(ul.find(".k-state-selected")).length, 3);
        equal(ul.find("a:first").attr("data-kendo-page"), "3");
    });

    test("clicking more button pages to next pages group", function() {
        var ul = setup({},{ buttonCount: 3});

        dataSource.read();
        ul.find("a:last").click();
        equal(dataSource.page(), 4);
    });

    test("totalPages", function() {
        var ul = setup();

        dataSource.read();
        equal(ul.data("kendoPager").totalPages(), 5);
    });

    test("pageSize returns the dataSource pageSize value", function() {
        var ul = setup();
        dataSource.read();

        equal(ul.data("kendoPager").pageSize(), dataSource.pageSize());
    });

    test("page returns the current page", function(){
        var ul = setup();
        dataSource.read();
        ul.find("a:eq(0)").click();

        equal(ul.data("kendoPager").page(), 2);
    });

    test("custom linkTemplate should be used instead of the default", function() {
        var ul = setup({}, { linkTemplate: "<a>foo</a>" });
        dataSource.read();
        equal(ul.find("a:eq(1)").text(), "foo");
    });

    test("custom selectTemplate should be used", function() {
        var ul = setup({}, { selectTemplate: "<a>foo</a>" });
        dataSource.read();
        equal(ul.find("a:first").text(), "foo");
    });

    test("single page is rendered if no pageSize is set", function() {
        var data = new DataSource( { data: [1,2,3,4,5], page: 1 }),
            ul = $("<ul/>").appendTo(QUnit.fixture).kendoPager({ dataSource: data });

        data.read();
        equal(ul.find(".k-state-selected").length, 1);
    });

    test("pager displays info", function(){
        var pager = setup();
        dataSource.read();

        equal(pager.find(".k-pager-info").text(), "1 - 1 of 5 items");
    });

    test("pager does not displays info if info is set to false", function(){
        var pager = setup({}, { info: false });
            dataSource.read();

        equal(pager.find(".k-pager-info").length, 0);
    });

    test("pager displays empty message when total is zero", function(){
        var pager = setup({data: []});
            dataSource.read();

        equal(pager.find(".k-pager-info").text(), "No items to display");
    });

    test("pager displays input", function() {
        var pager = setup({data: []}, { input: true });
            dataSource.read();

        equal(pager.find(".k-pager-input").length, 1);
    });

    test("input pager changes the page", function() {
        var pager = setup({}, { input: true });
            dataSource.read();

        pager.find(".k-pager-input").find("input").val(2).trigger({ type: "keydown", keyCode: 13 });

        equal(dataSource.page(), 2);
    });

    test("input pager stays on current page if the input value is less than one is specified", function() {
        var pager = setup({}, { input: true });
            dataSource.read();

        pager.find(".k-pager-input").find("input").val(0).trigger({ type: "keydown", keyCode: 13 });

        equal(dataSource.page(), 1);
        equal(pager.find(".k-pager-input").find("input").val(), "1");
    });

    test("input pager stays on current page if the input value is more than the total number of pages", function() {
        var pager = setup({}, { input: true });
            dataSource.read();

        pager.find(".k-pager-input").find("input").val(10).trigger({ type: "keydown", keyCode: 13 });

        equal(dataSource.page(), 1);
        equal(pager.find(".k-pager-input").find("input").val(), "1");
    });

    test("input pager stays on current page if the input value is not a number", function() {
        var pager = setup({}, { input: true });
            dataSource.read();

        pager.find(".k-pager-input").find("input").val("foo").trigger({ type: "keydown", keyCode: 13 });

        equal(dataSource.page(), 1);
        equal(pager.find(".k-pager-input").find("input").val(), "1");
    });

    test("input pager is updated when the page is changed", function() {
        var pager = setup({}, { input: true });
        dataSource.read();

        dataSource.page(2);
        equal(pager.find(".k-pager-input").find("input").val(), "2");
    });

    test("input pager is disabled if the data source is empty", function() {
        var pager = setup({data:[]}, { input: true });
            dataSource.read();

        equal(pager.find(".k-pager-input").find("input").attr("disabled"), "disabled");
    });

    test("input pager shows the available pages", function() {
        var pager = setup({}, { input: true });

        dataSource.read();

        equal(pager.find(".k-pager-input").text(), "Pageof 5");
    });

    test("pager localization", function() {
        var pager = setup({}, {
                input: true,
                messages: {
                    display: "Showing {0} - {1} of {2}",
                    page: "Foo",
                    of: "bar{0}"
                }
            });

        dataSource.read();

        equal(pager.find(".k-pager-info").text(), "Showing 1 - 1 of 5");
        equal(pager.find(".k-pager-input").text(), "Foobar5");

        pager = setup({ data: [] }, {
            messages: {
                empty: "zero"
            }
        });

        dataSource.read();
        equal(pager.find(".k-pager-info").text(), "zero");
    });

    test("shows prev button", function() {
        var pager = setup({}, { previousNext: true });

        equal(pager.find(".k-i-arrow-w").length, 1);
    });

    test("shows first button", function() {
        var pager = setup({}, { previousNext: true });

        equal(pager.find(".k-pager-first .k-i-seek-w").length, 1);
    });

    test("shows next button", function() {
        var pager = setup({}, { previousNext: true });

        equal(pager.find(".k-i-arrow-e").length, 1);
    });

    test("shows last button", function() {
        var pager = setup({}, { previousNext: true });

        equal(pager.find(".k-pager-last .k-i-seek-e").length, 1);
    });

    test("first button is disabled on the first page", function() {
        var pager = setup({}, { previousNext: true });

        ok(pager.find(".k-pager-first").hasClass("k-state-disabled"));
    });

    test("first button is enabled on any page but first", function() {
        var pager = setup({}, { previousNext: true });
        dataSource.read();
        dataSource.page(2);

        ok(!pager.find(".k-pager-first").hasClass("k-state-disabled"));
    });

    test("prev button is disabled on the first page", function() {
        var pager = setup({}, { previousNext: true });

        ok(pager.find(".k-i-arrow-w").parent().hasClass("k-state-disabled"));
    });

    test("prev button is enabled on any page but first", function() {
        var pager = setup({}, { previousNext: true });

        dataSource.read();
        dataSource.page(2);

        ok(!pager.find(".k-i-arrow-w").parent().hasClass("k-state-disabled"));
    });

    test("prev button page data attribute is set to page minus one", function() {
        var pager = setup({}, { previousNext: true });

        dataSource.read();
        dataSource.page(3);

        equal(pager.find(".k-i-arrow-w").parent().data(kendo.ns + "page"), 2);
    });

    test("next button is disabled on the last page", function() {
        var pager = setup({}, { previousNext: true });

        dataSource.read();
        dataSource.page(5);
        ok(pager.find(".k-i-arrow-e").parent().hasClass("k-state-disabled"));
    });

    test("next button is enabled on any page but last", function() {
        var pager = setup({}, { previousNext: true });

        dataSource.read();
        ok(!pager.find(".k-i-arrow-e").parent().hasClass("k-state-disabled"));
    });

    test("next button page data attribute is set to page plus one", function() {
        var pager = setup({}, { previousNext: true });

        dataSource.read();
        dataSource.page(3);

        equal(pager.find(".k-i-arrow-e").parent().data(kendo.ns + "page"), 4);
    });

    test("last button is disabled on the last page", function() {
        var pager = setup({}, { previousNext: true });

        dataSource.read();
        dataSource.page(5);
        ok(pager.find(".k-pager-last").hasClass("k-state-disabled"));
    });

    test("last button is enabled on any page but last", function() {
        var pager = setup({}, { previousNext: true });

        dataSource.read();
        ok(!pager.find(".k-pager-last").hasClass("k-state-disabled"));
    });

    test("prev button page data attribute is set to total pages", function() {
        var pager = setup({}, { previousNext: true });

        dataSource.read();

        equal(pager.find(".k-pager-last").data(kendo.ns + "page"), dataSource.totalPages());
    });

    test("first is enabled if the data source is read before pager init", function() {
        var dataSource = new DataSource({
            pageSize: 1,
            data: [1,2,3]
        });

        dataSource.read();
        dataSource.page(2);

        var pager = $("<div />").appendTo(QUnit.fixture).kendoPager({
            dataSource: dataSource,
            autoBind: false
        });

        ok(!pager.find(".k-pager-first").hasClass("k-state-disabled"));
    });

    test("previous is enabled if the data source is read before pager init", function() {
        var dataSource = new DataSource({
            pageSize: 1,
            data: [1,2,3]
        });

        dataSource.read();
        dataSource.page(2);

        var pager = $("<div />").appendTo(QUnit.fixture).kendoPager({
            dataSource: dataSource,
            autoBind: false
        });

        ok(!pager.find(".k-i-arrow-w").parent().hasClass("k-state-disabled"));
    });

    test("next is enabled if the data source is read before pager init", function() {
        var dataSource = new DataSource({
            pageSize: 1,
            data: [1,2,3]
        });

        dataSource.read();
        dataSource.page(2);

        var pager = $("<div />").appendTo(QUnit.fixture).kendoPager({
            dataSource: dataSource,
            autoBind: false
        });

        ok(!pager.find(".k-i-arrow-e").parent().hasClass("k-state-disabled"));
    });

    test("last is enabled if the data source is read before pager init", function() {
        var dataSource = new DataSource({
            pageSize: 1,
            data: [1,2,3]
        });

        dataSource.read();
        dataSource.page(2);

        var pager = $("<div />").appendTo(QUnit.fixture).kendoPager({
            dataSource: dataSource,
            autoBind: false
        });

        ok(!pager.find(".k-pager-last").hasClass("k-state-disabled"));
    });

    test("creates a dropdown for the page sizes", function() {
        var pager = setup({}, { pageSizes: true });

        equal(pager.find(".k-pager-sizes select").length, 1);
    });

    test("default page sizes", function() {
        var pager = setup({}, { pageSizes: true });

        equal(pager.find(".k-pager-sizes select option").text(), "All51020");
    });

    test("all-pages option can be removed", function() {
        var pager = setup({}, { pageSizes: [5, 10, 20] });

        equal(pager.find(".k-pager-sizes select option").text(), "51020");
    });

    test("pageSizes can be array with numbers specifying custom page sizes", function() {
        var pager = setup({}, { pageSizes: [1,2] });

        equal(pager.find(".k-pager-sizes select option").text(), "12");
    });

    test("the page size of the data source is selected", function() {
        var pager = setup({pageSize: 2}, { pageSizes: [1, 2] });

        equal(pager.find(".k-pager-sizes select").val(), "2");
    });

    test("changing the page size of the data source selects the corresponding option", function() {
        var pager = setup({}, { pageSizes: [1, 2] });

        dataSource.pageSize(2);

        equal(pager.find(".k-pager-sizes select").val(), "2");
    });

    test("changing page size to include all items selects all pages", function() {
        var pager = setup({}, { pageSizes: ["all", 1, 2] });

        dataSource.pageSize(5);

        equal(pager.find(".k-pager-sizes select").kendoDropDownList("text"), "All");
    });

    test("changing page size to All with upper case letter sets page size to all pages", function() {
        var pager = setup({}, { pageSizes: [1, 2, "All"]});
        var dropdownlist = pager.find(".k-pager-sizes select").data("kendoDropDownList");
        dataSource.read();
        dropdownlist.dataSource.at(2).set("value", "All");

        dropdownlist.value("All");

        dropdownlist.element.trigger("change");

        equal(dataSource.pageSize(), dataSource.total());
    });

    test("totalPages returns 0 when showing all pages of an empty data source", function() {
        setup({ data: [], pageSize: 0 }, { pageSizes: true });
        equal(pager.totalPages(), 0);
    });

    test("changing the page size of the data source selects the corresponding option", 2, function() {
        var pager = setup({}, { pageSizes: [1, 2] });

        dataSource.pageSize(2);

        equal(pager.find(".k-pager-sizes select").val(), "2");
        equal(pager.find(".k-pager-sizes select").kendoDropDownList("text"), 2);
    });

    test("changing the page size of the data source to a custom value is displayed", function() {
        var pager = setup({}, { pageSizes: [1, 2] });

        dataSource.pageSize(5);

        equal(pager.find(".k-pager-sizes select").kendoDropDownList("text"), 5);
    });


    test("changing the page size from the select changes the page size in the data source", function() {
        var pager = setup({}, { pageSizes: [1, 2] });

        pager.find(".k-pager-sizes select").val(2).trigger("change");

        equal(dataSource.pageSize(), 2);
    });

    test("selecting all pages from the select changes the page size in the data source", function() {
        var pager = setup({}, { pageSizes: ["all", 1, 2] });
        dataSource.read();

        var select = pager.find(".k-pager-sizes select");
        select.val("all").trigger("change");

        equal(dataSource.pageSize(), 5);
    });

    test("displays refresh button", function() {
        var pager = setup({}, { refresh: true });

        equal(pager.find(".k-i-refresh").length, 1);
    });

    test("clicking the refresh button reads from the data source", function() {
        var pager = setup({}, { refresh: true });

        dataSource.read();

        stub(dataSource, {
            read: function() {
            }
        });

        pager.find(".k-i-refresh").click();

        equal(dataSource.calls("read"), 1);
    });

    test("does not render numeric pager if numeric is set to false", function() {
        var pager = setup({}, { numeric: false });

        dataSource.read();

        equal(pager.find(".k-pager-numbers").length, 0);
    });

    test("dropdown is visible when pager is created multiple times", function() {
        setup();

        container = $("<div/>").appendTo(QUnit.fixture).kendoPager({
            dataSource: dataSource,
            pageSizes: [10, 20]
        });

        container.data("kendoPager").destroy();

        container.kendoPager({
            dataSource: dataSource,
            pageSizes: [10, 20]
        });

        ok(container.find("select").data("kendoDropDownList")
            .wrapper.css("display") !== "none");
    });
})();
