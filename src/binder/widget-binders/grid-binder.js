import { bindElement } from "../binder.js";
import { dataSourceBinding } from "./common.js";
export class GridSourceBinder extends dataSourceBinding("source", "dataSource", "setDataSource") {
    dataBound(e) {
        let idx;
        const widget = this.widget;
        const elements = e.addedItems || widget.items();
        const sourceBinding = this.bindings.source;
        const roles = this._ns(e.ns);
        let parents;
        let data;
        if (elements.length) {
            data = e.addedDataItems || widget.dataItems();
            parents = sourceBinding._parents();
            for (idx = 0; idx < data.length; idx++) {
                bindElement(elements[idx], data[idx], roles, [data[idx], ...parents]);
            }
        }
    }
}
GridSourceBinder.fn = GridSourceBinder.prototype;
GridSourceBinder.applyEnumerablePrototype();
GridSourceBinder.applyPrototypeMembers();
