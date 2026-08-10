import '@progress/kendo-ui/src/kendo.calendar.js';

let Calendar = kendo.ui.Calendar;
let instance;
let div;

describe("kendo.ui.Calendar ARIA", function() {
    beforeEach(function() {


        div = $("<div id='test' />").appendTo(Mocha.fixture);

        instance = new Calendar(div);
    });
    afterEach(function() {
        instance.destroy();


        kendo.destroy(Mocha.fixture);
    });

    it("Calendar adds roles to the left and right arrow", function() {
        assert.equal(instance._prevArrow.attr("role"), "button");
        assert.equal(instance._nextArrow.attr("role"), "button");
    });

    it("Calendar adds role to the title button", function() {
        assert.equal(instance._title.attr("role"), "button");
    });

    it("Calendar adds grid role to MONTH view", function() {
        assert.equal(div.find("table").attr("role"), "grid");
    });

    it("Calendar grid has aria-labelledby pointing to its title", function() {
        assert.isOk(instance._title.attr("id"));
        assert.equal(div.find("table").attr("aria-labelledby"), instance._title.attr("id"));
    });

    it("Calendar grid has aria-multiselectable when options.selectable = multiple", function() {
        instance.setOptions({
            selectable: "multiple"
        });

        assert.equal(div.find("table").attr("aria-multiselectable"), "true");
    });

    it("Calendar adds row role to MONTH view's rows", function() {
        let rows = div.find("table tr");
        assert.equal(rows.filter("[role=row]").length, rows.length);
    });

    it("Calendar adds gridcell role to MONTH view's cells", function() {
        let cells = div.find("table td");
        assert.equal(cells.filter("[role=gridcell]").length, cells.length);
    });

    it("Calendar adds aria-label to MONTH view's header cells", function() {
        let cells = div.find("table th[aria-label]");
        let names = kendo.culture().calendar.days.names;

        assert.equal(cells.length, 7);
        cells.each(function(i, cell) {
            assert.equal(cell.getAttribute("aria-label"), names[i]);
        });
    });

    it("Calendar adds grid role to YEAR view", function() {
        instance.navigateUp();
        assert.equal(div.find("table").attr("role"), "grid");
    });

    it("Calendar adds row role to YEAR view's rows", function() {
        instance.navigateUp();
        let rows = div.find("table tr");
        assert.equal(rows.filter("[role=row]").length, rows.length);
    });

    it("Calendar adds gridcell to YEAR view's cells", function() {
        instance.navigateUp();
        let cells = div.find("table td");
        assert.equal(cells.filter("[role=gridcell]").length, cells.length);
    });

    it("Calendar adds aria-label role to YEAR view's cells links", function() {
        instance.navigateUp();
        let cells = div.find("table td span[aria-label]");
        let names = kendo.culture().calendar.months.names;

        assert.equal(cells.length, 12);

        cells.each(function(i, cell) {
            assert.equal(cell.getAttribute("aria-label"), names[i]);
        });
    });

    it("Calendar adds aria-disabled to the prev arrow", function() {
        instance.navigate(instance.options.min);
        assert.equal(instance._prevArrow.attr("aria-disabled"), "true");
    });

    it("Calendar adds aria-disabled to the next arrow", function() {
        instance.navigate(instance.options.max);
        assert.equal(instance._nextArrow.attr("aria-disabled"), "true");
    });

    it("Calendar adds aria-disabled to the up nav", function() {
        instance.navigate(instance.options.max, "century");
        assert.equal(instance._title.attr("aria-disabled"), "true");
    });

    it("Calendar adds aria-selected to the selected cell", function() {
        instance.value(new Date());
        assert.equal(instance._table.find("td.k-selected").attr("aria-selected"), "true");
    });

    it("Calendar adds only one aria-selected=true", function() {
        instance.value(new Date(2000, 10, 10));
        instance.value(new Date(2000, 10, 20));

        assert.equal(instance._table.find("td[aria-selected=true]").length, 1);
    });

    it("Calendar sets id to the selected cell", function() {
        instance.value(new Date(2000, 10, 10));
        instance.value(new Date(2000, 10, 20));

        assert.isOk(instance._table.find("td[aria-selected=true]").last().attr("id"));
    });

    it("Calendar has only one cell with id", function() {
        instance.value(new Date(2000, 10, 10));
        let cell = instance._cell;

        instance.value(new Date(2000, 10, 20));

        assert.equal(cell.attr("id"), undefined);
    });

    it("Calendar sets aria-activedescendant", function() {
        instance.value(new Date(2000, 10, 10));

        assert.equal(instance._table.attr("aria-activedescendant"), instance._cell.attr("id"));
    });

    it("Calendar adds aria label to the left arrow", function() {
        assert.equal(instance._prevArrow.attr("aria-label"), "Previous");
    });

    it("Calendar adds aria label to the right arrow", function() {
        assert.equal(instance._nextArrow.attr("aria-label"), "Next");
    });

    it("Calendar with enabled week has empty th if message is not set", function() {
        instance.setOptions({ weekNumber: true });
        let firstTh = instance.element.find("th:first");

        assert.equal(firstTh.text().trim(), "");
    });

    it("Calendar with enabled week has not empty th if not message is set", function() {
        let test = "test";
        instance.setOptions({ weekNumber: true, messages: { weekColumnHeader: test } });
        let firstTh = instance.element.find("th:first");

        assert.equal(firstTh.text().trim(), test);
    });

    it("only role='grid' element remains in the tabsequence", function() {
        assert.equal(div.find(".k-calendar-nav-prev").attr("tabindex"), -1);
        assert.equal(div.find(".k-calendar-nav-next").attr("tabindex"), -1);
        assert.equal(div.find(".k-calendar-nav-today").attr("tabindex"), -1);
        assert.equal(div.find(".k-calendar-nav-fast").attr("tabindex"), -1);
    });

    it("Calendar sets aria-label on the title button", function() {
        let titleText = instance._view.title(instance._current, instance.options.min, instance.options.max, kendo.culture().name);
        assert.equal(instance._title.attr("aria-label"), "Navigate to parent view: " + titleText);
    });

    it("Calendar removes aria-disabled from title when not at century view", function() {
        instance.navigate(instance.options.max, "century");
        assert.equal(instance._title.attr("aria-disabled"), "true");

        instance.navigateDown(instance._current);
        assert.isUndefined(instance._title.attr("aria-disabled"));
    });

    it("Calendar removes aria-disabled from prev arrow when not at min", function() {
        instance.navigate(instance.options.min);
        assert.equal(instance._prevArrow.attr("aria-disabled"), "true");

        instance.navigate(new Date());
        assert.isUndefined(instance._prevArrow.attr("aria-disabled"));
    });

    it("Calendar removes aria-disabled from next arrow when not at max", function() {
        instance.navigate(instance.options.max);
        assert.equal(instance._nextArrow.attr("aria-disabled"), "true");

        instance.navigate(new Date());
        assert.isUndefined(instance._nextArrow.attr("aria-disabled"));
    });

    it("Calendar adds aria-disabled to disabled date cells in month view", function() {
        instance.setOptions({ disableDates: ["mo"] });
        let disabledCells = div.find("td[aria-disabled='true']");
        assert.isOk(disabledCells.length > 0);
    });

    it("Calendar table has role='grid' in month view", function() {
        let table = div.find("table.k-calendar-table");
        assert.equal(table.attr("role"), "grid");
    });

    it("Calendar thead has role='rowgroup'", function() {
        assert.equal(div.find("thead.k-calendar-thead").attr("role"), "rowgroup");
    });

    it("Calendar tbody has role='rowgroup'", function() {
        div.find("tbody.k-calendar-tbody").each(function(i, tbody) {
            assert.equal(tbody.getAttribute("role"), "rowgroup");
        });
    });

    it("Calendar today button has no role attribute", function() {
        assert.isUndefined(div.find(".k-calendar-nav-today").attr("role"));
    });

});

describe("kendo.ui.Calendar ARIA modern", function() {
    beforeEach(function() {
        div = $("<div id='test' />").appendTo(Mocha.fixture);
        instance = new Calendar(div, { componentType: "modern" });
    });
    afterEach(function() {
        instance.destroy();
        kendo.destroy(Mocha.fixture);
    });

    it("modern Calendar sets aria-label on prev button using navigateToPast message", function() {
        assert.equal(instance._prevArrow.attr("aria-label"), instance.options.messages.navigateToPast);
    });

    it("modern Calendar sets aria-label on next button using navigateToFuture message", function() {
        assert.equal(instance._nextArrow.attr("aria-label"), instance.options.messages.navigateToFuture);
    });

    it("modern Calendar today button has no role attribute", function() {
        assert.isUndefined(div.find(".k-calendar-nav-today").attr("role"));
    });

});

describe("kendo.ui.Calendar aria with AXE", function() {
    beforeEach(function() {
        div = $("<div id='test' />").appendTo(Mocha.fixture);
    });

    afterEach(function() {
        instance.destroy();


        kendo.destroy(Mocha.fixture);
    });

    it("Calendar is accessible", async function() {
        instance = new Calendar(div);

        await axeRunFixture();
    });

    it("Calendar is accessible when focused", async function() {
        instance = new Calendar(div);

        instance.focus();

        await axeRunFixture();
    });

    it("Calendar is accessible when selection is performed", async function() {
        instance = new Calendar(div);

        instance.focus();
        $(instance.element.find("tr:eq(2) td:has(.k-link)")[0]).trigger("click");

        await axeRunFixture();
    });

});
