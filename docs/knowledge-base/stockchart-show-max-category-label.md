---
title: Show Maximum Value of categoryAxis.labels All the Time in Kendo UI StockChart
description: Learn how to display the maximum value of the catergoryAxis.label in the Kendo UI StockChart even when it is not in the selected range
type: how-to
page_title: Display the Maximum Value of X-Axis Label | Kendo UI StockChart
slug: stockchart-show-max-category-label
position: 
tags: stockchart, label, max, maximum, values, axis, navigation, selection, range
ticketid: 1451074
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2020.1.114</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Chart for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description
How can I show the maximum value of the categoryAxis.labels even when it is not in the selection range of the navigator?

## Solution
In order to show the maximum value of categoryAxis all the time, use the following custom approach using the [render](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/stock-chart/events/render) event and the [selectEnd](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/stock-chart/events/selectend) event:

```javascript
var stockChart = $("#stock-chart").kendoStockChart({
  chartArea: {
    margin: {
    right: 100,
    }
  },
  render: function (e) {
    var navSelectTo = stockChart.navigator.select().to;   // Get the select.to date
    var chart = e.sender;
    var group = new kendo.drawing.Group();

    if((navSelectTo.getDate()===1) && (navSelectTo.getMonth()===10) && (navSelectTo.getYear()===112)){   // Check if it's equal to the max date
      chart.surface.draw(group);
    }
    else {   // Draw the text and line if it's not equal to the max value
      var categoryAxis = chart.getAxis("category");
      var categoryRange = categoryAxis.range();
      var categorySlot = categoryAxis.slot(categoryRange.min, categoryRange.max);
      var categoryPos = [categorySlot.bottomRight().x + 10, categorySlot.origin.y+5];
      var label = new kendo.drawing.Text("Nov'12", categoryPos);
      var path = new kendo.drawing.Path({
        stroke: {
          color: "#000000",
          width: 1,
          opacity : 1
        }
      }).moveTo(categorySlot.bottomRight().x, categorySlot.origin.y).lineTo(categorySlot.bottomRight().x + 50, categorySlot.origin.y);

      group.append(label, path);
      chart.surface.draw(group);
    }
  },
  selectEnd: function(e) {
    stockChart.redraw();   // Redraw the chart when you change the selection
  }
}).data("kendoStockChart");
```
#### Example
```dojo
<div id="example">
  <div class="demo-section k-content wide">
    <div id="stock-chart"></div>
  </div>
  <script>
    var stockChart = $("#stock-chart").kendoStockChart({
      chartArea: {
        margin: {
          right: 100,
        }
      },

      dataSource: {
        transport: {
          read: {
            url: "https://demos.telerik.com/kendo-ui/content/dataviz/js/boeing-stock.json",
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
      dateField: "Date",
      categoryAxis: {
        name: "category",
        labels: {
          format: "{0: MMM'yy }"
        }
      },
      valueAxes: [{
        // Default axis
        line: {
          visible: false
        }
      }, {
        name: "volumeAxis",
        visible: false
      }],
      series: [{
        type: "column",
        field: "Volume",
        axis: "volumeAxis",
        tooltip: {
          format: "{0:C0}"
        },
      }],
      navigator: {
        series: {
          type: "area",
          field: "Close"
        },
        select: {
          from: "2009/02/05",
          to: "2011/10/07"
        }
      },
      render: function (e) {
        var navSelectTo = stockChart.navigator.select().to;   // Get the select.to date
        var chart = e.sender;
        var group = new kendo.drawing.Group();

        if ((navSelectTo.getDate() === 1) && (navSelectTo.getMonth() === 10) && (navSelectTo.getYear() === 112)) {   // Check if it's equal to the max date
          chart.surface.draw(group);
        }
        else {   // Draw the text and line if it's not equal to the max value

          var categoryAxis = chart.getAxis("category");
          var categoryRange = categoryAxis.range();
          var categorySlot = categoryAxis.slot(categoryRange.min, categoryRange.max);
          var categoryPos = [categorySlot.bottomRight().x + 10, categorySlot.origin.y + 5];
          var label = new kendo.drawing.Text("Nov'12", categoryPos);
          var path = new kendo.drawing.Path({
            stroke: {
              color: "#000000",
              width: 1,
              opacity: 1
            }
          }).moveTo(categorySlot.bottomRight().x, categorySlot.origin.y)
            .lineTo(categorySlot.bottomRight().x + 50, categorySlot.origin.y);

          group.append(label, path);
          chart.surface.draw(group);
        }

      },
      selectEnd: function (e) {
        stockChart.redraw();   // Redraw the chart when you change the selection
      }
    }).data("kendoStockChart");

  </script>
  <style>
    #stock-chart {
      height: 600px;
    }
  </style>
</div>
```


## See Also
- [render event](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/stock-chart/events/render)
- [selectEnd event](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/stock-chart/events/selectend)
