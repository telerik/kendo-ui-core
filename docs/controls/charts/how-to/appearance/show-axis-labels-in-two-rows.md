---
title: Show Category Axis Labels on Multiple Lines
page_title: Show Category Axis Labels on Multiple Lines | Kendo UI Charts
description: "Learn how to insert line breaks in Category Axis labels when working with Kendo UI Charts."
previous_url: /controls/charts/how-to/show-axis-labels-in-two-rows
slug: howto_showlabelsintworows_charts
---

# Show Category Axis Labels on Multiple Lines

Sometimes you might need to display long labels in a Kendo UI Chart. To make the content look more compact and better organized, it is possible to break the content of the labels into multiple lines.   

The example below demonstrates how to insert newline symbols in the Category Axis labels to achieve this behavior.

###### Example

```html

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
