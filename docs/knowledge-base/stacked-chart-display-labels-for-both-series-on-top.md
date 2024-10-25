---
title: Display Series Labels above the Bars in Stacked Bar Charts
description: Learn how to show both series labels in the Kendo UI for jQuery Stacked Bar Chart above its bars.
type: how-to
page_title: Show Series Labels above the Bars in Stacked Charts - Kendo UI Chart for jQuery
slug: stached-chart-labels-above-series-bars
tags: kendo, jquery, chart, series, labels, stacked, above
ticketid: 1596023
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® for jQuery Chart</td>
 </tr>
</table>

## Description

How can I display series labels above the bars in the Stacked Bar Chart component?

## Solution

To achieve the desired scenario, utilize the [`series.labels.visual`](/api/javascript/dataviz/ui/chart/configuration/series.labels.visual) property for the secondly declared series. Obtain the data from both series and render it by using the [Kendo UI Drawing graphics library (Drawing API)]({% slug overview_kendoui_drawingapi %}).


```dojo
      <div id="chart"></div>
    <script>
      var index = 0,
          goldData=[];
      $("#chart").kendoChart({
        legend: {
          visible: false
        },
        seriesDefaults: {
          type: "bar",
          stack: true
        },
        series: [{
          name: "Gold Medals",
          data: [40, 32, 34, 36, 45, 33, 34, 83, 36, 37, 44, 37, 35, 36, 46],
          color: "#f3ac32",
        }, {
          name: "Silver Medals",
          data: [19, 25, 21, 26, 28, 31, 35, 60, 31, 34, 32, 24, 40, 38, 29],
          color: "#b8b8b8",
          labels: {
            visible: true,
            visual: function(e) {
              if(e.sender) {
                let goldDataLength = e.sender.options.series[0].data.length;
                if(index < goldDataLength) {
                  //obtain the Gold Medals data from the chart options
                  var goldSeries = e.sender.options.series[0];
                  var goldText = goldSeries.data[index];
                  goldData.push(goldText);
                  index++;
                } else {
                  goldText = goldData[index-goldDataLength];
                  index++;
                }
              }

              var center = e.rect.center();
              // https://docs.telerik.com/kendo-ui/api/javascript/drawing/text
              return new kendo.drawing.Text(goldText + "/" + e.text, [center.x, e.rect.origin.y], {
                fill: {
                  color: "black"
                }
              });
            }
          }
        }],
        categoryAxis: {
          categories: [1952, 1956, 1960, 1964, 1968, 1972, 1976, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012]
        }
      });
    </script>
```

## See Also

* [JavaScript API Reference of the jQuery Chart](/api/javascript/ui/chart)
* [jQuery Bar Charts Stacked Bars Demo](https://demos.telerik.com/kendo-ui/bar-charts/stacked-bar)
