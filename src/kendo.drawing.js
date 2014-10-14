(function(f, define){
    define([
        "./kendo.util",
        "./kendo.mixins",
        "./kendo.geometry",
        "./drawing/core",
        "./drawing/mixins",
        "./drawing/shapes",
        "./drawing/parser",
        "./drawing/svg",
        "./drawing/canvas",
        "./drawing/vml",
        "./drawing/pdf",
        "./drawing/html"
    ], f);
})(function(){

    var __meta__ = {
        id: "drawing",
        name: "Drawing API",
        category: "framework",
        description: "The Kendo UI low-level drawing API",
        depends: [ "core", "util", "mixins", "geometry" ]
    };

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
