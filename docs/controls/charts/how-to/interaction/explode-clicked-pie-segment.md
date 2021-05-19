---
title: Explode Clicked Pie Chart Segment
page_title: Explode Clicked Pie Chart Segment | Kendo UI Charts
description: "Learn how to explode a clicked segment in a Kendo UI Pie Chart."
previous_url: /controls/charts/how-to/explode-clicked-pie-segment
slug: howto_explodeclickedsegment_piecharts
---

# Explode Clicked Pie Chart Segment

To improve the visualization of the data illustrated in a Kendo UI Pie Chart, you might need to explode a segment that was clicked by the user.

The following example demonstrates how to achieve this behavior.

```dojo
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

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
