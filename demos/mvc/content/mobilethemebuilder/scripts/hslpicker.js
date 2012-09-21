(function($, undefined) {

    function round(value, precision) {
        var power = Math.pow(10, precision || 0);
        return Math.round(value * power) / power;
    }

    var ui = kendo.ui,
        Widget = ui.Widget,
        support = kendo.support,
        click = support.touch ? "touchend" : "click",
        proxy = $.proxy,
        extend = $.extend,

        HSLPicker = Widget.extend({
            init: function (element, options) {
                var that = this;

                Widget.fn.init.call(that, element, options);
                element = that.element;
                options = that.options;

                if (!options.filter) {
                    element.addClass("k-color-sampler");
                }

                that.popup = new ui.Popup("<div class='k-colorpick'></div>", {
                    anchor: element,
                    origin: "bottom center",
                    position: "top center"
                });

                if (!options.filter) {
                    $(document.body)
                        .on(click, ".k-color-sampler", function(e) {
                            if (e.currentTarget == element[0]) {
                                e.preventDefault();
                                that._toggle();
                            }
                        });
                } else {
                    $(element)
                        .on(click, options.filter, function(e) {
                            if (support.matchesSelector.call(e.currentTarget, options.filter)) {
                                e.preventDefault();
                                that.target = $(e.currentTarget);
                                that.popup.options.anchor = that.target;
                                that._toggle();
                            }
                        });
                }

                that.color = new Color(element.css("background-color"));

                that.colorElement = $('<div class="color-preview"></div>').appendTo(that.popup.element);
                that.colorValue = $('<input type="text" class="color-value" />').appendTo(that.colorElement);

                that.colorValue
                    .on("input", proxy(that._change, that))
                    .keydown(proxy(that._keyDown, that));

                var popupElement = that.popup.element.addClass("k-list-container"),
                    hueElement = $('<label class="label">H<input type="range" /></label>').appendTo(popupElement).find("input"),
                    hueValue = $('<input type="text" class="input-value" title="hue" />').appendTo(popupElement).after('<br />'),
                    saturationElement = $('<label class="label">S<input type="range" /></label>').appendTo(popupElement).find("input"),
                    saturationValue = $('<input type="text" class="input-value" title="saturation" />').appendTo(popupElement).after('<br />'),
                    lightnessElement = $('<label class="label">L<input type="range" /></label>').appendTo(popupElement).find("input"),
                    lightnessValue = $('<input type="text" class="input-value" title="lightness" />').appendTo(popupElement).after('<br />'),
                    alphaElement = $('<label class="label">A<input type="range" /></label>').appendTo(popupElement).find("input"),
                    alphaValue = $('<input type="text" class="input-value" title="alpha" />').appendTo(popupElement),
                    changeProxy = proxy(that._onChange, that),
                    slideProxy = proxy(that._onSlide, that);

                popupElement.children("[type=text]").keydown(proxy(that._keyDown, that));
                popupElement.children("[type=text]").bind("input", proxy(that._changeValue, that));

                that.hueSlider = extend(hueElement.kendoColorSlider({ max: 359, slide: slideProxy, change: changeProxy }).data("kendoColorSlider"), { type: "hue", valueElement: hueValue });
                that.saturationSlider = extend(saturationElement.kendoColorSlider({ slide: slideProxy, change: changeProxy }).data("kendoColorSlider"), { type: "saturation", valueElement: saturationValue });
                that.lightnessSlider = extend(lightnessElement.kendoColorSlider({ slide: slideProxy, change: changeProxy }).data("kendoColorSlider"), { type: "lightness", valueElement: lightnessValue });
                that.alphaSlider = extend(alphaElement.kendoColorSlider({ max: 1, precision: 2, slide: slideProxy, change: changeProxy }).data("kendoColorSlider"), { type: "alpha", valueElement: alphaValue });

                kendo.notify(that);
            },

            events: [
                "pick",
                "change"
            ],

            options: {
                name: "HSLPicker",
                filter: null,
                toggleTarget: null
            },

            open: function (target) {
                if (typeof target != "undefined") {
                    this.target = target;
                }

                this._toggle(true);
            },

            close: function () {
                this._toggle(false);
            },

            _updateValues: function (updateAttr) {
                var that = this,
                    color = that.color.get(),
                    readable = that.color.readable();

                if (updateAttr) {
                    that.colorValue.attr("value", color);
                }

                that.colorValue.css({
                    color: readable,
                    borderColor: readable
                });
                that.colorElement.css("background-color", color);
            },

            _update: function (updateAttr, trigger) {
                var that = this,
                    target = !that.options.filter ? that.element : that.target,
                    color = that.color.get();

                if (color) {
                    target
                        .css("background-color", color)
                        .attr("data-color", color == "rgba(0,0,0,0)" ? "none" : color);

                    that._updateValues(updateAttr);

                    that.hueSlider.value(that.color.hue());
                    that.saturationSlider.value(that.color.saturation());
                    that.lightnessSlider.value(that.color.lightness());
                    that.alphaSlider.value(that.color.alpha());

                    that.hueSlider.valueElement.val(that.color.hue());
                    that.saturationSlider.valueElement.val(that.color.saturation());
                    that.lightnessSlider.valueElement.val(that.color.lightness());
                    that.alphaSlider.valueElement.val(that.color.alpha());

                    if (trigger) {
                        that.trigger("pick", { color: that.color, target: target });
                    }
                }
            },

            _change: function (e) {
                var that = this;

                that.color.set(e.target.value);
                that._update(false, true);
            },

            _changeValue: function (e) {
                var that = this,
                    target = e.target,
                    value = target.value,
                    title = $(target).attr("title");

                if (value == parseFloat(value) && value[value.length-1] != ".") {
                    that.color[title](value);
                    that._update(true, true);
                }
            },

            _keyDown: function (e) {
                var that = this,
                    target = e.target,
                    title = $(target).attr("title"),
                    slider = that[title + "Slider"];

                if (e.which == 38 || e.which == 40) {
                    if (title) {
                        target.value = round(target.value*1 + (e.which == 38 ? 1 : -1) / slider.precisionFactor, 2);
                        that.color[title](target.value);
                    } else {
                        that.color[e.which == 38 ? "tint" : "shade"]();
                    }
                    that._update(true, true);
                }
            },

            _toggle: function(open) {
                var that = this, color, target, options = that.options;

                if (options.filter) {
                    that.target = that.target || that.element.find(options.filter);
                }
                target = !options.filter ? that.element : that.target;

                open = open !== undefined? open : that.options.filter ? true : !that.popup.visible();

                if (open) {
                    that.color.set(target.css("background-color"));
                    that._update(true);
                }

                that.popup[open ? "open" : "close"]();
            },

            _onChange: function(e) {
                var that = this,
                    color = this._onSlide(e),
                    target = !that.options.filter ? that.element : that.target;

                that.trigger("change", { color: color, target: target });
            },

            _onSlide: function(e) {
                var that = this,
                    textColor = that.color.set(that.color[e.sender.type](e.value).get()).get(),
                    target = !that.options.filter ? that.element : that.target;

                target
                    .css("background-color", textColor)
                    .attr("data-color", textColor)
                    .removeClass("k-none");

                that._updateValues(true);
                e.sender.valueElement.val(e.value);

                that.trigger("pick", { color: that.color, target: target });

                return that.color;
            }
        });

    kendo.ui.plugin(HSLPicker);

})(jQuery);
