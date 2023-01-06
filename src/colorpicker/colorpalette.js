import "../kendo.core.js";

(function($, undefined){
    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.

    var kendo = window.kendo,
        ui = kendo.ui,
        parseColor = kendo.parseColor,
        KEYS = kendo.keys,
        DOT = ".",
        BACKGROUNDCOLOR = "background-color",
        ITEMSELECTEDCLASS = "k-selected",
        ITEMSFOCUSEDCLASS = "k-focus",
        TILE_CLASS = "k-colorpalette-tile",
        SIMPLEPALETTE = "000000,7f7f7f,880015,ed1c24,ff7f27,fff200,22b14c,00a2e8,3f48cc,a349a4,ffffff,c3c3c3,b97a57,ffaec9,ffc90e,efe4b0,b5e61d,99d9ea,7092be,c8bfe7",
        WEBPALETTE = "FFFFFF,FFCCFF,FF99FF,FF66FF,FF33FF,FF00FF,CCFFFF,CCCCFF,CC99FF,CC66FF,CC33FF,CC00FF,99FFFF,99CCFF,9999FF,9966FF,9933FF,9900FF,FFFFCC,FFCCCC,FF99CC,FF66CC,FF33CC,FF00CC,CCFFCC,CCCCCC,CC99CC,CC66CC,CC33CC,CC00CC,99FFCC,99CCCC,9999CC,9966CC,9933CC,9900CC,FFFF99,FFCC99,FF9999,FF6699,FF3399,FF0099,CCFF99,CCCC99,CC9999,CC6699,CC3399,CC0099,99FF99,99CC99,999999,996699,993399,990099,FFFF66,FFCC66,FF9966,FF6666,FF3366,FF0066,CCFF66,CCCC66,CC9966,CC6666,CC3366,CC0066,99FF66,99CC66,999966,996666,993366,990066,FFFF33,FFCC33,FF9933,FF6633,FF3333,FF0033,CCFF33,CCCC33,CC9933,CC6633,CC3333,CC0033,99FF33,99CC33,999933,996633,993333,990033,FFFF00,FFCC00,FF9900,FF6600,FF3300,FF0000,CCFF00,CCCC00,CC9900,CC6600,CC3300,CC0000,99FF00,99CC00,999900,996600,993300,990000,66FFFF,66CCFF,6699FF,6666FF,6633FF,6600FF,33FFFF,33CCFF,3399FF,3366FF,3333FF,3300FF,00FFFF,00CCFF,0099FF,0066FF,0033FF,0000FF,66FFCC,66CCCC,6699CC,6666CC,6633CC,6600CC,33FFCC,33CCCC,3399CC,3366CC,3333CC,3300CC,00FFCC,00CCCC,0099CC,0066CC,0033CC,0000CC,66FF99,66CC99,669999,666699,663399,660099,33FF99,33CC99,339999,336699,333399,330099,00FF99,00CC99,009999,006699,003399,000099,66FF66,66CC66,669966,666666,663366,660066,33FF66,33CC66,339966,336666,333366,330066,00FF66,00CC66,009966,006666,003366,000066,66FF33,66CC33,669933,666633,663333,660033,33FF33,33CC33,339933,336633,333333,330033,00FF33,00CC33,009933,006633,003333,000033,66FF00,66CC00,669900,666600,663300,660000,33FF00,33CC00,339900,336600,333300,330000,00FF00,00CC00,009900,006600,003300,000000",
        NS = ".kendoColorTools",
        FOCUS_NS = "focus" + NS,
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

            that._tabIndex = this.element.attr("tabindex") || 0;

            that._wrapper();

            options = that.options;

            that._selectedID = (options.ariaId || kendo.guid()) + "_selected";
            that._ariaTemplate = kendo.template(that.options.ARIATemplate);

            if (that._value) {
                that._updateUI(that._value);
                that.wrapper.find(DOT + ITEMSFOCUSEDCLASS).removeClass(ITEMSFOCUSEDCLASS);
            }

            that.wrapper.attr("aria-label", that._ariaTemplate(that.value() || ""));

            that._attachEvents();
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
        _attachEvents: function() {
            var that = this;

            that.wrapper.on(CLICK_NS, DOT + TILE_CLASS, function(ev){
                that._select(ev.currentTarget);
            })
            .on(KEYDOWN_NS, bind(that._keydown, that))
            .on(BLUR_NS, function(){
                that.wrapper.find(DOT + TILE_CLASS).removeClass(ITEMSFOCUSEDCLASS);
            })
            .on(FOCUS_NS, bind(that._focus, that));
        },
        _colors: function() {
            var options = this.options,
                colors = options.palette || "basic";

            if (colors == "websafe") {
                colors = WEBPALETTE;
                options.columns = 18;
            } else if (colors == "basic") {
                colors = SIMPLEPALETTE;
            }

            if (typeof colors == "string") {
                colors = colors.split(",");
            }

            if (Array.isArray(colors)) {
                colors = $.map(colors, function(x) { return parseColor(x); });
            }

            return colors;
        },
        _current: function(item) {
            this.wrapper.find(DOT + TILE_CLASS)
                .removeClass(ITEMSFOCUSEDCLASS)
                .removeAttr("id");

            $(item)
                .addClass(ITEMSFOCUSEDCLASS)
                .attr("id", this._selectedID);

            this.wrapper
                .removeAttr("aria-activedescendant")
                .attr("aria-activedescendant", this._selectedID);
        },
        _focus: function() {
            var wrapper = this.wrapper,
                selected = wrapper.find("#" + this._selectedID);

            if (selected.length === 0) {
                this._current(wrapper.find(DOT + TILE_CLASS).first());
            }
        },
        _keydown: function(e) {
            var newCurrent,
                wrapper = this.wrapper,
                items = wrapper.find(DOT + TILE_CLASS),
                current = items.filter(DOT + ITEMSFOCUSEDCLASS).get(0) || items.filter(DOT + ITEMSELECTEDCLASS).get(0),
                keyCode = e.keyCode,
                index;

            if (current) {
                index = Array.prototype.indexOf.call(current.parentNode.children, current);
            }

            if (keyCode == KEYS.LEFT) {
                newCurrent = current ? current.previousSibling : items[items.length - 1];
            } else if (keyCode == KEYS.RIGHT) {
                newCurrent = current ? current.nextSibling : items[0];
            } else if (keyCode == KEYS.DOWN) {
                newCurrent = current ? (current.parentNode.nextSibling ? current.parentNode.nextSibling.children[index] : null) : items[0];
            } else if (keyCode == KEYS.UP) {
                newCurrent = current ? (current.parentNode.previousSibling ? current.parentNode.previousSibling.children[index] : null) : items.get[items.length - 1];
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

            if (newCurrent && newCurrent.nodeType !== 1) {
                newCurrent = null;
            }

            if (newCurrent) {
                preventDefault(e);

                this._current(newCurrent);
            }
        },
        _onEnable: function(enable) {
            if (this.options._standalone) {
                if (enable) {
                    this.wrapper.attr("tabindex", this._tabIndex);
                    this.wrapper.removeAttr("aria-disabled");
                } else {
                    this.wrapper.removeAttr("tabindex");
                    this.wrapper.attr("aria-disabled", true);
                }
            }
        },
        _select: function(item) {
            var that = this,
                items = that.wrapper.find(DOT + TILE_CLASS);

            item = $(item);

            ColorSelector.fn._select.call(that, item.css(BACKGROUNDCOLOR));

            items.removeClass(ITEMSELECTEDCLASS).removeAttr("aria-selected");
            item.addClass(ITEMSELECTEDCLASS).attr("aria-selected", true);
        },
        _template: kendo.template(({colors, columns, tileSize, value, id}) => {
            let startPart =
            '<div class="k-colorpalette-table-wrap">' +
            '<table class="k-colorpalette-table k-palette" role="presentation"><tr role="row">';

            let cellElements = "";
            for (var i = 0; i < colors.length; ++i) {
                let selected = colors[i].equals(value);
                if (i && i % columns == 0) {
                    cellElements += '</tr><tr role="row">';
                }

                cellElements +=
                `<td role="gridcell" unselectable="on" style="background-color:${colors[i].toCss()}"` +
                    `${selected ? " aria-selected=true" : ""} ` +
                    `${(id && i === 0) ? 'id=\\"' + id + '\\" ' : '' } ` +

                    `class="k-colorpalette-tile${selected ? " " + ITEMSELECTEDCLASS : ""}" ` +
                    `aria-label="${colors[i].toCss()}"></td>`;
            }

            let endPart = '</tr></table></div>';
            return startPart + cellElements + endPart;
        }),
        _tileSize: function() {
            var tileSize = this.options.tileSize,
                width, height;

            if (tileSize) {
                if (/number|string/.test(typeof tileSize)) {
                    width = height = parseFloat(tileSize);
                } else if (typeof tileSize == "object") {
                    width = parseFloat(tileSize.width);
                    height = parseFloat(tileSize.height);
                } else {
                    throw new Error("Unsupported value for the 'tileSize' argument");
                }
                this.wrapper.find(DOT + TILE_CLASS).css({ width: width, height: height });
            }
        },
        _updateUI: function(color) {
            var item = null,
                items = this.wrapper.find(DOT + TILE_CLASS);

            this.wrapper.find(DOT + TILE_CLASS).each(function(){
                var c = parseColor($(this).css(BACKGROUNDCOLOR));

                if (c && c.equals(color)) {
                    item = this;

                    return false;
                }
            });

            this._current(item);

            items.removeClass(ITEMSELECTEDCLASS);

            if (item) {
                $(item).addClass(ITEMSELECTEDCLASS);
                this.wrapper.attr("aria-label", this._ariaTemplate(this.value() || ""));
            }
        },
        _wrapper: function() {
            var options = this.options,
                colors = this._colors(),
                wrapper;

            if (this.element.is("input")) {
                wrapper = this.element.addClass("k-hidden").wrap("<div>").parent();
            } else {
                wrapper = this.element;
            }

            wrapper.addClass("k-colorpalette")
                .attr("role", "grid")
                .append($(this._template({
                    colors: colors,
                    columns: options.columns,
                    tileSize: options.tileSize,
                    value: this._value,
                    id: options.ariaId
                })))
                .attr("tabindex", this._tabIndex);

            this.wrapper = wrapper;
            this._tileSize();
        }
    });


    ui.plugin(ColorPalette);


})(window.kendo.jQuery);

