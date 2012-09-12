(function($, undefined) {

    function limitValue(value, minLimit, maxLimit) {
        return Math.max( minLimit, Math.min( maxLimit, value));
    }

    var ui = kendo.ui,
        Widget = ui.Widget,
        support = kendo.support,
        click = support.touch ? "touchend" : "click",
        Class = kendo.Class,
        proxy = $.proxy,
        ACTIVE_STATE = "km-state-active",
        fontStyles = [ "font-family", "font-size", "font-weight", "font-style", "line-height", "text-shadow" ],

        FontPicker = Widget.extend({
            init: function (element, options) {
                var that = this, popupElement, repeat;

                Widget.fn.init.call(that, element, options);
                element = that.element;
                options = that.options;

                if (!options.filter) {
                    element.addClass("k-sampler");
                }

                that.css = kendo.getComputedStyles(element[0], fontStyles);

                that.styleengine = options.styleEngine || that.element.parents(".device").data("kendoStyleEngine");

                that.popup = new ui.Popup("<div class='k-fontpick'></div>", {
                    anchor: element,
                    origin: "bottom center",
                    position: "top center",
                    open: function () {
                    },
                    close: function () {
                        if (that.styleengine) {
                            that.styleengine.update(that.element, that.css);
                        }
                    }
                });

                popupElement = that.popup.element;

                that.preview = $("<div class='font-preview'><div><div>QUICK BROWN FOX JUMPS OVER THE LAZY DOG</div><div>quick brown fox jumps over the lazy dog</div><div>QUICK BROWN FOX JUMPS OVER THE LAZY DOG</div><div>quick brown fox jumps over the lazy dog</div></div></div>").appendTo(popupElement);
                that._update();

                if (!options.filter) {
                    $(document.body)
                        .on(click, ".k-sampler", function(e) {
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

                $('<span class="label-title">Font family</span>').appendTo(popupElement);
                that.fontFamilyValue = $('<input type="text" class="input-value" title="font-family" />')
                                          .appendTo(popupElement).after('<br />');

                $('<span class="label-title">Size</span>').appendTo(popupElement);
                that.fontSizeValue = $('<input type="text" class="input-value" title="font-size" />')
                                        .appendTo(popupElement);

                $('<span class="label-title label-line-height">Line height</span>').appendTo(popupElement);
                that.lineHeightValue = $('<input type="text" class="input-value" title="line-height" />')
                                        .appendTo(popupElement).after('<br />');

                $('<span class="label-title">Weight</span>').appendTo(popupElement);
                that.fontWeightValue = $('<select title="font-weight"><option value="lighter">lighter</option><option value="normal">normal</option><option value="bold">bold</option><option value="bolder">bolder</option><option value="inherit">inherit</option></select>')
                                        .appendTo(popupElement).wrap('<span class="dropdown-wrapper" />')
                                        .kendoDropDownList().data("kendoDropDownList");

                $('<span class="label-title label-style">Style</span>').appendTo(popupElement);
                that.fontStyleValue = $('<select title="font-style"><option value="normal">normal</option><option value="italic">italic</option><option value="oblique">oblique</option><option value="inherit">inherit</option></select>')
                                        .appendTo(popupElement).wrap('<span class="dropdown-wrapper" />')
                                        .kendoDropDownList().data("kendoDropDownList");

                $('<span class="label-title">Text shadow</span>').appendTo(popupElement);

                that.textShadowXValue = $('<input type="text" class="input-value" title="text-shadow-x" />').appendTo(popupElement);
                that.textShadowYValue = $('<input type="text" class="input-value" title="text-shadow-y" />').appendTo(popupElement);
                that.textShadowSizeValue = $('<input type="text" class="input-value" title="text-shadow-size" />').appendTo(popupElement);
                that.textShadowColorValue = $('<input type="text" class="input-value" title="text-shadow-color" />').appendTo(popupElement);

                popupElement.find("[title*=shadow]:not([title=text-shadow-color]),[title*=size],[title*=height]").keydown(proxy(that._keyDown, that));
                popupElement.find("[title=text-shadow-color]").keydown(proxy(that._colorKeyDown, that));
                popupElement.find("input[type=text]").bind("input", proxy(that._updateConnected, that));
                popupElement.find("select").bind("change", proxy(that._updateConnected, that));
            },

            options: {
                name: "FontPicker",
                filter: null,
                toggleTarget: null,
                styleEngine: null
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

            _updateConnected: function () {
                var that = this;

                var filter = that.options.filter,
                    target = !filter ? that.element : that.target;

                that.css["font-family"] = that.fontFamilyValue.val();
                that.css["line-height"] = that.lineHeightValue.val();
                that.css["font-size"] = that.fontSizeValue.val();
                that.css["font-weight"] = that.fontWeightValue.value();
                that.css["font-style"] = that.fontStyleValue.value();
                that.css["text-shadow"] = that.textShadowColorValue.val() + " " + that.textShadowXValue.val() + " " + that.textShadowYValue.val() + " " + that.textShadowSizeValue.val();

                that.preview.css(that.css);
                target.css(that.css).removeClass("k-none");
                if (that.styleengine) {
                    target.attr("data-font", that.styleengine.createHash(JSON.stringify(that.css)));
                }
            },

            _update: function (trigger) {
                var that = this, textShadow,
                    target = !that.options.filter ? that.element : that.target;

                if (target) {
                    that.fontFamilyValue.val(that.css["font-family"]);
                    that.lineHeightValue.val(that.css["line-height"]);
                    that.fontSizeValue.val(that.css["font-size"]);
                    that.fontWeightValue.value(that.css["font-weight"]);
                    that.fontStyleValue.value(that.css["font-style"]);

                    textShadow = that.css["text-shadow"].match(/(rgba?\(.*\)|-?[\d\.]+[^\d\.\s]*)\s?/ig) || [ "rgba(0,0,0,0)", "0px", "0px", "0px" ];
                    that.textShadowXValue.val(textShadow[1]);
                    that.textShadowYValue.val(textShadow[2]);
                    that.textShadowSizeValue.val(textShadow[3]);
                    that.textShadowColorValue.val(textShadow[0]);

                    that.preview.css(that.css);

                    if (trigger) {
                        that.trigger("pick", { color: that.color, target: target });
                    }
                }
            },

            _keyDown: function (e) {
                var target = $(e.target),
                    title = target.attr("title"),
                    value = target.val(),
                    unit = value.match(/[^\d\.]*$/)[0];

                if (e.which == 38 || e.which == 40) {
                    value = parseFloat(value);
                    target.val((isNaN(value) ? "" : value + (e.which == 38 ? 1 : -1)) + unit);
                    target.trigger("input");
                }
            },

            _colorKeyDown: function (e) {
                var target = $(e.target),
                    title = target.attr("title"),
                    value = target.val();

                if (e.which == 38 || e.which == 40) {
                    target.val(tools.color.set(value)[e.which == 38 ? "tint" : "shade"]().get());
                    target.trigger("input");
                }
            },

            _toggle: function(open) {
                var that = this, target, options = that.options, repeat;

                if (options.filter) {
                    that.target = that.target || that.element.find(options.filter);
                }
                target = !options.filter ? that.element : that.target;

                open = open !== undefined? open : that.options.filter ? true : !that.popup.visible();

                if (open) {
                    that.css = kendo.getComputedStyles(target[0], fontStyles);

                    that._update();
                }

                that.popup[open ? "open" : "close"]();
            }

        });

    ui.plugin(FontPicker);

})(jQuery);
