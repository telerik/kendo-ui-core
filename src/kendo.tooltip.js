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

    function restoreTitle(element) {
        while(element.length) {
            restoreTitleAttributeForElement(element);
            element = element.parent();
        }
    }

    function restoreTitleAttributeForElement(element) {
        var title = element.data(kendo.ns + "title");
        if (title) {
            element.attr("title", title);
            element.removeData(kendo.ns + "title");
        }
    }

    function saveTitleAttributeForElement(element) {
        var title = element.attr("title");
        if (title) {
            element.data(kendo.ns + "title", title);
            element.removeAttr("title");
        }
    }

    function saveTitle(element) {
        while(element.length) {
            saveTitleAttributeForElement(element);
            element = element.parent();
        }
    }

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
                current = that.target(),
                wrapper;

            if (!that.popup) {
                wrapper = $(kendo.template(TEMPLATE)({}));
                that.popup = new Popup(wrapper, {
                    open: function() {
                        that.trigger(SHOW);
                    },
                    close: function() {
                        that.trigger(HIDE);
                    }
                });
                that.content = wrapper.find(".k-tooltip-content");
            }

            if (current && current[0] != target[0]) {
                that.popup.close();
            }

            if (content && isFunction(content)) {
                content = content({ element: target });
            }

            saveTitle(target);

            that.content.empty().append(content);

            that.popup.options.anchor = target;

            that.popup.one("deactivate", function() {
               restoreTitle(target);
            });

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
