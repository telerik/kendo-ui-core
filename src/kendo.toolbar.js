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
        K_TOOLBAR = "k-toolbar",
        K_TOGGLE_BUTTON = "k-toggle-button",
        K_CHECKED_STATE = "k-state-checked",
        K_STATE_DISABLED = "k-state-disabled",
        K_BUTTON = "k-button",
        K_TOGGLE_BUTTON = "k-toggle-button",
        K_BUTTON_ICON = "k-button-icon",
        K_BUTTON_ICON_TEXT = "k-button-icontext",
        K_PRIMARY = "k-primary",
        K_GROUP_START = "k-group-start",
        K_GROUP_END = "k-group-end",

        CLICK = "click",
        TOGGLE = "toggle",

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
                    '<a href="" role="splitbutton" class="k-button k-split-button">' +
                        '<span class="k-split-button-text">#= text #</span><span class="k-icon k-i-arrow-s"></span>' +
                    '</a>' +
                    '<ul class="k-split-button-dropdown">' +
                        '# for(var i = 0; i < options.length; i++) { #' +
                            '<li id="#=options[i].id#"><a>#=options[i].text#</a></li>' +
                        '# } #' +
                    '</ul>' +
                '</div>'
            ),

            separator: kendo.template('<span class="k-toolbar-separator"></span>')

        },

        initializers = {
            button: function(element, options) {
                if(options.enable === false) {
                    element.addClass(K_STATE_DISABLED);
                }

                if(options.primary === true) {
                    element.addClass(K_PRIMARY);
                }

                if(options.id) {
                    element.attr("id", options.id);
                }

                if(options.click && kendo.isFunction(options.click)) {
                    element.on("click", options.click);
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
                        element.addClass(K_BUTTON_ICON);
                    } else {
                        element.addClass(K_BUTTON_ICON_TEXT);
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
                    element.addClass(K_CHECKED_STATE);
                }

                if(options.group) {
                    element.attr("data-group", options.group);
                }
            },

            buttonGroup: function(element, options) {
                var buttons = element.children("." + K_BUTTON);

                for (var i = 0; i < buttons.length; i++) {
                    initializers.toggleButton(buttons.eq(i), options.items[i]);
                }

                buttons.first().addClass(K_GROUP_START);
                buttons.last().addClass(K_GROUP_END);

                if(options.id) {
                    element.attr("id", options.id);
                }
            },

            splitButton: function(element, options) {
                //todo
            }

        };

        var ToolBar = Widget.extend({
            init: function(element, options) {
                var that = this;

                Widget.fn.init.call(that, element, options);

                options = that.options;
                element = that.wrapper = that.element;

                element.addClass(K_TOOLBAR);

                if(options.items && options.items.length) {
                    that._renderItems(options.items);
                }

                element.on(CLICK, ".k-button", proxy(that._buttonClick, that));

                kendo.notify(that);
            },

            events: [
                CLICK,
                TOGGLE
            ],

            options: {
                name: "ToolBar"
                //option list
            },

            destroy: function() {
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
                var target = $(e.target).closest("." + K_BUTTON),
                    isDisabled = target.hasClass(K_STATE_DISABLED),
                    isChecked,
                    group,
                    current;

                e.preventDefault();

                if(isDisabled) {
                    return;
                }

                if(target.hasClass(K_TOGGLE_BUTTON)) {
                    isChecked = target.hasClass(K_CHECKED_STATE);
                    group = target.data("group");

                    if(group) { //find all buttons from the same group
                        current = this.element.find("." + K_TOGGLE_BUTTON + "[data-group='" + group + "']").filter("." + K_CHECKED_STATE);
                    }

                    if(!this.trigger(TOGGLE, { target: target, checked: isChecked })) {
                        if(current && current.length) {
                            current.removeClass(K_CHECKED_STATE);
                        }

                        target.toggleClass(K_CHECKED_STATE);
                    }
                } else {
                    this.trigger(CLICK, { target: target });
                }
            }

        });

    kendo.ui.plugin(ToolBar);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
