---
title: Display Checkboxes Next to Legend Items
page_title: Display Checkboxes Next to Legend Items | Kendo UI Charts
description: "Learn how to customize the appearance of legend items in Kendo UI Charts."
slug: howto_displaycheckboxes_nexttolegenditems_charts
---

# Display Checkboxes Next to Legend Items

The [`legend.item.visual`](/api/javascript/dataviz/ui/chart#configuration-legend.item.visual) can be overridden to render custom text, images, and shapes. Draw a checkbox that matches the visible state of the series. The checkbox is represented by using an [Unicode Ballot Box symbol](https://en.wikipedia.org/wiki/Checkbox#Unicode).

For a list of all available drawing primitives, refer to the [Drawing API article](/framework/drawing/overview).

The example below demonstrates how to customize the appearance of legend items in Kendo UI Charts.

###### Example

```html
    <div id="chart" />
    <script>
      $("#chart").kendoChart({
        legend: {
          item: {
            visual: function (e) {
              var color = e.options.markers.background;
              var labelColor = e.options.labels.color;

              // Define the target dimensions for the legend item
              var rect = new kendo.geometry.Rect([0, 0], [100, 50]);

              // A layout will hold the checkbox and the default visual
              //
              // http://docs.telerik.com/kendo-ui/api/javascript/drawing/layout
              var layout = new kendo.drawing.Layout(rect, {
                spacing: 5,
                alignItems: "center"
              });

              // Cheat a bit by rendering the checkbox using the Unicode ballot symbol
              //
              // http://docs.telerik.com/kendo-ui/api/javascript/dataviz/drawing/text
              var cbSymbol = e.active ? "☑" : "☐";
              var cb = new kendo.drawing.Text(cbSymbol, [0, 0], {
                fill: {
                  color: labelColor
                },
                font: "14px sans-serif"
              });

              // This will give us the default box + text
              var defaultVisual = e.createVisual();

              // Reflow them together
              layout.append(cb, defaultVisual);
              layout.reflow()

              return layout;
            }
          }
        },
        series: [
          { name: "Series 1", data: [1, 2, 3] },
          { name: "Series 2", data: [3, 4, 5] }
        ]
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
* [How to Show Overlay While Loading]({% slug howto_showoverlaywhileloading_charts %})
* [How to Show Tooltip on seriesClick]({% slug howto_tooltiponseriesclick_charts %})
* [How to Show Total for Stacked Series]({% slug howto_showtotalstacked_charts %})
* [How to Sort Categories in Grouped Charts]({% slug howto_sortcategorisinagroupedchart_charts %})
* [How to Use Fixed Bar Size]({% slug howto_usefixedbarsize_charts %})
* [How to Use Hyperlinks in Axes Labels]({% slug howto_usehyperlinks_inaxislabels_charts %})

For more runnable examples on Kendo UI Charts, browse the [how-to articles]({% slug howto_createdynamicplotbands_charts %}).
