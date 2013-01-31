kendo_module({
    id: "mobile.shim",
    name: "Shim",
    category: "mobile",
    description: "Mobile Shim",
    depends: [ "popup" ],
    hidden: true
});

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Popup = kendo.ui.Popup,
        SHIM = '<div class="km-shim"/>',
        Widget = ui.Widget;

    var Shim = Widget.extend({
        init: function(element, options) {
            var that = this,
                app = kendo.mobile.application,
                osname = app ? app.os : kendo.support.mobileOS.name,
                ioswp = osname === "ios" || osname === "wp",
                align = options.align || (ioswp ?  "bottom center" : "center center"),
                position = options.position || (ioswp ? "bottom center" : "center center"),
                effect = options.effect || (ioswp ? "slideIn:up" : "fade:in"),
                shim = $(SHIM).handler(that).hide();

            Widget.fn.init.call(that, element, options);

            that.shim = shim;
            that.element = element;

            if (!that.options.modal) {
                that.shim.on("up", "hide");
            }

            (app ? app.element : $(document.body)).append(shim);

            that.popup = new Popup(that.element, {
                anchor: shim,
                appendTo: shim,
                origin: align,
                position: position,
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
            align: undefined,
            position: undefined,
            effect: undefined,
            duration: 200
        },

        show: function() {
            this.popup.open();
        },

        hide: function(e) {
            if (!e || !$.contains(this.shim[0], e.target)) {
                this.popup.close();
            }
        },

        destroy: function() {
            Widget.fn.destroy.call(this);
            this.shim.kendoDestroy();
            this.popup.destroy();
        }
    });

    ui.plugin(Shim);
})(window.kendo.jQuery);
