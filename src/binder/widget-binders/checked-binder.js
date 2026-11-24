import { Binder, CHANGE, CHECKED } from "../binder.js";
export class WidgetCheckedBinder extends Binder {
    constructor(widget, bindings, options) {
        super();
        if (this.init === WidgetCheckedBinder.prototype.init) {
            this.init(widget, bindings, options);
        }
    }
    init(widget, bindings, options) {
        super.init(widget.element[0], bindings, options);
        this.widget = widget;
        this._change = this.change.bind(this);
        this.widget.bind(CHANGE, this._change);
    }
    change() {
        this.bindings[CHECKED].set(this.value());
    }
    refresh() {
        const val = this.bindings[CHECKED].get();
        if (this.element.type === "radio") {
            if (val != null) {
                this.widget.check(val.toString() === this.value());
            }
            else {
                this.widget.check(false);
            }
        }
        else {
            this.widget.check(val === true);
        }
    }
    value() {
        const element = this.element;
        let value = element.value;
        if (value == "on" || value == "off" || this.element.type == "checkbox") {
            value = element.checked;
        }
        return value;
    }
    destroy() {
        this.widget.unbind(CHANGE, this._change);
    }
}
WidgetCheckedBinder.applyEnumerablePrototype();
WidgetCheckedBinder.applyPrototypeMembers();
