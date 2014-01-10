var diagram = kendo.diagram,
    Range = kendo.diagram.Range,
    Utils = kendo.diagram.Utils,
    Point = kendo.diagram.Point
    isFunction = kendo.isFunction

/*-----------Utilities tests------------------------------------*/
QUnit.module("Utilities tests");

test('Random id', function () {
    var a = new Range(0, 20);
    var counter = 0;
    a.forEach(function (i, j, m) {
        counter++;
    });
    ok(counter == 21, 'Passed 21 times.');
});

test('Any', function () {
    // mixed array
    var a = new Range(1, 15);
    a.push('Swa');
    a.push('Miro');
    a.push('Niko');
    ok(Utils.any(a, function (x) {
        return x == 'Swa';
    }), 'Should find element Swa in the array.');
});

test('Remove', function () {
    var a = new Range(1, 105);
    Utils.remove(a, 7);
    var find = function (x) {
        return x == 7;
    };
    ok(!Utils.any(a, find), 'Elements 7 should have been removed.')
});

test('indexOf', function () {
    var a = [1, 4, 7, 8, 5, 2];
    ok(a.indexOf(7) == 2, 'Correct')
    ok(a.indexOf(2) == 5, 'Correct')
});

test('Fold', function () {
    var a = new Range(1, 4);
    var sum = Utils.fold(a, function (a, x) {
        return a + x;
    });
    ok(sum == 10);

    sum = Utils.fold(a, function (a, x) {
        return a + x;
    }, 10);
    ok(sum == 20);

    a = ['Niko', 'Miro', 'Swa'];
    sum = Utils.fold(a, function (a, x) {
        return a + ', ' + x;
    }, 'D^3 team: ');
    ok(sum == 'D^3 team: , Niko, Miro, Swa');
});

test('Map', function () {
    var a = new Range(1, 5);
    var b = a.map(function (x) {
        return x + 1;
    });
    var shouldbe = new Range(2, 6);
    deepEqual(b, shouldbe, 'Shifted array are the same.')
});

test('Find', function () {
    var a = ['Niko', 'Miro', 'Swa'];
    ok(a.find(function (x) {
        return x == 'Niko';
    }), 'Found Niko.');

    ok(!a.find(function (x) {
        return x == 'Itzo';
    }), 'Itzo not supposed to be in there.');
    var stuff = [
        {"name": "Ian", "age": 12},
        {"name": "Ian", "age": 47},
        {"name": "Mary", "age": 27}
    ];
    var first = stuff.find(function (item) {
        return item["name"] == "Ian";
    });
    ok(first && first["age"] == 12);
});

test('Bi-sort', function () {
    var a = ['d', 'a', 'c', 'b'];
    var b = [4, 1, 3, 2];
    Array.prototype.bisort(a, b, function (m, n) {
        return m.localeCompare(n);
    });
    var shouldbe = new Range(1, 4);
    deepEqual(b, shouldbe, "Reordering works.");
});

test('Call $*!', function () {
    var f = function (x, r) {
        return x + r;
    };
    var w = f.call(this, 5, 4);
    ok(w == 9);
});

test('Insert', function () {
    var a = new Range(1, 5);
    var shouldbe = [1, 2, 3, 17, 4, 5];
    var b = a.insert(17, 3);
    deepEqual(b, shouldbe);
});

test('Prepend', function () {
    var a = new Range(1, 5);
    var shouldbe = new Range(0, 5);
    var b = a.prepend(0);
    deepEqual(b, shouldbe);
});

test('Append', function () {
    var a = new Range(1, 5);
    var shouldbe = new Range(1, 6);
    var b = a.append(6);
    deepEqual(b, shouldbe);
});

test('Apply', function () {
    var a = new Range(3, 22);
    var func = function (x, r) {
        return x + r;
    };
    var b = a.apply(func, 3);
    var shouldbe = new Range(6, 25);
    deepEqual(b, shouldbe, 'Functional is lovely.');
});

test('isObject', function () {
    ok(Utils.isObject({"stuff": 14}), "Should be considered as an object.")
    ok(!Utils.isObject(3.1415), "Should not be considered as an object.")
});

test('isEmpty', function () {
    ok(Utils.isEmpty([]), "Is an empty array.");
    ok(!Utils.isEmpty([3, 4]), "Not empty of course.");
    ok(!Utils.isEmpty({"a": 1}), "Non empty literal.");
});

test('has', function () {
    var obj = {"a": 1, "b": 2};
    ok(Utils.has(obj, "a"), "Has prop 'a'.")
    ok(!Utils.has(obj, "k"), "Has no prop 'k'.")
});

test('isString', function () {
    ok(Utils.isString("Something"), "Is a string, cool.");
    ok(!Utils.isString({}), "Nope.");
});

test('NaN', function () {
    ok(!isNaN(4585), "Is not NaN.");
    ok(isNaN(Number.NaN), "Bad bad math behavior.");
});

test('filter', function () {
    var a = new Range(1, 55);
    var b = a.filter(function (x) {
        return x >= 50;
    });
    var shouldbe = new Range(50, 55);
    deepEqual(b, shouldbe, "Should have filtered out.");
});

test('where', function () {
    var stuff = [
        {"name": "Ian", "age": 12},
        {"name": "Ian", "age": 47},
        {"name": "Mary", "age": 27}
    ];

    var subset = stuff.where(function (x) {
        return x.name == "Ian";
    });
    ok(subset.length == 2, "Should have two items.");
    var item = stuff.where(function (x) {
        return x.name == "Ian";
    }, true);
    ok(Utils.isObject(item) && !$.isArray(item) && item["age"] == 12, "Should be one item.");
});

test('all', function () {
    var a = [1, 1, 1, 1, 1, 1];
    ok(a.all(function (x) {
        return x == 1;
    }), "All ones.");
    a.add(2);
    ok(!a.all(function (x) {
        return x == 1;
    }), "Not all ones.");

    ok([].all(function (x) {
        return x > 1;
    }), "Empty fulfills all the requirements.");

});

test('first', function () {
    var ar = [1, 2, 3, , 11];
    equal(ar.first(), 1);
    var objs = [
        {name: "A", age: 33},
        {name: "D", age: 12},
        {name: "B", age: 34},
        {name: "C", age: 47},
        {name: "B", age: 61}
    ];
    var b = objs.first(function (d) {
        return d.name == "B";
    });
    equal(b.age, 34);
});

test("Range test", function () {
    var r = new Range(10, 20);
    ok(r.length == 11, "Should have length 11.");
    r = new Range(10, 20, 2);
    ok(r.length == 6, "Should have length 6.");
    r = new Range(20, 10, -2);
    ok(r.length == 6, "Should have length 6.");
    r = new Range(10, 20, .5);
    ok(r.length == 21, "Should have length 21.");
    r = new Range();
    ok(r.length == 0, 'Empty array');
    r = new Range(5);
    ok(r.length == 0, 'One element array');
    r = new Range(5, 1);
    ok(r.length == 5, 'Length 5');
    throws(function () {
            new Range(15, 1, 4);
        },
        'Should throw a separation error.'
    );
});

test('Serialize points', function () {
    var points = [new Point(1, 2), new Point(3, 4), new Point(5, 6)];
    var s = Utils.serializePoints(points);
    var ds = Utils.deserializePoints(s);
    equal(ds.length, 3);
    ok(ds[0].x===1 && ds[0].y===2 && ds[1].x === 3 && ds[1].y === 4 && ds[2].x === 5 && ds[2].y === 6);
});
