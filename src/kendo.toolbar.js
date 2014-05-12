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

        TOOLBAR = "k-toolbar",
        BUTTON = "k-button",
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
        templates = {
            button: kendo.template(
                '<a href="" class="k-button" unselectable="on"' +
                'title="#= data.text ? data.text : "" #">#: data.text ? data.text : "" #</a>'
            ),

            toggleButton: kendo.template(
                '<a href="" class="k-button k-toggle-button" unselectable="on"' +
                'title="#= data.text ? data.text : "" #">#: data.text ? data.text : "" #</a>'
            ),

            buttonGroup: kendo.template(
                '<div class="k-button-group">' +
                    '# for(var i = 0; i < items.length; i++) { #' +
                        '<a href="" class="k-button k-toggle-button" unselectable="on" title="#= items[i].text ? items[i].text : "" #">' +
                            '#= items[i].text ? items[i].text : "" #' +
                        '</a>' +
                    '# } #' +
                '</div>'
            ),

            splitButton: kendo.template(
                '<div class="k-split-button">' +
                    '<a href="" class="k-button">#= text #</a>' +
                    '<a href="" class="k-button k-split-button-arrow"><span class="k-icon k-i-arrow-s"></span></a>' +
                    '<ul class="k-split-button-dropdown">' +
                        '# for(var i = 0; i < options.length; i++) { #' +
                            '<li id="#=options[i].id#"><a>#=options[i].text#</a></li>' +
                        '# } #' +
                    '</ul>' +
                '</div>'
            ),

            separator: kendo.template('<span class="k-toolbar-separator"></span>'),

            overflowAnchor: '<div class="k-overflow-anchor"></div>',

            overflowContainer: '<ul class="k-overflow-container"></ul>'
        },

        overflowTemplates = {
            button: kendo.template(
                '<li><a href="" class="k-button k-overflow-button" unselectable="on">#: data.text ? data.text : "" #</a>'
            ),

            toggleButton: kendo.template(
                '<li><a href="" class="k-button k-toggle-button k-overflow-button" unselectable="on">#: data.text ? data.text : "" #</a>'
            ),

            buttonGroup: kendo.template(""
                //todo
            ),

            splitButton: kendo.template(""
                //todo
            ),

            separator: kendo.template(""
                //todo
            )
        },

        initializers = {
            button: function(element, options) {
                if(options.enable === false) {
                    element.addClass(STATE_DISABLED);
                }

                if(options.primary === true) {
                    element.addClass(PRIMARY);
                }

                if(options.id) {
                    element.attr("id", options.id);
                }

                //user events tap
                if(options.click && kendo.isFunction(options.click)) {
                    element.on(CLICK, options.click);
                }

                element.attr("data-overflow", options.overflow || OVERFLOW_AUTO);

                var icon = options.icon,
                    spriteCssClass = options.spriteCssClass,
                    imageUrl = options.imageUrl,
                    isEmpty, span, img;

                if(spriteCssClass || imageUrl || icon) {
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

                element.data({ type: "button" });
            },

            toggleButton: function(element, options) {
                initializers.button(element, options);

                if(options.selected === true) {
                    element.addClass(STATE_CHECKED);
                }

                if(options.group) {
                    element.attr("data-group", options.group);
                }

                element.data({ type: "toggleButton" });
            },

            buttonGroup: function(element, options) {
                var buttons = element.children("." + BUTTON);

                for (var i = 0; i < buttons.length; i++) {
                    initializers.toggleButton(buttons.eq(i), options.items[i]);
                }

                buttons.first().addClass(GROUP_START);
                buttons.last().addClass(GROUP_END);

                if(options.id) {
                    element.attr("id", options.id);
                }

                element.attr("data-overflow", options.overflow || OVERFLOW_AUTO);

                element.data({ type: "buttonGroup" });
            },

            splitButton: function(element, options) {
                var popupElement = element.find("." + SPLIT_BUTTON_DROPDOWN),
                    popup,
                    id = options.id || kendo.guid();

                if(id) {
                    element.attr("id", id);
                    popupElement.attr("id", id + "_optionlist");
                }

                element.attr("data-overflow", options.overflow || OVERFLOW_AUTO);

                popup = popupElement.kendoPopup({
                    anchor: element
                }).data("kendoPopup");

                element.data({
                    type: "splitButton",
                    kendoPopup: popup
                });
            },

            separator: function(element, options) {
                element.data({ type: "separator" });
            }

        };

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
                    //user events tap
                    element.on(CLICK, "." + OVERFLOW_ANCHOR, proxy(that._toggleOverflow, that));
                }

                if(options.items && options.items.length) {
                    that._renderOverflowItems(options.items);
                    that._renderToolbarItems(options.items);
                }

                //user events tap
                element.on(CLICK, "." + BUTTON + ":not(." + SPLIT_BUTTON_ARROW + ")", proxy(that._buttonClick, that));
                element.on(CLICK, "." + SPLIT_BUTTON_ARROW, proxy(that._toggle, that));

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

                if (this.popup) {
                    this.popup.destroy();
                }

                Widget.fn.destroy.call(this);
            },

            _renderOverflow: function() {
                var overflowAnchor = $(templates.overflowAnchor);

                this.element.append(overflowAnchor);

                this.popup = new kendo.ui.Popup(templates.overflowContainer, {
                    anchor: overflowAnchor
                });
            },

            _renderOverflowItems: function(items) {
                for (var i = 0; i < items.length; i++) {
                    var command = items[i],
                        element;

                    if (command.overflow === OVERFLOW_NEVER) { //skip items that will NOT appear in the overflow
                        continue;
                    }

                    if (command.overflowTemplate) {
                        if (kendo.isFunction(command.overflowTemplate)) {
                            element = $(command.overflowTemplate(command));
                        } else {
                            element = $(command.overflowTemplate);
                        }
                    } else {
                        element = $(overflowTemplates[command.type](command));

                        (initializers[command.type] || $.noop)(element, command);
                    }

                    if (element.length) {
                        element.appendTo(this.popup.element);

                        if (element.data("overflow") === OVERFLOW_AUTO) {
                            element.addClass(OVERFLOW_HIDDEN);
                        }
                    }

                }
            },

            _renderToolbarItems: function(items) {
                for (var i = 0; i < items.length; i++) {
                    var command = items[i],
                        element;

                    if (command.overflow === OVERFLOW_ALWAYS) { //skip items that will appear only in the overflow
                        continue;
                    }

                    if (command.template) {
                        if(kendo.isFunction(command.template)) {
                            element = $(command.template(command));
                        } else {
                            element = $(command.template);
                        }
                    } else {
                        element = $(templates[command.type](command));
                        (initializers[command.type] || $.noop)(element, command);
                    }

                    if (element.length) {
                        element.appendTo(this.element).css("visibility", "hidden");

                        var containerWidth = this.element.innerWidth();

                        if(containerWidth < this._childrenWidth()) {
                            this._hideItem(element);
                        }

                        element.css("visibility", "visible");
                    }

                }
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
                    };
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
                    //connect commands with uids
                    this.popup.element.find(">li.k-overflow-hidden").last().removeClass(OVERFLOW_HIDDEN);
                }
            },

            _showItem: function(item, containerWidth) {
                if (item.length && containerWidth > this._childrenWidth() + item.outerWidth(true)) {
                    item.show();
                    //connect commands with uids
                    this.popup.element.find(">li:not(.k-overflow-hidden)").first().addClass(OVERFLOW_HIDDEN);
                    return true;
                }

                return false;
            }

        });

    kendo.ui.plugin(ToolBar);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
