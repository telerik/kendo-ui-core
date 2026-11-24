import { CHANGE, ITEMLOAD, ITEMSLOADED, join, noop, pop, push, shift, slice, splice, toString, unshift } from "./common.js";
import { Observable } from "../core/base/observable.js";
import { Model } from "./model.js";
import { ObservableObject } from "./observable-object.js";
export class ObservableArray extends Observable {
    static parent = noop;
    static slice = slice;
    static sort = [].sort;
    static join = join;
    constructor(array = [], type) {
        super();
        if (this.init === ObservableArray.prototype.init) {
            this.init(array, type);
        }
    }
    init(array, type) {
        const that = this;
        that.type = type || ObservableObject;
        super.init();
        that.length = array.length;
        that.wrapAll(array, that);
        that._loadPromises = [];
        that._loadedNodes = [];
    }
    at(index) {
        return this[index];
    }
    toJSON(serializeFunctions) {
        let idx;
        const length = this.length;
        let value;
        const json = new Array(length);
        for (idx = 0; idx < length; idx++) {
            value = this[idx];
            if (value instanceof ObservableObject) {
                value = value.toJSON(serializeFunctions);
            }
            json[idx] = value;
        }
        return json;
    }
    wrapAll(source, target = []) {
        const that = this;
        let idx;
        let length;
        const parent = function () {
            return that;
        };
        for (idx = 0, length = source.length; idx < length; idx++) {
            target[idx] = that.wrap(source[idx], parent);
        }
        return target;
    }
    wrap(object, parent) {
        const that = this;
        let observable;
        if (object !== null && toString.call(object) === "[object Object]") {
            observable = object instanceof that.type || object instanceof Model;
            if (!observable) {
                object = object instanceof ObservableObject ? object.toJSON() : object;
                object = new that.type(object);
            }
            const wrappedObject = object;
            wrappedObject.parent = parent;
            wrappedObject.bind(CHANGE, function (e) {
                const event = e;
                const isGroup = wrappedObject.hasOwnProperty("hasSubgroups");
                that.trigger(CHANGE, {
                    field: event.field,
                    node: event.node,
                    index: event.index,
                    items: event.items || [wrappedObject],
                    action: event.node || isGroup ? event.action || "itemloaded" : "itemchange"
                });
            });
            wrappedObject.bind(ITEMLOAD, function (e) {
                const event = e;
                const promise = event.promise;
                that._loadPromises.push(promise);
                that._loading = true;
                promise.done(function () {
                    that._loadedNodes.push(event.node);
                    const index = that._loadPromises.indexOf(promise);
                    that._loadPromises.splice(index, 1);
                    if (!that._loadPromises.length) {
                        that._loading = false;
                        that.trigger(ITEMSLOADED, {
                            collection: that,
                            nodes: that._loadedNodes
                        });
                        that._loadedNodes = [];
                    }
                });
            });
            object = wrappedObject;
        }
        return object;
    }
    loading() {
        return this._loading;
    }
    push(...args) {
        const index = this.length;
        const items = this.wrapAll(args);
        let result;
        result = push.apply(this, items);
        if (!this.omitChangeEvent) {
            this.trigger(CHANGE, {
                action: "add",
                index: index,
                items: items
            });
        }
        return result;
    }
    pop() {
        const length = this.length;
        const result = pop.apply(this);
        if (length) {
            this.trigger(CHANGE, {
                action: "remove",
                index: length - 1,
                items: [result]
            });
        }
        return result;
    }
    splice(index, howMany, ...args) {
        const items = this.wrapAll(args);
        const spliceArgs = [index, howMany, ...items];
        let result;
        let i;
        let len;
        result = splice.apply(this, spliceArgs);
        if (result.length) {
            if (!this.omitChangeEvent) {
                this.trigger(CHANGE, {
                    action: "remove",
                    index: index,
                    items: this.omitCache && this.omitCache.length ? result.concat(this.omitCache) : result
                });
                this.omitCache = [];
            }
            for (i = 0, len = result.length; i < len; i++) {
                const resultItem = result[i];
                if (resultItem && resultItem.children) {
                    resultItem.unbind(CHANGE);
                }
            }
        }
        if (args.length) {
            if (!this.omitChangeEvent) {
                this.trigger(CHANGE, {
                    action: "add",
                    index: index,
                    items: items
                });
            }
        }
        return result;
    }
    shift() {
        const length = this.length;
        const result = shift.apply(this);
        if (length) {
            this.trigger(CHANGE, {
                action: "remove",
                index: 0,
                items: [result]
            });
        }
        return result;
    }
    unshift(...args) {
        const items = this.wrapAll(args);
        let result;
        result = unshift.apply(this, items);
        this.trigger(CHANGE, {
            action: "add",
            index: 0,
            items: items
        });
        return result;
    }
    indexOf(item) {
        const that = this;
        let idx;
        let length;
        for (idx = 0, length = that.length; idx < length; idx++) {
            if (that[idx] === item) {
                return idx;
            }
        }
        return -1;
    }
    forEach(callback, thisArg) {
        let idx = 0;
        const length = this.length;
        const context = thisArg || window;
        for (; idx < length; idx++) {
            callback.call(context, this[idx], idx, this);
        }
    }
    map(callback, thisArg) {
        let idx = 0;
        const result = [];
        const length = this.length;
        const context = thisArg || window;
        for (; idx < length; idx++) {
            result[idx] = callback.call(context, this[idx], idx, this);
        }
        return result;
    }
    reduce(callback, initialValue) {
        let idx = 0;
        let result = initialValue;
        const length = this.length;
        if (arguments.length == 2) {
            result = initialValue;
        }
        else if (idx < length) {
            result = this[idx++];
        }
        for (; idx < length; idx++) {
            result = callback(result, this[idx], idx, this);
        }
        return result;
    }
    reduceRight(callback, initialValue) {
        let idx = this.length - 1;
        let result = initialValue;
        if (arguments.length == 2) {
            result = initialValue;
        }
        else if (idx > 0) {
            result = this[idx--];
        }
        for (; idx >= 0; idx--) {
            result = callback(result, this[idx], idx, this);
        }
        return result;
    }
    filter(callback, thisArg) {
        let idx = 0;
        const result = [];
        let item;
        const length = this.length;
        const context = thisArg || window;
        for (; idx < length; idx++) {
            item = this[idx];
            if (callback.call(context, item, idx, this)) {
                result[result.length] = item;
            }
        }
        return result;
    }
    find(callback, thisArg) {
        let idx = 0;
        let item;
        const length = this.length;
        const context = thisArg || window;
        for (; idx < length; idx++) {
            item = this[idx];
            if (callback.call(context, item, idx, this)) {
                return item;
            }
        }
    }
    every(callback, thisArg) {
        let idx = 0;
        let item;
        const length = this.length;
        const context = thisArg || window;
        for (; idx < length; idx++) {
            item = this[idx];
            if (!callback.call(context, item, idx, this)) {
                return false;
            }
        }
        return true;
    }
    some(callback, thisArg) {
        let idx = 0;
        let item;
        const length = this.length;
        const context = thisArg || window;
        for (; idx < length; idx++) {
            item = this[idx];
            if (callback.call(context, item, idx, this)) {
                return true;
            }
        }
        return false;
    }
    // non-standard collection methods
    remove(item) {
        const idx = this.indexOf(item);
        if (idx !== -1) {
            this.splice(idx, 1);
        }
    }
    empty() {
        this.splice(0, this.length);
    }
}
ObservableArray.prototype.parent = ObservableArray.parent;
ObservableArray.prototype.slice = ObservableArray.slice;
ObservableArray.prototype.sort = ObservableArray.sort;
ObservableArray.prototype.join = ObservableArray.join;
const observableArrayPrototype = ObservableArray.prototype;
if (typeof Symbol !== "undefined" && Symbol.iterator && !observableArrayPrototype[Symbol.iterator]) {
    observableArrayPrototype[Symbol.iterator] = [][Symbol.iterator];
}
ObservableArray.applyEnumerablePrototype();
ObservableArray.applyPrototypeMembers();
