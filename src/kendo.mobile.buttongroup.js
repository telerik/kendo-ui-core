(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
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
        ACTIVE = "state-active",
        DISABLE = "state-disabled",
        SELECT = "select",
        SELECTOR = "li:not(.km-" + ACTIVE +")";

    function className(name) {
        return "k-" + name + " km-" + name;
    }

    function createBadge(value) {
        return $('<span class="' + className("badge") + '">' + value + '</span>');
    }

    var ButtonGroup = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.element.addClass("km-buttongroup k-widget k-button-group").find("li").each(that._button);

            that.element.on(that.options.selectOn, SELECTOR, "_select");

            that._enable = true;
            that.select(that.options.index);

            if(!that.options.enable) {
                that._enable = false;
                that.wrapper.addClass(className(DISABLE));
            }
        },

        events: [
            SELECT
        ],

        options: {
            name: "ButtonGroup",
            selectOn: "down",
            index: -1,
            enable: true
        },

        current: function() {
            return this.element.find(".km-" + ACTIVE);
        },

        select: function (li) {
            var that = this,
                index = -1;

            if (li === undefined || li === -1 || !that._enable || $(li).is(".km-" + DISABLE)) {
                return;
            }

            that.current().removeClass(className(ACTIVE));

            if (typeof li === "number") {
                index = li;
                li = $(that.element[0].children[li]);
            } else if (li.nodeType) {
                li = $(li);
                index = li.index();
            }

            li.addClass(className(ACTIVE));
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

        enable: function(enable) {
            if(typeof enable == "undefined") {
                enable = true;
            }

            this.wrapper.toggleClass(className(DISABLE), !enable);

            this._enable = this.options.enable = enable;
        },

        _button: function() {
            var button = $(this).addClass(className("button")),
                icon = kendo.attrValue(button, "icon"),
                badge = kendo.attrValue(button, "badge"),
                span = button.children("span"),
                image = button.find("img").addClass(className("image"));

            if (!span[0]) {
                span = button.wrapInner("<span/>").children("span");
            }

            span.addClass(className("text"));

            if (!image[0] && icon) {
                button.prepend($('<span class="' + className("icon") + ' ' + className(icon) + '"/>'));
            }

            if (badge || badge === 0) {
                createBadge(badge).appendTo(button);
            }
        },

        _select: function(e) {
            if (e.which > 1 || e.isDefaultPrevented() || !this._enable) {
                return;
            }

            this.select(e.currentTarget);
            this.trigger(SELECT, { index: this.selectedIndex });
        }
    });

    ui.plugin(ButtonGroup);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
