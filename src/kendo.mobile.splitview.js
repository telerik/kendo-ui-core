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
     * @section
     * <h3>Customizing appearance</h3>
     * <p style="color: red">TODO:</p>
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
