---
title: Appearance
page_title: Instructions for Kendo UI DataViz Chart Widget appearance
description: How to control the appearance of the chart, change the theme of the widget and manage the animated transitions.
position: 5
---

## Chart Appearance

The appearance of the Chart is controlled with style options.

This is in contrast with the other components in the suite that use CSS for styling.

### Chart structure

The main building blocks of the chart are:

*   Title
*   Legend
*   Chart Area
*   Plot Area
*   Axes
*   Series

![Chart Structure](/dataviz/chart/chart-structure.png)

### Title

The title location can be controlled with the `position` option of the `title` object. Available options are:

*   "top"
*   "bottom"

### Legend

The legend position is also controllable. Supported `position` values:

*   "top"
*   "bottom"
*   "left"
*   "right"
*   "custom"

Custom positioning is configured through the `offsetX`  and `offsetY` options. For example:

![Custom legend position](/dataviz/chart/chart-legend-custom-position.png)

Series can be excluded from the legend by setting their `visibleInLegend` option to `false`.

### Themes

The Chart comes with a number of predefined themes:

*   Black
*   BlueOpal
*   Bootstrap
*   Default
*   Flat
*   HighContrast
*   Material
*   MaterialBlack
*   Metro
*   MetroBlack
*   Moonlight
*   Silver
*   Uniform

Use the `theme` option to select a theme:


    $("#chart").kendoChart({
        theme: "blueOpal",
        series: [{
            type: "bar",
            name: "United States",
            data: [67.96, 68.93, 75, 74, 78]
        }],
        categoryAxis: {
            categories: [2005, 2006, 2007, 2008, 2009]
        }
    });


Note that theme names are case insensitive.

### Transitions

The Chart uses animated transitions to display new and updated data. These transitions can be disabled through the `transitions` option:

    $("#chart").kendoChart({
        series: [{
            type: "bar",
            name: "United States",
            data: [67.96, 68.93, 75, 74, 78]
        }],
        categoryAxis: {
            categories: [2005, 2006, 2007, 2008, 2009]
        },
        transitions: false
    });

