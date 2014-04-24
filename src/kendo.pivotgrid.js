(function(f, define){
    define([ "./kendo.dom" ], f);
})(function(){

var __meta__ = {
    id: "pivotgrid",
    name: "PivotGrid",
    category: "web",
    description: "The PivotGrid widget is a data summarization tool.",
    depends: [ "dom" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget;

    var PivotGrid = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);
        },

        events: [],

        options: {
            name: "PivotGrid"
        }

    });

    ui.plugin(PivotGrid);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
