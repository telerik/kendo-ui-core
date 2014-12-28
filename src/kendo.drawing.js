(function(f, define){
    define([
        "./kendo.color",
        "./util/main",
        "./util/base64",
        "./mixins/observers",
        "./geometry/main",
        "./drawing/core",
        "./drawing/mixins",
        "./drawing/shapes",
        "./drawing/parser",
        "./drawing/svg",
        "./drawing/canvas",
        "./drawing/vml",
        "./drawing/pdf",
        "./drawing/html",
        "./drawing/animation"
    ], f);
})(function(){

    var __meta__ = {
        id: "drawing",
        name: "Drawing API",
        category: "framework",
        description: "The Kendo UI low-level drawing API",
        depends: [ "core", "color" ],
        features: [{
            id: "drawing-pdf",
            name: "PDF export",
            description: "Export drawings as PDF",
            depends: [ "pdf" ]
        }]
    };

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
