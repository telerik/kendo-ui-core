---
title: Calculate and Set Major Unit for Value Axis
page_title: Calculate and Set Major Unit for Value Axis | Kendo UI Charts
description: "Learn how to dynamically calculate and set the major unit for the value axis in a Kendo UI Chart."
slug: howto_calculatemajorunit_charts
---

# Calculate and Set Major Unit for Value Axis

Sometimes you might need to calculate and set the major unit for the values axis in a Kendo UI Chart.

In this scenario, you also need to name the axis. The effective axis range is available in the `render` event handler.

The API reference for the relevant methods and events that are used in the following example are:
* The [`render` event](/api/javascript/dataviz/ui/chart#events-render)
* The [`getAxis()` method](/api/javascript/dataviz/ui/chart#methods-getAxis)
* The [`kendo.dataviz.ChartAxis` API](/api/javascript/dataviz/chart/chart_axis)

###### Example

```html
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
            // http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart#events-render
            // http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart#methods-getAxis
            // http://docs.telerik.com/kendo-ui/api/javascript/dataviz/chart/chart_axis
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

Other articles and how-to examples on the Kendo UI Charts:

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
* [How to Fit PDF Exported Chart to Page]({% slug howto_fitpdfexportedcharttopage_charts %})
* [How to Handle Right Click in Charts]({% slug howto_handlerightclick_charts %})
* [How to Place Text in the Center of Donut Charts]({% slug howto_placetextinthecentre_donutcharts %})
* [How to Render Custom Plot Bands]({% slug howto_rendercustomplotbands_charts %})
* [How to Set Different Marker Types for Grouped Line Charts]({% slug howto_setdifrerentmarkers_forgroupedlinecharts_charts %})
* [How to Use Linear Gradient As Background in Bars]({% slug howto_uselineargradient_inbars_charts %})

For more runnable examples on Kendo UI Charts, browse the [**How To** documentation folder]({% slug howto_createdynamicplotbands_charts %}).
