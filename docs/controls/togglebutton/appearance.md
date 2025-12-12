---
title: Appearance
page_title: Appearance
description: "Learn how to customize the appearance of the Kendo UI ToggleButton for jQuery."
components: ["togglebutton"]
slug: appearance_kendoui_togglebutton
position: 2
---

# Appearance

The ToggleButton provides predefined appearance options such as different sizes, border radiuses, fill modes, and theme colors.

For a complete example, refer to the [Appearance Demo of the ToggleButton](https://demos.telerik.com/kendo-ui/togglebutton/appearance).

## Options

The ToggleButton provides the following methods for styling:

- [`size`](#size)—configures the overall size of the component.
- [`themeColor`](#themecolor)—configures what color will be applied to the component.
- [`fillMode`](#fillmode)—defines how the color is applied to the ToggleButton.
- [`rounded`](#rounded)—determines the border radius of the component.

### Size

To control the size of the ToggleButton, configure the `size` option with any of the following values:

- `small`
- `medium` - the default size
- `large`
- `none`

```dojo
    <button id="togglebutton">
        Toggle Button
    </button>
    <script>
        $(document).ready(function(){
            $("#togglebutton").kendoToggleButton({
                size: "medium"
            })
        })
    </script>
```

The structure of the class is `k-button-{size}`. The default size value is `Medium` and is applied to the rendered  element through the `k-button-md` class.

```html
    <button class="k-button k-button-md" >
    </button>
```

### FillMode

The `fillMode` configuration specifies how the color is applied to the component. The default ToggleButton fill mode is `solid`.


The following options are available for the `fillMode` configuration:

- `solid`
- `outline`
- `flat`
- `link`
- `none`

```dojo
    <button id="togglebutton">
        Toggle Button
    </button>
    <script>
        $(document).ready(function(){
            $("#togglebutton").kendoToggleButton({
                fillMode: "solid"
            })
        })
    </script>
```

The structure of the Html class is `k-button-{fillMode}`. The default `fillMode` value is `Solid` and is applied to the rendered element through the `k-button-solid` class.

```html
<button class="k-button  k-button-solid" >
</button>
```

### ThemeColor

The `themeColor` configuration provides a variety of colors that can be applied to the ToggleButton. The available options are:

- `base`
- `primary`
- `secondary`
- `tertiary`
- `info`
- `success`
- `warning`
- `error`
- `dark`
- `light`
- `inverse`

```dojo
    <button id="togglebutton">
        Toggle Button
    </button>
    <script>
        $(document).ready(function(){
            $("#togglebutton").kendoToggleButton({
                themeColor: "base"
            })
        })
    </script>
```

The default `themeColor` value is `base`. A ToggleButton with default `fillMode` and `themeColor` settings will have the `k-button-solid-base` class applied.

```html
    <!-- A ToggleButton with default fillMode and themeColor settings -->
    <div class="k-button k-button-solid k-button-solid-base" >
    </div>
```

### Rounded

The border radius of the ToggleButton can be customized through the `rounded` option. The default option is `medium`.

The following values are available for the `rounded` option:

- `small`
- `medium`
- `large`
- `full`
- `none`

```dojo
    <button id="togglebutton">
        Toggle Button
    </button>
    <script>
        $(document).ready(function(){
            $("#togglebutton").kendoToggleButton({
                rounded: "medium"
            })
        })
    </script>
```

The structure of the class is `k-rounded-{size}`. The default rounded value of the ToggleButton is `medium` and is applied to the rendered element through the `k-rounded-md` class.

```html
    <button class="k-button k-rounded-md" >
    </button>
```

## See Also

* [Appearance of the ToggleButton HtmlHelper for Kendo UI for jQuery (Demo)](https://demos.telerik.com/kendo-ui/togglebutton/appearance)
* [ToggleButton Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/togglebutton)