---
title: Appearance
page_title: jQuery DateRangePicker Documentation - DateRangePicker Appearance
description: "Learn how to apply different styling options to the DateRangePicker widget."
slug: appearance_kendoui_daterangepicker_widget
position: 2
---

# DateRangePicker Appearance

> As of Kendo UI R1 2022, the DateRangePicker widget uses brand new rendering.

In this article, you will find information about the new rendering of the Kendo UI DateRangePicker.

For additional information regarding the decision behind these changes, visit the [Styling Overview]({% slug components_rendering_overview %}) article.

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

## Old vs New Rendering

The old rendering of the DateRangePicker consisted of two input elements that were wrapped in span elements with the `k-textbox-container` class. These span elements were wrapped in a single div element with a single class `k-daterangepicker` that held all the styling information related to the widget.

```html
 <!-- OLD -->
<div id="daterangepicker" class="k-daterangepicker">
    <span class="k-floating-label-container">
        <span class="k-dateinput k-input k-input-solid k-input-md k-rounded-md" style="">
            <input id="f354d807-3c52-4295-82c6-65aa4d534d40" data-role="dateinput" class="k-input-inner">
            <span class="k-input-validation-icon k-icon k-i-warning k-hidden"></span>
        </span>
        <label for="f354d807-3c52-4295-82c6-65aa4d534d40" class="k-label">Start</label>
    </span>
    <span>&nbsp;</span>
    <span class="k-floating-label-container">
        <span class="k-dateinput k-input k-input-solid k-input-md k-rounded-md" style="">
            <input id="aeae6624-123d-4d50-9c6c-9d792dafc4db" class="k-input-inner">
            <span class="k-input-validation-icon k-icon k-i-warning k-hidden"></span>
        </span>
        <label for="aeae6624-123d-4d50-9c6c-9d792dafc4db" class="k-label">End</label>
    </span>
</div>
```

The new rendering of the component consists of individual wrapping `span` elements for the `input` elements which holds the `k-input-inner` class. The `span` elements control the overall appearance of the widget depending on the applied classes and has the following class structure:

```html
<!-- NEW -->
<div id="daterangepicker" class="k-daterangepicker">
    <span class="k-floating-label-container">
        <span class="k-dateinput k-input k-input-solid k-input-md k-rounded-md" style="">
            <input id="f354d807-3c52-4295-82c6-65aa4d534d40" data-role="dateinput" class="k-input-inner">
            <span class="k-input-validation-icon k-icon k-i-exclamation-circle k-hidden"></span>
        </span>
        <label for="f354d807-3c52-4295-82c6-65aa4d534d40" class="k-label">Start</label>
    </span>
    <span>&nbsp;</span>
    <span class="k-floating-label-container">
        <span class="k-dateinput k-input k-input-solid k-input-md k-rounded-md" style="">
            <input id="aeae6624-123d-4d50-9c6c-9d792dafc4db" class="k-input-inner">
            <span class="k-input-validation-icon k-icon k-i-exclamation-circle k-hidden"></span>
        </span>
        <label for="aeae6624-123d-4d50-9c6c-9d792dafc4db" class="k-label">End</label>
    </span>
</div>
```

The following example demonstrates how to configure the appearance of the widget through its configuration:

```dojo
<div id="daterangepicker" ></div>
<script>
$("#daterangepicker").kendoDateRangePicker({
    size: "medium",
    rounded: "medium",
    fillMode: "solid"
});
</script>
```

## Visual Backwards Compatibility

> The new styling and rendering supports only the [default options](#options) when you use a LESS theme.

The following example showcases how to change the background colors of the input elements of the **DateRangePicker** in both the new, and the old rendering:

```dojo
    <!-- Open the example in Dojo and select version prior to 2022 R1 to see the difference in the appearance -->
    <div id="parent">
      <div id="daterangepicker"></div>
    </div>

    <style>
      /* Doesn't work AFTER R1 2022 */
      #parent .k-textbox-container:nth-of-type(1) .k-textbox {
        background-color: #0071bc !important; /* Applies blue color to the first input BEFORE R1 2022 */
      }
      #parent .k-textbox-container:nth-of-type(3) .k-textbox {
        background-color: red !important; /* Applies red color to the second input BEFORE R1 2022 */
      }

      /* Doesn't work BEFORE R1 2022 */
      #parent .k-floating-label-container:nth-of-type(1) .k-input-inner {
        background-color: #2e8540 !important; /* Applies green color to the first input AFTER R1 2022 */
      }
      #parent .k-floating-label-container:nth-of-type(3) .k-input-inner {
        background-color: yellow !important; /* Applies yellow color to the second input AFTER R1 2022 */
      }
    </style>

    <script>
      $("#daterangepicker").kendoDateRangePicker();
    </script>
```

## See Also

* [Appearance Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the DateRangePicker](https://demos.telerik.com/kendo-ui/daternagepicker/appearance)
* [JavaScript API Reference of the DateRangePicker](/api/javascript/ui/daterangepicker)
