---
title: Appearance
page_title: jQuery DateTimePicker Documentation - DateTimePicker Appearance
description: "Learn how to apply different styling options to the DateTimePicker widget."
slug: appearance_kendoui_datetimepicker_widget
position: 3
---

# DateTimePicker Appearance

> As of Kendo UI R1 2022, the DateTimePicker widget uses brand new rendering.

In this article, you will find information about the new rendering of the Kendo UI DateTimePicker.

For additional information regarding the decision behind these changes, visit the [Styling Overview]({% slug components_rendering_overview %}) article.

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

## Old vs New Rendering

The old rendering of the component consisted of several wrapping elements:

- The outer `span` wrapper with the `k-datetimepicker` and `k-widget` classes.

  ```html
  <span class="k-widget k-datetimepicker">
  </span>
  ```

- The inner `span` wrapper with the `k-picker-wrap` class.

  ```html
  <span class="k-picker-wrap k-state-default">
  </span>
  ```

- The `input` element with the `k-input` class. This element is a child of the `k-picker-wrap` span.

  ```html
  <input class="k-input" />
  ```

- The `span` wrapper with the `k-select` class. This element is a child of the `k-picker-wrap` span and parent of the `button` elements.

  ```html
  <span unselectable="on" class="k-select">
  </span>
  ```

- The date button `span` element with the `k-link-date` class. This element is a child of the `k-select` span and renders the button which expands the date picker on click.

  ```html
  <span class="k-link k-link-date" role="button">
  </span>
  ```

- The time button `span` element with the `k-link-time` class. This element is a child of the `k-select` span and renders the button which expands the time picker on click.

  ```html
  <span class="k-link k-link-time" role="button">
  </span>
  ```

- The icon `span` element with the `k-i-calendar` class. This element is a child of the `k-link-date` button and renders the calendar icon. 

  ```html
  <span class="k-icon k-i-calendar">
  ```

- The icon `span` element with the `k-i-clock` class. This element is a child of the `k-link-time` button and renders the clock icon. 

  ```html
  <span class="k-icon k-i-clock">
  ```

The following example demonstrates the full version of the old rendering:

```html
<span class="k-widget k-datetimepicker" style="width: 100%;">
  <span class="k-picker-wrap k-state-default">
    <input class="k-input" >
    <span class="k-icon k-i-warning k-hidden"></span>
    <span unselectable="on" class="k-select">
      <span class="k-link k-link-date" role="button">
        <span unselectable="on" class="k-icon k-i-calendar"></span>
      </span>
      <span class="k-link k-link-time" role="button">
        <span unselectable="on" class="k-icon k-i-clock"></span>
      </span>
    </span>
  </span>
</span>
```

The new rendering of the component consists of a single wrapping `span` element that contains the child `input` and `button` elements:

- The `span` element controls the overall appearance of the widget and has the following class structure:

  ```html
  <span class="k-datetimepicker k-input k-input-md k-rounded-md k-input-solid">
  </span>
  ```

- The `input` element controls the appearance of the DateTimePicker itself and has the following class structure:

  ```html
  <input type="text" class="k-input-inner" value="..." placeholder="..." />
  ```

- The `button` elements control the appearance of the buttons that expand the date and time pickers:

  ```html
  <button type="button" class="k-input-button k-button k-icon-button k-button-md k-button-solid k-button-solid-base">
  </button>
  ```

- The inner `span` elements of each of the buttons render the calendar and clock icons:

  ```html
  <span class="k-button-icon k-icon k-i-clock"></span>
  <span class="k-button-icon k-icon k-i-calendar"></span>
  ```

The following example demonstrates how to configure the appearance of the component through the widget configuration:

```dojo
<input id="datetimepicker" />
<script>
$("#datetimepicker").kendoDateTimePicker({
    size: "medium",
    rounded: "medium",
    fillMode: "solid"
});
</script>
```

The following example demonstrates the full version of the new rendering:

```html
 <span class="k-datetimepicker k-input k-input-md k-rounded-md k-input-solid">
    <input type="text" class="k-input-inner" value="..." placeholder="..." />
    <button type="button" class="k-input-button k-button k-icon-button k-button-md k-button-solid k-button-solid-base">
        <span class="k-button-icon k-icon k-i-clock"></span>
    </button>
    <button type="button" class="k-input-button k-button k-icon-button k-button-md k-button-solid k-button-solid-base">
        <span class="k-button-icon k-icon k-i-calendar"></span>
    </button>
</span>
```

## Visual Backwards Compatibility

To achieve the same look and feel as the old rendering, you must update the element references.

> When you use a LESS theme, the new styling and rendering supports only the [default options](#options).

Previously, a reference to the DateTimePicker input element was obtainable through the `k-input` class.

```javascript
$(".k-input") // Returns a reference to the input element in the old rendering.
```

With the new rendering, you must target the DateTimePicker input element by using the `k-input-inner` class.

```javascript
$(".k-input-inner") // Returns a reference to the input element in the new rendering.
```

Previously, a reference to the date and time button elements was obtainable through the `k-link-date` and `k-link-time` classes respectively.

```javascript
$(".k-link-date") // Returns a reference to the date button element in the old rendering.
$(".k-link-time") // Returns a reference to the time button element in the old rendering.
```

With the new rendering, you can obtain a reference to the date and time button elements through the `k-button` class. 

```javascript
$(".k-button:eq(0)") // Returns a reference to the date button element in the new rendering.
$(".k-button:eq(1)") // Returns a reference to the time button element in the new rendering.
```

The following example showcases how to change the background colors of the input and button elements of the **DateTimePicker** in both the new, and the old rendering:

```dojo
    <!-- Open the example in Dojo and select version prior to 2022 R1 to see the difference in the appearance -->
    <div id="parent">
      <input id="datetimepicker" />
    </div>

    <style>
      /* Doesn't work AFTER R1 2022 */
      #parent .k-input {
        background-color: #0071bc !important; /* Blue color in versions BEFORE R1 2022 */
      }
      #parent .k-link-date {
        background-color: red; /* Applies red color to the date button element BEFORE R1 2022 */
      }
      #parent .k-link-time {
        background-color: cyan; /* Applies cyan color to the time button element BEFORE R1 2022 */
      }

      /* Doesn't work BEFORE R1 2022 */
      #parent .k-input-inner {
        background-color: #2e8540 !important; /* Green color in versions AFTER R1 2022 */
      }
      #parent .k-input-button:nth-of-type(1) {
        background-color: yellow; /* Applies yellow color to the date button element AFTER R1 2022 */
      }
      #parent .k-input-button:nth-of-type(2) {
        background-color: orange; /* Applies yellow color to the time button element AFTER R1 2022 */
      }
    </style>

    <script>
      $("#datetimepicker").kendoDateTimePicker();
    </script>
```

### Change the Order of the Time and Calendar Buttons

With the new rendering, the time button appears before the calendar button. To reverse this change, use the [jQuery.insertAfter](https://api.jquery.com/insertafter/) method: 

```dojo
    <input id="datetimepicker" />           
    <script>
      $(document).ready(function () {
        $("#datetimepicker").kendoDateTimePicker();
        
        $(".k-datetimepicker .k-button:first").insertAfter($(".k-datetimepicker .k-button:last"));
      });
    </script>
```

## See Also

* [Styling Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the DateTimePicker](https://demos.telerik.com/kendo-ui/datetimepicker/appearance)
* [JavaScript API Reference of the DateTimePicker](/api/javascript/ui/datetimepicker)
