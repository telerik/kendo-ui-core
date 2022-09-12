(function(f, define) {
    define([ "./kendo.core", "./kendo.userevents", "./kendo.popup", "./kendo.html.button", "./kendo.splitbutton", "./kendo.dropdownbutton" ], f);
})(function() {

var __meta__ = {
    id: "toolbar",
    name: "ToolBar",
    category: "web",
    description: "The ToolBar widget displays one or more command buttons divided into groups.",
    depends: [ "core", "html.button", "splitbutton", "dropdownbutton" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        Class = kendo.Class,
        ui = kendo.ui,
        Widget = ui.Widget,
        isFunction = kendo.isFunction,
        keys = kendo.keys,
        outerWidth = kendo._outerWidth,
        ns = ".kendoToolBar",
        TOOLBAR = "k-toolbar",
        KBUTTON = "k-button",
        OVERFLOW_BUTTON = "k-overflow-button",
        TOGGLE_BUTTON = "k-toggle-button",
        BUTTON_GROUP = "k-button-group",
        SPLIT_BUTTON = "k-split-button",
        MENU_BUTTON = "k-menu-button",
        KSEPARATOR = "k-separator",
        SPACER_CLASS = "k-spacer",
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
        OVERFLOW_GROUP = "k-overflow-group",
        OVERFLOW_HIDDEN = "k-overflow-hidden",
        OVERFLOW_ANCHOR = "k-overflow-anchor",
        OVERFLOW_CONTAINER = "k-overflow-container",
        OVERFLOW_WRAPPER = "k-overflow-wrapper",
        FIRST_TOOLBAR_VISIBLE = "k-toolbar-first-visible",
        LAST_TOOLBAR_VISIBLE = "k-toolbar-last-visible",
        SPLIT_BUTTON_ARROW = "k-split-button-arrow",
        TEMPLATE_ITEM = "k-toolbar-item",
        DROPDOWNLIST = "k-dropdownlist",
        COLORPICKER = "k-colorpicker",
        INPUT_BUTTON = "k-input-button",
        KFOCUS = "k-focus",

        ARIA_DISABLED = "aria-disabled",
        ARIA_PRESSED = "aria-pressed",
        ARIA_LEBEL = "aria-label",

        CLICK = "click",
        TOGGLE = "toggle",
        OPEN = "open",
        CLOSE = "close",
        FOCUS = "focus",
        KEYDOWN = "keydown",
        TAP = "tap",

        SPACER = "spacer",
        BOTH = "both",
        PRIMARY = "primary",
        HREF = "href",
        ROLE = "role",
        BUTTON = "button",
        SPLITBUTTON = "splitButton",
        DROPDOWNBUTTON = "dropDownButton",
        SEPARATOR = "separator",
        OVERFLOW = "overflow",
        NEXT = "next",
        PREV = "prev",
        TABINDEX = "tabindex",
        TEMPLATE = "template",
        INPUT = "input",
        SELECT = "select",
        CHECKBOX = "checkbox",
        HIDDEN = "hidden",
        GROUP = "group",

        KENDO_FOCUSABLE = ":kendoFocusable",

        OVERFLOW_OPEN = "overflowOpen",
        OVERFLOW_CLOSE = "overflowClose",
        OVERFLOW_NEVER = "never",
        OVERFLOW_AUTO = "auto",
        OVERFLOW_ALWAYS = "always",

        OPTION_LIST_SUFFIX = "_optionlist",

        KENDO_UID_ATTR = kendo.attr("uid"),

        POPUP_ITEM_TEMPLATE = '<li class="k-menu-item k-item">',

        MENU_LINK_SPAN = '<span tabindex="0" class="k-link k-menu-link">' +
                '<span class="k-menu-link-text">#:text#</span>' +
            '</span>',

        MENU_LINK_A = '<a href="#:href#" class="k-link k-menu-link">' +
                '<span class="k-menu-link-text">#:text#</span>' +
            '</a>',

        EMPTY = " ",
        NOTHING = "",
        TEXT_ITEM = "textItem",
        DOT = ".",
        COMMA = ",",
        ID = "id",
        UID = "uid";

        kendo.toolbar = {};

        var components = {
            overflowAnchor: '<div tabindex="0" class="k-overflow-anchor k-button k-button-md k-rounded-md k-button-flat k-button-flat-base" title="More tools" role="button"></div>',
            overflowContainer: '<ul class="k-overflow-container k-list-container"></ul>'
        };

        kendo.toolbar.registerComponent = function(name, toolbar, overflow) {
            components[name] = {
                toolbar: toolbar,
                overflow: overflow
            };
        };

        var Item = kendo.Class.extend({
            addOverflowAttr: function() {
                this.element.attr(kendo.attr(OVERFLOW), this.options.overflow || OVERFLOW_AUTO);
            },

            addUidAttr: function() {
                this.element.attr(KENDO_UID_ATTR, this.options.uid);
            },

            addIdAttr: function() {
                if (this.options.id) {
                    this.element.attr(ID, this.options.id);
                }
            },

            addOverflowIdAttr: function() {
                if (this.options.id) {
                    this.element.attr(ID, this.options.id + "_overflow");
                }
            },

            attributes: function() {
                var attributes = this.options.attributes,
                    classes;

                if (attributes) {
                    if (attributes.class) {
                        classes = attributes.class;

                        this.element.addClass(classes);

                        delete attributes.class;
                    }

                    this.element.attr(attributes);

                    attributes.class = classes;
                }
            },

            show: function() {
                this.element.removeClass(STATE_HIDDEN);
                this.element.removeClass(FORCE_HIDDEN);
                this.options.hidden = false;
            },

            hide: function() {
                this.element.addClass(STATE_HIDDEN);
                this.element.addClass(FORCE_HIDDEN);

                if (this.overflow && this.overflowHidden) {
                    this.overflowHidden();
                }
                this.options.hidden = true;
            },

            remove: function() {
                this.element.remove();
            },

            enable: function(isEnabled) {
                if (isEnabled === undefined) {
                    isEnabled = true;
                }
                this.element.toggleClass(STATE_DISABLED, !isEnabled);
                this.element.attr(ARIA_DISABLED, !isEnabled);

                this.options.enable = isEnabled;
            },

            twin: function() {
                var uid = this.element.attr(KENDO_UID_ATTR);
                if (this.overflow && this.options.splitContainerId) {
                    return $("#" + this.options.splitContainerId)
                            .find("[" + KENDO_UID_ATTR + "='" + uid + "']")
                            .data(this.options.type);
                } else if (this.overflow) {
                    return this.toolbar
                            .element
                            .find("[" + KENDO_UID_ATTR + "='" + uid + "']")
                            .data(this.options.type);
                } else if (this.toolbar.options.resizable) {
                    return this.toolbar
                            .popup.element
                            .find("[" + KENDO_UID_ATTR + "='" + uid + "']")
                            .data(this.options.type);
                }
            }
        });

        kendo.toolbar.Item = Item;

        var BareItem = Item.extend({
            init: function(options, toolbar) {
                this.options = $.extend({}, this.options, options);
                this.toolbar = toolbar;
            }
        });

        kendo.toolbar.BareItem = BareItem;

        var Button = Item.extend({
            init: function(options, toolbar) {
                var element = options.useButtonTag ? $('<button></button>') : $('<a role="button" href></a>');

                this.element = element;
                this.options = $.extend({}, this.options, options);
                this.toolbar = toolbar;

                this.attributes();

                if (options.primary) {
                    this.options.themeColor = PRIMARY;
                }

                if (options.togglable) {
                    element.addClass(TOGGLE_BUTTON);
                    this.toggle(options.selected);
                }

                if (options.url !== undefined && !options.useButtonTag) {
                    element.attr(HREF, options.url);
                    if (options.mobile) {
                        element.attr(kendo.attr(ROLE), BUTTON);
                    }
                }

                if (options.group) {
                    element.attr(kendo.attr(GROUP), options.group);
                    this.group = this.toolbar.addToGroup(this, options.group);
                }

                if (!options.togglable && options.click && isFunction(options.click)) {
                    this.clickHandler = options.click;
                }

                if (options.togglable && options.toggle && isFunction(options.toggle)) {
                    this.toggleHandler = options.toggle;
                }
            },

            options: {
                showIcon: BOTH,
                showText: BOTH
            },

            toggle: function(state, propagate) {
                state = !!state;

                if (this.group && state) {
                    this.group.select(this);
                } else if (!this.group) {
                    this.select(state);
                }

                if (propagate && this.twin()) {
                    this.twin().toggle(state);
                }
            },

            getParentGroup: function() {
                if (this.options.isChild) {
                    return this.element.closest(DOT + BUTTON_GROUP).data("buttonGroup");
                }
            }
        });

        kendo.toolbar.Button = Button;

        var ToolBarButton = Button.extend({
            init: function(options, toolbar) {
                Button.fn.init.call(this, options, toolbar);

                var element = this.element;
                options = this.options;

                element.addClass(KBUTTON);

                this.addIdAttr();

                if (options.align) {
                    element.addClass("k-align-" + options.align);
                }

                if (!!options.text && (options.showText == "toolbar" || options.showText == BOTH)) {
                    if (options.mobile) {
                        element.html('<span class="km-text">' + options.text + "</span>");
                    } else {
                        element.html(options.text);
                    }
                } else if (!!options.text) {
                    element.attr(ARIA_LEBEL, options.text);
                }

                if (options.icon || options.spriteCssClass || options.imageUrl) {
                    if (options.showIcon !== "toolbar" && options.showIcon !== BOTH) {
                        options.icon = null;
                        options.spriteCssClass = null;
                        options.imageUrl = null;
                    }
                }

                kendo.html.renderButton(element, options);

                this.addUidAttr();
                this.addOverflowAttr();
                this.enable(options.enable);

                if (options.hidden) {
                    this.hide();
                }

                this.element.data({
                    type: BUTTON,
                    button: this
                });
            },

            select: function(selected) {
                if (selected === undefined) {
                    selected = false;
                }

                if (this.options.togglable) {
                    this.element.attr(ARIA_PRESSED, selected);
                }

                this.element.toggleClass(STATE_SELECTED, selected);
                this.options.selected = selected;
            }
        });

        kendo.toolbar.ToolBarButton = ToolBarButton;

        var OverflowButton = Button.extend({
            init: function(options, toolbar) {
                this.overflow = true;

                Button.fn.init.call(this, $.extend({}, options), toolbar);

                var element = this.element;
                options = this.options;

                if (!!options.text && (options.showText == OVERFLOW || options.showText == BOTH)) {
                    if (options.mobile) {
                        element.html('<span class="km-text">' + options.text + "</span>");
                    } else {
                        element.html(options.text);
                    }
                } else if (!!options.text) {
                    element.attr(ARIA_LEBEL, options.text);
                }

                if (options.icon || options.spriteCssClass || options.imageUrl) {
                    if (options.showIcon !== OVERFLOW && options.showIcon !== BOTH) {
                        options.icon = null;
                        options.spriteCssClass = null;
                        options.imageUrl = null;
                    }
                }

                kendo.html.renderButton(element, options);

                if (!options.isChild) {
                    this._wrap();
                }

                this.addOverflowIdAttr();
                this.attributes();
                this.addUidAttr();
                this.addOverflowAttr();
                this.enable(options.enable);

                element.addClass(OVERFLOW_BUTTON + EMPTY + KBUTTON);

                if (options.hidden) {
                    this.hide();
                }

                if (options.togglable) {
                    this.toggle(options.selected);
                }

                this.element.data({
                    type: BUTTON,
                    button: this
                });
            },

            _wrap: function() {
                this.element = this.element.wrap(POPUP_ITEM_TEMPLATE).parent();
            },

            overflowHidden: function() {
                this.element.addClass(OVERFLOW_HIDDEN);
            },

            select: function(selected) {
                if (selected === undefined) {
                    selected = false;
                }

                if (this.options.isChild) {
                    this.element.toggleClass(STATE_SELECTED, selected);
                } else {
                    this.element.find(DOT + KBUTTON).toggleClass(STATE_SELECTED, selected);
                }
                this.options.selected = selected;
            }
        });

        kendo.toolbar.OverflowButton = OverflowButton;
        kendo.toolbar.registerComponent(BUTTON, ToolBarButton, OverflowButton);

        var ButtonGroup = Item.extend({
            createButtons: function(buttonConstructor) {
                var options = this.options;
                var items = options.buttons || [];
                var item;

                for (var i = 0; i < items.length; i++) {
                    if (!items[i].uid) {
                        items[i].uid = kendo.guid();
                    }
                    item = new buttonConstructor($.extend({ mobile: options.mobile, isChild: true, type: BUTTON }, items[i]), this.toolbar);
                    item.element.appendTo(this.element);
                }
            },

            refresh: function() {
                this.element.children().filter(":not('." + STATE_HIDDEN + "')").first().addClass(GROUP_START);
                this.element.children().filter(":not('." + STATE_HIDDEN + "')").last().addClass(GROUP_END);
            }
        });

        kendo.toolbar.ButtonGroup = ButtonGroup;

        var ToolBarButtonGroup = ButtonGroup.extend({
            init: function(options, toolbar) {
                var element = this.element = $('<div></div>');
                this.options = options;
                this.toolbar = toolbar;

                this.addIdAttr();

                if (options.align) {
                    element.addClass("k-align-" + options.align);
                }

                this.createButtons(ToolBarButton);
                this.attributes();
                this.addUidAttr();
                this.addOverflowAttr();
                this.refresh();

                element.addClass(BUTTON_GROUP);

                if (options.hidden) {
                    this.hide();
                }

                this.element.data({
                    type: "buttonGroup",
                    buttonGroup: this
                });
            }
        });

        kendo.toolbar.ToolBarButtonGroup = ToolBarButtonGroup;

        var OverflowButtonGroup = ButtonGroup.extend({
            init: function(options, toolbar) {
                var element = this.element = $('<li></li>');
                this.options = options;
                this.toolbar = toolbar;
                this.overflow = true;

                this.addOverflowIdAttr();

                this.createButtons(OverflowButton);
                this.attributes();
                this.addUidAttr();
                this.addOverflowAttr();
                this.refresh();

                element.addClass((options.mobile ? NOTHING : BUTTON_GROUP) + EMPTY + OVERFLOW_GROUP);

                this.element.data({
                    type: "buttonGroup",
                    buttonGroup: this
                });
            },

            overflowHidden: function() {
                this.element.addClass(OVERFLOW_HIDDEN);
            }
        });

        kendo.toolbar.OverflowButtonGroup = OverflowButtonGroup;
        kendo.toolbar.registerComponent("buttonGroup", ToolBarButtonGroup, OverflowButtonGroup);

        var ToolBarMenuButton = ToolBarButton.extend({
            init: function(options, toolbar) {
                var element, img, span;

                options = this.options = $.extend({}, this.options, options);

                if (options.url !== undefined) {
                    element = $(kendo.template(MENU_LINK_A)({
                        href: options.url,
                        text: options.text
                    }));
                } else {
                    element = $(kendo.template(MENU_LINK_SPAN)({
                        text: options.text
                    }));
                }

                this.element = element;
                this.toolbar = toolbar;

                if (options.click && isFunction(options.click)) {
                    this.clickHandler = options.click;
                }

                if (options.togglable && options.toggle && isFunction(options.toggle)) {
                    this.toggleHandler = options.toggle;
                }

                if (options.imageUrl) {
                    img = $('<img alt="icon" class="k-image" />').prependTo(element);
                    img.attr("src", options.imageUrl);
                } else if (options.icon) {
                    span = $('<span></span>').prependTo(element);
                    span.attr("class", "k-icon k-i-" + options.icon);
                } else if (options.spriteCssClass) {
                    span = $('<span class="k-sprite"></span>').prependTo(element);
                    span.addClass(options.spriteCssClass);
                }

                this.addIdAttr();
                this.addUidAttr();
                this.addOverflowAttr();
                this.attributes();
                this.enable(options.enable);

                if (options.group) {
                    element.attr(kendo.attr(GROUP), options.group);
                    this.group = this.toolbar.addToGroup(this, options.group);
                }

                if (options.hidden) {
                    this.hide();
                }

                this.element.data({
                    type: BUTTON,
                    button: this
                });
            }
        });

        kendo.toolbar.ToolBarMenuButton = ToolBarMenuButton;

        var ToolBarSplitButton = Item.extend({
            init: function(options, toolbar) {
                var that = this;

                that.options = $.extend({
                    id: options.id || options.uid,
                    enable: true
                }, options, {
                    togglable: false // disable togglable for splitbutton
                });

                if (options.primary) {
                    that.options.themeColor = PRIMARY;
                }

                if (options.showIcon === OVERFLOW) {
                    that.options.icon = null;
                }

                if (options.showText === OVERFLOW) {
                    that.options.text = "";
                }

                that.toolbar = toolbar;

                that.splitButton = new ui.SplitButton($("<button id='" + that.options.id + "'>" + that.options.text + "</button>"),
                                                         $.extend({}, that.options, {
                                                             items: that._extend(options.menuButtons),
                                                        }), toolbar.options);
                that.element = that.splitButton.wrapper;

                that.splitButton.bind(CLICK, toolbar._buttonClick.bind(toolbar));
                that.splitButton.bind(CLOSE, that._close.bind(that));
                that.splitButton.bind(OPEN, that._open.bind(that));

                that.splitButton.element.data({
                    type: SPLITBUTTON,
                    button: that,
                    splitButton: that
                });

                that.splitButton.wrapper.data({
                    type: SPLITBUTTON,
                    button: that,
                    splitButton: that
                });

                that.addOverflowAttr();
                that.addUidAttr();
                that.attributes();
                that.addMenuAttributes();

                if (that.options.enable === false) {
                    that.enable(this.options.enable);
                }

                if (that.options.hidden) {
                    that.hide();
                }
            },
            _open: function(ev) {
                var that = this;
                var isDefaultPrevented = that.toolbar.trigger(OPEN, { target: that.element });
                if (isDefaultPrevented) {
                    ev.preventDefault();
                }
            },
            _close: function(ev) {
                var that = this;
                var isDefaultPrevented = that.toolbar.trigger(CLOSE, { target: that.element });
                if (isDefaultPrevented) {
                    ev.preventDefault();
                }
                that.splitButton.element.trigger(FOCUS);
            },
            _extend: function(items) {
                var that = this;
                return items.map(function(item) {
                    var itemInstance = new BareItem(item, that.toolbar);
                    return $.extend({}, item, {
                        togglable: false,
                        data: function() {
                            return {
                                type: BUTTON,
                                button: itemInstance,
                                splitButton: that
                            };
                        }
                    });
                });
            },
            addMenuAttributes: function() {
                var that = this,
                    items = that.splitButton.items(),
                    itemInstance;

                items.each(function(index, item) {
                    item = $(item);
                    itemInstance = item.data(BUTTON);
                    itemInstance.element = item;
                    itemInstance.options = $.extend({
                        type: BUTTON,
                        enable: true
                    }, itemInstance.options);

                    itemInstance.addOverflowAttr();
                    itemInstance.addUidAttr();
                });
            },
            remove: function() {
                var elmToRemove = this.splitButton.wrapper;
                this.splitButton.destroy();
                elmToRemove.remove();
            },
            enable: function(enable, item) {
                this.splitButton.enable(enable, item, true);

                if (this.twin()) {
                    this.twin().enable(enable);
                }
            },
            attributes: function() {
                var that = this,
                    mainButton = that.splitButton.element,
                    attributes = this.options.attributes,
                    classes;

                if (attributes) {
                    if (attributes.class) {
                        classes = attributes.class;

                        mainButton.addClass(classes);

                        delete attributes.class;
                    }

                    mainButton.attr(attributes);

                    attributes.class = classes;
                }
            },
        });

        kendo.toolbar.ToolBarSplitButton = ToolBarSplitButton;

        var OverflowSplitButton = Item.extend({
            init: function(options, toolbar) {
                var element = this.element = $('<li class="' + SPLIT_BUTTON + '"></li>'),
                    items = options.menuButtons,
                    item, splitContainerId;

                this.options = $.extend({}, options, { togglable: false });
                this.toolbar = toolbar;
                this.overflow = true;
                splitContainerId = (options.id || options.uid) + OPTION_LIST_SUFFIX;

                this.mainButton = new OverflowButton($.extend({ isChild: true }, options, { togglable: false }));
                this.mainButton.element.appendTo(element);

                for (var i = 0; i < items.length; i++) {
                    item = new OverflowButton($.extend({ mobile: options.mobile, type: BUTTON, splitContainerId: splitContainerId, isChild: true }, items[i], { click: options.click }), this.toolbar);
                    item.element.appendTo(element);
                }

                this.addUidAttr();
                this.addOverflowAttr();

                this.mainButton.main = true;

                if (this.options.enable === false) {
                    this.enable(this.options.enable);
                }

                element.data({
                    type: SPLITBUTTON,
                    splitButton: this
                });
            },

            enable: function(isEnabled) {
                var elements = this.element.add(this.element.find(DOT + OVERFLOW_BUTTON));

                if (isEnabled === undefined) {
                    isEnabled = true;
                }

                elements.toggleClass(STATE_DISABLED, !isEnabled);
                elements.attr(ARIA_DISABLED, !isEnabled);

                this.options.enable = isEnabled;
            },

            overflowHidden: function() {
                this.element.addClass(OVERFLOW_HIDDEN);
            }
        });

        kendo.toolbar.OverflowSplitButton = OverflowSplitButton;
        kendo.toolbar.registerComponent(SPLITBUTTON, ToolBarSplitButton, OverflowSplitButton);

        var ToolBarDropDownButton = Item.extend({
            init: function(options, toolbar) {
                var that = this;

                that.options = $.extend({
                    id: options.id || options.uid,
                    enable: true
                }, options, {
                    togglable: false // disable togglable for dropdownbutton
                });

                if (options.primary) {
                    that.options.themeColor = PRIMARY;
                }

                if (options.showIcon === OVERFLOW) {
                    that.options.icon = null;
                }

                if (options.showText === OVERFLOW) {
                    that.options.text = "";
                }

                that.toolbar = toolbar;

                that.dropDownButton = new ui.DropDownButton($("<button id='" + that.options.id + "'>" + that.options.text + "</button>"),
                                                         $.extend({}, that.options, {
                                                             items: that._extend(options.menuButtons)
                                                        }), toolbar.options);
                that.element = that.dropDownButton.element;

                that.dropDownButton.bind(CLICK, toolbar._buttonClick.bind(toolbar));
                that.dropDownButton.bind(CLOSE, that._close.bind(that));
                that.dropDownButton.bind(OPEN, that._open.bind(that));

                that.dropDownButton.element.data({
                    type: DROPDOWNBUTTON,
                    button: that,
                    dropDownButton: that
                });

                that.addOverflowAttr();
                that.addUidAttr();
                that.attributes();
                that.addMenuAttributes();

                if (that.options.enable === false) {
                    that.enable(this.options.enable);
                }

                if (that.options.hidden) {
                    that.hide();
                }
            },
            _open: function(ev) {
                var that = this;
                var isDefaultPrevented = that.toolbar.trigger(OPEN, { target: that.element });
                if (isDefaultPrevented) {
                    ev.preventDefault();
                }
            },
            _close: function(ev) {
                var that = this;
                var isDefaultPrevented = that.toolbar.trigger(CLOSE, { target: that.element });
                if (isDefaultPrevented) {
                    ev.preventDefault();
                }
                that.dropDownButton.element.trigger(FOCUS);
            },
            _extend: function(items) {
                var that = this;
                return items.map(function(item) {
                    var itemInstance = new BareItem(item, that.toolbar);
                    return $.extend({}, item, {
                        data: function() {
                            return {
                                type: BUTTON,
                                button: itemInstance,
                                dropDownButton: that
                            };
                        }
                    });
                });
            },
            addMenuAttributes: function() {
                var that = this,
                    items = that.dropDownButton.items(),
                    itemInstance;

                items.each(function(index, item) {
                    item = $(item);
                    itemInstance = item.data(BUTTON);
                    itemInstance.element = item;
                    itemInstance.options = $.extend({
                        type: BUTTON,
                        enable: true
                    }, itemInstance.options);

                    itemInstance.addOverflowAttr();
                    itemInstance.addUidAttr();
                });
            },
            remove: function() {
                var elmToRemove = this.dropDownButton.element;
                this.dropDownButton.destroy();
                elmToRemove.remove();
            },
            enable: function(enable, item) {
                this.dropDownButton.enable(enable, item, true);

                if (this.twin()) {
                    this.twin().enable(enable);
                }
            },
            attributes: function() {
                var that = this,
                    mainButton = that.element,
                    attributes = this.options.attributes,
                    classes;

                if (attributes) {
                    if (attributes.class) {
                        classes = attributes.class;

                        mainButton.addClass(classes);

                        delete attributes.class;
                    }

                    mainButton.attr(attributes);

                    attributes.class = classes;
                }
            },
        });

        kendo.toolbar.ToolBarSplitButton = ToolBarSplitButton;

        var OverflowTextItem = Item.extend({
            init: function(options, toolbar) {
                var element = this.element = $('<span></span>');

                this.element = element;
                this.options = options;
                this.toolbar = toolbar;
                this.overflow = true;

                this.attributes();
                this.addUidAttr();
                this.addOverflowIdAttr();

                if (options.icon && (!options.showIcon || options.showIcon !== "toolbar")) {
                    element.append("<span class=\"k-icon k-i-" + options.icon + "\"></span>");
                }

                if (options.showText !== "toolbar") {
                    element.append("<span>" + this.options.text + "</span>");
                }

                element.data({
                    type: TEXT_ITEM,
                    textItem: this
                });
            },

            overflowHidden: function() {
                this.element.addClass(OVERFLOW_HIDDEN);
            }
        });

        var OverflowDropDownButton = Item.extend({
            init: function(options, toolbar) {
                var element = this.element = $('<li class="' + SPLIT_BUTTON + ' ' + MENU_BUTTON + '"></li>'),
                    items = options.menuButtons,
                    item, splitContainerId;

                this.options = $.extend({}, options, { togglable: false });
                this.toolbar = toolbar;
                this.overflow = true;
                splitContainerId = (options.id || options.uid) + OPTION_LIST_SUFFIX;

                this.mainButton = new OverflowTextItem($.extend({ isChild: true }, options, { togglable: false }));
                this.mainButton.element.appendTo(element);

                for (var i = 0; i < items.length; i++) {
                    item = new OverflowButton($.extend({ mobile: options.mobile, type: BUTTON, splitContainerId: splitContainerId, isChild: true }, items[i], { click: options.click }), this.toolbar);
                    item.element.appendTo(element);
                }

                this.addUidAttr();
                this.addOverflowAttr();

                this.mainButton.main = true;

                if (this.options.enable === false) {
                    this.enable(this.options.enable);
                }

                element.data({
                    type: DROPDOWNBUTTON,
                    dropDownButton: this
                });
            },

            enable: function(isEnabled) {
                var elements = this.element.add(this.element.find(DOT + OVERFLOW_BUTTON));

                if (isEnabled === undefined) {
                    isEnabled = true;
                }

                elements.toggleClass(STATE_DISABLED, !isEnabled);
                elements.attr(ARIA_DISABLED, !isEnabled);

                this.options.enable = isEnabled;
            },

            overflowHidden: function() {
                this.element.addClass(OVERFLOW_HIDDEN);
            }
        });

        kendo.toolbar.OverflowSplitButton = OverflowDropDownButton;
        kendo.toolbar.registerComponent(DROPDOWNBUTTON, ToolBarDropDownButton, OverflowDropDownButton);

        var ToolBarSeparator = Item.extend({
            init: function(options, toolbar) {
                var element = this.element = $('<div>&nbsp;</div>');

                this.element = element;
                this.options = options;
                this.toolbar = toolbar;

                this.attributes();
                this.addIdAttr();
                this.addUidAttr();
                this.addOverflowAttr();

                element.addClass(KSEPARATOR);
                element.attr(ROLE, SEPARATOR);

                element.data({
                    type: SEPARATOR,
                    separator: this
                });
            }
        });

        var OverflowSeparator = Item.extend({
            init: function(options, toolbar) {
                var element = this.element = $('<li>&nbsp;</li>');

                this.element = element;
                this.options = options;
                this.toolbar = toolbar;
                this.overflow = true;

                this.attributes();
                this.addUidAttr();
                this.addOverflowIdAttr();

                element.addClass(KSEPARATOR);
                element.attr(ROLE, SEPARATOR);

                element.data({
                    type: SEPARATOR,
                    separator: this
                });
            },

            overflowHidden: function() {
                this.element.addClass(OVERFLOW_HIDDEN);
            }
        });

        kendo.toolbar.registerComponent("separator", ToolBarSeparator, OverflowSeparator);

        var ToolBarSpacer = Item.extend({
            init: function(options, toolbar) {
                var element = this.element = $('<div>&nbsp;</div>');

                this.element = element;
                this.options = options;
                this.toolbar = toolbar;

                element.addClass(SPACER_CLASS);

                element.data({
                    type: SPACER
                });
                this.addOverflowAttr();
            }
        });

        kendo.toolbar.registerComponent(SPACER, ToolBarSpacer);

        var TemplateItem = Item.extend({
            init: function(template, options, toolbar) {
                var element = isFunction(template) ? template(options) : template;

                if (!(element instanceof jQuery)) {
                    element = $("<div class='k-toolbar-item' aria-keyshortcuts='Enter'></div>").html(element);
                } else {
                    element = element.wrap("<div class='k-toolbar-item' aria-keyshortcuts='Enter'></div>").parent();
                }

                this.element = element;
                this.options = options;
                this.options.type = options.type || TEMPLATE;
                this.toolbar = toolbar;

                this.attributes();
                this.addUidAttr();
                this.addIdAttr();
                this.addOverflowAttr();

                if (options.hidden) {
                    this.hide();
                }

                element.data({
                    type: TEMPLATE,
                    template: this
                });
            }
        });

        kendo.toolbar.TemplateItem = TemplateItem;

        var OverflowTemplateItem = Item.extend({
            init: function(template, options, toolbar) {
                var element = isFunction(template) ? $(template(options)) : $(template);

                if (!(element instanceof jQuery)) {
                    element = $("<li></li>").html(element);
                } else {
                    element = element.wrap("<li></li>").parent();
                }

                this.element = element;
                this.options = options;
                this.options.type = TEMPLATE;
                this.toolbar = toolbar;
                this.overflow = true;

                this.attributes();
                this.addUidAttr();
                this.addOverflowIdAttr();
                this.addOverflowAttr();

                element.data({
                    type: TEMPLATE,
                    template: this
                });
            },

            overflowHidden: function() {
                this.element.addClass(OVERFLOW_HIDDEN);
            }
        });

        kendo.toolbar.OverflowTemplateItem = OverflowTemplateItem;

        function toggleActive(e) {
            if (!e.target.is(".k-toggle-button")) {
                e.target.toggleClass(STATE_SELECTED, e.type == "press");
            }
        }

        function actionSheetWrap(element) {
            element = $(element);

            return element.hasClass("km-actionsheet") ? element.closest(".km-popup-wrapper") : element.addClass("km-widget km-actionsheet")
                             .wrap('<div class="km-actionsheet-wrapper km-actionsheet-tablet km-widget km-popup"></div>').parent()
                             .wrap('<div class="km-popup-wrapper k-popup"></div>').parent();
        }

        function preventClick(e) {
            if ($(e.target).closest("a.k-button").length) {
                e.preventDefault();
            }
        }

        function findFocusableSibling(element, dir) {
            var getSibling = dir === NEXT ? $.fn.next : $.fn.prev;
            var getter = dir === NEXT ? $.fn.first : $.fn.last;
            var candidate = getSibling.call(element);

            if (!candidate.length && element.is(DOT + OVERFLOW_ANCHOR)) {
                return element;
            }

            if (candidate.is(KENDO_FOCUSABLE) || !candidate.length) {
                return candidate;
            }

            if (candidate.find(KENDO_FOCUSABLE).length) {
                return getter.call(candidate.find(KENDO_FOCUSABLE));
            }

            return findFocusableSibling(candidate, dir);
        }

        var Group = Class.extend({
            init: function(name) {
                this.name = name;
                this.buttons = [];
            },

            add: function(button) {
                this.buttons[this.buttons.length] = button;
            },

            remove: function(button) {
                var index = $.inArray(button, this.buttons);
                this.buttons.splice(index, 1);
            },

            select: function(button) {
                var tmp;
                for (var i = 0; i < this.buttons.length; i ++) {
                    tmp = this.buttons[i];

                    tmp.select(false);
                }

                button.select(true);
                if (button.twin()) {
                    button.twin().select(true);
                }
            }
        });

        var ToolBar = Widget.extend({
            init: function(element, options) {
                var that = this;
                Widget.fn.init.call(that, element, options);

                options = that.options;
                element = that.wrapper = that.element;

                element.addClass(TOOLBAR + " k-widget");
                element.attr(ROLE, "toolbar");

                this.uid = kendo.guid();
                this._isRtl = kendo.support.isRtl(element);
                this._groups = {};
                element.attr(KENDO_UID_ATTR, this.uid);

                that.isMobile = (typeof options.mobile === "boolean") ? options.mobile : that.element.closest(".km-root")[0];
                that.animation = that.isMobile ? { open: { effects: "fade" } } : {};

                if (that.isMobile) {
                    element.addClass("km-widget");
                    KBUTTON = "km-button";
                    BUTTON_GROUP = "km-buttongroup";
                    STATE_SELECTED = "km-state-active";
                    STATE_DISABLED = "km-state-disabled";
                }

                if (options.resizable) {
                    that._renderOverflow();
                    element.addClass(RESIZABLE_TOOLBAR);

                    that.overflowUserEvents = new kendo.UserEvents(that.element, {
                        threshold: 5,
                        allowSelection: true,
                        filter: DOT + OVERFLOW_ANCHOR,
                        tap: that._toggleOverflow.bind(that)
                    });

                    that._resizeHandler = kendo.onResize(function() {
                        that.resize();
                    });
                } else {
                    that.popup = { element: $([]) };
                }

                if (options.items && options.items.length) {
                    for (var i = 0; i < options.items.length; i++) {
                        that.add(options.items[i]);
                    }

                    if (options.resizable) {
                        that._shrink(that.element.innerWidth());
                    }
                }

                that.userEvents = new kendo.UserEvents(document.documentElement, {
                    threshold: 5,
                    allowSelection: true,
                    filter:
                        "[" + KENDO_UID_ATTR + "=" + that.uid + "] a." + KBUTTON + COMMA + EMPTY +
                        "[" + KENDO_UID_ATTR + "=" + that.uid + "] ." + OVERFLOW_ANCHOR + COMMA + EMPTY +
                        "[" + KENDO_UID_ATTR + "=" + that.uid + "] ." + SPLIT_BUTTON_ARROW + COMMA + EMPTY +
                        "[" + KENDO_UID_ATTR + "=" + that.uid + "] ." + TEMPLATE_ITEM + COMMA + EMPTY +
                        "[" + KENDO_UID_ATTR + "=" + that.uid + "] ." + MENU_BUTTON,
                    tap: that._buttonClick.bind(that),
                    press: toggleActive,
                    release: toggleActive
                });

                that.element.on(CLICK + ns, "a.k-button", preventClick)
                    .on(KEYDOWN + ns, that._keydown.bind(that))
                    .on("focusin" + ns, that._focusIn.bind(that))
                    .on("focusout" + ns, that._focusOut.bind(that));

                if (that.options.resizable) {
                    that.popup.element.on(CLICK + ns, + "a.k-button", preventClick);
                }

                if (options.resizable) {
                    that.overflowAnchor.appendTo(that.wrapper);
                    this._toggleOverflowAnchor();
                }

                that._tabIndex();

                kendo.notify(that);
            },

            events: [
                CLICK,
                TOGGLE,
                OPEN,
                CLOSE,
                OVERFLOW_OPEN,
                OVERFLOW_CLOSE
            ],

            options: {
                name: "ToolBar",
                items: [],
                resizable: true,
                mobile: null,
                navigateOnTab: false
            },

            addToGroup: function(button, groupName) {
                var group;

                if (!this._groups[groupName]) {
                    group = this._groups[groupName] = new Group();
                } else {
                    group = this._groups[groupName];
                }

                group.add(button);
                return group;
            },

            destroy: function() {
                var that = this;

                that.destroySplitButtons();
                that.destroyDropDownButtons();

                that.element.off(ns, "a.k-button");

                that.userEvents.destroy();

                if (that.options.resizable) {
                    kendo.unbindResize(that._resizeHandler);
                    that.overflowUserEvents.destroy();
                    that.popup.element.off(ns, "a.k-button");
                    that.popup.destroy();
                }

                Widget.fn.destroy.call(that);
            },

            destroySplitButtons: function() {
                var that = this,
                    splitButtonWrappers = that.element.find(DOT + SPLIT_BUTTON),
                    item;


                splitButtonWrappers.each(function(idx, element) {
                    item = that._getItem(element);

                    if (item && item.type === SPLITBUTTON) {
                        item = item.toolbar;
                    }

                    if (item && item.splitButton && item.splitButton.destroy) {
                        item.splitButton.destroy();
                        $(element).remove();
                    }
                });
            },

            destroyDropDownButtons: function() {
                var that = this,
                    dropDownButtons = that.element.find(DOT + MENU_BUTTON),
                    item;


                    dropDownButtons.each(function(idx, element) {
                    item = that._getItem(element);

                    if (item && item.type === DROPDOWNBUTTON) {
                        item = item.toolbar;
                    }

                    if (item && item.dropDownButton && item.dropDownButton.destroy) {
                        item.dropDownButton.destroy();
                        $(element).remove();
                    }
                });
            },

            add: function(options) {
                var component = components[options.type],
                    template = options.template,
                    tool, that = this,
                    itemClasses = that.isMobile ? NOTHING : "k-item",
                    overflowTemplate = options.overflowTemplate,
                    overflowTool, inputsInTemplate;

                $.extend(options, {
                    uid: kendo.guid(),
                    animation: that.animation,
                    mobile: that.isMobile,
                    rootUid: that.uid
                });

                if (options.menuButtons) {
                    for (var i = 0; i < options.menuButtons.length; i++) {
                        $.extend(options.menuButtons[i], {
                            uid: kendo.guid()
                        });
                    }
                }

                if ((template && !overflowTemplate) || options.type === SPACER) {
                    options.overflow = OVERFLOW_NEVER;
                } else if (!options.overflow) {
                    options.overflow = OVERFLOW_AUTO;
                }

                //add the command in the overflow popup
                if (options.overflow !== OVERFLOW_NEVER && that.options.resizable) {
                    if (overflowTemplate) { //template command
                         overflowTool = new OverflowTemplateItem(overflowTemplate, options, that);
                    } else if (component) { //build-in command
                        overflowTool = new component.overflow(options, that);
                        overflowTool.element.addClass(itemClasses);
                    }

                    if (overflowTool) {
                        if (options.overflow === OVERFLOW_AUTO) {
                            overflowTool.overflowHidden();
                        }

                        overflowTool.element.appendTo(that.popup.container);
                        that.angular("compile", function() {
                            return { elements: overflowTool.element.get() };
                        });
                    }
                }

                //add the command in the toolbar container
                if (options.overflow !== OVERFLOW_ALWAYS) {
                    if (template) { //template command
                        tool = new TemplateItem(template, options, that);
                        inputsInTemplate = tool.element.find(INPUT + COMMA + SELECT);

                        if (!this.options.navigateOnTab && inputsInTemplate.length > 0) {
                            tool.element.attr(TABINDEX, 0);
                            inputsInTemplate.attr(TABINDEX, -1);
                        }
                    } else if (component) { //build-in command
                        tool = new component.toolbar(options, that);
                    }

                    if (tool) {
                        tool.element.appendTo(that.element);

                        that.angular("compile", function() {
                            return { elements: tool.element.get() };
                        });
                    }
                }
            },

            _getItem: function(candidate) {
                var element,
                    toolbarItem,
                    overflowItem,
                    isResizable = this.options.resizable,
                    type;

                //find toolbar item
                element = this.element.find(candidate);

                if (!element.length) {
                    element = $("[data-role=\"buttonmenu\"]").find(candidate);
                }

                type = element.length ? element.data("type") : NOTHING;
                toolbarItem = element.data(type);

                if (toolbarItem && isResizable) {

                        overflowItem = toolbarItem.twin();
                } else if (isResizable) { //find overflow item
                    element = this.popup.element.find(candidate);
                    type = element.length ? element.data("type") : NOTHING;
                    overflowItem = element.data(type);

                    if (type === TEXT_ITEM) {
                        element = element.parent(DOT + MENU_BUTTON);
                        type = "dropDownButton";
                        overflowItem = element.data(type);
                    }

                    if (overflowItem && overflowItem.main && type !== TEXT_ITEM) {
                        element = element.parent(DOT + SPLIT_BUTTON);
                        type = "splitButton";
                        overflowItem = element.data(type);
                    }
                }

                return {
                    type: type,
                    toolbar: toolbarItem,
                    overflow: overflowItem
                };
            },

            remove: function(candidate) {
                var item = this._getItem(candidate);

                if (item.toolbar) { item.toolbar.remove(); }
                if (item.overflow) { item.overflow.remove(); }

                this.resize(true);
            },

            hide: function(candidate) {
                var item = this._getItem(candidate);
                var buttonGroupInstance;

                if (item.toolbar) {
                    if (item.toolbar.options.type === BUTTON && item.toolbar.options.isChild) {
                        buttonGroupInstance = item.toolbar.getParentGroup();

                        item.toolbar.hide();

                        if (buttonGroupInstance) {
                            buttonGroupInstance.refresh();
                        }
                    } else if (!item.toolbar.options.hidden) {
                        item.toolbar.hide();
                    }
                }

                if (item.overflow) {
                    if (item.overflow.options.type === BUTTON && item.overflow.options.isChild) {
                        buttonGroupInstance = item.overflow.getParentGroup();

                        item.overflow.hide();

                        if (buttonGroupInstance) {
                            buttonGroupInstance.refresh();
                        }
                    } else if (!item.overflow.options.hidden) {
                        item.overflow.hide();
                    }
                }

                this.resize(true);
            },

            show: function(candidate) {
                var item = this._getItem(candidate);
                var buttonGroupInstance;

                if (item.toolbar) {
                    if (item.toolbar.options.type === BUTTON && item.toolbar.options.isChild) {
                        buttonGroupInstance = item.toolbar.getParentGroup();
                        item.toolbar.show();

                        if (buttonGroupInstance) {
                            buttonGroupInstance.refresh();
                        }
                    } else if (item.toolbar.options.hidden) {
                        item.toolbar.show();
                    }
                }

                if (item.overflow) {
                    if (item.overflow.options.type === BUTTON && item.overflow.options.isChild) {
                        buttonGroupInstance = item.overflow.getParentGroup();

                        item.toolbar.show();

                        if (buttonGroupInstance) {
                            buttonGroupInstance.refresh();
                        }
                    } else if (item.overflow.options.hidden) {
                        item.overflow.show();
                    }
                }

                this.resize(true);
            },

            enable: function(element, enable) {
                var item = this._getItem(element);

                if (typeof enable == "undefined") {
                    enable = true;
                }

                if (item.toolbar) { item.toolbar.enable(enable, item.element); }
                if (item.overflow) { item.overflow.enable(enable); }
            },

            getSelectedFromGroup: function(groupName) {
                return this.element.find(DOT + TOGGLE_BUTTON + "[data-group='" + groupName + "']").filter(DOT + STATE_SELECTED);
            },

            toggle: function(button, checked) {
                var element = $(button),
                    item = element.data(BUTTON);

                if (item.options.togglable) {
                    if (checked === undefined) {
                        checked = true;
                    }

                    item.toggle(checked, true);
                }
            },

            _renderOverflow: function() {
                var that = this,
                    overflowContainer = components.overflowContainer,
                    isRtl = that._isRtl,
                    horizontalDirection = isRtl ? "left" : "right";

                that.overflowAnchor = $(components.overflowAnchor).addClass(KBUTTON);

                that.element.append(that.overflowAnchor);

                if (that.isMobile) {
                    that.overflowAnchor.append('<span class="km-icon km-more"></span>');
                    overflowContainer = actionSheetWrap(overflowContainer);
                } else {
                    that.overflowAnchor.append('<span class="k-icon k-i-more-vertical"></span>');
                }

                that.popup = new kendo.ui.Popup(overflowContainer, {
                    origin: "bottom " + horizontalDirection,
                    position: "top " + horizontalDirection,
                    anchor: that.overflowAnchor,
                    isRtl: isRtl,
                    animation: that.animation,
                    appendTo: that.isMobile ? $(that.isMobile).children(".km-pane") : null,
                    copyAnchorStyles: false,
                    open: function(e) {
                        var wrapper = kendo.wrap(that.popup.element)
                            .addClass(OVERFLOW_WRAPPER);

                        if (!that.isMobile) {
                            wrapper.css("margin-left", (isRtl ? -1 : 1) * ((outerWidth(wrapper) - wrapper.width()) / 2 + 1));
                        } else {
                            that.popup.container.css("max-height", (parseFloat($(".km-content:visible").innerHeight()) - 15) + "px");
                        }

                        if (that.trigger(OVERFLOW_OPEN)) {
                            e.preventDefault();
                        }
                    },
                    activate: function() {
                        this.element.find(KENDO_FOCUSABLE).first().trigger(FOCUS);
                    },
                    close: function(e) {
                        if (that.trigger(OVERFLOW_CLOSE)) {
                            e.preventDefault();
                        }

                        this.element.trigger(FOCUS);
                    }
                });

                that.popup.element.on(KEYDOWN + ns, DOT + KBUTTON, function(e) {
                    var target = $(e.target),
                        li = target.parent(),
                        isComplexTool = li.is(DOT + BUTTON_GROUP) || li.is(DOT + SPLIT_BUTTON),
                        element;

                    e.preventDefault();

                    if (e.keyCode === keys.ESC || e.keyCode === keys.TAB || (e.altKey && e.keyCode === keys.UP)) {
                        that._toggleOverflow();
                        that.overflowAnchor.trigger(FOCUS);
                    } else if (e.keyCode === keys.DOWN) {
                        element = !isComplexTool || (isComplexTool && target.is(":last-child")) || (isComplexTool && !target.next().is(KENDO_FOCUSABLE)) ? li : target;
                        findFocusableSibling(element, NEXT).trigger(FOCUS);
                    } else if (e.keyCode === keys.UP) {
                        element = !isComplexTool || (isComplexTool && target.is(":first-child")) || (isComplexTool && !target.prev().is(KENDO_FOCUSABLE)) ? li : target;
                        findFocusableSibling(element, PREV).trigger(FOCUS);
                    } else if ((e.keyCode === keys.SPACEBAR || e.keyCode === keys.ENTER) && !$(e.target).is(DOT + STATE_DISABLED)) {
                        that.userEvents.trigger(TAP, { target: $(e.target) });
                        that.overflowAnchor.trigger(FOCUS);
                    } else if (e.keyCode === keys.HOME) {
                        li.parent().find(KENDO_FOCUSABLE).first().trigger(FOCUS);
                    } else if (e.keyCode === keys.END) {
                        li.parent().find(KENDO_FOCUSABLE).last().trigger(FOCUS);
                    }
                });

                if (that.isMobile) {
                    that.popup.container = that.popup.element.find(DOT + OVERFLOW_CONTAINER);
                } else {
                    that.popup.container = that.popup.element;
                }

                that.popup.container.attr(KENDO_UID_ATTR, this.uid);
            },

            _toggleOverflowAnchor: function() {
                var hasVisibleChildren = false;
                var paddingEnd = this._isRtl ? "padding-left" : "padding-right";

                if (this.options.mobile) {
                    hasVisibleChildren = this.popup.element.find(DOT + OVERFLOW_CONTAINER).children(":not(." + OVERFLOW_HIDDEN + ", ." + POPUP + ")").length > 0;
                } else {
                    hasVisibleChildren = this.popup.element.children(":not(." + OVERFLOW_HIDDEN + ", ." + POPUP + ")").length > 0;
                }

                if (hasVisibleChildren) {
                    this.overflowAnchor.css({
                        visibility: "visible",
                        width: NOTHING
                    });
                    this.wrapper.css(paddingEnd, this.overflowAnchor.outerWidth(true));
                } else {
                    this.overflowAnchor.css({
                        visibility: HIDDEN,
                        width: "1px"
                    });
                    this.wrapper.css(paddingEnd, NOTHING);
                }
            },

            _buttonClick: function(e) {
                var that = this,
                    target = $(e.target),
                    item, handler, eventData, urlTarget,
                    templateFocusable;

                e.preventDefault();

                if (target.hasClass(MENU_BUTTON) || target.hasClass(OVERFLOW_ANCHOR)) {
                    that._resetTabIndex(target);
                    return;
                } else if (target.hasClass(SPLIT_BUTTON_ARROW)) {
                    that._resetTabIndex(target.prev());
                    return;
                } else if (target.hasClass(TEMPLATE_ITEM)) {
                    templateFocusable = target.find(INPUT + COMMA + SELECT + COMMA + DOT + DROPDOWNLIST);

                    if (templateFocusable.length > 0) {
                        that._resetTabIndex(templateFocusable.first());
                    }

                    return;
                }

                if (!target.data(SPLITBUTTON)) {
                    target = $(e.target).closest(DOT + KBUTTON + COMMA + DOT + MENU_LINK, that.element);
                }

                item = target.data(BUTTON);

                if (item && !target.hasClass(MENU_ITEM)) {
                    that._resetTabIndex(target);
                }

                if (!item && that.popup) {
                    target = $(e.target).closest(DOT + OVERFLOW_BUTTON, that.popup.container);
                    item = target.parent("li").data(BUTTON);
                }

                if (!item || !item.options.enable) {
                    return;
                }

                if (item.options.togglable) {
                    handler = isFunction(item.toggleHandler) ? item.toggleHandler : null;

                    item.toggle(!item.options.selected, true);
                    eventData = { target: target, group: item.options.group, checked: item.options.selected, id: item.options.id, item: item };

                    if (handler) { handler.call(that, eventData); }
                    that.trigger(TOGGLE, eventData);
                } else {
                    handler = isFunction(item.clickHandler) ? item.clickHandler : null;
                    eventData = { sender: that, target: target, id: item.options.id, item: item };

                    if (handler) { handler.call(that, eventData); }
                    that.trigger(CLICK, eventData);
                }

                if (item.options.url) {
                    if (item.options.attributes && item.options.attributes.target) {
                        urlTarget = item.options.attributes.target;
                    }
                    window.open(item.options.url, urlTarget || "_self");
                }

                if (target.hasClass(OVERFLOW_BUTTON)) {
                    that.popup.close();
                }
            },

            _focusOut: function(e) {
                this.wrapper.find(DOT + KBUTTON + DOT + KFOCUS).removeClass(KFOCUS);
            },

            _focusIn: function(e) {
                var target = $(e.target);

                if (target.closest(DOT + KBUTTON).length > 0) {
                    target.closest(DOT + KBUTTON).addClass(KFOCUS);
                }
            },

            _keydown: function(e) {
                var target = $(e.target),
                    keyCode = e.keyCode,
                    items = this._getItems(),
                    direction = this._isRtl ? -1 : 1,
                    templateItem = target.closest(DOT + TEMPLATE_ITEM),
                    last, next, innerFocusable, innerWidget, widgetInstance;

                if (e.altKey && keyCode === keys.DOWN) {
                    var isOverflowAnchor = $(document.activeElement).is(DOT + OVERFLOW_ANCHOR);

                    if (isOverflowAnchor) {
                        this._toggleOverflow();
                    }

                    return;
                }

                if (!this.options.navigateOnTab && keyCode === keys.ENTER && target.hasClass(TEMPLATE_ITEM)) {
                    innerFocusable = target.find(KENDO_FOCUSABLE + ":not('" + DOT + INPUT_BUTTON + "')" + COMMA + DOT + DROPDOWNLIST);

                    if (innerFocusable.length > 0) {
                        target.attr(TABINDEX, -1);

                        innerFocusable.attr(TABINDEX, 0);
                        innerFocusable.first().trigger(FOCUS);
                    }

                    return;
                } else if (!this.options.navigateOnTab && keyCode === keys.ESC && templateItem.length > 0) {
                    innerWidget = templateItem.find("[data-role]");
                    innerFocusable = templateItem.find(KENDO_FOCUSABLE + ":not('" + DOT + INPUT_BUTTON + "')" + COMMA + DOT + DROPDOWNLIST);

                    if (innerWidget.length > 0) {
                        widgetInstance = kendo.widgetInstance(innerWidget);

                        if (widgetInstance) {
                            if (widgetInstance.popup && widgetInstance.popup.visible()) {
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

                    return;
                } else if ((keyCode === keys.SPACEBAR || keyCode === keys.ENTER) && !target.is(INPUT + COMMA + CHECKBOX + COMMA + BUTTON)) {
                    if (keyCode === keys.SPACEBAR) {
                        e.preventDefault(); //prevent spacebar to scroll the page down
                        this.userEvents.trigger(TAP, { target: target });
                    }

                    return;
                }

                if (keyCode === keys.HOME) {
                    if (target.is(DOT + DROPDOWNLIST) || target.is(INPUT)) {
                        return;
                    }

                    this._resetTabIndex(items.first());
                    items.first().trigger(FOCUS);
                    e.preventDefault();
                } else if (keyCode === keys.END) {
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
                } else if (!this.options.navigateOnTab && keyCode === keys.RIGHT && !target.is(INPUT + ":not([type=file])" + COMMA + SELECT + COMMA + DOT + DROPDOWNLIST + COMMA + DOT + COLORPICKER) && this._getNextElement(e.target, 1 * direction)) {
                    next = $(this._getNextElement(e.target, 1 * direction));
                    this._resetTabIndex(next);
                    next.trigger(FOCUS);

                    e.preventDefault();
                } else if (!this.options.navigateOnTab && keyCode === keys.LEFT && !target.is(INPUT + ":not([type=file])" + COMMA + SELECT + COMMA + EMPTY + DOT + DROPDOWNLIST + COMMA + DOT + COLORPICKER) && this._getNextElement(e.target, -1 * direction)) {
                    next = $(this._getNextElement(e.target, -1 * direction));
                    this._resetTabIndex(next);
                    next.trigger(FOCUS);

                    e.preventDefault();
                }
            },

            _getNextElement: function(item, direction) {
                var items = this._getItems(),
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

            _getItems: function() {
                return this.wrapper.find(KENDO_FOCUSABLE + COMMA + DOT + TEMPLATE_ITEM + COMMA + DOT + OVERFLOW_ANCHOR + COMMA + DOT + "k-switch").filter(function() {
                    var current = $(this);

                    if (current.hasClass("k-hidden")) {
                        return false;
                    } else if (current.hasClass(OVERFLOW_ANCHOR) && current.css("visibility") === HIDDEN) {
                        return false;
                    } else if (current.hasClass(TEMPLATE_ITEM) && current.find(DOT + "k-picker" + COMMA + DOT + "k-input").length === 0) {
                        return false;
                    } else if (!current.hasClass(TEMPLATE_ITEM) && current.closest(DOT + TEMPLATE_ITEM).length > 0) {
                        return false;
                    } else if (current.hasClass(INPUT_BUTTON) || current.hasClass(SPLIT_BUTTON_ARROW)) {
                        return false;
                    }

                    return true;
                });
            },

            _toggle: function(e) {
                var splitButton = $(e.target).closest(DOT + SPLIT_BUTTON).data("splitButton");

                e.preventDefault();

                if (!splitButton.options.enable) {
                    return;
                }

                splitButton.toggle();
            },

            _toggleOverflow: function() {
                this.popup.toggle();
            },

            _resize: function(e) {
                var containerWidth = e.width;

                if (!this.options.resizable) {
                    return;
                }

                this.popup.close();

                this._shrink(containerWidth);
                this._stretch(containerWidth);

                this._markVisibles();

                this._toggleOverflowAnchor();
            },

            _childrenWidth: function() {
                var childrenWidth = 0;
                var gap = parseInt(this.element.css('gap'), 10) || 0;

                this.element.children(":visible:not(" + DOT + SPACER_CLASS + ")").each(function() {
                    childrenWidth += outerWidth($(this), true) + gap;
                });

                return Math.ceil(childrenWidth);
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
                            activeElement = commandElement.find("[tabindex=0]");

                            if (activeElement.length > 0) {
                                activeElement.attr(TABINDEX, -1);
                                this.element.children(DOT + OVERFLOW_ANCHOR).attr(TABINDEX, 0);
                            }

                            this._hideItem(commandElement);
                        }
                    }
                }
            },

            _stretch: function(containerWidth) {
                var commandElement,
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
            },

            _hideItem: function(item) {
                item.addClass(STATE_HIDDEN);

                if (this.popup) {
                    this.popup.container
                        .find(">li[data-uid='" + item.data(UID) + "']")
                        .removeClass(OVERFLOW_HIDDEN);
                }
            },

            _showItem: function(item, containerWidth) {
                var gap = parseInt(this.element.css('gap'), 10) || 0;
                // From jquery.outerWidth docs:
                //  > jQuery will attempt to temporarily show and then re-hide an element
                //  > in order to measure its dimensions, but this is unreliable
                // Thus we show and hide the item
                item.removeClass(STATE_HIDDEN);
                var itemOuterWidth = outerWidth(item, true) + gap;
                item.addClass(STATE_HIDDEN);

                if (item.length && containerWidth > this._childrenWidth() + itemOuterWidth) {
                    item.removeClass(STATE_HIDDEN);

                    if (this.options.navigateOnTab !== true) {
                        item.find(KENDO_FOCUSABLE).attr(TABINDEX, -1);
                    }

                    if (this.popup) {
                        this.popup.container
                            .find(">li[data-uid='" + item.data(UID) + "']")
                            .addClass(OVERFLOW_HIDDEN);
                    }

                    return true;
                }

                return false;
            },

            _markVisibles: function() {
                var overflowItems = this.popup.container.children(),
                    toolbarItems = this.element.children(":not(" + DOT + OVERFLOW_ANCHOR + ")"),
                    visibleOverflowItems = overflowItems.filter(":not(" + DOT + OVERFLOW_HIDDEN + ")"),
                    visibleToolbarItems = toolbarItems.filter(":visible");

                overflowItems.add(toolbarItems).removeClass(FIRST_TOOLBAR_VISIBLE + EMPTY + LAST_TOOLBAR_VISIBLE);
                visibleOverflowItems.first().add(visibleToolbarItems.first()).addClass(FIRST_TOOLBAR_VISIBLE);
                visibleOverflowItems.last().add(visibleToolbarItems.last()).addClass(LAST_TOOLBAR_VISIBLE);
            },

            _resetTabIndex: function(toFocus) {
                if (this.options.navigateOnTab !== true) {
                    this.wrapper.find(KENDO_FOCUSABLE).attr(TABINDEX, -1);
                    toFocus.attr(TABINDEX, 0);
                }
            },

            _tabIndex: function() {
                var focusableItems = this.wrapper.find(KENDO_FOCUSABLE + ":not('[tabindex=-1]')"),
                    firstFocusable = focusableItems.first();

                if (this.options.navigateOnTab !== true) {
                    focusableItems.attr(TABINDEX, -1);
                    firstFocusable.attr(TABINDEX, 0);
                }
            }
        });

    kendo.ui.plugin(ToolBar);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3) { (a3 || a2)(); });
