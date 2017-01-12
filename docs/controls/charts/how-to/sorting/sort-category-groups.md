---
title: Sort Categories in Grouped Charts
page_title: Sort Categories in Grouped Charts | Kendo UI Charts
description: "Learn how to sort the categories in a grouped Kendo UI Chart."
previous_url: /controls/charts/how-to/sort-category-groups
slug: howto_sortcategorisinagroupedchart_charts
---

# Sort Categories in Grouped Charts

The order of the categories in a grouped chart cannot be set through the `sort` option of the data source.

The reason for this behavior is that the grouping overrides the sort order as part of its implementation. In effect, the sort order is respected only within the resulting groups. Still, you can influence the final order of the categories during the `dataBound` event.

The example below demonstrates how to sort categories in a grouped Kendo UI Chart.

###### Example

```html
    <div id="chart"></div>
    <script>
      var data = [{
        daysOut: 1,
        type: "A",
        requestor: "Adam"
      },{
        daysOut: 2,
        type: "A",
        requestor: "Bonnie"
      },{
        daysOut: 1,
        type: "A",
        requestor: "Connor"
      },{
        daysOut: 1,
        type: "B",
        requestor: "Zach"
      },{
        daysOut: 1,
        type: "B",
        requestor: "Amber"
      }];

      $("#chart").kendoChart({
        "dataSource": {
          data: data,
          group: {
            field: "type"
          }
        },
        series: [{
          field: "daysOut",
          type: "bar",
          categoryField: "requestor",

          // Grouping will generate two series - "A" and "B" in each category
          // Since we only have data for one of them we use stacking to remove the empty space
          stack: true
        }],
        dataBound: function(e) {
          var axis = e.sender.options.categoryAxis;
          axis.categories = axis.categories.sort();
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
