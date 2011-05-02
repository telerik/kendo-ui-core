(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        OPEN = "open",
        CLOSE = "close",
        extend = $.extend,
        Component = ui.Component;

    function Popup(element, options) {
        var that = this;

        Component.apply(that, arguments);

        that.element.hide().appendTo(document.body);

        that.openAnimation = extend(that.options.openAnimation, {
            complete: function() {
                that.trigger(OPEN);
            }
        });

        that.closeAnimation = extend(that.options.closeAnimation, {
            complete: function() {
                that.trigger(CLOSE);
            }
        });

        that.bind([OPEN, CLOSE], that.options);
    }

    Popup.prototype = {
        options: {
            openAnimation: {
                effects: "fadeIn",
                show: true
            },
            closeAnimation: {
                effects: "fadeOut",
                hide: true
            }
        },
        open: function() {
            var that = this;

            that.element.kendoAnimate(that.openAnimation);
        },
        close: function() {
            var that = this;
            that.element.kendoAnimate(that.closeAnimation);
        }
    }

    ui.plugin("Popup", Popup, Component);
})(jQuery);
