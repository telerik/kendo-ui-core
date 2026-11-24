import { Class } from "../core/base/class.js";
import { widgetUtilsService } from "../core/services/widget-utils.service.js";
import { Binding } from "./binding.js";
import { binders, VALUE, SOURCE, EVENTS, CHECKED, CSS } from "./binder.js";
function isBindingGroup(value) {
    return !!value && typeof value === "object" && !(value instanceof Binding);
}
function isBinderConstructor(value) {
    return typeof value === "function";
}
function asBinderRegistry(value) {
    return value && typeof value === "object" ? value : {};
}
export class BindingTarget extends Class {
    target;
    source;
    toDestroy;
    constructor(target, options) {
        super();
        if (target && this.init === BindingTarget.prototype.init) {
            this.init(target, options);
        }
    }
    init(target, options = {}) {
        this.target = target;
        this.options = options;
        this.toDestroy = [];
    }
    bind(bindings) {
        let key;
        let hasValue;
        let hasSource;
        let hasEvents;
        let hasChecked;
        let hasCss;
        const widgetBinding = this instanceof WidgetBindingTarget;
        const specificBinders = this.binders();
        for (key in bindings) {
            if (key == VALUE) {
                hasValue = true;
            }
            else if (key == SOURCE) {
                hasSource = true;
            }
            else if (key == EVENTS && !widgetBinding) {
                hasEvents = true;
            }
            else if (key == CHECKED) {
                hasChecked = true;
            }
            else if (key == CSS) {
                hasCss = true;
            }
            else {
                this.applyBinding(key, bindings, specificBinders);
            }
        }
        if (hasSource) {
            this.applyBinding(SOURCE, bindings, specificBinders);
        }
        if (hasValue) {
            this.applyBinding(VALUE, bindings, specificBinders);
        }
        if (hasChecked) {
            this.applyBinding(CHECKED, bindings, specificBinders);
        }
        if (hasEvents && !widgetBinding) {
            this.applyBinding(EVENTS, bindings, specificBinders);
        }
        if (hasCss && !widgetBinding) {
            this.applyBinding(CSS, bindings, specificBinders);
        }
        if (widgetBinding && this.target && this.target.floatingLabel) {
            this.applyBinding("floatingLabel", bindings, specificBinders);
        }
    }
    binders() {
        return asBinderRegistry(binders[this.target.nodeName.toLowerCase()]);
    }
    applyBinding(name, bindings, specificBinders) {
        const binderType = specificBinders[name] || binders[name];
        const toDestroy = this.toDestroy;
        const binding = bindings[name];
        if (isBinderConstructor(binderType)) {
            const binder = new binderType(this.target, bindings, this.options);
            toDestroy.push(binder);
            if (binding instanceof Binding) {
                binder.bind(binding);
                toDestroy.push(binding);
            }
            else if (isBindingGroup(binding)) {
                let attribute;
                for (attribute in binding) {
                    binder.bind(binding, attribute);
                    toDestroy.push(binding[attribute]);
                }
            }
        }
        else if (name !== "template") {
            throw new Error("The " + name + " binding is not supported by the " + this.target.nodeName.toLowerCase() + " element");
        }
    }
    destroy() {
        let idx;
        const toDestroy = this.toDestroy;
        for (idx = 0; idx < toDestroy.length; idx++) {
            toDestroy[idx].destroy();
        }
    }
}
BindingTarget.applyEnumerablePrototype();
BindingTarget.applyPrototypeMembers();
export class WidgetBindingTarget extends BindingTarget {
    binders() {
        const widgetName = this.target.options.name;
        return widgetName ? asBinderRegistry(binders.widget[widgetName.toLowerCase()]) : {};
    }
    applyBinding(name, bindings, specificBinders) {
        const binderType = specificBinders[name] || binders.widget[name];
        const toDestroy = this.toDestroy;
        const binding = bindings[name];
        if (isBinderConstructor(binderType)) {
            const binder = new binderType(this.target, bindings, this.target.options);
            toDestroy.push(binder);
            if (binding instanceof Binding) {
                binder.bind(binding);
                toDestroy.push(binding);
            }
            else if (isBindingGroup(binding)) {
                let attribute;
                for (attribute in binding) {
                    binder.bind(binding, attribute);
                    toDestroy.push(binding[attribute]);
                }
            }
        }
        else {
            throw new Error("The " + name + " binding is not supported by the " + this.target.options.name + " widget");
        }
    }
}
WidgetBindingTarget.applyEnumerablePrototype();
WidgetBindingTarget.applyPrototypeMembers();
export function bindingTargetForRole(element, roles, source) {
    const widget = widgetUtilsService.initWidget(element, {}, roles, source);
    if (widget) {
        return new WidgetBindingTarget(widget);
    }
}
