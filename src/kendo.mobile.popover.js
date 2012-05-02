(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Widget = ui.Widget;

    /**
     * @name kendo.mobile.ui.SplitView.Description
     * @section
     */
    var PopOver = Widget.extend(/** @lends kendo.mobile.ui.SplitView.prototype */{
        /**
         * @constructs
         * @extends kendo.mobile.ui.Widget
         * @param {DomElement} element DOM element
         */
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);
            $.extend(that, options);

            that.element.css({
                width: that.options.width,
                height: that.options.height,
                opacity: 1
            });

            that.pane = new kendo.mobile.ui.Pane(that.element).navigate("");
            that.popup = new kendo.ui.Popup(that.element, {
                animation: {
                    open: { effects: {} },
                    close: { // if close animation effects are defined, they will be used instead of open.reverse
                        effects: "fadeOut",
                        duration: 400,
                        hide: false
                    }
                }
            });
        },


        options: {
            name: "PopOver",
            width: 240,
            height: 320
        },

        openFor: function(link) {
            var that = this;
            that.popup.options.anchor = $(link);

            setTimeout(function() {
                that.popup.open();
            }, 100);
        }
    });

    PopOver.init = function(element) {
        var instance = element.data("kendoMobilePopOver");

        if (!instance) {
            instance = kendo.initWidget(element, {}, ui);
        }

        return instance;
    }
    ui.plugin(PopOver);
})(jQuery);
