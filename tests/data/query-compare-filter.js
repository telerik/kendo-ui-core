(function() {

    var compare = kendo.data.Query.compareFilters;

    describe("Query compare filter", function() {
        it("compare undefineds as empty objects", function() {
            assert.isOk(compare(undefined, undefined));
        });

        it("compare empty objects", function() {
            assert.isOk(compare({}, {}));
        });

        it("compare empty object and empty filter", function() {
            assert.isOk(compare({}, { logic: "and", filters: [] }));
        });

        it("compare empty filters", function() {
            assert.isOk(compare({ logic: "and", filters: [] }, { logic: "and", filters: [] }));
        });

        it("compare empty filters with diff logic", function() {
            assert.isOk(!compare({ logic: "or", filters: [] }, { logic: "and", filters: [] }));
        });

        it("compare single level filters", function() {
            assert.isOk(compare(
                { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }] },
                { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }] }
            ));

            assert.isOk(!compare(
                { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }] },
                { logic: "and", filters: [{ field: "item2", operator: "eq", value: 1 }] }
            ));
        });

        it("compare filters with different level of logic", function() {
            assert.isOk(!compare(
                { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }] },
                { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [] }] }
            ));
        });

        it("compare filters on two levels", function() {
            assert.isOk(compare(
                { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [] }] },
                { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [] }] }
            ));

            assert.isOk(compare(
                { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [{ field: "i", operator: "eq", value: "1" }] }] },
                { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [{ field: "i", operator: "eq", value: "1" }] }] }
            ));

            assert.isOk(!compare(
                { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [{ field: "i", operator: "eq", value: "1" }] }] },
                { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [{ field: "i", operator: "contains", value: "1" }] }] }
            ));
        });

        it("compare filters on two levels with different order", function() {
            assert.isOk(compare(
                { logic: "and", filters: [{ field: "item2", operator: "eq", value: 1 }, { field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [] }] },
                { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { field: "item2", operator: "eq", value: 1 }, { logic: "and", filters: [] }] }
            ));

            assert.isOk(compare(
                { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [{ field: "i", operator: "eq", value: "1" }, { field: "y", operator: "eq", value: "1" }] }] },
                { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [{ field: "y", operator: "eq", value: "1" }, { field: "i", operator: "eq", value: "1" }] }] }
            ));
        });

        it("compare filters on three levels", function() {
            assert.isOk(compare(
                { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [{ logic: "or", filters: [] }] }] },
                { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [{ logic: "or", filters: [] }] }] }
            ));

            assert.isOk(compare(
                { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [{ logic: "or", filters: [{ field: "i", operator: "eq", value: "1" }] }] }] },
                { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [{ logic: "or", filters: [{ field: "i", operator: "eq", value: "1" }] }] }] }
            ));

            assert.isOk(!compare(
                { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [{ logic: "or", filters: [{ field: "i", operator: "eq", value: "1" }] }] }] },
                { logic: "and", filters: [{ field: "item1", operator: "eq", value: 1 }, { logic: "and", filters: [{ logic: "or", filters: [{ field: "i", operator: "contains", value: "1" }] }] }] }
            ));
        });

    });
}());
