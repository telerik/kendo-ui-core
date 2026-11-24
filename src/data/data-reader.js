import { Class } from "../core/base/class.js";
import { propertyAccessService } from "../core/services/property-access.service.js";
import { each, getter, identity, isEmptyObject, isPlainObject, toString } from "./common.js";
import { Model } from "./model.js";
import { ObservableArray } from "./observable-array.js";
function isModelConstructor(value) {
    return typeof value === "function" && "define" in value;
}
function isModelFieldDefinition(value) {
    return isPlainObject(value);
}
export function serializeRecords(data, getters, _modelInstance, _originalFieldNames, fieldNames) {
    let record;
    let getter;
    let originalName;
    let idx;
    const setters = {};
    let length;
    for (idx = 0, length = data.length; idx < length; idx++) {
        record = data[idx];
        for (getter in getters) {
            originalName = fieldNames[getter];
            if (originalName && originalName !== getter) {
                if (!setters[originalName]) {
                    setters[originalName] = propertyAccessService.setter(originalName);
                }
                setters[originalName](record, getters[getter](record));
                delete record[getter];
            }
        }
    }
}
export function convertRecords(data, getters, modelInstance, _originalFieldNames, fieldNames) {
    let record;
    let getter;
    let originalName;
    let idx;
    let length;
    for (idx = 0, length = data.length; idx < length; idx++) {
        record = data[idx];
        for (getter in getters) {
            record[getter] = modelInstance._parse(getter, getters[getter](record));
            originalName = fieldNames[getter];
            if (originalName && originalName !== getter) {
                delete record[originalName];
            }
        }
    }
}
export function convertGroup(data, getters, modelInstance, originalFieldNames, fieldNames) {
    let record;
    let idx;
    let fieldName;
    let length;
    for (idx = 0, length = data.length; idx < length; idx++) {
        record = data[idx];
        fieldName = originalFieldNames[record.field];
        if (fieldName && fieldName != record.field) {
            record.field = fieldName;
        }
        record.value = modelInstance._parse(record.field, record.value);
        if (record.items) {
            if (record.hasSubgroups) {
                convertGroup(record.items, getters, modelInstance, originalFieldNames, fieldNames);
            }
            else {
                convertRecords(record.items, getters, modelInstance, originalFieldNames, fieldNames);
            }
        }
    }
}
export function wrapDataAccess(originalFunction, model, converter, getters, originalFieldNames, fieldNames) {
    return function (data) {
        data = originalFunction(data);
        return wrapDataAccessBase(model, converter, getters, originalFieldNames, fieldNames)(data);
    };
}
export function wrapDataAccessBase(model, converter, getters, originalFieldNames, fieldNames) {
    return function (data) {
        if (data && !isEmptyObject(getters)) {
            if (toString.call(data) !== "[object Array]" && !(data instanceof ObservableArray)) {
                data = [data];
            }
            converter(data, getters, new model(), originalFieldNames, fieldNames);
        }
        return data || [];
    };
}
export class DataReader extends Class {
    static parse = identity;
    static data = identity;
    static groups = identity;
    constructor(schema) {
        super();
        if (this.init === DataReader.prototype.init) {
            this.init(schema);
        }
    }
    init(schema = {}) {
        const that = this;
        let member;
        let get;
        let model;
        let base;
        for (member in schema) {
            get = schema[member];
            that[member] = typeof get === "string" ? getter(get) : get;
        }
        base = (schema.modelBase || Model);
        if (isPlainObject(that.model)) {
            that.model = model = base.define(that.model);
        }
        else if (isModelConstructor(that.model)) {
            model = that.model;
        }
        const dataFunction = that.data.bind(that);
        that._dataAccessFunction = dataFunction;
        if (that.model) {
            const groupsFunction = that.groups.bind(that);
            const serializeFunction = that.serialize.bind(that);
            const originalFieldNames = {};
            const getters = {};
            const serializeGetters = {};
            const fieldNames = {};
            let shouldSerialize = false;
            let fieldName = "";
            let name = "";
            model = that.model;
            if (model.fields) {
                each(model.fields, function (field, value) {
                    let fromName;
                    fieldName = field;
                    if (isModelFieldDefinition(value) && value.field) {
                        fieldName = value.field;
                    }
                    else if (typeof value === "string") {
                        fieldName = value;
                    }
                    if (isModelFieldDefinition(value) && value.from) {
                        fromName = value.from;
                    }
                    shouldSerialize = shouldSerialize || (fromName && fromName !== field) || fieldName !== field;
                    name = fromName || fieldName;
                    getters[field] = name.indexOf(".") !== -1 ? getter(name, true) : getter(name);
                    serializeGetters[field] = getter(field);
                    originalFieldNames[fromName || fieldName] = field;
                    fieldNames[field] = fromName || fieldName;
                });
                if (!schema.serialize && shouldSerialize) {
                    that.serialize = wrapDataAccess(serializeFunction, model, serializeRecords, serializeGetters, originalFieldNames, fieldNames);
                }
            }
            that._dataAccessFunction = dataFunction;
            that._wrapDataAccessBase = wrapDataAccessBase(model, convertRecords, getters, originalFieldNames, fieldNames);
            that.data = wrapDataAccess(dataFunction, model, convertRecords, getters, originalFieldNames, fieldNames);
            that.groups = wrapDataAccess(groupsFunction, model, convertGroup, getters, originalFieldNames, fieldNames);
        }
    }
    errors(data) {
        return data?.errors || null;
    }
    total(data) {
        return data.length;
    }
    aggregates() {
        return {};
    }
    serialize(data) {
        return data;
    }
}
DataReader.prototype.parse = DataReader.parse;
DataReader.prototype.data = DataReader.data;
DataReader.prototype.groups = DataReader.groups;
DataReader.applyEnumerablePrototype();
DataReader.applyPrototypeMembers();
