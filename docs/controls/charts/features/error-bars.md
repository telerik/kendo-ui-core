---
title: Error Bars
page_title: Error Bars | Kendo UI Charts
description: "Learn how to configure the error bars of Kendo UI Charts, bind them to the series data and set their value."
previous_url: /controls/charts/error-bars
slug: errorbars_charts_widget
position: 4
---

# Error Bars

Error bars can be used to show variability of data. This article describes the way you can use them in a Kendo UI Chart widget.

## Configuration

The Error bars are specified as part of the series definition and are supported for the following series types:

* Area
* Vertical Area
* Column
* Bar
* Line
* Vertical Line
* Scatter
* ScatterLine

The low and high value for the error bars can either be bound to the data or be calculated from the point or series values.

## Data Binding

### Bind to Categorical Series

To bind the error bars low and high values when using categorical series, set the [`errorLowField`](/api/dataviz/chart#configuration-series.errorLowField) and [`errorHighField`](/api/dataviz/chart#configuration-series.errorHighField) options to the fields in the data that hold the low and high value, as demonstrated below.

###### Example

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

### Bind to Scatter Series

Error bars can be displayed for the series `x` value, `y` value or both. To set the low and high fields for the series `x` value, set the [`xErrorLowField`](/api/dataviz/chart#configuration-series.xErrorLowField) and [`xErrorHighField`](/api/dataviz/chart#configuration-series.xErrorHighField) series options. The low and high fields for the series `y` value, can be specified with the [`yErrorLowField`](/api/dataviz/chart#configuration-series.yErrorLowField) and [`yErrorHighField`](/api/dataviz/chart#configuration-series.yErrorHighField) options.

The example below demonstrates how to bind the error bars for the series `x` value.

###### Example

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

The example below demonstrates how to bind the error bars for the series `y` value.

###### Example

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

## Set Error Bars Value

The error bars low and high value can be calculated based on the series point values. To set the error bars value for categorical series, specify the [`series.errorBars.value`](/api/dataviz/chart#configuration-series.errorBars.value) option. For scatter series set the [`series.errorBars.xValue`](/api/dataviz/chart#configuration-series.errorBars.xValue) or [`series.errorBars.yValue`](/api/dataviz/chart#configuration-series.errorBars.yValue) options or both.

### Set Numeric Value

If the error bars value is set to a number (must not be negative), the low and high value are calculated by subtracting or adding the value to the series value.

The example below demonstrates how to set a numeric values for categorical series.

###### Example

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

The example below demonstrates how to set a numeric values for scatter series.

###### Example

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

### Set Array Values

The difference can also be set separately for the low and high value by setting an array with two numeric values. In this case, the low value is calculated by subtracting the array first value from the point value. The high value is calculated by adding the second value to the point value.

The example below demonstrates how to set an array for categorical series.

###### Example

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

The example below demonstrates how to set an array for scatter series.

###### Example

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

### Set Percentage Values

It is also possible to set the difference of the point value as percentage. To achieve this, set a string value in the format `"percenatage(n)"` where `n` indicates the percent value, as demonstrated in the example below.

###### Example

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

### Set Statistical Values

The error bars support statistical calculations based on the series data. The supported types are [standard error](http://en.wikipedia.org/wiki/Standard_error) and [population standard deviation](http://en.wikipedia.org/wiki/Standard_deviation). To specify that standard error is to be used, set `"stderr"` as a value. To use standard deviation, set `"stddev"` with an optional number between parentheses appended at the end. The number is going to be multiplied by the calculated standard deviation value.

The example below demonstrates how to use the standard error type.

###### Example

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

The example below demonstrates how to use the standard deviation type.

###### Example

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

### Calculate Low and High Values

If a custom algorithm is needed to calculate the low and high value, specify a function. The function accepts an object and returns a valid error bar value. The following fields as object parameters are available:

* `dataItem`&mdash;The point data item.
* `value`&mdash;The point value.
* `index`&mdash;The point index in the series data.
* `category`&mdash;The point category value if a categorical chart is used.
* `series`&mdash;The series configuration.

The example below demonstrates how to use different percentages for the low and high value.

###### Example

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

Other articles on Kendo UI Charts:

* [Overview of the Chart Widgets]({% slug overview_kendoui_charts_widget %})
* [Data Binding]({% slug databinding_charts_widget %})
* [Date Series]({% slug dateseries_charts_widget %})
* [Tooltip]({% slug tooltip_charts_widget %})
* [Chart Notes]({% slug chartnotes_charts_widget %})
* [Title and Legend]({% slug titlelegend_features_charts %})
* [Appearance]({% slug appearance_charts_widget %})
* [Data Series Charts]({% slug seriestypeofcharts_widget %})
* [Types of Kendo UI Charts]({% slug areacharts_widget %})
* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
