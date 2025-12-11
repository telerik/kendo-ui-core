---
title: Adding Fixed Width or Height to Label Section in Kendo UI for jQuery Chart
description: Learn how to customize the width or height of labels in the categoryAxis of Kendo UI for jQuery Chart by trimming the label text.
type: how-to
page_title: Customizing Label Width or Height in Kendo UI Chart CategoryAxis
meta_title: Customizing Label Width or Height in Kendo UI Chart CategoryAxis
slug: customizing-label-width-height-kendo-jquery-chart
tags: chart, kendo-ui-for-jquery, categoryaxis, labels, template
res_type: kb
components: ["chart"]
ticketid: 1640462
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
<td>
2025.2.702
</td>
</tr>
</tbody>
</table>

## Description

I want to set a fixed width or height for the labels in the categoryAxis of the [Kendo UI for jQuery Chart](/controls/charts/overview). If the label text exceeds the defined space, I want it truncated and displayed with ellipses.

This knowledge base article also answers the following questions:
- How to limit label text width in Kendo UI Chart categoryAxis?
- How to truncate label text in categoryAxis of Kendo UI Chart?
- How to customize label appearance in Kendo UI for jQuery Chart?

## Solution

To achieve this behavior, use the [`categoryAxis.labels.template`](/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels) configuration and implement a custom function to trim the label text.

1. Define the `categoryAxis.labels.template` property in the Kendo UI Chart configuration.
2. Use a JavaScript function to shorten the label text based on your requirements.

Here is an example:

```javascript
$("#chart").kendoChart({
  // Chart configuration
  categoryAxis: {
    // Category axis configuration
    labels: {
      template: "#= shortLabels(value)#" // Use the custom function
    }
  }
});

// Function to trim the label text
function shortLabels(value) {
  if (value.length > 5) { // Define the maximum length
    return value.substring(0, 5) + "..."; // Truncate and add ellipses
  }
  return value; // Return the original value if within limit
}
```

### Explanation:
- Use the `categoryAxis.labels.template` to define a custom rendering template.
- The `shortLabels` function checks the label length and truncates it if it exceeds the specified length.
- Append ellipses (`...`) to the truncated text to indicate the text was shortened.

For a runnable example, please refer to the Dojo below.

```dojo
 <div id="chart"></div>
    <script>
        $("#chart").kendoChart({
            title: {
                text: "Site Visitors Stats"
            },
            subtitle: {
                text: "/thousands/"
            },
            legend: {
                visible: false
            },
            seriesDefaults: {
                type: "bar"
            },
            series: [{
                name: "Total Visits",
                data: [56000, 63000, 74000, 91000, 117000, 138000]
            }, {
                name: "Unique visitors",
                data: [52000, 34000, 23000, 48000, 67000, 83000]
            }],
            valueAxis: {
                max: 140000,
                line: {
                    visible: false
                },
                minorGridLines: {
                    visible: true
                },
                labels: {
                    rotation: "auto"
                }
            },
            categoryAxis: {
                categories: ["January", "February", "March", "April", "May", "June"],
                majorGridLines: {
                    visible: false
                },
              	labels: {
       				template: "#= shortLabels(value)#"
    			}
            },
            tooltip: {
                visible: true,
                template: "#= series.name #: #= value #"
            }
        });

        function shortLabels(value) {
		   if (value.length >= 3) {
		      return value.substring(0, 3) + "..."; // Truncate and add ellipses;
		   }
		}
    </script>
```

## See Also
- [Kendo UI for jQuery Chart Documentation](/controls/charts/overview)
- [CategoryAxis Labels Configuration](/api/javascript/dataviz/ui/chart/configuration/categoryaxis.labels)
