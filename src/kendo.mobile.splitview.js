(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Widget = ui.Widget,
        View = ui.View;

    /**
     * @name kendo.mobile.ui.SplitView.Description
     * @section
     * <p>The mobile SplitView is a tablet-specific view that consists of two or more <strong>mobile Pane widgets</strong>. The
     * Application automatically instantiates a mobile SplitView for each element with a <code>role</code> data attribute set
     * to <b>splitview</b>. </p>
     * <p> <strong>Important:</strong> unlike most widgets, the splitview element <strong>should not be nested</strong>
     * in a view, but should be put as an immediate child of the mobile application element.</p>
     *
     * @section
     * <h3>Customizing appearance</h3>
     * By default Kendo UI Mobile is configured to show a horizontal SplitView with smaller left and bigger right pane in 1:2 proportion.
     * In order to resize one of the panes, you can use CSS to set its width or adjust the flexibility of the flex boxes.
     *
     * @exampleTitle Set pane width to 300px or change the proportions to 1:3
     * @example
     * <div data-role="splitview" id="main">
     *   <div data-role="pane" id="side-pane">
     *     <div data-role="view">
     *        <a data-role="button" href="#bar" data-target="main-pane">Bar (main pane)</a>
     *        <a data-role="button" href="#baz" data-target="_top">Baz (application)</a>
     *     </div>
     *   </div>
     *   <div data-role="pane" id="main-pane">
     *     <div data-role="view" id="foo">
     *        Foo
     *     </div>
     *     <div data-role="view" id="bar">
     *        Bar
     *     </div>
     *   </div>
     * </div>
     *
     * <style>
     *     #side-pane { width: 300px; }
     * </style>
     * or
     * <style>
     *     #main-pane { -webkit-box-flex: 3 }
     * </style>
     *
     * @section
     * Additionally you can split your view to more panes by adding them directly. You can also make them stack vertically
     * by adding a simple CSS rule:
     *
     *
     */
    var SplitView = View.extend(/** @lends kendo.mobile.ui.SplitView.prototype */{
        /**
         * @constructs
         * @extends kendo.mobile.ui.Widget
         * @param {DomElement} element DOM element
         */
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);
            $.extend(that, options);
            that._layout();

            that.element.children(kendo.roleSelector("pane")).each(function() {
                kendo.initWidget(this, {}, kendo.mobile.ui).navigate("");
            });
        },

        options: {
            name: "SplitView"
        },

        // Implement view interface
        _layout: function() {
            var that = this,
                element = that.element;

            element.data("kendoView", that).addClass("km-view km-splitview");

            that.transition = element.data(kendo.ns + "transition");
            $.extend(that, { header: [], footer: [], content: element });
        },

        showStart: function() {
            var that = this;
            that.element.css("display", "");
            that.trigger("show", {view: that});
        }
    });

    ui.plugin(SplitView);
})(jQuery);
