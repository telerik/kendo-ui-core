import { Binder } from "../binder.js";
export class WidgetDisabledBinder extends Binder {
    constructor(widget, bindings, options) {
        super();
        if (this.init === WidgetDisabledBinder.prototype.init) {
            this.init(widget, bindings, options);
        }
    }
    init(widget, bindings, options) {
        super.init(widget.element[0], bindings, options);
        this.widget = widget;
    }
    refresh() {
        if (this.widget.enable) {
            this.widget.enable(!this.bindings.disabled.get());
        }
    }
}
WidgetDisabledBinder.applyEnumerablePrototype();
WidgetDisabledBinder.applyPrototypeMembers();
