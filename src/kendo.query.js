(function($, window) {
    var kendo = window.kendo = window.kendo || {};

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

    function Query(data) {
        this.data = data;
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
                descriptor = typeof field === "string" ? { field: field, dir: dir } : field,
                descriptors = $.isArray(descriptor) ? descriptor : [descriptor],
                comparers = [];

            for (idx = 0, length = descriptors.length; idx < length; idx++) {
                comparers.push(Comparer.create(descriptors[idx]));
            }

            return this.orderBy({ compare: Comparer.combine(comparers) });
        }
    }

    kendo.data = kendo.data || {};
    kendo.data.Query = Query;
})(jQuery, window);
