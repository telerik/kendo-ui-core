---
title: Making Bars in Kendo UI for jQuery Chart Visible with Long Labels
description: Learn how to ensure the bars in Kendo UI for jQuery Chart remain visible when long text labels are added.
type: how-to
page_title: Fixing Bar Visibility in Kendo UI for jQuery Chart with Long Labels
meta_title: Fixing Bar Visibility in Kendo UI for jQuery Chart with Long Labels
slug: fixing-bar-visibility-chart-long-labels
tags: chart, kendo-ui-jquery, labels, bar-visibility, chart-margins, text-truncate, multiline-labels
res_type: kb
ticketid: 1697218
---

## Environment
<table>
<tbody>
<tr>
<td> Product </td>
<td>
Chart for Kendo UI for jQuery
</td>
</tr>
<tr>
<td> Version </td>
<td> Current </td>
</tr>
</tbody>
</table>

## Description

When adding long text labels to a [Kendo UI for jQuery Chart](https://www.telerik.com/kendo-jquery-ui/documentation/controls/charts/overview), the chart area may compress, making the bars invisible. This happens because the chart adjusts to accommodate the labels, leaving insufficient space for the bars.

This knowledge base article also answers the following questions:
- How to adjust Kendo UI for jQuery Chart for long labels?
- How to make chart bars visible with long category text?
- How to handle label overflow in Kendo UI for jQuery Chart?

## Solution

### Adjust Chart Margins and Padding
Increase the chart area's margin to make space for long labels.

```javascript
$("." + "@strChartName").kendoChart({
    // ... existing configuration ...
    chartArea: {
        margin: {
            bottom: 150 // Adjust bottom margin
        }
    },
    // ... rest of configuration ...
});
```

### Increase Overall Chart Height
Modify the chart container's height to accommodate both labels and bars.

```javascript
$(document).ready(function () {
   createChart();
   $("." + "@strChartName").css({
       "width": "1000px",
       "height": "600px" // Increase height
   }).data("kendoChart").resize();
});
```

### Use Multi-line Labels with Word Wrap
Split long labels into multiple lines for better visibility.

```javascript
$("." + "@strChartName").kendoChart({
    // ... existing configuration ...
    categoryAxis: [{
        categories: columnNames_1,
        labels: {
            rotation: 0, // Remove rotation
            template: function(e) {
                var words = e.value.split(' ');
                var lines = [];
                var currentLine = '';
                
                for (var i = 0; i < words.length; i++) {
                    if ((currentLine + words[i]).length > 15) {
                        lines.push(currentLine);
                        currentLine = words[i] + ' ';
                    } else {
                        currentLine += words[i] + ' ';
                    }
                }
                lines.push(currentLine);
                
                return lines.join('<br/>');
            },
            font: "11px Roboto, Arial, sans-serif" // Adjust font size
        }
    }],
    // ... rest of configuration ...
});
```

### Truncate Long Labels with Ellipsis
Shorten labels by truncating text and adding ellipsis.

```javascript
$("." + "@strChartName").kendoChart({
    // ... existing configuration ...
    categoryAxis: [{
        categories: columnNames_1,
        labels: {
            rotation: 270,
            template: function(e) {
                return e.value.length > 20 ? e.value.substring(0, 17) + '...' : e.value;
            },
            font: "13px Roboto, Arial, sans-serif" // Adjust font size
        }
    }],
    // ... rest of configuration ...
});
```

Apply these solutions based on your layout requirements and data structure.

## See Also

- [Kendo UI for jQuery Chart Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/charts/overview)
- [Handling Axis Labels in Kendo Chart](https://www.telerik.com/kendo-jquery-ui/documentation/knowledge-base/show-axis-labels-in-two-rows)
- [Category Axis Configuration](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/chart/configuration/categoryaxis)
