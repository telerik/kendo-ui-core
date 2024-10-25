---
title: Show Tooltip for Chart Notes
page_title: Show Tooltip for Chart Notes
description: "Learn how to show tooltips for Chart notes."
previous_url: /controls/charts/how-to/tooltip-for-chart-notes, /controls/charts/how-to/integration/tooltip-for-chart-notes, /controls/layout/tooltip/how-to/tooltip-for-chart-notes-charts
slug: howto_showtooltipfornotes_charts
tags: chart, show, tooltip, for, notes
component: chart
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Chart for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio Version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I attach a Kendo UI Tootlip to the Chart notes and display it when a note is hovered?

## Solution

You can attach a [Kendo UI Drawing Tootlip](https://demos.telerik.com/kendo-ui/drawing/tooltip) to Kendo UI Chart notes and display it when a note is hovered.

The following example demonstrates how to achieve this behavior.

```dojo

    <div id="chart"></div>
    <script>
       var grandSlam = [{
        "year": "2003",
        "win": 13,
        "extremum": "MIN: 13",
        "loss": 3
      },{
        "year": "2004",
        "win": 22,
        "loss": 1
      },{
        "year": "2005",
        "win": 24,
        "loss": 2
      },{
        "year": "2006",
        "win": 27,
        "extremum": "MAX: 27",
        "loss": 1
      },{
        "year": "2007",
        "win": 26,
        "loss": 1
      },{
        "year": "2008",
        "win": 24,
        "loss": 3
      },{
        "year": "2009",
        "win": 26,
        "loss": 2
      },{
        "year": "2010",
        "win": 20,
        "loss": 3
      },{
        "year": "2011",
        "win": 20,
        "loss": 4
      },{
        "year": "2012",
        "win": 19,
        "loss": 3
      }];

      $("#chart").kendoChart({
        dataSource: {
          data: grandSlam
        },
        title: {
          text: "Roger Federer Grand Slam tournament performance"
        },
        legend: {
          position: "bottom"
        },
        seriesDefaults: {
          type: "line"
        },
        series: [{
          field: "win",
          name: "Wins",
          noteTextField: "extremum",
          notes: {
            label: {
              position: "outside"
            },
            position: "bottom",
            visual: function(e) {
                // The original note visual
                var visual = e.createVisual();

                // Set the drawing tooltip options
                // https://demos.telerik.com/kendo-ui/drawing/tooltip
                visual.options.tooltip = {
                    content: e.value
                };

                return visual;
            }
          }
        },{
          field: "loss",
          name: "Losses"
        }],
        valueAxis: {
          line: {
            visible: false
          }
        },
        categoryAxis: {
          field: "year",
          majorGridLines: {
            visible: false
          }
        }
      });

    </script>
```

## See Also

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Drawing API]({% slug overview_kendoui_drawingapi %})
* [Aggregate Data in Pie Charts]({% slug howto_aggregatedata_piecharts %})
* [Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [Expand Clickable Area of Points]({% slug howto_extendclickableareaofpoints_charts %})
