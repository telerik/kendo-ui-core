(function($, undefined) {
    var ui = window.kendo.ui,
        MobileWidget = ui.MobileWidget;

    function createContainer(align, element) {
        var items = element.find("[" + kendo.attr("align") + "=" + align + "]");

        if (items[0]) {
            element.prepend($('<div class="km-' + align + 'item" />').append(items));
        }
    }

    var MobileNavBar = MobileWidget.extend({
        init: function(element, options) {
            MobileWidget.fn.init.call(this, element, options);
            element = this.element;

            element.addClass("km-navbar").wrapInner($('<div class="km-view-title" />'));
            createContainer("left", element);
            createContainer("right", element);
        },

        options: {
            name: "MobileNavBar",
            selector: kendo.roleSelector("navbar")
        }

    });

    ui.plugin(MobileNavBar);
})(jQuery);
