(function($, undefined) {

    var ui = kendo.ui,
        Widget = ui.Widget,
        proxy = $.proxy,
        extend = $.extend,

        HSLPicker = Widget.extend({
            init: function (element, options) {
                var that = this;

                Widget.fn.init.call(that, element, options);
                element = that.element;

                that.popup = new ui.Popup("<div class='k-colorpick'></div>", {
                    anchor: element,
                    origin: "bottom center",
                    position: "top center"
                });

            element
                .bind({
                    click: function(e) {
                    e.preventDefault();
                    that._toggle();
                    }
                });

                that.color = new Color(element.css("background-color"));

                that.colorElement = $('<div class="color-value">#</div>').appendTo(that.popup.element);

                var popupElement = that.popup.element.addClass("k-list-container"),
                    hueElement = $('<label class="label">H<input type="progress" /></label>').appendTo(popupElement).find("input"),
                    hueValue = $('<div class="slider-value">0</div>').appendTo(popupElement),
                    saturationElement = $('<label class="label">S<input type="progress" /></label>').appendTo(popupElement).find("input"),
                    saturationValue = $('<div class="slider-value">0</div>').appendTo(popupElement),
                    lightnessElement = $('<label class="label">L<input type="progress" /></label>').appendTo(popupElement).find("input"),
                    lightnessValue = $('<div class="slider-value">0</div>').appendTo(popupElement),
                    alphaElement = $('<label class="label">A<input type="progress" /></label>').appendTo(popupElement).find("input"),
                    alphaValue = $('<div class="slider-value">0</div>').appendTo(popupElement),
                    slideProxy = proxy(that._onSlide, that);

                that.hueSlider = extend(hueElement.kendoColorSlider({ max: 359, slide: slideProxy, change: slideProxy }).data("kendoColorSlider"), { type: "hue", valueElement: hueValue });
                that.saturationSlider = extend(saturationElement.kendoColorSlider({ slide: slideProxy, change: slideProxy }).data("kendoColorSlider"), { type: "saturation", valueElement: saturationValue });
                that.lightnessSlider = extend(lightnessElement.kendoColorSlider({ slide: slideProxy, change: slideProxy }).data("kendoColorSlider"), { type: "lightness", valueElement: lightnessValue });
                that.alphaSlider = extend(alphaElement.kendoColorSlider({ max: 1, precision: 2, slide: slideProxy, change: slideProxy }).data("kendoColorSlider"), { type: "alpha", valueElement: alphaValue });

                kendo.notify(that);
            },

            events: [
                "pick"
            ],

            options: {
                name: "HSLPicker"
            },

            _toggle: function(open) {
                var that = this, color;
                open = open !== undefined? open : !that.popup.visible();

                if (open) {
                    color = that.color.set(that.element.css("background-color")).get();
                    that.colorElement.text(color);
                    that.colorElement.css("background-color", color);

                    that.hueSlider.value(that.color.hue());
                    that.saturationSlider.value(that.color.saturation());
                    that.lightnessSlider.value(that.color.lightness());
                    that.alphaSlider.value(that.color.alpha());

                    that.hueSlider.valueElement.text(that.color.hue());
                    that.saturationSlider.valueElement.text(that.color.saturation());
                    that.lightnessSlider.valueElement.text(that.color.lightness());
                    that.alphaSlider.valueElement.text(that.color.alpha());
                }

                that.popup[open ? "open" : "close"]();
            },

            _onSlide: function(e) {
                var that = this,
                    color = that.color[e.sender.type](e.value),
                    textColor = color.get();

                that.element.css("background-color", textColor);
                that.colorElement.text(textColor);
                that.colorElement.css("background-color", textColor);
                e.sender.valueElement.text(e.value);

                that.trigger("pick", { color: color });
            }
        });

    kendo.ui.plugin(HSLPicker);

})(jQuery);
