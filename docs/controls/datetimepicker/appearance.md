---
title: Appearance
page_title: jQuery DateTimePicker Documentation - DateTimePicker Appearance
description: "Learn how to apply different styling options to the DateTimePicker widget."
components: ["datetimepicker"]
slug: appearance_kendoui_datetimepicker_widget
position: 3
---

# Appearance

In this article, you will find information about the styling options and rendering of the Kendo UI DateTimePicker.

For a live example, visit the [Appearance Demo of the DateTimePicker](https://demos.telerik.com/kendo-ui/datetimepicker/appearance).

## Options

The Kendo UI DateTimePicker supports the following styling options:

- [`size`](#size)—configures the overall size of the component.
- [`rounded`](#rounded)—configures the border radius of the component.
- [`fillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `size` option controls how big or small the rendered DateTimePicker looks. The structure of the class is `k-input-{size}`.

The following values are available for the [`size`](/api/javascript/ui/datetimepicker/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The following example demonstrates how to configure the `size` of the component through the widget configuration:

```dojo
<input id="datetimepicker" />
<script>
$("#datetimepicker").kendoDateTimePicker({
    size: "medium"
});
</script>
```

The default size value is `medium` and it is applied to the wrapping span element through the `k-input-md` class.

```html
<span class="k-datetimepicker k-input k-input-md">
</span>
```

### Rounded

The `rounded` option controls how much border radius is applied to the rendered DateTimePicker. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/datetimepicker/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—largest border radius
- `none`—unset

The following example demonstrates how to configure the `rounded` of the component through the widget configuration:

```dojo
<input id="datetimepicker" />
<script>
$("#datetimepicker").kendoDateTimePicker({
    rounded: "medium"
});
</script>
```

The default rounded value is `medium` and it is applied to the wrapping span element through the `k-rounded-md` class.

```html
<span class="k-datetimepicker k-input k-rounded-md">
</span>
```

### FillMode

The `fillMode` option controls the way the color is applied to the rendered DateTimePicker. The structure of the class is `k-input-{fillMode}`.

The following values are available for the [`fillMode`](/api/javascript/ui/datetimepicker/configuration/fillmode) option:

- `solid`
- `flat`
- `outline`
- `none`

The following example demonstrates how to configure the `size` of the component through the widget configuration:

```dojo
<input id="datetimepicker" />
<script>
$("#datetimepicker").kendoDateTimePicker({
    fillMode: "solid"
});
</script>
```

The default fillMode value is `solid` and it is applied to the wrapping span element through the `k-input-solid` class.

```html
<span class="k-datetimepicker k-input k-input-solid">
</span>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the DateTimePicker](https://demos.telerik.com/kendo-ui/datetimepicker/appearance)
* [JavaScript API Reference of the DateTimePicker](/api/javascript/ui/datetimepicker)
