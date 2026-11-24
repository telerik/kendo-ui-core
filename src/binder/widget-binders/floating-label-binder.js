import { Binder } from "../binder.js";
export class FloatingLabelBinder extends Binder {
    constructor(widget, bindings, options) {
        super();
        if (this.init === FloatingLabelBinder.prototype.init) {
            this.init(widget, bindings, options);
        }
    }
    init(widget, bindings, options) {
        super.init(widget.element[0], bindings, options);
        if (widget.floatingLabel) {
            widget.floatingLabel.refresh();
        }
    }
}
FloatingLabelBinder.applyEnumerablePrototype();
FloatingLabelBinder.applyPrototypeMembers();
