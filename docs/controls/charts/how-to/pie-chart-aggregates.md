---
title: Aggregate Pie Chart Data
page_title: Aggregate Pie Chart Data | Kendo UI Charts
description: "Learn how to aggregate data in Kendo UI Pie Charts."
slug: howto_aggregatedata_piecharts
---

# Aggregate Pie Chart Data

In some scenarios, you might need to aggregate Pie Chart data and to override the sort order of the categories.

The example below demonstrates how to achieve this behavior by using the [dataSource aggregates](/api/javascript/data/datasource#configuration-aggregate).

###### Example

```html
    <div id="piechart"></div>
    <script>
      var data = [
        {
          "source": "Hydro",
          "percentage": 20,
        },
        {
          "source": "Hydro",
          "percentage": 20
        },
        {
          "source": "Solar",
          "percentage": 10
        },
        {
          "source": "Nuclear",
          "percentage": 30            
        }
      ];

      var dataSource = new kendo.data.DataSource({
        data: data,
        group: {field: "source", aggregates: [{
          field: "percentage", aggregate: "sum"
        }]}
      });
      dataSource.read();

      $("#piechart").kendoChart({
        title: {
          text: "Population by State"
        },
        legend: {
          position: "bottom"
        },
        dataSource: getChartData(),
        series: [{
          type: "pie",
          field: "percentage",
          categoryField: "source",
          aggregate: "sum"
        }],
        tooltip: {
          visible: true,
          template: "${ category } - #:value# (#:percentage#%)"
        }
      });

      function getChartData() {
        var chartData = [];
        var view = dataSource.view();
        for(var idx = 0; idx < view.length; idx++) {
          chartData.push({
            source: view[idx].value,
            percentage: view[idx].aggregates.percentage.sum
          });
        }
        return chartData;
      }
    </script>
```

## See Also

Other articles and how-to examples on the Kendo UI Charts:

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
* [How to Fit PDF Exported Chart to Page]({% slug howto_fitpdfexportedcharttopage_charts %})
* [How to Handle Right Click in Charts]({% slug howto_handlerightclick_charts %})
* [How to Place Text in the Center of Donut Charts]({% slug howto_placetextinthecentre_donutcharts %})
* [How to Render Custom Plot Bands]({% slug howto_rendercustomplotbands_charts %})
* [How to Set Different Marker Types for Grouped Line Charts]({% slug howto_setdifrerentmarkers_forgroupedlinecharts_charts %})
* [How to Use Linear Gradient As Background in Bars]({% slug howto_uselineargradient_inbars_charts %})

For more runnable examples on Kendo UI Charts, browse the [**How To** documentation folder]({% slug howto_createdynamicplotbands_charts %}).
