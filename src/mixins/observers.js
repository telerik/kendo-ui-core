(function(f, define) {
    define([
        "../kendo.core"
    ], f);
})(function() {

(function ($) {
    // Imports ================================================================
    var math = Math,
        kendo = window.kendo,
        deepExtend = kendo.deepExtend,
        inArray = $.inArray;

    // Mixins =================================================================
    var ObserversMixin = {
        observers: function() {
            this._observers = this._observers || [];
            return this._observers;
        },

        addObserver: function(element) {
            if (!this._observers)  {
                this._observers = [element];
            } else {
                this._observers.push(element);
            }
            return this;
        },

        removeObserver: function(element) {
            var observers = this.observers();
            var index = inArray(element, observers);
            if (index != -1) {
                observers.splice(index, 1);
            }
            return this;
        },

        trigger: function(methodName, event) {
            var observers = this._observers;
            var observer;
            var idx;

            if (observers && !this._suspended) {
                for (idx = 0; idx < observers.length; idx++) {
                    observer = observers[idx];
                    if (observer[methodName]) {
                        observer[methodName](event);
                    }
                }
            }
            return this;
        },

        optionsChange: function(e) {
            this.trigger("optionsChange", e);
        },

        geometryChange: function(e) {
            this.trigger("geometryChange", e);
        },

        suspend: function() {
            this._suspended = (this._suspended || 0) + 1;
            return this;
        },

        resume: function() {
            this._suspended = math.max((this._suspended || 0) - 1, 0);
            return this;
        },

        _observerField: function(field, value) {
            if (this[field]) {
                this[field].removeObserver(this);
            }
            this[field] = value;
            value.addObserver(this);
        }
    };

    // Exports ================================================================
    deepExtend(kendo, {
        mixins: {
            ObserversMixin: ObserversMixin
        }
    });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
