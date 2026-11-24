import { Observable } from "../core/base/observable.js";
import { $ } from "../core/services/kendo-jquery.service.js";
import { propertyAccessService } from "../core/services/property-access.service.js";
import { Template } from "../core/services/template.service.js";
import { ObservableArray } from "../data/observable-array.js";
import { ObservableObject } from "../data/observable-object.js";
export const CHANGE = "change";
function isBindingParent(value) {
    if (!value || typeof value !== "object") {
        return false;
    }
    const candidate = value;
    return typeof candidate.bind === "function" && typeof candidate.unbind === "function";
}
function isParentAware(value) {
    if (!value || typeof value !== "object") {
        return false;
    }
    return typeof value.parent === "function";
}
export class Binding extends Observable {
    source;
    parents;
    path;
    dependencies;
    observable;
    currentSource;
    _access;
    _change;
    constructor(parents, path) {
        super();
        if (parents && this.init === Binding.prototype.init) {
            this.init(parents, path);
        }
    }
    init(parents = [], path = "", ..._args) {
        const that = this;
        super.init();
        that.source = parents[0];
        that.parents = parents;
        that.path = path;
        that.dependencies = {};
        that.dependencies[path] = true;
        that.observable = that.source instanceof Observable;
        that._access = function (e) {
            that.dependencies[e.field] = true;
        };
        if (that.observable) {
            that._change = function (e) {
                that.change(e);
            };
            that.source.bind(CHANGE, that._change);
        }
    }
    _parents() {
        let parents = this.parents;
        const value = this.get();
        if (isParentAware(value)) {
            const parent = value.parent();
            if (parent && $.inArray(parent, parents) < 0) {
                parents = [parent].concat(parents);
            }
        }
        return parents;
    }
    change(e) {
        let dependency;
        let ch;
        const field = e.field;
        const that = this;
        if (that.path === "this") {
            that.trigger(CHANGE, e);
        }
        else {
            for (dependency in that.dependencies) {
                if (dependency.indexOf(field) === 0) {
                    ch = dependency.charAt(field.length);
                    if (!ch || ch === "." || ch === "[") {
                        that.trigger(CHANGE, e);
                        break;
                    }
                }
            }
        }
    }
    start(source) {
        source.bind("get", this._access);
    }
    stop(source) {
        source.unbind("get", this._access);
    }
    get() {
        const that = this;
        let source = that.source;
        let index = 0;
        const path = that.path;
        let result = source;
        if (!that.observable) {
            return result;
        }
        that.start(that.source);
        result = source.get?.(path);
        while (result === undefined && source) {
            source = that.parents[++index];
            if (source instanceof ObservableObject) {
                result = source.get(path);
            }
        }
        if (result === undefined) {
            source = that.source;
            while (result === undefined && source) {
                source = source.parent?.();
                if (source instanceof ObservableObject) {
                    result = source.get(path);
                }
            }
        }
        if (typeof result === "function") {
            index = path.lastIndexOf(".");
            if (index > 0 && source?.get) {
                const parentSource = source.get(path.substring(0, index));
                if (isBindingParent(parentSource)) {
                    source = parentSource;
                }
            }
            if (!source) {
                that.stop(that.source);
                return result;
            }
            that.start(source);
            if (source !== that.source) {
                result = result.call(source, that.source);
            }
            else {
                result = result.call(source);
            }
            that.stop(source);
        }
        if (source && source !== that.source) {
            that.currentSource = source;
            if (that._change) {
                source.unbind(CHANGE, that._change).bind(CHANGE, that._change);
            }
        }
        that.stop(that.source);
        return result;
    }
    set(value) {
        const source = this.currentSource || this.source;
        const field = propertyAccessService.getter(this.path)(source);
        if (typeof field === "function") {
            if (source !== this.source) {
                field.call(source, this.source, value);
            }
            else {
                field.call(source, value);
            }
        }
        else {
            source.set?.(this.path, value);
        }
    }
    destroy() {
        if (this.observable) {
            if (this._change) {
                this.source.unbind(CHANGE, this._change);
            }
            if (this.currentSource && this._change) {
                this.currentSource.unbind(CHANGE, this._change);
            }
        }
        this.unbind();
    }
}
Binding.applyEnumerablePrototype();
Binding.applyPrototypeMembers();
export class EventBinding extends Binding {
    get() {
        let source = this.source;
        const path = this.path;
        let index = 0;
        let handler = source.get?.(path);
        while (!handler && source) {
            source = this.parents[++index];
            if (source instanceof ObservableObject) {
                handler = source.get(path);
            }
        }
        if (typeof handler !== "function") {
            return;
        }
        return handler.bind(source);
    }
}
EventBinding.applyEnumerablePrototype();
EventBinding.applyPrototypeMembers();
export class TemplateBinding extends Binding {
    template;
    constructor(source, path, template) {
        super();
        if (source && this.init === TemplateBinding.prototype.init) {
            this.init(source, path, template);
        }
    }
    init(source = [], path = "", template) {
        const that = this;
        super.init(source, path);
        that.template = template;
    }
    render(value) {
        const data = value instanceof ObservableArray || Array.isArray(value) ? value : [value];
        if (!this.template) {
            return "";
        }
        this.start(this.source);
        const html = Template.render(this.template, data);
        this.stop(this.source);
        return html;
    }
}
TemplateBinding.applyEnumerablePrototype();
TemplateBinding.applyPrototypeMembers();
