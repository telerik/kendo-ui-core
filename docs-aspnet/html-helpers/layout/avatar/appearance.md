---
title: Appearance
page_title: Avatar Appearance
description: "Learn how to customize the appearance of the widget Telerik UI Avatar HtmlHelper for {{ site.framework }}."
slug: appearance_avatar_aspnetcore
position: 2
---

# Avatar Appearance

The Аvatar allows you to set different styles based on its content.

## Type

The `Type` can be configured via the `AvatarType` enumeration. The available `AvatarType` values are:

- `Text` (Default) — By passing a string that will be rendered as text (initials).
- `Image` — By passing an `img` element as child element of the Avatar.
- `Icon` — By passing an `icon` to the Avatar component.

The following example demonstrates the `Type` option of the Avatar:

```HtmlHelper
    @(Html.Kendo().Avatar()
        .Name("avatar")
        .Type(AvatarType.Text)
        .Text("IMG")
    )
```
{% if site.core %}
```TagHelper
    <kendo-avatar name="avatar"
        type="AvatarType.Text"
        text="IMG">
    </kendo-avatar>
```
{% endif %}

All of the types can be rendered in a different shape by setting the `Rounded` property.

## Rounded

The `Rounded` property can be configured via the `Rounded` enumeration. The available values are:

- `Full` (default) — Renders a circle shape avatar.
- `Small` — Renders an avatar with small border radius.
- `Medium` — Renders an avatar with meduim border radius.
- `Large` — Renders an avatar with large border radius.
- `None` — Renders an avatar with no border radius (square avatar).

The following example demonstrates the `Rounded` option of the Avatar:

```HtmlHelper
    @(Html.Kendo().Avatar()
        .Name("avatar")
        .Text("IMG")
        .Rounded(Rounded.Large)
    )
```
{% if site.core %}
```TagHelper
    <kendo-avatar name="avatar"
        text="IMG"
        rounded="Rounded.Large">
    </kendo-avatar>
```
{% endif %}

## Theme Color

The Аvatar allows you to specify predefined theme colors.

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
   @(Html.Kendo().Avatar()
        .Name("avatar")
        .Type(AvatarType.Icon)
        .Icon("user")
        .ThemeColor(ThemeColor.Primary)
    )
```
{% if site.core %}
```TagHelper
    <kendo-avatar name="avatar"
        type="AvatarType.Icon"
        icon="user"
        theme-color="ThemeColor.Primary">
    </kendo-avatar>
```
{% endif %}

## Size

The Avatar allows you to set predefined or custom sizes. The `Size` property can be configured via the `ComponentSize`enumeration. The available values are:

- `Small`
- `Medium` (Default)
- `Large`
- `None`

```HtmlHelper
    @(Html.Kendo().Avatar()
        .Name("avatar")
        .Type(AvatarType.Text)
        .Text("JS")
        .Size(ComponentSize.Large)
    )
```
{% if site.core %}
```TagHelper
    <kendo-avatar name="avatar"
        type="AvatarType.Text"
        text="JS"
        size="ComponentSize.Large">
    </kendo-avatar>
```
{% endif %}

## FillMode

The Avatar enables you to set styling options and create solid or outline avatars by setting the `AvatarFillMode`. The available `AvatarFillMode` values are:

- `Solid` (Default)
- `Outline`
- `None`

```HtmlHelper
    @(Html.Kendo().Avatar()
        .Name("avatar")
        .Type(AvatarType.Text)
        .Text("JS")
        .FillMode(AvatarFillMode.Outline)
    )
```
{% if site.core %}
```TagHelper
    <kendo-avatar name="avatar"
        type="AvatarType.Text"
        text="JS"
        fill-mode="AvatarFillMode.Outline">
    </kendo-avatar>
```
{% endif %}

## Border

The Avatar allows you to specify whether or not to render an additional border around its content by using the `Border` property. By default, the border is set to `false`.

```HtmlHelper
    @(Html.Kendo().Avatar()
        .Name("avatar")
        .Type(AvatarType.Text)
        .Text("MJ")
        .Border(true)
    )
```
{% if site.core %}
```TagHelper
    <kendo-avatar name="avatar" border="true"
        type="AvatarType.Text"
        text="MJ">
    </kendo-avatar>
```
{% endif %}

## See Also

* [Appearance of the Avatar (Demo)](https://demos.telerik.com/{{ site.platform }}/avatar/appearance)
* [JavaScript API Reference of the Avatar](https://docs.telerik.com/kendo-ui/api/javascript/ui/avatar)
