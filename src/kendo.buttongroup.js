import "./kendo.core.js";
import "./kendo.togglebutton.js";
import "./kendo.button.js";

var __meta__ = {
    id: "buttongroup",
    name: "ButtonGroup",
    category: "web",
    description: "The Kendo ButtonGroup widget is a linear set of grouped buttons.",
    depends: [ "core", "togglebutton", "button" ]
};

(function($, undefined) {
    var kendo = window.kendo;
    var ui = kendo.ui;
    var Widget = ui.Widget;
    var ToggleButton = ui.ToggleButton;
    var Button = ui.Button;
    var keys = kendo.keys;
    var NS = ".kendoButtonGroup";
    var KWIDGET = "k-widget";
    var KBUTTONGROUP = "k-button-group";
    var KBUTTON = "k-button";
    var SELECTED = "k-selected";
    var DISABLED = "k-disabled";
    var KFOCUS = "k-focus";
    var SELECT = "select";
    var KEYDOWN = "keydown";
    var ARIA_DISABLED = "aria-disabled";
    var EMPTY = " ";
    var DOT = ".";
    var NONE = "none";
    var SINGLE = "single";
    var MULTIPLE = "multiple";
    var TOGGLE = "toggle";
    var FOCUS = "focus";

    var ButtonGroup = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.wrapper = that.element;

            that.selectedIndices = [];

            that._buttons = that._renderItems(that.options.items);

            that.element
                .addClass(KWIDGET + EMPTY + KBUTTONGROUP)
                .attr("role", "group");

            that._enable = true;

            if (!that.options.enable || !that.options.enabled) {
                that._enable = false;
                that.element
                        .attr(ARIA_DISABLED, true)
                        .addClass(DISABLED);

                that._buttons.forEach((b) => {
                    b.enable(false);
                });
            }

            if (that.options.selection !== NONE) {
                that.select(that.options.index);
            }

            that._attachEvents();
        },

        events: [
            SELECT
        ],

        options: {
            name: "ButtonGroup",
            selection: SINGLE,
            index: -1,
            enable: true,
            enabled: true,
            preventKeyNav: false,
            size: "medium",
            rounded: "medium",
            fillMode: "solid",
            themeColor: "base"
        },

        badge: function(item, value) {
            var that = this,
                element = that.element,
                button = !isNaN(item) ? that._buttons[item] : element.find(item).getKendoToggleButton() || element.find(item).getKendoButton(),
                validValue = value || value === 0,
                badge, badgeEl;

            if (!button) {
                return;
            }

            badge = button.badge;

            if (!badge && validValue) {
                button._badge({ text: kendo.htmlEncode(value) });
                return kendo.htmlEncode(value);
            }

            if (validValue) {
                badge.text(kendo.htmlEncode(value));
            } else if (value === false) {
                button.badge = null;
                badgeEl = badge.element;
                badge.destroy();
                badgeEl.empty().remove();
                return;
            }

            return badge ? badge.text() : null;
        },

        current: function() {
            return this.element.find(DOT + SELECTED);
        },

        destroy: function() {
            var that = this;

            that.element.off(NS);

            that.element.find(DOT + KBUTTON).each(function(i, el) {
                var component = $(el).getKendoToggleButton() || $(el).getKendoButton();

                if (component) {
                    component.destroy();
                }
            });

            Widget.fn.destroy.call(that);
        },

        enable: function(enable) {
            if (typeof enable == "undefined") {
                enable = true;
            }

            this.element
                    .attr(ARIA_DISABLED, !enable)
                    .toggleClass(DISABLED, !enable);

            this._buttons.forEach((b) => {
                var focused = b.element.hasClass(KFOCUS) || b.element.is(":focus");

                b.enable(enable);

                if (focused) {
                    b.element.removeAttr("disabled").addClass("k-focus").trigger("focus");
                }
            });

            this._enable = this.options.enable = enable;
        },

        select: function(el) {
            var that = this,
                button,
                index = -1;

            if (this.options.selection === NONE || el === undefined || el === -1) {
                return;
            }

            if (typeof el === "number") {
                index = el;
            } else if (el.nodeType) {
                el = $(el);
                index = el.index();
            } else {
                index = el.index();
            }

            button = that._buttons[index];

            if (!button) {
                return;
            }

            if (that.options.selection === MULTIPLE) {
                if (el.length > 1) {
                    el.each((i, element) => {
                        var idx = $(element).index();

                        that._buttons[idx].toggle();
                        that._toggleIndex(idx);
                    });
                } else {
                    that._buttons[index].toggle();
                    that._toggleIndex(index);
                }
            } else {
                that._resetIndexes(index);
            }
        },

        _addButton: function(el, options) {
            if (this.options.selection === NONE) {
                delete options.selected;

                return new Button(el, options);
            } else {
                var btn = new ToggleButton(el, options);

                btn.bind(TOGGLE, this._select.bind(this, el));

                return btn;
            }
        },

        _attachEvents: function() {
            if (!this.options.preventKeyNav) {
                this.element.on(KEYDOWN + NS, this._keyDown.bind(this));
            }
        },

        _keyDown: function(e) {
            var that = this,
                buttonGroup = $(that.element),
                focusableItems = buttonGroup.find(DOT + KBUTTON),
                focusedElement = buttonGroup.find(":focus"),
                currentIndex = focusableItems.index(focusedElement),
                isRtl = kendo.support.isRtl(that.element),
                itemToFocus;

            if ((e.keyCode === keys.LEFT && !isRtl) || (e.keyCode === keys.RIGHT && isRtl)) {
                itemToFocus = currentIndex === 0 ? focusableItems.eq(focusableItems.length - 1) : $(focusableItems[currentIndex - 1]);
                itemToFocus.trigger(FOCUS);
                e.preventDefault();
            } else if ((e.keyCode === keys.LEFT && isRtl) || (e.keyCode === keys.RIGHT && !isRtl)) {
                itemToFocus = currentIndex + 1 === focusableItems.length ? focusableItems.eq(0) : $(focusableItems[currentIndex + 1]);
                itemToFocus.trigger(FOCUS);
                e.preventDefault();
            }
        },

        _renderItems: function(items) {
            var that = this,
                groupOptions = that.options,
                children = that.element.children(),
                buttons = [];

            if (children.length > 0) {
                children.each(function(index) {
                    var el = $(this),
                        image = el.find("img").addClass("k-image"),
                        disabled = el.is("[disabled]") || el.hasClass(DISABLED),
                        options = {
                            badge: kendo.attrValue(el, "badge"),
                            icon: !image[0] ? kendo.attrValue(el, "icon") : null,
                            disabled: disabled,
                            selected: !disabled ? el.is(DOT + SELECTED) : false,
                            size: groupOptions.size,
                            rounded: groupOptions.rounded,
                            fillMode: groupOptions.fillMode,
                            themeColor: groupOptions.themeColor
                        };

                    buttons.push(that._addButton(el, options));

                    if (options.selected) {
                        that.selectedIndices.push(index);
                    }
                });
            }

            if (!items) {
                return buttons;
            }

            items.forEach(function(item, index) {
                var text = item.text ? item.encoded === false ? item.text : kendo.htmlEncode(item.text) : "",
                    el = item.url ? $("<a href=" + item.url + ">") : $("<button>");

                el.text(text);

                if (item.attributes) {
                    el.attr(item.attributes);
                }

                item = $.extend({}, item, {
                    size: groupOptions.size,
                    rounded: groupOptions.rounded,
                    fillMode: groupOptions.fillMode,
                    themeColor: groupOptions.themeColor
                });

                el.appendTo(that.element);
                buttons.push(that._addButton(el, item));

                if (item.selected) {
                    that.selectedIndices.push(index);
                }
            });

            return buttons;
        },

        _resetIndexes: function(index) {
            this.selectedIndices = [];
            this._buttons.forEach((b) => {
                b.toggle(false);
            });

            this._buttons[index].toggle(true);
            this.selectedIndices.push(index);
        },

        _select: function(button) {
            var selection = this.options.selection,
                index = button.index();

            if (!this._enable || button.is(DOT + DISABLED)) {
                return;
            }

            if (selection === MULTIPLE) {
                this._toggleIndex(index);
            } else if (selection === SINGLE) {
                this._resetIndexes(index);
            }

            this.trigger(SELECT, { indices: this.selectedIndices, target: button });
        },

        _toggleIndex: function(index) {
            if (this.selectedIndices.indexOf(index) === -1) {
                this.selectedIndices.push(index);
            } else {
                this.selectedIndices.splice(this.selectedIndices.indexOf(index), 1);
            }
        }
    });

    ui.plugin(ButtonGroup);
})(window.kendo.jQuery);

