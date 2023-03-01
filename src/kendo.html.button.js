import "./kendo.html.base.js";
import "./kendo.icons.js";

var __meta__ = {
    id: "html.button",
    name: "Html.Button",
    category: "web",
    description: "HTML rendering utility for Kendo UI for jQuery.",
    depends: [ "html.base", "icons" ],
    features: []
};

(function($, undefined) {
    var kendo = window.kendo,
        HTMLBase = kendo.html.HTMLBase,

        KBUTTON = "k-button",
        KBUTTONICON = "k-button-icon",
        KBUTTONTEXT = "k-button-text";

    var renderButton = function(element, options) {
        if (arguments[0] === undefined || $.isPlainObject(arguments[0])) {
            options = element;
            element = $("<button></button>");
        }

        return (new HTMLButton(element, options)).html();
    };

    var HTMLButton = HTMLBase.extend({
        init: function(element, options) {
            var that = this;
            HTMLBase.fn.init.call(that, element, options);
            that.wrapper = that.element.addClass(KBUTTON);

            if (!that.element.attr("type")) {
                that.element.attr("type", that.options.type);
            }

            that._addClasses();
            that.iconElement();
            that._textElement();
        },
        options: {
            name: "HTMLButton",
            type: "button",
            icon: "",
            iconClass: "",
            spriteCssClass: "",
            imageUrl: "",
            size: "medium",
            rounded: "medium",
            fillMode: "solid",
            themeColor: "base",
            stylingOptions: [ "size", "rounded", "fillMode", "themeColor" ]
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
                    return (!$(this).hasClass("k-sprite") && !$(this).hasClass("k-icon") && !$(this).hasClass("k-svg-icon") && !$(this).hasClass("k-image"));
                }).each(function(idx, el) {
                    if (el.nodeType == 1 || el.nodeType == 3 && kendo.trim(el.nodeValue).length > 0) {
                        isEmpty = false;
                    }
                });
            }

            if (isEmpty) {
                that.element.addClass("k-icon-button");
            }

            if (imageUrl) {
                img = element.children("img.k-image").first();
                if (!img[0]) {
                    img = $('<img alt="icon" class="k-image" />').prependTo(element);
                }
                img.attr("src", imageUrl);
                img.addClass(KBUTTONICON);
            } else if (icon || iconClass) {
                span = element.children("span.k-icon, span.k-svg-icon").first();
                if (!span[0]) {
                    span = $(kendo.ui.icon({ icon, iconClass })).prependTo(element);
                } else {
                    kendo.ui.icon(span, { icon, iconClass });
                }

                span.addClass(KBUTTONICON);
            } else if (spriteCssClass) {
                span = element.children("span.k-sprite").first();
                if (!span[0]) {
                    span = $('<span class="k-sprite"></span>').prependTo(element);
                }
                span.addClass(spriteCssClass + " " + KBUTTONICON);
            }
        },
        _textElement: function() {
            var element = this.element;

            element.contents().filter(function() {
                return (!$(this).hasClass(KBUTTONICON) && !$(this).hasClass("k-sprite") && !$(this).hasClass("k-icon") && !$(this).hasClass("k-image"));
            }).each(function(idx, el) {
                if (el.nodeType == 1 || el.nodeType == 3 && kendo.trim(el.nodeValue).length > 0) {
                    if (el.nodeType === 3) {
                        var newSpan = document.createElement('span');

                        el.parentNode.insertBefore(newSpan, el);
                        newSpan.appendChild(el);
                        el = newSpan;
                    }

                    el.classList.add(KBUTTONTEXT);
                }
            });
        }
    });

    $.extend(kendo.html, {
        renderButton: renderButton,
        HTMLButton: HTMLButton
    });

    kendo.cssProperties.registerPrefix("HTMLButton", "k-button-");

    kendo.cssProperties.registerValues("HTMLButton", [{
        prop: "fillMode",
        values: kendo.cssProperties.fillModeValues.concat(["link"])
    }, {
        prop: "rounded",
        values: kendo.cssProperties.roundedValues.concat([['full', 'full']])
    }]);

})(window.kendo.jQuery);

