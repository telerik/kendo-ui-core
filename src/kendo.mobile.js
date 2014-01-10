(function(f, define){
    define([
        "kendo.core.js",
        "kendo.fx.js",
        "kendo.data.odata.js",
        "kendo.data.xml.js",
        "kendo.data.js",
        "kendo.data.signalr.js",
        "kendo.binder.js",
        "kendo.validator.js",
        "kendo.router.js",
        "kendo.view.js",
        "kendo.userevents.js",
        "kendo.draganddrop.js",
        "kendo.popup.js",
        "kendo.touch.js",
        "kendo.mobile.popover.js",
        "kendo.mobile.loader.js",
        "kendo.mobile.scroller.js",
        "kendo.mobile.shim.js",
        "kendo.mobile.view.js",
        "kendo.mobile.modalview.js",
        "kendo.mobile.drawer.js",
        "kendo.mobile.splitview.js",
        "kendo.mobile.pane.js",
        "kendo.mobile.application.js",
        "kendo.mobile.actionsheet.js",
        "kendo.mobile.button.js",
        "kendo.mobile.buttongroup.js",
        "kendo.mobile.listview.js",
        "kendo.mobile.navbar.js",
        "kendo.mobile.scrollview.js",
        "kendo.mobile.switch.js",
        "kendo.mobile.tabstrip.js"
    ], f);
})(function(){
    "bundle all";
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
