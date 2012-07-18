;(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget;

    var ImageBrowser = Widget.extend({
        init: function(element, options) {
            var that = this;

            options = options || {};

            Widget.fn.init.call(that, element, options);
        },

        options: {
            name: "ImageBrowser"
        },

        refresh: function() {
        }
    });

    kendo.ui.plugin(ImageBrowser);
})(jQuery);
