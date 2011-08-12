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
                dialect: function(options) {
                    var result = ["$format=json", "$inlinecount=allpages", "$callback=callback"],
                        data = options || {};

                    if ("skip" in data) {
                        result.push("$skip=" + data.skip);
                    }

                    if ("take" in data) {
                        result.push("$top=" + data.take);
                    }

                    if ("sort" in data) {
                        result.push("$orderby=" + $.map(data.sort, function(value) {
                            var order = value.field.replace(/\./g, "/");

                            if (value.dir === "desc") {
                                order += " desc";
                            }

                            return order;
                        }).join(","));
                    }

                    if ("filter" in data) {
                        result.push("$filter=" + $.map(data.filter, function(filter) {
                            var value = filter.value,
                                field = filter.field.replace(/\./g, "/"),
                                format = typeof value === "string" ? "'{1}'" : "{1}";

                            filter = odataFilters[filter.operator];

                            if (filter && value !== undefined) {
                                if (filter.length > 3) {
                                    if (filter !== "substringof") {
                                        format = "{0}({2}," + format + ")";
                                    } else {
                                        format = "{0}(" + format + ",{2})";
                                    }
                                } else {
                                    format = "{2} {0} " + format;
                                }
                                return kendo.format(format, filter, value, field);
                            }
                        }).join(" and "));
                    }
                    return result.join("&");
                }
            }
        }
    });
})(jQuery);
