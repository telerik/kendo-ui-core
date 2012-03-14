(function($, undefined) {

var kendo = window.kendo,
    Class = kendo.Class,
    Widget = kendo.ui.Widget,
    extend = $.extend,
    proxy = $.proxy,
    Editor = kendo.ui.Editor,
    dom = Editor.Dom,
    CHANGE = "change",
    VISIBLE = ":visible",
    KSTATESELECTED = "k-state-selected",
    SELECTEDCLASS = "." + KSTATESELECTED,
    SELECTEDCOLORCLASS = ".k-selected-color",
    UNSELECTABLE = "unselectable",
    BACKGROUNDCOLOR = "background-color",
    keys = kendo.keys;

function buildPopup(colorPicker) {
    var html = '<div class="k-popup k-group k-colorpicker-popup">' +
                    '<ul class="k-reset">',
        data = colorPicker.options.data,
        currentColor = (colorPicker.value() || "").substring(1),
        i, len, itemHtml;

    for (i = 0, len = data.length; i < len; i++) {
        itemHtml = '<li class="k-item' +
            (data[i] == currentColor ? ' ' + KSTATESELECTED : '') +
            '"><div style="' + BACKGROUNDCOLOR + ':#' +
            data[i] +
            '"></div></li>';
        html += itemHtml;
    }

    html += "</ul></div>";

    return html;
}

/* ColorPicker */

var ColorPicker = Widget.extend({
    init: function(element, options) {
        var that = this;

        Widget.fn.init.call(that, element, options);

        element = that.element;

        that.selectedColor = that.options.selectedColor;

        element.attr("tabIndex", 0)
                .click(proxy(that.click, that))
                .keydown(proxy(that.keydown, that))
                .find("*").attr(UNSELECTABLE, "on");

        element
            .focus(function () {
                element.css("outline", "1px dotted #000");
            })
            .blur(function() {
                element.css("outline", "");
            })

        if (that.selectedColor)
            element.find(SELECTEDCOLORCLASS).css(BACKGROUNDCOLOR, that.selectedColor);

        $(element[0].ownerDocument.documentElement)
            .bind("mousedown", proxy(function (e) {
                if (!$(e.target).closest(".k-colorpicker-popup").length) {
                    this.close();
                }
            }, that));
    },

    options: {
        name: "ColorPicker",
        data: "000000,7f7f7f,880015,ed1c24,ff7f27,fff200,22b14c,00a2e8,3f48cc,a349a4,ffffff,c3c3c3,b97a57,ffaec9,ffc90e,efe4b0,b5e61d,99d9ea,7092be,c8bfe7".split(","),
        selectedColor: null
    },

    events: [
             /**
             * Fires when the value is changed
             * @name kendo.ui.ColorPicker#change
             * @event
             * @param {Event} e
             * @example
             * $("#colorpicker").kendoColorPicker({
             *     change: function(e) {
             *         // handle event
             *     }
             * });
             */
        CHANGE
    ],

    select: function(color) {
        var that = this;

        if (color) {
            color = dom.toHex(color);
            if (!that.trigger(CHANGE, { value: color })) {
                that.value(color);
                that.close();
            }
        } else {
            that.trigger(CHANGE, { value: that.selectedColor })
        }
    },

    open: function() {
        var that = this,
            popup = that.popup(),
            element = that.element,
            zIndex = "auto",
            elementPosition = element.offset();

        elementPosition.top += element.outerHeight();

        if (element.closest(".k-rtl").length)
            elementPosition.left -= popup.outerWidth() - element.outerWidth();

        element.parents().andSelf().each(function () {
            zIndex = $(this).css("zIndex");
            if (Number(zIndex)) {
                zIndex = Number(zIndex) + 1;
                return false;
            }
        });

        kendo.wrap(popup).css(extend({
            position: "absolute",
            overflow: "hidden",
            zIndex: zIndex
        }, elementPosition));

        popup.find(".k-item").bind("click", function(e) {
                var color = $(e.currentTarget, e.target.ownerDocument).find("div").css(BACKGROUNDCOLOR);
                that.select(color);
            });

        popup.kendoAnimate({
            effects: "slideIn:down",
            show: true,
            duration: 200
        });
    },

    close: function() {
        var that = this;

        if (!that._popup) {
            return;
        }

        that._popup.kendoAnimate({
            effects: "slideIn:down",
            hide: true,
            reverse: true,
            duration: 200,
            complete: function() {
                if (that._popup) {
                    dom.remove(that._popup);
                    that._popup = null;
                }
            }
        });
    },

    toggle: function() {
        var that = this;
        if (!that._popup || !that._popup.is(VISIBLE)) {
            that.open();
        } else {
            that.close();
        }
    },

    click: function(e) {
        if ($(e.target).closest(".k-tool-icon").length > 0) {
            this.select();
        } else {
            this.toggle();
        }
    },

    keydown: function(e) {
        var that = this,
            popup = that.popup(),
            selected, next, prev,
            keyCode = e.keyCode;

        if (keyCode == keys.DOWN) {
            if (!popup.is(VISIBLE)) {
                that.open();
            } else {
                selected = popup.find(SELECTEDCLASS);

                if (selected[0]) {
                    next = selected.next();
                } else {
                    next = popup.find("li:first");
                }

                if (next[0]) {
                    selected.removeClass(KSTATESELECTED);
                    next.addClass(KSTATESELECTED);
                }
            }

            e.preventDefault();
        } else if (keyCode == keys.UP) {
            if (popup.is(VISIBLE)) {
                selected = popup.find(SELECTEDCLASS);
                prev = selected.prev();

                if (prev[0]) {
                    selected.removeClass(KSTATESELECTED);
                    prev.addClass(KSTATESELECTED);
                }
            }
            e.preventDefault();
        } else if (keyCode == keys.TAB || keyCode == keys.RIGHT || keyCode == keys.LEFT) {
            that.close();
        } else if (keyCode == keys.ENTER) {
            popup.find(SELECTEDCLASS).click();
            e.preventDefault();
        }
    },

    value: function(color) {
        if (!color) {
            return this.selectedColor;
        }

        color = dom.toHex(color);

        this.selectedColor = color;

        this.element.find(SELECTEDCOLORCLASS)
            .css(BACKGROUNDCOLOR, color);
    },

    popup: function() {
        var popup = this._popup;
        if (!popup) {
            this._popup = popup = $(buildPopup(this))
                    .hide()
                    .appendTo(document.body)
                    .find("*").attr(UNSELECTABLE, "on").end();
        }

        return popup;
    }

});

kendo.ui.plugin(ColorPicker);

})(jQuery);
