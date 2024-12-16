---
title: Using Icons as Markers in Kendo UI for jQuery Chart Line Series
description: Learn how to use font icons from the iconography as series markers in a Kendo UI for jQuery Chart line series.
type: how-to
page_title: How to Use Icons as Markers in Chart Line Series with Kendo UI for jQuery
slug: how-to-use-icons-as-markers-in-kendo-ui-for-jquery-chart
tags: kendo-ui-for-jquery, chart, markers, icons, visualization
res_type: kb
ticketid: 1667208
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery Chart</td>
</tr>
<tr>
<td>Version</td>
<td>2024.4.1112</td>
</tr>
</tbody>
</table>

## Description

I am working with a Kendo UI for jQuery Chart and want to enhance its appearance by using icons from the iconography as markers for the line series. Is it possible to use font icons as series markers in a line chart?

This knowledge base article also answers the following questions:
- How can I customize markers in a Kendo UI for jQuery Chart line series?
- Is it possible to use [`icons from the iconography`](https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/) as series markers in charts?
- How do I implement font icons as series markers in a Kendo UI for jQuery Chart?

## Solution

To use icons as markers in a line series of a Kendo UI Chart, you need to customize the series markers by implementing a visual function. The visual function allows for the creation of custom visuals for the markers, including the use of font icons from the iconography.

First, ensure you have access to the iconography you want to use. If you're using font icons, include the font icon stylesheet in your project.

Then, follow these steps to implement font icons as series markers:

1. For the series that you want to customize the markers for, add a [`markers`]((https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.markers)) configuration object.

2. Inside the [`markers`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.markers) configuration, specify a [`visual`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.markers.visual) function. This function will be used to create custom visuals for the markers.

3. In the [`visual`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/series.markers.visual) function, create and return a visual element (e.g., a `Path` or `Text` element) that represents the icon. You can set the content of the `Text` element to be the character code of the icon if using font icons.

Here's an example of how to define the `visual` function to use a font icon as a marker in a series:

```dojo
<link rel="stylesheet" href="https://unpkg.com/@progress/kendo-font-icons/dist/index.css"/>
      <div class="demo-section wide">
        <div id="chart"></div>
      </div>
      <script>
        function createChart() {
          $("#chart").kendoChart({
            title: {
              text: "Gross domestic product growth /GDP annual %/"
            },
            legend: {
              position: "top"
            },
            seriesDefaults: {
              type: "line",
              style: "smooth",
              markers: {
                visual: function (e) {
                  e.rect.origin.y = e.rect.origin.y - 15;
                  e.rect.origin.x = e.rect.origin.x + 5;
                  var rect = new kendo.geometry.Rect(e.rect.origin, [e.rect.size.width, 100]);
                  var layout = new kendo.drawing.Layout(rect, {
                    orientation: "vertical",
                    alignContent: "end"
                  });

                  var icon = new kendo.drawing.Text(String.fromCharCode(0xe702), [0, 0], {
                    fill: {
                      color: "#888"
                    },
                    font: "20px WebComponentsIcons",
                    tooltip:{
                      content:"Click Legend items to show more info."
                    }
                  });

                  layout.append(icon);
                  layout.reflow()

                  return layout;
                }
              },
            },
            series: [
              {
                name: "India",
                data: [3.907, , 4.848, 4.4, null, null, null, null, null]
              }, {
                name: "Russian Federation",
                data: [null, null, null, 4.4, 5.3, 5.8, 6.1, 6.1]
              }, {
                name: "Germany",
                data: [null, null, null, 4.4, 3.690, 3.7, 3.9, 4.2]
              },
              {
                name: "UK",
                data: [null, null, null, 4.4, 5.190, 5.3, 5.4, 5.0]
              }],
            valueAxis: {
              labels: {
                format: "{0}%"
              },
              line: {
                visible: false
              },
              axisCrossingValue: 0
            },
            categoryAxis: {
              categories: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
              line: {
                visible: false
              },
              labels: {
                position: 'start'
              }
            },
            tooltip: {
              visible: true,
              format: "{0}%",
              template: "#= series.name #: #= value #"
            }
          });
        }

        $(document).ready(createChart);
        $(document).bind("kendo:skinChange", createChart);
      </script>
```

## See Also

- [Kendo UI for jQuery Chart - Overview](https://docs.telerik.com/kendo-ui/controls/charts/overview)
- [Kendo UI Chart API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart)
- [Telerik Design System - Iconography](https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/)
