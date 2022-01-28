---
title: Title and Legend
page_title: Title and Legend
description: "Learn how to control the appearance of Telerik UI Charts, change their themes and manage their animated transitions."
slug: htmlhelpers_charts_titleandlegend_aspnetcore
---

# Title and Legend

The Telerik UI Chart supports options for configuring the appearance of its title and legend.

## Setting the Title

To control the position of the title, use the following available `Position` options of the `Title` property:

* `"Top"`
* `"Bottom"`

## Setting the Legend

The Chart legend displays the name of the configured data series.

* To control the position of the legend, use any of the following supported `Position` values:

    * `"Top"`
    * `"Bottom"`
    * `"Left"`
    * `"Right"`
    * `"Custom"`

* To customize the position of the legend, use the `offsetX` and `offsetY` options.

    ![Custom legend position](../images/chart-legend-custom-position.png)

* To exclude series from the legend, set their `VisibleInLegend` option to `false`.

## See Also

* [Using the API of the Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chart-api/index)
* [Basic Usage of the Area Chart HtmlHelper for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/area-charts/index)
* [Server-Side API](/api/chart)
