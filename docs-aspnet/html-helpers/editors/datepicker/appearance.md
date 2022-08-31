---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI DatePicker for {{ site.framework }}."
slug: appearance_datepicker_aspnetcore
position: 3
---

# DatePicker Appearance

As of the R1 2022 release, the DatePicker component uses a new rendering. To learn more about the reasons for this decision, see the [Components Appearance]({% slug components_rendering_overview %}) article.

For a live example of the DatePicker styling options, visit the [DatePicker Appearance Demo](https://demos.telerik.com/{{ site.platform }}/datepicker/appearance).

## Options

The DatePicker supports the following styling options:

- [`Size`](#size)—configures the overall size of the component.
- [`Rounded`](#rounded)—configures the border radius of the component.
- [`FillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `Size` option controls the size of the DatePicker. The `k-input-{size}` class, which is applied to the wrapping span element of the DatePicker, reflects the value of the `Size` option.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-input-sm` class to the wrapping span element).
- `Medium`—medium size (applies the `k-input-md` class to the wrapping span element).
- `Large`—large size (applies the `k-input-lg` class to the wrapping span element).
- `None`—unset.

The following example demonstrates how to set `Size` in the declaration of the DatePicker:

```HtmlHelper
@(Html.Kendo().DatePicker()
      .Name("datepicker")
      .Size(ComponentSize.Medium)
      .Value(new DateTime(2011, 10, 10))
      .HtmlAttributes(new { style = "width: 100%", title = "datepicker" })
)
```
{% if site.core %}
```TagHelper
<kendo-datepicker name="datepicker"
                  size="ComponentSize.Medium"
                  value="new DateTime(2011, 10, 10)"/>
```
{% endif %}

The default `Size` value is `Medium` and it is applied to the wrapping span element through the `k-input-md` class.

```html
<span class="k-datepicker k-input k-input-md">
</span>
```

### Rounded

The `Rounded` option controls the border radius of the DatePicker. The class that corresponds to the `Rounded` option is `k-rounded-{rounded}`.

The following values are available for the `Rounded` option:

- `Small`—small border radius (applies the `k-rounded-sm` class to the wrapping span element).
- `Medium`—medium border radius (applies the `k-rounded-md` class to the wrapping span element).
- `Large`—large border radius (applies the `k-rounded-lg` class to the wrapping span element).
- `Full`—largest border radius (applies the `k-rounded-full` class to the wrapping span element).
- `None`—unset.

The following example demonstrates how to set `Rounded` in the declaration of the DatePicker:

```HtmlHelper
@(Html.Kendo().DatePicker()
      .Name("datepicker")
      .Rounded(Rounded.Medium)
      .Value("10/10/2011")
      .HtmlAttributes(new { style = "width: 100%", title = "datepicker" })
)
```
{% if site.core %}
```TagHelper
<kendo-datepicker name="datepicker"
                  rounded="Rounded.Medium"
                  value="new DateTime(2011, 10, 10)"/>
```
{% endif %}

The default `Rounded` value is `Medium` and it is applied to the wrapping span element through the `k-rounded-md` class.

```html
<span class="k-datepicker k-input k-rounded-md">
</span>
```

### FillMode

The `FillMode` option controls the way color is applied to the rendered DatePicker. The `k-input-{fillMode}` class, which is applied to the wrapping span element of the DatePicker, reflects the value of the `FillMode` option.

The following values are available for the `FillMode` option:

- `Solid`—applies the `k-input-solid` class to the wrapping span element.
- `Flat`—applies the `k-input-flat` class to the wrapping span element.
- `Outline`—applies the `k-input-outline` class to the wrapping span element.
- `None`—unset.

The following example demonstrates how to set `FillMode` in the declaration of the DatePicker:

```HtmlHelper
@(Html.Kendo().DatePicker()
      .Name("datepicker")
      .FillMode(FillMode.Solid)
       .Value("10/10/2011")
      .HtmlAttributes(new { style = "width: 100%", title = "datepicker" })
    )
```
{% if site.core %}
```TagHelper
<kendo-datepicker name="datepicker"
                  fill-mode="FillMode.Solid"
                  value="new DateTime(2011, 10, 10)"/>
```
{% endif %}

The default `FillMode` value is `Solid` and it is applied to the wrapping span element through the `k-input-solid` class.

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

The following example demonstrates how to configure the appearance of the component through configuration:

```HtmlHelper
@(Html.Kendo().DatePicker()
      .Name("datepicker")
      .Size(ComponentSize.Medium)
      .Rounded(Rounded.Medium)
      .FillMode(FillMode.Solid)
      .Value("10/10/2011")
      .HtmlAttributes(new { style = "width: 100%", title = "datepicker" })
)
```
{% if site.core %}
```TagHelper
<kendo-datepicker name="datepicker"
                  size="ComponentSize.Medium"
                  rounded="Rounded.Medium"
                  fill-mode="FillMode.Solid"
                  value="new DateTime(2011, 10, 10)"/>
```
{% endif %}

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

In order to achieve the same look and feel as the old rendering, the element references must be updated. Visit the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) and [JQuery Selectors Migration]({% slug components_rendering_overview %}#jquery-selectors-migration) sections of the [Styling Overview]({% slug components_rendering_overview %}) article for additional information.

> The new styling and rendering supports only the [default options](#options) when you use a LESS theme.

Previously, a reference to the DatePicker input element was obtainable through the `k-input` class.

```javascript
$(".k-input") // Returns a reference to the input element in the old rendering.
```

With the new rendering, the DatePicker input element must be targeted by using the `k-input-inner` class.

```javascript
$(".k-input-inner") // Returns a reference to the input element in the new rendering.
```

Previously, a reference to the button element was obtainable through the `k-select` class.

```javascript
$(".k-select") // Returns a reference to the calendar button element in the old rendering.
```

With the new rendering, a reference to the button element is obtainable through the `k-button` and `k-input-button` classes. 

```javascript
$(".k-button") // Returns a reference to the calendar button element in the new rendering.
$(".k-input-button") // Returns a reference to the calendar button element in the new rendering.
```

The following example showcases how to change the background colors of the input and button elements of the **DatePicker** in both the new, and the old rendering:

```
    <style>
      /* Doesn't work AFTER R1 2022 */
      .k-input {
        background-color: #0071bc !important; /* Blue color in versions BEFORE R1 2022 */
      }
      .k-select {
        background-color: red !important; /* Applies red color to the button element BEFORE R1 2022 */
      }
      /* Doesn't work BEFORE R1 2022 */
      .k-input-inner {
        background-color: #2e8540 !important; /* Green color in versions AFTER R1 2022 */
      }
      .k-input-button {
        background-color: yellow !important; /* Applies yellow color to the button element AFTER R1 2022 */
      }
    </style>
```

## See Also

* [Appearance Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the DatePicker](https://demos.telerik.com/aspnet-mvc/datepicker/appearance)
