(function($, undefined) {
    /**
    * @name kendo.mobile.ui.TabStrip.Description
    * @section The mobile TabStrip widget is used inside a mobile view or layout footer element to display an application-wide group of navigation buttons.
    * The looks of the mobile TabStrip vary depending on the user mobile device and operating system.
    *
    * <h3>Getting Started</h3>
    * <p>The Kendo mobile Application will automatically initialize the mobile TabStrip for every element with <code>role</code> data attribute set to <code>tabstrip</code> present in the views/layouts markup.
    * Alternatively, it can be initialized using a jQuery selector. The tabstrip element should contain one or more <code>a</code> elements.</p>
    *
    * <h3>Kendo Mobile Application Integration</h3>
    * <p>If a Kendo mobile Application is initialized, the tabs of the TabStrip will automatically navigate within the application's views.
    * When the application navigates between views, it updates the TabStrip's currently selected tab, based on the current view's URL.</p>
    *
    * @exampleTitle Initialize Kendo mobile TabStrip based on role data attribute.
    * @example
    * <div data-role="tabstrip">
    *   <a href="#index">Home</a>
    *   <a href="#featured">Featured</a>
    * </div>
    *
    * @exampleTitle Initialize Kendo mobile TabStrip using a jQuery selector
    * @example
    * var tabstrip = $("#tabstrip").kendoMobileTabStrip();
    *
    * @section
    * <h3>Tab icons</h3>
    * <p> A tab icon can be set in two ways - either by adding an <code>img</code> element inside the <code>a</code> element, or by setting an <code>icon</code> data attribute to the <code>a</code> element.
    * Kendo mobile TabStrip comes out of the box with several ready to use icons:</p>
    *
    * <ul id="icon-list">
    *   <li title=".km-about"><span class="km-icon km-about"></span>about</li>
    *   <li title=".km-action"><span class="km-icon km-action"></span>action</li>
    *   <li title=".km-add"><span class="km-icon km-add"></span>add</li>
    *   <li title=".km-bookmarks"><span class="km-icon km-bookmarks"></span>bookmarks</li>
    *   <li title=".km-camera"><span class="km-icon km-camera"></span>camera</li>
    *   <li title=".km-cart"><span class="km-icon km-cart"></span>cart</li>
    *   <li title=".km-compose"><span class="km-icon km-compose"></span>compose</li>
    *   <li title=".km-contacts"><span class="km-icon km-contacts"></span>contacts</li>
    *   <li title=".km-details"><span class="km-icon km-details"></span>details</li>
    *   <li title=".km-downloads"><span class="km-icon km-downloads"></span>downloads</li>
    *   <li title=".km-fastforward"><span class="km-icon km-fastforward"></span>fastforward</li>
    *   <li title=".km-favorites"><span class="km-icon km-favorites"></span>favorites</li>
    *   <li title=".km-featured"><span class="km-icon km-featured"></span>featured</li>
    *   <li title=".km-featured"><span class="km-icon km-toprated"></span>toprated</li>
    *   <li title=".km-globe"><span class="km-icon km-globe"></span>globe</li>
    *   <li title=".km-history"><span class="km-icon km-history"></span>history</li>
    *   <li title=".km-home"><span class="km-icon km-home"></span>home</li>
    *   <li title=".km-info"><span class="km-icon km-info"></span>info</li>
    *   <li title=".km-more"><span class="km-icon km-more"></span>more</li>
    *   <li title=".km-mostrecent"><span class="km-icon km-mostrecent"></span>mostrecent</li>
    *   <li title=".km-mostviewed"><span class="km-icon km-mostviewed"></span>mostviewed</li>
    *   <li title=".km-organize"><span class="km-icon km-organize"></span>organize</li>
    *   <li title=".km-pause"><span class="km-icon km-pause"></span>pause</li>
    *   <li title=".km-play"><span class="km-icon km-play"></span>play</li>
    *   <li title=".km-recents"><span class="km-icon km-recents"></span>recents</li>
    *   <li title=".km-refresh"><span class="km-icon km-refresh"></span>refresh</li>
    *   <li title=".km-reply"><span class="km-icon km-reply"></span>reply</li>
    *   <li title=".km-rewind"><span class="km-icon km-rewind"></span>rewind</li>
    *   <li title=".km-search"><span class="km-icon km-search"></span>search</li>
    *   <li title=".km-settings"><span class="km-icon km-settings"></span>settings</li>
    *   <li title=".km-share"><span class="km-icon km-share"></span>share</li>
    *   <li title=".km-stop"><span class="km-icon km-stop"></span>stop</li>
    *   <li title=".km-trash"><span class="km-icon km-trash"></span>trash</li>
    * </ul>
    *
    * Additional icons may be added by defining the respective CSS tab class. If the <code>icon</code> data attribute is set to <code>custom</code>,
    * the tab will receive <code>km-custom</code> CSS class.
    * @exampleTitle Define custom tabstrip icon.
    * @example
    * <style>
    * .km-custom {
    *   background-image: url("foo.jpg");
    * }
    * </style>
    *
    * <div data-role="tabstrip">
    *   <a href="#index" data-icon="custom">Home</a>
    * </div>
    */
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Widget = ui.Widget,
        support = kendo.support,
        ACTIVE_STATE_CLASS = "km-state-active",
        SELECT = "select",
        proxy = $.proxy;

    var TabStrip = Widget.extend(/** @lends kendo.mobile.ui.TabStrip.prototype */{
        /**
        * @constructs
        * @extends kendo.ui.Widget
        * @param {DomElement} element DOM element.
        * @param {Object} options Configuration options.
        * @option {Number} [selectedIndex] <0> The index of the initially selected tab.
        */
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.element.addClass("km-tabstrip");

            that._releaseProxy = proxy(that._release, that);

            that.element.find("a")
                            .each(that._buildButton)
                            .bind(support.mousedown, that._releaseProxy)
                            .eq(that.options.selectedIndex).addClass(ACTIVE_STATE_CLASS);
        },

        events: [
            /**
             * Fires when tab is selected.
             * @name kendo.mobile.ui.TabStrip#select
             * @event
             * @param {Event} e
             * @param {jQueryObject} e.item The selected tab
             */
            SELECT
        ],

        /**
         * Set the mobile TabStrip active tab to the tab with the specified url.
         * @param {String} url The url of the tab.
         *
         * @example
         * <div data-role="tabstrip" id="tabstrip"> <a href="#foo">Foo</a> </div>
         *
         * <script>
         *     $(function() {
         *         $("#tabstrip").data("kendoMobileTabStrip").switchTo("#foo");
         *     });
         * </script>
         */
        switchTo: function(url) {
            this._setActiveItem(this.element.find('a[href$="' + url + '"]'));
        },

        /**
         * Get the currently selected tab DOM element.
         * @returns {jQueryObject} the currently selected tab DOM element.
         */
        currentItem: function() {
            return this.element.children("." + ACTIVE_STATE_CLASS);
        },

        _release: function(e) {
            if (e.which > 1) {
                return;
            }

            var that = this,
                item = $(e.currentTarget);

            if (item[0] === that.currentItem()[0]) {
                return;
            }

            if (that.trigger(SELECT, {item: item})) {
                e.preventDefault();
            } else {
                that._setActiveItem(item);
            }
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
                    iconSpan.addClass("km-" + icon);
                }
            }
        },

        viewShow: function(view) {
            var that = this;
            that.switchTo(view.id);
        },

        options: {
            name: "TabStrip",
            selectedIndex: 0,
            enable: true
        }
    });

    ui.plugin(TabStrip);
})(jQuery);
