---
title: Appearance
page_title: Appearance
description: "Learn how to control the appearance of the Telerik UI Chart HtmlHelper for {{ site.framework }}."
previous_url: /helpers/html-helpers/charts/chart/appearance
slug: htmlhelpers_charts_appearance_aspnetcore
position: 3
---

# Appearance

Unlike other {{ site.product }} components which use only CSS for styling, you can mainly control the appearance of the Chart elements by using JavaScript style options.

For more information on the structure of the Chart, refer to the articles on the [Chart building elements]({% slug htmlhelpers_charts_dataseries_aspnetcore %}).   

## Predefined Themes

The Charts come with [a set of predefined themes](https://docs.telerik.com/kendo-ui/styles-and-layout/appearance-styling). To select a theme, use the `Theme` option. The theme name is case-insensitive.

```
    @(Html.Kendo().Chart()
        .Name("chart")
        .Theme("blueOpal")
        .Title("Site Visitors Stats /thousands/")
        .Legend(legend => legend
            .Position(ChartLegendPosition.Bottom)
        )
        .SeriesDefaults(seriesDefaults => seriesDefaults
            .Column().Stack(true)
        )
        .Series(series =>
        {
            series.Column(new double[] { 56000, 63000, 74000, 91000, 117000, 138000 }).Name("Total Visits");
            series.Column(new double[] { 52000, 34000, 23000, 48000, 67000, 83000 }).Name("Unique visitors");
        })
        .CategoryAxis(axis => axis
            .Categories("Jan", "Feb", "Mar", "Apr", "May", "Jun")
            .MajorGridLines(lines => lines.Visible(false))
        )
        .ValueAxis(axis => axis
            .Numeric()
            .Line(line => line.Visible(false))
        )
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Format("{0}")
        )
    )
```

## Sass Themes

As of the R2 2017 SP1 release, the Chart provides styling options through [Sass-based themes](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes). When the theme is set to `inherit`, the Chart reads colors and fonts from the theme variables.

```
    @(Html.Kendo().Chart()
        .Name("chart")
        .Theme("inherit")
        .Title("Site Visitors Stats /thousands/")
        .Legend(legend => legend
            .Position(ChartLegendPosition.Bottom)
        )
        .SeriesDefaults(seriesDefaults => seriesDefaults
            .Column().Stack(true)
        )
        .Series(series =>
        {
            series.Column(new double[] { 56000, 63000, 74000, 91000, 117000, 138000 }).Name("Total Visits");
            series.Column(new double[] { 52000, 34000, 23000, 48000, 67000, 83000 }).Name("Unique visitors");
        })
        .CategoryAxis(axis => axis
            .Categories("Jan", "Feb", "Mar", "Apr", "May", "Jun")
            .MajorGridLines(lines => lines.Visible(false))
        )
        .ValueAxis(axis => axis
            .Numeric()
            .Line(line => line.Visible(false))
        )
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Format("{0}")
        )
    )
```

## Animated Transitions

{{ site.product }} Charts use animated transitions to display new and updated data. To disable these transitions, use the `transitions` option.

```
    @(Html.Kendo().Chart()
        .Name("chart")
        .Transitions(false)
        // Other options.
    )
```

## See Also

* [Using the API of the Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chart-api/index)
* [Basic Usage of the Area Chart HtmlHelper for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/area-charts/index)
* [Server-Side API](/api/chart)
