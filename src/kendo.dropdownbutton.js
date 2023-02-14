import "./kendo.html.button.js";
import "./kendo.button.menu.js";

var __meta__ = {
    id: "dropdownbutton",
    name: "DropDownButton",
    category: "web",
    description: "The DropDownButton allows the user to execute an action from a drop-down list.",
    depends: ["button.menu", "html.button"]
};

(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        NS = ".kendoDropDownButton",
        ui = kendo.ui,
        keys = kendo.keys,
        extend = $.extend,
        html = kendo.html,
        outerWidth = kendo._outerWidth,

        DOT = ".",
        ID = "id",

        ARIA_HASPOPUP = "aria-haspopup",
        ARIA_DISABLED = "aria-disabled",
        ARIA_CONTROLS = "aria-controls",
        ARIA_LABEL = "aria-label",
        ARIA_EXPANDED = "aria-expanded",

        DISABLED = "disabled",
        DISABLEDSTATE = "k-disabled",

        CLICK = "click",
        KEYDOWN = "keydown",
        OPEN = "open",
        CLOSE = "close",

        FOCUS = "focus";

    var cssClasses = {
        menuButton: "k-menu-button",
        dropdownButton: "k-dropdown-button"
    };

    var DropDownButton = Widget.extend({
        init: function(element, options) {
            var that = this;

            options.enabled = options.enabled !== false && !$(element).prop(DISABLED);
            Widget.fn.init.call(that, element, options);

            that.wrapper = that.element;

            that._mainButton();
            that._renderMenu();

            that._enable(that.options.enabled);

            that._aria();

            that._attachEvents();

            kendo.notify(that);

            that._applyCssClasses();
        },

        options: {
            name: "DropDownButton",
            direction: "down",
            enabled: true,
            items: [],
            rounded: "medium",
            size: "medium",
            fillMode: "solid",
            themeColor: "base",
            icon: null,
            popup: null,
            messages: {
                labelSuffix: "dropdownbutton"
            }
        },

        events: [
            CLICK,
            OPEN,
            CLOSE
        ],

        _mainButton: function() {
            var that = this,
                options = extend({}, that.options, {
                    type: that.element.attr("type") || "button"
                });

            delete options.click;

            that.element.addClass(cssClasses.menuButton).addClass(cssClasses.dropdownButton);

            html.renderButton(that.element, options);
        },

        _aria: function() {
            var that = this,
                element = that.element,
                menu = that.menu;

            element.attr(ARIA_HASPOPUP, menu ? "menu" : null);
            element.attr(ARIA_EXPANDED, menu ? false : null);
            element.attr(ARIA_CONTROLS, menu ? menu.list.attr(ID) : null);

            if (!element.attr(ARIA_LABEL)) {
                element.attr(ARIA_LABEL, element.text() + " " + that.options.messages.labelSuffix);
            }
        },

        _renderMenu: function() {
            var that = this,
                options = extend({}, that.options),
                menu = $("<div></div>");

            delete options.click;
            delete options.name;

            if (!options.items.length) {
                return;
            }

            that.menu = menu.appendTo(document.body).kendoButtonMenu(extend({
                mainButton: that.element,
                toggleTarget: that.element,
                menuOpen: that.menuOpenHandler.bind(that),
                menuClose: that.menuCloseHandler.bind(that),
                menuClick: that._click.bind(that)
            }, options)).data("kendoButtonMenu");
        },

        menuOpenHandler: function(ev) {
            var that = this,
                computedWidth = outerWidth(that.element);

            var isDefaultPrevented = that.trigger(OPEN, { target: that.element });
            if (isDefaultPrevented) {
                ev.preventDefault();
                return;
            }

            ev.sender.adjustPopupWidth(computedWidth);
            that.element.attr(ARIA_EXPANDED, true);
        },

        menuCloseHandler: function(ev) {
            var that = this,
                isDefaultPrevented = that.trigger(CLOSE, { target: that.element });

            if (isDefaultPrevented) {
                ev.preventDefault();
                return;
            }

            that.element.attr(ARIA_EXPANDED, false);
            that.element.trigger(FOCUS);
        },

        _attachEvents: function() {
            var that = this;

            that.element.on(KEYDOWN + NS, that._keydown.bind(that));
        },

        _click: function(ev) {
            var that = this,
                id = ev.id,
                target = ev.target,
                originalEvent = ev.originalEvent;

            that.menu.close();

            that.trigger(CLICK, { id: id, target: target, originalEvent: originalEvent });
        },

        _keydown: function(ev) {
            var that = this;

            if (that.element.is(DOT + DISABLEDSTATE) && (ev.keyCode === keys.ENTER || ev.keyCode === keys.SPACEBAR)) {
                ev.preventDefault();
            }
        },

        focus: function() {
            var that = this;
            that.element.trigger(FOCUS);
        },

        _enable: function(enable, soft) {
            this.element
                .toggleClass(DISABLEDSTATE, !enable);

            if (enable) {
                this.element.removeAttr(ARIA_DISABLED);
            } else {
                this.element.attr(ARIA_DISABLED, !enable);
            }

            if (!soft) {
                this.element.attr(DISABLED, !enable);
            }
        },

        enable: function(enable, menuItem, soft) {
            var that = this;

            if (enable === undefined) {
                enable = true;
            }

            if (menuItem && menuItem.length) {
                that.menu.enable(enable, menuItem);
                return;
            }

            that.options.enabled = enable;

            that._enable(enable, soft);
            that.menu.enable(enable);
        },

        hide: function(menuItem) {
            var that = this;

            if (menuItem && menuItem.length) {
                that.menu.hide(menuItem);
            }
        },

        show: function(menuItem) {
            var that = this;

            if (menuItem && menuItem.length) {
                that.menu.show(menuItem);
            }
        },

        open: function() {
            this.menu._popup.open();
        },

        close: function() {
            this.menu._popup.close();
        },

        items: function() {
            return this.menu.items();
        },

        setOptions: function(options) {
            var that = this;

            Widget.fn.setOptions.call(that, options);

            if (options.popup || options.items || options.size) {
                that.menu.destroy();
                that._renderMenu();
            }

            that._mainButton();

            that._aria();
        },

        destroy: function() {
            var that = this;

            that.menu.destroy();

            that.element.off(NS);

            Widget.fn.destroy.call(that);
        }
    });

    ui.plugin(DropDownButton);

})(window.kendo.jQuery);

