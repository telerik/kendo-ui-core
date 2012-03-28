
(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Popup = kendo.ui.Popup,
        Widget = ui.Widget;

    var Shim = Widget.extend(/** @lends kendo.mobile.ui.Shim.prototype */{
        /**
        * @constructs
        * @extends kendo.mobile.ui.Widget
        * @param {DomElement} element DOM element
        */
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);
            element = that.element;
        },

        viewInit: function(view) {
            var that = this,
                element = that.element,
                appElement = view.application.element,
                shim = $('<div class="km-shim" />').appendTo(appElement);

            shim.append(this.element).hide();

            that.shim = shim;

            that.popup = new Popup(element, {
                anchor: shim,
                appendTo: shim,
                origin: "bottom left",
                position: "bottom left",
                animation: { open: { effects: "slideIn:up" } }
            });
        },

        show: function() {
            this.shim.show();
            this.popup.open();
        },

        hide: function() {
            this.shim.hide();
            this.popup.close();
        },

        options: {
            name: "Shim"
        },
    });

    ui.plugin(Shim);
})(jQuery);
