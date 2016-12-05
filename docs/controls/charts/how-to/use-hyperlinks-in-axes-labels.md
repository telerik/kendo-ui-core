---
title: Use Hyperlinks in Axes Labels
page_title: Use Hyperlinks in Axes Labels | Kendo UI Charts
description: "Learn how to display a daily timeline for two users in a Kendo UI Chart."
slug: howto_usehyperlinks_inaxislabels_charts
---

# Use Hyperlinks in Axes Labels

It is possible to use hyperlinks in the axes labels of a Kendo UI Chart.

The example below demonstrates how to achieve this behavior.

###### Example

```html
    <div id="chart"></div>
    <script>
      var data = [ {
        "blog": "My blog",
        "day": "1",
        "value": 3,
        "userColor": "#ffd600",
        "url": "http://www.example.com"
      }, {
        "blog": "My blog",
        "day": "2",
        "value": 7,
        "userColor": "#ffd600",
        "url": "http://www.example.com"
      }, {
        "blog": "My blog",
        "day": "3",
        "value": 12,
        "userColor": "#ffd600",
        "url": "http://www.example.com"
      }];

      $("#chart").kendoChart({
        dataSource: {
          data: data
        },
        title: {
          align: "left",
          text: "Comments per day"
        },
        legend: {
          visible: false
        },
        seriesDefaults: {
          type: "column"
        },
        series: [{
          field: "value",
          colorField: "userColor"
        }],
        valueAxis: {
          majorGridLines: {
            visible: false
          },
          visible: false
        },
        categoryAxis: {
          field: "day",
          majorGridLines: {
            visible: false
          },
          line: {
            visible: false
          },
		  labels: {
            color: "#0487c4",
            cursor: "pointer",
            padding: {
              top: 2,
              bottom: 2,
              left: 3,
              right: 3
            },
            border: {
              width: 1,
              color: "#0487c4"
            }
          }
        },
        axisLabelClick: function(e) {
          window.location = e.dataItem.url;
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
