---
title: Appearance
page_title: jQuery Chart Documentation | Appearance
description: "Get started with the jQuery Chart by Kendo UI and learn how to control its appearance, change the themes, and manage the animated transitions."
previous_url: /controls/charts/chart/appearance
slug: appearance_charts_widget
position: 4
---

# Appearance

Unlike other Kendo UI widgets which use only CSS for styling, you can mainly control the appearance of the Chart elements by using JavaScript style options.

For more information on the structure of the Chart, refer to the articles on the [Chart building elements]({% slug seriestypeofcharts_widget %}).   

## Predefined Themes

The Charts come with [a set of predefined themes]({% slug themesandappearnce_kendoui_desktopwidgets %}). To select a theme, use the `theme` option. The theme name is case-insensitive.

> As of the Kendo UI R2 2015 (2015.2.624) release, [all CSS code related to the rendering of data visualization widgets (Gauges, Charts, Barcodes, Diagrams, and Maps) is now moved to the CSS files of the widgets]({% slug breakingchanges2015_kendoui %}). As a result, you need to remove all legacy references to `kendo.dataviz.css` and `kendo.dataviz.[theme].css`.

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


## Sass Themes

As of the R2 2017 SP1 release, the Chart provides styling options through [Sass-based themes]({% slug sassbasedthemes_kendoui %}). When the theme is set to `inherit`, the Chart reads colors and fonts from the theme variables.

    $("#chart").kendoChart({
        theme: "inherit",
        series: [{
            type: "bar",
            name: "United States",
            data: [67.96, 68.93, 75, 74, 78]
        }],
        categoryAxis: {
            categories: [2005, 2006, 2007, 2008, 2009]
        }
    });


## Animated Transitions

Kendo UI Charts use animated transitions to display new and updated data. To disable these transitions, use the `transitions` option.

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

* [Using the API of the Chart (Demo)](https://demos.telerik.com/kendo-ui/chart-api/index)
* [JavaScript API Reference of the Chart](/api/javascript/dataviz/ui/chart)
