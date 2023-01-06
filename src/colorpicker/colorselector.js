import "../kendo.core.js";

(function($, undefined) {
    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.

    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        parseColor = kendo.parseColor,
        TabKeyTrap = kendo.ui.Popup.TabKeyTrap,

        extend = $.extend,

        NS = ".kendoColorTools",
        KEYDOWN_NS = "keydown" + NS,
        DISABLED = "k-disabled";

    var ColorSelector = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);
            element = that.element;
            options = that.options;

            if (element.is("input")) {
                that._initialValue();
                that._preventDefaultLabelClick();
            } else {
                that._value = parseColor(options.value);
            }

            that._tabIndex = element.attr("tabIndex") || 0;

            if (options._standalone) {
                that._triggerSelect = that._triggerChange;
            }
        },
        options: {
            name: "ColorSelector",
            ARIATemplate: (data) => `Current selected color is ${data || "none"}`,
            value: null,
            _standalone: true
        },
        events: [
            "change",
            "select",
            "forceSelect",
            "cancel"
        ],
        color: function(value) {
            if (value !== undefined) {
                this._value = parseColor(value);

                if (this.element.is("input")) {
                    this._updateInput(this._value);
                }

                this._updateUI(this._value);
            }

            return this._value;
        },
        value: function(color) {
            color = this.color(color);

            if (color) {
                if (this.options.opacity) {
                    color = color.toCssRgba();
                } else {
                    color = color.toCss();
                }
            }

            return color || null;
        },
        enable: function(enable) {
            if (arguments.length === 0) {
                enable = true;
            }

            if (this.element.is("input")) {
                this.element.attr("disabled", !enable);
            }

            this.wrapper.toggleClass(DISABLED, !enable);

            this._onEnable(enable);
        },
        _attachFocusEvents: function () {
            this.wrapper.on(KEYDOWN_NS, this._navKeydown.bind(this))
                .on("focusout" + NS, this._navFocusout.bind(this));
        },
        _initialValue: function() {
            var element = this.element,
                options = this.options,
                value = options.value || element.attr("value");

            if (value) {
                this._value = parseColor(value, true);
            }

            this.element.val(value);
        },
        _innerTabindex: function(value) {
            var wrapper = this.wrapper;

            wrapper.find(".k-draghandle, .k-button, .k-input-inner").attr("tabindex", value);
        },
        _isInputTypeColor: function() {
            var el = this.element[0];
            return (/^input$/i).test(el.tagName) && (/^color$/i).test(el.type);
        },
        _navFocusout: function() {
            var that = this,
                wrapper = that.wrapper[0];

            setTimeout(function() {
                if (!wrapper.contains(document.activeElement)) {
                    that._releaseInnerFocus();
                }
            });
        },
        _navKeydown: function(e) {
            var wrapper = this.wrapper;

            if (e.keyCode === kendo.keys.ENTER && wrapper.attr("tabindex")) {
                e.preventDefault();

                this._trapInnerFocus();
            } else if (e.keyCode === kendo.keys.ESC && wrapper.attr("tabindex") === undefined) {
                this._releaseInnerFocus();
                this.wrapper.trigger("focus");
            }
        },
        _releaseInnerFocus: function() {
            this._tabKeyTrap.removeTrap();
            this.wrapper.attr("tabindex", this._tabIndex);
            this._innerTabindex(-1);
        },
        _select: function(color, nohooks) {
            var prev = this._value;

            color = this.color(color);

            if (!nohooks) {
                if ((color && (!prev || !color.equals(prev))) || (color === null && color !== prev)) {
                    if (color === null && this.element.val) {
                        this.element.val(color);
                    }

                    this.element.trigger("change");
                    this.trigger("change", { value: this.value() });
                } else if (!this._standalone) {
                    this.trigger("cancel");
                }
            }
        },
        _navigation: function() {
            var value = this.value();

            if (value && value.indexOf("rgba") > -1) {
                value = value.replace("rgba", "RGBA");
            };

            if (this.options._otOfPicker) {
                this._innerTabindex(-1);
                this._attachFocusEvents();
                this._tabKeyTrap = new TabKeyTrap(this.wrapper);

                this._ariaTemplate = kendo.template(this.options.ARIATemplate);
                this.wrapper.attr({
                    "aria-label": this._ariaTemplate(value || ""),
                    tabindex: this._tabIndex
                });
            } else {
                this.wrapper.removeAttr("tabindex");
                this.wrapper.removeAttr("aria-label");
                this.wrapper.removeAttr("role");
                this.wrapper.removeAttr("aria-keyshortcuts");
            }
        },
        _trapInnerFocus: function() {
            this._innerTabindex(0);
            this.wrapper.removeAttr("tabindex");
            this.wrapper.find(".k-hsv-draghandle").trigger("focus");
            this._tabKeyTrap.trap();
        },
        _triggerSelect: function(color) {
            triggerEvent(this, "select", color);
        },
        _triggerChange: function(color) {
            triggerEvent(this, "change", color);
        },
        destroy: function() {
            if (this.element) {
                this.element.off(NS);
            }

            if (this.wrapper) {
                this.wrapper.off(KEYDOWN_NS);
                this.wrapper.off(NS).find("*").off(NS);
                this.wrapper = null;
            }

            Widget.fn.destroy.call(this);
        },
        _preventDefaultLabelClick: function() {
            // if there exists a <label> associated with this
            // input field, we must catch clicks on it to prevent
            // the built-in color picker from showing up.
            // https://github.com/telerik/kendo-ui-core/issues/292
            var element = this.element,
                label = element.closest("label"),
                id = element.attr("id");

            if (id) {
                label = label.add('label[for="' + id + '"]');
            }
            label.on("click", function(ev) {
                ev.preventDefault();
            });
        },
        _updateUI: $.noop,
        _updateInput: function(value) {
            var formattedValue = "",
                valueForLabel;

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

            if (this.options._otOfPicker) {
                if (!this._ariaTemplate) {
                    this._ariaTemplate = kendo.template(this.options.ARIATemplate);
                }

                valueForLabel = this.value();

                if (valueForLabel && valueForLabel.indexOf("rgba") > -1) {
                    valueForLabel = valueForLabel.replace("rgba", "RGBA");
                };

                this.wrapper.attr("aria-label", this._ariaTemplate(valueForLabel || ""));
            }
        },
        _selectOnHide: function() {
            return null;
        },
        _cancel: function() {
            this.trigger("cancel");
        }
    });

    function triggerEvent(self, type, color) {
        color = parseColor(color);

        if ((color && !color.equals(self.color())) || color !== self.color()) {
            if (type == "change") {
                // UI is already updated.  setting _value directly
                // rather than calling self.color(color) to avoid an
                // endless loop.
                self._value = color;
                self._updateInput(self._value);
            }
            if (color && color.a != 1) {
                color = color.toCssRgba();
            } else if (color) {
                color = color.toCss();
            }

            self.trigger(type, { value: color });
        }
    }

    extend(ui, {
        colorpicker: {
            ColorSelector: ColorSelector
        }
    });


})(window.kendo.jQuery);

