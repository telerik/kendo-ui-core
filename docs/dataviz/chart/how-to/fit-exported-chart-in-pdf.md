---
title: Fit the pdf exported chart on the page
page_title: Fit the pdf exported chart on the page
description: Fit the pdf exported chart on the page
---

# Fit the pdf exported chart on the page

The example below demonstrates how export a Kendo UI Chart to PDF and make it fit on the page.

#### Example:

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
