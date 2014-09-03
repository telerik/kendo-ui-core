(function(f, define){
    define([
        "./pdf/core",
        "./pdf/ttf",
        "./pdf/image"
    ], f);
})(function(){
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
