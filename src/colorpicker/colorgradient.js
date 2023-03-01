import "../kendo.core.js";
import "../kendo.popup.js";
import "./contrastToolUtils.js";
import "../kendo.icons.js";

    var __meta__ = {
        id: "colorgradient",
        name: "ColorGradient",
        category: "web", // suite
        description: "ColorGradient allows selection of a color from an HSV canvas.",
        depends: ["core", "popup", "textbox", "icons"] // dependencies
    };
(function($, undefined) {
    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.

    var kendo = window.kendo,
        ui = kendo.ui,
        Observable = kendo.Observable,
        parseColor = kendo.parseColor,
        extend = $.extend,
        encode = kendo.htmlEncode,
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
                isHEXMode: function () { return this.get("format") === 'hex' },
                isRGBMode: function () { return this.get("format") === 'rgb' },
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
        _template: kendo.template(({ options, ns }) => {
            let optionsSize = encode(options.size);
            let optionsTabIndex = encode(options.tabindex);

            let vStackElement = "";
            if (options.formats && options.formats.length > 1) {
                let optionsMessagesToggleFormat = encode(options.messages.toggleFormat);

                vStackElement =
                '<div class="k-vstack">' +
                    `<button class="k-colorgradient-toggle-mode" data-${ns}role="button" data-${ns}icon="caret-alt-expand" data data-${ns}bind="click: switchMode" data-${ns}fill-mode="flat" data-${ns}size="${optionsSize}" title="${optionsMessagesToggleFormat}">` +
                    '</button>' +
                '</div>';
            }

            // HEX input
            let hexInputElement = "";
            if (options.formats && options.formats.indexOf("hex") >= 0) {
                let optionsMessagesHex = encode(options.messages.hex);

                hexInputElement =
                `<div class="k-vstack k-flex-1" data-${ns}bind="visible: isHEXMode">` +
                    `<input type="text" data-${ns}bind="value: hex" data-${ns}role="textbox" data-${ns}size="${optionsSize}" tabindex="${optionsTabIndex}"  aria-label="${optionsMessagesHex}"/>` +
                    '<label class="k-colorgradient-input-label">HEX</label>' +
                '</div>'
            }

            // RGBA input
            let rgbaInputElement = "";
            if (options.formats && options.formats.indexOf("rgb") >= 0) {
                let optionsMessagesRed = encode(options.messages.red);
                let optionsMessagesGreen = encode(options.messages.green);
                let optionsMessagesBlue = encode(options.messages.blue);

                rgbaInputElement =
                `<div class="k-vstack" data-${ns}bind="visible: isRGBMode">` +
                    `<input tabindex="${optionsTabIndex}" data-${ns}bind="value: rgb.r" data-${ns}role="numerictextbox" data-${ns}size="${optionsSize}" data-${ns}max="255" data-${ns}min="0" data-${ns}decimals="0" data-${ns}spinners="false" data-${ns}format="n0" aria-label="${optionsMessagesRed}" />` +
                    '<label class="k-colorgradient-input-label">R</label>' +
                '</div>' +
                `<div class="k-vstack" data-${ns}bind="visible: isRGBMode">` +
                    `<input tabindex="${optionsTabIndex}" data-${ns}bind="value: rgb.g" data-${ns}role="numerictextbox" data-${ns}size="${optionsSize}" data-${ns}max="255" data-${ns}min="0" data-${ns}decimals="0" data-${ns}spinners="false" data-${ns}format="n0" aria-label="${optionsMessagesGreen}" />` +
                    '<label class="k-colorgradient-input-label">G</label>' +
                '</div>' +
                `<div class="k-vstack" data-${ns}bind="visible: isRGBMode">` +
                    `<input tabindex="${optionsTabIndex}" data-${ns}bind="value: rgb.b" data-${ns}role="numerictextbox" data-${ns}size="${optionsSize}" data-${ns}max="255" data-${ns}min="0" data-${ns}decimals="0" data-${ns}spinners="false" data-${ns}format="n0" aria-label="${optionsMessagesBlue}"/>` +
                    '<label class="k-colorgradient-input-label">B</label>' +
                '</div>';

                if(options.opacity) {
                    let optionsMessagesAlpha = options.messages.alpha;
                    rgbaInputElement +=
                    `<div class="k-vstack" data-${ns}bind="visible: isRGBMode">` +
                        `<input tabindex="${optionsTabIndex}" data-${ns}bind="value: rgb.a" data-${ns}role="numerictextbox" data-${ns}size="${optionsSize}" data-${ns}step="0.1" data-${ns}max="1" data-${ns}min="0" data-${ns}decimals="1" data-${ns}spinners="false" data-${ns}format="n1" aria-label="${optionsMessagesAlpha}" />` +
                        '<label class="k-colorgradient-input-label">A</label>' +
                    '</div>';
                }
            }

            return vStackElement + hexInputElement + rgbaInputElement;
        }),
        destroy: function(){
            var that = this;

            that._viewModel.unbind("change", that._changeHandler);
            kendo.unbind(that.element);
            kendo.destroy(that.element);
            that.element.off(KEYDOWN_NS);
            delete that._viewModel;
            delete that._changeHandler;
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
        value: function (color) {
            var that = this;

            that._color = (color && color.toBytes()) || parseColor(BLACK);
            that._preventChangeEvent = true;
            that._viewModel.set("rgb", that._color);
            delete that._preventChangeEvent;
        },
        _render: function() {
            var that = this;

            that.element
                .append(that._template({ ns: kendo.ns, guid: kendo.guid(), options: that.options }))
                .parent();

            kendo.bind(that.element, that._viewModel);
            that.element.attr("data-" + kendo.ns + "stop", "stop");
        },
        _tryParseColor: function (color) {
            var that = this;

            try {
                color = parseColor(color) || that._color;
            } catch (error) {
                color = that._color;
            }

            return color;
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

            that._wrapper();
            that._sliders();
            that._hsvArea();

            value = that._value;

            that._gradientInputs();
            that._updateUI(value);
            that._navigation();
        },
        options: {
            name : "ColorGradient",
            opacity : false,
            hsvDragARIATemplate: (data) => `Color well with two-dimensional slider for selecting saturation and value. Selected color is ${data || "none"}`,
            input : true,
            format: "hex",
            formats: ["rgb", "hex"],
            contrastTool: false,
            size: "medium",
            messages: {
                contrastRatio: "Contrast ratio:",
                fail: "Fail",
                pass: "Pass",
                hex: "HEX",
                toggleFormat: "Toggle format",
                red: "Red channel",
                green: "Green channel",
                blue: "Blue channel",
                alpha: "Alpha channel"
            },
            _otOfPicker: true
        },
        _template: kendo.template((options) =>
                '<div class="k-colorgradient-canvas k-hstack">' +
                    '<div class="k-hsv-rectangle"><div class="k-hsv-gradient"></div><div role="slider" aria-orientation="undefined" class="k-hsv-draghandle k-draghandle"></div></div>' +
                    '<div class="k-hsv-controls k-hstack">' +
                        '<input class="k-hue-slider k-colorgradient-slider" />' +
                        (options.opacity ? '<input class="k-alpha-slider k-colorgradient-slider" />' : '') +
                    '</div>' +
                '</div>' +
                (options.input ? '<div class="k-colorgradient-inputs k-hstack"></div>' : '') +
                (options.contrastTool ? '<div class="k-colorgradient-color-contrast k-vbox"></div>' : '')
        ),
        focus: function() {
            this._hsvHandle.focus();
        },
        setBackgroundColor: function(color) {
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
        _gradientInputs: function() {
            var that = this,
                options = that.options;

            if(that._colorgradientInputs.length) {
                that._colorInput = new ColorInput(that._colorgradientInputs, extend({}, options, {
                    tabindex: 0
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
        },
        _hsvArea: function() {
            var that = this,
                wrapper = that.wrapper,
                hsvRect = wrapper.find(".k-hsv-rectangle"),
                hsvHandle = hsvRect.find(".k-draghandle").attr("tabIndex", 0).on(KEYDOWN_NS, bind(that._hsvKeydown, that)),
                value = this.value();

            if (value && value.indexOf("rgba") > -1) {
                value = value.replace("rgba", "RGBA");
            };

            if (!this._hsvDragAriaTemplate) {
                this._hsvDragAriaTemplate = kendo.template(this.options.hsvDragARIATemplate);
            }

            hsvHandle.attr("aria-label", this._hsvDragAriaTemplate(value || ''));

            function update(x, y) {
                var offset = this.offset,
                    dx = x - offset.left, dy = y - offset.top,
                    rw = this.width, rh = this.height,
                    resultX, resultY;

                dx = dx < 0 ? 0 : dx > rw ? rw : dx;
                dy = dy < 0 ? 0 : dy > rh ? rh : dy;
                resultX = dx / rw;
                resultY = 1 - dy / rh;

                that._svChange(resultX, resultY);
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
        _hsvKeydown: function(ev) {
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
        _onEnable: function(enable) {
            var wrapper = this.wrapper;

            this._hueSlider.enable(enable);

            if (this._opacitySlider) {
                this._opacitySlider.enable(enable);
            }

            wrapper.find("input").attr("disabled", !enable);

            if (this.options._standalone) {
                if (enable) {
                    wrapper.removeAttr("aria-disabled");
                } else {
                    wrapper.attr("aria-disabled", true);
                }
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
        _resetColorContrast: function () {
            var that = this,
                contrastOptions = that.options.contrastTool;

            if(that._contrastTool.length) {
                that._updateColorContrast(contrastOptions.backgroundColor ? parseColor(contrastOptions.backgroundColor) : parseColor(WHITE));
            }
        },
        _resetHsv: function () {
            var that = this,
                color = parseColor(BLACK);

            that._updateHsv(color);
        },
        _sliders: function() {
            var that = this,
                wrapper = that.wrapper,
                hueSlider = wrapper.find(".k-hue-slider"),
                opacitySlider = wrapper.find(".k-alpha-slider");

            function hueChange(e) {
                that._updateUI(that._getHSV(e.value, null, null, null));
            }

            hueSlider.attr("aria-label", "hue");
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
        _svChange: function(s, v) {
            var color = this._getHSV(null, s, v, null);
            this._updateUI(color);
        },
        _updateColorContrast: function (color) {
            var that = this,
                contrastOptions = that.options.contrastTool,
                backgroundColor = contrastOptions.backgroundColor ? parseColor(contrastOptions.backgroundColor) : parseColor(WHITE),
                contrastRatio = contrastToolUtils.getContrastFromTwoRGBAs(parseColor(color.toCssRgba()), backgroundColor),
                contrastRatioTemplate = kendo.template(({ messages, ratio }) =>
                                            '<div class="k-contrast-ratio">' +
                                                `<span class="k-contrast-ratio-text">${encode(messages.contrastRatio)} ${encode(kendo.toString(ratio, "n2"))}</span>` +
                                                '<span class="k-contrast-validation k-text-success">' +
                                                    (ratio > 4.5 ?  kendo.ui.icon("check") : '') +
                                                    (ratio > 7 ?  kendo.ui.icon("check") : '') +
                                            '</span></div>'),
                labelTemplate = kendo.template(({ messages, ratio, limit, level }) =>
                                            '<div>' +
                                                `<span>${encode(level)}: ${encode(limit)} </span>` +
                                                (ratio > limit ?
                                                `<span class="k-contrast-validation k-text-success">${encode(messages.pass)} ${kendo.ui.icon("check")}</span>`
                                                :
                                                `<span class="k-contrast-validation k-text-error">${encode(messages.fail)} ${kendo.ui.icon("x")}</span>`) +
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

            that._updateHsvAria(color.s, color.v);
        },
        _updateHsvAria: function(x,y) {
            var value = this.value();

            if (value && value.indexOf("rgba") > -1) {
                value = value.replace("rgba", "RGBA");
            }

            this._hsvHandle.attr({
                "aria-label": this._hsvDragAriaTemplate(value || ''),
                "aria-valuenow": Math.round(x * 100),
                "aria-valuetext": "saturation: " + Math.round(x * 100) + "%, value: " + Math.round(y * 100) + "%"
            });
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
        _wrapper: function() {
            var options = this.options,
                wrapper;

            if (this.element.is("input")) {
                wrapper = this.element.addClass("k-hidden").wrap("<div>").parent();
            } else {
                wrapper = this.element;
            }

            wrapper.addClass("k-colorgradient")
                .attr({
                    "role": "textbox",
                    "aria-keyshortcuts": "Enter"
                })
                .append(this._template(options));

            this._hueElements = $(".k-hsv-rectangle, .k-alpha-slider .k-slider-track", wrapper);
            this._colorgradientInputs = $(".k-colorgradient-inputs", wrapper);
            this._contrastTool = $(".k-colorgradient-color-contrast", wrapper);

            this.wrapper = wrapper;
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

