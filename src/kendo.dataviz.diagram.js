(function(f, define){
    define([
            "./kendo.data", "./kendo.draganddrop", "./kendo.userevents", "./kendo.mobile.scroller",

           "./dataviz/diagram/extensions",
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
        depends: [ "data", "userevents", "mobile.scroller", "draganddrop", "dataviz.core" ]
    };

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
