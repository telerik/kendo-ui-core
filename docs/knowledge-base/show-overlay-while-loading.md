---
title: Show Overlay while the Chart Is Loading
page_title: Show Overlay while the Chart Is Loading
description: "Learn how to show a loading indicator while the data of a Kendo UI Chart is loading."
previous_url: /controls/charts/how-to/show-overlay-while-loading, /controls/charts/how-to/appearance/show-overlay-while-loading
slug: howto_showoverlaywhileloading_charts
tags: chart, show, overlay, while, loading
component: chart
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Chart for jQuery</td>
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

Sometimes the loading of my Chart takes longer time than the user expects. How can I set an overlay for the Chart while it is loading?

## Solution

For such scenarios, you can configure the Kendo UI Chart to show the progress of the process.

The following example demonstrates how to display a loading indicator while the data of a Kendo UI Chart is loading. The loading indicator is cleared in the [`render`](/api/javascript/dataviz/ui/chart/events/render) event.

> For Kendo UI versions prior to 2014.3.1119, replace it with the [`dataBound`](/api/javascript/dataviz/ui/chart/events/databound) event.

```dojo
    <div class="chart-wrap" style="position: relative;">
      <div id="chart"></div>
      <div class="chart-loading"></div>
    </div>
    <script>
      var ds = new kendo.data.DataSource({
        transport: {
          read: function(e) {
            // Delay response to simulate remote data
            setTimeout(function() {
              e.success([{
                value: 1
              }, {
                value: 2
              }, {
                value: 3
              }]);
            }, 2000);
          }
        }
      });

      $("#chart").kendoChart({
        dataSource: ds,
        series: [{
          field: "value"
        }],
        render: function(e) {
          // Clear up the loading indicator for this chart
          var loading = $(".chart-loading", e.sender.element.parent());
          kendo.ui.progress(loading, false);
        }
      });

      $(document).ready(function() {
        // Spin all loading indicators on the page
        kendo.ui.progress($(".chart-loading"), true);
      });
    </script>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
