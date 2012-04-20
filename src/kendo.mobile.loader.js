
(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Widget = ui.Widget;

    /**
     * @name kendo.mobile.ui.Loader.Description
     *
     */
    var Loader = Widget.extend(/** @lends kendo.mobile.ui.Loader.prototype */{
        /**
        * @constructs
        * @extends kendo.mobile.ui.Widget
        * @param {DomElement} element DOM element
        */
        init: function(container, options) {
            var that = this,
                element = $('<div class="km-loader"><span class="km-loading km-spin"></span></div>');

            Widget.fn.init.call(that, element, options);

            element.append(that.options.loading).hide().appendTo(container);
        },

        options: {
            name: "Loader",
            loading: "<h1>Loading...</h1>",
            timeout: 100
        },

        /**
         * Show the loading animation.
         * @example
         */
        show: function() {
            var that = this;

            clearTimeout(that._loading);

            if (that.options.loading === false) {
                return;
            }

            that._loading = setTimeout(function() {
                that.element.show();
            }, that.options.timeout);
        },

        /**
         * Hide the loading animation.
         * @example
         */
        hide: function() {
            var that = this;
            clearTimeout(that._loading);
            that.element.hide();
        }
    });

    ui.plugin(Loader);
})(jQuery);
