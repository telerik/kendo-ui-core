---
title: Show Tooltip on seriesClick
page_title: Show Tooltip on seriesClick | Kendo UI Charts
description: "Learn how to show the tooltip of a Kendo UI Chart on seriesClick."
previous_url: /controls/charts/how-to/show-tooltip-on-click
slug: howto_tooltiponseriesclick_charts
---

# Show Tooltip on seriesClick

The following example demonstrates how to show the tooltip of a Kendo UI Chart upon `seriesClick`.

```dojo
    <div class="wrapper" style="position: relative;">
       <div id="chart"></div>

       <div id="customTooltip" style="">Tooltip content</div>
    </div>

    <script>
       $("#chart").kendoChart({
        title: {
          text: "Gross domestic product growth /GDP annual %/"
        },
        legend: {
          position: "top"
        },
        seriesDefaults: {
          type: "column"
        },
        series: [{
          name: "India",
          data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
        }, {
          name: "Russian Federation",
          data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3]
        }, {
          name: "Germany",
          data: [0.010, -0.375, 1.161, 0.684, 3.7, 3.269, 1.083, -5.127, 3.690, 2.995]
        },{
          name: "World",
          data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727]
        }],
        valueAxis: {
          labels: {
            format: "{0}%"
          },
          line: {
            visible: false
          },
          axisCrossingValue: 0
        },
        categoryAxis: {
          categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
          line: {
            visible: false
          },
          labels: {
            padding: {top: 135}
          }
        },
        tooltip: {
          visible: false,
          format: "{0}%",
          template: "#= series.name #: #= value #"
        },
        seriesClick: function(e){
          var positionX = e.originalEvent.x.client,
              positionY = e.originalEvent.y.client,
              value = e.value;

          $("#customTooltip").show().css('position', 'absolute').css("top", positionY).css("left", positionX).text(value);
        }
      });
    </script>

   <style>
      #customTooltip {
        display: none;
        background: #fff;
        border-radius: 5px;
        height: auto;
        width: auto;
        border: 1px solid green;
        padding: 10px;
      }
    </style>

```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
