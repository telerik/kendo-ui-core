---
title: Calculate and Set Major Unit for Value Chart Axis
page_title: Calculate and Set Major Unit for Value Chart Axis
description: "Learn how to dynamically calculate and set the major unit for the value axis in a Kendo UI Chart."
previous_url: /controls/charts/how-to/configure-major-lines-in-value-axis, /controls/charts/how-to/various/configure-major-lines-in-value-axis
slug: howto_calculatemajorunit_charts
tags: chart, calculate, set, major, units, for, value, axes
component: chart
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Chart for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I calculate and set the major unit for the values axis in the Chart?

## Solution

In this scenario, you also need to name the axis. The effective axis range is available in the `render` event handler.

The API reference for the relevant methods and events that are used in the following example are:
* The [`render` event](/api/javascript/dataviz/ui/chart/events/render)
* The [`getAxis()` method](/api/javascript/dataviz/ui/chart/methods/getaxis)
* The [`kendo.dataviz.ChartAxis` API](/api/javascript/dataviz/chart/chart_axis)

```dojo
    <div class="clearfix" id="FirstChart"></div>

    <script>
      var TestDataSource =[{"SeriesName":"Series 1","Views":419,"DayDate":"2016-08-31T18:30:00.000Z"},{"SeriesName":"Series 1","Views":224,"DayDate":"2016-08-31T19:30:00.000Z"},{"SeriesName":"Series 1","Views":196,"DayDate":"2016-08-31T20:30:00.000Z"},{"SeriesName":"Series 1","Views":405,"DayDate":"2016-08-31T21:30:00.000Z"},{"SeriesName":"Series 1","Views":202,"DayDate":"2016-08-31T22:30:00.000Z"},{"SeriesName":"Series 1","Views":189,"DayDate":"2016-08-31T23:30:00.000Z"},{"SeriesName":"Series 1","Views":438,"DayDate":"2016-09-01T00:30:00.000Z"},{"SeriesName":"Series 2","Views":863,"DayDate":"2016-09-01T01:30:00.000Z"},{"SeriesName":"Series 1","Views":1231,"DayDate":"2016-09-01T02:30:00.000Z"},{"SeriesName":"Series 1","Views":4289,"DayDate":"2016-09-01T03:30:00.000Z"},{"SeriesName":"Series 1","Views":2791,"DayDate":"2016-09-01T04:30:00.000Z"},{"SeriesName":"Series 1","Views":2381,"DayDate":"2016-09-01T05:30:00.000Z"},{"SeriesName":"Series 2","Views":4000,"DayDate":"2016-09-01T06:30:00.000Z"},{"SeriesName":"Series 1","Views":2224,"DayDate":"2016-09-01T07:30:00.000Z"},{"SeriesName":"Series 1","Views":2134,"DayDate":"2016-09-01T08:30:00.000Z"},{"SeriesName":"Series 1","Views":1944,"DayDate":"2016-09-01T09:30:00.000Z"},{"SeriesName":"Series 1","Views":2101,"DayDate":"2016-09-01T10:30:00.000Z"},{"SeriesName":"Series 1","Views":1884,"DayDate":"2016-09-01T11:30:00.000Z"},{"SeriesName":"Series 2","Views":1950,"DayDate":"2016-09-01T12:30:00.000Z"},{"SeriesName":"Series 1","Views":1965,"DayDate":"2016-09-01T13:30:00.000Z"},{"SeriesName":"Series 1","Views":2505,"DayDate":"2016-09-01T14:30:00.000Z"},{"SeriesName":"Series 2","Views":3004,"DayDate":"2016-09-01T15:30:00.000Z"},{"SeriesName":"Series 1","Views":2118,"DayDate":"2016-09-01T16:30:00.000Z"},{"SeriesName":"Series 1","Views":1017,"DayDate":"2016-09-01T17:30:00.000Z"},{"SeriesName":"Series 2","Views":2800,"DayDate":"2016-08-31T18:30:00.000Z"},{"SeriesName":"Series 2","Views":0,"DayDate":"2016-08-31T19:30:00.000Z"},{"SeriesName":"Series 2","Views":0,"DayDate":"2016-08-31T20:30:00.000Z"},{"SeriesName":"Series 2","Views":0,"DayDate":"2016-08-31T21:30:00.000Z"},{"SeriesName":"Series 2","Views":0,"DayDate":"2016-08-31T22:30:00.000Z"},{"SeriesName":"Series 2","Views":500,"DayDate":"2016-08-31T23:30:00.000Z"},{"SeriesName":"Series 2","Views":0,"DayDate":"2016-09-01T00:30:00.000Z"},{"SeriesName":"Series 2","Views":0,"DayDate":"2016-09-01T01:30:00.000Z"},{"SeriesName":"Series 2","Views":0,"DayDate":"2016-09-01T02:30:00.000Z"},{"SeriesName":"Series 2","Views":0,"DayDate":"2016-09-01T03:30:00.000Z"},{"SeriesName":"Series 2","Views":0,"DayDate":"2016-09-01T04:30:00.000Z"},{"SeriesName":"Series 2","Views":0,"DayDate":"2016-09-01T05:30:00.000Z"},{"SeriesName":"Series 2","Views":0,"DayDate":"2016-09-01T06:30:00.000Z"},{"SeriesName":"Series 2","Views":0,"DayDate":"2016-09-01T07:30:00.000Z"},{"SeriesName":"Series 2","Views":0,"DayDate":"2016-09-01T08:30:00.000Z"},{"SeriesName":"Series 2","Views":0,"DayDate":"2016-09-01T09:30:00.000Z"},{"SeriesName":"Series 2","Views":0,"DayDate":"2016-09-01T10:30:00.000Z"},{"SeriesName":"Series 2","Views":0,"DayDate":"2016-09-01T11:30:00.000Z"},{"SeriesName":"Series 2","Views":900,"DayDate":"2016-09-01T12:30:00.000Z"}];

      function createChart(divId,dataToPlot) {
        $("#"+divId).kendoChart({
          dataSource: {
            data: dataToPlot,
            group: {
              field: "SeriesName"
            },
            schema: {
              model: {
                fields: {
                  DayDate: {
                    type: "date"
                  }
                }
              }
            }
          },
          seriesDefaults: {
            type: "line",
            style: "smooth"
          },
          series: [{
            type: "line",
            field:"Views",
            name: "#=group.value#",
            categoryField: "DayDate",
            missingValues: "zero"
          }],
          legend: {
            position: "top"
          },
          categoryAxis: {
            labels: {
              format: "HH:mm",
              rotation: 315
            },
            crosshair: {
              visible: false
            },
            padding: {
            },
            majorGridLines: {
              visible: false
            },
            min: new Date("2016-09-01 00:00"),
            max: new Date("2016-09-01 23:00"),
            baseUnit: "hours",
          },
          valueAxis: {
            // Axis must be named
            name: "value",
            labels: {
              format: "{0:n0}",
            },
          },
          title: {
            text: "Test Major Grid Lines"
          },
          tooltip: {
            visible: true,
          },
          render: function(e) {
            // Effective axis range is available in the render event
            //
            // See
            // https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/events/render
            // https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/methods/getAxis
            // https://docs.telerik.com/kendo-ui/api/javascript/dataviz/chart/chart_axis
            var range = e.sender.getAxis("value").range();
            var majorUnit = range.max / 3;
            var axis = e.sender.options.valueAxis;

            if (axis.majorUnit !== majorUnit) {
              axis.majorUnit = majorUnit;

              // We need to redraw the chart to apply the changes
              e.sender.redraw();
            }            
          }
        });
      }

      $(function(){
        createChart("FirstChart",TestDataSource);
      });
    </script>

```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
