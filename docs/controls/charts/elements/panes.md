---
title: Panes
page_title: jQuery Chart Documentation | Panes
description: "Get started with the jQuery Chart by Kendo UI and learn how to configure its panes."
slug: panes_charts_widget
---

# Panes

The Chart panes enable you to create vertical sub-divisions in a single categorical Chart.

You have to set an individual value axis to each pane. Multiple panes can share a category axis.

> Only the Categorical Chart series - Area, Bar, Box Plot, Bullet, Line, Radar, Range Area, Range Bar and Waterfall support the configuration of panes.

Panes are declared through the [`panes`](/api/javascript/dataviz/ui/chart/configuration/panes) configuration. To control the series placement, plot the series on a value axis, which is placed in the desired pane.

## Default Settings

Settings that apply to all panes can be declared through the [`paneDefaults`](/api/javascript/dataviz/ui/chart/configuration/paneDefaults) configuration.

The following example sets the default background color for the panes:

    $("#chart").kendoChart({
      series: [
        { data: [1, 2, 3] },
        { data: [1, 2, 3, 4], axis: "bottom" }
      ],
      valueAxis: [
        { pane: "top-pane" },
        { pane: "bottom-pane", name: "bottom" }
      ],
      paneDefaults: {
        background: "#00ff00"
      },
      panes: [
        { name: "top-pane" },
        { name: "bottom-pane" }
      ]
    });

## Disable Clipping

By default, the pane content cannot extend beyond its border. This prevents charts from overlapping other elements like the legend or title.

Pane clipping may be undesired, for example when plotting series markers at the edge of the pane.
To disable clipping, set the [panes.clip](/api/javascript/dataviz/ui/chart/configuration/panes.clip) setting to `false`:

    $("#chart").kendoChart({
    seriesDefaults: {
        type: "line"
    },
    series: [
        { data: [1, 100, 1] },
        { data: [1, 100, 1], axis: "bottom" }
    ],
    valueAxis: [
        { pane: "top-pane", max: 70 },
        { pane: "bottom-pane", name: "bottom", max: 70 }
    ],
    panes: [
        { name: "top-pane" },
        { name: "bottom-pane", clip: false}
    ]
    });

## See Also

* [Using the API of the Chart (Demo)](https://demos.telerik.com/kendo-ui/chart-api/index)
* [JavaScript API Reference of the Chart](/api/javascript/dataviz/ui/chart)