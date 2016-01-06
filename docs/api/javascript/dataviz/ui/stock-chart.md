---
title: StockChart
page_title: Configuration, methods and events of Kendo UI DataViz StockChart
---

# kendo.dataviz.ui.StockChart

## Configuration

### dateField `String`*(default: "date")*

The field containing the point date.
It is used as a default `categoryField` for all series.

The data item field value must be either:

####* Date instance

####* String parsable by `new Date([field value])`

####* String in ASP.NET JSON format, i.e. "\/Date(1320825600000-0800)\/"

### navigator `Object`

The data navigator configuration options.

### navigator.categoryAxis `Array|Object`

The category axis configuration options.

### navigator.categoryAxis.autoBaseUnitSteps `Object`

The discrete [navigator.categoryAxis.baseUnitStep](#configuration-navigator-categoryAxis.baseUnitStep) values when
either [navigator.categoryAxis.baseUnit](#configuration-navigator-categoryAxis.baseUnit) is set to "fit" or
[navigator.categoryAxis.baseUnitStep](#configuration-navigator-categoryAxis.baseUnitStep) is set to "auto".

### navigator.categoryAxis.autoBaseUnitSteps.seconds `Array` *(default: [1, 2, 5, 15, 30])*

The seconds unit steps.

### navigator.categoryAxis.autoBaseUnitSteps.minutes `Array` *(default: [1, 2, 5, 15, 30])*

The minutes unit steps.

### navigator.categoryAxis.autoBaseUnitSteps.hours `Array` *(default: [1, 2, 3])*

The hours unit steps.

### navigator.categoryAxis.autoBaseUnitSteps.days `Array` *(default: [1, 2, 3])*

The days unit steps.

### navigator.categoryAxis.autoBaseUnitSteps.weeks `Array` *(default: [1, 2])*

The weeks unit steps.

### navigator.categoryAxis.autoBaseUnitSteps.months `Array` *(default: [1, 2, 3, 6])*

The months unit steps.

### navigator.categoryAxis.autoBaseUnitSteps.years `Array` *(default: [1, 2, 3, 5, 10, 25, 50])*

The years unit steps.

### navigator.categoryAxis.axisCrossingValue `Object|Date|Array`

Category index at which the first value axis crosses this axis (when set as an object).

Category indices at which the value axes cross the category axis (when set as an array).

> set an index greater than or equal to the number of categories to denote the far end of the axis.

### navigator.categoryAxis.background `String`

The background color of the axis.

### navigator.categoryAxis.baseUnit `String`

The base time interval for the date axis. The default base unit is determined automatically from the minimum difference
between subsequent categories.

The supported values are:

* "fit"
* "seconds"
* "minutes"
* "hours"
* "days"
* "weeks"
* "months"
* "years"

Setting `baseUnit` to "fit" will set such base unit and [categoryAxis.baseUnitStep](#configuration-categoryAxis.baseUnitStep)
that the total number of categories does not exceed [categoryAxis.maxDateGroups](#configuration-categoryAxis.maxDateGroups).

Series data is aggregated for the specified base unit using the [series.aggregate](#configuration-series.aggregate) function.

### navigator.categoryAxis.baseUnitStep `Object` *(default: 1)*

The step (interval) between categories in base units. Setting it to "auto" will set the step to such value
that the total number of categories does not exceed [categoryAxis.maxDateGroups](#configuration-categoryAxis.maxDateGroups).

This option is ignored if [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "fit".

### navigator.categoryAxis.categories `Array`

The category names. The chart will create a category for every item of the array.

### navigator.categoryAxis.color `String`

The color to apply to all axis elements. Accepts a valid CSS color string, including hex and rgb. Can be overridden by [categoryAxis.labels.color](#configuration-categoryAxis.labels.color) and
[categoryAxis.line.color](#configuration-categoryAxis.line.color).

### navigator.categoryAxis.crosshair `Object`

The crosshair configuration options.

> The crosshair is displayed when the [categoryAxis.crosshair.visible](#configuration-categoryAxis.crosshair.visible) option is set to `true`.

### navigator.categoryAxis.crosshair.color `String`

The color of the crosshair. Accepts a valid CSS color string, including hex and rgb.

### navigator.categoryAxis.crosshair.dashType `string` *(default: "solid")*

The dash type of the crosshair.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### navigator.categoryAxis.crosshair.opacity `Number` *(default: 1)*

The opacity of the crosshair. By default the crosshair is opaque.

### navigator.categoryAxis.crosshair.tooltip `Object`

The crosshar tooltip options.

> The crosshair tooltip is displayed when the [categoryAxis.crosshair.tooltip.visible](#configuration-categoryAxis.crosshair.tooltip.visible) option is set to `true`.

### navigator.categoryAxis.crosshair.tooltip.background `String`

The background color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

### navigator.categoryAxis.crosshair.tooltip.border `Object`

The border options.

### navigator.categoryAxis.crosshair.tooltip.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

### navigator.categoryAxis.crosshair.tooltip.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### navigator.categoryAxis.crosshair.tooltip.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

### navigator.categoryAxis.crosshair.tooltip.color `String`

The text color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

### navigator.categoryAxis.crosshair.tooltip.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

### navigator.categoryAxis.crosshair.tooltip.format `String` *(default: "{0}")*

The format used to display the tooltip. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

### navigator.categoryAxis.crosshair.tooltip.padding `Number|Object` *(default: 0)*

The padding of the crosshair tooltip. A numeric value will set all paddings.

### navigator.categoryAxis.crosshair.tooltip.padding.bottom `Number` *(default: 0)*

The bottom padding of the crosshair tooltip.

### navigator.categoryAxis.crosshair.tooltip.padding.left `Number` *(default: 0)*

The left padding of the crosshair tooltip.

### navigator.categoryAxis.crosshair.tooltip.padding.right `Number` *(default: 0)*

The right padding of the crosshair tooltip.

### navigator.categoryAxis.crosshair.tooltip.padding.top `Number` *(default: 0)*

The top padding of the crosshair tooltip.

### navigator.categoryAxis.crosshair.tooltip.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the tooltip.

The fields which can be used in the template are:

* value - the category value

### navigator.categoryAxis.crosshair.tooltip.visible `Boolean` *(default: false)*

If set to `true` the chart will display the category axis crosshair tooltip. By default the category axis crosshair tooltip is not visible.

### navigator.categoryAxis.crosshair.visible `Boolean` *(default: false)*

If set to `true` the chart will display the category axis crosshair. By default the category axis crosshair is not visible.

### navigator.categoryAxis.crosshair.width `Number` *(default: 1)*

The width of the crosshair in pixels.

### navigator.categoryAxis.field `String`

The data item field which contains the category name. Requires the [dataSource](#configuration-dataSource) option to be set.

### navigator.categoryAxis.justified `Boolean`

If set to `true` the chart will position categories and series points on major ticks. This removes the empty space before and after the series.

The default value is `false` except for "area" and "verticalArea".

> This option is ignored if the [series.type](#configuration-series.type) option is set to "bar", "column", "ohlc" or "candlestick".

### navigator.categoryAxis.labels `Object`

The axis labels configuration.

### navigator.categoryAxis.labels.background `String`

The background color of the labels. Accepts a valid CSS color string, including hex and rgb.

### navigator.categoryAxis.labels.border `Object`

The border of the labels.

### navigator.categoryAxis.labels.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

### navigator.categoryAxis.labels.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### navigator.categoryAxis.labels.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

### navigator.categoryAxis.labels.color `String`

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.

### navigator.categoryAxis.labels.culture `String`

The culture to use when formatting date values. See the [globalization overview](/framework/globalization/overview) for more information.

### navigator.categoryAxis.labels.dateFormats `Object`

The format used to display the labels when the categories are dates. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

> The chart will choose the appropriate format for the current [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit). Setting the [categoryAxis.labels.format](#configuration-categoryAxis.labels.format) option will override the date formats.

### navigator.categoryAxis.labels.dateFormats.days `String` *(default: "M/d")*

The format used when [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "days".

### navigator.categoryAxis.labels.dateFormats.hours `String` *(default: "HH:mm")*

The format used when [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "hours".

### navigator.categoryAxis.labels.dateFormats.months `String` *(default: "MMM 'yy")*

The format used when [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "months".

### navigator.categoryAxis.labels.dateFormats.weeks `String` *(default: "M/d")*

The format used when [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "weeks".

### navigator.categoryAxis.labels.dateFormats.years `String` *(default: "yyyy")*

The format used when [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "years".

### navigator.categoryAxis.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

### navigator.categoryAxis.labels.format `String` *(default: "{0}")*

The format used to display the labels. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

### navigator.categoryAxis.labels.margin `Number|Object` *(default: 0)*

The margin of the labels. A numeric value will set all margins.

### navigator.categoryAxis.labels.margin.bottom `Number` *(default: 0)*

The bottom margin of the labels.

### navigator.categoryAxis.labels.margin.left `Number` *(default: 0)*

The left margin of the labels.

### navigator.categoryAxis.labels.margin.right `Number` *(default: 0)*

The right margin of the labels.

### navigator.categoryAxis.labels.margin.top `Number` *(default: 0)*

The top margin of the labels.

### navigator.categoryAxis.labels.mirror `Boolean` *(default: false)*

If set to `true` the chart will mirror the axis labels and ticks. If the labels are normally on the left side of the axis, mirroring the axis will render them to the right.

### navigator.categoryAxis.labels.padding `Object|Number` *(default: 0)*

The padding of the labels. A numeric value will set all paddings.

### navigator.categoryAxis.labels.padding.bottom `Number` *(default: 0)*

The bottom padding of the labels.

### navigator.categoryAxis.labels.padding.left `Number` *(default: 0)*

The left padding of the labels.

### navigator.categoryAxis.labels.padding.right `Number` *(default: 0)*

The right padding of the labels.

### navigator.categoryAxis.labels.padding.top `Number` *(default: 0)*

The top padding of the labels.

### navigator.categoryAxis.labels.rotation `Number` *(default: 0)*

The rotation angle of the labels. By default the labels are not rotated.

### navigator.categoryAxis.labels.skip `Number` *(default: 0)*

The number of labels to skip. By default no labels are skipped.

### navigator.categoryAxis.labels.step `Number` *(default: 1)*

The label rendering step - render every n-th label. By default every label is rendered.

### navigator.categoryAxis.labels.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the category value

### navigator.categoryAxis.labels.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis labels. By default the category axis labels are visible.

### navigator.categoryAxis.line `Object`

The configuration of the axis lines. Also affects the major and minor ticks, but not the grid lines.

### navigator.categoryAxis.line.color `String` *(default: "black")*

The color of the lines. Accepts a valid CSS color string, including hex and rgb.

> Setting the `color` option affects the major and minor ticks, but not the grid lines.

### navigator.categoryAxis.line.dashType `String` *(default: "solid")*

The dash type of the line.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### navigator.categoryAxis.line.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis lines. By default the category axis lines are visible.

### navigator.categoryAxis.line.width `Number` *(default: 1)*

The width of the line in pixels. Also affects the major and minor ticks, but not the grid lines.

### navigator.categoryAxis.majorGridLines `Object`

The configuration of the major grid lines. These are the lines that are an extension of the major ticks through the
body of the chart.

### navigator.categoryAxis.majorGridLines.color `String` *(default: "black")*

The color of the major grid lines. Accepts a valid CSS color string, including hex and rgb.

### navigator.categoryAxis.majorGridLines.dashType `String` *(default: "solid")*

The dash type of the major grid lines.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### navigator.categoryAxis.majorGridLines.visible `Boolean` *(default: false)*

If set to `true` the chart will display the major grid lines. By default the major grid lines are visible.

### navigator.categoryAxis.majorGridLines.width `Number` *(default: 1)*

The width of the category axis major grid lines in pixels.

### navigator.categoryAxis.majorGridLines.step `Number` *(default: 1)*

The step of the category axis major grid lines.

### navigator.categoryAxis.majorGridLines.skip `Number` *(default: 0)*

The skip of the category axis major grid lines.

### navigator.categoryAxis.majorTicks `Object`

The configuration of the category axis major ticks.

### navigator.categoryAxis.majorTicks.color `String` *(default: "black")*

The color of the category axis major ticks lines. Accepts a valid CSS color string, including hex and rgb.

### navigator.categoryAxis.majorTicks.size `Number` *(default: 4)*

The length of the tick line in pixels.

### navigator.categoryAxis.majorTicks.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis major ticks. By default the category axis major ticks are visible.

### navigator.categoryAxis.majorTicks.width `Number` *(default: 1)*

The width of the major ticks in pixels.

### navigator.categoryAxis.majorTicks.step `Number` *(default: 1)*

The step of the category axis major ticks.

### navigator.categoryAxis.majorTicks.skip `Number` *(default: 0)*

The skip of the category axis major ticks.

### navigator.categoryAxis.max `Object`

The last date displayed on the category date axis. By default, the minimum date is the same as the last category.
This is often used in combination with the [categoryAxis.min](#configuration-categoryAxis.min) and [categoryAxis.roundToBaseUnit](#configuration-categoryAxis.roundToBaseUnit) options to
set up a fixed date range.

### navigator.categoryAxis.maxDateGroups `Number` *(default: 10)*

The maximum number of groups (categories) to display when
[categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "fit" or
[categoryAxis.baseUnitStep](#configuration-categoryAxis.baseUnitStep) is set to "auto".

### navigator.categoryAxis.min `Object`

The first date displayed on the category date axis. By default, the minimum date is the same as the first category.
This is often used in combination with the [categoryAxis.min](#configuration-categoryAxis.min) and [categoryAxis.roundToBaseUnit](#configuration-categoryAxis.roundToBaseUnit) options to
set up a fixed date range.

### navigator.categoryAxis.minorGridLines `Object`

The configuration of the minor grid lines. These are the lines that are an extension of the minor ticks through the
body of the chart.

### navigator.categoryAxis.minorGridLines.color `String` *(default: "black")*

The color of the minor grid lines. Accepts a valid CSS color string, including hex and rgb.

### navigator.categoryAxis.minorGridLines.dashType `String` *(default: "solid")*

The dash type of the minor grid lines.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### navigator.categoryAxis.minorGridLines.visible `Boolean` *(default: false)*

If set to `true` the chart will display the minor grid lines. By default the minor grid lines are visible.

### navigator.categoryAxis.minorGridLines.width `Number` *(default: 1)*

The width of the category axis minor grid lines in pixels.

### navigator.categoryAxis.minorGridLines.step `Number` *(default: 1)*

The step of the category axis minor grid lines.

### navigator.categoryAxis.minorGridLines.skip `Number` *(default: 0)*

The skip of the category axis minor grid lines.

### navigator.categoryAxis.minorTicks `Object`

The configuration of the category axis minor ticks.

### navigator.categoryAxis.minorTicks.color `String` *(default: "black")*

The color of the category axis minor ticks lines. Accepts a valid CSS color string, including hex and rgb.

### navigator.categoryAxis.minorTicks.size `Number` *(default: 4)*

The length of the tick line in pixels.

### navigator.categoryAxis.minorTicks.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis minor ticks. By default the category axis minor ticks are visible.

### navigator.categoryAxis.minorTicks.width `Number` *(default: 1)*

The width of the minor ticks in pixels.

### navigator.categoryAxis.minorTicks.step `Number` *(default: 1)*

The step of the category axis minor ticks.

### navigator.categoryAxis.minorTicks.skip `Number` *(default: 0)*

The skip of the category axis minor ticks.

### navigator.categoryAxis.plotBands `Array`

The plot bands of the category axis.

### navigator.categoryAxis.plotBands.color `String`

The color of the plot band.

### navigator.categoryAxis.plotBands.from `Number`

The start position of the plot band in axis units.

### navigator.categoryAxis.plotBands.opacity `Number`

The opacity of the plot band.

### navigator.categoryAxis.plotBands.to `Number`

The end position of the plot band in axis units.

### navigator.categoryAxis.reverse `Boolean` *(default: false)*

If set to `true` the category axis direction will be reversed. By default categories are listed from left to right and from bottom to top.

### navigator.categoryAxis.roundToBaseUnit `Boolean` *(default: true)*

If set to `true` the chart will round the first and last date to the nearest base unit.

The `roundToBaseUnit` option will be ignored if [series.type](#configuration-series.type) is set to "bar", "column", "ohlc" or "candlestick".

### navigator.categoryAxis.title `Object`

The title configuration of the category axis.

> The [categoryAxis.title.text](#configuration-categoryAxis.title.text) option must be set in order to display the title.


### navigator.categoryAxis.title.background `String`

The background color of the title. Accepts a valid CSS color string, including hex and rgb.

### navigator.categoryAxis.title.border `Object`

The border of the title.

### navigator.categoryAxis.title.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

### navigator.categoryAxis.title.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### navigator.categoryAxis.title.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

### navigator.categoryAxis.title.color `String`

The text color of the title. Accepts a valid CSS color string, including hex and rgb.

### navigator.categoryAxis.title.font `String` *(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

### navigator.categoryAxis.title.margin `Number|Object` *(default: 5)*

The margin of the title. A numeric value will set all margins.

### navigator.categoryAxis.title.margin.bottom `Number` *(default: 0)*

The bottom margin of the title.

### navigator.categoryAxis.title.margin.left `Number` *(default: 0)*

The left margin of the title.

### navigator.categoryAxis.title.margin.right `Number` *(default: 0)*

The right margin of the title.

### navigator.categoryAxis.title.margin.top `Number` *(default: 0)*

The top margin of the title.

### navigator.categoryAxis.title.padding `Number|Object` *(default: 0)*

The padding of the title. A numeric value will set all paddings.

### navigator.categoryAxis.title.padding.bottom `Number` *(default: 0)*

The bottom padding of the title.

### navigator.categoryAxis.title.padding.left `Number` *(default: 0)*

The left padding of the title.

### navigator.categoryAxis.title.padding.right `Number` *(default: 0)*

The right padding of the title.

### navigator.categoryAxis.title.padding.top `Number` *(default: 0)*

The top padding of the title.

### navigator.categoryAxis.title.position `String` *(default: "center")*

The position of the title.

The supported values are:

* "top" - the axis title is positioned on the top (applicable to vertical axis)
* "bottom" - the axis title is positioned on the bottom (applicable to vertical axis)
* "left" - the axis title is positioned on the left (applicable to horizontal axis)
* "right" - the axis title is positioned on the right (applicable to horizontal axis)
* "center" - the axis title is positioned in the center

### navigator.categoryAxis.title.rotation `Number` *(default: 0)*

The rotation angle of the title. By default the title is not rotated.

### navigator.categoryAxis.title.text `String`

The text of the title.

### navigator.categoryAxis.title.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis title. By default the category axis title is visible.

### navigator.categoryAxis.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis. By default the category axis is visible.

### navigator.categoryAxis.weekStartDay `Number` *(default: kendo.days.Sunday)*

The week start day when [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "weeks".

The supported values are:

* kendo.days.Sunday - equal to 0
* kendo.days.Monday - equal to 1
* kendo.days.Tuesday - equal to 2
* kendo.days.Wednesday - equal to 3
* kendo.days.Thursday - equal to 4
* kendo.days.Friday - equal to 5
* kendo.days.Saturday - equal to 6

### navigator.categoryAxis.notes `Object`

The category axis notes configuration.

### navigator.categoryAxis.notes.icon `Object`

The icon of the notes.

### navigator.categoryAxis.notes.position `String`

The position of the category axis note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

### navigator.categoryAxis.notes.icon.background `String`

The background color of the notes icon.

### navigator.categoryAxis.notes.icon.border `Object`

The border of the icon.

### navigator.categoryAxis.notes.icon.border.color `String`

The border color of the icon.

### navigator.categoryAxis.notes.icon.border.width `Number`

The border width of the icon.

### navigator.categoryAxis.notes.icon.size `Number`

The size of the icon.

### navigator.categoryAxis.notes.icon.type `String` *(default: "circle")*

The icon shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.

### navigator.categoryAxis.notes.icon.visible `Boolean` *(default: "true")*

The icon visibility.

### navigator.categoryAxis.notes.label `Object`

The label of the notes.

### navigator.categoryAxis.notes.label.background `String`

The background color of the label. Accepts a valid CSS color string, including hex and rgb.

### navigator.categoryAxis.notes.label.border `Object`

The border of the label.

### navigator.categoryAxis.notes.label.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

### navigator.categoryAxis.notes.label.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### navigator.categoryAxis.notes.label.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

### navigator.categoryAxis.notes.label.color `String`

The text color of the label. Accepts a valid CSS color string, including hex and rgb.

### navigator.categoryAxis.notes.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the label.

### navigator.categoryAxis.notes.label.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the category value

### navigator.categoryAxis.notes.label.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category notes label. By default the category notes label are visible.

### navigator.categoryAxis.notes.label.rotation `Number` *(default: 0)*

The rotation angle of the label. By default the label are not rotated.

### navigator.categoryAxis.notes.label.format `String` *(default: "{0}")*

The format used to display the notes label. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

### navigator.categoryAxis.notes.label.position `String` *(default: "inside")*

The position of the labels.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.

### navigator.categoryAxis.notes.line `Object`

The line of the notes.

### navigator.categoryAxis.notes.line.width `Number`

The line width of the notes.

### navigator.categoryAxis.notes.line.color `String`

The line color of the notes.

### navigator.categoryAxis.notes.line.length `Number`

The length of the connecting lines in pixels.

### navigator.categoryAxis.notes.data `Array`

The items of the notes.

### navigator.categoryAxis.notes.data.value `Object`

The value of the note.

### navigator.categoryAxis.notes.data.position `String` *(default: "inside")*

The position of the category axis note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

### navigator.categoryAxis.notes.data.icon `Object`

The icon of the note.

### navigator.categoryAxis.notes.data.icon.background `String`

The background color of the note icon.

### navigator.categoryAxis.notes.data.icon.border `Object`

The border of the icon.

### navigator.categoryAxis.notes.data.icon.border.color `String`

The border color of the icon.

### navigator.categoryAxis.notes.data.icon.border.width `Number`

The border width of the icon.

### navigator.categoryAxis.notes.data.icon.size `Number`

The size of the icon.

### navigator.categoryAxis.notes.data.icon.type `String` *(default: "circle")*

The icon shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.

### navigator.categoryAxis.notes.data.icon.visible `Boolean` *(default: "true")*

The icon visibility.

### navigator.categoryAxis.notes.data.label `Object`

The label of the note.

### navigator.categoryAxis.notes.data.label.background `String`

The background color of the label. Accepts a valid CSS color string, including hex and rgb.

### navigator.categoryAxis.notes.data.label.border `Object`

The border of the label.

### navigator.categoryAxis.notes.data.label.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

### navigator.categoryAxis.notes.data.label.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### navigator.categoryAxis.notes.data.label.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

### navigator.categoryAxis.notes.data.label.color `String`

The text color of the note label. Accepts a valid CSS color string, including hex and rgb.

### navigator.categoryAxis.notes.data.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the note label.

### navigator.categoryAxis.notes.data.label.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the category value

### navigator.categoryAxis.notes.data.label.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category notes label. By default the category notes label are visible.

### navigator.categoryAxis.notes.data.label.rotation `Number` *(default: 0)*

The rotation angle of the label. By default the label are not rotated.

### navigator.categoryAxis.notes.data.label.format `String` *(default: "{0}")*

The format used to display the note label. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

### navigator.categoryAxis.notes.data.label.text `String`

The label note text.

### navigator.categoryAxis.notes.data.label.position `String` *(default: "inside")*

The position of the category axis note label.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.

### navigator.categoryAxis.notes.data.line `Object`

The line of the note.

### navigator.categoryAxis.notes.data.line.width `Number`

The line width of the note.

### navigator.categoryAxis.notes.data.line.color `String`

The line color of the note.

### navigator.categoryAxis.notes.data.line.length `Number`

The length of the connecting lines in pixels.

### navigator.dataSource `Object`

Navigator DataSource configuration or instance.

When the navigator is bound via its own data source,
it will automatically set "from" and "to" filters on the main data source.

This, in conjunction with server filtering, allows you to visualize large data sets
without loading them at once.

#### Example

    $("#stock-chart").kendoStockChart({
        dataSource: {
            transport: {
                 read: "/stock/detail"
            },
            serverFiltering: true
        },
        navigator: {
            dataSource: {
                transport: {
                    read: "/stock/volume"
                }
            }
        }
    });

### navigator.autoBind `Boolean`*(default: true)*

Indicates whether the navigator will call read on the data source initially.
Applicable only when using a dedicated navigator data source.

#### Example
    $("#stock-chart").kendoStockChart({
        navigator: {
            dataSource: naviDataSource,
            autoBind: false
        }
    });

    // ...
    naviDataSource.read();

### navigator.dateField `String`

The field containing the point date.
It is used as a default `field` for the navigator axis.

The data item field value must be either:

####* Date instance

####* String parsable by `new Date([field value])`

####* String in ASP.NET JSON format, i.e. "\/Date(1320825600000-0800)\/"

### navigator.pane `Object`

The navigator pane configuration.

### navigator.pane.background `String`

The background color of the pane. Accepts a valid CSS color string, including hex and rgb.

### navigator.pane.border `Object`

The border of the navigator pane.

### navigator.pane.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

### navigator.pane.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### navigator.pane.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

### navigator.pane.height `Number`

The navigator pane height in pixels.

### navigator.pane.margin `Number|Object` *(default: 0)*

The margin of the pane. A numeric value will set all margins.

### navigator.pane.margin.bottom `Number` *(default: 0)*

The bottom margin of the navigator pane.

### navigator.pane.margin.left `Number` *(default: 0)*

The left margin of the navigator pane.

### navigator.pane.margin.right `Number` *(default: 0)*

The right margin of the navigator pane.

### navigator.pane.margin.top `Number` *(default: 0)*

The top margin of the navigator pane.

### navigator.pane.name `String`

The unique name of the navigator pane.

### navigator.pane.padding `Number|Object` *(default: 0)*

The padding of the pane. A numeric value will set all paddings.

### navigator.pane.padding.bottom `Number` *(default: 0)*

The bottom padding of the navigator pane.

### navigator.pane.padding.left `Number` *(default: 0)*

The left padding of the navigator pane.

### navigator.pane.padding.right `Number` *(default: 0)*

The right padding of the navigator pane.

### navigator.pane.padding.top `Number` *(default: 0)*

The top padding of the navigator pane.

### navigator.pane.title `String|Object`

The title configuration of the navigator pane.

> The [panes.title.text](#configuration-panes.title.text) option must be set in order to display the title.

### navigator.pane.title.background `String`

The background color of the title. Accepts a valid CSS color string, including hex and rgb.

### navigator.pane.title.border `Object`

The border of the title.

### navigator.pane.title.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

### navigator.pane.title.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### navigator.pane.title.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

### navigator.pane.title.color `String`

The text color of the title. Accepts a valid CSS color string, including hex and rgb.

### navigator.pane.title.font `String` *(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

### navigator.pane.title.margin `Number|Object` *(default: 5)*

The margin of the title. A numeric value will set all margins.

### navigator.pane.title.margin.bottom `Number` *(default: 0)*

The bottom margin of the title.

### navigator.pane.title.margin.left `Number` *(default: 0)*

The left margin of the title.

### navigator.pane.title.margin.right `Number` *(default: 0)*

The right margin of the title.

### navigator.pane.title.margin.top `Number` *(default: 0)*

The top margin of the title.

### navigator.pane.title.position `String` *(default: "center")*

The position of the title.

The supported values are:

* "left" - the axis title is positioned on the left (applicable to horizontal axis)
* "right" - the axis title is positioned on the right (applicable to horizontal axis)
* "center" - the axis title is positioned in the center

### navigator.pane.title.text `String`

The text of the title.

### navigator.pane.title.visible `Boolean` *(default: true)*

If set to `true` the chart will display the pane title. By default the pane title is visible.

### navigator.series `Array`

Array of series definitions.

Accepts the same options as the root `series` collection.

Omitting the array and specifying a single series is also acceptable.

#### Example
    <p>
    $("#stock-chart").kendoStockChart({
         navigator: {
            series: {
                type: "line",
                field: "volume"
            }
         },
         ...
    });
    </p>

### navigator.visible `Boolean`*(default: true)*

The visibility of the navigator.

### navigator.series.type `String`

The type of the series. Available types:

* candlestick, ohlc
* column
* bullet
* area
* line

### navigator.series.dashType `String`*(default: "solid")*

The dash type of line chart.

> The `dashType` option is taken into consideration only if the [series.type](#configuration-series.type) option is set to "line".

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the chart legend border dash type

  <div id="stock-chart"></div>
  <script>
  $("#stock-chart").kendoStockChart({
    series: [
      {
        dashType: "dashDot",
        type: "line",
        data: [1, 2, 3]
      }
    ],
    categoryAxis: {
      baseUnit: "days",
      categories: [
        new Date(2012, 1, 1),
        new Date(2012, 1, 2),
        new Date(2012, 1, 3)
      ]
    }
  });
  </script>


### navigator.series.data `Array`

Array of data items. The data item type can be either a:

* Array of objects. Each point is bound to the specified series fields.
* Array of numbers. Available for area, column and line series.
* Array of arrays of numbers. Available for:
    * OHLC and candlestick series (open, high, low, close)

#### Example - set the chart series data as array of objects

  <div id="stock-chart"></div>
  <script>
  $("#stock-chart").kendoStockChart({
    series: [
      {
        type: "candlestick",
        data: [{
          open: 2,
          high: 4,
          low: 1,
          close: 3
        }]
      }
    ],
    categoryAxis: {
      categories: [
        new Date(2012, 1, 1)
      ]
    }
  });
  </script>

#### Example - set the chart series data as array of arrays

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
    series: [
      {
        type: "candlestick",
        data: [2, 4, 1, 3]
      }
    ],
    categoryAxis: {
      categories: [
        new Date(2012, 1, 1)
      ]
    }
    });
    </script>

### navigator.series.highField `String`

The data field containing the high value.

** Available for candlestick and ohlc series only **

### navigator.series.field `String`

The data field containing the series value.

### navigator.series.categoryField `String` *(default: "category")*

The data item field which contains the category name or date.

> The points will be rendered in chronological order if the category is a date.

> If specified, the [dateField](#configuration-dateField) option is used as a default.

#### Example - set series date category field

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
          type: "line",
          field: "value",
          categoryField: "date",
          data: [
            { value: 1, date: new Date(2012, 1, 1) },
            { value: 2, date: new Date(2012, 1, 2) }
          ]
        }]
    });
    </script>

### navigator.series.name `String`

The navigator series name.

#### Example - set the navigator series name
    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
      dataSource: {
        data: [
          { value: 1, category: "One", date: new Date(2012, 1, 1)},
          { value: 2, category: "Two", date: new Date(2012, 1, 2)}
        ]
      },
      dateField: "date",
      navigator: {
          series: [
            {
              field: "value",
              name: "Value",
              visibleInLegend: true
            }
          ]
      },
      legend: {
        visible: true,
        position: "bottom"
      }
    });
    </script>

The name can also be a [template](/api/framework/kendo#methods-template) which sets the name of the series when bound to grouped data source.

The fields which can be used in the template are:

*   series - the series options
*   group - the data group
*   group.field - the name of the field used for grouping
*   group.value - the field value for this group.

#### Example - set the chart series group name template

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
      dataSource: {
        data: [
          { value: 1, category: "One", date: new Date(2012, 1, 1)},
          { value: 2, category: "Two", date: new Date(2012, 1, 2)}
        ],
        group: { field: "category" }
      },
      dateField: "date",
      navigator: {
          series: [
            {
              field: "value",
              name: "Value: #: group.value #",
              visibleInLegend: true
            }
          ]
      },
      legend: {
        visible: true,
        position: "bottom"
      }
    });
    </script>

### navigator.series.highlight `Object`

Configures the appearance of highlighted points.

** Applicable to candlestick and ohlc series. **

### navigator.series.highlight.border `Object`

The border of highlighted points. The color is computed automatically from the base point color.

### navigator.series.highlight.border.width `Number`

The width of the border.

### navigator.series.highlight.border.color `String`

The border color.

### navigator.series.highlight.border.opacity `Number`

The border opacity.

### navigator.series.highlight.color `String`

The highlight color.

** Available only for pie series **

### navigator.series.highlight.line `Object`

Line options for highlighted points. The color is computed automatically from the base point color.

** Available only for candlestick series **

### navigator.series.highlight.line.width `Number`

The width of the line.

### navigator.series.highlight.line.color `String`

The line color.

### navigator.series.highlight.line.opacity `Number`

The opacity of the line.

### navigator.series.highlight.opacity `Number`

The opacity of the highlighted points.

### navigator.series.highlight.visible `Boolean`*(default: true)*

A value indicating if the series points should be highlighted.

### navigator.series.aggregate `String|Function` *(default: "max")*

The aggregate function to apply for date series.

This function is used when a category (an year, month, etc.) contains two or more points.
The function return value is displayed instead of the individual points.

The supported values are:

* "avg" - the average of all values for the date period.
* "count" - the number of values for the date period.
* "max" - the highest value for the date period.
* "min" - the lowest value for the date period.
* "sum" - the sum of all values for the date period. Defaults to 0 if no data points are defined.
* "sumOrNull" - the sum of all values for the date period. Defaults to `null` if no data points are defined.
* "first" - the first value
* function(values, series, dataItems, category) - user-defined aggregate function. Returns single value or data item.
* object  - (compound aggregate) **Applicable to "candlestick" and ohlc "series"**. Specifies the aggregate for each data item field.

##### Example

    aggregate: {
        open: "max",
        high: "max",
        close: "min",
        low: "max"
    }

### navigator.series.axis `String`*(default: "primary")*

The name of the value axis to use.

** Applicable to area, column, line, ohlc and candlestick series **

### navigator.series.border `Object`

The border of the points.

** Applicable to column, ohlc and candlestick series **

### navigator.series.border.color `String`

The color of the border.  It defaults to the color of the current series.

### navigator.series.border.dashType `String`*(default: "solid")*

The dash type of the border.

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### navigator.series.border.width `Number`*(default: 1)*

The width of the border.

### navigator.series.closeField `String`

The data field containing the close value.

** Available for candlestick and ohlc series only **

### navigator.series.color `String`

The series base color. The supported values are:

* CSS color string, including hex and rgb
* function(point) - user-defined function that will be evaluated for each point. Returning `undefined` will assume the default series color.

### navigator.series.colorField `String`

The data field containing the point color.

** Applicable for column, candlestick and ohlc series. **

### navigator.series.downColor `String`

The series color when the open value is greater than the close value.

** Available for candlestick series only **

### navigator.series.downColorField `String`

The data field containing the color applied when the open value is greater than the close value.

** Available for candlestick series only **

### navigator.series.gap `Number`*(default: 1.5)*

The distance between category clusters.

** Applicable for column, candlestick and ohlc series. **

### navigator.series.labels `Object`

Configures the series data labels.

### navigator.series.labels.background `String`

The background color of the labels.

### navigator.series.labels.border `Object`

The border of the labels.

### navigator.series.labels.border.color `String`*(default: "black")*

 The color of the border.

### navigator.series.labels.border.dashType `String`*(default: "solid")*

 The dash type of the border.

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### navigator.series.labels.border.width `Number`*(default: 0)*

 The width of the border.

### navigator.series.labels.color `String`

The text color of the labels.

### navigator.series.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

### navigator.series.labels.format `String`

The format of the labels.

#### Example

    //sets format of the labels
    format: "C"

### navigator.series.labels.margin `Number|Object`*(default: { left: 5, right: 5})*

The margin of the labels.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and bottom margin to 1px
    // margin left and right are with 5px (by default)
    margin: { top: 1, bottom: 1 }

### navigator.series.labels.padding `Number|Object`*(default: 0)*

 The padding of the labels.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }

### navigator.series.labels.position `String`*(default: "above")*

Defines the position of the labels.

#### *"above"*

The label is positioned at the top of the marker.

** Applicable for area and line series. **

#### *"center"*

The label is positioned at the point center.

** Applicable for column series only. **

#### *"insideEnd"*

The label is positioned inside, near the end of the point.

** Applicable for column series only. **

#### *"insideBase"*

The label is positioned inside, near the base of the bar.

** Applicable for column series. **

#### *"outsideEnd"*

The label is positioned outside, near the end of the bar.

** Applicable for column series only.  Not applicable for stacked series. **

#### *"right"*

The label is positioned to the right of the marker.

** Applicable for area and line series. **

#### *"below"*

The label is positioned at the bottom of the marker.

** Applicable for area and line series. **

#### *"left"*

The label is positioned to the left of the marker.

** Applicable for area and line series. **

### navigator.series.labels.template `String | Function`

The [template](/api/framework/kendo#methods-template) which renders the chart series label.

The fields which can be used in the template are:

*   category - the category name. Available for area, bar, column, bubble, donut, line and pie series.
*   dataItem - the original data item used to construct the point. Will be null if binding to array.
*   percentage - the point value represented as a percentage value. Available only for 100% stacked charts.
*   series - the data series
*   value - the point value. Can be a number or object containing each bound field.

#### Example

    // chart initialization
    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [
             {
                 type: "area",
                 name: "Series 1",
                 data: [200, 450, 300, 125],
                 labels: {
                     // label template
                     template: "#= value #%",
                     visible: true
                 }
             }
         ],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         }
    });

### navigator.series.labels.visible `Boolean`*(default: false)*

 The visibility of the labels.

### navigator.series.line `String | Object`

Line options.

** Applicable to area, candlestick and ohlc series. **

### navigator.series.line.color `String`

The line color.

### navigator.series.line.opacity `Number`*(default: 1)*

The line opacity.

### navigator.series.line.width `String`*(default: 4)*

The line width.

### navigator.series.lowField `String`

The data field containing the low value.

** Available for candlestick and ohlc series **

### navigator.series.markers `Object`

Marker options.

** Applicable for area and line series. **

### navigator.series.markers.background `String`

The background color of the current series markers.

### navigator.series.markers.border `Object`

The border of the markers.

### navigator.series.markers.border.color `String`*(default: "black")*

 The color of the border.

### navigator.series.markers.border.width `Number`*(default: 0)*

 The width of the border.

### navigator.series.markers.rotation `Number|Function`

The rotation angle of the markers.

#### Example
    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            markers: {
              type: "square",
              rotation: 45
            },
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
        }
    });
    </script>

### navigator.series.markers.size `Number`*(default: 6)*

 The marker size.

### navigator.series.markers.type `String`*(default: "circle")*

Configures the markers shape type.

#### *"square"*

The marker shape is square.

#### *"triangle"*

The marker shape is triangle.

#### *"circle"*

The marker shape is circle.

#### *"cross"*

The marker shape is cross.

### navigator.series.markers.visible `Boolean`*(default: false)*

The markers visibility.

### navigator.series.missingValues `String`

The behavior for handling missing values. The supported values are:

* "gap" - the plot stops before the missing point and continues after it.
* "interpolate" - the value is interpolated from neighboring points.
* "zero" - the value is assumed to be zero.

> The default value is "interpolate", except for "area" and stacked series which default to "zero".

> The `missingValues` option is supported when [series.type](#configuration-series.type) is set to "area" and "line".

### navigator.series.style `String` *(default: "normal")*

The supported values are:

* "normal" - The values will be connected with straight line.
* "step" - The values will be connected with a line with right angle.

> The default value is "normal".

> The `style` option is supported when [series.type](#configuration-series.type) is set to "area", "line".

### navigator.series.opacity `Number`

The series opacity.

### navigator.series.openField `String`

The data field containing the open value.

** Available for candlestick and ohlc series **

### navigator.series.overlay `Object`

The effects overlay.

### navigator.series.overlay.gradient `String`

The gradient name.

Available options:

* **glass** (column and candlestick series)
* **none**

### navigator.series.spacing `Number`*(default: 0.4)*

Space between points as proportion of the point width.

Available for column, candlestick and ohlc series.

### navigator.series.stack `Boolean|String|Object` *(default: false)*

A boolean value indicating if the series should be stacked.
A string value is interpreted as [navigator.series.stack.group](#configuration-series.stack.group).

> The `stack` options is supported when [navigator.series.type](#configuration-series.type) is set to "bar", "column", "line", "area", "verticalLine", "verticalArea", "radarLine", "radarArea" and "radarColumn".

> Stack settings of the first series are applied to the rest of the series.

### navigator.series.stack.type `String` *(default: "normal")*

The type of stack to plot. The following types are supported:

* "normal" - the value of the stack is the sum of all points in the category (or group)
* "100%" - the value of the stack is always 100% (1.00). Points within the category (or group) are represented as percentages.

### navigator.series.stack.group `String`

Indicates that the series should be stacked in a group with the specified name.

> The `group` option is supported when [navigator.series.type](#configuration-series.type) is set to "bar" or "column".

### navigator.series.tooltip `Object`

The data point tooltip configuration options.

### navigator.series.tooltip.background `String`

The background color of the tooltip. The default is determined from the series color.

### navigator.series.tooltip.border `Object`

The border configuration options.

### navigator.series.tooltip.border.color `String`*(default: "black")*

The color of the border.

### navigator.series.tooltip.border.width `Number`*(default: 0)*

The width of the border.

### navigator.series.tooltip.color `String`

The text color of the tooltip. The default is the same as the series labels color.

### navigator.series.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

### navigator.series.tooltip.format `String`

The tooltip format. Format variables depend on the series type:

* Area, column, line and pie
    *   **0** - value
* Candlestick and OHLC
    *   **0** - open value
    *   **1** - high value
    *   **2** - low value
    *   **3** - close value
    *   **4** - category name

#### Example

    //sets format of the tooltip
    format: "{0:C}--{1:C}"

### navigator.series.tooltip.padding `Number|Object`

The padding of the tooltip.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }

### navigator.series.tooltip.template `String|Function`

The tooltip template.
Template variables:

*   **value** - the point value (either a number or an object)
*   **category** - the category name
*   **series** - the data series
*   **dataItem** - the original data item used to construct the point.
        Will be null if binding to array.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
          series: {
            tooltip: {
              visible: true,
              template: "#= value # - #= date #"
            },

            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }
        }
    });
    </script>

### navigator.series.tooltip.visible `Boolean`*(default: false)*

A value indicating if the tooltip should be displayed.

### navigator.series.width `Number`

The line width.

** Applicable for line series. **

### navigator.select `Object`

Specifies the initially selected range.

The full range of values is shown if no range is specified.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
          select: {
              from: "2012/02/01",
              to: "2012/02/02"
          },

          series: {
            type: "line",
            field: "value",
            categoryField: "date",
            tooltip: {
              visible: true,
              template: "#= value # - #= date #"
            },
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) },
              { value: 1, date: new Date(2012, 1, 3) }
            ]
          }
        }
    });
    </script>

### navigator.select.from `Date`|`String`

The lower boundary of the selected range.

### navigator.select.to `Date`|`String`

The upper boundary of the selected range.

### navigator.hint `Object`

Default options for the navigator hint.

### navigator.hint.visible `Boolean`*(default: true)*

The visibility of the hint.

### navigator.hint.template `String | Function`

The hint template.
Template variables:

*   **from** - The lower boundary of the selected range
*   **to** - Theupper boundary of the selected range

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
          hint: {
            template: "From: #= from # To: #= to #"
          },

          series: {
            type: "line",
            field: "value", 
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) },
              { value: 1, date: new Date(2012, 1, 3) }
            ]
          }
        }
    });
    </script>

### navigator.hint.format `String`

The format of the hint.

#### Example

    //sets format of the hint
    format: "From: {0:d} To: {1:d}"

### axisDefaults `Object`

Default options for all chart axes.

### categoryAxis `Array`

The category axis configuration options.

### categoryAxis.axisCrossingValue `Object | Date | Array`

Category index at which the first value axis crosses this axis. (Only for object)

Category indicies at which the value axes cross the category axis. (Only for array)

**Note:** Specify an index greater than or equal to the number
of categories to denote the far end of the axis.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
         categoryAxis: {
             categories: ["A", "B"],
             axisCrossingValue: [0, 100]
         },
         valueAxis: [{ }, { name: "secondary" }]
    });
    </script>

### categoryAxis.categories `Array`

Array of category names.

### categoryAxis.color `String`

Color to apply to all axis elements. Any valid CSS color string will work here, including hex and rgb.
Individual color settings for line and labels take priority.

### categoryAxis.field `String`

The data field containing the category name.

#### Example

    // assuming the following data...
    var data = [ { sales: 200, year: 2005 }, { sales: 300, year: 2006 }, { sales: 400, year: 2007 }];
    // specify the "year" as the field for the category axis
    $("#chart").kendoChart({
        dataSource: {
            data: data
        },
        categoryAxis: {
            field: "year"
        },
        ...
    });

### categoryAxis.justified `Boolean`*(default: false)*

Positions categories and series points on major ticks. This removes the empty space before and after the series.

This option is ignored if either column, ohlc or candlestick series are plotted on the axis.

### categoryAxis.labels `Object`

Configures the axis labels.

### categoryAxis.labels.background `String`

The background color of the labels. Any valid CSS color string will work here, including hex and rgb.

### categoryAxis.labels.border `Object`

The border of the labels.

### categoryAxis.labels.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including hex and rgb.

### categoryAxis.labels.border.dashType `String`*(default: "solid")*

The dash type of the border.

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### categoryAxis.labels.border.width `Number`*(default: 0)*

The width of the border.

### categoryAxis.labels.color `String`

The text color of the labels. Any valid CSS color string will work here, including hex and rgb.

### categoryAxis.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

### categoryAxis.labels.format `String`

The format of the labels.

### categoryAxis.labels.margin `Number | Object`*(default: 0)*

The margin of the labels.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 0px (by default)
    margin: { top: 1, left: 1 }

### categoryAxis.labels.mirror `Boolean`

Mirrors the axis labels and ticks.
If the labels are normally on the left side of the axis,
mirroring the axis will render them to the right.

### categoryAxis.labels.padding `Number | Object`*(default: 0)*

The padding of the labels.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }

### categoryAxis.labels.rotation `Number`*(default: 0)*

The rotation angle of the labels.

### categoryAxis.labels.skip `Number`*(default: 1)*

Number of labels to skip.
Skips rendering the first n labels.

### categoryAxis.labels.step `Number`*(default: 1)*

Label rendering step.
Every n-th label is rendered where n is the step

### categoryAxis.labels.template `String | Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the category value
* dataItem - the data item, in case a field has been specified

#### Example

    // chart initialization
    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [{
             name: "Series 1",
             data: [200, 450, 300, 125]
         }],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003],
             labels: {
                 // labels template
                 template: "Year: #= value #"
             }
         }
    });

### categoryAxis.labels.visible `Boolean`*(default: true)*

The visibility of the labels.

### categoryAxis.line `Object`

Configures the axis line. This will also effect major and minor ticks, but not gridlines.

### categoryAxis.line.color `String`*(default: "black")*

The color of the lines. Any valid CSS color string will work here, including hex and rgb.

**Note:** This will also effect the major and minor ticks, but not the grid lines.

### categoryAxis.line.dashType `String`*(default: "solid")*

The dash type of the line.

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### categoryAxis.line.visible `Boolean`*(default: true)*

The visibility of the lines.

### categoryAxis.line.width `Number`*(default: 1)*

The width of the line. This will also effect the major and minor ticks, but
not the grid lines.

### categoryAxis.majorGridLines `Object`

Configures the major grid lines. These are the lines that are an extension of the major ticks through the
body of the chart.

### categoryAxis.majorGridLines.color `String`*(default: "black")*

The color of the lines. Any valid CSS color string will work here, including hex and rgb.

### categoryAxis.majorGridLines.dashType `String`*(default: "solid")*

The dash type of the grid lines.

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### categoryAxis.majorGridLines.visible `Boolean`*(default: false)*

The visibility of the lines.

### categoryAxis.majorGridLines.width `Number`*(default: 1)*

The width of the lines.

### categoryAxis.majorGridLines.step `Number` *(default: 1)*

The step of the category axis major grid lines.

### categoryAxis.majorGridLines.skip `Number` *(default: 0)*

The skip of the category axis major grid lines.

### categoryAxis.majorTicks `Object`

The major ticks of the axis.

### categoryAxis.majorTicks.color `String` *(default: "black")*

The color of the category axis major ticks lines. Accepts a valid CSS color string, including hex and rgb.

### categoryAxis.majorTicks.size `Number`*(default: 4)*

The axis major tick size. This is the length of the line in pixels that is drawn to indicate the tick
on the chart.

### categoryAxis.majorTicks.width `Number` *(default: 1)*

The width of the major ticks in pixels.

### categoryAxis.majorTicks.visible `Boolean`*(default: true)*

The visibility of the major ticks.

### categoryAxis.majorTicks.step `Number` *(default: 1)*

The step of the category axis major ticks.

### categoryAxis.majorTicks.skip `Number` *(default: 0)*

The skip of the category axis major ticks.

### categoryAxis.minorGridLines `Object`

Configures the minor grid lines.  These are the lines that are an extension of the minor ticks through
the body of the chart.

Note that minor grid lines are not visible by default, therefore none of these settings will take effect with the minor grid lines visibility being set to **true**.

### categoryAxis.minorGridLines.color `String`*(default: "black")*

The color of the lines. Any valid CSS color string will work here, including hex and
rgb.

Note that this setting has no effect if the visibility of the minor
grid lines is not set to **true**.

### categoryAxis.minorGridLines.dashType `String`*(default: "solid")*

The dash type of the grid lines.

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### categoryAxis.minorGridLines.visible `Boolean`*(default: false)*

The visibility of the lines.

### categoryAxis.minorGridLines.width `Number`

The width of the lines.

Note that this setting has no effect if the visibility of the minor
grid lines is not set to **true**.

### categoryAxis.minorGridLines.step `Number` *(default: 1)*

The step of the category axis minor grid lines.

### categoryAxis.minorGridLines.skip `Number` *(default: 0)*

The skip of the category axis minor grid lines.

### categoryAxis.minorTicks `Object`

The minor ticks of the axis.

### categoryAxis.minorTicks.size `Number`*(default: 3)*

The axis minor tick size. This is the length of the line in pixels that is drawn to indicate the tick
on the chart.

### categoryAxis.minorTicks.visible `Boolean`*(default: false)*

The visibility of the minor ticks.

### categoryAxis.minorTicks.color `String` *(default: "black")*

The color of the category axis minor ticks lines. Accepts a valid CSS color string, including hex and rgb.

### categoryAxis.minorTicks.width `Number` *(default: 1)*

The width of the minor ticks in pixels.

### categoryAxis.minorTicks.step `Number` *(default: 1)*

The step of the category axis minor ticks.

### categoryAxis.minorTicks.skip `Number` *(default: 0)*

The skip of the category axis minor ticks.

### categoryAxis.name `String`*(default: "primary")*

The unique axis name.

### categoryAxis.pane `String`

The name of the pane that the axis should be rendered in.
The axis will be rendered in the first (default) pane if not set.

### categoryAxis.plotBands `Array`

The plot bands of the category axis.

### categoryAxis.plotBands.from `Number`

The start position of the plot band in axis units.

### categoryAxis.plotBands.to `Number`

The end position of the plot band in axis units.

### categoryAxis.plotBands.color `String`

The color of the plot band.

### categoryAxis.plotBands.opacity `Number`

The opacity of the plot band.

### categoryAxis.reverse `Boolean`*(default: false)*

Reverses the axis direction -
categories are listed from right to left and from top to bottom.

### categoryAxis.select `Object`

The selected axis range. If configured, axis selection will be enabled.

** Available only for vertical axes **

The range units are:

#### *Generic axis*
Category index (0-based)

#### *Date axis*
Date instance or date string (yyyy/MM/dd HH:mm:ss)

### categoryAxis.select.from `Object`

The lower boundary of the selected range.

### categoryAxis.select.to `Object`

The upper boundary of the selected range.

*Note*: The category with the specified index (date) is not included in the selected range
unless the axis is justified. In order to select all categories specify
a value larger than the last category index (date).

### categoryAxis.select.min `Object`

The minimum value that is selectable by the user.

### categoryAxis.select.max `Object`

The maximum value that is selectable by the user.

*Note*: The category with the specified index (date) is not included in the selected range
unless the axis is justified. In order to select all categories specify
a value larger than the last category index (date).

### categoryAxis.select.mousewheel `Object`

Mousewheel zoom settings for the selection.

### categoryAxis.select.mousewheel.reverse `Boolean`*(default: true)*

Reverses the mousewheel zoom direction.
Normal direction is down for "zoom out", up for "zoom in".

### categoryAxis.select.mousewheel.zoom `String`*(default: "both")*

The zoom direction. Possible values:

#### *"both"*
Zooming expands and contracts the selection both sides.

#### *"left"*
Zooming expands and contracts the selection left side only.

#### *"right"*
Zooming expands and contracts the selection right side only.

### categoryAxis.title `Object`

The title of the category axis.

### categoryAxis.title.background `String`

The background color of the title. Any valid CSS color string will work here, including
hex and rgb.

### categoryAxis.title.border `Object`

The border of the title.

### categoryAxis.title.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including
hex and rgb.

### categoryAxis.title.border.dashType `String`*(default: "solid")*

The dash type of the border.

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### categoryAxis.title.border.width `Number`*(default: 0)*

The width of the border.

### categoryAxis.title.color `String`

The text color of the title. Any valid CSS color string will work here, including hex and rgb.

### categoryAxis.title.font `String`*(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

### categoryAxis.title.margin `Number|Object`*(default: 5)*

The margin of the title.

#### Example

    $("#chart").kendoChart({
        categoryAxis: {
            title: {
                // sets the top, right, bottom and left margin to 3px.
                margin: 3
            }
        },
        ...
    });
    //
    $("#chart").kendoChart({
        categoryAxis: {
            title: {
                // sets the top and left margin to 1px
                // margin right and bottom are with 0px (by default)
                margin: { top: 1, left: 1 }
            }
        },
        ...
    });

### categoryAxis.title.position `String`*(default: "center")*

The position of the title.

#### *"top"*

The axis title is positioned on the top (applicable to vertical axis)

#### *"bottom"*

The axis title is positioned on the bottom (applicable to vertical axis)

#### *"left"*

The axis title is positioned on the left (applicable to horizontal axis)

#### *"right"*

The axis title is positioned on the right (applicable to horizontal axis)

#### *"center"*

The axis title is positioned in the center

### categoryAxis.title.rotation `Number`*(default: 0)*

The rotation angle of the title.

### categoryAxis.title.text `String`

The text of the title.

### categoryAxis.title.visible `Boolean`*(default: true)*

The visibility of the title.

### categoryAxis.type `String`*(default: "category")*

The axis type.

#### *"category"*

Discrete category axis.

#### *"date"*

Specialized axis for displaying chronological data.

### categoryAxis.autoBaseUnitSteps `Object`

The discrete [categoryAxis.baseUnitStep](#configuration-categoryAxis.baseUnitStep) values when
either [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "fit" or
[categoryAxis.baseUnitStep](#configuration-categoryAxis.baseUnitStep) is set to "auto".

#### Example - set category axis auto base unit steps

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
        categoryAxis: {
            categories: [
                new Date("2012/02/01 00:00:00"),
                new Date("2012/02/02 00:00:00"),
                new Date("2012/02/20 00:00:00")
            ],
            baseUnitStep: "auto",
            autoBaseUnitSteps: {
                days: [3]
            }
        }
    });
    </script>

### categoryAxis.autoBaseUnitSteps.days `Array` *(default: [1, 2, 3])*

The days unit steps.

### categoryAxis.autoBaseUnitSteps.hours `Array` *(default: [1, 2, 3])*

The hours unit steps.

### categoryAxis.autoBaseUnitSteps.minutes `Array` *(default: [1, 2, 5, 15, 30])*

The minutes unit steps.

### categoryAxis.autoBaseUnitSteps.months `Array` *(default: [1, 2, 3, 6])*

The months unit steps.

### categoryAxis.autoBaseUnitSteps.weeks `Array` *(default: [1, 2])*

The weeks unit steps.

### categoryAxis.autoBaseUnitSteps.years `Array` *(default: [1, 2, 3, 5, 10, 25, 50])*

The years unit steps.

### categoryAxis.background `String`

The background color of the axis.

### categoryAxis.baseUnit `String`

The base time interval for the date axis. The default base unit is determined automatically from the minimum difference
between subsequent categories.

The supported values are:

* "days"
* "fit"
* "hours"
* "minutes"
* "months"
* "weeks"
* "years"

Setting `baseUnit` to "fit" will set such base unit and [categoryAxis.baseUnitStep](#configuration-categoryAxis.baseUnitStep)
that the total number of categories does not exceed [categoryAxis.maxDateGroups](#configuration-categoryAxis.maxDateGroups).

Series data is aggregated for the specified base unit using the [series.aggregate](#configuration-series.aggregate) function.

### categoryAxis.baseUnitStep `Object` *(default: 1)*

The step (interval) between categories in base units. Setting it to "auto" will set the step to such value
that the total number of categories does not exceed [categoryAxis.maxDateGroups](#configuration-categoryAxis.maxDateGroups).

This option is ignored if [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "fit".

### categoryAxis.labels.culture `String`

Culture to use for formatting the dates. See [Globalization](/framework/globalization/overview) for more information.
It defaults to the global culture.

### categoryAxis.labels.dateFormats `Object`

Date format strings

#### *"hours"*

"HH:mm"

#### *"days"*

"M/d"

#### *"weeks"*

"M/d"

#### *"months"*

"MMM 'yy"

#### *"years"*

"yyyy"

The Chart will choose the appropriate format for the current `baseUnit`.
Setting the labels **format** option will override these defaults.

### categoryAxis.max `Object`

The last date displayed on the axis.
By default, the minimum date is the same as the last category.
This is often used in combination with the **min** and **roundToBaseUnit** configuration options to
set up a fixed date range.

### categoryAxis.min `Object`

The first date displayed on the axis.
By default, the minimum date is the same as the first category.
This is often used in combination with the **max** and **roundToBaseUnit** configuration options to
set up a fixed date range.

### categoryAxis.roundToBaseUnit `Boolean`*(default: true)*

By default, the first and last dates will be rounded off to the nearest base unit.
Specifying **false** for this option will disable this behavior.

This option is most useful in combination with explicit **min** and **max** dates.

It will be ignored if either column, ohlc or candlestick series are plotted on the axis.

### categoryAxis.weekStartDay `Number`*(default: kendo.days.Sunday)*

Specifies the week start day when **baseUnit** is set to "weeks".
Use the *kendo.days* constants to specify the day by name.

* kendo.days.Sunday (0)
* kendo.days.Monday (1)
* kendo.days.Tuesday (2)
* kendo.days.Wednesday (3)
* kendo.days.Thursday (4)
* kendo.days.Friday (5)
* kendo.days.Saturday (6)


### categoryAxis.maxDateGroups `Number`

Specifies the maximum number of groups (categories) to produce when
either **baseUnit** is set to "fit" or **baseUnitStep** is set to "auto".

This option is ignored in all other cases.

The default value is approximately equal to `[widget width, px] / 30`

### categoryAxis.visible `Boolean`*(default: true)*

The visibility of the axis.

### categoryAxis.crosshair `Object`

The crosshair configuration options.

### categoryAxis.crosshair.color `String`

The color of the crosshair.

### categoryAxis.crosshair.width `Number`

The width of the crosshair.

### categoryAxis.crosshair.opacity `Number`

The opacity of the crosshair.

### categoryAxis.crosshair.dashType `Number`

The dash type of the crosshair.

### categoryAxis.crosshair.visible `Boolean`*(default: false)*

The dash type of the crosshair.

### categoryAxis.crosshair.tooltip `Object`

The crosshar tooltip configuration options.

### categoryAxis.crosshair.tooltip.background `String`

The background color of the tooltip.

### categoryAxis.crosshair.tooltip.border `Object`

The border configuration options.

### categoryAxis.crosshair.tooltip.border.color `String`*(default: "black")*

The color of the border.

### categoryAxis.crosshair.tooltip.border.width `Number`*(default: 0)*

The width of the border.

### categoryAxis.crosshair.tooltip.color `String`

The text color of the tooltip.

### categoryAxis.crosshair.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

### categoryAxis.crosshair.tooltip.format `String`

The tooltip format.

#### Example

    //sets format of the tooltip
    format: "C"

### categoryAxis.crosshair.tooltip.padding `Number|Object`

The padding of the tooltip.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }

### categoryAxis.crosshair.tooltip.template `String|Function`

The tooltip template.
Template variables:

*   **value** - the point value (either a number or an object)

#### Example

    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [{
             type: "area",
             name: "Series 1",
             data: [200, 450, 300, 125]
         }],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003],
             crosshair: {
                 visible: true,
                 tooltip: {
                     visible: true,
                     template: "|#= value #|"
                 }
             }
         }
    });

### categoryAxis.crosshair.tooltip.visible `Boolean`*(default: false)*

A value indicating if the tooltip should be displayed.

### categoryAxis.notes `Object`

The category axis notes configuration.

### categoryAxis.notes.position `String`

The position of the category axis note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

### categoryAxis.notes.icon `Object`

The icon of the notes.

### categoryAxis.notes.icon.background `String`

The background color of the notes icon.

#### Example - set the category axis notes icon background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          icon: {
            background: "red"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.icon.border `Object`

The border of the icon.

#### Example - set the category axis notes icon border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          icon: {
            border: {
              width: 2,
              color: "red"
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.icon.border.color `String`

The border color of the icon.

#### Example - set the category axis notes icon border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          icon: {
            border: {
              width: 2,
              color: "red"
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.icon.border.width `Number`

The border width of the icon.

#### Example - set the category axis notes icon border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          icon: {
            border: {
              width: 2,
              color: "red"
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.icon.size `Number`

The size of the icon.

#### Example - set the category axis notes icon size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          icon: {
            size: 30
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.icon.type `String` *(default: "circle")*

The icon shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.

#### Example - set the category axis notes icon shape

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          icon: {
            shape: "triangle"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.icon.visible `Boolean` *(default: "true")*

The icon visibility.

#### Example - set the category axis notes icon visibility

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          icon: {
            visible: false
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label `Object`

The label of the notes.

### categoryAxis.notes.label.background `String`

The background color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis label background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            background: "red"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.border `Object`

The border of the label.

#### Example - set the category axis label border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            border: {
              color: "green",
              dashType: "dashDot",
              width: 1
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            border: {
              color: "green"
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the category axis label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            border: {
              dashType: "dashDot",
              width: 1
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the category axis label border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            border: {
              width: 1
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.color `String`

The text color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            color: "#aa00bb"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the label.

#### Example - set the chart series label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            font: "20px sans-serif"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the category value

#### Example - set the category axis notes label template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            template: "Year: #: value #"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category notes label. By default the category notes label are visible.

#### Example - hide the category axis notes label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            visible: false
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.rotation `Number` *(default: 0)*

The rotation angle of the label. By default the label are not rotated.

#### Example - rotate the category axis notes label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            rotation: 90
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.format `String` *(default: "{0}")*

The format used to display the notes label. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

#### Example - set the category axis notes label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            format: "Category slot: {0}"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.position `String` *(default: "inside")*

The position of the labels.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.

### categoryAxis.notes.line `Object`

The line of the notes.

### categoryAxis.notes.line.width `Number`

The line width of the notes.

#### Example - set the category axis notes line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          line: {
            width: 4
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.line.color `String`

The line color of the notes.

#### Example - set the category axis notes color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          line: {
            color: "#aa00bb"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.line.length `Number`

The length of the connecting lines in pixels.

#### Example - set the category axis notes color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          line: {
            length: 20
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.data `Array`

The items of the notes.

### categoryAxis.notes.data.value `Object`

The value of the note.

### categoryAxis.notes.data.position `String`

The position of the category axis note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

### categoryAxis.notes.data.icon `Object`

The icon of the note.

### categoryAxis.notes.data.icon.background `String`

The background color of the note icon.

#### Example - set the category axis note icon background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              background: "red"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.icon.border `Object`

The border of the icon.

#### Example - set the category axis note icon border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              border: {
                width: 2,
                color: "red"
              }
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.icon.border.color `String`

The border color of the icon.

#### Example - set the category axis note icon border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              border: {
                width: 2,
                color: "red"
              }
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.icon.border.width `Number`

The border width of the icon.

#### Example - set the category axis note icon border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              border: {
                width: 2,
                color: "red"
              }
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.icon.size `Number`

The size of the icon.

#### Example - set the category axis note icon size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              size: 30
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.icon.type `String` *(default: "circle")*

The icon shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.

#### Example - set the category axis note icon shape

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              shape: "triangle"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.icon.visible `Boolean` *(default: "true")*

The icon visibility.

#### Example - set the category axis note icon visibility

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              visible: false
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label `Object`

The label of the note.

### categoryAxis.notes.data.label.background `String`

The background color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis note label background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notesdata {
          data: [{
            value: 1,
            label: {
              background: "red"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.border `Object`

The border of the label.

#### Example - set the category axis note label border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              border: {
                color: "green",
                dashType: "dashDot",
                width: 1
              }
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis note label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              border: {
                color: "green"
              }
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the category axis note label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              border: {
                dashType: "dashDot",
                width: 1
              }
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the category axis note label border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              border: {
                width: 1
              }
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.color `String`

The text color of the note label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis note label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              color: "#aa00bb"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the note label.

#### Example - set the category axis note label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              font: "20px sans-serif"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the category value

#### Example - set the category axis note label template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              template: "Year: #: value #"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category notes label. By default the category notes label are visible.

#### Example - hide the category axis note label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              visible: false
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.rotation `Number` *(default: 0)*

The rotation angle of the label. By default the label are not rotated.

#### Example - rotate the category axis note label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              rotation: 90
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.format `String` *(default: "{0}")*

The format used to display the note label. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

#### Example - set the category axis note label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              format: "Category slot: {0}"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.text `String`

The label note text.

#### Example - set the category axis label note text

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              text: "A"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.position `String` *(default: "inside")*

The position of the category axis note label.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.

### categoryAxis.notes.data.line `Object`

The line of the note.

### categoryAxis.notes.data.line.width `Number`

The line width of the note.

#### Example - set the category axis note line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            line: {
              width: 4
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.line.color `String`

The line color of the note.

#### Example - set the category axis note color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            line: {
              color: "#aa00bb"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.line.length `Number`

The length of the connecting lines in pixels.

#### Example - set the category axis note color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            line: {
              length: 20
            }
          }]
        }
      }
    });
    </script>

### chartArea `Object`

The chart area configuration options.
This is the entire visible area of the chart.

### chartArea.background `String`*(default: "white")*

The background color of the chart area.

### chartArea.opacity `Number`*(default: 1)*

The background opacity of the chart area.

### chartArea.border `Object`

The border of the chart area.

### chartArea.border.color `String`*(default: "black")*

The color of the border.

### chartArea.border.dashType `String`*(default: "solid")*

The dash type of the border.

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### chartArea.border.width `Number`*(default: 0)*

The width of the border.

### chartArea.height `Number`*(default: 400)*

The height of the chart area.

### chartArea.margin `Number|Object`*(default: 5)*

The margin of the chart area.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 5px (by default)
    margin: { top: 1, left: 1 }

### chartArea.width `Number`*(default: 600)*

 The width of the chart area.

### dataSource `Object`

DataSource configuration or instance.

#### Example

    $("#chart").kendoChart({
        dataSource: {
            transport: {
                 read: "spain-electricity.json"
            }
        },
        series: [{
            field: "value"
        }],
        categoryAxis: {
            field: "year"
        }
    });

    // Alternative configuration
    var dataSource = new kendo.data.DataSource({
        transport: {
             read: "spain-electricity.json"
        }
    });

    $("#chart").kendoChart({
        dataSource: dataSource,
        series: [{
            field: "value"
        }],
        categoryAxis: {
            field: "year"
        }
    });

### autoBind `Boolean`*(default: true)*

Indicates whether the chart will call read on the data source initially.

#### Example
    $("#stock-chart").kendoStockChart({
        dataSource: chartDataSource,
        chartBind: false
    });

    // ...
    naviDataSource.read();

### legend `Object`

The chart legend configuration options.

#### Example

    $("#chart").kendoChart({
        legend: {
            // set the background color to a dark blue
            background: "#336699",
            labels: {
                // set the font to a size of 14px
                font: "14px Arial,Helvetica,sans-serif",
                // set the color to red
                color: "red"
            },
            // move the legend to the left
            position: "left",
            // move the legend a bit closer to the chart by setting the x offset to 20
            offsetX: 20,
            // move the legend up to the top by setting the y offset to -100
            offsetY: -100,
        }
    });

### legend.background `String`*(default: "white")*

 The background color of the legend. Any valid CSS color string will work here, including hex and rgb.

### legend.border `Object`

The border of the legend.

#### Example

    $("#chart").kendoChart({
        legend: {
            border: {
                // set the border width to 2 pixels
                width: 2,
                // set the color to grey
                color: "grey",
                // set the dash type to solid. this is the default so we could leave this line out.
                dashType: "solid"
            }
        },
        ...
    });

### legend.border.color `String`*(default: "black")*

 The color of the border.

### legend.border.dashType `String`*(default: "solid")*

 The dash type of the border.


#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

#### Example



### legend.border.width `Number`*(default: 0)*

 The width of the border.

### legend.item `Object`

The chart legend item configuration.

### legend.item.cursor `String`
The [cursor style](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) of the legend item.

### legend.item.visual `Function`

A function that can be used to create a custom visual for the legend items. The available argument fields are:

* options - the item options.
* createVisual - a function that can be used to get the default visual.

#### Example - using custom visual for the legend items

    <div id="chart"></div>
    <script>
      $("#chart").kendoStockChart({
        legend: {
          item: {
            visual: function (e) {
              var color = e.options.markers.background;
              var labelColor = e.options.labels.color;
              var rect = new kendo.geometry.Rect([0, 0], [100, 50]);
              var layout = new kendo.drawing.Layout(rect, {
                spacing: 5,
                alignItems: "center"
              });

              var marker = new kendo.drawing.Path({
                fill: {
                  color: color
                }
              }).moveTo(10, 0).lineTo(15, 10).lineTo(5, 10).close();

              var label = new kendo.drawing.Text(e.series.name, [0, 0], {
                fill: {
                  color: labelColor
                }
              });

              layout.append(marker, label);
              layout.reflow()

              return layout;
            }
          }
        },
        series: [
          { name: "Series 1", data: [1, 2, 3] },
          { name: "Series 2", data: [3, 4, 5] }
        ]
      });
    </script>

### legend.labels `Object`

Configures the legend labels.

### legend.labels.color `String`*(default: "black")*

The color of the labels.
Any valid CSS color string will work here, including hex and rgb.

### legend.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

### legend.labels.template `String`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

*   text - the text the legend item.
*   series - the data series.
*   value - the point value. (only for donut and pie charts)
*   percentage - the point value represented as a percentage value. Available only for 100% stacked charts.
*   dataItem - the original data item used to construct the point.


### legend.margin `Number | Object`*(default: 10)*

 The margin of the legend.

#### Example

    $("#chart").kendoChart({
        legend: {
            // sets the top, right, bottom and left margin to 3px.
            margin: 3
        },
        ...
    });
    //
    $("#chart").kendoChart({
        legend: {
            // sets the top and left margin to 1px
            // margin right and bottom are with 10px (by default)
            margin: { top: 1, left: 1 }
        },
        ...
    });

### legend.offsetX `Number`*(default: 0)*

 The X offset from its position.  The offset is relative to the current position of the legend.
For instance, a value of 20 will move the legend 20 pixels to the right of it's initial position.  A negative value will move the legend
to the left of the current position.

#### Example

    $("#chart").kendoChart({
        legend: {
            // move the legend to the left side of the chart
            offsetX: 20
        },
        ...
    });

### legend.offsetY `Number`*(default: 0)*

 The Y offset from its position.  The offset is relative to the current position of the legend.
For instance, a value of 20 will move the legend 20 pixels down from it's initial position.  A negative value will move the legend
upwards from the current position.

#### Example

    $("#chart").kendoChart({
        legend: {
            // move the legend up 100 pixels
            offsetY: -100
        },
        ...
    });

### legend.padding `Number | Object`*(default: 5)*

 The padding of the legend.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    $("#chart").kendoChart({
        legend: {
            // sets the top, right, bottom and left padding to 3px.
            padding: 3
        },
        ...
    });
    //
    $("#chart").kendoChart({
        legend: {
           // sets the top and left padding to 1px
           // padding right and bottom are with 5px (by default)
           padding: { top: 1, left: 1 }
        },
        ...
    });

### legend.position `String`*(default: "right")*

 The positions of the legend.


#### *"top"*

The legend is positioned on the top.

#### *"bottom"*

The legend is positioned on the bottom.

#### *"left"*

The legend is positioned on the left.

#### *"right"*

The legend is positioned on the right.

#### *"custom"*

The legend is positioned using OffsetX and OffsetY.

### legend.reverse `Boolean` *(default: false)*

If set to `true` the legend items will be reversed.

Available in versions 2013.3.1306 and later.

### legend.visible `Boolean`*(default: false)*

 The visibility of the legend.

#### Example

    $("#chart").kendoChart({
        legend: {
            // show the legend
            visible: true
        },
        ...
    });

### legend.inactiveItems `Object`

Configures the legend inactive items.

### legend.inactiveItems.labels `Object`

Configures the legend labels.

### legend.inactiveItems.labels.color `String` *(default: "black")*

The color of the labels.
Any valid CSS color string will work here, including hex and rgb.

### legend.inactiveItems.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

### legend.inactiveItems.labels.template `String`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

*   text - the text the legend item.
*   series - the data series.
*   value - the point value. (only for donut and pie charts)
*   percentage - the point value represented as a percentage value. Available only for 100% stacked charts.
*   dataItem - the original data item used to construct the point.

### legend.inactiveItems.markers `Object`

Configures the legend markers.

### legend.inactiveItems.markers.color `String`

The color of the markers.
Any valid CSS color string will work here, including hex and rgb.

### panes `Array`

The chart panes configuration.

Panes are used to split the chart in two or more parts. The panes are ordered from top to bottom.

Each axis can be associated with a pane by setting its `pane` option to the name of the desired pane.
Axis that don't have specified pane are placed in the top (default) pane.

Series are moved to the desired pane by associating them with an axis.

### panes.name `String`

The unique pane name.

### panes.margin `Number|Object`

The margin of the pane.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    margin: { top: 1, left: 1 }

### panes.padding `Number|Object`

The padding of the pane.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    padding: { top: 1, left: 1 }

### panes.background `String`

The background color of the pane.

### panes.border `Object`

The border of the pane.

### panes.border.color `String`*(default: "black")*

The color of the border.

### panes.border.dashType `String`*(default: "solid")*

The dash type of the border.

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### panes.border.width `Number`*(default: 0)*

The width of the border.

### panes.clip `Boolean`

Specifies whether the charts in the pane should be clipped.

### panes.height `Number`

The pane height in pixels.

### panes.title `String|Object`

The pane title text or configuration.

### panes.title.background `String`

The background color of the title. Any valid CSS color string will work here, including
hex and rgb.

### panes.title.border `Object`

The border of the title.

### panes.title.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including
hex and rgb.

### panes.title.border.dashType `String`*(default: "solid")*

The dash type of the border.

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### panes.title.border.width `Number`*(default: 0)*

The width of the border.

### panes.title.color `String`

The text color of the title. Any valid CSS color string will work here, including hex and rgb.

### panes.title.font `String`*(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

### panes.title.margin `Number|Object`*(default: 5)*

The margin of the title.

### panes.title.position `String`*(default: "center")*

The position of the title.

#### *"left"*

The pane title is positioned on the left

#### *"right"*

The pane title is positioned on the right

#### *"center"*

The pane title is positioned in the center

### panes.title.text `String`

The text of the title.

### panes.title.visible `Boolean`*(default: true)*

The visibility of the title.

### pdf `Object`
Configures the export settings for the [saveAsPDF](#methods-saveAsPDF) method.

### pdf.author `String` *(default: null)*
The author of the PDF document.

#### Example - set the author
    <div id="chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              author: "John Doe"
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### pdf.creator `String` *(default: "Kendo UI PDF Generator")*
The creator of the PDF document.

#### Example - set the creator
    <div id="chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              creator: "John Doe"
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### pdf.date `Date`
The date when the PDF document is created. Defaults to `new Date()`.

#### Example - set the date
    <div id="chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              date: new Date("2014/10/10")
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### pdf.forceProxy `Boolean` *(default: false)*
If set to true, the content will be forwarded to [proxyURL](#configuration-pdf.proxyURL) even if the browser supports saving files locally.

#### Example - use proxy
    <div id="chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              proxyURL: "/save",
              forceProxy: true
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### pdf.fileName `String` *(default: "Export.pdf")*
Specifies the file name of the exported PDF file.

#### Example - set the default PDF file name
    <div id="chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              fileName: "Products.pdf"
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### pdf.keywords `String` *(default: null)*
Specifies the keywords of the exported PDF file.

#### Example - set the keywords
    <div id="chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              keywords: "monthly report"
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### pdf.landscape `Boolean` *(default: false)*
Set to `true` to reverse the paper dimensions if needed such that width is the larger edge.

#### Example - enable landscape mode
    <div id="chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              paperSize: "A4",
              landscape: true
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### pdf.margin `Object`
Specifies the margins of the page (numbers or strings with units). Supported
units are "mm", "cm", "in" and "pt" (default).

#### Example - set the margins
    <div id="chart" style="width: 600px; height: 400px;"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              margin: {
                  left: 10,
                  right: "10pt",
                  top: "10mm",
                  bottom: "1in"
              }
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### pdf.margin.bottom `Number|String` *(default: 0)*
The bottom margin. Numbers are considered as "pt" units.

### pdf.margin.left `Number|String` *(default: 0)*
The left margin. Numbers are considered as "pt" units.

### pdf.margin.right `Number|String` *(default: 0)*
The right margin. Numbers are considered as "pt" units.

### pdf.margin.top `Number|String` *(default: 0)*
The top margin. Numbers are considered as "pt" units.

### pdf.paperSize `String|Array` *(default: "auto")*
Specifies the paper size of the PDF document.
The default "auto" means paper size is determined by content.

> The size of the content in pixels will match the size of the output in points (1 pixel = 1/72 inch).

Supported values:

* A predefined size: "A4", "A3" etc
* An array of two numbers specifying the width and height in points (1pt = 1/72in)
* An array of two strings specifying the width and height in units.
  Supported units are "mm", "cm", "in" and "pt".

#### Example - set custom paper size
    <div id="chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              paperSize: ["20cm", "20cm"]
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### pdf.proxyURL `String` *(default: null)*
The URL of the server side proxy which will stream the file to the end user.

A proxy will be used when the browser isn't capable of saving files locally.
Such browsers are IE version 9 and lower and Safari.

The developer is responsible for implementing the server-side proxy.

The proxy will receive a POST request with the following parameters in the request body:

* contentType: The MIME type of the file
* base64: The base-64 encoded file content
* fileName: The file name, as requested by the caller.

The proxy should return the decoded file with set "Content-Disposition" header.

#### Example - set the server proxy URL
    <div id="chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              proxyURL: "/save"
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### pdf.proxyTarget `String` *(default: "_self")*

A name or keyword indicating where to display the document returned from the proxy.

If you want to display the document in a new window or iframe,
the proxy should set the "Content-Disposition" header to `inline; filename="<fileName.pdf>"`.

#### Example - open the generated document in a new window
    <div id="chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              forceProxy: true,
              proxyURL: "/save",
              proxyTarget: "_blank"
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### pdf.subject `String` *(default: null)*
Sets the subject of the PDF file.

#### Example - set the subject
    <div id="chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              subject: "Products"
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### pdf.title `String` *(default: null)*
Sets the title of the PDF file.

#### Example - set the title
    <div id="chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              title: "Products"
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### plotArea `Object`

The plot area configuration options. This is the area containing the plotted series.

### plotArea.background `String`*(default: "white")*

 The background color of the plot area.

### plotArea.opacity `Number`*(default: 1)*

 The background opacity of the plot area.

### plotArea.border `Object`

The border of the plot area.

### plotArea.border.color `String`*(default: "black")*

 The color of the border.

### plotArea.border.dashType `String`*(default: "solid")*

 The dash type of the border.


#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### plotArea.border.width `Number`*(default: 0)*

 The width of the border.

### plotArea.margin `Number|Object`*(default: 5)*

 The margin of the plot area.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 5px (by default)
    margin: { top: 1, left: 1 }

### renderAs `String`

Sets the preferred rendering engine.
If it is not supported by the browser, the Chart will switch to the first available mode.

The supported values are:

* "svg" - renders the widget as inline SVG document, if available
* "vml" - renders the widget as VML, if available
* "canvas" - renders the widget as a Canvas element, if available.

> Using Canvas rendering disables most interactive features.

### Example - Render as Canvas, if supported

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        renderAs: "canvas",
        series: [{
          type: "line",
          field: "value",
          categoryField: "date",
          data: [
            { value: 1, date: new Date(2012, 1, 1) },
            { value: 2, date: new Date(2012, 1, 2) }
          ]
        }]
    });
    </script>

### series `Array`

Array of series definitions.

The series type is determined by the value of the type field.
If a type value is missing, the type is assumed to be the one specified in seriesDefaults.

Each series type has a different set of options.

> **Info:** Some options accept function as argument. They will be evaluated for each point (supplied as parameter). The theme/seriesDefaults value will be used if no value is returned.

### series.type `String`

The type of the series. Available types:

* area
* column
* line
* candlestick, ohlc
* bullet

### series.dashType `String`*(default: "solid")*

The series line dash type.

** Applicable only to line series **

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### series.data `Array`

Array of data items. The data item type can be either a:

* Array of objects. Each point is bound to the specified series fields.
* Array of numbers. Available for area, column and line series.
* Array of arrays of numbers. Available for:
    * OHLC and candlestick series (open, high, low, close)

### series.highField `String`

The data field containing the high value.

** Available for candlestick and ohlc series only **

### series.field `String`

The data field containing the series value.

### series.categoryField `String` *(default: "category")*

The data item field which contains the category name or date.

> The points will be rendered in chronological order if the category is a date.

> If specified, the [dateField](#configuration-dateField) option is used as a default.

#### Example - set series date category field

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
          type: "line",
          field: "value",
          categoryField: "date",
          data: [
            { value: 1, date: new Date(2012, 1, 1) },
            { value: 2, date: new Date(2012, 1, 2) }
          ]
        }]
    });
    </script>

### series.currentField `String`

The data field containing the current value.

** Available for bullet and verticalBullet series. **

### series.targetField `String`

The data field containing the target value.

** Available for bullet and verticalBullet series. **

### series.name `String`

The series name visible in the legend.

#### Example - set the series name
    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
      dataSource: {
        data: [
          { value: 1, category: "One", date: new Date(2012, 1, 1)},
          { value: 2, category: "Two", date: new Date(2012, 1, 2)}
        ]
      },
      dateField: "date",
      series: [
        {
          field: "value",
          name: "Value"
        }
      ],
      legend: {
        visible: true,
        position: "bottom"
      }
    });
    </script>

The name can also be a [template](/api/framework/kendo#methods-template) which sets the name of the series when bound to grouped data source.

The fields which can be used in the template are:

*   series - the series options
*   group - the data group
*   group.field - the name of the field used for grouping
*   group.value - the field value for this group.

#### Example - set the chart series group name template
    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
      dataSource: {
        data: [
          { value: 1, category: "One", date: new Date(2012, 1, 1)},
          { value: 2, category: "Two", date: new Date(2012, 1, 2)}
        ],
        group: { field: "category" }
      },
      dateField: "date",
      series: [
        {
          field: "value",
          name: "Category: #: group.value #"
        }
      ],
      legend: {
        visible: true,
        position: "bottom"
      }
    });
    </script>

### series.highlight `Object`

Configures the appearance of highlighted points.

### series.highlight.visible `Boolean`*(default: true)*

A value indicating if the series points should be highlighted.

### series.highlight.border `Object`

The border of highlighted points. The color is computed automatically from the base point color.

** Applicable to bubble, pie, candlestick and ohlc series. **

### series.highlight.border.width `Number`

The width of the border.

### series.highlight.border.color `String`

The border color.

### series.highlight.border.opacity `Number`

The border opacity.

### series.highlight.color `String`

The highlight color.

** Available only for pie series **

### series.highlight.line `Object`

Line options for highlighted points. The color is computed automatically from the base point color.

** Available only for candlestick series **

### series.highlight.line.width `Number`

The width of the line.

### series.highlight.line.color `String`

The line color.

### series.highlight.line.opacity `Number`

The opacity of the line.

### series.highlight.opacity `Number`

The opacity of the highlighted points.

** Applicable to bubble, pie, candlestick and ohlc series. **

### series.aggregate `String|Function` *(default: "max")*

The aggregate function to apply for date series.

This function is used when a category (an year, month, etc.) contains two or more points.
The function return value is displayed instead of the individual points.

The supported values are:

* "avg" - the average of all values for the date period.
* "count" - the number of values for the date period.
* "max" - the highest value for the date period.
* "min" - the lowest value for the date period.
* "sum" - the sum of all values for the date period. Defaults to 0 if no data points are defined.
* "sumOrNull" - the sum of all values for the date period. Defaults to `null` if no data points are defined.
* "first" - the first value
* function(values, series, dataItems, category) - user-defined aggregate function. Returns single value or data item.
* object  - (compound aggregate) **Applicable to "candlestick" and ohlc "series"**. Specifies the aggregate for each data item field.

##### Example

    aggregate: {
        open: "max",
        high: "max",
        close: "min",
        low: "max"
    }

### series.axis `String`*(default: "primary")*

The name of the value axis to use.

** Applicable to area, column, line, ohlc and candlestick series **

### series.border `Object`

The border of the points.

** Applicable to column, ohlc and candlestick series **

### series.border.color `String|Function`

The color of the border.  It defaults to the color of the current series.

### series.border.dashType `String|Function`*(default: "solid")*

The dash type of the border.

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### series.border.opacity `Number|Function`

The border opacity.

### series.border.width `Number|Function`*(default: 1)*

The width of the border.

### series.closeField `String`

The data field containing the close value.

** Available for candlestick and ohlc series only **

### series.color `String|Function`

The series base color. The supported values are:

* CSS color string, including hex and rgb
* function(point) - user-defined function that will be evaluated for each point. Returning `undefined` will assume the default series color.

#### Example

    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2012-03-01 00:00"),
                price: 111
            }, {
                date: new Date("2012-03-02 00:00"),
                price: 121
            }, {
                date: new Date("2012-03-05 00:00"),
                price: 105
            }]
        },
        dateField: "date",
        series: [{
            type: "column",
            field: "price",
            color: "#ff0000"
        }]
    });

#### Example

    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2012-03-01 00:00"),
                price: 111
            }, {
                date: new Date("2012-03-02 00:00"),
                price: 121
            }, {
                date: new Date("2012-03-05 00:00"),
                price: 95
            }]
        },
        dateField: "date",
        series: [{
            type: "column",
            field: "price",
            color: function(point) {
                if (point.value < 100) {
                    // Colorize matching points
                    return "#f00";
                }

                // Use default theme color
            }
        }]
    });

### series.colorField `String`

The data field containing the point color.

** Applicable for column, candlestick and ohlc series. **

### series.downColor `String|Function`

The series color when the open value is greater than the close value.

** Available for candlestick series only **

### series.downColorField `String`

The data field containing the color applied when the open value is greater than the close value.

** Available for candlestick series only **

### series.gap `Number`*(default: 1.5)*

The distance between category clusters.

** Applicable for column, candlestick and ohlc series. **

### series.labels `Object`

Configures the series data labels.

#### *"circle"*

The labels are positioned in circle around the chart.

#### *"column"*

The labels are positioned in columns to the left and right of the chart.

### series.labels.background `String|Function`

The background color of the labels.

### series.labels.border `Object`

The border of the labels.

### series.labels.border.color `String|Function`*(default: "black")*

 The color of the border.

### series.labels.border.dashType `String|Function`*(default: "solid")*

 The dash type of the border.

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### series.labels.border.width `Number|Function`*(default: 0)*

 The width of the border.

### series.labels.color `String|Function`

The text color of the labels.

### series.labels.font `String|Function`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

### series.labels.format `String|Function`

The format of the labels.

#### Example

    //sets format of the labels
    format: "C"

### series.labels.margin `Number|Object`*(default: { left: 5, right: 5})*

The margin of the labels.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and bottom margin to 1px
    // margin left and right are with 5px (by default)
    margin: { top: 1, bottom: 1 }

### series.labels.padding `Number|Object`*(default: 0)*

 The padding of the labels.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }

### series.labels.position `String|Function`*(default: "above")*

Defines the position of the labels.

#### *"above"*

The label is positioned at the top of the marker.

** Applicable for area and line series. **

#### *"center"*

The label is positioned at the point center.

** Applicable for column series only. **

#### *"insideEnd"*

The label is positioned inside, near the end of the point.

** Applicable for column series only. **

#### *"insideBase"*

The label is positioned inside, near the base of the bar.

** Applicable for column series. **

#### *"outsideEnd"*

The label is positioned outside, near the end of the bar.

** Applicable for column series only. Not applicable for stacked series. **

#### *"right"*

The label is positioned to the right of the marker.

** Applicable for area and line series. **

#### *"below"*

The label is positioned at the bottom of the marker.

** Applicable for area and line series. **

#### *"left"*

The label is positioned to the left of the marker.

** Applicable for area and line series. **

### series.labels.template `String | Function`

The [template](/api/framework/kendo#methods-template) which renders the chart series label.

The fields which can be used in the template are:

*   category - the category name. Available for area, bar, column, bubble, donut, line and pie series.
*   dataItem - the original data item used to construct the point. Will be null if binding to array.
*   percentage - the point value represented as a percentage value. Available only for 100% stacked charts.
*   series - the data series
*   value - the point value. Can be a number or object containing each bound field.

#### Example

    // chart initialization
    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [
             {
                 type: "area",
                 name: "Series 1",
                 data: [200, 450, 300, 125],
                 labels: {
                     // label template
                     template: "#= value #%",
                     visible: true
                 }
             }
         ],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         }
    });

### series.labels.visible `Boolean|Function`*(default: false)*

 The visibility of the labels.

### series.line `String | Object`

Line options.

** Applicable to area, candlestick and ohlc series. **

### series.line.color `String`

The line color.

### series.line.opacity `Number`*(default: 1)*

The line opacity.

### series.line.width `String`*(default: 4)*

The line width.

### series.line.style `String` *(default: "normal")*

The supported values are:

* "normal" - The values will be connected with straight line.
* "step" - The values will be connected with a line with right angle.
* "smooth" - The values will be connected with a smooth line.

> The default value is "normal".

> The `style` option is supported when [series.type](#configuration-series.type) is set to "area".

### series.lowField `String`

The data field containing the low value.

** Available for candlestick and ohlc series **

### series.markers `Object`

Marker options.

** Applicable for area and line series. **

### series.markers.background `String|Function`

The background color of the current series markers.

### series.markers.border `Object|Function`

The border of the markers.

### series.markers.border.color `String|Function`*(default: "black")*

 The color of the border.

### series.markers.border.width `Number|Function`*(default: 0)*

 The width of the border.

### series.markers.size `Number|Function`*(default: 6)*

 The marker size.

### series.markers.rotation `Number|Function`

The rotation angle of the markers.

#### Example
    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
          type: "line",
          field: "value",
          categoryField: "date",
          markers: {
            type: "square",
            rotation: 45
          },
          data: [
            { value: 1, date: new Date(2012, 1, 1) },
            { value: 2, date: new Date(2012, 1, 2) }
          ]
        }]
    });
    </script>

### series.markers.type `String|Function`*(default: "circle")*

Configures the markers shape type.

#### *"square"*

The marker shape is square.

#### *"triangle"*

The marker shape is triangle.

#### *"circle"*

The marker shape is circle.

#### *"cross"*

The marker shape is cross.

### series.markers.visible `Boolean|Function`*(default: false)*

The markers visibility.

### series.missingValues `String`

The behavior for handling missing values. The supported values are:

* "gap" - the plot stops before the missing point and continues after it.
* "interpolate" - the value is interpolated from neighboring points.
* "zero" - the value is assumed to be zero.

> The default value is "interpolate", except for "area" and stacked series which default to "zero".

> The `missingValues` option is supported when [series.type](#configuration-series.type) is set to "area" and "line".

### series.style `String` *(default: "normal")*

The supported values are:

* "normal" - The values will be connected with straight line.
* "step" - The values will be connected with a line at right.
* "smooth" - The values will be connected with a smooth line.

> The default value is "normal".

> The `style` option is supported when [series.type](#configuration-series.type) is set to "line".

### series.negativeColor `String`

Color to use for bars with negative values.

** Applicable only to column series. **

The plot stops before the missing point and continues after it.

### series.opacity `Number`

The series opacity.

### series.openField `String`

The data field containing the open value.

** Available for candlestick and ohlc series **

### series.overlay `Object`

The effects overlay.

### series.overlay.gradient `String`

The gradient name.

Available options:

* **glass** (column and candlestick series)
* **none**

### series.spacing `Number`*(default: 0.4)*

Space between points as proportion of the point width.

Available for column, candlestick and ohlc series.

### series.stack `Boolean|String|Object` *(default: false)*

A boolean value indicating if the series should be stacked.
A string value is interpreted as [series.stack.group](#configuration-series.stack.group).

> The `stack` options is supported when [series.type](#configuration-series.type) is set to "bar", "column", "line", "area", "verticalLine", "verticalArea", "radarLine", "radarArea" and "radarColumn".

> Stack settings of the first series are applied to the rest of the series.

### series.stack.type `String` *(default: "normal")*

The type of stack to plot. The following types are supported:

* "normal" - the value of the stack is the sum of all points in the category (or group)
* "100%" - the value of the stack is always 100% (1.00). Points within the category (or group) are represented as percentages.

### series.stack.group `String`

Indicates that the series should be stacked in a group with the specified name.

> The `group` option is supported when [series.type](#configuration-series.type) is set to "bar" or "column".

### series.tooltip `Object`

The data point tooltip configuration options.

### series.tooltip.background `String`

The background color of the tooltip. The default is determined from the series color.

### series.tooltip.border `Object`

The border configuration options.

### series.tooltip.border.color `String`*(default: "black")*

The color of the border.

### series.tooltip.border.width `Number`*(default: 0)*

The width of the border.

### series.tooltip.color `String`

The text color of the tooltip. The default is the same as the series labels color.

### series.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

### series.tooltip.format `String`

The tooltip format. Format variables depend on the series type:

* Area, column, line and pie
    *   **0** - value
* Candlestick and OHLC
    *   **0** - open value
    *   **1** - high value
    *   **2** - low value
    *   **3** - close value
    *   **4** - category name

#### Example

    //sets format of the tooltip
    format: "{0:C}--{1:C}"

### series.tooltip.padding `Number|Object`

The padding of the tooltip.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }

### series.tooltip.template `String|Function`

The tooltip template.
Template variables:

*   **value** - the point value (either a number or an object)
*   **category** - the category name
*   **series** - the data series
*   **dataItem** - the original data item used to construct the point.
        Will be null if binding to array.

#### Example

    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [
             {
                 type: "area",
                 name: "Series 1",
                 data: [200, 450, 300, 125],
                 tooltip: {
                     visible: true,
                     template: "#= category # - #= value #"
                 }
             }
         ],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         }
    });

### series.tooltip.visible `Boolean`*(default: false)*

A value indicating if the tooltip should be displayed.

### series.visibleInLegend `Boolean`*(default: true)*

A value indicating whether to show the series name in the legend.

### series.width `Number`

The line width.

** Applicable for area and line series. **

### series.target `Object`

The target of the bullet chart.

### series.target.line `Object`

The target line.

### series.target.line.width `Object|Function`

The width of the line.

### series.target.color `String|Function`

The target color.

### series.target.border `Object|Function`

The border of the target.

### series.target.border.color `String|Function`*(default: "black")*

The color of the border.

### series.target.border.dashType `String|Function`*(default: "solid")*

The dash type of the border.

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### series.target.border.width `Number|Function`*(default: 0)*

The width of the border.

### series.notes `Object`
The series notes configuration.

### series.notes.icon `Object`
The icon of the notes.

### series.notes.position `String`
The position of the series note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

### series.notes.icon.background `String`
The background color of the notes icon.

### series.notes.icon.border `Object`
The border of the icon.

### series.notes.icon.border.color `String`
The border color of the icon.

### series.notes.icon.border.width `Number`
The border width of the icon.


### series.notes.icon.size `Number`
The size of the icon.

### series.notes.icon.type `String` *(default: "circle")*
The icon shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.

### series.notes.icon.visible `Boolean` *(default: "true")*
The icon visibility.

### series.notes.label `Object`
The label of the notes.

### series.notes.label.background `String`
The background color of the label. Accepts a valid CSS color string, including hex and rgb.

### series.notes.label.border `Object`
The border of the label.

### series.notes.label.border.color `String` *(default: "black")*
The color of the border. Accepts a valid CSS color string, including hex and rgb.

### series.notes.label.border.dashType `String` *(default: "solid")*
The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### series.notes.label.border.width `Number` *(default: 0)*
The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

### series.notes.label.color `String`
The text color of the label. Accepts a valid CSS color string, including hex and rgb.

### series.notes.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*
The font style of the label.

### series.notes.label.template `String|Function`
The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the point value

### series.notes.label.visible `Boolean` *(default: true)*
If set to `true` the chart will display the series notes label. By default the series notes label are visible.

### series.notes.label.rotation `Number` *(default: 0)*
The rotation angle of the label. By default the label are not rotated.

### series.notes.label.format `String` *(default: "{0}")*
The format used to display the notes label. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the axis value.

### series.notes.label.position `String` *(default: "inside")*
The position of the labels.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.

### series.notes.line `Object`
The line of the notes.

### series.notes.line.width `Number`
The line width of the notes.

### series.notes.line.color `String`
The line color of the notes.

### series.notes.line.length `Number`
The length of the connecting lines in pixels.

### series.zIndex `Number`
An optional Z-index that can be used to change the default stacking order of series.

The series with the highest Z-index will be placed on top.

Series with no Z-index will use the default stacking order based on series type.
For example line series will be on top with bar and area following below.

### seriesColors `Array`

The default colors for the chart's series. When all colors are used, new colors are pulled from the start again.

### seriesDefaults `Object`

Default values for each series.

### seriesDefaults.area `Object`

The area configuration options.
The default options for all area series. For more details see the series options.

### seriesDefaults.candlestick `Object`

The candlestick configuration options.
The default options for all candlestick series. For more details see the series options.

### seriesDefaults.ohlc `Object`

The ohlc configuration options.
The default options for all ohlc series. For more details see the series options.

### seriesDefaults.border `Object`

The border of the series.

### seriesDefaults.border.color `String`*(default: "black")*

The color of the border.

### seriesDefaults.border.dashType `String`*(default: "solid")*

The dash type of the border.

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### seriesDefaults.border.width `Number`*(default: 0)*

 The width of the border.

### seriesDefaults.column `Object`

The column configuration options.
The default options for all column series. For more details see the series options.

### seriesDefaults.gap `Number`*(default: 1.5)*

 The distance between category clusters.

### seriesDefaults.labels `Object`

Configures the series data labels.

#### Example

    $("#chart").kendoChart({
        seriesDefault: {
            // adjust the default label appearence for all series
            labels: {
                // set the margin on all sides to 1
                margin: 1,
                // format the labels as currency
                format: "C"
            }
        },
        ...
    });

### seriesDefaults.labels.background `String`

The background color of the labels. Any valid CSS color string will work here,
including hex and rgb.

### seriesDefaults.labels.border `Object`

The border of the labels.

### seriesDefaults.labels.border.color `String`*(default: "black")*

 The color of the border.

### seriesDefaults.labels.border.dashType `String`*(default: "solid")*

 The dash type of the border.


#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### seriesDefaults.labels.border.width `Number`*(default: 0)*

 The width of the border.

### seriesDefaults.labels.color `String`

The text color of the labels. Any valid CSS color string will work here, including hex
and rgb.

### seriesDefaults.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.
labels

#### Example

    $("#chart").kendoChart({
        seriesDefault: {
            // adjust the default label appearence for all series
            labels: {
                // set the font size to 14px
                font: "14px Arial,Helvetica,sans-serif"
            }
        },
        ...
    });

### seriesDefaults.labels.format `String`

The format of the labels.

#### Example

    //sets format of the labels
    format: "C"

### seriesDefaults.labels.margin `Number|Object`*(default: 0)*

 The margin of the labels.

#### Example

    $("#chart).kendoChart({
         labels: {
             // sets the top, right, bottom and left margin to 3px.
             margin: 3
         },
         ...
    });
    //
    $("#chart").kendoChart({
         labels: {
             // sets the top and left margin to 1px
             // margin right and bottom are with 0px (by default)
             margin: { top: 1, left: 1 }
         },
         ...
    });

### seriesDefaults.labels.padding `Number|Object`*(default: 0)*

 The padding of the labels.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }

### seriesDefaults.labels.template `String | Function`

The label template.
Template variables:


*   **value** - the point value
*   **category** - the category name
*   **series** - the data series
*   **dataItem** - the original data item used to construct the point.
        Will be null if binding to array.

#### Example

    // chart initialization
    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         seriesDefault: {
             labels: {
                 // label template
                 template: "#= value  #%",
                 visible: true
             }
         },
         series: [
             {
                 name: "Series 1",
                 data: [200, 450, 300, 125]
             }
         ],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         }
    });

### seriesDefaults.labels.visible `Boolean`*(default: false)*

 The visibility of the labels.

#### Example

    $("#chart").kendoChart({
        seriesDefault: {
            labels: {
                // hide all the series labels by default
                visible: true
            },
            ...
        }
    });

### seriesDefaults.line `Object`

The line configuration options.
The default options for all line series. For more details see the series options.

### seriesDefaults.overlay `Object`

The effects overlay.

### seriesDefaults.pie `Object`

The pie configuration options.
The default options for all pie series. For more details see the series options.

### seriesDefaults.spacing `Number`*(default: 0.4)*

 Space between bars.

### seriesDefaults.stack `Boolean|Object` *(default: false)*

A boolean value indicating if the series should be stacked.

> The `stack` options is supported when [series.type](#configuration-series.type) is set to "bar", "column", "line", "area", "verticalLine", "verticalArea", "radarLine", "radarArea" and "radarColumn".

### seriesDefaults.stack.type `String` *(default: "normal")*

The type of stack to plot. The following types are supported:

* "normal" - the value of the stack is the sum of all points in the category (or group)
* "100%" - the value of the stack is always 100% (1.00). Points within the category (or group) are represented as percentages.

### seriesDefaults.type `String`

The default type of the series.

The supported values are:

* area
* column
* line
* candlestick, ohlc
* bullet

### seriesDefaults.tooltip `Object`

The data point tooltip configuration options.

### seriesDefaults.tooltip.background `String`

The background color of the tooltip. The default is determined from the series color.

### seriesDefaults.tooltip.border `Object`

The border configuration options.

### seriesDefaults.tooltip.border.color `String`*(default: "black")*

 The color of the border.

### seriesDefaults.tooltip.border.width `Number`*(default: 0)*

 The width of the border.

### seriesDefaults.tooltip.color `String`

The text color of the tooltip. The default is the same as the series labels color.

### seriesDefaults.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

 The tooltip font.

### seriesDefaults.tooltip.format `String`

The tooltip format.

#### Example

    //sets format of the tooltip
    format: "C"

### seriesDefaults.tooltip.padding `Number|Object`

The padding of the tooltip.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }

### seriesDefaults.tooltip.template `String|Function`

The tooltip template.
Template variables:


*   **value** - the point value
*   **category** - the category name
*   **series** - the data series
*   **dataItem** - the original data item used to construct the point.
        Will be null if binding to array.

#### Example

    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         seriesDefaults: {
             tooltip: {
                 visible: true,
                 template: "#= category # - #= value #"
             }
         },
         series: [
             {
                 name: "Series 1",
                 data: [200, 450, 300, 125]
             }
         ],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         }
    });

### seriesDefaults.tooltip.visible `Boolean`*(default: false)*

 A value indicating if the tooltip should be displayed.

### theme `String`

Sets Chart theme. Available themes: default, blueOpal, black.

### title `Object`, `String`

The chart title configuration options or text.

### title.align `String`*(default: "center")*

 The alignment of the title.

#### *"left"*

The text is aligned to the left.

#### *"center"*

The text is aligned to the middle.

#### *"right"*

The text is aligned to the right.

### title.background `String`*(default: "white")*

 The background color of the title.

### title.border `Object`

The border of the title.

#### Example

    $("#chart").kendoChart({
        // set border options on the title
        title: {
            border: {
                // set the border color to a dark blue
                color: "#336699",
                // set the width of the border to 2 pixels
                width: 2,
                // set the border style to long dashes
                dashType: "longDash"
            }
        },
        ...
    });

### title.border.color `String`*(default: "black")*

 The color of the border.

### title.border.dashType `String`*(default: "solid")*

 The dash type of the border.


#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### title.border.width `Number`*(default: 0)*

 The width of the border.

### title.font `String`*(default: "16px Arial,Helvetica,sans-serif")*

 The font of the title.

### title.color `String`

The text color of the title. Accepts a valid CSS color string, including hex and rgb.

### title.margin `Number | Object`*(default: 5)*

 The margin of the title.

#### Example

    $("#chart").kendoChart({
        // sets the top, right, bottom and left margin to 3px.
        title: {
            margin: 3
        },
        ...
    });
    //
    $("#chart").kendoChart({
        // sets the top and left margin to 1px
        // margin right and bottom are with 5px (by default)
        title: {
            margin: { top: 1, left: 1 }
        },
        ...
    });

### title.padding `Number | Object`*(default: 5)*

 The padding of the title.

#### Example

    $("#chart").kendoChart({
        // sets the top, right, bottom and left padding to 3px.
        title: {
            padding: 3
        },
        ...
    });
    //
    $("#chart").kendoChart({
        // sets the top and left padding to 1px
        // padding right and bottom are with 5px (by default)
        title: {
            padding: { top: 1, left: 1 }
        },
        ...
    });

### title.position `String`*(default: "top")*

 The position of the title.


#### *"top"*

The title is positioned on the top.

#### *"bottom"*

The title is positioned on the bottom.

### title.text `String`

The title of the chart. You can also set the text directly for a title with default options.

#### Example

    $("#chart ").kendoChart({
        title: {
            text: "Sales data"
        },
        ...
    });

    $("#chart ").kendoChart({
        title: "Sales data",
        ...
    });


### title.visible `Boolean`*(default: false)*

 The visibility of the title.

#### Example

    $("#chart ").kendoChart({
        title: {
            // hides the title
            visible: false
        },
        ...
    });

### tooltip `Object`

The data point tooltip configuration options.

### tooltip.background `String`

The background color of the tooltip. The default is determined from the series color.

### tooltip.border `Object`

The border configuration options.

### tooltip.border.color `String`*(default: "black")*

 The color of the border.

### tooltip.border.width `Number`*(default: 0)*

 The width of the border.

### tooltip.color `String`

The text color of the tooltip. The default is the same as the series labels color.

### tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

 The tooltip font.

### tooltip.format `String`

The tooltip format.

#### Example

    //sets format of the tooltip
    format: "C"

### tooltip.padding `Number|Object`

The padding of the tooltip.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }

### tooltip.template `String|Function`

The tooltip template.
Template variables:


*   **value** - the point value
*   **category** - the category name
*   **series** - the data series
*   **dataItem** - the original data item used to construct the point.
        Will be null if binding to array.

#### Example

    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [{
             name: "Series 1",
             data: [200, 450, 300, 125]
         }],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         },
         tooltip: {
             visible: true,
             template: "#= category # - #= value #"
         }
    });

### tooltip.visible `Boolean`*(default: false)*

A value indicating if the tooltip should be displayed.

### tooltip.shared `Boolean`*(default: false)*

A value indicating if the tooltip should be shared.

### tooltip.sharedTemplate `String`

The shared tooltip template.
Template variables:

*   **points** - the category points
*   **category** - the category name

#### Example

    $("#chart").kendoChart({
         title: {
             text: "Internet Users"
         },
         series: [{
             name: "United States",
             data: [67.96, 68.93, 75, 74, 78]
         }, {
             name: "World",
             data: [15.7, 16.7, 20, 23.5, 26.6]
         }],
         categoryAxis: {
             categories: [2005, 2006, 2007, 2008, 2009]
         },
         tooltip: {
             visible: true,
             shared: true,
             sharedTemplate:
                "#= category # </br>" +
                "# for (var i = 0; i < points.length; i++) { #" +
                    "#= points[i].series.name #: #= points[i].value # </br>" +
                "# } #"
         }
    });

### transitions `Boolean`*(default: true)*

A value indicating if transition animations should be played.

### valueAxis `Array`

The value axis configuration options.

### valueAxis.axisCrossingValue `Object | Date | Array`

Value at which the category axis crosses this axis. (Only for object)

Value indicies at which the category axes cross the value axis. (Only for array)

Date at which the category axis crosses this axis. (Only for date)

### valueAxis.background `String`

The background color of the axis.

### valueAxis.color `String`

Color to apply to all axis elements.
Individual color settings for line and labels take priority. Any valid CSS color string will work here, including hex and rgb.

### valueAxis.labels `Object`

Configures the axis labels.

### valueAxis.labels.background `String`

The background color of the labels. Any valid CSS color string will work here, including
hex and rgb

### valueAxis.labels.border `Object`

The border of the labels.

### valueAxis.labels.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including
hex and rgb.

### valueAxis.labels.border.dashType `String`*(default: "solid")*

The dash type of the border.

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### valueAxis.labels.border.width `Number`*(default: 0)*

The width of the border.

### valueAxis.labels.color `String`

The text color of the labels. Any valid CSS color string will work here, including hex and rgb.

### valueAxis.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

### valueAxis.labels.format `String`

The format of the labels.

#### Example

    $("#chart").kendoChart({
        valueAxis: {
           labels: {
               // set the format to currency
               format: "C"
           }
        },
        ...
    });

### valueAxis.labels.margin `Number|Object`*(default: 0)*

The margin of the labels.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 0px (by default)
    margin: { top: 1, left: 1 }

### valueAxis.labels.mirror `Boolean`

Mirrors the axis labels and ticks.
If the labels are normally on the left side of the axis,
mirroring the axis will render them to the right.

### valueAxis.labels.padding `Number | Object`*(default: 0)*

The padding of the labels.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }

### valueAxis.labels.rotation `Number`*(default: 0)*

The rotation angle of the labels.

### valueAxis.labels.skip `Number`*(default: 1)*

Number of labels to skip.
Skips rendering the first n labels.

### valueAxis.labels.step `Number`*(default: 1)*

Label rendering step.
Every n-th label is rendered where n is the step

### valueAxis.labels.template `String | Function`

The label template.
Template variables:

*   **value** - the value

#### Example

    // chart initialization
    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [
             {
                 name: "Series 1",
                 data: [200, 450, 300, 125]
             }
         ],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         },
         valueAxis: {
             labels: {
                 // labels template
                 template: "#= value #%"
             }
         }
    });

### valueAxis.labels.visible `Boolean`*(default: true)*

The visibility of the labels.

### valueAxis.line `Object`

Configures the axis line. This will also affect the major and minor ticks, but not the grid lines.

### valueAxis.line.color `String`*(default: "black")*

The color of the line. This will also effect the major and minor ticks, but
not the grid lines.

### valueAxis.line.dashType `String`*(default: "solid")*

The dash type of the line.

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### valueAxis.line.visible `Boolean`*(default: true)*

The visibility of the line.

### valueAxis.line.width `Number`*(default: 1)*

The width of the line. This will also effect the major and minor ticks, but
not the grid lines.

### valueAxis.majorGridLines `Object`

Configures the major grid lines. These are the lines that are an extension of the major ticks through the
body of the chart.

### valueAxis.majorGridLines.color `String`*(default: "black")*

The color of the lines.

### valueAxis.majorGridLines.visible `Boolean`*(default: true)*

The visibility of the lines.

### valueAxis.majorGridLines.width `Number`*(default: 1)*

The width of the lines.

### valueAxis.majorGridLines.step `Number` *(default: 1)*

The step of the value axis major grid lines.

### valueAxis.majorGridLines.skip `Number` *(default: 0)*

The skip of the value axis major grid lines.

### valueAxis.majorTicks `Object`

The major ticks of the axis.

### valueAxis.majorTicks.size `Number`*(default: 4)*

The axis major tick size. This is the length of the line in pixels that is drawn to indicate the tick on the chart.

### valueAxis.majorTicks.visible `Boolean`*(default: true)*

The visibility of the major ticks.

### valueAxis.majorTicks.color `String` *(default: "black")*

The color of the value axis major ticks lines. Accepts a valid CSS color string, including hex and rgb.

### valueAxis.majorTicks.width `Number` *(default: 1)*

The width of the major ticks in pixels.

### valueAxis.majorTicks.step `Number` *(default: 1)*

The step of the value axis major ticks.

### valueAxis.majorTicks.skip `Number` *(default: 0)*

The skip of the value axis major ticks.

### valueAxis.majorUnit `Number`

The interval between major divisions.

### valueAxis.max `Number`*(default: 1)*

The maximum value of the axis.
This is often used in combination with the **min** configuration option.

### valueAxis.min `Number`*(default: 0)*

The minimum value of the axis.
This is often used in combination with the **max** configuration option.

### valueAxis.minorGridLines `Object`

Configures the minor grid lines.  These are the lines that are an extension of the minor ticks through the

### valueAxis.minorGridLines.color `String`*(default: "black")*

The color of the lines.

Note that this has no effect if the visibility of the minor grid lines is not set to **true**.

### valueAxis.minorGridLines.dashType `String`*(default: "solid")*

The dash type of the minor grid lines.

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.
body of the chart.

Note that minor grid lines are not visible by default, therefore none of these settings will take effect without the minor grid lines visibility being set to **true**.

### valueAxis.minorGridLines.visible `Boolean`*(default: false)*

The visibility of the lines.

### valueAxis.minorGridLines.width `Number`*(default: 1)*

The width of the lines.

Note that this settings has no effect if the visibility of the minor grid lines is not set to **true**.

### valueAxis.minorGridLines.step `Number` *(default: 1)*

The step of the value axis minor grid lines.

### valueAxis.minorGridLines.skip `Number` *(default: 0)*

The skip of the value axis minor grid lines.

### valueAxis.minorTicks `Object`

The minor ticks of the axis.

### valueAxis.minorTicks.size `Number`*(default: 3)*

The axis minor tick size. This is the length of the line in pixels that is drawn to indicate the tick on the chart.

### valueAxis.minorTicks.color `String` *(default: "black")*

The color of the value axis minor ticks lines. Accepts a valid CSS color string, including hex and rgb.

### valueAxis.minorTicks.width `Number` *(default: 1)*

The width of the minor ticks in pixels.

### valueAxis.minorTicks.visible `Boolean`*(default: false)*

The visibility of the minor ticks.

### valueAxis.minorTicks.step `Number` *(default: 1)*

The step of the value axis minor ticks.

### valueAxis.minorTicks.skip `Number` *(default: 0)*

The skip of the value axis minor ticks.

### valueAxis.minorUnit `Number`

The interval between minor divisions.
It defaults to 1/5th of the majorUnit.

### valueAxis.name `Object`*(default: "primary")*

The unique axis name.

### valueAxis.narrowRange `Boolean`*(default: false)*

Prevents the automatic axis range from snapping to 0.

### valueAxis.pane `String`

The name of the pane that the axis should be rendered in.
The axis will be rendered in the first (default) pane if not set.

### valueAxis.plotBands `Array`

The plot bands of the value axis.

### valueAxis.plotBands.from `Number`

The start position of the plot band in axis units.

### valueAxis.plotBands.to `Number`

The end position of the plot band in axis units.

### valueAxis.plotBands.color `String`

The color of the plot band.

### valueAxis.plotBands.opacity `Number`

The opacity of the plot band.

### valueAxis.reverse `Boolean`*(default: false)*

Reverses the axis direction -
values increase from right to left and from top to bottom.

### valueAxis.title `Object`

The title of the value axis.

### valueAxis.title.background `String`

The background color of the title. Any valid CSS color string will work here, including
hex and rgb.

### valueAxis.title.border `Object`

The border of the title.

### valueAxis.title.border.color `String`*(default: "black")*

The color of the border.

### valueAxis.title.border.dashType `String`*(default: "solid")*

The dash type of the border.

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### valueAxis.title.border.width `Number`*(default: 0)*

The width of the border.

### valueAxis.title.color `String`

The text color of the title. Any valid CSS color string will work here, including hex and rgb.

### valueAxis.title.font `String`*(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

### valueAxis.title.margin `Number | Object`*(default: 5)*

The margin of the title.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 0px (by default)
    margin: { top: 1, left: 1 }

### valueAxis.title.padding `Number | Object`*(default: 0)*

The padding of the title.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }

### valueAxis.title.position `String`*(default: "center")*

The position of the title.

#### *"top"*

The axis title is positioned on the top (applicable to vertical axis).

#### *"bottom"*

The axis title is positioned on the bottom (applicable to vertical axis).

#### *"left"*

The axis title is positioned on the left (applicable to horizontal axis).

#### *"right"*

"The axis title is positioned on the right (applicable to horizontal axis).

#### *"center"*

"The axis title is positioned in the center.

### valueAxis.title.rotation `Number`*(default: 0)*

The rotation angle of the title.

### valueAxis.title.text `String`

The text of the title.

### valueAxis.title.visible `Boolean`*(default: true)*

The visibility of the title.

### valueAxis.visible `Boolean`*(default: true)*

The visibility of the axis.

### valueAxis.crosshair `Object`

The crosshair configuration options.

### valueAxis.crosshair.color `String`

The color of the crosshair.

### valueAxis.crosshair.width `Number`

The width of the crosshair.

### valueAxis.crosshair.opacity `Number`

The opacity of the crosshair.

### valueAxis.crosshair.dashType `Number`

The dash type of the crosshair.

### valueAxis.crosshair.visible `Boolean`*(default: false)*

The dash type of the crosshair.

### valueAxis.crosshair.tooltip `Object`

The crosshar tooltip configuration options.

### valueAxis.crosshair.tooltip.background `String`

The background color of the tooltip.

### valueAxis.crosshair.tooltip.border `Object`

The border configuration options.

### valueAxis.crosshair.tooltip.border.color `String`*(default: "black")*

The color of the border.

### valueAxis.crosshair.tooltip.border.width `Number`*(default: 0)*

The width of the border.

### valueAxis.crosshair.tooltip.color `String`

The text color of the tooltip.

### valueAxis.crosshair.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

### valueAxis.crosshair.tooltip.format `String`

The tooltip format.

#### Example

    //sets format of the tooltip
    format: "C"

### valueAxis.crosshair.tooltip.padding `Number|Object`

The padding of the tooltip.

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }

### valueAxis.crosshair.tooltip.template `String|Function`

The tooltip template.
Template variables:

*   **value** - the point value (either a number or an object)

#### Example

    // chart initialization
    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [{
                 name: "Series 1",
                 data: [200, 450, 300, 125]
         }],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         },
         valueAxis: {
             crosshair: {
                 visible: true,
                 tooltip: {
                     visible: true,
                     template: "value: #= value #"
                 }
             }
         }
    });

### valueAxis.crosshair.tooltip.visible `Boolean`*(default: false)*

A value indicating if the tooltip should be displayed.

### valueAxis.notes `Object`

The value axis notes configuration.

### valueAxis.notes.position `String`

The position of the value axis note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

### valueAxis.notes.icon `Object`

The icon of the notes.

### valueAxis.notes.icon.background `String`

The background color of the notes icon.

#### Example - set the value axis notes icon background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          icon: {
            background: "red"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.icon.border `Object`

The border of the icon.

#### Example - set the value axis notes icon border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          icon: {
            border: {
              width: 2,
              color: "red"
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.icon.border.color `String`

The border color of the icon.

#### Example - set the value axis notes icon border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          icon: {
            border: {
              width: 2,
              color: "red"
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.icon.border.width `Number`

The border width of the icon.

#### Example - set the value axis notes icon border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          icon: {
            border: {
              width: 2,
              color: "red"
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.icon.size `Number`

The size of the icon.

#### Example - set the value axis notes icon size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          icon: {
            size: 30
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.icon.type `String` *(default: "circle")*

The icon shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.

#### Example - set the value axis notes icon shape

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          icon: {
            shape: "triangle"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.icon.visible `Boolean` *(default: "true")*

The icon visibility.

#### Example - set the value axis notes icon visibility

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          icon: {
            visible: false
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label `Object`

The label of the notes.

### valueAxis.notes.label.background `String`

The background color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis label background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            background: "red"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.border `Object`

The border of the label.

#### Example - set the value axis label border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            border: {
              color: "green",
              dashType: "dashDot",
              width: 1
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            border: {
              color: "green"
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the value axis label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            border: {
              dashType: "dashDot",
              width: 1
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the value axis label border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            border: {
              width: 1
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.color `String`

The text color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            color: "#aa00bb"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the label.

#### Example - set the chart series label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            font: "20px sans-serif"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the value value

#### Example - set the value axis notes label template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            template: "Year: #: value #"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.visible `Boolean` *(default: true)*

If set to `true` the chart will display the value axis notes label. By default the value axis notes label are visible.

#### Example - hide the value axis notes label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            visible: false
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.rotation `Number` *(default: 0)*

The rotation angle of the label. By default the label are not rotated.

#### Example - rotate the value axis notes label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            rotation: 90
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.format `String` *(default: "{0}")*

The format used to display the notes label. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the axis value.

#### Example - set the value axis notes label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            format: "value slot: {0}"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.position `String` *(default: "inside")*

The position of the labels.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.

### valueAxis.notes.line `Object`

The line of the notes.

### valueAxis.notes.line.width `Number`

The line width of the notes.

#### Example - set the value axis notes line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          line: {
            width: 4
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.line.color `String`

The line color of the notes.

#### Example - set the value axis notes color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          line: {
            color: "#aa00bb"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.line.length `Number`

The length of the connecting lines in pixels.

#### Example - set the value axis notes color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          line: {
            length: 20
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.data `Array`

The items of the notes.

### valueAxis.notes.data.value `Object`

The value of the note.

### valueAxis.notes.data.position `String`

The position of the value axis note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

### valueAxis.notes.data.icon `Object`

The icon of the note.

### valueAxis.notes.data.icon.background `String`

The background color of the note icon.

#### Example - set the value axis note icon background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              background: "red"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.icon.border `Object`

The border of the icon.

#### Example - set the value axis note icon border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              border: {
                width: 2,
                color: "red"
              }
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.icon.border.color `String`

The border color of the icon.

#### Example - set the value axis note icon border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              border: {
                width: 2,
                color: "red"
              }
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.icon.border.width `Number`

The border width of the icon.

#### Example - set the value axis note icon border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              border: {
                width: 2,
                color: "red"
              }
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.icon.size `Number`

The size of the icon.

#### Example - set the value axis note icon size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              size: 30
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.icon.type `String` *(default: "circle")*

The icon shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.

#### Example - set the value axis note icon shape

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              shape: "triangle"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.icon.visible `Boolean` *(default: "true")*

The icon visibility.

#### Example - set the value axis note icon visibility

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              visible: false
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label `Object`

The label of the note.

### valueAxis.notes.data.label.background `String`

The background color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis note label background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notesdata {
          data: [{
            value: 1,
            label: {
              background: "red"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.border `Object`

The border of the label.

#### Example - set the value axis note label border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              border: {
                color: "green",
                dashType: "dashDot",
                width: 1
              }
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis note label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              border: {
                color: "green"
              }
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the value axis note label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              border: {
                dashType: "dashDot",
                width: 1
              }
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the value axis note label border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              border: {
                width: 1
              }
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.color `String`

The text color of the note label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis note label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              color: "#aa00bb"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the note label.

#### Example - set the value axis note label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              font: "20px sans-serif"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the axis value

#### Example - set the value axis note label template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              template: "Year: #: value #"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.visible `Boolean` *(default: true)*

If set to `true` the chart will display the value axis notes label. By default the value axis notes label are visible.

#### Example - hide the value axis note label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              visible: false
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.rotation `Number` *(default: 0)*

The rotation angle of the label. By default the label are not rotated.

#### Example - rotate the value axis note label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              rotation: 90
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.format `String` *(default: "{0}")*

The format used to display the note label. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the axis value.

#### Example - set the value axis note label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              format: "value slot: {0}"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.text `String`

The label note text.

#### Example - set the value axis label note text

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              text: "A"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.position `String` *(default: "inside")*

The position of the value axis note label.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.

### valueAxis.notes.data.line `Object`

The line of the note.

### valueAxis.notes.data.line.width `Number`

The line width of the note.

#### Example - set the value axis note line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            line: {
              width: 4
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.line.color `String`

The line color of the note.

#### Example - set the value axis note color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            line: {
              color: "#aa00bb"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.line.length `Number`

The length of the connecting lines in pixels.

#### Example - set the value axis note color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            line: {
              length: 20
            }
          }]
        }
      }
    });
    </script>

## Methods

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> This method does not remove the widget element from DOM.

### exportImage
Exports the chart as an image.

Inherited from [Chart.exportImage](chart#methods-exportImage)

#### Parameters

##### options `Object` *(optional)*
Parameters for the exported image.

##### options.width `String`
The width of the exported image. Defaults to the chart width.

##### options.height `String`
The height of the exported image. Defaults to the chart height.

#### Returns
`Promise` A promise that will be resolved with a PNG image encoded as a Data URI.


### exportPDF
Exports the chart as a PDF file.

Inherited from [Chart.exportPDF](chart#methods-exportPDF)

#### Parameters

##### options `kendo.drawing.PDFOptions` *(optional)*
Parameters for the exported PDF file.

#### Returns
`Promise` A promise that will be resolved with a PDF file encoded as a Data URI.


### exportSVG
Exports the chart as an SVG document.

Inherited from [Chart.exportSVG](chart#methods-exportSVG)

#### Parameters

##### options `Object` *(optional)*
Export options.

##### options.raw `Boolean` *(default: false)*
Resolves the promise with the raw SVG document without the Data URI prefix.

#### Returns
`Promise` A promise that will be resolved with a SVG document encoded as a Data URI.


### redraw

Repaints the chart using the currently loaded data.

### refresh

Reloads the data and renders the chart.

### resize

Adjusts the chart layout to match the size of the container.

#### Parameters

##### force `Boolean` *optional*

Defines whether the widget should proceed with resizing even if the element dimensions have not changed.

### setDataSource

Sets the data source of the widget.

#### Parameters

##### dataSource `kendo.data.DataSource`

The data source to which the widget should be bound.

### svg

Returns the [SVG](http://www.w3.org/Graphics/SVG/) representation of the chart.
The returned string is a self-contained SVG document that can be used as is or
converted to other formats using tools like [Inkscape](http://inkscape.org/) and
[ImageMagick](http://www.imagemagick.org/).
Both programs provide command-line interface suitable for server-side processing.

> This method is obsoleted by [exportSVG](#methods-exportSVG), but will remain fully functional.

#### Returns
`String` the SVG representation of the chart.

#### Example - get the SVG representation of the chart

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
          type: "line",
          field: "value",
          categoryField: "date",
          data: [
            { value: 1, date: new Date(2012, 1, 1) },
            { value: 2, date: new Date(2012, 1, 2) }
          ]
        }]
    });

    var chart = $("#stock-chart").data("kendoStockChart");
    var svg = chart.svg();
    console.log(svg); // displays the SVG string
    </script>

### imageDataURL

Returns a PNG image of the chart encoded as a [Data URL](https://developer.mozilla.org/en-US/docs/data_URIs).

> This method is deprecated and replaced by [exportImage](#methods-exportImage).

#### Returns

`String` A data URL with `image/png` MIME type. Will be `null` if the browser does not support the `canvas` element.

#### Example - show a snapshot of the Chart

    <div id="stock-chart"></div>
    <a download="export.png" id="export" class="k-button">Export PNG</a>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
          type: "line",
          field: "value",
          categoryField: "date",
          data: [
            { value: 1, date: new Date(2012, 1, 1) },
            { value: 2, date: new Date(2012, 1, 2) }
          ]
        }]
    });

    $("#export").on("click", function() {
      var chart = $("#stock-chart").data("kendoStockChart");
      var imageDataURL = chart.imageDataURL();

      if (navigator.msSaveBlob) {
        var blob = toBlob(imageDataURL, "image/png");
        navigator.msSaveBlob(blob, this.getAttribute("download"));
      } else {
        this.href = imageDataURL;
      }
    });

    // See: http://goo.gl/qlg5dd
    function toBlob(base64, type) {
      var rawData = base64.substring(base64.indexOf("base64,") + 7);
      var data = atob(rawData);
      var arr = new Uint8Array(data.length);

      for (var i = 0; i < data.length; ++i) {
        arr[i] = data.charCodeAt(i);
      }

      return new Blob([ arr.buffer ], { type: type });
    }
    </script>

## Events

### axisLabelClick

Fires when an axis label is clicked.

#### Example

    function onAxisLabelClick(e) {
        alert("Clicked " + e.axis.type + " axis label with value: " + e.value);
    }

#### Event Data

##### e.axis `Object`

The axis that the label belongs to.

##### e.value `Object`

The label value or category name.

##### e.text `Object`

The label text.

##### e.index `Object`

The label sequential index or category index.

##### e.dataItem `Object`

The original data item used to generate the label.
** Applicable only for data bound category axis. **

##### e.element `Object`

The DOM element of the label.

### legendItemClick

Fires when an legend item is clicked, before the selected series visibility is toggled.
Can be cancelled.

#### Example - prevent toggling the series visibility on legend item click
    function onLegendItemClick(e) {
        e.preventDefault();
    }

#### Event Data

##### e.text `String`

The name of the series.

##### e.series `Object`

The series options.

##### e.seriesIndex `Number`

The series index.

##### e.pointIndex `Number`

The point index.

##### e.preventDefault `Function`

If invoked the default action (toggle series visibility) will be prevented.

##### e.element `Object`

The DOM element of the plot area.

### legendItemHover

Fires when an legend item is hovered.

#### Example

    function onLegendItemHover(e) {
        alert("Hovered " + e.text + " series");
    }

#### Event Data

##### e.text `String`

The name of the series.

##### e.series `Object`

The series options.

##### e.seriesIndex `Number`

The series index.

##### e.pointIndex `Number`

The point index.

##### e.element `Object`

The DOM element of the plot area.

### dataBound

Fires when the chart has received data from the data source
and is about to render it.

#### Example

    function onDataBound(e) {
        // Series data is now available
    }

### dragStart

Fires when the user has used the mouse or a swipe gesture to drag the chart.

The drag operation can be aborted by calling `e.preventDefault()`.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the initial range (min and max values) of *named* axes.
The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the drag action.

### drag

Fires as long as the user is dragging the chart using the mouse or swipe gestures.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the suggested current range (min and max values) of *named* axes.
The axis name is used as a key.

Note that the axis ranges are not updated automatically. You need to call
set_options with either the suggested or custom min/max values for them to take effect.

#### Example

    $("#chart").kendoChart({
        valueAxis: {
            name: "price"
        },
        drag: onDrag
        ...
    }

    function onDrag(e) {
        var minPrice = e.axisRanges.price.min;
    }

##### e.originalEvent `Object`

The original user event that triggered the drag action.

### dragEnd

Fires when the user stops dragging the chart.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the final range (min and max values) of *named* axes.
The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the drag action.

### noteClick

Fired when the user clicks one of the notes.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.category `Object`

The data point category. Available only for categorical charts (bar, line, area and similar).

##### e.element `Object`

The DOM element of the plot area.

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

##### e.value `Object`

The data point value.

##### e.series `Object`

The series of the note.

##### e.dataItem `Object`

The data item of the point's note.

### noteHover

Fired when the user hovers one of the notes.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.category `Object`

The data point category. Available only for categorical charts (bar, line, area and similar).

##### e.element `Object`

The DOM element of the plot area.

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

##### e.value `Object`

The data point value.

##### e.series `Object`

The series of the note.

##### e.dataItem `Object`

The data item of the point's note.

### plotAreaClick

Fires when plot area is clicked.

#### Example

    function onPlotAreaClick(e) {
        alert("Clicked X axis value: " + e.x);
    }

#### Event Data

##### e.value `Object`

The data point value.
Available only for categorical charts (bar, line, area and similar).

##### e.category `Object`

The data point category.
Available only for categorical charts (bar, line, area and similar).

##### e.element `Object`

The DOM element of the plot area.

##### e.x `Object`

The X axis value or array of values for multi-axis charts.

##### e.y `Object`

The X axis value or array of values for multi-axis charts.

### render

Fired when the chart is ready to render on screen.

Can be used, for example, to remove loading indicators. Changes to options will be ignored.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

### seriesClick

Fires when chart series are clicked.

#### Example

    function onSeriesClick(e) {
        alert("Clicked value: " + e.value);
    }

#### Event Data

##### e.value `Object`

The data point value.

##### e.category `Object`

The data point category

##### e.series `Object`

The clicked series.

##### e.series.type `String`

The series type

##### e.series.name `String`

The series name

##### e.series.data `Array`

The series data points

##### e.dataItem `Object`

The original data item (when binding to dataSource).

##### e.element `Object`

The DOM element of the data point.

##### e.percentage `Object`

The point value represented as a percentage value. Available only for donut, pie and 100% stacked charts.

### seriesHover

Fires when chart series are hovered.

#### Example

    function onSeriesHover(e) {
        alert("Hovered value: " + e.value);
    }

#### Event Data

##### e.value `Object`

The data point value.

##### e.category `Object`

The data point category

##### e.series `Object`

The clicked series.

##### e.series.type `String`

The series type

##### e.series.name `String`

The series name

##### e.series.data `Array`

The series data points

##### e.dataItem `Object`

The original data item (when binding to dataSource).

##### e.element `Object`

The DOM element of the data point.

##### e.percentage `Object`

The point value represented as a percentage value. Available only for donut, pie and 100% stacked charts.

### zoomStart

Fires when the user has used the mousewheel to zoom the chart.

The zoom operation can be aborted by calling `e.preventDefault()`.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the initial range (min and max values) of *named* axes.
The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the zoom action.

### zoom

Fires as long as the user is zooming the chart using the mousewheel.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the suggested current range (min and max values) of *named* axes.
The axis name is used as a key.

Note that the axis ranges are not updated automatically. You need to call
set_options with either the suggested or custom min/max values for them to take effect.

#### Example

    $("#chart").kendoChart({
        valueAxis: {
            name: "price"
        },
        zoom: onZoom
        ...
    }

    function onZoom(e) {
        var minPrice = e.axisRanges.price.min;
    }

##### e.delta `Number`

A number that indicates the zoom amount and direction.

A negative delta indicates "zoom in", while a positive "zoom out".

##### e.originalEvent `Object`

The original user event that triggered the zoom action.

This event can be used to prevent the default mousewheel action (scroll).

#### Example

    function onZoom(e) {
        // Prevent window scroll
        e.originalEvent.preventDefault();
    }

### zoomEnd

Fires when the user stops zooming the chart.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the final range (min and max values) of *named* axes.
The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the zoom action.

### selectStart

Fires when the user starts modifying the axis selection.

The range units are:

#### *Generic axis*
Category index (0-based)

#### *Date axis*
Date instance

#### Event Data

##### e.axis `Object`

The target axis configuration.

##### e.from `Object`

The lower boundary of the selected range.

##### e.to `Object`

The upper boundary of the selected range.

*Note*: The last selected category is at index [to - 1] unless
the axis is justified. In this case it is at index [to].

### select

Fires when the user modifies the selection.

The range units are:

#### *Generic axis*
Category index (0-based)

#### *Date axis*
Date instance

#### Event Data

##### e.axis `Object`

The target axis configuration.

##### e.from `Object`

The lower boundary of the selected range.

##### e.to `Object`

The upper boundary of the selected range.

*Note*: The last selected category is at index [to - 1] unless
the axis is justified. In this case it is at index [to].

### selectEnd

Fires when the user completes modifying the selection.

#### *Generic axis*
Category index (0-based)

#### *Date axis*
Date instance

#### Event Data

##### e.axis `Object`

The target axis configuration.

##### e.from `Object`

The lower boundary of the selected range.

##### e.to `Object`

The upper boundary of the selected range.

*Note*: The last selected category is at index [to - 1] unless
the axis is justified. In this case it is at index [to].

