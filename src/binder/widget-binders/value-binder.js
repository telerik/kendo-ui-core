import { DataSource } from "../../data/data-source.js";
import { ObservableArray } from "../../data/observable-array.js";
import { ObservableObject } from "../../data/observable-object.js";
import { Binder, CHANGE } from "../binder.js";
const toString = {}.toString;
export class WidgetValueBinder extends Binder {
    constructor(widget, bindings, options) {
        super();
        if (this.init === WidgetValueBinder.prototype.init) {
            this.init(widget, bindings, options);
        }
    }
    init(widget, bindings, options) {
        super.init(widget.element[0], bindings, options);
        this.widget = widget;
        this._change = this.change.bind(this);
        this.widget.first(CHANGE, this._change);
        const value = this.bindings.value.get();
        this._valueIsObservableObject = !options.valuePrimitive && (value == null || value instanceof ObservableObject);
        this._valueIsObservableArray = value instanceof ObservableArray;
        this._initChange = false;
    }
    change() {
        let value = this.widget.value();
        const field = this.options.dataValueField || this.options.dataTextField;
        const isArray = toString.call(value) === "[object Array]";
        const isObservableObject = this._valueIsObservableObject;
        let valueIndex;
        let valueLength;
        let values = [];
        let sourceItem;
        let sourceValue;
        let idx;
        let source;
        this._initChange = true;
        if (field) {
            if (value === "" && (isObservableObject || this.options.valuePrimitive)) {
                value = null;
            }
            else {
                source = this._source();
                if (isArray) {
                    valueLength = value.length;
                    values = value.slice(0);
                }
                for (idx = 0; idx < source.length; idx++) {
                    sourceItem = source[idx];
                    sourceValue = sourceItem instanceof ObservableObject ? sourceItem.get(field) : sourceItem;
                    if (isArray) {
                        const itemCount = valueLength ?? 0;
                        for (valueIndex = 0; valueIndex < itemCount; valueIndex++) {
                            if (sourceValue == values[valueIndex]) {
                                values[valueIndex] = sourceItem;
                                break;
                            }
                        }
                    }
                    else if (sourceValue == value) {
                        value = isObservableObject ? sourceItem : sourceValue;
                        break;
                    }
                }
                if (values[0]) {
                    if (this._valueIsObservableArray) {
                        value = values;
                    }
                    else if (isObservableObject || !field) {
                        value = values[0];
                    }
                    else {
                        value = values[0] instanceof ObservableObject ? values[0].get(field) : values[0];
                    }
                }
            }
        }
        this.bindings.value.set(value);
        this._initChange = false;
    }
    refresh() {
        if (!this._initChange) {
            const widget = this.widget;
            const options = widget.options;
            const textField = options.dataTextField;
            const valueField = options.dataValueField || textField;
            let value = this.bindings.value.get();
            let text = options.text || "";
            let idx = 0;
            let length;
            const values = [];
            if (value === undefined) {
                value = null;
            }
            if (valueField) {
                if (value instanceof ObservableArray) {
                    for (length = value.length; idx < length; idx++) {
                        const item = value[idx];
                        values[idx] = item instanceof ObservableObject ? item.get(valueField) : item;
                    }
                    value = values;
                }
                else if (value instanceof ObservableObject) {
                    text = textField ? String(value.get(textField) ?? "") : text;
                    value = value.get(valueField);
                }
            }
            if (options.autoBind === false && !options.cascadeFrom && widget.listView && !widget.listView.bound()) {
                if (textField === valueField && !text) {
                    text = String(value);
                }
                if (!text && (value || value === 0) && options.valuePrimitive) {
                    widget.value(value);
                }
                else {
                    widget._preselect(value, text);
                }
            }
            else if (widget.options.name != "Upload") {
                widget.value(value);
            }
        }
        this._initChange = false;
    }
    destroy() {
        this.widget.unbind(CHANGE, this._change);
    }
    _source() {
        let source;
        if (this.widget.dataItem) {
            source = this.widget.dataItem();
            if (source && source instanceof ObservableObject) {
                return [source];
            }
        }
        if (this.bindings.source) {
            source = this.bindings.source.get();
        }
        if (!source || source instanceof DataSource) {
            source = this.widget.dataSource.flatView();
        }
        return source;
    }
}
WidgetValueBinder.applyEnumerablePrototype();
WidgetValueBinder.applyPrototypeMembers();
