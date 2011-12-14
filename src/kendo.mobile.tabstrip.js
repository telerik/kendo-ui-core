(function($, undefined) {
    /**
    * @name kendo.ui.MobileTabstrip.Description
    * @section The MobileTabstrip widget is used inside a mobile view or layout footer element to display an application-wide group of navigation buttons.
    * The looks of the MobileTabstrip vary depending on the user mobile device and operating system.
    *
    * <h3>Getting Started</h3>
    * The Kendo MobileApplication will automatically initialize the MobileTabstrip for every element with <code>role</code> data attribute set to <code>tabstrip</code> present in the views/layouts markup.
    * Alternatively, it can be initialized using a jQuery selector. The tabstrip element should contain several <code>a</code> elements.
    *
    * <h3>Kendo MobileApplication integration</h3>
    * If a Kendo MobileApplication is initialized, the tabs of the tabstrip will automatically navigate within the application's views.
    * When the application navigates between views, it updates the tabstrip's currently selected tab, based on the current view URL.
    *
    * @exampleTitle Initialize Kendo MobileTabstrip based on role data attribute.
    * @example
    * <div data-role="tabstrip">
    *   <a href="#index">Home</a>
    *   <a href="#featured">Featured</a>
    * </div>
    *
    * @exampleTitle Initialize Kendo MobileTabstrip using a jQuery selector
    * @example
    * var tabstrip = $("#tabstrip").kendoMobileTabStrip();
    * @section
    * <h3>Tab icons</h3>
    * A tab icon can be set in two ways - either by adding an <code>img</code> element inside the <code>a</code> element, or by setting an <code>icon</code> data attribute to the <code>a</code> element.
    * Kendo MobileTabstrip comes out of the box with several ready to use icons:
    *
    * <ul>
    *   <li>TODO</li>
    * </ul>
    *
    * Additional icons may be added by defining the respective CSS tab class. If the <code>icon</code> data attribute is set to <code>custom</code>, the tab will receive <code>km-tab-icon-custom</code> CSS class.
    * @exampleTitle Define custom tabstrip icon.
    * @example
    * .km-tab-icon-custom {
    *   background-image: ...
    * }
    *
    * <div data-role="tabstrip">
    *   <a href="#index" data-icon="custom">Home</a>
    * </div>
    */
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

    var MobileTabstrip = MobileWidget.extend(/** @lends kendo.ui.MobileTabstrip.prototype */{
        /**
        * @constructs
        * @extends kendo.ui.MobileWidget
        * @param {DomElement} element DOM element.
        * @param {Object} options Configuration options.
        * @option {Number} [selectedIndex] <0> The index of the initially selected tab.
        */
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

        /**
        * Set the MobileTabstrip active item to the tab with the specified url.
        * @param {String} url The url of the tab.
        *
        * @example
        * <div data-role="tabstrip" id="tabstrip"> <a href="#foo">Foo</a> </div>
        *
        * <script>
        *     $(function() {
        *         $("#tabstrip").data("kendoMobileTabstrip").switchTo("#foo");
        *     });
        * </script>
        */
        switchTo: function(url) {
            this._setActiveItem(this.element.find('a[href$="' + url + '"]'));
        },

        /**
        * Get the currently selected tab element.
        * @returns {jQueryObject} the currenlty selected tab element.
        */
        currentItem: function() {
            return this.element.children("." + ACTIVE_STATE_CLASS);
        },

        _release: function(e) {
            var that = this,
                item = $(e.currentTarget);

            if (item[0] === that.currentItem()[0]) {
                return;
            }

            that.trigger(SELECT, {item: item});
            that._setActiveItem(item);
        },

        _setActiveItem: function(item) {
            if (!item[0]) {
                return;
            }
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
