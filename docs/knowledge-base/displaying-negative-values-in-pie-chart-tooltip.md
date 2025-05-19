---
title: Displaying Negative Values in Pie Chart Tooltip
description: Learn how to display negative values in tooltips for Pie Charts in Progress® Kendo UI for jQuery.
type: how-to
page_title: How to Show Negative Values in Pie Chart Tooltips
slug: displaying-negative-values-in-pie-chart-tooltip
tags: chart,pie-chart,tooltip,template,negative-values
res_type: kb
ticketid: 1687022
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>
Chart for Progress® Kendo UI®
</td>
</tr>
<tr>
<td>Version</td>
<td>2025.1.211</td>
</tr>
</tbody>
</table>

## Description

Pie charts are typically designed to represent positive values as percentages of a whole. However, in some cases, negative values may appear in the data set. By default, the Kendo UI Pie Chart converts negative values to positive ones for tooltip display. This behavior can be overridden to show the original negative values in the tooltip or to omit negative values entirely.

This knowledge base article also answers the following questions:
- How to display negative values in Pie Chart tooltips?
- Can negative values be omitted from Pie Chart tooltips?
- How to customize the tooltip display for Pie Charts in Kendo UI?

## Solution

To display the original negative values in the tooltips for Kendo UI Pie Charts, use the [`template`](/api/javascript/dataviz/ui/chart/configuration/tooltip#tooltiptemplate) option of the tooltip configuration. This allows direct access to the `dataItem` value, bypassing the default conversion to positive values.

### Displaying Negative Values in Tooltips

Use the following configuration for the tooltip:

```javascript
tooltip: {
    visible: true,
    template: function (e) {
        return e.dataItem.value; // Displays the original value
    },
},
```


### Example

```dojo
    <div id="example">
      <div class="demo-section wide">
        <div
          id="chart"
          style="
            background: center no-repeat
              url(&quot;https://demos.telerik.com/kendo-ui/content/shared/styles/world-map.png&quot;);
          "
        ></div>
      </div>
      <script>
        function createChart() {
          $("#chart").kendoChart({
            title: {
              position: "bottom",
              text: "Share of Internet Population Growth, 2007 - 2012",
            },
            legend: {
              visible: false,
            },
            chartArea: {
              background: "",
            },
            seriesDefaults: {
              labels: {
                visible: true,
                background: "transparent",
                template: "#= category #: \n #= dataItem.value #%",
              },
            },
            series: [
              {
                type: "pie",
                startAngle: 150,
                data: [
                  {
                    category: "Asia",
                    value: -53.8,
                    color: "#9de219",
                  },
                  {
                    category: "Europe",
                    value: -16.1,
                    color: "#90cc38",
                  },
                  {
                    category: "Latin America",
                    value: 11.3,
                    color: "#068c35",
                  },
                  {
                    category: "Africa",
                    value: -9.6,
                    color: "#006634",
                  },
                  {
                    category: "Middle East",
                    value: 5.2,
                    color: "#004d38",
                  },
                  {
                    category: "North America",
                    value: 3.6,
                    color: "#033939",
                  },
                ],
              },
            ],
            tooltip: {
              visible: true,
              template: function (e) {
                return e.dataItem.value;
              },
            },
          });
        }

        $(document).ready(createChart);
        $(document).bind("kendo:skinChange", createChart);
      </script>
    </div>
```

## See Also

- [Kendo UI Chart Overview](https://docs.telerik.com/kendo-ui/controls/charts/overview)
