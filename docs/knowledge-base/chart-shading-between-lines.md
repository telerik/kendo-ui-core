---
title: Adding Shading Between Two Lines in Kedno UI for jQuery Chart
description: Learn how to add shading between two lines in a Kedno UI for jQuery Chart.
type: how-to
page_title: How to Add Shading Between Two Lines in Kedno UI for jQuery Chart
meta_title: Adding Shading Between Two Lines in Chart
slug: chart-shading-between-lines
tags: chart, shading, rangearea
res_type: kb
ticketid: 1646903
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
<td> 2025.4.1217 </td>
</tr>
</tbody>
</table>

## Description

I want to add shading between two lines on a chart in Kedno UI for jQuery. Using the standard Area chart displays the entire area under the lines, but I need to shade only the area between the two lines.

This knowledge base article also answers the following questions:
- How can I add shading between two lines in a chart?
- How to create a shaded area between two data points in Kedno UI for jQuery Chart?
- What is the method to shade the area between two lines on a chart?

## Solution

To achieve shading between two lines, add a new series to the chart specifically for the shaded area. Use the Range Area chart type and provide data for the area between the two lines.

Follow these steps:

1. Prepare the data for the shading between the two lines.

```javascript
var data1 = [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855];
var data2 = [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727];
var shadedAreaData = data1.map(function(val, index) {
  return { from: val, to: data2[index] };
});
```

2. Add a Range Area series to the chart and set the data for the shaded area.

```javascript
series: [
  {
    type: "rangeArea",
    name: "Shaded Area",
    data: shadedAreaData,
    color: "rgba(135, 206, 235, 1)"
  },
  {
    type: "line",
    name: "Line Above",
    data: data1
  },
  {
    type: "line",
    name: "Line Below",
    data: data2
  }
]
```

3. Render the chart with the specified configuration.

## Example

```dojo
  <div id="example">
      <div class="demo-section wide">
        <div id="chart" style="background: center no-repeat url('../content/shared/styles/world-map.png');"></div>
      </div>
      <script>
        function createChart() {
          var data1 = [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855];
          var data2 = [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727];
          var shadedAreaData = data1.map(function(val, index) {
            return { from: val, to: data2[index] };
          });

          $("#chart").kendoChart({
            title: {
              text: "Gross domestic product growth \n /GDP annual %/"
            },
            legend: {
              position: "bottom"
            },
            chartArea: {
              background: ""
            },
            seriesDefaults: {
              type: "line"
            },
            series: [{
              name: "India",
              data: data1
            },{
              name: "World",
              data: data2
            },
            {
              type: "rangeArea",
              name: "Shaded Area",
              data: shadedAreaData,
              color: "rgba(135, 206, 235, 1)"
            }],
            valueAxis: {
              labels: {
                format: "{0}%"
              },
              line: {
                visible: false
              },
              axisCrossingValue: -10
            },
            categoryAxis: {
              categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
              majorGridLines: {
                visible: false
              },
              labels: {
                rotation: "auto"
              }
            },
            tooltip: {
              visible: true,
              format: "{0}%",
              template: "#= series.name #: #= value #"
            }
          });
        }

        $(document).ready(createChart);
        $(document).bind("kendo:skinChange", createChart);
      </script>
    </div>
```

## See Also

- [Kendo UI for jQuery Chart Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/charts/overview)
- [Range Area Chart Documentation](https://docs.telerik.com/kendo-ui/controls/charts/chart-types/range-area)
---