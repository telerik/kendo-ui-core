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
        CLICK = "click",
        proxy = $.proxy;

    var MobileButton = MobileWidget.extend({
        init: function(element, options) {
            var that = this;

            MobileWidget.fn.init.call(that, element, options);

            options = that.options;

            that._wrap();

            that._releaseProxy = proxy(that._release, that);

            that.element.bind(MOUSEUP, that._releaseProxy);

            that.bind([CLICK], options);
        },

        options: {
            name: "MobileButton",
            style: "button",
            selector: "[data-kendo-role=button]",
            enable: true
        },

        _release: function(e) {
            this.trigger(CLICK);
        },

        _wrap: function() {
            var that = this,
                element = that.element,
                span;

            span = element.addClass("km-" + that.options.style)
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
