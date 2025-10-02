---
title: Appearance
page_title: jQuery MultiSelect Documentation - MultiSelect Appearance
description: "Learn how to apply different styling options to the MultiSelect component."
slug: appearance_kendoui_multiselect_widget
position: 10
---

# Appearance

In this article, you will find information about the styling options and rendering of the Kendo UI MultiSelect.

For a live example, visit the [Appearance Demo of the MultiSelect](https://demos.telerik.com/kendo-ui/multiselect/appearance).

## Options

The Kendo UI MultiSelect supports the following styling options:

- [`size`](#size)—configures the overall size of the component.
- [`rounded`](#rounded)—configures the border radius for the tags.
- [`fillMode`](#fillMode)—controls how the color is applied.

### Size

The `size` option controls how big or small the `multiselect` looks. The structure of the class is `k-input-{size}`.

The following values are available for the [`size`](/api/javascript/ui/multiselect/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The default size value is `medium` and it is applied to the `span` wrapping element through the `k-input-md` class.

The example below shows a basic configuration and how to set `size` to "large":

```dojo
<select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
</select>
<script>
    $("#multiselect").kendoMultiSelect({
      size: "large"
    });
</script>
```

Below is the HTML that is affected from the configuration. The changes are applied to the `span.k-multiselect` wrapping element and to the `span.k-chip` elements:

```html
<span class="k-multiselect k-input k-multiselect-clearable k-input-lg">
    ...
    <span class="k-chip k-chip-lg k-rounded-lg k-chip-solid k-chip-solid-base" aria-setsize="2"></span>
</span>
```

### Rounded

The `rounded` option controls how much border radius is applied to the tags for the selected items in the component. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/multiselect/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—ellipse-like border radius
- `none`—unset

The default value is `full` and it is applied to the `span.k-multiselect` wrapping element that contains the whole HTML through the `k-rounded-full` class. That class is also applied to the `span.k-chip` element which contains the HTML for the tags.

The example below shows a basic MultiSelect configuration and how to set `rounded` to "medium":

```dojo
<select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
</select>
<script>
    $("#multiselect").kendoMultiSelect({
      rounded: "medium"
    });
</script>
```
The changes are applied to the `span.k-multiselect` wrapping element and to the `span.k-chip` elements:

```html
<span class="k-multiselect k-input k-multiselect-clearable k-input-solid k-input-lg k-rounded-md">
    ...
    <span class="k-chip k-chip-lg k-rounded-md k-chip-solid k-chip-solid-base" aria-setsize="2"></span>
</span>
```

### FillMode

The `fillMode` option controls how the color of the tags is applied. The structure of the class is `k-input-{fillMode}`.

The following values are available for the [`fillMode`](/api/javascript/ui/multiselect/configuration/fillMode) option:

- `solid`
- `flat`
- `outline`
- `none`

The default value is `solid` and it is applied to the `span.k-multiselect` wrapping element through the `k-input-solid` class and to the `span.k-chip` elements through the `.k-chip-outline .k-chip-outline-base` classes.

The example below shows a basic MultiSelect configuration and how to set `fillMode` to "outline":

```dojo
<select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
</select>
<script>
    $("#multiselect").kendoMultiSelect({
      fillMode: "outline"
    });
</script>
```
The changes are applied to the `span.k-multiselect` wrapping element and to the `span.k-chip` elements:

```html
<span class="k-multiselect k-input k-multiselect-clearable k-input-outline k-input-lg k-rounded-md">
    ...
    <span class="k-chip k-chip-lg k-rounded-md k-chip-outline k-chip-outline-base" aria-setsize="2"></span>
</span>
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Appearance Demo of the MultiSelect](https://demos.telerik.com/kendo-ui/multiselect/appearance)
* [JavaScript API Reference of the MultiSelect](/api/javascript/ui/multiselect)
