(function($, window) {
    var kendo = window.kendo;

    var Comparer = {
        selector: function(field) {
            return $.isFunction(field) ? field : function(record) {
                return record[field];
            };
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
            var indx, 
                length,
                expr,
                selector,
                operator,
                desc,
                descriptors = [],
                caseSensitive,
                predicate;
                
            expressions = expressions || []; 
            for(indx = 0, length = expressions.length; indx < length; indx ++) {
                expr = expressions[indx];
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
            return $.isFunction(field) ? field : function(record) {
                return caseSensitive(record[field]);
            };
        },        
        execute: function(predicate, data) {
            var indx, 
                length = data.length,
                record,
                result = [];
                
		    for(indx = 0; indx < length; indx ++) {               
                record = data[indx];
                
                if(predicate(record)) {
				    result.push(record);
                }
            }
            		    
		    return result;
        },
        combine: function(descriptors) {
            return function(record) {
                var result = true,
                indx = 0, 
                length = descriptors.length;

                while(result && indx < length) {
                    result = descriptors[indx ++](record);
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

    function Query(data) {
        this.data = data;
    }

    Query.expandSort = function(field, dir) {
        var descriptor = typeof field === "string" ? { field: field, dir: dir } : field,
            descriptors = $.isArray(descriptor) ? descriptor : (descriptor !== undefined ? [descriptor] : []); 

        return $.grep(descriptors, function(d) { return !!d.dir; });
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
        orderBy: function (selector) {
            var result = this.data.slice(0),
                comparer = $.isFunction(selector) ? Comparer.asc(selector) : selector.compare;

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
            expressions = $.isArray(expressions) ? expressions : [expressions];
            var predicate = Filter.create(expressions);                        
            return new Query(predicate(this.data));
        }
    }

    kendo.data.Query = Query;
})(jQuery, window);
