(function ($, undefined) {
    var kendo = window.kendo,
       escapeQuoteRegExp = /'/ig;

    function parameterMap(options, operation) {
       var result = {};

       if (options.sort) {
           result[this.options.prefix + "orderBy"] = $.map(options.sort, function(sort) {
               return sort.field + "-" + sort.dir;
           }).join("~");

           delete options.sort;
       }

       if (options.page) {
           result[this.options.prefix + "page"] = options.page;

           delete options.page;
       }

       if (options.pageSize) {
           result[this.options.prefix + "pageSize"] = options.pageSize;

           delete options.pageSize;
       }

       if (options.group) {
            result[this.options.prefix + "groupBy"] = $.map(options.group, function(group) {
               return group.field + "-" + group.dir;
           }).join("~");

           delete options.group;
       }

       if (options.aggregate) {
           result[this.options.prefix + "aggregates"] =  $.map(options.aggregate, function(aggregate) {
               return aggregate.field + "-" + aggregate.aggregate;
           }).join("~");

           delete options.aggregate;
       }

       if (options.filter) {
           result[this.options.prefix + "filter"] = serializeFilter(options.filter);

           delete options.filter;
       } else {
           result[this.options.prefix + "filter"] = "";
       }

       if (operation != "read" && options.models) {
           var prefix = "models",
               models = options.models;

           for (var i = 0; i < models.length; i++) {
               var item = convert(models[i]),
                   value,
                   key;

               for (var member in item) {
                   key = prefix + "[" + i + "]." + member;
                   value = item[member];

                   if ($.isPlainObject(value)) {
                       flatten(result, value, key);
                   }
                   else {
                       result[key] = value;
                   }
               }
           }

           delete options.models;
       }

       return $.extend(result, options);
    }

    function convert(values) {
        for (var key in values) {
            var value = values[key];

            if (value instanceof Date) {
                values[key] = kendo.format("{0:G}", value);
            }

            if (typeof value === "number") {
                value = value.toString();
            }

            if (value == undefined) {
                delete values[key];
            }
            if ($.isPlainObject(value)) {
                convert(value);
            }
        }
        return values;
    }

    function flatten(result, value, prefix) {
        for (var key in value) {
            if ($.isPlainObject(value[key])) {
                flatten(result, value[key], prefix ? prefix + "." + key : key);
            } else {
                result[prefix ? prefix + "." + key : key] = value[key];
            }
        }
    }

    function serializeFilter(filter) {
       if (filter.filters) {
           return  $.map(filter.filters, function(f) {
               return serializeFilter(f);
           }).join("~" + filter.logic + "~");
       }
       return filter.field + "~" + filter.operator + "~" + encodeFilterValue(filter.value);
    }

    function encodeFilterValue(value) {
       if (typeof value === "string") {
           return "'" + value.replace(escapeQuoteRegExp, "''") + "'";
       }
       if (value && value.getTime) {
           return "datetime'" + kendo.format("{0:yyyy-MM-ddTHH-mm-ss}", value) + "'";
       }
       return value;
    }

    kendo.data.transports["aspnetmvc-ajax"] = {
        read: {
            type: "POST"
        },
        update: {
            type: "POST"
        },
        create: {
            type: "POST"
        },
        destroy: {
            type: "POST"
        },
        parameterMap: parameterMap,
        prefix: ""
    };

    function translateGroup(group) {
       return {
           value: group.Key,
           field: group.Member,
           hasSubgroups: group.HasSubgroups,
           aggregates: translateAggregate(group.Aggregates),
           items: group.HasSubgroups ? $.map(group.Items, translateGroup) : group.Items
       };
    }

    function translateAggregateResults(aggregate) {
       var obj = {};
           obj[aggregate.AggregateMethodName.toLowerCase()] = aggregate.Value;

       return obj;
    }

    function translateAggregate(aggregates) {
        var functionResult = {},
            key,
            functionName,
            aggregate;

        for (key in aggregates) {
            functionResult = {};
            aggregate = aggregates[key];

            for (functionName in aggregate) {
               functionResult[functionName.toLowerCase()] = aggregate[functionName];
            }

            aggregates[key] = functionResult;
        }

        return aggregates;
    }

    kendo.data.schemas["aspnetmvc-ajax"] = {
        groups: function(data) {
            return $.map(this.data(data), translateGroup);
        },
        aggregates: function(data) {
            data = data.d || data;
            var result = {},
                aggregates = data.AggregateResults || [],
                aggregate,
                idx,
                length;

            for (idx = 0, length = aggregates.length; idx < length; idx++) {
                aggregate = aggregates[idx];
                result[aggregate.Member] = $.extend(true, result[aggregate.Member], translateAggregateResults(aggregate));
            }
            return result;
        }
    };

    kendo.data.transports["aspnetmvc-server"] = kendo.data.RemoteTransport.extend({
        init: function(options) {
            kendo.data.RemoteTransport.fn.init.call(this, $.extend(options, { parameterMap: $.proxy(parameterMap, this) } ));
        },
        read: function(options) {
            var url;
            options = this.setup(options, "read");
            url = options.url;

            if (url.indexOf("?") >= 0) {
                url += "&";
            } else {
                url += "?";
            }

            url += $.map(options.data, function(value, key) {
                return key + "=" + value;
            }).join("&");

            location.href = url;
        }
    });
})(jQuery);
