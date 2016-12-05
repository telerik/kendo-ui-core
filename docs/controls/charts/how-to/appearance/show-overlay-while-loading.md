---
title: Show Overlay while Loading
page_title: Show Overlay while Loading | Kendo UI Charts
description: "Learn how to show a loading indicator while the data of a Kendo UI Chart is loading."
previous_url: /controls/charts/how-to/show-overlay-while-loading
slug: howto_showoverlaywhileloading_charts
---

# Show Overlay while Loading

In some cases, the loading of a Chart might take longer time than the user expects. For such scenarios, you can configure the Kendo UI Chart to show the progress of the process.

The example below demonstrates how to display a loading indicator while the data of a Kendo UI Chart is loading. The loading indicator is cleared in the [`render`](/api/javascript/dataviz/ui/chart#events-render) event.

> **Important**
>
> Replace it with the [`dataBound`](/api/javascript/dataviz/ui/chart#events-dataBound) event for Kendo UI versions prior to 2014.3.1119.

###### Example

```html
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
