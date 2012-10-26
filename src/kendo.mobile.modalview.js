(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Shim = ui.Shim,
        Widget = ui.Widget,
        OPEN = "open",
        WRAP = '<div class="km-modalview-wrapper" />';

    var ModalView = ui.View.extend({
        init: function(element, options) {
            var that = this, width, height;

            Widget.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;

            width = element[0].style.width || element.css("width");
            height = element[0].style.height || element.css("height");

            element.addClass("km-modalview").wrap(WRAP);

            that.wrapper = element.parent().css({
                width: options.width || width || 300,
                height: options.height || height || 300
            });

            element.css({ width: "", height: "" });

            that.shim = new Shim(that.wrapper, {
                modal: options.modal,
                position: "center center",
                align: "center center",
                effect: "fade:in"
            });

            that._layout();
            that._scroller();
            that._model();

            kendo.onResize(function() {
                var positionedElement = that.wrapper.parent(),
                    viewPort = positionedElement.parent();

                positionedElement.css({
                    top: (viewPort.height() - positionedElement.height()) / 2 + "px",
                    left: (viewPort.width() - positionedElement.width()) / 2 + "px"
                });
            });
        },

        events: [
            OPEN
        ],

        options: {
            name: "ModalView",
            modal: true,
            width: null,
            height: null
        },

        destroy: function() {
            Widget.fn.destroy.call(this);
            this.shim.destroy();
        },

        open: function(target) {
            this.target = $(target);
            this.shim.show();
        },

        // Interface implementation, called from the pane click handlers
        openFor: function(target) {
            this.open(target);
            this.trigger(OPEN, { target: target });
        },

        close: function() {
            this.shim.hide();
        }
    });

    ui.plugin(ModalView);
})(jQuery);
