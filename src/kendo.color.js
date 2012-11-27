kendo_module({
    id: "color",
    name: "Color tools",
    category: "web",
    description: "Color selection widgets",
    depends: [ "core", "popup", "slider" ]
});

(function($, parseInt, undefined){
    var kendo = window.kendo;
    var Class = kendo.Class;
    var ui = kendo.ui;
    var Widget = ui.Widget;
    var KEYS = kendo.keys;
    var ARIALABELLEDBY = "aria-labelledby";
    var BACKGROUNDCOLOR = "background-color";
    var UNSELECTABLE = "unselectable";
    var ITEMSELECTEDCLASS = "k-state-selected";
    var SIMPLEPALETTE = "000000,7f7f7f,880015,ed1c24,ff7f27,fff200,22b14c,00a2e8,3f48cc,a349a4,ffffff,c3c3c3,b97a57,ffaec9,ffc90e,efe4b0,b5e61d,99d9ea,7092be,c8bfe7";

    var ColorPicker = Widget.extend({
        init: function(element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);
            options = that.options;
            element = that.element;
            var value = parse(options.value);
            that._value = value;
            var content = that._content = $(that._template({ value: value }));
            element.hide().after(content);

            content.attr("tabIndex", 0)
                .keydown($.proxy(that.keydown, that))
                .on("click", ".k-icon", $.proxy(that.open, that));
        },
        _template: kendo.template
        ('<div class="k-widget k-colorpicker">' +
           '<span class="k-selected-color"></span>' +
           '<span class="k-icon k-i-arrow-s"></span>' +
         '</div>'),
        options: {
            name    : "ColorPicker",
            palette : SIMPLEPALETTE,
            value   : null
        },
        events: [ "change", "select" ],
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
            this.trigger("select", { value: value });
        },
        value: function(value) {
            if (value !== undefined) {
                value = parse(value);
                this._value = value;
                this._content.find(".k-selected-color").css(
                    BACKGROUNDCOLOR,
                    value ? value.toCssRgba() : "transparent"
                );
            }
            return this._value;
        },
        keydown: function(ev) {
            var key = ev.keyCode;
            if (this._getPopup().visible()) {
                if (key == KEYS.ESC) {
                    this.close();
                } else {
                    this._selector.keydown(ev);
                }
            }
            else if (key == KEYS.ENTER || key == KEYS.DOWN) {
                this.open();
                ev.preventDefault();
            }
        },
        _getPopup: function() {
            var that = this, p = that._popup;
            if (!p) {
                var sel = this._selector = new ColorSelectorSimple(null, {
                    palette : that.options.palette,
                    value   : that._value
                });
                that._popup = p = sel.element.kendoPopup({
                    anchor       : that._content,
                    toggleTarget : that._content.find(".k-icon")
                }).data("kendoPopup");
                sel.bind("change", function(ev){
                    p.close();
                    that.select(ev.value);
                });
                p.bind("close", function(ev){
                    that._content.focus();
                });
            }
            return p;
        }
    });

    var ColorSelectorBase = Widget.extend({
        init: function(element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);
            element = that.element;
            options = that.options;
            that._value = parse(options.value);
            var ariaId = that._ariaId = options.ariaId;
            if (ariaId) {
                element.attr(ARIALABELLEDBY, ariaId);
            }
        },
        options: {
            value : null
        },
        events: [ "change" ],
        value: function(v) {
            var that = this;
            if (v === undefined) return that._value;
            v = parse(v);
            that._value = v;
        },
        select: function(color, nohooks) {
            color = parse(color);
            this.value(color);
            if (!nohooks)
                this.trigger("change", { value: this.value() });
            return color;
        }
    });

    ui.plugin(ColorPicker);

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

            if (element) element.html(content);
            that.element = element = content;

            element
                .attr("tabIndex", 0)
                .keydown($.proxy(that.keydown, that));
        },
        keydown: function(ev) {
            function preventDefault(){ ev.preventDefault(); }
            var selected;
            var that = this;
            var el = that.element;
            var all = el.find(".k-item");
            var init = el.find(".k-item." + ITEMSELECTEDCLASS).get(0);

            switch (ev.keyCode) {
              case KEYS.LEFT:
                preventDefault();
                selected = get_relative(all, init, -1);
                break;
              case KEYS.RIGHT:
                preventDefault();
                selected = get_relative(all, init, 1);
                break;

              case KEYS.DOWN:
                // XXX: this is assuming we have 10 colors per row.
                // it depends on the CSS, in fact.
                preventDefault();
                selected = get_relative(all, init, 10);
                break;
              case KEYS.UP:
                preventDefault();
                selected = get_relative(all, init, -10);
                break;

              case KEYS.ENTER:
                preventDefault();
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
            }
        },
        select: function(color, nohooks) {
            var that = this;
            color = ColorSelectorBase.fn.select.call(that, color, nohooks);
            that.element.find(".k-item." + ITEMSELECTEDCLASS)
                .removeClass(ITEMSELECTEDCLASS)
                .removeAttr("aria-selected");
            var el = null, best = null, min = null;
            that.element.find(".k-item div").each(function(){
                var c = parse($(this).css(BACKGROUNDCOLOR));
                if (c.equals(color)) {
                    el = this.parentNode;
                } else {
                    var d = c.diff(color);
                    if (min === null || d < min) {
                        min = d;
                        best = this.parentNode;
                    }
                }
            });
            if (!el) el = best;
            if (el) $(el).addClass(ITEMSELECTEDCLASS).attr("aria-selected", true);
            return color;
        },
        options: {
            name    : "ColorSelectorSimple",
            palette : SIMPLEPALETTE
        },
        _template: kendo.template
        ('<div class="k-colorpicker-popup">' +
           '<ul class="k-reset">'+
             '# for(var i = 0; i < colors.length; i++) { #' +
               '<li #=(id && i === 0) ? "id=\\""+id+"\\" aria-selected=\\"true\\"" : "" # class="k-item #= colors[i].equals(value) ? "' + ITEMSELECTEDCLASS + '" : "" #" aria-label="#= colors[i]#">' +
                 '<div style="background-color:#= colors[i] #"></div>' +
               '</li>' +
             '# } #' +
           '</ul>' +
         '</div>')
    });

    ui.plugin(ColorSelectorSimple);

    /* -----[ color utils ]----- */

    function hex(n, width, pad) {
        if (!pad) pad = "0";
        n = n.toString(16);
        while (width > n.length) n = "0" + n;
        return n;
    }

    var Color = Class.extend({
        toHSV: function() { return this; },
        toRGB: function() { return this; },
        toHex: function() { return this.toBytes().toHex(); },
        toBytes: function() { return this; },
        toString: function() { return "#" + this.toHex(); },
        toCssRgba: function() {
            var rgb = this.toBytes();
            return "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + this.a + ")";
        },
        equals: function(c) { return c === this || c !== null && this.toHex() == parse(c).toHex(); },
        diff: function(c2) {
            if (c2 === null) return NaN;
            var c1 = this.toBytes();
            c2 = c2.toBytes();
            return Math.sqrt(Math.pow((c1.r - c2.r) * 0.30, 2) +
                             Math.pow((c1.g - c2.g) * 0.59, 2) +
                             Math.pow((c1.b - c2.b) * 0.11, 2));
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
                if (r == max)
                    h = (g - b) / delta;
                else if (g == max)
                    h = 2 + (b - r) / delta;
                else
                    h = 4 + (r - g) / delta;
                h *= 60;
                if (h < 0)
                    h += 360;
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
            if (s === 0)
                r = g = b = v;
            else {
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

    var parse = Color.parse = function(color, m) {
        if (color === null) return color;
        if (color instanceof Color) return color;
        m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(color);
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
        throw new Error("Cannot parse color: " + color);
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

})(jQuery, parseInt);
