import { Binder } from "../binder.js";
export class WidgetEnabledBinder extends Binder {
    constructor(widget, bindings, options) {
        super();
        if (this.init === WidgetEnabledBinder.prototype.init) {
            this.init(widget, bindings, options);
        }
    }
    init(widget, bindings, options) {
        super.init(widget.element[0], bindings, options);
        this.widget = widget;
        this.readonly = this.element.readOnly;
    }
    refresh() {
        if (this.widget.enable) {
            this.widget.enable(this.bindings.enabled.get());
        }
        if (this.readonly && this.widget.readonly) {
            this.widget.readonly(this.readonly);
        }
    }
}
WidgetEnabledBinder.applyEnumerablePrototype();
WidgetEnabledBinder.applyPrototypeMembers();
