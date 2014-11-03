(function(f, define){
    define([
        "./util/main",
        "./util/base64"
    ], f);
})(function(){

    var __meta__ = {
        id: "util",
        name: "Utility functions",
        category: "framework",
        depends: [ "core" ],
        advanced: true
    };

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
