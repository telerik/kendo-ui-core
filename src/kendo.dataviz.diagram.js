(function(f, define){
    define([
        "./kendo.data", "./kendo.draganddrop", "./kendo.userevents", "./kendo.mobile.scroller",
        "./kendo.drawing",

       "./dataviz/diagram/utils",
       "./dataviz/diagram/math",
       "./dataviz/diagram/svg",
       "./dataviz/diagram/services",
       "./dataviz/diagram/layout",
       "./dataviz/diagram/dom"
    ], f);
})(function(){

    var __meta__ = {
        id: "dataviz.diagram",
        name: "Diagram",
        category: "dataviz",
        description: "The Kendo DataViz Diagram ",
        depends: [ "data", "userevents", "mobile.scroller", "draganddrop", "drawing", "dataviz.core", "dataviz.themes", "toolbar" ],
        features: [{
            id: "dataviz.diagram-pdf-export",
            name: "PDF export",
            description: "Export Diagram as PDF",
            depends: [ "pdf" ]
        },{
            id: "dataviz.diagram-editing",
            name: "Editing",
            description: "Support for model editing",
            depends: [ "editable", "window", "dropdownlist" ]
        }]
    };

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
