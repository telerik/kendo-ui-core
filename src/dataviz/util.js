(function(f, define){
    define([ "../kendo.dataviz.core" ], f);
})(function(){

(function () {

    // TODO
    // Remove duplicate functions from core, chart, map

    // Imports ================================================================
    var math = Math,
        kendo = window.kendo,
        deepExtend = kendo.deepExtend,
        dataviz = kendo.dataviz;

    // Constants
    var DEG_TO_RAD = math.PI / 180,
        UNDEFINED = "undefined";

    // Generic utility functions ==============================================
    function defined(value) {
        return typeof value !== UNDEFINED;
    }

    function round(value, precision) {
        var power = math.pow(10, precision || 0);
        return math.round(value * power) / power;
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

    // Template helpers =======================================================
    function renderAttr(name, value) {
        return defined(value) ? " " + name + "='" + value + "' " : "";
    }

    function renderAllAttr(attrs) {
        var output = "";
        for (var i = 0; i < attrs.length; i++) {
            output += renderAttr(attrs[i][0], attrs[i][1]);
        }

        return output;
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

    // Mixins =================================================================
    function geometryChange() {
        if (this.observer) {
            this.observer.geometryChange();
        }
    }

    // Exports ================================================================
    deepExtend(dataviz, {
        util: {
            mixins: {
                geometryChange: geometryChange
            },

            alignToPixel: alignToPixel,
            defined: defined,
            deg: deg,
            isNumber: isNumber,
            limitValue: limitValue,
            round: round,
            rad: rad,
            renderAttr: renderAttr,
            renderAllAttr: renderAllAttr,
            renderPos: renderPos,
            renderSize: renderSize,
            valueOrDefault: valueOrDefault
        }
    });

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
