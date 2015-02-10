(function(f, define){
    define([ "./kendo.core", "./kendo.color", "./kendo.popup", "./kendo.slider", "./kendo.userevents" ], f);
})(function(){

var __meta__ = {
    id: "colorpicker",
    name: "Color tools",
    category: "web",
    description: "Color selection widgets",
    depends: [ "core", "color", "popup", "slider", "userevents" ]
};

(function($, parseInt, undefined){
    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /*jshint eqnull:true  */
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        parseColor = kendo.parseColor,
        Color = kendo.Color,
        KEYS = kendo.keys,
        BACKGROUNDCOLOR = "background-color",
        ITEMSELECTEDCLASS = "k-state-selected",
        SIMPLEPALETTE = "000000,7f7f7f,880015,ed1c24,ff7f27,fff200,22b14c,00a2e8,3f48cc,a349a4,ffffff,c3c3c3,b97a57,ffaec9,ffc90e,efe4b0,b5e61d,99d9ea,7092be,c8bfe7",
        WEBPALETTE = "FFFFFF,FFCCFF,FF99FF,FF66FF,FF33FF,FF00FF,CCFFFF,CCCCFF,CC99FF,CC66FF,CC33FF,CC00FF,99FFFF,99CCFF,9999FF,9966FF,9933FF,9900FF,FFFFCC,FFCCCC,FF99CC,FF66CC,FF33CC,FF00CC,CCFFCC,CCCCCC,CC99CC,CC66CC,CC33CC,CC00CC,99FFCC,99CCCC,9999CC,9966CC,9933CC,9900CC,FFFF99,FFCC99,FF9999,FF6699,FF3399,FF0099,CCFF99,CCCC99,CC9999,CC6699,CC3399,CC0099,99FF99,99CC99,999999,996699,993399,990099,FFFF66,FFCC66,FF9966,FF6666,FF3366,FF0066,CCFF66,CCCC66,CC9966,CC6666,CC3366,CC0066,99FF66,99CC66,999966,996666,993366,990066,FFFF33,FFCC33,FF9933,FF6633,FF3333,FF0033,CCFF33,CCCC33,CC9933,CC6633,CC3333,CC0033,99FF33,99CC33,999933,996633,993333,990033,FFFF00,FFCC00,FF9900,FF6600,FF3300,FF0000,CCFF00,CCCC00,CC9900,CC6600,CC3300,CC0000,99FF00,99CC00,999900,996600,993300,990000,66FFFF,66CCFF,6699FF,6666FF,6633FF,6600FF,33FFFF,33CCFF,3399FF,3366FF,3333FF,3300FF,00FFFF,00CCFF,0099FF,0066FF,0033FF,0000FF,66FFCC,66CCCC,6699CC,6666CC,6633CC,6600CC,33FFCC,33CCCC,3399CC,3366CC,3333CC,3300CC,00FFCC,00CCCC,0099CC,0066CC,0033CC,0000CC,66FF99,66CC99,669999,666699,663399,660099,33FF99,33CC99,339999,336699,333399,330099,00FF99,00CC99,009999,006699,003399,000099,66FF66,66CC66,669966,666666,663366,660066,33FF66,33CC66,339966,336666,333366,330066,00FF66,00CC66,009966,006666,003366,000066,66FF33,66CC33,669933,666633,663333,660033,33FF33,33CC33,339933,336633,333333,330033,00FF33,00CC33,009933,006633,003333,000033,66FF00,66CC00,669900,666600,663300,660000,33FF00,33CC00,339900,336600,333300,330000,00FF00,00CC00,009900,006600,003300,000000",
        APPLY_CANCEL = {
            apply  : "Apply",
            cancel : "Cancel"
        },
        NS = ".kendoColorTools",
        CLICK_NS = "click" + NS,
        KEYDOWN_NS = "keydown" + NS,

        browser = kendo.support.browser,
        isIE8 = browser.msie && browser.version < 9;

    var ColorSelector = Widget.extend({
        init: function(element, options) {
            var that = this, ariaId;

            Widget.fn.init.call(that, element, options);
            element = that.element;
            options = that.options;
            that._value = options.value = parseColor(options.value);
            that._tabIndex = element.attr("tabIndex") || 0;

            ariaId = that._ariaId = options.ariaId;
            if (ariaId) {
                element.attr("aria-labelledby", ariaId);
            }

            if (options._standalone) {
                that._triggerSelect = that._triggerChange;
            }
        },
        options: {
            name: "ColorSelector",
            value: null,
            _standalone: true
        },
        events: [
            "change",
            "select",
            "cancel"
        ],
        color: function(value) {
            if (value !== undefined) {
                this._value = parseColor(value);
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
            $(".k-disabled-overlay", this.wrapper).remove();
            if (!enable) {
                this.wrapper.append("<div class='k-disabled-overlay'></div>");
            }
            this._onEnable(enable);
        },
        _select: function(color, nohooks) {
            var prev = this._value;
            color = this.color(color);
            if (!nohooks) {
                this.element.trigger("change");
                if (!color.equals(prev)) {
                    this.trigger("change", { value: this.value() });
                } else if (!this._standalone) {
                    this.trigger("cancel");
                }
            }
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
                this.wrapper.off(NS).find("*").off(NS);
            }
            this.wrapper = null;
            Widget.fn.destroy.call(this);
        },
        _updateUI: $.noop,
        _selectOnHide: function() {
            return null;
        },
        _cancel: function() {
            this.trigger("cancel");
        }
    });

    function triggerEvent(self, type, color) {
        color = parseColor(color);
        if (color && !color.equals(self.color())) {
            if (type == "change") {
                // UI is already updated.  setting _value directly
                // rather than calling self.color(color) to avoid an
                // endless loop.
                self._value = color;
            }
            if (color.a != 1) {
                color = color.toCssRgba();
            } else {
                color = color.toCss();
            }
            self.trigger(type, { value: color });
        }
    }

    var ColorPalette = ColorSelector.extend({
        init: function(element, options) {
            var that = this;
            ColorSelector.fn.init.call(that, element, options);
            element = that.wrapper = that.element;
            options = that.options;
            var colors = options.palette;

            if (colors == "websafe") {
                colors = WEBPALETTE;
                options.columns = 18;
            } else if (colors == "basic") {
                colors = SIMPLEPALETTE;
            }

            if (typeof colors == "string") {
                colors = colors.split(",");
            }

            if ($.isArray(colors)) {
                colors = $.map(colors, function(x) { return parseColor(x); });
            }

            that._selectedID = (options.ariaId || kendo.guid()) + "_selected";

            element.addClass("k-widget k-colorpalette")
                .attr("role", "grid")
                .attr("aria-readonly", "true")
                .append($(that._template({
                    colors   : colors,
                    columns  : options.columns,
                    tileSize : options.tileSize,
                    value    : that._value,
                    id       : options.ariaId
                })))
                .on(CLICK_NS, ".k-item", function(ev){
                    that._select($(ev.currentTarget).css(BACKGROUNDCOLOR));
                })
                .attr("tabIndex", that._tabIndex)
                .on(KEYDOWN_NS, bind(that._keydown, that));

            var tileSize = options.tileSize, width, height;
            if (tileSize) {
                if (/number|string/.test(typeof tileSize)) {
                    width = height = parseFloat(tileSize);
                } else if (typeof tileSize == "object") {
                    width = parseFloat(tileSize.width);
                    height = parseFloat(tileSize.height);
                } else {
                    throw new Error("Unsupported value for the 'tileSize' argument");
                }
                element.find(".k-item").css({ width: width, height: height });
            }
        },
        focus: function(){
            this.wrapper.focus();
        },
        options: {
            name: "ColorPalette",
            columns: 10,
            tileSize: null,
            palette: "basic"
        },
        _onEnable: function(enable) {
            if (enable) {
                this.wrapper.attr("tabIndex", this._tabIndex);
            } else {
                this.wrapper.removeAttr("tabIndex");
            }
        },
        _keydown: function(e) {
            var selected,
                wrapper = this.wrapper,
                items = wrapper.find(".k-item"),
                current = items.filter("." + ITEMSELECTEDCLASS).get(0),
                keyCode = e.keyCode;

            if (keyCode == KEYS.LEFT) {
                selected = relative(items, current, -1);
            } else if (keyCode == KEYS.RIGHT) {
                selected = relative(items, current, 1);
            } else if (keyCode == KEYS.DOWN) {
                selected = relative(items, current, this.options.columns);
            } else if (keyCode == KEYS.UP) {
                selected = relative(items, current, -this.options.columns);
            } else if (keyCode == KEYS.ENTER) {
                preventDefault(e);
                if (current) {
                    this._select($(current).css(BACKGROUNDCOLOR));
                }
            } else if (keyCode == KEYS.ESC) {
                this._cancel();
            }

            if (selected) {
                preventDefault(e);

                this._current(selected);

                try {
                    var color = parseColor(selected.css(BACKGROUNDCOLOR));
                    this._triggerSelect(color);
                } catch(ex) {}
            }
        },
        _current: function(item) {
            this.wrapper.find("." + ITEMSELECTEDCLASS)
                .removeClass(ITEMSELECTEDCLASS)
                .attr("aria-selected", false)
                .removeAttr("id");

            $(item)
                .addClass(ITEMSELECTEDCLASS)
                .attr("aria-selected", true)
                .attr("id", this._selectedID);

            this.element
                .removeAttr("aria-activedescendant")
                .attr("aria-activedescendant", this._selectedID);
        },
        _updateUI: function(color) {
            var item = null;

            this.wrapper.find(".k-item").each(function(){
                var c = parseColor($(this).css(BACKGROUNDCOLOR));

                if (c && c.equals(color)) {
                    item = this;

                    return false;
                }
            });

            this._current(item);
        },
        _template: kendo.template(
            '<table class="k-palette k-reset" role="presentation"><tr role="row">' +
              '# for (var i = 0; i < colors.length; ++i) { #' +
                '# var selected = colors[i].equals(value); #' +
                '# if (i && i % columns == 0) { # </tr><tr role="row"> # } #' +
                '<td role="gridcell" unselectable="on" style="background-color:#= colors[i].toCss() #"' +
                    '#= selected ? " aria-selected=true" : "" # ' +
                    '#=(id && i === 0) ? "id=\\""+id+"\\" " : "" # ' +
                    'class="k-item#= selected ? " ' + ITEMSELECTEDCLASS + '" : "" #" ' +
                    'aria-label="#= colors[i].toCss() #"></td>' +
              '# } #' +
            '</tr></table>'
        )
    });

    var FlatColorPicker = ColorSelector.extend({
        init: function(element, options) {
            var that = this;
            ColorSelector.fn.init.call(that, element, options);
            options = that.options;
            element = that.element;

            that.wrapper = element.addClass("k-widget k-flatcolorpicker")
                .append(that._template(options));

            that._hueElements = $(".k-hsv-rectangle, .k-transparency-slider .k-slider-track", element);

            that._selectedColor = $(".k-selected-color-display", element);

            that._colorAsText = $("input.k-color-value", element);

            that._sliders();

            that._hsvArea();

            that._updateUI(that._value || parseColor("#f00"));

            element
                .find("input.k-color-value").on(KEYDOWN_NS, function(ev){
                    var input = this;
                    if (ev.keyCode == KEYS.ENTER) {
                        try {
                            var color = parseColor(input.value);
                            var val = that.color();
                            that._select(color, color.equals(val));
                        } catch(ex) {
                            $(input).addClass("k-state-error");
                        }
                    } else if (that.options.autoupdate) {
                        setTimeout(function(){
                            var color = parseColor(input.value, true);
                            if (color) {
                                that._updateUI(color, true);
                            }
                        }, 10);
                    }
                }).end()

                .on(CLICK_NS, ".k-controls button.apply", function(){
                    // calling select for the currently displayed
                    // color will trigger the "change" event.
                    that._select(that._getHSV());
                })
                .on(CLICK_NS, ".k-controls button.cancel", function(){
                    // but on cancel, we simply select the previous
                    // value (again, triggers "change" event).
                    that._updateUI(that.color());
                    that._cancel();
                });

            if (isIE8) {
                // IE filters require absolute URLs
                that._applyIEFilter();
            }
        },
        destroy: function() {
            this._hueSlider.destroy();
            if (this._opacitySlider) {
                this._opacitySlider.destroy();
            }
            this._hueSlider = this._opacitySlider = this._hsvRect = this._hsvHandle =
                this._hueElements = this._selectedColor = this._colorAsText = null;
            ColorSelector.fn.destroy.call(this);
        },
        options: {
            name       : "FlatColorPicker",
            opacity    : false,
            buttons    : false,
            input      : true,
            preview    : true,
            autoupdate : true,
            messages   : APPLY_CANCEL
        },
        _applyIEFilter: function() {
            var track = this.element.find(".k-hue-slider .k-slider-track")[0],
                url = track.currentStyle.backgroundImage;

            url = url.replace(/^url\([\'\"]?|[\'\"]?\)$/g, "");
            track.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + url + "', sizingMethod='scale')";
        },
        _sliders: function() {
            var that = this,
                element = that.element;

            function hueChange(e) {
                that._updateUI(that._getHSV(e.value, null, null, null));
            }

            that._hueSlider = element.find(".k-hue-slider").kendoSlider({
                min: 0,
                max: 359,
                tickPlacement: "none",
                showButtons: false,
                slide: hueChange,
                change: hueChange
            }).data("kendoSlider");

            function opacityChange(e) {
                that._updateUI(that._getHSV(null, null, null, e.value / 100));
            }

            that._opacitySlider = element.find(".k-transparency-slider").kendoSlider({
                min: 0,
                max: 100,
                tickPlacement: "none",
                showButtons: false,
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
                that.wrapper.find("input.k-color-value").focus().select();
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
            var rect = this._hsvRect,
                width = rect.width(),
                height = rect.height(),
                handlePosition = this._hsvHandle.position();

            if (h == null) {
                h = this._hueSlider.value();
            }
            if (s == null) {
                s = handlePosition.left / width;
            }
            if (v == null) {
                v = 1 - handlePosition.top / height;
            }
            if (a == null) {
                a = this._opacitySlider ? this._opacitySlider.value() / 100 : 1;
            }
            return Color.fromHSV(h, s, v, a);
        },
        _svChange: function(s, v) {
            var color = this._getHSV(null, s, v, null);
            this._updateUI(color);
        },
        _updateUI: function(color, dontChangeInput) {
            var that = this,
                rect = that._hsvRect;

            if (!color) {
                return;
            }

            this._colorAsText.removeClass("k-state-error");

            that._selectedColor.css(BACKGROUNDCOLOR, color.toDisplay());
            if (!dontChangeInput) {
                that._colorAsText.val(that._opacitySlider ? color.toCssRgba() : color.toCss());
            }
            that._triggerSelect(color);

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
                that._opacitySlider.value(100 * color.a);
            }
        },
        _selectOnHide: function() {
            return this.options.buttons ? null : this._getHSV();
        },
        _template: kendo.template(
            '# if (preview) { #' +
                '<div class="k-selected-color"><div class="k-selected-color-display"><input class="k-color-value" #= !data.input ? \'style=\"visibility: hidden;\"\' : \"\" #></div></div>' +
            '# } #' +
            '<div class="k-hsv-rectangle"><div class="k-hsv-gradient"></div><div class="k-draghandle"></div></div>' +
            '<input class="k-hue-slider" />' +
            '# if (opacity) { #' +
                '<input class="k-transparency-slider" />' +
            '# } #' +
            '# if (buttons) { #' +
                '<div unselectable="on" class="k-controls"><button class="k-button k-primary apply">#: messages.apply #</button> <button class="k-button cancel">#: messages.cancel #</button></div>' +
            '# } #'
        )
    });

    function relative(array, element, delta) {
        array = Array.prototype.slice.call(array);
        var n = array.length;
        var pos = array.indexOf(element);
        if (pos < 0) {
            return delta < 0 ? array[n - 1] : array[0];
        }
        pos += delta;
        if (pos < 0) {
            pos += n;
        } else {
            pos %= n;
        }
        return array[pos];
    }

    /* -----[ The ColorPicker widget ]----- */

    var ColorPicker = Widget.extend({
        init: function(element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);
            options = that.options;
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
                label.click(function(ev){
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
                icon = innerWrapper.find(".k-select");

            if (arguments.length === 0) {
                enable = true;
            }

            that.element.attr("disabled", !enable);
            wrapper.attr("aria-disabled", !enable);

            icon.off(NS).on("mousedown" + NS, preventDefault);

            wrapper.addClass("k-state-disabled")
                .removeAttr("tabIndex")
                .add("*", wrapper).off(NS);

            if (enable) {
                wrapper.removeClass("k-state-disabled")
                    .attr("tabIndex", that._tabIndex)
                    .on("mouseenter" + NS, function() { innerWrapper.addClass("k-state-hover"); })
                    .on("mouseleave" + NS, function() { innerWrapper.removeClass("k-state-hover"); })
                    .on("focus" + NS, function () { innerWrapper.addClass("k-state-focused"); })
                    .on("blur" + NS, function () { innerWrapper.removeClass("k-state-focused"); })
                    .on(KEYDOWN_NS, bind(that._keydown, that))
                    .on(CLICK_NS, ".k-icon", bind(that.toggle, that))
                    .on(CLICK_NS, that.options.toolIcon ? ".k-tool-icon" : ".k-selected-color", function(){
                        that.trigger("activate");
                    });
            }
        },

        _template: kendo.template(
            '<span role="textbox" aria-haspopup="true" class="k-widget k-colorpicker k-header">' +
                '<span class="k-picker-wrap k-state-default">' +
                    '# if (toolIcon) { #' +
                        '<span class="k-tool-icon #= toolIcon #">' +
                            '<span class="k-selected-color"></span>' +
                        '</span>' +
                    '# } else { #' +
                        '<span class="k-selected-color"></span>' +
                    '# } #' +
                    '<span class="k-select" unselectable="on">' +
                        '<span class="k-icon k-i-arrow-s" unselectable="on"></span>' +
                    '</span>' +
                '</span>' +
            '</span>'
        ),

        options: {
            name: "ColorPicker",
            palette: null,
            columns: 10,
            toolIcon: null,
            value: null,
            messages: APPLY_CANCEL,
            opacity: false,
            buttons: true,
            preview: true,
            ARIATemplate: 'Current selected color is #=data || ""#'
        },

        events: [ "activate", "change", "select", "open", "close" ],

        open: function() {
            this._getPopup().open();
        },
        close: function() {
            this._getPopup().close();
        },
        toggle: function() {
            this._getPopup().toggle();
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
                value ? value.toDisplay() : "transparent"
            );
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

                if (options.palette) {
                    selectorType = ColorPalette;
                } else {
                    selectorType = FlatColorPicker;
                }

                options._standalone = false;
                delete options.select;
                delete options.change;
                delete options.cancel;

                var id = kendo.guid();
                var selector = that._selector = new selectorType($('<div id="' + id +'"/>').appendTo(document.body), options);

                that.wrapper.attr("aria-owns", id);

                that._popup = popup = selector.wrapper.kendoPopup({
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
                        if (!color) {
                            that.wrapper.focus();
                            that._updateUI(that.color());
                        } else {
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
                        selector._select(that.color(), true);
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

    ui.plugin(ColorPalette);
    ui.plugin(FlatColorPicker);
    ui.plugin(ColorPicker);

})(jQuery, parseInt);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
