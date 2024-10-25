---
title:  Display Image in Chart CategoryAxis Label
page_title: Display Image in Chart CategoryAxis Label - Kendo UI for jQuery Chart
description: "Learn how to display an image in the categoryAxis label of the Kendo UI Chart for jQuery."
slug: display-image-in-chart-categoryaxis-label
tags: chart, image, categoryaxis, label
component: chart
type: how-to
ticketid: 1625008
res_type: kb
---

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Chart for jQuery</td>
 </tr>
</table>

## Description

How can I display an image in the categoryAxis label of the Chart?

## Solution

* You may use the [`labels.visual`](/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryaxislabelsvisual) function of the Chart categoryAxis. In this function, you can create a [`kendo.geometry.Rect`](/api/javascript/geometry/rect) instance, and then use [`kendo.drawing.Image`](/api/javascript/drawing/image) to draw a bitmap image with a given source URL into the configured rectangle.

The following example demonstrates how to achieve the desired scenario: 
```dojo
<div id="chart"></div>
<script>
    $("#chart").kendoChart({
        series: [
            { 
            field: "value",
            type: "bar"
            },
        ],
        dataSource: [
            { year: "Diego", value: 1, img: 'https://demos.telerik.com/kendo-ui/content/dataviz/diagram/people/diego.jpg' },
            { year: "Elie", value: 3, img: 'https://demos.telerik.com/kendo-ui/content/dataviz/diagram/people/elizabeth.jpg' },
            { year: "Daniel", value: 4, img: 'https://demos.telerik.com/kendo-ui/content/dataviz/diagram/people/daniel.jpg' }
        ],
        categoryAxis: {
            field: "year",
            labels: {
                visual: function(e) {
                    var rect = new kendo.geometry.Rect(e.rect.origin, [e.rect.size.width, 100]);
                    var layout = new kendo.drawing.Layout(rect, {
                    orientation: "vertical",
                    alignContent: "center"
                    });
                    
                    layout.append(new kendo.drawing.Text(e.dataItem.year));
                    var imageRect = new kendo.geometry.Rect(
                    new kendo.geometry.Point(5, 5),
                    new kendo.geometry.Size(50, 50)
                    );
                    // Create the image. Uses a URL to create a bitmap image.             
                    var imageUrl = e.dataItem.img;
                    var image = new kendo.drawing.Image(imageUrl, imageRect);

                    layout.append(image)
                    layout.reflow();
                    return layout;
                }
            }
        }
    });
</script>
```

## See Also
* [Kendo UI for jQuery Chart Overview (Demo)](/charts/index)
* [JavaScript API Reference of the Chart](/api/javascript/ui/chart)