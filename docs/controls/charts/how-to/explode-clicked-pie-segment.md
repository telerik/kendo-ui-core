---
title: Explode Clicked Pie Chart Segment
page_title: Explode Clicked Pie Chart Segment | Kendo UI Charts
description: "Learn how to explode a clicked segment in a Kendo UI Pie Chart."
slug: howto_explodeclickedsegment_piecharts
---

# Explode Clicked Pie Chart Segment

The example below demonstrates how to explode a clicked segment in a Kendo UI Pie Chart.

###### Example

```html
    <div id="chart"></div>
    <script>
      var data = [{
        "source": "Hydro",
        "percentage": 22,
        "explode": true
      },                  {
        "source": "Solar",
        "percentage": 2
      },                  {
        "source": "Nuclear",
        "percentage": 49
      },                  {
        "source": "Wind",
        "percentage": 27
      }];

      $("#chart").kendoChart({
        dataSource: {
          transport: {
            read: function(e) {
              e.success(data);
            }
          }
        },
        series: [{
          type: "pie",
          field: "percentage",
          categoryField: "source",
          explodeField: "explode",
          labels: {
            visible: true,
            background: "transparent",
            template: "#= category #: \n #= value#%"
          }
        }],
        seriesClick: function(e){
          $.each(e.sender.dataSource.view(), function() {
            // Clean up exploded state
            this.explode = false;
          });

          // Disable animations
          e.sender.options.transitions = false;

          // Explode the current slice
          e.dataItem.explode = true;
          e.sender.refresh();
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
* [How to Use Hyperlinks in Axes Labels]({% slug howto_usehyperlinks_inaxislabels_charts %})
* [How to Use Linear Gradient As Background in Bars]({% slug howto_uselineargradient_inbars_charts %})

For more runnable examples on Kendo UI Charts, browse the [how-to articles]({% slug howto_createdynamicplotbands_charts %}).
