---
title: Appearance
page_title: jQuery Avatar Documentation - Avatar Appearance
description: "Get started with the jQuery Avatar by Kendo UI and learn how to customize the appearance of the widget."
slug: appearance_kendoui_avatar_widget
position: 2
---

# Avatar Appearance

The Аvatar allows you to set different styles based on its content.

## Rounding and Type

The available [`types`](/api/javascript/ui/avatar/configuration/type) are:

- Image—By passing an `img` element as child element of the Avatar.
- Text avatar (Default)—By passing a string that will be rendered as text (initials).
- Icon avatar—By passing an `icon` to the Avatar component.

All of the types can be rendered in a different shape by setting the `rounded` property.

The available [`rounded`](/api/javascript/ui/avatar/configuration/rounded) values are:

- "full" (default)—Renders a circle shape avatar.
- "small"—Renders an avatar with small border radius.
- "medium"—Renders an avatar with medium border radius.
- "large"—Renders an avatar with large border radius.
- "none"—Renders an avatar with no border radius (square avatar).

The following example demonstrates the `type` and `rounded` options of the Avatar:

```dojo
    <div id="avatar"></div>

    <script>
        $(document).ready(function(){
            $("#avatar").kendoAvatar({
                rounded: null,
                type: 'text',
                text: "IMG"
            });
        });
    </script>
```

## Theme Color

The Аvatar allows you to specify predefined theme colors.

The available [themeColor](/api/javascript/ui/avatar/configuration/themeColor) values are:

- "primary" (Default)—Applies coloring based on the primary theme color.
- "base"-Applies base theme color.
- "secondary"—Applies coloring based on the secondary theme color.
- "tertiary"—Applies coloring based on the tertiary theme color.
- "inherit"—Applies the inherited coloring value.
- "info"—Applies coloring based on the info theme color.
- "success"—Applies coloring based on the success theme color.
- "warning"—Applies coloring based on the warning theme color.
- "error"—Applies coloring based on the error theme color.
- "dark"—Applies coloring based on the dark theme color.
- "light"—Applies coloring based on the light theme color.
- "inverse"—Applies coloring based on the inverted theme color.
- "none"-will apply no theme color class.

```dojo
    <div id="avatar"></div>

    <script>
        $(document).ready(function(){
            $("#avatar").kendoAvatar({
                themeColor: 'success'
            });
        });
    </script>
```

## Size

The Avatar allows you to set predefined or custom sizes. To specify a predefined size, set the [`size`](/api/javascript/ui/avatar/configuration/size) property.

The available [`size`](/api/javascript/ui/avatar/configuration/size) values are:

- "small"
- "medium" (Default)
- "large"
- "none"

To specify a custom avatar size, use the [style](/api/javascript/ui/avatar/configuration/style) property.

```dojo
	<p>Avatar Predefined Sizes</p>
    <div id="avatar"></div>

    <script>
        $(document).ready(function(){
            $("#avatar").kendoAvatar({
                size: 'large'
            });
        });
    </script>
```

## FillMode

The Avatar enables you to set styling options and create solid or outline avatars by setting the [`fillMode`](/api/javascript/ui/avatar/configuration/fillMode) property.

The available [fillMode](/api/javascript/ui/avatar/configuration/fillMode) values are:

- "solid" (Default)
- "outline"
- "none"

An additional border around the content of an outline avatar can be rendered by setting the [`border`](/api/javascript/ui/avatar/configuration/border) property to true.

```dojo
    <div id="avatar"></div>

    <script>
        $(document).ready(function(){
            $("#avatar").kendoAvatar({
                fillMode: 'outline'
            });
        });
    </script>
```

## Border

The Avatar allows you to specify whether or not to render an additional border around its content by using the [border](/api/javascript/ui/avatar/configuration/border) property. By default, the border is set to `false`.

```dojo
    <div id="avatar"></div>

    <script>
        $(document).ready(function(){
            $("#avatar").kendoAvatar({
                border: true
            });
        });
    </script>
```

## See Also

* [Basic Usage of the Avatar (Demo)](https://demos.telerik.com/kendo-ui/avatar/index)
* [JavaScript API Reference of the Avatar](/api/javascript/ui/avatar)
