(function () {

    // Imports ================================================================
    var $ = jQuery,
        noop = $.noop,
        toString = Object.prototype.toString,

        kendo = window.kendo,
        Class = kendo.Class,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz;

    // Stage node ============================================================
    var BaseNode = Class.extend({
        init: function(srcElement) {
            var node = this;

            node.childNodes = [];

            this.parent = null;

            if (srcElement) {
                node.srcElement = srcElement;
                srcElement.observer = node;
            }
        },

        load: noop,

        unload: noop,

        empty: function() {
            this.unload(0, this.childNodes.length);
        },

        invalidate: function() {
            if (this.parent) {
                this.parent.invalidate();
            }
        },

        geometryChange: function() {
            this.invalidate();
        },

        optionsChange: function() {
            this.invalidate();
        },

        childrenChange: function(e) {
            if (e.action === "add") {
                // TODO: Support mid-array inserts
                this.load(e.items);
            } else if (e.action === "remove") {
                this.unload(e.index, e.items.length);
            }

            this.invalidate();
        }
    });

    // Options storage with optional observer =============================
    var OptionsStore = Class.extend({
        init: function(value, prefix) {
            var field,
                member;

            this.observer = null;
            this.prefix = prefix || "";

            for (field in value) {
                member = value[field];
                member = this.wrap(member, field);
                this[field] = member;
            }
        },

        optionsChange: function(e) {
            if (this.observer) {
                this.observer.optionsChange(e);
            }
        },

        get: function(field) {
            return kendo.getter(field, true)(this);
        },

        set: function(field, value) {
            var current = kendo.getter(field, true)(this);

            if (current !== value) {
                var composite = this._set(field, this.wrap(value, field));
                if (this.observer && !composite) {
                    this.observer.optionsChange({ field: this.prefix + field });
                }
            }
        },

        _set: function(field, value) {
            var composite = field.indexOf(".") >= 0;

            if (composite) {
                var parts = field.split("."),
                    path = "",
                    obj;

                while (parts.length > 1) {
                    path += parts.shift();
                    obj = kendo.getter(path, true)(this);
                    path += ".";

                    if (!obj) {
                        obj = new OptionsStore({}, path);
                        obj.observer = this;
                    }

                    if (obj instanceof OptionsStore) {
                        obj.set(parts.join("."), value);
                        return composite;
                    }
                }
            }

            kendo.setter(field)(this, value);

            return composite;
        },

        wrap: function(object, field) {
            var type = toString.call(object);

            if (object !== null && type === "[object Object]") {
                if (!(object instanceof OptionsStore)) {
                    object = new OptionsStore(object, this.prefix + field + ".");
                }

                object.observer = this;
            }

            return object;
        }
    });

    // Exports ================================================================
    deepExtend(dataviz, {
        drawing: {
            BaseNode: BaseNode,
            OptionsStore: OptionsStore
        }
    });

})(window.kendo.jQuery);
