---
title: Shorten Chart Labels
page_title: Shorten Chart Labels | Kendo UI Charts
description: "Learn how to shorten long Kendo UI Chart labels to a more readable format."
previous_url: /controls/charts/how-to/shorten-chart-labels
slug: howto_shortenchartlabels_charts
---

# Shorten Chart Labels

In some scenarios, you might need to make a long Kendo UI Chart label short to make it more structured and comprehensible.

The example below demonstrates how to shorten long Chart labels and turn them into a more readable format.

###### Example

```html
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
