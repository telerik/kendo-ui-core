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

    function toggleTitle(centerElement) {
        centerElement.toggleClass("km-hide-title", centerElement.css("visibility") == "hidden" && !centerElement.siblings().children().is(":visible"));
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
                if (centerElement.siblings()[0]) {
                    centerElement.addClass("km-show-title");
                } else if (!centerElement.is(":empty")) {
                    centerElement.addClass("km-no-title");
                }
            }

            that.centerElement = centerElement;
        },

        options: {
            name: "NavBar"
        },

        title: function(value) {
            this.element.find(roleSelector("view-title")).text(value);
            toggleTitle(this.centerElement);
        },

        viewShow: function(view) {
            if (view.options.title) {
                this.title(view.options.title);
            } else {
                toggleTitle(this.centerElement);
            }
        },

        destroy: function() {
            Widget.fn.destroy.call(this);
            kendo.destroy(this.element);
        }
    });

    ui.plugin(NavBar);
})(jQuery);
