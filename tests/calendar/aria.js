(function() {
var Calendar = kendo.ui.Calendar;
var instance;
var div;

describe("kendo.ui.Calendar ARIA", function () {
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

it("Calendar adds live aria attributes", function() {
    assert.equal(instance._title.attr("aria-live"), "assertive");
    assert.equal(instance._title.attr("aria-atomic"), "true");
});

it("Calendar adds grid role to MONTH view", function() {
    assert.equal(div.find("table").attr("role"), "grid");
});

it("Calendar adds row role to MONTH view's rows", function() {
    var rows = div.find("table tr");
    assert.equal(rows.filter("[role=row]").length, rows.length);
});

it("Calendar adds gridcell role to MONTH view's cells", function() {
    var cells = div.find("table td");
    assert.equal(cells.filter("[role=gridcell]").length, cells.length);
});

it("Calendar adds grid role to YEAR view", function() {
    instance.navigateUp();
    assert.equal(div.find("table").attr("role"), "grid");
});

it("Calendar adds row role to YEAR view's rows", function() {
    instance.navigateUp();
    var rows = div.find("table tr");
    assert.equal(rows.filter("[role=row]").length, rows.length);
});

it("Calendar adds gridcell role to YEAR view's cells", function() {
    instance.navigateUp();
    var cells = div.find("table td");
    assert.equal(cells.filter("[role=gridcell]").length, cells.length);
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
    assert.equal(instance._table.find("td.k-state-selected").attr("aria-selected"), "true");
});

it("Calendar adds only one aria-selected=true", function() {
    instance.value(new Date(2000, 10, 10));
    instance.value(new Date(2000, 10, 20));

    assert.equal(instance._table.find("td[aria-selected=true]").length, 1);
});

it("Calendar sets id to the selected cell", function() {
    instance.value(new Date(2000, 10, 10));
    instance.value(new Date(2000, 10, 20));

    assert.equal(instance._table.find("td[aria-selected=true]").attr("id"), "test_cell_selected");
});

it("Calendar has only one cell with id", function() {
    instance.value(new Date(2000, 10, 10));
    var cell = instance._cell;

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
    var firstTh = instance.element.find("th:first");

    assert.equal(firstTh.text().trim(), "");
});

it("Calendar with enabled week has not empty th if not message is set", function() {
    var test = "test";
    instance.setOptions({ weekNumber: true, messages: { weekColumnHeader: test } });
    var firstTh = instance.element.find("th:first");

    assert.equal(firstTh.text().trim(), test);
});

    });
}());
