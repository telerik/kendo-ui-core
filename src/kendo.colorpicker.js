kendo_module({
    id: "colorpicker",
    name: "Color tools",
    category: "web",
    description: "Color selection widgets",
    depends: [ "core", "popup", "slider" ]
});

(function($, parseInt, undefined){
    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /*jshint eqnull:true  */
    var kendo = window.kendo;
    var Class = kendo.Class;
    var ui = kendo.ui;
    var Widget = ui.Widget;
    var KEYS = kendo.keys;
    var BACKGROUNDCOLOR = "background-color";
    var UNSELECTABLE = "unselectable";
    var ITEMSELECTEDCLASS = "k-state-selected";
    var SIMPLEPALETTE = "000000,7f7f7f,880015,ed1c24,ff7f27,fff200,22b14c,00a2e8,3f48cc,a349a4,ffffff,c3c3c3,b97a57,ffaec9,ffc90e,efe4b0,b5e61d,99d9ea,7092be,c8bfe7";
    var WEBPALETTE = "FFFFFF,FFCCFF,FF99FF,FF66FF,FF33FF,FF00FF,CCFFFF,CCCCFF,CC99FF,CC66FF,CC33FF,CC00FF,99FFFF,99CCFF,9999FF,9966FF,9933FF,9900FF,FFFFCC,FFCCCC,FF99CC,FF66CC,FF33CC,FF00CC,CCFFCC,CCCCCC,CC99CC,CC66CC,CC33CC,CC00CC,99FFCC,99CCCC,9999CC,9966CC,9933CC,9900CC,FFFF99,FFCC99,FF9999,FF6699,FF3399,FF0099,CCFF99,CCCC99,CC9999,CC6699,CC3399,CC0099,99FF99,99CC99,999999,996699,993399,990099,FFFF66,FFCC66,FF9966,FF6666,FF3366,FF0066,CCFF66,CCCC66,CC9966,CC6666,CC3366,CC0066,99FF66,99CC66,999966,996666,993366,990066,FFFF33,FFCC33,FF9933,FF6633,FF3333,FF0033,CCFF33,CCCC33,CC9933,CC6633,CC3333,CC0033,99FF33,99CC33,999933,996633,993333,990033,FFFF00,FFCC00,FF9900,FF6600,FF3300,FF0000,CCFF00,CCCC00,CC9900,CC6600,CC3300,CC0000,99FF00,99CC00,999900,996600,993300,990000,66FFFF,66CCFF,6699FF,6666FF,6633FF,6600FF,33FFFF,33CCFF,3399FF,3366FF,3333FF,3300FF,00FFFF,00CCFF,0099FF,0066FF,0033FF,0000FF,66FFCC,66CCCC,6699CC,6666CC,6633CC,6600CC,33FFCC,33CCCC,3399CC,3366CC,3333CC,3300CC,00FFCC,00CCCC,0099CC,0066CC,0033CC,0000CC,66FF99,66CC99,669999,666699,663399,660099,33FF99,33CC99,339999,336699,333399,330099,00FF99,00CC99,009999,006699,003399,000099,66FF66,66CC66,669966,666666,663366,660066,33FF66,33CC66,339966,336666,333366,330066,00FF66,00CC66,009966,006666,003366,000066,66FF33,66CC33,669933,666633,663333,660033,33FF33,33CC33,339933,336633,333333,330033,00FF33,00CC33,009933,006633,003333,000033,66FF00,66CC00,669900,666600,663300,660000,33FF00,33CC00,339900,336600,333300,330000,00FF00,00CC00,009900,006600,003300,000000";
    var APPLY_CANCEL = {
        apply  : "Apply",
        cancel : "Cancel"
    };
    var NS = ".kendoColorTools";
    var CLICK_NS = "click" + NS;
    var MOUSEDOWN_NS = "touchstart" + NS + " mousedown" + NS;
    var MOUSEMOVE_NS = "touchmove" + NS + " mousemove" + NS;
    var MOUSEUP_NS = "touchend" + NS + " mouseup" + NS;
    var KEYDOWN_NS = "keydown" + NS;

    var browser = kendo.support.browser;
    var isIE8 = browser.msie && browser.version < 9;

    var ColorSelector = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);
            element = that.element;
            options = that.options;
            that._value = options.value = parse(options.value);

            var ariaId = that._ariaId = options.ariaId;
            if (ariaId) {
                element.attr("aria-labelledby", ariaId);
            }

            if (options._standalone) {
                this._triggerSelect = this._triggerChange;
            }
        },
        options: {
            value       : null,
            _standalone : true
        },
        events: [ "change", "select", "cancel" ],
        color: function(value) {
            if (value !== undefined) {
                this._updateUI(this._value = parse(value));
            }
            return this._value;
        },
        value: function(color) {
            color = this.color(color);
            return color ? this.options.opacity ? color.toCssRgba() : color.toCss() : null;
        },
        enable: function(enable) {
            if (arguments.length === 0) {
                enable = true;
            }
            if (enable) {
                $(".k-disabled-overlay", this.wrapper).remove();
            } else {
                this.wrapper.append("<div class='k-disabled-overlay'></div>");
            }
            this._onEnable(enable);
        },
        _select: function(color, nohooks) {
            var prev = this._value;
            color = this.color(color);
            if (!nohooks) {
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
            if (this.element) this.element.off(NS);
            if (this.wrapper) this.wrapper.off(NS).find("*").off(NS);
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

    function triggerEvent(self, ev, color) {
        color = parse(color);
        if (color && !color.equals(self.color())) {
            if (ev == "change") {
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
            self.trigger(ev, { value: color });
        }
    }

    function map(a, f) {
        if (a.map) {
            return a.map(f);
        }
        var ret = [];
        for (var i = 0; i < a.length; ++i) {
            ret[i] = f(a[i]);
        }
        return ret;
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
                colors = map(colors, parse);
            }

            element.addClass("k-widget k-colorpalette")
                .append($(that._template({
                    colors: colors,
                    tileSize: options.tileSize,
                    value: that._value,
                    id: options.ariaId
                })))
                .on(CLICK_NS, ".k-item", function(ev){
                    that._select($(ev.currentTarget).find("div").css(BACKGROUNDCOLOR));
                })
                .find("*").attr(UNSELECTABLE, "on").end()
                .attr("tabIndex", 0)
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

            if (options.columns) {
                element.css("width", options.columns * (width || 14));
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
                this.wrapper.removeAttr("tabIndex");
            } else {
                this.wrapper.attr("tabIndex", 0);
            }
        },
        _keydown: function(ev) {
            var selected;
            var that = this;
            var el = that.wrapper;
            var all = el.find(".k-item");
            var init = el.find(".k-item." + ITEMSELECTEDCLASS).get(0);

            switch (ev.keyCode) {
              case KEYS.LEFT:
                preventDefault(ev);
                selected = relative(all, init, -1);
                break;
              case KEYS.RIGHT:
                preventDefault(ev);
                selected = relative(all, init, 1);
                break;

              case KEYS.DOWN:
                preventDefault(ev);
                selected = relative(all, init, that.options.columns);
                break;
              case KEYS.UP:
                preventDefault(ev);
                selected = relative(all, init, -that.options.columns);
                break;

              case KEYS.ENTER:
                preventDefault(ev);
                if (init) {
                    this._select($("div", init).css(BACKGROUNDCOLOR));
                }
                break;
              case KEYS.ESC:
                this._cancel();
                break;
            }
            if (selected) {
                selected = $(selected);
                $(init).removeClass(ITEMSELECTEDCLASS)
                    .removeAttr("aria-selected");
                selected.addClass(ITEMSELECTEDCLASS)
                    .attr("aria-selected", true);
                try {
                    var color = parse(selected.find("div").css(BACKGROUNDCOLOR));
                    that._triggerSelect(color);
                } catch(ex) {}
            }
        },
        _updateUI: function(color) {
            var that = this;
            that.wrapper.find(".k-item." + ITEMSELECTEDCLASS)
                .removeClass(ITEMSELECTEDCLASS)
                .removeAttr("aria-selected");
            var el = null, best = null;
            // var min = null;
            that.wrapper.find(".k-item div").each(function(){
                var c = parse($(this).css(BACKGROUNDCOLOR));
                if (c) {
                    if (c.equals(color)) {
                        el = this.parentNode;
                    } else {
                        // var d = c.diff(color);
                        // if (min == null || d < min) {
                        //     min = d;
                        //     best = this.parentNode;
                        // }
                    }
                }
            });
            if (!el) {
                el = best;
            }
            if (el) {
                $(el).addClass(ITEMSELECTEDCLASS).attr("aria-selected", true);
            }
        },
        _template: kendo.template(
            '<ul class="k-palette k-reset">'+
            '# for (var i = 0; i < colors.length; i++) { #' +
                '<li #=(id && i === 0) ? "id=\\""+id+"\\" aria-selected=\\"true\\"" : "" # class="k-item #= colors[i].equals(value) ? "' + ITEMSELECTEDCLASS + '" : "" #" aria-label="#= colors[i].toCss() #">' +
                    '<div style="background-color:#= colors[i].toCss() #"></div>' +
                '</li>' +
            '# } #' +
            '</ul>'
        )
    });

    var FlatColorPicker = ColorSelector.extend({
        init: function(element, options) {
            var that = this;
            ColorSelector.fn.init.call(that, element, options);
            options = that.options;
            element = that.element;

            that.wrapper = element.addClass("k-widget k-flatcolorpicker")
                .append(that._template(options))
                .find("*").attr(UNSELECTABLE, "on").end();

            var hueSlider = that._hueSlider = $(".k-hue-slider", element).kendoSlider({
                min: 0,
                max: 359,
                tickPlacement: "none",
                showButtons: false
            }).data("kendoSlider");

            if (isIE8) {
                // We need a filter to stretch the image, but IE filters require an absolute URL.
                //
                // Props to Alexander Gyoshev for figuring out this solution: we use an ordinary background-image in the
                // CSS, and inspect currentStyle.backgroundImage to get the absolute URL.
                var el = $(".k-hue-slider .k-slider-track", element)[0];
                var url = el.currentStyle.backgroundImage;
                url = url.replace(/^url\([\'\"]?|[\'\"]?\)$/g, "");
                el.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + url + "', sizingMethod='scale')";
            }

            var opSlider = that._opacitySlider = $(".k-transparency-slider", element).kendoSlider({
                min: 0,
                max: 100,
                tickPlacement: "none",
                showButtons: false
            }).data("kendoSlider");

            var hsvRect = that._hsvRect = $(".k-hsv-rectangle", element);

            var hsvHandle = that._hsvHandle = $(".k-draghandle", hsvRect).attr("tabIndex", 0).on(KEYDOWN_NS, bind(that._keydown, that));

            that._hueElements = $(".k-hsv-rectangle, .k-transparency-slider .k-slider-track", element);

            that._selectedColor = $(".k-selected-color-display", element);

            that._colorAsText = $("input.k-color-value", element);

            hueSlider.bind([ "slide", "change" ], function(ev){
                that._updateUI(that._getHSV(ev.value, null, null, null));
            });

            if (opSlider) {
                opSlider.bind([ "slide", "change" ], function(ev){
                    that._updateUI(that._getHSV(null, null, null, ev.value / 100));
                });
            }

            that._updateUI(that._value || new _RGB(1, 0, 0, 1));

            hsvRect.on(MOUSEDOWN_NS, function(ev){
                hsvRect.addClass("k-dragging");
                hsvHandle.focus();
                var r = kendo.getOffset(hsvRect);
                var rw = hsvRect.width();
                var rh = hsvRect.height();
                function onmove(ev) {
                    var pos = kendo.touchLocation(ev);
                    var pex = pos.x;
                    var pey = pos.y;
                    var dx = pex - r.left;
                    var dy = pey - r.top;
                    if (dx < 0) { dx = 0; }
                    if (dx > rw) { dx = rw; }
                    if (dy < 0) { dy = 0; }
                    if (dy > rh) { dy = rh; }
                    hsvHandle.css({
                        left: dx + "px",
                        top: dy + "px"
                    });
                    that._svChange(dx / rw, 1 - dy / rh);
                    preventDefault(ev);
                }
                function onup(ev) {
                    $(document)
                        .unbind(MOUSEMOVE_NS, onmove)
                        .unbind(MOUSEUP_NS, onup);
                    preventDefault(ev);
                    hsvRect.removeClass("k-dragging");
                }
                onmove(ev);
                $(document).bind(MOUSEMOVE_NS, onmove).bind(MOUSEUP_NS, onup);
            });

            element
                .find("input.k-color-value").on(KEYDOWN_NS, function(ev){
                    if (ev.keyCode == KEYS.ENTER) {
                        try {
                            var color = parse(this.value);
                            var val = that.color();
                            $(this).removeClass("k-state-error");
                            that._select(color, !color.equals(val));
                        } catch(ex) {
                            $(this).addClass("k-state-error");
                        }
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
            name: "FlatColorPicker",
            opacity: false,
            buttons: false,
            input: true,
            preview: true,
            messages: APPLY_CANCEL
        },
        _onEnable: function(enable) {
            this._hueSlider.enable(enable);
            if (this._opacitySlider) {
                this._opacitySlider.enable(enable);
            }
            $("input", this.wrapper).attr("disabled", !enable);
            var h = $(".k-draghandle", this._hsvRect);
            if (enable) {
                h.attr("tabIndex", 0);
            } else {
                h.removeAttr("tabIndex");
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
            var handle = this._hsvHandle;
            var rect = this._hsvRect;
            var width = rect.width(), height = rect.height();
            var hpos = handle.position();
            if (h == null) {
                h = this._hueSlider.value();
            }
            if (s == null) {
                s = hpos.left / width;
            }
            if (v == null) {
                v = 1 - hpos.top / height;
            }
            if (a == null) {
                a = this._opacitySlider ? this._opacitySlider.value() / 100 : 1;
            }
            return new _HSV(h, s, v, a);
        },
        _svChange: function(s, v) {
            var color = this._getHSV(null, s, v, null);
            this._updateUI(color);
        },
        _updateUI: function(color) {
            var that = this;
            if (!color) {
                return;
            }
            that._selectedColor.css(BACKGROUNDCOLOR, color.toDisplay());
            that._colorAsText.val(that._opacitySlider ? color.toCssRgba() : color.toCss());
            that._triggerSelect(color);
            color = color.toHSV();
            var handle = that._hsvHandle;
            var rect = that._hsvRect;
            var width = rect.width(), height = rect.height();
            handle.css({
                // saturation is 0 on the left side, full (1) on the right
                left: color.s * width + "px",
                // value is 0 on the bottom, full on the top.
                top: (1 - color.v) * height + "px"
            });
            that._hueElements.css(BACKGROUNDCOLOR, new _HSV(color.h, 1, 1, 1).toCss());
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
                '<div class="k-selected-color"><div class="k-selected-color-display"><input spellcheck="false" class="k-color-value" #= !data.input ? \'style=\"visibility: hidden;\"\' : \"\" #></div></div>' +
            '# } #' +
            '<div class="k-hsv-rectangle"><div class="k-hsv-gradient"></div><div class="k-draghandle"></div></div>' +
            '<input class="k-hue-slider" />' +
            '# if (opacity) { #' +
                '<input class="k-transparency-slider" />' +
            '# } #' +
            '# if (buttons) { #' +
                '<div class="k-controls"><button class="k-button apply">#: messages.apply #</button> <button class="k-button cancel">#: messages.cancel #</button></div>' +
            '# } #'
        )
    });

    /* -----[ color utils ]----- */

    function hex(n, width, pad) {
        if (!pad) { pad = "0"; }
        n = n.toString(16);
        while (width > n.length) {
            n = "0" + n;
        }
        return n;
    }

    function fixed(n) {
        return parseFloat((+n).toFixed(3));
    }

    var Color = Class.extend({
        toHSV: function() { return this; },
        toRGB: function() { return this; },
        toHex: function() { return this.toBytes().toHex(); },
        toBytes: function() { return this; },
        toCss: function() { return "#" + this.toHex(); },
        toCssRgba: function() {
            var rgb = this.toBytes();
            return "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + fixed(this.a) + ")";
        },
        toDisplay: function() {
            if (isIE8) {
                return this.toCss(); // no RGBA support; does it support any opacity in colors?
            }
            return this.toCssRgba();
        },
        equals: function(c) { return c === this || c !== null && this.toHex() == parse(c).toHex(); },
        diff: function(c2) {
            if (c2 == null) {
                return NaN;
            }
            var c1 = this.toBytes();
            c2 = c2.toBytes();
            return Math.sqrt(Math.pow((c1.r - c2.r) * 0.30, 2) +
                             Math.pow((c1.g - c2.g) * 0.59, 2) +
                             Math.pow((c1.b - c2.b) * 0.11, 2));
        },
        clone: function() {
            var c = this.toBytes();
            if (c === this) {
                c = new _Bytes(c.r, c.g, c.b, c.a);
            }
            return c;
        }
    });

    var _RGB = Color.extend({
        init: function(r, g, b, a) {
            this.r = r; this.g = g; this.b = b; this.a = a;
        },
        toHSV: function() {
            var min, max, delta, h, s, v;
            var r = this.r, g = this.g, b = this.b;
            min = Math.min(r, g, b);
            max = Math.max(r, g, b);
            v = max;
            delta = max - min;
            if (delta === 0) {
                return new _HSV(0, 0, v, this.a);
            }
            if (max !== 0) {
                s = delta / max;
                if (r == max) {
                    h = (g - b) / delta;
                } else if (g == max) {
                    h = 2 + (b - r) / delta;
                } else {
                    h = 4 + (r - g) / delta;
                }
                h *= 60;
                if (h < 0) {
                    h += 360;
                }
            } else {
                s = 0;
                h = -1;
            }
            return new _HSV(h, s, v, this.a);
        },
        toBytes: function() {
            return new _Bytes(this.r * 255, this.g * 255, this.b * 255, this.a);
        }
    });

    var _Bytes = _RGB.extend({
        init: function(r, g, b, a) {
            this.r = Math.round(r); this.g = Math.round(g); this.b = Math.round(b); this.a = a;
        },
        toRGB: function() {
            return new _RGB(this.r / 255, this.g / 255, this.b / 255, this.a);
        },
        toHSV: function() {
            return this.toRGB().toHSV();
        },
        toHex: function() {
            return hex(this.r, 2) + hex(this.g, 2) + hex(this.b, 2);
        },
        toBytes: function() {
            return this;
        }
    });

    var _HSV = Color.extend({
        init: function(h, s, v, a) {
            this.h = h; this.s = s; this.v = v; this.a = a;
        },
        toRGB: function() {
            var h = this.h, s = this.s, v = this.v;
            var i, r, g, b, f, p, q, t;
            if (s === 0) {
                r = g = b = v;
            } else {
                h /= 60;
                i = Math.floor(h);
                f = h - i;
                p = v * (1 - s);
                q = v * (1 - s * f);
                t = v * (1 - s * (1 - f));
                switch (i) {
                  case 0  : r = v; g = t; b = p; break;
                  case 1  : r = q; g = v; b = p; break;
                  case 2  : r = p; g = v; b = t; break;
                  case 3  : r = p; g = q; b = v; break;
                  case 4  : r = t; g = p; b = v; break;
                  default : r = v; g = p; b = q; break;
                }
            }
            return new _RGB(r, g, b, this.a);
        },
        toBytes: function() {
            return this.toRGB().toBytes();
        }
    });

    function parse(color, nothrow) {
        if (color == null ||
            color == "transparent" /* IE8 does this */)
        {
            return null;
        }
        if (color instanceof Color) {
            return color;
        }
        var m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(color);
        if (m) {
            return new _Bytes(parseInt(m[1], 16),
                              parseInt(m[2], 16),
                              parseInt(m[3], 16), 1);
        }
        m = /^#?([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(color);
        if (m) {
            return new _Bytes(parseInt(m[1] + m[1], 16),
                              parseInt(m[2] + m[2], 16),
                              parseInt(m[3] + m[3], 16), 1);
        }
        m = /^rgb\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)/.exec(color);
        if (m) {
            return new _Bytes(parseInt(m[1], 10),
                              parseInt(m[2], 10),
                              parseInt(m[3], 10), 1);
        }
        m = /^rgba\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9.]+)\s*\)/.exec(color);
        if (m) {
            return new _Bytes(parseInt(m[1], 10),
                              parseInt(m[2], 10),
                              parseInt(m[3], 10), parseFloat(m[4]));
        }
        m = /^rgb\(\s*([0-9]*\.?[0-9]+)%\s*,\s*([0-9]*\.?[0-9]+)%\s*,\s*([0-9]*\.?[0-9]+)%\s*\)/.exec(color);
        if (m) {
            return new _RGB(parseFloat(m[1]) / 100,
                            parseFloat(m[2]) / 100,
                            parseFloat(m[3]) / 100, 1);
        }
        m = /^rgba\(\s*([0-9]*\.?[0-9]+)%\s*,\s*([0-9]*\.?[0-9]+)%\s*,\s*([0-9]*\.?[0-9]+)%\s*,\s*([0-9.]+)\s*\)/.exec(color);
        if (m) {
            return new _RGB(parseFloat(m[1]) / 100,
                            parseFloat(m[2]) / 100,
                            parseFloat(m[3]) / 100, parseFloat(m[4]));
        }
        if (!nothrow) {
            throw new Error("Cannot parse color: " + color);
        }
        return undefined;
    }

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

            var value;
            if (element.val()) {
                value = parse(element.val(), true);
            } else {
                value = parse(options.value, true);
            }
            that._value = options.value = value;

            var content = that.wrapper = $(that._template(options));
            element.hide().after(content);

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
            this.wrapper.add("*").off(NS);
            if (this._popup) {
                this._selector.destroy();
                this._popup.destroy();
            }
            this._selector = this._popup = this.wrapper = null;
            Widget.fn.destroy.call(this);
        },
        enable: function(enable) {
            if (arguments.length === 0) {
                enable = true;
            }
            var that = this, wrapper = that.wrapper, innerWraper = wrapper.children(".k-picker-wrap");
            that.element.attr("disabled", !enable);
            wrapper.attr("disabled", !enable);
            if (enable) {
                wrapper.removeClass("k-state-disabled")
                    .attr("tabIndex", 0)
                    .on("mouseenter" + NS, function() { innerWraper.addClass("k-state-hover"); })
                    .on("mouseleave" + NS, function() { innerWraper.removeClass("k-state-hover"); })
                    .on("focus" + NS, function () { innerWraper.addClass("k-state-focused"); })
                    .on("blur" + NS, function () { innerWraper.removeClass("k-state-focused"); })
                    .on(KEYDOWN_NS, bind(that._keydown, that))
                    .on(MOUSEDOWN_NS, ".k-icon", bind(that.toggle, that))
                    .on(CLICK_NS, that.options.toolIcon ? ".k-tool-icon" : ".k-selected-color", function(){
                        that.trigger("activate");
                    });
            } else {
                wrapper.addClass("k-state-disabled")
                    .removeAttr("tabIndex")
                    .add("*", wrapper).off(NS);
            }
        },

        _template: kendo.template(
            '<span class="k-widget k-colorpicker k-header">' +
                '<span class="k-picker-wrap">' +
                    '# if (toolIcon) { #' +
                        '<span class="k-tool-icon #= toolIcon #">' +
                            '<span class="k-selected-color"></span>' +
                        '</span>' +
                    '# } else { #' +
                        '<span class="k-selected-color"></span>' +
                    '# } #' +
                    '<span class="k-select">' +
                        '<span class="k-icon k-i-arrow-s"></span>' +
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
            preview: true
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
            if (value) {
                if (this._isInputTypeColor() || value.a == 1) {
                    // seems that input type="color" doesn't support opacity
                    // in colors; the only accepted format is hex #RRGGBB
                    this.element.val(value.toCss());
                } else {
                    this.element.val(value.toCssRgba());
                }
            }
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
                var options = this.options;
                var selectorType;

                if (options.palette) {
                    selectorType = ColorPalette;
                } else {
                    selectorType = FlatColorPicker;
                }

                options._standalone = false;

                var selector = this._selector = new selectorType($("<div></div>").appendTo(document.body), options);

                that._popup = popup = selector.wrapper.kendoPopup({
                    anchor: that.wrapper
                }).data("kendoPopup");
                selector.bind({
                    select: function(ev){
                        that._updateUI(parse(ev.value));
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
                        }
                    },
                    activate: function(){
                        selector._select(that.color(), true);
                        selector.focus();
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

    kendo.parseColor = parse;
    kendo.Color = {
        fromBytes: function(r, g, b, a) {
            return new _Bytes(r, g, b, a != null ? a : 1);
        },
        fromRGB: function(r, g, b, a) {
            return new _RGB(r, g, b, a != null ? a : 1);
        },
        fromHSV: function(h, s, v, a) {
            return new _HSV(h, s, v, a != null ? a : 1);
        }
    };

})(jQuery, parseInt);
