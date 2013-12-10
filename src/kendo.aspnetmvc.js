(function(f, define){
    define([
        "./kendo.data", "./kendo.combobox", "./kendo.multiselect", "./kendo.validator",

        "./aspnetmvc/kendo.data.aspnetmvc",
        "./aspnetmvc/kendo.combobox.aspnetmvc",
        "./aspnetmvc/kendo.multiselect.aspnetmvc",
        "./aspnetmvc/kendo.imagebrowser.aspnetmvc",
        "./aspnetmvc/kendo.validator.aspnetmvc"
    ], f);
})(function(){

var __meta__ = {
    id: "aspnetmvc",
    name: "ASP.NET MVC",
    category: "wrappers",
    description: "Scripts required by Kendo UI for ASP.NET MVC",
    depends: [ "data", "combobox", "multiselect", "validator" ]
};

}, typeof define == 'function' && define.amd ? define : function(_, f){ f() });
