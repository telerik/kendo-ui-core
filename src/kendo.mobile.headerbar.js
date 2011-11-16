(function($, undefined) {
    var ui = window.kendo.ui,
        MobileWidget = ui.MobileWidget;

    function createContainer(align, element) {
        var items = element.find("[data-kendo-align=" + align + "]");

        if (items[0]) {
            return $('<div class="km-' + align + 'item" />').append(items);
        }
    }

    var MobileHeaderBar = MobileWidget.extend({
        init: function(element, options) {
            MobileWidget.fn.init.call(this, element, options);

            this.element.addClass("km-headerbar")
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
