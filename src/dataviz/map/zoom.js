(function(f, define){
    define([ ], f);
})(function(){

(function ($) {
    var kendo = window.kendo;
    var Widget = kendo.ui.Widget;
    var keys = kendo.keys;
    var proxy = $.proxy;

    var NS = ".kendoZoomControl";
    var BUTTONS = button("in", "+") + button("out", "-");

    var PLUS = 187;
    var MINUS = 189;
    var FF_PLUS = 61;
    var FF_MINUS = 173;

    var ZoomControl = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);
            this._initOptions(options);

            this.element.addClass("k-widget k-zoom-control k-button-wrap k-buttons-horizontal")
                        .append(BUTTONS)
                        .on("click" + NS, ".k-button", proxy(this, "_click"));

            var parentElement = this.element.parent().closest("[" + kendo.attr("role") + "]");
            this._keyroot = parentElement.length > 0 ? parentElement : this.element;

            this._tabindex(this._keyroot);

            this._keydown = proxy(this._keydown, this);
            this._keyroot.on("keydown", this._keydown);
        },

        options: {
            name: "ZoomControl",
            zoomStep: 1
        },

        events: [
            "change"
        ],

        _change: function(dir) {
            var zoomStep = this.options.zoomStep;
            this.trigger("change", {
                delta: dir * zoomStep
            });
        },

        _click: function(e) {
            var button = $(e.currentTarget);
            var dir = 1;

            if (button.is(".k-zoom-out")) {
                dir = -1;
            }

            this._change(dir);
            e.preventDefault();
        },

        _keydown: function(e) {
            switch (e.which) {
                case keys.NUMPAD_PLUS:
                case PLUS:
                case FF_PLUS:
                    this._change(1);
                    break;

                case keys.NUMPAD_MINUS:
                case MINUS:
                case FF_MINUS:
                    this._change(-1);
                    break;
            }
        }
    });

    // Helper functions =======================================================
    function button(dir, symbol) {
       return kendo.format(
           '<button class="k-button k-zoom-{0}" title="zoom-{0}">{1}</button>',
           dir, symbol);
    }

    // Exports ================================================================
    kendo.dataviz.ui.plugin(ZoomControl);

})(jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
