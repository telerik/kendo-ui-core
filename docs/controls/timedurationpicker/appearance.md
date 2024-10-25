---
title: Appearance
page_title: jQuery TimeDurationPicker Documentation - TimeDurationPicker Appearance
description: "Learn how to apply different styling options to the TimeDurationPicker component."
slug: appearance_timedurationpicker
position: 2
---

# Appearance

In this article, you will find information about the styling options and rendering of the Kendo UI TimeDurationPicker.

For a live example, visit the [Appearance Demo of the TimeDurationPicker](https://demos.telerik.com/kendo-ui/timedurationpicker/appearance).

## Options

The Kendo UI TimeDurationPicker supports the following styling options:

- [`size`](#size)—Configures the overall size of the component.
- [`fillMode`](#fillmode)—Configures how the color is applied to the component.
- [`rounded`](#rounded)—Configures the border radius of the component.

### Size

The `size` option controls how big or small the rendered `input` looks. The structure of the class is `k-input-{size}`.

The following values are available for the [`size`](/api/javascript/ui/timedurationpicker/configuration/size) option:

- `sm`—Small size.
- `md`—Medium size.
- `lg`—Large size.
- `none`—Unset.

The default size value is `medium` and is applied to the wrapping `span` element through the `k-input-md` class.

```html
<span class="k-timedurationpicker k-input k-input-md">
</span>
```

### Rounded

The `rounded` option controls the border radius of the rendered `input`. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rouned`](/api/javascript/ui/timedurationpicker/configuration/rounded) option:

- `sm`—Small border radius.
- `md`—Medium border radius.
- `lg`—Large border radius.
- `full`—Ellipse-like border radius.
- `none`—Unset.

The structure of the class is `k-rounded-{size}`.

The default rounded value is `medium` and it is applied to the wrapping `span` element through the `k-rounded-md` class.

```html
<span class="k-timedurationpicker k-input k-rounded-md">
```

### FillMode

The `fillMode` option controls the way the color is applied to the rendered `input`. The structure of the class is `k-input-{fillMode}`

The following values are available for the [`fillMode`](/api/javascript/ui/timedurationpicker/configuration/fillmode) option:

- `solid`
- `flat`
- `outline`
- `none`

The default `fillMode` value is `solid` and it is applied to the wrapping `span` element through the `k-input-solid` class.

```html
<span class="k-timedurationpicker k-input k-input-solid">
```

## Rendering
 
To review the rendering of the component, refer to the HTML specifications in the [Kendo UI Themes Monorepo](https://github.com/telerik/kendo-themes/tree/develop). The `tests` folder of the repository contains the rendering for all flavors of the components, providing a clear reference for how their elements are structured. The rendering information can help you customize a component's appearance and behavior by applying custom CSS or JavaScript to suit specific design or functional requirements.

## See Also

* [Appearance Demo of the TimeDurationPicker](https://demos.telerik.com/kendo-ui/timedurationpicker/appearance)
* [JavaScript API Reference of the TimeDurationPicker](/api/javascript/ui/timedurationpicker)
