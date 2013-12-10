(function(f, define){
    define([
        "./kendo.data", "./kendo.userevents", "./kendo.tooltip", "./kendo.dataviz.core", "./kendo.mobile.scroller",

        "./dataviz/util",
        "./dataviz/geometry",
        "./dataviz/drawing/core",
        "./dataviz/drawing/shapes",
        "./dataviz/drawing/svg",
        "./dataviz/drawing/vml",
        "./dataviz/map/location",
        "./dataviz/map/navigator",
        "./dataviz/map/attribution",
        "./dataviz/map/crs",
        "./dataviz/map/layers/shape",
        "./dataviz/map/layers/tile",
        "./dataviz/map/layers/marker",
        "./dataviz/map/main"
    ], f);
})(function(){

    var __meta__ = {
        id: "dataviz.map",
        name: "Map",
        category: "dataviz",
        description: "The Kendo DataViz Map displays spatial data",
        depends: [ "data", "userevents", "tooltip", "dataviz.core", "mobile.scroller" ]
    };

}, typeof define == 'function' && define.amd ? define : function(_, f){ f() });
