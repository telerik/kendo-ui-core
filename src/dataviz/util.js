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

    function renderSize(size) {
        if (typeof size !== "string") {
            size += "px";
        }

        return size;
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
            renderSize: renderSize,
            valueOrDefault: valueOrDefault
        }
    });

})(window.kendo.jQuery);
