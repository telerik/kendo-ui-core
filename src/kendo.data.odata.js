(function($) {
    var kendo = window.kendo;

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
                    var result = ["$format=json", "$inlinecount=allpages", "$callback=callback"]
                        data = options || {};

                    if ("skip" in data) {
                        result.push("$skip=" + data.skip);
                    }

                    if ("take" in data) {
                        result.push("$top=" + data.take);
                    }

                    if ("sort" in data) {
                        result.push("$orderby=" + $.map(data.sort, function(value) {
                            var order = value.field;

                            if (value.dir === "desc") {
                                order += " desc";
                            }

                            return order;
                        }).join(","));
                    }

                    return result.join("&");
                }
            }
        }
    });
})(jQuery);
