(function(){

var Query = kendo.data.Query;

test("take returns the specified number of records", function() {
    var q = new Query([1,2]);
    var result = q.take(1).toArray();
    equal(result.length, 1);
    equal(result[0], 1);
});

test("skip returns new array starting after the specified index", function () {
    var q = new Query([1,2]);
    var result = q.skip(1).toArray();

    equal(result.length, 1);
    equal(result[0], 2);
});

test("skip and take returns a page of records", function () {
    var q = new Query([1, 2, 3]);

    var result = q.skip(1).take(2).toArray();

    equal(result.length, 2);
    equal(result[0], 2);
    equal(result[1], 3);
});

test("range returns given number of items from specific index", function() {
     var q = new Query([1, 2, 3, 4, 5, 6, 7, 8]);

     var result = q.range(1, 4).toArray();
     equal(result.length, 4);
     equal(result[0], 2);
     equal(result[1], 3);
     equal(result[2], 4);
     equal(result[3], 5);
});

test("orderBy sorts numbers in ascending order", function () {
    var data = [100, 10, 1];

    var result = new Query(data).orderBy(function (item) {
        return item;
    }).toArray();

    equal(result.length, 3);
    equal(result[0], 1);
    equal(result[1], 10);
    equal(result[2], 100);
});

test("orderBy sorts strings in ascending order", function () {
    var data = ["foo", "bar", "baz"];

    var result = new Query(data).orderBy(function (item) {
        return item;
    }).toArray();

    equal(result.length, 3);
    equal(result[0], "bar");
    equal(result[1], "baz");
    equal(result[2], "foo");
});

test("orderBy ignores string casing", function() {
    var data = ["A", "z", "Z", "a"];

    var result = new Query(data).orderBy(function (item) {
        return item;
    }).toArray();

    equal(result.length, 4);
    equal(result[0], "a");
    equal(result[1], "A");
    equal(result[2], "z");
    equal(result[3], "Z");
});

test("ascending sort for grouping ignores string case", function() {
    var data = [{ text: "A" },{ text:  "z" },{ text:  "Z" }, { text: "a" }];

    var result = new Query(data)._sortForGrouping("text", "asc");

    equal(result.length, 4);
    equal(result[0].text, "a");
    equal(result[1].text, "A");
    equal(result[2].text, "z");
    equal(result[3].text, "Z");
});

test("descending sort for grouping ignores string case", function() {
    var data = [{ text: "A" },{ text:  "z" },{ text:  "Z" }, { text: "a" }];

    var result = new Query(data)._sortForGrouping("text", "desc");

    equal(result.length, 4);
    equal(result[0].text, "Z");
    equal(result[1].text, "z");
    equal(result[2].text, "A");
    equal(result[3].text, "a");
});

test("orderBy sorts dates in ascending order", function () {
    var data = [new Date(2011, 1, 1), new Date(2008, 1, 1), new Date(2009, 1, 1)];

    var result = new Query(data).orderBy(function (item) {
        return item;
    }).toArray();

    equal(result.length, 3);
    equal(result[0].getFullYear(), 2008);
    equal(result[1].getFullYear(), 2009);
    equal(result[2].getFullYear(), 2011);
});


test("orderBy sorts dates earlier then 1970 and nulls", function () {
    var data = [new Date(1955, 1, 1), null, new Date(2009, 1, 1)];

    var result = new Query(data).orderBy(function (item) {
        return item;
    }).toArray();

    equal(result.length, 3);
    ok(!result[0]);
    equal(result[1].getFullYear(), 1955);
    equal(result[2].getFullYear(), 2009);
});

test("orderByDescending sorts dates earlier then 1970 and multiple nulls", function () {
    var data = [new Date(1955, 1, 1), null, null, new Date(2009, 1, 1), null];

    var result = new Query(data).orderByDescending(function (item) {
        return item;
    }).toArray();

    equal(result.length, 5);
    equal(result[0].getFullYear(), 2009);
    equal(result[1].getFullYear(), 1955);
    ok(!result[2]);
    ok(!result[3]);
    ok(!result[4]);
});

test("orderBy sorts strings and nulls", function () {
    var data = ["a", null, "b"];

    var result = new Query(data).orderBy(function (item) {
        return item;
    }).toArray();

    equal(result.length, 3);
    ok(!result[0]);
    equal(result[1], "a");
    equal(result[2], "b");
});

test("orderBy sorts negative numbers and zeros", function () {
    var data = [1, -2, 0, 3];

    var result = new Query(data).orderBy(function (item) {
        return item;
    }).toArray();

    equal(result.length, 4);
    equal(result[0], -2);
    equal(result[1], 0);
    equal(result[2], 1);
    equal(result[3], 3);
});

test("orderBy sorts multiple negative numbers and zeros", function () {
    var data = [1, -2, 0, -5];

    var result = new Query(data).orderBy(function (item) {
        return item;
    }).toArray();

    equal(result.length, 4);
    equal(result[0], -5);
    equal(result[1], -2);
    equal(result[2], 0);
    equal(result[3], 1);
});

test("orderBy sorts multiple negative numbers zeros and nulls", function () {
    var data = [1, -2, 0, null];

    var result = new Query(data).orderBy(function (item) {
        return item;
    }).toArray();

    equal(result.length, 4);
    equal(result[0], null);
    equal(result[1], -2);
    equal(result[2], 0);
    equal(result[3], 1);
});

test("orderBy sorts multiple negative numbers", function () {
    var data = [-2, -33, -5];

    var result = new Query(data).orderBy(function (item) {
        return item;
    }).toArray();

    equal(result.length, 3);
    equal(result[0], -33);
    equal(result[1], -5);
    equal(result[2], -2);
});

test("orderByDescending sorts numbers and nulls", function () {
    var data = [1, null, 0, 3];

    var result = new Query(data).orderByDescending(function (item) {
        return item;
    }).toArray();

    equal(result.length, 4);
    equal(result[3], null);
    equal(result[2], 0);
    equal(result[1], 1);
    equal(result[0], 3);
});

test("orderByDescending sorts negative numbers and zeros", function () {
    var data = [1, -2, 0, 3];

    var result = new Query(data).orderByDescending(function (item) {
        return item;
    }).toArray();

    equal(result.length, 4);
    equal(result[3], -2);
    equal(result[2], 0);
    equal(result[1], 1);
    equal(result[0], 3);
});

test("orderByDescending sorts multiple negative numbers and zeros", function () {
    var data = [1, -2, 0, -5];

    var result = new Query(data).orderByDescending(function (item) {
        return item;
    }).toArray();

    equal(result.length, 4);
    equal(result[3], -5);
    equal(result[2], -2);
    equal(result[1], 0);
    equal(result[0], 1);
});

test("orderByDescending sorts multiple negative numbers zeros and nulls", function () {
    var data = [1, -2, 0, null];

    var result = new Query(data).orderByDescending(function (item) {
        return item;
    }).toArray();

    equal(result.length, 4);
    equal(result[3], null);
    equal(result[2], -2);
    equal(result[1], 0);
    equal(result[0], 1);
});

test("orderByDescending sorts multiple negative numbers", function () {
    var data = [-2, -33, -5];

    var result = new Query(data).orderByDescending(function (item) {
        return item;
    }).toArray();

    equal(result.length, 3);
    equal(result[2], -33);
    equal(result[1], -5);
    equal(result[0], -2);
});


test("orderByDescending sorts numbers and nulls", function () {
    var data = [1, null, 0, 3];

    var result = new Query(data).orderByDescending(function (item) {
        return item;
    }).toArray();

    equal(result.length, 4);
    equal(result[0], 3);
    equal(result[1], 1);
    equal(result[2], 0);
    equal(result[3], null);
});

test("orderByDescending sorts strings and nulls", function () {
    var data = ["a", null, "b"];

    var result = new Query(data).orderByDescending(function (item) {
        return item;
    }).toArray();

    equal(result.length, 3);
    equal(result[0], "b");
    equal(result[1], "a");
    ok(!result[2]);
});

test("orderByDescending sorts dates earlier then 1970 and nulls", function () {
    var data = [new Date(1955, 1, 1), null, new Date(2009, 1, 1)];

    var result = new Query(data).orderByDescending(function (item) {
        return item;
    }).toArray();

    equal(result.length, 3);
    equal(result[0].getFullYear(), 2009);
    equal(result[1].getFullYear(), 1955);
    ok(!result[2]);
});

test("orderBy sorts booleans and nulls", function () {
    var data = [true, false, null, true];

    var result = new Query(data).orderBy(function (item) {
        return item;
    }).toArray();

    equal(result.length, 4);
    equal(result[0], null);
    equal(result[1], false);
    equal(result[2], true);
    equal(result[3], true);
});

test("orderByDescending sorts booleans and nulls", function () {
    var data = [true, false, null, false];

    var result = new Query(data).orderByDescending(function (item) {
        return item;
    }).toArray();

    equal(result.length, 4);
    equal(result[0], true);
    equal(result[1], false);
    equal(result[2], false);
    equal(result[3], null);
});

test("orderBy uses selector when sorting", function () {
    var data = [{ name: "foo" }, { name: "bar" }, { name: "foo"}];

    var result = new Query(data).orderBy(function (item) {
        return item.name;
    }).toArray();

    equal(result.length, 3);
    equal(result[0].name, "bar");
    equal(result[1].name, "foo");
    equal(result[2].name, "foo");
});

test("orderBy does not modify original", function () {
    var data = [3, 2, 1];

    new Query(data).orderBy(function (item) {
        return item.name;
    }).toArray();

    equal(data.length, 3);
    equal(data[0], 3);
    equal(data[1], 2);
    equal(data[2], 1);
});

test("orderby without parameters sorts array", function() {
    var data = new Query([3, 2, 1]).orderBy().toArray();

    equal(data.length, 3);
    equal(data[0], 1);
    equal(data[1], 2);
    equal(data[2], 3);

});
test("orderByDescending sorts numbers in descending order", function () {
    var data = [1, 100, 10];

    var result = new Query(data).orderByDescending(function (item) {
        return item;
    }).toArray();

    equal(result.length, 3);
    equal(result[0], 100);
    equal(result[1], 10);
    equal(result[2], 1);
});

test("orderByDescending sorts strings in descending order", function () {
    var data = ["foo", "bar", "baz"];

    var result = new Query(data).orderByDescending(function (item) {
        return item;
    }).toArray();

    equal(result.length, 3);
    equal(result[0], "foo");
    equal(result[1], "baz");
    equal(result[2], "bar");
});

test("orderByDescending sorts dates in descending order", function () {
    var data = [new Date(2011, 1, 1), new Date(2008, 1, 1), new Date(2009, 1, 1)];

    var result = new Query(data).orderByDescending(function (item) {
        return item;
    }).toArray();

    equal(result.length, 3);
    equal(result[0].getFullYear(), 2011);
    equal(result[1].getFullYear(), 2009);
    equal(result[2].getFullYear(), 2008);
});

test("orderByDescending uses selector when sorting", function () {
    var data = [{ name: "foo" }, { name: "bar" }, { name: "foo"}];

    var result = new Query(data).orderByDescending(function (item) {
        return item.name;
    })
    .toArray();

    equal(result.length, 3);
    equal(result[0].name, "foo");
    equal(result[1].name, "foo");
    equal(result[2].name, "bar");
});

test("orderByDescending does not modify original", function () {
    var data = [1, 2, 3];

    new Query(data).orderByDescending(function (item) {
        return item.name;
    });

    equal(data[0], 1);
    equal(data[1], 2);
    equal(data[2], 3);
});

test("sort using ascending descriptor", function () {
    var data = [{ name: "foo" }, { name: "bar" }, { name: "foo"}];

    var result = new Query(data).sort( { field: "name", dir: "asc" }).toArray();

    equal(result.length, 3);
    equal(result[0].name, "bar");
    equal(result[1].name, "foo");
    equal(result[2].name, "foo");
});

test("sorting nested objects", function() {
    var  data = [{ foo: { age: 1 } }, { foo : { age: 2 } }]

    var result = new Query(data).sort({ field: "foo.age", dir: "desc" }).toArray();

    equal(result[0].foo.age, 2);
});

test("sort ignores direction case", function () {
    var data = [{ name: "foo" }, { name: "bar" }, { name: "foo"}];

    var result = new Query(data).sort( { field: "name", dir: "Asc" }).toArray();

    equal(result.length, 3);
    equal(result[0].name, "bar");
    equal(result[1].name, "foo");
    equal(result[2].name, "foo");
});

test("sort using descending descriptor", function () {
    var data = [{ name: "foo" }, { name: "bar" }, { name: "foo"}];

    var result = new Query(data).sort( { field: "name", dir: "desc" }).toArray();

    equal(result.length, 3);
    equal(result[0].name, "foo");
    equal(result[1].name, "foo");
    equal(result[2].name, "bar");
});

test("orderBy using custom comparer", function() {
    var data = [{ name: "foo" }, { name: "bar" }, { name: "foo"}];

    var result = new Query(data).orderBy({
        compare: function(a, b){
            return a.name > b.name ? 1 : (a.name < b.name ? -1 : 0);
        }
    }).toArray();

    equal(result.length, 3);
    equal(result[0].name, "bar");
    equal(result[1].name, "foo");
    equal(result[2].name, "foo");
});

test("ascending sort using custom comparer", function() {
    var data = [{ name: "foo" }, { name: "bar" }, { name: "foo"}];

    var result = new Query(data).sort({
        dir: "asc",
        compare: function(a, b){
            return a.name > b.name ? 1 : (a.name < b.name ? -1 : 0);
        }
    }).toArray();

    equal(result.length, 3);
    equal(result[0].name, "bar");
    equal(result[1].name, "foo");
    equal(result[2].name, "foo");
});

test("descending sort using custom comparer", function() {
    var data = [{ name: "foo" }, { name: "bar" }, { name: "foo"}];

    var result = new Query(data).sort({
        dir: "desc",
        compare: function(a, b){
            return a.name > b.name ? 1 : (a.name < b.name ? -1 : 0);
        }
    }).toArray();

    equal(result.length, 3);
    equal(result[0].name, "foo");
    equal(result[1].name, "foo");
    equal(result[2].name, "bar");
});

test("sort using multiple descriptors", function () {
    var data = [{ name: "foo", age: 42 }, { name: "bar", age: 36 }, { name: "foo", age: 15 }];

    var result = new Query(data).sort( [ { field: "name", dir: "desc" }, { field: "age", dir: "asc" } ]).toArray();

    equal(result.length, 3);
    equal(result[0].name, "foo");
    equal(result[0].age, 15);
    equal(result[1].name, "foo");
    equal(result[1].age, 42);
    equal(result[2].name, "bar");
    equal(result[2].age, 36);
});
test("sort using two strings as arguments", function() {
    var data = [{ name: "foo" }, { name: "bar" }, { name: "foo"}];

    var result = new Query(data).sort("name", "asc").toArray();

    equal(result.length, 3);
    equal(result[0].name, "bar");
    equal(result[1].name, "foo");
    equal(result[2].name, "foo");
});

test("filter isempty on string", function() {
    var data = [{ name: "" }, { name: "bar" }, { name: "foo"}];

    var result = new Query(data).filter({ field: "name", operator: "isempty" }).toArray();

    equal(result.length, 1);
});

test("filter isnotempty on string", function() {
    var data = [{ name: "" }, { name: "bar" }, { name: "foo"}];

    var result = new Query(data).filter({ field: "name", operator: "isnotempty" }).toArray();

    equal(result.length, 2);
});

test("filter isnotnull on null string", function() {
    var data = [{ name: null }, { name: "bar" }, { name: "foo"}];

    var result = new Query(data).filter({ field: "name", operator: "isnotnull" }).toArray();

    equal(result.length, 2);
});

test("filter isnotnull on undefined string", function() {
    var data = [{ name: undefined }, { name: "bar" }, { name: "foo"}];

    var result = new Query(data).filter({ field: "name", operator: "isnotnull" }).toArray();

    equal(result.length, 2);
});

test("filter isnotnull on 0", function() {
    var data = [{ name: 0 }, { name: "bar" }, { name: "foo"}];

    var result = new Query(data).filter({ field: "name", operator: "isnotnull" }).toArray();

    equal(result.length, 3);
});

test("filter isnull on 0", function() {
    var data = [{ name: 0 }, { name: "bar" }, { name: "foo"}];

    var result = new Query(data).filter({ field: "name", operator: "isnull" }).toArray();

    equal(result.length, 0);
});

test("filter isnull on null string", function() {
    var data = [{ name: null }, { name: "bar" }, { name: "foo"}];

    var result = new Query(data).filter({ field: "name", operator: "isnull" }).toArray();

    equal(result.length, 1);
});

test("filter isnull on undefined string", function() {
    var data = [{ name: undefined }, { name: "bar" }, { name: "foo"}];

    var result = new Query(data).filter({ field: "name", operator: "isnull" }).toArray();

    equal(result.length, 1);
});

test("filter on null string", function() {
    var data = [{ name: null }, { name: "bar" }, { name: "foo"}];

    var result = new Query(data).filter({ field: "name", operator: "eq", value: "foo" }).toArray();

    equal(result.length, 1);
});

test("filter on null string with startwith", function() {
    var data = [{ name: null }, { name: "bar" }, { name: "foo"}];
    var result = new Query(data).filter({ field: "name", operator: "startswith", value: "foo", ignoreCase: true }).toArray();

    equal(result.length, 1);
});

test("filter on null string with endswith", function() {
    var data = [{ name: null }, { name: "bar" }, { name: "foo"}];
    var result = new Query(data).filter({ field: "name", operator: "endswith", value: "foo", ignoreCase: true }).toArray();

    equal(result.length, 1);
});


test("filter with empty expression", function() {
    var data = [{ name: "foo" }, { name: "bar" }, { name: "foo"}];

    var result = new Query(data).filter(null).toArray();

    equal(result.length, 3);
});

test("filter contains with apostrophe", function() {
    var data = [{ name: "f'oo" } ];

    var result = new Query(data).filter({field: "name", value: "'", operator: "contains"}).toArray();

    equal(result.length, 1);
});

test("filter with slash", function() {
    var data = [{ name: "f\\oo" } ];

    var result = new Query(data).filter({field: "name", value: "\\", operator: "contains"}).toArray();

    equal(result.length, 1);
});

test("filter with apostrophe", function() {
    var data = [{ name: "f'oo" } ];

    var result = new Query(data).filter({field: "name", value: "f'oo"}).toArray();

    equal(result.length, 1);
});

test("filter with empty filters", function() {
    var data = [{ name: "foo" }, { name: "bar" }, { name: "foo"}];

    var result = new Query(data).filter({ filters:[] }).toArray();

    equal(result.length, 3);
});

test("filter filters on numbers", function() {
    var data = [ {field: 100} , {field: 10} , {field: 1} ];

    var result = new Query(data).filter( {
        field: "field",
        operator: "eq",
        value: 1
    }).toArray();

    equal(result.length, 1);
    equal(result[0].field, 1);
});

test("filter filters with field as a function", function() {
    var data = [ 100, 10, 1 ];
    var fieldFunctionWasCalled = false;

    var result = new Query(data).filter( {
        field: function(item) {
            fieldFunctionWasCalled = true;
            return item;
        },
        operator: "eq",
        value: 1
    }).toArray();

    ok(fieldFunctionWasCalled);
    equal(result.length, 1);
    equal(result[0], 1);
});

test("filter filters with operator as a function", function() {
    var data = [ {field: 100} , {field: 10} , {field: 1} ];

    var result = new Query(data).filter( {
        field: "field",
        operator: function(d, value) {
            return d === value;
        },
        value: 1
    }).toArray();

    equal(result.length, 1);
    equal(result[0].field, 1);
});

test("filter filters on dates", function () {
    var data = [new Date(2011, 1, 1), new Date(2008, 1, 1), new Date(2009, 1, 1)];

    var result = new Query(data).filter( {
        field: function(item) {
            return item;
        },
        operator: "eq",
        value: new Date(2011, 1, 1)
    }).toArray();

    equal(result.length, 1);
    equal(result[0].getFullYear(), 2011);
});

test("filter filters on nullable dates", function () {
    var data = [new Date(2011, 1, 1), null, new Date(2009, 1, 1)];

    var result = new Query(data).filter( {
        field: function(item) {
            return item;
        },
        operator: "eq",
        value: new Date(2011, 1, 1)
    }).toArray();

    equal(result.length, 1);
    equal(result[0].getFullYear(), 2011);
});

test("filter with date filters out strings and numbers", function() {
    var data = [new Date(2011, 1, 1), "foo", 42];

    var result = new Query(data).filter( {
        field: function(item) {
            return item;
        },
        operator: "eq",
        value: new Date(2011, 1, 1)
    }).toArray();

    equal(result.length, 1);
    equal(result[0].getFullYear(), 2011);
});

test("filter with string filters out numbers", function() {
    var data = ["foo", 42];

    var result = new Query(data).filter( {
        field: function(item) {
            return item;
        },
        operator: "eq",
        value: "foo",
        ignoreCase: true
    }).toArray();

    equal(result.length, 1);
    equal(result[0], "foo");
});

test("filter with 'null' as string does not match null", function() {
    var data = [null];

    var result = new Query(data).filter( {
        field: function(item) {
            return item;
        },
        operator: "eq",
        value: "null",
        ignoreCase: true
    }).toArray();

    equal(result.length, 0);
});

test("filter filters without passing operator defaults to eq", function() {
    var data = [ {field: 100} , {field: 10} , {field: 1} ];

    var result = new Query(data).filter( {
        field: "field",
        value: 1
    }).toArray();

    equal(result.length, 1);
    equal(result[0].field, 1);
});

test("filter filters if passing operator allias", function() {
    var data = [ {field: 100} , {field: 10} , {field: 1} ];

    var result = new Query(data).filter( {
        field: "field",
        operator: "==",
        value: 1
    }).toArray();

    equal(result.length, 1);
    equal(result[0].field, 1);
});

test("filter filters with neq", function() {
    var data = [ {field: 100} , {field: 10} , {field: 1} ];

    var result = new Query(data).filter( {
        field: "field",
        operator: "neq",
        value: 1
    }).toArray();

    equal(result.length, 2);
    equal(result[0].field, 100);
    equal(result[1].field, 10);
});

test("filter filters with ne", function() {
    var data = [ {field: 100} , {field: 10} , {field: 1} ];

    var result = new Query(data).filter( {
        field: "field",
        operator: "ne",
        value: 1
    }).toArray();

    equal(result.length, 2);
    equal(result[0].field, 100);
    equal(result[1].field, 10);
});

test("filter filters with lt", function() {
    var data = [ {field: 100} , {field: 10} , {field: 1} ];

    var result = new Query(data).filter( {
        field: "field",
        operator: "lt",
        value: 100
    }).toArray();

    equal(result.length, 2);
    equal(result[0].field, 10);
    equal(result[1].field, 1);
});

test("filter filters with le", function() {
    var data = [ {field: 100} , {field: 10} , {field: 1} ];

    var result = new Query(data).filter( {
        field: "field",
        operator: "le",
        value: 10
    }).toArray();

    equal(result.length, 2);
    equal(result[0].field, 10);
    equal(result[1].field, 1);
});

test("filter filters with lte", function() {
    var data = [ {field: 100} , {field: 10} , {field: 1} ];

    var result = new Query(data).filter( {
        field: "field",
        operator: "lte",
        value: 10
    }).toArray();

    equal(result.length, 2);
    equal(result[0].field, 10);
    equal(result[1].field, 1);
});

test("filter filters with gt", function() {
    var data = [ {field: 100} , {field: 10} , {field: 1} ];

    var result = new Query(data).filter( {
        field: "field",
        operator: "gt",
        value: 10
    }).toArray();

    equal(result.length, 1);
    equal(result[0].field, 100);
});

test("filter filters with gte", function() {
    var data = [ {field: 100} , {field: 10} , {field: 1} ];

    var result = new Query(data).filter( {
        field: "field",
        operator: "gte",
        value: 10
    }).toArray();

    equal(result.length, 2);
    equal(result[0].field, 100);
    equal(result[1].field, 10);
});

test("filter filters with ge", function() {
    var data = [ {field: 100} , {field: 10} , {field: 1} ];

    var result = new Query(data).filter( {
        field: "field",
        operator: "ge",
        value: 10
    }).toArray();

    equal(result.length, 2);
    equal(result[0].field, 100);
    equal(result[1].field, 10);
});

test("filter filters with eq on string", function() {
    var data = [ {field: "a"} , {field: "b"} , {field: "c"} ];

    var result = new Query(data).filter( {
        field: "field",
        operator: "eq",
        value: "c"
    }).toArray();

    equal(result.length, 1);
    equal(result[0].field, "c");
});

test("filter filters with startswith on string", function() {
    var data = [ {field: "abc"} , {field: "bcd"} , {field: "cde"} ];

    var result = new Query(data).filter( {
        field: "field",
        operator: "startswith",
        value: "c"
    }).toArray();

    equal(result.length, 1);
    equal(result[0].field, "cde");
});

test("filter filters with endswith on undefined", function() {
    var data = [ {field: "abc"} , {field: "bcd"} , {field: "cde"} ];

    var result = new Query(data).filter( {
        field: "field",
        operator: "endswith",
        value: undefined
    }).toArray();

    equal(result.length, 0);
});

test("filter filters with endswith on string", function() {
    var data = [ {field: "abc"} , {field: "bcd"} , {field: "cde"} ];

    var result = new Query(data).filter( {
        field: "field",
        operator: "endswith",
        value: "c"
    }).toArray();

    equal(result.length, 1);
    equal(result[0].field, "abc");
});

test("filter filters with endswith on multiple letters string", function() {
    var data = [ {field: "abc"} , {field: "bcd"} , {field: "cde"} ];

    var result = new Query(data).filter( {
        field: "field",
        operator: "endswith",
        value: "de"
    }).toArray();

    equal(result.length, 1);
    equal(result[0].field, "cde");
});

test("filter filters with contains on string", function() {
    var data = [ {field: "abc"} , {field: "bcd"} , {field: "cde"} ];

    var result = new Query(data).filter( {
        field: "field",
        operator: "contains",
        value: "b"
    }).toArray();

    equal(result.length, 2);
    equal(result[0].field, "abc");
    equal(result[1].field, "bcd");
});

test("filter filters with doesnotcontain on string", function() {
    var data = [ {field: "abc"} , {field: "bcd"} , {field: "cde"} ];

    var result = new Query(data).filter( {
        field: "field",
        operator: "doesnotcontain",
        value: "a"
    }).toArray();

    equal(result.length, 2);
    equal(result[0].field, "bcd");
    equal(result[1].field, "cde");
});

test("filter filters with notsubstringof on string", function() {
    var data = [ {field: "abc"} , {field: "bcd"} , {field: "cde"} ];

    var result = new Query(data).filter( {
        field: "field",
        operator: "notsubstringof",
        value: "a"
    }).toArray();

    equal(result.length, 2);
    equal(result[0].field, "bcd");
    equal(result[1].field, "cde");
});

test("filter filters with eq on string case sensitive", function() {
    var data = [ {field: "a"} , {field: "b"} , {field: "c"}, {field: "A"} ];

    var result = new Query(data).filter( {
        field: "field",
        operator: "eq",
        value: "A",
        ignoreCase: false
    }).toArray();

    equal(result.length, 1);
    equal(result[0].field, "A");
});

test("filter filters with contains on string case sensitive", function() {
    var data = [ {field: "abc"} , {field: "Bcd"}];

    var result = new Query(data).filter( {
        field: "field",
        operator: "contains",
        value: "B",
        ignoreCase: false
    }).toArray();

    equal(result.length, 1);
    equal(result[0].field, "Bcd");
});

test("filter with multiple expressions", function() {
    var data = [ {field: 100} , {field: 10} , {field: 1} ];

    var result = new Query(data).filter( [{
        field: "field",
        operator: "gte",
        value: 1
    },
    {
        field: "field",
        operator: "lt",
        value: 100
    }]).toArray();

    equal(result.length, 2);
    equal(result[0].field, 10);
    equal(result[1].field, 1);
});

test("filter with and expression", function() {
    var data = [100, 10, 1];

    var result = new Query(data).filter( {
        logic: "and",
        filters: [
            { operator: "gt", value: 1 },
            { operator: "lt", value: 100 }
        ]
    }).toArray();

    equal(result.length, 1);
    equal(result[0], 10);
});

test("filter with or expression", function() {
    var data = [100, 10, 1];

    var result = new Query(data).filter( {
        logic: "or",
        filters: [
            { operator: "eq", value: 1 },
            { operator: "eq", value: 100 }
        ]
    }).toArray();

    equal(result.length, 2);
    equal(result[0], 100);
    equal(result[1], 1);
});

test("filter with nested expression", function() {
    var data = [100, 10, 1];

    var result = new Query(data).filter( {
        logic: "or",
        filters: [
            {
                logic: "and",
                filters: [ { operator: "gt", value: 1 }, { operator: "lt", value: 100 } ]
            },
            {
                operator: "eq",
                value: 100
            }
        ]
    }).toArray();

    equal(result.length, 2);
    equal(result[0], 100);
    equal(result[1], 10);
});

test("filter with nested or expression", function() {
    var data = [100, 10, 1];

    var result = new Query(data).filter( {
        logic: "or",
        filters: [
            {
                logic: "and",
                filters: [ { operator: "gt", value: 1 }, { operator: "lt", value: 100 } ]
            },
            {
                operator: "eq",
                value: 100
            }
        ]
    }).toArray();

    equal(result.length, 2);
    equal(result[0], 100);
    equal(result[1], 10);
});

test("filter with nested and expression", function() {
    var data = [100, 10, 1];

    var result = new Query(data).filter( {
        logic: "and",
        filters: [
            {
                logic: "or",
                filters: [ { operator: "eq", value: 100 }, { operator: "eq", value: 10 } ]
            },
            {
                operator: "gt",
                value: 1
            }
        ]
    }).toArray();

    equal(result.length, 2);
    equal(result[0], 100);
    equal(result[1], 10);
});

test("filter without specifying field fields array", function() {
    var data = [100, 10, 1];

    var result = new Query(data).filter( {
        operator: "gte",
        value: 10
    }).toArray();

    equal(result.length, 2);
    equal(result[0], 100);
    equal(result[1], 10);
});

test("filter on nested objects", function () {
    var data = [{foo: { bar: 1 }}];

    var result = new Query(data).filter( {
        operator: "gte",
        field: "foo.bar",
        value: 1
    }).toArray();

    equal(result.length, 1);
    equal(result[0].foo.bar, 1);
});

test("filter on dotnet date literals", function () {
    var firstDate = new Date(1996, 11, 9);
    var data = [{ bar: firstDate },{ bar: new Date(1996, 11, 12)}];


    var result = new Query(data).filter( {
        operator: "eq",
        field: "bar",
        value: "/Date(" + firstDate.getTime() + ")/"
    }).toArray();

    equal(result.length, 1);
    equal(result[0].bar.getTime(), firstDate.getTime());
});

test("filter on nested nullable objects", function () {
    var data = [{foo: { bar: 1 }}, {foo: { bar: undefined }}];

    var result = new Query(data).filter( {
        operator: "gte",
        field: "foo.bar",
        value: 1
    }).toArray();

    equal(result.length, 1);
    equal(result[0].foo.bar, 1);
});

test("groupby groups data by field", function() {
    var data = [ {field: 100} , {field: 100} , {field: 1} ];

    var result = new Query(data).groupBy( {
        field: "field"
    }).toArray();
    equal(result.length, 2);
    equal(result[0].value, 1);
    equal(result[0].field, "field");
    equal(result[0].items.length, 1);
    equal(result[1].value, 100);
    equal(result[1].field, "field");
    equal(result[1].items.length, 2);
});

test("groupby should be stable", function() {
    var data = [{foo:1, bar:1},{foo:2, bar:1},{foo:3, bar:1},{foo:4, bar:1},{foo:5, bar:1},
        {foo:6, bar:1},{foo:7, bar:1},{foo:8, bar:1},{foo:9, bar:1},{foo:0, bar:1},{foo:11, bar:1}];

    var result = new Query(data)
        .sort([ { field: "foo", dir: "asc" }, {field:"bar", dir:"asc" }])
        .groupBy( {
            field: "bar"
        }).toArray();

    equal(result.length, 1);
    equal(result[0].items.length, 11);
    equal(result[0].items[0].foo, 0);
    equal(result[0].items[1].foo, 1);
});

test("descending groupby should be stable", function() {
    var data = [{foo:1, bar:1},{foo:2, bar:1},{foo:3, bar:1},{foo:4, bar:1},{foo:5, bar:1},
        {foo:6, bar:1},{foo:7, bar:1},{foo:8, bar:1},{foo:9, bar:1},{foo:0, bar:1},{foo:11, bar:1}];

    var result = new Query(data)
        .sort([ { field: "foo", dir: "desc" }, {field:"bar", dir:"desc" }])
        .groupBy( {
            field: "bar", dir: "desc"
        }).toArray();

    equal(result.length, 1);
    equal(result[0].items.length, 11);
    equal(result[0].items[0].foo, 11);
    equal(result[0].items[1].foo, 9);
});

test("groupby on dates should be stable", function() {
    var data = [{foo:1, bar: new Date(1999, 1, 1)},{foo:2, bar: new Date(1999, 1,1)},{foo:3, bar: new Date(1999, 1,1)},{foo:4, bar: new Date(1999, 1,1)},{foo:5, bar: new Date(1999, 1,1)}, {foo:6, bar: new Date(1999, 1,1)},{foo:7, bar: new Date(1999, 1,1)},{foo:8, bar: new Date(1999, 1,1)},{foo:9, bar: new Date(1999, 1,1)},{foo:0, bar: new Date(1999, 1,1)},{foo:11, bar: new Date(1999, 1,1)}];

    var result = new Query(data)
        .sort([ { field: "foo", dir: "asc" }])
        .groupBy( {
            field: "bar"
        }).toArray();

    equal(result.length, 1);
    equal(result[0].items.length, 11);
    equal(result[0].items[0].foo, 0);
    equal(result[0].items[1].foo, 1);
});

test("groupby on dates with descending sort should be stable", function() {
    var data = [{foo:11, bar: new Date(1999, 1, 1)},{foo:10, bar: new Date(1999, 1,1)},{foo:9, bar: new Date(1999, 1,1)},{foo:8, bar: new Date(1999, 1,1)},{foo:7, bar: new Date(1999, 1,1)}, {foo:6, bar: new Date(1999, 1,1)},{foo:5, bar: new Date(1999, 1,1)},{foo:4, bar: new Date(1999, 1,1)},{foo:3, bar: new Date(1999, 1,1)},{foo:2, bar: new Date(1999, 1,1)},{foo:1, bar: new Date(1999, 1,1)}];

    var result = new Query(data)
        .sort([ { field: "foo", dir: "desc" }])
        .groupBy( {
            field: "bar", dir: "desc"
        }).toArray();

    equal(result.length, 1);
    equal(result[0].items.length, 11);
    equal(result[0].items[0].foo, 11);
    equal(result[0].items[1].foo, 10);
    equal(result[0].items[2].foo, 9);
    equal(result[0].items[3].foo, 8);
    equal(result[0].items[4].foo, 7);
    equal(result[0].items[5].foo, 6);
    equal(result[0].items[6].foo, 5);
    equal(result[0].items[7].foo, 4);
    equal(result[0].items[8].foo, 3);
    equal(result[0].items[9].foo, 2);
    equal(result[0].items[10].foo, 1);
});


test("groupby groups data by date", function() {
    var data = [ {field: new Date(2011, 1, 1)} , {field: new Date(2011, 2, 2) } , {field: new Date(2011, 1, 1) } ];

    var result = new Query(data).groupBy( {
        field: "field"
    }).toArray();

    equal(result.length, 2);
    equal(result[0].items.length, 2);
    equal(result[0].value.getTime(), new Date(2011, 1, 1).getTime());
    equal(result[1].items.length, 1);
    equal(result[1].value.getTime(), new Date(2011, 2, 2).getTime());
});

test("groupby returns ungroup collection if no descriptors are provided", function() {
    var data = [ {field: 100} , {field: 100} , {field: 1} ];

    var result = new Query(data).group( ).toArray();
    equal(result, data);
});

test("groupby groups data by field and direction", function() {
    var data = [ {field: 100} , {field: 100} , {field: 1} ];

    var result = new Query(data).group( [{
        field: "field",
        dir: "desc"
    }]).toArray();
    equal(result.length, 2);
    equal(result[1].value, 1);
    equal(result[1].field, "field");
    equal(result[1].items.length, 1);
    equal(result[0].value, 100);
    equal(result[0].field, "field");
    equal(result[0].items.length, 2);
});

test("groupby groups data by multiple fields", function() {
    var data = [ {foo: 100, bar: "baz"} , {foo: 100, bar: "bar"} , {foo: 1, bar: "baz"} ],
        firstGroup,
        secondGroup;

    var result = new Query(data).group( [{ field: "foo" }, { field: "bar" }]).toArray();

    equal(result.length, 2);
    firstGroup = result[0];
    secondGroup = result[1];

    equal(firstGroup.value, 1);
    equal(firstGroup.field, "foo");
    equal(firstGroup.items.length, 1);
    equal(firstGroup.items[0].value, "baz");
    equal(firstGroup.items[0].field, "bar");
    equal(firstGroup.items[0].items.length, 1);
    equal(secondGroup.value, 100);
    equal(secondGroup.field, "foo");
    equal(secondGroup.items.length, 2);
    equal(secondGroup.items[0].value, "bar");
    equal(secondGroup.items[0].field, "bar");
    equal(secondGroup.items[0].items.length, 1);
    equal(secondGroup.items[1].value, "baz");
    equal(secondGroup.items[1].field, "bar");
    equal(secondGroup.items[1].items.length, 1);
});

test("group by nullable string with more than 10 items", function() {
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

    equal(result.length, 2);

    equal(result[0].field, "bar");
    equal(result[0].value, null);
    equal(result[0].items.length, 6);

    equal(result[1].field, "bar");
    equal(result[1].value, "foo");
    equal(result[1].items.length, 7);
});

test("group by nullable string with more than 10 items descending", function() {
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

    equal(result.length, 2);

    equal(result[0].field, "bar");
    equal(result[0].value, "foo");
    equal(result[0].items.length, 7);

    equal(result[1].field, "bar");
    equal(result[1].value, null);
    equal(result[1].items.length, 6);
});

test("group by nullable boolean with more than 10 items", function() {
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

    equal(result.length, 3);

    equal(result[0].field, "bar");
    equal(result[0].value, null);
    equal(result[0].items.length, 6);

    equal(result[1].field, "bar");
    equal(result[1].value, false);
    equal(result[1].items.length, 3);

    equal(result[2].field, "bar");
    equal(result[2].value, true);
    equal(result[2].items.length, 4);
});

test("group by nullable boolean with more than 10 items descending", function() {
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

    equal(result.length, 3);

    equal(result[0].field, "bar");
    equal(result[0].value, true);
    equal(result[0].items.length, 4);

    equal(result[1].field, "bar");
    equal(result[1].value, false);
    equal(result[1].items.length, 3);

    equal(result[2].field, "bar");
    equal(result[2].value, null);
    equal(result[2].items.length, 6);
});

test("group by nullable int with more than 10 items", function() {
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

    equal(result.length, 3);

    equal(result[0].field, "bar");
    equal(result[0].value, null);
    equal(result[0].items.length, 6);

    equal(result[1].field, "bar");
    equal(result[1].value, 0);
    equal(result[1].items.length, 3);

    equal(result[2].field, "bar");
    equal(result[2].value, 1);
    equal(result[2].items.length, 4);
});

test("group by nullable int with more than 10 items descending", function() {
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

    equal(result.length, 3);

    equal(result[0].field, "bar");
    equal(result[0].value, 1);
    equal(result[0].items.length, 4);

    equal(result[1].field, "bar");
    equal(result[1].value, 0);
    equal(result[1].items.length, 3);

    equal(result[2].field, "bar");
    equal(result[2].value, null);
    equal(result[2].items.length, 6);
});


test("groupby groups data by multiple fields with 3 levels", function() {
    var data = [ {foo: 100, bar: "baz", baz: "baz"} , {foo: 100, bar: "bar", baz: "baz"} , {foo: 1, bar: "baz", baz: "baz"} ],
        firstGroup,
        secondGroup;

    var result = new Query(data).group( [{ field: "foo" }, { field: "bar" },{ field: "baz" }]).toArray();
    equal(result.length, 2);
    firstGroup = result[0];
    secondGroup = result[1];

    equal(firstGroup.value, 1);
    equal(firstGroup.field, "foo");
    equal(firstGroup.items.length, 1);
    equal(firstGroup.items[0].value, "baz");
    equal(firstGroup.items[0].field, "bar");
    equal(firstGroup.items[0].items.length, 1);

    equal(firstGroup.value, 1);
    equal(firstGroup.field, "foo");
    equal(firstGroup.items.length, 1);
    equal(firstGroup.items[0].items[0].value, "baz");
    equal(firstGroup.items[0].items[0].field, "baz");
    equal(firstGroup.items[0].items[0].items.length, 1);

    equal(secondGroup.value, 100);
    equal(secondGroup.field, "foo");
    equal(secondGroup.items.length, 2);

    equal(secondGroup.items[0].value, "bar");
    equal(secondGroup.items[0].field, "bar");
    equal(secondGroup.items[0].items.length, 1);
    equal(secondGroup.items[1].value, "baz");
    equal(secondGroup.items[1].field, "bar");
    equal(secondGroup.items[1].items.length, 1);

});

test("group by nullable boolean", function() {
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

    equal(result.length, 3);

    equal(result[0].field, "bar");
    equal(result[0].value, null);
    equal(result[0].items.length, 1);

    equal(result[1].field, "bar");
    equal(result[1].value, false);
    equal(result[1].items.length, 2);

    equal(result[2].field, "bar");
    equal(result[2].value, true);
    equal(result[2].items.length, 1);
});

test("sort desc when group by nullable boolean", function() {
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

    equal(result.length, 1);

    equal(result[0].field, "bar");
    equal(result[0].value, null);
    equal(result[0].items.length, 2);

    equal(result[0].items[0].foo, 2);
    equal(result[0].items[1].foo, 1);
});

test("sort asc when group by nullable boolean", function() {
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

    equal(result.length, 1);

    equal(result[0].field, "bar");
    equal(result[0].value, null);
    equal(result[0].items.length, 2);

    equal(result[0].items[0].foo, 1);
    equal(result[0].items[1].foo, 2);
});

test("sort asc by nullable string with more than 10 items", function() {
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

    equal(result[0].bar, null);
    equal(result[1].bar, null);
    equal(result[2].bar, null);
    equal(result[3].bar, null);
    equal(result[4].bar, null);
    equal(result[5].bar, null);
    equal(result[6].bar, "foo");
    equal(result[7].bar, "foo");
    equal(result[8].bar, "foo");
    equal(result[9].bar, "foo");
    equal(result[10].bar, "foo");
    equal(result[11].bar, "foo");
    equal(result[12].bar, "foo");
});

test("sort desc by nullable string with more than 10 items", function() {
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

    equal(result[0].bar, "foo");
    equal(result[1].bar, "foo");
    equal(result[2].bar, "foo");
    equal(result[3].bar, "foo");
    equal(result[4].bar, "foo");
    equal(result[5].bar, "foo");
    equal(result[6].bar, "foo");

    equal(result[7].bar, null);
    equal(result[8].bar, null);
    equal(result[9].bar, null);
    equal(result[10].bar, null);
    equal(result[11].bar, null);
    equal(result[12].bar, null);
});

test("sort desc by nullable string with more than 10 items", function() {
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

    equal(result[0].bar, "foo");
    equal(result[1].bar, "foo");
    equal(result[2].bar, "foo");
    equal(result[3].bar, "foo");
    equal(result[4].bar, "foo");
    equal(result[5].bar, "foo");
    equal(result[6].bar, "foo");

    equal(result[7].bar, null);
    equal(result[8].bar, null);
    equal(result[9].bar, null);
    equal(result[10].bar, null);
    equal(result[11].bar, null);
    equal(result[12].bar, null);
});


test("group aggregates are calculated if provided", function() {
    var data = [ {foo: 100, bar: "baz"} , {foo: 100, bar: "bar"} , {foo: 1, bar: "baz"} ];

    var result = new Query(data).group( [{ field: "foo", aggregates: [{ field: "foo", aggregate: "sum" }] }]).toArray();

    equal(result.length, 2);

    equal(result[0].aggregates["foo"].sum, 1);
    equal(result[1].aggregates["foo"].sum, 200);
});

test("group aggregates are caseinsensitive", function() {
    var data = [ {foo: 100, bar: "baz"} , {foo: 100, bar: "bar"} , {foo: 1, bar: "Baz"} ];

    var result = new Query(data).group( [{ field: "bar", aggregates: [{ field: "foo", aggregate: "sum" }] }]).toArray();

    equal(result.length, 3);

    equal(result[0].aggregates["foo"].sum, 100);
    equal(result[1].aggregates["foo"].sum, 100);
    equal(result[2].aggregates["foo"].sum, 1);
});

test("group aggregates are calculated  for multiple fields if provided", function() {
    var data = [ {foo: 100, bar: "baz"} , {foo: 100, bar: "bar"} , {foo: 1, bar: "baz"} ];

    var result = new Query(data).group( [{ field: "foo", aggregates: [{ field: "foo", aggregate: "sum" }, { field: "bar", aggregate: "count" }] }]).toArray();

    equal(result.length, 2);

    equal(result[0].aggregates["foo"].sum, 1);
    equal(result[1].aggregates["foo"].sum, 200);
    equal(result[0].aggregates["bar"].count, 1);
    equal(result[1].aggregates["bar"].count, 2);
});

test("group aggregates are calculated for multiple group levels", function() {
    var data = [ {foo: 100, bar: "baz"} , {foo: 100, bar: "bar"} , {foo: 1, bar: "baz"} ];

    var result = new Query(data).group( [
        { field: "foo", aggregates: [{ field: "foo", aggregate: "sum" }] },
        { field: "bar", aggregates: [{ field: "foo", aggregate: "sum" }]}
    ]).toArray();

    equal(result.length, 2);

    equal(result[0].aggregates["foo"].sum, 1);
    equal(result[0].items[0].aggregates["foo"].sum, 1);
    equal(result[1].aggregates["foo"].sum, 200);
    equal(result[1].items[0].aggregates["foo"].sum, 100);
    equal(result[1].items[1].aggregates["foo"].sum, 100);
});

test("group aggregates with multiple group levels and paging original data is required", function() {
    var data = [ {foo: 100, bar: "baz"} , {foo: 100, bar: "bar"} , {foo: 1, bar: "baz"} ];

    var result = new Query(data).skip(1).take(1).group( [
        { field: "foo", aggregates: [{ field: "foo", aggregate: "sum" }] },
        { field: "bar", aggregates: [{ field: "foo", aggregate: "sum" }]}
    ], data).toArray();

    equal(result.length, 1);

    equal(result[0].aggregates["foo"].sum, 200);
    equal(result[0].items[0].aggregates["foo"].sum, 100);
});

test("aggregate calculates aggregates for a collection", function() {
    var data = [ {foo: 100, bar: "baz"} , {foo: 100, bar: "bar"} , {foo: 1, bar: "baz"} ];

    var result = new Query(data).aggregate( [{ field: "foo", aggregate: "sum" }, { field: "bar", aggregate: "count" }] );

    equal(result.foo.sum, 201);
    equal(result.bar.count, 3);
});

test("aggregate returns empty object if no descriptor are provided", function() {
    var data = [ {foo: 100, bar: "baz"} , {foo: 100, bar: "bar"} , {foo: 1, bar: "baz"} ];

    var result = new Query(data).aggregate();

    ok(result);
});

test("aggregate returns empty object if collection is empty", function() {
    var data = [ ];

    var result = new Query(data).aggregate([{ field: "foo", aggregate: "sum" }, { field: "bar", aggregate: "count" }]);

    ok(result);
});

test("aggregate max returns max value for a given field", function() {
    var data = [ {foo: 100, bar: "baz"} , {foo: 100, bar: "bar"} , {foo: 1, bar: "baz"} ];

    var result = new Query(data).aggregate( [{ field: "foo", aggregate: "max" }] );

    equal(result.foo.max, 100);
});

test("aggregate average return null if data is null", function() {
    var data = [ {foo: null, bar: "baz"} , {foo: null, bar: "bar"} , {foo: null, bar: "baz"} ];

    var result = new Query(data).aggregate( [{ field: "foo", aggregate: "average" }] );

    equal(result.foo.average, null);
});

test("aggregate average skips null values", function() {
    var data = [ {foo: null, bar: "baz"}, {foo: 10, bar: "bar"} ];

    var result = new Query(data).aggregate( [{ field: "foo", aggregate: "average" }] );

    equal(result.foo.average, 10);
});

test("aggregate average skips null values but calculates zeros", function() {
    var data = [ {foo: null, bar: "baz"}, {foo: 10, bar: "bar"}, {foo: 0, bar: "bar"} ];

    var result = new Query(data).aggregate( [{ field: "foo", aggregate: "average" }] );

    equal(result.foo.average, 5);
});

test("aggregate average for a given field", function() {
    var data = [ {foo: 100, bar: "baz"} , {foo: 100, bar: "bar"} , {foo: 1, bar: "baz"} ];

    var result = new Query(data).aggregate( [{ field: "foo", aggregate: "average" }] );

    equal(result.foo.average, 67);
});

test("aggregate function should be caseinsensitive", function() {
    var data = [ {foo: 100, bar: "baz"} , {foo: 100, bar: "bar"} , {foo: 1, bar: "baz"} ];

    var result = new Query(data).aggregate( [{ field: "foo", aggregate: "Min" }] );

    equal(result.foo.Min, 1);
});

test("aggregate min returns min value for a given field", function() {
    var data = [ {foo: 100, bar: "baz"} , {foo: 100, bar: "bar"} , {foo: 1, bar: "baz"} ];

    var result = new Query(data).aggregate( [{ field: "foo", aggregate: "min" }] );

    equal(result.foo.min, 1);
});

test("aggregate min returns min value for a given field with nulls", function() {
    var data = [ {foo: 1, bar: "baz"}, {foo: 100, bar: "baz"}, {foo: null, bar: "baz"},  {foo: 100, bar: "bar"}  ];

    var result = new Query(data).aggregate( [{ field: "foo", aggregate: "min" }] );

    equal(result.foo.min, 1);
});

test("aggregate min returns min value for a given field with 0", function() {
    var data = [ {foo: 1, bar: "baz"}, {foo: 100, bar: "baz"}, {foo: 0, bar: "baz"},  {foo: 100, bar: "bar"}  ];

    var result = new Query(data).aggregate( [{ field: "foo", aggregate: "min" }] );

    equal(result.foo.min, 0);
});

test("aggregate min returns min value for a given field with undefined", function() {
    var data = [ {foo: 1, bar: "baz"}, {foo: 100, bar: "baz"}, {foo: undefined, bar: "baz"},  {foo: 100, bar: "bar"}  ];

    var result = new Query(data).aggregate( [{ field: "foo", aggregate: "min" }] );

    equal(result.foo.min, 1);
});

test("aggregate min returns min value for a given field with 0", function() {
    var data = [ {foo: 1, bar: "baz"}, {foo: 100, bar: "baz"}, {foo: 0, bar: "baz"},  {foo: 100, bar: "bar"}  ];

    var result = new Query(data).aggregate( [{ field: "foo", aggregate: "min" }] );

    equal(result.foo.min, 0);
});

test("aggregate min returns min value for a given field with less than 0", function() {
    var data = [ {foo: -1, bar: "baz"}, {foo: 100, bar: "baz"}, {foo: 0, bar: "baz"},  {foo: 100, bar: "bar"}  ];

    var result = new Query(data).aggregate( [{ field: "foo", aggregate: "min" }] );

    equal(result.foo.min, -1);
});

test("aggregate max returns null if all fields are null", function() {
    var data = [ {foo: null, bar: "baz"}, {foo: null, bar: "baz"}, {foo: null, bar: "baz"},  {foo: null, bar: "bar"}  ];

    var result = new Query(data).aggregate( [{ field: "foo", aggregate: "max" }] );

    equal(result.foo.max, null);
});

test("aggregate max returns null if all fields are undefined or null", function() {
    var data = [ {foo: null, bar: "baz"}, {foo: undefined, bar: "baz"}, {foo: null, bar: "baz"},  {foo: undefined, bar: "bar"}  ];

    var result = new Query(data).aggregate( [{ field: "foo", aggregate: "max" }] );

    equal(result.foo.max, null);
});

test("aggregate max returns undefined if all fields are undefined", function() {
    var data = [ {foo: undefined, bar: "baz"}, {foo: undefined, bar: "baz"} ];

    var result = new Query(data).aggregate( [{ field: "foo", aggregate: "max" }] );

    equal(result.foo.max, undefined);
});

test("aggregate max returns min value for a given field with null", function() {
    var data = [ {foo: 10, bar: "baz"}, {foo: 100, bar: "baz"}, {foo: null, bar: "baz"},  {foo: 10, bar: "bar"}  ];

    var result = new Query(data).aggregate( [{ field: "foo", aggregate: "max" }] );

    equal(result.foo.max, 100);
});

test("aggregate max returns min value for a given field with undefined", function() {
    var data = [ {foo: 10, bar: "baz"}, {foo: 100, bar: "baz"}, {foo: undefined, bar: "baz"},  {foo: 10, bar: "bar"}  ];

    var result = new Query(data).aggregate( [{ field: "foo", aggregate: "max" }] );

    equal(result.foo.max, 100);
});

test("aggregate max returns min value for a given field with 0", function() {
    var data = [ {foo: 10, bar: "baz"}, {foo: 100, bar: "baz"}, {foo: 0, bar: "baz"},  {foo: 10, bar: "bar"}  ];

    var result = new Query(data).aggregate( [{ field: "foo", aggregate: "max" }] );

    equal(result.foo.max, 100);
});

test("aggregate max with date", function() {
    var data = [ {foo: new Date("2013/05/06"), bar: "baz"}, {foo: new Date("2050/05/06"), bar: "bar"}, {foo: new Date("1940/05/06"), bar: "baz"}, {foo: new Date("1980/05/06"), bar: "baz"} ];

    var result = new Query(data).aggregate( [{ field: "foo", aggregate: "max" }] );

    deepEqual(result.foo.max, new Date("2050/05/06"));
});

test("aggregate min with date", function() {
    var data = [ {foo: new Date("2013/05/06"), bar: "baz"}, {foo: new Date("2050/05/06"), bar: "bar"}, {foo: new Date("1940/05/06"), bar: "baz"}, {foo: new Date("1980/05/06"), bar: "baz"} ];

    var result = new Query(data).aggregate( [{ field: "foo", aggregate: "min" }] );

    deepEqual(result.foo.min, new Date("1940/05/06"));
});

test("aggregate min with date and null", function() {
    var data = [ {foo: new Date("2013/05/06"), bar: "baz"}, {foo: null, bar: "bar"}, {foo: new Date("1940/05/06"), bar: "baz"},{foo: null, bar: "bar"}, {foo: new Date("1980/05/06"), bar: "baz"} ];

    var result = new Query(data).aggregate( [{ field: "foo", aggregate: "min" }] );

    deepEqual(result.foo.min, new Date("1940/05/06"));
});

test("aggregate count with null", function() {
    var data = [ {foo: 10, bar: "baz"}, {foo: 100, bar: "baz"}, {foo: null, bar: "baz"},  {foo: 10, bar: "bar"}  ];

    var result = new Query(data).aggregate( [{ field: "foo", aggregate: "count" }] );

    equal(result.foo.count, 4);
});

test("group parent group should have hasSubgroups set to true", function() {
    var data = [ {foo: 100, bar: "baz"} , {foo: 100, bar: "bar"} , {foo: 1, bar: "baz"} ];

    var result = new Query(data).group( [
        { field: "foo" },
        { field: "bar" }
    ], data).toArray();

    equal(result.length, 2);

    ok(result[0].hasSubgroups);
    ok(!result[0].items[0].hasSubgroups);
});

test("group group should have hasSubgroups set to false", function() {
    var data = [ {foo: 100, bar: "baz"} , {foo: 100, bar: "bar"} , {foo: 1, bar: "baz"} ];

    var result = new Query(data).group( [ { field: "foo" } ], data).toArray();

    equal(result.length, 2);

    ok(!result[0].hasSubgroups);
});

test("aggregate return empty object if data is undefined", function() {
    var result = new Query(undefined).aggregate([{ field: "foo", aggregate: "sum" }, { field: "bar", aggregate: "count" }]);

    ok(result);
});

test("group on empty array", function() {
    var data = [ ];

    var result = new Query(data).group( [ { field: "foo" } ], data).toArray();

    equal(result.length, 0);
});

}());
