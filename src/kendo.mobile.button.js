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
        proxy = $.proxy;

    var MobileButton = MobileWidget.extend({
        init: function(element, options) {
            var that = this;

            MobileWidget.fn.init.call(that, element, options);

            options = that.options;

            that._wrap();

            that._clickProxy = proxy(that._click, that);
            that._pressProxy = proxy(that._press, that);
            that._releaseProxy = proxy(that._release, that);

            that.enable(options.enable);

            that.bind([CLICK], options);
        },

        options: {
            name: "MobileButton",
            selector: "[data-kendo-role=button]",
            enable: true
        },

        enable: function(enable) {
            var that = this;

            enable = enable === undefined ? true: enable;

            if (enable) {
                that.element
                    .bind(MOUSEDOWN, that._pressProxy)
                    .bind(MOUSEUP, that._releaseProxy);
            } else {
                that.element
                    .unbind(MOUSEDOWN, that._pressProxy)
                    .unbind(MOUSEUP, that._releaseProxy);
            }
        },

        disable: function() {
            this.enable(false);
        },

        _press: function(e) {
            this.element.addClass(ACTIVE_STATE_CLASS);
        },

        _release: function(e) {
            var that = this;

            that.element.removeClass(ACTIVE_STATE_CLASS);
            that.trigger(CLICK);
        },

        _wrap: function() {
            var that = this,
                element = that.element,
                span;

            span = element.addClass("km-button")
                          .attr("data-kendo-type", "app-button")
                          .children("span");

            if (!span[0]) {
                span = element.wrapInner("<span/>").children("span");
            }

            span.addClass("km-text")
                .find("img")
                .addClass("km-image");
        }
    });

    ui.plugin(MobileButton);
})(jQuery);
