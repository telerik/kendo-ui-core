---
title: Show Overlay While Loading
page_title: Show Overlay While Loading | Kendo UI Charts
description: "Learn how to show a loading indicator while the data of a Kendo UI Chart is loading."
slug: howto_showoverlaywhileloading_charts
---

# Show Overlay While Loading

The example below demonstrates how to show a loading indicator while while the data of a Kendo UI Chart is loading. The loading indicator is cleared in the [`render`](/api/javascript/dataviz/ui/chart#events-render) event.

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

Other articles and how-to examples on Kendo UI Charts:

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Create Dynamic Plot Bands]({% slug howto_createdynamicplotbands_charts %})
* [How to Create Stock Charts in AngularJS]({% slug howto_createstockcharts_angularjs %})
* [How to Create Timeline Using Range Bars]({% slug howto_createtimeline_usingrangebars_charts %})
* [How to Customize Chart Themes]({% slug howto_customizechartthemes_charts %})
* [How to Display Checkboxes Next to Legend Items]({% slug howto_displaycheckboxes_nexttolegenditems_charts %})
* [How to Display Time on Value Axis]({% slug howto_displaytimeonvalueaxis_charts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
* [How to Explode Clicked Segment in Pie Charts]({% slug howto_explodeclickedsegment_piecharts %})
* [How to Fit PDF Exported Chart to Page]({% slug howto_fitpdfexportedcharttopage_charts %})
* [How to Handle Right Click in Charts]({% slug howto_handlerightclick_charts %})
* [How to Implement Color-Coded Ranges in Bars]({% slug howto_implementcolorcodedranges_inbars_charts %})
* [How to Place Text in the Center of Donut Charts]({% slug howto_placetextinthecentre_donutcharts %})
* [How to Render Custom Plot Bands]({% slug howto_rendercustomplotbands_charts %})
* [How to Set Different Marker Types for Grouped Line Charts]({% slug howto_setdifrerentmarkers_forgroupedlinecharts_charts %})
* [How to Shorten Chart Labels]({% slug howto_shortenchartlabels_charts %})
* [How to Show Message When Chart Has No Data]({% slug howto_showemptymessage_whencharthasnodata_charts %})
* [How to Show Tooltip on seriesClick]({% slug howto_tooltiponseriesclick_charts %})
* [How to Show Total for Stacked Series]({% slug howto_showtotalstacked_charts %})
* [How to Sort Categories in Grouped Charts]({% slug howto_sortcategorisinagroupedchart_charts %})
* [How to Use Fixed Bar Size]({% slug howto_usefixedbarsize_charts %})
* [How to Use Hyperlinks in Axes Labels]({% slug howto_usehyperlinks_inaxislabels_charts %})

For more runnable examples on Kendo UI Charts, browse the [how-to articles]({% slug howto_createdynamicplotbands_charts %}).
