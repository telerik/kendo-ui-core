(function(f, define){
    define([
            "./kendo.data", "./kendo.draganddrop", "./kendo.userevents", "./kendo.mobile.scroller",

           "./kendo.diagram.dom",
           "./kendo.diagram.svg",
           "./kendo.diagram.services",
           "./kendo.diagram.layout",
           "./kendo.diagram.utils",
           "./kendo.diagram.math",
           "./kendo.diagram.extensions"
    ], f);
})(function(){

    var __meta__ = {
        id: "dataviz.diagram",
        name: "Diagram",
        category: "dataviz",
        description: "The Kendo DataViz Diagram ",
        depends: [ "data", "userevents", "mobile.scroller", "draganddrop", "dataviz.core" ]
    };

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
