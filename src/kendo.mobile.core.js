(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        support = kendo.support,
        extend = $.extend,
        Observable = kendo.Observable,
        mobile;

    var Widget = ui.Widget.extend(/** @lends kendo.mobile.ui.Widget.prototype */{
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
                selector = kendo.roleSelector(options.name.toLowerCase());

                element.find(selector)
                       .add(element.filter(selector))["kendoMobile" + options.name]();
        }
    });

    var SwipeAxis = kendo.Class.extend({
        init: function(horizontal) {
            var that = this;

            if (horizontal) {
                that.size = "width";
                that.axis = "x";
            } else {
                that.size = "height";
                that.axis = "y";
            }
        },

        location: function(location) {
            this.location = location;
        }
    });

    var Swipe = Observable.extend({
        init: function(element, options) {
            var that = this;

            that.xAxis = new SwipeAxis(true);
            that.yAxis = new SwipeAxis(false);

            Observable.fn.init.call(that);
            element.bind("mousedown", $.proxy(that._mouseDown, that));
        },

        _mouseDown: function(e) {
            var that = this;

            if (!that.pressed) {
                that.pressed = true;
                that._updateAxis(e);
                that.trigger("start", {
                    x: that.xAxis.location,
                    y: that.yAxis.location
                });
            }
        },

        _updateAxis: function(e) {
            this.xAxis.location(e.pageX);
            this.yAxis.location(e.pageY);
        }
    });

    /**
     * @name kendo.mobile
     * @namespace This object contains all code introduced by the Kendo mobile suite, plus helper functions that are used across all mobile widgets.
     */
    extend(kendo.mobile, {
        enhance: function(element) {
            var widget, prototype, ui = kendo.mobile.ui;

            element = $(element);

            for (widget in ui) {
                widget = ui[widget];
                prototype = widget.prototype;

                if (prototype.enhance && prototype.options.name) {
                    prototype.enhance(element);
                }
            }
        },

        /**
         * @name kendo.mobile.ui
         * @namespace Contains all classes for the Kendo Mobile UI widgets.
         */
        ui: {
            plugin: function(widget) {
                kendo.ui.plugin(widget, kendo.mobile.ui, "Mobile");
            },

            Widget: Widget
        },

        Swipe: Swipe
    });

})(jQuery);
