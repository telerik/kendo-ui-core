(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget;

    var Filterable = Widget.extend({
        init: function(element, options) {
            var that = this, link;

            Widget.fn.init.call(that, element, options);

            link = that.element.addClass("k-filterable").find("k-grid-filter");

            if (!link[0]) {
                link = that.element.prepend('<a class="k-grid-filter" href="#"><span class="k-icon k-filter"/></a>').find("k-grid-filter");
            }

        },

        options: {
            name: "Filterable"
        }
    });

    kendo.ui.plugin(Filterable);
})(jQuery)
