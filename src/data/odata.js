import { extend, isFunction } from "./common.js";
import { $ } from "../core/services/kendo-jquery.service.js";
import { formatterService } from "../core/services/formatter.service.js";
import { typeUtilsService } from "../core/services/type-utils.service.js";
import { numberParserService } from "../core/services/number-parser.service.js";
const kendo = window.kendo;
const NEWLINE = "\r\n";
const DOUBLELINE = "\r\n\r\n";
function isCompositeFilter(filter) {
    return Array.isArray(filter.filters);
}
const odataFilters = {
    eq: "eq",
    neq: "ne",
    gt: "gt",
    gte: "ge",
    lt: "lt",
    lte: "le",
    contains: "substringof",
    doesnotcontain: "substringof",
    endswith: "endswith",
    startswith: "startswith",
    isnull: "eq",
    isnotnull: "ne",
    isnullorempty: "eq",
    isnotnullorempty: "ne",
    isempty: "eq",
    isnotempty: "ne"
};
const odataFiltersVersionFour = extend({}, odataFilters, {
    contains: "contains"
});
const mappers = {
    pageSize: $.noop,
    page: $.noop,
    filter: function (params, filter, useVersionFour) {
        if (filter) {
            const filterExpression = toOdataFilter(filter, useVersionFour);
            if (filterExpression) {
                params.$filter = filterExpression;
            }
        }
    },
    sort: function (params, orderby) {
        const expr = $.map((orderby || []), function (value) {
            let order = value.field.replace(/\./g, "/");
            if (value.dir === "desc") {
                order += " desc";
            }
            return order;
        }).join(",");
        if (expr) {
            params.$orderby = expr;
        }
    },
    skip: function (params, skip) {
        if (skip) {
            params.$skip = skip;
        }
    },
    take: function (params, take) {
        if (take) {
            params.$top = take;
        }
    }
};
const defaultDataType = {
    read: {
        dataType: "jsonp"
    }
};
function toOdataFilter(filter, useOdataFour = false) {
    if (isCompositeFilter(filter)) {
        const result = filter.filters.map((item) => toOdataFilter(item, useOdataFour)).filter(Boolean);
        const expression = result.join(" " + (filter.logic || "and") + " ");
        if (result.length > 1) {
            return "(" + expression + ")";
        }
        return expression;
    }
    let field = filter.field.replace(/\./g, "/");
    let format = "";
    let value = filter.value;
    const operator = filter.operator;
    const ignoreCase = filter.ignoreCase;
    let mappedOperator = useOdataFour ? odataFiltersVersionFour[operator] : odataFilters[operator];
    if (operator === "isnullorempty") {
        return formatterService.format("({0} {1} null or {0} {1} '')", field, mappedOperator);
    }
    if (operator === "isnotnullorempty") {
        return formatterService.format("({0} {1} null and {0} {1} '')", field, mappedOperator);
    }
    if (operator === "isnull" || operator === "isnotnull") {
        return formatterService.format("{0} {1} null", field, mappedOperator);
    }
    if (operator === "isempty" || operator === "isnotempty") {
        return formatterService.format("{0} {1} ''", field, mappedOperator);
    }
    if (!mappedOperator || value === undefined) {
        return "";
    }
    const valueType = typeUtilsService.type(value);
    if (valueType === "string") {
        format = "'{1}'";
        value = String(value).replace(/'/g, "''");
        if (ignoreCase === true) {
            field = "tolower(" + field + ")";
        }
    }
    else if (valueType === "date") {
        if (useOdataFour) {
            format = "{1:yyyy-MM-ddTHH:mm:ss+00:00}";
            value = kendo.timezone.apply(value, "Etc/UTC");
        }
        else {
            format = "datetime'{1:yyyy-MM-ddTHH:mm:ss}'";
        }
    }
    else {
        format = "{1}";
    }
    if (mappedOperator.length > 3) {
        if (mappedOperator !== "substringof") {
            format = "{0}({2}," + format + ")";
        }
        else {
            format = "{0}(" + format + ",{2})";
            if (operator === "doesnotcontain") {
                if (useOdataFour) {
                    format = "{0}({2},'{1}') eq -1";
                    mappedOperator = "indexof";
                }
                else {
                    format += " eq false";
                }
            }
        }
    }
    else {
        format = "{2} {0} " + format;
    }
    return formatterService.format(format, mappedOperator, value, field);
}
function stripMetadata(obj) {
    let name;
    for (name in obj) {
        if (name.indexOf("@odata") === 0) {
            delete obj[name];
        }
    }
}
function hex16() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substr(1);
}
function createBoundary(prefix) {
    return prefix + hex16() + "-" + hex16() + "-" + hex16();
}
function createDelimeter(boundary, close) {
    let result = NEWLINE + "--" + boundary;
    if (close) {
        result += "--";
    }
    return result;
}
function createCommand(transport, item, httpVerb, command) {
    const transportUrl = transport.options[command].url;
    const commandPrefix = formatterService.format("{0} ", httpVerb);
    if (isFunction(transportUrl)) {
        return commandPrefix + transportUrl(item);
    }
    return commandPrefix + transportUrl;
}
function getOperationHeader(changeset, changeId) {
    let header = "";
    header += createDelimeter(changeset, false);
    header += NEWLINE + "Content-Type: application/http";
    header += NEWLINE + "Content-Transfer-Encoding: binary";
    header += NEWLINE + "Content-ID: " + changeId;
    return header;
}
function getOperationContent(item) {
    let content = "";
    content += NEWLINE + "Content-Type: application/json;odata=minimalmetadata";
    content += NEWLINE + "Prefer: return=representation";
    content += DOUBLELINE + JSON.stringify(item);
    return content;
}
function getOperations(collection, changeset, changeId, command, transport, skipContent) {
    let i;
    let requestBody = "";
    for (i = 0; i < collection.length; i++) {
        requestBody += getOperationHeader(changeset, changeId);
        requestBody += DOUBLELINE + createCommand(transport, collection[i], transport.options[command].type, command) + " HTTP/1.1";
        if (!skipContent) {
            requestBody += getOperationContent(collection[i]);
        }
        requestBody += NEWLINE;
        changeId++;
    }
    return requestBody;
}
function processCollection(collection, boundary, changeset, changeId, transport, command, skipContent) {
    let requestBody = "";
    requestBody += getBoundary(boundary, changeset);
    requestBody += getOperations(collection, changeset, changeId, command, transport, skipContent);
    requestBody += createDelimeter(changeset, true);
    requestBody += NEWLINE;
    return requestBody;
}
function getBoundary(boundary, changeset) {
    let requestBody = "";
    requestBody += "--" + boundary + NEWLINE;
    requestBody += "Content-Type: multipart/mixed; boundary=" + changeset + NEWLINE;
    return requestBody;
}
function createBatchRequest(transport, collections) {
    const options = extend({}, transport.options.batch);
    const boundary = createBoundary("sf_batch_");
    let requestBody = "";
    let changeId = 0;
    const batchURL = transport.options.batch.url;
    let changeset = createBoundary("sf_changeset_");
    options.type = transport.options.batch.type;
    options.url = isFunction(batchURL) ? batchURL() : (batchURL || "");
    options.headers = extend(options.headers || {}, {
        "Content-Type": "multipart/mixed; boundary=" + boundary
    });
    if (collections.updated.length) {
        requestBody += processCollection(collections.updated, boundary, changeset, changeId, transport, "update", false);
        changeId += collections.updated.length;
        changeset = createBoundary("sf_changeset_");
    }
    if (collections.destroyed.length) {
        requestBody += processCollection(collections.destroyed, boundary, changeset, changeId, transport, "destroy", true);
        changeId += collections.destroyed.length;
        changeset = createBoundary("sf_changeset_");
    }
    if (collections.created.length) {
        requestBody += processCollection(collections.created, boundary, changeset, changeId, transport, "create", false);
    }
    requestBody += createDelimeter(boundary, true);
    options.data = requestBody;
    return options;
}
function parseBatchResponse(responseText) {
    let i;
    const responseMarkers = responseText.match(/--changesetresponse_[a-z0-9-]+$/gm);
    let markerIndex = 0;
    const collections = [];
    let changeBody;
    let status;
    let code;
    let marker;
    let jsonModel;
    collections.push({
        models: [],
        passed: true
    });
    if (!responseMarkers) {
        throw new Error("Unexpected OData batch response.");
    }
    for (i = 0; i < responseMarkers.length; i++) {
        marker = responseMarkers[i];
        if (marker.lastIndexOf("--", marker.length - 1)) {
            if (i < responseMarkers.length - 1) {
                collections.push({
                    models: [],
                    passed: true
                });
            }
            continue;
        }
        if (!markerIndex) {
            markerIndex = responseText.indexOf(marker);
        }
        else {
            markerIndex = responseText.indexOf(marker, markerIndex + marker.length);
        }
        changeBody = responseText.substring(markerIndex, responseText.indexOf("--", markerIndex + 1));
        status = changeBody.match(/^HTTP\/1\.\d (\d{3}) (.*)$/gm)?.pop();
        const codeToken = status?.match(/\d{3}/g)?.pop();
        code = codeToken ? numberParserService.parseFloat(codeToken) : null;
        if (code != null && code >= 200 && code <= 299) {
            jsonModel = changeBody.match(/\{.*\}/gm);
            if (jsonModel) {
                collections[collections.length - 1].models.push(JSON.parse(jsonModel[0]));
            }
        }
        else {
            collections[collections.length - 1].passed = false;
        }
    }
    return collections;
}
const type = "json";
function data(data) {
    return data.d.results || [data.d];
}
const total = "d.__count";
const cache = true;
const dataType = "jsonp";
const jsonp = "$callback";
const updateCache = true;
const updateDataType = "json";
const contentType = "application/json";
const updateType = "PUT";
const createCache = true;
const createDataType = "json";
const createContentType = "application/json";
const createType = "POST";
const destroyCache = true;
const destroyDataType = "json";
const destroyType = "DELETE";
function parameterMap(options = {}, type = "read", useVersionFour) {
    let params;
    let value;
    let option;
    let requestDataType;
    const transportConfig = (this?.options || this || defaultDataType);
    requestDataType = transportConfig[type];
    requestDataType = requestDataType ? requestDataType.dataType : "json";
    if (type === "read") {
        params = {
            $inlinecount: "allpages"
        };
        if (requestDataType != "json") {
            params.$format = "json";
        }
        for (option in options) {
            if (mappers[option]) {
                mappers[option](params, options[option], useVersionFour);
            }
            else {
                params[option] = options[option];
            }
        }
    }
    else {
        if (requestDataType !== "json") {
            throw new Error("Only json dataType can be used for " + type + " operation.");
        }
        if (type !== "destroy") {
            for (option in options) {
                value = options[option];
                if (typeof value === "number") {
                    options[option] = value + "";
                }
            }
            params = JSON.stringify(options);
        }
    }
    return params;
}
function odatav4Data(data) {
    let i;
    if (Array.isArray(data)) {
        for (i = 0; i < data.length; i++) {
            stripMetadata(data[i]);
        }
        return data;
    }
    const dataItem = $.extend({}, data);
    stripMetadata(dataItem);
    if (dataItem.value) {
        return dataItem.value;
    }
    return [dataItem];
}
function odatav4Total(data) {
    return data["@odata.count"];
}
const batchType = "POST";
const readCache = true;
const readDataType = "json";
const odatav4UpdateCache = true;
const odatav4UpdateDataType = "json";
const updateContentType = "application/json;IEEE754Compatible=true";
const odatav4UpdateType = "PUT";
const odatav4CreateCache = true;
const odatav4CreateDataType = "json";
const odatav4CreateContentType = "application/json;IEEE754Compatible=true";
const odatav4CreateType = "POST";
const odatav4DestroyCache = true;
const odatav4DestroyDataType = "json";
const odatav4DestroyType = "DELETE";
function odatav4ParameterMap(options = {}, type = "read") {
    const result = parameterMap.call(this, options, type, true);
    if (type == "read" && result && typeof result !== "string") {
        result.$count = true;
        delete result.$inlinecount;
    }
    if (result && typeof result !== "string" && result.$filter) {
        result.$filter = result.$filter.replace(/('[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}')/gi, function (x) {
            return x.substring(1, x.length - 1);
        });
    }
    return result;
}
function submit(e) {
    const that = this;
    const options = createBatchRequest(that, e.data);
    const collections = e.data;
    if (!collections.updated.length && !collections.destroyed.length && !collections.created.length) {
        return;
    }
    $.ajax(extend(true, {}, {
        success: function (response) {
            const responses = parseBatchResponse(response);
            let index = 0;
            let current;
            if (collections.updated.length) {
                current = responses[index];
                if (current.passed) {
                    e.success(current.models.length ? current.models : [], "update");
                }
                index++;
            }
            if (collections.destroyed.length) {
                current = responses[index];
                if (current.passed) {
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
export const odataSchema = {
    type,
    data,
    total
};
export const odataTransport = {
    read: {
        cache,
        dataType,
        jsonp
    },
    update: {
        cache: updateCache,
        dataType: updateDataType,
        contentType,
        type: updateType
    },
    create: {
        cache: createCache,
        dataType: createDataType,
        contentType: createContentType,
        type: createType
    },
    destroy: {
        cache: destroyCache,
        dataType: destroyDataType,
        type: destroyType
    },
    parameterMap
};
export const odataV4Schema = {
    type: "json",
    data: odatav4Data,
    total: odatav4Total
};
export const odataV4Transport = {
    batch: {
        type: batchType
    },
    read: {
        cache: readCache,
        dataType: readDataType
    },
    update: {
        cache: odatav4UpdateCache,
        dataType: odatav4UpdateDataType,
        contentType: updateContentType,
        type: odatav4UpdateType
    },
    create: {
        cache: odatav4CreateCache,
        dataType: odatav4CreateDataType,
        contentType: odatav4CreateContentType,
        type: odatav4CreateType
    },
    destroy: {
        cache: odatav4DestroyCache,
        dataType: odatav4DestroyDataType,
        type: odatav4DestroyType
    },
    parameterMap: odatav4ParameterMap,
    submit
};
