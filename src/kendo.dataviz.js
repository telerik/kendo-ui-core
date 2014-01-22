(function(f, define){
    define([
        "kendo.core",
        "kendo.fx",
        "kendo.router",
        "kendo.view",
        "kendo.data.odata",
        "kendo.data.xml",
        "kendo.data",
        "kendo.data.signalr",
        "kendo.binder",
        "kendo.userevents",
        "kendo.draganddrop",
        "kendo.mobile.scroller",
        "kendo.popup",
        "kendo.tooltip",
        "kendo.dataviz.core",
        "kendo.dataviz.themes",
        "kendo.dataviz.chart",
        "kendo.dataviz.chart.polar",
        "kendo.dataviz.chart.funnel",
        "kendo.dataviz.gauge",
        "kendo.dataviz.barcode",
        "kendo.dataviz.qrcode",
        "kendo.dataviz.stock",
        "kendo.dataviz.sparkline",
        "kendo.dataviz.svg",
        "kendo.dataviz.vml",
        "kendo.dataviz.canvas",
        "kendo.dataviz.map",
        "kendo.diagram.dom"
    ], f);
})(function(){
    "bundle all";
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
