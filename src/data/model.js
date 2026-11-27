import { extend, isPlainObject, toString } from "./common.js";
import { $ } from "../core/services/kendo-jquery.service.js";
import { dateParserService } from "../core/services/date-parser.service.js";
import { numberParserService } from "../core/services/number-parser.service.js";
import { typeUtilsService } from "../core/services/type-utils.service.js";
import { ObservableObject } from "./observable-object.js";
function isModelFieldDefinition(value) {
    return Boolean(value) && isPlainObject(value);
}
export function equal(x, y) {
    if (x === y) {
        return true;
    }
    const xtype = typeUtilsService.type(x);
    const ytype = typeUtilsService.type(y);
    let field;
    if (xtype !== ytype) {
        return false;
    }
    if (xtype === "date") {
        return x.getTime() === y.getTime();
    }
    if (xtype !== "object" && xtype !== "array") {
        return false;
    }
    for (field in x) {
        if (!equal(x[field], y[field])) {
            return false;
        }
    }
    return true;
}
export const parsers = {
    number: function (value) {
        if (typeof value === "string" && value.toLowerCase() === "null") {
            return null;
        }
        return numberParserService.parseFloat(value);
    },
    date: function (value) {
        if (typeof value === "string" && value.toLowerCase() === "null") {
            return null;
        }
        return dateParserService.parseDate(value);
    },
    boolean: function (value) {
        if (typeof value === "string") {
            if (value.toLowerCase() === "null") {
                return null;
            }
            else {
                return value.toLowerCase() === "true";
            }
        }
        return value != null ? !!value : value;
    },
    string: function (value) {
        if (typeof value === "string" && value.toLowerCase() === "null") {
            return null;
        }
        return value != null ? value + "" : value;
    },
    default: function (value) {
        return value;
    }
};
export const defaultValues = {
    string: "",
    number: 0,
    date: new Date(),
    boolean: false,
    default: ""
};
export function getFieldByName(obj, name) {
    let field;
    let fieldName;
    for (fieldName in obj) {
        field = obj[fieldName];
        if (isModelFieldDefinition(field) && field.field && field.field === name) {
            return field;
        }
        else if (field === name) {
            return field;
        }
    }
    return null;
}
export class Model extends ObservableObject {
    static define(base, options) {
        if (options === undefined) {
            options = base;
            base = Model;
        }
        let model;
        const proto = extend({
            defaults: {}
        }, options);
        let name;
        let field;
        let type;
        let value;
        let idx;
        let length;
        const fields = {};
        let originalName;
        const id = proto.id;
        const functionFields = [];
        let protoFields = (proto.fields || {});
        if (id) {
            proto.idField = id;
        }
        if (proto.id) {
            delete proto.id;
        }
        if (id) {
            proto.defaults[id] = proto._defaultId = "";
        }
        if (toString.call(proto.fields) === "[object Array]") {
            for (idx = 0, length = proto.fields.length; idx < length; idx++) {
                field = proto.fields[idx];
                if (typeof field === "string") {
                    fields[field] = {};
                }
                else if (field.field) {
                    fields[field.field] = field;
                }
            }
            proto.fields = fields;
            protoFields = proto.fields;
        }
        for (name in protoFields) {
            field = protoFields[name];
            type = isModelFieldDefinition(field) ? field.type || "default" : "default";
            value = null;
            originalName = name;
            const nameToUse = isModelFieldDefinition(field) && typeof field.field === "string" ? field.field : name;
            if (!isModelFieldDefinition(field) || !field.nullable || field.defaultValue) {
                value = proto.defaults[originalName !== nameToUse ? originalName : nameToUse] = isModelFieldDefinition(field) && field.defaultValue !== undefined ? field.defaultValue : defaultValues[type.toLowerCase()];
                if (typeof value === "function") {
                    functionFields.push(nameToUse);
                }
            }
            if (options.id === nameToUse) {
                proto._defaultId = value;
            }
            proto.defaults[originalName !== nameToUse ? originalName : nameToUse] = value;
            if (isModelFieldDefinition(field)) {
                field.parse = field.parse || parsers[type];
            }
            else {
                field = {
                    parse: parsers[type]
                };
            }
        }
        if (functionFields.length > 0) {
            proto._initializers = functionFields;
        }
        model = base.extend(proto);
        model.define = function (options) {
            return Model.define(model, options);
        };
        if (proto.fields) {
            model.fields = proto.fields;
            model.idField = proto.idField;
        }
        return model;
    }
    constructor(data = {}) {
        super();
        if (this.init === Model.prototype.init) {
            this.init(data);
        }
    }
    init(data = {}) {
        let idx;
        const that = this;
        if (!data || $.isEmptyObject(data)) {
            data = $.extend({}, that.defaults, data);
            if (that._initializers) {
                for (idx = 0; idx < that._initializers.length; idx++) {
                    const name = that._initializers[idx];
                    data[name] = that.defaults[name]();
                }
            }
        }
        super.init(data);
        that.dirty = false;
        that.dirtyFields = {};
        if (that.idField) {
            that.id = that.get(that.idField);
            if (that.id === undefined) {
                that.id = that._defaultId;
            }
        }
    }
    shouldSerialize(field) {
        return super.shouldSerialize(field) && field !== "uid" && !(this.idField !== "id" && field === "id") && field !== "dirty" && field !== "dirtyFields" && field !== "_accessors";
    }
    editable(field) {
        const fieldDefinition = (this.fields || {})[field];
        return isModelFieldDefinition(fieldDefinition) ? fieldDefinition.editable !== false : true;
    }
    set(field, value) {
        const that = this;
        const dirty = that.dirty;
        if (that.editable(field)) {
            value = that._parse(field, value);
            if (!equal(value, that.get(field))) {
                that.dirty = true;
                that.dirtyFields[field] = true;
                if (super.set(field, value) && !dirty) {
                    that.dirty = dirty;
                    if (!that.dirty) {
                        that.dirtyFields[field] = false;
                    }
                }
            }
            else {
                that.trigger("equalSet", {
                    field: field,
                    value: value
                });
            }
        }
        return false;
    }
    accept(data) {
        const that = this;
        const parent = function () {
            return that;
        };
        let field;
        for (field in data) {
            let value = data[field];
            if (field.charAt(0) != "_") {
                value = that.wrap(data[field], field, parent);
            }
            that._set(field, value);
        }
        if (that.idField) {
            that.id = that.get(that.idField);
        }
        that.dirty = false;
        that.dirtyFields = {};
    }
    isNew() {
        return this.id === this._defaultId;
    }
    _parse(field, value) {
        const that = this;
        const fieldName = field;
        const fields = that.fields || {};
        let fieldDefinition = fields[fieldName];
        let parse;
        if (!fieldDefinition) {
            fieldDefinition = getFieldByName(fields, fieldName) || undefined;
        }
        if (fieldDefinition && isModelFieldDefinition(fieldDefinition)) {
            parse = fieldDefinition.parse;
            if (!parse && fieldDefinition.type) {
                parse = parsers[fieldDefinition.type.toLowerCase()];
            }
        }
        return parse ? parse(value) : value;
    }
    _notifyChange(e) {
        const action = e.action;
        if ((action == "add" || action == "remove") && e.field) {
            this.dirty = true;
            this.dirtyFields[e.field] = true;
        }
    }
}
Model.applyEnumerablePrototype();
Model.applyPrototypeMembers();
