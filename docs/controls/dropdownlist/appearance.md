---
title: Appearance
page_title: jQuery DropDownList Documentation - Appearance
description: "Learn how to apply different styling options to the DropDownList widget."
slug: appearance_kendoui_dropdownlist_widget
position: 9
---

# Appearance

In this article, you will find information about the styling options and rendering of the Kendo UI DropDownList.

For a live example, visit the [Appearance Demo of the DropDownList](https://demos.telerik.com/kendo-ui/dropdownlist/appearance).

## Options

The Kendo UI DropDownList supports the following styling options:

- [`size`](#size)—configures the overall size of the component.
- [`rounded`](#rounded)—configures the border radius for the tags.
- [`fillMode`](#fillMode)—controls how the color is applied.

### Size

The `size` option controls how big or small the DropDownList component looks. The structure of the class is `k-picker-{size}`.

The following values are available for the [`size`](/api/javascript/ui/dropdownlist/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The default size value is `medium` and it is applied to the `span` wrapping element through the `k-picker-md` class.

The example below shows a basic configuration and how to set `size` to "large":

```dojo
<input id="dropdownlist" />
<script>
    $("#dropdownlist").kendoDropDownList({
      size: "large"
    });
</script>
```

Below is the HTML that is affected from the configuration. The changes are applied to the `span.k-dropdownlist` wrapping element:

```html
<span class="k-dropdownlist k-picker k-picker-lg">
    ...
</span>
```

### Rounded

The `rounded` option controls how much border radius is applied to the tags for the selected items in the widget. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/dropdownlist/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—ellipse-like border radius
- `none`—unset

The default value is `medium` and it is applied to the `span.k-dropdownlist` wrapping element through the `k-rounded-md` class.

The example below shows a basic DropDownList configuration and how to set `rounded` to "full":

```dojo
<input id="dropdownlist" />
<script>
    $("#dropdownlist").kendoDropDownList({
      rounded: "full"
    });
</script>
```

The changes are applied to the `span.k-dropdownlist` wrapping element:

```html
<span class="k-dropdownlist k-picker k-rounded-full">
    ...
</span>
```

### FillMode

The `fillMode` option controls how the color is applied. The structure of the class is `k-picker-{fillMode}`.

The following values are available for the [`fillMode`](/api/javascript/ui/dropdownlist/configuration/fillMode) option:

- `solid`
- `flat`
- `outline`
- `none`

The default value is `solid` and it is applied to the `span.k-dropdownlist` wrapping element through the `k-picker-solid` class.

The example below shows a basic DropDownList configuration and how to set `fillMode` to "outline":

```dojo
<input id="dropdownlist" />
<script>
    $("#dropdownlist").kendoDropDownList({
      fillMode: "outline"
    });
</script>
```

The changes are applied to the `span.k-dropdownlist` wrapping element:

```html
<span class="k-dropdownlist k-picker k-picker-outline">
    ...
</span>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the DropDownList](https://demos.telerik.com/kendo-ui/dropdownlist/appearance)
* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
