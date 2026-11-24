import { Binder, CHANGE } from "../binder.js";
export class WidgetEndBinder extends Binder {
    constructor(widget, bindings, options) {
        super();
        if (this.init === WidgetEndBinder.prototype.init) {
            this.init(widget, bindings, options);
        }
    }
    init(widget, bindings, options) {
        super.init(widget.element[0], bindings, options);
        this._change = this.change.bind(this);
        this.widget = widget;
        this.widget.bind(CHANGE, this._change);
    }
    change() {
        this.bindings.end.set(this.widget.range().end);
    }
    refresh() {
        const end = this.bindings.end.get();
        const start = this.widget._range ? this.widget._range.start : null;
        this.widget.range({
            start: start,
            end: end
        });
    }
    destroy() {
        this.widget.unbind(CHANGE, this._change);
    }
}
WidgetEndBinder.applyEnumerablePrototype();
WidgetEndBinder.applyPrototypeMembers();
