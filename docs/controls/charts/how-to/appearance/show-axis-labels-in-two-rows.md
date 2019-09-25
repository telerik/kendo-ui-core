---
title: Show Category Axis Labels on Multiple Lines
page_title: Show Category Axis Labels on Multiple Lines | Kendo UI Charts
description: "Learn how to insert line breaks in Category Axis labels when working with Kendo UI Charts."
previous_url: /controls/charts/how-to/show-axis-labels-in-two-rows
slug: howto_showlabelsintworows_charts
---

# Show Category Axis Labels on Multiple Lines

Sometimes you might need to display long labels in a Kendo UI Chart. To make the content look more compact and better organized, it is possible to break the content of the labels into multiple lines.   

The following example demonstrates how to insert newline symbols in the Category Axis labels to achieve this behavior.

```dojo

    <div id="chart"></div>
    <script>
      var data = [{
        value: 1,
        category: "Category Foo"
      },{
        value: 2,
        category: "Category Bar"
      }, {
        value: 3,
        category: "Category Baz"
      }];

      $("#chart").kendoChart({
        dataSource: {
          data: data
        },
        series: [{
          type: "column",
          name: "Series Name",
          field: "value"
        }],
        categoryAxis: {
          field: "category",
          labels: {
            template: labelTemplate
          }
        }
      });

      function labelTemplate(e) {
        return e.value.split(" ").join("\n");
      }
    </script>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
