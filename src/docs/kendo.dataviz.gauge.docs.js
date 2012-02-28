(function () {

    /**
     * @name kendo.dataviz.ui.Gauge.Description
     *
     * @section
     * <p>
     * The Gauge...
     * </p>
     */
     var GaugeDocs = /** @lends kendo.dataviz.ui.Gauge.prototype */ {
        /**
         * @constructs
         * @extends kendo.ui.Widget
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {Boolean} [transitions] <true>
         * A value indicating if transition animations should be played.
         */
        init: function() {
        },

        /**
         * Redraws the gauge.
         * @example
         * var gauge = $("#gauge").data("kendoGauge");
         * gauge.refresh();
         */
        redraw: function() { },

        /**
         * Returns the SVG representation of the current gauge.
         * The returned string is a self-contained SVG document
         * that can be used as is or converted to other formats
         * using tools like <a href="http://inkscape.org/">Inkscape</a> and
         * <a href="http://www.imagemagick.org/">ImageMagick</a>.
         * Both programs provide command-line interface
         * suitable for backend processing.
         * @example
         * var gauge = $("#gauge").data("kendoGauge");
         * var svgText = gauge.svg();
         */
        svg: function() { }
    };

})(jQuery);
