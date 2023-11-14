---
title: Appearance
page_title: jQuery DatePicker Documentation - DatePicker Appearance
description: "Learn how to apply different styling options to the DatePicker widget."
slug: appearance_kendoui_datepicker_widget
position: 4
---

# DatePicker Appearance

> As of Kendo UI R1 2022, the DatePicker widget uses brand new rendering.

In this article, you will find information about the new rendering of the Kendo UI DatePicker.

For additional information regarding the decision behind these changes, visit the [Styling Overview]({% slug components_rendering_overview %}) article.

For a live example, visit the [Appearance Demo of the DatePicker](https://demos.telerik.com/kendo-ui/datepicker/appearance).

## Options

The Kendo UI DatePicker supports the following styling options:

- [`size`](#size)—configures the overall size of the component.
- [`rounded`](#rounded)—configures the border radius of the component.
- [`fillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `size` option controls how big or small the rendered DatePicker looks. The structure of the class is `k-input-{size}`.

The following values are available for the [`size`](/api/javascript/ui/datepicker/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The following example demonstrates how to configure the `size` of the component through the widget configuration:

```dojo
<input id="datepicker" />
<script>
$("#datepicker").kendoDatePicker({
    size: "medium"
});
</script>
```

The default size value is `medium` and it is applied to the wrapping span element through the `k-input-md` class.

```html
<span class="k-datepicker k-input k-input-md">
</span>
```

### Rounded

The `rounded` option controls how much border radius is applied to the rendered DatePicker. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/datepicker/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—largest border radius
- `none`—unset

The following example demonstrates how to configure the `rounded` of the component through the widget configuration:

```dojo
<input id="datepicker" />
<script>
$("#datepicker").kendoDatePicker({
    rounded: "medium"
});
</script>
```

The default rounded value is `medium` and it is applied to the wrapping span element through the `k-rounded-md` class.

```html
<span class="k-datepicker k-input k-rounded-md">
</span>
```

### FillMode

The `fillMode` option controls the way the color is applied to the rendered DatePicker. The structure of the class is `k-input-{fillMode}`.

The following values are available for the [`fillMode`](/api/javascript/ui/datepicker/configuration/fillmode) option:

- `solid`
- `flat`
- `outline`
- `none`

The following example demonstrates how to configure the `size` of the component through the widget configuration:

```dojo
<input id="datepicker" />
<script>
$("#datepicker").kendoDatePicker({
    fillMode: "solid"
});
</script>
```

The default fillMode value is `solid` and it is applied to the wrapping span element through the `k-input-solid` class.

```html
<span class="k-datepicker k-input k-input-solid">
</span>
```

## Old vs New Rendering

The old rendering of the component consisted of several wrapping elements:

- The outer `span` wrapper with the `k-datepicker` and `k-widget` classes.

  ```html
  <span class="k-widget k-datepicker">
  </span>
  ```

- The inner `span` wrapper with the `k-picker-wrap` class.

  ```html
  <span class="k-picker-wrap k-state-default">
  </span>
  ```

- The `input` element with the `k-input` class. This element is a child of the `k-picker-wrap` span.

  ```html
  <input class="k-input" role="combobox" >
  </span>
  ```

- The button `span` element with `k-select` class. This element is a child of the `k-picker-wrap` span and renders the button which expands the calendar on click.

  ```html
  <span unselectable="on" class="k-select" role="button">
  </span>
  ```

- The icon `span` element with the `k-icon` class. This element is a child of the `k-select` span and renders the calendar icon. 

  ```html
  <span class="k-icon k-i-calendar">
  ```

The following example demonstrates the full version of the old rendering:

```html
<span class="k-widget k-datepicker">
  <span class="k-picker-wrap k-state-default">
    <input class="k-input" role="combobox" >
    <span unselectable="on" class="k-select" role="button">
       <span class="k-icon k-i-calendar">
    </span>
  </span>
 </span>
</span>
```

The new rendering of the component consists of a single wrapping `span` element that contains the child `input` and `button` elements:

- The `span` element controls the overall appearance of the widget and has the following class structure:

  ```html
  <span class="k-datepicker k-input k-input-md k-rounded-md k-input-solid">
  </span>
  ```

- The `input` element controls the appearance of the DatePicker itself and has the following class structure:

  ```html
  <input type="text" class="k-input-inner" value="..." placeholder="..." />
  ```

- The `button` element controls the appearance of the button that expands the calendar view and has the following class structure:

  ```html
  <button type="button" class="k-input-button k-button k-icon-button k-button-md k-button-solid k-button-solid-base">
  </button>
  ```

- The inner `span` element renders the calendar icon of the DatePicker and has the following class structure:

  ```html
  <span class="k-button-icon k-icon k-i-calendar"></span>
  ```

The following example demonstrates how to configure the appearance of the component through the widget configuration:

```dojo
<input id="datepicker" />
<script>
$("#datepicker").kendoDatePicker({
    size: "medium",
    rounded: "medium",
    fillMode: "solid"
});
</script>
```

The following example demonstrates the full version of the new rendering:

```html
<span class="k-datepicker k-input k-input-md k-rounded-md k-input-solid">
  <input type="text" class="k-input-inner" value="..." placeholder="..." />
  <button type="button" class="k-input-button k-button k-icon-button k-button-md k-button-solid k-button-solid-base">
    <span class="k-button-icon k-icon k-i-calendar"></span>
  </button>
</span>
```

## Visual Backwards Compatibility

To achieve the same look and feel as the old rendering, you must update the element references.

> When you use a LESS theme, the new styling and rendering supports only the [default options](#options).

Previously, a reference to the DatePicker input element was obtainable through the `k-input` class.

```javascript
$(".k-input") // Returns a reference to the input element in the old rendering.
```

With the new rendering, you must target the DatePicker input element by using the `k-input-inner` class.

```javascript
$(".k-input-inner") // Returns a reference to the input element in the new rendering.
```

Previously, a reference to the button element was obtainable through the `k-select` class.

```javascript
$(".k-select") // Returns a reference to the calendar button element in the old rendering.
```

With the new rendering, you can obtain a reference to the button element through the `k-button` and `k-input-button` classes. 

```javascript
$(".k-button") // Returns a reference to the calendar button element in the new rendering.
$(".k-input-button") // Returns a reference to the calendar button element in the new rendering.
```

The following example showcases how to change the background colors of the input and button elements of the **DatePicker** in both the new, and the old rendering:

```dojo
    <!-- Open the example in Dojo and select version prior to 2022 R1 to see the difference in the appearance -->
    <div id="parent">
      <input id="datepicker" />
    </div>

    <style>
      /* Doesn't work AFTER R1 2022 */
      #parent .k-input {
        background-color: #0071bc !important; /* Blue color in versions BEFORE R1 2022 */
      }
      #parent .k-select {
        background-color: red !important; /* Applies red color to the button element BEFORE R1 2022 */
      }

      /* Doesn't work BEFORE R1 2022 */
      #parent .k-input-inner {
        background-color: #2e8540 !important; /* Green color in versions AFTER R1 2022 */
      }
      #parent .k-input-button {
        background-color: yellow !important; /* Applies yellow color to the button element AFTER R1 2022 */
      }
    </style>

    <script>
      $("#datepicker").kendoDatePicker();
    </script>
```

## See Also

* [Styling Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the DatePicker](https://demos.telerik.com/kendo-ui/datepicker/appearance)
* [JavaScript API Reference of the DatePicker](/api/javascript/ui/datepicker)
