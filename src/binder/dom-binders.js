import { $ } from "../core/services/kendo-jquery.service.js";
import { htmlService } from "../core/services/html.service.js";
import { propertyAccessService } from "../core/services/property-access.service.js";
import { Template } from "../core/services/template.service.js";
import { namespaceService } from "../core/services/namespace.service.js";
import { formatterService } from "../core/services/formatter.service.js";
import { isSafeAttributeName, sanitizeAttributeValue } from "../utils/html-attributes.js";
import { DataSource } from "../data/data-source.js";
import { ObservableArray } from "../data/observable-array.js";
import { ObservableObject } from "../data/observable-object.js";
import { binders, Binder, TypedBinder, VALUE, CHECKED, CHANGE, bindElement, unbindElementTree, unbindElementChildren, retrievePrimitiveValues } from "./binder.js";
const encode = htmlService.encode.bind(htmlService);
function toFormattableValue(value) {
    if (value instanceof Date || value == null || typeof value === "string" || typeof value === "number") {
        return value;
    }
    return String(value);
}
function toFormatterDateValue(value) {
    if (value instanceof Date || value == null || typeof value === "number") {
        return value;
    }
    return undefined;
}
export class AttrBinder extends Binder {
    refresh(key) {
        const value = this.bindings.attr[key].get();
        if (!isSafeAttributeName(key)) {
            this.element.removeAttribute(key);
            return;
        }
        this.element.setAttribute(key, value !== null && value !== undefined ? String(sanitizeAttributeValue(key, value, false)) : "");
    }
}
AttrBinder.applyEnumerablePrototype();
AttrBinder.applyPrototypeMembers();
export class CssBinder extends Binder {
    constructor(element, bindings, options) {
        super();
        if (this.init === CssBinder.prototype.init) {
            this.init(element, bindings, options);
        }
    }
    init(element, bindings, options) {
        super.init(element, bindings, options);
        this.classes = {};
    }
    refresh(className) {
        const element = $(this.element);
        const binding = this.bindings.css[className];
        const hasClass = (this.classes[className] = binding.get());
        if (hasClass) {
            element.addClass(className);
        }
        else {
            element.removeClass(className);
        }
    }
}
CssBinder.applyEnumerablePrototype();
CssBinder.applyPrototypeMembers();
export class StyleBinder extends Binder {
    refresh(key) {
        const style = this.element.style;
        style[key] = String(this.bindings.style[key].get() || "");
    }
}
StyleBinder.applyEnumerablePrototype();
StyleBinder.applyPrototypeMembers();
export class EnabledBinder extends Binder {
    refresh() {
        if (this.bindings.enabled.get()) {
            this.element.removeAttribute("disabled");
        }
        else {
            this.element.setAttribute("disabled", "disabled");
        }
    }
}
EnabledBinder.applyEnumerablePrototype();
EnabledBinder.applyPrototypeMembers();
export class ReadOnlyBinder extends Binder {
    refresh() {
        if (this.bindings.readonly.get()) {
            this.element.setAttribute("readonly", "readonly");
        }
        else {
            this.element.removeAttribute("readonly");
        }
    }
}
ReadOnlyBinder.applyEnumerablePrototype();
ReadOnlyBinder.applyPrototypeMembers();
export class DisabledBinder extends Binder {
    refresh() {
        if (this.bindings.disabled.get()) {
            this.element.setAttribute("disabled", "disabled");
        }
        else {
            this.element.removeAttribute("disabled");
        }
    }
}
DisabledBinder.applyEnumerablePrototype();
DisabledBinder.applyPrototypeMembers();
export class EventsBinder extends Binder {
    constructor(element, bindings, options) {
        super();
        if (this.init === EventsBinder.prototype.init) {
            this.init(element, bindings, options);
        }
    }
    init(element, bindings, options) {
        super.init(element, bindings, options);
        this.handlers = {};
    }
    refresh(key) {
        const element = $(this.element);
        const binding = this.bindings.events[key];
        let handler = this.handlers[key];
        if (handler) {
            element.off(key, handler);
        }
        const resolvedHandler = binding.get();
        handler = this.handlers[key] = resolvedHandler;
        element.on(key, binding.source, handler);
    }
    destroy() {
        const element = $(this.element);
        let handler;
        for (handler in this.handlers) {
            element.off(handler, this.handlers[handler]);
        }
    }
}
EventsBinder.applyEnumerablePrototype();
EventsBinder.applyPrototypeMembers();
export class TextBinder extends Binder {
    refresh() {
        let text = this.bindings.text.get();
        const dataFormat = this.element.getAttribute("data-" + namespaceService.ns + "format") || "";
        const formatText = formatterService.toString;
        if (text == null) {
            text = "";
        }
        const formattedText = formatText(toFormattableValue(text), dataFormat);
        $(this.element).text(formattedText == null ? String(text) : String(formattedText));
    }
}
TextBinder.applyEnumerablePrototype();
TextBinder.applyPrototypeMembers();
export class VisibleBinder extends Binder {
    refresh() {
        if (this.bindings.visible.get()) {
            this.element.style.display = "";
        }
        else {
            this.element.style.display = "none";
        }
    }
}
VisibleBinder.applyEnumerablePrototype();
VisibleBinder.applyPrototypeMembers();
export class InvisibleBinder extends Binder {
    refresh() {
        if (!this.bindings.invisible.get()) {
            this.element.style.display = "";
        }
        else {
            this.element.style.display = "none";
        }
    }
}
InvisibleBinder.applyEnumerablePrototype();
InvisibleBinder.applyPrototypeMembers();
export class HtmlBinder extends Binder {
    refresh() {
        this.element.innerHTML = this.bindings.html.get();
    }
}
HtmlBinder.applyEnumerablePrototype();
HtmlBinder.applyPrototypeMembers();
export class ValueBinder extends TypedBinder {
    constructor(element, bindings, options) {
        super();
        if (this.init === ValueBinder.prototype.init) {
            this.init(element, bindings, options);
        }
    }
    init(element, bindings, options) {
        super.init(element, bindings, options);
        this._change = this.change.bind(this);
        this.eventName = options.valueUpdate || CHANGE;
        $(this.element).on(this.eventName, this._change);
        this._initChange = false;
    }
    change() {
        this._initChange = this.eventName != CHANGE;
        this.bindings[VALUE].set(this.parsedValue());
        this._initChange = false;
    }
    refresh() {
        if (!this._initChange) {
            let value = this.bindings[VALUE].get();
            if (value == null) {
                value = "";
            }
            const type = this.dataType();
            if (type == "date") {
                value = formatterService.toString(toFormatterDateValue(value), "yyyy-MM-dd");
            }
            else if (type == "datetime-local") {
                value = formatterService.toString(toFormatterDateValue(value), "yyyy-MM-ddTHH:mm:ss");
            }
            this.element.value = String(value);
        }
        this._initChange = false;
    }
    destroy() {
        $(this.element).off(this.eventName, this._change);
    }
}
ValueBinder.applyEnumerablePrototype();
ValueBinder.applyPrototypeMembers();
export class SourceBinder extends Binder {
    constructor(element, bindings, options) {
        super();
        if (this.init === SourceBinder.prototype.init) {
            this.init(element, bindings, options);
        }
    }
    init(element, bindings, options) {
        super.init(element, bindings, options);
        const source = this.bindings.source.get();
        if (source instanceof DataSource && options.autoBind !== false) {
            source.fetch();
        }
    }
    refresh(e) {
        const that = this;
        const source = that.bindings.source.get();
        const changeEvent = typeof e === "string" ? undefined : e;
        if (source instanceof ObservableArray || source instanceof DataSource) {
            if (changeEvent?.action == "add") {
                that.add(changeEvent.index, changeEvent.items);
            }
            else if (changeEvent?.action == "remove") {
                that.remove(changeEvent.index, changeEvent.items);
            }
            else if (changeEvent?.action != "itemchange") {
                that.render();
            }
        }
        else {
            that.render();
        }
    }
    container() {
        let element = this.element;
        if (element.nodeName.toLowerCase() == "table") {
            const tableElement = element;
            if (!tableElement.tBodies[0]) {
                tableElement.appendChild(document.createElement("tbody"));
            }
            element = tableElement.tBodies[0];
        }
        return element;
    }
    template() {
        const options = this.options;
        let template = options.template;
        const nodeName = this.container().nodeName.toLowerCase();
        if (!template) {
            if (nodeName == "select") {
                const valueField = options.valueField || options.textField;
                const textField = options.textField || options.valueField;
                if (valueField && textField) {
                    template = (data) => {
                        const valueAttr = propertyAccessService.getter(valueField)(data);
                        const innerText = propertyAccessService.getter(textField)(data);
                        return `<option value="${encode(String(valueAttr))}">${encode(String(innerText))}</option>`;
                    };
                }
                else {
                    template = (data) => `<option>${encode(String(data))}</option>`;
                }
            }
            else if (nodeName == "tbody") {
                template = (data) => `<tr><td>${encode(String(data))}</td></tr>`;
            }
            else if (nodeName == "ul" || nodeName == "ol") {
                template = (data) => `<li>${encode(String(data))}</li>`;
            }
            else {
                template = (data) => `${encode(String(data))}`;
            }
            template = Template.compile(template);
        }
        return template;
    }
    add(index, items) {
        const element = this.container();
        let parents;
        let idx;
        let child;
        const clone = element.cloneNode(false);
        const reference = element.children[index];
        $(clone).html(Template.render(this.template(), items));
        if (clone.children.length) {
            parents = this.bindings.source._parents();
            for (idx = 0; idx < items.length; idx++) {
                child = clone.children[0];
                element.insertBefore(child, reference || null);
                bindElement(child, items[idx], this.options.roles, [items[idx], ...parents]);
            }
        }
    }
    remove(index, items) {
        let idx;
        const element = this.container();
        for (idx = 0; idx < items.length; idx++) {
            const child = element.children[index];
            unbindElementTree(child, true);
            if (child.parentNode == element) {
                element.removeChild(child);
            }
        }
    }
    render() {
        let source = this.bindings.source.get();
        let parents;
        let idx;
        const element = this.container();
        const template = this.template();
        if (source == null) {
            return;
        }
        if (source instanceof DataSource) {
            source = source.view();
        }
        if (!(source instanceof ObservableArray) && Object.prototype.toString.call(source) !== "[object Array]") {
            source = [source];
        }
        if (this.bindings.template) {
            unbindElementChildren(element, true);
            $(element).html(this.bindings.template.render(source));
            if (element.children.length) {
                parents = this.bindings.source._parents();
                const sourceItems = source;
                for (idx = 0; idx < sourceItems.length; idx++) {
                    bindElement(element.children[idx], sourceItems[idx], this.options.roles, [sourceItems[idx], ...parents]);
                }
            }
        }
        else {
            $(element).html(Template.render(template, source));
        }
    }
}
SourceBinder.applyEnumerablePrototype();
SourceBinder.applyPrototypeMembers();
export class CheckedBinder extends TypedBinder {
    constructor(element, bindings, options) {
        super();
        if (this.init === CheckedBinder.prototype.init) {
            this.init(element, bindings, options);
        }
    }
    init(element, bindings, options) {
        super.init(element, bindings, options);
        this._change = this.change.bind(this);
        $(this.element).change(this._change);
    }
    change() {
        let i;
        const element = this.element;
        let value = this.value();
        if (element.type == "radio") {
            value = this.parsedValue();
            this.bindings[CHECKED].set(value);
        }
        else if (element.type == "checkbox") {
            const source = this.bindings[CHECKED].get();
            let index = -1;
            if (source instanceof ObservableArray) {
                value = this.parsedValue();
                if (value instanceof Date) {
                    for (i = 0; i < source.length; i++) {
                        const sourceItem = source[i];
                        if (sourceItem instanceof Date && +sourceItem === +value) {
                            index = i;
                            break;
                        }
                    }
                }
                else {
                    index = source.indexOf(value);
                }
                if (index > -1) {
                    source.splice(index, 1);
                }
                else {
                    source.push(value);
                }
            }
            else {
                this.bindings[CHECKED].set(value);
            }
        }
    }
    refresh() {
        let i;
        let value = this.bindings[CHECKED].get();
        const source = value;
        const type = this.dataType();
        const element = this.element;
        if (element.type == "checkbox") {
            if (source instanceof ObservableArray) {
                let index = -1;
                value = this.parsedValue();
                if (value instanceof Date) {
                    for (i = 0; i < source.length; i++) {
                        const sourceItem = source[i];
                        if (sourceItem instanceof Date && +sourceItem === +value) {
                            index = i;
                            break;
                        }
                    }
                }
                else {
                    index = source.indexOf(value);
                }
                element.checked = index >= 0;
            }
            else {
                element.checked = Boolean(source);
            }
        }
        else if (element.type == "radio") {
            if (type == "date") {
                value = formatterService.toString(toFormatterDateValue(value), "yyyy-MM-dd");
            }
            else if (type == "datetime-local") {
                value = formatterService.toString(toFormatterDateValue(value), "yyyy-MM-ddTHH:mm:ss");
            }
            if (value !== null && typeof value !== "undefined" && element.value === value.toString()) {
                element.checked = true;
            }
            else {
                element.checked = false;
            }
        }
    }
    value() {
        const element = this.element;
        let value = element.value;
        if (element.type == "checkbox") {
            value = element.checked;
        }
        return value;
    }
    destroy() {
        $(this.element).off(CHANGE, this._change);
    }
}
CheckedBinder.applyEnumerablePrototype();
CheckedBinder.applyPrototypeMembers();
export const input = {
    checked: CheckedBinder
};
export class SelectSourceBinder extends SourceBinder {
    refresh(e) {
        const that = this;
        const source = that.bindings.source.get();
        const changeEvent = typeof e === "string" ? undefined : e;
        if (source instanceof ObservableArray || source instanceof DataSource) {
            if (changeEvent?.action == "add") {
                that.add(changeEvent.index, changeEvent.items);
            }
            else if (changeEvent?.action == "remove") {
                that.remove(changeEvent.index, changeEvent.items);
            }
            else if (changeEvent?.action == "itemchange" || changeEvent?.action === undefined) {
                that.render();
                if (that.bindings.value) {
                    const val = retrievePrimitiveValues(that.bindings.value.get(), $(that.element).data("valueField"));
                    if (val === null) {
                        that.element.selectedIndex = -1;
                    }
                    else {
                        that.element.value = String(val);
                    }
                }
            }
        }
        else {
            that.render();
        }
    }
}
SelectSourceBinder.applyEnumerablePrototype();
SelectSourceBinder.applyPrototypeMembers();
export class SelectValueBinder extends TypedBinder {
    constructor(target, bindings, options) {
        super();
        if (this.init === SelectValueBinder.prototype.init) {
            this.init(target, bindings, options);
        }
    }
    init(target, bindings, options) {
        super.init(target, bindings, options);
        this._change = this.change.bind(this);
        $(this.element).change(this._change);
    }
    parsedValue() {
        const dataType = this.dataType();
        const values = [];
        let value;
        let option;
        let idx;
        for (idx = 0; idx < this.element.options.length; idx++) {
            option = this.element.options[idx];
            if (option.selected) {
                const valueAttribute = option.getAttributeNode("value");
                if (valueAttribute) {
                    value = option.value;
                }
                else {
                    value = option.text;
                }
                values.push(this._parseValue(value, dataType));
            }
        }
        return values;
    }
    change() {
        const values = [];
        const element = this.element;
        let source;
        const field = this.options.valueField || this.options.textField;
        const valuePrimitive = this.options.valuePrimitive;
        let option;
        let valueIndex;
        let value;
        let idx;
        for (idx = 0; idx < element.options.length; idx++) {
            option = element.options[idx];
            if (option.selected) {
                const valueAttribute = option.getAttributeNode("value");
                if (valueAttribute) {
                    value = option.value;
                }
                else {
                    value = option.text;
                }
                if (field) {
                    values.push(value);
                }
                else {
                    values.push(this._parseValue(value, this.dataType()));
                }
            }
        }
        if (field) {
            source = this.bindings.source.get();
            if (source instanceof DataSource) {
                source = source.view();
            }
            const sourceItems = source;
            for (valueIndex = 0; valueIndex < values.length; valueIndex++) {
                for (idx = 0; idx < sourceItems.length; idx++) {
                    const sourceItem = sourceItems[idx];
                    const sourceValue = sourceItem instanceof ObservableObject ? sourceItem.get(field) : sourceItem;
                    const match = String(sourceValue) === values[valueIndex];
                    if (match) {
                        values[valueIndex] = sourceItem;
                        break;
                    }
                }
            }
        }
        value = this.bindings[VALUE].get();
        if (value instanceof ObservableArray) {
            value.splice(0, value.length, ...values);
        }
        else if (!valuePrimitive && (value instanceof ObservableObject || value === null || value === undefined || !field)) {
            this.bindings[VALUE].set(values[0]);
        }
        else {
            this.bindings[VALUE].set(field && values[0] instanceof ObservableObject ? values[0].get(field) : values[0]);
        }
    }
    refresh() {
        let valueIndex;
        let optionIndex;
        const element = this.element;
        const options = element.options;
        let value = this.bindings[VALUE].get();
        let values;
        const field = this.options.valueField || this.options.textField;
        const type = this.dataType();
        let optionValue;
        if (value instanceof ObservableArray) {
            values = value;
        }
        else {
            values = [value];
        }
        element.selectedIndex = -1;
        for (valueIndex = 0; valueIndex < values.length; valueIndex++) {
            value = values[valueIndex];
            if (field && value instanceof ObservableObject) {
                value = value.get(field);
            }
            if (type == "date") {
                value = formatterService.toString(toFormatterDateValue(values[valueIndex]), "yyyy-MM-dd");
            }
            else if (type == "datetime-local") {
                value = formatterService.toString(toFormatterDateValue(values[valueIndex]), "yyyy-MM-ddTHH:mm:ss");
            }
            for (optionIndex = 0; optionIndex < options.length; optionIndex++) {
                optionValue = options[optionIndex].value;
                if (optionValue === "" && value !== "") {
                    optionValue = options[optionIndex].text;
                }
                if (value != null && optionValue == value.toString()) {
                    options[optionIndex].selected = true;
                }
            }
        }
    }
    destroy() {
        $(this.element).off(CHANGE, this._change);
    }
}
SelectValueBinder.applyEnumerablePrototype();
SelectValueBinder.applyPrototypeMembers();
export const select = {
    source: SelectSourceBinder,
    value: SelectValueBinder
};
binders.select = select;
