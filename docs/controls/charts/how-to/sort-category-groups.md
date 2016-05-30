---
title: Sort Categories in Grouped Charts
page_title: Sort Categories in Grouped Charts | Kendo UI Charts
description: "Learn how to sort the categories in a grouped Kendo UI Chart."
slug: howto_sortcategorisinagroupedchart_charts
---

# Sort Categories in Grouped Charts

The order of the categories in a grouped chart cannot be set using the `sort` option of the data source. This is due to the fact that grouping overrides the sort order as part of its implementation. In effect the sort order is respected only within the resulting groups.

Still, you can influence the final order of the categories during the `dataBound` event.

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
* [How to Show Overlay While Loading]({% slug howto_showoverlaywhileloading_charts %})
* [How to Show Tooltip on seriesClick]({% slug howto_tooltiponseriesclick_charts %})
* [How to Show Total for Stacked Series]({% slug howto_showtotalstacked_charts %})
* [How to Use Fixed Bar Size]({% slug howto_usefixedbarsize_charts %})
* [How to Use Hyperlinks in Axes Labels]({% slug howto_usehyperlinks_inaxislabels_charts %})

For more runnable examples on Kendo UI Charts, browse the [how-to articles]({% slug howto_createdynamicplotbands_charts %}).
