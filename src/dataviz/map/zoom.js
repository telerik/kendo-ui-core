kendo_module({
    id: "dataviz.zoom",
    name: "Zoom",
    category: "dataviz",
    depends: [ "dataviz.core" ],
    advanced: true
});

(function ($) {
    var kendo = window.kendo;
    var Widget = kendo.ui.Widget;
    var renderPos = kendo.dataviz.util.renderPos;
    var NS = ".kendoNavigator";

    function button(dir, symbol) {
       return kendo.format(
           '<button class="k-button k-zoom-{0}">' +
               '<span>{1}</span>' +
           '</button>', dir, symbol);
    }

    var BUTTONS = button("in", "+") + button("out", "-");

    var Zoom = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);
            this._initOptions(options);

            this.element.addClass("k-widget k-header k-shadow k-zoom")
                        .addClass(renderPos(this.options.position))
                        .append(BUTTONS)
                        .on("click" + NS, ".k-button", $.proxy(this, "_click"));
        },

        options: {
            name: "Zoom",
            zoomStep: 1,
            position: "topLeft"
        },

        events: [
            "zoom"
        ],

        _click: function(e) {
            var zoomStep = this.options.zoomStep;
            var button = $(e.currentTarget);
            var dir = 1;

            if (button.is(".k-zoom-out")) {
                dir = -1;
            }

            this.trigger("zoom", {
                delta: dir * zoomStep
            });
        }
    });

    kendo.dataviz.ui.plugin(Zoom);
})(jQuery);
