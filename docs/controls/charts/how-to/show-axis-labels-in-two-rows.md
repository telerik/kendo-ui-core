---
title: Show Category Axis Labels in Two Rows
page_title: Show Category Axis Labels in Two Rows | Kendo UI Charts
description: "Learn how to show Category Axis labels in two rows when working with Kendo UI Charts."
slug: howto_showlabelsintworows_charts
---

# Show Category Axis Labels in Two Rows

The example below demonstrates how to show Category Axis labels in two rows when working with Kendo UI Charts.

###### Example

```html

    <div id="chart"></div>
	<script>
      var data = [{
        value: 1,
        category: "Category 1"
      },{
        value: 2,
        category: "Category 2"
      }, {
        value: 3,
        category: "Category 3"
      }, {
        value: 4,
        category: "Category 4"
      }, {
        value: 3,
        category: "Category 5"
      }, {
        value: 4,
        category: "Category 6"
      }];

      $("#chart").kendoChart({
        title: {
          text: "Gross domestic product growth /GDP annual %/"
        },
        dataSource: {
          data: data
        },
        legend: {
          position: "top"
        },
        seriesDefaults: {
          type: "column"
        },
        series: [{
          name: "Series Name",
          field: "value"
        }],
        valueAxis: {
          labels: {
            format: "{0}%"
          },
          line: {
            visible: false
          },
          axisCrossingValue: 0
        },
        categoryAxis: {
          field: "category",
          labels: {
            template: labelTemplate
          }
        },
        tooltip: {
          visible: true,
          format: "{0}%",
          template: "#= series.name #: #= value #"
        }
      });

      function labelTemplate(e) {
        var ds = $("#chart").data("kendoChart").dataSource;
        var index = ds.indexOf(e.dataItem);
        var label = index % 2 !== 0 ? "&nbsp;\n" : "";
        label += e.value;

        return label;
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
