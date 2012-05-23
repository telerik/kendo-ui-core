
(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Popup = kendo.ui.Popup,
        VISIBILITY = "visibility",
        HIDDEN = "hidden",
        VISIBLE = "visible",
        SHIM = '<div class="km-shim"/>',
        Widget = ui.Widget;

    var Shim = Widget.extend(/** @lends kendo.mobile.ui.Shim.prototype */{
        /**
        * @constructs
        * @extends kendo.mobile.ui.Widget
        * @param {DomElement} element DOM element
        */
        init: function(element, options) {
            var that = this,
                align = "center center",
                effect = "fade:in",
                view,
                shim = $(SHIM).hide();

            if (kendo.support.mobileOS.ios) {
                align = "bottom left";
                effect = "slideIn:up";
            }

            Widget.fn.init.call(that, element, options);
            view = that.view(),

            that.shim = shim;
            that.element = element;

            if (!that.options.modal) {
                that.shim.on(kendo.support.mouseup, $.proxy(that.hide, that));
            }

            view.container.append(shim);

            that.popup = new Popup(that.element, {
                anchor: shim,
                appendTo: shim,
                origin: align,
                position: align,
                animation: {
                    open: {
                        effects: effect,
                        duration: that.options.duration
                    },
                    close: {
                        duration: that.options.duration
                    }
                },
                deactivate: function() {
                    shim.hide();
                },
                open: function() {
                    shim.show();
                }
            });

            kendo.notify(that);
        },

        options: {
            name: "Shim",
            modal: true,
            duration: 200
        },

        show: function() {
            this.popup.open();
            this.popup.wrapper.css({
                width: "",
                left: "",
                top: ""
            });
        },

        hide: function() {
            this.popup.close();
        }
    });

    ui.plugin(Shim);
})(jQuery);
