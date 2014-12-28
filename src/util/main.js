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

    var now = Date.now;
    if (!now) {
        now = function() {
            return new Date().getTime();
        }
    }

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
        return color === "" || color === null || color === "none" || color === "transparent" || !defined(color);
    }

    // Exports ================================================================
    deepExtend(kendo, {
        util: {
            MAX_NUM: MAX_NUM,
            MIN_NUM: MIN_NUM,

            append: append,
            arrayLimits: arrayLimits,
            arrayMin: arrayMin,
            arrayMax: arrayMax,
            defined: defined,
            deg: deg,
            hashKey: hashKey,
            hashObject: hashObject,
            isNumber: isNumber,
            isTransparent: isTransparent,
            last: last,
            limitValue: limitValue,
            now: now,
            objectKey: objectKey,
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

    kendo.dataviz.util = kendo.util;

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
