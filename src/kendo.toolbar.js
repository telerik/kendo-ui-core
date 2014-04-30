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
        SPLIT_BUTTON = "k-split-button",
        SEPARATOR = "k-toolbar-separator",

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

        template = kendo.template,
        templates = {

            button: kendo.template(
                '<a href="" role="button" class="k-button" unselectable="on"' +
                'title="#= data.text ? data.text : "" #">#: data.text ? data.text : "" #</a>'
            ),

            toggleButton: kendo.template(
                '<a href="" role="togglebutton" class="k-button k-toggle-button" unselectable="on"' +
                'title="#= data.text ? data.text : "" #">#: data.text ? data.text : "" #</a>'
            ),

            buttonGroup: kendo.template(
                '<div class="k-button-group">' +
                    '# for(var i = 0; i < items.length; i++) { #' +
                        '<a href="" role="togglebutton" class="k-button k-toggle-button" unselectable="on" title="#= items[i].text ? items[i].text : "" #">' +
                            '#= items[i].text ? items[i].text : "" #' +
                        '</a>' +
                    '# } #' +
                '</div>'
            ),

            splitButton: kendo.template(
                '<div class="k-split-button">' +
                    '<a href="" role="splitbutton" class="k-button">#= text #</a>' +
                    '<a href="" class="k-button k-split-button-arrow"><span class="k-icon k-i-arrow-s"></span></a>' +
                    '<ul class="k-split-button-dropdown">' +
                        '# for(var i = 0; i < options.length; i++) { #' +
                            '<li id="#=options[i].id#"><a>#=options[i].text#</a></li>' +
                        '# } #' +
                    '</ul>' +
                '</div>'
            ),

            separator: kendo.template('<span class="k-toolbar-separator"></span>'),

            commandOverflow: '<span class="k-overflow-anchor">' +
                                '<ul class="k-overflow-container"></ul>'+
                                '<span class="k-icon k-i-collapse"></span>' +
                             '</span>'

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

                if(options.click && kendo.isFunction(options.click)) {
                    element.on(CLICK, options.click);
                }

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
            },

            toggleButton: function(element, options) {
                initializers.button(element, options);

                if(options.selected === true) {
                    element.addClass(STATE_CHECKED);
                }

                if(options.group) {
                    element.attr("data-group", options.group);
                }
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
            },

            splitButton: function(element, options) {
                var popupElement = element.find("." + SPLIT_BUTTON_DROPDOWN),
                    popup,
                    id = options.id || kendo.guid();

                if(id) {
                    element.attr("id", id);
                    popupElement.attr("id", id + "_optionlist");
                }

                popup = popupElement.kendoPopup({
                    anchor: element
                }).data("kendoPopup");

                element.data({ kendoPopup: popup });
            }

        };

        var ToolBar = Widget.extend({
            init: function(element, options) {
                var that = this,
                    commandOverflow;

                Widget.fn.init.call(that, element, options);

                options = that.options;
                element = that.wrapper = that.element;

                element.addClass(TOOLBAR);

                if(options.items && options.items.length) {
                    that._renderItems(options.items);
                }

                if(options.resizable) {
                    commandOverflow = $(templates.commandOverflow);
                    element.append(commandOverflow);

                    that.commandOverflow = commandOverflow.find("." + OVERFLOW_CONTAINER).kendoPopup({
                        anchor: commandOverflow
                    }).data("kendoPopup");
                }

                element.on(CLICK, "." + BUTTON + ":not(." + SPLIT_BUTTON_ARROW + ")", proxy(that._buttonClick, that));
                element.on(CLICK, "." + SPLIT_BUTTON_ARROW, proxy(that._toggle, that));
                element.on(CLICK, "." + OVERFLOW_ANCHOR, proxy(that._toggleOverflowContainer, that));

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

                if(this.commandOverflow) {
                    this.commandOverflow.destroy();
                }

                Widget.fn.destroy.call(this);
            },

            _renderItems: function(items) {
                this.element.empty();

                for (var i = 0; i < items.length; i++) {
                    var command = items[i],
                        element;

                    if(command.template) {
                        if(kendo.isFunction(command.template)) {
                            element = $(command.template(command));
                        } else {
                            element = $(command.template);
                        }
                        element.appendTo(this.element);
                    } else {
                        element = $(templates[command.type](command));

                        (initializers[command.type] || $.noop)(element, command);
                        element.appendTo(this.element);
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

                if(isDisabled) {
                    return;
                }

                if(target.hasClass(TOGGLE_BUTTON)) {
                    isChecked = target.hasClass(STATE_CHECKED);
                    group = target.data("group");

                    if(group) { //find all buttons from the same group
                        current = this.element.find("." + TOGGLE_BUTTON + "[data-group='" + group + "']").filter("." + STATE_CHECKED);
                    }

                    if(!this.trigger(TOGGLE, { target: target, checked: isChecked })) {
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

                if(popup.visible()) {
                    isDefaultPrevented = this.trigger(CLOSE, { target: splitButton, popup: popup });
                } else {
                    isDefaultPrevented = this.trigger(OPEN, { target: splitButton, popup: popup });
                }

                if(!isDefaultPrevented) {
                    popup.toggle();
                }
            },

            _toggleOverflowContainer: function() {
                var popup = this.commandOverflow;
                popup.toggle();
            },

            _moveToPopup: function(item) {
                //todo
            }

        });

    kendo.ui.plugin(ToolBar);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
