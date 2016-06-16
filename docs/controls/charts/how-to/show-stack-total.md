---
title: Show Total for Stacked Series
page_title: Show Total for Stacked Series | Kendo UI Charts
description: "Learn how to place a label with the stack total on top of column or bar series in a Kendo UI Chart."
slug: howto_showtotalstacked_charts
---

# Show Total for Stacked Series

The example below demonstrates how to place a label with the stack total on top of column or bar series in a Kendo UI Chart. It works by iterating all series and building a template expression that sums up the values of the visible series. This needs to be done initially, in the [`dataBound` event](/api/javascript/dataviz/ui/chart#events-dataBound), and on each [`legendItemClick`](/api/javascript/dataviz/ui/chart#events-legendItemClick).

###### Example

```html
    <div id="chart"></div>
    <script>
      $(function(){
        $("#chart").kendoChart({
          dataSource:{
            data:[{
              a: 22,
              b: 11,
              c: 33
            },{
              a: 2,
              b: 1,
              c: 3
            }]
          },
          seriesDefaults: {
            type: "column",
            stack: true
          },
          series: [{
            field: "a",
            name: "a"
          },{
            field: "b",
            name: "b"
          },{
            field: "c",
            name: "c"
          }],
          categoryAxis: {
            field: "category"
          },
          legend: {
            visible: true,
            position: "bottom"
          },
          legendItemClick: function(e) {
            setTotalLabel(e.sender, e.seriesIndex);
          },
          dataBound: function(e) {
            setTotalLabel(e.sender);
          }
        })
      })

      function setTotalLabel(chart, toggledSeriesIndex) {
        var series = chart.options.series;
        var lastSeries = {};
        var fields = [];

        for (var i = 0; i < series.length; i++) {
          var visible = series[i].visible;

          // We're about to toggle the visibility of the clicked series
          if (i === toggledSeriesIndex) {
            visible = !visible;
          }

          if (visible) {
            fields.push("dataItem." + series[i].field);
            lastSeries = series[i];
          }

          // Clean-up existing labels
          series[i].labels = {};
        }

        lastSeries.labels = {
          visible: true,
          template: "#=" + fields.join("+") + "#"
        };
      }
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
