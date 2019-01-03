---
title: Create Zoom Shortcuts in StockChart
description: An example on how to show buttons that will navigate the StockChart to different time periods.
type: how-to
page_title: Navigate to Pre-Defined Periods | Kendo UI Charts
slug: stock-chart-navigate-to-predefined-periods
tags: stock-chart, zoom, navigate
ticketid: 1364958
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Chart</td>
 </tr>
</table>

## Description

How can I create multiple zoom shortcuts for a StockChart&mdash;for example, 3 months, 6 months, 1 year, 5 years, and **All**.

## Solution

1. Declare a ButtonGroup to display the `zoom` options.
1. Handle the [`select`](/api/javascript/ui/buttongroup/events/select) event of the ButtonGroup.
1. When the user selects a ButtonGroup option, change the StockChart navigator range to reflect the selected period.

The following example demonstrates how to implement the suggested approach. 

``` dojo

    <div id="example">
      <div id="select-period">
        <span>
          3M
        </span>
        <span>
          6M
        </span>
        <span>
          1Y
        </span>
        <span>
          5Y
        </span>
        <span>
          ALL
        </span>
      </div>
      <div id="stock-chart"></div>
    </div>
    <script>

      var maxValue;
      var minValue;
      function createChart() {
        $("#select-period").kendoButtonGroup({
          index: 4,
          select: function(e){
            var index = this.current().index();
            var chart = $("#stock-chart").data("kendoStockChart");
            if(chart){
              var fromDateTime = new Date(maxValue.getTime());
              // Based on the selected button, apply a different minimum value to the navigator selection.
              switch(index){
                case 0:
                  // 3 months prior to the current max date
                  fromDateTime.setMonth(fromDateTime.getMonth() - 3);
                  chart.navigator.options.select.from = fromDateTime;
                  break;
                case 1:
                  // 6 months prior to the current max date
                  fromDateTime.setMonth(fromDateTime.getMonth() - 6);
                  chart.navigator.options.select.from = fromDateTime;
                  break;
                case 2:
                  // 1 year prior to the current max date
                  fromDateTime.setFullYear( fromDateTime.getFullYear() - 1 );
                  chart.navigator.options.select.from = fromDateTime;
                  break;
                case 3:
                  // 5 years prior to the current max date
                  fromDateTime.setFullYear( fromDateTime.getFullYear() - 5 );
                  chart.navigator.options.select.from = fromDateTime;
                  break;
                case 4:
                  // select the entire navigator range
                  chart.navigator.options.select.from = minValue;
                  break;
              }
              // Refresh the Chart to apply the new navigator selection.
              chart.refresh();
            }
          }
        });
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
            },
            // Declare aggregates to get the StockChart min and max Date value.
            aggregate: [
              { field: "Date", aggregate: "min"},
              { field: "Date", aggregate: "max"}
            ]
          },
          title: {
            text: "The Boeing Company\nNYSE:BA"
          },
          dateField: "Date",
          series: [{
            type: "candlestick",
            openField: "Open",
            highField: "High",
            lowField: "Low",
            closeField: "Close"
          }],
          categoryAxis: {
            name: "categoryAxis",
            labels: {
              rotation: "auto"
            }
          },
          navigator: {
            series: {
              type: "area",
              field: "Close"
            },
            categoryAxis: {
              labels: {
                rotation: "auto"
              }
            }
          }
        });
        $("#stock-chart").data("kendoStockChart").one("dataBound", function(e){
          // Store the min and max Date values in the StockChart data.
          var aggregates = e.sender.dataSource.aggregates().Date;
          minValue = aggregates.min;
          maxValue = aggregates.max;
        });
      }

      $(document).ready(createChart);
    </script>
```
