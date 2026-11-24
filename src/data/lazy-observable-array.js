import { Observable } from "../core/base/observable.js";
import { ObservableArray } from "./observable-array.js";
import { ObservableObject } from "./observable-object.js";
export class LazyObservableArray extends ObservableArray {
    constructor(data = [], type, events) {
        super([], type);
        if (this.init === LazyObservableArray.prototype.init) {
            this.init(data, type, events);
        }
    }
    init(data, type, events) {
        let idx;
        const parentFn = function () {
            return this;
        };
        Observable.fn.init.call(this);
        this.type = (type || ObservableObject);
        if (events) {
            this._events = events;
        }
        for (idx = 0; idx < data.length; idx++) {
            this[idx] = data[idx];
        }
        this.length = idx;
        this._parent = parentFn.bind(this);
        this._loadPromises = [];
        this._loadedNodes = [];
    }
    at(index) {
        let item = this[index];
        if (!(item instanceof this.type)) {
            item = this[index] = this.wrap(item, this._parent);
        }
        else {
            item.parent = this._parent;
        }
        return item;
    }
}
LazyObservableArray.applyEnumerablePrototype();
LazyObservableArray.applyPrototypeMembers();
