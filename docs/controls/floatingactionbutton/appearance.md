---
title: Appearance
page_title: jQuery FloatingActionButton Documentation
description: "Learn how to customize the jQuery FloatingActionButton by Kendo UI by setting its size, color, icon and text."
components: ["floatingactionbutton"]
slug: appearance_floatingactionbutton_widget
position: 4
---

# Appearance

In this article, you will find information about the styling options and rendering of the Kendo UI FloatingActionButton.

For a live example, visit the [Appearance Demo of the FloatingActionButton](https://demos.telerik.com/kendo-ui/floatingactionbutton/appearance).

## Options

The Kendo UI FloatingActionButton supports the following styling options:

- [`size`](#size)—configures the overall size of the component.
- [`fillMode`](#fillmode)—configures how the color is applied to the component.
- [`themeColor`](#themecolor)—configures what color will be applied to the component.
- [`rounded`](#rounded)—configures the border radius of the component.


### Size

The `size` option controls how big or small the rendered FloatingActionButton looks. The structure of the class is `k-fab-{size}`.

The following values are available for the [`size`](/api/javascript/ui/floatingactionbutton/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The following example demonstrates how to configure the `size` of the component through the component configuration:

```dojo
<button id="fab"></button>
<script>
$("#fab").kendoFloatingActionButton({
    size: "large"
});
</script>
```

The default size value is `medium` and it is applied to the wrapping span element through the `k-fab-md` class.

```html
<button class="k-fab k-fab-sm">
</button>
```

### FillMode

The `fillMode` option controls the way the color is applied to the rendered FloatingActionButton. The structure of the class is `k-fab-{fillMode}`.

You can set the [`fillMode`](/api/javascript/ui/floatingactionbutton/configuration/fillmode) either to `solid` or to *null*.

The following example demonstrates how to configure the `fillMode` of the component through the component configuration:

```dojo
<input id="fab" />
<script>
$("#fab").kendoFloatingActionButton({
    fillMode: null
});
</script>
```

The default fillMode value is `solid` and it is applied to the button element through the `k-fab-solid` class.

```html
<button class="k-fab k-fab-solid" >
</button>
```

### ThemeColor

The `themeColor` option controls the color that will be applied to the rendered FloatingActionButton. As applying `themeColor` is closely related to the `fillMode`, the structure of the class name for the `themeColor` is composite - `k-fab-{fillMode}-{themeColor}`.

The following values are available for the [`themeColor`](/api/javascript/ui/floatingactionbutton/configuration/themecolor) option:

- `base`
- `primary`
- `secondary`
- `tertiary`

The default `themeColor` value is `primary`. A FloatingActionButton with default `fillMode` and `themeColor` will have `k-fab-primary` class applied.

```html
<!-- FloatingActionButton with default fillMode and themeColor -->
<button class="k-fab k-fab-primary k-fab-solid" >
</button>

<!-- FloatingActionButton with 'primary' themeColor and fillMode set to null -->
<button class="k-fab" >
</button>

<!-- FloatingActionButton with `solid` fillMode and `tertiary` themeColor -->
<button class="k-fab k-fab-tertiary k-fab-solid" >
</button>
```

### Rounded

The `rounded` option controls how much border radius is applied to the rendered FloatingActionButton. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/floatingactionbutton/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—largest border radius
- `none`—unset

The example below demonstrates how to configure the `rounded` of the component through the component configuration:

```dojo
<input id="fab" />
<script>
$("#fab").kendoFloatingActionButton({
    rounded: "large"
});
</script>
```

The default rounded value is `full` and it is applied to the button element through the `k-rounded-full` class.

```html
<button class="k-fab k-rounded-full" >
</button>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## Best Practices

The Material Design guidelines dictate that:

* When you configure the FloatingActionButton to display additional related actions (speed dial actions), you should configure only an icon for the button, without a label. Use labels to display additional information for the related actions.

* If the application requires an icon and a label for the Kendo UI FloatingActionButton, consider omitting the additional actions.

```
    <div id="fab"></div>

    <script>
        $(document).ready(function () {
            $("#fab").kendoFloatingActionButton({
                icon:"plus",
                text: "Add To Cart"
            });
        });
    </script>
```

## Icons

The [`icon`](/api/javascript/ui/floatingactionbutton/configuration/icon) configuration option specifies the name of an icon. The selected icon must be available in the Kendo UI theme that is rendered by the FloatingActionButton. For more details on the available Web Font icons see [`the Web Font Icons article`](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web).

```
    <div id="fab"></div>

    <script>
        $(document).ready(function () {
            $("#fab").kendoFloatingActionButton({
                icon:"plus",
                items:[
                    {icon:"star",label:"Add Rating"},
                    {icon: "pencil", label:"Add Comment"}
                ]
            });
        });
    </script>
```

## See Also

* [Basic Usage Demo of the FloatingActionButton](https://demos.telerik.com/kendo-ui/floatingactionbutton/basic-usage)
* [Appearance Demo of the FloatingActionButton](https://demos.telerik.com/kendo-ui/floatingactionbutton/appearance)
* [JavaScript API Reference of the FloatingActionButton](/api/javascript/ui/floatingactionbutton)
