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

            that.element.addClass("km-tabstrip").children("a")
                    .wrapInner('<span class="km-text"/>')
                    .addClass("km-button")
                    .prepend('<span class="km-icon"/>');


            that._pressProxy = proxy(that._press, that);
            that._releaseProxy = proxy(that._release, that);
            that._clickProxy = proxy(that._click, that);

            that.element.find(BUTTON_SELECTOR)
                            .bind(MOUSEDOWN, that._pressProxy)
                            .bind(MOUSEUP, that._releaseProxy)
                            .bind(CLICK, that._clickProxy);
        },

        // hack to prevent flickering of address bar in iOS
        _press: function (e) {
            var target = $(e.currentTarget);
            target.data("href", target.attr("href"));
            target.attr("href", "");
        },

        _release: function (e) {
            var that = this,
                target = $(e.currentTarget),
                href = target.data("href");

            that.trigger("select", {item: target});

            target.addClass(ACTIVE_STATE_CLASS);

            if (kendo.application && href) {
                kendo.application.navigate(href);
            }
        },

        _click: function (e) {
            var target = $(e.currentTarget);
            target.attr("href", target.data("href"));

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
