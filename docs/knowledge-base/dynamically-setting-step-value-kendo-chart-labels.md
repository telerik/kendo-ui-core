---
title: Calculating Optimal Step Value for Kendo UI for jQuery Chart Labels
description: Learn how to dynamically calculate the step value for categoryAxis labels in Kendo UI for jQuery Chart to avoid overlap.
type: how-to
page_title: Dynamically Setting Step Value for Kendo Chart Labels
meta_title: Dynamically Setting Step Value for Kendo Chart Labels
slug: dynamically-setting-step-value-kendo-chart-labels
tags: kendo ui for jquery, chart, labels, step, configuration, dynamic calculation
res_type: kb
ticketid: 1707847
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>
Kendo UI for jQuery Chart
</td>
</tr>
<tr>
<td> Version </td>
<td> 2025.4.1217 </td>
</tr>
</tbody>
</table>

## Description

I am using the [Kendo UI for jQuery Chart](https://www.telerik.com/kendo-jquery-ui/documentation/controls/charts/overview) and need to dynamically calculate the step value for the categoryAxis labels to avoid label overlap. The configuration options for [`labels.skip`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryaxislabelsskip) and [`labels.step`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryaxislabelsstep) require fixed values and do not auto-adjust based on the available space. I want to achieve an automatic adjustment of the step value based on the chart's width and the label size.

This knowledge base article also answers the following questions:
- How to prevent label overlap in Kendo UI for jQuery Chart?
- How to calculate step dynamically for Kendo Chart labels?
- How to set step value for categoryAxis labels based on chart width?

## Solution

To dynamically calculate the step value for categoryAxis labels, follow these steps:

1. Measure the chart's width and determine the number of categories.
2. Estimate the minimum label width required to avoid overlap. This depends on your font size and label length.
3. Calculate the maximum number of labels that can fit within the chart width.
4. Set the [`labels.step`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels#categoryaxislabelsstep) value programmatically based on the calculated number of labels.

Here is a runnable example:

```dojo
<div id="chart"></div>
    <script>
      function calcStep() {
        var chart = $("#chart").data("kendoChart");
        var chartWidth = $("#chart").width();
        var categoriesCount = chart.options.categoryAxis.categories.length;

        // Adjust this value based on your label font and length
        var minLabelWidth = 60;

        var maxLabels = Math.floor(chartWidth / minLabelWidth);
        var stepValue = Math.max(0, Math.ceil(categoriesCount / maxLabels) - 1);

        chart.setOptions({
          categoryAxis: {
            labels: {
              step: stepValue,
            },
          },
        });
      }
      let categories = [];
      let data = [];
      for (var i = 0; i <= 100; i++) {
        const randomNumber = Math.floor(Math.random() * 1000) + 1;
        categories.push("Cat " + i);
        data.push(randomNumber);
      }

      $("#chart").kendoChart({
        categoryAxis: {
          categories: categories,
          title: {
            text: "Quarters",
          },
        },
        series: [{ data: data }],
      });

      calcStep()

      $(window).resize(function(){
        calcStep()
      })
    </script>
```

### Key Notes:
- `minLabelWidth` should be fine-tuned based on your label font size and content.
- Ensure the `chart.setOptions` method is used to apply the calculated step value.

## See Also

- [Kendo UI for jQuery Chart Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/charts/overview)
- [Chart API Reference](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/chart)
