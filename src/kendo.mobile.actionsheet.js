(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Shim = ui.Shim,
        Widget = ui.Widget,
        WRAP = '<div class="km-actionsheet-wrapper" />';

    var ActionSheet = Widget.extend(/** @lends kendo.mobile.ui.ActionSheet.prototype */{
        /**
        * @constructs
        * @extends kendo.mobile.ui.Widget
        * @param {DomElement} element DOM element
        */
        init: function(element, options) {
            var that = this,
                wrapper;

            Widget.fn.init.call(that, element, options);

            element = that.element;
            element.wrap(WRAP);

            wrapper = element.parent();

            that.wrapper = wrapper;
            that.shim = new Shim(that.wrapper);
        },

        options: {
            name: "ActionSheet"
        },

        open: function() {
            this.shim.show();
        },

        close: function() {
            this.shim.hide();
        }
    });

    ui.plugin(ActionSheet);
})(jQuery);
