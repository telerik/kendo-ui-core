---
title: Displaying Value Axis Labels Including Zero in Kendo UI for jQuery Chart
description: Learn how to ensure the value axis labels in the Kendo UI for jQuery Chart include the value 0, even when displaying both negative and positive values.
type: how-to
page_title: How to Ensure Value Axis Labels Include Zero in Kendo UI for jQuery Chart
meta_title: How to Ensure Value Axis Labels Include Zero in Kendo UI for jQuery Chart
slug: ensure-value-axis-labels-include-zero-kendo-ui-jquery
tags: kendo-ui-for-jquery,chart,value-axis,labels,majorunit
res_type: kb
components: ["chart"]
ticketid: 1639809
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td> Kendo UI for jQuery Chart </td>
</tr>
<tr>
<td> Version </td>
<td> Current </td>
</tr>
</tbody>
</table>

## Description

I need the Kendo UI for jQuery [Chart](https://www.telerik.com/kendo-jquery-ui/documentation/controls/charts/overview) to display value axis labels that include the value 0. The chart should show both positive and negative values, and the value axis must always display the label for 0, regardless of the dataset. The issue occurs when the chart generates labels that exclude 0, even though the data spans both negative and positive values.

This knowledge base article also answers the following questions:
- How do I make sure the value axis labels in my Kendo UI Chart include 0?
- How can I control value axis labeling in Kendo UI for jQuery Chart?
- How to customize label rendering for the value axis in Kendo UI Chart?

## Solution

To ensure the label for 0 appears on the value axis, use the [`majorUnit`](/api/javascript/dataviz/ui/chart/configuration/valueaxis.majorunit#valueaxismajorunit) property and a custom `labels.template` function. Customize the template to check if the value is part of the series data or explicitly render the label for 0.

### Example Code

```javascript
valueAxis: {
    min: -11, // Set the minimum value for the axis
    max: 10,  // Set the maximum value for the axis
    majorUnit: 1, // Force labels to appear at every unit interval
    labels: {
        template: function(data) {
            var chartSeries = $("#chart").data("kendoChart").options.series; // Access chart series data
            
            if (data.value === 0) {
                return "0"; // Always show the label for 0
            }
            if (chartSeries[0].data.includes(data.value)) {
                return data.value; // Show labels for values that exist in the series data
            } else {
                return ""; // Exclude labels for values not in the series data
            }
        }
    }
}
```

### Key Steps
1. Set the `valueAxis.majorUnit` property to control the interval at which labels appear.
2. Use a custom `labels.template` function to conditionally render labels for specific values, including 0.
3. Reference the series data to ensure labels are only displayed for values present in the dataset.

### Demo

You can see an example in the next Dojo demo.

```dojo
<div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        valueAxis: {
          min: -11,
          max: 10,
          majorUnit: 1,
          labels: {
            template: function(data) {
              var chartSeries = $("#chart").data("kendoChart").options.series
              if(data.value === 0) {
                return "0"
              }
              if(chartSeries[0].data.includes(data.value)) {
                return data.value
              }
              else { return "" }
            }
          }
        },
        series: [
          { data: [1, 2, -10, 8, -5] }
        ]
      });
    </script>
```

## See Also

- [Value Axis Major Unit API Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/chart/configuration/valueaxis.majorunit#valueaxismajorunit)
- [Value Axis Labels Template API Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/chart/configuration/valueaxis.labels#valueaxislabelstemplate)
- [Kendo UI Chart Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/charts/overview)
