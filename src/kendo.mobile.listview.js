(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        MobileWidget = ui.MobileWidget;

    var MobileListView = MobileWidget.extend({
        init: function(element, options) {
            var that = this,
                grouped,
                inset;

            MobileWidget.fn.init.call(that, element, options);

            grouped = that.options.type === "group";
            inset = that.options.style === "inset";

            that.element.addClass("k-listview")
                .toggleClass("k-list", !grouped)
                .toggleClass("k-listinset", !grouped && inset)
                .toggleClass("k-listgroup", grouped && !inset)
                .toggleClass("k-listgroupinset", grouped && inset);

            if (grouped) {
                that.element
                    .children()
                    .children("ul")
                    .addClass("k-list");
            }
        },

        options: {
            name: "MobileListView",
            type: "flat"
        }
    });

    ui.plugin(MobileListView);
})(jQuery);
