import "./kendo.core.js";
import "./kendo.icons.js";
import "./kendo.button.js";

export const __meta__ = {
    id: "actionsheet.view",
    name: "ActionSheet View",
    category: "web",
    description: "The ActionSheet View.",
    depends: ["core", "icons", "button"]
};

(function($) {
    const encode = kendo.htmlEncode;
    const Widget = kendo.ui.Widget;
    const template = kendo.template;
    const extend = $.extend;
    const ACTIONSHEET_TITLE_ID = kendo.guid();
    const STATEDISABLED = "k-disabled";
    const ARIA_DISABLED = "aria-disabled";
    const DISABLED = "disabled";
    const hexColor = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
    const ACTIONSHEET_VIEW = "k-actionsheet-view";
    const ACTIONSHEET_CONTENT = "k-actionsheet-content";

    const HEADER_TEMPLATE = (options) => {
        const startButtonHtml = options.startButton ?
            '<div class="k-actionsheet-actions">' +
                kendo.html.renderButton(`<button ${kendo.attr("ref-actionsheet-start-button")} aria-label="${options.startButton.text || "Start"}"></button>`, { icon: "chevron-left", fillMode: "flat", size: "large", ...options.startButton }) +
            '</div>' : "";

        const closeButtonHtml = options.closeButton ?
            '<div class="k-actionsheet-actions">' +
                kendo.html.renderButton(`<button ${kendo.attr("ref-actionsheet-close-button")}></button>`, { icon: "x", fillMode: "flat", size: "large" }) +
            '</div>' : "";

        const subtitleHtml = options.subtitle || options.subtitle === "" ? `<div class="k-actionsheet-subtitle k-text-center">${options.subtitle || ""}</div>` : "";

        return `<div class="k-text-center k-actionsheet-titlebar" >` +
            (options.title || options.title === "" ?
                '<div class="k-actionsheet-titlebar-group k-hbox">' +
                    startButtonHtml +
                    `<div id="${ACTIONSHEET_TITLE_ID}" class="k-actionsheet-title">` +
                        `<div class="k-text-center">${options.title}</div>` +
                        subtitleHtml +
                    '</div>' +
                    (options.closeButton ?
                    '<div class="k-actionsheet-actions">' +
                        kendo.html.renderButton(`<button ${kendo.attr("ref-actionsheet-close-button")} aria-label="${options.closeButton.text || "Close"}"></button>`, { icon: "x", fillMode: "flat", size: "large", ...options.closeButton }) +
                    '</div>'
                    : "") +
                '</div>'
            : "") +
        '</div>';
    };
    const ITEM_TEMPLATE = ({ disabled, icon, text, description }) =>
                    `<span role="button" tabindex="0" class="k-actionsheet-item ${disabled ? STATEDISABLED : ""}">` +
                        `<span class="k-actionsheet-action">` +
                            (icon ? `<span class="k-icon-wrap">${icon}</span>` : "") +
                            `<span class="k-actionsheet-item-text">` +
                                `<span class="k-actionsheet-item-title">${encode(text)}</span>` +
                                `${description ? '<span class="k-actionsheet-item-description">' + encode(description) + '</span>' : ''}` +
                            '</span>' +
                        '</span>' +
                    '</span>';
    const SEPARATOR = '<hr class="k-hr" />';
    const defaultItem = {
        text: "",
        description: "",
        iconClass: "",
        iconSize: 0,
        iconColor: "",
        click: $.noop,
        group: "top",
        disabled: false
    };

    const defaultActionButton = {
        text: "",
        icon: "",
        iconClass: "",
        click: $.noop,
        disabled: false
    };

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
            inlineStyles.fontSize = data.iconSize + "px";
        }

        if (Object.keys(inlineStyles).length) {
            result.css(inlineStyles);
        }

        return result;
    }

    function defaultItemsMapper(item) {
        return extend({}, defaultItem, item);
    }

    function defaultActionButtonsMapper(actionButton) {
        return extend({}, defaultActionButton, actionButton);
    }

    const ActionSheetView = Widget.extend({
        init: function(element, options) {
            const that = this;
            options = options || {};
            Widget.fn.init.call(that, element, options);

            options = extend(true, {}, that.options, options);

            that._hasItems = options.items && options.items.length;
            that._hasActionButtons = options.actionButtons && options.actionButtons.length;
            that.index = options.index || 1;
            that.ref = that.options.ref;
            that._mapItems();
            that._mapActionButtons();
            that._createContent();
            that._createHeader();
            that._createFooter();
            that._wrapInView();
        },

        options: {
            id: "actionsheet-view",
            name: "ActionSheetView",
            headerTemplate: null,
            contentTemplate: null,
            footerTemplate: null,
            actionButtons: [],
            title: null,
            items: [],
            actionButtonsAlignment: "stretched",
            actionButtonsOrientation: "horizontal",
            closeButton: false,
            startButton: false,
            ref: "actionsheet-view",
            addAnimationClass: false,
        },

        _hasOtherView: function() {
            const that = this;
            const views = that.element.children(`.${ACTIONSHEET_VIEW}`);

            return views.length && views.last();
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

        _createContent: function(viewTemplate) {
            const that = this;
            const options = that.options;
            const contentElement = $(`<div class='${ACTIONSHEET_CONTENT}'></div>`);
            const previousView = that._hasOtherView();

            if (previousView && previousView.length) {
                that.element.append(contentElement);
            } else {
                that.element.wrapInner(contentElement);
            }
            const contentContainer = that._content = that.element.children("." + ACTIONSHEET_CONTENT);

            if (that._hasItems) {
                contentContainer.empty();
                that._items();
                return;
            }

            if (options.contentTemplate || viewTemplate) {
                contentContainer.html(template(viewTemplate || options.contentTemplate)(options));
            }
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

        _createHeader: function() {
            var that = this;
            var options = that.options;

            if ((!options.title && options.title !== "") && !options.headerTemplate) {
                return;
            }

            const previousView = that._hasOtherView();

            that._header = $(template(options.headerTemplate || HEADER_TEMPLATE)(options));

            if (previousView && previousView.length) {
                that._content.before(that._header);
            } else {
                that.element.prepend(that._header);
            }
        },

        _createFooter: function(viewTemplate) {
            const that = this;
            const options = that.options;
            let actionsContainer;

            if (!that._hasActionButtons && !options.footerTemplate && !viewTemplate) {
                return;
            }

            actionsContainer = that._footer = $("<div class='k-actionsheet-footer'></div>");
            actionsContainer.insertAfter(that._content);

            if (that._hasActionButtons) {
                actionsContainer.addClass(`k-actions k-actions-${options.actionButtonsAlignment} k-actions-${options.actionButtonsOrientation}`);
                that._createActionButtons();
                return;
            }

            if (options.footerTemplate || viewTemplate) {
                that._footer.append(template(viewTemplate || options.footerTemplate)(options));
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

        _wrapInView: function() {
            const that = this;

            if (that.wrapper && that.wrapper.hasClass(ACTIONSHEET_VIEW)) {
                return;
            }

            that.wrapper = that._content
                .add(that._footer)
                .add(that._header)
                .wrapAll($(`<div ref-${that.options.ref} class='${ACTIONSHEET_VIEW}${that.options.addAnimationClass ? " k-actionsheet-view-animated" : ""}'></div>`)).parent();
        },

        destroy: function() {
            const that = this;
            Widget.fn.destroy.call(that);

            if (that._content) {
                that._content.remove();
                that._content = null;
            }

            if (that._footer) {
                that._footer.remove();
                that._footer = null;
            }

            if (that._header) {
                that._header.remove();
                that._header = null;
            }

            if (that.wrapper) {
                that.wrapper.remove();
                that.wrapper = null;
            }
        },
    });
    kendo.ui.plugin(ActionSheetView);
})(window.kendo.jQuery);
export default kendo;