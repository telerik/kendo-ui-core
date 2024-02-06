import "./kendo.core.js";
import "./kendo.splitbutton.js";
import "./kendo.dropdownbutton.js";
import "./kendo.buttongroup.js";
import "./kendo.menu.js";
import "./kendo.icons.js";

var __meta__ = {
    id: "toolbar",
    name: "ToolBar",
    category: "web",
    description: "The ToolBar widget displays one or more command buttons divided into groups.",
    depends: [ "core", "splitbutton", "dropdownbutton", "buttongroup", "menu", "icons" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        isFunction = kendo.isFunction,
        keys = kendo.keys,
        outerWidth = kendo._outerWidth,
        ns = ".kendoToolBar",
        TOOLBAR = "toolbar",
        KTOOLBAR = "k-toolbar",
        KBUTTON = "k-button",
        TOGGLE_BUTTON = "k-toggle-button",
        BUTTON_GROUP = "k-button-group",
        SPLIT_BUTTON = "k-split-button",
        MENU_BUTTON = "k-menu-button",
        POPUP_BUTTON = "k-popup-button",
        KSEPARATOR = "k-separator",
        SPACER_CLASS = "k-spacer",
        UPLOAD_BUTTON = "k-upload-button",
        POPUP = "k-popup",
        RESIZABLE_TOOLBAR = "k-toolbar-resizable",
        STATE_SELECTED = "k-selected",
        STATE_DISABLED = "k-disabled",
        STATE_HIDDEN = "k-hidden",
        FORCE_HIDDEN = "k-force-hidden",
        GROUP_START = "k-group-start",
        GROUP_END = "k-group-end",
        MENU_LINK = "k-menu-link",
        MENU_ITEM = "k-menu-item",
        OVERFLOW_ANCHOR = "k-toolbar-overflow-button",
        TEMPLATE_ITEM = "k-toolbar-item",
        TOOLBAR_TOOL = "k-toolbar-tool",
        MENU_LINK_TOGGLE = "k-menu-link-toggle",
        DROPDOWNLIST = "k-dropdownlist",
        INPUT_BUTTON = "k-input-button",
        MENU_POPUP = "k-menu-popup",
        KFOCUS = "k-focus",
        SINGLE = "single",
        MULTIPLE = "multiple",
        NONE = "none",
        TABINDEX_MINUS_1 = "[tabindex=-1]",

        ARIA_DISABLED = "aria-disabled",
        ARIA_CHECKED = "aria-checked",
        ARIA_LABEL = "aria-label",

        CHANGE = "change",
        CLICK = "click",
        TOGGLE = "toggle",
        OPEN = "open",
        CLOSE = "close",
        FOCUS = "focus",
        FOCUSIN = "focusin",
        FOCUSOUT = "focusout",
        KEYDOWN = "keydown",

        SPACER = "spacer",
        PRIMARY = "primary",
        ROLE = "role",
        SEPARATOR = "separator",
        OVERFLOW = "overflow",
        TABINDEX = "tabindex",
        INPUT = "input",
        SELECT = "select",
        HIDDEN = "hidden",
        GROUP = "group",
        DATA_UID = "data-uid",
        DATA_PARENTUID = "data-parentuid",
        DATA_ROLE_SELECTOR = "[data-role]",
        DATA_TOGGLE_SELECTOR = "[data-toggle]",
        DATA_ROLE_BUTTONMENU = "[data-role=buttonmenu]",

        KENDO_FOCUSABLE = ":kendoFocusable",

        OVERFLOW_OPEN = "overflowOpen",
        OVERFLOW_CLOSE = "overflowClose",
        OVERFLOW_NEVER = "never",
        OVERFLOW_AUTO = "auto",
        OVERFLOW_ALWAYS = "always",

        KENDO_UID_ATTR = kendo.attr("uid"),

        NOTHING = "",
        DASH = "_",
        EMPTY = " ",
        DOT = ".",
        COMMA = ",",
        ID = "id",
        UID = "uid",
        NBSP = "&nbsp;",

        K_DROP_DOWN_BUTTON = "kendoDropDownButton",
        K_SPLIT_BUTTON = "kendoSplitButton",
        K_TOGGLE_BUTTON = "kendoToggleButton",
        K_BUTTON_GROUP = "kendoButtonGroup";

        kendo.toolbar = {};

    var WIDGET_TYPES = {
        button: "Button",
        splitButton: "SplitButton",
        dropDownButton: "DropDownButton",
        buttonGroup: "ButtonGroup",
        popupButton: "Button",
        open: "Button"
    };

    var TOOLBAR_TOOLS_CLASSES = {
        Button: "k-toolbar-button",
        ToggleButton: "k-toolbar-toggle-button",
        SplitButton: "k-toolbar-split-button",
        DropDownButton: "k-toolbar-menu-button",
        ButtonGroup: "k-toolbar-button-group",
        ColorPicker: "k-toolbar-color-picker",
        Switch: "k-toolbar-switch"
    };

    var SAFE_COMPONENTS = [ "Button", "SplitButton", "DropDownButton", "ButtonGroup", "Switch", "ColorPicker" ];

    var POPUP_BUTTON_TEMPLATE = `<button class="k-popup-button"><span class="k-button-icon k-icon"></span><span class="k-button-text">${kendo.ui.icon("caret-alt-down")}</span></button>`;
    var TEMPLATE_WRAPPER = "<div class='k-toolbar-item' aria-keyshortcuts='Enter'></div>";
    var CUSTOM_WIDGET_WRAP = "<span class='k-toolbar-tool k-toolbar-item' tabindex='0'>";
    var SEPARATOR_OVERFLOW_EL = "<li role='separator' class='k-separator k-menu-separator k-hidden'></li>";
    var SEPARATOR_EL = '<div role="separator">&nbsp;</div>';
    var SPACER_EL = '<div>&nbsp;</div>';

    var ToolBar = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            options = this.options;

            this._isRtl = kendo.support.isRtl(element);
            this.uid = kendo.guid();

            element = this.wrapper = this.element;
            element.attr(KENDO_UID_ATTR, this.uid);
            element.addClass(KTOOLBAR);
            element.attr(ROLE, TOOLBAR);

            if (options.resizable) {
                this._resizable();
            }

            if (options.tools && options.tools.length > 0) {
                options.items = this._extendToolsOptions();
            }

            if (options.items && options.items.length) {
                this._items();
            }

            this._attachEvents();
            this._tabIndex();
            this._applyCssClasses();

            if (options.resizable) {
                this._shrink(this.element.innerWidth());
                this.overflowAnchor.appendTo(this.wrapper);
                this._toggleOverflowAnchor();
            }

            kendo.notify(this);
        },

        events: [
            CLICK,
            TOGGLE,
            OPEN,
            CLOSE,
            OVERFLOW_OPEN,
            OVERFLOW_CLOSE,
            CHANGE
        ],

        options: {
            name: "ToolBar",
            items: [],
            resizable: true,
            navigateOnTab: false,
            evaluateTemplates: false,
            size: "medium"
        },

        destroy: function() {
            var that = this;

            if (that.options.resizable) {
                kendo.unbindResize(that._resizeHandler);
                that.overflowMenu.destroy();
            }

            that.element.find(DOT + POPUP_BUTTON).each((i, el) => {
                var button = $(el).getKendoButton(),
                    popup, popupWrapper, chooser;

                if (button) {
                    chooser = button.chooser;
                    popup = button.popup;
                    popupWrapper = popup.wrapper;

                    chooser.destroy();
                    popup.destroy();
                    popupWrapper.remove();
                }
            });

            kendo.destroy(that.element.children());

            Widget.fn.destroy.call(that);
        },

        add: function(options) {
            this._add(options);

            if (this.options.resizable) {
                this.resize(true);
            }
        },

        enable: function(candidate, enable) {
            var that = this,
                uid = this._getUid(candidate),
                item = this._getItem(candidate, uid),
                component = item.component,
                buttonPopup, children, focused, wrapper;

            if (typeof enable == "undefined") {
                enable = true;
            }

            if (item.component) {
                wrapper = component.wrapper;
                focused = wrapper.hasClass(KFOCUS) || wrapper.is(":focus");
                component.enable(enable);
                wrapper.find("[disabled]").removeAttr("disabled");
                wrapper.removeAttr("disabled");

                if (focused) {
                    wrapper.addClass(KFOCUS).trigger(FOCUS);
                }
            } else if (item.buttonsPopupItem.length > 0) {
                buttonPopup = kendo.widgetInstance(item.buttonsPopupItem.closest(DOT + MENU_POPUP));
                buttonPopup.enable(enable, item.buttonsPopupItem);
            }

            if (this.overflowMenu) {
                this.overflowMenu.enable(item.menuItem, enable);

                children = this.overflowMenu.element
                    .find("[data-parentuid=" + uid + "]");

                children.each((i, el) => {
                    that.overflowMenu.enable($(el), enable);
                });
            }
        },

        getSelectedFromGroup: function(groupName) {
            return this.element.find(DOT + TOGGLE_BUTTON + "[data-group='" + groupName + "']").filter(DOT + STATE_SELECTED);
        },

        hide: function(candidate) {
            var that = this,
                uid = this._getUid(candidate),
                item = that._getItem(candidate, uid),
                elements, parentButtonGroup, children, parentGroupEl;

            if (!item) {
                return;
            }

            elements = item.templateEl.add(item.toolbarEl).add(item.buttonsPopupItem).add(item.menuItem);

            elements.addClass(STATE_HIDDEN);
            elements.addClass(FORCE_HIDDEN);

            if (this.overflowMenu) {
                children = this.overflowMenu.element
                    .find("[data-parentuid=" + uid + "]");

                children.each((i, el) => {
                    $(el).addClass(FORCE_HIDDEN);
                    $(el).addClass(STATE_HIDDEN);
                });
            }

            parentGroupEl = item.toolbarEl.parent().closest(DOT + BUTTON_GROUP);
            parentButtonGroup = parentGroupEl.data(K_BUTTON_GROUP);

            if (parentButtonGroup) {
                if (parentGroupEl.children(":not(.k-hidden)").length === 0) {
                    that.hide(parentGroupEl);
                } else {
                    that._groupVisibleButtons(parentGroupEl);
                }
            }

            if (elements.find("[tabindex=0]").addBack("[tabindex=0]").length > 0) {
                this._resetTabIndex(that._getAllItems().first());
            }

            if (this.options.resizable) {
                this.resize(true);
            }
        },

        remove: function(candidate) {
            var that = this,
                uid = this._getUid(candidate),
                item = this._getItem(candidate, uid),
                buttonGroup, children;

            if (!item) {
                return;
            }

            if (item.component) {
                buttonGroup = item.toolbarEl.closest('[data-role="buttongroup"]');
                if (buttonGroup.length > 0 && item.toolbarEl.siblings().length === 0) {
                    buttonGroup.data(K_BUTTON_GROUP).destroy();
                    buttonGroup.remove();

                    item.toolbarEl = $(NOTHING);
                } else {
                    item.component.destroy();
                }
            }

            if (item.templateEl.length > 0) {
                item.templateEl.remove();
            } else if (item.toolbarEl.length > 0) {
                item.toolbarEl.remove();
            }

            if (item.buttonsPopupItem.length > 0) {
                item.buttonsPopupItem.remove();
            }

            if (this.overflowMenu) {
                this.overflowMenu.remove(item.menuItem);

                children = this.overflowMenu.element
                    .find("[data-parentuid=" + uid + "]");

                children.each((i, el) => {
                    that.overflowMenu.remove($(el));
                });
            }

            if (this.options.resizable) {
                this.resize(true);
            }
        },

        show: function(candidate) {
            var that = this,
                uid = this._getUid(candidate),
                item = this._getItem(candidate, uid),
                elements, parentButtonGroup, children, parentGroupEl;

            if (!item) {
                return;
            }

            elements = item.templateEl.add(item.toolbarEl).add(item.buttonsPopupItem);
            elements.removeClass(FORCE_HIDDEN);
            elements.removeClass(STATE_HIDDEN);

            item.menuItem.removeClass(FORCE_HIDDEN);

            if (this.overflowMenu) {
                children = this.overflowMenu.element
                    .find("[data-parentuid=" + uid + "]");

                children.each((i, el) => {
                    $(el).removeClass(FORCE_HIDDEN);
                });
            }

            parentGroupEl = item.toolbarEl.parent().closest(DOT + BUTTON_GROUP);
            parentButtonGroup = parentGroupEl.data(K_BUTTON_GROUP);

            if (parentButtonGroup) {
                if (parentGroupEl.hasClass("k-hidden") && parentGroupEl.children(":not(.k-hidden)").length > 0) {
                    that.show(parentGroupEl);
                } else {
                    that._groupVisibleButtons(parentGroupEl);
                }
            }

            if (this.options.resizable) {
                this.resize(true);
            }
        },

        toggle: function(candidate, checked) {
            var item = this._getItem(candidate),
                element = item.toolbarEl,
                menuItem = item.menuItem,
                button, parentGroup, group, groupButtons;

            if (checked === undefined) {
                checked = true;
            }

            button = element.data(K_TOGGLE_BUTTON);

            if (!item.component && menuItem.find(DOT + MENU_LINK_TOGGLE).length === 0) {
                return;
            }

            group = element.data(GROUP);

            if (item.component) {
                parentGroup = element.closest(DOT + BUTTON_GROUP).data(K_BUTTON_GROUP);

                if (parentGroup) {
                    if (element.hasClass(STATE_SELECTED) !== checked) {
                        parentGroup._toggleIndex(element.index());
                    }
                }

                button.toggle(checked);

                if (checked) {
                    groupButtons = this.element.find("[data-group=" + group + "]");

                    groupButtons.each((i, el) => {
                        if (el !== element[0]) {
                            $(el).data(K_TOGGLE_BUTTON).toggle(false);
                        }
                    });
                }
            }

            if (menuItem) {
                menuItem
                    .attr(ARIA_CHECKED, checked)
                    .find(DOT + MENU_LINK_TOGGLE)
                    .toggleClass(STATE_SELECTED, checked);

                if (checked && this.overflowMenu) {
                    groupButtons = this.overflowMenu.element.find("[data-group=" + group + "]");

                    groupButtons.each((i, el) => {
                        if (el !== menuItem[0]) {
                            $(el)
                                .attr(ARIA_CHECKED, false)
                                .find(DOT + MENU_LINK_TOGGLE)
                                .removeClass(STATE_SELECTED);
                        }
                    });
                }
            }
        },

        toggleTools: function(conditions) {
            var that = this,
                tools = that.element.find(DATA_TOGGLE_SELECTOR),
                focusable = that.element.find(KENDO_FOCUSABLE).not(TABINDEX_MINUS_1);

            tools.each(function(index, elm) {
                var tool = $(elm),
                    widget = null,
                    condition = tool.data(TOGGLE),
                    toToggle = conditions && conditions[condition];

                if (tool.is(DATA_ROLE_SELECTOR)) {
                    widget = kendo.widgetInstance(tool);
                }

                if (widget && widget.enable) {
                    widget.enable(toToggle || false);
                } else {
                    that.enable(tool, toToggle);
                }
            });

            that.element.find(DATA_TOGGLE_SELECTOR + "[disabled]").removeAttr("disabled");

            that.element.find(KENDO_FOCUSABLE).not(TABINDEX_MINUS_1).attr("tabindex", -1);
            focusable.attr(TABINDEX, 0);
        },

        _add: function(options) {
            var processed = this._processOptions(options),
                template = processed.template,
                overflowTemplate = processed.overflowTemplate,
                type = WIDGET_TYPES[processed.type],
                element;

            if (template || overflowTemplate) {
                element = this._addTemplate(processed);
            } else if (kendo.ui[processed.component]) {
                element = this._addCustomWidget(processed);
            } else if (type) {
                element = this._addDefaultTool(type, processed);
            } else if (processed.type === SPACER) {
                this._addSpacer();
            } else if (processed.type === SEPARATOR) {
                this._addSeparator(processed);
            }

            if (element) {
                if (this.overflowAnchor) {
                    element.insertBefore(this.overflowAnchor);
                } else {
                    element.appendTo(this.element);
                }

                element.find("[disabled]").removeAttr("disabled");

                if (element.is("[disabled]")) {
                    element.removeAttr("disabled");
                }
            }
        },

        _addAttributes: function(options, element) {
            var attributes = options.attributes,
                classes = NOTHING;

            if (!attributes) {
                attributes = {};
            }

            if (options.hidden) {
                classes = STATE_HIDDEN + EMPTY + FORCE_HIDDEN;
            }

            if (options.align) {
                classes = classes + " k-align-" + options.align;
            }

            if (attributes) {
                if (attributes.class) {
                    classes = classes + EMPTY + attributes.class;
                    delete attributes.class;
                }

                element.attr(attributes);
            }

            element.addClass(classes);
            element.attr(KENDO_UID_ATTR, options.uid);

            if (options.id) {
                element.attr(ID, options.id);
            }
            if (options.overflow === OVERFLOW_NEVER) {
                element.attr("data-overflow", OVERFLOW_NEVER);
            }
        },

        _addCustomWidget: function(options) {
            var element = $(options.element || "<input>"),
                widget, result, classes;

            if (options.overflowComponent) {
                this._addMenuItem(options.overflowComponent.type, $.extend({}, options, options.overflowComponent));
            }

            if (options.attributes) {
                classes = options.attributes.class;
                delete options.attributes["class"];
                element.attr(options.attributes);
                delete options.attributes[ARIA_LABEL];
            }

            if (!options.componentOptions) {
                options.componentOptions = {};
            }

            options.componentOptions.size = this.options.size;

            widget = new kendo.ui[options.component](element, options.componentOptions);

            if (SAFE_COMPONENTS.indexOf(options.component) > -1) {
                widget.wrapper.addClass(TOOLBAR_TOOL + " " + TOOLBAR_TOOLS_CLASSES[options.component]);
                result = widget.wrapper;
            } else {
                result = (widget.wrapper || widget.element).wrap(CUSTOM_WIDGET_WRAP).parent();
            }

            if (options.attributes) {
                options.attributes.class = classes;
            }

            this._addAttributes(options, result);

            return result;
        },

        _addDefaultTool: function(component, options) {
            var element, op;

            if (options.overflow !== OVERFLOW_ALWAYS) {
                element = this._addToolbarTool(component, $.extend(true, {}, options));
            }

            if (this.overflowMenu && options.overflow !== OVERFLOW_NEVER) {
                if (options.overflowComponent) {
                    op = $.extend(true, {}, options, options.overflowComponent);
                    delete op["data-command"];
                    this._addMenuItem("Button", op);
                } else {
                    this._addMenuItem(component, $.extend(true, {}, options));
                }
            }

            return element;
        },

        _addMenuItem: function(component, options) {
            var that = this,
                selected = options.selected,
                menuitem;

            delete options.selected;

            if (options.id) {
                options.id = options.id + DASH + OVERFLOW;
            }
            if (options.showIcon === TOOLBAR) {
                delete options.imageUrl;
                delete options.icon;
            }

            if (options.showText === TOOLBAR) {
                if (!options.attributes) {
                    options.attributes = {};
                }

                options.attributes[ARIA_LABEL] = options.text;

                options.text = NOTHING;
            } else if (options.text === undefined || options.text === NOTHING) {
                options.text = NBSP;
                options.encoded = false;
            }

            that.overflowMenu.append(options);
            menuitem = that.overflowMenu.element.find(DOT + MENU_ITEM).last();

            if (options.icon) {
                menuitem.find(DOT + MENU_LINK).prepend(kendo.ui.icon(options.icon));
            }

            if (component === "ToggleButton" || (component === "Button" && options.togglable === true)) {
                menuitem.find(DOT + MENU_LINK).addClass(MENU_LINK_TOGGLE);

                if (selected) {
                    menuitem.find(DOT + MENU_LINK).addClass(STATE_SELECTED);
                }

                if (options.group) {
                    menuitem.attr("data-group", options.group);
                }
            } else if (options.menuButtons) {
                options.menuButtons.forEach((i) => {
                    i.overflow = options.overflow;
                    that._addMenuItem(null, i);
                });
            } else if (options.buttons) {
                menuitem.remove();
                menuitem = null;

                options.buttons.forEach((i) => {
                    var attributes = i.attributes;
                    i.overflow = options.overflow;
                    i.attributes = $.extend(attributes, options.attributes);

                    that._addMenuItem("Button", i);
                });
            }

            if (component === "DropDownButton") {
                menuitem.addClass(STATE_DISABLED);
                menuitem.attr(ARIA_DISABLED, true);
            }

            if (menuitem) {
                that._addAttributes(options, menuitem);

                if (options.overflow === OVERFLOW_AUTO) {
                    menuitem.addClass(STATE_HIDDEN);
                }

                if (options.click || options.toggle) {
                    that.overflowMenu.bind(SELECT, (e) => {
                        if (e.item === menuitem[0]) {
                            this._onMenuItemSelect(e, options.click, options.toggle);
                        }
                    });
                }
            }

            return menuitem;
        },

        _addPopupButton: function(options) {
            var that = this,
                widgetElement = $(POPUP_BUTTON_TEMPLATE),
                component = options.popupComponent,
                popup, chooser;

            widgetElement.attr(ARIA_LABEL, options.text);

            popup = $("<div/>").appendTo($("<body>")).kendoPopup({
                anchor: widgetElement
            }).data("kendoPopup");

            widgetElement.on(CLICK + " touchend", (e) => {
                popup.toggle();
                e.preventDefault();
            });

            chooser = new component(popup.element);

            chooser.bind(options.commandOn, (e) => {
                that.trigger(CHANGE, { target: widgetElement, value: e.value || e });
                popup.close();
            });

            return { widgetElement, chooser, popup };
        },

        _addSeparator: function(options) {
            var separator = $(SEPARATOR_EL),
                overflowSeparator = $(SEPARATOR_OVERFLOW_EL);

            separator.addClass(KSEPARATOR);
            separator.attr(ROLE, SEPARATOR);

            if (this.overflowAnchor) {
                separator.insertBefore(this.overflowAnchor);
            } else {
                separator.appendTo(this.element);
            }

            this._addAttributes(options, separator);

            if (options.id) {
                options.id = options.id + DASH + OVERFLOW;
            }

            this._addAttributes(options, overflowSeparator);

            if (this.overflowMenu) {
                this.overflowMenu.element.append(overflowSeparator);
            }
        },

        _addSpacer: function() {
            var spacer = $(SPACER_EL);
            spacer.addClass(SPACER_CLASS);

            if (this.overflowAnchor) {
                spacer.insertBefore(this.overflowAnchor);
            } else {
                spacer.appendTo(this.element);
            }
        },

        _addTemplate: function(options) {
            var template = options.template,
                overflowTemplate = options.overflowTemplate,
                element, menuitem, inputsInTemplate = $(NOTHING);

            if (overflowTemplate && this.overflowMenu && options.overflow !== OVERFLOW_NEVER) {
                overflowTemplate = isFunction(overflowTemplate) ? overflowTemplate(options)[0] : overflowTemplate;
                this.overflowMenu.append({});
                menuitem = this.overflowMenu.element
                    .find(DOT + MENU_ITEM)
                    .last()
                    .find(DOT + MENU_LINK)
                    .html(overflowTemplate)
                    .parent();
            }

            if (template && options.overflow !== OVERFLOW_ALWAYS) {
                if (this.options.evaluateTemplates) {
                    template = kendo.template(template);
                }

                template = isFunction(template) ? template(options) : template;

                element = $(TEMPLATE_WRAPPER);
                element.html(template);

                if (menuitem) {
                    menuitem.addClass(STATE_HIDDEN);
                }
            }

            if (element) {
                inputsInTemplate = element.find(INPUT + COMMA + SELECT);
                this._addAttributes(options, element);
            }

            if (menuitem) {
                inputsInTemplate.add(menuitem.find(INPUT + COMMA + SELECT));
                this._addAttributes(options, menuitem);
            }

            if (!this.options.navigateOnTab && inputsInTemplate.length > 0) {
                element.attr(TABINDEX, 0);
                element.addClass(TOOLBAR_TOOL);
                inputsInTemplate.attr(TABINDEX, -1);
            }

            return element;
        },

        _addToolbarTool: function(component, options) {
            var widgetElement = $("<button>"),
                hasButtons = false,
                widget, element, popupRef;

            if (options.primary === true) {
                options.themeColor = PRIMARY;
            }
            if (options.url) {
                widgetElement = $("<a href='" + options.url + "'>");
            }
            if (options.showIcon === OVERFLOW) {
                delete options.imageUrl;
                delete options.icon;
            }
            if (options.showText !== OVERFLOW) {
                widgetElement.text(options.text);
            } else {
                widgetElement.attr(ARIA_LABEL, options.text);
            }

            if (options.type === "popupButton") {
                popupRef = this._addPopupButton(options);
                widgetElement = popupRef.widgetElement;
            } else if (component === "Button" && options.togglable === true) {
                component = "ToggleButton";
            } else if (options.menuButtons) {
                options.items = options.menuButtons;
                delete options.menuButtons;

                if (options.attributes && options.attributes.class) {
                    widgetElement.addClass(options.attributes.class);
                }

                widgetElement.attr(DATA_UID, options.uid);
                delete options.uid;
            } else if (options.buttons) {
                widgetElement = $("<span></span>");
                hasButtons = true;
                options.items = options.buttons;
                delete options.buttons;

                options.preventKeyNav = true;

                options.items.forEach(i => {
                    if (i.showIcon === OVERFLOW) {
                        delete i.imageUrl;
                        delete i.icon;
                    }

                    if (i.showText === OVERFLOW) {
                        if (!i.attributes) {
                            i.attributes = {};
                        }

                        i.attributes[ARIA_LABEL] = i.text;

                        delete i.text;
                    }
                });
            }

            if (options.id) {
                widgetElement.attr(ID, options.id);
                delete options.id;
            }

            options.size = this.options.size;

            widget = new kendo.ui[component]($(widgetElement), options);
            element = widget.wrapper || widget.element;
            element.addClass(TOOLBAR_TOOLS_CLASSES[component]);
            this._addAttributes(options, element);

            if (options.url) {
                widgetElement.removeAttr(ROLE);
            }

            if (hasButtons) {
                element.find(DOT + KBUTTON).addClass(TOOLBAR_TOOL);
                this._groupVisibleButtons(element);
            } else {
                widget.element.addClass(TOOLBAR_TOOL);
            }

            if (options.type !== "popupButton" && options.type !== "open") {
                this._attachWidgetEvents(widget);
            } else if (options.type === "open") {
                widgetElement.addClass(UPLOAD_BUTTON);
                this._resetOpen(widgetElement, options.extensions);
                element = widgetElement.parent();
            } else {
                widget.chooser = popupRef.chooser;
                widget.popup = popupRef.popup;
            }

            return element;
        },

        _attachEvents: function() {
            var that = this;

            that.element.on(KEYDOWN + ns, that._keydown.bind(that))
                .on(FOCUSIN + ns, that._focusIn.bind(that))
                .on(FOCUSOUT + ns, that._focusOut.bind(that));
        },

        _attachWidgetEvents: function(widget) {
            var that = this;

            widget.bind(CLICK, that._onClick.bind(that));
            widget.bind(TOGGLE, that._onToggle.bind(that));
            widget.bind(SELECT, that._onSelect.bind(that));
            widget.bind(OPEN, that._onOpen.bind(that));
            widget.bind(CLOSE, that._onClose.bind(that));

            widget.wrapper.find(DOT + KBUTTON).each((i, el) => {
                var $el = $(el);

                if ($el.data("kendoButton")) {
                    $el.data("kendoButton").bind(CLICK, (e) => {
                        that.trigger(CLICK, { id: e.id, target: e.target, originalEvent: e.originalEvent || e.event });
                    });
                }
            });
        },

        _childrenWidth: function() {
            var gap = parseInt(this.element.css('gap'), 10) || 0;
            var childrenWidth = gap;

            this.element.children(":visible:not(" + DOT + SPACER_CLASS + ")").each(function() {
                childrenWidth += outerWidth($(this), false) + gap;
            });

            return Math.ceil(childrenWidth);
        },

        _extendToolsOptions: function() {
            var options = this.options,
                items = options.tools.flatMap((tool) => this._mapTool(tool, options.parentMessages, options.defaultTools));

            this.options.items = items;

            return items;
        },

        _focusIn: function(e) {
            var target = $(e.target),
                button = target.closest(DOT + KBUTTON);

            if (button.length > 0) {
                this._resetTabIndex(button);
                button.addClass(KFOCUS);
            }
        },

        _focusOut: function(e) {
            this.wrapper.find(DOT + KBUTTON + DOT + KFOCUS).removeClass(KFOCUS);
        },

        _getAllItems: function() {
            return this.wrapper.find(DOT + TOOLBAR_TOOL)
                .filter(":visible")
                .filter((i, el) => {
                    if (el.style.visibility === HIDDEN) {
                        return false;
                    }

                    return true;
                });
        },

        _getItem: function(candidate, knownUid) {
            var uid = knownUid || this._getUid(candidate),
                buttonsPopups = $(DATA_ROLE_BUTTONMENU),
                uidSelector, toolbarEl;

            if (!uid) {
                return {
                    toolbarEl: this.element.find(candidate),
                    templateEl: $(NOTHING),
                    menuItem: this.overflowMenu ? this.overflowMenu.element.find(candidate) : $(NOTHING),
                    buttonsPopupItem: $(NOTHING)
                };
            }

            uidSelector = "[data-uid=" + uid + "]";
            toolbarEl = this.element.find(uidSelector);

            return {
                toolbarEl: toolbarEl,
                templateEl: toolbarEl.closest(DOT + TEMPLATE_ITEM + COMMA + DOT + SPLIT_BUTTON),
                component: kendo.widgetInstance(toolbarEl),
                menuItem: this.overflowMenu ? this.overflowMenu.element.find(uidSelector) : $(NOTHING),
                buttonsPopupItem: buttonsPopups.find(uidSelector)
            };
        },

        _getNextElement: function(item, direction) {
            var items = this._getAllItems(),
                itemIndex = items.index(item) === -1 ? items.index(item.parentElement) : items.index(item),
                focusableItem = items[itemIndex + direction];

            if (!focusableItem) {
                if (direction === -1) {
                    focusableItem = items.last();
                } else {
                    focusableItem = items.first();
                }
            }

            return focusableItem;
        },

        _getUid: function(candidate) {
            var element;

            // find toolbar item by jQuery selector
            element = this.element.find(candidate);

            // if not found find in in the DropDown-/SplitButton popups
            if (!element.length) {
                element = $(DATA_ROLE_BUTTONMENU).find(candidate);
            }

            // if not, find it in the OverflowMenu
            if (!element.length && this.overflowMenu) {
                element = this.overflowMenu.element.find(candidate);
            }

            if (!element.length) {
                return null;
            } else {
                return element.data(UID) || element.closest(DOT + TOOLBAR_TOOL).data(UID);
            }
        },

        _groupVisibleButtons: function(el) {
            var buttons = el.children(),
                visibleBtns;

            buttons.removeClass(GROUP_END).removeClass(GROUP_START);
            visibleBtns = buttons.filter(":not('." + STATE_HIDDEN + "')");
            visibleBtns.first().addClass(GROUP_START);
            visibleBtns.last().addClass(GROUP_END);
        },

        _hideItem: function(item) {
            var that = this,
                widget;

            item.addClass(STATE_HIDDEN);

            if (that.overflowMenu) {
                if (item.hasClass(SPLIT_BUTTON) || item.hasClass(MENU_BUTTON)) {
                    if (item.hasClass(SPLIT_BUTTON)) {
                        item = item.children().eq(0);
                        widget = item.data(K_SPLIT_BUTTON);
                    } else {
                        widget = item.data(K_DROP_DOWN_BUTTON);
                    }

                    widget.menu.list.children().each((i, el) => {
                        that._showMenuItem($(el));
                    });

                    that._showMenuItem(item);
                } else if (item.hasClass(BUTTON_GROUP)) {
                    item.children().each((i, el) => {
                        that._showMenuItem($(el));
                    });
                } else {
                    that._showMenuItem(item);
                }
            }
        },

        _hideMenuItem: function(item) {
            this.overflowMenu.element
                .find(">li[data-uid='" + item.data(UID) + "']")
                .addClass(STATE_HIDDEN);
        },

        _items: function() {
            let options = this.options;

            for (var i = 0; i < options.items.length; i++) {
                this._add(options.items[i]);
            }
        },

        _keydown: function(e) {
            var target = $(e.target),
                keyCode = e.keyCode,
                templateItem = target.closest(DOT + TEMPLATE_ITEM),
                isOverflowAnchor = target.is(DOT + OVERFLOW_ANCHOR);

            if (!this.options.navigateOnTab && !target.is(".k-toolbar-tool") && keyCode === keys.ESC && templateItem.length > 0) {
                e.stopPropagation();
                this._keyDeactivateTemplate(templateItem);
                return;
            }

            if (!target.hasClass(TOOLBAR_TOOL)) {
                return;
            }

            if (!this.options.navigateOnTab && keyCode === keys.ENTER && target.hasClass(TEMPLATE_ITEM)) {
                this._keyActivateTemplate(target);
            } else if (isOverflowAnchor && (e.altKey && keyCode === keys.DOWN || keyCode === keys.ENTER || keyCode === keys.SPACEBAR)) {
                this._keyOpenOverflow(e, keyCode);
            } else if (keyCode === keys.HOME) {
                this._keyFocusFirst(target, e);
            } else if (keyCode === keys.END) {
                this._keyFocusLast(target, e);
            } else if (!this.options.navigateOnTab && (keyCode === keys.RIGHT || keyCode === keys.LEFT)) {
                this._keyFocusNext(keyCode, e);
            }
        },

        _keyActivateTemplate: function(target) {
            var innerFocusable = target.find(KENDO_FOCUSABLE + ":not('" + DOT + INPUT_BUTTON + "')" + COMMA + DOT + DROPDOWNLIST);

            if (innerFocusable.length > 0) {
                target.attr(TABINDEX, -1);

                innerFocusable.attr(TABINDEX, 0);
                innerFocusable.first().trigger(FOCUS);
            }
        },

        _keyDeactivateTemplate: function(templateItem) {
            var innerWidget = templateItem.find(DATA_ROLE_SELECTOR),
                innerFocusable = templateItem.find(KENDO_FOCUSABLE + ":not('" + DOT + INPUT_BUTTON + "')" + COMMA + DOT + DROPDOWNLIST),
                widgetInstance;

            if (innerWidget.length > 0) {
                widgetInstance = kendo.widgetInstance(innerWidget);

                if (widgetInstance) {
                    if (widgetInstance.overflowMenu && widgetInstance.overflowMenu.visible()) {
                        return;
                    } else {
                        templateItem.attr(TABINDEX, 0);
                        templateItem.trigger(FOCUS);
                        templateItem.find(KENDO_FOCUSABLE).attr(TABINDEX, -1);
                    }
                }
            }

            if (innerFocusable.length > 0) {
                templateItem.attr(TABINDEX, 0);
                templateItem.trigger(FOCUS);
                innerFocusable.attr(TABINDEX, -1);
            }
        },

        _keyFocusFirst: function(target, e) {
            var items = this._getAllItems();

            if (target.is(DOT + DROPDOWNLIST) || target.is(INPUT)) {
                return;
            }

            this._resetTabIndex(items.first());
            items.first().trigger(FOCUS);
            e.preventDefault();
        },

        _keyFocusLast: function(target, e) {
            var items = this._getAllItems(),
                last;

            if (target.is(DOT + DROPDOWNLIST) || target.is(INPUT)) {
                return;
            }

            last = items.last();

            if (last.width() === 0) {
                last = items.eq(items.length - 2);
            }

            this._resetTabIndex(last);
            last.trigger(FOCUS);
            e.preventDefault();
        },

        _keyFocusNext: function(keyCode, e) {
            var direction = this._isRtl ? -1 : 1,
                next;

            if (keyCode === keys.LEFT) {
                direction = -1 * direction;
            }

            next = $(this._getNextElement(e.target, direction));
            this._resetTabIndex(next);
            next.trigger(FOCUS);

            e.preventDefault();
        },

        _keyOpenOverflow: function(e, keyCode) {
            if (keyCode === keys.SPACEBAR) {
                e.preventDefault();
            }

            this.overflowMenu.open();
        },

        _mapAttributes: function(toolOptions, messages) {
            return {
                "aria-label": messages[toolOptions.name || toolOptions.property],
                "title": messages[toolOptions.name || toolOptions.property],
                "data-command": toolOptions.command,
                "data-options": toolOptions.options,
                "data-dialog": toolOptions.dialog,
                "data-property": toolOptions.property,
                "data-value": toolOptions.value,
                "data-toggle": toolOptions.toggleCondition
            };
        },

        _mapComponent: function(component, messages) {
            var that = this,
                componentOptions = component.componentOptions,
                componentMessages = componentOptions.messages,
                componentPlaceholder = componentOptions.placeholder,
                attributes = $.extend({}, that._mapAttributes(component, messages), component.attributes),
                options;

            if (component.overflowComponent) {
                options = component.options || {};

                if (component.componentOptions.dataSource) {
                    options.options = component.componentOptions.dataSource;
                }
                if (component.componentOptions.value) {
                    options.default = component.componentOptions.value;
                }

                if (Object.keys(options).length > 0) {
                    component.overflowComponent.options = JSON.stringify(options);
                }

                component.overflowComponent = that._mapTool(component.overflowComponent, messages);
            }

            if (componentMessages) {
                Object.keys(componentMessages).forEach((key) => {
                    component.componentOptions.messages[key] = messages[componentMessages[key]] || componentMessages[key];
                });
            }

            if (componentPlaceholder) {
                component.componentOptions.placeholder = messages[componentPlaceholder] || componentPlaceholder;
            }

            Object.keys(componentOptions).forEach((key) => {
                if (key === "commandOn") {
                    component.componentOptions[componentOptions[key]] = (ev) => {
                        that.trigger(CHANGE, { target: ev.target || ev.sender.element });
                    };
                }
            });

            if (componentOptions.dataSource && componentOptions.dataSource.length) {
                component.componentOptions.dataSource = componentOptions.dataSource.map(i => {
                    if (i.name && messages[i.name]) {
                        i.text = messages[i.name];
                    }

                    return i;
                });
            }

            component.attributes = attributes;

            return component;
        },

        _mapTool: function(tool, messages, defaultTools) {
            var that = this,
                isArray = Array.isArray(tool),
                isBuiltInTool, toolOptions, attributes;

            if (isArray) {
                return {
                    type: "buttonGroup",
                    buttons: tool.map(t => that._mapTool(t, messages, defaultTools))
                };
            }

            isBuiltInTool = $.isPlainObject(tool) && Object.keys(tool).length === 1 && tool.name;
            tool = isBuiltInTool ? tool.name : tool;
            toolOptions = $.isPlainObject(tool) ? tool : $.extend({}, defaultTools[tool]);

            attributes = $.extend({}, that._mapAttributes(toolOptions, messages), toolOptions.attributes);

            kendo.deepExtend(toolOptions, {
                text: messages[toolOptions.name || toolOptions.property],
                attributes: attributes,
            });

            if (toolOptions.type === "component") {
                if (toolOptions.items) {
                    return toolOptions.items.map(t => that._mapComponent(t, messages));
                } else {
                    return that._mapComponent(toolOptions, messages);
                }
            } else if (toolOptions.type === "buttonGroup") {
                delete toolOptions.attributes[ARIA_LABEL];
                toolOptions.buttons = toolOptions.buttons.map(t => that._mapTool(t, messages, defaultTools));
            } else if (toolOptions.type === "splitButton") {
                delete toolOptions.attributes[ARIA_LABEL];
                toolOptions.menuButtons = toolOptions.menuButtons.flatMap(t => that._mapTool(t, messages, defaultTools));
            } else if (toolOptions.type === "popupButton" && toolOptions.overflowComponent) {
                toolOptions.overflowComponent = that._mapTool(toolOptions.overflowComponent, messages);
            }

            delete toolOptions.name;

            return toolOptions;
        },

        _menuItemSelect: function(e) {
            var item = $(e.item),
                id = item.attr(ID),
                togglable = item.find(DOT + MENU_LINK_TOGGLE),
                groupName = item.data(GROUP),
                shouldSelect, twin, group;

            if (id && id.indexOf(DASH + OVERFLOW) > -1) {
                id = id.replace(DASH + OVERFLOW, NOTHING);
            }

            if (togglable.length) {
                if (groupName) {
                    this.overflowMenu.element.find("[data-group=" + groupName + "]").each((i, el) => {
                        var current = $(el);

                        current.attr(ARIA_CHECKED, false);
                        current.find(DOT + MENU_LINK_TOGGLE).removeClass(STATE_SELECTED);
                    });
                }

                shouldSelect = groupName ? true : !togglable.hasClass(STATE_SELECTED);

                togglable.toggleClass(STATE_SELECTED, shouldSelect);
                item.attr(ARIA_CHECKED, shouldSelect);

                twin = this.element.find("[data-uid=" + item.data(UID) + "]");

                if (twin.length) {
                    if (twin.closest(DOT + BUTTON_GROUP).length) {
                        group = twin.closest(DOT + BUTTON_GROUP).data(K_BUTTON_GROUP);
                        group.select(twin);
                    } else {
                        if (groupName) {
                            this.element.find("[data-group=" + groupName + "]").each((i, el) => {
                                $(el).data(K_TOGGLE_BUTTON).toggle(false);
                            });
                        }

                        twin.data(K_TOGGLE_BUTTON).toggle(true);
                    }
                }

                this.trigger(TOGGLE, {
                    id: item.attr(ID),
                    target: item,
                    checked: shouldSelect
                });
            } else {
                this.trigger(CLICK, {
                    id: id,
                    target: item,
                });
            }
        },

        _onClick: function(e) {
            var el = e.target,
                togglable = el.hasClass(TOGGLE_BUTTON),
                group = el.data(GROUP);

            if (!togglable) {
                this.trigger(CLICK, { id: e.id, target: e.target, originalEvent: e.originalEvent || e.event });
            }

            if (togglable && group && this.element.find("[data-group=" + group + "]").length > 1) {
                if (el.hasClass(STATE_SELECTED)) {
                    e.preventDefault();
                }
            }
        },

        _onClose: function(e) {
            if (this.trigger(CLOSE, { widget: e.sender })) {
                e.preventDefault();
            }
        },

        _onMenuItemSelect: function(e, click, toggle) {
            var item = $(e.item),
                togglable = item.find(DOT + MENU_LINK_TOGGLE).length > 0,
                id = item.attr(ID);

            if (id && id.indexOf(DASH + OVERFLOW) > -1) {
                id = id.replace(DASH + OVERFLOW, NOTHING);
            }

            if (click) {
                click.bind(this)({
                    event: e.event,
                    id: id,
                    target: item
                });
            }

            if (togglable && toggle) {
                setTimeout(() => {
                    toggle.bind(this)({
                        event: e.event,
                        id: id,
                        target: item,
                        checked: item.find(DOT + STATE_SELECTED).length > 0
                    });
                });
            }
        },

        _onOpen: function(e) {
            if (this.trigger(OPEN, { widget: e.sender })) {
                e.preventDefault();
            }
        },

        _onSelect: function(e) {
            var menuEl = this.overflowMenu ? this.overflowMenu.element : $(NOTHING);

            e.sender.element.children().each((i, el) => {
                var current = $(el),
                    uid = current.data(UID),
                    selected = current.hasClass(STATE_SELECTED);

                menuEl
                    .find("[data-uid=" + uid + "]")
                    .attr(ARIA_CHECKED, selected)
                    .find(DOT + MENU_LINK_TOGGLE)
                    .toggleClass(STATE_SELECTED, selected);
            });

            this.trigger(TOGGLE, {
                id: e.target.attr(ID),
                target: e.target,
                checked: e.target.hasClass(STATE_SELECTED)
            });
        },

        _onToggle: function(e) {
            var that = this,
                el = e.target,
                group = el.data(GROUP),
                overflowItem,
                overflowGroup;

            if (that.overflowMenu) {
                overflowItem = that.overflowMenu.element.find("[data-uid=" + el.attr(DATA_UID) + "]");
                overflowGroup = that.overflowMenu.element.find("[data-group=" + group + "]");

                overflowGroup.attr(ARIA_CHECKED, false).find(DOT + MENU_LINK_TOGGLE).removeClass(STATE_SELECTED);
                overflowItem.attr(ARIA_CHECKED, true).find(DOT + MENU_LINK_TOGGLE).addClass(STATE_SELECTED);
            }

            if (group) {
                that.element.find("[data-group=" + group + "]").each((i, item) => {
                    if (item !== el[0]) {
                        $(item).data(K_TOGGLE_BUTTON).toggle(false);
                    }
                });
            }

            this.trigger(TOGGLE, { id: e.id, target: e.target, checked: e.checked, originalEvent: e.originalEvent || e.event });
        },

        _processInner(items, parentUid) {
            var attributes, current;

            for (var i = 0; i < items.length; i++) {
                current = items[i];
                attributes = current.attributes;

                if (!attributes) {
                    items[i].attributes = {};
                }

                items[i].attributes[DATA_UID] = kendo.guid();
                items[i].attributes[DATA_PARENTUID] = parentUid;

                if (current.id) {
                    items[i].attributes[ID] = items[i].id;
                }

                if (current.hidden) {
                    if (!items[i].attributes.class) {
                        items[i].attributes.class = NOTHING;
                    }

                    items[i].attributes.class += (EMPTY + STATE_HIDDEN + EMPTY + FORCE_HIDDEN);
                }
            }

            return items;
        },

        _processOptions: function(options) {
            var template = options.template,
                overflowTemplate = options.overflowTemplate,
                uid = kendo.guid(),
                groupName;

            $.extend(options, {
                uid: uid,
                rootUid: this.uid
            });

            if (options.menuButtons) {
                options.menuButtons = this._processInner(options.menuButtons, uid);
            } else if (options.buttons && options.buttons.length) {
                options.buttons = this._processInner(options.buttons, uid);

                if (options.buttons.every(b => b.togglable)) {
                    groupName = options.buttons[0].group;

                    if (!!groupName && options.buttons.every(b => b.group === groupName)) {
                        options.selection = SINGLE;
                    } else {
                        options.selection = MULTIPLE;
                    }
                } else {
                    options.selection = NONE;
                }
            }

            if ((template && !overflowTemplate) || options.type === SPACER) {
                options.overflow = OVERFLOW_NEVER;
            } else if (!options.overflow) {
                options.overflow = OVERFLOW_AUTO;
            }

            if (options.enable !== undefined) {
                options.enabled = options.enable;
            }

            return options;
        },

        _renderOverflow: function() {
            var that = this,
                isRtl = that._isRtl,
                horizontalDirection = isRtl ? "left" : "right";

            that.overflowAnchor = $("<button class='k-toolbar-overflow-button k-toolbar-tool' title='More tools'>");
            that.element.append(that.overflowAnchor);
            that.overflowAnchor.kendoButton({
                icon: "more-vertical",
                fillMode: "flat",
                size: that.options.size
            });

            if (!that.options.navigateOnTab) {
                that.overflowAnchor.attr(TABINDEX, -1);
            }

            that.overflowMenu = new kendo.ui.ContextMenu($("<ul>"), {
                size: that.options.size,
                showOn: "click tap",
                origin: "bottom " + horizontalDirection,
                position: "top " + horizontalDirection,
                alignToAnchor: true,
                target: that.overflowAnchor,
                open: function(e) {
                    if (that.trigger(OVERFLOW_OPEN)) {
                        e.preventDefault();
                    }
                },
                close: function(e) {
                    if (that.trigger(OVERFLOW_CLOSE)) {
                        e.preventDefault();
                    } else {
                        that._resetTabIndex(that.overflowAnchor);
                        that.overflowAnchor.trigger(FOCUS);
                    }
                }
            });

            that.overflowMenu.element.attr(KENDO_UID_ATTR, this.uid);

            setTimeout(() => {
                that.overflowMenu.bind(SELECT, that._menuItemSelect.bind(that));
            });
        },

        _resetOpen: function(element, extensions) {
            var that = this,
                uploadWrapper,
                input;

            element.closest(".k-upload-button-wrap").find("input").remove();
            uploadWrapper = element.wrap("<div class='k-upload-button-wrap'></span>").parent();

            input = $("<input type='file' autocomplete='off' accept='" + extensions + "'/>")
                .attr("aria-hidden", true)
                .one("change", (e) => {
                    that.trigger(CHANGE, {
                        target: element,
                        value: e.target.files[0]
                    });

                    that._resetOpen(element, extensions);
                })
                .appendTo(uploadWrapper);

            element.off(KEYDOWN).on(KEYDOWN, (e) => {
                if (e.keyCode === kendo.keys.ENTER) {
                    input.trigger(CLICK);
                }
            });
        },

        _resetTabIndex: function(toFocus) {
            if (this.options.navigateOnTab !== true) {
                this.wrapper.find(KENDO_FOCUSABLE).attr(TABINDEX, -1);
                toFocus.attr(TABINDEX, 0);
            }
        },

        _resizable: function() {
            var that = this,
                element = that.element;

            that._renderOverflow();
            element.addClass(RESIZABLE_TOOLBAR);

            that._resizeHandler = kendo.onResize(function() {
                that.resize();
            });
        },

        _resize: function(e) {
            var containerWidth = e.width,
                wrapper = this.element,
                popupBtnElements = wrapper.find('[data-role="splitbutton"]').add(wrapper.find('[data-role="dropdownbutton"]'));

            if (!this.options.resizable) {
                return;
            }

            this.overflowMenu.close();

            if (popupBtnElements.length > 0) {
                popupBtnElements.each((i, el) => {
                    kendo.widgetInstance($(el)).close();
                });
            }

            this._shrink(containerWidth);
            this._stretch(containerWidth);
            this._toggleOverflowAnchor();
        },

        _shrink: function(containerWidth) {
            var commandElement,
                visibleCommands,
                activeElement;

            if (containerWidth < this._childrenWidth()) {
                visibleCommands = this.element.children(":visible:not([data-overflow='never'], ." + OVERFLOW_ANCHOR + ")");

                for (var i = visibleCommands.length - 1; i >= 0; i--) {
                    commandElement = visibleCommands.eq(i);

                    if (containerWidth > this._childrenWidth()) {
                        break;
                    } else {
                        activeElement = commandElement.find("[tabindex=0]") || commandElement.is("[tabindex=0]") ? commandElement : $(NOTHING);

                        if (activeElement.length > 0) {
                            activeElement.attr(TABINDEX, -1);
                            this.element.children(DOT + OVERFLOW_ANCHOR).attr(TABINDEX, 0);
                        }

                        this._hideItem(commandElement);
                    }
                }
            }
        },

        _showItem: function(item, containerWidth) {
            var that = this,
                gap = parseInt(this.element.css('gap'), 10) || 0,
                widget;

            item.removeClass(STATE_HIDDEN);
            var itemOuterWidth = outerWidth(item, true) + gap;
            item.addClass(STATE_HIDDEN);

            if (item.length && (item.hasClass(SPACER_CLASS) || containerWidth > this._childrenWidth() + itemOuterWidth)) {
                item.removeClass(STATE_HIDDEN);

                if (this.options.navigateOnTab !== true) {
                    item.find(KENDO_FOCUSABLE).attr(TABINDEX, -1);
                } else {
                    if (item.is("[tabindex=-1]")) {
                        item.removeAttr(TABINDEX);
                    }
                }

                if (this.overflowMenu) {
                    if (item.hasClass(SPLIT_BUTTON) || item.hasClass(MENU_BUTTON)) {
                        if (item.hasClass(SPLIT_BUTTON)) {
                            item = item.children().eq(0);
                            widget = item.data(K_SPLIT_BUTTON);
                        } else {
                            widget = item.data(K_DROP_DOWN_BUTTON);
                        }

                        widget.menu.list.children().each((i, el) => {
                            that._hideMenuItem($(el));
                        });

                        that._hideMenuItem(item);
                    } else if (item.hasClass(BUTTON_GROUP)) {
                        item.children().each((i, el) => {
                            that._hideMenuItem($(el));
                        });
                    } else {
                        that._hideMenuItem(item);
                    }
                }

                return true;
            }

            return false;
        },

        _showMenuItem: function(item) {
            var menuItem = this.overflowMenu.element.find(">li[data-uid='" + item.data(UID) + "']");

            if (!menuItem.hasClass(FORCE_HIDDEN)) {
                menuItem.removeClass(STATE_HIDDEN);
            }
        },

        _stretch: function(containerWidth) {
            var overflowAnchor = this.element.children(DOT + OVERFLOW_ANCHOR),
                commandElement,
                hiddenCommands;

            if (containerWidth > this._childrenWidth()) {
                hiddenCommands = this.element.children(DOT + STATE_HIDDEN + ":not(" + DOT + FORCE_HIDDEN + ")");

                for (var i = 0; i < hiddenCommands.length; i++) {
                    commandElement = hiddenCommands.eq(i);

                    if (containerWidth < this._childrenWidth() || !this._showItem(commandElement, containerWidth)) {
                        break;
                    }
                }
            }

            if (!this.options.navigateOnTab && overflowAnchor.is("[tabindex=0]")) {
                overflowAnchor.attr(TABINDEX, -1);
                this._resetTabIndex(this._getAllItems().first());
            }
        },

        _tabIndex: function() {
            var focusableItems = this.wrapper.find(KENDO_FOCUSABLE + ":not('" + TABINDEX_MINUS_1 + "')"),
                firstFocusable = focusableItems.first();

            if (this.options.navigateOnTab !== true) {
                focusableItems.attr(TABINDEX, -1);
                firstFocusable.attr(TABINDEX, 0);
            } else {
                this.wrapper.find(".k-toolbar-item.k-toolbar-tool").removeAttr(TABINDEX);
            }
        },

        _toggleOverflowAnchor: function() {
            var hasVisibleChildren = false;

            hasVisibleChildren = this.overflowMenu.element.children(":not(." + STATE_HIDDEN + ", ." + POPUP + ")").length > 0;

            if (hasVisibleChildren) {
                this.overflowAnchor.css({
                    visibility: "visible",
                    width: NOTHING
                });
            } else {
                this.overflowAnchor.css({
                    visibility: HIDDEN,
                    width: "1px"
                });
            }
        }
    });

    kendo.toolbar = {
        Item: kendo.Class,
        OverflowButton: kendo.Class,
        TemplateItem: kendo.Class,
        ToolBarButton: kendo.Class,
        registerComponent: () => null
    };

    kendo.cssProperties.registerPrefix("ToolBar", "k-toolbar-");

    kendo.ui.plugin(ToolBar);
})(window.kendo.jQuery);
export default kendo;

