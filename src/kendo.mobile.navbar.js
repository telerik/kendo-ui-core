(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        roleSelector = kendo.roleSelector,
        Widget = ui.Widget;

    function createContainer(align, element) {

        var items = element.find("[" + kendo.attr("align") + "=" + align + "]");

        if (items[0]) {
            element.prepend($('<div class="km-' + align + 'item" />').append(items));
        }
    }

    var NavBar = Widget.extend({
        init: function(element, options) {
            var that = this,
                centerElement;

            Widget.fn.init.call(that, element, options);

            element = that.element;

            element.addClass("km-navbar").wrapInner($('<div class="km-view-title" />'));
            createContainer("left", element);
            createContainer("right", element);
            centerElement = element.find(".km-view-title");

            if(!element.find(roleSelector("view-title"))[0]) {
                if (centerElement.is(":empty")) {
                    centerElement.append($("<span>&nbsp;</span>"));
                } else {
                    centerElement.addClass("km-no-title");
                }
            }
        },

        options: {
            name: "NavBar"
        },

        title: function(value) {
            this.element.find(roleSelector("view-title")).text(value);
        },

        viewShow: function(view) {
            this.title(view.options.title);
        },

        destroy: function() {
            Widget.fn.destroy.call(this);
            kendo.destroy(this.element);
        }
    });

    ui.plugin(NavBar);
})(jQuery);
