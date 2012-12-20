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
        extend = $.extend,
        SHOW = "show",
        HIDE = "hide",
        TEMPLATE = '<div class="k-widget k-tooltip" style="margin-left:0.5em"><div class="k-tooltip-content"></div></div>',
        NS = ".kendoTooltip",
        POSITIONS = {
            "below": {
                origin: "bottom center",
                position: "top center"
            },
            "over": {
                origin: "top center",
                position: "bottom center"
            },
            "left": {
                origin: "center left",
                position: "center right",
                collision: "fit flip"
            },
            "right": {
                origin: "center right",
                position: "center left",
                collision: "fit flip"
            },
            "center": {
                position: "top center",
                origin: "center center"
            }
        };

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

    function saveTitleAttributes(element) {
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
                .on("mouseenter" + NS, that.options.filter, $.proxy(that._mouseenter, that))
                .on("mouseleave" + NS, that.options.filter, $.proxy(that._mouseleave, that));
        },

        options: {
            name: "Tooltip",
            filter: "",
            content: ""
        },

        events: [ SHOW, HIDE ],

        _mouseenter: function(e) {
            this.show($(e.currentTarget));
        },

        show: function(target) {
            var that = this,
                content = that.options.content,
                current = that.target();

            if (!that.popup) {
                that._initPopup();
            }

            if (current && current[0] != target[0]) {
                that.popup.close();
            }

            if (!current || current[0] != target[0]) {
                if (content && isFunction(content)) {
                    content = content({ element: target });
                }

                that.content.empty().append(content);

                that.popup.options.anchor = target;
            }

            saveTitleAttributes(target);

            that.popup.one("deactivate", function() {
                restoreTitle(target);
            });

            that.popup.open();
        },

        _initPopup: function() {
            var that = this,
                wrapper = $(kendo.template(TEMPLATE)({}));

            that.popup = new Popup(wrapper, extend({
                open: function() {
                    that.trigger(SHOW);
                },
                close: function() {
                    that.trigger(HIDE);
                }
            }, POSITIONS[that.options.position]));

            that.content = wrapper.find(".k-tooltip-content");

            wrapper.on("mouseleave" + NS, $.proxy(that._mouseleave, that));
        },

        _mouseleave: function(e) {
            var element = $(e.currentTarget),
                offset = element.offset(),
                pageX = e.pageX,
                pageY = e.pageY;

            offset.right = offset.left + element.outerWidth();
            offset.bottom = offset.top + element.outerHeight();

            if (pageX > offset.left && pageX < offset.right && pageY > offset.top && pageY < offset.bottom) {
                return;
            }

            this.popup.close();
        },

        target: function() {
            if (this.popup) {
                return this.popup.options.anchor;
            }
            return null;
        },

        destroy: function() {
            var popup = this.popup;

            if (popup) {
                popup.element.off(NS);
                popup.destroy();
            }

            this.element.off(NS);

            Widget.fn.destroy.call(this);
        }
    });

    kendo.ui.plugin(Tooltip);
})(window.kendo.jQuery);
