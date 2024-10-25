---
title: Avatar
page_title: Configuration of Kendo UI Avatar
description: How to initialize an Avatar UI widget and configure its properties.
res_type: api
---

# kendo.ui.Avatar

Represents the Kendo UI Avatar widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### alt `String`

A text description of the Avatar image. When `type="image"` is configured this value will be used to populate the `alt` attribute of the `<img>` element.

#### Example

    <div id="avatar"></div>
    <script>
        $("#avatar").kendoAvatar({
            type: "image",
            image: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            alt: "John Doe"
        });
    </script>

### border `Boolean` *(default: false)*

Specifies whether the avatar should render border around its container element. Default is `false`.

#### Example

    <div id="avatar"></div>
    <script>
        $("#avatar").kendoAvatar({
            text: "IG",
            border: true,
            fill: "outline"
        });
    </script>

### className `String`

Adds additional custom classes to the Avatar container element.

#### Example

    <div id="avatar"></div>
    <script>
        $("#avatar").kendoAvatar({
            text: "IG",
            className: "custom this"
        });
    </script>

### fillMode `String` *(default: 'solid')*

Specifies the appearance fill style of the Avatar. The available values are `"outline"`, `"solid"` (default), and `"none"`.

#### Example

    <div id="avatar"></div>
    <script>
        $("#avatar").kendoAvatar({
            text: "IG",
            border: true,
            fillMode: "outline"
        });
    </script>

### icon `String`

Specifies an icon name to be used if the avatar `type` is set to `icon`. For a list of available icon names, please refer to the [Web Font Icons article](/kendo-ui/styles-and-layout/icons-web).

#### Example

    <div id="avatar"></div>
    <script>
        $("#avatar").kendoAvatar({
            type: "icon",
            icon: "file-config"
        });
    </script>

### image `String`

Specifies an image URL or dataURL that would be used to populate the `src` attribute of the avatar `<img>` element.

#### Example

    <div id="avatar"></div>
    <script>
        $("#avatar").kendoAvatar({
            type: "image",
            image: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            alt: "John Doe"
        });
    </script>

### rounded `String` *(default: 'full')*

Could be one of the predefined shapes available for the widget container: `"full"` (default), `"small"`, `"medium"`, `"large"`, or `"none"`.

#### Example

    <div id="avatar"></div>
    <script>
        $("#avatar").kendoAvatar({
            text: "IG",
            rounded: "medium"
        });
    </script>

### size `String` *(default: 'medium')*

The Avatar allows you to set predefined sizes. The available size values are `"small"`, `"medium"` (default), `"large"`, or `"none"`.

#### Example

    <div id="avatar"></div>
    <script>
        $("#avatar").kendoAvatar({
            text: "IG",
            size: "large"
        });
    </script>

### style `Object`

Sets additional CSS styles to the Avatar container element.

#### Example

    <div id="avatar"></div>
    <script>
        $("#avatar").kendoAvatar({
            text: "MG",
            style: {
                "background-color": "red"
            }
        });
    </script>

### text `String`

Will be used to populated Avatar content when its type is set to `text`

#### Example

    <div id="avatar"></div>
    <script>
        $("#avatar").kendoAvatar({
            text: "MG"
        });
    </script>


### themeColor `String` *(default: 'primary')*

The Avatar allows you to specify predefined theme colors for background of its container. The available `themeColor` values are:
    - "primary" (Default) - Applies coloring based on primary theme color.
    - "base" - Applies base theme color.
    - "secondary" - Applies coloring based on secondary theme color.
    - "tertiary" - Applies coloring based on tertiary theme color.
    - "inherit" - Applies inherited coloring value.
    - "info" - Applies coloring based on info theme color.
    - "success" - Applies coloring based on success theme color.
    - "warning" - Applies coloring based on warning theme color.
    - "error" - Applies coloring based on error theme color.
    - "dark" - Applies coloring based on dark theme color.
    - "light" - Applies coloring based on light theme color.
    - "inverse" - Applies coloring based on inverted theme color.
    - "none" - Does not apply theme color class.

#### Example

    <div id="avatar"></div>
    <script>
        $("#avatar").kendoAvatar({
            text: "IG",
            themeColor: "warning"
        });
    </script>

### type `String` *(default: 'text')*

Could be one of the three predefined types for the widget: `icon`, `image`, or `text` (default).

#### Example

    <div id="avatar"></div>
    <script>
        $("#avatar").kendoAvatar({
            type: "image",
            image: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
            alt: "John Doe"
        });
    </script>
