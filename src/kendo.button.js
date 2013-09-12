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
        proxy = $.proxy,
        CLICK = "click",
        KBUTTON = "k-button",
        KBUTTONICON = "k-button-icon",
        KBUTTONICONTEXT = "k-button-icontext",
        NS = ".kendoButton",
        //DEFAULTSTATE = "k-state-default",
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
                buttonElements,
                span, img, btn, isEmpty;

            if (!filter) {
                buttonElements = element;
            } else {
                buttonElements = element.find(filter);
            }

            buttonElements.addClass(KBUTTON).toggleClass(DISABLEDSTATE, !options.enable);

            if (spriteCssClass || imageUrl) {
                buttonElements.each(function(idx, el){
                    btn = $(el);
                    isEmpty = true;

                    btn.contents().not("span.k-sprite").not("img.k-image").each(function(idx, el){
                        if (el.nodeType == 1 || el.nodeType == 3 && el.nodeValue.trim().length > 0) {
                            isEmpty = false;
                        }
                    });

                    if (isEmpty) {
                        buttonElements.addClass(KBUTTONICON);
                    } else {
                        buttonElements.addClass(KBUTTONICONTEXT);
                    }
                });
            }

            if (spriteCssClass) {
                buttonElements.each(function(idx, el){
                    span = $(el).children("span.k-sprite").first();
                    if (!span[0]) {
                        $(el).prepend('<span class="k-sprite ' + spriteCssClass + '"></span>');
                    } else {
                        span.addClass(spriteCssClass);
                    }
                });
            } else if (imageUrl) {
                buttonElements.each(function(idx, el){
                    img = $(el).children("img.k-image").first();
                    if (!img[0]) {
                        $(el).prepend('<img alt="icon" class="k-image" src="' + imageUrl + '" />');
                    } else {
                        img.attr("src", imageUrl);
                    }
                });
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
            enable: true
        },

        _click: function(e) {
            this.trigger(CLICK, { target: $(e.currentTarget) });
        }
    });

    kendo.ui.plugin(Button);

})(window.kendo.jQuery);