---
title: Fit PDF Exported Chart to Page
page_title: Fit PDF Exported Chart to Page | Kendo UI Charts
description: "Learn how to explode a clicked segment in a Kendo UI Pie Chart."
slug: howto_fitpdfexportedcharttopage_charts
---

# Fit PDF Exported Chart to Page

The example below demonstrates how to fit a PDF-exported Kendo UI Chart to a page.

###### Example

```html
	 <button class='export-img k-button'>Export as PDF</button>
     <div class="content">
      <div id="chart"></div>
      Copyright: ACME Inc.
     </div>
     <script>
      $("#chart").kendoChart({
        title: {
          text: "Site Visitors Stats 123456 789 \n /thousands/"
        },
        legend: {
          visible: false
        },
        seriesDefaults: {
          type: "bar"
        },
        series: [{
          name: "Total Visits",
          data: [56000, 63000, 74000, 91000, 117000, 138000]
        }, {
          name: "Unique visitors",
          data: [52000, 34000, 23000, 48000, 67000, 83000]
        }],
        valueAxis: {
          max: 140000,
          line: {
            visible: false
          },
          minorGridLines: {
            visible: true
          }
        },
        categoryAxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          majorGridLines: {
            visible: false
          }
        }
      });

      function mm(val) {
        return val * 2.8347;
      }

      $(".export-img").click(function() {
        // Convert the DOM element to a drawing using kendo.drawing.drawDOM
        kendo.drawing.drawDOM($(".content"))
        .then(function(group) {
          var PAGE_RECT = new kendo.geometry.Rect(
            [0, 0], [mm(210 - 20), mm(297 - 20)]
          );

          var content = new kendo.drawing.Group();
          content.append(group);

          kendo.drawing.fit(content, PAGE_RECT)

          return kendo.drawing.exportPDF(content,{
            paperSize: "A4",
            margin: "1cm"
          });
        })
        .done(function(data) {
          kendo.saveAs({
            dataURI: data,
            fileName: "Map.pdf",
            proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
          });
        });
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
