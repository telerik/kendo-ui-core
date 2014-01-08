kendo_module({
    id: "dataviz.navigator",
    name: "Navigator",
    category: "dataviz",
    depends: [ "dataviz.core" ],
    advanced: true
});

(function ($) {
    var kendo = window.kendo;
    var Widget = kendo.ui.Widget;
    var renderPos = kendo.dataviz.util.renderPos;
    var NS = ".kendoNavigator";

    function button(dir) {
       return kendo.format(
           '<button class="k-button k-navigator-{0}">' +
               '<span class="k-icon k-i-arrow-{0}"/>' +
           '</button>', dir);
    }

    var BUTTONS = button("n") + button("e") + button("s") + button("w");

    var Navigator = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);
            this._initOptions(options);

            this.element.addClass("k-widget k-header k-shadow k-navigator")
                        .addClass(renderPos(this.options.position))
                        .append(BUTTONS)
                        .on("click" + NS, ".k-button", $.proxy(this, "_click"));
        },

        options: {
            name: "Navigator",
            panStep: 1,
            position: "topLeft"
        },

        events: [
            "pan"
        ],

        _click: function(e) {
            var x = 0;
            var y = 0;
            var panStep = this.options.panStep;
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

            this.trigger("pan", {
                x: x * panStep,
                y: y * panStep
            });
        }
    });

    kendo.dataviz.ui.plugin(Navigator);
})(jQuery);
