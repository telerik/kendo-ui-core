---
title: Error Bars
page_title: jQuery Chart Documentation | Error Bars
description: "Get started with the jQuery Chart by Kendo UI and learn how to configure its error bars."
previous_url: /controls/charts/error-bars
slug: errorbars_charts_widget
---

# Error Bars

The Chart enables you to implement error bars which show the variability of data.

The low and high value for the error bars can be either bound to the data or calculated from the point or series values. The error bars are specified as part of the series definition.

The following series types support error bars:

* Area
* Vertical Area
* Column
* Bar
* Line
* Vertical Line
* Scatter
* ScatterLine

## Binding to Categorical Series

To bind the low and high values of the error bars when using categorical series, set the [`errorLowField`](/api/dataviz/chart#configuration-series.errorLowField) and [`errorHighField`](/api/dataviz/chart#configuration-series.errorHighField) options to the fields in the data that hold the low and high value.

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "column",
        errorLowField: "low",
        errorHighField: "high",
        data: [{value: 4.743, low: 4.5, high: 5}, {value: 7.295, low: 7, high: 8},
          {value: 6.376, low: 5, high: 6.5}]
      }]
    });
    </script>

## Binding to Scatter Series

You can also display error bars for the series `x` or `y` value, or both. To set the low and high fields for the series `x` value, set the [`xErrorLowField`](/api/dataviz/chart#configuration-series.xErrorLowField) and [`xErrorHighField`](/api/dataviz/chart#configuration-series.xErrorHighField) series options. To specify the low and high fields for the `y` value of the series, use the [`yErrorLowField`](/api/dataviz/chart#configuration-series.yErrorLowField) and [`yErrorHighField`](/api/dataviz/chart#configuration-series.yErrorHighField) options.

The following example demonstrates how to bind the error bars for the `x` value of the series.

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        xErrorLowField: "low",
        xErrorHighField: "high",
        data: [{x: 6.4, y: 13.4, low: 5, high: 7}, {x: 1.7, y: 11, low: 1, high: 3},
          {x: 5.4, y: 8, low: 3, high: 6}]
      }]
    });
    </script>

The following example demonstrates how to bind the error bars for the `y` value of the series.

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        yErrorLowField: "low",
        yErrorHighField: "high",
        data: [{x: 6.4, y: 13.4, low: 12, high: 14}, {x: 1.7, y: 11, low: 11, high: 14},
          {x: 5.4, y: 8, low: 5, high: 8}]
      }]
    });
    </script>

## Setting the Error Bar Values

You can calculate the low and high values of the error bars based on the series point values. To set the error bars value for categorical series, specify the [`series.errorBars.value`](/api/dataviz/chart#configuration-series.errorBars.value) option. For scatter series, set the [`series.errorBars.xValue`](/api/dataviz/chart#configuration-series.errorBars.xValue) or [`series.errorBars.yValue`](/api/dataviz/chart#configuration-series.errorBars.yValue) options, or both.

### Setting Numeric Values

If the value of the error bar is set to a number (must not be negative), the low and high value are calculated by subtracting or adding the value to the series value.

The following example demonstrates how to set a numeric value for the categorical series.

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "column",
        errorBars: {
          value: 1
        },
        data: [{value: 4.743}, {value: 7.295}, {value: 6.376}]
      }]
    });
    </script>

The following example demonstrates how to set a numeric value for the scatter series.

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        errorBars: {
          yValue: 2
        },
        data: [{x: 6.4, y: 13.4}, {x: 1.7, y: 11}, {x: 5.4, y: 8}]
      }]
    });
    </script>

### Setting Array Values

You can also separately set the difference for the low and high value by setting an array with two numeric values. In this case, the Chart calculates the low value by subtracting the first array value from the point value. The high value is calculated by adding the second array value to the point value.

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "column",
        errorBars: {
          value: [0.7, 1]
        },
        data: [{value: 4.743}, {value: 7.295}, {value: 6.376}]
      }]
    });
    </script>

The following example demonstrates how to set an array for scatter series.

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        type: "scatter",
        errorBars: {
          yValue: [1, 2]
        },
        data: [{x: 6.4, y: 13.4}, {x: 1.7, y: 11}, {x: 5.4, y: 8}]
      }]
    });
    </script>

### Setting Percentage Values

You can also set the difference of the point value as percentage by setting a string value in the `"percenatage(n)"` format where `n` indicates the percent value.

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{        
        errorBars: {
          value: "percentage(20)"
        },
        data: [{value: 4.743}, {value: 7.295}, {value: 6.376}]
      }]
    });
    </script>

### Setting Statistical Values

The error bars support statistical calculations based on the series data. The supported types are the [standard error](https://en.wikipedia.org/wiki/Standard_error) and [population standard deviation](https://en.wikipedia.org/wiki/Standard_deviation). To specify that the standard error has to be used, set `"stderr"` as a value. To use standard deviation, set `"stddev"` with an optional number between parentheses appended at the end. The number will be multiplied by the calculated standard deviation value.

The following example demonstrates how to use the standard error type.

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        errorBars: {
          value: "stderr"
        },
        data: [{value: 4.743}, {value: 7.295}, {value: 6.376}]
      }]
    });
    </script>

The following example demonstrates how to use the standard deviation type.

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{    
        errorBars: {
          value: "stddev(0.5)"
        },
        data: [{value: 4.743}, {value: 7.295}, {value: 6.376}]
      }]
    });
    </script>

### Calculating Low and High Values

If you need a custom algorithm to calculate the low and high value, specify a function. The function accepts an object and returns a valid error bar value.

The following fields are available as object parameters:

* `dataItem`&mdash;The point data item.
* `value`&mdash;The point value.
* `index`&mdash;The point index in the series data.
* `category`&mdash;The point category value if a categorical chart is used.
* `series`&mdash;The series configuration.

The following example demonstrates how to use different percentages for the low and high values.

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        errorBars: {
          value: function(data) {          
              var value = data.value,
                lowPercentage = value * 0.05,
                highPercentage = value * 0.1;                                    
              return [lowPercentage, highPercentage];
          }
        },
        data: [{value: 4.743}, {value: 7.295}, {value: 6.376}]
      }]
    });
    </script>

## See Also

* [Using the API of the Chart (Demo)](https://demos.telerik.com/kendo-ui/chart-api/index)
* [JavaScript API Reference of the Chart](/api/javascript/dataviz/ui/chart)
