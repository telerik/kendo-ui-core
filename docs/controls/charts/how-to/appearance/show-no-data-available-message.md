---
title: Show Message When Chart Has No Data
page_title: Show Message When Chart Has No Data | Kendo UI Charts
description: "Learn how to show a message if the data source of a Kendo UI Chart is empty."
previous_url: /controls/charts/how-to/show-no-data-available-message
slug: howto_showemptymessage_whencharthasnodata_charts
---

# Show Message When Chart Has No Data

You can configure the Kendo UI Chart to display a message when its data source is empty.

The following example demonstrates how to achieve such behavior. Note that the `<div>` element of the message is positioned and decorated through CSS.

```dojo
    <div class="container">
      <div id="chart"></div>
      <div class="overlay"><div>No data available</div></div>
    </div>

    <script>  
     $("#chart").kendoChart({
        dataSource: {
          transport: {
            read: function(e) {
              setTimeout(function() {
                e.success([{
                  value: 1
                }, {
                  value: 2
                }]);
              }, 2000);
            }
          }
        },
        seriesDefaults: {
          type: "pie"
        },
        series: [{
          field: "value",
          name: "Foo"
        }],
        dataBound: function(e) {
          var view = e.sender.dataSource.view();
          $(".overlay").toggle(view.length === 0);
        }
      });
    </script>

	<style>
      .container {
        position: relative;
      }

      .overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: .2;
        filter: alpha(opacity=60);
        background-color: #6495ed;      
        text-align: center;
      }

      .overlay div {
        position: relative;
        font-size: 34px;
        margin-top: -17px;
        top: 50%;
      }
    </style>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
