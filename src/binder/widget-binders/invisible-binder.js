import { Binder } from "../binder.js";
export class WidgetInvisibleBinder extends Binder {
    constructor(widget, bindings, options) {
        super();
        if (this.init === WidgetInvisibleBinder.prototype.init) {
            this.init(widget, bindings, options);
        }
    }
    init(widget, bindings, options) {
        super.init(widget.element[0], bindings, options);
        this.widget = widget;
    }
    refresh() {
        const invisible = this.bindings.invisible.get();
        (this.widget.wrapper || this.widget.element)[0].style.display = invisible ? "none" : "";
    }
}
WidgetInvisibleBinder.applyEnumerablePrototype();
WidgetInvisibleBinder.applyPrototypeMembers();
