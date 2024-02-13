import "./kendo.html.button.js";
import "./kendo.button.menu.js";

var __meta__ = {
    id: "splitbutton",
    name: "SplitButton",
    category: "web",
    description: "The SplitButton allows the user to execute a default action which is bound to a Button or to choose a predefined action from a drop-down list.",
    depends: ["button.menu", "html.button"]
};

(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        NS = ".kendoSplitButton",
        ui = kendo.ui,
        extend = $.extend,
        html = kendo.html,
        outerWidth = kendo._outerWidth,
        keys = kendo.keys,

        DOT = ".",
        ID = "id",

        ARIA_HASPOPUP = "aria-haspopup",
        ARIA_DISABLED = "aria-disabled",
        ARIA_CONTROLS = "aria-controls",
        ARIA_LABEL = "aria-label",
        ARIA_EXPANDED = "aria-expanded",

        DISABLED = "disabled",
        DISABLEDSTATE = "k-disabled",
        FOCUSSTATE = "k-focus",

        CLICK = "click",
        KEYDOWN = "keydown",
        OPEN = "open",
        CLOSE = "close",

        FOCUS = "focus",
        BLUR = "blur";

    var cssClasses = {
        widget: "k-split-button k-button-group"
    };

    var SplitButton = Widget.extend({
        init: function(element, options) {
            var that = this;

            options = options || {};
            options.enabled = options.enabled !== false && !$(element).prop(DISABLED);
            Widget.fn.init.call(that, element, options);

            that._wrapper();
            that._renderButtons();
            that._renderMenu();

            that._enable(that.options.enabled);

            that._aria();

            that._attachEvents();

            kendo.notify(that);

            that._applyCssClasses();
        },

        options: {
            name: "SplitButton",
            enabled: true,
            items: [],
            rounded: "medium",
            size: "medium",
            fillMode: "solid",
            themeColor: "base",
            icon: null,
            popup: null,
            arrowIcon: "caret-alt-down",
            messages: {
                labelSuffix: "splitbutton"
            }
        },

        events: [
            CLICK,
            OPEN,
            CLOSE
        ],

        _wrapper: function() {
            var that = this,
                id = that.element.attr(ID) || kendo.guid(),
                wrapperId = id + "_wrapper";

            that.wrapper = that.element
                .wrap("<div id=\"" + wrapperId + "\" class=\"" + cssClasses.widget + "\"></div>")
                .parent(".k-split-button");

            that.arrowButton = $("<button tabindex=\"-1\" aria-label=\"arrow-button\" class=\"k-split-button-arrow\"></button>").appendTo(that.wrapper);
        },

        _applyCssClasses: function() {
            var that = this;

            that.wrapper.addClass(that._getAppearanceClasses());
        },

        _clearCssClasses: function() {
            var that = this;

            that.wrapper.removeClass(that._getAppearanceClasses());
        },

        _getAppearanceClasses: function() {
            var that = this,
                widgetName = that.__proto__.options.name,
                roundedClass = kendo.cssProperties.getValidClass({
                    widget: widgetName,
                    propName: "rounded",
                    value: that.options.rounded
                });

            return roundedClass;
        },

        _renderButtons: function() {
            var that = this;

            that._mainButton();
            that._arrowButton();
        },

        _mainButton: function() {
            var that = this,
                options = extend({}, that.options, {
                    type: that.element.attr("type") || "button"
                });

            delete options.click;

            html.renderButton(that.element, options);
        },

        _arrowButton: function() {
            var that = this,
                options = extend({}, that.options, {
                    type: "button",
                    icon: that.options.arrowIcon,
                });

            delete options.text;
            delete options.imageUrl;
            delete options.click;
            delete options.iconClass;

            html.renderButton(that.arrowButton, options);
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

            that.menu = menu.appendTo(that.wrapper).kendoButtonMenu(extend({
                mainButton: that.element,
                toggleTarget: that.arrowButton,
                menuOpen: that.menuOpenHandler.bind(that),
                menuClose: that.menuCloseHandler.bind(that),
                menuClick: that._click.bind(that)
            }, options)).data("kendoButtonMenu");
        },

        menuOpenHandler: function(ev) {
            var that = this,
                computedWidth = outerWidth(that.wrapper);

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

            that.element.on(CLICK + NS, that._click.bind(that));
            that.element.on(KEYDOWN + NS, that._keydown.bind(that));
            that.element.on(FOCUS + NS, that._focus.bind(that));
            that.element.on(BLUR + NS, that._blur.bind(that));
        },

        _focus: function() {
            this.wrapper.addClass(FOCUSSTATE);
        },

        _blur: function() {
            this.wrapper.removeClass(FOCUSSTATE);
        },

        _click: function(ev) {
            var that = this,
                target = $(ev.target).closest(".k-button"),
                id = target.attr(ID),
                originalEvent = ev;

            if (ev.type === "menu-click") {
                id = ev.id;
                target = ev.target;
                originalEvent = ev.originalEvent;
            }

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
            this.element.add(this.arrowButton)
                .toggleClass(DISABLEDSTATE, !enable);

            if (enable) {
                this.element.removeAttr(ARIA_DISABLED);
            } else {
                this.element.attr(ARIA_DISABLED, !enable);
            }

            if (!soft) {
                this.element.attr(DISABLED, !enable);
            }

            this.arrowButton.attr(DISABLED, !enable);
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

            that._renderButtons();

            that._aria();
        },

        destroy: function() {
            var that = this;

            if (that.menu) {
                that.menu.destroy();
            }

            that.element.off(NS);

            Widget.fn.destroy.call(that);
        }
    });

    kendo.cssProperties.registerPrefix("SplitButton", "k-splitbutton-");

    kendo.cssProperties.registerValues("SplitButton", [{
        prop: "rounded",
        values: kendo.cssProperties.roundedValues.concat([["full", "full"]])
    }]);

    ui.plugin(SplitButton);

})(window.kendo.jQuery);
export default kendo;

