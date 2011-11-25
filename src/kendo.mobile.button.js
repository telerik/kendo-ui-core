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
            style: "",
            selector: kendo.roleSelector("button"),
            enable: true
        },

        _release: function(e) {
            if (this.trigger(CLICK, {target: $(e.target)})) {
                e.preventDefault();
            }
        },

        _wrap: function() {
            var that = this,
                style = that.options.style,
                element = that.element,
                span;

            span = element.addClass("km-button")
                          .children("span");

            if (style) {
                element.addClass("km-" + style);
            }

            if (!span[0]) {
                span = element.wrapInner("<span/>").children("span");
            }

            span.addClass("km-text")
                .find("img")
                .addClass("km-image");
        }
    });

    var BackButton = MobileButton.extend({
        options: {
            name: "MobileBackButton",
            style: "back",
            selector: kendo.roleSelector("back-button"),
        },

        init: function(element, options) {
            MobileButton.fn.init.call(this, element, options);
            this.element.attr("href", ":back");
        }
    });

    ui.plugin(MobileButton);
    ui.plugin(BackButton);
})(jQuery);
