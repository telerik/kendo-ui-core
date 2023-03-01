---
title: Appearance
page_title: jQuery FloatingActionButton Documentation
description: "Learn how to customize the jQuery FloatingActionButton by Kendo UI by setting its size, shape, color, icon and text."
slug: appearance_floatingactionbutton_widget
position: 3
---

# Appearance 

> As of Kendo UI R1 2022, the FloatingActionButton widget uses brand new rendering.

In this article, you will find information about the new rendering of the Kendo UI FloatingActionButton.

For additional information regarding the decision behind these changes, visit the [Styling Overview]({% slug components_rendering_overview %}) article.

For a live example, visit the [Appearance Demo of the FloatingActionButton](https://demos.telerik.com/kendo-ui/floatingactionbutton/appearance).


## Options

The Kendo UI FloatingActionButton supports the following styling options:

- [`size`](#size)—configures the overall size of the component.
- [`shape`](#shape)—configures the shape of the component.
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

The following example demonstrates how to configure the `size` of the component through the widget configuration:

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

### Shape

The `shape` option controls if the FloatingActionButton has square shape or not. The structure of the class is `k-fab-{shape}`.

The following values are available for the [`shape`](/api/javascript/ui/floatingactionbutton/configuration/shape) option:

- `rectangle`
- `square`

The following example demonstrates how to configure the `shape` of the component through the widget configuration:

```dojo
<button id="fab"></button>
<script>
$("#fab").kendoFloatingActionButton({
    shape: "square"
});
</script>
```

By default, the FloatingActionButton will have a rectangular shape. The default shape will be applied to the button element through the `k-fab-rectangle` class.

```html
<button class="k-button k-fab-rectangle" >
</button>
```

### FillMode

The `fillMode` option controls the way the color is applied to the rendered FloatingActionButton. The structure of the class is `k-fab-{fillMode}`.

You can set the [`fillMode`](/api/javascript/ui/floatingactionbutton/configuration/fillmode) either to `solid` or to *null*. 

The following example demonstrates how to configure the `fillMode` of the component through the widget configuration:

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
- `none`

The default `themeColor` value is `primary`. A FloatingActionButton with default `fillMode` and `themeColor` will have `k-fab-solid-primary` class applied.

```html
<!-- FloatingActionButton with default fillMode and themeColor -->
<button class="k-fab k-fab-solid-primary k-fab-solid" >
</button>

<!-- FloatingActionButton with 'primary' themeColor and fillMode set to null -->
<button class="k-fab" >
</button>

<!-- FloatingActionButton with `solid` fillMode and `success` themeColor -->
<button class="k-fab k-fab-solid-success k-fab-solid" >
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

The example below demonstrates how to configure the `rounded` of the component through the widget configuration:

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

## Old vs New Rendering

- Previously the `themeColor` of the FloatingActionButton was applied using the `k-fab-{themeColor}` class. 

```html
 <!-- OLD -->
<button id="fab" class="k-fab k-fab-primary k-fab-lg k-fab-pill">
	<span class="k-fab-icon k-icon k-i-home"></span>
	<span class="k-fab-text">Home</span>
</button>
```

- Currently, the `themeColor` is applied using the `k-fab-{fillMode}-{themeColor}` class. Additionally, classes for `fillMode` and `rounded` are applied to the button element. 

```html
<!-- NEW -->
<button id="fab" class="k-fab k-fab-solid-primary k-fab-solid k-fab-rectangle k-fab-md k-rounded-full">
	<span class="k-fab-icon k-icon k-i-home"></span>
	<span class="k-fab-text">Home</span>
</button>
```


## Visual Backwards Compatibility


To achieve the same look and feel as the old rendering, you must update the element references.

> When you use a LESS theme, the new styling and rendering supports only the [default options](#options).

The following example showcases how to customize the styles of the **FloatingActionButton** depending on the selected [themeColor](#themeColor) in both the new, and the old rendering:

```dojo
    <!-- Open the example in Dojo and select version prior to 2022 R1 to see the difference in the appearance -->
    <button id="fab-primary"></button>
    <button id="fab-secondary"></button>
    <button id="fab-tertiary"></button>

    <script>
      $('#fab-primary').kendoFloatingActionButton({
        themeColor: 'primary',
        icon: 'home',
        align: 'top start'
      });
      $('#fab-secondary').kendoFloatingActionButton({
        themeColor: 'secondary',
        icon: 'home',
        align: 'top center'
      });
      $('#fab-tertiary').kendoFloatingActionButton({
        themeColor: 'tertiary',
        icon: 'home',
        align: 'top end'
      });
    </script>

    <style>
      /*  NEW RENDERING */
      /*  The style below will works with versions R1 2022 and later */      

      #fab-primary.k-fab-solid-primary{ /* applies border to primary FAB in the new rendering */
        border: 2px solid yellow !important;
      }

      #fab-secondary.k-fab-solid-secondary{ /* applies border to secondary FAB in the new rendering */
        border: 2px solid fuchsia !important;
      }

      #fab-tertiary.k-fab-solid-tertiary{ /* applies border to tertiary FAB in the new rendering */
        border: 2px solid lime !important;
      }


      /*  OLD RENDERING */
      /*  The style below will works with versions prior to R1 2022 */

      #fab-primary.k-fab-primary{ /* applies border to primary FAB in the old rendering */
        border: 2px solid red !important;
      }

      #fab-secondary.k-fab-secondary{ /* applies border to secondary FAB in the old rendering */
        border: 2px solid blue !important;
      }

      #fab-tertiary.k-fab-tertiary{ /* applies border to tertiary FAB in the old rendering */
        border: 2px solid green !important;
      }
    </style>
```

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
