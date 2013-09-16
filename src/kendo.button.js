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
        keys = kendo.keys,
        CLICK = "click",
        KBUTTON = "k-button",
        KBUTTONICON = "k-button-icon",
        KBUTTONICONTEXT = "k-button-icontext",
        NS = ".kendoButton",
        //DEFAULTSTATE = "k-state-default",
        DISABLED = "disabled",
        DISABLEDSTATE = "k-state-disabled",
        FOCUSEDSTATE = "k-state-focused";

    var Button = Widget.extend({
        init: function(element, options) {
            var that = this;
                
            Widget.fn.init.call(that, element, options);

            element = that.wrapper = that.element;
            options = that.options;

            element.addClass(KBUTTON);

            options.enable = options.enable && !element.attr(DISABLED);
            that.enable(options.enable);

            that._tabindex();

            that._graphics();

            element
                .on(CLICK + NS, proxy(that._click, that))
                .on("focus" + NS, proxy(that._focus, that))
                .on("blur" + NS, proxy(that._blur, that))
                .on("keydown" + NS, proxy(that._keydown, that))
                .on("keyup" + NS, proxy(that._keyup, that));

            kendo.notify(that);
        },

        events: [
            CLICK
        ],

        options: {
            name: "Button",
            spriteCssClass: "",
            imageUrl: "",
            enable: true
        },

        _isNativeButton: function() {
            return this.element.prop("tagName").toLowerCase() == "button";
        },

        _click: function(e) {
            if (this.options.enable) {
                this.trigger(CLICK, {event: e});
            }
        },

        _focus: function() {
            if (this.options.enable) {
                this.element.addClass(FOCUSEDSTATE);
            }
        },

        _blur: function() {
            this.element.removeClass(FOCUSEDSTATE);
        },

        _keydown: function(e) {
            if (!this._isNativeButton()) {
                if (e.keyCode == keys.ENTER || e.keyCode == keys.SPACEBAR) {
                    if (e.keyCode == keys.SPACEBAR) {
                        e.preventDefault();
                        this.element.addClass("k-state-selected");
                    }
                    this._click(e);
                }
            }
        },

        _keyup: function() {
            this.element.removeClass("k-state-selected");
        },

        _graphics: function() {
            var that = this,
                element = that.element,
                options = that.options,
                spriteCssClass = options.spriteCssClass,
                imageUrl = options.imageUrl,
                span, img, isEmpty;

            if (spriteCssClass || imageUrl) {
                isEmpty = true;

                element.contents().not("span.k-sprite").not("img.k-image").each(function(idx, el){
                    if (el.nodeType == 1 || el.nodeType == 3 && el.nodeValue.trim().length > 0) {
                        isEmpty = false;
                    }
                });

                if (isEmpty) {
                    element.addClass(KBUTTONICON);
                } else {
                    element.addClass(KBUTTONICONTEXT);
                }
            }

            if (spriteCssClass) {
                span = element.children("span.k-sprite").first();
                if (!span[0]) {
                    span = $('<span class="k-sprite"></span>').prependTo(element);
                }
                span.addClass(spriteCssClass);
            } else if (imageUrl) {
                img = element.children("img.k-image").first();
                if (!img[0]) {
                    img = $('<img alt="icon" class="k-image" />').prependTo(element);
                }
                img.attr("src", imageUrl);
            }
        },

        enable: function(enable) {
            var that = this,
                element = that.element;
            if (typeof enable == "undefined") {
                enable = true;
            }
            enable = !!enable;
            that.options.enable = enable;
            element.toggleClass(DISABLEDSTATE, !enable);
            if (enable) {
                element.removeAttr(DISABLED);
            } else {
                element.attr(DISABLED, DISABLED);
            }
        }
    });

    kendo.ui.plugin(Button);

})(window.kendo.jQuery);