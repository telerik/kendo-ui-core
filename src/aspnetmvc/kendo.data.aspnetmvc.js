(function ($, undefined) {
    var kendo = window.kendo,
        escapeQuoteRegExp = /'/ig,
        extend = $.extend;

    function parameterMap(options, operation) {
       var result = {};

       if (options.sort) {
           result[this.options.prefix + "sort"] = $.map(options.sort, function(sort) {
               return sort.field + "-" + sort.dir;
           }).join("~");

           delete options.sort;
       } else {
           result[this.options.prefix + "sort"] = "";
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
            result[this.options.prefix + "group"] = $.map(options.group, function(group) {
               return group.field + "-" + group.dir;
           }).join("~");

           delete options.group;
       } else {
            result[this.options.prefix + "group"] = "";
       }

       if (options.aggregate) {
           result[this.options.prefix + "aggregate"] =  $.map(options.aggregate, function(aggregate) {
               return aggregate.field + "-" + aggregate.aggregate;
           }).join("~");

           delete options.aggregate;
       }

       if (options.filter) {
           result[this.options.prefix + "filter"] = serializeFilter(options.filter);

           delete options.filter;
       } else {
           result[this.options.prefix + "filter"] = "";
           delete options.filter;
       }

       if (operation != "read" ) {
           if (options.models) {
               var prefix = "models",
                   models = options.models;

               for (var i = 0; i < models.length; i++) {
                   serializeItem(result, models[i], prefix + "[" + i + "].");
               }
           } else if (options) {
               serializeItem(result, options, "");
           }

           delete options.models;
       }

       delete options.take;
       delete options.skip;

       return extend(result, options);
    }

    function serializeItem(result, item, prefix) {
        var value,
            key;

        item = convert(item);

        for (var member in item) {
            key = prefix + member;
            value = item[member];

            if ($.isPlainObject(value)) {
                flatten(result, value, key);
            }
            else {
                result[key] = value;
            }
        }
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

            if (value == null) {
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
           return $.map(filter.filters, function(f) {
               var hasChildren = f.filters && f.filters.length > 1,
                   result = hasChildren ? "(" : "";

               result += serializeFilter(f);
               return result + (hasChildren ? ")" : "");
           }).join("~" + filter.logic + "~");
       }
       return filter.field + "~" + filter.operator + "~" + encodeFilterValue(filter.value);
    }

    function encodeFilterValue(value) {
       if (typeof value === "string") {
           if (value.indexOf('Date(') > -1) {
               value = new Date(parseInt(value.replace(/^\/Date\((.*?)\)\/$/, '$1'), 10));
           } else {
               return "'" + value.replace(escapeQuoteRegExp, "''") + "'";
           }
       }

       if (value && value.getTime) {
           return "datetime'" + kendo.format("{0:yyyy-MM-ddTHH-mm-ss}", value) + "'";
       }
       return value;
    }


    function translateGroup(group) {
       return {
           value: typeof group.Key !== "undefined" ? group.Key : group.value,
           field: group.Member || group.field,
           hasSubgroups: group.HasSubgroups || group.hasSubgroups,
           aggregates: translateAggregate(group.Aggregates || group.aggregates),
           items: group.HasSubgroups ? $.map(group.Items || group.items, translateGroup) : (group.Items || group.items)
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

    extend(true, kendo.data, {
        schemas: {
            "aspnetmvc-ajax": {
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
                        result[aggregate.Member] = extend(true, result[aggregate.Member], translateAggregateResults(aggregate));
                    }
                    return result;
                }
            }
        }
    });

    extend(true, kendo.data, {
        transports: {
            "aspnetmvc-ajax": kendo.data.RemoteTransport.extend({
                init: function(options) {
                    kendo.data.RemoteTransport.fn.init.call(this, $.extend(true, {}, this.options, options));
                },
                read: function(options) {
                    var data = this.options.data,
                        url = this.options.read.url;
                    if (data) {
                        if (url) {
                            this.options.data = null;
                        }

                        if (!data.Data.length && url) {
                            kendo.data.RemoteTransport.fn.read.call(this, options);
                        } else {
                            options.success(data);
                        }
                    } else {
                        kendo.data.RemoteTransport.fn.read.call(this, options);
                    }
                },
                options: {
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
                }
            })
        }
    });

    extend(true, kendo.data, {
        transports: {
            "aspnetmvc-server": kendo.data.RemoteTransport.extend({
                init: function(options) {
                    kendo.data.RemoteTransport.fn.init.call(this, extend(options, { parameterMap: $.proxy(parameterMap, this) } ));
                },
                read: function(options) {
                    var url,
                        prefix = this.options.prefix,
                        params = [prefix + "sort",
                            prefix + "page",
                            prefix + "pageSize",
                            prefix + "group",
                            prefix + "aggregate",
                            prefix + "filter"],
                        regExp = new RegExp("(" + params.join('|') + ")=[^&]*&?", "g"),
                        query;

                    query = location.search.replace(regExp, "").replace("?", "");

                    if (query.length && !(/&$/.test(query))) {
                        query += "&";
                    }

                    options = this.setup(options, "read");

                    url = options.url;

                    if (url.indexOf("?") >= 0) {
                        url += "&" + query;
                    } else {
                        url += "?" + query;
                    }

                    url += $.map(options.data, function(value, key) {
                        return key + "=" + value;
                    }).join("&");

                    location.href = url;
                }
            })
        }
    });
})(window.kendo.jQuery);
