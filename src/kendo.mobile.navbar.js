KENDO_COMPONENT({
    id: "mobile.navbar",
    name: "NavBar",
    category: "mobile",
    description: "The Kendo mobile NavBar widget is used inside a mobile View or Layout Header element to display an application navigation bar.",
    depends: [ "mobile.application" ]
});

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
        var siblings = centerElement.siblings();

        centerElement.toggleClass("km-show-title", (!!siblings[0] && $.trim(centerElement.text()) === ""));
        centerElement.toggleClass("km-no-title", !!centerElement.children("ul")[0]);
        centerElement.toggleClass("km-hide-title", centerElement.css("visibility") == "hidden" && !siblings.children().is(":visible"));
    }

    var NavBar = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = that.element;

            element.addClass("km-navbar").wrapInner($('<div class="km-view-title" />'));
            createContainer("left", element);
            createContainer("right", element);
            that.centerElement = element.find(".km-view-title");
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
})(window.kendo.jQuery);
