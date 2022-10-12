---
title: Appearance
page_title: jQuery Chart Documentation - Appearance
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

```dojo
    <div id="chart"></div>
    <script>
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
    </script>
```

## Sass Themes

As of the R2 2017 SP1 release, the Chart provides styling options through [Sass-based themes]({% slug sassbasedthemes_kendoui %}). When the theme is set to `sass`, the Chart reads colors and fonts from the theme variables.

```dojo
    <div id="chart"></div>
        <script>
        $("#chart").kendoChart({
            theme: "sass",
            series: [{
                type: "bar",
                name: "United States",
                data: [67.96, 68.93, 75, 74, 78]
            }],
            categoryAxis: {
                categories: [2005, 2006, 2007, 2008, 2009]
            }
        });
    </script>
```

## Using Series Color from Themes v4

The 5.0 release of the Kendo Sass Themes features an updated color palette for the chart series.

To revert to the series colors from version 4.x, you can:
* Use the pre-built theme swatches from the respective [npm packages]({% slug sassbasedthemes_kendoui %}#using-npm-packages):
  * `dist/default-dataviz-v4` from `@progress/kendo-theme-default`
  * `dist/bootstrap-dataviz-v4` from `@progress/kendo-theme-bootstrap`
  * `dist/material-dataviz-v4` from `@progress/kendo-theme-material`

* Use [SCSS variables]({% slug sassbasedthemes_kendoui %}#customizing-the-themes) to revert the series colors to their previous defaults:

    // Default v4
    $series-a: #ff6358;
    $series-b: #ffd246;
    $series-c: #78d237;
    $series-d: #28b4c8;
    $series-e: #2d73f5;
    $series-f: #aa46be;

    // Bootstrap v4
    $series-a: #0275d8;
    $series-b: #5bc0de;
    $series-c: #5cb85c;
    $series-d: #f0ad4e;
    $series-e: #e67d4a;
    $series-f: #d9534f;

    // Material v4
    $series-a: #3f51b5;
    $series-b: #2196f3;
    $series-c: #43a047;
    $series-d: #ffc107;
    $series-e: #ff5722;
    $series-f: #e91e63;

* Use the [`seriesColors`](/api/javascript/dataviz/ui/chart/configuration/seriescolors) configuration setting for individual Chart instances:

    var chartDefaultV4Colors =
    ['#ff6358', '#ffd246', '#78d237', '#28b4c8', '#2d73f5', '#aa46be'];

    var chartBootstrapV4Colors =
    ['#0275d8', '#5bc0de', '#5cb85c', '#f0ad4e', '#e67d4a', '#d9534f'];

    var chartMaterialV4Colors =
    ['#3f51b5', '#2196f3', '#43a047', '#ffc107', '#ff5722', '#e91e63'];

    ```dojo
        <div id="chart"></div>
            <script>
            $("#chart").kendoChart({
                theme: "sass",
                seriesColors: chartDefaultV4Colors,
                series: [{
                    type: "bar",
                    name: "United States",
                    data: [67.96, 68.93, 75, 74, 78]
                }],
                categoryAxis: {
                    categories: [2005, 2006, 2007, 2008, 2009]
                }
            });
        </script>
    ```

## Animated Transitions

Kendo UI Charts use animated transitions to display new and updated data. To disable these transitions, use the `transitions` option.

```dojo
    <div id="chart"></div>
    <script>
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
    </script>
```

## See Also

* [Using the API of the Chart (Demo)](https://demos.telerik.com/kendo-ui/chart-api/index)
* [JavaScript API Reference of the Chart](/api/javascript/dataviz/ui/chart)
