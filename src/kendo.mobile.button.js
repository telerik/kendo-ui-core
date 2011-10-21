(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        MobileWidget = ui.MobileWidget,
        mobile = kendo.mobile,
        support = kendo.support,
        touch = support.touch,
        os = support.mobileOS,
        MOUSEDOWN = touch ? "touchstart" : "mousedown",
        MOUSEUP = touch ? "touchend" : "mouseup",
        CLICK = "click",
        extend = $.extend,
        proxy = $.proxy;

    var MobileButton = MobileWidget.extend({
        init: function(element, options) {
            var that = this;

            MobileWidget.fn.init.call(that, element, options);

            options = that.options;

            that._wrap();

            that._clickProxy = proxy(that._click, that);

            that._pressProxy = proxy(that._press, that);

            that.enable(options.enable);

            that.bind([
                CLICK
            ], options);
        },

        options: {
            name: "MobileButton",
            enable: true
        },

        enable: function(enable) {
            var that = this;

            enable = enable === undefined ? true: enable;

            if (enable) {
                that.element
                    .bind(CLICK, that._clickProxy)
                    .bind(MOUSEDOWN, that._pressProxy)
                    .bind(MOUSEUP, that._pressProxy);
            } else {
                that.element
                    .unbind(CLICK, that._clickProxy)
                    .unbind(MOUSEDOWN, that._pressProxy)
                    .unbind(MOUSEUP, that._pressProxy);
            }
        },

        disable: function () {
            this.enable(false);
        },

        _press: function (e) {
            this.element.toggleClass("k-state-active", e.type === MOUSEDOWN);
        },

        _click: function(e) {
            this.trigger(CLICK);
        },

        _wrap: function() {
            var that = this,
                element = that.element,
                span;

            span = element.addClass("k-button")
                          .children("span");

            if (!span[0]) {
                span = element.wrapInner("<span/>").children("span");
            }

            span.addClass("k-text")
                .find("img")
                .addClass("k-image");
        }
    });

    ui.plugin(MobileButton);
})(jQuery);
