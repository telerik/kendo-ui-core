---
title: Fit PDF Exported Chart to Page
page_title: Fit PDF Exported Chart to Page
description: "Learn how to explode a clicked segment in a Kendo UI Pie Chart."
previous_url: /controls/charts/how-to/fit-exported-chart-in-pdf, /controls/charts/how-to/export/fit-exported-chart-in-pdf
slug: howto_fitpdfexportedcharttopage_charts
tags: chart, fit, pdf, export, to, page
component: chart
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Chart for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I control the overflow of the Chart borders when exporting it to PDF?

## Solution

Sometimes when exporting a Kendo UI Chart, its content might overflow the borders of the page.

The following example demonstrates how to work around this issue and fit a PDF-exported Kendo UI Chart to a page.

```dojo
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
            proxyURL: "https://demos.telerik.com/kendo-ui/service/export"
          });
        });
      });
    </script>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
