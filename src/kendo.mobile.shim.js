
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
                shim = $(SHIM).hide();

            Widget.fn.init.call(that, element, options);

            that.shim = shim;
            that.element = element;

            kendo.notify(that);
        },

        setOptions: function(options) {
            var that = this,
                attach = options.modal ? "off" : "on";

            console.log(attach);
            that.shim[attach](kendo.support.mouseup, $.proxy(that.hide, that));
        },

        options: {
            name: "Shim",
            modal: true,
            duration: 200
        },

        viewInit: function(view) {
            var that = this,
                application = view.application,
                align = "center center",
                effect = "fade:in";

            if (application.os === "ios") {
                align = "bottom left";
                effect = "slideIn:up";
            }

            application.element.append(that.shim);

            that.popup = new Popup(that.element, {
                anchor: that.shim,
                appendTo: that.shim,
                origin: align,
                position: align,
                animation: {
                    open: {
                        effects: effect,
                        duration: that.options.duration
                    }
                },
                closed: function() {
                    that.shim.hide();
                },
                open: function() {
                    that.shim.show();
                }
            });
        },

        show: function() {
            this.popup.open();
        },

        hide: function() {
            this.popup.close();
        }
    });

    ui.plugin(Shim);
})(jQuery);
