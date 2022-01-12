---
title: Styling
page_title: jQuery NumericTextBox Documentation | NumericTextBox Styling
description: "Learn how to apply different styling options to the NumericTextBox widget."
slug: numerictextbox_styling
position: 2
---

# NumericTextBox Styling

> As of Kendo UI R1 2022, the NumericTextBox widget uses brand new rendering.

In this article, you will find information about the new rendering of the Kendo UI NumericTextBox.

For additional information regarding the decision behind these changes, visit the [Rendering Components]({% slug components_rendering_overview %}) article.

For a live example, visit the [Styling Demo of the NumericTextBox](https://demos.telerik.com/kendo-ui/numerictextbox/styling).

## Options

The Kendo UI Button supports the following styling options:

- [`size`](#size)—configures the overall size of the component.
- [`fillMode`](#fillmode)—configures how the color is applied to the component.
- [`rounded`](#rounded)—configures the border radius of the component.

### Size

The `size` option controls how big or small the rendered `input` looks. The structure of the class is `k-input-{size}`.

The following values are available for the [`size`](/api/javascript/ui/numerictextbox/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size

The default size value is `medium` and it is applied to the wrapping span element through the `k-input-md` class.

```html
<span class="k-numerictextbox k-input k-input-md">
</span>
```

### Rounded

The `rounded` option controls the border radius of the rendered `input`. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rouned`](/api/javascript/ui/numerictextbox/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—ellipse-like border radius

The structure of the class is `k-rounded-{size}`.

The default rounded value is `medium` and it is applied to the wrapping span element through the `k-rounded-md` class.

```html
<span class="k-numerictextbox k-input k-rounded-md">
```

### FillMode

The `fillMode` option controls the way the color is applied to the rendered `input`. The structure of the class is `k-input-{fillMode}`

The following values are available for the [`fillMode`](/api/javascript/ui/numerictextbox/configuration/fillmode) option:

- `solid`
- `flat`
- `outline`

The default fillMode value is `solid` and it is applied to the wrapping span element through the `k-input-solid` class.

```html
<span class="k-numerictextbox k-input k-input-solid">
```

## Old vs New Rendering

The old rendering of the NumericTextBox consisted of two span wrapper elements:
- a span wrapper element with the `k-numerictextbox` class
- a nested span wrapper element with the `k-numeric-wrap` class that held all the styling information related to the widget 

```html
 <!-- OLD -->
<span class="k-widget k-numerictextbox" style="width: 100%;">
    <span class="k-numeric-wrap k-state-default">
     <input type="text" class="k-input" >
    </span>
</span>
```

The new rendering of the component consists of a wrapping `span` element that has a child `input` element.

The `span` element controls the overall appearance of the widget and has the following class structure:

```html
<!-- NEW -->
<span class="k-numerictextbox k-input k-input-md k-rounded-md k-input-solid">
    <input type="text" class="k-input-inner" value="..." placeholder="..." />
</span>
```

The following example demonstrates how to configure the appearance of the widget through its configuration:

```dojo
<input id="numerictextbox" />
<script>
$("#numerictextbox").kendoNumericTextBox({
    size: "medium",
    rounded: "medium",
    fillMode: "solid",
});
</script>
```

## Visual Backwards Compatibility

> The new styling and rendering supports only the [default options](#options) when you use a LESS theme.

Previously, you had to obtain a reference to the numerictextbox element through the `k-numerictextbox` class

```javascript
$(".k-numerictextbox") // Returns a reference to the NumericTextBox element in the old rendering.
```

With the new rendering, you must target the numerictextbox element by using the `k-input-inner` class.

```javascript
$(".k-input-inner") // Returns a reference to the NumericTextBox element in the new rendering.
```

## See Also

* [Rendering Overview Article]({% slug components_rendering_overview %})
* [Styling Demo of the NumericTextBox](https://demos.telerik.com/kendo-ui/numerictextbox/styling)
* [JavaScript API Reference of the NumericTextBox](/api/javascript/ui/numerictextbox)
