---
title: Shorten Chart Labels
page_title: Shorten Chart Labels | Kendo UI Charts
description: "Learn how to shorten long Kendo UI Chart labels to a more readable format."
previous_url: /controls/charts/how-to/shorten-chart-labels
slug: howto_shortenchartlabels_charts
---

# Shorten Chart Labels

In some scenarios, you might need to make a long Kendo UI Chart label short to make it more structured and comprehensible.

The following example demonstrates how to shorten long Chart labels and turn them into a more readable format.

```dojo
    <div id="chart"></div>
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
          name: "Series 1",
          data: [10, 20, 30]
        }],
        categoryAxis: {
          categories: ["Long category", "Very long category", "Very Very long category"],
          labels: {
            template: "#= shortLabels(value)#"
          }
        },
        tooltip: {
          visible: true,
          format: "{0}%",
          template: "#= series.name #: #= value #"
        }
      });
      function shortLabels(value) {
        if (value.length > 5) {
          value = value.substring(0, 10);
          return value + "...";
        }
      }
    </script>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
