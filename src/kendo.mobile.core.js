(function($, undefined) {
    var kendo = window.kendo,
        extend = $.extend,
        Observable = kendo.Observable;

    var MobileWidget = Observable.extend({
        init: function(element, options) {
            var that = this, option, value;

            Observable.fn.init.call(that);

            that.element = element = $(element);
            that.options = extend(true, {}, that.options, options);

            for (option in that.options) {
                value = element.data("kendo-" + option);

                if (value !== undefined) {
                    that.options[option] = value;
                }
            }
        }
    });

    kendo.ui.MobileWidget = MobileWidget;
})(jQuery);
