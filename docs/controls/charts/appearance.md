---
title: Appearance
page_title: Appearance | Kendo UI Charts
description: "Learn how to control the appearance of Kendo UI Charts, change their themes and manage their animated transitions."
slug: appearance_charts_widget
position: 6
---

# Appearance

The appearance of Kendo UI Charts is controlled via style options unlike the other Kendo UI components in the suite, which use CSS for styling.

## Chart Structure

The main building blocks of a Kendo UI Chart are:

*   Title
*   Legend
*   Chart Area
*   Plot Area
*   Axes
*   Series

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

### Themes

The Kendo UI Chart widgets come with [a number of predefined themes](http://demos.telerik.com/kendo-ui/themebuilder), which are:

* Black
* BlueOpal
* Bootstrap
* Default
* Fiori
* Flat
* HighContrast
* Material
* MaterialBlack
* Metro
* MetroBlack
* Moonlight
* Nova
* Silver
* Office 365
* Uniform

Use the `theme` option to select a theme, as demonstrated in the example below.

###### Example

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

Kendo UI Charts use animated transitions to display new and updated data. These transitions can be disabled through the `transitions` option, as demonstrated below.

###### Example

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

## See Also

Other articles on Kendo UI Charts:

* [Chart Overview]({% slug overview_kendoui_charts_widget %})
* [Data Binding]({% slug databinding_charts_widget %})
* [Date Series]({% slug dateseries_charts_widget %})
* [Tooltip]({% slug tooltip_charts_widget %})
* [Chart Notes]({% slug chartnotes_charts_widget %})
* [Error Bars]({% slug errorbars_charts_widget %})
* [Data Series Charts]({% slug seriestypeofcharts_widget %})
* [Types of Kendo UI Charts]({% slug areacharts_widget %})
* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
