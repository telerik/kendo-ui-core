---
title: Appearance
page_title: Appearance
description: "Learn the basics when working with the Telerik UI Loader HtmlHelper for {{ site.framework }} set its size, type and themeColor configurations."
slug: htmlhelpers_loader_aspnetcore_appearance
position: 2
---

# Appearance

The Loader component provides several predefined appearance options such as different types, sizes and theme colors.

## Type

The Loader allows you to set different animations by using the `type` input property.

The available `types` values are:
* `pulsing` (Default)&mdash;Applies pulsing animation on the Loader.
* `infinite-spinner`&mdash;Applies infinite-spinner animation on the Loader.
* `converging-spinner`&mdash;Applies converging-spinner animation on the Loader.

```Razor
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

## Theme Color

The Loader allows you to specify predefined theme colors.

The available `themeColor` values are:

* `primary` (Default)&mdash;Applies coloring based on primary theme color.
* `secondary`&mdash;Applies coloring based on secondary theme color.
* `tertiary`&mdash; Applies coloring based on tertiary theme color.
* `info`&mdash;Applies coloring based on info theme color.
* `success`&mdash; Applies coloring based on success theme color.
* `warning`&mdash; Applies coloring based on warning theme color.
* `error`&mdash; Applies coloring based on error theme color.
* `dark`&mdash; Applies coloring based on dark theme color.
* `light`&mdash; Applies coloring based on light theme color.
* `inverse`&mdash; Applies coloring based on inverted theme color.

```Razor
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

## Size

The Loader allows you to set different sizes.

The available `size` values are:

* `small`
* `medium` (Default)
* `large`

```Razor
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

## See Also

* [Server-Side API](/api/loader)