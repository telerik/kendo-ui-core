(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "data.odata",
    name: "OData",
    category: "framework",
    depends: [ "core" ],
    hidden: true
};

(function($, undefined) {
    var kendo = window.kendo,
        extend = $.extend,
        NEWLINE = "\r\n",
        DOUBLELINE = "\r\n\r\n",
        isFunction = kendo.isFunction,
        odataFilters = {
            eq: "eq",
            neq: "ne",
            gt: "gt",
            gte: "ge",
            lt: "lt",
            lte: "le",
            contains : "substringof",
            doesnotcontain: "substringof",
            endswith: "endswith",
            startswith: "startswith",
            isnull: "eq",
            isnotnull: "ne",
            isempty: "eq",
            isnotempty: "ne"
        },
        odataFiltersVersionFour = extend({}, odataFilters, {
            contains: "contains"
        }),
        mappers = {
            pageSize: $.noop,
            page: $.noop,
            filter: function(params, filter, useVersionFour) {
                if (filter) {
                    filter = toOdataFilter(filter, useVersionFour);
                    if (filter) {
                        params.$filter = filter;
                    }
                }
            },
            sort: function(params, orderby) {
                var expr = $.map(orderby, function(value) {
                    var order = value.field.replace(/\./g, "/");

                    if (value.dir === "desc") {
                        order += " desc";
                    }

                    return order;
                }).join(",");

                if (expr) {
                    params.$orderby = expr;
                }
            },
            skip: function(params, skip) {
                if (skip) {
                    params.$skip = skip;
                }
            },
            take: function(params, take) {
                if (take) {
                    params.$top = take;
                }
            }
        },
        defaultDataType = {
            read: {
                dataType: "jsonp"
            }
        };

    function toOdataFilter(filter, useOdataFour) {
        var result = [],
            logic = filter.logic || "and",
            idx,
            length,
            field,
            type,
            format,
            operator,
            value,
            ignoreCase,
            filters = filter.filters;

        for (idx = 0, length = filters.length; idx < length; idx++) {
            filter = filters[idx];
            field = filter.field;
            value = filter.value;
            operator = filter.operator;

            if (filter.filters) {
                filter = toOdataFilter(filter, useOdataFour);
            } else {
                ignoreCase = filter.ignoreCase;
                field = field.replace(/\./g, "/");
                filter = odataFilters[operator];
                if (useOdataFour) {
                    filter = odataFiltersVersionFour[operator];
                }

                if (operator === "isnull" || operator === "isnotnull") {
                    filter = kendo.format("{0} {1} null", field, filter);
                } else if (operator === "isempty" || operator === "isnotempty") {
                    filter = kendo.format("{0} {1} ''", field, filter);
                } else if (filter && value !== undefined) {
                    type = $.type(value);
                    if (type === "string") {
                        format = "'{1}'";
                        value = value.replace(/'/g, "''");

                        if (ignoreCase === true) {
                            field = "tolower(" + field + ")";
                        }

                    } else if (type === "date") {
                        if (useOdataFour) {
                            format = "{1:yyyy-MM-ddTHH:mm:ss+00:00}";
                            value = kendo.timezone.apply(value, 'Etc/UTC');
                        } else {
                            format = "datetime'{1:yyyy-MM-ddTHH:mm:ss}'";
                        }
                    } else {
                        format = "{1}";
                    }

                    if (filter.length > 3) {
                        if (filter !== "substringof") {
                            format = "{0}({2}," + format + ")";
                        } else {
                            format = "{0}(" + format + ",{2})";
                            if (operator === "doesnotcontain") {
                                if (useOdataFour) {
                                    format = "{0}({2},'{1}') eq -1";
                                    filter = "indexof";
                                } else {
                                    format += " eq false";
                                }
                            }
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

    function stripMetadata(obj) {
        for (var name in obj) {
            if(name.indexOf("@odata") === 0) {
                delete obj[name];
            }
        }
    }

    function hex16() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substr(1);
    }

    function createBoundary(prefix) {
        return prefix + hex16() + '-' + hex16() + '-' + hex16();
    }

    function createDelimeter(boundary, close) {
        var result = NEWLINE + "--" + boundary;

        if (close) {
            result += "--";
        }

        return result;
    }

    function createCommand(transport, item, httpVerb, command) {
         var transportUrl = transport.options[command].url;
         var commandPrefix = kendo.format("{0} ", httpVerb);

         if (isFunction(transportUrl)) {
             return commandPrefix + transportUrl(item);
         } else {
             return commandPrefix + transportUrl;
         }
    }

    function getOperationHeader(changeset, changeId) {
        var header = "";

        header += createDelimeter(changeset, false);
        header += NEWLINE + 'Content-Type: application/http';
        header += NEWLINE + 'Content-Transfer-Encoding: binary';
        header += NEWLINE + 'Content-ID: ' + changeId;

        return header;
    }

    function getOperationContent(item) {
        var content = "";

        content += NEWLINE + "Content-Type: application/json;odata=minimalmetadata";
        content += NEWLINE + "Prefer: return=representation";
        content += DOUBLELINE + kendo.stringify(item);

        return content;
    }

    function getOperations(collection, changeset, changeId, command, transport, skipContent) {
        var requestBody = "";

        for (var i = 0; i < collection.length; i++) {
            requestBody += getOperationHeader(changeset, changeId);
            requestBody += DOUBLELINE + createCommand(transport, collection[i], transport.options[command].type, command) + ' HTTP/1.1';
            if (!skipContent) {
                requestBody += getOperationContent(collection[i]);
            }
            requestBody += NEWLINE;
            changeId++;
        }

        return requestBody;
    }

    function processCollection(colection, boundary, changeset, changeId, transport, command, skipContent) {
        var requestBody = "";

        requestBody += getBoundary(boundary, changeset);
        requestBody += getOperations(colection, changeset, changeId, command, transport, skipContent);
        requestBody += createDelimeter(changeset, true);
        requestBody += NEWLINE;

        return requestBody;
    }

    function getBoundary(boundary,changeset) {
        var requestBody = "";

        requestBody += "--" + boundary + NEWLINE;
        requestBody += "Content-Type: multipart/mixed; boundary=" + changeset + NEWLINE;

        return requestBody;
    }

    function createBatchRequest(transport, colections) {
        var options = {};
        var boundary = createBoundary("sf_batch_");
        var requestBody = "";
        var changeId = 0;
        var batchURL = transport.options.batch.url;
        var changeset = createBoundary("sf_changeset_");

        options.type = transport.options.batch.type;
        options.url = isFunction(batchURL) ? batchURL() : batchURL;
        options.headers = {
            "Content-Type": "multipart/mixed; boundary=" + boundary
        };

        if (colections.updated.length) {
            requestBody += processCollection(colections.updated, boundary, changeset, changeId, transport, "update", false);
            changeId += colections.updated.length;
            changeset = createBoundary("sf_changeset_");
        }

        if (colections.destroyed.length) {
            requestBody += processCollection(colections.destroyed, boundary, changeset, changeId, transport, "destroy", true);
            changeId += colections.destroyed.length;
            changeset = createBoundary("sf_changeset_");
        }

        if (colections.created.length) {
            requestBody += processCollection(colections.created, boundary, changeset, changeId, transport, "create", false);
        }

        requestBody += createDelimeter(boundary, true);

        options.data = requestBody;

        return options;
    }

    function parseBatchResponse(responseText) {
        var responseMarkers = responseText.match(/--changesetresponse_[a-z0-9-]+$/gm);
        var markerIndex = 0;
        var collections = [];
        var changeBody;
        var status;
        var code;
        var marker;
        var jsonModel;

        collections.push({ models: [], passed: true });

        for (var i = 0; i < responseMarkers.length; i++) {
            marker = responseMarkers[i];
            if (marker.lastIndexOf('--', marker.length - 1)) {
                if (i < responseMarkers.length - 1) {
                    collections.push({ models: [], passed: true });
                }
                continue;
            }

            if (!markerIndex) {
                markerIndex = responseText.indexOf(marker);
            } else {
                markerIndex = responseText.indexOf(marker, markerIndex + marker.length);
            }

            changeBody = responseText.substring(markerIndex, responseText.indexOf("--", markerIndex + 1));
            status = changeBody.match(/^HTTP\/1\.\d (\d{3}) (.*)$/gm).pop();
            code = kendo.parseFloat(status.match(/\d{3}/g).pop());

            if (code >= 200 && code <= 299) {
                jsonModel = changeBody.match(/\{.*\}/gm);
                if (jsonModel) {
                    collections[collections.length - 1].models.push(JSON.parse(jsonModel[0]));
                }
            } else {
                collections[collections.length - 1].passed = false;
            }

        }

        return collections;
    }

    extend(true, kendo.data, {
        schemas: {
            odata: {
                type: "json",
                data: function(data) {
                    return data.d.results || [data.d];
                },
                total: "d.__count"
            }
        },
        transports: {
            odata: {
                read: {
                    cache: true, // to prevent jQuery from adding cache buster
                    dataType: "jsonp",
                    jsonp: "$callback"
                },
                update: {
                    cache: true,
                    dataType: "json",
                    contentType: "application/json", // to inform the server the the request body is JSON encoded
                    type: "PUT" // can be PUT or MERGE
                },
                create: {
                    cache: true,
                    dataType: "json",
                    contentType: "application/json",
                    type: "POST" // must be POST to create new entity
                },
                destroy: {
                    cache: true,
                    dataType: "json",
                    type: "DELETE"
                },
                parameterMap: function(options, type, useVersionFour) {
                    var params,
                        value,
                        option,
                        dataType;

                    options = options || {};
                    type = type || "read";
                    dataType = (this.options || defaultDataType)[type];
                    dataType = dataType ? dataType.dataType : "json";

                    if (type === "read") {
                        params = {
                            $inlinecount: "allpages"
                        };

                        if (dataType != "json") {
                            params.$format = "json";
                        }

                        for (option in options) {
                            if (mappers[option]) {
                                mappers[option](params, options[option], useVersionFour);
                            } else {
                                params[option] = options[option];
                            }
                        }
                    } else {
                        if (dataType !== "json") {
                            throw new Error("Only json dataType can be used for " + type + " operation.");
                        }

                        if (type !== "destroy") {
                            for (option in options) {
                                value = options[option];
                                if (typeof value === "number") {
                                    options[option] = value + "";
                                }
                            }

                            params = kendo.stringify(options);
                        }
                    }

                    return params;
                }
            }
        }
    });

    extend(true, kendo.data, {
        schemas: {
            "odata-v4": {
                type: "json",
                data: function(data) {
                    if ($.isArray(data)) {
                        for (var i = 0; i < data.length; i++) {
                            stripMetadata(data[i]);
                        }
                        return data;
                    } else {
                        data = $.extend({}, data);
                        stripMetadata(data);

                        if (data.value) {
                            return data.value;
                        }
                        return [data];
                    }
                },
                total: function(data) {
                    return data["@odata.count"];
                }
            }
        },
        transports: {
            "odata-v4": {
                batch: {
                    type: "POST"
                },
                read: {
                    cache: true, // to prevent jQuery from adding cache buster
                    dataType: "json"
                },
                update: {
                    cache: true,
                    dataType: "json",
                    contentType: "application/json;IEEE754Compatible=true", // to inform the server the the request body is JSON encoded
                    type: "PUT" // can be PUT or MERGE
                },
                create: {
                    cache: true,
                    dataType: "json",
                    contentType: "application/json;IEEE754Compatible=true",
                    type: "POST" // must be POST to create new entity
                },
                destroy: {
                    cache: true,
                    dataType: "json",
                    type: "DELETE"
                },
                parameterMap: function(options, type) {
                    var result = kendo.data.transports.odata.parameterMap(options, type, true);
                    if (type == "read") {
                        result.$count = true;
                        delete result.$inlinecount;
                    }

                    return result;
                },
                submit: function(e) {
                    var that = this;
                    var options = createBatchRequest(that, e.data);
                    var collections = e.data;

                    if (!collections.updated.length && !collections.destroyed.length && !collections.created.length) {
                        return;
                    }

                    $.ajax(extend(true, {}, {
                        success: function (response) {
                            var responses = parseBatchResponse(response);
                            var index = 0;
                            var current;

                            if (collections.updated.length) {
                                current = responses[index];
                                if (current.passed) {
                                    // Pass either the obtained models or an empty array if only status codes are returned.
                                    e.success(current.models.length ? current.models : [], "update");
                                }
                                index++;
                            }
                            if (collections.destroyed.length) {
                                current = responses[index];
                                if (current.passed) {
                                    // For delete operations OData returns only status codes.
                                    // Passing empty array to datasource will force it to correctly remove the deleted items from the pristine collection.
                                    e.success([], "destroy");
                                }
                                index++;
                            }
                            if (collections.created.length) {
                                current = responses[index];
                                if (current.passed) {
                                    e.success(current.models, "create");
                                }
                            }
                        },
                        error: function (response, status, error) {
                            e.error(response, status, error);
                        }
                    }, options));
                }
            }
        }
    });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
