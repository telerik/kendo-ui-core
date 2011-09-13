(function($, undefined) {
    var kendo = window.kendo,
        each = $.each,
        extend = $.extend,
        support = kendo.support,
        transitions = support.transitions;

    var Form = Component.extend({/** @lends kendo.ui.MobileForm.prototype */
        init: function(element, options) {
            element = $(element);
            var that = this;

            Component.fn.init.call(that, element, options);

            options = that.options;

            that._updateClasses();

            if (options.animation === false) {
                options.animation = { open: { show: true, effects: {} }, close: { hide: true, effects: {} } };
            }
        },

        options: {
            animation: {
                check: {
                    duration: 200,
                    show: true
                },
                uncheck: { // if close animation effects are defined, they will be used instead of open.reverse
                    duration: 100,
                    show: false,
                    hide: true
                }
            }
        },

        _updateClasses: function() {
            
        }
    });

    kendo.ui.plugin("Form", Form, Component);

})(jQuery);

