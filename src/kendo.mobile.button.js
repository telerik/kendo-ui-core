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
        HREF = "href",
        ACTIVE_STATE_CLASS = "km-state-active",
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
            that._releaseProxy = proxy(that._release, that);

            that.enable(options.enable);

            // Hack to prevent the addressbar
            // flashing when clicking the buttons

            that.bind([
                CLICK
            ], options);
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
                    .bind(MOUSEUP, that._releaseProxy)
                    .bind(CLICK, that._clickProxy);
            } else {
                that.element
                    .unbind(MOUSEDOWN, that._pressProxy)
                    .unbind(MOUSEUP, that._releaseProxy)
                    .unbind(CLICK, that._clickProxy);
            }
        },

        disable: function () {
            this.enable(false);
        },

        _press: function (e) {
            this.element.addClass(ACTIVE_STATE_CLASS);
        },

        _release: function (e) {
            var that = this,
                element = that.element,
                href = element.attr(HREF);

            that.element.removeClass(ACTIVE_STATE_CLASS);

            that.trigger(CLICK);

            if (kendo.application && href) {
                element.attr(HREF, "#!");
                setTimeout(function() { element.attr(HREF, href) }, 0);
                kendo.application.navigate(href);
                e.preventDefault();
            }
        },

        _click: function (e) {
            if (kendo.application) {
                e.preventDefault();
            }
        },

        _wrap: function() {
            var that = this,
                element = that.element,
                span;

            span = element.addClass("km-button")
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
