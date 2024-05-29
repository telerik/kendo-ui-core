---
title: Appearance
page_title: jQuery DateInput Documentation - DateInput Appearance
description: "Learn how to apply different styling options to the DateInput widget."
slug: appearance_kendoui_dateinput_widget
position: 4
---

# DateInput Appearance

> As of Kendo UI R1 2022, the DateInput widget uses brand new rendering.

In this article, you will find information about the new rendering of the Kendo UI DateInput.

For additional information regarding the decision behind these changes, visit the [Styling Overview]({% slug components_rendering_overview %}) article.

For a live example, visit the [Appearance Demo of the DateInput](https://demos.telerik.com/kendo-ui/dateinput/appearance).

## Options

The Kendo UI DateInput supports the following styling options:

- [`size`](#size)—configures the overall size of the component.
- [`fillMode`](#fillmode)—configures how the color is applied to the component.
- [`rounded`](#rounded)—configures the border radius of the component.

### Size

The `size` option controls how big or small the rendered `input` looks. The structure of the class is `k-input-{size}`.

The following values are available for the [`size`](/api/javascript/ui/dateinput/configuration/size) option:

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

The `rounded` option controls the border radius of the rendered `input`. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rouned`](/api/javascript/ui/dateinput/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—ellipse-like border radius
- `none`—unset

The structure of the class is `k-rounded-{size}`.

The default rounded value is `medium` and it is applied to the wrapping span element through the `k-rounded-md` class.

```html
<span class="k-dateinput k-input k-rounded-md">
</span>
```

### FillMode

The `fillMode` option controls the way the color is applied to the rendered `input`. The structure of the class is `k-input-{fillMode}`

The following values are available for the [`fillMode`](/api/javascript/ui/dateinput/configuration/fillmode) option:

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

The old rendering of the DateInput consisted of an input with a single class named `k-textbox` and wrapped in a span element with the `k-dateinput` class that held all the styling information related to the widget.

```html
 <!-- OLD -->
<span class="k-widget k-dateinput k-state-default" style="width: 100%;">
    <input class="k-textbox" >
    <span class="k-icon k-i-warning k-hidden"></span>
</span>
```

The new rendering of the component consists of a wrapping `span` element that has a child `input` element. The `span` element controls the overall appearance of the widget depending on the applied classes and has the following class structure:

```html
<!-- NEW -->
<span class="k-dateinput k-input k-input-md k-rounded-md k-input-solid">
        <input type="text" class="k-input-inner" value="..." placeholder="..." />  
</span>
```

The following example demonstrates how to configure the appearance of the widget through its configuration:

```dojo
<input id="dateinput" />
<script>
$("#dateinput").kendoDateInput({
    size: "medium",
    rounded: "medium",
    fillMode: "solid",
});
</script>
```

## Visual Backwards Compatibility

> The new styling and rendering supports only the [default options](#options) when you use a LESS theme.

Previously, you had to obtain a reference to the dateinput element through the `k-textbox` class.

```javascript
$(".k-textbox") // Returns a reference to the DateInput element in the old rendering.
```

With the new rendering, you must target the dateinput element by using the `k-input-inner` class.

```javascript
$(".k-input-inner") // Returns a reference to the DateInput element in the new rendering.
```

The following example showcases how to apply a background color to the **DateInput** in both the new, and the old rendering:

```dojo
    <!-- Open the example in Dojo and select version prior to 2022 R1 to see the difference in the appearance -->
    <div id="parent">
      <input id="dateinput" />
    </div>

    <style>
      /* Doesn't work AFTER R1 2022 */
      #parent .k-textbox {
        background-color: #0071bc !important; /* Blue color in versions BEFORE R1 2022 */
      }

      /* Doesn't work BEFORE R1 2022 */
      #parent .k-input-inner {
        background-color: #2e8540 !important; /* Green color in versions AFTER R1 2022 */
      }
    </style>

    <script>
      $("#dateinput").kendoDateInput();
    </script>
```

## See Also

* [Styling Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the DateInput](https://demos.telerik.com/kendo-ui/dateinput/appearance)
* [JavaScript API Reference of the DateInput](/api/javascript/ui/dateinput)
