import "./kendo.core.js";
import "./kendo.floatinglabel.js";
import "./kendo.icons.js";

var __meta__ = {
    id: "textbox",
    name: "TextBox",
    category: "web",
    description: "The TextBox widget enables you to style and provide a floating label functionality to input elements",
    depends: ["core", "floatinglabel", "icons"]
};

(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        ui = kendo.ui,
        isPlainObject = $.isPlainObject,
        NS = ".kendoTextBox",
        CHANGE = "change",
        DISABLED = "disabled",
        READONLY = "readonly",
        INPUT = "k-input-inner",
        INPUT_EV = "input",
        FOCUSED = "k-focus",
        LABELCLASSES = "k-label k-input-label",
        STATEDISABLED = "k-disabled",
        NOCLICKCLASS = "k-no-click",
        ARIA_DISABLED = "aria-disabled";

    var TextBox = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);
            options = $.extend(true, {}, options);

            that.options.value = options.value || that.element.val();
            that.options.readonly = options.readonly !== undefined ? options.readonly : Boolean(that.element.attr("readonly"));
            that.options.enable = options.enable !== undefined ? options.enable : !(Boolean(that.element.attr("disabled")));
            that.options.placeholder = options.placeholder || that.element.attr("placeholder");

            that.value(that.options.value);
            that._wrapper();
            that._label();
            that._editable({
                readonly: that.options.readonly,
                disable: !(that.options.enable)
            });

            that.element
                .addClass(INPUT)
                .attr("placeholder", that.options.placeholder)
                .attr("autocomplete", "off");

            if (options.icon) {
                that._icon();
            }

            kendo.notify(that);
            that._applyCssClasses();
        },

        events: [
            CHANGE,
            INPUT_EV
        ],

        options: {
            name: 'TextBox',
            value: '',
            readonly: false,
            enable: true,
            placeholder: '',
            label: null,
            rounded: "medium",
            size: "medium",
            fillMode: "solid",
            icon: null
        },

        value: function(value) {
            var that = this;

            if (value === undefined) {
                return that._value;
            }

            that._value = value;
            that.element.val(value);

            if (that.floatingLabel) {
                that.floatingLabel.refresh();
            }
        },

        readonly: function(readonly) {
            var that = this;

            this._editable({
                readonly: readonly === undefined ? true : readonly,
                disable: false
            });

            if (that.floatingLabel) {
                that.floatingLabel.readonly(readonly === undefined ? true : readonly);
            }
        },

        enable: function(enable) {
            var that = this;

            this._editable({
                readonly: false,
                disable: !(enable = enable === undefined ? true : enable)
            });

            if (that.floatingLabel) {
                that.floatingLabel.enable(enable = enable === undefined ? true : enable);
            }
        },

        focus: function() {
            var that = this;

            that.element[0].focus();
        },

        destroy: function() {
            var that = this;

            if (that.floatingLabel) {
                that.floatingLabel.destroy();
            }

            that.element.off(NS);
            that.element[0].style.width = "";
            that.element.removeClass(INPUT);
            Widget.fn.destroy.call(that);
        },

        setOptions: function(options) {
            this.destroy();

            if (this._inputLabel) {
                this._inputLabel.remove();
                this._inputLabel = null;
            }

            if (this._floatingLabelContainer) {
                this.floatingLabel.destroy();
                this.floatingLabel = null;
                this.element.unwrap();
                this.element.unwrap();
                this._floatingLabelContainer = null;
            } else {
                this.element.unwrap();
            }

            kendo.deepExtend(this.options, options);
            this.init(this.element, this.options);
        },

        _editable: function(options) {
            var that = this;
            var element = that.element;
            var wrapper = that.wrapper;
            var disable = options.disable;
            var readonly = options.readonly;

            element.off(NS);

            if (!readonly && !disable) {
                element.prop(DISABLED, false)
                       .prop(READONLY, false)
                       .attr(ARIA_DISABLED, false);

                wrapper.removeClass(STATEDISABLED)
                        .removeClass(NOCLICKCLASS);

                element.on("focusin" + NS, that._focusin.bind(that));
                element.on("focusout" + NS, that._focusout.bind(that));
                element.on("change" + NS, that._change.bind(that));
                element.on(INPUT_EV + NS, that._input.bind(that));
            } else {
                element.attr(DISABLED, disable)
                       .attr(READONLY, readonly)
                       .attr(ARIA_DISABLED, disable);

                wrapper.toggleClass(STATEDISABLED, disable)
                        .toggleClass(NOCLICKCLASS, readonly);
            }
        },

        _icon: function() {
            this.wrapper.prepend(kendo.ui.icon({ icon: this.options.icon, iconClass: "k-input-icon" }));
        },

        _input: function(e) {
            var that = this;
            var newValue = that.element.val();

            that.trigger(INPUT_EV, { value: newValue, originalEvent: e });
        },

        _label: function() {
            var that = this;
            var element = that.element;
            var options = that.options;
            var id = element.attr("id");
            var floating;
            var labelText;

            if (options.label !== null) {
                floating = isPlainObject(options.label) ? options.label.floating : false;
                labelText = isPlainObject(options.label) ? options.label.content : options.label;

                if (floating) {
                    that._floatingLabelContainer = that.wrapper.wrap("<span></span>").parent();
                    that.floatingLabel = new kendo.ui.FloatingLabel(that._floatingLabelContainer, { widget: that });
                }

                if (kendo.isFunction(labelText)) {
                    labelText = labelText.call(that);
                }

                if (!labelText) {
                    labelText = "";
                }

                if (!id) {
                    id = options.name + "_" + kendo.guid();
                    element.attr("id", id);
                }

                that._inputLabel = $("<label class='" + LABELCLASSES + "' for='" + id + "'>" + labelText + "</label>'").insertBefore(that.wrapper);
            }
        },

        _focusin: function() {
            var that = this;

            that.wrapper.addClass(FOCUSED);
        },

        _focusout: function() {
            var that = this;

            that.wrapper.removeClass(FOCUSED);
        },

        _change: function(e) {
            var that = this;
            var newValue = that.element.val();

            that._value = newValue;

            that.trigger(CHANGE, { value: newValue, originalEvent: e });
        },

        _wrapper: function() {
            var that = this;
            var element = that.element;
            var DOMElement = element[0];
            var wrapper;

            wrapper = element.wrap("<span class='k-input k-textbox'></span>").parent();
            wrapper[0].style.cssText = DOMElement.style.cssText;
            DOMElement.style.width = "100%";
            that.wrapper = wrapper.addClass(DOMElement.className).removeClass('input-validation-error');
        }
    });

    kendo.cssProperties.registerPrefix("TextBox", "k-input-");

    kendo.cssProperties.registerValues("TextBox", [{
        prop: "rounded",
        values: kendo.cssProperties.roundedValues.concat([['full', 'full']])
    }]);

    ui.plugin(TextBox);
})(window.kendo.jQuery);

