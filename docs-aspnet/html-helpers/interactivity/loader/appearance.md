---
title: Appearance
page_title: Appearance
description: "Learn the basics when working with the Telerik UI Loader component for {{ site.framework }} set its size, type and themeColor configurations."
components: ["loader"]
slug: htmlhelpers_loader_aspnetcore_appearance
position: 2
---

# Appearance

The Loader component provides predefined appearance options, such as different types, sizes, and theme colors.

To explore the available options for customizing the Loader appearance, refer to the following demos:

* [Loader types](https://demos.telerik.com/{{ site.platform }}/loader/index)
* [Loader theme colors and sizes](https://demos.telerik.com/{{ site.platform }}/loader/appearance)

## Type

The Loader allows you to set different visual animations by using the `Type` property.

The available `Type` values are:
* `Pulsing`&mdash;Applies pulsing animation on the Loader.
* `InfiniteSpinner`&mdash;Applies infinite-spinner animation on the Loader.
* `ConvergingSpinner`&mdash;Applies converging-spinner animation on the Loader.

> When not explicitly set, the type defaults to `Pulsing`.

```HtmlHelper
    @(Html.Kendo().Loader()
        .Name("pulsing")
        .Type(LoaderType.Pulsing)
    )

    @(Html.Kendo().Loader()
        .Name("infinite")
        .Type(LoaderType.InfiniteSpinner)
    )

    @(Html.Kendo().Loader()
        .Name("converging")
        .Type(LoaderType.ConvergingSpinner)
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-loader name="pulsing" type="LoaderType.Pulsing">
    </kendo-loader>

    <kendo-loader name="infinite" type="LoaderType.InfiniteSpinner">
    </kendo-loader>

    <kendo-loader name="converging" type="LoaderType.ConvergingSpinner">
    </kendo-loader>
```
{% endif %}

## Theme Color

The Loader allows you to specify predefined theme colors.

The available `ThemeColor` values are:

* `Primary`&mdash;Applies coloring based on primary theme color.
* `Base`&mdash;Applies coloring based on base theme color.
* `Secondary`&mdash;Applies coloring based on secondary theme color.
* `Tertiary`&mdash; Applies coloring based on tertiary theme color.

> When not explicitly set, the applied theme controls the default theme color.

```HtmlHelper
    @(Html.Kendo().Loader()
        .Name("Primary")
        .ThemeColor(LoaderThemeColor.Primary)
    )

    @(Html.Kendo().Loader()
        .Name("Secondary")
        .ThemeColor(LoaderThemeColor.Secondary)
    )

    @(Html.Kendo().Loader()
        .Name("Tertiary")
        .ThemeColor(LoaderThemeColor.Tertiary)
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-loader name="Primary" theme-color="LoaderThemeColor.Primary">
    </kendo-loader>

    <kendo-loader name="Secondary" theme-color="LoaderThemeColor.Secondary">
    </kendo-loader>

    <kendo-loader name="Tertiary" theme-color="LoaderThemeColor.Tertiary">
    </kendo-loader>
```
{% endif %}

## Size

The Loader allows you to set different sizes.

The available `Size` values are:

* `Small`
* `Medium`
* `Large`

> When not explicitly set, the applied theme controls the default size.

```HtmlHelper
    @(Html.Kendo().Loader()
        .Name("loader-small")
        .Size(LoaderSize.Small)
    )

    @(Html.Kendo().Loader()
        .Name("loader-medium")
        .Size(LoaderSize.Medium)
    )

    @(Html.Kendo().Loader()
        .Name("loader-large")
        .Size(LoaderSize.Large)
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-loader name="loader-small" size="LoaderSize.Small">
    </kendo-loader>

    <kendo-loader name="loader-medium" size="LoaderSize.Medium">
    </kendo-loader>

    <kendo-loader name="loader-large" size="LoaderSize.Large">
    </kendo-loader>
```
{% endif %}

## See Also

* [Appearance of the Loader HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/loader/appearance)
* [Loader Server-Side API](/api/loader)
* [Loader Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/loader)