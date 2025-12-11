---
title: Appearance
page_title: jQuery DateRangePicker Documentation - DateRangePicker Appearance
description: "Learn how to apply different styling options to the DateRangePicker widget."
components: ["daterangepicker"]
slug: appearance_kendoui_daterangepicker_widget
position: 2
---

# Appearance

In this article, you will find information about the styling options and rendering of the Kendo UI DateRangePicker.

For a live example, visit the [Appearance Demo of the DateRangePicker](https://demos.telerik.com/kendo-ui/daterangepicker/appearance).

## Options

The Kendo UI DateRangePicker supports the following styling options:

- [`size`](#size)—configures the overall size of the component.
- [`fillMode`](#fillmode)—configures how the color is applied to the component.
- [`rounded`](#rounded)—configures the border radius of the component.

### Size

The `size` option controls how big or small the rendered `inputs` looks. The structure of the class is `k-input-{size}`.

The following values are available for the [`size`](/api/javascript/ui/daterangepicker/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The default size value is `medium` and it is applied to the wrapping span element through the `k-input-md` class.

```html
<span class="k-dateinput k-input k-input-md">
</span>
```

### Rounded

The `rounded` option controls the border radius of the rendered `inputs`. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rouned`](/api/javascript/ui/daterangepicker/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—ellipse-like border radius
- `none`—unset

The structure of the class is `k-rounded-{size}`.

The default rounded value is `medium` and it is applied to the wrapping spans element through the `k-rounded-md` class.

```html
<span class="k-dateinput k-input k-rounded-md">
</span>
```

### FillMode

The `fillMode` option controls the way the color is applied to the rendered `inputs`. The structure of the class is `k-input-{fillMode}`

The following values are available for the [`fillMode`](/api/javascript/ui/daterangepicker/configuration/fillmode) option:

- `solid`
- `flat`
- `outline`
- `none`

The default fillMode value is `solid` and it is applied to the wrapping span element through the `k-input-solid` class.

```html
<span class="k-dateinput k-input k-input-solid">
</span>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the DateRangePicker](https://demos.telerik.com/kendo-ui/daterangepicker/appearance)
* [JavaScript API Reference of the DateRangePicker](/api/javascript/ui/daterangepicker)
