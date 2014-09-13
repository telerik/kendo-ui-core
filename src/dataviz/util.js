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
        dataviz = kendo.dataviz;

    // Constants
    var DEG_TO_RAD = math.PI / 180,
        MAX_NUM = Number.MAX_VALUE,
        MIN_NUM = -Number.MAX_VALUE,
        UNDEFINED = "undefined",
        inArray = $.inArray,
        push = [].push,
        pop = [].pop,
        splice = [].splice,
        shift = [].shift,
        slice = [].slice,
        unshift = [].unshift;

    // Generic utility functions ==============================================
    function defined(value) {
        return typeof value !== UNDEFINED;
    }

    function round(value, precision) {
        var power = pow(precision);
        return math.round(value * power) / power;
    }

    // Extracted from round to get on the V8 "fast path"
    function pow(p) {
        if (p) {
            return math.pow(10, p);
        } else {
            return 1;
        }
    }

    function limitValue(value, min, max) {
        return math.max(math.min(value, max), min);
    }

    function rad(degrees) {
        return degrees * DEG_TO_RAD;
    }

    function deg(radians) {
        return radians / DEG_TO_RAD;
    }

    function alignToPixel(coord) {
        return math.round(coord) + 0.5;
    }

    function isNumber(val) {
        return typeof val === "number" && !isNaN(val);
    }

    function valueOrDefault(value, defaultValue) {
        return defined(value) ? value : defaultValue;
    }

    function sqr(value) {
        return value * value;
    }

    function objectKey(object) {
        var parts = [];
        for (var key in object) {
            parts.push(key + object[key]);
        }

        return parts.sort().join("");
    }

    // Computes FNV-1 hash
    // See http://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function
    function hashKey(str) {
        // 32-bit FNV-1 offset basis
        // See http://isthe.com/chongo/tech/comp/fnv/#FNV-param
        var hash = 0x811C9DC5;

        for (var i = 0; i < str.length; ++i)
        {
            hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
            hash ^= str.charCodeAt(i);
        }

        return hash >>> 0;
    }

    function hashObject(object) {
        return hashKey(objectKey(object));
    }

    // Mixins =================================================================
    function geometryChange() {
        if (this.observer) {
            this.observer.geometryChange();
        }
    }

    var ObserversMixin = {
        observers: function() {
            this._observers = this._observers || [];
            return this._observers;
        },

        addObserver: function(element) {
            var observers = this.observers();
            observers.push(element);
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
            var observers = this.observers();
            var length = observers.length;
            var observer;
            var idx;

            if (!this._suspended) {
                for (idx = 0; idx < length; idx++) {
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
            this._suspended = true;
            return this;
        },

        resume: function() {
            this._suspended = false;
            return this;
        }
    };

    // Array helpers ==========================================================
    function arrayLimits(arr) {
        var length = arr.length,
            i,
            min = MAX_NUM,
            max = MIN_NUM;

        for (i = 0; i < length; i ++) {
            max = math.max(max, arr[i]);
            min = math.min(min, arr[i]);
        }

        return {
            min: min,
            max: max
        };
    }

    function arrayMin(arr) {
        return arrayLimits(arr).min;
    }

    function arrayMax(arr) {
        return arrayLimits(arr).max;
    }

    function sparseArrayMin(arr) {
        return sparseArrayLimits(arr).min;
    }

    function sparseArrayMax(arr) {
        return sparseArrayLimits(arr).max;
    }

    function sparseArrayLimits(arr) {
        var min = MAX_NUM,
            max = MIN_NUM;

        for (var i = 0, length = arr.length; i < length; i++) {
            var n = arr[i];
            if (n !== null && isFinite(n)) {
                min = math.min(min, n);
                max = math.max(max, n);
            }
        }

        return {
            min: min === MAX_NUM ? undefined : min,
            max: max === MIN_NUM ? undefined : max
        };
    }

    function last(array) {
        if (array) {
            return array[array.length - 1];
        }
    }

    function append(first, second) {
        first.push.apply(first, second);
        return first;
    }

    var ElementsArray = kendo.Class.extend({
        init: function(array) {
            array = array || [];
            this._splice(0, array.length, array);
        },

        elements: function(elements) {
            if (elements) {
                this._splice(0, this.length, elements);

                this._change();
                return this;
            } else {
                return this.slice(0);
            }
        },

        push: function() {
            var elements = arguments;
            var result = push.apply(this, elements);

            this._add(elements);

            return result;
        },

        slice: slice,

        pop: function() {
            var length = this.length;
            var result = pop.apply(this);

            if (length) {
                this._remove([result]);
            }

            return result;
        },

        splice: function(index, howMany) {
            var elements = slice.call(arguments, 2);
            var result = this._splice(index, howMany, elements);

            this._change();

            return result;
        },

        shift: function() {
            var length = this.length;
            var result = shift.apply(this);

            if (length) {
                this._remove([result]);
            }

            return result;
        },

        unshift: function() {
            var elements = arguments;
            var result = unshift.apply(this, elements);

            this._add(elements);

            return result;
        },

        indexOf: function(element) {
            var that = this;
            var idx;
            var length;

            for (idx = 0, length = that.length; idx < length; idx++) {
                if (that[idx] === element) {
                    return idx;
                }
            }
            return -1;
        },

        _splice: function(index, howMany, elements) {
            var result = splice.apply(this, [index, howMany].concat(elements));

            this._clearObserver(result);
            this._setObserver(elements);

            return result;
        },

        _add: function(elements) {
            this._setObserver(elements);
            this._change();
        },

        _remove: function(elements) {
            this._clearObserver(elements);
            this._change();
        },

        _setObserver: function(elements) {
            for (var idx = 0; idx < elements.length; idx++) {
                elements[idx].addObserver(this);
            }
        },

        _clearObserver: function(elements) {
            for (var idx = 0; idx < elements.length; idx++) {
                elements[idx].removeObserver(this);
            }
        },

        _change: function() {}
    });

    deepExtend(ElementsArray.fn, ObserversMixin);

    // Template helpers =======================================================
    function renderTemplate(text) {
        return kendo.template(text, { useWithBlock: false, paramName: "d" });
    }

    function renderAttr(name, value) {
        return (defined(value) && value !== null) ? " " + name + "='" + value + "' " : "";
    }

    function renderAllAttr(attrs) {
        var output = "";
        for (var i = 0; i < attrs.length; i++) {
            output += renderAttr(attrs[i][0], attrs[i][1]);
        }

        return output;
    }

    function renderStyle(attrs) {
        var output = "";
        for (var i = 0; i < attrs.length; i++) {
            var value = attrs[i][1];
            if (defined(value)) {
                output += attrs[i][0] + ":" + value + ";";
            }
        }

        if (output !== "") {
            return output;
        }
    }

    function renderSize(size) {
        if (typeof size !== "string") {
            size += "px";
        }

        return size;
    }

    function renderPos(pos) {
        var result = [];

        if (pos) {
            var parts = kendo.toHyphens(pos).split("-");

            for (var i = 0; i < parts.length; i++) {
                result.push("k-pos-" + parts[i]);
            }
        }

        return result.join(" ");
    }

    function isTransparent(color) {
        return color === "" || color === "none" || color === "transparent";
    }

    // Exports ================================================================
    deepExtend(dataviz, {
        util: {
            MAX_NUM: MAX_NUM,
            MIN_NUM: MIN_NUM,

            mixins: {
                geometryChange: geometryChange
            },

            alignToPixel: alignToPixel,
            append: append,
            arrayLimits: arrayLimits,
            arrayMin: arrayMin,
            arrayMax: arrayMax,
            defined: defined,
            deg: deg,
            ElementsArray: ElementsArray,
            hashKey: hashKey,
            hashObject: hashObject,
            isNumber: isNumber,
            isTransparent: isTransparent,
            last: last,
            limitValue: limitValue,
            objectKey: objectKey,
            ObserversMixin: ObserversMixin,
            round: round,
            rad: rad,
            renderAttr: renderAttr,
            renderAllAttr: renderAllAttr,
            renderPos: renderPos,
            renderSize: renderSize,
            renderStyle: renderStyle,
            renderTemplate: renderTemplate,
            sparseArrayLimits: sparseArrayLimits,
            sparseArrayMin: sparseArrayMin,
            sparseArrayMax: sparseArrayMax,
            sqr: sqr,
            valueOrDefault: valueOrDefault
        }
    });
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
