---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI TimePicker for {{ site.framework }}."
slug: appearance_timepicker
position: 2
---

# TimePicker Appearance

As of the R1 2022 release, the TimePicker component uses a new rendering. To learn more about why we decided to create a new rendering for our components, see the [Components Rendering Overview]({% slug components_rendering_overview %}) article.

For a live example of the styling options of the TimePicker, visit the [Appearance Demo of the TimePicker](https://demos.telerik.com/{{ site.platform }}/timepicker/appearance).

## Options

The TimePicker supports the following styling options:

- [`Size`](#size)—configures the overall size of the component.
- [`Rounded`](#rounded)—configures the border radius of the component.
- [`FillMode`](#fillmode)—configures how the color is applied to the component.

### Size

```HtmlHelper
@(Html.Kendo().TimePicker()
    .Name("timepicker")
    .Size(ComponentSize.Medium)
)
```
{% if site.core %}
```TagHelper
<kendo-timepicker name="timepicker"
                  size="ComponentSize.Medium"/>
```
{% endif %}

The `Size` option controls the size of the input of the TimePicker. The `k-input-{size}` class, which is applied to the wrapping span element of the TimePicker, reflects the value of the `Size` option.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-input-sm` class to the wrapping span element)
- `Medium`—medium size (applies the `k-input-md` class to the wrapping span element)
- `Large`—large size (applies the `k-input-lg` class to the wrapping span element)
- `None`—unset.

The default size value is `Medium`.

```html
<span class="k-timepicker k-input k-input-md">
</span>
``` 

### Rounded

```HtmlHelper
@(Html.Kendo().TimePicker()
    .Name("timepicker")
    .Rounded(Rounded.Medium)
)
```
{% if site.core %}
```TagHelper
<kendo-timepicker name="timepicker"
                  rounded="Rounded.Medium"/>
```
{% endif %}

The `Rounded` option controls the border radius of the TimePicker. The class that corresponds to the `Rounded` option is `k-rounded-{rounded}`.

The following values are available for the `Rounded` option:

- `Small`—small border radius (applies the `k-rounded-sm` class to the wrapping span element)
- `Medium`—medium border radius (applies the `k-rounded-md` class to the wrapping span element)
- `Large`—large border radius (applies the `k-rounded-lg` class to the wrapping span element)
- `Full`—largest (ellipse-like) border radius (applies the `k-rounded-full` class to the wrapping span element)
- `None`—unset.

The default value is `Medium`.

```html
<span class="k-timepicker k-input k-rounded-md">
</span>
```

### FillMode

```HtmlHelper
@(Html.Kendo().TimePicker()
    .Name("timepicker")
    .FillMode(FillMode.Solid)
)
```
{% if site.core %}
```TagHelper
<kendo-timepicker name="timepicker"
                  fill-mode="FillMode.Solid" />
```
{% endif %}

The `FillMode` option controls how color is applied to the component. The structure of the class is `k-input-{fillMode}`.

The following values are available for the `FillMode` option:

- `Solid`—applies the `k-input-solid` class to the wrapping span element
- `Flat`—applies the `k-input-flat` class to the wrapping span element
- `Outline`—applies the `k-input-outline` class to the wrapping span element
- `None`—unset.

The default value is `Solid` and it is applied to the `span.k-timepicker` wrapping element through the `k-input-solid` class.

```html
<span class="k-timepicker k-input k-input-solid">
</span>
```

## Old vs New Rendering

The old rendering of the TimePicker consisted of an input with a single class named `k-input` nested in a span element. The span element was wrapped in another span element with the `k-timepicker` class, which we used to apply styling to the component.

```html
 <!-- OLD rendering -->
<span class="k-widget k-timepicker" style="width: 100%;">
     <span class="k-picker-wrap k-state-default">
        <input class="k-input" >
     </span>
  </span>
```

The new rendering of the component consists of an input element with class `k-input-inner` nested in a `span.k-timepicker` element. The span element controls the overall appearance of the component depending on the applied classes and has the following class structure:

```html
<!-- NEW rendering -->
    <span class="k-timepicker k-input k-input-md k-rounded-md k-input-solid">
       <input type="text" class="k-input-inner" value="..." placeholder="..." />
    </span>
```

The following example demonstrates how to configure the appearance of the component through the styling options:

```HtmlHelper
@(Html.Kendo().TimePicker()
    .Name("timepicker")
    .Size(ComponentSize.Large)
    .Rounded(Rounded.Small)
    .FillMode(FillMode.Outline)
)
```
{% if site.core %}
```TagHelper
<kendo-timepicker name="timepicker"
                  size="ComponentSize.Large"
                  rounded="Rounded.Small"
                  fill-mode="FillMode.Outline" />
```
{% endif %}

## Visual Backwards Compatibility

In order to achieve the same look and feel as the old rendering, use the classes available in the new rendering. Visit the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) and [JQuery Selectors Migration]({% slug components_rendering_overview %}#jquery-selectors-migration) sections of the [Appearance Overview]({% slug components_rendering_overview %}) article for additional information.

> If you use a LESS theme, the new rendering will support only the [default options](#options).

Previously, you could obtain a reference to the TimePicker element through the `k-input` class.

```javascript
$(".k-input") // Returns a reference to the TimePicker element in the old rendering.
```

With the new rendering, you must target the TimePicker element by using the `k-input-inner` class.

```javascript
$(".k-input-inner") // Returns a reference to the TimePicker element in the new rendering.
```

The following example showcases how to change the background colors of the input and button elements of the **TimePicker** in both the new, and the old rendering:

```
    <style>
      /* Doesn't work BEFORE R1 2022 */
      .k-input-inner {
        background-color: #2e8540 !important; /* Green color in versions AFTER R1 2022 */
      }
      .k-input-button {
        background-color: yellow; /* Applies yellow color to the date button element AFTER R1 2022 */
      }

      /* Doesn't work AFTER R1 2022 */
      .k-input {
        background-color: #0071bc !important; /* Blue color in versions BEFORE R1 2022 */
      }
      .k-select {
        background-color: red; /* Applies red color to the date button element BEFORE R1 2022 */
      }
    </style>
```

## See Also

* [Appearance Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the TimePicker](https://demos.telerik.com/{{ site.platform }}/timepicker/appearance)
