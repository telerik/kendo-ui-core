import { Binder } from "../binder.js";
export class WidgetEventsBinder extends Binder {
    constructor(widget, bindings, options) {
        super();
        if (this.init === WidgetEventsBinder.prototype.init) {
            this.init(widget, bindings, options);
        }
    }
    init(widget, bindings, options) {
        super.init(widget.element[0], bindings, options);
        this.widget = widget;
        this.handlers = {};
    }
    refresh(key) {
        const binding = this.bindings.events[key];
        let handler = this.handlers[key];
        if (handler) {
            this.widget.unbind(key, handler);
        }
        const resolvedHandler = binding.get();
        if (typeof resolvedHandler === "function") {
            this.handlers[key] = function (e) {
                e.data = binding.source;
                resolvedHandler(e);
                if (e.data === binding.source) {
                    delete e.data;
                }
            };
            this.widget.bind(key, this.handlers[key]);
        }
    }
    destroy() {
        let handler;
        for (handler in this.handlers) {
            this.widget.unbind(handler, this.handlers[handler]);
        }
    }
}
WidgetEventsBinder.applyEnumerablePrototype();
WidgetEventsBinder.applyPrototypeMembers();
