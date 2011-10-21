(function($, undefined) {
    var kendo = window.kendo,
        extend = $.extend,
        mobile,
        Observable = kendo.Observable;

    var MobileWidget = Observable.extend({
        init: function(element, options) {
            var that = this, option, value;

            Observable.fn.init.call(that);

            that.element = element = $(element);
            that.options = extend(true, {}, that.options, options);

            for (option in that.options) {
                value = element.data("kendo-" + option.toLowerCase());

                if (value !== undefined) {
                    that.options[option] = value;
                }
            }
        },

        options: {

        },

        enhance: function(element) {
            var options = this.options,
                selector = options.selector;

            if (selector) {
                element.find(selector)
                       .add(element.filter(selector))["kendo" + options.name]();
            }
        }
    });

    mobile = {
        enhance: function(element) {
            var widget;

            element = $(element);

            for (widget in kendo.ui) {
                widget = kendo.ui[widget];

                if (widget.prototype.enhance) {
                    widget.prototype.enhance(element);
                }
            }
        }
    }

    kendo.ui.MobileWidget = MobileWidget;
    kendo.mobile = mobile;
})(jQuery);
