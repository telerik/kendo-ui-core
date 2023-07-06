import "./kendo.core.js";
import "./kendo.popup.js";
import "./kendo.icons.js";
import "./kendo.html.button.js";

var __meta__ = {
    id: "actionsheet",
    name: "ActionSheet",
    category: "web", // suite
    description: "The ActionSheet widget displays a set of choices related to a task the user initiates.",
    depends: ["core", "popup", "icons", "html.button"] // dependencies
};

(function($, undefined) {
    var kendo = window.kendo;
    var encode = kendo.htmlEncode;
    var Widget = kendo.ui.Widget;
    var ui = kendo.ui;
    var ns = ".kendoActionSheet";
    var DOT = ".";
    var Popup = ui.Popup;
    var keys = kendo.keys;
    var isFunction = kendo.isFunction;
    var TabKeyTrap = Popup.TabKeyTrap;
    var DOCUMENT_ELEMENT = $(document.documentElement);
    var MOUSEDOWN = "down";
    var OPEN = "open";
    var CLOSE = "close";
    var ACTIVATE = "activate";
    var DEACTIVATE = "deactivate";
    var FOCUSABLE = ":kendoFocusable:not([tabindex='-1'])";
    var ACTION_SHEET_CONTAINER = "k-actionsheet-container";
    var OVERLAY = "k-overlay";
    var ACTION_SHEET = "k-actionsheet";
    var ACTION_SHEET_ADAPTIVE = "k-adaptive-actionsheet";
    var ACTION_SHEET_BOTTOM = "k-actionsheet-bottom";
    var ACTION_SHEET_FULLSCREEN = "k-actionsheet-fullscreen";
    var ACTIONABLE_BUTTON_SELECTOR = `.k-actionsheet-item:not(.${STATEDISABLED}),.k-actions .k-button[ref-actionsheet-action-button]:not(.${STATEDISABLED})`;
    var STATEDISABLED = "k-disabled";
    var ARIA_DISABLED = "aria-disabled";
    var DISABLED = "disabled";
    var HIDDEN = "k-hidden";
    var ACTIONSHEET_TITLE_ID = kendo.guid();
    var extend = $.extend;
    var template = kendo.template;
    var CLICK = "click";
    var KEYDOWN = "keydown";
    var hexColor = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
    var HEADER_TEMPLATE = (options) =>
        `<div class="k-text-center k-actionsheet-titlebar" >` +
            (options.title ?
                '<div class="k-actionsheet-titlebar-group k-hbox">' +
                    `<div id="${ACTIONSHEET_TITLE_ID}" class="k-actionsheet-title">` +
                        `<div class="k-text-center">${options.title}</div>` +
                        (options.subtitle ? `<div class="k-actionsheet-subtitle k-text-center">${options.subtitle || ""}</div>` : "") +
                    '</div>' +
                    (options.closeButton ?
                    '<div class="k-actionsheet-actions">' +
                        kendo.html.renderButton(`<button ${kendo.attr("ref-actionsheet-close-button")}></button>`, { icon: "x", fillMode: "flat", size: "large" }) +
                    '</div>'
                    : "") +
                '</div>'
            : "") +
        '</div>';
    var ITEM_TEMPLATE = ({ disabled, icon, text, description }) =>
                    `<span role="button" tabindex="0" class="k-actionsheet-item ${disabled ? STATEDISABLED : ""}">` +
                        `<span class="k-actionsheet-action">` +
                            (icon ? `<span class="k-icon-wrap">${icon}</span>` : "") +
                            `<span class="k-actionsheet-item-text">` +
                                `<span class="k-actionsheet-item-title">${encode(text)}</span>` +
                                `${description ? '<span class="k-actionsheet-item-description">' + encode(description) + '</span>' : ''}` +
                            '</span>' +
                        '</span>' +
                    '</span>';
    var SEPARATOR = '<hr class="k-hr" />';
    var defaultItem = {
        text: "",
        description: "",
        iconClass: "",
        iconSize: 0,
        iconColor: "",
        click: $.noop,
        group: "top",
        disabled: false
    };

    var defaultActionButton = {
        text: "",
        icon: "",
        iconClass: "",
        click: $.noop,
        disabled: false
    };

    function contains(container, target) {
        if (!container || !target) {
            return false;
        }
        return container === target || $.contains(container, target);
    }

    function createIcon(data) {
        var result;
        var inlineStyles = {};

        if (!data.iconClass && !data.icon) {
            return '';
        }

        result = $(kendo.html.renderIcon({ icon: data.icon, iconClass: data.iconClass + " k-actionsheet-item-icon" }));

        if (data.iconColor && hexColor.test(data.iconColor)) {
            inlineStyles.color = data.iconColor;
        } else if (data.iconColor) {
            result.addClass("k-text-" + data.iconColor);
        }

        if (data.iconSize) {
            inlineStyles.fontSize = data.iconSize;
        }

        if (Object.keys(inlineStyles).length) {
            result.css(inlineStyles);
        }

        return result;
    }

    var ActionSheet = Widget.extend({
        init: function(element, options) {
            var that = this;
            options = options || {};

            Widget.fn.init.call(that, element, options);

            if (options.appendTo) {
                that.element.appendTo(options.appendTo);
            }

            that._hasItems = options.items && options.items.length;
            that._hasActionButtons = options.actionButtons && options.actionButtons.length;
            that._mapItems();
            that._mapActionButtons();
            that._wrapper();
            that._popup();
            that._createContent();
            that._createHeader();
            that._createFooter();
            that._applyAria();

            that._tabKeyTrap = new TabKeyTrap(that.wrapper);

            that.downEvent = kendo.applyEventMap(MOUSEDOWN, kendo.guid());
            that.clickEvent = kendo.applyEventMap(CLICK, kendo.guid());
            that._mousedownProxy = that._mousedown.bind(that);
            that._clickProxy = that._click.bind(that);
            that.wrapper.on(KEYDOWN + ns, that, that._keydown.bind(that));
        },

        events: [
            OPEN,
            CLOSE,
            ACTIVATE,
            DEACTIVATE
        ],

        options: {
            name: "ActionSheet",
            title: "",
            items: [],
            popup: null,
            fullscreen: false,
            footerTemplate: null,
            headerTemplate: null,
            contentTemplate: null,
            actionButtons: [],
            closeButton: false,
            adaptive: false,
            focusOnActivate: true
        },

        _mapItems: function() {
            var that = this;

            if (!that._hasItems) {
                return;
            }

            that.options.items = that.options.items.map(defaultItemsMapper);
        },

        _mapActionButtons: function() {
            var that = this;

            if (!that._hasActionButtons) {
                return;
            }

            that.options.actionButtons = that.options.actionButtons.map(defaultActionButtonsMapper);
        },

        _wrapper: function() {
            var that = this;
            var element = that.element;
            var wrapper;

            var positionClass = that.options.fullscreen == true ? ACTION_SHEET_FULLSCREEN : ACTION_SHEET_BOTTOM;

            element.addClass(ACTION_SHEET + " " + positionClass + (that.options.adaptive ? " " + ACTION_SHEET_ADAPTIVE : " k-actionsheet-jq"));
            that.wrapper = wrapper = element.wrap("<div class='" + ACTION_SHEET_CONTAINER + " " + HIDDEN + "'></div>").parent();
            wrapper.prepend($('<div></div>').addClass(OVERLAY));
        },

        _applyAria: function() {
            var that = this;
            var element = that.element;
            var actionsheetTitleId = that.wrapper.find(".k-actionsheet-title").attr("id");

            element.attr({
                role: "dialog",
                "aria-modal": true,
                "aria-labelledby": that.options.title ? actionsheetTitleId : null
            });
        },

        _popup: function() {
            var that = this;
            var options = that.options;

            var popupAnimation = !options.adaptive ? false :
                {
                    open: {
                        effects: "slideIn:up",
                        transition: true,
                        duration: 200
                    }
                };

            options.open = null;
            options.close = null;
            options.activate = null;
            options.deactivate = null;

            that.popup = new Popup(that.element, extend(options.popup,
                options,
                {
                    name: "Popup",
                    isRtl: kendo.support.isRtl(options.anchor),
                    omitOriginOffsets: true,
                    appendTo: that.wrapper,
                    modal: true,
                    animation: popupAnimation,
                    position: "top center",
                    anchor: options.anchor || that.wrapper
                }));

            if (options.focusOnActivate) {
                that.popup.bind(ACTIVATE, that._openHandler.bind(that));
            }

            that.popup.bind(ACTIVATE, (ev) => {
                that.trigger(ACTIVATE, ev);
            });

            that.popup.bind(DEACTIVATE, (ev) => {
                that.wrapper.addClass(HIDDEN);
                DOCUMENT_ELEMENT.off(that.downEvent, that._mousedownProxy);
                DOCUMENT_ELEMENT.off(that.clickEvent, that._clickProxy);
                that.trigger(DEACTIVATE, ev);
            });

            that.popup.bind(OPEN, (ev) => {
                that.trigger(OPEN, ev);
            });

            that.popup.bind(CLOSE, (ev) => {
                var closeButtonPressed = that._closeButtonPressed;
                that._closeButtonPressed = false;
                that.trigger(CLOSE, extend({}, ev, {
                    closeButton: closeButtonPressed
                }));
            });
        },

        _createHeader: function() {
            var that = this;
            var options = that.options;

            if (!options.title && !options.headerTemplate) {
                return;
            }

            that.element.prepend(template(options.headerTemplate || HEADER_TEMPLATE)(options));
        },

        _items: function() {
            var that = this;

            if (!that._hasItems) {
                return;
            }

            var groupedItems = that.options.items.reduce((itemsByGroup, currentItem) => {
                const group = currentItem["group"] || "top";
                itemsByGroup[group] = itemsByGroup[group] || [];
                itemsByGroup[group].push(currentItem);
                return itemsByGroup;
            }, new Map());

            var topItems = groupedItems["top"];
            var bottomItems = groupedItems["bottom"];

            that._createItems(topItems);

            if (topItems && topItems.length && bottomItems && bottomItems.length) {
                that._content.append(SEPARATOR);
            }

            that._createItems(bottomItems);
        },

        _createContent: function() {
            var that = this;
            var options = that.options;
            that.element.wrapInner($("<div class='k-actionsheet-content'></div>"));
            var contentContainer = that._content = that.element.find(".k-actionsheet-content");

            if (that._hasItems) {
                contentContainer.empty();
                that._items();
                return;
            }

            if (options.contentTemplate || options.hideOverflowContent) {
                contentContainer.addClass("!k-overflow-hidden");
            }
            if (options.contentTemplate) {
                contentContainer.html(template(options.contentTemplate)(options));
            }
        },

        _createItems: function(items) {
            var that = this;
            var idx;
            var item;
            var itemTemplate;
            var itemElement;
            var contentContainer = that._content;
            var itemsContainer = $("<div class='k-list-ul' role='group'></div>");
            var icon;

            if (!items || !items.length) {
                return;
            }

            contentContainer.append(itemsContainer);
            itemTemplate = template(ITEM_TEMPLATE);

            for (idx = 0; idx < items.length; idx++) {
                item = items[idx];
                icon = createIcon(item);
                itemElement = $(itemTemplate(extend({}, item, { icon: icon && icon.prop('outerHTML') })));
                itemsContainer.append(itemElement);

                if (item.click) {
                    itemElement.data("action", item.click);
                }
            }
        },

        _createActionButtons: function() {
            var that = this;
            var options = that.options;
            var actionButtons = options.actionButtons;
            var actionsContainer = that._footer;
            var actionButtonElement;

            for (var i = 0; i < actionButtons.length; i++) {
                var action = actionButtons[i];
                var enable = action.disabled !== true;
                actionButtonElement = $(kendo.html.renderButton(`<button ref-actionsheet-action-button>${action.text || ""}</button>`, $.extend({ size: "large" }, action)));
                actionsContainer.append(actionButtonElement);
                actionButtonElement.toggleClass(STATEDISABLED, !enable);
                actionButtonElement.attr(DISABLED, !enable);

                if (enable) {
                    actionButtonElement.removeAttr(ARIA_DISABLED);
                } else {
                    actionButtonElement.attr(ARIA_DISABLED, !enable);
                }

                if (action.click) {
                    actionButtonElement.data("action", action.click);
                }
            }
        },

        _createFooter: function() {
            var that = this;
            var options = that.options;
            var actionsContainer;

            if (!that._hasActionButtons && !options.footerTemplate) {
                return;
            }

            actionsContainer = that._footer = $("<div class='k-actionsheet-footer'></div>");
            actionsContainer.insertAfter(that._content);

            if (that._hasActionButtons) {
                actionsContainer.addClass("k-actions k-actions-stretched k-actions-horizontal");
                that._createActionButtons();
                return;
            }

            if (options.footerTemplate) {
                that._footer.append(template(options.footerTemplate)(options));
            }
        },

        destroy: function() {
            var that = this;
            that.close();
            Widget.fn.destroy.call(that);
            that._content = null;
            that._footer = null;
            that._header = null;
            that.element.off(ns);
            that.wrapper.off(ns);
            that.popup.destroy();
        },

        open: function(options) {
            var that = this;

            that.altTarget = options && options.altTarget;

            that.wrapper.removeClass(HIDDEN);
            that._elementHeight = that._elementHeight || that.element.outerHeight();

            if (that.options.adaptive) {
                that.wrapper.width("100%");
            }

            that.popup.open("auto", 0);
            that.popup.wrapper.find(">.k-child-animation-container").css({ bottom: 0, width: "100%" });

            DOCUMENT_ELEMENT.off(that.downEvent, that._mousedownProxy)
                .on(that.downEvent, that._mousedownProxy);

            DOCUMENT_ELEMENT.off(that.clickEvent, that._clickProxy)
                .on(that.clickEvent, that._clickProxy);

            that._tabKeyTrap.trap();
        },

        visible: function() {
            return this.popup.visible();
        },

        toggle: function() {
            !this.visible() ? this.open() : this.close();
        },

        fullscreen: function(isFullScreen) {
            var that = this;

            that.element.toggleClass(ACTION_SHEET_FULLSCREEN, isFullScreen === true);
            that.element.toggleClass(ACTION_SHEET_BOTTOM, isFullScreen !== true);
            that.element.closest(".k-child-animation-container").css({ height: isFullScreen ? "100%" : "auto" });
        },

        close: function() {
            var that = this;

            that.popup.close();
        },

        position: $.noop,

        _focusFirstFocusableElement: function() {
            var that = this;
            var focusableElements = that.element.find(FOCUSABLE);
            var firstFocusableElement = focusableElements.first();

            if (firstFocusableElement.length) {
                firstFocusableElement.trigger("focus");
            }
        },

        _focusLastFocusableElement: function() {
            var that = this;
            var focusableElements = that.element.find(FOCUSABLE);
            var lastFocusableElement = focusableElements.last();

            if (lastFocusableElement.length) {
                lastFocusableElement.trigger("focus");
            }
        },

        _openHandler: function() {
            var that = this;
            if (that._hasItems) {
                var firstItem = that._content.find(".k-actionsheet-item")[0];
                if (firstItem) {
                    firstItem.focus();
                }
            } else {
                that._focusFirstFocusableElement();
            }
        },

        _isActionableButton: function(target) {
            return $(target).closest(ACTIONABLE_BUTTON_SELECTOR).length > 0;
        },

        _triggerAction: function(e) {
            var that = this;
            var action = $(e.target).closest(ACTIONABLE_BUTTON_SELECTOR).data("action");
            if (isFunction(action)) {
                action(e);
            }

            if (!e.isDefaultPrevented()) {
                that.close();
            }
        },

        _keydown: function(e) {
            var that = this;
            var keys = kendo.keys;
            var keyCode = e.keyCode;
            var target = $(e.target);

            if (keyCode == keys.ESC) {
                e.stopPropagation();
                that.close();
            } else if (that._isActionableButton(target) && isButtonKeyTrigger(e)) {
                that._triggerAction(e);
            } else if (e.keyCode === kendo.keys.TAB) {
                var allFocusables = this.wrapper.find(FOCUSABLE);
                var firstFocusable = allFocusables.first();
                var lastFocusable = allFocusables.last();
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable[0]) {
                        lastFocusable.trigger("focus");
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable[0]) {
                        firstFocusable.trigger("focus");
                        e.preventDefault();
                    }
                }
            }
        },

        _click: function(e) {
            var that = this;
            var target = kendo.eventTarget(e);

            if (that._isActionableButton(target)) {
                that._triggerAction(e);
            }
        },

        _mousedown: function(e) {
            var that = this;
            var container = that.element[0];
            var target = kendo.eventTarget(e);

            if (that.altTarget && that.altTarget.is($(target))) {
                return;
            }

            if (!contains(container, target) || $(target).closest(`[${kendo.attr("ref-actionsheet-close-button")}]`, $(container).find("k-actionsheet-titlebar")).length > 0) {
                that._closeButtonPressed = true;
                that.close();
            }
        }
    });

    function isButtonKeyTrigger(e) {
        return e.keyCode == keys.ENTER || e.keyCode == keys.SPACEBAR;
    }

    function defaultItemsMapper(item) {
        return extend({}, defaultItem, item);
    }

    function defaultActionButtonsMapper(actionButton) {
        return extend({}, defaultActionButton, actionButton);
    }

    ui.plugin(ActionSheet);

})(window.kendo.jQuery);
export default kendo;

