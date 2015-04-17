(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = {
    id: "toolbar",
    name: "ToolBar",
    category: "web",
    description: "The ToolBar widget displays one or more command buttons divided into groups.",
    depends: [ "core" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        Class = kendo.Class,
        Widget = kendo.ui.Widget,
        proxy = $.proxy,
        isFunction = kendo.isFunction,

        TOOLBAR = "k-toolbar",
        BUTTON = "k-button",
        OVERFLOW_BUTTON = "k-overflow-button",
        TOGGLE_BUTTON = "k-toggle-button",
        BUTTON_GROUP = "k-button-group",
        SPLIT_BUTTON = "k-split-button",
        SEPARATOR = "k-separator",
        POPUP = "k-popup",

        RESIZABLE_TOOLBAR = "k-toolbar-resizable",
        STATE_ACTIVE = "k-state-active",
        STATE_DISABLED = "k-state-disabled",
        STATE_HIDDEN = "k-state-hidden",
        GROUP_START = "k-group-start",
        GROUP_END = "k-group-end",
        PRIMARY = "k-primary",

        ICON = "k-icon",
        ICON_PREFIX = "k-i-",
        BUTTON_ICON = "k-button-icon",
        BUTTON_ICON_TEXT = "k-button-icontext",

        LIST_CONTAINER = "k-list-container k-split-container",
        SPLIT_BUTTON_ARROW = "k-split-button-arrow",

        OVERFLOW_ANCHOR = "k-overflow-anchor",
        OVERFLOW_CONTAINER = "k-overflow-container",
        FIRST_TOOLBAR_VISIBLE = "k-toolbar-first-visible",
        LAST_TOOLBAR_VISIBLE = "k-toolbar-last-visible",

        CLICK = "click",
        TOGGLE = "toggle",
        OPEN = "open",
        CLOSE = "close",
        OVERFLOW_OPEN = "overflowOpen",
        OVERFLOW_CLOSE = "overflowClose",

        OVERFLOW_NEVER = "never",
        OVERFLOW_AUTO = "auto",
        OVERFLOW_ALWAYS = "always",
        OVERFLOW_HIDDEN = "k-overflow-hidden",

        KENDO_UID_ATTR = kendo.attr("uid"),

        template = kendo.template;

        var Item = kendo.Class.extend({
            addOverflowAttr: function() {
                this.element.attr(kendo.attr("overflow"), this.options.overflow || OVERFLOW_AUTO);
            },

            addUidAttr: function() {
                this.element.attr(KENDO_UID_ATTR, this.options.uid);
            },

            addIdAttr: function() {
                if (this.options.id) {
                    this.element.attr("id", this.options.id);
                }
            },

            addOverflowIdAttr: function() {
                if (this.options.id) {
                    this.element.attr("id", this.options.id + "_overflow");
                }
            },

            attributes: function() {
                if (this.options.attributes) {
                    this.element.attr(this.options.attributes);
                }
            },

            show: function() {
                this.element.removeClass(STATE_HIDDEN).show();
                this.options.hidden = false;
            },

            hide: function() {
                this.element.addClass(STATE_HIDDEN).hide();
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
                this.options.enable = isEnabled;
            },

            twin: function() {
                var uid = this.element.attr(KENDO_UID_ATTR);
                if (this.overflow) {
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

        var Button = Item.extend({
            init: function(options, toolbar) {
                var element = options.useButtonTag ? $('<button></button>') : $('<a></a>');

                this.element = element;
                this.options = options;
                this.toolbar = toolbar;

                this.attributes();

                if (options.primary) {
                    element.addClass(PRIMARY);
                }

                if (options.togglable) {
                    element.addClass(TOGGLE_BUTTON);
                    this.toggle(options.selected);
                }

                if (options.url !== undefined && !options.useButtonTag) {
                    element.attr("href", options.url);
                    if (options.mobile) {
                        element.attr(kendo.attr("role"), "button");
                    }
                }

                if (options.group) {
                    element.attr(kendo.attr("group"), options.group);
                    if ((this.overflow && this.options.overflow === OVERFLOW_ALWAYS) || !this.overflow) {
                        this.group = this.toolbar.addToGroup(this, options.group);
                    }
                }

                if (!options.togglable && options.click && isFunction(options.click)) {
                    this.clickHandler = options.click;
                }

                if (options.togglable && options.toggle && isFunction(options.toggle)) {
                    this.toggleHandler = options.toggle;
                }
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
                    return this.element.closest("." + BUTTON_GROUP).data("buttonGroup");
                }
            },

            _addGraphics: function() {
                var element = this.element,
                    icon = this.options.icon,
                    spriteCssClass = this.options.spriteCssClass,
                    imageUrl = this.options.imageUrl,
                    isEmpty, span, img;

                if (spriteCssClass || imageUrl || icon) {
                    isEmpty = true;

                    element.contents().not("span.k-sprite,span." + ICON + ",img.k-image").each(function(idx, el){
                        if (el.nodeType == 1 || el.nodeType == 3 && $.trim(el.nodeValue).length > 0) {
                            isEmpty = false;
                        }
                    });

                    if (isEmpty) {
                        element.addClass(BUTTON_ICON);
                    } else {
                        element.addClass(BUTTON_ICON_TEXT);
                    }
                }

                if (icon) {
                    span = element.children("span." + ICON).first();
                    if (!span[0]) {
                        span = $('<span class="' + ICON + '"></span>').prependTo(element);
                    }
                    span.addClass(ICON_PREFIX + icon);
                } else if (spriteCssClass) {
                    span = element.children("span.k-sprite").first();
                    if (!span[0]) {
                        span = $('<span class="k-sprite"></span>').prependTo(element);
                    }
                    span.addClass(spriteCssClass);
                } else if (imageUrl) {
                    img = element.children("img.k-image").first();
                    if (!img[0]) {
                        img = $('<img alt="icon" class="k-image" />').prependTo(element);
                    }
                    img.attr("src", imageUrl);
                }
            }
        });

        var ToolBarButton = Button.extend({
            init: function(options, toolbar) {
                Button.fn.init.call(this, options, toolbar);

                var element = this.element;

                element.addClass(BUTTON);

                this.addIdAttr();

                if (options.align) {
                    element.addClass("k-align-" + options.align);
                }

                if (options.showText != "overflow" && options.text) {
                    if (options.mobile) {
                        element.html('<span class="km-text">' + options.text + "</span>");
                    } else {
                        element.html(options.text);
                    }
                }

                options.hasIcon = (options.showIcon != "overflow") && (options.icon || options.spriteCssClass || options.imageUrl);
                if (options.hasIcon) {
                    this._addGraphics();
                }

                this.attributes();
                this.addUidAttr();
                this.addOverflowAttr();
                this.enable(options.enable);

                if (options.hidden) {
                    this.hide();
                }

                this.element.data({
                    type: "button",
                    button: this
                });
            },

            select: function(selected) {
                if (selected === undefined) {
                    selected = false;
                }

                this.element.toggleClass(STATE_ACTIVE, selected);
                this.options.selected = selected;
            }
        });

        var OverflowButton = Button.extend({
            init: function(options, toolbar) {
                this.overflow = true;

                Button.fn.init.call(this, options, toolbar);

                var element = this.element;

                element.addClass(OVERFLOW_BUTTON + " " + BUTTON);

                if (options.showText != "toolbar" && options.text) {
                    if (options.mobile) {
                        element.html('<span class="km-text">' + options.text + "</span>");
                    } else {
                        element.html(options.text);
                    }
                }

                options.hasIcon = (options.showIcon != "toolbar") && (options.icon || options.spriteCssClass || options.imageUrl);
                if (options.hasIcon) {
                    this._addGraphics();
                }

                if (!options.isChild) {
                    this._wrap();
                }

                this.addOverflowIdAttr();
                this.attributes();
                this.addUidAttr();
                this.addOverflowAttr();
                this.enable(options.enable);

                if (options.hidden) {
                    this.hide();
                }

                this.element.data({
                    type: "button",
                    button: this
                });
            },

            _wrap: function() {
                this.element = this.element.wrap("<li></li>").parent();
            },

            overflowHidden: function() {
                this.element.addClass(OVERFLOW_HIDDEN);
            },

            select: function(selected) {
                if (selected === undefined) {
                    selected = false;
                }

                if (this.options.isChild) {
                    this.element.toggleClass(STATE_ACTIVE, selected);
                } else {
                    this.element.find(".k-button").toggleClass(STATE_ACTIVE, selected);
                }
                this.options.selected = selected;
            }
        });

        var ButtonGroup = Item.extend({
            createButtons: function(buttonConstructor) {
                var options = this.options;
                var items = options.buttons || [];
                var item;

                for (var i = 0; i < items.length; i++) {
                    if (!items[i].uid) {
                        items[i].uid = kendo.guid();
                    }
                    item = new buttonConstructor($.extend({ mobile: options.mobile, isChild: true, type: "button" }, items[i]), this.toolbar);
                    item.element.appendTo(this.element);
                }
            },

            refresh: function() {
                this.element.children().filter(":not('." + STATE_HIDDEN + "'):first").addClass(GROUP_START);
                this.element.children().filter(":not('." + STATE_HIDDEN + "'):last").addClass(GROUP_END);
            }
        });

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

                this.element.data({
                    type: "buttonGroup",
                    buttonGroup: this
                });
            }
        });

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

                element.addClass((options.mobile ? "" : BUTTON_GROUP) + " k-overflow-group");

                this.element.data({
                    type: "buttonGroup",
                    buttonGroup: this
                });
            },

            overflowHidden: function() {
                this.element.addClass(OVERFLOW_HIDDEN);
            }
        });

        var ToolBarSplitButton = Item.extend({
            init: function(options, toolbar) {
                var element = this.element = $('<div class="' + SPLIT_BUTTON + '"></div>');

                this.options = options;
                this.toolbar = toolbar;

                this.mainButton = new ToolBarButton(options, toolbar);
                this.arrowButton = $('<a class="' + BUTTON + " " + SPLIT_BUTTON_ARROW + '"><span class="' + (options.mobile ? "km-icon km-arrowdown" : "k-icon k-i-arrow-s") + '"></span></a>');
                this.popupElement = $('<ul class="' + LIST_CONTAINER + '"></ul>');

                this.mainButton.element.appendTo(element);
                this.arrowButton.appendTo(element);
                this.popupElement.appendTo(element);

                if (options.align) {
                    element.addClass("k-align-" + options.align);
                }

                if (!options.id) {
                    options.id = options.uid;
                }

                element.attr("id", options.id + "_wrapper");

                this.addOverflowAttr();
                this.addUidAttr();

                this.createMenuButtons();
                this.createPopup();

                this.mainButton.main = true;

                element.data({
                    type: "splitButton",
                    splitButton: this,
                    kendoPopup: this.popup
                });
            },

            createMenuButtons: function() {
                var options = this.options;
                var items = options.menuButtons;
                var item;

                for (var i = 0; i < items.length; i++) {
                    item = new ToolBarButton($.extend({ mobile: options.mobile, type: "button", click: options.click }, items[i]), this.toolbar);
                    item.element.wrap("<li></li>").parent().appendTo(this.popupElement);
                }
            },

            createPopup: function() {
                var options = this.options;
                var element = this.element;

                this.popupElement
                        .attr("id", options.id + "_optionlist")
                        .attr(KENDO_UID_ATTR, options.rootUid);

                if (options.mobile) {
                    this.popupElement = actionSheetWrap(this.popupElement);
                }

                this.popup = this.popupElement.kendoPopup({
                    appendTo: options.mobile ? $(options.mobile).children(".km-pane") : null,
                    anchor: element,
                    copyAnchorStyles: false,
                    animation: options.animation,
                    open: adjustPopupWidth
                }).data("kendoPopup");
            },

            remove: function() {
                this.popup.destroy();
                this.element.remove();
            },

            toggle: function() {
                this.popup.toggle();
            },

            enable: function(isEnabled) {
                if (isEnabled === undefined) {
                    isEnabled = true;
                }
                this.mainButton.enable(isEnabled);
                this.options.enable = isEnabled;
            }

        });

        var OverflowSplitButton = Item.extend({
            init: function(options, toolbar) {
                var element = this.element = $('<li class="' + SPLIT_BUTTON + '"></li>'),
                    items = options.menuButtons,
                    item;

                this.options = options;
                this.toolbar = toolbar;
                this.overflow = true;

                this.mainButton = new OverflowButton($.extend({ isChild: true }, options));
                this.mainButton.element.appendTo(element);

                for (var i = 0; i < items.length; i++) {
                    item = new OverflowButton($.extend({ mobile: options.mobile, isChild: true }, items[i]), this.toolbar);
                    item.element.appendTo(element);
                }

                this.addUidAttr();
                this.addOverflowAttr();

                this.mainButton.main = true;

                element.data({
                    type: "splitButton",
                    splitButton: this
                });
            },

            overflowHidden: function() {
                this.element.addClass(OVERFLOW_HIDDEN);
            }
        });

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

                element.addClass(SEPARATOR);

                element.data({
                    type: "separator",
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

                element.addClass(SEPARATOR);

                element.data({
                    type: "separator",
                    separator: this
                });
            },

            overflowHidden: function() {
                this.element.addClass(OVERFLOW_HIDDEN);
            }
        });

        var TemplateItem = Item.extend({
            init: function(template, options, toolbar) {
                var element = isFunction(template) ? template(options) : template;

                if (!(element instanceof jQuery)) {
                    element = $("<div></div>").html(element);
                } else {
                    element = element.wrap("<div></div>").parent();
                }

                this.element = element;
                this.options = options;
                this.options.type = "template";
                this.toolbar = toolbar;

                this.attributes();
                this.addUidAttr();
                this.addIdAttr();
                this.addOverflowAttr();

                element.data({
                    type: "template",
                    template: this
                });
            }
        });

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
                this.options.type = "template";
                this.toolbar = toolbar;
                this.overflow = true;

                this.attributes();
                this.addUidAttr();
                this.addOverflowIdAttr();
                this.addOverflowAttr();

                element.data({
                    type: "template",
                    template: this
                });
            },

            overflowHidden: function() {
                this.element.addClass(OVERFLOW_HIDDEN);
            }
        });

        function adjustPopupWidth(e) {
            var anchor = this.options.anchor,
                computedWidth = anchor.outerWidth(),
                width;

            kendo.wrap(this.element).addClass("k-split-wrapper");

            if (this.element.css("box-sizing") !== "border-box") {
                width = computedWidth - (this.element.outerWidth() - this.element.width());
            } else {
                width = computedWidth;
            }

            this.element.css({
                fontFamily: anchor.css("font-family"),
                "min-width": width
            });
        }

        function toggleActive(e) {
            if (!e.target.is(".k-toggle-button")) {
                e.target.toggleClass(STATE_ACTIVE, e.type == "press");
            }
        }

        function actionSheetWrap(element) {
            element = $(element);

            return element.hasClass("km-actionsheet") ? element.closest(".km-popup-wrapper") : element.addClass("km-widget km-actionsheet")
                             .wrap('<div class="km-actionsheet-wrapper km-actionsheet-tablet km-widget km-popup"></div>').parent()
                             .wrap('<div class="km-popup-wrapper k-popup"></div>').parent();
        }

        function preventClick(e) {
            e.preventDefault();
        }

        var components = {
            button: {
                toolbar: ToolBarButton,
                overflow: OverflowButton
            },

            buttonGroup: {
                toolbar: ToolBarButtonGroup,
                overflow: OverflowButtonGroup
            },

            splitButton: {
                toolbar: ToolBarSplitButton,
                overflow: OverflowSplitButton
            },

            separator: {
                toolbar: ToolBarSeparator,
                overflow: OverflowSeparator
            },

            overflowAnchor: '<div class="k-overflow-anchor"></div>',
            overflowContainer: '<ul class="k-overflow-container k-list-container"></ul>'
        };

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
                for (var i = 0; i < this.buttons.length; i ++) {
                    this.buttons[i].select(false);
                }

                button.select(true);
            }
        });

        var ToolBar = Widget.extend({
            init: function(element, options) {
                var that = this;

                Widget.fn.init.call(that, element, options);

                options = that.options;
                element = that.wrapper = that.element;

                element.addClass(TOOLBAR + " k-widget");

                this.uid = kendo.guid();
                this._groups = {};
                element.attr(KENDO_UID_ATTR, this.uid);

                that.isMobile = (typeof options.mobile === "boolean") ? options.mobile : that.element.closest(".km-root")[0];
                that.animation = that.isMobile ? { open: { effects: "fade" } } : {};

                if (that.isMobile) {
                    element.addClass("km-widget");
                    ICON = "km-icon";
                    ICON_PREFIX = "km-";
                    BUTTON = "km-button";
                    BUTTON_GROUP = "km-buttongroup km-widget";
                    STATE_ACTIVE = "km-state-active";
                    STATE_DISABLED = "km-state-disabled";
                }

                if(options.resizable) {
                    that._renderOverflow();
                    element.addClass(RESIZABLE_TOOLBAR);

                    that.overflowUserEvents = new kendo.UserEvents(that.element, {
                        threshold: 5,
                        allowSelection: true,
                        filter: "." + OVERFLOW_ANCHOR,
                        tap: proxy(that._toggleOverflow, that)
                    });

                    that._resizeHandler = kendo.onResize(function() {
                        that.resize();
                    });
                } else {
                    that.popup = { element: $([]) };
                }

                if(options.items && options.items.length) {
                    for (var i = 0; i < options.items.length; i++) {
                        that.add(options.items[i]);
                    }
                }

                that.userEvents = new kendo.UserEvents(document, {
                    threshold: 5,
                    allowSelection: true,
                    filter:
                        "[" + KENDO_UID_ATTR + "=" + this.uid + "] ." + BUTTON + ", " +
                        "[" + KENDO_UID_ATTR + "=" + this.uid + "] ." + OVERFLOW_BUTTON,
                    tap: proxy(that._buttonClick, that),
                    press: toggleActive,
                    release: toggleActive
                });

                that.element.on(CLICK, "." + STATE_DISABLED, preventClick);
                if (options.resizable) {
                    that.popup.element.on(CLICK, + "." + STATE_DISABLED, preventClick);
                }

                if (options.resizable) {
                    this._toggleOverflowAnchor();
                }

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
                mobile: null
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

                that.element.find("." + SPLIT_BUTTON).each(function(idx, element) {
                    $(element).data("kendoPopup").destroy();
                });

                that.userEvents.destroy();

                if (that.options.resizable) {
                    kendo.unbindResize(that._resizeHandler);
                    that.overflowUserEvents.destroy();
                    that.popup.destroy();
                }

                Widget.fn.destroy.call(that);
            },

            add: function(options) {
                var component = components[options.type],
                    template = options.template,
                    tool, that = this,
                    itemClasses = that.isMobile ? "" : "k-item k-state-default",
                    overflowTemplate = options.overflowTemplate,
                    overflowTool;

                $.extend(options, {
                    uid: kendo.guid(),
                    animation: that.animation,
                    mobile: that.isMobile,
                    rootUid: that.uid
                });

                if (template && !overflowTemplate) {
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
                        that.angular("compile", function(){
                            return { elements: overflowTool.element.get() };
                        });
                    }
                }

                //add the command in the toolbar container
                if (options.overflow !== OVERFLOW_ALWAYS) {
                    if (template) { //template command
                        tool = new TemplateItem(template, options, that);
                    } else if (component) { //build-in command
                        tool = new component.toolbar(options, that);
                    }

                    if (tool) {
                        if (that.options.resizable) {
                            tool.element.appendTo(that.element).css("visibility", "hidden");
                            that._shrink(that.element.innerWidth());
                            tool.element.css("visibility", "visible");
                        } else {
                            tool.element.appendTo(that.element);
                        }

                        that.angular("compile", function(){
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
                    type, uid;

                element = this.element.find(candidate);
                type = element.length ? element.data("type") : "";
                toolbarItem = element.data(type);

                if (toolbarItem && toolbarItem.main) {
                    element = element.parent("." + SPLIT_BUTTON);
                    type = "splitButton";
                    toolbarItem = element.data(type);
                }

                if (!element.length && isResizable) {
                    element = this.popup.element.find(candidate);
                    type = element.data("type");
                    overflowItem = element.data(type);
                }

                if (overflowItem && overflowItem.main) {
                    element = element.parent("." + SPLIT_BUTTON);
                    type = "splitButton";
                    overflowItem = element.data(type);
                }

                if (toolbarItem && isResizable) {
                    overflowItem = toolbarItem.twin();
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

                if (item.toolbar) {
                    item.toolbar.hide();

                    if (item.toolbar.options.type === "button" && item.toolbar.options.isChild) {
                        item.toolbar.getParentGroup().refresh();
                    }
                }

                if (item.overflow) {
                    item.overflow.hide();

                    if (item.overflow.options.type === "button" && item.overflow.options.isChild) {
                        item.overflow.getParentGroup().refresh();
                    }
                }

                this.resize(true);
            },

            show: function(candidate) {
                var item = this._getItem(candidate);

                if (item.toolbar) { 
                    item.toolbar.show();

                    if (item.toolbar.options.type === "button" && item.toolbar.options.isChild) {
                        item.toolbar.getParentGroup().refresh();
                    }
                }

                if (item.overflow) {
                    item.overflow.show();

                    if (item.overflow.options.type === "button" && item.overflow.options.isChild) {
                        item.overflow.getParentGroup().refresh();
                    }
                }

                this.resize(true);
            },

            enable: function(element, enable) {
                var item = this._getItem(element);

                if (typeof enable == "undefined") {
                    enable = true;
                }

                if (item.toolbar) { item.toolbar.enable(enable); }
                if (item.overflow) { item.overflow.enable(enable); }
            },

            getSelectedFromGroup: function(groupName) {
                return this.element.find("." + TOGGLE_BUTTON + "[data-group='" + groupName + "']").filter("." + STATE_ACTIVE);
            },

            toggle: function(button, checked) {
                var element = $(button),
                    item = element.data("button");

                if (item.options.togglable) {
                    item.toggle(checked ? checked : !item.options.selectable, true);
                }
            },

            _renderOverflow: function() {
                var that = this,
                    overflowContainer = components.overflowContainer;

                that.overflowAnchor = $(components.overflowAnchor).addClass(BUTTON);

                that.element.append(that.overflowAnchor);

                if (that.isMobile) {
                    that.overflowAnchor.append('<span class="km-icon km-more"></span>');
                    overflowContainer = actionSheetWrap(overflowContainer);
                } else {
                    that.overflowAnchor.append('<span class="k-icon k-i-more"></span>');
                }

                that.popup = new kendo.ui.Popup(overflowContainer, {
                    origin: "bottom right",
                    position: "top right",
                    anchor: that.overflowAnchor,
                    animation: that.animation,
                    appendTo: that.isMobile ? $(that.isMobile).children(".km-pane") : null,
                    copyAnchorStyles: false,
                    open: function (e) {
                        var wrapper = kendo.wrap(that.popup.element)
                            .addClass("k-overflow-wrapper");

                        if (!that.isMobile) {
                            wrapper.css("margin-left", (wrapper.outerWidth() - wrapper.width()) / 2 + 1);
                        } else {
                            that.popup.container.css("max-height", (parseFloat($(".km-content:visible").innerHeight()) - 15) + "px");
                        }

                        if (that.trigger(OVERFLOW_OPEN)) {
                            e.preventDefault();
                        }
                    },
                    close: function (e) {
                        if (that.trigger(OVERFLOW_CLOSE)) {
                            e.preventDefault();
                        }
                    }
                });

                if (that.isMobile) {
                    that.popup.container = that.popup.element.find("." + OVERFLOW_CONTAINER);
                } else {
                    that.popup.container = that.popup.element;
                }

                that.popup.container.attr(KENDO_UID_ATTR, this.uid);
                that.popup.element.toggleClass("k-rtl", kendo.support.isRtl(that.element));
            },

            _toggleOverflowAnchor: function() {
                if (this.popup.element.children(":not(." + OVERFLOW_HIDDEN + ", ." + POPUP + ")").length > 0) {
                    this.overflowAnchor.css({
                        visibility: "visible",
                        width: ""
                    });
                } else {
                    this.overflowAnchor.css({
                        visibility: "hidden",
                        width: "1px"
                    });
                }
            },

            _buttonClick: function(e) {
                var that = this, popup,
                    target, item, splitContainer,
                    isDisabled,
                    isSplitButtonArrow = e.target.closest("." + SPLIT_BUTTON_ARROW).length,
                    handler, eventData;

                e.preventDefault();

                if (isSplitButtonArrow) {
                    that._toggle(e);
                    return;
                }

                target = $(e.target).closest("." + BUTTON, that.element);

                if (target.hasClass(OVERFLOW_ANCHOR)) {
                    return;
                }

                item = target.data("button");

                if (!item && that.popup) {
                    target = $(e.target).closest("." + OVERFLOW_BUTTON, that.popup.container);
                    item = target.parent("li").data("button");
                }

                if (!item.options.enable) {
                    return;
                }

                if (item.options.togglable) {
                    handler = isFunction(item.toggleHandler) ? item.toggleHandler : null;

                    item.toggle(!item.options.selected, true);
                    eventData = { target: target, group: item.options.group, checked: item.options.selected, id: item.options.id };

                    if (handler) { handler.call(that, eventData); }
                    that.trigger(TOGGLE, eventData);
                } else {
                    handler = isFunction(item.clickHandler) ? item.clickHandler : null;
                    eventData = { target: target, id: item.options.id };

                    if (handler) { handler.call(that, eventData); }
                    that.trigger(CLICK, eventData);
                }

                if (target.hasClass(OVERFLOW_BUTTON)) {
                    that.popup.close();
                }

                splitContainer = target.closest(".k-split-container");
                if (splitContainer[0]) {
                    popup = splitContainer.data("kendoPopup");
                    (popup ? popup : splitContainer.parents(".km-popup-wrapper").data("kendoPopup")).close();
                }
            },

            _toggle: function(e) {
                var splitButton = $(e.target).closest("." + SPLIT_BUTTON).data("splitButton"),
                    isDefaultPrevented;

                e.preventDefault();

                if (!splitButton.options.enable) {
                    return;
                }

                if (splitButton.popup.element.is(":visible")) {
                    isDefaultPrevented = this.trigger(CLOSE, { target: splitButton.element });
                } else {
                    isDefaultPrevented = this.trigger(OPEN, { target: splitButton.element });
                }

                if (!isDefaultPrevented) {
                    splitButton.toggle();
                }
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

                this.element.children(":visible:not('." + STATE_HIDDEN + "')").each(function() {
                    childrenWidth += $(this).outerWidth(true);
                });

                return Math.ceil(childrenWidth);
            },

            _shrink: function(containerWidth) {
                var commandElement,
                    visibleCommands;

                if (containerWidth < this._childrenWidth()) {
                    visibleCommands = this.element.children(":visible:not([data-overflow='never'], ." + OVERFLOW_ANCHOR + ")");

                    for (var i = visibleCommands.length - 1; i >= 0; i--) {
                        commandElement = visibleCommands.eq(i);
                        if (containerWidth > this._childrenWidth()) {
                            break;
                        } else {
                            this._hideItem(commandElement);
                        }
                    }
                }
            },

            _stretch: function(containerWidth) {
                var commandElement,
                    hiddenCommands;

                if (containerWidth > this._childrenWidth()) {
                    hiddenCommands = this.element.children(":hidden:not('." + STATE_HIDDEN + "')");

                    for (var i = 0; i < hiddenCommands.length ; i++) {
                        commandElement = hiddenCommands.eq(i);
                        if (containerWidth < this._childrenWidth() || !this._showItem(commandElement, containerWidth)) {
                            break;
                        }
                    }
                }
            },

            _hideItem: function(item) {
                item.hide();
                if (this.popup) {
                    this.popup.container
                        .find(">li[data-uid='" + item.data("uid") + "']")
                        .removeClass(OVERFLOW_HIDDEN);
                }
            },

            _showItem: function(item, containerWidth) {
                if (item.length && containerWidth > this._childrenWidth() + item.outerWidth(true)) {
                    item.show();
                    if (this.popup) {
                        this.popup.container
                            .find(">li[data-uid='" + item.data("uid") + "']")
                            .addClass(OVERFLOW_HIDDEN);
                    }

                    return true;
                }

                return false;
            },

            _markVisibles: function() {
                var overflowItems = this.popup.container.children(),
                    toolbarItems = this.element.children(":not(.k-overflow-anchor)"),
                    visibleOverflowItems = overflowItems.filter(":not(.k-overflow-hidden)"),
                    visibleToolbarItems = toolbarItems.filter(":visible");

                overflowItems.add(toolbarItems).removeClass(FIRST_TOOLBAR_VISIBLE + " " + LAST_TOOLBAR_VISIBLE);
                visibleOverflowItems.first().add(visibleToolbarItems.first()).addClass(FIRST_TOOLBAR_VISIBLE);
                visibleOverflowItems.last().add(visibleToolbarItems.last()).addClass(LAST_TOOLBAR_VISIBLE);
            }

        });

    kendo.ui.plugin(ToolBar);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
