---
title: Create Dynamic Plot Bands
page_title: Create Dynamic Plot Bands | Kendo UI Charts
description: "Learn how to create dynamic plot bands for Kendo UI Charts."
slug: howto_createdynamicplotbands_charts
---

# Create Dynamic Plot Bands

The example below demonstrates how to create dynamic plot bands for Kendo UI Charts.

###### Example

```html
   <div id="chart"></div>
   <button>Change plot band</button>

    <script>
      $("#chart").kendoChart({
        categoryAxis: {
          type: "date",
          categories: [new Date("2014/01/01"), new Date("2014/01/02"), new Date("2014/01/31")],
          plotBands: [{
            from: new Date("2014/01/02"),
            to: new Date("2014/01/02"),
            color: "red"
          }]
        }
      });

      function showPlotBand(element, band) {
        var plotBands = [ band ];
        var axisNames = ["valueAxis", "xAxis", "categoryAxis"];
        var options = {};

        for (var i = 0; i < axisNames.length; i++) {
          options[axisNames[i]] = { plotBands: plotBands };
        }

        var chart = $(element).data("kendoChart");
        chart.setOptions(options);
      }

      $("button").click(function(){
        // shows a random plot band
        var start = new Date(2014, 0, 1 + Math.floor(Math.random() * 30));
        var end = new Date(start.getTime() + 1000 * 3600 * 24); // 24 hours after start

        showPlotBand("#chart", {
            from: start,
            to: end,
            color: "green"
        });
      });
    </script>
```

## See Also

Other articles and how-to examples on Kendo UI Charts:

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
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
* [How to Use Hyperlinks in Axes Labels]({% slug howto_usehyperlinks_inaxislabels_charts %})
* [How to Use Linear Gradient As Background in Bars]({% slug howto_uselineargradient_inbars_charts %})

For more runnable examples on Kendo UI Charts, browse the [how-to articles]({% slug howto_createdynamicplotbands_charts %}).
