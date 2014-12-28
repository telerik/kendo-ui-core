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

        template = kendo.template,
        components = {
            button: {
                base: createButton,
                toolbar: createToolbarButton,
                overflow: createOverflowButton
            },

            buttonGroup: {
                base: function (options, initializer, element) {
                    var items = options.buttons,
                        item;

                    if (!items) {
                        return;
                    }

                    if (options.attributes) {
                        element.attr(options.attributes);
                    }

                    element.data({ type: "buttonGroup" });
                    element.attr(KENDO_UID_ATTR, options.uid);

                    for (var i = 0; i < items.length; i++) {
                        if (!items[i].uid) {
                            items[i].uid = kendo.guid();
                        }
                        item = initializer($.extend({mobile: options.mobile}, items[i]));
                        item.appendTo(element);
                    }

                    element.children().first().addClass(GROUP_START);
                    element.children().last().addClass(GROUP_END);
                },
                toolbar: function (options) {
                    var element = $('<div></div>');

                    components.buttonGroup.base(options, components.button.toolbar, element);

                    element.addClass(BUTTON_GROUP);

                    if (options.align) {
                        element.addClass("k-align-" + options.align);
                    }

                    if (options.id) {
                        element.attr("id", options.id);
                    }

                    return element;
                },
                overflow: function (options) {
                    var element = $('<li></li>');

                    components.buttonGroup.base(options, components.button.overflow, element);

                    element.addClass((options.mobile ? "" : BUTTON_GROUP) + " k-overflow-group");

                    if (options.id) {
                        element.attr("id", options.id + "_overflow");
                    }

                    return element;
                }
            },

            splitButton: {
                toolbar: function(options) {
                    var element = $('<div class="' + SPLIT_BUTTON + '"></div>'),
                        mainButton = components.button.toolbar(options),
                        arrowButton = $('<a class="' + BUTTON + " " + SPLIT_BUTTON_ARROW + '"><span class="' +
                                       (options.mobile ? "km-icon km-arrowdown" : "k-icon k-i-arrow-s") + '"></span></a>'),
                        popupElement = $('<ul class="' + LIST_CONTAINER + '"></ul>'),
                        popup,
                        items = options.menuButtons,
                        item;

                    mainButton.appendTo(element);
                    arrowButton.appendTo(element);
                    popupElement.appendTo(element);

                    for (var i = 0; i < items.length; i++) {
                        item = components.button.toolbar($.extend({mobile: options.mobile, click: options.click}, items[i]));
                        item.wrap("<li></li>").parent().appendTo(popupElement);
                    }

                    if (options.align) {
                        element.addClass("k-align-" + options.align);
                    }

                    if (!options.id) {
                        options.id = options.uid;
                    }

                    element.attr("id", options.id + "_wrapper");
                    popupElement.attr("id", options.id + "_optionlist")
                                .attr(KENDO_UID_ATTR, options.rootUid);

                    if (options.mobile) {
                        popupElement = actionSheetWrap(popupElement);
                    }

                    popup = popupElement.kendoPopup({
                        appendTo: options.mobile ? $(options.mobile).children(".km-pane") : null,
                        anchor: element,
                        copyAnchorStyles: false,
                        animation: options.animation,
                        open: adjustPopupWidth
                    }).data("kendoPopup");

                    element.data({
                        type: "splitButton",
                        kendoPopup: popup
                    });
                    element.attr(KENDO_UID_ATTR, options.uid);

                    return element;
                },
                overflow: function(options) {
                    var element = $('<li class="' + SPLIT_BUTTON + '"></li>'),
                        mainButton = components.button.overflow(options),
                        items = options.menuButtons,
                        item;

                    mainButton.appendTo(element);

                    for (var i = 0; i < items.length; i++) {
                        item = components.button.overflow($.extend({mobile: options.mobile}, items[i]));
                        item.appendTo(element);
                    }

                    element.data({ type: "splitButton" });
                    element.attr(KENDO_UID_ATTR, options.uid);

                    return element;
                }
            },

            separator: {
                base: function(options, overflow) {
                    var element = overflow ? $('<li>&nbsp;</li>') : $('<div>&nbsp;</div>');
                    element.data({ type: "separator" });
                    element.attr(KENDO_UID_ATTR, options.uid);

                    if (options.attributes) {
                        element.attr(options.attributes);
                    }

                    element.addClass(SEPARATOR);

                    return element;
                },
                toolbar: function(options) {
                   var element = components.separator.base(options, false);

                   if (options.id) {
                       element.attr("id", options.id);
                   }

                   return element;
                },
                overflow: function(options) {
                    var element = components.separator.base(options, true);

                    if (options.id) {
                        element.attr("id", options.id + "_overflow");
                    }

                    return  element;
                }
            },

            overflowAnchor: '<div class="k-overflow-anchor"></div>',

            overflowContainer: '<ul class="k-overflow-container k-list-container"></ul>'
        };

        function createButton(options) {
            var element = options.useButtonTag ? $('<button></button>') : $('<a></a>');

            element.data({ type: "button" });
            element.attr(KENDO_UID_ATTR, options.uid);

            if (options.attributes) {
                element.attr(options.attributes);
            }

            if (options.togglable) {
                element.addClass(TOGGLE_BUTTON);
                if (options.selected) {
                    element.addClass(STATE_ACTIVE);
                }
            }

            if (options.enable === false) {
                element.addClass(STATE_DISABLED);
            }

            if (options.url !== undefined && !options.useButtonTag) {
                element.attr("href", options.url);
                if (options.mobile) {
                    element.attr(kendo.attr("role"), "button");
                }
            }

            if (options.group) {
                element.attr(kendo.attr("group"), options.group);
            }

            if (!options.togglable && options.click && isFunction(options.click)) {
                element.data("click", options.click);
            }

            if (options.togglable && options.toggle && isFunction(options.toggle)) {
                element.data("toggle", options.toggle);
            }

            return element;
        }

        function createToolbarButton(options) {
            var element = components.button.base(options),
                hasIcon;

            element.addClass(BUTTON);

            if (options.primary) {
                element.addClass(PRIMARY);
            }

            if (options.align) {
                element.addClass("k-align-" + options.align);
            }

            if (options.id) {
                element.attr("id", options.id);
            }

            if (options.showText != "overflow" && options.text) {
                if (options.mobile) {
                    element.html('<span class="km-text">' + options.text + "</span>");
                } else {
                    element.html(options.text);
                }
            }

            hasIcon = (options.showIcon != "overflow") && (options.icon || options.spriteCssClass || options.imageUrl);

            if (hasIcon) {
                addGraphic(options, element);
            }

            return element;
        }

        function createOverflowButton(options) {
            var element = components.button.base(options),
                hasIcon;

            element.addClass(OVERFLOW_BUTTON + " " + BUTTON);

            if (options.primary) {
                element.addClass(PRIMARY);
            }

            if (options.id) {
                element.attr("id", options.id + "_overflow");
            }

            if (options.showText != "toolbar" && options.text) {
                if (options.mobile) {
                    element.html('<span class="km-text">' + options.text + "</span>");
                } else {
                    element.html(options.text);
                }
            }

            hasIcon = (options.showIcon != "toolbar") && (options.icon || options.spriteCssClass || options.imageUrl);

            if (hasIcon) {
                addGraphic(options, element);
            }

            return element;
        }

        function addGraphic(options, element) {
            var icon = options.icon,
                spriteCssClass = options.spriteCssClass,
                imageUrl = options.imageUrl,
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

        var ToolBar = Widget.extend({
            init: function(element, options) {
                var that = this;

                Widget.fn.init.call(that, element, options);

                options = that.options;
                element = that.wrapper = that.element;

                element.addClass(TOOLBAR + " k-widget");

                this.uid = kendo.guid();
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

                    kendo.onResize(function() {
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

            destroy: function() {
                var that = this;

                that.element.find("." + SPLIT_BUTTON).each(function(idx, element) {
                    $(element).data("kendoPopup").destroy();
                });

                that.userEvents.destroy();

                if (that.options.resizable) {
                    that.overflowUserEvents.destroy();
                    that.popup.destroy();
                }

                Widget.fn.destroy.call(that);
            },

            add: function(options) {
                var component = components[options.type],
                    template = options.template,
                    element, that = this,
                    itemClasses = that.isMobile ? "" : "k-item k-state-default",
                    overflowTemplate = options.overflowTemplate,
                    overflowElement;

                $.extend(options, {
                    uid: kendo.guid(),
                    animation: that.animation,
                    mobile: that.isMobile,
                    rootUid: that.uid
                });

                if (template && !overflowTemplate) {
                    options.overflow = OVERFLOW_NEVER;
                }

                //add the command in the overflow popup
                if (options.overflow !== OVERFLOW_NEVER && that.options.resizable) {
                    if (overflowTemplate) { //template command
                        overflowElement = isFunction(overflowTemplate) ? $(overflowTemplate(options)) : $(overflowTemplate);

                        if (options.id) {
                            overflowElement.attr("id", options.id + "_overflow");
                        }
                    } else if (component) { //build-in command
                        overflowElement = (component.overflow || $.noop)(options);
                    }

                    if (overflowElement && overflowElement.length) {
                        if(overflowElement.prop("tagName") !== "LI") {
                            overflowElement.removeAttr(KENDO_UID_ATTR);
                            overflowElement = overflowElement.wrap("<li></li>").parent();
                            overflowElement.attr(KENDO_UID_ATTR, options.uid);
                        }
                        that._attributes(overflowElement, options);
                        overflowElement.addClass(itemClasses).appendTo(that.popup.container);

                        if (overflowElement.data("overflow") === OVERFLOW_AUTO) {
                            overflowElement.addClass(OVERFLOW_HIDDEN);
                        }

                        that.angular("compile", function(){
                            return { elements: overflowElement.get() };
                        });
                    }
                }

                //add the command in the toolbar container
                if (options.overflow !== OVERFLOW_ALWAYS) {
                    if (template) { //template command
                        element = isFunction(template) ? template(options) : template;

                        if (!(element instanceof jQuery)) {
                            element = $(element.replace(/^\s+|\s+$/g, ''));
                        }

                        element = element.wrap("<div></div>").parent();
                        if (options.id) {
                           element.attr("id", options.id);
                        }
                        if (options.attributes) {
                            element.attr(options.attributes);
                        }
                        element.attr(KENDO_UID_ATTR, options.uid);
                    } else if (component) { //build-in command
                        element = (component.toolbar || $.noop)(options);
                    }

                    if (element && element.length) {
                        that._attributes(element, options);

                        if (that.options.resizable) {
                            element.appendTo(that.element).css("visibility", "hidden");
                            that._shrink(that.element.innerWidth());
                            element.css("visibility", "visible");
                        } else {
                            element.appendTo(that.element);
                        }

                        that.angular("compile", function(){
                            return { elements: element.get() };
                        });
                    }
                }
            },

            remove: function(element) {
                var toolbarElement,
                    overflowElement,
                    isResizable = this.options.resizable,
                    type, uid;

                toolbarElement = this.element.find(element);

                if (isResizable) {
                    overflowElement = this.popup.element.find(element);
                }

                if (toolbarElement.length) {
                    type = toolbarElement.data("type");
                    uid = toolbarElement.attr(KENDO_UID_ATTR);

                    if (toolbarElement.parent("." + SPLIT_BUTTON).data("type") === "splitButton") {
                        type = "splitButton";
                        toolbarElement = toolbarElement.parent();
                    }

                    overflowElement = isResizable ? this.popup.element.find("li[" + KENDO_UID_ATTR + "='" + uid + "']") : $([]);
                } else if (overflowElement.length) {
                    type = overflowElement.data("type");
                    overflowElement = overflowElement.parent();

                    if (overflowElement.data("type") === "splitButton") {
                        type = "splitButton";
                    }

                    uid = overflowElement.attr(KENDO_UID_ATTR);
                    toolbarElement = this.element.find("div." + SPLIT_BUTTON + "[" + KENDO_UID_ATTR + "='" + uid + "']");
                }

                if (type === "splitButton" && toolbarElement.data("kendoPopup")) {
                    toolbarElement.data("kendoPopup").destroy();
                }

                toolbarElement.remove();
                overflowElement.remove();
            },

            enable: function(element, enable) {
                var uid = this.element.find(element).attr(KENDO_UID_ATTR);

                if (!uid && this.popup) {
                    uid = this.popup.element.find(element).parent("li").attr(KENDO_UID_ATTR);
                }

                if (typeof enable == "undefined") {
                    enable = true;
                }

                if (enable) {
                    $("[" + KENDO_UID_ATTR + "='" + uid + "']").removeClass(STATE_DISABLED);
                } else {
                    $("[" + KENDO_UID_ATTR + "='" + uid + "']").addClass(STATE_DISABLED);
                }
            },

            getSelectedFromGroup: function(groupName) {
                return this.element.find("." + TOGGLE_BUTTON + "[data-group='" + groupName + "']").filter("." + STATE_ACTIVE);
            },

            toggle: function(button, checked) {
                var element = $(button),
                    uid = element.data("uid"),
                    group = element.data("group"),
                    twinElement;

                if (element.hasClass(TOGGLE_BUTTON)) {

                    if (group) { //find all buttons from the same group
                        this.element
                            .add(this.popup.element)
                            .find("." + TOGGLE_BUTTON + "[data-group='" + group + "']")
                            .filter("." + STATE_ACTIVE)
                            .removeClass(STATE_ACTIVE);
                    }

                    if ($.contains(this.element[0], element[0])) {
                        twinElement = this.popup.element.find("[" + KENDO_UID_ATTR + "='" + uid + "']");
                        if (twinElement.prop("tagName") === "LI") {
                            twinElement = twinElement.find("." + TOGGLE_BUTTON + ":first");
                        }
                    } else {
                        uid = uid ? uid : element.parent().data("uid");
                        twinElement = this.element.find("[" + KENDO_UID_ATTR + "='" + uid + "']");
                    }

                    element.add(twinElement).toggleClass(STATE_ACTIVE, checked);
                }
            },

            _attributes: function(element, options) {
                element.attr(kendo.attr("overflow"), options.overflow || OVERFLOW_AUTO);
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
                    target, splitContainer,
                    isDisabled, isChecked,
                    group, handler, eventData, id;

                e.preventDefault();

                target = $(e.target).closest("." + BUTTON, that.element);

                if (target.hasClass(OVERFLOW_ANCHOR)) {
                    return;
                }

                if (!target.length && that.popup) {
                    target = $(e.target).closest("." + OVERFLOW_BUTTON, that.popup.container);
                }

                isDisabled = target.hasClass(OVERFLOW_BUTTON) ? target.parent("li").hasClass(STATE_DISABLED) : target.hasClass(STATE_DISABLED);

                if (isDisabled) {
                    return;
                }

                if (e.target.closest("." + SPLIT_BUTTON_ARROW).length) {
                    that._toggle(e);
                    return;
                }

                id = target.attr("id") ? target.attr("id").replace(/(_overflow$)/, "") : undefined;

                if (target.hasClass(TOGGLE_BUTTON)) {
                    group = target.data("group");
                    handler = isFunction(target.data("toggle")) ? target.data("toggle") : null;

                    that.toggle(target);
                    isChecked = target.hasClass(STATE_ACTIVE);
                    eventData = { target: target, group: group, checked: isChecked, id: id };

                    if (handler) { handler.call(that, eventData); }
                    that.trigger(TOGGLE, eventData);
                } else {
                    handler = isFunction(target.data("click")) ? target.data("click") : null;
                    eventData = { target: target, id: id };

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
                var splitButton = $(e.target).closest("." + SPLIT_BUTTON),
                    popup = splitButton.data("kendoPopup"),
                    isDefaultPrevented;

                e.preventDefault();

                if (splitButton.hasClass(STATE_DISABLED)) {
                    return;
                }

                if (popup.element.is(":visible")) {
                    isDefaultPrevented = this.trigger(CLOSE, { target: splitButton });
                } else {
                    isDefaultPrevented = this.trigger(OPEN, { target: splitButton });
                }

                if (!isDefaultPrevented) {
                    popup.toggle();
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

                this.element.children(":visible").each(function() {
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
                    hiddenCommands = this.element.children(":hidden");

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
