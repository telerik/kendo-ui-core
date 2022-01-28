(function() {

var Calendar = kendo.ui.Calendar,
    instance,
    div;

describe("kendo.ui.Calendar events", function () {
    beforeEach(function() {

        div = $("<div />").appendTo(Mocha.fixture);
    });
    afterEach(function() {

        instance.destroy();
        kendo.destroy(Mocha.fixture);
    });

it("click on cell raise change event", function() {
    instance = new Calendar(div, {
        change: function() {
            assert.isOk(true);
        }
        });

    var cell = div.find("tbody").find("td:not(.k-other-month)").eq(0);
    cell.click();
});

it("click on selected cell does not raise change event", function() {
    var date = new Date(2000, 10, 1);

    instance = new Calendar(div, {
        value: date,
        change: function() {
            assert.isOk(false);
        }
        });

    div.find("tbody").find("td:not(.k-other-month)").eq(0).click();
});

it("click on empty cell does not raise change event", function() {
    var date = new Date(2000, 10, 1);

    instance = new Calendar(div, {
        value: date,
        max: date,
        change: function() {
            assert.isOk(false);
        }
        });

    div.find("tbody").find("td:has(.k-link):last").next().click();
});

it("click on cell put in range", function() {
    var date = new Date(2000, 10, 1);

    instance = new Calendar(div, {
        value: date,
        max: date
    });

    instance._current = new Date(2000, 10, 1, 16, 0, 0);

    stub(instance, { navigateDown: instance.navigateDown});

    div.find("tbody").find("td:has(.k-link)").last().click();

    assert.deepEqual(instance.args("navigateDown")[0], date);
});

it("navigate event should raise navigate event when change view", function() {
    instance = new Calendar(div, {
        navigate: function(e) {
            assert.isOk(true);
        }
        });

    div.find(".k-nav-prev").click();
});

it("click on cell should persist _viewedValue", function() {
    var date = new Date(2000, 10, 22, 22, 22, 22),
        instance = new Calendar(div, {
            value: date
        });

    instance.navigateUp(); //year view
    instance.navigateUp(); //decade view

    div.find("tbody").find("td:not(.k-other-month):first").click(); //click "2000" cell
    div.find("tbody").find("td:last").prev().click(); //click "Nov" cell

    assert.deepEqual(instance.current(), date);
});

    });
}());
