import { CHANGE, FUNCTION, GET, noop, toString } from "./common.js";
import { Observable } from "../core/base/observable.js";
import { propertyAccessService } from "../core/services/property-access.service.js";
import { utilsService } from "../core/services/utils.service.js";
import { ObservableArray } from "./observable-array.js";
let objectKeys = [];
function isBindableParent(value) {
    return !!value && (typeof value === "object" || typeof value === "function");
}
export function eventHandler(context, type, field, prefix) {
    return function (e) {
        const event = {};
        const sourceEvent = e;
        let key;
        for (key in sourceEvent) {
            event[key] = sourceEvent[key];
        }
        if (prefix) {
            event.field = field + "." + sourceEvent.field;
        }
        else {
            event.field = field;
        }
        if (type == CHANGE && context._notifyChange) {
            context._notifyChange(event);
        }
        context.trigger(type, event);
    };
}
export function isPrimitiveType(value) {
    if (value == null || typeof value !== "object") {
        return true;
    }
    const prototype = Object.getPrototypeOf(value);
    return prototype === Object.getPrototypeOf({}) || prototype === Object.getPrototypeOf(new Date());
}
function isDataSourceLike(value) {
    return !!value &&
        typeof value.bind === FUNCTION &&
        typeof value.data === FUNCTION &&
        typeof value.fetch === FUNCTION &&
        typeof value.sync === FUNCTION &&
        typeof value.view === FUNCTION;
}
export function ownKeys(value, ignoreObjectKeys) {
    const props = [];
    let protoKeys = [];
    let keys;
    let filteredObjectKeys;
    let currentValue = value || {};
    if (!isPrimitiveType(currentValue)) {
        protoKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(currentValue)).filter((field) => field.indexOf("__") !== 0);
    }
    keys = Object.getOwnPropertyNames(currentValue).concat(protoKeys);
    filteredObjectKeys = objectKeys.filter(function (key) {
        return keys.indexOf(key) < 0;
    });
    while (currentValue) {
        Object.getOwnPropertyNames(currentValue).forEach(function (prop) {
            if (props.indexOf(prop) === -1 && (!ignoreObjectKeys || filteredObjectKeys.indexOf(prop) < 0)) {
                props.push(prop);
            }
        });
        currentValue = Object.getPrototypeOf(currentValue);
    }
    return props;
}
objectKeys = ownKeys({}, false);
export class ObservableObject extends Observable {
    static parent = noop;
    constructor(value = {}) {
        super();
        if (this.init === ObservableObject.prototype.init) {
            this.init(value);
        }
    }
    init(value = {}) {
        const that = this;
        let member;
        const keys = ownKeys(value, true);
        const parent = function () {
            return that;
        };
        super.init();
        this._handlers = {};
        keys.forEach(function (field) {
            member = value[field];
            if (typeof member === "object" && member && !(member instanceof Date) && field.charAt(0) != "_") {
                member = that.wrap(member, field, parent);
            }
            that[field] = member;
        });
        that.uid = utilsService.guid();
    }
    shouldSerialize(field, serializeFunctions) {
        if (typeof serializeFunctions === "object") {
            serializeFunctions = serializeFunctions && serializeFunctions[field];
        }
        return this.hasOwnProperty(field) && field !== "_handlers" && field !== "_events" && (serializeFunctions || typeof this[field] !== FUNCTION) && field !== "uid";
    }
    forEach(f) {
        let i;
        for (i in this) {
            if (this.shouldSerialize(i)) {
                f(this[i], i);
            }
        }
    }
    toJSON(serializeFunctions) {
        const result = {};
        let value;
        let field;
        for (field in this) {
            if (this.shouldSerialize(field, serializeFunctions)) {
                value = this[field];
                if (value instanceof ObservableObject || value instanceof ObservableArray) {
                    value = value.toJSON(serializeFunctions);
                }
                result[field] = value;
            }
        }
        return result;
    }
    get(field) {
        const that = this;
        let result;
        that.trigger(GET, {
            field: field
        });
        if (field === "this") {
            result = that;
        }
        else {
            result = propertyAccessService.getter(field, true)(that);
        }
        return result;
    }
    set(field, value) {
        const that = this;
        let isSetPrevented = false;
        const composite = field.indexOf(".") >= 0;
        const current = propertyAccessService.getter(field, true)(that);
        if (current !== value) {
            if (current instanceof Observable && this._handlers[field]) {
                if (this._handlers[field].get) {
                    current.unbind(GET, this._handlers[field].get);
                }
                current.unbind(CHANGE, this._handlers[field].change);
            }
            isSetPrevented = that.trigger("set", {
                field: field,
                value: value
            });
            if (!isSetPrevented) {
                if (!composite) {
                    value = that.wrap(value, field, function () {
                        return that;
                    });
                }
                if (!that._set(field, value) || field.indexOf("(") >= 0 || field.indexOf("[") >= 0) {
                    that.trigger(CHANGE, {
                        field: field
                    });
                }
            }
        }
        return isSetPrevented;
    }
    wrap(object, field, parent) {
        const that = this;
        let get;
        let change;
        const type = toString.call(object);
        let wrappedObject = object;
        if (object != null && (type === "[object Object]" || type === "[object Array]")) {
            const isObservableArray = object instanceof ObservableArray;
            const isDataSource = isDataSourceLike(object);
            if (type === "[object Object]" && !isDataSource && !isObservableArray) {
                let observableObject;
                if (object instanceof ObservableObject) {
                    observableObject = object;
                }
                else {
                    observableObject = new ObservableObject(object);
                }
                get = eventHandler(that, GET, field, true);
                observableObject.bind(GET, get);
                change = eventHandler(that, CHANGE, field, true);
                observableObject.bind(CHANGE, change);
                that._handlers[field] = {
                    get: get,
                    change: change
                };
                wrappedObject = observableObject;
            }
            else if (type === "[object Array]" || isObservableArray || isDataSource) {
                let observableArray = object;
                if (!isObservableArray && !isDataSource) {
                    observableArray = new ObservableArray(object, undefined);
                }
                change = eventHandler(that, CHANGE, field, false);
                observableArray.bind(CHANGE, change);
                that._handlers[field] = {
                    change: change
                };
                wrappedObject = observableArray;
            }
            if (isBindableParent(wrappedObject)) {
                wrappedObject.parent = parent;
            }
        }
        return wrappedObject;
    }
    _set(field, value) {
        const that = this;
        const composite = field.indexOf(".") >= 0;
        if (composite) {
            const paths = field.split(".");
            let path = "";
            while (paths.length > 1) {
                path += paths.shift();
                const obj = propertyAccessService.getter(path, true)(that);
                if (obj instanceof ObservableObject) {
                    obj.set(paths.join("."), value);
                    return composite;
                }
                path += ".";
            }
        }
        propertyAccessService.setter(field)(that, value);
        return composite;
    }
}
ObservableObject.prototype.parent = ObservableObject.parent;
ObservableObject.applyEnumerablePrototype();
ObservableObject.applyPrototypeMembers();
