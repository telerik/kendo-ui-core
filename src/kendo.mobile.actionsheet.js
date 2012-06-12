(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Shim = ui.Shim,
        Popup = ui.Popup,
        Widget = ui.Widget,
        OPEN = "open",
        BUTTONS = "li>a",
        CONTEXT_DATA = "actionsheetContext",
        WRAP = '<div class="km-actionsheet-wrapper" />',
        cancelTemplate = kendo.template('<li class="km-actionsheet-cancel"><a href="\\#">#:cancel#</a></li>');

    /**
     * @name kendo.mobile.ui.ActionSheet.Description
     * @section
     * <p>The mobile ActionSheet widget displays a set of choices related to a task the user initiates.</p>
     * <h3>Getting Started</h3>
     * <p>The mobile Application will automatically initialize a mobile ActionSheet widget for every <code>ul</code> element with <code>role</code>
     * data attribute set to <code>actionsheet</code> present in the views/layouts' markup.
     * Alternatively, it can be initialized using jQuery plugin syntax in the containing mobile View <strong>init event handler</strong>.
     * The actionsheet element should contain one or more <code>li</code> elements, each with an <code>a</code> element inside. A 'Cancel' action is automatically added to the bottom of the actions.</p>
     *
     * @exampleTitle Define an ActionSheet with two buttons
     * @example
     * <ul data-role="actionsheet">
     *   <li><a data-action="foo">Foo</a></li>
     *   <li><a data-action="bar">Bar</a></li>
     * </ul>
     *
     * @section
     * <p>In iOS, the ActionSheet slides in from the bottom of the screen; It also acts like a modal dialog - tapping the background does not close it. </p>
     * <p>In Android and Blackberry, the available actions are centered in the middle of the screen, and tapping the background closes it.</p>
     *
     * <h3>ActionSheet in Tablets </h3>
     * <p>If a tablet is detected, the ActionSheet widget will be displayed in a PopOver. The sizing and the direction of the popover may be customized
     * through the <code>popup</code> configuration option.</p>
     *
     * <h3>Opening an ActionSheet</h3>
     * <p>The widget can be open when any mobile navigational widget (listview link item, button, tabstrip, etc.) is tapped.
     * To do so, set <code>data-rel="actionsheet"</code> attribute and a <code>href</code> attribute equal to the ActionSheet's element <code>id</code> (prefixed with <code>#</code>, like an anchor).</p>
     *
     * @exampleTitle Mobile Button opening ActionSheet
     * @example
     * <a data-role="button" data-rel="actionsheet" href="#replyActionSheet">Reply</a>
     * <ul data-role="actionsheet" id="replyActionSheet">
     *   <li><a data-action="foo">Reply</a></li>
     *   <li><a data-action="foo">Reply to All</a></li>
     *   <li><a data-action="bar">Forward</a></li>
     * </ul>
     *
     * @section
     * <h3>Executing Actions</h3>
     * <p>Each link in the ActionSheet should have a <code>data-action</code> attribute set, specifying the callback method to be executed when the user taps it.
     * The callback can be either a function, or a method of a JavaScript object in the global scope.</p>
     *
     * <p>The callback receives a object with two fields: <code>target</code> and (optional) <code>context</code> as a
     * parameter. The <code>target</code> holds a reference to the DOM element which has opened the ActionSheet. The <code>context</code> contains
     * to the optional <code>actionsheet-context</code> data attribute of the opening DOM element.</p>
     *
     * <p>After the callback has been executed, the ActionSheet closes automatically.</p>
     *
     * @exampleTitle Mobile ActionSheet actions and context
     * @example
     * <a id="myButton"
     *  data-role="button"
     *  data-actionsheet-context="1"
     *  data-rel="actionsheet" href="#myActionSheet">Foo...</a>
     *
     * <ul data-role="actionsheet" id="myActionSheet">
     *   <li><a data-action="foo">Foo</a></li>
     *   <li><a data-action="bar.baz">Bar</a></li>
     * </ul>
     * <script>
     *      function foo(e) {
     *          e.context; // 1
     *          e.target; // $("#myButton")
     *      }
     *
     *      var bar = {
     *          baz: function(e) {
     *              e.context; // 1
     *              e.target; // $("#myButton")
     *          }
     *      }
     * </script>
     *
     */
    var ActionSheet = Widget.extend(/** @lends kendo.mobile.ui.ActionSheet.prototype */{
        /**
         * @constructs
         * @extends kendo.mobile.ui.Widget
         * @param {Element} element DOM element.
         * @param {Object} options Configuration options.
         * @option {String} [cancel] <Cancel> The text of the cancel button.
         * @option {Object} [popup] The popup configuration options (tablet only).
         * @option {Number | String} [popup.width] <240> The width of the popup in pixels.
         * @option {Number | String} [popup.height] <auto> The height of the popup in pixels.
         * @option {Number | String} [popup.direction] <down> The direction to which the popup will expand, relative to the target that opened it.
         */
        init: function(element, options) {
            var that = this,
                os = kendo.support.mobileOS,
                ShimClass = os.tablet ? Popup : Shim,
                wrapper;

            Widget.fn.init.call(that, element, options);

            element = that.element;

            element
                .addClass("km-actionsheet")
                .append(cancelTemplate({cancel: that.options.cancel}))
                .wrap(WRAP)
                .on(kendo.support.mouseup, BUTTONS, $.proxy(that._click, that))
                .on("click", BUTTONS, kendo.preventDefault);

            wrapper = element.parent();

            that.wrapper = wrapper;
            that.shim = new ShimClass(that.wrapper, $.extend({modal: !(os.android || os.meego)}, that.options.popup) );

            kendo.notify(that, ui);
        },

        events: [
            /**
             * Fires when the ActionSheet is opened.
             * @name kendo.mobile.ui.ActionSheet#open
             * @event
             * @param {Event} e
             * @param {jQuery} e.target The invocation target of the ActionSheet.
             * @param {jQuery} e.context The defined ActionSheet context.
             */
            OPEN
        ],

        options: {
            name: "ActionSheet",
            cancel: "Cancel",
            popup: { height: "auto" }
        },

        /**
         * Open the ActionSheet.
         * @param {jQuery} target (optional) The target of the ActionSheet, available in the callback methods.
         * @param {Object} context (optional) The context of the ActionSheet, available in the callback methods.
         */
        open: function(target, context) {
            var that = this;
            that.target = $(target);
            that.context = context;
            that.shim.show();
        },


        /**
         * Close the ActionSheet.
         */
        close: function() {
            this.context = this.target = null;
            this.shim.hide();
        },

        /** @ignore */
        openFor: function(target) {
            var that = this;
            that.target = target;
            that.context = target.data(CONTEXT_DATA);
            that.trigger(OPEN, { target: that.target, context: that.context });
            that.shim.show(target);
        },

        _click: function(e) {
            if (e.isDefaultPrevented()) {
                return;
            }

            var action = $(e.currentTarget).data("action");

            if (action) {
                kendo.getter(action)(window)({
                    target: this.target,
                    context: this.context
                });
            }

            e.preventDefault();
            this.close();
        }
    });

    ui.plugin(ActionSheet);
})(jQuery);
