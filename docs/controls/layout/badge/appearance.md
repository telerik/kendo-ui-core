---
title: Appearance
page_title: jQuery Badge Documentation - Badge Appearance
description: "Get started with the jQuery Badge by Kendo UI and learn how to customize the appearance of the widget."
slug: appearance_kendoui_badge_widget
position: 2
---

# Badge Appearance

The Badge allows you to set different styles based on its content.

## Rounded

The available [`rounded`](/api/javascript/ui/badge/configuration/rounded) values are:

- "full" (default)—Renders a circle shape badge.
- "small"—Renders a badge with small border radius.
- "medium"—Renders a badge with medium border radius.
- "large"—Renders a badge with large border radius.
- "none"—Renders a badge with no border radius.

The following example demonstrates the `rounded` option of the Badge:

```dojo
    <a class="k-button"><span id="badge">42</span></a>

    <script>
        $(document).ready(function(){
            $("#badge").kendoBadge({
                rounded: "large"
            });
        });
    </script>
```

## Theme Color

The Badge allows you to specify predefined theme colors.

The available [themeColor](/api/javascript/ui/badge/configuration/themeColor) values are:

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
    <a class="k-button"><span id="badge">42</span></a>

    <script>
        $(document).ready(function(){
            $("#badge").kendoBadge({
                themeColor: 'success'
            });
        });
    </script>
```

## Size

The Badge allows you to configure the size. To specify a size, set the [`size`](/api/javascript/ui/badge/configuration/size) property.

The available [`size`](/api/javascript/ui/badge/configuration/size) values are:

- "small"
- "medium" (Default)
- "large"
- "none"

The example below demonstrates how to set the `size` option to "large":

```dojo
    <a class="k-button"><span id="badge">42</span></a>

    <script>
        $(document).ready(function(){
            $("#badge").kendoBadge({
                size: 'large'
            });
        });
    </script>
```

## FillMode

The Badge enables you to set styling options and create solid or outline badges by setting the [`fill`](/api/javascript/ui/badge/configuration/fill) property.

The available [fill](/api/javascript/ui/badge/configuration/fill) values are:

- "solid" (Default)
- "outline"
- "none"

The example below demonstrates how to set the `fill` option to "outline":

```dojo
    <a class="k-button"><span id="badge">42</span></a>
    <script>
        $(document).ready(function(){
            $("#badge").kendoBadge({
                fill: 'outline'
            });
        });
    </script>
```

## See Also

* [Basic Usage of the Badge (Demo)](https://demos.telerik.com/kendo-ui/badge/index)
* [JavaScript API Reference of the Badge](/api/javascript/ui/badge)
