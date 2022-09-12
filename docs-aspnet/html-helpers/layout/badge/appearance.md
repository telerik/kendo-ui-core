---
title: Appearance
page_title: Badge Appearance
description: "Learn how to customize the appearance of the widget Telerik UI Badge HtmlHelper for {{ site.framework }}."
slug: appearance_badge_aspnetcore
position: 2
---

# Badge Appearance

The Badge is used to decorate avatars, navigation menus, as well as, customize template content.

## Rounded

The `Rounded` property can be configured via the `Rounded` enumeration. The available values are:

- `Full` (default) — Renders a circle shape badge.
- `Small` — Renders an badge with small border radius.
- `Medium` — Renders an badge with meduim border radius.
- `Large` — Renders an badge with large border radius.
- `None` — Renders an badge with no border radius (square badge).

The following example demonstrates the `Rounded` option of the Badge:

```HtmlHelper
    @(Html.Kendo().Badge()
        .Name("badge")
        .Text("Custom")
        .Rounded(Rounded.Large)
    )
```
{% if site.core %}
```TagHelper
    <kendo-badge name="badge"
        text="Custom"
        rounded="Rounded.Large">
    </kendo-badge>
```
{% endif %}

## Theme Color

The Badge you to specify predefined theme colors.

The available `ThemeColor` values are:

- `Primary` (Default)—Applies coloring based on the primary theme color.
- `Base` - Applies base theme color.
- `Secondary` — Applies coloring based on the secondary theme color.
- `Tertiary` — Applies coloring based on the tertiary theme color.
- `Inherit` — Applies the inherited coloring value.
- `Info` — Applies coloring based on the info theme color.
- `Success` — Applies coloring based on the success theme color.
- `Warning` — Applies coloring based on the warning theme color.
- `Error` — Applies coloring based on the error theme color.
- `Dark` — Applies coloring based on the dark theme color.
- `Light` — Applies coloring based on the light theme color.
- `Inverse` — Applies coloring based on the inverted theme color.

```HtmlHelper
   @(Html.Kendo().Badge()
        .Name("badge")
        .Text("user")
        .ThemeColor(ThemeColor.Primary)
    )
```
{% if site.core %}
```TagHelper
    <kendo-badge name="badge"
        text="user"
        theme-color="ThemeColor.Primary">
    </kendo-badge>
```
{% endif %}

## Size

The Badge allows you to set predefined or custom sizes. The `Size` property can be configured via the `ComponentSize`enumeration. The available values are:

- `Small`
- `Medium` (Default)
- `Large`
- `None`

```HtmlHelper
    @(Html.Kendo().Badge()
        .Name("badge")
        .Text("JS")
        .Size(ComponentSize.Large)
    )
```
{% if site.core %}
```TagHelper
    <kendo-badge name="badge"
        text="JS"
        size="ComponentSize.Large">
    </kendo-badge>
```
{% endif %}

## FillMode

The Badge enables you to set styling options and create solid or outline badges by setting the `BadgeFillMode`. The available `BadgeFillMode` values are:

- `Solid` (Default)
- `Outline`
- `None`

```HtmlHelper
    @(Html.Kendo().Badge()
        .Name("badge")
        .Text("JS")
        .FillMode(BadgeFillMode.Outline)
    )
```
{% if site.core %}
```TagHelper
    <kendo-badge name="badge"
        text="JS"
        fill-mode="BadgeFillMode.Outline">
    </kendo-badge>
```
{% endif %}

## See Also

* [JavaScript API Reference of the Badge](https://docs.telerik.com/kendo-ui/api/javascript/ui/badge)
