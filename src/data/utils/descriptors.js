import { extend, isArray, isEmptyObject, isFunction, isPlainObject } from "../common.js";
import { Query } from "../query.js";
function isMappedFieldDescriptor(descriptor) {
    return !!descriptor && isPlainObject(descriptor);
}
export function fieldNameFromModel(fields, name) {
    if (fields && !isEmptyObject(fields)) {
        const descriptor = fields[name];
        let fieldName = name;
        if (isMappedFieldDescriptor(descriptor)) {
            fieldName = descriptor.from || descriptor.field || name;
        }
        else {
            fieldName = descriptor || name;
        }
        if (isFunction(fieldName)) {
            return name;
        }
        return fieldName;
    }
    return name;
}
export function convertFilterDescriptorsField(descriptor, model) {
    let field;
    let idx;
    let length;
    const target = {};
    for (field in descriptor) {
        if (field !== "filters") {
            target[field] = descriptor[field];
        }
    }
    if (descriptor.filters) {
        target.filters = [];
        for (idx = 0, length = descriptor.filters.length; idx < length; idx++) {
            target.filters[idx] = convertFilterDescriptorsField(descriptor.filters[idx], model);
        }
    }
    else {
        target.field = fieldNameFromModel(model.fields, typeof target.field === "string" ? target.field : String(target.field ?? ""));
    }
    return target;
}
export function convertDescriptorsField(descriptors, model) {
    let field;
    let idx;
    let length;
    const result = [];
    let target;
    let descriptor;
    for (idx = 0, length = descriptors.length; idx < length; idx++) {
        target = {};
        descriptor = descriptors[idx];
        for (field in descriptor) {
            target[field] = descriptor[field];
        }
        target.field = fieldNameFromModel(model.fields, typeof target.field === "string" ? target.field : String(target.field ?? ""));
        if (target.aggregates && isArray(target.aggregates)) {
            target.aggregates = convertDescriptorsField(target.aggregates, model);
        }
        result.push(target);
    }
    return result;
}
export function convertHighlightDescriptors(data, filters, idField) {
    const getHighlightFromResults = function (results, filter) {
        const highlighted = filter.cells && Object.keys(filter.cells).length > 0 ? filter.cells : true;
        const acc = {};
        let idx;
        let length;
        for (idx = 0, length = results.length; idx < length; idx++) {
            const item = results[idx];
            if (item && item.uid !== undefined) {
                const key = String(item[idField]);
                acc[key] = highlighted;
            }
        }
        return acc;
    };
    let results = {};
    let idx;
    let length;
    let filter;
    let filteredData;
    let highlightResults;
    if (!isArray(filters)) {
        return results;
    }
    for (idx = 0, length = filters.length; idx < length; idx++) {
        filter = filters[idx];
        if (filter) {
            const queryData = data;
            filteredData = new Query(queryData).filter(filter).toArray();
            highlightResults = getHighlightFromResults(filteredData, filter);
            if (highlightResults) {
                results = extend(true, results, highlightResults);
            }
        }
    }
    return results;
}
