(function() {

var Calendar = kendo.ui.Calendar,
    instance,
    div;

module("kendo.ui.Calendar events", {
    setup: function() {
        kendo.effects.disable();
        div = $("<div />").appendTo(QUnit.fixture);
    },
    teardown: function() {
        kendo.effects.enable();
        instance.destroy();
        kendo.destroy(QUnit.fixture);
    }
});

test("click on cell raise change event", 1, function() {
    instance = new Calendar(div, {
        change: function() {
            ok(true);
        }
    });

    var cell = div.find("tbody").find("td:not(.k-other-month)").eq(0);
    cell.click();
});

test("click on selected cell does not raise change event", 0, function() {
    var date = new Date(2000, 10, 1);

    instance = new Calendar(div, {
        value: date,
        change: function() {
            ok(false);
        }
    });

    div.find("tbody").find("td:not(.k-other-month)").eq(0).click();
});

test("click on empty cell does not raise change event", 0, function() {
    var date = new Date(2000, 10, 1);

    instance = new Calendar(div, {
        value: date,
        max: date,
        change: function() {
            ok(false);
        }
    });

    div.find("tbody").find("td:has(.k-link):last").next().click();
});

test("click on cell put in range", function() {
    var date = new Date(2000, 10, 1);

    instance = new Calendar(div, {
        value: date,
        max: date
    });

    instance._current = new Date(2000, 10, 1, 16, 0, 0);

    stub(instance, { navigateDown: instance.navigateDown});

    div.find("tbody").find("td:has(.k-link)").last().click();

    deepEqual(instance.args("navigateDown")[0], date);
});

test("navigate event should raise navigate event when change view", 2, function() {
    instance = new Calendar(div, {
        navigate: function(e) {
            ok(true);
        }
    });

    div.find(".k-nav-prev").click();
});

test("click on cell should persist _viewedValue", function() {
    var date = new Date(2000, 10, 22, 22, 22, 22),
        instance = new Calendar(div, {
            value: date
        });

    instance.navigateUp(); //year view
    instance.navigateUp(); //decade view

    div.find("tbody").find("td:not(.k-other-month):first").click(); //click "2000" cell
    div.find("tbody").find("td:last").prev().click(); //click "Nov" cell

    deepEqual(instance.current(), date);
});

})();
