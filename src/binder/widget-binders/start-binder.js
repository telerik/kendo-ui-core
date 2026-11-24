import { Binder, CHANGE } from "../binder.js";
export class WidgetStartBinder extends Binder {
    constructor(widget, bindings, options) {
        super();
        if (this.init === WidgetStartBinder.prototype.init) {
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
        this.bindings.start.set(this.widget.range().start);
    }
    refresh() {
        const start = this.bindings.start.get();
        const end = this.widget._range ? this.widget._range.end : null;
        this.widget.range({
            start: start,
            end: end
        });
    }
    destroy() {
        this.widget.unbind(CHANGE, this._change);
    }
}
WidgetStartBinder.applyEnumerablePrototype();
WidgetStartBinder.applyPrototypeMembers();
