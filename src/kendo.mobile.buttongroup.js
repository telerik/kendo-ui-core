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

            this.vtree = kendo.dom.parse(that.element[0], function(node) {
                return node.nodeName.toLowerCase() === "li";
            });

            kendo.dom.attach(that.element[0], this.vtree);

            that.element.addClass("km-buttongroup").find("li").each(that._button);

            that.element.on(that.options.selectOn, SELECTOR, "_select");

            that.selectedIndex = that.options.index;
            that.refresh();
        },

        refresh: function() {
            var tree = this.vtree.clone();

            for (var index = 0; index < tree.children.length; index ++) {
                var button = tree.children[index];
                var className = "km-button";
                if (button.attr.className) {
                    className = button.attr.className + " km-button";
                }
                var badge = button.attr["data-badge"];

                if (index === this.selectedIndex) {
                    className += " " + ACTIVE;
                }

                button.attr.className = className;

                if (badge !== undefined) {
                    button.children = [ kendo.dom.element("span", {className: "km-badge"}, [ kendo.dom.text(badge) ]) ];
                }
            }

            kendo.dom.render(this.element[0], tree);
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

            if (typeof li === "number") {
                index = li;
            } else {
                li = $(li);
                index = li.index();
            }

            that.selectedIndex = index;
            that.refresh();
        },

        badge: function(item, value) {
            var buttongroup = this.element, badge;

            if (!isNaN(item)) {
                item = buttongroup.children().get(item);
            }

            item = buttongroup.find(item);
            var node = this.vtree.children[item.index()];

            if (value !== undefined) {
                if (value === false) {
                    delete node.attr["data-badge"];
                } else {
                    node.attr["data-badge"] = value;
                }
                this.refresh();
            }

            return node.attr["data-badge"];
        },

        _button: function() {
            var button = $(this).addClass("km-button"),
                icon = kendo.attrValue(button, "icon"),
                span = button.children("span"),
                image = button.find("img").addClass("km-image");

            if (!span[0]) {
                span = button.wrapInner("<span/>").children("span");
            }

            span.addClass("km-text");

            if (!image[0] && icon) {
                button.prepend($('<span class="km-icon km-' + icon + '"/>'));
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
