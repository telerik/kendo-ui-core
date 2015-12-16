---
title: Error Bars
page_title: Configuration guide for the chart ErrorBars
description: How to configure the error bars of a chart, bind them to the series data and set the value.
---

#Error bars
Error bars can be used to show variability of data. This help topic describes how to use them in a Kendo UI Chart. 

##Configuring the chart error bars
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

##Data binding

###Binding to categorical series
To bind the error bars low and high value when using categorical series, you should set the [errorLowField](/api/dataviz/chart#configuration-series.errorLowField) and [errorHighField](/api/dataviz/chart#configuration-series.errorHighField) options to the fields in the data that hold the low and high value.

#### Example

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

###Binding to scatter series
Error bars can be displayed for the series x value, y value or both. To set the low and high fields for the series x value, you should set the [xErrorLowField](/api/dataviz/chart#configuration-series.xErrorLowField) and [xErrorHighField](/api/dataviz/chart#configuration-series.xErrorHighField) series options. The low and high fields for the series y value, can be specified with the [yErrorLowField](/api/dataviz/chart#configuration-series.yErrorLowField) and [yErrorHighField](/api/dataviz/chart#configuration-series.yErrorHighField) options.

#### Example: binding the error bars for the series x value

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

#### Example: binding the error bars for the series y value

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

##Setting the error bars value
The error bars low and high value can be calculated based on the series point values. To set the error bars value for categorical series, you should specify the [series.errorBars.value](/api/dataviz/chart#configuration-series.errorBars.value) option. For scatter series, you should set the [series.errorBars.xValue](/api/dataviz/chart#configuration-series.errorBars.xValue) or [series.errorBars.yValue](/api/dataviz/chart#configuration-series.errorBars.yValue) options or both.

###Setting a numeric value

If the error bars value is set to a number(must not be negative), then the low and high value will be calculated by subtracting/adding the value to the series value.

####Example: setting a numeric value for categorical series

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

####Example: setting a numeric value for scatter series

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

###Setting an array value

The difference can also be set separately for the low and high value by setting an array with two numeric values. In this case, the low value will be calculated by subtracting the array first value from the point value and the high value will be calculated by adding the second value to the point value.

####Example: setting an array value for categorical series

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

####Example: setting an array value for scatter series

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

###Setting a percentage value

It is also possible to set the difference as percentage of the point value. To achieve this, you should set a string value in the format "percenatage(n)" where `n` indicates the percent value.

####Example: setting a percentage value

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

###Setting a statistical value

The error bars support statistical calculations based on the series data. The supported types are [standard error](http://en.wikipedia.org/wiki/Standard_error) and [population standard deviation](http://en.wikipedia.org/wiki/Standard_deviation). To specify that standard error should be used, you should set `"stderr"` as value. To use standard deviation, you should set `"stddev"` with an optional number between parentheses appended at the end. The number will be multiplied by the calculated standard deviation value.

####Example: using standard error

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

####Example: using standard deviation

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

###Calculating the low and high value with a custom function.

If a custom algorithm is needed to calculate the low and high value, then you can specify a function. The function accepts an object with the following fields as parameter:

* dataItem – the point data item
* value - the point value
* index – the point index in the series data
* category – the point category value if a categorical chart is used
* series – the series configuration 

and should return a valid error bar value.

####Example: using different percentages for the low and high value

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