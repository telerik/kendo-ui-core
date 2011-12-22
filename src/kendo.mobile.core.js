(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        support = kendo.support,
        extend = $.extend,
        mobile;

    var Widget = ui.Widget.extend(/** @lends kendo.mobile.Widget.prototype */{
        /**
         * Initializes mobile widget. Sets `element` and `options` properties.
         * @constructs
         * @class Represents a mobile UI widget. Base class for all Kendo mobile widgets.
         * @extends kendo.ui.Widget
         */
        init: function(element, options) {
            var that = this,
                option,
                value;

            ui.Widget.fn.init.call(that, element, options);

            for (option in that.options) {
                value = that.element.data(kendo.ns + option);

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

    /**
     * @name kendo.mobile
     * @namespace This object contains all code introduced by the Kendo mobile suite, plus helper functions that are used across all mobile widgets.
     */

    extend(kendo.mobile, {
        enhance: function(element) {
            var widget, ui = mobile.ui;

            element = $(element);

            for (widget in ui) {
                widget = ui[widget];

                if (widget.prototype.enhance) {
                    widget.prototype.enhance(element);
                }
            }
        },

        ui: {
            plugin: function(widget) {
                kendo.ui.plugin(widget, kendo.mobile.ui, "Mobile");
            },

            Widget: Widget
        }
    });
})(jQuery);
