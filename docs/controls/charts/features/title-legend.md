---
title: Title and Legend
page_title: Title and Legend | Kendo UI Charts
description: "Learn how to control the appearance of Kendo UI Charts, change their themes and manage their animated transitions."
slug: titlelegend_features_charts
position: 3
---

# Title and Legend

The appearance of Kendo UI Charts is controlled via style options unlike the other Kendo UI components in the suite, which use CSS for styling.

## Chart Structure

The main building blocks of a Kendo UI Chart are:

*   Title
*   Legend
*   Chart Area
*   Plot Area
*   Axes
*   Series

For detailed information on Chart themes and transitions, refer to the article about the [appearance of Kendo UI Charts]({% slug appearance_charts_widget %}).

**Figure 1. Chart structure**

![Chart Structure](/controls/charts/chart-structure.png)

### Title

The title location is controlled via the `position` option of the `title` object. Available options are:

* `"top"`
* `"bottom"`

### Legend

The legend position is also controllable. The supported `position` values are:

* `"top"`
* `"bottom"`
* `"left"`
* `"right"`
* `"custom"`

Custom positioning is configured through the `offsetX` and `offsetY` options.

**Figure 2. Custom legend position**

![Custom legend position](/controls/charts/chart-legend-custom-position.png)

You are able to exclude series from the legend by setting their `visibleInLegend` option to `false`.

## See Also

Other articles on Kendo UI Charts:

* [Overview of the Chart Widgets]({% slug overview_kendoui_charts_widget %})
* [Data Binding]({% slug databinding_charts_widget %})
* [Date Series]({% slug dateseries_charts_widget %})
* [Tooltip]({% slug tooltip_charts_widget %})
* [Chart Notes]({% slug chartnotes_charts_widget %})
* [Error Bars]({% slug errorbars_charts_widget %})
* [Data Series]({% slug seriestypeofcharts_widget %})
* [Types of Kendo UI Charts]({% slug areacharts_widget %})
* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
