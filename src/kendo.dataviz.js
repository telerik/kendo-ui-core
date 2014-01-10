(function(f, define){
    define([
        "kendo.core.js",
        "kendo.fx.js",
        "kendo.router.js",
        "kendo.view.js",
        "kendo.data.odata.js",
        "kendo.data.xml.js",
        "kendo.data.js",
        "kendo.binder.js",
        "kendo.userevents.js",
        "kendo.draganddrop.js",
        "kendo.mobile.scroller.js",
        "kendo.popup.js",
        "kendo.tooltip.js",
        "kendo.dataviz.core.js",
        "kendo.dataviz.themes.js",
        "kendo.dataviz.chart.js",
        "kendo.dataviz.chart.polar.js",
        "kendo.dataviz.chart.funnel.js",
        "kendo.dataviz.gauge.js",
        "kendo.dataviz.barcode.js",
        "kendo.dataviz.qrcode.js",
        "kendo.dataviz.stock.js",
        "kendo.dataviz.sparkline.js",
        "kendo.dataviz.svg.js",
        "kendo.dataviz.vml.js",
        "kendo.dataviz.canvas.js",
        "kendo.dataviz.map.js"
    ], f);
})(function(){
    "bundle all";
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
