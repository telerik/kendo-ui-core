(function(f, define){
    define([
        "./colorgradient",
        "./colorpalette",
        "../kendo.html.button"
    ], f);
})(function(){

(function($, undefined){
    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /*jshint eqnull:true  */
    var kendo = window.kendo,
        ui = kendo.ui,
        html = kendo.html,
        Color = kendo.Color,
        extend = $.extend,
        BACKGROUNDCOLOR = "background-color",
        MESSAGES = {
            apply  : "Apply",
            cancel : "Cancel",
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
        KEYS = kendo.keys,

        NO_COLOR = "k-no-color",
        SELECTED = "k-selected",
        PREVIEW_MASK = ".k-color-preview-mask",

        VIEWS = {
            "gradient": ui.ColorGradient,
            "palette": ui.ColorPalette
        };

    function bind(callback, obj) {
        return function() {
            return callback.apply(obj, arguments);
        };
    }

    var FlatColorPicker = ColorSelector.extend({
        init: function(element, options) {
            var that = this;

            if (options && options.autoupdate === false) {
                options._standalone = false;
            }

            ColorSelector.fn.init.call(that, element, options);
            options = that.options = kendo.deepExtend({}, that.options, options);
            element = that.element;

            that.wrapper = element.addClass("k-flatcolorpicker k-coloreditor")
                .append(that._template());

            that._selectedColor = $(".k-coloreditor-preview-color", element);
            that._previousColor = $(".k-coloreditor-current-color", element);
            that._viewsContainer = $(".k-coloreditor-views", element);

            element.find(".k-button[data-view=" + that.options.view + "]").addClass(SELECTED);

            var value = that.color();

            that._changeView(options.view);

            that._setViewSize();

            if (value) {
                that._updateUI(value);
                that._previousColor.children(PREVIEW_MASK).css(BACKGROUNDCOLOR, value.toDisplay());
                that._selectedColor.children(PREVIEW_MASK).css(BACKGROUNDCOLOR, value.toDisplay());
            } else {
                that._selectedColor.addClass(NO_COLOR);
                that._previousColor.addClass(NO_COLOR);
            }

            element
                .on(KEYDOWN_NS, bind(that._keydown, that))
                .on(CLICK_NS, ".k-coloreditor-reset", function () {
                    that._clearColor = true;
                    that._updateUI(null);
                    that._view.value(null);
                })
                .on(CLICK_NS, ".k-coloreditor-apply", function(){
                    if(that._clearColor) {
                        that._select(null);
                    } else {
                        that._select(that._view.color());
                    }
                })
                .on(CLICK_NS, ".k-coloreditor-cancel", function(){
                    delete that._clearColor;
                    that._updateUI(that.color());
                    that._cancel();
                })
                .on(CLICK_NS, ".k-button[data-view]", function(ev){
                    var viewButton =  $(ev.target).closest("[data-view]");

                    if(viewButton.is("." + SELECTED)) {
                        return;
                    }

                    element.find(".k-button[data-view]").removeClass(SELECTED);
                    viewButton.addClass(SELECTED);
                    that._changeView(viewButton.data("view"));
                });
        },
        destroy: function() {
            var that = this;

            ColorSelector.fn.destroy.call(this);

            if (that._view) {
                that._view.destroy();
                that._viewsContainer.empty();
            }

            that.element.off(NS);

            that._selectedColor = that._previousColor = that._viewsContainer = that._view = null;
        },
        options: {
            name: "FlatColorPicker",
            opacity: false,
            buttons: false,
            input: true,
            preview: true,
            clearButton: false,
            format: "hex",
            formats: ["rgb", "hex"],
            view: "gradient",
            views: ["gradient", "palette"],
            palette: null,
            autoupdate : true,
            backgroundColor: null,
            columns: 10,
            tileSize: 24,
            messages   : MESSAGES,
            size: "medium" // Fake styling option to accomplish colorpicker's size for textbox and button
        },
        setBackgroundColor: function (color) {
            var that = this;

            if(that._view && that._view.setBackgroundColor) {
                that._view.setBackgroundColor(color);
            }
        },
        _select: function(value) {
            var that = this;

            ColorSelector.fn._select.call(that, value);

            that._updatePreviousColor(value);
        },
        _updatePreviousColor: function (value) {
            var that = this;

            if (value) {
                that._previousColor.removeClass(NO_COLOR);
                that._previousColor.children(PREVIEW_MASK).css(BACKGROUNDCOLOR, value.toDisplay());
            } else {
                that._previousColor.addClass(NO_COLOR);
                that._previousColor.children(PREVIEW_MASK).css(BACKGROUNDCOLOR, "");
            }
        },
        _changeView: function (mode) {
            var that = this,
                options = $.extend({}, that.options),
                selector =  VIEWS[mode],
                selectedColor, hsvColor;

            if(that._view && that._view._colorInput) {
                that.options.format = that._view._colorInput._viewModel.format;
            }

            that.options.view = mode;

            delete options.name;
            delete options.change;
            delete options.select;
            delete options.cancel;
            delete options._standalone;

            if (that._view) {
                selectedColor = that._view.color();
                that._view.destroy();
                that._viewsContainer.empty();
            }

            if (selectedColor) {
                selectedColor = selectedColor.toHSV();
                hsvColor = Color.fromHSV(that._cachedHue || 0, selectedColor.s, selectedColor.v, selectedColor.a);
                that._cachedHue = selectedColor.toHSV().h;
                selectedColor = selectedColor.equals(hsvColor) ? hsvColor : selectedColor;
            }

            if (selector) {
                that._view = new VIEWS[mode]($("<div></div>").appendTo(that._viewsContainer), options);
                that._view.value(selectedColor);

                that._view.bind("change", function (ev) {
                    delete that._clearColor;
                    that._updateUI(ev.sender.color(), true);
                });

                that._view.bind("forceSelect", function (ev) {
                    delete that._clearColor;
                    that._select(ev.sender.color());
                });
            }
        },
        _onEnable: function(enable) {
            var that = this;

            if (that._view) {
                that._view._onEnable(enable);
            }
        },
        focus: function() {
            var that = this;

            if (that._view) {
                that._view.focus();
            }
        },
        _updateUI: function(color, dontChangeView) {
            var that = this;

            if (color && color.toDisplay) {
                that._selectedColor.removeClass(NO_COLOR);
                that._selectedColor.children(PREVIEW_MASK).css(BACKGROUNDCOLOR, color.toDisplay());
            } else {
                that._selectedColor.addClass(NO_COLOR);
                that._selectedColor.children(PREVIEW_MASK).css(BACKGROUNDCOLOR, "");
            }

            that._triggerSelect(color);

            if (that.options.autoupdate) {
                that._updatePreviousColor(color);
            }

            if(!dontChangeView) {
                that._view.value(color);
            }
        },
        _setViewSize: function() {
            var that = this,
                wrapper = that.wrapper[0],
                previewWidth = parseInt((that.options.tileSize.width || that.options.tileSize), 10),
                previewHeight = parseInt((that.options.tileSize.width || that.options.tileSize), 10),
                previewColumns = that.options.columns;

            wrapper.style.setProperty("--kendo-color-preview-columns", previewColumns);
            wrapper.style.setProperty("--kendo-color-preview-width", previewWidth + "px");
            wrapper.style.setProperty("--kendo-color-preview-height", previewHeight + "px");
        },
        _keydown: function(e) {

            if (e.keyCode == KEYS.ESC) {
                this._cancel();
            }
        },
        _template: function () {
            var that = this,
                options = that.options,
                buttonOptions = extend({}, options, {
                    fillMode: "flat",
                    themeColor: "base",
                    rounded: "medium"
                });

            return kendo.template(
                    '<div class="k-coloreditor-header k-hstack">' +
                        '# if (views && views.length > 1) { #' +
                        '<div class="k-coloreditor-header-actions k-hstack">' +
                            '<div class="k-button-group k-button-group-flat">' +
                                html.renderButton('<button  data-view="gradient" title="#:messages.gradient#"></button>', extend({ icon: "color-canvas" }, buttonOptions)) +
                                html.renderButton('<button  data-view="palette" title="#:messages.palette#"></button>', extend({ icon: "palette" }, buttonOptions)) +
                            '</div>' +
                        '</div>' +
                        '# } #' +
                        '<div class="k-spacer"></div>' +
                        '<div class="k-coloreditor-header-actions k-hstack">' +
                            '# if (clearButton) { #' +
                            html.renderButton('<button class="k-coloreditor-reset" title="#:messages.clearColor#"></button>', extend({ icon: "reset-color" }, buttonOptions)) +
                            '# } #' +
                            '# if (preview) { #' +
                            '<div class="k-coloreditor-preview k-vstack">' +
                                '<span class="k-coloreditor-preview-color k-color-preview">' +
                                    '<span class="k-color-preview-mask"></span>' +
                                '</span>' +
                                '<span class="k-coloreditor-current-color k-color-preview">' +
                                    '<span class="k-color-preview-mask"></span>' +
                                '</span>' +
                            '</div>' +
                            '# } #' +
                        '</div>' +
                    '</div>' +
                    '<div class="k-coloreditor-views k-vstack"></div>' +
                    '# if (buttons) { #' +
                    '<div class="k-coloreditor-footer k-actions k-hstack k-justify-content-end">' +
                        html.renderButton('<button class="k-coloreditor-cancel" title="#:messages.cancel#">#: messages.cancel #</button>', extend({}, buttonOptions, { fillMode: "solid" })) +
                        html.renderButton('<button class="k-coloreditor-apply" title="#:messages.apply#">#: messages.apply #</button>', extend({}, buttonOptions, { fillMode: "solid", themeColor: "primary" })) +
                    '</div>' +
                    '# } #'
                )(options);
            }
    });

    ui.plugin(FlatColorPicker);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
