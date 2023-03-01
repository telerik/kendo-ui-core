---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI DateRangePicker for {{ site.framework }}."
slug: appearance_daterangepicker_aspnetcore
position: 2
---

# DateRangePicker Appearance

As of the R1 2022 release, the DateRangePicker component uses a new rendering. To learn more about the reasons for this decision, see the [Components Appearance]({% slug components_rendering_overview %}) article.

For a live example of the DateRangePicker styling options, visit the [DateRangePicker Appearance Demo](https://demos.telerik.com/{{ site.platform }}/daterangepicker/appearance).

## Options

The DateRangePicker supports the following styling options:

- [`Size`](#size)—configures the overall size of the component.
- [`Rounded`](#rounded)—configures the border radius of the component.
- [`FillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `Size` option controls the size of the DateRangePicker. The `k-input-{size}` class, which is applied to the wrapping span element of the DateRangePicker, reflects the value of the `Size` option.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-input-sm` class to the wrapping span element)
- `Medium`—medium size (applies the `k-input-md` class to the wrapping span element)
- `Large`—large size (applies the `k-input-lg` class to the wrapping span element)
- `None`—unset.

The following example demonstrates how to set `Size` in the declaration of the DateRangePicker:

```HtmlHelper
     @(Html.Kendo().DateRangePicker()
       .Name("daterangepicker")
       .Size(ComponentSize.Medium)
       .HtmlAttributes(new { style = "width: 100%", title = "daterangepicker" })
     )
```
{% if site.core %}
```TagHelper
    <kendo-daterangepicker name="daterangepicker" 
                           title="daterangepicker" 
                           style="width: 100%;"
                           size="ComponentSize.Medium">
    </kendo-daterangepicker>
```
{% endif %}
The default `Size` value is `Medium` and it is applied to the wrapping span element through the `k-input-md` class.

```html
<span class="k-dateinput k-input k-input-md">
</span>
``` 

### Rounded

The `Rounded` option controls the border radius of the DateRangePicker. The class that corresponds to the `Rounded` option is `k-rounded-{rounded}`.

The following values are available for the `Rounded` option:

- `Small`—small border radius (applies the `k-rounded-sm` class to the wrapping span element)
- `Medium`—medium border radius (applies the `k-rounded-md` class to the wrapping span element)
- `Large`—large border radius (applies the `k-rounded-lg` class to the wrapping span element)
- `Full`—largest border radius (applies the `k-rounded-full` class to the wrapping span element)
- `None`—unset.

The following example demonstrates how to set `Rounded` in the declaration of the DateRangePicker:

```HtmlHelper
     @(Html.Kendo().DateRangePicker()
       .Name("daterangepicker")
       .Rounded(Rounded.Medium)
       .HtmlAttributes(new { style = "width: 100%", title = "daterangepicker" })
     )
```
{% if site.core %}
```TagHelper
    <kendo-daterangepicker name="daterangepicker" 
                           title="daterangepicker" 
                           style="width: 100%;"
                           rounded="Rounded.Medium">
    </kendo-daterangepicker>
```
{% endif %}        

The default `Rounded` value is `Medium` and it is applied to the wrapping span element through the `k-rounded-md` class.

```html
<span class="k-dateinput k-input k-rounded-md">
</span>
```

### FillMode

The `FillMode` option controls the way color is applied to the rendered DateRangePicker. The `k-input-{fillMode}` class, which is applied to the wrapping span element of the DateRangePicker, reflects the value of the `FillMode` option.

The following values are available for the `FillMode` option:

- `Solid`—applies the `k-input-solid` class to the wrapping span element
- `Flat`—applies the `k-input-flat` class to the wrapping span element
- `Outline`—applies the `k-input-outline` class to the wrapping span element
- `None`—unset.

The following example demonstrates how to set `FillMode` in the declaration of the DateRangePicker:

```HtmlHelper
     @(Html.Kendo().DateRangePicker()
       .Name("daterangepicker")
       .FillMode(FillMode.Solid)
       .HtmlAttributes(new { style = "width: 100%", title = "daterangepicker" })
     )
```
{% if site.core %}
```TagHelper
    <kendo-daterangepicker name="daterangepicker" 
                           title="daterangepicker" 
                           style="width: 100%;"
                           fill-mode="FillMode.Solid">
    </kendo-daterangepicker>
```
{% endif %}         

The default `FillMode` value is `Solid` and it is applied to the wrapping span element through the `k-input-solid` class.

```html
<span class="k-dateinput k-input k-input-solid">
</span>
```

## Old vs New Rendering

The old rendering of the DateRangePicker consisted of two input elements that were wrapped in span elements with the `k-textbox-container` class. These span elements were wrapped in a single div element with a single `k-daterangepicker` class that held all the styling information related to the widget.

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

The new rendering of the component consists of individual wrapping `span` elements for the `input` elements which hold the `k-input-inner` class. The `span` elements control the overall appearance of the widget depending on the applied classes and has the following class structure:

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

```HtmlHelper
     @(Html.Kendo().DateRangePicker()
       .Name("daterangepicker")
       .Size(ComponentSize.Medium)
       .Rounded(Rounded.Medium)
       .FillMode(FillMode.Solid)
       .HtmlAttributes(new { style = "width: 100%", title = "daterangepicker" })
     )
``` 
{% if site.core %}
```TagHelper
    <kendo-daterangepicker name="daterangepicker" 
                           title="daterangepicker" 
                           style="width: 100%;"
                           size="ComponentSize.Medium"
                           rounded="Rounded.Medium"
                           fill-mode="FillMode.Solid">
    </kendo-daterangepicker>
```
{% endif %} 
       

> The new styling and rendering supports only the [default options](#options) when you use a LESS theme.

## Visual Backwards Compatibility

The following example showcases how to change the background colors of the input elements of the **DateRangePicker** in both the new, and the old rendering:

```
    <style>
      /* Doesn't work BEFORE R1 2022 */
      .k-floating-label-container:nth-of-type(1) .k-input-inner {
        background-color: #2e8540 !important; /* Applies green color to the first input AFTER R1 2022 */
      }
      .k-floating-label-container:nth-of-type(3) .k-input-inner {
        background-color: yellow !important; /* Applies yellow color to the second input AFTER R1 2022 */
      }

      /* Doesn't work AFTER R1 2022 */
      .k-textbox-container:nth-of-type(1) .k-textbox {
        background-color: #0071bc !important; /* Applies blue color to the first input BEFORE R1 2022 */
      }
      .k-textbox-container:nth-of-type(3) .k-textbox {
        background-color: red !important; /* Applies red color to the second input BEFORE R1 2022 */
      }
    </style>
```


## See Also

* [Appearance Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the DateRangePicker](https://demos.telerik.com/aspnet-mvc/daterangepicker/appearance)
