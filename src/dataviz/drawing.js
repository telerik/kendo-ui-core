(function(f, define){
    define([
        "../kendo.dataviz.core",

        "./util",
        "./geometry",
        "./drawing/core",
        "./drawing/shapes",
        "./drawing/parser",
        "./drawing/svg",
        "./drawing/canvas",
        "./drawing/vml"
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
