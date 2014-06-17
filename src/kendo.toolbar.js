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

        OVERFLOW_NEVER = "never",
        OVERFLOW_AUTO = "auto",
        OVERFLOW_ALWAYS = "always",
        OVERFLOW_HIDDEN = "k-overflow-hidden",

        template = kendo.template,
        components = {
            button: {
                base: createButton,
                toolbar: createToolbarButton,
                overflow: createOverflowButton
            },

            buttonGroup: {
                base: function (options, initializer, element) {
                    var items = options.items,
                        item;

                    element.data({ type: "buttonGroup" });

                    for (var i = 0; i < items.length; i++) {
                        item = initializer($.extend({mobile: options.mobile}, items[i]));
                        item.appendTo(element);
                    }

                    element.children().first().addClass(GROUP_START);
                    element.children().last().addClass(GROUP_END);
                },
                toolbar: function (options) {
                    var element = $('<div class="' + BUTTON_GROUP + '"></div>');
                    components.buttonGroup.base(options, components.button.toolbar, element);

                    if (options.id) {
                        element.attr("id", options.id);
                    }

                    return element;
                },
                overflow: function (options) {
                    var element = $('<li class="' + (options.mobile ? "" : BUTTON_GROUP) + ' k-overflow-group"></li>');
                    components.buttonGroup.base(options, components.button.overflow, element);

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
                        items = options.items,
                        item;

                    mainButton.appendTo(element);
                    arrowButton.appendTo(element);
                    popupElement.appendTo(element);

                    for (var i = 0; i < items.length; i++) {
                        item = components.button.toolbar($.extend({mobile: options.mobile}, items[i]));
                        item.wrap("<li></li>").parent().appendTo(popupElement);
                    }

                    if (!options.id) {
                        options.id = options.uid;
                    }

                    element.attr("id", options.id);
                    popupElement.attr("id", options.id + "_optionlist");

                    if (options.mobile && kendo.mobile.ui.ActionSheet) {
                        popup = new kendo.mobile.ui.ActionSheet(popupElement, {
                            type: "tablet",
                            open: function () {
                                kendo.wrap(popup.shim.wrapper)
                                    .addClass("k-split-wrapper");
                            }
                        });
                    } else {
                        popup = popupElement.kendoPopup({
                            anchor: element,
                            animation: options.animation,
                            open: adjustPopupWidth
                        }).data("kendoPopup");
                    }

                    popupElement.parent().attr(kendo.attr("uid"), options.rootUid);

                    element.data({
                        type: "splitButton",
                        kendoPopup: popup
                    });

                    return element;
                },
                overflow: function(options) {
                    var element = $('<li class="' + SPLIT_BUTTON + '"></li>'),
                        mainButton = components.button.overflow(options),
                        items = options.items,
                        item;

                    mainButton.appendTo(element);

                    for (var i = 0; i < items.length; i++) {
                        item = components.button.overflow($.extend({mobile: options.mobile}, items[i]));
                        item.appendTo(element);
                    }

                    if (options.id) {
                        element.attr("id", options.id + "_overflow");
                    }

                    element.data({ type: "splitButton" });

                    return element;
                }
            },

            separator: {
                toolbar: function(options) {
                    var element = $('<div class="k-separator"></div>');
                    element.data({ type: "separator" });
                    return element;
                },
                overflow: function(options) {
                    var element = $('<li class="k-separator"></li>');
                    element.data({ type: "separator" });
                    return element;
                }
            },

            overflowAnchor: '<div class="k-overflow-anchor k-button km-button"></div>',

            overflowContainer: '<ul class="k-overflow-container k-list-container"></ul>'
        };

        function createButton(options, useButtonTag) {
            var element = useButtonTag ? $('<button></button>') : $('<a></a>');

            element.data({ type: "button" });

            if (options.toggle) {
                element.addClass(TOGGLE_BUTTON);
                if (options.selected) {
                    element.addClass(STATE_ACTIVE);
                }
            }

            if (options.enable === false) {
                element.addClass(STATE_DISABLED);
            }

            if (options.group) {
                element.attr(kendo.attr("group"), options.group);
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

            if (options.id) {
                element.attr("id", options.id);
            }

            if (options.showText != "overflow" && options.text) {
                if (options.mobile) {
                    element.html('<span class="km-text">' + options.text + "</span>");
                } else {
                    element.text(options.text);
                }
            }

            hasIcon = (options.showIcon != "overflow") && (options.icon || options.spriteCssClass || options.imageUrl);

            if (hasIcon) {
                addGraphic(options, element);
            }

            //user events tap
            if (options.click && kendo.isFunction(options.click)) {
                element.on(CLICK, options.click);
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
                    element.text(options.text);
                }
            }

            hasIcon = (options.showIcon != "toolbar") && (options.icon || options.spriteCssClass || options.imageUrl);

            if (hasIcon) {
                addGraphic(options, element);
            }

            //user events tap
            if (options.click && kendo.isFunction(options.click)) {
                element.on(CLICK, options.click);
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

            if (this.element.css("box-sizing") !== "border-box") {
                width = computedWidth - (this.element.outerWidth() - this.element.width());
            } else {
                width = computedWidth;
            }

            this.element.css({
                fontFamily: anchor.css("font-family"),
                width: width
            });
        }

        function toggleActive(e) {
            if (!e.target.is(".k-toggle-button")) {
                e.target.toggleClass(STATE_ACTIVE, e.type == "press");
            }
        }

        function toggleOverflow(popup, anchor, mobile) {
            if (mobile) {
                if (!popup.element.is(":visible")) {
                    popup.openFor(anchor);
                } else {
                    popup.close();
                }
            } else {
                popup.toggle();
            }
        }

        var ToolBar = Widget.extend({
            init: function(element, options) {
                var that = this;

                Widget.fn.init.call(that, element, options);

                options = that.options;
                element = that.wrapper = that.element;

                element.addClass(TOOLBAR + " k-widget");

                this.uid = kendo.guid();
                element.attr(kendo.attr("uid"), this.uid);

                that.isMobile = !!that.element.closest(".km-root")[0];
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
                        filter: "." + OVERFLOW_ANCHOR,
                        tap: proxy(that._toggleOverflow, that)
                    });
                }

                if(options.items && options.items.length) {
                    for (var i = 0; i < options.items.length; i++) {
                        that.add(options.items[i]);
                    }
                }

                that.userEvents = new kendo.UserEvents(document, {
                    threshold: 5,
                    filter:
                        "[" + kendo.attr("uid") + "=" + this.uid + "] ." + BUTTON + ", " +
                        "[" + kendo.attr("uid") + "=" + this.uid + "] ." + OVERFLOW_BUTTON,
                    tap: proxy(that._buttonClick, that),
                    press: toggleActive,
                    release: toggleActive
                });

                kendo.notify(that);
            },

            events: [
                CLICK,
                TOGGLE,
                OPEN,
                CLOSE
            ],

            options: {
                name: "ToolBar",
                resizable: true
                //option list
            },

            destroy: function() {
                var that = this;

                that.element.find("." + SPLIT_BUTTON).each(function(idx, element) {
                    $(element).data("kendoPopup").destroy();
                });

                that.userEvents.destroy();
                //that.splitButtonUserEvents.destroy();

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
                    } else if (component) { //build-in command
                        overflowElement = (component.overflow || $.noop)(options);
                    }

                    if (overflowElement && overflowElement.length) {
                        if(overflowElement.prop("tagName") !== "LI") {
                            overflowElement = overflowElement.wrap("<li></li>").parent();
                        }
                        that._attributes(overflowElement, options);
                        overflowElement.addClass(itemClasses).appendTo(that.popup.element);

                        if (overflowElement.data("overflow") === OVERFLOW_AUTO) {
                            overflowElement.addClass(OVERFLOW_HIDDEN);
                        }
                    }
                }

                //add the command in the toolbar container
                if (options.overflow !== OVERFLOW_ALWAYS) {
                    if (template) { //template command
                        element = isFunction(template) ? $(template(options)) : $(template);
                    } else if (component) { //build-in command
                        element = (component.toolbar || $.noop)(options);
                    }

                    if (element && element.length) {
                        that._attributes(element, options);
                        element.appendTo(that.element).css("visibility", "hidden");

                        var containerWidth = that.element.innerWidth();

                        that._shrink(containerWidth);

                        element.css("visibility", "visible");
                    }
                }
            },

            remove: function(element) {
                var toolbarElement = $(element),
                    type = toolbarElement.data("type"),
                    uid = toolbarElement.attr(kendo.attr("uid"));

                if (type === "splitButton") {
                    toolbarElement.data("kendoPopup").destroy();
                }

                $("[" + kendo.attr("uid") + "='" + uid + "']").remove();
            },

            enable: function(element, enable) {
                var uid = $(element).attr(kendo.attr("uid"));

                if (typeof enable == "undefined") {
                    enable = true;
                }

                if (enable) {
                    $("[" + kendo.attr("uid") + "='" + uid + "']").removeClass(STATE_DISABLED);
                } else {
                    $("[" + kendo.attr("uid") + "='" + uid + "']").addClass(STATE_DISABLED);
                }
            },

            _attributes: function(element, options) {
                element.attr(kendo.attr("uid"), options.uid);
                element.attr(kendo.attr("overflow"), options.overflow || OVERFLOW_AUTO);
            },

            _renderOverflow: function() {
                var that = this;

                that.overflowAnchor = $(components.overflowAnchor);

                that.element.append(that.overflowAnchor);

                if (that.isMobile) {
                    that.overflowAnchor.append('<span class="km-icon km-more"></span>');
                }

                if (that.isMobile && kendo.mobile.ui.ActionSheet) {
                    that.popup = new kendo.mobile.ui.ActionSheet(components.overflowContainer, {
                        type: "tablet",
                        popup: { autosize: false },
                        open: function () {
                            kendo.wrap(that.popup.shim.wrapper)
                                .addClass("k-overflow-wrapper");
                        }
                    });
                } else {
                    that.popup = new kendo.ui.Popup(components.overflowContainer, {
                        origin: "bottom right",
                        position: "top right",
                        anchor: that.overflowAnchor,
                        animation: that.animation,
                        copyAnchorStyles: false,
                        open: function () {
                            kendo.wrap(that.popup.element)
                                .addClass("k-overflow-wrapper")
                                .css("margin-left", "3px");
                        }
                    });
                }

                that.popup.element.attr(kendo.attr("uid"), this.uid);
            },

            _buttonClick: function(e) {
                var target,
                    isDisabled,
                    isChecked,
                    group,
                    current;

                e.preventDefault();

                target = $(e.target).closest("." + BUTTON, this.element);

                if (!target.length && this.popup) {
                    target = $(e.target).closest("." + OVERFLOW_BUTTON, this.popup.element);
                }

                isDisabled = target.hasClass(STATE_DISABLED);

                if (isDisabled) {
                    return;
                }

                if (e.target.closest("." + SPLIT_BUTTON_ARROW).length) {
                    this._toggle(e);
                    return;
                }

                if (target.hasClass(TOGGLE_BUTTON)) {
                    isChecked = target.hasClass(STATE_ACTIVE);
                    group = target.data("group");

                    if (group) { //find all buttons from the same group
                        current = this.element.find("." + TOGGLE_BUTTON + "[data-group='" + group + "']").filter("." + STATE_ACTIVE);
                    }

                    if (!this.trigger(TOGGLE, { target: target, checked: isChecked })) {
                        if(current && current.length) {
                            current.removeClass(STATE_ACTIVE);
                        }

                        target.toggleClass(STATE_ACTIVE);
                    }
                } else {
                    this.trigger(CLICK, { target: target });
                }
            },

            _toggle: function(e) {
                var splitButton = $(e.target).closest("." + SPLIT_BUTTON),
                    popup = splitButton.data("kendoPopup"),
                    isDefaultPrevented;

                e.preventDefault();

                if (popup.element.is(":visible")) {
                    isDefaultPrevented = this.trigger(CLOSE, { target: splitButton });
                } else {
                    isDefaultPrevented = this.trigger(OPEN, { target: splitButton });
                }

                if (!isDefaultPrevented) {
                    toggleOverflow(popup, splitButton, this.isMobile);
                }
            },

            _toggleOverflow: function() {
                toggleOverflow(this.popup, this.overflowAnchor, this.isMobile);
            },

            _resize: function(e) {
                var containerWidth = e.width;

                this.popup.close();

                this._shrink(containerWidth);
                this._stretch(containerWidth);

                this._markVisibles();
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
                this.popup.element
                    .find(">li[data-uid='" + item.data("uid") + "']")
                    .removeClass(OVERFLOW_HIDDEN);
            },

            _showItem: function(item, containerWidth) {
                if (item.length && containerWidth > this._childrenWidth() + item.outerWidth(true)) {
                    item.show();
                    this.popup.element
                        .find(">li[data-uid='" + item.data("uid") + "']")
                        .addClass(OVERFLOW_HIDDEN);

                    return true;
                }

                return false;
            },

            _markVisibles: function() {
                var overflowItems = this.popup.element.children(),
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
