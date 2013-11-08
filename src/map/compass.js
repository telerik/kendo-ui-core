kendo_module({
    id: "dataviz.compass",
    name: "Compass",
    category: "dataviz",
    depends: [ "dataviz.core" ],
    advanced: true
});

(function ($) {
    var kendo = window.kendo;
    var Widget = kendo.ui.Widget;
    var NS = ".kendoCompass";

    function button(dir) {
       return kendo.format(
           '<button class="k-button k-compass-{0}">' +
               '<span class="k-icon k-i-arrow-{0}"/>' +
           '</button>', dir);
    }

    var BUTTONS = button("n") + button("e") + button("s") + button("w") +
        '<button class="k-button k-compass-c"><span/></button>';

    var Compass = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);
            this._initOptions(options);

            this.element.addClass("k-widget k-header k-shadow k-compass")
                        .append(BUTTONS)
                        .on("click" + NS, ".k-button", $.proxy(this, "_click"));
        },

        options: {
            name: "Compass",
            panStep: 1
        },

        events: [
            "center",
            "pan"
        ],

        _click: function(e) {
            var x = 0;
            var y = 0;
            var panStep = this.options.panStep;
            var button = $(e.currentTarget);

            if (button.is(".k-compass-c")) {
                this.trigger("center");
            } else {
                if (button.is(".k-compass-n")) {
                    y = 1;
                } else if (button.is(".k-compass-s")) {
                    y = -1;
                } else if (button.is(".k-compass-e")) {
                    x = 1;
                } else if (button.is(".k-compass-w")) {
                    x = -1;
                }

                this.trigger("pan", {
                    x: x * panStep,
                    y: y * panStep
                });
            }
        }
    });

    kendo.dataviz.ui.plugin(Compass);
})(jQuery);
