---
title: Appearance
page_title: Appearance | Kendo UI Charts
description: "Learn how to control the appearance of Kendo UI Charts, change their themes and manage their animated transitions."
slug: appearance_charts_widget
position: 5
---

# Appearance

The appearance of Kendo UI Charts is controlled by some CSS, but mostly by JavaScript style options, unlike the other Kendo UI components in the suite, which use only CSS for styling.

## Chart Structure

The main building blocks of a Kendo UI Chart are:

*   Title
*   Legend
*   Chart Area
*   Plot Area
*   Axes
*   Series

For detailed information on [Chart titles and legends, refer to the article about them]({% slug titlelegend_features_charts %}).

**Figure 1. Chart structure**

![Chart Structure](/controls/charts/chart-structure.png)

### Themes

The Kendo UI Chart widgets come with [a set of predefined themes](/styles-and-layout/appearance-styling). Use the `theme` option to select a theme, as demonstrated in the example below. The theme name is case insensitive.

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

> **Important**
>
> As of the Kendo UI Q2 2015 (2015.2.624) release, [all CSS code related to the rendering of data visualization, i.e. referring to Gauges, Charts, Barcodes, Diagrams, and Maps, has been moved to the web widgets' CSS files]({% slug breakingchanges2015_kendoui %}). Please remove any legacy references to `kendo.dataviz.css` and `kendo.dataviz.[theme].css`.

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

* [Overview of the Chart Widgets]({% slug overview_kendoui_charts_widget %})
* [Data Binding]({% slug databinding_charts_widget %})
* [Date Series]({% slug dateseries_charts_widget %})
* [Tooltip]({% slug tooltip_charts_widget %})
* [Chart Notes]({% slug chartnotes_charts_widget %})
* [Title and Legend]({% slug titlelegend_features_charts %})
* [Error Bars]({% slug errorbars_charts_widget %})
* [Data Series]({% slug seriestypeofcharts_widget %})
* [Types of Kendo UI Charts]({% slug areacharts_widget %})
* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
