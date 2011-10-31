(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        MobileWidget = ui.MobileWidget;

    var MobileListView = MobileWidget.extend({
        init: function(element, options) {
            var that = this;

            MobileWidget.fn.init.call(that, element, options);

            that.element.addClass("k-listview");
        },
        options: {
            name: "MobileListView"
        }
    });

    ui.plugin(MobileListView);
})(jQuery);
