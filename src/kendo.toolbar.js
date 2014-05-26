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
        SEPARATOR = "k-toolbar-separator",

        RESIZABLE_TOOLBAR = "k-toolbar-resizable",
        STATE_CHECKED = "k-state-checked",
        STATE_DISABLED = "k-state-disabled",
        GROUP_START = "k-group-start",
        GROUP_END = "k-group-end",
        PRIMARY = "k-primary",

        BUTTON_ICON = "k-button-icon",
        BUTTON_ICON_TEXT = "k-button-icontext",

        SPLIT_BUTTON_DROPDOWN = "k-split-button-dropdown",
        SPLIT_BUTTON_ARROW = "k-split-button-arrow",

        OVERFLOW_ANCHOR = "k-overflow-anchor",
        OVERFLOW_CONTAINER = "k-overflow-container",

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
                base: function (options, initializer) {
                    var element = $('<ul class="' + BUTTON_GROUP + '"></ul>'),
                        items = options.items,
                        item;

                    element.data({ type: "buttonGroup" });

                    for (var i = 0; i < items.length; i++) {
                        item = initializer(items[i]);
                        item.wrap("<li></li>").parent().appendTo(element);
                    }

                    element.find(">li ." + BUTTON).first().addClass(GROUP_START);
                    element.find(">li ." + BUTTON).last().addClass(GROUP_END);

                    return element;
                },
                toolbar: function (options) {
                    var element = components.buttonGroup.base(options, components.button.toolbar);

                    if (options.id) {
                        element.attr("id", options.id);
                    }

                    return element;
                },
                overflow: function (options) {
                    var element = components.buttonGroup.base(options, components.button.overflow);

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
                        arrowButton = $('<a href="" class="' + BUTTON + " " + SPLIT_BUTTON_ARROW + '"><span class="k-icon k-i-arrow-s"></span></a>'),
                        popupElement = $('<ul class="' + SPLIT_BUTTON_DROPDOWN + '"></ul>'),
                        popup,
                        items = options.items,
                        item;

                    mainButton.appendTo(element);
                    arrowButton.appendTo(element);
                    popupElement.appendTo(element);

                    for (var i = 0; i < items.length; i++) {
                        item = components.button.toolbar(items[i]);
                        item.wrap("<li></li>").parent().appendTo(popupElement);
                    }

                    if (!options.id) {
                        options.id = options.uid;
                    }

                    element.attr("id", options.id);
                    popupElement.attr("id", options.id + "_optionlist");

                    popup = popupElement.kendoPopup({
                        anchor: element
                    }).data("kendoPopup");

                    element.data({
                        type: "splitButton",
                        kendoPopup: popup
                    });

                    return element;
                },
                overflow: function(options) {
                    var element = $('<ul class="' + SPLIT_BUTTON + '"></ul>'),
                        mainButton = components.button.overflow(options).wrap("<li></li>").parent(),
                        items = options.items,
                        item;

                    mainButton.appendTo(element);

                    for (var i = 0; i < items.length; i++) {
                        item = components.button.overflow(items[i]);
                        item.wrap("<li></li>").parent().appendTo(element);
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
                    var element = $('<span class="k-toolbar-separator"></span>');
                    element.data({ type: "separator" });
                    return element;
                },
                overflow: function(options) {
                    var element = $('<span class="k-overflow-separator"></span>');
                    element.data({ type: "separator" });
                    return element;
                }
            },

            overflowAnchor: '<div class="k-overflow-anchor"></div>',

            overflowContainer: '<ul class="k-overflow-container"></ul>'
        };

        function createButton(options, button) {
            var element = button ? $('<button class="' + BUTTON + '"></button>') : $('<a href="" class="' + BUTTON + '"></a>');

            element.data({ type: "button" });

            if (options.toggle) {
                element.addClass(TOGGLE_BUTTON);
            }

            if (options.toggle && options.selected) {
                element.addClass(STATE_CHECKED);
            }

            if (options.enable === false) {
                element.addClass(STATE_DISABLED);
            }

            if (options.group) {
                element.attr("data-group", options.group);
            }

            return element;
        }

        function createToolbarButton(options) {
            var element = components.button.base(options),
                hasIcon;

            if (options.primary) {
                element.addClass(PRIMARY);
            }

            if (options.id) {
                element.attr("id", options.id);
            }

            if (options.showText != "overflow" && options.text) {
                element.text(options.text);
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

            element.addClass(OVERFLOW_BUTTON);

            if (options.id) {
                element.attr("id", options.id + "_overflow");
            }

            if (options.showText != "toolbar" && options.text) {
                element.text(options.text);
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

                element.contents().not("span.k-sprite").not("span.k-icon").not("img.k-image").each(function(idx, el){
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
                span = element.children("span.k-icon").first();
                if (!span[0]) {
                    span = $('<span class="k-icon"></span>').prependTo(element);
                }
                span.addClass("k-i-" + icon);
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

        var ToolBar = Widget.extend({
            init: function(element, options) {
                var that = this;

                Widget.fn.init.call(that, element, options);

                options = that.options;
                element = that.wrapper = that.element;

                element.addClass(TOOLBAR);

                if(options.resizable) {
                    that._renderOverflow();
                    element.addClass(RESIZABLE_TOOLBAR);

                    that.overflowUserEvents = new kendo.UserEvents(that.element, {
                        filter: "." + OVERFLOW_ANCHOR,
                        tap: proxy(that._toggleOverflow, that)
                    });

                    //click event cannot be prevented from the UserEvents
                    element.on(CLICK, "." + OVERFLOW_ANCHOR, function(e) {
                        e.preventDefault();
                    });
                }

                if(options.items && options.items.length) {
                    for (var i = 0; i < options.items.length; i++) {
                        that.add(options.items[i]);
                    }
                }

                that.userEvents = new kendo.UserEvents(that.element, {
                    filter: "." + BUTTON + ":not(." + SPLIT_BUTTON_ARROW + ")",
                    tap: proxy(that._buttonClick, that)
                });

                //click event cannot be prevented from the UserEvents
                element.on(CLICK, "." + BUTTON + ":not(." + SPLIT_BUTTON_ARROW + ")", function(e) {
                    e.preventDefault();
                });

                that.splitButtonUserEvents = new kendo.UserEvents(that.element, {
                    filter: "." + SPLIT_BUTTON_ARROW,
                    tap: proxy(that._toggle, that)
                });

                //click event cannot be prevented from the UserEvents
                element.on(CLICK, "." + SPLIT_BUTTON_ARROW, function(e) {
                    e.preventDefault();
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
                this.element.find("." + SPLIT_BUTTON).each(function(idx, element) {
                    $(element).data("kendoPopup").destroy();
                });

                this.userEvents.destroy();
                this.splitButtonUserEvents.destroy();

                if (this.options.resizable) {
                    this.overflowUserEvents.destroy();
                    this.popup.destroy();
                }

                Widget.fn.destroy.call(this);
            },

            add: function(options) {
                var component = components[options.type],
                    template = options.template,
                    element,
                    overflowTemplate = options.overflowTemplate,
                    overflowElement;

                $.extend(options, {
                    uid: kendo.guid()
                });

                //add the command in the overflow popup
                if (options.overflow !== OVERFLOW_NEVER) {
                    if (overflowTemplate) { //template command
                        overflowElement = isFunction(overflowTemplate) ? $(overflowTemplate(options)) : $(overflowTemplate);
                    } else if (component) { //build-in command
                        overflowElement = (component.overflow || $.noop)(options);
                    }

                    if (overflowElement.length) {
                        overflowElement = overflowElement.wrap("<li></li>").parent();
                        this._attributes(overflowElement, options);
                        overflowElement.appendTo(this.popup.element);

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

                    if (element.length) {
                        this._attributes(element, options);
                        element.appendTo(this.element).css("visibility", "hidden");

                        var containerWidth = this.element.innerWidth();

                        if(containerWidth < this._childrenWidth()) {
                            this._hideItem(element);
                        }

                        element.css("visibility", "visible");
                    }
                }
            },

            _attributes: function(element, options) {
                element.attr("data-uid", options.uid);
                element.attr("data-overflow", options.overflow || OVERFLOW_AUTO);
            },

            _renderOverflow: function() {
                var overflowAnchor = $(components.overflowAnchor);

                this.element.append(overflowAnchor);

                this.popup = new kendo.ui.Popup(components.overflowContainer, {
                    anchor: overflowAnchor
                });
            },

            _buttonClick: function(e) {
                var target = $(e.target).closest("." + BUTTON),
                    isDisabled = target.hasClass(STATE_DISABLED),
                    isChecked,
                    group,
                    current;

                e.preventDefault();

                if (isDisabled) {
                    return;
                }

                if (target.hasClass(TOGGLE_BUTTON)) {
                    isChecked = target.hasClass(STATE_CHECKED);
                    group = target.data("group");

                    if (group) { //find all buttons from the same group
                        current = this.element.find("." + TOGGLE_BUTTON + "[data-group='" + group + "']").filter("." + STATE_CHECKED);
                    }

                    if (!this.trigger(TOGGLE, { target: target, checked: isChecked })) {
                        if(current && current.length) {
                            current.removeClass(STATE_CHECKED);
                        }

                        target.toggleClass(STATE_CHECKED);
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

                if (popup.visible()) {
                    isDefaultPrevented = this.trigger(CLOSE, { target: splitButton, popup: popup });
                } else {
                    isDefaultPrevented = this.trigger(OPEN, { target: splitButton, popup: popup });
                }

                if (!isDefaultPrevented) {
                    popup.toggle();
                }
            },

            _toggleOverflow: function() {
                this.popup.toggle();
            },

            _resize: function(e) {
                var containerWidth = e.width,
                    commandElement;

                this.popup.close();

                while (containerWidth < this._childrenWidth()) {
                    commandElement = this.element.children(":visible:not(." + OVERFLOW_ANCHOR + ")").last();
                    if (!commandElement.length) {
                        break;
                    }
                    this._hideItem(commandElement);
                }

                while (containerWidth > this._childrenWidth()) {
                    commandElement = this.element.children(":hidden").first();
                    if (!commandElement.length || !this._showItem(commandElement, containerWidth)) {
                        break;
                    }
                }
            },

            _childrenWidth: function() {
                var childrenWidth = 0;

                this.element.children(":visible").each(function() {
                    childrenWidth += $(this).outerWidth(true);
                });

                return Math.ceil(childrenWidth);
            },

            _hideItem: function(item, append) {
                if (item.data("overflow") !== OVERFLOW_NEVER) {
                    item.hide();
                    this.popup.element
                        .find(">li[data-uid='" + item.data("uid") + "']")
                        .removeClass(OVERFLOW_HIDDEN);
                }
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
            }

        });

    kendo.ui.plugin(ToolBar);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
