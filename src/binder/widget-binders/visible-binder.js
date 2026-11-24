import { Binder } from "../binder.js";
export class WidgetVisibleBinder extends Binder {
    constructor(widget, bindings, options) {
        super();
        if (this.init === WidgetVisibleBinder.prototype.init) {
            this.init(widget, bindings, options);
        }
    }
    init(widget, bindings, options) {
        super.init(widget.element[0], bindings, options);
        this.widget = widget;
    }
    refresh() {
        const visible = this.bindings.visible.get();
        (this.widget.wrapper || this.widget.element)[0].style.display = visible ? "" : "none";
    }
}
WidgetVisibleBinder.applyEnumerablePrototype();
WidgetVisibleBinder.applyPrototypeMembers();
