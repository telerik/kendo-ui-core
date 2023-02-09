---
title: Apply Drawing API Transformations during Export
page_title: Apply Drawing API Library Transformations during Export
description: "Learn how to transform the content during export while applying the Kendo UI Drawing API."
slug: howto_applytransformationsduringexport_drawingapi
previous_url: /framework/drawing/how-to/export-transform
tags: telerik, kendo, jquery, drawing, api, library, apply, transformations, during, export
component: drawing
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Drawing API</td>
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

How can I apply geometric transformations during export while applying the Kendo UI Drawing API?

## Solution

The following example demonstrates how to produce a PNG image of a page section at 4x the original resolution and applies an uniform 2x scale on the X and Y dimensions. The operation is carried out while the content is still represented in a vector form and no loss of quality occurs.

For more information, refer to the article on [transformation API](/api/javascript/geometry/transformation/methods/scale).

```dojo
    <button type="button" class="export-img k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">
      <span class="k-button-text">Export as Image</span>
    </button>
    <div class="content">
      <div id="chart"></div>
      Copyright: ACME Inc.
    </div>

    <script>
      $("#chart").kendoChart({
        title: {
          text: "Site Visitors Stats \n /thousands/"
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

      $(".export-img").click(function() {
        // Convert the DOM element to a drawing using kendo.drawing.drawDOM
        kendo.drawing.drawDOM($(".content"))
        .then(function(group) {

          group.transform(
            kendo.geometry.transform().scale(2, 2)
          );

          // Render the result as a PNG image
          return kendo.drawing.exportImage(group);
        })
        .done(function(data) {
          // Save the image file
          kendo.saveAs({
            dataURI: data,
            fileName: "Map.png",
            proxyURL: "https://demos.telerik.com/kendo-ui/service/export"
          });
        });
      });
    </script>
```

## See Also

* [JavaScript API Reference: kendo.drawing.surface](/api/javascript/drawing/surface)
* [JavaScript API Reference: kendo.geometry.Transformation](/api/javascript/geometry/transformation)
