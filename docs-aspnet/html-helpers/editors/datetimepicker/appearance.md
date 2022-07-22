---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI DateTimePicker for {{ site.framework }}."
slug: appearance_datetimepicker_aspnetcore
position: 2
---

# DateTimePicker Appearance

As of the R1 2022 release, the DateTimePicker component uses a new rendering. To learn more about the reasons for this decision, see the [Components Appearance]({% slug components_rendering_overview %}) article.

For a live example of the DateTimePicker styling options, visit the [DateTimePicker Appearance Demo](https://demos.telerik.com/{{ site.platform }}/datetimepicker/appearance).

## Options

The DateTimePicker supports the following styling options:

- [`Size`](#size)—configures the overall size of the component.
- [`Rounded`](#rounded)—configures the border radius of the component.
- [`FillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `Size` option controls the size of the DateTimePicker. The `k-input-{size}` class, which is applied to the wrapping span element of the DateTimePicker, reflects the value of the `Size` option.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-input-sm` class to the wrapping span element).
- `Medium`—medium size (applies the `k-input-md` class to the wrapping span element).
- `Large`—large size (applies the `k-input-lg` class to the wrapping span element).
- `None`—unset.

The following example demonstrates how to set `Size` in the declaration of the DateTimePicker:
```HtmlHelper
@(Html.Kendo().DateTimePicker()
    .Name("datetimepicker")
    .Size(ComponentSize.Medium)
    .Value(DateTime.Now)
    .HtmlAttributes(new { style = "width: 100%", title = "datetimepicker" })
    .DateInput()
)
```
{%if site.core %}
```TagHelper
<kendo-datetimepicker name="datetimepicker" 
                      size="ComponentSize.Medium"
                      value="DateTime.Now"
                      date-input="true"
                      style="width:100%"
                      title="datetimepicker" />
```
{% endif %}
The default `Size` value is `Medium` and it is applied to the wrapping span element through the `k-input-md` class.

```html
<span class="k-datetimepicker k-input k-input-md">
</span>
```

### Rounded

The `Rounded` option controls the border radius of the DateTimePicker. The class that corresponds to the `Rounded` option is `k-rounded-{rounded}`.

The following values are available for the `Rounded` option:

- `Small`—small border radius (applies the `k-rounded-sm` class to the wrapping span element).
- `Medium`—medium border radius (applies the `k-rounded-md` class to the wrapping span element).
- `Large`—large border radius (applies the `k-rounded-lg` class to the wrapping span element).
- `Full`—largest border radius (applies the `k-rounded-full` class to the wrapping span element).
- `None`—unset.

The following example demonstrates how to set `Rounded` in the declaration of the DateTimePicker:
```HtmlHelper
@(Html.Kendo().DateTimePicker()
    .Name("datetimepicker")
    .Rounded(Rounded.Medium)
    .Value(DateTime.Now)
    .HtmlAttributes(new { style = "width: 100%", title = "datetimepicker" })
    .DateInput()
)
```
{%if site.core %}
```TagHelper
<kendo-datetimepicker name="datetimepicker" 
                      rounded="Rounded.Medium"
                      value="DateTime.Now"
                      date-input="true"
                      style="width:100%"
                      title="datetimepicker" />
```
{% endif %}

The default `Rounded` value is `Medium` and it is applied to the wrapping span element through the `k-rounded-md` class.

```html
<span class="k-datetimepicker k-input k-rounded-md">
</span>
```

### FillMode

The `FillMode` option controls the way color is applied to the rendered DateTimePicker. The `k-input-{fillMode}` class, which is applied to the wrapping span element of the DateTimePicker, reflects the value of the `FillMode` option.

The following values are available for the `FillMode` option:

- `Solid`—applies the `k-input-solid` class to the wrapping span element.
- `Flat`—applies the `k-input-flat` class to the wrapping span element.
- `Outline`—applies the `k-input-outline` class to the wrapping span element.
- `None`—unset.

The following example demonstrates how to set `FillMode` in the declaration of the DateTimePicker:

```HtmlHelper
@(Html.Kendo().DateTimePicker()
    .Name("datetimepicker")
    .FillMode(FillMode.Solid)
    .Value(DateTime.Now)
    .HtmlAttributes(new { style = "width: 100%", title = "datetimepicker" })
    .DateInput()
)
```
{%if site.core %}
```TagHelper
<kendo-datetimepicker name="datetimepicker" 
                      fill-mode="FillMode.Solid"
                      value="DateTime.Now"
                      date-input="true" 
                      style="width:100%"
                      title="datetimepicker" />
```
{% endif %}
The default `FillMode` value is `Solid` and it is applied to the wrapping span element through the `k-input-solid` class.

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

```HtmlHelper
@(Html.Kendo().DateTimePicker()
    .Name("datetimepicker")
     Size(ComponentSize.Medium)
    .Rounded(Rounded.Medium)
    .FillMode(FillMode.Solid)
    .Value(DateTime.Now)
    .HtmlAttributes(new { style = "width: 100%", title = "datetimepicker" })
    .DateInput()
)
```
{% if site.core %}
```TagHelper
<kendo-datetimepicker name="datetimepicker" 
                      size="ComponentSize.Medium"
                      rounded="Rounded.Medium"
                      fill-mode="FillMode.Solid"
                      value="DateTime.Now"
                      date-input="true"/>
```
{% endif %}

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

In order to achieve the same look and feel as the old rendering, the element references must be updated. Visit the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) and [JQuery Selectors Migration]({% slug components_rendering_overview %}#jquery-selectors-migration) sections of the [Styling Overview]({% slug components_rendering_overview %}) article for additional information.

> The new styling and rendering supports only the [default options](#options) when you use a LESS theme.

Previously, a reference to the DateTimePicker input element was obtainable through the `k-input` class.

```javascript
$(".k-input") // Returns a reference to the input element in the old rendering.
```

With the new rendering, the DateTimePicker input element must be targeted by using the `k-input-inner` class.

```javascript
$(".k-input-inner") // Returns a reference to the input element in the new rendering.
```

Previously, a reference to the date and time button elements was obtainable through the `k-link-date` and `k-link-time` classes respectively.

```javascript
$(".k-link-date") // Returns a reference to the date button element in the old rendering.
$(".k-link-time") // Returns a reference to the time button element in the old rendering.
```

With the new rendering, a reference to the date and time button elements is obtainable through the `k-button` class. 

```javascript
$(".k-button:eq(0)") // Returns a reference to the date button element in the new rendering.
$(".k-button:eq(1)") // Returns a reference to the time button element in the new rendering.
```

The following example showcases how to change the background colors of the input and button elements of the **DateTimePicker** in both the new, and the old rendering:

```
    <style>
      /* Doesn't work BEFORE R1 2022 */
      .k-input-inner {
        background-color: #2e8540 !important; /* Green color in versions AFTER R1 2022 */
      }
      .k-input-button:nth-of-type(1) {
        background-color: yellow; /* Applies yellow color to the date button element AFTER R1 2022 */
      }
      .k-input-button:nth-of-type(2) {
        background-color: orange; /* Applies yellow color to the time button element AFTER R1 2022 */
      }

      /* Doesn't work AFTER R1 2022 */
      .k-input {
        background-color: #0071bc !important; /* Blue color in versions BEFORE R1 2022 */
      }
      .k-link-date {
        background-color: red; /* Applies red color to the date button element BEFORE R1 2022 */
      }
      .k-link-time {
        background-color: cyan; /* Applies cyan color to the time button element BEFORE R1 2022 */
      }
    </style>
```

## See Also

* [Appearance Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the DateTimePicker](https://demos.telerik.com/aspnet-mvc/datetimepicker/appearance)
