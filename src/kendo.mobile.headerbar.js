(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        MobileWidget = ui.MobileWidget,
        mobile = kendo.mobile;

    function createContainer(align, element) {
        var items = element.find("[data-kendo-align=" + align + "]");
        if (items[0]) {
            container = $('<div class="km-' + align + 'item" />');
            container.append(items);
            return container;
        } else {
            return $();
        }
    }

    var MobileHeaderBar = MobileWidget.extend({
        init: function(element, options) {
            var that = this, container;

            MobileWidget.fn.init.call(that, element, options);

            that.element.addClass("km-headerbar")
                .wrapInner($('<div class="km-title" />'))
                .prepend(createContainer("left", element))
                .append(createContainer("right", element));
        },

        options: {
            name: "MobileHeaderBar",
            selector: "[data-kendo-role=headerbar]"
        },

    });

    ui.plugin(MobileHeaderBar);
})(jQuery);
