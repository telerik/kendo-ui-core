(function(f, define){
    define([ "../../kendo.dataviz.core" ], f);
})(function(){

(function ($) {
    var kendo = window.kendo;
    var Widget = kendo.ui.Widget;
    var keys = kendo.keys;
    var proxy = $.proxy;

    var NS = ".kendoNavigator";
    var BUTTONS = button("n") + button("e") + button("s") + button("w");

    var Navigator = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);
            this._initOptions(options);

            this.element.addClass("k-widget k-header k-shadow k-navigator")
                        .append(BUTTONS)
                        .on("click" + NS, ".k-button", proxy(this, "_click"));

            var parentElement = this.element.parent().closest("[" + kendo.attr("role") + "]");
            this._keyroot = parentElement.length > 0 ? parentElement : this.element;
            this._tabindex(this._keyroot);

            this._keydown = proxy(this._keydown, this);
            this._keyroot.on("keydown", this._keydown);
        },

        options: {
            name: "Navigator",
            panStep: 1
        },

        events: [
            "pan"
        ],

        dispose: function() {
            this._keyroot.off("keydown", this._keydown);
        },

        _pan: function(x, y) {
            var panStep = this.options.panStep;
            this.trigger("pan", {
                x: x * panStep,
                y: y * panStep
            });
        },

        _click: function(e) {
            var x = 0;
            var y = 0;
            var button = $(e.currentTarget);

            if (button.is(".k-navigator-n")) {
                y = 1;
            } else if (button.is(".k-navigator-s")) {
                y = -1;
            } else if (button.is(".k-navigator-e")) {
                x = 1;
            } else if (button.is(".k-navigator-w")) {
                x = -1;
            }

            this._pan(x, y);
        },

        _keydown: function(e) {
            switch (e.which) {
                case keys.UP:
                    this._pan(0, 1);
                    break;

                case keys.DOWN:
                    this._pan(0, -1);
                    break;

                case keys.RIGHT:
                    this._pan(1, 0);
                    break;

                case keys.LEFT:
                    this._pan(-1, 0);
                    break;
            }
        }
    });

    // Helper functions =======================================================
    function button(dir) {
       return kendo.format(
           '<button class="k-button k-navigator-{0}">' +
               '<span class="k-icon k-i-arrow-{0}"/>' +
           '</button>', dir);
    }

    // Exports ================================================================
    kendo.dataviz.ui.plugin(Navigator);

})(jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });

