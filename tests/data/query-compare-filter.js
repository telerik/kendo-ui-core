(function(){

var compare = kendo.data.Query.compareFilters;

test("compare undefineds as empty objects", function() {
    ok(compare(undefined, undefined));
});

test("compare empty objects", function() {
    ok(compare({}, {}));
});

test("compare empty object and empty filter", function() {
    ok(compare({}, { logic: "and", filters: [] }));
});

test("compare empty filters", function() {
    ok(compare({ logic: "and", filters: [] }, { logic: "and", filters: [] }));
});

test("compare empty filters with diff logic", function() {
    ok(!compare({ logic: "or", filters: [] }, { logic: "and", filters: [] }));
});

test("compare single level filters", 2, function() {
    ok(compare(
        { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }] },
        { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }] }
    ));

    ok(!compare(
        { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }] },
        { logic: "and", filters: [{ field: "item2", operator: "eq", value: 1 }] }
    ));
});

test("compare filters with different level of logic", function() {
    ok(!compare(
        { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }] },
        { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [] }] }
    ));
});

test("compare filters on two levels", 3, function() {
    ok(compare(
        { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [] }] },
        { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [] }] }
    ));

    ok(compare(
        { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [{ field: "i", operator: "eq", value: "1" }] }] },
        { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [{ field: "i", operator: "eq", value: "1" }] }] }
    ));

    ok(!compare(
        { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [{ field: "i", operator: "eq", value: "1" }] }] },
        { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [{ field: "i", operator: "contains", value: "1" }] }] }
    ));
});

test("compare filters on two levels with different order", 2, function() {
    ok(compare(
        { logic: "and", filters: [{ field: "item2", operator: "eq", value: 1 }, { field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [] }] },
        { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { field: "item2", operator: "eq", value: 1 }, { logic: "and", filters: [] }] }
    ));

    ok(compare(
        { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [{ field: "i", operator: "eq", value: "1" }, { field: "y", operator: "eq", value: "1" }] }] },
        { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [{ field: "y", operator: "eq", value: "1" }, { field: "i", operator: "eq", value: "1" }] }] }
    ));
});

test("compare filters on three levels", 3, function() {
    ok(compare(
        { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [{ logic: "or", filters: [] }] } ] },
        { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [{ logic: "or", filters: [] }] } ] }
    ));

    ok(compare(
        { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [{ logic: "or", filters: [{ field: "i", operator: "eq", value: "1" }] }] } ] },
        { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [{ logic: "or", filters: [{ field: "i", operator: "eq", value: "1" }] }] } ] }
    ));

    ok(!compare(
        { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [{ logic: "or", filters: [{ field: "i", operator: "eq", value: "1" }] }] } ] },
        { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [{ logic: "or", filters: [{ field: "i", operator: "contains", value: "1" }] }] } ] }
    ));
});

}());
