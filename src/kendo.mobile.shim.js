
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
            var that = this,
                shim = $('<div class="km-shim" />').hide();

            Widget.fn.init.call(that, element, options);

            that.shim = shim;
            that.element = element;

        },

        options: {
            name: "Shim"
        },

        viewInit: function(view) {
            var that = this;
            view.application.element.append(that.shim);

            that.popup = new Popup(that.element, {
                anchor: that.shim,
                appendTo: that.shim,
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
        }
    });

    ui.plugin(Shim);
})(jQuery);
