---
title: 2024 Releases
page_title: 2024 Releases
description: "Learn about the breaking changes and backwards compatibility released by {{ site.product }} in 2024."
slug: breakingchanges_2024
position: 1
---

# 2024 Releases

This article lists the breaking or important changes in the 2024 releases of {{ site.product }}.

## {{ site.product }} R1 2024

**Deprecated Controllers**

As of the R1 2024 release, the following controllers will be deprecated.

* FileManager&mdash;`ContentProviderController`
* Editor&mdash;`EditorImageBrowserController`, `FileBrowserController`, `EditorFileBrowserController`

**Deprecated Interfaces**

As of the R1 2024 release, the following interfaces will be deprecated.

* FileManager&mdash;`IContentProviderController`
* Editor&mdash;`IFileBrowserController`, `IImageBrowserController` 

**Deprecated APIs**

As of the R1 2024 release, the following APIs will be deprecated.


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