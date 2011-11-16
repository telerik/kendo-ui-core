(function($, undefined) {
    var ui = window.kendo.ui,
        MobileWidget = ui.MobileWidget;

    function createContainer(align, element) {
        var items = element.find("[data-kendo-align=" + align + "]");

        if (items[0]) {
            element.prepend($('<div class="km-' + align + 'item" />').append(items));
        }
    }

    var MobileNavBar = MobileWidget.extend({
        init: function(element, options) {
            MobileWidget.fn.init.call(this, element, options);
            element = this.element;

            element.addClass("km-navbar").wrapInner($('<div class="km-title" />'));
            createContainer("left", element);
            createContainer("right", element);
        },

        options: {
            name: "MobileNavBar",
            selector: "[data-kendo-role=navbar]"
        },

    });

    ui.plugin(MobileNavBar);
})(jQuery);
