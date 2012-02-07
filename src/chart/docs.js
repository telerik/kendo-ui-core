(function () {

    /**
     * @name kendo.ui.Chart.Description
     *
     * @section
     * <p>
     * The Chart widget uses modern browser technologies to render high-quality data visualizations.
     * All graphics are rendered on the client using SVG with a fallback to VML for legacy browsers.
     * </p>
     *
     * <p>
     * Supported chart types:
     * </p>
     * <ul>
     *     <li>Bar / Column</li>
     *     <li>Line / Vertical Line</li>
     *     <li>Area / Verical Area</li>
     *     <li>Pie</li>
     *     <li>Scatter</li>
     *     <li>Scatter Line</li>
     *     <li>Area</li>
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
     * The minimal configuration requires series data points and a list of categories.
     * </p>
     * <p>
     * The default chart type is column (vertical bars).
     * </p>
     *
     * <h3>
     * Binding to Data
     * </h3>
     * <p>
     * A chart can be bound to both local and remote data.
     * <p>
     * </p>
     * The Chart DataSource is used to bind to an Array objects or to a remote data service.
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
     * Next Steps
     * </h3>
     * <p>
     * Explore the Chart demos for a quick overview of the major features.
     * Detailed reference is available in the Configuration, Methods and Events tabs.
     * </p>
     */
     var ChartDocs = /** @lends kendo.ui.Chart.prototype */ {
        /**
         * @constructs
         * @extends kendo.ui.Widget
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {String} [theme] Sets Chart theme. Available themes: default, blueOpal, black.
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
         * // Alternative configuration
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
         * @option {String} [title.background] <"white"> The background color of the title.
         * @option {String} [title.text] The title of the chart.
         * @option {String} [title.font] <"16px Arial,Helvetica,sans-serif"> The font of the title.
         * @option {String} [title.position] <"top"> The position of the title.
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
	 * _example
	 * $("#chart ").kendoChart({
	 *     title: {
	 *         // hides the title
	 *         visible: false
	 *     },
  	 *     ...
         * });
	 * 
         * @option {Number | Object} [title.margin] <5> The margin of the title.
         * _example
	 * $("#chart").kendoChart({
	 *     // sets the top, right, bottom and left margin to 3px.
         *     title: {
	 *         margin: 3
	 *     },
	 *     ...
	 * });
 	 * //
         * $("#chart").kendoChart({
	 *     // sets the top and left margin to 1px
         *     // margin right and bottom are with 5px (by default)
	 *     title: {
	 *         margin: { top: 1, left: 1 }
	 *     },
	 *     ...
	 * });
         * @option {Number | Object} [title.padding] <5> The padding of the title.
         * _example
	 * $("#chart").kendoChart({
         *     // sets the top, right, bottom and left padding to 3px.
         *     title: {
	 *         padding: 3
         *     },
	 *     ...
	 * });
	 * //
         * $("#chart").kendoChart({
    	 *     // sets the top and left padding to 1px
         *     // padding right and bottom are with 5px (by default)
         *     title: {
	 *         padding: { top: 1, left: 1 }
	 *     },
	 *     ...
	 * });
         * @option {Object} [title.border] The border of the title.
	 * _example
	 * $("#chart").kendoChart({
	 *     // set border options on the title
	 *     title: {
	 *         border: {
	 *             // set the border color to a dark blue
	 *             color: "#336699",
	 *             // set the width of the border to 2 pixels
	 *             width: 2,
	 *             // set the border style to long dashes
	 *             dashType: "longDash"
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {Number} [title.border.width] <0> The width of the border.
	 * _example
	 * $("#chart").kendoChart({
	 *     title: {
	 *         border: {
	 *             // set border width to 2 pixels
	 *             width: 2
	 *         }
	 *     },
	 *     ...
	 * });  
         * @option {String} [title.border.color] <"black"> The color of the border.
         * _example
	 * $("#chart").kendoChart({
	 *     title: {
	 *         border: {
	 *             // set border color to a dark blue
	 *             color: "#336699
	 *         }
	 *     },
	 *     ...
	 * });
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
         * _example
	 * $("#chart").kendoChart({
	 *     title: {
	 *         border: {
	 *             // set border style to a long dash
	 *             dashType: "longDash"
	 *         }
	 *     },
	 *     ...
	 * }); 
	 * @option {Object} [legend] The chart legend configuration options.
         * _example
	 * $("#chart").kendoChart({
	 *     legend: {
	 *         // set the background color to a dark blue
	 *         background: "#336699",
	 *         // set the font to a size of 14px
	 *         font: "14px Arial,Helvetica,sans-serif",
	 *         // move the legend to the left
	 *         position: "left",
	 *         // move the legend a bit closer to the chart by setting the x offset to 20
	 *         offsetX: 20,
	 *         // move the legend up to the top by setting the y offset to -100
	 *         offsetY: -100,
	 *         // eliminate all the margins by setting them to 0
	 *         margin: 0,
	 *         // make sure the padding on all sides is 20
	 *         padding: 20,
	 *         // tweak the border style
	 *         border: {
	 *             // make the color black
	 *             color: "black",
	 *             // set the border width to 2 pixels
	 *             width: 2,
	 *             // set the style to dashed
	 *             dashType: "dash"
	 *         }
	 *     }
	 * });
	 *         
	 * @option {String} [legend.background] <"white"> The background color of the legend. Any valid CSS color string will work here, including hex and rgb.
	 * _example
	 * $("#chart").kendoChart({
	 *     legend: {
	 *         // set the background color to a dark blue
	 *         background: "#336699"
	 *     },
	 *     ...
	 * });
         * @option {String} [legend.font] <12px Arial,Helvetica,sans-serif> The font style of the legend.
         * _example
         * $("#chart").kendoChart({
	 *     legend: {
	 *         // set the font to a size of 20 pixels
	 *         font: "20px Arial, Helvetica,sans-serif"
	 *     },
	 *     ...
	 * });
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
	 * _example
	 * $("#chart").kendoChart({
	 *     legend: {
         *	   // move the legend to the left side of the chart
	 *         position: "left"
	 *     },
	 *     ...
	 * }); 
         * @option {Number} [legend.offsetX] <0> The X offset from its position.  The offset is relative to the current position of the legend. 
	 * For instance, a value of 20 will move the legend 20 pixels to the right of it's initial position.  A negative value will move the legend
	 * to the left of the current position.
         * _example 
	 * $("#chart").kendoChart({
	 *     legend: {
	 *	   // move the legend to the left side of the chart
	 *         offsetX: 20
	 *     },
	 *     ...
	 * });	 
	 * @option {Number} [legend.offsetY] <0> The Y offset from its position.  The offset is relative to the current position of the legend. 
	 * For instance, a value of 20 will move the legend 20 pixels down from it's initial position.  A negative value will move the legend
	 * upwards from the current position. 
	 * _example 
	 * $("#chart").kendoChart({
	 *     legend: {
	 *	   // move the legend up 100 pixels
	 *         offsetY: -100
	 *     },
	 *     ...
	 * });   
         * @option {Boolean} [legend.visible] <true> The visibility of the legend.
         * _example 
	 * $("#chart").kendoChart({
	 *     legend: {
	 *	   // hide the legend
	 *         visible: false
	 *     },
	 *     ...
	 * });
	 * @option {Number | Object} [legend.margin] <10> The margin of the legend.
	 * _example 
	 * $("#chart").kendoChart({
	 *     legend: {
         *         // sets the top, right, bottom and left margin to 3px.
         *         margin: 3
	 *     },
	 *     ...
	 * });
         * //
	 * $("#chart").kendoChart({
	 *     legend: {
         *         // sets the top and left margin to 1px
         *         // margin right and bottom are with 10px (by default)
         *         margin: { top: 1, left: 1 }
	 *     },
	 *     ...
	 * });
         * @option {Number | Object} [legend.padding] <5> The padding of the legend.
         * _example
         * // sets the top, right, bottom and left padding to 3px.
	 * $("#chart").kendoChart({
	 *     legend: {
         *         // sets the top, right, bottom and left padding to 3px.
         *         padding: 3
	 *     },
	 *     ...
	 * });
         * //
	 * $("#chart").kendoChart({
	 *     legend: {
         *        // sets the top and left padding to 1px
         *        // padding right and bottom are with 5px (by default)
         *        padding: { top: 1, left: 1 } 
	 *     },
	 *     ...
	 * }); 
         * @option {Object} [legend.border] The border of the legend.
	 * _example
	 * $("#chart").kendoChart({
	 *     legend: {
	 *         border: {
	 *             // set the border width to 2 pixels
	 *             width: 2,
	 *             // set the color to grey
	 *             color: "grey",
	 *             // set the dash type to solid. this is the default so we could leave this line out.
	 *             dashType: "solid"
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {Number} [legend.border.width] <0> The width of the border.
	 * _example
	 * $("#chart").kendoChart({
	 *     legend: {
	 *         border: {
	 *             // set the border width to 2 pixels
	 *             width: 2
	 *         }
	 *     },
	 *     ...
	 * }); 
         * @option {String} [legend.border.color] <"black"> The color of the border.
         * _example
	 * $("#chart").kendoChart({
	 *     legend: {
	 *         border: {
	 *             // set the color to grey
	 *             color: "grey"
	 *         }
	 *     },
	 *     ...
	 * });
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
         * _example
	 * $("#chart").kendoChart({
	 *     legend: {
	 *         border: {
	 *             // set the dash type to solid. this is the default so we could leave this line out.
	 *             dashType: "solid"
	 *         }
	 *     },
	 *     ...
	 * }); 
	 * @option {Object} [valueAxis] The value axis configuration options.
         * @option {Object} [valueAxis.name] <primary> The unique axis name.
         * @option {Number} [valueAxis.axisCrossingValue] <0> Value at which the category axis crosses this axis.
         * _example
         * $("#chart").kendoChart({
         *     valueAxis: {
         *         // have the axis cross at 5 instead of starting at 0
         *         axisCrossingValue: 5
         *     },
         *     ...
         * });
         * @option {Number} [valueAxis.min] <0> The minimum value of the axis.  
	 * This is often used in combination with the <b>max</b> configuration method
	 * to adjust the size of the chart relative to the charting area.
         * _example
	 * $("#chart").kendoChart({
	 *     // assuming the data set lowest value is 20 and the highest is 100, 
	 *     // we can make the chart bigger in the chart area by adjusting the min/max values
	 *     valueAxis: {
	 *         min: 10,
	 *         max: 100
	 *     },
	 *     ...
	 * }); 
	 * @option {Number} [valueAxis.max] <1> The maximum value of the axis.  
	 * This is often used in combination with the <b>min</b> configuration method
	 * to adjust the size of the chart relative to the charting area.
         * _example
	 * $("#chart").kendoChart({
	 *     // assuming the data set lowest value is 20 and the highest is 100, 
	 *     // we can make the chart bigger in the chart area by adjusting the min/max values
	 *     valueAxis: {
	 *         min: 10,
	 *         max: 100
	 *     },
	 *     ...
	 * });
	 * @option {Number} [valueAxis.majorUnit] The interval between major divisions.  For instance, on a column chart, its the step size while going up the
	 * vertical axis.  You can additionally have minor steps and ticks in between the major ones by adjusting the <b>minorUnit</b>, <b>minorTickSize</b> and
	 * <b>minorTickType</b>
	 * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         // show ticks in steps of 100.
	 *         majorUnit: 100,
	 *         // by default, the size is 4. Increase it to 5 pixels.
	 *         majorTickSize: 5,
	 *         // change the tick type to none. only the number will appear.
	 *         majorTickType: "none"
	 *     },
	 *     ...
	 * });
         * @option {Number} [valueAxis.minorTickSize] <3> The axis minor tick size.  This is the length of the line in pixels that is drawn to indicate the tick 
	 * on the chart.
	 * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         // by default, the size is 3. Increase it to 4 pixels.
	 *         minorTickSize: 4,
	 *     },
	 *     ...
	 * });
         * @option {String} [valueAxis.minorTickType] <none> The minor tick type.  
	 * The tick can either be drawn outside, or hidden by selecting <b>none</b>.
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
         * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         // change the tick type to none. this will hide the tick and the number.
	 *         minorTickType: "none"
	 *     },
	 *     ...
	 * }); 
	 * @option {Number} [valueAxis.majorTickSize] <4> The axis major tick size.  This is the length of the line in pixels that is drawn to indicate the tick
	 * on the chart.
         * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         // show ticks in steps of 100.
	 *         majorUnit: 100,
	 *         // by default, the size is 4. Increase it to 5 pixels.
	 *         majorTickSize: 5,
	 *         // change the tick type to none. only the number will appear.
	 *         majorTickType: "none"
	 *     },
	 *     ...
	 * });
	 * @option {String} [valueAxis.majorTickType] <outside> The major tick type.  
	 * The tick can either be drawn outside, or hidden by selecting <b>none</b>.
	 * In the case of the minor tick, setting it's tick type to <b>none</b> will hide the minor ticks altogether.
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
	 * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         // show ticks in steps of 100.
	 *         majorUnit: 100,
	 *         // by default, the size is 4. Increase it to 5 pixels.
	 *         majorTickSize: 5,
	 *         // change the tick type to none. only the number will appear.
	 *         majorTickType: "none"
	 *     },
	 *     ...
	 * });
	 *
         * @option {Object} [valueAxis.minorGridLines] Configures the minor grid lines.  These are the lines that are an extension of the minor ticks through the
	 * body of the chart.  Note that minor grid lines are not visible by default, therefore none of these settings will take effect without the minor grid
	 * lines visibility being set to <b>true</b>.
         * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         minorGridLines: {
	 *             // set visible to true
	 *             visible: true,
	 *             // set width to 2 pixels
	 *             width: 2,
	 *             // set the color to a dark blue
	 *             color: "#336699"
	 *         }
	 *     },
	 *     ...
	 * });
	 * @option {Number} [valueAxis.minorGridLines.width] <1> The width of the lines. Note that this settings has no effect if the visibility of the minor
	 * grid lines is not set to <b>true</b>.
         * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         minorGridLines: {
	 *             // set visible to true
	 *             visible: true,
	 *             // set width to 2 pixels
	 *             width: 2,
	 *             // set the color to a dark blue
	 *             color: "#336699"
	 *         }
	 *     },
	 *     ...
	 * });
	 * @option {String} [valueAxis.minorGridLines.color] <"black"> The color of the lines. Note that this has no effect if the visibility of the minor
	 * grid lines is not set to <b>true</b>.
	 * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         minorGridLines: {
	 *             // set visible to true
	 *             visible: true,
	 *             // set width to 2 pixels
	 *             width: 2,
	 *             // set the color to a dark blue
	 *             color: "#336699"
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {Boolean} [valueAxis.minorGridLines.visible] <false> The visibility of the lines.
         * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         minorGridLines: {
	 *             // set visible to true
	 *             visible: true
	 *         }
	 *     },
	 *     ...
	 * });
	 * @option {Object} [valueAxis.majorGridLines] Configures the major grid lines.  These are the lines that are an extension of the major ticks through the
	 * body of the chart.
	  * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         minorGridLines: {
	 *             // set visible to true
	 *             visible: true,
	 *             // set width to 2 pixels
	 *             width: 2,
	 *             // set the color to a dark blue
	 *             color: "#336699"
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {Number} [valueAxis.majorGridLines.width] <1> The width of the lines.
         * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         minorGridLines: {
	 *             // set visible to true
	 *             visible: true,
	 *             // set width to 2 pixels
	 *             width: 2,
	 *             // set the color to a dark blue
	 *             color: "#336699"
	 *         }
	 *     },
	 *     ...
	 * });
	 * @option {String} [valueAxis.majorGridLines.color] <"black"> The color of the lines.
	  * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         minorGridLines: {
	 *             // set visible to true
	 *             visible: true,
	 *             // set width to 2 pixels
	 *             width: 2,
	 *             // set the color to a dark blue
	 *             color: "#336699"
	 *         }
	 *     },
	 *     ...
	 * });
 	 * @option {Boolean} [valueAxis.majorGridLines.visible] <true> The visibility of the lines.
          * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         minorGridLines: {
	 *             // set visible to true
	 *             visible: false
	 *         }
	 *     },
	 *     ...
	 * });
	 * @option {String} [valueAxis.color] Color to apply to all axis elements.
         * Individual color settings for line and labels take priority. Any valid CSS color string will work here, including hex and rgb.
         * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         // set the default color for all axis elements to a dark blue. note that
	 *         // any axis elements with color settings will override this.
	 *         color: "#336699"
	 *     },
	 *     ...
	 * });
	 * @option {Object} [valueAxis.line] Configures the axis line.  This will also affect the major and minor ticks, but not the grid lines.
         * _example 
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         line: {
	 *             // change the line width to 2 pixels
	 *             width: 2,
	 * 	       // set the color to light grey
	 *             color: "#e2e2e2"
	 *         }
	 *     },
	 *     ...
	 * });
	 * @option {Number} [valueAxis.line.width] <1> The width of the lines.
	 * _example 
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         line: {
	 *             // change the line width to 2 pixels
	 *             width: 2
	 * 	   }
	 *     },
	 *     ...
	 * }); 
	 * @option {String} [valueAxis.line.color] <"black"> The color of the lines. This will also affect the major and minor ticks, but not the 
	 * grid lines.
         * _example 
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         line: {
	 * 	       // set the color to light grey
	 *             color: "#e2e2e2"
	 *         }
	 *     },
	 *     ...
	 * });
	 * @option {Boolean} [valueAxis.line.visible] <true> The visibility of the lines.
         * _example 
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         line: {
	 *             // hide the axis lines altogether
	 *             visible: false
         *         }
	 *     },
	 *     ...
	 * });
	 * @option {Object} [valueAxis.labels] Configures the axis labels.
         * _example 
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         labels: {
	 *             // set the color of the text on the labels to a dark blue
	 *             color: "#336699",
	 *             // set the background color of the labels to a light grey
	 *             background: "#e2e2e2",
	 *             // make the font 14px
	 *             font: "14px Arial,Helvetica,sans-serif",
	 *             // zero out the margins
	 *             margin: 0,
	 *             // make the padding 2 px all around
	 *             padding: 2,
	 *             // tweak the border style
	 *             border: {
	 *                 // make the width 1
	 *                 width: 1,
	 *                 // set the color to a dark blue
	 *                 color: "#336699",
	 *                 // set the border style to dashed
	 *                 dashType: "dash"
	 *             },
	 *             // rotate the labels just slightly for visual effect
	 *             rotation: 10,
	 *             // format the labels for currency
	 *             format: "{0:C}"
	 *         }
	 *     },
	 *     ...
	 * });
	 * @option {String} [valueAxis.labels.color] The text color of the labels. Any valid CSS color string will work here, including hex and rgb.
	 * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         labels: {
	 *             // set the color of the text on the labels to a dark blue
	 *             color: "#336699"
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {String} [valueAxis.labels.background] The background color of the labels. Any valid CSS color string will work here, including 
	 * hex and rgb
         * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         labels: {
	 *             // set the background color of the labels to a light grey
	 *             background: "#e2e2e2"
	 *         }
	 *     },
	 *     ...
	 * });
	 * @option {String} [valueAxis.labels.font] <"12px Arial,Helvetica,sans-serif">
         * The font style of the labels.
         * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         labels: {
	 *             // set the font to 14 px
	 *             font: "14px Arial,Helvetica,sans-serif"
	 *         }
	 *     },
	 *     ...
 	 * });
     * @option {Boolean} [valueAxis.labels.mirror] Mirrors the axis labels and ticks.
     * If the labels are normally on the left side of the axis,
     * mirroring the axis will render them to the right.
     * _example
     * $("#chart").kendoChart({
     *     valueAxis: {
     *         labels: {
     *             // mirror the labels on the right
     *             mirror: true
     *         }
     *     },
     *     ...
     * });
	 * @option {Boolean} [valueAxis.labels.visible] <true> The visibility of the labels.
         * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         labels: {
	 *             // hide the axis labels
	 *             visible: false
	 *         }
	 *    },
	 *    ...
	 * });
	 * @option {Number|Object} [valueAxis.labels.margin] <0> The margin of the labels.
         * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         label: {
 	 *             // sets the top, right, bottom and left margin to 3px.
	 *             margin: 3
         *        }
	 *     },
	 *     ...
	 * });
	 * //
         * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         label: {
 	 *             // sets the top and left margin to 1px
         *             // margin right and bottom are with 0px (by default)
         *             margin: { top: 1, left: 1 }
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {Number | Object} [valueAxis.labels.padding] <0> The padding of the labels.
         * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         label: {
 	 *             // sets the top, right, bottom and left padding to 3px.
         *             padding: 3
         *         }
	 *     },
	 *     ...
	 * });
	 * //
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         label: {
         *             // sets the top and left padding to 1px
         *             // padding right and bottom are with 0px (by default)
         *             padding: { top: 1, left: 1 }
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {Object} [valueAxis.labels.border] The border of the labels.
         * _example 
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         labels: {
	 *             border: {
	 *                 // make the width 1
	 *                 width: 1,
	 *                 // set the color to a dark blue
	 *                 color: "#336699",
	 *                 // set the border style to dashed
	 *                 dashType: "dash"
	 *             }
	 *         }
	 *     },
	 *     ...
	 * });
	 * @option {Number} [valueAxis.labels.border.width] <0> The width of the border.
         * _example 
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         labels: {
	 *             border: {
	 *                 // make the width 1
	 *                 width: 1
	 *             }
	 *         }
	 *     },
	 *     ...
	 * });
	 * @option {String} [valueAxis.labels.border.color] <"black"> The color of the border.
         * _example 
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         labels: {
	 *             border: {
	 *                 // set the color to a dark blue
	 *                 color: "#336699"
	 *             }
	 *         }
	 *     },
	 *     ...
	 * });
	 * @option {String} [valueAxis.labels.border.dashType] <"solid"> The dash type of the border.
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
	 * _example 
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         labels: {
	 *             border: {
	 *                 // set the border style to dashed
	 *                 dashType: "dash"
	 *             }
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {Number} [valueAxis.labels.rotation] <0> The rotation angle of the labels.
         * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         labels: {
	 *             // rotate the labels slightly for visual effect
	 *             rotation: 10
	 *         }
	 *     },
	 *     ...
	 * });
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
         *              // labels template
         *              template: "#= value #%"
         *          }
         *      }
         * });
         * @option {String} [valueAxis.labels.format] The format of the labels.
         * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *        labels: {
	 *            // set the format to currency
         *            format: "{0:C}"
	 *        }
	 *     },
	 *     ...
	 * });
         * @option {Array} [valueAxis.plotBands] The plot bands of the value axis.
         * The plot band fields:
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <code>"from"</code>
         *         </dt>
         *         <dd>
         *              The start position of the plot band in axis units.
         *         </dd>
         *         <dt>
         *             <code>"to"</code>
         *         </dt>
         *         <dd>
         *              The end position of the plot band in axis units.
         *         </dd>
         *         <dt>
         *              <code>"color"</code>
         *         </dt>
         *         <dd>
         *              The color of the plot band.
         *         </dd>
         *    </dl>
         * </div>
         * _example
         * $("#chart").kendoChart({
	 *     ...,
         *     valueAxis: {
         *         plotBands: [{
         *             from: 0.2,
         *             to: 0.4,
         *             color: "green"
         *         }]	
	 *     },
         *  });
         * @option {Object} [valueAxis.title] The title of the value axis.
	 * _example 
	 * $("#chart").kendoChart({
	 *     title: {
	 *         // set the color of the title text to a dark blue
	 *         color: "#336699",
	 *         // set the background color to a light grey
	 *         background: "#e2e2e2",
	 *         // set the text of the title
	 *         text: "Sales By District",
	 *         // decreate the font size of the title to 14 px
	 *         font: "14px Arial,Helvetica,sans-serif",
	 *         // set the margin on all sides to 4
	 *         margin: 4,
	 *         // set padding to 2 px
	 *         padding: 2,
	 *         // tweak the border around the title
	 *         border: {
	 *             // set the width to 1
	 *             width: 1,
	 *             // set the color to a dark blue
	 *             color: "#336699",
	 *             // set the style to dashed
	 *             dashType: "dash"
	 *         },
	 *         // move the title to the bottom
	 *         position: "bottom"
	 *     },
	 *     ...
	 * });        
         * @option {String} [valueAxis.title.color] The text color of the title.
         * _example 
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         title: {
	 *             // set the color of the title text to a dark blue
	 *             color: "#336699"
	 *         }
	 *     },
	 *     ...
	 * });           
	 * @option {String} [valueAxis.title.background] The background color of the title.
         * _example 
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *          title: {
	 *              // set the background color to a light grey
	 *              background: "#e2e2e2"
	 *          }
	 *     },
	 *     ...
	 * });  
	 * @option {String} [valueAxis.title.text] The text of the title.
	 * _example 
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         title: {
	 *             // set the text of the title
	 *             text: "Sales By District"
	 *         }
	 *     },
	 *     ...
	 * });          
	 * @option {String} [valueAxis.title.font] <"16px Arial,Helvetica,sans-serif">
         * The font style of the title.
         * _example 
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         title: {
	 *             // decreate the font size of the title to 14 px
	 *             font: "14px Arial,Helvetica,sans-serif"
	 *         }
	 *     }
	 *     ...
	 * });  
	 * @option {Boolean} [valueAxis.title.visible] <true> The visibility of the title.
         * _example 
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         title: {
	 *             // hide the title
	 *             visible: false
	 *         }
	 *     },
	 *     ...
	 * });  
	 * @option {Number | Object} [valueAxis.title.margin] <5> The margin of the title.
         * _example
         * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         title: {
	 *             // sets the top, right, bottom and left margin to 3px.
         *             margin: 3
	 *         }
         *     },
	 *     ...
	 * });
	 * //
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         title: {
         *             // sets the top and left margin to 1px
         *             // margin right and bottom are with 0px (by default)
         *             margin: { top: 1, left: 1 }
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {Number | Object} [valueAxis.title.padding] <0> The padding of the title.
         * _example
         * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         title: {
	 *             // sets the top, right, bottom and left padding to 3px.
         *             padding: 3
         *         }
	 *     },
	 *     ...
	 * });
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         title: {
         *             // sets the top and left padding to 1px
         *             // padding right and bottom are with 0px (by default)
         *             padding: { top: 1, left: 1 }
         *         }
	 *     },
	 *     ...
	 * });
	 * @option {Object} [valueAxis.title.border] The border of the title.
	 * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         title: {
	 *             // tweak the border around the title
	 *             border: {
	 *                 // set the width to 1
	 *                 width: 1,
	 *                 // set the color to a dark blue
	 *                 color: "#336699",
	 *                 // set the style to dashed
	 *                 dashType: "dash"
	 *     	       }
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {Number} [valueAxis.title.border.width] <0> The width of the border.
         * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         title: {
	 *             // tweak the border around the title
	 *             border: {
	 *                 // set the width to 1
	 *                 width: 1
	 *     	       }
	 *         }
	 *     },
	 *     ...
	 * });
	 * @option {String} [valueAxis.title.border.color] <"black"> The color of the border.
         * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         title: {
	 *             // tweak the border around the title
	 *             border: {
	 *                 // set the color to a dark blue
	 *                 color: "#336699"
	 *             }
	 *     	   }
	 *     },
	 *     ...
	 * });
	 * @option {String} [valueAxis.title.border.dashType] <"solid"> The dash type of the border.
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
	 * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         title: {
	 *             // tweak the border around the title
	 *             border: {
	 *                 // set the style to dashed
	 *                 dashType: "dash"
	 *     	       }	
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {Number} [valueAxis.title.rotation] <0> The rotation angle of the title.
         * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         title: {
	 *             // rotate the title 20 degrees
	 *             rotate: 20
	 *         }
	 *     },
	 *     ...
	 * });
	 * @option {String} [valueAxis.title.position] <"center"> The position of the title.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <code>"top"</code>
         *         </dt>
         *         <dd>
         *              The axis title is positioned on the top (work only with vertical axis).
         *         </dd>
         *         <dt>
         *              <code>"bottom"</code>
         *         </dt>
         *         <dd>
         *              The axis title is positioned on the bottom (work only with vertical axis).
         *         </dd>
         *         <dt>
         *              <code>"left"</code>
         *         </dt>
         *         <dd>
         *              The axis title is positioned on the left (work only with horizontal axis).
         *         </dd>
         *         <dt>
         *              <code>"right"</code>
         *         </dt>
         *         <dd>
         *              "The axis title is positioned on the right (work only with horizontal axis).
         *         </dd>
         *         <dt>
         *             <code>"center"</code>
         *         </dt>
         *         <dd>
         *              "The axis title is positioned in the center.
         *         </dd>
         *    </dl>
         * </div>
         * _example
	 * $("#chart").kendoChart({
	 *     valueAxis: {
	 *         title: {
	 *             // move the title to the bottom of the chart
	 *             position: "bottom"
	 *         } 
	 *     },
	 *     ...
	 * }); 
         *
         * @option {Object} [xAxis] Scatter charts X-axis configuration options.
         * Includes all valueAxis options in addition to:
         * @option {Number} [xAxis.axisCrossingValue] <0>
         * _example
         * $("#chart").kendoChart({
         *     ...,
         *     xAxis: {
         *         // The Y Axis crosses this axis at the '5' mark
         *         axisCrossingValue: 5
         *     },
         *     ...
         * });
         * Value at which the first Y axis crosses this axis.
         * @option {Array} [xAxis.axisCrossingValue] <[0]>
         * Values at which the Y axes cross this X axis.
         * <p>
         * <strong>Note:&nbsp;</strong> Specify a value greater than or equal to the
         * axis maximum value to denote the far end of the axis.
         * _example
         * $("#chart").kendoChart({
         *      ...,
         *      xAxis: {
         *          axisCrossingValues: [0, 1000]
         *      },
         *      yAxis: [{ }, { name: "secondary" }],
         *      ...
         * });
         * </p>
         *
         * @option {Object} [yAxis] The scatter charts Y-axis configuration options.
         * Includes all valueAxis options in addition to:
         * @option {Number} [yAxis.axisCrossingValue] <0>
         * _example
         * $("#chart").kendoChart({
         *     ...,
         *     xAxis: {
         *         // The X Axis crosses this axis at the '5' mark
         *         axisCrossingValue: 5
         *     },
         *     ...
         * });
         * Value at which the first X axis crosses this axis.
         * @option {Array} [yAxis.axisCrossingValue] <[0]>
         * Values at which the X axes cross this Y axis.
         * <p>
         * <strong>Note:&nbsp;</strong> Specify a value greater than or equal to the
         * axis maximum value to denote the far end of the axis.
         * _example
         * $("#chart").kendoChart({
         *      ...,
         *      yAxis: {
         *          axisCrossingValues: [0, 1000]
         *      },
         *      xAxis: [{ }, { name: "secondary" }],
         *      ...
         * });
         * </p>
         *
         * @option {Object} [categoryAxis] The category axis configuration options.
         * @option {Object} [categoryAxis.name] <primary> The unique axis name.
         * @option {Array} [categoryAxis.categories] Array of category names.
	 * _example
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         categories: [ 2005, 2006, 2007, 2008, 2009 ]
	 *     },
	 *     ...,
	 * });
         * @option {String} [categoryAxis.field] The data field containing the category name.
	 * _example
	 * // assuming the following data...
	 * var data = [ { sales: 200, year: 2005 }, { sales: 300, year: 2006 }, { sales: 400, year: 2007 }];
	 * // specify the "year" as the field for the category axis
	 * $("#chart").kendoChart({
	 *     ...,
	 *     categoryAxis: {
	 *         field: "year"
	 *     },
	 *     ...
	 * });
         * @option {Number} [categoryAxis.axisCrossingValue] <0>
         * Category index at which the first value axis crosses this axis.
         * _example
         * $("#chart").kendoChart({
         *     ...,
         *     categoryAxis: {
         *         axisCrossingValue: {
         *             // The Value Axis crosses this axis at the fifth category
         *             axisCrossingValue: 5
         *         }
         *     },
         *     ...
         * });
         * @option {Array} [categoryAxis.axisCrossingValue] <[0]>
         * Category indicies at which the value axes cross the category axis.
         * <p>
         * <strong>Note:&nbsp;</strong> Specify an index greater than or equal to the number
         * of categories to denote the far end of the axis.
         * _example
         * $("#chart").kendoChart({
         *      categoryAxis: {
         *          categories: ["A", "B"]
         *              axisCrossingValues: [0, 100]
         *          },
         *      valueAxis: [{ }, { name: "secondary" }],
         *      ...
         * })'
         * </p>
         * @option {Number} [categoryAxis.minorTickSize] <3> The axis minor tick size.  This is the length of the line in pixels that is drawn to indicate the tick
	 * on the chart.
	 * _example
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         // by default, the size is 3. Increase it to 4 pixels.
	 *         minorTickSize: 4,
	 *     },
	 *     ...
	 * });
         * @option {String} [categoryAxis.minorTickType] <"none"> The axis minor tick size.
	 * The tick can either be drawn outside, or hidden by selecting <b>none</b>.
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
	 * _example
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         // change the tick type to none. this will hide the tick and the number.
	 *         minorTickType: "none"
	 *     },
	 *     ...
	 * }); 
         * @option {Object} [categoryAxis.minorGridLines] Configures the minor grid lines.  These are the lines that are an extension of the minor ticks through
	 * the body of the chart.  Note that minor grid lines are not visible by default, therefore none of these settings will take effect with the minor grid
	 * lines visibility being set to <b>true</b>.
         * _example
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         minorGridLines: {
	 *             // set visible to true
	 *             visible: true,
	 *             // set width to 2 pixels
	 *             width: 2,
	 *             // set the color to a dark blue
	 *             color: "#336699"
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {Number} [categoryAxis.minorGridLines.width] <1> The width of the lines. Note that this setting has no effect if the visibility of the minor
	 * grid lines is not set to <b>true</b>.
         * _example
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         minorGridLines: {
	 *             // set visible to true
	 *             visible: true,
	 *             // set width to 2 pixels
	 *             width: 2,
	 *             // set the color to a dark blue
	 *             color: "#336699"
	 *         }
	 *     },
	 *     ...
	 * });
	 * @option {String} [categoryAxis.minorGridLines.color] <"black"> The color of the lines. Note that this setting has no effect if the visibility of the minor
	 * grid lines is not set to <b>true</b>.
	 * _example
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         minorGridLines: {
	 *             // set visible to true
	 *             visible: true,
	 *             // set width to 2 pixels
	 *             width: 2,
	 *             // set the color to a dark blue
	 *             color: "#336699"
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {Boolean} [categoryAxis.minorGridLines.visible] <false> The visibility of the lines.
         * _example
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         minorGridLines: {
	 *             // set visible to true
	 *             visible: true,
	 *             // set width to 2 pixels
	 *             width: 2,
	 *             // set the color to a dark blue
	 *             color: "#336699"
	 *         }
	 *     },
	 *     ...
	 * });
	 * @option {Object} [categoryAxis.majorGridLines] Configures the major grid lines. These are the lines that are an extension of the major ticks through the
	 * body of the chart.
	 * _example 
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *          majorGridLines: {
	 *             // set the width of the lines to 2 pixels
	 *             width: 2,
	 *             // set the color to a dark blue
	 *             color: "#336699"
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {Number} [categoryAxis.majorGridLines.width] <1> The width of the lines.
         * _example 
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         majorGridLines: {
	 *             // set the width of the lines to 2 pixels
	 *             width: 2,
	 *             // set the color to a dark blue
	 *             color: "#336699"
	 *         }
	 *     },
	 *     ...
	 * });
	 * @option {String} [categoryAxis.majorGridLines.color] <"black"> The color of the lines.
         * _example 
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         majorGridLines: {
	 *             // set the width of the lines to 2 pixels
	 *             width: 2,
	 *             // set the color to a dark blue
	 *             color: "#336699"
	 *         }
	 *     },
	 *     ...
	 * });
	 * @option {Boolean} [categoryAxis.majorGridLines.visible] <false> The visibility of the lines.
         * _example 
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         majorGridLines: {
	 *             // hide the major grid lines
	 *             visible: false
	 *         }
	 *     },
	 *     ...
	 * });
	 * @option {String} [categoryAxis.color] Color to apply to all axis elements. Any valid CSS color string will work here, including hex and rgb.
	 * Individual color settings for line and labels take priority.
	 * _example
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         // set the default color for all axis elements to a dark blue. note that
	 *         // any axis elements with color settings will override this.
	 *         color: "#336699"
	 *     },
	 *     ...
	 * });
         * @option {Object} [categoryAxis.line] Configures the axis line. This will also effect major and minor ticks, but not gridlines.
	 * _example 
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         line: {
	 *             // change the line width to 2 pixels
	 *             width: 2,
	 * 	       // set the color to light grey
	 *             color: "#e2e2e2"
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {Number} [categoryAxis.line.width] <1> The width of the line.  This will also effect the major and minor ticks, but
	 * not the grid lines.
	 * _example 
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         line: {
	 *             // change the line width to 2 pixels
	 *             width: 2
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {String} [categoryAxis.line.color] <"black"> The color of the lines.  This will also effect the major and minor tick,
	 * but not the grid lines
         * _example 
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         line: {
	 * 	       // set the color to light grey
	 *             color: "#e2e2e2"
	 *         }
	 *     },
	 *     ...
	 * });
	 * @option {Boolean} [categoryAxis.line.visible] <true> The visibility of the lines.
	 * _example 
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         line: {
	 *             // hide the lines completely
	 *             visible: false
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {Object} [categoryAxis.labels] Configures the axis labels.
         * _example 
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         labels: {
	 *             // set the color of the text on the labels to a dark blue
	 *             color: "#336699",
	 *             // set the background color of the labels to a light grey
	 *             background: "#e2e2e2",
	 *             // make the font 14px
	 *             font: "14px Arial,Helvetica,sans-serif",
	 *             // zero out the margins
	 *             margin: 0,
	 *             // make the padding 2 px all around
	 *             padding: 2,
	 *             // tweak the border style
	 *             border: {
	 *                 // make the width 1
	 *                 width: 1,
	 *                 // set the color to a dark blue
	 *                 color: "#336699",
	 *                 // set the border style to dashed
	 *                 dashType: "dash"
	 *             },
	 *             // rotate the labels just slightly for visual effect
	 *             rotation: 10,
	 *             // format the labels for currency
	 *             format: "{0:C}"
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {String} [categoryAxis.labels.color] The text color of the labels. Any valid CSS color string will work here, including hex and rgb.
         * _example 
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         labels: {
	 *             // set the color of the text on the labels to a dark blue
	 *             color: "#336699"
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {String} [categoryAxis.labels.background] The background color of the labels. Any valid CSS color string will work here, including hex
 	 * and rgb.
         * _example 
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         labels: {
	 *             // set the background color of the labels to a light grey
	 *             background: "#e2e2e2"
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {String} [categoryAxis.labels.font] <"12px Arial,Helvetica,sans-serif">
         * The font style of the labels.
         * _example 
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         labels: {
	 *             // make the font 14px
	 *             font: "14px Arial,Helvetica,sans-serif"
	 *         }
	 *     },
	 *     ...
	 * });
     * @option {Boolean} [categoryAxis.labels.mirror] Mirrors the axis labels and ticks.
     * If the labels are normally on the left side of the axis,
     * mirroring the axis will render them to the right.
     * _example
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         labels: {
	 *             // mirror the labels on the right
	 *             mirror: true
	 *         }
	 *     },
	 *     ...
	 * });
	 * @option {Boolean} [categoryAxis.labels.visible] <true> The visibility of the labels.
	 * _example
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         labels: {
	 *             // hide the lables
	 *             visible: false
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {Number | Object} [categoryAxis.labels.margin] <0> The margin of the labels.
         * _example
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         label: {
 	 *             // sets the top, right, bottom and left padding to 3px.
         *             padding: 3
         *         }
	 *     },
	 *     ...
	 * });
	 * //
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         label: {
         *             // sets the top and left padding to 1px
         *             // padding right and bottom are with 0px (by default)
         *             padding: { top: 1, left: 1 }
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {Object} [categoryAxis.labels.border] The border of the labels.
	 * _example 
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         labels: {
	 *             border: {
	 *                 // make the width 1
	 *                 width: 1,
	 *                 // set the color to a dark blue
	 *                 color: "#336699",
	 *                 // set the border style to dashed
	 *                 dashType: "dash"
	 *             }
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {Number} [categoryAxis.labels.border.width] <0> The width of the border.
	 * _example 
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         labels: {
	 *             border: {
	 *                 // make the width 1
	 *                 width: 1
	 *             }
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {String} [categoryAxis.labels.border.color] <"black"> The color of the border.
         * _example 
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         labels: {
	 *             border: {
	 *                 // set the color to a dark blue
	 *                 color: "#336699"
	 *             }
	 *         }
	 *     },
	 *     ...
	 * });
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
	 * _example 
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         labels: {
	 *             border: {
	 *                 // set the border style to dashed
	 *                 dashType: "dash"
	 *             }
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {Number} [categoryAxis.labels.rotation] <0> The rotation angle of the labels.
	 * _example
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         labels: {
	 *             // rotate the labels slightly for visual effect
	 *             rotation: 10
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {String/Function} [categoryAxis.labels.template] The label template.
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
         *          categories: [2000, 2001, 2002, 2003],
         *          labels: {
         *              // labels template
         *              template: "Year: #= value #"
         *          }
         *      }
         * });
         * @option {String} [categoryAxis.labels.format] The format of the labels.
         * _example
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *        labels: {
	 *            // set the format to currency
         *            format: "{0:C}"
	 *        }
	 *     },
	 *     ...
	 * });
         * @option {Array} [categoryAxis.plotBands] The plot bands of category axis.
         * The plot band fields:
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <code>"from"</code>
         *         </dt>
         *         <dd>
         *              The start position of the plot band.
         *         </dd>
         *         <dt>
         *              <code>"to"</code>
         *         </dt>
         *         <dd>
         *              The end position of the plot band.
         *         </dd>
         *         <dt>
         *              <code>"color"</code>
         *         </dt>
         *         <dd>
         *              The color of the plot band.
         *         </dd>
         *    </dl>
         * </div>
         * _example
         * $("#chart").kendoChart({
	 *     ...,
         *     categoryAxis: {
         *         plotBands: [{
         *             from: 0.2,
         *             to: 0.4,
         *             color: "green"
         *         }]	
	 *     },
         *  });
         * @option {Object} [categoryAxis.title] The title of the category axis.
	 * _example 
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         title: {
	 *             // set the color of the title text to a dark blue
	 *             color: "#336699",
	 *             // set the background color to a light grey
	 *             background: "#e2e2e2",
	 *             // set the text of the title
	 *             text: "Sales By District",
	 *             // decreate the font size of the title to 14 px
	 *             font: "14px Arial,Helvetica,sans-serif",
	 *             // set the margin on all sides to 4
	 *             margin: 4,
	 *             // set padding to 2 px
	 *             padding: 2,
	 *             // tweak the border around the title
	 *             border: {
	 *                 // set the width to 1
	 *                 width: 1,
	 *                 // set the color to a dark blue
	 *                 color: "#336699",
	 *                 // set the style to dashed
	 *                 dashType: "dash"
	 *             },
	 *             // move the title to the bottom
	 *             position: "bottom"
	 *         }
	 *     },
	 *     ...
	 * });   
         * @option {String} [categoryAxis.title.color] The text color of the title. Any valid CSS color string will work here, including hex and rgb.
         * _example 
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         title: {
	 *             // set the color of the title text to a dark blue
	 *             color: "#336699"
	 *         }
	 *     },
	 *     ...
	 * });    
	 * @option {String} [categoryAxis.title.background] The background color of the title. Any valid CSS color string will work here, including
	 * hex and rgb.
         * _example 
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         title: {
	 *             // set the color of the background to a light grey
	 *             background: "#e2e2e2"
	 *         }
	 *     },
	 *     ...
	 * });    
	 * @option {String} [categoryAxis.title.text] The text of the title.
         * _example 
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         title: {
	 *             // set the text of the title
	 *             text: "Sales By District"
	 *         }
	 *     },
	 *     ...
	 * });    
	 * @option {String} [categoryAxis.title.font] <"16px Arial,Helvetica,sans-serif">
         * The font style of the title.
         * _example 
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         title: {
	 *             // decreate the font size of the title to 14 px
	 *             font: "14px Arial,Helvetica,sans-serif"
	 *         }
	 *     }
	 *     ...
	 * });  
	 * @option {Boolean} [categoryAxis.title.visible] <true> The visibility of the title.
         * _example 
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         title: {
	 *             // hide the title
	 *             visible: false
	 *         }
	 *     },
	 *     ...
	 * });  
	 * @option {Number|Object} [categoryAxis.title.margin] <5> The margin of the title.
         * _example
         * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         title: {
	 *             // sets the top, right, bottom and left margin to 3px.
         *             margin: 3
	 *         }
         *     },
	 *     ...
	 * });
	 * //
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         title: {
         *             // sets the top and left margin to 1px
         *             // margin right and bottom are with 0px (by default)
         *             margin: { top: 1, left: 1 }
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {Object} [categoryAxis.title.border] The border of the title.
	 * _example
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         title: {
	 *             // tweak the border around the title
	 *             border: {
	 *                 // set the width to 1
	 *                 width: 1,
	 *                 // set the color to a dark blue
	 *                 color: "#336699",
	 *                 // set the style to dashed
	 *                 dashType: "dash"
	 *     	       }
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {Number} [categoryAxis.title.border.width] <0> The width of the border.
	 * _example
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         title: {
	 *             // tweak the border around the title
	 *             border: {
	 *                 // set the width to 1
	 *                 width: 1
	 *     	       }
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {String} [categoryAxis.title.border.color] <"black"> The color of the border.
         * _example
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         title: {
	 *             // tweak the border around the title
	 *             border: {
	 *                 // set the color to a dark blue
	 *                 color: "#336699"
	 *     	       }
	 *         }
	 *     },
	 *     ...
	 * });
	 * @option {String} [categoryAxis.title.border.dashType] <"solid"> The dash type of the border.
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
	 * _example
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         title: {
	 *             // tweak the border around the title
	 *             border: {
	 *                 // set the style to dashed
	 *                 dashType: "dash"
	 *     	       }
	 *         }
	 *     },
	 *     ...
	 * });
         * @option {Number} [categoryAxis.title.rotation] <0> The rotation angle of the title.
         * _example
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         title: {
	 *             // rotate the title 20 degrees
	 *             rotate: 20
	 *         }
	 *     },
	 *     ...
	 * });
	 * @option {String} [categoryAxis.title.position] <"center"> The position of the title.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <code>"top"</code>
         *         </dt>
         *         <dd>
         *              The axis title is positioned on the top (work only with vertical axis)
         *         </dd>
         *         <dt>
         *              <code>"bottom"</code>
         *         </dt>
         *         <dd>
         *              The axis title is positioned on the bottom (work only with vertical axis)
         *         </dd>
         *         <dt>
         *              <code>"left"</code>
         *         </dt>
         *         <dd>
         *              The axis title is positioned on the left (work only with horizontal axis)
         *         </dd>
         *         <dt>
         *              <code>"right"</code>
         *         </dt>
         *         <dd>
         *              The axis title is positioned on the right (work only with horizontal axis)
         *         </dd>
         *         <dt>
         *              <code>"center"</code>
         *         </dt>
         *         <dd>
         *              The axis title is positioned in the center
         *         </dd>
         *    </dl>
         * </div>
         * _example
	 * $("#chart").kendoChart({
	 *     categoryAxis: {
	 *         title: {
	 *             // move the title to the bottom of the chart
	 *             position: "bottom"
	 *         } 
	 *     },
	 *     ...
	 * }); 
         * @option {Object} [seriesDefaults] Default values for each series.
         * @option {Boolean} [seriesDefaults.stacked] <false>
         * A value indicating if the series should be stacked.
         * @option {Number} [seriesDefaults.gap] <1.5> The distance between category clusters.
         * @option {Number} [seriesDefaults.spacing] <0.4> Space between bars.
         * @option {Object} [seriesDefaults.labels] Configures the series data labels.
         * @option {String} [seriesDefaults.labels.color] The text color of the labels.
         * @option {String} [seriesDefaults.labels.background] The background color of the labels.
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
         *              template: "#= value  #%",
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
         * @option {Object} [seriesDefaults.tooltip] The data point tooltip configuration options.
         * @option {String} [seriesDefaults.tooltip.format] The tooltip format.
         * _example
         * //sets format of the tooltip
         * format: "{0:C}"
         * @option {String|Function} [seriesDefaults.tooltip.template] The tooltip template.
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
         * $("#chart").kendoChart({
         *      title: {
         *          text: "My Chart Title"
         *      },
         *      seriesDefaults: {
         *          tooltip: {
         *              visible: true,
         *              template: "#= category # - #= value #"
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
         * @option {String} [seriesDefaults.tooltip.font] <"12px Arial,Helvetica,sans-serif"> The tooltip font.
         * @option {String} [seriesDefaults.tooltip.color]
         * The text color of the tooltip. The default is the same as the series labels color.
         * @option {String} [seriesDefaults.tooltip.background]
         * The background color of the tooltip. The default is determined from the series color.
         * @option {Number|Object} [seriesDefaults.tooltip.padding] The padding of the tooltip.
         * _example
         * // sets the top, right, bottom and left padding to 3px.
         * padding: 3
         *
         * // sets the top and left padding to 1px
         * // right and bottom padding are left at their default values
         * padding: { top: 1, left: 1 }
         * @option {Object} [seriesDefaults.tooltip.border] The border configuration options.
         * @option {Number} [seriesDefaults.tooltip.border.width] <0> The width of the border.
         * @option {String} [seriesDefaults.tooltip.border.color] <"black"> The color of the border.
         * @option {Boolean} [seriesDefaults.tooltip.visible] <false> A value indicating if the tooltip should be displayed.
         * @option {Object} [seriesDefaults.bar]
         * The default options for all bar series. For more details see the series options.
         * @option {Object} [seriesDefaults.column] The column configuration options.
         * The default options for all column series. For more details see the series options.
         * @option {Object} [seriesDefaults.line] The line configuration options.
         * The default options for all line series. For more details see the series options.
         * @option {Object} [seriesDefaults.verticalLine] The vertical line configuration options.
         * The default options for all vertical line series. For more details see the series options.
         * @option {Object} [seriesDefaults.pie] The pie configuration options.
         * The default options for all pie series. For more details see the series options.
         * @option {Object} [seriesDefaults.scatter] The scatter configuration options.
         * The default options for all scatter series. For more details see the series options.
         * @option {Object} [seriesDefaults.scatterLine] The scatterLine configuration options.
         * The default options for all scatterLine series. For more details see the series options.
         * @option {Object} [seriesDefaults.area] The area configuration options.
         * The default options for all area series. For more details see the series options.
         * @option {Object} [seriesDefaults.verticalArea] The vertical area configuration options.
         * The default options for all vertical area series. For more details see the series options.
         * @option {Array} [series] Array of series definitions.
         * <p>
         * The series type is determined by the value of the type field.
         * If a type value is missing, the type is assumed to be the one specified in seriesDefaults.
         * </p>
         * <p>
         * Each series type has a different set of options.
         * </p>
         * @option {String} [series.name] The series name visible in the legend.
         * @option {Array} [series.data] Array of data points.
         * @option {String} [series.field] The data field containing the series value.
         * @option [series.type="bar"] Available options for bar series:
         * @option {Boolean} [series.type="bar".stacked] <false>
         * A value indicating if the series should be stacked.
         * @option {Number} [series.type="bar".gap] <1.5> The distance between category clusters.
         * @option {Number} [series.type="bar".spacing] <0.4> Space between bars.
         * @option {String} [series.type="bar".name] The series name.
         * @option {String} [series.type="bar".axis] <primary> The name of the value axis to use.
         * @option {String} [series.type="bar".color] The series base color.
         * @option {Number} [series.type="bar".opacity] <1> The series opacity.
         * @option {Object} [series.type="bar".labels] Configures the series data labels.
         * @option {String} [series.type="bar".labels.color] The text color of the labels.
         * @option {String} [series.type="bar".labels.background] The background color of the labels.
         * @option {String} [series.type="bar".labels.font] <"12px Arial,Helvetica,sans-serif">
         * The font style of the labels.
         * @option {String} [series.type="bar".labels.position] <"outsideEnd">
         * Defines the position of the bar labels.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <code>"center"</code>
         *         </dt>
         *         <dd>
         *              The label is positioned at the bar center.
         *         </dd>
         *         <dt>
         *              <code>"insideEnd"</code>
         *         </dt>
         *         <dd>
         *              The label is positioned inside, near the end of the bar.
         *         </dd>
         *         <dt>
         *              <code>"insideBase"</code>
         *         </dt>
         *         <dd>
         *              The label is positioned inside, near the base of the bar.
         *         </dd>
         *         <dt>
         *              <code>"outsideEnd"</code>
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
         *                  template: "#= value #%",
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
         * @option {Object} [series.type="bar".tooltip] The data point tooltip configuration options.
         * @option {String} [series.type="bar".tooltip.format] The tooltip format.
         * _example
         * //sets format of the tooltip
         * format: "{0:C}"
         * @option {String|Function} [series.type="bar".tooltip.template] The tooltip template.
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
         * $("#chart").kendoChart({
         *      title: {
         *          text: "My Chart Title"
         *      },
         *      series: [
         *          {
         *              type: "bar",
         *              name: "Series 1",
         *              data: [200, 450, 300, 125],
         *              tooltip: {
         *                  visible: true,
         *              template: "#= category # - #= value #"
         *              }
         *          }
         *      ],
         *      categoryAxis: {
         *          categories: [2000, 2001, 2002, 2003]
         *      }
         * });
         * @option {String} [series.type="bar".tooltip.font] <"12px Arial,Helvetica,sans-serif"> The tooltip font.
         * @option {String} [series.type="bar".tooltip.color]
         * The text color of the tooltip. The default is the same as the series labels color.
         * @option {String} [series.type="bar".tooltip.background]
         * The background color of the tooltip. The default is determined from the series color.
         * @option {Number|Object} [series.type="bar".tooltip.padding] The padding of the tooltip.
         * _example
         * // sets the top, right, bottom and left padding to 3px.
         * padding: 3
         *
         * // sets the top and left padding to 1px
         * // right and bottom padding are left at their default values
         * padding: { top: 1, left: 1 }
         * @option {Object} [series.type="bar".tooltip.border] The border configuration options.
         * @option {Number} [series.type="bar".tooltip.border.width] <0> The width of the border.
         * @option {String} [series.type="bar".tooltip.border.color] <"black"> The color of the border.
         * @option {Boolean} [series.type="bar".tooltip.visible] <false> A value indicating if the tooltip should be displayed.
         * @option [series.type="column"]
         * Column series accepts the same parameters as bar series.
         * The difference is that column series are rendered on a horizontal category axis.
         *
         * @option [series.type="line"] Available options for line series:
         * @option {Boolean} [series.type="line".stacked] <false>
         * A value indicating if the series should be stacked.
         * @option {String} [series.type="line".name] The series name.
         * @option {String} [series.type="line".axis] <primary> The name of the value axis to use.
         * @option {String} [series.type="line".width] <4> The line width of the line chart.
         * @option {String} [series.type="line".color] The series base color.
         * @option {Number} [series.type="line".opacity] <1> The series opacity.
         * @option {String} [series.type="line".missingValues] <"gap">
         * Configures the behavior for handling missing values in line series.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <code>"interpolate"</code>
         *         </dt>
         *         <dd>
         *              The value is interpolated from neighboring points.
         *         </dd>
         *         <dt>
         *              <code>"zero"</code>
         *         </dt>
         *         <dd>
         *              The value is assumed to be zero.
         *         </dd>
         *         <dt>
         *              <code>"gap"</code>
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
         *              <code>"square"</code>
         *         </dt>
         *         <dd>
         *              The marker shape is square.
         *         </dd>
         *         <dt>
         *              <code>"triagle"</code>
         *         </dt>
         *         <dd>
         *              The marker shape is triagle.
         *         </dd>
         *         <dt>
         *              <code>"circle"</code>
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
         * @option {Object} [series.type="line".labels] Configures the series data labels.
         * @option {String} [series.type="line".labels.color] The text color of the labels.
         * @option {String} [series.type="line".labels.background] The background color of the labels.
         * @option {String} [series.type="line".labels.font] <"12px Arial,Helvetica,sans-serif">
         * The font style of the labels.
         * @option {String} [series.type="line".labels.position] <"above">
         * Defines the position of the line labels.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <code>"above"</code>
         *         </dt>
         *         <dd>
         *              The label is positioned at the top of the line chart marker.
         *         </dd>
         *         <dt>
         *              <code>"right"</code>
         *         </dt>
         *         <dd>
         *              The label is positioned at the right of the line chart marker.
         *         </dd>
         *         <dt>
         *              <code>"below"</code>
         *         </dt>
         *         <dd>
         *              The label is positioned at the bottom of the line chart marker.
         *         </dd>
         *         <dt>
         *              <code>"left"</code>
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
         *              type: "line",
         *              name: "Series 1",
         *              data: [200, 450, 300, 125],
         *              labels: {
         *                  // label template
         *                  template: "#= value #%",
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
         * @option {Object} [series.type="line".tooltip] The data point tooltip configuration options.
         * @option {String} [series.type="line".tooltip.format] The tooltip format.
         * _example
         * //sets format of the tooltip
         * format: "{0:C}"
         * @option {String|Function} [series.type="line".tooltip.template] The tooltip template.
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
         * $("#chart").kendoChart({
         *      title: {
         *          text: "My Chart Title"
         *      },
         *      series: [
         *          {
         *              type: "line",
         *              name: "Series 1",
         *              data: [200, 450, 300, 125],
         *              tooltip: {
         *                  visible: true,
         *                  template: "#= category # - #= value #"
         *              }
         *          }
         *      ],
         *      categoryAxis: {
         *          categories: [2000, 2001, 2002, 2003]
         *      }
         * });
         * @option {String} [series.type="line".tooltip.font] <"12px Arial,Helvetica,sans-serif"> The tooltip font.
         * @option {String} [series.type="line".tooltip.color]
         * The text color of the tooltip. The default is the same as the series labels color.
         * @option {String} [series.type="line".tooltip.background]
         * The background color of the tooltip. The default is determined from the series color.
         * @option {Number|Object} [series.type="line".tooltip.padding] The padding of the tooltip.
         * _example
         * // sets the top, right, bottom and left padding to 3px.
         * padding: 3
         *
         * // sets the top and left padding to 1px
         * // right and bottom padding are left at their default values
         * padding: { top: 1, left: 1 }
         * @option {Object} [series.type="line".tooltip.border] The border configuration options.
         * @option {Number} [series.type="line".tooltip.border.width] <0> The width of the border.
         * @option {String} [series.type="line".tooltip.border.color] <"black"> The color of the border.
         * @option {Boolean} [series.type="line".tooltip.visible] <false> A value indicating if the tooltip should be displayed.
         * @option [series.type="verticalLine"]
         * Vertical line series accepts the same parameters as line series.
         *
         * The line and the category axis are now vertical instead of horizontal.
         * @option [series.type="pie"] Available options for pie series:
         * @option {String} [series.type="pie".categoryField]
         * The data field containing the sector category name.
         * @option {String} [series.type="pie".colorField]
         * The data field containing the sector color.
         * @option {Array} [series.type="pie".data] Array of data items (optional).
         * The pie chart can be bound to an array of numbers or an array of objects
         * with the following fields:
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <code>"value"</code>
         *         </dt>
         *         <dd>
         *              The sector value.
         *         </dd>
         *         <dt>
         *              <code>"category"</code>
         *         </dt>
         *         <dd>
         *              The sector category that is shown in the legend.
         *         </dd>
         *         <dt>
         *              <code>"color"</code>
         *         </dt>
         *         <dd>
         *              The sector color.
         *         </dd>
         *         <dt>
         *              <code>"explode"</code>
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
         * @option {String} [series.type="pie".explodeField]
         * The data field containing a boolean value that indicates if the sector is exploded.
         * @option {Number} [series.type="pie".padding] <60> The padding around the pie chart (equal on all sides).
         * @option {Number} [series.type="pie".opacity] <1> The series opacity.
         * @option {Object} [series.type="pie".labels] Configures the series data labels.
         * @option {String} [series.type="pie".labels.color] The text color of the labels.
         * @option {String} [series.type="pie".labels.background] The background color of the labels.
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
         * <ul>
         *     <li><strong>value</strong> - the point value</li>
         *     <li><strong>percentage</strong> - the point value represented as a percentage value</li>
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
         *                  template: "#= value #%",
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
         *             <code>"circle"</code>
         *         </dt>
         *         <dd>
         *              The labels are positioned in circle around the pie chart.
         *         </dd>
         *         <dt>
         *             <code>"column"</code>
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
         * @option {Object} [series.type="pie".tooltip] The data point tooltip configuration options.
         * @option {String} [series.type="pie".tooltip.format] The tooltip format.
         * _example
         * //sets format of the tooltip
         * format: "{0:C}"
         * @option {String|Function} [series.type="pie".tooltip.template] The tooltip template.
         * Template variables:
         * <ul>
         *     <li><strong>value</strong> - the point value</li>
         *     <li><strong>percentage</strong> - the point value represented as a percentage value</li>
         *     <li><strong>category</strong> - the category name</li>
         *     <li><strong>series</strong> - the data series</li>
         *     <li><strong>dataItem</strong> - the original data item used to construct the point.
         *         Will be null if binding to array.
         *     </li>
         * </ul>
         * _example
         * $("#chart").kendoChart({
         *      title: {
         *          text: "My Chart Title"
         *      },
         *      series: [
         *          {
         *              type: "pie",
         *              name: "Series 1",
         *              data: [200, 450, 300, 125],
         *              tooltip: {
         *                  visible: true,
         *                  template: "#= category # - #= value #"
         *              }
         *          }
         *      ]
         * });
         * @option {String} [series.type="pie".tooltip.font] <"12px Arial,Helvetica,sans-serif"> The tooltip font.
         * @option {String} [series.type="pie".tooltip.color]
         * The text color of the tooltip. The default is the same as the series labels color.
         * @option {String} [series.type="pie".tooltip.background]
         * The background color of the tooltip. The default is determined from the series color.
         * @option {Number|Object} [series.type="pie".tooltip.padding] The padding of the tooltip.
         * _example
         * // sets the top, right, bottom and left padding to 3px.
         * padding: 3
         *
         * // sets the top and left padding to 1px
         * // right and bottom padding are left at their default values
         * padding: { top: 1, left: 1 }
         * @option {Object} [series.type="pie".tooltip.border] The border configuration options.
         * @option {Number} [series.type="pie".tooltip.border.width] <0> The width of the border.
         * @option {String} [series.type="pie".tooltip.border.color] <"black"> The color of the border.
         * @option {Boolean} [series.type="pie".tooltip.visible] <false> A value indicating if the tooltip should be displayed.
         *
         * @option [series.type="scatter"] Available options for scatter series:
         * @option {String} [series.type="scatter".color] The series base color.
         * @option {Array} [series.type="scatter".data] Array of data items (optional).
         * The scatter chart can be bound to an array of arrays with two numbers (X and Y).
         *  _example
         *  // ...
         *  series:[{
         *      type: "scatter",
         *      data:[[1, 1], [1, 2]],
         *      name: "Points"
         *  }]
         *  // ...
         * @option {Number} [series.type="scatter".opacity] <1> The series opacity.
         * @option {Object} [series.type="scatter".labels] Configures the series data labels.
         * @option {String} [series.type="scatter".labels.color] The text color of the labels.
         * @option {String} [series.type="scatter".labels.background] The background color of the labels.
         * @option {Object} [series.type="scatter".labels.border] The border of the labels.
         * @option {Number} [series.type="scatter".labels.border.width] <0> The width of the border.
         * @option {String} [series.type="scatter".labels.border.color] <"black"> The color of the border.
         * @option {String} [series.type="scatter".labels.border.dashType] <"solid"> The dash type of the border.
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
         * @option {String} [series.type="scatter".labels.font] <"12px Arial,Helvetica,sans-serif">
         * The font style of the labels.
         * @option {String} [series.type="scatter".labels.format] The format of the labels.
         * _example
         * //sets format of the labels
         * format: "{0:C}"
         * @option {Number|Object} [series.type="scatter".labels.margin] <{ left: 5, right: 5}>
         * The margin of the labels.
         * _example
         * // sets the top, right, bottom and left margin to 3px.
         * margin: 3
         *
         * // sets the top and bottom margin to 1px
         * // margin left and right are with 5px (by default)
         * margin: { top: 1, bottom: 1 }
         * @option {Number|Object} [series.type="scatter".labels.padding] <0> The padding of the labels.
         * _example
         * // sets the top, right, bottom and left padding to 3px.
         * padding: 3
         *
         * // sets the top and left padding to 1px
         * // padding right and bottom are with 0px (by default)
         * padding: { top: 1, left: 1 }
         * @option {String} [series.type="scatter".labels.position] <"above">
         * Defines the position of the scatter labels.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <code>"above"</code>
         *         </dt>
         *         <dd>
         *              The label is positioned at the top of the scatter chart marker.
         *         </dd>
         *         <dt>
         *              <code>"right"</code>
         *         </dt>
         *         <dd>
         *              The label is positioned at the right of the scatter chart marker.
         *         </dd>
         *         <dt>
         *              <code>"below"</code>
         *         </dt>
         *         <dd>
         *              The label is positioned at the bottom of the scatter chart marker.
         *         </dd>
         *         <dt>
         *              <code>"left"</code>
         *         </dt>
         *         <dd>
         *              The label is positioned at the left of the scatter chart marker.
         *         </dd>
         *    </dl>
         * </div>
         * @option {String/Function} [series.type="scatter".labels.template] The label template.
         * Template variables:
         * <ul>
         *     <li><strong>value.x</strong> - the x value</li>
         *     <li><strong>value.y</strong> - the y value</li>
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
         *              type: "scatter",
         *              name: "Series 1",
         *              data: [[1, 1], [1, 2], [1, 3]],
         *              labels: {
         *                  // label template
         *                  template: "#= value.x # - #= value.y x #",
         *                  visible: true
         *              }
         *          }
         *      ]
         * });
         * @option {Boolean} [series.type="scatter".labels.visible] <false> The visibility of the labels.
         * @option {Object} [series.type="scatter".markers] Configures the scatter markers.
         * @option {String} [series.type="scatter".markers.type] <"square">
         * Configures the markers shape type.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *             <code>"square"</code>
         *         </dt>
         *         <dd>
         *              The marker shape is square.
         *         </dd>
         *         <dt>
         *              <code>"triagle"</code>
         *         </dt>
         *         <dd>
         *              The marker shape is triagle.
         *         </dd>
         *         <dt>
         *              <code>"circle"</code>
         *         </dt>
         *         <dd>
         *              The marker shape is circle.
         *         </dd>
         *    </dl>
         * </div>
         * @option {Number} [series.type="scatter".markers.size] <6> The marker size.
         * @option {Boolean} [series.type="scatter".markers.visible] <true> The markers visibility.
         * @option {Object} [series.type="scatter".markers.border] The border of the markers.
         * @option {Number} [series.type="scatter".markers.border.width] <0> The width of the border.
         * @option {String} [series.type="scatter".markers.border.color] <"black"> The color of the border.
         * @option {String} [series.type="scatter".markers.background]
         * The background color of the current series markers.
         * @option {String} [series.type="scatter".missingValues] <"gap">
         * Configures the behavior for handling missing values in scatter series.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <code>"interpolate"</code>
         *         </dt>
         *         <dd>
         *              The value is interpolated from neighboring points.
         *         </dd>
         *         <dt>
         *              <code>"zero"</code>
         *         </dt>
         *         <dd>
         *              The value is assumed to be zero.
         *         </dd>
         *         <dt>
         *              <code>"gap"</code>
         *         </dt>
         *         <dd>
         *              The line stops before the missing point and continues after it.
         *         </dd>
         *    </dl>
         * </div>
         * @option {String} [series.type="scatter".name] The series name.
         * @option {String} [series.type="scatter".xAxis] <primary> The name of the X axis to use.
         * @option {String} [series.type="scatter".yAxis] <primary> The name of the Y axis to use.
         * @option {Object} [series.type="scatter".tooltip] The data point tooltip configuration options.
         * @option {String} [series.type="scatter".tooltip.background]
         * The background color of the tooltip. The default is determined from the series color.
         * @option {Object} [series.type="scatter".tooltip.border] The border configuration options.
         * @option {Number} [series.type="scatter".tooltip.border.width] <0> The width of the border.
         * @option {String} [series.type="scatter".tooltip.border.color] <"black"> The color of the border.
         * @option {String} [series.type="scatter".tooltip.color]
         * The text color of the tooltip. The default is the same as the series labels color.
         * @option {String} [series.type="scatter".tooltip.font] <"12px Arial,Helvetica,sans-serif"> The tooltip font.
         * @option {String} [series.type="scatter".tooltip.format] The tooltip format.
         * _example
         * //sets format of the tooltip
         * format: "{0:C}--{0:C}"
         * @option {Number|Object} [series.type="scatter".tooltip.padding] The padding of the tooltip.
         * _example
         * // sets the top, right, bottom and left padding to 3px.
         * padding: 3
         *
         * // sets the top and left padding to 1px
         * // right and bottom padding are left at their default values
         * padding: { top: 1, left: 1 }
         * @option {String|Function} [series.type="scatter".tooltip.template] The tooltip template.
         * Template variables:
         * <ul>
         *     <li><strong>value.x</strong> - the x value</li>
         *     <li><strong>value.y</strong> - the y value</li>
         *     <li><strong>series</strong> - the data series</li>
         *     <li><strong>dataItem</strong> - the original data item used to construct the point.
         *         Will be null if binding to array.
         *     </li>
         * </ul>
         * _example
         * $("#chart").kendoChart({
         *      title: {
         *          text: "My Chart Title"
         *      },
         *      series: [
         *          {
         *              type: "scatter",
         *              name: "Series 1",
         *              data: [[1, 1], [1, 2], [1, 3]],
         *              tooltip: {
         *                  visible: true,
         *                  template: "#= category # - #= value.x # - #= value.y #"
         *              }
         *          }
         *      ]
         * });
         * @option {Boolean} [series.type="scatter".tooltip.visible] <false> A value indicating if the tooltip should be displayed.
         *
         * @option [series.type="scatterLine"] Available options for scatter line series:
         * @option {String} [series.type="scatterLine".color] The series base color.
         * @option {Array} [series.type="scatterLine".data] Array of data items (optional).
         * The scatter chart can be bound to an array of arrays with two numbers (X and Y).
         *  _example
         *  // ...
         *  series:[{
         *      type: "scatterLine",
         *      data:[[1, 1], [1, 2]],
         *      name: "Points"
         *  }]
         *  // ...
         * @option {Number} [series.type="scatterLine".opacity] <1> The series opacity.
         * @option {Object} [series.type="scatterLine".labels] Configures the series data labels.
         * @option {String} [series.type="scatterLine".labels.color] The text color of the labels.
         * @option {String} [series.type="scatterLine".labels.background] The background color of the labels.
         * @option {Object} [series.type="scatterLine".labels.border] The border of the labels.
         * @option {Number} [series.type="scatterLine".labels.border.width] <0> The width of the border.
         * @option {String} [series.type="scatterLine".labels.border.color] <"black"> The color of the border.
         * @option {String} [series.type="scatterLine".labels.border.dashType] <"solid"> The dash type of the border.
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
         * @option {String} [series.type="scatterLine".labels.font] <"12px Arial,Helvetica,sans-serif">
         * The font style of the labels.
         * @option {String} [series.type="scatterLine".labels.format] The format of the labels.
         * _example
         * //sets format of the labels
         * format: "{0:C}--{0:C}"
         * @option {Number|Object} [series.type="scatterLine".labels.margin] <{ left: 5, right: 5}>
         * The margin of the labels.
         * _example
         * // sets the top, right, bottom and left margin to 3px.
         * margin: 3
         *
         * // sets the top and bottom margin to 1px
         * // margin left and right are with 5px (by default)
         * margin: { top: 1, bottom: 1 }
         * @option {Number|Object} [series.type="scatterLine".labels.padding] <0> The padding of the labels.
         * _example
         * // sets the top, right, bottom and left padding to 3px.
         * padding: 3
         *
         * // sets the top and left padding to 1px
         * // padding right and bottom are with 0px (by default)
         * padding: { top: 1, left: 1 }
         * @option {String} [series.type="scatterLine".labels.position] <"above">
         * Defines the position of the scatter labels.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <code>"above"</code>
         *         </dt>
         *         <dd>
         *              The label is positioned at the top of the scatter chart marker.
         *         </dd>
         *         <dt>
         *              <code>"right"</code>
         *         </dt>
         *         <dd>
         *              The label is positioned at the right of the scatter chart marker.
         *         </dd>
         *         <dt>
         *              <code>"below"</code>
         *         </dt>
         *         <dd>
         *              The label is positioned at the bottom of the scatter chart marker.
         *         </dd>
         *         <dt>
         *              <code>"left"</code>
         *         </dt>
         *         <dd>
         *              The label is positioned at the left of the scatter chart marker.
         *         </dd>
         *    </dl>
         * </div>
         * @option {String/Function} [series.type="scatterLine".labels.template] The label template.
         * Template variables:
         * <ul>
         *     <li><strong>value.x</strong> - the x value</li>
         *     <li><strong>value.y</strong> - the y value</li>
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
         *              type: "scatterLine",
         *              name: "Series 1",
         *              data: [[1, 1], [1, 2], [1, 3]],
         *              labels: {
         *                  // label template
         *                  template: "#= value.x # - #= value.y #",
         *                  visible: true
         *              }
         *          }
         *      ]
         * });
         * @option {Boolean} [series.type="scatterLine".labels.visible] <false> The visibility of the labels.
         * @option {Object} [series.type="scatterLine".markers] Configures the scatter markers.
         * @option {String} [series.type="scatterLine".markers.type] <"square">
         * Configures the markers shape type.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <code>"square"</code>
         *         </dt>
         *         <dd>
         *              The marker shape is square.
         *         </dd>
         *         <dt>
         *              <code>"triagle"</code>
         *         </dt>
         *         <dd>
         *              The marker shape is triagle.
         *         </dd>
         *         <dt>
         *              <code>"circle"</code>
         *         </dt>
         *         <dd>
         *              The marker shape is circle.
         *         </dd>
         *    </dl>
         * </div>
         * @option {Number} [series.type="scatterLine".markers.size] <6> The marker size.
         * @option {Boolean} [series.type="scatterLine".markers.visible] <true> The markers visibility.
         * @option {Object} [series.type="scatterLine".markers.border] The border of the markers.
         * @option {Number} [series.type="scatterLine".markers.border.width] <0> The width of the border.
         * @option {String} [series.type="scatterLine".markers.border.color] <"black"> The color of the border.
         * @option {String} [series.type="scatterLine".markers.background]
         * The background color of the current series markers.
         * @option {String} [series.type="scatterLine".missingValues] <"gap">
         * Configures the behavior for handling missing values in scatter series.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <code>"interpolate"</code>
         *         </dt>
         *         <dd>
         *              The value is interpolated from neighboring points.
         *         </dd>
         *         <dt>
         *              <code>"zero"</code>
         *         </dt>
         *         <dd>
         *              The value is assumed to be zero.
         *         </dd>
         *         <dt>
         *              <code>"gap"</code>
         *         </dt>
         *         <dd>
         *              The line stops before the missing point and continues after it.
         *         </dd>
         *    </dl>
         * </div>
         * @option {String} [series.type="scatterLine".name] The series name.
         * @option {String} [series.type="scatterLine".xAxis] <primary> The name of the X axis to use.
         * @option {String} [series.type="scatterLine".yAxis] <primary> The name of the Y axis to use.
         * @option {Object} [series.type="scatterLine".tooltip] The data point tooltip configuration options.
         * @option {String} [series.type="scatterLine".tooltip.background]
         * The background color of the tooltip. The default is determined from the series color.
         * @option {Object} [series.type="scatterLine".tooltip.border] The border configuration options.
         * @option {Number} [series.type="scatterLine".tooltip.border.width] <0> The width of the border.
         * @option {String} [series.type="scatterLine".tooltip.border.color] <"black"> The color of the border.
         * @option {String} [series.type="scatterLine".tooltip.color]
         * The text color of the tooltip. The default is the same as the series labels color.
         * @option {String} [series.type="scatterLine".tooltip.font] <"12px Arial,Helvetica,sans-serif"> The tooltip font.
         * @option {String} [series.type="scatterLine".tooltip.format] The tooltip format.
         * _example
         * //sets format of the tooltip
         * format: "{0:C}"
         * @option {Number|Object} [series.type="scatterLine".tooltip.padding] The padding of the tooltip.
         * _example
         * // sets the top, right, bottom and left padding to 3px.
         * padding: 3
         *
         * // sets the top and left padding to 1px
         * // right and bottom padding are left at their default values
         * padding: { top: 1, left: 1 }
         * @option {String|Function} [series.type="scatterLine".tooltip.template] The tooltip template.
         * Template variables:
         * <ul>
         *     <li><strong>value.x</strong> - the x value</li>
         *     <li><strong>value.y</strong> - the y value</li>
         *     <li><strong>series</strong> - the data series</li>
         *     <li><strong>dataItem</strong> - the original data item used to construct the point.
         *         Will be null if binding to array.
         *     </li>
         * </ul>
         * _example
         * $("#chart").kendoChart({
         *      title: {
         *          text: "My Chart Title"
         *      },
         *      series: [
         *          {
         *              type: "scatterLine",
         *              name: "Series 1",
         *              data: [[1, 1], [1, 2], [1, 3]],
         *              tooltip: {
         *                  visible: true,
         *                  template: "#= category # - #= value.x # - #= value.y #"
         *              }
         *          }
         *      ]
         * });
         * @option {Boolean} [series.type="scatterLine".tooltip.visible] <false> A value indicating if the tooltip should be displayed.
         * @option {Number} [series.type="scatterLine".width] <1> The line width of the scatter line chart.
         *
         * @option [series.type="area"] Available options for area series:
         * @option {Boolean} [series.type="area".stacked] <false>
         * A value indicating if the series should be stacked.
         * @option {String} [series.type="area".name] The series name.
         * @option {String} [series.type="area".line] The line of the area chart.
         * @option {String} [series.type="area".line.width] <4> The line width of the area chart.
         * @option {String} [series.type="area".line.color] The line color of the area chart.
         * @option {Number} [series.type="area".line.opacity] <1> The line opacity of the area chart.
         * @option {String} [series.type="area".color] The series base color.
         * @option {Number} [series.type="area".opacity] <0.4> The series opacity.
         * @option {String} [series.type="area".missingValues] <"gap">
         * Configures the behavior for handling missing values in area series.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <code>"interpolate"</code>
         *         </dt>
         *         <dd>
         *              The value is interpolated from neighboring points.
         *         </dd>
         *         <dt>
         *              <code>"zero"</code>
         *         </dt>
         *         <dd>
         *              The value is assumed to be zero.
         *         </dd>
         *         <dt>
         *              <code>"gap"</code>
         *         </dt>
         *         <dd>
         *              The line stops before the missing point and continues after it.
         *         </dd>
         *    </dl>
         * </div>
         * @option {Object} [series.type="area".markers] Configures the area markers.
         * @option {String} [series.type="area".markers.type] <"square">
         * Configures the markers shape type.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <code>"square"</code>
         *         </dt>
         *         <dd>
         *              The marker shape is square.
         *         </dd>
         *         <dt>
         *              <code>"triagle"</code>
         *         </dt>
         *         <dd>
         *              The marker shape is triagle.
         *         </dd>
         *         <dt>
         *              <code>"circle"</code>
         *         </dt>
         *         <dd>
         *              The marker shape is circle.
         *         </dd>
         *    </dl>
         * </div>
         * @option {Number} [series.type="area".markers.size] <6> The marker size.
         * @option {Boolean} [series.type="area".markers.visible] <false> The markers visibility.
         * @option {Object} [series.type="area".markers.border] The border of the markers.
         * @option {Number} [series.type="area".markers.border.width] <0> The width of the border.
         * @option {String} [series.type="area".markers.border.color] <"black"> The color of the border.
         * @option {String} [series.type="area".markers.background]
         * The background color of the current series markers.
         * @option {Object} [series.type="area".labels] Configures the series data labels.
         * @option {String} [series.type="area".labels.color] The text color of the labels.
         * @option {String} [series.type="area".labels.background] The background color of the labels.
         * @option {String} [series.type="area".labels.font] <"12px Arial,Helvetica,sans-serif">
         * The font style of the labels.
         * @option {String} [series.type="area".labels.position] <"above">
         * Defines the position of the area labels.
         * <div class="details-list">
         *    <dl>
         *         <dt>
         *              <code>"above"</code>
         *         </dt>
         *         <dd>
         *              The label is positioned at the top of the area chart marker.
         *         </dd>
         *         <dt>
         *              <code>"right"</code>
         *         </dt>
         *         <dd>
         *              The label is positioned at the right of the area chart marker.
         *         </dd>
         *         <dt>
         *              <code>"below"</code>
         *         </dt>
         *         <dd>
         *              The label is positioned at the bottom of the area chart marker.
         *         </dd>
         *         <dt>
         *              <code>"left"</code>
         *         </dt>
         *         <dd>
         *              The label is positioned at the left of the area chart marker.
         *         </dd>
         *    </dl>
         * </div>
         * @option {Boolean} [series.type="area".labels.visible] <false> The visibility of the labels.
         * @option {Number|Object} [series.type="area".labels.margin] <{ left: 5, right: 5}>
         * The margin of the labels.
         * _example
         * // sets the top, right, bottom and left margin to 3px.
         * margin: 3
         *
         * // sets the top and bottom margin to 1px
         * // margin left and right are with 5px (by default)
         * margin: { top: 1, bottom: 1 }
         * @option {Number|Object} [series.type="area".labels.padding] <0> The padding of the labels.
         * _example
         * // sets the top, right, bottom and left padding to 3px.
         * padding: 3
         *
         * // sets the top and left padding to 1px
         * // padding right and bottom are with 0px (by default)
         * padding: { top: 1, left: 1 }
         * @option {Object} [series.type="area".labels.border] The border of the labels.
         * @option {Number} [series.type="area".labels.border.width] <0> The width of the border.
         * @option {String} [series.type="area".labels.border.color] <"black"> The color of the border.
         * @option {String} [series.type="area".labels.border.dashType] <"solid"> The dash type of the border.
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
         * @option {String/Function} [series.type="area".labels.template] The label template.
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
         *              type: "area",
         *              name: "Series 1",
         *              data: [200, 450, 300, 125],
         *              labels: {
         *                  // label template
         *                  template: "#= value #%",
         *                  visible: true
         *              }
         *          }
         *      ],
         *      categoryAxis: {
         *          categories: [2000, 2001, 2002, 2003]
         *      }
         * });
         * @option {String} [series.type="area".labels.format] The format of the labels.
         * _example
         * //sets format of the labels
         * format: "{0:C}"
         * @option {Object} [series.type="area".tooltip] The data point tooltip configuration options.
         * @option {String} [series.type="area".tooltip.format] The tooltip format.
         * _example
         * //sets format of the tooltip
         * format: "{0:C}"
         * @option {String|Function} [series.type="area".tooltip.template] The tooltip template.
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
         * $("#chart").kendoChart({
         *      title: {
         *          text: "My Chart Title"
         *      },
         *      series: [
         *          {
         *              type: "area",
         *              name: "Series 1",
         *              data: [200, 450, 300, 125],
         *              tooltip: {
         *                  visible: true,
         *                  template: "#= category # - #= value #"
         *              }
         *          }
         *      ],
         *      categoryAxis: {
         *          categories: [2000, 2001, 2002, 2003]
         *      }
         * });
         * @option {String} [series.type="area".tooltip.font] <"12px Arial,Helvetica,sans-serif"> The tooltip font.
         * @option {String} [series.type="area".tooltip.color]
         * The text color of the tooltip. The default is the same as the series labels color.
         * @option {String} [series.type="area".tooltip.background]
         * The background color of the tooltip. The default is determined from the series color.
         * @option {Number|Object} [series.type="area".tooltip.padding] The padding of the tooltip.
         * _example
         * // sets the top, right, bottom and left padding to 3px.
         * padding: 3
         *
         * // sets the top and left padding to 1px
         * // right and bottom padding are left at their default values
         * padding: { top: 1, left: 1 }
         * @option {Object} [series.type="area".tooltip.border] The border configuration options.
         * @option {Number} [series.type="area".tooltip.border.width] <0> The width of the border.
         * @option {String} [series.type="area".tooltip.border.color] <"black"> The color of the border.
         * @option {Boolean} [series.type="area".tooltip.visible] <false> A value indicating if the tooltip should be displayed.
         * @option [series.type="verticalArea"]
         * Vertical area series use the same options as area series.
         * The category axis is rendered vertically instead of horizontally.
         *
         * @option {Object} [chartArea] The chart area configuration options.
         * This is the entire visible area of the chart.
         * @option {String} [chartArea.background] <"white"> The background color of the chart area.
         * @option {Number} [chartArea.width] <600> The width of the chart area.
         * @option {Number} [chartArea.height] <400> The height of the chart area.
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
         *     <li><strong>dataItem</strong> - the original data item used to construct the point.
         *         Will be null if binding to array.
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
         *          template: "#= category # - #= value #"
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
         * @option {Boolean} [tooltip.visible] <false> A value indicating if the tooltip should be displayed.
         * @option {Boolean} [transitions] <true>
         * A value indicating if transition animations should be played.
         * @option {Object} [axisDefaults] Default options for all chart axes.
         * @option {Array} [seriesColors] The default colors for the chart's series. When all colors are used, new colors are pulled from the start again.
         */
        init: function() {
            /**
             * Fires when the chart has received data from the data source
             * and is about to render it.
             * @name kendo.ui.Chart#dataBound
             * @event
             * @param {Event} e
             * @example
             * function onDataBound(e) {
             *     // Series data is now available
             * }
             */

            /**
             * Fires when chart series are clicked.
             * @name kendo.ui.Chart#seriesClick
             * @event
             * @param {Event} e
             * @param {Object} e.value The data point value.
             * @param {Object} e.category The data point category
             * @param {Object} e.series The clicked series.
             * @param {String} e.series.type The series type
             * @param {String} e.series.name The series name
             * @param {Array} e.series.data The series data points
             * @param {Object} e.dataItem The original data item (when binding to dataSource).
             * @param {Object} e.element The DOM element of the data point.
             * @example
             * function onSeriesClick(e) {
             *     alert("Clicked value: " + e.value);
             * }
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
         * Returns the SVG representation of the current chart.
         * The returned string is a self-contained SVG document
         * that can be used as is or converted to other formats
         * using tools like <a href="http://inkscape.org/">Inkscape</a> and
         * <a href="http://www.imagemagick.org/">ImageMagick</a>.
         * Both programs provide command-line interface
         * suitable for backend processing.
         * @example
         * var chart = $("#chart").data("kendoChart");
         * var svgText = chart.svg();
         */
        svg: function() { }
    };

})(jQuery);
