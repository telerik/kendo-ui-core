---
title: Left Align Bar Chart Category Axis Labels
description: An example demonstrating how to align the Category Axis labels of a Kendo UI Bar Chart
type: how-to
page_title: Align Category Axis(Y) Labels on Bar Chart | Kendo UI Chart
slug: chart-left-align-bar-label-y-axis
tags: chart, left, align, bar, label, y, axis
ticketid: 1407464
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Chart for Progress® Kendo UI®</td>
 </tr>

  <td>Product Version</td>
  <td>2019.1.220</td>
 </tr>
</table>

## Description

How can I align the Kendo UI Bar Chart's category axis labels to the left?

## Solution

Using the Kendo UI Drawing API, you can customize the appearance of the labels in your Kendo UI Bar Chart. Here is one approach that can be adjusted to your preferences:

  1. Create a new function within the [categoryAxis.labels.visual configuration](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryaxislabelsvisual).
  1. Initialize a new [kendo.drawing.Group object](https://docs.telerik.com/kendo-ui/api/javascript/drawing/group).
  1. Set the appearance of the label with the [kendo.drawing.Text](https://docs.telerik.com/kendo-ui/api/javascript/drawing/text) element. 
  1. [Configure the rectangle](https://docs.telerik.com/kendo-ui/api/javascript/geometry/rect) which will hold the text.
  1. [Use the kendo.drawing.align method](https://docs.telerik.com/kendo-ui/api/javascript/drawing/methods/align) to set the alignment within the rectangle.
  1. [Append the elements together within the group](https://docs.telerik.com/kendo-ui/api/javascript/drawing/group/methods/append), and return the results.

```javascript
          labels: {
            visual: function(e){  //1
              var group = new kendo.drawing.Group();  //2

              var text = new kendo.drawing.Text(e.value, e.rect.origin, { font: "Verdana; font-weight: bold;" });  //3
              var rect = new kendo.geometry.Rect(e.rect.origin, [60, 20]);  //4
              kendo.drawing.align([text], rect, "start");  //5

              group.append(new kendo.drawing.Rect(rect, { fill: null, stroke: null}), text);  //6
              return group;
            }
          },
        },
```

```dojo
    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        seriesDefaults: {
          type: "bar"
        },
        series: [{
          data: [
            20, 10, 5
          ],
        }],		
        categoryAxis: {
          labels: {
            visual: function(e){
              var group = new kendo.drawing.Group();

              var text = new kendo.drawing.Text(e.value, e.rect.origin, { font: "Verdana; font-weight: bold;" });
              var rect = new kendo.geometry.Rect(e.rect.origin, [60, 20]);
              kendo.drawing.align([text], rect, "start");

              group.append(new kendo.drawing.Rect(rect, { fill: null, stroke: null}), text);
              return group;
            }
          },
          categories: ["First", "Second", "Third"]
        }
      });
    </script>
```

## See Also

* [categoryAxis.labels.visual - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryaxislabelsvisual)
* [kendo.drawing.Group - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/drawing/group)
* [kendo.drawing.Text - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/drawing/text)
* [kendo.geometry.Rect - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/geometry/rect)
* [align - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/drawing/methods/align) 
* [append - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/drawing/group/methods/append) 
