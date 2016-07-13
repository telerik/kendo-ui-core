(function(f, define){
    define([ "./kendo.core", "./kendo.popup" ], f);
})(function(){

    var __meta__ = {
        id: "dialog",
        name: "Dialog",
        category: "web", // suite
        description: "The dialog widget is a modal popup that brings information to the user.",
        depends: [ "core", "popup" ] // dependencies
    };

    // START WIDGET DEFINITION - only if it will have a single script file

    (function($, undefined) {
        var kendo = window.kendo,
            Widget = kendo.ui.Widget;

        var Dialog = Widget.extend({
            init: function(element, options) {
                var that = this;

                Widget.fn.init.call(that, element, options);

                kendo.notify(that);
            },

            events: [
            ],

            options: {
                name: "Dialog",
            }
        });

        kendo.ui.plugin(Dialog);

    })(window.kendo.jQuery);

    return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });