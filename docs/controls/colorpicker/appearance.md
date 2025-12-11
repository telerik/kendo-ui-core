---
title: Appearance
page_title: jQuery ColorPicker Documentation - Appearance
description: "Learn how to apply different styling options to the ColorPicker component."
components: ["colorpicker"]
slug: appearance_kendoui_colorpicker_widget
position: 6
---

# Appearance

In this article, you will find information about the styling options and rendering of the Kendo UI ColorPicker.

For a live example, visit the [Appearance Demo of the ColorPicker](https://demos.telerik.com/kendo-ui/colorpicker/appearance).

## Options

The Kendo UI ColorPicker supports the following styling options:

- [`size`](#size)—configures the overall size of the component.
- [`rounded`](#rounded)—configures the border radius for the tags.
- [`fillMode`](#fillMode)—controls how the color is applied.

### Size

The `size` option controls how big or small the ColorPicker component looks. The structure of the class is `k-picker-{size}`.

The following values are available for the [`size`](/api/javascript/ui/colorpicker/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The default size value is `medium` and it is applied to the `span` wrapping element through the `k-picker-md` class.

The example below shows a basic configuration and how to set `size` to "large":

```dojo
<input id="colorpicker" />
<script>
    $("#colorpicker").kendoColorPicker({
      size: "large"
    });
</script>
```

Below is the HTML that is affected from the configuration. The changes are applied to the `span.k-colorpicker` wrapping element:

```html
<span class="k-colorpicker k-picker k-picker-lg">
    ...
</span>
```

### Rounded

The `rounded` option controls how much border radius is applied to the tags for the selected items in the component. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/colorpicker/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—ellipse-like border radius
- `none`—unset

The default value is `medium` and it is applied to the `span.k-colorpicker` wrapping element through the `k-rounded-md` class.

The example below shows a basic ColorPicker configuration and how to set `rounded` to "full":

```dojo
<input id="colorpicker" />
<script>
    $("#colorpicker").kendoColorPicker({
      rounded: "full"
    });
</script>
```
The changes are applied to the `span.k-colorpicker` wrapping element:

```html
<span class="k-colorpicker k-picker k-rounded-full">
    ...
</span>
```

### FillMode

The `fillMode` option controls how the color is applied. The structure of the class is `k-picker-{fillMode}`.

The following values are available for the [`fillMode`](/api/javascript/ui/colorpicker/configuration/fillMode) option:

- `solid`
- `flat`
- `outline`
- `none`

The default value is `solid` and it is applied to the `span.k-colorpicker` wrapping element through the `k-picker-solid` class.

The example below shows a basic ColorPicker configuration and how to set `fillMode` to "outline":

```dojo
<input id="colorpicker" />
<script>
    $("#colorpicker").kendoColorPicker({
      fillMode: "outline"
    });
</script>
```
The changes are applied to the `span.k-colorpicker` wrapping element:

```html
<span class="k-colorpicker k-input k-input-outline">
    ...
</span>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the ColorPicker](https://demos.telerik.com/kendo-ui/colorpicker/appearance)
* [JavaScript API Reference of the ColorPicker](/api/javascript/ui/colorpicker)
