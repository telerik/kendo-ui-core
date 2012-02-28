(function () {

    /**
     * @name kendo.dataviz.ui.Gauge.Description
     *
     * @section
     * <p>
     * @section
     * <p>
     * The Gauge widget uses modern browser technologies to render dynamic data.
     * All graphics are rendered on the client using SVG with a fallback to VML for legacy browsers.
     * </p>
     *
     * <p>
     * Supported gauge types:
     * </p>
     * <ul>
     *     <li>Radial</li>
     * </ul>
     *
     * <p>
     * Please visit the Kendo UI Road Map for additional information about
     * new Gauge types and features.
     * </p>
     *
     * <h3>
     * Getting Started
     * </h3>
     * @exampleTitle
     * 1. Create a simple HTML div (optionally set a height and width with CSS)
     * @example
     * <div id="gauge"></div>
     *
     * @exampleTitle
     * 2. Initialize the Kendo UI Gauge with default configuration
     * @example
     *    $(document).ready(function() {
     *        $("#gauge").kendoGauge();
     *    });
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
