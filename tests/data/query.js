(function() {
    var Query = kendo.data.Query;

    function compareByTotal(a, b) {
        if (a.items.length === b.items.length) {
            return 0;
        } else if (a.items.length > b.items.length) {
            return 1;
        } else {
            return -1;
        }
    }

    describe("Query", function() {
        it("take returns the specified number of records", function() {
            var q = new Query([1, 2]);
            var result = q.take(1).toArray();
            assert.equal(result.length, 1);
            assert.equal(result[0], 1);
        });

        it("skip returns new array starting after the specified index", function() {
            var q = new Query([1, 2]);
            var result = q.skip(1).toArray();

            assert.equal(result.length, 1);
            assert.equal(result[0], 2);
        });

        it("skip and take returns a page of records", function() {
            var q = new Query([1, 2, 3]);

            var result = q.skip(1).take(2).toArray();

            assert.equal(result.length, 2);
            assert.equal(result[0], 2);
            assert.equal(result[1], 3);
        });

        it("range returns given number of items from specific index", function() {
            var q = new Query([1, 2, 3, 4, 5, 6, 7, 8]);

            var result = q.range(1, 4).toArray();
            assert.equal(result.length, 4);
            assert.equal(result[0], 2);
            assert.equal(result[1], 3);
            assert.equal(result[2], 4);
            assert.equal(result[3], 5);
        });

        it("orderBy sorts numbers in ascending order", function() {
            var data = [100, 10, 1];

            var result = new Query(data).orderBy(function(item) {
                return item;
            }).toArray();

            assert.equal(result.length, 3);
            assert.equal(result[0], 1);
            assert.equal(result[1], 10);
            assert.equal(result[2], 100);
        });

        it("orderBy sorts strings in ascending order", function() {
            var data = ["foo", "bar", "baz"];

            var result = new Query(data).orderBy(function(item) {
                return item;
            }).toArray();

            assert.equal(result.length, 3);
            assert.equal(result[0], "bar");
            assert.equal(result[1], "baz");
            assert.equal(result[2], "foo");
        });

        it("orderBy ignores string casing", function() {
            var data = ["A", "z", "Z", "a"];

            var result = new Query(data).orderBy(function(item) {
                return item;
            }).toArray();

            assert.equal(result.length, 4);
            assert.equal(result[0], "a");
            assert.equal(result[1], "A");
            assert.equal(result[2], "z");
            assert.equal(result[3], "Z");
        });

        it("ascending sort for grouping ignores string case", function() {
            var data = [{ text: "A" }, { text: "z" }, { text: "Z" }, { text: "a" }];

            var result = new Query(data)._sortForGrouping("text", "asc");

            assert.equal(result.length, 4);
            assert.equal(result[0].text, "a");
            assert.equal(result[1].text, "A");
            assert.equal(result[2].text, "z");
            assert.equal(result[3].text, "Z");
        });

        it("descending sort for grouping ignores string case", function() {
            var data = [{ text: "A" }, { text: "z" }, { text: "Z" }, { text: "a" }];

            var result = new Query(data)._sortForGrouping("text", "desc");

            assert.equal(result.length, 4);
            assert.equal(result[0].text, "Z");
            assert.equal(result[1].text, "z");
            assert.equal(result[2].text, "A");
            assert.equal(result[3].text, "a");
        });

        it("orderBy sorts dates in ascending order", function() {
            var data = [new Date(2011, 1, 1), new Date(2008, 1, 1), new Date(2009, 1, 1)];

            var result = new Query(data).orderBy(function(item) {
                return item;
            }).toArray();

            assert.equal(result.length, 3);
            assert.equal(result[0].getFullYear(), 2008);
            assert.equal(result[1].getFullYear(), 2009);
            assert.equal(result[2].getFullYear(), 2011);
        });


        it("orderBy sorts dates earlier then 1970 and nulls", function() {
            var data = [new Date(1955, 1, 1), null, new Date(2009, 1, 1)];

            var result = new Query(data).orderBy(function(item) {
                return item;
            }).toArray();

            assert.equal(result.length, 3);
            assert.isOk(!result[0]);
            assert.equal(result[1].getFullYear(), 1955);
            assert.equal(result[2].getFullYear(), 2009);
        });

        it("orderByDescending sorts dates earlier then 1970 and multiple nulls", function() {
            var data = [new Date(1955, 1, 1), null, null, new Date(2009, 1, 1), null];

            var result = new Query(data).orderByDescending(function(item) {
                return item;
            }).toArray();

            assert.equal(result.length, 5);
            assert.equal(result[0].getFullYear(), 2009);
            assert.equal(result[1].getFullYear(), 1955);
            assert.isOk(!result[2]);
            assert.isOk(!result[3]);
            assert.isOk(!result[4]);
        });

        it("orderBy sorts strings and nulls", function() {
            var data = ["a", null, "b"];

            var result = new Query(data).orderBy(function(item) {
                return item;
            }).toArray();

            assert.equal(result.length, 3);
            assert.isOk(!result[0]);
            assert.equal(result[1], "a");
            assert.equal(result[2], "b");
        });

        it("orderBy sorts negative numbers and zeros", function() {
            var data = [1, -2, 0, 3];

            var result = new Query(data).orderBy(function(item) {
                return item;
            }).toArray();

            assert.equal(result.length, 4);
            assert.equal(result[0], -2);
            assert.equal(result[1], 0);
            assert.equal(result[2], 1);
            assert.equal(result[3], 3);
        });

        it("orderBy sorts multiple negative numbers and zeros", function() {
            var data = [1, -2, 0, -5];

            var result = new Query(data).orderBy(function(item) {
                return item;
            }).toArray();

            assert.equal(result.length, 4);
            assert.equal(result[0], -5);
            assert.equal(result[1], -2);
            assert.equal(result[2], 0);
            assert.equal(result[3], 1);
        });

        it("orderBy sorts multiple negative numbers zeros and nulls", function() {
            var data = [1, -2, 0, null];

            var result = new Query(data).orderBy(function(item) {
                return item;
            }).toArray();

            assert.equal(result.length, 4);
            assert.equal(result[0], null);
            assert.equal(result[1], -2);
            assert.equal(result[2], 0);
            assert.equal(result[3], 1);
        });

        it("orderBy sorts multiple negative numbers", function() {
            var data = [-2, -33, -5];

            var result = new Query(data).orderBy(function(item) {
                return item;
            }).toArray();

            assert.equal(result.length, 3);
            assert.equal(result[0], -33);
            assert.equal(result[1], -5);
            assert.equal(result[2], -2);
        });

        it("orderByDescending sorts numbers and nulls", function() {
            var data = [1, null, 0, 3];

            var result = new Query(data).orderByDescending(function(item) {
                return item;
            }).toArray();

            assert.equal(result.length, 4);
            assert.equal(result[3], null);
            assert.equal(result[2], 0);
            assert.equal(result[1], 1);
            assert.equal(result[0], 3);
        });

        it("orderByDescending sorts negative numbers and zeros", function() {
            var data = [1, -2, 0, 3];

            var result = new Query(data).orderByDescending(function(item) {
                return item;
            }).toArray();

            assert.equal(result.length, 4);
            assert.equal(result[3], -2);
            assert.equal(result[2], 0);
            assert.equal(result[1], 1);
            assert.equal(result[0], 3);
        });

        it("orderByDescending sorts multiple negative numbers and zeros", function() {
            var data = [1, -2, 0, -5];

            var result = new Query(data).orderByDescending(function(item) {
                return item;
            }).toArray();

            assert.equal(result.length, 4);
            assert.equal(result[3], -5);
            assert.equal(result[2], -2);
            assert.equal(result[1], 0);
            assert.equal(result[0], 1);
        });

        it("orderByDescending sorts multiple negative numbers zeros and nulls", function() {
            var data = [1, -2, 0, null];

            var result = new Query(data).orderByDescending(function(item) {
                return item;
            }).toArray();

            assert.equal(result.length, 4);
            assert.equal(result[3], null);
            assert.equal(result[2], -2);
            assert.equal(result[1], 0);
            assert.equal(result[0], 1);
        });

        it("orderByDescending sorts multiple negative numbers", function() {
            var data = [-2, -33, -5];

            var result = new Query(data).orderByDescending(function(item) {
                return item;
            }).toArray();

            assert.equal(result.length, 3);
            assert.equal(result[2], -33);
            assert.equal(result[1], -5);
            assert.equal(result[0], -2);
        });


        it("orderByDescending sorts numbers and nulls", function() {
            var data = [1, null, 0, 3];

            var result = new Query(data).orderByDescending(function(item) {
                return item;
            }).toArray();

            assert.equal(result.length, 4);
            assert.equal(result[0], 3);
            assert.equal(result[1], 1);
            assert.equal(result[2], 0);
            assert.equal(result[3], null);
        });

        it("orderByDescending sorts strings and nulls", function() {
            var data = ["a", null, "b"];

            var result = new Query(data).orderByDescending(function(item) {
                return item;
            }).toArray();

            assert.equal(result.length, 3);
            assert.equal(result[0], "b");
            assert.equal(result[1], "a");
            assert.isOk(!result[2]);
        });

        it("orderByDescending sorts dates earlier then 1970 and nulls", function() {
            var data = [new Date(1955, 1, 1), null, new Date(2009, 1, 1)];

            var result = new Query(data).orderByDescending(function(item) {
                return item;
            }).toArray();

            assert.equal(result.length, 3);
            assert.equal(result[0].getFullYear(), 2009);
            assert.equal(result[1].getFullYear(), 1955);
            assert.isOk(!result[2]);
        });

        it("orderBy sorts booleans and nulls", function() {
            var data = [true, false, null, true];

            var result = new Query(data).orderBy(function(item) {
                return item;
            }).toArray();

            assert.equal(result.length, 4);
            assert.equal(result[0], null);
            assert.equal(result[1], false);
            assert.equal(result[2], true);
            assert.equal(result[3], true);
        });

        it("orderByDescending sorts booleans and nulls", function() {
            var data = [true, false, null, false];

            var result = new Query(data).orderByDescending(function(item) {
                return item;
            }).toArray();

            assert.equal(result.length, 4);
            assert.equal(result[0], true);
            assert.equal(result[1], false);
            assert.equal(result[2], false);
            assert.equal(result[3], null);
        });

        it("orderBy uses selector when sorting", function() {
            var data = [{ name: "foo" }, { name: "bar" }, { name: "foo" }];

            var result = new Query(data).orderBy(function(item) {
                return item.name;
            }).toArray();

            assert.equal(result.length, 3);
            assert.equal(result[0].name, "bar");
            assert.equal(result[1].name, "foo");
            assert.equal(result[2].name, "foo");
        });

        it("orderBy does not modify original", function() {
            var data = [3, 2, 1];

            new Query(data).orderBy(function(item) {
                return item.name;
            }).toArray();

            assert.equal(data.length, 3);
            assert.equal(data[0], 3);
            assert.equal(data[1], 2);
            assert.equal(data[2], 1);
        });

        it("orderby without parameters sorts array", function() {
            var data = new Query([3, 2, 1]).orderBy().toArray();

            assert.equal(data.length, 3);
            assert.equal(data[0], 1);
            assert.equal(data[1], 2);
            assert.equal(data[2], 3);

        });
        it("orderByDescending sorts numbers in descending order", function() {
            var data = [1, 100, 10];

            var result = new Query(data).orderByDescending(function(item) {
                return item;
            }).toArray();

            assert.equal(result.length, 3);
            assert.equal(result[0], 100);
            assert.equal(result[1], 10);
            assert.equal(result[2], 1);
        });

        it("orderByDescending sorts strings in descending order", function() {
            var data = ["foo", "bar", "baz"];

            var result = new Query(data).orderByDescending(function(item) {
                return item;
            }).toArray();

            assert.equal(result.length, 3);
            assert.equal(result[0], "foo");
            assert.equal(result[1], "baz");
            assert.equal(result[2], "bar");
        });

        it("orderByDescending sorts dates in descending order", function() {
            var data = [new Date(2011, 1, 1), new Date(2008, 1, 1), new Date(2009, 1, 1)];

            var result = new Query(data).orderByDescending(function(item) {
                return item;
            }).toArray();

            assert.equal(result.length, 3);
            assert.equal(result[0].getFullYear(), 2011);
            assert.equal(result[1].getFullYear(), 2009);
            assert.equal(result[2].getFullYear(), 2008);
        });

        it("orderByDescending uses selector when sorting", function() {
            var data = [{ name: "foo" }, { name: "bar" }, { name: "foo" }];

            var result = new Query(data).orderByDescending(function(item) {
                return item.name;
            })
                .toArray();

            assert.equal(result.length, 3);
            assert.equal(result[0].name, "foo");
            assert.equal(result[1].name, "foo");
            assert.equal(result[2].name, "bar");
        });

        it("orderByDescending does not modify original", function() {
            var data = [1, 2, 3];

            new Query(data).orderByDescending(function(item) {
                return item.name;
            });

            assert.equal(data[0], 1);
            assert.equal(data[1], 2);
            assert.equal(data[2], 3);
        });

        it("sort using ascending descriptor", function() {
            var data = [{ name: "foo" }, { name: "bar" }, { name: "foo" }];

            var result = new Query(data).sort({ field: "name", dir: "asc" }).toArray();

            assert.equal(result.length, 3);
            assert.equal(result[0].name, "bar");
            assert.equal(result[1].name, "foo");
            assert.equal(result[2].name, "foo");
        });

        it("sorting nested objects", function() {
            var data = [{ foo: { age: 1 } }, { foo: { age: 2 } }]

            var result = new Query(data).sort({ field: "foo.age", dir: "desc" }).toArray();

            assert.equal(result[0].foo.age, 2);
        });

        it("sort ignores direction case", function() {
            var data = [{ name: "foo" }, { name: "bar" }, { name: "foo" }];

            var result = new Query(data).sort({ field: "name", dir: "Asc" }).toArray();

            assert.equal(result.length, 3);
            assert.equal(result[0].name, "bar");
            assert.equal(result[1].name, "foo");
            assert.equal(result[2].name, "foo");
        });

        it("sort using descending descriptor", function() {
            var data = [{ name: "foo" }, { name: "bar" }, { name: "foo" }];

            var result = new Query(data).sort({ field: "name", dir: "desc" }).toArray();

            assert.equal(result.length, 3);
            assert.equal(result[0].name, "foo");
            assert.equal(result[1].name, "foo");
            assert.equal(result[2].name, "bar");
        });

        it("orderBy using custom comparer", function() {
            var data = [{ name: "foo" }, { name: "bar" }, { name: "foo" }];

            var result = new Query(data).orderBy({
                compare: function(a, b) {
                    return a.name > b.name ? 1 : (a.name < b.name ? -1 : 0);
                }
            }).toArray();

            assert.equal(result.length, 3);
            assert.equal(result[0].name, "bar");
            assert.equal(result[1].name, "foo");
            assert.equal(result[2].name, "foo");
        });

        it("ascending sort using custom comparer", function() {
            var data = [{ name: "foo" }, { name: "bar" }, { name: "foo" }];

            var result = new Query(data).sort({
                dir: "asc",
                compare: function(a, b) {
                    return a.name > b.name ? 1 : (a.name < b.name ? -1 : 0);
                }
            }).toArray();

            assert.equal(result.length, 3);
            assert.equal(result[0].name, "bar");
            assert.equal(result[1].name, "foo");
            assert.equal(result[2].name, "foo");
        });

        it("descending sort using custom comparer", function() {
            var data = [{ name: "foo" }, { name: "bar" }, { name: "foo" }];

            var result = new Query(data).sort({
                dir: "desc",
                compare: function(a, b) {
                    return a.name > b.name ? 1 : (a.name < b.name ? -1 : 0);
                }
            }).toArray();

            assert.equal(result.length, 3);
            assert.equal(result[0].name, "foo");
            assert.equal(result[1].name, "foo");
            assert.equal(result[2].name, "bar");
        });

        it("sort using multiple descriptors", function() {
            var data = [{ name: "foo", age: 42 }, { name: "bar", age: 36 }, { name: "foo", age: 15 }];

            var result = new Query(data).sort([{ field: "name", dir: "desc" }, { field: "age", dir: "asc" }]).toArray();

            assert.equal(result.length, 3);
            assert.equal(result[0].name, "foo");
            assert.equal(result[0].age, 15);
            assert.equal(result[1].name, "foo");
            assert.equal(result[1].age, 42);
            assert.equal(result[2].name, "bar");
            assert.equal(result[2].age, 36);
        });
        it("sort using two strings as arguments", function() {
            var data = [{ name: "foo" }, { name: "bar" }, { name: "foo" }];

            var result = new Query(data).sort("name", "asc").toArray();

            assert.equal(result.length, 3);
            assert.equal(result[0].name, "bar");
            assert.equal(result[1].name, "foo");
            assert.equal(result[2].name, "foo");
        });

        it("filter isempty on string", function() {
            var data = [{ name: "" }, { name: "bar" }, { name: "foo" }];

            var result = new Query(data).filter({ field: "name", operator: "isempty" }).toArray();

            assert.equal(result.length, 1);
        });

        it("filter isnotempty on string", function() {
            var data = [{ name: "" }, { name: "bar" }, { name: "foo" }];

            var result = new Query(data).filter({ field: "name", operator: "isnotempty" }).toArray();

            assert.equal(result.length, 2);
        });

        it("filter isnotnull on null string", function() {
            var data = [{ name: null }, { name: "bar" }, { name: "foo" }];

            var result = new Query(data).filter({ field: "name", operator: "isnotnull" }).toArray();

            assert.equal(result.length, 2);
        });

        it("filter isnotnull on undefined string", function() {
            var data = [{ name: undefined }, { name: "bar" }, { name: "foo" }];

            var result = new Query(data).filter({ field: "name", operator: "isnotnull" }).toArray();

            assert.equal(result.length, 2);
        });

        it("filter isnotnull on 0", function() {
            var data = [{ name: 0 }, { name: "bar" }, { name: "foo" }];

            var result = new Query(data).filter({ field: "name", operator: "isnotnull" }).toArray();

            assert.equal(result.length, 3);
        });

        it("filter isnull on 0", function() {
            var data = [{ name: 0 }, { name: "bar" }, { name: "foo" }];

            var result = new Query(data).filter({ field: "name", operator: "isnull" }).toArray();

            assert.equal(result.length, 0);
        });

        it("filter isnull on null string", function() {
            var data = [{ name: null }, { name: "bar" }, { name: "foo" }];

            var result = new Query(data).filter({ field: "name", operator: "isnull" }).toArray();

            assert.equal(result.length, 1);
        });

        it("filter isnull on undefined string", function() {
            var data = [{ name: undefined }, { name: "bar" }, { name: "foo" }];

            var result = new Query(data).filter({ field: "name", operator: "isnull" }).toArray();

            assert.equal(result.length, 1);
        });

        it("filter on null string", function() {
            var data = [{ name: null }, { name: "bar" }, { name: "foo" }];

            var result = new Query(data).filter({ field: "name", operator: "eq", value: "foo" }).toArray();

            assert.equal(result.length, 1);
        });

        it("filter on null string with startwith", function() {
            var data = [{ name: null }, { name: "bar" }, { name: "foo" }];
            var result = new Query(data).filter({ field: "name", operator: "startswith", value: "foo", ignoreCase: true }).toArray();

            assert.equal(result.length, 1);
        });

        it("filter on null string with endswith", function() {
            var data = [{ name: null }, { name: "bar" }, { name: "foo" }];
            var result = new Query(data).filter({ field: "name", operator: "endswith", value: "foo", ignoreCase: true }).toArray();

            assert.equal(result.length, 1);
        });


        it("filter with empty expression", function() {
            var data = [{ name: "foo" }, { name: "bar" }, { name: "foo" }];

            var result = new Query(data).filter(null).toArray();

            assert.equal(result.length, 3);
        });

        it("filter contains with apostrophe", function() {
            var data = [{ name: "f'oo" }];

            var result = new Query(data).filter({ field: "name", value: "'", operator: "contains" }).toArray();

            assert.equal(result.length, 1);
        });

        it("filter with slash", function() {
            var data = [{ name: "f\\oo" }];

            var result = new Query(data).filter({ field: "name", value: "\\", operator: "contains" }).toArray();

            assert.equal(result.length, 1);
        });

        it("filter with apostrophe", function() {
            var data = [{ name: "f'oo" }];

            var result = new Query(data).filter({ field: "name", value: "f'oo" }).toArray();

            assert.equal(result.length, 1);
        });

        it("filter with language special characters and accentFoldingFiltering enabled", function() {
            var data = [{ name: "KIZILTOPRAK" }];
            var result = new Query(data).filter({ filters: [{ field: "name", operator: "contains", value: "k\u0131z" }], accentFoldingFiltering: "tr-TR", logic: "and"}).toArray();
            assert.equal(result.length, 1);
        });

        it("filter with standart characters and accentFoldingFiltering enabled should not match language special characters", function() {
            var data = [{ name: "KIZILTOPRAK" }];
            var result = new Query(data).filter({ filters: [{ field: "name", operator: "contains", value: "kiz" }], accentFoldingFiltering: "tr-TR", logic: "and"}).toArray();
            assert.equal(result.length, 0);
        });

        it("filter with language special characters and accentFoldingFiltering disabled", function() {
            var data = [{ name: "KIZILTOPRAK" }];
            var result = new Query(data).filter({ filters: [{ field: "name", operator: "contains", value: "k\u0131z" }], logic: "and"}).toArray();
            assert.equal(result.length, 0);
        });

        it("filter with language special characters, with equal operator", function() {
            var  data = [
                {  name: "KIZILTOPRAK" },
                {  name: "KARŞIYAKA" },
                {  name: "İSTANBUL" }
            ];

            var result = new Query(data).filter({ filters: [{ field: "name", operator: "eq", value: "k\u0131z\u0131ltoprak" }], logic: "and", accentFoldingFiltering: "tr-TR"}).toArray();
            assert.equal(result.length, 1);
        });

        it("filter with language special characters, with not equal operator", function() {
            var  data = [
                {  name: "KIZILTOPRAK" },
                {  name: "KARŞIYAKA" },
                {  name: "İSTANBUL" }
            ];

            var result = new Query(data).filter({ filters: [{ field: "name", operator: "neq", value: "k\u0131z\u0131ltoprak" }], logic: "and", accentFoldingFiltering: "tr-TR"}).toArray();
            assert.equal(result.length, 2);
        });

        it("filter with empty filters", function() {
            var data = [{ name: "foo" }, { name: "bar" }, { name: "foo" }];

            var result = new Query(data).filter({ filters: [] }).toArray();

            assert.equal(result.length, 3);
        });

        it("filter filters on numbers", function() {
            var data = [{ field: 100 }, { field: 10 }, { field: 1 }];

            var result = new Query(data).filter({
                field: "field",
                operator: "eq",
                value: 1
            }).toArray();

            assert.equal(result.length, 1);
            assert.equal(result[0].field, 1);
        });

        it("filter filters with field as a function", function() {
            var data = [100, 10, 1];
            var fieldFunctionWasCalled = false;

            var result = new Query(data).filter({
                field: function(item) {
                    fieldFunctionWasCalled = true;
                    return item;
                },
                operator: "eq",
                value: 1
            }).toArray();

            assert.isOk(fieldFunctionWasCalled);
            assert.equal(result.length, 1);
            assert.equal(result[0], 1);
        });

        it("filter filters with operator as a function", function() {
            var data = [{ field: 100 }, { field: 10 }, { field: 1 }];

            var result = new Query(data).filter({
                field: "field",
                operator: function(d, value) {
                    return d === value;
                },
                value: 1
            }).toArray();

            assert.equal(result.length, 1);
            assert.equal(result[0].field, 1);
        });

        it("filter filters on dates", function() {
            var data = [new Date(2011, 1, 1), new Date(2008, 1, 1), new Date(2009, 1, 1)];

            var result = new Query(data).filter({
                field: function(item) {
                    return item;
                },
                operator: "eq",
                value: new Date(2011, 1, 1)
            }).toArray();

            assert.equal(result.length, 1);
            assert.equal(result[0].getFullYear(), 2011);
        });

        it("filter filters on nullable dates", function() {
            var data = [new Date(2011, 1, 1), null, new Date(2009, 1, 1)];

            var result = new Query(data).filter({
                field: function(item) {
                    return item;
                },
                operator: "eq",
                value: new Date(2011, 1, 1)
            }).toArray();

            assert.equal(result.length, 1);
            assert.equal(result[0].getFullYear(), 2011);
        });

        it("filter with date filters out strings and numbers", function() {
            var data = [new Date(2011, 1, 1), "foo", 42];

            var result = new Query(data).filter({
                field: function(item) {
                    return item;
                },
                operator: "eq",
                value: new Date(2011, 1, 1)
            }).toArray();

            assert.equal(result.length, 1);
            assert.equal(result[0].getFullYear(), 2011);
        });

        it("filter with string filters out numbers", function() {
            var data = ["foo", 42];

            var result = new Query(data).filter({
                field: function(item) {
                    return item;
                },
                operator: "eq",
                value: "foo",
                ignoreCase: true
            }).toArray();

            assert.equal(result.length, 1);
            assert.equal(result[0], "foo");
        });

        it("filter with 'null' as string does not match null", function() {
            var data = [null];

            var result = new Query(data).filter({
                field: function(item) {
                    return item;
                },
                operator: "eq",
                value: "null",
                ignoreCase: true
            }).toArray();

            assert.equal(result.length, 0);
        });

        it("filter filters without passing operator defaults to eq", function() {
            var data = [{ field: 100 }, { field: 10 }, { field: 1 }];

            var result = new Query(data).filter({
                field: "field",
                value: 1
            }).toArray();

            assert.equal(result.length, 1);
            assert.equal(result[0].field, 1);
        });

        it("filter filters if passing operator allias", function() {
            var data = [{ field: 100 }, { field: 10 }, { field: 1 }];

            var result = new Query(data).filter({
                field: "field",
                operator: "==",
                value: 1
            }).toArray();

            assert.equal(result.length, 1);
            assert.equal(result[0].field, 1);
        });

        it("filter filters with neq", function() {
            var data = [{ field: 100 }, { field: 10 }, { field: 1 }];

            var result = new Query(data).filter({
                field: "field",
                operator: "neq",
                value: 1
            }).toArray();

            assert.equal(result.length, 2);
            assert.equal(result[0].field, 100);
            assert.equal(result[1].field, 10);
        });

        it("filter filters with ne", function() {
            var data = [{ field: 100 }, { field: 10 }, { field: 1 }];

            var result = new Query(data).filter({
                field: "field",
                operator: "ne",
                value: 1
            }).toArray();

            assert.equal(result.length, 2);
            assert.equal(result[0].field, 100);
            assert.equal(result[1].field, 10);
        });

        it("filter filters with lt", function() {
            var data = [{ field: 100 }, { field: 10 }, { field: 1 }];

            var result = new Query(data).filter({
                field: "field",
                operator: "lt",
                value: 100
            }).toArray();

            assert.equal(result.length, 2);
            assert.equal(result[0].field, 10);
            assert.equal(result[1].field, 1);
        });

        it("filter filters with le", function() {
            var data = [{ field: 100 }, { field: 10 }, { field: 1 }];

            var result = new Query(data).filter({
                field: "field",
                operator: "le",
                value: 10
            }).toArray();

            assert.equal(result.length, 2);
            assert.equal(result[0].field, 10);
            assert.equal(result[1].field, 1);
        });

        it("filter filters with lte", function() {
            var data = [{ field: 100 }, { field: 10 }, { field: 1 }];

            var result = new Query(data).filter({
                field: "field",
                operator: "lte",
                value: 10
            }).toArray();

            assert.equal(result.length, 2);
            assert.equal(result[0].field, 10);
            assert.equal(result[1].field, 1);
        });

        it("filter filters with gt", function() {
            var data = [{ field: 100 }, { field: 10 }, { field: 1 }];

            var result = new Query(data).filter({
                field: "field",
                operator: "gt",
                value: 10
            }).toArray();

            assert.equal(result.length, 1);
            assert.equal(result[0].field, 100);
        });

        it("filter filters with gte", function() {
            var data = [{ field: 100 }, { field: 10 }, { field: 1 }];

            var result = new Query(data).filter({
                field: "field",
                operator: "gte",
                value: 10
            }).toArray();

            assert.equal(result.length, 2);
            assert.equal(result[0].field, 100);
            assert.equal(result[1].field, 10);
        });

        it("filter filters with ge", function() {
            var data = [{ field: 100 }, { field: 10 }, { field: 1 }];

            var result = new Query(data).filter({
                field: "field",
                operator: "ge",
                value: 10
            }).toArray();

            assert.equal(result.length, 2);
            assert.equal(result[0].field, 100);
            assert.equal(result[1].field, 10);
        });

        it("filter filters with eq on string", function() {
            var data = [{ field: "a" }, { field: "b" }, { field: "c" }];

            var result = new Query(data).filter({
                field: "field",
                operator: "eq",
                value: "c"
            }).toArray();

            assert.equal(result.length, 1);
            assert.equal(result[0].field, "c");
        });

        it("filter filters with startswith on string", function() {
            var data = [{ field: "abc" }, { field: "bcd" }, { field: "cde" }];

            var result = new Query(data).filter({
                field: "field",
                operator: "startswith",
                value: "c"
            }).toArray();

            assert.equal(result.length, 1);
            assert.equal(result[0].field, "cde");
        });

        it("filter filters with endswith on undefined", function() {
            var data = [{ field: "abc" }, { field: "bcd" }, { field: "cde" }];

            var result = new Query(data).filter({
                field: "field",
                operator: "endswith",
                value: undefined
            }).toArray();

            assert.equal(result.length, 0);
        });

        it("filter filters with endswith on string", function() {
            var data = [{ field: "abc" }, { field: "bcd" }, { field: "cde" }];

            var result = new Query(data).filter({
                field: "field",
                operator: "endswith",
                value: "c"
            }).toArray();

            assert.equal(result.length, 1);
            assert.equal(result[0].field, "abc");
        });

        it("filter filters with endswith on multiple letters string", function() {
            var data = [{ field: "abc" }, { field: "bcd" }, { field: "cde" }];

            var result = new Query(data).filter({
                field: "field",
                operator: "endswith",
                value: "de"
            }).toArray();

            assert.equal(result.length, 1);
            assert.equal(result[0].field, "cde");
        });

        it("filter filters with contains on string", function() {
            var data = [{ field: "abc" }, { field: "bcd" }, { field: "cde" }];

            var result = new Query(data).filter({
                field: "field",
                operator: "contains",
                value: "b"
            }).toArray();

            assert.equal(result.length, 2);
            assert.equal(result[0].field, "abc");
            assert.equal(result[1].field, "bcd");
        });

        it("filter filters with doesnotcontain on string", function() {
            var data = [{ field: "abc" }, { field: "bcd" }, { field: "cde" }];

            var result = new Query(data).filter({
                field: "field",
                operator: "doesnotcontain",
                value: "a"
            }).toArray();

            assert.equal(result.length, 2);
            assert.equal(result[0].field, "bcd");
            assert.equal(result[1].field, "cde");
        });

        it("filter filters with notsubstringof on string", function() {
            var data = [{ field: "abc" }, { field: "bcd" }, { field: "cde" }];

            var result = new Query(data).filter({
                field: "field",
                operator: "notsubstringof",
                value: "a"
            }).toArray();

            assert.equal(result.length, 2);
            assert.equal(result[0].field, "bcd");
            assert.equal(result[1].field, "cde");
        });

        it("filter filters with eq on string case sensitive", function() {
            var data = [{ field: "a" }, { field: "b" }, { field: "c" }, { field: "A" }];

            var result = new Query(data).filter({
                field: "field",
                operator: "eq",
                value: "A",
                ignoreCase: false
            }).toArray();

            assert.equal(result.length, 1);
            assert.equal(result[0].field, "A");
        });

        it("filter filters with contains on string case sensitive", function() {
            var data = [{ field: "abc" }, { field: "Bcd" }];

            var result = new Query(data).filter({
                field: "field",
                operator: "contains",
                value: "B",
                ignoreCase: false
            }).toArray();

            assert.equal(result.length, 1);
            assert.equal(result[0].field, "Bcd");
        });

        it("filter with multiple expressions", function() {
            var data = [{ field: 100 }, { field: 10 }, { field: 1 }];

            var result = new Query(data).filter([{
                field: "field",
                operator: "gte",
                value: 1
            },
            {
                field: "field",
                operator: "lt",
                value: 100
            }]).toArray();

            assert.equal(result.length, 2);
            assert.equal(result[0].field, 10);
            assert.equal(result[1].field, 1);
        });

        it("filter with and expression", function() {
            var data = [100, 10, 1];

            var result = new Query(data).filter({
                logic: "and",
                filters: [
                    { operator: "gt", value: 1 },
                    { operator: "lt", value: 100 }
                ]
            }).toArray();

            assert.equal(result.length, 1);
            assert.equal(result[0], 10);
        });

        it("filter with or expression", function() {
            var data = [100, 10, 1];

            var result = new Query(data).filter({
                logic: "or",
                filters: [
                    { operator: "eq", value: 1 },
                    { operator: "eq", value: 100 }
                ]
            }).toArray();

            assert.equal(result.length, 2);
            assert.equal(result[0], 100);
            assert.equal(result[1], 1);
        });

        it("filter with nested expression", function() {
            var data = [100, 10, 1];

            var result = new Query(data).filter({
                logic: "or",
                filters: [
                    {
                        logic: "and",
                        filters: [{ operator: "gt", value: 1 }, { operator: "lt", value: 100 }]
                    },
                    {
                        operator: "eq",
                        value: 100
                    }
                ]
            }).toArray();

            assert.equal(result.length, 2);
            assert.equal(result[0], 100);
            assert.equal(result[1], 10);
        });

        it("filter with nested or expression", function() {
            var data = [100, 10, 1];

            var result = new Query(data).filter({
                logic: "or",
                filters: [
                    {
                        logic: "and",
                        filters: [{ operator: "gt", value: 1 }, { operator: "lt", value: 100 }]
                    },
                    {
                        operator: "eq",
                        value: 100
                    }
                ]
            }).toArray();

            assert.equal(result.length, 2);
            assert.equal(result[0], 100);
            assert.equal(result[1], 10);
        });

        it("filter with nested and expression", function() {
            var data = [100, 10, 1];

            var result = new Query(data).filter({
                logic: "and",
                filters: [
                    {
                        logic: "or",
                        filters: [{ operator: "eq", value: 100 }, { operator: "eq", value: 10 }]
                    },
                    {
                        operator: "gt",
                        value: 1
                    }
                ]
            }).toArray();

            assert.equal(result.length, 2);
            assert.equal(result[0], 100);
            assert.equal(result[1], 10);
        });

        it("filter without specifying field fields array", function() {
            var data = [100, 10, 1];

            var result = new Query(data).filter({
                operator: "gte",
                value: 10
            }).toArray();

            assert.equal(result.length, 2);
            assert.equal(result[0], 100);
            assert.equal(result[1], 10);
        });

        it("filter on nested objects", function() {
            var data = [{ foo: { bar: 1 } }];

            var result = new Query(data).filter({
                operator: "gte",
                field: "foo.bar",
                value: 1
            }).toArray();

            assert.equal(result.length, 1);
            assert.equal(result[0].foo.bar, 1);
        });

        it("filter on dotnet date literals", function() {
            var firstDate = new Date(1996, 11, 9);
            var data = [{ bar: firstDate }, { bar: new Date(1996, 11, 12) }];


            var result = new Query(data).filter({
                operator: "eq",
                field: "bar",
                value: "/Date(" + firstDate.getTime() + ")/"
            }).toArray();

            assert.equal(result.length, 1);
            assert.equal(result[0].bar.getTime(), firstDate.getTime());
        });

        it("filter on nested nullable objects", function() {
            var data = [{ foo: { bar: 1 } }, { foo: { bar: undefined } }];

            var result = new Query(data).filter({
                operator: "gte",
                field: "foo.bar",
                value: 1
            }).toArray();

            assert.equal(result.length, 1);
            assert.equal(result[0].foo.bar, 1);
        });

        it("groupby groups data by field", function() {
            var data = [{ field: 100 }, { field: 100 }, { field: 1 }];

            var result = new Query(data).groupBy({
                field: "field"
            }).toArray();
            assert.equal(result.length, 2);
            assert.equal(result[0].value, 1);
            assert.equal(result[0].field, "field");
            assert.equal(result[0].items.length, 1);
            assert.equal(result[1].value, 100);
            assert.equal(result[1].field, "field");
            assert.equal(result[1].items.length, 2);
        });

        it("groupby should be stable", function() {
            var data = [{ foo: 1, bar: 1 }, { foo: 2, bar: 1 }, { foo: 3, bar: 1 }, { foo: 4, bar: 1 }, { foo: 5, bar: 1 },
            { foo: 6, bar: 1 }, { foo: 7, bar: 1 }, { foo: 8, bar: 1 }, { foo: 9, bar: 1 }, { foo: 0, bar: 1 }, { foo: 11, bar: 1 }];

            var result = new Query(data)
                .sort([{ field: "foo", dir: "asc" }, { field: "bar", dir: "asc" }])
                .groupBy({
                    field: "bar"
                }).toArray();

            assert.equal(result.length, 1);
            assert.equal(result[0].items.length, 11);
            assert.equal(result[0].items[0].foo, 0);
            assert.equal(result[0].items[1].foo, 1);
        });

        it("descending groupby should be stable", function() {
            var data = [{ foo: 1, bar: 1 }, { foo: 2, bar: 1 }, { foo: 3, bar: 1 }, { foo: 4, bar: 1 }, { foo: 5, bar: 1 },
            { foo: 6, bar: 1 }, { foo: 7, bar: 1 }, { foo: 8, bar: 1 }, { foo: 9, bar: 1 }, { foo: 0, bar: 1 }, { foo: 11, bar: 1 }];

            var result = new Query(data)
                .sort([{ field: "foo", dir: "desc" }, { field: "bar", dir: "desc" }])
                .groupBy({
                    field: "bar", dir: "desc"
                }).toArray();

            assert.equal(result.length, 1);
            assert.equal(result[0].items.length, 11);
            assert.equal(result[0].items[0].foo, 11);
            assert.equal(result[0].items[1].foo, 9);
        });

        it("groupby on dates should be stable", function() {
            var data = [{ foo: 1, bar: new Date(1999, 1, 1) }, { foo: 2, bar: new Date(1999, 1, 1) }, { foo: 3, bar: new Date(1999, 1, 1) }, { foo: 4, bar: new Date(1999, 1, 1) }, { foo: 5, bar: new Date(1999, 1, 1) }, { foo: 6, bar: new Date(1999, 1, 1) }, { foo: 7, bar: new Date(1999, 1, 1) }, { foo: 8, bar: new Date(1999, 1, 1) }, { foo: 9, bar: new Date(1999, 1, 1) }, { foo: 0, bar: new Date(1999, 1, 1) }, { foo: 11, bar: new Date(1999, 1, 1) }];

            var result = new Query(data)
                .sort([{ field: "foo", dir: "asc" }])
                .groupBy({
                    field: "bar"
                }).toArray();

            assert.equal(result.length, 1);
            assert.equal(result[0].items.length, 11);
            assert.equal(result[0].items[0].foo, 0);
            assert.equal(result[0].items[1].foo, 1);
        });

        it("groupby on dates with descending sort should be stable", function() {
            var data = [{ foo: 11, bar: new Date(1999, 1, 1) }, { foo: 10, bar: new Date(1999, 1, 1) }, { foo: 9, bar: new Date(1999, 1, 1) }, { foo: 8, bar: new Date(1999, 1, 1) }, { foo: 7, bar: new Date(1999, 1, 1) }, { foo: 6, bar: new Date(1999, 1, 1) }, { foo: 5, bar: new Date(1999, 1, 1) }, { foo: 4, bar: new Date(1999, 1, 1) }, { foo: 3, bar: new Date(1999, 1, 1) }, { foo: 2, bar: new Date(1999, 1, 1) }, { foo: 1, bar: new Date(1999, 1, 1) }];

            var result = new Query(data)
                .sort([{ field: "foo", dir: "desc" }])
                .groupBy({
                    field: "bar", dir: "desc"
                }).toArray();

            assert.equal(result.length, 1);
            assert.equal(result[0].items.length, 11);
            assert.equal(result[0].items[0].foo, 11);
            assert.equal(result[0].items[1].foo, 10);
            assert.equal(result[0].items[2].foo, 9);
            assert.equal(result[0].items[3].foo, 8);
            assert.equal(result[0].items[4].foo, 7);
            assert.equal(result[0].items[5].foo, 6);
            assert.equal(result[0].items[6].foo, 5);
            assert.equal(result[0].items[7].foo, 4);
            assert.equal(result[0].items[8].foo, 3);
            assert.equal(result[0].items[9].foo, 2);
            assert.equal(result[0].items[10].foo, 1);
        });

        it("groupby groups data by date", function() {
            var data = [{ field: new Date(2011, 1, 1) }, { field: new Date(2011, 2, 2) }, { field: new Date(2011, 1, 1) }];

            var result = new Query(data).groupBy({
                field: "field"
            }).toArray();

            assert.equal(result.length, 2);
            assert.equal(result[0].items.length, 2);
            assert.equal(result[0].value.getTime(), new Date(2011, 1, 1).getTime());
            assert.equal(result[1].items.length, 1);
            assert.equal(result[1].value.getTime(), new Date(2011, 2, 2).getTime());
        });

        it("custom sort compare is used when grouping", function() {
            var data = [
                { id: 1, text: "item1", group: "group1" },
                { id: 2, text: "item2", group: "group2" },
                { id: 30, text: "item3", group: "group1" },
                { id: 4, text: "item4", group: "group1" },
            ];

            var result = new Query(data).groupBy({
                field: "group",
                compare: compareByTotal
            }).toArray();

            assert.equal(result.length, 2);
            assert.equal(result[0].items.length, 1);
            assert.equal(result[0].items[0].id, 2);

            assert.equal(result[1].items.length, 3);
            assert.equal(result[1].items[0].id, 1);
            assert.equal(result[1].items[1].id, 30);
            assert.equal(result[1].items[2].id, 4);
        });

        it("sort.dir is taken into account when custom sort.compare is used when grouping", function() {
            var data = [
                { id: 1, text: "item1", group: "group1" },
                { id: 2, text: "item2", group: "group2" },
                { id: 30, text: "item3", group: "group1" },
                { id: 4, text: "item4", group: "group1" },
            ];

            var result = new Query(data).groupBy({
                field: "group",
                dir: "desc",
                compare: compareByTotal
            }).toArray();

            assert.equal(result.length, 2);
            assert.equal(result[0].items.length, 3);
            assert.equal(result[0].items[0].id, 1);
            assert.equal(result[0].items[1].id, 30);
            assert.equal(result[0].items[2].id, 4);

            assert.equal(result[1].items.length, 1);
            assert.equal(result[1].items[0].id, 2)
        });

        it("sort.dir is taken into account when custom sort.compare is used with multiple groups", function() {
            var data = [
                 { id: 1, text: "item1", group: "group1" },
                 { id: 2, text: "item2", group: "group2" },

                 { id: 3, text: "item3", group: "group3" },

                 { id: 21, text: "item21", group: "group2" },

                 { id: 12, text: "item12", group: "group1" },
                 { id: 11, text: "item11", group: "group1" },
                 { id: 13, text: "item13", group: "group1" },
            ];

            var result = Query.process(data, {
                group: {
                    field: "group",
                    dir: "desc",
                    compare: compareByTotal
                },
                skip: 0,
                take: 100
            }).data;

            assert.deepEqual(result, [{
                "field": "group",
                "value": "group1",
                "items": [
                    { "id": 1, "text": "item1", "group": "group1" },
                    { "id": 12, "text": "item12", "group": "group1" },
                    { "id": 11, "text": "item11", "group": "group1" },
                    { "id": 13, "text": "item13", "group": "group1" },
                ],
                "hasSubgroups": false,
                "aggregates": {}
            }, {
                "field": "group",
                "value": "group2",
                "items": [
                    { "id": 2, "text": "item2", "group": "group2" },
                    { "id": 21, "text": "item21", "group": "group2" },
                ],
                "hasSubgroups": false,
                "aggregates": {}
            }, {
                "field": "group",
                "value": "group3",
                "items": [
                    { "id": 3, "text": "item3", "group": "group3" }
                ],
                "hasSubgroups": false,
                "aggregates": {}
            }]);
        });

        it("group compare is used when processing grouping", function() {
            var data = [
                { id: 1, text: "item1", group: "group1" },
                { id: 2, text: "item2", group: "group2" },
                { id: 30, text: "item3", group: "group1" },
                { id: 4, text: "item4", group: "group1" },
            ];

            var result = Query.process(data, {
                group: {
                    field: "group",
                    dir: "desc",
                    compare: compareByTotal
                }
            }).data;

            assert.equal(result.length, 2);
            assert.equal(result[0].items.length, 3);
            assert.equal(result[0].items[0].id, 1);
            assert.equal(result[0].items[1].id, 30);
            assert.equal(result[0].items[2].id, 4);

            assert.equal(result[1].items.length, 1);
            assert.equal(result[1].items[0].id, 2)
        });

        it("grouping with custom compare function does not sort the items on the first page", function() {
            var data = [
                 { id: 1,  text: "item1",  group: "group1" },

                 { id: 2,  text: "item2",  group: "group2" },
                 { id: 23, text: "item23", group: "group2" },
                 { id: 21, text: "item21", group: "group2" },
                 { id: 22, text: "item22", group: "group2" },

                 { id: 30, text: "item3",  group: "group1" },
                 { id: 4,  text: "item4",  group: "group1" },

                 { id: 60, text: "item6",  group: "group3" },
                 { id: 5,  text: "item5",  group: "group3" },
                 { id: 90, text: "item9",  group: "group3" },
                 { id: 7,  text: "item7",  group: "group3" },
                 { id: 8,  text: "item8",  group: "group3" }
            ];

            var result = Query.process(data, {
                group: {
                    field: "group",
                    dir: "desc",
                    compare: compareByTotal
                },
                skip: 0,
                take: 6
            }).data;

            assert.deepEqual(result, [{
                "field": "group",
                "value": "group3",
                "items": [
                    { "id": 60, "text": "item6", "group": "group3" },
                    { "id": 5,  "text": "item5", "group": "group3" },
                    { "id": 90, "text": "item9", "group": "group3" },
                    { "id": 7,  "text": "item7", "group": "group3" },
                    { "id": 8,  "text": "item8", "group": "group3" },
                ],
                "hasSubgroups": false,
                "aggregates": {}
            }, {
                "field": "group",
                "value": "group2",
                "items": [
                    { "id": 2, "text": "item2", "group": "group2" }
                ],
                "hasSubgroups": false,
                "aggregates": {}
            }]);
        });

        it("grouping with a custom compare function does not sort the items on the second page", function() {
            var data = [
                 { id: 1,  text: "item1",  group: "group1" },

                 { id: 2,  text: "item2",  group: "group2" },
                 { id: 23, text: "item23", group: "group2" },
                 { id: 21, text: "item21", group: "group2" },
                 { id: 22, text: "item22", group: "group2" },

                 { id: 30, text: "item3",  group: "group1" },
                 { id: 4,  text: "item4",  group: "group1" },

                 { id: 60, text: "item6",  group: "group3" },
                 { id: 5,  text: "item5",  group: "group3" },
                 { id: 90, text: "item9",  group: "group3" },
                 { id: 7,  text: "item7",  group: "group3" },
                 { id: 8,  text: "item8",  group: "group3" }
            ];

            var result = Query.process(data, {
                group: {
                    field: "group",
                    dir: "desc",
                    compare: compareByTotal
                },
                skip: 6,
                take: 100
            }).data;

            assert.deepEqual(result, [{
                "field": "group",
                "value": "group2",
                "items": [
                    { "id": 23, "text": "item23", "group": "group2" },
                    { "id": 21, "text": "item21", "group": "group2" },
                    { "id": 22, "text": "item22", "group": "group2" }
                ],
                "hasSubgroups": false,
                "aggregates": {}
            }, {
                "field": "group",
                "value": "group1",
                "items": [
                    { "id": 1,  "text": "item1", "group": "group1" },
                    { "id": 30, "text": "item3", "group": "group1" },
                    { "id": 4,  "text": "item4", "group": "group1" }
                ],
                "hasSubgroups": false,
                "aggregates": {}
            }]);
        });

        it("grouping with a custom compare function applies sorting when sort descriptor is defined on the first page", function() {
            var data = [
                 { id: 1,  text: "item1",  group: "group1" },

                 { id: 23, text: "item23", group: "group2" },
                 { id: 2,  text: "item2",  group: "group2" },
                 { id: 21, text: "item21", group: "group2" },
                 { id: 22, text: "item22", group: "group2" },

                 { id: 30, text: "item3",  group: "group1" },
                 { id: 4,  text: "item4",  group: "group1" },

                 { id: 60, text: "item6",  group: "group3" },
                 { id: 5,  text: "item5",  group: "group3" },
                 { id: 90, text: "item9",  group: "group3" },
                 { id: 7,  text: "item7",  group: "group3" },
                 { id: 8,  text: "item8",  group: "group3" }
            ];

            var result = Query.process(data, {
                group: {
                    field: "group",
                    dir: "desc",
                    compare: compareByTotal
                },
                sort: {
                    field: "id",
                    dir: "asc"
                },
                skip: 0,
                take: 7
            }).data;

            assert.deepEqual(result, [{
                "field": "group",
                "value": "group3",
                "items": [
                    { "id": 5,  "text": "item5", "group": "group3" },
                    { "id": 7,  "text": "item7", "group": "group3" },
                    { "id": 8,  "text": "item8", "group": "group3" },
                    { "id": 60, "text": "item6", "group": "group3" },
                    { "id": 90, "text": "item9", "group": "group3" },
                ],
                "hasSubgroups": false,
                "aggregates": {}
            }, {
                "field": "group",
                "value": "group2",
                "items": [
                    { "id": 2,  "text": "item2",  "group": "group2" },
                    { "id": 21, "text": "item21", "group": "group2" }
                ],
                "hasSubgroups": false,
                "aggregates": {}
            }]);
        });

        it("grouping with a custom compare function applies sorting when sort descriptor is defined on the second page", function() {
            var data = [
                 { id: 1,  text: "item1",  group: "group1" },

                 { id: 2,  text: "item2",  group: "group2" },
                 { id: 23, text: "item23", group: "group2" },
                 { id: 21, text: "item21", group: "group2" },
                 { id: 22, text: "item22", group: "group2" },

                 { id: 30, text: "item3",  group: "group1" },
                 { id: 4,  text: "item4",  group: "group1" },

                 { id: 60, text: "item6",  group: "group3" },
                 { id: 5,  text: "item5",  group: "group3" },
                 { id: 90, text: "item9",  group: "group3" },
                 { id: 7,  text: "item7",  group: "group3" },
                 { id: 8,  text: "item8",  group: "group3" }
            ];

            var result = Query.process(data, {
                group: {
                    field: "group",
                    dir: "desc",
                    compare: compareByTotal
                },
                sort: {
                    field: "id",
                    dir: "asc"
                },
                skip: 6,
                take: 100
            }).data;

            assert.deepEqual(result, [{
                "field": "group",
                "value": "group2",
                "items": [
                    { "id": 21, "text": "item21", "group": "group2" },
                    { "id": 22, "text": "item22", "group": "group2" },
                    { "id": 23, "text": "item23", "group": "group2" }
                ],
                "hasSubgroups": false,
                "aggregates": {}
            }, {
                "field": "group",
                "value": "group1",
                "items": [
                    { "id": 1,  "text": "item1", "group": "group1" },
                    { "id": 4,  "text": "item4", "group": "group1" },
                    { "id": 30, "text": "item3", "group": "group1" }
                ],
                "hasSubgroups": false,
                "aggregates": {}
            }]);
        });

        it("group aggregates are calculated with custom compare function without paging", function() {
            var data = [
                 { id: 2,  text: "item2", group: "group2" },
                 { id: 21, text: "item21", group: "group2" },

                 { id: 1,  text: "item1", group: "group1" },
                 { id: 11, text: "item11", group: "group1" },
                 { id: 12, text: "item12", group: "group1" },
            ];

            var result = Query.process(data, {
                group: {
                    field: "group",
                    dir: "asc",
                    compare: compareByTotal,
                    aggregates: [
                        { field: "group", aggregate: "count" }
                    ]
                }
            }).data;

            assert.deepEqual(result, [{
                "field": "group",
                "value": "group2",
                "items": [
                    { "id": 2,  "text": "item2",  "group": "group2" },
                    { "id": 21, "text": "item21", "group": "group2" },
                ],
                "hasSubgroups": false,
                "aggregates": {
                    "group": {
                        "count": 2
                    }
                }
            }, {
                "field": "group",
                "value": "group1",
                "items": [
                    { "id": 1,  "text": "item1",  "group": "group1" },
                    { "id": 11, "text": "item11", "group": "group1" },
                    { "id": 12, "text": "item12", "group": "group1" }
                ],
                "hasSubgroups": false,
                "aggregates": {
                    "group": {
                        "count": 3
                    }
                }
            }])
        });

        it("group aggregates are calculated with custom compare function with paging", function() {
            var data = [
                 { id: 2, text: "item2", group: "group2" },
                 { id: 21, text: "item21", group: "group2" },

                 { id: 1, text: "item1", group: "group1" },
                 { id: 11, text: "item11", group: "group1" },
                 { id: 12, text: "item12", group: "group1" },
            ];

            var result = Query.process(data, {
                group: {
                    field: "group",
                    dir: "asc",
                    compare: compareByTotal,
                    aggregates: [
                        { field: "group", aggregate: "count" }
                    ]
                },
                skip: 0,
                take: 3
            }).data;

            assert.deepEqual(result, [{
                "field": "group",
                "value": "group2",
                "items": [
                    { "id": 2, "text": "item2", "group": "group2" },
                    { "id": 21, "text": "item21", "group": "group2" }
                ],
                "hasSubgroups": false,
                "aggregates": {
                    "group": {
                        "count": 2
                    }
                }
            }, {
                "field": "group",
                "value": "group1",
                "items": [
                    { "id": 1, "text": "item1", "group": "group1" }
                ],
                "hasSubgroups": false,
                "aggregates": {
                    "group": {
                        "count": 3
                    }
                }
            }])
        });

        it("groupby returns ungroup collection if no descriptors are provided", function() {
            var data = [{ field: 100 }, { field: 100 }, { field: 1 }];

            var result = new Query(data).group().toArray();
            assert.equal(result, data);
        });

        it("groupby groups data by field and direction", function() {
            var data = [{ field: 100 }, { field: 100 }, { field: 1 }];

            var result = new Query(data).group([{
                field: "field",
                dir: "desc"
            }]).toArray();
            assert.equal(result.length, 2);
            assert.equal(result[1].value, 1);
            assert.equal(result[1].field, "field");
            assert.equal(result[1].items.length, 1);
            assert.equal(result[0].value, 100);
            assert.equal(result[0].field, "field");
            assert.equal(result[0].items.length, 2);
        });

        it("groupby groups data by multiple fields", function() {
            var data = [{ foo: 100, bar: "baz" }, { foo: 100, bar: "bar" }, { foo: 1, bar: "baz" }],
                firstGroup,
                secondGroup;

            var result = new Query(data).group([{ field: "foo" }, { field: "bar" }]).toArray();

            assert.equal(result.length, 2);
            firstGroup = result[0];
            secondGroup = result[1];

            assert.equal(firstGroup.value, 1);
            assert.equal(firstGroup.field, "foo");
            assert.equal(firstGroup.items.length, 1);
            assert.equal(firstGroup.items[0].value, "baz");
            assert.equal(firstGroup.items[0].field, "bar");
            assert.equal(firstGroup.items[0].items.length, 1);
            assert.equal(secondGroup.value, 100);
            assert.equal(secondGroup.field, "foo");
            assert.equal(secondGroup.items.length, 2);
            assert.equal(secondGroup.items[0].value, "bar");
            assert.equal(secondGroup.items[0].field, "bar");
            assert.equal(secondGroup.items[0].items.length, 1);
            assert.equal(secondGroup.items[1].value, "baz");
            assert.equal(secondGroup.items[1].field, "bar");
            assert.equal(secondGroup.items[1].items.length, 1);
        });

        it("group by nullable string with more than 10 items", function() {
            var data = [
                { foo: 1, bar: null },
                { foo: 2, bar: "foo" },
                { foo: 3, bar: null },
                { foo: 4, bar: "foo" },
                { foo: 5, bar: "foo" },
                { foo: 6, bar: null },
                { foo: 7, bar: "foo" },
                { foo: 8, bar: null },
                { foo: 9, bar: "foo" },
                { foo: 10, bar: null },
                { foo: 11, bar: null },
                { foo: 12, bar: "foo" },
                { foo: 13, bar: "foo" }
            ];

            var result = new Query(data).group({ field: "bar" }).toArray();

            assert.equal(result.length, 2);

            assert.equal(result[0].field, "bar");
            assert.equal(result[0].value, null);
            assert.equal(result[0].items.length, 6);

            assert.equal(result[1].field, "bar");
            assert.equal(result[1].value, "foo");
            assert.equal(result[1].items.length, 7);
        });

        it("group by nullable string with more than 10 items descending", function() {
            var data = [
                { foo: 1, bar: null },
                { foo: 2, bar: "foo" },
                { foo: 3, bar: null },
                { foo: 4, bar: "foo" },
                { foo: 5, bar: "foo" },
                { foo: 6, bar: null },
                { foo: 7, bar: "foo" },
                { foo: 8, bar: null },
                { foo: 9, bar: "foo" },
                { foo: 10, bar: null },
                { foo: 11, bar: null },
                { foo: 12, bar: "foo" },
                { foo: 13, bar: "foo" }
            ];

            var result = new Query(data).group({ field: "bar", dir: "desc" }).toArray();

            assert.equal(result.length, 2);

            assert.equal(result[0].field, "bar");
            assert.equal(result[0].value, "foo");
            assert.equal(result[0].items.length, 7);

            assert.equal(result[1].field, "bar");
            assert.equal(result[1].value, null);
            assert.equal(result[1].items.length, 6);
        });

        it("group by nullable boolean with more than 10 items", function() {
            var data = [
                { foo: 1, bar: null },
                { foo: 2, bar: true },
                { foo: 3, bar: null },
                { foo: 4, bar: false },
                { foo: 5, bar: true },
                { foo: 6, bar: null },
                { foo: 7, bar: true },
                { foo: 8, bar: null },
                { foo: 9, bar: false },
                { foo: 10, bar: null },
                { foo: 11, bar: null },
                { foo: 12, bar: false },
                { foo: 13, bar: true }
            ];

            var result = new Query(data).group({ field: "bar" }).toArray();

            assert.equal(result.length, 3);

            assert.equal(result[0].field, "bar");
            assert.equal(result[0].value, null);
            assert.equal(result[0].items.length, 6);

            assert.equal(result[1].field, "bar");
            assert.equal(result[1].value, false);
            assert.equal(result[1].items.length, 3);

            assert.equal(result[2].field, "bar");
            assert.equal(result[2].value, true);
            assert.equal(result[2].items.length, 4);
        });

        it("group by nullable boolean with more than 10 items descending", function() {
            var data = [
                { foo: 1, bar: null },
                { foo: 2, bar: true },
                { foo: 3, bar: null },
                { foo: 4, bar: false },
                { foo: 5, bar: true },
                { foo: 6, bar: null },
                { foo: 7, bar: true },
                { foo: 8, bar: null },
                { foo: 9, bar: false },
                { foo: 10, bar: null },
                { foo: 11, bar: null },
                { foo: 12, bar: false },
                { foo: 13, bar: true }
            ];

            var result = new Query(data).group({ field: "bar", dir: "desc" }).toArray();

            assert.equal(result.length, 3);

            assert.equal(result[0].field, "bar");
            assert.equal(result[0].value, true);
            assert.equal(result[0].items.length, 4);

            assert.equal(result[1].field, "bar");
            assert.equal(result[1].value, false);
            assert.equal(result[1].items.length, 3);

            assert.equal(result[2].field, "bar");
            assert.equal(result[2].value, null);
            assert.equal(result[2].items.length, 6);
        });

        it("group by nullable int with more than 10 items", function() {
            var data = [
                { foo: 1, bar: null },
                { foo: 2, bar: 1 },
                { foo: 3, bar: null },
                { foo: 4, bar: 0 },
                { foo: 5, bar: 1 },
                { foo: 6, bar: null },
                { foo: 7, bar: 1 },
                { foo: 8, bar: null },
                { foo: 9, bar: 0 },
                { foo: 10, bar: null },
                { foo: 11, bar: null },
                { foo: 12, bar: 0 },
                { foo: 13, bar: 1 }
            ];

            var result = new Query(data).group({ field: "bar" }).toArray();

            assert.equal(result.length, 3);

            assert.equal(result[0].field, "bar");
            assert.equal(result[0].value, null);
            assert.equal(result[0].items.length, 6);

            assert.equal(result[1].field, "bar");
            assert.equal(result[1].value, 0);
            assert.equal(result[1].items.length, 3);

            assert.equal(result[2].field, "bar");
            assert.equal(result[2].value, 1);
            assert.equal(result[2].items.length, 4);
        });

        it("group by nullable int with more than 10 items descending", function() {
            var data = [
                { foo: 1, bar: null },
                { foo: 2, bar: 1 },
                { foo: 3, bar: null },
                { foo: 4, bar: 0 },
                { foo: 5, bar: 1 },
                { foo: 6, bar: null },
                { foo: 7, bar: 1 },
                { foo: 8, bar: null },
                { foo: 9, bar: 0 },
                { foo: 10, bar: null },
                { foo: 11, bar: null },
                { foo: 12, bar: 0 },
                { foo: 13, bar: 1 }
            ];

            var result = new Query(data).group({ field: "bar", dir: "desc" }).toArray();

            assert.equal(result.length, 3);

            assert.equal(result[0].field, "bar");
            assert.equal(result[0].value, 1);
            assert.equal(result[0].items.length, 4);

            assert.equal(result[1].field, "bar");
            assert.equal(result[1].value, 0);
            assert.equal(result[1].items.length, 3);

            assert.equal(result[2].field, "bar");
            assert.equal(result[2].value, null);
            assert.equal(result[2].items.length, 6);
        });


        it("groupby groups data by multiple fields with 3 levels", function() {
            var data = [{ foo: 100, bar: "baz", baz: "baz" }, { foo: 100, bar: "bar", baz: "baz" }, { foo: 1, bar: "baz", baz: "baz" }],
                firstGroup,
                secondGroup;

            var result = new Query(data).group([{ field: "foo" }, { field: "bar" }, { field: "baz" }]).toArray();
            assert.equal(result.length, 2);
            firstGroup = result[0];
            secondGroup = result[1];

            assert.equal(firstGroup.value, 1);
            assert.equal(firstGroup.field, "foo");
            assert.equal(firstGroup.items.length, 1);
            assert.equal(firstGroup.items[0].value, "baz");
            assert.equal(firstGroup.items[0].field, "bar");
            assert.equal(firstGroup.items[0].items.length, 1);

            assert.equal(firstGroup.value, 1);
            assert.equal(firstGroup.field, "foo");
            assert.equal(firstGroup.items.length, 1);
            assert.equal(firstGroup.items[0].items[0].value, "baz");
            assert.equal(firstGroup.items[0].items[0].field, "baz");
            assert.equal(firstGroup.items[0].items[0].items.length, 1);

            assert.equal(secondGroup.value, 100);
            assert.equal(secondGroup.field, "foo");
            assert.equal(secondGroup.items.length, 2);

            assert.equal(secondGroup.items[0].value, "bar");
            assert.equal(secondGroup.items[0].field, "bar");
            assert.equal(secondGroup.items[0].items.length, 1);
            assert.equal(secondGroup.items[1].value, "baz");
            assert.equal(secondGroup.items[1].field, "bar");
            assert.equal(secondGroup.items[1].items.length, 1);

        });

        it("group by nullable boolean", function() {
            var data = [
                {
                    foo: 1,
                    bar: true

                },
                {
                    foo: 2,
                    bar: false

                },
                {
                    foo: 3,
                    bar: null

                },
                {
                    foo: 5,
                    bar: false

                }
            ];

            var result = new Query(data).sort({ field: "foo", dir: "desc" }).group({ field: "bar" }).toArray();

            assert.equal(result.length, 3);

            assert.equal(result[0].field, "bar");
            assert.equal(result[0].value, null);
            assert.equal(result[0].items.length, 1);

            assert.equal(result[1].field, "bar");
            assert.equal(result[1].value, false);
            assert.equal(result[1].items.length, 2);

            assert.equal(result[2].field, "bar");
            assert.equal(result[2].value, true);
            assert.equal(result[2].items.length, 1);
        });

        it("sort desc when group by nullable boolean", function() {
            var data = [
                {
                    foo: 1,
                    bar: null

                },
                {
                    foo: 2,
                    bar: null

                }
            ];

            var result = new Query(data).sort({ field: "foo", dir: "desc" }).group({ field: "bar" }).toArray();

            assert.equal(result.length, 1);

            assert.equal(result[0].field, "bar");
            assert.equal(result[0].value, null);
            assert.equal(result[0].items.length, 2);

            assert.equal(result[0].items[0].foo, 2);
            assert.equal(result[0].items[1].foo, 1);
        });

        it("sort asc when group by nullable boolean", function() {
            var data = [
                {
                    foo: 2,
                    bar: null

                },
                {
                    foo: 1,
                    bar: null

                }
            ];

            var result = new Query(data).sort({ field: "foo", dir: "asc" }).group({ field: "bar" }).toArray();

            assert.equal(result.length, 1);

            assert.equal(result[0].field, "bar");
            assert.equal(result[0].value, null);
            assert.equal(result[0].items.length, 2);

            assert.equal(result[0].items[0].foo, 1);
            assert.equal(result[0].items[1].foo, 2);
        });

        it("sort asc by nullable string with more than 10 items", function() {
            var data = [
                { foo: 1, bar: null },
                { foo: 2, bar: "foo" },
                { foo: 3, bar: null },
                { foo: 4, bar: "foo" },
                { foo: 5, bar: "foo" },
                { foo: 6, bar: null },
                { foo: 7, bar: "foo" },
                { foo: 8, bar: null },
                { foo: 9, bar: "foo" },
                { foo: 10, bar: null },
                { foo: 11, bar: undefined },
                { foo: 12, bar: "foo" },
                { foo: 13, bar: "foo" }
            ];
            var result = new Query(data).sort({ field: "bar", dir: "asc" }).toArray();

            assert.equal(result[0].bar, null);
            assert.equal(result[1].bar, null);
            assert.equal(result[2].bar, null);
            assert.equal(result[3].bar, null);
            assert.equal(result[4].bar, null);
            assert.equal(result[5].bar, null);
            assert.equal(result[6].bar, "foo");
            assert.equal(result[7].bar, "foo");
            assert.equal(result[8].bar, "foo");
            assert.equal(result[9].bar, "foo");
            assert.equal(result[10].bar, "foo");
            assert.equal(result[11].bar, "foo");
            assert.equal(result[12].bar, "foo");
        });

        it("sort desc by nullable string with more than 10 items", function() {
            var data = [
                { foo: 1, bar: "foo" },
                { foo: 2, bar: null },
                { foo: 3, bar: null },
                { foo: 4, bar: "foo" },
                { foo: 5, bar: "foo" },
                { foo: 6, bar: null },
                { foo: 7, bar: "foo" },
                { foo: 8, bar: null },
                { foo: 9, bar: "foo" },
                { foo: 10, bar: null },
                { foo: 11, bar: null },
                { foo: 12, bar: "foo" },
                { foo: 13, bar: "foo" }
            ];

            var result = new Query(data).sort({ field: "bar", dir: "desc" }).toArray();

            assert.equal(result[0].bar, "foo");
            assert.equal(result[1].bar, "foo");
            assert.equal(result[2].bar, "foo");
            assert.equal(result[3].bar, "foo");
            assert.equal(result[4].bar, "foo");
            assert.equal(result[5].bar, "foo");
            assert.equal(result[6].bar, "foo");

            assert.equal(result[7].bar, null);
            assert.equal(result[8].bar, null);
            assert.equal(result[9].bar, null);
            assert.equal(result[10].bar, null);
            assert.equal(result[11].bar, null);
            assert.equal(result[12].bar, null);
        });

        it("sort desc by nullable string with more than 10 items", function() {
            var data = [
                { foo: 1, bar: "foo" },
                { foo: 2, bar: null },
                { foo: 3, bar: null },
                { foo: 4, bar: "foo" },
                { foo: 5, bar: "foo" },
                { foo: 6, bar: null },
                { foo: 7, bar: "foo" },
                { foo: 8, bar: null },
                { foo: 9, bar: "foo" },
                { foo: 10, bar: null },
                { foo: 11, bar: null },
                { foo: 12, bar: "foo" },
                { foo: 13, bar: "foo" }
            ];

            var result = new Query(data).sort({ field: "bar", dir: "desc" }).toArray();

            assert.equal(result[0].bar, "foo");
            assert.equal(result[1].bar, "foo");
            assert.equal(result[2].bar, "foo");
            assert.equal(result[3].bar, "foo");
            assert.equal(result[4].bar, "foo");
            assert.equal(result[5].bar, "foo");
            assert.equal(result[6].bar, "foo");

            assert.equal(result[7].bar, null);
            assert.equal(result[8].bar, null);
            assert.equal(result[9].bar, null);
            assert.equal(result[10].bar, null);
            assert.equal(result[11].bar, null);
            assert.equal(result[12].bar, null);
        });


        it("group aggregates are calculated if provided", function() {
            var data = [{ foo: 100, bar: "baz" }, { foo: 100, bar: "bar" }, { foo: 1, bar: "baz" }];

            var result = new Query(data).group([{ field: "foo", aggregates: [{ field: "foo", aggregate: "sum" }] }]).toArray();

            assert.equal(result.length, 2);

            assert.equal(result[0].aggregates["foo"].sum, 1);
            assert.equal(result[1].aggregates["foo"].sum, 200);
        });

        it("group aggregates are caseinsensitive", function() {
            var data = [{ foo: 100, bar: "baz" }, { foo: 100, bar: "bar" }, { foo: 1, bar: "Baz" }];

            var result = new Query(data).group([{ field: "bar", aggregates: [{ field: "foo", aggregate: "sum" }] }]).toArray();

            assert.equal(result.length, 3);

            assert.equal(result[0].aggregates["foo"].sum, 100);
            assert.equal(result[1].aggregates["foo"].sum, 100);
            assert.equal(result[2].aggregates["foo"].sum, 1);
        });

        it("group aggregates are calculated  for multiple fields if provided", function() {
            var data = [{ foo: 100, bar: "baz" }, { foo: 100, bar: "bar" }, { foo: 1, bar: "baz" }];

            var result = new Query(data).group([{ field: "foo", aggregates: [{ field: "foo", aggregate: "sum" }, { field: "bar", aggregate: "count" }] }]).toArray();

            assert.equal(result.length, 2);

            assert.equal(result[0].aggregates["foo"].sum, 1);
            assert.equal(result[1].aggregates["foo"].sum, 200);
            assert.equal(result[0].aggregates["bar"].count, 1);
            assert.equal(result[1].aggregates["bar"].count, 2);
        });

        it("group aggregates are calculated for multiple group levels", function() {
            var data = [{ foo: 100, bar: "baz" }, { foo: 100, bar: "bar" }, { foo: 1, bar: "baz" }];

            var result = new Query(data).group([
                { field: "foo", aggregates: [{ field: "foo", aggregate: "sum" }] },
                { field: "bar", aggregates: [{ field: "foo", aggregate: "sum" }] }
            ]).toArray();

            assert.equal(result.length, 2);

            assert.equal(result[0].aggregates["foo"].sum, 1);
            assert.equal(result[0].items[0].aggregates["foo"].sum, 1);
            assert.equal(result[1].aggregates["foo"].sum, 200);
            assert.equal(result[1].items[0].aggregates["foo"].sum, 100);
            assert.equal(result[1].items[1].aggregates["foo"].sum, 100);
        });

        it("group aggregates with multiple group levels and paging original data is required", function() {
            var data = [{ foo: 100, bar: "baz" }, { foo: 100, bar: "bar" }, { foo: 1, bar: "baz" }];

            var result = new Query(data).skip(1).take(1).group([
                { field: "foo", aggregates: [{ field: "foo", aggregate: "sum" }] },
                { field: "bar", aggregates: [{ field: "foo", aggregate: "sum" }] }
            ], data).toArray();

            assert.equal(result.length, 1);

            assert.equal(result[0].aggregates["foo"].sum, 200);
            assert.equal(result[0].items[0].aggregates["foo"].sum, 100);
        });

        it("aggregate calculates aggregates for a collection", function() {
            var data = [{ foo: 100, bar: "baz" }, { foo: 100, bar: "bar" }, { foo: 1, bar: "baz" }];

            var result = new Query(data).aggregate([{ field: "foo", aggregate: "sum" }, { field: "bar", aggregate: "count" }]);

            assert.equal(result.foo.sum, 201);
            assert.equal(result.bar.count, 3);
        });

        it("aggregate returns empty object if no descriptor are provided", function() {
            var data = [{ foo: 100, bar: "baz" }, { foo: 100, bar: "bar" }, { foo: 1, bar: "baz" }];

            var result = new Query(data).aggregate();

            assert.isOk(result);
        });

        it("aggregate returns empty object if collection is empty", function() {
            var data = [];

            var result = new Query(data).aggregate([{ field: "foo", aggregate: "sum" }, { field: "bar", aggregate: "count" }]);

            assert.isOk(result);
        });

        it("aggregate max returns max value for a given field", function() {
            var data = [{ foo: 100, bar: "baz" }, { foo: 100, bar: "bar" }, { foo: 1, bar: "baz" }];

            var result = new Query(data).aggregate([{ field: "foo", aggregate: "max" }]);

            assert.equal(result.foo.max, 100);
        });

        it("aggregate average return null if data is null", function() {
            var data = [{ foo: null, bar: "baz" }, { foo: null, bar: "bar" }, { foo: null, bar: "baz" }];

            var result = new Query(data).aggregate([{ field: "foo", aggregate: "average" }]);

            assert.equal(result.foo.average, null);
        });

        it("aggregate average skips null values", function() {
            var data = [{ foo: null, bar: "baz" }, { foo: 10, bar: "bar" }];

            var result = new Query(data).aggregate([{ field: "foo", aggregate: "average" }]);

            assert.equal(result.foo.average, 10);
        });

        it("aggregate average skips null values but calculates zeros", function() {
            var data = [{ foo: null, bar: "baz" }, { foo: 10, bar: "bar" }, { foo: 0, bar: "bar" }];

            var result = new Query(data).aggregate([{ field: "foo", aggregate: "average" }]);

            assert.equal(result.foo.average, 5);
        });

        it("aggregate average for a given field", function() {
            var data = [{ foo: 100, bar: "baz" }, { foo: 100, bar: "bar" }, { foo: 1, bar: "baz" }];

            var result = new Query(data).aggregate([{ field: "foo", aggregate: "average" }]);

            assert.equal(result.foo.average, 67);
        });

        it("aggregate function should be caseinsensitive", function() {
            var data = [{ foo: 100, bar: "baz" }, { foo: 100, bar: "bar" }, { foo: 1, bar: "baz" }];

            var result = new Query(data).aggregate([{ field: "foo", aggregate: "Min" }]);

            assert.equal(result.foo.Min, 1);
        });

        it("aggregate min returns min value for a given field", function() {
            var data = [{ foo: 100, bar: "baz" }, { foo: 100, bar: "bar" }, { foo: 1, bar: "baz" }];

            var result = new Query(data).aggregate([{ field: "foo", aggregate: "min" }]);

            assert.equal(result.foo.min, 1);
        });

        it("aggregate min returns min value for a given field with nulls", function() {
            var data = [{ foo: 1, bar: "baz" }, { foo: 100, bar: "baz" }, { foo: null, bar: "baz" }, { foo: 100, bar: "bar" }];

            var result = new Query(data).aggregate([{ field: "foo", aggregate: "min" }]);

            assert.equal(result.foo.min, 1);
        });

        it("aggregate min returns min value for a given field with 0", function() {
            var data = [{ foo: 1, bar: "baz" }, { foo: 100, bar: "baz" }, { foo: 0, bar: "baz" }, { foo: 100, bar: "bar" }];

            var result = new Query(data).aggregate([{ field: "foo", aggregate: "min" }]);

            assert.equal(result.foo.min, 0);
        });

        it("aggregate min returns min value for a given field with undefined", function() {
            var data = [{ foo: 1, bar: "baz" }, { foo: 100, bar: "baz" }, { foo: undefined, bar: "baz" }, { foo: 100, bar: "bar" }];

            var result = new Query(data).aggregate([{ field: "foo", aggregate: "min" }]);

            assert.equal(result.foo.min, 1);
        });

        it("aggregate min returns min value for a given field with 0", function() {
            var data = [{ foo: 1, bar: "baz" }, { foo: 100, bar: "baz" }, { foo: 0, bar: "baz" }, { foo: 100, bar: "bar" }];

            var result = new Query(data).aggregate([{ field: "foo", aggregate: "min" }]);

            assert.equal(result.foo.min, 0);
        });

        it("aggregate min returns min value for a given field with less than 0", function() {
            var data = [{ foo: -1, bar: "baz" }, { foo: 100, bar: "baz" }, { foo: 0, bar: "baz" }, { foo: 100, bar: "bar" }];

            var result = new Query(data).aggregate([{ field: "foo", aggregate: "min" }]);

            assert.equal(result.foo.min, -1);
        });

        it("aggregate max returns null if all fields are null", function() {
            var data = [{ foo: null, bar: "baz" }, { foo: null, bar: "baz" }, { foo: null, bar: "baz" }, { foo: null, bar: "bar" }];

            var result = new Query(data).aggregate([{ field: "foo", aggregate: "max" }]);

            assert.equal(result.foo.max, null);
        });

        it("aggregate max returns null if all fields are undefined or null", function() {
            var data = [{ foo: null, bar: "baz" }, { foo: undefined, bar: "baz" }, { foo: null, bar: "baz" }, { foo: undefined, bar: "bar" }];

            var result = new Query(data).aggregate([{ field: "foo", aggregate: "max" }]);

            assert.equal(result.foo.max, null);
        });

        it("aggregate max returns undefined if all fields are undefined", function() {
            var data = [{ foo: undefined, bar: "baz" }, { foo: undefined, bar: "baz" }];

            var result = new Query(data).aggregate([{ field: "foo", aggregate: "max" }]);

            assert.equal(result.foo.max, undefined);
        });

        it("aggregate max returns min value for a given field with null", function() {
            var data = [{ foo: 10, bar: "baz" }, { foo: 100, bar: "baz" }, { foo: null, bar: "baz" }, { foo: 10, bar: "bar" }];

            var result = new Query(data).aggregate([{ field: "foo", aggregate: "max" }]);

            assert.equal(result.foo.max, 100);
        });

        it("aggregate max returns min value for a given field with undefined", function() {
            var data = [{ foo: 10, bar: "baz" }, { foo: 100, bar: "baz" }, { foo: undefined, bar: "baz" }, { foo: 10, bar: "bar" }];

            var result = new Query(data).aggregate([{ field: "foo", aggregate: "max" }]);

            assert.equal(result.foo.max, 100);
        });

        it("aggregate max returns min value for a given field with 0", function() {
            var data = [{ foo: 10, bar: "baz" }, { foo: 100, bar: "baz" }, { foo: 0, bar: "baz" }, { foo: 10, bar: "bar" }];

            var result = new Query(data).aggregate([{ field: "foo", aggregate: "max" }]);

            assert.equal(result.foo.max, 100);
        });

        it("aggregate max with date", function() {
            var data = [{ foo: new Date("2013/05/06"), bar: "baz" }, { foo: new Date("2050/05/06"), bar: "bar" }, { foo: new Date("1940/05/06"), bar: "baz" }, { foo: new Date("1980/05/06"), bar: "baz" }];

            var result = new Query(data).aggregate([{ field: "foo", aggregate: "max" }]);

            assert.deepEqual(result.foo.max, new Date("2050/05/06"));
        });

        it("aggregate min with date", function() {
            var data = [{ foo: new Date("2013/05/06"), bar: "baz" }, { foo: new Date("2050/05/06"), bar: "bar" }, { foo: new Date("1940/05/06"), bar: "baz" }, { foo: new Date("1980/05/06"), bar: "baz" }];

            var result = new Query(data).aggregate([{ field: "foo", aggregate: "min" }]);

            assert.deepEqual(result.foo.min, new Date("1940/05/06"));
        });

        it("aggregate min with date and null", function() {
            var data = [{ foo: new Date("2013/05/06"), bar: "baz" }, { foo: null, bar: "bar" }, { foo: new Date("1940/05/06"), bar: "baz" }, { foo: null, bar: "bar" }, { foo: new Date("1980/05/06"), bar: "baz" }];

            var result = new Query(data).aggregate([{ field: "foo", aggregate: "min" }]);

            assert.deepEqual(result.foo.min, new Date("1940/05/06"));
        });

        it("aggregate count with null", function() {
            var data = [{ foo: 10, bar: "baz" }, { foo: 100, bar: "baz" }, { foo: null, bar: "baz" }, { foo: 10, bar: "bar" }];

            var result = new Query(data).aggregate([{ field: "foo", aggregate: "count" }]);

            assert.equal(result.foo.count, 4);
        });

        it("group parent group should have hasSubgroups set to true", function() {
            var data = [{ foo: 100, bar: "baz" }, { foo: 100, bar: "bar" }, { foo: 1, bar: "baz" }];

            var result = new Query(data).group([
                { field: "foo" },
                { field: "bar" }
            ], data).toArray();

            assert.equal(result.length, 2);

            assert.isOk(result[0].hasSubgroups);
            assert.isOk(!result[0].items[0].hasSubgroups);
        });

        it("group group should have hasSubgroups set to false", function() {
            var data = [{ foo: 100, bar: "baz" }, { foo: 100, bar: "bar" }, { foo: 1, bar: "baz" }];

            var result = new Query(data).group([{ field: "foo" }], data).toArray();

            assert.equal(result.length, 2);

            assert.isOk(!result[0].hasSubgroups);
        });

        it("aggregate return empty object if data is undefined", function() {
            var result = new Query(undefined).aggregate([{ field: "foo", aggregate: "sum" }, { field: "bar", aggregate: "count" }]);

            assert.isOk(result);
        });

        it("group on empty array", function() {
            var data = [];

            var result = new Query(data).group([{ field: "foo" }], data).toArray();

            assert.equal(result.length, 0);
        });

        it("filter isnullorempty on string", function() {
            var data = [{ name: null }, { name: "" }, { name: " " }, { name: "bar" }, { name: "foo" }];

            var result = new Query(data).filter({ field: "name", operator: "isnullorempty" }).toArray();

            assert.equal(result.length, 2);
        });

        it("filter isnotnullorempty on string", function() {
            var data = [{ name: null }, { name: "" }, { name: " " }, { name: "bar" }, { name: "foo" }];

            var result = new Query(data).filter({ field: "name", operator: "isnotnullorempty" }).toArray();

            assert.equal(result.length, 3);
        });

    });
}());
