(function(f, define){
    define([ "../../kendo.dataviz.core" ], f);
})(function(){

(function ($) {
    var kendo = window.kendo;
    var Widget = kendo.ui.Widget;
    var NS = ".kendoZoomControl";

    function button(dir, symbol) {
       return kendo.format(
           '<button class="k-button k-zoom-{0}" title="zoom-{0}">{1}</button>',
           dir, symbol);
    }

    var BUTTONS = button("in", "+") + button("out", "-");

    var ZoomControl = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);
            this._initOptions(options);

            this.element.addClass("k-widget k-zoom-control k-button-wrap k-buttons-horizontal")
                        .append(BUTTONS)
                        .on("click" + NS, ".k-button", $.proxy(this, "_click"));
        },

        options: {
            name: "ZoomControl",
            zoomStep: 1
        },

        events: [
            "change"
        ],

        _click: function(e) {
            var zoomStep = this.options.zoomStep;
            var button = $(e.currentTarget);
            var dir = 1;

            if (button.is(".k-zoom-out")) {
                dir = -1;
            }

            this.trigger("change", {
                delta: dir * zoomStep
            });
        }
    });

    kendo.dataviz.ui.plugin(ZoomControl);
})(jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
