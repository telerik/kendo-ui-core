(function () {

    // Imports ================================================================
    var $ = jQuery,
        doc = document,
        noop = $.noop,
        toString = Object.prototype.toString,

        kendo = window.kendo,
        Class = kendo.Class,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz;

    // Stage node ============================================================
    var BaseNode = Class.extend({
        init: function(srcElement) {
            this.childNodes = [];
            this.parent = null;

            if (srcElement) {
                this.srcElement = srcElement;
                srcElement.observer = this;
            }
        },

        load: noop,

        append: function(node) {
            this.childNodes.push(node);
            node.parent = this;
        },

        remove: function(index, count) {
            for (var i = index; i < count; i++) {
                this.childNodes[i].clear();
            }
            this.childNodes.splice(index, count);

            this.parent = null;
        },

        clear: function() {
            this.remove(0, this.childNodes.length);
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
                this.load(e.items);
            } else if (e.action === "remove") {
                this.remove(e.index, e.items.length);
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
                    this.observer.optionsChange({
                        field: this.prefix + field,
                        value: value
                    });
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

                    if (!obj) {
                        obj = new OptionsStore({}, path + ".");
                        obj.observer = this;
                        this[path] = obj;
                    }

                    if (obj instanceof OptionsStore) {
                        obj.set(parts.join("."), value);
                        return composite;
                    }

                    path += ".";
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

    var SurfaceFactory = function() {
        this._views = [];
    };

    SurfaceFactory.prototype = {
        register: function(name, type, order) {
            var views = this._views,
                defaultView = views[0],
                entry = {
                    name: name,
                    type: type,
                    order: order
                };

            if (!defaultView || order < defaultView.order) {
                views.unshift(entry);
            } else {
                views.push(entry);
            }
        },

        create: function(element, options, preferred) {
            var views = this._views,
                match = views[0];

            if (preferred) {
                preferred = preferred.toLowerCase();
                for (var i = 0; i < views.length; i++) {
                    if (views[i].name === preferred) {
                        match = views[i];
                        break;
                    }
                }
            }

            if (match) {
                return new match.type(element, options);
            }

            kendo.logToConsole(
                "Warning: KendoUI DataViz cannot render. Possible causes:\n" +
                "- The browser does not support SVG, VML and Canvas. User agent: " + navigator.userAgent + "\n" +
                "- The kendo.dataviz.(svg|vml|canvas).js scripts are not loaded");
        }
    };

    SurfaceFactory.current = new SurfaceFactory();

    kendo.support.svg = (function() {
        return doc.implementation.hasFeature(
            "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
    })();

    kendo.support.canvas = (function() {
        return !!doc.createElement("canvas").getContext;
    })();

    // Exports ================================================================
    deepExtend(dataviz, {
        drawing: {
            BaseNode: BaseNode,
            OptionsStore: OptionsStore,
            SurfaceFactory: SurfaceFactory
        }
    });

})(window.kendo.jQuery);
