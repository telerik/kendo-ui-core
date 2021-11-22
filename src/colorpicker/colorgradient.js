(function(f, define){
    define([ "../kendo.core", "./contrastToolUtils" ], f);
})(function(){

(function($, undefined) {
    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /*jshint eqnull:true  */
    var kendo = window.kendo,
        ui = kendo.ui,
        Observable = kendo.Observable,
        parseColor = kendo.parseColor,
        extend = $.extend,
        Color = kendo.Color,
        KEYS = kendo.keys,
        BACKGROUNDCOLOR = "background-color",
        WHITE = "#ffffff",
        BLACK = "#000000",
        NS = ".kendoColorTools",
        KEYDOWN_NS = "keydown" + NS,
        ColorSelector = ui.colorpicker.ColorSelector,

        contrastToolUtils = ui.colorpicker.contrastToolUtils;

    function preventDefault(ev) { ev.preventDefault(); }

    function bind(callback, obj) {
        return function() {
            return callback.apply(obj, arguments);
        };
    }

    var ColorInput = Observable.extend({
        init: function(element, options) {
            var that = this;

            that.element = element;
            that.options = options;

            that._viewModel = kendo.observable({
                switchMode: that.switchMode.bind(that),
                keydown: that.keydown.bind(that),
                mode: function (mode) {
                    return mode === this.get("format");
                },
                format: options.format,
                formats: options.formats,
                rgb: null,
                hex: function () {
                    return this.get("rgb") !== null && this.get("rgb").toCss({alpha: options.opacity});
                }
            });

            that._changeHandler = that.change.bind(that);

            that._viewModel.bind("change", that._changeHandler);

            that._render();

            that.element.on(KEYDOWN_NS, that.keydown.bind(that));

            Observable.fn.init.call(that);
        },

        _template: kendo.template(
            '# if (options.formats && options.formats.length > 1) { #' +
            '<div class="k-vstack">' +
                '<button class="k-colorgradient-toggle-mode k-button k-icon-button k-flat" data-#:ns#bind="click: switchMode" title="#: options.messages.toggleFormat #">' +
                    '<span class="k-button-icon k-icon k-i-arrows-kpi"></span>' +
               '</button>' +
            '</div>' +
            '# } #' +


            // HEX input
            '# if (options.formats && options.formats.indexOf("hex") >= 0) { #' +
            '<div class="k-vstack k-flex-1" data-#:ns#bind="visible: mode(\'hex\')">' +
                '<input type="text" data-#:ns#bind="value: hex" data-#:ns#role="textbox" tabindex="#:options.tabindex#"  aria-label="#: options.messages.hex #"/>' +
                '<label class="k-colorgradient-input-label">HEX</label>' +
            '</div>' +
            '# } #' +

            // RGBA input
            '# if (options.formats && options.formats.indexOf("rgb") >= 0) { #' +
            '<div  class="k-vstack" data-#:ns#bind="visible: mode(\'rgb\')">' +
                '<input tabindex="#:options.tabindex#" data-#:ns#bind="value: rgb.r" data-#:ns#role="numerictextbox" data-#:ns#max="255" data-#:ns#min="0" data-#:ns#decimals="0" data-#:ns#spinners="false" data-#:ns#format="n0"  aria-label="#: options.messages.red #" />' +
                '<label class="k-colorgradient-input-label">R</label>' +
            '</div>' +
            '<div  class="k-vstack" data-#:ns#bind="visible: mode(\'rgb\')">' +
                '<input tabindex="#:options.tabindex#" data-#:ns#bind="value: rgb.g" data-#:ns#role="numerictextbox" data-#:ns#max="255" data-#:ns#min="0" data-#:ns#decimals="0" data-#:ns#spinners="false" data-#:ns#format="n0"  aria-label="#: options.messages.green #" />' +
                '<label class="k-colorgradient-input-label">G</label>' +
            '</div>' +
            '<div  class="k-vstack" data-#:ns#bind="visible: mode(\'rgb\')">' +
                '<input tabindex="#:options.tabindex#" data-#:ns#bind="value: rgb.b" data-#:ns#role="numerictextbox" data-#:ns#max="255" data-#:ns#min="0" data-#:ns#decimals="0" data-#:ns#spinners="false" data-#:ns#format="n0"  aria-label="#: options.messages.blue #"/>' +
                '<label class="k-colorgradient-input-label">B</label>' +
            '</div>' +
            '#if(options.opacity){#' +
            '<div  class="k-vstack" data-#:ns#bind="visible: mode(\'rgb\')">' +
                '<input tabindex="#:options.tabindex#" data-#:ns#bind="value: rgb.a" data-#:ns#role="numerictextbox" data-#:ns#step="0.1" data-#:ns#max="1" data-#:ns#min="0" data-#:ns#decimals="1" data-#:ns#spinners="false" data-#:ns#format="n1"  aria-label="#: options.messages.alpha #" />' +
                '<label class="k-colorgradient-input-label">A</label>' +
            '</div>' +
            '# } #' +
            '# } #'),
        destroy: function(){
            var that = this;


            that._viewModel.unbind("change", that._changeHandler);
            kendo.unbind(that.element);
            kendo.destroy(that.element);
            that.element.off(KEYDOWN_NS);
            delete that._viewModel;
            delete that._changeHandler;
        },
        _render: function() {
            var that = this;

            that.element
                .append(that._template({ ns: kendo.ns, guid: kendo.guid(), options: that.options }))
                .parent();

            kendo.bind(that.element, that._viewModel);
            that.element.attr("data-" + kendo.ns + "stop", "stop");
        },
        value: function (color) {
            var that = this;

            that._color = (color && color.toBytes()) || parseColor(BLACK);
            that._preventChangeEvent = true;
            that._viewModel.set("rgb", that._color);
            delete that._preventChangeEvent;
        },
        reset: function () {
            var that = this;

            that._preventChangeEvent = true;
            that._viewModel.set("rgb", parseColor(BLACK));
            delete that._preventChangeEvent;
        },
        switchMode: function() {
            var that = this,
                model = that._viewModel,
                currentFormat = model.format,
                index = model.formats.indexOf(currentFormat) + 1;

            index = index >= model.formats.length ? 0 : index;

            that._preventChangeEvent = true;
            that._viewModel.set("format", model.formats[index]);
            delete that._preventChangeEvent;
        },
        change: function (ev) {
            var that = this;

            if (ev.field.indexOf("rgb") >= 0) {
                that._color = that._tryParseColor(that._viewModel.rgb.toCssRgba());
                that._viewModel.set("hex", that._color.toCss({ alpha: that.options.opacity }));
            } else if (ev.field === "hex") {
                that._color = that._tryParseColor(ev.sender[ev.field]);
                that._viewModel.set("rgb", that._color);
            }

            if (!that._preventChangeEvent) {
                that.trigger("change", {value: that._color});
            }
        },
        _tryParseColor: function (color) {
            var that = this;

            try {
                color = parseColor(color) || that._color;
            } catch (error) {
                color = that._color;
            }

            return color;
        },
        keydown: function (ev) {
            var that = this,
                textbox = $(ev.target).data("kendoTextBox");

            if (ev.keyCode === KEYS.ENTER && $(ev.target).is("input")) {
                if(textbox && textbox._change) {
                    textbox._change();
                }

                that.trigger("change", {value: that._color});
                that.trigger("select", {value: that._color});
            }
        }
    });

    var ColorGradient = ColorSelector.extend({
        init: function (element, options) {
            var that = this,
                value;

            ColorSelector.fn.init.call(that, element, options);

            options = that.options = kendo.deepExtend({}, that.options, options);

            if(options.messages.previewInput) {
                options.messages.hex = options.messages.previewInput;
            }

            options.messages = options.messages ? $.extend(that.options.messages, options.messages) : that.options.messages;
            element = that.element;

            that.wrapper = element.addClass("k-colorgradient")
                .append(that._template(options));

            that._hueElements = $(".k-hsv-rectangle, .k-alpha-slider .k-slider-track", element);
            that._colorgradientInputs = $(".k-colorgradient-inputs", element);
            that._contrastTool = $(".k-colorgradient-color-contrast", element);

            that._sliders();

            that._hsvArea();

            value = that._value;

            if(that._colorgradientInputs.length) {
                that._colorInput = new ColorInput(that._colorgradientInputs, extend({}, options, {
                    tabindex: this._tabIndex
                }));

                that._colorInput.bind("change", function(ev){
                    that._updateUI(ev.value, true);
                });

                that._colorInput.bind("select", function(ev){
                    var color = parseColor(ev.value);
                    that._select(color);
                    that.trigger("forceSelect", { value: that.value() });
                });
            }

            that._updateUI(value);
        },
        options: {
            name : "ColorGradient",
            opacity : false,
            input : true,
            format: "hex",
            formats: ["rgb", "hex"],
            contrastTool: false,
            messages: {
                contrastRatio: "Contrast ratio:",
                fail: "Fail",
                pass: "Pass",
                hex: "HEX",
                toggleFormat: "Toggle format",
                red: "Red",
                green: "Green",
                blue: "Blue",
                alpha: "Alpha"
            }
        },
        _template: kendo.template(
            '<div class="k-colorgradient-canvas k-hstack">' +
                '<div class="k-hsv-rectangle"><div class="k-hsv-gradient"></div><div class="k-hsv-draghandle k-draghandle"></div></div>' +

                '<div class="k-hsv-controls k-hstack">' +
                    '<input class="k-hue-slider k-colorgradient-slider" />' +
                    '# if (opacity) { #' +
                        '<input class="k-alpha-slider k-colorgradient-slider" />' +
                    '# } #' +
                '</div>' +
            '</div>' +

            '# if (input) { #' +
            '<div class="k-colorgradient-inputs k-hstack">' +
            '</div>' +
            '# } #' +

            '# if (contrastTool) { #' +
                '<div class="k-colorgradient-color-contrast k-vbox">' +
                '</div>' +
            '# } #'
        ),
        _onEnable: function(enable) {
            this._hueSlider.enable(enable);

            if (this._opacitySlider) {
                this._opacitySlider.enable(enable);
            }

            this.wrapper.find("input").attr("disabled", !enable);

            var handle = this._hsvRect.find(".k-draghandle");

            if (enable) {
                handle.attr("tabIndex", this._tabIndex);
            } else {
                handle.removeAttr("tabIndex");
            }
        },
        _sliders: function() {
            var that = this,
                element = that.element,
                hueSlider = element.find(".k-hue-slider"),
                opacitySlider = element.find(".k-alpha-slider");

            function hueChange(e) {
                that._updateUI(that._getHSV(e.value, null, null, null));
            }

            hueSlider.attr("aria-label", "hue saturation");
            that._hueSlider = hueSlider.kendoSlider({
                min: 0,
                max: 360,
                tickPlacement: "none",
                showButtons: false,
                orientation: "vertical",
                slide: hueChange,
                change: hueChange
            }).data("kendoSlider");

            function opacityChange(e) {
                that._updateUI(that._getHSV(null, null, null, e.value / 100));
            }

            opacitySlider.attr("aria-label", "opacity");
            that._opacitySlider = opacitySlider.kendoSlider({
                min: 0,
                max: 100,
                tickPlacement: "none",
                showButtons: false,
                orientation: "vertical",
                slide: opacityChange,
                change: opacityChange
            }).data("kendoSlider");
        },
        _hsvArea: function() {
            var that = this,
                element = that.element,
                hsvRect = element.find(".k-hsv-rectangle"),
                hsvHandle = hsvRect.find(".k-draghandle").attr("tabIndex", 0).on(KEYDOWN_NS, bind(that._keydown, that));

            function update(x, y) {
                var offset = this.offset,
                    dx = x - offset.left, dy = y - offset.top,
                    rw = this.width, rh = this.height;

                dx = dx < 0 ? 0 : dx > rw ? rw : dx;
                dy = dy < 0 ? 0 : dy > rh ? rh : dy;
                that._svChange(dx / rw, 1 - dy / rh);
            }

            that._hsvEvents = new kendo.UserEvents(hsvRect, {
                global: true,
                press: function(e) {
                    this.offset = kendo.getOffset(hsvRect);
                    this.width = hsvRect.width();
                    this.height = hsvRect.height();
                    hsvHandle.focus();
                    update.call(this, e.x.location, e.y.location);
                },
                start: function() {
                    hsvRect.addClass("k-dragging");
                    hsvHandle.focus();
                },
                move: function(e) {
                    e.preventDefault();
                    update.call(this, e.x.location, e.y.location);
                },
                end: function() {
                    hsvRect.removeClass("k-dragging");
                }
            });

            that._hsvRect = hsvRect;
            that._hsvHandle = hsvHandle;
        },
        setBackgroundColor: function (color) {
            var that = this;

            if (that.options.contrastTool) {
                that.options.contrastTool = $.isPlainObject(that.options.contrastTool) ? extend({}, that.options.contrastTool, {
                    backgroundColor: color
                }) : {
                    backgroundColor: color
                };

                that._updateColorContrast(that.color() || parseColor(WHITE));
            }
        },
        _updateUI: function(color, dontChangeInput) {
            var that = this;

            if (!color) {
                that._reset();
                return;
            }

            if (!dontChangeInput && that._colorInput) {
                that._colorInput.value(color);
            }

            that._triggerSelect(color);
            that._updateHsv(color);

            if(that._contrastTool.length) {
                that._updateColorContrast(color);
            }
        },
        _reset: function () {
            var that = this;

            if (that._colorInput) {
                that._colorInput.reset();
            }

            that._resetHsv();
            that._resetColorContrast();
        },
        _resetHsv: function () {
            var that = this,
                color = parseColor(BLACK);

            that._updateHsv(color);
        },
        _updateHsv: function (color) {
            var that = this,
                rect = that._hsvRect;

            color = color.toHSV();

            that._hsvHandle.css({
                // saturation is 0 on the left side, full (1) on the right
                left: color.s * rect.width() + "px",
                // value is 0 on the bottom, full on the top.
                top: (1 - color.v) * rect.height() + "px"
            });

            that._hueElements.css(BACKGROUNDCOLOR, Color.fromHSV(color.h, 1, 1, 1).toCss());
            that._hueSlider.value(color.h);

            if (that._opacitySlider) {
                that._opacitySlider.wrapper.find(".k-slider-track").css("background", "linear-gradient(to top, transparent, " + Color.fromHSV(color.h, 1, 1, 1).toCss());
                that._opacitySlider.value(100 * color.a);
            }
        },
        _resetColorContrast: function () {
            var that = this,
                contrastOptions = that.options.contrastTool;

            if(that._contrastTool.length) {
                that._updateColorContrast(contrastOptions.backgroundColor ? parseColor(contrastOptions.backgroundColor) : parseColor(WHITE));
            }
        },
        _updateColorContrast: function (color) {
            var that = this,
                contrastOptions = that.options.contrastTool,
                backgroundColor = contrastOptions.backgroundColor ? parseColor(contrastOptions.backgroundColor) : parseColor(WHITE),
                contrastRatio = contrastToolUtils.getContrastFromTwoRGBAs(parseColor(color.toCssRgba()), backgroundColor),
                contrastRatioTemplate = kendo.template('<div class="k-contrast-ratio">' +
                                            '<span class="k-contrast-ratio-text">#:messages.contrastRatio# #:kendo.toString(ratio, "n2")#</span>' +
                                            '<span class="k-contrast-validation k-text-success">' +
                                                '#if (ratio > 4.5) {#' +
                                                    '<span class="k-icon k-i-check"></span>' +
                                                '#}#' +
                                                '#if (ratio > 7) {#' +
                                                    '<span class="k-icon k-i-check"></span>' +
                                                '#}#' +
                                            '</span></div>'),
                labelTemplate = kendo.template('<div>' +
                                            '<span>#:level#: #:limit# </span>' +
                                            '#if (ratio > limit) {#' +
                                            '<span class="k-contrast-validation k-text-success">#:messages.pass# <span class="k-icon k-i-check"></span></span>' +
                                            '#} else {#' +
                                            '<span class="k-contrast-validation k-text-error">#:messages.fail# <span class="k-icon k-i-close"></span></span>' +
                                            '#}#' +
                                            '</div>'),
                output = "";

            output += contrastRatioTemplate({
                messages: that.options.messages,
                ratio: contrastRatio,
            });

            output += labelTemplate({
                messages: that.options.messages,
                ratio: contrastRatio,
                limit: 4.5,
                level: "AA"
            });

            output += labelTemplate({
                messages: that.options.messages,
                ratio: contrastRatio,
                limit: 7,
                level: "AAA"
            });

            that._contrastTool.find(".k-contrast-ratio, div").remove();
            that._contrastTool.append(output);

            that._updateContrastSvg(backgroundColor);
        },
        _updateContrastSvg: function (backgroundColor) {
            var that = this,
                hsvRect = that._hsvRect,
                svgClassName = "k-color-contrast-svg",
                metrics = { width: hsvRect.width(), height: hsvRect.height() },
                newSvg;

            if(!metrics.width || !metrics.height) {
                return;
            }

            newSvg = $(contrastToolUtils.renderSvgCurveLine(metrics, that._getHSV(), backgroundColor)).addClass(svgClassName);

            hsvRect.find("." + svgClassName).remove();
            hsvRect.append(newSvg);
        },
        _keydown: function(ev) {
            var that = this;
            function move(prop, d) {
                var c = that._getHSV();
                c[prop] += d * (ev.shiftKey ? 0.01 : 0.05);
                if (c[prop] < 0) { c[prop] = 0; }
                if (c[prop] > 1) { c[prop] = 1; }
                that._updateUI(c);
                preventDefault(ev);
            }
            function hue(d) {
                var c = that._getHSV();
                c.h += d * (ev.shiftKey ? 1 : 5);
                if (c.h < 0) { c.h = 0; }
                if (c.h > 359) { c.h = 359; }
                that._updateUI(c);
                preventDefault(ev);
            }
            switch (ev.keyCode) {
            case KEYS.LEFT:
                if (ev.ctrlKey) {
                    hue(-1);
                } else {
                    move("s", -1);
                }
                break;
            case KEYS.RIGHT:
                if (ev.ctrlKey) {
                    hue(1);
                } else {
                    move("s", 1);
                }
                break;
            case KEYS.UP:
                move(ev.ctrlKey && that._opacitySlider ? "a" : "v", 1);
                break;
            case KEYS.DOWN:
                move(ev.ctrlKey && that._opacitySlider ? "a" : "v", -1);
                break;
            case KEYS.ENTER:
                that._select(that._getHSV());
                break;
            case KEYS.F2:
                that._colorInput.element.find("input").trigger("focus").select();
                break;
            case KEYS.ESC:
                that._cancel();
                break;
            }
        },
        focus: function() {
            this._hsvHandle.focus();
        },
        _getHSV: function(h, s, v, a) {
            var that = this,
                rect = that._hsvRect,
                width = rect.width(),
                height = rect.height(),
                handlePosition = this._hsvHandle.position();

            if(!width || !height) {
                return that.color() ? that.color().toHSV() : parseColor(BLACK);
            }

            if (h == null) {
                h = that._hueSlider.value();
            }
            if (s == null) {
                s = handlePosition.left / width;
            }
            if (v == null) {
                v = 1 - handlePosition.top / height;
            }
            if (a == null) {
                a = that._opacitySlider ? that._opacitySlider.value() / 100 : 1;
            }
            return Color.fromHSV(h, s, v, a);
        },
        _svChange: function(s, v) {
            var color = this._getHSV(null, s, v, null);
            this._updateUI(color);
        },
        destroy: function (){
            this._hsvEvents.destroy();

            this._hueSlider.destroy();
            if (this._opacitySlider) {
                this._opacitySlider.destroy();
            }

            if(this._colorInput) {
                this._colorInput.destroy();
            }

            this._hueSlider = this._opacitySlider = this._hsvRect = this._hsvHandle =
                this._hueElements = this._selectedColor = this._colorAsText =
                this._contrastTool = null;

            ColorSelector.fn.destroy.call(this);
        }
    });

    ui.plugin(ColorGradient);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });