---
title: Show Total for Stacked Series
page_title: Show Total for Stacked Series | Kendo UI Charts
description: "Learn how to place a label with the stack total on top of column or bar series in a Kendo UI Chart."
slug: howto_showtotalstacked_charts
---

# Show Total for Stacked Series

Starting with the 2016 R3 release, a `stackValue` field is available in the label template, the series visual, and the event arguments.

It is possible to use this configuration to display the cumulative point value for stacked series.

```dojo
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
            name: "c",
            labels: {
                template: "#= stackValue #",
                visible: true
            }
          }]
        });
      });
    </script>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
