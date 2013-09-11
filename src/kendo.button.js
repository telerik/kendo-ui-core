kendo_module({
    id: "button",
    name: "Button",
    category: "web",
    description: "The Button widget displays styled buttons.",
    depends: [ "core" ]
});

(function ($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        template = kendo.template,
        proxy = $.proxy,
        CLICK = "click",
        KBUTTON = "k-button",
        NS = ".kendoButton",
        DEFAULTSTATE = "k-state-default",
        DISABLEDSTATE = "k-state-disabled";

    var Button = Widget.extend({
        init: function(element, options) {
            var that = this;
                
            Widget.fn.init.call(that, element, options);

            element = that.wrapper = that.element;
            options = that.options;

            var filter = options.filter,
                spriteCssClass = options.spriteCssClass,
                imageUrl = options.imageUrl,
                buttonElements;

            if (!filter) {
                buttonElements = element;
            } else {
                buttonElements = element.find(filter);
            }

            buttonElements.addClass(KBUTTON).toggleClass(DISABLEDSTATE, !options.enabled);

            if (spriteCssClass) {
                buttonElements.prepend('<span class="k-sprite ' + spriteCssClass + '"></span>');
            } else if (imageUrl) {
                buttonElements.prepend('<img alt="icon" class="k-image" src="' + imageUrl + '" />');
            }

            element
                .on(CLICK + NS, filter, proxy(that._click, that));

            kendo.notify(that);
        },

        events: [
            CLICK
        ],

        options: {
            name: "Button",
            filter: "",
            spriteCssClass: "",
            imageUrl: "",
            enabled: true
        },

        _click: function(e) {
            this.trigger(CLICK, { target: $(e.currentTarget) });
        }

    });

    kendo.ui.plugin(Button);

})(window.kendo.jQuery);