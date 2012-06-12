(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Shim = ui.Shim,
        Widget = ui.Widget,
        OPEN = "open",
        WRAP = '<div class="km-modalview-wrapper" />';

    /**
     * @name kendo.mobile.ui.ModalView.Description
     * @section
     * <p>The Kendo ModalView is used to present self-contained functionality in the context of the current task.  </p>
     *
     * <h3>Getting Started</h3>
     * <p>The Kendo mobile Application will automatically initialize a mobile ModalView widget for every <code>div</code> element with <code>role</code> data attribute set to <code>modalview</code> present in the views/layouts markup.
     * Alternatively, it can be initialized using jQuery plugin syntax. The ModalView element may contain optional header and/or footer. A mobile scroller is automatically initialized around the contents of the element.</p>
     *
     * @exampleTitle ModalView with header and footer
     * @example
     * <div data-role="view">
     *  <a href="#foo" data-rel="modalview">Foo</a>
     *  <div data-role="modalview" id="foo">
     *    <div data-role="header">
     *        <div data-role="navbar">
     *            <a data-align="right" data-role="button">Close</a>
     *        </div>
     *    </div>
     *
     *    <ul data-role="listview">
     *      <li>Foo</li>
     *    </ul>
     *
     *    <div data-role="footer">
     *       <div data-role="navbar">
     *           <a data-align="right" data-role="button">Details</a>
     *       </div>
     *    </div>
     *  </div>
     * </div>
     *
     *
     * @section
     * <h3>Opening a ModalView</h3>
     * <p>The widget can be open when any mobile navigational widget (listview, button, tabstrip, etc.) is tapped.
     * To do so, the navigational widget should have <code>data-rel="modalview"</code> and <code>href</code> attribute pointing to the ModalView's element <code>id</code> set (prefixed with <code>#</code>, like an anchor).</p>
     *
     * @exampleTitle Button, which opens a ModalView
     * @example
     * <div data-role="view">
     *  <a href="#foo" data-rel="modalview">Foo</a>
     *  <div data-role="modalview" id="foo">
     *   ...
     *  </div>
     * </div>
     *
     * @exampleTitle Button, which closes a ModalView
     * @example
     * <div data-role="view">
     *  <a href="#foo" data-rel="modalview">Foo</a>
     *  <div data-role="modalview" id="foo">
     *    <div data-role="header">
     *        <div data-role="navbar">
     *            <a data-align="right" data-click="closeModalView" data-role="button">Close</a>
     *        </div>
     *    </div>
     *
     *   Foo
     *  </div>
     * </div>
     *
     * <script>
     * function closeModalView(e) {
     *  // find the closest modal view, relative to the button element.
     *  var modalView = e.sender.element.closest("[data-role=modalview]").data("kendoMobileModalView");
     *  modalView.close();
     * }
     * </script>
     */
    var ModalView = ui.View.extend(/** @lends kendo.mobile.ui.ModalView.prototype */{
        /**
         * @constructs
         * @extends kendo.mobile.ui.Widget
         * @param {Element} element DOM element.
         * @param {Object} options Configuration options.
         * @option {Number} [width] The width of the ModalView container in pixels. If not set, the element style is used.
         * @option {Number} [height] The height of the ModalView container in pixels. If not set, the element style is used.
         * @option {Boolean} [modal] <true> When set to false, the ModalView will close when the user taps outside of its element.
         */
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;

            element.addClass("km-modalview").wrap(WRAP);

            that.wrapper = element.parent().css({
                width: options.width || element[0].style.width || 300,
                height: options.height || element[0].style.height || 300
            });
            element.css({ width: "", height: "" });

            that.shim = new Shim(that.wrapper, {
                modal: options.modal,
                position: "center center",
                align: "center center",
                effect: "fade:in"
            });

            that._layout();
            that._scroller();
        },

        events: [
            /**
             * Fires when the ModalView is shown.
             * @name kendo.mobile.ui.ModalView#open
             * @event
             * @param {Event} e
             * @param {jQuery} e.target The invocation target of the ModalView.
             * @example
             * <div data-role="view">
             *  <a href="#foo" data-rel="modalview">Foo</a>
             *  <div data-role="modalview" id="foo" data-open="logTarget">
             *   Foo
             *  </div>
             * </div>
             *
             * <script>
             * function logTarget(e) {
             *   console.log(e.target); // <a href="#foo" ...
             * }
             * </script>
             *
             */
            OPEN
        ],

        options: {
            name: "ModalView",
            modal: true
        },

        /**
         * Open the ModalView
         * @param {jQuery} target (optional) The target of the ModalView
         */
        open: function(target) {
            var that = this;
            that.trigger(OPEN);
            that.target = $(target);
            that.shim.show();
        },

        openFor: function(target) {
            var that = this;
            that.target = target;
            that.trigger(OPEN, { target: that.target });
            that.shim.show();
        },

        /**
         * Close the ModalView
         */
        close: function() {
            this.shim.hide();
        }
    });

    ui.plugin(ModalView);
})(jQuery);
