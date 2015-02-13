(function(){

var Query = kendo.data.Query;

function compile(expression) {
    return Query.filterExpr(Query.normalizeFilter(expression)).expression;
}

test("and with one filter", function() {
    equal(compile({
        logic: "and",
        filters: [ {value: 10, operator: "eq"}]
    }), "(d == 10)");
});

test("default operator is eq", function() {
    equal(compile({
        logic: "and",
        filters: [ {value: 10}]
    }), "(d == 10)");
});

test("undefined value",  function() {
    equal(compile({
        logic: "and",
        filters: [ {value: undefined}]
    }), "(d == undefined)");
});

test("null value",  function() {
    equal(compile({
        logic: "and",
        filters: [ {value: null}]
    }), "(d == null)");
});

test("or with one filter", function() {
    equal(compile({
        logic: "or",
        filters: [ {value: 10, operator: "eq"}]
    }), "(d == 10)");
});

test("and with two filters", function() {
    equal(compile({
        logic: "and",
        filters: [ { value: 10, operator: "eq" }, { value: 10, operator: "eq" }]
    }), "(d == 10 && d == 10)");
});

test("or with two filters", function() {
    equal(compile({
        logic: "or",
        filters: [ { value: 10, operator: "eq" }, { value: 10, operator: "eq" }]
    }), "(d == 10 || d == 10)");
});

test("or with nested filters", function() {
    equal(compile({
        logic: "or",
        filters: [
            {
                logic: "and",
                filters: [{ value: 10, operator: "eq" }, { value: 10, operator: "eq" }]
            },
            {
                logic: "or",
                filters: [{ value: 10, operator: "eq" }, { value: 10, operator: "eq" }]
            }
        ]
    }), "((d == 10 && d == 10) || (d == 10 || d == 10))");
});

test("and with nested filters", function() {
    equal(compile({
        logic: "and",
        filters: [
            {
                logic: "and",
                filters: [{ value: 10, operator: "eq" }, { value: 10, operator: "eq" }]
            },
            {
                logic: "or",
                filters: [{ value: 10, operator: "eq" }, { value: 10, operator: "eq" }]
            }
        ]
    }), "((d == 10 && d == 10) && (d == 10 || d == 10))");
});

test("uses field name", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "eq" } ]
    }), "(d.foo == 10)");
});

test("gt", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "gt" } ]
    }), "(d.foo > 10)");
});

test("gte", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "gte" } ]
    }), "(d.foo >= 10)");
});

test("lt", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "lt" } ]
    }), "(d.foo < 10)");
});

test("lte", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "lte" } ]
    }), "(d.foo <= 10)");
});

test("==", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "==" } ]
    }), "(d.foo == 10)");
});

test("equals", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "equals" } ]
    }), "(d.foo == 10)");
});

test("equal", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "equal" } ]
    }), "(d.foo == 10)");
});

test("isequalto", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "isequalto" } ]
    }), "(d.foo == 10)");
});

test("equalto", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "equalto" } ]
    }), "(d.foo == 10)");
});

test("operator ignores case", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "isEqualTo" } ]
    }), "(d.foo == 10)");
});

test("neq", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "neq" } ]
    }), "(d.foo != 10)");
});

test("!=", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "!=" } ]
    }), "(d.foo != 10)");
});

test("isnotequalto", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "isnotequalto" } ]
    }), "(d.foo != 10)");
});

test("notequals", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "notequals" } ]
    }), "(d.foo != 10)");
});

test("notequalto", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "notequalto" } ]
    }), "(d.foo != 10)");
});

test("notequal", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "notequal" } ]
    }), "(d.foo != 10)");
});

test("ne", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "ne" } ]
    }), "(d.foo != 10)");
});

test("<", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "<" } ]
    }), "(d.foo < 10)");
});

test("islessthan", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "islessthan" } ]
    }), "(d.foo < 10)");
});

test("lessthan", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "lessthan" } ]
    }), "(d.foo < 10)");
});

test("less", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "less" } ]
    }), "(d.foo < 10)");
});

test("<=", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "<=" } ]
    }), "(d.foo <= 10)");
});

test("islessthanorequalto", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "islessthanorequalto" } ]
    }), "(d.foo <= 10)");
});

test("lessthanequal", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "lessthanequal" } ]
    }), "(d.foo <= 10)");
});

test("le", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "le" } ]
    }), "(d.foo <= 10)");
});

test(">", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: ">" } ]
    }), "(d.foo > 10)");
});

test("isgreaterthan", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "isgreaterthan"} ]
    }), "(d.foo > 10)");
});

test("greaterthan", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "greaterthan"} ]
    }), "(d.foo > 10)");
});

test("greater", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "greater"} ]
    }), "(d.foo > 10)");
});

test(">=", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: ">=" } ]
    }), "(d.foo >= 10)");
});

test("isgreaterthanorequalto", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "isgreaterthanorequalto"} ]
    }), "(d.foo >= 10)");
});

test("greaterthanequal", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "greaterthanequal"} ]
    }), "(d.foo >= 10)");
});

test("ge", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: 10, operator: "ge" } ]
    }), "(d.foo >= 10)");
});

test("startswith", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: "bar", operator: "startswith" } ]
    }), "((d.foo || '').toLowerCase().lastIndexOf('bar', 0) == 0)");
});

test("endswith", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: "bar", operator: "endswith" } ]
        }), "((d.foo || '').toLowerCase().indexOf('bar', (d.foo || '').toLowerCase().length - 3) >= 0)");
});

test("contains", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: "bar", operator: "contains" } ]
    }), "((d.foo || '').toLowerCase().indexOf('bar') >= 0)");
});

test("contains with apostrophe", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: "foo", value: "'", operator: "contains" } ]
    }), "((d.foo || '').toLowerCase().indexOf('\\'') >= 0)");
});

test("using function as field", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: $.noop, value: 0, operator: "eq" } ]
    }), "(__f[0](d) == 0)");
});

test("using multiple fields as function", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: $.noop, value: 10, operator: "eq" }, {field: $.noop,  value: 10, operator: "eq" }]
    }), "(__f[0](d) == 10 && __f[1](d) == 10)");
});

test("using function as operator", function() {
    equal(compile({
        logic: "and",
        filters: [ { value: 0, operator: $.noop } ]
    }), "(__o[0](d, 0))");
});

test("using function as operator with string value", function() {
    equal(compile({
        logic: "and",
        filters: [ { value: 'bar', operator: $.noop } ]
    }), "(__o[0](d, 'bar'))");
});

test("using function as operator with string value that contains apostrophe", function() {
    equal(compile({
        logic: "and",
        filters: [ { value: "b'ar", operator: $.noop } ]
    }), "(__o[0](d, 'b\\'ar'))");
});

test("using function as operator with date value", function() {
    var date = new Date();
    equal(compile({
        logic: "and",
        filters: [ { value: date, operator: $.noop } ]
    }), "(__o[0](d, new Date(" + date.getTime() + ")))");
});

test("using function as operator with boolean value", function() {
    var date = new Date();
    equal(compile({
        logic: "and",
        filters: [ { value: true, operator: $.noop } ]
    }), "(__o[0](d, true))");
});

test("using function as operator with null value", function() {
    var date = new Date();
    equal(compile({
        logic: "and",
        filters: [ { value: null, operator: $.noop } ]
    }), "(__o[0](d, null))");
});

test("using function as operator with undefined value", function() {
    var date = new Date();
    equal(compile({
        logic: "and",
        filters: [ { value: undefined, operator: $.noop } ]
    }), "(__o[0](d, undefined))");
});

test("using function as operator and field", function() {
    equal(compile({
        logic: "and",
        filters: [ { field: $.noop, value: 0, operator: $.noop } ]
    }), "(__o[0](__f[0](d), 0))");
});

test("using multiple operators as function", function() {
    equal(compile({
        logic: "and",
        filters: [ { operator: $.noop, value: 10 }, { operator: $.noop, value: 10}]
    }), "(__o[0](d, 10) && __o[1](d, 10))");
});

test("or with nested filters and operators as functions", function() {
    equal(compile({
        logic: "or",
        filters: [
            {
                logic: "and",
                filters: [{ value: 10, operator: $.noop }, { value: 10, operator: $.noop }]
            },
            {
                logic: "or",
                filters: [{ value: 10, operator: $.noop }, { value: 10, operator: "eq" }]
            }
        ]
    }), "((__o[0](d, 10) && __o[1](d, 10)) || (__o[2](d, 10) || d == 10))");
});

test("or with nested filters and fields as functions", function() {
    equal(compile({
        logic: "or",
        filters: [
            {
                logic: "and",
                filters: [{ value: 10, field: $.noop, operator: $.noop }, {field: $.noop, value: 10, operator: $.noop }]
            },
            {
                logic: "or",
                filters: [{ value: 10, field: $.noop,  operator: $.noop }, { value: 10, operator: "eq" }]
            }
        ]
    }), "((__o[0](__f[0](d), 10) && __o[1](__f[1](d), 10)) || (__o[2](__f[2](d), 10) || d == 10))");
});

test("deeply nested nested fields as functions", function() {
    equal(compile({
        logic: "or",
        filters: [
            {
                logic: "and",
                filters: [ {
                    logic: "or",
                    filters: [ { value: 10, field: $.noop }, {field: $.noop, value: 10}]
                }, { field:$.noop, value : 10 }
                ]
            },
            {
                logic: "and",
                filters: [ {
                    logic: "or",
                    filters: [ { value: 10, field: $.noop }, {field: $.noop, value: 10}]
                }, { field:$.noop, value : 10 }
]
            }
        ]
    }), "(((__f[0](d) == 10 || __f[1](d) == 10) && __f[2](d) == 10) || ((__f[3](d) == 10 || __f[4](d) == 10) && __f[5](d) == 10))");
});

test("date eq", function() {
    var date = new Date(2011, 10, 1);
    equal(compile({
        logic: "and",
        filters: [ { operator: "eq", value: date} ]
    }), "((d?d.getTime():d) == " + date.getTime() + ")");
});

test("date neq", function() {
    var date = new Date(2011, 10, 1);
    equal(compile({
        logic: "and",
        filters: [ { operator: "neq", value: date} ]
    }), "((d?d.getTime():d) != " + date.getTime() + ")");
});

test("date gt", function() {
    var date = new Date(2011, 10, 1);
    equal(compile({
        logic: "and",
        filters: [ { operator: "gt", value: date} ]
    }), "((d?d.getTime():d) > " + date.getTime() + ")");
});

test("date gte", function() {
    var date = new Date(2011, 10, 1);
    equal(compile({
        logic: "and",
        filters: [ { operator: "gte", value: date} ]
    }), "((d?d.getTime():d) >= " + date.getTime() + ")");
});

test("date lt", function() {
    var date = new Date(2011, 10, 1);
    equal(compile({
        logic: "and",
        filters: [ { operator: "lt", value: date} ]
    }), "((d?d.getTime():d) < " + date.getTime() + ")");
});

test("date lte", function() {
    var date = new Date(2011, 10, 1);
    equal(compile({
        logic: "and",
        filters: [ { operator: "lte", value: date} ]
    }), "((d?d.getTime():d) <= " + date.getTime() + ")");
});

test("string neq", function() {
    equal(compile({
        logic: "and",
        filters: [ { operator: "neq", value: "foo"} ]
    }), "((d || '').toLowerCase() != 'foo')");
});
test("string filtering is case insensitive by default", function() {
    equal(compile({
        logic: "and",
        filters: [ { operator: "neq", value: "Foo"} ]
    }), "((d || '').toLowerCase() != 'foo')");
});

test("apostrophe in strings is escaped", function() {
    equal(compile({
        filters: [ { operator: "eq", value: "f'oo"} ]
    }), "((d || '').toLowerCase() == 'f\\'oo')");
});

test("string filtering is case sensitive", function() {
    equal(compile({
        logic: "and",
        filters: [ { ignoreCase: false, operator: "neq", value: "Foo"} ]
    }), "(d != 'Foo')");
});

test("carriage return in strings is escaped", function() {
    equal(compile({
        filters: [ { operator: "eq", value: "foo \r\n bar"} ]
    }), "((d || '').toLowerCase() == 'foo  bar')");
});

}());
