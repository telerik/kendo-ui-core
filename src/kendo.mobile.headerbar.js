(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        MobileWidget = ui.MobileWidget,
        mobile = kendo.mobile;

    var MobileHeaderBar = MobileWidget.extend({
        init: function(element, options) {
            var that = this;

            MobileWidget.fn.init.call(that, element, options);

            options = that.options;
            element = that.element.addClass("km-headerbar");
        },

        options: {
            name: "MobileHeaderBar",
            selector: "[data-kendo-role=headerbar]"
        },

    });

    ui.plugin(MobileHeaderBar);
})(jQuery);
