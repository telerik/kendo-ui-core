(function(f, define){
    define([
        "./kendo.util",
        "./mixins/observers",
        "./geometry/main",
        "./drawing/core",
        "./drawing/color",
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
        depends: [ "core", "util" ]
    };

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
