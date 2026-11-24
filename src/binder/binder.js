import { Class } from "../core/base/class.js";
import { $ } from "../core/services/kendo-jquery.service.js";
import { namespaceService } from "../core/services/namespace.service.js";
import { dateParserService } from "../core/services/date-parser.service.js";
import { numberParserService } from "../core/services/number-parser.service.js";
import { widgetRegistryService } from "../core/services/widget-registry.service.js";
import { widgetUtilsService } from "../core/services/widget-utils.service.js";
import { notifyService } from "../core/services/notify.service.js";
import { ObservableArray } from "../data/observable-array.js";
import { ObservableObject } from "../data/observable-object.js";
import { HierarchicalDataSource } from "../data/hierarchical-data-source.js";
import { Binding, EventBinding, TemplateBinding, CHANGE } from "./binding.js";
import { BindingTarget, bindingTargetForRole } from "./binding-target.js";
const keyValueRegExp = /[A-Za-z0-9_\-]+:(\{([^}]*)\}|[^,}]+)/g;
const whiteSpaceRegExp = /\s/g;
function isWidgetNamespace(value) {
    return !!value && typeof value === "object" && "roles" in value;
}
function isPrimitiveValueReader(value) {
    return !!value && typeof value === "object";
}
function isBindingGroup(value) {
    return !(value instanceof Binding);
}
export const binders = {
    widget: {}
};
export const VALUE = "value";
export const SOURCE = "source";
export const EVENTS = "events";
export const CHECKED = "checked";
export const CSS = "css";
export const FUNCTION = "function";
export { CHANGE };
export class Binder extends Class {
    element;
    bindings;
    constructor(element, bindings, options) {
        super();
        if (element && this.init === Binder.prototype.init) {
            this.init(element, bindings, options);
        }
    }
    init(element, bindings = {}, options = {}) {
        this.element = element;
        this.bindings = bindings;
        this.options = options;
    }
    bind(binding, attribute) {
        const that = this;
        let currentBinding;
        if (isBindingGroup(binding)) {
            if (!attribute) {
                return;
            }
            currentBinding = binding[attribute];
        }
        else {
            currentBinding = binding;
        }
        currentBinding.bind(CHANGE, function (e) {
            that.refresh(attribute || e);
        });
        that.refresh(attribute);
    }
    refresh(_attribute) { }
    destroy() { }
}
Binder.applyEnumerablePrototype();
Binder.applyPrototypeMembers();
export class TypedBinder extends Binder {
    dataType() {
        const element = this.element;
        const dataType = this.element.getAttribute("data-" + namespaceService.ns + "type") || element.type || "text";
        return dataType.toLowerCase();
    }
    parsedValue() {
        return this._parseValue(this.element.value, this.dataType());
    }
    _parseValue(value, dataType) {
        const normalizedDateValue = value instanceof Date || value == null || typeof value === "string"
            ? value
            : String(value);
        const normalizedNumberValue = value == null || typeof value === "string" || typeof value === "number"
            ? value
            : String(value);
        if (dataType == "date") {
            value = dateParserService.parseDate(normalizedDateValue, "yyyy-MM-dd");
        }
        else if (dataType == "datetime-local") {
            value = dateParserService.parseDate(normalizedDateValue, ["yyyy-MM-ddTHH:mm:ss", "yyyy-MM-ddTHH:mm"]);
        }
        else if (dataType == "number") {
            value = numberParserService.parseFloat(normalizedNumberValue);
        }
        else if (dataType == "boolean") {
            const normalizedBooleanValue = String(value).toLowerCase();
            if (numberParserService.parseFloat(normalizedBooleanValue) !== null) {
                value = Boolean(numberParserService.parseFloat(normalizedBooleanValue));
            }
            else {
                value = normalizedBooleanValue === "true";
            }
        }
        return value;
    }
}
TypedBinder.applyEnumerablePrototype();
TypedBinder.applyPrototypeMembers();
export function parseBindings(bind) {
    const result = {};
    let idx;
    let token;
    let colonIndex;
    let key;
    let value;
    const tokens = bind.match(keyValueRegExp) || [];
    for (idx = 0; idx < tokens.length; idx++) {
        token = tokens[idx];
        colonIndex = token.indexOf(":");
        key = token.substring(0, colonIndex);
        value = token.substring(colonIndex + 1);
        if (value.charAt(0) == "{") {
            value = parseBindings(value);
        }
        result[key] = value;
    }
    return result;
}
export function createBindings(bindings, source, type) {
    let binding;
    const result = {};
    for (binding in bindings) {
        result[binding] = new type(source, String(bindings[binding]));
    }
    return result;
}
export function bindElement(element, source, roles, parents = [source]) {
    if (!element || element.getAttribute("data-" + namespaceService.ns + "stop")) {
        return;
    }
    const role = element.getAttribute("data-" + namespaceService.ns + "role");
    let idx;
    let bind = element.getAttribute("data-" + namespaceService.ns + "bind");
    const childrenCopy = [];
    let deep = true;
    let bindings;
    let options = {};
    let target;
    if (role || bind) {
        unbindElement(element, false);
    }
    if (role) {
        target = bindingTargetForRole(element, roles, source);
    }
    if (bind) {
        const parsedBindings = parseBindings(bind.replace(whiteSpaceRegExp, ""));
        if (!target) {
            options = widgetUtilsService.parseOptions(element, {
                textField: "",
                valueField: "",
                template: "",
                valueUpdate: CHANGE,
                valuePrimitive: false,
                autoBind: true
            }, source);
            options.roles = roles;
            target = new BindingTarget(element, options);
        }
        target.source = source;
        bindings = createBindings(parsedBindings, parents, Binding);
        if (options.template) {
            bindings.template = new TemplateBinding(parents, "", options.template);
        }
        if (bindings.click) {
            const eventBindings = parsedBindings.events && typeof parsedBindings.events !== "string" ? parsedBindings.events : {};
            eventBindings.click = String(parsedBindings.click);
            parsedBindings.events = eventBindings;
            bindings.click.destroy();
            delete bindings.click;
        }
        if (bindings.source) {
            deep = false;
        }
        if (parsedBindings.attr && typeof parsedBindings.attr !== "string") {
            bindings.attr = createBindings(parsedBindings.attr, parents, Binding);
        }
        if (parsedBindings.style && typeof parsedBindings.style !== "string") {
            bindings.style = createBindings(parsedBindings.style, parents, Binding);
        }
        if (parsedBindings.events && typeof parsedBindings.events !== "string") {
            bindings.events = createBindings(parsedBindings.events, parents, EventBinding);
        }
        if (parsedBindings.css && typeof parsedBindings.css !== "string") {
            bindings.css = createBindings(parsedBindings.css, parents, Binding);
        }
        target.bind(bindings);
    }
    if (target) {
        element.kendoBindingTarget = target;
    }
    const children = element.children;
    if (deep && children && !element.getAttribute("data-" + namespaceService.ns + "stop")) {
        for (idx = 0; idx < children.length; idx++) {
            childrenCopy[idx] = children[idx];
        }
        for (idx = 0; idx < childrenCopy.length; idx++) {
            bindElement(childrenCopy[idx], source, roles, parents);
        }
    }
}
export function bind(dom, object, ...namespaces) {
    let idx;
    let node;
    const defaultNamespaces = [
        widgetRegistryService.getNamespace("ui"),
        widgetRegistryService.getNamespace("dataviz.ui")
    ].filter(isWidgetNamespace);
    const requestedNamespaces = namespaces
        .map((namespace) => typeof namespace === "string" ? widgetRegistryService.getNamespace(namespace) : namespace)
        .filter(isWidgetNamespace);
    const roles = widgetRegistryService.rolesFromNamespaces(requestedNamespaces, defaultNamespaces);
    const observableObject = observable(object);
    const wrappedDom = $(dom);
    for (idx = 0; idx < wrappedDom.length; idx++) {
        node = wrappedDom[idx];
        if (node.nodeType === 1) {
            bindElement(node, observableObject, roles);
        }
    }
}
export function unbindElement(element, destroyWidget) {
    const bindingTarget = element.kendoBindingTarget;
    if (bindingTarget) {
        bindingTarget.destroy();
        if (element.removeAttribute) {
            element.removeAttribute("kendoBindingTarget");
        }
        element.kendoBindingTarget = undefined;
    }
    if (destroyWidget) {
        const widget = widgetUtilsService.widgetInstance($(element));
        if (widget && typeof widget.destroy === FUNCTION) {
            widget.destroy();
        }
    }
}
export function unbindElementTree(element, destroyWidgets) {
    if (!element) {
        return;
    }
    unbindElement(element, destroyWidgets);
    unbindElementChildren(element, destroyWidgets);
}
export function unbindElementChildren(element, destroyWidgets) {
    let idx;
    const children = element.children;
    if (children) {
        for (idx = 0; idx < children.length; idx++) {
            unbindElementTree(children[idx], destroyWidgets);
        }
    }
}
export function unbind(dom) {
    let idx;
    const wrappedDom = $(dom);
    for (idx = 0; idx < wrappedDom.length; idx++) {
        unbindElementTree(wrappedDom[idx], false);
    }
}
export function notify(widget, namespace) {
    const element = widget.element;
    const bindingTarget = element[0].kendoBindingTarget;
    if (bindingTarget) {
        const namespaces = typeof namespace === "string" ? [namespace] : [];
        bind(element, bindingTarget.source, ...namespaces);
    }
}
export function retrievePrimitiveValues(value, valueField) {
    const values = [];
    let idx = 0;
    let item;
    if (!valueField) {
        return value;
    }
    if (value instanceof ObservableArray) {
        for (; idx < value.length; idx++) {
            item = value[idx];
            values[idx] = isPrimitiveValueReader(item) && typeof item.get === "function" ? item.get(valueField) : item;
        }
        return values;
    }
    if (value instanceof ObservableObject) {
        return value.get(valueField);
    }
    return value;
}
export function observable(object) {
    if (object instanceof ObservableObject) {
        return object;
    }
    return new ObservableObject(object);
}
export function observableHierarchy(array) {
    const dataSource = HierarchicalDataSource.create(array);
    function recursiveRead(data) {
        let i;
        let children;
        for (i = 0; i < data.length; i++) {
            data[i]._initChildren();
            children = data[i].children;
            children.fetch();
            const childItems = children.data();
            data[i].items = childItems;
            recursiveRead(childItems);
        }
    }
    dataSource.fetch();
    recursiveRead((dataSource.data() || []));
    dataSource._data._dataSource = dataSource;
    return dataSource._data;
}
notifyService.register(notify);
