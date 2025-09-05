---
title: Sparkline
page_title: Configuration, methods and events of Kendo UI DataViz Sparkline
description: Learn how to configure Kendo UI Javascript sparkline widget in a few easy steps, use and change methods and events.
res_type: api
component: sparkline
---

# kendo.dataviz.ui.Sparkline

## Configuration

### axisDefaults `Object`

Default options for all chart axes.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        axisDefaults: {
            color: "#ff0000",
            visible: true
        }
    });
    </script>

### categoryAxis `Array`

The category axis configuration options.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            categories: ["A", "B", "C", "D", "E"],
            color: "#ff0000",
            visible: true
        }
    });
    </script>

### categoryAxis.axisCrossingValue `Object | Date | Array`

Category index at which the first value axis crosses this axis. (Only for object)

Category indicies at which the value axes cross the category axis. (Only for array)

**Note:**Specify an index greater than or equal to the number
of categories to denote the far end of the axis.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            axisCrossingValue: 2,
            categories: ["A", "B", "C", "D", "E"]
        }
    });
    </script>

### categoryAxis.categories `Array`

Array of category names.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            categories: ["Q1", "Q2", "Q3", "Q4", "Q5"]
        }
    });
    </script>

### categoryAxis.color `String`

Color to apply to all axis elements. Any valid CSS color string will work here, including hex and rgb.
Individual color settings for line and labels take priority.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            color: "#ff0000"
        }
    });
    </script>

### categoryAxis.field `String`

The data field containing the category name.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        dataSource: {
            data: [
                { category: "Q1", value: 1 },
                { category: "Q2", value: 2 },
                { category: "Q3", value: 3 }
            ]
        },
        categoryAxis: {
            field: "category"
        },
        series: [{
            field: "value"
        }]
    });
    </script>

### categoryAxis.justified `Boolean`*(default: false)*

Positions categories and series points on major ticks. This removes the empty space before and after the series.

This option is ignored if either bar or column series are plotted on the axis.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            justified: true
        }
    });
    </script>

### categoryAxis.labels `Object`

Configures the axis labels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                visible: true,
                color: "#ff0000",
                font: "12px Arial"
            }
        }
    });
    </script>

### categoryAxis.labels.background `String`

The background color of the labels. Any valid CSS color string will work here, including hex and rgb.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                background: "#ffe0e0"
            }
        }
    });
    </script>

### categoryAxis.labels.border `Object`

The border of the labels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                border: {
                    color: "#ff0000",
                    width: 2,
                    dashType: "dash"
                }
            }
        }
    });
    </script>

### categoryAxis.labels.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including hex and rgb.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                border: {
                    color: "#00ff00"
                }
            }
        }
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                border: {
                    dashType: "dash"
                }
            }
        }
    });
    </script>

### categoryAxis.labels.border.width `Number`*(default: 0)*

The width of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                border: {
                    width: 2
                }
            }
        }
    });
    </script>

### categoryAxis.labels.color `String`

The text color of the labels. Any valid CSS color string will work here, including hex and rgb.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                color: "#0000ff"
            }
        }
    });
    </script>

### categoryAxis.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                font: "16px Verdana"
            }
        }
    });
    </script>

### categoryAxis.labels.format `String`

The format of the labels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                format: "{0:N2}"
            }
        }
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                mirror: true
            }
        }
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                rotation: 45
            }
        }
    });
    </script>

### categoryAxis.labels.skip `Number`*(default: 1)*

Number of labels to skip.
Skips rendering the first n labels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                skip: 2
            }
        }
    });
    </script>

### categoryAxis.labels.step `Number`*(default: 1)*

Label rendering step.
Every n-th label is rendered where n is the step

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                step: 2
            }
        }
    });
    </script>

### categoryAxis.labels.template `String | Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the category value
* dataItem - the data item, in case a field has been specified. If the category does not have a corresponding item in the data then an empty object will be passed.
* format - the default format of the label
* culture - the default culture (if set) on the label
* index - the 0-based index of the current label
* count - the total number of labels on the axis

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                template: (data) => `Category: ${data.value}`
            }
        }
    });
    </script>

### categoryAxis.labels.visible `Boolean`*(default: true)*

The visibility of the labels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                visible: false
            }
        }
    });
    </script>

### categoryAxis.line `Object`

Configures the axis line. This will also effect major and minor ticks, but not gridlines.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            line: {
                color: "#ff0000",
                width: 2,
                visible: true
            }
        }
    });
    </script>

### categoryAxis.line.color `String`*(default: "black")*

The color of the lines. Any valid CSS color string will work here, including hex and rgb.

**Note:**This will also effect the major and minor ticks, but not the grid lines.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            line: {
                color: "#00ff00"
            }
        }
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            line: {
                dashType: "dash"
            }
        }
    });
    </script>

### categoryAxis.line.visible `Boolean`*(default: true)*

The visibility of the lines.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            line: {
                visible: false
            }
        }
    });
    </script>

### categoryAxis.line.width `Number`*(default: 1)*

The width of the line. This will also effect the major and minor ticks, but
not the grid lines.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            line: {
                width: 3
            }
        }
    });
    </script>

### categoryAxis.majorGridLines `Object`

Configures the major grid lines.
These are the lines that are an extension of the major ticks through the body of the chart.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorGridLines: {
                color: "#ff0000",
                width: 2,
                visible: true
            }
        }
    });
    </script>

### categoryAxis.majorGridLines.color `String`*(default: "black")*

The color of the lines. Any valid CSS color string will work here, including hex and rgb.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorGridLines: {
                color: "#00ff00"
            }
        }
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorGridLines: {
                dashType: "dash"
            }
        }
    });
    </script>

### categoryAxis.majorGridLines.visible `Boolean`*(default: false)*

The visibility of the lines.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorGridLines: {
                visible: true
            }
        }
    });
    </script>

### categoryAxis.majorGridLines.width `Number`*(default: 1)*

The width of the lines.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorGridLines: {
                width: 3
            }
        }
    });
    </script>

### categoryAxis.majorGridLines.step `Number` *(default: 1)*

The step of the category axis major grid lines.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorGridLines: {
                step: 2
            }
        }
    });
    </script>

### categoryAxis.majorGridLines.skip `Number` *(default: 0)*

The skip of the category axis major grid lines.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorGridLines: {
                skip: 1
            }
        }
    });
    </script>

### categoryAxis.majorTicks `Object`

The major ticks of the axis.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorTicks: {
                size: 8,
                color: "#ff0000",
                width: 2,
                visible: true
            }
        }
    });
    </script>

### categoryAxis.majorTicks.size `Number`*(default: 4)*

The axis major tick size. This is the length of the line in pixels that is drawn to indicate the tick
on the chart.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorTicks: {
                size: 10
            }
        }
    });
    </script>

### categoryAxis.majorTicks.visible `Boolean`*(default: true)*

The visibility of the major ticks.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorTicks: {
                visible: false
            }
        }
    });
    </script>

### categoryAxis.majorTicks.color `String` *(default: "black")*

The color of the category axis major ticks lines. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorTicks: {
                color: "#0000ff"
            }
        }
    });
    </script>

### categoryAxis.majorTicks.width `Number` *(default: 1)*

The width of the major ticks in pixels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorTicks: {
                width: 3
            }
        }
    });
    </script>

### categoryAxis.majorTicks.step `Number` *(default: 1)*

The step of the category axis major ticks.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorTicks: {
                step: 2
            }
        }
    });
    </script>

### categoryAxis.majorTicks.skip `Number` *(default: 0)*

The skip of the category axis major ticks.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorTicks: {
                skip: 1
            }
        }
    });
    </script>

### categoryAxis.minorGridLines `Object`

Configures the minor grid lines.  These are the lines that are an extension of the minor ticks through
the body of the chart.

Note that minor grid lines are not visible by default, therefore none of these settings will take effect with the minor grid lines visibility being set to**true**.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorGridLines: {
                color: "#ff0000",
                width: 1,
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorGridLines.color `String`*(default: "black")*

The color of the lines. Any valid CSS color string will work here, including hex and
rgb.

Note that this setting has no effect if the visibility of the minor
grid lines is not set to**true**.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorGridLines: {
                color: "#00ff00",
                visible: true
            }
        }
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorGridLines: {
                dashType: "dash",
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorGridLines.visible `Boolean`*(default: false)*

The visibility of the lines.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorGridLines: {
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorGridLines.width `Number`

The width of the lines.

Note that this setting has no effect if the visibility of the minor
grid lines is not set to**true**.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorGridLines: {
                width: 2,
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorGridLines.step `Number` *(default: 1)*

The step of the category axis minor grid lines.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorGridLines: {
                step: 2,
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorGridLines.skip `Number` *(default: 0)*

The skip of the category axis minor grid lines.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorGridLines: {
                skip: 1,
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorTicks `Object`

The minor ticks of the axis.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorTicks: {
                size: 5,
                color: "#ff0000",
                width: 2,
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorTicks.size `Number`*(default: 3)*

The axis minor tick size. This is the length of the line in pixels that is drawn to indicate the tick
on the chart.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorTicks: {
                size: 6,
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorTicks.visible `Boolean`*(default: false)*

The visibility of the minor ticks.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorTicks: {
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorTicks.color `String` *(default: "black")*

The color of the category axis minor ticks lines. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorTicks: {
                color: "#0000ff",
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorTicks.width `Number` *(default: 1)*

The width of the minor ticks in pixels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorTicks: {
                width: 3,
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorTicks.step `Number` *(default: 1)*

The step of the category axis minor ticks.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorTicks: {
                step: 2,
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorTicks.skip `Number` *(default: 0)*

The skip of the category axis minor ticks.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorTicks: {
                skip: 1,
                visible: true
            }
        }
    });
    </script>

### categoryAxis.name `String`*(default: "primary")*

The unique axis name.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            name: "customCategoryAxis"
        }
    });
    </script>

### categoryAxis.plotBands `Array`

The plot bands of the category axis.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            plotBands: [{
                from: 1,
                to: 3,
                color: "#ff0000",
                opacity: 0.3
            }]
        }
    });
    </script>

### categoryAxis.plotBands.from `Number`

The start position of the plot band in axis units.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            plotBands: [{
                from: 1,
                to: 3,
                color: "#ff0000"
            }]
        }
    });
    </script>

### categoryAxis.plotBands.to `Number`

The end position of the plot band in axis units.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            plotBands: [{
                from: 0,
                to: 2,
                color: "#00ff00"
            }]
        }
    });
    </script>

### categoryAxis.plotBands.color `String`

The color of the plot band.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            plotBands: [{
                from: 1,
                to: 3,
                color: "#0000ff"
            }]
        }
    });
    </script>

### categoryAxis.plotBands.opacity `Number`

The opacity of the plot band.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            plotBands: [{
                from: 1,
                to: 3,
                color: "#ff0000",
                opacity: 0.5
            }]
        }
    });
    </script>

### categoryAxis.reverse `Boolean`*(default: false)*

Reverses the axis direction -
categories are listed from right to left and from top to bottom.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            reverse: true
        }
    });
    </script>

### categoryAxis.title `Object`

The title of the category axis.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Categories",
                color: "#ff0000",
                font: "14px Arial"
            }
        }
    });
    </script>

### categoryAxis.title.background `String`

The background color of the title. Any valid CSS color string will work here, including
hex and rgb.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Categories",
                background: "#ffe0e0"
            }
        }
    });
    </script>

### categoryAxis.title.border `Object`

The border of the title.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Categories",
                border: {
                    color: "#ff0000",
                    width: 2,
                    dashType: "dash"
                }
            }
        }
    });
    </script>

### categoryAxis.title.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including
hex and rgb.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Categories",
                border: {
                    color: "#00ff00"
                }
            }
        }
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Categories",
                border: {
                    dashType: "dash"
                }
            }
        }
    });
    </script>

### categoryAxis.title.border.width `Number`*(default: 0)*

The width of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Categories",
                border: {
                    width: 3
                }
            }
        }
    });
    </script>

### categoryAxis.title.color `String`

The text color of the title. Any valid CSS color string will work here, including hex and rgb.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Categories",
                color: "#0000ff"
            }
        }
    });
    </script>

### categoryAxis.title.font `String`*(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Categories",
                font: "18px Verdana"
            }
        }
    });
    </script>

### categoryAxis.title.margin `Number|Object`*(default: 5)*

The margin of the title.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Categories",
                margin: 10
            }
        }
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Categories",
                position: "left"
            }
        }
    });
    </script>

### categoryAxis.title.rotation `Number`*(default: 0)*

The rotation angle of the title.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Categories",
                rotation: 45
            }
        }
    });
    </script>

### categoryAxis.title.text `String`

The text of the title.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Custom Category Title"
            }
        }
    });
    </script>

### categoryAxis.title.visible `Boolean`*(default: true)*

The visibility of the title.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Categories",
                visible: false
            }
        }
    });
    </script>

### categoryAxis.type `String`*(default: "category")*

The axis type.

#### *"category"*

Discrete category axis.

#### *"date"*

Specialized axis for displaying chronological data.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            type: "date",
            categories: [
                new Date("2023/01/01"),
                new Date("2023/01/02"),
                new Date("2023/01/03")
            ]
        },
        series: [{
            data: [10, 15, 8]
        }]
    });
    </script>

### categoryAxis.autoBaseUnitSteps `Object`

Specifies the discrete**baseUnitStep**values when
either**baseUnit**is set to "fit" or**baseUnitStep**is set to "auto".

The default configuration is as follows:

* `minutes: [1, 2, 5, 15, 30]`
* `hours: [1, 2, 3, 6, 12]`
* `days: [1, 2, 3]`
* `weeks: [1, 2]`
* `months: [1, 2, 3, 6]`
* `years: [1, 2, 3, 5, 10, 25, 50]`

Each setting can be overriden individually.

#### Example

    $("#sparkline").kendoSparkline({
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
        },
        ...
    });

### categoryAxis.baseUnit `String`

The base time interval for the axis.
The default baseUnit is determined automatically from the minimum difference
between subsequent categories. Available options:

* minutes
* hours
* days
* weeks
* months
* years
***fit**

Setting**baseUnit**to "fit" will set such base unit and**baseUnitStep**
that the total number of categories does not exceed**maxDateGroups**.

Series data is aggregated for the specified base unit by using the
**series.aggregate**function.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            type: "date",
            baseUnit: "days",
            categories: [
                new Date("2023/01/01"),
                new Date("2023/01/02"),
                new Date("2023/01/03"),
                new Date("2023/01/04")
            ]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.baseUnitStep `Object`*(default: 1)*

Sets the step (interval) between categories in base units.
Specifiying "auto" will set the step to such value that the total number of categories does not exceed**maxDateGroups**.

This option is ignored if**baseUnit**is set to "fit".

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            type: "date",
            baseUnit: "days",
            baseUnitStep: 2,
            categories: [
                new Date("2023/01/01"),
                new Date("2023/01/03"),
                new Date("2023/01/05"),
                new Date("2023/01/07")
            ]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>


### categoryAxis.labels.culture `String`

Culture to use for formatting the dates. See [Globalization](/framework/globalization/overview) for more information.
It uses the global culture by default.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            type: "date",
            labels: {
                culture: "de-DE"
            },
            categories: [
                new Date("2023/01/01"),
                new Date("2023/02/01"),
                new Date("2023/03/01")
            ]
        },
        series: [{
            data: [10, 15, 8]
        }]
    });
    </script>

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
Setting the labels**format**option will override these defaults.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            type: "date",
            baseUnit: "months",
            labels: {
                dateFormats: {
                    months: "MMM yyyy"
                }
            },
            categories: [
                new Date("2023/01/01"),
                new Date("2023/02/01"),
                new Date("2023/03/01")
            ]
        },
        series: [{
            data: [10, 15, 8]
        }]
    });
    </script>

### categoryAxis.max `Object`

The last date displayed on the axis.
By default, the minimum date is the same as the last category.
This is often used in combination with the**min**and**roundToBaseUnit**configuration options to
set up a fixed date range.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            type: "date",
            max: new Date("2023/03/31"),
            categories: [
                new Date("2023/01/01"),
                new Date("2023/02/01"),
                new Date("2023/03/01")
            ]
        },
        series: [{
            data: [10, 15, 8]
        }]
    });
    </script>

### categoryAxis.min `Object`

The first date displayed on the axis.
By default, the minimum date is the same as the first category.
This is often used in combination with the**max**and**roundToBaseUnit**configuration options to
set up a fixed date range.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            type: "date",
            min: new Date("2022/12/01"),
            categories: [
                new Date("2023/01/01"),
                new Date("2023/02/01"),
                new Date("2023/03/01")
            ]
        },
        series: [{
            data: [10, 15, 8]
        }]
    });
    </script>

### categoryAxis.roundToBaseUnit `Boolean`*(default: true)*

By default, the first and last dates will be rounded off to the nearest base unit.
Specifying**false**for this option will disable this behavior.

This option is most useful in combination with explicit**min**and**max**dates.

It will be ignored if either bar or column series are plotted on the axis.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            type: "date",
            roundToBaseUnit: false,
            min: new Date("2023/01/15"),
            max: new Date("2023/03/15"),
            categories: [
                new Date("2023/01/01"),
                new Date("2023/02/01"),
                new Date("2023/03/01")
            ]
        },
        series: [{
            data: [10, 15, 8]
        }]
    });
    </script>

### categoryAxis.weekStartDay `Number`*(default: kendo.days.Sunday)*

Specifies the week start day when**baseUnit**is set to "weeks".
Use the *kendo.days* constants to specify the day by name.

* kendo.days.Sunday (0)
* kendo.days.Monday (1)
* kendo.days.Tuesday (2)
* kendo.days.Wednesday (3)
* kendo.days.Thursday (4)
* kendo.days.Friday (5)
* kendo.days.Saturday (6)

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            type: "date",
            baseUnit: "weeks",
            weekStartDay: kendo.days.Monday,
            categories: [
                new Date("2023/01/01"),
                new Date("2023/01/08"),
                new Date("2023/01/15")
            ]
        },
        series: [{
            data: [10, 15, 8]
        }]
    });
    </script>


### categoryAxis.maxDateGroups `Number`*(default: 10)*

Specifies the maximum number of groups (categories) to produce when
either**baseUnit**is set to "fit" or**baseUnitStep**is set to "auto".

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            type: "date",
            baseUnit: "fit",
            maxDateGroups: 5,
            categories: [
                new Date("2023/01/01"),
                new Date("2023/01/15"),
                new Date("2023/02/01"),
                new Date("2023/02/15"),
                new Date("2023/03/01"),
                new Date("2023/03/15")
            ]
        },
        series: [{
            data: [10, 15, 8, 12, 6, 9]
        }]
    });
    </script>

### categoryAxis.maxDivisions `Number`

The maximum number of ticks and labels to display. Applicabable for date category axis.

This option is ignored in all other cases.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            type: "date",
            maxDivisions: 3,
            categories: [
                new Date("2023/01/01"),
                new Date("2023/02/01"),
                new Date("2023/03/01"),
                new Date("2023/04/01"),
                new Date("2023/05/01")
            ]
        },
        series: [{
            data: [10, 15, 8, 12, 6]
        }]
    });
    </script>

### categoryAxis.visible `Boolean`*(default: false)*

The visibility of the axis.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            visible: true,
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair `Object`

The crosshair configuration options.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                color: "red",
                width: 2,
                opacity: 0.8,
                dashType: "dash"
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.color `String`

The color of the crosshair.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                color: "blue"
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.width `Number`

The width of the crosshair.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                width: 3
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.opacity `Number`

The opacity of the crosshair.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                opacity: 0.5
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.dashType `Number`

The dash type of the crosshair.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                dashType: "dot"
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.visible `Boolean`*(default: false)*

The dash type of the crosshair.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.tooltip `Object`

The crosshair tooltip configuration options.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    background: "lightblue",
                    color: "darkblue"
                }
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.tooltip.background `String`

The background color of the tooltip.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    background: "yellow"
                }
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.tooltip.border `Object`

The border configuration options.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    border: {
                        color: "red",
                        width: 2
                    }
                }
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.tooltip.border.color `String`*(default: "black")*

The color of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    border: {
                        color: "green"
                    }
                }
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.tooltip.border.width `Number`*(default: 0)*

The width of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    border: {
                        width: 3
                    }
                }
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.tooltip.color `String`

The text color of the tooltip.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    color: "white",
                    background: "black"
                }
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    font: "14px Arial"
                }
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

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

*  **value**- the point value (either a number or an object)

#### Example

    $("#sparkline").kendoSparkline({
         type: "area",
         data: [200, 450, 300, 125],
         categoryAxis: {
             crosshair: {
                 tooltip: {
                     template: "|#= value #|"
                 }
             }
         }
    });

### categoryAxis.crosshair.tooltip.visible `Boolean`*(default: false)*

A value indicating if the tooltip should be displayed.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true
                }
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.notes `Object`

The category axis notes configuration.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            notes: {
                position: "top",
                icon: {
                    background: "red",
                    size: 10
                },
                label: {
                    text: "Important note"
                },
                data: [{
                    value: "Q2",
                    text: "Peak quarter"
                }]
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.notes.position `String`

The position of the category axis note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            notes: {
                position: "bottom",
                data: [{
                    value: "Q2",
                    text: "Bottom note"
                }]
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.notes.icon `Object`

The icon of the notes.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5, 4, 3, 2],
        categoryAxis: {
            notes: {
                data: [{
                    value: "Q2",
                    text: "Q2 Note"
                }],
                icon: {
                    background: "red",
                    type: "circle",
                    size: 15
                }
            }
        }
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5, 4, 3, 2],
        categoryAxis: {
            notes: {
                data: [{
                    value: "Q2",
                    text: "Q2 Label Note"
                }],
                label: {
                    background: "yellow",
                    color: "black",
                    visible: true
                }
            }
        }
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5, 4, 3, 2],
        categoryAxis: {
            notes: {
                data: [{
                    value: "Q2",
                    text: "Q2 Note"
                }],
                label: {
                    position: "outside"
                }
            }
        }
    });
    </script>

### categoryAxis.notes.line `Object`

The line of the notes.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5, 4, 3, 2],
        categoryAxis: {
            notes: {
                data: [{
                    value: "Q2",
                    text: "Q2 Note"
                }],
                line: {
                    width: 3,
                    color: "blue",
                    length: 20
                }
            }
        }
    });
    </script>

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

The line length of the notes.

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5, 4, 3, 2],
        categoryAxis: {
            notes: {
                data: [{
                    value: "Q1",
                    text: "First Quarter"
                }, {
                    value: "Q3", 
                    text: "Third Quarter"
                }]
            }
        }
    });
    </script>

### categoryAxis.notes.data.value `Object`

The value of the note.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5, 4, 3, 2],
        categoryAxis: {
            notes: {
                data: [{
                    value: "Q2",
                    text: "Second Quarter Note"
                }]
            }
        }
    });
    </script>

### categoryAxis.notes.data.position `String`

The position of the category axis note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5, 4, 3, 2],
        categoryAxis: {
            notes: {
                data: [{
                    value: "Q2",
                    text: "Bottom Note",
                    position: "bottom"
                }]
            }
        }
    });
    </script>

### categoryAxis.notes.data.icon `Object`

The icon of the note.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5, 4, 3, 2],
        categoryAxis: {
            notes: {
                data: [{
                    value: "Q2",
                    text: "Custom Icon Note",
                    icon: {
                        background: "green",
                        type: "triangle",
                        size: 20
                    }
                }]
            }
        }
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5, 4, 3, 2],
        categoryAxis: {
            notes: {
                data: [{
                    value: "Q2",
                    text: "Second Quarter",
                    label: {
                        background: "yellow",
                        color: "black",
                        template: "Note: #: value #"
                    }
                }]
            }
        }
    });
    </script>

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
          notesdata: {
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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5, 4, 3, 2],
        categoryAxis: {
            notes: {
                data: [{
                    value: "Q2",
                    text: "Outside Label",
                    label: {
                        position: "outside"
                    }
                }]
            }
        }
    });
    </script>

### categoryAxis.notes.data.line `Object`

The line of the note.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5, 4, 3, 2],
        categoryAxis: {
            notes: {
                data: [{
                    value: "Q2",
                    text: "Custom Line Note",
                    line: {
                        width: 5,
                        color: "red",
                        length: 30
                    }
                }]
            }
        }
    });
    </script>

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

The line length of the note.

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        chartArea: {
            background: "#f0f0f0",
            opacity: 0.8,
            border: {
                color: "#ff0000",
                width: 2
            }
        }
    });
    </script>

### chartArea.background `String`*(default: "white")*

The background color of the chart area.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        chartArea: {
            background: "#ffe0e0"
        }
    });
    </script>

### chartArea.opacity `Number`*(default: 1)*

The background opacity of the chart area.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        chartArea: {
            opacity: 0.5
        }
    });
    </script>

### chartArea.border `Object`

The border of the chart area.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        chartArea: {
            border: {
                color: "#00ff00",
                width: 3,
                dashType: "dash"
            }
        }
    });
    </script>

### chartArea.border.color `String`*(default: "black")*

The color of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        chartArea: {
            border: {
                color: "#0000ff"
            }
        }
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        chartArea: {
            border: {
                dashType: "dash"
            }
        }
    });
    </script>

### chartArea.border.width `Number`*(default: 0)*

The width of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        chartArea: {
            border: {
                width: 3
            }
        }
    });
    </script>

### chartArea.height `Number`*(default: 400)*

The height of the chart area.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        chartArea: {
            height: 300
        }
    });
    </script>

### chartArea.margin `Number|Object`*(default: 2)*

The margin of the chart area.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 5px (by default)
    margin: { top: 1, left: 1 }

### chartArea.width `Number`*(default: 600)*

 The width of the chart area.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        chartArea: {
            width: 500
        }
    });
    </script>

### data `Array`

The data for the default sparkline series.

Will be discarded if series are supplied.

#### Example

    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 5]
    });

    // Same as:
    $("#sparkline").kendoSparkline([1, 2, 3, 5]);

### dataSource `Object`

DataSource configuration or instance.

#### Example

    $("#sparkline").kendoSparkline({
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

    $("#sparkline").kendoSparkline({
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
    $("#sparkline").kendoSparkline({
        dataSource: chartDataSource,
        autoBind: false
    });

    // ...
    chartDataSource.read();

### plotArea `Object`

The plot area configuration options. This is the area containing the plotted series.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        plotArea: {
            background: "lightgray",
            opacity: 0.8,
            border: {
                color: "red",
                width: 2,
                dashType: "dash"
            },
            margin: 10
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### plotArea.background `String`*(default: "white")*

 The background color of the plot area.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        plotArea: {
            background: "lightblue"
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### plotArea.opacity `Number`*(default: 1)*

 The background opacity of the plot area.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        plotArea: {
            background: "red",
            opacity: 0.5
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### plotArea.border `Object`

The border of the plot area.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        plotArea: {
            border: {
                color: "blue",
                width: 3,
                dashType: "dot"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### plotArea.border.color `String`*(default: "black")*

 The color of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        plotArea: {
            border: {
                color: "green",
                width: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### plotArea.border.dashType `String`*(default: "solid")*

 The dash type of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        plotArea: {
            border: {
                dashType: "longDash",
                width: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>


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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        plotArea: {
            border: {
                width: 5,
                color: "orange"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### plotArea.margin `Number|Object`*(default: 5)*

 The margin of the plot area.

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 5px (by default)
    margin: { top: 1, left: 1 }

### pointWidth `Number`*(default: 5)*

The width to allocate for each data point.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        pointWidth: 10,
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### renderAs `String`

Sets the preferred rendering engine.
If it is not supported by the browser, the Sparkline will switch to the first available mode.

The supported values are:

* "svg" - renders the widget as inline SVG document, if available
* "canvas" - renders the widget as a Canvas element, if available.

#### Example - Render as Canvas, if supported

    <span id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        renderAs: "canvas",
        type: "column",
        data: [1, 2, 3, 4]
    });
    </script>

### series `Array`

Array of series definitions.

The series type is determined by the value of the type field.
If a type value is missing, the type is assumed to be the one specified in `seriesDefaults`.

Each series type has a different set of options.

>**Info:**Some options accept function as argument. They will be evaluated for each point (supplied as parameter). The theme/seriesDefaults value will be used if no value is returned.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            type: "line",
            data: [10, 15, 8, 12],
            color: "blue"
        }, {
            type: "column",
            data: [5, 7, 3, 6],
            color: "red"
        }]
    });
    </script>

### series.type `String`*(default: "line")*

The type of the series. Available types:

* area
* column (synonym: bar)
* line
* pie
* bullet

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            type: "area",
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### series.dashType `String`*(default: "solid")*

The series line dash type.

**Applicable only to line series**

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            type: "line",
            dashType: "dash",
            data: [10, 15, 8, 12]
        }]
    });
    </script>

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
* Array of numbers. Available for area, bar, column, pie and line series.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            data: [10, 15, 8, 12, 6, 18]
        }]
    });
    </script>

### series.explodeField `String`

The data field containing a Boolean value that indicates if the sector is exploded.

**Available for pie series**

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            type: "pie",
            explodeField: "exploded",
            data: [
                { value: 10, exploded: false },
                { value: 15, exploded: true },
                { value: 8, exploded: false }
            ]
        }]
    });
    </script>

### series.currentField `String`

The data field containing the current value.

**Available for bullet and verticalBullet series.**

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            type: "bullet",
            currentField: "current",
            data: [
                { current: 10, target: 15 },
                { current: 8, target: 12 }
            ]
        }]
    });
    </script>

### series.targetField `String`

The data field containing the target value.

**Available for bullet and verticalBullet series.**

**Available for pie series**

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            type: "bullet",
            targetField: "target",
            currentField: "current",
            data: [
                { current: 10, target: 15 },
                { current: 8, target: 12 }
            ]
        }]
    });
    </script>

### series.field `String`

The data field containing the series value.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            field: "value",
            data: [
                { value: 10 },
                { value: 15 },
                { value: 8 }
            ]
        }]
    });
    </script>

### series.name `String`

The series name.

The name can also be a [template](/api/framework/kendo#methods-template) which sets the name of the series when bound to grouped data source.

The fields which can be used in the template are:

*   series - the series options
*   group - the data group
*   group.field - the name of the field used for grouping
*   group.value - the field value for this group.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            name: "Sales Data",
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### series.highlight `Object`

Configures the appearance of highlighted points.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            highlight: {
                visible: true,
                color: "yellow",
                opacity: 0.8,
                border: {
                    width: 2,
                    color: "red"
                }
            },
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### series.highlight.border `Object`

The border of highlighted points. The color is computed automatically from the base point color.

**Applicable to pie series.**

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            type: "pie",
            highlight: {
                border: {
                    width: 3,
                    color: "blue",
                    opacity: 0.7
                }
            },
            data: [10, 15, 8]
        }]
    });
    </script>

### series.highlight.border.width `Number`

The width of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            type: "pie",
            highlight: {
                border: {
                    width: 4
                }
            },
            data: [10, 15, 8]
        }]
    });
    </script>

### series.highlight.border.color `String`

The border color.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            type: "pie",
            highlight: {
                border: {
                    color: "orange"
                }
            },
            data: [10, 15, 8]
        }]
    });
    </script>

### series.highlight.border.opacity `Number`

The border opacity.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            type: "pie",
            highlight: {
                border: {
                    opacity: 0.5
                }
            },
            data: [10, 15, 8]
        }]
    });
    </script>

### series.highlight.color `String`

The highlight color.

**Available only for pie series**

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            type: "pie",
            highlight: {
                color: "lightgreen"
            },
            data: [10, 15, 8]
        }]
    });
    </script>

### series.highlight.opacity `Number`

The opacity of the highlighted points.

**Applicable to pie series.**

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "pie",
        series: [{
            data: [10, 15, 8, 12],
            highlight: {
                opacity: 0.5
            }
        }]
    });
    </script>

### series.highlight.visible `Boolean`

A value indicating if the series points should be highlighted.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            highlight: {
                visible: false
            },
            data: [10, 15, 8, 12]
        }]
    });
    </script>

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
* object  - (compound aggregate)**Applicable to "candlestick" and ohlc "series"**. Specifies the aggregate for each data item field.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            type: "date",
            categories: [
                new Date("2023/01/01"),
                new Date("2023/01/01"),
                new Date("2023/01/02"),
                new Date("2023/01/02")
            ]
        },
        series: [{
            aggregate: "avg",
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### series.axis `String`*(default: "primary")*

The name of the value axis to use.

**Applicable to area, bar, column and line series**

#### Example

    <div id="sparkline"></div>
    <script>
     $("#sparkline").kendoSparkline({
        valueAxis: [{ name: "first" }],
        series: [
          {
            type: "column",
            data: [200, 450, 300, 125],
            color: function (point) {
              if (point.value > 300) {
                // Colorize matching points
                return "#f00";
              }

              // Use default theme color
            },
            axis: "first",
          },
        ],
      });
    </script>

### series.border `Object`

The border of the points.

**Applicable to bar, column and pie series**

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12],
            border: {
                color: "blue",
                width: 2,
                dashType: "dash"
            }
        }]
    });
    </script>

### series.border.color `String|Function`

The color of the border.  It defaults to the color of the current series.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12],
            border: {
                color: "red"
            }
        }]
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12],
            border: {
                dashType: "dash",
                width: 2
            }
        }]
    });
    </script>

### series.border.opacity `Number|Function`

The border opacity.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12],
            border: {
                opacity: 0.6,
                width: 3
            }
        }]
    });
    </script>

### series.border.width `Number|Function`*(default: 1)*

The width of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12],
            border: {
                width: 4,
                color: "green"
            }
        }]
    });
    </script>

### series.categoryField `String`

The data field containing the point category name.

**Applicable to pie series.**

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "pie",
        dataSource: [
            { category: "Apples", value: 10 },
            { category: "Oranges", value: 15 },
            { category: "Bananas", value: 8 }
        ],
        series: [{
            categoryField: "category",
            field: "value"
        }]
    });
    </script>

### series.color `String|Function`

The series base color. The supported values are:

* CSS color string, including hex and rgb
* function(point) - user-defined function that will be evaluated for each point. Returning `undefined` will assume the default series color.

#### Example

    $("#sparkline").kendoSparkline({
         series: [{
             type: "column",
             data: [200, 450, 300, 125],
             color: "#ff0000"
         }]
    });
    </script>

#### Example

    <span id="sparkline"></span>
    <script>
    $("#sparkline").kendoSparkline({
         series: [{
             type: "column",
             data: [200, 450, 300, 125],
             color: function(point) {
                if (point.value > 300) {
                    // Colorize matching points
                    return "#f00";
                }

                // Use default theme color
             }
         }]
    });
    </script>

### series.colorField `String`

The data field containing the point color.

**Applicable for bar, column and pie series.**

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        dataSource: [
            { value: 10, color: "red" },
            { value: 15, color: "blue" },
            { value: 8, color: "green" }
        ],
        series: [{
            field: "value",
            colorField: "color"
        }]
    });
    </script>

### series.connectors `Object`

The label connectors options.

**Applicable to pie series.**

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "pie",
        series: [{
            data: [10, 15, 8, 12],
            connectors: {
                color: "red",
                width: 2,
                padding: 8
            }
        }]
    });
    </script>

### series.connectors.color `String`

The color of the connector line.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "pie",
        series: [{
            data: [10, 15, 8, 12],
            connectors: {
                color: "blue"
            }
        }]
    });
    </script>

### series.connectors.padding `Number`*(default: 4)*

The padding between the connector line and the label, and connector line and pie chart.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "pie",
        series: [{
            data: [10, 15, 8, 12],
            connectors: {
                padding: 10
            }
        }]
    });
    </script>

### series.connectors.width `Number`*(default: 1)*

The width of the connector line.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "pie",
        series: [{
            data: [10, 15, 8, 12],
            connectors: {
                width: 3
            }
        }]
    });
    </script>

### series.gap `Number`*(default: 1.5)*

The distance between category clusters.

**Applicable for bar and column series.**

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12],
            gap: 0.5
        }]
    });
    </script>

### series.labels `Object`

Configures the series data labels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                visible: true,
                background: "yellow",
                color: "black"
            }
        }]
    });
    </script>

### series.labels.align `String`*(default: "circle")*

Defines the alignment of the labels.

**Available for pie series.**

#### *"circle"*

The labels are positioned in circle around the chart.

#### *"column"*

The labels are positioned in columns to the left and right of the chart.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "pie",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                align: "column",
                visible: true
            }
        }]
    });
    </script>

### series.labels.background `String|Function`

The background color of the labels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                visible: true,
                background: "lightblue"
            }
        }]
    });
    </script>

### series.labels.border `Object`

The border of the labels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                visible: true,
                border: {
                    color: "red",
                    width: 2,
                    dashType: "dash"
                }
            }
        }]
    });
    </script>

### series.labels.border.color `String|Function`*(default: "black")*

 The color of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                visible: true,
                border: {
                    color: "green"
                }
            }
        }]
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                visible: true,
                border: {
                    dashType: "dot",
                    width: 2
                }
            }
        }]
    });
    </script>

### series.labels.border.width `Number|Function`*(default: 0)*

 The width of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                visible: true,
                border: {
                    width: 3,
                    color: "blue"
                }
            }
        }]
    });
    </script>

### series.labels.color `String|Function`

The text color of the labels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                visible: true,
                color: "red"
            }
        }]
    });
    </script>

### series.labels.distance `Number`*(default: 35)*

The distance of the labels.

**Available for pie series.**

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "pie",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                visible: true,
                distance: 50
            }
        }]
    });
    </script>

### series.labels.font `String|Function`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                visible: true,
                font: "16px Arial"
            }
        }]
    });
    </script>

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

**Applicable for area and line series.**

#### *"center"*

The label is positioned at the point center.

**Applicable for bar, column, pie series.**

#### *"insideEnd"*

The label is positioned inside, near the end of the point.

**Applicable for bar, column, pie series.**

#### *"insideBase"*

The label is positioned inside, near the base of the bar.

**Applicable for bar and column series.**

#### *"outsideEnd"*

The label is positioned outside, near the end of the bar.

**Applicable for bar, column, pie series.
Not applicable for stacked series.**

#### *"right"*

The label is positioned to the right of the marker.

**Applicable for area and line series.**

#### *"below"*

The label is positioned at the bottom of the marker.

**Applicable for area and line series.**

#### *"left"*

The label is positioned to the left of the marker.

**Applicable for area and line series.**

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                visible: true,
                position: "below"
            }
        }]
    });
    </script>

### series.labels.template `String | Function`

The [template](/api/framework/kendo#methods-template) which renders the chart series label.

The fields which can be used in the template are:

*   category - the category name. Available for area, bar, column, bubble, donut, line and pie series.
*   dataItem - the original data item used to construct the point. Will be null if binding to array.
*   percentage - the point value represented as a percentage value. Available only for donut, pie and 100% stacked charts.
*   series - the data series
*   value - the point value. Can be a number or object containing each bound field.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                visible: true,
                template: (data) => `Value: ${data.value}`
            }
        }]
    });
    </script>

### series.labels.visible `Boolean|Function`*(default: false)*

 The visibility of the labels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                visible: true
            }
        }]
    });
    </script>

### series.line `String | Object`

Line options.

**Applicable to area series.**

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "area",
        series: [{
            data: [10, 15, 8, 12],
            line: {
                color: "blue",
                width: 3,
                style: "smooth"
            }
        }]
    });
    </script>

### series.line.color `String`

The line color.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "area",
        series: [{
            data: [10, 15, 8, 12],
            line: {
                color: "red"
            }
        }]
    });
    </script>

### series.line.opacity `Number`*(default: 1)*

The line opacity.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "area",
        series: [{
            data: [10, 15, 8, 12],
            line: {
                opacity: 0.5
            }
        }]
    });
    </script>

### series.line.width `String`*(default: 0.5)*

The line width.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "area",
        series: [{
            data: [10, 15, 8, 12],
            line: {
                width: 4
            }
        }]
    });
    </script>

### series.line.style `String`*(default: "normal")*

The supported values are:

* "normal" - The values will be connected with straight line.
* "step" - The values will be connected with a line with right angle.
* "smooth" - The values will be connected with a smooth line.

> The default value is "normal".

> The `style` option is supported when [series.type](/api/javascript/dataviz/ui/sparkline#configuration-series.type) is set to "area".

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "area",
        series: [{
            data: [10, 15, 8, 12],
            line: {
                style: "smooth"
            }
        }]
    });
    </script>

### series.markers `Object`

Marker options.

**Applicable to area and line series**

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            markers: {
                visible: true,
                background: "blue",
                size: 8,
                type: "circle"
            }
        }]
    });
    </script>

### series.markers.background `String|Function`

The background color of the current series markers.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            markers: {
                visible: true,
                background: "green"
            }
        }]
    });
    </script>

### series.markers.border `Object|Function`

The border of the markers.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            markers: {
                visible: true,
                border: {
                    color: "red",
                    width: 2
                }
            }
        }]
    });
    </script>

### series.markers.border.color `String|Function`*(default: "black")*

 The color of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            markers: {
                visible: true,
                border: {
                    color: "blue"
                }
            }
        }]
    });
    </script>

### series.markers.border.width `Number|Function`*(default: 0)*

 The width of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            markers: {
                visible: true,
                border: {
                    width: 3
                }
            }
        }]
    });
    </script>

### series.markers.size `Number|Function`*(default: 6)*

 The marker size.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            markers: {
                visible: true,
                size: 12
            }
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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            markers: {
                visible: true,
                type: "triangle"
            }
        }]
    });
    </script>

### series.markers.visible `Boolean|Function`*(default: false)*

 The markers visibility.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            markers: {
                visible: true
            }
        }]
    });
    </script>

### series.markers.rotation `Number|Function`

The rotation angle of the markers.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            markers: {
                visible: true,
                type: "triangle",
                rotation: 45
            }
        }]
    });
    </script>

### series.missingValues `String`

The behavior for handling missing values. The supported values are:

* "gap" - the plot stops before the missing point and continues after it.
* "interpolate" - the value is interpolated from neighboring points.
* "zero" - the value is assumed to be zero.

> The default value is "interpolate", except for "area" and stacked series which default to "zero".

> The `missingValues` option is supported when [series.type](/api/javascript/dataviz/ui/sparkline#configuration-series.type) is set to "area", "line", "scatterLine", "radarLine", "radarArea", "polarLine" or "polarArea".

#### Example - set the missing values behavior
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "line",
        missingValues: "gap",
        data: [1, 3, null, 4, 5]
      }]
    });
    </script>

### series.style `String` *(default: "normal")*

The supported values are:

* "normal" - The values will be connected with straight line.
* "step" - The values will be connected with a line with right angle.
* "smooth" - The values will be connected with a smooth line.

> The default value is "normal".

> The `style` option is supported when [series.type](/api/javascript/dataviz/ui/sparkline#configuration-series.type) is set to "line".

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            style: "smooth"
        }]
    });
    </script>

### series.negativeColor `String`

Color to use for bars with negative values.

**Applicable only to bar and column series.**

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, -5, 8, -12],
            negativeColor: "red"
        }]
    });
    </script>

### series.opacity `Number`

The series opacity.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12],
            opacity: 0.7
        }]
    });
    </script>

### series.overlay `Object`

The effects overlay.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12],
            overlay: {
                gradient: "glass"
            }
        }]
    });
    </script>

### series.overlay.gradient `String`

The gradient name.

Available options:

***glass**(bar and column series)
***roundedBevel**(pie series)
***sharpBevel**(pie series)
***none**

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12],
            overlay: {
                gradient: "glass"
            }
        }]
    });
    </script>

### series.padding `Number`

The padding around the chart (equal on all sides).

**Available for pie series.**

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "pie",
        series: [{
            data: [10, 15, 8, 12],
            padding: 20
        }]
    });
    </script>

### series.size `Number`

The size (or radius) of the series in pixels.
If not specified, the available space is split evenly between the series.

**Available for only.**

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "pie",
        series: [{
            data: [10, 15, 8, 12],
            size: 150
        }]
    });
    </script>

### series.startAngle `Number`*(default: 90)*

The start angle of the first segment.

**Available for pie series.**

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "pie",
        series: [{
            data: [10, 15, 8, 12],
            startAngle: 180
        }]
    });
    </script>

### series.spacing `Number`*(default: 0.4)*

Space between points as proportion of the point width.

**Available for bar and column series.**

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12],
            spacing: 0.8
        }]
    });
    </script>

### series.stack `Boolean|String|Object` *(default: false)*

A Boolean value indicating if the series should be stacked.
A string value is interpreted as [series.stack.group](/api/javascript/dataviz/ui/sparkline#configuration-series.stack.group).

> The `stack` options is supported when [series.type](/api/javascript/dataviz/ui/sparkline#configuration-series.type) is set to "bar", "column", "line", "area", "verticalLine", "verticalArea", "radarLine", "radarArea" and "radarColumn".

> Stack settings of the first series are applied to the rest of the series.

#### Example - configure stack series

    <span id="sparkline"></span>
    <script>
    $("#sparkline").kendoSparkline({
      series: [
        { stack: true, data: [ 1, 2 , 3] },
        { data: [ 4, 5 , 6] }
      ]
    });
    </script>

### series.stack.type `String` *(default: "normal")*

The type of stack to plot. The following types are supported:

* "normal" - the value of the stack is the sum of all points in the category (or group)
* "100%" - the value of the stack is always 100% (1.00). Points within the category (or group) are represented as percentages.

#### Example - configure 100% stacked series

    <span id="sparkline"></span>
    <script>
    $("#sparkline").kendoSparkline({
      series: [
        { stack: { type: "100%" }, data: [ 1, 2 ] },
        { data: [ 10, 20 ] }
      ]
    });
    </script>

### series.stack.group `String`

Indicates that the series should be stacked in a group with the specified name.

> The `group` option is supported when [series.type](/api/javascript/dataviz/ui/sparkline#configuration-series.type) is set to "bar" or "column".

#### Example - configure stack groups

    <span id="sparkline"></span>
    <script>
    $("#sparkline").kendoSparkline({
      seriesDefaults: {
        type: "column"
      },
      series: [
        { stack: { group: "a" }, data: [ 1, 2 ] },
        { stack: { group: "a" }, data: [ 3, 4 ] },
        { stack: { group: "b" }, data: [ -1, -2 ] },
        { stack: { group: "b" }, data: [ -3, -4 ] }
      ]
    });
    </script>

### series.tooltip `Object`

The data point tooltip configuration options.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            tooltip: {
                visible: true,
                background: "yellow",
                color: "black"
            }
        }]
    });
    </script>

### series.tooltip.background `String`

The background color of the tooltip. The default is determined from the series color.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            tooltip: {
                visible: true,
                background: "lightblue"
            }
        }]
    });
    </script>

### series.tooltip.border `Object`

The border configuration options.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            tooltip: {
                visible: true,
                border: {
                    color: "red",
                    width: 2
                }
            }
        }]
    });
    </script>

### series.tooltip.border.color `String`*(default: "black")*

The color of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            tooltip: {
                visible: true,
                border: {
                    color: "green"
                }
            }
        }]
    });
    </script>

### series.tooltip.border.width `Number`*(default: 0)*

The width of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            tooltip: {
                visible: true,
                border: {
                    width: 3
                }
            }
        }]
    });
    </script>

### series.tooltip.color `String`

The text color of the tooltip. The default is the same as the series labels color.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            tooltip: {
                visible: true,
                color: "red"
            }
        }]
    });
    </script>

### series.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            tooltip: {
                visible: true,
                font: "16px Arial"
            }
        }]
    });
    </script>

### series.tooltip.format `String`

The tooltip format. Format variables depend on the series type:

* Area, bar, column, line and pie
    *  **0**- value

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

*  **value**- the point value (either a number or an object)
*  **category**- the category name
*  **series**- the data series
*  **dataItem**- the original data item used to construct the point.
        Will be null if binding to array.

#### Example

    $("#sparkline").kendoSparkline({
         series: [{
             type: "area",
             data: [200, 450, 300, 125],
             tooltip: {
                 visible: true,
                 template: "#= value #"
             }
         }]
    });

### series.tooltip.visible `Boolean`*(default: true)*

 A value indicating if the tooltip should be displayed.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            tooltip: {
                visible: false
            }
        }]
    });
    </script>

### series.width `Number`*(default: 0.5)*

The line width.

**Available for line series**

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            width: 3
        }]
    });
    </script>

### series.target `Object`

The target of the bullet chart.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "bullet",
        series: [{
            data: [10, 15, 8, 12],
            target: {
                line: {
                    width: 2
                },
                color: "red"
            }
        }]
    });
    </script>

### series.target.line `Object`

The target line.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "bullet",
        series: [{
            data: [10, 15, 8, 12],
            target: {
                line: {
                    width: 3
                }
            }
        }]
    });
    </script>

### series.target.line.width `Object|Function`

The width of the line.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "bullet",
        series: [{
            data: [10, 15, 8, 12],
            target: {
                line: {
                    width: 4
                }
            }
        }]
    });
    </script>

### series.target.color `String|Function`

The target color.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "bullet",
        series: [{
            data: [10, 15, 8, 12],
            target: {
                color: "green"
            }
        }]
    });
    </script>

### series.target.border `Object|Function`

The border of the target.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "bullet",
        series: [{
            data: [10, 15, 8, 12],
            target: {
                border: {
                    color: "blue",
                    width: 2,
                    dashType: "dash"
                }
            }
        }]
    });
    </script>

### series.target.border.color `String|Function`*(default: "black")*

The color of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "bullet",
        series: [{
            data: [10, 15, 8, 12],
            target: {
                border: {
                    color: "red"
                }
            }
        }]
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "bullet",
        series: [{
            data: [10, 15, 8, 12],
            target: {
                border: {
                    dashType: "dash",
                    color: "red",
                    width: 2
                }
            }
        }]
    });
    </script>

### series.target.border.width `Number`*(default: 0)*

The width of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "bullet",
        series: [{
            data: [10, 15, 8, 12],
            target: {
                border: {
                    width: 3
                }
            }
        }]
    });
    </script>

### series.notes `Object`
The series notes configuration.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                icon: {
                    background: "orange"
                }
            }
        }]
    });
    </script>

### series.notes.icon `Object`
The icon of the notes.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                icon: {
                    background: "red",
                    size: 16,
                    type: "circle",
                    border: {
                        color: "black",
                        width: 1
                    }
                }
            }
        }]
    });
    </script>

### series.notes.position `String`
The position of the series note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                position: "top",
                data: [{
                    value: 15,
                    text: "Peak Value"
                }]
            }
        }]
    });
    </script>

### series.notes.icon.background `String`
The background color of the notes icon.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                icon: {
                    background: "lightblue"
                }
            }
        }]
    });
    </script>

### series.notes.icon.border `Object`
The border of the icon.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                icon: {
                    border: {
                        color: "red",
                        width: 2
                    }
                }
            }
        }]
    });
    </script>

### series.notes.icon.border.color `String`
The border color of the icon.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                icon: {
                    border: {
                        color: "green",
                        width: 2
                    }
                }
            }
        }]
    });
    </script>

### series.notes.icon.border.width `Number`
The border width of the icon.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                icon: {
                    border: {
                        color: "red",
                        width: 3
                    }
                }
            }
        }]
    });
    </script>

### series.notes.icon.size `Number`
The size of the icon.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                icon: {
                    size: 20
                }
            }
        }]
    });
    </script>

### series.notes.icon.type `String` *(default: "circle")*
The icon shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                icon: {
                    type: "square"
                }
            }
        }]
    });
    </script>

### series.notes.icon.visible `Boolean` *(default: "true")*
The icon visibility.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                icon: {
                    visible: false
                }
            }
        }]
    });
    </script>

### series.notes.label `Object`
The label of the notes.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    background: "yellow",
                    color: "black",
                    font: "12px Arial"
                }
            }
        }]
    });
    </script>

### series.notes.label.background `String`
The background color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    background: "lightgreen"
                }
            }
        }]
    });
    </script>

### series.notes.label.border `Object`
The border of the label.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    border: {
                        color: "red",
                        width: 2,
                        dashType: "solid"
                    }
                }
            }
        }]
    });
    </script>

### series.notes.label.border.color `String` *(default: "black")*
The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    border: {
                        color: "blue"
                    }
                }
            }
        }]
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    border: {
                        dashType: "dash",
                        color: "red",
                        width: 2
                    }
                }
            }
        }]
    });
    </script>

### series.notes.label.border.width `Number` *(default: 0)*
The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    border: {
                        width: 3,
                        color: "red"
                    }
                }
            }
        }]
    });
    </script>

### series.notes.label.color `String`
The text color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    color: "blue"
                }
            }
        }]
    });
    </script>

### series.notes.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*
The font style of the label.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    font: "16px Arial, sans-serif"
                }
            }
        }]
    });
    </script>

### series.notes.label.template `String|Function`
The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the point value

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    template: (data) => `Value: ${data.value}`
                }
            }
        }]
    });
    </script>

### series.notes.label.visible `Boolean` *(default: true)*
If set to `true` the chart will display the series notes label. By default the series notes label are visible.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    visible: false
                }
            }
        }]
    });
    </script>

### series.notes.label.rotation `Number` *(default: 0)*
The rotation angle of the label. By default the label are not rotated.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    rotation: 45
                }
            }
        }]
    });
    </script>

### series.notes.label.format `String` *(default: "{0}")*
The format used to display the notes label. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the axis value.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    format: "Value: {0}"
                }
            }
        }]
    });
    </script>

### series.notes.label.position `String` *(default: "inside")*
The position of the labels.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    position: "outside"
                }
            }
        }]
    });
    </script>

### series.notes.line `Object`
The line of the notes.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                line: {
                    width: 3,
                    color: "red",
                    length: 20
                }
            }
        }]
    });
    </script>

### series.notes.line.width `Number`
The line width of the notes.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                line: {
                    width: 4
                }
            }
        }]
    });
    </script>

### series.notes.line.color `String`
The line color of the notes.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                line: {
                    color: "green"
                }
            }
        }]
    });
    </script>

### series.notes.line.length `Number`
The length of the connecting lines in pixels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                line: {
                    length: 30
                }
            }
        }]
    });
    </script>

### series.zIndex `Number`
An optional Z-index that can be used to change the default stacking order of series.

The series with the highest Z-index will be placed on top.

Series with no Z-index will use the default stacking order based on series type.
For example line series will be on top with bar and area following below.

#### Example - Change the series stacking order
    <div id="sparkline"></div>
    <script>
        $("#sparkline").kendoSparkline({
          series: [{
            type: "line",
            zIndex: 1,
            color: "grey",
            data: [1, 2, 1, 1, 2, 1]
          }, {
            type: "line",
            color: "blue",
            zIndex: 3,
            data: [2, 2, 2, 2, 2, 2]
          }, {
            type: "area",
            color: "red",
            zIndex: 2,
            data: [0, 2, 0, 0, 2, 0]
          }]
        });
    </script>

### seriesColors `Array`

The default colors for the chart's series. When all colors are used, new colors are pulled from the start again.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        seriesColors: ["red", "blue", "green", "orange"],
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults `Object`

Default values for each series.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        seriesDefaults: {
            color: "blue",
            line: {
                width: 3
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.area `Object`

The area configuration options.
The default options for all area series. For more details see the series options.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "area",
        seriesDefaults: {
            area: {
                color: "lightblue",
                opacity: 0.7
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.bar `Object`

The default options for all bar series. For more details see the series options.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "bar",
        seriesDefaults: {
            bar: {
                color: "orange",
                border: {
                    width: 1,
                    color: "black"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.border `Object`

The border of the series.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        seriesDefaults: {
            border: {
                color: "red",
                width: 2,
                dashType: "dash"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.border.color `String`*(default: "black")*

The color of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        seriesDefaults: {
            border: {
                color: "green"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        seriesDefaults: {
            border: {
                dashType: "dash",
                color: "red",
                width: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.border.width `Number`*(default: 0)*

 The width of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        seriesDefaults: {
            border: {
                width: 3,
                color: "blue"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.column `Object`

The column configuration options.
The default options for all column series. For more details see the series options.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            column: {
                color: "purple",
                border: {
                    width: 1,
                    color: "black"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.gap `Number`*(default: 1.5)*

 The distance between category clusters.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            gap: 0.5
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.labels `Object`

Configures the series data labels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            labels: {
                visible: true,
                background: "yellow",
                color: "black"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.labels.background `String`

The background color of the labels. Any valid CSS color string will work here,
including hex and rgb.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            labels: {
                visible: true,
                background: "lightblue"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.labels.border `Object`

The border of the labels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            labels: {
                visible: true,
                border: {
                    color: "red",
                    width: 2,
                    dashType: "solid"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.labels.border.color `String`*(default: "black")*

 The color of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            labels: {
                visible: true,
                border: {
                    color: "green"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            labels: {
                visible: true,
                border: {
                    dashType: "dash",
                    color: "red",
                    width: 2
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.labels.border.width `Number`*(default: 0)*

 The width of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            labels: {
                visible: true,
                border: {
                    width: 3,
                    color: "blue"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.labels.color `String`

The text color of the labels. Any valid CSS color string will work here, including hex
and rgb.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            labels: {
                visible: true,
                color: "red"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.
labels

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            labels: {
                visible: true,
                font: "16px Arial, sans-serif"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.labels.format `String`

The format of the labels.

#### Example

    //sets format of the labels
    format: "C"

### seriesDefaults.labels.margin `Number|Object`*(default: 0)*

 The margin of the labels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            labels: {
                visible: true,
                margin: 5
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

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


*  **value**- the point value
*  **category**- the category name
*  **series**- the data series
*  **dataItem**- the original data item used to construct the point.
        Will be null if binding to array.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            labels: {
                visible: true,
                template: (data) => `Value: ${data.value}`
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.labels.visible `Boolean`*(default: false)*

 The visibility of the labels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            labels: {
                visible: true
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.line `Object`

The line configuration options.
The default options for all line series. For more details see the series options.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        seriesDefaults: {
            line: {
                color: "red",
                width: 3,
                style: "smooth"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.overlay `Object`

The effects overlay.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            overlay: {
                gradient: "glass"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.pie `Object`

The pie configuration options.
The default options for all pie series. For more details see the series options.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "pie",
        seriesDefaults: {
            pie: {
                border: {
                    width: 2,
                    color: "black"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.spacing `Number`*(default: 0.4)*

 Space between bars.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            spacing: 0.1
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.stack `Boolean|Object` *(default: false)*

A Boolean value indicating if the series should be stacked.

> The `stack` options is supported when [series.type](/api/javascript/dataviz/ui/sparkline#configuration-series.type) is set to "bar", "column", "line", "area", "verticalLine", "verticalArea", "radarLine", "radarArea" and "radarColumn".

#### Example - configure stack series

    <span id="sparkline"></span>
    <script>
    $("#sparkline").kendoSparkline({
      seriesDefaults: {
        stack: true
      },
      series: [
        { data: [ 1, 2 , 3] },
        { data: [ 4, 5 , 6] }
      ]
    });
    </script>

### seriesDefaults.stack.type `String` *(default: "normal")*

The type of stack to plot. The following types are supported:

* "normal" - the value of the stack is the sum of all points in the category (or group)
* "100%" - the value of the stack is always 100% (1.00). Points within the category (or group) are represented as percentages.

#### Example - configure 100% stacked series

    <span id="sparkline"></span>
    <script>
    $("#sparkline").kendoSparkline({
      seriesDefaults: {
        stack: { type: "100%" }
      },
      series: [
        { data: [ 1, 2 ] },
        { data: [ 10, 20 ] }
      ]
    });
    </script>

### seriesDefaults.type `String`

The type of the series. Available types:

* area
* column (synonym: bar)
* line
* pie
* bullet

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        seriesDefaults: {
            type: "column"
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.tooltip `Object`

The data point tooltip configuration options.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            tooltip: {
                visible: true,
                background: "yellow",
                color: "black"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.tooltip.background `String`

The background color of the tooltip. The default is determined from the series color.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            tooltip: {
                visible: true,
                background: "lightblue"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.tooltip.border `Object`

The border configuration options.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            tooltip: {
                visible: true,
                border: {
                    color: "red",
                    width: 2
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.tooltip.border.color `String`*(default: "black")*

 The color of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            tooltip: {
                visible: true,
                border: {
                    color: "green"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.tooltip.border.width `Number`*(default: 0)*

 The width of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            tooltip: {
                visible: true,
                border: {
                    width: 3,
                    color: "blue"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.tooltip.color `String`

The text color of the tooltip. The default is the same as the series labels color.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            tooltip: {
                visible: true,
                color: "#ff0000"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

 The tooltip font.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            tooltip: {
                visible: true,
                font: "16px Arial, sans-serif"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

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


*  **value**- the point value
*  **category**- the category name
*  **series**- the data series
*  **dataItem**- the original data item used to construct the point.
        Will be null if binding to array.

#### Example

    $("#sparkline").kendoSparkline({
        data: [200, 450, 300, 125],
         seriesDefaults: {
             tooltip: {
                 visible: true,
                 template: "#= value #"
             }
         }
    });

### seriesDefaults.tooltip.visible `Boolean`*(default: false)*

 A value indicating if the tooltip should be displayed.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            tooltip: {
                visible: true
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### theme `String`

The sparkline theme. This can be either a built-in theme or "sass".
When set to "sass" the sparkline will read the variables from the [Sass-based themes]({% slug sassbasedthemes_kendoui %}).

The supported values are:

* "sass" - special value, see notes
* "black"
* "blueopal"
* "bootstrap"
* "default"
* "highcontrast"
* "metro"
* "metroblack"
* "moonlight"
* "silver"
* "uniform"

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        theme: "bootstrap",
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### tooltip `Object`

The data point tooltip configuration options.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        tooltip: {
            visible: true,
            background: "lightblue",
            color: "darkblue",
            font: "14px Arial",
            border: {
                color: "blue",
                width: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### tooltip.background `String`

The background color of the tooltip. The default is determined from the series color.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        tooltip: {
            visible: true,
            background: "yellow"
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### tooltip.border `Object`

The border configuration options.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        tooltip: {
            visible: true,
            border: {
                color: "red",
                width: 3
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### tooltip.border.color `String`*(default: "black")*

 The color of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        tooltip: {
            visible: true,
            border: {
                color: "green"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### tooltip.border.width `Number`*(default: 0)*

 The width of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        tooltip: {
            visible: true,
            border: {
                width: 4
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### tooltip.color `String`

The text color of the tooltip. The default is the same as the series labels color.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        tooltip: {
            visible: true,
            color: "white",
            background: "black"
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

 The tooltip font.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        tooltip: {
            visible: true,
            font: "16px Georgia"
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

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


*  **value**- the point value
*  **category**- the category name
*  **series**- the data series
*  **dataItem**- the original data item used to construct the point.
        Will be null if binding to array.

#### Example

    $("#sparkline").kendoSparkline({
         data: [200, 450, 300, 125],
         tooltip: {
             template: "#= value #"
         }
    });

### tooltip.visible `Boolean`*(default: true)*

A value indicating if the tooltip should be displayed.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        tooltip: {
            visible: true
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### tooltip.shared `Boolean`*(default: false)*

A value indicating if the tooltip should be shared.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        tooltip: {
            visible: true,
            shared: true
        },
        series: [{
            data: [10, 15, 8, 12]
        }, {
            data: [5, 8, 12, 6]
        }]
    });
    </script>

### tooltip.sharedTemplate `String`

The shared tooltip template.
Template variables:

*  **points**- the category points
*  **category**- the category name

#### Example

    <div id="sparkline"></div>

    <script>
    $("#sparkline").kendoSparkline({
      	chartArea: {
          width: 300,
          height: 200
        },
        type: "bar",
      	categoryAxis: {
          categories: [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014]
        },
      	seriesDefaults: {
          data: [
            16, 17, 18, 19, 20, 21, 21, 22, 23, 22
        	],
          name: "value"
        },
        tooltip: {
            shared: true,
    			  sharedTemplate: "#= category # </br>" +
    				"# for (var i = 0; i < points.length; i++) { #" +
    				    "#= points[i].series.name #: #= points[i].value # </br>" +
    				"# } #"
        }
    });
    </script>

### transitions `Boolean`*(default: false)*

A value indicating if transition animations should be played.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        transitions: true,
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### type `String`*(default: "line")*

The default series type.

#### Example

    $("#sparkline").kendoSparkline({
        type: "bar",
        data: [1, 2, 3, 5]
    });

### valueAxis `Array`

The value axis configuration options.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        valueAxis: {
            min: 0,
            max: 20,
            color: "blue",
            labels: {
                visible: true,
                color: "red"
            },
            line: {
                visible: true,
                width: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.axisCrossingValue `Object | Date | Array`

Value at which the category axis crosses this axis. (Only for object)

Value indicies at which the category axes cross the value axis. (Only for array)

Date at which the category axis crosses this axis. (Only for date)

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        valueAxis: {
            axisCrossingValue: 5
        },
        series: [{
            data: [2, 8, 12, 4, 15]
        }]
    });
    </script>

### valueAxis.color `String`

Color to apply to all axis elements.
Individual color settings for line and labels take priority. Any valid CSS color string will work here, including hex and rgb.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        valueAxis: {
            color: "green",
            labels: {
                visible: true
            },
            line: {
                visible: true
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.labels `Object`

Configures the axis labels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        valueAxis: {
            labels: {
                visible: true,
                background: "lightgray",
                color: "blue",
                font: "12px Arial",
                format: "C",
                rotation: 45
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.labels.background `String`

The background color of the labels. Any valid CSS color string will work here, including
hex and rgb

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                background: "yellow"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.labels.border `Object`

The border of the labels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                border: {
                    color: "red",
                    width: 2,
                    dashType: "solid"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.labels.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including
hex and rgb.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                border: {
                    color: "blue"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                border: {
                    width: 2,
                    color: "blue",
                    dashType: "dash"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.labels.border.width `Number`*(default: 0)*

The width of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                border: {
                    width: 3,
                    color: "green"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.labels.color `String`

The text color of the labels. Any valid CSS color string will work here, including hex and rgb.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                color: "#ff6600"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                font: "14px Georgia, serif"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.labels.format `String`

The format of the labels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                format: "{0}%"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                mirror: true
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                rotation: 45
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.labels.skip `Number`*(default: 1)*

Number of labels to skip.
Skips rendering the first n labels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                skip: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25, 18]
        }]
    });
    </script>

### valueAxis.labels.step `Number`*(default: 1)*

Label rendering step.
Every n-th label is rendered where n is the step

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                step: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25, 18]
        }]
    });
    </script>

### valueAxis.labels.template `String | Function`

The label template.
Template variables:

*  **value**- the value

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                template: (data) => `Val: ${data.value}`
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.labels.visible `Boolean`*(default: true)*

The visibility of the labels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: false
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.line `Object`

Configures the axis line. This will also affect the major and minor ticks, but not the grid lines.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            line: {
                color: "blue",
                width: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.line.color `String`*(default: "black")*

The color of the line. This will also effect the major and minor ticks, but
not the grid lines.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            line: {
                color: "#ff0000"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            line: {
                dashType: "dash",
                color: "blue"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.line.visible `Boolean`*(default: true)*

The visibility of the line.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            line: {
                visible: false
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.line.width `Number`*(default: 1)*

The width of the line. This will also effect the major and minor ticks, but
not the grid lines.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            line: {
                width: 3,
                color: "green"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.majorGridLines `Object`

Configures the major grid lines. These are the lines that are an extension of the major ticks through the
body of the chart.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorGridLines: {
                visible: true,
                color: "#dddddd",
                width: 1
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.majorGridLines.color `String`*(default: "black")*

The color of the lines.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorGridLines: {
                visible: true,
                color: "#0000ff"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.majorGridLines.visible `Boolean`*(default: false)*

The visibility of the lines.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorGridLines: {
                visible: true
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.majorGridLines.width `Number`*(default: 1)*

The width of the lines.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorGridLines: {
                visible: true,
                width: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.majorGridLines.step `Number` *(default: 1)*

The step of the value axis major grid lines.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorGridLines: {
                visible: true,
                step: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25]
        }]
    });
    </script>

### valueAxis.majorGridLines.skip `Number` *(default: 0)*

The skip of the value axis major grid lines.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorGridLines: {
                visible: true,
                skip: 1
            }
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25]
        }]
    });
    </script>

### valueAxis.majorTicks `Object`

The major ticks of the axis.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorTicks: {
                visible: true,
                size: 6,
                color: "blue"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.majorTicks.size `Number`*(default: 4)*

The axis major tick size. This is the length of the line in pixels that is drawn to indicate the tick on the chart.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorTicks: {
                visible: true,
                size: 8
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.majorTicks.visible `Boolean`*(default: true)*

The visibility of the major ticks.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorTicks: {
                visible: false
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.majorTicks.color `String` *(default: "black")*

The color of the value axis major ticks lines. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorTicks: {
                visible: true,
                color: "#ff0000"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.majorTicks.width `Number` *(default: 1)*

The width of the major ticks in pixels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorTicks: {
                visible: true,
                width: 3
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.majorTicks.step `Number` *(default: 1)*

The step of the value axis major ticks.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorTicks: {
                visible: true,
                step: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25]
        }]
    });
    </script>

### valueAxis.majorTicks.skip `Number` *(default: 0)*

The skip of the value axis major ticks.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorTicks: {
                visible: true,
                skip: 1
            }
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25]
        }]
    });
    </script>

### valueAxis.majorUnit `Number`

The interval between major divisions.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorUnit: 5
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25]
        }]
    });
    </script>

### valueAxis.max `Number`*(default: 1)*

The maximum value of the axis.
This is often used in combination with the**min**configuration option.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            max: 30
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25]
        }]
    });
    </script>

### valueAxis.min `Number`*(default: 0)*

The minimum value of the axis.
This is often used in combination with the**max**configuration option.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            min: 5
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25]
        }]
    });
    </script>

### valueAxis.minorGridLines `Object`

Configures the minor grid lines.  These are the lines that are an extension of the minor ticks through the

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorGridLines: {
                visible: true,
                color: "#eeeeee",
                width: 1
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.minorGridLines.color `String`*(default: "black")*

The color of the lines.

Note that this has no effect if the visibility of the minor grid lines is not set to**true**.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorGridLines: {
                visible: true,
                color: "#cccccc"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorGridLines: {
                visible: true,
                dashType: "dot",
                color: "#aaaaaa"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

body of the chart.

Note that minor grid lines are not visible by default, therefore none of these settings will take effect without the minor grid lines visibility being set to**true**.

### valueAxis.minorGridLines.visible `Boolean`*(default: false)*

The visibility of the lines.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorGridLines: {
                visible: true
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.minorGridLines.width `Number`*(default: 1)*

The width of the lines.

Note that this settings has no effect if the visibility of the minor grid lines is not set to**true**.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorGridLines: {
                visible: true,
                width: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.minorGridLines.step `Number` *(default: 1)*

The step of the value axis minor grid lines.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorGridLines: {
                visible: true,
                step: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25]
        }]
    });
    </script>

### valueAxis.minorGridLines.skip `Number` *(default: 0)*

The skip of the value axis minor grid lines.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorGridLines: {
                visible: true,
                skip: 1
            }
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25]
        }]
    });
    </script>

### valueAxis.minorTicks `Object`

The minor ticks of the axis.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorTicks: {
                visible: true,
                size: 5,
                color: "green"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.minorTicks.size `Number`*(default: 3)*

The axis minor tick size. This is the length of the line in pixels that is drawn to indicate the tick on the chart.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorTicks: {
                visible: true,
                size: 6
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.minorTicks.color `String` *(default: "black")*

The color of the value axis minor ticks lines. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorTicks: {
                visible: true,
                color: "#ff0000"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.minorTicks.width `Number` *(default: 1)*

The width of the minor ticks in pixels.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorTicks: {
                visible: true,
                width: 3
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.minorTicks.visible `Boolean`*(default: false)*

The visibility of the minor ticks.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorTicks: {
                visible: true
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.minorTicks.step `Number` *(default: 1)*

The step of the value axis minor ticks.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorTicks: {
                visible: true,
                step: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25]
        }]
    });
    </script>

### valueAxis.minorTicks.skip `Number` *(default: 0)*

The skip of the value axis minor ticks.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorTicks: {
                visible: true,
                skip: 1
            }
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25]
        }]
    });
    </script>

### valueAxis.minorUnit `Number`

The interval between minor divisions.
It defaults to 1/5th of the majorUnit.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorUnit: 2
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25]
        }]
    });
    </script>

### valueAxis.name `Object`*(default: "primary")*

The unique axis name.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            name: "customAxis"
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.narrowRange `Boolean`*(default: true)*

Prevents the automatic axis range from snapping to 0.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            narrowRange: false
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.plotBands `Array`

The plot bands of the value axis.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            plotBands: [{
                from: 10,
                to: 20,
                color: "#ffcccc",
                opacity: 0.5
            }]
        },
        series: [{
            data: [5, 15, 8, 25, 12]
        }]
    });
    </script>

### valueAxis.plotBands.from `Number`

The start position of the plot band in axis units.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            plotBands: [{
                from: 5,
                to: 15,
                color: "#ccffcc"
            }]
        },
        series: [{
            data: [5, 15, 8, 25, 12]
        }]
    });
    </script>

### valueAxis.plotBands.to `Number`

The end position of the plot band in axis units.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            plotBands: [{
                from: 10,
                to: 20,
                color: "#ffcccc"
            }]
        },
        series: [{
            data: [5, 15, 8, 25, 12]
        }]
    });
    </script>

### valueAxis.plotBands.color `String`

The color of the plot band.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            plotBands: [{
                from: 10,
                to: 20,
                color: "#0000ff"
            }]
        },
        series: [{
            data: [5, 15, 8, 25, 12]
        }]
    });
    </script>

### valueAxis.plotBands.opacity `Number`

The opacity of the plot band.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            plotBands: [{
                from: 10,
                to: 20,
                color: "#ff0000",
                opacity: 0.3
            }]
        },
        series: [{
            data: [5, 15, 8, 25, 12]
        }]
    });
    </script>

### valueAxis.reverse `Boolean`*(default: false)*

Reverses the axis direction -
values increase from right to left and from top to bottom.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            reverse: true
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.title `Object`

The title of the value axis.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            title: {
                text: "Values",
                color: "blue",
                font: "14px Arial"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.title.background `String`

The background color of the title. Any valid CSS color string will work here, including
hex and rgb.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            title: {
                text: "Values",
                background: "#f0f0f0"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.title.border `Object`

The border of the title.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            title: {
                text: "Values",
                border: {
                    color: "blue",
                    width: 2,
                    dashType: "solid"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.title.border.color `String`*(default: "black")*

The color of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            title: {
                text: "Values",
                border: {
                    color: "#ff0000",
                    width: 1
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            title: {
                text: "Values",
                border: {
                    color: "blue",
                    width: 2,
                    dashType: "dash"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.title.border.width `Number`*(default: 0)*

The width of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            title: {
                text: "Values",
                border: {
                    color: "green",
                    width: 3
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.title.color `String`

The text color of the title. Any valid CSS color string will work here, including hex and rgb.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            title: {
                text: "Values",
                color: "#ff6600"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.title.font `String`*(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            title: {
                text: "Values",
                font: "18px Georgia, serif"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            title: {
                text: "Values",
                position: "top"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.title.rotation `Number`*(default: 0)*

The rotation angle of the title.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            title: {
                text: "Values",
                rotation: 90
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.title.text `String`

The text of the title.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            title: {
                text: "Custom Title"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.title.visible `Boolean`*(default: true)*

The visibility of the title.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            title: {
                text: "Values",
                visible: false
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.visible `Boolean`*(default: false)*

The visibility of the axis.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            visible: true
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair `Object`

The crosshair configuration options.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                color: "red",
                width: 2,
                opacity: 0.8
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.color `String`

The color of the crosshair.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                color: "#0000ff"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.width `Number`

The width of the crosshair.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                width: 3
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.opacity `Number`

The opacity of the crosshair.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                opacity: 0.5
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.dashType `Number`

The dash type of the crosshair.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                dashType: "dash"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.visible `Boolean`*(default: true)*

The dash type of the crosshair.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: false
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.tooltip `Object`

The crosshair tooltip configuration options.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    background: "#ffffff",
                    color: "#000000"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.tooltip.background `String`

The background color of the tooltip.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    background: "#f0f0f0"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.tooltip.border `Object`

The border configuration options.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    border: {
                        color: "blue",
                        width: 2
                    }
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.tooltip.border.color `String`*(default: "black")*

The color of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    border: {
                        color: "#ff0000"
                    }
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.tooltip.border.width `Number`*(default: 0)*

The width of the border.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    border: {
                        width: 2,
                        color: "blue"
                    }
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.tooltip.color `String`

The text color of the tooltip.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    color: "#0000ff"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    font: "14px Georgia, serif"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

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

*  **value**- the point value (either a number or an object)

#### Example

    // chart initialization
    $("#sparkline").kendoSparkline({
         data: [200, 450, 300, 125],
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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.notes `Object`

The value axis notes configuration.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            notes: {
                position: "left",
                icon: {
                    background: "red"
                },
                data: [{
                    value: 15,
                    text: "Target"
                }]
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.notes.position `String`

The position of the value axis note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            notes: {
                position: "top",
                data: [{
                    value: 15,
                    text: "Peak"
                }]
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.notes.icon `Object`

The icon of the notes.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [10, 15, 8, 12, 18, 6, 14],
        valueAxis: {
            notes: {
                icon: {
                    background: "lightblue",
                    border: {
                        color: "blue",
                        width: 2
                    }
                },
                data: [{ value: 12 }]
            }
        }
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            notes: {
                data: [{
                    value: 15,
                    text: "Target"
                }],
                label: {
                    background: "#ffff00",
                    color: "#000000",
                    position: "outside"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            notes: {
                data: [{
                    value: 15,
                    text: "Target"
                }],
                label: {
                    position: "outside"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.notes.line `Object`

The line of the notes.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            notes: {
                data: [{
                    value: 15,
                    text: "Target"
                }],
                line: {
                    width: 3,
                    color: "blue"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

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

The line length of the notes.

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [10, 15, 8, 12, 18, 6, 14],
        valueAxis: {
            notes: {
                data: [
                    { value: 8, icon: { background: "red" } },
                    { value: 18, icon: { background: "green" } },
                    { value: 6, icon: { background: "orange" } }
                ]
            }
        }
    });
    </script>

### valueAxis.notes.data.value `Object`

The value of the note.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [10, 15, 8, 12, 18, 6, 14],
        valueAxis: {
            notes: {
                data: [
                    { value: 12 },
                    { value: 15 },
                    { value: 8 }
                ]
            }
        }
    });
    </script>

### valueAxis.notes.data.position `String`

The position of the value axis note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            notes: {
                data: [{
                    value: 15,
                    text: "Target",
                    position: "left"
                }]
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.notes.data.icon `Object`

The icon of the note.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            notes: {
                data: [{
                    value: 15,
                    text: "Target",
                    icon: {
                        background: "red",
                        size: 20,
                        type: "circle"
                    }
                }]
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            notes: {
                data: [{
                    value: 15,
                    text: "Target",
                    label: {
                        background: "#ffff00",
                        color: "#000000",
                        position: "outside"
                    }
                }]
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

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
        notesdata: {
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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            notes: {
                data: [{
                    value: 15,
                    text: "Target",
                    label: {
                        position: "outside"
                    }
                }]
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.notes.data.line `Object`

The line of the note.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            notes: {
                data: [{
                    value: 15,
                    text: "Target",
                    line: {
                        width: 3,
                        color: "red"
                    }
                }]
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

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

The line length of the note.

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

Prepares the Sparkline for safe removal from the DOM.

Detaches event handlers and removes data entries in order to avoid memory leaks.

#### Example

    <div id="sparkline"></div>
    <script>
    var sparkline = $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12]
        }]
    }).data("kendoSparkline");
    
    sparkline.destroy();
    </script>

### exportImage
Exports the chart as an image.

Inherited from [Chart.exportImage](/api/javascript/dataviz/ui/chart/methods/exportimage)

#### Example

    <div id="sparkline"></div>
    <script>
    var sparkline = $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12]
        }]
    }).data("kendoSparkline");
    
    sparkline.exportImage().then(function(dataURI) {
        // Display the exported image or save it
        console.log(dataURI);
    });
    </script>

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

Inherited from [Chart.exportPDF](/api/javascript/dataviz/ui/chart/methods/exportpdf)

#### Example

    <div id="sparkline"></div>
    <script>
    var sparkline = $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12]
        }]
    }).data("kendoSparkline");
    
    sparkline.exportPDF().then(function(dataURI) {
        // Download or display the PDF
        kendo.saveAs({
            dataURI: dataURI,
            fileName: "sparkline.pdf"
        });
    });
    </script>

#### Parameters

##### options `kendo.drawing.PDFOptions` *(optional)*
Parameters for the exported PDF file.

#### Returns
`Promise` A promise that will be resolved with a PDF file encoded as a Data URI.


### exportSVG
Exports the chart as an SVG document.

Inherited from [Chart.exportSVG](/api/javascript/dataviz/ui/chart/methods/exportsvg)

#### Example

    <div id="sparkline"></div>
    <script>
    var sparkline = $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12]
        }]
    }).data("kendoSparkline");
    
    sparkline.exportSVG().then(function(dataURI) {
        // Display or save the SVG
        console.log(dataURI);
    });
    </script>

#### Parameters

##### options `Object` *(optional)*
Export options.

##### options.raw `Boolean` *(default: false)*
Resolves the promise with the raw SVG document without the Data URI prefix.

#### Returns
`Promise` A promise that will be resolved with a SVG document encoded as a Data URI.


### refresh

Reloads the data and repaints the chart.

#### Example

    <div id="sparkline"></div>
    <script>
    var sparkline = $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12]
        }]
    }).data("kendoSparkline");
    
    // Update data and refresh
    sparkline.options.series[0].data = [20, 25, 18, 22];
    sparkline.refresh();
    </script>

### setDataSource

Sets the dataSource of an existing Chart and rebinds it.

#### Example

    <div id="sparkline"></div>
    <script>
    var sparkline = $("#sparkline").kendoSparkline({
        type: "column"
    }).data("kendoSparkline");
    
    var dataSource = new kendo.data.DataSource({
        data: [
            { value: 10 },
            { value: 15 },
            { value: 8 },
            { value: 12 }
        ]
    });
    
    sparkline.setDataSource(dataSource);
    </script>

#### Parameters

##### dataSource `kendo.data.DataSource`

### setOptions

Sets the widget options. Changes are cumulative.

#### Parameters

##### options `Object`

The chart settings to update.

#### Example - change the chart theme
    <span id="sparkline"></span>
    <script>
    $("#sparkline").kendoSparkline({
      theme: "black",
      data: [1, 2, 3]
    });

    var sparkline = $("#sparkline").data("kendoSparkline");
    sparkline.setOptions({ theme: "uniform" });
    </script>

### svg

Returns the [SVG](https://www.w3.org/Graphics/SVG/) representation of the chart.
The returned string is a self-contained SVG document that can be used as is or
converted to other formats using tools like [Inkscape](https://inkscape.org/en) and
[ImageMagick](https://www.imagemagick.org/).
Both programs provide command-line interface suitable for server-side processing.

> This method is obsoleted by [exportSVG](/api/javascript/dataviz/ui/sparkline/methods/exportsvg), but will remain fully functional.

#### Returns

`String` the SVG representation of the sparkline.

#### Example

    <span id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        data: [1, 2, 3, 4]
    });
    var sparkline = $("#sparkline").data("kendoSparkline");
    var svg = sparkline.svg();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(svg); // displays the SVG string
    </script>

### imageDataURL

Returns a PNG image of the sparkline encoded as a [Data URL](https://developer.mozilla.org/en-US/docs/data_URIs).

> This method is deprecated and replaced by [exportImage](/api/javascript/dataviz/ui/sparkline/methods/exportimage).

#### Returns

`String` A data URL with `image/png` MIME type. Will be `null` if the browser does not support the `canvas` element.

#### Example - show a snapshot of the Sparkline

    <span id="sparkline"></div>
    <a download="export.png" id="export" class="k-button">Export PNG</a>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        data: [1, 2, 3, 4]
    });

    $("#export").on("click", function() {
      var sparkline = $("#sparkline").data("kendoSparkline");
      var imageDataURL = sparkline.imageDataURL();

      if (navigator.msSaveBlob) {
        var blob = toBlob(imageDataURL, "image/png");
        navigator.msSaveBlob(blob, this.getAttribute("download"));
      } else {
        this.href = imageDataURL;
      }
    });

    // See: https://goo.gl/qlg5dd
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
**Applicable only for data bound category axis.**

##### e.element `Object`

The DOM element of the label.

### dataBound

Fires when the sparkline has received data from the data source
and is about to render it.

#### Example

    function onDataBound(e) {
        // Series data is now available
    }

### dragStart

Fires when the user has used the mouse or a swipe gesture to drag the sparkline.

The drag operation can be aborted by calling `e.preventDefault()`.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12, 18, 5]
        }],
        dragStart: function(e) {
            console.log("Drag started");
            // Optionally prevent drag: e.preventDefault();
        }
    });
    </script>

#### Event Data

##### e.axisRanges `Object`

A hastable containing the initial range (min and max values) of *named* axes.
The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the drag action.

### drag

Fires as long as the user is dragging the sparkline using the mouse or swipe gestures.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the suggested current range (min and max values) of *named* axes.
The axis name is used as a key.

Note that the axis ranges are not updated automatically. You need to call
set_options with either the suggested or custom min/max values for them to take effect.

#### Example

    $("#sparkline").kendoSparkline({
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

Fires when the user stops dragging the sparkline.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12, 18, 5]
        }],
        dragEnd: function(e) {
            console.log("Drag ended");
            console.log("Final axis ranges:", e.axisRanges);
        }
    });
    </script>

#### Event Data

##### e.axisRanges `Object`

A hastable containing the final range (min and max values) of *named* axes.
The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the drag action.

### paneRender

Fires when a pane is rendered because the chart is rendered, or the chart performs panning or zooming, or because the chart is exported with different options. The event can be used to render custom visuals in the panes.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12]
        }],
        paneRender: function(e) {
            console.log("Pane rendered:", e.name);
        }
    });
    </script>

#### Event Data

##### pane `kendo.dataviz.ChartPane`

The chart pane that was rendered.

##### name `String`

The pane name.

##### index `Number`

The pane index.

##### e.sender `kendo.dataviz.ui.Sparkline`

The widget instance which fired the event.

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

### plotAreaHover

Fired when the user hovers the plot area.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12]
        }],
        plotAreaHover: function(e) {
            console.log("Plot area hovered at category:", e.category);
        }
    });
    </script>

#### Event Data

##### e.category `Object`

The data point category.

##### e.element `Object`

The DOM element of the plot area.

##### e.originalEvent `Object`

The original browser event that triggered the hover action.

##### e.sender `kendo.dataviz.ui.Sparkline`

The widget instance which fired the event.

##### e.value `Object`

The data point value.

### plotAreaLeave

Fired when the cursor leaves the plotArea.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12]
        }],
        plotAreaLeave: function(e) {
            console.log("Left plot area");
        }
    });
    </script>

#### Event Data

##### e.sender `kendo.dataviz.ui.Sparkline`

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

Fires when chart series are hovered. The data that is available when the event is fired is listed below.

#### Example

    <h4>Climate control history</h4>
    <span id="hum-log"></span>
    <script>
      function createSparklines() {
        $("#hum-log").kendoSparkline({
          type: "area",
          data: [
            71, 70, 69, 68, 65, 60, 55, 55, 50, 52,
            73, 72, 72, 71, 68, 63, 57, 58, 53, 55,
            63, 59, 61, 64, 58, 53, 48, 48, 45, 45,
            63, 64, 63, 67, 58, 56, 53, 59, 51, 54
          ],
          tooltip: {
            format: "{0} %"
          },
          seriesHover: onSeriesHover
        });
      }

      function onSeriesHover(e) {
        console.log("Hovered value: " + e.value);
      }

      $(document).ready(createSparklines);
    </script>

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

### seriesOver

Fired when the cursor is over the chart series.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12]
        }],
        seriesOver: function(e) {
            console.log("Series over:", e.value, "at category:", e.category);
        }
    });
    </script>

#### Event Data

##### e.category `Object`

The data point category

##### e.dataItem `Object`

The original data item (when binding to dataSource).

##### e.element `Object`

The DOM element of the data point.

##### e.originalEvent `Object`

The original browser event that triggered the hover action.

##### e.percentage `Object`

The point value represented as a percentage value. Available only for donut, pie and 100% stacked charts.

##### e.sender `kendo.dataviz.ui.Sparkline`

The widget instance which fired the event.

##### e.series `Object`

The clicked series.

##### e.series.type `String`

The series type

##### e.series.name `String`

The series name

##### e.series.data `Array`

The series data points

##### e.stackValue `Object`

The cumulative point value on the stack. Available only for stackable series.

##### e.value `Object`

The data point value.

### seriesLeave

Fired when the cursor leaves a chart series.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12]
        }],
        seriesLeave: function(e) {
            console.log("Left series:", e.value, "at category:", e.category);
        }
    });
    </script>

#### Event Data

##### e.category `Object`

The data point category

##### e.dataItem `Object`

The original data item (when binding to dataSource).

##### e.element `Object`

The DOM element of the data point.

##### e.originalEvent `Object`

The original browser event that triggered the hover action.

##### e.percentage `Object`

The point value represented as a percentage value. Available only for donut, pie and 100% stacked charts.

##### e.sender `kendo.dataviz.ui.Sparkline`

The widget instance which fired the event.

##### e.series `Object`

The clicked series.

##### e.series.type `String`

The series type

##### e.series.name `String`

The series name

##### e.series.data `Array`

The series data points

##### e.stackValue `Object`

The cumulative point value on the stack. Available only for stackable series.

##### e.value `Object`

The data point value.

### zoomStart

Fires when the user has used the mousewheel to zoom the chart.

The zoom operation can be aborted by calling `e.preventDefault()`.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12, 18, 5, 22, 14]
        }],
        zoomStart: function(e) {
            console.log("Zoom started");
            // Optionally prevent zoom: e.preventDefault();
        }
    });
    </script>

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

    $("#sparkline").kendoSparkline({
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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12, 18, 5, 22, 14]
        }],
        zoomEnd: function(e) {
            console.log("Zoom ended");
            console.log("Final axis ranges:", e.axisRanges);
        }
    });
    </script>

#### Event Data

##### e.axisRanges `Object`

A hastable containing the final range (min and max values) of *named* axes.
The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the zoom action.
