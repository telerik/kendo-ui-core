---
title: 2024 Releases
page_title: 2024 Releases
description: "Learn about the breaking changes and backwards compatibility released by {{ site.product }} in 2024."
slug: breakingchanges_2024
position: 1
---

# 2024 Releases

This article lists the breaking or important changes in the 2024 releases of {{ site.product }}.
{% if site.core %}
## {{ site.product }} Q4 2024

### Checkbox

The `Rounded` configuration for the HTML Helpers now expects [`Kendo.Mvc.UI.Rounded`](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui/rounded) enum instead of [`Kendo.Mvc.UI.BasicRounded`](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui/basicrounded), exposing an additional `Full` option.
{% endif %}

## {{ site.product }} Q2 2024

### Target Framework

{% if site.core %}
As of the Q2 2024 release, {{ site.product }} supports only [LTS and STS versions of .NET Core](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core#lifecycle). You can update to a supported .NET Core version.
{% else %}
As of the Q2 2024 release, {{ site.product }} supports .NET Framework 4.6.2 and later versions. You can update to a [supported .NET Framework version](https://learn.microsoft.com/en-us/lifecycle/products/microsoft-net-framework).

**Telerik.Web.Captcha**
As of the Q2 2024 release, the `Telerik.Web.Captcha` package targets .NET Framework 4.6.2

**Telerik.Web.Spreadsheet**
As of the Q2 2024 release, the `Telerik.Web.Spreadsheet` package targets .NET Framework 4.6.2

**Kendo.Mvc.Export**
As of the Q2 2024 release, the `Kendo.Mvc.Export.dll` assembly targets .NET Framework 4.6.2
{% endif %}

### Chart

The default [`Theme`](/api/kendo.mvc.ui.fluent/chartbuilder#themesystemstring) configuration for the {{ site.product }} Charts is changed to `sass`. By default, the [Chart theme]({% slug htmlhelpers_charts_appearance_aspnetcore %}#sass-themes) will now match the loaded [Sass-based theme]({% slug sassbasedthemes_overview %}).

## {{ site.product }} Q1 2024

**Deprecated Controllers**

As of the Q1 2024 release, the following controllers will be deprecated.

* FileManager&mdash;`ContentProviderController`
* Editor&mdash;`EditorImageBrowserController`, `FileBrowserController`, `EditorFileBrowserController`

**Deprecated Interfaces**

As of the Q1 2024 release, the following interfaces will be deprecated.

* FileManager&mdash;`IContentProviderController`
* Editor&mdash;`IFileBrowserController`, `IImageBrowserController` 

**Deprecated APIs**

As of the Q1 2024 release, the following APIs will be deprecated.


{% if site.core %}
* `ChartSeriesBuilder.Type(string)`

    ```Deprecated
        .Series(series => series
             .Bar(new double[] { 3.907 })
             .Type("bar")
        )
    ```
    ```Alternative
        .Series(series => series
           .Bar(new double[] { 3.907 }) // Type is determined by the declared Series builder.
        )
    ```

* `ChartSeriesLineSettingsBuilder.Width(string)`, `ChartSeriesLineSettingsBuilder.Style(ChartAreaStyle)`,
`ChartSeriesLineSettingsBuilder.Style(ChartPolarAreaStyle)`,
`ChartSeriesLineSettingsBuilder.Style(ChartRadarAreaStyle)`

    ```Deprecated
        .Series(series => series
           .Bar(new double[] { 3.907 })
           .Line(line => line
                   .Width("100px")
                   .Style(ChartAreaStyle.Normal)
                   .Style(ChartPolarAreaStyle.Normal)
                   .Style(ChartRadarAreaStyle.Normal)
           )
        )
    ```
    ```Alternative
        .Series(series => series
           .Bar(new double[] { 3.907 })
           .Line(line => line
                   .Width(100)
                   .Style(ChartSeriesLineStyle.Normal)
           )
        )
    ```

* `ChartSeriesOverlaySettingsBuilder.Gradient`

    ```Deprecated
        .Series(series => series
           .Bar(new double[] { 3.907 })
           .Overlay(overlay => overlay.Gradient(ChartBarGradient.Glass))
        )
    ```
    ```Alternative
        .Series(series => series
           .Bar(new double[] { 3.907 })
           .Overlay(overlay => overlay.Gradient(ChartSeriesGradient.Glass))
        )
    ```

* `SplitterEventBuilder.LayoutChange`

    ```Deprecated
        .Events(events => events
           .LayoutChange("change")
           .LayoutChange(@<text>function () { return; }</text>)
        )
    ```
    ```Alternative
        .Events(events => events
           .Render("change")
           .Render(@<text>function () { return; }</text>)
        )
    ```

{% else %}


* `ChartSeriesBuilderBase.GroupNameTemplate`

    ```Deprecated
        .Series(series => series.Bar(s => s.Sales)
            .Name("Sales")
            .GroupNameTemplate("#= series.name # for #= group.field #   #=    group.value #")
        )
    ```
    ```Alternative
        .Series(series => series.Bar(s => s.Sales)
            .Name("#= series.name # for #= group.field #   #=    group.value #")
        )
    ```

* `EditorMessages.FormatBlock`, `EditorMessages.Styles`
    ```Deprecated
        .Messages(messages => messages
            .FormatBlock("Format")
            .Styles("Style")
        )
    ```
    ```Alternative
        .Messages(messages => messages
               .Formatting("Format")
               .Style("Style")
        )
    ```

{% endif %}

{% if site.core %}

**Deprecated Extensions**

* `ApplicationBuilderExtensions`

{% endif %}
