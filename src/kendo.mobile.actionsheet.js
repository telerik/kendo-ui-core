(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Shim = ui.Shim,
        Widget = ui.Widget,
        BUTTONS = "li>a",
        CONTEXT_DATA = "actionsheetContext",
        WRAP = '<div class="km-actionsheet-wrapper" />',
        cancelTemplate = kendo.template('<li><a href="\\#" class="km-actionsheet-cancel">#:cancel#</a></li>');

    /**
     * The mobile ActionSheet widget displays a set of choices related to a task the user initiates.
     * <h3>Getting Started</h3>
     * <p>The Kendo mobile Application will automatically initialize the mobile ActionSheet for every <code>ul</code> element with <code>role</code>
     * data attribute set to <code>actionsheet</code> present in the views/layouts markup.
     * Alternatively, it can be initialized using a jQuery selector. The actionsheet element should contain one or more <code>li</code> elements, which should contian an <code>a</code> element.</p>
     *
     * @exampleTitle Define an ActionSheet
     * @example
     * <ul data-role="actionsheet">
     *   <li><a data-action="foo">Foo</a></li>
     *   <li><a data-action="bar">Bar</a></li>
     * </ul>
     *
     * @section
     * <p>On iOS, the ActionSheet is modal, and clicking on the background does not close it. A 'Cancel' action is
     * automatically added to the bottom of the actions.</p>
     * <span style="color:red">TODO: Android</span>
     *
     * <h3>Opening ActionSheet</h3>
     * <p>The widget can be open when any mobile navigational widget (listview, button, tabstrip, etc.) is clicked or touched.
     * To associate the widget with the ActionSheet, set <code>data-rel="actionsheet"</code> and a href attribute pointing to the ActionSheet's element id.</p>
     *
     * @exampleTitle mobile Button with associated ActionSheet
     * @example
     * <a data-role="button" data-rel="actionsheet" href="#foo">Foo...</a>
     * <ul data-role="actionsheet" id="foo">
     *   <li><a data-action="foo">Foo</a></li>
     *   <li><a data-action="bar">Bar</a></li>
     * </ul>
     *
     * <h3>Executing Actions</h3>
     * <p>Each link from the ActionSheet should have a <code>data-action</code> attribute, specifying the callback method to be executed when selected.
     * The callback can be either a function, or a method from an object in the global scope.</p>
     *
     * <p>The callback accepts a object with two fields - <code>target</code> and (optional) <code>context</code>. The
     * <code>target</code> points to the DOM element which has opened the Widget. The <code>context</code> field points
     * to the optional <code>actionsheet-context</code> attribute of the opening element.</p>
     *
     * <p>After the method has been executed, the ActionSheet closes automatically</p>.
     *
     * @exampleTitle Mobile ActionSheet actions
     * @example
     * <a id="myButton" data-role="button" data-actionsheet-context="1" data-rel="actionsheet" href="#foo">Foo...</a>
     * <ul data-role="actionsheet" id="foo">
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
     *          },
     *      }
     * </script>
     *
     */
    var ActionSheet = Widget.extend(/** @lends kendo.mobile.ui.ActionSheet.prototype */{
        /**
         * @constructs
         * @extends kendo.mobile.ui.Widget
         * @param {DomElement} element DOM element.
         * @param {Object} options Configuration options.
         * @option {String} [cancel] <Cancel> The text of the cancel button.
         */
        init: function(element, options) {
            var that = this,
                wrapper;

            Widget.fn.init.call(that, element, options);

            that.element.wrap(WRAP)
                .append(cancelTemplate({cancel: that.options.cancel}))
                .on(kendo.support.mouseup, BUTTONS, $.proxy(that._click, that));

            wrapper = that.element.parent();

            that.wrapper = wrapper;
            that.shim = new Shim(that.wrapper);
        },

        options: {
            name: "ActionSheet",
            cancel: 'Cancel'
        },

        /**
         * Open the ActionSheet
         * @param {jQueryObject} target The target of the ActionSheet, available in the callback methods.
         */
        open: function(target) {
            this.target = $(target);
            this.shim.show();
        },

        /**
         * Close the ActionSheet
         */
        close: function() {
            this.shim.hide();
        },

        _click: function(e) {
            var target = this.target;
            if (e.originalEvent && e.originalEvent.defaultPrevented) {
                return;
            }

            var action = $(e.currentTarget).data("action");

            if (action) {
                kendo.getter(action)(window)({
                    target: target,
                    context: target.data(CONTEXT_DATA)
                });
            }

            this.close();
        }
    });

    ui.plugin(ActionSheet);
})(jQuery);
