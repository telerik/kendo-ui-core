---
title: Categorical Charts
page_title: Categorical Charts
description: "Learn the basics when working with the categorical charts in the {{ site.product }} suite."
slug: htmlhelpers_categoricalcharts_aspnetcore
position: 2
---

{% if site.core %}
    {% assign Position = "/api/Kendo.Mvc.UI.Fluent/ChartCategoryAxisLabelsSettingsBuilder#positionkendomvcuichartaxislabelsposition" %}
    {% assign ValueAxis = "/api/Kendo.Mvc.UI.Fluent/ChartBuilder#valueaxissystemactionkendomvcuifluentchartvalueaxisbuildert" %}
{% else %}
    {% assign Position = "/api/Kendo.Mvc.UI.Fluent/ChartAxisLabelsBuilder#positionkendomvcuichartaxislabelsposition" %}
    {% assign ValueAxis = "/api/Kendo.Mvc.UI.Fluent/ChartBuilder#valueaxissystemactionkendomvcuifluentchartvalueaxisfactoryt" %}
{% endif %}

# Categorical Charts

Categorical charts use a single category axis and a single value axis.

The axis orientation (horizontal or vertical) is inferred from the series type. Categorical charts are the [Bar](https://demos.telerik.com/{{ site.platform }}/bar-charts/index), [Column](https://demos.telerik.com/{{ site.platform }}/bar-charts/column), and [Line Charts](https://demos.telerik.com/{{ site.platform }}/line-charts/index).

## Setting the Category Axis

To set the category names, use the `CategoryAxis` object.

```
    @(Html.Kendo().Chart()
        .Name("chart")
        .Series(series =>
        {
            series.Bar(new double[] { 56000, 63000, 74000, 91000, 117000, 138000 }).Name("Total Visits");
        })
        .CategoryAxis(axis => axis
            .Categories("Jan", "Feb", "Mar", "Apr", "May", "Jun")
        )
    )
```

You can also bind the category name to a field of the data item.

```
    @(Html.Kendo().Chart<Kendo.Mvc.Examples.Models.ElectricityProduction>()
        .Name("chart")
        .DataSource(ds => ds.Read(read => read.Action("_SpainElectricityProduction", "Bar_Charts")))
        .Series(series => {
            series.Column(model => model.Wind).Name("Wind");
        })
        .CategoryAxis(axis => axis
            .Field("Year")
        )
    )
```

## Positioning the Label

The category and value axes provide options for displaying their labels either next to the axis or at the outer edges of the plot area. By default, the labels are positioned next to the axis.

To change the label position, set the [`Position`]({{ Position }}) option of the axis labels which provides the following available options:

* (Default) When `Position` is set to `"ChartAxisLabelsPosition.OnAxis"`, the labels are positioned next to the axis.
* When `Position` is set to `"ChartAxisLabelsPosition.End"`, the labels are placed at the end of the crossing axis. Typically, this configuration positions the labels at the top or right end of the Chart unless the crossing axis was reversed.
* When `Position` is set to `"ChartAxisLabelsPosition.Start"`, the labels are placed at the start of the crossing axis. Typically, this configuration positions the labels at the left or bottom end of the Chart unless the crossing axis was reversed.


```
    .CategoryAxis(axis => axis
        .Categories("Jan", "Feb", "Mar", "Apr", "May", "Jun")
        .Labels(l => l.Position(ChartAxisLabelsPosition.Start))
    )
```

## Setting the Value Axis

Currently, the Chart supports only numeric value axes. To access the configuration options, use the [`ValueAxis`]({{ ValueAxis }}) setting.

The following example demonstrates how to configure a numeric axis with a minimum value of `0` and a maximum value of `100`.

```
    @(Html.Kendo().Chart()
        .Name("chart")
        .Series(series =>
        {
            series.Bar(new double[] { 15.7, 16.7, 20, 23.5, 26.6 }).Name("Visits");
        })
        .ValueAxis(v => v
            .Min(0)
            .Max(100)
        )
        .CategoryAxis(axis => axis
            .Categories("Jan", "Feb", "Mar", "Apr", "May", "Jun")
            .Labels(l => l.Position(ChartAxisLabelsPosition.Start))
        )
    )
```

## Setting Multiple Value Axes

A Telerik UI Chart can have more than one value axis. The additional axes must have unique names.

The following example demonstrates how to define the `miles` and `km` axes. To associate a series to a value axis, specify its name.

```
    @(Html.Kendo().Chart()
        .Name("chart")
        .Series(series =>
        {
            series
                .Column(new int[] { 20, 40, 45, 30, 50 })
                .Name("on battery");
            series
                .Column(new int[] { 20, 30, 35, 35, 40 })
                .Name("on gas");
        })
        .CategoryAxis(axis => axis
            .Categories("Mon", "Tue", "Wed", "Thu", "Fri")
        )
        .ValueAxis(axis => axis
            .Numeric()
                .Title("miles")
                .Min(0).Max(100)
        )
        .ValueAxis(axis => axis
            .Numeric("km")
                .Title("km")
                .Min(0).Max(161).MajorUnit(32)
        )
    )
```

## Arranging the Value Axes

You can also control the arrangement of the value axes by specifying the values (category indices) at which they cross the category axis. In the following example, the first value axis crosses the category axis at the first category (leftmost). The second value axis crosses it at the last category.

```
    .CategoryAxis(axis => axis
        .Categories("Mon", "Tue", "Wed")
        .AxisCrossingValue(0, 3)
    )
```

## See Also

* [Using the API of the Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chart-api/index)
* [Basic Usage of the Bar Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/bar-charts/index)
* [Basic Usage of the Line Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/line-charts/index)
* [Server-Side API](/api/chart)
