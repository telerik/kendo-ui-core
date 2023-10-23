---
title: Appearance
page_title: Appearance
description: "Learn the basics when working with the Telerik UI Loader component for {{ site.framework }} set its size, type and themeColor configurations."
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
* `Pulsing` (Default)&mdash;Applies pulsing animation on the Loader.
* `InfiniteSpinner`&mdash;Applies infinite-spinner animation on the Loader.
* `ConvergingSpinner`&mdash;Applies converging-spinner animation on the Loader.

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

* `Primary` (Default)&mdash;Applies coloring based on primary theme color.
* `Secondary`&mdash;Applies coloring based on secondary theme color.
* `Tertiary`&mdash; Applies coloring based on tertiary theme color.
* `Info`&mdash;Applies coloring based on info theme color.
* `Success`&mdash; Applies coloring based on success theme color.
* `Warning`&mdash; Applies coloring based on warning theme color.
* `Error`&mdash; Applies coloring based on error theme color.
* `Dark`&mdash; Applies coloring based on dark theme color.
* `Light`&mdash; Applies coloring based on light theme color.
* `Inverse`&mdash; Applies coloring based on inverted theme color.

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

    @(Html.Kendo().Loader()
        .Name("Info")
        .ThemeColor(LoaderThemeColor.Info)
    )

    @(Html.Kendo().Loader()
        .Name("Success")
        .ThemeColor(LoaderThemeColor.Success)
    )

    @(Html.Kendo().Loader()
        .Name("Warning")
        .ThemeColor(LoaderThemeColor.Warning)
    )

    @(Html.Kendo().Loader()
        .Name("Error")
        .ThemeColor(LoaderThemeColor.Error)
    )

    @(Html.Kendo().Loader()
        .Name("Dark")
        .ThemeColor(LoaderThemeColor.Dark)
    )

    @(Html.Kendo().Loader()
        .Name("Light")
        .ThemeColor(LoaderThemeColor.Light)
    )

    @(Html.Kendo().Loader()
        .Name("Inverse")
        .ThemeColor(LoaderThemeColor.Inverse)
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

    <kendo-loader name="Info" theme-color="LoaderThemeColor.Info">
    </kendo-loader>

    <kendo-loader name="Success" theme-color="LoaderThemeColor.Success">
    </kendo-loader>

    <kendo-loader name="Warning" theme-color="LoaderThemeColor.Warning">
    </kendo-loader>

    <kendo-loader name="Error" theme-color="LoaderThemeColor.Error">
    </kendo-loader>

    <kendo-loader name="Dark" theme-color="LoaderThemeColor.Dark">
    </kendo-loader>

    <kendo-loader name="Light" theme-color="LoaderThemeColor.Light">
    </kendo-loader>

    <kendo-loader name="Inverse" theme-color="LoaderThemeColor.Inverse">
    </kendo-loader>
```
{% endif %}

## Size

The Loader allows you to set different sizes.

The available `Size` values are:

* `Small`
* `Medium` (Default)
* `Large`

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