(function() {
var Calendar = kendo.ui.Calendar;
var instance;
var div;

module("kendo.ui.Calendar ARIA", {
    setup: function() {
        kendo.effects.disable();

        div = $("<div id='test' />").appendTo(QUnit.fixture);

        instance = new Calendar(div);
    },
    teardown: function() {
        instance.destroy();

        kendo.effects.enable();
        kendo.destroy(QUnit.fixture);
    }
});

test("Calendar adds roles to the left and right arrow", function() {
    equal(instance._prevArrow.attr("role"), "button");
    equal(instance._nextArrow.attr("role"), "button");
});

test("Calendar adds role to the title button", function() {
    equal(instance._title.attr("role"), "button");
});

test("Calendar adds live aria attributes", function() {
    equal(instance._title.attr("aria-live"), "assertive");
    equal(instance._title.attr("aria-atomic"), "true");
});

test("Calendar adds grid role to MONTH view", function() {
    equal(div.find("table").attr("role"), "grid");
});

test("Calendar adds row role to MONTH view's rows", function() {
    var rows = div.find("table tr");
    equal(rows.filter("[role=row]").length, rows.length);
});

test("Calendar adds gridcell role to MONTH view's cells", function() {
    var cells = div.find("table td");
    equal(cells.filter("[role=gridcell]").length, cells.length);
});

test("Calendar adds grid role to YEAR view", function() {
    instance.navigateUp();
    equal(div.find("table").attr("role"), "grid");
});

test("Calendar adds row role to YEAR view's rows", function() {
    instance.navigateUp();
    var rows = div.find("table tr");
    equal(rows.filter("[role=row]").length, rows.length);
});

test("Calendar adds gridcell role to YEAR view's cells", function() {
    instance.navigateUp();
    var cells = div.find("table td");
    equal(cells.filter("[role=gridcell]").length, cells.length);
});

test("Calendar adds aria-disabled to the prev arrow", function() {
    instance.navigate(instance.options.min);
    equal(instance._prevArrow.attr("aria-disabled"), "true");
});

test("Calendar adds aria-disabled to the next arrow", function() {
    instance.navigate(instance.options.max);
    equal(instance._nextArrow.attr("aria-disabled"), "true");
});

test("Calendar adds aria-disabled to the up nav", function() {
    instance.navigate(instance.options.max, "century");
    equal(instance._title.attr("aria-disabled"), "true");
});

test("Calendar adds aria-selected to the selected cell", function() {
    instance.value(new Date());
    equal(instance._table.find("td.k-state-selected").attr("aria-selected"), "true");
});

test("Calendar adds only one aria-selected=true", function() {
    instance.value(new Date(2000, 10, 10));
    instance.value(new Date(2000, 10, 20));

    equal(instance._table.find("td[aria-selected=true]").length, 1);
});

test("Calendar sets id to the selected cell", function() {
    instance.value(new Date(2000, 10, 10));
    instance.value(new Date(2000, 10, 20));

    equal(instance._table.find("td[aria-selected=true]").attr("id"), "test_cell_selected");
});

test("Calendar has only one cell with id", function() {
    instance.value(new Date(2000, 10, 10));
    var cell = instance._cell;

    instance.value(new Date(2000, 10, 20));

    equal(cell.attr("id"), undefined);
});

test("Calendar sets aria-activedescendant", function() {
    instance.value(new Date(2000, 10, 10));

    equal(instance._table.attr("aria-activedescendant"), instance._cell.attr("id"));
});

})();
