(function(f, define){
    define([
        "./kendo.combobox", "./kendo.dropdownlist", "./kendo.window", "./kendo.colorpicker", "./kendo.imagebrowser",

        "./editor/main",
        "./editor/dom",
        "./editor/serializer",
        "./editor/range",
        "./editor/system",
        "./editor/inlineformat",
        "./editor/formatblock",
        "./editor/linebreak",
        "./editor/lists",
        "./editor/link",
        "./editor/file",
        "./editor/image",
        "./editor/components",
        "./editor/indent",
        "./editor/viewhtml",
        "./editor/formatting",
        "./editor/toolbar",
        "./editor/tables"
    ], f);
})(function(){

    var __meta__ = {
        id: "editor",
        name: "Editor",
        category: "web",
        description: "Rich text editor component",
        depends: [ "combobox", "dropdownlist", "window", "colorpicker" ],
        features: [ {
            id: "editor-imagebrowser",
            name: "Image Browser",
            description: "Support for uploading and inserting images",
            depends: [ "imagebrowser" ]
        } ]
    };

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
