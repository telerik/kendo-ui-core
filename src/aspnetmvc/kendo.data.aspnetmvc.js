(function(f, define){
    define([ "../kendo.data", "../kendo.combobox", "../kendo.multiselect", "../kendo.validator" ], f);
})(function(){

(function ($, undefined) {
    var kendo = window.kendo,
        escapeQuoteRegExp = /'/ig,
        extend = $.extend,
        isArray = $.isArray,
        isPlainObject = $.isPlainObject,
        POINT = ".";

    function parameterMap(options, operation, encode, stringifyDates) {
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
           result[this.options.prefix + "filter"] = serializeFilter(options.filter, encode);

           delete options.filter;
       } else {
           result[this.options.prefix + "filter"] = "";
           delete options.filter;
       }

       delete options.take;
       delete options.skip;

       serializeItem(result, options, "", stringifyDates);

       return result;
    }

    function convertNumber(value){
        var separator = kendo.culture().numberFormat[POINT];
        value = value.toString().replace(POINT, separator);

        return value;
    }

    function convert(value, stringifyDates) {
        if (value instanceof Date) {
            if (stringifyDates) {
                value = kendo.stringify(value).replace(/"/g, "");
            } else {
                value = kendo.format("{0:G}", value);
            }
        } else if (typeof value === "number") {
            value = convertNumber(value);
        }

        return value;
    }

    function serialize(result, value, data, key, prefix, stringifyDates) {
        if (isArray(value)) {
            serializeArray(result, value, prefix, stringifyDates);
        } else if (isPlainObject(value)) {
            serializeItem(result, value, prefix, stringifyDates);
        } else {
            if (result[prefix] === undefined) {
                result[prefix] = data[key]  = convert(value, stringifyDates);
            }
        }
    }

    function serializeItem(result, data, prefix, stringifyDates) {
        for (var key in data) {
            var valuePrefix = prefix ? prefix + "." + key : key,
                value = data[key];
            serialize(result, value, data, key, valuePrefix, stringifyDates);
        }
    }

    function serializeArray(result, data, prefix, stringifyDates) {
        for (var sourceIndex = 0, destinationIndex = 0; sourceIndex < data.length; sourceIndex++) {
            var value = data[sourceIndex],
                key = "[" + destinationIndex + "]",
                valuePrefix = prefix + key;
            serialize(result, value, data, key, valuePrefix, stringifyDates);

            destinationIndex++;
        }
    }

    function serializeFilter(filter, encode) {
       if (filter.filters) {
           return $.map(filter.filters, function(f) {
               var hasChildren = f.filters && f.filters.length > 1,
                   result = serializeFilter(f, encode);

               if (result && hasChildren) {
                   result = "(" + result + ")";
               }

               return result;
           }).join("~" + filter.logic + "~");
       }

       if (filter.field) {
           return filter.field + "~" + filter.operator + "~" + encodeFilterValue(filter.value, encode);
       } else {
           return undefined;
       }
    }

    function encodeFilterValue(value, encode) {
       if (typeof value === "string") {
           if (value.indexOf('Date(') > -1) {
               value = new Date(parseInt(value.replace(/^\/Date\((.*?)\)\/$/, '$1'), 10));
           } else {
               value = value.replace(escapeQuoteRegExp, "''");

               if (encode) {
                   value = encodeURIComponent(value);
               }

               return "'" + value + "'";
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
           hasSubgroups: group.HasSubgroups || group.hasSubgroups || false,
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

    function convertAggregates(aggregates) {
        var idx, length, aggregate;
        var result = {};

        for (idx = 0, length = aggregates.length; idx < length; idx++) {
            aggregate = aggregates[idx];
            result[aggregate.Member] = extend(true, result[aggregate.Member], translateAggregateResults(aggregate));
        }

        return result;
    }

    extend(true, kendo.data, {
        schemas: {
            "aspnetmvc-ajax": {
                groups: function(data) {
                    return $.map(this._dataAccessFunction(data), translateGroup);
                },
                aggregates: function(data) {
                    data = data.d || data;
                    var aggregates = data.AggregateResults || [];

                    if (!$.isArray(aggregates)) {
                        for (var key in aggregates) {
                            aggregates[key] = convertAggregates(aggregates[key]);
                        }

                        return aggregates;
                    }

                    return convertAggregates(aggregates);
                }
            }
        }
    });

    extend(true, kendo.data, {
        transports: {
            "aspnetmvc-ajax": kendo.data.RemoteTransport.extend({
                init: function(options) {
                    var that = this,
                        stringifyDates = (options || {}).stringifyDates;

                    kendo.data.RemoteTransport.fn.init.call(this,
                        extend(true, {}, this.options, options, {
                            parameterMap: function(options, operation) {
                                return parameterMap.call(that, options, operation, false, stringifyDates);
                            }
                        })
                    );
                },
                read: function(options) {
                    var data = this.options.data,
                        url = this.options.read.url;

                    if (isPlainObject(data)) {
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
       schemas: {
           "webapi": kendo.data.schemas["aspnetmvc-ajax"]
       }
    })

    extend(true, kendo.data, {
        transports: {
            "webapi": kendo.data.RemoteTransport.extend({
                init: function(options) {
                    var that = this;
                    var stringifyDates = (options || {}).stringifyDates;

                    if (options.update) {
                        var updateUrl = typeof options.update === "string" ? options.update : options.update.url;

                        options.update = extend(options.update, {url: function (data) {
                            return kendo.format(updateUrl, data[options.idField]);
                        }});
                    }

                    if (options.destroy) {
                        var destroyUrl = typeof options.destroy === "string" ? options.destroy : options.destroy.url;

                        options.destroy = extend(options.destroy, {url: function (data) {
                            return kendo.format(destroyUrl, data[options.idField]);
                        }});
                    }

                    if(options.create && typeof options.create === "string") {
                        options.create = {
                            url: options.create
                        };
                    }

                    kendo.data.RemoteTransport.fn.init.call(this,
                        extend(true, {}, this.options, options, {
                            parameterMap: function(options, operation) {
                                return parameterMap.call(that, options, operation, false, stringifyDates);
                            }
                        })
                    );
                },
                read: function(options) {
                    var data = this.options.data,
                        url = this.options.read.url;

                    if (isPlainObject(data)) {
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
                        type: "GET"
                    },
                    update: {
                        type: "PUT"
                    },
                    create: {
                        type: "POST"
                    },
                    destroy: {
                        type: "DELETE"
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
                    var that = this;

                    kendo.data.RemoteTransport.fn.init.call(this,
                        extend(options, {
                            parameterMap: function(options, operation) {
                                return parameterMap.call(that, options, operation, true);
                            }
                        }
                    ));
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
                        query = query.replace(/(.*?=.*?)&/g, function(match){
                            if(url.indexOf(match.substr(0, match.indexOf("="))) >= 0){
                               return "";
                            }
                            return match;
                        });
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

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
