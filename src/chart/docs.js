(function () {

    /**
     * @name kendo.ui.Chart.Description
     *
     * @section
     * <p>
     * The Chart widget uses modern browser technologies to render high-quality
     * data visualizations in the browser. Rather than generating images
     * on a server, Chart graphics are rendered in the browser using
     * SVG (scalable vector graphics), with a fallback to
     * VML (vector markup language) for older browsers.
     * </p>
     *
     * <p>
     * Supported chart types:
     * </p>
     * <ul>
     *     <li>Bar</li>
     *     <li>Column</li>
     *     <li>Line</li>
     *     <li>Pie</li>
     * </ul>
     *
     * <p>
     * Please visit the Kendo UI Road Map for additional information about
     * new Chart types and features.
     * </p>
     *
     * <h3>
     * Getting Started
     * </h3>
     * @exampleTitle
     * 1. Create a simple HTML div (optionally set a height and width with CSS)
     * @example
     * <div id="chart"></div>
     *
     * @exampleTitle
     * 2. Initialize the Kendo UI Chart with configuration and data
     * @example
     *    $(document).ready(function() {
     *        $("#chart").kendoChart({
     *            title: {
     *                text: "My Chart Title"
     *            },
     *            series: [
     *                {
     *                    name: "Series 1",
     *                    data: [200, 450, 300, 125]
     *                }
     *            ],
     *            categoryAxis: {
     *                categories: [2000, 2001, 2002, 2003]
     *            }
     *        });
     *    });
     * @section
     * <p>
     * The basic configuration requires series data (Y-axis values) and
     * categories (X-axis values). A chart title can also optionally be defined.
     * The default chart type is column (vertical bars).
     * </p>
     *
     * <h3>
     * Binding to Data
     * </h3>
     * <p>
     * A chart can be bound to both local and remote data.
     * Rather than directly specifying an Array of values in the Chart configuration,
     * the Chart DataSource property is used to bind to an Array or to
     * a remote data service with the Kendo DataSource component.
     * </p>
     * @exampleTitle
     * Binding a line chart to local JavaScript object array
     * @example
     * var salesData = [{
     *     employee: "Joe Smith",
     *     sales: 2000
     * }, {
     *     employee: "Jane Smith",
     *     sales: 2250
     * }, {
     *     employee: "Will Roberts",
     *     sales: 1550
     * }]
     *
     * $(document).ready(function() {
     *     $("#chart").kendoChart({
     *         title: {
     *             text: "Employee Sales"
     *         },
     *         dataSource:{
     *             data: salesData
     *         },
     *         series:[{
     *             type: "line",
     *             field: "sales",
     *             name: "Sales in Units"
     *         }],
     *         categoryAxis:{
     *             field: "employee"
     *         }
     *     });
     * });
     *
     * @exampleTitle
     * Binding to remote JSON data with multiple series
     * @example
     * $(document).ready(function(){
     *     $("#chart").kendoChart({
     *         title: {
     *             text: "Division Sales"
     *         },
     *         dataSource:{
     *             transport:{
     *                 read:{
     *                     url: "company-sales.json",
     *                     dataType: "json"
     *                 }
     *             },
     *             sort: {
     *                 field: "year",
     *                 dir: "asc"
     *             }
     *         },
     *         series: [{
     *             field: "americaSales",
     *             name: "North America"
     *         }, {
     *             field: "asiaSales",
     *             name: "Asia"
     *         }, {
     *             field: "europeSales",
     *             name: "Europe"
     *         }],
     *         categoryAxis:{
     *             field: "year"
     *         },
     *         valueAxis: {
     *             majorUnit: 1000
     *         }
     *     });
     * });
     *
     * @section
     * <h3>
     * Configuring the Chart
     * </h3>
     * <p>
     * The Kendo UI Chart is highly configurable. With simple configuration settings,
     * you can format and display series labels, position the chart legend,
     * format and display tooltips, and change the chart type.
     * </p>
     * <p>
     * Refer to the Chart demos and configuration API for a complete reference.
     * </p>
     */
    var ChartDocs = /** @lends kendo.ui.Chart.prototype */ {
        /**
         * @constructs
         * @extends kendo.ui.Widget
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {String} [theme] Sets Chart theme. Available themes: hakama, blueOpal, black.
         * @option {Object} [dataSource] DataSource configuration or instance.
         * _example
         * $("#chart").kendoChart({
         *     dataSource: {
         *         transport: {
         *              read: "spain-electricity.json"
         *         }
         *     },
         *     series: [{
         *         field: "value"
         *     }],
         *     categoryAxis: {
         *         field: "year"
         *     }
         * });
         *
         * // Alternative configuraiton
         * var dataSource = new kendo.data.DataSource({
         *     transport: {
         *          read: "spain-electricity.json"
         *     }
         * });
         *
         * $("#chart").kendoChart({
         *     dataSource: dataSource,
         *     series: [{
         *         field: "value"
         *     }],
         *     categoryAxis: {
         *         field: "year"
         *     }
         * });
         * @option {Object} [title] The chart title configuration options.
         * @option {String} [title.text] The title of the chart.
         * @option {String} [title.font] <"16px Arial,Helvetica,sans-serif"> The font style of the title.
         * @option {String} [title.position] <"top"> The positions of the title.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <code>"top"</code>
         *         </dt>
         *         <dd>
         *              The title is positioned on the top.
         *         </dd>
         *         <dt>
         *              <code>"bottom"</code>
         *         </dt>
         *         <dd>
         *              The title is positioned on the bottom.
         *         </dd>
         *    </dl>
         * </div>
         * @option {String} [title.align] <"center"> The alignment of the title.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <code>"left"</code>
         *         </dt>
         *         <dd>
         *              The text is aligned to the left.
         *         </dd>
         *         <dt>
         *              <code>"center"</code>
         *         </dt>
         *         <dd>
         *              The text is aligned to the middle.
         *         </dd>
         *         <dt>
         *              <code>"right"</code>
         *         </dt>
         *         <dd>
         *              The text is aligned to the right.
         *         </dd>
         *    </dl>
         * </div>
         * @option {Boolean} [title.visible] <false> The visibility of the title.
         * @option {Number|Object} [title.margin] <5> The margin of the title.
         * _example
         * // sets the top, right, bottom and left margin to 3px.
         * margin: 3
         *
         * // sets the top and left margin to 1px
         * // margin right and bottom are with 5px (by default)
         * margin: { top: 1, left: 1 }
         * @option {Number|Object} [title.padding] <5> The padding of the title.
         * _example
         * // sets the top, right, bottom and left padding to 3px.
         * padding: 3
         *
         * // sets the top and left padding to 1px
         * // padding right and bottom are with 5px (by default)
         * padding: { top: 1, left: 1 }
         * @option {Object} [title.border] The border of the title.
         * @option {Number} [title.border.width] <0> The width of the border.
         * @option {String} [title.border.color] <"black"> The color of the border.
         * @option {String} [title.border.dashType] <"solid"> The dash type of the border.
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
         * @option {Object} [legend] The chart legend configuration options.
         * @option {String} [legend.font] <12px Arial,Helvetica,sans-serif> The font style of the legend.
         * @option {String} [legend.position] <right> The positions of the legend.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <code>"top"</code>
         *         </dt>
         *         <dd>
         *              The legend is positioned on the top.
         *         </dd>
         *         <dt>
         *              <code>"bottom"</code>
         *         </dt>
         *         <dd>
         *              The legend is positioned on the bottom.
         *         </dd>
         *         <dt>
         *              <code>"left"</code>
         *         </dt>
         *         <dd>
         *              The legend is positioned on the left.
         *         </dd>
         *         <dt>
         *              <code>"right"</code>
         *         </dt>
         *         <dd>
         *              The legend is positioned on the right.
         *         </dd>
         *         <dt>
         *              <code>"custom"</code>
         *         </dt>
         *         <dd>
         *              The legend is positioned using OffsetX and OffsetY.
         *         </dd>
         *    </dl>
         * </div>
         * @option {Number} [legend.offsetX] <0> The X offset from its position.
         * @option {Number} [legend.offsetY] <0> The Y offset from its position.
         * @option {Boolean} [legend.visible] <true> The visibility of the legend.
         * @option {Number|Object} [legend.margin] <10> The margin of the legend.
         * _example
         * // sets the top, right, bottom and left margin to 3px.
         * margin: 3
         *
         * // sets the top and left margin to 1px
         * // margin right and bottom are with 10px (by default)
         * margin: { top: 1, left: 1 }
         * @option {Number|Object} [legend.padding] <5> The padding of the legend.
         * _example
         * // sets the top, right, bottom and left padding to 3px.
         * padding: 3
         *
         * // sets the top and left padding to 1px
         * // padding right and bottom are with 5px (by default)
         * padding: { top: 1, left: 1 }
         * @option {Object} [legend.border] The border of the legend.
         * @option {Number} [legend.border.width] <0> The width of the border.
         * @option {String} [legend.border.color] <"black"> The color of the border.
         * @option {String} [legend.border.dashType] <"solid"> The dash type of the border.
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
         * @option {Object} [valueAxis] The value axis configuration options.
         * @option {Number} [valueAxis.axisCrossingValue] <0>
         * Value at which the first perpendicular axis crosses this axis.
         * @option {Number} [valueAxis.min] <0> The minimum value of the axis.
         * @option {Number} [valueAxis.max] <1> The maximum value of the axis.
         * @option {Number} [valueAxis.majorUnits] The interval between major divisions.
         * @option {Number} [valueAxis.minorTickSize] <3> The axis minor tick size.
         * @option {String} [valueAxis.minorTickType] <none> The minor tick type.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <code>"outside"</code>
         *         </dt>
         *         <dd>
         *              The tick is drawn on the outer side of the axis.
         *         </dd>
         *         <dt>
         *              <code>"none"</code>
         *         </dt>
         *         <dd>
         *              No tick is drawn.
         *         </dd>
         *    </dl>
         * </div>
         * @option {Number} [valueAxis.majorTickSize] <4> The axis major tick size.
         * @option {String} [valueAxis.majorTickType] <outside> The major tick type.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <code>"outside"</code>
         *         </dt>
         *         <dd>
         *              The tick is drawn on the outer side of the axis.
         *         </dd>
         *         <dt>
         *              <code>"none"</code>
         *         </dt>
         *         <dd>
         *              No tick is drawn.
         *         </dd>
         *    </dl>
         * </div>
         * @option {Object} [valueAxis.minorGridLines] Configures the minor grid lines.
         * @option {Number} [valueAxis.minorGridLines.width] <1> The width of the lines.
         * @option {String} [valueAxis.minorGridLines.color] <"black"> The color of the lines.
         * @option {Boolean} [valueAxis.minorGridLines.visible] <false> The visibility of the lines.
         * @option {Object} [valueAxis.majorGridLines] Configures the major grid lines.
         * @option {Number} [valueAxis.majorGridLines.width] <1> The width of the lines.
         * @option {String} [valueAxis.majorGridLines.color] <"black"> The color of the lines.
         * @option {Boolean} [valueAxis.majorGridLines.visible] <true> The visibility of the lines.
         * @option {Object} [valueAxis.line] Configures the axis line.
         * @option {Number} [valueAxis.line.width] <1> The width of the lines.
         * @option {String} [valueAxis.line.color] <"black"> The color of the lines.
         * @option {Boolean} [valueAxis.line.visible] <true> The visibility of the lines.
         * @option {Object} [valueAxis.labels] Configures the axis labels.
         * @option {String} [valueAxis.labels.font] <"12px Arial,Helvetica,sans-serif">
         * The font style of the labels.
         * @option {Boolean} [valueAxis.labels.visible] <true> The visibility of the labels.
         * @option {Number|Object} [valueAxis.labels.margin] <0> The margin of the labels.
         * _example
         * // sets the top, right, bottom and left margin to 3px.
         * margin: 3
         *
         * // sets the top and left margin to 1px
         * // margin right and bottom are with 0px (by default)
         * margin: { top: 1, left: 1 }
         * @option {Number|Object} [valueAxis.labels.padding] <0> The padding of the labels.
         * _example
         * // sets the top, right, bottom and left padding to 3px.
         * padding: 3
         *
         * // sets the top and left padding to 1px
         * // padding right and bottom are with 0px (by default)
         * padding: { top: 1, left: 1 }
         * @option {Object} [valueAxis.labels.border] The border of the labels.
         * @option {Number} [valueAxis.labels.border.width] <0> The width of the border.
         * @option {String} [valueAxis.labels.border.color] <"black"> The color of the border.
         * @option {String} [valueAxis.labels.border.dashType] <"black"> The dash type of the border.
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
         * @option {Number} [valueAxis.labels.rotation] <0> The rotation angle of the labels.
         * @option {String/Function} [valueAxis.labels.template] The label template.
         * Template variables:
         * <ul>
         *     <li><strong>value</strong> - the value</li>
         * </ul>
         * _example
         * // chart intialization
         * $("#chart").kendoChart({
         *      title: {
         *          text: "My Chart Title"
         *      },
         *      series: [
         *          {
         *              name: "Series 1",
         *              data: [200, 450, 300, 125]
         *          }
         *      ],
         *      categoryAxis: {
         *          categories: [2000, 2001, 2002, 2003]
         *      },
         *      valueAxis: {
         *          labels: {
         *              // label template
         *              template: "${ value }%"
         *          }
         *      }
         * });
         * @option {String} [valueAxis.labels.format] The format of the labels.
         * _example
         * //sets format of the labels
         * format: "{0:C}"
         * @option {Object} [categoryAxis] The value axis configuration options.
         * @option {Array} [categoryAxis.categories] Array of category names.
         * @option {String} [categoryAxis.field] The data field containing the category name.
         * @option {Number} [categoryAxis.axisCrossingValue] <0>
         * Category index at which the first perpendicular axis crosses this axis.
         * @option {Number} [categoryAxis.minorTickSize] <3> The axis minor tick size.
         * @option {String} [categoryAxis.minorTickType] <"none"> The axis minor tick size.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              "outside"
         *         </dt>
         *         <dd>
         *              The tick is drawn on the outer side of the axis.
         *         </dd>
         *         <dt>
         *              "none"
         *         </dt>
         *         <dd>
         *              No tick is drawn.
         *         </dd>
         *    </dl>
         * </div>
         * @option {Number} [categoryAxis.majorTickSize] <3> The axis major tick size.
         * @option {String} [categoryAxis.majorTickType] <"outside"> The axis major tick size.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              "outside"
         *         </dt>
         *         <dd>
         *              The tick is drawn on the outer side of the axis.
         *         </dd>
         *         <dt>
         *              "none"
         *         </dt>
         *         <dd>
         *              No tick is drawn.
         *         </dd>
         *    </dl>
         * </div>
         * @option {Object} [categoryAxis.minorGridLines] Configures the minor grid lines.
         * @option {Number} [categoryAxis.minorGridLines.width] <1> The width of the lines.
         * @option {String} [categoryAxis.minorGridLines.color] <"black"> The color of the lines.
         * @option {Boolean} [categoryAxis.minorGridLines.visible] <false> The visibility of the lines.
         * @option {Object} [categoryAxis.majorGridLines] Configures the major grid lines.
         * @option {Number} [categoryAxis.majorGridLines.width] <1> The width of the lines.
         * @option {String} [categoryAxis.majorGridLines.color] <"black"> The color of the lines.
         * @option {Boolean} [categoryAxis.majorGridLines.visible] <false> The visibility of the lines.
         * @option {Object} [categoryAxis.line] Configures the axis line.
         * @option {Number} [categoryAxis.line.width] <1> The width of the lines.
         * @option {String} [categoryAxis.line.color] <"black"> The color of the lines.
         * @option {Boolean} [categoryAxis.line.visible] <true> The visibility of the lines.
         * @option {Object} [categoryAxis.labels] Configures the axis labels.
         * @option {String} [categoryAxis.labels.font] <"12px Arial,Helvetica,sans-serif">
         * The font style of the labels.
         * @option {Boolean} [categoryAxis.labels.visible] <true> The visibility of the labels.
         * @option {Number|Object} [categoryAxis.labels.margin] <0> The margin of the labels.
         * _example
         * // sets the top, right, bottom and left margin to 3px.
         * margin: 3
         *
         * // sets the top and left margin to 1px
         * // margin right and bottom are with 0px (by default)
         * margin: { top: 1, left: 1 }
         * @option {Number|Object} [categoryAxis.labels.padding] <0> The padding of the labels.
         * _example
         * // sets the top, right, bottom and left padding to 3px.
         * padding: 3
         *
         * // sets the top and left padding to 1px
         * // padding right and bottom are with 0px (by default)
         * padding: { top: 1, left: 1 }
         * @option {Object} [categoryAxis.labels.border] The border of the labels.
         * @option {Number} [categoryAxis.labels.border.width] <0> The width of the border.
         * @option {String} [categoryAxis.labels.border.color] <"black"> The color of the border.
         * @option {String} [categoryAxis.labels.border.dashType] <"solid"> The dash type of the border.
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
         * @option {Number} [categoryAxis.labels.rotation] <0> The rotation angle of the labels.
         * @option {String/Function} [categoryAxis.labels.template] The label template.
         * Template variables:
         * <ul>
         *     <li><strong>value</strong> - the value</li>
         *     <li><strong>dataItem</strong> - the original data item used to construct the point.
         *         Will be null if binding to array.
         *     </li>
         * </ul>
         * _example
         * // chart intialization
         * $("#chart").kendoChart({
         *      title: {
         *          text: "My Chart Title"
         *      },
         *      series: [
         *          {
         *              name: "Series 1",
         *              data: [200, 450, 300, 125]
         *          }
         *      ],
         *      categoryAxis: {
         *          categories: [2000, 2001, 2002, 2003],
         *          labels: {
         *              // label template
         *              template: "Year: ${ value }"
         *          }
         *      }
         * });
         * @option {String} [categoryAxis.labels.format] The format of the labels.
         * _example
         * //sets format of the labels
         * format: "{0:C}"
         * @option {Object} [seriesDefaults] Default values for each series.
         * @option {Boolean} [seriesDefaults.stacked] <false>
         * A value indicating if the series should be stacked.
         * @option {Number} [seriesDefaults.gap] <1.5> The distance between category clusters.
         * @option {Number} [seriesDefaults.spacing] <0.4> Space between bars.
         * @option {Object} [seriesDefaults.labels] Configures the series data labels.
         * @option {String} [seriesDefaults.labels.font] <"12px Arial,Helvetica,sans-serif">
         * The font style of the labels.
         * @option {Boolean} [seriesDefaults.labels.visible] <false> The visibility of the labels.
         * @option {Number|Object} [seriesDefaults.labels.margin] <0> The margin of the labels.
         * _example
         * // sets the top, right, bottom and left margin to 3px.
         * margin: 3
         *
         * // sets the top and left margin to 1px
         * // margin right and bottom are with 0px (by default)
         * margin: { top: 1, left: 1 }
         * @option {Number|Object} [seriesDefaults.labels.padding] <0> The padding of the labels.
         * _example
         * // sets the top, right, bottom and left padding to 3px.
         * padding: 3
         *
         * // sets the top and left padding to 1px
         * // padding right and bottom are with 0px (by default)
         * padding: { top: 1, left: 1 }
         * @option {Object} [seriesDefaults.labels.border] The border of the labels.
         * @option {Number} [seriesDefaults.labels.border.width] <0> The width of the border.
         * @option {String} [seriesDefaults.labels.border.color] <"black"> The color of the border.
         * @option {String} [seriesDefaults.labels.border.dashType] <"solid"> The dash type of the border.
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
         * @option {String/Function} [seriesDefaults.labels.template] The label template.
         * Template variables:
         * <ul>
         *     <li><strong>value</strong> - the point value</li>
         *     <li><strong>category</strong> - the category name</li>
         *     <li><strong>series</strong> - the data series</li>
         *     <li><strong>dataItem</strong> - the original data item used to construct the point.
         *         Will be null if binding to array.
         *     </li>
         * </ul>
         * _example
         * // chart intialization
         * $("#chart").kendoChart({
         *      title: {
         *          text: "My Chart Title"
         *      },
         *      seriesDefault: {
         *          labels: {
         *              // label template
         *              template: "${ value }%",
         *              visible: true
         *          }
         *      },
         *      series: [
         *          {
         *              name: "Series 1",
         *              data: [200, 450, 300, 125]
         *          }
         *      ],
         *      categoryAxis: {
         *          categories: [2000, 2001, 2002, 2003]
         *      }
         * });
         * @option {String} [seriesDefaults.labels.format] The format of the labels.
         * _example
         * //sets format of the labels
         * format: "{0:C}"
         * @option {Object} [seriesDefaults.border] The border of the series.
         * @option {Number} [seriesDefaults.border.width] <0> The width of the border.
         * @option {String} [seriesDefaults.border.color] <"black"> The color of the border.
         * @option {String} [seriesDefaults.border.dashType] <"solid"> The dash type of the border.
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
         * @option {Object} [seriesDefaults.overlay] The effects overlay.
         * @option {String} [seriesDefaults.overlay.gradient] <"glass"> Gradient name.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              "glass"
         *         </dt>
         *         <dd>
         *              The bars have glass effect overlay.
         *         </dd>
         *         <dt>
         *              "none"
         *         </dt>
         *         <dd>
         *              The bars have no effect overlay.
         *         </dd>
         *    </dl>
         * </div>
         * @option {Object} [seriesDefaults.bar]
         * The default options for all bar series. For more details see the series options.
         * @option {Object} [seriesDefaults.column] The column configuration options.
         * The default options for all column series. For more details see the series options.
         * @option {Object} [seriesDefaults.line] The line configuration options.
         * The default options for all line series. For more details see the series options.
         * @option {Object} [seriesDefaults.pie] The pie configuration options.
         * The default options for all pie series. For more details see the series options.
         * @option {Array} [series] Array of series definitions.
         * <p>
         * The series type is determined by the value of the type field.
         * If a type value is missing, the type is assumed to be the one specified in seriesDefaults.
         * </p>
         * <p>
         * Each series type has a different set of options.
         * </p>
         * @option {String} [series.name] The series name visible in the legend.
         * @option {String} [series.field] The data field containing the series value.
         * @option [series.type="bar"] The type of the series.
         * @option {Boolean} [series.type="bar".stacked] <false>
         * A value indicating if the series should be stacked.
         * @option {Number} [series.type="bar".gap] <1.5> The distance between category clusters.
         * @option {Number} [series.type="bar".spacing] <0.4> Space between bars.
         * @option {String} [series.type="bar".name] The series name.
         * @option {String} [series.type="bar".color] The series base color.
         * @option {Number} [series.type="bar".opacity] <1> The series opacity.
         * @option {Object} [series.type="bar".labels] Configures the series data labels.
         * @option {String} [series.type="bar".labels.font] <"12px Arial,Helvetica,sans-serif">
         * The font style of the labels.
         * @option {String} [series.type="bar".labels.position] <"outsideEnd">
         * Defines the position of the bar labels.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              "center"
         *         </dt>
         *         <dd>
         *              The label is positioned at the bar center.
         *         </dd>
         *         <dt>
         *              "insideEnd"
         *         </dt>
         *         <dd>
         *              The label is positioned inside, near the end of the bar.
         *         </dd>
         *         <dt>
         *              "insideBase"
         *         </dt>
         *         <dd>
         *              The label is positioned inside, near the base of the bar.
         *         </dd>
         *         <dt>
         *              "outsideEnd"
         *         </dt>
         *         <dd>
         *              The label is positioned outside, near the end of the bar.
         *              Not applicable for stacked bar series.
         *         </dd>
         *    </dl>
         * </div>
         * @option {Boolean} [series.type="bar".labels.visible] <false> The visibility of the labels.
         * @option {Number|Object} [series.type="bar".labels.margin] <2> The margin of the labels.
         * _example
         * // sets the top, right, bottom and left margin to 3px.
         * margin: 3
         *
         * // sets the top and left margin to 1px
         * // margin right and bottom are with 2px (by default)
         * margin: { top: 1, left: 1 }
         * @option {Number|Object} [series.type="bar".labels.padding] <2> The padding of the labels.
         * _example
         * // sets the top, right, bottom and left padding to 3px.
         * padding: 3
         *
         * // sets the top and left padding to 1px
         * // padding right and bottom are with 2px (by default)
         * padding: { top: 1, left: 1 }
         * @option {Object} [series.type="bar".labels.border] The border of the labels.
         * @option {Number} [series.type="bar".labels.border.width] <0> The width of the border.
         * @option {String} [series.type="bar".labels.border.color] <"black"> The color of the border.
         * @option {String} [series.type="bar".labels.border.dashType] <"solid"> The dash type of the border.
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
         * @option {String/Function} [series.type="bar".labels.template] The label template.
         * Template variables:
         * <ul>
         *     <li><strong>value</strong> - the point value</li>
         *     <li><strong>category</strong> - the category name</li>
         *     <li><strong>series</strong> - the data series</li>
         *     <li><strong>dataItem</strong> - the original data item used to construct the point.
         *         Will be null if binding to array.
         *     </li>
         * </ul>
         * _example
         * // chart intialization
         * $("#chart").kendoChart({
         *      title: {
         *          text: "My Chart Title"
         *      },
         *      series: [
         *          {
         *              type: "bar",
         *              name: "Series 1",
         *              data: [200, 450, 300, 125],
         *              labels: {
         *                  // label template
         *                  template: "${ value }%",
         *                  visible: true
         *              }
         *          }
         *      ],
         *      categoryAxis: {
         *          categories: [2000, 2001, 2002, 2003]
         *      }
         * });
         * @option {String} [series.type="bar".labels.format] The format of the labels.
         * _example
         * //sets format of the labels
         * format: "{0:C}"
         * @option {Object} [series.type="bar".border] The border of the series.
         * @option {Number} [series.type="bar".border.width] <1> The width of the border.
         * @option {String} [series.type="bar".border.color] <the color of the curren series>
         * The color of the border.
         * @option {String} [series.type="bar".border.dashType] <"solid"> The dash type of the border.
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
         * @option {String} [series.type="bar".overlay] <"glass"> The effects overlay.
         * @option [series.type="column"] The type of the series.
         * @option {Boolean} [series.type="column".stacked] <false>
         * A value indicating if the series should be stacked.
         * @option {Number} [series.type="column".gap] <1.5> The distance between category clusters.
         * @option {Number} [series.type="column".spacing] <0.4> Space between bars.
         * @option {String} [series.type="column".name] The series name.
         * @option {String} [series.type="column".color] The series base color.
         * @option {Number} [series.type="column".opacity] <1> The series opacity.
         * @option {Object} [series.type="column".labels] Configures the series data labels.
         * @option {String} [series.type="column".labels.font] <"12px Arial,Helvetica,sans-serif">
         * The font style of the labels.
         * @option {String} [series.type="column".labels.position] <"outsideEnd">
         * Defines the position of the column labels.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              "center"
         *         </dt>
         *         <dd>
         *              The label is positioned at the bar center.
         *         </dd>
         *         <dt>
         *              "insideEnd"
         *         </dt>
         *         <dd>
         *              The label is positioned inside, near the end of the bar.
         *         </dd>
         *         <dt>
         *              "insideBase"
         *         </dt>
         *         <dd>
         *              The label is positioned inside, near the base of the bar.
         *         </dd>
         *         <dt>
         *              "outsideEnd"
         *         </dt>
         *         <dd>
         *              The label is positioned outside, near the end of the bar.
         *              Not applicable for stacked bar series.
         *         </dd>
         *    </dl>
         * </div>
         * @option {Boolean} [series.type="column".labels.visible] <false> The visibility of the labels.
         * @option {Number|Object} [series.type="column".labels.margin] <2> The margin of the labels.
         * _example
         * // sets the top, right, bottom and left margin to 3px.
         * margin: 3
         *
         * // sets the top and left margin to 1px
         * // margin right and bottom are with 2px (by default)
         * margin: { top: 1, left: 1 }
         * @option {Number|Object} [series.type="column".labels.padding] <2> The padding of the labels.
         * _example
         * // sets the top, right, bottom and left padding to 3px.
         * padding: 3
         *
         * // sets the top and left padding to 1px
         * // padding right and bottom are with 2px (by default)
         * padding: { top: 1, left: 1 }
         * @option {Object} [series.type="column".labels.border] The border of the labels.
         * @option {Number} [series.type="column".labels.border.width] <0> The width of the border.
         * @option {String} [series.type="column".labels.border.color] <"black">
         * The color of the border.
         * @option {String} [series.type="column".labels.border.dashType] <"solid"> The dash type of the border.
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
         * @option {String/Function} [series.type="column".labels.template] The label template.
         * Template variables:
         * <ul>
         *     <li><strong>value</strong> - the point value</li>
         *     <li><strong>category</strong> - the category name</li>
         *     <li><strong>series</strong> - the data series</li>
         *     <li><strong>dataItem</strong> - the original data item used to construct the point.
         *         Will be null if binding to array.
         *     </li>
         * </ul>
         * _example
         * // chart intialization
         * $("#chart").kendoChart({
         *      title: {
         *          text: "My Chart Title"
         *      },
         *      series: [
         *          {
         *              type: "bar",
         *              name: "Series 1",
         *              data: [200, 450, 300, 125],
         *              labels: {
         *                  // label template
         *                  template: "${ value }%",
         *                  visible: true
         *              }
         *          }
         *      ],
         *      categoryAxis: {
         *          categories: [2000, 2001, 2002, 2003]
         *      }
         * });
         * @option {String} [series.type="column".labels.format] The format of the labels.
         * _example
         * //sets format of the labels
         * format: "{0:C}"
         * @option {Object} [series.type="column".border] The border of the series.
         * @option {Number} [series.type="column".border.width] <1> The width of the border.
         * @option {String} [series.type="column".border.color] <the color of the current series>
         * The color of the border.
         * @option {String} [series.type="column".border.dashType] <"solid"> The dash type of the border.
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
         * @option {String} [series.type="column".overlay] <"glass"> The effects overlay.
         * @option [series.type="line"] The type of the series.
         * @option {Boolean} [series.type="line".stacked] <false>
         * A value indicating if the series should be stacked.
         * @option {String} [series.type="line".name] The series name.
         * @option {String} [series.type="line".color] The series base color.
         * @option {Number} [series.type="line".opacity] <1> The series opacity.
         * @option {Object} [series.type="line".labels] Configures the series data labels.
         * @option {String} [series.type="line".labels.font] <"12px Arial,Helvetica,sans-serif">
         * The font style of the labels.
         * @option {String} [series.type="line".labels.missingValues] <"gap">
         * Configures the behavior for handling missing values in line series.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              "interpolate"
         *         </dt>
         *         <dd>
         *              The value is interpolated from neighboring points.
         *         </dd>
         *         <dt>
         *              "zero"
         *         </dt>
         *         <dd>
         *              The value is assumed to be zero.
         *         </dd>
         *         <dt>
         *              "gap"
         *         </dt>
         *         <dd>
         *              The line stops before the missing point and continues after it.
         *         </dd>
         *    </dl>
         * </div>
         * @option {Object} [series.type="line".markers] Configures the line markers.
         * @option {String} [series.type="line".markers.type] <"square">
         * Configures the markers shape type.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              "square"
         *         </dt>
         *         <dd>
         *              The marker shape is square.
         *         </dd>
         *         <dt>
         *              "triagle"
         *         </dt>
         *         <dd>
         *              The marker shape is triagle.
         *         </dd>
         *         <dt>
         *              "circle"
         *         </dt>
         *         <dd>
         *              The marker shape is circle.
         *         </dd>
         *    </dl>
         * </div>
         * @option {Number} [series.type="line".markers.size] <6> The marker size.
         * @option {Boolean} [series.type="line".markers.visible] <true> The markers visibility.
         * @option {Object} [series.type="line".markers.border] The border of the markers.
         * @option {Number} [series.type="line".markers.border.width] <0> The width of the border.
         * @option {String} [series.type="line".markers.border.color] <"black"> The color of the border.
         * @option {String} [series.type="line".markers.background]
         * The background color of the current series markers.
         * @option {String} [series.type="line".labels.position] <"above">
         * Defines the position of the bar labels.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              "above"
         *         </dt>
         *         <dd>
         *              The label is positioned at the top of the line chart marker.
         *         </dd>
         *         <dt>
         *              "right"
         *         </dt>
         *         <dd>
         *              The label is positioned at the right of the line chart marker.
         *         </dd>
         *         <dt>
         *              "below"
         *         </dt>
         *         <dd>
         *              The label is positioned at the bottom of the line chart marker.
         *         </dd>
         *         <dt>
         *              "left"
         *         </dt>
         *         <dd>
         *              The label is positioned at the left of the line chart marker.
         *         </dd>
         *    </dl>
         * </div>
         * @option {Boolean} [series.type="line".labels.visible] <false> The visibility of the labels.
         * @option {Number|Object} [series.type="line".labels.margin] <{ left: 5, right: 5}>
         * The margin of the labels.
         * _example
         * // sets the top, right, bottom and left margin to 3px.
         * margin: 3
         *
         * // sets the top and bottom margin to 1px
         * // margin left and right are with 5px (by default)
         * margin: { top: 1, bottom: 1 }
         * @option {Number|Object} [series.type="line".labels.padding] <0> The padding of the labels.
         * _example
         * // sets the top, right, bottom and left padding to 3px.
         * padding: 3
         *
         * // sets the top and left padding to 1px
         * // padding right and bottom are with 0px (by default)
         * padding: { top: 1, left: 1 }
         * @option {Object} [series.type="line".labels.border] The border of the labels.
         * @option {Number} [series.type="line".labels.border.width] <0> The width of the border.
         * @option {String} [series.type="line".labels.border.color] <"black"> The color of the border.
         * @option {String} [series.type="line".labels.border.dashType] <"solid"> The dash type of the border.
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
         * @option {String/Function} [series.type="line".labels.template] The label template.
         * Template variables:
         * <ul>
         *     <li><strong>value</strong> - the value</li>
         *     <li><strong>dataItem</strong> - the original data item used to construct the point.
         *         Will be null if binding to array.
         *     </li>
         * </ul>
         * _example
         * // chart intialization
         * $("#chart").kendoChart({
         *      title: {
         *          text: "My Chart Title"
         *      },
         *      series: [
         *          {
         *              type: "column",
         *              name: "Series 1",
         *              data: [200, 450, 300, 125],
         *              labels: {
         *                  // label template
         *                  template: "${ value }%",
         *                  visible: true
         *              }
         *          }
         *      ],
         *      categoryAxis: {
         *          categories: [2000, 2001, 2002, 2003]
         *      }
         * });
         * @option {String} [series.type="line".labels.format] The format of the labels.
         * _example
         * //sets format of the labels
         * format: "{0:C}"
         *
         * @option [series.type="pie"] The type of the series.
         * @option {Array} [series.type="pie".data] Array of data items (optional).
         * The pie chart can be bound to an array of numbers or an array of objects
         * with the following fields:
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              value
         *         </dt>
         *         <dd>
         *              The sector value.
         *         </dd>
         *         <dt>
         *              category
         *         </dt>
         *         <dd>
         *              The sector category that is shown in the legend.
         *         </dd>
         *         <dt>
         *              color
         *         </dt>
         *         <dd>
         *              The sector color.
         *         </dd>
         *         <dt>
         *              explode
         *         </dt>
         *         <dd>
         *              A boolean value indicating whether to explode the sector.
         *         </dd>
         *    </dl>
         * </div>
         *  _example
         *  // ...
         *  series:[{
         *      type: "pie",
         *      data:[{
         *          value: 40,
         *          category: "Apples"
         *      }, {
         *          value: 60,
         *          category: "Oranges",
         *          color: "#ff6103"
         *          }
         *      ],
         *      name: "Sales in Percent"
         *  }]
         *  // ...
         * @option {Number} [series.type="pie".padding] <60> The padding around the pie chart (equal on all sides).
         * @option {Number} [series.type="pie".opacity] <1> The series opacity.
         * @option {Object} [series.type="pie".labels] Configures the series data labels.
         * @option {String} [series.type="pie".labels.font] <"12px Arial, sans-serif">
         * The font style of the labels.
         * @option {Boolean} [series.type="pie".labels.visible] <false> The visibility of the labels.
         * @option {Number} [series.type="pie".labels.distance] <35> The distance of the labels.
         * @option {Number|Object} [series.type="pie".labels.margin] <0.5> The margin of the labels.
         * _example
         * // sets the top, right, bottom and left margin to 3px.
         * margin: 3
         *
         * // sets the top and left margin to 1px
         * // margin right and bottom are with 2px (by default)
         * margin: { top: 1, left: 1 }
         * @option {Number|Object} [series.type="pie".labels.padding] <0> The padding of the labels.
         * _example
         * // sets the top, right, bottom and left padding to 3px.
         * padding: 3
         *
         * // sets the top and left padding to 1px
         * // padding right and bottom are with 2px (by default)
         * padding: { top: 1, left: 1 }
         * @option {Object} [series.type="pie".labels.border] The border of the labels.
         * @option {Number} [series.type="pie".labels.border.width] <0> The width of the border.
         * @option {String} [series.type="pie".labels.border.color] <"black"> The color of the border.
         * @option {String} [series.type="pie".labels.border.dashType] <"solid"> The dash type of the border.
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
         * @option {String/Function} [series.type="pie".labels.template] The label template.
         * Template variables:
         * <div class="details-list">
         *     <dl>
         *         <dt>
         *              value
         *         </dt>
         *         <dd>
         *              the point value
         *         </dd>
         *         <dt>
         *              category
         *         </dt>
         *         <dd>
         *              the category name
         *         </dd>
         *         <dt>
         *              series
         *         </dt>
         *         <dd>
         *              the data series
         *         </dd>
         *         <dt>
         *              dataItem
         *         </dt>
         *         <dd>
         *              the original data item used to construct the point (when binding from dataSource)
         *         </dd>
         *     </dl>
         * </div>
         * _example
         * // chart intialization
         * $("#chart").kendoChart({
         *      title: {
         *          text: "My Chart Title"
         *      },
         *      series: [
         *          {
         *              type: "pie",
         *              name: "Series 1",
         *              data: [
         *                  { value: 200, category: 2000 },
         *                  { value: 450, category: 2001 },
         *                  { value: 300, category: 2002 },
         *                  { value: 125, category: 2003 }
         *              ],
         *              labels: {
         *                  // label template
         *                  template: "${ value }%",
         *                  visible: true
         *              }
         *          }
         *      ],
         *      categoryAxis: {
         *          categories: [2000, 2001, 2002, 2003]
         *      }
         * });
         * @option {String} [series.type="pie".labels.format] The format of the labels.
         * _example
         * //sets format of the labels
         * format: "{0:C}"
         * @option {String} [series.type="pie".labels.align] <"circle">
         * Defines the alignment of the pie labels.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              "circle"
         *         </dt>
         *         <dd>
         *              The labels are positioned in circle around the pie chart.
         *         </dd>
         *         <dt>
         *              "column"
         *         </dt>
         *         <dd>
         *              The labels are positioned in columns to the left and right of the pie chart.
         *         </dd>
         *    </dl>
         * </div>
         * @option {Object} [series.type="pie".border] The border of the series.
         * @option {Number} [series.type="pie".border.width] <1> The width of the border.
         * @option {String} [series.type="pie".border.color] <the color of the curren series>
         * The color of the border.
         * @option {String} [series.type="pie".border.dashType] <solid> The dash type of the border.
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
         * @option {String} [series.type="pie".overlay] <"glass"> The effects overlay.
         * @option {Object} [series.type="pie".connectors] The label connectors options.
         * @option {Number} [series.type="pie".connectors.width] <1> The width of the connector line.
         * @option {String} [series.type="pie".connectors.color] <"#939393"> The color of the connector line.
         * @option {Number} [series.type="pie".connectors.padding] <4>
         * The padding between the connector line and the label, and connector line and pie chart.
         * @option {number} [series.type="pie".startAngle] <90> The start angle of the first pie segment.
         * @option {Object} [chartArea] The chart area configuration options.
         * This is the entire visible area of the chart.
         * @option {String} [chartArea.background] <"white"> The background color of the chart area.
         * @option {Number|Object} [chartArea.margin] <5> The margin of the chart area.
         * _example
         * // sets the top, right, bottom and left margin to 3px.
         * margin: 3
         *
         * // sets the top and left margin to 1px
         * // margin right and bottom are with 5px (by default)
         * margin: { top: 1, left: 1 }
         * @option {Object} [chartArea.border] The border of the chart area.
         * @option {Number} [chartArea.border.width] <0> The width of the border.
         * @option {String} [chartArea.border.color] <"black"> The color of the border.
         * @option {String} [chartArea.border.dashType] <"solid"> The dash type of the border.
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
         * @option {Object} [plotArea]
         * The plot area configuration options. This is the area containing the plotted series.
         * @option {String} [plotArea.background] <"white"> The background color of the plot area.
         * @option {Number|Object} [plotArea.margin] <5> The margin of the plot area.
         * _example
         * // sets the top, right, bottom and left margin to 3px.
         * margin: 3
         *
         * // sets the top and left margin to 1px
         * // margin right and bottom are with 5px (by default)
         * margin: { top: 1, left: 1 }
         * @option {Object} [plotArea.border] The border of the plot area.
         * @option {Number} [plotArea.border.width] <0> The width of the border.
         * @option {String} [plotArea.border.color] <"black"> The color of the border.
         * @option {String} [plotArea.border.dashType] <"solid"> The dash type of the border.
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
         * @option {Object} [tooltip] The data point tooltip configuration options.
         * @option {String} [tooltip.format] The tooltip format.
         * _example
         * //sets format of the tooltip
         * format: "{0:C}"
         * @option {String|Function} [tooltip.template] The tooltip template.
         * Template variables:
         * <ul>
         *     <li><strong>value</strong> - the point value</li>
         *     <li><strong>category</strong> - the category name</li>
         *     <li><strong>series</strong> - the data series</li>
         *     <li><strong>dataItem</strong> -
         *         the original data item (when binding to dataSource)
         *     </li>
         * </ul>
         * _example
         * $("#chart").kendoChart({
         *      title: {
         *          text: "My Chart Title"
         *      },
         *      series: [
         *          {
         *              name: "Series 1",
         *              data: [200, 450, 300, 125]
         *          }
         *      ],
         *      categoryAxis: {
         *          categories: [2000, 2001, 2002, 2003]
         *      },
         *      tooltip: {
         *          visible: true,
         *          template: "${category} - ${value}"
         *      }
         * });
         * @option {String} [tooltip.font] <"12px Arial,Helvetica,sans-serif"> The tooltip font.
         * @option {String} [tooltip.color]
         * The text color of the tooltip. The default is the same as the series labels color.
         * @option {String} [tooltip.background]
         * The background color of the tooltip. The default is determined from the series color.
         * @option {Number|Object} [tooltip.padding] The padding of the tooltip.
         * _example
         * // sets the top, right, bottom and left padding to 3px.
         * padding: 3
         *
         * // sets the top and left padding to 1px
         * // right and bottom padding are left at their default values
         * padding: { top: 1, left: 1 }
         * @option {Object} [tooltip.border] The border configuration options.
         * @option {Number} [tooltip.border.width] <0> The width of the border.
         * @option {String} [tooltip.border.color] <"black"> The color of the border.
         * @option {Boolean} [transitions] <true>
         * A value indicating if transition animations should be played.
         */
        init: function() {
            /**
             * Fires when the chart has received data from the data source
             * and is about to render it.
             * @name kendo.ui.Chart#dataBound
             * @event
             * @param {Event} e
             */

            /**
             * Fires when chart series are clicked.
             * @name kendo.ui.Chart#seriesClick
             * @event
             * @param {Event} e
             * @param {Object} e.value The data point value.
             * @param {Object} e.category The data point category
             * @param {Object} e.series The clicked series.
             * @param {Object} e.dataItem The original data item (when binding to dataSource).
             * @param {Object} e.element The DOM element of the data point.
             */
        },

        /**
         * Reloads the data and repaints the chart.
         * @example
         * var chart = $("#chart").data("kendoChart");
         *
         * // refreshes the chart
         * chart.refresh();
         */
        refresh: function() { },

        /**
         * Returns the SVG representation of the current chart. The browser does not need to support SVG.
         * @example
         * var chart = $("#chart").data("kendoChart");
         * var svgText = chart.svg();
         */
        svg: function() { }
    };

})(jQuery);
