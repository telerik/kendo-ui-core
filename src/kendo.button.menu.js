import "./kendo.core.js";
import "./kendo.popup.js";
import "./kendo.icons.js";

var __meta__ = {
    id: "button.menu",
    name: "ButtonMenu",
    category: "web",
    description: "The popup Menu list part of the SplitButton and the DropDownButton",
    depends: ["core", "popup", "icons"]
};

(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        NS = ".kendoButtonMenu",
        ui = kendo.ui,
        keys = kendo.keys,
        encode = kendo.htmlEncode,
        extend = $.extend,

        DOT = ".",
        ID = "id",
        NEXT = "next",
        PREV = "prev",
        DISABLEDSTATE = "k-disabled",
        HIDDEN = "k-hidden",

        ARIA_DISABLED = "aria-disabled",
        ROLE_MENU = "menu",
        ROLE_MENU_ITEM = "menuitem",
        TABINDEX = "tabindex",

        CLICK = "click",
        MENU_CLICK = "menuClick",
        OPEN = "menuOpen",
        CLOSE = "menuClose",
        KEYDOWN = "keydown",
        FOCUS = "focus",

        DIRECTIONS = {
            "down": {
                origin: "bottom left",
                position: "top left"
            },
            "up": {
                origin: "top left",
                position: "bottom left"
            }
        };

    var cssClasses = {
        popup: "k-menu-popup",
        list: "k-group k-menu-group k-reset",
        listItem: "k-item k-menu-item",
        menuItem: "k-menu-item",
        itemText: "k-menu-link-text",
        item: "k-link k-menu-link",
        sprite: "k-sprite",
        image: "k-image",
        icon: "k-icon"
    };

    var baseItem = {
        text: null,
        icon: null,
        url: null,
        attributes: null,
        enabled: true,
        hidden: false,
        id: null,
        imageUrl: null,
        spriteCssClass: null
    };

    var IMAGE_TEMPLATE = ({ imageUrl }) => `${imageUrl ? `<img alt="icon" class="${cssClasses.image}" src="${encode(imageUrl)}" />` : ''}`;
    var SPRITE_TEMPLATE = ({ spriteCssClass }) => `${spriteCssClass ? `<span class="${cssClasses.sprite} ${encode(spriteCssClass)}"></span>` : ''}`;
    var ICON_TEMPLATE = ({ icon }) => `${icon ? kendo.ui.icon(encode(icon)) : ''}`;
    var TEXT_TEMPLATE = ({ text }) => `${text ? `<span class="${cssClasses.itemText}">${encode(text)}</span>` : ''}`;

    var ITEM_TEMPLATE = ({ imageUrl, spriteCssClass, icon, text }) => `<span class="${cssClasses.item}">` +
                                                        `${IMAGE_TEMPLATE({ imageUrl })}` +
                                                        `${SPRITE_TEMPLATE({ spriteCssClass })}` +
                                                        `${ICON_TEMPLATE({ icon })}` +
                                                        `${TEXT_TEMPLATE({ text })}` +
                                                    `</span>`;

    var LINK_TEMPLATE = ({ url, imageUrl, spriteCssClass, icon, text, attributes }) => `<a href="${encode(url)}" ${attributes.target ? `target="${attributes.target}"` : ''} class="${cssClasses.item}">` +
                                                    `${IMAGE_TEMPLATE({ imageUrl })}` +
                                                    `${SPRITE_TEMPLATE({ spriteCssClass })}` +
                                                    `${ICON_TEMPLATE({ icon })}` +
                                                    `${TEXT_TEMPLATE({ text })}` +
                                                `</a>`;

    function findFocusableSibling(element, dir) {
        var getSibling = dir === NEXT ? $.fn.next : $.fn.prev;
        var getter = dir === NEXT ? $.fn.first : $.fn.last;
        var candidate = getSibling.call(element);
        var focusable = ":kendoFocusable";

        if (!candidate.length) {
            candidate = getter.call(element.parent().find(DOT + cssClasses.menuItem));
        }

        if (candidate.is(focusable) || !candidate.length) {
            return candidate;
        }

        if (candidate.find(focusable).length) {
            return getter.call(candidate.find(focusable));
        }

        return findFocusableSibling(candidate, dir);
    }

    var ButtonMenu = Widget.extend({
        init: function(element, options) {
            var that = this;


            Widget.fn.init.call(that, element, options);

            that.mainButton = options.mainButton;
            that._clickHandlers = {};

            that._renderList();

            that._initPopup();

            that._attachEvents();

            that._applyCssClasses(that.list);
        },

        options: {
            name: "ButtonMenu",
            direction: "down",
            element: null,
            items: [],
            size: "medium",
        },

        events: [
            MENU_CLICK,
            OPEN,
            CLOSE
        ],

        _renderList: function() {
            var that = this,
                items = that.options.items,
                popup = that.element.addClass(cssClasses.popup),
                id = that.mainButton.attr(ID) || kendo.guid(),
                list = $("<ul role=\"" + ROLE_MENU + "\"></ul>").addClass(cssClasses.list);

            that.list = list.appendTo(popup);

            that.list.attr(ID, id + "_buttonmenu");

            items.forEach(that._renderListItem.bind(that));
        },

        _renderListItem: function(item) {
            var that = this,
                attributesId = item.attributes ? item.attributes.id : null,
                id, menuItem;

            item = extend({}, baseItem, item, {
                enabled: item.enable && item.enabled // backward compatibility: support both enable and enabled options.
            });

            id = item.id || attributesId || kendo.guid();
            menuItem = $("<li id=\"" + id + "\" role=\"" + ROLE_MENU_ITEM + "\" class=\"" + cssClasses.listItem + "\">" + that._renderItemButton(item) + "</li>");

            if (item.click) {
                that._clickHandlers[id] = item.click;
            }

            if (item.attributes) {
                delete item.attributes.target;

                if (item.attributes.class) {
                    menuItem.addClass(item.attributes.class);
                    delete item.attributes.class;
                }

                menuItem.attr(item.attributes);
            }

            if (item.data && kendo.isFunction(item.data)) {
                menuItem.data(item.data(item));
            }

            that.list.append(menuItem);

            that.enable(item.enabled, menuItem);
            that._hide(item.hidden, menuItem);
        },

        _renderItemButton: function(item) {
            var that = this,
                options = that.options;

            if (options.itemTemplate) {
                return kendo.template(options.itemTemplate)(item);
            }

            if (item.url) {
                return kendo.template(LINK_TEMPLATE)(item);
            } else {
                return kendo.template(ITEM_TEMPLATE)(item);
            }
        },

        _initPopup: function() {
            var that = this,
                options = that.options,
                direction = options.direction || "down";

            that._popup = new ui.Popup(that.element, extend({}, options.popup, {
                anchor: that.mainButton,
                isRtl: that._isRtl,
                toggleTarget: options.toggleTarget,
                copyAnchorStyles: false,
                animation: options.animation,
                open: that._popupOpenHandler.bind(that),
                close: that._popupCloseHandler.bind(that),
                activate: that._popupExpandHandler.bind(that)
            }, DIRECTIONS[direction]));
        },

        _popupOpenHandler: function(ev) {
            var that = this;

            var isDefaultPrevented = that.trigger(OPEN);

            if (isDefaultPrevented) {
                ev.preventDefault();
                return;
            }

            that.list.find(DOT + cssClasses.menuItem).attr(TABINDEX, 0);
        },

        _popupCloseHandler: function(ev) {
            var that = this,
                isDefaultPrevented = that.trigger(CLOSE);

            if (isDefaultPrevented) {
                ev.preventDefault();
            }

            that.list.find(DOT + cssClasses.menuItem).attr(TABINDEX, -1);
        },

        _popupExpandHandler: function() {
            var that = this;

            that.list.find(":kendoFocusable").first().trigger(FOCUS);
        },

        adjustPopupWidth: function(width) {
            var that = this;

            that.element.addClass("k-split-wrapper");

            that.element.css({
                "min-width": width
            });
        },

        _attachEvents: function() {
            var that = this;

            that.list
                .on(CLICK + NS, DOT + cssClasses.menuItem, that._click.bind(that))
                .on(KEYDOWN + NS, DOT + cssClasses.menuItem, that.listItemKeydown.bind(that));

            that.mainButton
                .on(KEYDOWN + NS, that._keydown.bind(that));
        },

        _keydown: function(ev) {
            var that = this;

            if ($(ev.target).is(DOT + DISABLEDSTATE) || $(ev.target).parents(DOT + DISABLEDSTATE).length) {
                return;
            }

            if (ev.altKey && ev.keyCode === keys.DOWN) {
                that._popup.open();
                ev.preventDefault();
                return;
            }
        },

        listItemKeydown: function(ev) {
            var that = this,
                li = $(ev.target);

            ev.preventDefault();

            if (ev.keyCode === keys.ESC || ev.keyCode === keys.TAB || (ev.altKey && ev.keyCode === keys.UP)) {
                that._popup.close();
                that.mainButton.trigger(FOCUS);
            } else if (ev.keyCode === keys.DOWN) {
                findFocusableSibling(li, NEXT).trigger(FOCUS);
            } else if (ev.keyCode === keys.UP) {
                findFocusableSibling(li, PREV).trigger(FOCUS);
            } else if (!li.is(DOT + DISABLEDSTATE) && (ev.keyCode === keys.SPACEBAR || ev.keyCode === keys.ENTER)) {
                li.trigger(CLICK);
            } else if (ev.keyCode === keys.HOME) {
                that.list.find(":kendoFocusable")
                    .filter(DOT + cssClasses.menuItem)
                    .first().trigger(FOCUS);
            } else if (ev.keyCode === keys.END) {
                that.list.find(":kendoFocusable")
                    .filter(DOT + cssClasses.menuItem)
                    .last().trigger(FOCUS);
            }
        },

        _click: function(ev) {
            var that = this,
                target = $(ev.target).closest(DOT + cssClasses.menuItem),
                id = target.attr(ID);

            if (that._clickHandlers[id]) {
                that._clickHandlers[id](ev);
            }

            that.trigger(MENU_CLICK, { id: id, target: target, type: "menu-click", originalEvent: ev });
        },

        toggle: function() {
            this._popup.toggle();
        },

        enable: function(enable, items) {
            var that = this;

            if (!items || !items.length) {
                items = that.items();
            } else {
                items = that.list.find(items);
            }

            items.toggleClass(DISABLEDSTATE, !enable);

            if (enable) {
                items.removeAttr(ARIA_DISABLED);
            } else {
                items.attr(ARIA_DISABLED, !enable);
            }
        },


        _hide: function(hidden, items) {
            var that = this;

            if (!items || !items.length) {
                items = that.items();
            } else {
                items = that.list.find(items);
            }

            items.toggleClass(HIDDEN, hidden);
        },

        hide: function(items) {
            this._hide(true, items);
        },

        show: function(items) {
            this._hide(false, items);
        },

        close: function() {
            this._popup.close();
        },

        items: function() {
            return this.list.children(DOT + cssClasses.menuItem);
        },

        destroyPopup: function() {
            var that = this;

            if (that._popup) {
                that._popup.destroy();
                that._popup = null;

                that.list.off(NS);
                that.list.remove();
                that.list = null;
            }
        },

        destroy: function() {
            var that = this;

            delete that._clickHandlers;

            that.destroyPopup();
            that.mainButton.off(NS);
            Widget.fn.destroy.call(that);
        }
    });

    kendo.cssProperties.registerPrefix("ButtonMenu", "k-menu-group-");

    ui.plugin(ButtonMenu);

})(window.kendo.jQuery);

