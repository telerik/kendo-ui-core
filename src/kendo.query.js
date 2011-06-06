(function($) {
    var kendo = window.kendo;

    var Comparer = {
        selector: function(field) {
            if (field) {
                return $.isFunction(field) ? field : function(record) {
                    return record[field];
                };
            }

            return function(record) {
                return record;
            }
        },
        asc: function(field) {
            var selector = this.selector(field);
            return function (a, b) {
                a = selector(a);
                b = selector(b);

                return a > b ? 1 : (a < b ? -1 : 0);
            };
        },
        desc: function(field) {
            var selector = this.selector(field);
            return function (a, b) {
                a = selector(a);
                b = selector(b);

                return a < b ? 1 : (a > b ? -1 : 0);
            };
        },
        create: function(descriptor) {
            return Comparer[descriptor.dir.toLowerCase()](descriptor.field);
        },
        combine: function(comparers) {
             return function(a, b) {
                 var result = comparers[0](a, b),
                     idx,
                     length;

                 for (idx = 1, length = comparers.length; idx < length; idx ++) {
                     result = result || comparers[idx](a, b);
                 }

                 return result;
             }
        }
    };

    var Filter = {
        create: function(expressions) {
            var idx,
                length,
                expr,
                selector,
                operator,
                desc,
                descriptors = [],
                caseSensitive,
                predicate;

            expressions = expressions || [];
            for(idx = 0, length = expressions.length; idx < length; idx ++) {
                expr = expressions[idx];
                if(typeof expr.value === "string" && !expr.caseSensitive) {
                     caseSensitive = function(value) {
                        return value.toLowerCase();
                     };
                } else {
                    caseSensitive = function(value) {
                        return value;
                    };
                }
                selector = Filter.selector(expr.field, caseSensitive);
                operator = Filter.operator(expr.operator);
                desc = operator(selector, caseSensitive(expr.value));
                descriptors.push(desc);
            }
            predicate = Filter.combine(descriptors);

            return function(data) {
                return Filter.execute(predicate, data);
            };
        },
        selector: function(field, caseSensitive) {
            if (field) {
                return $.isFunction(field) ? field : function(record) {
                    return caseSensitive(record[field]);
                };
            }
            return function(record) {
                return caseSensitive(record);
            };
        },
        execute: function(predicate, data) {
            var idx,
                length = data.length,
                record,
                result = [];

            for(idx = 0; idx < length; idx ++) {
                record = data[idx];

                if(predicate(record)) {
                    result.push(record);
                }
            }

            return result;
        },
        combine: function(descriptors) {
            return function(record) {
                var result = true,
                idx = 0,
                length = descriptors.length;

                while(result && idx < length) {
                    result = descriptors[idx ++](record);
                }

                return result;
            };
        },
        operator: function(operator) {
            if(!operator)
                return Filter.eq;
            if($.isFunction(operator))
                return operator;

            operator = operator.toLowerCase();
            operatorStrings = Filter.operatorStrings;
            for (var op in operatorStrings) {
                if ($.inArray(operator, operatorStrings[op]) > -1) {
                    operator = op;
                    break;
                }
            }

            return Filter[operator];
        },
        operatorStrings: {
            "eq": ["eq", "==", "isequalto", "equals", "equalto", "equal"],
            "neq": ["neq", "!=", "isnotequalto", "notequals", "notequalto", "notequal", "not"],
            "lt": ["lt", "<", "islessthan", "lessthan", "less"],
            "lte": ["lte", "<=", "islessthanorequalto", "lessthanequal"],
            "gt": ["gt", ">", "isgreaterthan", "greaterthan", "greater"],
            "gte": ["gte", ">=", "isgreaterthanorequalto", "greaterthanequal"],
            "startswith": ["startswith"],
            "endswith": ["endswith"],
            "contains": ["contains", "substringof"]
        },
        eq: function(selector, value) {
            return function(record){
                var item = selector(record);
                return item > value ? false : (value > item ? false : true);
            };
        },
        neq: function(selector, value) {
            return function(record){
                return selector(record) != value;
            };
        },
        lt: function(selector, value) {
            return function(record){
                return selector(record) < value;
            };
        },
        lte: function(selector, value) {
            return function(record){
                return selector(record) <= value;
            };
        },
        gt: function(selector, value) {
            return function(record){
                return selector(record) > value;
            };
        },
        gte: function(selector, value) {
            return function(record){
                return selector(record) >= value;
            };
        },
        startswith: function(selector, value) {
            return function(record){
                return selector(record).indexOf(value) == 0;
            };
        },
        endswith: function(selector, value) {
            return function(record){
                var item = selector(record);
                return item.lastIndexOf(value) == item.length - 1;
            };
        },
        contains: function(selector, value) {
            return function(record){
                return selector(record).indexOf(value) > -1;
            };
        }
    }

    if (Array.prototype.map !== undefined) {
        map = function (array, callback) {
            return array.map(callback);
        }
    } else {
        map = function (array, callback) {
            var length = array.length, result = new Array(length);

            for (var i = 0; i < length; i++) {
                result[i] = callback(array[i], i, array);
            }

            return result;
        }
    }

    function Query(data) {
        this.data = data;
    }

    Query.expandSort = function(field, dir) {
        var descriptor = typeof field === "string" ? { field: field, dir: dir } : field,
            descriptors = $.isArray(descriptor) ? descriptor : (descriptor !== undefined ? [descriptor] : []);

        return $.grep(descriptors, function(d) { return !!d.dir; });
    }
    Query.expandFilter = function(expressions) {
        return expressions = $.isArray(expressions) ? expressions : [expressions];
    }
    Query.prototype = {
        toArray: function () {
            return this.data;
        },
        skip: function (count) {
            return new Query(this.data.slice(count));
        },
        take: function (count) {
            return new Query(this.data.slice(0, count));
        },
        select: function (selector) {
            return new Query(map(this.data, selector));
        },
        orderBy: function (selector) {
            var result = this.data.slice(0),
                comparer = $.isFunction(selector) || !selector ? Comparer.asc(selector) : selector.compare;

            return new Query(result.sort(comparer));
        },
        orderByDescending: function (selector) {
            return new Query(this.data.slice(0).sort(Comparer.desc(selector)));
        },
        sort: function(field, dir) {
            var idx,
                length,
                descriptors = Query.expandSort(field, dir),
                comparers = [];

            if (descriptors.length) {
                for (idx = 0, length = descriptors.length; idx < length; idx++) {
                    comparers.push(Comparer.create(descriptors[idx]));
                }

                return this.orderBy({ compare: Comparer.combine(comparers) });
            }

            return this;
        },
        filter: function(expressions) {
            var predicate = Filter.create(Query.expandFilter(expressions));
            return new Query(predicate(this.data));
        },
        group: function(descriptors, allData) {
            descriptors = descriptors || [];
            allData = allData || this.data;

            var that = this,
                result = new Query(that.data),
                descriptor;

            if (descriptors.length > 0) {
                descriptor = descriptors[0];
                result = result.groupBy(descriptors[0]);

                if(descriptors.length > 0) {
                    result = result.select(function(group) {
                        return {
                            field: group.field,
                            value: group.value,
                            items: new Query(group.items).group(descriptors.slice(1)).toArray(),
                            aggregates: new Query(allData).filter([ { field: group.field, operator: "eq", value: group.value } ]).aggregate(descriptor.aggregates)
                        }
                    });
                }
            }
            return result;
        },
        groupBy: function(descriptor) {
            if ($.isEmptyObject(descriptor)) {
                return new Query(result);
            }

            var field = descriptor.field,
                sorted = this.sort(field, descriptor.dir || "asc").toArray(),
                accessor = kendo.accessor(field),
                item,
                groupValue = accessor.get(sorted[0], field),
                aggregate = {},
                group = {
                    field: field,
                    value: groupValue,
                    items: [],
                    aggregates: aggregate
                },
                currentValue,
                idx,
                len,
                result = [group];

            for(idx = 0, len = sorted.length; idx < len; idx++) {
                item = sorted[idx];
                currentValue = accessor.get(item, field);
                if(groupValue !== currentValue) {
                    groupValue = currentValue;
                    aggregate = {};
                    group = {
                        field: field,
                        value: groupValue,
                        items: [],
                        aggregates: aggregate
                    };
                    result.push(group);
                }
                calculateAggregate(aggregate, descriptor.aggregates, item);
                group.items.push(item);
            }
            return new Query(result);
        },
        aggregate: function (aggregates) {
            var idx,
                len,
                result = {};

            for(idx = 0, len = this.data.length; idx < len; idx++) {
               calculateAggregate(result, aggregates, this.data[idx]);
            }
            return result;
        }
    }
    function calculateAggregate(accumulator, aggregates, item) {
            aggregates = aggregates || [];
            var idx,
                aggr,
                fieldAccumulator,
                len = aggregates.length;

            for (idx = 0; idx < len; idx++) {
                aggr = aggregates[idx];
                var field = aggr.field;
                accumulator[field] = accumulator[field] || {};
                accumulator[field][aggr.aggregate] = functions[aggr.aggregate](accumulator[field][aggr.aggregate], item, kendo.accessor(field) );
            }
        }

    var functions = {
        sum: function(accumulator, item, accessor) {
            return accumulator = (accumulator || 0) + accessor.get(item);
        },
        count: function(accumulator, item, accessor) {
            return (accumulator || 0) + 1;
        },
        max: function(accumulator, item, accessor) {
            var accumulator =  (accumulator || 0),
                value = accessor.get(item);
            if(accumulator < value) {
                accumulator = value;
            }
            return accumulator;
        },
        min: function(accumulator, item, accessor) {
            var value = accessor.get(item),
                accumulator = (accumulator || value)
            if(accumulator > value) {
                accumulator = value;
            }
            return accumulator;
        }
    };
    kendo.data.Query = Query;
})(jQuery);
