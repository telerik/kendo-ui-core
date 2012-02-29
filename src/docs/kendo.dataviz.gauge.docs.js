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
         * @option {Object} [scale.labels] Configures the scale labels.
         * @option {String} [scale.labels.color] The text color of the labels.
         * Any valid CSS color string will work here, including hex and rgb.
         * @option {String} [scale.labels.background] The background color of the labels.
         * Any valid CSS color string will work here, including hex and rgb
         * @option {String} [scale.labels.font] <"12px Arial,Helvetica,sans-serif">
         * The font style of the labels.
         * @option {Boolean} [scale.labels.visible] <true> The visibility of the labels.
         * @option {Number|Object} [scale.labels.margin] <0> The margin of the labels.
         * @option {Number | Object} [scale.labels.padding] <0> The padding of the labels.
         * @option {Object} [scale.labels.border] The border of the labels.
         * @option {Number} [scale.labels.border.width] <0> The width of the border.
         * @option {String} [scale.labels.border.color] <"black">
         * The color of the border. Any valid CSS color string will work here, including hex and rgb.
         * @option {String} [scale.labels.border.dashType] <"solid">
         * The dash type of the border.
         * <div class="details-list">
         *     <dl>
         *         <dt>
         *              <code>"solid"</code>
         *         </dt>
         *         <dd>
         *              Specifies a solid line.
         *         </dd>
         *         <dt>
         *              <code>"dot"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of dots.
         *         </dd>
         *         <dt>
         *              <code>"dash"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of dashes.
         *         </dd>
         *         <dt>
         *              <code>"longDash"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of a repeating pattern of long-dash.
         *         </dd>
         *         <dt>
         *              <code>"dashDot"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of a repeating pattern of dash-dot.
         *         </dd>
         *         <dt>
         *              <code>"longDashDot"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of a repeating pattern of long-dash-dot.
         *         </dd>
         *         <dt>
         *              <code>"longDashDotDot"</code>
         *         </dt>
         *         <dd>
         *              Specifies a line consisting of a repeating pattern of long-dash-dot-dot.
         *         </dd>
         *    </dl>
         * </div>
         * @option {String/Function} [scale.labels.template] The label template.
         * Template variables:
         * <ul>
         *     <li><strong>value</strong> - the value</li>
         * </ul>
         * _example
         * // chart intialization
         * $("#gauge").kendoGauge({
         *      scale: {
         *          labels: {
         *              // labels template
         *              template: "#= value #%"
         *          }
         *      }
         * });
         * @option {String} [scale.labels.format] The format of the labels.
         * _example
         * $("#gauge").kendoGauge({
         *     scale: {
         *        labels: {
         *            // set the format to currency
         *            format: "{0:C}"
         *        }
         *     }
         * });
         * @option {Object} [scale.majorTicks] Configures the scale major ticks.
         * @option {Number} [scale.majorTicks.size] The major tick size.
         * This is the length of the line in pixels that is drawn to indicate the tick on the scale.
         * @option {Number} [scale.majorTicks.width] <0.5> The width of the major ticks.
         * @option {String} [scale.majorTicks.color] The color of the major ticks.
         * @option {Object} [scale.minorTicks] Configures the scale minor ticks.
         * @option {Number} [scale.minorTicks.size] The minor tick size.
         * This is the length of the line in pixels that is drawn to indicate the tick on the scale.
         * @option {Number} [scale.minorTicks.width] <0.5> The width of the minor ticks.
         * @option {String} [scale.minorTicks.color] The color of the minor ticks.
         * @option {Number} [scale.majorUnit] <20> The interval between major divisions.
         * @option {Number} [scale.minorUnit] <5> The interval between minor divisions.
         * @option {number} [scale.startAngle] <-30> The start angle of the gauge.
         * @option {number} [scale.endAngle] <210> The end angle of the gauge.
         * @option {Number} [scale.min] <0> The minimum value of the axis.
         * @option {Number} [scale.max] <100> The maximum value of the axis.
         *
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
