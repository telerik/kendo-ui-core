(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        mobile = kendo.mobile,
        support = kendo.support,
        touch = support.touch,
        os = support.mobileOS,
        excludedNodesRegExp = /^(a|img)$/i,
        MOUSEDOWN = touch ? "touchstart" : "mousedown",
        MOUSEUP = touch ? "touchend" : "mouseup",
        CLICK = "click",
        extend = $.extend,
        proxy = $.proxy;

    var MobileButton = ui.MobileWidget.extend({
        init: function(element, options) {
            var that = this;
            element = $(element);

            ui.MobileWidget.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;

            that._wrapper();

            that._clickProxy = proxy(that._click, that);
            that._triggerProxy = proxy(that._trigger, that);

            that.enable();

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
            enable = arguments.length ? enable : true;

            if (enable) {
                that.element
                    .bind(CLICK, that._clickProxy)
                    .bind(MOUSEDOWN, that._triggerProxy)
                    .bind(MOUSEUP, that._triggerProxy);
            } else {
                that.text
                    .unbind(CLICK, that._clickProxy)
                    .unbind(MOUSEDOWN, that._triggerProxy)
                    .unbind(MOUSEUP, that._triggerProxy);
            }
        },

        disable: function () {
            this.enable(false);
        },

        refresh: function() {
        },

        _trigger: function (e) {
            this.element.toggleClass("k-button-clicked", e.type == MOUSEDOWN);
        },

        _click: function(e) {
            this.trigger(CLICK);
        },

        _wrapper: function() {
            var that = this;

            if (that.element.is("button")) {
                that.element.addClass("k-button");
            }

            that.textElement = that.element.children("span");
            if (that.textElement.length) {
                that.textElement.addClass("k-text");
            } else {
                that.textElement = that.element
                                    .contents()
                                    .filter(function() { return (!this.nodeName.match(excludedNodesRegExp) && !(this.nodeType == 3 && !$.trim(this.nodeValue))); })
                                    .wrapAll("<span class='k-text'/>").parent();
            }

            that.image = that.element.children(".k-image, img").addClass("k-image");

            if (!that.image.length) {
                that.image = that.element.children(".k-sprite").addClass("k-sprite");
            }
        }

    });

    ui.plugin(MobileButton);
})(jQuery);
