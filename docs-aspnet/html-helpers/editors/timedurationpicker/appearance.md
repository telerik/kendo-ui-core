---
title: Appearance
page_title: Appearance
description: "Learn how to apply different styling options to the Telerik UI TimeDurationPicker component for {{ site.framework }}."
components: ["timedurationpicker"]
slug: htmlhelpers_timedurationpickerhelper_appearance
position: 4
---

# Appearance

In this article, you will find information about the styling options and rendering of the {{ site.product }} TimeDurationPicker.

For a live example, refer to the [Appearance Demo of the TimeDurationPicker](https://demos.telerik.com/{{ site.platform }}/timedurationpicker/appearance).

## Options

The Telerik UI TimeDurationPicker for {{ site.framework }} supports the following styling options:

- [`Size`](#size)—Configures the overall size of the component.
- [`FillMode`](#fillmode)—Configures how the color is applied to the component.
- [`Rounded`](#rounded)—Configures the border radius of the component.

### Size

The `Size` option controls how big or small the rendered `input` looks. The structure of the class is `k-input-{size}`.

The following values are available for the [`Size`](/api/kendo.mvc.ui.fluent/timedurationpickerbuilder#sizekendomvcuicomponentsize) option:

- `Small`
- `Medium`
- `Large`
- `None`

The default size value is `medium` and is applied to the wrapping `span` element through the `k-input-md` class.

```html
<span class="k-timedurationpicker k-input k-input-md">
</span>
```

### Rounded

The `Rounded` option controls the border radius of the rendered `input`. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`Rouned`](/api/kendo.mvc.ui.fluent/timedurationpickerbuilder#roundedkendomvcuirounded) option:

- `Small` — Small border radius.
- `Medium` — Medium border radius.
- `Large` — Large border radius.
- `Full` — Ellipse-like border radius.
- `None` — Unset.

The structure of the class is `k-rounded-{size}`.

The default rounded value is `medium` and it is applied to the wrapping `span` element through the `k-rounded-md` class.

```html
<span class="k-timedurationpicker k-input k-rounded-md">
```

### FillMode

The `FillMode` option controls the way the color is applied to the rendered `input`. The structure of the class is `k-input-{fillMode}`

The following values are available for the [`FillMode`](/api/kendo.mvc.ui.fluent/timedurationpickerbuilder#fillmodekendomvcuifillmode) option:

- `Solid`
- `Flat`
- `Outline`
- `None`

The default `fillMode` value is `solid` and it is applied to the wrapping `span` element through the `k-input-solid` class.

```html
<span class="k-timedurationpicker k-input k-input-solid">
```

## Rendering
 
To review the rendering of the component, refer to the HTML specifications in the [Kendo UI Themes Monorepo](https://github.com/telerik/kendo-themes/tree/develop). The `tests` folder of the repository contains the rendering for all flavors of the components, providing a clear reference for how their elements are structured. The rendering information can help you customize a component's appearance and behavior by applying custom CSS or JavaScript to suit specific design or functional requirements.

## See Also

* [Using the API of the TimeDurationPicker for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timedurationpicker/api)
* [Server-Side API](/api/timedurationpicker)
