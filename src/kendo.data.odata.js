(function($, undefined) {
    var kendo = window.kendo,
        odataFilters = {
            eq: "eq",
            neq: "ne",
            gt: "gt",
            gte: "ge",
            lt: "lt",
            lte: "le",
            contains : "substringof",
            endswith: "endswith",
            startswith: "startswith"
        };

    function toOdataFilter(filter) {
        var result = [],
            logic = filter.logic || "and",
            idx,
            length,
            field,
            format,
            operator,
            value,
            filters = filter.filters;

        for (idx = 0, length = filters.length; idx < length; idx++) {
            filter = filters[idx];
            field = filter.field;
            value = filter.value;
            operator = filter.operator;

            if (filter.filters) {
                filter = toOdataFilter(filter);
            } else {
                field = field.replace(/\./g, "/"),

                filter = odataFilters[operator];

                if (filter && value !== undefined) {
                    format = typeof value === "string" ? "'{1}'" : "{1}";

                    if (filter.length > 3) {
                        if (filter !== "substringof") {
                            format = "{0}({2}," + format + ")";
                        } else {
                            format = "{0}(" + format + ",{2})";
                        }
                    } else {
                        format = "{2} {0} " + format;
                    }

                    filter = kendo.format(format, filter, value, field);
                }
            }

            result.push(filter);
        }

        filter = result.join(" " + logic + " ");

        if (result.length > 1) {
            filter = "(" + filter + ")";
        }

        return filter;
    }

    $.extend(true, kendo.data, {
        schemas: {
            odata: {
                type: "json",
                data: "d.results",
                total: "d.__count"
            }
        },
        transports: {
            odata: {
                read: {
                    cache: true, // to prevent jQuery from adding cache buster
                    dataType: "jsonp",
                    jsonpCallback: "callback", //required by OData
                    jsonp: false // to prevent jQuery from adding the jsonpCallback in the query string - we will add it ourselves
                },
                parameterMap: function(options) {
                    var result = ["$format=json", "$inlinecount=allpages", "$callback=callback"],
                        data = options || {};

                    if (data.skip) {
                        result.push("$skip=" + data.skip);
                    }

                    if (data.take) {
                        result.push("$top=" + data.take);
                    }

                    if (data.sort) {
                        result.push("$orderby=" + $.map(data.sort, function(value) {
                            var order = value.field.replace(/\./g, "/");

                            if (value.dir === "desc") {
                                order += " desc";
                            }

                            return order;
                        }).join(","));
                    }

                    if (data.filter) {
                        result.push("$filter=" + toOdataFilter(data.filter));
                    }

                    return result.join("&");
                }
            }
        }
    });
})(jQuery);
