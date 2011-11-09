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
        SELECT = "select",
        BUTTON_SELECTOR = "a",
        extend = $.extend,
        proxy = $.proxy;

    var MobileTabstrip = MobileWidget.extend({
        init: function(element, options) {
            var that = this;

            MobileWidget.fn.init.call(that, element, options);

            options = that.options;

            that.bind([SELECT], options);

            that.element.addClass("km-tabstrip");


            that._releaseProxy = proxy(that._release, that);
            that._clickProxy = proxy(that._click, that);

            that.element.find(BUTTON_SELECTOR)
                            .wrapInner('<span class="km-text"/>')
                            .addClass("km-button")
                            .prepend('<span class="km-icon"/>')
                            .bind(MOUSEUP, that._releaseProxy)
                            .bind("click", that._clickProxy);
        },

        _release: function (e) {
            var that = this,
                target = $(e.currentTarget),
                oldItem = that.element.children("." + ACTIVE_STATE_CLASS),
                href = target.attr("href");

            that.trigger("select", {item: target});

            target.addClass(ACTIVE_STATE_CLASS);
            oldItem.removeClass(ACTIVE_STATE_CLASS);

            if (kendo.application && href) {
                target.attr("href", "#!");
                setTimeout(function() { target.attr("href", href) }, 0);
                kendo.application.navigate(href);
                e.preventDefault();
            }
        },

        _click: function (e) {
            if (kendo.application) {
                e.preventDefault();
            }
        },

        options: {
            name: "MobileTabstrip",
            selector: "[data-kendo-role=tabstrip]",
            enable: true
        }
    });

    ui.plugin(MobileTabstrip);
})(jQuery);
