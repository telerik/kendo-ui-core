(function(f, define){
    define([
        "./pdf/core",
        "./pdf/ttf"
    ], f);
})(function(){
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
