(function() {

    var Query = kendo.data.Query;

    function compile(expression) {
        return Query.filterExpr(Query.normalizeFilter(expression)).expression;
    }
    describe("Query expression", function() {

        it("and with one filter", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ value: 10, operator: "eq" }]
            }), "(d == 10)");
        });

        it("default operator is eq", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ value: 10 }]
            }), "(d == 10)");
        });

        it("undefined value", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ value: undefined }]
            }), "(d == undefined)");
        });

        it("null value", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ value: null }]
            }), "(d == null)");
        });

        it("or with one filter", function() {
            assert.equal(compile({
                logic: "or",
                filters: [{ value: 10, operator: "eq" }]
            }), "(d == 10)");
        });

        it("and with two filters", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ value: 10, operator: "eq" }, { value: 10, operator: "eq" }]
            }), "(d == 10 && d == 10)");
        });

        it("or with two filters", function() {
            assert.equal(compile({
                logic: "or",
                filters: [{ value: 10, operator: "eq" }, { value: 10, operator: "eq" }]
            }), "(d == 10 || d == 10)");
        });

        it("or with nested filters", function() {
            assert.equal(compile({
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

        it("and with nested filters", function() {
            assert.equal(compile({
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

        it("uses field name", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "eq" }]
            }), "(d.foo == 10)");
        });

        it("gt", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "gt" }]
            }), "(d.foo > 10)");
        });

        it("gte", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "gte" }]
            }), "(d.foo >= 10)");
        });

        it("lt", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "lt" }]
            }), "(d.foo < 10)");
        });

        it("lte", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "lte" }]
            }), "(d.foo <= 10)");
        });

        it("==", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "==" }]
            }), "(d.foo == 10)");
        });

        it("equals", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "equals" }]
            }), "(d.foo == 10)");
        });

        it("equal", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "equal" }]
            }), "(d.foo == 10)");
        });

        it("isequalto", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "isequalto" }]
            }), "(d.foo == 10)");
        });

        it("equalto", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "equalto" }]
            }), "(d.foo == 10)");
        });

        it("operator ignores case", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "isEqualTo" }]
            }), "(d.foo == 10)");
        });

        it("neq", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "neq" }]
            }), "(d.foo != 10)");
        });

        it("!=", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "!=" }]
            }), "(d.foo != 10)");
        });

        it("isnotequalto", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "isnotequalto" }]
            }), "(d.foo != 10)");
        });

        it("notequals", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "notequals" }]
            }), "(d.foo != 10)");
        });

        it("notequalto", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "notequalto" }]
            }), "(d.foo != 10)");
        });

        it("notequal", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "notequal" }]
            }), "(d.foo != 10)");
        });

        it("ne", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "ne" }]
            }), "(d.foo != 10)");
        });

        it("<", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "<" }]
            }), "(d.foo < 10)");
        });

        it("islessthan", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "islessthan" }]
            }), "(d.foo < 10)");
        });

        it("lessthan", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "lessthan" }]
            }), "(d.foo < 10)");
        });

        it("less", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "less" }]
            }), "(d.foo < 10)");
        });

        it("<=", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "<=" }]
            }), "(d.foo <= 10)");
        });

        it("islessthanorequalto", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "islessthanorequalto" }]
            }), "(d.foo <= 10)");
        });

        it("lessthanequal", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "lessthanequal" }]
            }), "(d.foo <= 10)");
        });

        it("le", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "le" }]
            }), "(d.foo <= 10)");
        });

        it(">", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: ">" }]
            }), "(d.foo > 10)");
        });

        it("isgreaterthan", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "isgreaterthan" }]
            }), "(d.foo > 10)");
        });

        it("greaterthan", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "greaterthan" }]
            }), "(d.foo > 10)");
        });

        it("greater", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "greater" }]
            }), "(d.foo > 10)");
        });

        it(">=", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: ">=" }]
            }), "(d.foo >= 10)");
        });

        it("isgreaterthanorequalto", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "isgreaterthanorequalto" }]
            }), "(d.foo >= 10)");
        });

        it("greaterthanequal", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "greaterthanequal" }]
            }), "(d.foo >= 10)");
        });

        it("ge", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: 10, operator: "ge" }]
            }), "(d.foo >= 10)");
        });

        it("isempty", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", operator: "isempty" }]
            }), "(d.foo === '')");
        });

        it("isnotempty", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", operator: "isnotempty" }]
            }), "(d.foo !== '')");
        });

        it("isnull", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", operator: "isnull" }]
            }), "((d.foo == null))");
        });

        it("multiple isnull expressions", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", operator: "isnull" }, { field: "bar", operator: "isnull" }]
            }), "((d.foo == null) && (d.bar == null))");
        });

        it("multple isnotnull expressions", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", operator: "isnotnull" }, { field: "bar", operator: "isnotnull" }]
            }), "((d.foo != null) && (d.bar != null))");
        });

        it("isnotnull", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", operator: "isnotnull" }]
            }), "((d.foo != null))");
        });

        it("startswith", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: "bar", operator: "startswith" }]
            }), "((d.foo || '').toString().toLowerCase().lastIndexOf(\"bar\", 0) == 0)");
        });

        it("endswith", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: "bar", operator: "endswith" }]
            }), "((d.foo || '').toString().toLowerCase().indexOf(\"bar\", (d.foo || '').toString().toLowerCase().length - 3) >= 0)");
        });

        it("contains", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: "bar", operator: "contains" }]
            }), "((d.foo || '').toString().toLowerCase().indexOf(\"bar\") >= 0)");
        });

        it("contains with apostrophe", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", value: "'", operator: "contains" }]
            }), "((d.foo || '').toString().toLowerCase().indexOf(\"'\") >= 0)");
        });

        it("using function as field", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: $.noop, value: 0, operator: "eq" }]
            }), "(__f[0](d) == 0)");
        });

        it("using multiple fields as function", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: $.noop, value: 10, operator: "eq" }, { field: $.noop, value: 10, operator: "eq" }]
            }), "(__f[0](d) == 10 && __f[1](d) == 10)");
        });

        it("using function as operator", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ value: 0, operator: $.noop }]
            }), "(__o[0](d, 0))");
        });

        it("using function as operator with string value", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ value: 'bar', operator: $.noop }]
            }), "(__o[0](d, \"bar\"))");
        });

        it("using function as operator with string value that contains apostrophe", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ value: "b'ar", operator: $.noop }]
            }), "(__o[0](d, \"b'ar\"))");
        });

        it("using function as operator with date value", function() {
            var date = new Date();
            assert.equal(compile({
                logic: "and",
                filters: [{ value: date, operator: $.noop }]
            }), "(__o[0](d, new Date(" + date.getTime() + ")))");
        });

        it("using function as operator with boolean value", function() {
            var date = new Date();
            assert.equal(compile({
                logic: "and",
                filters: [{ value: true, operator: $.noop }]
            }), "(__o[0](d, true))");
        });

        it("using function as operator with null value", function() {
            var date = new Date();
            assert.equal(compile({
                logic: "and",
                filters: [{ value: null, operator: $.noop }]
            }), "(__o[0](d, null))");
        });

        it("using function as operator with undefined value", function() {
            var date = new Date();
            assert.equal(compile({
                logic: "and",
                filters: [{ value: undefined, operator: $.noop }]
            }), "(__o[0](d, undefined))");
        });

        it("using function as operator and field", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: $.noop, value: 0, operator: $.noop }]
            }), "(__o[0](__f[0](d), 0))");
        });

        it("using multiple operators as function", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ operator: $.noop, value: 10 }, { operator: $.noop, value: 10 }]
            }), "(__o[0](d, 10) && __o[1](d, 10))");
        });

        it("or with nested filters and operators as functions", function() {
            assert.equal(compile({
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

        it("or with nested filters and fields as functions", function() {
            assert.equal(compile({
                logic: "or",
                filters: [
                    {
                        logic: "and",
                        filters: [{ value: 10, field: $.noop, operator: $.noop }, { field: $.noop, value: 10, operator: $.noop }]
                    },
                    {
                        logic: "or",
                        filters: [{ value: 10, field: $.noop, operator: $.noop }, { value: 10, operator: "eq" }]
                    }
                ]
            }), "((__o[0](__f[0](d), 10) && __o[1](__f[1](d), 10)) || (__o[2](__f[2](d), 10) || d == 10))");
        });

        it("deeply nested nested fields as functions", function() {
            assert.equal(compile({
                logic: "or",
                filters: [
                    {
                        logic: "and",
                        filters: [{
                            logic: "or",
                            filters: [{ value: 10, field: $.noop }, { field: $.noop, value: 10 }]
                        }, { field: $.noop, value: 10 }
                        ]
                    },
                    {
                        logic: "and",
                        filters: [{
                            logic: "or",
                            filters: [{ value: 10, field: $.noop }, { field: $.noop, value: 10 }]
                        }, { field: $.noop, value: 10 }
                        ]
                    }
                ]
            }), "(((__f[0](d) == 10 || __f[1](d) == 10) && __f[2](d) == 10) || ((__f[3](d) == 10 || __f[4](d) == 10) && __f[5](d) == 10))");
        });

        it("date eq", function() {
            var date = new Date(2011, 10, 1);
            assert.equal(compile({
                logic: "and",
                filters: [{ operator: "eq", value: date }]
            }), "((d&&d.getTime?d.getTime():d) == " + date.getTime() + ")");
        });

        it("date neq", function() {
            var date = new Date(2011, 10, 1);
            assert.equal(compile({
                logic: "and",
                filters: [{ operator: "neq", value: date }]
            }), "((d&&d.getTime?d.getTime():d) != " + date.getTime() + ")");
        });

        it("date gt", function() {
            var date = new Date(2011, 10, 1);
            assert.equal(compile({
                logic: "and",
                filters: [{ operator: "gt", value: date }]
            }), "((d&&d.getTime?d.getTime():d) > " + date.getTime() + ")");
        });

        it("date gte", function() {
            var date = new Date(2011, 10, 1);
            assert.equal(compile({
                logic: "and",
                filters: [{ operator: "gte", value: date }]
            }), "((d&&d.getTime?d.getTime():d) >= " + date.getTime() + ")");
        });

        it("date lt", function() {
            var date = new Date(2011, 10, 1);
            assert.equal(compile({
                logic: "and",
                filters: [{ operator: "lt", value: date }]
            }), "((d&&d.getTime?d.getTime():d) < " + date.getTime() + ")");
        });

        it("date lte", function() {
            var date = new Date(2011, 10, 1);
            assert.equal(compile({
                logic: "and",
                filters: [{ operator: "lte", value: date }]
            }), "((d&&d.getTime?d.getTime():d) <= " + date.getTime() + ")");
        });

        it("string neq", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ operator: "neq", value: "foo" }]
            }), "(((d || '')+'').toLowerCase() != \"foo\")");
        });
        it("string filtering is case insensitive by default", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ operator: "neq", value: "Foo" }]
            }), "(((d || '')+'').toLowerCase() != \"foo\")");
        });

        it("apostrophe in strings is escaped", function() {
            assert.equal(compile({
                filters: [{ operator: "eq", value: "f'oo" }]
            }), "(((d || '')+'').toLowerCase() == \"f'oo\")");
        });

        it("string filtering is case sensitive", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ ignoreCase: false, operator: "neq", value: "Foo" }]
            }), "(d != \"Foo\")");
        });

        it("carriage return in strings is escaped", function() {
            assert.equal(compile({
                filters: [{ operator: "eq", value: "foo \r\n bar" }]
            }), "(((d || '')+'').toLowerCase() == \"foo  bar\")");
        });

        it("isnullorempty", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", operator: "isnullorempty" }]
            }), "((d.foo === null) || (d.foo === ''))");
        });

        it("isnotnullorempty", function() {
            assert.equal(compile({
                logic: "and",
                filters: [{ field: "foo", operator: "isnotnullorempty" }]
            }), "((d.foo !== null) && (d.foo !== ''))");
        });

    });
}());
