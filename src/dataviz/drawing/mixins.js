(function(f, define){
    define([], f);
})(function(){

(function ($) {

    // Imports ================================================================
    var kendo = window.kendo,
        deepExtend = kendo.deepExtend,

        dataviz = kendo.dataviz,

        util = dataviz.util,
        defined = util.defined;

    // Mixins =================================================================
    var Paintable = {
        fill: function(color, opacity) {
            this.options.set("fill.color", color);

            if (defined(opacity)) {
                this.options.set("fill.opacity", opacity);
            }

            return this;
        },

        stroke: function(color, width, opacity) {
            this.options.set("stroke.color", color);

            if (defined(width)) {
               this.options.set("stroke.width", width);
            }

            if (defined(opacity)) {
               this.options.set("stroke.opacity", opacity);
            }

            return this;
        }
    };

    // Exports ================================================================
    deepExtend(dataviz, {
        drawing: {
            mixins: {
                Paintable: Paintable
            }
        }
    });

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
