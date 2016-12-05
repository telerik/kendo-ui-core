---
title: Explode Clicked Pie Chart Segment
page_title: Explode Clicked Pie Chart Segment | Kendo UI Charts
description: "Learn how to explode a clicked segment in a Kendo UI Pie Chart."
previous_url: /controls/charts/how-to/explode-clicked-pie-segment
slug: howto_explodeclickedsegment_piecharts
---

# Explode Clicked Pie Chart Segment

To improve the visualization of the data illustrated in a Kendo UI Pie Chart, you might need to explode a segment that was clicked by the user.

The example below demonstrates how to achieve this behavior.

###### Example

```html
    <div id="chart"></div>
    <script>
      var data = [{
        "source": "Hydro",
        "percentage": 22,
        "explode": true
      },                  {
        "source": "Solar",
        "percentage": 2
      },                  {
        "source": "Nuclear",
        "percentage": 49
      },                  {
        "source": "Wind",
        "percentage": 27
      }];

      $("#chart").kendoChart({
        dataSource: {
          transport: {
            read: function(e) {
              e.success(data);
            }
          }
        },
        series: [{
          type: "pie",
          field: "percentage",
          categoryField: "source",
          explodeField: "explode",
          labels: {
            visible: true,
            background: "transparent",
            template: "#= category #: \n #= value#%"
          }
        }],
        seriesClick: function(e){
          $.each(e.sender.dataSource.view(), function() {
            // Clean up exploded state
            this.explode = false;
          });

          // Disable animations
          e.sender.options.transitions = false;

          // Explode the current slice
          e.dataItem.explode = true;
          e.sender.refresh();
        }
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
