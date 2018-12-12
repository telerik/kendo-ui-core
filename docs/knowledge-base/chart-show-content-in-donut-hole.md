---
title: Show Text in the Center of a Donut Chart
description: An example on how to show custom content centered in the Donut Chart.
type: how-to
page_title: Render Content Inside the Center of the Donut Chart | Kendo UI Charts
slug: chart-show-content-in-donut-hole
tags: chart, donut, drawing
ticketid: 1338927
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2018.2.620</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Chart</td>
	</tr>
</table>


## Description

How can I place and center multiple lines of text inside the center of a Kendo UI Donut Chart?

## Solution

Make a custom drawing on top of the Donut Chart and show the multi-line text and other content in its center.

1. Use the [`series.visual`](/api/javascript/dataviz/ui/chart/configuration/series.visual) function to store the position and size of the Donut Chart center.

    ```
    // global variables
    var center,
    radius;

    ........

    series: [{
        type: "donut",
        field: "share",
        categoryField: "kind",
        visual: function(e){
            // Obtain parameters for the segments
            center = e.center;
            radius = e.innerRadius;

            // Create default visual
            return e.createVisual();
        }
    }]

    ```

1. In the [`render`](/api/javascript/dataviz/ui/chart/events/render) event of the Chart, draw your custom content on top of the Chart by using the [Kendo UI Drawing library](/framework/drawing/overview).

    ```
            render: function(e){
              var circleGeometry = new kendo.geometry.Circle(center, radius);
              var bbox = circleGeometry.bbox();

              // Render the text
              //
              // https://docs.telerik.com/kendo-ui/api/javascript/drawing/text
              var heading = new kendo.drawing.Text('45.2%', [0, 0], {
                font: '22px Verdana,Arial,sans-serif'
              });

              var line1 = new kendo.drawing.Text('of which', [0, 0], {
                font: '12px Verdana,Arial,sans-serif'
              });

              var line2 = new kendo.drawing.Text('renewables', [0, 0], {
                font: '14px Verdana,Arial,sans-serif',
                fill: {
                  color: 'green'
                }
              });

              // Reflow the text in the bounding box
              //
              // https://docs.telerik.com/kendo-ui/api/javascript/drawing/layout
              var layout = new kendo.drawing.Layout(bbox, {
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                spacing: 5
              });

              layout.append(heading, line1, line2);
              layout.reflow();

              // Draw it on the Chart drawing surface
              //
              // https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/fields/surface
              e.sender.surface.draw(layout);
            }
    ```

The following example demonstrates how to render three differently styled lines of text in the center of the Donut Chart.

```dojo
    <div id="chart"></div>
    <script>
      function createChart() {
        var center,
            radius;

        $("#chart").kendoChart({
          title: {
            text: "What is you favourite sport?"
          },
          legend: {
            position: "top"
          },
          dataSource: {
            data: [{
              kind: 'Hydroelectric', share: 0.175
            }, {
              kind: 'Nuclear', share: 0.238
            }, {
              kind: 'Coal', share: 0.118
            }, {
              kind: 'Solar', share: 0.052
            }, {
              kind: 'Wind', share: 0.225
            }, {
              kind: 'Other', share: 0.192
            }]
          },
          seriesDefaults: {
            labels: {
              template: "#= category # - #= kendo.format('{0:P}', percentage)#",
              position: "outsideEnd",
              visible: true,
              background: "transparent"
            }
          },
          series: [{
            type: "donut",
            field: "share",
            categoryField: "kind",
            visual: function(e){
              // Obtain parameters for the segments
              center = e.center;
              radius = e.innerRadius;

              // Create default visual
              return e.createVisual();
            }
          }],
          tooltip: {
            visible: true,
            template: "#= category # - #= kendo.format('{0:P}', percentage) #"
          },
          render: function(e){
            var circleGeometry = new kendo.geometry.Circle(center, radius);
            var bbox = circleGeometry.bbox();

            // Render the text
            //
            // https://docs.telerik.com/kendo-ui/api/javascript/drawing/text
            var heading = new kendo.drawing.Text('45.2%', [0, 0], {
              font: '22px Verdana,Arial,sans-serif'
            });

            var line1 = new kendo.drawing.Text('of which', [0, 0], {
              font: '12px Verdana,Arial,sans-serif'
            });

            var line2 = new kendo.drawing.Text('renewables', [0, 0], {
              font: '14px Verdana,Arial,sans-serif',
              fill: {
                color: 'green'
              }
            });

            // Reflow the text in the bounding box
            //
            // https://docs.telerik.com/kendo-ui/api/javascript/drawing/layout
            var layout = new kendo.drawing.Layout(bbox, {
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              spacing: 5
            });

            layout.append(heading, line1, line2);
            layout.reflow();

            // Draw it on the Chart drawing surface
            //
            // https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/fields/surface
            e.sender.surface.draw(layout);
          }
        });
      }

      $(document).ready(function() {
        createChart();
      });
    </script>
```

## See Also

* [Kendo UI Drawing API Reference](/api/javascript/drawing/text)
