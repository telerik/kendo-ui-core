---
title: Fit PDF Exported Chart to Page
page_title: Fit PDF Exported Chart to Page | Kendo UI Charts
description: "Learn how to explode a clicked segment in a Kendo UI Pie Chart."
previous_url: /controls/charts/how-to/fit-exported-chart-in-pdf
slug: howto_fitpdfexportedcharttopage_charts
---

# Fit PDF Exported Chart to Page

Sometimes when exporting a Kendo UI Chart, its content might overflow the borders of the page.

The example below demonstrates how to work around this issue and fit a PDF-exported Kendo UI Chart to a page.

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

Other articles and how-to examples on the Kendo UI Charts:

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
* [How to Handle Right Click in Charts]({% slug howto_handlerightclick_charts %})
* [How to Place Text in the Center of Donut Charts]({% slug howto_placetextinthecentre_donutcharts %})
* [How to Render Custom Plot Bands]({% slug howto_rendercustomplotbands_charts %})
* [How to Set Different Marker Types for Grouped Line Charts]({% slug howto_setdifrerentmarkers_forgroupedlinecharts_charts %})
* [How to Use Linear Gradient As Background in Bars]({% slug howto_uselineargradient_inbars_charts %})

For more runnable examples on Kendo UI Charts, browse the [**How To** documentation folder]({% slug howto_createdynamicplotbands_charts %}).
