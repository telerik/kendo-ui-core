(function(f, define){
    define([
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
        depends: [ "core" ],
        features: [{
            id: "drawing-pdf-export",
            name: "PDF export",
            description: "Export to PDF support",
            depends: [ "pdf" ]
        }]
    };

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
