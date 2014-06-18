(function(f, define){
    define([
        "./kendo.dataviz.core",

        "./dataviz/util",
        "./dataviz/geometry",
        "./dataviz/drawing/core",
        "./dataviz/drawing/mixins",
        "./dataviz/drawing/shapes",
        "./dataviz/drawing/parser",
        "./dataviz/drawing/svg",
        "./dataviz/drawing/canvas",
        "./dataviz/drawing/vml"
    ], f);
})(function(){

    var __meta__ = {
        id: "dataviz.drawing",
        name: "Drawing API",
        category: "dataviz",
        description: "The Kendo DataViz low-level drawing API",
        depends: [ "dataviz.core" ]
    };

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
