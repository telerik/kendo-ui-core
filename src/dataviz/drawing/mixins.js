(function(f, define){
    define([ "./core" ], f);
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
            if (defined(color)) {
                this.options.set("fill.color", color);

                if (defined(opacity)) {
                    this.options.set("fill.opacity", opacity);
                }

                return this;
            } else {
                return this.options.get("fill");
            }
        },

        stroke: function(color, width, opacity) {
            if (defined(color)) {
                this.options.set("stroke.color", color);

                if (defined(width)) {
                   this.options.set("stroke.width", width);
                }

                if (defined(opacity)) {
                   this.options.set("stroke.opacity", opacity);
                }

                return this;
            } else {
                return this.options.get("stroke");
            }
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
