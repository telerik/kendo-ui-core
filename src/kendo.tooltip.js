kendo_module({
    id: "tooltip",
    name: "Tooltip",
    category: "web",
    description: "",
    depends: [ "core", "popup" ]
});

(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        Popup = kendo.ui.Popup,
        isFunction = $.isFunction,
        SHOW = "show",
        HIDE = "hide",
        TEMPLATE = '<div class="k-widget k-tooltip" style="margin-left:0.5em"><div class="k-tooltip-content"></div></div>',
        NS = ".kendoTooltip";

    var Tooltip = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.element
                .on("mouseenter" + NS, that.options.filter, $.proxy(that._show, that))
                .on("mouseleave" + NS, that.options.filter, function() {
                    that.popup.close();
                });
        },

        options: {
            name: "Tooltip",
            filter: "",
            content: ""
        },

        events: [ SHOW, HIDE ],

        _show: function(e) {
            this.show($(e.currentTarget));
        },

        show: function(target) {
            var that = this,
                content = that.options.content,
                current = that.target();

            if (!that.popup) {
                that.content = $(kendo.template(TEMPLATE)({}));

                that.popup = new Popup(that.content, {
                    open: function() {
                        that.trigger(SHOW);
                    },
                    close: function() {
                        that.trigger(HIDE);
                    }
                });
            }

            if (current && current[0] != target[0]) {
                that.popup.close();
            }

            if (content && isFunction(content)) {
                content = content({ element: target });
            }

            that.content
                .find(".k-tooltip-content")
                .empty()
                .append(content);

            that.popup.options.anchor = target;
            that.popup.open();
        },

        target: function() {
            if (this.popup) {
                return this.popup.options.anchor;
            }
            return null;
        },

        destroy: function() {
            Widget.fn.destroy.call(this);

            if (this.popup) {
                this.popup.destroy();
            }

            this.element.off(NS);
        }
    });

    kendo.ui.plugin(Tooltip);
})(window.kendo.jQuery);
