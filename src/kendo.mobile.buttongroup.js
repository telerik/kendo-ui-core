(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = {
    id: "mobile.buttongroup",
    name: "ButtonGroup",
    category: "mobile",
    description: "The Kendo mobile ButtonGroup widget is a linear set of grouped buttons.",
    depends: [ "core" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Widget = ui.Widget,
        ACTIVE = "km-state-active",
        SELECT = "select",
        SELECTOR = "li:not(." + ACTIVE +")";

    function createBadge(value) {
        return $('<span class="km-badge">' + value + '</span>');
    }

    var ButtonGroup = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.element.addClass("km-buttongroup").find("li").each(that._button);

            that.element.on(that.options.selectOn, SELECTOR, "_select");

            that.select(that.options.index);
        },

        events: [
            SELECT
        ],

        options: {
            name: "ButtonGroup",
            selectOn: "down",
            index: -1
        },

        current: function() {
            return this.element.find("." + ACTIVE);
        },

        select: function (li) {
            var that = this,
                index = -1;

            if (li === undefined || li === -1) {
                return;
            }

            that.current().removeClass(ACTIVE);

            if (typeof li === "number") {
                index = li;
                li = $(that.element[0].children[li]);
            } else if (li.nodeType) {
                li = $(li);
                index = li.index();
            }

            li.addClass(ACTIVE);
            that.selectedIndex = index;
        },

        badge: function(item, value) {
            var buttongroup = this.element, badge;

            if (!isNaN(item)) {
                item = buttongroup.children().get(item);
            }

            item = buttongroup.find(item);
            badge = $(item.children(".km-badge")[0] || createBadge(value).appendTo(item));

            if (value || value === 0) {
                badge.html(value);
                return this;
            }

            if (value === false) {
                badge.empty().remove();
                return this;
            }

            return badge.html();
        },

        _button: function() {
            var button = $(this).addClass("km-button"),
                icon = kendo.attrValue(button, "icon"),
                badge = kendo.attrValue(button, "badge"),
                span = button.children("span"),
                image = button.find("img").addClass("km-image");

            if (!span[0]) {
                span = button.wrapInner("<span/>").children("span");
            }

            span.addClass("km-text");

            if (!image[0] && icon) {
                button.prepend($('<span class="km-icon km-' + icon + '"/>'));
            }

            if (badge || badge === 0) {
                createBadge(badge).appendTo(button);
            }
        },

        _select: function(e) {
            if (e.which > 1 || e.isDefaultPrevented()) {
                return;
            }

            this.select(e.currentTarget);
            this.trigger(SELECT, { index: this.selectedIndex });
        }
    });

    ui.plugin(ButtonGroup);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
