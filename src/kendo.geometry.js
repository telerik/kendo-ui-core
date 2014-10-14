(function(f, define){
    define([
        "./geometry/main"
    ], f);
})(function(){

    var __meta__ = {
        id: "geometry",
        name: "Geometry functions",
        category: "framework",
        depends: [ "core", "util", "mixins" ],
        advanced: true
    };

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
