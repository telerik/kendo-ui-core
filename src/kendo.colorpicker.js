import "./kendo.core.js";
import "./kendo.color.js";
import "./kendo.popup.js";
import "./kendo.slider.js";
import "./kendo.userevents.js";
import "./kendo.button.js";
import "./kendo.binder.js";
import "./kendo.textbox.js";
import "./kendo.numerictextbox.js";
import "./kendo.html.button.js";
import "./colorpicker/colorselector.js";
import "./colorpicker/flatcolorpicker.js";

var __meta__ = {
    id: "colorpicker",
    name: "Color tools",
    category: "web",
    description: "Color selection widgets",
    depends: [ "core", "color", "popup", "slider", "userevents", "button", "binder", "textbox", "numerictextbox", "html.button" ]
};

(function($, undefined) {
    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.

    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        Color = kendo.Color,
        parseColor = kendo.parseColor,
        KEYS = kendo.keys,
        BACKGROUNDCOLOR = "background-color",
        MESSAGES = {
            apply: "Apply",
            cancel: "Cancel",
            noColor: "no color",
            clearColor: "Clear color",
            previewInput: null,
            contrastRatio: "Contrast ratio:",
            fail: "Fail",
            pass: "Pass",
            hex: "HEX",
            toggleFormat: "Toggle format",
            red: "Red",
            green: "Green",
            blue: "Blue",
            alpha: "Alpha",
            gradient: "Gradient view",
            palette: "Palette view"
        },
        NS = ".kendoColorTools",
        CLICK_NS = "click" + NS,
        KEYDOWN_NS = "keydown" + NS,
        ColorSelector = ui.colorpicker.ColorSelector,
        FlatColorPicker = ui.FlatColorPicker;

    /* -----[ The ColorPicker widget ]----- */

    var ColorPicker = Widget.extend({
        init: function(element, options) {
            var that = this;

            // Legacy support for the cases where only palette is defined
            if (options && options.palette && !options.view) {
                options.view = "palette";
            }

            Widget.fn.init.call(that, element, options);
            options = that.options = kendo.deepExtend({}, that.options, options);
            element = that.element;

            var value = element.attr("value") || element.val();
            if (value) {
                value = parseColor(value, true);
            } else {
                value = parseColor(options.value, true);
            }
            that._value = options.value = value;

            var _buttonHtml = kendo.html.renderButton('<button class="k-input-button" unselectable="on" aria-label="select" tabindex="-1"></button>', $.extend({}, that.options, {
                icon: "caret-alt-down"
            }));

            var content = that._inputWrapper = that.wrapper = $(that._template($.extend({}, that.options, {
                _buttonHtml: _buttonHtml
            })));

            that._applyCssClasses();
            element.hide().after(content);

            if (element.is("input")) {
                element.appendTo(content);
                that._preventDefaultLabelClick();
            }

            that._tabIndex = element.attr("tabIndex") || 0;

            that.enable(!element.attr("disabled"));

            var accesskey = element.attr("accesskey");
            if (accesskey) {
                element.attr("accesskey", null);
                content.attr("accesskey", accesskey);
            }

            that.bind("activate", function(ev) {
                if (!ev.isDefaultPrevented()) {
                    that.toggle();
                }
            });

            that._updateUI(value);
        },
        destroy: function() {
            this.wrapper.off(NS).find("*").off(NS);
            if (this._popup) {
                this._selector.destroy();
                this._popup.destroy();
            }
            this._selector = this._popup = this.wrapper = null;
            Widget.fn.destroy.call(this);
        },
        enable: function(enable) {
            var that = this,
                wrapper = that.wrapper,
                arrow = wrapper.find(".k-input-button");

            if (arguments.length === 0) {
                enable = true;
            }

            that.element.attr("disabled", !enable);
            wrapper.attr("aria-disabled", !enable);

            arrow.off(NS).on("mousedown" + NS, preventDefault);

            wrapper.addClass("k-disabled")
                .removeAttr("tabIndex")
                .add("*", wrapper).off(NS);

            if (enable) {
                wrapper.removeClass("k-disabled")
                    .attr("tabIndex", that._tabIndex)
                    .on("mouseenter" + NS, function() { wrapper.addClass("k-hover"); })
                    .on("mouseleave" + NS, function() { wrapper.removeClass("k-hover"); })
                    .on("focus" + NS, function() { wrapper.addClass("k-focus"); })
                    .on("blur" + NS, function() { wrapper.removeClass("k-focus"); })
                    .on(KEYDOWN_NS, bind(that._keydown, that))
                    .on(CLICK_NS, ".k-input-button", bind(that.toggle, that))
                    .on(CLICK_NS, ".k-input-inner", function() {
                        that.trigger("activate");
                    });
            } else {
                that.close();
            }
        },

        _template: kendo.template(({ toolIcon, _buttonHtml }) =>
           '<span role="textbox" aria-haspopup="true" class="k-colorpicker k-picker k-icon-picker">' +
                '<span class="k-input-inner">' +
                    `<span class="k-value-icon k-color-preview ${toolIcon ? 'k-icon-color-preview' : ''}">` +
                        (toolIcon ? kendo.ui.icon({ icon: toolIcon, iconClass: "k-color-preview-icon" }) : '') +
                        '<span class="k-color-preview-mask"></span>' +
                    '</span>' +
                '</span >' +
                _buttonHtml +
            '</span>'
        ),

        options: {
            name: "ColorPicker",
            closeOnSelect: false,
            contrastTool: false,
            palette: null,
            columns: 10,
            toolIcon: null,
            value: null,
            messages: MESSAGES,
            opacity: false,
            buttons: true,
            preview: true,
            clearButton: false,
            input: true,
            format: "hex",
            formats: ["rgb", "hex"],
            view: "gradient",
            views: ["gradient", "palette"],
            backgroundColor: null,
            ARIATemplate: (data) => `Current selected color is ${data || "none"}`,
            size: "medium",
            rounded: "medium",
            fillMode: "solid"
        },

        events: [ "activate", "change", "select", "open", "close" ],

        open: function() {
            if (!this.element.prop("disabled")) {
                this._getPopup().open();
            }
        },
        close: function() {
            var selOptions = (this._selector && this._selector.options) || {};
            selOptions._closing = true;
            this._getPopup().close();

            delete selOptions._closing;
        },
        toggle: function() {
            if (!this.element.prop("disabled")) {
                this._getPopup().toggle();
            }
        },
        setBackgroundColor: function(color) {
            var that = this,
                handler = function() { that._selector.setBackgroundColor(color); };

            that.options.contrastTool.backgroundColor = color;

            if (that._selector && (that._popup && that._popup.visible())) {
                that._selector.setBackgroundColor(color);
            } else if (that._popup) {
                that._popup.unbind("activate", handler);
                that._popup.bind("activate", handler);
            }
        },
        _noColorIcon: function() {
            return this.wrapper.find(".k-color-preview");
        },
        color: ColorSelector.fn.color,
        value: ColorSelector.fn.value,
        _select: ColorSelector.fn._select,
        _triggerSelect: ColorSelector.fn._triggerSelect,
        _isInputTypeColor: ColorSelector.fn._isInputTypeColor,

        _preventDefaultLabelClick: function() {
            // if there exists a <label> associated with this
            // input field, we must catch clicks on it to prevent
            // the built-in color picker from showing up.
            // https://github.com/telerik/kendo-ui-core/issues/292
            var that = this,
                element = that.element,
                label = element.closest("label"),
                id = element.attr("id");

            if (id) {
                label = label.add('label[for="' + id + '"]');
            }
            label.on("click", function(ev) {
                that.open();
                ev.preventDefault();
            });
        },

        _updateUI: function(value, dontChangeSelector) {
            this._updateInput(value);
            this._triggerSelect(value);

            this.wrapper.find(".k-color-preview-mask").css(
                BACKGROUNDCOLOR,
                value ? value.toDisplay() : ""
            );

            this._noColorIcon().toggleClass("k-no-color", !value);

            if (this._selector && !dontChangeSelector) {
                this._selector.value(value);
            }
        },
        _updateInput: function(value) {
            var formattedValue = "";

            if (value) {
                if (this._isInputTypeColor() || value.a == 1) {
                    // seems that input type="color" doesn't support opacity
                    // in colors; the only accepted format is hex #RRGGBB
                    formattedValue = value.toCss();
                } else {
                    formattedValue = value.toCssRgba();
                }

                this.element.val(formattedValue);
            }

            if (!this._ariaTemplate) {
                this._ariaTemplate = kendo.template(this.options.ARIATemplate);
            }

            this.wrapper.attr("aria-label", this._ariaTemplate(formattedValue));
        },
        _keydown: function(ev) {
            var key = ev.keyCode;
            if (this._getPopup().visible()) {
                if (key == KEYS.ESC) {
                    this._selector._cancel();
                } else {
                    this._selector._keydown(ev);
                }
                preventDefault(ev);
            }
            else if (key == KEYS.ENTER || key == KEYS.DOWN) {
                this.open();
                preventDefault(ev);
            }
        },
        _getPopup: function() {
            var that = this, popup = that._popup;

            if (!popup) {
                var options = that.options;
                var selectorType;

                selectorType = FlatColorPicker;

                options.autoupdate = options.buttons !== true;
                delete options.select;
                delete options.change;
                delete options.cancel;

                options._otOfPicker = false;

                var id = kendo.guid();

                var selectorWrapper = $('<div id="' + id + '" class="k-colorpicker-popup"></div>').appendTo(document.body);
                var selector = that._selector = new selectorType($('<div></div>').appendTo(selectorWrapper), options);

                that.wrapper.attr("aria-owns", id);

                that._popup = popup = selectorWrapper.kendoPopup({
                    anchor: that.wrapper,
                    adjustSize: { width: 5, height: 0 }
                }).data("kendoPopup");

                selector.bind({
                    select: function(ev) {
                        that._updateUI(parseColor(ev.value), true);
                    },
                    change: function(ev) {
                        if (that.options.buttons) {
                            that._select(selector.color());
                        } else {
                            that._updateUI(parseColor(ev.value), true);
                        }

                        if (that.options.buttons || (that._selector.options.view === "palette" && that.options.closeOnSelect)) {
                            that.close();
                        }
                    },
                    cancel: function() {
                        that.close();
                    }
                });
                popup.bind({
                    close: function(ev) {
                        if (that.trigger("close")) {
                            ev.preventDefault();
                            return;
                        }
                        that.wrapper.removeClass("k-focus");

                        var color = selector.color();

                        if (!that.options.buttons) {
                            that._select(color);
                        } else {
                            that._select(that.color());
                        }

                        color = that.color();

                        if (color && color.h) {
                            that._cachedHue = color.h;
                        }

                        var clickedOutside = event &&
                            event instanceof MouseEvent &&
                            $(event.target).parents(".k-colorpicker-popup").length === 0;

                        if (!clickedOutside) {
                            setTimeout(function() {
                                if (that.wrapper && !that.wrapper.is("[unselectable='on']")) {
                                    that.wrapper.trigger("focus");
                                }
                            }, 0);
                        }
                    },
                    open: function(ev) {
                        if (that.trigger("open")) {
                            ev.preventDefault();
                        } else {
                            that.wrapper.addClass("k-focus");
                        }
                    },
                    activate: function() {
                        var hsvColor,
                            selectedColor = that.color();

                        if (selectedColor) {
                            selectedColor = selectedColor.toHSV();
                            hsvColor = Color.fromHSV(that._cachedHue || 0, selectedColor.s, selectedColor.v, selectedColor.a);
                            selectedColor = selectedColor.equals(hsvColor) ? hsvColor : selectedColor;
                        }

                        selector.value(selectedColor);
                        selector.focus();
                        that.wrapper.addClass("k-focus");
                    }
                });
            }
            return popup;
        }
    });

    function preventDefault(ev) { ev.preventDefault(); }

    function bind(callback, obj) {
        return function() {
            return callback.apply(obj, arguments);
        };
    }

    ui.plugin(ColorPicker);

    kendo.cssProperties.registerPrefix("ColorPicker", "k-picker-");

    kendo.cssProperties.registerValues("ColorPicker", [{
        prop: "rounded",
        values: kendo.cssProperties.roundedValues.concat([['full', 'full']])
    }]);

})(window.kendo.jQuery);

