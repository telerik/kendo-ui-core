import { Binder } from "../binder.js";
export class WidgetTextBinder extends Binder {
    constructor(widget, bindings, options) {
        super();
        if (this.init === WidgetTextBinder.prototype.init) {
            this.init(widget, bindings, options);
        }
    }
    init(widget, bindings, options) {
        super.init(widget.element[0], bindings, options);
        this.widget = widget;
    }
    refresh() {
        let text = this.bindings.text.get();
        if (text == null) {
            text = "";
        }
        this.widget.text(String(text));
    }
}
WidgetTextBinder.applyEnumerablePrototype();
WidgetTextBinder.applyPrototypeMembers();
