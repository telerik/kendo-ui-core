import { widgetRegistryService } from "../../core/services/widget-registry.service.js";
import { DataSource } from "../../data/data-source.js";
import { HierarchicalDataSource } from "../../data/hierarchical-data-source.js";
import { Binder, bindElement, unbindElementTree, retrievePrimitiveValues } from "../binder.js";
function isWidgetNamespace(value) {
    return !!value && typeof value === "object" && "roles" in value;
}
function hasData(value) {
    return !!value && typeof value === "object" && typeof value.data === "function";
}
function hasFlatView(value) {
    return !!value && typeof value === "object" && typeof value.flatView === "function";
}
function hasWrappedDataSource(value) {
    return !!value && typeof value === "object" && value._dataSource instanceof DataSource;
}
function getParentBinding(bindings, bindingName) {
    const binding = bindings[bindingName];
    if (!binding || typeof binding !== "object" || typeof binding._parents !== "function") {
        throw new Error(`Missing '${bindingName}' binder parent binding`);
    }
    return binding;
}
function defaultNamespaces() {
    return [
        widgetRegistryService.getNamespace("ui"),
        widgetRegistryService.getNamespace("dataviz.ui")
    ].filter(isWidgetNamespace);
}
function orderedNamespaces(ns) {
    const namespaces = [
        ns ?? widgetRegistryService.getNamespace("ui"),
        ...defaultNamespaces(),
        widgetRegistryService.getNamespace("mobile.ui")
    ].filter(isWidgetNamespace);
    return namespaces.filter((value, index) => namespaces.indexOf(value) === index);
}
function widgetClass(name) {
    return widgetRegistryService.getWidget(name, "ui");
}
function asWidgetRecord(widget) {
    return widget;
}
function getWidgetField(widget, fieldName) {
    return asWidgetRecord(widget)[fieldName];
}
function callSetter(widget, setter, value) {
    const setterFn = getWidgetField(widget, setter);
    if (typeof setterFn === "function") {
        setterFn.call(widget, value);
    }
}
function bindWidgetEvent(widget, eventName, handler) {
    widget.bind(eventName, handler);
}
function unbindWidgetEvent(widget, eventName, handler) {
    widget.unbind(eventName, handler);
}
function asBindableParent(value) {
    return value;
}
function isWidgetOfType(widget, constructor) {
    return !!constructor && widget instanceof constructor;
}
function getTreeViewField(widget, fieldName) {
    const treeview = widget.treeview;
    return treeview && typeof treeview === "object"
        ? treeview[fieldName]
        : undefined;
}
export function dataSourceBinding(bindingName, fieldName, setter) {
    const DataSourceBinder = class DataSourceBinder extends Binder {
        constructor(widget, bindings, options) {
            super();
            if (this.init === DataSourceBinder.prototype.init) {
                this.init(widget, bindings, options);
            }
        }
        init(widget, bindings, options) {
            super.init(widget.element[0], bindings, options);
            this.widget = widget;
            this._dataBinding = this.dataBinding.bind(this);
            this._dataBound = this.dataBound.bind(this);
            this._itemChange = this.itemChange.bind(this);
        }
        itemChange(e) {
            const binding = getParentBinding(this.bindings, bindingName);
            bindElement(e.item[0], e.data, this._ns(e.ns), [asBindableParent(e.data), ...binding._parents()]);
        }
        dataBinding(e) {
            const items = e.removedItems ?? this.widget.items();
            for (let idx = 0; idx < items.length; idx++) {
                unbindElementTree(items[idx], false);
            }
        }
        _ns(ns) {
            return widgetRegistryService.rolesFromNamespaces(orderedNamespaces(ns), defaultNamespaces());
        }
        dataBound(e) {
            const widget = this.widget;
            const items = e.addedItems ?? widget.items();
            const dataSource = getWidgetField(widget, fieldName);
            if (dataSource instanceof HierarchicalDataSource || !items.length) {
                return;
            }
            const view = e.addedDataItems ?? (hasFlatView(dataSource) ? dataSource.flatView() : []);
            const parents = getParentBinding(this.bindings, bindingName)._parents();
            for (let idx = 0; idx < view.length; idx++) {
                if (items[idx]) {
                    bindElement(items[idx], view[idx], this._ns(e.ns), [asBindableParent(view[idx]), ...parents]);
                }
            }
        }
        refresh(e) {
            const widget = this.widget;
            const widgetField = getWidgetField(widget, fieldName);
            const select = widgetClass("Select");
            const multiselect = widgetClass("MultiSelect");
            const dropdowntree = widgetClass("DropDownTree");
            const event = typeof e === "string" ? {} : e ?? {};
            if (!event.action) {
                this.destroy();
                bindWidgetEvent(widget, "dataBinding", this._dataBinding);
                bindWidgetEvent(widget, "dataBound", this._dataBound);
                bindWidgetEvent(widget, "itemChange", this._itemChange);
                const sourceBinding = getParentBinding(this.bindings, bindingName);
                const sourceValue = sourceBinding.get();
                if (widgetField instanceof DataSource && widgetField !== sourceValue && sourceValue) {
                    if (sourceValue instanceof DataSource) {
                        callSetter(widget, setter, sourceValue);
                    }
                    else if (hasWrappedDataSource(sourceValue)) {
                        callSetter(widget, setter, sourceValue._dataSource);
                    }
                    else {
                        const isSelect = isWidgetOfType(widget, select);
                        const isMultiSelect = isWidgetOfType(widget, multiselect);
                        const isDropDownTree = isWidgetOfType(widget, dropdowntree);
                        if (!isDropDownTree) {
                            if (hasData(widgetField)) {
                                widgetField.data(sourceValue);
                            }
                        }
                        else {
                            const treeviewField = getTreeViewField(widget, fieldName);
                            if (hasData(treeviewField)) {
                                treeviewField.data(sourceValue);
                            }
                        }
                        if (this.bindings.value && (isSelect || isMultiSelect)) {
                            widget.value(retrievePrimitiveValues(this.bindings.value.get(), widget.options.dataValueField));
                        }
                    }
                }
            }
        }
        destroy() {
            unbindWidgetEvent(this.widget, "dataBinding", this._dataBinding);
            unbindWidgetEvent(this.widget, "dataBound", this._dataBound);
            unbindWidgetEvent(this.widget, "itemChange", this._itemChange);
        }
    };
    DataSourceBinder.applyEnumerablePrototype();
    DataSourceBinder.applyPrototypeMembers();
    return DataSourceBinder;
}
export function arraySplice(arr, idx, remove = 0, add = []) {
    let addLength = add.length;
    const oldLength = arr.length;
    const shifted = [].slice.call(arr, idx + remove);
    let shiftedLength = shifted.length;
    let index;
    if (addLength) {
        addLength = idx + addLength;
        index = 0;
        for (; idx < addLength; idx++) {
            arr[idx] = add[index];
            index++;
        }
        arr.length = addLength;
    }
    else if (remove) {
        arr.length = idx;
        remove += idx;
        while (idx < remove) {
            delete arr[--remove];
        }
    }
    if (shiftedLength) {
        shiftedLength = idx + shiftedLength;
        index = 0;
        for (; idx < shiftedLength; idx++) {
            arr[idx] = shifted[index];
            index++;
        }
        arr.length = shiftedLength;
    }
    idx = arr.length;
    while (idx < oldLength) {
        delete arr[idx];
        idx++;
    }
}
