(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "button",
    name: "Button",
    category: "web",
    description: "The Button widget displays styled buttons.",
    depends: [ "core" ]
};

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
        DISABLED = "disabled",
        DISABLEDSTATE = "k-state-disabled",
        FOCUSEDSTATE = "k-state-focused",
        SELECTEDSTATE = "k-state-active";

    var Button = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = that.wrapper = that.element;
            options = that.options;

            element.addClass(KBUTTON).attr("role", "button");

            options.enable = options.enable && !element.attr(DISABLED);
            that.enable(options.enable);

            if (options.enable) {
                that._tabindex();
            }

            that.iconElement();

            element
                .on(CLICK + NS, proxy(that._click, that))
                .on("focus" + NS, proxy(that._focus, that))
                .on("blur" + NS, proxy(that._blur, that))
                .on("keydown" + NS, proxy(that._keydown, that))
                .on("keyup" + NS, proxy(that._keyup, that));

            kendo.notify(that);
        },

        destroy: function() {
            var that = this;

            that.wrapper.off(NS);

            Widget.fn.destroy.call(that);
        },

        events: [
            CLICK
        ],

        options: {
            name: "Button",
            icon: "",
            iconClass: "",
            spriteCssClass: "",
            imageUrl: "",
            enable: true
        },

        _isNativeButton: function() {
            return this.element.prop("tagName").toLowerCase() == "button";
        },

        _click: function(e) {
            if (this.options.enable) {
                if (this.trigger(CLICK, { event: e })) {
                    e.preventDefault();
                }
            }
        },

        _focus: function() {
            if (this.options.enable) {
                this.element.addClass(FOCUSEDSTATE);
            }
        },

        _blur: function() {
            var that = this;
            that.element.removeClass(FOCUSEDSTATE);
            setTimeout(function() {
                that.element.removeClass(SELECTEDSTATE);
            });
        },

        _keydown: function(e) {
            var that = this;
            if (e.keyCode == keys.ENTER || e.keyCode == keys.SPACEBAR) {
                if (that.options.enable) {
                    that.element.addClass(SELECTEDSTATE);
                }

                if (!that._isNativeButton()) {
                    if (e.keyCode == keys.SPACEBAR) {
                        e.preventDefault();
                    }
                    that._click(e);
                }
            }
        },

        _keyup: function() {
            this.element.removeClass(SELECTEDSTATE);
        },

        iconElement: function() {
            var that = this,
                element = that.element,
                options = that.options,
                icon = options.icon,
                iconClass = options.iconClass,
                spriteCssClass = options.spriteCssClass,
                imageUrl = options.imageUrl,
                span, img, isEmpty;

            if (spriteCssClass || imageUrl || icon || iconClass) {
                isEmpty = true;

                element.contents().filter(function() {
                    return (!$(this).hasClass("k-sprite") && !$(this).hasClass("k-icon") && !$(this).hasClass("k-image"));
                }).each(function(idx, el){
                    if (el.nodeType == 1 || el.nodeType == 3 && $.trim(el.nodeValue).length > 0) {
                        isEmpty = false;
                    }
                });

                if (isEmpty) {
                    element.addClass(KBUTTONICON);
                } else {
                    element.addClass(KBUTTONICONTEXT);
                }
            }

            if (imageUrl) {
                img = element.children("img.k-image").first();
                if (!img[0]) {
                    img = $('<img alt="icon" class="k-image" />').prependTo(element);
                }
                img.attr("src", imageUrl);
            } else if (icon || iconClass) {
                span = element.children("span.k-icon").first();
                if (!span[0]) {
                    span = $('<span></span>').prependTo(element);
                }
                span.attr("class", icon ? "k-icon k-i-" + icon : iconClass);
            } else if (spriteCssClass) {
                span = element.children("span.k-sprite").first();
                if (!span[0]) {
                    span = $('<span class="k-sprite"></span>').prependTo(element);
                }
                span.addClass(spriteCssClass);
            }
        },

        enable: function(enable) {
            var that = this,
                element = that.element;

            if (enable === undefined) {
                enable = true;
            }

            enable = !!enable;
            that.options.enable = enable;
            element.toggleClass(DISABLEDSTATE, !enable)
                   .attr("aria-disabled", !enable)
                   .attr(DISABLED, !enable);

            if (enable) {
                that._tabindex();
            }

            // prevent 'Unspecified error' in IE when inside iframe
            try {
                element.blur();
            } catch (err) {
            }
        }
    });

    kendo.ui.plugin(Button);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
