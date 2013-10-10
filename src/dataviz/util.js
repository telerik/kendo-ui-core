(function () {

    // TODO
    // Remove duplicate functions from dataviz.core

    // Imports ================================================================
    var kendo = window.kendo,
        deepExtend = kendo.deepExtend,
        dataviz = kendo.dataviz;

    // Generic utility functions ==============================================
    function defined(value) {
        return typeof value !== UNDEFINED;
    }

    // Template helpers =======================================================
    function renderAttr(name, value) {
        return defined(value) ? " " + name + "='" + value + "' " : "";
    };

    function renderSize(size) {
        if (typeof size !== "string") {
            size += "px";
        }

        return size;
    }

    // Exports ================================================================
    deepExtend(dataviz, {
        util: {
            defined: defined,

            renderAttr: renderAttr,
            renderSize: renderSize
        }
    });

})(window.kendo.jQuery);
