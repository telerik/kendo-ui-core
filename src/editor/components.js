(function($, undefined) {

var kendo = window.kendo,
    Widget = kendo.ui.Widget,
    DropDownList = kendo.ui.DropDownList,
    Editor = kendo.ui.editor,
    dom = Editor.Dom,
    CHANGE = "change",
    KSTATESELECTED = "k-state-selected",
    SELECTEDCLASS = "." + KSTATESELECTED,
    SELECTEDCOLORCLASS = ".k-selected-color",
    UNSELECTABLE = "unselectable",
    BACKGROUNDCOLOR = "background-color",
    ARIASELECTED = "aria-selected",
    ARIALABELLEDBY = "aria-labelledby",
    keys = kendo.keys,
    template = kendo.template(
'<div class="k-colorpicker-popup">' +
   '<ul class="k-reset">'+
        '# for(var i = 0; i < colors.length; i++) { #' +
            '<li #=(id && i === 0) ? "id=\\""+id+"\\" aria-selected=\\"true\\"" : "" # class="k-item #= colors[i] == value ? "k-state-selected" : "" #" aria-label="\\##= colors[i]#">' +
                '<div style="background-color:\\##= colors[i] #"></div>'+
            '</li>' +
        '# } #' +
   '</ul>' +
'</div>');

var ColorPicker = Widget.extend({
    init: function(element, options) {
        var that = this,
            ariaId;

        Widget.fn.init.call(that, element, options);

        element = that.element;
        options = that.options;

        that._value = options.value;
        that._ariaId = ariaId = options.ariaId;

        if (ariaId) {
            element.attr(ARIALABELLEDBY, ariaId);
        }

        that.popup = $(template({
                        colors: options.colors,
                        value: options.value.substring(1),
                        id: ariaId
                     }))
                     .kendoPopup({
                        anchor: element,
                        toggleTarget: element.find(".k-icon")
                     })
                     .delegate(".k-item", "click", function(e) {
                         that.select($(e.currentTarget).find("div").css(BACKGROUNDCOLOR));
                     })
                     .find("*")
                     .attr(UNSELECTABLE, "on")
                     .end()
                     .data("kendoPopup");

        element.attr("tabIndex", 0) // add the color picker to the tab order
               .keydown(function(e) {
                   that.keydown(e);
               })
               .focus(function () {
                   element.css("outline", "1px dotted #000");
               })
               .blur(function() {
                   element.css("outline", "");
               })
               .delegate(".k-tool-icon", "click", function() {
                   that.select();
               })
               .find("*")
               .attr(UNSELECTABLE, "on");

        if (that._value) {
            element.find(SELECTEDCOLORCLASS).css(BACKGROUNDCOLOR, that._value);
        }
    },

    options: {
        name: "ColorPicker",
        colors: "000000,7f7f7f,880015,ed1c24,ff7f27,fff200,22b14c,00a2e8,3f48cc,a349a4,ffffff,c3c3c3,b97a57,ffaec9,ffc90e,efe4b0,b5e61d,99d9ea,7092be,c8bfe7".split(","),
        value: null
    },

    events: [
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
            that.trigger(CHANGE, { value: that._value });
        }
    },

    open: function() {
        this.popup.open();
    },

    close: function() {
        this.popup.close();
    },

    toggle: function() {
        this.popup.toggle();
    },

    _applyAriaAttributes: function(prev, next) {
        var that = this;

        that.element.removeAttr(ARIALABELLEDBY);

        that.element.attr(ARIALABELLEDBY, that._ariaId);

        prev.removeAttr("id");
        prev.attr(ARIASELECTED, false);

        next.attr({
            id: that._ariaId,
            "aria-selected": true
        });
    },

    keydown: function(e) {
        var that = this,
            popup = that.popup.element,
            visible = that.popup.visible(),
            selected,
            next,
            prev,
            preventDefault = false,
            keyCode = e.keyCode;

        if (keyCode == keys.DOWN) {
            if (!visible) {
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

                    that._applyAriaAttributes(selected, next);
                }
            }

            preventDefault = true;
        } else if (keyCode == keys.UP) {
            if (visible) {
                selected = popup.find(SELECTEDCLASS);
                prev = selected.prev();

                if (prev[0]) {
                    selected.removeClass(KSTATESELECTED);
                    prev.addClass(KSTATESELECTED);

                    that._applyAriaAttributes(selected, prev);
                }
            }
            preventDefault = true;
        } else if (keyCode == keys.TAB || keyCode == keys.RIGHT || keyCode == keys.LEFT) {
            that.close();
        } else if (keyCode == keys.ENTER) {
            popup.find(SELECTEDCLASS).click();
            preventDefault = true;
        }

        if (preventDefault) {
            e.preventDefault();
        }
    },

    value: function(value) {
        var that = this;

        if (value === undefined) {
            return that._value;
        } else {
            value = dom.toHex(value);

            that._value = value;

            that.element.find(SELECTEDCOLORCLASS)
                        .css(BACKGROUNDCOLOR, value);
        }
    }
});

var SelectBox = DropDownList.extend({
    init: function(element, options) {
        var that = this;

        DropDownList.fn.init.call(that, element, options);

        that.value(that.options.title);
    },
    options: {
        name: "SelectBox"
    },
    value: function(value) {
        var that = this,
            result = DropDownList.fn.value.call(that, value);

        if (value === undefined) {
            return result;
        }

        if (value !== DropDownList.fn.value.call(that)) {
           that.text(that.options.title);
           that._current.removeClass("k-state-selected");
           that.current(null);
           that._oldIndex = that.selectedIndex = -1;
        }
    }
});

kendo.ui.editor.ColorPicker = ColorPicker;
kendo.ui.editor.SelectBox = SelectBox;

})(jQuery);
