(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Widget = ui.Widget,
        View = ui.View;

    /**
     * @name kendo.mobile.ui.Pane.Description
     *
     */
    var Pane = View.extend(/** @lends kendo.mobile.ui.Pane.prototype */{
        /**
        * @constructs
        * @extends kendo.mobile.ui.Widget
        * @param {DomElement} element DOM element
        */
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = that.element;

            element.addClass("km-pane");

            that.viewElements = element.children(kendo.roleSelector("view splitview")).hide();
        },

        displayInitial: function(url) {
            var that = this,
                viewSelector = url || that.options.initial,
                viewElement = viewSelector ? that.viewElements.filter(viewSelector) : that.viewElements.first();

            if (viewElement[0]) {
                kendo.initWidget(element, {}, kendo.mobile.ui);
            } else {

            }
            viewElement.show();
        },

        options: {
            name: "Pane"
        },

        _createView: function(element) {
        }
    });

    ui.plugin(Pane);
})(jQuery);
