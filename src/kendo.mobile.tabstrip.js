(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        MobileWidget = ui.MobileWidget,
        mobile = kendo.mobile,
        support = kendo.support,
        touch = support.touch,
        os = support.mobileOS,
        MOUSEDOWN = support.mousedown,
        MOUSEUP = support.mouseup,
        ACTIVE_STATE_CLASS = "km-state-active",
        CLICK = "click",
        extend = $.extend,
        proxy = $.proxy;

    var MobileTabstrip = MobileWidget.extend({
        init: function(element, options) {
            var that = this;

            MobileWidget.fn.init.call(that, element, options);

            options = that.options;
            that.element.addClass("km-tabstrip").children("a")
                    .wrapInner('<span class="km-text"/>')
                    .addClass("km-button")
                    .prepend('<span class="km-icon"/>').click(function() {
                        $(this).toggleClass("km-state-active")
                        return false;
                    });
        },

        options: {
            name: "MobileTabstrip",
            selector: "[data-kendo-role=tabstrip]",
            enable: true
        }
    });

    ui.plugin(MobileTabstrip);
})(jQuery);
