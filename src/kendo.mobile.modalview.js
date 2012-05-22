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
     * <p>The Kendo modalView is used to present self-contained functionality in the context of the current task.  </p>
     *
     * <h3>Getting Started</h3>
     * <p>The Kendo mobile Application will automatically initialize a mobile ModalView widget for every <code>div</code> element with <code>role</code> data attribute set to <code>modalview</code> present in the views/layouts markup.
     * Alternatively, it can be initialized using jQuery plugin syntax. The modalview element may contain optional header and/or footer. A mobile scroller is automatically initialized around the contents of the element.</p>
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
     */
    var ModalView = Widget.extend(/** @lends kendo.mobile.ui.ModalView.prototype */{
        /**
         * @constructs
         * @extends kendo.mobile.ui.Widget
         * @param {DomElement} element DOM element.
         * @param {Object} options Configuration options.
         */
        init: function(element, options) {
            var that = this,
                os = kendo.support.mobileOS;

            Widget.fn.init.call(that, element, options);

            element = that.element;

            element.addClass("km-modalview").wrap(WRAP);

            that.wrapper = element.parent();

            that.shim = new Shim(that.wrapper, {modal: that.options.modal, position: "center center", align: "center center", effect: "fade:in"});
        },

        events: [
            /**
             * Fires when the ModalView is shown.
             * @name kendo.mobile.ui.ModalView#open
             * @event
             * @param {Event} e
             * @param {jQueryObject} e.target The invocation target of the ModalView.
             */
            OPEN
        ],

        options: {
            name: "ModalView",
            modal: true
        },

        /**
         * Open the ModalView
         * @param {jQueryObject} target (optional) The target of the ModalView
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
        },

    });

    ui.plugin(ModalView);
})(jQuery);
