(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "bottomnavigation",
    name: "BottomNavigation",
    category: "web",
    description: "The BottomNavigation widget is a navigation element that allows movement between primary destinations in an app.",
    depends: [ "core" ]
};

(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        proxy = $.proxy,
        extend = $.extend,
        template = kendo.template,
        keys = kendo.keys,
        isPlainObject = $.isPlainObject,
        isEmptyObject = $.isEmptyObject,

        NS = ".kendoBottomNavigation",
        PREFIX = "k-bottom-nav-",
        K_POS = "k-pos-",
        DOT = ".",

        SELECT = "select";

    var isString = function (value) {
        return typeof value === "string";
    };

    var bottomNavigationStyles = {
        widget: "k-bottom-nav",
        item: "k-bottom-nav-item",
        navIcon: "k-bottom-nav-item-icon",
        icon: "k-icon",
        text: "k-bottom-nav-item-text",
        itemFlow: {
            vertical: "k-bottom-nav-item-flow-vertical",
            horizontal: "k-bottom-nav-item-flow-horizontal"
        },
        selected: "k-state-selected",
        disabled: "k-state-disabled",
        border: "k-bottom-nav-border",
        shadow: "k-bottom-nav-shadow",
        focus: "k-state-focused"
    };

    var templates = {
        item: template("<span class='" + bottomNavigationStyles.item + "'></span>"),
        anchor: template("<a class='" + bottomNavigationStyles.item + "' href='#:url#'></a>"),
        text: template("<span class='" + bottomNavigationStyles.text + "'>#=text#</span>"),
        icon: template("<span class='" + bottomNavigationStyles.navIcon + "#if(icon){# k-icon k-i-#:icon# #}#'></span>")
    };

    var BottomNavigation = Widget.extend({
        init: function(element, options) {
            var that = this;
            options = options || {};
            Widget.fn.init.call(that, element, options);

            that.element = $(element);

            that._updateCssClasses();
            that._items();
            that._bindEvents();
        },

        options: {
            name: "BottomNavigation",
            positionMode: "fixed",
            items: [],
            themeColor: "primary",
            itemFlow: "vertical",
            fill: "flat",
            shadow: false,
            border: true,
            template: null
        },

        events: [
            SELECT
        ],

        destroy: function() {
            var that = this;

            that.element.off(NS);

            Widget.fn.destroy.call(this);
        },

        _tabindex: function(target) {
            var that = this,
                element = that.element,
                TABINDEX = "tabindex",
                cachedTabIndex = element.attr("data-" + kendo.ns + TABINDEX),
                tabindex = target.attr(TABINDEX) || element.attr(TABINDEX) || cachedTabIndex;

            if(!cachedTabIndex) {
                element.removeAttr(TABINDEX);
                element.attr("data-" + kendo.ns + TABINDEX, tabindex);
            }

            target.attr(TABINDEX, !isNaN(tabindex) ? tabindex : 0);
        },

        _updateCssClasses: function () {
            var that = this,
                options = that.options,
                styles = bottomNavigationStyles;

            // Remove all class names
            that.element.removeClass(function(index, className) {
                if (className.indexOf('k-') === 0) {
                    that.element.removeClass(className);
                }
            });

            that.element.addClass(styles.widget);
            that.element.addClass(kendo.getValidCssClass(PREFIX, "themeColor", options.themeColor));
            that.element.addClass(kendo.getValidCssClass(PREFIX, "fill", options.fill));
            that.element.addClass(kendo.getValidCssClass(K_POS, "positionMode", options.positionMode));
            that.element.toggleClass(styles.border, options.border);
            that.element.toggleClass(styles.shadow, options.shadow);
            that._itemFlow(options.itemFlow);
        },

        _itemFlow: function (orientation) {
            var that = this,
                orientationStyles = bottomNavigationStyles.itemFlow;

            that._toggleClassGroup(that.element, orientation, orientationStyles);
        },

        _toggleClassGroup: function (element, value, group) {
            if(isString(group[value])) {
                for (var key in group) {
                    element.removeClass(group[key]);
                }

                element.addClass(group[value]);
            }
        },

        _items: function () {
            var that = this,
                options = that.options,
                items = options.items,
                item;

            for (var i = 0; i < items.length; i++) {
                item = that._renderItem(items[i]);
                that.element.append(item);
            }
        },

        _renderItem: function (item) {
            var that = this,
                itemTemplate = item.template || that.options.template,
                isLink = item.url && isString(item.url),
                elm, icon;

            elm = $(isLink ? template(templates.anchor)(item) : template(templates.item)(item));

            elm.toggleClass(bottomNavigationStyles.selected, item.selected === true)
                .toggleClass(bottomNavigationStyles.disabled, item.enabled === false)
                .addClass(item.cssClass)
                .attr(extend({}, item.attributes, {
                    "aria-disabled": item.enabled === false
                }))
                .data(item.data);

            that._tabindex(elm);

            if(!elm.attr("role") && !isLink) {
                elm.attr("role", "link");
            }

            if (itemTemplate) {
                elm.append(template(itemTemplate)(item));
                return elm;
            }

            item = extend({}, {
                icon: ""
            }, item);

            icon = $(templates.icon(item)).addClass(item.iconClass);

            elm.append(icon);

            if (item.text) {
                item.text = item.encoded === false ? item.text : kendo.htmlEncode(item.text);
                elm.append($(templates.text(item)));
            }

            return elm;
        },

        _bindEvents: function () {
            var that = this,
                clickProxy = proxy(that._click, that),
                keydownProxy = proxy(that._keydown, that);

            that.element.on("click" + NS, DOT + bottomNavigationStyles.item, clickProxy)
                        .on("keydown" + NS, DOT + bottomNavigationStyles.item, keydownProxy);
        },

        _click: function (ev) {
            var that = this,
                item = $(ev.target).closest(DOT + bottomNavigationStyles.item);

            if (item.is(DOT + bottomNavigationStyles.disabled)) {
                ev.preventDefault();
                return;
            }

            that._triggerSelect(item, ev);
        },

        _triggerSelect: function (item, ev) {
            var that = this;

            if (item.is(DOT + bottomNavigationStyles.disabled)) {
                return;
            }

            if(that.trigger(SELECT, { originalEvent: ev, item: item, data: item.data() })) {
                return;
            }

            that.select(item);
        },

        _keydown: function (ev) {
            var that = this,
                target = $(ev.target),
                key = ev.keyCode;

            if (key === keys.ENTER || key === keys.SPACEBAR) {
                if(that._isItem(target)) {
                    that._triggerSelect(target, ev);

                    if (key === keys.SPACEBAR) {
                        ev.preventDefault();
                    }
                }
            }
        },

        _isItem: function(item) {
            var that = this;

            item = $(item);

            return item.is(DOT + bottomNavigationStyles.item) && !!that.element.find(item).length;
        },

        items: function () {
            var that = this;

            return that.element.children();
        },

        select: function (item, state) {
            var that = this,
                selectedItem = that.items().filter(DOT + bottomNavigationStyles.selected);

            if (!item) {
                return selectedItem;
            }

            state = state !== false;

            if(that._isItem(item)) {
                selectedItem.removeClass(bottomNavigationStyles.selected);
                $(item).toggleClass(bottomNavigationStyles.selected, state);
            }
        },

        enable: function (item, state) {
            var that = this;

            state = state === false;

            if (item && that._isItem(item)) {
                $(item).toggleClass(bottomNavigationStyles.disabled, state);
                $(item).attr("aria-disabled", state);
            }
        },

        item: function (index) {
            var that = this;

            if (isNaN(index)) {
                return null;
            }

            return that.items().eq(index);
        },

        itemById: function (id) {
            var that = this;

            return that.element.find("#" + id);
        },

        add: function (item, before) {
            var that = this,
                method = "append",
                targetElement = that.element;

            if(before && that._isItem(before)) {
                method = "before";
                targetElement = $(before);
            }

            if(item && isPlainObject(item) && !isEmptyObject(item)) {
                targetElement[method](that._renderItem(item));
            }
        },

        remove: function (item) {
            var that = this;

            if(item && that._isItem(item)) {
                item.remove();
            }
        },

        showText: function (toggle) {
            var that = this,
                textItems = that.items().find(DOT + bottomNavigationStyles.text);

            toggle = toggle !== false;

            textItems.toggle(toggle);
        },

        setOptions: function (options) {
            var that = this;

            Widget.fn.setOptions.call(this, options);
            that._updateCssClasses();

            if ("items" in options || "template" in options) {
                that.element.empty();
                that._items();
            }
        }
    });

    ui.plugin(BottomNavigation);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });