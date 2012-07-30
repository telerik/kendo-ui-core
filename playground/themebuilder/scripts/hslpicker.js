(function($, undefined) {

    function contains(container, target) {
        return container === target || $.contains(container, target);
    }

    var ui = kendo.ui,
        Widget = ui.Widget,
        support = kendo.support,
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
                        .on("click", ".k-color-sampler", function(e) {
                            if (e.currentTarget == element[0]) {
                                e.preventDefault();
                                that._toggle();
                            }
                        });
                } else {
//                    that.popup._mousedown = function(e) {
//                        var container = that.popup.element[0],
//                            options = that.popup.options,
//                            anchor = $(options.anchor)[0],
//                            toggleTarget = $(that.options.toggleTarget),
//                            target = kendo.eventTarget(e),
//                            popup = $(target).closest(".k-popup")[0];
//
//                        if (popup && popup !== that.popup.element[0] ){
//                            return;
//                        }
//
//                        if (!contains(container, target) && !contains(anchor, target) && !(contains(that.element[0], target)) && !(toggleTarget && contains(toggleTarget[0], target))) {
//                            that.popup.close();
//                        }
//                    };

                    $(element)
                        .on("click", options.filter, function(e) {
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
                that.colorValue = $('<input class="color-value" />').appendTo(that.colorElement);

                that.colorValue
                    .bind("input", proxy(that._change, that))
                    .keyup(proxy(that._keyUp, that));

                var popupElement = that.popup.element.addClass("k-list-container"),
                    hueElement = $('<label class="label">H<input type="progress" /></label>').appendTo(popupElement).find("input"),
                    hueValue = $('<div class="slider-value">0</div><br />').appendTo(popupElement),
                    saturationElement = $('<label class="label">S<input type="progress" /></label>').appendTo(popupElement).find("input"),
                    saturationValue = $('<div class="slider-value">0</div><br />').appendTo(popupElement),
                    lightnessElement = $('<label class="label">L<input type="progress" /></label>').appendTo(popupElement).find("input"),
                    lightnessValue = $('<div class="slider-value">0</div><br />').appendTo(popupElement),
                    alphaElement = $('<label class="label">A<input type="progress" /></label>').appendTo(popupElement).find("input"),
                    alphaValue = $('<div class="slider-value">0</div>').appendTo(popupElement),
                    changeProxy = proxy(that._onChange, that),
                    slideProxy = proxy(that._onSlide, that);

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
                    target.css("background-color", color);

                    that._updateValues(color, updateAttr);

                    that.hueSlider.value(that.color.hue());
                    that.saturationSlider.value(that.color.saturation());
                    that.lightnessSlider.value(that.color.lightness());
                    that.alphaSlider.value(that.color.alpha());

                    that.hueSlider.valueElement.text(that.color.hue());
                    that.saturationSlider.valueElement.text(that.color.saturation());
                    that.lightnessSlider.valueElement.text(that.color.lightness());
                    that.alphaSlider.valueElement.text(that.color.alpha());

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

            _keyUp: function (e) {
                var that = this;

                if (e.which == 38) {
                    that.color.tint();
                    that._update(true, true);
                } else if (e.which == 40) {
                    that.color.shade();
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

                target.css("background-color", textColor);

                that._updateValues(true);
                e.sender.valueElement.text(e.value);

                that.trigger("pick", { color: that.color, target: target });

                return that.color;
            }
        });

    kendo.ui.plugin(HSLPicker);

})(jQuery);
