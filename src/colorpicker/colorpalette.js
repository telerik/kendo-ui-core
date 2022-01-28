(function(f, define){
    define([
        "../kendo.core"
    ], f);
})(function(){

(function($, undefined){
    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /*jshint eqnull:true  */
    var kendo = window.kendo,
        ui = kendo.ui,
        parseColor = kendo.parseColor,
        KEYS = kendo.keys,
        BACKGROUNDCOLOR = "background-color",
        ITEMSELECTEDCLASS = "k-state-selected",
        ITEMSFOCUSEDCLASS = "k-state-focus",
        SIMPLEPALETTE = "000000,7f7f7f,880015,ed1c24,ff7f27,fff200,22b14c,00a2e8,3f48cc,a349a4,ffffff,c3c3c3,b97a57,ffaec9,ffc90e,efe4b0,b5e61d,99d9ea,7092be,c8bfe7",
        WEBPALETTE = "FFFFFF,FFCCFF,FF99FF,FF66FF,FF33FF,FF00FF,CCFFFF,CCCCFF,CC99FF,CC66FF,CC33FF,CC00FF,99FFFF,99CCFF,9999FF,9966FF,9933FF,9900FF,FFFFCC,FFCCCC,FF99CC,FF66CC,FF33CC,FF00CC,CCFFCC,CCCCCC,CC99CC,CC66CC,CC33CC,CC00CC,99FFCC,99CCCC,9999CC,9966CC,9933CC,9900CC,FFFF99,FFCC99,FF9999,FF6699,FF3399,FF0099,CCFF99,CCCC99,CC9999,CC6699,CC3399,CC0099,99FF99,99CC99,999999,996699,993399,990099,FFFF66,FFCC66,FF9966,FF6666,FF3366,FF0066,CCFF66,CCCC66,CC9966,CC6666,CC3366,CC0066,99FF66,99CC66,999966,996666,993366,990066,FFFF33,FFCC33,FF9933,FF6633,FF3333,FF0033,CCFF33,CCCC33,CC9933,CC6633,CC3333,CC0033,99FF33,99CC33,999933,996633,993333,990033,FFFF00,FFCC00,FF9900,FF6600,FF3300,FF0000,CCFF00,CCCC00,CC9900,CC6600,CC3300,CC0000,99FF00,99CC00,999900,996600,993300,990000,66FFFF,66CCFF,6699FF,6666FF,6633FF,6600FF,33FFFF,33CCFF,3399FF,3366FF,3333FF,3300FF,00FFFF,00CCFF,0099FF,0066FF,0033FF,0000FF,66FFCC,66CCCC,6699CC,6666CC,6633CC,6600CC,33FFCC,33CCCC,3399CC,3366CC,3333CC,3300CC,00FFCC,00CCCC,0099CC,0066CC,0033CC,0000CC,66FF99,66CC99,669999,666699,663399,660099,33FF99,33CC99,339999,336699,333399,330099,00FF99,00CC99,009999,006699,003399,000099,66FF66,66CC66,669966,666666,663366,660066,33FF66,33CC66,339966,336666,333366,330066,00FF66,00CC66,009966,006666,003366,000066,66FF33,66CC33,669933,666633,663333,660033,33FF33,33CC33,339933,336633,333333,330033,00FF33,00CC33,009933,006633,003333,000033,66FF00,66CC00,669900,666600,663300,660000,33FF00,33CC00,339900,336600,333300,330000,00FF00,00CC00,009900,006600,003300,000000",
        NS = ".kendoColorTools",
        CLICK_NS = "click" + NS,
        KEYDOWN_NS = "keydown" + NS,
        BLUR_NS = "blur" + NS,
        ColorSelector = ui.colorpicker.ColorSelector;

    function preventDefault(ev) { ev.preventDefault(); }

    function bind(callback, obj) {
        return function() {
            return callback.apply(obj, arguments);
        };
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

    var ColorPalette = ColorSelector.extend({
        init: function(element, options) {
            var that = this;
            ColorSelector.fn.init.call(that, element, options);
            element = that.wrapper = that.element;
            options = that.options;

            var colors = options.palette || "basic";

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

            element.addClass("k-colorpalette")
                .attr("role", "grid")
                .attr("aria-readonly", "true")
                .append($(that._template({
                    colors   : colors,
                    columns  : options.columns,
                    tileSize : options.tileSize,
                    value    : that._value,
                    id       : options.ariaId
                })))
                .on(CLICK_NS, ".k-colorpalette-tile", function(ev){
                    that._select(ev.currentTarget);
                })
                .attr("tabIndex", that._tabIndex)
                .on(KEYDOWN_NS, bind(that._keydown, that))
                .on(BLUR_NS, function(){
                    that.wrapper.find(".k-colorpalette-tile").removeClass(ITEMSFOCUSEDCLASS);
                });

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
                element.find(".k-colorpalette-tile").css({ width: width, height: height });
            }
        },
        focus: function(){
            if (this.wrapper && !this.wrapper.is("[unselectable='on']")) {
                this.wrapper.trigger("focus");
            }
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
                items = wrapper.find(".k-colorpalette-tile"),
                current = items.filter("." + ITEMSFOCUSEDCLASS).get(0) || items.filter("." + ITEMSELECTEDCLASS).get(0),
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
                    this._select(current);
                    this.trigger("forceSelect", { value: this.value() });
                    return;
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
        _select: function(item) {
            var that = this,
                items = that.wrapper.find(".k-colorpalette-tile");

            item = $(item);

            ColorSelector.fn._select.call(that, item.css(BACKGROUNDCOLOR));

            items.removeClass(ITEMSELECTEDCLASS);
            item.addClass(ITEMSELECTEDCLASS);
        },
        _current: function(item) {
            this.wrapper.find("." + ITEMSFOCUSEDCLASS)
                .removeClass(ITEMSFOCUSEDCLASS)
                .attr("aria-selected", false)
                .removeAttr("id");

            $(item)
                .addClass(ITEMSFOCUSEDCLASS)
                .attr("aria-selected", true)
                .attr("id", this._selectedID);

            this.element
                .removeAttr("aria-activedescendant")
                .attr("aria-activedescendant", this._selectedID);
        },
        _updateUI: function(color) {
            var item = null,
                items = this.wrapper.find(".k-colorpalette-tile");

            this.wrapper.find(".k-colorpalette-tile").each(function(){
                var c = parseColor($(this).css(BACKGROUNDCOLOR));

                if (c && c.equals(color)) {
                    item = this;

                    return false;
                }
            });

            this._current(item);

            items.removeClass(ITEMSELECTEDCLASS);

            if(item) {
                $(item).addClass(ITEMSELECTEDCLASS);
            }
        },
        _template: kendo.template(
            '<div class="k-colorpalette-table-wrap">' +
            '<table class="k-colorpalette-table k-palette" role="presentation"><tr role="row">' +
              '# for (var i = 0; i < colors.length; ++i) { #' +
                '# var selected = colors[i].equals(value); #' +
                '# if (i && i % columns == 0) { # </tr><tr role="row"> # } #' +
                '<td role="gridcell" unselectable="on" style="background-color:#= colors[i].toCss() #"' +
                    '#= selected ? " aria-selected=true" : "" # ' +
                    '#=(id && i === 0) ? "id=\\""+id+"\\" " : "" # ' +
                    'class="k-colorpalette-tile#= selected ? " ' + ITEMSELECTEDCLASS + '" : "" #" ' +
                    'aria-label="#= colors[i].toCss() #"></td>' +
              '# } #' +
            '</tr></table></div>'
        )
    });


    ui.plugin(ColorPalette);


})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
