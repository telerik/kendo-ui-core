(function($, undefined) {

var kendo = window.kendo,
    Class = kendo.Class,
    Widget = kendo.ui.Widget,
    extend = $.extend,
    deepExtend = kendo.deepExtend;
    Editor = kendo.ui.Editor,
    dom = Editor.Dom,
    CHANGE = "change",
    VISIBLE = ":visible",
    KSTATESELECTED = "k-state-selected",
    SELECTEDCLASS = "." + KSTATESELECTED;

/* color picker */

var ColorPicker = Widget.extend({
    init: function(element, options) {
        var that = this;

        Widget.fn.init.call(that, element, options);

        element = that.element;

        that.selectedColor = that.options.selectedColor;

        element.attr("tabIndex", 0)
                .click($.proxy(that.click, that))
                .keydown(function(e) {
                    var popup = that.popup(),
                        selected, next, prev,
                        keyCode = e.keyCode;

                    if (keyCode == 40) {
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
                    } else if (keyCode == 38) {
                        if (popup.is(VISIBLE)) {
                           selected = popup.find(SELECTEDCLASS);
                           prev = selected.prev();

                           if (prev[0]) {
                                selected.removeClass(KSTATESELECTED);
                                prev.addClass(KSTATESELECTED);
                           }
                        }
                        e.preventDefault();
                    } else if (keyCode == 9 || keyCode == 39 || keyCode == 37) {
                        that.close();
                    } else if (keyCode == 13) {
                       popup.find(SELECTEDCLASS).click();
                       e.preventDefault();
                    }
                })
                .find("*")
                .attr("unselectable", "on");

        if ($.browser.msie) {
            element.focus(function () {
                element.css("outline", "1px dotted #000");
            })
            .blur(function() {
                element.css("outline", "");
            });
        }

        if (that.selectedColor)
            element.find(".k-selected-color").css("background-color", that.selectedColor);

        $(element[0].ownerDocument.documentElement)
            .bind("mousedown", $.proxy(function (e) {
                if (!$(e.target).closest(".k-colorpicker-popup").length) {
                    this.close();
                }
            }, that));

        that.bind([
            CHANGE,
            "load"
        ], that.options);
    },

    options: {
        name: "ColorPicker",
        data: "000000,7f7f7f,880015,ed1c24,ff7f27,fff200,22b14c,00a2e8,3f48cc,a349a4,ffffff,c3c3c3,b97a57,ffaec9,ffc90e,efe4b0,b5e61d,99d9ea,7092be,c8bfe7".split(","),
        selectedColor: null
    },

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
                var color = $(e.currentTarget, e.target.ownerDocument).find("div").css("background-color");
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
                if (that.popup) {
                    dom.remove(that.popup[0].parentNode);
                    that.popup = null;
                }
            }
        });
    },

    toggle: function() {
        var that = this;
        if (!that.popup || !that.popup.is(VISIBLE)) {
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

    value: function(color) {
        if (!color) {
            return this.selectedColor;
        }

        color = dom.toHex(color);

        this.selectedColor = color;

        this.element.find(".k-selected-color")
            .css("background-color", color);
    },

    popup: function() {
        var popup = this._popup;
        if (!popup) {
            this._popup = popup = $(ColorPicker.buildPopup(this))
                    .hide()
                    .appendTo(document.body)
                    .find("*").attr("unselectable", "on").end();
        }

        return popup;
    }

});

ColorPicker.buildPopup = function(component) {
    var html = '<div class="k-popup k-group k-colorpicker-popup">' +
                    '<ul class="k-reset">',
        data = component.options.data,
        currentColor = (component.value() || "").substring(1),
        itemHtml,
        i, len, itemHtml;

    for (i = 0, len = data.length; i < len; i++) {
        itemHtml = '<li class="k-item' +
            (data[i] == currentColor ? ' ' + KSTATESELECTED : '') +
            '"><div style="background-color:#' +
            data[i] +
            '"></div></li>';
        html += itemHtml;
    }

    html += "</ul></div>";

    return html;
}

kendo.ui.plugin(ColorPicker);

})(jQuery);
