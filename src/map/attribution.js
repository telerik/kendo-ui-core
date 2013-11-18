kendo_module({
    id: "dataviz.attribution",
    name: "Attribution",
    category: "dataviz",
    depends: [ "dataviz.core" ],
    advanced: true
});

(function ($) {
    var kendo = window.kendo;
    var Widget = kendo.ui.Widget;

    var Attribution = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);
            this._initOptions(options);

            this.element.addClass("k-widget k-attribution");
        },

        options: {
            name: "Attribution",
            items: []
        },

        add: function(item) {
            this.element.append(item);
        },

        clear: function() {
            this.element.empty();
        }
    });

    kendo.dataviz.ui.plugin(Attribution);
})(jQuery);
