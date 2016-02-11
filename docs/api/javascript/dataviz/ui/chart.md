---
title: Chart
page_title: Configuration, methods and events of Kendo UI DataViz Chart
description: Learn how to configure Kendo UI Javascript chart widget in a few easy steps, use and change methods and events.
---

# kendo.dataviz.ui.Chart

## Configuration

### autoBind `Boolean` *(default: true)*

If set to `false` the widget will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/javascript/data/datasource#events-change) event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source doesn't make more than one request to the remote service.

#### Example - disable automatic binding

    <div id="chart"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/stockdata",
          dataType: "jsonp"
        }
      }
    });
    $("#chart").kendoChart({
      autoBind: false,
      dataSource: dataSource,
      series: [
        { field: "Volume" }
      ]
    });
    dataSource.read(); // "read()" will fire the "change" event of the dataSource and the widget will be bound
    </script>

### axisDefaults `Object`

The default options for all chart axes. Accepts the options supported by [categoryAxis](#configuration-categoryAxis), [valueAxis](#configuration-valueAxis), [xAxis](#configuration-xAxis) and [yAxis](#configuration-yAxis).

#### Example - set the default axis options

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      axisDefaults: {
        categories: [ "2012", "2013"]
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis `Array|Object`

The category axis configuration options.

#### Example - configure the category axis

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        categories: ["2012", "2013"],
        color: "#ff0000"
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.autoBaseUnitSteps `Object`

The discrete [categoryAxis.baseUnitStep](#configuration-categoryAxis.baseUnitStep) values when
either [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "fit" or
[categoryAxis.baseUnitStep](#configuration-categoryAxis.baseUnitStep) is set to "auto".

The axis will try to divide the active period into successively larger intervals.
It will start from x-second intervals, where x is picked from the autoBaseUnitSteps.seconds array.
Then it will move to minutes, seconds and so on.
This will continue until the number of intervals is less than
[maxDateGroups](#configuration-categoryAxis.maxDateGroups).

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

### categoryAxis.autoBaseUnitSteps.seconds `Array` *(default: [1, 2, 5, 15, 30])*

The seconds unit steps.

### categoryAxis.autoBaseUnitSteps.minutes `Array` *(default: [1, 2, 5, 15, 30])*

The minutes unit steps.

### categoryAxis.autoBaseUnitSteps.hours `Array` *(default: [1, 2, 3])*

The hours unit steps.

### categoryAxis.autoBaseUnitSteps.days `Array` *(default: [1, 2, 3])*

The days unit steps.

### categoryAxis.autoBaseUnitSteps.weeks `Array` *(default: [1, 2])*

The weeks unit steps.

### categoryAxis.autoBaseUnitSteps.months `Array` *(default: [1, 2, 3, 6])*

The months unit steps.

### categoryAxis.autoBaseUnitSteps.years `Array` *(default: [1, 2, 3, 5, 10, 25, 50])*

The years unit steps.

#### Example

### categoryAxis.axisCrossingValue `Object|Date|Array`

Category index at which the first value axis crosses this axis (when set as an object).

Category indices at which the value axes cross the category axis (when set as an array).

> set an index greater than or equal to the number of categories to denote the far end of the axis.

#### Example - set the category axis crossing values

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        axisCrossingValue: [0, 10]
      },
      valueAxis: [{}, {}],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.background `String`

The background color of the axis.

#### Example - set the category axis crossing values

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        background: "#ff0000"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.baseUnit `String`

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

### categoryAxis.baseUnitStep `Object` *(default: 1)*

The step (interval) between categories in base units. Setting it to "auto" will set the step to such value
that the total number of categories does not exceed [categoryAxis.maxDateGroups](#configuration-categoryAxis.maxDateGroups).

This option is ignored if [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "fit".

### categoryAxis.categories `Array`

The category names. The chart will create a category for every item of the array.

#### Example - set the categories

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"]
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.color `String`

The color to apply to all axis elements. Accepts a valid CSS color string, including hex and rgb. Can be overridden by [categoryAxis.labels.color](#configuration-categoryAxis.labels.color) and
[categoryAxis.line.color](#configuration-categoryAxis.line.color).

#### Example - set the category axis color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        color: "#aa00bb"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        color: "rgb(128, 0, 255)"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        color: "green"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair `Object`

The crosshair configuration options.

> The crosshair is displayed when the [categoryAxis.crosshair.visible](#configuration-categoryAxis.crosshair.visible) option is set to `true`.

#### Example - set the category axis crosshair options

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          color: "green",
          width: 2,
          visible: true
        }
      },
      series: [{
        type: "line",
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.crosshair.color `String`

The color of the crosshair. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis crosshair color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          color: "green",
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.dashType `string` *(default: "solid")*

The dash type of the crosshair.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the category crosshair line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          dashType: "dashDot",
          visible: true
        }
      },
      series: [{
        type: "line",
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.crosshair.opacity `Number` *(default: 1)*

The opacity of the crosshair. By default the crosshair is opaque.

#### Example - set the category axis crosshair opacity

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          opacity: 0.1,
          visible: true
        }
      },
      series: [{
        type: "line",
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.crosshair.tooltip `Object`

The crosshar tooltip options.

> The crosshair tooltip is displayed when the [categoryAxis.crosshair.tooltip.visible](#configuration-categoryAxis.crosshair.tooltip.visible) option is set to `true`.

#### Example - configure the category axis crosshair tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          tooltip: {
            background: "green",
            border: {
              color: "black",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        {
          type: "line",
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.background `String`

The background color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis crosshair tooltip background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          tooltip: {
            background: "green",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.border `Object`

The border options.

#### Example - set the category axis crosshair tooltip border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          tooltip: {
            border: {
              color: "black",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis crosshair tooltip border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          tooltip: {
            border: {
              color: "black",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the category axis crosshair tooltip border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          tooltip: {
            border: {
              dashType: "dashDot",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the category axis crosshair tooltip border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          tooltip: {
            border: {
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.color `String`

The text color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis crosshair tooltip color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          tooltip: {
            color: "#aa00bb",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis crosshair tooltip color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          tooltip: {
            color: "rgb(128, 0, 255)",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis crosshair tooltip color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          tooltip: {
            color: "green",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

#### Example - set the category axis crosshair tooltip font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          tooltip: {
            font: "20px sans-serif",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.format `String` *(default: "{0}")*

The format used to display the tooltip. Uses [kendo.format](/api/javascript/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

#### Example - set the category axis crosshair tooltip format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          tooltip: {
            format: "Year: {0}",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.padding `Number|Object` *(default: 0)*

The padding of the crosshair tooltip. A numeric value will set all paddings.

#### Example - set the category axis crosshair tooltip padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        crosshair: {
          tooltip: {
            padding: 20,
            visible: true
          },
          visible: true
        }
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.padding.bottom `Number` *(default: 0)*

The bottom padding of the crosshair tooltip.

#### Example - set the category axis crosshair tooltip bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              bottom: 20
            },
            visible: true
          },
          visible: true
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.padding.left `Number` *(default: 0)*

The left padding of the crosshair tooltip.

#### Example - set the category axis crosshair tooltip left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              left: 20
            },
            visible: true
          },
          visible: true
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.padding.right `Number` *(default: 0)*

The right padding of the crosshair tooltip.

#### Example - set the category axis crosshair tooltip right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              right: 20
            },
            visible: true
          },
          visible: true
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.padding.top `Number` *(default: 0)*

The top padding of the crosshair tooltip.

#### Example - set the category axis crosshair tooltip top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              top: 20
            },
            visible: true
          },
          visible: true
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the tooltip.

The fields which can be used in the template are:

* value - the category value

#### Example - set the category axis crosshair tooltip template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        crosshair: {
          tooltip: {
            template: "Year: #: value #",
            visible: true
          },
          visible: true
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis crosshair tooltip template as a function

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        crosshair: {
          tooltip: {
            template: kendo.template("Year: #: value #"),
            visible: true
          },
          visible: true
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.tooltip.visible `Boolean` *(default: false)*

If set to `true` the chart will display the category axis crosshair tooltip. By default the category axis crosshair tooltip is not visible.

#### Example - show the category axis crosshair tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          tooltip: {
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.visible `Boolean` *(default: false)*

If set to `true` the chart will display the category axis crosshair. By default the category axis crosshair is not visible.

#### Example - show the category axis crosshair

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.crosshair.width `Number` *(default: 1)*

The width of the crosshair in pixels.

#### Example - set the category axis crosshair width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        crosshair: {
          width: 2,
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.field `String`

The data item field which contains the category name. Requires the [dataSource](#configuration-dataSource) option to be set.

#### Example - set the category axis field

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        field: "year"
      },
      series: [
        { field: "value" }
      ],
      dataSource: [
        { year: "2012", value: 1 },
        { year: "2013", value: 2 }
      ]
    });
    </script>

### categoryAxis.justified `Boolean`

If set to `true` the chart will position categories and series points on major ticks. This removes the empty space before and after the series.

The default value is `false` except for "area" and "verticalArea".

> This option is ignored if the [series.type](#configuration-series.type) option is set to "bar", "column", "boxPlot", "ohlc", "candlestick" or "waterfall".

#### Example - justify categories and series

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        justified: true,
        categories: ["2012", "2013"]
      }],
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels `Object`

The axis labels configuration.

#### Example - configure the category axis labels
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          background: "green",
          color: "white"
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.background `String`

The background color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis label background as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        labels: {
          background: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis label background as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        labels: {
          background: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis label background by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        labels: {
          background: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.border `Object`

The border of the labels.

#### Example - set the category axis label border
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          border: {
            color: "green",
            dashType: "dashDot",
            width: 1
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          border: {
            color: "green",
            width: 1
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.border.dashType `String` *(default: "solid")*

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
      categoryAxis: [{
        labels: {
          border: {
            dashType: "dashDot",
            width: 1
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the category axis label border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          border: {
            width: 1
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.color `String`

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        labels: {
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis label color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        labels: {
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis label color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        labels: {
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.labels.culture `String`

The culture to use when formatting date values. See the [globalization overview](/framework/globalization/overview) for more information.

### categoryAxis.labels.dateFormats `Object`

The format used to display labels for [date category axis](#configuration-categoryAxis.type).
The `{0}` placeholder represents the category value.

The chart will choose the appropriate format for the current [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit).
Setting the [categoryAxis.labels.format](#configuration-categoryAxis.labels.format) option will override the date formats.

See also: [kendo.format](/api/javascript/kendo#methods-format).

> Not supported for radar charts. Use [categoryAxis.labels.format](#configuration-categoryAxis.labels.format) instead.

#### Example - set category axis date formats

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [
            new Date("2012/01/01"),
            new Date("2012/01/02")
        ],
        type: "date",
        labels: {
          dateFormats: {
            days:"M-d"
          }
        }
      },
      series: [{
        data: [1,2,3]
      }]
    });
    </script>

### categoryAxis.labels.dateFormats.days `String` *(default: "M/d")*

The format used when [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "days".

#### Example - set the days format
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [
            new Date("2012/01/01"),
            new Date("2012/01/02")
        ],
        type: "date",
        baseUnit: "days",
        labels: {
          dateFormats: {
            days: "M-d"
          }
        }
      },
      series: [{
        data: [1,2,3]
      }]
    });
    </script>

### categoryAxis.labels.dateFormats.hours `String` *(default: "HH:mm")*

The format used when [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "hours".

#### Example - set the hours format
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [
            new Date("2012/01/01"),
            new Date("2012/01/02"),
            new Date("2012/01/03")
        ],
        type: "date",
        baseUnit: "hours",
        labels: {
          dateFormats: {
            hours: "HH mm"
          }
        }
      },
      series: [{
        data: [1,2,3]
      }]
    });
    </script>

### categoryAxis.labels.dateFormats.months `String` *(default: "MMM 'yy")*

The format used when [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "months".

#### Example - set the months format
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [
            new Date("2012/01/01"),
            new Date("2012/01/02"),
            new Date("2012/01/03")
        ],
        type: "date",
        baseUnit: "months",
        labels: {
          dateFormats: {
            months: "MMM-yy"
          }
        }
      },
      series: [{
        data: [1,2,3]
      }]
    });
    </script>

### categoryAxis.labels.dateFormats.weeks `String` *(default: "M/d")*

The format used when [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "weeks".

#### Example - set the weeks format
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [
            new Date("2012/01/01"),
            new Date("2012/01/02"),
            new Date("2012/01/03")
        ],
        type: "date",
        baseUnit: "weeks",
        labels: {
          dateFormats: {
            weeks: "M-d"
          }
        }
      },
      series: [{
        data: [1,2,3]
      }]
    });
    </script>

### categoryAxis.labels.dateFormats.years `String` *(default: "yyyy")*

The format used when [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "years".

#### Example - set the years format
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [
            new Date("2012/01/01"),
            new Date("2012/01/02"),
            new Date("2012/01/03")
        ],
        type: "date",
        baseUnit: "years",
        labels: {
          dateFormats: {
            years: "yy"
          }
        }
      },
      series: [{
        data: [1,2,3]
      }]
    });
    </script>

### categoryAxis.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example - set the category axis label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
           font: "20px sans-serif",
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.labels.format `String` *(default: "{0}")*

The format used to display the labels. Uses [kendo.format](/api/javascript/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

#### Example - set the category axis label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          format: "Year: {0}"
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.labels.margin `Number|Object` *(default: 0)*

The margin of the labels. A numeric value will set all margins.

#### Example - set the category axis label margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          margin: 20
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.labels.margin.bottom `Number` *(default: 0)*

The bottom margin of the labels.

#### Example - set the category axis label bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          margin: {
            bottom: 20
          }
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.labels.margin.left `Number` *(default: 0)*

The left margin of the labels.

#### Example - set the category axis label left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          margin: {
            left: 20
          }
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.labels.margin.right `Number` *(default: 0)*

The right margin of the labels.

#### Example - set the category axis label right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          margin: {
            right: 20
          }
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.labels.margin.top `Number` *(default: 0)*

The top margin of the labels.

#### Example - set the category axis label top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          margin: {
            top: 20
          }
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.labels.mirror `Boolean` *(default: false)*

If set to `true` the chart will mirror the axis labels and ticks. If the labels are normally on the left side of the axis, mirroring the axis will render them to the right.

#### Example - mirror the category axis labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          mirror: true
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.labels.padding `Object|Number` *(default: 0)*

The padding of the labels. A numeric value will set all paddings.

#### Example - set the category axis label padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          padding: 20
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.labels.padding.bottom `Number` *(default: 0)*

The bottom padding of the labels.

#### Example - set the category axis label bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          padding: {
            bottom: 20
          }
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.labels.padding.left `Number` *(default: 0)*

The left padding of the labels.

#### Example - set the category axis label left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          padding: {
            left: 20
          }
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.labels.padding.right `Number` *(default: 0)*

The right padding of the labels.

#### Example - set the category axis label right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          padding: {
            right: 20
          }
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.labels.padding.top `Number` *(default: 0)*

The top padding of the labels.

#### Example - set the category axis label top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          padding: {
            top: 20
          }
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.labels.rotation `Number|String|Object` *(default: 0)*

The rotation angle of the labels. By default the labels are not rotated. Can be set to `"auto"` if the axis is horizontal in which case the labels will be rotated only if the slot size is not sufficient for the entire labels.

#### Example - rotate the category axis labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          rotation: 90
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

#### Example - enable auto rotation for the category axis labels

    <div id="chart" style="width:200px;"></div>
    <script>
      $("#chart").kendoChart({
        categoryAxis: [{
          labels: {
            rotation: "auto"
          },
          categories: ["Category A", "Category B", "Category C"]
        }],
        series: [{
          data: [1, 2, 3]
        }]
      });
    </script>

### categoryAxis.labels.rotation.align `String` *(default: "end")*

The alignment of the rotated labels relative to the slot center. The supported values are `"end"` and `"center"`. By default the closest end of the label will be aligned to the center. If set to `"center"`, the center of the rotated label will be aligned instead.

#### Example - align the rotated category axis labels center

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        categoryAxis: [{
          labels: {
            rotation: {
              angle: 45,
              align: "center"
            }
          },
          categories: ["Category A", "Category B", "Category C"]
        }],
        series: [{
          data: [1, 2, 3]
        }]
      });
    </script>

### categoryAxis.labels.rotation.angle `Number|String` *(default: 0)*

The rotation angle of the labels. By default the labels are not rotated. Can be set to `"auto"` if the axis is horizontal in which case the labels will be rotated only if the slot size is not sufficient for the entire labels.

#### Example - rotate the category axis labels

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        categoryAxis: [{
          labels: {
            rotation: {
              angle: 90
            }
          },
          categories: ["2011", "2012", "2013"]
        }],
        series: [{
          data: [1, 2, 3]
        }]
      });
    </script>

### categoryAxis.labels.skip `Number` *(default: 0)*

The number of labels to skip. By default no labels are skipped.

#### Example - skip category axis labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          skip: 1
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.labels.step `Number` *(default: 1)*

The label rendering step - render every n-th label. By default every label is rendered.

#### Example - render every odd category axis label
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          step: 2
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.labels.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the category value
* dataItem - the data item, in case a field has been specified. If the category does not have a corresponding item in the data then an empty object will be passed.
* format - the default format of the label
* culture - the default culture (if set) on the label

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example - set the category axis template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          template: "Year: #: value #"
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

#### Example - set the category axis template as a function

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          template: kendo.template("Year: #: value #")
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.labels.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis labels. By default the category axis labels are visible.

#### Example - hide the category axis labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        labels: {
          visible: false
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.labels.visual `Function`

A function that can be used to create a custom visual for the labels. The available argument fields are:

* createVisual - a function that can be used to get the default visual.
* culture - the default culture (if set) on the label
* dataItem - the data item, in case a field has been specified
* format - the default format of the label
* options - the label options.
* rect - the `kendo.geometry.Rect` that defines where the visual should be rendered.
* sender - the chart instance (may be undefined).
* text - the label text.
* value - the category value

#### Example - using custom visual for the labels

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        categoryAxis: {
          categories: ["foo bar"],
          labels: {
            visual: function(e) {
              var rect = new kendo.geometry.Rect(e.rect.origin, [e.rect.size.width, 100]);
              var layout = new kendo.drawing.Layout(rect, {
                orientation: "vertical",
                alignContent: "center"
              });
              var words = e.text.split(" ");
              for (var i = 0; i < words.length; i++) {
                layout.append(new kendo.drawing.Text(words[i]));
              }
              layout.reflow();
              return layout;
            }
          }
        },
        series: [{
          data: [1]
        }]
      });
    </script>

### categoryAxis.line `Object`

The configuration of the axis lines. Also affects the major and minor ticks, but not the grid lines.

#### Example - configure the category axis line

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        line: {
          color: "#aa00bb",
          width: 3
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.line.color `String` *(default: "black")*

The color of the lines. Accepts a valid CSS color string, including hex and rgb.

> Setting the `color` option affects the major and minor ticks, but not the grid lines.

#### Example - set the category axis line color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        line: {
          color: "#aa00bb"
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

#### Example - set the category axis line color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        line: {
          color: "rgb(128, 0, 255)"
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

#### Example - set the category axis line color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        line: {
          color: "green"
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.line.dashType `String` *(default: "solid")*

The dash type of the line.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the category axis line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        line: {
          dashType: "dashDot"
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.line.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis lines. By default the category axis lines are visible.

#### Example - hide the category axis lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        line: {
          visible: false
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.line.width `Number` *(default: 1)*

The width of the line in pixels. Also affects the major and minor ticks, but not the grid lines.

#### Example - set the category axis line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        line: {
          width: 3
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.majorGridLines `Object`

The configuration of the major grid lines. These are the lines that are an extension of the major ticks through the
body of the chart.

#### Example - configure the category axis major grid lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        majorGridLines: {
          width: 3,
          color: "green"
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.majorGridLines.color `String` *(default: "black")*

The color of the major grid lines. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis major grid line color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        majorGridLines: {
          color: "#aa00bb"
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

#### Example - set the category axis major grid line color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        majorGridLines: {
          color: "rgb(128, 0, 255)"
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

#### Example - set the category axis major grid line color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        majorGridLines: {
          color: "green"
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.majorGridLines.dashType `String` *(default: "solid")*

The dash type of the major grid lines.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the category axis major grid line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        majorGridLines: {
          dashType: "dashDot"
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.majorGridLines.visible `Boolean` *(default: false)*

If set to `true` the chart will display the major grid lines. By default the major grid lines are visible.

#### Example - hide the category axis major grid lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        majorGridLines: {
          visible: false
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.majorGridLines.width `Number` *(default: 1)*

The width of the category axis major grid lines in pixels.

#### Example - set the category axis major grid lines width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        majorGridLines: {
          width: 3
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.majorGridLines.step `Number` *(default: 1)*

The step of the category axis major grid lines.

#### Example - set the category axis major grid lines step

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        majorGridLines: {
          step: 2
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.majorGridLines.skip `Number` *(default: 0)*

The skip of the category axis major grid lines.

#### Example - set the category axis major grid lines skip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        majorGridLines: {
          skip: 2
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.majorTicks `Object`

The configuration of the category axis major ticks.

#### Example - configure the category axis major ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        majorTicks: {
          size: 6,
          color: "green",
          width: 5
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.majorTicks.color `String` *(default: "black")*

The color of the category axis major ticks lines. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis major ticks color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        majorTicks: {
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis major ticks color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        majorTicks: {
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis major ticks color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        majorTicks: {
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.majorTicks.size `Number` *(default: 4)*

The length of the tick line in pixels.

#### Example - set the category axis major ticks size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        majorTicks: {
          size: 6
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.majorTicks.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis major ticks. By default the category axis major ticks are visible.

#### Example - hide the category axis major ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        majorTicks: {
          visible: false
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.majorTicks.width `Number` *(default: 1)*

The width of the major ticks in pixels.

#### Example - set the category axis major ticks width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        majorTicks: {
          width: 3
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.majorTicks.step `Number` *(default: 1)*

The step of the category axis major ticks.

#### Example - set the category axis major ticks step

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        majorTicks: {
          step: 2
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.majorTicks.skip `Number` *(default: 0)*

The skip of the category axis major ticks.

#### Example - set the category axis major ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        majorTicks: {
          skip: 2
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.max `Object`

The last date displayed on the category date axis. By default, the minimum date is the same as the last category.
This is often used in combination with the [categoryAxis.min](#configuration-categoryAxis.min) and [categoryAxis.roundToBaseUnit](#configuration-categoryAxis.roundToBaseUnit) options to
set up a fixed date range.

### categoryAxis.maxDateGroups `Number` *(default: 10)*

The maximum number of groups (categories) to display when
[categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "fit" or
[categoryAxis.baseUnitStep](#configuration-categoryAxis.baseUnitStep) is set to "auto".

### categoryAxis.min `Object`

The first date displayed on the category date axis. By default, the minimum date is the same as the first category.
This is often used in combination with the [categoryAxis.min](#configuration-categoryAxis.min) and [categoryAxis.roundToBaseUnit](#configuration-categoryAxis.roundToBaseUnit) options to
set up a fixed date range.

### categoryAxis.minorGridLines `Object`

The configuration of the minor grid lines. These are the lines that are an extension of the minor ticks through the
body of the chart.

#### Example - configure the category axis minor grid lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        minorGridLines: {
          width: 3,
          color: "green"
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.minorGridLines.color `String` *(default: "black")*

The color of the minor grid lines. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis minor grid line color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        minorGridLines: {
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis minor grid line color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        minorGridLines: {
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis minor grid line color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        minorGridLines: {
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.minorGridLines.dashType `String` *(default: "solid")*

The dash type of the minor grid lines.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the category axis minor grid line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        minorGridLines: {
          dashType: "dashDot"
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.minorGridLines.visible `Boolean` *(default: false)*

If set to `true` the chart will display the minor grid lines. By default the minor grid lines are visible.

#### Example - hide the category axis minor grid lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        minorGridLines: {
          visible: false
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.minorGridLines.width `Number` *(default: 1)*

The width of the category axis minor grid lines in pixels.

#### Example - set the category axis minor grid lines width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        minorGridLines: {
          width: 3
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.minorGridLines.step `Number` *(default: 1)*

The step of the category axis minor grid lines.

#### Example - set the category axis minor grid lines step

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        minorGridLines: {
          step: 2
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.minorGridLines.skip `Number` *(default: 0)*

The skip of the category axis minor grid lines.

#### Example - set the category axis minor grid lines skip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        minorGridLines: {
          skip: 2
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.minorTicks `Object`

The configuration of the category axis minor ticks.

#### Example - configure the category axis minor ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        minorTicks: {
          size: 6,
          color: "green",
          width: 5
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.minorTicks.color `String` *(default: "black")*

The color of the category axis minor ticks lines. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis minor ticks color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        minorTicks {
          color: "#aa00bb"
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

#### Example - set the category axis minor ticks color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        minorTicks {
          color: "rgb(128, 0, 255)"
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

#### Example - set the category axis minor ticks color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        minorTicks {
          color: "green"
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.minorTicks.size `Number` *(default: 4)*

The length of the tick line in pixels.

#### Example - set the category axis minor ticks size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        minorTicks: {
          size: 6
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.minorTicks.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis minor ticks. By default the category axis minor ticks are visible.

#### Example - hide the category axis minor ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        minorTicks: {
          visible: false
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.minorTicks.width `Number` *(default: 1)*

The width of the minor ticks in pixels.

#### Example - set the category axis minor ticks width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        minorTicks: {
          width: 3
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.minorTicks.step `Number` *(default: 1)*

The step of the category axis minor ticks.

#### Example - set the category axis minor ticks step

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        minorTicks: {
          step: 2
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.minorTicks.skip `Number` *(default: 0)*

The skip of the category axis minor ticks.

#### Example - set the category axis minor ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        minorTicks: {
          skip: 2
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### categoryAxis.name `String` *(default: "primary")*

The unique axis name. Used to associate a series with a category axis using the [series.categoryAxis](#configuration-series.categoryAxis) option.

#### Example - set the category axis name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [
        { name: "month", categories: [ "Jan", "Feb" ] },
        { name: "year", categories: [ 2012 ] }
      ],
      series: [
        { categoryAxis: "month", data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.pane `String`

The name of the pane that the category axis should be rendered in.
The axis will be rendered in the first (default) pane if not set.

#### Example - set the category axis pane

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1,2,3] },
        { data: [1,2,3,4],
          axis: "secondValueAxis",
          categoryAxis: "secondCategoryAxis"
        }
      ],
      panes:[
        { name: "topPane" },
        { name: "bottomPane" }
      ],
      valueAxis: [
        { pane: "topPane" },
        { name: "secondValueAxis", pane: "bottomPane" }
      ],
      categoryAxis: [
        { pane: "topPane" },
        { name: "secondCategoryAxis", pane: "bottomPane" }
      ]
    });
    </script>

### categoryAxis.plotBands `Array`

The plot bands of the category axis.

#### Example - set the category plot bands

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.plotBands.color `String`

The color of the plot band.

#### Example - set the category plot band color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.plotBands.from `Number`

The start position of the plot band in axis units.

#### Example - set the category plot band start position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.plotBands.opacity `Number`

The opacity of the plot band.

#### Example - set the category plot band opacity

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        plotBands: [
          { from: 1, to: 2, color: "red", opacity: 0.5 }
        ]
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.plotBands.to `Number`

The end position of the plot band in axis units.

#### Example - set the category plot band end position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.reverse `Boolean` *(default: false)*

If set to `true` the category axis direction will be reversed. By default categories are listed from left to right and from bottom to top.

#### Example - reverse the category axis

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        categories: ["2012", "2013"],
        reverse: true
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.roundToBaseUnit `Boolean` *(default: true)*

If set to `true` the chart will round the first and last date to the nearest base unit.

The `roundToBaseUnit` option will be ignored if [series.type](#configuration-series.type) is set to "bar", "column", "boxPlot", "ohlc", "candlestick" or "waterfall".

### categoryAxis.select `Object`

The selected axis range. If set, axis selection will be enabled.

The range is index based, starting from 0.
Categories with indexes in the range [select.from, select.to) will be selected.
That is, the last category in the range will not be included in the selection.

If the categories are dates, the range must also be specified with date values.

> Selection is only supported if the axis is horizontal.

#### Example - select the second category initially

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        select: {
          from:1,
          to: 2,
          max: 3
        }
      },
      series: [
        { data: [1, 2, 3, 4] }
      ]
    });
    </script>

### categoryAxis.select.from `Object`

The lower boundary of the selected range.

#### Example - set the category axis selection lower boundary

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        select: {
          from:1,
          to: 2
        }
      },
      series: [
        { data: [1, 2, 3, 4] }
      ]
    });
    </script>

### categoryAxis.select.max `Object`

The maximum value which the user can select.

#### Example - set the category axis selection maximum

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        select: {
          from:1,
          to: 2,
          max: 3
        }
      },
      series: [
        { data: [1, 2, 3, 4] }
      ]
    });
    </script>

### categoryAxis.select.min `Object`

The minimum value which the user can select.

#### Example - set the category axis selection minimum

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        select: {
          from:1,
          to: 2,
          min: 1
        }
      },
      series: [
        { data: [1, 2, 3, 4] }
      ]
    });
    </script>

### categoryAxis.select.mousewheel `Object`

The mouse wheel configuration of the selection.

#### Example - configure the category axis selection mouse wheel behavior

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        select: {
          from:1,
          to: 2,
          mousewheel: {
            reverse: false,
            zoom: "left"
          }
        }
      },
      series: [
        { data: [1, 2, 3, 4] }
      ]
    });
    </script>

### categoryAxis.select.mousewheel.reverse `Boolean` *(default: true)*

If set to `true` will reverse the mouse wheel direction. The normal direction is down for "zoom out", up for "zoom in".

#### Example - disable reverse mouse wheel selection

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        select: {
          from:1,
          to: 2,
          mousewheel: {
            reverse: false
          }
        }
      },
      series: [
        { data: [1, 2, 3, 4] }
      ]
    });
    </script>

### categoryAxis.select.mousewheel.zoom `String` *(default: "both")*

The zoom direction.

The supported values are:

* "both" - zooming expands and contracts the selection both sides

* "left" - zooming expands and contracts the selection left side only

* "right" - zooming expands and contracts the selection right side only

#### Example - set the category axis selection zoom

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        select: {
          from:1,
          to: 2,
          mousewheel: {
            zoom: "left"
          }
        }
      },
      series: [
        { data: [1, 2, 3, 4] }
      ]
    });
    </script>

### categoryAxis.select.to `Object`

The upper boundary of the selected range.

> The category with the specified index (date) is not included in the selected range
unless the axis is justified. In order to select all categories set
a value larger than the last category index (date).

#### Example - set the category axis selection lower boundary

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis:  {
        select: {
          from:1,
          to: 2
        }
      },
      series: [
        { data: [1, 2, 3, 4] }
      ]
    });
    </script>

### categoryAxis.startAngle `Number` *(default: 90)*

The angle (degrees) of the first category on the axis.

Angles increase clockwise and zero is to the left. Negative values are acceptable.

#### Example - set the donut chart series start angle
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "radarLine",
        data: [ 1, 2, 3 ]
      }],
      categoryAxis: {
        startAngle: 180
      }
    });
    </script>

### categoryAxis.title `Object`

The title configuration of the category axis.

> The [categoryAxis.title.text](#configuration-categoryAxis.title.text) option must be set in order to display the title.


#### Example - set the category axis title
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        title: {
          text: "Years",
          background: "green",
          border: {
            width: 1,
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.background `String`

The background color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis title background
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        title: {
          text: "Years",
          background: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.border `Object`

The border of the title.

#### Example - set the category axis title border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          border: {
            color: "green",
            dashType: "dashDot",
            width: 1
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis title border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          border: {
            color: "green",
            width: 1
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the category axis title border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          border: {
            dashType: "dashDot",
            width: 1
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the category axis title border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          border: {
            width: 1
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.color `String`

The text color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis title color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        title: {
          text: "Years",
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis title color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        title: {
          text: "Years",
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the category axis title color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [ "2012", "2013"],
        title: {
          text: "Years",
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.font `String` *(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

#### Example - set the category axis title font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
           text: "Years",
           font: "20px sans-serif",
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.margin `Number|Object` *(default: 5)*

The margin of the title. A numeric value will set all margins.

#### Example - set the category axis title margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          margin: 20
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.margin.bottom `Number` *(default: 0)*

The bottom margin of the title.

#### Example - set the category axis title bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          margin: {
            bottom: 20
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.margin.left `Number` *(default: 0)*

The left margin of the title.

#### Example - set the category axis title left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          margin: {
            left: 20
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.margin.right `Number` *(default: 0)*

The right margin of the title.

#### Example - set the category axis title right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          margin: {
            right: 20
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.margin.top `Number` *(default: 0)*

The top margin of the title.

#### Example - set the category axis title top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          margin: {
            top: 20
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.padding `Number|Object` *(default: 0)*

The padding of the title. A numeric value will set all paddings.

#### Example - set the category axis title padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          padding: 20
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.padding.bottom `Number` *(default: 0)*

The bottom padding of the title.

#### Example - set the category axis title bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          padding: {
            bottom: 20
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.padding.left `Number` *(default: 0)*

The left padding of the title.

#### Example - set the category axis title left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          padding: {
            left: 20
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.padding.right `Number` *(default: 0)*

The right padding of the title.

#### Example - set the category axis title right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          padding: {
            right: 20
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.padding.top `Number` *(default: 0)*

The top padding of the title.

#### Example - set the category axis title top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          padding: {
            top: 20
          }
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.position `String` *(default: "center")*

The position of the title.

The supported values are:

* "top" - the axis title is positioned on the top (applicable to vertical axis)
* "bottom" - the axis title is positioned on the bottom (applicable to vertical axis)
* "left" - the axis title is positioned on the left (applicable to horizontal axis)
* "right" - the axis title is positioned on the right (applicable to horizontal axis)
* "center" - the axis title is positioned in the center

#### Example - set the category axis title position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: ["2012", "2013"],
        title: {
          text: "Years",
          position: "left"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.rotation `Number` *(default: 0)*

The rotation angle of the title. By default the title is not rotated.

#### Example - rotate the category axis title

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years",
          rotation: 90
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.text `String`

The text of the title.

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example - set the category axis title text

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years"
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis title. By default the category axis title is visible.

#### Example - hide the category axis title
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        title: {
          text: "Years"
          visible: false
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.title.visual `Function`

A function that can be used to create a custom visual for the title. The available argument fields are:

* text - the label text.
* rect - the `kendo.geometry.Rect` that defines where the visual should be rendered.
* sender - the chart instance (may be undefined).
* options - the label options.
* createVisual - a function that can be used to get the default visual.

#### Example - using custom visual for the title

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        categoryAxis: [{
          title: {
            text: "foo bar",
            visual: function (e) {
              var layout = new kendo.drawing.Layout(e.rect, {
                orientation: "vertical",
                alignContent: "center",
                justifyContent: "end"
              });
              var words = e.text.split(" ");
              for (var i = 0; i < words.length; i++) {
                layout.append(new kendo.drawing.Text(words[i]));
              }
              layout.reflow();
              return layout;
            }
          },
          categories: ["2012", "2013"]
        }],
        series: [
          { data: [1, 2, 3] }
        ]
      });
    </script>

### categoryAxis.type `String` *(default: "category")*

The category axis type.

The supported values are:

* "category" - discrete category axis.

* "date" - specialized axis for displaying chronological data.

#### Example - set the category axis type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [
          new Date("2011/12/20"),
          new Date("2011/12/21")
        ],
        type: "date"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis. By default the category axis is visible.

#### Example - hide the category axis

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [
          new Date("2011/12/20"),
          new Date("2011/12/21")
        ],
        visible: false
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### categoryAxis.weekStartDay `Number` *(default: kendo.days.Sunday)*

The week start day when [categoryAxis.baseUnit](#configuration-categoryAxis.baseUnit) is set to "weeks".

The supported values are:

* kendo.days.Sunday - equal to 0
* kendo.days.Monday - equal to 1
* kendo.days.Tuesday - equal to 2
* kendo.days.Wednesday - equal to 3
* kendo.days.Thursday - equal to 4
* kendo.days.Friday - equal to 5
* kendo.days.Saturday - equal to 6

### categoryAxis.notes `Object`

The category axis notes configuration.

### categoryAxis.notes.icon `Object`

The icon of the notes.

### categoryAxis.notes.position `String`

The position of the category axis note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

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

The [template](/api/javascript/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the category value

> The text can be split into multiple lines by using line feed characters ("\n").

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

The format used to display the notes label. Uses [kendo.format](/api/javascript/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

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

### categoryAxis.notes.data.position `String` *(default: "inside")*

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

### categoryAxis.notes.data.icon.type`String` *(default: "circle")*

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
              type: "triangle"
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

The [template](/api/javascript/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the category value

> The text can be split into multiple lines by using line feed characters ("\n").

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

The format used to display the note label. Uses [kendo.format](/api/javascript/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

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

### categoryAxis.notes.visual `Function`

A function that can be used to create a custom visual for the notes. The available argument fields are:

* rect - the `kendo.geometry.Rect` that defines the note target rect.
* options - the note options.
* createVisual - a function that can be used to get the default visual.
* value - the note value.

#### Example - use custom visual for the notes

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          data: [1, 2, 3]
        }],
        categoryAxis: {
          notes: {
            data: [{
              value: 1
            }],
            visual: function (e) {
              var targetPoint = { x: e.rect.center().x, y: e.rect.origin.y };
              var line = new kendo.drawing.Path()
              .moveTo(targetPoint.x, targetPoint.y)
              .lineTo(targetPoint.x, targetPoint.y - 10);
              var circle = new kendo.drawing.Circle(new kendo.geometry.Circle([targetPoint.x, targetPoint.y - 30], 20), {
                fill: {
                  color: "red"
                }
              });

              return new kendo.drawing.Group({
                zIndex: 1
              }).append(line, circle);
            }
          }
        }
      });
    </script>

### chartArea `Object`

The chart area configuration options. Represents the entire visible area of the chart.

### chartArea.background `String` *(default: "white")*

The background color of the chart area. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart area background as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        background: "#aa00bb"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the chart area background as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        background: "rgb(128, 0, 255)"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the chart area background by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        background: "green"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### chartArea.border `Object`

The border of the chart area.

#### Example - set the chart area border
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        border: {
          width: 2,
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### chartArea.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart area border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        border: {
          width: 2,
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### chartArea.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the chart area border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        border: {
          width: 2,
          dashType: "dashDot"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### chartArea.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart area border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        border: {
          width: 2
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### chartArea.height `Number` *(default: 400)*

The height of the chart area.

#### Example - set the chart area height
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        height: 200
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### chartArea.margin `Number|Object` *(default: 5)*

The margin of the chart area. A numeric value will set all margins.

#### Example - set the chart area margin
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        margin: 10
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### chartArea.margin.bottom `Number` *(default: 5)*

The bottom margin of the chart area.

#### Example - set the chart area bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        margin: {
          bottom: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### chartArea.margin.left `Number` *(default: 5)*

The left margin of the chart area.

#### Example - set the chart area left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        margin: {
          left: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### chartArea.margin.right `Number` *(default: 5)*

The right margin of the chart area.

#### Example - set the chart area right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        margin: {
          right: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### chartArea.margin.top `Number` *(default: 5)*

The top margin of the chart area.

#### Example - set the chart area top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        margin: {
          top: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### chartArea.opacity `Number` *(default: 1)*

The background opacity of the chart area. By default the background is opaque.

#### Example - set the chart area opacity
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        background: "green",
        opacity: 0.1
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### chartArea.width `Number` *(default: 600)*

The width of the chart area.

#### Example - set the chart area width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      chartArea: {
        width: 500
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### dataSource `Object|Array|kendo.data.DataSource`

The data source of the chart which is used to display the series. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.

#### Example - set dataSource as a JavaScript object
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [
          { price: 10 },
          { price: 20 }
        ]
      },
      series: [
        { field: "price" }
      ]
    });
    </script>

#### Example - set dataSource as a JavaScript array

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: [
        { price: 10 },
        { price: 20 }
      ],
      series: [
        { field: "price" }
      ]
    });
    </script>

#### Example - set dataSource as an existing kendo.data.DataSource instance
    <div id="chart"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/stockdata",
          dataType: "jsonp"
        }
      }
    });
    $("#chart").kendoChart({
      dataSource: dataSource,
      series: [
        { field: "Volume" }
      ]
    });
    </script>

### legend `Object`

The chart legend configuration options.

#### Example - configure the chart legend
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        background: "green",
        position: "left",
        labels: {
          font: "20px sans-serif",
          color: "red"
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.align `String` *(default: "center")*

The legend horizontal alignment when the [legend.position](#configuration-legend.position) is "top" or "bottom" and the vertical alignment when the [legend.position](#configuration-legend.position) is "left" or "right".

The supported values are:

* "start" - the legend is aligned to the start.

* "center" - the legend is aligned to the center.

* "end" - the legend is aligned to the end.

#### Example - set the chart legend alignment to start

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        align: "start"
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.background `String` *(default: "white")*

The background color of the legend. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart legend background as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        background: "#aa00bb"
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

#### Example - set the chart legend background as a RGB value

    $("#chart").kendoChart({
      legend: {
        background: "rgb(128, 0, 255)"
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

#### Example - set the chart legend background by name

    $("#chart").kendoChart({
      legend: {
        background: "green"
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.border `Object`

The border of the legend.

#### Example - set the chart legend border
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        border: {
          width: 2,
          color: "green"
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart legend border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        border: {
          width: 2,
          color: "green"
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the chart legend border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        border: {
          width: 2,
          dashType: "dashDot"
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart legend border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        border: {
          width: 2
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.height `Number`

The legend height when the [legend.orientation](#configuration-legend.orientation) is set to "vertical".

#### Example - set the chart legend height for custom positioned legend

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        position: "custom",
        orientation: "vertical",
        height: 50
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] },
        { name: "Series 3", data: [6, 7, 8] }
      ]
    });
    </script>

#### Example - set the chart legend height for legend with predefined position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        position: "left",
        height: 50
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] },
        { name: "Series 3", data: [6, 7, 8] }
      ]
    });
    </script>

### legend.inactiveItems `Object`

The chart inactive legend items configuration.

#### Example - configure the chart legend inactive items

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        inactiveItems: {
          labels: {
            background: "green",
            color: "white"
          }
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.inactiveItems.labels `Object`

The chart legend label configuration.

#### Example - configure the chart legend labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        inactiveItems: {
          labels: {
            background: "green",
            color: "white"
          }
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.inactiveItems.labels.color `String` *(default: "black")*

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart legend label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        inactiveItems: {
          labels: {
            color: "#aa00bb"
          }
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

#### Example - set the chart legend label color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        inactiveItems: {
          labels: {
            color: "rgb(128, 0, 255)"
          }
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

#### Example - set the chart legend label color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        inactiveItems: {
          labels: {
            color: "green"
          }
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.inactiveItems.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example - set the chart legend label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        inactiveItems: {
          labels: {
            font: "20px sans-serif"
          }
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.inactiveItems.labels.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

*   text - the text the legend item.
*   series - the data series.
*   value - the point value. (only for donut and pie charts)
*   percentage - the point value represented as a percentage value. Available only for donut, pie and 100% stacked charts.
*   dataItem - the original data item used to construct the point.

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example - set the chart legend label template as a string
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          template: "Name: #: text #"
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

#### Example - set the chart legend label template as a function
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          template: kendo.template("Name: #: text #")
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.item `Object`

The chart legend item configuration.

### legend.item.cursor `String`
The [cursor style](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) of the legend item.

### legend.item.visual `Function`

A function that can be used to create a custom visual for the legend items. The available argument fields are:

* options - the item options.
* createVisual - a function that can be used to get the default visual.
* series - the item series.
* pointIndex - the index of the point in the series. Available for pie, donut and funnel series.

#### Example - using custom visual for the legend items

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
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

The chart legend label configuration.

#### Example - configure the chart legend labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          background: "green",
          color: "white"
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.labels.color `String` *(default: "black")*

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart legend label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          color: "#aa00bb"
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

#### Example - set the chart legend label color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

#### Example - set the chart legend label color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          color: "green"
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example - set the chart legend label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
           font: "20px sans-serif"
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.labels.margin `Number|Object` *(default: 0)*

The margin of the labels. A numeric value will set all margins.

#### Example - set the chart legend label margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          margin: 20
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.labels.margin.bottom `Number` *(default: 0)*

The bottom margin of the labels.

#### Example - set the chart legend label bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          margin: {
            bottom: 20
          }
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.labels.margin.left `Number` *(default: 0)*

The left margin of the labels.

#### Example - set the chart legend label left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          margin: {
            left: 20
          }
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.labels.margin.right `Number` *(default: 0)*

The right margin of the labels.

#### Example - set the chart legend label right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          margin: {
            right: 20
          }
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.labels.margin.top `Number` *(default: 0)*

The top margin of the labels.

#### Example - set the chart legend label top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          margin: {
            top: 20
          }
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.labels.padding `Number|Object` *(default: 0)*

The padding of the labels. A numeric value will set all paddings.

#### Example - set the chart legend label padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          padding: 20
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.labels.padding.bottom `Number` *(default: 0)*

The bottom padding of the labels.

#### Example - set the chart legend label bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          padding: {
            bottom: 20
          }
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.labels.padding.left `Number` *(default: 6)*

The left padding of the labels.

#### Example - set the chart legend label left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          padding: {
            left: 20
          }
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.labels.padding.right `Number` *(default: 0)*

The right padding of the labels.

#### Example - set the chart legend label right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          padding: {
            right: 20
          }
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.labels.padding.top `Number` *(default: 0)*

The top padding of the labels.

#### Example - set the chart legend label top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          padding: {
            top: 20
          }
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.labels.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

*   text - the text the legend item.
*   series - the data series.
*   value - the point value. (only for donut and pie charts)
*   percentage - the point value represented as a percentage value. Available only for donut, pie and 100% stacked charts.

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example - set the chart legend label template as a string
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          template: "Name: #: text #"
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

#### Example - set the chart legend label template as a function
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        labels: {
          template: kendo.template("Name: #: text #")
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.margin `Number|Object` *(default: 5)*

The margin of the chart legend. A numeric value will set all paddings.

#### Example - set the chart legend margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        margin: 20
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.margin.bottom `Number` *(default: 0)*

The bottom margin of the chart legend.

#### Example - set the chart legend bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        margin: {
          bottom: 20
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.margin.left `Number` *(default: 0)*

The left margin of the chart legend.

#### Example - set the chart legend left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        margin: {
          left: 20
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.margin.right `Number` *(default: 0)*

The right margin of the chart legend.

#### Example - set the chart legend right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        margin: {
          right: 20
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.margin.top `Number` *(default: 0)*

The top margin of the chart legend.

#### Example - set the chart legend top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        margin: {
          top: 20
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.offsetX `Number` *(default: 0)*

The X offset of the chart legend. The offset is relative to the default position of the legend.
For instance, a value of 20 will move the legend 20 pixels to the right of its initial position.
A negative value will move the legend to the left of its current position.

#### Example - set the chart legend horizontal offset

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        offsetX: 10
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.offsetY `Number` *(default: 0)*

The Y offset of the chart legend.  The offset is relative to the current position of the legend.
For instance, a value of 20 will move the legend 20 pixels down from its initial position.
A negative value will move the legend upwards from its current position.

#### Example - set the chart legend vertical offset

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        offsetY: 10
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.orientation `String` *(default: "vertical")*

The orientation of the legend items.

The supported values are:

* "vertical" - the legend items are added vertically.

* "horizontal" - the legend items are added horizontally.

#### Example - set horizontal orientation for custom positioned legend

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        position: "custom",
        orientation: "horizontal"
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] },
        { name: "Series 3", data: [6, 7, 8] }
      ]
    });
    </script>

#### Example - set horizontal orientation for legend with predefined position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        position: "left",
        orientation: "horizontal"
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] },
        { name: "Series 3", data: [6, 7, 8] }
      ]
    });
    </script>

### legend.padding `Number|Object` *(default: 5)*

The padding of the chart legend. A numeric value will set all paddings.

#### Example - set the chart legend padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        padding: 20
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.padding.bottom `Number` *(default: 0)*

The bottom padding of the chart legend.

#### Example - set the chart legend bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        padding: {
          bottom: 20
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.padding.left `Number` *(default: 0)*

The left padding of the chart legend.

#### Example - set the chart legend left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        padding: {
          left: 20
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.padding.right `Number` *(default: 0)*

The right padding of the chart legend.

#### Example - set the chart legend right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        padding: {
          right: 20
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.padding.top `Number` *(default: 0)*

The top padding of the chart legend.

#### Example - set the chart legend top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        padding: {
          top: 20
        }
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.position `String` *(default: "right")*

The positions of the chart legend.

The supported values are:

* "top" - the legend is positioned on the top.

* "bottom" - the legend is positioned on the bottom.

* "left" - the legend is positioned on the left.

* "right" - the legend is positioned on the right.

* "custom" - the legend is positioned using [legend.offsetX](#configuration-legend.offsetX) and [legend.offsetY](#configuration-legend.offsetY).

### legend.reverse `Boolean` *(default: false)*

If set to `true` the legend items will be reversed.

Available in versions 2013.3.1306 and later.

### legend.visible `Boolean` *(default: true)*

If set to `true` the chart will display the legend. By default the chart legend is visible.

#### Example - hide the legend

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        visible: false
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] }
      ]
    });
    </script>

### legend.width `Number`

The legend width when the [legend.orientation](#configuration-legend.orientation) is set to "horizontal".

#### Example - set the chart legend width for custom positioned legend

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        position: "custom",
        orientation: "horizontal",
        width: 200
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] },
        { name: "Series 3", data: [6, 7, 8] }
      ]
    });
    </script>

#### Example - set the chart legend width for legend with predefined position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      legend: {
        position: "top",
        width: 200
      },
      series: [
        { name: "Series 1", data: [1, 2, 3] },
        { name: "Series 2", data: [3, 4, 5] },
        { name: "Series 3", data: [6, 7, 8] }
      ]
    });
    </script>

### panes `Array`

The chart panes configuration.

Panes are used to split the chart in two or more parts. The panes are ordered from top to bottom.

Each axis can be associated with a pane by setting its `pane` option to the name of the desired pane.
Axis that don't have specified pane are placed in the top (default) pane.

Series are moved to the desired pane by associating them with an axis.

#### Example - configure the chart panes
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane" },
        { name: "bottom-pane" }
      ]
    });
    </script>

### panes.background `String`

The background color of the chart pane. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart panes background as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane", background: "#00ff00" },
        { name: "bottom-pane", background: "#ff00ff" }
      ]
    });
    </script>

#### Example - set the chart panes background as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane", background: "rgb(0, 255, 0)" },
        { name: "bottom-pane", background: "rgb(255, 0, 255)" }
      ]
    });
    </script>

#### Example - set the chart panes background by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane", background: "red" },
        { name: "bottom-pane", background: "green" }
      ]
    });
    </script>

### panes.border `Object`

The border of the chart pane.

#### Example - set the chart pane border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          border: {
            color: "red",
            width: 2
          }
        },
        { name: "bottom-pane",
          border: {
            color: "green",
            width: 2
          }
        }
      ]
    });
    </script>

### panes.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart pane border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          border: {
            color: "red",
            width: 2
          }
        },
        { name: "bottom-pane",
          border: {
            color: "green",
            width: 2
          }
        }
      ]
    });
    </script>

### panes.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the chart pane border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          border: {
            dashType: "dashDot",
            width: 2
          }
        },
        { name: "bottom-pane",
          border: {
            dashType: "dashDot",
            width: 2
          }
        }
      ]
    });
    </script>

### panes.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart pane border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          border: {
            width: 2
          }
        },
        { name: "bottom-pane",
          border: {
            width: 2
          }
        }
      ]
    });
    </script>

### panes.clip `Boolean`

Specifies whether the charts in the pane should be clipped. By default all charts except radar, polar and 100% stacked charts are clipped.

#### Example - set the chart pane clip option

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        type: "line"
      },
      series: [
        { data: [1, 100, 1] },
        { data: [1, 100, 1], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane", max: 70 },
        { pane: "bottom-pane", name: "bottom", max: 70 }
      ],
      panes: [
        { name: "top-pane" },
        { name: "bottom-pane", clip: false}
      ]
    });
    </script>

### panes.height `Number`

The chart pane height in pixels.

#### Example - set the chart pane height

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane", height: 200 },
        { name: "bottom-pane", height: 300  }
      ]
    });
    </script>

### panes.margin `Number|Object` *(default: 0)*

The margin of the pane. A numeric value will set all margins.

#### Example - set the chart pane margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane", margin: 10 },
        { name: "bottom-pane", margin: 10 }
      ]
    });
    </script>

### panes.margin.bottom `Number` *(default: 0)*

The bottom margin of the chart panes.

#### Example - set the chart pane bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        {
          name: "top-pane",
          margin: {
            bottom: 10
          }
        },
        {
          name: "bottom-pane",
          margin: {
            bottom: 10
          }
        }
      ]
    });
    </script>

### panes.margin.left `Number` *(default: 0)*

The left margin of the chart panes.

#### Example - set the chart pane left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        {
          name: "top-pane",
          margin: {
            left: 10
          }
        },
        {
          name: "bottom-pane",
          margin: {
            left: 10
          }
        }
      ]
    });
    </script>

### panes.margin.right `Number` *(default: 0)*

The right margin of the chart panes.

#### Example - set the chart pane right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        {
          name: "top-pane",
          margin: {
            right: 10
          }
        },
        {
          name: "bottom-pane",
          margin: {
            right: 10
          }
        }
      ]
    });
    </script>

### panes.margin.top `Number` *(default: 0)*

The top margin of the chart panes.

#### Example - set the chart pane top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        {
          name: "top-pane",
          margin: {
            top: 10
          }
        },
        {
          name: "bottom-pane",
          margin: {
            top: 10
          }
        }
      ]
    });
    </script>

### panes.name `String`

The unique name of the chart pane.

#### Example - set the chart pane name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane" },
        { name: "bottom-pane" }
      ]
    });
    </script>

### panes.padding `Number|Object` *(default: 0)*

The padding of the pane. A numeric value will set all paddings.

#### Example - set the chart pane padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane", padding: 10 },
        { name: "bottom-pane", padding: 10 }
      ]
    });
    </script>

### panes.padding.bottom `Number` *(default: 0)*

The bottom padding of the chart panes.

#### Example - set the chart pane bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        {
          name: "top-pane",
          padding: {
            bottom: 10
          }
        },
        {
          name: "bottom-pane",
          padding: {
            bottom: 10
          }
        }
      ]
    });
    </script>

### panes.padding.left `Number` *(default: 0)*

The left padding of the chart panes.

#### Example - set the chart pane left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        {
          name: "top-pane",
          padding: {
            left: 10
          }
        },
        {
          name: "bottom-pane",
          padding: {
            left: 10
          }
        }
      ]
    });
    </script>

### panes.padding.right `Number` *(default: 0)*

The right padding of the chart panes.

#### Example - set the chart pane right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        {
          name: "top-pane",
          padding: {
            right: 10
          }
        },
        {
          name: "bottom-pane",
          padding: {
            right: 10
          }
        }
      ]
    });
    </script>

### panes.padding.top `Number` *(default: 0)*

The top padding of the chart panes.

#### Example - set the chart pane top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        {
          name: "top-pane",
          padding: {
            top: 10
          }
        },
        {
          name: "bottom-pane",
          padding: {
            top: 10
          }
        }
      ]
    });
    </script>

### panes.title `String|Object`

The title configuration of the chart pane.

> The [panes.title.text](#configuration-panes.title.text) option must be set in order to display the title.

#### Example - set the chart pane title

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top"
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom"
          }
        }
      ]
    });
    </script>

### panes.title.background `String`

The background color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart pane title background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            background: "red"
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            background: "green"
          }
        }
      ]
    });
    </script>

### panes.title.border `Object`

The border of the title.

#### Example - set the chart pane title border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            border: {
              color: "red",
              width: 2
            }
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            border: {
              color: "green",
              width: 2
            }
          }
        }
      ]
    });
    </script>

### panes.title.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart pane title border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            border: {
              color: "red",
              width: 2
            }
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            border: {
              color: "green",
              width: 2
            }
          }
        }
      ]
    });
    </script>

### panes.title.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the chart pane title border dashType

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            border: {
              dashType: "dashDot",
              width: 2
            }
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            border: {
              dashType: "dashDot",
              width: 2
            }
          }
        }
      ]
    });
    </script>

### panes.title.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the category axis title border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            border: {
              width: 2
            }
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            border: {
              width: 2
            }
          }
        }
      ]
    });
    </script>

### panes.title.color `String`

The text color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart pane title color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            color: "#aa00bb"
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            color: "#a0b0c0"
          }
        }
      ]
    });
    </script>

#### Example - set the chart pane title color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            color: "rgb(128, 0, 255)"
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            color: "rgb(128, 0, 255)"
          }
        }
      ]
    });
    </script>

#### Example - set the chart pane title color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            color: "red"
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            color: "green"
          }
        }
      ]
    });
    </script>

### panes.title.font `String` *(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

#### Example - set the chart pane title font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            font: "20px sans-serif"
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            color: "green"
          }
        }
      ]
    });
    </script>

### panes.title.margin `Number|Object` *(default: 5)*

The margin of the title. A numeric value will set all margins.

#### Example - set the chart pane title margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            margin: 10
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            margin: 10
          }
        }
      ]
    });
    </script>

### panes.title.margin.bottom `Number` *(default: 0)*

The bottom margin of the title.

#### Example - set the chart pane title bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            margin: {
              bottom: 10
            }
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            margin: {
              bottom: 10
            }
          }
        }
      ]
    });
    </script>

### panes.title.margin.left `Number` *(default: 0)*

The left margin of the title.

#### Example - set the chart pane title left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            margin: {
              left: 10
            }
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            margin: {
              left: 10
            }
          }
        }
      ]
    });
    </script>

### panes.title.margin.right `Number` *(default: 0)*

The right margin of the title.

#### Example - set the chart pane title right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            margin: {
              right: 10
            }
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            margin: {
              right: 10
            }
          }
        }
      ]
    });
    </script>

### panes.title.margin.top `Number` *(default: 0)*

The top margin of the title.

#### Example - set the chart pane title top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            margin: {
              top: 10
            }
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            margin: {
              top: 10
            }
          }
        }
      ]
    });
    </script>

### panes.title.position `String` *(default: "center")*

The position of the title.

The supported values are:

* "left" - the axis title is positioned on the left (applicable to horizontal axis)
* "right" - the axis title is positioned on the right (applicable to horizontal axis)
* "center" - the axis title is positioned in the center

#### Example - set the chart pane title position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            position: "left"
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            position: "left"
          }
        }
      ]
    });
    </script>

### panes.title.text `String`

The text of the title.

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example - set the chart pane title text

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top"
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom"
          }
        }
      ]
    });
    </script>

### panes.title.visible `Boolean` *(default: true)*

If set to `true` the chart will display the pane title. By default the pane title is visible.

#### Example - hide the chart pane title
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      panes: [
        { name: "top-pane",
          title: {
            text: "Top",
            visible: false
          }
        },
        { name: "bottom-pane",
          title: {
            text: "Bottom",
            visible: false
          }
        }
      ]
    });
    </script>

### panes.title.visual `Function`

A function that can be used to create a custom visual for the title. The available argument fields are:

* text - the label text.
* rect - the `kendo.geometry.Rect` that defines where the visual should be rendered.
* sender - the chart instance (may be undefined).
* options - the label options.
* createVisual - a function that can be used to get the default visual.

#### Example - using custom visual for the title

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [
          { data: [1, 2, 3] }
        ],
        panes: [{
          title: {
            text: "foo bar",
            visual: function (e) {
              var layout = new kendo.drawing.Layout(e.rect, {
                orientation: "vertical",
                alignContent: "center"
              });
              var words = e.text.split(" ");
              for (var i = 0; i < words.length; i++) {
                layout.append(new kendo.drawing.Text(words[i]));
              }
              layout.reflow();
              return layout;
            }
          }
        }]
      });
    </script>

### pannable `Boolean|Object` *(default: false)*

Specifies if the chart can be panned.

#### Example - enable panning
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }],
        pannable: true,
        categoryAxis: {
          categories: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
          min: 2,
          max: 5
        }
      });
    </script>

### pannable.key `String` *(default: "none")*

Specifies the key that should be pressed to activate panning. The supported values are:

* "none" - No key is required.
* "ctrl" - The "ctrl" key should be pressed.
* "shift" - The "shift" key should be pressed.
* "alt" - The "alt" key should be pressed.

#### Example - set the pannable key
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }],
        pannable: {
          key: "shift"
        },
        categoryAxis: {
          categories: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
          min: 2,
          max: 5
        }
      });
    </script>

### pannable.lock `String` *(default: "none")*

Specifies an axis that should not be panned. The supported values are `none`, `x` and `y`.

#### Example - lock the y axis
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }],
        pannable: {
          lock: "y"
        },
        valueAxis: {
          min: 2,
          max: 7
        },
        categoryAxis: {
          categories: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
          min: 2,
          max: 5
        }
      });
    </script>

### pdf `Object`
Configures the export settings for the [saveAsPDF](#methods-saveAsPDF) method.

### pdf.author `String` *(default: null)*
The author of the PDF document.

#### Example - set the author
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
          pdf: {
              author: "John Doe"
          },
          legend: {
              position: "bottom"
          },
          series: [
              { name: "Series 1", data: [1, 2, 3] },
              { name: "Series 2", data: [3, 4, 5] }
          ]
      });

      var chart = $("#chart").getKendoChart();
      chart.saveAsPDF();
    </script>

### pdf.creator `String` *(default: "Kendo UI PDF Generator")*
The creator of the PDF document.

#### Example - set the creator
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
          pdf: {
              creator: "John Doe"
          },
          legend: {
              position: "bottom"
          },
          series: [
              { name: "Series 1", data: [1, 2, 3] },
              { name: "Series 2", data: [3, 4, 5] }
          ]
      });

      var chart = $("#chart").getKendoChart();
      chart.saveAsPDF();
    </script>

### pdf.date `Date`
The date when the PDF document is created. Defaults to `new Date()`.

#### Example - set the date
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
          pdf: {
              date: new Date("2014/10/10")
          },
          legend: {
              position: "bottom"
          },
          series: [
              { name: "Series 1", data: [1, 2, 3] },
              { name: "Series 2", data: [3, 4, 5] }
          ]
      });

      var chart = $("#chart").getKendoChart();
      chart.saveAsPDF();
    </script>

### pdf.forceProxy `Boolean` *(default: false)*
If set to true, the content will be forwarded to [proxyURL](#configuration-pdf.proxyURL) even if the browser supports saving files locally.

#### Example - use proxy
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
          pdf: {
              proxyURL: "/save",
              forceProxy: true
          },
          legend: {
              position: "bottom"
          },
          series: [
              { name: "Series 1", data: [1, 2, 3] },
              { name: "Series 2", data: [3, 4, 5] }
          ]
      });

      var chart = $("#chart").getKendoChart();
      chart.saveAsPDF();
    </script>

### pdf.fileName `String` *(default: "Export.pdf")*
Specifies the file name of the exported PDF file.

#### Example - set the default PDF file name
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
          pdf: {
              fileName: "Products.pdf"
          },
          legend: {
              position: "bottom"
          },
          series: [
              { name: "Series 1", data: [1, 2, 3] },
              { name: "Series 2", data: [3, 4, 5] }
          ]
      });

      var chart = $("#chart").getKendoChart();
      chart.saveAsPDF();
    </script>

### pdf.keywords `String` *(default: null)*
Specifies the keywords of the exported PDF file.

#### Example - set the keywords
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
          pdf: {
              keywords: "monthly report"
          },
          legend: {
              position: "bottom"
          },
          series: [
              { name: "Series 1", data: [1, 2, 3] },
              { name: "Series 2", data: [3, 4, 5] }
          ]
      });

      var chart = $("#chart").getKendoChart();
      chart.saveAsPDF();
    </script>

### pdf.landscape `Boolean` *(default: false)*
Set to `true` to reverse the paper dimensions if needed such that width is the larger edge.

#### Example - enable landscape mode
    <div id="chart" style="width: 600px; height: 400px;"></div>
    <script>
      $("#chart").kendoChart({
          pdf: {
              paperSize: "A4",
              landscape: true
          },
          legend: {
              position: "bottom"
          },
          series: [
              { name: "Series 1", data: [1, 2, 3] },
              { name: "Series 2", data: [3, 4, 5] }
          ]
      });

      var chart = $("#chart").getKendoChart();
      chart.saveAsPDF();
    </script>

### pdf.margin `Object`
Specifies the margins of the page (numbers or strings with units). Supported
units are "mm", "cm", "in" and "pt" (default).

#### Example - set the margins
    <div id="chart" style="width: 600px; height: 400px;"></div>
    <script>
      $("#chart").kendoChart({
          pdf: {
              margin: {
                  left: 10,
                  right: "10pt",
                  top: "10mm",
                  bottom: "1in"
              }
          },
          legend: {
              position: "bottom"
          },
          series: [
              { name: "Series 1", data: [1, 2, 3] },
              { name: "Series 2", data: [3, 4, 5] }
          ]
      });

      var chart = $("#chart").getKendoChart();
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
      $("#chart").kendoChart({
          pdf: {
              paperSize: ["20cm", "20cm"]
          },
          legend: {
              position: "bottom"
          },
          series: [
              { name: "Series 1", data: [1, 2, 3] },
              { name: "Series 2", data: [3, 4, 5] }
          ]
      });

      var chart = $("#chart").getKendoChart();
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
      $("#chart").kendoChart({
          pdf: {
              proxyURL: "/save"
          },
          legend: {
              position: "bottom"
          },
          series: [
              { name: "Series 1", data: [1, 2, 3] },
              { name: "Series 2", data: [3, 4, 5] }
          ]
      });

      var chart = $("#chart").getKendoChart();
      chart.saveAsPDF();
    </script>

### pdf.proxyTarget `String` *(default: "_self")*

A name or keyword indicating where to display the document returned from the proxy.

If you want to display the document in a new window or iframe,
the proxy should set the "Content-Disposition" header to `inline; filename="<fileName.pdf>"`.

#### Example - open the generated document in a new window
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
          pdf: {
              forceProxy: true,
              proxyURL: "/save",
              proxyTarget: "_blank"
          },
          legend: {
              position: "bottom"
          },
          series: [
              { name: "Series 1", data: [1, 2, 3] },
              { name: "Series 2", data: [3, 4, 5] }
          ]
      });

      var chart = $("#chart").getKendoChart();
      chart.saveAsPDF();
    </script>

### pdf.subject `String` *(default: null)*
Sets the subject of the PDF file.

#### Example - set the subject
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
          pdf: {
              subject: "Products"
          },
          legend: {
              position: "bottom"
          },
          series: [
              { name: "Series 1", data: [1, 2, 3] },
              { name: "Series 2", data: [3, 4, 5] }
          ]
      });

      var chart = $("#chart").getKendoChart();
      chart.saveAsPDF();
    </script>

### pdf.title `String` *(default: null)*
Sets the title of the PDF file.

#### Example - set the title
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
          pdf: {
              title: "Products"
          },
          legend: {
              position: "bottom"
          },
          series: [
              { name: "Series 1", data: [1, 2, 3] },
              { name: "Series 2", data: [3, 4, 5] }
          ]
      });

      var chart = $("#chart").getKendoChart();
      chart.saveAsPDF();
    </script>

### plotArea `Object`

The plot area configuration options. The plot area is the area which displays the series.

#### Example - configure the chart plot area

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        background: "green",

      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.background `String` *(default: "white")*

The background color of the chart plot area. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart plot area background as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        background: "#aa00bb"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the chart plot area background as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        background: "rgb(128, 0, 255)"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the chart plot area background by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        background: "green"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.border `Object`

The border of the chart plot area.

#### Example - set the chart plot area border
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        border: {
          width: 2,
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart plot area border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        border: {
          width: 2,
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the chart plot area border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        border: {
          width: 2,
          dashType: "dashDot"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart plot area border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        border: {
          width: 2
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.margin `Number|Object` *(default: 5)*

The margin of the chart plot area. A numeric value will set all margins.

#### Example - set the chart plot area margin
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        margin: 10
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.margin.bottom `Number` *(default: 5)*

The bottom margin of the chart plot area.

#### Example - set the chart plot area bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        margin: {
          bottom: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.margin.left `Number` *(default: 5)*

The left margin of the chart plot area.

#### Example - set the chart plot area left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        margin: {
          left: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.margin.right `Number` *(default: 5)*

The right margin of the chart plot area.

#### Example - set the chart plot area right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        margin: {
          right: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.margin.top `Number` *(default: 5)*

The top margin of the chart plot area.

#### Example - set the chart plot area top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        margin: {
          top: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.opacity `Number` *(default: 1)*

The background opacity of the chart plot area. By default the background is opaque.

#### Example - set the chart plot area opacity
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        background: "green",
        opacity: 0.1
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.padding `Number|Object`

The padding of the chart plot area. A numeric value will set all paddings.

The default padding for pie, donut, radar and polar charts is proportional of the chart size.

#### Example - set the chart plot area padding
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        padding: 10
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.padding.bottom `Number` *(default: 5)*

The bottom padding of the chart plot area.

#### Example - set the chart plot area bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        padding: {
          bottom: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.padding.left `Number` *(default: 5)*

The left padding of the chart plot area.

#### Example - set the chart plot area left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        padding: {
          left: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.padding.right `Number` *(default: 5)*

The right padding of the chart plot area.

#### Example - set the chart plot area right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        padding: {
          right: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### plotArea.padding.top `Number` *(default: 5)*

The top padding of the chart plot area.

#### Example - set the chart plot area top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      plotArea: {
        padding: {
          top: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### renderAs `String`

Sets the preferred rendering engine.
If it is not supported by the browser, the Chart will switch to the first available mode.

The supported values are:

* "svg" - renders the widget as inline SVG document, if available
* "vml" - renders the widget as VML, if available
* "canvas" - renders the widget as a Canvas element, if available.

> Using Canvas rendering disables most interactive features.

### Example - Render as Canvas, if supported

    <div id="chart"></div>
    <script>
        $("#chart").kendoChart({
            renderAs: "canvas",
            series: [{
                type: "pie",
                data: [1, 2]
            }],
            categoryAxis: {
                categories: ["Foo", "Bar"]
            }
        });
    <script>

### series `Array`

The configuration of the chart series.

The series type is determined by the value of the type field.
If a type value is missing, the type is assumed to be the one specified in seriesDefaults.

> Some options accept function as argument. They will be evaluated for each point (supplied as parameter). The theme/seriesDefaults value will be used if no value is returned.

#### Example - configure the chart series

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "line", data: [1, 2, 3] },
        { type: "bar", data: [4, 5, 6] }
      ]
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
* object  - (compound aggregate) **Applicable to "candlestick", "boxPlot"  and ohlc "series"**. Specifies the aggregate for each data item field.

##### Example - set the chart series aggregate

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [
          new Date("2012/01/01"),
          new Date("2012/01/02"),
          new Date("2012/01/02")
        ],
        type: "date"
      },
      series: [{
          data: [1, 2, 3],
          aggregate: "avg"
      }]
    });
    </script>

### series.axis `String` *(default: "primary")*

The name of the value axis to use.

> The `axis` option is supported for scatter plots. See [xAxis](#configuration-series.xAxis) and [yAxis](#configuration-series.yAxis) for scatter plots.

#### Example - set the chart series value axis

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [
        { name: "first" },
        { name: "second" }
      ],
      series: [
        { data: [800, 100, 300],  axis: "first" },
        { data: [1, 5],  axis: "second" }
      ]
    });
    </script>

### series.border `Object`

The border of the chart series.

> The `border` option is supported when [series.type](#configuration-series.type) is set to "bar", "column", "donut", "pie", "bubble", "boxPlot", "candlestick", "ohlc" or "candlestick".

#### Example - set the chart series border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          border: {
            width: 2,
            color: "black",
            dashType: "dash",
          },
          data: [1, 2]
        }
      ]
    });
    </script>

### series.border.color `String|Function`

The color of the border. Accepts a valid CSS color string, including hex and rgb. By default it is set to color of the current series.

#### Example - set the chart series border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          border: {
            width: 2,
            color: "black"
          },
          data: [1, 2]
        }
      ]
    });
    </script>

### series.border.dashType `String|Function` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the chart series border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          border: {
            width: 2,
            color: "black",
            dashType: "dash",
          },
          data: [1, 2]
        }
      ]
    });
    </script>

### series.border.opacity `Number|Function` *(default: 1)*

The opacity of the border. By default the border is opaque.

#### Example - set the chart series border opacity

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          border: {
            width: 2,
            color: "black",
            opacity: 0.5
          },
          data: [1, 2]
        }
      ]
    });
    </script>

### series.border.width `Number|Function` *(default: 1)*

The width of the border in pixels.

#### Example - set the chart series border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        border: {
          width: 2
        },
        data: [1, 2]
      }]
    });
    </script>

### series.categoryField `String` *(default: "category")*

The data item field which contains the category name or date.

> The points will be rendered in chronological order if the category is a date.

#### Example - set pie series category name
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "pie",
        categoryField: "type",
        data: [
          { value: 1, type: "Category 1" },
          { value: 2, type: "Category 2" },
        ]
      }]
    });
    </script>

#### Example - set series date category field
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "line",
        categoryField: "date",
        data: [
          { value: 1, date: new Date(2012, 1, 1) },
          { value: 2, date: new Date(2012, 1, 2) },
        ]
      }]
    });
    </script>

### series.closeField `String` *(default: "close")*

The data field containing the close value.

> The `closeField` option is supported when [series.type](#configuration-series.type) is set to "candlestick" or "ohlc".

#### Example - set the chart series high field
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "candlestick",
        closeField: "closePrice",
        data: [
          { open: 1, high: 2, low: 0.5, closePrice: 1.5 },
          { open: 2, high: 3, low: 1, closePrice: 1.5 }
        ]
      }]
    });
    </script>

### series.color `String|Function`

The series base color. The supported values are:

* CSS color string, including hex and rgb
* function(point) - user-defined function that will be evaluated for each point. Returning `undefined` will assume the default series color.

#### Example - set the chart series color as a hex string
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2],
        color: "#a0b0c0"
      }]
    });
    </script>

#### Example - set the chart series color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2],
        color: "rgb(128, 0, 255)"
      }]
    });
    </script>

#### Example - set the chart series color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2],
        color: "red"
      }]
    });
    </script>

#### Example - set the chart series color as a function

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2],
        color: function(point) {
          if (point.value > 1) {
            return "red";
          }

          // use the default series theme color
        }
      }]
    });
    </script>

### series.colorField `String` *(default: "color")*

The data item field which contains the series color.

> The `colorField` option is supported when [series.type](#configuration-series.type)
is set to "bar", "column", "rangeBar", "rangeColumn", "bubble", "donut", "pie", "candlestick", "ohlc" or "waterfall".

#### Example - set the chart series color field

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        colorField: "valueColor",
        data: [
         { value: 1, valueColor: "red" },
         { value: 2, valueColor: "green" }
        ]
      }]
    });
    </script>

### series.connectors `Object`

The label connectors options.

> The `connectors` option is supported when [series.type](#configuration-series.type) is set to "donut" or "pie" and
[series.labels.visible](#configuration-series.labels.visible) is set to `true`.

#### Example - configure the label connectors
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "pie",
        labels: {
          visible: true
        },
        connectors: {
          width: 4,
          color: "red"
        },
        data: [1 , 2]
      }]
    });
    </script>

### series.connectors.color `String`

The color of the connector. Accepts a valid CSS color string, including hex and rgb.

#### Example - configure the label connector color
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "pie",
        labels: {
          visible: true
        },
        connectors: {
          color: "red"
        },
        data: [1 , 2]
      }]
    });
    </script>

### series.connectors.padding `Number` *(default: 4)*

The padding between the connector line and the label, and connector line and donut chart.

#### Example - configure the label connector padding
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "pie",
        labels: {
          visible: true
        },
        connectors: {
          padding: 10
        },
        data: [1 , 2]
      }]
    });
    </script>

### series.connectors.width `Number` *(default: 1)*

The width of the connector line.

#### Example - configure the label connector width
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "pie",
        labels: {
          visible: true
        },
        connectors: {
          width: 10
        },
        data: [1 , 2]
      }]
    });
    </script>

### series.currentField `String` *(default: "current")*

The data item field containing the current value.

> The `currentField` option is supported when [series.type](#configuration-series.type) is set to "bullet" or "verticalBullet".

#### Example - set the bullet chart series current field
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "bullet",
          currentField: "price",
          data: [
            { price: 1, target: 2 }
          ]
      }]
    });
    </script>

### series.dashType `String` *(default: "solid")*

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
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          dashType: "dashDot",
          type: "line",
          data: [1, 2, 3]
      }]
    });
    </script>

### series.data `Array`

The array of data items which represent the series data.

Can be set to :

* Array of objects. Each point is bound to the field specified via the [series.field](#configuration-series.field) option.
* Array of numbers. Supported when the [series.type](#configuration-series.type) option is set to "area", "bar", "column", "donut", "pie", "line" or "waterfall".
* Array of arrays of numbers. Supported when the [series.type](#configuration-series.type) option is set to "bubble", "scatter", "scatterLine", "ohlc" or polar series.
    * Bubble series need arrays of three values - X value, Y value and Size value e.g. `[1, 1, 10]`
    * Scatter and scatter line series need arrays of two values - X value and Y value
    * OHLC and candlestick series need arrays of four values - open, high, low and close

#### Example - set the chart series data as array of objects

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          field: "price",
          data: [
            { price: 1 },
            { price: 2 },
            { price: 3 }
          ]
        }
      ]
    });
    </script>

#### Example - set the chart series data as array of numbers

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the chart series data as array of arrays

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "bubble",
          data: [
            [1, 2, 15],
            [2, 3, 4]
          ]
        }
      ]
    });
    </script>

### series.downColor `String|Function`

The series color when the open value is greater than the close value.

> The `downColor` option is supported when [series.type](#configuration-series.type) is set to "candlestick".

#### Example - set the chart series down color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "candlestick",
        downColor: "green",
        color: "red",
        data: [
          { open: 4, high: 5, low: 2, close: 3 },
          { open: 3, high: 5, low: 2, close: 4 }
        ]
      }]
    });
    </script>

### series.downColorField `String` *(default: "downColor")*

The data field containing the color applied when the open value is greater than the close value.

> The `downColorField` option is supported when [series.type](#configuration-series.type) is set to "candlestick".

#### Example - set the chart series down color field

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "candlestick",
        color: "red",
        downColorField:"down",
        data: [
          { open: 4, high: 5, low: 2, close: 3, down: "green" },
          { open: 3, high: 5, low: 2, close: 4 }
        ]
      }]
    });
    </script>

### series.segmentSpacing `Number` *(default: 0)*

The space in pixels between the different segments of the funnel chart.

> The `segmentSpacing` option is supported when [series.type](#configuration-series.type) is set to "funnel".

#### Example - set the chart series segmentSpacing field

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "funnel",
          segmentSpacing: 20,
          data: [
            { value: 1 },
            { value: 2 },
            { value: 3 }
          ]
        }
      ]
    });
    </script>

### series.summaryField `String` *(default: "summary")*

The data item field which contains the summary type for [waterfall](#configuration-series.type) series.
Summary columns are optional and can be one of two types:

* "runningTotal" - Displays the sum of all items since the last "runningTotal" point.
* "total" - Displays the sum of all previous items.

> The value, if any, of a data item marked as a summary point will be discarded.

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "waterfall",
        data: [{
            value: 100
        }, {
            value: -20
        }, {
            type: "runningTotal"
        }, {
            value: 50
        }, {
            type: "total"
        }]
      }]
    });
    </script>

### series.neckRatio `Number` *(default: 0.3)*

`neckRatio` specifies the ratio top-base/bottom-base of the whole chart. neckRatio set to three means the top base is three times smaller than the bottom base.

> The `neckRatio` option is supported when [series.type](#configuration-series.type) is set to "funnel" and dynamicSlope set to `false`.

#### Example - set the chart series neckRatio field

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "funnel",
          neckRatio: 0.1, //bottom base becomes 10 times smaller than the bottom one
          data: [
            { value: 1 },
            { value: 2 },
            { value: 3 }
          ]
        }
      ]
    });
    </script>

### series.dynamicSlope `Boolean` *(default: false)*

> The `dynamicSlope` option is supported when [series.type](#configuration-series.type) is set to "funnel".

When set to true the ratio of the bases of each segment is calculated based on the ratio of currentDataItem.value/nextDataItem.value
The last element is always created like a rectangle since there is no following element.


#### Example - set the chart series dynamicSlope field

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "funnel",
          dynamicSlope: true,
          data: [
            { value: 1 },
            { value: 2 },
            { value: 3 }
          ]
        }
      ]
    });
    </script>

### series.dynamicHeight `Boolean` *(default: true)*

> The `dynamicHeight` option is supported when [series.type](#configuration-series.type) is set to "funnel".

When set to `false` all segments become with the same height, otherwise the height of each segment is based on its value.

#### Example - set the chart series dynamicHeight field

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "funnel",
          dynamicHeight: true,
          data: [
            { value: 2 }, //height of this segment is 10% of the whole chart
            { value: 4 }, //height of this segment is 20% of the whole chart
            { value: 14 } //height of this segment is 70% of the whole chart
          ]
        }
      ]
    });
    </script>

### series.errorBars `Object`

The error bars of the chart series.

> The `errorBars` option is supported when [series.type](#configuration-series.type) is set to "bar", "column", "line", "area", "scatter", "scatterLine" or "bubble".

#### Example - set the chart series error bars

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "column",
        data: [4.743, 7.295, 7.175, 6.376],
        errorBars: {
          value: "stderr"
        }
      }]
    });
    </script>

### series.errorBars.value `String|Number|Array|Function`

The error bars value.

> The `value` option is supported when [series.type](#configuration-series.type) is set to "bar", "column", "line" or "area".

The following value types are supported:

* "stderr" - the [standard error](http://en.wikipedia.org/wiki/Standard_error) of the series values will be used to calculate the point low and high value
* "stddev(n)" - the [standard deviation](http://en.wikipedia.org/wiki/Standard_deviation) of the series values will be used to calculate the point low and high value. A number can be specified between the parentheses, that will be multiplied by the calculated standard deviation.
* "percentage(n)" - a percentage of the point value
* A number that will be subtracted/added to the point value
* An array that holds the low and high difference from the point value
* A function that returns the errorBars point value

#### Example - set the error bars value to a percentage of the point value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "column",
        data: [4.743, 7.295, 7.175, 6.376],
        errorBars: {
          value: "percentage(20)"
        }
      }]
    });
    </script>

#### Example - set the error bars value to a half of the series standard deviation

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "column",
        data: [4.743, 7.295, 7.175, 6.376],
        errorBars: {
          value: "stddev(0.5)"
        }
      }]
    });
    </script>

### series.errorBars.visual `Function`

A function that can be used to create a custom visual for the error bars. The available argument fields are:

* rect - the `kendo.geometry.Rect` that defines where the visual should be rendered.
* options - the error bar options.
* createVisual - a function that can be used to get the default visual.
* low - the error bar low value.
* high - the error bar high value.
* sender - the chart instance.

#### Example - use custom visual for the error bars

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          data: [4.743, 7.295, 7.175, 6.376],
          errorBars: {
            value: "stddev(0.5)",
            visual: function (e) {
              return kendo.drawing.Path.fromRect(e.rect, {
                fill: {
                  color: e.options.color
                }
              });
            }
          }
        }]
      });
    </script>

### series.errorBars.xValue `String|Number|Array|Function`

The xAxis error bars value. See the [series.errorBars.value option](#configuration-series.errorBars.value) for a list of the supported value types.

> The `xValue` option is supported when [series.type](#configuration-series.type) is set to "scatter", "scatterLine" or "bubble".

#### Example - set the error bars xAxis value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data:  [[16.4, 5.4], [13.7, 2], [25.4, 3], [19, 2], [10.9, 1], [13.6, 3.2]],
        errorBars: {
          xValue: "stderr"
        }
      }]
    });
    </script>

### series.errorBars.yValue `String|Number|Array|Function`

The yAxis error bars value. See the [series.errorBars.value option](#configuration-series.errorBars.value) for a list of the supported value types.

> The `yValue` option is supported when [series.type](#configuration-series.type) is set to "scatter", "scatterLine" or "bubble".

#### Example - set the error bars yAxis value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data:  [[16.4, 5.4], [13.7, 2], [25.4, 3], [19, 2], [10.9, 1], [13.6, 3.2]],
        errorBars: {
          yValue: "stderr"
        }
      }]
    });
    </script>

### series.errorBars.endCaps `Boolean` *(default: true)*

If set to `false`, the error bars caps will not be displayed. By default the caps are visible.

#### Example - hide the error bars caps

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "column",
        data: [4.743, 7.295, 7.175, 6.376],
        errorBars: {
          value: [0.5, 1],
          endCaps: false
        }
      }]
    });
    </script>

### series.errorBars.color `String`

The color of the error bars. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the error bars color to red

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "column",
        data: [4.743, 7.295, 7.175, 6.376],
        errorBars: {
          value: 2,
          color: "red"
        }
      }]
    });
    </script>

### series.errorBars.line `Object`

The error bars line options.

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "column",
        data: [4.743, 7.295, 7.175, 6.376],
        errorBars: {
          value: "stddev",
          line: {
            width: 3,
            dashType: "dash"
          }
        }
      }]
    });
    </script>

### series.errorBars.line.width `Number` *(default: 1)*

The width of the line.

#### Example - set the error bars line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "column",
        data: [4.743, 7.295, 7.175, 6.376],
        errorBars: {
          value: "stddev",
          line: {
            width: 5
          }
        }
      }]
    });
    </script>

### series.errorBars.line.dashType `String` *(default: "solid")*

The dash type of the error bars line.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the error bars line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "column",
        data: [4.743, 7.295, 7.175, 6.376],
        errorBars: {
          value: "stddev",
          line: {
            dashType: "dash"
          }
        }
      }]
    });
    </script>

### series.errorLowField `String` *(default: "errorLow")*

The data item field which contains the [series.errorBars](#configuration-series.errorBars) low value.

> The `errorLowField` option is supported when [series.type](#configuration-series.type) is set to "bar", "column", "line" or "area".

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "column",
        errorLowField: "low",
        errorHighField: "high",
        data: [{value: 4.743, low: 4.5, high: 5}, {value: 7.295, low: 7, high: 8}, {value: 6.376, low: 5, high: 6.5}]
      }]
    });
    </script>

### series.errorHighField `String` *(default: "errorHigh")*

The data item field which contains the [series.errorBars](#configuration-series.errorBars) high value.

> The `errorHighField` option is supported when [series.type](#configuration-series.type) is set to "bar", "column", "line" or "area".

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "column",
        errorLowField: "low",
        errorHighField: "high",
        data: [{value: 4.743, low: 4.5, high: 5}, {value: 7.295, low: 7, high: 8}, {value: 6.376, low: 5, high: 6.5}]
      }]
    });
    </script>

### series.xErrorLowField `String` *(default: "xErrorLow")*

The data item field which contains the [series.errorBars](#configuration-series.errorBars) xAxis low value.

> The `xErrorLowField` option is supported when [series.type](#configuration-series.type) is set to "scatter", "scatterLine" or "bubble".

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        xErrorLowField: "low",
        xErrorHighField: "high",
        data: [{x: 6.4, y: 13.4, low: 5, high: 7}, {x: 1.7, y: 11, low: 1, high: 3}, {x: 5.4, y: 8, low: 3, high: 6}]
      }]
    });
    </script>

### series.xErrorHighField `String` *(default: "xErrorHigh")*

The data item field which contains the [series.errorBars](#configuration-series.errorBars) xAxis high value.

> The `xErrorHighField` option is supported when [series.type](#configuration-series.type) is set to "scatter", "scatterLine" or "bubble".

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        xErrorLowField: "low",
        xErrorHighField: "high",
        data: [{x: 6.4, y: 13.4, low: 5, high: 7}, {x: 1.7, y: 11, low: 1, high: 3}, {x: 5.4, y: 8, low: 3, high: 6}]
      }]
    });
    </script>

### series.yErrorLowField `String` *(default: "yErrorLow")*

The data item field which contains the [series.errorBars](#configuration-series.errorBars) yAxis low value.

> The `yErrorLowField` option is supported when [series.type](#configuration-series.type) is set to "scatter", "scatterLine" or "bubble".

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        yErrorLowField: "low",
        yErrorHighField: "high",
        data: [{x: 6.4, y: 13.4, low: 12, high: 14}, {x: 1.7, y: 11, low: 11, high: 14}, {x: 5.4, y: 8, low: 5, high: 8}]
      }]
    });
    </script>

### series.yErrorHighField `String` *(default: "yErrorHigh")*

The data item field which contains the [series.errorBars](#configuration-series.errorBars) yAxis high value.

> The `yErrorHighField` option is supported when [series.type](#configuration-series.type) is set to "scatter", "scatterLine" or "bubble".

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        yErrorLowField: "low",
        yErrorHighField: "high",
        data: [{x: 6.4, y: 13.4, low: 12, high: 14}, {x: 1.7, y: 11, low: 11, high: 14}, {x: 5.4, y: 8, low: 5, high: 8}]
      }]
    });
    </script>

### series.explodeField `String` *(default: "explode")*

The data item field which contains a boolean value indicating whether the sector is exploded.

> The `explodeField` option is supported when [series.type](#configuration-series.type) is set to "donut" or "pie".

#### Example - set the chart series explode field

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "pie",
          explodeField: "isExploded",
          data: [
            { value: 1, isExploded: true },
            { value: 2 }, // isExpaded is missing, "false" is asumed
            { value: 3, isExploded: false }
          ]
        }
      ]
    });
    </script>

### series.field `String` *(default: "value")*

The data item field which contains the series value.

#### Example - set the chart series field

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [
          { price: 1 },
          { price: 2 },
          { price: 3 }
        ]
      },
      series: [{
        field: "price"
      }]
    });
    </script>

### series.fromField `String` *(default: "min")*

The data item field which contains the series from value.

#### Example - set the chart series fromField

	<div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [
          { from: 1, to: 5 },
          { from: 2, to: 6 },
          { from: 3, to: 7 }
        ]
      },
      series: [{
        fromField: "from"
      }]
    });
    </script>

### series.toField `String` *(default: "max")*

The data item field which contains the series to value.

#### Example - set the chart series toField

	<div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [
          { from: 1, to: 5 },
          { from: 2, to: 6 },
          { from: 3, to: 7 }
        ]
      },
      series: [{
        toField: "to"
      }]
    });
    </script>

### series.noteTextField `String` *(default: "noteText")*

The data item field which contains the series note text.

#### Example - set the chart series field

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [
          { price: 1, noteText: "A" },
          { price: 2 },
          { price: 3 }
        ]
      },
      series: [{
        field: "price",
        noteTextField: "noteText"
      }]
    });
    </script>

### series.lowerField `String` *(default: "lower")*

The data item field which contains the series lower value.

#### Example - set the chart series lower field

    $("#chart").kendoChart({
      dataSource: {
        data: [{
          lower: 1,
          q1: 2,
          median: 3,
          q3: 4,
          upper: 5,
          mean: 3.5,
          outliers: [0,0,0.5,6,7,11]
        }]
      },
      series: [{
         type: "boxPlot",
         lowerField: "lower",
         q1Field: "q1",
         medianField: "median",
         q3Field: "q3",
         upperField: "upper",
         meanField: "mean",
         outliersField: "outliers"
      }]
    });

### series.q1Field `String` *(default: "q1")*

The data item field which contains the series q1 value.

#### Example - set the chart series q1 field

    $("#chart").kendoChart({
      dataSource: {
        data: [{
          lower: 1,
          q1: 2,
          median: 3,
          q3: 4,
          upper: 5,
          mean: 3.5,
          outliers: [0,0,0.5,6,7,11]
        }]
      },
      series: [{
         type: "boxPlot",
         lowerField: "lower",
         q1Field: "q1",
         medianField: "median",
         q3Field: "q3",
         upperField: "upper",
         meanField: "mean",
         outliersField: "outliers"
      }]
    });

### series.medianField `String` *(default: "median")*

The data item field which contains the series median value.

#### Example - set the chart series median field

    $("#chart").kendoChart({
      dataSource: {
        data: [{
          lower: 1,
          q1: 2,
          median: 3,
          q3: 4,
          upper: 5,
          mean: 3.5,
          outliers: [0,0,0.5,6,7,11]
        }]
      },
      series: [{
         type: "boxPlot",
         lowerField: "lower",
         q1Field: "q1",
         medianField: "median",
         q3Field: "q3",
         upperField: "upper",
         meanField: "mean",
         outliersField: "outliers"
      }]
    });

### series.q3Field `String` *(default: "q3")*

The data item field which contains the series q3 value.

#### Example - set the chart series q3 field

    $("#chart").kendoChart({
      dataSource: {
        data: [{
          lower: 1,
          q1: 2,
          median: 3,
          q3: 4,
          upper: 5,
          mean: 3.5,
          outliers: [0,0,0.5,6,7,11]
        }]
      },
      series: [{
         type: "boxPlot",
         lowerField: "lower",
         q1Field: "q1",
         medianField: "median",
         q3Field: "q3",
         upperField: "upper",
         meanField: "mean",
         outliersField: "outliers"
      }]
    });

### series.upperField `String` *(default: "upper")*

The data item field which contains the series upper value.

#### Example - set the chart series upper field

    $("#chart").kendoChart({
      dataSource: {
        data: [{
          lower: 1,
          q1: 2,
          median: 3,
          q3: 4,
          upper: 5,
          mean: 3.5,
          outliers: [0,0,0.5,6,7,11]
        }]
      },
      series: [{
         type: "boxPlot",
         lowerField: "lower",
         q1Field: "q1",
         medianField: "median",
         q3Field: "q3",
         upperField: "upper",
         meanField: "mean",
         outliersField: "outliers"
      }]
    });

### series.meanField `String` *(default: "mean")*

The data item field which contains the series mean value.

#### Example - set the chart series mean field

    $("#chart").kendoChart({
      dataSource: {
        data: [{
          lower: 1,
          q1: 2,
          median: 3,
          q3: 4,
          upper: 5,
          mean: 3.5,
          outliers: [0,0,0.5,6,7,11]
        }]
      },
      series: [{
         type: "boxPlot",
         lowerField: "lower",
         q1Field: "q1",
         medianField: "median",
         q3Field: "q3",
         upperField: "upper",
         meanField: "mean",
         outliersField: "outliers"
      }]
    });

### series.outliersField `String` *(default: "outliers")*

The data item field which contains the series outliers value.

#### Example - set the chart series outliers field

    $("#chart").kendoChart({
      dataSource: {
        data: [{
          lower: 1,
          q1: 2,
          median: 3,
          q3: 4,
          upper: 5,
          mean: 3.5,
          outliers: [0,0,0.5,6,7,11]
        }]
      },
      series: [{
         type: "boxPlot",
         lowerField: "lower",
         q1Field: "q1",
         medianField: "median",
         q3Field: "q3",
         upperField: "upper",
         meanField: "mean",
         outliersField: "outliers"
      }]
    });

### series.gap `Number` *(default: 1.5)*

The distance between categories expressed as a percentage of the bar width.

See the related [spacing](#configuration-series.spacing) setting.

> The `gap` option is supported when [series.type](#configuration-series.type) is set to "bar", "column", "candlestick", "ohlc", "radarColumn" or "waterfall".

#### Example - remove distance between categories

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        gap: 0,
        data: [1, 2]
      }]
    });
    </script>

#### Example - overlap categories by half bar width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        gap: -0.5,
        data: [1, 2]
      }]
    });
    </script>

### series.highField `String` *(default: "high")*

The data field containing the high value.

> The `highField` option is supported when [series.type](#configuration-series.type) is set to "candlestick" or "ohlc".

#### Example - set the chart series high field
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "candlestick",
          highField: "highPrice",
          data: [
            { open: 1, highPrice: 2, low: 0.5, close: 1.5},
            { open: 2, highPrice: 3, low: 1, close: 1.5}
          ]
        }
      ]
    });
    </script>

### series.highlight `Object`

The chart series highlighting configuration options.

#### Example - configure the chart series highlighting

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "pie",
          data: [1, 2],
          highlight: {
            border: {
              opacity: 1,
              width: 5,
              color: "black"
            }
          }
      }]
    });
    </script>

### series.highlight.border `Object`

The border of the highlighted chart series. The color is computed automatically from the base point color.

> The `border` option is supported when [series.type](#configuration-series.type) is set to "donut", "bubble", "pie", "candlestick" or "ohlc".

#### Example - set the chart highlight border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "pie",
          data: [1, 2],
          highlight: {
            border: {
              width: 5,
              color: "black"
            }
          }
      }]
    });
    </script>

### series.highlight.border.color `String`

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart highlight border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "pie",
          data: [1, 2],
          highlight: {
            border: {
              color: "red",
              width: 5
            }
          }
      }]
    });
    </script>

### series.highlight.border.opacity `Number` *(default: 1)*

The opacity of the border. By default the border is opaque.

#### Example - set the chart highlight border opacity

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "pie",
          data: [1, 2],
          highlight: {
            border: {
              opacity: 0.5,
              width: 5
            }
          }
      }]
    });
    </script>

### series.highlight.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart highlight border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "pie",
          data: [1, 2],
          highlight: {
            border: {
              width: 5
            }
          }
      }]
    });
    </script>

### series.highlight.color `String`

The highlight color. Accepts a valid CSS color string, including hex and rgb.

> The `color` option is supported when [series.type](#configuration-series.type) is set to "donut" or "pie".

#### Example - set the chart highlight color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "donut",
          data: [1, 2],
          highlight: {
            color: "green"
          }
      }]
    });
    </script>

### series.highlight.line `Object`

The line of the highlighted chart series. The color is computed automatically from the base point color.

> The `line` option is supported when [series.type](#configuration-series.type) is set to "candlestick" or "ohlc".

#### Example - set the highlight line

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "ohlc",
          data: [
            { open: 1, high: 3, low: 0, close: 1 },
            { open: 2, high: 4, low: 1, close: 1.5 },
          ],
          highlight: {
            line: {
              width: 5,
              color: "green"
            }
          }
      }]
    });
    </script>

### series.highlight.line.color `String`

The line color. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the highlight line color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "ohlc",
          data: [
            { open: 1, high: 3, low: 0, close: 1 },
            { open: 2, high: 4, low: 1, close: 1.5 },
          ],
          highlight: {
            line: {
              color: "green"
            }
          }
      }]
    });
    </script>

### series.highlight.line.opacity `Number` *(default: 1)*

The opacity of the line. By default the border is opaque.

#### Example - set the highlight line opacity

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "ohlc",
          data: [
            { open: 1, high: 3, low: 0, close: 1 },
            { open: 2, high: 4, low: 1, close: 1.5 },
          ],
          highlight: {
            line: {
              opacity: 0.5,
              width: 10
            }
          }
      }]
    });
    </script>

### series.highlight.line.width `Number`

The width of the line.

#### Example - set the highlight line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "ohlc",
          data: [
            { open: 1, high: 3, low: 0, close: 1 },
            { open: 2, high: 4, low: 1, close: 1.5 },
          ],
          highlight: {
            line: {
              width: 5
            }
          }
      }]
    });
    </script>

### series.highlight.opacity `Number`

The opacity of the highlighted points.

> The `opacity` option is supported when [series.type](#configuration-series.type) is set to "bubble", "pie" or "donut".

#### Example - set the highlight opacity

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "pie",
          data: [1, 2],
          highlight: {
            opacity: 0.5
          }
      }]
    });
    </script>

### series.highlight.toggle `Function`

A function that can be used to handle toggling the points highlight. The available argument fields are:

* preventDefault - a function that can be used to prevent showing the default highlight overlay.
* show - a boolean value indicating whether the highlight should be shown.
* visual - the visual element that should be highlighted.
* category - the point category.
* dataItem - the point dataItem.
* value - the point value.
* series - the point series.

#### Example - using custom highlight

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          type: "pie",
          data: [1, 2],
          highlight: {
            toggle: function (e) {
              e.preventDefault();

              var opacity = e.show ? 0.5 : 1;
              e.visual.opacity(opacity);
            }
          }
        }]
      });
    </script>

### series.highlight.visible `Boolean` *(default: true)*

If set to `true` the chart will highlight the series when the user hovers it with the mouse.
By default chart series highlighting is enabled.

#### Example - prevent the chart series highlighting

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
          type: "pie",
          data: [1, 2],
          highlight: {
            visible: false
          }
      }]
    });
    </script>

### series.highlight.visual `Function`

A function that can be used to set custom visual for the point highlight.

The available argument fields are:

* createVisual - a function that can be used to get the default highlight visual.
* rect - the `kendo.geometry.Rect` that defines where the visual should be rendered.
* visual - the visual element that should be highlighted.
* options - the point options.
* category - the point category.
* dataItem - the point dataItem.
* value - the point value.
* sender - the chart instance.
* series - the point series.
* percentage - the point value represented as a percentage value. Available only for donut, pie and 100% stacked charts.
* runningTotal - the sum of point values since the last "runningTotal" [summary point](#configuration-series.summaryField). Available for waterfall series.
* total - the sum of all previous series values. Available for waterfall series.

#### Example - use custom highlight visual

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [ {
          type: "area",
          data: [1, 2, 3],
          highlight: {
            visual: function(e) {
              var center = e.rect.center();
              var circleGeometry = new kendo.geometry.Circle(center, 10);
              var circle = new kendo.drawing.Circle(circleGeometry, {
                fill: {
                  color: "red"
                }
              });
              return circle;
            }
          }
        }]
      });
    </script>

### series.holeSize `Number`

The diameter of the donut hole in pixels.

> The `holeSize` option is supported when [series.type](#configuration-series.type) is set to "donut".

#### Example - set the donut chart hole size
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "donut",
          holeSize: 80,
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.labels `Object`

The chart series label configuration.

> The chart displays the series labels when the [series.labels.visible](#configuration-series.labels.visible) option is set to `true`.

#### Example - configure the chart series label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        labels: {
          visible: true,
          background: "green",
          border: {
            width: 2,
            color: "black"
          }
        },
        data: [1, 2]
      }]
    });
    </script>

### series.labels.align `String`

The label alignment when [series.type](#configuration-series.type) is set to "donut", "funnel" or "pie".

The supported values  for "donut" and "pie" are:

* "circle" - the labels are positioned in circle around the chart.
* "column" - the labels are positioned in columns to the left and right of the chart.

The supported values for "funnel" are:

* "center" - the labels are positioned in the center over the funnel segment.
* "right" - the labels are positioned on the right side of the chart and do not (if there is enough space) overlap the funnel segment(s).
* "left" - the labels are positioned on the left side of the chart and do not (if there is enough space) overlap the funnel segment(s).


#### Example - set the chart series label alignment
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        labels: {
          visible: true,
          align: "column"
        },
        type: "pie",
        data: [1, 2, 3, 4, 5, 6]
      }]
    });
    </script>

### series.labels.background `String|Function`

The background color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series label background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        labels: {
          visible: true,
          background: "green"
        },
        data: [1, 2]
      }]
    });
    </script>

### series.labels.border `Object`

The border of the labels.

#### Example - set the chart series label border
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          data: [1, 2, 3],
          labels: {
            visible: true,
            border: {
              color: "green",
              dashType: "dashDot",
              width: 1
            }
          }
        }
      ]
    });
    </script>

### series.labels.border.color `String|Function` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          data: [1, 2, 3],
          labels: {
            visible: true,
            border: {
              color: "green",
              width: 1
            }
          }
        }
      ]
    });
    </script>

### series.labels.border.dashType `String|Function` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the chart series label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          data: [1, 2, 3],
          labels: {
            visible: true,
            border: {
              dashType: "dashDot",
              width: 1
            }
          }
        }
      ]
    });
    </script>

### series.labels.border.width `Number|Function` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart series label border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          data: [1, 2, 3],
          labels: {
            visible: true,
            border: {
              width: 1
            }
          }
        }
      ]
    });
    </script>

### series.labels.color `String|Function`

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          labels: {
            visible: true,
            color: "#aa00bb"
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

#### Example - set the chart series label color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          labels: {
            visible: true,
            color: "rgb(128, 0, 255)"
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

#### Example - set the chart series label color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          labels: {
            visible: true,
            color: "green"
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.labels.distance `Number` *(default: 35)*

The distance of the labels when [series.type](#configuration-series.type) is set to "donut" or "pie".

#### Example - set the chart series label distance
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        labels: {
          visible: true,
          distance: 70
        },
        type: "pie",
        data: [1, 2, 3, 4, 5, 6]
      }]
    });
    </script>

### series.labels.font `String|Function` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example - set the chart series label font
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        labels: {
          visible: true,
          font: "20px sans-serif"
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.labels.format `String|Function` *(default: "{0}")*

The format of the labels. Uses [kendo.format](/api/javascript/kendo#methods-format).

#### Example - set the chart series label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        labels: {
          visible: true,
          format: "{0:C}"
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.labels.margin `Number|Object` *(default: 5)*

The margin of the labels. A numeric value will set all margins.

#### Example - set the chart series label margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          margin: 10,
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.labels.margin.bottom `Number` *(default: 0)*

The bottom margin of the labels.

#### Example - set the chart series label bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          margin: {
            bottom: 10
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.labels.margin.left `Number` *(default: 0)*

The left margin of the labels.

#### Example - set the chart series label left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          margin: {
            left: 10
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.labels.margin.right `Number` *(default: 0)*

The right margin of the labels.

#### Example - set the chart series label right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          margin: {
            right: 10
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.labels.margin.top `Number` *(default: 0)*

The top margin of the labels.

#### Example - set the chart series label top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          margin: {
            top: 10
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.labels.padding `Number|Object` *(default: 0)*

The padding of the labels. A numeric value will set all paddings.

> Bar and column series always apply full padding and will ignore this setting.

#### Example - set the chart series label padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          padding: 10,
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.labels.padding.bottom `Number` *(default: 0)*

The bottom padding of the labels.

#### Example - set the chart series label bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          padding: {
            bottom: 10
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.labels.padding.left `Number` *(default: 0)*

The left padding of the labels.

#### Example - set the chart series label left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          padding: {
            left: 10
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.labels.padding.right `Number` *(default: 0)*

The right padding of the labels.

#### Example - set the chart series label right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          padding: {
            right: 10
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.labels.padding.top `Number` *(default: 0)*

The top padding of the labels.

#### Example - set the chart series label top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          padding: {
            top: 10
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.labels.position `String|Function`

The position of the labels.

* "above" - the label is positioned at the top of the marker. ** Applicable for series that render points, incl. bubble. **
* "below" - the label is positioned at the bottom of the marker. ** Applicable for series that render points, incl. bubble. **
* "center" - the label is positioned at the point center. ** Applicable for bar, column, donut, pie, funnel, radarColumn and waterfall series. **
* "insideBase" - the label is positioned inside, near the base of the bar. ** Applicable for bar, column and waterfall series. **
* "insideEnd" - the label is positioned inside, near the end of the point. ** Applicable for bar, column, donut, pie, radarColumn and waterfall series. **
* "left" - the label is positioned to the left of the marker. ** Applicable for series that render points, incl. bubble. **
* "outsideEnd" - the label is positioned outside, near the end of the point. ** Applicable for bar, column, donut, pie, radarColumn and waterfall series. Not applicable for stacked series.
* "right" - the label is positioned to the right of the marker. ** Applicable for series that render points, incl. bubble. **
* "top" - the label is positioned at the top of the segment. ** Applicable for funnel series **
* "bottom" - the label is positioned at the bottom of the segment. ** Applicable for funnel series **


#### Example - set the chart series label position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        labels: {
          visible: true,
          position: "center"
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.labels.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the chart series label.

The fields which can be used in the template are:

* category - the category name. Available for area, bar, column, bubble, donut, line, pie and waterfall series.
* dataItem - the original data item used to construct the point. Will be null if binding to array.
* percentage - the point value represented as a percentage value. Available only for donut, pie and 100% stacked charts.
* series - the data series
* value - the point value. Can be a number or object containing each bound field.
* runningTotal - the sum of point values since the last "runningTotal" [summary point](#configuration-series.summaryField). Available for waterfall series.
* total - the sum of all previous series values. Available for waterfall series.

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example - set the chart series label template

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        labels: {
          visible: true,
          template: "Value: #: value #%"
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.labels.visible `Boolean|Function` *(default: false)*

If set to `true` the chart will display the series labels. By default chart series labels are not displayed.

#### Example - show the chart series labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        labels: {
          visible: true
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.labels.visual `Function`

A function that can be used to create a custom visual for the labels. The available argument fields are:

* text - the label text.
* rect - the `kendo.geometry.Rect` that defines where the visual should be rendered.
* options - the label options.
* createVisual - a function that can be used to get the default visual.
* sender - the chart instance (may be undefined).

#### Example - using custom visual for the labels

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [ {
          labels: {
            visible: true,
            visual: function(e) {
              var center = e.rect.center();
              return new kendo.drawing.Text(e.text, [center.x, e.rect.origin.y], {
                fill: {
                  color: "red"
                }
              });
            }
          },
          data: [1, 2, 3]
        }]
      });
    </script>

### series.labels.from `Object`

The chart series **from** label configuration.

> The chart displays the series **from** labels when the [series.labels.visible](#configuration-series.labels.visible) option is set to `true` or when the [series.labels.from.visible](#configuration-series.labels.from.visible) option is set to `true`.

### series.labels.from.background `String|Function`

The background color of the **from** labels. Accepts a valid CSS color string, including hex and rgb.

### series.labels.from.border `Object`

The border of the **from** labels.

### series.labels.from.border.color `String|Function` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

### series.labels.from.border.dashType `String|Function` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### series.labels.from.border.width `Number|Function` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

### series.labels.from.color `String|Function`

The text color of the **from** labels. Accepts a valid CSS color string, including hex and rgb.

### series.labels.from.font `String|Function` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the **from** labels.

### series.labels.from.format `String|Function` *(default: "{0}")*

The format of the **from** labels. Uses [kendo.format](/api/javascript/kendo#methods-format).

### series.labels.from.margin `Number|Object` *(default: 5)*

The margin of the **from** labels. A numeric value will set all margins.

### series.labels.from.margin.bottom `Number` *(default: 0)*

The bottom margin of the **from** labels.

### series.labels.from.margin.left `Number` *(default: 0)*

The left margin of the **from** labels.

### series.labels.from.margin.right `Number` *(default: 0)*

The right margin of the **from** labels.

### series.labels.from.margin.top `Number` *(default: 0)*

The top margin of the **from** labels.

### series.labels.from.padding `Number|Object` *(default: 0)*

The padding of the **from** labels. A numeric value will set all paddings.

### series.labels.from.padding.bottom `Number` *(default: 0)*

The bottom padding of the **from** labels.

### series.labels.from.padding.left `Number` *(default: 0)*

The left padding of the **from** labels.

### series.labels.from.padding.right `Number` *(default: 0)*

The right padding of the **from** labels.

### series.labels.from.padding.top `Number` *(default: 0)*

The top padding of the **from** labels.

### series.labels.from.position `String|Function`

The position of the **from** labels.

* "center" - the label is positioned at the point center.
* "insideBase" - the label is positioned inside, near the base of the bar.
* "insideEnd" - the label is positioned inside, near the end of the point.
* "outsideEnd" - the label is positioned outside, near the end of the point.

### series.labels.from.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the chart series **from** label.

The fields which can be used in the template are:

* category - the category name. Available for area, bar, column, bubble, donut, line, pie and waterfall series.
* dataItem - the original data item used to construct the point. Will be null if binding to array.
* percentage - the point value represented as a percentage value. Available only for donut, pie and 100% stacked charts.
* series - the data series
* value - the point value. Can be a number or object containing each bound field.
* runningTotal - the sum of point values since the last "runningTotal" [summary point](#configuration-series.summaryField). Available for waterfall series.
* total - the sum of all previous series values. Available for waterfall series.

> The text can be split into multiple lines by using line feed characters ("\n").

### series.labels.from.visible `Boolean|Function` *(default: false)*

If set to `true` the chart will display the series **from** labels. By default chart series **from** labels are not displayed.

### series.labels.to `Object`

The chart series **to** label configuration.

> The chart displays the series **to** labels when the [series.labels.visible](#configuration-series.labels.visible) option is set to `true` or when the [series.labels.to.visible](#configuration-series.labels.to.visible) option is set to `true`.

### series.labels.to.background `String|Function`

The background color of the **to** labels. Accepts a valid CSS color string, including hex and rgb.

### series.labels.to.border `Object`

The border of the **to** labels.

### series.labels.to.border.color `String|Function` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

### series.labels.to.border.dashType `String|Function` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### series.labels.to.border.width `Number|Function` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

### series.labels.to.color `String|Function`

The text color of the **to** labels. Accepts a valid CSS color string, including hex and rgb.

### series.labels.to.font `String|Function` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the **to** labels.

### series.labels.to.format `String|Function` *(default: "{0}")*

The format of the **to** labels. Uses [kendo.format](/api/javascript/kendo#methods-format).

### series.labels.to.margin `Number|Object` *(default: 5)*

The margin of the **to** labels. A numeric value will set all margins.

### series.labels.to.margin.bottom `Number` *(default: 0)*

The bottom margin of the **to** labels.

### series.labels.to.margin.left `Number` *(default: 0)*

The left margin of the **to** labels.

### series.labels.to.margin.right `Number` *(default: 0)*

The right margin of the **to** labels.

### series.labels.to.margin.top `Number` *(default: 0)*

The top margin of the **to** labels.

### series.labels.to.padding `Number|Object` *(default: 0)*

The padding of the **to** labels. A numeric value will set all paddings.

### series.labels.to.padding.bottom `Number` *(default: 0)*

The bottom padding of the **to** labels.

### series.labels.to.padding.left `Number` *(default: 0)*

The left padding of the **to** labels.

### series.labels.to.padding.right `Number` *(default: 0)*

The right padding of the **to** labels.

### series.labels.to.padding.top `Number` *(default: 0)*

The top padding of the **to** labels.

### series.labels.to.position `String|Function`

The position of the **to** labels.

* "center" - the label is positioned at the point center.
* "insideBase" - the label is positioned inside, near the base of the bar.
* "insideEnd" - the label is positioned inside, near the end of the point.
* "outsideEnd" - the label is positioned outside, near the end of the point.

### series.labels.to.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the chart series **to** label.

The fields which can be used in the template are:

* category - the category name. Available for area, bar, column, bubble, donut, line, pie and waterfall series.
* dataItem - the original data item used to construct the point. Will be null if binding to array.
* percentage - the point value represented as a percentage value. Available only for donut, pie and 100% stacked charts.
* series - the data series
* value - the point value. Can be a number or object containing each bound field.
* runningTotal - the sum of point values since the last "runningTotal" [summary point](#configuration-series.summaryField). Available for waterfall series.
* total - the sum of all previous series values. Available for waterfall series.

> The text can be split into multiple lines by using line feed characters ("\n").

### series.labels.to.visible `Boolean|Function` *(default: false)*

If set to `true` the chart will display the series **to** labels. By default chart series **to** labels are not displayed.

### series.line `String|Object`

The chart line configuration options.

> The `line` option is supported when the [series.type](#configuration-series.type) option is set to "area", "candlestick", "ohlc" or "waterfall".

#### Example - configure the chart line options

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "area",
        line: {
          color: "green",
          width: 5
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.line.color `String`

The line color. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart line color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "area",
        line: {
          color: "green",
          width: 5
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.line.opacity `Number` *(default: 1)*

The line opacity. By default the line is opaque.

#### Example - set the chart line opacity
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "area",
        line: {
          color: "green",
          opacity: 0.5,
          width: 5
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.line.width `String` *(default: 4)*

The line width in pixels.

#### Example - set the chart line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "area",
        line: {
          color: "green",
          opacity: 0.5,
          width: 5
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.line.style `String` *(default: "normal")*

The supported values are:

* "normal" - The values will be connected with straight line.
* "step" - The values will be connected with a line with right angle.
* "smooth" - The values will be connected with a smooth line.

> The default value is "normal".

> The `style` option is supported when [series.type](#configuration-series.type) is set to "area", "polarArea" or "radarArea".

> The `step` value is supported only when [series.type](#configuration-series.type) is set to "area".

#### Example - set the chart line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "area",
        line: {
          color: "green",
          opacity: 0.5,
          width: 5,
          style: "step"
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.lowField `String` *(default: "low")*

The data field containing the low value.

> The `lowField` option is supported when [series.type](#configuration-series.type) is set to "candlestick" or "ohlc".

#### Example - set the chart series high field
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "candlestick",
          lowField: "lowPrice",
          data: [
            { open: 1, high: 2, low: 0.5, lowPrice: 1.5},
            { open: 2, high: 3, low: 1, lowPrice: 1.5}
          ]
        }
      ]
    });
    </script>

### series.margin `Number|Object` *(default: 1)*

The margin around each donut series (ring). A numeric value will set all margins.

#### Example - set the chart donut series margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "donut",
        margin: 30,
        data: [1, 2, 3]
      },{
        type: "donut",
        data: [1, 2, 3]
      }]
    });
    </script>

### series.margin.bottom `Number` *(default: 0)*

The bottom margin of the labels.

#### Example - set the chart donut series bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "donut",
        margin: {
          bottom: 30
        },
        data: [1, 2, 3]
      },{
        type: "donut",
        data: [1, 2, 3]
      }]
    });
    </script>

### series.margin.left `Number` *(default: 0)*

The left margin of the labels.

#### Example - set the chart donut series left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "donut",
        margin: {
          left: 30
        },
        data: [1, 2, 3]
      },{
        type: "donut",
        data: [1, 2, 3]
      }]
    });
    </script>

### series.margin.right `Number` *(default: 0)*

The right margin of the labels.

#### Example - set the chart donut series right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "donut",
        margin: {
          right: 30
        },
        data: [1, 2, 3]
      },{
        type: "donut",
        data: [1, 2, 3]
      }]
    });
    </script>

### series.margin.top `Number` *(default: 0)*

The top margin of the labels.

#### Example - set the chart donut series top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "donut",
        margin: {
          top: 30
        },
        data: [1, 2, 3]
      },{
        type: "donut",
        data: [1, 2, 3]
      }]
    });
    </script>

### series.markers `Object`

The chart series marker configuration.

> The chart displays the series labels when the [series.markers.visible](#configuration-series.markers.visible) option is set to `true`.
> The `markers` option is supported when [series.type](#configuration-series.type) is set to "area", "line", "scatter", "scatterLine", "radarLine", "radarArea", "polarLine", "polarScatter" or "polarArea".

#### Example - set the chart series markers

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "line",
        markers: {
          visible: true,
          background: "green",
          size: 30
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.markers.background `String|Function`

The background color of the series markers.

#### Example - set the chart series markers background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "line",
        markers: {
          visible: true,
          background: "green"
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.markers.border `Object|Function`

The border of the markers.

#### Example - set the chart series markers border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "line",
        markers: {
          visible: true,
          border: {
            width: 2,
            color: "green"
          }
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.markers.border.color `String|Function` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series markers border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "line",
        markers: {
          visible: true,
          border: {
            width: 2,
            color: "green"
          }
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.markers.border.width `Number|Function` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart series markers border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "line",
        markers: {
          visible: true,
          border: {
            width: 2
          }
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.markers.size `Number|Function` *(default: 6)*

The marker size in pixels.

#### Example - set the chart markers size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "line",
        markers: {
          visible: true,
          size: 30
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.markers.type `String|Function` *(default: "circle")*

The markers shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.

#### Example - set the chart series marker shape

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "line",
        markers: {
          visible: true,
          type: "triangle",
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.markers.visible `Boolean|Function` *(default: false)*

If set to `true` the chart will display the series markers. By default chart series markers are not displayed.

#### Example - display the chart series markers

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "line",
        markers: {
          visible: true
        },
        data: [1, 2, 3]
      }]
    });
    </script>

### series.markers.visual `Function`

A function that can be used to create a custom visual for the markers. The available argument fields are:

* rect - the `kendo.geometry.Rect` that defines where the visual should be rendered.
* options - the marker options.
* createVisual - a function that can be used to get the default visual.
* category - the category of the marker point.
* dataItem - the dataItem of the marker point.
* value - the value of the marker point.
* sender - the chart instance.
* series - the series of the marker point.

#### Example - use custom visual for the markers

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          type: "line",
          markers: {
            visual: function (e) {
              var origin = e.rect.origin;
              var center = e.rect.center();
              var bottomRight = e.rect.bottomRight();

              var path = new kendo.drawing.Path({
                fill: {
                  color: e.options.border.color
                }
              })
              .moveTo(origin.x, bottomRight.y)
              .lineTo(bottomRight.x, bottomRight.y)
              .lineTo(center.x, origin.y)
              .close();

              return path;
            }
          },
          data: [1, 2, 3]
        }]
      });
    </script>

### series.markers.rotation `Number|Function`

The rotation angle of the markers.

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "line",
        data: [200, 450, 300, 125],
        markers: {
          type: "square",
          rotation: 45
        }
      }]
    });
    </script>

#### Example

    $("#chart").kendoChart({
      dataSource: {
        data: [{
          speed: 2,
          dir: 45
        }, {
          speed: 4.6,
          dir: 180
        }]
      },
      series: [{
         type: "line",
         field: "speed",
         markers: {
          type: "triangle",
          size: 20,
          rotation: function(point) {
              // "Bind" rotation to dataItem field
              return point.dataItem.dir;
          }
         }
      }]
    });

### series.outliers `Object`

The chart series outliers configuration.

#### Example - set the chart series outliers

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "boxPlot",
        outliers: {
          background: "green",
          size: 30
        },
        data: [1,2,3,4,5,3.5,[0,0,0.5,6,7,11]]
      }]
    });
    </script>

### series.outliers.background `String|Function`

The background color of the series outliers.

#### Example - set the chart series outliers background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "boxPlot",
        outliers: {
          background: "green"
        },
        data: [1,2,3,4,5,3.5,[0,0,0.5,6,7,11]]
      }]
    });
    </script>

### series.outliers.border `Object|Function`

The border of the outliers.

#### Example - set the chart series outliers border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "boxPlot",
        outliers: {
          border: {
            width: 2,
            color: "green"
          }
        },
        data: [1,2,3,4,5,3.5,[0,0,0.5,6,7,11]]
      }]
    });
    </script>

### series.outliers.border.color `String|Function` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series outliers border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "boxPlot",
        outliers: {
          border: {
            width: 2,
            color: "green"
          }
        },
        data: [1,2,3,4,5,3.5,[0,0,0.5,6,7,11]]
      }]
    });
    </script>

### series.outliers.border.width `Number|Function` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart series outliers border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "boxPlot",
        outliers: {
          border: {
            width: 2
          }
        },
        data: [1,2,3,4,5,3.5,[0,0,0.5,6,7,11]]
      }]
    });
    </script>

### series.outliers.size `Number|Function` *(default: 6)*

The marker size in pixels.

#### Example - set the chart outliers size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "boxPlot",
        outliers: {
          size: 30
        },
        data: [1,2,3,4,5,3.5,[0,0,0.5,6,7,11]]
      }]
    });
    </script>

### series.outliers.type `String|Function` *(default: "circle")*

The outliers shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.

#### Example - set the chart series marker shape

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "boxPlot",
        outliers: {
          type: "triangle",
        },
        data: [1,2,3,4,5,3.5,[0,0,0.5,6,7,11]]
      }]
    });
    </script>

### series.outliers.rotation `Number|Function`

The rotation angle of the outliers.

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "boxPlot",
        data: [1,2,3,4,5,3.5,[0,0,0.5,6,7,11]],
        outliers: {
          type: "square",
          rotation: 45
        }
      }]
    });
    </script>

#### Example

    $("#chart").kendoChart({
      dataSource: {
        data: [{
          lower: 1,
          q1: 2,
          median: 3,
          q3: 4,
          upper: 5,
          mean: 3.5,
          outliers: [0,0,0.5,6,7,11]
        }]
      },
      series: [{
         type: "boxPlot",
         lowerField: "lower",
         q1Field: "q1",
         medianField: "median",
         q3Field: "q3",
         upperField: "upper",
         meanField: "mean",
         outliersField: "outliers",
         outliers: {
          type: "triangle",
          size: 20,
          rotation: function(point) {
              // "Bind" rotation to dataItem field
              return point.dataItem.dir;
          }
         }
      }]
    });

### series.extremes `Object`

The chart series extremes configuration.

#### Example - set the chart series extremes

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "boxPlot",
        extremes: {
          background: "green",
          size: 30
        },
        data: [1,2,3,4,5,3.5,[0,0,0.5,6,7,11]]
      }]
    });
    </script>

### series.extremes.background `String|Function`

The background color of the series outliers.

#### Example - set the chart series outliers background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "boxPlot",
        extremes: {
          background: "green"
        },
        data: [1,2,3,4,5,3.5,[0,0,0.5,6,7,11]]
      }]
    });
    </script>

### series.extremes.border `Object|Function`

The border of the extremes.

#### Example - set the chart series extremes border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "boxPlot",
        extremes: {
          border: {
            width: 2,
            color: "green"
          }
        },
        data: [1,2,3,4,5,3.5,[0,0,0.5,6,7,11]]
      }]
    });
    </script>

### series.extremes.border.color `String|Function` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series extremes border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "boxPlot",
        extremes: {
          border: {
            width: 2,
            color: "green"
          }
        },
        data: [1,2,3,4,5,3.5,[0,0,0.5,6,7,11]]
      }]
    });
    </script>

### series.extremes.border.width `Number|Function` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart series extremes border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "boxPlot",
        extremes: {
          border: {
            width: 2
          }
        },
        data: [1,2,3,4,5,3.5,[0,0,0.5,6,7,11]]
      }]
    });
    </script>

### series.extremes.size `Number|Function` *(default: 6)*

The extremes size in pixels.

#### Example - set the chart extremes size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "boxPlot",
        extremes: {
          size: 30
        },
        data: [1,2,3,4,5,3.5,[0,0,0.5,6,7,11]]
      }]
    });
    </script>

### series.extremes.type `String|Function` *(default: "circle")*

The extremes shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.

#### Example - set the chart series extremes shape

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "boxPlot",
        extremes: {
          type: "triangle",
        },
        data: [1,2,3,4,5,3.5,[0,0,0.5,6,7,11]]
      }]
    });
    </script>

### series.extremes.rotation `Number|Function`

The rotation angle of the extremes.

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "boxPlot",
        data: [1,2,3,4,5,3.5,[0,0,0.5,6,7,11]],
        extremes: {
          type: "square",
          rotation: 45
        }
      }]
    });
    </script>

#### Example

    $("#chart").kendoChart({
      dataSource: {
        data: [{
          lower: 1,
          q1: 2,
		  median: 3,
		  q3: 4,
		  upper: 5,
          mean: 3.5,
          outliers: [0,0,0.5,6,7,11]
        }]
      },
      series: [{
         type: "boxPlot",
         lowerField: "lower",
         q1Field: "q1",
         medianField: "median",
         q3Field: "q3",
         upperField: "upper",
         meanField: "mean",
         outliersField: "outliers",
         extremes: {
          type: "triangle",
          size: 20,
          rotation: function(point) {
              // "Bind" rotation to dataItem field
              return point.dataItem.dir;
          }
         }
      }]
    });

### series.maxSize `Number` *(default: 100)*

The maximum size of the chart bubble series marker.

#### Example - set the bubble chart series max marker size
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "bubble",
        maxSize: 40,
        data: [
          [1, 2, 3],
          [2, 3, 4]
        ]
      }]
    });
    </script>

### series.minSize `Number` *(default: 5)*

The minimum size of the chart bubble series marker.

#### Example - set the bubble chart series min marker size
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "bubble",
        minSize: 40,
        data: [
          [1, 2, 3],
          [2, 3, 4]
        ]
      }]
    });
    </script>

### series.missingValues `String`

The behavior for handling missing values. The supported values are:

* "gap" - the plot stops before the missing point and continues after it.
* "interpolate" - the value is interpolated from neighboring points.
* "zero" - the value is assumed to be zero.

> The default value is "interpolate", except for "area" and stacked series which default to "zero".

> The `missingValues` option is supported when [series.type](#configuration-series.type) is set to "area", "line", "scatterLine", "radarLine", "radarArea", "polarLine" or "polarArea".

#### Example - set the missing values behavior
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
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

> The `style` option is supported when [series.type](#configuration-series.type) is set to "line", "scatterLine", "radarLine" or "polarLine".

> The `step` value is only supported when [series.type](#configuration-series.type) is set to "line".

> The `smooth` options is not supported for stacked area series with missing values.

#### Example - set the style behavior
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "line",
        style: "step",
        data: [1, 2, 3, 4, 5]
      }]
    });
    </script>

### series.name `String`

The name of the chart series which is visible in the legend.

#### Example - set the chart series name
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { name: "Series 1", data: [1, 2] },
        { name: "Series 2", data: [2, 3] }
      ]
    });
    </script>

The name can also be a [template](/api/javascript/kendo#methods-template) which sets the name of the series when bound to grouped data source.

The fields which can be used in the template are:

*   series - the series options
*   group - the data group
*   group.field - the name of the field used for grouping
*   group.value - the field value for this group
*   group.items - the data items in this group

#### Example - set the chart series group name template
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [
          { value: 1, category: "One", title: "Series One" },
          { value: 2, category: "Two", title: "Series Two" }
        ],
        group: { field: "category" }
      },
      series: [
        {
          field: "value",
          name: "Category: #: group.items[0].title #"
        }
      ]
    });
    </script>

### series.negativeColor `String`

The color to use for bar, column or waterfall series with negative values. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart column series negative color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        missingValues: "interpolate",
        data: [-1, 1, 2, -2],
        negativeColor: "green"
      }]
    });
    </script>

### series.negativeValues `Object`

The options for displaying the chart negative bubble values.

#### Example - set the chart negative bubbles

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "bubble",
        negativeValues: {
          color: "green",
          visible: true
        },
        data: [
          [-1, 2, -3],
          [2, 3, 4]
        ]
      }]
    });
    </script>

### series.negativeValues.color `String` *(default: "#ffffff")*

The color of the chart negative bubble values.

#### Example - set the chart negative bubbles color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "bubble",
        negativeValues: {
          color: "green",
          visible: true
        },
        data: [
          [-1, 2, -3],
          [2, 3, 4]
        ]
      }]
    });
    </script>

### series.negativeValues.visible `Boolean` *(default: false)*

If set to `true` the chart will display the negative bubbles. By default the negative bubbles are not displayed.

#### Example - show the chart negative bubbles

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "bubble",
        negativeValues: {
          visible: true
        },
        data: [
          [-1, 2, -3],
          [2, 3, 4]
        ]
      }]
    });
    </script>

### series.opacity `Number` *(default: 1)*

The series opacity. By default the series are opaque.

#### Example - set the chart series opacity
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        opacity: 0.5,
        data: [ 1, 2, 3]
      }]
    });
    </script>

### series.openField `String`

The data field containing the open value.

> The `openField` option is supported when [series.type](#configuration-series.type) is set to "candlestick" or "ohlc".

#### Example - set the chart series high field
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "candlestick",
          openField: "openPrice",
          data: [
            { open: 1, high: 2, low: 0.5, openPrice: 1.5},
            { open: 2, high: 3, low: 1, openPrice: 1.5}
          ]
        }
      ]
    });
    </script>

### series.overlay `Object`

The chart series overlay options.

#### Example - set the chart series overlay options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        overlay: {
          gradient: "none"
        },
        data: [ 1, 2, 3]
      }]
    });
    </script>

### series.overlay.gradient `String`

The chart series gradient.

The supported values are:

* "glass" (bar, column and candlestick series)
* "none"
* "roundedBevel" (donut and pie series)
* "sharpBevel" (donut and pie series)

#### Example - set the chart series gradient options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        overlay: {
          gradient: "none"
        },
        data: [ 1, 2, 3]
      }]
    });
    </script>

### series.padding `Number`

The padding around the chart (equal on all sides).

> The `padding` option is supported when [series.type](#configuration-series.type) is set to "donut" or "pie".

#### Example - set the donut chart series padding
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "donut",
        padding: 60,
        data: [ 1, 2, 3]
      }]
    });
    </script>

### series.size `Number`

The or radius of the chart donut series in pixels. If not set, the available space is split evenly between the series.

#### Example - set the donut chart series size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "donut",
        size: 100,
        data: [ 1, 2, 3]
      }]
    });
    </script>

### series.sizeField `String` *(default: "size")*

The data field containing the bubble size value.

#### Example - set the bubble chart series size field

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "bubble",
        sizeField: "price",
        data: [
          { x: 1, y: 2, price: 3 }
        ]
      }]
    });
    </script>

### series.spacing `Number` *(default: 0.4)*

The distance between series points within a category. Expressed as a percentage of the bar width.

See the related [gap](#configuration-series.gap) setting.

> The `spacing` option is supported when [series.type](#configuration-series.type) is set to "bar", "column", "candlestick", "ohlc" or "radarColumn".

#### Example - remove spacing between series points

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        spacing: 0
      },
      series: [{
        data: [1, 2, 3]
      }, {
        data: [1, 2, 3]
      }]
    });
    </script>

### series.stack `Boolean|String|Object` *(default: false)*

A boolean value indicating if the series should be stacked.
A string value is interpreted as [series.stack.group](#configuration-series.stack.group).

> The `stack` options is supported when [series.type](#configuration-series.type) is set to "bar", "column", "line", "area", "verticalLine", "verticalArea", "radarLine", "radarArea" and "radarColumn".

> Stack settings of the first series are applied to the rest of the series.

#### Example - configure stack series

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
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

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { stack: { type: "100%" }, data: [ 1, 2 ] },
        { data: [ 10, 20 ] }
      ]
    });
    </script>

### series.stack.group `String`

Indicates that the series should be stacked in a group with the specified name.

> The `group` option is supported when [series.type](#configuration-series.type) is set to "bar" or "column".

#### Example - configure stack groups

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { stack: { group: "a" }, data: [ 1, 2 ] },
        { stack: { group: "a" }, data: [ 3, 4 ] },
        { stack: { group: "b" }, data: [ -1, -2 ] },
        { stack: { group: "b" }, data: [ -3, -4 ] }
      ]
    });
    </script>

### series.startAngle `Number` *(default: 90)*

The start angle (degrees) of the first donut or pie segment.

Angles increase clockwise and zero is to the left. Negative values are acceptable.

#### Example - set the donut chart series start angle
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "donut",
        startAngle: 180,
        data: [ 1, 2, 3]
      }]
    });
    </script>

### series.target `Object`

The configuration options of the target

> The `target` option is supported when [series.type](#configuration-series.type) is set to "bullet" or "verticalBullet".

#### Example - configure the bullet chart target

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "bullet",
          target: {
            color: "green",
            border: {
              width: 3,
              color: "red"
            },
            line: {
              width: 10
            }
          },
          data: [
            { current: 1, target: 2 }
          ]
        }
      ]
    });
    </script>

### series.target.border `Object|Function`

The border of the target.

#### Example - set the bullet chart target border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "bullet",
          target: {
            border: {
              width: 3,
              color: "red"
            }
          },
          data: [
            [1, 2]
          ]
        }
      ]
    });
    </script>

### series.target.border.color `String|Function` *(default: "black")*

The color of the border.

#### Example - set the bullet chart target border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "bullet",
          target: {
            border: {
              width: 3,
              color: "red"
            }
          },
          data: [
            [1, 2]
          ]
        }
      ]
    });
    </script>

### series.target.border.dashType `String|Function` *(default: "solid")*

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the bullet chart target border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "bullet",
          target: {
            border: {
              width: 3,
              dashType: "dashDot"
            }
          },
          data: [
            [1, 2]
          ]
        }
      ]
    });
    </script>

### series.target.border.width `Number|Function` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the bullet chart target border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "bullet",
          target: {
            border: {
              width: 3
            }
          },
          data: [
            [1, 2]
          ]
        }
      ]
    });
    </script>

### series.target.color `String|Function`

The target color.

#### Example - set the bullet chart target color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "bullet",
          target: {
            color: "green"
          },
          data: [
            [1, 2]
          ]
        }
      ]
    });
    </script>

### series.target.line `Object`

The target line options.

#### Example - set the bullet chart target line options

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "bullet",
          target: {
            line: {
              width: 10
            }
          },
          data: [
            [1, 2]
          ]
        }
      ]
    });

### series.target.line.width `Object|Function`

The width of the line.

#### Example - set the bullet chart target line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "bullet",
          target: {
            line: {
              width: 10
            }
          },
          data: [
            [1, 2]
          ]
        }
      ]
    });

### series.targetField `String` *(default: "target")*

The data item field containing the target value.

> The `currentField` option is supported when [series.type](#configuration-series.type) is set to "bullet" or "verticalBullet".

#### Example - set the bullet chart series current field
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "bullet",
          targetField: "price",
          data: [
            { current: 1, price: 2 }
          ]
        }
      ]
    });
    </script>

### series.tooltip `Object`

The chart series tooltip configuration options.

> The chart series tooltip is displayed when the [series.tooltip.visible](#configuration-series.tooltip.visible) option is set to `true`.

#### Example - configure the chart series tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            background: "green"
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.tooltip.background `String`

The background color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series tooltip background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            background: "green"
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.tooltip.border `Object`

The border configuration options.

#### Example - set the chart series tooltip border
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            border: {
              width: 2,
              color: "green"
            }
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.tooltip.border.color `String` *(default: "black")*

The color of the border.

#### Example - set the chart series tooltip border color
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            border: {
              width: 2,
              color: "green"
            }
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.tooltip.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart series tooltip border width
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            border: {
              width: 2
            }
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.tooltip.color `String`

The text color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series tooltip color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            color: "green"
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.tooltip.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

#### Example - set the chart series tooltip font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            font: "20px sans-serif"
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.tooltip.format `String`

The format of the labels. Uses [kendo.format](/api/javascript/kendo#methods-format).

Format placeholders:

* Area, bar, column, line, pie, radarArea, radarColumn and radarLine
    *   {0} - value
* Bubble
    *   {0} - x value
    *   {1} - y value
    *   {2} - size value
    *   {3} - category name
* Scatter, scatterLine
    *   {0} - x value
    *   {1} - y value
* PolarArea, polarLine and polarScatter
    *   {0} - x value (degrees)
    *   {1} - y value
* Candlestick and OHLC
    *   {0} - open value
    *   {1} - high value
    *   {2} - low value
    *   {3} - close value
    *   {4} - category name

#### Example - set the chart series tooltip format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            format: "{0} x {1} ({2:C})"
          },
          type: "bubble",
          data: [ [1, 2, 3] ]
        }
      ]
    });
    </script>

### series.tooltip.padding `Number|Object`

The padding of the tooltip. A numeric value will set all paddings.

#### Example - set the chart series tooltip padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            padding: 10
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.tooltip.padding.bottom `Number` *(default: 0)*

The bottom padding of the tooltip.

#### Example - set the chart series tooltip bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            padding: {
              bottom: 10
            }
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.tooltip.padding.left `Number` *(default: 0)*

The left padding of the tooltip.

#### Example - set the chart series tooltip left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            padding: {
              left: 10
            }
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.tooltip.padding.right `Number` *(default: 0)*

The right padding of the tooltip.

#### Example - set the chart series tooltip right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            padding: {
              right: 10
            }
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.tooltip.padding.top `Number` *(default: 0)*

The top padding of the tooltip.

#### Example - set the chart series tooltip top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            padding: {
              top: 10
            }
          },
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### series.tooltip.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the tooltip.

The fields which can be used in the template are:

* category - the category name
* dataItem - the original data item used to construct the point. Will be null if binding to array.
* series - the data series
* value - the point value (either a number or an object)
* runningTotal - the sum of point values since the last "runningTotal" [summary point](#configuration-series.summaryField). Available for waterfall series.
* total - the sum of all previous series values. Available for waterfall series.

#### Example - set the chart series tooltip template
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true,
            template: "#: value.x # - #: value.y # (#: value.size #)"
          },
          type: "bubble",
          data: [ [1, 2, 3] ]
        }
      ]
    });
    </script>

### series.tooltip.visible `Boolean` *(default: false)*

If set to `true` the chart will display the series tooltip. By default the series tooltip is not displayed.

#### Example - show the chart series tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          tooltip: {
            visible: true
          },
          type: "bubble",
          data: [ [1, 2, 3] ]
        }
      ]
    });
    </script>

### series.type `String` *(default: "column")*

The type of the series.

The supported values are:

* area
* bar
* bubble
* bullet
* candlestick
* column
* donut
* funnel
* horizontalWaterfall
* line
* ohlc
* pie
* polarArea
* polarLine
* polarScatter
* radarArea
* radarColumn
* radarLine
* rangeBar
* rangeColumn
* scatter
* scatterLine
* verticalArea
* verticalBullet
* verticalLine
* waterfall

#### Example - set the chart series type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "line",
        data: [1, 2, 3]
      }]
    });
    </script>

### series.visible `Boolean` *(default: true)*

Sets the visible property of a chart series

#### Examples - set series visible property
    <div id="chart"></div>
    <script>
        var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
              url: "http://demos.telerik.com/kendo-ui/service/stockdata",
              dataType: "jsonp"
            }
          }
        });
        $("#chart").kendoChart({
            dataSource: dataSource,
            series: [
                { field: "Volume", visible:false }
            ]
        });
    </script>

### series.visibleInLegend `Boolean` *(default: true)*

A value indicating whether to show the point category name (for funnel, donut and pie series)
or series name (for other available series types) in the legend.

#### Example - hide a chart series from the legend
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          name: "Series 1",
          visibleInLegend: false,
          data: [1, 2, 3]
        },
        { name: "Series 2", data: [1, 2, 3] }
      ]
    });
    </script>

### series.visibleInLegendField `String`

The data item field which indicates whether to show the point category name in the legend.

> The `visibleInLegendField` option is supported when [series.type](#configuration-series.type) is set to "funnel", "donut" or "pie".

#### Example - set the chart series visible in legend field

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [
          { value: 1, category: "firstValue", visible: false },
          { value: 2, category: "secondValue", visible: true }
        ]
      },
      series: [{
        type: "pie",
        field: "value",
        visibleInLegendField: "visible"
      }]
    });
    </script>

### series.visual `Function`

A function that can be used to create a custom visual for the points. Applicable for bar, column, pie, donut, funnel, rangeBar, rangeColumn and waterfall series. The available argument fields are:

* rect - the `kendo.geometry.Rect` that defines where the visual should be rendered.
* options - the point options.
* createVisual - a function that can be used to get the default visual.
* category - the point category.
* dataItem - the point dataItem.
* value - the point value.
* sender - the chart instance.
* series - the point series.
* percentage - the point value represented as a percentage value. Available only for donut, pie and 100% stacked charts.
* runningTotal - the sum of point values since the last "runningTotal" [summary point](#configuration-series.summaryField). Available for waterfall series.
* total - the sum of all previous series values. Available for waterfall series.
* radius - the segment radius. Available for donut and pie series.
* innerRadius - the segment inner radius. Available for donut series.
* startAngle - the segment start angle. Available for donut and pie series.
* endAngle - the segment end angle. Available for donut and pie series.
* center - the segment center point. Available for donut and pie series.
* points - the segment points. Available for funnel series.

#### Example - using custom visual

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          data: [1, 2, 3],
          visual: function (e) {
            var origin = e.rect.origin;
            var center = e.rect.center();
            var bottomRight = e.rect.bottomRight();

            var path = new kendo.drawing.Path({
              fill: {
                color: e.options.color
              }
            })
            .moveTo(origin.x, bottomRight.y)
            .lineTo(bottomRight.x, bottomRight.y)
            .lineTo(center.x, origin.y)
            .close();

            return path;
          }
        }]
      });
    </script>

### series.width `Number`

The line width.

> The `width` option is supported when [series.type](#configuration-series.type) is set to "line", "scatterLine", "radarLine" or "polarLine".

#### Example - set the chart line width
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "line",
        width: 6,
        data: [1, 2, 3]
      }]
    });
    </script>

### series.xAxis `String` *(default: "primary")*

The name of the X axis to use.

> The `xAxis` option is supported when [series.type](#configuration-series.type) is set to "bubble", "scatter", "scatterLine" or polar series.

For polar series the xAxis range is expressed in degrees.

### series.xField `String` *(default: "x")*

The data item field containing the X value.

> The `xField` option is supported when [series.type](#configuration-series.type) is set to "bubble", "scatter", "scatterLine" or polar series.

#### Example - set the chart series x field

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "bubble",
        xField: "price",
        data: [
          { price: 1, y: 2, size: 3 }
        ]
      }]
    });
    </script>

### series.yAxis `String` *(default: "primary")*

The name of the Y axis to use.

** Available for bubble, scatter, scatterLine and polar series. **

### series.yField `String` *(default: "y")*

The data item field containing the Y value.

> The `yField` option is supported when [series.type](#configuration-series.type) is set to "bubble", "scatter" or "scatterLine".

#### Example - set the chart series y field

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "bubble",
        yField: "price",
        data: [
          { x: 1, price: 2, size: 3 }
        ]
      }]
    });
    </script>

### series.notes `Object`

The series notes configuration.

### series.notes.position `String`

The position of the series note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

### series.notes.icon `Object`

The icon of the notes.

### series.notes.icon.background `String`

The background color of the notes icon.

#### Example - set the series notes icon background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      series: [{
        field: "value",
        noteTextField: "noteText",
        notes: {
          icon: {
            background: "red"
          }
        }
      }]
    });
    </script>

### series.notes.icon.border `Object`

The border of the icon.

#### Example - set the series notes icon border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      series: [{
        field: "value",
        noteTextField: "noteText",
        notes: {
          icon: {
            border: {
              width: 2,
              color: "red"
            }
          }
        }
      }]
    });
    </script>

### series.notes.icon.border.color `String`

The border color of the icon.

#### Example - set the series notes icon border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      series: [{
        field: "value",
        noteTextField: "noteText",
        notes: {
          icon: {
            border: {
              width: 2,
              color: "red"
            }
          }
        }
      }]
    });
    </script>

### series.notes.icon.border.width `Number`

The border width of the icon.

#### Example - set the series notes icon border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      series: [{
        field: "value",
        noteTextField: "noteText",
        notes: {
          icon: {
            border: {
              width: 2,
              color: "red"
            }
          }
        }
      }]
    });
    </script>

### series.notes.icon.size `Number`

The size of the icon.

#### Example - set the series notes icon size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      series: [{
        field: "value",
        noteTextField: "noteText",
        notes: {
          icon: {
            size: 30
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

#### Example - set the series notes icon shape

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      series: [{
        field: "value",
        noteTextField: "noteText",
        notes: {
          icon: {
            type: "triangle"
          }
        }
      }]
    });
    </script>

### series.notes.icon.visible `Boolean` *(default: "true")*

The icon visibility.

#### Example - set the series notes icon visibility

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      series: [{
        field: "value",
        noteTextField: "noteText",
        notes: {
          icon: {
            visible: false
          }
        }
      }]
    });
    </script>

### series.notes.label `Object`

The label of the notes.

### series.notes.label.background `String`

The background color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the series label background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      series: [{
        field: "value",
        noteTextField: "noteText",
        notes: {
          label: {
            background: "red"
          }
        }
      }]
    });
    </script>

### series.notes.label.border `Object`

The border of the label.

#### Example - set the series label border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      series: [{
        field: "value",
        noteTextField: "noteText",
        notes: {
          label: {
            border: {
              color: "green",
              dashType: "dashDot",
              width: 1
            }
          }
        }
      }]
    });
    </script>

### series.notes.label.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the series label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      series: [{
        field: "value",
        noteTextField: "noteText",
        notes: {
          label: {
            border: {
              color: "green"
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

#### Example - set the series label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      series: [{
        field: "value",
        noteTextField: "noteText",
        notes: {
          label: {
            border: {
              dashType: "dashDot",
              width: 1
            }
          }
        }
      }]
    });
    </script>

### series.notes.label.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the series label border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      series: [{
        field: "value",
        noteTextField: "noteText",
        notes: {
          label: {
            border: {
              width: 1
            }
          }
        }
      }]
    });
    </script>

### series.notes.label.color `String`

The text color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the series label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      series: [{
        field: "value",
        noteTextField: "noteText",
        notes: {
          label: {
            color: "#aa00bb"
          }
        }
      }]
    });
    </script>

### series.notes.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the label.

#### Example - set the chart series notes label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      series: [{
        field: "value",
        noteTextField: "noteText",
        notes: {
          label: {
            font: "20px sans-serif"
          }
        }
      }]
    });
    </script>

### series.notes.label.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the point value

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example - set the series notes label template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      series: [{
        field: "value",
        noteTextField: "noteText",
        notes: {
          label: {
            template: "Year: #: value #"
          }
        }
      }]
    });
    </script>

### series.notes.label.visible `Boolean` *(default: true)*

If set to `true` the chart will display the series notes label. By default the series notes label are visible.

#### Example - hide the series notes label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      series: [{
        field: "value",
        noteTextField: "noteText",
        notes: {
          label: {
            visible: false
          }
        }
      }]
    });
    </script>

### series.notes.label.rotation `Number` *(default: 0)*

The rotation angle of the label. By default the label are not rotated.

#### Example - rotate the series notes label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      series: [{
        field: "value",
        noteTextField: "noteText",
        notes: {
          label: {
            rotation: 90
          }
        }
      }]
    });
    </script>

### series.notes.label.format `String` *(default: "{0}")*

The format used to display the notes label. Uses [kendo.format](/api/javascript/kendo#methods-format). Contains one placeholder ("{0}") which represents the axis value.

#### Example - set the series notes label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      series: [{
        field: "value",
        noteTextField: "noteText",
        notes: {
          label: {
            format: "value slot: {0}"
          }
        }
      }]
    });
    </script>

### series.notes.label.position `String` *(default: "inside")*

The position of the labels.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.

### series.notes.line `Object`

The line of the notes.

### series.notes.line.width `Number`

The line width of the notes.

#### Example - set the value axis notes line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      series: [{
        field: "value",
        noteTextField: "noteText",
        notes: {
          line: {
            width: 4
          }
        }
      }]
    });
    </script>

### series.notes.line.color `String`

The line color of the notes.

#### Example - set the series notes color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      series: [{
        field: "value",
        noteTextField: "noteText",
        notes: {
          line: {
            color: "#aa00bb"
          }
        }
      }]
    });
    </script>

### series.notes.line.length `Number`

The length of the connecting lines in pixels.

#### Example - set the series notes color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      series: [{
        field: "value",
        noteTextField: "noteText",
        notes: {
          line: {
            length: 20
          }
        }
      }]
    });
    </script>

### series.notes.visual `Function`

A function that can be used to create a custom visual for the notes. The available argument fields are:

* rect - the `kendo.geometry.Rect` that defines the note target rect.
* options - the note options.
* createVisual - a function that can be used to get the default visual.
* category - the category of the note point.
* dataItem - the dataItem of the note point.
* value - the value of the note point.
* sender - the chart instance.
* series - the series of the note point.
* text - the note text.

#### Example - use custom visual for the notes

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        dataSource: {
          data: [{
            value: 1,
            noteText: "A"
          }]
        },
        series: [{
          field: "value",
          noteTextField: "noteText",
          notes: {
            visual: function (e) {
              var targetPoint = { x: e.rect.center().x, y: e.rect.origin.y };
              var line = new kendo.drawing.Path()
              .moveTo(targetPoint.x, targetPoint.y)
              .lineTo(targetPoint.x, targetPoint.y - 10);
              var circle = new kendo.drawing.Circle(new kendo.geometry.Circle([targetPoint.x, targetPoint.y - 30], 20), {
                fill: {
                  color: "red"
                }
              });

              var text = new kendo.drawing.Text(e.text);
              var bbox = text.bbox();
              text.position([targetPoint.x - 20 + (40 - bbox.width()) / 2, targetPoint.y - 50 + (40 - bbox.height()) / 2]);
              return new kendo.drawing.Group().append(line, circle, text);
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
    <div id="chart"></div>
    <script>
        $("#chart").kendoChart({
          series: [{
            type: "column",
            zIndex: 1,
            color: "grey",
            data: [1, 2, 1]
          }, {
            type: "column",
            color: "blue",
            zIndex: 3,
            data: [2, 2, 2]
          }, {
            type: "area",
            color: "red",
            zIndex: 2,
            data: [0, 2, 0]
          }]
        });
    </script>

### seriesColors `Array`

The default colors for the chart's series. When all colors are used, new colors are pulled from the start again.

#### Example - set the chart series colors
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesColors: ["red", "green"],
      series: [
        { data: [1, 2] },
        { data: [1, 2] },
        { data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults `Object`

The default options for all series.

### seriesDefaults.area `Object`

The area chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the area chart default options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        area: {
          color: "red",
          opacity: 0.1
        }
      },
      series: [
        { type: "area", data: [1, 2] },
        { data: [3, 4] }
      ]
    });
    </script>

### seriesDefaults.bar `Object`

The bar chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the bar chart default options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        bar: {
          color: "red",
          opacity: 0.1
        }
      },
      series: [
        { type: "bar", data: [1, 2] },
        { data: [3, 4] }
      ]
    });
    </script>

### seriesDefaults.border `Object`

The border of the series.

#### Example - set the chart series border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        border: {
          color: "green",
          width: 2
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        border: {
          color: "green",
          width: 2
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.border.dashType `String` *(default: "solid")*

The dash type of the chart series border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the chart series border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        border: {
          dashType: "dashDot",
          width: 2
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart series border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        border: {
          width: 2
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.bubble `Object`

The bubble chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the bubble chart default options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        bubble: {
          color: "green",
          opacity: 0.5
        }
      },
      series: [
        { type: "bubble", data: [ [1, 2, 3] ] }
      ]
    });
    </script>

### seriesDefaults.candlestick `Object`

The candlestick chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the candlestick chart default options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        candlestick: {
          color: "red",
          opacity: 0.3
        }
      },
      series: [
        { type: "candlestick", data: [ [1, 2, 0.5, 1.5] ] }
      ]
    });
    </script>

### seriesDefaults.column `Object`

The column chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the column chart default options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        column: {
          color: "red",
          opacity: 0.1
        }
      },
      series: [
        { type: "column", data: [3, 4] }
      ]
    });
    </script>

### seriesDefaults.donut `Object`

The donut chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the donut chart default options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        donut: {
          color: "red",
          opacity: 0.1
        }
      },
      series: [
        { type: "donut",  data: [3, 4] }
      ]
    });
    </script>

### seriesDefaults.gap `Number` *(default: 1.5)*

The distance between category clusters.

#### Example - set the gap between the chart categories
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        gap: 4
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults.labels `Object`

The chart series label configuration.

> The chart displays the series labels when the [seriesDefaults.labels.visible](#configuration-seriesDefaults.labels.visible) option is set to `true`.

#### Example - configure the chart series label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true,
          background: "green",
          border: {
            width: 2,
            color: "black"
          }
        }
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults.labels.background `String`

The background color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series label background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true,
          background: "green"
        }
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults.labels.border `Object`

The border of the labels.

#### Example - set the chart series label border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true,
          border: {
            width: 2,
            color: "black"
          }
        }
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults.labels.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true,
          border: {
            width: 2,
            color: "black"
          }
        }
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults.labels.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the chart series label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true,
          border: {
            width: 2,
            dashType: "dashDot"
          }
        }
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults.labels.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart series label border width
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true,
          border: {
            width: 2
          }
        }
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults.labels.color `String`

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true,
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

#### Example - set the chart series label color as a RGB value
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true,
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

#### Example - set the chart series label color by name
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true,
          color: "green"
        }
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example - set the chart series label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true,
          font: "20px sans-serif"
        }
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults.labels.format `String` *(default: "{0}")*

The format of the labels. Uses [kendo.format](/api/javascript/kendo#methods-format).

#### Example - set the chart series label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true,
          format: "{0:C}"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.labels.margin `Number|Object` *(default: 0)*

The margin of the labels. A numeric value will set all margins.

#### Example - set the chart series label margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          margin: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.labels.margin.bottom `Number` *(default: 0)*

The bottom margin of the labels.

#### Example - set the chart series label bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          margin: {
            bottom: 10
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.labels.margin.left `Number` *(default: 0)*

The left margin of the labels.

#### Example - set the chart series label left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          margin: {
            left: 10
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.labels.margin.right `Number` *(default: 0)*

The right margin of the labels.

#### Example - set the chart series label right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          margin: {
            right: 10
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.labels.margin.top `Number` *(default: 0)*

The top margin of the labels.

#### Example - set the chart series label top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          margin: {
            top: 10
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.labels.padding `Number|Object` *(default: 0)*

The padding of the labels. A numeric value will set all margins.

#### Example - set the chart series label padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          padding: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.labels.padding.bottom `Number` *(default: 0)*

The bottom padding of the labels.

#### Example - set the chart series label bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          padding: {
            bottom: 10
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.labels.padding.left `Number` *(default: 0)*

The left padding of the labels.

#### Example - set the chart series label left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          padding: {
            left: 10
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.labels.padding.right `Number` *(default: 0)*

The right padding of the labels.

#### Example - set the chart series label right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          padding: {
            right: 10
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.labels.padding.top `Number` *(default: 0)*

The top padding of the labels.

#### Example - set the chart series label top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          padding: {
            top: 10
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.labels.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the chart series label.

The fields which can be used in the template are:

* category - the category name. Available for area, bar, column, bubble, donut, funnel, line and pie series.
* dataItem - the original data item used to construct the point. Will be null if binding to array.
* percentage - the point value represented as a percentage value. Available for donut, funnel and pie series.
* series - the data series
* value - the point value. Can be a number or object containing each bound field.
* runningTotal - the sum of point values since the last "runningTotal" [summary point](#configuration-series.summaryField). Available for waterfall series.
* total - the sum of all previous series values. Available for waterfall series.

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example - set the chart series label template

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true,
          template: "Value: #: value #%"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.labels.visible `Boolean` *(default: false)*

If set to `true` the chart will display the series labels. By default chart series labels are not displayed.

#### Example - show the chart series labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        labels: {
          visible: true
        }
      },
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### seriesDefaults.labels.visual `Function`

A function that can be used to create a custom visual for the labels. The available argument fields are:

* text - the label text.
* rect - the `kendo.geometry.Rect` that defines where the visual should be rendered.
* sender - the chart instance (may be undefined).
* options - the label options.
* createVisual - a function that can be used to get the default visual.

#### Example - using custom visual for the labels

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        seriesDefaults: {
          labels: {
            visible: true,
            visual: function(e) {
              var center = e.rect.center();
              return new kendo.drawing.Text(e.text, [center.x, e.rect.origin.y], {
                fill: {
                  color: "red"
                }
              });
            }
          }
        },
        series: [{
          data: [1, 2, 3]
        }]
      });
    </script>

### seriesDefaults.labels.from `Object`

The chart series **from** label configuration.

> The chart displays the series labels when the [seriesDefaults.labels.visible](#configuration-seriesDefaults.labels.visible) option is set to `true` or when the [seriesDefaults.labels.from.visible](#configuration-seriesDefaults.labels.from.visible) option is set to `true`.

### seriesDefaults.labels.from.background `String`

The background color of the **from** labels. Accepts a valid CSS color string, including hex and rgb.

### seriesDefaults.labels.from.border `Object`

The border of the **from** labels.

### seriesDefaults.labels.from.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

### seriesDefaults.labels.from.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### seriesDefaults.labels.from.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

### seriesDefaults.labels.from.color `String`

The text color of the **from** labels. Accepts a valid CSS color string, including hex and rgb.

### seriesDefaults.labels.from.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the **from** labels.

### seriesDefaults.labels.from.format `String` *(default: "{0}")*

The format of the **from** labels. Uses [kendo.format](/api/javascript/kendo#methods-format).

### seriesDefaults.labels.from.margin `Number|Object` *(default: 0)*

The margin of the **from** labels. A numeric value will set all margins.

### seriesDefaults.labels.from.margin.bottom `Number` *(default: 0)*

The bottom margin of the **from** labels.

### seriesDefaults.labels.from.margin.left `Number` *(default: 0)*

The left margin of the **from** labels.

### seriesDefaults.labels.from.margin.right `Number` *(default: 0)*

The right margin of the **from** labels.

### seriesDefaults.labels.from.margin.top `Number` *(default: 0)*

The top margin of the **from** labels.

### seriesDefaults.labels.from.padding `Number|Object` *(default: 0)*

The padding of the **from** labels. A numeric value will set all paddings.

### seriesDefaults.labels.from.padding.bottom `Number` *(default: 0)*

The bottom padding of the **from** labels.

### seriesDefaults.labels.from.padding.left `Number` *(default: 0)*

The left padding of the **from** labels.

### seriesDefaults.labels.from.padding.right `Number` *(default: 0)*

The right padding of the **from** labels.

### seriesDefaults.labels.from.padding.top `Number` *(default: 0)*

The top padding of the **from** labels.

### seriesDefaults.labels.from.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the chart series **from** label.

The fields which can be used in the template are:

* category - the category name. Available for area, bar, column, bubble, donut, funnel, line and pie series.
* dataItem - the original data item used to construct the point. Will be null if binding to array.
* percentage - the point value represented as a percentage value. Available for donut, funnel and pie series.
* series - the data series
* value - the point value. Can be a number or object containing each bound field.
* runningTotal - the sum of point values since the last "runningTotal" [summary point](#configuration-series.summaryField). Available for waterfall series.
* total - the sum of all previous series values. Available for waterfall series.

> The text can be split into multiple lines by using line feed characters ("\n").

### seriesDefaults.labels.from.visible `Boolean` *(default: false)*

If set to `true` the chart will display the series **from** labels. By default chart series **from** labels are not displayed.

### seriesDefaults.labels.to `Object`

The chart series **to** label configuration.

> The chart displays the series labels when the [seriesDefaults.labels.visible](#configuration-seriesDefaults.labels.visible) option is set to `true` or when the [seriesDefaults.labels.to.visible](#configuration-seriesDefaults.labels.to.visible) option is set to `true`.

### seriesDefaults.labels.to.background `String`

The background color of the **to** labels. Accepts a valid CSS color string, including hex and rgb.

### seriesDefaults.labels.to.border `Object`

The border of the **to** labels.

### seriesDefaults.labels.to.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

### seriesDefaults.labels.to.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### seriesDefaults.labels.to.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

### seriesDefaults.labels.to.color `String`

The text color of the **to** labels. Accepts a valid CSS color string, including hex and rgb.

### seriesDefaults.labels.to.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the **to** labels.

### seriesDefaults.labels.to.format `String` *(default: "{0}")*

The format of the **to** labels. Uses [kendo.format](/api/javascript/kendo#methods-format).

### seriesDefaults.labels.to.margin `Number|Object` *(default: 0)*

The margin of the **to** labels. A numeric value will set all margins.

### seriesDefaults.labels.to.margin.bottom `Number` *(default: 0)*

The bottom margin of the **to** labels.

### seriesDefaults.labels.to.margin.left `Number` *(default: 0)*

The left margin of the **to** labels.

### seriesDefaults.labels.to.margin.right `Number` *(default: 0)*

The right margin of the **to** labels.

### seriesDefaults.labels.to.margin.top `Number` *(default: 0)*

The top margin of the **to** labels.

### seriesDefaults.labels.to.padding `Number|Object` *(default: 0)*

The padding of the **to** labels. A numeric value will set all paddings.

### seriesDefaults.labels.to.padding.bottom `Number` *(default: 0)*

The bottom padding of the **to** labels.

### seriesDefaults.labels.to.padding.left `Number` *(default: 0)*

The left padding of the **to** labels.

### seriesDefaults.labels.to.padding.right `Number` *(default: 0)*

The right padding of the **to** labels.

### seriesDefaults.labels.to.padding.top `Number` *(default: 0)*

The top padding of the **to** labels.

### seriesDefaults.labels.to.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the chart series **to** label.

The fields which can be used in the template are:

* category - the category name. Available for area, bar, column, bubble, donut, funnel, line and pie series.
* dataItem - the original data item used to construct the point. Will be null if binding to array.
* percentage - the point value represented as a percentage value. Available for donut, funnel and pie series.
* series - the data series
* value - the point value. Can be a number or object containing each bound field.
* runningTotal - the sum of point values since the last "runningTotal" [summary point](#configuration-series.summaryField). Available for waterfall series.
* total - the sum of all previous series values. Available for waterfall series.

> The text can be split into multiple lines by using line feed characters ("\n").

### seriesDefaults.labels.to.visible `Boolean` *(default: false)*

If set to `true` the chart will display the series **to** labels. By default chart series **to** labels are not displayed.

### seriesDefaults.line `Object`

The line chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the line chart default options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        line: {
          color: "red",
          opacity: 0.1
        }
      },
      series: [{
        type: "line",
        data: [1, 2]
      }]
    });
    </script>

### seriesDefaults.ohlc `Object`

The ohlc chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the ohlc chart default options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        ohlc: {
          color: "red",
          opacity: 0.3
        }
      },
      series: [{
        type: "ohlc",
        data: [ [1, 2, 0.5, 1.5] ]
      }]
    });
    </script>

### seriesDefaults.overlay `Object`

The chart series overlay options.

#### Example - set the chart series overlay options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        overlay: {
          gradient: "none"
        }
      },
      series: [
        { data: [ 1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.overlay.gradient `String`

The chart series gradient.

The supported values are:

* "glass" (bar, column and candlestick series)
* "none"
* "roundedBevel" (donut and pie series)
* "sharpBevel" (donut and pie series)

#### Example - set the chart series gradient options

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        overlay: {
          gradient: "none"
        }
      },
      series: [
        { data: [ 1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.pie `Object`

The pie chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the pie chart default options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        pie: {
          color: "red",
          opacity: 0.1
        }
      },
      series: [
        { type: "pie", data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults.scatter `Object`

The scatter chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the scatter chart default options

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        color: "green"
      },
      series: [ {
        type: "scatter",
        data: [
           [1, 2],
           [2, 3]
        ]
      }]
    });
    </script>

### seriesDefaults.scatterLine `Object`

The scatterLine chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the scatterLine chart default options

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        color: "green"
      },
      series: [ {
        type: "scatterLine",
        data: [
           [1, 2],
           [2, 3]
        ]
      }]
    });
    </script>

### seriesDefaults.spacing `Number` *(default: 0.4)*

The space between the chart series as proportion of the series width.

> The `spacing` option is supported when [series.type](#configuration-series.type) is set to "bar", "column", "candlestick", "ohlc" and "candlestick".

#### Example - set the chart series spacing

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        spacing: 0.1
      },
      series: [
        { data: [ 1, 2 ,3 ] },
        { data: [ 1, 2 ,3 ] }
      ]
    });
    </script>

### seriesDefaults.stack `Boolean|Object` *(default: false)*

A boolean value indicating if the series should be stacked.

> The `stack` options is supported when [series.type](#configuration-series.type) is set to "bar", "column", "line", "area", "verticalLine", "verticalArea", "radarLine", "radarArea" and "radarColumn".

#### Example - configure stack series

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
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

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
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

The default type of the series.

The supported values are:

* area
* bar
* bubble
* bullet
* candlestick
* column
* donut
* funnel
* line
* ohlc
* pie
* polarArea
* polarLine
* polarScatter
* radarArea
* radarColumn
* radarLine
* scatter
* scatterLine
* waterfall
* verticalArea
* verticalBullet
* verticalLine

### seriesDefaults.tooltip `Object`

The chart series tooltip configuration options.

> The chart series tooltip is displayed when the [seriesDefaults.tooltip.visible](#configuration-series.tooltip.visible) option is set to `true`.

#### Example - configure the chart series tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          background: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.tooltip.background `String`

The background color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series tooltip background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          background: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.tooltip.border `Object`

The border configuration options.

#### Example - set the chart series tooltip border
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          border: {
            width: 2,
            color: "green"
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.tooltip.border.color `String` *(default: "black")*

The color of the border.

#### Example - set the chart series tooltip border color
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          border: {
            width: 2,
            color: "green"
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.tooltip.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart series tooltip border width
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          border: {
            width: 2
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.tooltip.color `String`

The text color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series tooltip color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.tooltip.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

#### Example - set the chart series tooltip font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          font: "20px sans-serif"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.tooltip.format `String`

The format of the labels. Uses [kendo.format](/api/javascript/kendo#methods-format).

Format placeholders:

* Area, bar, column, funnel, line and pie
    *   {0} - value
* Bubble
    *   {0} - x value
    *   {1} - y value
    *   {2} - size value
    *   {3} - category name
* Scatter and scatterLine
    *   {0} - x value
    *   {1} - y value
* Candlestick and OHLC
    *   {0} - open value
    *   {1} - high value
    *   {2} - low value
    *   {3} - close value
    *   {4} - category name

#### Example - set the chart series tooltip format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          format: "{0} x {1} ({2:C})"
        }
      },
      series: [
        {
          type: "bubble",
          data: [ [1, 2, 3] ]
        }
      ]
    });
    </script>

### seriesDefaults.tooltip.padding `Number|Object`

The padding of the tooltip. A numeric value will set all paddings.

#### Example - set the chart series tooltip padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          padding: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.tooltip.padding.bottom `Number` *(default: 0)*

The bottom padding of the tooltip.

#### Example - set the chart series tooltip bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          padding: {
            bottom: 10
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.tooltip.padding.left `Number` *(default: 0)*

The left padding of the tooltip.

#### Example - set the chart series tooltip left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          padding: {
            left: 10
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.tooltip.padding.right `Number` *(default: 0)*

The right padding of the tooltip.

#### Example - set the chart series tooltip right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          padding: {
            right: 10
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.tooltip.padding.top `Number` *(default: 0)*

The top padding of the tooltip.

#### Example - set the chart series tooltip top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          padding: {
            top: 10
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### seriesDefaults.tooltip.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the tooltip.

The fields which can be used in the template are:

* category - the category name
* dataItem - the original data item used to construct the point. Will be null if binding to array.
* series - the data series
* value - the point value (either a number or an object)
* runningTotal - the sum of point values since the last "runningTotal" [summary point](#configuration-series.summaryField). Available for waterfall series.
* total - the sum of all previous series values. Available for waterfall series.

#### Example - set the chart series tooltip template
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true,
          template: "#: value.x # - #: value.y # (#: value.size #)"
        }
      },
      series: [
        {
          type: "bubble",
          data: [ [1, 2, 3] ]
        }
      ]
    });
    </script>

### seriesDefaults.tooltip.visible `Boolean` *(default: false)*

If set to `true` the chart will display the series tooltip. By default the series tooltip is not displayed.

#### Example - show the chart series tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        tooltip: {
          visible: true
        }
      },
      series: [
        {
          type: "bubble",
          data: [ [1, 2, 3] ]
        },
      ]
    });
    </script>

### seriesDefaults.verticalArea `Object`

The verticalArea chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the verticalArea chart default options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        verticalArea: {
          color: "red",
          opacity: 0.1
        }
      },
      series: [
        { type: "verticalArea", data: [1, 2] }
      ]
    });
    </script>

### seriesDefaults.verticalLine `Object`

The verticalLine chart series options. Accepts all values supported by the [series](#configuration-series) option.

#### Example - set the verticalLine chart default options
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      seriesDefaults: {
        verticalLine: {
          color: "red",
          opacity: 0.1
        }
      },
      series: [
        { type: "verticalLine", data: [1, 2] }
      ]
    });
    </script>


### seriesDefaults.visual `Function`

A function that can be used to create a custom visual for the points. Applicable for bar and column series. The available argument fields are:

* rect - the `kendo.geometry.Rect` that defines where the visual should be rendered.
* options - the point options.
* createVisual - a function that can be used to get the default visual.
* category - the point category.
* dataItem - the point dataItem.
* value - the point value.
* sender - the chart instance.
* series - the point series.

#### Example - using custom visual

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        seriesDefaults: {
          visual: function (e) {
            var origin = e.rect.origin;
            var center = e.rect.center();
            var bottomRight = e.rect.bottomRight();

            var path = new kendo.drawing.Path({
              fill: {
                color: e.options.color
              }
            })
            .moveTo(origin.x, bottomRight.y)
            .lineTo(bottomRight.x, bottomRight.y)
            .lineTo(center.x, origin.y)
            .close();

            return path;
          }
        },
        series: [{
          data: [1, 2, 3]
        }]
      });
    </script>

### seriesDefaults.notes `Object`

The seriesDefaults notes configuration.

### seriesDefaults.notes.icon `Object`

The icon of the notes.

### seriesDefaults.notes.icon.background `String`

The background color of the notes icon.

#### Example - set the seriesDefaults notes icon background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      seriesDefaults: {
        notes: {
          icon: {
            background: "red"
          }
        }
      },
      series: [{
        field: "value",
        noteTextField: "noteText"
      }]
    });
    </script>

### seriesDefaults.notes.icon.border `Object`

The border of the icon.

#### Example - set the seriesDefaults notes icon border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      seriesDefaults: {
        notes: {
          icon: {
            border: {
              width: 2,
              color: "red"
            }
          }
        }
      },
      series: [{
        field: "value",
        noteTextField: "noteText"
      }]
    });
    </script>

### seriesDefaults.notes.icon.border.color `String`

The border color of the icon.

#### Example - set the seriesDefaults notes icon border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      seriesDefaults: {
        notes: {
          icon: {
            border: {
              width: 2,
              color: "red"
            }
          }
        }
      },
      series: [{
        field: "value",
        noteTextField: "noteText"
      }]
    });
    </script>

### seriesDefaults.notes.icon.border.width `Number`

The border width of the icon.

#### Example - set the seriesDefaults notes icon border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      seriesDefaults: {
        notes: {
          icon: {
            border: {
              width: 2,
              color: "red"
            }
          }
        }
      },
      series: [{
        field: "value",
        noteTextField: "noteText"
      }]
    });
    </script>

### seriesDefaults.notes.icon.size `Number`

The size of the icon.

#### Example - set the seriesDefaults notes icon size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      seriesDefaults: {
        notes: {
          icon: {
            size: 30
          }
        }
      },
      series: [{
        field: "value",
        noteTextField: "noteText"
      }]
    });
    </script>

### seriesDefaults.notes.icon.type `String` *(default: "circle")*

The icon shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.

#### Example - set the seriesDefaults notes icon shape

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      seriesDefaults: {
        notes: {
          icon: {
            shape: "triangle"
          }
        }
      },
      series: [{
        field: "value",
        noteTextField: "noteText"
      }]
    });
    </script>

### seriesDefaults.notes.icon.visible `Boolean` *(default: "true")*

The icon visibility.

#### Example - set the seriesDefaults notes icon visibility

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      seriesDefaults: {
        notes: {
          icon: {
            visible: false
          }
        }
      },
      series: [{
        field: "value",
        noteTextField: "noteText"
      }]
    });
    </script>

### seriesDefaults.notes.label `Object`

The label of the notes.

### seriesDefaults.notes.label.background `String`

The background color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the seriesDefaults label background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      seriesDefaults: {
        notes: {
          label: {
            background: "red"
          }
        }
      },
      series: [{
        field: "value",
        noteTextField: "noteText"
      }]
    });
    </script>

### seriesDefaults.notes.label.border `Object`

The border of the label.

#### Example - set the seriesDefaults label border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      seriesDefaults: {
        notes: {
          label: {
            border: {
              color: "green",
              dashType: "dashDot",
              width: 1
            }
          }
        }
      },
      series: [{
        field: "value",
        noteTextField: "noteText"
      }]
    });
    </script>

### seriesDefaults.notes.label.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the seriesDefaults label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      seriesDefaults: {
        notes: {
          label: {
            border: {
              color: "green"
            }
          }
        }
      },
      series: [{
        field: "value",
        noteTextField: "noteText"
      }]
    });
    </script>

### seriesDefaults.notes.label.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the seriesDefaults label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      seriesDefaults: {
        notes: {
          label: {
            border: {
              dashType: "dashDot",
              width: 1
            }
          }
        }
      },
      series: [{
        field: "value",
        noteTextField: "noteText"
      }]
    });
    </script>

### seriesDefaults.notes.label.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the seriesDefaults label border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      seriesDefaults: {
        notes: {
          label: {
            border: {
              width: 1
            }
          }
        }
      },
      series: [{
        field: "value",
        noteTextField: "noteText"
      }]
    });
    </script>

### seriesDefaults.notes.label.color `String`

The text color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the seriesDefaults label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      seriesDefaults: {
        notes: {
          label: {
            color: "#aa00bb"
          }
        }
      },
      series: [{
        field: "value",
        noteTextField: "noteText"
      }]
    });
    </script>

### seriesDefaults.notes.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the label.

#### Example - set the chart seriesDefaults notes label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      seriesDefaults: {
        notes: {
          label: {
             font: "20px sans-serif"
          }
        }
      },
      series: [{
        field: "value",
        noteTextField: "noteText"
      }]
    });
    </script>

### seriesDefaults.notes.label.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the point value

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example - set the seriesDefaults notes label template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      seriesDefaults: {
        notes: {
          label: {
             template: "Year: #: value #"
          }
        }
      },
      series: [{
        field: "value",
        noteTextField: "noteText"
      }]
    });
    </script>

### seriesDefaults.notes.label.visible `Boolean` *(default: true)*

If set to `true` the chart will display the seriesDefaults notes label. By default the seriesDefaults notes label are visible.

#### Example - hide the seriesDefaults notes label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      seriesDefaults: {
        notes: {
          label: {
             visible: false
          }
        }
      },
      series: [{
        field: "value",
        noteTextField: "noteText"
      }]
    });
    </script>

### seriesDefaults.notes.label.rotation `Number` *(default: 0)*

The rotation angle of the label. By default the label are not rotated.

#### Example - rotate the seriesDefaults notes label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      seriesDefaults: {
        notes: {
          label: {
            rotation: 90
          }
        }
      },
      series: [{
        field: "value",
        noteTextField: "noteText"
      }]
    });
    </script>

### seriesDefaults.notes.label.format `String` *(default: "{0}")*

The format used to display the notes label. Uses [kendo.format](/api/javascript/kendo#methods-format). Contains one placeholder ("{0}") which represents the axis value.

#### Example - set the seriesDefaults notes label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      seriesDefaults: {
        notes: {
          label: {
             format: "value slot: {0}"
          }
        }
      },
      series: [{
        field: "value",
        noteTextField: "noteText"
      }]
    });
    </script>

### seriesDefaults.notes.label.position `String` *(default: "inside")*

The position of the labels.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.

### seriesDefaults.notes.line `Object`

The line of the notes.

### seriesDefaults.notes.line.width `Number`

The line width of the notes.

#### Example - set the value axis notes line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      seriesDefaults: {
        notes: {
          line: {
            width: 4
          }
        }
      },
      series: [{
        field: "value",
        noteTextField: "noteText"
      }]
    });
    </script>

### seriesDefaults.notes.line.color `String`

The line color of the notes.

#### Example - set the seriesDefaults notes color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      seriesDefaults: {
        notes: {
          line: {
            color: "#aa00bb"
          }
        }
      },
      series: [{
        field: "value",
        noteTextField: "noteText"
      }]
    });
    </script>

### seriesDefaults.notes.line.length `Number`

The length of the connecting lines in pixels.

#### Example - set the seriesDefaults notes color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: {
        data: [{
          value: 1,
          noteText: "A"
        }]
      },
      seriesDefaults: {
        notes: {
          line: {
            length: 20
          }
        }
      },
      series: [{
        field: "value",
        noteTextField: "noteText"
      }]
    });
    </script>

### seriesDefaults.notes.visual `Function`

A function that can be used to create a custom visual for the notes. The available argument fields are:

* rect - the `kendo.geometry.Rect` that defines the note target rect.
* options - the note options.
* createVisual - a function that can be used to get the default visual.
* category - the category of the note point.
* dataItem - the dataItem of the note point.
* value - the value of the note point.
* sender - the chart instance.
* series - the series of the note point.
* text - the note text.

#### Example - use custom visual for the notes

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        dataSource: {
          data: [{
            value: 1,
            noteText: "A"
          }]
        },
        series: [{
          field: "value",
          noteTextField: "noteText"
        }],
        seriesDefaults: {
          notes: {
            visual: function (e) {
              var targetPoint = { x: e.rect.center().x, y: e.rect.origin.y };
              var line = new kendo.drawing.Path()
              .moveTo(targetPoint.x, targetPoint.y)
              .lineTo(targetPoint.x, targetPoint.y - 10);
              var circle = new kendo.drawing.Circle(new kendo.geometry.Circle([targetPoint.x, targetPoint.y - 30], 20), {
                fill: {
                  color: "red"
                }
              });

              var text = new kendo.drawing.Text(e.text);
              var bbox = text.bbox();
              text.position([targetPoint.x - 20 + (40 - bbox.width()) / 2, targetPoint.y - 50 + (40 - bbox.height()) / 2]);
              return new kendo.drawing.Group().append(line, circle, text);
            }
          }
        }
      });
    </script>

### theme `String`

The chart theme.

The supported values are:

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

### title `Object|String`

The chart title configuration options or text.

#### Example - set the chart title as a string
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: "Title",
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

#### Example - configure the chart title
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        align: "left"
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### title.align `String` *(default: "center")*

The alignment of the title.

* "center" - the text is aligned to the middle.
* "left" - the text is aligned to the left.
* "right" - the text is aligned to the right.

#### Example - configure the chart alignment
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        align: "left"
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### title.background `String` *(default: "white")*

The background color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example - configure the chart alignment
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        background: "green"
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### title.border `Object`

The border of the series.

#### Example - set the chart title border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        border: {
          color: "green",
          width: 2
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart title border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        border: {
          color: "green",
          width: 2
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.border.dashType `String` *(default: "solid")*

The dash type of the chart title border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the chart title border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        border: {
          dashType: "dashDot",
          width: 2
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart title border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        border: {
          width: 2
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.color `String`

The text color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the title color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Chart Title",
        color: "#aa00bb"
      },
      series: [{
         data: [1, 2, 3]
      }]
    });
    </script>

### title.font `String` *(default: "16px Arial,Helvetica,sans-serif")*

The font of the title.

#### Example - set the chart title border font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        font: "20px sans-serif"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.margin `Number|Object` *(default: 5)*

The margin of the title. A numeric value will set all margins.

#### Example - set the chart series label margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        margin: 10
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.margin.bottom `Number` *(default: 0)*

The bottom margin of the title.

#### Example - set the chart series label bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        margin: {
          bottom: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.margin.left `Number` *(default: 0)*

The left margin of the title.

#### Example - set the chart series label left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        margin: {
          left: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.margin.right `Number` *(default: 0)*

The right margin of the title.

#### Example - set the chart series label right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        margin: {
          right: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.margin.top `Number` *(default: 0)*

The top margin of the title.

#### Example - set the chart series label top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        margin: {
          top: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.padding `Number|Object` *(default: 5)*

The padding of the title. A numeric value will set all margins.

#### Example - set the chart series label padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        padding: 10
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.padding.bottom `Number` *(default: 0)*

The bottom padding of the title.

#### Example - set the chart series label bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        padding: {
          bottom: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.padding.left `Number` *(default: 0)*

The left padding of the title.

#### Example - set the chart series label left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        padding: {
          left: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.padding.right `Number` *(default: 0)*

The right padding of the title.

#### Example - set the chart series label right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        padding: {
          right: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.padding.top `Number` *(default: 0)*

The top padding of the title.

#### Example - set the chart series label top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        padding: {
          top: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.position `String` *(default: "top")*

The position of the title.

* "bottom" - the title is positioned on the bottom.
* "top" - the title is positioned on the top.

#### Example - set the chart title position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        position: "bottom"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.text `String`

The text of the chart title. You can also set the text directly for a title with default options.

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example - set the chart title position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        position: "bottom"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### title.visible `Boolean` *(default: false)*

If set to `true` the chart will display the title. By default the title is not displayed.

#### Example - hide the title

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      title: {
        text: "Title",
        visible: false
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip `Object`

The chart series tooltip configuration options.

> The chart series tooltip is displayed when the [tooltip.visible](#configuration-series.tooltip.visible) option is set to `true`.

#### Example - configure the chart series tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        background: "green"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip.background `String`

The background color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series tooltip background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        background: "green"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip.border `Object`

The border configuration options.

#### Example - set the chart series tooltip border
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        border: {
          width: 2,
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip.border.color `String` *(default: "black")*

The color of the border.

#### Example - set the chart series tooltip border color
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        border: {
          width: 2,
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart series tooltip border width
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        border: {
          width: 2
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip.color `String`

The text color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart series tooltip color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        color: "green"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

#### Example - set the chart series tooltip font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        font: "20px sans-serif"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip.format `String`

The format of the labels. Uses [kendo.format](/api/javascript/kendo#methods-format).

Format placeholders:

* Area, bar, column, funnel, line and pie
    *   {0} - value
* Bubble
    *   {0} - x value
    *   {1} - y value
    *   {2} - size value
    *   {3} - category name
* Scatter and scatterLine
    *   {0} - x value
    *   {1} - y value
* Candlestick and OHLC
    *   {0} - open value
    *   {1} - high value
    *   {2} - low value
    *   {3} - close value
    *   {4} - category name

#### Example - set the chart series tooltip format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        format: "{0} x {1} ({2:C})"
      },
      series: [
        {
          type: "bubble",
          data: [ [1, 2, 3] ]
        }
      ]
    });
    </script>

### tooltip.padding `Number|Object`

The padding of the tooltip. A numeric value will set all paddings.

#### Example - set the chart series tooltip padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        padding: 10
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip.padding.bottom `Number` *(default: 0)*

The bottom padding of the tooltip.

#### Example - set the chart series tooltip bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        padding: {
          bottom: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip.padding.left `Number` *(default: 0)*

The left padding of the tooltip.

#### Example - set the chart series tooltip left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        padding: {
          left: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip.padding.right `Number` *(default: 0)*

The right padding of the tooltip.

#### Example - set the chart series tooltip right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        padding: {
          right: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip.padding.top `Number` *(default: 0)*

The top padding of the tooltip.

#### Example - set the chart series tooltip top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        padding: {
          top: 10
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### tooltip.shared `Boolean` *(default: false)*

If set to `true` the chart will display a single tooltip for every category.

#### Example - display shared tooltip
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1,2,3]
      },{
        data: [1,2,3]
      },{
        data: [1,2,3]
      }],
      tooltip: {
        visible: true,
        shared: true
      }
    });
    </script>

### tooltip.sharedTemplate `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the shared tooltip.

The fields which can be used in the template are:

*   points - the category points
*   category - the category name

#### Example - set the shared tooltip template

    <div id="chart"></div>
    <script id="template" type="text/x-kendo-template">
      <div>#: category #</div>
      # for (var i = 0; i < points.length; i++) { #
        <div>#: points[i].series.name# : #: points[i].value #</div>
      # } #
    </script>
    <script>
    $("#chart").kendoChart({
      series: [
        { name: "Series 1", data: [1,2] },
        { name: "Series 2", data: [1,2] }
      ],
      categoryAxis: {
        categories: [2012, 2013]
      },
      tooltip: {
        visible: true,
        shared: true,
        sharedTemplate:kendo.template($("#template").html())
      }
    });
    </script>

### tooltip.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the tooltip.

The fields which can be used in the template are:

* category - the category name
* dataItem - the original data item used to construct the point. Will be null if binding to array.
* series - the data series
* value - the point value (either a number or an object)
* runningTotal - the sum of point values since the last "runningTotal" [summary point](#configuration-series.summaryField). Available for waterfall series.
* total - the sum of all previous series values. Available for waterfall series.

#### Example - set the chart series tooltip template
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true,
        template: "#: value.x # - #: value.y # (#: value.size #)"
      },
      series: [
        {
          type: "bubble",
          data: [ [1, 2, 3] ]
        }
      ]
    });
    </script>

### tooltip.visible `Boolean` *(default: false)*

If set to `true` the chart will display the series tooltip. By default the series tooltip is not displayed.

#### Example - show the chart series tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      tooltip: {
        visible: true
      },
      series: [
        {
          type: "bubble",
          data: [ [1, 2, 3] ]
        },
      ]
    });
    </script>

### transitions `Boolean` *(default: true)*

If set to `true` the chart will play animations when displaying the series. By default animations are enabled.

#### Example - disable the chart animations

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      transitions: false,
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis `Array`

The value axis configuration options.

#### Example - configure the chart value axis
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
          min: 0,
          max: 10,
          majorUnit: 2
      },
      series: [
        { data: [1, 2] }
      ]
    });
    </script>

### valueAxis.axisCrossingValue `Object|Date|Array`

Value at which the category axis crosses this axis. (Only for object)

Value indices at which the category axes cross the value axis. (Only for array)

Date at which the category axis crosses this axis. (Only for date)

#### Example - set the value axis crossing values
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
        series: [{
          data: [4,7,10]
        }],
        categoryAxes: [{
          categories: ["A", "B", "C"]
        }, {
          categories: ["D", "E", "F"]
        }],
        valueAxis:  {
          axisCrossingValues: [0, 12]
        }
    });
    </script>

### valueAxis.background `String`

The background color of the axis.

#### Example - set the background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        background: "#ff0000"
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.color `String`

The color of the value axis. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        color: "green"
      },
      series: [{
        data: [1, 2]
      }]
    });
    </script>

### valueAxis.crosshair `Object`

The crosshair configuration options.

> The crosshair is displayed when the [valueAxis.crosshair.visible](#configuration-valueAxis.crosshair.visible) option is set to `true`.

#### Example - set the value axis crosshair options

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          color: "green",
          width: 2,
          visible: true
        }
      },
      series: [{
        type: "line",
        data: [1, 2, 3]
      }]
    });
    </script>

### valueAxis.crosshair.color `String`

The color of the crosshair. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis crosshair color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          color: "green",
          visible: true
        }
      },
      series: [{
        type: "line",
        data: [1, 2, 3]
      }]
    });
    </script>

### valueAxis.crosshair.dashType `string` *(default: "solid")*

The dash type of the crosshair.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the value crosshair line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          dashType: "dashDot",
          visible: true
        }
      },
      series: [{
        type: "line",
        data: [1, 2, 3]
      }]
    });
    </script>

### valueAxis.crosshair.opacity `Number` *(default: 1)*

The opacity of the crosshair. By default the crosshair is opaque.

#### Example - set the value axis crosshair opacity

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          opacity: 0.1,
          visible: true
        }
      },
      series: [{
        type: "line",
        data: [1, 2, 3]
      }]
    });
    </script>

### valueAxis.crosshair.tooltip `Object`

The crosshar tooltip options.

> The crosshair tooltip is displayed when the [valueAxis.crosshair.tooltip.visible](#configuration-valueAxis.crosshair.tooltip.visible) option is set to `true`.

#### Example - configure the value axis crosshair tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          tooltip: {
            background: "green",
            border: {
              color: "black",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [{
        type: "line",
        data: [1, 2, 3]
      }]
    });
    </script>

### valueAxis.crosshair.tooltip.background `String`

The background color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis crosshair tooltip background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          tooltip: {
            background: "green",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.border `Object`

The border options.

#### Example - set the value axis crosshair tooltip border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          tooltip: {
            border: {
              color: "black",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis crosshair tooltip border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          tooltip: {
            border: {
              color: "black",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the value axis crosshair tooltip border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          tooltip: {
            border: {
              dashType: "dashDot",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the value axis crosshair tooltip border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          tooltip: {
            border: {
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.color `String`

The text color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis crosshair tooltip color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          tooltip: {
            color: "#aa00bb",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis crosshair tooltip color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          tooltip: {
            color: "rgb(128, 0, 255)",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis crosshair tooltip color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          tooltip: {
            color: "green",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

#### Example - set the value axis crosshair tooltip font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          tooltip: {
            font: "20px sans-serif",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.format `String` *(default: "{0}")*

The format used to display the tooltip. Uses [kendo.format](/api/javascript/kendo#methods-format). Contains one placeholder ("{0}") which represents the value value.

#### Example - set the value axis crosshair tooltip format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          tooltip: {
            format: "Year: {0}",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.padding `Number|Object` *(default: 0)*

The padding of the crosshair tooltip. A numeric value will set all paddings.

#### Example - set the value axis crosshair tooltip padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        crosshair: {
          tooltip: {
            padding: 20,
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.padding.bottom `Number` *(default: 0)*

The bottom padding of the crosshair tooltip.

#### Example - set the value axis crosshair tooltip bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              bottom: 20
            },
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.padding.left `Number` *(default: 0)*

The left padding of the crosshair tooltip.

#### Example - set the value axis crosshair tooltip left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              left: 20
            },
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.padding.right `Number` *(default: 0)*

The right padding of the crosshair tooltip.

#### Example - set the value axis crosshair tooltip right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              right: 20
            },
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.padding.top `Number` *(default: 0)*

The top padding of the crosshair tooltip.

#### Example - set the value axis crosshair tooltip top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              top: 20
            },
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the tooltip.

The fields which can be used in the template are:

* value - the value value

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example - set the value axis crosshair tooltip template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        crosshair: {
          tooltip: {
            template: "Year: #: value #",
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis crosshair tooltip template as a function

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        crosshair: {
          tooltip: {
            template: kendo.template("Year: #: value #"),
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.tooltip.visible `Boolean` *(default: false)*

If set to `true` the chart will display the value axis crosshair tooltip. By default the value axis crosshair tooltip is not visible.

#### Example - show the value axis crosshair tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          tooltip: {
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.visible `Boolean` *(default: false)*

If set to `true` the chart will display the value axis crosshair. By default the value axis crosshair is not visible.

#### Example - show the value axis crosshair

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.crosshair.width `Number` *(default: 1)*

The width of the crosshair in pixels.

#### Example - set the value axis crosshair width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        crosshair: {
          width: 2,
          visible: true
        }
      },
      series: [
        { type: "line", data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels `Object`

The axis labels configuration.

#### Example - configure the value axis labels
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          background: "green",
          color: "white"
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.background `String`

The background color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis label background as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        labels: {
          background: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis label background as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        labels: {
          background: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis label background by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        labels: {
          background: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.border `Object`

The border of the labels.

#### Example - set the value axis label border
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          border: {
            color: "green",
            dashType: "dashDot",
            width: 1
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          border: {
            color: "green",
            width: 1
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.border.dashType `String` *(default: "solid")*

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
      valueAxis: [{
        labels: {
          border: {
            dashType: "dashDot",
            width: 1
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the value axis label border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          border: {
            width: 1
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.color `String`

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        labels: {
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis label color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        labels: {
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis label color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        labels: {
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example - set the value axis label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
           font: "20px sans-serif",
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.format `String` *(default: "{0}")*

The format used to display the labels. Uses [kendo.format](/api/javascript/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

#### Example - set the value axis label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
           format: "{0:C}"
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.margin `Number|Object` *(default: 0)*

The margin of the labels. A numeric value will set all margins.

#### Example - set the value axis label margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          margin: 20
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.margin.bottom `Number` *(default: 0)*

The bottom margin of the labels.

#### Example - set the value axis label bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          margin: {
            bottom: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.margin.left `Number` *(default: 0)*

The left margin of the labels.

#### Example - set the value axis label left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          margin: {
            left: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.margin.right `Number` *(default: 0)*

The right margin of the labels.

#### Example - set the value axis label right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          margin: {
            right: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.margin.top `Number` *(default: 0)*

The top margin of the labels.

#### Example - set the value axis label top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          margin: {
            top: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.mirror `Boolean`

If set to `true` the chart will mirror the axis labels and ticks. If the labels are normally on the left side of the axis, mirroring the axis will render them to the right.

#### Example - mirror the value axis labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          mirror: true
        },
        categories: ["2012", "2013"]
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.padding `Number|Object` *(default: 0)*

The padding of the labels. A numeric value will set all margins.

#### Example - set the value axis label padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          padding: 20
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.padding.bottom `Number` *(default: 0)*

The bottom padding of the labels.

#### Example - set the value axis label bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          padding: {
            bottom: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.padding.left `Number` *(default: 0)*

The left padding of the labels.

#### Example - set the value axis label left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          padding: {
            left: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.padding.right `Number` *(default: 0)*

The right padding of the labels.

#### Example - set the value axis label right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          padding: {
            right: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.padding.top `Number` *(default: 0)*

The top padding of the labels.

#### Example - set the value axis label top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          padding: {
            top: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.rotation `Number|String|Object` *(default: 0)*

The rotation angle (in degrees) of the labels. By default the labels are not rotated. Angles increase clockwise and zero is to the left. Negative values are acceptable. Can be set to `"auto"` if the axis is horizontal in which case the labels will be rotated only if the slot size is not sufficient for the entire labels.

#### Example - rotate the value axis labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          rotation: 90
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.rotation.align `String` *(default: "end")*

The alignment of the rotated labels relative to the slot center. The supported values are `"end"` and `"center"`. By default the closest end of the label will be aligned to the center. If set to `"center"`, the center of the rotated label will be aligned instead.

#### Example - align the rotated category axis labels center

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        valueAxis: [{
          labels: {
            rotation: 45,
            align: "center"
          }
        }],
        series: [
          { data: [1, 2, 3] }
        ]
      });
    </script>

### valueAxis.labels.rotation.angle `Number|String` *(default: 0)*

The rotation angle of the labels. By default the labels are not rotated. Can be set to `"auto"` if the axis is horizontal in which case the labels will be rotated only if the slot size is not sufficient for the entire labels.

#### Example - rotate the value axis labels

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        valueAxis: [{
          labels: {
            rotation: {
              angle: 90
            }
          }
        }],
        series: [
          { data: [1, 2, 3] }
        ]
      });
    </script>

### valueAxis.labels.skip `Number` *(default: 0)*

The number of labels to skip. By default no labels are skipped.

#### Example - skip value axis labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          skip: 1
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.step `Number`*(default: 1)*

Label rendering step.
Every n-th label is rendered where n is the step

#### Example - render each 2nd label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          step: 2
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the value value

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example - set the value axis template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          template: "Year: #: value #"
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis template as a function

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          template: kendo.template("Year: #: value #")
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.visible `Boolean` *(default: true)*

If set to `true` the chart will display the value axis labels. By default the category axis labels are visible.

#### Example - hide the value axis labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        labels: {
          visible: false
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.labels.visual `Function`

A function that can be used to create a custom visual for the labels. The available argument fields are:

* createVisual - a function that can be used to get the default visual.
* culture - the default culture (if set) on the label
* format - the default format of the label
* options - the label options.
* rect - the `kendo.geometry.Rect` that defines where the visual should be rendered.
* sender - the chart instance (may be undefined).
* text - the label text.
* value - the category value

#### Example - using custom visual for the labels

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        valueAxis: [{
          labels: {
            visual: function(e) {
              var center = e.rect.center();
              return new kendo.drawing.Text(e.text, e.rect.origin, {
                fill: {
                  color: "red"
                }
              });
            }
          }
        }],
        series: [
          { data: [1, 2, 3] }
        ]
      });
    </script>

### valueAxis.line `Object`

The configuration of the axis lines. Also affects the major and minor ticks, but not the grid lines.

#### Example - configure the value axis line

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        line: {
          color: "#aa00bb",
          width: 3
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.line.color `String` *(default: "black")*

The color of the lines. Accepts a valid CSS color string, including hex and rgb.

> Setting the `color` option affects the major and minor ticks, but not the grid lines.

#### Example - set the value axis line color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        line: {
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis line color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        line: {
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis line color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        line: {
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.line.dashType `String` *(default: "solid")*

The dash type of the line.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the value axis line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        line: {
          dashType: "dashDot"
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.line.visible `Boolean` *(default: true)*

If set to `true` the chart will display the value axis lines. By default the value axis lines are visible.

#### Example - hide the value axis lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        line: {
          visible: false
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.line.width `Number` *(default: 1)*

The width of the line in pixels. Also affects the major and minor ticks, but not the grid lines.

#### Example - set the value axis line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        line: {
          width: 3
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.majorGridLines `Object`

The configuration of the major grid lines. These are the lines that are an extension of the major ticks through the
body of the chart.

#### Example - configure the value axis major grid lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        majorGridLines: {
          width: 3,
          color: "green"
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.majorGridLines.color `String` *(default: "black")*

The color of the major grid lines. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis major grid line color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        majorGridLines: {
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis major grid line color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        majorGridLines: {
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis major grid line color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        majorGridLines: {
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.majorGridLines.dashType `String` *(default: "solid")*

The dash type of the major grid lines.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the value axis major grid line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        majorGridLines: {
          dashType: "dashDot"
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.majorGridLines.type `String`

The type of grid lines to draw for radar charts:

* "line" - draws straight lines.
* "arc" - draws arcs.

The default type is "line" except for "radarColumn" charts.

#### Example - use arcs for radarLine chart

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        majorGridLines: {
          type: "arc"
        }
      }],
      series: [
        {
          type: "radarLine",
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### valueAxis.majorGridLines.visible `Boolean` *(default: false)*

If set to `true` the chart will display the major grid lines. By default the major grid lines are visible.

#### Example - hide the value axis major grid lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        majorGridLines: {
          visible: false
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.majorGridLines.width `Number` *(default: 1)*

The width of the value axis major grid lines in pixels.

#### Example - set the value axis major grid lines width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        majorGridLines: {
          width: 3
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.majorGridLines.step `Number` *(default: 1)*

The step of the value axis major grid lines.

#### Example - set the value axis major grid lines step

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        majorGridLines: {
          step: 2
        }
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### valueAxis.majorGridLines.skip `Number` *(default: 0)*

The skip of the value axis major grid lines.

#### Example - set the value axis major grid lines skip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        majorGridLines: {
          skip: 2
        }
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### valueAxis.majorUnit `Number`

The interval between major divisions.
If the [valueAxis.type](#configuration-valueAxis.type) is set to `"log"`, the majorUnit value will be used for the base of the logarithm.

#### Example - set the value axis major unit

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        majorUnit: 1
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the base of the logarithm for a logarithmic value axis.

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        type: "log",
        majorUnit: 2
      },
      series: [
        { data: [5, 8, 1024] }
      ]
    });
    </script>

### valueAxis.max `Number` *(default: 1)*

The maximum value of the axis.

#### Example - set the value axis maximum

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
         max: 10
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.min `Number` *(default: 0)*

The minimum value of the axis.

#### Example - set the value axis minimum

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
         min: 10
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.minorGridLines `Object`

The configuration of the minor grid lines. These are the lines that are an extension of the minor ticks through the
body of the chart.

#### Example - configure the value axis minor grid lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        minorGridLines: {
          width: 3,
          color: "green"
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.minorGridLines.color `String` *(default: "black")*

The color of the minor grid lines. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis minor grid line color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        minorGridLines: {
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis minor grid line color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        minorGridLines: {
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis minor grid line color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        minorGridLines: {
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.minorGridLines.dashType `String` *(default: "solid")*

The dash type of the minor grid lines.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the value axis minor grid line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        minorGridLines: {
          dashType: "dashDot"
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>


### valueAxis.minorGridLines.type `String`

The type of grid lines to draw for radar charts:

* "line" - draws straight lines.
* "arc" - draws arcs.

The default type is "line" except for "radarColumn" charts.

#### Example - show arcs for both major and minor gridlines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        minorGridLines: {
          type: "arc",
          visible: true
        },
        majorGridLines: {
          type: "arc"
        }
      }],
      series: [
        {
          type: "radarLine",
          data: [1, 2, 3]
        }
      ]
    });
    </script>

### valueAxis.minorGridLines.visible `Boolean` *(default: false)*

If set to `true` the chart will display the minor grid lines. By default the minor grid lines are visible.

#### Example - hide the value axis minor grid lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        minorGridLines: {
          visible: false
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.minorGridLines.width `Number` *(default: 1)*

The width of the value axis minor grid lines in pixels.

#### Example - set the value axis minor grid lines width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        minorGridLines: {
          width: 3
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.minorGridLines.step `Number` *(default: 1)*

The step of the value axis minor grid lines.

#### Example - set the value axis minor grid lines step

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        minorGridLines: {
          step: 2
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### valueAxis.minorGridLines.skip `Number` *(default: 0)*

The skip of the value axis minor grid lines.

#### Example - set the value axis minor grid lines skip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        minorGridLines: {
          skip: 2
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### valueAxis.majorTicks `Object`

The configuration of the value axis major ticks.

#### Example - configure the value axis major ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        majorTicks: {
          size: 6,
          color: "green",
          width: 5
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.majorTicks.color `String` *(default: "black")*

The color of the value axis major ticks lines. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis major ticks color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        majorTicks: {
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis major ticks color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        majorTicks: {
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis major ticks color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        majorTicks: {
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.majorTicks.size `Number` *(default: 4)*

The length of the tick line in pixels.

#### Example - set the value axis major ticks size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        majorTicks: {
          size: 6
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.majorTicks.visible `Boolean` *(default: true)*

If set to `true` the chart will display the value axis major ticks. By default the value axis major ticks are visible.

### valueAxis.majorTicks.step `Number` *(default: 1)*

The step of the value axis major ticks.

#### Example - set the value axis major ticks step

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        majorTicks: {
          step: 2
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### valueAxis.majorTicks.skip `Number` *(default: 0)*

The skip of the value axis major ticks.

#### Example - set the value axis major ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        majorTicks: {
          skip: 2
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### valueAxis.minorTicks `Object`

The configuration of the value axis minor ticks.

#### Example - configure the value axis minor ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        minorTicks: {
          size: 6,
          color: "green",
          width: 5,
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.minorTicks.color `String` *(default: "black")*

The color of the value axis minor ticks lines. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis minor ticks color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        minorTicks {
          color: "#aa00bb",
          visible: true
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis minor ticks color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        minorTicks {
          color: "rgb(128, 0, 255)",
          visible: true
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis minor ticks color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        minorTicks {
          color: "green",
          visible: true
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.minorTicks.size `Number` *(default: 4)*

The length of the tick line in pixels.

#### Example - set the value axis minor ticks size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        minorTicks: {
          size: 6,
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.minorTicks.visible `Boolean` *(default: false)*

If set to `true` the chart will display the value axis minor ticks. By default the value axis minor ticks are not visible.

#### Example - hide the value axis minor ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        minorTicks: {
          visible: false
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.minorTicks.width `Number` *(default: 1)*

The width of the minor ticks in pixels.

#### Example - set the value axis minor ticks width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        minorTicks: {
          width: 3
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.minorTicks.step `Number` *(default: 1)*

The step of the value axis minor ticks.

#### Example - set the value axis minor ticks step

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        minorTicks: {
          step: 2
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### valueAxis.minorTicks.skip `Number` *(default: 0)*

The skip of the value axis minor ticks.

#### Example - set the value axis minor ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        minorTicks: {
          skip: 2
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### valueAxis.minorUnit `Number`

The interval between minor divisions. It defaults to 1/5th of the [valueAxis.majorUnit](#configuration-valueAxis.majorUnit).
If the [valueAxis.type](#configuration-valueAxis.type) is set to `"log"`, the minorUnit value represents the number of divisions between two major units and defaults to the major unit minus one.

#### Example - set the value axis minor unit

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        minorUnit: 2
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the logarithmic value axis minor unit

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        type: "log",
        minorUnit: 2,
        minorGridLines: {
          visible: true
        }
      },
      series: [
        { data: [1, 10] }
      ]
    });
    </script>

### valueAxis.name `String` *(default: "primary")*

The unique axis name. Used to associate a series with a value axis using the [series.axis](#configuration-series.axis) option.

#### Example - set the value axis name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1,2,3] },
        { data: [1,2,3,4],
          axis: "secondValueAxis"
        }
      ],
      panes:[
        { name: "topPane" },
        { name: "bottomPane" }
      ],
      valueAxis: [
        { pane: "topPane" },
        { name: "secondValueAxis", pane: "bottomPane" }
      ]
    });
    </script>

### valueAxis.narrowRange `Boolean`

If set to `true` the chart will prevent the automatic axis range from snapping to 0.
Setting it to `false` will force the automatic axis range to snap to 0.

#### Example - prevent automatic axis range snapping

    <div id="chart"></div>
    <script>
        $("#chart").kendoChart({
            valueAxis: {
                narrowRange: true
            },
            series: [{
                data: [1000, 2000]
            }]
        });
    </script>

#### Example - force automatic axis range snapping

    <div id="chart"></div>
    <script>
        $("#chart").kendoChart({
            valueAxis: {
                narrowRange: false
            },
            series: [{
                data: [1000, 1100]
            }]
        });
    </script>

### valueAxis.pane `String`

The name of the pane that the value axis should be rendered in.
The axis will be rendered in the first (default) pane if not set.

#### Example - set the value axis pane
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1,2,3] },
        { data: [1,2,3,4],
          axis: "secondValueAxis"
        }
      ],
      panes:[
        { name: "topPane" },
        { name: "bottomPane" }
      ],
      valueAxis: [
        { pane: "topPane" },
        { name: "secondValueAxis", pane: "bottomPane" }
      ]
    });
    </script>

### valueAxis.plotBands `Array`

The plot bands of the value axis.

#### Example - set the value plot bands

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis:  {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.plotBands.color `String`

The color of the plot band.

#### Example - set the value plot band color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis:  {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.plotBands.from `Number`

The start position of the plot band in axis units.

#### Example - set the value plot band start position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis:  {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.plotBands.opacity `Number`

The opacity of the plot band.

#### Example - set the value plot band opacity

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis:  {
        plotBands: [
          { from: 1, to: 2, color: "red", opacity: 0.5 }
        ]
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.plotBands.to `Number`

The end position of the plot band in axis units.

#### Example - set the value plot band end position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis:  {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.reverse `Boolean` *(default: false)*

If set to `true` the value axis direction will be reversed. By default categories are listed from left to right and from bottom to top.

#### Example - reverse the value axis

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis:  {
        categories: ["2012", "2013"],
        reverse: true
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title `Object`

The title configuration of the value axis.

> The [valueAxis.title.text](#configuration-valueAxis.title.text) option must be set in order to display the title.


#### Example - set the value axis title
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        title: {
          text: "Years",
          background: "green",
          border: {
            width: 1,
          }
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.background `String`

The background color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis title background
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        title: {
          text: "Years",
          background: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.border `Object`

The border of the title.

#### Example - set the value axis title border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          border: {
            color: "green",
            dashType: "dashDot",
            width: 1
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis title border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          border: {
            color: "green",
            width: 1
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the value axis title border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          border: {
            dashType: "dashDot",
            width: 1
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the value axis title border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          border: {
            width: 1
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.color `String`

The text color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis title color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        title: {
          text: "Years",
          color: "#aa00bb"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis title color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        title: {
          text: "Years",
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the value axis title color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        title: {
          text: "Years",
          color: "green"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.font `String` *(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

#### Example - set the value axis title font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
           text: "Years",
           font: "20px sans-serif",
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.margin `Number|Object` *(default: 5)*

The margin of the title. A numeric value will set all margins.

#### Example - set the value axis title margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          margin: 20
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.margin.bottom `Number` *(default: 0)*

The bottom margin of the title.

#### Example - set the value axis title bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          margin: {
            bottom: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.margin.left `Number` *(default: 0)*

The left margin of the title.

#### Example - set the value axis title left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          margin: {
            left: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.margin.right `Number` *(default: 0)*

The right margin of the title.

#### Example - set the value axis title right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          margin: {
            right: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.margin.top `Number` *(default: 0)*

The top margin of the title.

#### Example - set the value axis title top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          margin: {
            top: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.padding `Number|Object` *(default: 0)*

The padding of the title. A numeric value will set all paddings.

#### Example - set the value axis title padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          padding: 20
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.padding.bottom `Number` *(default: 0)*

The bottom padding of the title.

#### Example - set the value axis title bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          padding: {
            bottom: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.padding.left `Number` *(default: 0)*

The left padding of the title.

#### Example - set the value axis title left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          padding: {
            left: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.padding.right `Number` *(default: 0)*

The right padding of the title.

#### Example - set the value axis title right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          padding: {
            right: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.padding.top `Number` *(default: 0)*

The top padding of the title.

#### Example - set the value axis title top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          padding: {
            top: 20
          }
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.position `String` *(default: "center")*

The position of the title.

The supported values are:

* "top" - the axis title is positioned on the top (applicable to vertical axis)
* "bottom" - the axis title is positioned on the bottom (applicable to vertical axis)
* "left" - the axis title is positioned on the left (applicable to horizontal axis)
* "right" - the axis title is positioned on the right (applicable to horizontal axis)
* "center" - the axis title is positioned in the center

#### Example - set the value axis title position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        title: {
          text: "Years",
          position: "left"
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.rotation `Number` *(default: 0)*

The rotation angle of the title. By default the title is not rotated.

#### Example - rotate the value axis title

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years",
          rotation: 90
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.text `String`

The text of the title.

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example - set the value axis title text

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years"
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.visible `Boolean` *(default: true)*

If set to `true` the chart will display the value axis title. By default the value axis title is visible.

#### Example - hide the value axis title
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: [{
        title: {
          text: "Years"
          visible: false
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### valueAxis.title.visual `Function`

A function that can be used to create a custom visual for the title. The available argument fields are:

* text - the label text.
* rect - the `kendo.geometry.Rect` that defines where the visual should be rendered.
* sender - the chart instance (may be undefined).
* options - the label options.
* createVisual - a function that can be used to get the default visual.

#### Example - using custom visual for the title

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        valueAxis: [{
          title: {
            text: "Years",
            visual: function(e) {
              return new kendo.drawing.Text(e.text, e.rect.origin, {
                fill: {
                  color: "red"
                }
              });
            }
          }
        }],
        series: [
          { data: [1, 2, 3] }
        ]
      });
    </script>

### valueAxis.type `String` *(default: "numeric")*

The axis type.

The supported values are:

* "numeric" - numeric axis.
* "log" - logarithmic axis.

#### Example - using logarithmic value axis

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        type: "log"
      },
      series: [
        { data: [5, 7, 11123] }
      ]
    });
    </script>

### valueAxis.visible `Boolean` *(default: true)*

If set to `true` the chart will display the value axis. By default the value axis is visible.

#### Example - hide the value axis

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      valueAxis: {
        visible: false
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

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

The [template](/api/javascript/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the value value

> The text can be split into multiple lines by using line feed characters ("\n").

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

The format used to display the notes label. Uses [kendo.format](/api/javascript/kendo#methods-format). Contains one placeholder ("{0}") which represents the axis value.

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

The [template](/api/javascript/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the axis value

> The text can be split into multiple lines by using line feed characters ("\n").

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

The format used to display the note label. Uses [kendo.format](/api/javascript/kendo#methods-format). Contains one placeholder ("{0}") which represents the axis value.

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

### valueAxis.notes.visual `Function`

A function that can be used to create a custom visual for the notes. The available argument fields are:

* rect - the `kendo.geometry.Rect` that defines the note target rect.
* options - the note options.
* createVisual - a function that can be used to get the default visual.
* value - the note value.

#### Example - use custom visual for the notes

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          data: [1, 2, 3]
        }],
        valueAxis: {
          notes: {
            data: [{
              value: 1
            }],
            visual: function (e) {
              var targetPoint = { x: e.rect.origin.x, y: e.rect.center().y };
              var line = new kendo.drawing.Path()
              .moveTo(targetPoint.x, targetPoint.y)
              .lineTo(targetPoint.x + 10, targetPoint.y);
              var circle = new kendo.drawing.Circle(new kendo.geometry.Circle([targetPoint.x + 30, targetPoint.y], 20), {
                fill: {
                  color: "red"
                }
              });

              return new kendo.drawing.Group().append(line, circle);
            }
          }
        }
      });
    </script>

### xAxis `Array`

The X-axis configuration options of the scatter chart X-axis. Supports all [valueAxis](#configuration-valueAxis) options.

#### Example - set the scatter chart x axis
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        color: "red",
        min: -5,
        max: 5,
        labels: {
          background: "green",
          color: "white"
        }
      }
    });
    </script>

### xAxis.axisCrossingValue `Object|Date|Array`

Value at which the Y axis crosses this axis. (Only for object)

Value indices at which the Y axes cross the value axis. (Only for array)

Date at which the Y axis crosses this axis. (Only for date)

> Set a value greater than or equal to the axis maximum value to denote the far end of the axis.

#### Example - set the scatter chart x axis crossing values
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        axisCrossingValue: [1, 2]
      }
    });
    </script>

### xAxis.background `String`

The background color of the axis.

#### Example - set the category axis crossing values

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        background: "#ff0000"
      }
    });
    </script>

### xAxis.baseUnit `String`

The base time interval for the axis labels. The default baseUnit is determined automatically from the value range. Available options:

* seconds
* minutes
* hours
* days
* weeks
* months
* years

#### Example - set the scatter chart x axis base unit
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [new Date("01/01/2013"), 2],
            [new Date("01/02/2013"), 2],
            [new Date("01/03/2013"), 2]
          ]
        }
      ],
      xAxis: {
        type: "date",
        baseUnit: "hours"
      }
    });
    </script>

### xAxis.color `String`

The color of the axis. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart x axis color
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        color: "red"
      }
    });
    </script>

### xAxis.crosshair `Object`

The crosshair configuration options.

> The crosshair is displayed when the [xAxis.crosshair.visible](#configuration-xAxis.crosshair.visible) option is set to `true`.

#### Example - set the scatter chart x axis crosshair options

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          color: "green",
          width: 2,
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.color `String`

The color of the crosshair. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart x axis crosshair color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          color: "green",
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.dashType `string` *(default: "solid")*

The dash type of the crosshair.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the value crosshair line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          dashType: "dashDot",
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.opacity `Number` *(default: 1)*

The opacity of the crosshair. By default the crosshair is opaque.

#### Example - set the scatter chart x axis crosshair opacity

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          opacity: 0.1,
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip `Object`

The crosshar tooltip options.

> The crosshair tooltip is displayed when the [xAxis.crosshair.tooltip.visible](#configuration-xAxis.crosshair.tooltip.visible) option is set to `true`.

#### Example - configure the scatter chart x axis crosshair tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          tooltip: {
            background: "green",
            border: {
              color: "black",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.background `String`

The background color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart x axis crosshair tooltip background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          tooltip: {
            background: "green",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.border `Object`

The border options.

#### Example - set the scatter chart x axis crosshair tooltip border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          tooltip: {
            border: {
              color: "black",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart x axis crosshair tooltip border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          tooltip: {
            border: {
              color: "black",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the scatter chart x axis crosshair tooltip border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          tooltip: {
            border: {
              dashType: "dashDot",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the scatter chart x axis crosshair tooltip border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          tooltip: {
            border: {
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.color `String`

The text color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart x axis crosshair tooltip color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          tooltip: {
            color: "#aa00bb",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

#### Example - set the scatter chart x axis crosshair tooltip color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          tooltip: {
            color: "rgb(128, 0, 255)",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

#### Example - set the scatter chart x axis crosshair tooltip color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          tooltip: {
            color: "green",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

#### Example - set the scatter chart x axis crosshair tooltip font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          tooltip: {
            font: "20px sans-serif",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.format `String` *(default: "{0}")*

The format used to display the tooltip. Uses [kendo.format](/api/javascript/kendo#methods-format). Contains one placeholder ("{0}") which represents the value value.

#### Example - set the scatter chart x axis crosshair tooltip format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          tooltip: {
            format: "Year: {0}",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.padding `Number|Object` *(default: 0)*

The padding of the crosshair tooltip. A numeric value will set all paddings.

#### Example - set the scatter chart x axis crosshair tooltip padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        crosshair: {
          tooltip: {
            padding: 20,
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.padding.bottom `Number` *(default: 0)*

The bottom padding of the crosshair tooltip.

#### Example - set the scatter chart x axis crosshair tooltip bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              bottom: 20
            },
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.padding.left `Number` *(default: 0)*

The left padding of the crosshair tooltip.

#### Example - set the scatter chart x axis crosshair tooltip left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              left: 20
            },
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.padding.right `Number` *(default: 0)*

The right padding of the crosshair tooltip.

#### Example - set the scatter chart x axis crosshair tooltip right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              right: 20
            },
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.padding.top `Number` *(default: 0)*

The top padding of the crosshair tooltip.

#### Example - set the scatter chart x axis crosshair tooltip top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              top: 20
            },
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the tooltip.

The fields which can be used in the template are:

* value - the value value

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example - set the scatter chart x axis crosshair tooltip template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        crosshair: {
          tooltip: {
            template: "Year: #: value #",
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the scatter chart x axis crosshair tooltip template as a function

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        crosshair: {
          tooltip: {
            template: kendo.template("Year: #: value #"),
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### xAxis.crosshair.tooltip.visible `Boolean` *(default: false)*

If set to `true` the chart will display the scatter chart x axis crosshair tooltip. By default the scatter chart x axis crosshair tooltip is not visible.

#### Example - show the scatter chart x axis crosshair tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          tooltip: {
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.visible `Boolean` *(default: false)*

If set to `true` the chart will display the scatter chart x axis crosshair. By default the scatter chart x axis crosshair is not visible.

#### Example - show the scatter chart x axis crosshair

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.crosshair.width `Number` *(default: 1)*

The width of the crosshair in pixels.

#### Example - set the scatter chart x axis crosshair width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        crosshair: {
          width: 2,
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.labels `Object`

The axis labels configuration.

#### Example - set the scatter chart x axis labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          background: "green",
          color: "white"
        }
      }
    });
    </script>

### xAxis.labels.background `String`

The background color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart x axis label background as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          background: "#aa00bb"
        }
      }
    });
    </script>

#### Example - set the scatter chart x axis label background as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          background: "rgb(128, 0, 255)"
        }
      }
    });
    </script>

#### Example - set the scatter chart x axis label background by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          background: "red"
        }
      }
    });
    </script>

### xAxis.labels.border `Object`

The border of the labels.

#### Example - set the scatter chart x axis label border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          border: {
            width: 1,
            color: "green",
            dashType: "dashDot"
          }
        }
      }
    });
    </script>

### xAxis.labels.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart x axis label color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          border: {
            width: 1,
            color: "green"
          }
        }
      }
    });
    </script>

### xAxis.labels.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the scatter chart x axis label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          border: {
            width: 1,
            dashType: "dashDot"
          }
        }
      }
    });
    </script>

### xAxis.labels.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the scatter chart x axis label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          border: {
            width: 1
          }
        }
      }
    });
    </script>

### xAxis.labels.color `String`

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart x axis label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          color: "#aa00bb"
        }
      }
    });
    </script>

#### Example - set the scatter chart x axis label color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          color: "rgb(128, 0, 255)"
        }
      }
    });
    </script>

#### Example - set the scatter chart x axis label color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          color: "red"
        }
      }
    });
    </script>

### xAxis.labels.culture `String`

The culture to use when formatting date values. See the [globalization overview](/framework/globalization/overview) for more information.

### xAxis.labels.dateFormats `Object`

The format used to display the labels when the x values are dates. Uses [kendo.format](/api/javascript/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

> The chart will choose the appropriate format for the current [xAxis.baseUnit](#configuration-xAxis.baseUnit). Setting the [categoryAxis.labels.format](#configuration-categoryAxis.labels.format) option will override the date formats.

#### Example - set the scatter chart x axis date formats

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [new Date("01/01/2013"), 2],
            [new Date("01/02/2013"), 2],
            [new Date("01/03/2013"), 2]
          ]
        }
      ],
      xAxis: {
        type: "date",
        labels: {
          dateFormats: {
            days: "M-d"
          }
        }
      }
    });
    </script>

### xAxis.labels.dateFormats.days `String` *(default: "M/d")*

The format used when [xAxis.baseUnit](#configuration-xAxis.baseUnit) is set to "days".

#### Example - set the days format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [new Date("01/01/2013"), 2],
            [new Date("01/02/2013"), 2],
            [new Date("01/03/2013"), 2]
          ]
        }
      ],
      xAxis: {
        type: "date",
        baseUnit: "days",
        labels: {
          dateFormats: {
            days: "M-d"
          }
        }
      }
    });
    </script>

### xAxis.labels.dateFormats.hours `String` *(default: "HH:mm")*

The format used when [xAxis.baseUnit](#configuration-xAxis.baseUnit) is set to "hours".

#### Example - set the hours format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [new Date("01/01/2013"), 2],
            [new Date("01/02/2013"), 2],
            [new Date("01/03/2013"), 2]
          ]
        }
      ],
      xAxis: {
        type: "date",
        baseUnit: "hours",
        labels: {
          dateFormats: {
            hours: "HH mm"
          }
        }
      }
    });
    </script>

### xAxis.labels.dateFormats.months `String` *(default: "MMM 'yy")*

The format used when [xAxis.baseUnit](#configuration-xAxis.baseUnit) is set to "months".

#### Example - set the months format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [new Date("01/01/2013"), 2],
            [new Date("01/02/2013"), 2],
            [new Date("01/03/2013"), 2]
          ]
        }
      ],
      xAxis: {
        type: "date",
        baseUnit: "months",
        labels: {
          dateFormats: {
            months: "MMM-yy"
          }
        }
      }
    });
    </script>

### xAxis.labels.dateFormats.weeks `String` *(default: "M/d")*

The format used when [xAxis.baseUnit](#configuration-xAxis.baseUnit) is set to "weeks".

#### Example - set the weeks format
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [new Date("01/01/2013"), 2],
            [new Date("01/02/2013"), 2],
            [new Date("01/03/2013"), 2]
          ]
        }
      ],
      xAxis: {
        type: "date",
        baseUnit: "weeks",
        labels: {
          dateFormats: {
            weeks: "M-d"
          }
        }
      }
    });
    </script>

### xAxis.labels.dateFormats.years `String` *(default: "yyyy")*

The format used when [xAxis.baseUnit](#configuration-xAxis.baseUnit) is set to "years".

#### Example - set the years format
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [new Date("01/01/2013"), 2],
            [new Date("01/02/2013"), 2],
            [new Date("01/03/2013"), 2]
          ]
        }
      ],
      xAxis: {
        type: "date",
        baseUnit: "years",
        labels: {
          dateFormats: {
            years: "yy"
          }
        }
      }
    });
    </script>

### xAxis.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example - set the scatter chart x axis label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          font: "20px sans-serif"
        }
      }
    });
    </script>

### xAxis.labels.format `String`

The format used to display the labels. Uses [kendo.format](/api/javascript/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

#### Example - set the scatter chart x axis label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          format: "{0:C}"
        }
      }
    });
    </script>

### xAxis.labels.margin `Number|Object`

The margin of the labels. A numeric value will set all margins.

#### Example - set the scatter chart x axis label margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          margin: 10
        }
      }
    });
    </script>

### xAxis.labels.margin.bottom `Number`

The bottom margin of the labels.

#### Example - set the scatter chart x axis label bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          margin: {
            bottom: 10
          }
        }
      }
    });
    </script>

### xAxis.labels.margin.left `Number`

The left margin of the labels.

#### Example - set the scatter chart x axis label left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          margin: {
            left: 10
          }
        }
      }
    });
    </script>

### xAxis.labels.margin.right `Number`

The right margin of the labels.

#### Example - set the scatter chart x axis label right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          margin: {
            right: 10
          }
        }
      }
    });
    </script>

### xAxis.labels.margin.top `Number`

The top margin of the labels.

#### Example - set the scatter chart x axis label top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          margin: {
            top: 10
          }
        }
      }
    });
    </script>

### xAxis.labels.mirror `Boolean`

If set to `true` the chart will mirror the axis labels and ticks. If the labels are normally on the left side of the axis, mirroring the axis will render them to the right.

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          mirror: true
        }
      }
    });
    </script>

### xAxis.labels.padding `Number|Object` *(default: 0)*

The padding of the labels. A numeric value will set all paddings.

#### Example - set the scatter chart x axis label padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          padding: 10
        }
      }
    });
    </script>

### xAxis.labels.padding.bottom `Number` *(default: 0)*

The bottom padding of the labels.

#### Example - set the scatter chart x axis label bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          padding: {
            bottom: 10
          }
        }
      }
    });
    </script>

### xAxis.labels.padding.left `Number` *(default: 0)*

The left padding of the labels.

#### Example - set the scatter chart x axis label left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          padding: {
            left: 10
          }
        }
      }
    });
    </script>

### xAxis.labels.padding.right `Number` *(default: 0)*

The right padding of the labels.

#### Example - set the scatter chart x axis label right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          padding: {
            right: 10
          }
        }
      }
    });
    </script>

### xAxis.labels.padding.top `Number` *(default: 0)*

The top padding of the labels.

#### Example - set the scatter chart x axis label top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          padding: {
            top: 10
          }
        }
      }
    });
    </script>

### xAxis.labels.rotation `Number|String|Object` *(default: 0)*

The rotation angle of the labels. By default the labels are not rotated. Can be set to `"auto"` in which case the labels will be rotated only if the slot size is not sufficient for the entire labels.

#### Example - set the scatter chart x axis label rotation

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          rotation: 90
        }
      }
    });
    </script>

#### Example - enable auto rotation for the x axis labels

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [
          {
            type: "scatter",
            data: [
              [new Date("01/01/2013"), 2],
              [new Date("01/02/2013"), 2],
              [new Date("01/03/2013"), 2]
            ]
          }
        ],
        xAxis: {
          type: "date",
          labels: {
            rotation: "auto",
            format: "F"
          }
        }
      });
    </script>

### xAxis.labels.rotation.align `String` *(default: "end")*

The alignment of the rotated labels relative to the slot center. The supported values are `"end"` and `"center"`. By default the closest end of the label will be aligned to the center. If set to `"center"`, the center of the rotated label will be aligned instead.

#### Example - align the rotated x axis labels

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [
          {
            type: "scatter",
            data: [
              [new Date("01/01/2013"), 2],
              [new Date("01/02/2013"), 2],
              [new Date("01/03/2013"), 2]
            ]
          }
        ],
        xAxis: {
          type: "date",
          labels: {
            rotation: {
              angle: -45,
              align: "center"
            }
          }
        }
      });
    </script>

### xAxis.labels.rotation.angle `Number|String` *(default: 0)*

The rotation angle of the labels. By default the labels are not rotated. Can be set to `"auto"` in which case the labels will be rotated only if the slot size is not sufficient for the entire labels.

#### Example - set the scatter chart x axis label rotation angle

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [
          { type: "scatter", data: [[1, 2]] }
        ],
        xAxis: {
          labels: {
            rotation: {
              angle: 90
            }
          }
        }
      });
    </script>

### xAxis.labels.skip `Number` *(default: 1)*

The number of labels to skip.

#### Example - skip  scatter chart x axis labels
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          skip: 2
        }
      }
    });
    </script>

### xAxis.labels.step `Number` *(default: 1)*

The label rendering step - render every n-th label. By default every label is rendered.

#### Example - render every odd x axis label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      xAxis: {
        labels: {
          step: 2
        }
      }
    });
    </script>

### xAxis.labels.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the category value

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example - set the scatter chart x axis label template as a string
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [ [1, 2] ]
        }
      ],
      xAxis: {
        labels: {
          template: "X: #: value #"
        }
      }
    });
    </script>

#### Example - set the scatter chart x axis label template as a function
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [ [1, 2] ]
        }
      ],
      xAxis: {
        labels: {
          template: kendo.template("X: #: value #")
        }
      }
    });
    </script>

### xAxis.labels.visible `Boolean` *(default: true)*

If set to `true` the chart will display the x axis labels. By default the x axis labels are visible.

#### Example - hide the scatter chart x axis labels
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [ [1, 2] ]
        }
      ],
      xAxis: {
        labels: {
          visible: false
        }
      }
    });
    </script>

### xAxis.labels.visual `Function`

A function that can be used to create a custom visual for the labels. The available argument fields are:

* createVisual - a function that can be used to get the default visual.
* culture - the default culture (if set) on the label
* format - the default format of the label
* options - the label options.
* rect - the `kendo.geometry.Rect` that defines where the visual should be rendered.
* sender - the chart instance (may be undefined).
* text - the label text.
* value - the category value

#### Example - using custom visual for the labels

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [
          {
            type: "scatter",
            data: [ [1, 2] ]
          }
        ],
        xAxis: {
          labels: {
            visual: function(e) {
              return new kendo.drawing.Text(e.text, e.rect.origin, {
                fill: {
                  color: "red"
                }
              });
            }
          }
        }
      });
    </script>

### xAxis.line `Object`

The configuration of the axis lines. Also affects the major and minor ticks, but not the grid lines.

#### Example - configure the scatter chart x axis line

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        line: {
          color: "#aa00bb",
          width: 3
        }
      }
    });
    </script>

### xAxis.line.color `String` *(default: "black")*

The color of the lines. Accepts a valid CSS color string, including hex and rgb.

> Setting the `color` option affects the major and minor ticks, but not the grid lines.

#### Example - set the scatter chart x axis line color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        line: {
          color: "#aa00bb"
        }
      }
    });
    </script>

#### Example - set the scatter chart x axis line color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        line: {
          color: "rgb(128, 0, 255)"
        }
      }
    });
    </script>

#### Example - set the scatter chart x axis line color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        line: {
          color: "green"
        }
      }
    });
    </script>

### xAxis.line.dashType `String` *(default: "solid")*

The dash type of the line.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the scatter chart x axis line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        line: {
          dashType: "dashDot"
        }
      }
    });
    </script>

### xAxis.line.visible `Boolean` *(default: true)*

If set to `true` the chart will display the x axis lines. By default the x axis lines are visible.

#### Example - hide the scatter chart x axis lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        line: {
          visible: false
        }
      }
    });
    </script>

### xAxis.line.width `Number` *(default: 1)*

The width of the line in pixels. Also affects the major and minor ticks, but not the grid lines.
#### Example - set the scatter chart x axis line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        line: {
          width: 3
        }
      }
    });
    </script>

### xAxis.majorGridLines `Object`

The configuration of the major grid lines. These are the lines that are an extension of the major ticks through the
body of the chart.

#### Example - configure the scatter chart x axis major grid lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        majorGridLines: {
          color: "#aa00bb",
          width: 3
        }
      }
    });
    </script>

### xAxis.majorGridLines.color `String` *(default: "black")*

The color of the lines. Accepts a valid CSS color string, including hex and rgb.

> Setting the `color` option affects the major and minor ticks, but not the grid lines.

#### Example - set the scatter chart x major grid lines color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        majorGridLines: {
          color: "#aa00bb"
        }
      }
    });
    </script>

#### Example - set the scatter chart x major grid lines color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        majorGridLines: {
          color: "rgb(128, 0, 255)"
        }
      }
    });
    </script>

#### Example - set the scatter chart x major grid lines color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        majorGridLines: {
          color: "green"
        }
      }
    });
    </script>

### xAxis.majorGridLines.dashType `String` *(default: "solid")*

The dash type of the line.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the scatter chart x major grid lines dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        majorGridLines: {
          dashType: "dashDot"
        }
      }
    });
    </script>

### xAxis.majorGridLines.visible `Boolean` *(default: true)*

If set to `true` the chart will display the x major grid liness. By default the x major grid liness are visible.

#### Example - hide the scatter chart x major grid liness

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        majorGridLines: {
          visible: false
        }
      }
    });
    </script>

### xAxis.majorGridLines.width `Number` *(default: 1)*

The width of the line in pixels. Also affects the major and minor ticks, but not the grid lines.
#### Example - set the scatter chart x major grid lines width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        majorGridLines: {
          width: 3
        }
      }
    });
    </script>

### xAxis.majorGridLines.step `Number` *(default: 1)*

The step of the x axis major grid lines.

#### Example - set the x axis major grid lines step

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        majorGridLines: {
          step: 2
        }
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### xAxis.majorGridLines.skip `Number` *(default: 0)*

The skip of the x axis major grid lines.

#### Example - set the x axis major grid lines skip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        majorGridLines: {
          skip: 2
        }
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### xAxis.minorGridLines `Object`

The configuration of the minor grid lines. These are the lines that are an extension of the minor ticks through the
body of the chart.

#### Example - configure the category axis minor grid lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        minorGridLines: {
          width: 3
        }
      }
    });
    </script>

### xAxis.minorGridLines.color `String` *(default: "black")*

The color of the minor grid lines. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis minor grid line color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        minorGridLines: {
          color: "#aa00bb"
        }
      }
    });
    </script>

#### Example - set the category axis minor grid line color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        minorGridLines: {
          color: "rgb(128, 0, 255)"
        }
      }
    });
    </script>

#### Example - set the category axis minor grid line color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        minorGridLines: {
          color: "green"
        }
      }
    });
    </script>

### xAxis.minorGridLines.dashType `String` *(default: "solid")*

The dash type of the minor grid lines.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the category axis minor grid line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        minorGridLines: {
          dashType: "dashDot"
        }
      }
    });
    </script>

### xAxis.minorGridLines.visible `Boolean` *(default: false)*

If set to `true` the chart will display the minor grid lines. By default the minor grid lines are visible.

#### Example - hide the category axis minor grid lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        minorGridLines: {
          visible: false
        }
      }
    });
    </script>

### xAxis.minorGridLines.width `Number` *(default: 1)*

The width of the category axis minor grid lines in pixels.

#### Example - set the category axis minor grid lines width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        minorGridLines: {
          width: 3
        }
      }
    });
    </script>

### xAxis.minorGridLines.step `Number` *(default: 1)*

The step of the x axis minor grid lines.

#### Example - set the x axis minor grid lines step

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        minorGridLines: {
          step: 2
        }
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### xAxis.minorGridLines.skip `Number` *(default: 0)*

The skip of the x axis minor grid lines.

#### Example - set the x axis minor grid lines skip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: [{
        minorGridLines: {
          skip: 2
        }
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### xAxis.minorTicks `Object`

The configuration of the x axis minor ticks.

#### Example - configure the x axis minor ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        minorTicks: {
          size: 6,
          color: "green",
          width: 5,
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### xAxis.minorTicks.color `String` *(default: "black")*

The color of the x axis minor ticks lines. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the x axis minor ticks color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        minorTicks {
          color: "#aa00bb",
          visible: true
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the x axis minor ticks color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        minorTicks {
          color: "rgb(128, 0, 255)",
          visible: true
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the x axis minor ticks color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        minorTicks {
          color: "green",
          visible: true
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### xAxis.minorTicks.size `Number` *(default: 4)*

The length of the tick line in pixels.

#### Example - set the x axis minor ticks size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        minorTicks: {
          size: 6,
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### xAxis.minorTicks.visible `Boolean` *(default: false)*

If set to `true` the chart will display the x axis minor ticks. By default the x axis minor ticks are not visible.

#### Example - hide the x axis minor ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        minorTicks: {
          visible: false
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### xAxis.minorTicks.width `Number` *(default: 1)*

The width of the minor ticks in pixels.

#### Example - set the x axis minor ticks width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        minorTicks: {
          width: 3
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### xAxis.minorTicks.step `Number` *(default: 1)*

The step of the x axis minor ticks.

#### Example - set the x axis minor ticks step

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        minorTicks: {
          step: 2
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### xAxis.minorTicks.skip `Number` *(default: 0)*

The skip of the x axis minor ticks.

#### Example - set the x axis minor ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        minorTicks: {
          skip: 2
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### xAxis.majorTicks `Object`

The configuration of the scatter chart x axis major ticks.

#### Example - configure the scatter chart x axis major ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        majorTicks: {
          size: 6,
          color: "green",
          width: 5
        }
      }
    });
    </script>

### xAxis.majorTicks.color `String` *(default: "black")*

The color of the scatter chart x axis major ticks lines. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart x axis major ticks color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        majorTicks: {
          color: "#aa00bb"
        }
      }
    });
    </script>

#### Example - set the scatter chart x axis major ticks color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        majorTicks: {
          color: "rgb(128, 0, 255)"
        }
      }
    });
    </script>

#### Example - set the scatter chart x axis major ticks color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        majorTicks: {
          color: "green"
        }
      }
    });
    </script>

### xAxis.majorTicks.size `Number` *(default: 4)*

The length of the tick line in pixels.

#### Example - set the scatter chart x axis major ticks size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        majorTicks: {
          size: 6
        }
      }
    });
    </script>

### xAxis.majorTicks.visible `Boolean` *(default: true)*

If set to `true` the chart will display the scatter chart x axis major ticks. By default the category axis major ticks are visible.

#### Example - hide the scatter chart x axis major ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        majorTicks: {
          visible: false
        }
      }
    });
    </script>

### xAxis.majorTicks.width `Number` *(default: 1)*

The width of the major ticks in pixels.

#### Example - set the scatter chart x axis major ticks width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        majorTicks: {
          width: 3
        }
      }
    });
    </script>

### xAxis.majorTicks.step `Number` *(default: 1)*

The step of the x axis major ticks.

#### Example - set the x axis major ticks step

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        majorTicks: {
          step: 2
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### xAxis.majorTicks.skip `Number` *(default: 0)*

The skip of the x axis major ticks.

#### Example - set the x axis major ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        majorTicks: {
          skip: 2
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### xAxis.majorUnit `Number`

The interval between major divisions.
If this is a date axis the value represents the number of [xAxis.baseUnits](#configuration-xAxis.baseUnit) between major divisions.
If the [xAxis.type](#configuration-xAxis.type) is set to `"log"`, the majorUnit value will be used for the base of the logarithm.

#### Example - set the scatter chart x axis major unit
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        majorUnit: 1
      }
    });
    </script>

#### Example - set both the baseUnit and major unit for a date axis
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatterLine",
        data: [[new Date(2012, 0, 1), 1],[new Date(2012, 0, 10), 2]]
      }],
      xAxis: {
        baseUnit: "days",
        majorUnit: 5
      }
    });
    </script>

#### Example - set the base for a logarithmic x axis

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatterLine",
        data: [[5, 1], [8, 2], [1024, 3]]
      }],
      xAxis: {
        type: "log",
        majorUnit: 2
      }
    });
    </script>

### xAxis.max `Object`

The maximum value of the axis.

#### Example - set the scatter chart x axis maximum
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        max: 5
      }
    });
    </script>

### xAxis.min `Object`

The minimum value of the axis.

#### Example - set the scatter chart x axis minimum
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      xAxis: {
        min: 1
      }
    });
    </script>

### xAxis.minorUnit `Number`

The interval between minor divisions. It defaults to 1/5th of the [xAxis.majorUnit](#configuration-xAxis.majorUnit).
If the [xAxis.type](#configuration-xAxis.type) is set to `"log"`, the minorUnit value represents the number of divisions between two major units and defaults to the major unit minus one.

#### Example - set the logarithmic x axis minor unit

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        type: "log",
        minorUnit: 2,
        minorGridLines: {
          visible: true
        }
      },
      series: [{
          type: "scatter",
          data: [[3, 1],[20, 2]]
        }]
    });
    </script>

### xAxis.name `String` *(default: "primary")*

The unique axis name. Used to associate a series with a x axis using the [series.xAxis](#configuration-series.xAxis) option.

#### Example - set the scatter chart x axis name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1000, 2000]], xAxis: "first" },
        { type: "scatter", data: [[5, 6]], xAxis: "second" }
      ],
      xAxis: [
        { name: "first"},
        { name: "second"}
      ]
    });
    </script>

### xAxis.narrowRange `Boolean` *(default: false)*

If set to `true` the chart will prevent the automatic axis range from snapping to 0.
Setting it to `false` will force the automatic axis range to snap to 0.

#### Example - prevent scatter chart axis automatic zero snapping
    <div id="chart"></div>
    <script>
        $("#chart").kendoChart({
          series: [{
            type: "scatter",
            data: [[1000, 1000],[2000, 2000]]
          }],
          xAxis: {
            narrowRange: true
          },
          xAxis: {
            narrowRange: true
          }
        });
    </script>

#### Example - force scatter chart axis zero snapping
    <div id="chart"></div>
    <script>
        $("#chart").kendoChart({
          series: [{
            type: "scatter",
            data: [[1000, 1000],[1100, 1100]]
          }],
          xAxis: {
            narrowRange: false
          },
          yAxis: {
            narrowRange: false
          }
        });
    </script>

### xAxis.pane `String`

The name of the pane that the axis should be rendered in.
The axis will be rendered in the first (default) pane if not set.

#### Example - set the scatter chart x axis pane
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]], xAxis: "first", yAxis: "first" },
        { type: "scatter", data: [[5, 6]], xAxis: "second", yAxis: "second" }
      ],
      panes: [
        { name: "topPane" },
        { name: "bottomPane" },
      ],
      xAxis: [
        { name: "first"},
        { name: "second", pane: "bottomPane" }
      ],
      yAxis: [
        { name: "first"},
        { name: "second", pane: "bottomPane" }
      ]
    });
    </script>

### xAxis.plotBands `Array`

The plot bands of the x axis.

#### Example - set the scatter chart x axis plot bands

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]]}
      ],
      xAxis: {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      }
    });
    </script>

### xAxis.plotBands.color `String`

The color of the plot band.

#### Example - set the scatter chart x axis plot band color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]]}
      ],
      xAxis: {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      }
    });
    </script>

### xAxis.plotBands.from `Number`

The start position of the plot band in axis units.

#### Example - set the scatter chart x axis plot band start position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]]}
      ],
      xAxis: {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      }
    });
    </script>

### xAxis.plotBands.opacity `Number`

The opacity of the plot band.

#### Example - set the scatter chart x axis plot band opacity

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]]}
      ],
      xAxis: {
        plotBands: [
          { from: 1, to: 2, color: "red", opacity: 0.5 }
        ]
      }
    });
    </script>

### xAxis.plotBands.to `Number`

The end position of the plot band in axis units.

#### Example - set the scatter chart x axis plot band end position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]]}
      ],
      xAxis: {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      }
    });
    </script>

### xAxis.reverse `Boolean` *(default: false)*

If set to `true` the value axis direction will be reversed. By default values increase from left to right and from bottom to top.

#### Example - reverse the scatter chart x axis

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]]}
      ],
      xAxis: {
        reverse: true
      }
    });
    </script>

### xAxis.startAngle `Number` *(default: 0)*

The angle (degrees) where the 0 value is placed.

Angles increase counterclockwise and zero is to the right. Negative values are acceptable.

### xAxis.title `Object`

The title configuration of the scatter chart x axis.

> The [xAxis.title.text](#configuration-xAxis.title.text) option must be set in order to display the title.

#### Example - set the scatter chart x axis title
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        title: {
          text: "Years",
          background: "green",
          border: {
            width: 1,
          }
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.background `String`

The background color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart x axis title background
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        title: {
          text: "Years",
          background: "green"
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.border `Object`

The border of the title.

#### Example - set the scatter chart x axis title border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          border: {
            color: "green",
            dashType: "dashDot",
            width: 1
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart x axis title border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          border: {
            color: "green",
            width: 1
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the scatter chart x axis title border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          border: {
            dashType: "dashDot",
            width: 1
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the scatter chart x axis title border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          border: {
            width: 1
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.color `String`

The text color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart x axis title color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        title: {
          text: "Years",
          color: "#aa00bb"
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

#### Example - set the scatter chart x axis title color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        title: {
          text: "Years",
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

#### Example - set the scatter chart x axis title color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        title: {
          text: "Years",
          color: "green"
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.font `String` *(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

#### Example - set the scatter chart x axis title font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
           text: "Years",
           font: "20px sans-serif",
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.margin `Number|Object` *(default: 5)*

The margin of the title. A numeric value will set all margins.

#### Example - set the scatter chart x axis title margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          margin: 20
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.margin.bottom `Number` *(default: 0)*

The bottom margin of the title.

#### Example - set the scatter chart x axis title bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          margin: {
            bottom: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.margin.left `Number` *(default: 0)*

The left margin of the title.

#### Example - set the scatter chart x axis title left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          margin: {
            left: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.margin.right `Number` *(default: 0)*

The right margin of the title.

#### Example - set the scatter chart x axis title right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          margin: {
            right: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.margin.top `Number` *(default: 0)*

The top margin of the title.

#### Example - set the scatter chart x axis title top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          margin: {
            top: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.padding `Number|Object` *(default: 0)*

The padding of the title. A numeric value will set all paddings.

#### Example - set the scatter chart x axis title padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          padding: 20
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.padding.bottom `Number` *(default: 0)*

The bottom padding of the title.

#### Example - set the scatter chart x axis title bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          padding: {
            bottom: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.padding.left `Number` *(default: 0)*

The left padding of the title.

#### Example - set the scatter chart x axis title left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          padding: {
            left: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.padding.right `Number` *(default: 0)*

The right padding of the title.

#### Example - set the scatter chart x axis title right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          padding: {
            right: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.padding.top `Number` *(default: 0)*

The top padding of the title.

#### Example - set the scatter chart x axis title top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          padding: {
            top: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.position `String` *(default: "center")*

The position of the title.

The supported values are:

* "top" - the axis title is positioned on the top (applicable to vertical axis)
* "bottom" - the axis title is positioned on the bottom (applicable to vertical axis)
* "left" - the axis title is positioned on the left (applicable to horizontal axis)
* "right" - the axis title is positioned on the right (applicable to horizontal axis)
* "center" - the axis title is positioned in the center

#### Example - set the scatter chart x axis title position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        title: {
          text: "Years",
          position: "left"
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.rotation `Number` *(default: 0)*

The rotation angle of the title. By default the title is not rotated.

#### Example - rotate the scatter chart x axis title

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years",
          rotation: 90
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.text `String`

The text of the title.

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example - set the scatter chart x axis title text

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years"
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.visible `Boolean` *(default: true)*

If set to `true` the chart will display the scatter chart x axis title. By default the scatter chart x axis title is visible.

#### Example - hide the scatter chart x axis title
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        title: {
          text: "Years"
          visible: false
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.title.visual `Function`

A function that can be used to create a custom visual for the title. The available argument fields are:

* text - the label text.
* rect - the `kendo.geometry.Rect` that defines where the visual should be rendered.
* sender - the chart instance (may be undefined).
* options - the label options.
* createVisual - a function that can be used to get the default visual.

#### Example - using custom visual for the title

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        xAxis: [{
          title: {
            text: "foo bar",
            visual: function (e) {
              var layout = new kendo.drawing.Layout(e.rect, {
                orientation: "vertical",
                alignContent: "center",
                justifyContent: "end"
              });
              var words = e.text.split(" ");
              for (var i = 0; i < words.length; i++) {
                layout.append(new kendo.drawing.Text(words[i]));
              }
              layout.reflow();
              return layout;
            }
          }
        }],
        series: [
          { type: "scatter", data: [[1, 2]] }
        ]
      });
    </script>

### xAxis.type `String` *(default: "numeric")*

The axis type.

The supported values are:

* "numeric" - numeric axis.
* "date" - specialized axis for displaying chronological data.
* "log" - logarithmic axis.

> The chart will automatically switch to a date axis if the series X value
is of type `Date`. Set the `xAsix.type` when such behavior is undesired.

#### Example - set the scatter chart x axis type
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [new Date("01/01/2013"), 2],
            [new Date("01/02/2013"), 2],
            [new Date("01/03/2013"), 2]
          ]
        }
      ],
      xAxis: {
        type: "date"
      }
    });
    </script>

### Example - using logarithmic x axis for the scatter chart

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [5, 2],
            [7, 2],
            [11123, 2]
          ]
        }
      ],
      xAxis: {
        type: "log"
      }
    });
    </script>

### xAxis.visible `Boolean` *(default: true)*

If set to `true` the chart will display the x axis. By default the x axis is visible.

#### Example - hide the scatter chart x axis

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: {
        visible: false
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### xAxis.notes `Object`

The x axis notes configuration.

### xAxis.notes.position `String`

The position of the x axis note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

### xAxis.notes.icon `Object`

The icon of the notes.

### xAxis.notes.icon.background `String`

The background color of the notes icon.

#### Example - set the x axis notes icon background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
        notes: {
          icon: {
            background: "red"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### xAxis.notes.icon.border `Object`

The border of the icon.

#### Example - set the x axis notes icon border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.icon.border.color `String`

The border color of the icon.

#### Example - set the x axis notes icon border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.icon.border.width `Number`

The border width of the icon.

#### Example - set the x axis notes icon border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.icon.size `Number`

The size of the icon.

#### Example - set the x axis notes icon size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
        notes: {
          icon: {
            size: 30
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### xAxis.notes.icon.type `String` *(default: "circle")*

The icon shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.

#### Example - set the x axis notes icon shape

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
        notes: {
          icon: {
            shape: "triangle"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### xAxis.notes.icon.visible `Boolean` *(default: "true")*

The icon visibility.

#### Example - set the x axis notes icon visibility

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
        notes: {
          icon: {
            visible: false
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### xAxis.notes.label `Object`

The label of the notes.

### xAxis.notes.label.background `String`

The background color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the x axis label background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
        notes: {
          label: {
            background: "red"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### xAxis.notes.label.border `Object`

The border of the label.

#### Example - set the x axis label border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.label.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the x axis label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.label.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the x axis label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.label.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the x axis label border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.label.color `String`

The text color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the x axis label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
        notes: {
          label: {
            color: "#aa00bb"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### xAxis.notes.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the label.

#### Example - set the chart series label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
        notes: {
          label: {
            font: "20px sans-serif"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### xAxis.notes.label.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the axis value

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example - set the x axis notes label template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
        notes: {
          label: {
            template: "Year: #: value #"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### xAxis.notes.label.visible `Boolean` *(default: true)*

If set to `true` the chart will display the x axis notes label. By default the x axis notes label are visible.

#### Example - hide the x axis notes label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
        notes: {
          label: {
            visible: false
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### xAxis.notes.label.rotation `Number` *(default: 0)*

The rotation angle of the label. By default the label are not rotated.

#### Example - rotate the x axis notes label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
        notes: {
          label: {
            rotation: 90
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### xAxis.notes.label.format `String` *(default: "{0}")*

The format used to display the notes label. Uses [kendo.format](/api/javascript/kendo#methods-format). Contains one placeholder ("{0}") which represents the axis value.

#### Example - set the x axis notes label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
        notes: {
          label: {
            format: "value slot: {0}"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### xAxis.notes.label.position `String` *(default: "inside")*

The position of the labels.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.

### xAxis.notes.line `Object`

The line of the notes.

### xAxis.notes.line.width `Number`

The line width of the notes.

#### Example - set the x axis notes line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
        notes: {
          line: {
            width: 4
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### xAxis.notes.line.color `String`

The line color of the notes.

#### Example - set the x axis notes color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
        notes: {
          line: {
            color: "#aa00bb"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### xAxis.notes.line.length `Number`

The length of the connecting lines in pixels.

#### Example - set the x axis notes color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
        notes: {
          line: {
            length: 20
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### xAxis.notes.data `Array`

The items of the notes.

### xAxis.notes.data.value `Object`

The value of the note.

### xAxis.notes.data.position `String`

The position of the x axis note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

### xAxis.notes.data.icon `Object`

The icon of the note.

### xAxis.notes.data.icon.background `String`

The background color of the note icon.

#### Example - set the x axis note icon background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.data.icon.border `Object`

The border of the icon.

#### Example - set the x axis note icon border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.data.icon.border.color `String`

The border color of the icon.

#### Example - set the x axis note icon border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.data.icon.border.width `Number`

The border width of the icon.

#### Example - set the x axis note icon border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.data.icon.size `Number`

The size of the icon.

#### Example - set the x axis note icon size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.data.icon.type `String` *(default: "circle")*

The icon shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.

#### Example - set the x axis note icon shape

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.data.icon.visible `Boolean` *(default: "true")*

The icon visibility.

#### Example - set the x axis note icon visibility

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.data.label `Object`

The label of the note.

### xAxis.notes.data.label.background `String`

The background color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the x axis note label background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.data.label.border `Object`

The border of the label.

#### Example - set the x axis note label border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.data.label.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the x axis note label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.data.label.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the x axis note label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.data.label.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the x axis note label border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.data.label.color `String`

The text color of the note label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the x axis note label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.data.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the note label.

#### Example - set the x axis note label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.data.label.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the axis value

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example - set the value axis note label template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.data.label.visible `Boolean` *(default: true)*

If set to `true` the chart will display the x axis notes label. By default the x axis notes label are visible.

#### Example - hide the x axis note label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.data.label.rotation `Number` *(default: 0)*

The rotation angle of the label. By default the label are not rotated.

#### Example - rotate the x axis note label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.data.label.format `String` *(default: "{0}")*

The format used to display the note label. Uses [kendo.format](/api/javascript/kendo#methods-format). Contains one placeholder ("{0}") which represents the axis value.

#### Example - set the x axis note label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.data.label.text `String`

The label note text.

#### Example - set the x axis label note text

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.data.label.position `String` *(default: "inside")*

The position of the x axis note label.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.

### xAxis.notes.data.line `Object`

The line of the note.

### xAxis.notes.data.line.width `Number`

The line width of the note.

#### Example - set the x axis note line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.data.line.color `String`

The line color of the note.

#### Example - set the x axis note color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.data.line.length `Number`

The length of the connecting lines in pixels.

#### Example - set the x axis note color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      xAxis: {
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

### xAxis.notes.visual `Function`

A function that can be used to create a custom visual for the notes. The available argument fields are:

* rect - the `kendo.geometry.Rect` that defines the note target rect.
* sender - the chart instance (may be undefined).
* options - the note options.
* createVisual - a function that can be used to get the default visual.
* value - the note value.

#### Example - use custom visual for the notes

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          type: "scatter",
          data: [[1, 2]]
        }],
        xAxis: {
          notes: {
            data: [{
              value: 1
            }],
            visual: function (e) {
              var targetPoint = { x: e.rect.center().x, y: e.rect.origin.y };
              var line = new kendo.drawing.Path()
              .moveTo(targetPoint.x, targetPoint.y)
              .lineTo(targetPoint.x, targetPoint.y - 10);
              var circle = new kendo.drawing.Circle(new kendo.geometry.Circle([targetPoint.x, targetPoint.y - 30], 20), {
                fill: {
                  color: "red"
                }
              });

              return new kendo.drawing.Group({
                zIndex: 1
              }).append(line, circle);
            }
          }
        }
      });
    </script>

### yAxis `Array`

The y axis configuration options of the scatter chart. Supports all [valueAxis](#configuration-valueAxis) options.

#### Example - set the scatter chart y axis
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        color: "red",
        min: -5,
        max: 5,
        labels: {
          background: "green",
          color: "white"
        }
      }
    });
    </script>

### yAxis.axisCrossingValue `Object|Date|Array`

Value at which the Y axis crosses this axis. (Only for object)

Value indices at which the Y axes cross the value axis. (Only for array)

Date at which the Y axis crosses this axis. (Only for date)

> Set a value greater than or equal to the axis maximum value to denote the far end of the axis.

#### Example - set the scatter chart y axis crossing values
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        axisCrossingValue: [1, 2]
      }
    });
    </script>

### yAxis.background `String`

The background color of the axis.

#### Example - set the category axis crossing values

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        background: "#ff0000"
      }
    });
    </script>

### yAxis.baseUnit `String`

The base time interval for the axis labels. The default baseUnit is determined automatically from the value range. Available options:

* seconds
* minutes
* hours
* days
* weeks
* months
* years

#### Example - set the scatter chart y axis base unit
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [2, new Date("01/01/2013")],
            [2, new Date("01/02/2013")],
            [2, new Date("01/03/2013")]
          ]
        }
      ],
      yAxis: {
        type: "date",
        baseUnit: "hours"
      }
    });
    </script>

### yAxis.color `String`

The color of the axis. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart y axis color
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        color: "red"
      }
    });
    </script>

### yAxis.crosshair `Object`

The crosshair configuration options.

> The crosshair is displayed when the [yAxis.crosshair.visible](#configuration-yAxis.crosshair.visible) option is set to `true`.

#### Example - set the scatter chart y axis crosshair options

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          color: "green",
          width: 2,
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.color `String`

The color of the crosshair. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart y axis crosshair color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          color: "green",
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.dashType `string` *(default: "solid")*

The dash type of the crosshair.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the value crosshair line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          dashType: "dashDot",
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.opacity `Number` *(default: 1)*

The opacity of the crosshair. By default the crosshair is opaque.

#### Example - set the scatter chart y axis crosshair opacity

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          opacity: 0.1,
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip `Object`

The crosshar tooltip options.

> The crosshair tooltip is displayed when the [yAxis.crosshair.tooltip.visible](#configuration-yAxis.crosshair.tooltip.visible) option is set to `true`.

#### Example - configure the scatter chart y axis crosshair tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          tooltip: {
            background: "green",
            border: {
              color: "black",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.background `String`

The background color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart y axis crosshair tooltip background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          tooltip: {
            background: "green",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.border `Object`

The border options.

#### Example - set the scatter chart y axis crosshair tooltip border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          tooltip: {
            border: {
              color: "black",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart y axis crosshair tooltip border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          tooltip: {
            border: {
              color: "black",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the scatter chart y axis crosshair tooltip border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          tooltip: {
            border: {
              dashType: "dashDot",
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the scatter chart y axis crosshair tooltip border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          tooltip: {
            border: {
              width: 2
            },
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.color `String`

The text color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart y axis crosshair tooltip color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          tooltip: {
            color: "#aa00bb",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

#### Example - set the scatter chart y axis crosshair tooltip color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          tooltip: {
            color: "rgb(128, 0, 255)",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

#### Example - set the scatter chart y axis crosshair tooltip color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          tooltip: {
            color: "green",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

#### Example - set the scatter chart y axis crosshair tooltip font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          tooltip: {
            font: "20px sans-serif",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.format `String` *(default: "{0}")*

The format used to display the tooltip. Uses [kendo.format](/api/javascript/kendo#methods-format). Contains one placeholder ("{0}") which represents the value value.

#### Example - set the scatter chart y axis crosshair tooltip format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          tooltip: {
            format: "Year: {0}",
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.padding `Number|Object` *(default: 0)*

The padding of the crosshair tooltip. A numeric value will set all paddings.

#### Example - set the scatter chart y axis crosshair tooltip padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        crosshair: {
          tooltip: {
            padding: 20,
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.padding.bottom `Number` *(default: 0)*

The bottom padding of the crosshair tooltip.

#### Example - set the scatter chart y axis crosshair tooltip bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              bottom: 20
            },
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.padding.left `Number` *(default: 0)*

The left padding of the crosshair tooltip.

#### Example - set the scatter chart y axis crosshair tooltip left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              left: 20
            },
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.padding.right `Number` *(default: 0)*

The right padding of the crosshair tooltip.

#### Example - set the scatter chart y axis crosshair tooltip right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              right: 20
            },
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.padding.top `Number` *(default: 0)*

The top padding of the crosshair tooltip.

#### Example - set the scatter chart y axis crosshair tooltip top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        crosshair: {
          tooltip: {
            padding: {
              top: 20
            },
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the tooltip.

The fields which can be used in the template are:

* value - the value value

#### Example - set the scatter chart y axis crosshair tooltip template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        crosshair: {
          tooltip: {
            template: "Year: #: value #",
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the scatter chart y axis crosshair tooltip template as a function

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        crosshair: {
          tooltip: {
            template: kendo.template("Year: #: value #"),
            visible: true
          },
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### yAxis.crosshair.tooltip.visible `Boolean` *(default: false)*

If set to `true` the chart will display the scatter chart y axis crosshair tooltip. By default the scatter chart y axis crosshair tooltip is not visible.

#### Example - show the scatter chart y axis crosshair tooltip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          tooltip: {
            visible: true
          },
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.visible `Boolean` *(default: false)*

If set to `true` the chart will display the scatter chart y axis crosshair. By default the scatter chart y axis crosshair is not visible.

#### Example - show the scatter chart y axis crosshair

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.crosshair.width `Number` *(default: 1)*

The width of the crosshair in pixels.

#### Example - set the scatter chart y axis crosshair width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        crosshair: {
          width: 2,
          visible: true
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.labels `Object`

The axis labels configuration.

#### Example - set the scatter chart y axis labels

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          background: "green",
          color: "white"
        }
      }
    });
    </script>

### yAxis.labels.background `String`

The background color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart y axis label background as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          background: "#aa00bb"
        }
      }
    });
    </script>

#### Example - set the scatter chart y axis label background as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          background: "rgb(128, 0, 255)"
        }
      }
    });
    </script>

#### Example - set the scatter chart y axis label background by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          background: "red"
        }
      }
    });
    </script>

### yAxis.labels.border `Object`

The border of the labels.

#### Example - set the scatter chart y axis label border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          border: {
            width: 1,
            color: "green",
            dashType: "dashDot"
          }
        }
      }
    });
    </script>

### yAxis.labels.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart y axis label color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          border: {
            width: 1,
            color: "green"
          }
        }
      }
    });
    </script>

### yAxis.labels.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the scatter chart y axis label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          border: {
            width: 1,
            dashType: "dashDot"
          }
        }
      }
    });
    </script>

### yAxis.labels.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the scatter chart y axis label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          border: {
            width: 1
          }
        }
      }
    });
    </script>

### yAxis.labels.color `String`

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart y axis label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          color: "#aa00bb"
        }
      }
    });
    </script>

#### Example - set the scatter chart y axis label color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          color: "rgb(128, 0, 255)"
        }
      }
    });
    </script>

#### Example - set the scatter chart y axis label color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          color: "red"
        }
      }
    });
    </script>

### yAxis.labels.culture `String`

The culture to use when formatting date values. See the [globalization overview](/framework/globalization/overview) for more information.

### yAxis.labels.dateFormats `Object`

The format used to display the labels when the x values are dates. Uses [kendo.format](/api/javascript/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

> The chart will choose the appropriate format for the current [yAxis.baseUnit](#configuration-yAxis.baseUnit). Setting the [categoryAxis.labels.format](#configuration-categoryAxis.labels.format) option will override the date formats.

#### Example - set the scatter chart y axis date formats

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [2, new Date("01/01/2013")],
            [2, new Date("01/02/2013")],
            [2, new Date("01/03/2013")]
          ]
        }
      ],
      yAxis: {
        type: "date",
        labels: {
          dateFormats: {
            days: "M-d"
          }
        }
      }
    });
    </script>

### yAxis.labels.dateFormats.days `String` *(default: "M/d")*

The format used when [yAxis.baseUnit](#configuration-yAxis.baseUnit) is set to "days".

#### Example - set the days format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [2, new Date("01/01/2013")],
            [2, new Date("01/02/2013")],
            [2, new Date("01/03/2013")]
          ]
        }
      ],
      yAxis: {
        type: "date",
        baseUnit: "days",
        labels: {
          dateFormats: {
            days: "M-d"
          }
        }
      }
    });
    </script>

### yAxis.labels.dateFormats.hours `String` *(default: "HH:mm")*

The format used when [yAxis.baseUnit](#configuration-yAxis.baseUnit) is set to "hours".

#### Example - set the hours format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [2, new Date("01/01/2013")],
            [2, new Date("01/02/2013")],
            [2, new Date("01/03/2013")]
          ]
        }
      ],
      yAxis: {
        type: "date",
        baseUnit: "hours",
        labels: {
          dateFormats: {
            hours: "HH mm"
          }
        }
      }
    });
    </script>

### yAxis.labels.dateFormats.months `String` *(default: "MMM 'yy")*

The format used when [yAxis.baseUnit](#configuration-yAxis.baseUnit) is set to "months".

#### Example - set the months format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [2, new Date("01/01/2013")],
            [2, new Date("01/02/2013")],
            [2, new Date("01/03/2013")]
          ]
        }
      ],
      yAxis: {
        type: "date",
        baseUnit: "months",
        labels: {
          dateFormats: {
            months: "MMM-yy"
          }
        }
      }
    });
    </script>

### yAxis.labels.dateFormats.weeks `String` *(default: "M/d")*

The format used when [yAxis.baseUnit](#configuration-yAxis.baseUnit) is set to "weeks".

#### Example - set the weeks format
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [2, new Date("01/01/2013")],
            [2, new Date("01/02/2013")],
            [2, new Date("01/03/2013")]
          ]
        }
      ],
      yAxis: {
        type: "date",
        baseUnit: "weeks",
        labels: {
          dateFormats: {
            weeks: "M-d"
          }
        }
      }
    });
    </script>

### yAxis.labels.dateFormats.years `String` *(default: "yyyy")*

The format used when [yAxis.baseUnit](#configuration-yAxis.baseUnit) is set to "years".

#### Example - set the years format
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [2, new Date("01/01/2013")],
            [2, new Date("01/02/2013")],
            [2, new Date("01/03/2013")]
          ]
        }
      ],
      yAxis: {
        type: "date",
        baseUnit: "years",
        labels: {
          dateFormats: {
            years: "yy"
          }
        }
      }
    });
    </script>

### yAxis.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example - set the scatter chart y axis label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          font: "20px sans-serif"
        }
      }
    });
    </script>

### yAxis.labels.format `String`

The format used to display the labels. Uses [kendo.format](/api/javascript/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

#### Example - set the scatter chart y axis label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          format: "{0:C}"
        }
      }
    });
    </script>

### yAxis.labels.margin `Number|Object` *(default: 0)*

The margin of the labels. A numeric value will set all margins.

#### Example - set the scatter chart y axis label margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          margin: 10
        }
      }
    });
    </script>

### yAxis.labels.margin.bottom `Number` *(default: 0)*

The bottom margin of the labels.

#### Example - set the scatter chart y axis label bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          margin: {
            bottom: 10
          }
        }
      }
    });
    </script>

### yAxis.labels.margin.left `Number` *(default: 0)*

The left margin of the labels.

#### Example - set the scatter chart y axis label left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          margin: {
            left: 10
          }
        }
      }
    });
    </script>

### yAxis.labels.margin.right `Number` *(default: 0)*

The right margin of the labels.

#### Example - set the scatter chart y axis label right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          margin: {
            right: 10
          }
        }
      }
    });
    </script>

### yAxis.labels.margin.top `Number` *(default: 0)*

The top margin of the labels.

#### Example - set the scatter chart y axis label top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          margin: {
            top: 10
          }
        }
      }
    });
    </script>

### yAxis.labels.mirror `Boolean`

If set to `true` the chart will mirror the axis labels and ticks. If the labels are normally on the left side of the axis, mirroring the axis will render them to the right.

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          mirror: true
        }
      }
    });
    </script>

### yAxis.labels.padding `Number|Object` *(default: 0)*

The padding of the labels. A numeric value will set all paddings.

#### Example - set the scatter chart y axis label padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          padding: 10
        }
      }
    });
    </script>

### yAxis.labels.padding.bottom `Number` *(default: 0)*

The bottom padding of the labels.

#### Example - set the scatter chart y axis label bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          padding: {
            bottom: 10
          }
        }
      }
    });
    </script>

### yAxis.labels.padding.left `Number` *(default: 0)*

The left padding of the labels.

#### Example - set the scatter chart y axis label left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          padding: {
            left: 10
          }
        }
      }
    });
    </script>

### yAxis.labels.padding.right `Number` *(default: 0)*

The right padding of the labels.

#### Example - set the scatter chart y axis label right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          padding: {
            right: 10
          }
        }
      }
    });
    </script>

### yAxis.labels.padding.top `Number` *(default: 0)*

The top padding of the labels.

#### Example - set the scatter chart y axis label top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          padding: {
            top: 10
          }
        }
      }
    });
    </script>

### yAxis.labels.rotation `Number|Object` *(default: 0)*

The rotation angle of the labels. By default the labels are not rotated.

#### Example - set the scatter chart y axis label rotation

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          rotation: 90
        }
      }
    });
    </script>

### yAxis.labels.rotation.align `String` *(default: "end")*

The alignment of the rotated labels relative to the slot center. The supported values are `"end"` and `"center"`. By default the closest end of the label will be aligned to the center. If set to `"center"`, the center of the rotated label will be aligned instead.

#### Example - align the rotated x axis labels center

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [
          {
            type: "scatter",
            data: [
              [2, new Date("01/01/2013")],
              [2, new Date("01/02/2013")],
              [2, new Date("01/03/2013")]
            ]
          }
        ],
        yAxis: {
          type: "date",
          labels: {
            rotation: {
              angle: -45,
              align: "center"
            }
          }
        }
      });
    </script>

### yAxis.labels.rotation.angle `Number` *(default: 0)*

The rotation angle of the labels. By default the labels are not rotated.

### yAxis.labels.skip `Number` *(default: 1)*

The number of labels to skip.

#### Example - skip  scatter chart y axis labels
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          skip: 2
        }
      }
    });
    </script>

### yAxis.labels.step `Number` *(default: 1)*

The label rendering step - render every n-th label. By default every label is rendered.

#### Example - render every odd y axis label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]] }
      ],
      yAxis: {
        labels: {
          step: 2
        }
      }
    });
    </script>

### yAxis.labels.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the category value

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example - set the scatter chart y axis label template as a string
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [ [1, 2] ]
        }
      ],
      yAxis: {
        labels: {
          template: "X: #: value #"
        }
      }
    });
    </script>

#### Example - set the scatter chart y axis label template as a function
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [ [1, 2] ]
        }
      ],
      yAxis: {
        labels: {
          template: kendo.template("X: #: value #")
        }
      }
    });
    </script>

### yAxis.labels.visible `Boolean` *(default: true)*

If set to `true` the chart will display the y axis labels. By default the y axis labels are visible.

#### Example - hide the scatter chart y axis labels
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [ [1, 2] ]
        }
      ],
      yAxis: {
        labels: {
          visible: false
        }
      }
    });
    </script>

### yAxis.labels.visual `Function`

A function that can be used to create a custom visual for the labels. The available argument fields are:

* createVisual - a function that can be used to get the default visual.
* culture - the default culture (if set) on the label
* format - the default format of the label
* options - the label options.
* rect - the `kendo.geometry.Rect` that defines where the visual should be rendered.
* sender - the chart instance (may be undefined).
* text - the label text.
* value - the category value

#### Example - using custom visual for the labels

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [
          {
            type: "scatter",
            data: [ [1, 2] ]
          }
        ],
        yAxis: {
          labels: {
            visual: function(e) {
              return new kendo.drawing.Text(e.text, e.rect.origin, {
                fill: {
                  color: "red"
                }
              });
            }
          }
        }
      });
    </script>

### yAxis.line `Object`

The configuration of the axis lines. Also affects the major and minor ticks, but not the grid lines.

#### Example - configure the scatter chart y axis line

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        line: {
          color: "#aa00bb",
          width: 3
        }
      }
    });
    </script>

### yAxis.line.color `String` *(default: "black")*

The color of the lines. Accepts a valid CSS color string, including hex and rgb.

> Setting the `color` option affects the major and minor ticks, but not the grid lines.

#### Example - set the scatter chart y axis line color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        line: {
          color: "#aa00bb"
        }
      }
    });
    </script>

#### Example - set the scatter chart y axis line color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        line: {
          color: "rgb(128, 0, 255)"
        }
      }
    });
    </script>

#### Example - set the scatter chart y axis line color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        line: {
          color: "green"
        }
      }
    });
    </script>

### yAxis.line.dashType `String` *(default: "solid")*

The dash type of the line.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the scatter chart y axis line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        line: {
          dashType: "dashDot"
        }
      }
    });
    </script>

### yAxis.line.visible `Boolean` *(default: true)*

If set to `true` the chart will display the y axis lines. By default the y axis lines are visible.

#### Example - hide the scatter chart y axis lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        line: {
          visible: false
        }
      }
    });
    </script>

### yAxis.line.width `Number` *(default: 1)*

The width of the line in pixels. Also affects the major and minor ticks, but not the grid lines.
#### Example - set the scatter chart y axis line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        line: {
          width: 3
        }
      }
    });
    </script>

### yAxis.majorGridLines `Object`

The configuration of the major grid lines. These are the lines that are an extension of the major ticks through the
body of the chart.

#### Example - configure the scatter chart y axis major grid lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        majorGridLines: {
          color: "#aa00bb",
          width: 3
        }
      }
    });
    </script>

### yAxis.majorGridLines.color `String` *(default: "black")*

The color of the lines. Accepts a valid CSS color string, including hex and rgb.

> Setting the `color` option affects the major and minor ticks, but not the grid lines.

#### Example - set the scatter chart x major grid lines color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        majorGridLines: {
          color: "#aa00bb"
        }
      }
    });
    </script>

#### Example - set the scatter chart x major grid lines color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        majorGridLines: {
          color: "rgb(128, 0, 255)"
        }
      }
    });
    </script>

#### Example - set the scatter chart x major grid lines color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        majorGridLines: {
          color: "green"
        }
      }
    });
    </script>

### yAxis.majorGridLines.dashType `String` *(default: "solid")*

The dash type of the line.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the scatter chart x major grid lines dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        majorGridLines: {
          dashType: "dashDot"
        }
      }
    });
    </script>

### yAxis.majorGridLines.visible `Boolean` *(default: true)*

If set to `true` the chart will display the x major grid liness. By default the x major grid liness are visible.

#### Example - hide the scatter chart x major grid liness

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        majorGridLines: {
          visible: false
        }
      }
    });
    </script>

### yAxis.majorGridLines.width `Number` *(default: 1)*

The width of the line in pixels. Also affects the major and minor ticks, but not the grid lines.
#### Example - set the scatter chart x major grid lines width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        majorGridLines: {
          width: 3
        }
      }
    });
    </script>

### yAxis.majorGridLines.step `Number` *(default: 1)*

The step of the y axis major grid lines.

#### Example - set the y axis major grid lines step

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        majorGridLines: {
          step: 2
        }
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### yAxis.majorGridLines.skip `Number` *(default: 0)*

The skip of the y axis major grid lines.

#### Example - set the y axis major grid lines skip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        majorGridLines: {
          skip: 2
        }
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### yAxis.minorGridLines `Object`

The configuration of the minor grid lines. These are the lines that are an extension of the minor ticks through the
body of the chart.

#### Example - configure the category axis minor grid lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        minorGridLines: {
          width: 3
        }
      }
    });
    </script>

### yAxis.minorGridLines.color `String` *(default: "black")*

The color of the minor grid lines. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis minor grid line color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        minorGridLines: {
          color: "#aa00bb"
        }
      }
    });
    </script>

#### Example - set the category axis minor grid line color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        minorGridLines: {
          color: "rgb(128, 0, 255)"
        }
      }
    });
    </script>

#### Example - set the category axis minor grid line color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        minorGridLines: {
          color: "green"
        }
      }
    });
    </script>

### yAxis.minorGridLines.dashType `String` *(default: "solid")*

The dash type of the minor grid lines.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the category axis minor grid line dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        minorGridLines: {
          dashType: "dashDot"
        }
      }
    });
    </script>

### yAxis.minorGridLines.visible `Boolean` *(default: false)*

If set to `true` the chart will display the minor grid lines. By default the minor grid lines are visible.

#### Example - hide the category axis minor grid lines

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        minorGridLines: {
          visible: false
        }
      }
    });
    </script>

### yAxis.minorGridLines.width `Number` *(default: 1)*

The width of the category axis minor grid lines in pixels.

#### Example - set the category axis minor grid lines width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        minorGridLines: {
          width: 3
        }
      }
    });
    </script>

### yAxis.minorGridLines.step `Number` *(default: 1)*

The step of the y axis minor grid lines.

#### Example - set the y axis minor grid lines step

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        minorGridLines: {
          step: 2
        }
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### yAxis.minorGridLines.skip `Number` *(default: 0)*

The skip of the y axis minor grid lines.

#### Example - set the y axis minor grid lines skip

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        minorGridLines: {
          skip: 2
        }
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### yAxis.minorTicks `Object`

The configuration of the y axis minor ticks.

#### Example - configure the y axis minor ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        minorTicks: {
          size: 6,
          color: "green",
          width: 5,
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### yAxis.minorTicks.color `String` *(default: "black")*

The color of the y axis minor ticks lines. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the y axis minor ticks color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        minorTicks {
          color: "#aa00bb",
          visible: true
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the y axis minor ticks color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        minorTicks {
          color: "rgb(128, 0, 255)",
          visible: true
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

#### Example - set the y axis minor ticks color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        minorTicks {
          color: "green",
          visible: true
        }
      },
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### yAxis.minorTicks.size `Number` *(default: 4)*

The length of the tick line in pixels.

#### Example - set the y axis minor ticks size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        minorTicks: {
          size: 6,
          visible: true
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### yAxis.minorTicks.visible `Boolean` *(default: false)*

If set to `true` the chart will display the y axis minor ticks. By default the y axis minor ticks are not visible.

#### Example - hide the y axis minor ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        minorTicks: {
          visible: false
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### yAxis.minorTicks.width `Number` *(default: 1)*

The width of the minor ticks in pixels.

#### Example - set the y axis minor ticks width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        minorTicks: {
          width: 3
        }
      }],
      series: [
        { data: [1, 2, 3] }
      ]
    });
    </script>

### yAxis.minorTicks.step `Number` *(default: 1)*

The step of the y axis minor ticks.

#### Example - set the y axis minor ticks step

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        minorTicks: {
          step: 2
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### yAxis.minorTicks.skip `Number` *(default: 0)*

The skip of the y axis minor ticks.

#### Example - set the y axis minor ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        minorTicks: {
          skip: 2
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### yAxis.majorTicks `Object`

The configuration of the scatter chart y axis major ticks.

#### Example - configure the scatter chart y axis major ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        majorTicks: {
          size: 6,
          color: "green",
          width: 5
        }
      }
    });
    </script>

### yAxis.majorTicks.color `String` *(default: "black")*

The color of the scatter chart y axis major ticks lines. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart y axis major ticks color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        majorTicks: {
          color: "#aa00bb"
        }
      }
    });
    </script>

#### Example - set the scatter chart y axis major ticks color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        majorTicks: {
          color: "rgb(128, 0, 255)"
        }
      }
    });
    </script>

#### Example - set the scatter chart y axis major ticks color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        majorTicks: {
          color: "green"
        }
      }
    });
    </script>

### yAxis.majorTicks.size `Number` *(default: 4)*

The length of the tick line in pixels.

#### Example - set the scatter chart y axis major ticks size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        majorTicks: {
          size: 6
        }
      }
    });
    </script>

### yAxis.majorTicks.visible `Boolean` *(default: true)*

If set to `true` the chart will display the scatter chart y axis major ticks. By default the category axis major ticks are visible.

#### Example - hide the scatter chart y axis major ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        majorTicks: {
          visible: false
        }
      }
    });
    </script>

### yAxis.majorTicks.width `Number` *(default: 1)*

The width of the major ticks in pixels.

#### Example - set the scatter chart y axis major ticks width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        majorTicks: {
          width: 3
        }
      }
    });
    </script>

### yAxis.majorTicks.step `Number` *(default: 1)*

The step of the y axis major ticks.

#### Example - set the y axis major ticks step

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        majorTicks: {
          step: 2
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### yAxis.majorTicks.skip `Number` *(default: 0)*

The skip of the y axis major ticks.

#### Example - set the y axis major ticks

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      xAxis: [{
        majorTicks: {
          skip: 2
        },
        categories: ["2011", "2012", "2013"]
      }],
      series: [{
        data: [1, 2, 3]
      }]
    });
    </script>

### yAxis.majorUnit `Number`

The interval between major divisions.
If this is a date axis the value represents the number of [xAxis.baseUnits](#configuration-xAxis.baseUnit) between major divisions.
If the [yAxis.type](#configuration-yAxis.type) is set to `"log"`, the majorUnit value will be used for the base of the logarithm.

#### Example - set the scatter chart y axis major unit
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        majorUnit: 1
      }
    });
    </script>

#### Example - set both the baseUnit and major unit for a date axis
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatterLine",
        data: [[1, new Date(2012, 0, 1)],[2, new Date(2012, 0, 10)]]
      }],
      yAxis: {
        baseUnit: "days",
        majorUnit: 5
      }
    });
    </script>

#### Example - set the base for a logarithmic y axis

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatterLine",
        data: [[1, 5], [2, 8], [3, 1024]]
      }],
      yAxis: {
        type: "log",
        majorUnit: 2
      }
    });
    </script>

### yAxis.max `Object`

The maximum value of the axis.

#### Example - set the scatter chart y axis maximum
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        max: 5
      }
    });
    </script>

### yAxis.min `Object`

The minimum value of the axis.

#### Example - set the scatter chart y axis minimum
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        data: [[1, 1],[2, 2]]
      }],
      yAxis: {
        min: 1
      }
    });
    </script>

### yAxis.minorUnit `Number`

The interval between minor divisions. It defaults to 1/5th of the [yAxis.majorUnit](#configuration-yAxis.majorUnit).
If the [yAxis.type](#configuration-yAxis.type) is set to `"log"`, the minorUnit value represents the number of divisions between two major units and defaults to the major unit minus one.

#### Example - set the logarithmic y axis minor unit

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        type: "log",
        minorUnit: 2,
        minorGridLines: {
          visible: true
        }
      },
      series: [{
          type: "scatter",
          data: [[1, 3],[2, 20]]
        }]
    });
    </script>

### yAxis.name `String` *(default: "primary")*

The unique axis name. Used to associate a series with a y axis using the [series.yAxis](#configuration-series.yAxis) option.

#### Example - set the scatter chart y axis name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1000, 2000]], yAxis: "first" },
        { type: "scatter", data: [[5, 6]], yAxis: "second" }
      ],
      yAxis: [
        { name: "first"},
        { name: "second"}
      ]
    });
    </script>

### yAxis.narrowRange `Boolean` *(default: false)*

If set to `true` the chart will prevent the automatic axis range from snapping to 0.
Setting it to `false` will force the automatic axis range to snap to 0.

#### Example - prevent scatter chart axis automatic zero snapping
    <div id="chart"></div>
    <script>
        $("#chart").kendoChart({
          series: [{
            type: "scatter",
            data: [[1000, 1000],[2000, 2000]]
          }],
          xAxis: {
            narrowRange: true
          },
          xAxis: {
            narrowRange: true
          }
        });
    </script>

#### Example - force scatter chart axis zero snapping
    <div id="chart"></div>
    <script>
        $("#chart").kendoChart({
          series: [{
            type: "scatter",
            data: [[1000, 1000],[1100, 1100]]
          }],
          xAxis: {
            narrowRange: false
          },
          yAxis: {
            narrowRange: false
          }
        });
    </script>

### yAxis.pane `String`

The name of the pane that the axis should be rendered in.
The axis will be rendered in the first (default) pane if not set.

#### Example - set the scatter chart y axis pane
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]], xAxis: "first", yAxis: "first" },
        { type: "scatter", data: [[5, 6]], xAxis: "second", yAxis: "second" }
      ],
      panes: [
        { name: "topPane" },
        { name: "bottomPane" },
      ],
      xAxis: [
        { name: "first"},
        { name: "second", pane: "bottomPane" }
      ],
      yAxis: [
        { name: "first"},
        { name: "second", pane: "bottomPane" }
      ]
    });
    </script>

### yAxis.plotBands `Array`

The plot bands of the y axis.

#### Example - set the scatter chart y axis plot bands

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]]}
      ],
      yAxis: {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      }
    });
    </script>

### yAxis.plotBands.color `String`

The color of the plot band.

#### Example - set the scatter chart y axis plot band color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]]}
      ],
      yAxis: {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      }
    });
    </script>

### yAxis.plotBands.from `Number`

The start position of the plot band in axis units.

#### Example - set the scatter chart y axis plot band start position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]]}
      ],
      yAxis: {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      }
    });
    </script>

### yAxis.plotBands.opacity `Number`

The opacity of the plot band.

#### Example - set the scatter chart y axis plot band opacity

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]]}
      ],
      yAxis: {
        plotBands: [
          { from: 1, to: 2, color: "red", opacity: 0.5 }
        ]
      }
    });
    </script>

### yAxis.plotBands.to `Number`

The end position of the plot band in axis units.

#### Example - set the scatter chart y axis plot band end position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]]}
      ],
      yAxis: {
        plotBands: [
          { from: 1, to: 2, color: "red" }
        ]
      }
    });
    </script>

### yAxis.reverse `Boolean` *(default: false)*

If set to `true` the value axis direction will be reversed. By default values increase from left to right and from bottom to top.

#### Example - reverse the scatter chart y axis

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "scatter", data: [[1, 2]]}
      ],
      yAxis: {
        reverse: true
      }
    });
    </script>

### yAxis.title `Object`

The title configuration of the scatter chart y axis.

> The [yAxis.title.text](#configuration-yAxis.title.text) option must be set in order to display the title.

#### Example - set the scatter chart y axis title
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        title: {
          text: "Years",
          background: "green",
          border: {
            width: 1,
          }
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.background `String`

The background color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart y axis title background
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        title: {
          text: "Years",
          background: "green"
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.border `Object`

The border of the title.

#### Example - set the scatter chart y axis title border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          border: {
            color: "green",
            dashType: "dashDot",
            width: 1
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart y axis title border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          border: {
            color: "green",
            width: 1
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the scatter chart y axis title border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          border: {
            dashType: "dashDot",
            width: 1
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the scatter chart y axis title border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          border: {
            width: 1
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.color `String`

The text color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the scatter chart y axis title color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        title: {
          text: "Years",
          color: "#aa00bb"
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

#### Example - set the scatter chart y axis title color as a RGB value

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        title: {
          text: "Years",
          color: "rgb(128, 0, 255)"
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

#### Example - set the scatter chart y axis title color by name

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        title: {
          text: "Years",
          color: "green"
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.font `String` *(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

#### Example - set the scatter chart y axis title font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
           text: "Years",
           font: "20px sans-serif",
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.margin `Number|Object` *(default: 5)*

The margin of the title. A numeric value will set all margins.

#### Example - set the scatter chart y axis title margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          margin: 20
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.margin.bottom `Number` *(default: 0)*

The bottom margin of the title.

#### Example - set the scatter chart y axis title bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          margin: {
            bottom: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.margin.left `Number` *(default: 0)*

The left margin of the title.

#### Example - set the scatter chart y axis title left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          margin: {
            left: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.margin.right `Number` *(default: 0)*

The right margin of the title.

#### Example - set the scatter chart y axis title right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          margin: {
            right: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.margin.top `Number` *(default: 0)*

The top margin of the title.

#### Example - set the scatter chart y axis title top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          margin: {
            top: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.padding `Number|Object` *(default: 0)*

The padding of the title. A numeric value will set all paddings.

#### Example - set the scatter chart y axis title padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          padding: 20
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.padding.bottom `Number` *(default: 0)*

The bottom padding of the title.

#### Example - set the scatter chart y axis title bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          padding: {
            bottom: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.padding.left `Number` *(default: 0)*

The left padding of the title.

#### Example - set the scatter chart y axis title left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          padding: {
            left: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.padding.right `Number` *(default: 0)*

The right padding of the title.

#### Example - set the scatter chart y axis title right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          padding: {
            right: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.padding.top `Number` *(default: 0)*

The top padding of the title.

#### Example - set the scatter chart y axis title top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          padding: {
            top: 20
          }
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.position `String` *(default: "center")*

The position of the title.

The supported values are:

* "top" - the axis title is positioned on the top (applicable to vertical axis)
* "bottom" - the axis title is positioned on the bottom (applicable to vertical axis)
* "left" - the axis title is positioned on the left (applicable to horizontal axis)
* "right" - the axis title is positioned on the right (applicable to horizontal axis)
* "center" - the axis title is positioned in the center

#### Example - set the scatter chart y axis title position

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        title: {
          text: "Years",
          position: "left"
        }
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.rotation `Number` *(default: 0)*

The rotation angle of the title. By default the title is not rotated.

#### Example - rotate the scatter chart y axis title

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years",
          rotation: 90
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.text `String`

The text of the title.

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example - set the scatter chart y axis title text

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years"
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.visible `Boolean` *(default: true)*

If set to `true` the chart will display the scatter chart y axis title. By default the scatter chart y axis title is visible.

#### Example - hide the scatter chart y axis title
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: [{
        title: {
          text: "Years"
          visible: false
        }
      }],
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.title.visual `Function`

A function that can be used to create a custom visual for the title. The available argument fields are:

* text - the label text.
* rect - the `kendo.geometry.Rect` that defines where the visual should be rendered.
* sender - the chart instance (may be undefined).
* options - the label options.
* createVisual - a function that can be used to get the default visual.

#### Example - using custom visual for the title

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        yAxis: [{
          title: {
            text: "foo bar",
            visual: function (e) {
              var layout = new kendo.drawing.Layout(e.rect, {
                orientation: "vertical",
                justifyContent: "center"
              });
              var words = e.text.split(" ");
              for (var i = 0; i < words.length; i++) {
                layout.append(new kendo.drawing.Text(words[i]));
              }
              layout.reflow();
              return layout;
            }
          }
        }],
        series: [
          { type: "scatter", data: [[1, 2]] }
        ]
      });
    </script>

### yAxis.type `String` *(default: "numeric")*

The axis type.

The supported values are:

* "numeric" - numeric axis.
* "date" - specialized axis for displaying chronological data.
* "log" - logarithmic axis.

> The chart will automatically switch to a date axis if the series X value
is of type `Date`. Set the `xAsix.type` when such behavior is undesired.

#### Example - set the scatter chart y axis type
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [2, new Date("01/01/2013")],
            [2, new Date("01/02/2013")],
            [2, new Date("01/03/2013")]
          ]
        }
      ],
      yAxis: {
        type: "date"
      }
    });
    </script>

#### Example - using logarithmic y axis for the scatter chart

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        {
          type: "scatter",
          data: [
            [2, 5],
            [2, 7],
            [2, 11123]
          ]
        }
      ],
      yAxis: {
        type: "log"
      }
    });
    </script>

### yAxis.visible `Boolean` *(default: true)*

If set to `true` the chart will display the y axis. By default the y axis is visible.

#### Example - hide the scatter chart y axis

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      yAxis: {
        visible: false
      },
      series: [
        { type: "scatter", data: [[1, 2]] }
      ]
    });
    </script>

### yAxis.notes `Object`

The y axis notes configuration.

### yAxis.notes.position `String`

The position of the y axis notes.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

### yAxis.notes.icon `Object`

The icon of the notes.

### yAxis.notes.icon.background `String`

The background color of the notes icon.

#### Example - set the y axis notes icon background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
        notes: {
          icon: {
            background: "red"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### yAxis.notes.icon.border `Object`

The border of the icon.

#### Example - set the y axis notes icon border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.icon.border.color `String`

The border color of the icon.

#### Example - set the y axis notes icon border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.icon.border.width `Number`

The border width of the icon.

#### Example - set the y axis notes icon border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.icon.size `Number`

The size of the icon.

#### Example - set the y axis notes icon size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
        notes: {
          icon: {
            size: 30
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### yAxis.notes.icon.type `String` *(default: "circle")*

The icon shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.

#### Example - set the y axis notes icon shape

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
        notes: {
          icon: {
            shape: "triangle"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### yAxis.notes.icon.visible `Boolean` *(default: "true")*

The icon visibility.

#### Example - set the y axis notes icon visibility

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
        notes: {
          icon: {
            visible: false
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### yAxis.notes.label `Object`

The label of the notes.

### yAxis.notes.label.background `String`

The background color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the y axis label background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
        notes: {
          label: {
            background: "red"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### yAxis.notes.label.border `Object`

The border of the label.

#### Example - set the y axis label border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.label.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the y axis label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.label.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the y axis label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.label.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the y axis label border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.label.color `String`

The text color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the y axis label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
        notes: {
          label: {
            color: "#aa00bb"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### yAxis.notes.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the label.

#### Example - set the chart series label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
        notes: {
          label: {
            font: "20px sans-serif"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### yAxis.notes.label.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the axis value

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example - set the y axis notes label template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
        notes: {
          label: {
            template: "Year: #: value #"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### yAxis.notes.label.visible `Boolean` *(default: true)*

If set to `true` the chart will display the y axis notes label. By default the y axis notes label are visible.

#### Example - hide the y axis notes label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
        notes: {
          label: {
            visible: false
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### yAxis.notes.label.rotation `Number` *(default: 0)*

The rotation angle of the label. By default the label are not rotated.

#### Example - rotate the y axis notes label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
        notes: {
          label: {
            rotation: 90
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### yAxis.notes.label.format `String` *(default: "{0}")*

The format used to display the notes label. Uses [kendo.format](/api/javascript/kendo#methods-format). Contains one placeholder ("{0}") which represents the axis value.

#### Example - set the y axis notes label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
        notes: {
          label: {
            format: "value slot: {0}"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### yAxis.notes.label.position `String` *(default: "inside")*

The position of the labels.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.

### yAxis.notes.line `Object`

The line of the notes.

### yAxis.notes.line.width `Number`

The line width of the notes.

#### Example - set the y axis notes line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
        notes: {
          line: {
            width: 4
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### yAxis.notes.line.color `String`

The line color of the notes.

#### Example - set the y axis notes color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
        notes: {
          line: {
            color: "#aa00bb"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### yAxis.notes.line.length `Number`

The length of the connecting lines in pixels.

#### Example - set the y axis notes color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
        notes: {
          line: {
            length: 20
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### yAxis.notes.data `Array`

The items of the notes.

### yAxis.notes.data.value `Object`

The value of the note.

### yAxis.notes.data.position `String`

The position of the y axis notes.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

### yAxis.notes.data.icon `Object`

The icon of the note.

### yAxis.notes.data.icon.background `String`

The background color of the note icon.

#### Example - set the y axis note icon background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.data.icon.border `Object`

The border of the icon.

#### Example - set the y axis note icon border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.data.icon.border.color `String`

The border color of the icon.

#### Example - set the y axis note icon border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.data.icon.border.width `Number`

The border width of the icon.

#### Example - set the y axis note icon border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.data.icon.size `Number`

The size of the icon.

#### Example - set the y axis note icon size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.data.icon.type `String` *(default: "circle")*

The icon shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.

#### Example - set the y axis note icon shape

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.data.icon.visible `Boolean` *(default: "true")*

The icon visibility.

#### Example - set the y axis note icon visibility

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.data.label `Object`

The label of the note.

### yAxis.notes.data.label.background `String`

The background color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the y axis note label background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.data.label.border `Object`

The border of the label.

#### Example - set the y axis note label border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.data.label.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the y axis note label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.data.label.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the y axis note label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.data.label.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the y axis note label border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.data.label.color `String`

The text color of the note label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the y axis note label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.data.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the note label.

#### Example - set the y axis note label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.data.label.template `String|Function`

The [template](/api/javascript/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the axis value

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example - set the value axis note label template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.data.label.visible `Boolean` *(default: true)*

If set to `true` the chart will display the y axis notes label. By default the y axis notes label are visible.

#### Example - hide the y axis note label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.data.label.rotation `Number` *(default: 0)*

The rotation angle of the label. By default the label are not rotated.

#### Example - rotate the y axis note label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.data.label.format `String` *(default: "{0}")*

The format used to display the note label. Uses [kendo.format](/api/javascript/kendo#methods-format). Contains one placeholder ("{0}") which represents the axis value.

#### Example - set the y axis note label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.data.label.text `String`

The label note text.

#### Example - set the y axis label note text

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.data.label.position `String` *(default: "inside")*

The position of the y axis note label.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.

### yAxis.notes.data.line `Object`

The line of the note.

### yAxis.notes.data.line.width `Number`

The line width of the note.

#### Example - set the y axis note line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.data.line.color `String`

The line color of the note.

#### Example - set the y axis note color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.data.line.length `Number`

The length of the connecting lines in pixels.

#### Example - set the y axis note color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      yAxis: {
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

### yAxis.notes.visual `Function`

A function that can be used to create a custom visual for the notes. The available argument fields are:

* rect - the `kendo.geometry.Rect` that defines the note target rect.
* options - the note options.
* createVisual - a function that can be used to get the default visual.
* value - the note value.

#### Example - use custom visual for the notes

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          type: "scatter",
          data: [[1, 2]]
        }],
        yAxis: {
          notes: {
            data: [{
              value: 2
            }],
            visual: function (e) {
              var targetPoint = { x: e.rect.origin.x, y: e.rect.center().y };
              var line = new kendo.drawing.Path()
              .moveTo(targetPoint.x, targetPoint.y)
              .lineTo(targetPoint.x + 10, targetPoint.y);
              var circle = new kendo.drawing.Circle(new kendo.geometry.Circle([targetPoint.x + 30, targetPoint.y], 20), {
                fill: {
                  color: "red"
                }
              });

              return new kendo.drawing.Group().append(line, circle);
            }
          }
        }
      });
    </script>

### zoomable `Boolean|Object` *(default: false)*

Specifies if the chart can be zoomed.

### Example - enable zooming
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }],
        zoomable: true,
        categoryAxis: {
          categories: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
        }
      });
    </script>

### zoomable.mousewheel `Boolean|Object`

Specifies if the chart can be zoomed using the mouse wheel.

### Example - disable mouse wheel zoom
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }],
        zoomable: {
          mousewheel: false
        },
        categoryAxis: {
          categories: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
        }
      });
    </script>

### zoomable.mousewheel.lock `String` *(default: "none")*

Specifies an axis that should not be zoomed. The supported values are `none`, `x` and `y`.

### Example - disable mouse wheel zoom for the y axis
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }],
        zoomable: {
          mousewheel: false
        },
        categoryAxis: {
          categories: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
        }
      });
    </script>

### zoomable.selection `Boolean|Object`

Specifies if the chart can be zoomed using selection.

### Example - disable selection zoom
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }],
        zoomable: {
          selection: false
        },
        categoryAxis: {
          categories: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
        }
      });
    </script>

### zoomable.selection.key `String` *(default: "shift")*

Specifies a keyboard key that should be pressed to activate the selection. The supported values are:

* "none" - No key is required.
* "ctrl" - The "ctrl" key should be pressed.
* "shift" - The "shift" key should be pressed.
* "alt" - The "alt" key should be pressed.

### Example - specify that no key needs be pressed
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }],
        zoomable: {
          selection: {
            key: "none"
          }
        },
        categoryAxis: {
          categories: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
        }
      });
    </script>

### zoomable.selection.lock `String` *(default: "none")*

Specifies an axis that should not be zoomed. The supported values are `none`, `x` and `y`.

### Example - disable selection zoom for the y axis
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }],
        zoomable: {
          selection: {
            lock: "y"
          }
        },
        categoryAxis: {
          categories: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
        }
      });
    </script>

## Fields

### dataSource `kendo.data.DataSource`

The [data source](/api/javascript/data/datasource) of the widget. Configured via the [dataSource](#configuration-dataSource) option.

> Changes of the data source will be reflected in the widget.

> Assigning a new data source would have no effect. Use the [setDataSource](#methods-setDataSource) method instead.

#### Example - add a data item to the data source

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: [
        { value: 1 }
      ],
      series: [
        { field: "value" }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.dataSource.add({ value: 2 });
    </script>

#### Example - update a data item in the data source
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    var data = grid.dataSource.at(0);
    data.set("name", "John Doe");
    </script>

#### Example - remove a data item from the data source
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: [
        { value: 1 },
        { value: 2 }
      ],
      series: [
        { field: "value" }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    var data = chart.dataSource.at(0);
    chart.dataSource.remove(data);
    </script>

### options `Object`

The [configuration](#configuration) options with which the chart is initialized.

> Call the [refresh](#methods-refresh) method after modifying the `options` field.

#### Example - change the chart options

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "line", data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.options.series[0].type = "bar";
    chart.refresh();
    </script>

### surface `kendo.drawing.Surface`
The drawing surface of the Chart. See [Drawing API](http://docs.telerik.com/kendo-ui/api/javascript/drawing).

#### Example - bind to surface events

    <div id="chart"></div>
    <script>
        $("#chart").kendoChart({
            series: [{
                type: "column", data: [1, 2]
            }],
            render: function(e) {
                e.surface.bind("mouseenter", onShapeMouseEnter);
            }
        });

        function onShapeMouseEnter(e) {
            // http://docs.telerik.com/kendo-ui/api/javascript/drawing/surface#events-mouseenter
            console.log(e);
        }
    </script>

## Methods

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> This method does not remove the widget element from DOM.

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.destroy();
    </script>


### exportImage
Exports the chart as an image.
The result can be saved using [kendo.saveAs](/api/javascript/kendo#methods-saveAs).

The export operation is asynchronous and returns a [promise](http://api.jquery.com/Types/#Promise).
The promise will be resolved with a PNG image encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).

#### Parameters

##### options `Object` *(optional)*
Parameters for the exported image.

##### options.width `String`
The width of the exported image. Defaults to the chart width.

##### options.height `String`
The height of the exported image. Defaults to the chart height.

##### options.cors `String` *(default: "anonymous")*
Specifies how [cross-origin images](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image)
should be requested.

Requesting images without CORS will "taint" the canvas. It will still be visible on the page, but all
script access to it is disabled to prevent information disclosure.

By default they're requested anonymously. Available options are:
* "anonymous" - do not send user credentials as part of the request
* "use-credentials" - send credentials as part of the request
* false - fetch images without CORS, possibly tainting the canvas

See [crossorigin attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-crossorigin)
for more details.

#### Returns
`Promise` A promise that will be resolved with a PNG image encoded as a Data URI.

#### Example - Exporting a chart to an image
    <div id="chart"></div>
    <script>
        $("#chart").kendoChart({
            transitions: false,
            series: [{
                type: "column",
                data: [1, 2, 3]
            }, {
                type: "line",
                data: [2, 1, 3]
            }, {
                type: "area",
                data: [3, 1, 2]
            }]
        });

        var chart = $("#chart").getKendoChart();
        chart.exportImage().done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "chart.png"
            });
        });
    </script>


### exportPDF
Exports the chart as a PDF file.
The result can be saved using [kendo.saveAs](/api/javascript/kendo#methods-saveAs).

The export operation is asynchronous and returns a [promise](http://api.jquery.com/Types/#Promise).
The promise will be resolved with a PDF file encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).

#### Parameters

##### options `kendo.drawing.PDFOptions` *(optional)*
Parameters for the exported PDF file.

#### Returns
`Promise` A promise that will be resolved with a PDF file encoded as a Data URI.

#### Example - Exporting a chart to a PDF file
    <div id="chart"></div>
    <script>
        $("#chart").kendoChart({
            transitions: false,
            series: [{
                type: "column",
                data: [1, 2, 3]
            }, {
                type: "line",
                data: [2, 1, 3]
            }, {
                type: "area",
                data: [3, 1, 2]
            }]
        });

        var chart = $("#chart").getKendoChart();
        chart.exportPDF({ paperSize: "A5", landscape: true }).done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "chart.pdf"
            });
        });
    </script>


### exportSVG
Exports the chart as an SVG document.
The result can be saved using [kendo.saveAs](/api/javascript/kendo#methods-saveAs).

The export operation is asynchronous and returns a [promise](http://api.jquery.com/Types/#Promise).
The promise will be resolved with a SVG document encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).

#### Parameters

##### options `Object` *(optional)*
Export options.

##### options.raw `Boolean` *(default: false)*
Resolves the promise with the raw SVG document without the Data URI prefix.

#### Returns
`Promise` A promise that will be resolved with a SVG document encoded as a Data URI.

#### Example - Exporting a chart to an SVG document
    <div id="chart"></div>
    <script>
        $("#chart").kendoChart({
            transitions: false,
            series: [{
                type: "column",
                data: [1, 2, 3]
            }, {
                type: "line",
                data: [2, 1, 3]
            }, {
                type: "area",
                data: [3, 1, 2]
            }]
        });

        var chart = $("#chart").getKendoChart();
        chart.exportSVG().done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "chart.svg"
            });
        });
    </script>

### getAxis

Returns an [axis](/api/javascript/dataviz/chart/chart_axis) with specific name.

#### Parameters

##### name `String`

The axis name.

#### Returns

`kendo.dataviz.ChartAxis` The chart axis.

#### Example - draw a line based on axis value

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          data: [1, 2]
        }],
        valueAxis: {
          name: "value"
        },
        categoryAxis: {
          name: "category"
        }
      });

      var chart = $("#chart").data("kendoChart");
      var valueAxis = chart.getAxis("value");
      var categoryAxis = chart.getAxis("category");
      var valueSlot = valueAxis.slot(1.5);
      var categoryRange = categoryAxis.range();
      var categorySlot = categoryAxis.slot(categoryRange.min, categoryRange.max);

      var path = new kendo.drawing.Path({
        stroke: {
          color: "red",
          width: 3
        }
      }).moveTo(categorySlot.origin.x, valueSlot.origin.y)
      .lineTo(categorySlot.bottomRight().x, valueSlot.origin.y);

      chart.surface.draw(path);
    </script>

### redraw

Repaints the chart using the currently loaded data.

#### Example - redraw the chart
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "line", data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    $("#chart").css( { width: 300 });
    chart.redraw();
    </script>

### refresh

Reloads the data and renders the chart.

#### Example - refresh the chart

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "line", data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.options.series[0].type = "bar";
    chart.refresh();
    </script>

### resize

Adjusts the chart layout to match the size of the container.

#### Example

    <div id="chart" style="width: 400px;"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { type: "line", data: [1, 2] }
      ]
    });

    $("#chart").css("width", "800px")
               .data("kendoChart").resize();
    </script>

#### Parameters

##### force `Boolean` *optional*

Defines whether the widget should proceed with resizing even if the element dimensions have not changed.

### saveAsPDF
Saves the Chart as a PDF file using the options specified in [options.pdf](#configuration-pdf).

> Calling this method could trigger the browser built-in popup blocker in some cases. To avoid that always call it as a response to end-user action e.g. button click.

### setDataSource

Sets the data source of the widget.

#### Parameters

##### dataSource `kendo.data.DataSource`

The data source to which the widget should be bound.

#### Example - set the data source
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: [
        { value: 1 },
        { value: 2 }
      ],
      series: [
        { field: "value" }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    var dataSource = new kendo.data.DataSource( {
      data: [
        { value: 3 },
        { value: 4 }
      ]
    });
    chart.setDataSource(dataSource);
    </script>

### setOptions

Sets the widget options. Changes are cumulative.

#### Parameters

##### options `Object`

The chart settings to update.

#### Example - change the chart theme
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      theme: "black",
      series: [{
        data: [1, 2, 3]
      }]
    });

    var chart = $("#chart").data("kendoChart");
    chart.setOptions({ theme: "uniform" });
    </script>

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

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    var svg = chart.svg();
    console.log(svg); // displays the SVG string
    </script>

### imageDataURL

Returns a PNG image of the chart encoded as a [Data URL](https://developer.mozilla.org/en-US/docs/data_URIs).

> This method is deprecated and replaced by [exportImage](#methods-exportImage).

#### Returns

`String` A data URL with `image/png` MIME type. Will be `null` if the browser does not support the `canvas` element.

#### Example - show a snapshot of the Chart

    <div id="chart"></div>
    <a download="export.png" id="export" class="k-button">Export PNG</a>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1] }
      ]
    });

    $("#export").on("click", function() {
      var chart = $("#chart").data("kendoChart");
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

### toggleHighlight

Toggles the highlight of the series points or a segment for pie, donut and funnel charts.

#### Parameters

##### show `Boolean`

A boolean value that specifies if the highlight should be shown or hidden.

##### options `String|Object`

A string representing the series name or the category name or an object with the series and category names.

##### options.series `String`

The series name.

##### options.category `String`

The category name.

#### Example - show the highlight for a series

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [
          { name: "A", data: [1, 2] },
          { name: "B", data: [3, 4] }
        ]
      });

      var chart = $("#chart").data("kendoChart");

      chart.toggleHighlight(true, "A");
    </script>

#### Example - show the highlight for a pie segment

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          type: "pie",
          data: [{value: 1, category: "A"}, {value: 2, category: "B"}]
        }]
      });

      var chart = $("#chart").data("kendoChart");

      chart.toggleHighlight(true, "A");
    </script>

#### Example - show the highlight for a donut segment

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          type: "donut",
          name: "SeriesA",
          data: [{value: 1, category: "A"}, {value: 2, category: "B"}]
        }, {
          type: "donut",
          name: "SeriesB",
          data: [{value: 3, category: "A"}, {value: 4, category: "B"}]
        }]
      });

      var chart = $("#chart").data("kendoChart");

      chart.toggleHighlight(true, {
        series: "SeriesB",
        category: "A"
      });
    </script>

## Events

### axisLabelClick

Fired when the user clicks an axis label.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.axis `Object`

The axis that the label belongs to.

##### e.dataItem `Object`

The original data item used to generate the label. Available only for data bound category axis.

##### e.element `Object`

The DOM element of the label.

##### e.index `Object`

The label sequential index or category index.

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

##### e.text `String`

The label text.

##### e.value `Object`

The label value or category name.

#### Example - subscribe to the "axisLabelClick" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [2012, 2013]
      },
      series: [
        { data: [1, 2] }
      ],
      axisLabelClick: function(e) {
        console.log(e.axis.type, e.value);
      }
    });
    </script>

#### Example - subscribe to the "axisLabelClick" event after initialization
    <div id="chart"></div>
    <script>
    function chart_axisLabelClick(e) {
      console.log(e.axis.type, e.value);
    }
    $("#chart").kendoChart({
      categoryAxis: {
        categories: [2012, 2013]
      },
      series: [
        { data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("axisLabelClick", chart_axisLabelClick);
    </script>

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

Fired when the widget is bound to data from its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

#### Example - subscribe to the "dataBound" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      dataSource: [
        { value: 1 }
      ],
      series: [
        { field: "value" }
      ],
      dataBound: function(e) {
        console.log("dataBound");
      }
    });
    </script>

#### Example - subscribe to the "dataBound" event after initialization
    <div id="chart"></div>
    <script>
    function chart_dataBound(e) {
      console.log("dataBound");
    }
    $("#chart").kendoChart({
      autoBind: false,
      dataSource: [
        { value: 1 }
      ],
      series: [
        { field: "value" }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("dataBound", chart_dataBound);
    chart.dataSource.fetch();
    </script>

### drag

Fired as long as the user is dragging the chart using the mouse or swipe gestures.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the initial range (min and max values) of *named* axes. The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the drag action.

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

#### Example - subscribe to the "drag" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ],
      drag: function(e) {
        console.log("drag");
      }
    });
    </script>

#### Example - subscribe to the "drag" event after initialization
    <div id="chart"></div>
    <script>
    function chart_drag(e) {
      console.log("drag");
    }
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("drag", chart_drag);
    </script>

### dragEnd

Fired when the user stops dragging the chart.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the initial range (min and max values) of *named* axes. The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the dragEnd action.

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

#### Example - subscribe to the "dragEnd" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ],
      dragEnd: function(e) {
        console.log("dragEnd");
      }
    });
    </script>

#### Example - subscribe to the "dragEnd" event after initialization
    <div id="chart"></div>
    <script>
    function chart_dragEnd(e) {
      console.log("dragEnd");
    }
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("dragEnd", chart_dragEnd);
    </script>

### dragStart

Fired when the user starts dragging the chart.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the initial range (min and max values) of *named* axes. The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the drag action.

##### e.preventDefault `Function`

If invoked the drag operation will abort.

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

#### Example - subscribe to the "dragStart" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ],
      dragStart: function(e) {
        console.log("dragStart");
      }
    });
    </script>

#### Example - subscribe to the "dragStart" event after initialization
    <div id="chart"></div>
    <script>
    function chart_dragStart(e) {
      console.log("dragStart");
    }
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("dragStart", chart_dragStart);
    </script>

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

##### e.visual `Object`

The note visual element.

#### Example - subscribe to the "noteClick" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [{ value: 1, noteText: "a" }]
      }],
      noteClick: function(e) {
        console.log(e.text);
      }
    });
    </script>

#### Example - subscribe to the "noteClick" event after initialization
    <div id="chart"></div>
    <script>
    function chart_noteClick(e) {
      console.log(e.text);
    }
    $("#chart").kendoChart({
      series: [{
        data: [{ value: 1, noteText: "a" }]
      }]
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("noteClick", chart_noteClick);
    </script>

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

##### e.visual `Object`

The note visual element.

#### Example - subscribe to the "noteHover" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [{ value: 1, noteText: "a" }]
      }],
      noteHover: function(e) {
        console.log(e.text);
      }
    });
    </script>

#### Example - subscribe to the "noteHover" event after initialization
    <div id="chart"></div>
    <script>
    function chart_noteHover(e) {
      console.log(e.text);
    }
    $("#chart").kendoChart({
      series: [{
        data: [{ value: 1, noteText: "a" }]
      }]
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("noteHover", chart_noteHover);
    </script>

### plotAreaClick

Fired when the user clicks the plot area.

> The click event will be triggered by tap and contextmenu events. The e.originalEvent.type field can be inspected to distinguish between the original events.

#### Event Data

##### e.category `Object`

The data point category. Available only for categorical charts (bar, line, area and similar).

##### e.element `Object`

The DOM element of the plot area.

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

##### e.originalEvent `Object`

The original browser event that triggered the click action.

##### e.value `Object`

The data point value. Available only for categorical charts (bar, line, area and similar).

##### e.x `Object`

The X axis value or array of values for multi-axis charts.

##### e.y `Object`

The X axis value or array of values for multi-axis charts.

#### Example - handle right click on plot area and disable context menu
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
        series: [
            { data: [1, 2] }
        ],
        plotAreaClick: function(e) {
            if (e.originalEvent.type === "contextmenu") {
              // Disable browser context menu
              e.originalEvent.preventDefault();
            }
        }
    });
    </script>

#### Example - subscribe to the "plotAreaClick" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ],
      plotAreaClick: function(e) {
        console.log(e.value);
      }
    });
    </script>

#### Example - subscribe to the "plotAreaClick" event after initialization
    <div id="chart"></div>
    <script>
    function chart_plotAreaClick(e) {
      console.log(e.value);
    }
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("plotAreaClick", chart_plotAreaClick);
    </script>

### render

Fired when the chart is ready to render on screen.

Can be used, for example, to remove loading indicators. Changes to options will be ignored.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

### select

Fired when the user modifies the selection.

The range units are:

* Generic axis - Category index (0-based)
* Date axis - Date instance

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.axis `Object`

The target axis configuration.

##### e.from `Object`

The lower boundary of the selected range.

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

##### e.to `Object`

The upper boundary of the selected range.

The last selected category is at index [to - 1] unless the axis is justified. In this case it is at index [to].

#### Example - subscribe to the "select" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 10] }
      ],
      categoryAxis: {
        categories: [2011, 2012, 2013],
        select: {
          from: 1,
          to: 5
        }
      },
      select: function(e) {
        console.log(e.from, e.to);
      }
    });
    </script>

#### Example - subscribe to the "select" event after initialization

    <div id="chart"></div>
    <script>
    function chart_select(e) {
      console.log(e.from, e.to);
    }
    $("#chart").kendoChart({
      series: [
        { data: [1, 10] }
      ],
      categoryAxis: {
        categories: [2011, 2012, 2013],
        select: {
          from: 1,
          to: 5
        }
      }
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("select", chart_select);
    </script>

### selectEnd

Fired when the user completes modifying the selection.

The range units are:

* Generic axis - Category index (0-based)
* Date axis - Date instance

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.axis `Object`

The target axis configuration.

##### e.from `Object`

The lower boundary of the selected range.

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

##### e.to `Object`

The upper boundary of the selected range.

The last selected category is at index [to - 1] unless the axis is justified. In this case it is at index [to].

#### Example - subscribe to the "selectEnd" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 10] }
      ],
      categoryAxis: {
        categories: [2011, 2012, 2013],
        selectEnd: {
          from: 1,
          to: 5
        }
      },
      selectEnd: function(e) {
        console.log(e.from, e.to);
      }
    });
    </script>

#### Example - subscribe to the "selectEnd" event after initialization

    <div id="chart"></div>
    <script>
    function chart_selectEnd(e) {
      console.log(e.from, e.to);
    }
    $("#chart").kendoChart({
      series: [
        { data: [1, 10] }
      ],
      categoryAxis: {
        categories: [2011, 2012, 2013],
        selectEnd: {
          from: 1,
          to: 5
        }
      }
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("selectEnd", chart_selectEnd);
    </script>

### selectStart

Fired when the user starts modifying the axis selection.

The range units are:

* Generic axis - Category index (0-based)
* Date axis - Date instance

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.axis `Object`

The target axis configuration.

##### e.from `Object`

The lower boundary of the selected range.

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

##### e.to `Object`

The upper boundary of the selected range.

The last selected category is at index [to - 1] unless the axis is justified. In this case it is at index [to].

#### Example - subscribe to the "selectStart" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 10] }
      ],
      categoryAxis: {
        categories: [2011, 2012, 2013],
        select: {
          from: 1,
          to: 5
        }
      },
      selectStart: function(e) {
        console.log(e.from, e.to);
      }
    });
    </script>
#### Example - subscribe to the "selectStart" event after initialization

    <div id="chart"></div>
    <script>
    function chart_selectStart(e) {
      console.log(e.from, e.to);
    }
    $("#chart").kendoChart({
      series: [
        { data: [1, 10] }
      ],
      categoryAxis: {
        categories: [2011, 2012, 2013],
        select: {
          from: 1,
          to: 5
        }
      }
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("selectStart", chart_selectStart);
    </script>

### seriesClick

Fired when the user clicks the chart series.

> The click event will be triggered by tap and contextmenu events. The e.originalEvent.type field can be inspected to distinguish between the original events.

#### Event Data

##### e.category `Object`

The data point category

##### e.element `Object`

The DOM element of the data point.

##### e.originalEvent `Object`

The original browser event that triggered the click action.

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

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

##### e.value `Object`

The data point value.

##### e.percentage `Object`

The point value represented as a percentage value. Available only for donut, pie and 100% stacked charts.

#### Example - handle right click on series and disable context menu
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
        series: [
            { data: [1, 2] }
        ],
        seriesClick: function(e) {
            if (e.originalEvent.type === "contextmenu") {
              // Disable browser context menu
              e.originalEvent.preventDefault();
            }
        }
    });
    </script>

#### Example - subscribe to the "seriesClick" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ],
      seriesClick: function(e) {
        console.log(e.value);
      }
    });
    </script>

#### Example - subscribe to the "seriesClick" event after initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ]
    });

    functino chart_seriesClick(e) {
      console.log(e.value);
    }

    var chart = $("#chart").data("kendoChart");
    chart.bind("seriesClick", chart_seriesClick);
    </script>

### seriesHover

Fired when the user hovers the chart series.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.category `Object`

The data point category

##### e.categoryPoints `Array`

A list of all points that are in the same category. Each item has the same fields - value, series, dataItem, etc.

Defined only when a [shared tooltip](#configuration-tooltip.shared) is in use.
Available in versions 2014.3.1306 and later.

##### e.element `Object`

The DOM element of the data point.

##### e.originalEvent `Object`

The original browser event that triggered the hover action.

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

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

##### e.value `Object`

The data point value.

##### e.percentage `Object`

The point value represented as a percentage value. Available only for donut, pie and 100% stacked charts.

#### Example - subscribe to the "seriesHover" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ],
      seriesHover: function(e) {
        console.log(e.value);
      }
    });
    </script>

#### Example - subscribe to the "seriesHover" event after initialization
    <div id="chart"></div>
    functino chart_seriesHover(e) {
      console.log(e.value);
    }
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("seriesHover", chart_seriesHover);
    </script>

### zoom

Fired as long as the user is zooming the chart using the mousewheel.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the initial range (min and max values) of *named* axes. The axis name is used as a key.

##### e.delta `Number`

A number that indicates the zoom amount and direction. A negative value indicates "zoom in", while a positive "zoom out".

##### e.originalEvent `Object`

The original user event that triggered the drag action.

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

#### Example - subscribe to the "zoom" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ],
      zoom: function(e) {
        console.log("zoom");
      }
    });
    </script>

#### Example - subscribe to the "zoom" event after initialization
    <div id="chart"></div>
    <script>
    function chart_zoom(e) {
      console.log("zoom");
    }
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("zoom", chart_zoom);
    </script>

### zoomEnd

Fired when the user stops zooming the chart.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the initial range (min and max values) of *named* axes. The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the zoomEnd action.

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

#### Example - subscribe to the "zoomEnd" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ],
      zoomEnd: function(e) {
        console.log("zoomEnd");
      }
    });
    </script>

#### Example - subscribe to the "zoomEnd" event after initialization
    <div id="chart"></div>
    <script>
    function chart_zoomEnd(e) {
      console.log("zoomEnd");
    }
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("zoomEnd", chart_zoomEnd);
    </script>

### zoomStart

Fired when the user uses the mousewheel to zoom the chart.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the initial range (min and max values) of *named* axes. The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the drag action.

##### e.preventDefault `Function`

If invoked the zoom operation will abort.

##### e.sender `kendo.ui.Chart`

The widget instance which fired the event.

#### Example - subscribe to the "zoomStart" event during initialization
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ],
      zoomStart: function(e) {
        console.log("zoomStart");
      }
    });
    </script>

#### Example - subscribe to the "zoomStart" event after initialization
    <div id="chart"></div>
    <script>
    function chart_zoomStart(e) {
      console.log("zoomStart");
    }
    $("#chart").kendoChart({
      series: [
        { data: [1, 2] }
      ]
    });
    var chart = $("#chart").data("kendoChart");
    chart.bind("zoomStart", chart_zoomStart);
    </script>

