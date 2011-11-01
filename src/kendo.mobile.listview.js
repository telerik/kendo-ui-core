(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        MobileWidget = ui.MobileWidget;

    var MobileListView = MobileWidget.extend({
        init: function(element, options) {
            var that = this;

            MobileWidget.fn.init.call(that, element, options);

            that.element.addClass("k-listview k-list");
            if (that.options.display !== "group") {
                that.element.children()
                    .addClass("k-item");
            } else {
                that.element.children().children("ul").addClass("k-list");
            }
        },

        options: {
            name: "MobileListView",
            display: "flat"
        }
    });

    ui.plugin(MobileListView);
})(jQuery);
