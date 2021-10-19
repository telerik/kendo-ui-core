(function(f, define){
    define([
        "./kendo.core",
        "./kendo.color",
        "./kendo.popup",
        "./kendo.slider",
        "./kendo.userevents",
        "./kendo.button",
        "./kendo.binder",
        "./kendo.textbox",
        "./kendo.numerictextbox",

        "./colorpicker/colorselector",
        "./colorpicker/colorgradient",
        "./colorpicker/colorpalette",
        "./colorpicker/flatcolorpicker"
    ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "colorpicker",
    name: "Color tools",
    category: "web",
    description: "Color selection widgets",
    depends: [ "core", "color", "popup", "slider", "userevents", "button", "binder", "textbox", "numerictextbox" ]
};

(function($, undefined){
    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /*jshint eqnull:true  */
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        parseColor = kendo.parseColor,
        KEYS = kendo.keys,
        BACKGROUNDCOLOR = "background-color",
        WHITE = "#ffffff",
        MESSAGES = {
            apply  : "Apply",
            cancel : "Cancel",
            noColor: "no color",
            clearColor: "Clear color",
            previewInput: "Color Hexadecimal Code",
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
        ColorSelector = ui.colorpicker.ColorSelector;

    /* -----[ The ColorPicker widget ]----- */

    var ColorPicker = Widget.extend({
        init: function(element, options) {
            var that = this;

            // Legacy support for the cases where only palette is defined
            if(options && options.palette && !options.view){
                options.view ="palette";
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

            var content = that.wrapper = $(that._template(options));
            element.hide().after(content);

            that._inputWrapper = $(that.wrapper[0].firstChild);

            if (element.is("input")) {
                element.appendTo(content);

                // if there exists a <label> associated with this
                // input field, we must catch clicks on it to prevent
                // the built-in color picker from showing up.
                // https://github.com/telerik/kendo-ui-core/issues/292

                var label = element.closest("label");
                var id = element.attr("id");
                if (id) {
                    label = label.add('label[for="' + id + '"]');
                }
                label.on("click", function(ev){
                    that.open();
                    ev.preventDefault();
                });
            }

            that._tabIndex = element.attr("tabIndex") || 0;

            that.enable(!element.attr("disabled"));

            var accesskey = element.attr("accesskey");
            if (accesskey) {
                element.attr("accesskey", null);
                content.attr("accesskey", accesskey);
            }

            that.bind("activate", function(ev){
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
                innerWrapper = wrapper.children(".k-picker-wrap"),
                arrow = innerWrapper.find(".k-select");

            if (arguments.length === 0) {
                enable = true;
            }

            that.element.attr("disabled", !enable);
            wrapper.attr("aria-disabled", !enable);

            arrow.off(NS).on("mousedown" + NS, preventDefault);

            wrapper.addClass("k-state-disabled")
                .removeAttr("tabIndex")
                .add("*", wrapper).off(NS);

            if (enable) {
                wrapper.removeClass("k-state-disabled")
                    .attr("tabIndex", that._tabIndex)
                    .on("mouseenter" + NS, function () { innerWrapper.addClass("k-state-hover"); })
                    .on("mouseleave" + NS, function () { innerWrapper.removeClass("k-state-hover"); })
                    .on("focus" + NS, function () { innerWrapper.addClass("k-state-focused"); })
                    .on("blur" + NS, function () { innerWrapper.removeClass("k-state-focused"); })
                    .on(KEYDOWN_NS, bind(that._keydown, that))
                    .on(CLICK_NS, ".k-select", bind(that.toggle, that))
                    .on(CLICK_NS, that.options.toolIcon ? ".k-tool-icon" : ".k-selected-color", function () {
                        that.trigger("activate");
                    });
            } else {
                that.close();
            }
        },

        _template: kendo.template(
            '<div role="textbox" aria-haspopup="true" class="k-colorpicker">' +
                '<span  class="k-picker-wrap">' +
                    '# if (toolIcon) { #' +
                        '<span class="k-icon k-tool-icon #= toolIcon #">' +
                            '<span class="k-selected-color"></span>' +
                        '</span>' +
                    '# } else { #' +
                        '<span class="k-selected-color"></span>' +
                    '# } #' +
                    '<span role="button" class="k-select" unselectable="on" aria-label="select">' +
                        '<span class="k-icon k-i-arrow-s"></span>' +
                    '</span>' +
                '</span >' +
            '</div>'
        ),

        options: {
            name: "ColorPicker",
            palette: null,
            columns: 10,
            toolIcon: null,
            value: null,
            messages: MESSAGES,
            opacity: false,
            buttons: true,
            preview: true,
            clearButton: false,
            input      : true,
            format: "hex",
            formats: ["rgb", "hex"],
            view: "gradient",
            views: ["gradient", "palette"],
            backgroundColor: null,
            ARIATemplate: 'Current selected color is #=data || ""#'
        },

        events: [ "activate", "change", "select", "open", "close" ],

        open: function () {
            if (!this.element.prop("disabled")) {
                this._getPopup().open();
            }
        },
        close: function () {
            var selOptions = (this._selector && this._selector.options) || {};
            selOptions._closing = true;
            this._getPopup().close();

            delete selOptions._closing;
        },
        toggle: function () {
            if (!this.element.prop("disabled")) {
                this._getPopup().toggle();
            }
        },
        setBackgroundColor: function (color) {
            var that = this;

            that.options.backgroundColor = color;
            that._selector.setBackgroundColor(color);
        },
        _noColorIcon: function(){
            return this.wrapper.find(".k-picker-wrap > .k-selected-color");
        },
        color: ColorSelector.fn.color,
        value: ColorSelector.fn.value,
        _select: ColorSelector.fn._select,
        _triggerSelect: ColorSelector.fn._triggerSelect,
        _isInputTypeColor: function() {
            var el = this.element[0];
            return (/^input$/i).test(el.tagName) && (/^color$/i).test(el.type);
        },

        _updateUI: function(value) {
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

            this._triggerSelect(value);
            this.wrapper.find(".k-selected-color").css(
                BACKGROUNDCOLOR,
                value ? value.toDisplay() : WHITE
            );

            this._noColorIcon().toggleClass("k-no-color", !formattedValue);
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

                selectorType = ui.FlatColorPicker;

                options._standalone = false;
                options.autoupdate = options.buttons !== true;
                delete options.select;
                delete options.change;
                delete options.cancel;

                var id = kendo.guid();
                var selectorWrapper = $('<div id="' + id +'" class="k-colorpicker-popup"></div>').appendTo(document.body);
                var selector = that._selector = new selectorType($('<div></div>').appendTo(selectorWrapper), options);

                that.wrapper.attr("aria-owns", id);

                that._popup = popup = selectorWrapper.kendoPopup({
                    anchor: that.wrapper,
                    adjustSize: { width: 5, height: 0 }
                }).data("kendoPopup");

                selector.bind({
                    select: function(ev){
                        that._updateUI(parseColor(ev.value));
                    },
                    change: function(){
                        that._select(selector.color());
                        that.close();
                    },
                    cancel: function() {
                        if (selector.options._clearedColor && !that.value() && selector.value()) {
                            that._select(selector.color(), true);
                        }
                        that.close();
                    }
                });
                popup.bind({
                    close: function(ev){
                        if (that.trigger("close")) {
                            ev.preventDefault();
                            return;
                        }
                        that.wrapper.children(".k-picker-wrap").removeClass("k-state-focused");
                        var color = selector._selectOnHide();
                        var selectorColor = selector.value();
                        var value = that.value();
                        var options = selector.options;
                        if (!color) {
                            setTimeout(function(){
                                if (that.wrapper && !that.wrapper.is("[unselectable='on']")) {
                                    that.wrapper.trigger("focus");
                                }
                            });

                            if (!options._closing && options._clearedColor && !value && selectorColor) {
                                that._select(selectorColor, true);
                            } else {
                                that._updateUI(that.color());
                            }
                        } else if (!(options._clearedColor && !value)) {
                            that._select(color);
                        }
                    },
                    open: function(ev) {
                        if (that.trigger("open")) {
                            ev.preventDefault();
                        } else {
                            that.wrapper.children(".k-picker-wrap").addClass("k-state-focused");
                        }
                    },
                    activate: function(){
                        selector.focus();
                        that.wrapper.children(".k-picker-wrap").addClass("k-state-focused");
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

})(jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
