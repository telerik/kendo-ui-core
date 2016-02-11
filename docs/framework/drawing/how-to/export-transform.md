---
title: Apply Transformations During Export
page_title: Apply Transformations During Export | Kendo UI Drawing API
description: "Learn how to transform the content during export while applying the Kendo UI Drawing API."
slug: howto_applytransformationsduringexport_drawingapi
---

# Apply Transformations During Export

The example below demonstrates how to apply geometric transformations during export while applying the Kendo UI Drawing API.

The aim of the example is to produce a PNG image of a section of the page at 4x the original resolution. This is done by applying an uniform 2x scale on the X and Y dimensions. The operation is carried out while the content is still represented in a vector form. No loss of quality occurs.

For more information, refer to the [Transformation API article](/api/javascript/geometry/transformation#methods-scale).

###### Example

```html
    <button class='export-img k-button'>Export as Image</button>
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
            proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
          });
        });
      });
    </script>
</script>
```

## See Also

Other articles and how-to examples on Kendo UI Drawing API:

* [JavaScript API Reference: kendo.drawing.surface](/api/javascript/drawing/surface)
* [JavaScript API Reference: kendo.geometry.Transformation](/api/javascript/geometry/transformation)
* [PDF Options JavaScript API Reference](/api/javascript/drawing/pdfoptions)
* [Overview of the Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Embed Font Awesome in Exported PDF]({% slug howto_embedfontawesome_inexportedpdf_drawingapi %})
* [How to Implement Free-Form Drawing]({% slug howto_embedfontawesome_inexportedpdf_drawingapi %})
