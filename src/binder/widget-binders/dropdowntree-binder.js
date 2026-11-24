import { ObservableArray } from "../../data/observable-array.js";
import { ObservableObject } from "../../data/observable-object.js";
import { Binder, CHANGE, VALUE } from "../binder.js";
import { arraySplice } from "./common.js";
export class DropDownTreeValueBinder extends Binder {
    constructor(widget, bindings, options) {
        super();
        if (this.init === DropDownTreeValueBinder.prototype.init) {
            this.init(widget, bindings, options);
        }
    }
    init(widget, bindings, options) {
        super.init(widget.element[0], bindings, options);
        this.widget = widget;
        this._change = this.change.bind(this);
        this.widget.first(CHANGE, this._change);
        this._initChange = false;
    }
    change() {
        const that = this;
        const oldValues = that.bindings[VALUE].get();
        const valuePrimitive = that.options.valuePrimitive;
        const selectedNode = that.widget.treeview.select();
        const nonPrimitiveValues = that.widget._isMultipleSelection() ? that.widget._getAllChecked() : that.widget.treeview.dataItem(selectedNode) || that.widget.value();
        let newValues = valuePrimitive || that.widget.options.autoBind === false ? that.widget.value() : nonPrimitiveValues;
        const field = this.options.dataValueField || this.options.dataTextField;
        that._initChange = true;
        if (oldValues instanceof ObservableArray) {
            const remove = [];
            const nextValues = Array.isArray(newValues) ? newValues.slice(0) : [newValues];
            let newLength = nextValues.length;
            let i = 0;
            let j = 0;
            let old = oldValues[i];
            let same = false;
            let removeIndex;
            let newValue;
            let found;
            while (old !== undefined) {
                found = false;
                for (j = 0; j < newLength; j++) {
                    if (valuePrimitive) {
                        same = nextValues[j] == old;
                    }
                    else {
                        newValue = nextValues[j];
                        newValue = field && newValue instanceof ObservableObject ? newValue.get(field) : newValue;
                        same = newValue == (field && old instanceof ObservableObject ? old.get(field) : old);
                    }
                    if (same) {
                        nextValues.splice(j, 1);
                        newLength -= 1;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    remove.push(old);
                    arraySplice(oldValues, i, 1);
                    removeIndex = i;
                }
                else {
                    i += 1;
                }
                old = oldValues[i];
            }
            arraySplice(oldValues, oldValues.length, 0, nextValues);
            if (remove.length) {
                oldValues.trigger("change", {
                    action: "remove",
                    items: remove,
                    index: removeIndex
                });
            }
            if (nextValues.length) {
                oldValues.trigger("change", {
                    action: "add",
                    items: nextValues,
                    index: oldValues.length - 1
                });
            }
        }
        else {
            that.bindings[VALUE].set(newValues);
        }
        that._initChange = false;
    }
    refresh() {
        if (!this._initChange) {
            const options = this.options;
            const widget = this.widget;
            const field = options.dataValueField || options.dataTextField;
            let value = this.bindings.value.get();
            const data = value;
            let idx = 0;
            const values = [];
            let selectedValue;
            if (field) {
                if (value instanceof ObservableArray) {
                    for (; idx < value.length; idx++) {
                        selectedValue = value[idx];
                        values[idx] = selectedValue instanceof ObservableObject ? selectedValue.get(field) : selectedValue;
                    }
                    value = values;
                }
                else if (value instanceof ObservableObject) {
                    value = value.get(field);
                }
            }
            if (options.autoBind === false && options.valuePrimitive !== true) {
                widget._preselect(data, value);
            }
            else {
                widget.value(value);
            }
        }
    }
    destroy() {
        this.widget.unbind(CHANGE, this._change);
    }
}
DropDownTreeValueBinder.applyEnumerablePrototype();
DropDownTreeValueBinder.applyPrototypeMembers();
