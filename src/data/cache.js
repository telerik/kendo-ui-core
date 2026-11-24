import { Class } from "../core/base/class.js";
import { isFunction, isPlainObject, stringify } from "./common.js";
function isCacheLike(value) {
    if (!isPlainObject(value)) {
        return false;
    }
    const candidate = value;
    return isFunction(candidate.find);
}
export class Cache extends Class {
    static create(options) {
        const store = {
            inmemory: function () {
                return new Cache();
            }
        };
        if (isCacheLike(options)) {
            return options;
        }
        if (options === true) {
            return new Cache();
        }
        return store[String(options)]();
    }
    constructor() {
        super();
        if (this.init === Cache.prototype.init) {
            this.init();
        }
    }
    init() {
        this._store = {};
    }
    add(key, data) {
        if (key !== undefined) {
            this._store[stringify(key)] = data;
        }
    }
    find(key) {
        return this._store[stringify(key)];
    }
    clear() {
        this._store = {};
    }
    remove(key) {
        delete this._store[stringify(key)];
    }
}
Cache.applyEnumerablePrototype();
Cache.applyPrototypeMembers();
