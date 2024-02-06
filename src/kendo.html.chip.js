import "./kendo.html.base.js";
import "./kendo.icons.js";

var __meta__ = {
    id: "html.chip",
    name: "Html.Chip",
    category: "web",
    description: "HTML rendering utility for Kendo UI for jQuery.",
    depends: [ "html.base", "icons" ],
    features: []
};

(function($, undefined) {
    var kendo = window.kendo,
        HTMLBase = kendo.html.HTMLBase;

    var renderChip = function(element, options) {
        if (!element || $.isPlainObject(element)) {
            options = element;
            element = $("<span></span>");
        }

        return (new HTMLChip(element, options)).html();
    };

    var HTMLChip = HTMLBase.extend({
        init: function(element, options) {
            var that = this;
            HTMLBase.fn.init.call(that, element, options);
            that._wrapper();
        },
        options: {
            name: "HTMLChip",
            size: "medium",
            rounded: "medium",
            fillMode: "solid",
            themeColor: "base",
            attr: {},
            icon: "",
            iconClass: "",
            iconAttr: {},
            removable: false,
            removableAttr: {},
            removeIcon: "x-circle",
            removeIconClass: "",
            content: "",
            text: "",
            actions: [],
            stylingOptions: [ "size", "rounded", "fillMode", "themeColor" ]
        },
        _wrapper: function() {
            var that = this,
                options = that.options;

            options.text = options.text || options.label;
            that.wrapper = that.element.wrap("<div class='k-chip'></div>").parent().attr(options.attr);
            that._addClasses();

            if (options.icon) {
                that.wrapper.prepend($(kendo.ui.icon({ icon: options.icon, size: "small", iconClass: `k-chip-icon${options.iconClass ? ` ${options.iconClass}` : '' }` })).attr(options.iconAttr));
            } else if (options.iconClass) {
                that.wrapper.prepend($("<span class='" + options.iconClass + "'></span>").attr(options.iconAttr));
            } else if (options.avatarClass) {
                that.wrapper.prepend($("<span class='k-chip-avatar k-avatar k-avatar-md k-avatar-solid k-avatar-solid-primary k-rounded-full " + options.avatarClass + "'></span>").attr(options.iconAttr));
            }

            that.element.addClass("k-chip-content");
            if (options.text) {
                that.element.html('<span class="k-chip-label">' + options.text + '</span>');
            }

            if (options.visible === false) {
                that.wrapper.addClass("k-hidden");
            }

            if (options.selected === true) {
                that.wrapper.addClass("k-selected");
            }

            if (options.enabled === false) {
                that.wrapper.addClass("k-disabled");
            }

            if ((options.actions && options.actions.length > 0) || options.removable) {
                that._actions();
            }


        },
        _actions: function() {
            var that = this,
                options = that.options;

            that.actionsWrapper = $("<span class='k-chip-actions'></span>");
            that.actionsWrapper.appendTo(that.wrapper);

            if (options.actions && options.actions.length > 0) {
                for (var i = 0; i < options.actions.length; i++) {
                    var action = options.actions[i];
                    that.actionsWrapper.append($(`<span class='k-chip-action ${action.iconClass ? action.iconClass : ''}'>${kendo.ui.icon({ icon: action.icon, iconClass: "k-chip-icon", size: "small" })}</span>`).attr(action.attr ? action.attr : {}));
                }
            }

            if (options.removable) {
                that.actionsWrapper.append($(`<span class='k-chip-action k-chip-remove-action'>${kendo.ui.icon({ icon: options.removeIcon, iconClass: "k-chip-icon", size: "small" })}</span>`).attr(options.removableAttr));
            }
        }
    });

    $.extend(kendo.html, {
        renderChip: renderChip,
        HTMLChip: HTMLChip
    });

    kendo.cssProperties.registerPrefix("HTMLChip", "k-chip-");

    kendo.cssProperties.registerValues("HTMLChip", [{
        prop: "rounded",
        values: kendo.cssProperties.roundedValues.concat([['full', 'full']])
    }]);

})(window.kendo.jQuery);
export default kendo;

