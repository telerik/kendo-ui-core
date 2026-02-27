---
title: Displaying Additional Text on Tooltip in Kendo UI for jQuery Chart
description: Learn how to display the value and additional text fields on the tooltip for a Kendo UI for jQuery line chart.
type: how-to
page_title: How to Show Extra Text Fields in Kendo UI for jQuery Line Chart Tooltip
meta_title: How to Show Extra Text Fields in Kendo UI for jQuery Line Chart Tooltip
slug: tooltip-extra-text-jquery-chart
tags: tooltip,kendo-ui-for-jquery,line-chart,tooltip-template,custom-tooltip
res_type: kb
ticketid: 1707741
---

## Environment
<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery Tooltip,<br/>Kendo UI for jQuery Chart</td>
</tr>
<tr>
<td>Version</td>
<td>2026.1.212</td>
</tr>
</tbody>
</table>

## Description

I want to display additional text fields along with the value of the data points in the tooltip for my Kendo UI for jQuery line chart. For each data point, there are extra fields that should appear in the tooltip. How can I customize the tooltip to include this information?

This knowledge base article also answers the following questions:
- How to customize Kendo UI chart tooltip to show extra data fields.
- How to bind extra text fields to Kendo UI line chart tooltip.
- How to display multiple fields in Kendo UI for jQuery chart tooltip.

## Solution

To display additional text fields in the tooltip for a [Kendo UI for jQuery Tooltip](https://www.telerik.com/kendo-jquery-ui/documentation/controls/tooltip/overview) associated with the chart, use the [`tooltip.template`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/chart/configuration/tooltip#tooltiptemplate) option to customize the content. Ensure the chart data includes all the fields you want to display.

1. Define your chart data with the required fields.

```javascript
var chartData = [
  { category: "Jan", value: 10, extraText: "Info A", anotherField: "Detail 1" },
  { category: "Feb", value: 20, extraText: "Info B", anotherField: "Detail 2" },
  { category: "Mar", value: 15, extraText: "Info C", anotherField: "Detail 3" },
  { category: "Apr", value: 25, extraText: "Info D", anotherField: "Detail 4" }
];
```

2. Configure the chart and tooltip template to dynamically display the value and additional fields.

```javascript
$("#chart").kendoChart({
  title: {
    text: "Kendo UI Line Chart with Custom Tooltip"
  },
  dataSource: {
    data: chartData
  },
  series: [{
    type: "line",
    field: "value",
    categoryField: "category",
    name: "Sales"
  }],
  categoryAxis: {
    title: { text: "Month" }
  },
  valueAxis: {
    title: { text: "Value" }
  },
  tooltip: {
    visible: true,
    shared: false,
    template: function (e) {
      return "<strong>Month:</strong> " + e.category + "<br/>" +
             "<strong>Value:</strong> " + e.value + "<br/>" +
             "<strong>Extra Text:</strong> " + e.dataItem.extraText + "<br/>" +
             "<strong>Another Field:</strong> " + e.dataItem.anotherField;
    }
  }
});
```

3. Add an HTML container for the chart.

```html
<div id="chart"></div>
```

The tooltip will now display the value, `extraText`, and `anotherField` for each data point.

Below, you can observe a runnable example.

```dojo
 <div id="chart"></div>
    <script>
        $(document).ready(function () {

            // Sample data with extra fields
            var chartData = [
                { category: "Jan", value: 10, extraText: "Info A", anotherField: "Detail 1" },
                { category: "Feb", value: 20, extraText: "Info B", anotherField: "Detail 2" },
                { category: "Mar", value: 15, extraText: "Info C", anotherField: "Detail 3" },
                { category: "Apr", value: 25, extraText: "Info D", anotherField: "Detail 4" }
            ];

            $("#chart").kendoChart({
                title: {
                    text: "Kendo UI Line Chart with Custom Tooltip"
                },
                dataSource: {
                    data: chartData
                },
                series: [{
                    type: "line",
                    field: "value",
                    categoryField: "category",
                    name: "Sales"
                }],
                categoryAxis: {
                    title: { text: "Month" }
                },
                valueAxis: {
                    title: { text: "Value" }
                },
                tooltip: {
                    visible: true,
                    shared: false,
                    template: function (e) {
                        return "<strong>Month:</strong> " + e.category + "<br/>" +
                               "<strong>Value:</strong> " + e.value + "<br/>" +
                               "<strong>Extra Text:</strong> " + e.dataItem.extraText + "<br/>" +
                               "<strong>Another Field:</strong> " + e.dataItem.anotherField;
                    }
                }
            });

        });
    </script>
```

## See Also

- [Kendo UI for jQuery Tooltip Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/tooltip)
- [Kendo UI for jQuery Chart API Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/chart)
- [Kendo UI for jQuery Charts Overview Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/charts/overview)
