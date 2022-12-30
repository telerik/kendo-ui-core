---
title: Title and Subtitle
page_title: Title and Subtitle
description: "Learn how to control the appearance of the {{ site.product }} Charts' titles."
slug: htmlhelpers_charts_title_aspnetcore
previous_url: /html-helpers/charts/elements/title-and-legend 
---

# Title and Subtitle

The {{ site.product }} Chart supports options for configuring the appearance of its title and subtitle.

## Setting the Title

The `Title` property of the Chart accepts a `string` or a Lambda expression as its parameter. To control the position of the title, use the following available `Position` options of the `Title` property:

* `"Top"`
* `"Bottom"`

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Title(title => title.Position(ChartTitlePosition.Top).Text("Site Visitors Stats"))
        // Other options.
    )
```
{% if site.core %}
```TagHelper

    <kendo-chart name="chart">
        <chart-title position="ChartTitlePosition.Top" text="Site Visitors Stats"></chart-title>
        <!-- Other options.-->
    </kendo-chart>

```
{% endif %}

## Setting the Subtitle

{% if site.core %}
The {{ site.product }} Chart supports configuring an additional subtitle by setting the [`subtitle`](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/ChartBuilder#subtitlesystemaction) option.
{% else %}
The {{ site.product }} Chart supports configuring an additional subtitle by using the [`subtitle`](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/ChartBuilder#subtitlesystemaction) option.
{% endif %}

The following example demonstrates how to configure a subtitle:

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Title(title => title.Position(ChartTitlePosition.Top).Text("Site Visitors Stats"))
        .Subtitle(subtitle => subtitle.Text("/thousands/"))
        // Other options.
    )
```
{% if site.core %}
```TagHelper

    <kendo-chart name="chart">
        <chart-title position="ChartTitlePosition.Top" text="Site Visitors Stats"></chart-title>
        <subtitle text="/thousands/"></subtitle>
        <!-- Other options.-->
    </kendo-chart>
```
{% endif %}

## Customizing the Appearance

The Chart supports the following properties which enable you to customize the appearance of its `Title`:

* `Align`
* `Color`
* `Background`
* `Border`
* `Font`
* `Padding`

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Title(t=>t.Text("Site Visitors Stats").Align(ChartTextAlignment.Left).Color("green").Background("grey").Border(1,"green",ChartDashType.Solid).Font("Comic Sans").Padding(30))
       // Other options.
    )
```
{% if site.core %}
```TagHelper

    <kendo-chart name="chart">
        <chart-title position="ChartTitlePosition.Top" align="ChartTextAlignment.Left" color="green" background="grey" font="Comic Sans" text="Site Visitors Stats"></chart-title>
        <!-- Other options.-->
    </kendo-chart>

```
{% endif %}

## See Also

* [Using the API of the Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chart-api/index)
* [Basic Usage of the Area Chart HtmlHelper for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/area-charts/index)
* [Basic Usage of the Area Chart TagHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/area-charts/tag-helper)
* [Server-Side API of the Chart for {{ site.framework }}](/api/chart)
