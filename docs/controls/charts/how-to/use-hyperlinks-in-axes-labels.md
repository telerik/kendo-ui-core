---
title: Use Hyperlinks in Axes Labels
page_title: Use Hyperlinks in Axes Labels | Kendo UI Charts
description: "Learn how to display a daily timeline for two users in a Kendo UI Chart."
slug: howto_usehyperlinks_inaxislabels_charts
---

# Use Hyperlinks in Axes Labels

The example below demonstrates how to use hyperlinks in the axes labels of Kendo UI Charts.

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
* [How to Sort Categories in Grouped Charts]({% slug howto_sortcategorisinagroupedchart_charts %})
* [How to Use Fixed Bar Size]({% slug howto_usefixedbarsize_charts %})

For more runnable examples on Kendo UI Charts, browse the [how-to articles]({% slug howto_createdynamicplotbands_charts %}).
