---
title: Appearance
page_title: Badge Appearance
description: "Learn how to customize the appearance of the Telerik UI Badge HtmlHelper for {{ site.framework }}."
components: ["badge"]
slug: appearance_badge_aspnetcore
position: 2
---

# Appearance

The Badge offers various options that allow you to control its look and feel.

For a complete example, refer to the [Appearance Demo of the Badge](https://demos.telerik.com/{{ site.platform }}/badge/appearance).

## Options

The Badge provides the following methods for styling:

- [`Rounded()`](#rounded)&mdash;Specifies the border radius of the component.
- [`ThemeColor()`](#themecolor)&mdash;Configures what color will be applied to the component.
- [`Size()`](#size)&mdash;Defines the overall size of the component.
- [`FillMode()`](#fillmode)&mdash;Creates a solid or an outline Badge.

### Rounded

The `Rounded` property can be configured through the `Rounded` enumeration. The available values are:

- `Small`&mdash;Renders a Badge with a small border radius.
- `Medium`&mdash;Renders a Badge with a medium border radius.
- `Large`&mdash;Renders a Badge with a large border radius.
- `Full`&mdash;Renders a circle shape Badge.

> When not explicitly set, the applied theme controls the default border radius.

> The `None` value is deprecated. Use custom CSS instead.

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

### ThemeColor

The `ThemeColor` option controls the color that will be applied to the rendered Badge.

> Starting with the [**2026 Q1**](slug:breakingchanges_2026) release, the Badge component renders with the `primary` appearance by default. Because appearance defaults are now theme-controlled, the `themeColor` option will be `undefined` when not set, but the theme applies the primary styling. To preserve the previous (secondary) look, explicitly set `themeColor: 'secondary'`.

The available `ThemeColor` values are:

- `Primary`&mdash;Applies coloring based on the primary theme color.
- `Default`&mdash;Applies base theme color.
- `Secondary`&mdash;Applies coloring based on the secondary theme color.
- `Tertiary`&mdash;Applies coloring based on the tertiary theme color.
- `Inherit`&mdash;Applies the inherited coloring value.
- `Info`&mdash;Applies coloring based on the info theme color.
- `Success`&mdash;Applies coloring based on the success theme color.
- `Warning`&mdash;Applies coloring based on the warning theme color.
- `Error`&mdash;Applies coloring based on the error theme color.
- `Dark`&mdash;Applies coloring based on the dark theme color.
- `Light`&mdash;Applies coloring based on the light theme color.
- `Inverted`&mdash;Applies coloring based on the inverted theme color.

```HtmlHelper
   @(Html.Kendo().Badge()
        .Name("badge")
        .Text("user")
        .ThemeColor(BadgeColor.Primary)
    )
```
{% if site.core %}
```TagHelper
    <kendo-badge name="badge"
        text="user"
        theme-color="BadgeColor.Primary">
    </kendo-badge>
```
{% endif %}

### Size

The `Size` option allows you to set a predefined size for the Badge. The `Size` property can be configured by using the `BadgeSize` enumeration. The available values are:

- `Small`
- `Medium`
- `Large`

> When not explicitly set, the applied theme controls the default size.

```HtmlHelper
    @(Html.Kendo().Badge()
        .Name("badge")
        .Text("JS")
        .Size(BadgeSize.Large)
    )
```
{% if site.core %}
```TagHelper
    <kendo-badge name="badge"
        text="JS"
        size="BadgeSize.Large">
    </kendo-badge>
```
{% endif %}

### FillMode

The `FillMode` specifies how the theme colors are applied to the component. The available options are:

- `Solid`
- `Outline`

> When not explicitly set, the applied theme controls the default fill mode.

```HtmlHelper
    @(Html.Kendo().Badge()
        .Name("badge")
        .Text("JS")
        .FillMode(BadgeFill.Outline)
    )
```
{% if site.core %}
```TagHelper
    <kendo-badge name="badge"
        text="JS"
        fill-mode="BadgeFill.Outline">
    </kendo-badge>
```
{% endif %}

## See Also

* [Badge Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/badge)
