(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        MobileWidget = ui.MobileWidget,
        mobile = kendo.mobile,
        support = kendo.support,
        touch = support.touch,
        os = support.mobileOS,
        ACTIVE_STATE_CLASS = "km-state-active",
        SELECT = "select",
        proxy = $.proxy;

    var MobileTabstrip = MobileWidget.extend({
        init: function(element, options) {
            var that = this;

            MobileWidget.fn.init.call(that, element, options);

            options = that.options;

            that.bind([SELECT], options);

            that.element.addClass("km-tabstrip");

            that._releaseProxy = proxy(that._release, that);

            that.element.find("a")
                            .each(that._buildButton)
                            .bind(support.mousedown, that._releaseProxy)
                            .eq(options.selectedIndex).addClass(ACTIVE_STATE_CLASS);
        },

        switchTo: function(url) {
            this._setActiveItem(this.element.find('a[href$="' + url + '"]'));
        },

        currentItem: function() {
            return this.element.children("." + ACTIVE_STATE_CLASS);
        },

        _release: function (e) {
            var that = this,
                item = $(e.currentTarget);

            if (item[0] === that.currentItem()[0]) {
                return;
            }

            that.trigger(SELECT, {item: item});
            that._setActiveItem(item);
        },

        _setActiveItem: function (item) {
            this.currentItem().removeClass(ACTIVE_STATE_CLASS);
            item.addClass(ACTIVE_STATE_CLASS);
        },

        _buildButton: function() {
            var button = $(this),
                icon = button.data(kendo.ns + "icon"),
                image = button.find("img"),
                iconSpan = $('<span class="km-icon"/>');

            button
                .addClass("km-button")
                .attr(kendo.attr("role"), "tab")
                    .contents().not(image)
                    .wrapAll('<span class="km-text"/>');

            if (image[0]) {
                image.addClass("km-image");
            } else {
                button.prepend(iconSpan);
                if (icon) {
                    iconSpan.addClass("km-tab-icon-" + icon);
                }
            }
        },

        options: {
            name: "MobileTabstrip",
            selector: kendo.roleSelector("tabstrip"),
            selectedIndex: 0,
            enable: true
        }
    });

    ui.plugin(MobileTabstrip);
})(jQuery);
