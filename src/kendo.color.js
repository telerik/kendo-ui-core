kendo_module({
    id: "color",
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

    var browser = kendo.support.browser;
    var isIE8 = browser.msie && parseInt(browser.version, 10) < 9;

    var ColorSelectorBase = Widget.extend({
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
        },
        options: {
            value : null
        },
        events: [ "change", "slide" ],
        value: function(v) {
            var that = this;
            if (v === undefined) {
                return that._value;
            }
            v = parse(v);
            that._value = v;
        },
        select: function(color, nohooks) {
            color = parse(color);
            this.value(color);
            if (!nohooks) {
                this.trigger("change", { value: this.value() });
            }
            return color;
        }
    });

    var ColorSelectorSimple = ColorSelectorBase.extend({
        init: function(element, options) {
            var that = this;
            ColorSelectorBase.fn.init.call(that, element, options);
            element = that.element;
            options = that.options;
            var colors = options.palette;
            if (typeof colors == "string") {
                colors = colors.split(",");
            }
            if ($.isArray(colors)) {
                colors = colors.map(parse);
            }

            var content = $(that._template({
                colors : colors,
                value  : that._value,
                id     : options.ariaId
            }))
                .on("click", ".k-item", function(ev){
                    that.select($(ev.currentTarget).find("div").css(BACKGROUNDCOLOR));
                })
                .find("*").attr(UNSELECTABLE, "on").end();

            if (element) {
                element.append(content);
            }
            this._content = content;

            content
                .attr("tabIndex", 0)
                .keydown(bind(that.keydown, that));

            if (options.columns) {
                // XXX: assuming 14px per cell; depends on CSS.
                content.css("width", options.columns * 14 + "px");
            }
        },
        keydown: function(ev) {
            var selected;
            var that = this;
            var el = that._content;
            var all = el.find(".k-item");
            var init = el.find(".k-item." + ITEMSELECTEDCLASS).get(0);

            switch (ev.keyCode) {
              case KEYS.LEFT:
                preventDefault(ev);
                selected = get_relative(all, init, -1);
                break;
              case KEYS.RIGHT:
                preventDefault(ev);
                selected = get_relative(all, init, 1);
                break;

              case KEYS.DOWN:
                preventDefault(ev);
                selected = get_relative(all, init, that.options.columns);
                break;
              case KEYS.UP:
                preventDefault(ev);
                selected = get_relative(all, init, -that.options.columns);
                break;

              case KEYS.ENTER:
                preventDefault(ev);
                if (init) {
                    this.select($("div", init).css(BACKGROUNDCOLOR));
                }
                break;
            }
            if (selected) {
                selected = $(selected);
                $(init).removeClass(ITEMSELECTEDCLASS)
                    .removeAttr("aria-selected");
                selected.addClass(ITEMSELECTEDCLASS)
                    .attr("aria-selected", true);
                try {
                    var color = selected.find("div").css(BACKGROUNDCOLOR);
                    that.trigger("slide", { value: parse(color) });
                } catch(ex) {}
            }
        },
        select: function(color, nohooks) {
            var that = this;
            color = ColorSelectorBase.fn.select.call(that, color, nohooks);
            that._content.find(".k-item." + ITEMSELECTEDCLASS)
                .removeClass(ITEMSELECTEDCLASS)
                .removeAttr("aria-selected");
            var el = null, best = null, min = null;
            that._content.find(".k-item div").each(function(){
                var c = parse($(this).css(BACKGROUNDCOLOR));
                if (c) {
                    if (c.equals(color)) {
                        el = this.parentNode;
                    } else {
                        var d = c.diff(color);
                        if (min == null || d < min) {
                            min = d;
                            best = this.parentNode;
                        }
                    }
                }
            });
            if (!el) {
                el = best;
            }
            if (el) {
                $(el).addClass(ITEMSELECTEDCLASS).attr("aria-selected", true);
            }
            return color;
        },
        options: {
            name    : "ColorSelectorSimple",
            columns : 10,
            palette : SIMPLEPALETTE
        },
        _template: kendo.template
        ('<div class="k-colorpicker-popup">' +
           '<ul class="k-reset">'+
             '# for(var i = 0; i < colors.length; i++) { #' +
               '<li #=(id && i === 0) ? "id=\\""+id+"\\" aria-selected=\\"true\\"" : "" # class="k-item #= colors[i].equals(value) ? "' + ITEMSELECTEDCLASS + '" : "" #" aria-label="#= colors[i].toCss() #">' +
                 '<div style="background-color:#= colors[i].toCss() #"></div>' +
               '</li>' +
             '# } #' +
           '</ul>' +
         '</div>')
    });

    ui.plugin(ColorSelectorSimple);

    var ColorSelectorHSV = ColorSelectorBase.extend({
        init: function(element, options) {
            var that = this;
            ColorSelectorBase.fn.init.call(that, element, options);
            options = that.options;
            element = that.element;

            var content = $(that._template({
                showOpacity  : options.showOpacity,
                showButtons  : options.showButtons,
                showPreview  : options.showPreview,
                messages     : options.messages
            })).find("*").attr(UNSELECTABLE, "on").end();

            if (element) {
                element.append(content);
            }
            that._content = content;

            var hueSlider = that._hueSlider = $(".hue-slider", content).kendoSlider({
                min: 0,
                max: 359,
                tickPlacement: "none",
                showButtons: false
            }).data("kendoSlider");

            var opSlider = that._opacitySlider = $(".transparency-slider", content).kendoSlider({
                min: 0,
                max: 100,
                tickPlacement: "none",
                showButtons: false
            }).data("kendoSlider");

            var hsvRect = that._hsvRect = $(".k-hsv-rectangle", content);

            var hsvHandle = that._hsvHandle = $(".k-draghandle", hsvRect).attr("tabIndex", 0).keydown(bind(that.keydown, that));

            var hueElements = that._hueElements = $(".k-hsv-rectangle, .transparency-slider .k-slider-track", content);

            var selectedColor = that._selectedColor = $(".k-selected-color-display", content);

            var colorAsText = that._colorAsText = $("input.k-color-value", content);

            hueSlider.bind([ "slide", "change" ], function(ev){
                that._updateUI(that._getHSV(ev.value, null, null, null));
            });

            if (opSlider) {
                opSlider.bind([ "slide", "change" ], function(ev){
                    that._updateUI(that._getHSV(null, null, null, ev.value / 100));
                });
            }

            that._updateUI(that._value || new ColorRGB(1, 0, 0, 1));

            hsvRect.mousedown(function(ev){
                hsvHandle.focus();
                var r = hsvRect.offset();
                var rw = hsvRect.width();
                var rh = hsvRect.height();
                function onmove(ev) {
                    var pex = ev.pageX;
                    var pey = ev.pageY;
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
                        .unbind("mousemove", onmove)
                        .unbind("mouseup", onup);
                    preventDefault(ev);
                }
                onmove(ev);
                $(document).mousemove(onmove).mouseup(onup);
            });

            content
                .find("input.k-color-value").keydown(function(ev){
                    if (ev.keyCode == KEYS.ENTER) {
                        try {
                            var color = parse(this.value);
                            var val = that.value();
                            $(this).removeClass("k-state-error");
                            that.select(color, !color.equals(val));
                        } catch(ex) {
                            $(this).addClass("k-state-error");
                        }
                    }
                }).end()
                .find(".controls")
                .on("click", "button.apply", function(){
                    // calling select for the currently displayed
                    // color will trigger the "change" event.
                    that.select(that._getHSV());
                })
                .on("click", "button.cancel", function(){
                    // but on cancel, we simply select the previous
                    // value (again, triggers "change" event).
                    that.select(that.value());
                });
        },
        options: {
            name         : "ColorSelectorHSV",
            showOpacity  : false,
            showButtons  : true,
            showPreview  : true,
            messages     : APPLY_CANCEL
        },
        select: function(color, nohooks) {
            color = ColorSelectorBase.fn.select.call(this, color, nohooks);
            this._updateUI(color);
        },
        keydown: function(ev){
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
                that.select(that._getHSV());
                break;
              case KEYS.F2:
                that._content.find("input.k-color-value").focus().select();
                break;
            }
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
            return new ColorHSV(h, s, v, a);
        },
        _svChange: function(s, v) {
            var color = this._getHSV(null, s, v, null);
            this._updateUI(color);
        },
        _updateUI: function(color) {
            if (!color) {
                return;
            }
            this._selectedColor.css(BACKGROUNDCOLOR, color.toDisplay());
            this._colorAsText.val(this._opacitySlider ? color.toCssRgba() : color.toCss());
            this.trigger("slide", { value: color });
            color = color.toHSV();
            var handle = this._hsvHandle;
            var rect = this._hsvRect;
            var width = rect.width(), height = rect.height();
            handle.css({
                // saturation is 0 on the left side, full (1) on the right
                left: color.s * width + "px",
                // value is 0 on the bottom, full on the top.
                top: (1 - color.v) * height + "px"
            });
            this._hueElements.css(BACKGROUNDCOLOR, new ColorHSV(color.h, 1, 1, 1).toCss());
            this._hueSlider.value(color.h);
            if (this._opacitySlider) {
                this._opacitySlider.value(100 * color.a);
            }
        },
        _template: kendo.template
        ('<div class="k-colorpicker-hsv">' +
           '# if (showPreview) { #' +
             '<div class="k-selected-color"><div class="k-selected-color-display"><input spellcheck="false" class="k-color-value" /></div></div>' +
           '# } #' +
           '<div class="k-hsv-rectangle"><div class="hsv-gradient"></div><div class="k-draghandle"></div></div>' +
           '<input class="hue-slider" />' +
           '# if (showOpacity) { #' +
             '<input class="transparency-slider" />' +
           '# } #' +
           '# if (showButtons) { #' +
             '<div class="controls"><button class="k-button apply">#: messages.apply #</button> <button class="k-button cancel">#: messages.cancel #</button></div>' +
           '# } #' +
         '</div>')
    });

    ui.plugin(ColorSelectorHSV);

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
        init: function(){ throw new Error("kendo.Color is an abstract base class"); },
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
                c = new ColorBytes(c.r, c.g, c.b, c.a);
            }
            return c;
        }
    });

    var ColorRGB = Color.extend({
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
            return new ColorHSV(h, s, v, this.a);
        },
        toBytes: function() {
            return new ColorBytes(this.r * 255, this.g * 255, this.b * 255, this.a);
        }
    });

    var ColorBytes = ColorRGB.extend({
        init: function(r, g, b, a) {
            this.r = Math.round(r); this.g = Math.round(g); this.b = Math.round(b); this.a = a;
        },
        toRGB: function() {
            return new ColorRGB(this.r / 255, this.g / 255, this.b / 255, this.a);
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

    var ColorHSV = Color.extend({
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
            return new ColorRGB(r, g, b, this.a);
        },
        toBytes: function() {
            return this.toRGB().toBytes();
        }
    });

    var parse = Color.parse = function(color, nothrow) {
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
            return new ColorBytes(parseInt(m[1], 16),
                                  parseInt(m[2], 16),
                                  parseInt(m[3], 16), 1);
        }
        m = /^#?([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(color);
        if (m) {
            return new ColorBytes(parseInt(m[1] + m[1], 16),
                                  parseInt(m[2] + m[2], 16),
                                  parseInt(m[3] + m[3], 16), 1);
        }
        m = /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)/.exec(color);
        if (m) {
            return new ColorBytes(parseInt(m[1], 10),
                                  parseInt(m[2], 10),
                                  parseInt(m[3], 10), 1);
        }
        m = /^rgba\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9.]+)\)/.exec(color);
        if (m) {
            return new ColorBytes(parseInt(m[1], 10),
                                  parseInt(m[2], 10),
                                  parseInt(m[3], 10), parseFloat(m[4]));
        }
        m = /^rgb\(([0-9]+)%\s*,\s*([0-9]+)%\s*,\s*([0-9]+)%\)/.exec(color);
        if (m) {
            return new ColorRGB(parseInt(m[1], 10) / 100,
                                parseInt(m[2], 10) / 100,
                                parseInt(m[3], 10) / 100, 1);
        }
        m = /^rgba\(([0-9]+)%\s*,\s*([0-9]+)%\s*,\s*([0-9]+)%\s*,\s*([0-9.]+)\)/.exec(color);
        if (m) {
            return new ColorRGB(parseInt(m[1], 10) / 100,
                                parseInt(m[2], 10) / 100,
                                parseInt(m[3], 10) / 100, parseFloat(m[4]));
        }
        if (!nothrow)
            throw new Error("Cannot parse color: " + color);
        return null;
    };

    function get_relative(array, element, delta) {
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

    kendo.Color = Color;
    kendo.ColorRGB = ColorRGB;
    kendo.ColorHSV = ColorHSV;
    kendo.ColorBytes = ColorBytes;

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

            var content = that._content = $(that._template(options));
            element.hide().after(content);

            content.attr("tabIndex", 0)
                .keydown(bind(that.keydown, that))
                .on("click", ".k-icon", bind(that.open, that))
                .on("click", options.toolIcon ? ".k-tool-icon" : ".k-icon", function(){
                    that.trigger("click");
                });

            that._updateUI(value);
        },

        _template: kendo.template
        ('<div class="k-widget k-colorpicker">' +
           '# if (toolIcon) { #' +
             '<span class="k-tool-icon #= toolIcon #">' +
               '<span class="k-selected-color"></span>' +
             '</span>' +
           '# } else { #' +
             '<span class="k-selected-color"></span>' +
           '# } #' +
           '<span class="k-icon k-i-arrow-s"></span>' +
         '</div>'),

        options: {
            name         : "ColorPicker",
            palette      : null,
            columns      : 10,
            toolIcon     : null,
            value        : null,
            messages     : APPLY_CANCEL
        },

        events: [ "change", "click", "select" ],

        open: function() {
            this._getPopup().open();
            this._selector.select(this.value(), true);
        },
        close: function() {
            this._getPopup().close();
        },
        toggle: function() {
            this._getPopup().toggle();
        },
        select: function(value) {
            value = this.value(value);
            // seems that input type="color" doesn't support opacity
            // in colors; the only accepted format is hex #RRGGBB
            this.element.val(value.toCss());
            this.trigger("select", { value: value });
        },
        value: function(value) {
            if (value !== undefined) {
                value = parse(value);
                this._updateUI(this._value = value);
            }
            return this._value;
        },
        _updateUI: function(value) {
            this._content.find(".k-selected-color").css(
                BACKGROUNDCOLOR,
                value ? value.toDisplay() : "transparent"
            );
        },
        keydown: function(ev) {
            var key = ev.keyCode;
            if (this._getPopup().visible()) {
                if (key == KEYS.ESC) {
                    this.select(this.value());
                    this.close();
                } else {
                    this._selector.keydown(ev);
                }
            }
            else if (key == KEYS.ENTER || key == KEYS.DOWN) {
                this.open();
                preventDefault(ev);
            }
        },
        _getPopup: function() {
            var that = this, p = that._popup;
            if (!p) {
                var opt = this.options;
                var ctor;
                if (opt.palette) {
                    ctor = ColorSelectorSimple;
                    if (opt.palette == "web") {
                        opt.palette = WEBPALETTE;
                        opt.columns = 18;
                    } else if (opt.palette == "basic") {
                        opt.palette = SIMPLEPALETTE;
                    }
                } else {
                    ctor = ColorSelectorHSV;
                }
                var sel = this._selector = new ctor(document.body, opt);
                that._popup = p = sel._content.kendoPopup({
                    anchor       : that._content,
                    toggleTarget : that._content.find(".k-icon")
                }).data("kendoPopup");
                sel.bind("slide", function(ev){
                    that._updateUI(ev.value);
                });
                sel.bind("change", function(ev){
                    p.close();
                    that.select(ev.value);
                });
                p.bind("close", function(ev){
                    that._content.focus();
                    that._updateUI(that._value);
                });
            }
            return p;
        }
    });

    ui.plugin(ColorPicker);

    function preventDefault(ev) { ev.preventDefault(); }

    function bind(callback, obj) {
        return function() {
            return callback.apply(obj, arguments);
        };
    };

})(jQuery, parseInt);
