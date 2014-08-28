(function(f, define){
    define([ "./shapes", "../../kendo.pdf" ], f);
})(function(){
    
    var $ = jQuery,
        kendo = window.kendo,
        dataviz = kendo.dataviz,
        d = dataviz.drawing;

    var Surface = d.Surface.extend({
        type: "pdf",

        init: function(element, options) {

        },

        draw: function(element) {
            console.log(element);
        }
    });

    d.SurfaceFactory.current.register("pdf", Surface, 100);

    kendo.deepExtend(d, {
        pdf: {
            Surface: Surface
        }
    });
    
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
