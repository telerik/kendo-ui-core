---
title: Displaying a Year's Data in a Chart Zoomed to the Last 30 Days
description: Learn how to present a chart with 365 days of data initially zoomed to show only the last 30 days using Kendo UI Chart.
type: how-to
page_title: How to Zoom into the Last 30 Days on a Kendo UI Chart
slug: how-to-display-chart-data-zoomed-to-last-30-days
tags: kendo ui, chart, zoom, categoryaxis, date, data visualization
res_type: kb
ticketid: 1627452
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>
Chart for Progress® Kendo UI®, <br />
</td>
</tr>
<tr>
<td>Version</td>
<td>2024.3.1015</td>
</tr>
</tbody>
</table>

## Description

I need to display a chart with 365 days of data but want it zoomed by default to only show the last 30 days. This KB article also answers the following questions:
- How to set the initial zoom level of a Kendo UI Chart?
- How to display a specific date range in a Kendo UI Chart by default?
- How to configure the category axis of a Kendo UI Chart for specific date ranges?

## Solution

To display a chart with 365 days of data initially zoomed to the last 30 days, configure the [`categoryAxis.min`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.min) and [`categoryAxis.max`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.max) options. These options control the initial zoom level by setting the visible date range on the chart. Here's how to set it up:

1. Define the `categoryAxis` with a [`type`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration/categoryaxis.type) of `"date"`.
2. Set the `min` and `max` properties to define the visible date range. For example, to zoom in on December 1st to 31st, 2023:

```javascript
categoryAxis: {
    type: "date",
    min: new Date(2023, 11, 1), // December 1, 2023
    max: new Date(2023, 11, 31) // December 31, 2023
},
```

This configuration zooms the chart to display only the specified date range, while still allowing users to zoom in and out within the full 365 days of data. 

If you need a more interactive approach, consider using the [Stock Chart](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/stockchart) with the Navigator enabled. This allows users to see that the chart displays a specific period and provides a visual way to adjust the zoom level.

For an example of how to configure the `categoryAxis.min` and `max`, refer to next Dojo demo.

```dojo
<div id="example">
<div class="box wide">
<p>Use SHIFT + Mouse Drag Region Selection combination on mouse-enabled devices to zoom in data for a specific period of time</p>

</div>
    <div class="demo-section k-content wide">
        <div id="chart"></div>
    </div>
    <script>
        // Sample data
        var data = [];
        for (var i = 0; i <= 365; i++) {
          var val = Math.round(Math.random() * 10);
          var firstDate = new Date(2023, 0, 1)
          data.push({
            category: firstDate.setDate(firstDate.getDate() + i),
            value: val
          });
        }

        function createChart() {
            $("#chart").kendoChart({
                dataSource: {
                    data: data
                },
                categoryAxis: {
                  type: "date",
                    min: new Date(2023, 11, 1),
                    max: new Date(2023, 11, 32),
                    labels: {
                        rotation: "auto"
                    }
                },
                series: [{
                    type: "column",
                    field: "value",
                    categoryField: "category"
                }],
                pannable: {
                    lock: "y"
                },
                zoomable: {
                    mousewheel: {
                        lock: "y"
                    },
                    selection: {
                        lock: "y"
                    }
                }
            });
        }

        $(document).ready(createChart);
        $("#example").bind("kendo:skinChange", createChart);
    </script>
</div>
```

For an interactive example using the [`Stock Chart`](https://docs.telerik.com/kendo-ui/controls/charts/stockchart/overview) and Navigator, see the following Dojo demo.

```dojo
   <div id="example">
      <div class="demo-section k-content wide">
        <div id="stock-chart"></div>
      </div>
      <script>
        function createChart() {
          $("#stock-chart").kendoStockChart({
            dataSource: {
              transport: {
                read: {
                  url: "../content/dataviz/js/boeing-stock.json",
                  dataType: "json"
                }
              },
              schema: {
                model: {
                  fields: {
                    Date: { type: "date" }
                  }
                }
              }
            },
            title: {
              text: "The Boeing Company\nNYSE:BA"
            },
            dateField: "Date",
            panes: [{
              name: "volumePane",
              title: "Volume",
              height: 150 // pixels
            }],
            categoryAxis: {
              baseUnit: "days",
              pane: "volumePane",
              labels: {
                rotation: {
                  angle: 45
                },
                step: 7
              }
            },
            valueAxes: [{
              // Default axis
              line: {
                visible: false
              }
            }, {
              name: "volumeAxis",
              pane: "volumePane",
              visible: false
            }],
            series: [{
              type: "column",
              field: "Volume",
              axis: "volumeAxis",
              tooltip: {
                format: "{0:C0}"
              }
            }],
            navigator: {
              series: {
                type: "area",
                field: "Close"
              },
              select: {
                from: "2011/12/01",
                to: "2011/12/31"
              },
              categoryAxis: {
                max: "2011/12/31",
                min: "2011/01/01"
              }
            }
          });
        }
        $(document).ready(createChart);
        $(document).bind("kendo:skinChange", createChart);
      </script>
    </div>
```

## See Also

- [Chart Configuration - API ](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/configuration.)
- [Overview of the Chart Component](https://docs.telerik.com/kendo-ui/controls/charts/chart/overview)
- [Overview of the Stock Chart Component](https://docs.telerik.com/kendo-ui/controls/charts/stockchart/overview)
