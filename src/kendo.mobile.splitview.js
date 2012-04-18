(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Widget = ui.Widget;

    /**
     * @name kendo.mobile.ui.SplitView.Description
     *
     */
    var SplitView = Widget.extend(/** @lends kendo.mobile.ui.SplitView.prototype */{
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

        options: {
            name: "SplitView"
        }
    });

    ui.plugin(SplitView);
})(jQuery);
