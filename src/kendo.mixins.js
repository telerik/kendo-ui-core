(function(f, define){
    define([
        "./mixins/observers"
    ], f);
})(function(){

    var __meta__ = {
        id: "mixins",
        name: "Mixin objects",
        category: "framework",
        depends: [ "core" ],
        advanced: true
    };

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
