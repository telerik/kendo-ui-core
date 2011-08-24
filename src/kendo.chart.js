(function ($, undefined) {

    // Imports ================================================================
    var doc = document,
        kendo = window.kendo,
        Class = kendo.Class,
        Component = kendo.ui.Component,
        DataSource = kendo.data.DataSource,
        baseTemplate = kendo.template,
        format = kendo.format,
        map = $.map,
        math = Math,
        proxy = $.proxy;

    // Constants ==============================================================
    var ABOVE = "above",
        BASELINE_MARKER_SIZE = 1,
        BAR = "bar",
        BAR_BORDER_BRIGHTNESS = 0.7,
        BAR_GAP = 1.5,
        BAR_SPACING = 0.4,
        BELOW = "below",
        BLACK = "#000",
        BOTTOM = "bottom",
        CENTER = "center",
        CHANGE = "change",
        CIRCLE = "circle",
        CLICK = "click",
        COLUMN = "column",
        COORD_PRECISION = 3,
        DATABOUND = "dataBound",
        DEFAULT_HEIGHT = 400,
        DEFAULT_PRECISION = 6,
        DEFAULT_WIDTH = 600,
        GLASS = "glass",
        HEIGHT = "height",
        HORIZONTAL = "horizontal",
        INSIDE_BASE = "insideBase",
        INSIDE_END = "insideEnd",
        INTERPOLATE = "interpolate",
        LEFT = "left",
        LINE = "line",
        LINE_MARKER_SIZE = 6,
        LINE_MARKER_SQUARE = "square",
        MOUSEMOVE_TRACKING = "mousemove.tracking",
        MOUSEOVER = "mouseover",
        NONE = "none",
        OBJECT = "object",
        ON_MINOR_TICKS = "onMinorTicks",
        OUTSIDE = "outside",
        OUTSIDE_END = "outsideEnd",
        OUTLINE_SUFFIX = "_outline",
        RIGHT = "right",
        SANS12 = "12px Verdana, sans-serif",
        SANS16 = "16px Verdana, sans-serif",
        SERIES_CLICK = "seriesClick",
        SQUARE = "square",
        SVG_DASH_TYPE = {
            dot: [1.5, 3.5],
            dash: [4, 3.5],
            longdash: [8, 3.5],
            dashdot: [3.5, 3.5, 1.5, 3.5],
            longdashdot: [8, 3.5, 1.5, 3.5],
            longdashdotdot: [8, 3.5, 1.5, 3.5, 1.5, 3.5]
        },
        SVG_NS = "http://www.w3.org/2000/svg",
        TOP = "top",
        TRIANGLE = "triangle",
        UNDEFINED = "undefined",
        VERTICAL = "vertical",
        WIDTH = "width",
        WHITE = "#fff",
        X = "x",
        Y = "y",
        ZERO = "zero",
        ZERO_THRESHOLD = 0.2;

    // Chart ==================================================================
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
     * Currently supported chart types: <strong>Bar</strong>,
     * <strong>Column</strong>, and <strong>Line</strong>.
     * </p>
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
    var Chart = Component.extend(/** @lends kendo.ui.Chart.prototype */{
        /**
         * @constructs
         * @extends kendo.ui.Component
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {String} [theme] Sets Chart theme. Available themes: kendo, blueOpal, black.
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
         * @option {String} [title.font] <"16px Verdana, sans-serif"> The font style of the title.
         * @option {String} [title.position] <"top"> The positions of the title.
         *    <dl>
         *         <dt>
         *              "top"
         *         </dt>
         *         <dd>
         *              The title is positioned on the top.
         *         </dd>
         *         <dt>
         *              "bottom"
         *         </dt>
         *         <dd>
         *              The title is positioned on the bottom.
         *         </dd>
         *    </dl>
         * @option {String} [title.align] <"center"> The alignment of the title.
         *    <dl>
         *         <dt>
         *              "left"
         *         </dt>
         *         <dd>
         *              The text is aligned to the left.
         *         </dd>
         *         <dt>
         *              "center"
         *         </dt>
         *         <dd>
         *              The text is aligned to the middle.
         *         </dd>
         *         <dt>
         *              "right"
         *         </dt>
         *         <dd>
         *              The text is aligned to the right.
         *         </dd>
         *    </dl>
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
         * @option {Object} [legend] The chart legend configuration options.
         * @option {String} [legend.font] <12px Verdana, sans-serif> The font style of the legend.
         * @option {String} [legend.position] <right> The positions of the legend.
         *    <dl>
         *         <dt>
         *              "top"
         *         </dt>
         *         <dd>
         *              The legend is positioned on the top.
         *         </dd>
         *         <dt>
         *              "bottom"
         *         </dt>
         *         <dd>
         *              The legend is positioned on the bottom.
         *         </dd>
         *         <dt>
         *              "left"
         *         </dt>
         *         <dd>
         *              The legend is positioned on the left.
         *         </dd>
         *         <dt>
         *              "right"
         *         </dt>
         *         <dd>
         *              The legend is positioned on the right.
         *         </dd>
         *         <dt>
         *              "custom"
         *         </dt>
         *         <dd>
         *              The legend is positioned using OffsetX and OffsetY.
         *         </dd>
         *    </dl>
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
         * @option {Object} [valueAxis] The value axis configuration options.
         * @option {Array} [valueAxis.categories] Categories are used instead of numbers for that axis.
         * @option {Number} [valueAxis.axisCrossingValue] <0>
         * Value at which the first perpendicular axis crosses this axis.
         * @option {Number} [valueAxis.minorTickSize] <3> The axis minor tick size.
         * @option {String} [valueAxis.minorTickType] <none> The minor tick type.
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
         * @option {Number} [valueAxis.majorTickSize] <4> The axis major tick size.
         * @option {String} [valueAxis.majorTickType] <outside> The major tick type.
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
         * @option {String} [valueAxis.labels.font] <"12px Verdana, sans-serif">
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
         * @option {String} [categoryAxis.field] The data field containing the category name.
         * @option {Number} [categoryAxis.min] <0> The minimum value of the axis.
         * @option {Number} [categoryAxis.max] <1> The maximum value of the axis.
         * @option {Number} [categoryAxis.majorUnits] The interval between major divisions.
         * @option {Number} [categoryAxis.axisCrossingValue] <0>
         * Value at which the first perpendicular axis crosses this axis.
         * @option {Number} [categoryAxis.minorTickSize] <3> The axis minor tick size.
         * @option {String} [categoryAxis.minorTickType] <"none"> The axis minor tick size.
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
         * @option {Number} [categoryAxis.majorTickSize] <3> The axis major tick size.
         * @option {String} [categoryAxis.majorTickType] <"outside"> The axis major tick size.
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
         * @option {String} [categoryAxis.labels.font] <"12px Verdana, sans-serif">
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
         * @option {String} [seriesDefaults.labels.font] <"12px Verdana, sans-serif">
         * The font style of the labels.
         * @option {Boolean} [seriesDefaults.labels.visible] <true> The visibility of the labels.
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
         * @option {String} [seriesDefaults.overlay] <"glass"> The effects overlay.
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
         * @option {Object} [seriesDefaults.bar]
         * The default options for all bar series. For more details see the series options.
         * @option {Object} [seriesDefaults.column] The column configuration options.
         * The default options for all column series. For more details see the series options.
         * @option {Object} [seriesDefaults.line] The line configuration options.
         * The default options for all line series. For more details see the series options.
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
         * @option {String} [series.type="bar".labels.font] <"12px Verdana, sans-serif">
         * The font style of the labels.
         * @option {String} [series.type="bar".labels.position] <"outsideEnd">
         * Defines the position of the bar labels.
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
         * @option {Boolean} [series.type="bar".labels.visible] <true> The visibility of the labels.
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
         * @option {String} [series.type="column".labels.font] <"12px Verdana, sans-serif">
         * The font style of the labels.
         * @option {String} [series.type="column".labels.position] <"outsideEnd">
         * Defines the position of the column labels.
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
         * @option {Boolean} [series.type="column".labels.visible] <true> The visibility of the labels.
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
         * @option {String} [series.type="column".overlay] <"glass"> The effects overlay.
         * @option [series.type="line"] The type of the series.
         * @option {Boolean} [series.type="line".stacked] <false>
         * A value indicating if the series should be stacked.
         * @option {String} [series.type="line".name] The series name.
         * @option {String} [series.type="line".color] The series base color.
         * @option {Number} [series.type="line".opacity] <1> The series opacity.
         * @option {Object} [series.type="line".labels] Configures the series data labels.
         * @option {String} [series.type="line".labels.font] <"12px Verdana, sans-serif">
         * The font style of the labels.
         * @option {String} [series.type="line".labels.missingValues] <"gap">
         * Configures the behavior for handling missing values in line series.
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
         * @option {Object} [series.type="line".markers] Configures the line markers.
         * @option {String} [series.type="line".markers.type] <"square">
         * Configures the markers shape type.
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
         * @option {Number} [series.type="line".markers.size] <6> The marker size.
         * @option {Boolean} [series.type="line".markers.visible] <true> The markers visibility.
         * @option {Object} [series.type="line".markers.border] The border of the markers.
         * @option {Number} [series.type="line".markers.border.width] <0> The width of the border.
         * @option {String} [series.type="line".markers.border.color] <"black"> The color of the border.
         * @option {String} [series.type="line".markers.background]
         * The background color of the current series markers.
         * @option {String} [series.type="line".labels.position] <"above">
         * Defines the position of the bar labels.
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
         * @option {Boolean} [series.type="line".labels.visible] <true> The visibility of the labels.
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
         * @option {String} [tooltip.font] <"12px Tahoma,sans-serif"> The tooltip font.
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
         */
        init: function(element, options) {
            var chart = this,
                theme;

            Component.fn.init.call(chart, element);

            if (options && options.dataSource) {
                chart.dataSource = DataSource
                    .create(options.dataSource)
                    .bind(CHANGE, proxy(chart._onDataChanged, chart));
            }

            options = deepExtend({}, chart.options, options);
            applyAxisDefaults(options);

            theme = options.theme;

            chart.options = deepExtend(
                {},
                theme ? Chart.themes[theme] || Chart.themes[theme.toLowerCase()] : {},
                options
            );

            applySeriesDefaults(chart.options);

            chart.bind([
                /**
                 * Fires when the chart has received data from the data source
                 * and is about to render it.
                 * @name kendo.ui.Chart#dataBound
                 * @event
                 * @param {Event} e
                 */
                DATABOUND,

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
                SERIES_CLICK
            ], chart.options);

            chart._refresh();
        },

        options: {
            theme: "default",
            chartArea: {},
            title: {
                visible: true
            },
            legend: {
                visible: true
            },
            valueAxis: {
                type: "Numeric"
            },
            categoryAxis: {
                categories: []
            },
            seriesDefaults: {
                type: COLUMN,
                data: [],
                bar: {
                    gap: BAR_GAP,
                    spacing: BAR_SPACING
                },
                column: {
                    gap: BAR_GAP,
                    spacing: BAR_SPACING
                },
                labels: {}
            },
            series: [],
            tooltip: {
                visible: false
            }
        },

        /**
         * Reloads the data and repaints the chart.
         * @example
         * var chart = $("#chart").data("kendoChart");
         *
         * // refreshes the chart
         * chart.refresh();
         */
        refresh: function() {
            var chart = this;

            applySeriesDefaults(chart.options);
            applyAxisDefaults(chart.options);

            chart._refresh();
        },

        _refresh: function() {
            var chart = this;
            chart._ensureSize();
            if (chart.options.dataSource) {
                chart.dataSource.read();
            } else {
                chart._redraw();
            }
        },

        _redraw: function() {
            var chart = this,
                options = chart.options,
                model = new RootElement(options.chartArea),
                plotArea;

            chart._model = model;

            if (options.title && options.title.visible && options.title.text) {
                model.append(new Title(options.title));
            }

            if (options.legend.visible) {
                var legendOptions = deepExtend({}, options.legend,
                                    { series: options.series });

                model.append(new Legend(legendOptions));
            }

            plotArea = chart._plotArea = new PlotArea(chart.options);
            model.append(plotArea);
            model.reflow();

            chart.element.css("position", "relative");
            chart._view = model.getView();
            chart._viewElement = chart._view.renderTo(chart.element[0]);
            chart._attachEvents();
        },

        _attachEvents: function() {
            var chart = this,
                viewElement = $(chart._viewElement);

            viewElement.bind(CLICK, proxy(chart._click, chart));

            chart._tooltip = new Tooltip(chart.element, chart.options.tooltip);
            chart._highlight = new Highlight(chart._view, chart._viewElement);
            viewElement.bind(MOUSEOVER, proxy(chart._mouseOver, chart));
        },

        _click: function(e) {
            var chart = this,
                model = chart._model,
                target = e.target,
                point = model.idMap[target.id];

            if (point) {
                chart.trigger(SERIES_CLICK, {
                    value: point.value,
                    category: point.category,
                    series: point.series,
                    dataItem: point.dataItem,
                    element: $(e.target)
                });
            }
        },

        getCoordinates: function(e) {
            var chart = this,
                chartOffset = chart.element.offset(),
                win = $(window);

            return({
                x: e.clientX - chartOffset.left + win.scrollLeft(),
                y: e.clientY - chartOffset.top + win.scrollTop()
            });
        },

        _mouseOver: function(e) {
            var chart = this,
                tooltip = chart._tooltip,
                highlight = chart._highlight,
                coords = chart.getCoordinates(e),
                targetId = e.target.id,
                chartElement = chart._model.idMap[targetId],
                metadata = chart._model.idMapMetadata[targetId],
                point;

            if (highlight.element === e.target) {
                return;
            }

            if (chartElement) {
                if (chartElement.getSeriesPoint && metadata) {
                    point = chartElement.getSeriesPoint(coords.x, coords.y, metadata.seriesIx);
                } else {
                    point = chartElement;
                }

                if (chart.options.tooltip.visible) {
                    tooltip.show(point);
                }

                highlight.show(point);

                $(doc.body).bind(MOUSEMOVE_TRACKING, proxy(chart._mouseMove, chart));
            }
        },

        _mouseMove: function(e) {
            var chart = this,
                tooltip = chart._tooltip,
                highlight = chart._highlight,
                coords = chart.getCoordinates(e),
                point,
                owner,
                seriesPoint;

            if (chart._plotArea.box.containsPoint(coords.x, coords.y)) {
                if (tooltip.visible) {
                    point = tooltip.point;
                    if(point.series.type === LINE) {
                        owner = point.owner;
                        seriesPoint = owner.getSeriesPoint(coords.x, coords.y, point.seriesIx);
                        if (seriesPoint && seriesPoint != point) {
                            tooltip.show(seriesPoint);
                        }
                    }
                }
            } else {
                $(doc.body).unbind(MOUSEMOVE_TRACKING);

                tooltip.hide();
                highlight.hide();
            }
        },

        _ensureSize: function() {
            var chart = this,
                element = chart.element,
                options = chart.options,
                chartArea = options.chartArea;

            if (!chartArea.width) {
                chartArea.width = element.width() || DEFAULT_WIDTH;
            }

            if (!chartArea.height) {
                chartArea.height = element.height() || DEFAULT_HEIGHT;
            }
        },

        _onDataChanged: function() {
            var chart = this,
                options = chart.options,
                series = options.series,
                categoryAxis = options.categoryAxis,
                data = chart.dataSource.view();

            for (var dataIdx = 0, dataLength = data.length; dataIdx < dataLength; dataIdx++) {
                var row = data[dataIdx];

                if (categoryAxis.field) {
                    var category = row[categoryAxis.field];
                    if (dataIdx === 0) {
                        categoryAxis.categories = [category];
                    } else {
                        categoryAxis.categories.push(category);
                    }
                }

                for (var seriesIdx = 0, seriesLength = series.length; seriesIdx < seriesLength; seriesIdx++) {
                    var currentSeries = series[seriesIdx],
                        value = row[currentSeries.field];

                    if (currentSeries.field) {
                        if (dataIdx === 0) {
                            currentSeries.data = [value];
                            currentSeries.dataItems = [row];
                        } else {
                            currentSeries.data.push(value);
                            currentSeries.dataItems.push(row);
                        }
                    }
                }
            }

            chart.trigger(DATABOUND);
            chart._redraw();
        }
    });


    // **************************
    // Themes
    // **************************
    Chart.themes = {
        "default": {
            seriesColors: ["#d7df23", "#adc32b", "#799b28", "#4c7520"]
        }
    };


    // **************************
    // View Model
    // **************************
    var Box2D = Class.extend({
        init: function(x1, y1, x2, y2) {
            var box = this;
            box.x1 = x1 || 0;
            box.x2 = x2 || 0;
            box.y1 = y1 || 0;
            box.y2 = y2 || 0;
        },

        width: function() {
            return this.x2 - this.x1;
        },

        height: function() {
            return this.y2 - this.y1;
        },

        translate: function(dx, dy) {
            var box = this;

            box.x1 += dx;
            box.x2 += dx;
            box.y1 += dy;
            box.y2 += dy;

            return box;
        },

        move: function(x, y) {
            var box = this,
                height = box.height(),
                width = box.width();

            box.x1 = x;
            box.y1 = y;
            box.x2 = box.x1 + width;
            box.y2 = box.y1 + height;

            return box;
        },

        wrap: function(targetBox) {
            var box = this;

            box.x1 = math.min(box.x1, targetBox.x1);
            box.y1 = math.min(box.y1, targetBox.y1);
            box.x2 = math.max(box.x2, targetBox.x2);
            box.y2 = math.max(box.y2, targetBox.y2);

            return box;
        },

        snapTo: function(targetBox, axis) {
            var box = this;

            if (axis == X || !axis) {
                box.x1 = targetBox.x1;
                box.x2 = targetBox.x2;
            }

            if (axis == Y || !axis) {
                box.y1 = targetBox.y1;
                box.y2 = targetBox.y2;
            }

            return box;
        },

        alignTo: function(targetBox, edge) {
            var box = this,
                height = box.height(),
                width = box.width(),
                axis = edge == TOP || edge == BOTTOM ? Y : X,
                offset = axis == Y ? height : width;

            if (edge == TOP || edge == LEFT) {
                box[axis + 1] = targetBox[axis + 1] - offset;
            } else {
                box[axis + 1] = targetBox[axis + 2];
            }

            box.x2 = box.x1 + width;
            box.y2 = box.y1 + height;

            return box;
        },

        shrink: function(dw, dh) {
            var box = this;

            box.x2 -= dw;
            box.y2 -= dh;

            return box;
        },

        expand: function(dw, dh) {
            this.shrink(-dw, -dh);
            return this;
        },

        pad: function(padding) {
            var box = this,
                spacing = getSpacing(padding);

            box.x1 -= spacing.left;
            box.x2 += spacing.right;
            box.y1 -= spacing.top;
            box.y2 += spacing.bottom;

            return box;
        },

        unpad: function(padding) {
            var box = this,
                spacing = getSpacing(padding);

            spacing.left = -spacing.left;
            spacing.top = -spacing.top;
            spacing.right = -spacing.right;
            spacing.bottom = -spacing.bottom;

            return box.pad(spacing);
        },

        clone: function() {
            var box = this;

            return new Box2D(box.x1, box.y1, box.x2, box.y2);
        },

        center: function() {
            var box = this;

            return {
                x: box.x1 + box.width() / 2,
                y: box.y1 + box.height() / 2
            };
        },

        containsPoint: function(x, y) {
            var box = this;

            return x >= box.x1 && x <= box.x2 &&
                   y >= box.y1 && y <= box.y2;
        }
    });

    var ChartElement = Class.extend({
        init: function(options) {
            var element = this;
            element.children = [];

            element.options = deepExtend({}, element.options, options);
        },

        reflow: function(targetBox) {
            var element = this,
                children = element.children,
                box,
                i,
                currentChild;

            for (i = 0; i < children.length; i++) {
                currentChild = children[i];

                currentChild.reflow(targetBox);
                box = box ? box.wrap(currentChild.box) : currentChild.box.clone();
            }

            element.box = box;
        },

        getViewElements: function(view) {
            var element = this,
                viewElements = [],
                children = element.children,
                childrenCount = children.length;

            for (var i = 0; i < childrenCount; i++) {
                viewElements.push.apply(viewElements,
                    children[i].getViewElements(view));
            }

            return viewElements;
        },

        registerId: function(id, metadata) {
            var element = this,
                root;

            root = element.getRoot();
            if (root) {
                root.idMap[id] = element;
                if (metadata) {
                    root.idMapMetadata[id] = metadata;
                }
            }
        },

        translateChildren: function(dx, dy) {
            var element = this,
                children = element.children,
                childrenCount = children.length,
                i;

            for (i = 0; i < childrenCount; i++) {
                children[i].box.translate(dx, dy);
            }
        },

        append: function() {
            var element = this,
                i,
                length = arguments.length;

            append(element.children, arguments);

            for (i = 0; i < length; i++) {
                arguments[i].parent = element;
            }
        },

        getRoot: function() {
            var element = this,
                parent = element.parent;

            return parent ? parent.getRoot() : null;
        }
    });

    var RootElement = ChartElement.extend({
        init: function(options) {
            var root = this;

            root.idMap = {};
            root.idMapMetadata = {};

            ChartElement.fn.init.call(root, options);
        },

        options: {
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT,
            background: WHITE,
            border: {
                color: BLACK,
                width: 0
            },
            margin: getSpacing(5),
            zIndex: -1
        },

        reflow: function() {
            var root = this,
                options = root.options,
                children = root.children,
                currentBox = new Box2D(0, 0, options.width, options.height);

            root.box = currentBox.unpad(options.margin);

            for (var i = 0; i < children.length; i++) {
                children[i].reflow(currentBox);
                currentBox = boxDiff(currentBox, children[i].box);
            }
        },

        getView: function() {
            var root = this,
                options = root.options,
                view = root.supportsSVG() ? new SVGView(options) : new VMLView(options);

            append(view.children, root.getViewElements(view));

            return view;
        },

        getViewElements: function(view) {
            var root = this,
                options = root.options,
                border = options.border || {},
                box = root.box.clone().pad(options.margin).unpad(border.width),
                elements = [
                    view.createRect(box, {
                        stroke: border.width ? border.color : "",
                        strokeWidth: border.width,
                        dashType: border.dashType,
                        fill: options.background,
                        zIndex: options.zIndex })
                ];

            return elements.concat(
                ChartElement.fn.getViewElements.call(root, view)
            );
        },

        supportsSVG: function() {
            return doc.implementation.hasFeature(
                "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
        },

        getRoot: function() {
            return this;
        }
    });

    var BoxElement = ChartElement.extend({
        init: function(options) {
            ChartElement.fn.init.call(this, options);
        },

        options: {
            align: LEFT,
            vAlign: TOP,
            margin: { },
            padding: { },
            border: {
                color: BLACK,
                width: 0
            },
            background: "",
            width: 0,
            height: 0,
            visible: true
        },

        reflow: function(targetBox) {
            var element = this,
                box,
                contentBox,
                options = element.options,
                children = element.children,
                margin = getSpacing(options.margin),
                padding = getSpacing(options.padding),
                border = options.border,
                borderWidth = border.width;

            ChartElement.fn.reflow.call(element, targetBox);

            if (children.length === 0) {
                box = element.box = new Box2D(0, 0, options.width, options.height);
            } else {
                box = element.box;
            }

            contentBox = box.clone();

            box.pad(padding).pad(borderWidth).pad(margin);

            element.align(targetBox, X, options.align);
            element.align(targetBox, Y, options.vAlign);

            element.paddingBox = box.clone().unpad(margin).unpad(borderWidth);

            element.translateChildren(
                box.x1 - contentBox.x1 + margin.left + borderWidth + padding.left,
                box.y1 - contentBox.y1 + margin.top + borderWidth + padding.left);
        },

        align: function(targetBox, axis, alignment) {
            var element = this,
                box = element.box,
                c1 = axis + 1,
                c2 = axis + 2,
                sizeFunc = axis === X ? WIDTH : HEIGHT,
                size = box[sizeFunc]();

            if (inArray(alignment, [LEFT, TOP])) {
                box[c1] = targetBox[c1];
                box[c2] = box[c1] + size;
            } else if (inArray(alignment, [RIGHT, BOTTOM])) {
                box[c2] = targetBox[c2];
                box[c1] = box[c2] - size;
            } else if (alignment == CENTER) {
                box[c1] = targetBox[c1] + (targetBox[sizeFunc]() - size) / 2;
                box[c2] = box[c1] + size;
            }
        },

        getViewElements: function(view) {
            var element = this,
                options = element.options;

            if (!options.visible) {
                return [];
            }

            var border = options.border || {},
                elements = [
                    view.createRect(element.paddingBox, {
                        id: options.id,
                        stroke: border.width ? border.color : "",
                        strokeWidth: border.width,
                        dashType: border.dashType,
                        strokeOpacity: options.opacity,
                        fill: options.background,
                        fillOpacity: options.opacity
                    })
                ];

            return elements.concat(
                ChartElement.fn.getViewElements.call(element, view)
            );
        }
    });

    var Text = ChartElement.extend({
        init: function(content, options) {
            var text = this;

            ChartElement.fn.init.call(text, options);

            // Calculate size
            text.content = content;
            text.reflow(new Box2D());
        },

        options: {
            font: "10pt Verdana, sans-serif",
            color: BLACK,
            align: LEFT,
            vAlign: ""
        },

        reflow: function(targetBox) {
            var text = this,
                options = text.options,
                size = options.size = measureText(
                                        text.content,
                                        { font: options.font },
                                        options.rotation);

            text.baseline = size.baseline;

            if (options.align == LEFT) {
                text.box = new Box2D(
                    targetBox.x1, targetBox.y1,
                    targetBox.x1 + size.width, targetBox.y1 + size.height);
            } else if (options.align == RIGHT) {
                text.box = new Box2D(
                    targetBox.x2 - size.width, targetBox.y1,
                    targetBox.x2, targetBox.y1 + size.height);
            } else if (options.align == CENTER) {
                var margin = (targetBox.width() - size.width) / 2;
                text.box = new Box2D(
                    round(targetBox.x1 + margin, COORD_PRECISION), targetBox.y1,
                    round(targetBox.x2 - margin, COORD_PRECISION), targetBox.y1 + size.height);
            }

            if (options.vAlign == CENTER) {
                var margin = (targetBox.height() - size.height) /2;
                text.box = new Box2D(
                    text.box.x1, targetBox.y1 + margin,
                    text.box.x2, targetBox.y2 - margin);
            } else if (options.vAlign == BOTTOM) {
                text.box = new Box2D(
                    text.box.x1, targetBox.y2 - size.height,
                    text.box.x2, targetBox.y2);
            } else if (options.vAlign == TOP) {
                text.box = new Box2D(
                    text.box.x1, targetBox.y1,
                    text.box.x2, targetBox.y1 + size.height);
            }
        },

        getViewElements: function(view) {
            var text = this,
                options = text.options;

            ChartElement.fn.getViewElements.call(this, view);

            return [
                view.createText(text.content, {
                    id: options.id,
                    x: text.box.x1, y: text.box.y1,
                    baseline: text.baseline,
                    font: options.font,
                    color: options.color,
                    rotation: options.rotation,
                    size: options.size
                })
            ];
        }
    });

    var TextBox = BoxElement.extend({
        init: function(content, options) {
            var textBox = this;

            BoxElement.fn.init.call(textBox, options);

            if (!options.template) {
                content = options.format ? format(options.format, content) : content
            }

            textBox.append(
                new Text(content,
                    deepExtend({ }, textBox.options, { align: LEFT, vAlign: TOP }))
            );

            // Calculate size
            textBox.reflow(new Box2D());
        }
    });

    var BarLabel = ChartElement.extend({
        init: function(content, options) {
            var barLabel = this;
            ChartElement.fn.init.call(barLabel, options);

            barLabel.append(new TextBox(content, barLabel.options));
        },

        options: {
            font: SANS12,
            position: OUTSIDE_END,
            margin: getSpacing(2),
            padding: getSpacing(2),
            color: BLACK,
            background: "",
            border: {
                width: 0,
                color: BLACK
            },
            aboveAxis: true,
            isVertical: false
        },

        reflow: function(targetBox) {
            var barLabel = this,
                options = barLabel.options,
                isVertical = options.isVertical,
                aboveAxis = options.aboveAxis,
                text = barLabel.children[0],
                box = text.box;

            text.options.align = isVertical ? CENTER : LEFT;
            text.options.vAlign = isVertical ? TOP : CENTER;

            if (options.position == INSIDE_END) {
                if (isVertical) {
                    text.options.vAlign = TOP;

                    if (!aboveAxis && box.height() < targetBox.height()) {
                        text.options.vAlign = BOTTOM;
                    }
                } else {
                    text.options.align = aboveAxis ? RIGHT : LEFT;
                }
            } else if (options.position == CENTER) {
                text.options.vAlign = CENTER;
                text.options.align = CENTER;
            } else if (options.position == INSIDE_BASE) {
                if (isVertical) {
                    text.options.vAlign = aboveAxis ? BOTTOM : TOP;
                } else {
                    text.options.align = aboveAxis ? LEFT : RIGHT;
                }
            } else if (options.position == OUTSIDE_END) {
                if (isVertical) {
                    if (aboveAxis) {
                        targetBox = new Box2D(
                            targetBox.x1, targetBox.y1 - box.height(),
                            targetBox.x2, targetBox.y1
                        );
                    } else {
                        targetBox = new Box2D(
                            targetBox.x1, targetBox.y2,
                            targetBox.x2, targetBox.y2 + box.height()
                        );
                    }
                } else {
                    text.options.align = CENTER;
                    if (aboveAxis) {
                        targetBox = new Box2D(
                            targetBox.x2 + box.width(), targetBox.y1,
                            targetBox.x2, targetBox.y2
                        );
                    } else {
                        targetBox = new Box2D(
                            targetBox.x1 - box.width(), targetBox.y1,
                            targetBox.x1, targetBox.y2
                        );
                    }
                }
            }

            text.reflow(targetBox);
        }
    });

    var Title = ChartElement.extend({
        init: function(options) {
            var title = this;
            ChartElement.fn.init.call(title, options);

            title.append(
                new TextBox(title.options.text, deepExtend({}, title.options, {
                    vAlign: title.options.position
                }))
            );
        },

        options: {
            text: "",
            font: SANS16,
            color: BLACK,
            position: TOP,
            align: CENTER,
            margin: getSpacing(5),
            padding: getSpacing(5)
        },

        reflow: function(targetBox) {
            var title = this;

            ChartElement.fn.reflow.call(title, targetBox);
            title.box.snapTo(targetBox, X);
        }
    });

    var Legend = ChartElement.extend({
        init: function(options) {
            var legend = this;

            ChartElement.fn.init.call(legend, options);

            legend.createLabels();
        },

        options: {
            position: RIGHT,
            series: [],
            labels: {
                font: SANS12
            },
            offsetX: 0,
            offsetY: 0,
            margin: getSpacing(10),
            padding: getSpacing(5),
            border: {
                color: BLACK,
                width: 0
            },
            background: "",
            zIndex: 1
        },

        createLabels: function() {
            var legend = this,
                series = legend.options.series;

            for (var i = 0; i < series.length; i++) {
                var name = series[i].name,
                    label = new Text(name, legend.options.labels);

                legend.append(label);
            }
        },

        reflow: function(targetBox) {
            var legend = this,
                options = legend.options,
                childrenCount = legend.children.length;

            if (childrenCount === 0) {
                legend.box = targetBox.clone();
                return;
            }

            if (options.position == "custom") {
                legend.customLayout(targetBox);
                return;
            }

            if (options.position == TOP || options.position == BOTTOM) {
                legend.horizontalLayout(targetBox);
            } else {
                legend.verticalLayout(targetBox);
            }
        },

        getViewElements: function(view) {
            var legend = this,
                children = legend.children,
                options = legend.options,
                series = options.series,
                markerSize = legend.markerSize(),
                group = view.createGroup({ zIndex: options.zIndex }),
                border = options.border || {},
                labelBox;

            append(group.children, ChartElement.fn.getViewElements.call(legend, view));

            for (var i = 0, length = series.length; i < length; i++) {
                var color = series[i].color,
                    label = children[i],
                    markerBox = new Box2D(),
                    box = label.box;

                labelBox = labelBox ? labelBox.wrap(box) : box.clone();

                markerBox.x1 = box.x1 - markerSize * 2;
                markerBox.x2 = markerBox.x1 + markerSize;

                if (options.position == TOP || options.position == BOTTOM) {
                    markerBox.y1 = box.y1 + markerSize / 2;
                } else {
                    markerBox.y1 = box.y1 + (box.height() - markerSize) / 2;
                }

                markerBox.y2 = markerBox.y1 + markerSize;

                group.children.push(view.createRect(markerBox, { fill: color, stroke: color }));
            }

            // Sets the correct width of the label box
            // when the position of the legend is top or bottom.
            if (inArray(options.position, ["top", "bottom"])) {
                labelBox.x2 += markerSize * (series.length + 1);
            }

            if (children.length > 0) {
                var padding = getSpacing(options.padding);
                padding.left += markerSize * 2;
                labelBox.pad(padding);
                group.children.unshift(view.createRect(labelBox, {
                    stroke: border.width ? border.color : "",
                    strokeWidth: border.width,
                    dashType: border.dashType,
                    fill: options.background })
                );
            }

            return [ group ];
        },

        verticalLayout: function(targetBox) {
            var legend = this,
                options = legend.options,
                children = legend.children,
                childrenCount = children.length,
                labelBox = children[0].box.clone(),
                offsetX,
                offsetY,
                margin = getSpacing(options.margin),
                markerSpace = legend.markerSize() * 2;

            // Position labels below each other
            for (var i = 1; i < childrenCount; i++) {
                var label = legend.children[i];
                label.box.alignTo(legend.children[i - 1].box, BOTTOM);
                labelBox.wrap(label.box);
            }

            // Vertical center is calculated relative to the container, not the parent!
            if (options.position == LEFT) {
                offsetX = targetBox.x1 + markerSpace + margin.left;
                offsetY = (targetBox.y2 - labelBox.height()) / 2;
                labelBox.x2 += markerSpace + margin.left + margin.right;
            } else {
                offsetX = targetBox.x2 - labelBox.width() - margin.right;
                offsetY = (targetBox.y2 - labelBox.height()) / 2;
                labelBox.translate(offsetX, offsetY);
                labelBox.x1 -= markerSpace + margin.left;
            }

            legend.translateChildren(offsetX + options.offsetX,
                    offsetY + options.offsetY);

            var labelBoxWidth = labelBox.width();
            labelBox.x1 = math.max(targetBox.x1, labelBox.x1);
            labelBox.x2 = labelBox.x1 + labelBoxWidth;

            labelBox.y1 = targetBox.y1;
            labelBox.y2 = targetBox.y2;

            legend.box = labelBox;
        },

        horizontalLayout: function(targetBox) {
            var legend = this,
                options = legend.options,
                children = legend.children,
                childrenCount = children.length,
                labelBox = children[0].box.clone(),
                markerWidth = legend.markerSize() * 3,
                offsetX,
                offsetY,
                margin = getSpacing(options.margin);

            // Position labels next to each other
            for (var i = 1; i < childrenCount; i++) {
                var label = legend.children[i];
                label.box.alignTo(legend.children[i - 1].box, RIGHT);
                labelBox.wrap(label.box);
                label.box.x1 = label.box.x1 + i * markerWidth;
            }

            if (options.position == TOP) {
                offsetX = (targetBox.x2 - labelBox.width() - markerWidth) / 2;
                offsetY = targetBox.y1 + margin.top;
                labelBox.y2 = targetBox.y1 + labelBox.height() + margin.top + margin.bottom;
                labelBox.y1 = targetBox.y1;
            } else {
                offsetX = (targetBox.x2 - labelBox.width() - markerWidth) / 2;
                offsetY = targetBox.y2 - labelBox.height() - margin.bottom;
                labelBox.y1 = targetBox.y2 - labelBox.height() - margin.top - margin.bottom;
                labelBox.y2 = targetBox.y2;
            }

            legend.translateChildren(offsetX + options.offsetX,
                    offsetY + options.offsetY);

            labelBox.x1 = targetBox.x1;
            labelBox.x2 = targetBox.x2;

            legend.box = labelBox;
        },

        customLayout: function (targetBox) {
            var legend = this,
                options = legend.options,
                children = legend.children,
                childrenCount = children.length,
                labelBox = children[0].box.clone(),
                markerWidth = legend.markerSize() * 2;

            // Position labels next to each other
            for (var i = 1; i < childrenCount; i++) {
                var label = legend.children[i]
                label.box.alignTo(legend.children[i - 1].box, BOTTOM);
                labelBox.wrap(label.box);
            }

            legend.translateChildren(options.offsetX + markerWidth, options.offsetY);

            legend.box = targetBox;
        },

        markerSize: function() {
            var legend = this,
                children = legend.children;

            if (children.length > 0) {
                return children[0].box.height() / 2;
            } else {
                return 0;
            }
        }
    });

    var Axis = ChartElement.extend({
        init: function(options) {
            var axis = this;

            ChartElement.fn.init.call(axis, options);
        },

        options: {
            labels: {
                rotation: 0
            },
            line: {
                width: 1,
                color: BLACK
            },
            majorTickType: OUTSIDE,
            majorTickSize: 4,
            minorTickType: NONE,
            minorTickSize: 3,
            axisCrossingValue: 0,
            minorGridLines: {
                visible: false,
                width: 1,
                color: BLACK
            },
            margin: 5
        },

        renderTicks: function(view) {
            var axis = this,
                options = axis.options,
                isVertical = options.orientation === VERTICAL,
                box = axis.box,
                majorTicks = axis.getMajorTickPositions(),
                ticks = [];

            if (options.majorTickType.toLowerCase() === OUTSIDE) {
                ticks = ticks.concat(map(majorTicks, function(pos) {
                                        return {
                                            pos: pos,
                                            size: options.majorTickSize,
                                            width: options.line.width,
                                            color: options.line.color
                                        };
                                    }));
            }

            if (options.minorTickType.toLowerCase()  === OUTSIDE) {
                ticks = ticks.concat(map(axis.getMinorTickPositions(), function(pos) {
                            if (options.majorTickType.toLowerCase() !== NONE) {
                                if (!inArray(pos, majorTicks)) {
                                    return {
                                        pos: pos,
                                        size: options.minorTickSize,
                                        width: options.line.width,
                                        color: options.line.color
                                    };
                                }
                            } else {
                                    return {
                                        pos: pos,
                                        size: options.minorTickSize,
                                        width: options.line.width,
                                        color: options.line.color
                                    };
                            }
                        }));
            }

            return map(ticks, function(tick) {
                if (isVertical) {
                    return view.createLine(
                            box.x2 - tick.size, tick.pos, box.x2, tick.pos,
                            {
                                strokeWidth: tick.width,
                                stroke: tick.color
                            }
                    );
                } else {
                    return view.createLine(
                            tick.pos, box.y1, tick.pos, box.y1 + tick.size,
                            {
                                strokeWidth: tick.width,
                                stroke: tick.color
                            }
                    );
                }
            });
        },

        getActualTickSize: function () {
            var axis = this,
                options = axis.options,
                tickSize = 0;

            if (options.majorTickType != NONE && options.minorTickType != NONE ) {
                tickSize = math.max(options.majorTickSize, options.minorTickSize);
            } else if (options.majorTickType != NONE) {
                tickSize = options.majorTickSize;
            } else if (options.minorTickType != NONE) {
                tickSize = options.minorTickSize;
            }

            return tickSize;
        },

        arrangeLabels: function(maxLabelWidth, maxLabelHeight, positions) {
            var axis = this,
                options = axis.options,
                isVertical = axis.options.orientation === VERTICAL,
                children = axis.children,
                tickPositions = axis.getMajorTickPositions(),
                tickSize = axis.getActualTickSize();

            for (var i = 0; i < children.length; i++) {
                var label = children[i],
                    tickIx = isVertical ? (children.length - 1 - i) : i,
                    labelSize = isVertical ? label.box.height() : label.box.width(),
                    labelPos = tickPositions[tickIx] - (labelSize / 2),
                    firstTickPosition,
                    nextTickPosition,
                    middle;

                if (isVertical) {
                    if (positions == ON_MINOR_TICKS) {
                        firstTickPosition = tickPositions[i],
                        nextTickPosition = tickPositions[i + 1];

                        middle = firstTickPosition + (nextTickPosition - firstTickPosition) / 2;
                        labelPos = middle - (labelSize / 2);
                    }
                    var labelX = axis.box.x2 - options.margin - tickSize;

                    labelBox = new Box2D(labelX - label.box.width(), labelPos,
                                         labelX, labelPos)
                } else {
                    if (positions == ON_MINOR_TICKS) {
                        firstTickPosition = tickPositions[i],
                        nextTickPosition = tickPositions[i + 1];
                    } else {
                        firstTickPosition = labelPos;
                        nextTickPosition = labelPos + labelSize;
                    }
                    var labelY = axis.box.y1 + tickSize + options.margin;

                    labelBox = new Box2D(firstTickPosition, labelY,
                                         nextTickPosition, labelY);
                }

                label.reflow(labelBox);
            }
        }
    });

    var NumericAxis = Axis.extend({
        init: function(seriesMin, seriesMax, options) {
            var axis = this,
                autoMin = axis.autoAxisMin(seriesMin, seriesMax),
                autoMax = axis.autoAxisMax(seriesMin, seriesMax),
                autoOptions = {
                    min: autoMin,
                    max: autoMax,
                    majorUnit: axis.autoMajorUnit(autoMin, autoMax)
                };

            autoOptions.min = floor(autoOptions.min * 1.05, autoOptions.majorUnit);
            autoOptions.max = ceil(autoOptions.max * 1.05, autoOptions.majorUnit);

            if (options) {
                var userSetLimits = defined(options.min) || defined(options.max);
                if (userSetLimits) {
                    if (options.min === options.max) {
                        if (options.min > 0) {
                            options.min = 0;
                        } else {
                            options.max = 1;
                        }
                    }
                }

                if (options.majorUnit) {
                    autoOptions.min = floor(autoOptions.min, options.majorUnit);
                    autoOptions.max = ceil(autoOptions.max, options.majorUnit);
                } else if (userSetLimits) {
                    options = deepExtend(autoOptions, options);

                    // Determine an auto major unit after min/max have been set
                    autoOptions.majorUnit = axis.autoMajorUnit(options.min, options.max);
                }
            }

            Axis.fn.init.call(axis, deepExtend(autoOptions, options));

            options = axis.options;

            var majorDivisions = axis.getDivisions(options.majorUnit),
                currentValue = options.min,
                align = options.orientation === VERTICAL ? RIGHT : CENTER,
                labelOptions = deepExtend({ }, options.labels, { align: align }),
                labelText;

            for (var i = 0; i < majorDivisions; i++) {
                if (labelOptions.template) {
                    var labelTemplate = baseTemplate(labelOptions.template);
                    labelText = labelTemplate({ value: currentValue });
                }

                var text = new TextBox(labelText || currentValue, labelOptions);

                axis.append(text);

                currentValue = round(currentValue + options.majorUnit, DEFAULT_PRECISION);
            }
        },

        options: {
            min: 0,
            max: 1,
            orientation: VERTICAL,
            majorGridLines: {
                visible: true,
                width: 1,
                color: BLACK
            },
            zIndex: 1
        },

        reflow: function(targetBox) {
            var axis = this,
                options = axis.options,
                isVertical = options.orientation === VERTICAL,
                children = axis.children,
                space = axis.getActualTickSize() + options.margin,
                maxLabelWidth = 0,
                maxLabelHeight = 0;

            for (var i = 0; i < children.length; i++) {
                var label = children[i];
                maxLabelWidth = math.max(maxLabelWidth, label.box.width());
                maxLabelHeight = math.max(maxLabelHeight, label.box.height());
            }

            if (isVertical) {
                axis.box = new Box2D(
                    targetBox.x1, targetBox.y1,
                    targetBox.x1 + maxLabelWidth + space, targetBox.y2
                );
            } else {
                axis.box = new Box2D(
                    targetBox.x1, targetBox.y1,
                    targetBox.x2, targetBox.y1 + maxLabelHeight + space
                );
            }

            axis.arrangeLabels(maxLabelWidth, maxLabelHeight);
        },

        getViewElements: function(view) {
            var axis = this,
                options = axis.options,
                isVertical = options.orientation === VERTICAL,
                childElements = ChartElement.fn.getViewElements.call(axis, view);

            var tickPositions = axis.getMinorTickPositions();
            if (options.line.width > 0) {
                var lineOptions = {
                        strokeWidth: options.line.width,
                        stroke: options.line.color,
                        dashType: options.line.dashType,
                        zIndex: options.zIndex
                    };
                if (isVertical) {
                    childElements.push(view.createLine(
                        axis.box.x2, tickPositions[0],
                        axis.box.x2, tickPositions[tickPositions.length - 1],
                        lineOptions));
                } else {
                    childElements.push(view.createLine(
                        tickPositions[0], axis.box.y1,
                        tickPositions[tickPositions.length - 1], axis.box.y1,
                        lineOptions));
                }

                append(childElements, axis.renderTicks(view));
            }

            return childElements;
        },

        autoMajorUnit: function (min, max) {
            var diff = max - min;

            if (diff == 0) {
                if (max == 0) {
                    return 0.1;
                }

                diff = math.abs(max);
            }

            var scale = math.pow(10, math.floor(math.log(diff) / math.log(10))),
                relativeValue = round((diff / scale), DEFAULT_PRECISION),
                scaleMultiplier = 1;

            if (relativeValue < 1.904762) {
                scaleMultiplier = 0.2;
            } else if (relativeValue < 4.761904) {
                scaleMultiplier = 0.5;
            } else if (relativeValue < 9.523809) {
                scaleMultiplier = 1;
            } else {
                scaleMultiplier = 2;
            }

            return round(scale * scaleMultiplier, DEFAULT_PRECISION);
        },

        autoAxisMax: function(min, max) {
            if (min == 0 && max == 0) {
                return 1;
            }

            var axisMax;
            if (min <= 0 && max <= 0) {
                max = min == max ? 0 : max;

                var diff = math.abs((max - min) / max);
                if(diff > ZERO_THRESHOLD) {
                    return 0;
                }

                axisMax = max - ((min - max) / 2);
            } else {
                min = min == max ? 0 : min;
                axisMax = max;
            }

            return axisMax;
        },

        autoAxisMin: function(min, max) {
            if (min == 0 && max == 0) {
                return 0;
            }

            var axisMin;
            if (min >= 0 && max >= 0) {
                min = min == max ? 0 : min;

                var diff = (max - min) / max;
                if(diff > ZERO_THRESHOLD) {
                    return 0;
                }

                axisMin = min - ((max - min) / 2);
            } else {
                max = min == max ? 0 : max;
                axisMin = min;
            }

            return axisMin;
        },

        getDivisions: function(stepValue) {
            var options = this.options,
                range = options.max - options.min;

            return math.floor(round(range / stepValue, COORD_PRECISION)) + 1;
        },

        getTickPositions: function(stepValue) {
            var axis = this,
                options = axis.options,
                isVertical = options.orientation === VERTICAL,
                lineBox = axis.getAxisLineBox(),
                lineSize = isVertical ? lineBox.height() : lineBox.width(),
                range = options.max - options.min,
                scale = lineSize / range,
                step = stepValue * scale,
                divisions = axis.getDivisions(stepValue),
                pos = lineBox[isVertical ? "y2" : "x1"],
                multuplier = isVertical ? -1 : 1,
                positions = [];

            for (var i = 0; i < divisions; i++) {
                positions.push(round(pos, COORD_PRECISION));
                pos = pos + step * multuplier;
            }

            return isVertical ? positions.reverse() : positions;
        },

        getMajorTickPositions: function() {
            var axis = this;

            return axis.getTickPositions(axis.options.majorUnit);
        },

        getMinorTickPositions: function() {
            var axis = this;

            return axis.getTickPositions(axis.options.majorUnit / 5);
        },

        getAxisLineBox: function() {
            var axis = this,
                options = axis.options,
                isVertical = options.orientation === VERTICAL,
                labelSize = isVertical ? "height" : "width",
                children = axis.children,
                box = axis.box,
                startMargin = 0,
                endMargin = 0;

            if (children.length > 1) {
                startMargin = children[0].box[labelSize]() / 2;
                endMargin = children[children.length - 1].box[labelSize]() / 2;
            }

            if (isVertical) {
               return new Box2D(box.x2, box.y1 + startMargin,
                 box.x2, box.y2 - endMargin);
            } else {
               return new Box2D(box.x1 + startMargin, box.y1,
                 box.x2 - endMargin, box.y1);
            }
        },

        getSlot: function(a, b) {
            var axis = this,
                options = axis.options,
                isVertical = options.orientation === VERTICAL,
                valueAxis = isVertical ? Y : X,
                lineBox = axis.getAxisLineBox(),
                lineStart = lineBox[valueAxis + 1],
                lineSize = isVertical ? lineBox.height() : lineBox.width(),
                scale = lineSize / (options.max - options.min),
                a = defined(a) ? a : options.axisCrossingValue,
                b = defined(b) ? b : options.axisCrossingValue,
                a = math.max(math.min(a, options.max), options.min),
                b = math.max(math.min(b, options.max), options.min),
                p1,
                p2,
                slotBox = new Box2D(lineBox.x1, lineBox.y1, lineBox.x1, lineBox.y1);

            if (isVertical) {
                p1 = lineStart + scale * (options.max - math.max(a, b));
                p2 = lineStart + scale * (options.max - math.min(a, b));
            } else {
                p1 = lineStart + scale * (math.min(a, b) - options.min);
                p2 = lineStart + scale * (math.max(a, b) - options.min);
            }

            slotBox[valueAxis + 1] = p1;
            slotBox[valueAxis + 2] = p2;

            return slotBox;
        }
    });

    var CategoryAxis = Axis.extend({
        init: function(options) {
            var axis = this;
            Axis.fn.init.call(axis, options);

            var options = axis.options,
                align = options.orientation === VERTICAL ? RIGHT : CENTER,
                labelOptions = deepExtend({ }, options.labels, { align: align });

            for (var i = 0; i < options.categories.length; i++) {
                var content = options.categories[i];

                if (labelOptions.template) {
                    var labelTemplate = baseTemplate(labelOptions.template);
                    content = labelTemplate({ value: content });
            }

                axis.append(new TextBox(content, labelOptions));
            }
        },

        options: {
            categories: [],
            orientation: HORIZONTAL,
            majorGridLines: {
                visible: false,
                width: 1,
                color: BLACK
            },
            zIndex: 1
        },

        reflow: function(targetBox) {
            var axis = this,
                options = axis.options,
                isVertical = options.orientation === VERTICAL,
                children = axis.children,
                space = axis.getActualTickSize() + options.margin,
                maxLabelHeight = 0,
                maxLabelWidth = 0;

            for (var i = 0; i < children.length; i++) {
                var label = children[i];
                maxLabelHeight = math.max(maxLabelHeight, label.box.height());
                maxLabelWidth = math.max(maxLabelWidth, label.box.width());
            }

            if (isVertical) {
                axis.box = new Box2D(
                    targetBox.x1, targetBox.y1,
                    targetBox.x1 + maxLabelWidth + space, targetBox.y2
                );
            } else {
                axis.box = new Box2D(
                    targetBox.x1, targetBox.y1,
                    targetBox.x2, targetBox.y1 + maxLabelHeight + space
                );
            }

            axis.arrangeLabels(maxLabelWidth, maxLabelHeight, ON_MINOR_TICKS);
        },

        getViewElements: function(view) {
            var axis = this,
                options = axis.options,
                line = options.line,
                isVertical = options.orientation === VERTICAL,
                childElements = ChartElement.fn.getViewElements.call(axis, view);

            if (line.width > 0) {
                var lineOptions = {
                        strokeWidth: line.width,
                        stroke: line.color,
                        dashType: line.dashType,
                        zIndex: line.zIndex
                    };

                if (isVertical) {
                    childElements.push(view.createLine(
                        axis.box.x2, axis.box.y1, axis.box.x2, axis.box.y2,
                        lineOptions));
                } else {
                    childElements.push(view.createLine(
                        axis.box.x1, axis.box.y1, axis.box.x2, axis.box.y1,
                        lineOptions));
                }

                append(childElements, axis.renderTicks(view));
            }

            return childElements;
        },

        getTickPositions: function(itemsCount) {
            var axis = this,
                options = axis.options,
                isVertical = options.orientation === VERTICAL,
                size = isVertical ? axis.box.height() : axis.box.width(),
                step = size / itemsCount,
                pos = isVertical ? axis.box.y1 : axis.box.x1,
                positions = [];

            for (var i = 0; i < itemsCount; i++) {
                positions.push(round(pos, COORD_PRECISION));
                pos += step;
            }

            positions.push(isVertical ? axis.box.y2 : axis.box.x2);

            return positions;
        },

        getMajorTickPositions: function() {
            var axis = this;

            return axis.getTickPositions(axis.options.categories.length);
        },

        getMinorTickPositions: function() {
            var axis = this;

            return axis.getTickPositions(axis.options.categories.length * 2);
        },

        getSlot: function(categoryIx) {
            var axis = this,
                options = axis.options,
                isVertical = options.orientation === VERTICAL,
                children = axis.children,
                box = axis.box,
                size = isVertical ? box.height() : box.width(),
                startPos = isVertical ? box.y1 : box.x1,
                step = size / math.max(1, children.length),
                p1 = startPos + (categoryIx * step),
                p2 = p1 + step;

            return isVertical ?
                   new Box2D(box.x2, p1, box.x2, p2) :
                   new Box2D(p1, box.y1, p2, box.y1);
        },

        getAxisLineBox: function() {
            var axis = this,
                options = axis.options;

            return axis.getSlot(0).wrap(axis.getSlot(options.categories.length - 1));
        }
    });

    var ClusterLayout = ChartElement.extend({
        init: function(options) {
            var cluster = this;
            ChartElement.fn.init.call(cluster, options);
        },

        options: {
            isVertical: false,
            gap: 0,
            spacing: 0
        },

        reflow: function(box) {
            var cluster = this,
                options = cluster.options,
                isVertical = options.isVertical,
                axis = isVertical ? Y : X,
                children = cluster.children,
                gap = options.gap,
                spacing = options.spacing,
                count = children.length,
                slots = count + gap + (spacing * (count - 1)),
                slotSize = (isVertical ? box.height() : box.width()) / slots,
                position = box[axis + 1] + slotSize * (gap / 2);

            for (var i = 0; i < count; i++) {
                var childBox = (children[i].box || box).clone();

                childBox[axis + 1] = position;
                childBox[axis + 2] = position + slotSize;

                children[i].reflow(childBox);
                if (i < count - 1) {
                    position += (slotSize * spacing);
                }

                position += slotSize;
            }
        }
    });

    var StackLayout = ChartElement.extend({
        init: function(options) {
            var stack = this;
            ChartElement.fn.init.call(stack, options);
        },

        options: {
            isVertical: true,
            isReversed: false
        },

        reflow: function(targetBox) {
            var stack = this,
                options = stack.options,
                isVertical = options.isVertical,
                positionAxis = isVertical ? X : Y,
                children = stack.children,
                box = stack.box = new Box2D(),
                stackDirection;

            if (options.isReversed) {
                stackDirection = isVertical ? BOTTOM : LEFT;
            } else {
                stackDirection = isVertical ? TOP : RIGHT;
            }

            for (var i = 0; i < children.length; i++) {
                var currentChild = children[i],
                    childBox = currentChild.box.clone();

                childBox.snapTo(targetBox, positionAxis)

                if (i > 0) {
                    childBox.alignTo(children[i - 1].box, stackDirection);
                } else {
                    box = stack.box = childBox.clone();
                }

                currentChild.reflow(childBox);

                box.wrap(childBox);
            }
        }
    });

    var Bar = ChartElement.extend({
        init: function(value, options) {
            var bar = this;

            bar.value = value;
            bar.options.id = uniqueId();

            ChartElement.fn.init.call(bar, options);
        },

        options: {
            color: WHITE,
            border: {
                width: 1
            },
            isVertical: true,
            overlay: GLASS,
            aboveAxis: true,
            labels: {
                visible: false
            }
        },

        render: function() {
            var bar = this,
                value = bar.value,
                options = bar.options,
                labels = options.labels,
                labelText = value;

            if (bar._rendered) {
                return;
            } else {
                bar._rendered = true;
            }

            if (labels.visible && value) {
                if (labels.template) {
                    var labelTemplate = baseTemplate(labels.template);
                    labelText = labelTemplate({
                        dataItem: bar.dataItem,
                        category: bar.category,
                        value: bar.value,
                        series: bar.series
                    });
                }

                bar.append(
                    new BarLabel(labelText, deepExtend({
                            isVertical: options.isVertical,
                            id: uniqueId()},
                        options.labels)
                    )
                );
            }
        },

        reflow: function(targetBox) {
            this.render();

            var bar = this,
                children = bar.children,
                label = children[0];

            bar.box = targetBox;

            if (label) {
                label.options.aboveAxis = bar.options.aboveAxis;
                label.reflow(targetBox);
            }
        },

        getViewElements: function(view) {
            var bar = this,
                options = bar.options,
                isVertical = options.isVertical,
                border = options.border.width > 0 ? {
                    stroke: bar.getBorderColor(),
                    strokeWidth: options.border.width,
                    dashType: options.border.dashType
                } : {},
                box = bar.box,
                rectStyle = deepExtend({
                    id: options.id,
                    fill: options.color,
                    overlay: options.overlay,
                    normalAngle: isVertical ? 0 : 90,
                    fillOpacity: options.opacity,
                    strokeOpacity: options.opacity
                }, border),
                elements = [],
                label = bar.children[0];

            elements.push(
                view.createRect(box, rectStyle)
            );
            append(elements,
                ChartElement.fn.getViewElements.call(bar, view)
            );

            bar.registerId(options.id);
            if (label) {
                bar.registerId(label.options.id);
            }

            return elements;
        },

        getOutlineElement: function(view, options){
            var bar = this,
                box = bar.box,
                outlineId = bar.options.id + OUTLINE_SUFFIX;

            bar.registerId(outlineId);
            options = deepExtend({}, options, { id: outlineId });

            return view.createRect(box, options);
        },

        getBorderColor: function() {
            var bar = this,
                options = bar.options,
                color = options.color,
                borderColor = options.border.color;

            if (!defined(borderColor)) {
                borderColor =
                    new Color(color).brightness(BAR_BORDER_BRIGHTNESS).toHex();
            }

            return borderColor;
        }
    });

    var CategoricalChart = ChartElement.extend({
        init: function(plotArea, options) {
            var chart = this;
            ChartElement.fn.init.call(chart, options);

            chart.plotArea = plotArea;
            chart._seriesMin = Number.MAX_VALUE;
            chart._seriesMax = - Number.MAX_VALUE;

            chart.points = [];
            chart.categoryPoints = [];
            chart.seriesPoints = [];

            chart.render();
        },

        options: {
            series: [],
            isVertical: true,
            isStacked: false
        },

        render: function() {
            var chart = this;

            chart.traverseDataPoints(proxy(chart.addValue, chart));
        },

        addValue: function(value, category, categoryIx, series, seriesIx) {
            var chart = this,
                point,
                categoryPoints = chart.categoryPoints[categoryIx],
                seriesPoints = chart.seriesPoints[seriesIx];

            if (!categoryPoints) {
                chart.categoryPoints[categoryIx] = categoryPoints = [];
            }

            if (!seriesPoints) {
                chart.seriesPoints[seriesIx] = seriesPoints = [];
            }

            chart.updateRange(value, categoryIx);

            point = chart.createPoint(value, category, categoryIx, series, seriesIx);
            if (point) {
                point.category = category;
                point.series = series;
                point.seriesIx = seriesIx;
                point.owner = chart;
                point.dataItem = series.dataItems ?
                    series.dataItems[categoryIx] : { value: value };
            }

            chart.points.push(point);
            seriesPoints.push(point);
            categoryPoints.push(point);
        },

        updateRange: function(value, categoryIx) {
            var chart = this;

            if (defined(value)) {
                chart._seriesMin = math.min(chart._seriesMin, value);
                chart._seriesMax = math.max(chart._seriesMax, value);
            }
        },

        valueRange: function() {
            var chart = this;

            if (chart.points.length) {
                return { min: chart._seriesMin, max: chart._seriesMax };
            }

            return null;
        },

        reflow: function(targetBox) {
            var chart = this,
                options = chart.options,
                isVertical = options.isVertical,
                plotArea = chart.plotArea,
                pointIx = 0,
                categorySlots = chart.categorySlots = [],
                chartPoints = chart.points,
                valueAxis = isVertical ? plotArea.axisY : plotArea.axisX,
                axisCrossingValue = valueAxis.options.axisCrossingValue;

            chart.traverseDataPoints(function(value, category, categoryIx) {
                var point = chartPoints[pointIx++];
                if (point && point.plotValue) {
                    value = point.plotValue;
                }

                var slotX = plotArea.axisX.getSlot(isVertical ? categoryIx : value),
                    slotY = plotArea.axisY.getSlot(isVertical ? value : categoryIx),
                    pointSlot = new Box2D(slotX.x1, slotY.y1, slotX.x2, slotY.y2),
                    aboveAxis = value >= axisCrossingValue;

                if (point) {
                    point.options.aboveAxis = aboveAxis;
                    point.reflow(pointSlot);
                }

                if(!categorySlots[categoryIx]) {
                    categorySlots[categoryIx] = isVertical ? slotX : slotY;
                }
            });

            chart.reflowCategories(categorySlots);

            chart.box = targetBox;
        },

        reflowCategories: function() { },

        traverseDataPoints: function(callback) {
            var chart = this,
            options = chart.options,
            series = options.series,
            categories = chart.plotArea.options.categoryAxis.categories || [],
            categoriesCount = chart.categoriesCount(),
            categoryIx,
            seriesIx,
            value,
            currentCategory,
            currentSeries;

            for (categoryIx = 0; categoryIx < categoriesCount; categoryIx++) {
                for (seriesIx = 0; seriesIx < series.length; seriesIx++) {
                    currentCategory = categories[categoryIx];
                    currentSeries = series[seriesIx];
                    value = currentSeries.data[categoryIx];

                    callback(value, currentCategory, categoryIx, currentSeries, seriesIx);
                }
            }
        },

        categoriesCount: function() {
            var chart = this,
                series = chart.options.series,
                categories = 0;

            for (var i = 0, length = series.length; i < length; i++) {
                categories = math.max(categories, series[i].data.length);
            }

            return categories;
        },

        getSeriesPoint: function(x, y, seriesIx) {
            var chart = this,
                isVertical = chart.options.isVertical,
                axis = isVertical ? X : Y,
                pos = isVertical ? x : y,
                points = chart.seriesPoints[seriesIx],
                i,
                pointsLength = points.length,
                currentPoint,
                pointBox,
                pointDistance,
                nearestPoint,
                nearestPointDistance = Number.MAX_VALUE;

            for (i = 0; i < pointsLength; i++) {
                currentPoint = points[i];

                if (currentPoint && defined(currentPoint.value) && currentPoint.value !== null) {
                    pointBox = currentPoint.box;
                    pointDistance = math.abs(pointBox.center()[axis] - pos);

                    if (pointDistance < nearestPointDistance) {
                        nearestPoint = currentPoint;
                        nearestPointDistance = pointDistance;
                    }
                }
            }

            return nearestPoint;
        }
    });

    var BarChart = CategoricalChart.extend({
        init: function(plotArea, options) {
            var chart = this;

            chart._categoryTotalsPos = [];
            chart._categoryTotalsNeg = [];

            CategoricalChart.fn.init.call(chart, plotArea, options);
        },

        createPoint: function(value, category, categoryIx, series, seriesIx) {
            var barChart = this,
                options = barChart.options,
                children = barChart.children,
                isStacked = barChart.options.isStacked,
                labelOptions = deepExtend({}, series.labels);

            if (isStacked) {
                if (labelOptions.position == OUTSIDE_END) {
                    labelOptions.position = INSIDE_END;
                }
            }

            var bar = new Bar(value, {
                color: series.color,
                opacity: series.opacity,
                border: series.border,
                isVertical: options.isVertical,
                overlay: series.overlay,
                labels: labelOptions
            });

            var cluster = children[categoryIx];
            if (!cluster) {
                cluster = new ClusterLayout({
                    isVertical: !options.isVertical,
                    gap: options.gap,
                    spacing: options.spacing
                });
                barChart.append(cluster);
            }

            if (isStacked) {
                var stackWrap = cluster.children[0],
                positiveStack,
                negativeStack;

                if (!stackWrap) {
                    stackWrap = new ChartElement();
                    cluster.append(stackWrap);

                    positiveStack = new StackLayout({
                        isVertical: options.isVertical
                    });
                    negativeStack = new StackLayout({
                        isVertical: options.isVertical,
                        isReversed: true
                    });
                    stackWrap.append(positiveStack, negativeStack);
                } else {
                    positiveStack = stackWrap.children[0];
                    negativeStack = stackWrap.children[1];
                }

                if (value > 0) {
                    positiveStack.append(bar);
                } else {
                    negativeStack.append(bar);
                }
            } else {
                cluster.append(bar);
            }

            return bar;
        },

        updateRange: function(value, categoryIx) {
            var chart = this,
                options = chart.options,
                isStacked = options.isStacked,
                totalsPos = chart._categoryTotalsPos,
                totalsNeg = chart._categoryTotalsNeg;

            if (defined(value)) {
                if (isStacked) {
                    incrementSlot(value > 0 ? totalsPos : totalsNeg, categoryIx, value);
                } else {
                    CategoricalChart.fn.updateRange.apply(chart, arguments);
                }
            }
        },

        valueRange: function() {
            var chart = this,
                options = chart.options,
                isStacked = options.isStacked,
                totalsPos = chart._categoryTotalsPos,
                totalsNeg = chart._categoryTotalsNeg;

            if (isStacked) {
                chart._seriesMin = sparseArrayMin(totalsNeg.concat(0));
                chart._seriesMax = sparseArrayMax(totalsPos.concat(0));
            }

            return CategoricalChart.fn.valueRange.call(chart);
        },

        reflowCategories: function(categorySlots) {
            var chart = this,
                children = chart.children,
                childrenLength = children.length,
                i;

            for (i = 0; i < childrenLength; i++) {
                children[i].reflow(categorySlots[i]);
            }
       }
    });

    var ShapeElement = BoxElement.extend({
        init: function(options) {
            var marker = this;

            BoxElement.fn.init.call(marker, options);
        },

        options: {
            type: SQUARE,
            align: CENTER,
            vAlign: CENTER
        },

        getViewElements: function(view, renderOptions) {
            var marker = this,
                options = marker.options,
                type = options.type,
                box = marker.box,
                element = BoxElement.fn.getViewElements.call(marker, view)[0],
                halfWidth = box.width() / 2;

            if (type === TRIANGLE) {
                element = view.createPath([
                    [box.x1 + halfWidth, box.y1],
                    [box.x1, box.y2],
                    [box.x2, box.y2]
                ], deepExtend({}, element.options, renderOptions));
            } else if (type === CIRCLE) {
                element = view.createCircle([
                    round(box.x1 + halfWidth, COORD_PRECISION),
                    round(box.y1 + box.height() / 2, COORD_PRECISION)
                ], halfWidth, deepExtend({}, element.options, renderOptions));
            }

            return [ element ];
        }
    });

    var LinePoint = ChartElement.extend({
        init: function(value, options) {
            var point = this;

            point.value = value;

            ViewElement.fn.init.call(point, options);
        },

        options: {
            aboveAxis: true,
            isVertical: true,
            markers: {
                visible: true,
                background: BLACK,
                size: LINE_MARKER_SIZE,
                type: LINE_MARKER_SQUARE,
                border: {
                    width: 1
                },
                opacity: 1
            },
            labels: {
                visible: false,
                position: ABOVE
            }
        },

        render: function() {
            var point = this,
                options = point.options,
                markers = options.markers,
                labels = options.labels,
                markerBackground = markers.background,
                markerBorder = deepExtend({}, markers.border),
                labelText = point.value;

            if (point._rendered) {
                return;
            } else {
                point._rendered = true;
            }

            if (!defined(markerBorder.color)) {
                markerBorder.color =
                    new Color(markerBackground).brightness(BAR_BORDER_BRIGHTNESS).toHex();
            }

            if (labels.template) {
                var labelTemplate = baseTemplate(labels.template);
                labelText = labelTemplate({
                    dataItem: point.dataItem,
                    category: point.category,
                    value: point.value,
                    series: point.series
                });
            }

            point.marker = new ShapeElement({
                    id: uniqueId(),
                    visible: markers.visible,
                    type: markers.type,
                    width: markers.size,
                    height: markers.size,
                    background: markerBackground,
                    border: markerBorder,
                    opacity: markers.opacity
            });

            point.append(point.marker);

            if (labels.visible) {
                point.label = new TextBox(labelText,
                    deepExtend({
                    id: uniqueId(),
                    align: CENTER,
                    vAlign: CENTER,
                    margin: {
                        left: 5,
                        right: 5
                    }
                    }, labels)
            );
                point.append(point.label);
            }
        },

        markerBox: function() {
            return this.marker.box;
        },

        reflow: function(targetBox) {
            var point = this,
                options = point.options,
                isVertical = options.isVertical,
                aboveAxis = options.aboveAxis,
                childBox;

            point.render();

            point.box = targetBox;
            childBox = targetBox.clone();

            if (isVertical) {
                if (aboveAxis) {
                    childBox.y1 -= childBox.height();
                } else {
                    childBox.y2 += childBox.height();
                }
            } else {
                if (aboveAxis) {
                    childBox.x1 += childBox.width();
                } else {
                    childBox.x2 -= childBox.width();
                }
            }

            point.marker.reflow(childBox);
            point.reflowLabel(childBox);
        },

        reflowLabel: function(box) {
            var point = this,
                options = point.options,
                marker = point.marker,
                label = point.label,
                edge = options.labels.position;

            if (label) {
                edge = edge === ABOVE ? TOP : edge;
                edge = edge === BELOW ? BOTTOM : edge;

                label.reflow(box);
                label.box.alignTo(marker.box, edge);
                label.reflow(label.box);
            }
        },

        getViewElements: function(view) {
            var element = this,
                marker = element.marker,
                label = element.label;

            element.registerId(marker.options.id);

            if (label) {
                element.registerId(label.options.id);
            }

            return ChartElement.fn.getViewElements.call(element, view);
        },

        getOutlineElement: function(view, options) {
            var element = this,
                marker = element.marker,
                outlineId = element.marker.options.id + OUTLINE_SUFFIX;

            element.registerId(outlineId);
            options = deepExtend({}, options, { id: outlineId });

            return marker.getViewElements(view, options)[0];
        }
    });

    var LineChart = CategoricalChart.extend({
        init: function(plotArea, options) {
            var chart = this;

            chart._categoryTotals = [];

            CategoricalChart.fn.init.call(chart, plotArea, options);
        },

        createPoint: function(value, category, categoryIx, series, seriesIx) {
            var chart = this,
                options = chart.options,
                isStacked = options.isStacked,
                categoryPoints = chart.categoryPoints[categoryIx],
                stackPoint,
                plotValue = 0;

            if (!defined(value) || value === null) {
                if (isStacked || series.missingValues === ZERO) {
                    value = 0;
                } else {
                    return null;
                }
            }

            var point = new LinePoint(value,
                deepExtend({
                    isVertical: options.isVertical,
                    markers: {
                        background: series.color,
                        opacity: series.opacity
                    }
                }, series)
            );

            if (isStacked) {
                stackPoint = categoryPoints[categoryPoints.length - 1];
                if (stackPoint) {
                    plotValue = stackPoint.plotValue;
                }

                point.plotValue = value + plotValue;
            }

            chart.append(point);

            return point;
        },

        updateRange: function(value, categoryIx) {
            var chart = this,
                options = chart.options,
                isStacked = options.isStacked,
                totals = chart._categoryTotals;

            if (defined(value)) {
                if (isStacked) {
                    incrementSlot(totals, categoryIx, value);
                    chart._seriesMin = math.min(chart._seriesMin, sparseArrayMin(totals));
                    chart._seriesMax = math.max(chart._seriesMax, sparseArrayMax(totals));
                } else {
                    CategoricalChart.fn.updateRange.apply(chart, arguments);
                }
            }
        },

        getViewElements: function(view) {
            var chart = this,
                options = chart.options,
                elements = CategoricalChart.fn.getViewElements.call(chart, view),
                series = options.series,
                currentSeries,
                seriesIx,
                seriesPoints = chart.seriesPoints,
                seriesCount = seriesPoints.length,
                currentSeriesPoints,
                pointIx,
                pointCount,
                point,
                pointCenter,
                linePoints,
                interpolate,
                lines = [];

            for (seriesIx = 0; seriesIx < seriesCount; seriesIx++) {
                currentSeriesPoints = seriesPoints[seriesIx];
                pointCount = currentSeriesPoints.length;
                currentSeries = series[seriesIx];
                linePoints = [];
                interpolate = currentSeries.missingValues === INTERPOLATE;

                for (pointIx = 0; pointIx < pointCount; pointIx++) {
                    point = currentSeriesPoints[pointIx];
                    if (point) {
                        pointCenter = point.markerBox().center();
                        linePoints.push([pointCenter.x, pointCenter.y]);
                    } else if (!interpolate) {
                        if (linePoints.length > 1) {
                            lines.push(chart.createLine(view, linePoints, currentSeries, seriesIx));
                        }
                        linePoints = [];
                    }
                }

                if (linePoints.length > 1) {
                    lines.push(chart.createLine(view, linePoints, currentSeries, seriesIx));
                }
            }

            return lines.concat(elements);
        },

        createLine: function(view, points, series, seriesIx) {
            var lineId = uniqueId();
            this.registerId(lineId, { seriesIx: seriesIx });
            return view.createPath(points, {
                id: lineId,
                stroke: series.color,
                strokeWidth: series.width,
                strokeOpacity: series.opacity,
                fill: "",
                dashType: series.dashType
            });
        }
    });

    var PlotArea = ChartElement.extend({
        init: function(options) {
            var plotArea = this;
            ChartElement.fn.init.call(plotArea, options);

            plotArea.render();
        },

        options: {
            categoryAxis: { },
            valueAxis: { },
            series: [ ],
            plotArea: {
                margin: {}
            },
            background: "",
            border: {
                color: BLACK,
                width: 0
            }
        },

        render: function() {
            var plotArea = this,
                options = plotArea.options,
                charts = plotArea.charts = [],
                range = { min: 0, max: 1 },
                categories = options.categoryAxis.categories,
                invertAxes = options.categoryAxis.orientation === VERTICAL,
                i,
                series = options.series,
                seriesLength = series.length,
                currentSeries,
                barSeries = [],
                lineSeries = [],
                barChart,
                lineChart,
                categoriesToAdd,
                firstSeries;

            for (i = 0; i < seriesLength; i++) {
                currentSeries = series[i];

                if (currentSeries.type === BAR || currentSeries.type === COLUMN) {
                    barSeries.push(currentSeries);
                } else if (currentSeries.type === LINE) {
                    lineSeries.push(currentSeries);
                }
            }

            if (barSeries.length > 0) {
                firstSeries = barSeries[0];
                invertAxes = firstSeries.type === BAR;
                barChart = new BarChart(this, {
                        series: barSeries,
                        isVertical: !invertAxes,
                        isStacked: firstSeries.stack,
                        gap: firstSeries.gap,
                        spacing: firstSeries.spacing
                    });

                categoriesToAdd = math.max(0, barChart.categoriesCount() - categories.length);
                append(options.categoryAxis.categories, new Array(categoriesToAdd));

                range = barChart.valueRange() || range;
                charts.push(barChart);
            }

            if (lineSeries.length > 0) {
                firstSeries = lineSeries[0];
                lineChart = new LineChart(this, {
                    // TODO: Rename isVertical to invertAxes, flip logic
                    isVertical: !invertAxes,
                    isStacked: firstSeries.stack,
                    series: lineSeries
                });

                categoriesToAdd = math.max(0, lineChart.categoriesCount() - categories.length);
                append(options.categoryAxis.categories, new Array(categoriesToAdd));

                var lineChartRange = lineChart.valueRange() || range;
                range.min = math.min(range.min, lineChartRange.min);
                range.max = math.max(range.max, lineChartRange.max);
                charts.push(lineChart);
            }

            plotArea.append.apply(plotArea, charts);

            plotArea.createAxes(range.min, range.max, invertAxes);
        },

        createAxes: function(seriesMin, seriesMax, invertAxes) {
            var plotArea = this,
                options = plotArea.options,
                categoriesCount = options.categoryAxis.categories.length,
                categoryAxis = new CategoryAxis(deepExtend({
                        orientation: invertAxes ? VERTICAL : HORIZONTAL,
                        axisCrossingValue: invertAxes ? categoriesCount : 0
                    }, options.categoryAxis)
                ),
                valueAxis = new NumericAxis(seriesMin, seriesMax, deepExtend({
                        orientation: invertAxes ? HORIZONTAL : VERTICAL
                    }, options.valueAxis)
                );

            plotArea.axisX = invertAxes ? valueAxis : categoryAxis;
            plotArea.axisY = invertAxes ? categoryAxis : valueAxis;

            plotArea.append(plotArea.axisY);
            plotArea.append(plotArea.axisX);
        },

        reflow: function(targetBox) {
            var plotArea = this,
                charts = plotArea.charts,
                axisY = plotArea.axisY,
                axisX = plotArea.axisX,
                options = plotArea.options.plotArea,
                margin = getSpacing(options.margin);

            plotArea.box = targetBox.clone();
            plotArea.box.unpad(margin);
            axisY.reflow(plotArea.box);
            axisX.reflow(plotArea.box);

            plotArea.alignAxes();

            var axisBox = axisY.box.clone().wrap(axisX.box);

            var overflowY = axisBox.height() - plotArea.box.height();
            var overflowX = axisBox.width() - plotArea.box.width();

            var offsetX = plotArea.box.x1 - axisBox.x1;
            var offsetY = plotArea.box.y1 - axisBox.y1;

            axisY.reflow(
                axisY.box.translate(offsetX, offsetY).shrink(0, overflowY)
            );

            axisX.reflow(
                axisX.box.translate(offsetX, offsetY).shrink(overflowX, 0)
            );

            plotArea.alignAxes();

            for (var i = 0; i < charts.length; i++) {
                charts[i].reflow(plotArea.box);
            }
            var lineBoxX = axisX.getAxisLineBox(),
                lineBoxY = axisY.getAxisLineBox();

            plotArea.box = lineBoxX.clone().wrap(lineBoxY);
        },

        alignAxes: function() {
            var plotArea = this,
                axisY = plotArea.axisY,
                axisX = plotArea.axisX,
                crossingValueY = axisY.options.axisCrossingValue,
                axisCrossingY = axisY.getSlot(crossingValueY, crossingValueY),
                crossingValueX = axisX.options.axisCrossingValue,
                axisCrossingX = axisX.getSlot(crossingValueX, crossingValueX);

            axisY.reflow(
                axisY.box.translate(axisCrossingX.x1 - axisCrossingY.x1, 0)
            );

            axisX.reflow(
                axisX.box.translate(0, axisCrossingY.y1 - axisCrossingX.y1)
            );
        },

        renderGridLines: function(view, axis, secondaryAxis) {
            var options = axis.options,
                isVertical = options.orientation === VERTICAL,
                boundaries = secondaryAxis.getMajorTickPositions(),
                crossingSlot = axis.getSlot(options.axisCrossingValue),
                secAxisPos = round(crossingSlot[isVertical ? "y1" : "x1"]),
                lineStart = boundaries[0],
                lineEnd = boundaries.pop(),
                linePos,
                majorTicks = axis.getMajorTickPositions(),
                gridLines = [];

                if (options.majorGridLines.visible) {
                    gridLines = map(majorTicks, function(pos) {
                                    return {
                                        pos: pos,
                                        options: options.majorGridLines
                                    };
                                });
                }

                if (options.minorGridLines.visible) {
                    gridLines = gridLines.concat(
                        map(axis.getMinorTickPositions(), function(pos) {
                            if (options.majorGridLines.visible) {
                                if (!inArray(pos, majorTicks)) {
                                    return {
                                        pos: pos,
                                        options: options.minorGridLines
                                    };
                                }
                            } else {
                                return {
                                    pos: pos,
                                    options: options.minorGridLines
                                };
                            }
                        }
                    ));
                }

                return map(gridLines, function(line) {
                    var gridLineOptions = {
                            strokeWidth: line.options.width,
                            stroke: line.options.color,
                            dashType: line.options.dashType
                        }
                    linePos = round(line.pos);

                    if (secAxisPos === linePos) {
                        return null;
                    }

                    if (isVertical) {
                        return view.createLine(
                            lineStart, linePos, lineEnd, linePos,
                            gridLineOptions);
                    } else {
                        return view.createLine(
                            linePos, lineStart, linePos, lineEnd,
                            gridLineOptions);
                    }
                });
        },

        getViewElements: function(view) {
            var plotArea = this,
                options = plotArea.options.plotArea,
                axisY = plotArea.axisY,
                axisX = plotArea.axisX,
                gridLinesY = plotArea.renderGridLines(view, axisY, axisX),
                gridLinesX = plotArea.renderGridLines(view, axisX, axisY),
                childElements = ChartElement.fn.getViewElements.call(plotArea, view),
                border = options.border || {},
                elements = [
                    view.createRect(plotArea.box, {
                        fill: options.background,
                        zIndex: -1
                    }),
                    view.createRect(plotArea.box, {
                        stroke: border.width ? border.color : "",
                        strokeWidth: border.width,
                        fill: "",
                        zIndex: 0,
                        dashType: border.dashType
                    })
                ];

            return [].concat(gridLinesY, gridLinesX, childElements, elements);
        }
    });

    // **************************
    // Visual elements - Generic, SVG, VML
    // **************************

    var ViewElement = Class.extend({
        init: function(options) {
            var element = this;
            element.children = [];
            element.options = deepExtend({}, element.options, options);
        },

        render: function() {
            return this.template(this);
        },

        renderContent: function() {
            var output = "",
                element = this,
                sortedChildren = element.sortChildren(),
                childrenCount = sortedChildren.length;

            for (var i = 0; i < childrenCount; i++) {
                output += sortedChildren[i].render();
            }

            return output;
        },

        sortChildren: function() {
            var element = this,
                children = element.children;

            for (var i = 0, length = children.length; i < length; i++) {
                children[i]._childIndex = i;
            }

            return children.slice(0).sort(element.compareChildren);
        },

        compareChildren: function(a, b) {
            var aValue = a.options.zIndex || 0,
                bValue = b.options.zIndex || 0;

            if (aValue !== bValue) {
                return aValue - bValue;
            }

            return a._childIndex - b._childIndex;
        },

        renderAttr: function (name, value) {
            return value ? " " + name + "='" + value + "' " : "";
        }
    });

    var ViewBase = ViewElement.extend({
        init: function(options) {
            var view = this;

            ViewElement.fn.init.call(view, options);

            view.definitions = {};
            view.decorators = [];
        },

        renderDefinitions: function() {
            var view = this,
                definitions = view.definitions,
                definitionId,
                output = "";

            for (definitionId in definitions) {
                if (definitions.hasOwnProperty(definitionId)) {
                    output += definitions[definitionId].render();
                }
            }

            return output;
        },

        decorate: function(element) {
            var view = this,
                decorators = view.decorators,
                i,
                length = decorators.length;

            for (i = 0; i < length; i++) {
                element = decorators[i].decorate(element);
            }

            return element;
        }
    });

    var SVGView = ViewBase.extend({
        init: function(options) {
            var view = this;

            ViewBase.fn.init.call(view, options);

            view.decorators.push(
                new SVGOverlayDecorator(view),
                new SVGPaintDecorator(view)
            );

            view.template = SVGView.template;
            if (!view.template) {
                view.template = SVGView.template = template(
                    "<svg xmlns='" + SVG_NS + "' version='1.1' " +
                    "width='<#= d.options.width #>px' height='<#= d.options.height #>px' " +
                    "style='position: relative;'>" +
                    "<#= d.renderDefinitions() #>" +
                    "<#= d.renderContent() #></svg>"
                );
            }
        },

        options: {
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT,
            idPrefix: ""
        },

        renderTo: function(container) {
            var view = this,
                svgText = view.render(),
                viewElement;

            renderSVG(container, svgText);
            viewElement = container.firstChild;
            view.alignToScreen(viewElement);

            return viewElement;
        },

        renderDefinitions: function() {
            var view = this,
                output = ViewBase.fn.renderDefinitions.call(view);

            return output.length > 0 ? "<defs>" + output + "</defs>" : "";
        },

        renderElement: function(element) {
            var container = doc.createElement("div"),
                element;

            renderSVG(container,
                "<svg xmlns='" + SVG_NS + "' version='1.1'>" +
                element.render() +
                "</svg>"
            );

            element = container.firstChild.firstChild;

            return element;
        },

        createGroup: function(options) {
            return new SVGGroup(options);
        },

        createText: function(content, options) {
            return new SVGText(content, options);
        },

        createRect: function(box, style) {
            return this.decorate(
                new SVGPath([
                        [box.x1, box.y1], [box.x2, box.y1],
                        [box.x2, box.y2], [box.x1, box.y2], [box.x1, box.y1]
                    ],
                    style
                )
            );
        },

        createLine: function(x1, y1, x2, y2, options) {
            return new SVGPath([[x1, y1], [x2, y2]], options);
        },

        createPath: function(points, options) {
            return new SVGPath(points, options);
        },

        createCircle: function(center, radius, options) {
            return new SVGCircle(center, radius, options);
        },

        createGradient: function(options) {
            return new SVGLinearGradient(options);
        },

        alignToScreen: function(element) {
            try {
                var ctm = element.getScreenCTM ? element.getScreenCTM() : null;
            } catch (e) { }

            if (ctm) {
                var left = - ctm.e % 1,
                    top = - ctm.f % 1,
                    style = element.style;

                if (left !== 0 || top !== 0) {
                    style.left = left + "px";
                    style.top = top + "px";
                }
            }
        }
    });


    var SVGGroup = ViewElement.extend({
        init: function(options) {
            var group = this;
            ViewElement.fn.init.call(group, options);

            group.template = SVGGroup.template;
            if (!group.template) {
                group.template = SVGGroup.template =
                template("<g<#= d.renderAttr(\"id\", d.options.id) #>>" +
                         "<#= d.renderContent() #></g>");
            }
        }
    });


    var SVGText = ViewElement.extend({
        init: function(content, options) {
            var text = this;
            ViewElement.fn.init.call(text, options);

            text.content = content;
            text.template = SVGText.template;
            if (!text.template) {
                text.template = SVGText.template = template(
                    "<text <#= d.renderAttr(\"id\", d.options.id) #> " +
                    "x='<#= Math.round(d.options.x) #>' " +
                    "y='<#= Math.round(d.options.y + d.options.baseline) #>' " +
                    "<#= d.options.rotation ? d.renderRotation() : '' #> " +
                    "style='font: <#= d.options.font #>' fill='<#= d.options.color #>'>" +
                    "<#= d.content #></text>"
                );
            }
        },

        options: {
            x: 0,
            y: 0,
            baseline: 0,
            font: SANS16,
            size: {
                width: 0,
                height: 0
            }
        },

        renderRotation: function() {
            var text = this,
                options = text.options,
                size = options.size,
                cx = round(options.x + size.normalWidth / 2, COORD_PRECISION),
                cy = round(options.y + size.normalHeight / 2, COORD_PRECISION),
                rcx = round(options.x + size.width / 2, COORD_PRECISION),
                rcy = round(options.y + size.height / 2, COORD_PRECISION),
                offsetX = round(rcx - cx, COORD_PRECISION),
                offsetY = round(rcy - cy, COORD_PRECISION);

            return "transform='translate(" + offsetX + "," + offsetY + ") " +
                   "rotate(" + options.rotation + "," + cx + "," + cy + ")'";
        }
    });

    var SVGPath = ViewElement.extend({
        init: function(points, options) {
            var path = this;
            ViewElement.fn.init.call(path, options);

            path.template = SVGPath.template;
            if (!path.template) {
                path.template = SVGPath.template = template(
                    "<path <#= d.renderAttr(\"id\", d.options.id) #>" +
                    "d='<#= d.renderPoints() #>' " +
                    "<#= d.renderStroke() #><#= d.renderStrokeWidth() #>" +
                    "fill-opacity='<#= d.options.fillOpacity #>' " +
                    "stroke-opacity='<#= d.options.strokeOpacity #>' " +
                    "<#= d.renderDashType() #> " +
                    "stroke-linecap='<#= d.options.strokeLineCap #>' " +
                    "fill='<#= d.options.fill || \"none\" #>'></path>"
                );
            }

            path.points = points || [];
        },

        options: {
            fill: "",
            fillOpacity: 1,
            strokeOpacity: 1,
            strokeLineCap: "square"
        },

        clone: function() {
            var path = this;
            return new SVGPath(path.points, deepExtend({}, path.options));
        },

        renderPoints: function() {
            var path = this,
                points = this.points,
                count = points.length,
                strokeWidth = path.options.strokeWidth,
                shouldAlign = strokeWidth && strokeWidth % 2 !== 0,
                alignFunc = shouldAlign ? alignToPixel : math.round,
                first = points[0],
                result = "M" + alignFunc(first[0]) + " " + alignFunc(first[1]);

            for (var i = 1; i < count; i++) {
                var p = points[i];
                result += " L" + alignFunc(p[0]) + " " + alignFunc(p[1]);
            }

            return result;
        },

        renderStrokeWidth: function () {
            var path = this,
                options = path.options;

            return options.strokeWidth > 0 ? "stroke-width='" + options.strokeWidth + "' " : "";
        },

        renderStroke: function () {
            var path = this,
                options = path.options;

            return options.stroke ? "stroke='" + options.stroke + "' " : "";
        },

        renderDashType: function () {
            var path = this,
                options = path.options,
                result = [],
                dashType = options.dashType ? options.dashType.toLowerCase() : null;

            if (dashType && dashType != "solid" && options.strokeWidth) {
                var dashTypeArray = SVG_DASH_TYPE[dashType];
                for (var i = 0; i < dashTypeArray.length; i++) {
                    result.push(dashTypeArray[i] * options.strokeWidth);
                }

                options.strokeLineCap = "butt";

                return "stroke-dasharray='" + result.join(" ") + "' ";
            }
            return "";
        }
    });

    var SVGCircle = ViewElement.extend({
        init: function(center, radius, options) {
            var circle = this;
            ViewElement.fn.init.call(circle, options);

            circle.center = center;
            circle.radius = radius;

            circle.template = SVGCircle.template;
            if (!circle.template) {
                circle.template = SVGCircle.template = template(
                    "<circle <#= d.renderAttr(\"id\", d.options.id) #> " +
                    "cx='<#= d.center[0] #>' cy='<#= d.center[1] #>' " +
                    "r='<#= d.radius #>' " +
                    "<#= d.renderAttr(\"stroke\", d.options.stroke) #> " +
                    "<#= d.renderAttr(\"stroke-width\", d.options.strokeWidth) #>" +
                    "fill-opacity='<#= d.options.fillOpacity #>' " +
                    "stroke-opacity='<#= d.options.strokeOpacity #>'  " +
                    "fill='<#= d.options.fill || \"none\" #>'></circle>"
                );
            }
        },

        options: {
            fill: "",
            fillOpacity: 1,
            strokeOpacity: 1
        }
    });

    var SVGLinearGradient = ViewElement.extend({
        init: function(options) {
            var gradient = this;
            ViewElement.fn.init.call(gradient, options);

            gradient.template = SVGLinearGradient.template;
            gradient.stopTemplate = SVGLinearGradient.stopTemplate;
            if (!gradient.template) {
                gradient.template = SVGLinearGradient.template = template(
                    "<linearGradient id='<#= d.options.id #>' " +
                    "gradientTransform='rotate(<#= d.options.rotation #>)'> " +
                    "<#= d.renderStops() #>" +
                    "</linearGradient>"
                );

                gradient.stopTemplate = SVGLinearGradient.stopTemplate = template(
                    "<stop offset='<#= Math.round(d.offset * 100) #>%' " +
                    "style='stop-color:<#= d.color #>;stop-opacity:<#= d.opacity #>' />");
            }
        },

        options: {
            id: "",
            rotation: 0
        },

        renderStops: function() {
            var gradient = this,
                stops = gradient.options.stops,
                stopTemplate = gradient.stopTemplate,
                i,
                length = stops.length,
                currentStop,
                output = '';

            for (i = 0; i < length; i++) {
                currentStop = stops[i];
                output += stopTemplate(currentStop);
            }

            return output;
        }
    });

    function SVGOverlayDecorator(view) {
        this.view = view;
    }

    SVGOverlayDecorator.prototype = /** @ignore */ {
        decorate: function(element) {
            var decorator = this,
                view = decorator.view,
                id = element.options.id,
                overlayName = element.options ? element.options.overlay : "",
                overlay = Chart.Overlays[overlayName];

            if (!overlay) {
                return element;
            }

            delete element.options.id;

            var fill = overlay.fill,
                fillRotation = element.options.normalAngle || 0,
                fillId = overlayName + fillRotation,
                group = view.createGroup(),
                overlayElement = element.clone();

            group.children.push(element, overlayElement);

            overlayElement.options.id = id;

            overlayElement.options.fill =
                deepExtend(fill, { id: fillId, rotation: fillRotation });

            return group;
        }
    }

    function SVGPaintDecorator(view) {
        this.view = view;
    }

    SVGPaintDecorator.prototype = /** @ignore */ {
        decorate: function(element) {
            var decorator = this,
                options = element.options;

            options.fill = decorator.getPaint(options.fill);

            // Recursively decorate all child elements, e.g. overlays
            for(var i = 0; i < element.children.length; i++) {
                decorator.decorate(element.children[i]);
            }

            return element;
        },

        getPaint: function(paint) {
            var decorator = this,
                view = decorator.view,
                definitions = view.definitions,
                gradient,
                gradientId;

            if (typeof paint === OBJECT) {
                gradientId = paint.id;
                gradient = definitions[gradientId];
                if (!gradient) {
                    gradient = view.createGradient(paint);
                    definitions[gradientId] = gradient;
                }

                return "url(#" + gradient.options.id + ")";
            } else {
                return paint;
            }
        }
    };

    var VMLView = ViewBase.extend({
        init: function(options) {
            var view = this;
            ViewBase.fn.init.call(view, options);

            view.decorators.push(
                new VMLOverlayDecorator(view),
                new VMLGradientDecorator(view)
            );

            view.template = VMLView.template;
            if (!view.template) {
                view.template = VMLView.template = template(
                    "<div style='width:<#= d.options.width #>px; " +
                    "height:<#= d.options.height #>px; " +
                    "position: relative;'>" +
                    "<#= d.renderContent() #></div>"
                );
            }
        },

        options: {
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT
        },

        renderTo: function(container) {
            if (doc.namespaces) {
                doc.namespaces.add("kvml", "urn:schemas-microsoft-com:vml", "#default#VML");
            }

            container.innerHTML = this.render();

            return container.firstChild;
        },

        renderElement: function(element) {
            var container = doc.createElement("div"),
                element;

            container.style.display = NONE;
            doc.body.appendChild(container);
            container.innerHTML = element.render();

            element = container.firstChild;
            doc.body.removeChild(container);

            return element;
        },

        createText: function(content, options) {
            if (options && options.rotation) {
                return new VMLRotatedText(content, options);
            } else {
                return new VMLText(content, options);
            }
        },

        createRect: function(box, style) {
            return this.decorate(
                new VMLPath(
                    [[box.x1, box.y1], [box.x2, box.y1],
                    [box.x2, box.y2], [box.x1, box.y2], [box.x1, box.y1]],
                    style
                )
            );
        },

        createLine: function(x1, y1, x2, y2, options) {
            return new VMLPath([[x1, y1], [x2, y2]], options);
        },

        createPath: function(points, options) {
            return new VMLPath(points, options);
        },

        createCircle: function(center, radius, options) {
            return new VMLCircle(center, radius, options);
        },

        createGroup: function(options) {
            return new VMLGroup(options);
        },

        createGradient: function(options) {
            return new VMLLinearGradient(options);
        }
    });

    var VMLText = ViewElement.extend({
        init: function(content, options) {
            var text = this;
            ViewElement.fn.init.call(text, options);

            text.content = content;
            text.template = VMLText.template;
            if (!text.template) {
                text.template = VMLText.template = template(
                    "<kvml:textbox <#= d.renderAttr(\"id\", d.options.id) #> " +
                    "style='position: absolute; " +
                    "left: <#= d.options.x #>px; top: <#= d.options.y #>px; " +
                    "font: <#= d.options.font #>; color: <#= d.options.color #>'>" +
                    "<#= d.content #></kvml:textbox>"
                );
            }
        },

        options: {
            x: 0,
            y: 0,
            font: SANS16,
            color: BLACK
        }
    });

    var VMLRotatedText = ViewElement.extend({
        init: function(content, options) {
            var text = this;
            ViewElement.fn.init.call(text, options);

            text.content = content;
            text.template = VMLRotatedText.template;
            if (!text.template) {
                text.template = VMLRotatedText.template = template(
                    "<kvml:shape <#= d.renderAttr(\"id\", d.options.id) #> " +
                    "style='position: absolute; top: 0px; left: 0px; " +
                    "width: 1px; height: 1px;' stroked='false' coordsize='1,1'>" +
                    "<#= d.renderPath() #>" +
                    "<kvml:fill color='<#= d.options.color #>' />" +
                    "<kvml:textpath on='true' style='font: <#= d.options.font #>;' " +
                    "fitpath='false' string='<#= d.content #>' /></kvml:shape>"
                );
            }
        },

        options: {
            x: 0,
            y: 0,
            font: SANS16,
            color: BLACK,
            size: {
                width: 0,
                height: 0
            }
        },

        renderPath: function() {
            var text = this,
                options = text.options,
                width = options.size.width,
                height = options.size.height,
                cx = options.x + width / 2,
                cy = options.y + height / 2,
                angle = -options.rotation,
                r1 = rotatePoint(options.x, cy, cx, cy, angle),
                r2 = rotatePoint(options.x + width, cy, cx, cy, angle);

            return "<kvml:path textpathok='true' " +
                   "v='m " + round(r1.x) + "," + round(r1.y) +
                   " l " + round(r2.x) + "," + round(r2.y) +
                   "' />";
        }
    });

    var VMLPath = ViewElement.extend({
        init: function(points, options) {
            var path = this;
            ViewElement.fn.init.call(path, options);

            path.template = VMLPath.template;
            if (!path.template) {
                path.template = VMLPath.template = template(
                    "<kvml:shape <#= d.renderAttr(\"id\", d.options.id) #> " +
                    "style='position:absolute; width:1px; height:1px;' " +
                    "coordorigin='0 0' coordsize='1 1'>" +
                        "<kvml:path v='<#= d.renderPoints() #> e' />" +
                        "<#= d.fill.render() + d.stroke.render() #>" +
                    "</kvml:shape>"
                );
            }

            path.points = points || [];
            path.stroke = new VMLStroke(path.options);
            path.fill = new VMLFill(path.options);
        },

        options: {
            fill: ""
        },

        renderPoints: function() {
            var points = this.points,
                count = points.length,
                first = points[0],
                result = "m " + round(first[0]) + "," + round(first[1]);

            if (count > 1) {
                result += " l";

                for (var i = 1; i < count; i++) {
                    var p = points[i];
                    result += " " + round(p[0]) + "," + round(p[1]);

                    if (i < count - 1) {
                        result += ",";
                    }
                }
            }

            return result;
        }
    });

    var VMLStroke = ViewElement.extend({
        init: function(options) {
            var stroke = this;
            ViewElement.fn.init.call(stroke, options);

            stroke.template = VMLStroke.template;
            if (!stroke.template) {
                stroke.template = VMLStroke.template = template(
                    "<kvml:stroke on='<#= !!d.options.stroke #>' " +
                    "<#= d.renderAttr(\"color\", d.options.stroke) #>" +
                    "<#= d.renderAttr(\"weight\", d.options.strokeWidth) #>" +
                    "<#= d.renderAttr(\"dashstyle\", d.options.dashType) #>" +
                    "<#= d.renderAttr(\"opacity\", d.options.strokeOpacity) #> />"
                );
            }
        }
    });

    var VMLFill = ViewElement.extend({
        init: function(options) {
            var stroke = this;
            ViewElement.fn.init.call(stroke, options);

            stroke.template = VMLFill.template;
            if (!stroke.template) {
                stroke.template = VMLFill.template = template(
                    "<kvml:fill on='<#= !!d.options.fill #>' " +
                    "<#= d.renderAttr(\"color\", d.options.fill) #>" +
                    "<#= d.renderAttr(\"weight\", d.options.fillWidth) #>" +
                    "<#= d.renderAttr(\"opacity\", d.options.fillOpacity) #> />"
                );
            }
        }
    });

    var VMLCircle = ViewElement.extend({
        init: function(center, radius, options) {
            var circle = this;
            ViewElement.fn.init.call(circle, options);

            circle.center = center;
            circle.radius = radius;

            circle.template = VMLCircle.template;
            if (!circle.template) {
                circle.template = VMLCircle.template = template(
                    "<kvml:oval <#= d.renderAttr(\"id\", d.options.id) #> " +
                            "style='position:absolute; " +
                            "width:<#= d.radius * 2 #>px; height:<#= d.radius * 2 #>px; " +
                            "top:<#= d.center[1] - d.radius #>px; " +
                            "left:<#= d.center[0] - d.radius #>px;'>" +
                        "<#= d.fill.render() + d.stroke.render() #>" +
                    "</kvml:oval>"
                );
            }

            circle.stroke = new VMLStroke(circle.options);
            circle.fill = new VMLFill(circle.options);
        },

        options: {
            fill: ""
        }
    });

    var VMLGroup = ViewElement.extend({
        init: function(options) {
            var group = this;
            ViewElement.fn.init.call(group, options);

            group.template = VMLGroup.template;
            if (!group.template) {
                group.template = VMLGroup.template = template(
                    "<div <#= d.renderAttr(\"id\", d.options.id) #>" +
                    "style='position: absolute; white-space: nowrap;'>" +
                    "<#= d.renderContent() #></div>"
                );
            }
        }
    });

    var VMLLinearGradient = ViewElement.extend({
        init: function(options) {
            var gradient = this;
            ViewElement.fn.init.call(gradient, options);

            gradient.template = VMLLinearGradient.template;
            if (!gradient.template) {
                gradient.template = VMLLinearGradient.template = template(
                    "<kvml:fill type='gradient' angle='<#= d.options.rotation #>' " +
                    "colors='<#= d.renderColors() #>' opacity='<#= d.options.opacity #>' />"
                );
            }
        },

        options: {
            rotation: 0,
            opacity: 1
        },

        renderColors: function() {
            var gradient = this,
                options = gradient.options,
                stops = options.stops,
                currentStop,
                i,
                length = stops.length,
                output = [],
                round = math.round;

            for (i = 0; i < length; i++) {
                currentStop = stops[i];
                output.push(
                    round(currentStop.offset * 100) + "% " +
                    currentStop.color
                );
            }

            return output.join(",");
        }
    });

    function VMLOverlayDecorator(view) {
        this.view = view;
    }

    VMLOverlayDecorator.prototype = /** @ignore */ {
        decorate: function(element) {
            var options = element.options,
                overlayName = options ? options.overlay : "",
                overlay = Chart.Overlays[overlayName];

            if (!overlay) {
                return element;
            }

            var fill = overlay.fill,
                fillRotation = 270 - options.normalAngle || 0,
                fillOpacity = options.fillOpacity;

            if (!defined(fillOpacity)) {
                fillOpacity = 1;
            }

            options.overlay = "";
            options.fill = deepExtend(
                { },
                blendGradient(options.fill, fill),
                { rotation: fillRotation,
                  opacity: fillOpacity }
            );

            return element;
        }
    };

    function VMLGradientDecorator(view) {
        this.view = view;
    }

    VMLGradientDecorator.prototype = /** @ignore */ {
        decorate: function(element) {
            var decorator = this,
                view = decorator.view,
                options = element.options,
                fill = options.fill;

            if (typeof fill === OBJECT) {
                element.fill = view.createGradient(fill);
            }

            return element;
        }
    };

    var Highlight = Class.extend({
        init: function(view, viewElement, options) {
            var highlight = this;
            highlight.options = deepExtend({}, highlight.options, options);

            highlight.view = view;
            highlight.viewElement = viewElement;
        },

        options: {
            fill: WHITE,
            fillOpacity: 0.2,
            stroke: WHITE,
            strokeWidth: 1,
            strokeOpacity: 0.2
        },

        show: function(point) {
            var highlight = this,
                chart = highlight.chart,
                view = highlight.view,
                viewElement = highlight.viewElement,
                outline,
                element;

            highlight.hide();

            if (point.getOutlineElement) {
                outline = point.getOutlineElement(view, highlight.options);

                element = view.renderElement(outline);
                viewElement.appendChild(element);

                highlight.element = element;
                highlight.visible = true;
            }
        },

        hide: function() {
            var highlight = this,
                element = highlight.element;

            if (element) {
                element.parentNode.removeChild(element);

                delete highlight.element;
                highlight.visible = false;
            }
        }
    });

    var Tooltip = Class.extend({
        init: function(chartElement, options) {
            var tooltip = this;

            tooltip.options = deepExtend({}, tooltip.options, options);
            options = tooltip.options;
            options.padding = getSpacing(options.padding);

            tooltip.chartElement = chartElement;

            tooltip.template = Tooltip.template;
            if (!tooltip.template) {
                tooltip.template = Tooltip.template = template(
                    "<div style='display:none; position: absolute; font: <#= d.font #>;" +
                    "border-radius: 2px; -moz-border-radius: 2px; -webkit-border-radius: 2px;" +
                    "border: <#= d.border.width #>px solid <#= d.border.color #>;" +
                    "padding: <#= d.padding.top #>px <#= d.padding.right #>px " +
                    "<#= d.padding.bottom #>px <#= d.padding.left #>px;'></div>"
                );
            }

            tooltip.element = $(tooltip.template(tooltip.options)).appendTo(chartElement);
        },

        options: {
            font: SANS12,
            padding: {
                top: 4,
                bottom: 4,
                left: 6,
                right: 6
            },
            border: {
                color: BLACK,
                width: 0
            },
            offsetY: 6,
            offsetX: 5
        },

        show: function(point) {
            var tooltip = this,
                element = tooltip.element,
                options = tooltip.options,
                aboveAxis = point.options.aboveAxis,
                isVertical = point.options.isVertical,
                tooltipBox,
                template,
                content = point.value.toString();

            if (options.template) {
                template = baseTemplate(options.template);
                content = template({
                    value: point.value,
                    category: point.category,
                    series: point.series,
                    dataItem: point.dataItem
                });
            } else if (options.format) {
                content = format(options.format, point.value);
            }

            tooltip.element.html(content);

            tooltipBox = new Box2D(0, 0, element.outerWidth(), element.outerHeight())

            if (isVertical === false) {
                tooltipBox
                    .alignTo(point.box, aboveAxis ? RIGHT : LEFT)
                    .translate(
                        (aboveAxis ? 1 : -1) * options.offsetX,
                        point.box.center().y - tooltipBox.center().y
                    );
            } else {
                tooltipBox
                    .alignTo(point.box, aboveAxis ? TOP : BOTTOM)
                    .translate(
                        point.box.center().x - tooltipBox.center().x,
                        (aboveAxis ? -1 : 1) * options.offsetY
                    );
            }

            tooltip.element
                .css({
                   backgroundColor: options.background || point.series.color,
                   color: options.color || point.series.labels.color,
                   opacity: 1
                })
                .stop(true)
                .show()
                .animate({
                    left: round(tooltipBox.x1) + "px",
                    top: round(tooltipBox.y1) + "px"
                }, tooltip.visible ? 150 : 0);

            tooltip.point = point;

            tooltip.visible = true;
        },

        hide: function() {
            var tooltip = this;

            if (tooltip.visible) {
                tooltip.element.fadeOut();

                tooltip.point = null;
                tooltip.visible = false;
            }
        }
    });

    // Helper functions
    function ceil(value, step) {
        return round(math.ceil(value / step) * step, DEFAULT_PRECISION);
    }

    function floor(value, step) {
        return round(math.floor(value / step) * step, DEFAULT_PRECISION);
    }

    function round(value, precision) {
        var power = math.pow(10, precision || 0);
        return math.round(value * power) / power;
    }

    function measureText(text, style, rotation) {
        var styleHash = getHash(style),
            cacheKey = text + styleHash + rotation,
            cachedResult = measureText.cache[cacheKey];

        if (cachedResult) {
            return cachedResult;
        }

        var measureBox = measureText.measureBox,
            baselineMarker = measureText.baselineMarker.cloneNode(false);

        if (!measureBox) {
            measureBox = measureText.measureBox =
                $("<div style='position: absolute; top: -4000px; left: -4000px;" +
                              "line-height: normal; visibility: hidden;' />")
                .appendTo(doc.body)[0];
        }

        for (var styleKey in style) {
            measureBox.style[styleKey] = style[styleKey];
        }
        measureBox.innerHTML = text;
        measureBox.appendChild(baselineMarker);

        var size = {
                width: measureBox.offsetWidth - BASELINE_MARKER_SIZE,
                height: measureBox.offsetHeight,
                baseline: baselineMarker.offsetTop + BASELINE_MARKER_SIZE
            };

        if (rotation) {
            var width = size.width,
                height = size.height,
                cx = width / 2,
                cy = height / 2,
                r1 = rotatePoint(0, 0, cx, cy, rotation),
                r2 = rotatePoint(width, 0, cx, cy, rotation),
                r3 = rotatePoint(width, height, cx, cy, rotation);
                r4 = rotatePoint(0, height, cx, cy, rotation);

            size.normalWidth = width;
            size.normalHeight = height;
            size.width = math.max(r1.x, r2.x, r3.x, r4.x) - math.min(r1.x, r2.x, r3.x, r4.x);
            size.height = math.max(r1.y, r2.y, r3.y, r4.y) - math.min(r1.y, r2.y, r3.y, r4.y);
        }

        measureText.cache[cacheKey] = size;

        return size;
    }

    measureText.cache = [];
    measureText.baselineMarker =
        $("<div style='display: inline-block; vertical-align: baseline;" +
                  "width: " + BASELINE_MARKER_SIZE + "px; height: " + BASELINE_MARKER_SIZE + "px;" +
                  "zoom: 1; *display: inline; overflow: hidden;' />")[0];

    function getHash(object) {
        var hash = [];
        for (var key in object) {
            hash.push(key + object[key]);
        }

        return hash.sort().join(" ");
    }

    function rotatePoint(x, y, cx, cy, angle) {
        var theta = angle * (math.PI / 180);
        return {
            x: cx + (x - cx) * math.cos(theta) + (y - cy) * math.sin(theta),
            y: cy - (x - cx) * math.sin(theta) + (y - cy) * math.cos(theta)
        }
    }

    function boxDiff(r, s) {
        if (r.x1 == s.x1 && r.y1 == s.y1 && r.x2 == s.x2 && r.y2 == s.y2) {
            return s;
        }

        var a = math.min(r.x1, s.x1);
        var b = math.max(r.x1, s.x1);
        var c = math.min(r.x2, s.x2);
        var d = math.max(r.x2, s.x2);

        var e = math.min(r.y1, s.y1);
        var f = math.max(r.y1, s.y1);
        var g = math.min(r.y2, s.y2);
        var h = math.max(r.y2, s.y2);

        // X = intersection, 0-7 = possible difference areas
        // h +-+-+-+
        // . |5|6|7|
        // g +-+-+-+
        // . |3|X|4|
        // f +-+-+-+
        // . |0|1|2|
        // e +-+-+-+
        // . a b c d

        var result = [];

        // we'll always have rectangles 1, 3, 4 and 6
        result[0] = new Box2D(b, e, c, f);
        result[1] = new Box2D(a, f, b, g);
        result[2] = new Box2D(c, f, d, g);
        result[3] = new Box2D(b, g, c, h);

        // decide which corners
        if( r.x1 == a && r.y1 == e || s.x1 == a && s.y1 == e )
        { // corners 0 and 7
            result[4] = new Box2D(a, e, b, f);
            result[5] = new Box2D(c, g, d, h);
        }
        else
        { // corners 2 and 5
            result[4] = new Box2D(c, e, d, f);
            result[5] = new Box2D(a, g, b, h);
        }

        return $.grep(result, function(box) {
            return box.height() > 0 && box.width() > 0
        })[0];
    }

    function alignToPixel(coord) {
        return math.round(coord) + 0.5;
    }

    function sparseArrayMin(arr) {
        return sparseArrayLimits(arr).min;
    }

    function sparseArrayMax(arr) {
        return sparseArrayLimits(arr).max;
    }

    function sparseArrayLimits(arr) {
        var min = Number.MAX_VALUE,
            max = - Number.MAX_VALUE;
        for (var i = 0, length = arr.length; i < length; i++) {
            var n = arr[i];
            if (defined(n)) {
                min = math.min(min, n);
                max = math.max(max, n);
            }
        }

        return { min: min, max: max };
    }

    function getSpacing(value) {
        var spacing = {};

        if (typeof(value) === "number") {
            spacing[TOP] = spacing[RIGHT] = spacing[BOTTOM] = spacing[LEFT] = value;
        } else {
            spacing[TOP] = value[TOP] || 0;
            spacing[RIGHT] = value[RIGHT] || 0;
            spacing[BOTTOM] = value[BOTTOM] || 0;
            spacing[LEFT] = value[LEFT] || 0;
        }

        return spacing;
    }

    function inArray(value, array) {
        return $.inArray(value, array) != -1;
    }

    function deepExtend(destination) {
        var i = 1,
            length = arguments.length,
            source,
            property,
            propValue;

        for (i = 1; i < length; i++) {
            source = arguments[i];

            for (property in source) {
                propValue = source[property];
                if (typeof propValue === OBJECT && propValue !== null && propValue.constructor !== Array) {
                    if (typeof(destination[property]) === OBJECT) {
                        destination[property] = destination[property] || {};
                    } else {
                        destination[property] = {};
                    }
                    deepExtend(destination[property], propValue);
                } else if (defined(propValue)) {
                    destination[property] = propValue;
                }
            }
        }

        return destination;
    }

    // renderSVG ==============================================================
    function renderSVG(container, svg) {
        container.innerHTML = svg;
    }

    (function() {
        var testFragment = "<svg xmlns='" + SVG_NS + "'></svg>",
            testContainer = doc.createElement("div"),
            hasParser = typeof DOMParser != UNDEFINED;

        testContainer.innerHTML = testFragment;

        if (hasParser && testContainer.firstChild.namespaceURI != SVG_NS) {
            renderSVG = function(container, svg) {
                var parser = new DOMParser(),
                    chartDoc = parser.parseFromString(svg, "text/xml"),
                    importedDoc = doc.adoptNode(chartDoc.documentElement);

                container.innerHTML = "";
                container.appendChild(importedDoc);
            };
        }
    })();

    var Color = function(value) {
        var color = this,
            formats = Color.formats,
            re,
            processor,
            parts,
            channels;

        if(arguments.length === 1) {
            value = color.resolveColor(value);

            for (i = 0; i < formats.length; i++) {
                re = formats[i].re;
                processor = formats[i].process;
                parts = re.exec(value);

                if (parts) {
                    channels = processor(parts);
                    color.r = channels[0];
                    color.g = channels[1];
                    color.b = channels[2];
                }
            }
        } else {
            color.r = arguments[0];
            color.g = arguments[1];
            color.b = arguments[2];
        }

        color.r = color.normalizeByte(color.r);
        color.g = color.normalizeByte(color.g);
        color.b = color.normalizeByte(color.b);
    };

    Color.prototype = /** @ignore */ {
        toHex: function() {
            var color = this,
                pad = color.padDigit,
                r = color.r.toString(16);
                g = color.g.toString(16);
                b = color.b.toString(16);

            return "#" + pad(r) + pad(g) + pad(b);
        },

        resolveColor: function(value) {
            value = value || BLACK;

            if (value.charAt(0) == "#") {
                value = value.substr(1, 6);
            }

            value = value.replace(/ /g, "");
            value = value.toLowerCase();
            value = Color.namedColors[value] || value;

            return value;
        },

        normalizeByte: function(value) {
            return (value < 0 || isNaN(value)) ? 0 : ((value > 255) ? 255 : value);
        },

        padDigit: function(value) {
            return (value.length === 1) ? "0" + value : value;
        },

        brightness: function(value) {
            var color = this,
                round = math.round;

            color.r = round(color.normalizeByte(color.r * value));
            color.g = round(color.normalizeByte(color.g * value));
            color.b = round(color.normalizeByte(color.b * value));

            return color;
        }
    };

    Color.formats = [{
            re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
            process: function(parts) {
                return [
                    parseInt(parts[1], 10), parseInt(parts[2], 10), parseInt(parts[3], 10)
                ];
            }
        }, {
            re: /^(\w{2})(\w{2})(\w{2})$/,
            process: function(parts) {
                return [
                    parseInt(parts[1], 16), parseInt(parts[2], 16), parseInt(parts[3], 16)
                ];
            }
        }, {
            re: /^(\w{1})(\w{1})(\w{1})$/,
            process: function(parts) {
                return [
                    parseInt(parts[1] + parts[1], 16),
                    parseInt(parts[2] + parts[2], 16),
                    parseInt(parts[3] + parts[3], 16)
                ];
            }
        }
    ];

    Color.namedColors = {
        aqua: "00ffff", azure: "f0ffff", beige: "f5f5dc",
        black: "000000", blue: "0000ff", brown: "a52a2a",
        coral: "ff7f50", cyan: "00ffff", darkblue: "00008b",
        darkcyan: "008b8b", darkgray: "a9a9a9", darkgreen: "006400",
        darkorange: "ff8c00", darkred: "8b0000", dimgray: "696969",
        fuchsia: "ff00ff", gold: "ffd700", goldenrod: "daa520",
        gray: "808080", green: "008000", greenyellow: "adff2f",
        indigo: "4b0082", ivory: "fffff0", khaki: "f0e68c",
        lightblue: "add8e6", lightgrey: "d3d3d3", lightgreen: "90ee90",
        lightpink: "ffb6c1", lightyellow: "ffffe0", lime: "00ff00",
        limegreen: "32cd32", linen: "faf0e6", magenta: "ff00ff",
        maroon: "800000", mediumblue: "0000cd", navy: "000080",
        olive: "808000", orange: "ffa500", orangered: "ff4500",
        orchid: "da70d6", pink: "ffc0cb", plum: "dda0dd",
        purple: "800080", red: "ff0000", royalblue: "4169e1",
        salmon: "fa8072", silver: "c0c0c0", skyblue: "87ceeb",
        slateblue: "6a5acd", slategray: "708090", snow: "fffafa",
        steelblue: "4682b4", tan: "d2b48c", teal: "008080",
        tomato: "ff6347", turquoise: "40e0d0", violet: "ee82ee",
        wheat: "f5deb3", white: "ffffff", whitesmoke: "f5f5f5",
        yellow: "ffff00", yellowgreen: "9acd32"
    };

    function blendColors(base, overlay, alpha) {
        var baseColor = new Color(base),
            overlayColor = new Color(overlay),
            r = blendChannel(baseColor.r, overlayColor.r, alpha),
            g = blendChannel(baseColor.g, overlayColor.g, alpha),
            b = blendChannel(baseColor.b, overlayColor.b, alpha);

        return new Color(r, g, b).toHex();
    }

    function blendChannel(a, b, alpha) {
        return math.round(alpha * b + (1 - alpha) * a);
    }

    function blendGradient(color, gradient) {
        var srcStops = gradient.stops,
            stopsLength = srcStops.length,
            result = deepExtend({}, gradient),
            i,
            stop,
            resultStop;

        result.stops = [];

        for (i = 0; i < stopsLength; i++) {
            stop = srcStops[i];
            resultStop = result.stops[i] = deepExtend({}, srcStops[i]);
            resultStop.color = blendColors(color, stop.color, stop.opacity);
            resultStop.opacity = 0;
        }

        return result;
    }

    Chart.Overlays = {
        glass: {
            fill: {
                type: "linear",
                rotation: 0,
                stops: [{
                    offset: 0,
                    color: WHITE,
                    opacity: 0
                }, {
                    offset: 0.1,
                    color: WHITE,
                    opacity: 0
                }, {
                    offset: 0.25,
                    color: WHITE,
                    opacity: 0.4
                }, {
                    offset: 0.92,
                    color: WHITE,
                    opacity: 0
                }, {
                    offset: 1,
                    color: WHITE,
                    opacity: 0
                }]
            }
        }
    };

    function template(definition) {
        return baseTemplate(definition, { useWithBlock: false, paramName: "d" });
    }

    function applySeriesDefaults(options) {
        var series = options.series,
            i,
            seriesLength = series.length,
            seriesType,
            colors = options.seriesColors || [],
            seriesDefaults = options.seriesDefaults,
            baseSeriesDefaults = deepExtend({}, options.seriesDefaults);

        delete baseSeriesDefaults.bar;
        delete baseSeriesDefaults.column;
        delete baseSeriesDefaults.line;

        for (i = 0; i < seriesLength; i++) {
            seriesType = series[i].type || options.seriesDefaults.type;

            series[i] = deepExtend(
                { color: colors[i % colors.length] },
                baseSeriesDefaults,
                seriesDefaults[seriesType],
                series[i]);
        }
    }

    function applyAxisDefaults(options) {
        options.categoryAxis = deepExtend({},
            options.axisDefaults,
            options.categoryAxis
        );

        options.valueAxis = deepExtend({},
            options.axisDefaults,
            options.valueAxis
        );
    }

    function incrementSlot(slots, index, value) {
        slots[index] = (slots[index] || 0) + value;
    }

    function uniqueId() {
        var id = "k", i;

        for (i = 0; i < 16; i++) {
            id += (math.random() * 16 | 0).toString(16);
        }

        return id;
    }

    function defined(value) {
        return typeof value !== UNDEFINED;
    }

    function append(first, second) {
        [].push.apply(first, second);
    }

    // Exports ================================================================

    kendo.ui.plugin("Chart", Chart);

    deepExtend(Chart, {
        Box2D: Box2D,
        Text: Text,
        BarLabel: BarLabel,
        ChartElement: ChartElement,
        RootElement: RootElement,
        BoxElement: BoxElement,
        TextBox: TextBox,
        NumericAxis: NumericAxis,
        CategoryAxis: CategoryAxis,
        Bar: Bar,
        BarChart: BarChart,
        ShapeElement: ShapeElement,
        LinePoint: LinePoint,
        LineChart: LineChart,
        ClusterLayout: ClusterLayout,
        StackLayout: StackLayout,
        Title: Title,
        Legend: Legend,
        PlotArea: PlotArea,
        ViewElement: ViewElement,
        SVGView: SVGView,
        SVGGroup: SVGGroup,
        SVGText: SVGText,
        SVGPath: SVGPath,
        SVGCircle: SVGCircle,
        SVGOverlayDecorator: SVGOverlayDecorator,
        SVGPaintDecorator: SVGPaintDecorator,
        VMLView: VMLView,
        VMLText: VMLText,
        VMLRotatedText: VMLRotatedText,
        VMLPath: VMLPath,
        VMLCircle: VMLCircle,
        VMLGroup: VMLGroup,
        VMLOverlayDecorator: VMLOverlayDecorator,
        VMLLinearGradient: VMLLinearGradient,
        VMLStroke: VMLStroke,
        VMLFill: VMLFill,
        Tooltip: Tooltip,
        Highlight: Highlight,
        deepExtend: deepExtend,
        Color: Color,
        blendColors: blendColors,
        blendGradient: blendGradient,
        measureText: measureText
    });

    // Themes
    var TAHOMA11 = "11px Tahoma,sans-serif",
        TAHOMA12 = "12px Tahoma,sans-serif",
        TAHOMA16 = "16px Tahoma,sans-serif",
        baseTheme = {
            title: {
                font: TAHOMA16
            },
            legend: {
                font: TAHOMA12
            },
            seriesDefaults: {
                labels: {
                    font: TAHOMA11
                }
            },
            categoryAxis: {
                labels: {
                    font: TAHOMA12
                }
            },
            valueAxis: {
                labels: {
                    font: TAHOMA12
                }
            },
            tooltip: {
                font: TAHOMA12
            }
        };

    Chart.themes.black = deepExtend({}, baseTheme, {
        title: {
            color: WHITE
        },
        legend: {
            labels: {
                color: WHITE
            }
        },
        seriesDefaults: {
            labels: {
                color: WHITE
            }
        },
        chartArea: {
            background: "#393939"
        },
        seriesColors: ["#e34a00", "#ff8517", "#ffb800", "#94c400", "#0098ee", "#0069a5"],
        categoryAxis: {
            line: {
                color: "#808184"
            },
            labels: {
                color: WHITE
            },
            majorGridLines: {
                color: "#58595b",
                visible: true
            }
        },
        valueAxis: {
            line: {
                color: "#808184"
            },
            labels: {
                color: WHITE
            },
            majorGridLines: {
                color: "#58595b"
            }
        }
    });

    Chart.themes.kendo = deepExtend({}, baseTheme, {
        title: {
            color: "#6d6e70"
        },
        legend: {
            labels: {
                color: "#6d6e70"
            }
        },
        seriesDefaults: {
            labels: {
                color: "#6d6e70"
            }
        },
        seriesColors: ["#ffb800", "#ff8517", "#e34a00", "#545454", "#161616"],
        categoryAxis: {
            line: {
                color: "#696e70"
            },
            labels: {
                color: "#696e70"
            },
            majorGridLines: {
                color: "#d0d2d3",
                visible: true
            }
        },
        valueAxis: {
            line: {
                color: "#696e70"
            },
            labels: {
                color: "#696e70"
            },
            majorGridLines: {
                color: "#d0d2d3"
            }
        }
    });

    Chart.themes.blueopal = deepExtend({}, baseTheme, {
        title: {
            color: "#293135"
        },
        legend: {
            labels: {
                color: "#293135"
            }
        },
        seriesDefaults: {
            labels: {
                color: "#293135"
            }
        },
        seriesColors: ["#0069a5", "#0098ee", "#7bd2f6", "#ffb800", "#ff8517", "#e34a00"],
        categoryAxis: {
            line: {
                color: "#9aabb2"
            },
            labels: {
                color: "#293135"
            },
            majorGridLines: {
                color: "#c4d0d5",
                visible: true
            }
        },
        valueAxis: {
            line: {
                color: "#9aabb2"
            },
            labels: {
                color: "#293135"
            },
            majorGridLines: {
                color: "#c4d0d5"
            }
        }
    });

})(jQuery);

