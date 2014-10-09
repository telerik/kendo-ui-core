(function(f, define){
    define([ "../geometry" ], f);
})(function(){

(function ($) {

    // Imports ================================================================
    var doc = document,
        noop = $.noop,
        toString = Object.prototype.toString,

        kendo = window.kendo,
        Class = kendo.Class,
        Widget = kendo.ui.Widget,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,
        util = dataviz.util;

    // Base drawing surface ==================================================
    var Surface = kendo.Observable.extend({
        init: function(element, options) {
            kendo.Observable.fn.init.call(this);

            this.options = deepExtend({}, this.options, options);
            this.bind(this.events, this.options);

            this._click = this._handler("click");
            this._mouseenter = this._handler("mouseenter");
            this._mouseleave = this._handler("mouseleave");

            this.element = $(element);

            if (this.options.width) {
                this.element.css("width", this.options.width);
            }

            if (this.options.height) {
                this.element.css("height", this.options.height);
            }
        },

        options: { },

        events: [
            "click",
            "mouseenter",
            "mouseleave",
            "resize"
        ],

        draw: noop,
        clear: noop,
        destroy: noop,

        resize: Widget.fn.resize,
        size: Widget.fn.size,

        getSize: function() {
            return {
                width: this.element.width(),
                height: this.element.height()
            };
        },

        setSize: function(size) {
            this.element.css({
                width: size.width,
                height: size.height
            });

            this._size = size;
            this._resize();
        },

        eventTarget: function(e) {
            var domNode = $(e.touch ? e.touch.initialTouch : e.target);
            var node;

            while (!node) {
                node = domNode.data("kendoNode");
                if (domNode.is(this.element) || domNode.length === 0) {
                    break;
                }

                domNode = domNode.parent();
            }

            return node;
        },

        _resize: noop,

        _handler: function(event) {
            var surface = this;

            return function(e) {
                var node = surface.eventTarget(e);
                if (node) {
                    surface.trigger(event, {
                        element: node.srcElement,
                        originalEvent: e
                    });
                }
            };
        }
    });

    Surface.create = function(element, options) {
        return SurfaceFactory.current.create(element, options);
    };

    // Base surface node =====================================================
    var BaseNode = Class.extend({
        init: function(srcElement) {
            this.childNodes = [];
            this.parent = null;

            if (srcElement) {
                this.srcElement = srcElement;
            }
        },

        destroy: noop,
        load: noop,

        append: function(node) {
            this.childNodes.push(node);
            node.parent = this;
        },

        remove: function(index, count) {
            var end = index + count;
            for (var i = index; i < end; i++) {
                this.childNodes[i].clear();
                this.childNodes[i].parent = null;
            }
            this.childNodes.splice(index, count);
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
        init: function(options, prefix) {
            var field,
                member;

            this.prefix = prefix || "";

            for (field in options) {
                member = options[field];
                member = this._wrap(member, field);
                this[field] = member;
            }
        },

        get: function(field) {
            return kendo.getter(field, true)(this);
        },

        set: function(field, value) {
            var current = kendo.getter(field, true)(this);

            if (current !== value) {
                var composite = this._set(field, this._wrap(value, field));
                if (!composite) {
                    this.optionsChange({
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
                        obj.addObserver(this);
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

        _wrap: function(object, field) {
            var type = toString.call(object);

            if (object !== null && type === "[object Object]") {
                if (!(object instanceof OptionsStore) && !(object instanceof Class)) {
                    object = new OptionsStore(object, this.prefix + field + ".");
                }

                object.addObserver(this);
            }

            return object;
        }
    });
    deepExtend(OptionsStore.fn, util.ObserversMixin);

    var SurfaceFactory = function() {
        this._items = [];
    };

    SurfaceFactory.prototype = {
        register: function(name, type, order) {
            var items = this._items,
                first = items[0],
                entry = {
                    name: name,
                    type: type,
                    order: order
                };

            if (!first || order < first.order) {
                items.unshift(entry);
            } else {
                items.push(entry);
            }
        },

        create: function(element, options) {
            var items = this._items,
                match = items[0];

            if (options && options.type) {
                var preferred = options.type.toLowerCase();
                for (var i = 0; i < items.length; i++) {
                    if (items[i].name === preferred) {
                        match = items[i];
                        break;
                    }
                }
            }

            if (match) {
                return new match.type(element, options);
            }

            kendo.logToConsole(
                "Warning: Unable to create Kendo UI Drawing Surface. Possible causes:\n" +
                "- The browser does not support SVG, VML and Canvas. User agent: " + navigator.userAgent + "\n" +
                "- The Kendo UI scripts are not fully loaded");
        }
    };

    SurfaceFactory.current = new SurfaceFactory();

    // Exports ================================================================
    deepExtend(dataviz, {
        drawing: {
            DASH_ARRAYS: {
                dot: [1.5, 3.5],
                dash: [4, 3.5],
                longdash: [8, 3.5],
                dashdot: [3.5, 3.5, 1.5, 3.5],
                longdashdot: [8, 3.5, 1.5, 3.5],
                longdashdotdot: [8, 3.5, 1.5, 3.5, 1.5, 3.5]
            },

            BaseNode: BaseNode,
            OptionsStore: OptionsStore,
            Surface: Surface,
            SurfaceFactory: SurfaceFactory
        }
    });

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
